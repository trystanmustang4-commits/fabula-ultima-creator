// Quick sanity check for the win-unpacked build
import { _electron as electron } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT    = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const EXE     = path.join(ROOT, 'dist', 'win-unpacked', 'Fabula Ultima Creator.exe');
const SHOT_DIR = path.join(ROOT, 'tools', 'test-output', 'screenshots', 'packed');
import fs from 'fs';
fs.mkdirSync(SHOT_DIR, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function ev(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return 'ERROR: ' + e.message; }
}

console.log('Launching packed build…');
console.log('Exe:', EXE);

const app = await electron.launch({
  executablePath: EXE,
  args: [],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});

await sleep(4000);
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();

const errors = [];
page.on('pageerror', err => errors.push(err.message));
page.on('console',  msg => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.screenshot({ path: path.join(SHOT_DIR, '01-launch.png') });

const checks = {
  'tela-inicio ativa':    await ev(page, `document.getElementById('tela-inicio')?.classList.contains('ativa')`),
  'Estado definido':      await ev(page, `typeof Estado !== 'undefined'`),
  'App definido':         await ev(page, `typeof App !== 'undefined'`),
  'GeradorPJ definido':   await ev(page, `typeof GeradorPJ !== 'undefined'`),
  'Matcher definido':     await ev(page, `typeof Matcher !== 'undefined'`),
  'Fuse global':          await ev(page, `typeof Fuse !== 'undefined'`),
  'KB 730 entradas':      await ev(page, `typeof Matcher !== 'undefined' ? Matcher.getKbAll().length : 0`),
  'ARQUETIPOS 33':        await ev(page, `typeof ARQUETIPOS !== 'undefined' ? ARQUETIPOS.length : 0`),
  'ficha-template path':  await ev(page, `typeof window.electronAPI !== 'undefined' ? 'electronAPI ok' : 'missing'`),
};

await sleep(1000);

// Navigate to Gerador and generate a character
await ev(page, `App.mostrarTela('gerador-pj'); GeradorPJ.iniciar();`);
await sleep(600);
await ev(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(300);
await ev(page, `GeradorPJ.gerarAleatorio()`);
await sleep(700);
const resultado = await ev(page, `document.querySelector('.gpj-resultado') ? 'ok' : 'missing'`);
checks['gerarAleatorio funciona'] = resultado;
await page.screenshot({ path: path.join(SHOT_DIR, '02-resultado.png') });

await app.close();

console.log('\n══ RESULTADO — PACKED BUILD ══');
let allOk = true;
for (const [label, val] of Object.entries(checks)) {
  const ok = val === true || val === 'ok' || val === 'electronAPI ok' || val === 730 || val === 33;
  console.log(`  ${ok ? '✅' : '❌'} ${label}: ${val}`);
  if (!ok) allOk = false;
}
console.log('\nErros de console:', errors.length);
errors.forEach(e => console.log('  ERROR:', e.slice(0, 120)));
console.log(`\n${allOk && errors.length === 0 ? '✅ PACKED BUILD OK' : '❌ PROBLEMAS ENCONTRADOS'}`);
console.log('Screenshots:', SHOT_DIR);
process.exit(allOk && errors.length === 0 ? 0 : 1);
