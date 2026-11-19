const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach(item => {
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      files = files.concat(getHtmlFiles(p));
    } else if (item.endsWith('.html')) {
      files.push(p);
    }
  });
  return files;
}

const allPages = getHtmlFiles(path.join(__dirname, '..', 'pages'));
let outdatedCount = 0;

allPages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('Izghawa') || content.includes('Sulthan Bathery') || content.includes('+97430234954')) {
    outdatedCount++;
  }
});

console.log(`Pages with outdated footer locations/phone: ${outdatedCount} of ${allPages.length}`);
