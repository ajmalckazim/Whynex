const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles('c:/Users/ajmal/OneDrive/Desktop/whynex/pages');
let count = 0;
files.forEach(f => {
  if (fs.readFileSync(f, 'utf8').includes('Flowing with the Future')) count++;
});
console.log('Pages containing "Flowing with the Future": ' + count + ' / ' + files.length);
