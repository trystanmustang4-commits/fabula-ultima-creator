const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  salvarPersonagem: (dados) => ipcRenderer.invoke('salvar-personagem', dados),
  carregarPersonagem: () => ipcRenderer.invoke('carregar-personagem'),
  carregarPersonagemDireto: (caminho) => ipcRenderer.invoke('carregar-personagem-direto', caminho),
  exportarPDF: (dados) => ipcRenderer.invoke('exportar-pdf', dados),
  salvarJSON: (dados, nome, titulo) => ipcRenderer.invoke('salvar-json', { dados, nome, titulo })
});
