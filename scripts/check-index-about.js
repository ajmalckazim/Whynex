const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const aboutSection = indexHtml.match(/<section[^>]*id="about"[\s\S]*?<\/section>/i);
console.log('Index about section:\n', aboutSection ? aboutSection[0].slice(0, 1000) : 'None');
