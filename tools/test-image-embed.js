'use strict';
// Testa o embed de imagem real no slot calibrado do template PDF.
// Uso: node tools/test-image-embed.js

const path = require('path');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

const TEMPLATE = path.join(__dirname, '..', 'assets', 'ficha-template.pdf');
const IMG      = path.join(__dirname, 'test-output', 'test-portrait.png');
const OUTPUT   = path.join(__dirname, 'test-output', 'embed-test.pdf');

const SLOT = { x: 432, y: 400, w: 118, h: 125 };

async function main() {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(TEMPLATE));
  const page   = pdfDoc.getPages()[0];
  const imgBytes = fs.readFileSync(IMG);

  // Embed PNG e calcula scale aspect-ratio preservado (contain)
  const pdfImg = await pdfDoc.embedPng(imgBytes);
  const { width: imgW, height: imgH } = pdfImg.scale(1);
  const scale = Math.min(SLOT.w / imgW, SLOT.h / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;

  page.drawImage(pdfImg, {
    x: SLOT.x + (SLOT.w - drawW) / 2,
    y: SLOT.y + (SLOT.h - drawH) / 2,
    width:  drawW,
    height: drawH,
  });

  // Borda fina vermelha ao redor do slot para referência
  page.drawRectangle({
    x: SLOT.x, y: SLOT.y, width: SLOT.w, height: SLOT.h,
    borderColor: rgb(1, 0, 0), borderWidth: 1,
  });

  fs.writeFileSync(OUTPUT, await pdfDoc.save());
  console.log(`Salvo em: ${OUTPUT}`);
  console.log(`Imagem original: ${imgW}x${imgH}  →  desenhada: ${drawW.toFixed(1)}x${drawH.toFixed(1)} (scale=${scale.toFixed(3)})`);
}

main().catch(err => { console.error(err); process.exit(1); });
