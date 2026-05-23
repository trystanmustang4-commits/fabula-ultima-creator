// Screenshot driver for Fabula Ultima Creator — Fase 5.1 validation
// Run: node tools/screenshot-driver.mjs
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const electronBin = path.join(APP_DIR, 'node_modules', 'electron', 'dist', 'electron.exe');

async function shot(page, name) {
  const f = path.join(SHOT_DIR, name + '.png');
  await page.screenshot({ path: f, fullPage: false });
  console.log('  screenshot:', f);
  return f;
}

async function evalPage(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return 'ERROR: ' + e.message; }
}

async function clickSel(page, sel) {
  return evalPage(page, `(function(){ const el = document.querySelector(${JSON.stringify(sel)}); if(!el) return 'NOT_FOUND'; el.click(); return 'OK'; })()`);
}

async function waitFor(page, sel, timeout=8000) {
  try { await page.waitForSelector(sel, { timeout }); return true; }
  catch { return false; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

console.log('Launching Electron…');
const app = await electron.launch({
  executablePath: electronBin,
  args: [APP_DIR],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});

await sleep(4000);

// Find the main window (not devtools)
let page = app.windows().find(w => !w.url().startsWith('devtools://'));
if (!page) page = await app.firstWindow();
console.log('Window URL:', page.url());

// Wait for app to be ready
await waitFor(page, '.tela-inicio', 6000);
await sleep(500);

// ── Navigate to Gerador PJ screen ──────────────────────────────────────────
console.log('\n[1] Navigating to Gerador PJ…');
// Click the "Gerador de PJ" button on the home screen
const navResult = await evalPage(page, `(function(){
  const btns = [...document.querySelectorAll('button, a, [onclick]')];
  const btn = btns.find(b => b.textContent.includes('Gerador') || b.textContent.includes('PJ'));
  if(btn){ btn.click(); return 'clicked: ' + btn.textContent.trim().slice(0,40); }
  return 'NOT_FOUND — buttons: ' + btns.map(b => b.textContent.trim().slice(0,20)).join(' | ');
})()`);
console.log('  nav result:', navResult);
await sleep(800);

// Try calling GeradorPJ.iniciar() directly if nav failed
const gpjReady = await evalPage(page, `typeof GeradorPJ !== 'undefined' ? 'ready' : 'not_found'`);
console.log('  GeradorPJ:', gpjReady);

if (gpjReady === 'ready') {
  // Make sure the gerador tela is active
  await evalPage(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    const t = document.getElementById('tela-gerador-pj');
    if(t) t.classList.add('ativa');
    GeradorPJ.iniciar();
  })()`);
  await sleep(600);
}

// ── View 1: MODO (initial view) ────────────────────────────────────────────
console.log('\n[VIEW 1] modo — initial cards');
const view1State = await evalPage(page, `document.getElementById('gpj-conteudo')?.innerHTML?.slice(0,200)`);
console.log('  gpj-conteudo preview:', view1State);
await shot(page, '01-view-modo');

// ── View 2: ALEATORIO ──────────────────────────────────────────────────────
console.log('\n[VIEW 2] aleatorio — archetype grid');
await evalPage(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(400);
const arqCount = await evalPage(page, `document.querySelectorAll('.gpj-arq-card').length`);
console.log('  archetype cards:', arqCount);
await shot(page, '02-view-aleatorio');

// ── View 3: INSPIRADO + search ─────────────────────────────────────────────
console.log('\n[VIEW 3] inspirado — search for "Cloud"');
await evalPage(page, `GeradorPJ.setModo('inspirado')`);
await sleep(400);
// Type in search box and trigger search
await evalPage(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if(inp){ inp.value = 'Cloud'; }
})()`);
await evalPage(page, `GeradorPJ.buscarInspiracao()`);
await sleep(500);
const searchResult = await evalPage(page, `document.getElementById('gpj-busca-resultado')?.innerHTML?.slice(0,200)`);
console.log('  search result preview:', searchResult);
await shot(page, '03-view-inspirado');

// ── View 4: RESULTADO (generate aleatorio) ──────────────────────────────────
console.log('\n[VIEW 4] resultado — generate random character');
await evalPage(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(300);
await evalPage(page, `GeradorPJ.gerarAleatorio()`);
await sleep(600);
const view4 = await evalPage(page, `document.getElementById('gpj-conteudo')?.innerHTML?.slice(0,300)`);
console.log('  resultado preview:', view4?.slice(0, 150));

// Check badge
const badge = await evalPage(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
console.log('  badge:', badge);

// Check levelUpLog timeline
const ltLen = await evalPage(page, `document.querySelectorAll('.gpj-ltempo-item').length`);
console.log('  levelUpLog entries:', ltLen);

// Check action buttons
const btns = await evalPage(page, `[...document.querySelectorAll('.gpj-resultado button, .gpj-preview-footer button')].map(b => b.textContent.trim().slice(0,30)).join(' | ')`);
console.log('  action buttons:', btns);

// Get PJ name for the report
const pjNome = await evalPage(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
console.log('  PJ name:', pjNome);

await shot(page, '04-view-resultado');

// ── Flow tests ─────────────────────────────────────────────────────────────
console.log('\n[FLOW TESTS]');

// Test: voltar from resultado → goes back to aleatorio
await evalPage(page, `GeradorPJ.voltar()`);
await sleep(300);
const afterVoltar = await evalPage(page, `document.querySelector('.gpj-view-titulo')?.textContent?.trim() || document.querySelector('.gpj-btn-gerar')?.textContent?.trim()`);
console.log('  [voltar from resultado] view:', afterVoltar);

// Test: voltar from aleatorio → goes to modo
await evalPage(page, `GeradorPJ.voltar()`);
await sleep(300);
const afterVoltar2 = await evalPage(page, `document.querySelector('.gpj-modo-titulo')?.textContent?.trim() || document.querySelector('.gpj-modo-cards') ? 'modo OK' : 'NOT_MODO'`);
console.log('  [voltar from aleatorio] view:', afterVoltar2);

// Test: novoGerador goes to modo
await evalPage(page, `GeradorPJ.gerarAleatorio(); `);
await sleep(300);
await evalPage(page, `GeradorPJ.novoGerador()`);
await sleep(300);
const afterNovo = await evalPage(page, `document.querySelector('.gpj-modo-cards') ? 'modo OK' : 'NOT_MODO'`);
console.log('  [novoGerador] view:', afterNovo);

// Test: historico is populated
const historicoLen = await evalPage(page, `
  (function(){
    // Access private state via generating and checking
    GeradorPJ.gerarAleatorio();
    return 'generated';
  })()`);
await sleep(300);
const pjGeradoCheck = await evalPage(page, `document.querySelector('.gpj-preview-nome') ? 'resultado view active' : 'NOT_resultado'`);
console.log('  [historico/pjGerado check]:', pjGeradoCheck);

// Scroll to show full resultado for final screenshot
await evalPage(page, `GeradorPJ.gerarAleatorio()`);
await sleep(400);
await shot(page, '04b-view-resultado-2');

// Check levelUpLog data structure from the estado
const ltempoHTML = await evalPage(page, `document.querySelector('.gpj-ltempo')?.innerHTML?.slice(0,400)`);
console.log('\n  levelUpLog HTML (first 400 chars):');
console.log(' ', ltempoHTML);

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
