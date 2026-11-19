const fs = require('fs');
const path = require('path');

const team = fs.readFileSync(path.join(__dirname, '..', 'pages', 'company', 'our-team.html'), 'utf8');
const disc = team.match(/<section class="team-disciplines"[\s\S]*?<\/section>/i);
console.log('Disciplines:\n', disc ? disc[0].slice(0, 1000) : 'None');
