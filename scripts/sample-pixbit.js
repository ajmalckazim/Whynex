const fs = require('fs');

function inspectLines(file) {
  console.log(`=== ${file} ===`);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((l, idx) => {
    if (/pixbit/i.test(l)) {
      console.log(`${idx + 1}: ${l.trim()}`);
    }
  });
}

inspectLines('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/index.html');
inspectLines('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/services/web-development.html');
