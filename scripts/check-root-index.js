const fs = require('fs');
const path = require('path');

const rootIndex = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
console.log('Root index length:', rootIndex.length);
console.log(rootIndex.slice(0, 500));
