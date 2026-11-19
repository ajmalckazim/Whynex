// scripts/generate-sitemap.js
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

const today = '2026-11-19';
const baseUrl = 'https://whynex.com';

const urlEntries = [
  `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
];

allPages.forEach(file => {
  const rel = path.relative(pagesDir, file).replace(/\\/g, '/');
  let priority = '0.7';
  let changefreq = 'monthly';

  if (rel === 'index.html') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (rel === 'portfolio/index.html' || rel === 'case-studies/index.html' || rel === 'blogs/index.html') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (rel.startsWith('services/')) {
    priority = '0.8';
  } else if (rel.startsWith('case-studies/')) {
    priority = '0.8';
  } else if (rel.startsWith('blogs/')) {
    priority = '0.8';
  } else if (rel.startsWith('company/')) {
    priority = '0.7';
  } else if (rel === 'contact.html') {
    priority = '0.8';
  }

  urlEntries.push(`  <url>
    <loc>${baseUrl}/pages/${rel}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.join('\n')}
</urlset>\n`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${urlEntries.length} URL entries!`);
