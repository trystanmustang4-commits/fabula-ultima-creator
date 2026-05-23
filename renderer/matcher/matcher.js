// Matcher — cascata de 4 níveis: exato → fuzzy_personagem → fuzzy_arquetipo → sem_match
// Depende de: FuzzySearch (fuzzy.js), Fallbacks (fallbacks.js), todos os arrays KB globais, ARQUETIPOS
// Inicialização lazy: índices Fuse são construídos na primeira chamada a buscarInspiracao()

const Matcher = (() => {

  let _kbAll  = null;   // null = não inicializado
  let _fuzzy  = null;
  let _falls  = null;

  function _safe(v) { return Array.isArray(v) ? v : []; }

  function _buildKbAll() {
    /* eslint-disable no-undef */
    return [
      // Curados
      ..._safe(typeof CHARACTER_KB !== 'undefined' ? CHARACTER_KB : undefined),
      ..._safe(typeof LOL_CHAMPIONS !== 'undefined' ? LOL_CHAMPIONS : undefined),
      // Final Fantasy
      ..._safe(typeof FF1_CHARACTERS  !== 'undefined' ? FF1_CHARACTERS  : undefined),
      ..._safe(typeof FF2_CHARACTERS  !== 'undefined' ? FF2_CHARACTERS  : undefined),
      ..._safe(typeof FF3_CHARACTERS  !== 'undefined' ? FF3_CHARACTERS  : undefined),
      ..._safe(typeof FF4_CHARACTERS  !== 'undefined' ? FF4_CHARACTERS  : undefined),
      ..._safe(typeof FF5_CHARACTERS  !== 'undefined' ? FF5_CHARACTERS  : undefined),
      ..._safe(typeof FF6_CHARACTERS  !== 'undefined' ? FF6_CHARACTERS  : undefined),
      ..._safe(typeof FF7_CHARACTERS  !== 'undefined' ? FF7_CHARACTERS  : undefined),
      ..._safe(typeof FF8_CHARACTERS  !== 'undefined' ? FF8_CHARACTERS  : undefined),
      ..._safe(typeof FF9_CHARACTERS  !== 'undefined' ? FF9_CHARACTERS  : undefined),
      ..._safe(typeof FF10_CHARACTERS   !== 'undefined' ? FF10_CHARACTERS   : undefined),
      ..._safe(typeof FF10_2_CHARACTERS !== 'undefined' ? FF10_2_CHARACTERS : undefined),
      ..._safe(typeof FF11_CHARACTERS !== 'undefined' ? FF11_CHARACTERS : undefined),
      ..._safe(typeof FF12_CHARACTERS !== 'undefined' ? FF12_CHARACTERS : undefined),
      ..._safe(typeof FF13_CHARACTERS !== 'undefined' ? FF13_CHARACTERS : undefined),
      ..._safe(typeof FF14_CHARACTERS !== 'undefined' ? FF14_CHARACTERS : undefined),
      ..._safe(typeof FF15_CHARACTERS !== 'undefined' ? FF15_CHARACTERS : undefined),
      ..._safe(typeof FF16_CHARACTERS !== 'undefined' ? FF16_CHARACTERS : undefined),
      ..._safe(typeof FFT_CHARACTERS        !== 'undefined' ? FFT_CHARACTERS        : undefined),
      ..._safe(typeof CRISIS_CORE_CHARACTERS !== 'undefined' ? CRISIS_CORE_CHARACTERS : undefined),
      // Super-heróis
      ..._safe(typeof MARVEL_CHARACTERS !== 'undefined' ? MARVEL_CHARACTERS : undefined),
      ..._safe(typeof DC_CHARACTERS     !== 'undefined' ? DC_CHARACTERS     : undefined),
      ..._safe(typeof INDIE_CHARACTERS  !== 'undefined' ? INDIE_CHARACTERS  : undefined),
      // Tales of
      ..._safe(typeof TALES_SYMPHONIA_CHARACTERS !== 'undefined' ? TALES_SYMPHONIA_CHARACTERS : undefined),
      ..._safe(typeof TALES_PHANTASIA_CHARACTERS !== 'undefined' ? TALES_PHANTASIA_CHARACTERS : undefined),
      ..._safe(typeof TALES_DESTINY_CHARACTERS   !== 'undefined' ? TALES_DESTINY_CHARACTERS   : undefined),
      ..._safe(typeof TALES_ETERNIA_CHARACTERS   !== 'undefined' ? TALES_ETERNIA_CHARACTERS   : undefined),
      ..._safe(typeof TALES_REBIRTH_CHARACTERS   !== 'undefined' ? TALES_REBIRTH_CHARACTERS   : undefined),
      ..._safe(typeof TALES_LEGENDIA_CHARACTERS  !== 'undefined' ? TALES_LEGENDIA_CHARACTERS  : undefined),
      ..._safe(typeof TALES_ABYSS_CHARACTERS     !== 'undefined' ? TALES_ABYSS_CHARACTERS     : undefined),
      ..._safe(typeof TALES_INNOCENCE_CHARACTERS !== 'undefined' ? TALES_INNOCENCE_CHARACTERS : undefined),
      ..._safe(typeof TALES_HEARTS_CHARACTERS    !== 'undefined' ? TALES_HEARTS_CHARACTERS    : undefined),
      ..._safe(typeof TALES_VESPERIA_CHARACTERS  !== 'undefined' ? TALES_VESPERIA_CHARACTERS  : undefined),
      ..._safe(typeof TALES_GRACES_CHARACTERS    !== 'undefined' ? TALES_GRACES_CHARACTERS    : undefined),
      ..._safe(typeof TALES_XILLIA_CHARACTERS    !== 'undefined' ? TALES_XILLIA_CHARACTERS    : undefined),
      ..._safe(typeof TALES_ZESTIRIA_CHARACTERS  !== 'undefined' ? TALES_ZESTIRIA_CHARACTERS  : undefined),
      ..._safe(typeof TALES_BERSERIA_CHARACTERS  !== 'undefined' ? TALES_BERSERIA_CHARACTERS  : undefined),
      ..._safe(typeof TALES_ARISE_CHARACTERS     !== 'undefined' ? TALES_ARISE_CHARACTERS     : undefined),
      // Games gerais
      ..._safe(typeof ZELDA_CHARACTERS           !== 'undefined' ? ZELDA_CHARACTERS           : undefined),
      ..._safe(typeof MARIO_CHARACTERS           !== 'undefined' ? MARIO_CHARACTERS           : undefined),
      ..._safe(typeof SONIC_CHARACTERS           !== 'undefined' ? SONIC_CHARACTERS           : undefined),
      ..._safe(typeof HALO_CHARACTERS            !== 'undefined' ? HALO_CHARACTERS            : undefined),
      ..._safe(typeof METROID_CHARACTERS         !== 'undefined' ? METROID_CHARACTERS         : undefined),
      ..._safe(typeof MGS_CHARACTERS             !== 'undefined' ? MGS_CHARACTERS             : undefined),
      ..._safe(typeof RESIDENT_EVIL_CHARACTERS   !== 'undefined' ? RESIDENT_EVIL_CHARACTERS   : undefined),
      ..._safe(typeof SOULS_CHARACTERS           !== 'undefined' ? SOULS_CHARACTERS           : undefined),
      ..._safe(typeof WITCHER_EXTRAS_CHARACTERS  !== 'undefined' ? WITCHER_EXTRAS_CHARACTERS  : undefined),
      ..._safe(typeof CYBERPUNK_CHARACTERS       !== 'undefined' ? CYBERPUNK_CHARACTERS       : undefined),
      ..._safe(typeof MASS_EFFECT_CHARACTERS     !== 'undefined' ? MASS_EFFECT_CHARACTERS     : undefined),
      ..._safe(typeof KINGDOM_HEARTS_CHARACTERS  !== 'undefined' ? KINGDOM_HEARTS_CHARACTERS  : undefined),
      ..._safe(typeof NIER_CHARACTERS            !== 'undefined' ? NIER_CHARACTERS            : undefined),
      ..._safe(typeof PERSONA_CHARACTERS         !== 'undefined' ? PERSONA_CHARACTERS         : undefined),
      ..._safe(typeof DMC_EXTRAS_CHARACTERS      !== 'undefined' ? DMC_EXTRAS_CHARACTERS      : undefined),
      ..._safe(typeof BAYONETTA_EXTRAS_CHARACTERS !== 'undefined' ? BAYONETTA_EXTRAS_CHARACTERS : undefined),
      ..._safe(typeof YAKUZA_CHARACTERS          !== 'undefined' ? YAKUZA_CHARACTERS          : undefined),
      ..._safe(typeof XENOBLADE_CHARACTERS       !== 'undefined' ? XENOBLADE_CHARACTERS       : undefined),
      ..._safe(typeof FIRE_EMBLEM_CHARACTERS     !== 'undefined' ? FIRE_EMBLEM_CHARACTERS     : undefined),
      ..._safe(typeof DRAGON_QUEST_CHARACTERS    !== 'undefined' ? DRAGON_QUEST_CHARACTERS    : undefined),
      ..._safe(typeof CHRONO_TRIGGER_CHARACTERS  !== 'undefined' ? CHRONO_TRIGGER_CHARACTERS  : undefined),
      ..._safe(typeof MEGA_MAN_CHARACTERS        !== 'undefined' ? MEGA_MAN_CHARACTERS        : undefined),
      ..._safe(typeof CASTLEVANIA_CHARACTERS     !== 'undefined' ? CASTLEVANIA_CHARACTERS     : undefined),
      ..._safe(typeof MONSTER_HUNTER_CHARACTERS  !== 'undefined' ? MONSTER_HUNTER_CHARACTERS  : undefined),
      ..._safe(typeof POKEMON_CHARACTERS         !== 'undefined' ? POKEMON_CHARACTERS         : undefined),
      ..._safe(typeof STREET_FIGHTER_CHARACTERS  !== 'undefined' ? STREET_FIGHTER_CHARACTERS  : undefined),
      ..._safe(typeof TEKKEN_CHARACTERS          !== 'undefined' ? TEKKEN_CHARACTERS          : undefined),
      ..._safe(typeof MORTAL_KOMBAT_CHARACTERS   !== 'undefined' ? MORTAL_KOMBAT_CHARACTERS   : undefined),
      ..._safe(typeof UNCHARTED_CHARACTERS       !== 'undefined' ? UNCHARTED_CHARACTERS       : undefined),
      ..._safe(typeof EXTRAS_TLOU_CHARACTERS     !== 'undefined' ? EXTRAS_TLOU_CHARACTERS     : undefined),
      ..._safe(typeof EXTRAS_GOW_CHARACTERS      !== 'undefined' ? EXTRAS_GOW_CHARACTERS      : undefined),
      ..._safe(typeof HOLLOW_KNIGHT_CHARACTERS   !== 'undefined' ? HOLLOW_KNIGHT_CHARACTERS   : undefined),
      ..._safe(typeof HADES_CHARACTERS           !== 'undefined' ? HADES_CHARACTERS           : undefined),
      ..._safe(typeof BALDURS_GATE_CHARACTERS    !== 'undefined' ? BALDURS_GATE_CHARACTERS    : undefined),
      ..._safe(typeof UNDERTALE_CHARACTERS       !== 'undefined' ? UNDERTALE_CHARACTERS       : undefined),
      ..._safe(typeof DISCO_ELYSIUM_CHARACTERS   !== 'undefined' ? DISCO_ELYSIUM_CHARACTERS   : undefined),
      ..._safe(typeof DOOM_HALFLIFE_CHARACTERS   !== 'undefined' ? DOOM_HALFLIFE_CHARACTERS   : undefined),
      ..._safe(typeof PLATFORMERS_CHARACTERS     !== 'undefined' ? PLATFORMERS_CHARACTERS     : undefined),
    ];
    /* eslint-enable no-undef */
  }

  function _init() {
    if (_kbAll !== null) return;
    _fuzzy  = typeof FuzzySearch !== 'undefined' ? FuzzySearch : null; // eslint-disable-line no-undef
    _falls  = typeof Fallbacks   !== 'undefined' ? Fallbacks   : null; // eslint-disable-line no-undef
    const arquetipos = typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS : []; // eslint-disable-line no-undef
    _kbAll = _buildKbAll();
    if (_fuzzy) _fuzzy.init(_kbAll, arquetipos);
    if (_falls) _falls.init(_kbAll, arquetipos);
  }

  // Nível 1 — compara query normalizada contra nome + aliases normalizados de cada entrada
  function _matchExato(queryNorm) {
    const resultados = [];
    for (const entry of _kbAll) {
      const candidatos = [entry.nome, ...(entry.aliases || [])];
      for (const c of candidatos) {
        if (_fuzzy.normalizar(c) === queryNorm) {
          resultados.push(entry);
          break;
        }
      }
    }
    return resultados;
  }

  // Retorna { tipo, resultado?, score?, candidatos?, motivo?, mensagem? }
  function buscarInspiracao(input) {
    if (_kbAll === null) _init();

    const raw = (input || '').trim();
    if (!raw) return { tipo: 'erro_input', mensagem: 'Digite um nome de personagem' };

    const norm = _fuzzy ? _fuzzy.normalizar(raw) : raw.toLowerCase().trim();

    // Nível 1 — match exato normalizado (roda antes do length check: "2B", "V" etc.)
    const exatos = _matchExato(norm);
    if (exatos.length === 1) return { tipo: 'exato', resultado: exatos[0], score: 1.0 };
    if (exatos.length > 1)   return { tipo: 'ambiguo', candidatos: exatos };

    // Inputs curtos não vão para fuzzy (evita falsos positivos)
    if (norm.length < 3) return { tipo: 'sem_match', candidatos: [], motivo: 'input_curto' };

    if (!_fuzzy) return { tipo: 'sem_match', candidatos: [] };

    // Nível 2 — Fuse.js fuzzy em personagens
    const fuzzyPers = _fuzzy.buscarPersonagens(raw, 5);
    if (fuzzyPers.length > 0) {
      const top     = fuzzyPers[0];
      const segundo = fuzzyPers[1];
      // score Fuse: 0 = perfeito, 1 = sem relação.
      // Retorna direto se top é quase-perfeito (≤0.08 = typo de 1-2 chars) ou gap > 0.15 vs segundo.
      const gap = segundo ? segundo.score - top.score : 1;
      if (top.score <= 0.08 || gap > 0.15) {
        return { tipo: 'fuzzy_personagem', resultado: top.item, score: +(1 - top.score).toFixed(3) };
      }
      return {
        tipo: 'fuzzy_ambiguo',
        candidatos: fuzzyPers.slice(0, 3).map(r => ({ ...r.item, _score: +(1 - r.score).toFixed(3) }))
      };
    }

    // Nível 3 — Fuse.js fuzzy em arquétipos
    const fuzzyArqs = _fuzzy.buscarArquetipos(raw, 3);
    if (fuzzyArqs.length > 0) {
      return {
        tipo: 'fuzzy_arquetipo',
        candidatos: fuzzyArqs.slice(0, 3).map(r => ({ ...r.item, _score: +(1 - r.score).toFixed(3) }))
      };
    }

    // Nível 4 — sem match
    return { tipo: 'sem_match', candidatos: [] };
  }

  function getKbAll() {
    if (_kbAll === null) _init();
    return _kbAll;
  }

  return { buscarInspiracao, getKbAll };

})();

if (typeof module !== 'undefined') module.exports = Matcher;
