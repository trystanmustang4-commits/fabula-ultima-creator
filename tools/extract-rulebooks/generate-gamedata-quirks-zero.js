#!/usr/bin/env node
// Fase 1.3 — Adiciona GAMEDATA.quirks (55) e GAMEDATA.zeroPowers (2) ao gamedata.js

const fs   = require('fs');
const path = require('path');

const QUIRKS_JSON   = path.resolve(__dirname, '../../data/rules/quirks.json');
const ZEROPOW_JSON  = path.resolve(__dirname, '../../data/rules/zero-powers.json');
const GAMEDATA_FILE = path.resolve(__dirname, '../../renderer/data/gamedata.js');

// ── Sufixos de livro para IDs de peculiaridades que aparecem em múltiplos livros ──
const SUFIXO = {
  'Atlas: Alta Fantasia':   '_af',
  'Atlas: Fantasia Natural': '_nf',
  'Atlas: Tecno-Fantasia':  '_tf',
  'Codex Extra':            '',
};

// Identifica nomes (ids base) com duplicatas entre livros
function buildQuirksComIds(quirks) {
  const countId = {};
  for (const q of quirks) countId[q.id] = (countId[q.id] || 0) + 1;
  const duplicados = new Set(Object.keys(countId).filter(id => countId[id] > 1));

  return quirks.map(q => {
    const sufixo = duplicados.has(q.id) ? SUFIXO[q.sourceBook] : '';
    return { ...q, gamedataId: q.id + sufixo };
  });
}

function escapeJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// ── Gera o bloco JS de GAMEDATA.quirks ──────────────────────────
function gerarBlocoQuirks(quirks) {
  const linhas = ['  quirks: ['];
  for (const q of quirks) {
    linhas.push('    {');
    linhas.push(`      id: "${q.gamedataId}",`);
    linhas.push(`      name: "${escapeJs(q.nome)}",`);
    linhas.push(`      sourceBook: "${q.sourceBook}",`);
    linhas.push(`      sourcePage: null,`);
    linhas.push(`      description: "${escapeJs(q.descricao)}",`);
    linhas.push(`      mechanic: null,`);
    linhas.push('    },');
  }
  linhas.push('  ],');
  return linhas.join('\n');
}

// ── Gera o bloco JS de GAMEDATA.zeroPowers ──────────────────────
function gerarBlocoZeroPowers(variantes, sourcePage) {
  const mecanicas = {
    poder_desperto: 'O PJ escolhe o efeito do Poder Zero na criação do personagem, mas não o estopim. ' +
      'O poder permanece inacessível até despertar via um de dois gatilhos: (1) chegar a 0 PV em conflito — ' +
      'pode despertar em vez de render ou sacrificar; (2) enfrentar verdade terrível, evento de grande emoção ' +
      'ou acesso a fonte de poder crucial. Ao despertar: recupera PV até ficar em crise, acessa o Poder Zero ' +
      'e escolhe um estopim. Se durante conflito, o Relógio Zero é preenchido imediatamente. ' +
      'Usável apenas uma vez por campanha; o momento é escolha do jogador.',
    poderes_combinados: 'Cada PJ recebe um estopim zero individual e um Relógio Zero com 4 seções (em vez de 6). ' +
      'Cada dupla de PJs compartilha um efeito zero único, definido em conjunto entre os dois jogadores. ' +
      'O efeito só pode ser usado quando ambos os relógios estiverem completamente preenchidos; ' +
      'apenas um PJ usa a ação Poder (ambos os relógios são esvaziados ao mesmo tempo). ' +
      'Restrição: máximo 4 PJs no grupo. Todos os estopins devem ser diferentes. ' +
      'Compatível com Poder Desperto: inverter a ordem — estopins escolhidos na criação, ' +
      'efeito de cada combinação definido quando o personagem desperta.',
  };

  const variants = { poder_desperto: 'awakened', poderes_combinados: 'shared' };

  const linhas = ['  zeroPowers: ['];
  for (const v of variantes) {
    linhas.push('    {');
    linhas.push(`      id: "${v.id}",`);
    linhas.push(`      name: "${escapeJs(v.nome)}",`);
    linhas.push(`      sourceBook: "${v.sourceBook}",`);
    linhas.push(`      sourcePage: ${sourcePage},`);
    linhas.push(`      variant: "${variants[v.id]}",`);
    linhas.push(`      description: "${escapeJs(v.descricao)}",`);
    linhas.push(`      mechanic: "${escapeJs(mecanicas[v.id])}",`);
    linhas.push('    },');
  }
  linhas.push('  ],');
  return linhas.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────
const { quirks: rawQuirks } = JSON.parse(fs.readFileSync(QUIRKS_JSON, 'utf8'));
const { sistema, variantes } = JSON.parse(fs.readFileSync(ZEROPOW_JSON, 'utf8'));

const quirksComIds = buildQuirksComIds(rawQuirks);

// Verificar unicidade final de IDs
const idsFinais = quirksComIds.map(q => q.gamedataId);
const idsSet    = new Set(idsFinais);
if (idsSet.size !== idsFinais.length) {
  const dups = idsFinais.filter((id, i) => idsFinais.indexOf(id) !== i);
  console.error('❌ Ainda há IDs duplicados após sufixo:', [...new Set(dups)].join(', '));
  process.exit(1);
}
console.log(`✅ ${quirksComIds.length} quirks — todos os IDs únicos`);

// Distribuição por livro
const dist = {};
for (const q of quirksComIds) dist[q.sourceBook] = (dist[q.sourceBook] || 0) + 1;
for (const [k, v] of Object.entries(dist)) console.log(`   ${v} — ${k}`);

// Verificar contaminação nas descriptions
const MARCADORES = ['OUTROS NOMES', 'BENEFÍCIOS INICIAIS DE', 'PONTOS DE ALMA', 'PERSONAGEM DE EXEMPLO', 'lady carmilla'];
let contaminado = false;
for (const q of quirksComIds) {
  for (const m of MARCADORES) {
    if (q.descricao.includes(m)) {
      console.error(`❌ CONTAMINAÇÃO em ${q.gamedataId}: ${m}`);
      contaminado = true;
    }
  }
}
if (!contaminado) console.log('✅ Nenhuma contaminação nas descrições');

// Gerar blocos JS
const blocoQuirks    = gerarBlocoQuirks(quirksComIds);
const blocoZeroPows  = gerarBlocoZeroPowers(variantes, sistema.sourcePage);

// Inserir no GAMEDATA.js antes do fechamento `};`
let gamedata = fs.readFileSync(GAMEDATA_FILE, 'utf8');

const insertBefore = '\n};';
const insertIdx    = gamedata.lastIndexOf(insertBefore);
if (insertIdx === -1) {
  console.error('❌ Não encontrou o fechamento `};` do GAMEDATA');
  process.exit(1);
}

// Verificar se já foram inseridos anteriormente (idempotência)
if (gamedata.includes('  quirks: [')) {
  console.log('⚠️  GAMEDATA.quirks já existe — substituindo...');
  // Remove bloco existente de quirks e zeroPowers
  const quirkStart = gamedata.lastIndexOf('\n\n  // =============================================\n  // PECULIARIDADES');
  if (quirkStart !== -1) {
    gamedata = gamedata.slice(0, quirkStart) + gamedata.slice(insertIdx);
  }
}

const separador = `

  // =============================================
  // PECULIARIDADES (QUIRKS) — Fase 1.3
  // Fonte: data/rules/quirks.json (55 entradas)
  // =============================================
${blocoQuirks}

  // =============================================
  // PODERES ZERO — Fase 1.3
  // Fonte: data/rules/zero-powers.json
  // =============================================
${blocoZeroPows}`;

gamedata = gamedata.slice(0, insertIdx) + separador + gamedata.slice(insertIdx);

fs.writeFileSync(GAMEDATA_FILE, gamedata, 'utf8');
console.log(`\n✅ GAMEDATA.js atualizado com quirks (${quirksComIds.length}) e zeroPowers (${variantes.length})`);
console.log('Próximo passo: smoke checks');
