#!/usr/bin/env node
// Fase 1.1 — Pipeline de extração dos PDFs da Jambô
// Uso: node tools/extract-rulebooks/extract.js
// Saída: tools/pdf-extracts/<livro>.txt (gitignored)

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PDF_DIR = path.resolve(
  __dirname,
  '../../..',
  'Fabula Ultima Originais-20260427T020549Z-3-001/Fabula Ultima Originais'
);
const OUT_DIR = path.resolve(__dirname, '../pdf-extracts');

const LIVROS = [
  { arquivo: 'FU-Livro-Basico.pdf',      saida: 'livro-basico.txt' },
  { arquivo: 'FU-High-Fantasy.pdf',       saida: 'high-fantasy.txt' },
  { arquivo: 'FU-Natural-Fantasy.pdf',    saida: 'natural-fantasy.txt' },
  { arquivo: 'FU-Techno-Fantasy.pdf',     saida: 'techno-fantasy.txt' },
  { arquivo: 'FU-Codex-Extra.pdf',        saida: 'codex-extra.txt' },
  { arquivo: 'FU-Herdeiros-da-Supernova.pdf', saida: 'herdeiros-supernova.txt' },
  { arquivo: 'FU-Guia-do-Mestre.pdf',     saida: 'guia-mestre.txt' },
  { arquivo: 'FU-Escudo-do-Mestre.pdf',   saida: 'escudo-mestre.txt' },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('=== Extração de PDFs — Fabula Ultima PT-BR ===\n');

for (const livro of LIVROS) {
  const entrada = path.join(PDF_DIR, livro.arquivo);
  const saida   = path.join(OUT_DIR,  livro.saida);

  if (!fs.existsSync(entrada)) {
    console.warn(`  SKIP  ${livro.arquivo} — arquivo não encontrado`);
    continue;
  }

  process.stdout.write(`  Extraindo ${livro.arquivo}...`);
  try {
    execSync(`pdftotext -enc UTF-8 "${entrada}" "${saida}"`, { stdio: 'pipe' });
    const kb = Math.round(fs.statSync(saida).size / 1024);
    console.log(` OK (${kb} KB)`);
  } catch (e) {
    console.log(` ERRO: ${e.message}`);
  }
}

console.log('\nExtração concluída. Arquivos em: tools/pdf-extracts/');
console.log('Próximo passo: node tools/extract-rulebooks/parse-classes.js');
