// Console audit driver — Phase 6 bug detection
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';

const APP_DIR    = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const electronBin = path.join(APP_DIR, 'node_modules', 'electron', 'dist', 'electron.exe');

const errors   = [];
const warnings = [];

async function ev(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return 'ERROR: ' + e.message; }
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

const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();

// Intercept console
page.on('console', msg => {
  const type = msg.type();
  const text = msg.text();
  if (type === 'error')   errors.push(text);
  if (type === 'warning') warnings.push(text);
});
page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));

console.log('\n── Step 1: Check globals ──');
const globals = await ev(page, `({
  GeradorPJ: typeof GeradorPJ,
  Matcher: typeof Matcher,
  ARQUETIPOS: typeof ARQUETIPOS,
  NOMES_SUGERIDOS: typeof NOMES_SUGERIDOS,
  ARQUETIPO_CATEGORIA: typeof ARQUETIPO_CATEGORIA,
})`);
console.log(JSON.stringify(globals, null, 2));

console.log('\n── Step 2: Iniciar + modo view ──');
await ev(page, `(function(){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-gerador-pj').classList.add('ativa');
  GeradorPJ.iniciar();
})()`);
await sleep(400);
const modoView = await ev(page, `document.querySelector('.gpj-view-modo') ? 'ok' : 'missing'`);
console.log('modo view:', modoView);

console.log('\n── Step 3: Gerar aleatorio ──');
await ev(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(300);
await ev(page, `GeradorPJ.gerarAleatorio()`);
await sleep(500);
const resView = await ev(page, `document.querySelector('.gpj-resultado') ? 'ok' : 'missing'`);
const nomeTxt = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
const btnSug  = await ev(page, `document.querySelector('.gpj-btn-sugerir-nome') ? 'ok' : 'missing'`);
console.log('resultado view:', resView, '| nome:', nomeTxt, '| btn-sugerir:', btnSug);

console.log('\n── Step 4: sugerirNome ──');
await ev(page, `GeradorPJ.sugerirNome()`);
const nomeAfter = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
console.log('nome após sugerirNome:', nomeAfter);
const mudou = nomeTxt !== nomeAfter;
console.log('nome mudou:', mudou, '(esperado: true)');

console.log('\n── Step 5: sugerirNome 5x sem crash ──');
for (let i = 0; i < 5; i++) {
  await ev(page, `GeradorPJ.sugerirNome()`);
}
const nomeAfter5 = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
console.log('nome após 5 cliques:', nomeAfter5);

console.log('\n── Step 6: carregarNoWizard ──');
await ev(page, `GeradorPJ.carregarNoWizard()`);
await sleep(500);
const banner = await ev(page, `document.getElementById('gpj-wizard-banner') ? 'ok' : 'missing'`);
const telaCerta = await ev(page, `document.getElementById('tela-wizard')?.classList.contains('ativa') ? 'ok' : 'missing'`);
console.log('wizard banner:', banner, '| tela-wizard ativa:', telaCerta);

console.log('\n── Step 7: Inspirado — buscar Yennefer / iennefer ──');
await ev(page, `(function(){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-gerador-pj').classList.add('ativa');
  GeradorPJ.iniciar();
})()`);
await sleep(300);
await ev(page, `GeradorPJ.setModo('inspirado')`);
await sleep(300);
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) inp.value = 'iennefer';
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const yenRes = await ev(page, `document.querySelector('.gpj-busca-encontrado')?.querySelector('.gpj-busca-nome')?.textContent?.trim()`);
console.log('busca "iennefer":', yenRes, '(esperado: Yennefer de Vengerberg)');

console.log('\n── Step 8: Inspirado — buscar spider-man ──');
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) inp.value = 'spider-man';
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const spiderRes = await ev(page, `document.querySelector('.gpj-busca-encontrado')?.querySelector('.gpj-busca-nome')?.textContent?.trim()`);
console.log('busca "spider-man":', spiderRes, '(esperado: Miles Morales ou similar)');

console.log('\n── Step 9: Navegação + filtros ──');
await ev(page, `(function(){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-gerador-pj').classList.add('ativa');
  GeradorPJ.iniciar();
})()`);
await sleep(300);
await ev(page, `GeradorPJ.mostrarNavegacao()`);
await sleep(400);
const navCounter = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.slice(0, 40)`);
console.log('nav contador:', navCounter);
await ev(page, `GeradorPJ.atualizarNavegacao('filtroCategoria', 'anime')`);
await sleep(500);
const navAfter = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.slice(0, 40)`);
console.log('nav após filtro anime:', navAfter);
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(300);

console.log('\n── Step 10: Abrir modal personagem ──');
await ev(page, `document.querySelector('.nav-card-btn')?.click()`);
await sleep(400);
const modal = await ev(page, `document.getElementById('modal-personagem')?.classList.contains('ativo')`);
console.log('modal personagem aberto:', modal, '(esperado: true)');
await ev(page, `document.getElementById('modal-personagem')?.querySelector('.modal-close')?.click()`);
await sleep(200);

console.log('\n\n══ RESULTADO DO AUDIT ══');
console.log(`Erros: ${errors.length}`);
errors.forEach(e => console.log('  ERROR:', e));
console.log(`Warnings: ${warnings.length}`);
warnings.slice(0, 10).forEach(w => console.log('  WARN:', w));

await app.close();
process.exit(errors.length > 0 ? 1 : 0);
