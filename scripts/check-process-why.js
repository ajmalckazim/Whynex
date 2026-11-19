const fs = require('fs');
const path = require('path');

const companyDir = path.join(__dirname, '..', 'pages', 'company');
['our-process.html', 'why-choose-us.html'].forEach(file => {
  const p = path.join(companyDir, file);
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n=== ${file} ===`);
  const idx = content.lastIndexOf('</nav>');
  if (idx !== -1) {
    console.log(content.slice(idx, idx + 1200));
  }
});
