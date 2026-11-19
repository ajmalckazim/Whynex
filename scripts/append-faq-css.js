const fs = require('fs');
const path = require('path');

const siteCssPath = path.join(__dirname, '..', 'css', 'site.css');
const faqCssPath = path.join(__dirname, '..', 'css', 'faq.css');

let siteCss = fs.readFileSync(siteCssPath, 'utf8');
const faqCss = fs.readFileSync(faqCssPath, 'utf8');

if (!siteCss.includes('.faq-box')) {
  siteCss += '\n\n' + faqCss;
  fs.writeFileSync(siteCssPath, siteCss, 'utf8');
  console.log('Appended FAQ styles to css/site.css');
} else {
  console.log('FAQ styles already present in css/site.css');
}
