// Screenshot driver — Fase 5.5 validation
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR  = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '55');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const electronBin = path.join(APP_DIR, 'node_modules', 'electron', 'dist', 'electron.exe');

async function shot(page, name) {
  const f = path.join(SHOT_DIR, name + '.png');
  await page.screenshot({ path: f });
  console.log('  screenshot:', f);
}

async function ev(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return 'ERROR: ' + e.message; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function goModo(page) {
  await ev(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gerador-pj').classList.add('ativa');
    GeradorPJ.iniciar();
  })()`);
  await sleep(300);
}

async function goNavegacao(page) {
  await ev(page, `GeradorPJ.mostrarNavegacao()`);
  await sleep(400);
}

console.log('Launching Electron…');
const app = await electron.launch({
  executablePath: electronBin,
  args: [APP_DIR],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});
await sleep(4000);

let page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();
console.log('Window:', page.url());

// Verifica globals
const checks = await ev(page, `(function(){
  return {
    ModalPersonagem: typeof ModalPersonagem !== 'undefined' ? 'ok' : 'missing',
    GeradorPJ: typeof GeradorPJ !== 'undefined' ? 'ok' : 'missing',
    Matcher: typeof Matcher !== 'undefined' ? 'ok' : 'missing',
  };
})()`);
console.log('Globals:', JSON.stringify(checks));

// ── T1: Modo view tem 3 cards ──────────────────────────────────────────────
console.log('\n[T1] Modo view — 3 cards (Aleatório, Inspirado, Navegar Banco)');
await goModo(page);
const t1_cards      = await ev(page, `document.querySelectorAll('.gpj-modo-card').length`);
const t1_bancotxt   = await ev(page, `document.querySelector('.gpj-modo-card-banco strong')?.textContent?.trim()`);
console.log('  total cards:', t1_cards, '(esperado 3)');
console.log('  banco card texto:', t1_bancotxt, '(esperado: Navegar Banco)');
await shot(page, '01-modo-3-cards');

// ── T2: Clicar "Navegar Banco" → view navegacao carregada ─────────────────
console.log('\n[T2] Clica Navegar Banco → navegacao view');
await ev(page, `GeradorPJ.mostrarNavegacao()`);
await sleep(400);
const t2_view       = await ev(page, `document.querySelector('.gpj-view-titulo')?.textContent?.trim()`);
const t2_grid       = await ev(page, `document.querySelector('.nav-banco-grid') ? 'existe' : 'ausente'`);
const t2_filtros    = await ev(page, `document.querySelectorAll('.nav-banco-select').length`);
console.log('  view titulo:', t2_view, '(esperado: 📚 Banco de Personagens)');
console.log('  grid:', t2_grid, '| selects:', t2_filtros, '(esperado 4)');
await shot(page, '02-navegacao-view');

// ── T3: Contador de personagens ───────────────────────────────────────────
console.log('\n[T3] Contador — total KB');
const t3_contador   = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.slice(0,40)`);
const t3_kbTotal    = await ev(page, `Matcher.getKbAll().length`);
console.log('  contador:', t3_contador);
console.log('  KB total:', t3_kbTotal, '(esperado ≥ 700)');

// ── T4: Paginação — 30 cards por página ──────────────────────────────────
console.log('\n[T4] Primeira página — 30 cards');
const t4_cards      = await ev(page, `document.querySelectorAll('.nav-card').length`);
const t4_pag        = await ev(page, `document.querySelector('.nav-pag-info')?.textContent?.trim()`);
console.log('  cards na página:', t4_cards, '(esperado 30)');
console.log('  paginação:', t4_pag);
await shot(page, '03-pagina-1-30-cards');

// ── T5: Filtro por nome ───────────────────────────────────────────────────
console.log('\n[T5] Filtro nome "cloud"');
await ev(page, `GeradorPJ.atualizarNavegacao('termoBusca', 'cloud')`);
await sleep(400);
const t5_cards      = await ev(page, `document.querySelectorAll('.nav-card').length`);
const t5_nomes      = await ev(page, `[...document.querySelectorAll('.nav-card-nome')].map(e=>e.textContent.trim()).join(', ')`);
console.log('  cards:', t5_cards, '| nomes:', t5_nomes.slice(0,100));
await shot(page, '04-filtro-cloud');

// ── T6: Limpar filtros ───────────────────────────────────────────────────
console.log('\n[T6] Limpar filtros → volta ao total');
const t6_limpar = await ev(page, `document.querySelector('.nav-banco-limpar-btn') ? 'visivel' : 'ausente'`);
console.log('  botão limpar:', t6_limpar, '(esperado visivel)');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(300);
const t6_cards  = await ev(page, `document.querySelectorAll('.nav-card').length`);
console.log('  cards após limpar:', t6_cards, '(esperado 30)');

// ── T7: Filtro por categoria "video-game" ────────────────────────────────
console.log('\n[T7] Filtro categoria video-game');
await ev(page, `GeradorPJ.atualizarNavegacao('filtroCategoria', 'video-game')`);
await sleep(400);
const t7_contador   = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.split(' ')[0]`);
console.log('  personagens video-game:', t7_contador);
await shot(page, '05-filtro-categoria-videogame');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(200);

// ── T8: Filtro por arquétipo "espadachim-sombrio" ────────────────────────
console.log('\n[T8] Filtro arquétipo espadachim-sombrio');
await ev(page, `GeradorPJ.atualizarNavegacao('filtroArquetipo', 'espadachim-sombrio')`);
await sleep(400);
const t8_cnt    = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.split(' ')[0]`);
const t8_arqs   = await ev(page, `[...new Set([...document.querySelectorAll('.nav-card-arq')].map(e=>e.textContent.trim()))].join(', ')`);
console.log('  count:', t8_cnt, '| arquétipos únicos:', t8_arqs.slice(0,80));
await shot(page, '06-filtro-arquetipo');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(200);

// ── T9: Ordenação por franquia ───────────────────────────────────────────
console.log('\n[T9] Ordenação por franquia');
await ev(page, `GeradorPJ.atualizarNavegacao('ordenacao', 'franquia')`);
await sleep(400);
const t9_franquias  = await ev(page, `[...document.querySelectorAll('.nav-card-franquia')].slice(0,3).map(e=>e.textContent.trim()).join(' | ')`);
console.log('  primeiras franquias:', t9_franquias);
await ev(page, `GeradorPJ.atualizarNavegacao('ordenacao', 'nome')`);
await sleep(200);

// ── T10: Próxima página ──────────────────────────────────────────────────
console.log('\n[T10] Próxima página');
await ev(page, `GeradorPJ.navegarPagina(1)`);
await sleep(300);
const t10_pag   = await ev(page, `document.querySelector('.nav-pag-info')?.textContent?.trim()`);
const t10_prev  = await ev(page, `document.querySelectorAll('.nav-pag-btn')[0]?.disabled`);
console.log('  pag info:', t10_pag, '(esperado: Página 2 de ...)');
console.log('  botão anterior habilitado:', t10_prev === false ? 'sim' : 'não', '(esperado: sim)');
await shot(page, '07-pagina-2');
await ev(page, `GeradorPJ.navegarPagina(-1)`);
await sleep(200);

// ── T11: "Ver detalhes" abre modal-personagem ────────────────────────────
console.log('\n[T11] Clica "Ver detalhes" → modal-personagem');
await goNavegacao(page);
const primeiroId = await ev(page, `document.querySelector('.nav-card-btn') ? 'encontrado' : 'ausente'`);
console.log('  primeiro btn:', primeiroId);
await ev(page, `document.querySelector('.nav-card-btn')?.click()`);
await sleep(500);
const t11_modal     = await ev(page, `document.getElementById('modal-personagem')?.classList.contains('ativo')`);
const t11_nome      = await ev(page, `document.getElementById('mpj-nome')?.textContent?.trim()`);
const t11_arq       = await ev(page, `document.getElementById('mpj-arq')?.textContent?.trim()`);
const t11_franquia  = await ev(page, `document.getElementById('mpj-franquia')?.textContent?.trim()`);
const t11_btn       = await ev(page, `document.querySelector('.modal-personagem-footer .btn-primario')?.textContent?.trim()`);
console.log('  modal ativo:', t11_modal, '(esperado true)');
console.log('  nome:', t11_nome, '| arquétipo:', t11_arq);
console.log('  franquia:', t11_franquia);
console.log('  botão gerar:', t11_btn);
await shot(page, '08-modal-personagem-detalhe');

// ── T12: ESC fecha modal ──────────────────────────────────────────────────
console.log('\n[T12] ESC fecha modal-personagem');
await page.keyboard.press('Escape');
await sleep(200);
const t12_fechado   = await ev(page, `document.getElementById('modal-personagem')?.classList.contains('ativo')`);
console.log('  modal após ESC:', t12_fechado, '(esperado false)');
await shot(page, '09-modal-fechado-esc');

// ── T13: Gerar PJ via modal → resultado com badge 📚 ─────────────────────
console.log('\n[T13] Gerar PJ inspirado via modal');
await ev(page, `document.querySelector('.nav-card-btn')?.click()`);
await sleep(400);
await ev(page, `ModalPersonagem.gerarDeste()`);
await sleep(600);
const t13_view      = await ev(page, `document.querySelector('.gpj-resultado') ? 'resultado' : 'outro'`);
const t13_badge     = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const t13_ref       = await ev(page, `document.querySelector('.gpj-ref-label')?.textContent?.trim()`);
console.log('  view:', t13_view, '| badge:', t13_badge);
console.log('  ref label:', t13_ref, '(esperado: "Inspirado em: ...")');
await shot(page, '10-resultado-gerado-do-banco');

// ── T14: Voltar de resultado → navegacao ─────────────────────────────────
console.log('\n[T14] Voltar de resultado → volta para navegacao');
await ev(page, `GeradorPJ.voltar()`);
await sleep(300);
const t14_view      = await ev(page, `document.querySelector('.nav-banco-grid') ? 'navegacao' : 'outro'`);
console.log('  view após voltar:', t14_view, '(esperado: navegacao)');
await shot(page, '11-volta-para-navegacao');

// ── T15: Botão "Explorar banco" na view inspirado ────────────────────────
console.log('\n[T15] View inspirado — botão "Explorar banco completo"');
await ev(page, `(function(){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-gerador-pj').classList.add('ativa');
  GeradorPJ.iniciar();
  GeradorPJ.setModo('inspirado');
})()`);
await sleep(400);
const t15_btn       = await ev(page, `document.querySelector('.gpj-btn-explorar-banco')?.textContent?.trim()`);
const t15_details   = await ev(page, `document.querySelector('.gpj-lista-toggle') ? 'presente' : 'ausente'`);
console.log('  botão explorar:', t15_btn?.slice(0,60));
console.log('  <details> antigo:', t15_details, '(esperado: ausente)');
await shot(page, '12-inspirado-btn-explorar');

// ── T16: Filtro combinado (franquia + nome) ──────────────────────────────
console.log('\n[T16] Filtro combinado: franquia "Marvel" + nome "spider"');
await goNavegacao(page);
await ev(page, `GeradorPJ.atualizarNavegacao('filtroFranquia', 'Marvel')`);
await sleep(200);
await ev(page, `GeradorPJ.atualizarNavegacao('termoBusca', 'spider')`);
await sleep(400);
const t16_cards     = await ev(page, `document.querySelectorAll('.nav-card').length`);
const t16_nomes     = await ev(page, `[...document.querySelectorAll('.nav-card-nome')].map(e=>e.textContent.trim()).join(', ')`);
console.log('  cards:', t16_cards, '| nomes:', t16_nomes.slice(0,100));
await shot(page, '13-filtro-combinado-marvel-spider');

// ── T17: Filtro zero resultados ───────────────────────────────────────────
console.log('\n[T17] Filtro nome "xyzzy" → zero resultados');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(100);
await ev(page, `GeradorPJ.atualizarNavegacao('termoBusca', 'xyzzy')`);
await sleep(300);
const t17_cards     = await ev(page, `document.querySelectorAll('.nav-card').length`);
const t17_vazio     = await ev(page, `document.querySelector('.nav-banco-vazio')?.textContent?.trim()`);
console.log('  cards:', t17_cards, '(esperado 0) | vazio msg:', t17_vazio);
await shot(page, '14-filtro-sem-resultado');

// ── T18: Viewport estreita 480px — 2 colunas ─────────────────────────────
console.log('\n[T18] Viewport 480px — 2 colunas');
await page.setViewportSize({ width: 480, height: 750 });
await sleep(200);
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(300);
const t18_cols      = await ev(page, `getComputedStyle(document.querySelector('.nav-banco-grid'))?.gridTemplateColumns`);
console.log('  grid-template-columns:', t18_cols, '(esperado: 2 colunas)');
await shot(page, '15-narrow-2-colunas');
await page.setViewportSize({ width: 1184, height: 800 });

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
