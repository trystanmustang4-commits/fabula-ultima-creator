// Screenshot driver — Fase 5.6 validation
import { _electron as electron } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const APP_DIR  = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const SHOT_DIR = path.join(APP_DIR, 'tools', 'test-output', 'screenshots', '56');
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

async function goGerador(page) {
  await ev(page, `(function(){
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gerador-pj').classList.add('ativa');
    GeradorPJ.iniciar();
  })()`);
  await sleep(300);
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

const checks = await ev(page, `({ GeradorPJ: typeof GeradorPJ, Matcher: typeof Matcher })`);
console.log('Globals:', JSON.stringify(checks));

// ── C1: View transitions — fadeIn animação existe ────────────────────────────
console.log('\n[C1] Animação fadeIn no CSS');
const c1_anim = await ev(page, `(function(){
  const el = document.createElement('div');
  el.className = 'gpj-painel';
  document.body.appendChild(el);
  const s = getComputedStyle(el).animation;
  el.remove();
  return s;
})()`);
console.log('  .gpj-painel animation:', c1_anim, '(esperado: fadeIn presente)');
await shot(page, '01-check-css-animation');

// ── C2: Modo view aparece com animação ───────────────────────────────────────
console.log('\n[C2] View modo com fadeIn');
await goGerador(page);
await sleep(300);
const c2_view = await ev(page, `document.querySelector('.gpj-view-modo') ? 'existe' : 'ausente'`);
console.log('  .gpj-view-modo:', c2_view, '(esperado: existe)');
await shot(page, '02-modo-view-fadein');

// ── C3: Modal arquetipos animation ───────────────────────────────────────────
console.log('\n[C3] Modal arquétipos — animação modalSlideUp');
await ev(page, `GeradorPJ.setModo('aleatorio')`);
await sleep(300);
await ev(page, `GeradorPJ.abrirModalArquetipos()`);
await sleep(400);
const c3_modal  = await ev(page, `document.querySelector('.modal-arquetipos-conteudo') ? 'existe' : 'ausente'`);
const c3_anim   = await ev(page, `(function(){
  const el = document.querySelector('.modal-arquetipos-conteudo');
  return el ? getComputedStyle(el).animation : 'n/a';
})()`);
console.log('  modal:', c3_modal, '| animation:', c3_anim.slice(0, 60));
await shot(page, '03-modal-arquetipos-animation');
await page.keyboard.press('Escape');
await sleep(200);

// ── C4: Spinner em gerarAleatorio ────────────────────────────────────────────
console.log('\n[C4] Spinner no botão Gerar Personagem');
const c4_btnBefore = await ev(page, `document.querySelector('.gpj-btn-gerar')?.textContent?.trim()`);
console.log('  botão antes:', c4_btnBefore);
// Trigger generate and catch spinner mid-flight
await ev(page, `GeradorPJ.gerarAleatorio()`);
const c4_spinnerMid = await ev(page, `document.querySelector('.gpj-btn-gerar .spinner-btn') ? 'spinner-visivel' : 'spinner-ausente-ou-ja-navegou'`);
console.log('  spinner mid:', c4_spinnerMid);
await sleep(300);
const c4_resultado = await ev(page, `document.querySelector('.gpj-resultado') ? 'resultado' : 'outro'`);
console.log('  view após gerar:', c4_resultado, '(esperado: resultado)');
await shot(page, '04-resultado-apos-spinner');

// ── C5: Badge com title attribute ────────────────────────────────────────────
console.log('\n[C5] Badge com title');
const c5_title = await ev(page, `document.querySelector('.gpj-badge')?.getAttribute('title')`);
console.log('  badge title:', c5_title, '(esperado: não vazio)');

// ── C6: Wizard banner ao carregarNoWizard ────────────────────────────────────
console.log('\n[C6] Wizard banner ao entrar no wizard');
await ev(page, `GeradorPJ.carregarNoWizard()`);
await sleep(400);
const c6_banner = await ev(page, `document.getElementById('gpj-wizard-banner') ? 'existe' : 'ausente'`);
const c6_texto  = await ev(page, `document.querySelector('.gpj-wizard-banner-texto')?.textContent?.trim()?.slice(0, 60)`);
const c6_fechar = await ev(page, `document.querySelector('.gpj-banner-fechar') ? 'existe' : 'ausente'`);
console.log('  banner:', c6_banner, '(esperado: existe)');
console.log('  texto:', c6_texto);
console.log('  botão fechar:', c6_fechar, '(esperado: existe)');
await shot(page, '05-wizard-banner');

// ── C7: Banner pode ser fechado ───────────────────────────────────────────────
console.log('\n[C7] Fechar wizard banner');
await ev(page, `document.querySelector('.gpj-banner-fechar')?.click()`);
await sleep(150);
const c7_gone = await ev(page, `document.getElementById('gpj-wizard-banner') ? 'existe' : 'removido'`);
console.log('  banner após fechar:', c7_gone, '(esperado: removido)');

// ── C8: Navegação — spinner filtrando no dropdown ────────────────────────────
console.log('\n[C8] Filtrando badge ao trocar dropdown');
await goGerador(page);
await ev(page, `GeradorPJ.mostrarNavegacao()`);
await sleep(400);
// Trigger dropdown change without awaiting full re-render
await ev(page, `GeradorPJ.atualizarNavegacao('filtroCategoria', 'anime')`);
const c8_filtrando = await ev(page, `document.querySelector('.nav-filtrando') ? 'visivel' : 'ausente-ou-ja-renderizou'`);
console.log('  badge filtrando:', c8_filtrando);
await sleep(300);
const c8_after = await ev(page, `document.querySelector('.nav-banco-contador')?.textContent?.trim()?.slice(0, 50)`);
console.log('  contador após filtro:', c8_after);
await shot(page, '06-filtrando-badge');

// ── C9: Empty state melhorado ────────────────────────────────────────────────
console.log('\n[C9] Empty state com ícone e botão limpar');
await ev(page, `GeradorPJ.limparFiltrosNavegacao()`);
await sleep(200);
await ev(page, `GeradorPJ.atualizarNavegacao('termoBusca', 'xyzzy_impossivel_123')`);
await sleep(300);
const c9_icone = await ev(page, `document.querySelector('.nav-banco-vazio-icone') ? 'existe' : 'ausente'`);
const c9_msg   = await ev(page, `document.querySelector('.nav-banco-vazio-msg')?.textContent?.trim()`);
const c9_link  = await ev(page, `document.querySelector('.nav-link-btn') ? 'existe' : 'ausente'`);
console.log('  ícone:', c9_icone, '(esperado: existe)');
console.log('  msg:', c9_msg);
console.log('  link limpar:', c9_link, '(esperado: existe)');
await shot(page, '07-empty-state-melhorado');

// ── C10: Spinner gerarInspiracao ──────────────────────────────────────────────
console.log('\n[C10] Spinner no Inspirado → Gerar como...');
await goGerador(page);
await ev(page, `GeradorPJ.setModo('inspirado')`);
await sleep(300);
// Busca Cloud diretamente via estado
await ev(page, `GeradorPJ.buscarInspiracao.toString()` ); // just verify
await ev(page, `(function(){
  const inp = document.getElementById('gpj-busca-input');
  if (inp) { inp.value = 'Cloud'; }
  GeradorPJ.buscarInspiracao();
})()`);
await sleep(500);
const c10_card = await ev(page, `document.querySelector('.gpj-busca-encontrado') ? 'encontrado' : 'ausente'`);
console.log('  resultado busca Cloud:', c10_card, '(esperado: encontrado)');
if (c10_card === 'encontrado') {
  await ev(page, `GeradorPJ.gerarInspiracao()`);
  const c10_spinner = await ev(page, `document.querySelector('.gpj-btn-gerar-insp .spinner-btn') ? 'spinner' : 'ja-navegou'`);
  console.log('  spinner mid:', c10_spinner);
  await sleep(300);
  const c10_res = await ev(page, `document.querySelector('.gpj-resultado') ? 'resultado' : 'outro'`);
  console.log('  resultado:', c10_res, '(esperado: resultado)');
  const c10_badge = await ev(page, `document.querySelector('.gpj-badge')?.textContent?.trim()`);
  const c10_ref   = await ev(page, `document.querySelector('.gpj-ref-label')?.textContent?.trim()`);
  console.log('  badge:', c10_badge, '| ref:', c10_ref);
  await shot(page, '08-inspirado-cloud-resultado');
}

// ── C11: Modal personagem slideUp ─────────────────────────────────────────────
console.log('\n[C11] Modal personagem — animação');
await goGerador(page);
await ev(page, `GeradorPJ.mostrarNavegacao()`);
await sleep(400);
await ev(page, `document.querySelector('.nav-card-btn')?.click()`);
await sleep(400);
const c11_modal = await ev(page, `document.getElementById('modal-personagem')?.classList.contains('ativo')`);
const c11_anim  = await ev(page, `(function(){
  const el = document.querySelector('.modal-personagem-conteudo');
  return el ? getComputedStyle(el).animation.slice(0, 60) : 'n/a';
})()`);
console.log('  modal ativo:', c11_modal, '(esperado: true)');
console.log('  animation:', c11_anim);
await shot(page, '09-modal-personagem-slideup');

// ── C12: focus-visible outline existe no CSS ──────────────────────────────────
console.log('\n[C12] :focus-visible CSS existe');
const c12_style = await ev(page, `(function(){
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('focus-visible')) return 'encontrado: ' + rule.selectorText.slice(0,50);
      }
    } catch(e) {}
  }
  return 'nao-encontrado';
})()`);
console.log('  focus-visible rule:', c12_style);

// ── C13: btn-exportar-pdf tem id ──────────────────────────────────────────────
console.log('\n[C13] btn-exportar-pdf tem id em index.html');
// Navigate to ficha to check
await ev(page, `(function(){
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-ficha').classList.add('ativa');
})()`);
await sleep(200);
const c13_btn = await ev(page, `document.getElementById('btn-exportar-pdf') ? 'existe' : 'ausente'`);
console.log('  #btn-exportar-pdf:', c13_btn, '(esperado: existe)');
await shot(page, '10-ficha-btn-pdf-id');

console.log('\nAll screenshots saved to:', SHOT_DIR);
await app.close();
process.exit(0);
