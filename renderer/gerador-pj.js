// Gerador de PJ — engine + UI
// Depende de: GAMEDATA, ARQUETIPOS, CHARACTER_KB, Matcher (matcher/matcher.js)
// Expõe: GeradorPJ (objeto global)

const GeradorPJ = (() => {

  // ──────────────────── Estado interno ────────────────────────────
  let _estado = {
    view: 'modo',           // 'modo' | 'aleatorio' | 'inspirado' | 'resultado' | 'navegacao'
    nivel: 5,
    arquetipoId: null,      // selecionado no modo aleatório
    buscaTexto: '',
    resultadoBusca: null,   // KB entry selecionada (após escolha ou match direto)
    resultadoMatch: null,   // resultado bruto do Matcher.buscarInspiracao()
    badge: null,            // 'aleatorio'|'exato'|'fuzzy_personagem'|'fuzzy_arquetipo'|'escolha_manual'
    pjGerado: null,         // { personagem, arquetipo, fonte } último gerado
    historico: [],          // últimos 5 PJs gerados nesta sessão
    navegacao: { filtroCategoria: '', filtroFranquia: '', filtroArquetipo: '', termoBusca: '', ordenacao: 'nome', paginaAtual: 1 }
  };

  // ──────────────────── Utilitários ───────────────────────────────

  function _rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function _rndAtribs(prim1, prim2) {
    const pool = ['d10', 'd10', 'd8', 'd6'];
    const atribs = ['des', 'vig', 'ast', 'von'];
    const resultado = { des: 'd6', vig: 'd6', ast: 'd6', von: 'd6' };
    const prims = [prim1, prim2];
    const secs = atribs.filter(a => !prims.includes(a));
    resultado[prims[0]] = pool[0];
    resultado[prims[1]] = pool[1];
    resultado[secs[0]] = pool[2];
    resultado[secs[1]] = pool[3];
    return resultado;
  }

  function _rndNome() {
    if (typeof NOMES_MASC !== 'undefined' && typeof NOMES_FEM !== 'undefined') {
      const pool = Math.random() < 0.5 ? NOMES_MASC : NOMES_FEM;
      const primeiro = _rnd(pool);
      const sobrenome = typeof NOMES_SOBRENOME !== 'undefined' ? ' ' + _rnd(NOMES_SOBRENOME) : '';
      return primeiro + sobrenome;
    }
    return 'Aventureiro';
  }

  // ──────────────────── Match helpers ─────────────────────────────

  function _mapearBadge(tipoMatch) {
    return {
      exato:            'exato',
      fuzzy_personagem: 'fuzzy_personagem',
      fuzzy_arquetipo:  'fuzzy_arquetipo',
      ambiguo:          'exato',           // após escolha de candidato exato
      fuzzy_ambiguo:    'fuzzy_personagem', // após escolha de candidato fuzzy
      sem_match:        null,
      erro_input:       null
    }[tipoMatch] || null;
  }

  // score é 1 - fuseScore (0–1, maior = melhor match)
  function _formatarScore(score) {
    if (score >= 0.90) return { texto: 'Match quase exato', cls: 'score-exato' };
    if (score >= 0.75) return { texto: 'Bom match',         cls: 'score-bom' };
    return                    { texto: 'Match aproximado',  cls: 'score-aprox' };
  }

  // ──────────────────── Interpolação de progressão ─────────────────

  function _getProgressao(arquetipo, nivel) {
    const niveis = Object.keys(arquetipo.progressao).map(Number).sort((a, b) => a - b);
    let abaixo = niveis[0], acima = niveis[niveis.length - 1];
    for (const n of niveis) {
      if (n <= nivel) abaixo = n;
      if (n >= nivel && acima === niveis[niveis.length - 1]) acima = n;
    }
    if (arquetipo.progressao[nivel]) return arquetipo.progressao[nivel];
    const base = arquetipo.progressao[abaixo];
    const totalBase = base.classes.reduce((s, c) => s + c.niveis, 0);
    const delta = nivel - totalBase;
    if (delta <= 0) return base;
    const classes = base.classes.map(c => ({ ...c, poderes: [...c.poderes] }));
    const extras = delta;
    for (let i = 0; i < extras; i++) {
      const alvo = classes[i % classes.length];
      const classeData = GAMEDATA.classes.find(cl => cl.id === alvo.id);
      if (!classeData) continue;
      alvo.niveis++;
      const poderesCl = classeData.poderes.map(p => p.id);
      const jaUsados = new Set(alvo.poderes);
      const proximo = poderesCl.find(p => !jaUsados.has(p)) || poderesCl[alvo.poderes.length % poderesCl.length];
      if (proximo) alvo.poderes.push(proximo);
    }
    return { classes };
  }

  // ──────────────────── Geração de PJ ──────────────────────────────

  function _arquetipoParaPersonagem(arq, nivel, overrides) {
    const prog = _getProgressao(arq, nivel);
    const [prim1, prim2] = arq.atributosPrim || ['des', 'vig'];
    const atribs = overrides && overrides.atributos ? overrides.atributos : _rndAtribs(prim1, prim2);

    const classesObj = {};
    for (const c of prog.classes) {
      classesObj[c.id] = { niveis: c.niveis, poderes: c.poderes.slice(0, c.niveis) };
    }

    const temas = GAMEDATA.temas || [];
    const tema = overrides && overrides.tema
      ? _resolverTema(overrides.tema, temas)
      : (temas.length ? _rnd(temas).id : '');

    const origens = [
      'Camponês', 'Nobre', 'Soldado', 'Ladrão', 'Estudante', 'Artesão',
      'Mercador', 'Monge', 'Caçador', 'Marinheiro', 'Nômade', 'Sacerdote'
    ];
    const origem = overrides && overrides.origem ? overrides.origem : _rnd(origens);
    const nome = overrides && overrides.nome ? overrides.nome : _rndNome();
    const lacos = overrides && overrides.lacos ? overrides.lacos : _gerarLacosAleatorios(prog.classes);

    return {
      nome,
      nivel,
      pronomes: '',
      aparencia: '',
      descricao: overrides && overrides.descricao ? overrides.descricao : '',
      origem,
      origemDesc: '',
      tema,
      temaCustom: '',
      temaDescricao: '',
      classes: classesObj,
      atributos: atribs,
      perfilAtrib: '',
      equipamento: { armas: [], armadura: 'sem_armadura', escudo: '' },
      lacos,
      pontosFabula: 3,
      imagem: null
    };
  }

  function _resolverTema(temaTexto, temas) {
    const norm = (temaTexto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
    for (const t of temas) {
      const tn = (t.nome || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
      if (tn.includes(norm) || norm.includes(tn)) return t.id;
    }
    return temas.length ? _rnd(temas).id : '';
  }

  function _gerarLacosAleatorios(classes) {
    const personagens = ['Mentor Misterioso', 'Velho Amigo', 'Rival Jurado', 'Família Distante', 'Protetor'];
    const emocoesPares = GAMEDATA.emocoes || [];
    const lacos = [];
    const numLacos = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < Math.min(numLacos, personagens.length); i++) {
      const emo = emocoesPares.length ? _rnd(emocoesPares).id : '';
      lacos.push({ alvo: personagens[i], emocoes: emo ? [emo] : [] });
    }
    return lacos;
  }

  // ──────────────────── Linha do tempo ────────────────────────────

  function _gerarLevelUpLog(p) {
    const classes = Object.entries(p.classes).map(([id, c]) => {
      const cl = GAMEDATA.classes.find(x => x.id === id);
      return {
        id,
        niveis: c.niveis,
        poderes: c.poderes,
        nome: cl ? cl.nome : id,
        icone: (typeof ICONES_CLASSES !== 'undefined' ? (ICONES_CLASSES[id] || '') : ''),
        poderesData: cl ? cl.poderes : []
      };
    }).sort((a, b) => b.niveis - a.niveis);

    const entries = [];
    const pointers = classes.map(() => 0);
    let nivel = 1;
    let avancou = true;
    while (avancou) {
      avancou = false;
      for (let i = 0; i < classes.length; i++) {
        const cl = classes[i];
        if (pointers[i] < cl.niveis) {
          avancou = true;
          const poderId = cl.poderes[pointers[i]];
          const poderData = cl.poderesData.find(pd => pd.id === poderId);
          entries.push({
            nivel,
            classeId: cl.id,
            classeNome: cl.nome,
            icone: cl.icone,
            poder: { id: poderId, nome: poderData ? poderData.nome : poderId }
          });
          pointers[i]++;
          nivel++;
        }
      }
    }
    return entries;
  }

  // ──────────────────── API pública ────────────────────────────────

  function setModo(modo) {
    _navegarPara(modo);
  }

  function setNivel(n) {
    const v = Math.max(1, Math.min(50, parseInt(n) || 5));
    _estado.nivel = v;
    const inp = document.getElementById('gpj-nivel');
    if (inp) inp.value = v;
    const span = document.getElementById('gpj-nivel-display');
    if (span) span.textContent = v;
  }

  function setArquetipo(id) {
    _estado.arquetipoId = id;
    document.querySelectorAll('.gpj-arq-card').forEach(el => {
      el.classList.toggle('selecionado', el.dataset.id === id);
    });
  }

  function gerarAleatorio() {
    const nivel = _estado.nivel;
    let arqId = _estado.arquetipoId;
    if (!arqId) arqId = _rnd(ARQUETIPOS).id;
    const arq = ARQUETIPOS.find(a => a.id === arqId);
    if (!arq) { _mostrarErro('Arquétipo não encontrado.'); return; }

    const btn = document.querySelector('.gpj-btn-gerar');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-btn"></span>Gerando…'; }

    setTimeout(() => {
      const personagem = _arquetipoParaPersonagem(arq, nivel, null);
      _estado.pjGerado = { personagem, arquetipo: arq, fonte: 'aleatorio' };
      _estado.badge = 'aleatorio';
      _historico_push(_estado.pjGerado);
      _navegarPara('resultado');
    }, 60);
  }

  function buscarInspiracao() {
    const input = document.getElementById('gpj-busca-input');
    const query = input ? input.value.trim() : _estado.buscaTexto;
    _estado.buscaTexto = query;

    if (!query) {
      _renderBuscaResultado({ tipo: 'erro_input', mensagem: 'Digite o nome de um personagem.' });
      return;
    }

    // Usa o Matcher novo (Fase 4.1) se disponível
    const match = (typeof Matcher !== 'undefined')
      ? Matcher.buscarInspiracao(query)
      : { tipo: 'sem_match', candidatos: [] };

    _estado.resultadoMatch = match;
    _estado.resultadoBusca = null;

    if (match.tipo === 'ambiguo' || match.tipo === 'fuzzy_ambiguo') {
      _dispararModalAmbiguo(match.candidatos, match.tipo);
      return;
    }
    _renderBuscaResultado(match);
  }

  function gerarInspiracao() {
    // Lê entry do resultadoBusca (set por escolherCandidato) ou de resultadoMatch direto
    let entry = _estado.resultadoBusca;
    if (!entry && _estado.resultadoMatch) {
      const m = _estado.resultadoMatch;
      if (m.tipo === 'exato' || m.tipo === 'fuzzy_personagem') entry = m.resultado;
    }
    if (!entry) { _mostrarErro('Busque um personagem primeiro.'); return; }

    const arq = ARQUETIPOS.find(a => a.id === entry.arquetipo);
    if (!arq) { _mostrarErro('Arquétipo não mapeado.'); return; }

    const btn = document.querySelector('.gpj-btn-gerar-insp');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-btn"></span>Gerando…'; }

    const nivel = _estado.nivel;
    setTimeout(() => {
      const personagem = _arquetipoParaPersonagem(arq, nivel, {
        atributos: entry.atributos,
        tema: entry.tema,
        origem: entry.origem,
        descricao: entry.descricao,
        lacos: (entry.lacos || []).map(l => ({ alvo: l.alvo, emocoes: l.emocoes ? [...l.emocoes] : [] }))
      });
      personagem.nome = _rndNome();
      const tipoMatch = _estado.resultadoMatch ? _estado.resultadoMatch.tipo : 'exato';
      _estado.badge = _mapearBadge(tipoMatch);
      _estado.pjGerado = { personagem, arquetipo: arq, fonte: 'inspirado', referencia: entry.nome };
      _historico_push(_estado.pjGerado);
      _navegarPara('resultado');
    }, 60);
  }

  // Escolha de candidato após modal de desambiguação
  function escolherCandidato(idx) {
    if (!_estado.resultadoMatch) return;
    const tipoOriginal = _estado.resultadoMatch.tipo;
    const cands = _estado.resultadoMatch.candidatos || [];
    const raw = cands[idx];
    if (!raw) return;
    _estado.resultadoBusca = raw;
    // Normaliza para match simples para restauração de view no "← Voltar"
    const tipoResolvido = tipoOriginal === 'fuzzy_ambiguo' ? 'fuzzy_personagem' : 'exato';
    _estado.resultadoMatch = { tipo: tipoResolvido, resultado: raw, score: raw._score || 1.0 };
    gerarInspiracao();
  }

  // Reabre modal se view é restaurada com estado ambíguo ainda pendente
  function reabrirModalAmbiguo() {
    const m = _estado.resultadoMatch;
    if (!m || (m.tipo !== 'ambiguo' && m.tipo !== 'fuzzy_ambiguo')) return;
    _dispararModalAmbiguo(m.candidatos, m.tipo);
  }

  function _dispararModalAmbiguo(candidatos, tipo) {
    const isFuzzy = tipo === 'fuzzy_ambiguo';
    if (typeof ModalDesambiguacao === 'undefined') { // eslint-disable-line no-undef
      _renderBuscaResultado(_estado.resultadoMatch);
      return;
    }
    ModalDesambiguacao.abrir({ // eslint-disable-line no-undef
      titulo:    isFuzzy ? 'Encontramos candidatos parecidos:' : 'Qual deles?',
      subtitulo: isFuzzy
        ? 'Não temos certeza qual você quis dizer:'
        : 'Personagens diferentes com o mesmo nome:',
      candidatos,
      isFuzzy,
      onEscolher: (idx) => escolherCandidato(idx)
    });
  }

  // Gerar diretamente de um arquétipo (fuzzy_arquetipo, sem_match, ou escolha manual)
  function gerarDeArquetipo(arqId, badgeOverride) {
    const arq = ARQUETIPOS.find(a => a.id === arqId);
    if (!arq) { _mostrarErro('Arquétipo não encontrado.'); return; }
    _estado.badge = badgeOverride || 'fuzzy_arquetipo';
    const personagem = _arquetipoParaPersonagem(arq, _estado.nivel, null);
    // Para escolha manual, referencia = nome do arquétipo (aparece no header resultado)
    const referencia = badgeOverride ? arq.nome : undefined;
    _estado.pjGerado = { personagem, arquetipo: arq, fonte: 'inspirado', referencia };
    _historico_push(_estado.pjGerado);
    _navegarPara('resultado');
  }

  function abrirModalArquetipos() {
    if (typeof ModalArquetipos === 'undefined') return; // eslint-disable-line no-undef
    ModalArquetipos.abrir({ // eslint-disable-line no-undef
      onEscolher: (arquetipoId) => gerarDeArquetipo(arquetipoId, 'escolha_manual')
    });
  }

  function carregarNoWizard() {
    if (!_estado.pjGerado) return;
    const p = _estado.pjGerado.personagem;
    if (typeof Estado === 'undefined' || typeof App === 'undefined') return;
    Estado.personagem = JSON.parse(JSON.stringify(p));
    Estado.passoAtual = 0;
    if (typeof App.mostrarTela === 'function') App.mostrarTela('wizard');
    else {
      document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
      document.getElementById('tela-wizard').classList.add('ativa');
    }
    if (typeof App.renderizarPasso === 'function') App.renderizarPasso();
    else if (typeof App.renderizarPassoAtual === 'function') App.renderizarPassoAtual();

    setTimeout(() => {
      const wizardMain = document.getElementById('wizard-main');
      if (!wizardMain || document.getElementById('gpj-wizard-banner')) return;
      const banner = document.createElement('div');
      banner.id = 'gpj-wizard-banner';
      banner.className = 'gpj-wizard-banner';
      const ref = _estado.pjGerado && _estado.pjGerado.referencia
        ? ` inspirado em <strong>${_esc(_estado.pjGerado.referencia)}</strong>` : '';
      const arqNome = _estado.pjGerado && _estado.pjGerado.arquetipo
        ? _esc(_estado.pjGerado.arquetipo.nome) : '?';
      banner.innerHTML = `
        <span class="gpj-wizard-banner-icone"></span>
        <span class="gpj-wizard-banner-texto">Personagem gerado${ref} — arquétipo <strong>${arqNome}</strong>. Complete os detalhes abaixo.</span>
        <button class="gpj-banner-fechar" onclick="this.parentElement.remove()" title="Fechar">Fechar</button>`;
      wizardMain.insertAdjacentElement('beforebegin', banner);
    }, 0);
  }

  function novoGerador() {
    _estado.pjGerado = null;
    _estado.resultadoBusca = null;
    _estado.resultadoMatch = null;
    _estado.badge = null;
    _estado.buscaTexto = '';
    _navegarPara('modo');
  }

  function sugerirNome() {
    if (!_estado.pjGerado) return;
    const arquetipoId = _estado.pjGerado.arquetipo ? _estado.pjGerado.arquetipo.id : null;
    const cat = (typeof ARQUETIPO_CATEGORIA !== 'undefined' && arquetipoId)
      ? (ARQUETIPO_CATEGORIA[arquetipoId] || 'generalista')
      : 'generalista';
    const lista = (typeof NOMES_SUGERIDOS !== 'undefined') ? NOMES_SUGERIDOS[cat] : null;
    if (!lista) return;
    const nome = lista.nomes[Math.floor(Math.random() * lista.nomes.length)];
    const sob  = lista.sobrenomes[Math.floor(Math.random() * lista.sobrenomes.length)];
    _estado.pjGerado.personagem.nome = nome + ' ' + sob;
    const el = document.querySelector('.gpj-preview-nome');
    if (el) el.textContent = _estado.pjGerado.personagem.nome;
  }

  function voltar() {
    const { view, pjGerado } = _estado;
    if (view === 'resultado') {
      const fonte = pjGerado ? pjGerado.fonte : 'aleatorio';
      if (fonte === 'navegacao') _navegarPara('navegacao');
      else if (fonte === 'inspirado') _navegarPara('inspirado');
      else _navegarPara('aleatorio');
    } else {
      _navegarPara('modo');
    }
  }

  // ──────────────────── Histórico ──────────────────────────────────

  function _historico_push(entrada) {
    _estado.historico.unshift(entrada);
    if (_estado.historico.length > 5) _estado.historico.pop();
  }

  // ──────────────────── Navegação e renderização ───────────────────

  function _navegarPara(view) {
    _estado.view = view;
    _renderView();
  }

  function _renderView() {
    const container = document.getElementById('gpj-conteudo');
    if (!container) return;
    switch (_estado.view) {
      case 'modo':      container.innerHTML = _htmlViewModo();      break;
      case 'aleatorio': container.innerHTML = _htmlViewAleatorio(); break;
      case 'inspirado': container.innerHTML = _htmlViewInspirado(); break;
      case 'resultado':  container.innerHTML = _htmlViewResultado();  break;
      case 'navegacao':  container.innerHTML = _htmlViewNavegacao();  break;
      default:           container.innerHTML = _htmlViewModo();
    }
  }

  function renderizar() { _renderView(); }

  // ──────────────────── View: Modo ────────────────────────────────

  function _htmlViewModo() {
    return `
      <div class="gpj-view-modo">
        <h2 class="gpj-modo-titulo">Criar Personagem</h2>
        <p class="gpj-modo-subtitulo">Como você quer começar?</p>
        <div class="gpj-modo-cards">
          <div class="gpj-modo-card" onclick="GeradorPJ.setModo('aleatorio')">
            <span class="gpj-modo-icone"></span>
            <strong class="gpj-modo-card-nome">Aleatório</strong>
            <p class="gpj-modo-card-desc">Escolha um arquétipo ou deixe o sistema sortear. Gera um PJ completo instantaneamente.</p>
          </div>
          <div class="gpj-modo-card" onclick="GeradorPJ.setModo('inspirado')">
            <span class="gpj-modo-icone"></span>
            <strong class="gpj-modo-card-nome">Inspirado</strong>
            <p class="gpj-modo-card-desc">Baseie o personagem em um herói famoso e adapte para o mundo de Fabula Ultima.</p>
          </div>
        </div>
        <div class="gpj-modo-card gpj-modo-card-banco" onclick="GeradorPJ.mostrarNavegacao()">
          <span class="gpj-modo-icone"></span>
          <div class="gpj-modo-card-banco-texto">
            <strong class="gpj-modo-card-nome">Navegar Banco</strong>
            <p class="gpj-modo-card-desc">Explore todos os personagens do banco, filtre por franquia, arquétipo ou categoria e escolha o que inspirará seu PJ.</p>
          </div>
        </div>
      </div>`;
  }

  // ──────────────────── View: Aleatório ───────────────────────────

  function _htmlViewAleatorio() {
    const { nivel, arquetipoId } = _estado;
    const cards = ARQUETIPOS.map(arq => `
      <div class="gpj-arq-card ${arquetipoId === arq.id ? 'selecionado' : ''}"
        data-id="${arq.id}" onclick="GeradorPJ.setArquetipo('${arq.id}')">
        <span class="gpj-arq-icone">${arq.icone}</span>
        <span class="gpj-arq-nome">${_esc(arq.nome)}</span>
        <span class="gpj-arq-tags">${arq.tags.slice(0,2).join(' · ')}</span>
      </div>`).join('');

    return `
      <div class="gpj-painel">
        <div class="gpj-view-header">
          <button class="gpj-btn-voltar" onclick="GeradorPJ.voltar()">&#8592; Voltar</button>
          <span class="gpj-view-titulo">Aleatório</span>
        </div>

        <div class="gpj-nivel-row">
          <label class="gpj-label">Nível do personagem:</label>
          <div class="gpj-nivel-ctrl">
            <button class="btn-mini" onclick="GeradorPJ.setNivel(${nivel - 1})">−</button>
            <input id="gpj-nivel" class="gpj-nivel-input" type="number" min="1" max="50"
              value="${nivel}" onchange="GeradorPJ.setNivel(this.value)" />
            <button class="btn-mini" onclick="GeradorPJ.setNivel(${nivel + 1})">+</button>
          </div>
        </div>

        <div id="gpj-erro" class="gpj-erro" style="display:none"></div>

        <div class="gpj-secao">
          <p class="gpj-hint">Escolha um arquétipo ou deixe em branco para sortear um aleatório.</p>
          <div class="gpj-arq-grid">${cards}</div>
          <button class="btn-primario gpj-btn-gerar" onclick="GeradorPJ.gerarAleatorio()">
            Gerar Personagem
          </button>
        </div>
      </div>`;
  }

  // ──────────────────── View: Inspirado ───────────────────────────

  function _htmlViewInspirado() {
    const { nivel } = _estado;
    const total = (typeof Matcher !== 'undefined') ? Matcher.getKbAll().length : 0;

    // Restaura resultado anterior se houver
    const resultadoHtml = _estado.resultadoMatch
      ? _htmlResultadoBusca(_estado.resultadoMatch)
      : '';

    return `
      <div class="gpj-painel">
        <div class="gpj-view-header">
          <button class="gpj-btn-voltar" onclick="GeradorPJ.voltar()">&#8592; Voltar</button>
          <span class="gpj-view-titulo">Inspirado</span>
        </div>

        <div class="gpj-nivel-row">
          <label class="gpj-label">Nível do personagem:</label>
          <div class="gpj-nivel-ctrl">
            <button class="btn-mini" onclick="GeradorPJ.setNivel(${nivel - 1})">−</button>
            <input id="gpj-nivel" class="gpj-nivel-input" type="number" min="1" max="50"
              value="${nivel}" onchange="GeradorPJ.setNivel(this.value)" />
            <button class="btn-mini" onclick="GeradorPJ.setNivel(${nivel + 1})">+</button>
          </div>
        </div>

        <div id="gpj-erro" class="gpj-erro" style="display:none"></div>

        <div class="gpj-secao">
          <p class="gpj-hint">
            Digite o nome de um personagem famoso e o sistema encontrará o arquétipo mais próximo.
          </p>
          <div class="gpj-busca-row">
            <input id="gpj-busca-input" class="gpj-busca-input" type="text"
              placeholder="Ex: Cloud, Geralt, Aragorn, Frieren…"
              value="${_esc(_estado.buscaTexto)}"
              onkeydown="if(event.key==='Enter') GeradorPJ.buscarInspiracao()" />
            <button class="btn-primario" onclick="GeradorPJ.buscarInspiracao()">Buscar</button>
          </div>
          <div id="gpj-busca-resultado">${resultadoHtml}</div>

          <button class="gpj-btn-explorar-banco" onclick="GeradorPJ.mostrarNavegacao()">
            Explorar banco completo (${total} personagens) →
          </button>
        </div>
      </div>`;
  }

  // ──────────────────── Resultados de busca ────────────────────────

  function _renderBuscaResultado(match) {
    const el = document.getElementById('gpj-busca-resultado');
    if (el) el.innerHTML = _htmlResultadoBusca(match);
  }

  function _htmlResultadoBusca(match) {
    if (!match) return '';
    switch (match.tipo) {
      case 'exato':            return _htmlResultadoExato(match.resultado);
      case 'fuzzy_personagem': return _htmlResultadoFuzzyPers(match.resultado, match.score);
      case 'fuzzy_arquetipo':  return _htmlResultadoArquetipo(match.candidatos);
      case 'sem_match':        return _htmlResultadoSemMatch(match.motivo || 'nao_encontrado');
      case 'erro_input':       return _htmlResultadoSemMatch('erro_input', match.mensagem);
      // Ambiguo não resolvido ao restaurar view — botão para reabrir modal
      case 'ambiguo':
      case 'fuzzy_ambiguo':    return _htmlResultadoAmbiguoPendente(match.candidatos.length);
      default:                 return '';
    }
  }

  function _htmlResultadoAmbiguoPendente(n) {
    return `
      <div class="gpj-match-card gpj-match-sem-resultado">
        <p class="gpj-match-nf-msg">${n} candidatos encontrados — escolha um para gerar.</p>
        <button class="btn-secundario gpj-btn-reabrir-modal" onclick="GeradorPJ.reabrirModalAmbiguo()">
          ↩ Escolher novamente
        </button>
      </div>`;
  }

  function _htmlResultadoExato(entry) {
    const arq = ARQUETIPOS.find(a => a.id === entry.arquetipo);
    return `
      <div class="gpj-busca-encontrado gpj-match-card">
        <div class="gpj-match-info">
          <span class="gpj-match-nome">${_esc(entry.nome)}</span>
          <span class="gpj-match-seta">-&gt;</span>
          <span class="gpj-match-arq">${arq ? arq.icone + ' ' + arq.nome : entry.arquetipo}</span>
          ${_htmlBadgeFonte('exato')}
        </div>
        <p class="gpj-match-desc">${_esc(entry.descricao)}</p>
        <div class="gpj-match-tema">
          <span class="gpj-label-mini">Tema:</span> ${_esc(entry.tema)}
          <span class="gpj-sep">·</span>
          <span class="gpj-label-mini">Origem:</span> ${_esc(entry.origem)}
        </div>
        <button class="btn-primario gpj-btn-gerar-insp" onclick="GeradorPJ.gerarInspiracao()">
          Gerar como ${_esc(entry.nome)}
        </button>
      </div>`;
  }

  function _htmlResultadoFuzzyPers(entry, score) {
    const arq = ARQUETIPOS.find(a => a.id === entry.arquetipo);
    const s = _formatarScore(score);
    return `
      <div class="gpj-busca-encontrado gpj-match-card">
        <div class="gpj-match-info">
          <span class="gpj-match-fuzzy-hint">Você quis dizer…</span>
          <span class="gpj-match-nome">${_esc(entry.nome)}</span>
          <span class="gpj-match-seta">-&gt;</span>
          <span class="gpj-match-arq">${arq ? arq.icone + ' ' + arq.nome : entry.arquetipo}</span>
          ${_htmlBadgeFonte('fuzzy_personagem')}
          <span class="gpj-score ${s.cls}">${s.texto}</span>
        </div>
        <p class="gpj-match-desc">${_esc(entry.descricao)}</p>
        <div class="gpj-match-tema">
          <span class="gpj-label-mini">Tema:</span> ${_esc(entry.tema)}
          <span class="gpj-sep">·</span>
          <span class="gpj-label-mini">Origem:</span> ${_esc(entry.origem)}
        </div>
        <button class="btn-primario gpj-btn-gerar-insp" onclick="GeradorPJ.gerarInspiracao()">
          Gerar como ${_esc(entry.nome)}
        </button>
      </div>`;
  }

  function _htmlResultadoArquetipo(candidatos) {
    const cards = candidatos.map(arq => `
      <div class="gpj-arq-sugerido" onclick="GeradorPJ.gerarDeArquetipo('${_esc(arq.id)}')">
        <span class="gpj-arq-sugerido-icone">${arq.icone || ''}</span>
        <div class="gpj-arq-sugerido-info">
          <div class="gpj-arq-sugerido-nome">${_esc(arq.nome)}</div>
          <div class="gpj-arq-sugerido-tags">${(arq.tags || []).slice(0,2).join(' · ')}</div>
        </div>
        ${_htmlBadgeFonte('fuzzy_arquetipo')}
      </div>`).join('');

    return `
      <div class="gpj-match-card gpj-match-arq-card">
        <p class="gpj-match-nf-hint">Não encontrei esse personagem no banco — esses arquétipos podem ser o que você procura:</p>
        <div class="gpj-arqs-sugeridos">${cards}</div>
      </div>`;
  }

  function _htmlResultadoSemMatch(motivo, mensagem) {
    const msg = mensagem
      || (motivo === 'input_curto' ? 'Digite pelo menos 3 caracteres.'
        : motivo === 'erro_input'  ? 'Digite o nome de um personagem.'
        : 'Não encontramos esse personagem no banco.');
    return `
      <div class="gpj-match-card gpj-sem-match-card">
        <p class="gpj-match-nf-msg">${_esc(msg)}</p>
        <button class="btn-primario gpj-btn-abrir-arqs" onclick="GeradorPJ.abrirModalArquetipos()">
          Escolher um arquétipo
        </button>
        <p class="gpj-sem-match-dica">Ou tente outro nome no campo de busca acima.</p>
      </div>`;
  }

  // ──────────────────── View: Resultado ───────────────────────────

  function _htmlViewResultado() {
    const entrada = _estado.pjGerado;
    if (!entrada) return _htmlViewModo();

    const { personagem: p, arquetipo, fonte, referencia } = entrada;
    const badge = _estado.badge || 'aleatorio';
    const stats = _calcStats(p);

    const atribsHtml = ['des','vig','ast','von'].map(a => `
      <div class="gpj-stat-item">
        <span class="gpj-stat-val">${p.atributos[a] || 'd6'}</span>
        <span class="gpj-stat-label">${a.toUpperCase()}</span>
      </div>`).join('');

    const statsHtml = `
      <div class="gpj-stat-item sv-pv"><span class="gpj-stat-val">${stats.pv}</span><span class="gpj-stat-label">PV</span></div>
      <div class="gpj-stat-item sv-pm"><span class="gpj-stat-val">${stats.pm}</span><span class="gpj-stat-label">PM</span></div>
      <div class="gpj-stat-item sv-pi"><span class="gpj-stat-val">${stats.pi}</span><span class="gpj-stat-label">PI</span></div>
      <div class="gpj-stat-item sv-def"><span class="gpj-stat-val">${stats.def}</span><span class="gpj-stat-label">DEF</span></div>
      <div class="gpj-stat-item sv-defm"><span class="gpj-stat-val">${stats.defM}</span><span class="gpj-stat-label">DefM</span></div>
      <div class="gpj-stat-item sv-ini"><span class="gpj-stat-val">${stats.init}</span><span class="gpj-stat-label">Init</span></div>`;

    const classesHtml = Object.entries(p.classes).map(([id, c]) => {
      const cl = GAMEDATA.classes.find(x => x.id === id);
      const icone = typeof ICONES_CLASSES !== 'undefined' ? (ICONES_CLASSES[id] || '') : '';
      const poderesNomes = c.poderes.map(pid => {
        if (!cl) return pid;
        const pd = cl.poderes.find(po => po.id === pid);
        return pd ? pd.nome : pid;
      });
      return `
        <div class="gpj-classe-card">
          <div class="gpj-classe-header">
            <span class="gpj-classe-icone">${icone}</span>
            <strong>${cl ? cl.nome : id}</strong>
            <span class="gpj-classe-nivel">Nv ${c.niveis}</span>
          </div>
          <div class="gpj-poderes-lista">${poderesNomes.map(n => `<span class="gpj-poder-tag">${_esc(n)}</span>`).join('')}</div>
        </div>`;
    }).join('');

    const temaData = GAMEDATA.temas ? GAMEDATA.temas.find(t => t.id === p.tema) : null;
    const temaNome = temaData ? temaData.nome : (p.temaCustom || p.tema || '—');

    const lacosHtml = (p.lacos || []).filter(l => l.alvo).map(l => `
      <div class="gpj-laco-item">
        <strong>${_esc(l.alvo)}</strong>
        ${l.emocoes && l.emocoes.length ? ': ' + l.emocoes.map(e => _esc(e)).join(', ') : ''}
      </div>`).join('');

    const refLabel = (fonte === 'inspirado' || fonte === 'navegacao') && referencia
      ? `<span class="gpj-ref-label">Inspirado em: <em>${_esc(referencia)}</em></span>`
      : '';

    return `
      <div class="gpj-resultado">
        <div class="gpj-view-header">
          <button class="gpj-btn-voltar" onclick="GeradorPJ.voltar()">&#8592; Voltar</button>
          <div class="gpj-resultado-titulo">
            <span class="gpj-arq-icone-grande">${arquetipo.icone}</span>
            <div>
              <div class="gpj-preview-nome-row">
                <h3 class="gpj-preview-nome">${_esc(p.nome)}</h3>
                <button class="btn-mini gpj-btn-sugerir-nome" onclick="GeradorPJ.sugerirNome()" title="Sugerir outro nome">Outro nome</button>
              </div>
              <div class="gpj-resultado-meta">
                ${_htmlBadgeFonte(badge)}
                <span class="gpj-meta-sep">·</span>
                <span class="gpj-meta-info">Nível ${p.nivel}</span>
                <span class="gpj-meta-sep">·</span>
                <span class="gpj-meta-info">${_esc(arquetipo.nome)}</span>
                ${refLabel}
              </div>
            </div>
          </div>
          <button class="btn-mini gpj-btn-novo" onclick="GeradorPJ.novoGerador()">&#8635; Novo</button>
        </div>

        <div class="gpj-resultado-grid">
          <div class="gpj-preview-secao">
            <div class="gpj-secao-titulo">Atributos</div>
            <div class="gpj-stats-row">${atribsHtml}</div>
          </div>
          <div class="gpj-preview-secao">
            <div class="gpj-secao-titulo">Estatísticas</div>
            <div class="gpj-stats-row">${statsHtml}</div>
          </div>

          <div class="gpj-preview-secao gpj-preview-largo">
            <div class="gpj-secao-titulo">Linha do Tempo</div>
            ${_htmlLinhaDoTempo(p)}
          </div>

          <div class="gpj-preview-secao gpj-preview-largo">
            <div class="gpj-secao-titulo">Classes &amp; Poderes</div>
            <div class="gpj-classes-grid">${classesHtml}</div>
          </div>

          <div class="gpj-preview-secao">
            <div class="gpj-secao-titulo">Identidade</div>
            <div class="gpj-info-pair"><span class="gpj-label-mini">Origem</span> ${_esc(p.origem)}</div>
            <div class="gpj-info-pair"><span class="gpj-label-mini">Tema</span> ${_esc(temaNome)}</div>
          </div>

          ${lacosHtml ? `
          <div class="gpj-preview-secao">
            <div class="gpj-secao-titulo">Laços</div>
            ${lacosHtml}
          </div>` : ''}

          ${p.descricao ? `
          <div class="gpj-preview-secao gpj-preview-largo">
            <div class="gpj-secao-titulo">Descrição</div>
            <p class="gpj-desc">${_esc(p.descricao)}</p>
          </div>` : ''}
        </div>

        <div class="gpj-preview-footer">
          <button class="btn-secundario" onclick="GeradorPJ.novoGerador()">&#8635; Gerar Outro</button>
          <button class="btn-primario" onclick="GeradorPJ.carregarNoWizard()">&#9999;&#65039; Editar no Wizard</button>
        </div>
      </div>`;
  }

  function _htmlLinhaDoTempo(p) {
    const log = _gerarLevelUpLog(p);
    if (!log.length) return '<p class="gpj-hint">Nenhum poder registrado.</p>';

    const items = log.map(entry => `
      <div class="gpj-ltempo-item">
        <span class="gpj-ltempo-nivel">Nv${entry.nivel}</span>
        <span class="gpj-ltempo-dot"></span>
        <span class="gpj-ltempo-icone">${entry.icone}</span>
        <span class="gpj-ltempo-classe">${_esc(entry.classeNome)}</span>
        <span class="gpj-ltempo-sep">—</span>
        <span class="gpj-ltempo-poder">${_esc(entry.poder.nome)}</span>
      </div>`).join('');

    return `<div class="gpj-ltempo">${items}</div>`;
  }

  function _htmlBadgeFonte(tipo) {
    const badges = {
      aleatorio:        { icone: '', label: 'Aleatório',    cls: 'badge-aleatorio', title: 'Gerado aleatoriamente' },
      exato:            { icone: '', label: 'Banco curado', cls: 'badge-exato',     title: 'Match exato no banco de personagens' },
      fuzzy_personagem: { icone: '', label: 'Match aprox.', cls: 'badge-fuzzy',     title: 'Match aproximado por busca fuzzy' },
      fuzzy_arquetipo:  { icone: '', label: 'Arquétipo',    cls: 'badge-arquetipo', title: 'Arquétipo sugerido por similaridade' },
      escolha_manual:   { icone: '', label: 'Manual',       cls: 'badge-manual',    title: 'Arquétipo escolhido manualmente' },
    };
    const b = badges[tipo] || badges.aleatorio;
    return `<span class="gpj-badge ${b.cls}" title="${b.title}">${b.icone} ${b.label}</span>`;
  }

  // ──────────────────── Cálculo de stats ──────────────────────────

  function _calcStats(p) {
    const dadoVal = { d6: 6, d8: 8, d10: 10, d12: 12 };
    const desV = dadoVal[p.atributos.des] || 6;
    const vigV = dadoVal[p.atributos.vig] || 6;
    const astV = dadoVal[p.atributos.ast] || 6;
    const vonV = dadoVal[p.atributos.von] || 6;
    const nivel = p.nivel || 5;

    let pvBonus = 0, pmBonus = 0, piBonus = 0;
    for (const [id, c] of Object.entries(p.classes || {})) {
      const cl = GAMEDATA.classes.find(x => x.id === id);
      if (!cl || !cl.beneficiosIniciais) continue;
      for (const b of cl.beneficiosIniciais) {
        if (b.startsWith('+5 PV')) pvBonus += 5;
        else if (b.startsWith('+5 PM')) pmBonus += 5;
        else if (b.startsWith('+2 PI')) piBonus += 2;
      }
    }

    return {
      pv: nivel + vigV * 5 + pvBonus,
      pm: nivel + vonV * 5 + pmBonus,
      pi: 6 + piBonus,
      def: desV,
      defM: astV,
      init: Math.floor((desV + astV) / 2)
    };
  }

  // ──────────────────── Helpers ────────────────────────────────────

  function _esc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function _mostrarErro(msg) {
    const erroEl = document.getElementById('gpj-erro');
    if (erroEl) {
      erroEl.textContent = msg;
      erroEl.style.display = 'block';
      setTimeout(() => { erroEl.style.display = 'none'; }, 3500);
    }
  }

  // ──────────────────── Navegação do banco ────────────────────────

  function _normNav(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  function _aplicarFiltrosNavegacao(kbAll) {
    const { filtroCategoria, filtroFranquia, filtroArquetipo, termoBusca, ordenacao } = _estado.navegacao;
    const termoNorm = _normNav(termoBusca);

    let resultado = kbAll.filter(e => {
      if (filtroCategoria && (!e.source || e.source.category !== filtroCategoria)) return false;
      if (filtroFranquia  && (!e.source || e.source.franchise !== filtroFranquia))  return false;
      if (filtroArquetipo && e.arquetipo !== filtroArquetipo) return false;
      if (termoNorm && !_normNav(e.nome).includes(termoNorm)) return false;
      return true;
    });

    if (ordenacao === 'franquia') {
      resultado = resultado.slice().sort((a, b) => {
        const fa = (a.source && a.source.franchise) || '';
        const fb = (b.source && b.source.franchise) || '';
        return fa.localeCompare(fb) || a.nome.localeCompare(b.nome);
      });
    } else if (ordenacao === 'arquetipo') {
      resultado = resultado.slice().sort((a, b) =>
        (a.arquetipo || '').localeCompare(b.arquetipo || '') || a.nome.localeCompare(b.nome));
    } else {
      resultado = resultado.slice().sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return resultado;
  }

  function _htmlCardPersonagemMini(e) {
    const arqs = typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS : []; // eslint-disable-line no-undef
    const arq = arqs.find(a => a.id === e.arquetipo);
    const obra = e.source ? (e.source.work || e.source.franchise || '—') : '—';
    return `
      <div class="nav-card">
        <div class="nav-card-topo">
          <span class="nav-card-icone">${arq ? arq.icone : ''}</span>
          <div class="nav-card-info">
            <div class="nav-card-nome">${_esc(e.nome)}</div>
            <div class="nav-card-franquia">${_esc(obra)}</div>
          </div>
        </div>
        <div class="nav-card-arq">${arq ? _esc(arq.nome) : _esc(e.arquetipo || '—')}</div>
        <button class="nav-card-btn" onclick="GeradorPJ.verDetalhes('${_esc(e.id)}')">Ver detalhes</button>
      </div>`;
  }

  function _htmlPaginacao(paginaAtual, totalPag) {
    const prev = paginaAtual > 1
      ? `<button class="nav-pag-btn" onclick="GeradorPJ.navegarPagina(-1)">← Anterior</button>`
      : `<button class="nav-pag-btn" disabled>← Anterior</button>`;
    const next = paginaAtual < totalPag
      ? `<button class="nav-pag-btn" onclick="GeradorPJ.navegarPagina(1)">Próxima →</button>`
      : `<button class="nav-pag-btn" disabled>Próxima →</button>`;
    return `
      <div class="nav-paginacao">
        ${prev}
        <span class="nav-pag-info">Página ${paginaAtual} de ${totalPag}</span>
        ${next}
      </div>`;
  }

  function _htmlViewNavegacao() {
    const kbAll = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : []; // eslint-disable-line no-undef
    const arqs  = typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS : [];       // eslint-disable-line no-undef
    const { filtroCategoria, filtroFranquia, filtroArquetipo, ordenacao } = _estado.navegacao;

    const categorias = [...new Set(kbAll.map(e => e.source && e.source.category).filter(Boolean))].sort();
    const franquias  = [...new Set(kbAll.map(e => e.source && e.source.franchise).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const catLabels  = { 'video-game': 'Jogo', 'anime': 'Anime/Mangá', 'comic': 'Quadrinhos',
                         'literature': 'Literatura', 'film': 'Filme', 'tv': 'Série' };

    const filtrados = _aplicarFiltrosNavegacao(kbAll);
    const POR_PAG   = 30;
    const totalPag  = Math.max(1, Math.ceil(filtrados.length / POR_PAG));
    const pagAtual  = Math.min(_estado.navegacao.paginaAtual, totalPag);
    const inicio    = (pagAtual - 1) * POR_PAG;
    const pagina    = filtrados.slice(inicio, inicio + POR_PAG);

    const optsCat = `<option value="">Todas as categorias</option>` +
      categorias.map(c => `<option value="${_esc(c)}" ${filtroCategoria === c ? 'selected' : ''}>${_esc(catLabels[c] || c)}</option>`).join('');
    const optsFrq = `<option value="">Todas as franquias</option>` +
      franquias.map(f => `<option value="${_esc(f)}" ${filtroFranquia === f ? 'selected' : ''}>${_esc(f)}</option>`).join('');
    const optsArq = `<option value="">Todos os arquétipos</option>` +
      arqs.map(a => `<option value="${_esc(a.id)}" ${filtroArquetipo === a.id ? 'selected' : ''}>${a.icone} ${_esc(a.nome)}</option>`).join('');

    const hasFilter = filtroCategoria || filtroFranquia || filtroArquetipo || _estado.navegacao.termoBusca;
    const limparBtn = hasFilter
      ? `<button class="nav-banco-limpar-btn" onclick="GeradorPJ.limparFiltrosNavegacao()">Limpar filtros</button>`
      : '';

    const cards = pagina.map(e => _htmlCardPersonagemMini(e)).join('');
    const paginacao = totalPag > 1 ? _htmlPaginacao(pagAtual, totalPag) : '';

    return `
      <div class="gpj-painel">
        <div class="gpj-view-header">
          <button class="gpj-btn-voltar" onclick="GeradorPJ.voltar()">&#8592; Voltar</button>
          <span class="gpj-view-titulo">Banco de Personagens</span>
        </div>

        <div class="nav-banco-filtros">
          <div class="nav-banco-busca-row">
            <input type="text" id="nav-banco-busca" class="nav-banco-input"
              placeholder="Buscar por nome…"
              value="${_esc(_estado.navegacao.termoBusca)}"
              oninput="GeradorPJ.atualizarNavegacao('termoBusca', this.value)" />
          </div>
          <div class="nav-banco-dropdowns">
            <select class="nav-banco-select" onchange="GeradorPJ.atualizarNavegacao('filtroCategoria', this.value)">${optsCat}</select>
            <select class="nav-banco-select" onchange="GeradorPJ.atualizarNavegacao('filtroFranquia', this.value)">${optsFrq}</select>
            <select class="nav-banco-select" onchange="GeradorPJ.atualizarNavegacao('filtroArquetipo', this.value)">${optsArq}</select>
            <select class="nav-banco-select" onchange="GeradorPJ.atualizarNavegacao('ordenacao', this.value)">
              <option value="nome"     ${ordenacao === 'nome'     ? 'selected' : ''}>Ordenar: Nome</option>
              <option value="franquia" ${ordenacao === 'franquia' ? 'selected' : ''}>Ordenar: Franquia</option>
              <option value="arquetipo"${ordenacao === 'arquetipo'? 'selected' : ''}>Ordenar: Arquétipo</option>
            </select>
          </div>
        </div>

        <div class="nav-banco-contador">
          ${filtrados.length} ${filtrados.length !== 1 ? 'personagens' : 'personagem'} encontrado${filtrados.length !== 1 ? 's' : ''}
          ${limparBtn}
        </div>

        <div class="nav-banco-grid">${cards || `
          <div class="nav-banco-vazio">
            <span class="nav-banco-vazio-icone"></span>
            <p class="nav-banco-vazio-msg">Nenhum personagem encontrado.</p>
            <p class="nav-banco-vazio-dica">Tente outros filtros ou <button class="nav-link-btn" onclick="GeradorPJ.limparFiltrosNavegacao()">limpe os filtros</button>.</p>
          </div>`}</div>

        ${paginacao}
      </div>`;
  }

  // ── Navegação pública ───────────────────────────────────────────

  function mostrarNavegacao() {
    _navegarPara('navegacao');
  }

  function atualizarNavegacao(campo, valor) {
    _estado.navegacao[campo] = valor;
    if (campo !== 'paginaAtual') _estado.navegacao.paginaAtual = 1;

    const isDropdown = campo !== 'termoBusca' && campo !== 'paginaAtual';
    if (isDropdown) {
      const contador = document.querySelector('.nav-banco-contador');
      if (contador) {
        const limpar = contador.querySelector('.nav-banco-limpar-btn');
        const limparHtml = limpar ? limpar.outerHTML : '';
        contador.innerHTML = '— <span class="nav-filtrando"><span class="spinner-btn"></span>Filtrando…</span>' + limparHtml;
      }
      setTimeout(() => _renderView(), 60);
    } else {
      _renderView();
      if (campo === 'termoBusca') {
        setTimeout(() => {
          const el = document.getElementById('nav-banco-busca');
          if (el) { el.focus(); const len = el.value.length; el.setSelectionRange(len, len); }
        }, 0);
      }
    }
  }

  function navegarPagina(delta) {
    const kbAll = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : []; // eslint-disable-line no-undef
    const filtrados = _aplicarFiltrosNavegacao(kbAll);
    const totalPag  = Math.max(1, Math.ceil(filtrados.length / 30));
    _estado.navegacao.paginaAtual = Math.max(1, Math.min(totalPag, _estado.navegacao.paginaAtual + delta));
    _renderView();
  }

  function limparFiltrosNavegacao() {
    _estado.navegacao = { filtroCategoria: '', filtroFranquia: '', filtroArquetipo: '', termoBusca: '', ordenacao: 'nome', paginaAtual: 1 };
    _renderView();
  }

  function verDetalhes(entryId) {
    if (typeof ModalPersonagem === 'undefined') return; // eslint-disable-line no-undef
    const kbAll = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : []; // eslint-disable-line no-undef
    const entry = kbAll.find(e => e.id === entryId);
    if (!entry) return;
    ModalPersonagem.abrir(entry, () => gerarDeEntrada(entryId)); // eslint-disable-line no-undef
  }

  function gerarDeEntrada(entryId) {
    const kbAll = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : []; // eslint-disable-line no-undef
    const entry = kbAll.find(e => e.id === entryId);
    if (!entry) { _mostrarErro('Personagem não encontrado.'); return; }
    const arqs = typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS : []; // eslint-disable-line no-undef
    const arq  = arqs.find(a => a.id === entry.arquetipo);
    if (!arq) { _mostrarErro('Arquétipo não mapeado.'); return; }

    const btn = document.querySelector('.modal-personagem-footer .btn-primario');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-btn"></span>Gerando…'; }

    _estado.badge = 'exato';
    _estado.resultadoBusca = entry;
    _estado.resultadoMatch = { tipo: 'exato', resultado: entry, score: 1.0 };

    setTimeout(() => {
      const personagem = _arquetipoParaPersonagem(arq, _estado.nivel, {
        atributos: entry.atributos,
        tema: entry.tema,
        origem: entry.origem,
        descricao: entry.descricao,
        lacos: (entry.lacos || []).map(l => ({ alvo: l.alvo, emocoes: l.emocoes ? [...l.emocoes] : [] }))
      });
      personagem.nome = _rndNome();
      _estado.pjGerado = { personagem, arquetipo: arq, fonte: 'navegacao', referencia: entry.nome };
      _historico_push(_estado.pjGerado);
      _navegarPara('resultado');
    }, 60);
  }

  // ──────────────────── Inicialização ──────────────────────────────

  function iniciar() {
    _estado.pjGerado = null;
    _estado.resultadoBusca = null;
    _estado.resultadoMatch = null;
    _estado.badge = null;
    _estado.buscaTexto = '';
    _estado.view = 'modo';
    _estado.navegacao = { filtroCategoria: '', filtroFranquia: '', filtroArquetipo: '', termoBusca: '', ordenacao: 'nome', paginaAtual: 1 };
    _renderView();
  }

  return {
    setModo, setNivel, setArquetipo,
    gerarAleatorio, buscarInspiracao, gerarInspiracao,
    escolherCandidato, gerarDeArquetipo, reabrirModalAmbiguo,
    abrirModalArquetipos,
    mostrarNavegacao, atualizarNavegacao, navegarPagina, limparFiltrosNavegacao,
    verDetalhes, gerarDeEntrada,
    carregarNoWizard, novoGerador, sugerirNome, voltar,
    renderizar, iniciar
  };
})();
