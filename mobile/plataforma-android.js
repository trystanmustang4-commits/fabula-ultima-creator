// =============================================
// PONTE ANDROID (Capacitor)
// Implementa a mesma API que o preload.js do Electron expõe (window.electronAPI),
// para que app.js funcione sem mudanças no celular:
//   salvarPersonagem · carregarPersonagem · carregarPersonagemDireto · exportarPDF · salvarJSON
// Arquivos vão para Documentos/FabulaUltima quando o sistema permite; senão, para a
// pasta interna do app. PDFs e exportações abrem a folha de compartilhamento do Android.
// Carregado antes de app.js (injetado por tools/build-www.mjs).
// =============================================
(function () {
  const Cap = window.Capacitor;
  if (!Cap || !Cap.isNativePlatform || !Cap.isNativePlatform()) return;

  document.documentElement.classList.add('plataforma-movel');
  const { Filesystem, Share } = Cap.Plugins;
  const PASTA = 'FabulaUltima';

  const nomeSeguro = s => (String(s || '').replace(/[^\p{L}\p{N} _-]/gu, '').trim().slice(0, 60)) || 'personagem';

  function bytesParaBase64(bytes) {
    let bin = '';
    const BLOCO = 0x8000;
    for (let i = 0; i < bytes.length; i += BLOCO) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + BLOCO));
    return btoa(bin);
  }

  // Grava em Documentos/FabulaUltima; em caso de falha (permissão), na pasta interna do app.
  async function gravar(nomeArquivo, dados, ehTexto) {
    const base = { path: `${PASTA}/${nomeArquivo}`, data: dados, recursive: true };
    if (ehTexto) base.encoding = 'utf8';
    try {
      try { await Filesystem.requestPermissions(); } catch (_) { /* Android 11+ não precisa */ }
      const r = await Filesystem.writeFile({ ...base, directory: 'DOCUMENTS' });
      return { uri: r.uri, local: `Documentos/${PASTA}` };
    } catch (_) {
      const r = await Filesystem.writeFile({ ...base, directory: 'DATA' });
      return { uri: r.uri, local: 'armazenamento do app' };
    }
  }

  async function compartilhar(titulo, uri) {
    try { await Share.share({ title: titulo, dialogTitle: titulo, url: uri }); } catch (_) { /* usuário fechou */ }
  }

  function avisar(msg) {
    // Depois do toast do próprio app, informa onde o arquivo ficou
    setTimeout(() => window.App && App.mostrarToast(msg, 'sucesso'), 2200);
  }

  function escolherArquivo(accept) {
    return new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.addEventListener('change', () => resolve(input.files[0] || null), { once: true });
      input.addEventListener('cancel', () => resolve(null), { once: true });
      input.click();
    });
  }

  async function lerTemplate() {
    const resp = await fetch('ficha-template.pdf');
    return new Uint8Array(await resp.arrayBuffer());
  }

  window.electronAPI = {
    async salvarPersonagem(dados) {
      const nome = `${nomeSeguro(dados.nome)}.json`;
      const r = await gravar(nome, JSON.stringify(dados, null, 2), true);
      avisar(`Salvo em ${r.local}/${nome}`);
      return { sucesso: true, caminho: r.uri };
    },

    async carregarPersonagem() {
      const arq = await escolherArquivo('application/json,.json');
      if (!arq) return { sucesso: false };
      try {
        const texto = await arq.text();
        const dados = JSON.parse(texto);
        // Guarda uma cópia interna para a lista de recentes
        const r = await Filesystem.writeFile({ path: `${PASTA}/recentes/${nomeSeguro(dados.nome)}.json`, data: texto, encoding: 'utf8', directory: 'DATA', recursive: true });
        return { sucesso: true, dados, caminho: r.uri };
      } catch (err) {
        App.mostrarToast('Arquivo inválido: ' + err.message, 'erro');
        return { sucesso: false };
      }
    },

    async carregarPersonagemDireto(caminho) {
      try {
        const r = await Filesystem.readFile({ path: caminho, encoding: 'utf8' });
        return { sucesso: true, dados: JSON.parse(r.data), caminho };
      } catch (err) {
        return { sucesso: false, erro: err.message };
      }
    },

    async exportarPDF(payload) {
      try {
        const bytes = await window.preencherFicha(window.PDFLib, await lerTemplate(), payload);
        const nome = `${nomeSeguro(payload.personagem.nome)}-ficha.pdf`;
        const r = await gravar(nome, bytesParaBase64(bytes), false);
        avisar(`PDF salvo em ${r.local}/${nome}`);
        await compartilhar('Ficha de ' + (payload.personagem.nome || 'personagem'), r.uri);
        return { sucesso: true, caminho: r.uri };
      } catch (err) {
        return { sucesso: false, erro: err.message };
      }
    },

    async salvarJSON(dados, nome, titulo) {
      try {
        const arquivo = `${nomeSeguro(nome || 'exportacao')}.json`;
        const r = await gravar(arquivo, JSON.stringify(dados, null, 2), true);
        avisar(`Salvo em ${r.local}/${arquivo}`);
        await compartilhar(titulo || 'Exportar JSON', r.uri);
        return { sucesso: true, caminho: r.uri };
      } catch (err) {
        return { sucesso: false, erro: err.message };
      }
    },
  };

  // Botão "voltar" do Android: volta uma tela/etapa em vez de fechar o app
  if (Cap.Plugins.App) {
    Cap.Plugins.App.addListener('backButton', () => {
      const ativa = document.querySelector('.tela.ativa')?.id;
      if (ativa === 'tela-wizard') {
        if (Estado.passoAtual > 0) App.passoAnterior(); else App.voltarInicio();
      } else if (ativa && ativa !== 'tela-inicio') {
        App.mostrarTela('inicio');
      } else {
        Cap.Plugins.App.exitApp();
      }
    });
  }
})();
