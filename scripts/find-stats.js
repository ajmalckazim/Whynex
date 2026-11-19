const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const statsSection = indexHtml.match(/<section[^>]*id="stats"[\s\S]*?<\/section>/i);
console.log('Full stats section:\n', statsSection ? statsSection[0] : 'None');
