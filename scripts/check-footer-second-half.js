const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, '..', 'pages', 'services', 'web-development.html'), 'utf8');
const footerMatch = page.match(/<footer id="footer"[\s\S]*?<\/footer>/i);
if (footerMatch) {
  console.log(footerMatch[0].slice(1500));
}
