const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) files = files.concat(getHtmlFiles(p));
    else if (f.endsWith('.html')) files.push(p);
  });
  return files;
}

const pagesDir = path.join(__dirname, '..', 'pages');
const allPages = getHtmlFiles(pagesDir);

allPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(pagesDir, file).replace(/\\/g, '/');

  let type = 'none';
  if (content.includes('class="faq-section"')) {
    type = 'existing-faq';
  } else if (content.includes('class="final-cta')) {
    type = 'final-cta';
  } else if (content.includes('class="about-cta')) {
    type = 'about-cta';
  } else if (content.includes('class="team-cta')) {
    type = 'team-cta';
  } else if (content.includes('class="contact-offices')) {
    type = 'contact-offices';
  } else if (content.includes('</main>')) {
    type = 'end-of-main';
  } else if (content.includes('<footer')) {
    type = 'before-footer';
  }

  console.log(`[${type}] -> ${rel}`);
});
