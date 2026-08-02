const fs = require('fs');
const path = require('path');

const brainDir = `C:\\Users\\micka\\.gemini\\antigravity-ide\\brain\\8be02517-a9b6-4ce3-bb2c-cd0f99057648`;
const targetDir = `d:\\myigreja\\tddsede\\img`;

// 1. Pastor Erivonaldo
const pastorSrc = path.join(brainDir, 'media__1785565168774.jpg');
const pastorDest = path.join(targetDir, 'pastor-erivonaldo-2026.jpg');
const pastorWebp = path.join(targetDir, 'pastor-erivonaldo-2026.webp');

if (fs.existsSync(pastorSrc)) {
  fs.copyFileSync(pastorSrc, pastorDest);
  fs.copyFileSync(pastorSrc, pastorWebp);
  console.log('Copied Pastor Erivonaldo image successfully!');
}

// 4. Rede de Casais
const casaisSrc = path.join(brainDir, 'media__1785565264347.jpg');
const casaisDest = path.join(targetDir, 'casais.jpg');
const casaisWebp = path.join(targetDir, 'casais.webp');

if (fs.existsSync(casaisSrc)) {
  fs.copyFileSync(casaisSrc, casaisDest);
  fs.copyFileSync(casaisSrc, casaisWebp);
  console.log('Copied Casais image successfully!');
}
