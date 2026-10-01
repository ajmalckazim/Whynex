const fs = require('fs');
let content = fs.readFileSync('build_company.js', 'utf8');
content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('build_company.js', content);
