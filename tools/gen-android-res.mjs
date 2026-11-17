// Gera os ícones do app Android (mipmaps) a partir de assets/icon-arte-original.png,
// usando o nativeImage do Electron. Uso: node tools/gen-android-res.mjs
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const dir = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const res = path.join(dir, 'android/app/src/main/res');
const dens = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const pedidos = [];
for (const [d, k] of Object.entries(dens)) {
  pedidos.push({ arq: `mipmap-${d}/ic_launcher.png`, px: Math.round(48 * k) });
  pedidos.push({ arq: `mipmap-${d}/ic_launcher_round.png`, px: Math.round(48 * k) });
  pedidos.push({ arq: `mipmap-${d}/ic_launcher_foreground.png`, px: Math.round(108 * k) });
}
const app = await electron.launch({ executablePath: path.join(dir, 'node_modules/electron/dist/electron.exe'), args: [dir], env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined } });
const saida = await app.evaluate(({ nativeImage }, { src, pedidos }) => {
  const img = nativeImage.createFromPath(src);
  return pedidos.map(p => ({ arq: p.arq, b64: img.resize({ width: p.px, height: p.px, quality: 'best' }).toPNG().toString('base64') }));
}, { src: path.join(dir, 'assets/icon-arte-original.png'), pedidos });
await app.close();
for (const s of saida) {
  fs.mkdirSync(path.dirname(path.join(res, s.arq)), { recursive: true });
  fs.writeFileSync(path.join(res, s.arq), Buffer.from(s.b64, 'base64'));
}
console.log(saida.length, 'ícones gerados');
