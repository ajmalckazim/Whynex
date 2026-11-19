const fs = require('fs');
const path = require('path');

const team = fs.readFileSync(path.join(__dirname, '..', 'pages', 'company', 'our-team.html'), 'utf8');
const sections = team.match(/<section[\s\S]*?>/gi);
console.log('Team sections:', sections);
const m = team.match(/<section class="team-leadership[\s\S]*?<\/section>/i) || team.match(/<section class="team-grid[\s\S]*?<\/section>/i);
if (m) console.log(m[0].slice(0, 1000));
