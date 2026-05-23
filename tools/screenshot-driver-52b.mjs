// Screenshot driver — Fase 5.2 retest: Sefiroth (T2) + Eren Yeager (T6)
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '52b');
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

const kbSize = await ev(page, `typeof Matcher !== 'undefined' ? Matcher.getKbAll().length : -1`);
console.log('KB total entries:', kbSize);

// Confirmar que Sephiroth está no KB
const sephEntry = await ev(page, `Matcher.getKbAll().find(e => e.id === 'ff7-sephiroth') ? JSON.stringify({nome: Matcher.getKbAll().find(e=>e.id==='ff7-sephiroth').nome, aliases: Matcher.getKbAll().find(e=>e.id==='ff7-sephiroth').aliases}) : 'NOT FOUND'`);
console.log('Sephiroth entry:', sephEntry);

// ── RETEST 2: Sefiroth → deve agora ser exato via alias ──────────────────
console.log('\n[RETEST 2] Sefiroth → esperado exato ou fuzzy_personagem');
await goInspirado(page);
await buscar(page, 'Sefiroth');
const t2_badge  = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const t2_nome   = await ev(page, `document.querySelector('.gpj-match-nome')?.textContent?.trim()`);
const t2_card   = await ev(page, `document.querySelector('#gpj-busca-resultado')?.innerHTML?.slice(0,300)`);
console.log('  badge:', t2_badge);
console.log('  match nome:', t2_nome);
console.log('  card preview:', t2_card?.replace(/\s+/g,' ').slice(0,200));
await shot(page, '02-sefiroth-retest');

// Também testar ortografia correta
console.log('\n[BONUS] Sephiroth ortografia correta → exato');
await goInspirado(page);
await buscar(page, 'Sephiroth');
const tb_badge = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
const tb_nome  = await ev(page, `document.querySelector('.gpj-match-nome')?.textContent?.trim()`);
console.log('  badge:', tb_badge, '| nome:', tb_nome);
await shot(page, '02b-sephiroth-correto');

// ── RETEST 6: Eren Yeager → sem_match confirmado como esperado ────────────
console.log('\n[RETEST 6] Eren Yeager → sem_match (design decision)');
await goInspirado(page);
await buscar(page, 'Eren Yeager');
const t6_semMatch = await ev(page, `document.querySelector('.gpj-match-sem-resultado') ? 'sem_match' : 'outro'`);
const t6_arqTags  = await ev(page, `document.querySelectorAll('.gpj-arq-tag').length`);
console.log('  resultado:', t6_semMatch, '| arq tags:', t6_arqTags, '(esperado: sem_match + 33 tags)');
await shot(page, '06-eren-sem-match-confirmado');

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
