const fs = require('fs');
const path = require('path');

const robots = fs.readFileSync(path.join(__dirname, '..', 'robots.txt'), 'utf8');
console.log('Robots.txt:\n', robots);
