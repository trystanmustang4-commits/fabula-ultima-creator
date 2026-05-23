// Screenshot driver — Fase 5.4 validation
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '54');
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

async function goInspirado(page) {
  await ev(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gerador-pj').classList.add('ativa');
    GeradorPJ.iniciar();
    GeradorPJ.setModo('inspirado');
  })()`);
  await sleep(400);
}

async function buscar(page, query) {
  await ev(page, `document.getElementById('gpj-busca-input').value = ${JSON.stringify(query)}`);
  await ev(page, `GeradorPJ.buscarInspiracao()`);
  await sleep(500);
}

async function filtrar(page, texto) {
  await ev(page, `(function(){
    const el = document.getElementById('modal-arq-filtro');
    if (!el) return;
    el.value = ${JSON.stringify(texto)};
    el.dispatchEvent(new Event('input'));
  })()`);
  await sleep(300);
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

const modalReady = await ev(page, `typeof ModalArquetipos !== 'undefined' ? 'ok' : 'missing'`);
console.log('ModalArquetipos:', modalReady);

// Verifica fallbacks com totalKB
const fallbackSample = await ev(page, `(function(){
  if (typeof Matcher === 'undefined') return 'Matcher missing';
  Matcher.getKbAll();
  if (typeof Fallbacks === 'undefined') return 'Fallbacks missing';
  const dados = Fallbacks.listarArquetiposParaEscolha();
  const espad = dados.find(a => a.id === 'espadachim-sombrio');
  return espad ? JSON.stringify({ totalKB: espad.totalKB, exemplos: espad.exemplosKB }) : 'not found';
})()`);
console.log('Fallbacks sample (espadachim-sombrio):', fallbackSample);

// ── TESTE 1: Modal abre com todos os 33 arquétipos ────────────────────────
console.log('\n[T1] Modal abre via sem_match → 33 cards');
await goInspirado(page);
await buscar(page, 'Xyzklmnop');
// Agora deve mostrar botão, não inline tags
const t1_inline = await ev(page, `document.querySelectorAll('.gpj-arq-tag').length`);
const t1_btn    = await ev(page, `document.querySelector('.gpj-btn-abrir-arqs')?.textContent?.trim()`);
console.log('  inline arq-tag count:', t1_inline, '(esperado 0)');
console.log('  botão modal:', t1_btn);

// Clica botão para abrir modal
await ev(page, `GeradorPJ.abrirModalArquetipos()`);
await sleep(400);
const t1_modalAberto = await ev(page, `document.getElementById('modal-arquetipos')?.classList.contains('ativo')`);
const t1_cards       = await ev(page, `document.querySelectorAll('.arq-card').length`);
console.log('  modal ativo:', t1_modalAberto, '| cards:', t1_cards, '(esperado 33)');
await shot(page, '01-modal-33-arquetipos');

// ── TESTE 2: Card tem exemplos e +N ──────────────────────────────────────
const t2_exemplos = await ev(page, `document.querySelector('.arq-card .arq-card-exemplos')?.textContent?.trim()?.slice(0,80)`);
const t2_extra    = await ev(page, `document.querySelector('.arq-extra')?.textContent?.trim()`);
console.log('\n[T2] Card exemplos:', t2_exemplos);
console.log('  extra badge (+N):', t2_extra);

// ── TESTE 3: Filtro "guerr" ───────────────────────────────────────────────
console.log('\n[T3] Filtro "guerr" → só guerreiros');
await filtrar(page, 'guerr');
const t3_cards  = await ev(page, `document.querySelectorAll('.arq-card').length`);
const t3_nomes  = await ev(page, `[...document.querySelectorAll('.arq-card-nome')].map(e=>e.textContent.trim()).join(' | ')`);
console.log('  cards filtrados:', t3_cards, '| nomes:', t3_nomes);
await shot(page, '02-filtro-guerr');

// ── TESTE 4: Filtro "xyzzy" → nenhum encontrado ───────────────────────────
console.log('\n[T4] Filtro "xyzzy" → sem resultado');
await filtrar(page, 'xyzzy');
const t4_cards   = await ev(page, `document.querySelectorAll('.arq-card').length`);
const t4_semMsg  = await ev(page, `document.querySelector('.arq-sem-resultado')?.textContent?.trim()?.slice(0,60)`);
console.log('  cards:', t4_cards, '| msg:', t4_semMsg);
await shot(page, '03-filtro-xyzzy-sem-resultado');

// ── TESTE 5: Escolher um arquétipo → resultado com badge escolha_manual ───
console.log('\n[T5] Escolher espadachim-sombrio → resultado badge 👤');
await filtrar(page, '');
await sleep(200);
await ev(page, `ModalArquetipos.escolher('espadachim-sombrio')`);
await sleep(600);
const t5_view   = await ev(page, `document.querySelector('.gpj-resultado') ? 'resultado' : 'outro'`);
const t5_badge  = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const t5_ref    = await ev(page, `document.querySelector('.gpj-ref-label')?.textContent?.trim()`);
const t5_classe = await ev(page, `document.querySelector('.gpj-classe-header strong')?.textContent?.trim()`);
console.log('  view:', t5_view, '| badge:', t5_badge);
console.log('  ref label:', t5_ref, '(esperado: Inspirado em: Espadachim Sombrio)');
console.log('  primeira classe:', t5_classe);
await shot(page, '04-resultado-escolha-manual');

// ── TESTE 6: ESC fecha modal ──────────────────────────────────────────────
console.log('\n[T6] ESC fecha modal');
await goInspirado(page);
await ev(page, `GeradorPJ.abrirModalArquetipos()`);
await sleep(300);
const t6_aberto = await ev(page, `document.getElementById('modal-arquetipos')?.classList.contains('ativo')`);
await page.keyboard.press('Escape');
await sleep(200);
const t6_fechado = await ev(page, `document.getElementById('modal-arquetipos')?.classList.contains('ativo')`);
console.log('  antes ESC:', t6_aberto, '| depois ESC:', t6_fechado, '(esperado false)');
await shot(page, '05-esc-fechado');

// ── TESTE 7: Viewport estreita — 1 coluna ─────────────────────────────────
console.log('\n[T7] Viewport estreita 480px — 1 coluna');
await page.setViewportSize({ width: 480, height: 750 });
await sleep(200);
await goInspirado(page);
await ev(page, `GeradorPJ.abrirModalArquetipos()`);
await sleep(300);
const t7_cols = await ev(page, `getComputedStyle(document.querySelector('.arquetipos-grid'))?.gridTemplateColumns`);
console.log('  grid-template-columns:', t7_cols, '(esperado: 1 col)');
await shot(page, '06-narrow-1-coluna');
await page.setViewportSize({ width: 1184, height: 800 });

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
