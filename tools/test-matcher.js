'use strict';
// Testes do Matcher — Fase 4.1
// Roda com: node tools/test-matcher.js  (a partir da raiz do projeto)

const path = require('path');
const R = (...p) => path.join(__dirname, '..', 'renderer', ...p);

// ── Setup globals ─────────────────────────────────────────────────────────────

global.Fuse        = require('fuse.js');
global.FuzzySearch = require(R('matcher', 'fuzzy.js'));
global.Fallbacks   = require(R('matcher', 'fallbacks.js'));

// KB: [globalName, caminho relativo a renderer/data/]
const KB_MAP = [
  ['CHARACTER_KB',               'character-kb.js'],
  ['LOL_CHAMPIONS',              'character-kb/lol-champions.js'],
  // FF
  ['FF1_CHARACTERS',             'character-kb/ff/ff1.js'],
  ['FF2_CHARACTERS',             'character-kb/ff/ff2.js'],
  ['FF3_CHARACTERS',             'character-kb/ff/ff3.js'],
  ['FF4_CHARACTERS',             'character-kb/ff/ff4.js'],
  ['FF5_CHARACTERS',             'character-kb/ff/ff5.js'],
  ['FF6_CHARACTERS',             'character-kb/ff/ff6.js'],
  ['FF7_CHARACTERS',             'character-kb/ff/ff7.js'],
  ['FF8_CHARACTERS',             'character-kb/ff/ff8.js'],
  ['FF9_CHARACTERS',             'character-kb/ff/ff9.js'],
  ['FF10_CHARACTERS',            'character-kb/ff/ff10.js'],
  ['FF10_2_CHARACTERS',          'character-kb/ff/ff10-2.js'],
  ['FF11_CHARACTERS',            'character-kb/ff/ff11.js'],
  ['FF12_CHARACTERS',            'character-kb/ff/ff12.js'],
  ['FF13_CHARACTERS',            'character-kb/ff/ff13.js'],
  ['FF14_CHARACTERS',            'character-kb/ff/ff14.js'],
  ['FF15_CHARACTERS',            'character-kb/ff/ff15.js'],
  ['FF16_CHARACTERS',            'character-kb/ff/ff16.js'],
  ['FFT_CHARACTERS',             'character-kb/ff/fft.js'],
  ['CRISIS_CORE_CHARACTERS',     'character-kb/ff/crisis-core.js'],
  // Heroes
  ['MARVEL_CHARACTERS',          'character-kb/heroes/marvel.js'],
  ['DC_CHARACTERS',              'character-kb/heroes/dc.js'],
  ['INDIE_CHARACTERS',           'character-kb/heroes/indie.js'],
  // Tales of
  ['TALES_SYMPHONIA_CHARACTERS', 'character-kb/tales/tales-symphonia.js'],
  ['TALES_PHANTASIA_CHARACTERS', 'character-kb/tales/tales-phantasia.js'],
  ['TALES_DESTINY_CHARACTERS',   'character-kb/tales/tales-destiny.js'],
  ['TALES_ETERNIA_CHARACTERS',   'character-kb/tales/tales-eternia.js'],
  ['TALES_REBIRTH_CHARACTERS',   'character-kb/tales/tales-rebirth.js'],
  ['TALES_LEGENDIA_CHARACTERS',  'character-kb/tales/tales-legendia.js'],
  ['TALES_ABYSS_CHARACTERS',     'character-kb/tales/tales-abyss.js'],
  ['TALES_INNOCENCE_CHARACTERS', 'character-kb/tales/tales-innocence.js'],
  ['TALES_HEARTS_CHARACTERS',    'character-kb/tales/tales-hearts.js'],
  ['TALES_VESPERIA_CHARACTERS',  'character-kb/tales/tales-vesperia.js'],
  ['TALES_GRACES_CHARACTERS',    'character-kb/tales/tales-graces.js'],
  ['TALES_XILLIA_CHARACTERS',    'character-kb/tales/tales-xillia.js'],
  ['TALES_ZESTIRIA_CHARACTERS',  'character-kb/tales/tales-zestiria.js'],
  ['TALES_BERSERIA_CHARACTERS',  'character-kb/tales/tales-berseria.js'],
  ['TALES_ARISE_CHARACTERS',     'character-kb/tales/tales-arise.js'],
  // Games gerais
  ['ZELDA_CHARACTERS',           'character-kb/games/zelda.js'],
  ['MARIO_CHARACTERS',           'character-kb/games/mario.js'],
  ['SONIC_CHARACTERS',           'character-kb/games/sonic.js'],
  ['HALO_CHARACTERS',            'character-kb/games/halo.js'],
  ['METROID_CHARACTERS',         'character-kb/games/metroid.js'],
  ['MGS_CHARACTERS',             'character-kb/games/mgs.js'],
  ['RESIDENT_EVIL_CHARACTERS',   'character-kb/games/resident-evil.js'],
  ['SOULS_CHARACTERS',           'character-kb/games/souls.js'],
  ['WITCHER_EXTRAS_CHARACTERS',  'character-kb/games/witcher-extras.js'],
  ['CYBERPUNK_CHARACTERS',       'character-kb/games/cyberpunk.js'],
  ['MASS_EFFECT_CHARACTERS',     'character-kb/games/mass-effect.js'],
  ['KINGDOM_HEARTS_CHARACTERS',  'character-kb/games/kingdom-hearts.js'],
  ['NIER_CHARACTERS',            'character-kb/games/nier.js'],
  ['PERSONA_CHARACTERS',         'character-kb/games/persona.js'],
  ['DMC_EXTRAS_CHARACTERS',      'character-kb/games/dmc-extras.js'],
  ['BAYONETTA_EXTRAS_CHARACTERS','character-kb/games/bayonetta-extras.js'],
  ['YAKUZA_CHARACTERS',          'character-kb/games/yakuza.js'],
  ['XENOBLADE_CHARACTERS',       'character-kb/games/xenoblade.js'],
  ['FIRE_EMBLEM_CHARACTERS',     'character-kb/games/fire-emblem.js'],
  ['DRAGON_QUEST_CHARACTERS',    'character-kb/games/dragon-quest.js'],
  ['CHRONO_TRIGGER_CHARACTERS',  'character-kb/games/chrono-trigger.js'],
  ['MEGA_MAN_CHARACTERS',        'character-kb/games/mega-man.js'],
  ['CASTLEVANIA_CHARACTERS',     'character-kb/games/castlevania.js'],
  ['MONSTER_HUNTER_CHARACTERS',  'character-kb/games/monster-hunter.js'],
  ['POKEMON_CHARACTERS',         'character-kb/games/pokemon.js'],
  ['STREET_FIGHTER_CHARACTERS',  'character-kb/games/street-fighter.js'],
  ['TEKKEN_CHARACTERS',          'character-kb/games/tekken.js'],
  ['MORTAL_KOMBAT_CHARACTERS',   'character-kb/games/mortal-kombat.js'],
  ['UNCHARTED_CHARACTERS',       'character-kb/games/uncharted.js'],
  ['EXTRAS_TLOU_CHARACTERS',     'character-kb/games/extras-tlou.js'],
  ['EXTRAS_GOW_CHARACTERS',      'character-kb/games/extras-gow.js'],
  ['HOLLOW_KNIGHT_CHARACTERS',   'character-kb/games/hollow-knight.js'],
  ['HADES_CHARACTERS',           'character-kb/games/hades.js'],
  ['BALDURS_GATE_CHARACTERS',    'character-kb/games/baldurs-gate.js'],
  ['UNDERTALE_CHARACTERS',       'character-kb/games/undertale.js'],
  ['DISCO_ELYSIUM_CHARACTERS',   'character-kb/games/disco-elysium.js'],
  ['DOOM_HALFLIFE_CHARACTERS',   'character-kb/games/doom-halflife.js'],
  ['PLATFORMERS_CHARACTERS',     'character-kb/games/platformers.js'],
];

for (const [name, file] of KB_MAP) {
  global[name] = require(R('data', ...file.split('/')));
}
global.ARQUETIPOS = require(R('data', 'archetypes.js'));

const Matcher = require(R('matcher', 'matcher.js'));

// ── Helpers ───────────────────────────────────────────────────────────────────

let passed = 0, failed = 0, observed = 0;

function _fmt(r) {
  if (r.tipo === 'exato' || r.tipo === 'fuzzy_personagem') {
    const s = r.score !== undefined ? ` score=${r.score}` : '';
    return `[${r.tipo}] ${r.resultado.nome} (${r.resultado.id})${s}`;
  }
  if (r.tipo === 'ambiguo' || r.tipo === 'fuzzy_ambiguo') {
    const names = r.candidatos.map(c => `${c.nome}(${c.id}${c._score !== undefined ? ',s='+c._score : ''})`).join(', ');
    return `[${r.tipo}] ${r.candidatos.length} candidatos: ${names}`;
  }
  if (r.tipo === 'fuzzy_arquetipo') {
    const names = r.candidatos.map(c => `${c.nome}(${c.id}${c._score !== undefined ? ',s='+c._score : ''})`).join(', ');
    return `[fuzzy_arquetipo] ${names}`;
  }
  if (r.tipo === 'sem_match') return `[sem_match]${r.motivo ? ' motivo='+r.motivo : ''}`;
  if (r.tipo === 'erro_input') return `[erro_input] ${r.mensagem}`;
  return `[${r.tipo}]`;
}

function check(input, esperado, extra, desc) {
  const r = Matcher.buscarInspiracao(input);
  const obs = esperado === null;

  if (obs) {
    console.log(`  ○ OBSERVE "${input}" → ${_fmt(r)}  (${desc})`);
    observed++;
    return;
  }

  // esperado pode ser string ou array de tipos aceitos
  const tiposAceitos = Array.isArray(esperado) ? esperado : [esperado];
  let ok = tiposAceitos.includes(r.tipo);
  let why = '';

  if (ok && extra && extra.alvo) {
    if (r.resultado) {
      ok = r.resultado.id === extra.alvo;
      if (!ok) why = ` alvo esperado=${extra.alvo} obtido=${r.resultado.id}`;
    } else if (r.candidatos) {
      ok = r.candidatos.some(c => c.id === extra.alvo);
      if (!ok) why = ` alvo ${extra.alvo} não está nos candidatos`;
    } else {
      ok = false;
      why = ` sem resultado`;
    }
  }
  if (ok && extra && extra.notAlvo) {
    const gotId = r.resultado ? r.resultado.id
      : (r.candidatos && r.candidatos.length > 0 ? r.candidatos[0].id : '');
    if (gotId === extra.notAlvo) {
      ok = false;
      why = ` FALSO POSITIVO: retornou o alvo proibido ${extra.notAlvo}`;
    }
  }
  if (ok && extra && extra.minCandidatos) {
    const n = r.candidatos ? r.candidatos.length : 0;
    ok = n >= extra.minCandidatos;
    if (!ok) why = ` esperado >=${extra.minCandidatos} candidatos, obtido ${n}`;
  }
  if (ok && extra && extra.motivo) {
    ok = r.motivo === extra.motivo;
    if (!ok) why = ` motivo esperado=${extra.motivo} obtido=${r.motivo}`;
  }

  const mark = ok ? '✓' : '✗';
  console.log(`  ${mark} "${input}" → ${_fmt(r)}${why}  (${desc})`);
  if (ok) passed++; else failed++;
}

// ── Casos ─────────────────────────────────────────────────────────────────────

console.log('\n=== Matcher — Testes Fase 4.1 (suite completa 36 casos) ===\n');

// ── Bloco 1: Match exato — variações de normalização ─────────────────────────
console.log('── Bloco 1: Match exato — Capitão América (normalização)');
check('Capitão América',  'exato', { alvo: 'marvel-capitao-america' }, 'pt com acento');
check('Capitao America',  'exato', { alvo: 'marvel-capitao-america' }, 'sem acento');
check('Captain America',  'exato', { alvo: 'marvel-capitao-america' }, 'alias inglês');
check('capitao america',  'exato', { alvo: 'marvel-capitao-america' }, 'lowercase');
check('CAPITÃO AMÉRICA',  'exato', { alvo: 'marvel-capitao-america' }, 'uppercase');

// ── Bloco 2: Ambiguidade Tipo A ───────────────────────────────────────────────
console.log('\n── Bloco 2: Ambiguidade Tipo A — Geralt');
check('Geralt',           'ambiguo', { minCandidatos: 2 }, 'simples');
check('Geralt de Rívia',  'ambiguo', { minCandidatos: 2 }, 'nome completo');

// ── Bloco 3: Match exato — verificação de auto-loaders ───────────────────────
console.log('\n── Bloco 3: Match exato — auto-loaders FF / LoL / outros');
check('Cloud',        'exato', null,                       'FF7 — nome');
check('Cloud Strife', 'exato', null,                       'FF7 — nome completo');
check('Tifa',         'exato', null,                       'FF7 — Tifa');
check('Yasuo',        'exato', null,                       'LoL — Yasuo');
check('Ahri',         'exato', null,                       'LoL — Ahri');
check('Aragorn',      'exato', { alvo: 'lotr-aragorn' },   'Curados — Aragorn');
check('Kirito',       'exato', null,                       'Curados — Kirito (SAO)');

// ── Bloco 4: Fuzzy com typos — deve continuar passando após reconfig ──────────
console.log('\n── Bloco 4: Fuzzy com typos (regressão pós-reconfig)');
check('Sefiroth',       'fuzzy_personagem', { alvo: 'ff7-sephiroth' },       'typo 1-char (f→ph) — Sephiroth');
check('Wolverin',       'fuzzy_personagem', { alvo: 'marvel-wolverine' },    'typo 1-char ausente — Wolverine');
check('Captain Amrica', 'fuzzy_personagem', { alvo: 'marvel-capitao-america' }, 'typo em alias inglês — Cap');

// ── Bloco 5: Ambiguidade legítima — 5 extras aprovados ───────────────────────
console.log('\n── Bloco 5: Ambiguidade legítima e extras aprovados');
check('Joker', 'ambiguo', { minCandidatos: 2 }, 'Joker → DC Coringa + Persona Joker');
check('V',     'ambiguo', { minCandidatos: 2 }, 'V → DMC5 V + Cyberpunk V');
check('2B',    'exato',   null,                 '2B → nier-2b (nome alfanumérico curto)');
check('Sans',  'exato',   null,                 'Sans → ut-sans');
check('Logia', 'fuzzy_personagem', null,        'Logia → fuzzy em Logan/Wolverine via alias');

// ── Bloco 6: Falsos positivos corrigidos (não deve retornar Gordon/Beatrix) ───
console.log('\n── Bloco 6: Anti-regressão — falsos positivos corrigidos');
check('Frodo',       ['sem_match', 'fuzzy_arquetipo', 'fuzzy_ambiguo'], { notAlvo: 'ff2-gordon' },  'Frodo NÃO deve retornar ff2-gordon');
check('Eren Yeager', ['sem_match', 'fuzzy_arquetipo', 'fuzzy_ambiguo'], { notAlvo: 'ff9-beatrix' }, 'Eren Yeager NÃO deve retornar ff9-beatrix');

// ── Bloco 7: Sem match — gibberish e edge cases ───────────────────────────────
console.log('\n── Bloco 7: Sem match e edge cases');
check('Xyzklmnop',  'sem_match',  null,                   'gibberish 1');
check('qwertyuiop', 'sem_match',  null,                   'gibberish 2');
check('',           'erro_input', null,                   'vazio');
check('   ',        'erro_input', null,                   'só espaços');
check('a',          'sem_match',  { motivo: 'input_curto' }, '1 char');
check('ab',         'sem_match',  { motivo: 'input_curto' }, '2 chars');

// ── Fallbacks ─────────────────────────────────────────────────────────────────

console.log('\n── Fallbacks.listarArquetiposParaEscolha()');
const lista = Fallbacks.listarArquetiposParaEscolha();
const ok = Array.isArray(lista) && lista.length === 33;
const mark = ok ? '✓' : '✗';
console.log(`  ${mark} retornou ${lista.length} arquétipos (esperado 33)`);
if (ok) {
  passed++;
  const sample = lista.find(a => a.id === 'guerreiro-escudo');
  if (sample) console.log(`     exemplo guerreiro-escudo.exemplosKB: [${sample.exemplosKB.join(', ')}]`);
} else {
  failed++;
}

// ── Relatório final ───────────────────────────────────────────────────────────

const total = passed + failed;
console.log(`\n=== Resultado: ${passed}/${total} passaram, ${failed} falharam, ${observed} observados ===`);

const kb = Matcher.getKbAll();
console.log(`KB_ALL: ${kb.length} entradas (esperado ~730)`);
