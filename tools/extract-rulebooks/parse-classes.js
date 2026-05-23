#!/usr/bin/env node
// Fase 1.1 — Parser de classes das expansões
// Lê os TXTs extraídos e produz data/rules/classes-expansoes.json
// Uso: node tools/extract-rulebooks/parse-classes.js

const fs   = require('fs');
const path = require('path');

const TXT_DIR  = path.resolve(__dirname, '../pdf-extracts');
const OUT_DIR  = path.resolve(__dirname, '../../data/rules');
const OUT_FILE = path.join(OUT_DIR, 'classes-expansoes.json');

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

// ──────────────────── Estrutura esperada no TXT ──────────────────
// BENEFÍCIOS INICIAIS DE [NOME]
// ... linhas de benefício (começam com espaço + "Aumente" ou "Você pode")
// PODERES DE [NOME]
// NOME DO PODER
// (çN)               ← opcional: custo PM / nível do poder
// descrição do poder...
// NOME DO PRÓXIMO PODER
// ...

function parsearClasseDoTxt(txt, nomeClasse, sourceBook, sourcePage) {
  const linhas = txt.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const nomeU  = nomeClasse.toUpperCase();

  const marcaBeneficios = `BENEFÍCIOS INICIAIS DE ${nomeU}`;
  const marcaPoderes    = `PODERES DE ${nomeU}`;

  const idxBen = linhas.findIndex(l => l.trim() === marcaBeneficios);
  const idxPow = linhas.findIndex(l => l.trim() === marcaPoderes);

  if (idxBen === -1 || idxPow === -1) {
    return { erro: `Seção não encontrada para "${nomeClasse}"` };
  }

  // ─── Benefícios iniciais ──────────────────────────────────────
  // pdftotext usa 0x8A como separador de bullet entre benefícios
  const beneficiosIniciais = [];
  const linhasBen = linhas.slice(idxBen + 1, idxPow).map(l => l.trim()).filter(Boolean);
  const textoBen  = linhasBen.join(' ');
  const partesBen = textoBen
    .split(/[\x8a•]/)
    .map(s => s.trim()).filter(s => s.length > 5);
  for (const b of partesBen) {
    if (/^(Aumente|Você|Seus|Quando|Receba|Os |Se )/.test(b)) {
      beneficiosIniciais.push(limpar(b));
    }
  }

  // ─── Poderes — dois passos ────────────────────────────────────
  const poderesRaw = linhas.slice(idxPow + 1);
  const poderes    = [];

  const IGNORAR = new Set([
    // Chars e artefatos de página
    'W', 'O', 'N', '',
    // Cabeçalhos de seção/capítulo já conhecidos
    'PROTAGONISTAS', 'CAPÍTULO', 'NOVAS CLASSES',
    'CAPÍTULO 2 NOVAS CLASSES', 'NOVAS OPÇÕES', 'CAPÍTULO 1 NOVAS OPÇÕES',
    // Cabeçalhos de colunas em tabelas de subsistemas
    'DURAÇÃO', 'EFEITO', 'EVENTO', 'REQUISITO', 'DESCRIÇÃO', 'AURA', 'FOCO',
    // Artefatos de capítulo do Codex Extra
    'NOVAS CLASSES CAPÍTULO 2',
    // Nomes das 19 classes de expansão — usados case-insensitive (aparecem como títulos
    // de capítulo antes da âncora formal, em maiúsculas, PascalCase e minúsculas)
    'COMANDANTE', 'DANÇARINO', 'SIMBOLISTA', 'VIRTUOSO',
    'FLORALISTA', 'GOURMET', 'INVOCADOR', 'MERCADOR',
    'ESPER', 'MUTANTE', 'PILOTO',
    'ASTRÓLOGO', 'BANDOLEIRO', 'CARTEADOR', 'CAVALEIRO MÁGICO',
    'FORJADOR DE ALMAS', 'LÂMINA CARMESIM', 'MALANDRO', 'NECROMANTE',
  ]);

  // Linhas que indicam início de seção de subsistema (não são poderes de classe)
  const SEC_BREAK = new Set([
    // Atlas: Alta Fantasia
    'VERSOS',                              // Virtuoso: seção de versos
    'DANÇAS',                              // Dançarino: lista de danças
    'NOVOS PODERES HEROICOS',              // fim da seção de classes em todos os Atlas
    // Atlas: Fantasia Natural
    'INGREDIENTES E IGUARIAS',             // Gourmet: subsistema de culinária
    'EFEITOS DE MAGISSEMENTES',            // Floralista: tabela de efeitos
    'DETERMINANDO MANANCIAIS DISPONÍVEIS', // Invocador: mecânicas de invocação
    // Atlas: Tecno-Fantasia
    'USANDO UM DOM',                       // Esper: subsistema de dons psíquicos
    'TERIOFORMAS',                         // Mutante: lista de terioformas
    'O VEÍCULO DO PILOTO',                 // Piloto: regras do veículo pessoal
    // Codex Extra
    'USANDO UM CONJUNTO',                  // Carteador: subsistema de conjuntos de cartas
    'MOTIVAÇÃO ALVOS',                     // Cavaleiro Mágico: tabela de forma mágica
    'SÍMBOLOS',                            // Simbolista: seção de regras dos símbolos
    'MAGISSEMENTES',                       // Floralista: cabeçalho de página (\fMAGISSEMENTES)
    'BENEFÍCIO ADICIONAL POR ESPÉCIE',     // Forjador de Almas: tabela de Pontos de Alma
    'FEITIÇOS',                            // Necromante: bloco de stats de NPC (Lady Carmilla)
    'pontos de alma',                      // Forjador de Almas: seção de subsistema (\fpontos de alma)
    'lady carmilla',                       // Necromante: NPC de exemplo (\flady carmilla)
  ]);

  const reNomePoder  = /^[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ][A-ZÁÉÍÓÚÀÂÊÔÃÕÇ '\-,()]+$/;
  const reCusto      = /^\(ç\d\)$/;
  const reNumPag     = /^\d{1,3}$/;
  // Poderes que pdftotext coloca nome + descrição na mesma linha (ex: TROCA DE FIGURINO, SAL E PIMENTA)
  const rePoderInline = /^([A-ZÁÉÍÓÚÀÂÊÔÃÕÇ][A-ZÁÉÍÓÚÀÂÊÔÃÕÇ '\-]{4,})\s+([A-ZÁa-záéíóúàâêôãõç].+)$/;

  // Passo 1: encontrar todos os índices de nomes de poder (normais e inline)
  const limites      = [];
  const limitesInline = new Set();
  const inlineData    = new Map();  // idx → { nome, desc }

  for (let i = 0; i < poderesRaw.length; i++) {
    const l = poderesRaw[i].trim();
    if (l.startsWith('BENEFÍCIOS INICIAIS DE ') || l.startsWith('PODERES DE ')) break;
    if (l.startsWith('OUTROS NOMES')) break;
    if (SEC_BREAK.has(l)) break;
    if (!l || IGNORAR.has(l.toUpperCase()) || reNumPag.test(l)) continue;
    if (reNomePoder.test(l) && l.length > 3 && l.length < 60) {
      limites.push(i);
    } else {
      const m = l.match(rePoderInline);
      if (m && m[1].length >= 4 && m[1].length < 50) {
        limites.push(i);
        limitesInline.add(i);
        inlineData.set(i, { nome: m[1].trim(), desc: m[2].trim() });
      }
    }
  }

  // Passo 2: extrair custo e descrição entre limites consecutivos
  for (let bi = 0; bi < limites.length; bi++) {
    const start    = limites[bi];
    const end      = bi + 1 < limites.length ? limites[bi + 1] : poderesRaw.length;
    const isInline = limitesInline.has(start);

    let nomePoder, custoRaw = '';
    const descLinhas = [];

    if (isInline) {
      const d = inlineData.get(start);
      nomePoder = d.nome;
      descLinhas.push(d.desc);
    } else {
      nomePoder = poderesRaw[start].trim();
      for (let k = start + 1; k < end; k++) {
        const linha = poderesRaw[k].trim();
        if (!linha || IGNORAR.has(linha.toUpperCase()) || reNumPag.test(linha)) continue;
        if (linha.startsWith('BENEFÍCIOS INICIAIS DE ') || linha.startsWith('PODERES DE ')) break;
        if (linha.startsWith('OUTROS NOMES')) break;
        if (SEC_BREAK.has(linha)) break;
        if (!custoRaw && reCusto.test(linha)) { custoRaw = linha; continue; }
        descLinhas.push(linha);
      }
    }

    if (descLinhas.length > 0) {
      poderes.push({
        id:         toId(nomePoder),
        nome:       nomePoder,
        custo:      custoRaw || null,
        descricao:  limpar(descLinhas.join(' ')),
        repeticoes: 1,
      });
    }
  }

  return {
    id: toId(nomeClasse),
    nome: nomeClasse,
    sourceBook,
    sourcePage,
    beneficiosIniciais,
    poderes,
    _aviso: poderes.length < 3 ? 'POUCOS PODERES — verificar extração manual' : null
  };
}

// ──────────────────── Mapa de classes a extrair ──────────────────

const CLASSES_EXPANSAO = [
  // Atlas: Alta Fantasia
  { nome: 'Comandante',  txt: 'high-fantasy.txt',    sourceBook: 'Atlas: Alta Fantasia',   sourcePage: 136 },
  { nome: 'Dançarino',   txt: 'high-fantasy.txt',    sourceBook: 'Atlas: Alta Fantasia',   sourcePage: 138 },
  { nome: 'Simbolista',  txt: 'high-fantasy.txt',    sourceBook: 'Atlas: Alta Fantasia',   sourcePage: 142 },
  { nome: 'Virtuoso',    txt: 'high-fantasy.txt',    sourceBook: 'Atlas: Alta Fantasia',   sourcePage: 148 },
  // Atlas: Fantasia Natural
  { nome: 'Floralista',  txt: 'natural-fantasy.txt', sourceBook: 'Atlas: Fantasia Natural', sourcePage: 138 },
  { nome: 'Gourmet',     txt: 'natural-fantasy.txt', sourceBook: 'Atlas: Fantasia Natural', sourcePage: 148 },
  { nome: 'Invocador',   txt: 'natural-fantasy.txt', sourceBook: 'Atlas: Fantasia Natural', sourcePage: 154 },
  { nome: 'Mercador',    txt: 'natural-fantasy.txt', sourceBook: 'Atlas: Fantasia Natural', sourcePage: 158 },
  // Atlas: Tecno-Fantasia
  { nome: 'Esper',       txt: 'techno-fantasy.txt',  sourceBook: 'Atlas: Tecno-Fantasia',  sourcePage: 150 },
  { nome: 'Mutante',     txt: 'techno-fantasy.txt',  sourceBook: 'Atlas: Tecno-Fantasia',  sourcePage: 154 },
  { nome: 'Piloto',      txt: 'techno-fantasy.txt',  sourceBook: 'Atlas: Tecno-Fantasia',  sourcePage: 158 },
  // Codex Extra
  { nome: 'Astrólogo',       txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 40 },
  { nome: 'Bandoleiro',      txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 42 },
  { nome: 'Carteador',       txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 44 },
  { nome: 'Cavaleiro Mágico',txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 48 },
  { nome: 'Forjador de Almas',txt: 'codex-extra.txt',sourceBook: 'Codex Extra', sourcePage: 52 },
  { nome: 'Lâmina Carmesim', txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 56 },
  { nome: 'Malandro',        txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 58 },
  { nome: 'Necromante',      txt: 'codex-extra.txt', sourceBook: 'Codex Extra', sourcePage: 60 },
];

// ──────────────────── Execução ───────────────────────────────────

const resultado = { classes: [], erros: [], avisos: [] };
const txtsCache = {};

console.log('=== Parser de Classes — Expansões Fabula Ultima ===\n');

for (const cfg of CLASSES_EXPANSAO) {
  if (!txtsCache[cfg.txt]) txtsCache[cfg.txt] = lerTxt(cfg.txt);
  const txt = txtsCache[cfg.txt];

  process.stdout.write(`  Parseando ${cfg.nome}...`);
  const cl = parsearClasseDoTxt(txt, cfg.nome, cfg.sourceBook, cfg.sourcePage);

  if (cl.erro) {
    console.log(` ERRO: ${cl.erro}`);
    resultado.erros.push({ classe: cfg.nome, erro: cl.erro });
  } else {
    const n = cl.poderes.length;
    console.log(` OK (${n} poderes, ${cl.beneficiosIniciais.length} benefícios)`);
    if (cl._aviso) resultado.avisos.push({ classe: cfg.nome, aviso: cl._aviso });
    delete cl._aviso;
    resultado.classes.push(cl);
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(resultado, null, 2), 'utf-8');

console.log(`\n✅ ${resultado.classes.length} classes extraídas → ${OUT_FILE}`);
if (resultado.erros.length)   console.log(`⚠️  ${resultado.erros.length} erro(s): ${resultado.erros.map(e => e.classe).join(', ')}`);
if (resultado.avisos.length)  console.log(`⚠️  ${resultado.avisos.length} aviso(s): ${resultado.avisos.map(a => a.classe).join(', ')}`);
console.log('\nPróximo passo: node tools/extract-rulebooks/parse-quirks.js');
