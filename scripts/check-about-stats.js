const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'pages', 'company', 'about-us.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const statsIdx = content.indexOf('about-stats');
console.log(content.slice(statsIdx, statsIdx + 2000));
