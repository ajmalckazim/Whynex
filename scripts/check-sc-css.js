const fs = require('fs');
const path = require('path');

const homeCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'home.css'), 'utf8');
const scCss = homeCss.split('\n').filter(line => line.includes('.service-') || line.includes('.sc-'));
console.log('Service card CSS:\n', scCss.join('\n'));
