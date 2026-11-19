const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const mainEnd = indexHtml.indexOf('</main>');
console.log('Index HTML before main end:\n', indexHtml.slice(mainEnd - 600, mainEnd));
