const fs = require('fs');
const content = fs.readFileSync('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/services/web-development.html', 'utf8');

const matches = [
  ...content.matchAll(/<section[^>]*class="([^"]*)"/gi)
].map(m => m[1]);

console.log('Sections in web-development.html:');
console.log(matches);

const cardMatches = [
  ...content.matchAll(/class="([^"]*(?:card|sol|chal)[^"]*)"/gi)
].map(m => m[1]);
console.log('\nCard classes sample:');
console.log([...new Set(cardMatches)].slice(0, 10));
