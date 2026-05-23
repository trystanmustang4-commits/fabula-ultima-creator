// Modal de desambiguação — Fase 5.3
// Abre quando Matcher retorna 'ambiguo' ou 'fuzzy_ambiguo'
const ModalDesambiguacao = (() => {

  let _onEscolher = null;
  let _escHandler  = null;

  function _getEl(id) { return document.getElementById(id); }

  function _esc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function _formatarScore(score) {
    if (score >= 0.90) return { texto: 'Match quase exato', cls: 'score-exato' };
    if (score >= 0.75) return { texto: 'Bom match',         cls: 'score-bom' };
    return                    { texto: 'Match aproximado',  cls: 'score-aprox' };
  }

  function _buildCard(c, idx, isFuzzy) {
    /* eslint-disable no-undef */
    const arq = (typeof ARQUETIPOS !== 'undefined') ? ARQUETIPOS.find(a => a.id === c.arquetipo) : null;
    /* eslint-enable no-undef */

    const arqHtml = arq
      ? `<span class="desamb-card-arq">${arq.icone} ${_esc(arq.nome)}</span>`
      : '';

    const work = (c.source && (c.source.work || c.source.franchise)) || '';
    const sourceHtml = work
      ? `<span class="desamb-card-source">${_esc(work)}</span>`
      : '';

    const scoreHtml = (isFuzzy && c._score !== undefined)
      ? (() => { const s = _formatarScore(c._score); return `<span class="gpj-score ${s.cls}">${s.texto}</span>`; })()
      : '';

    const desc = (c.descricao || '').slice(0, 110) + ((c.descricao || '').length > 110 ? '…' : '');
    const descHtml = desc
      ? `<p class="desamb-card-desc">"${_esc(desc)}"</p>`
      : '';

    const aliases = (c.aliases || []).filter(a => a && a.length > 2).slice(0, 3);
    const aliasesHtml = aliases.length
      ? `<div class="desamb-card-aliases">${aliases.map(a => `<span class="desamb-alias-tag">${_esc(a)}</span>`).join('')}</div>`
      : '';

    return `
      <button class="desamb-card" onclick="ModalDesambiguacao.escolher(${idx})">
        <div class="desamb-card-header">
          <span class="desamb-card-nome">${_esc(c.nome)}</span>
          ${sourceHtml}
        </div>
        <div class="desamb-card-meta">
          ${arqHtml}
          ${scoreHtml}
        </div>
        ${descHtml}
        ${aliasesHtml}
        <div class="desamb-card-escolher">Escolher este</div>
      </button>`;
  }

  function abrir(opts) {
    const overlay = _getEl('modal-desambiguacao');
    if (!overlay) { console.error('[ModalDesambiguacao] #modal-desambiguacao não encontrado'); return; }

    const { titulo, subtitulo, candidatos, isFuzzy, onEscolher } = opts;
    _onEscolher = onEscolher || null;

    _getEl('modal-desamb-titulo').textContent   = titulo    || 'Qual deles?';
    _getEl('modal-desamb-subtitulo').textContent = subtitulo || '';

    const grid = _getEl('modal-desamb-candidatos');
    grid.innerHTML = candidatos.map((c, i) => _buildCard(c, i, isFuzzy)).join('');

    if (_escHandler) document.removeEventListener('keydown', _escHandler);
    _escHandler = (e) => { if (e.key === 'Escape') cancelar(); };
    document.addEventListener('keydown', _escHandler);

    overlay.classList.add('ativo');
  }

  function fechar() {
    const overlay = _getEl('modal-desambiguacao');
    if (overlay) overlay.classList.remove('ativo');
    if (_escHandler) {
      document.removeEventListener('keydown', _escHandler);
      _escHandler = null;
    }
  }

  function escolher(idx) {
    const cb = _onEscolher;
    fechar();
    if (cb) cb(idx);
  }

  function cancelar() {
    fechar();
  }

  return { abrir, fechar, escolher, cancelar };

})();

if (typeof module !== 'undefined') module.exports = ModalDesambiguacao;
