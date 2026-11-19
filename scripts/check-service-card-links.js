const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'pages', 'index.html'), 'utf8');
const srvSection = indexHtml.match(/<section[^>]*id="services"[\s\S]*?<\/section>/i);
if (srvSection) {
  const cards = srvSection[0].match(/<article[\s\S]*?<\/article>/g);
  if (cards) {
    cards.forEach(c => {
      const title = c.match(/<h3[^>]*>(.*?)<\/h3>/)?.[1];
      const link = c.match(/href="([^"]*)"/)?.[1];
      console.log(`${title} -> href="${link}"`);
    });
  }
}
