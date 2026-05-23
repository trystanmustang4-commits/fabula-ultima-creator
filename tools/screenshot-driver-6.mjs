// Screenshot driver — Phase 6 final validation (11 criteria)
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR  = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '6');
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

async function goGerador(page) {
  await ev(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gerador-pj').classList.add('ativa');
    GeradorPJ.iniciar();
  })()`);
  await sleep(300);
}

const errors   = [];
const warnings = [];

console.log('Launching Electron…');
const app = await electron.launch({
  executablePath: electronBin, args: [APP_DIR],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined }, timeout: 30_000,
});
await sleep(4000);
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();
page.on('console', msg => {
  if (msg.type() === 'error')   errors.push(msg.text());
  if (msg.type() === 'warning') warnings.push(msg.text());
});
page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));

console.log('\n[C1] Fuse.js carregado sem erros');
const c1_fuse = await ev(page, `typeof Fuse !== 'undefined' ? 'ok' : 'missing'`);
console.log('  Fuse global:', c1_fuse, '(esperado: ok)');
const c1_matcher = await ev(page, `typeof Matcher !== 'undefined' ? 'ok' : 'missing'`);
console.log('  Matcher global:', c1_matcher, '(esperado: ok)');

console.log('\n[C2] KB com 730 entradas e Matcher inicializado');
await goGerador(page);
await sleep(300);
const c2_kb = await ev(page, `(function(){
  const all = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : [];
  return all.length;
})()`);
console.log('  KB entries:', c2_kb, '(esperado: 730)');

console.log('\n[C3] Aliases novas: busca "iennefer" → Yennefer');
await ev(page, `GeradorPJ.setModo('inspirado')`);
await sleep(300);
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) inp.value = 'iennefer';
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const c3_nome = await ev(page, `document.querySelector('.gpj-match-nome')?.textContent?.trim()`);
console.log('  busca "iennefer":', c3_nome, '(esperado: Yennefer de Vengerberg)');
await shot(page, '01-busca-iennefer');

console.log('\n[C4] Aliases novas: busca "homem-aranha miles" → Miles Morales');
await goGerador(page);
await ev(page, `GeradorPJ.setModo('inspirado')`);
await sleep(300);
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) inp.value = 'homem-aranha miles';
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const c4_nome = await ev(page, `document.querySelector('.gpj-match-nome')?.textContent?.trim()`);
console.log('  busca "homem-aranha miles":', c4_nome, '(esperado: Miles Morales)');
await shot(page, '02-busca-spider-man');

console.log('\n[C5] Raiden tem quirk robo_tf');
const c5_raiden = await ev(page, `(function(){
  const all = typeof Matcher !== 'undefined' ? Matcher.getKbAll() : [];
  const r = all.find(e => e.id === 'mgs-raiden');
  return r ? JSON.stringify(r.suggestedQuirks) : 'not-found';
})()`);
console.log('  Raiden quirks:', c5_raiden, '(esperado: inclui robo_tf)');

console.log('\n[C6] Gerar aleatório → resultado view com badge e sugerirNome');
await goGerador(page);
await ev(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(300);
await ev(page, `GeradorPJ.gerarAleatorio()`);
await sleep(500);
const c6_res  = await ev(page, `document.querySelector('.gpj-resultado') ? 'ok' : 'missing'`);
const c6_badge = await ev(page, `document.querySelector('.gpj-badge')?.getAttribute('title')`);
const c6_btn   = await ev(page, `document.querySelector('.gpj-btn-sugerir-nome') ? 'ok' : 'missing'`);
console.log('  resultado:', c6_res, '| badge title:', c6_badge, '| sugerir-btn:', c6_btn);
await shot(page, '03-resultado-aleatorio');

console.log('\n[C7] sugerirNome muda o nome');
const nomeBefore = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
await ev(page, `GeradorPJ.sugerirNome()`);
const nomeAfter = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
console.log('  antes:', nomeBefore, '| depois:', nomeAfter, '| mudou:', nomeBefore !== nomeAfter);
await shot(page, '04-sugerir-nome');

console.log('\n[C8] sugerirNome 10x sem crash, sempre "PrimeiroNome Sobrenome"');
let c8_ok = true;
for (let i = 0; i < 10; i++) {
  await ev(page, `GeradorPJ.sugerirNome()`);
  const n = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
  if (!n || !n.includes(' ')) { c8_ok = false; console.log('  FAIL: nome sem espaço:', n); }
}
console.log('  10x sugerirNome:', c8_ok ? 'ok' : 'falhou');

console.log('\n[C9] Navegação — filtros por categoria "anime-manga"');
await goGerador(page);
await ev(page, `GeradorPJ.mostrarNavegacao()`);
await sleep(400);
await ev(page, `GeradorPJ.atualizarNavegacao('filtroCategoria', 'anime-manga')`);
await sleep(500);
const c9_counter = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.slice(0,40)`);
console.log('  contador anime-manga:', c9_counter, '(esperado: > 0)');
const c9_count = parseInt((c9_counter || '0').match(/\d+/)?.[0] || '0');
console.log('  count:', c9_count, '(esperado: > 0)');
await shot(page, '05-nav-anime-manga');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(200);

console.log('\n[C10] Fuse.js fuzzy — busca "noctis" → Noctis Lucis Caelum');
await goGerador(page);
await ev(page, `GeradorPJ.setModo('inspirado')`);
await sleep(300);
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) inp.value = 'noctis';
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const c10_nome = await ev(page, `document.querySelector('.gpj-match-nome')?.textContent?.trim()`);
console.log('  busca "noctis":', c10_nome, '(esperado: Noctis Lucis Caelum)');
await shot(page, '06-busca-noctis');

console.log('\n[C11] Zero erros de console durante todo o teste');
console.log('  Erros:', errors.length);
errors.forEach(e => console.log('  ERROR:', e.slice(0, 100)));
console.log('  Warnings:', warnings.length);

const pass = [
  c1_fuse === 'ok',
  c1_matcher === 'ok',
  c2_kb === 730,
  c3_nome && c3_nome.includes('Yennefer'),
  c4_nome && c4_nome.toLowerCase().includes('miles'),
  c5_raiden && c5_raiden.includes('robo_tf'),
  c6_res === 'ok',
  c6_btn === 'ok',
  nomeBefore !== nomeAfter,
  c8_ok,
  c9_count > 0,
  errors.length === 0,
];
const labels = ['C1a Fuse global','C1b Matcher global','C2 KB 730','C3 iennefer→Yennefer','C4 spider-man→Miles','C5 Raiden robo_tf','C6a resultado view','C6b sugerir-btn','C7 nome mudou','C8 10x sem crash','C9 anime-manga > 0','C11 zero erros'];
console.log('\n══ RESULTADO FINAL ══');
let allPass = true;
pass.forEach((p, i) => {
  console.log(`  ${p ? '✅' : '❌'} ${labels[i]}`);
  if (!p) allPass = false;
});
console.log(`\n${allPass ? '✅ ALL PASS' : '❌ SOME FAILED'} — ${pass.filter(Boolean).length}/${pass.length}`);

await app.close();
process.exit(allPass ? 0 : 1);
