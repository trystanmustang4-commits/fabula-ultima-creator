// Quick click test: verifies home screen buttons actually work when clicked
import { _electron as electron } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const EXE  = path.join(ROOT, 'dist', 'win-unpacked', 'Fabula Ultima Creator.exe');
const SHOT = path.join(ROOT, 'tools', 'test-output', 'screenshots', 'click-test');
fs.mkdirSync(SHOT, { recursive: true });

console.log('Launching win-unpacked…');
const app = await electron.launch({
  executablePath: EXE,
  args: [],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});
await new Promise(r => setTimeout(r, 3500));
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();

const errors = [];
page.on('pageerror', e => errors.push('[pageerror] ' + e.message));
page.on('console',   m => { if (m.type() === 'error') errors.push('[console.error] ' + m.text()); });

await page.screenshot({ path: path.join(SHOT, '01-home.png') });

// Inspect home-dinamico
const btns = await page.evaluate(() => {
  const d = document.getElementById('home-dinamico');
  return {
    rendered: !!d?.innerHTML?.trim(),
    buttonCount: d?.querySelectorAll('button').length ?? 0,
    firstBtnText: d?.querySelector('button')?.textContent?.trim() ?? 'none',
    activeTela: document.querySelector('.tela.ativa')?.id ?? 'none',
  };
});
console.log('Home state:', btns);

// Click "Criar Novo Personagem"
console.log('Clicking "Criar Novo Personagem"…');
try {
  await page.click('button.btn-primario.btn-grande', { timeout: 3000 });
} catch (e) {
  console.log('Click failed:', e.message);
}
await new Promise(r => setTimeout(r, 800));

const after = await page.evaluate(() => ({
  activeTela: document.querySelector('.tela.ativa')?.id ?? 'none',
  wizardMainLen: document.getElementById('wizard-main')?.innerHTML?.length ?? 0,
  passosLen: document.getElementById('passos-lista')?.innerHTML?.length ?? 0,
}));
console.log('After click:', after);
await page.screenshot({ path: path.join(SHOT, '02-after-click.png') });

// Also test Gerador PJ button
console.log('\nNavigating back to home…');
await page.evaluate(() => App.mostrarTela('inicio'));
await new Promise(r => setTimeout(r, 400));
await page.click('button.btn-exemplos:last-of-type', { timeout: 3000 }).catch(e => console.log('Gerador click failed:', e.message));
await new Promise(r => setTimeout(r, 600));
const afterGerador = await page.evaluate(() => ({
  activeTela: document.querySelector('.tela.ativa')?.id ?? 'none',
}));
console.log('After Gerador click:', afterGerador);
await page.screenshot({ path: path.join(SHOT, '03-after-gerador.png') });

await app.close();

console.log('\nErrors collected:', errors.length);
errors.forEach(e => console.log(' ', e.slice(0, 150)));
console.log('Screenshots:', SHOT);
