// Screenshots do app em viewport de celular (Chrome do sistema + playwright-core), a partir de www/.
// Uso: node tools/build-www.mjs && node tools/shots-mobile.mjs <pasta-saida> [largura] [altura]
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const dir = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const OUT = path.resolve(dir, process.argv[2] || 'tools/test-output/screenshots/mobile');
const W = Number(process.argv[3] || 412), H = Number(process.argv[4] || 915);
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const erros = [];
page.on('pageerror', e => erros.push(e.message));
page.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
await page.goto(pathToFileURL(path.join(dir, 'www/index.html')).href);
await page.waitForTimeout(800);
const shot = async n => { await page.screenshot({ path: path.join(OUT, n + '.png') }); console.log('  ', n); };
const ev = e => page.evaluate(e).catch(err => 'ERR ' + err.message);

await shot('00-inicio');
await ev(`App.carregarPersonagemClassico(0); Object.assign(Estado.personagem, { nome: 'Lisandra Vey', identidade: 'Cavaleira exilada de um reino de cristal', origem: 'Vila de Aldmere', tema: 'dever' });`);
await page.waitForTimeout(300);
for (let i = 0; i < 8; i++) { await ev(`App.irParaPasso(${i})`); await page.waitForTimeout(250); await shot(`0${i + 1}-passo-${i}`); }
await ev(`document.getElementById('palco-heroi')?.classList.add('expandido'); App.renderizarPalco && App.renderizarPalco()`);
await page.waitForTimeout(200);
await shot('09-palco-expandido');
await ev(`App.gerarFicha(); App.mostrarTela('ficha')`); await page.waitForTimeout(300); await shot('10-ficha');
await ev(`App.mostrarGeradorPJ()`); await page.waitForTimeout(300); await shot('11-gerador');
console.log('erros:', erros.length ? erros : 'nenhum');
await browser.close();
