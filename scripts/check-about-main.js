const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'pages', 'company', 'about-us.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const mainStart = content.indexOf('<main');
const mainEnd = content.indexOf('</main>');
console.log('About us main length:', mainEnd - mainStart);
console.log(content.slice(mainStart, mainStart + 1500));
