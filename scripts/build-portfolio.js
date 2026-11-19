// scripts/build-portfolio.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'pages');
const portfolioDir = path.join(baseDir, 'portfolio');
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// Read template from services/web-development.html
const templateFile = path.join(baseDir, 'services', 'web-development.html');
const templateHtml = fs.readFileSync(templateFile, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const footerMarker = '</main>';

let headerPart = templateHtml.slice(0, templateHtml.indexOf(heroMarker));
let footerPart = templateHtml.slice(templateHtml.indexOf(footerMarker));

// Metadata
headerPart = headerPart.replace(/<title>.*?<\/title>/i, `<title>Portfolio &amp; Client Projects | WHYNEX</title>`);
headerPart = headerPart.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="Explore Pixbit Solutions / WHYNEX's portfolio of web platforms, mobile apps, enterprise portals, and UI/UX designs across the UAE, India, and global markets.">`);
headerPart = headerPart.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="https://whynex.com/pages/portfolio/index.html">`);

const projects = [
  {
    name: 'Range International Property Investment',
    cat: 'web',
    catLabel: 'Web & Enterprise',
    industry: 'Real Estate & PropTech',
    desc: 'Comprehensive real estate portal and CRM integration managing multi-million-dollar property portfolios in Dubai with live 3D unit tours and agent lead routing.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    gradient: 'linear-gradient(135deg, #0d1f3c, #1e3a8a)',
    link: '../case-studies/unified-property-management.html'
  },
  {
    name: 'Dermazone Clinics',
    cat: 'mobile',
    catLabel: 'Mobile & HealthTech',
    industry: 'Healthcare & Aesthetics',
    desc: 'Digital clinic makeover and patient mobile booking app with personalized skin treatment plans, digital consultations, and EHR synchronization.',
    tech: ['React Native', 'Laravel', 'HubSpot CRM', 'Stripe'],
    gradient: 'linear-gradient(135deg, #1f1b2e, #4c1d95)',
    link: '../case-studies/cosmetics-clinic-digital-makeover.html'
  },
  {
    name: 'Cakiyo',
    cat: 'web',
    catLabel: 'E-Commerce',
    industry: 'FoodTech & Gifting',
    desc: 'Smart on-demand cake customization and celebration gift delivery platform with real-time 3D cake visualizer and automated bakery routing.',
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tap Payments'],
    gradient: 'linear-gradient(135deg, #2e1065, #701a75)',
    link: '../case-studies/smart-online-gifting-platform.html'
  },
  {
    name: 'My Mortgage',
    cat: 'web',
    catLabel: 'FinTech',
    industry: 'Banking & Finance',
    desc: 'Fintech mortgage comparison engine connecting UAE home buyers with competitive mortgage rates across 20+ partner banks with instant pre-qualification.',
    tech: ['Vue.js', 'Laravel', 'Python OCR', 'AWS KMS'],
    gradient: 'linear-gradient(135deg, #064e3b, #047857)',
    link: '../case-studies/unified-financial-platform.html'
  },
  {
    name: 'VoltCharge Networks',
    cat: 'mobile',
    catLabel: 'Mobile & IoT',
    industry: 'Automotive & CleanTech',
    desc: 'Mobile app and IoT management backend allowing EV drivers to discover available chargers, reserve bays, and initiate charging via OCPP protocols.',
    tech: ['Flutter', 'Node.js WebSockets', 'OCPP 2.0', 'Redis'],
    gradient: 'linear-gradient(135deg, #1e293b, #0f766e)',
    link: '../case-studies/ev-charging-app.html'
  },
  {
    name: 'Student Living Co. (Smart Dorm)',
    cat: 'mobile',
    catLabel: 'Mobile App',
    industry: 'PropTech & Education',
    desc: 'Smart dorm booking app enabling university students to browse beds, take 360-degree virtual tours, sign digital leases, and split utility payments.',
    tech: ['Flutter', 'Dart', 'Laravel', 'Stripe', 'Redis'],
    gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    link: '../case-studies/smart-dorm-booking-app.html'
  },
  {
    name: 'Smash Tours & Travel',
    cat: 'mobile',
    catLabel: 'Mobile App',
    industry: 'Travel & Tourism',
    desc: 'End-to-end travel booking application featuring customized holiday packages, live flight status integration, and automated visa processing workflows.',
    tech: ['Flutter', 'Amadeus API', 'Laravel', 'Payment Gateway'],
    gradient: 'linear-gradient(135deg, #1e3a5f, #0284c7)',
    link: '../contact.html'
  },
  {
    name: 'Roseapp',
    cat: 'mobile',
    catLabel: 'Mobile & E-Commerce',
    industry: 'Retail & On-Demand Delivery',
    desc: 'Luxury floral gifting app featuring bespoke bouquet customization, personalized greeting cards, and live courier tracking across the UAE.',
    tech: ['Swift', 'Kotlin', 'Laravel', 'Apple Pay', 'Google Maps'],
    gradient: 'linear-gradient(135deg, #4c0519, #9f1239)',
    link: '../contact.html'
  },
  {
    name: 'Vellody Lifestyle',
    cat: 'uiux',
    catLabel: 'UI/UX & Branding',
    industry: 'Fashion & Luxury Retail',
    desc: 'Bespoke high-end fashion e-commerce storefront with editorial lookbooks, fluid micro-interactions, and sub-second page transitions.',
    tech: ['Figma', 'Shopify Plus', 'Headless Next.js', 'Tailored UI'],
    gradient: 'linear-gradient(135deg, #1c1917, #44403c)',
    link: '../contact.html'
  },
  {
    name: 'Relybond Industrial',
    cat: 'web',
    catLabel: 'Web Development',
    industry: 'Industrial & Manufacturing',
    desc: 'Multilingual corporate website and digital product catalog for an international industrial adhesives manufacturer with technical datasheet downloads.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Multilingual Arabic/English'],
    gradient: 'linear-gradient(135deg, #172554, #1d4ed8)',
    link: '../contact.html'
  },
  {
    name: 'Syanpro Supply Chain',
    cat: 'web',
    catLabel: 'Enterprise Application',
    industry: 'Logistics & Supply Chain',
    desc: 'Cloud-based B2B supply chain procurement portal with automated inventory alerts, supplier audit scoring, and purchase order reconciliation.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
    gradient: 'linear-gradient(135deg, #14532d, #15803d)',
    link: '../contact.html'
  },
  {
    name: 'Capkon Builders',
    cat: 'web',
    catLabel: 'Web Development',
    industry: 'Architecture & Construction',
    desc: 'Luxury architectural showcase featuring interactive project timelines, drone video galleries, and high-conversion client inquiry funnels.',
    tech: ['WordPress (Custom Theme)', 'JavaScript', 'CSS3 Animation', 'SEO'],
    gradient: 'linear-gradient(135deg, #27272a, #52525b)',
    link: '../contact.html'
  }
];

const cardsHtml = projects.map((p, i) => `
        <div class="pf-card reveal" data-cat="${p.cat}" style="background:#111; border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition: transform 0.3s ease, border-color 0.3s ease;">
          <div style="height:200px; background:${p.gradient}; position:relative; display:flex; align-items:center; justify-content:center; padding:24px;">
            <div style="position:absolute; top:16px; left:20px; font-size:40px; font-weight:900; color:rgba(255,255,255,0.08);">0${i+1}</div>
            <div style="position:absolute; top:16px; right:20px; background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); padding:4px 12px; border-radius:50px; font-size:12px; font-weight:600; color:var(--baby-blue);">${p.catLabel}</div>
            <h4 style="font-size:22px; font-weight:700; color:#fff; text-align:center; z-index:1;">${p.name}</h4>
          </div>
          <div style="padding:28px; display:flex; flex-direction:column; flex:1;">
            <div style="font-size:13px; font-weight:600; color:var(--baby-blue); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">${p.industry}</div>
            <h3 style="font-size:18px; font-weight:700; color:#fff; margin-bottom:12px; line-height:1.4;">${p.name}</h3>
            <p style="font-size:14px; color:rgba(255,255,255,0.65); line-height:1.6; margin-bottom:20px; flex:1;">${p.desc}</p>
            <div style="margin-bottom:20px; display:flex; flex-wrap:wrap; gap:6px;">
              ${p.tech.map(t => `<span style="font-size:11px; background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.8); padding:3px 10px; border-radius:4px;">${t}</span>`).join('')}
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:16px;">
              <a href="${p.link}" class="btn btn-outline" style="font-size:12px; padding:8px 16px; width:100%; justify-content:center; text-align:center;">View Details &rarr;</a>
            </div>
          </div>
        </div>`).join('\n');

const portfolioBody = `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>Portfolio</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">CLIENT SUCCESS &amp; FEATURED WORK</div>
      <h1>Our Portfolio of Digital Work</h1>
      <p>A showcase of enterprise web applications, high-performance mobile apps, digital commerce platforms, and UI/UX design systems crafted for visionary brands across 15+ countries.</p>
    </div>
  </section>

  <!-- Filter & Portfolio Grid Section -->
  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      
      <div class="pf-filters reveal" role="tablist" aria-label="Portfolio filter" style="display:flex; justify-content:center; flex-wrap:wrap; gap:12px; margin-bottom:48px;">
        <button type="button" class="pf-filter active" data-filter="all" style="padding:8px 24px; border-radius:50px; border:1px solid var(--baby-blue); background:var(--baby-blue); color:var(--black); font-weight:600; cursor:pointer; font-size:14px;">All Projects</button>
        <button type="button" class="pf-filter" data-filter="web" style="padding:8px 24px; border-radius:50px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:#fff; font-weight:500; cursor:pointer; font-size:14px;">Web &amp; Enterprise</button>
        <button type="button" class="pf-filter" data-filter="mobile" style="padding:8px 24px; border-radius:50px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:#fff; font-weight:500; cursor:pointer; font-size:14px;">Mobile Apps</button>
        <button type="button" class="pf-filter" data-filter="uiux" style="padding:8px 24px; border-radius:50px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:#fff; font-weight:500; cursor:pointer; font-size:14px;">UI/UX Design</button>
      </div>

      <div class="pf-grid" id="pf-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap:32px;">
${cardsHtml}
      </div>

    </div>
  </section>

  <section class="final-cta reveal">
    <div class="container">
      <h2>Have an Idea for Your Next Digital Product?</h2>
      <p>Let's collaborate to build something impactful, scalable, and beautifully designed.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Start Your Project</a>
        <a href="../contact.html" class="btn btn-outline" style="color:var(--black); border-color:var(--black);">Talk to Our Architects</a>
      </div>
    </div>
  </section>

  <script>
    // Simple instant filter logic
    document.addEventListener('DOMContentLoaded', function() {
      const filterBtns = document.querySelectorAll('.pf-filter');
      const cards = document.querySelectorAll('.pf-card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = '#fff';
            b.style.borderColor = 'rgba(255,255,255,0.15)';
          });
          this.classList.add('active');
          this.style.background = 'var(--baby-blue)';
          this.style.color = 'var(--black)';
          this.style.borderColor = 'var(--baby-blue)';

          const filter = this.getAttribute('data-filter');
          cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-cat') === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    });
  </script>
\n`;

fs.writeFileSync(path.join(portfolioDir, 'index.html'), headerPart + portfolioBody + footerPart, 'utf8');
console.log('Generated Portfolio Page: pages/portfolio/index.html');
