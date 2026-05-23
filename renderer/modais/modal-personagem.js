// Modal de detalhes de personagem — Fase 5.5
const ModalPersonagem = (() => {

  let _escHandler = null;
  let _onGerar    = null;

  function _esc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function _catLabel(cat) {
    return { 'video-game': 'Jogo', 'anime': 'Anime/Mangá', 'comic': 'Quadrinhos',
             'literature': 'Literatura', 'film': 'Filme', 'tv': 'Série' }[cat] || cat || '—';
  }

  function abrir(entry, onGerar) {
    const overlay = document.getElementById('modal-personagem');
    if (!overlay || !entry) return;

    _onGerar = onGerar || null;

    /* eslint-disable no-undef */
    const arq = typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS.find(a => a.id === entry.arquetipo) : null;
    /* eslint-enable no-undef */
    const arqLabel = arq ? `${_esc(arq.icone)} ${_esc(arq.nome)}` : _esc(entry.arquetipo || '—');

    const atribsHtml = entry.atributos
      ? ['des','vig','ast','von'].map(a =>
          `<div class="mpj-atrib"><span class="mpj-atrib-val">${_esc(entry.atributos[a] || 'd6')}</span><span class="mpj-atrib-key">${a.toUpperCase()}</span></div>`
        ).join('')
      : '<em class="mpj-vazio">—</em>';

    const lacosHtml = (entry.lacos || []).filter(l => l.alvo).map(l =>
      `<div class="mpj-laco"><strong>${_esc(l.alvo)}</strong>${l.emocoes && l.emocoes.length ? ': ' + l.emocoes.map(e => _esc(e)).join(', ') : ''}</div>`
    ).join('') || '<em class="mpj-vazio">Nenhum laço registrado.</em>';

    const traitsHtml = (entry.keyTraits || []).map(t =>
      `<span class="mpj-trait-tag">${_esc(t)}</span>`
    ).join('') || '<em class="mpj-vazio">—</em>';

    document.getElementById('mpj-nome').textContent      = entry.nome || '—';
    document.getElementById('mpj-arq').innerHTML         = arqLabel;
    document.getElementById('mpj-franquia').textContent  = entry.source ? (entry.source.work || entry.source.franchise || '—') : '—';
    document.getElementById('mpj-categoria').textContent = entry.source ? _catLabel(entry.source.category) : '—';
    document.getElementById('mpj-tema').textContent      = entry.tema || '—';
    document.getElementById('mpj-origem').textContent    = entry.origem || '—';
    document.getElementById('mpj-desc').textContent      = entry.descricao || '';
    document.getElementById('mpj-atribs').innerHTML      = atribsHtml;
    document.getElementById('mpj-lacos').innerHTML       = lacosHtml;
    document.getElementById('mpj-traits').innerHTML      = traitsHtml;

    if (_escHandler) document.removeEventListener('keydown', _escHandler);
    _escHandler = (e) => { if (e.key === 'Escape') fechar(); };
    document.addEventListener('keydown', _escHandler);

    overlay.classList.add('ativo');
  }

  function fechar() {
    const overlay = document.getElementById('modal-personagem');
    if (overlay) overlay.classList.remove('ativo');
    if (_escHandler) {
      document.removeEventListener('keydown', _escHandler);
      _escHandler = null;
    }
  }

  function gerarDeste() {
    const cb = _onGerar;
    fechar();
    if (cb) cb();
  }

  return { abrir, fechar, gerarDeste };

})();

if (typeof module !== 'undefined') module.exports = ModalPersonagem;
