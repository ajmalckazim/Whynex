const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');

console.log('Title:', indexHtml.match(/<title>.*?<\/title>/i)?.[0]);
console.log('Hero H1 / Lead:', indexHtml.match(/<h1[\s\S]*?<\/h1>/i)?.[0]?.replace(/\s+/g, ' '));
console.log('Stats Check:');
const stats = indexHtml.match(/<div class="stat-card[\s\S]*?<\/div>/gi);
if (stats) stats.forEach(s => console.log(' ', s.replace(/\s+/g, ' ')));

console.log('Locations Check:');
const locs = indexHtml.match(/<div class="footer-locations">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i);
if (locs) console.log(locs[0].slice(0, 300).replace(/\s+/g, ' '));
