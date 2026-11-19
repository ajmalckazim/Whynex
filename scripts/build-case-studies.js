// scripts/build-case-studies.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'pages');
const caseStudiesDir = path.join(baseDir, 'case-studies');
if (!fs.existsSync(caseStudiesDir)) {
  fs.mkdirSync(caseStudiesDir, { recursive: true });
}

// Read template from services/web-development.html for navbar and footer
const templateFile = path.join(baseDir, 'services', 'web-development.html');
const templateHtml = fs.readFileSync(templateFile, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const footerMarker = '</main>';

const headerPart = templateHtml.slice(0, templateHtml.indexOf(heroMarker));
const footerPart = templateHtml.slice(templateHtml.indexOf(footerMarker));

// Adjust relative paths for case-studies/*.html
// Both are under pages/xxx/ so relative paths like ../index.html, ../../css/site.css, ../../images/footter.png work identically!

const caseStudiesData = [
  {
    slug: 'smart-dorm-booking-app.html',
    title: 'Smart Dorm Booking Mobile App | Case Study | WHYNEX',
    client: 'Student Living Co.',
    industry: 'Real Estate & PropTech',
    serviceTags: 'Mobile App / Flutter / UI/UX / Real-Time Availability',
    h1: 'Revolutionizing Student Dorm Living & Accommodation Booking',
    summary: 'A unified mobile application enabling university students to discover, 3D tour, reserve, and manage student housing contracts with real-time room availability and split billing.',
    stats: [
      { num: '14,000+', label: 'Active Students' },
      { num: '3.4x', label: 'Faster Lease Signings' },
      { num: '99.4%', label: 'On-Time Rent Collection' }
    ],
    challenge: 'Prior to the mobile application, students faced lengthy paper-based leasing processes, lack of live bed availability, and cumbersome monthly rent collection. On-campus managers struggled with administrative overhead and manual maintenance tracking.',
    solution: 'WHYNEX engineered an intuitive Flutter cross-platform mobile application connected to a high-concurrency Laravel backend. Students can browse verified dorm buildings, inspect rooms via 360-degree interactive tours, complete digital KYC, sign leases electronically, and pay rent via credit cards or installment plans. An integrated roommate matching quiz and direct maintenance ticketing portal streamlined tenant communication.',
    techStack: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'Redis', 'AWS S3', 'Stripe Payments', 'Firebase Cloud Messaging'],
    results: [
      'Over 14,000 dorm rooms booked across 8 university campuses in the first academic year.',
      'Average contract completion time reduced from 7 days to under 18 minutes.',
      'Automated recurring payment reminders increased on-time rent collections to 99.4%.'
    ],
    testimonial: {
      quote: "The Smart Dorm app completely transformed our student housing operations. The digital lease signing and in-app maintenance tickets reduced our operational workload by more than 60%.",
      author: "Marcus Vance",
      role: "Director of Operations, Student Living Co."
    }
  },

  {
    slug: 'unified-property-management.html',
    title: 'Enterprise Property Management Platform | Case Study | WHYNEX',
    client: 'Range International Property Investment',
    industry: 'Real Estate & Asset Management',
    serviceTags: 'Enterprise Web Portal / Cloud Architecture / CRM Sync',
    h1: 'Unified Digital Asset & Tenant Management for Dubai Real Estate',
    summary: 'An enterprise cloud platform managing multi-million-dollar property portfolios across Dubai with tenant self-service, automated Ejari synchronization, and financial reporting.',
    stats: [
      { num: '$850M+', label: 'Assets Under Management' },
      { num: '75%', label: 'Reduction in Service Inquiries' },
      { num: '100%', label: 'Ejari Digital Compliance' }
    ],
    challenge: 'Managing over 1,200 commercial and residential units across Dubai required disjointed spreadsheets, physical paperwork, and manual rent reconciliation. Maintenance requests frequently slipped through the cracks, leading to tenant dissatisfaction and renewal delays.',
    solution: 'We engineered a centralized enterprise property management platform that unites property owners, asset managers, and tenants into a single secure ecosystem. The platform automates lease renewals, integrates with Dubai Ejari APIs, provides tenants with a self-service billing portal, and routes maintenance requests to verified contractors with real-time status updates.',
    techStack: ['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS ECS', 'Ejari Integration', 'Tap Payments'],
    results: [
      'Successfully integrated across 1,200+ residential and commercial units with zero downtime.',
      'Tenant service inquiries handled via self-service portal rose to 75%, slashing support phone volume.',
      'Full automation of rent invoices, late payment penalties, and owner dividend distributions.'
    ],
    testimonial: {
      quote: "Pixbit/WHYNEX delivered an enterprise platform that gives us complete visibility across our entire Dubai property portfolio in real time. It is now the backbone of our operations.",
      author: "Farhan Al-Hashemi",
      role: "Managing Director, Range International Property Investment"
    }
  },

  {
    slug: 'unified-financial-platform.html',
    title: 'Fintech Mortgage Advisory Platform | Case Study | WHYNEX',
    client: 'My Mortgage',
    industry: 'FinTech & Banking',
    serviceTags: 'Web Portal / Mortgage Engine / Bank API Integrations',
    h1: 'Digitizing the UAE Home Mortgage Journey',
    summary: 'A sophisticated fintech platform and mortgage comparison engine connecting UAE home buyers with competitive mortgage rates across 20+ partner banks.',
    stats: [
      { num: 'AED 1.2B+', label: 'Mortgage Inquiries' },
      { num: '22', label: 'Integrated UAE Banks' },
      { num: '65%', label: 'Faster Underwriting' }
    ],
    challenge: 'Navigating UAE home mortgage financing traditionally involved visiting multiple bank branches, deciphering opaque fee structures, and handling massive paper documentation. Homebuyers struggled to understand true borrowing costs and pre-qualification eligibility.',
    solution: 'WHYNEX designed and deployed a secure, bank-grade mortgage advisory web application. It features dynamic borrowing power calculators, instant pre-qualification algorithms, live interest rate comparisons from 22 banks, and an encrypted document vault where applicants upload salary certificates and bank statements with automated verification.',
    techStack: ['Vue.js', 'Laravel', 'Python (OCR Engine)', 'PostgreSQL', 'AWS KMS Encryption', 'SendGrid', 'Twilio SMS'],
    results: [
      'Processed over AED 1.2 Billion in verified home financing applications within 12 months.',
      'Reduced average pre-approval turnaround from 14 business days to just 48 hours.',
      'Achieved a 98.6% customer satisfaction score across 3,500+ active UAE applicants.'
    ],
    testimonial: {
      quote: "The mortgage platform engineered by WHYNEX simplified what used to be a frustrating financial process into a clean, transparent digital experience.",
      author: "Samir Khatib",
      role: "Co-Founder & CEO, My Mortgage"
    }
  },

  {
    slug: 'ev-charging-app.html',
    title: 'Smart EV Charging Network App | Case Study | WHYNEX',
    client: 'VoltCharge Networks',
    industry: 'Automotive & CleanTech',
    serviceTags: 'Mobile App / OCPP Protocol / IoT / Payment Wallet',
    h1: 'Powering the Next Generation of Electric Mobility in the GCC',
    summary: 'A mobile application and IoT management backend allowing EV drivers to discover available charging stations, reserve slots, and initiate charging sessions with tap-to-pay.',
    stats: [
      { num: '450+', label: 'Connected EV Stations' },
      { num: '120k+', label: 'Charging Sessions' },
      { num: '4.8 ★', label: 'App Store Rating' }
    ],
    challenge: 'As electric vehicles surge across the UAE, EV owners suffered from unreliable charging station availability, incompatible proprietary RFID cards, and slow charging start times. Station operators required an OCPP-compliant centralized backend to monitor hardware health.',
    solution: 'We engineered a cross-platform mobile application powered by Flutter and an IoT telemetry backend communicating with hardware via OCPP 1.6/2.0 protocols over WebSockets. Drivers can locate nearby fast chargers on interactive vector maps, verify live connector status, reserve charging bays, scan QR codes to initiate power flow, and pay seamlessly via in-app wallet or Apple Pay.',
    techStack: ['Flutter', 'Node.js (WebSockets / OCPP)', 'MongoDB', 'Redis', 'Apple Pay', 'Google Pay', 'Google Maps Platform'],
    results: [
      'Connected more than 450 charging points across Dubai, Abu Dhabi, and Sharjah.',
      'Processed over 120,000 successful charging sessions with 99.8% session reliability.',
      'Awarded top Green Mobility App honors with an average 4.8-star user rating on both app stores.'
    ],
    testimonial: {
      quote: "WHYNEX mastered the complex IoT and OCPP charging protocols flawlessly. Their mobile app has set the gold standard for EV charging UX across the region.",
      author: "Tariq Mansoor",
      role: "VP of Product, VoltCharge Networks"
    }
  },

  {
    slug: 'smart-online-gifting-platform.html',
    title: 'Smart Online Gifting & Delivery Platform | Case Study | WHYNEX',
    client: 'Cakiyo',
    industry: 'E-Commerce & FoodTech',
    serviceTags: 'Web & Mobile / Custom 3D Cake Builder / Logistics Sync',
    h1: 'Delivering Celebrations: The Cakiyo E-Commerce Platform',
    summary: 'A high-converting online cake and gift delivery ecosystem with interactive 3D flavor customization, scheduled celebration deliveries, and vendor dispatch routing.',
    stats: [
      { num: '85,000+', label: 'Gifts Delivered' },
      { num: '42%', label: 'Higher Average Order Value' },
      { num: '99.2%', label: 'On-Time Midnight Delivery' }
    ],
    challenge: 'Perishable gift delivery demands zero room for error. Traditional e-commerce carts could not handle scheduled delivery slots (such as exact midnight surprise deliveries), custom cake flavoring and icing inscriptions, or multi-item florist and bakery order bundling.',
    solution: 'WHYNEX designed and built an omnichannel web and mobile gifting experience. Features include an interactive 3D cake visualizer where users choose shapes, tiers, flavors, and write custom messages; an intelligent calendar slot picker with guaranteed delivery windows; and an automated vendor routing engine that dispatches orders to local artisanal bakeries.',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tap Payments', 'Google Distance Matrix API', 'Twilio'],
    results: [
      'Facilitated over 85,000 celebration deliveries with a 99.2% on-time delivery rate.',
      'Interactive customization increased average order value (AOV) by 42% compared to static catalogs.',
      'Over 60 artisanal bakery partners successfully onboarded onto the automated merchant portal.'
    ],
    testimonial: {
      quote: "Cakiyo went from an idea to the UAE's favorite celebration delivery platform thanks to WHYNEX. Their technical execution on scheduling and order routing is world-class.",
      author: "Nour Al-Sabah",
      role: "Founder, Cakiyo"
    }
  },

  {
    slug: 'cosmetics-clinic-digital-makeover.html',
    title: 'Cosmetics Clinic Digital Makeover | Case Study | WHYNEX',
    client: 'Dermazone Clinics',
    industry: 'Healthcare & Aesthetics',
    serviceTags: 'Web Portal / Patient CRM / Online Booking / SEO',
    h1: 'Elevating Patient Experience for Premier Aesthetics Clinics',
    summary: 'A digital overhaul for a leading dermatology and medical aesthetics clinic, integrating online consultation booking, personalized skin treatment tracking, and local SEO.',
    stats: [
      { num: '+210%', label: 'Online Consultations' },
      { num: '#1 Rank', label: 'Top Dubai Aesthetic Keywords' },
      { num: '4.9 ★', label: 'Patient Experience Score' }
    ],
    challenge: 'Dermazone was held back by an outdated website that failed to reflect their luxury clinic atmosphere. Patient inquiries relied entirely on phone calls, leading to abandoned booking attempts, while organic search visibility lagged behind regional competitors.',
    solution: 'We orchestrated an end-to-end digital transformation: a brand-new responsive web experience exuding luxury and clinical expertise; an intuitive 3-step doctor consultation booking flow with live doctor availability; a private patient portal where clients track before/after results and treatment plans; and an aggressive local SEO campaign targeting high-intent aesthetic procedures.',
    techStack: ['WordPress (Headless)', 'React.js', 'PHP / Laravel', 'HubSpot Healthcare CRM', 'Google Tag Manager', 'Stripe'],
    results: [
      'Grew online consultation appointment bookings by +210% within the first 6 months.',
      'Secured #1 Google organic rankings for high-value search terms including "dermatology clinic Dubai".',
      'Lowered patient acquisition costs by 45% by converting website visitors into confirmed visits.'
    ],
    testimonial: {
      quote: "Our new digital presence finally captures the luxury and medical rigor of Dermazone Clinics. WHYNEX transformed our online booking into our highest-performing revenue stream.",
      author: "Dr. Laila Mansour",
      role: "Medical Director, Dermazone Clinics"
    }
  }
];

// 1. Build Individual Case Study Pages
caseStudiesData.forEach(cs => {
  const metaDesc = `${cs.client} case study: ${cs.summary}`;
  let head = headerPart;
  head = head.replace(/<title>.*?<\/title>/i, `<title>${cs.title}</title>`);
  head = head.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="${metaDesc}">`);
  head = head.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="https://whynex.com/pages/case-studies/${cs.slug}">`);

  const statCards = cs.stats.map(s => `
        <div class="stat-card reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); padding:32px; border-radius:12px; text-align:center;">
          <h3 class="stat-num" style="font-size:42px; font-weight:800; color:var(--baby-blue); margin-bottom:8px;">${s.num}</h3>
          <p class="stat-label" style="font-size:14px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:1px;">${s.label}</p>
        </div>`).join('\n');

  const techBadges = cs.techStack.map(t => `
        <span style="display:inline-block; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#fff; font-size:13px; font-weight:500; padding:6px 16px; border-radius:50px; margin:4px;">${t}</span>`).join('\n');

  const resultsList = cs.results.map(r => `
        <li style="display:flex; align-items:flex-start; gap:12px; margin-bottom:16px; color:rgba(255,255,255,0.85); font-size:16px; line-height:1.6;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--baby-blue)" stroke-width="2.5" style="width:20px; height:20px; min-width:20px; margin-top:3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${r}</span>
        </li>`).join('\n');

  const bodyHtml = `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="index.html">Case Studies</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>${cs.client}</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:20px;">${cs.industry} &bull; ${cs.serviceTags}</div>
      <h1 style="font-size:clamp(2.5rem, 5vw, 3.8rem); line-height:1.15; margin-bottom:24px;">${cs.h1}</h1>
      <p style="font-size:18px; color:rgba(255,255,255,0.8); max-width:850px; margin:0 auto 36px; line-height:1.7;">${cs.summary}</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-primary">Start a Similar Project</a>
        <a href="index.html" class="btn btn-outline">Explore All Case Studies</a>
      </div>
    </div>
  </section>

  <!-- Key Metrics Bar -->
  <section style="padding: 60px 0; background: #070707; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
    <div class="container">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:24px;">
${statCards}
      </div>
    </div>
  </section>

  <!-- Case Study Detailed Narrative -->
  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:64px; align-items:start;">
        
        <div>
          <!-- The Challenge -->
          <div class="reveal" style="margin-bottom: 64px;">
            <div class="eyebrow" style="color:var(--baby-blue); margin-bottom:12px;">01 / THE CHALLENGE</div>
            <h2 style="font-size:32px; font-weight:700; color:#fff; margin-bottom:20px;">The Operational Bottleneck</h2>
            <p style="font-size:16px; color:rgba(255,255,255,0.75); line-height:1.8;">${cs.challenge}</p>
          </div>

          <!-- The Solution -->
          <div class="reveal" style="margin-bottom: 64px;">
            <div class="eyebrow" style="color:var(--baby-blue); margin-bottom:12px;">02 / THE SOLUTION</div>
            <h2 style="font-size:32px; font-weight:700; color:#fff; margin-bottom:20px;">Engineering a Scalable Platform</h2>
            <p style="font-size:16px; color:rgba(255,255,255,0.75); line-height:1.8;">${cs.solution}</p>
          </div>

          <!-- Business Results -->
          <div class="reveal" style="margin-bottom: 64px;">
            <div class="eyebrow" style="color:var(--baby-blue); margin-bottom:12px;">03 / BUSINESS IMPACT</div>
            <h2 style="font-size:32px; font-weight:700; color:#fff; margin-bottom:24px;">Measurable Outcomes</h2>
            <ul style="list-style:none; padding:0; margin:0;">
${resultsList}
            </ul>
          </div>

          <!-- Testimonial -->
          <div class="reveal" style="background:#111; border-left:4px solid var(--baby-blue); padding:32px; border-radius:0 12px 12px 0;">
            <p style="font-size:18px; font-style:italic; color:#fff; line-height:1.7; margin-bottom:16px;">&ldquo;${cs.testimonial.quote}&rdquo;</p>
            <div style="font-weight:700; color:var(--baby-blue);">${cs.testimonial.author}</div>
            <div style="font-size:13px; color:rgba(255,255,255,0.6);">${cs.testimonial.role}</div>
          </div>
        </div>

        <!-- Sidebar Meta -->
        <aside class="reveal" style="position:sticky; top:120px; background:#111; border:1px solid rgba(255,255,255,0.08); padding:36px; border-radius:12px;">
          <h3 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:16px;">Project Snapshot</h3>
          
          <div style="margin-bottom:20px;">
            <div style="font-size:12px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Client</div>
            <div style="font-size:16px; font-weight:600; color:#fff;">${cs.client}</div>
          </div>

          <div style="margin-bottom:20px;">
            <div style="font-size:12px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Industry</div>
            <div style="font-size:16px; font-weight:600; color:#fff;">${cs.industry}</div>
          </div>

          <div style="margin-bottom:28px;">
            <div style="font-size:12px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Technologies Deployed</div>
            <div style="margin-left:-4px;">
${techBadges}
            </div>
          </div>

          <a href="../contact.html" class="btn btn-primary" style="width:100%; justify-content:center; text-align:center;">Discuss Your Project</a>
        </aside>

      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="final-cta reveal">
    <div class="container">
      <h2>Ready to Build Your Own Success Story?</h2>
      <p>Partner with an engineering team that delivers tangible business outcomes on time and within budget.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Get in Touch</a>
        <a href="index.html" class="btn btn-outline" style="color:var(--black); border-color:var(--black);">View More Case Studies</a>
      </div>
    </div>
  </section>
\n`;

  const fullFile = head + bodyHtml + footerPart;
  fs.writeFileSync(path.join(caseStudiesDir, cs.slug), fullFile, 'utf8');
  console.log(`Generated Case Study: pages/case-studies/${cs.slug}`);
});

// 2. Build Case Studies Index Page (pages/case-studies/index.html)
let indexHead = headerPart;
indexHead = indexHead.replace(/<title>.*?<\/title>/i, `<title>Case Studies &amp; Proven Outcomes | WHYNEX</title>`);
indexHead = indexHead.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="Explore real case studies from Pixbit Solutions / WHYNEX showcasing custom web applications, mobile apps, PropTech, FinTech, and enterprise digital solutions.">`);
indexHead = indexHead.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="https://whynex.com/pages/case-studies/index.html">`);

const caseStudyCardsHtml = caseStudiesData.map((cs, i) => `
      <article class="cs-card reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition: transform 0.3s ease, border-color 0.3s ease;">
        <div style="height:220px; background:linear-gradient(135deg, #0d1f3c, #1a365d); position:relative; display:flex; align-items:center; justify-content:center; padding:24px;">
          <div style="position:absolute; top:16px; left:20px; font-size:48px; font-weight:900; color:rgba(255,255,255,0.08);">0${i+1}</div>
          <div style="position:absolute; top:16px; right:20px; background:rgba(0,0,0,0.5); backdrop-filter:blur(8px); padding:4px 12px; border-radius:50px; font-size:12px; font-weight:600; color:var(--baby-blue);">${cs.industry}</div>
          <h4 style="font-size:24px; font-weight:700; color:#fff; text-align:center; z-index:1;">${cs.client}</h4>
        </div>
        <div style="padding:32px; display:flex; flex-direction:column; flex:1;">
          <h3 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:12px; line-height:1.4;"><a href="${cs.slug}" style="color:#fff; text-decoration:none;">${cs.h1}</a></h3>
          <p style="font-size:14px; color:rgba(255,255,255,0.65); line-height:1.6; margin-bottom:24px; flex:1;">${cs.summary}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:20px;">
            <span style="font-size:13px; font-weight:600; color:var(--baby-blue);">${cs.stats[0].num} ${cs.stats[0].label}</span>
            <a href="${cs.slug}" class="btn btn-outline" style="font-size:12px; padding:8px 16px;">View Case Study &rarr;</a>
          </div>
        </div>
      </article>`).join('\n');

const indexBody = `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>Case Studies</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">PROVEN OUTCOMES &amp; DELIVERABLES</div>
      <h1>Real-World Case Studies</h1>
      <p>Discover how we solve complex business problems, architect resilient software, and deliver measurable revenue impact for clients across the UAE, India, and globally.</p>
    </div>
  </section>

  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap:32px;">
${caseStudyCardsHtml}
      </div>
    </div>
  </section>

  <section class="final-cta reveal">
    <div class="container">
      <h2>Have a Project That Demands Excellence?</h2>
      <p>Talk with our senior engineering architects and explore what we can build together.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Start Your Project</a>
        <a href="../contact.html" class="btn btn-outline" style="color:var(--black); border-color:var(--black);">Schedule a Consultation</a>
      </div>
    </div>
  </section>
\n`;

fs.writeFileSync(path.join(caseStudiesDir, 'index.html'), indexHead + indexBody + footerPart, 'utf8');
console.log('Generated Case Studies Index: pages/case-studies/index.html');
