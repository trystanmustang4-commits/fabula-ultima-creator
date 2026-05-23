#!/usr/bin/env node
// Fase 1.1 — Parser de Zero Powers do Atlas: Alta Fantasia
// Produz data/rules/zero-powers.json
// Uso: node tools/extract-rulebooks/parse-zero-powers.js

const fs   = require('fs');
const path = require('path');

const TXT_DIR  = path.resolve(__dirname, '../pdf-extracts');
const OUT_DIR  = path.resolve(__dirname, '../../data/rules');
const OUT_FILE = path.join(OUT_DIR, 'zero-powers.json');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function lerTxt(nome) {
  const p = path.join(TXT_DIR, nome);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : '';
}

function toId(nome) {
  return nome.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

function limpar(txt) {
  return txt.replace(/\x8a/g, ' ').replace(/\s+/g, ' ').trim();
}

const reNumPag = /^\d{1,3}$/;
const IGNORAR  = new Set(['W', '', 'PROTAGONISTAS', '3 CAPÍTULO', 'PROTAGONISTAS']);

console.log('=== Parser de Zero Powers — Atlas: Alta Fantasia ===\n');

const txt    = lerTxt('high-fantasy.txt');
const linhas = txt.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

// Âncora: seção de variantes dentro do capítulo PODERES ZERO
const ANCHOR = 'VARIANTES DOS PODERES ZERO';
const anchorIdx = linhas.findIndex(l => l.trim() === ANCHOR);

if (anchorIdx === -1) {
  console.error('ERRO: âncora "VARIANTES DOS PODERES ZERO" não encontrada');
  process.exit(1);
}

console.log(`  Âncora "${ANCHOR}" @ linha ${anchorIdx + 1}`);

const BULLET_CHAR = 0x64; // 'd' — mesmo char-bala usado nas peculiaridades HF
const STOP = new Set(['NOVOS PERSONAGENS CLÁSSICOS', 'NOVOS PODERES HEROICOS', 'NOVAS CLASSES']);

const section = linhas.slice(anchorIdx + 1);

// Passo 1: índices de entradas
const limites = [];
for (let i = 0; i < section.length; i++) {
  const l = section[i].trim();
  if (STOP.has(l)) break;
  if (l.charCodeAt(0) === BULLET_CHAR && l[1] === ' ') limites.push(i);
}

// Passo 2: extrair nome + descrição
const zeroPowers = [];
for (let bi = 0; bi < limites.length; bi++) {
  const start = limites[bi];
  const end   = bi + 1 < limites.length ? limites[bi + 1] : section.length;
  const nomeRaw = section[start].trim().slice(2).trim();

  const descLinhas = [];
  for (let k = start + 1; k < end; k++) {
    const l = section[k].trim();
    if (!l || IGNORAR.has(l) || reNumPag.test(l)) continue;
    if (STOP.has(l)) break;
    descLinhas.push(l);
  }

  zeroPowers.push({
    id: toId(nomeRaw),
    nome: nomeRaw.charAt(0) + nomeRaw.slice(1).toLowerCase()
      .replace(/ ([a-z])/g, (_, c) => ' ' + c.toUpperCase())
      .replace(/^([A-Z])/, c => c),
    nomeRaw,
    sourceBook: 'Atlas: Alta Fantasia',
    descricao: limpar(descLinhas.join(' ')),
  });
}

// Também incluir a descrição do sistema base de Poderes Zero
const idxSistema = linhas.findIndex(l => l.trim() === 'PODERES ZERO');
let descSistema = '';
if (idxSistema >= 0) {
  const linhasSist = [];
  for (let i = idxSistema + 1; i < linhas.length; i++) {
    const l = linhas[i].trim();
    if (l === 'NOVOS PERSONAGENS CLÁSSICOS' || l === 'NOVAS CLASSES' || l === 'PROTAGONISTAS') break;
    if (l === 'CRIANDO UM PODER ZERO') break; // pára antes das mecânicas detalhadas
    if (!l || IGNORAR.has(l) || reNumPag.test(l)) continue;
    linhasSist.push(l);
  }
  descSistema = limpar(linhasSist.join(' '));
}

const resultado = {
  sistema: {
    id: 'poderes_zero',
    nome: 'Poderes Zero',
    sourceBook: 'Atlas: Alta Fantasia',
    sourcePage: 124,
    descricao: descSistema,
  },
  variantes: zeroPowers,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(resultado, null, 2), 'utf-8');

console.log(`  Variantes encontradas: ${zeroPowers.length}`);
zeroPowers.forEach(z => console.log(`    - ${z.nome}`));
console.log(`\n✅ Zero Powers extraídos → ${OUT_FILE}`);
console.log('\nPróximo passo: adicionar classes ao GAMEDATA (Fase 1.2)');
