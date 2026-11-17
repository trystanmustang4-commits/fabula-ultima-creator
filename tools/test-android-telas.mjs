// Percorre as telas do app no Android real (APK de debug) e captura a tela do aparelho em cada estado.
// Pré: APK de debug instalado e aberto; adb conectado (ex.: BlueStacks em 127.0.0.1:5555).
// Uso: node tools/test-android-telas.mjs <pasta-saida> [serial-adb]
import { execFileSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const OUT = path.resolve(process.argv[2] || 'tools/test-output/android-telas');
const SERIAL = process.argv[3] || '127.0.0.1:5555';
const ADB = path.join(process.env.LOCALAPPDATA, 'Android/Sdk/platform-tools/adb.exe');
const PKG = 'com.danyel.fabulaultima.creator';
fs.mkdirSync(OUT, { recursive: true });
const adb = (...a) => execFileSync(ADB, ['-s', SERIAL, ...a], { maxBuffer: 64 * 1024 * 1024 });

const pid = adb('shell', 'pidof', PKG).toString().trim();
if (!pid) throw new Error('app não está rodando');
adb('forward', 'tcp:9333', `localabstract:webview_devtools_remote_${pid}`);
const alvo = (await (await fetch('http://localhost:9333/json')).json()).find(t => t.type === 'page');
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let seq = 0;
const avaliar = expr => new Promise((res, rej) => {
  const id = ++seq;
  const h = ev => { const m = JSON.parse(ev.data); if (m.id !== id) return; ws.removeEventListener('message', h);
    m.result?.exceptionDetails ? rej(new Error(m.result.exceptionDetails.exception?.description || 'erro')) : res(m.result?.result?.value); };
  ws.addEventListener('message', h);
  ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
});
const espera = ms => new Promise(r => setTimeout(r, ms));

const EX = `App.carregarPersonagemClassico(0); Object.assign(Estado.personagem, { nome: 'Lisandra Vey de Aldmere', identidade: 'Cavaleira exilada de um reino de cristal', origem: 'Vila de Aldmere', tema: 'dever' });`;
const ESTADOS = [
  ['00-inicio', `App.mostrarTela('inicio')`],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => [`0${i + 1}-passo-${i}`, `${EX} App.irParaPasso(${i})`]),
  ['09-palco-expandido', `${EX} App.irParaPasso(4); document.getElementById('palco-heroi').classList.add('expandido'); App.renderizarPalco()`],
  ['10-ficha', `document.getElementById('palco-heroi').classList.remove('expandido'); ${EX} App.gerarFicha(); App.mostrarTela('ficha')`],
  ['11-sessao', `App.mostrarSessao()`],
  ['12-exemplos', `App.mostrarTela('inicio'); App.mostrarExemplos()`],
  ['13-npc', `App.fecharExemplos(); App.mostrarNPC(); App.switchNPCTab('gerador'); App.gerarNPC(5, 'Inimigo')`],
  ['14-encontro', `App.switchNPCTab('encontro'); App.gerarEncontro()`],
  ['15-gpj-aleatorio', `App.mostrarGeradorPJ(); GeradorPJ.setModo('aleatorio')`],
  ['16-gpj-resultado', `GeradorPJ.gerarAleatorio()`],
  ['17-gpj-banco', `GeradorPJ.iniciar(); GeradorPJ.mostrarNavegacao()`],
];
const erros = [];
await avaliar(`window.__erros = []; window.addEventListener('error', e => __erros.push(e.message)); true`);
for (const [nome, codigo] of ESTADOS) {
  try { await avaliar(`(() => { ${codigo}; document.querySelectorAll('.toast').forEach(t => t.classList.remove('visivel')); const m = document.querySelector('.tela.ativa .wizard-main, .tela.ativa'); return true; })()`); }
  catch (e) { erros.push(`${nome}: ${e.message}`); }
  await espera(900);
  fs.writeFileSync(path.join(OUT, nome + '.png'), adb('exec-out', 'screencap', '-p'));
  console.log('  ', nome);
}
const errosJs = await avaliar('window.__erros');
console.log('erros ao navegar:', erros.length ? erros : 'nenhum', '| erros JS:', errosJs.length ? errosJs : 'nenhum');
ws.close();
adb('forward', '--remove', 'tcp:9333');
