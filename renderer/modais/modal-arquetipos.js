// Modal de arquetipos — Fase 5.4
// Abre quando usuário quer escolher arquétipo manualmente (sem_match / erro_input)
const ModalArquetipos = (() => {

  let _onEscolher  = null;
  let _escHandler  = null;
  let _dadosCache  = null;

  function _esc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function _norm(str) {
    return (str || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function _getEl(id) { return document.getElementById(id); }

  function _getDados() {
    if (_dadosCache) return _dadosCache;
    /* eslint-disable no-undef */
    if (typeof Matcher !== 'undefined') Matcher.getKbAll(); // força init de Fallbacks
    if (typeof Fallbacks !== 'undefined') _dadosCache = Fallbacks.listarArquetiposParaEscolha();
    /* eslint-enable no-undef */
    return _dadosCache || [];
  }

  function _buildCard(arq) {
    const exemplos = (arq.exemplosKB || []).join(', ');
    const extra    = arq.totalKB > 3 ? `<span class="arq-extra">+${arq.totalKB - 3}</span>` : '';
    const tags     = (arq.tags || []).slice(0, 4).join(' · ');

    const exemploHtml = exemplos
      ? `<div class="arq-card-exemplos"><span class="arq-label-mini">Inclui:</span> ${_esc(exemplos)}${extra}</div>`
      : '';
    const tagsHtml = tags
      ? `<div class="arq-card-tags">${_esc(tags)}</div>`
      : '';

    return `
      <button class="arq-card" onclick="ModalArquetipos.escolher('${_esc(arq.id)}')">
        <div class="arq-card-topo">
          <span class="arq-card-icone">${arq.icone || '⚔'}</span>
          <span class="arq-card-nome">${_esc(arq.displayName)}</span>
        </div>
        <p class="arq-card-desc">${_esc(arq.descricaoCurta || '')}</p>
        ${exemploHtml}
        ${tagsHtml}
        <div class="arq-card-escolher">Escolher</div>
      </button>`;
  }

  function _filtrar(query) {
    const dados = _getDados();
    const norm  = _norm(query);
    if (!norm) return dados;
    return dados.filter(arq =>
      _norm(arq.displayName).includes(norm) ||
      _norm(arq.descricaoCurta).includes(norm) ||
      (arq.tags || []).some(t => _norm(t).includes(norm))
    );
  }

  function _renderGrid(query) {
    const grid = _getEl('modal-arq-grid');
    if (!grid) return;
    const filtrados = _filtrar(query || '');
    if (!filtrados.length) {
      grid.innerHTML = `
        <div class="arq-sem-resultado">
          <p>Nenhum arquétipo encontrado para "${_esc(query)}".</p>
          <p class="arq-sem-dica">Limpe o filtro para ver todos os 33.</p>
        </div>`;
      return;
    }
    grid.innerHTML = filtrados.map(arq => _buildCard(arq)).join('');
  }

  function abrir(opts) {
    const overlay = _getEl('modal-arquetipos');
    if (!overlay) { console.error('[ModalArquetipos] #modal-arquetipos não encontrado'); return; }

    _onEscolher = (opts && opts.onEscolher) || null;

    const filtro = _getEl('modal-arq-filtro');
    if (filtro) {
      filtro.value   = '';
      filtro.oninput = () => _renderGrid(filtro.value);
    }
    _renderGrid('');

    if (_escHandler) document.removeEventListener('keydown', _escHandler);
    _escHandler = (e) => { if (e.key === 'Escape') fechar(); };
    document.addEventListener('keydown', _escHandler);

    overlay.classList.add('ativo');
    setTimeout(() => { if (filtro) filtro.focus(); }, 80);
  }

  function fechar() {
    const overlay = _getEl('modal-arquetipos');
    if (overlay) overlay.classList.remove('ativo');
    if (_escHandler) {
      document.removeEventListener('keydown', _escHandler);
      _escHandler = null;
    }
  }

  function escolher(arquetipoId) {
    const cb = _onEscolher;
    fechar();
    if (cb) cb(arquetipoId);
  }

  return { abrir, fechar, escolher };

})();

if (typeof module !== 'undefined') module.exports = ModalArquetipos;
