const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

// Slot de imagem na ficha (página 1, pdf-lib coords: origem bottom-left, y sobe)
// Coluna central, abaixo do logo FU, acima do bloco PV. Retrato vertical.
// NUNCA chamar form.flatten() — campos AcroForm devem permanecer editáveis no PDF gerado.

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 900,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: 'Fabula Ultima — Criador de Personagens',
    backgroundColor: '#0c0b17',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.setMenuBarVisibility(false);

  // DevTools toggle — F12 ou Ctrl+Shift+I
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' ||
        (input.control && input.shift && input.key === 'I')) {
      if (mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools();
      } else {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
      }
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC: Salvar personagem
ipcMain.handle('salvar-personagem', async (event, dados) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Salvar Personagem',
    defaultPath: `${dados.nome || 'personagem'}.json`,
    filters: [{ name: 'Personagem Fabula Ultima', extensions: ['json'] }]
  });
  if (filePath) {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf-8');
    return { sucesso: true, caminho: filePath };
  }
  return { sucesso: false };
});

// IPC: Carregar personagem
ipcMain.handle('carregar-personagem', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Carregar Personagem',
    filters: [{ name: 'Personagem Fabula Ultima', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (filePaths && filePaths.length > 0) {
    const conteudo = fs.readFileSync(filePaths[0], 'utf-8');
    return { sucesso: true, dados: JSON.parse(conteudo), caminho: filePaths[0] };
  }
  return { sucesso: false };
});

// IPC: Carregar personagem direto por caminho (para histórico de recentes)
ipcMain.handle('carregar-personagem-direto', async (event, caminho) => {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return { sucesso: true, dados: JSON.parse(conteudo), caminho };
  } catch (err) {
    return { sucesso: false, erro: err.message };
  }
});

// IPC: Exportar PDF preenchendo a ficha oficial (pdf-lib)
ipcMain.handle('exportar-pdf', async (event, payload) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Exportar Ficha em PDF',
    defaultPath: `${payload.personagem.nome || 'personagem'}-ficha.pdf`,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });
  if (!filePath) return { sucesso: false };

  try {
    const preencherFicha = require('./renderer/lib/preencher-ficha.js');
    const templatePath = path.join(__dirname, 'assets', 'ficha-template.pdf');
    const pdfBytes = await preencherFicha(require('pdf-lib'), fs.readFileSync(templatePath), payload);
    fs.writeFileSync(filePath, pdfBytes);
    return { sucesso: true, caminho: filePath };

  } catch (err) {
    console.error('[exportar-pdf]', err);
    return { sucesso: false, erro: err.message };
  }
});

// IPC: Salvar JSON genérico (NPC / Encontro para Foundry VTT)
ipcMain.handle('salvar-json', async (event, { dados, nome, titulo }) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow, {
    title: titulo || 'Exportar JSON',
    defaultPath: `${nome || 'exportacao'}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  if (!filePath) return { sucesso: false };
  try {
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf-8');
    return { sucesso: true, caminho: filePath };
  } catch (err) {
    return { sucesso: false, erro: err.message };
  }
});
