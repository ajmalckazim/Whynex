const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'pages', 'company', 'about-us.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const headEnd = content.indexOf('</head>');
const bodyStart = content.indexOf('<body');
const headerStart = content.indexOf('<header');
const mainStart = content.indexOf('<main');
const mainEnd = content.indexOf('</main>');
const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>');

console.log('Head end:', headEnd);
console.log('Main start:', mainStart);
console.log('Main end:', mainEnd);
console.log('Footer start:', footerStart);
console.log('Footer end:', footerEnd);
