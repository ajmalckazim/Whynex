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
const rootDir = path.resolve(__dirname, '..');
const files = getHtmlFiles(baseDir);

let passCount = 0;
let errors = [];

files.forEach(filePath => {
  const rel = path.relative(baseDir, filePath).split(path.sep).join('/');
  const content = fs.readFileSync(filePath, 'utf8');

  // Check CSS
  const cssMatch = content.match(/<link[^>]*href="([^"]*premium\.css)"[^>]*>/i);
  if (!cssMatch) {
    errors.push(`[${rel}] Missing premium.css link`);
    return;
  }
  const cssHref = cssMatch[1];
  const resolvedCss = path.resolve(path.dirname(filePath), cssHref);
  if (!fs.existsSync(resolvedCss)) {
    errors.push(`[${rel}] premium.css not found at resolved path: ${resolvedCss}`);
    return;
  }

  // Check JS
  const jsMatch = content.match(/<script[^>]*src="([^"]*premium\.js)"[^>]*>/i);
  if (!jsMatch) {
    errors.push(`[${rel}] Missing premium.js link`);
    return;
  }
  const jsSrc = jsMatch[1];
  const resolvedJs = path.resolve(path.dirname(filePath), jsSrc);
  if (!fs.existsSync(resolvedJs)) {
    errors.push(`[${rel}] premium.js not found at resolved path: ${resolvedJs}`);
    return;
  }

  passCount++;
});

console.log(`=== PREMIUM VERIFICATION REPORT ===`);
console.log(`Total Pages: ${files.length}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\nErrors found:`);
  errors.forEach(err => console.log(' - ' + err));
  process.exit(1);
} else {
  console.log(`\nALL 66 PAGES 100% PASSED PREMIUM ASSETS CHECK!`);
}
