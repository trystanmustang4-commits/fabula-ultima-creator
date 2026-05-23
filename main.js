const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

// Slot de imagem na ficha (página 1, pdf-lib coords: origem bottom-left, y sobe)
// Coluna central, abaixo do logo FU, acima do bloco PV. Retrato vertical.
// NUNCA chamar form.flatten() — campos AcroForm devem permanecer editáveis no PDF gerado.
const PDF_IMG_SLOT = { x: 432, y: 400, w: 118, h: 125 };

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
    backgroundColor: '#1a1a2e',
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
    const { PDFDocument, StandardFonts } = require('pdf-lib');
    const templatePath = path.join(__dirname, 'assets', 'ficha-template.pdf');
    const pdfDoc = await PDFDocument.load(fs.readFileSync(templatePath));
    const form = pdfDoc.getForm();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const p = payload.personagem;
    const stats = payload.stats;
    const armas = payload.armas || [];

    const setTexto = (nome, valor) => {
      try {
        const f = form.getTextField(nome);
        f.setText(String(valor ?? ''));
        f.updateAppearances(helvetica);
      } catch (_) {}
    };
    const setCheck = (nome, marcado) => {
      try { marcado ? form.getCheckBox(nome).check() : form.getCheckBox(nome).uncheck(); } catch (_) {}
    };

    // ── IDENTIDADE ───────────────────────────────────────────────────
    setTexto('Nome',      p.nome);
    setTexto('Genere',    p.pronomes);
    setTexto('Identita',  p.identidade);
    setTexto('Tema',      payload.temaNome);
    setTexto('Origine',   p.origem);

    // Nome no topo das páginas 2 e 3
    setTexto('Campo testo 252', p.nome);
    setTexto('Campo testo 236', p.nome);

    // ── PONTOS ───────────────────────────────────────────────────────
    setTexto('PuntiFabula',     '3');
    setTexto('PuntiEsperienza', '0');

    // ── ATRIBUTOS (Pág.1, pares a x=625/667, y=491-556)
    // 4 pares empilhados: cada par = dado + valor numérico do dado
    const valDado = (d) => String(parseInt(d.slice(1)) || 8);
    setTexto('Campo testo 270', p.atributos.des);       setTexto('Campo testo 271', valDado(p.atributos.des));
    setTexto('Campo testo 272', p.atributos.vig);       setTexto('Campo testo 273', valDado(p.atributos.vig));
    setTexto('Campo testo 274', p.atributos.ast);       setTexto('Campo testo 275', valDado(p.atributos.ast));
    setTexto('Campo testo 276', p.atributos.von);       setTexto('Campo testo 277', valDado(p.atributos.von));

    // ── ESTATÍSTICAS (Pág.1, mapeamento confirmado visualmente) ──────
    // PV: máx [280], atual [282] | PM: máx [278], atual [283]
    // PI: máx [279], atual [284] | Crise [281] | Nível [10207]
    setTexto('Campo testo 280', String(stats.pvMax));
    setTexto('Campo testo 282', String(stats.pvMax));   // atual = máx no início
    setTexto('Campo testo 278', String(stats.pmMax));
    setTexto('Campo testo 283', String(stats.pmMax));   // atual = máx no início
    setTexto('Campo testo 279', String(stats.piMax));
    setTexto('Campo testo 284', String(stats.piMax));   // atual = máx no início
    setTexto('Campo testo 281', String(stats.crise));
    setTexto('Campo testo 10207', String(p.nivel));

    // Defesa, Def. Mágica, Iniciativa (campos nomeados)
    setTexto('Difesa',        String(stats.defesa));
    setTexto('DifesaMagica',  String(stats.defMagica));
    setTexto('ModIniziativa', stats.iniciativa >= 0 ? `+${stats.iniciativa}` : String(stats.iniciativa));

    // ── LAÇOS (Pág.1) ────────────────────────────────────────────────
    // Por bond: 3 pares de checkboxes (x=105→par A, x=149→par B, x=191→par C)
    // Linha y maior = primeira opção do par, y menor = segunda opção
    const bondMap = [
      { campo:'Legame1', em:{ admiracao:'C1059', inferioridade:'C1044', lealdade:'C185',  desconfianca:'C186',  afeto:'C187',  odio:'C188'  }},
      { campo:'Legame2', em:{ admiracao:'C1045', inferioridade:'C1046', lealdade:'C189',  desconfianca:'C190',  afeto:'C191',  odio:'C192'  }},
      { campo:'Legame3', em:{ admiracao:'C1047', inferioridade:'C1048', lealdade:'C193',  desconfianca:'C194',  afeto:'C195',  odio:'C196'  }},
      { campo:'Legame4', em:{ admiracao:'C1049', inferioridade:'C1050', lealdade:'C197',  desconfianca:'C198',  afeto:'C199',  odio:'C200'  }},
      { campo:'Legame5', em:{ admiracao:'C1051', inferioridade:'C1052', lealdade:'C201',  desconfianca:'C202',  afeto:'C203',  odio:'C204'  }},
      { campo:'Legame6', em:{ admiracao:'C1053', inferioridade:'C1054', lealdade:'C205',  desconfianca:'C206',  afeto:'C207',  odio:'C2010' }},
    ];
    for (let i = 0; i < 6; i++) {
      const laco = p.lacos[i] || { alvo: '', emocoes: [] };
      setTexto(bondMap[i].campo, laco.alvo || '');
      Object.entries(bondMap[i].em).forEach(([emId, cbName]) => setCheck(cbName, laco.emocoes.includes(emId)));
    }

    // ── PROFICIÊNCIA MARCIAL ─────────────────────────────────────────
    setCheck('EquipMischia',  payload.marcial.armas_corpo_a_corpo);
    setCheck('EquipDist',     payload.marcial.armas_distancia);
    setCheck('EquipArmature', payload.marcial.armaduras);
    setCheck('EquipScudi',    payload.marcial.escudos);

    // ── EQUIPAMENTO (Pág.1, esquerda inferior) ───────────────────────
    setTexto('Mano1Equip',          armas[0]?.nome  || '');
    setTexto('Mano1EquipDesc',      armas[0]?.stats || '');
    setTexto('Mano2Equip',          armas[1]?.nome  || '');
    setTexto('Mano2EquipDesc',      armas[1]?.stats || '');
    setTexto('ArmaturaEquip',       payload.armadura?.nome  || 'Sem armadura');
    setTexto('ArmaturaEquipDesc',   payload.armadura?.stats || '');
    setTexto('AccessorioEquip',     payload.escudo?.nome    || '');
    setTexto('AccessorioEquipDesc', payload.escudo?.stats   || '');
    setTexto('Zenit 2', `${Math.max(0, 500 - (payload.gastoEquip || 0))}z`);

    // ── MOCHILA (Pág.1, ZainoAppunti 2 x=21, y=89) ──────────────────
    // Armas extras além dos 2 slots + aparência do personagem
    const armasExtras = armas.slice(2).map(a => `• ${a.nome} — ${a.stats}`);
    const mochila = [
      armasExtras.length ? `ARMAS EXTRAS:\n${armasExtras.join('\n')}` : '',
      p.aparencia ? `APARÊNCIA:\n${p.aparencia}` : '',
    ].filter(Boolean).join('\n\n');
    setTexto('ZainoAppunti 2', mochila);

    // ── CLASSES E PODERES (Pág.1, direita x=441-660) ─────────────────
    // 3 blocos verticais: header [y=331/224/117] + poderes [y=303/196/89]
    // Estrutura: Campo 285 (nome), 286 (nível), 10208 (poderes com descrição)
    const classesCamposP1 = [
      { nome: 'Campo testo 285', nivel: 'Campo testo 286', poderes: 'Campo testo 10208' },
      { nome: 'Campo testo 287', nivel: 'Campo testo 288', poderes: 'Campo testo 10209' },
      { nome: 'Campo testo 289', nivel: 'Campo testo 290', poderes: 'Campo testo 102010' },
    ];
    (payload.classes || []).forEach((cl, i) => {
      if (i >= 3) return;
      setTexto(classesCamposP1[i].nome,   cl.nome);
      setTexto(classesCamposP1[i].nivel,  `Nível ${cl.niveis}`);
      const textoPoders = [
        `Benefícios: ${cl.beneficios}`,
        '',
        ...cl.poderes
      ].join('\n');
      setTexto(classesCamposP1[i].poderes, textoPoders);
    });

    // ── NOTAS DE PERSONAGEM (Pág.2, campos largos) ───────────────────
    const notasPersonagem = [
      p.aparencia ? `Aparência:\n${p.aparencia}`     : '',
      p.descricao ? `Personalidade:\n${p.descricao}` : '',
    ].filter(Boolean).join('\n\n');
    setTexto('Campo testo 10269', notasPersonagem);
    setTexto('ZainoAppunti 3',    p.origemDesc    || '');
    setTexto('Campo testo 10270', p.temaDescricao || '');

    // ── IMAGEM DO PERSONAGEM (Pág.1, slot visual) ────────────────────
    if (p.imagem) {
      try {
        const b64 = p.imagem.replace(/^data:image\/\w+;base64,/, '');
        const imgBytes = Buffer.from(b64, 'base64');
        const isJpg = p.imagem.startsWith('data:image/jpeg') || p.imagem.startsWith('data:image/jpg');
        const pdfImg = isJpg ? await pdfDoc.embedJpg(imgBytes) : await pdfDoc.embedPng(imgBytes);
        const { width: imgW, height: imgH } = pdfImg.scale(1);
        const scale = Math.min(PDF_IMG_SLOT.w / imgW, PDF_IMG_SLOT.h / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        pdfDoc.getPages()[0].drawImage(pdfImg, {
          x: PDF_IMG_SLOT.x + (PDF_IMG_SLOT.w - drawW) / 2,
          y: PDF_IMG_SLOT.y + (PDF_IMG_SLOT.h - drawH) / 2,
          width:  drawW,
          height: drawH,
        });
      } catch (imgErr) {
        console.warn('[exportar-pdf] Falha ao embedar imagem:', imgErr.message);
      }
    }

    const pdfBytes = await pdfDoc.save();
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
