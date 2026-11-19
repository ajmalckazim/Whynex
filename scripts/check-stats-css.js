const fs = require('fs');
const path = require('path');

const homeCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'home.css'), 'utf8');
const statsCss = homeCss.split('\n').filter(line => line.includes('.stat-') || line.includes('#stats'));
console.log('Stats CSS:\n', statsCss.join('\n'));
