const fs = require('fs');

function inspectFooterEnd(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const footerIdx = content.lastIndexOf('<footer');
  if (footerIdx !== -1) {
    console.log(`=== ${filePath} ===`);
    console.log(content.slice(footerIdx));
  }
}

inspectFooterEnd('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/index.html');
inspectFooterEnd('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/services/web-development.html');
