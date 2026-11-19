const fs = require('fs');
const path = require('path');

const webDevPath = path.join(__dirname, '..', 'pages', 'services', 'web-development.html');
const content = fs.readFileSync(webDevPath, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const faqScriptMarker = '<script defer src="../../js/faq.js">';

const startIndex = content.indexOf(heroMarker);
const endIndex = content.indexOf(faqScriptMarker);

console.log('Hero start index:', startIndex);
console.log('FAQ script index:', endIndex);
console.log('Hero preview:\n', content.slice(startIndex, startIndex + 250));
console.log('End preview:\n', content.slice(endIndex - 150, endIndex));
