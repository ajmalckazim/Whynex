const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const titles = indexHtml.match(/<h3 class="sc-title">.*?<\/h3>/g);
console.log('Service card titles on homepage:\n', titles);
