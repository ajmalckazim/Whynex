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
console.log(`Total HTML pages in pages/: ${allPages.length}`);
allPages.forEach(p => {
  const rel = path.relative(path.join(__dirname, '..', 'pages'), p).replace(/\\/g, '/');
  console.log(`- ${rel}`);
});
