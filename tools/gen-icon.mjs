// Generates assets/icon.png — 256x256 purple/gold themed icon for Fabula Ultima Creator
// Uses only Node.js built-ins (zlib, fs) — no extra dependencies needed.
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const OUT  = path.join(ROOT, 'assets', 'icon.png');

const SIZE = 256;

// ── Colour palette ──────────────────────────────────────────────────────────
const BG      = [15,  15,  26,  255]; // #0f0f1a — dark background
const PURPLE  = [124, 92,  191, 255]; // #7c5cbf — primary purple
const GOLD    = [232, 197, 106, 255]; // #e8c56a — accent gold
const NIGHT   = [26,  26,  46,  255]; // #1a1a2e — circle fill

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
function lerpCol(c1, c2, t) { return c1.map((v, i) => lerp(v, c2[i], t)); }

// ── Build pixel data ────────────────────────────────────────────────────────
// Canvas: 256×256 RGBA.
// Design: dark BG → purple radial glow → gold outer ring → "FU" text vibe as diamond.
const pixels = new Uint8Array(SIZE * SIZE * 4);

const cx = SIZE / 2, cy = SIZE / 2;
const rOuter = 110, rInner = 90, rGlow = 85;

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const idx = (y * SIZE + x) * 4;

    let col;
    if (dist > rOuter) {
      // Outside ring → transparent-ish dark (let corners be transparent)
      col = [...BG, dist < rOuter + 8 ? Math.round(255 * (1 - (dist - rOuter) / 8)) : 0];
    } else if (dist > rInner) {
      // Gold ring band
      const t = (dist - rInner) / (rOuter - rInner);
      const alpha = 255;
      col = [...lerpCol(GOLD, PURPLE, t * 0.4), alpha];
    } else if (dist > rGlow) {
      // Purple transition
      const t = (dist - rGlow) / (rInner - rGlow);
      col = [...lerpCol(PURPLE, NIGHT, t), 255];
    } else {
      // Inner circle — dark night with subtle purple glow
      const t = dist / rGlow;
      col = [...lerpCol(NIGHT, [40, 30, 70, 255], t * t), 255];
    }

    pixels[idx]     = col[0];
    pixels[idx + 1] = col[1];
    pixels[idx + 2] = col[2];
    pixels[idx + 3] = col[3];
  }
}

// Draw a simple diamond ◆ shape in gold at center (stylized "FU" emblem)
function drawDiamond(cx, cy, rx, ry, col) {
  for (let y = cy - ry; y <= cy + ry; y++) {
    for (let x = cx - rx; x <= cx + rx; x++) {
      const nx = (x - cx) / rx, ny = (y - cy) / ry;
      if (Math.abs(nx) + Math.abs(ny) <= 1.0 && x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
        const idx = (y * SIZE + x) * 4;
        pixels[idx]     = col[0];
        pixels[idx + 1] = col[1];
        pixels[idx + 2] = col[2];
        pixels[idx + 3] = col[3];
      }
    }
  }
}

// Outer diamond (gold)
drawDiamond(cx, cy, 44, 44, GOLD);
// Inner diamond (purple fill)
drawDiamond(cx, cy, 32, 32, PURPLE);
// Tiny center dot (gold)
drawDiamond(cx, cy, 10, 10, GOLD);

// ── Encode as PNG ────────────────────────────────────────────────────────────
// PNG = signature + IHDR + IDAT + IEND
function crc32(buf) {
  const table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return t;
  })();
  let crc = 0xFFFFFFFF;
  for (const b of buf) crc = table[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf  = Buffer.alloc(4); lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf  = Buffer.alloc(4);
  const crcData = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(crcData), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);   // width
ihdr.writeUInt32BE(SIZE, 4);   // height
ihdr[8]  = 8;   // bit depth
ihdr[9]  = 6;   // colour type: RGBA
ihdr[10] = 0;   // compression
ihdr[11] = 0;   // filter
ihdr[12] = 0;   // interlace

// IDAT: filter byte 0x00 before each scanline, then deflate
const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1));
for (let y = 0; y < SIZE; y++) {
  raw[y * (SIZE * 4 + 1)] = 0; // filter type: None
  for (let x = 0; x < SIZE; x++) {
    const src = (y * SIZE + x) * 4;
    const dst = y * (SIZE * 4 + 1) + 1 + x * 4;
    raw[dst]     = pixels[src];
    raw[dst + 1] = pixels[src + 1];
    raw[dst + 2] = pixels[src + 2];
    raw[dst + 3] = pixels[src + 3];
  }
}
const compressed = zlib.deflateSync(raw, { level: 6 });

const sig  = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const png  = Buffer.concat([
  sig,
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0))
]);

fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
fs.writeFileSync(OUT, png);
console.log(`Icon written: ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);
