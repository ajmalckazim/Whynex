const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const srvSection = indexHtml.match(/<section[^>]*id="services"[\s\S]*?<\/section>/i);
if (srvSection) {
  const cards = srvSection[0].match(/<article[\s\S]*?<\/article>/g);
  if (cards) {
    console.log(cards[0]);
  }
}
