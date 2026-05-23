// Screenshot driver — Fase 5.2 validation
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '52');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const electronBin = path.join(APP_DIR, 'node_modules', 'electron', 'dist', 'electron.exe');

async function shot(page, name) {
  const f = path.join(SHOT_DIR, name + '.png');
  await page.screenshot({ path: f });
  console.log('  screenshot:', f);
}

async function ev(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return 'ERROR: ' + e.message; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function goInspirado(page) {
  await ev(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gerador-pj').classList.add('ativa');
    GeradorPJ.iniciar();
    GeradorPJ.setModo('inspirado');
  })()`);
  await sleep(400);
}

async function buscar(page, query) {
  await ev(page, `document.getElementById('gpj-busca-input').value = ${JSON.stringify(query)}`);
  await ev(page, `GeradorPJ.buscarInspiracao()`);
  await sleep(500);
}

async function logResultado(page) {
  const tipo  = await ev(page, `_estado_debug ? _estado_debug.resultadoMatch?.tipo : document.querySelector('.gpj-badge')?.textContent?.trim()`);
  const badge = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
  const card  = await ev(page, `document.querySelector('#gpj-busca-resultado')?.innerHTML?.slice(0,200)`);
  console.log('  match card preview:', card?.replace(/\s+/g,' ').slice(0,150));
  console.log('  badge visible:', badge);
}

console.log('Launching Electron…');
const app = await electron.launch({
  executablePath: electronBin,
  args: [APP_DIR],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});
await sleep(4000);

let page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();
console.log('Window:', page.url());

// Check if Matcher is loaded
const matcherReady = await ev(page, `typeof Matcher !== 'undefined' && typeof FuzzySearch !== 'undefined' ? 'ok' : 'missing'`);
console.log('Matcher ready:', matcherReady);

const kbSize = await ev(page, `typeof Matcher !== 'undefined' ? Matcher.getKbAll().length : -1`);
console.log('KB total entries:', kbSize);

// ── TESTE 1: Cloud → exato ────────────────────────────────────────────────
console.log('\n[TEST 1] Cloud → exato com badge 📚 Banco curado');
await goInspirado(page);
await buscar(page, 'Cloud');
await logResultado(page);
const t1_badge = await ev(page, `document.querySelector('.badge-exato')?.textContent?.trim()`);
const t1_btn   = await ev(page, `document.querySelector('.gpj-btn-gerar-insp')?.textContent?.trim()`);
console.log('  badge-exato:', t1_badge, '| gerar btn:', t1_btn);
await shot(page, '01-cloud-exato');

// ── TESTE 2: Sefiroth → fuzzy_personagem ──────────────────────────────────
console.log('\n[TEST 2] Sefiroth → fuzzy_personagem com score');
await goInspirado(page);
await buscar(page, 'Sefiroth');
await logResultado(page);
const t2_badge = await ev(page, `document.querySelector('.badge-fuzzy')?.textContent?.trim()`);
const t2_score = await ev(page, `document.querySelector('.gpj-score')?.textContent?.trim()`);
const t2_hint  = await ev(page, `document.querySelector('.gpj-match-fuzzy-hint')?.textContent?.trim()`);
console.log('  badge-fuzzy:', t2_badge, '| score:', t2_score, '| hint:', t2_hint);
await shot(page, '02-sefiroth-fuzzy');

// ── TESTE 3: Geralt → ambiguo ─────────────────────────────────────────────
console.log('\n[TEST 3] Geralt → ambiguo com 2 candidatos inline');
await goInspirado(page);
await buscar(page, 'Geralt');
await logResultado(page);
const t3_cards = await ev(page, `document.querySelectorAll('.gpj-ambiguo-card').length`);
const t3_nomes = await ev(page, `[...document.querySelectorAll('.gpj-ambiguo-card .gpj-match-nome')].map(e => e.textContent).join(', ')`);
console.log('  ambiguo cards:', t3_cards, '| nomes:', t3_nomes);
await shot(page, '03-geralt-ambiguo');

// ── TESTE 4: Joker → ambiguo ──────────────────────────────────────────────
console.log('\n[TEST 4] Joker → ambiguo com DC + Persona');
await goInspirado(page);
await buscar(page, 'Joker');
await logResultado(page);
const t4_cards = await ev(page, `document.querySelectorAll('.gpj-ambiguo-card').length`);
const t4_nomes = await ev(page, `[...document.querySelectorAll('.gpj-ambiguo-card .gpj-match-nome')].map(e => e.textContent).join(', ')`);
console.log('  ambiguo cards:', t4_cards, '| nomes:', t4_nomes);
await shot(page, '04-joker-ambiguo');

// ── TESTE 5: V → ambiguo (V Cyberpunk + V DMC) ───────────────────────────
console.log('\n[TEST 5] V → ambiguo ou sem_match (length check)');
await goInspirado(page);
await buscar(page, 'V');
await logResultado(page);
const t5_cards = await ev(page, `document.querySelectorAll('.gpj-ambiguo-card').length`);
const t5_nomes = await ev(page, `[...document.querySelectorAll('.gpj-ambiguo-card .gpj-match-nome')].map(e => e.textContent).join(', ')`);
const t5_semMatch = await ev(page, `document.querySelector('.gpj-match-sem-resultado') ? 'sem_match' : 'outro'`);
console.log('  ambiguo cards:', t5_cards, '| nomes:', t5_nomes, '| sem_match?:', t5_semMatch);
await shot(page, '05-v-ambiguo');

// ── TESTE 6: Eren Yeager → fuzzy_arquetipo ────────────────────────────────
console.log('\n[TEST 6] Eren Yeager → fuzzy_arquetipo ou sem_match');
await goInspirado(page);
await buscar(page, 'Eren Yeager');
await logResultado(page);
const t6_arqs  = await ev(page, `document.querySelectorAll('.gpj-arq-sugerido').length`);
const t6_nomes = await ev(page, `[...document.querySelectorAll('.gpj-arq-sugerido-nome')].map(e => e.textContent).join(', ')`);
const t6_badge = await ev(page, `document.querySelector('.badge-arquetipo')?.textContent?.trim()`);
console.log('  arq sugeridos:', t6_arqs, '| nomes:', t6_nomes, '| badge-arquetipo:', t6_badge);
await shot(page, '06-eren-arquetipo');

// ── TESTE 7: Xyzklmnop → sem_match ───────────────────────────────────────
console.log('\n[TEST 7] Xyzklmnop → sem_match com mensagem amigável');
await goInspirado(page);
await buscar(page, 'Xyzklmnop');
await logResultado(page);
const t7_semMatch = await ev(page, `document.querySelector('.gpj-match-sem-resultado') ? 'yes' : 'no'`);
const t7_arqTags  = await ev(page, `document.querySelectorAll('.gpj-arq-tag').length`);
const t7_msg      = await ev(page, `document.querySelector('.gpj-match-nf-msg')?.textContent?.trim()`);
console.log('  sem_match:', t7_semMatch, '| arq tags:', t7_arqTags, '| msg:', t7_msg);
await shot(page, '07-xyzklmnop-sem-match');

// ── TESTE 8: input vazio → erro_input ────────────────────────────────────
console.log('\n[TEST 8] input vazio → erro_input');
await goInspirado(page);
await buscar(page, '');
const t8_card = await ev(page, `document.querySelector('#gpj-busca-resultado .gpj-match-sem-resultado') ? 'show' : document.querySelector('#gpj-busca-resultado')?.innerHTML?.slice(0,100)`);
console.log('  resultado:', t8_card);
await shot(page, '08-vazio-erro-input');

// ── TESTE 9: Aragorn → exato ─────────────────────────────────────────────
console.log('\n[TEST 9] Aragorn → exato');
await goInspirado(page);
await buscar(page, 'Aragorn');
await logResultado(page);
const t9_badge = await ev(page, `document.querySelector('.badge-exato') ? 'sim' : 'nao'`);
console.log('  badge-exato:', t9_badge);
await shot(page, '09-aragorn-exato');

// ── FLUXO: escolherCandidato depois de Geralt → resultado com badge exato ─
console.log('\n[FLUXO] Geralt → escolher candidato[0] → resultado');
await goInspirado(page);
await buscar(page, 'Geralt');
await sleep(300);
await ev(page, `GeradorPJ.escolherCandidato(0)`);
await sleep(600);
const f_badge    = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const f_nome     = await ev(page, `document.querySelector('.gpj-preview-nome')?.textContent?.trim()`);
const f_referencia = await ev(page, `document.querySelector('.gpj-ref-label')?.textContent?.trim()`);
console.log('  badge:', f_badge, '| pj nome:', f_nome, '| referencia:', f_referencia);
await shot(page, '10-geralt-resultado-pos-escolha');

// ── FLUXO: gerarDeArquetipo direto ─────────────────────────────────────────
console.log('\n[FLUXO] gerarDeArquetipo → resultado com badge 🎭');
await goInspirado(page);
await buscar(page, 'Xyzklmnop');
await sleep(300);
const arqId = await ev(page, `ARQUETIPOS[0]?.id`);
console.log('  usando arquétipo:', arqId);
await ev(page, `GeradorPJ.gerarDeArquetipo(${JSON.stringify(arqId)})`);
await sleep(500);
const fa_badge = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
console.log('  badge:', fa_badge);
await shot(page, '11-arq-direto-resultado');

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
