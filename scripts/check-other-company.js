const fs = require('fs');
const path = require('path');

const companyDir = path.join(__dirname, '..', 'pages', 'company');
['our-team.html', 'our-process.html', 'why-choose-us.html'].forEach(file => {
  const p = path.join(companyDir, file);
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n=== ${file} ===`);
  const m = content.match(/<main[\s\S]*?<\/main>/i);
  if (m) {
    console.log(m[0].slice(0, 700));
  } else {
    console.log('No main tag found');
  }
});
