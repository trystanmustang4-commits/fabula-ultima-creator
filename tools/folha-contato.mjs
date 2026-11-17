// Junta os PNGs de uma pasta numa folha de contato (para revisar várias telas de uma vez).
// Uso: node tools/folha-contato.mjs <pasta> [colunas] [largura-de-cada]
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
const pasta = path.resolve(process.argv[2]);
const cols = Number(process.argv[3] || 4), w = Number(process.argv[4] || 300);
const imgs = fs.readdirSync(pasta).filter(f => f.endsWith('.png') && !f.startsWith('_')).sort();
const html = `<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:6px;padding:6px;font:12px sans-serif;color:#fff">` +
  imgs.map(f => `<figure style="margin:0"><img src="${pathToFileURL(path.join(pasta, f)).href}" style="width:${w}px;display:block"><figcaption>${f}</figcaption></figure>`).join('') + '</body>';
const tmp = path.join(pasta, '_folha.html');
fs.writeFileSync(tmp, html);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: cols * (w + 6) + 6, height: 600 } });
await p.goto(pathToFileURL(tmp).href);
await p.waitForTimeout(500);
await p.screenshot({ path: path.join(pasta, '_folha.png'), fullPage: true });
await b.close();
fs.rmSync(tmp);
console.log(path.join(pasta, '_folha.png'));
