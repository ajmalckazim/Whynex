const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'pages', 'company', 'testimonials.html');
const content = fs.readFileSync(testPath, 'utf8');

const navEnd = content.lastIndexOf('</nav>');
console.log(content.slice(navEnd, navEnd + 2000));
