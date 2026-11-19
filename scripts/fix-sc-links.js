// scripts/fix-sc-links.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'pages', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const serviceCardsSection = `      <div class="services-grid">
        <article class="service-card reveal">
          <div class="sc-num">01</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg></div>
          <h3 class="sc-title"><a href="services/web-development.html" style="color:inherit; text-decoration:none;">Web Development</a></h3>
          <p class="sc-desc">Modern, responsive and high-performance websites and enterprise web portals built around your business objectives.</p>
          <a href="services/web-development.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>

        <article class="service-card reveal reveal-delay-1">
          <div class="sc-num">02</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg></div>
          <h3 class="sc-title"><a href="services/mobile-application.html" style="color:inherit; text-decoration:none;">Mobile App Development</a></h3>
          <p class="sc-desc">Native iOS and Android apps, cross-platform Flutter solutions and high-performing digital products for global users.</p>
          <a href="services/mobile-application.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>

        <article class="service-card reveal reveal-delay-2">
          <div class="sc-num">03</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg></div>
          <h3 class="sc-title"><a href="services/digital-marketing.html" style="color:inherit; text-decoration:none;">Digital Marketing</a></h3>
          <p class="sc-desc">Performance-driven digital marketing campaigns, Google Ads, paid social media, and data-backed lead acquisition funnels.</p>
          <a href="services/digital-marketing.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>

        <article class="service-card reveal">
          <div class="sc-num">04</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg></div>
          <h3 class="sc-title"><a href="services/search-engine-optimization.html" style="color:inherit; text-decoration:none;">SEO Services</a></h3>
          <p class="sc-desc">Data-backed search engine optimization that boosts your Google rankings, domain authority, and qualified organic conversions.</p>
          <a href="services/search-engine-optimization.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>

        <article class="service-card reveal reveal-delay-1">
          <div class="sc-num">05</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg></div>
          <h3 class="sc-title"><a href="services/brand-consulting.html" style="color:inherit; text-decoration:none;">Branding &amp; Creative</a></h3>
          <p class="sc-desc">Distinctive brand identities, logo design systems, typography guidelines, and visual language that build brand recall.</p>
          <a href="services/brand-consulting.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>

        <article class="service-card reveal reveal-delay-2">
          <div class="sc-num">06</div>
          <div class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M14 9l3 3-3 3" />
            </svg></div>
          <h3 class="sc-title"><a href="services/ui-ux-design.html" style="color:inherit; text-decoration:none;">UI/UX Design</a></h3>
          <p class="sc-desc">Intuitive, user-centred digital interface designs, wireframes, and clickable interactive Figma prototypes built to convert.</p>
          <a href="services/ui-ux-design.html" class="service-arrow" style="text-decoration:none; color:inherit;">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></a>
        </article>
      </div>`;

const oldGridRegex = /<div class="services-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
if (oldGridRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldGridRegex, `${serviceCardsSection}\n    </div>\n  </section>`);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('Successfully updated service cards on homepage with working links!');
} else {
  console.log('Could not find oldGridRegex');
}
