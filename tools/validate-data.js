#!/usr/bin/env node
// Fase 1.4 — Validador formal de GAMEDATA
// Uso: node tools/validate-data.js   (ou: npm run validate)
// Exit 0 = tudo OK  |  Exit 1 = erros encontrados

const path = require('path');
const GAMEDATA = require(path.resolve(__dirname, '../renderer/data/gamedata.js'));

// ──────────────────── Config ─────────────────────────────────────

const EXPECTED = {
  classes:    { total: 34, core: 15, expansion: 19 },
  quirks:     {
    total: 55,
    porLivro: {
      'Atlas: Alta Fantasia':   15,
      'Atlas: Fantasia Natural': 15,
      'Atlas: Tecno-Fantasia':  16,
      'Codex Extra':             9,
    },
  },
  zeroPowers: { total: 2, variants: ['awakened', 'shared'] },
  personagensClassicos: { total: 10 },
};

const EXPANSION_BOOKS = new Set([
  'Atlas: Alta Fantasia',
  'Atlas: Fantasia Natural',
  'Atlas: Tecno-Fantasia',
  'Codex Extra',
]);

const CONTAMINATION = [
  'OUTROS NOMES',
  'BENEFÍCIOS INICIAIS DE',
  'PODERES DE',
  'PONTOS DE ALMA',
  'PERSONAGEM DE EXEMPLO',
  'lady carmilla',
  'NOVAS CLASSES',
  'NOVOS PODERES HEROICOS',
];

const RE_SNAKE = /^[a-z][a-z0-9_]*$/;

// ──────────────────── Utils ──────────────────────────────────────

let errors = 0, warnings = 0;

function err(msg)  { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg)   { console.log(`  ✅ ${msg}`); }

function checkContamination(text, context) {
  if (typeof text !== 'string') return;
  for (const m of CONTAMINATION) {
    if (text.includes(m)) {
      err(`CONTAMINAÇÃO em ${context}: "${m}" detectado (desc ${text.length} chars)`);
    }
  }
}

function checkSnakeCase(id, context) {
  if (!RE_SNAKE.test(id)) err(`ID inválido em ${context}: "${id}" — esperado snake_case`);
}

// ──────────────────── 1. GAMEDATA.classes ────────────────────────

console.log('\n══════════════════════════════════════════');
console.log(' 1. GAMEDATA.classes');
console.log('══════════════════════════════════════════');

const classes = GAMEDATA.classes || [];

// Contagem total e por tipo
if (classes.length !== EXPECTED.classes.total) {
  err(`Total de classes: ${classes.length} (esperado ${EXPECTED.classes.total})`);
} else {
  ok(`Total de classes: ${classes.length}`);
}

const coreClasses      = classes.filter(c => !EXPANSION_BOOKS.has(c.sourceBook));
const expansionClasses = classes.filter(c =>  EXPANSION_BOOKS.has(c.sourceBook));

if (coreClasses.length !== EXPECTED.classes.core)
  err(`Classes base: ${coreClasses.length} (esperado ${EXPECTED.classes.core})`);
else ok(`Classes base: ${coreClasses.length}`);

if (expansionClasses.length !== EXPECTED.classes.expansion)
  err(`Classes de expansão: ${expansionClasses.length} (esperado ${EXPECTED.classes.expansion})`);
else ok(`Classes de expansão: ${expansionClasses.length}`);

// IDs únicos
const classIds = classes.map(c => c.id);
const classIdSet = new Set(classIds);
if (classIdSet.size !== classIds.length) {
  const dups = classIds.filter((id, i) => classIds.indexOf(id) !== i);
  err(`IDs duplicados em classes: ${[...new Set(dups)].join(', ')}`);
} else {
  ok('IDs de classes únicos');
}

// Campos obrigatórios e integridade
let totalPoderes = 0;
let classesSemPoderes = [];
let classesSemBeneficios = [];

for (const cl of classes) {
  const ctx = `classe "${cl.id}"`;

  checkSnakeCase(cl.id || '', ctx);
  if (!cl.nome) err(`${ctx} sem nome`);

  // sourceBook e sourcePage: obrigatório para classes de expansão, facultativo para Livro Básico
  const isExpansion = EXPANSION_BOOKS.has(cl.sourceBook);
  if (!cl.sourceBook) {
    if (classIdSet.has(cl.id) && expansionClasses.find(c => c.id === cl.id))
      err(`${ctx} sem sourceBook`);
    // else: core class, sourceBook ausente é esperado
  }
  if (isExpansion && typeof cl.sourcePage !== 'number')
    err(`${ctx} sourcePage inválido: ${cl.sourcePage}`);

  // beneficiosIniciais — pelo menos um dos bônus reconhecidos por calcularStats()
  if (!Array.isArray(cl.beneficiosIniciais) || cl.beneficiosIniciais.length === 0) {
    classesSemBeneficios.push(cl.id);
  } else {
    const hasBonus = cl.beneficiosIniciais.some(b =>
      b.startsWith('+5 PV') || b.startsWith('+5 PM') || b.startsWith('+2 PI')
    );
    if (!hasBonus) {
      warn(`${ctx} beneficiosIniciais sem +5 PV/PM nem +2 PI — verificar compatibilidade com calcularStats()`);
    }
  }

  // poderes
  if (!Array.isArray(cl.poderes) || cl.poderes.length === 0) {
    classesSemPoderes.push(cl.id);
  } else {
    totalPoderes += cl.poderes.length;
    for (const p of cl.poderes) {
      const pctx = `${ctx} poder "${p.id}"`;
      if (!p.id)    err(`${pctx}: sem id`);
      if (!p.nome)  err(`${pctx}: sem nome`);
      if (!p.descricao || p.descricao.trim().length < 5) {
        err(`${pctx}: descrição vazia ou muito curta`);
      } else {
        checkContamination(p.descricao, pctx);
        if (p.descricao.length > 3000) {
          warn(`${pctx}: descrição muito longa (${p.descricao.length} chars) — possível contaminação`);
        }
      }
      if (typeof p.repeticoes !== 'number' || p.repeticoes < 1)
        err(`${pctx}: repeticoes inválido: ${p.repeticoes}`);
    }
  }
}

if (classesSemPoderes.length > 0) err(`Classes sem poderes: ${classesSemPoderes.join(', ')}`);
else ok('Todas as classes têm poderes');

if (classesSemBeneficios.length > 0) err(`Classes sem beneficiosIniciais: ${classesSemBeneficios.join(', ')}`);
else ok('Todas as classes têm beneficiosIniciais');

ok(`Total de poderes (expansão + base): ${totalPoderes}`);

// Poderes de expansão (19 classes × 5 = 95)
const expansionPoderes = expansionClasses.reduce((n, c) => n + (c.poderes || []).length, 0);
if (expansionPoderes !== 95) warn(`Poderes de expansão: ${expansionPoderes} (esperado 95)`);
else ok(`Poderes de expansão: ${expansionPoderes} (19 classes × 5)`);

// ──────────────────── 2. GAMEDATA.quirks ─────────────────────────

console.log('\n══════════════════════════════════════════');
console.log(' 2. GAMEDATA.quirks');
console.log('══════════════════════════════════════════');

const quirks = GAMEDATA.quirks || [];

if (quirks.length !== EXPECTED.quirks.total)
  err(`Total de quirks: ${quirks.length} (esperado ${EXPECTED.quirks.total})`);
else ok(`Total de quirks: ${quirks.length}`);

// Distribuição por livro
const distQuirks = {};
for (const q of quirks) distQuirks[q.sourceBook] = (distQuirks[q.sourceBook] || 0) + 1;
let distOk = true;
for (const [livro, esperado] of Object.entries(EXPECTED.quirks.porLivro)) {
  const atual = distQuirks[livro] || 0;
  if (atual !== esperado) { err(`Quirks de "${livro}": ${atual} (esperado ${esperado})`); distOk = false; }
}
if (distOk) ok(`Distribuição por livro: ${Object.entries(distQuirks).map(([k,v]) => `${v} ${k.split(': ')[1] || k}`).join(', ')}`);

// IDs únicos e snake_case
const quirkIds = quirks.map(q => q.id);
const quirkIdSet = new Set(quirkIds);
if (quirkIdSet.size !== quirkIds.length) {
  const dups = quirkIds.filter((id, i) => quirkIds.indexOf(id) !== i);
  err(`IDs duplicados em quirks: ${[...new Set(dups)].join(', ')}`);
} else ok('IDs de quirks únicos');

// Campos e integridade
for (const q of quirks) {
  const ctx = `quirk "${q.id}"`;
  checkSnakeCase(q.id || '', ctx);
  if (!q.name)       err(`${ctx}: sem name`);
  if (!q.sourceBook) err(`${ctx}: sem sourceBook`);
  if (!q.description || q.description.trim().length < 5)
    err(`${ctx}: description vazia ou muito curta`);
  else {
    checkContamination(q.description, ctx);
    if (q.description.length > 5000)
      warn(`${ctx}: description muito longa (${q.description.length} chars)`);
  }
}
ok('Todos os quirks verificados');

// ──────────────────── 3. GAMEDATA.zeroPowers ─────────────────────

console.log('\n══════════════════════════════════════════');
console.log(' 3. GAMEDATA.zeroPowers');
console.log('══════════════════════════════════════════');

const zeroPowers = GAMEDATA.zeroPowers || [];

if (zeroPowers.length !== EXPECTED.zeroPowers.total)
  err(`Total de zeroPowers: ${zeroPowers.length} (esperado ${EXPECTED.zeroPowers.total})`);
else ok(`Total de zeroPowers: ${zeroPowers.length}`);

const variants = zeroPowers.map(z => z.variant).sort();
const expectedVariants = EXPECTED.zeroPowers.variants.slice().sort();
if (JSON.stringify(variants) !== JSON.stringify(expectedVariants))
  err(`Variants: [${variants.join(', ')}] (esperado [${expectedVariants.join(', ')}])`);
else ok(`Variants corretos: ${variants.join(', ')}`);

for (const z of zeroPowers) {
  const ctx = `zeroPower "${z.id}"`;
  checkSnakeCase(z.id || '', ctx);
  if (!z.name)       err(`${ctx}: sem name`);
  if (!z.sourceBook) err(`${ctx}: sem sourceBook`);
  if (typeof z.sourcePage !== 'number') err(`${ctx}: sourcePage inválido: ${z.sourcePage}`);
  if (!z.variant)    err(`${ctx}: sem variant`);
  if (!z.description || z.description.trim().length < 10) err(`${ctx}: description vazia`);
  if (!z.mechanic   || z.mechanic.trim().length < 10)    err(`${ctx}: mechanic vazio`);
}
ok('Todos os zeroPowers verificados');

// ──────────────────── 4. personagensClassicos ────────────────────

console.log('\n══════════════════════════════════════════');
console.log(' 4. personagensClassicos');
console.log('══════════════════════════════════════════');

const personagens = GAMEDATA.personagensClassicos || [];
if (personagens.length !== EXPECTED.personagensClassicos.total)
  err(`Total de personagensClassicos: ${personagens.length} (esperado ${EXPECTED.personagensClassicos.total})`);
else ok(`Total de personagensClassicos: ${personagens.length}`);

for (const p of personagens) {
  if (!Array.isArray(p.classes)) { err(`personagem "${p.nome}": sem classes`); continue; }
  for (const cl of p.classes) {
    if (!classIdSet.has(cl.classe))
      err(`personagem "${p.nome}": classe "${cl.classe}" não existe em GAMEDATA.classes`);
  }
}
ok('Referências de classes em personagensClassicos válidas');

// ──────────────────── 5. IDs globais únicos (por coleção) ────────

console.log('\n══════════════════════════════════════════');
console.log(' 5. Integridade global');
console.log('══════════════════════════════════════════');

const quirkIdsByBook = {};
for (const q of quirks) {
  if (!quirkIdsByBook[q.sourceBook]) quirkIdsByBook[q.sourceBook] = new Set();
  if (quirkIdsByBook[q.sourceBook].has(q.id))
    err(`ID duplicado dentro do livro "${q.sourceBook}": "${q.id}"`);
  quirkIdsByBook[q.sourceBook].add(q.id);
}
ok('IDs de quirks únicos dentro de cada livro');

const zeroPowerIds = zeroPowers.map(z => z.id);
if (new Set(zeroPowerIds).size === zeroPowerIds.length) ok('IDs de zeroPowers únicos');
else err('IDs duplicados em zeroPowers');

// ──────────────────── 6. CHARACTER_KB ────────────────────────────

console.log('\n══════════════════════════════════════════');
console.log(' 6. CHARACTER_KB');
console.log('══════════════════════════════════════════');

const CHARACTER_KB = (() => {
  try { return require(path.resolve(__dirname, '../renderer/data/character-kb.js')); }
  catch (e) { err(`Falha ao carregar character-kb.js: ${e.message}`); return []; }
})();

const ARQUETIPOS = (() => {
  try { return require(path.resolve(__dirname, '../renderer/data/archetypes.js')); }
  catch (e) { err(`Falha ao carregar archetypes.js: ${e.message}`); return []; }
})();

const VALID_CATEGORIES = new Set(['comic', 'video-game', 'anime-manga', 'literature', 'film-tv', 'mythology']);
const RE_KEBAB = /^[a-z][a-z0-9-]+$/;
const arquetipoIdSet = new Set(ARQUETIPOS.map(a => a.id));

if (CHARACTER_KB.length > 0) {
  ok(`CHARACTER_KB carregado: ${CHARACTER_KB.length} entradas`);

  // IDs únicos e kebab-case
  const kbIds = CHARACTER_KB.map(c => c.id);
  const kbIdSet = new Set(kbIds);
  if (kbIdSet.size !== kbIds.length) {
    const dups = kbIds.filter((id, i) => kbIds.indexOf(id) !== i);
    err(`IDs duplicados em CHARACTER_KB: ${[...new Set(dups)].join(', ')}`);
  } else ok('IDs de CHARACTER_KB únicos');

  let kbSemId = 0, kbQuirkFills = 0;
  for (const c of CHARACTER_KB) {
    const ctx = `KB "${c.id || c.nome}"`;

    if (!c.id) { err(`${ctx}: sem id`); kbSemId++; continue; }
    if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case: "${c.id}"`);
    if (!c.nome) err(`${ctx}: sem nome`);
    if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
    if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
    else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" não existe em ARQUETIPOS`);

    // source
    if (!c.source) err(`${ctx}: sem source`);
    else {
      if (!c.source.franchise) err(`${ctx}: source.franchise vazio`);
      if (!c.source.work) err(`${ctx}: source.work vazio`);
      if (!VALID_CATEGORIES.has(c.source.category))
        err(`${ctx}: source.category inválido: "${c.source.category}" — esperado: ${[...VALID_CATEGORIES].join('|')}`);
    }

    if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);

    // keyTraits (opcional mas se presente, deve ter strings não-vazias)
    if (c.keyTraits !== undefined) {
      if (!Array.isArray(c.keyTraits)) err(`${ctx}: keyTraits deve ser array`);
      else for (const t of c.keyTraits) {
        if (typeof t !== 'string' || t.trim().length === 0) err(`${ctx}: keyTraits contém elemento inválido`);
      }
    }

    // suggestedQuirks (opcional — se presente, verificar IDs válidos)
    if (c.suggestedQuirks !== undefined) {
      if (!Array.isArray(c.suggestedQuirks)) err(`${ctx}: suggestedQuirks deve ser array`);
      else {
        for (const qid of c.suggestedQuirks) {
          if (!quirkIdSet.has(qid)) err(`${ctx}: suggestedQuirks referencia quirk inexistente: "${qid}"`);
        }
        if (c.suggestedQuirks.length > 0) kbQuirkFills++;
      }
    }

    // bondHints (opcional — se presente, deve ter strings não-vazias)
    if (c.bondHints !== undefined) {
      if (!Array.isArray(c.bondHints)) err(`${ctx}: bondHints deve ser array`);
      else for (const h of c.bondHints) {
        if (typeof h !== 'string' || h.trim().length === 0) err(`${ctx}: bondHints contém elemento inválido`);
      }
    }
  }

  if (kbSemId === 0) ok('Todas as entradas de KB têm id');

  // Distribuição por source.category
  const distCat = {};
  for (const c of CHARACTER_KB) {
    if (c.source) distCat[c.source.category] = (distCat[c.source.category] || 0) + 1;
  }
  ok(`Distribuição por categoria: ${Object.entries(distCat).map(([k,v]) => `${v} ${k}`).join(', ')}`);
  ok(`Entradas com suggestedQuirks preenchidos: ${kbQuirkFills}/${CHARACTER_KB.length}`);
}

// LoL champions (sub-arquivo gerado por seed-lol.js)
const LOL_CHAMPIONS = (() => {
  try { return require(path.resolve(__dirname, '../renderer/data/character-kb/lol-champions.js')); }
  catch (e) { err(`Falha ao carregar character-kb/lol-champions.js: ${e.message}`); return []; }
})();

if (LOL_CHAMPIONS.length > 0) {
  ok(`LOL_CHAMPIONS carregado: ${LOL_CHAMPIONS.length} entradas`);

  const lolIds = LOL_CHAMPIONS.map(c => c.id);
  const lolIdSet = new Set(lolIds);
  if (lolIdSet.size !== lolIds.length) {
    const dups = lolIds.filter((id, i) => lolIds.indexOf(id) !== i);
    err(`IDs duplicados em LOL_CHAMPIONS: ${[...new Set(dups)].join(', ')}`);
  } else ok('IDs de LOL_CHAMPIONS únicos');

  // Colisão com CHARACTER_KB
  const kbIdSetAll = new Set(CHARACTER_KB.map(c => c.id));
  const collisions = lolIds.filter(id => kbIdSetAll.has(id));
  if (collisions.length > 0) err(`IDs colidindo entre KB e LoL: ${collisions.join(', ')}`);
  else ok('Sem colisão de IDs entre CHARACTER_KB e LOL_CHAMPIONS');

  for (const c of LOL_CHAMPIONS) {
    const ctx = `LoL "${c.id || c.nome}"`;
    if (!c.id) { err(`${ctx}: sem id`); continue; }
    if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case`);
    if (!c.nome)    err(`${ctx}: sem nome`);
    if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
    if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
    else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" inválido`);
    if (!c.source || !VALID_CATEGORIES.has(c.source.category))
      err(`${ctx}: source.category inválido: "${c.source && c.source.category}"`);
    if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);
  }
  ok('Todos os LOL_CHAMPIONS verificados');
}

// ── Sub-arquivos FF (ff/ — um por jogo) ───────────────────────────
const FF_FILES = (() => {
  const ffDir = path.resolve(__dirname, '../renderer/data/character-kb/ff');
  try {
    const fs = require('fs');
    if (!fs.existsSync(ffDir)) return [];
    return fs.readdirSync(ffDir)
      .filter(f => f.endsWith('.js'))
      .map(f => ({ file: f, data: (() => { try { return require(path.resolve(ffDir, f)); } catch(e) { err(`Falha ao carregar ff/${f}: ${e.message}`); return []; } })() }));
  } catch(e) { err(`Erro ao listar ff/: ${e.message}`); return []; }
})();

if (FF_FILES.length > 0) {
  const seenIds = new Set([...CHARACTER_KB.map(c => c.id), ...LOL_CHAMPIONS.map(c => c.id)]);
  let ffTotal = 0;

  for (const { file, data } of FF_FILES) {
    if (data.length === 0) continue;
    ok(`ff/${file}: ${data.length} entradas`);

    const ids = data.map(c => c.id);
    if (new Set(ids).size !== ids.length) {
      const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
      err(`IDs duplicados em ff/${file}: ${[...new Set(dups)].join(', ')}`);
    }

    for (const c of data) {
      const ctx = `ff/${file} "${c.id || c.nome}"`;
      if (!c.id) { err(`${ctx}: sem id`); continue; }
      if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case`);
      if (seenIds.has(c.id)) err(`${ctx}: ID "${c.id}" já existe em outro arquivo KB`);
      else seenIds.add(c.id);
      if (!c.nome)    err(`${ctx}: sem nome`);
      if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
      if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
      else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" inválido`);
      if (!c.source || !VALID_CATEGORIES.has(c.source.category))
        err(`${ctx}: source.category inválido: "${c.source && c.source.category}"`);
      if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);
      if (c.suggestedQuirks) {
        for (const qid of c.suggestedQuirks) {
          if (!quirkIdSet.has(qid)) err(`${ctx}: suggestedQuirks referencia quirk inexistente: "${qid}"`);
        }
      }
    }
    ffTotal += data.length;
  }
  ok(`FF sub-arquivos: ${FF_FILES.length} arquivo(s), ${ffTotal} entradas`);
}

// ── Sub-arquivos Heroes (heroes/ — marvel, dc, indie) ─────────────
const HEROES_FILES = (() => {
  const heroesDir = path.resolve(__dirname, '../renderer/data/character-kb/heroes');
  try {
    const fs = require('fs');
    if (!fs.existsSync(heroesDir)) return [];
    return fs.readdirSync(heroesDir)
      .filter(f => f.endsWith('.js'))
      .map(f => ({ file: f, data: (() => { try { return require(path.resolve(heroesDir, f)); } catch(e) { err(`Falha ao carregar heroes/${f}: ${e.message}`); return []; } })() }));
  } catch(e) { err(`Erro ao listar heroes/: ${e.message}`); return []; }
})();

// ── Sub-arquivos Tales of (tales/) ────────────────────────────────
const TALES_FILES = (() => {
  const talesDir = path.resolve(__dirname, '../renderer/data/character-kb/tales');
  try {
    const fs = require('fs');
    if (!fs.existsSync(talesDir)) return [];
    return fs.readdirSync(talesDir)
      .filter(f => f.endsWith('.js'))
      .sort()
      .map(f => ({ file: f, data: (() => { try { return require(path.resolve(talesDir, f)); } catch(e) { err(`Falha ao carregar tales/${f}: ${e.message}`); return []; } })() }));
  } catch(e) { err(`Erro ao listar tales/: ${e.message}`); return []; }
})();

const GAMES_FILES = (() => {
  const gamesDir = path.resolve(__dirname, '../renderer/data/character-kb/games');
  try {
    const fs = require('fs');
    if (!fs.existsSync(gamesDir)) return [];
    return fs.readdirSync(gamesDir)
      .filter(f => f.endsWith('.js'))
      .sort()
      .map(f => ({ file: f, data: (() => { try { return require(path.resolve(gamesDir, f)); } catch(e) { err(`Falha ao carregar games/${f}: ${e.message}`); return []; } })() }));
  } catch(e) { err(`Erro ao listar games/: ${e.message}`); return []; }
})();

{
  const ffTotal = FF_FILES.reduce((acc, { data }) => acc + data.length, 0);
  let heroesTotal = 0;
  let talesTotal = 0;
  let gamesTotal = 0;

  if (HEROES_FILES.length > 0) {
    const seenIds = new Set([
      ...CHARACTER_KB.map(c => c.id),
      ...LOL_CHAMPIONS.map(c => c.id),
      ...FF_FILES.flatMap(({ data }) => data.map(c => c.id)),
    ]);

    for (const { file, data } of HEROES_FILES) {
      if (data.length === 0) continue;
      ok(`heroes/${file}: ${data.length} entradas`);

      const ids = data.map(c => c.id);
      if (new Set(ids).size !== ids.length) {
        const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
        err(`IDs duplicados em heroes/${file}: ${[...new Set(dups)].join(', ')}`);
      }

      for (const c of data) {
        const ctx = `heroes/${file} "${c.id || c.nome}"`;
        if (!c.id) { err(`${ctx}: sem id`); continue; }
        if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case`);
        if (seenIds.has(c.id)) err(`${ctx}: ID "${c.id}" já existe em outro arquivo KB`);
        else seenIds.add(c.id);
        if (!c.nome)    err(`${ctx}: sem nome`);
        if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
        if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
        else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" inválido`);
        if (!c.source || !VALID_CATEGORIES.has(c.source.category))
          err(`${ctx}: source.category inválido: "${c.source && c.source.category}"`);
        if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);
        if (c.suggestedQuirks) {
          for (const qid of c.suggestedQuirks) {
            if (!quirkIdSet.has(qid)) err(`${ctx}: suggestedQuirks referencia quirk inexistente: "${qid}"`);
          }
        }
      }
      heroesTotal += data.length;
    }
    ok(`Heroes sub-arquivos: ${HEROES_FILES.length} arquivo(s), ${heroesTotal} entradas`);
  }

  if (TALES_FILES.length > 0) {
    const seenIds = new Set([
      ...CHARACTER_KB.map(c => c.id),
      ...LOL_CHAMPIONS.map(c => c.id),
      ...FF_FILES.flatMap(({ data }) => data.map(c => c.id)),
      ...HEROES_FILES.flatMap(({ data }) => data.map(c => c.id)),
    ]);

    for (const { file, data } of TALES_FILES) {
      if (data.length === 0) continue;
      ok(`tales/${file}: ${data.length} entradas`);

      const ids = data.map(c => c.id);
      if (new Set(ids).size !== ids.length) {
        const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
        err(`IDs duplicados em tales/${file}: ${[...new Set(dups)].join(', ')}`);
      }

      for (const c of data) {
        const ctx = `tales/${file} "${c.id || c.nome}"`;
        if (!c.id) { err(`${ctx}: sem id`); continue; }
        if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case`);
        if (seenIds.has(c.id)) err(`${ctx}: ID "${c.id}" já existe em outro arquivo KB`);
        else seenIds.add(c.id);
        if (!c.nome)    err(`${ctx}: sem nome`);
        if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
        if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
        else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" inválido`);
        if (!c.source || !VALID_CATEGORIES.has(c.source.category))
          err(`${ctx}: source.category inválido: "${c.source && c.source.category}"`);
        if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);
        if (c.suggestedQuirks) {
          for (const qid of c.suggestedQuirks) {
            if (!quirkIdSet.has(qid)) err(`${ctx}: suggestedQuirks referencia quirk inexistente: "${qid}"`);
          }
        }
      }
      talesTotal += data.length;
    }
    ok(`Tales sub-arquivos: ${TALES_FILES.length} arquivo(s), ${talesTotal} entradas`);
  }

  if (GAMES_FILES.length > 0) {
    const seenIds = new Set([
      ...CHARACTER_KB.map(c => c.id),
      ...LOL_CHAMPIONS.map(c => c.id),
      ...FF_FILES.flatMap(({ data }) => data.map(c => c.id)),
      ...HEROES_FILES.flatMap(({ data }) => data.map(c => c.id)),
      ...TALES_FILES.flatMap(({ data }) => data.map(c => c.id)),
    ]);

    for (const { file, data } of GAMES_FILES) {
      if (data.length === 0) continue;
      ok(`games/${file}: ${data.length} entradas`);

      const ids = data.map(c => c.id);
      if (new Set(ids).size !== ids.length) {
        const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
        err(`IDs duplicados em games/${file}: ${[...new Set(dups)].join(', ')}`);
      }

      for (const c of data) {
        const ctx = `games/${file} "${c.id || c.nome}"`;
        if (!c.id) { err(`${ctx}: sem id`); continue; }
        if (!RE_KEBAB.test(c.id)) err(`${ctx}: id fora do padrão kebab-case`);
        if (seenIds.has(c.id)) err(`${ctx}: ID "${c.id}" já existe em outro arquivo KB`);
        else seenIds.add(c.id);
        if (!c.nome)    err(`${ctx}: sem nome`);
        if (!Array.isArray(c.aliases) || c.aliases.length === 0) err(`${ctx}: aliases vazio`);
        if (!c.arquetipo) err(`${ctx}: sem arquetipo`);
        else if (!arquetipoIdSet.has(c.arquetipo)) err(`${ctx}: arquetipo "${c.arquetipo}" inválido`);
        if (!c.source || !VALID_CATEGORIES.has(c.source.category))
          err(`${ctx}: source.category inválido: "${c.source && c.source.category}"`);
        if (!c.descricao || c.descricao.trim().length < 10) err(`${ctx}: descricao vazia ou muito curta`);
        if (c.suggestedQuirks) {
          for (const qid of c.suggestedQuirks) {
            if (!quirkIdSet.has(qid)) err(`${ctx}: suggestedQuirks referencia quirk inexistente: "${qid}"`);
          }
        }
      }
      gamesTotal += data.length;
    }
    ok(`Games sub-arquivos: ${GAMES_FILES.length} arquivo(s), ${gamesTotal} entradas`);
  }

  const total = CHARACTER_KB.length + LOL_CHAMPIONS.length + ffTotal + heroesTotal + talesTotal + gamesTotal;
  const parts = [
    `${CHARACTER_KB.length} curados`,
    `${LOL_CHAMPIONS.length} LoL`,
    FF_FILES.length > 0 ? `${ffTotal} FF` : null,
    HEROES_FILES.length > 0 ? `${heroesTotal} Heroes` : null,
    TALES_FILES.length > 0 ? `${talesTotal} Tales` : null,
    GAMES_FILES.length > 0 ? `${gamesTotal} Games` : null,
  ].filter(Boolean).join(' + ');
  ok(`KB total combinado: ${parts} = ${total} entradas`);
}

// ──────────────────── Resultado final ────────────────────────────

console.log('\n══════════════════════════════════════════');
if (errors === 0 && warnings === 0) {
  console.log(` ✅ TUDO OK — 0 erros, 0 avisos`);
} else if (errors === 0) {
  console.log(` ✅ 0 erros | ⚠️  ${warnings} aviso(s)`);
} else {
  console.log(` ❌ ${errors} erro(s) | ⚠️  ${warnings} aviso(s)`);
}
console.log('══════════════════════════════════════════\n');

process.exit(errors > 0 ? 1 : 0);
