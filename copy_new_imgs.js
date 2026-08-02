const fs = require('fs');
const path = require('path');

const brainDir = `C:\\Users\\micka\\.gemini\\antigravity-ide\\brain\\8be02517-a9b6-4ce3-bb2c-cd0f99057648`;
const targetDir = `d:\\myigreja\\tddsede\\img`;

// 1. Rede de Casais logo
const casaisSrc = path.join(brainDir, 'media__1785566171602.jpg');
if (fs.existsSync(casaisSrc)) {
  fs.copyFileSync(casaisSrc, path.join(targetDir, 'casais.jpg'));
  fs.copyFileSync(casaisSrc, path.join(targetDir, 'casais.webp'));
  console.log('Casais logo copied!');
}

// 2. Pastora Marta photo
const pastoraSrc = path.join(brainDir, 'media__1785566181544.jpg');
if (fs.existsSync(pastoraSrc)) {
  fs.copyFileSync(pastoraSrc, path.join(targetDir, 'pastora-marta-2026.jpg'));
  fs.copyFileSync(pastoraSrc, path.join(targetDir, 'pastora-marta-2026.webp'));
  console.log('Pastora Marta photo copied!');
}

// 3. Guardiãs da Fé logo
const guardiasSrc = path.join(brainDir, 'media__1785566193020.jpg');
if (fs.existsSync(guardiasSrc)) {
  fs.copyFileSync(guardiasSrc, path.join(targetDir, 'guardias-da-fe.jpg'));
  fs.copyFileSync(guardiasSrc, path.join(targetDir, 'guardias-da-fe.webp'));
  console.log('Guardiãs da Fé logo copied!');
}
