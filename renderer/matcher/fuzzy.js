// FuzzySearch — Fuse.js wrapper com dois índices: personagens (730) e arquétipos (33)
// Depende de: Fuse (global no browser via script tag, ou global.Fuse setado antes no Node)

const FuzzySearch = (() => {

  const _Fuse = typeof Fuse !== 'undefined' ? Fuse
    : (typeof require !== 'undefined' ? require('fuse.js') : null);

  let _persons = null;
  let _archetyps = null;

  // Migrado de gerador-pj.js — Unicode NFD + remoção de diacríticos + normalização
  function normalizar(str) {
    return (str || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function init(kbAll, arquetipos) {
    if (!_Fuse) { console.error('[FuzzySearch] Fuse.js não encontrado'); return; }

    _persons = new _Fuse(kbAll, {
      keys: [
        { name: 'nome',    weight: 2.0 },
        { name: 'aliases', weight: 1.5 }
        // keyTraits excluído: campo semântico descritivo, não nome de personagem;
        // gera falsos positivos altos (ex: Ciclope contém "tensão com Wolverine")
      ],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 3
    });

    _archetyps = new _Fuse(arquetipos, {
      keys: [
        { name: 'nome', weight: 2.0 },
        { name: 'tags', weight: 1.5 }
      ],
      threshold: 0.5,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }

  function buscarPersonagens(query, limit) {
    return _persons ? _persons.search(query, { limit: limit || 5 }) : [];
  }

  function buscarArquetipos(query, limit) {
    return _archetyps ? _archetyps.search(query, { limit: limit || 3 }) : [];
  }

  return { init, normalizar, buscarPersonagens, buscarArquetipos };

})();

if (typeof module !== 'undefined') module.exports = FuzzySearch;
