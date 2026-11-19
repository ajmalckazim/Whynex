const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const srvSection = indexHtml.match(/<section[^>]*id="services"[\s\S]*?<\/section>/i);
console.log('Services section in index.html:\n', srvSection ? srvSection[0].slice(0, 1000) : 'None');
