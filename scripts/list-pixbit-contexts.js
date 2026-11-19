const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) results = results.concat(getHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const files = getHtmlFiles('c:/Users/ajmal/OneDrive/Desktop/whynex/pages');
const patterns = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/[^\n\r<]{0,40}pixbit[^\n\r>]{0,40}/gi) || [];
  matches.forEach(m => patterns.add(m.trim()));
});

console.log('Unique contexts with pixbit (' + patterns.size + '):');
Array.from(patterns).slice(0, 30).forEach(p => console.log(' - ' + p));
