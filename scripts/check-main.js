const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'pages', 'company', 'about-us.html');
const about = fs.readFileSync(aboutPath, 'utf8');
const mainStart = about.indexOf('<main');

console.log('About us main start snippet:\n', about.slice(mainStart - 300, mainStart + 150));
