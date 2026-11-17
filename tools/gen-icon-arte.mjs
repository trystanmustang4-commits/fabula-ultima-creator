// Gera assets/icon.png (512px) e renderer/img/arte-titulo.jpg a partir de assets/icon-arte-original.png.
// Usa o nativeImage do próprio Electron — sem dependências extras.
// Uso: node tools/gen-icon-arte.mjs
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const dir = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const app = await electron.launch({
  executablePath: path.join(dir, 'node_modules/electron/dist/electron.exe'),
  args: [dir],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
});
const out = await app.evaluate(({ nativeImage }, src) => {
  const img = nativeImage.createFromPath(src);
  return {
    size: img.getSize(),
    icon: img.resize({ width: 512, height: 512, quality: 'best' }).toPNG().toString('base64'),
    arte: img.toJPEG(86).toString('base64'),
  };
}, path.join(dir, 'assets/icon-arte-original.png'));
await app.close();

fs.writeFileSync(path.join(dir, 'assets/icon.png'), Buffer.from(out.icon, 'base64'));
fs.mkdirSync(path.join(dir, 'renderer/img'), { recursive: true });
fs.writeFileSync(path.join(dir, 'renderer/img/arte-titulo.jpg'), Buffer.from(out.arte, 'base64'));
console.log('origem', out.size, '→ assets/icon.png 512px, renderer/img/arte-titulo.jpg');
