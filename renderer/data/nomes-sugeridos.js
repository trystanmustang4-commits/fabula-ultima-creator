// Listas de nomes para sugestão automática no Gerador de PJ
// Organizados por categoria de arquétipo — 30 nomes + 30 sobrenomes cada

const NOMES_SUGERIDOS = {

  // ── Guerreiros: físico, marcial, poderoso ────────────────────────────────
  guerreiro: {
    nomes: [
      'Aldric', 'Brann', 'Torvald', 'Edric', 'Kiran', 'Gareth', 'Valric', 'Ulrik',
      'Rykar', 'Keld', 'Brynar', 'Helgar', 'Vael', 'Karik', 'Solmar', 'Baldric',
      'Dynar', 'Gorn', 'Thyra', 'Senna', 'Bryn', 'Erika', 'Mors', 'Elgur',
      'Dagrin', 'Vorn', 'Aren', 'Mira', 'Bjorn', 'Radrek',
    ],
    sobrenomes: [
      'Pedraforte', 'Cortevento', 'Ferrofundo', 'Brazão', 'Dragomanto', 'Rochaviva',
      'Serravento', 'Brutalmar', 'Espadaluz', 'Lamafria', 'Guardavento', 'Mantoferro',
      'Sombravento', 'Cinzeiro', 'Tempestade', 'Ventonegro', 'Sangrefrio', 'Cruzeiro',
      'Ferreiro', 'Tornavel', 'Armiço', 'Escudeiro', 'Ferriço', 'Pesadum',
      'Carvalhedo', 'Manchacor', 'Torrido', 'Bordão', 'Escurante', 'Ferrucinza',
    ],
  },

  // ── Magos: místico, arcano, etéreo ──────────────────────────────────────
  mago: {
    nomes: [
      'Sylvan', 'Aldrik', 'Morgath', 'Caelum', 'Vespir', 'Eiran', 'Lyriel', 'Aethon',
      'Zoltan', 'Mirael', 'Thalion', 'Celwyn', 'Sariel', 'Iridian', 'Kethara', 'Veloris',
      'Orizan', 'Aldwyn', 'Myrrh', 'Elarian', 'Synara', 'Vashil', 'Elyvane', 'Alcyn',
      'Orynthia', 'Galathen', 'Melior', 'Selathen', 'Thoran', 'Caelwyn',
    ],
    sobrenomes: [
      'Nebulosa', 'Arcaneiro', 'Sombraluz', 'Cristalmar', 'Alquímico', 'Lunário',
      'Astralmar', 'Feitiçal', 'Arcânico', 'Flamário', 'Trovejante', 'Grimórial',
      'Vortexal', 'Profético', 'Estreleiro', 'Umbralmar', 'Etherion', 'Encantador',
      'Oracular', 'Esteliano', 'Estelar', 'Runaval', 'Gélido', 'Ventozal',
      'Névoanar', 'Sortilégio', 'Stellarion', 'Místico', 'Sombrentar', 'Arcântico',
    ],
  },

  // ── Suporte: gentil, luminoso, protetor ─────────────────────────────────
  suporte: {
    nomes: [
      'Aelia', 'Calen', 'Soran', 'Lyra', 'Evar', 'Sielle', 'Danyr', 'Kaela',
      'Thyran', 'Seren', 'Lewin', 'Donar', 'Fyra', 'Kaelen', 'Aiden', 'Cerise',
      'Dylas', 'Elira', 'Aldara', 'Lysa', 'Kendir', 'Fylan', 'Tanric', 'Auren',
      'Celan', 'Meris', 'Soleil', 'Danya', 'Oryn', 'Galien',
    ],
    sobrenomes: [
      'Auroral', 'Serenmar', 'Luminar', 'Cantador', 'Spirital', 'Guardor',
      'Puroflor', 'Luminário', 'Curaluz', 'Celestino', 'Mentoral', 'Harmônico',
      'Solário', 'Solveira', 'Gracedor', 'Amparator', 'Sacerdal', 'Vigilante',
      'Serenário', 'Cintilante', 'Claridade', 'Suavemar', 'Curador', 'Solstício',
      'Brilhante', 'Gentemar', 'Protetor', 'Devocional', 'Caridade', 'Paciência',
    ],
  },

  // ── Ladinos: veloz, sombrio, furtivo ────────────────────────────────────
  ladino: {
    nomes: [
      'Zael', 'Ash', 'Skar', 'Viryn', 'Ebon', 'Nyx', 'Slane', 'Darien',
      'Sylas', 'Cinder', 'Riven', 'Joben', 'Elise', 'Rowan', 'Lark', 'Jade',
      'Rynn', 'Carys', 'Fenwick', 'Tal', 'Briar', 'Wyn', 'Vex', 'Nim',
      'Alys', 'Kira', 'Quinn', 'Ren', 'Voss', 'Shae',
    ],
    sobrenomes: [
      'Sombral', 'Cinzaverde', 'Velthar', 'Gatunar', 'Silêncio', 'Névoa',
      'Espectron', 'Sorrateiro', 'Shadowmar', 'Cinzeiro', 'Oculto', 'Sussurro',
      'Venomante', 'Laminante', 'Furtimar', 'Neblinamar', 'Agilmar', 'Escurante',
      'Velthon', 'Rastejante', 'Cinzamar', 'Sombrentar', 'Encovado', 'Sombrado',
      'Furtivon', 'Escuromar', 'Silentemar', 'Velozmar', 'Neblinon', 'Ladromar',
    ],
  },

  // ── Invocadores: natureza, espíritos, bestial ────────────────────────────
  invocador: {
    nomes: [
      'Caelith', 'Sylvara', 'Zephyr', 'Aranea', 'Elunara', 'Tyrsil', 'Mordecai', 'Valenyr',
      'Corvin', 'Solvane', 'Fendyr', 'Aeryn', 'Oriyn', 'Galithor', 'Selenar', 'Draeven',
      'Isidor', 'Lycanth', 'Mythar', 'Veldria', 'Erindor', 'Coralith', 'Sylmar', 'Zaelan',
      'Varith', 'Therion', 'Spirita', 'Faunar', 'Gestalt', 'Sorvane',
    ],
    sobrenomes: [
      'Silvestre', 'Feralmar', 'Bestiforme', 'Faunador', 'Silvestron', 'Feralvento',
      'Naturalmar', 'Selvagente', 'Florestal', 'Draconário', 'Elemental', 'Gemante',
      'Faunário', 'Espiritual', 'Bestionar', 'Silvamar', 'Bestiário', 'Draconar',
      'Faunamar', 'Gemário', 'Selvagem', 'Fera-Livre', 'Incutante', 'Criaturar',
      'Coralmar', 'Terraviva', 'Raizvemar', 'Selvamon', 'Feração', 'Invocador',
    ],
  },

  // ── Generalistas: aventureiro, equilibrado, versátil ────────────────────
  generalista: {
    nomes: [
      'Aeron', 'Cassia', 'Daven', 'Elric', 'Fynn', 'Gavin', 'Hira', 'Ivan',
      'Jory', 'Kell', 'Lira', 'Mael', 'Nael', 'Oran', 'Petra', 'Quinn',
      'Rael', 'Sera', 'Teren', 'Ulric', 'Vera', 'Wren', 'Yara', 'Zara',
      'Bram', 'Cole', 'Dina', 'Emre', 'Finn', 'Gael',
    ],
    sobrenomes: [
      'Errante', 'Viajante', 'Andarilho', 'Cruzeiro', 'Fronteira', 'Horizonte',
      'Bandeirante', 'Trilhador', 'Aventureiro', 'Descobridor', 'Wandalion', 'Nomadal',
      'Passantem', 'Querentar', 'Rotafar', 'Universmar', 'Cruzador', 'Jornador',
      'Ousadom', 'Arriscar', 'Corredor', 'Desbravador', 'Pioneiro', 'Explorador',
      'Buscador', 'Caminhante', 'Peregrino', 'Nômade', 'Itinerante', 'Arwendale',
    ],
  },
};

// Mapa de arquétipo → categoria
const ARQUETIPO_CATEGORIA = {
  'guerreiro-escudo':    'guerreiro',
  'barbaro-furioso':     'guerreiro',
  'guerreiro-versatil':  'guerreiro',
  'furioso-guerreiro':   'guerreiro',
  'guardiao-combatente': 'guerreiro',
  'forjador':            'guerreiro',
  'dançarino':           'guerreiro',
  'mago-elemental':      'mago',
  'mago-arcano':         'mago',
  'mago-sombrio':        'mago',
  'necromante':          'mago',
  'esper':               'mago',
  'curandeiro':          'suporte',
  'orador-bardo':        'suporte',
  'inventor':            'suporte',
  'paladino-curandeiro': 'suporte',
  'tatico-erudito':      'suporte',
  'floralista':          'suporte',
  'gourmet':             'suporte',
  'espadachim-sombrio':  'ladino',
  'ladino-arqueiro':     'ladino',
  'assassino':           'ladino',
  'explorador-furtivo':  'ladino',
  'atirador-pistoleiro': 'ladino',
  'carteador':           'ladino',
  'apostador':           'ladino',
  'sombra-selvagem':     'ladino',
  'guerreiro-arcano':    'invocador',
  'quimerista':          'invocador',
  'invocador':           'invocador',
  'astrologo':           'invocador',
  'generalista':         'generalista',
  'piloto':              'generalista',
};

if (typeof module !== 'undefined') module.exports = { NOMES_SUGERIDOS, ARQUETIPO_CATEGORIA };
