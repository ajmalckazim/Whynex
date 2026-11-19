const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'pages', 'company', 'testimonials.html');
const content = fs.readFileSync(testPath, 'utf8');

const mainStart = content.indexOf('<main');
const mainEnd = content.indexOf('</main>');
console.log('Testimonials main length:', mainEnd - mainStart);
console.log(content.slice(mainStart, mainStart + 1500));
