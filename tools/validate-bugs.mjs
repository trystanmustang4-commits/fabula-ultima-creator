/**
 * Validação manual dos 6 suspects do smoke test.
 * Faz interação real (type + click) onde necessário.
 * Gera screenshots + dump de DOM em tools/test-output/screenshots/validate-bugs/
 */
import { _electron as electron } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const EXE  = path.join(ROOT, 'dist', 'win-unpacked', 'Fabula Ultima Creator.exe');
const SHOT = path.join(ROOT, 'tools', 'test-output', 'screenshots', 'validate-bugs');
fs.mkdirSync(SHOT, { recursive: true });

console.log('Launching…');
const app = await electron.launch({
  executablePath: EXE, args: [],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});
await new Promise(r => setTimeout(r, 3500));
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function ev(expr) {
  try { return await page.evaluate(expr); } catch (e) { return `ERROR:${e.message.slice(0, 120)}`; }
}
async function shot(label) {
  await page.screenshot({ path: path.join(SHOT, `${label}.png`) });
}

const report = {};
function verdict(id, result, note) {
  report[id] = { result, note };
  console.log(`\n[${id}] ${result} — ${note}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// K2: Modal de desambiguação
// Objetivo: digitar na caixa de busca real do Inspirado e ver se modal/UI aparece
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('K2: Modal de desambiguação');
console.log('═══════════════════════════════════');

await ev(`App.mostrarGeradorPJ()`); await sleep(500);
await ev(`GeradorPJ.setModo('inspirado')`); await sleep(500);
await shot('K2-01-inspirado');

// Descobre o seletor real do input de busca
const k2InputInfo = await ev(`({
  inputs: Array.from(document.querySelectorAll('#tela-gerador-pj input')).map(i=>({
    type:i.type, placeholder:i.placeholder, id:i.id, className:i.className
  })),
  buttons: Array.from(document.querySelectorAll('#tela-gerador-pj button')).map(b=>({
    text:b.innerText.trim().slice(0,40), onclick:b.getAttribute('onclick')?.slice(0,60)
  }))
})`);
console.log('Inputs disponíveis:', JSON.stringify(k2InputInfo.inputs));
console.log('Botões disponíveis:', JSON.stringify(k2InputInfo.buttons.slice(0, 10)));

// Testa os 3 termos ambíguos: Geralt, Joker, V
for (const termo of ['Geralt', 'Joker', 'Cloud']) {
  console.log(`\n  → Buscando "${termo}"...`);

  // Limpa e digita no input real
  const typed = await page.evaluate((t) => {
    const input = document.querySelector('#tela-gerador-pj input[type=text], #tela-gerador-pj input[type=search], .gpj-busca-input');
    if (!input) return false;
    input.value = t;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }, termo);
  console.log(`    Input preenchido: ${typed}`);

  // Clica no botão de buscar (Enter ou botão submit)
  const submitted = await page.evaluate(() => {
    // Tenta botão de busca
    const btn = Array.from(document.querySelectorAll('#tela-gerador-pj button'))
      .find(b => b.getAttribute('onclick')?.includes('buscar') ||
                 b.getAttribute('onclick')?.includes('Buscar') ||
                 b.getAttribute('onclick')?.includes('Inspirado') ||
                 b.innerText.toLowerCase().includes('buscar') ||
                 b.innerText.toLowerCase().includes('gerar'));
    if (btn) { btn.click(); return `clicked: ${btn.innerText.trim()}`; }
    // Tenta Enter no input
    const input = document.querySelector('#tela-gerador-pj input[type=text], .gpj-busca-input');
    if (input) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, bubbles: true }));
      return 'pressed Enter';
    }
    return 'nothing';
  });
  console.log(`    Submit: ${submitted}`);
  await sleep(700);

  const k2State = await ev(`({
    resultadoView: (document.querySelector('.gpj-wrapper,.gpj-resultado,#gpj-conteudo')?.innerHTML??'').slice(0,300),
    anyModal: Array.from(document.querySelectorAll('.modal-overlay,.modal')).filter(el=>getComputedStyle(el).display!=='none'&&el.offsetParent!==null).map(el=>el.id||el.className.slice(0,40)),
    candidatos: document.querySelectorAll('[onclick*="escolherCandidato"],[class*="candidato"],[class*="desambig"]').length,
    mainText: (document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,400),
  })`);

  console.log(`    Modais abertos: ${JSON.stringify(k2State.anyModal)}`);
  console.log(`    Candidatos: ${k2State.candidatos}`);
  console.log(`    Main text: ${k2State.mainText.slice(0, 200)}`);
  await shot(`K2-${termo.toLowerCase()}-resultado`);
}

// Verifica o resultado visual atual
const k2Final = await ev(`({
  visivel: (document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,600),
  modais: Array.from(document.querySelectorAll('.modal-overlay,.modal')).filter(el=>el.offsetParent!==null).map(el=>({id:el.id,class:el.className.slice(0,50),display:getComputedStyle(el).display}))
})`);
console.log('\nEstado final K2:');
console.log('Texto visível:', k2Final.visivel.slice(0, 300));
console.log('Modais:', JSON.stringify(k2Final.modais));

// ─────────────────────────────────────────────────────────────────────────────
// L4: Filtro no modal de arquétipos
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('L4: Filtro no modal de arquétipos');
console.log('═══════════════════════════════════');

// Forçar sem_match para aparecer botão "Escolher arquétipo"
await ev(`App.mostrarGeradorPJ();GeradorPJ.setModo('inspirado')`); await sleep(400);
await page.evaluate(() => {
  const input = document.querySelector('#tela-gerador-pj input[type=text], .gpj-busca-input');
  if (input) { input.value = 'Xyzklmnop'; input.dispatchEvent(new Event('input', { bubbles: true })); }
});
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('#tela-gerador-pj button'))
    .find(b => b.getAttribute('onclick')?.includes('buscar') || b.innerText.toLowerCase().includes('buscar') || b.innerText.toLowerCase().includes('gerar'));
  if (btn) btn.click();
  else {
    const input = document.querySelector('#tela-gerador-pj input');
    if (input) input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
  }
});
await sleep(700);
await shot('L4-01-sem-match');

const l4SemMatch = await ev(`(document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,400)`);
console.log('Texto sem_match:', l4SemMatch.slice(0, 200));

// Abre modal de arquétipos — tenta botão visível + fallback API pública
const l4ModalOpened = await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button'))
    .find(b => b.innerText.toLowerCase().includes('arquétipo') ||
               b.innerText.toLowerCase().includes('arquetipo') ||
               b.innerText.toLowerCase().includes('escolher'));
  if (btn) { btn.click(); return `clicked: ${btn.innerText.trim()}`; }
  if (typeof GeradorPJ.abrirModalArquetipos === 'function') {
    GeradorPJ.abrirModalArquetipos();
    return 'called abrirModalArquetipos()';
  }
  return 'nada encontrado';
});
console.log('Abertura do modal:', l4ModalOpened);
await sleep(600);
await shot('L4-02-modal-arq');

const l4ModalContent = await ev(`({
  overlay: !!document.querySelector('.modal-overlay.ativo, .modal.ativo, [class*="modal"][style*="block"], [class*="modal"][style*="flex"]'),
  allModals: Array.from(document.querySelectorAll('.modal-overlay,.modal')).filter(el=>el.offsetParent!==null).map(el=>({id:el.id,class:el.className.slice(0,60)})),
  inputs: Array.from(document.querySelectorAll('input')).filter(el=>el.offsetParent!==null).map(i=>({type:i.type,placeholder:i.placeholder,id:i.id,class:i.className})),
  arquCards: document.querySelectorAll('[class*="arq-card"],[onclick*="escolherArq"],[onclick*="selecionarArq"]').length,
  modalText: (document.querySelector('.modal-overlay.ativo,.modal.ativo')?.innerText??'').slice(0,300),
  allText: (document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,500),
})`);

console.log('Modal aberto?', l4ModalContent.overlay);
console.log('Todos os modais visíveis:', JSON.stringify(l4ModalContent.allModals));
console.log('Inputs visíveis:', JSON.stringify(l4ModalContent.inputs));
console.log('Arquétipo cards:', l4ModalContent.arquCards);
console.log('Texto no modal:', l4ModalContent.modalText.slice(0, 200));

// ─────────────────────────────────────────────────────────────────────────────
// E4: Seção "Laços" na ficha
// Gera PJ via gerador → edita no wizard → força step 7 → conclui → ficha
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('E4: Seção Laços na ficha');
console.log('═══════════════════════════════════');

// Fecha modal se aberto
await ev(`const o=document.querySelector('.modal-overlay.ativo');if(o){const x=o.querySelector('[onclick*="fechar"],button');if(x)x.click();else o.classList.remove('ativo')}`);
await sleep(300);

// Gera PJ aleatório
await ev(`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(400);
await ev(`GeradorPJ.gerarAleatorio()`); await sleep(900);
await shot('E4-01-resultado-gerador');

const e4ResultadoText = await ev(`(document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,300)`);
console.log('Estado resultado gerador:', e4ResultadoText.slice(0, 150));

// Clica "Editar no Wizard"
await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button'))
    .find(b => b.innerText.includes('Wizard') || b.innerText.includes('Editar') || b.getAttribute('onclick')?.includes('Wizard'));
  if (btn) btn.click();
});
await sleep(700);

const e4TelaPosEditar = await ev(`document.querySelector('.tela.ativa')?.id`);
console.log('Tela após "Editar no Wizard":', e4TelaPosEditar);

// Força passo 7 (finalização) e conclui
await ev(`Estado.passoAtual=7;App.renderizarPasso()`); await sleep(400);
await ev(`if(!Estado.personagem.nome||Estado.personagem.nome.trim()==='')Estado.personagem.nome='Teste';const inp=document.querySelector('#wizard-main input[type=text]');if(inp){inp.value='Teste';inp.dispatchEvent(new Event('input'))}`);
await sleep(200);
await ev(`App.proximoPasso()`); await sleep(700);

const e4TelaFinal = await ev(`document.querySelector('.tela.ativa')?.id`);
console.log('Tela final (esperado tela-ficha):', e4TelaFinal);
await shot('E4-02-ficha');

// Inspeciona ficha completa
const e4FichaInspect = await ev(`({
  tela: document.querySelector('.tela.ativa')?.id,
  texto: (document.querySelector('#tela-ficha')?.innerText??'').slice(0,2000),
  html_snippet: (document.querySelector('#tela-ficha')?.innerHTML??'').slice(0,3000),
  classesPresentes: Array.from(document.querySelectorAll('#tela-ficha *')).map(el=>el.className).filter(c=>c&&typeof c==='string'&&c.length>0).slice(0,80),
  hasLacoText: (document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('laço'),
  hasLacoClass: !!document.querySelector('#tela-ficha [class*="laco"],[class*="vinculo"],[class*="bond"]'),
  hasVinculo: (document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('vínculo')||(document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('vinculo'),
  allSectionTitles: Array.from(document.querySelectorAll('#tela-ficha h2,#tela-ficha h3,#tela-ficha .secao-titulo,[class*="titulo"]')).map(el=>el.innerText.trim()),
})`);

console.log('\nFicha — Texto (primeiros 800 chars):');
console.log(e4FichaInspect.texto.slice(0, 800));
console.log('\nClasses CSS presentes na ficha:');
console.log([...new Set(e4FichaInspect.classesPresentes)].join(', ').slice(0, 400));
console.log('\nTítulos de seções:', JSON.stringify(e4FichaInspect.allSectionTitles));
console.log('hasLacoText:', e4FichaInspect.hasLacoText);
console.log('hasLacoClass:', e4FichaInspect.hasLacoClass);
console.log('hasVinculo:', e4FichaInspect.hasVinculo);

// ─────────────────────────────────────────────────────────────────────────────
// N13: Botão "Novo Personagem" — listar todos os botões no resultado
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('N13: Botões na view resultado');
console.log('═══════════════════════════════════');

// Gera novo PJ
await ev(`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(400);
await ev(`GeradorPJ.gerarAleatorio()`); await sleep(900);
await shot('N13-01-resultado');

const n13Botoes = await ev(`({
  tela: document.querySelector('.tela.ativa')?.id,
  todosOsBotoes: Array.from(document.querySelectorAll('#tela-gerador-pj button')).filter(b=>b.offsetParent!==null).map(b=>({
    text: b.innerText.trim(),
    onclick: b.getAttribute('onclick'),
    class: b.className,
  })),
  textoVisivel: (document.querySelector('#tela-gerador-pj')?.innerText??'').slice(0,500),
})`);

console.log('Tela ativa:', n13Botoes.tela);
console.log('\nTodos os botões visíveis no resultado:');
n13Botoes.todosOsBotoes.forEach((b, i) => console.log(`  [${i}] "${b.text}" → ${b.onclick?.slice(0,70)}`));

// ─────────────────────────────────────────────────────────────────────────────
// O3: Banner no wizard após "Editar no Wizard"
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('O3: Banner no wizard após editar do gerador');
console.log('═══════════════════════════════════');

const o3EditBtn = await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button'))
    .find(b => b.innerText.includes('Wizard') || b.innerText.includes('Editar') || b.getAttribute('onclick')?.includes('Wizard'));
  if (btn) { btn.click(); return btn.innerText.trim(); }
  return null;
});
console.log('Clicou em:', o3EditBtn);
await sleep(700);
await shot('O3-01-wizard');

const o3State = await ev(`({
  tela: document.querySelector('.tela.ativa')?.id,
  bannerClass: !!document.querySelector('[class*="banner"]'),
  allBannerEls: Array.from(document.querySelectorAll('[class*="banner"],[class*="aviso"],[class*="info-bar"],[class*="context"]')).map(el=>({id:el.id,class:el.className.slice(0,60),text:el.innerText.trim().slice(0,60)})),
  wizardHeaderHTML: (document.querySelector('#wizard-header,#passos-header,.wizard-header')?.innerHTML??'').slice(0,500),
  topOfWizard: (document.querySelector('#tela-wizard')?.innerHTML??'').slice(0,1000),
})`);

console.log('Tela ativa:', o3State.tela);
console.log('Banner por [class*="banner"]?', o3State.bannerClass);
console.log('Todos banner-like elements:', JSON.stringify(o3State.allBannerEls));
console.log('\nHTTP wizard top HTML snippet:');
console.log(o3State.topOfWizard.slice(0, 600));

// ─────────────────────────────────────────────────────────────────────────────
// F9: Botão "Remover imagem" no passo 7 do wizard
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════');
console.log('F9: Botão remover imagem no wizard passo 7');
console.log('═══════════════════════════════════');

// Forçar wizard passo 7
await ev(`Estado.passoAtual=7;App.renderizarPasso()`); await sleep(400);
await shot('F9-01-passo7');

const f9State = await ev(`({
  tela: document.querySelector('.tela.ativa')?.id,
  passo: Estado.passoAtual,
  temImagem: !!Estado.personagem?.imagem,
  // Todos os botões no passo 7
  botoesPasso7: Array.from(document.querySelectorAll('#wizard-main button')).map(b=>({
    text: b.innerText.trim(),
    onclick: b.getAttribute('onclick'),
    class: b.className,
  })),
  // Qualquer coisa que mencione "remov" no DOM
  removElements: Array.from(document.querySelectorAll('[onclick*="remov"],[class*="remov"],[data-action*="remov"]')).map(el=>({tag:el.tagName,text:el.innerText?.trim()?.slice(0,30),onclick:el.getAttribute('onclick')})),
  // HTML completo do passo 7
  wizard7HTML: (document.querySelector('#wizard-main')?.innerHTML??'').slice(0,2000),
})`);

console.log('Passo atual:', f9State.passo, '| Tem imagem:', f9State.temImagem);
console.log('\nBotões no wizard passo 7:');
f9State.botoesPasso7.forEach((b, i) => console.log(`  [${i}] "${b.text}" → ${b.onclick?.slice(0,70)}`));
console.log('\nElementos com "remov":', JSON.stringify(f9State.removElements));

// Agora testa COM imagem (injeta URL de imagem)
await ev(`Estado.personagem.imagem='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';App.renderizarPasso()`); await sleep(400);
await shot('F9-02-com-imagem');

const f9ComImagem = await ev(`({
  botoes: Array.from(document.querySelectorAll('#wizard-main button')).map(b=>({text:b.innerText.trim(),onclick:b.getAttribute('onclick')})),
  removBtn: !!document.querySelector('#wizard-main [onclick*="remov"]'),
})`);
console.log('\nBotões COM imagem injetada:');
f9ComImagem.botoes.forEach((b, i) => console.log(`  [${i}] "${b.text}" → ${b.onclick?.slice(0,70)}`));
console.log('Botão remover presente com imagem:', f9ComImagem.removBtn);

// Remove imagem e verifica sem imagem
await ev(`Estado.personagem.imagem=null;App.renderizarPasso()`); await sleep(300);
const f9SemImagem = await ev(`({
  botoes: Array.from(document.querySelectorAll('#wizard-main button')).map(b=>({text:b.innerText.trim(),onclick:b.getAttribute('onclick')})),
  removBtn: !!document.querySelector('#wizard-main [onclick*="remov"]'),
})`);
console.log('\nBotões SEM imagem:');
f9SemImagem.botoes.forEach((b, i) => console.log(`  [${i}] "${b.text}" → ${b.onclick?.slice(0,70)}`));
console.log('Botão remover presente sem imagem:', f9SemImagem.removBtn);

// ─────────────────────────────────────────────────────────────────────────────
// Encerramento
// ─────────────────────────────────────────────────────────────────────────────
await app.close();
console.log('\n═══════════════════════════════════');
console.log('Screenshots salvas em:', SHOT);
console.log('Script concluído.');
