// Screenshot driver — Fase 5.3 validation
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '53');
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

const modalReady = await ev(page, `typeof ModalDesambiguacao !== 'undefined' ? 'ok' : 'missing'`);
console.log('ModalDesambiguacao:', modalReady);

// ── TESTE 1: Geralt → modal com 2 cards ──────────────────────────────────
console.log('\n[T1] Geralt → modal com 2 cards');
await goInspirado(page);
await buscar(page, 'Geralt');
const t1_modal  = await ev(page, `document.getElementById('modal-desambiguacao')?.classList.contains('ativo')`);
const t1_cards  = await ev(page, `document.querySelectorAll('.desamb-card').length`);
const t1_nomes  = await ev(page, `[...document.querySelectorAll('.desamb-card-nome')].map(e=>e.textContent.trim()).join(' | ')`);
const t1_arqs   = await ev(page, `[...document.querySelectorAll('.desamb-card-arq')].map(e=>e.textContent.trim()).join(' | ')`);
const t1_titulo = await ev(page, `document.getElementById('modal-desamb-titulo')?.textContent`);
console.log('  modal ativo:', t1_modal, '| cards:', t1_cards, '| título:', t1_titulo);
console.log('  nomes:', t1_nomes);
console.log('  arqs:', t1_arqs);
await shot(page, '01-geralt-modal');

// ── TESTE 2: Joker → modal DC + Persona ──────────────────────────────────
console.log('\n[T2] Joker → modal Coringa + Joker');
await goInspirado(page);
await buscar(page, 'Joker');
const t2_cards  = await ev(page, `document.querySelectorAll('.desamb-card').length`);
const t2_nomes  = await ev(page, `[...document.querySelectorAll('.desamb-card-nome')].map(e=>e.textContent.trim()).join(' | ')`);
const t2_srcs   = await ev(page, `[...document.querySelectorAll('.desamb-card-source')].map(e=>e.textContent.trim()).join(' | ')`);
console.log('  cards:', t2_cards, '| nomes:', t2_nomes);
console.log('  sources:', t2_srcs);
await shot(page, '02-joker-modal');

// ── TESTE 3: V → modal Cyberpunk + DMC ────────────────────────────────────
console.log('\n[T3] V → modal V Cyberpunk + V DMC');
await goInspirado(page);
await buscar(page, 'V');
const t3_cards = await ev(page, `document.querySelectorAll('.desamb-card').length`);
const t3_srcs  = await ev(page, `[...document.querySelectorAll('.desamb-card-source')].map(e=>e.textContent.trim()).join(' | ')`);
console.log('  cards:', t3_cards, '| sources:', t3_srcs);
await shot(page, '03-v-modal');

// ── TESTE 4: Fechar com ESC ───────────────────────────────────────────────
console.log('\n[T4] ESC fecha modal');
await goInspirado(page);
await buscar(page, 'Geralt');
await sleep(300);
const t4_aberto = await ev(page, `document.getElementById('modal-desambiguacao')?.classList.contains('ativo')`);
await page.keyboard.press('Escape');
await sleep(200);
const t4_fechado = await ev(page, `document.getElementById('modal-desambiguacao')?.classList.contains('ativo')`);
console.log('  antes ESC:', t4_aberto, '| depois ESC:', t4_fechado, '(esperado false)');
await shot(page, '04-esc-fechado');

// ── TESTE 5: Cancelar fecha modal ──────────────────────────────────────────
console.log('\n[T5] Botão Cancelar fecha modal');
await goInspirado(page);
await buscar(page, 'Joker');
await sleep(300);
await ev(page, `ModalDesambiguacao.cancelar()`);
await sleep(200);
const t5_fechado = await ev(page, `document.getElementById('modal-desambiguacao')?.classList.contains('ativo')`);
console.log('  após cancelar:', t5_fechado, '(esperado false)');
await shot(page, '05-cancelar-fechado');

// ── TESTE 6: Escolher candidato → resultado com badge certo ───────────────
console.log('\n[T6] Geralt → escolher card[0] → resultado badge exato');
await goInspirado(page);
await buscar(page, 'Geralt');
await sleep(300);
await ev(page, `ModalDesambiguacao.escolher(0)`);
await sleep(600);
const t6_view  = await ev(page, `document.querySelector('.gpj-resultado') ? 'resultado' : 'outro'`);
const t6_badge = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const t6_ref   = await ev(page, `document.querySelector('.gpj-ref-label')?.textContent?.trim()`);
console.log('  view:', t6_view, '| badge:', t6_badge, '| ref:', t6_ref);
await shot(page, '06-geralt-resultado-pos-escolha');

// ── TESTE 7: ← Voltar do resultado restaura view sem reabrir modal ─────────
console.log('\n[T7] ← Voltar não reabre modal automaticamente');
await ev(page, `GeradorPJ.voltar()`);
await sleep(400);
const t7_modal  = await ev(page, `document.getElementById('modal-desambiguacao')?.classList.contains('ativo')`);
const t7_badge  = await ev(page, `document.querySelector('.badge-exato') ? 'exato' : document.querySelector('#gpj-busca-resultado')?.innerHTML?.slice(0,80)`);
console.log('  modal ativo:', t7_modal, '(esperado false)');
console.log('  resultado area:', t7_badge);
await shot(page, '07-voltar-sem-modal');

// ── TESTE 8: Viewport estreita — grid responsivo ───────────────────────────
console.log('\n[T8] Viewport estreita 480px — candidatos em 1 coluna');
await page.setViewportSize({ width: 480, height: 700 });
await sleep(200);
await goInspirado(page);
await buscar(page, 'Joker');
await sleep(300);
const t8_cols = await ev(page, `getComputedStyle(document.querySelector('.candidatos-grid'))?.gridTemplateColumns`);
console.log('  grid-template-columns:', t8_cols);
await shot(page, '08-narrow-responsivo');

// Restaura viewport
await page.setViewportSize({ width: 1184, height: 800 });

// ── TESTE 9: Inline ambiguo removido — container vazio antes da busca ──────
console.log('\n[T9] Busca "Joker", cancela, view não tem cards inline');
await goInspirado(page);
await buscar(page, 'Joker');
await sleep(200);
await ev(page, `ModalDesambiguacao.cancelar()`);
await sleep(200);
const t9_inlineCards = await ev(page, `document.querySelectorAll('.gpj-ambiguo-card').length`);
const t9_resultArea  = await ev(page, `document.querySelector('#gpj-busca-resultado')?.innerHTML?.slice(0,120)`);
console.log('  gpj-ambiguo-card inline:', t9_inlineCards, '(esperado 0)');
console.log('  result area:', t9_resultArea?.replace(/\s+/g,' ').slice(0,100));
await shot(page, '09-sem-inline-ambiguo');

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
