// Monta www/ (o app web empacotado pelo Capacitor no Android) a partir de renderer/.
// Acrescenta pdf-lib, a ficha oficial e a ponte Android (mobile/plataforma-android.js).
// Uso: node tools/build-www.mjs   (rodado por `npm run android:build`)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const raiz = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const www = path.join(raiz, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.cpSync(path.join(raiz, 'renderer'), www, { recursive: true });
fs.copyFileSync(path.join(raiz, 'node_modules/pdf-lib/dist/pdf-lib.min.js'), path.join(www, 'lib/pdf-lib.min.js'));
fs.copyFileSync(path.join(raiz, 'assets/ficha-template.pdf'), path.join(www, 'ficha-template.pdf'));
fs.copyFileSync(path.join(raiz, 'mobile/plataforma-android.js'), path.join(www, 'plataforma-android.js'));

const idx = path.join(www, 'index.html');
let html = fs.readFileSync(idx, 'utf8');
const ancora = '<script src="data/gamedata.js"></script>';
if (!html.includes(ancora)) throw new Error('âncora de scripts não encontrada em index.html');
html = html.replace(ancora,
  '<script src="lib/pdf-lib.min.js"></script>\n<script src="lib/preencher-ficha.js"></script>\n<script src="plataforma-android.js"></script>\n' + ancora);
html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />');
fs.writeFileSync(idx, html);
console.log('www/ pronto');
