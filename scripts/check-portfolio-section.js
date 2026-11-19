const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');

const pIndex = indexHtml.indexOf('id="portfolio"');
if (pIndex !== -1) {
  console.log('Portfolio section snippet:\n', indexHtml.slice(pIndex, pIndex + 1200));
}
