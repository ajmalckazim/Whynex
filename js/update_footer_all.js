const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\ajmal\\OneDrive\\Desktop\\Whynex\\Whynex\\Whynex\\pages';

const newCss = `
    /* ══════════════════════════════════════
       FOOTER
    ══════════════════════════════════════ */
    #footer {
      background: #050505;
      color: #ffffff;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-top {
      padding: 64px 0 24px;
    }

    .footer-layout {
      display: grid;
      grid-template-columns: 0.9fr 1.8fr;
      gap: 56px;
      align-items: start;
    }

    .footer-brand {
      max-width: 360px;
      padding-right: 28px;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-brand-logo {
      display: inline-block;
      margin-bottom: 16px;
    }

    .footer-brand-logo img {
      display: block;
      width: 220px;
      height: auto;
      filter: brightness(0) invert(1);
    }

    .footer-brand-heading {
      font-size: 20px;
      line-height: 1.35;
      font-weight: 700;
      color: var(--white);
      margin: 0 0 10px;
      letter-spacing: -0.03em;
    }

    .footer-brand-copy {
      font-size: 13px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.48);
      margin: 0 0 20px;
      max-width: 270px;
    }

    .footer-form {
      display: flex;
      gap: 8px;
      margin-bottom: 18px;
    }

    .footer-form input {
      width: 100%;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--white);
      font-size: 13px;
      font-family: var(--font);
      outline: none;
      transition: var(--transition);
    }

    .footer-form input::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }

    .footer-form input:focus {
      border-color: var(--baby-blue);
    }

    .footer-cta {
      width: 100%;
      padding: 13px 18px;
      background: var(--white);
      color: var(--black);
      border: none;
      font-family: var(--font);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: var(--transition);
    }

    .footer-cta:hover {
      background: var(--baby-blue);
      transform: translateY(-1px);
    }

    .footer-socials {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }

    .footer-socials a {
      width: 32px;
      height: 32px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.64);
      transition: var(--transition);
    }

    .footer-socials a:hover {
      color: var(--black);
      background: var(--baby-blue);
      border-color: var(--baby-blue);
    }

    .footer-socials svg {
      width: 14px;
      height: 14px;
    }

    .footer-main {
      width: 100%;
    }

    .footer-main-title {
      font-size: clamp(2.5rem, 4vw, 5rem);
      line-height: 1.12;
      font-weight: 400;
      letter-spacing: -0.05em;
      color: var(--white);
      margin: 0 0 28px;
      font-style: normal;
      font-family: var(--font);
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(150px, 1fr));
      gap: 22px 24px;
    }

    .footer-column {
      min-width: 0;
    }

    .footer-col-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.66);
      margin-bottom: 16px;
    }

    .footer-links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-links-list li,
    .footer-links-list a,
    .footer-links-list span {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.42);
      line-height: 1.7;
      text-decoration: none;
      transition: var(--transition);
    }

    .footer-links-list a:hover {
      color: var(--baby-blue);
    }

    .footer-locations {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-country {
      min-width: 0;
    }

    .footer-country-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.72);
      margin-bottom: 14px;
    }

    .footer-country p,
    .footer-country a {
      display: block;
      font-size: 12px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.42);
      text-decoration: none;
      margin: 0 0 4px;
    }

    .footer-country a:hover {
      color: var(--baby-blue);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px 0;
    }

    .footer-bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-copy {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.28);
    }

    .footer-legal {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .footer-legal a {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.28);
      transition: color var(--transition);
      text-decoration: none;
    }

    .footer-legal a:hover {
      color: var(--baby-blue);
    }

    @media (max-width: 1000px) {
      .footer-layout {
        grid-template-columns: 1fr;
      }

      .footer-brand {
        max-width: none;
        border-right: none;
        padding-right: 0;
      }

      .footer-links-grid {
        grid-template-columns: repeat(2, minmax(140px, 1fr));
      }
    }

    @media (max-width: 640px) {
      .footer-top {
        padding-top: 48px;
      }

      .footer-brand-logo img {
        width: 180px;
      }

      .footer-links-grid,
      .footer-locations {
        grid-template-columns: 1fr;
      }

      .footer-form {
        flex-direction: column;
      }
    }

    /* ══════════════════════════════════════
       ANIMATIONS (fade-up)
    ══════════════════════════════════════ */`;

const cssPattern = /\/\* ══════════════════════════════════════\s*FOOTER\s*═════════════════════════════════════ \*\/[\s\S]*?\/\* ══════════════════════════════════════\s*ANIMATIONS \(fade-up\)\s*═════════════════════════════════════ \*\//m;
const footerPattern = /  <!-- ═══════════════════ FOOTER ═══════════════════ -->[\s\S]*?  <!-- ═══════════════════ JAVASCRIPT ═══════════════════ -->/m;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.isFile() && full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const pages = walk(root);
let updated = 0;

for (const file of pages) {
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rel = path.relative(root, file).split(path.sep);
  const imgSrc = rel.length === 1 ? '../images/whynex-logo.png' : '../../images/whynex-logo.png';

  const newFooter = `  <!-- ═══════════════════ FOOTER ═══════════════════ -->
  <footer id="footer" role="contentinfo">
    <div class="footer-top">
      <div class="container footer-layout">
        <div class="footer-brand">
          <a href="index.html" class="footer-brand-logo" aria-label="WHYNEX Home">
            <img src="${imgSrc}" alt="WHYNEX" />
          </a>
          <h3 class="footer-brand-heading">Food for thought</h3>
          <p class="footer-brand-copy">Get truth digital insights and advice from WHYNEX experts and consultants—straight to your inbox.</p>
          <form class="footer-form" aria-label="Newsletter subscription" onsubmit="handleNewsletter(event)">
            <input type="email" placeholder="Your e-mail" aria-label="Email for newsletter" required />
          </form>
          <button type="button" class="footer-cta">Get My Free Marketing Report</button>
          <div class="footer-socials" aria-label="Social links">
            <a href="https://www.instagram.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.snapchat.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C10 2 8.5 3 7.5 4.5C7.2 5 7 5.7 7 6.3V6.5C7 8.5 6 9 5 9C4.5 9 4 8.5 3.5 8C3 7.5 2.5 7.5 2 8C1 9 1 11.5 2 13C2.5 13.8 3 14 3.5 14C4 14 4 14.5 4 15V16C4 17 3.5 18 3 18H2.5C1.7 18 1 18.7 1 19.5C1 20.3 1.7 21 2.5 21H21.5C22.3 21 23 20.3 23 19.5C23 18.7 22.3 18 21.5 18H21C20.5 18 20 17 20 16V15C20 14.5 20 14 20.5 14C21 14 21.5 13.8 22 13C23 11.5 23 9 22 8C21.5 7.5 21 7.5 20.5 8C20 8.5 19.5 9 19 9C18 9 17 8.5 17 6.5V6.3C17 5.7 16.8 5 16.5 4.5C15.5 3 14 2 12 2Z"/></svg>
            </a>
            <a href="https://www.x.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16m0-16L4 20"/></svg>
            </a>
            <a href="https://www.youtube.com/whynex.co" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-main">
          <h2 class="footer-main-title">Flowing with the Future</h2>
          <div class="footer-links-grid">
            <div class="footer-column">
              <div class="footer-col-title">Quick Links</div>
              <ul class="footer-links-list">
                <li><a href="index.html">About Us</a></li>
                <li><a href="index.html">Portfolio</a></li>
                <li><a href="index.html">Case Studies</a></li>
                <li><a href="index.html">Blogs</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <div class="footer-col-title">Learn More</div>
              <ul class="footer-links-list">
                <li><a href="services/mobile-app-development.html">Mobile App Development</a></li>
                <li><a href="services/web-development.html">Web Development</a></li>
                <li><a href="services/seo.html">Search Engine Optimization</a></li>
                <li><a href="services/digital-marketing.html">Digital Marketing</a></li>
                <li><a href="services/ui-ux-design.html">UI/UX Design</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <div class="footer-col-title">Industries We Serve</div>
              <ul class="footer-links-list">
                <li><a href="industries/automotive.html">Automotive</a></li>
                <li><a href="industries/real-estate.html">Real Estate</a></li>
                <li><a href="industries/education-e-learning.html">Education</a></li>
                <li><a href="industries/ecommerce-retail.html">E-commerce</a></li>
                <li><a href="industries/finance-fintech.html">Finance</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-locations">
            <div class="footer-country">
              <div class="footer-country-title">Qatar</div>
              <p>The Square Mall, Izghawa, Qatar</p>
              <a href="tel:+97430234954">+974 3023 4954</a>
              <a href="mailto:whynexofficial@gmail.com">whynexofficial@gmail.com</a>
            </div>
            <div class="footer-country">
              <div class="footer-country-title">India</div>
              <p>Aishwarya, Sulthan Bathery, Wayanad, Kerala, India</p>
              <a href="tel:+919778536892">+91 9778536892</a>
              <a href="mailto:whynexofficial@gmail.com">whynexofficial@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <div class="footer-copy">© 2026 WHYNEX. All Rights Reserved.</div>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  text = text.replace(cssPattern, newCss);
  text = text.replace(footerPattern, newFooter);
  fs.writeFileSync(file, text, 'utf8');
  updated += 1;
}

console.log(`Updated ${updated} HTML pages`);
