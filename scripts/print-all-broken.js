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

const rootDir = path.join(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const allPages = getHtmlFiles(pagesDir);

allPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);
  const relFile = path.relative(pagesDir, file).replace(/\\/g, '/');

  const regex = /href="([^"#][^"]*)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) continue;

    const targetPath = path.resolve(fileDir, cleanHref);
    if (!fs.existsSync(targetPath)) {
      console.log(`[${relFile}] -> href="${href}"`);
    }
  }
});
