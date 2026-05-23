'use strict';
const path = require('path');
const fs   = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const TEMPLATE = path.join(__dirname, '..', 'assets', 'ficha-template.pdf');
const OUTPUT   = path.join(__dirname, 'test-output', 'slot-test.pdf');

const SLOT = { x: 432, y: 390, w: 118, h: 125 };

async function main() {
  const pdfDoc = await PDFDocument.load(fs.readFileSync(TEMPLATE));
  const page   = pdfDoc.getPages()[0];
  const font   = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();
  console.log(`Template: ${width.toFixed(1)} x ${height.toFixed(1)} pt`);
  console.log(`Slot: x=${SLOT.x} y=${SLOT.y} w=${SLOT.w} h=${SLOT.h}`);

  page.drawRectangle({
    x: SLOT.x, y: SLOT.y, width: SLOT.w, height: SLOT.h,
    color: rgb(1, 1, 1), borderColor: rgb(1, 0, 0), borderWidth: 3,
  });

  const label = 'SLOT';
  const lSize = 12;
  const lW = font.widthOfTextAtSize(label, lSize);
  page.drawText(label, {
    x: SLOT.x + (SLOT.w - lW) / 2, y: SLOT.y + SLOT.h / 2 - lSize / 2,
    size: lSize, font, color: rgb(0.85, 0, 0),
  });

  const coord = `x=${SLOT.x} y=${SLOT.y} w=${SLOT.w} h=${SLOT.h}`;
  const cW = font.widthOfTextAtSize(coord, 7);
  page.drawText(coord, {
    x: SLOT.x + (SLOT.w - cW) / 2, y: SLOT.y + 5,
    size: 7, font, color: rgb(0.6, 0, 0),
  });

  fs.writeFileSync(OUTPUT, await pdfDoc.save());
  console.log(`Salvo: ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
