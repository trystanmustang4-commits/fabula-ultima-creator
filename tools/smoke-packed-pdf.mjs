// Abre o app empacotado (dist/win-unpacked) e testa tela inicial, wizard e geração de PDF pelo processo principal.
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
const dir = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const app = await electron.launch({ executablePath: path.join(dir, 'dist/win-unpacked/Fabula Ultima Creator.exe'), args: [], env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined }, timeout: 30000 });
const page = await app.firstWindow();
await page.waitForTimeout(2500);
const erros = [];
page.on('pageerror', e => erros.push(e.message));
const r = await page.evaluate(() => {
  App.carregarPersonagemClassico(0);
  App.irParaPasso(3);
  return { vitrine: !!document.querySelector('.vitrine-arte'), palco: !!document.querySelector('.palco-brasao, .palco-retrato'), aba: document.querySelector('.passo-indicador.ativo')?.textContent };
});
// PDF pela IPC real do app empacotado: o diálogo "Salvar como" devolve um caminho fixo
const destino = path.join(dir, 'tools/test-output/ficha-empacotado.pdf');
await app.evaluate(({ dialog }, alvo) => { dialog.showSaveDialog = async () => ({ filePath: alvo }); }, destino);
const pdf = await page.evaluate(async () => {
  Estado.personagem.nome = 'Teste Empacotado';
  return await window.electronAPI.exportarPDF(App.prepararDadosPDF());
});
await page.screenshot({ path: path.join(dir, 'tools/test-output/packed-1.1.1.png') });
console.log(JSON.stringify({ ...r, pdf, erros }));
await app.close();
