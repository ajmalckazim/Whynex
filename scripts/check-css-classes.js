const fs = require('fs');
const path = require('path');

const homeCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'home.css'), 'utf8');

const matches = homeCss.split('\n').filter(line => 
  line.includes('.cs-') || 
  line.includes('case-study') || 
  line.includes('.port-') || 
  line.includes('portfolio') ||
  line.includes('.blog-')
);

console.log('Relevant CSS rules found in home.css:', matches.slice(0, 30));
