// =============================================
// FABULA ULTIMA — CRIADOR DE PERSONAGENS
// Lógica Principal do App
// =============================================

'use strict';

// Estado global do personagem em criação
const Estado = {
  passoAtual: 0,
  personagem: {
    identidade: '',
    tema: '',
    temaCustom: '',
    origem: '',
    classes: {},
    atributos: { des: 'd8', vig: 'd8', ast: 'd8', von: 'd8' },
    perfilAtrib: '',
    equipamento: {
      armas: [],
      armadura: '',
      escudo: '',
      itensLivres: ''
    },
    lacos: [
      { alvo: '', emocoes: [] },
      { alvo: '', emocoes: [] },
      { alvo: '', emocoes: [] }
    ],
    nome: '',
    pronomes: '',
    descricao: '',
    aparencia: '',
    companheiro: { nome: '', especie: 'fera', descricao: '' },
    imagem: '',
    nivel: 5,
    pontosFabula: 3,
    origemDesc: '',
    temaDescricao: ''
  },
  sessao: {
    pvAtual: null,
    pmAtual: null,
    piAtual: null,
    notas: ''
  },
  encontro: {
    jogadores: 4,
    nivel: 5,
    dificuldade: 'Medio',
    temChefe: false,
    dificuldadeChefe: 'Medio',
    npcs: [],
    fonteMonstros: 'npcs',
    especieFiltro: []
  }
};

// Definição dos passos do wizard
const PASSOS = [
  { id: 'identidade',  titulo: 'Identidade',   icone: '' },
  { id: 'origem',      titulo: 'Origem',        icone: '' },
  { id: 'tema',        titulo: 'Tema',          icone: '' },
  { id: 'classes',     titulo: 'Classes',       icone: '' },
  { id: 'atributos',   titulo: 'Atributos',     icone: '' },
  { id: 'estatisticas',titulo: 'Estatísticas',  icone: '' },
  { id: 'equipamento', titulo: 'Equipamento',   icone: '' },
  { id: 'finalizacao', titulo: 'Personagem',    icone: '' }
];

// Biblioteca de nomes de fantasia (300 masculinos + 300 femininos)
const NOMES_MASC = [
  // Medievais/Cavaleiros
  'Aedric','Aldric','Alaric','Alvar','Brennan','Caelum','Caldric','Castor','Cedric','Corbin',
  'Darian','Davin','Devlin','Dorian','Edric','Evander','Faolan','Gawain','Gideon','Hadrian',
  'Helion','Jaryn','Kaelen','Kieran','Leoric','Lysander','Maxim','Osric','Percival','Roran',
  'Theron','Ulric','Valen','Walric','Xander','Yorick','Zarek','Bastian','Colwyn','Drenin',
  // Nórdicos/Germânicos
  'Bjorn','Gunnar','Harald','Ingvar','Jorgen','Knud','Lars','Magnus','Njord','Ragnar',
  'Sven','Torsten','Ulvar','Volker','Yngvar','Eirik','Fridrik','Geir','Halfdan','Ivar',
  'Jarl','Ketil','Leif','Rolf','Sigurd','Thorvald','Ulf','Vidar','Brynjar','Dagfin',
  // Oriental/Fantasia do Leste
  'Daiki','Hiroshi','Ichiro','Jun','Kenji','Ryu','Takeshi','Yoshi','Baihu','Feng',
  'Haoyu','Jilong','Kuai','Longwei','Ming','Nian','Ping','Rong','Shanlong','Tiang',
  'Wulong','Xiong','Yanlong','Arjun','Devraj','Ishaan','Kiran','Nihal','Surya','Vijay',
  // Élficos/Alta Fantasia
  'Aelion','Berethil','Caladil','Dorval','Erindel','Farandil','Galion','Heliorn','Jalindor','Kaladel',
  'Lorindor','Melindir','Neldil','Orindel','Perindor','Rindel','Seldil','Thandril','Valandil','Windal',
  'Aerindel','Belethion','Caerindel','Dilvari','Eluvian','Faelar','Galvari','Halindor','Iluvion','Jaliendel',
  // Sombrios/Arcanos
  'Azrael','Bael','Corvus','Erebus','Fenris','Grimvael','Hexon','Ikaros','Kael','Lucian',
  'Malachar','Nox','Obsidian','Pyre','Raven','Shade','Thane','Umbral','Vex','Wraith',
  'Amon','Balthazar','Cassius','Dravion','Evastus','Faustus','Gavriel','Hadeon','Ixion','Kallias',
  // Natureza/Elemental
  'Alder','Birch','Cedar','Drake','Ember','Falcon','Gale','Hunter','Jasper','Kelp',
  'Lance','Marsh','Nash','Oak','Pierce','Reed','Stone','Troy','Wade','Ash',
  'Brook','Cliff','Flint','Glen','Hawk','Iron','Jay','Rook','Stag','Thorn',
  // RPG Clássico
  'Aaron','Barnaby','Calix','Dolan','Efren','Faelan','Griffin','Hector','Iago','Jaspar',
  'Kendrick','Lorcan','Matteo','Nico','Orlando','Pascal','Quentin','Ronan','Sebastian','Tobias',
  'Ulysses','Vicente','Wilhelm','Ximeno','Yavin','Zephyr','Adler','Boris','Caspar','Elias',
  // Exóticos/Inventados
  'Aiken','Breccan','Corsair','Damask','Emron','Falkon','Garian','Heston','Izidor','Jovan',
  'Kallon','Landor','Mekon','Nevin','Oxiran','Praxis','Quorath','Rethik','Santor','Thykon',
  'Uvon','Vexar','Wyron','Xavar','Yorlon','Zarkon','Axeon','Braxan','Cronos','Darvion',
  // Eslavos/Bizâncio
  'Aleksei','Bogdan','Casimir','Dmitri','Fyodor','Grigor','Iskander','Konstantin','Lazar','Miroslav',
  'Nikolai','Oleg','Pavel','Radovan','Stefan','Teodor','Vladislav','Yevgeny','Zoran','Adalric',
  'Berengar','Clovis','Dagobert','Eberhard','Folkmar','Goswin','Hrodrik','Imfried','Jodok','Konrad',
  // Antigos/Romano-gregos
  'Acheron','Brutus','Crassus','Decimus','Flavius','Gaius','Horatio','Julius','Kvintus','Longinus',
  'Marcus','Numerius','Octavius','Publius','Quintus','Remus','Servius','Titus','Ulpian','Valentian',
  'Xerxes','Anthos','Branimir','Calistor','Dandric','Endriel','Feloric','Gendar','Hevaron','Iondric'
];

const NOMES_FEM = [
  // Heroínas Clássicas
  'Aelara','Aerith','Aelwyn','Aenya','Alara','Aleria','Alindra','Alira','Alora','Alwyn',
  'Amara','Amaya','Amira','Anara','Andria','Aneth','Anora','Anthea','Arael','Arella',
  'Arwen','Asha','Ashara','Ashira','Astara','Atara','Athena','Aurel','Aurelia','Avara',
  // Élficas/Mágicas
  'Aelindra','Aerindel','Belethil','Caladwen','Carandis','Daerindel','Elawen','Elindra','Eliwyn','Elleth',
  'Elwing','Erindel','Faelindra','Gaelindra','Halindra','Ilindra','Jalindra','Kaelindra','Laelindra','Maelindra',
  'Naelindra','Orindra','Raelindra','Saelindra','Taelindra','Vaelindra','Wynindra','Yaelindra','Zyindra','Xalindra',
  // Medievais/Europeias
  'Adaline','Beatrix','Celestine','Delphine','Emmeline','Feliciane','Genevieve','Heloise','Isolde','Jacinda',
  'Katerina','Leonore','Marguerite','Nikolette','Odette','Petronille','Quintessa','Rosalinde','Seraphine','Teodora',
  'Ulrica','Valentina','Winnifred','Xanthe','Yolanda','Zelphine','Adriana','Brunhilde','Constance','Drusilla',
  // Nórdicas/Germânicas
  'Astrid','Brynhild','Dagmar','Eira','Freya','Gudrun','Helga','Inga','Jorunn','Kara',
  'Lilja','Maren','Nora','Petra','Ragnhild','Sigrid','Thora','Ulla','Valborg','Vibeke',
  'Wulfhild','Ylva','Alfhild','Bergljot','Cecilia','Dordi','Eldrid','Franziska','Geirrid','Helvik',
  // Oriental/Fantasia do Leste
  'Akari','Chizuru','Emiko','Fumiko','Haruka','Ichika','Junko','Kazuki','Leilani','Maiko',
  'Naoko','Otsuki','Riko','Sakura','Tamiko','Umeko','Yuki','Akemi','Baihe','Chunhua',
  'Daiyu','Fengling','Hualan','Jiaying','Lian','Meiling','Nuanyu','Qiuying','Roulan','Xiulan',
  // Sombrias/Místicas
  'Azalea','Belladonna','Cassandra','Darkwyn','Echidna','Faewyn','Grimwen','Hexara','Ilithya','Jadis',
  'Kallista','Lyria','Morrigan','Niamh','Obsidiana','Phaedra','Quieta','Ravenna','Sybilla','Tenebra',
  'Vesper','Wicka','Xiphia','Yennefer','Zephyrine','Arachne','Basilica','Circe','Draconia','Erevna',
  // Natureza/Elemental
  'Amber','Blossom','Coral','Daisy','Ember','Fern','Glacia','Hazel','Iris','Jade',
  'Laurel','Misty','Nettle','Opal','Pearl','Quartz','Rose','Starling','Teal','Violet',
  'Willow','Xanthe','Yarrow','Zinnia','Briar','Clover','Dew','Flora','Glaciel','Holly',
  // Exóticas/Inventadas
  'Aelira','Baelith','Caelith','Daelith','Faelith','Gaelith','Haelith','Jaelith','Kaelith','Laelith',
  'Maelith','Naelith','Raelith','Saelith','Taelith','Vaelith','Xaelith','Yaelith','Zaelith','Aevara',
  'Bevara','Cevara','Devara','Fevara','Gevara','Hevara','Jevara','Kevara','Levara','Mevara',
  // Eslavas/Bizântinas
  'Agrafena','Bianka','Catarina','Darinka','Elizaveta','Fedora','Galina','Honorata','Irina','Jovana',
  'Kalina','Lyudmila','Milena','Nadezhda','Oksana','Polina','Rada','Slavica','Tatyana','Ulyana',
  'Valentyna','Vyoleta','Wanda','Xenia','Yaroslava','Zora','Anastasia','Bozhena','Cvetanka','Desislava',
  // Antigas/Greco-romanas
  'Acantha','Briseis','Calliope','Daphne','Electra','Felixa','Glaucis','Hypatia','Iphigenia','Jocasta',
  'Klio','Lysithea','Melisande','Nausikaa','Olympia','Penelope','Rhodopis','Sappho','Thaleia','Urania',
  'Veronika','Zenobia','Alcmene','Byblis','Coronis','Deidamia','Eilithyia','Faranda','Galadrielle','Herath'
];

// Tabela de ícones por classe
const ICONES_CLASSES = {
  andarilho:       '',
  arcanista:       '',
  atirador:        '',
  elementalista:   '',
  entropista:      '',
  erudito:         '',
  espiritualista:  '',
  furioso:         '',
  guerreiro_sombrio: '',
  guardiao:        '',
  inventor:        '',
  ladino:          '',
  mestre_de_armas: '',
  orador:          '',
  quimerista:      '',
  // Expansões
  comandante:       '',
  dancarino:        '',
  simbolista:       '',
  virtuoso:         '',
  floralista:       '',
  gourmet:          '',
  invocador:        '',
  mercador:         '',
  esper:            '',
  mutante:          '',
  piloto:           '',
  astrologo:        '',
  bandoleiro:       '',
  carteador:        '',
  cavaleiro_magico: '',
  forjador_de_almas:'',
  lamina_carmesim:  '',
  malandro:         '',
  necromante:       ''
};

// Mapeamento: classe → atributos primário/secundário (para sugestão de perfis)
const CLASSES_ATRIBS = {
  andarilho:       { prim: 'des', sec: 'ast' },
  arcanista:       { prim: 'ast', sec: 'von' },
  atirador:        { prim: 'des', sec: 'ast' },
  elementalista:   { prim: 'ast', sec: 'von' },
  entropista:      { prim: 'von', sec: 'ast' },
  erudito:         { prim: 'ast', sec: 'von' },
  espiritualista:  { prim: 'von', sec: 'ast' },
  furioso:         { prim: 'vig', sec: 'von' },
  guerreiro_sombrio:{ prim: 'des', sec: 'vig' },
  guardiao:        { prim: 'vig', sec: 'des' },
  inventor:        { prim: 'ast', sec: 'des' },
  ladino:          { prim: 'des', sec: 'von' },
  mestre_de_armas: { prim: 'des', sec: 'vig' },
  orador:          { prim: 'von', sec: 'ast' },
  quimerista:      { prim: 'ast', sec: 'von' },
  // Expansões
  comandante:       { prim: 'vig', sec: 'ast' },
  dancarino:        { prim: 'des', sec: 'ast' },
  simbolista:       { prim: 'ast', sec: 'von' },
  virtuoso:         { prim: 'ast', sec: 'von' },
  floralista:       { prim: 'ast', sec: 'vig' },
  gourmet:          { prim: 'vig', sec: 'von' },
  invocador:        { prim: 'ast', sec: 'von' },
  mercador:         { prim: 'von', sec: 'des' },
  esper:            { prim: 'ast', sec: 'von' },
  mutante:          { prim: 'vig', sec: 'des' },
  piloto:           { prim: 'des', sec: 'ast' },
  astrologo:        { prim: 'ast', sec: 'von' },
  bandoleiro:       { prim: 'des', sec: 'vig' },
  carteador:        { prim: 'ast', sec: 'des' },
  cavaleiro_magico: { prim: 'vig', sec: 'ast' },
  forjador_de_almas:{ prim: 'vig', sec: 'von' },
  lamina_carmesim:  { prim: 'des', sec: 'vig' },
  malandro:         { prim: 'des', sec: 'von' },
  necromante:       { prim: 'ast', sec: 'von' }
};

// Sobrenomes de fantasia (~150)
const NOMES_SOBRENOME = [
  // Natureza/Elementos
  'Darkwood','Ironvale','Stormwatch','Nightvale','Brightstone','Coldwater','Ashfall',
  'Emberveil','Frostpeak','Goldenleaf','Hawkridge','Ironwood','Jadeblade','Kelpstone',
  'Lightwave','Moonfall','Netherveil','Oakenshield','Peakstone','Quicksilver',
  'Ravencrest','Silverbrook','Thornwall','Umbervale','Verdanhill','Windstone',
  // Arcanos/Místicos
  'Aethermoor','Bloodmoon','Crystalveil','Dawnweaver','Emberglow','Fateweaver',
  'Ghostmantle','Hexenbane','Ironspell','Jadecaster','Kindlewick','Lightbinder',
  'Moonweaver','Nightwhisper','Omenborn','Prismcaller','Runeblade','Shadowbind',
  'Thornweave','Umbrahand','Voidwalker','Wandermark','Xilospell','Zenithborn',
  // Família/Clã
  'Valkyr','Steelborn','Ironbane','Coldforge','Blackmantle','Redcloak','Whitecrown',
  'Greymantle','Blueveil','Stonehearth','Flameborn','Iceborn','Stormborn','Earthborn',
  'Starborn','Shadowborn','Lightborn','Voidborn','Fireborn','Waterborn',
  // Élfico/Exótico
  'vel\'Akar','de\'Lorith','al\'Varen','van\'Eldric','von\'Thalric','ar\'Selen',
  'Aelithar','Caladwen','Dorvalith','Erindalis','Farandil','Gaelindor','Halvendar',
  'Ilindar','Jalendis','Kaelindor','Lorindal','Maelindor','Naelindor','Orindal',
  // Sonoro/Inventado
  'Arkvane','Braxmore','Colvane','Drakmore','Elsvane','Falkvane','Graxmore',
  'Hexmore','Irvane','Jolvane','Kolvane','Laxmore','Marvane','Nexmore',
  'Orvane','Paxmore','Qolvane','Raxmore','Solvane','Traxmore',
  // Títulos/Epítetos
  'da Chama','do Abismo','da Tempestade','da Sombra','da Luz','do Norte',
  'do Sul','do Leste','do Oeste','das Ruínas','das Estrelas','do Crepúsculo',
  'da Madrugada','do Alvorecer','das Trevas','da Esperança','da Morte'
];

// Nomes wizard — array plano para o step de finalização (não confundir com NOMES_SUGERIDOS de nomes-sugeridos.js)
const NOMES_WIZARD = [...NOMES_MASC.slice(0,20), ...NOMES_FEM.slice(0,20)];

// =============================================
// APP PRINCIPAL
// =============================================
const App = {

  // Controle interno do filtro de poderes e gerador de nomes
  _filtroPoderes: '',
  _genNomeGenero: 'q',
  _genNomeTipo: 's',

  // ------ INICIALIZAÇÃO ------

  iniciarCriacao() {
    Estado.passoAtual = 0;
    Estado.personagem = {
      identidade: '',
      tema: '',
      temaCustom: '',
      origem: '',
      classes: {},
      atributos: { des: 'd8', vig: 'd8', ast: 'd8', von: 'd8' },
      perfilAtrib: '',
      equipamento: { armas: [], armadura: 'sem_armadura', escudo: '' },
      lacos: [
        { alvo: '', emocoes: [] },
        { alvo: '', emocoes: [] },
        { alvo: '', emocoes: [] }
      ],
      nome: '',
      pronomes: 'ele/dele',
      descricao: '',
      aparencia: '',
      imagem: '',
      nivel: 5,
      pontosFabula: 3
    };
    this.descartarRascunho();
    this._filtroPoderes = '';
    this._genNomeGenero = 'q';
    this._genNomeTipo = 's';
    this.mostrarTela('wizard');
    this.renderizarPasso();
  },

  mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-' + id).classList.add('ativa');
    if (id === 'inicio') this.renderizarHomeScreen();
    if (id !== 'wizard') {
      const sv = document.getElementById('stats-vivo');
      if (sv) sv.style.display = 'none';
    }
  },

  voltarInicio() {
    const jaIniciou = Estado.personagem.nome || Estado.personagem.identidade || Object.keys(Estado.personagem.classes).length > 0;
    if (jaIniciou) {
      this.mostrarModal(
        'Voltar ao Início',
        'O progresso atual será salvo como rascunho. Deseja continuar?',
        () => {
          this.autoSalvar();
          this.mostrarTela('inicio');
        }
      );
    } else {
      this.mostrarTela('inicio');
    }
  },

  voltarWizard() {
    this.mostrarTela('wizard');
    this.renderizarPasso();
  },

  // =============================================
  // MODO SESSÃO
  // =============================================
  mostrarSessao() {
    const stats = this.calcularStats();
    if (Estado.sessao.pvAtual === null) Estado.sessao.pvAtual = stats.pvMax;
    if (Estado.sessao.pmAtual === null) Estado.sessao.pmAtual = stats.pmMax;
    if (Estado.sessao.piAtual === null) Estado.sessao.piAtual = stats.piMax;
    this.mostrarTela('sessao');
    this.renderSessao();
  },

  fecharSessao() {
    this.mostrarTela('ficha');
  },

  resetarSessao() {
    const stats = this.calcularStats();
    Estado.sessao.pvAtual = stats.pvMax;
    Estado.sessao.pmAtual = stats.pmMax;
    Estado.sessao.piAtual = stats.piMax;
    this.renderSessao();
    this.mostrarToast('Recursos resetados!', 'sucesso');
  },

  _getSessaoMax(campo, stats) {
    return { pvAtual: stats.pvMax, pmAtual: stats.pmMax, piAtual: stats.piMax }[campo] || 0;
  },

  setSessaoStat(campo, delta) {
    const stats = this.calcularStats();
    const max = this._getSessaoMax(campo, stats);
    Estado.sessao[campo] = Math.max(0, Math.min(max, (Estado.sessao[campo] || 0) + delta));
    this.renderSessao();
  },

  setSessaoStatDireto(campo, val) {
    const stats = this.calcularStats();
    const max = this._getSessaoMax(campo, stats);
    const v = parseInt(val);
    if (!isNaN(v)) Estado.sessao[campo] = Math.max(0, Math.min(max, v));
    this.autoSalvar();
  },

  setSessaoNotas(v) {
    Estado.sessao.notas = v;
  },

  renderSessao() {
    const div = document.getElementById('sessao-conteudo');
    if (!div) return;
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const s = Estado.sessao;
    const pvPct   = stats.pvMax ? Math.round((s.pvAtual / stats.pvMax) * 100) : 0;
    const pmPct   = stats.pmMax ? Math.round((s.pmAtual / stats.pmMax) * 100) : 0;
    const piPct   = stats.piMax ? Math.round((s.piAtual / stats.piMax) * 100) : 0;
    const emCrise = s.pvAtual <= stats.crise;

    const statBar = (label, campo, atual, max, cor, pct) => `
      <div class="sessao-stat-bloco">
        <div class="sessao-stat-header">
          <span class="sessao-stat-label" style="color:${cor}">${label}</span>
          <span class="sessao-stat-val">${atual} / ${max}</span>
        </div>
        <div class="sessao-barra-outer">
          <div class="sessao-barra-inner" style="width:${pct}%;background:${cor};"></div>
        </div>
        <div class="sessao-ctrl">
          <button class="sessao-btn-delta" onclick="App.setSessaoStat('${campo}', -5)">−5</button>
          <button class="sessao-btn-delta" onclick="App.setSessaoStat('${campo}', -1)">−1</button>
          <input type="number" class="sessao-input-direto" value="${atual}" min="0" max="${max}"
            onchange="App.setSessaoStatDireto('${campo}', this.value)" />
          <button class="sessao-btn-delta" onclick="App.setSessaoStat('${campo}', +1)">+1</button>
          <button class="sessao-btn-delta" onclick="App.setSessaoStat('${campo}', +5)">+5</button>
        </div>
      </div>`;

    div.innerHTML = `
      <div class="sessao-personagem-info">
        <div class="sessao-avatar">
          ${p.imagem
            ? `<img src="${p.imagem}" class="sessao-avatar-img" />`
            : `<span>${ICONES_CLASSES[Object.keys(p.classes)[0]] || ''}</span>`}
        </div>
        <div>
          <div class="sessao-nome">${p.nome || 'Sem Nome'}</div>
          <div class="sessao-classes">${Object.entries(p.classes).filter(([,d])=>d.niveis>0).map(([id,d])=>{
            const cl = GAMEDATA.classes.find(c=>c.id===id);
            return cl ? `${ICONES_CLASSES[id]||''} ${cl.nome} ${d.niveis}nv` : '';
          }).join(' · ')}</div>
        </div>
      </div>

      ${emCrise ? `<div class="sessao-crise-alerta">EM CRISE! PV abaixo de ${stats.crise}</div>` : ''}

      <div class="sessao-stats-grid">
        ${statBar('PV', 'pvAtual', s.pvAtual, stats.pvMax, 'var(--cor-sucesso)', pvPct)}
        ${statBar('PM', 'pmAtual', s.pmAtual, stats.pmMax, 'var(--cor-info)', pmPct)}
        ${statBar('PI', 'piAtual', s.piAtual, stats.piMax, 'var(--cor-dourado)', piPct)}
      </div>

      <div class="sessao-info-rapida">
        <div class="sessao-info-item"><span class="sii-val">${stats.defesa}</span><span class="sii-label">DEF</span></div>
        <div class="sessao-info-item"><span class="sii-val">${stats.defMagica}</span><span class="sii-label">DefM</span></div>
        <div class="sessao-info-item"><span class="sii-val">${stats.iniciativa >= 0 ? '+'+stats.iniciativa : stats.iniciativa}</span><span class="sii-label">Init</span></div>
        <div class="sessao-info-item"><span class="sii-val">${p.pontosFabula}</span><span class="sii-label">Fábula</span></div>
      </div>

      <div class="sessao-notas-bloco">
        <label class="sessao-notas-label">Notas da Sessão</label>
        <textarea class="sessao-notas-input" rows="6"
          placeholder="Anotações rápidas: iniciativa dos NPCs, lembretes, condições ativas..."
          oninput="App.setSessaoNotas(this.value)">${s.notas || ''}</textarea>
      </div>
    `;
  },

  // =============================================
  // GERADOR DE NPC
  // =============================================
  mostrarNPC() {
    this.mostrarTela('npc');
    this.switchNPCTab(this._npcTab || 'gerador');
  },

  fecharNPC() {
    this.mostrarTela('inicio');
  },

  mostrarGeradorPJ() {
    this.mostrarTela('gerador-pj');
    if (typeof GeradorPJ !== 'undefined') GeradorPJ.iniciar();
  },

  fecharGeradorPJ() {
    this.mostrarTela('inicio');
  },

  _npcTab: 'gerador',
  _npcGerado: null,
  _npcNivel: 5,
  _npcTipo: 'Inimigo',
  _npcClasse: '',

  switchNPCTab(tab) {
    this._npcTab = tab;
    ['gerador','encontro'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) btn.classList.toggle('ativo', t === tab);
    });
    const acoes = document.getElementById('npc-header-acoes');
    if (acoes) {
      acoes.innerHTML = tab === 'gerador'
        ? `<button class="btn-primario" onclick="App.gerarNPC()">Gerar NPC</button>`
        : `<button class="btn-primario" onclick="App.gerarEncontro()">Gerar Encontro</button>`;
    }
    if (tab === 'gerador') this.renderNPCGenerator();
    else this.renderEncontro();
  },

  renderNPCGenerator() {
    const div = document.getElementById('npc-conteudo');
    if (!div) return;
    const npc = this._npcGerado;
    div.innerHTML = `
      <div class="npc-painel">
        <div class="npc-config card">
          <h4 style="color:var(--cor-dourado);margin-bottom:1rem;">Configurações</h4>
          <div class="campo-grupo">
            <label class="campo-label">Nível do NPC</label>
            <div class="npc-nivel-ctrl">
              <button class="btn-mini" onclick="App._npcNivel=Math.max(1,App._npcNivel-1);App.renderNPCGenerator()">−</button>
              <span class="npc-nivel-val">${this._npcNivel || 5}</span>
              <button class="btn-mini" onclick="App._npcNivel=Math.min(50,App._npcNivel+1);App.renderNPCGenerator()">+</button>
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Tipo de NPC</label>
            <div class="npc-tipo-btns">
              ${['Aliado','Inimigo','Neutro','Chefe'].map(t => `
                <button class="gen-btn ${(this._npcTipo||'Inimigo')===t?'ativo':''}"
                  onclick="App._npcTipo='${t}';App.renderNPCGenerator()">${t}</button>
              `).join('')}
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Classe (opcional)</label>
            <select class="campo-input" onchange="App._npcClasse=this.value;App.renderNPCGenerator()">
              <option value="">Aleatório</option>
              ${GAMEDATA.classes.map(cl => `<option value="${cl.id}" ${(this._npcClasse||'') === cl.id ? 'selected' : ''}>${cl.nome}</option>`).join('')}
            </select>
          </div>
          <button class="btn-primario" style="width:100%;" onclick="App.gerarNPC()">Gerar NPC</button>
        </div>
        <div class="npc-resultado card">
          ${npc ? this._renderNPCResultado(npc) : '<div class="npc-vazio"><p>Clique em "Gerar NPC" para criar um personagem não-jogador.</p><p style="font-size:2rem;opacity:0.3"></p></div>'}
        </div>
      </div>
    `;
  },

  _calcEquipNPC(marcialEquip) {
    const podeMarcial = { armas_corpo_a_corpo: false, armas_distancia: false, armaduras: false, escudos: false };
    (marcialEquip || []).forEach(m => { podeMarcial[m] = true; });
    const armasDisponiveis = GAMEDATA.armas.filter(a =>
      !a.marcial || podeMarcial[a.alcance === 'distancia' ? 'armas_distancia' : 'armas_corpo_a_corpo']);
    const armas = armasDisponiveis.length ? [this._rndArr(armasDisponiveis)] : [];
    const armadurasDisp = GAMEDATA.armaduras.filter(a => !a.marcial || podeMarcial.armaduras);
    const armadura = armadurasDisp.length ? this._rndArr(armadurasDisp) : null;
    const escudosDisp = GAMEDATA.escudos.filter(e => !e.marcial || podeMarcial.escudos);
    const escudo = (escudosDisp.length && Math.random() < (podeMarcial.escudos ? 0.4 : 0.25))
      ? this._rndArr(escudosDisp) : null;
    return { armas, armadura, escudo };
  },

  _calcStatsNPC(nivel, cl, atribs) {
    const v = (d) => parseInt(d.slice(1)) || 8;
    const desVal = v(atribs.des), vigVal = v(atribs.vig), astVal = v(atribs.ast), vonVal = v(atribs.von);
    let pvBonus = 0, pmBonus = 0, piBonus = 0;
    cl.beneficiosIniciais.forEach(b => {
      if (b.startsWith('+5 PV')) pvBonus += 5;
      if (b.startsWith('+5 PM')) pmBonus += 5;
      if (b.startsWith('+2 PI')) piBonus += 2;
    });
    return {
      pv: nivel + vigVal * 5 + pvBonus,
      pm: nivel + vonVal * 5 + pmBonus,
      pi: 6 + piBonus,
      crise: Math.ceil((nivel + vigVal * 5 + pvBonus) / 2),
      desVal, vigVal, astVal, vonVal
    };
  },

  _calcDefNPC(desVal, astVal, armadura, escudo) {
    const parse = (f, d, a) => {
      const n = parseInt(f);
      if (!isNaN(n)) return n;
      if (f === 'DES') return d;
      if (f === 'AST') return a;
      if (/^DES[+-]\d+$/.test(f)) return d + parseInt(f.slice(3));
      if (/^AST[+-]\d+$/.test(f)) return a + parseInt(f.slice(3));
      return d;
    };
    const sd = escudo ? (parseInt(escudo.defesa) || 0) : 0;
    const sm = escudo ? (parseInt(escudo.defMagica) || 0) : 0;
    return {
      def:  parse(armadura?.defesa    || 'DES', desVal, astVal) + sd,
      defM: parse(armadura?.defMagica || 'AST', desVal, astVal) + sm,
      init: armadura ? (armadura.iniciativa || 0) : 0
    };
  },

  gerarNPC(nivel, tipo, classeId) {
    nivel    = nivel    ?? this._npcNivel ?? 5;
    tipo     = tipo     ?? this._npcTipo  ?? 'Inimigo';
    classeId = classeId ?? this._npcClasse ?? '';

    // Determinar número de classes (2 ou 3, mínimo 1 nível por classe)
    const numClasses = (nivel >= 3 && Math.random() < 0.35) ? 3 : 2;

    // Selecionar classes
    let escolhidas = [];
    if (classeId) {
      const principal = GAMEDATA.classes.find(c => c.id === classeId);
      if (!principal) return null;
      escolhidas.push(principal);
      const resto = GAMEDATA.classes.filter(c => c.id !== classeId);
      for (let i = 1; i < numClasses && resto.length; i++) {
        const idx = Math.floor(Math.random() * resto.length);
        escolhidas.push(resto.splice(idx, 1)[0]);
      }
    } else {
      const embaralhado = [...GAMEDATA.classes].sort(() => Math.random() - 0.5);
      escolhidas = embaralhado.slice(0, numClasses);
    }
    if (!escolhidas.length) return null;

    // Distribuir níveis (mínimo 1 por classe, em ordem decrescente)
    const parts = new Array(escolhidas.length).fill(1);
    let rem = nivel - escolhidas.length;
    while (rem > 0) { parts[Math.floor(Math.random() * escolhidas.length)]++; rem--; }
    parts.sort((a, b) => b - a);

    // Atributos
    const dadosPool = ['d6','d8','d10','d12'];
    const pesosMap  = { 'Chefe': [0,1,2,3], 'Aliado': [0,1,2,1] };
    const pesos = pesosMap[tipo] || [0,1,1,2];
    const total = pesos.reduce((a,b) => a + b, 0);
    const rndDado = () => {
      let r = Math.random() * total;
      for (let i = 0; i < dadosPool.length; i++) { r -= pesos[i]; if (r <= 0) return dadosPool[i]; }
      return 'd8';
    };
    const atribs = { des: rndDado(), vig: rndDado(), ast: rndDado(), von: rndDado() };

    // Poderes por classe
    const classesData = escolhidas.map((cl, i) => {
      const niveis = parts[i];
      const poderesSelecionados = [];
      const pool = [...cl.poderes];
      const cnts = {};
      for (let j = 0; j < niveis && pool.length > 0; j++) {
        const idx = Math.floor(Math.random() * pool.length);
        const po = pool[idx];
        poderesSelecionados.push(po.id);
        cnts[po.id] = (cnts[po.id] || 0) + 1;
        if (cnts[po.id] >= (po.repeticoes || 1)) pool.splice(idx, 1);
      }
      return { cl, niveis, poderesSelecionados };
    });

    // Classe primária = a com mais níveis
    const cl = classesData[0].cl;

    // Agregar benefícios e marcialEquip de todas as classes
    const allBeneficios = classesData.flatMap(({ cl: c }) => c.beneficiosIniciais);
    const marcialEquipUnion = [...new Set(classesData.flatMap(({ cl: c }) => c.marcialEquip))];

    const baseStats = this._calcStatsNPC(nivel, { beneficiosIniciais: allBeneficios }, atribs);
    const equip     = this._calcEquipNPC(marcialEquipUnion);
    const defStats  = this._calcDefNPC(baseStats.desVal, baseStats.astVal, equip.armadura, equip.escudo);

    const sobPool = NOMES_SOBRENOME || [];
    const nome = this._rndArr([...NOMES_MASC, ...NOMES_FEM]) + (sobPool.length ? ' ' + this._rndArr(sobPool) : '');

    // poderesSelecionados agregado (para compatibilidade com export antigo)
    const poderesSelecionados = classesData.flatMap(c => c.poderesSelecionados);

    const npc = { nome, tipo, nivel, cl, classes: classesData, atribs, poderesSelecionados, notas: '', ...baseStats, ...equip, ...defStats };
    this._npcGerado = npc;
    if (this._npcTab === 'gerador') this.renderNPCGenerator();
    return npc;
  },

  _tipoCor(tipo) {
    return { 'Aliado':'var(--cor-sucesso)', 'Inimigo':'var(--cor-perigo)', 'Neutro':'var(--cor-texto-muted)', 'Chefe':'var(--cor-dourado)' }[tipo] || 'var(--cor-texto-muted)';
  },

  _renderNPCResultado(npc, opts = {}) {
    const { npcIdx } = opts;
    const { nome, tipo, nivel, cl, atribs, pv, pm, pi, crise, desVal, astVal, def, defM, init, armas, armadura, escudo } = npc;
    const armaStr = armas && armas.length ? armas.map(a =>
      a.precisao === null ? a.nome : `${a.nome} (Acc${a.precisao >= 0 ? '+' : ''}${a.precisao ?? 0}, ${a.dano})`
    ).join('\n') : '—';
    const armStr  = armadura ? armadura.nome : 'Sem armadura';
    const escStr  = escudo   ? escudo.nome   : null;
    const onInputNome  = npcIdx !== undefined ? `App._encontroNPCEdit(${npcIdx},'nome',this.value)` : `App._npcGerado.nome=this.value`;
    const onInputNotas = npcIdx !== undefined ? `App._encontroNPCEdit(${npcIdx},'notas',this.value)` : `App._npcGerado.notas=this.value`;
    const jsonFn  = npcIdx !== undefined ? `App.exportarNPCJSON(Estado.encontro.npcs[${npcIdx}])` : `App.exportarNPCJSON()`;
    const pdfFn   = npcIdx !== undefined ? `App.exportarNPCPDF(Estado.encontro.npcs[${npcIdx}])` : `App.exportarNPCPDF()`;

    // Bloco de poderes: multiclasse ou classe única
    const poderesSection = npc.isMonstro ? '' : (npc.classes || [{ cl, niveis: nivel, poderesSelecionados: npc.poderesSelecionados || [] }]).map(({ cl: c, niveis: nv, poderesSelecionados: pods }) => {
      const pm = this._agruparPoderes(pods);
      const pH = Object.entries(pm).map(([pid, cnt]) => {
        const pod = c.poderes.find(p => p.id === pid);
        return `<span class="ficha-poder-tag" title="${pod?.descricao || ''}">${pod ? pod.nome : pid}${cnt > 1 ? ` (NP ${cnt})` : ''}</span>`;
      }).join('');
      const pdH = Object.entries(pm).map(([pid, cnt]) => {
        const pod = c.poderes.find(p => p.id === pid);
        if (!pod?.descricao) return '';
        return `<div class="npc-poder-desc-item"><strong>${pod.nome}${cnt > 1 ? ` (NP ${cnt})` : ''}:</strong> <span style="color:var(--cor-texto-muted);font-size:0.82em">${pod.descricao}</span></div>`;
      }).join('');
      return `
        <div class="npc-poderes">
          <div class="npc-poderes-titulo">${ICONES_CLASSES[c.id] || ''} ${c.nome} <span style="color:var(--cor-texto-muted);font-size:0.8em;font-weight:400">Nv${nv}</span></div>
          <div class="ficha-poderes-lista">${pH || '<em style="color:var(--cor-texto-muted)">Nenhum</em>'}</div>
        </div>
        ${pdH ? `<div class="npc-poderes-desc">${pdH}</div>` : ''}`;
    }).join('');

    // Linha de meta: lista todas as classes ou espécie do monstro
    const metaClasses = npc.isMonstro
      ? `<span>${cl.nome}</span>`
      : `<span>${(npc.classes || [{ cl, niveis: nivel }]).map(({ cl: c, niveis: nv }) => `${ICONES_CLASSES[c.id] || ''} ${c.nome} Nv${nv}`).join(' / ')}</span>`;

    return `
      <div class="npc-nome-header">
        <input class="npc-nome-edit campo-input" type="text" value="${nome}"
          oninput="${onInputNome}" style="font-size:1.1rem;font-weight:700;flex:1;" />
        <span class="npc-tipo-badge" style="background:${this._tipoCor(tipo)}">${tipo}</span>
      </div>
      <div class="npc-meta">
        ${metaClasses}
        <span>Nível ${nivel}</span>
      </div>
      <div class="npc-stats-row">
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-sucesso)">${pv}</span><span>PV</span></div>
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-aviso)">${crise}</span><span>Crise</span></div>
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-info)">${pm}</span><span>PM</span></div>
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-dourado)">${pi}</span><span>PI</span></div>
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-primaria-clara)">${def ?? desVal}</span><span>DEF</span></div>
        <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-primaria-clara)">${defM ?? astVal}</span><span>DefM</span></div>
        <div class="npc-stat"><span class="npc-sv">${(init ?? 0) >= 0 ? '+' : ''}${init ?? 0}</span><span>Init</span></div>
      </div>
      <div class="npc-atribs">
        <span class="npc-atrib">DES ${atribs.des}</span>
        <span class="npc-atrib">VIG ${atribs.vig}</span>
        <span class="npc-atrib">AST ${atribs.ast}</span>
        <span class="npc-atrib">VON ${atribs.von}</span>
      </div>
      ${npc.isMonstro ? `
      <div class="npc-equip">
        <div class="npc-poderes-titulo" style="margin-bottom:0.4rem">Ataques</div>
        ${(npc.armas || []).map(a => `<div class="npc-equip-item" style="display:block;margin-bottom:0.25rem">${a.nome}</div>`).join('') || '<span class="npc-equip-item">—</span>'}
      </div>
      <div class="npc-poderes">
        <div class="npc-poderes-titulo">Habilidades Especiais</div>
        <div>${(npc.especial || []).map(s => `<div class="npc-poder-desc-item"><span style="color:var(--cor-texto-muted);font-size:0.82em">${s}</span></div>`).join('') || '<em style="color:var(--cor-texto-muted)">Nenhuma</em>'}</div>
      </div>
      ${npc.tracos ? `<div style="font-size:0.78rem;color:var(--cor-texto-muted);margin-top:0.3rem">Traços: ${npc.tracos}</div>` : ''}
      ${npc.fonte ? `<div style="font-size:0.72rem;color:var(--cor-texto-muted);margin-top:0.2rem;opacity:0.7">Fonte: ${npc.fonte}</div>` : ''}
      <div class="campo-grupo" style="margin-top:0.8rem;">
        <label class="campo-label">Notas</label>
        <textarea class="campo-input" rows="2"
          placeholder="Notas adicionais..."
          oninput="${onInputNotas}">${npc.notas || ''}</textarea>
      </div>` : `
      <div class="npc-equip">
        <span class="npc-equip-item">${armaStr}</span>
        <span class="npc-equip-item">${armStr}</span>
        ${escStr ? `<span class="npc-equip-item">${escStr}</span>` : ''}
      </div>
      ${poderesSection}
      <div class="campo-grupo" style="margin-top:0.8rem;">
        <label class="campo-label">Notas e Habilidades Especiais</label>
        <textarea class="campo-input" rows="2"
          placeholder="Táticas, condições especiais, habilidades únicas..."
          oninput="${onInputNotas}">${npc.notas || ''}</textarea>
      </div>`}
      <div class="npc-export-btns">
        ${npcIdx === undefined ? `<button class="btn-secundario" onclick="App.copiarNPC()">Copiar</button>` : ''}
        <button class="btn-secundario" onclick="${jsonFn}">JSON Foundry</button>
        <button class="btn-primario" onclick="${pdfFn}">PDF</button>
      </div>
    `;
  },

  copiarNPC() {
    const npc = this._npcGerado;
    if (!npc) return;
    const { nome, tipo, nivel, cl, atribs, pv, pm, pi, crise, def, defM, init, desVal, astVal, poderesSelecionados, armas, armadura, escudo } = npc;
    let linhas;
    if (npc.isMonstro) {
      linhas = [
        `${nome} [${tipo} | ${cl.nome} Nv${nivel}]`,
        `PV: ${pv} (Crise: ${crise}) | PM: ${pm} | Init: ${(init ?? 0) >= 0 ? '+' : ''}${init ?? 0}`,
        `DEF: ${def ?? desVal} | DefM: ${defM ?? astVal}`,
        `Atribs: DES ${atribs.des} | VIG ${atribs.vig} | AST ${atribs.ast} | VON ${atribs.von}`,
        ...(npc.tracos ? [`Traços: ${npc.tracos}`] : []),
        ...(armas || []).map(a => `${a.nome}`),
        ...(npc.especial || []).map(s => `• ${s}`),
        ...(npc.fonte ? [`Fonte: ${npc.fonte}`] : [])
      ];
    } else {
      const classeInfo = (npc.classes || [{ cl, niveis: nivel }]).map(({ cl: c, niveis: nv }) => `${c.nome} Nv${nv}`).join(' / ');
      const poderesLinhas = (npc.classes || [{ cl, niveis: nivel, poderesSelecionados: npc.poderesSelecionados || [] }]).flatMap(({ cl: c, poderesSelecionados: pods }) =>
        Object.entries(this._agruparPoderes(pods)).map(([pid, cnt]) => {
          const pod = c.poderes.find(p => p.id === pid);
          return (pod ? pod.nome : pid) + (cnt > 1 ? ` (NP ${cnt})` : '');
        })
      ).join(', ');
      linhas = [
        `${nome} [${tipo} | ${classeInfo}]`,
        `PV: ${pv} (Crise: ${crise}) | PM: ${pm} | PI: ${pi}`,
        `DEF: ${def ?? desVal} | DefM: ${defM ?? astVal} | Init: ${(init ?? 0) >= 0 ? '+' : ''}${init ?? 0}`,
        `Atribs: DES ${atribs.des} | VIG ${atribs.vig} | AST ${atribs.ast} | VON ${atribs.von}`,
        `Equip: ${armas?.map(a => a.nome).join(', ') || '—'}${armadura ? ' / ' + armadura.nome : ''}${escudo ? ' / ' + escudo.nome : ''}`,
        `Poderes: ${poderesLinhas}`,
        ...(npc.notas ? [`Notas: ${npc.notas}`] : [])
      ];
    }
    navigator.clipboard.writeText(linhas.join('\n')).then(() => this.mostrarToast('NPC copiado!', 'sucesso'));
  },

  _npcParaFoundry(npc) {
    const { nome, nivel, cl, atribs, pv, pm, pi, crise, def, defM, init, desVal, astVal, vigVal, vonVal, notas, armas, armadura, escudo } = npc;
    const classeEntries = npc.classes || [{ cl, niveis: nivel, poderesSelecionados: npc.poderesSelecionados || [] }];
    const classItems = classeEntries.flatMap(({ cl: c, niveis: nv, poderesSelecionados: pods }) => [
      { name: c.nome, type: 'class', system: { level: { value: nv } } },
      ...Object.entries(this._agruparPoderes(pods)).map(([pid, cnt]) => {
        const pod = c.poderes.find(p => p.id === pid);
        return { name: (pod?.nome || pid) + (cnt > 1 ? ` (NP ${cnt})` : ''), type: 'skill',
          system: { description: { value: pod?.descricao || '' }, level: { value: cnt } } };
      })
    ]);
    const items = [
      ...classItems,
      ...(armas || []).map(a => ({ name: a.nome, type: 'weapon',
        system: { accuracy: { value: a.precisao ?? 0 }, damage: { value: a.dano || '' }, hands: { value: a.maos || 1 } } })),
      ...(armadura ? [{ name: armadura.nome, type: 'armor',
        system: { def: { value: def ?? desVal }, mdef: { value: defM ?? astVal }, init: { value: init ?? 0 } } }] : []),
      ...(escudo ? [{ name: escudo.nome, type: 'shield',
        system: { def: { value: parseInt(escudo.defesa) || 0 }, mdef: { value: parseInt(escudo.defMagica) || 0 } } }] : [])
    ];
    return {
      name: nome, type: 'npc', img: 'icons/svg/mystery-man.svg',
      system: {
        level: { value: nivel },
        resources: { hp: { value: pv, max: pv, crisis: crise }, mp: { value: pm, max: pm }, ip: { value: pi, max: pi } },
        attributes: { dex: { base: desVal || 8 }, mig: { base: vigVal || 8 }, ins: { base: astVal || 8 }, wlp: { base: vonVal || 8 } },
        derived: { def: { value: def ?? desVal }, mdef: { value: defM ?? astVal }, init: { value: init ?? 0 } },
        notes: { value: notas || '' }
      },
      items
    };
  },

  async exportarNPCJSON(npcData) {
    const npc = npcData || this._npcGerado;
    if (!npc) { this.mostrarToast('Nenhum NPC gerado.', 'erro'); return; }
    if (!window.electronAPI) { this.mostrarToast('API não disponível.', 'erro'); return; }
    const res = await window.electronAPI.salvarJSON(this._npcParaFoundry(npc), npc.nome || 'npc', 'Exportar NPC — Foundry VTT');
    if (res.sucesso) this.mostrarToast('NPC exportado!', 'sucesso');
    else if (res.erro) this.mostrarToast('Erro: ' + res.erro, 'erro');
  },

  async exportarNPCPDF(npcData) {
    const npc = npcData || this._npcGerado;
    if (!npc) { this.mostrarToast('Nenhum NPC gerado.', 'erro'); return; }
    if (!window.electronAPI) { this.mostrarToast('API não disponível.', 'erro'); return; }
    const { nome, tipo, nivel, cl, atribs, pv, pm, pi, crise, def, defM, init, desVal, astVal, notas, armas, armadura, escudo } = npc;
    let classesPDF, armasPayload, armaduraPayload;
    if (npc.isMonstro) {
      classesPDF = [{ nome: cl.nome, niveis: nivel, beneficios: '', poderes: (npc.especial || []) }];
      armasPayload = (armas || []).map(a => ({ nome: a.nome, stats: '' }));
      armaduraPayload = null;
    } else {
      const classeEntries = npc.classes || [{ cl, niveis: nivel, poderesSelecionados: npc.poderesSelecionados || [] }];
      classesPDF = classeEntries.map(({ cl: c, niveis: nv, poderesSelecionados: pods }) => ({
        nome: c.nome, niveis: nv, beneficios: c.beneficiosIniciais.join(', '),
        poderes: Object.entries(this._agruparPoderes(pods)).map(([pid, cnt]) => {
          const pod = c.poderes.find(p => p.id === pid);
          return (pod?.nome || pid) + (cnt > 1 ? ` (NP ${cnt})` : '');
        })
      }));
      armasPayload = (armas || []).map(a => ({ nome: a.nome, stats: `Acc${a.precisao >= 0 ? '+' : ''}${a.precisao ?? 0}, ${a.dano}` }));
      armaduraPayload = armadura ? { nome: armadura.nome, stats: `DEF ${def ?? desVal} | DefM ${defM ?? astVal} | Init ${(init ?? 0) >= 0 ? '+' : ''}${init ?? 0}` } : null;
    }
    const classeLabel = (npc.classes || [{ cl, niveis: nivel }]).map(({ cl: c, niveis: nv }) => `${c.nome} Nv${nv}`).join(' / ');
    const payload = {
      personagem: { nome, pronomes: tipo, identidade: classeLabel, tema: '', origem: `Nível ${nivel}`,
        atributos: atribs, aparencia: notas || '', descricao: '', lacos: [], nivel, pontosFabula: 0, origemDesc: '', temaDescricao: '' },
      stats: { pvMax: pv, pmMax: pm, piMax: pi, crise, defesa: def ?? desVal, defMagica: defM ?? astVal, iniciativa: init ?? 0 },
      temaNome: cl.nome,
      marcial: { armas_corpo_a_corpo: false, armas_distancia: false, armaduras: !!armadura, escudos: !!escudo },
      armas: armasPayload,
      armadura: armaduraPayload,
      escudo: escudo ? { nome: escudo.nome, stats: `+${parseInt(escudo.defesa)||0} DEF +${parseInt(escudo.defMagica)||0} DefM` } : null,
      gastoEquip: 0,
      classes: classesPDF
    };
    const res = await window.electronAPI.exportarPDF(payload);
    if (res.sucesso) this.mostrarToast('PDF exportado!', 'sucesso');
    else if (res.erro) this.mostrarToast('Erro: ' + res.erro, 'erro');
  },

  // =============================================
  // ENCONTRO ALEATÓRIO
  // =============================================
  renderEncontro() {
    const div = document.getElementById('npc-conteudo');
    if (!div) return;
    const e = Estado.encontro;
    const difs = ['Facil','Medio','Dificil','Epico'];
    const difLabel = { Facil:'Fácil', Medio:'Médio', Dificil:'Difícil', Epico:'Épico' };
    const difChefe = { Facil:'Fácil (nv-2)', Medio:'Médio (nv)', Dificil:'Difícil (nv+2)', Epico:'Épico (nv+5)' };
    const npcsHTML = e.npcs.length === 0
      ? `<div class="npc-vazio" style="grid-column:1/-1"><p>Configure e clique em "Gerar Encontro".</p><p style="font-size:2rem;opacity:0.3"></p></div>`
      : e.npcs.map((npc, idx) => this._renderEncontroNPCCard(npc, idx)).join('');

    const especies = [...new Set((GAMEDATA.monstros || []).map(m => m.especie))].sort();
    const especieIcone = { Construto:'', Demônio:'', Elemental:'', Fera:'', Humanoide:'', Monstro:'', 'Morto-Vivo':'', Planta:'' };
    const especieFiltroHTML = e.fonteMonstros === 'bestiario' ? `
      <div class="campo-grupo">
        <label class="campo-label">Espécie</label>
        <div class="encontro-especie-filtro">
          ${especies.map(esp => `
            <label class="especie-check" title="${esp}">
              <input type="checkbox" value="${esp}" ${e.especieFiltro.includes(esp) ? 'checked' : ''}
                onchange="App._toggleEspecieFiltro('${esp}')">
              ${especieIcone[esp] || ''} ${esp}
            </label>
          `).join('')}
        </div>
        ${e.especieFiltro.length ? `<button class="btn-mini" style="margin-top:0.3rem" onclick="Estado.encontro.especieFiltro=[];App.renderEncontro()">Limpar filtro</button>` : ''}
      </div>` : '';

    div.innerHTML = `
      <div class="encontro-layout">
        <div class="encontro-config card">
          <h4 style="color:var(--cor-dourado);margin-bottom:1rem;">Configurações</h4>
          <div class="campo-grupo">
            <label class="campo-label">Fonte</label>
            <div class="npc-tipo-btns">
              <button class="gen-btn ${e.fonteMonstros==='npcs'?'ativo':''}" onclick="Estado.encontro.fonteMonstros='npcs';App.renderEncontro()">NPCs</button>
              <button class="gen-btn ${e.fonteMonstros==='bestiario'?'ativo':''}" onclick="Estado.encontro.fonteMonstros='bestiario';App.renderEncontro()">Bestiário</button>
            </div>
          </div>
          ${especieFiltroHTML}
          <div class="campo-grupo">
            <label class="campo-label">Jogadores</label>
            <div class="npc-nivel-ctrl">
              <button class="btn-mini" onclick="Estado.encontro.jogadores=Math.max(1,Estado.encontro.jogadores-1);App.renderEncontro()">−</button>
              <span class="npc-nivel-val">${e.jogadores}</span>
              <button class="btn-mini" onclick="Estado.encontro.jogadores=Math.min(8,Estado.encontro.jogadores+1);App.renderEncontro()">+</button>
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Nível dos Jogadores</label>
            <div class="npc-nivel-ctrl">
              <button class="btn-mini" onclick="Estado.encontro.nivel=Math.max(1,Estado.encontro.nivel-1);App.renderEncontro()">−</button>
              <span class="npc-nivel-val">${e.nivel}</span>
              <button class="btn-mini" onclick="Estado.encontro.nivel=Math.min(50,Estado.encontro.nivel+1);App.renderEncontro()">+</button>
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Dificuldade</label>
            <div class="npc-tipo-btns">
              ${difs.map(d => `<button class="gen-btn ${e.dificuldade===d?'ativo':''}" onclick="Estado.encontro.dificuldade='${d}';App.renderEncontro()">${difLabel[d]}</button>`).join('')}
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label" style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
              <input type="checkbox" ${e.temChefe?'checked':''} onchange="Estado.encontro.temChefe=this.checked;App.renderEncontro()" />
              Incluir Chefe
            </label>
          </div>
          ${e.temChefe ? `
          <div class="campo-grupo">
            <label class="campo-label">Poder do Chefe</label>
            <div class="npc-tipo-btns" style="flex-wrap:wrap;">
              ${difs.map(d => `<button class="gen-btn ${e.dificuldadeChefe===d?'ativo':''}" style="font-size:0.74rem;" onclick="Estado.encontro.dificuldadeChefe='${d}';App.renderEncontro()">${difChefe[d]}</button>`).join('')}
            </div>
          </div>` : ''}
          <button class="btn-primario" style="width:100%;margin-top:0.5rem;" onclick="App.gerarEncontro()">Gerar Encontro</button>
          ${e.npcs.length > 0 ? `
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
            <button class="btn-secundario" style="flex:1;font-size:0.8rem;" onclick="App.exportarEncontroJSON()">JSON Foundry</button>
            <button class="btn-secundario" style="flex:1;font-size:0.8rem;" onclick="App.exportarEncontroPDF()">PDFs</button>
          </div>` : ''}
        </div>
        <div class="encontro-npcs-grid">${npcsHTML}</div>
      </div>
    `;
  },

  _toggleEspecieFiltro(esp) {
    const arr = Estado.encontro.especieFiltro;
    const idx = arr.indexOf(esp);
    if (idx === -1) arr.push(esp); else arr.splice(idx, 1);
  },

  _monstroParaNPC(m, tipo) {
    const v = (d) => parseInt(d.slice(1)) || 8;
    const desVal = v(m.des), vigVal = v(m.vig), astVal = v(m.ast), vonVal = v(m.von);
    const def = m.defFixo ? m.def : (desVal + (m.def || 0));
    const defM = astVal + (m.defM || 0);
    const cl = { id: m.id, nome: m.especie || 'Monstro', poderes: [], marcialEquip: [], beneficiosIniciais: [] };
    const armas = (m.ataques || []).map((a, i) => ({ id: `atk${i}`, nome: a, precisao: null, dano: null, maos: 1, alcance: 'corpo', marcial: false }));
    const especial = (m.especial || []).join('\n');
    const notas = [m.tracos ? `Traços: ${m.tracos}` : '', especial].filter(Boolean).join('\n');
    return {
      nome: m.nome, tipo: tipo || 'Inimigo', nivel: m.nivel, cl,
      atribs: { des: m.des, vig: m.vig, ast: m.ast, von: m.von },
      poderesSelecionados: [],
      pv: m.pv, pm: m.pm, pi: 6, crise: Math.ceil(m.pv / 2),
      desVal, vigVal, astVal, vonVal,
      def, defM, init: m.init || 0,
      armas, armadura: null, escudo: null, notas,
      isMonstro: true, tracos: m.tracos || '', especial: m.especial || [], fonte: m.fonte || '', monstroId: m.id
    };
  },

  gerarEncontro() {
    const e = Estado.encontro;
    const qtdMap = { Facil: Math.ceil(e.jogadores * 0.75), Medio: e.jogadores, Dificil: Math.ceil(e.jogadores * 1.25), Epico: Math.ceil(e.jogadores * 1.5) };
    const chefeDelta = { Facil: -2, Medio: 0, Dificil: 2, Epico: 5 };
    const qtd = qtdMap[e.dificuldade] || e.jogadores;
    const npcs = [];

    if (e.fonteMonstros === 'bestiario') {
      const margem = 5;
      const pool = (GAMEDATA.monstros || []).filter(m => {
        const dentroNivel = Math.abs(m.nivel - e.nivel) <= margem;
        const dentroFiltro = !e.especieFiltro.length || e.especieFiltro.includes(m.especie);
        return dentroNivel && dentroFiltro;
      });
      if (!pool.length) { this.mostrarToast('Nenhum monstro encontrado para esse nível/espécie.', 'erro'); return; }
      for (let i = 0; i < qtd; i++) {
        npcs.push(this._monstroParaNPC(this._rndArr(pool), 'Inimigo'));
      }
      if (e.temChefe) {
        const chefNivel = Math.max(1, e.nivel + (chefeDelta[e.dificuldadeChefe] || 0));
        const poolChefe = (GAMEDATA.monstros || []).filter(m => {
          const dentroNivel = Math.abs(m.nivel - chefNivel) <= margem;
          const dentroFiltro = !e.especieFiltro.length || e.especieFiltro.includes(m.especie);
          return dentroNivel && dentroFiltro;
        });
        const chefPool = poolChefe.length ? poolChefe : pool;
        npcs.push(this._monstroParaNPC(this._rndArr(chefPool), 'Chefe'));
      }
    } else {
      for (let i = 0; i < qtd; i++) {
        const npc = this.gerarNPC(e.nivel, 'Inimigo', '');
        if (npc) npcs.push(npc);
      }
      if (e.temChefe) {
        const chefNivel = Math.max(1, e.nivel + (chefeDelta[e.dificuldadeChefe] || 0));
        const chefe = this.gerarNPC(chefNivel, 'Chefe', '');
        if (chefe) npcs.push(chefe);
      }
    }

    Estado.encontro.npcs = npcs;
    this._npcGerado = null;
    this.renderEncontro();
  },

  _renderEncontroNPCCard(npc, idx) {
    const { nome, tipo, nivel, cl, pv, pm, pi, crise, def, defM, desVal, astVal, armas } = npc;
    const defVal = def ?? desVal;
    const defMVal = defM ?? astVal;
    const especieIcone = { Construto:'', Demônio:'', Elemental:'', Fera:'', Humanoide:'', Monstro:'', 'Morto-Vivo':'', Planta:'' };
    const icone = npc.isMonstro ? (especieIcone[cl.nome] || '') : (ICONES_CLASSES[cl.id] || '');
    const classeLabel = npc.isMonstro
      ? `${cl.nome} · Nv${nivel}`
      : (npc.classes || [{ cl, niveis: nivel }]).map(({ cl: c, niveis: nv }) => `${c.nome} Nv${nv}`).join(' / ');
    const subtitulo = `${classeLabel} · <span style="color:${this._tipoCor(tipo)}">${tipo}</span>`;
    const armaStr = armas && armas.length ? armas[0].nome : '—';
    return `
      <div class="encontro-npc-card card">
        <div class="encontro-npc-header">
          <span class="encontro-npc-icone">${icone}</span>
          <div style="flex:1;min-width:0;">
            <input class="campo-input" style="font-weight:700;font-size:0.85rem;padding:0.2rem 0.4rem;width:100%;"
              value="${nome}" oninput="App._encontroNPCEdit(${idx},'nome',this.value)" />
            <div style="font-size:0.72rem;color:var(--cor-texto-muted);margin-top:0.1rem">
              ${subtitulo}
            </div>
          </div>
        </div>
        <div class="npc-stats-row" style="gap:0.25rem;margin:0.4rem 0;">
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-sucesso);font-size:0.85rem">${pv}</span><span style="font-size:0.62rem">PV</span></div>
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-aviso);font-size:0.85rem">${crise}</span><span style="font-size:0.62rem">Crise</span></div>
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-info);font-size:0.85rem">${pm}</span><span style="font-size:0.62rem">PM</span></div>
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-dourado);font-size:0.85rem">${pi}</span><span style="font-size:0.62rem">PI</span></div>
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-primaria-clara);font-size:0.85rem">${defVal}</span><span style="font-size:0.62rem">DEF</span></div>
          <div class="npc-stat"><span class="npc-sv" style="color:var(--cor-primaria-clara);font-size:0.85rem">${defMVal}</span><span style="font-size:0.62rem">DefM</span></div>
        </div>
        <div style="font-size:0.75rem;color:var(--cor-texto-muted);margin-bottom:0.4rem">${armaStr}</div>
        <div class="encontro-npc-actions">
          <button class="btn-mini" title="Ver ficha completa" onclick="App.verNPCEncontro(${idx})">Ver</button>
          <button class="btn-mini" title="Regenerar" onclick="App.regenerarNPCEncontro(${idx})">Regenerar</button>
          <button class="btn-mini" title="JSON" onclick="App.exportarNPCJSON(Estado.encontro.npcs[${idx}])">JSON</button>
          <button class="btn-mini" title="PDF" onclick="App.exportarNPCPDF(Estado.encontro.npcs[${idx}])">PDF</button>
          <button class="btn-mini btn-perigo" title="Remover" onclick="App.removerNPCEncontro(${idx})">Remover</button>
        </div>
      </div>
    `;
  },

  _encontroNPCEdit(idx, campo, valor) {
    if (Estado.encontro.npcs[idx]) Estado.encontro.npcs[idx][campo] = valor;
  },

  verNPCEncontro(idx) {
    const npc = Estado.encontro.npcs[idx];
    if (!npc) return;
    this._npcGerado = npc;
    this.switchNPCTab('gerador');
  },

  regenerarNPCEncontro(idx) {
    const antigo = Estado.encontro.npcs[idx];
    if (!antigo) return;
    if (antigo.isMonstro) {
      const margem = 5;
      const pool = (GAMEDATA.monstros || []).filter(m => Math.abs(m.nivel - antigo.nivel) <= margem);
      if (!pool.length) return;
      Estado.encontro.npcs[idx] = this._monstroParaNPC(this._rndArr(pool), antigo.tipo);
    } else {
      const novo = this.gerarNPC(antigo.nivel, antigo.tipo, '');
      if (novo) Estado.encontro.npcs[idx] = novo;
    }
    this.renderEncontro();
  },

  removerNPCEncontro(idx) {
    Estado.encontro.npcs.splice(idx, 1);
    this.renderEncontro();
  },

  async exportarEncontroJSON() {
    const npcs = Estado.encontro.npcs;
    if (!npcs.length) { this.mostrarToast('Nenhum encontro gerado.', 'erro'); return; }
    if (!window.electronAPI) { this.mostrarToast('API não disponível.', 'erro'); return; }
    const res = await window.electronAPI.salvarJSON(npcs.map(n => this._npcParaFoundry(n)), 'encontro', 'Exportar Encontro — Foundry VTT');
    if (res.sucesso) this.mostrarToast('Encontro exportado!', 'sucesso');
    else if (res.erro) this.mostrarToast('Erro: ' + res.erro, 'erro');
  },

  async exportarEncontroPDF() {
    const npcs = Estado.encontro.npcs;
    if (!npcs.length) { this.mostrarToast('Nenhum encontro gerado.', 'erro'); return; }
    for (const npc of npcs) await this.exportarNPCPDF(npc);
    this.mostrarToast(`${npcs.length} PDFs exportados!`, 'sucesso');
  },

  novoCriacao() {
    this.mostrarModal(
      'Novo Personagem',
      'Criar um novo personagem descartará o atual. Deseja continuar?',
      () => this.iniciarCriacao()
    );
  },

  // ------ HOME SCREEN DINÂMICA ------

  renderizarHomeScreen() {
    const div = document.getElementById('home-dinamico');
    if (!div) return;

    const temRasc = this.temRascunho();
    const recentes = this.obterRecentes();

    const item = (acao, rotulo, desc, extra = '') =>
      `<button class="home-item ${extra}" onclick="${acao}"><span class="home-item-rot">${rotulo}</span><span class="home-item-desc">${desc}</span></button>`;
    let html = `
      <nav class="home-menu" aria-label="Menu principal">
        ${item('App.iniciarCriacao()', 'Criar personagem', 'Monte seu herói etapa por etapa', 'principal')}
        ${item('App.mostrarGeradorPJ()', 'Gerar personagem', 'A partir de um arquétipo ou de um herói famoso')}
        ${item('App.carregarPersonagem()', 'Carregar personagem', 'Abrir um arquivo salvo')}
        ${item('App.mostrarExemplos()', 'Personagens de exemplo', 'Comece de um modelo pronto do livro')}
        ${item('App.mostrarNPC()', 'Gerador de NPC', 'Inimigos, aliados e encontros para o mestre')}
      </nav>
    `;
    if (this.renderizarVitrine) this.renderizarVitrine();

    if (temRasc) {
      const rascInfo = this._obterInfoRascunho();
      html += `
        <div class="rascunho-banner">
          <span class="rascunho-texto">Rascunho encontrado${rascInfo ? ` — ${rascInfo}` : ''}</span>
          <div class="rascunho-acoes">
            <button class="btn-rascunho" onclick="App.carregarRascunho()">Continuar</button>
            <button class="btn-rascunho-descartar" onclick="App.confirmarDescartarRascunho()">Descartar</button>
          </div>
        </div>
      `;
    }

    if (recentes.length > 0) {
      html += `
        <div class="recentes-section">
          <div class="recentes-titulo">Abertos Recentemente</div>
          ${recentes.map(r => `
            <div class="recente-item" onclick="App.carregarRecente('${r.caminho.replace(/'/g, "\\'")}')">
              <span class="recente-icone"></span>
              <div class="recente-info">
                <div class="recente-nome">${r.nome}</div>
                <div class="recente-data">${r.data}</div>
              </div>
              <div class="recente-caminho">${this._nomeCaminho(r.caminho)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    div.innerHTML = html;
  },

  _nomeCaminho(caminho) {
    return caminho.split(/[/\\]/).pop() || caminho;
  },

  _obterInfoRascunho() {
    try {
      const dados = JSON.parse(localStorage.getItem('fu-rascunho') || 'null');
      if (!dados) return null;
      const identidade = dados.identidade || dados.nome || '';
      return identidade ? `"${identidade}"` : null;
    } catch (_) { return null; }
  },

  // ------ AUTO-SAVE E RASCUNHO ------

  _normalizarPersonagem(dados) {
    const def = {
      identidade: '', tema: '', temaCustom: '', temaDescricao: '',
      origem: '', origemDesc: '',
      classes: {}, atributos: { des: 'd8', vig: 'd8', ast: 'd8', von: 'd8' },
      perfilAtrib: '',
      equipamento: { armas: [], armadura: '', escudo: '', itensLivres: '' },
      lacos: [{ alvo: '', emocoes: [] }, { alvo: '', emocoes: [] }, { alvo: '', emocoes: [] }],
      nome: '', pronomes: '', descricao: '', aparencia: '',
      companheiro: { nome: '', especie: 'fera', descricao: '' },
      imagem: '', nivel: 5, pontosFabula: 3
    };
    return {
      ...def, ...dados,
      atributos:   { ...def.atributos,   ...(dados.atributos   || {}) },
      equipamento: { ...def.equipamento, ...(dados.equipamento || {}) },
      companheiro: { ...def.companheiro, ...(dados.companheiro || {}) },
      lacos: Array.isArray(dados.lacos) && dados.lacos.length > 0 ? dados.lacos : def.lacos
    };
  },

  autoSalvar() {
    try {
      localStorage.setItem('fu-rascunho', JSON.stringify(Estado.personagem));
    } catch (_) {
      // Quota excedida (imagem grande) — salva sem imagem
      try {
        localStorage.setItem('fu-rascunho', JSON.stringify({ ...Estado.personagem, imagem: '' }));
      } catch (_2) {}
    }
  },

  temRascunho() {
    try { return !!localStorage.getItem('fu-rascunho'); } catch (_) { return false; }
  },

  carregarRascunho() {
    try {
      const dados = JSON.parse(localStorage.getItem('fu-rascunho'));
      if (!dados) return;
      Estado.personagem = this._normalizarPersonagem(dados);
      Estado.passoAtual = this._encontrarPassoRascunho();
      this._filtroPoderes = '';
      this.mostrarTela('wizard');
      this.renderizarPasso();
      this.mostrarToast('Rascunho recuperado!', 'sucesso');
    } catch (_) {
      this.mostrarToast('Não foi possível carregar o rascunho.', 'erro');
    }
  },

  descartarRascunho() {
    try { localStorage.removeItem('fu-rascunho'); } catch (_) {}
  },

  confirmarDescartarRascunho() {
    this.mostrarModal(
      'Descartar Rascunho',
      'Tem certeza que deseja descartar o rascunho?',
      () => {
        this.descartarRascunho();
        this.renderizarHomeScreen();
        this.mostrarToast('Rascunho descartado.', '');
      }
    );
  },

  _encontrarPassoRascunho() {
    for (let i = PASSOS.length - 1; i >= 0; i--) {
      if (this.passoCompleto(i)) return Math.min(i + 1, PASSOS.length - 1);
    }
    return 0;
  },

  // ------ HISTÓRICO DE RECENTES ------

  adicionarRecente(filePath, nome) {
    try {
      let recentes = JSON.parse(localStorage.getItem('fu-recentes') || '[]');
      recentes = recentes.filter(r => r.caminho !== filePath);
      recentes.unshift({
        caminho: filePath,
        nome: nome || 'Personagem',
        data: new Date().toLocaleDateString('pt-BR')
      });
      recentes = recentes.slice(0, 5);
      localStorage.setItem('fu-recentes', JSON.stringify(recentes));
    } catch (_) {}
  },

  obterRecentes() {
    try { return JSON.parse(localStorage.getItem('fu-recentes') || '[]'); } catch (_) { return []; }
  },

  async carregarRecente(caminho) {
    if (!window.electronAPI) {
      this.mostrarToast('Função disponível apenas no app desktop.', 'erro');
      return;
    }
    const resultado = await window.electronAPI.carregarPersonagemDireto(caminho);
    if (resultado.sucesso) {
      Estado.personagem = this._normalizarPersonagem(resultado.dados);
      Estado.passoAtual = 0;
      this._filtroPoderes = '';
      this.mostrarTela('wizard');
      this.renderizarPasso();
      this.mostrarToast('Personagem carregado!', 'sucesso');
    } else {
      this.mostrarToast('Não foi possível abrir o arquivo.', 'erro');
      // Remove da lista se não existe mais
      try {
        let recentes = JSON.parse(localStorage.getItem('fu-recentes') || '[]');
        recentes = recentes.filter(r => r.caminho !== caminho);
        localStorage.setItem('fu-recentes', JSON.stringify(recentes));
        this.renderizarHomeScreen();
      } catch (_) {}
    }
  },

  // ------ PERSONAGENS DE EXEMPLO ------

  mostrarExemplos() {
    const lista = document.getElementById('exemplos-lista');
    if (!lista) return;

    lista.innerHTML = `
      <div class="exemplos-grid">
        ${GAMEDATA.personagensClassicos.map((pc, idx) => {
          const classesNomes = pc.classes.map(c => {
            const cl = GAMEDATA.classes.find(x => x.id === c.classe);
            return `${cl?.nome || c.classe} Nv${c.niveis}`;
          }).join(' + ');
          return `
            <div class="pc-card" onclick="App.carregarPersonagemClassico(${idx})">
              <div class="pc-card-nome">${pc.nome}</div>
              <div class="pc-card-atribs">
                <span class="pc-card-dado" data-tooltip="Destreza">DES ${pc.des}</span>
                <span class="pc-card-dado" data-tooltip="Vigor">VIG ${pc.vig}</span>
                <span class="pc-card-dado" data-tooltip="Astúcia">AST ${pc.ast}</span>
                <span class="pc-card-dado" data-tooltip="Vontade">VON ${pc.von}</span>
              </div>
              <div class="pc-card-classes">${classesNomes}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.getElementById('modal-exemplos-overlay').classList.add('ativo');
  },

  fecharExemplos() {
    document.getElementById('modal-exemplos-overlay').classList.remove('ativo');
  },

  carregarPersonagemClassico(idx) {
    const pc = GAMEDATA.personagensClassicos[idx];
    if (!pc) return;

    // Determinar perfil de atributos
    const dados = [pc.des, pc.vig, pc.ast, pc.von].slice().sort().join(',');
    let perfil = 'equilibrado';
    if (dados === 'd6,d6,d10,d10') perfil = 'especializado';
    else if (dados === 'd6,d8,d8,d10' || dados === 'd6,d8,d10,d8') perfil = 'mediano';

    // Montar classes
    const classes = {};
    pc.classes.forEach(c => {
      classes[c.classe] = { niveis: c.niveis, poderes: [...c.poderes] };
    });

    // Separar equipamentos por tipo
    const armas = [];
    let armadura = 'sem_armadura';
    let escudo = '';
    (pc.equipamento || []).forEach(itemId => {
      if (GAMEDATA.armas.find(a => a.id === itemId)) armas.push(itemId);
      else if (GAMEDATA.armaduras.find(a => a.id === itemId)) armadura = itemId;
      else if (GAMEDATA.escudos.find(e => e.id === itemId)) escudo = itemId;
    });

    Estado.personagem = {
      identidade: '',
      tema: '',
      temaCustom: '',
      origem: '',
      classes,
      atributos: { des: pc.des, vig: pc.vig, ast: pc.ast, von: pc.von },
      perfilAtrib: perfil,
      equipamento: { armas, armadura, escudo },
      lacos: [
        { alvo: '', emocoes: [] },
        { alvo: '', emocoes: [] },
        { alvo: '', emocoes: [] }
      ],
      nome: '',
      pronomes: 'ele/dele',
      descricao: '',
      aparencia: '',
      imagem: '',
      nivel: 5,
      pontosFabula: 3,
      origemDesc: '',
      temaDescricao: ''
    };

    Estado.passoAtual = 0;
    this._filtroPoderes = '';
    this.fecharExemplos();
    this.mostrarTela('wizard');
    this.renderizarPasso();
    this.mostrarToast(`Template "${pc.nome}" carregado! Complete com identidade, nome e detalhes.`, 'sucesso');
  },

  // ------ STATS AO VIVO ------

  atualizarStatsVivo() {
    if (this.renderizarPalco) this.renderizarPalco();
    const painel = document.getElementById('stats-vivo');
    if (!painel) return;
    const stats = this.calcularStats();
    const atualizar = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    atualizar('sv-pv', stats.pvMax);
    atualizar('sv-pm', stats.pmMax);
    atualizar('sv-pi', stats.piMax);
    atualizar('sv-def', stats.defesa);
    atualizar('sv-defm', stats.defMagica);
    atualizar('sv-ini', (stats.iniciativa >= 0 ? '+' : '') + stats.iniciativa);
    painel.style.display = 'flex';
  },

  // ------ FICHA RÁPIDA (preview no wizard) ------

  mostrarFichaRapida() {
    const div = document.getElementById('ficha-rapida-conteudo');
    if (!div) return;
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const tema = p.tema === '_custom' ? p.temaCustom : (GAMEDATA.temas.find(t => t.id === p.tema)?.nome || '—');

    const classesHTML = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => {
        const cl = GAMEDATA.classes.find(c => c.id === id);
        const poderesNomes = d.poderes.map(pid => cl?.poderes.find(po => po.id === pid)?.nome || pid).join(', ');
        return `<div class="fr-classe-linha">
          <span class="fr-classe-nome">${cl?.nome || id} (${d.niveis})</span>
          <span class="fr-classe-poderes">${poderesNomes || '—'}</span>
        </div>`;
      }).join('') || '<p style="color:var(--cor-texto-dim);font-size:0.82rem;">Nenhuma classe definida</p>';

    div.innerHTML = `
      <div class="fr-secao">
        <div class="fr-secao-titulo">Identidade &amp; Contexto</div>
        <div style="font-size:0.83rem;color:var(--cor-texto-muted);">
          ${p.identidade ? `<div><strong>Identidade:</strong> ${p.identidade}</div>` : ''}
          ${tema !== '—' ? `<div><strong>Tema:</strong> ${tema}</div>` : ''}
          ${p.origem ? `<div><strong>Origem:</strong> ${p.origem}</div>` : ''}
        </div>
      </div>
      <div class="fr-secao">
        <div class="fr-secao-titulo">Atributos</div>
        <div class="fr-atribs">
          ${GAMEDATA.atributos.map(at => `
            <div class="fr-atrib">
              <div class="fr-atrib-dado">${p.atributos[at.id] || 'd8'}</div>
              <div class="fr-atrib-nome">${at.abrev}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="fr-secao">
        <div class="fr-secao-titulo">Estatísticas</div>
        <div class="ficha-rapida-stats">
          <div class="fr-stat"><div class="fr-stat-val" style="color:var(--cor-sucesso)">${stats.pvMax}</div><div class="fr-stat-nome">PV</div></div>
          <div class="fr-stat"><div class="fr-stat-val" style="color:var(--cor-aviso)">${stats.crise}</div><div class="fr-stat-nome">Crise</div></div>
          <div class="fr-stat"><div class="fr-stat-val" style="color:var(--cor-info)">${stats.pmMax}</div><div class="fr-stat-nome">PM</div></div>
          <div class="fr-stat"><div class="fr-stat-val">${stats.piMax}</div><div class="fr-stat-nome">PI</div></div>
          <div class="fr-stat"><div class="fr-stat-val" style="color:var(--cor-primaria-clara)">${stats.defesa}</div><div class="fr-stat-nome">DEF</div></div>
          <div class="fr-stat"><div class="fr-stat-val" style="color:var(--cor-primaria-clara)">${stats.defMagica}</div><div class="fr-stat-nome">DefM</div></div>
        </div>
      </div>
      <div class="fr-secao">
        <div class="fr-secao-titulo">Classes &amp; Poderes</div>
        <div class="fr-classes-lista">${classesHTML}</div>
      </div>
    `;
    document.getElementById('modal-ficha-rapida-overlay').classList.add('ativo');
  },

  fecharFichaRapida() {
    document.getElementById('modal-ficha-rapida-overlay').classList.remove('ativo');
  },

  // ------ COPIAR STATS ------

  copiarStats() {
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const classesList = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => `${GAMEDATA.classes.find(c => c.id === id)?.nome || id} Nv${d.niveis}`)
      .join(' + ');
    const texto = [
      `${p.nome || 'Personagem sem nome'} — Nível ${p.nivel}`,
      p.identidade ? `Identidade: ${p.identidade}` : '',
      classesList ? `Classes: ${classesList}` : '',
      `DES ${p.atributos.des} | VIG ${p.atributos.vig} | AST ${p.atributos.ast} | VON ${p.atributos.von}`,
      `PV: ${stats.pvMax} (Crise ≤ ${stats.crise}) | PM: ${stats.pmMax} | PI: ${stats.piMax}`,
      `DEF: ${stats.defesa} | DefM: ${stats.defMagica} | Init: ${stats.iniciativa >= 0 ? '+' : ''}${stats.iniciativa}`,
      `${p.pontosFabula} Pontos de Fábula`,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(texto)
      .then(() => this.mostrarToast('Stats copiadas para a área de transferência!', 'sucesso'))
      .catch(() => this.mostrarToast('Não foi possível copiar.', 'erro'));
  },

  // ------ COMPARAÇÃO DE EQUIPAMENTOS ------

  mostrarComparacao(itemId, tipo, evt) {
    const popup = document.getElementById('comparacao-popup');
    if (!popup) return;
    const p = Estado.personagem;

    let linhas = [];
    let titulo = 'Comparar com equipado';

    if (tipo === 'armadura') {
      const novo = GAMEDATA.armaduras.find(a => a.id === itemId);
      const atual = p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura'
        ? GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura) : null;
      if (!novo || !atual || atual.id === novo.id) return;
      titulo = `vs. ${atual.nome}`;

      const stats = this.calcularStats();
      const des = parseInt(p.atributos.des.slice(1)) || 8;
      const ast = parseInt(p.atributos.ast.slice(1)) || 8;
      const parseF = (f) => {
        const n = parseInt(f); if (!isNaN(n)) return n;
        if (f === 'DES') return des; if (f === 'AST') return ast;
        if (/^DES[+-]\d+$/.test(f)) return des + parseInt(f.slice(3));
        if (/^AST[+-]\d+$/.test(f)) return ast + parseInt(f.slice(3));
        return des;
      };
      const novoDefesa = parseF(novo.defesa);
      const novoDefM = parseF(novo.defMagica);
      const atualDefesa = parseF(atual.defesa);
      const atualDefM = parseF(atual.defMagica);

      linhas = [
        { nome: 'Defesa', atual: atualDefesa, novo: novoDefesa },
        { nome: 'Def. Mágica', atual: atualDefM, novo: novoDefM },
        { nome: 'Iniciativa', atual: atual.iniciativa || 0, novo: novo.iniciativa || 0 },
        { nome: 'Custo', atual: atual.custo + 'z', novo: novo.custo + 'z', neutro: true },
      ];
    } else if (tipo === 'escudo') {
      const novo = GAMEDATA.escudos.find(e => e.id === itemId);
      const atual = p.equipamento.escudo ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo) : null;
      if (!novo || !atual || atual.id === novo.id) return;
      titulo = `vs. ${atual.nome}`;
      linhas = [
        { nome: 'Defesa', atual: atual.defesa, novo: novo.defesa },
        { nome: 'Def. Mágica', atual: atual.defMagica, novo: novo.defMagica },
        { nome: 'Custo', atual: atual.custo + 'z', novo: novo.custo + 'z', neutro: true },
      ];
    } else if (tipo === 'arma') {
      const novo = GAMEDATA.armas.find(a => a.id === itemId);
      const primeiraArmaId = p.equipamento.armas[0];
      const atual = primeiraArmaId ? GAMEDATA.armas.find(a => a.id === primeiraArmaId) : null;
      if (!novo || !atual || atual.id === novo.id) return;
      titulo = `vs. ${atual.nome}`;
      linhas = [
        { nome: 'Precisão', atual: atual.precisao, novo: novo.precisao, neutro: true },
        { nome: 'Dano', atual: atual.dano, novo: novo.dano, neutro: true },
        { nome: 'Mãos', atual: atual.maos + 'm', novo: novo.maos + 'm', neutro: true },
        { nome: 'Custo', atual: atual.custo + 'z', novo: novo.custo + 'z', neutro: true },
      ];
    }

    if (linhas.length === 0) return;

    popup.innerHTML = `
      <div class="comp-titulo">${titulo}</div>
      ${linhas.map(l => {
        let classe = 'igual';
        if (!l.neutro && typeof l.atual === 'number' && typeof l.novo === 'number') {
          if (l.novo > l.atual) classe = 'melhor';
          else if (l.novo < l.atual) classe = 'pior';
        }
        return `<div class="comp-linha">
          <span class="comp-stat-nome">${l.nome}</span>
          <span class="comp-atual">${l.atual}</span>
          <span class="comp-novo ${classe}">${l.novo}</span>
        </div>`;
      }).join('')}
      <div class="comp-separador"></div>
      <div style="font-size:0.68rem;color:var(--cor-texto-dim);text-align:center;">atual → novo</div>
    `;

    const x = Math.min(evt.clientX + 12, window.innerWidth - 320);
    const y = Math.min(evt.clientY - 20, window.innerHeight - 200);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.display = 'block';
  },

  ocultarComparacao() {
    const popup = document.getElementById('comparacao-popup');
    if (popup) popup.style.display = 'none';
  },

  // ------ NAVEGAÇÃO DOS PASSOS ------

  proximoPasso() {
    if (!this.validarPassoAtual()) return;
    this.autoSalvar();
    if (Estado.passoAtual < PASSOS.length - 1) {
      Estado.passoAtual++;
      this.renderizarPasso();
    } else {
      this.finalizarPersonagem();
    }
  },

  passoAnterior() {
    if (Estado.passoAtual > 0) {
      this.autoSalvar();
      Estado.passoAtual--;
      this.renderizarPasso();
    }
  },

  irParaPasso(idx) {
    if (idx <= Estado.passoAtual || this.passoCompleto(idx - 1)) {
      Estado.passoAtual = idx;
      this.renderizarPasso();
    }
  },

  passoCompleto(idx) {
    if (idx < 0) return true;
    const p = Estado.personagem;
    switch (idx) {
      case 0: return !!p.identidade.trim();
      case 1: return !!p.origem.trim();
      case 2: return !!p.tema;
      case 3: return this.niveisUsados() === p.nivel && Object.keys(p.classes).length >= 2;
      case 4: return !!p.perfilAtrib;
      case 5: return true;
      case 6: return p.equipamento.armas.length > 0 && !!p.equipamento.armadura;
      case 7: return !!p.nome.trim();
      default: return true;
    }
  },

  validarPassoAtual() {
    const idx = Estado.passoAtual;
    if (!this.passoCompleto(idx)) {
      const msgs = [
        'Preencha a Identidade do personagem.',
        'Preencha a Origem do personagem.',
        'Escolha um Tema para o personagem.',
        `Distribua exatamente ${Estado.personagem.nivel} níveis entre 2 a 3 classes e escolha poderes para cada uma.`,
        'Escolha um perfil de atributos e distribua os dados.',
        null,
        'Escolha pelo menos uma arma e uma armadura.',
        'Preencha o nome do personagem.'
      ];
      if (msgs[idx]) this.mostrarToast(msgs[idx], 'erro');
      return false;
    }
    return true;
  },

  // ------ RENDERIZAÇÃO GERAL ------

  renderizarPasso() {
    this.atualizarProgressoBar();
    this.atualizarNavegacao();
    const main = document.getElementById('wizard-main');
    main.innerHTML = '';
    main.scrollTop = 0;
    this._filtroPoderes = '';

    const renderFns = [
      this.renderPassoIdentidade,
      this.renderPassoOrigem,
      this.renderPassoTema,
      this.renderPassoClasses,
      this.renderPassoAtributos,
      this.renderPassoEstatisticas,
      this.renderPassoEquipamento,
      this.renderPassoFinalizacao
    ];

    renderFns[Estado.passoAtual].call(this, main);
    this.atualizarStatsVivo();
  },

  atualizarProgressoBar() {
    const lista = document.getElementById('passos-lista');
    const barra = document.getElementById('barra-preenchida');

    lista.innerHTML = PASSOS.map((p, i) => {
      const classes = ['passo-indicador'];
      if (i < Estado.passoAtual) classes.push('concluido');
      if (i === Estado.passoAtual) classes.push('ativo');
      return `<button type="button" class="${classes.join(' ')}" onclick="App.irParaPasso(${i})"${i === Estado.passoAtual ? ' aria-current="step"' : ''}>${p.titulo}</button>`;
    }).join('');

    const pct = (Estado.passoAtual / (PASSOS.length - 1)) * 100;
    barra.style.width = pct + '%';
  },

  atualizarNavegacao() {
    const btnAnt = document.getElementById('btn-anterior');
    const btnPrx = document.getElementById('btn-proximo');
    const info = document.getElementById('passo-info');

    btnAnt.disabled = Estado.passoAtual === 0;
    const ultimo = Estado.passoAtual === PASSOS.length - 1;
    btnPrx.textContent = ultimo ? 'Concluir personagem' : 'Próximo';
    info.textContent = ultimo ? 'Última etapa' : `A seguir: ${PASSOS[Estado.passoAtual + 1].titulo}`;
  },

  // =============================================
  // PASSO 1 — IDENTIDADE
  // =============================================
  renderPassoIdentidade(container) {
    const p = Estado.personagem;
    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Identidade</h2>
        <p>Configure o nível inicial e a identidade do personagem.</p>
      </div>

      <div class="nivel-inicio-card card">
        <div class="nivel-inicio-pergunta">
          <span class="nivel-inicio-icone"></span>
          <div>
            <div class="nivel-inicio-titulo">Em que nível a aventura começa?</div>
            <div class="nivel-inicio-dica">Nível 5 é o padrão recomendado para personagens novos. Campanhas avançadas podem começar em nível maior.</div>
          </div>
        </div>
        <div class="nivel-ctrl">
          <div class="nivel-ctrl-row">
            <button onclick="App.setNivel(${p.nivel - 1})">−</button>
            <input type="number" min="1" max="100" value="${p.nivel}"
              onchange="App.setNivelIdentidade(parseInt(this.value)||5)"
              oninput="App.setNivelIdentidade(parseInt(this.value)||5)" />
            <button onclick="App.setNivel(${p.nivel + 1})">+</button>
          </div>
          <div class="nivel-ctrl-presets">
            ${[1,5,10,15,20,30].map(n =>
              `<button class="nivel-preset ${p.nivel === n ? 'ativo' : ''}" onclick="App.setNivelIdentidade(${n})">Nv.${n}</button>`
            ).join('')}
          </div>
          <div style="font-size:0.7rem;color:var(--cor-texto-dim);text-align:center;margin-top:0.2rem;">
            Você distribuirá <strong style="color:var(--cor-dourado)">${p.nivel}</strong> níveis entre as classes
          </div>
        </div>
      </div>

      <div class="campo-grupo" style="margin-top:1.2rem;">
        <label class="campo-label">Identidade do Personagem</label>
        <input type="text" class="campo-input" id="inp-identidade"
          placeholder="Ex: Última princesa de Platea, Cavaleiro renegado do Império..."
          value="${p.identidade}" oninput="App.setIdentidade(this.value)" maxlength="80" />
        <p class="campo-dica">Uma frase curta que resume como seu personagem se vê. Pode ser evocada para obter vantagem em testes.</p>
        <p class="campo-dica">Exemplos: "Cavaleiro real", "Rainha dos ladrões do deserto", "Feiticeiro amnésico idoso"</p>
      </div>

      <div class="separador"></div>
      <p style="font-size:0.85rem; color:var(--cor-texto-muted); margin-bottom:0.8rem;">Clique em qualquer conceito abaixo para usar como base:</p>

      <div class="tabela-identidade">
        <div class="tabela-col">
          <h4>Conceito Base</h4>
          ${[
            'Cavaleiro','Caçador de recompensa','Artista marcial','Caçador de tesouros',
            'Alienígena','Sacerdote/Sacerdotisa','Professor','Samurai','Bardo','Soldado',
            'Inventor','Contrabandista','Autômato','Ninja','Diplomata','Ladrão',
            'Rei/Rainha','Mago','Gladiador','Príncipe/Princesa'
          ].map((n,i) => `<div class="tabela-item" onclick="App.adicionarAIdentidade('${n}')">
            <span class="num">${i+1}.</span><span class="valor">${n}</span>
          </div>`).join('')}
        </div>
        <div class="tabela-col">
          <h4>Adjetivos &amp; Detalhes</h4>
          ${[
            'Encantador','Perjurador','Escolhido','Ex-(...) imperial','Perturbado','Corajoso',
            'Amigo dos animais','Amnésico','Atraente','Imperial','Bem relacionado','Leal',
            'Idoso','Jovem','Sorridente','Objetivo','Aprendiz','Influente','Ranzinza','Durão'
          ].map((n,i) => `<div class="tabela-item" onclick="App.adicionarAIdentidade('${n}')">
            <span class="num">${i+1}.</span><span class="valor">${n}</span>
          </div>`).join('')}
        </div>
      </div>
    `;
  },

  setIdentidade(v) { Estado.personagem.identidade = v; },

  adicionarAIdentidade(texto) {
    const inp = document.getElementById('inp-identidade');
    const atual = inp.value.trim();
    inp.value = atual ? atual + ' ' + texto.toLowerCase() : texto;
    Estado.personagem.identidade = inp.value;
    inp.focus();
  },

  // =============================================
  // PASSO 2 — ORIGEM
  // =============================================
  renderPassoOrigem(container) {
    const p = Estado.personagem;
    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Origem</h2>
        <p>Todos os heróis vêm de algum lugar. Sua Origem pode ser evocada para rolar novamente um ou ambos os dados de um teste.</p>
      </div>

      <div class="campo-grupo">
        <label class="campo-label">Local de Origem</label>
        <input type="text" class="campo-input" id="inp-origem"
          placeholder="Ex: Platea — uma cidadela pacífica no topo de um penhasco..."
          value="${p.origem}" oninput="App.setOrigem(this.value)" maxlength="120" />
        <p class="campo-dica">Pode ser uma aldeia, cidade, palácio no fundo do oceano, nave espacial, etc. Crie algo ligado ao seu mundo!</p>
      </div>

      <div class="campo-grupo">
        <label class="campo-label">Descrição adicional da Origem (opcional)</label>
        <textarea class="campo-input" id="inp-origem-desc"
          placeholder="Descreva o que esse lugar representa para você, suas memórias, por que o deixou..."
          rows="3" oninput="App.setOrigemDesc(this.value)">${p.origemDesc || ''}</textarea>
      </div>

      <div class="card" style="margin-top:1rem;">
        <p style="font-size:0.85rem; color:var(--cor-texto-muted); line-height:1.6;">
          <strong style="color:var(--cor-dourado);">Dica de criação:</strong> Em Fabula Ultima, a espécie do personagem
          <em>não oferece benefícios mecânicos</em> por padrão — elfo, anão, meio-dragão, saurício ou qualquer
          outra espécie é apenas parte da narrativa. Você pode mencionar a espécie na sua Identidade ou Origem!
        </p>
      </div>
    `;
  },

  setOrigem(v) { Estado.personagem.origem = v; },
  setOrigemDesc(v) { Estado.personagem.origemDesc = v; },

  // =============================================
  // PASSO 3 — TEMA
  // =============================================
  renderPassoTema(container) {
    const p = Estado.personagem;
    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Tema</h2>
        <p>Cada PJ é definido por um Tema — um ideal ou emoção forte que dita suas ações. Se construísse uma cena inteira ao redor do seu personagem, o Tema seria o ponto central.</p>
      </div>

      <div class="temas-grid" id="temas-grid"></div>

      <div class="campo-grupo" style="margin-top:1.2rem;">
        <label class="campo-label">Ou crie um Tema próprio</label>
        <input type="text" class="campo-input" id="inp-tema-custom"
          placeholder="Ex: Redenção, Liberdade, Proteção..."
          value="${p.temaCustom || ''}" oninput="App.setTemaCustom(this.value)" maxlength="50" />
        <p class="campo-dica">Discuta com o grupo para garantir que crie situações interessantes.</p>
      </div>

      ${p.tema ? `
        <div class="campo-grupo">
          <label class="campo-label">Como o Tema se aplica ao seu personagem?</label>
          <textarea class="campo-input" id="inp-tema-desc"
            placeholder="Ex: Minha personagem busca construir uma nação onde seu povo possa viver livremente..."
            rows="3" oninput="App.setTemaDescricao(this.value)">${p.temaDescricao || ''}</textarea>
        </div>
      ` : ''}
    `;

    const grid = document.getElementById('temas-grid');
    GAMEDATA.temas.forEach(t => {
      const div = document.createElement('div');
      div.className = 'tema-card' + (p.tema === t.id ? ' selecionado' : '');
      div.onclick = () => App.selecionarTema(t.id);
      div.innerHTML = `<div class="tema-nome">${t.nome}</div><div class="tema-descricao">${t.descricao}</div>`;
      grid.appendChild(div);
    });
  },

  selecionarTema(id) {
    Estado.personagem.tema = id;
    Estado.personagem.temaCustom = '';
    this.renderPassoTema(document.getElementById('wizard-main'));
  },

  setTemaCustom(v) {
    Estado.personagem.temaCustom = v;
    if (v.trim()) Estado.personagem.tema = '_custom';
    else Estado.personagem.tema = '';
  },

  setTemaDescricao(v) { Estado.personagem.temaDescricao = v; },

  // =============================================
  // PASSO 4 — CLASSES
  // =============================================
  renderPassoClasses(container) {
    const p = Estado.personagem;
    const nivelUsado = this.niveisUsados();
    const numClasses = Object.keys(p.classes).length;

    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Classes</h2>
        <p>Distribua ${p.nivel} níveis entre 2 a 3 classes. Para cada nível investido, escolha um poder da classe.</p>
      </div>
      <div class="aviso-classes">
        Níveis usados: <strong>${nivelUsado}/${p.nivel}</strong> &nbsp;|&nbsp;
        Classes: <strong>${numClasses}</strong> de 2 a 3 necessárias
      </div>

      <div class="filtro-poderes-container">
        <div class="filtro-poderes-wrap">
          <span class="filtro-poderes-icone"></span>
          <input type="text" class="filtro-poderes-input" id="filtro-poderes"
            placeholder="Buscar poder por nome ou descrição..."
            value="${this._filtroPoderes}"
            oninput="App.filtrarPoderes(this.value)" />
        </div>
      </div>

      <div id="classes-resultado">
        <div class="classes-layout">
          <div class="classes-lista" id="classes-lista"></div>
          <div>
            <div class="painel-classes" id="painel-classes"></div>
          </div>
        </div>
      </div>
    `;

    if (this._filtroPoderes) {
      this.renderizarBuscaPoderes();
    } else {
      this.renderizarListaClasses();
      this.renderizarPainelClasses();
    }
  },

  filtrarPoderes(texto) {
    this._filtroPoderes = texto.toLowerCase().trim();
    if (this._filtroPoderes) {
      this.renderizarBuscaPoderes();
    } else {
      // Restaurar visão normal
      const res = document.getElementById('classes-resultado');
      if (res) {
        res.innerHTML = `
          <div class="classes-layout">
            <div class="classes-lista" id="classes-lista"></div>
            <div><div class="painel-classes" id="painel-classes"></div></div>
          </div>
        `;
        this.renderizarListaClasses();
        this.renderizarPainelClasses();
      }
    }
  },

  renderizarBuscaPoderes() {
    const res = document.getElementById('classes-resultado');
    if (!res) return;
    const termo = this._filtroPoderes;

    const resultados = [];
    GAMEDATA.classes.forEach(cl => {
      cl.poderes.forEach(pod => {
        if (pod.nome.toLowerCase().includes(termo) || pod.descricao.toLowerCase().includes(termo)) {
          resultados.push({ classe: cl, poder: pod });
        }
      });
    });

    if (resultados.length === 0) {
      res.innerHTML = `<div class="busca-poderes-resultado"><div class="busca-sem-resultado">Nenhum poder encontrado para "<strong>${this._filtroPoderes}</strong>"</div></div>`;
      return;
    }

    res.innerHTML = `
      <div style="font-size:0.8rem;color:var(--cor-texto-muted);margin-bottom:0.5rem;">${resultados.length} poder${resultados.length !== 1 ? 'es' : ''} encontrado${resultados.length !== 1 ? 's' : ''}</div>
      <div class="busca-poderes-resultado">
        ${resultados.map(({ classe: cl, poder: pod }) => `
          <div class="busca-poder-item">
            <span class="busca-poder-classe-tag">${cl.nome}</span>
            <div class="busca-poder-info">
              <div class="busca-poder-nome">${pod.nome}${pod.repeticoes > 1 ? ` <span style="font-size:0.72rem;color:var(--cor-texto-dim);">(máx ${pod.repeticoes}×)</span>` : ''}</div>
              <div class="busca-poder-desc">${pod.descricao}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderizarListaClasses() {
    const lista = document.getElementById('classes-lista');
    if (!lista) return;
    lista.innerHTML = '';
    const p = Estado.personagem;

    GAMEDATA.classes.forEach(cl => {
      const classeData = p.classes[cl.id];
      const niveis = classeData ? classeData.niveis : 0;
      const adicionada = niveis > 0;

      const div = document.createElement('div');
      div.className = 'classe-card' + (adicionada ? ' adicionada' : '');
      div.id = 'classe-card-' + cl.id;

      const benefTags = cl.beneficiosIniciais.map(b =>
        `<span class="tag">${b}</span>`
      ).join('');

      const marcialTags = cl.marcialEquip.map(m => {
        const nomes = { armas_corpo_a_corpo: 'Armas C.C.', armas_distancia: 'Armas Dist.', armaduras: 'Armaduras', escudos: 'Escudos' };
        return `<span class="tag marcial">${nomes[m] || m}</span>`;
      }).join('');

      div.innerHTML = `
        <div class="classe-header">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span class="classe-icone">${ICONES_CLASSES[cl.id] || ''}</span>
            <div>
              <div class="classe-nome">${cl.nome}</div>
              <div class="classe-outros-nomes">${cl.outrosNomes}</div>
            </div>
          </div>
          ${adicionada ? `<span class="badge-info">✓ ${niveis} nível${niveis > 1 ? 'is' : ''}</span>` : ''}
        </div>
        <div class="classe-desc">${cl.descricao}</div>
        <div class="classe-beneficios">${benefTags}${marcialTags}</div>
        <div class="classe-acoes">
          <div class="classe-niveis-ctrl">
            <button onclick="App.alterarNivelClasse('${cl.id}', -1)" title="Remover nível">−</button>
            <span class="classe-nivel-num">${niveis}</span>
            <span class="classe-nivel-label">níveis</span>
            <button onclick="App.alterarNivelClasse('${cl.id}', +1)" title="Adicionar nível">+</button>
          </div>
        </div>
        ${adicionada ? this.renderizarPoderesClasse(cl, classeData) : ''}
        ${adicionada ? `<div class="perguntas-rp"><h5>Perguntas de Roleplay</h5><ul>${cl.perguntas.map(q => `<li>${q}</li>`).join('')}</ul></div>` : ''}
      `;
      lista.appendChild(div);
    });
  },

  renderizarPoderesClasse(cl, classeData) {
    if (!classeData || classeData.niveis === 0) return '';
    const poderesSelecionados = classeData.poderes || [];
    const niveis = classeData.niveis;

    return `
      <div class="poderes-section">
        <div class="poderes-titulo">Escolha ${niveis} poder${niveis > 1 ? 'es' : ''} (${poderesSelecionados.length}/${niveis} selecionados):</div>
        ${cl.poderes.map(pod => {
          const vezesSelecionado = poderesSelecionados.filter(id => id === pod.id).length;
          const selecionado = vezesSelecionado > 0;
          const podeAdicionar = poderesSelecionados.length < niveis && vezesSelecionado < (pod.repeticoes || 1);
          if (pod.repeticoes > 1) {
            return `
              <div class="poder-item ${selecionado ? 'selecionado' : ''}">
                <div style="flex:1">
                  <div class="poder-info-nome">
                    ${pod.nome}
                    <span class="poder-info-rep">⟳ até ${pod.repeticoes}×</span>
                  </div>
                  <div class="poder-info-desc">${pod.descricao}</div>
                </div>
                <div class="poder-count-ctrl">
                  <button onclick="App.removerPoderUm('${cl.id}','${pod.id}')" ${vezesSelecionado <= 0 ? 'disabled' : ''}>−</button>
                  <span class="poder-count-val">${vezesSelecionado}</span>
                  <button onclick="App.adicionarPoderUm('${cl.id}','${pod.id}')" ${!podeAdicionar ? 'disabled' : ''}>+</button>
                </div>
              </div>
            `;
          }
          return `
            <div class="poder-item ${selecionado ? 'selecionado' : ''}"
              onclick="App.togglePoder('${cl.id}', '${pod.id}')">
              <div class="poder-check">${selecionado ? '✓' : ''}</div>
              <div style="flex:1">
                <div class="poder-info-nome">${pod.nome}</div>
                <div class="poder-info-desc">${pod.descricao}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderizarPainelClasses() {
    const painel = document.getElementById('painel-classes');
    if (!painel) return;
    const p = Estado.personagem;
    const nivelUsado = this.niveisUsados();
    const restante = p.nivel - nivelUsado;

    let nivelClass = 'ok';
    if (restante > 0) nivelClass = 'aviso';
    if (restante < 0) nivelClass = 'excesso';

    const resumoClasses = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => {
        const cl = GAMEDATA.classes.find(c => c.id === id);
        return `<div class="resumo-classe">
          <div class="resumo-classe-nome">${cl?.nome || id}</div>
          <div class="resumo-classe-nivel">${d.niveis} nível${d.niveis > 1 ? 'is' : ''} • ${d.poderes.length} poder${d.poderes.length !== 1 ? 'es' : ''}</div>
        </div>`;
      }).join('');

    painel.innerHTML = `
      <h4>Resumo de Classes</h4>
      <div class="niveis-restantes">
        <div class="niveis-num ${nivelClass}">${restante}</div>
        <div class="niveis-label">nível${restante !== 1 ? 'is' : ''} restante${restante !== 1 ? 's' : ''}</div>
      </div>
      <div class="classes-resumo">${resumoClasses || '<p style="font-size:0.8rem;color:var(--cor-texto-dim);text-align:center;">Nenhuma classe escolhida</p>'}</div>
      <div style="font-size:0.78rem;color:var(--cor-texto-muted);padding-top:0.5rem;border-top:1px solid var(--cor-borda);">
        <p>• Escolha 2 a 3 classes</p>
        <p>• Máximo ${p.nivel} níveis totais (Nível ${p.nivel})</p>
        <p>• Escolha 1 poder por nível</p>
        <p>• Poderes com ⟳ podem ser repetidos</p>
      </div>
    `;
  },

  niveisUsados() {
    return Object.values(Estado.personagem.classes).reduce((s, d) => s + (d.niveis || 0), 0);
  },

  setNivel(v) {
    const nivel = Math.max(1, Math.min(100, parseInt(v) || 5));
    Estado.personagem.nivel = nivel;
    let total = this.niveisUsados();
    while (total > nivel) {
      const maiorClasse = Object.entries(Estado.personagem.classes)
        .filter(([, d]) => d.niveis > 0)
        .sort(([, a], [, b]) => b.niveis - a.niveis)[0];
      if (!maiorClasse) break;
      this.alterarNivelClasse(maiorClasse[0], -1);
      total = this.niveisUsados();
    }
    this.atualizarStatsVivo();
  },

  setNivelIdentidade(v) {
    this.setNivel(v);
    // Re-render do passo 0 para atualizar presets e contador
    if (Estado.passoAtual === 0) this.renderPassoIdentidade(document.getElementById('wizard-main'));
  },

  alterarNivelClasse(classeId, delta) {
    const p = Estado.personagem;
    const nivelAtual = p.classes[classeId]?.niveis || 0;
    const nivelUsado = this.niveisUsados();

    if (delta > 0) {
      if (nivelUsado >= p.nivel) {
        this.mostrarToast(`Você já usou todos os ${p.nivel} níveis!`, 'erro');
        return;
      }
      const numClasses = Object.keys(p.classes).filter(id => p.classes[id].niveis > 0).length;
      if (nivelAtual === 0 && numClasses >= 3) {
        this.mostrarToast('Máximo de 3 classes no início!', 'erro');
        return;
      }
      if (!p.classes[classeId]) p.classes[classeId] = { niveis: 0, poderes: [] };
      p.classes[classeId].niveis++;
    } else {
      if (nivelAtual <= 0) return;
      p.classes[classeId].niveis--;
      while ((p.classes[classeId].poderes || []).length > p.classes[classeId].niveis) {
        p.classes[classeId].poderes.pop();
      }
      if (p.classes[classeId].niveis === 0) {
        delete p.classes[classeId];
      }
    }

    this.renderizarListaClasses();
    this.renderizarPainelClasses();
    this.atualizarStatsVivo();
  },

  togglePoder(classeId, poderId) {
    // Para poderes com repeticoes=1: toggle simples
    const p = Estado.personagem;
    if (!p.classes[classeId]) return;
    const poderes = p.classes[classeId].poderes || [];
    const niveis = p.classes[classeId].niveis;
    const cl = GAMEDATA.classes.find(c => c.id === classeId);
    const poderInfo = cl?.poderes.find(po => po.id === poderId);
    if ((poderInfo?.repeticoes || 1) > 1) return; // usa adicionarPoderUm/removerPoderUm

    const vezesSelecionado = poderes.filter(id => id === poderId).length;
    if (vezesSelecionado > 0) {
      const idx = poderes.lastIndexOf(poderId);
      poderes.splice(idx, 1);
    } else {
      if (poderes.length >= niveis) {
        this.mostrarToast(`Você já escolheu ${niveis} poder${niveis > 1 ? 'es' : ''} para esta classe.`, 'erro');
        return;
      }
      poderes.push(poderId);
    }
    p.classes[classeId].poderes = poderes;
    this.renderizarListaClasses();
    this.renderizarPainelClasses();
  },

  adicionarPoderUm(classeId, poderId) {
    const p = Estado.personagem;
    if (!p.classes[classeId]) return;
    const poderes = p.classes[classeId].poderes || [];
    const niveis = p.classes[classeId].niveis;
    const cl = GAMEDATA.classes.find(c => c.id === classeId);
    const poderInfo = cl?.poderes.find(po => po.id === poderId);
    const vezes = poderes.filter(id => id === poderId).length;
    if (poderes.length >= niveis) {
      this.mostrarToast(`Você já escolheu ${niveis} poder${niveis > 1 ? 'es' : ''} para esta classe.`, 'erro');
      return;
    }
    if (vezes >= (poderInfo?.repeticoes || 1)) {
      this.mostrarToast(`Máximo de ${poderInfo?.repeticoes} repetições para este poder.`, 'erro');
      return;
    }
    poderes.push(poderId);
    p.classes[classeId].poderes = poderes;
    this.renderizarListaClasses();
    this.renderizarPainelClasses();
  },

  removerPoderUm(classeId, poderId) {
    const p = Estado.personagem;
    if (!p.classes[classeId]) return;
    const poderes = p.classes[classeId].poderes || [];
    const idx = poderes.lastIndexOf(poderId);
    if (idx >= 0) poderes.splice(idx, 1);
    p.classes[classeId].poderes = poderes;
    this.renderizarListaClasses();
    this.renderizarPainelClasses();
  },

  // =============================================
  // PASSO 5 — ATRIBUTOS
  // =============================================
  renderPassoAtributos(container) {
    const p = Estado.personagem;
    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Atributos</h2>
        <p>Escolha um perfil e distribua os dados entre os quatro atributos. Atributos influenciam PV, PM, Defesa e Defesa Mágica.</p>
      </div>

      <div class="perfis-grid" id="perfis-grid"></div>

      ${p.perfilAtrib ? `
        <div class="atributos-distribuicao" id="atrib-dist">
          <h4>Distribua os dados entre os atributos</h4>
          <div id="atribs-linhas"></div>
          <div class="dado-disponivel-info">
            <p style="font-size:0.78rem;color:var(--cor-texto-muted);margin-bottom:0.4rem;">Dados disponíveis no perfil selecionado:</p>
            <div class="dados-disponiveis" id="dados-disponiveis"></div>
          </div>
        </div>
      ` : `<div class="card" style="text-align:center;padding:2rem;color:var(--cor-texto-muted);">
        <p>Selecione um perfil acima para distribuir os dados.</p>
      </div>`}
    `;

    const grid = document.getElementById('perfis-grid');
    const sugeridos = this._sugerirPerfisParaClasses();
    const todosPerfis = [
      ...sugeridos,
      ...GAMEDATA.perfisAtributos
    ];
    todosPerfis.forEach(pf => {
      const div = document.createElement('div');
      div.className = 'perfil-card' + (p.perfilAtrib === pf.id ? ' selecionado' : '') + (pf._sugerido ? ' perfil-sugerido' : '');
      div.onclick = () => App.selecionarPerfil(pf.id);
      div.innerHTML = `
        ${pf._sugerido ? '<div class="perfil-sugerido-tag">Recomendado para suas classes</div>' : ''}
        <div class="perfil-nome">${pf.nome}</div>
        <div class="perfil-dados">${pf.dados.map(d => `<span class="dado-badge">${d}</span>`).join('')}</div>
        <div class="perfil-desc">${pf.descricao}</div>
        <div style="font-size:0.75rem;color:var(--cor-texto-dim);margin-top:0.4rem;">${pf.exemplo}</div>
      `;
      grid.appendChild(div);
    });

    if (p.perfilAtrib) {
      this.renderizarDistribuicaoAtribs();
    }
  },

  selecionarPerfil(id) {
    const todosPerfis = [...this._sugerirPerfisParaClasses(), ...GAMEDATA.perfisAtributos];
    const pf = todosPerfis.find(p => p.id === id);
    if (!pf) return;
    Estado.personagem.perfilAtrib = id;

    // Para perfis sugeridos: distribui dados na ordem do ranking de classes
    if (pf._sugerido) {
      const classes = Object.keys(Estado.personagem.classes);
      const score = { des: 0, vig: 0, ast: 0, von: 0 };
      classes.forEach(clId => {
        const mapa = CLASSES_ATRIBS[clId];
        if (!mapa) return;
        score[mapa.prim] += 2;
        score[mapa.sec]  += 1;
      });
      const ranked = ['des','vig','ast','von'].sort((a,b) => score[b] - score[a]);
      const dados = [...pf.dados].sort((a, b) => parseInt(b.slice(1)) - parseInt(a.slice(1)));
      const atribs = {};
      ranked.forEach((atrib, i) => { atribs[atrib] = dados[i]; });
      Estado.personagem.atributos = atribs;
    } else {
      // Para perfis base: ordena dados desc e atribui na ordem padrão des/vig/ast/von
      const dados = [...pf.dados].sort((a, b) => parseInt(b.slice(1)) - parseInt(a.slice(1)));
      Estado.personagem.atributos = {
        des: dados[0], vig: dados[1], ast: dados[2], von: dados[3]
      };
    }

    this.renderPassoAtributos(document.getElementById('wizard-main'));
    this.atualizarStatsVivo();
  },

  _sugerirPerfisParaClasses() {
    const classes = Object.keys(Estado.personagem.classes);
    if (classes.length === 0) return [];

    // Calcula pontuação de cada atributo baseada nas classes escolhidas
    const score = { des: 0, vig: 0, ast: 0, von: 0 };
    classes.forEach(clId => {
      const mapa = CLASSES_ATRIBS[clId];
      if (!mapa) return;
      score[mapa.prim] += 2;
      score[mapa.sec]  += 1;
    });

    // Ordena atributos por score
    const ranked = ['des','vig','ast','von'].sort((a,b) => score[b] - score[a]);
    const nomes = { des:'DES', vig:'VIG', ast:'AST', von:'VON' };

    // Gera 3 perfis customizados
    const perfil1 = { // Especializado nas 2 melhores
      id: '_sug_esp', _sugerido: true,
      nome: `Especialista (${nomes[ranked[0]]}+${nomes[ranked[1]]})`,
      dados: ['d10','d10','d6','d6'],
      descricao: `Focado em ${nomes[ranked[0]]} e ${nomes[ranked[1]]}, pontos fortes das suas classes.`,
      exemplo: `Ideal para: ${classes.map(id => GAMEDATA.classes.find(c=>c.id===id)?.nome||id).join(' + ')}`
    };
    // Atribui d10 às 2 principais e d6 às demais
    perfil1._ordem = { [ranked[0]]:'d10', [ranked[1]]:'d10', [ranked[2]]:'d6', [ranked[3]]:'d6' };

    const perfil2 = { // Mediano: top 1 alto, 2 médios, 1 baixo
      id: '_sug_med', _sugerido: true,
      nome: `Focado (${nomes[ranked[0]]} principal)`,
      dados: ['d10','d8','d8','d6'],
      descricao: `Prioriza ${nomes[ranked[0]]} com suporte equilibrado. Bom equilíbrio para múltiplas classes.`,
      exemplo: `Ideal para: ${classes.map(id => GAMEDATA.classes.find(c=>c.id===id)?.nome||id).join(' + ')}`
    };

    const perfil3 = { // Equilibrado adaptado: os 2 melhores em d8, os 2 piores também em d8 mas diferente
      id: '_sug_ver', _sugerido: true,
      nome: `Versátil (${nomes[ranked[0]]}+${nomes[ranked[1]]}+${nomes[ranked[2]]})`,
      dados: ['d10','d8','d8','d6'],
      descricao: `Concentra-se nos três atributos mais úteis para suas classes.`,
      exemplo: `Nenhum ponto fraco crítico nas suas escolhas.`
    };

    return [perfil1, perfil2, perfil3];
  },

  _perfilAtual() {
    const p = Estado.personagem;
    const todosPerfis = [...this._sugerirPerfisParaClasses(), ...GAMEDATA.perfisAtributos];
    return todosPerfis.find(pf => pf.id === p.perfilAtrib) || null;
  },

  renderizarDistribuicaoAtribs() {
    const p = Estado.personagem;
    const pf = this._perfilAtual();
    if (!pf) return;

    // Contagem de cada dado no perfil
    const pfCount = {};
    pf.dados.forEach(d => { pfCount[d] = (pfCount[d] || 0) + 1; });

    const linhas = document.getElementById('atribs-linhas');
    const dadosDisp = document.getElementById('dados-disponiveis');

    if (linhas) {
      linhas.innerHTML = GAMEDATA.atributos.map(at => {
        // Opções válidas = dados com quantidade disponível após excluir este atributo
        const validas = ['d6','d8','d10','d12'].filter(d => {
          if (!pfCount[d]) return false;
          const usadosPorOutros = Object.entries(p.atributos)
            .filter(([id]) => id !== at.id)
            .filter(([, v]) => v === d).length;
          return usadosPorOutros < pfCount[d];
        });
        return `
          <div class="atributo-linha">
            <div class="atributo-nome" data-tooltip="${at.descricao}">
              ${at.nome}
              <div class="atributo-abrev">${at.abrev}</div>
            </div>
            <div class="atributo-desc">${at.descricao}</div>
            <select class="atributo-select" id="sel-${at.id}"
              onchange="App.setAtributo('${at.id}', this.value)">
              ${['d6','d8','d10','d12'].map(d => {
                const disponivel = validas.includes(d);
                return `<option value="${d}" ${p.atributos[at.id] === d ? 'selected' : ''} ${!disponivel && p.atributos[at.id] !== d ? 'disabled' : ''}>${d}${!disponivel && p.atributos[at.id] !== d ? ' (indisponível)' : ''}</option>`;
              }).join('')}
            </select>
          </div>
        `;
      }).join('');
    }

    if (dadosDisp) {
      const usados = Object.values(p.atributos);
      const uniqDados = [...new Set(pf.dados)].sort((a,b) => parseInt(a.slice(1))-parseInt(b.slice(1)));
      dadosDisp.innerHTML = uniqDados.map(d => {
        const total = pfCount[d];
        const usado = usados.filter(u => u === d).length;
        return Array.from({length: total}, (_, i) =>
          `<span class="dado-disponivel${i < usado ? ' usado' : ''}">${d}</span>`
        ).join('');
      }).join('');
    }
  },

  setAtributo(atribId, valor) {
    const p = Estado.personagem;
    const pf = this._perfilAtual();
    if (pf) {
      const pfCount = {};
      pf.dados.forEach(d => { pfCount[d] = (pfCount[d] || 0) + 1; });
      // Verifica se o dado escolhido já está todo usado por outros atributos
      const usadosPorOutros = Object.entries(p.atributos)
        .filter(([id]) => id !== atribId)
        .filter(([, v]) => v === valor).length;
      if (usadosPorOutros >= (pfCount[valor] || 0)) {
        // Auto-swap: troca o outro atributo que usa esse dado com o valor atual
        const atribParaTrocar = Object.entries(p.atributos)
          .find(([id, v]) => id !== atribId && v === valor);
        if (atribParaTrocar) {
          p.atributos[atribParaTrocar[0]] = p.atributos[atribId];
        }
      }
    }
    p.atributos[atribId] = valor;
    this.renderizarDistribuicaoAtribs();
    this.atualizarStatsVivo();
  },

  // =============================================
  // PASSO 6 — ESTATÍSTICAS
  // =============================================
  renderPassoEstatisticas(container) {
    const stats = this.calcularStats();
    const p = Estado.personagem;

    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Estatísticas</h2>
        <p>Suas estatísticas são calculadas automaticamente com base em atributos e classes escolhidas.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card pv">
          <div class="stat-valor">${stats.pvMax}</div>
          <div class="stat-nome">Pontos de Vida</div>
          <div class="stat-formula">Nível + (VIG × 5) + bônus de classe</div>
        </div>
        <div class="stat-card pm">
          <div class="stat-valor">${stats.pmMax}</div>
          <div class="stat-nome">Pontos de Mana</div>
          <div class="stat-formula">Nível + (VON × 5) + bônus de classe</div>
        </div>
        <div class="stat-card pi">
          <div class="stat-valor">${stats.piMax}</div>
          <div class="stat-nome">Pontos de Inventário</div>
          <div class="stat-formula">6 + bônus de classe</div>
        </div>
        <div class="stat-card def">
          <div class="stat-valor">${stats.defesa}</div>
          <div class="stat-nome">Defesa</div>
          <div class="stat-formula">DES mod. por armadura${p.equipamento.escudo ? ' + escudo' : ''}</div>
        </div>
        <div class="stat-card defm">
          <div class="stat-valor">${stats.defMagica}</div>
          <div class="stat-nome">Defesa Mágica</div>
          <div class="stat-formula">AST mod. por armadura${p.equipamento.escudo ? ' + escudo' : ''}</div>
        </div>
        <div class="stat-card inic">
          <div class="stat-valor">${stats.iniciativa >= 0 ? '+' + stats.iniciativa : stats.iniciativa}</div>
          <div class="stat-nome">Iniciativa</div>
          <div class="stat-formula">Modificado pela armadura</div>
        </div>
      </div>

      <div class="crise-info">
        <strong>Crise</strong>: ${stats.crise} PV — você está em crise quando seus PV caem abaixo desse valor. Alguns poderes ficam mais fortes em crise!
      </div>

      <div class="card" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
          <p style="font-size:0.85rem;color:var(--cor-texto-muted);line-height:1.5;margin:0;">
            <strong style="color:var(--cor-dourado);">Pontos de Fábula iniciais: 3 </strong><br>
            Pontos de Fábula permitem alterar a história, evocar Traços e Laços, usar poderes especiais e ganhar experiência!
          </p>
          <div style="font-size:0.8rem;color:var(--cor-texto-muted);text-align:right;">
            Nível do personagem: <strong style="color:var(--cor-dourado);">${p.nivel}</strong><br>
            <span style="font-size:0.72rem;color:var(--cor-texto-dim);">(configurado no passo 1)</span>
          </div>
        </div>
      </div>

      <div class="lacos-section">
        <h3>Laços ⟵ (opcional)</h3>
        <p style="font-size:0.82rem;color:var(--cor-texto-muted);margin-bottom:0.8rem;">
          Laços são conexões com personagens, nações ou organizações que aumentam a força do seu personagem.
          Cada laço pode ter até 3 emoções (uma de cada par). Você pode ter até 6 laços.
        </p>
        <div id="lacos-lista"></div>
        <button class="btn-secundario" onclick="App.adicionarLaco()" style="margin-top:0.5rem;font-size:0.82rem;">+ Adicionar Laço</button>
      </div>
    `;

    this.renderizarLacos();
  },

  calcularStats() {
    const p = Estado.personagem;
    const nivel = p.nivel;
    const atribs = p.atributos;
    const valDado = (d) => parseInt(d.slice(1)) || 8;

    const vig = valDado(atribs.vig || 'd8');
    const von = valDado(atribs.von || 'd8');
    const des = valDado(atribs.des || 'd8');
    const ast = valDado(atribs.ast || 'd8');

    let bonusPV = 0, bonusPM = 0, bonusPI = 0;
    Object.keys(p.classes).forEach(clId => {
      const cl = GAMEDATA.classes.find(c => c.id === clId);
      if (!cl) return;
      cl.beneficiosIniciais.forEach(b => {
        if (b.startsWith('+5 PV')) bonusPV += 5;
        if (b.startsWith('+5 PM')) bonusPM += 5;
        if (b.startsWith('+2 PI')) bonusPI += 2;
      });
    });

    const guardData = p.classes['guardiao'];
    if (guardData) {
      const fortaleza = guardData.poderes.filter(id => id === 'fortaleza').length;
      bonusPV += fortaleza * fortaleza * 3;
    }

    const pvMax = nivel + (vig * 5) + bonusPV;
    const pmMax = nivel + (von * 5) + bonusPM;
    const piMax = 6 + bonusPI;
    const crise = Math.floor(pvMax / 2);

    const armorData = (p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura')
      ? GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura)
      : null;

    const shieldData = p.equipamento.escudo
      ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo)
      : null;

    const parseFormula = (formula, desVal, astVal) => {
      const n = parseInt(formula);
      if (!isNaN(n)) return n;
      if (formula === 'DES') return desVal;
      if (formula === 'AST') return astVal;
      if (/^DES[+-]\d+$/.test(formula)) return desVal + parseInt(formula.slice(3));
      if (/^AST[+-]\d+$/.test(formula)) return astVal + parseInt(formula.slice(3));
      return desVal;
    };

    const shieldDefBonus  = shieldData ? (parseInt(shieldData.defesa)   || 0) : 0;
    const shieldDefMBonus = shieldData ? (parseInt(shieldData.defMagica) || 0) : 0;

    const defesa    = parseFormula(armorData?.defesa    || 'DES', des, ast) + shieldDefBonus;
    const defMagica = parseFormula(armorData?.defMagica || 'AST', des, ast) + shieldDefMBonus;
    const iniciativa = armorData ? (armorData.iniciativa || 0) : 0;

    return { pvMax, pmMax, piMax, crise, defesa, defMagica, iniciativa };
  },

  _rndArr(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

  _agruparPoderes(lista) {
    const map = {};
    lista.forEach(pid => { map[pid] = (map[pid] || 0) + 1; });
    return map;
  },

  renderizarLacos() {
    const lista = document.getElementById('lacos-lista');
    if (!lista) return;
    const p = Estado.personagem;

    lista.innerHTML = p.lacos.map((laco, i) => `
      <div class="laco-item" id="laco-${i}">
        <div class="laco-linha">
          <span class="laco-num">${i + 1}.</span>
          <input type="text" class="campo-input" style="flex:1"
            placeholder="Nome da pessoa, nação ou organização..."
            value="${laco.alvo}" oninput="App.setLacoAlvo(${i}, this.value)" />
          ${i >= 1 ? `<button class="btn-perigo" onclick="App.removerLaco(${i})">Remover</button>` : ''}
        </div>
        ${laco.alvo ? `
          <p style="font-size:0.78rem;color:var(--cor-texto-dim);margin:0 0 0.4rem 25px;">Emoções (um de cada par):</p>
          <div class="emocoes-lista" style="margin-left:25px;">
            ${GAMEDATA.emocoes.map(em => {
              const ativa = laco.emocoes.includes(em.id);
              return `<button class="emocao-btn par-${em.par.toLowerCase()} ${ativa ? 'ativa' : ''}"
                onclick="App.toggleEmocao(${i}, '${em.id}', '${em.par}')"
                data-tooltip="${em.descricao}">${em.nome}</button>`;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  },

  adicionarLaco() {
    if (Estado.personagem.lacos.length >= 6) {
      this.mostrarToast('Máximo de 6 laços!', 'erro');
      return;
    }
    Estado.personagem.lacos.push({ alvo: '', emocoes: [] });
    this.renderizarLacos();
  },

  removerLaco(idx) {
    Estado.personagem.lacos.splice(idx, 1);
    this.renderizarLacos();
  },

  setLacoAlvo(idx, v) {
    const prev = Estado.personagem.lacos[idx].alvo;
    Estado.personagem.lacos[idx].alvo = v;
    // Só re-renderiza se mudou empty↔non-empty (para mostrar/esconder emoções)
    if (!!prev.trim() !== !!v.trim()) {
      this.renderizarLacos();
      setTimeout(() => {
        const input = document.querySelector(`#laco-${idx} input.campo-input`);
        if (input) { input.focus(); input.setSelectionRange(v.length, v.length); }
      }, 0);
    }
  },

  toggleEmocao(lacoIdx, emocaoId, par) {
    const laco = Estado.personagem.lacos[lacoIdx];
    const emocoesPar = GAMEDATA.emocoes.filter(e => e.par === par).map(e => e.id);

    if (laco.emocoes.includes(emocaoId)) {
      laco.emocoes = laco.emocoes.filter(e => e !== emocaoId);
    } else {
      laco.emocoes = laco.emocoes.filter(e => !emocoesPar.includes(e));
      laco.emocoes.push(emocaoId);
    }
    this.renderizarLacos();
  },

  // =============================================
  // PASSO 7 — EQUIPAMENTO
  // =============================================
  renderPassoEquipamento(container) {
    const p = Estado.personagem;
    const gasto = this.calcularGastoEquip();
    const restante = 500 - gasto;
    const pct = Math.min(100, (gasto / 500) * 100);

    const podeMarcial = this.podeUsarMarcial();

    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Equipamento</h2>
        <p>Você tem 500 zênites para equipar seu personagem. Armas com a marca Marcial exigem classes específicas.</p>
      </div>

      <div class="equip-layout">
        <div id="equip-lista"></div>
        <div>
          <div class="budget-bar" id="budget-bar">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div>
                <div class="budget-total ${restante < 0 ? 'negativo' : ''}">${restante}z</div>
                <div class="budget-label">zênites restantes de 500z</div>
              </div>
              <div style="font-size:0.8rem;color:var(--cor-texto-muted);">${gasto}z gastos</div>
            </div>
            <div class="budget-barra">
              <div class="budget-preenchida ${restante < 0 ? 'gasto' : ''}" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="inventario-lista">
            <h4>Itens Selecionados</h4>
            <div id="inventario-selecionado"></div>
          </div>
          <div class="card" style="margin-top:0.8rem;">
            <p style="font-size:0.78rem;color:var(--cor-texto-muted);line-height:1.5;">
              <strong style="color:var(--cor-dourado);">Dinheiro inicial</strong><br>
              O valor restante (${Math.max(0, restante)}z) + rolagem de 2d6×10 será seu dinheiro inicial.
            </p>
          </div>
          <div class="card" style="margin-top:0.8rem;">
            <label class="form-label" style="font-size:0.82rem;color:var(--cor-dourado);display:block;margin-bottom:0.5rem;">Itens e Anotações Livres</label>
            <textarea class="form-input" rows="4" placeholder="Itens especiais, troca de equipamento, moedas encontradas, notas da mestra…" oninput="App.setItensLivres(this.value)" style="width:100%;font-size:0.82rem;resize:vertical;">${p.equipamento.itensLivres || ''}</textarea>
          </div>
        </div>
      </div>
    `;

    this.renderizarListaEquipamentos(podeMarcial);
    this.renderizarInventarioSelecionado();
  },

  renderizarListaEquipamentos(podeMarcial) {
    const lista = document.getElementById('equip-lista');
    if (!lista) return;
    const p = Estado.personagem;

    lista.innerHTML = '';

    // ARMAS
    const divArmas = document.createElement('div');
    divArmas.className = 'equip-categoria';
    divArmas.innerHTML = `<h4>Armas</h4>`;

    const categorias = [...new Set(GAMEDATA.armas.map(a => a.categoria))];
    categorias.forEach(cat => {
      const catDiv = document.createElement('div');
      catDiv.innerHTML = `<p style="font-size:0.75rem;color:var(--cor-texto-dim);margin:0.4rem 0 0.2rem;text-transform:uppercase;">${cat}</p>`;
      GAMEDATA.armas.forEach(arma => {
        if (arma.categoria !== cat) return;
        const qtd = p.equipamento.armas.filter(id => id === arma.id).length;
        const selecionada = qtd > 0;
        const bloqDist = arma.marcial && !podeMarcial.armas_distancia && arma.alcance === 'à distância';
        const bloqCC = arma.marcial && !podeMarcial.armas_corpo_a_corpo && arma.alcance === 'corpo a corpo';
        const isBloq = bloqDist || bloqCC;
        const gastoAtual = this.calcularGastoEquip();
        const inacessivel = !isBloq && arma.custo > (500 - gastoAtual);

        const temArmaEquipada = p.equipamento.armas.length > 0 && qtd === 0;

        const div = document.createElement('div');
        div.className = `equip-item${selecionada ? ' equipado' : ''}${isBloq ? ' bloqueado' : ''}${inacessivel ? ' sem-zeni' : ''}`;
        div.onclick = (isBloq || inacessivel) ? null : () => App.toggleArma(arma.id);
        if (!isBloq && !inacessivel && temArmaEquipada) {
          div.onmouseenter = (e) => App.mostrarComparacao(arma.id, 'arma', e);
          div.onmouseleave = () => App.ocultarComparacao();
        }
        div.innerHTML = `
          <div class="equip-check">${selecionada ? '✓' : ''}</div>
          <div class="equip-nome">${arma.nome}${arma.marcial ? ' <span class="equip-marcial">Marcial</span>' : ''}${inacessivel ? ' <span class="equip-sem-zeni">Sem zeni</span>' : ''}</div>
          <div class="equip-stats">${arma.precisao} | ${arma.dano} | ${arma.maos}m | ${arma.alcance}</div>
          <div class="equip-custo-wrap">
            <span class="equip-custo">${arma.custo === 0 ? 'Grátis' : arma.custo + 'z'}</span>
            ${selecionada ? `<div class="equip-qtd-ctrl" onclick="event.stopPropagation()">
              <button onclick="App.removerArmaUm('${arma.id}')">−</button>
              <span>${qtd}</span>
              <button onclick="App.toggleArma('${arma.id}')" ${inacessivel ? 'disabled' : ''}>+</button>
            </div>` : ''}
          </div>
        `;
        catDiv.appendChild(div);
      });
      divArmas.appendChild(catDiv);
    });
    lista.appendChild(divArmas);

    // ARMADURAS
    const divArmaduras = document.createElement('div');
    divArmaduras.className = 'equip-categoria';
    divArmaduras.innerHTML = `<h4>Armaduras</h4>`;
    GAMEDATA.armaduras.forEach(arm => {
      const selecionada = p.equipamento.armadura === arm.id;
      const bloqueada = arm.marcial && !podeMarcial.armaduras;
      const temArmaduraEquipada = p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura' && !selecionada;
      const gastoSemArm = this.calcularGastoEquip() - (p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura' ? (GAMEDATA.armaduras.find(a=>a.id===p.equipamento.armadura)?.custo||0) : 0);
      const inacessivelArm = !bloqueada && !selecionada && arm.custo > (500 - gastoSemArm);

      const div = document.createElement('div');
      div.className = `equip-item${selecionada ? ' equipado' : ''}${bloqueada ? ' bloqueado' : ''}${inacessivelArm ? ' sem-zeni' : ''}`;
      div.onclick = (bloqueada || inacessivelArm) ? null : () => App.selecionarArmadura(arm.id);
      if (!bloqueada && !inacessivelArm && temArmaduraEquipada) {
        div.onmouseenter = (e) => App.mostrarComparacao(arm.id, 'armadura', e);
        div.onmouseleave = () => App.ocultarComparacao();
      }
      div.innerHTML = `
        <div class="equip-check">${selecionada ? '✓' : ''}</div>
        <div class="equip-nome">${arm.nome}${arm.marcial ? ' <span class="equip-marcial">Marcial</span>' : ''}${inacessivelArm ? ' <span class="equip-sem-zeni">Sem zeni</span>' : ''}</div>
        <div class="equip-stats">DEF: ${arm.defesa} | DefM: ${arm.defMagica} | Inic: ${arm.iniciativa >= 0 ? '+' + arm.iniciativa : arm.iniciativa}</div>
        <div class="equip-custo">${arm.custo === 0 ? 'Grátis' : arm.custo + 'z'}</div>
      `;
      divArmaduras.appendChild(div);
    });
    lista.appendChild(divArmaduras);

    // ESCUDOS
    const divEscudos = document.createElement('div');
    divEscudos.className = 'equip-categoria';
    divEscudos.innerHTML = `<h4>Escudos (opcional)</h4>`;
    GAMEDATA.escudos.forEach(esc => {
      const selecionado = p.equipamento.escudo === esc.id;
      const bloqueado = esc.marcial && !podeMarcial.escudos;
      const temEscudoEquipado = p.equipamento.escudo && !selecionado;
      const gastoSemEsc = this.calcularGastoEquip() - (p.equipamento.escudo ? (GAMEDATA.escudos.find(e=>e.id===p.equipamento.escudo)?.custo||0) : 0);
      const inacessivelEsc = !bloqueado && !selecionado && esc.custo > (500 - gastoSemEsc);

      const div = document.createElement('div');
      div.className = `equip-item${selecionado ? ' equipado' : ''}${bloqueado ? ' bloqueado' : ''}${inacessivelEsc ? ' sem-zeni' : ''}`;
      div.onclick = (bloqueado || inacessivelEsc) ? null : () => App.toggleEscudo(esc.id);
      if (!bloqueado && temEscudoEquipado) {
        div.onmouseenter = (e) => App.mostrarComparacao(esc.id, 'escudo', e);
        div.onmouseleave = () => App.ocultarComparacao();
      }
      div.innerHTML = `
        <div class="equip-check">${selecionado ? '✓' : ''}</div>
        <div class="equip-nome">${esc.nome}${esc.marcial ? ' <span class="equip-marcial">Marcial</span>' : ''}</div>
        <div class="equip-stats">DEF: ${esc.defesa} | DefM: ${esc.defMagica}</div>
        <div class="equip-custo">${esc.custo + 'z'}</div>
      `;
      divEscudos.appendChild(div);
    });
    lista.appendChild(divEscudos);
  },

  renderizarInventarioSelecionado() {
    const div = document.getElementById('inventario-selecionado');
    if (!div) return;
    const p = Estado.personagem;

    // Agrupa armas por id
    const armasAgrup = {};
    p.equipamento.armas.forEach(id => {
      armasAgrup[id] = (armasAgrup[id] || 0) + 1;
    });

    const linhas = [];

    Object.entries(armasAgrup).forEach(([id, qtd]) => {
      const arma = GAMEDATA.armas.find(a => a.id === id);
      if (!arma) return;
      linhas.push(`
        <div class="inventario-item">
          <span style="font-size:0.72rem;color:var(--cor-texto-dim);">Arma</span>
          <span class="inventario-item-nome">${arma.nome}${qtd > 1 ? ` <span class="inv-qtd">×${qtd}</span>` : ''}</span>
          <span class="inventario-item-custo">${arma.custo === 0 ? 'Grátis' : (arma.custo * qtd) + 'z'}</span>
          <button class="inv-remover" onclick="App.removerArmaUm('${id}')" title="Remover uma unidade">−</button>
        </div>
      `);
    });

    if (p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura') {
      const arm = GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura);
      if (arm) linhas.push(`
        <div class="inventario-item">
          <span style="font-size:0.72rem;color:var(--cor-texto-dim);">Armadura</span>
          <span class="inventario-item-nome">${arm.nome}</span>
          <span class="inventario-item-custo">${arm.custo === 0 ? 'Grátis' : arm.custo + 'z'}</span>
          <button class="inv-remover" onclick="App.selecionarArmadura('sem_armadura')" title="Remover">−</button>
        </div>
      `);
    }

    if (p.equipamento.escudo) {
      const esc = GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo);
      if (esc) linhas.push(`
        <div class="inventario-item">
          <span style="font-size:0.72rem;color:var(--cor-texto-dim);">Escudo</span>
          <span class="inventario-item-nome">${esc.nome}</span>
          <span class="inventario-item-custo">${esc.custo + 'z'}</span>
          <button class="inv-remover" onclick="App.toggleEscudo('${esc.id}')" title="Remover">−</button>
        </div>
      `);
    }

    if (linhas.length === 0) {
      div.innerHTML = '<p style="font-size:0.8rem;color:var(--cor-texto-dim);">Nenhum item selecionado</p>';
      return;
    }
    div.innerHTML = linhas.join('');
  },

  podeUsarMarcial() {
    const resultado = { armas_corpo_a_corpo: false, armas_distancia: false, armaduras: false, escudos: false };
    Object.keys(Estado.personagem.classes).forEach(clId => {
      const cl = GAMEDATA.classes.find(c => c.id === clId);
      if (!cl) return;
      cl.marcialEquip.forEach(m => { resultado[m] = true; });
    });
    return resultado;
  },

  calcularGastoEquip() {
    const p = Estado.personagem;
    let total = 0;
    p.equipamento.armas.forEach(id => {
      const a = GAMEDATA.armas.find(arm => arm.id === id);
      if (a) total += a.custo;
    });
    if (p.equipamento.armadura) {
      const arm = GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura);
      if (arm) total += arm.custo;
    }
    if (p.equipamento.escudo) {
      const esc = GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo);
      if (esc) total += esc.custo;
    }
    return total;
  },

  toggleArma(armaId) {
    // Sempre adiciona uma cópia (permite múltiplas do mesmo item)
    const p = Estado.personagem;
    const arma = GAMEDATA.armas.find(a => a.id === armaId);
    if (!arma) return;
    const gasto = this.calcularGastoEquip();
    if (gasto + arma.custo > 500) {
      this.mostrarToast('Zênites insuficientes!', 'erro');
      return;
    }
    p.equipamento.armas.push(armaId);
    this.ocultarComparacao();
    this.renderPassoEquipamento(document.getElementById('wizard-main'));
    this.atualizarStatsVivo();
  },

  removerArmaUm(armaId) {
    const p = Estado.personagem;
    const idx = p.equipamento.armas.lastIndexOf(armaId);
    if (idx >= 0) p.equipamento.armas.splice(idx, 1);
    this.renderPassoEquipamento(document.getElementById('wizard-main'));
    this.atualizarStatsVivo();
  },

  selecionarArmadura(armId) {
    const arm = GAMEDATA.armaduras.find(a => a.id === armId);
    if (!arm) return;
    const p = Estado.personagem;
    const gatoAtual = this.calcularGastoEquip();
    const custAtual = p.equipamento.armadura ? (GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura)?.custo || 0) : 0;

    if ((gatoAtual - custAtual + arm.custo) > 500) {
      this.mostrarToast('Zênites insuficientes!', 'erro');
      return;
    }
    p.equipamento.armadura = armId;
    this.ocultarComparacao();
    this.renderPassoEquipamento(document.getElementById('wizard-main'));
    this.atualizarStatsVivo();
  },

  toggleEscudo(escId) {
    const p = Estado.personagem;
    if (p.equipamento.escudo === escId) {
      p.equipamento.escudo = '';
    } else {
      const esc = GAMEDATA.escudos.find(e => e.id === escId);
      const gasto = this.calcularGastoEquip();
      const custAtual = p.equipamento.escudo ? (GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo)?.custo || 0) : 0;
      if ((gasto - custAtual + esc.custo) > 500) {
        this.mostrarToast('Zênites insuficientes!', 'erro');
        return;
      }
      p.equipamento.escudo = escId;
    }
    this.ocultarComparacao();
    this.renderPassoEquipamento(document.getElementById('wizard-main'));
    this.atualizarStatsVivo();
  },

  setItensLivres(v) {
    Estado.personagem.equipamento.itensLivres = v;
    this.autoSalvar();
  },

  // =============================================
  // PASSO 8 — FINALIZAÇÃO
  // =============================================
  renderPassoFinalizacao(container) {
    const p = Estado.personagem;
    const g = this._genNomeGenero;
    const t = this._genNomeTipo;

    container.innerHTML = `
      <div class="passo-titulo">
        <h2>Nome e Toques Finais</h2>
        <p>Dê um nome ao personagem e descreva sua aparência. É mais fácil escolher um nome depois de entender bem o personagem!</p>
      </div>

      <div class="grid-2">
        <div>
          <div class="campo-grupo">
            <label class="campo-label">Nome do Personagem</label>
            <input type="text" class="campo-input" id="inp-nome"
              placeholder="Nome do herói..."
              value="${p.nome}" oninput="App.setNome(this.value)" maxlength="60" />
          </div>

          <div class="campo-grupo">
            <label class="campo-label">Gerador de Nomes de Fantasia</label>
            <div class="gen-nomes-ctrl">
              <div class="gen-nomes-filtros">
                <div class="gen-grupo">
                  <button class="gen-btn ${g==='m'?'ativo':''}" onclick="App.setGenNomeGenero('m')">Masc.</button>
                  <button class="gen-btn ${g==='f'?'ativo':''}" onclick="App.setGenNomeGenero('f')">Fem.</button>
                  <button class="gen-btn ${g==='q'?'ativo':''}" onclick="App.setGenNomeGenero('q')">Qualquer</button>
                </div>
                <div class="gen-grupo">
                  <button class="gen-btn ${t==='s'?'ativo':''}" onclick="App.setGenNomeTipo('s')">Simples</button>
                  <button class="gen-btn ${t==='c'?'ativo':''}" onclick="App.setGenNomeTipo('c')">Composto</button>
                </div>
              </div>
              <div class="gen-acoes">
                <button class="btn-primario gen-gerar-btn" onclick="App.gerarNome()">Gerar Nome</button>
                <button class="btn-secundario gen-gerar-btn" onclick="App.gerarSobrenome()">Gerar Sobrenome</button>
                <button class="btn-secundario gen-gerar-btn" onclick="App.gerarNomeCompleto()">Nome + Sobrenome</button>
              </div>
            </div>
          </div>

          <div class="campo-grupo">
            <label class="campo-label" style="display:flex;justify-content:space-between;">
              <span>Nomes do Livro</span>
            </label>
            <div class="nomes-sugeridos">
              ${NOMES_WIZARD.slice(0,20).map(n => `<button class="nome-sugerido" onclick="App.usarNomeSugerido('${n}')">${n}</button>`).join('')}
            </div>
          </div>
        </div>
        <div>
          <div class="campo-grupo">
            <label class="campo-label">Imagem do Personagem (opcional)</label>
            <div class="imagem-upload-area" onclick="document.getElementById('inp-imagem').click()">
              ${p.imagem
                ? `<img src="${p.imagem}" class="preview-imagem" alt="Personagem" /><div class="imagem-trocar">Trocar imagem</div>`
                : `<div class="imagem-placeholder"><br><span>Clique para adicionar imagem</span></div>`
              }
            </div>
            <input type="file" id="inp-imagem" accept="image/*" style="display:none"
              onchange="App.carregarImagem(this)" />
            <div style="display:flex;gap:0.4rem;margin-top:0.4rem;flex-wrap:wrap;">
              <button class="btn-secundario" style="flex:1;font-size:0.78rem;"
                onclick="App._toggleImagemURL()">Carregar de URL</button>
              ${p.imagem ? `<button class="btn-secundario" style="flex:1;font-size:0.78rem;"
                onclick="App.removerImagem()">&#x2715; Remover imagem</button>` : ''}
            </div>
            <div id="imagem-url-bloco" style="display:none;margin-top:0.5rem;">
              <input type="text" class="campo-input" id="inp-imagem-url"
                placeholder="https://exemplo.com/imagem.jpg"
                style="margin-bottom:0.4rem;" />
              <div style="display:flex;gap:0.4rem;">
                <button id="btn-confirmar-url" class="btn-primario" style="flex:1;font-size:0.82rem;"
                  onclick="App.carregarImagemURL()">Confirmar</button>
                <button class="btn-secundario" style="flex:1;font-size:0.82rem;"
                  onclick="App._toggleImagemURL()">Cancelar</button>
              </div>
            </div>
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Pronomes</label>
            <div class="pronomes-opcoes">
              ${['ele/dele','ela/dela','elu/delu','sie/deles','(sem pronomes)'].map(pr =>
                `<button class="pronome-btn ${p.pronomes === pr ? 'ativo' : ''}"
                  onclick="App.setPronomes('${pr}')">${pr}</button>`
              ).join('')}
            </div>
            <input type="text" class="campo-input" id="inp-pronomes" style="margin-top:0.5rem;"
              placeholder="Ou escreva seus pronomes..."
              value="${p.pronomes}" oninput="App.setPronomes(this.value)" />
          </div>
        </div>
      </div>

      <div class="campo-grupo">
        <label class="campo-label">Aparência</label>
        <textarea class="campo-input" id="inp-aparencia"
          placeholder="Descreva a aparência física do personagem: cabelo, olhos, estatura, roupas, estilo..."
          rows="3" oninput="App.setAparencia(this.value)">${p.aparencia || ''}</textarea>
      </div>

      <div class="campo-grupo">
        <label class="campo-label">História e Personalidade</label>
        <textarea class="campo-input" id="inp-descricao"
          placeholder="Conte sobre a personalidade, motivações, história passada do personagem..."
          rows="4" oninput="App.setDescricao(this.value)">${p.descricao || ''}</textarea>
      </div>

      ${this._temCompanheiroFiel() ? this._renderCamposCompanheiro() : ''}

      ${this._gerarPerguntasRoleplay()}

      <div class="card resumo-build-card">
        <h4 style="color:var(--cor-dourado);margin-bottom:1rem;">Resumo de Build</h4>
        ${this._gerarResumoBuild()}
      </div>

      <div class="card">
        <h4 style="color:var(--cor-dourado);margin-bottom:0.8rem;">Revisão Completa</h4>
        ${this.gerarResumoTexto()}
      </div>
    `;
  },

  _temCompanheiroFiel() {
    const p = Estado.personagem;
    return Object.values(p.classes).some(d => d.poderes && d.poderes.includes('companheiro_fiel'));
  },

  _renderCamposCompanheiro() {
    const c = Estado.personagem.companheiro;
    return `
      <div class="companheiro-bloco card">
        <h4 style="color:var(--cor-dourado);margin-bottom:0.8rem;">Companheiro Fiel</h4>
        <div class="grid-2">
          <div class="campo-grupo">
            <label class="campo-label">Nome do Companheiro</label>
            <input type="text" class="campo-input" placeholder="Nome do companheiro..."
              value="${c.nome || ''}" oninput="App.setCompanheiroNome(this.value)" maxlength="40" />
          </div>
          <div class="campo-grupo">
            <label class="campo-label">Espécie</label>
            <div class="companheiro-especies">
              ${['construto','elemental','fera','planta'].map(esp =>
                `<button class="gen-btn ${c.especie === esp ? 'ativo' : ''}" onclick="App.setCompanheiroEspecie('${esp}')">${esp}</button>`
              ).join('')}
            </div>
          </div>
        </div>
        <div class="campo-grupo">
          <label class="campo-label">Descrição do Companheiro</label>
          <textarea class="campo-input" rows="2"
            placeholder="Como é o companheiro? Aparência, personalidade, como foi encontrado..."
            oninput="App.setCompanheiroDescricao(this.value)">${c.descricao || ''}</textarea>
        </div>
      </div>
    `;
  },

  setCompanheiroNome(v)     { Estado.personagem.companheiro.nome = v; this.autoSalvar(); },
  setCompanheiroEspecie(v)  {
    Estado.personagem.companheiro.especie = v;
    this.renderPassoFinalizacao(document.getElementById('wizard-main'));
  },
  setCompanheiroDescricao(v){ Estado.personagem.companheiro.descricao = v; this.autoSalvar(); },

  _gerarResumoBuild() {
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const classes = Object.entries(p.classes).filter(([, d]) => d.niveis > 0);
    if (classes.length === 0) return '<p style="color:var(--cor-texto-muted)">Nenhuma classe selecionada.</p>';

    const classesHtml = classes.map(([id, d]) => {
      const cl = GAMEDATA.classes.find(c => c.id === id);
      if (!cl) return '';
      const poderMap = this._agruparPoderes(d.poderes);
      const poderesHtml = Object.entries(poderMap).map(([pid, cnt]) => {
        const po = cl.poderes.find(po => po.id === pid);
        const label = po ? po.nome : pid;
        return `<span class="resumo-poder">${label}${cnt > 1 ? ` <em>(NP ${cnt})</em>` : ''}</span>`;
      }).join('');
      return `
        <div class="resumo-classe">
          <div class="resumo-classe-header">
            <span class="resumo-classe-icone">${ICONES_CLASSES[id] || ''}</span>
            <span class="resumo-classe-nome">${cl.nome}</span>
            <span class="resumo-classe-nivel">Nv ${d.niveis}</span>
          </div>
          <div class="resumo-poderes">${poderesHtml || '<em>Nenhum poder</em>'}</div>
        </div>`;
    }).join('');

    const statsHtml = `
      <div class="resumo-stats">
        <div class="resumo-stat"><span class="rsv rsv-pv">${stats.pv}</span><span class="rsl">PV</span></div>
        <div class="resumo-stat"><span class="rsv rsv-pm">${stats.pm}</span><span class="rsl">PM</span></div>
        <div class="resumo-stat"><span class="rsv rsv-pi">${stats.pi}</span><span class="rsl">PI</span></div>
        <div class="resumo-stat"><span class="rsv">${stats.defesa}</span><span class="rsl">DEF</span></div>
        <div class="resumo-stat"><span class="rsv">${stats.defMagica}</span><span class="rsl">DefM</span></div>
        <div class="resumo-stat"><span class="rsv">${stats.iniciativa >= 0 ? '+' + stats.iniciativa : stats.iniciativa}</span><span class="rsl">Init</span></div>
      </div>`;

    const npTotal = classes.reduce((s, [, d]) => s + d.poderes.length, 0);
    const npUsado = classes.reduce((s, [, d]) => {
      // Repeated powers cost 1 NP each
      return s + d.poderes.length;
    }, 0);
    const origem = p.origem ? (GAMEDATA.origens?.find(o => o.id === p.origem)?.nome || p.origem) : '—';
    const tema = p.tema === '_custom' ? (p.temaCustom || '—') : (GAMEDATA.temas.find(t => t.id === p.tema)?.nome || '—');

    return `
      <div class="resumo-info-linha">
        <span class="resumo-info-item">Nível ${p.nivel}</span>
        <span class="resumo-info-sep">·</span>
        <span class="resumo-info-item">${p.identidade || '—'}</span>
        <span class="resumo-info-sep">·</span>
        <span class="resumo-info-item">Origem: ${origem}</span>
        <span class="resumo-info-sep">·</span>
        <span class="resumo-info-item">Tema: ${tema}</span>
        <span class="resumo-info-sep">·</span>
        <span class="resumo-info-item">${npUsado} NP usados</span>
      </div>
      ${statsHtml}
      <div class="resumo-classes-grid">${classesHtml}</div>
    `;
  },

  setGenNomeGenero(g) {
    this._genNomeGenero = g;
    this.renderPassoFinalizacao(document.getElementById('wizard-main'));
  },

  setGenNomeTipo(t) {
    this._genNomeTipo = t;
    this.renderPassoFinalizacao(document.getElementById('wizard-main'));
  },

  _nomePool() {
    const g = this._genNomeGenero;
    return g === 'm' ? NOMES_MASC : g === 'f' ? NOMES_FEM : [...NOMES_MASC, ...NOMES_FEM];
  },

  gerarNome() {
    const pool = this._nomePool();
    let nome;
    if (this._genNomeTipo === 'c') {
      let n1 = this._rndArr(pool), n2 = this._rndArr(pool);
      while (n2 === n1) n2 = this._rndArr(pool);
      nome = n1 + ' ' + n2;
    } else {
      nome = this._rndArr(pool);
    }
    this.usarNomeSugerido(nome);
  },

  gerarSobrenome() {
    const sobrenome = this._rndArr(NOMES_SOBRENOME);
    const atual = Estado.personagem.nome.trim();
    this.usarNomeSugerido(atual ? atual + ' ' + sobrenome : sobrenome);
  },

  gerarNomeCompleto() {
    const nome = this._rndArr(this._nomePool());
    this.usarNomeSugerido(nome + ' ' + this._rndArr(NOMES_SOBRENOME));
  },

  carregarImagem(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const resized = await this._resizarImagem(e.target.result);
      Estado.personagem.imagem = resized;
      this.renderPassoFinalizacao(document.getElementById('wizard-main'));
    };
    reader.readAsDataURL(file);
  },

  removerImagem() {
    Estado.personagem.imagem = '';
    this.renderPassoFinalizacao(document.getElementById('wizard-main'));
  },

  _resizarImagem(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > 1500) {
          height = Math.round(height * 800 / width);
          width = 800;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  },

  async carregarImagemURL() {
    const input = document.getElementById('inp-imagem-url');
    const url = (input ? input.value : '').trim();
    if (!url) { this.mostrarToast('Digite uma URL.', 'erro'); return; }

    const btn = document.getElementById('btn-confirmar-url');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-btn"></span>Carregando…'; }
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const ct = resp.headers.get('content-type') || '';
      if (!ct.startsWith('image/')) throw new Error('URL não aponta para uma imagem (MIME inválido)');
      const buf = await resp.arrayBuffer();
      const dataUrl = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = e => res(e.target.result);
        fr.onerror = rej;
        fr.readAsDataURL(new Blob([buf], { type: ct }));
      });
      const resized = await this._resizarImagem(dataUrl);
      Estado.personagem.imagem = resized;
      this.renderPassoFinalizacao(document.getElementById('wizard-main'));
      this.mostrarToast('Imagem carregada!', 'sucesso');
    } catch (err) {
      const isCors = err.message === 'Failed to fetch' || err.message.includes('NetworkError') || err.message.includes('CORS');
      this.mostrarToast(
        isCors
          ? 'Erro de rede/CORS. Baixe a imagem e use "Escolher arquivo".'
          : `Erro: ${err.message}`,
        'erro'
      );
      if (btn) { btn.disabled = false; btn.innerHTML = 'Confirmar'; }
    }
  },

  _toggleImagemURL() {
    const bloco = document.getElementById('imagem-url-bloco');
    if (bloco) bloco.style.display = bloco.style.display === 'none' ? 'block' : 'none';
  },

  _gerarPerguntasRoleplay() {
    const p = Estado.personagem;
    const classesSelecionadas = Object.keys(p.classes)
      .filter(id => p.classes[id].niveis > 0)
      .map(id => GAMEDATA.classes.find(c => c.id === id))
      .filter(Boolean);

    if (classesSelecionadas.length === 0) return '';

    const blocos = classesSelecionadas.map(cl => `
      <div class="rp-bloco">
        <div class="rp-classe-nome">${ICONES_CLASSES[cl.id] || ''} ${cl.nome}</div>
        <ul class="rp-perguntas">
          ${cl.perguntas.map(q => `<li>${q}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <details class="rp-prompts">
        <summary class="rp-prompts-titulo">Perguntas de Roleplay — use como inspiração para escrever a história</summary>
        <div class="rp-prompts-corpo">${blocos}</div>
      </details>
    `;
  },

  gerarResumoTexto() {
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const tema = p.tema === '_custom' ? p.temaCustom : (GAMEDATA.temas.find(t => t.id === p.tema)?.nome || '—');

    const classesHTML = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => {
        const cl = GAMEDATA.classes.find(c => c.id === id);
        const poderes = d.poderes.map(pid => cl?.poderes.find(po => po.id === pid)?.nome || pid).join(', ');
        return `<div class="review-linha">
          <span class="review-chave">${cl?.nome || id} (${d.niveis}nv):</span>
          <span class="review-valor" style="font-size:0.78rem;">${poderes || '—'}</span>
        </div>`;
      }).join('') || '<span style="color:var(--cor-texto-dim);">Nenhuma</span>';

    const armasNomes = p.equipamento.armas.map(id => GAMEDATA.armas.find(a => a.id === id)?.nome || id).join(', ') || '—';
    const armNome = p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura'
      ? GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura)?.nome || '—'
      : 'Sem armadura';
    const escNome = p.equipamento.escudo
      ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo)?.nome || '—'
      : '—';

    const lacosAtivos = p.lacos.filter(l => l.alvo.trim());

    return `
      <div class="review-grid">
        <div class="review-secao">
          <div class="review-secao-titulo">Identidade</div>
          <div class="review-linha"><span class="review-chave">ID:</span><span class="review-valor">${p.identidade || '—'}</span></div>
          <div class="review-linha"><span class="review-chave">Tema:</span><span class="review-valor">${tema}</span></div>
          <div class="review-linha"><span class="review-chave">Origem:</span><span class="review-valor">${p.origem || '—'}</span></div>
          <div class="review-linha"><span class="review-chave">Nível:</span><span class="review-valor">${p.nivel}</span></div>
        </div>
        <div class="review-secao">
          <div class="review-secao-titulo">Atributos</div>
          <div class="review-linha"><span class="review-chave" data-tooltip="Destreza — Precisão, coordenação e reflexos">DES:</span><span class="review-valor">${p.atributos.des}</span></div>
          <div class="review-linha"><span class="review-chave" data-tooltip="Vigor — Força física e resistência">VIG:</span><span class="review-valor">${p.atributos.vig}</span></div>
          <div class="review-linha"><span class="review-chave" data-tooltip="Astúcia — Observação e raciocínio">AST:</span><span class="review-valor">${p.atributos.ast}</span></div>
          <div class="review-linha"><span class="review-chave" data-tooltip="Vontade — Determinação e carisma">VON:</span><span class="review-valor">${p.atributos.von}</span></div>
        </div>
        <div class="review-secao">
          <div class="review-secao-titulo">Estatísticas</div>
          <div class="review-stats-row">
            <div class="review-stat-chip" data-tooltip="Pontos de Vida (máx)">PV <span>${stats.pvMax}</span></div>
            <div class="review-stat-chip" data-tooltip="Pontos de Mana (máx)">PM <span>${stats.pmMax}</span></div>
            <div class="review-stat-chip" data-tooltip="Pontos de Inventário">PI <span>${stats.piMax}</span></div>
            <div class="review-stat-chip" data-tooltip="Crise: abaixo desse PV alguns poderes se ativam">Crise <span>${stats.crise}</span></div>
            <div class="review-stat-chip">DEF <span>${stats.defesa}</span></div>
            <div class="review-stat-chip">DefM <span>${stats.defMagica}</span></div>
            <div class="review-stat-chip">Init <span>${stats.iniciativa >= 0 ? '+' : ''}${stats.iniciativa}</span></div>
          </div>
        </div>
        <div class="review-secao">
          <div class="review-secao-titulo">Equipamento</div>
          <div class="review-linha"><span class="review-chave">Armas:</span><span class="review-valor" style="font-size:0.78rem;">${armasNomes}</span></div>
          <div class="review-linha"><span class="review-chave">Armadura:</span><span class="review-valor">${armNome}</span></div>
          <div class="review-linha"><span class="review-chave">Escudo:</span><span class="review-valor">${escNome}</span></div>
          <div class="review-linha"><span class="review-chave">Gasto:</span><span class="review-valor">${this.calcularGastoEquip()}z / 500z</span></div>
        </div>
        <div class="review-secao full-width">
          <div class="review-secao-titulo">Classes &amp; Poderes</div>
          ${classesHTML}
        </div>
        ${lacosAtivos.length > 0 ? `
        <div class="review-secao full-width">
          <div class="review-secao-titulo">Laços (${lacosAtivos.length})</div>
          ${lacosAtivos.map(l => `
            <div class="review-linha">
              <span class="review-chave">${l.alvo}:</span>
              <span class="review-valor" style="font-size:0.78rem;">${l.emocoes.map(eId => GAMEDATA.emocoes.find(e => e.id === eId)?.nome || eId).join(', ') || 'sem emoções'}</span>
            </div>`).join('')}
        </div>
        ` : ''}
      </div>
    `;
  },

  setNome(v) { Estado.personagem.nome = v; },
  setPronomes(v) {
    Estado.personagem.pronomes = v;
    document.querySelectorAll('.pronome-btn').forEach(btn => {
      btn.classList.toggle('ativo', btn.textContent === v);
    });
    const inp = document.getElementById('inp-pronomes');
    if (inp) inp.value = v;
  },
  usarNomeSugerido(nome) {
    Estado.personagem.nome = nome;
    const inp = document.getElementById('inp-nome');
    if (inp) inp.value = nome;
  },
  setAparencia(v) { Estado.personagem.aparencia = v; },
  setDescricao(v) { Estado.personagem.descricao = v; },

  // =============================================
  // FINALIZAR E GERAR FICHA
  // =============================================
  finalizarPersonagem() {
    if (!this.validarPassoAtual()) return;
    this.descartarRascunho();
    this.gerarFicha();
    this.mostrarTela('ficha');
  },

  gerarFicha() {
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const tema = p.tema === '_custom' ? p.temaCustom : (GAMEDATA.temas.find(t => t.id === p.tema)?.nome || '—');
    const gasto = this.calcularGastoEquip();
    const restante = 500 - gasto;

    const div = document.getElementById('ficha-conteudo');

    const classesHTML = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => {
        const cl = GAMEDATA.classes.find(c => c.id === id);
        if (!cl) return '';
        const poderMap = this._agruparPoderes(d.poderes);
        const benefHTML = cl.beneficiosIniciais.map(b => `<span class="tag">${b}</span>`).join('');
        const poderesHTML = Object.entries(poderMap).map(([pid, cnt]) => {
          const pod = cl.poderes.find(po => po.id === pid);
          const nome = pod ? pod.nome : pid;
          return `<span class="ficha-poder-tag" title="${pod?.descricao || ''}">${nome}${cnt > 1 ? ` <em style="font-size:0.7em;opacity:0.75">(NP ${cnt})</em>` : ''}</span>`;
        }).join('');
        return `
          <div class="ficha-classe">
            <div class="ficha-classe-header">
              <span class="ficha-classe-icone">${ICONES_CLASSES[id] || ''}</span>
              <div class="ficha-classe-nome">${cl.nome}</div>
              <span class="ficha-classe-nivel">${d.niveis} nível${d.niveis > 1 ? 'is' : ''}</span>
            </div>
            <div style="margin-bottom:0.5rem;">${benefHTML}</div>
            <div class="ficha-poderes-lista">
              ${poderesHTML || '<em style="color:var(--cor-texto-muted);font-size:0.8em;">Nenhum poder</em>'}
            </div>
          </div>
        `;
      }).join('');

    const armasHTML = p.equipamento.armas.map(id => {
      const arma = GAMEDATA.armas.find(a => a.id === id);
      if (!arma) return '';
      return `
        <div class="ficha-equip-item">
          <div class="ficha-equip-tipo">Arma</div>
          <div class="ficha-equip-nome">${arma.nome}</div>
          <div class="ficha-equip-stats">${arma.precisao} | Dano: ${arma.dano} | ${arma.alcance}</div>
        </div>
      `;
    }).join('');

    const armaduraInfo = GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura);
    const armaduraHTML = armaduraInfo ? `
      <div class="ficha-equip-item">
        <div class="ficha-equip-tipo">Armadura</div>
        <div class="ficha-equip-nome">${armaduraInfo.nome}</div>
        <div class="ficha-equip-stats">DEF: ${armaduraInfo.defesa} | DefM: ${armaduraInfo.defMagica}</div>
      </div>
    ` : '';

    const escudoInfo = p.equipamento.escudo ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo) : null;
    const escudoHTML = escudoInfo ? `
      <div class="ficha-equip-item">
        <div class="ficha-equip-tipo">Escudo</div>
        <div class="ficha-equip-nome">${escudoInfo.nome}</div>
        <div class="ficha-equip-stats">DEF: ${escudoInfo.defesa} | DefM: ${escudoInfo.defMagica}</div>
      </div>
    ` : '';

    const lacosHTML = p.lacos.filter(l => l.alvo.trim()).map(l => {
      const emHTML = l.emocoes.map(eId => {
        const em = GAMEDATA.emocoes.find(e => e.id === eId);
        return em ? `<span class="ficha-emocao-tag">${em.nome}</span>` : '';
      }).join('');
      const forca = l.emocoes.length;
      const dotsHTML = [1,2,3].map(n => `<div class="forca-dot ${n <= forca ? 'ativo' : ''}"></div>`).join('');
      return `
        <div class="ficha-laco">
          <div class="ficha-laco-alvo">${l.alvo}</div>
          ${emHTML ? `<div class="ficha-laco-emocoes">${emHTML}</div>` : '<div style="font-size:0.75rem;color:var(--cor-texto-dim);">Sem emoções ainda</div>'}
          <div class="ficha-laco-forca">${dotsHTML}</div>
        </div>
      `;
    }).join('');

    div.innerHTML = `
      <div class="ficha-cabecalho">
        <div class="ficha-avatar">
          ${p.imagem
            ? `<img src="${p.imagem}" class="ficha-avatar-img" alt="${p.nome}" />`
            : `<span>${ICONES_CLASSES[Object.keys(p.classes)[0]] || ''}</span>`}
        </div>
        <div class="ficha-id">
          <h1>${p.nome || 'Sem Nome'}</h1>
          ${p.pronomes ? `<div class="pronomes">${p.pronomes}</div>` : ''}
          ${p.identidade ? `<div class="identidade">"${p.identidade}"</div>` : ''}
          <div class="tema-origem">
            ${tema !== '—' ? `<span class="ficha-tag">${tema}</span>` : ''}
            ${p.origem ? `<span class="ficha-tag">${p.origem}</span>` : ''}
            <span class="ficha-tag">${p.pontosFabula} Pts. de Fábula</span>
          </div>
        </div>
        <div class="ficha-nivel">
          <div class="ficha-nivel-num">${p.nivel}</div>
          <div class="ficha-nivel-label">Nível</div>
        </div>
      </div>

      <div class="ficha-stats">
        <div class="ficha-stat" style="border-color:rgba(92,184,92,0.4)">
          <div class="ficha-stat-val" style="color:var(--cor-sucesso)">${stats.pvMax}</div>
          <div class="ficha-stat-nome">PV Máx.</div>
        </div>
        <div class="ficha-stat">
          <div class="ficha-stat-val" style="color:var(--cor-aviso)">${stats.crise}</div>
          <div class="ficha-stat-nome">Crise (≤ PV)</div>
        </div>
        <div class="ficha-stat" style="border-color:rgba(91,192,222,0.4)">
          <div class="ficha-stat-val" style="color:var(--cor-info)">${stats.pmMax}</div>
          <div class="ficha-stat-nome">PM Máx.</div>
        </div>
        <div class="ficha-stat">
          <div class="ficha-stat-val" style="color:var(--cor-dourado)">${stats.piMax}</div>
          <div class="ficha-stat-nome">PI Máx.</div>
        </div>
        <div class="ficha-stat">
          <div class="ficha-stat-val" style="color:var(--cor-primaria-clara)">${stats.defesa}</div>
          <div class="ficha-stat-nome">Defesa</div>
        </div>
        <div class="ficha-stat">
          <div class="ficha-stat-val" style="color:var(--cor-primaria-clara)">${stats.defMagica}</div>
          <div class="ficha-stat-nome">Def. Mágica</div>
        </div>
        <div class="ficha-stat">
          <div class="ficha-stat-val" style="color:var(--cor-texto-muted)">${stats.iniciativa >= 0 ? '+' + stats.iniciativa : stats.iniciativa}</div>
          <div class="ficha-stat-nome">Iniciativa</div>
        </div>
      </div>

      <div class="ficha-atributos">
        ${GAMEDATA.atributos.map(at => `
          <div class="ficha-atrib" data-tooltip="${at.descricao}">
            <div class="ficha-atrib-dado">${p.atributos[at.id] || 'd8'}</div>
            <div class="ficha-atrib-nome">${at.nome} (${at.abrev})</div>
          </div>
        `).join('')}
      </div>

      <div class="ficha-secao">
        <div class="ficha-secao-titulo">Classes e Poderes</div>
        ${classesHTML || '<p style="color:var(--cor-texto-muted);font-size:0.85rem;">Nenhuma classe selecionada</p>'}
      </div>

      <div class="ficha-secao">
        <div class="ficha-secao-titulo">Equipamento &nbsp;<span style="font-size:0.75rem;font-weight:normal;color:var(--cor-texto-muted);">${gasto}z gastos de 500z &nbsp;|&nbsp; ${Math.max(0, restante)}z restantes</span></div>
        <div class="ficha-equip-grid">
          ${armasHTML}${armaduraHTML}${escudoHTML}
        </div>
        ${p.equipamento.itensLivres ? `
          <div class="ficha-itens-livres">
            <div class="ficha-itens-livres-titulo">Itens e Anotações</div>
            <div class="ficha-descricao" style="margin-top:0.4rem;">${p.equipamento.itensLivres}</div>
          </div>
        ` : ''}
      </div>

      ${this._temCompanheiroFiel() && (p.companheiro.nome || p.companheiro.descricao) ? `
        <div class="ficha-secao">
          <div class="ficha-secao-titulo">Companheiro Fiel</div>
          <div class="ficha-companheiro">
            <div class="ficha-comp-header">
              <span class="ficha-comp-nome">${p.companheiro.nome || '(sem nome)'}</span>
              <span class="ficha-comp-especie">${p.companheiro.especie}</span>
            </div>
            ${p.companheiro.descricao ? `<div class="ficha-descricao" style="margin-top:0.4rem;">${p.companheiro.descricao}</div>` : ''}
          </div>
        </div>
      ` : ''}

      <div class="ficha-secao">
        <div class="ficha-secao-titulo">Laços</div>
        ${lacosHTML
          ? `<div class="ficha-lacos">${lacosHTML}</div>`
          : `<div class="ficha-secao-vazia">
               <p>Nenhum laço definido.</p>
               <p class="ficha-secao-vazia-dica">Laços dão bônus em testes e Pontos de Fábula quando evocados. Defina-os no passo Estatísticas do Wizard.</p>
               <button class="btn-secundario" onclick="App.voltarWizard();App.irParaPasso(5)">Adicionar Laços no Wizard</button>
             </div>`
        }
      </div>

      ${(p.aparencia || p.descricao || p.origemDesc || p.temaDescricao) ? `
        <div class="ficha-secao">
          <div class="ficha-secao-titulo">Aparência e Personalidade</div>
          ${p.aparencia ? `<div class="ficha-sub-bloco"><p class="ficha-sub-label">Aparência</p><div class="ficha-descricao">${p.aparencia}</div></div>` : ''}
          ${p.descricao ? `<div class="ficha-sub-bloco"><p class="ficha-sub-label">Personalidade e História</p><div class="ficha-descricao">${p.descricao}</div></div>` : ''}
          ${p.origemDesc ? `<div class="ficha-sub-bloco"><p class="ficha-sub-label">Sobre a Origem — ${p.origem || ''}</p><div class="ficha-descricao">${p.origemDesc}</div></div>` : ''}
          ${p.temaDescricao ? `<div class="ficha-sub-bloco"><p class="ficha-sub-label">Tema — ${tema !== '—' ? tema : ''}</p><div class="ficha-descricao">${p.temaDescricao}</div></div>` : ''}
        </div>
      ` : ''}
    `;
  },

  // =============================================
  // SALVAR / CARREGAR / EXPORTAR
  // =============================================
  async salvarPersonagem() {
    if (!window.electronAPI) {
      this.mostrarToast('Função disponível apenas no app desktop.', 'erro');
      return;
    }
    const resultado = await window.electronAPI.salvarPersonagem(Estado.personagem);
    if (resultado.sucesso) {
      this.adicionarRecente(resultado.caminho, Estado.personagem.nome || 'Personagem');
      this.autoSalvar();
      this.mostrarToast('Personagem salvo com sucesso!', 'sucesso');
    }
  },

  async carregarPersonagem() {
    if (!window.electronAPI) {
      this.mostrarToast('Função disponível apenas no app desktop.', 'erro');
      return;
    }
    const resultado = await window.electronAPI.carregarPersonagem();
    if (resultado.sucesso) {
      Estado.personagem = this._normalizarPersonagem(resultado.dados);
      Estado.passoAtual = 0;
      this._filtroPoderes = '';
      if (resultado.caminho) {
        this.adicionarRecente(resultado.caminho, resultado.dados.nome || 'Personagem');
      }
      this.mostrarTela('wizard');
      this.renderizarPasso();
      this.mostrarToast('Personagem carregado — revise e edite!', 'sucesso');
    }
  },

  prepararDadosPDF() {
    const p = Estado.personagem;
    const stats = this.calcularStats();
    const marcial = this.podeUsarMarcial();

    const temaData = GAMEDATA.temas.find(t => t.id === p.tema);
    const temaNome = p.tema === '_custom' ? p.temaCustom : (temaData?.nome || '');

    const armas = p.equipamento.armas.map(id => {
      const a = GAMEDATA.armas.find(x => x.id === id);
      if (!a) return null;
      return {
        nome: a.nome,
        stats: `Precisão: ${a.precisao} | Dano: ${a.dano} (${a.tipo}) | ${a.maos}m | ${a.alcance}`
      };
    }).filter(Boolean);

    const armaduraObj = (p.equipamento.armadura && p.equipamento.armadura !== 'sem_armadura')
      ? GAMEDATA.armaduras.find(a => a.id === p.equipamento.armadura)
      : null;
    const armadura = armaduraObj
      ? { nome: armaduraObj.nome, stats: `DEF: ${armaduraObj.defesa} | Def.Mágica: ${armaduraObj.defMagica} | Iniciativa: ${armaduraObj.iniciativa >= 0 ? '+' + armaduraObj.iniciativa : armaduraObj.iniciativa}` }
      : null;

    const escudoObj = p.equipamento.escudo
      ? GAMEDATA.escudos.find(e => e.id === p.equipamento.escudo)
      : null;
    const escudo = escudoObj
      ? { nome: escudoObj.nome, stats: `DEF: ${escudoObj.defesa} | Def.Mágica: ${escudoObj.defMagica}` }
      : null;

    const classes = Object.entries(p.classes)
      .filter(([, d]) => d.niveis > 0)
      .map(([id, d]) => {
        const cl = GAMEDATA.classes.find(c => c.id === id);
        if (!cl) return null;
        const poderes = d.poderes.map(pid => {
          const pod = cl.poderes.find(po => po.id === pid);
          return pod ? `${pod.nome}: ${pod.descricao}` : pid;
        });
        return { nome: cl.nome, niveis: d.niveis, beneficios: cl.beneficiosIniciais.join(' | '), poderes };
      }).filter(Boolean);

    return { personagem: p, stats, marcial, temaNome, armas, armadura, escudo, classes, gastoEquip: this.calcularGastoEquip() };
  },

  async exportarPDF() {
    if (!window.electronAPI) {
      this.mostrarToast('Função disponível apenas no app desktop.', 'erro');
      return;
    }
    const btn = document.getElementById('btn-exportar-pdf');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-btn"></span>Exportando…'; }
    try {
      const resultado = await window.electronAPI.exportarPDF(this.prepararDadosPDF());
      if (resultado.sucesso) {
        this.mostrarToast('PDF exportado com sucesso!', 'sucesso');
      } else if (resultado.erro) {
        this.mostrarToast('Erro ao exportar: ' + resultado.erro, 'erro');
      }
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = 'PDF'; }
    }
  },

  // =============================================
  // MODAL E TOAST
  // =============================================
  mostrarModal(titulo, texto, onConfirmar) {
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-texto').textContent = texto;
    const btn = document.getElementById('modal-confirmar');
    btn.onclick = () => {
      this.fecharModal();
      onConfirmar();
    };
    document.getElementById('modal-overlay').classList.add('ativo');
  },

  fecharModal() {
    document.getElementById('modal-overlay').classList.remove('ativo');
  },

  _toastTimeout: null,
  mostrarToast(msg, tipo = '') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast visivel ' + tipo;
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('visivel');
    }, 3000);
  }
};

// Inicializar app ao carregar
document.addEventListener('DOMContentLoaded', () => {
  App.mostrarTela('inicio');
});
