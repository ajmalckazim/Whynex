// scripts/sync-all-nav-and-footer.js
const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach(item => {
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      files = files.concat(getHtmlFiles(p));
    } else if (item.endsWith('.html')) {
      files.push(p);
    }
  });
  return files;
}

const pagesDir = path.join(__dirname, '..', 'pages');
const allPages = getHtmlFiles(pagesDir);

let updatedFiles = 0;

allPages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const relFromPages = path.relative(pagesDir, filePath).replace(/\\/g, '/');
  const isDepth1 = !relFromPages.includes('/'); // index.html, contact.html
  const prefix = isDepth1 ? '' : '../';

  // 1. Synchronize Footer Locations
  const footerLocRegex = /<div class="footer-locations">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="footer-bottom">/i;
  const newFooterLocs = `<div class="footer-locations">
            <div class="footer-country">
              <div class="footer-country-title">United Arab Emirates</div>
              <p>IFZA Business Park, DDP, Dubai Silicon Oasis, Dubai, UAE</p>
              <a href="tel:+971585752242">+971&nbsp;58&nbsp;575&nbsp;2242</a>
              <a href="mailto:contact@pixbitsolutions.com">contact@pixbitsolutions.com</a>
            </div>
            <div class="footer-country">
              <div class="footer-country-title">India</div>
              <p>2nd Floor, Sahya Building, Govt. Cyberpark, Kozhikode, Kerala, India</p>
              <a href="tel:+917560933933">+91&nbsp;7560&nbsp;933&nbsp;933</a>
              <a href="mailto:sales@pixbitsolutions.com">sales@pixbitsolutions.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">`;

  if (footerLocRegex.test(content)) {
    content = content.replace(footerLocRegex, newFooterLocs);
  }

  // 2. Synchronize Footer Quick Links and Learn More Links
  const quickLinksBlock = `<div class="footer-column">
              <div class="footer-col-title">Quick Links</div>
              <ul class="footer-links-list">
                <li><a href="${prefix}company/about-us.html">About Us</a></li>
                <li><a href="${prefix}portfolio/index.html">Portfolio</a></li>
                <li><a href="${prefix}case-studies/index.html">Case Studies</a></li>
                <li><a href="${prefix}blogs/index.html">Blogs</a></li>
                <li><a href="${prefix}contact.html">Contact Us</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <div class="footer-col-title">Core Services</div>
              <ul class="footer-links-list">
                <li><a href="${prefix}services/web-development.html">Web Development</a></li>
                <li><a href="${prefix}services/mobile-application.html">Mobile App Development</a></li>
                <li><a href="${prefix}services/ai-development.html">AI Development</a></li>
                <li><a href="${prefix}services/ui-ux-design.html">UI/UX Design</a></li>
                <li><a href="${prefix}services/e-commerce.html">E-Commerce</a></li>
                <li><a href="${prefix}services/digital-marketing.html">Digital Marketing</a></li>
                <li><a href="${prefix}services/search-engine-optimization.html">SEO Services</a></li>
              </ul>
            </div>`;

  const footerColsRegex = /<div class="footer-column">\s*<div class="footer-col-title">Quick Links<\/div>[\s\S]*?<div class="footer-column">\s*<div class="footer-col-title">Industries We Serve<\/div>/i;
  if (footerColsRegex.test(content)) {
    content = content.replace(footerColsRegex, `${quickLinksBlock}\n            <div class="footer-column">\n              <div class="footer-col-title">Industries We Serve</div>`);
  }

  // 3. Ensure Header Navigation Links point to dedicated pages
  // Desktop header links
  content = content.replace(/href="[^"]*#case-studies"/g, `href="${prefix}case-studies/index.html"`);
  content = content.replace(/href="[^"]*#portfolio"/g, `href="${prefix}portfolio/index.html"`);
  
  // Add Blogs link if missing in desktop nav
  if (!content.includes(`${prefix}blogs/index.html`) && content.includes(`${prefix}portfolio/index.html`)) {
    content = content.replace(
      new RegExp(`(<li class="nav-item"><a href="${prefix.replace('/', '\\/')}portfolio\\/index\\.html" class="nav-link">Portfolio<\\/a><\\/li>)`, 'g'),
      `$1\n            <li class="nav-item"><a href="${prefix}blogs/index.html" class="nav-link">Blogs</a></li>`
    );
  }

  // Mobile drawer links
  content = content.replace(/<a href="[^"]*#case-studies" class="mobile-nav-link">Case Studies<\/a>/g, `<a href="${prefix}case-studies/index.html" class="mobile-nav-link">Case Studies</a>`);
  content = content.replace(/<a href="[^"]*#portfolio" class="mobile-nav-link">Portfolio<\/a>/g, `<a href="${prefix}portfolio/index.html" class="mobile-nav-link">Portfolio</a>`);
  
  if (!content.includes(`class="mobile-nav-link">Blogs</a>`)) {
    content = content.replace(
      new RegExp(`(<a href="${prefix.replace('/', '\\/')}portfolio\\/index\\.html" class="mobile-nav-link">Portfolio<\\/a>)`, 'g'),
      `$1\n      <a href="${prefix}blogs/index.html" class="mobile-nav-link">Blogs</a>`
    );
  }

  // 4. In Services Mega Menu: ensure AI Development and Digital Marketing are linked
  if (!content.includes(`${prefix}services/ai-development.html`)) {
    // Insert AI Development under Web Development in Digitalization
    content = content.replace(
      new RegExp(`(<a href="${prefix.replace('/', '\\/')}services\\/web-development\\.html" class="mega-item">[\\s\\S]*?<\\/a>)`, 'g'),
      `$1\n                        <a href="${prefix}services/ai-development.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div><div><div class="mega-item-title">AI Development</div></div></a>`
    );
  }

  if (!content.includes(`${prefix}services/digital-marketing.html`)) {
    // Insert Digital Marketing under Search Engine Optimization in Digital Marketing column
    content = content.replace(
      new RegExp(`(<a href="${prefix.replace('/', '\\/')}services\\/search-engine-optimization\\.html" class="mega-item">[\\s\\S]*?<\\/a>)`, 'g'),
      `$1\n                        <a href="${prefix}services/digital-marketing.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div><div class="mega-item-title">Digital Marketing</div></div></a>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedFiles++;
});

console.log(`\nSuccessfully synchronized nav and footer across all ${updatedFiles} pages!`);
