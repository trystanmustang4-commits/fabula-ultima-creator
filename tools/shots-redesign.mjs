// Screenshot driver — redesign MMO: tela inicial, 8 passos do wizard (com personagem exemplo), ficha e gerador.
// Uso: node tools/shots-redesign.mjs <pasta-saida> [largura] [altura]
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const OUT = path.resolve(APP_DIR, process.argv[2] || 'tools/test-output/screenshots/redesign');
const W = Number(process.argv[3] || 1440);
const H = Number(process.argv[4] || 900);
fs.mkdirSync(OUT, { recursive: true });
const electronBin = path.join(APP_DIR, 'node_modules', 'electron', 'dist', 'electron.exe');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const app = await electron.launch({
  executablePath: electronBin, args: [APP_DIR],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined }, timeout: 30_000,
});
await sleep(2500);
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGE ERROR: ' + e.message));
await app.evaluate(({ BrowserWindow }, [w, h]) => {
  const win = BrowserWindow.getAllWindows()[0];
  win.setContentSize(w, h);
}, [W, H]);
await sleep(600);

const shot = async name => { await page.screenshot({ path: path.join(OUT, name + '.png') }); console.log('  ', name); };
const ev = async expr => { try { return await page.evaluate(expr); } catch (e) { return 'ERR ' + e.message; } };

await ev(`localStorage.clear(); App.mostrarTela('inicio'); App.renderizarHomeScreen && App.renderizarHomeScreen();`);
await sleep(300);
await shot('00-inicio');

// Passo vazio (novo personagem) — mostra o palco sem escolhas
await ev(`App.iniciarCriacao()`);
await sleep(400);
await shot('01a-identidade-vazio');

// Personagem exemplo completo
await ev(`(function(){
  App.carregarPersonagemClassico(0);
  const p = Estado.personagem;
  p.nome = 'Lisandra Vey'; p.identidade = 'Cavaleira exilada de um reino de cristal';
  p.origem = 'Vila de Aldmere'; p.tema = 'dever';
  p.lacos[0] = { alvo: 'Corvin', emocoes: ['admiracao'] };
})()`);
await sleep(400);
for (let i = 0; i < 8; i++) {
  await ev(`App.irParaPasso(${i})`);
  await sleep(350);
  await shot(`0${i + 1}-passo-${i}`);
}
await ev(`App.gerarFicha && App.gerarFicha(); App.mostrarTela('ficha')`);
await sleep(500);
await shot('10-ficha');
await ev(`App.mostrarGeradorPJ()`);
await sleep(500);
await shot('11-gerador');

console.log('errors:', errors.length ? errors : 'none');
await app.close();
