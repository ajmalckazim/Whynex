const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles('c:/Users/ajmal/OneDrive/Desktop/whynex/pages');
let totalChanges = 0;
let modifiedFiles = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Specific about paragraph replacement on index.html
  content = content.replace(
    /Founded in 2014,\s*Pixbit Solutions draws its name from the two fundamental building blocks of design and technology[—–-]the pixel and the bit\.\s*This philosophy defines our commitment:\s*delivering top-quality,\s*detail-oriented digital experiences by blending striking UI\/UX design with flawless software execution\./gi,
    'Founded in 2014, WHYNEX delivers top-quality, detail-oriented digital experiences by blending striking UI/UX design with flawless software execution and digital marketing strategies.'
  );

  // Combined terms
  content = content.replace(/Pixbit\s*Solutions\s*\/\s*WHYNEX/gi, 'WHYNEX');
  content = content.replace(/Pixbit\s*\/\s*WHYNEX/gi, 'WHYNEX');

  // Company names & titles
  content = content.replace(/Pixbit Solutions/g, 'WHYNEX');
  content = content.replace(/PIXBIT SOLUTIONS/g, 'WHYNEX');
  content = content.replace(/pixbit solutions/g, 'whynex');
  content = content.replace(/Pixbit/g, 'WHYNEX');
  content = content.replace(/PIXBIT/g, 'WHYNEX');

  // Emails & URLs
  content = content.replace(/contact@pixbitsolutions\.com/g, 'contact@whynex.com');
  content = content.replace(/sales@pixbitsolutions\.com/g, 'sales@whynex.com');
  content = content.replace(/https:\/\/pixbitsolutions\.com/g, 'https://whynex.com');
  content = content.replace(/http:\/\/pixbitsolutions\.com/g, 'https://whynex.com');
  content = content.replace(/pixbitsolutions\.com/g, 'whynex.com');

  // CSS class names
  content = content.replace(/pixbit-mega-col-title/g, 'whynex-mega-col-title');
  content = content.replace(/pixbit-mega-col/g, 'whynex-mega-col');
  content = content.replace(/pixbit-mega-group/g, 'whynex-mega-group');
  content = content.replace(/pixbit-mega-link/g, 'whynex-mega-link');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
  }
});

console.log(`Processed ${files.length} HTML files.`);
console.log(`Modified: ${modifiedFiles} files.`);
