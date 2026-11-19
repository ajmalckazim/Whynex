const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, '..', 'pages', 'services', 'web-development.html'), 'utf8');
const footerMatch = page.match(/<footer id="footer"[\s\S]*?<\/footer>/i);
console.log('Footer snippet:\n', footerMatch ? footerMatch[0].slice(0, 1500) : 'None');
