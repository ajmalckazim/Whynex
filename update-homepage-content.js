// update-homepage-content.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pages', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Title & Meta
html = html.replace(
  /<title>.*?<\/title>/i,
  '<title>Pixbit Solutions | Web &amp; Mobile App Development Company UAE &amp; India</title>'
);

html = html.replace(
  /<meta name="description"[\s\S]*?content=".*?"/i,
  '<meta name="description" content="Pixbit Solutions is a leading web and mobile app development company in Dubai, UAE and Calicut, India specializing in custom software, UI/UX design, ERP, CRM, and AI solutions."'
);

// 2. Navigation Mega Menu & Links
// Ensure Case Studies, Portfolio, Blogs link to dedicated pages or sections
html = html.replace(
  /<li class="nav-item"><a href="#case-studies" class="nav-link">Case Studies<\/a><\/li>/g,
  '<li class="nav-item"><a href="case-studies/index.html" class="nav-link">Case Studies</a></li>'
);

html = html.replace(
  /<li class="nav-item"><a href="#portfolio" class="nav-link">Portfolio<\/a><\/li>/g,
  '<li class="nav-item"><a href="portfolio/index.html" class="nav-link">Portfolio</a></li>'
);

// Add Blogs to nav-right
if (!html.includes('href="blogs/index.html" class="nav-link"')) {
  html = html.replace(
    /<li class="nav-item"><a href="portfolio\/index.html" class="nav-link">Portfolio<\/a><\/li>/,
    '<li class="nav-item"><a href="portfolio/index.html" class="nav-link">Portfolio</a></li>\n          <li class="nav-item"><a href="blogs/index.html" class="nav-link">Blogs</a></li>'
  );
}

// 3. Hero Section
html = html.replace(
  /<div class="hero-trust">.*?<\/div>/s,
  '<div class="hero-trust">Top-Rated Web, Mobile App &amp; AI Development Company</div>'
);

html = html.replace(
  /<h1 class="hero-h1">[\s\S]*?<\/h1>/s,
  `<h1 class="hero-h1">
            WE TURN <span class="accent">IDEAS</span><br>
            INTO DIGITAL<br>
            REALITIES.
          </h1>`
);

html = html.replace(
  /<p class="hero-sub">.*?<\/p>/s,
  '<p class="hero-sub">From custom mobile applications and responsive enterprise websites to AI-driven workflows and scalable ERP/CRM systems, we craft high-impact digital solutions that empower ambitious businesses across the UAE, India, and globally.</p>'
);

// Solutions Banner
html = html.replace(
  /<section class="solutions-banner"[\s\S]*?<\/section>/s,
  `<section class="solutions-banner" aria-labelledby="solutions-banner-title">
    <div class="solutions-banner-content">
      <h2 id="solutions-banner-title">Pixbit Solutions</h2>
      <p>- Flowing with the Future -</p>
    </div>
  </section>`
);

// 4. Stats Section
html = html.replace(
  /<div class="stat-number" data-target="\d+"><span class="counter">0<\/span><span class="plus">\+<\/span><\/div>[\s\S]*?<div class="stat-label">Projects Delivered<\/div>/s,
  '<div class="stat-number" data-target="150"><span class="counter">0</span><span class="plus">+</span></div>\n          <div class="stat-label">Projects Delivered</div>'
);

html = html.replace(
  /<div class="stat-number" data-target="\d+"><span class="counter">0<\/span><span class="plus">\+<\/span><\/div>[\s\S]*?<div class="stat-label">Happy Clients<\/div>/s,
  '<div class="stat-number" data-target="100"><span class="counter">0</span><span class="plus">+</span></div>\n          <div class="stat-label">Happy Clients</div>'
);

html = html.replace(
  /<div class="stat-number" data-target="\d+"><span class="counter">0<\/span><span class="plus">\+<\/span><\/div>[\s\S]*?<div class="stat-label">Countries Served<\/div>/s,
  '<div class="stat-number" data-target="15"><span class="counter">0</span><span class="plus">+</span></div>\n          <div class="stat-label">Countries Served</div>'
);

html = html.replace(
  /<div class="stat-number" data-target="\d+"><span class="counter">0<\/span><span class="plus">\+<\/span><\/div>[\s\S]*?<div class="stat-label">Years Experience<\/div>/s,
  '<div class="stat-number" data-target="10"><span class="counter">0</span><span class="plus">+</span></div>\n          <div class="stat-label">Years of Innovation</div>'
);

// 5. About Section
html = html.replace(
  /<div class="about-text reveal">[\s\S]*?<\/div>\s*<div class="about-visual/s,
  `<div class="about-text reveal">
          <div class="eyebrow">About Pixbit Solutions</div>
          <h2>FLOWING WITH<br>THE FUTURE</h2>
          <p>Founded in 2014, Pixbit Solutions draws its name from the two fundamental building blocks of design and technology—the pixel and the bit. This philosophy defines our commitment: delivering top-quality, detail-oriented digital experiences by blending striking UI/UX design with flawless software execution.</p>
          <p>With operational headquarters in Dubai Silicon Oasis (UAE) and Govt. Cyberpark, Kozhikode (India), we partner with enterprises and fast-growing brands across the Middle East, India, and internationally to engineer transformative digital products.</p>
          <div class="about-tags">
            <span class="about-tag">Mobile Apps</span>
            <span class="about-tag">Web Platforms</span>
            <span class="about-tag">UI/UX Design</span>
            <span class="about-tag">Custom CRM &amp; ERP</span>
            <span class="about-tag">AI Solutions</span>
            <span class="about-tag">Cloud Engineering</span>
          </div>
          <a href="company/about-us.html" class="btn btn-dark">
            Discover Pixbit Solutions
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div class="about-visual`
);

// 6. Case Studies Section - Real Pixbit Case Studies
const csReplacement = `<!-- ------------------- CASE STUDIES ------------------- -->
  <section id="case-studies" class="section-pad" aria-label="Case studies">
    <div class="container">
      <div class="sh reveal">
        <div class="eyebrow" style="color:var(--baby-blue)">Case Studies</div>
        <h2 class="light">PROVEN OUTCOMES</h2>
        <p class="sub light">Real client challenges solved through tailored engineering.</p>
      </div>
      <div class="cs-slider-wrap">
        <ul class="cs-slider" id="cs-slider" aria-label="Case studies">

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#0d1f3c,#2A4D77);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">01</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">PropTech / App</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Real Estate &amp; Housing</div>
              <h3 class="cs-title">Smart Dorm Booking Mobile App</h3>
              <div class="cs-services">App Development / UI/UX / Real-Time Availability</div>
              <p class="cs-desc">A specialized student housing booking application with virtual suite tours, roommate matching algorithms, automated lease signing, and online rent payments.</p>
              <a href="case-studies/smart-dorm-booking-app.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#0a1628,#2d5a8e);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">02</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">Enterprise / PropTech</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Real Estate Management</div>
              <h3 class="cs-title">Unified Property Management Solution</h3>
              <div class="cs-services">App Dev / UI/UX / Web Development / Custom CRM</div>
              <p class="cs-desc">An all-in-one property management ecosystem consolidating unit listings, tenant KYC, Ejari/DLD workflows, maintenance ticketing, and automated financial reconciliations.</p>
              <a href="case-studies/unified-property-management.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#071a30,#0f4880);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">03</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">Fintech</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Banking &amp; Digital Payments</div>
              <h3 class="cs-title">Unified Financial Management Platform</h3>
              <div class="cs-services">App Dev / UI/UX / Security Architecture</div>
              <p class="cs-desc">A highly secure financial management and digital wallet platform offering multi-currency accounting, biometric user authentication, and compliant cross-border transfers.</p>
              <a href="case-studies/unified-financial-platform.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#041220,#1460a0);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">04</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">CleanTech / IoT</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Electric Mobility</div>
              <h3 class="cs-title">Innovative EV Charging Mobile App</h3>
              <div class="cs-services">App Development / IoT Telemetry / Smart Billing</div>
              <p class="cs-desc">A next-generation electric vehicle charging application connecting EV drivers with real-time station availability, navigation, automated queueing, and frictionless in-app charging payments.</p>
              <a href="case-studies/ev-charging-app.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#060e1c,#163d6a);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">05</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">E-Commerce</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Retail &amp; Gifting (Cakiyo)</div>
              <h3 class="cs-title">Smart Online Gifting Platform</h3>
              <div class="cs-services">App Dev / UI/UX / Web Development</div>
              <p class="cs-desc">A bespoke luxury gifting marketplace featuring interactive custom hamper builders, date-scheduled courier dispatches, and multi-currency localized checkout funnels.</p>
              <a href="case-studies/smart-online-gifting-platform.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

          <li class="cs-card">
            <div class="cs-img">
              <div class="cs-img-bg" style="background: linear-gradient(135deg,#050d1a,#1254a0);">
                <div class="cs-img-pattern"></div>
                <div class="cs-num-big" aria-hidden="true">06</div>
                <div class="cs-img-overlay"></div>
              </div>
              <div class="cs-img-label">Healthcare</div>
            </div>
            <div class="cs-body">
              <div class="cs-industry">Cosmetics &amp; Aesthetics (Dermazone)</div>
              <h3 class="cs-title">Digital Makeover of a Cosmetics Clinic</h3>
              <div class="cs-services">UI/UX / Web Development / Clinic CRM</div>
              <p class="cs-desc">End-to-end digital transformation for Dermazone cosmetic centers, integrating online doctor consultations, treatment packages, automated appointment scheduling, and patient history.</p>
              <a href="case-studies/cosmetics-clinic-digital-makeover.html" class="cs-cta">Read Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
            </div>
          </li>

        </ul>
      </div>`;

html = html.replace(
  /<!-- ------------------- CASE STUDIES ------------------- -->[\s\S]*?<div class="cs-controls">/s,
  csReplacement + '\n      <div class="cs-controls">'
);

// 7. Testimonials Section
const testiReplacement = `<!-- ------------------- TESTIMONIALS ------------------- -->
  <section id="testimonials" class="section-pad" aria-label="Client feedback">
    <div class="container">
      <div class="sh reveal" style="text-align:center;">
        <div class="eyebrow" style="justify-content:center;">Client Testimonials</div>
        <h2>WHAT OUR PARTNERS SAY</h2>
        <p class="sub" style="margin: 16px auto 0;">Trusted by industry leaders across the UAE, Middle East, and India.</p>
      </div>
      <div class="services-grid" style="margin-top: 48px;">
        <article class="service-card reveal">
          <div style="color: #FFC83B; font-size: 1.25rem; margin-bottom: 1rem;">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <p class="sc-desc" style="font-size: 15px; line-height: 1.7; color: var(--neutral-300); margin-bottom: 24px;">
            "The property management and leasing portal developed by Pixbit Solutions transformed our operational efficiency across Dubai. Their technical team understood our complex workflows from day one."
          </p>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <strong style="color: var(--white); display: block; font-size: 15px;">Range International Property Investment</strong>
            <small style="color: var(--baby-blue);">Dubai, UAE</small>
          </div>
        </article>

        <article class="service-card reveal reveal-delay-1">
          <div style="color: #FFC83B; font-size: 1.25rem; margin-bottom: 1rem;">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <p class="sc-desc" style="font-size: 15px; line-height: 1.7; color: var(--neutral-300); margin-bottom: 24px;">
            "Pixbit Solutions executed the complete digital transformation of our cosmetic clinic chain. Our online doctor bookings surged by over 200% within the first 60 days following launch."
          </p>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <strong style="color: var(--white); display: block; font-size: 15px;">Dermazone Aesthetic Clinics</strong>
            <small style="color: var(--baby-blue);">Healthcare &amp; Wellness</small>
          </div>
        </article>

        <article class="service-card reveal reveal-delay-2">
          <div style="color: #FFC83B; font-size: 1.25rem; margin-bottom: 1rem;">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <p class="sc-desc" style="font-size: 15px; line-height: 1.7; color: var(--neutral-300); margin-bottom: 24px;">
            "Developing Cakiyo required complex custom hamper building algorithms and high-speed checkout flows. The Pixbit team exceeded all expectations in both UI/UX elegance and backend scalability."
          </p>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <strong style="color: var(--white); display: block; font-size: 15px;">Cakiyo Online Gifting</strong>
            <small style="color: var(--baby-blue);">E-Commerce &amp; Retail</small>
          </div>
        </article>
      </div>
      <div class="text-center" style="margin-top: 40px; text-align: center;">
        <a href="company/testimonials.html" class="btn btn-outline" style="display: inline-flex;">View All Client Feedback</a>
      </div>
    </div>
  </section>`;

html = html.replace(
  /<!-- ------------------- TESTIMONIALS ------------------- -->[\s\S]*?<!-- ------------------- CTA ------------------- -->/s,
  testiReplacement + '\n\n<!-- ------------------- CTA ------------------- -->'
);

// 8. Contact Section - Office locations
const contactOfficesReplacement = `<div class="office-cards">

            <div class="office-card">
              <div class="office-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg></div>
              <div>
                <div class="office-country">🇦🇪 UAE Office</div>
                <div class="office-details">
                  Pixbit Solutions FZCO<br>
                  IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE<br>
                  +971 58 575 2242<br>
                  contact@pixbitsolutions.com
                </div>
              </div>
            </div>

            <div class="office-card">
              <div class="office-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg></div>
              <div>
                <div class="office-country">🇮🇳 India Office</div>
                <div class="office-details">
                  Pixbit Solutions Pvt. Ltd.<br>
                  Govt. Cyberpark, Kozhikode (Calicut), Kerala, India<br>
                  +91 7560 933 933<br>
                  contact@pixbitsolutions.com
                </div>
              </div>
            </div>
          </div>
          <a href="https://wa.me/971585752242" class="whatsapp-cta" aria-label="Contact on WhatsApp" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp (+971 58 575 2242)
          </a>`;

html = html.replace(
  /<div class="office-cards">[\s\S]*?Chat on WhatsApp\s*<\/a>/s,
  contactOfficesReplacement
);

// 9. Footer updates
html = html.replace(
  /<div class="footer-locations">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="footer-bottom">/s,
  `<div class="footer-locations">
            <div class="footer-country">
              <div class="footer-country-title">UAE Office</div>
              <p>Pixbit Solutions FZCO, IFZA Business Park, Dubai Silicon Oasis, Dubai, UAE</p>
              <a href="tel:+971585752242">+971 58 575 2242</a>
              <a href="mailto:contact@pixbitsolutions.com">contact@pixbitsolutions.com</a>
            </div>
            <div class="footer-country">
              <div class="footer-country-title">India Office</div>
              <p>Pixbit Solutions Pvt. Ltd., Govt. Cyberpark, Kozhikode, Kerala, India</p>
              <a href="tel:+917560933933">+91 7560 933 933</a>
              <a href="mailto:contact@pixbitsolutions.com">contact@pixbitsolutions.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">`
);

// Update footer links to include Case Studies, Portfolio, Blogs
html = html.replace(
  /<ul class="footer-links-list">\s*<li><a href="index\.html">About Us<\/a><\/li>\s*<li><a href="index\.html">Portfolio<\/a><\/li>\s*<li><a href="index\.html">Case Studies<\/a><\/li>\s*<li><a href="index\.html">Blogs<\/a><\/li>\s*<li><a href="contact\.html">Contact Us<\/a><\/li>\s*<\/ul>/s,
  `<ul class="footer-links-list">
                <li><a href="company/about-us.html">About Us</a></li>
                <li><a href="portfolio/index.html">Portfolio</a></li>
                <li><a href="case-studies/index.html">Case Studies</a></li>
                <li><a href="blogs/index.html">Blogs &amp; Insights</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>`
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Homepage pages/index.html content successfully updated to Pixbit Solutions!');
