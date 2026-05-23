#!/usr/bin/env node
// Sincroniza os poderes das 19 classes de expansão em GAMEDATA.js
// a partir do classes-expansoes.json (fonte de verdade após extração).
// Preserva beneficiosIniciais (normalizados) e marcialEquip já presentes.

const fs   = require('fs');
const path = require('path');

const JSON_FILE     = path.resolve(__dirname, '../../data/rules/classes-expansoes.json');
const GAMEDATA_FILE = path.resolve(__dirname, '../../renderer/data/gamedata.js');

const { classes } = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
let gamedata = fs.readFileSync(GAMEDATA_FILE, 'utf8');

const classesStart = gamedata.indexOf('  classes: [');
const armasStart   = gamedata.indexOf('\n  // ARMAS BÁSICAS');

let changes = 0, errors = 0;

for (const cl of classes) {
  // Localiza o início da entrada da classe pelo id
  const marker  = `      id: "${cl.id}",`;
  const clStart = gamedata.indexOf(marker, classesStart);
  if (clStart === -1 || clStart > armasStart) {
    console.log('❌ Classe não encontrada no GAMEDATA:', cl.id);
    errors++;
    continue;
  }

  // Localiza o bloco poderes: [ ... ] após o início da classe
  const poderesStart = gamedata.indexOf('\n      poderes: [', clStart);
  if (poderesStart === -1) {
    console.log('❌ Bloco poderes não encontrado para:', cl.id);
    errors++;
    continue;
  }

  // Encontra o ] correspondente contando brackets
  let depth = 0, pos = poderesStart + 1, foundClose = -1;
  while (pos < gamedata.length) {
    const ch = gamedata[pos];
    if (ch === '[')      depth++;
    else if (ch === ']') { depth--; if (depth === 0) { foundClose = pos; break; } }
    pos++;
  }
  if (foundClose === -1) {
    console.log('❌ Fechamento do bloco poderes não encontrado para:', cl.id);
    errors++;
    continue;
  }

  // Gera o novo bloco poderes
  const linhas = ['', '      poderes: ['];
  for (const p of cl.poderes) {
    // Escapa aspas duplas e barras invertidas dentro da descricao
    const desc  = p.descricao.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const custo = p.custo ? `, custo: "${p.custo}"` : '';
    linhas.push(`        { id: "${p.id}", nome: "${p.nome}", repeticoes: 1${custo}, descricao: "${desc}" },`);
  }
  linhas.push('      ]');
  const novoBloco = linhas.join('\n');

  // Substitui o bloco antigo pelo novo
  gamedata = gamedata.slice(0, poderesStart) + novoBloco + gamedata.slice(foundClose + 1);
  changes++;
  console.log(`  ✅ ${cl.nome} (${cl.poderes.length} poderes)`);
}

if (errors === 0) {
  fs.writeFileSync(GAMEDATA_FILE, gamedata, 'utf8');
  console.log(`\n✅ GAMEDATA.js atualizado — ${changes} classes sincronizadas.`);
} else {
  console.log(`\n❌ ${errors} erro(s) — GAMEDATA.js NÃO foi sobrescrito.`);
  process.exit(1);
}
