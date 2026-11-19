const fs = require('fs');
const path = require('path');

// 1. Update index.html
const indexPath = 'c:/Users/ajmal/OneDrive/Desktop/whynex/pages/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

indexContent = indexContent.replace(
  /<p>- Where Pixel Meets Bit -<\/p>/gi,
  '<p>- Flowing with the Future -</p>'
);

indexContent = indexContent.replace(
  /<h2>WHERE PIXEL<br>MEETS BIT<\/h2>/gi,
  '<h2>FLOWING WITH<br>THE FUTURE</h2>'
);

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Updated index.html');

// 2. Update about-us.html
const aboutPath = 'c:/Users/ajmal/OneDrive/Desktop/whynex/pages/company/about-us.html';
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

aboutContent = aboutContent.replace(
  /<h2 id="about-story-title">Born from the Fundamental Units of Digital Innovation\.<\/h2>/gi,
  '<h2 id="about-story-title">Flowing with the Future: Driving Digital Innovation.</h2>'
);

aboutContent = aboutContent.replace(
  /<p>Founded in 2014, our identity was built around two atomic building blocks of the digital world: the <strong>Pixel<\/strong> \(the smallest element of visual design\) and the <strong>Bit<\/strong> \(the fundamental unit of computing code\)\.<\/p>/gi,
  '<p>Founded in 2014, WHYNEX is driven by our guiding ethos: <strong>Flowing with the Future</strong>. We combine forward-thinking digital strategy, human-centric design, and robust engineering to deliver transformative web, mobile, and AI solutions.</p>'
);

aboutContent = aboutContent.replace(
  /Founded in 2014, our agency was built around the fundamental atomic units of the digital universe: the Pixel \(the smallest visual element of design\) and the Bit \(the fundamental unit of computer code\)\. Our core philosophy blends obsessive aesthetic design with rock-solid architectural logic\./gi,
  'Founded in 2014, WHYNEX is built around our forward-looking philosophy: Flowing with the Future. Our core mission blends obsessive aesthetic design with rock-solid architectural logic to engineer transformative digital experiences.'
);

fs.writeFileSync(aboutPath, aboutContent, 'utf8');
console.log('Updated about-us.html');

// 3. Update update-homepage-content.js
const scriptPath = 'c:/Users/ajmal/OneDrive/Desktop/whynex/update-homepage-content.js';
if (fs.existsSync(scriptPath)) {
  let sContent = fs.readFileSync(scriptPath, 'utf8');
  sContent = sContent.replace(/Where Pixel Meets Bit/gi, 'Flowing with the Future');
  sContent = sContent.replace(/WHERE PIXEL<br>MEETS BIT/gi, 'FLOWING WITH<br>THE FUTURE');
  fs.writeFileSync(scriptPath, sContent, 'utf8');
  console.log('Updated update-homepage-content.js');
}
