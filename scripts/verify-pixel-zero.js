const fs = require('fs');
const path = require('path');

function search(dir) {
  let count = 0;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') count += search(full);
    } else {
      const ext = path.extname(file);
      if (['.html', '.js', '.css'].includes(ext)) {
        const text = fs.readFileSync(full, 'utf8');
        if (/where pixel meets bit/i.test(text)) {
          console.log('Match in ' + full);
          count++;
        }
      }
    }
  });
  return count;
}

const total = search('c:/Users/ajmal/OneDrive/Desktop/whynex');
console.log('Total matches for "where pixel meets bit": ' + total);
