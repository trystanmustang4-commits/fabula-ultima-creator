// Fallbacks — estrutura de dados para o modal de seleção manual (UI implementada na Fase 5)

const Fallbacks = (() => {

  let _kbAll = [];
  let _arquetipos = [];

  function init(kbAll, arquetipos) {
    _kbAll = kbAll;
    _arquetipos = arquetipos;
  }

  // Retorna os 33 arquétipos enriquecidos com até 3 exemplos do banco KB + total
  function listarArquetiposParaEscolha() {
    return _arquetipos.map(arq => {
      const todas = _kbAll.filter(e => e.arquetipo === arq.id);
      return {
        id: arq.id,
        displayName: arq.nome,
        icone: arq.icone,
        descricaoCurta: arq.descricao,
        exemplosKB: todas.slice(0, 3).map(e => e.nome),
        totalKB: todas.length,
        tags: arq.tags || []
      };
    });
  }

  return { init, listarArquetiposParaEscolha };

})();

if (typeof module !== 'undefined') module.exports = Fallbacks;
