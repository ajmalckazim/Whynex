const fs = require('fs');
const path = require('path');

const webDevPath = path.join(__dirname, '..', 'pages', 'services', 'web-development.html');
const content = fs.readFileSync(webDevPath, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const faqScriptMarker = '<script defer src="../../js/faq.js">';

const startIndex = content.indexOf(heroMarker);
const endIndex = content.indexOf(faqScriptMarker);
const body = content.slice(startIndex, endIndex);

const sections = body.split('</section>');
sections.forEach((sec, i) => {
  if (sec.trim()) {
    console.log(`\n--- SECTION ${i+1} ---`);
    console.log(sec.trim().slice(0, 350) + '...');
  }
});
