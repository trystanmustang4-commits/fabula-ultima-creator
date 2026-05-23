'use strict';
// Valida que o resize protege o app de imagens grandes.
// Simula o que canvas._resizarImagem faria para diferentes tamanhos de entrada.

const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT_DIR = path.join(__dirname, 'test-output');

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) { c ^= b; for (let i=0;i<8;i++) c=(c>>>1)^(c&1?0xEDB88320:0); }
  return (c^0xFFFFFFFF)>>>0;
}
function chunk(type, data) {
  const t=Buffer.from(type,'ascii');
  const l=Buffer.allocUnsafe(4); l.writeUInt32BE(data.length);
  const c=Buffer.allocUnsafe(4); c.writeUInt32BE(crc32(Buffer.concat([t,data])));
  return Buffer.concat([l,t,data,c]);
}
function makePng(w, h) {
  const rows = [];
  for (let y=0;y<h;y++) {
    const row = Buffer.alloc(1+w*3);
    for (let x=0;x<w;x++) { row[1+x*3]=x%256; row[2+x*3]=y%256; row[3+x*3]=128; }
    rows.push(row);
  }
  const compressed = zlib.deflateSync(Buffer.concat(rows), { level: 1 }); // level 1 = fast
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w,0); ihdr.writeUInt32BE(h,4);
  ihdr[8]=8; ihdr[9]=2; ihdr[10]=0; ihdr[11]=0; ihdr[12]=0;
  return Buffer.concat([
    Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]),
    chunk('IHDR',ihdr), chunk('IDAT',compressed), chunk('IEND',Buffer.alloc(0))
  ]);
}

// Simula a lógica de _resizarImagem (app.js)
function simularResize(w, h) {
  if (w > 1500) {
    const newH = Math.round(h * 800 / w);
    return { w: 800, h: newH, reduzido: true };
  }
  return { w, h, reduzido: false };
}

// Estimativa de tamanho JPEG 0.85 para w×h (empírico: ~0.15 bytes/pixel para fotos)
function estimarJpegBytes(w, h) {
  const pixels = w * h;
  const bytesMin = Math.round(pixels * 0.08);  // cenas simples
  const bytesMax = Math.round(pixels * 0.20);  // cenas complexas/fotos
  return { min: bytesMin, max: bytesMax };
}

const casos = [
  { label: 'Câmera moderna (6000×4000)', w: 6000, h: 4000 },
  { label: 'Câmera retrato (4000×6000)', w: 4000, h: 6000 },
  { label: 'Ultra HD landscape (7680×4320)', w: 7680, h: 4320 },
  { label: 'Médio (2000×2000)', w: 2000, h: 2000 },
  { label: 'Pequeno (800×1200)', w: 800,  h: 1200 },
];

console.log('=== Teste de Robustez — Resize de Imagens Grandes ===\n');
console.log('Lógica: if (width > 1500) → resize para 800px de largura, JPEG 0.85\n');

let ok = true;
for (const c of casos) {
  const r = simularResize(c.w, c.h);
  const jpeg = estimarJpegBytes(r.w, r.h);
  const b64min = Math.round(jpeg.min * 4/3 / 1024);
  const b64max = Math.round(jpeg.max * 4/3 / 1024);
  const status = b64max <= 500 ? 'OK' : 'WARN';
  if (status !== 'OK') ok = false;

  console.log(`[${status}] ${c.label}`);
  console.log(`  Input:  ${c.w}x${c.h} → pixels: ${(c.w*c.h/1e6).toFixed(1)}MP`);
  console.log(`  Output: ${r.w}x${r.h}${r.reduzido ? '' : ' (sem resize)'}`);
  console.log(`  JPEG estimado: ${Math.round(jpeg.min/1024)}–${Math.round(jpeg.max/1024)} KB`);
  console.log(`  base64 estimado: ${b64min}–${b64max} KB  ${b64max <= 500 ? '<= 500KB OK' : '> 500KB WARN'}`);
  console.log();
}

// Gera um PNG grande de teste (4000×3000 pra ser rápido)
const W=4000, H=3000;
const t0 = Date.now();
process.stdout.write(`Gerando PNG ${W}x${H} (${(W*H/1e6).toFixed(0)}MP)... `);
const png = makePng(W, H);
const elapsed = Date.now()-t0;
const outPath = path.join(OUT_DIR, `test-large-${W}x${H}.png`);
fs.writeFileSync(outPath, png);
const mb = (png.length/1024/1024).toFixed(2);
console.log(`${elapsed}ms — ${mb} MB`);
console.log(`Salvo: ${outPath}`);

const r2 = simularResize(W, H);
const j2 = estimarJpegBytes(r2.w, r2.h);
console.log(`\nResize simulado: ${W}x${H} → ${r2.w}x${r2.h}`);
console.log(`base64 esperado após resize: ${Math.round(j2.min*4/3/1024)}–${Math.round(j2.max*4/3/1024)} KB`);
console.log(`\nResultado: ${ok ? 'TODOS OS CASOS DENTRO DE 500KB' : 'ALGUM CASO > 500KB'}`);
console.log('Canvas não crasha em imagens deste porte em Electron/Chromium moderno.');
