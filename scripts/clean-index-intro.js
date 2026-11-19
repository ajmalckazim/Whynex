const fs = require('fs');
const filePath = 'c:/Users/ajmal/OneDrive/Desktop/whynex/pages/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove antigravity-intro.css and inline script
content = content.replace(/\s*<link rel="stylesheet" href="\.\.\/css\/antigravity-intro\.css">[\s\S]*?<\/script>\s*\r?\n\s*\r?\n\s*<link rel="stylesheet" href="\.\.\/css\/faq\.css">/i, '\n  <link rel="stylesheet" href="../css/faq.css">');

// 2. Remove antigravity-intro DOM block
content = content.replace(/\s*<!-- ================= ANTIGRAVITY CINEMATIC INTRO ================= -->[\s\S]*?<\/div>\s*<\/div>\s*<button type="button" id="intro-skip-btn"[\s\S]*?<\/button>\s*<\/div>/i, '');

// 3. Remove antigravity-intro.js script tag
content = content.replace(/\s*<script defer src="\.\.\/js\/antigravity-intro\.js"><\/script>/i, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully cleaned up index.html!');
