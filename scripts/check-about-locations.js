const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'pages', 'company', 'about-us.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const locIdx = content.indexOf('about-locations');
console.log(content.slice(locIdx, locIdx + 1500));
