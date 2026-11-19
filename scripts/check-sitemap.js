const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
console.log('Sitemap length:', sitemap.length);
console.log(sitemap.slice(0, 800));
