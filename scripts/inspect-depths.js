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

const depthMap = {};
files.forEach(f => {
  const rel = path.relative(baseDir, f).split(path.sep).join('/');
  const parts = rel.split('/');
  const depth = parts.length;
  if (!depthMap[depth]) depthMap[depth] = [];
  depthMap[depth].push(rel);
});

console.log('Depth counts:');
Object.keys(depthMap).forEach(d => {
  console.log(`Depth ${d}: ${depthMap[d].length} files`);
});

console.log('\nSample depth 1:', depthMap['1']);
console.log('Sample depth 2 (first 5):', depthMap['2'] ? depthMap['2'].slice(0, 5) : 'None');
