const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const newMegaMenu = `
        <li class="nav-item" aria-haspopup="true">
          <a href="#" class="nav-link has-mega" aria-expanded="false">
            Company
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
          <div class="mega-wrap" role="menu" aria-label="Company menu">
            <div class="container">
              <div class="mega-inner" style="grid-template-columns: repeat(4,1fr);">
                <div class="mega-col">
                  <div class="mega-col-title">Discover</div>
                  <a href="/company/about-us.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div><div class="mega-item-title">About Us</div></div></a>
                  <a href="/company/our-team.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div><div class="mega-item-title">Our Team</div></div></a>
                  <a href="/company/why-choose-us.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div><div class="mega-item-title">Why Choose Us</div></div></a>
                  <a href="/company/our-process.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div><div class="mega-item-title">Our Process</div></div></a>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title">Culture</div>
                  <a href="/company/careers.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div><div><div class="mega-item-title">Careers</div></div></a>
                  <a href="/company/life-at-company.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div><div class="mega-item-title">Life at Company</div></div></a>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title">Connect</div>
                  <a href="/company/testimonials.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div><div class="mega-item-title">Testimonials</div></div></a>
                  <a href="/contact.html" class="mega-item"><div class="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><div class="mega-item-title">Contact Us</div></div></a>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title" style="color:var(--baby-blue);">LET'S BUILD SOMETHING GREAT</div>
                  <div style="padding: 16px 0;">
                    <div style="font-size:13px; color:rgba(255,255,255,0.7); line-height:1.8; margin-bottom:20px;">Have an idea? Let's transform it into a powerful digital experience.</div>
                    <a href="/contact.html" class="btn btn-primary" style="font-size:12px; padding:10px 22px;">Start a Project →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>`;

const oldMegaMenuRegex = /<li class="nav-item" aria-haspopup="true">\s*<a href="#" class="nav-link has-mega"[^]*?<\/li>/;
indexHtml = indexHtml.replace(oldMegaMenuRegex, newMegaMenu.trim());

const newMobileMenu = `
    <div>
      <div class="mobile-nav-link" id="acc-company">
        Company
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="mobile-acc-content" id="acc-company-content">
        <a href="/company/about-us.html" class="mobile-acc-item">About Us</a>
        <a href="/company/our-team.html" class="mobile-acc-item">Our Team</a>
        <a href="/company/careers.html" class="mobile-acc-item">Careers</a>
        <a href="/company/life-at-company.html" class="mobile-acc-item">Life at Company</a>
        <a href="/company/why-choose-us.html" class="mobile-acc-item">Why Choose Us</a>
        <a href="/company/our-process.html" class="mobile-acc-item">Our Process</a>
        <a href="/company/testimonials.html" class="mobile-acc-item">Testimonials</a>
        <a href="/contact.html" class="mobile-acc-item">Contact Us</a>
      </div>
    </div>`;

const oldMobileRegex = /<div>\s*<div class="mobile-nav-link" id="acc-company">[^]*?<\/div>\s*<\/div>/;
indexHtml = indexHtml.replace(oldMobileRegex, newMobileMenu.trim());

fs.writeFileSync(indexHtmlPath, indexHtml);
console.log('Successfully updated index.html company navigation');
