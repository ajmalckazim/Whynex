const fs = require('fs');
const path = require('path');

const companyDir = path.join(__dirname, '..', 'pages', 'company');

const proc = fs.readFileSync(path.join(companyDir, 'our-process.html'), 'utf8');
const steps = proc.match(/<div class="time-step[\s\S]*?<\/div>/gi);
console.log('Process steps count:', steps ? steps.length : 0);
if (steps) {
  steps.forEach(s => console.log(s.replace(/\s+/g, ' ')));
}

const why = fs.readFileSync(path.join(companyDir, 'why-choose-us.html'), 'utf8');
const whyCards = why.match(/<div class="why-c[\s\S]*?<\/div>/gi);
console.log('\nWhy cards count:', whyCards ? whyCards.length : 0);
if (whyCards) {
  whyCards.forEach(w => console.log(w.replace(/\s+/g, ' ')));
}
