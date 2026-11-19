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
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/[^\n\r<]{0,40}pixel[^\n\r>]{0,40}/gi);
  if (matches) {
    console.log(path.basename(f) + ':');
    matches.forEach(m => console.log('  ' + m.trim()));
  }
});
