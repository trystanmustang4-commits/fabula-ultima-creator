// Auditoria de layout mobile: percorre todas as telas/estados do app (www/) em larguras de celular,
// mede o que vaza da tela, texto estourando, alvos de toque pequenos e fontes miúdas, e tira screenshots.
// Uso: node tools/build-www.mjs && node tools/audit-mobile.mjs <pasta-saida> [larguras=360,412]
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const dir = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const OUT = path.resolve(dir, process.argv[2] || 'tools/test-output/audit-mobile');
const larguras = (process.argv[3] || '360,412').split(',');
fs.mkdirSync(OUT, { recursive: true });

// Cada estado: [nome, código a executar na página antes da medição]
const EXEMPLO = `App.carregarPersonagemClassico(0); Object.assign(Estado.personagem, { nome: 'Lisandra Vey de Aldmere', identidade: 'Cavaleira exilada de um reino de cristal', origem: 'Vila de Aldmere', tema: 'dever' }); App.renderizarPasso();`;
const ESTADOS = [
  ['inicio', `App.mostrarTela('inicio')`],
  ['wizard-0-vazio', `App.iniciarCriacao()`],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => [`wizard-${i}`, `${EXEMPLO} App.irParaPasso(${i})`]),
  ['wizard-3-tres-classes', `${EXEMPLO} App.irParaPasso(3); App.setNivelIdentidade && App.setNivelIdentidade(10); App.irParaPasso(3)`],
  ['palco-expandido', `${EXEMPLO} App.irParaPasso(4); document.getElementById('palco-heroi').classList.add('expandido'); App.renderizarPalco()`],
  ['ficha-rapida', `${EXEMPLO} App.mostrarFichaRapida()`],
  ['ficha', `${EXEMPLO} App.gerarFicha(); App.mostrarTela('ficha')`],
  ['sessao', `${EXEMPLO} App.gerarFicha(); App.mostrarSessao()`],
  ['exemplos', `App.mostrarTela('inicio'); App.mostrarExemplos()`],
  ['npc-gerador', `App.mostrarNPC(); App.switchNPCTab('gerador')`],
  ['npc-gerado', `App.mostrarNPC(); App.switchNPCTab('gerador'); App.gerarNPC(5, 'Inimigo')`],
  ['npc-encontro', `App.mostrarNPC(); App.switchNPCTab('encontro')`],
  ['npc-encontro-gerado', `App.mostrarNPC(); App.switchNPCTab('encontro'); App.gerarEncontro()`],
  ['gpj-modo', `App.mostrarGeradorPJ()`],
  ['gpj-aleatorio', `App.mostrarGeradorPJ(); GeradorPJ.setModo('aleatorio')`],
  ['gpj-inspirado', `App.mostrarGeradorPJ(); GeradorPJ.setModo('inspirado')`],
  ['gpj-inspirado-busca', `App.mostrarGeradorPJ(); GeradorPJ.setModo('inspirado'); const i=document.getElementById('gpj-busca-input'); if(i){i.value='Geralt'}; GeradorPJ.buscarInspiracao()`],
  ['gpj-banco', `App.mostrarGeradorPJ(); GeradorPJ.mostrarNavegacao()`],
  ['gpj-resultado', `App.mostrarGeradorPJ(); GeradorPJ.setModo('aleatorio'); GeradorPJ.gerarAleatorio()`],
  ['gpj-modal-arquetipos', `App.mostrarGeradorPJ(); GeradorPJ.abrirModalArquetipos && GeradorPJ.abrirModalArquetipos()`],
];

function medir() {
  const W = document.documentElement.clientWidth;
  const H = document.documentElement.clientHeight;
  const sel = el => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const c = [...el.classList].slice(0, 3).join('.');
    if (c) s += '.' + c;
    return s;
  };
  const visivel = el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  // Ancestral que rola/corta na horizontal (conteúdo legitimamente rolável ou recortado)
  const dentroDeRolagemX = el => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return p;
    }
    return null;
  };
  const vaza = [], texto = [], toque = [], fonte = [], rolagemX = [];
  const todos = [...document.querySelectorAll('body *')].filter(visivel);
  const marcados = new Set();
  for (const el of todos) {
    const r = el.getBoundingClientRect();
    const anc = dentroDeRolagemX(el);
    if (!anc && (r.right > W + 1 || r.left < -1)) {
      if (!marcados.has(el.parentElement)) vaza.push(`${sel(el)} [${Math.round(r.left)}→${Math.round(r.right)} de ${W}]`);
      marcados.add(el);
    }
    const cs = getComputedStyle(el);
    // Contêiner que rola na horizontal sem querer (scrollWidth > clientWidth)
    if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2 && !el.classList.contains('passos-lista')) {
      rolagemX.push(`${sel(el)} [${el.scrollWidth} > ${el.clientWidth}]`);
    }
    // Texto que estoura a própria caixa
    const temTexto = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (temTexto && cs.overflowX === 'visible' && el.scrollWidth > el.clientWidth + 2 && cs.display !== 'inline') {
      texto.push(`${sel(el)} "${el.textContent.trim().slice(0, 30)}" [${el.scrollWidth} > ${el.clientWidth}]`);
    }
    if (temTexto && parseFloat(cs.fontSize) < 12) fonte.push(`${sel(el)} ${cs.fontSize} "${el.textContent.trim().slice(0, 20)}"`);
  }
  for (const b of document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [onclick], label[for]')) {
    if (!visivel(b)) continue;
    const r = b.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H) continue;
    if (r.height < 32 || r.width < 32) toque.push(`${sel(b)} ${Math.round(r.width)}×${Math.round(r.height)} "${(b.textContent || b.value || '').trim().slice(0, 20)}"`);
  }
  const unico = a => [...new Set(a)];
  return {
    paginaRolaX: document.documentElement.scrollWidth > W + 1,
    vaza: unico(vaza).slice(0, 25), rolagemX: unico(rolagemX).slice(0, 10), texto: unico(texto).slice(0, 15),
    toque: unico(toque).slice(0, 25), fonte: unico(fonte).slice(0, 10),
  };
}

const browser = await chromium.launch({ channel: 'chrome' });
const relatorio = {};
for (const tam of larguras) {
  const [W, Hx] = tam.split('x').map(Number);
  const H = Hx || (W < 400 ? 780 : 915);
  for (const [nome, codigo] of ESTADOS) {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    const erros = [];
    page.on('pageerror', e => erros.push(e.message));
    await page.goto(pathToFileURL(path.join(dir, 'www/index.html')).href);
    await page.waitForTimeout(400);
    try { await page.evaluate(codigo); } catch (e) { erros.push('estado: ' + e.message); }
    await page.waitForTimeout(450);
    // toasts atrapalham a medição
    await page.evaluate(() => document.querySelectorAll('.toast').forEach(t => t.remove()));
    const m = await page.evaluate(medir);
    if (erros.length) m.erros = erros;
    relatorio[`${W}/${nome}`] = m;
    await page.screenshot({ path: path.join(OUT, `${W}-${nome}.png`) });
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(OUT, 'relatorio.json'), JSON.stringify(relatorio, null, 2));

// Resumo
let total = 0;
for (const [k, m] of Object.entries(relatorio)) {
  const n = m.vaza.length + m.texto.length + m.rolagemX.length + (m.paginaRolaX ? 1 : 0) + (m.erros?.length || 0);
  total += n;
  const linhas = [];
  if (m.erros) linhas.push('  ERROS: ' + m.erros.join(' | '));
  if (m.paginaRolaX) linhas.push('  página rola na horizontal');
  if (m.vaza.length) linhas.push('  vaza: ' + m.vaza.slice(0, 6).join(' · '));
  if (m.rolagemX.length) linhas.push('  rolagemX: ' + m.rolagemX.slice(0, 4).join(' · '));
  if (m.texto.length) linhas.push('  texto: ' + m.texto.slice(0, 4).join(' · '));
  if (m.toque.length) linhas.push(`  toque<32px: ${m.toque.length} (${m.toque.slice(0, 3).join(' · ')})`);
  if (m.fonte.length) linhas.push(`  fonte<12px: ${m.fonte.length}`);
  if (linhas.length) console.log(k + '\n' + linhas.join('\n'));
}
console.log(`\nproblemas de layout (vaza+texto+rolagem+erros): ${total}`);
