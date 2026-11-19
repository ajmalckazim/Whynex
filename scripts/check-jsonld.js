const fs = require('fs');
const content = fs.readFileSync('pages/services/web-development.html', 'utf8');

const matches = Array.from(content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi));
console.log('Matches count:', matches.length);
matches.forEach((m, i) => {
  console.log(`\n--- Match ${i+1} ---`);
  console.log(m[1].slice(0, 300));
});
