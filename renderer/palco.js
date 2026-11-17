// =============================================
// PALCO DO HERÓI
// Painel fixo à esquerda do wizard, como a prévia do personagem numa tela de
// criação de MMO: retrato (ou brasão gerado), nome, classes, dados de atributo,
// estatísticas e equipamento — atualizado a cada escolha. O bloco ligado ao
// passo atual fica em foco; os demais recuam.
// =============================================
(function () {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Blocos do palco em foco para cada passo (índices de PASSOS)
  const FOCO = [
    ['nome'],                       // Identidade
    ['origem'],                     // Origem
    ['tema'],                       // Tema
    ['classes', 'brasao'],          // Classes
    ['dados', 'brasao', 'stats'],   // Atributos
    ['stats'],                      // Estatísticas
    ['equip', 'stats'],             // Equipamento
    null                            // Personagem — tudo em foco
  ];

  const ATRIBS = [
    { id: 'des', nome: 'Destreza', sigla: 'DES' },
    { id: 'vig', nome: 'Vigor', sigla: 'VIG' },
    { id: 'ast', nome: 'Astúcia', sigla: 'AST' },
    { id: 'von', nome: 'Vontade', sigla: 'VON' },
  ];

  // Brasão: anel externo dividido pelos níveis de cada classe; dentro, o losango
  // dos quatro dados de atributo (d6 curto … d12 longo) — a forma do herói.
  function brasaoSVG(p, classesOrd) {
    const C = 120, R = 104, r0 = 74;
    const total = Math.max(p.nivel || 5, 1);
    const pol = (ang, rad) => [C + rad * Math.cos(ang), C + rad * Math.sin(ang)];
    const arco = (a0, a1, rad) => {
      const [x0, y0] = pol(a0, rad), [x1, y1] = pol(a1, rad);
      const grande = a1 - a0 > Math.PI ? 1 : 0;
      return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 ${grande} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    };
    const gap = 0.07;
    let ang = -Math.PI / 2;
    const opac = [1, 0.62, 0.38, 0.25];
    let segs = '';
    classesOrd.forEach((c, i) => {
      const span = (c.niveis / total) * Math.PI * 2;
      if (span <= gap) return;
      segs += `<path d="${arco(ang + gap / 2, ang + span - gap / 2, R)}" class="brasao-seg" style="opacity:${opac[i] ?? 0.25}"/>`;
      ang += span;
    });
    const usado = classesOrd.reduce((s, c) => s + c.niveis, 0);
    if (usado < total) {
      const a1 = -Math.PI / 2 + Math.PI * 2;
      segs += `<path d="${arco(ang + gap / 2, a1 - gap / 2, R)}" class="brasao-trilho"/>`;
    }

    const val = d => (parseInt(String(d || 'd8').slice(1)) || 8);
    const raio = d => r0 * (0.32 + (val(d) - 6) / 6 * 0.68);
    const eixos = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // DES topo, VIG direita, AST base, VON esquerda
    const pts = ATRIBS.map((a, i) => pol(eixos[i], raio(p.atributos[a.id])));
    const guia = ATRIBS.map((a, i) => pol(eixos[i], r0));
    const rotulos = ATRIBS.map((a, i) => {
      const [x, y] = pol(eixos[i], r0 + 14);
      return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" class="brasao-rotulo">${a.sigla}</text>`;
    }).join('');
    return `<svg viewBox="0 0 240 240" class="brasao-svg" role="img" aria-label="Brasão: classes e dados do personagem">
      <circle cx="${C}" cy="${C}" r="${R}" class="brasao-base"/>
      ${segs}
      <polygon points="${guia.map(q => q.map(n => n.toFixed(1)).join(',')).join(' ')}" class="brasao-guia"/>
      <polygon points="${pts.map(q => q.map(n => n.toFixed(1)).join(',')).join(' ')}" class="brasao-forma"/>
      ${pts.map(q => `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="3" class="brasao-ponto"/>`).join('')}
      ${rotulos}
    </svg>`;
  }

  Object.assign(App, {
    _palcoPrev: {},

    renderizarPalco() {
      const el = document.getElementById('palco-heroi');
      if (!el || typeof Estado === 'undefined') return;
      const p = Estado.personagem;
      const stats = this.calcularStats();

      const classesOrd = Object.entries(p.classes || {})
        .map(([id, d]) => ({ id, niveis: d.niveis || 0, nome: GAMEDATA.classes.find(c => c.id === id)?.nome || id }))
        .filter(c => c.niveis > 0)
        .sort((a, b) => b.niveis - a.niveis);

      const tema = p.tema === '_custom' ? p.temaCustom : (GAMEDATA.temas.find(t => t.id === p.tema)?.nome || '');
      const arma = (p.equipamento?.armas || []).map(id => GAMEDATA.armas.find(a => a.id === id)?.nome).filter(Boolean);
      const armadura = p.equipamento?.armadura ? GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura)?.nome : '';
      const escudo = p.equipamento?.escudo ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo)?.nome : '';

      const foco = FOCO[Estado.passoAtual];
      const f = bloco => (!foco || foco.includes(bloco)) ? 'em-foco' : 'recuado';

      const ini = stats.iniciativa >= 0 ? `+${stats.iniciativa}` : `${stats.iniciativa}`;
      const valores = { pv: stats.pvMax, pm: stats.pmMax, pi: stats.piMax, def: stats.defesa, defm: stats.defMagica, ini };
      ATRIBS.forEach(a => { valores[a.id] = p.atributos[a.id] || 'd8'; });
      const mudou = k => (this._palcoPrev[k] !== undefined && this._palcoPrev[k] !== valores[k]) ? ' mudou' : '';

      const stat = (k, rotulo, curto) => `<div class="palco-stat" title="${rotulo}"><span class="palco-stat-val${mudou(k)}">${esc(valores[k])}</span><span class="palco-stat-rot"><span class="rot-longo">${rotulo}</span><span class="rot-curto">${curto || rotulo}</span></span></div>`;
      const linha = (rot, val) => `<div class="palco-linha"><span class="palco-linha-rot">${rot}</span><span class="palco-linha-val${val ? '' : ' vazio'}">${val ? esc(val) : 'a escolher'}</span></div>`;

      const figura = p.imagem
        ? `<div class="palco-retrato"><img src="${p.imagem}" alt="Retrato de ${esc(p.nome || 'seu personagem')}"></div>`
        : `<div class="palco-brasao">${brasaoSVG(p, classesOrd)}</div>`;

      const aberto = el.classList.contains('expandido');
      el.innerHTML = `
        <button type="button" class="palco-alternar" aria-expanded="${aberto}"
          onclick="document.getElementById('palco-heroi').classList.toggle('expandido'); App.renderizarPalco()">${aberto ? 'Recolher' : 'Ver herói'}</button>
        <div class="palco-figura ${f('brasao')}">
          ${figura}
          <label class="palco-retrato-acao">
            <input type="file" accept="image/*" onchange="App.carregarImagemPalco(this)">
            ${p.imagem ? 'Trocar retrato' : 'Adicionar retrato'}
          </label>
        </div>

        <div class="palco-bloco palco-nome-bloco ${f('nome')}">
          <h2 class="palco-nome${p.nome ? '' : ' vazio'}">${p.nome ? esc(p.nome) : 'Herói sem nome'}</h2>
          <p class="palco-identidade${p.identidade ? '' : ' vazio'}">${p.identidade ? esc(p.identidade) : 'Sua identidade aparece aqui'}</p>
        </div>

        <div class="palco-bloco ${f('classes')}">
          <p class="palco-classes">
            <span class="palco-nivel">Nível ${p.nivel || 5}</span>
            ${classesOrd.length
              ? classesOrd.map(c => `<span class="palco-classe">${esc(c.nome)} <b>${c.niveis}</b></span>`).join('')
              : '<span class="palco-classe vazio">nenhuma classe ainda</span>'}
          </p>
        </div>

        <div class="palco-bloco palco-dados ${f('dados')}">
          ${ATRIBS.map(a => `<div class="palco-dado" title="${a.nome}"><span class="palco-dado-val${mudou(a.id)}">${esc(valores[a.id])}</span><span class="palco-dado-rot">${a.nome}</span></div>`).join('')}
        </div>

        <div class="palco-bloco palco-stats ${f('stats')}">
          ${stat('pv', 'PV')}${stat('pm', 'PM')}${stat('pi', 'PI')}
          ${stat('def', 'Defesa', 'DEF')}${stat('defm', 'Def. mágica', 'D.MÁG')}${stat('ini', 'Iniciativa', 'INIC')}
        </div>

        <div class="palco-bloco palco-detalhes">
          <div class="${f('origem')}">${linha('Origem', p.origem)}</div>
          <div class="${f('tema')}">${linha('Tema', tema)}</div>
          <div class="${f('equip')}">
            ${linha('Armas', arma.join(', '))}
            ${linha('Armadura', armadura && armadura !== 'Sem Armadura' ? armadura : (p.equipamento?.armadura ? 'Sem armadura' : ''))}
            ${escudo ? linha('Escudo', escudo) : ''}
          </div>
        </div>`;

      this._palcoPrev = valores;
    },

    // Tela inicial: brasão de um personagem de exemplo, diferente a cada abertura
    renderizarVitrine() {
      const el = document.getElementById('inicio-vitrine');
      const lista = GAMEDATA.personagensClassicos || [];
      if (!el || !lista.length) return;
      const idx = Math.floor(Math.random() * lista.length);
      const pc = lista[idx];
      const classesOrd = pc.classes
        .map(c => ({ id: c.classe, niveis: c.niveis, nome: GAMEDATA.classes.find(k => k.id === c.classe)?.nome || c.classe }))
        .sort((a, b) => b.niveis - a.niveis);
      const nivel = classesOrd.reduce((s, c) => s + c.niveis, 0);
      const p = { nivel, atributos: { des: pc.des, vig: pc.vig, ast: pc.ast, von: pc.von } };
      if (!el.querySelector('.vitrine-arte')) {
        el.innerHTML = `<img class="vitrine-arte" src="img/arte-titulo.jpg" alt="Grupo de heróis de Fabula Ultima diante de um castelo flutuante">
          <div class="vitrine-cartao" id="vitrine-cartao"></div>`;
      }
      el.querySelector('#vitrine-cartao').innerHTML = `
        <div class="vitrine-brasao">${brasaoSVG(p, classesOrd)}</div>
        <div class="vitrine-info">
          <span class="vitrine-nome">${esc(pc.nome)}</span>
          <span class="vitrine-classes">${classesOrd.map(c => `${esc(c.nome)} <b>${c.niveis}</b>`).join(' · ')}</span>
          <span class="vitrine-dados">DES ${pc.des} · VIG ${pc.vig} · AST ${pc.ast} · VON ${pc.von}</span>
          <div class="vitrine-acoes">
            <button class="btn-secundario" onclick="App.carregarPersonagemClassico(${idx})">Começar com este herói</button>
            <button class="btn-mini" onclick="App.renderizarVitrine()">Outro herói</button>
          </div>
        </div>`;
    },

    carregarImagemPalco(input) {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (e) => {
        Estado.personagem.imagem = await this._resizarImagem(e.target.result);
        this.autoSalvar && this.autoSalvar();
        if (Estado.passoAtual === PASSOS.length - 1) this.renderPassoFinalizacao(document.getElementById('wizard-main'));
        this.renderizarPalco();
      };
      reader.readAsDataURL(file);
    },
  });

  // Qualquer edição nas opções reflete no palco no próximo quadro
  let agendado = false;
  const agendar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => { agendado = false; App.renderizarPalco(); });
  };
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('wizard-main');
    if (!main) return;
    ['input', 'change', 'click'].forEach(t => main.addEventListener(t, agendar));
  });

  // Na barra de etapas com rolagem (celular), mantém a aba atual à vista
  const origProgresso = App.atualizarProgressoBar;
  App.atualizarProgressoBar = function () {
    origProgresso.call(this);
    // Seletor de etapa do celular
    const sel = document.getElementById('passo-select');
    if (sel) {
      sel.innerHTML = PASSOS.map((p, i) =>
        `<option value="${i}"${i === Estado.passoAtual ? ' selected' : ''}>${i < Estado.passoAtual ? '✓ ' : ''}${p.titulo}</option>`).join('');
      sel.value = String(Estado.passoAtual);
    }
    const ativa = document.querySelector('.passo-indicador.ativo');
    if (ativa && ativa.parentElement.scrollWidth > ativa.parentElement.clientWidth) {
      ativa.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  };

  // Retrato carregado/removido pelo passo final também atualiza o palco
  const origRemover = App.removerImagem;
  App.carregarImagem = function (input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      Estado.personagem.imagem = await this._resizarImagem(e.target.result);
      this.renderPassoFinalizacao(document.getElementById('wizard-main'));
      this.renderizarPalco();
    };
    reader.readAsDataURL(file);
  };
  App.removerImagem = function () { origRemover.call(this); this.renderizarPalco(); };
})();
