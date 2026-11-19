const fs = require('fs');
const path = require('path');

const webDevPath = path.join(__dirname, '..', 'pages', 'services', 'web-development.html');
const content = fs.readFileSync(webDevPath, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const faqScriptMarker = '<script defer src="../../js/faq.js">';
const body = content.slice(content.indexOf(heroMarker), content.indexOf(faqScriptMarker));

const chalCard = body.match(/<div class="chal-card[\s\S]*?<\/div>\s*<\/div>/i);
console.log('--- CHAL CARD ---');
console.log(chalCard ? chalCard[0] : 'None');

const solCard = body.match(/<div class="sol-card[\s\S]*?<\/div>\s*<\/div>/i);
console.log('--- SOL CARD ---');
console.log(solCard ? solCard[0] : 'None');

const srvCard = body.match(/<a href="[\s\S]*?" class="srv-card[\s\S]*?<\/a>/i);
console.log('--- SRV CARD ---');
console.log(srvCard ? srvCard[0] : 'None');

const faqItem = body.match(/<div class="faq-item[\s\S]*?<\/div>\s*<\/div>/i);
console.log('--- FAQ ITEM ---');
console.log(faqItem ? faqItem[0] : 'None');
