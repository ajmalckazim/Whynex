// scripts/verify-all-links.js
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

let totalLinksChecked = 0;
let brokenLinks = [];

allPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);
  const relFile = path.relative(pagesDir, file).replace(/\\/g, '/');

  // Match all href attributes
  const regex = /href="([^"#][^"]*)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];

    // Ignore external URLs, mailto, tel, javascript
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }

    // Strip anchor and query params
    const cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) continue;

    totalLinksChecked++;
    const targetPath = path.resolve(fileDir, cleanHref);

    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({
        source: relFile,
        href: href,
        resolved: path.relative(rootDir, targetPath).replace(/\\/g, '/')
      });
    }
  }
});

console.log(`\nLink Verification Complete:`);
console.log(`Total internal links checked: ${totalLinksChecked}`);
console.log(`Broken links found: ${brokenLinks.length}`);

if (brokenLinks.length > 0) {
  console.log('\nBroken links details (first 20):');
  brokenLinks.slice(0, 20).forEach(b => {
    console.log(`- In [${b.source}]: href="${b.href}" -> Target not found: [${b.resolved}]`);
  });
} else {
  console.log('✓ All internal links resolved successfully with ZERO 404s!');
}
