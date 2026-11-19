const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const baseDir = path.resolve(__dirname, '../pages');
const files = getHtmlFiles(baseDir);

let updatedCount = 0;
let alreadyCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(baseDir, filePath).split(path.sep).join('/');
  const depth = rel.split('/').length;
  const prefix = depth === 1 ? '../' : '../../';

  const cssTag = `  <link rel="stylesheet" href="${prefix}css/premium.css">`;
  const jsTag = `  <script defer src="${prefix}js/premium.js"></script>`;

  let modified = false;

  // 1. Inject CSS if not present
  if (!content.includes('css/premium.css')) {
    if (content.includes('faq.css')) {
      content = content.replace(/(<link[^>]*href="[^"]*faq\.css"[^>]*>)/i, `$1\n${cssTag}`);
      modified = true;
    } else if (content.includes('</head>')) {
      content = content.replace('</head>', `${cssTag}\n</head>`);
      modified = true;
    }
  }

  // 2. Inject JS if not present
  if (!content.includes('js/premium.js')) {
    if (content.includes('faq.js')) {
      content = content.replace(/(<script[^>]*src="[^"]*faq\.js"[^>]*><\/script>)/i, `$1\n${jsTag}`);
      modified = true;
    } else if (content.includes('</body>')) {
      content = content.replace('</body>', `${jsTag}\n</body>`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  } else {
    alreadyCount++;
  }
});

console.log(`Finished injecting premium assets:`);
console.log(`- Updated: ${updatedCount} files`);
console.log(`- Already up to date: ${alreadyCount} files`);
console.log(`- Total pages processed: ${files.length}`);
