const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');

const match = indexHtml.match(/<article class="cs-card[\s\S]*?<\/article>/i);
console.log('CS Card template:\n', match ? match[0] : 'None');
