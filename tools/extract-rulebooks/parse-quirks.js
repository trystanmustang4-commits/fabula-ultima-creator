#!/usr/bin/env node
// Fase 1.1 — Parser de peculiaridades das expansões
// Lê os TXTs extraídos e produz data/rules/quirks.json
// Uso: node tools/extract-rulebooks/parse-quirks.js

const fs   = require('fs');
const path = require('path');

const TXT_DIR  = path.resolve(__dirname, '../pdf-extracts');
const OUT_DIR  = path.resolve(__dirname, '../../data/rules');
const OUT_FILE = path.join(OUT_DIR, 'quirks.json');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ──────────────────── Utilitários ───────────────────────────────

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

const MINUSCULAS_PT = new Set([
  'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'uns', 'umas',
  'os', 'as', 'e', 'ou', 'que', 'te', 'na', 'no', 'nos', 'nas',
  'por', 'a', 'o', 'ao', 'em', 'com', 'se', 'me', 'lhe',
]);

function toTitleCasePT(str) {
  return str.toLowerCase().split(' ').map((word, i) => {
    // Strip punctuation for article/preposition check
    const bare = word.replace(/[^a-záéíóúàâêôãõç]/gi, '');
    if (i !== 0 && MINUSCULAS_PT.has(bare)) return word;
    // Capitalize first alpha char, and first alpha char after each hyphen
    return word
      .replace(/[a-záéíóúàâêôãõç]/i, c => c.toUpperCase())
      .replace(/-([a-záéíóúàâêôãõç])/gi, (_, c) => '-' + c.toUpperCase());
  }).join(' ');
}

// ──────────────────── Constantes globais ────────────────────────

const reNumPag = /^\d{1,3}$/;

// Linhas a ignorar em qualquer livro (artefatos de paginação e cabeçalhos)
const IGNORAR_GLOBAL = new Set([
  'W', 'O', 'N', '',
  'PROTAGONISTAS', 'CAPÍTULO', '3 CAPÍTULO',
  'NOVAS OPÇÕES CAPÍTULO 1', 'CAPÍTULO 1 NOVAS OPÇÕES',
  'NOVAS OPÇÕES CAPÍTULO 3', 'CAPÍTULO 3 NOVAS OPÇÕES',
  'PECULIARIDADES EM JOGO', 'O QUE SÃO PECULIARIDADES?',
  'MAS… ISSO É TUDO?',
]);

// ──────────────────── Parser por livro ──────────────────────────

// Retorna array de { id, nome, nomeRaw, sourceBook, descricao }
function parsearComBullet(linhas, anchorIdx, bulletChar, stopSet) {
  const section = linhas.slice(anchorIdx + 1);
  const quirks  = [];

  // Passo 1: encontrar índices de entradas (linhas começando com o char-bala)
  const limites = [];
  for (let i = 0; i < section.length; i++) {
    const l = section[i].trim();
    if (stopSet.has(l)) break;
    if (l.charCodeAt(0) === bulletChar && l[1] === ' ') {
      const nome = l.slice(2).trim();
      if (stopSet.has(nome)) break;
      limites.push(i);
    }
  }

  // Passo 2: extrair descrição entre limites consecutivos
  for (let bi = 0; bi < limites.length; bi++) {
    const start = limites[bi];
    const end   = bi + 1 < limites.length ? limites[bi + 1] : section.length;
    const nomeRaw = section[start].trim().slice(2).trim();

    const descLinhas = [];
    for (let k = start + 1; k < end; k++) {
      const l = section[k].trim();
      if (!l || IGNORAR_GLOBAL.has(l) || reNumPag.test(l)) continue;
      if (stopSet.has(l)) break;
      // Bullet-prefixed stop entries (ex: TF usa "» NADA TÃO ESPECIAL" como entradas com bala)
      if (l.charCodeAt(0) === bulletChar && l[1] === ' ' && stopSet.has(l.slice(2).trim())) break;
      descLinhas.push(l);
    }

    quirks.push({
      id: toId(nomeRaw),
      nome: toTitleCasePT(nomeRaw),
      nomeRaw,
      descricao: limpar(descLinhas.join(' ')),
    });
  }

  return quirks;
}

// CE: sem char-bala, entradas são linhas CAIXA_ALTA numa janela delimitada
const NOME_QUIRK_CE = /^[(A-ZÁÉÍÓÚÀÂÊÔÃÕÇ][ A-ZÁÉÍÓÚÀÂÊÔÃÕÇ?'\-,()]+$/;

function parsearCE(linhas, anchorIdx, stopSet) {
  const section = linhas.slice(anchorIdx + 1);
  const quirks  = [];

  // Passo 1: identificar linhas que são nomes de peculiaridade
  const limites = [];
  for (let i = 0; i < section.length; i++) {
    const l = section[i].trim();
    if (stopSet.has(l) || stopSet.has(l.toLowerCase())) break;
    if (!l || IGNORAR_GLOBAL.has(l) || reNumPag.test(l)) continue;
    if (NOME_QUIRK_CE.test(l) && l.length > 3 && l.length < 60) {
      limites.push(i);
    }
  }

  // Passo 2: extrair descrição entre limites consecutivos
  for (let bi = 0; bi < limites.length; bi++) {
    const start = limites[bi];
    const end   = bi + 1 < limites.length ? limites[bi + 1] : section.length;
    const nomeRaw = section[start].trim();

    const descLinhas = [];
    for (let k = start + 1; k < end; k++) {
      const l = section[k].trim();
      if (!l || IGNORAR_GLOBAL.has(l) || reNumPag.test(l)) continue;
      if (stopSet.has(l) || stopSet.has(l.toLowerCase())) break;
      if (NOME_QUIRK_CE.test(l) && l.length > 3 && l.length < 60) break;
      descLinhas.push(l);
    }

    quirks.push({
      id: toId(nomeRaw),
      nome: toTitleCasePT(nomeRaw),
      nomeRaw,
      descricao: limpar(descLinhas.join(' ')),
    });
  }

  return quirks;
}

// ──────────────────── Configuração por livro ────────────────────
// bulletChar: código do char-bala após trim(); null = modo CE (sem bala)
// anchor: string exata que delimita o início da seção
// stopSet: linhas (trimadas) que encerram a varredura
// stopNames: nomes de entradas (após o bullet) que encerram (para TF)

const LIVROS_QUIRK = [
  {
    txt:        'high-fantasy.txt',
    sourceBook: 'Atlas: Alta Fantasia',
    bulletChar: 0x64, // 'd'
    stopSet: new Set(['PODERES ZERO', 'NOVOS PODERES HEROICOS']),
  },
  {
    txt:        'natural-fantasy.txt',
    sourceBook: 'Atlas: Fantasia Natural',
    bulletChar: 0x39, // '9'
    stopSet: new Set(['ATIVIDADES DE ACAMPAMENTO', 'NOVOS PODERES HEROICOS']),
  },
  {
    txt:        'techno-fantasy.txt',
    sourceBook: 'Atlas: Tecno-Fantasia',
    bulletChar: 0xBB, // '»'
    // Variantes de cenário que usam o mesmo bullet mas NÃO são peculiaridades de personagem
    stopSet: new Set([
      'NOVOS PODERES HEROICOS',
      'NADA TÃO ESPECIAL (OU NÃO?)',
      'MONOPÓLIO DA COMPETÊNCIA',
      'ESPÍRITO CONDENSADO',
    ]),
  },
  {
    txt:        'codex-extra.txt',
    sourceBook: 'Codex Extra',
    bulletChar: null, // modo CE
    stopSet: new Set(['novas classes', 'NOVAS CLASSES', 'CAPÍTULO 2', 'novos poderes heroicos']),
  },
];

// ──────────────────── Execução ───────────────────────────────────

const resultado = { quirks: [], erros: [], avisos: [] };
const txtsCache = {};

console.log('=== Parser de Peculiaridades — Expansões Fabula Ultima ===\n');

for (const cfg of LIVROS_QUIRK) {
  if (!txtsCache[cfg.txt]) txtsCache[cfg.txt] = lerTxt(cfg.txt);
  const txt = txtsCache[cfg.txt];

  if (!txt) {
    console.log(`  SKIP  ${cfg.txt} — arquivo não encontrado`);
    resultado.erros.push({ livro: cfg.sourceBook, erro: 'Arquivo TXT não encontrado' });
    continue;
  }

  const linhas = txt.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // Encontrar âncora — última ocorrência (case-insensitive) para ignorar TOC
  let anchorIdx = -1;
  for (let i = linhas.length - 1; i >= 0; i--) {
    const t = linhas[i].trim();
    if (t === 'NOVAS PECULIARIDADES' || t === 'novas peculiaridades') {
      anchorIdx = i;
      break;
    }
  }

  if (anchorIdx === -1) {
    console.log(`  ERRO  ${cfg.sourceBook} — âncora "NOVAS PECULIARIDADES" não encontrada`);
    resultado.erros.push({ livro: cfg.sourceBook, erro: 'Âncora não encontrada' });
    continue;
  }

  process.stdout.write(`  Parseando ${cfg.sourceBook} (âncora @ linha ${anchorIdx + 1})...`);

  let quirks;
  if (cfg.bulletChar !== null) {
    quirks = parsearComBullet(linhas, anchorIdx, cfg.bulletChar, cfg.stopSet);
  } else {
    quirks = parsearCE(linhas, anchorIdx, cfg.stopSet);
  }

  if (quirks.length === 0) {
    console.log(` AVISO: 0 peculiaridades encontradas — verificar âncora ou padrão`);
    resultado.avisos.push({ livro: cfg.sourceBook, aviso: 'Nenhuma peculiaridade extraída' });
  } else {
    console.log(` OK (${quirks.length} peculiaridades)`);
    if (quirks.length < 5) {
      resultado.avisos.push({ livro: cfg.sourceBook, aviso: `POUCOS RESULTADOS (${quirks.length}) — verificar extração` });
    }
  }

  for (const q of quirks) {
    resultado.quirks.push({ ...q, sourceBook: cfg.sourceBook });
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(resultado, null, 2), 'utf-8');

console.log(`\n✅ ${resultado.quirks.length} peculiaridades extraídas → ${OUT_FILE}`);
if (resultado.erros.length)   console.log(`⚠️  ${resultado.erros.length} erro(s): ${resultado.erros.map(e => e.livro).join(', ')}`);
if (resultado.avisos.length)  console.log(`⚠️  ${resultado.avisos.length} aviso(s): ${resultado.avisos.map(a => a.livro).join(', ')}`);
console.log('\nPróximo passo: node tools/extract-rulebooks/parse-zero-powers.js');
