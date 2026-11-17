// Testa a ponte Android no app instalado (APK de debug) via DevTools da WebView (CDP puro).
// Pré: adb forward tcp:9333 localabstract:webview_devtools_remote_<pid>
// Uso: node tools/test-android-cdp.mjs
const alvos = await (await fetch('http://localhost:9333/json')).json();
const alvo = alvos.find(t => t.type === 'page');
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let seq = 0;
const avaliar = expr => new Promise((res, rej) => {
  const id = ++seq;
  const h = ev => { const m = JSON.parse(ev.data); if (m.id !== id) return; ws.removeEventListener('message', h);
    m.result?.exceptionDetails ? rej(new Error(m.result.exceptionDetails.exception?.description)) : res(m.result?.result?.value); };
  ws.addEventListener('message', h);
  ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
});
const r = await avaliar(`(async () => {
  const out = {};
  out.nativo = window.Capacitor?.isNativePlatform?.();
  out.ponte = typeof window.electronAPI?.exportarPDF;
  out.pdfLib = typeof window.PDFLib?.PDFDocument;
  App.carregarPersonagemClassico(1);
  Object.assign(Estado.personagem, { nome: 'Teste Android', identidade: 'Viajante de teste', origem: 'BlueStacks', tema: 'dever' });
  out.salvar = await window.electronAPI.salvarPersonagem(Estado.personagem);
  const l = await window.electronAPI.carregarPersonagemDireto(out.salvar.caminho);
  out.recarregarNome = l.dados && l.dados.nome;
  const pdf = window.electronAPI.exportarPDF(App.prepararDadosPDF());
  out.pdf = await Promise.race([pdf, new Promise(res => setTimeout(() => res('aguardando-share'), 6000))]);
  return out;
})()`);
console.log(JSON.stringify(r, null, 2));
ws.close();
