'use strict';
// Gera um PNG de retrato vertical (200x300) como imagem de teste para calibração de slot PDF.
// Usa apenas módulos nativos do Node (zlib, fs, crypto).

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const W = 200, H = 300;
const OUT = path.join(__dirname, 'test-output', 'test-portrait.png');

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (const b of buf) {
    crc ^= b;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.allocUnsafe(4); lenBuf.writeUInt32BE(data.length);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// Constrói os pixels: gradiente roxo→azul escuro com cruz branca central
const rows = [];
for (let y = 0; y < H; y++) {
  const row = Buffer.allocUnsafe(1 + W * 3); // filtro 0 + RGB
  row[0] = 0;
  for (let x = 0; x < W; x++) {
    const t = y / (H - 1);
    // Gradiente roxo (#7c5cbf) → azul escuro (#1a1a2e)
    let r = Math.round(0x7c + t * (0x1a - 0x7c));
    let g = Math.round(0x5c + t * (0x1a - 0x5c));
    let b = Math.round(0xbf + t * (0x2e - 0xbf));
    // Cruz branca no centro (±8px)
    if (Math.abs(x - W/2) < 4 || Math.abs(y - H/2) < 4) { r = 220; g = 220; b = 220; }
    // Borda dourada (3px)
    if (x < 3 || x >= W-3 || y < 3 || y >= H-3) { r = 0xe8; g = 0xc5; b = 0x6a; }
    row[1 + x*3] = r; row[2 + x*3] = g; row[3 + x*3] = b;
  }
  rows.push(row);
}

const rawPixels = Buffer.concat(rows);
const compressed = zlib.deflateSync(rawPixels, { level: 6 });

const ihdr = Buffer.allocUnsafe(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 2;  // RGB
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]), // PNG magic
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0)),
]);

fs.writeFileSync(OUT, png);
console.log(`PNG gerado: ${OUT} (${W}x${H} px, ${png.length} bytes)`);
