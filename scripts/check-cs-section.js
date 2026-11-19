const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');

const csIndex = indexHtml.indexOf('id="case-studies"');
if (csIndex !== -1) {
  console.log('Case studies section snippet:\n', indexHtml.slice(csIndex, csIndex + 1200));
} else {
  console.log('id="case-studies" not found, searching case-study:');
  const m = indexHtml.match(/case-study[\s\S]{0,200}/i);
  console.log(m ? m[0] : 'None');
}
