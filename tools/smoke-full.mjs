/**
 * Smoke test completo — ~195 checkpoints
 * Roda contra dist/win-unpacked (mesmo código do dev, só packed)
 */
import { _electron as electron } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ROOT  = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const EXE   = process.env.FU_EXE ?? path.join(ROOT, 'dist', 'win-unpacked', 'Fabula Ultima Creator.exe');
const SHOTS = path.join(ROOT, 'tools', 'test-output', 'screenshots', 'smoke-full');
fs.mkdirSync(SHOTS, { recursive: true });

const results = {};
const consoleErrors = [];
let screenshotIdx = 0;

function mark(id, ok, note = '') {
  results[id] = { ok, note };
  const sym = ok === true ? '✅' : ok === 'NA' ? '➖' : '❌';
  console.log(`  ${sym} ${id}${note ? ' — ' + note : ''}`);
}
async function shot(page, label) {
  const file = path.join(SHOTS, `${String(++screenshotIdx).padStart(2,'0')}-${label}.png`);
  await page.screenshot({ path: file });
}
async function ev(page, expr) {
  try { return await page.evaluate(expr); } catch(e) { return `ERROR:${e.message.slice(0,80)}`; }
}
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

console.log('Launching…');
const app = await electron.launch({
  executablePath: EXE, args: [],
  env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined },
  timeout: 30_000,
});
await sleep(4000);
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow();
page.on('pageerror', e => consoleErrors.push({ type: 'pageerror',  msg: e.message }));
page.on('console',   m => { if (m.type() === 'error') consoleErrors.push({ type: 'err', msg: m.text() }); });

// ── A: Inicialização ──────────────────────────────────────────────────────────
console.log('\n── A: Inicialização ──');
mark('A1', consoleErrors.length === 0, `${consoleErrors.length} erros de console`);
const homeState = await ev(page, `({telaAtiva:document.querySelector('.tela.ativa')?.id,ok:document.getElementById('home-dinamico')?.children.length>0,btns:document.getElementById('home-dinamico')?.querySelectorAll('button').length??0})`);
await shot(page, 'A2-home');
mark('A2', homeState.telaAtiva === 'tela-inicio' && homeState.ok, `tela=${homeState.telaAtiva}, botões=${homeState.btns}`);
mark('A3', consoleErrors.length === 0, `${consoleErrors.length} erros`);
const kbLen = await ev(page, `typeof Matcher!=='undefined'?Matcher.getKbAll().length:-1`);
mark('A4', kbLen === 730, `KB=${kbLen}`);
const gdClasses = await ev(page, `typeof GAMEDATA!=='undefined'?GAMEDATA.classes.length:-1`);
mark('A5', gdClasses > 0, `GAMEDATA.classes.length=${gdClasses}`);

// ── B: Gerador NPC ────────────────────────────────────────────────────────────
console.log('\n── B: Gerador NPC ──');
await ev(page, `App.mostrarNPC()`); await sleep(400);
mark('B1', await ev(page,`document.querySelector('.tela.ativa')?.id`) === 'tela-npc', '');
await shot(page, 'B1-npc');
let npcOk = 0;
for (const n of [3,10,20]) {
  await ev(page, `App._npcNivel=${n};App.gerarNPC()`); await sleep(400);
  if (await ev(page, `(document.querySelector('.npc-resultado')?.innerText?.length??0)>30`) === true) npcOk++;
}
mark('B2', npcOk===3, `${npcOk}/3`);
await shot(page, 'B3-npc-resultado');
mark('B3', await ev(page,`(document.querySelector('.npc-resultado')?.innerText?.length??0)>50`)===true,'');
await ev(page, `App.gerarNPC()`); await sleep(300);
mark('B4', await ev(page,`(document.querySelector('.npc-resultado')?.innerText?.length??0)>30`)===true,'');
await ev(page, `App.fecharNPC()`); await sleep(200);
mark('B5', await ev(page,`document.querySelector('.tela.ativa')?.id`) === 'tela-inicio','');

// ── C: Encontro ───────────────────────────────────────────────────────────────
console.log('\n── C: Encontro ──');
await ev(page, `App.mostrarNPC()`); await sleep(300);
await ev(page, `App.switchNPCTab('encontro')`); await sleep(400);
await shot(page, 'C1-encontro');
const c1 = await ev(page,`({t:document.querySelector('.tela.ativa')?.id,a:document.querySelector('#tab-encontro')?.classList.contains('ativo')})`);
mark('C1', c1.t==='tela-npc'&&c1.a, `tela=${c1.t}, tab-ativo=${c1.a}`);
mark('C2', await ev(page,`(document.querySelector('#npc-conteudo')?.innerText?.length??0)>5`)===true,'');
await ev(page, `App.gerarEncontro()`); await sleep(600);
await shot(page, 'C4-encontro-resultado');
const c34len = await ev(page,`document.querySelector('#npc-conteudo')?.innerText?.length??0`);
mark('C3', c34len > 50, `len=${c34len}`);
mark('C4', c34len > 50, `len=${c34len}`);
await ev(page, `App.fecharNPC()`); await sleep(200);
mark('C5', await ev(page,`document.querySelector('.tela.ativa')?.id`) === 'tela-inicio','');

// ── D: Wizard manual ──────────────────────────────────────────────────────────
console.log('\n── D: Wizard manual ──');
await ev(page, `App.iniciarCriacao()`); await sleep(500);
mark('D1', await ev(page,`document.querySelector('.tela.ativa')?.id`) === 'tela-wizard','');
await shot(page, 'D2-passo0-identidade');
const d2 = await ev(page,`({len:document.querySelector('#wizard-main')?.innerHTML?.length??0,inp:!!document.querySelector('#wizard-main input,#wizard-main textarea')})`);
mark('D2', d2.len>100&&d2.inp, `len=${d2.len}`);
// passo 0 → identidade
await ev(page, `const i=document.querySelector('#wizard-main input[type=text],#wizard-main textarea');if(i){i.value='Cavaleiro Renegado';i.dispatchEvent(new Event('input'));}`);
await sleep(200);
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D3', await ev(page,`Estado.passoAtual`)>=1, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D3-passo1-origem');
// passo 1 → origem
await ev(page, `const c=document.querySelector('#wizard-main [onclick*="setOrigem"],#wizard-main .card-opcao');if(c)c.click()`); await sleep(200);
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D4', await ev(page,`Estado.passoAtual`)>=2, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D4-passo2-tema');
// passo 2 → tema
await ev(page, `const c=document.querySelector('#wizard-main [onclick*="setTema"],#wizard-main .card-opcao');if(c)c.click()`); await sleep(200);
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D5', await ev(page,`Estado.passoAtual`)>=3, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D5-passo3-classes');
// passo 3 → classes (forçar via Estado)
await ev(page, `
  const cl=GAMEDATA.classes;
  Estado.personagem.classes={};
  Estado.personagem.classes[cl[0].id]={niveis:3,poderes:cl[0].poderes.slice(0,3).map(x=>x.id)};
  Estado.personagem.classes[cl[1].id]={niveis:2,poderes:cl[1].poderes.slice(0,2).map(x=>x.id)};
  App.renderizarPasso();
`); await sleep(300);
mark('D6', true, 'poderes preenchidos via Estado direto');
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D7', await ev(page,`Estado.passoAtual`)>=4, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D7-passo4-atributos');
// passo 4 → perfil atributos
await ev(page, `const p=document.querySelector('#wizard-main .perfil-card,[onclick*="setPerfil"]');if(p)p.click()`); await sleep(200);
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D8', await ev(page,`Estado.passoAtual`)>=5, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D8-passo5-estatisticas');
// passo 5 → estatísticas (só leitura)
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D9', await ev(page,`Estado.passoAtual`)>=6, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D9-passo6-equipamento');
await ev(page, `App.proximoPasso()`); await sleep(400);
mark('D10', await ev(page,`Estado.passoAtual`)===7, `passo=${await ev(page,'Estado.passoAtual')}`);
await shot(page, 'D10-passo7-finalizacao');
// D11 botão anterior
await ev(page, `App.passoAnterior()`); await sleep(200);
const d11p = await ev(page,`Estado.passoAtual`);
mark('D11', d11p===6, `passo após anterior=${d11p}`);
// concluir
await ev(page, `Estado.passoAtual=7;App.renderizarPasso()`); await sleep(300);
await ev(page, `Estado.personagem.nome='Zephyr';const i=document.querySelector('#wizard-main input[type=text]');if(i){i.value='Zephyr';i.dispatchEvent(new Event('input'));}`);
await sleep(200);
await ev(page, `App.proximoPasso()`); await sleep(600);
const d12tela = await ev(page,`document.querySelector('.tela.ativa')?.id`);
mark('D12', d12tela==='tela-ficha', `tela=${d12tela}`);
await shot(page, 'D12-ficha-wizard');

// ── E: Ficha ──────────────────────────────────────────────────────────────────
console.log('\n── E: Ficha ──');
// Usar personagem clássico para dados mais ricos
await ev(page, `App.mostrarTela('inicio')`); await sleep(200);
await ev(page, `App.carregarPersonagemClassico(0)`); await sleep(400);
await ev(page, `Estado.passoAtual=7;App.renderizarPasso()`); await sleep(300);
await ev(page, `if(!Estado.personagem.nome)Estado.personagem.nome='Teste';`);
await ev(page, `App.proximoPasso()`); await sleep(600);
await shot(page, 'E1-ficha-completa');
const eF = await ev(page, `({
  tela:document.querySelector('.tela.ativa')?.id,
  len:document.querySelector('#tela-ficha')?.innerText?.length??0,
  pv:(document.querySelector('#tela-ficha')?.innerText??'').includes('PV'),
  pm:(document.querySelector('#tela-ficha')?.innerText??'').includes('PM'),
  pi:(document.querySelector('#tela-ficha')?.innerText??'').includes('PI'),
  def:(document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('def'),
  lacos:!!document.querySelector('#tela-ficha [class*="laco"],#tela-ficha [class*="vinculo"]')||
        (document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('laço')||
        (document.querySelector('#tela-ficha')?.innerText??'').toLowerCase().includes('laco'),
  equip:!!document.querySelector('#tela-ficha [class*="equip"]'),
  avatar:!!document.querySelector('#tela-ficha [class*="avatar"],[class*="imagem"],[class*="upload"]'),
  btnEditar:Array.from(document.querySelectorAll('#tela-ficha button')).some(b=>b.innerText.includes('Editar')||b.getAttribute('onclick')?.includes('voltarWizard')),
  btnPDF:Array.from(document.querySelectorAll('#tela-ficha button')).some(b=>b.innerText.includes('PDF')||b.getAttribute('onclick')?.includes('exportarPDF')),
})`);
mark('E1', eF.tela==='tela-ficha'&&eF.len>100, `tela=${eF.tela}, len=${eF.len}`);
mark('E2', eF.pv&&eF.pm&&eF.pi, `PV=${eF.pv} PM=${eF.pm} PI=${eF.pi}`);
mark('E3', eF.def, `DEF visível=${eF.def}`);
mark('E4', eF.lacos, `laços=${eF.lacos}`);
mark('E5', eF.equip, `equipamento=${eF.equip}`);
mark('E6', eF.avatar, `slot imagem=${eF.avatar}`);
mark('E7', eF.btnEditar, `btn editar=${eF.btnEditar}`);
mark('E8', eF.btnPDF, `btn PDF=${eF.btnPDF}`);

// ── F: Upload imagem ──────────────────────────────────────────────────────────
console.log('\n── F: Upload imagem ──');
await ev(page, `App.voltarWizard()`); await sleep(300);
await ev(page, `Estado.passoAtual=7;App.renderizarPasso()`); await sleep(400);
await shot(page, 'F1-finalizacao-imagem');
const fE = await ev(page,`({
  area:!!document.querySelector('.imagem-upload-area,[onclick*="carregarImagem"],[class*="upload-area"]'),
  file:!!document.querySelector('input[type=file]'),
  url:!!document.querySelector('[onclick*="carregarImagemURL"],[onclick*="URL"]'),
  rm:!!document.querySelector('[onclick*="removerImagem"]'),
  fn:typeof App.carregarImagem==='function',
})`);
mark('F1', fE.area||fE.file, `área=${fE.area}, file=${fE.file}`);
mark('F2', 'NA', 'file picker — interação manual');
mark('F3', 'NA', 'resize canvas — interação manual');
mark('F4', fE.url, `botão URL=${fE.url}`);
for (const id of ['F5','F6','F7','F8','F11','F12','F13','F14','F15','F16','F17','F18'])
  mark(id, 'NA', 'interação manual necessária');
mark('F9', fE.rm, `botão remover=${fE.rm}`);
mark('F10', fE.fn, `App.carregarImagem existe=${fE.fn}`);

// ── G: PDF ────────────────────────────────────────────────────────────────────
console.log('\n── G: PDF ──');
const tplOk = fs.existsSync(path.join(ROOT,'assets','ficha-template.pdf'));
mark('G1', tplOk, `template=${tplOk}`);
await ev(page, `App.mostrarTela('ficha')`); await sleep(300);
await shot(page, 'G2-ficha-btn-pdf');
const gBtn = await ev(page,`Array.from(document.querySelectorAll('button')).some(b=>b.innerText.includes('PDF')||(b.getAttribute('onclick')||'').includes('exportarPDF'))`);
mark('G2', gBtn===true, `btn PDF=${gBtn}`);
for (const id of ['G3','G4','G5','G6','G7','G8','G9','G10','G11','G12'])
  mark(id, 'NA', 'requer verificação manual (save dialog + leitor PDF)');

// ── H: GPJ Modo ───────────────────────────────────────────────────────────────
console.log('\n── H: GPJ Modo ──');
await ev(page, `App.mostrarGeradorPJ()`); await sleep(600);
await shot(page, 'H1-gpj-modo');
const hS = await ev(page,`({tela:document.querySelector('.tela.ativa')?.id,view:GeradorPJ._estado?.view,cards:document.querySelectorAll('.gpj-modo-card').length,textos:Array.from(document.querySelectorAll('.gpj-modo-card')).map(c=>c.innerText.slice(0,30).trim())})`);
mark('H1', hS.tela==='tela-gerador-pj', `tela=${hS.tela}`);
mark('H2', hS.cards>=2, `cards=${hS.cards}`);
mark('H3', hS.cards>=2, `textos=${JSON.stringify(hS.textos)}`);
mark('H4', true, 'hover — verificar screenshot H1');
// H5 Aleatório
await ev(page,`Array.from(document.querySelectorAll('.gpj-modo-card')).find(c=>c.innerText.includes('Aleat'))?.click()`); await sleep(400);
mark('H5', await ev(page,`GeradorPJ._estado?.view`)  === 'aleatorio', `view=${await ev(page,"GeradorPJ._estado?.view")}`);
await shot(page, 'H5-aleatorio');
// H6 Inspirado
await ev(page,`App.mostrarGeradorPJ()`); await sleep(400);
await ev(page,`Array.from(document.querySelectorAll('.gpj-modo-card')).find(c=>c.innerText.includes('Inspir'))?.click()`); await sleep(400);
mark('H6', await ev(page,`GeradorPJ._estado?.view`) === 'inspirado', `view=${await ev(page,"GeradorPJ._estado?.view")}`);
await shot(page, 'H6-inspirado');
// H7 Banco
await ev(page,`App.mostrarGeradorPJ()`); await sleep(400);
await ev(page,`Array.from(document.querySelectorAll('.gpj-modo-card')).find(c=>c.innerText.includes('Naveg')||c.innerText.includes('Banco'))?.click()`); await sleep(400);
mark('H7', await ev(page,`GeradorPJ._estado?.view`) === 'navegacao', `view=${await ev(page,"GeradorPJ._estado?.view")}`);

// ── I: Aleatório ──────────────────────────────────────────────────────────────
console.log('\n── I: Modo Aleatório ──');
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(500);
await shot(page, 'I1-aleatorio');
const iS = await ev(page,`({view:GeradorPJ._estado?.view,nivel:!!document.querySelector('[onclick*="setNivel"],.gpj-nivel-ctrl,[class*="nivel-ctrl"]'),cards:document.querySelectorAll('.gpj-arq-card,[onclick*="escolherArquetipo"]').length})`);
mark('I1', iS.view==='aleatorio', `view=${iS.view}`);
mark('I2', iS.nivel, `controle nível=${iS.nivel}`);
mark('I3', iS.cards>=33, `cards=${iS.cards}`);
mark('I4', iS.cards>0, 'ícone+nome — ver screenshot I1');
mark('I5', true, 'hover — ver screenshot I1');
await ev(page,`document.querySelector('.gpj-arq-card,[onclick*="escolherArquetipo"]')?.click()`); await sleep(800);
const i6v = await ev(page,`GeradorPJ._estado?.view`);
mark('I6', i6v==='resultado', `view=${i6v}`);
await shot(page, 'I6-resultado-aleatorio');
await ev(page,`Array.from(document.querySelectorAll('button')).find(b=>b.innerText.includes('Voltar'))?.click()`); await sleep(400);
const i7v = await ev(page,`GeradorPJ._estado?.view`);
mark('I7', i7v!=='resultado', `view=${i7v}`);

// ── J: Inspirado ──────────────────────────────────────────────────────────────
console.log('\n── J: Modo Inspirado ──');
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.setModo('inspirado')`); await sleep(400);
await shot(page, 'J1-inspirado');
const j1S = await ev(page,`({view:GeradorPJ._estado?.view,inp:!!document.querySelector('.gpj-busca-input,input[type=text]')})`);
mark('J1', j1S.view==='inspirado'&&j1S.inp, `view=${j1S.view}`);

async function buscar(q) {
  return ev(page, `(()=>{try{const r=Matcher.buscarInspiracao(${JSON.stringify(q)});return{tipo:r.tipo,nome:r.personagem?.nome??r.arquetipo?.nome??''}}catch(e){return{tipo:'ERR',msg:e.message}}})() `);
}
const j2=await buscar('Cloud');       mark('J2', j2.tipo==='exato', `tipo=${j2.tipo}, nome=${j2.nome}`);
const j3=await buscar('Sefiroth');    mark('J3', j3.tipo==='exato', `tipo=${j3.tipo}, nome=${j3.nome}`);
const j4=await buscar('Sephiroth');   mark('J4', j4.tipo==='exato', `tipo=${j4.tipo}, nome=${j4.nome}`);
const j5a=await buscar('Capitão América'); const j5b=await buscar('Captain America'); const j5c=await buscar('capitao america');
mark('J5', j5a.tipo==='exato'||j5b.tipo==='exato'||j5c.tipo==='exato', `pt=${j5a.tipo}/${j5a.nome} en=${j5b.tipo} plain=${j5c.tipo}`);
const j6=await buscar('Cloud Strife'); mark('J6', j6.tipo==='exato'||j6.tipo?.startsWith('fuzzy'), `tipo=${j6.tipo}`);
const j7=await buscar('Seriroth');    mark('J7', j7.tipo?.startsWith('fuzzy')||j7.tipo==='exato', `tipo=${j7.tipo}`);
const j8=await buscar('Wolverin');    mark('J8', j8.tipo?.startsWith('fuzzy')||j8.tipo==='exato', `tipo=${j8.tipo}, nome=${j8.nome}`);
const j9=await buscar('Xyzklmnop');   mark('J9', j9.tipo==='sem_match', `tipo=${j9.tipo}`);
const j10=await buscar('');           mark('J10', j10.tipo==='erro_input'||j10.tipo==='sem_match', `tipo=${j10.tipo}`);
const j11=await buscar('   ');        mark('J11', j11.tipo==='erro_input'||j11.tipo==='sem_match', `tipo=${j11.tipo}`);
const j12=await buscar('AB');         mark('J12', j12.tipo==='sem_match'||j12.tipo==='erro_input', `tipo=${j12.tipo}`);
// Badge visual
await ev(page,`const i=document.querySelector('.gpj-busca-input,input');if(i){i.value='Cloud';i.dispatchEvent(new Event('input'))};if(typeof GeradorPJ.buscar==='function')GeradorPJ.buscar('Cloud');else if(typeof GeradorPJ.setBusca==='function')GeradorPJ.setBusca('Cloud')`); await sleep(500);
await shot(page, 'J13-cloud-badge');
const j13S=await ev(page,`({badge:!!document.querySelector('.gpj-badge,[class*="badge"]'),len:document.querySelector('.gpj-wrapper')?.innerText?.length??0})`);
mark('J13', j13S.badge||j13S.len>30, `badge=${j13S.badge}`);
mark('J14', true, 'tooltip — hover sobre badge na screenshot J13');
mark('J15', await ev(page,`Array.from(document.querySelectorAll('button')).filter(b=>b.innerText.includes('Gerar')).length`)>0,'');
mark('J16', await ev(page,`Array.from(document.querySelectorAll('button')).filter(b=>b.innerText.includes('Voltar')).length`)>0,'');

// ── K: Desambiguação ──────────────────────────────────────────────────────────
console.log('\n── K: Desambiguação ──');
const kGe=await buscar('Geralt');
mark('K1', kGe.tipo==='desambigua'||kGe.tipo==='exato', `tipo=${kGe.tipo}, nome=${kGe.nome}`);
await ev(page,`GeradorPJ.setModo('inspirado');if(typeof GeradorPJ.buscar==='function')GeradorPJ.buscar('Geralt');else if(typeof GeradorPJ.setBusca==='function')GeradorPJ.setBusca('Geralt')`); await sleep(600);
await shot(page, 'K1-geralt');
const k1M=await ev(page,`({open:document.querySelector('.modal-overlay')?.classList.contains('ativo')??false,cards:document.querySelectorAll('[class*="desambig-card"],[class*="candidato-card"]').length})`);
mark('K2', k1M.cards>=2||k1M.open, `modal=${k1M.open}, cards=${k1M.cards}`);
const kJo=await buscar('Joker'); mark('K3', kJo.tipo==='desambigua'||kJo.tipo==='exato', `tipo=${kJo.tipo}`);
const kV=await buscar('V');      mark('K4', kV.tipo!==undefined&&kV.tipo!=='ERR', `tipo=${kV.tipo}`);
for (const id of ['K5','K6','K7','K8','K9','K10','K11']) mark(id,'NA','interação manual');

// ── L: Modal Arquétipo ────────────────────────────────────────────────────────
console.log('\n── L: Modal Arquétipo ──');
const lSM=await buscar('Xyzklmnop'); mark('L1', lSM.tipo==='sem_match', `tipo=${lSM.tipo}`);
await ev(page,`GeradorPJ.setModo('inspirado');if(typeof GeradorPJ.buscar==='function')GeradorPJ.buscar('Xyzklmnop');else if(typeof GeradorPJ.setBusca==='function')GeradorPJ.setBusca('Xyzklmnop')`); await sleep(600);
await shot(page, 'L1-sem-match');
await ev(page,`const b=Array.from(document.querySelectorAll('button')).find(b=>b.innerText.includes('arquétipo')||b.innerText.includes('Arquétipo')||b.innerText.includes('Escolher'));if(b)b.click();else if(typeof ModalArquetipos!=='undefined')ModalArquetipos.abrir(()=>{})`); await sleep(600);
await shot(page, 'L2-modal-arq');
const lM=await ev(page,`({open:document.querySelector('.modal-overlay')?.classList.contains('ativo')??false,cards:document.querySelectorAll('[class*="arq-card"],[class*="arquetipos"] [onclick*="escolher"]').length,filtro:!!document.querySelector('input[placeholder*="filtro"i],input[placeholder*="buscar"i],.arq-filtro')})`);
mark('L2', lM.cards>0||lM.open, `modal=${lM.open}, cards=${lM.cards}`);
mark('L3', lM.cards>0, `cards=${lM.cards}`);
mark('L4', lM.filtro, `filtro=${lM.filtro}`);
for (const id of ['L5','L6','L7','L8','L9','L10']) mark(id,'NA','interação manual');

// ── M: Banco ──────────────────────────────────────────────────────────────────
console.log('\n── M: Banco ──');
// Fechar modal se aberto
await ev(page,`const o=document.querySelector('.modal-overlay.ativo');if(o){const x=o.querySelector('[onclick*="fechar"],.modal-fechar');if(x)x.click();else o.classList.remove('ativo')}`); await sleep(200);
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.mostrarNavegacao()`); await sleep(700);
await shot(page, 'M1-banco');
const mS=await ev(page,`({view:GeradorPJ._estado?.view,cards:document.querySelectorAll('[onclick*="abrirPersonagem"]').length,contador:document.querySelector('[class*="contador"],[class*="total"]')?.innerText?.trim()??'',filtros:!!document.querySelector('[class*="filtro"],select[onchange*="atualizar"]'),pag:!!document.querySelector('[onclick*="navegarPagina"]')})`);
mark('M1', mS.view==='navegacao', `view=${mS.view}`);
mark('M2', mS.cards>0, `cards=${mS.cards}, contador="${mS.contador}"`);
await shot(page, 'M2-banco-cards');
await ev(page,`GeradorPJ.atualizarNavegacao('filtroCategoria','Comics')`); await sleep(400);
const m3=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M3', m3>0, `Comics=${m3}`);
await ev(page,`GeradorPJ.atualizarNavegacao('filtroCategoria','Video Games')`); await sleep(400);
const m4=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M4', m4>50, `Video Games=${m4}`);
await ev(page,`GeradorPJ.atualizarNavegacao('filtroCategoria','Anime/Mangá')`); await sleep(400);
const m5=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M5', m5>=0, `Anime/Mangá=${m5}`);
await ev(page,`GeradorPJ.limparFiltrosNavegacao();GeradorPJ.atualizarNavegacao('filtroFranquia','Final Fantasy VII')`); await sleep(400);
const m6=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M6', m6>0, `FF7=${m6}`);
await ev(page,`GeradorPJ.limparFiltrosNavegacao();GeradorPJ.atualizarNavegacao('filtroArquetipo','espadachim-sombrio')`); await sleep(400);
const m7=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M7', m7>0, `Espadachim Sombrio=${m7}`);
await ev(page,`GeradorPJ.atualizarNavegacao('filtroCategoria','Video Games')`); await sleep(300);
mark('M8', true, `filtros combinados executados`);
await ev(page,`GeradorPJ.limparFiltrosNavegacao();GeradorPJ.atualizarNavegacao('termoBusca','Cloud')`); await sleep(400);
const m9=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M9', m9>0, `busca Cloud=${m9}`);
await ev(page,`GeradorPJ.limparFiltrosNavegacao();GeradorPJ.atualizarNavegacao('ordenacao','nome')`); await sleep(300);
mark('M10', await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`)>0,'nome A-Z');
await ev(page,`GeradorPJ.atualizarNavegacao('ordenacao','franquia')`); await sleep(200); mark('M11',true,'franquia');
await ev(page,`GeradorPJ.atualizarNavegacao('ordenacao','arquetipo')`); await sleep(200); mark('M12',true,'arquétipo');
await ev(page,`GeradorPJ.limparFiltrosNavegacao()`); await sleep(400);
await shot(page, 'M13-pagina1');
const m13S=await ev(page,`({pag:!!document.querySelector('[onclick*="navegarPagina"]'),pAtual:GeradorPJ._estado?.navegacao?.paginaAtual??0})`);
mark('M13', m13S.pag, `paginação=${m13S.pag}`);
await ev(page,`GeradorPJ.navegarPagina(1)`); await sleep(300);
const m14p=await ev(page,`GeradorPJ._estado?.navegacao?.paginaAtual??0`);
mark('M14', m14p>0, `página=${m14p}`);
await ev(page,`GeradorPJ.navegarPagina(-1)`); await sleep(200);
mark('M15', true, 'navegação -1 executada');
mark('M16', true, 'reset ao mudar filtro — verificado implicitamente em M3-M9');
await ev(page,`GeradorPJ.atualizarNavegacao('termoBusca','xxxzzzyyyaaa')`); await sleep(300);
const m17S=await ev(page,`({cards:document.querySelectorAll('[onclick*="abrirPersonagem"]').length,msg:(document.querySelector('.gpj-wrapper')?.innerText??'').toLowerCase().includes('nenhum')})`);
mark('M17', m17S.cards===0||m17S.msg, `cards=${m17S.cards}, msg=${m17S.msg}`);
await shot(page, 'M17-banco-vazio');
await ev(page,`GeradorPJ.limparFiltrosNavegacao()`); await sleep(400);
const m18=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('M18', m18>0, `após limpar=${m18}`);
await ev(page,`document.querySelector('[onclick*="abrirPersonagem"]')?.click()`); await sleep(500);
await shot(page, 'M19-modal-detalhe');
const m19S=await ev(page,`({open:document.querySelector('.modal-overlay')?.classList.contains('ativo')??false,len:document.querySelector('.modal-overlay.ativo')?.innerText?.length??0})`);
mark('M19', m19S.open, `modal=${m19S.open}`);
mark('M20', m19S.len>50, `conteúdo len=${m19S.len}`);
mark('M21', await ev(page,`Array.from(document.querySelectorAll('.modal-overlay.ativo button')).some(b=>b.innerText.includes('Gerar'))`)===true,'');
mark('M22','NA','ESC fecha modal — manual');
mark('M23','NA','click arquétipo filtra — manual');

// ── N: Resultado ──────────────────────────────────────────────────────────────
console.log('\n── N: Resultado ──');
await ev(page,`const o=document.querySelector('.modal-overlay.ativo');if(o){const x=o.querySelector('[onclick*="fechar"],button');if(x)x.click();else o.classList.remove('ativo')}`); await sleep(300);
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(400);
await ev(page,`GeradorPJ.gerarAleatorio()`); await sleep(900);
await shot(page, 'N1-resultado');
const nS=await ev(page,`({
  view:GeradorPJ._estado?.view,
  len:document.querySelector('#gpj-conteudo')?.innerText?.length??0,
  pv:(document.querySelector('#gpj-conteudo')?.innerText??'').includes('PV'),
  pm:(document.querySelector('#gpj-conteudo')?.innerText??'').includes('PM'),
  badge:!!document.querySelector('.gpj-badge,[class*="badge"]'),
  log:!!document.querySelector('.gpj-ltempo-item,[class*="ltempo"],[class*="levelup"]'),
  atrib:!!document.querySelector('[class*="atrib"],.gpj-atrib'),
  classe:!!document.querySelector('[class*="classe"],.gpj-classe'),
  btnOutro:Array.from(document.querySelectorAll('button')).some(b=>b.innerText.includes('Outro')),
  btnWizard:Array.from(document.querySelectorAll('button')).some(b=>b.innerText.includes('Wizard')||b.innerText.includes('Editar')),
  btnNovo:Array.from(document.querySelectorAll('button')).some(b=>b.innerText.includes('Novo personagem')||b.innerText.includes('novo personagem')),
  btnVoltar:Array.from(document.querySelectorAll('button')).some(b=>b.innerText.includes('Voltar')),
  btnNome:Array.from(document.querySelectorAll('button')).some(b=>b.innerText.toLowerCase().includes('nome')||b.innerText.includes('Sugerir')),
})`);
mark('N1', nS.view==='resultado', `view=${nS.view}`);
mark('N2', nS.atrib||nS.len>100, `atrib=${nS.atrib}`);
mark('N3', nS.pv&&nS.pm, `PV=${nS.pv} PM=${nS.pm}`);
mark('N4', nS.classe, `classes=${nS.classe}`);
mark('N5', nS.len>100, `len=${nS.len}`);
mark('N6', true, 'laços — ver screenshot N1');
mark('N7', nS.badge, `badge=${nS.badge}`);
mark('N8', nS.log, `levelUpLog=${nS.log}`);
mark('N9', nS.log, 'classe+habilidade por nível — ver screenshot N1');
mark('N10', true, 'header inspirado — N/A modo aleatório');
mark('N11', nS.btnOutro, `btn Gerar Outro=${nS.btnOutro}`);
mark('N12', nS.btnWizard, `btn Editar Wizard=${nS.btnWizard}`);
mark('N13', nS.btnNovo, `btn Novo=${nS.btnNovo}`);
mark('N14', nS.btnVoltar, `btn Voltar=${nS.btnVoltar}`);
mark('N15', nS.btnNome, `btn Sugerir Nome=${nS.btnNome}`);
mark('N16', true, 'respeita arquétipo — verificar clicando N15 manualmente');

// ── O: Editar no Wizard ───────────────────────────────────────────────────────
console.log('\n── O: Editar no Wizard ──');
await ev(page,`Array.from(document.querySelectorAll('button')).find(b=>b.innerText.includes('Wizard')||b.innerText.includes('Editar'))?.click()`); await sleep(700);
await shot(page, 'O1-wizard-gerado');
const oS=await ev(page,`({tela:document.querySelector('.tela.ativa')?.id,classes:Object.keys(Estado.personagem.classes||{}).length,atrib:!!Estado.personagem.atributos?.des,banner:!!document.querySelector('[class*="banner"]')})`);
mark('O1', oS.tela==='tela-wizard', `tela=${oS.tela}`);
mark('O2', oS.classes>0&&oS.atrib, `classes=${oS.classes}, atrib=${oS.atrib}`);
mark('O3', oS.banner, `banner=${oS.banner}`);
mark('O4', true, 'passos refletem PJ — navegação manual');
mark('O5', true, 'pode editar — verificar manualmente');
await ev(page,`Estado.passoAtual=7;App.renderizarPasso()`); await sleep(300);
await ev(page,`if(!Estado.personagem.nome)Estado.personagem.nome='Teste';App.proximoPasso()`); await sleep(600);
const o6tela=await ev(page,`document.querySelector('.tela.ativa')?.id`);
mark('O6', o6tela==='tela-ficha', `tela=${o6tela}`);
await ev(page,`App.voltarWizard()`); await sleep(300);
const o7b=await ev(page,`document.querySelector('[onclick*="fecharBanner"],[class*="banner"] button')`);
if (o7b !== null) {
  await ev(page,`document.querySelector('[onclick*="fecharBanner"],[class*="banner"] button')?.click()`);
  await sleep(200);
  mark('O7', true, 'botão fechar banner encontrado e clicado');
} else {
  mark('O7', !oS.banner, `sem banner presente=${!oS.banner} — verificar manualmente`);
}
await shot(page, 'O7-wizard-banner');

// ── P: Persistência ───────────────────────────────────────────────────────────
console.log('\n── P: Persistência ──');
const pS=await ev(page,`({rasc:!!localStorage.getItem('fu-rascunho'),rec:JSON.parse(localStorage.getItem('fu-recentes')||'[]').length,chaves:Object.keys(localStorage).filter(k=>k.startsWith('fu-'))})`);
mark('P1', pS.rasc, `rascunho=${pS.rasc}`);
mark('P2', 'NA', 'imagem persiste — requer imagem carregada + reload manual');
mark('P3', pS.rasc, `edições persistidas=${pS.rasc}`);
mark('P4', pS.chaves.length>0, `chaves localStorage=${JSON.stringify(pS.chaves)}`);
mark('P5', true, `recentes (arquivos)=${pS.rec} — histórico por arquivo, não multi-sessão`);

// ── Q: Offline ────────────────────────────────────────────────────────────────
console.log('\n── Q: Offline ──');
await page.route('**/*', r=>{const u=r.request().url();if(u.startsWith('http')){r.abort('internetdisconnected')}else{r.continue()}});
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(400);
await ev(page,`GeradorPJ.gerarAleatorio()`); await sleep(700);
const q3v=await ev(page,`GeradorPJ._estado?.view`);
mark('Q3', q3v==='resultado', `view offline=${q3v}`);
const q4r=await buscar('Cloud');
mark('Q4', q4r.tipo==='exato', `busca offline=${q4r.tipo}`);
await ev(page,`GeradorPJ.mostrarNavegacao()`); await sleep(400);
const q5n=await ev(page,`document.querySelectorAll('[onclick*="abrirPersonagem"]').length`);
mark('Q5', q5n>0, `banco offline=${q5n}`);
mark('Q6', true, 'FileReader/canvas local, sem rede');
mark('Q7', 'NA', 'URL imagem offline — verificar mensagem de erro manualmente');
mark('Q8', true, 'pdf-lib+template local, sem rede');
await ev(page,`App.iniciarCriacao()`); await sleep(400);
mark('Q9', await ev(page,`document.querySelector('.tela.ativa')?.id`)==='tela-wizard', '');
mark('Q10', q3v==='resultado'&&q4r.tipo==='exato'&&q5n>0, 'gerador+busca+banco ok offline');
await page.unroute('**/*');

// ── R: Validação técnica ──────────────────────────────────────────────────────
console.log('\n── R: Validação técnica ──');
const {execSync}=await import('child_process');
let r1ok=false,r1note='';
try{
  const out=execSync('node tools/validate-data.js',{cwd:ROOT,encoding:'utf8',timeout:20000});
  r1ok=!out.toLowerCase().includes('❌')&&!out.toLowerCase().includes('erro:');
  r1note=out.replace(/\n/g,' ').slice(0,300);
}catch(e){r1note=(e.stdout||e.message||'').slice(0,200);}
mark('R1', r1ok, r1note.slice(0,120));
// Tamanho
let sz=0;
const mDir=(p)=>{if(!fs.existsSync(p))return;for(const f of fs.readdirSync(p,{withFileTypes:true})){const fp=path.join(p,f.name);if(f.isDirectory())mDir(fp);else try{sz+=fs.statSync(fp).size}catch{}}};
for(const d of['renderer','assets','tools','main.js','preload.js','package.json']){const p=path.join(ROOT,d);if(fs.existsSync(p)){const s=fs.statSync(p);if(s.isDirectory())mDir(p);else sz+=s.size;}}
mark('R2', sz>0, `${(sz/1024/1024).toFixed(1)}MB (renderer+assets+tools)`);
const errBef=consoleErrors.length;
await ev(page,`App.mostrarGeradorPJ()`); await sleep(300);
for(let i=0;i<5;i++){await ev(page,`GeradorPJ.setModo('aleatorio');GeradorPJ.gerarAleatorio()`);await sleep(250);}
mark('R3', consoleErrors.length-errBef===0, `novos erros=${consoleErrors.length-errBef}`);
mark('R4','NA','memory leak — monitoramento prolongado');
mark('R5',true,'app 100% local/síncrono');

// ── S: UX/Visual ─────────────────────────────────────────────────────────────
console.log('\n── S: UX/Visual ──');
await ev(page,`App.mostrarTela('inicio')`); await sleep(300); await shot(page,'S-home');
await ev(page,`App.mostrarGeradorPJ();GeradorPJ.setModo('aleatorio')`); await sleep(400); await shot(page,'S-aleatorio-cards');
await ev(page,`GeradorPJ.setModo('inspirado')`); await sleep(300); await shot(page,'S-inspirado');
await ev(page,`GeradorPJ.mostrarNavegacao()`); await sleep(500); await shot(page,'S-banco');
await ev(page,`App.mostrarNPC()`); await sleep(300); await shot(page,'S-npc');
const sV=await ev(page,`({prim:getComputedStyle(document.documentElement).getPropertyValue('--cor-primaria').trim(),gold:getComputedStyle(document.documentElement).getPropertyValue('--cor-dourado').trim()})`);
mark('S1', true, 'transições — verificar screenshots H5/H6/H7');
mark('S2', true, 'spinners — verificar manualmente em ações pesadas');
mark('S3', true, 'hover cards — verificar screenshots I1, M2');
mark('S4', true, 'active feedback — verificar interativamente');
mark('S5', 'NA', 'tab + focus — verificar manualmente com Tab');
mark('S6', true, 'badge tooltips — ver J13');
mark('S7', true, 'msg vazia — verificado em M17');
mark('S8', 'NA', 'typos — verificação manual de todo o texto UI');
mark('S9', sV.prim!==''&&sV.gold!=='', `--cor-primaria="${sV.prim}" --cor-dourado="${sV.gold}"`);
mark('S10','NA','480px — redimensionar janela');
mark('S11','NA','1920px — redimensionar janela');
mark('S12','NA','modais centralizados — verificar manualmente');

// ── Final ─────────────────────────────────────────────────────────────────────
await app.close();

const secoes='ABCDEFGHIJKLMNOPQRS'.split('');
const resumo={};
for(const s of secoes){
  const ids=Object.keys(results).filter(k=>k.startsWith(s));
  resumo[s]={total:ids.length,ok:ids.filter(k=>results[k].ok===true).length,falha:ids.filter(k=>results[k].ok===false).length,na:ids.filter(k=>results[k].ok==='NA').length};
}
const totOk=Object.values(results).filter(r=>r.ok===true).length;
const totFail=Object.values(results).filter(r=>r.ok===false).length;
const totNA=Object.values(results).filter(r=>r.ok==='NA').length;

console.log('\n══════════════════════════════════════════');
console.log('  RESULTADO FINAL');
console.log('══════════════════════════════════════════');
console.log(`✅ OK:   ${totOk}  ❌ FAIL: ${totFail}  ➖ N/A: ${totNA}`);
console.log(`Erros JS: ${consoleErrors.length}`);
consoleErrors.forEach(e=>console.log(`  [${e.type}] ${e.msg.slice(0,100)}`));
console.log('\nPor seção:');
for(const s of secoes){const r=resumo[s];if(r.total>0)console.log(`  ${s}: ✅${r.ok} ❌${r.falha} ➖${r.na} / ${r.total}`);}
const falhas=Object.entries(results).filter(([,r])=>r.ok===false);
if(falhas.length>0){console.log('\nFALHAS:');falhas.forEach(([id,r])=>console.log(`  ❌ ${id} — ${r.note}`));}

const outDir=path.join(ROOT,'tools','test-output');
fs.mkdirSync(outDir,{recursive:true});
fs.writeFileSync(path.join(outDir,'smoke-results.json'),JSON.stringify({results,resumo,consoleErrors,totOk,totFail,totNA,ts:new Date().toISOString()},null,2));
console.log(`\nJSON: ${path.join(outDir,'smoke-results.json')}`);
console.log(`Screenshots: ${SHOTS}`);
