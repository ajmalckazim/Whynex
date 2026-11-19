const fs = require('fs');
const path = require('path');

function search(dir) {
  let matches = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') matches = matches.concat(search(full));
    } else {
      const ext = path.extname(file);
      if (['.html', '.js', '.css', '.json', '.xml', '.txt'].includes(ext)) {
        const text = fs.readFileSync(full, 'utf8');
        const count = (text.match(/pixbit/gi) || []).length;
        if (count > 0) {
          matches.push({ file: path.relative('c:/Users/ajmal/OneDrive/Desktop/whynex', full), count });
        }
      }
    }
  });
  return matches;
}

const res = search('c:/Users/ajmal/OneDrive/Desktop/whynex');
console.log('Files with pixbit matches:');
res.forEach(r => console.log(r.file + ': ' + r.count));
console.log('Total files:', res.length);
console.log('Total occurrences:', res.reduce((a, b) => a + b.count, 0));
