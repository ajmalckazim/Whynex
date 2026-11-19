// scripts/build-all-services.js
const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'pages', 'services');
const templateFile = path.join(servicesDir, 'web-development.html');
const templateHtml = fs.readFileSync(templateFile, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const faqScriptMarker = '<script defer src="../../js/faq.js">';

const startIndex = templateHtml.indexOf(heroMarker);
const endIndex = templateHtml.indexOf(faqScriptMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers in template file!');
  process.exit(1);
}

const headerPart = templateHtml.slice(0, startIndex);
const footerPart = templateHtml.slice(endIndex);

function generateServiceBody(data) {
  const chalHtml = data.challenges.map(c => `
        <div class="chal-card reveal">
          <div class="chal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h4>${c.title}</h4>
          <p style="font-size:14px; color:var(--neutral-600); line-height:1.6;">${c.desc}</p>
        </div>`).join('\n');

  const solHtml = data.solutions.map(s => `
        <div class="sol-card reveal">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>`).join('\n');

  const deliverHtml = data.deliverables.map(d => `
        <div class="chal-card reveal" style="border: 1px solid rgba(255,255,255,0.08); background: #111;">
          <div class="chal-icon" style="background: rgba(135,206,250,0.1); color: var(--baby-blue);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 style="color:#fff;">${d.title}</h4>
          <p style="font-size:14px; color:rgba(255,255,255,0.6); line-height:1.6;">${d.desc}</p>
        </div>`).join('\n');

  const faqHtml = data.faqs.map((f, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <div class="faq-q">
            ${f.q}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div class="faq-a">${f.a}</div>
        </div>`).join('\n');

  return `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="../index.html#services">Services</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>${data.name}</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">${data.eyebrow}</div>
      <h1>${data.h1}</h1>
      <p>${data.heroLead}</p>
      <div class="cta-btns">
        <a href="#solutions" class="btn btn-primary">View Solutions</a>
        <a href="../contact.html" class="btn btn-outline">Discuss Your Project</a>
      </div>
    </div>
  </section>

  <section class="intro-section">
    <div class="container">
      <div class="intro-grid">
        <div class="intro-img reveal">
          <img src="${data.img}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" loading="lazy">
        </div>
        <div class="intro-content reveal">
          <div class="sh" style="margin-bottom:0;">
            <div class="eyebrow">${data.introEyebrow}</div>
            <h2>${data.introH2}</h2>
            <p style="margin-top:24px;">${data.introP1}</p>
            <p>${data.introP2}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="challenges-section">
    <div class="container">
      <div class="sh text-center reveal">
        <div class="eyebrow">The Challenges</div>
        <h2>Challenges We Solve</h2>
      </div>
      <div class="chal-grid">
${chalHtml}
      </div>
    </div>
  </section>

  <section id="solutions" class="solutions-section">
    <div class="container">
      <div class="sh reveal">
        <div class="eyebrow">Capabilities</div>
        <h2>${data.solutionsH2}</h2>
        <p class="sub">${data.solutionsSub}</p>
      </div>
      <div class="sol-grid">
${solHtml}
      </div>
    </div>
  </section>

  <section class="services-section">
    <div class="container">
      <div class="sh reveal text-center">
        <div class="eyebrow" style="color:rgba(255,255,255,0.6)">Key Deliverables</div>
        <h2 class="light">Enterprise Quality Standards</h2>
      </div>
      <div class="chal-grid" style="margin-top: 48px;">
${deliverHtml}
      </div>
    </div>
  </section>

  <section class="faq-section">
    <div class="container">
      <div class="sh text-center reveal">
        <div class="eyebrow">FAQ</div>
        <h2>Common Questions</h2>
      </div>
      <div class="faq-acc reveal">
${faqHtml}
      </div>
    </div>
  </section>

  <section class="final-cta reveal">
    <div class="container">
      <h2>Let's Build Your Next Digital Product</h2>
      <p>Have an ambitious project, idea, or digital transformation need? Let's turn it into a high-performance reality.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Start Your Project</a>
        <a href="../contact.html" class="btn btn-outline"
          style="color:var(--black); border-color:var(--black);">Talk to Our Team</a>
      </div>
    </div>
  </section>
\n`;
}

// Service Definitions
const services = {
  'web-development.html': {
    name: 'Web Development',
    title: 'Web Development Services | WHYNEX',
    metaDesc: 'Pixbit Solutions delivers custom web applications, enterprise portals, and SaaS platforms engineered for high performance, intuitive UX, and seamless scalability.',
    canonical: 'https://whynex.com/pages/services/web-development.html',
    eyebrow: 'Web Development Company UAE & India',
    h1: 'Custom Web Application & Enterprise Portal Development',
    heroLead: 'Engineered for high performance, intuitive UX, and seamless scalability. We build bespoke web platforms, SaaS applications, and enterprise systems using modern full-stack architectures.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    introEyebrow: 'Modern Web Engineering',
    introH2: 'Building Scalable Web Platforms for the Digital Era',
    introP1: 'Pixbit Solutions specializes in developing robust, scalable, and responsive web applications tailored to your business operations. Our engineering team leverages Laravel, React, Next.js, Node.js, and cloud-native infrastructure to build platforms that handle enterprise-scale workloads while delivering sub-second response times.',
    introP2: 'From multi-tenant SaaS platforms to customer self-service portals and workflow automation tools, we convert complex business logic into effortless web experiences with uncompromising security and reliability.',
    challenges: [
      { title: 'Slow Performance & High Latency', desc: 'Eliminating database bottlenecks, unoptimized assets, and caching flaws to deliver 90+ Google Core Web Vitals.' },
      { title: 'Brittle Legacy Code & Technical Debt', desc: 'Modernizing outdated monolithic applications into clean, modular, and maintainable services without business disruption.' },
      { title: 'Complex System Integrations', desc: 'Seamlessly connecting payment gateways, ERPs, CRMs, and third-party APIs with resilient error handling and real-time syncing.' },
      { title: 'Cross-Device Responsiveness', desc: 'Delivering pixel-perfect, responsive layouts that function flawlessly across every mobile, tablet, and desktop browser engine.' },
      { title: 'Security & Compliance Vulnerabilities', desc: 'Implementing strict OWASP Top 10 safeguards, automated vulnerability scanning, SSL encryption, and data protection.' },
      { title: 'Unpredictable Traffic Surges', desc: 'Architecting auto-scaling serverless and containerized cloud setups on AWS/GCP to withstand massive traffic spikes effortlessly.' }
    ],
    solutionsH2: 'Tailored Web Engineering Solutions',
    solutionsSub: 'High-performance web applications built with cutting-edge frameworks, modular architectures, and scalable cloud deployments.',
    solutions: [
      { title: 'Bespoke Web Application Development', desc: 'Custom-built web platforms engineered specifically for your proprietary business logic, operational workflows, and data pipelines.' },
      { title: 'Enterprise Web Portals & Intranets', desc: 'Secure internal portals, supplier networks, and client dashboards featuring role-based access control and live data analytics.' },
      { title: 'Progressive Web Applications (PWAs)', desc: 'Fast, installable, offline-capable web applications delivering native mobile-like responsiveness without app store gatekeepers.' },
      { title: 'RESTful & GraphQL API Architecture', desc: 'Scalable, documented, and secure backend microservices powering web frontends, mobile applications, and partner integrations.' },
      { title: 'SaaS Platform Engineering', desc: 'Multi-tenant cloud software with subscription billing, self-service onboarding, tenant isolation, and automated usage metering.' },
      { title: 'Headless CMS & Content Hubs', desc: 'High-speed decoupled content management systems giving marketing teams complete publishing agility without developer dependency.' }
    ],
    deliverables: [
      { title: 'Full-Stack Modern Stack', desc: 'Clean, modular codebase built in Laravel, Node.js, Python, React, or Next.js with comprehensive test coverage.' },
      { title: 'Interactive UI/UX Design System', desc: 'Responsive, accessible design system with atomic components tested across major screen resolutions.' },
      { title: 'Comprehensive API Documentation', desc: 'Swagger and Postman collections documenting every endpoint, payload schema, and authentication requirement.' },
      { title: 'Automated CI/CD Pipelines', desc: 'Zero-downtime automated deployment pipelines with continuous automated testing and staging environments.' },
      { title: 'Rigorous Security & QA Testing', desc: 'Automated unit tests, integration tests, penetration testing, and vulnerability scans before every release.' },
      { title: '24/7 SLA & Cloud Monitoring', desc: 'Real-time telemetry, automated error alerting, daily database backups, and guaranteed uptime SLAs.' }
    ],
    faqs: [
      { q: 'Which technology stacks do you recommend for enterprise web development?', a: 'We select tech stacks tailored to project requirements, commonly pairing Laravel, Node.js, or Python on the backend with React.js, Next.js, or Vue.js on the frontend, backed by PostgreSQL/MySQL and AWS/GCP infrastructure.' },
      { q: 'How do you ensure data security in web applications?', a: 'We follow strict OWASP security guidelines, implement encrypted data transmission (TLS/HTTPS), encrypted storage (AES-256), robust role-based authentication, and automated dependency vulnerability checks.' },
      { q: 'Can you modernize or rebuild our existing legacy web application?', a: 'Yes, we frequently migrate legacy PHP, ASP.NET, or dated frameworks into modern microservices or decoupled frontend architectures with zero business downtime.' },
      { q: 'Do you provide post-launch maintenance and technical support?', a: 'Absolutely. We offer comprehensive SLA-backed maintenance packages covering server monitoring, security patching, performance optimization, and continuous feature enhancements.' }
    ]
  },

  'mobile-application.html': {
    name: 'Mobile Application',
    title: 'Mobile App Development Services | WHYNEX',
    metaDesc: 'Top mobile app development company building native iOS, Android, and Flutter cross-platform applications with fluid UI, offline sync, and enterprise reliability.',
    canonical: 'https://whynex.com/pages/services/mobile-application.html',
    eyebrow: 'Mobile App Development UAE & India',
    h1: 'Native & Cross-Platform Mobile Application Development',
    heroLead: 'Turning ideas into captivating iOS and Android mobile experiences. From intuitive consumer apps to mission-critical enterprise mobility solutions with real-time sync and offline capability.',
    img: '../../images/mobile-app-showcase.jpg',
    introEyebrow: 'Mobile App Excellence',
    introH2: 'Creating Apps That Users Love & Businesses Rely On',
    introP1: 'Pixbit Solutions builds high-performance mobile applications that users love and businesses depend on. Whether building native applications in Swift and Kotlin or cross-platform solutions using Flutter and React Native, our mobile engineering practices ensure fluid 60fps animations, intuitive navigation, and reliable background synchronization.',
    introP2: 'We handle the complete lifecycle from ideation and UX prototyping to App Store and Google Play publication and ongoing maintenance, delivering apps that consistently achieve 4.8+ star ratings.',
    challenges: [
      { title: 'Device & Platform Fragmentation', desc: 'Writing cohesive Flutter/React Native codebases or optimized native modules ensuring consistent behavior across diverse device ecosystems.' },
      { title: 'Offline Synchronization & Latency', desc: 'Engineering local SQLite/Realm data caching with smart conflict resolution so users can work offline without losing progress.' },
      { title: 'Excessive Battery & Memory Drain', desc: 'Profiling execution threads, memory leaks, and background services to maximize performance without draining battery life.' },
      { title: 'Complex App Store Approvals', desc: 'Ensuring full compliance with Apple App Store Review Guidelines and Google Play Developer Policies for rapid first-pass approvals.' },
      { title: 'Hardware & Sensor Integration', desc: 'Seamlessly connecting Bluetooth LE, GPS geolocation, biometric authentication (Face ID/Fingerprint), and push notifications.' },
      { title: 'App Security & Reverse Engineering', desc: 'Implementing code obfuscation, SSL pinning, secure keychain storage, and biometric verification to protect sensitive user data.' }
    ],
    solutionsH2: 'Full-Spectrum Mobile App Capabilities',
    solutionsSub: 'Tailored mobile engineering across iOS, Android, Flutter, and IoT-connected ecosystems.',
    solutions: [
      { title: 'iOS App Development (Swift / SwiftUI)', desc: 'Native iOS apps optimized for iPhone, iPad, and Apple Watch, taking full advantage of iOS SDK features and Apple human interface guidelines.' },
      { title: 'Android App Development (Kotlin / Jetpack)', desc: 'High-performance native Android apps built with modern Jetpack architecture components and Material You design standards.' },
      { title: 'Cross-Platform Development (Flutter / React Native)', desc: 'Single-codebase mobile applications that achieve near-native performance while cutting development time and maintenance costs by up to 40%.' },
      { title: 'Enterprise Mobility Solutions', desc: 'Secure internal workforce apps, field service tracking tools, and executive dashboard apps integrated with corporate backends.' },
      { title: 'IoT & Connected Device Applications', desc: 'Mobile controllers for smart hardware, wearables, and industrial equipment using BLE, MQTT, and WebSockets.' },
      { title: 'App Store Optimization & Release Management', desc: 'End-to-end store deployment, visual asset preparation, metadata optimization, and staged rollout management.' }
    ],
    deliverables: [
      { title: 'Native & Flutter Source Code', desc: 'Clean, well-documented codebase following MVVM/Clean Architecture patterns with high test coverage.' },
      { title: 'Interactive Figma Prototypes', desc: 'Clickable mobile UI/UX prototypes tested with real users before writing a single line of code.' },
      { title: 'Guaranteed Store Approval', desc: 'End-to-end management of Apple App Store and Google Play Store submission, compliance, and launch.' },
      { title: 'Crash Analytics & Telemetry', desc: 'Integrated Firebase Crashlytics, performance monitoring, and real-time user event tracking.' },
      { title: 'Offline-First Data Architecture', desc: 'Robust local caching and synchronization architecture ensuring 100% functionality without internet connection.' },
      { title: 'Annual OS Compatibility Updates', desc: 'Guaranteed updates for major annual iOS and Android operating system upgrades and new device dimensions.' }
    ],
    faqs: [
      { q: 'Should I build a native or cross-platform mobile application?', a: 'If your app requires heavy 3D graphics, low-level hardware access, or platform-specific UI conventions, native Swift/Kotlin is ideal. For most business and consumer applications, Flutter offers 95% native performance with 40% faster time-to-market.' },
      { q: 'How long does it take to develop a custom mobile app?', a: 'A typical MVP app takes between 8 to 14 weeks depending on scope, while complex enterprise platforms with multiple user roles and backend integrations can take 4 to 6 months.' },
      { q: 'Who owns the source code and IP of the mobile app?', a: 'You maintain 100% full ownership of the source code, design assets, and all intellectual property upon project completion.' },
      { q: 'How do you handle ongoing app store updates and OS upgrades?', a: 'We provide active support contracts to update your app for newly released iOS and Android OS versions, API deprecations, and device screen dimensions.' }
    ]
  },

  'ui-ux-design.html': {
    name: 'UI/UX Design',
    title: 'UI/UX Design Services | WHYNEX',
    metaDesc: 'Award-winning UI/UX design agency delivering intuitive user research, Figma design systems, wireframing, and interactive prototyping for web and mobile products.',
    canonical: 'https://whynex.com/pages/services/ui-ux-design.html',
    eyebrow: 'UI/UX Design Studio UAE & India',
    h1: 'Human-Centric Digital Product & Interface Design',
    heroLead: 'Crafting intuitive digital experiences that simplify complexity, delight users, and drive measurable business conversions through research-backed UI/UX design.',
    img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    introEyebrow: 'Design Philosophy',
    introH2: 'Where Form Meets Function and Drives Measurable Results',
    introP1: 'Great design is not just how it looks; it is how it works. Pixbit Solutions designs digital interfaces that harmonize aesthetic elegance with functional clarity. Rooted in deep user research, behavioral psychology, and rapid prototyping, our design team builds cohesive design systems that elevate your brand and empower users to accomplish their goals effortlessly.',
    introP2: 'Whether crafting an enterprise SaaS dashboard, a consumer mobile app, or an e-commerce platform, we ground every decision in user data and accessibility standards.',
    challenges: [
      { title: 'High User Drop-Off & Churn', desc: 'Identifying and eliminating confusing navigation and friction points that cause users to abandon onboarding or transactions.' },
      { title: 'Inconsistent Visual Branding', desc: 'Unifying fragmented multi-platform experiences into a centralized design system with reusable atomic components.' },
      { title: 'Complex Data Visualization', desc: 'Translating dense, complex enterprise metrics into clean, digestible charts and actionable dashboard interfaces.' },
      { title: 'Accessibility Compliance (WCAG)', desc: 'Designing inclusive digital experiences adhering to strict WCAG 2.1 AA accessibility and contrast standards.' },
      { title: 'Slow Design-to-Code Handoff', desc: 'Bridging the designer-developer gap with clean Figma component specs, design tokens, and interactive guidelines.' },
      { title: 'Low Feature Adoption', desc: 'Redesigning user workflows to highlight core value propositions and guide users toward aha-moments faster.' }
    ],
    solutionsH2: 'End-to-End UI/UX Design Services',
    solutionsSub: 'From foundational discovery and wireframing to high-fidelity design systems and micro-interactions.',
    solutions: [
      { title: 'UX Research & User Journey Mapping', desc: 'Conducting user interviews, competitive benchmarking, persona creation, and empathy mapping to define core user workflows.' },
      { title: 'Information Architecture & Wireframing', desc: 'Structuring intuitive content hierarchies, user navigation paths, and low-fidelity wireframes that clarify screen flows.' },
      { title: 'Interactive Figma Prototyping', desc: 'Building high-fidelity clickable prototypes that look, feel, and behave like the finished application for stakeholder validation.' },
      { title: 'Scalable Design Systems', desc: 'Creating comprehensive component libraries with typography scales, color palettes, spacing rules, and design tokens in Figma.' },
      { title: 'Mobile App & Web UI Design', desc: 'Crafting modern, visually stunning user interfaces optimized for thumb-friendly mobile interaction and responsive desktop viewing.' },
      { title: 'Usability Testing & CRO Audits', desc: 'Validating design prototypes through moderated user testing sessions, heatmaps, and conversion rate optimization audits.' }
    ],
    deliverables: [
      { title: 'Complete Figma Design Files', desc: 'Organized Figma workspaces with autolayout components, variants, variables, and responsive breakpoints.' },
      { title: 'Design Token Repository', desc: 'Centralized JSON design tokens for colors, typography, shadows, and radii ready for frontend implementation.' },
      { title: 'User Persona & Journey Maps', desc: 'Detailed user persona profiles, scenario walk-throughs, and step-by-step customer journey blueprints.' },
      { title: 'Interactive Clickable Prototype', desc: 'Full-flow clickable prototype suitable for user testing, executive sign-off, and investor demonstrations.' },
      { title: 'Developer Handoff Guide', desc: 'Pixel-accurate specs, interaction notes, asset exports (SVG/WebP), and micro-animation guidelines.' },
      { title: 'Design System Governance', desc: 'Documentation on component contribution, versioning, and guidelines for maintaining design consistency.' }
    ],
    faqs: [
      { q: 'What design tools does your team use?', a: 'Our primary design tool is Figma for all wireframing, high-fidelity UI design, component systems, and prototyping. We also utilize FigJam for user journey mapping and Adobe Creative Suite for specialized graphics and 3D illustrations.' },
      { q: 'How long does a typical UI/UX design phase take?', a: 'A standard web application or mobile app design phase typically spans 4 to 8 weeks, covering discovery, wireframes, user testing, high-fidelity mockups, and final developer handoff.' },
      { q: 'Do you conduct user testing during the design process?', a: 'Yes, we conduct qualitative user testing using clickable Figma prototypes with representative users to validate navigation intuitiveness and task completion speed before engineering begins.' },
      { q: 'Can you work with our existing engineering team?', a: 'Absolutely. We partner closely with internal development teams, providing detailed Figma specs, design tokens, and weekly design-tech syncs to ensure flawless frontend implementation.' }
    ]
  },

  'e-commerce.html': {
    name: 'E-Commerce',
    title: 'E-Commerce Development Services | WHYNEX',
    metaDesc: 'Leading e-commerce development agency building custom storefronts, multi-vendor marketplaces, and headless commerce platforms with seamless regional payment gateways.',
    canonical: 'https://whynex.com/pages/services/e-commerce.html',
    eyebrow: 'E-Commerce Solutions UAE & India',
    h1: 'Scalable E-Commerce Platforms & Online Marketplaces',
    heroLead: 'Engineering high-converting, omnichannel e-commerce experiences with seamless checkout flows, multi-currency support, and automated inventory sync.',
    img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&q=80',
    introEyebrow: 'Omnichannel Commerce',
    introH2: 'Transforming Browsers into Buyers with Modern Commerce',
    introP1: 'Pixbit Solutions builds robust e-commerce solutions that convert casual visitors into loyal brand advocates. From headless storefronts and custom Shopify/WooCommerce architectures to multi-vendor marketplaces and B2B wholesale portals, we engineer digital shopping experiences that handle peak flash-sale traffic and streamline fulfillment.',
    introP2: 'We specialize in integrating Middle Eastern and international payment gateways (Tap, Tamara, Tabby, Stripe, Checkout.com) alongside real-time ERP, warehouse, and shipping courier synchronization.',
    challenges: [
      { title: 'Checkout Friction & Cart Abandonment', desc: 'Streamlining checkout steps and introducing one-click local payment methods to slash abandoned cart rates.' },
      { title: 'Slow Page Speeds Hurting Conversions', desc: 'Deploying headless frontend architectures and CDN asset caching to achieve sub-second product page load times.' },
      { title: 'Multi-Warehouse Inventory Desync', desc: 'Building bi-directional integrations that update stock levels in real time across online stores, brick-and-mortar POS, and ERPs.' },
      { title: 'GCC Regional Payment Integration', desc: 'Seamlessly enabling Apple Pay, Mada, KNET, Tabby, Tamara Buy-Now-Pay-Later (BNPL), and credit cards.' },
      { title: 'Complex B2B Wholesale Pricing', desc: 'Configuring tiered pricing, custom credit terms, quote generation, and minimum order quantities for B2B buyers.' },
      { title: 'Peak Traffic Server Crashes', desc: 'Architecting cloud auto-scaling infrastructure that effortlessly handles 10x traffic spikes during Black Friday and Ramadan sales.' }
    ],
    solutionsH2: 'Enterprise E-Commerce Capabilities',
    solutionsSub: 'High-converting online stores, multi-vendor marketplaces, and headless commerce architectures.',
    solutions: [
      { title: 'Custom E-Commerce Storefronts', desc: 'Bespoke shopping platforms built on modern frameworks tailored precisely to your brand aesthetics and product catalog complexities.' },
      { title: 'Multi-Vendor Marketplaces', desc: 'Feature-rich marketplace platforms with vendor onboarding, commission splitting, separate vendor dashboards, and automated payouts.' },
      { title: 'Headless Commerce Architecture', desc: 'Decoupled frontends (Next.js) powered by commerce backends (Shopify Plus, Commerce layer, Magento) for maximum speed and agility.' },
      { title: 'B2B Wholesale Commerce Portals', desc: 'Enterprise portals supporting custom catalog pricing, bulk reordering, purchase order workflows, and company account hierarchies.' },
      { title: 'Payment & BNPL Gateway Integrations', desc: 'Turnkey integrations with Stripe, Tap, Checkout.com, Telr, HyperPay, and Buy-Now-Pay-Later providers Tabby and Tamara.' },
      { title: 'Omnichannel ERP & Courier Sync', desc: 'Direct API connections to SAP, Oracle, Zoho, Odoo, and shipping couriers including Aramex, DHL, and FedEx.' }
    ],
    deliverables: [
      { title: 'High-Converting Storefront', desc: 'Responsive, lightning-fast storefront with frictionless checkout, wishlists, and smart product search.' },
      { title: 'Integrated Payment Gateway Suite', desc: 'PCI-DSS compliant payment processing supporting credit cards, Apple Pay, Google Pay, and BNPL.' },
      { title: 'Automated Shipping & Tracking', desc: 'Automated courier label generation, live shipping rate calculation, and SMS/WhatsApp delivery updates.' },
      { title: 'Inventory & Order Dashboard', desc: 'Intuitive administrative dashboard for managing orders, stock alerts, discounts, and customer lifetime value.' },
      { title: 'Search Engine & Schema Setup', desc: 'Rich product snippets, breadcrumb schemas, open-graph tags, and dynamic sitemaps for maximum Google visibility.' },
      { title: 'Security & Backup Redundancy', desc: 'Daily automated database snapshots, fraud detection rules, and automated SSL certificate renewals.' }
    ],
    faqs: [
      { q: 'Which payment gateways do you integrate for UAE and GCC markets?', a: 'We regularly integrate all prominent GCC payment processors including Tap Payments, Checkout.com, Stripe, HyperPay, Telr, and Buy-Now-Pay-Later providers Tabby and Tamara, alongside Apple Pay and Google Pay.' },
      { q: 'Can you migrate our existing store from WooCommerce or Magento without losing data?', a: 'Yes. We perform complete data migrations including customer accounts, order history, product variants, and SEO URLs with 301 redirects to ensure zero loss in search engine rankings.' },
      { q: 'What is Headless Commerce and should we use it?', a: 'Headless commerce separates the frontend presentation layer (e.g., built in Next.js) from the backend commerce engine. It provides ultra-fast sub-second load times, limitless design flexibility, and improved conversion rates for high-growth brands.' },
      { q: 'Do you build custom mobile apps for e-commerce stores?', a: 'Yes, we engineer native iOS and Android mobile shopping apps in Flutter that synchronize seamlessly with your web store catalog, inventory, and user profiles.' }
    ]
  },

  'search-engine-optimization.html': {
    name: 'Search Engine Optimization (SEO)',
    title: 'Search Engine Optimization (SEO) Services | WHYNEX',
    metaDesc: 'Award-winning SEO company in UAE and India specializing in technical SEO, Core Web Vitals, local SEO for Dubai/GCC, high-authority link building, and content strategy.',
    canonical: 'https://whynex.com/pages/services/search-engine-optimization.html',
    eyebrow: 'SEO Agency UAE & India',
    h1: 'Data-Driven SEO Strategies That Drive Organic Revenue',
    heroLead: 'Dominate search engine rankings, attract high-intent organic traffic, and establish sustainable digital authority with our ethical, white-hat technical and content SEO services.',
    img: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&q=80',
    introEyebrow: 'Organic Search Authority',
    introH2: 'Converting Organic Search into Your #1 Acquisition Channel',
    introP1: 'Visibility on Google is the lifeblood of sustainable digital growth. Pixbit Solutions delivers comprehensive SEO programs that combine deep technical website optimization, competitive keyword intelligence, high-authority link acquisition, and content marketing designed to win top organic positions across Dubai, the GCC, India, and global markets.',
    introP2: 'We do not rely on outdated vanity tactics; our focus is driving qualified, high-intent organic visitors who convert into paying customers and measurable business revenue.',
    challenges: [
      { title: 'Stagnant Organic Rankings & Traffic', desc: 'Uncovering technical and algorithmic roadblocks preventing your site from ranking on page 1 of Google.' },
      { title: 'Technical Crawl & Indexation Errors', desc: 'Fixing XML sitemaps, robots.txt directives, canonical conflicts, and crawl budget inefficiencies.' },
      { title: 'Failing Google Core Web Vitals', desc: 'Optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).' },
      { title: 'Low Local Map Pack Visibility', desc: 'Optimizing Google Business Profiles, localized citations, and geo-targeted keywords to dominate local Dubai and regional searches.' },
      { title: 'Low Quality Backlinks & Toxic Signals', desc: 'Auditing backlink profiles to disavow toxic links while earning high-authority editorial mentions and brand links.' },
      { title: 'Keyword Mismatch & High Bounce Rates', desc: 'Aligning search intent with relevant landing page copy to turn searchers into engaged leads.' }
    ],
    solutionsH2: 'Comprehensive SEO Capabilities',
    solutionsSub: 'Ethical, data-driven optimization designed for long-term search engine dominance.',
    solutions: [
      { title: 'Comprehensive Technical SEO Audits', desc: 'In-depth diagnostics of site architecture, mobile responsiveness, SSL, server response times, and indexation.' },
      { title: 'High-Intent Keyword Intelligence', desc: 'Mapping buyer-intent commercial and transactional keywords with search volume, keyword difficulty, and intent categorization.' },
      { title: 'On-Page & Schema Markup Optimization', desc: 'Optimizing title tags, meta descriptions, header structures, internal linking, and JSON-LD structured data.' },
      { title: 'Authority Link Building & Digital PR', desc: 'Securing contextual editorial backlinks from high-domain-authority industry publications and trusted media outlets.' },
      { title: 'Local SEO & Google Business Profile Management', desc: 'Dominating the Google Local 3-Pack with review generation strategies, NAP consistency, and local citation building.' },
      { title: 'Content Strategy & SEO Copywriting', desc: 'Authoring in-depth, original pillar guides and blog articles that rank for competitive topic clusters and establish topical authority.' }
    ],
    deliverables: [
      { title: 'Technical SEO Audit & Roadmap', desc: 'Prioritized technical checklist identifying crawl errors, speed bottlenecks, and metadata fixes.' },
      { title: 'Keyword Keyword Mapping Matrix', desc: 'Comprehensive spreadsheet mapping targeted keywords to specific landing pages and content assets.' },
      { title: 'Structured Schema Implementation', desc: 'Valid JSON-LD schema markup for Organizations, Products, FAQs, Local Businesses, and Breadcrumbs.' },
      { title: 'Monthly Authority Backlink Acquisition', desc: 'Transparent reporting of high-DA contextual backlinks earned through legitimate outreach.' },
      { title: 'Live Looker Studio Dashboard', desc: 'Real-time dashboard tracking keyword rankings, organic traffic, impressions, and conversion goals.' },
      { title: 'Ongoing Content Refresh & Optimization', desc: 'Quarterly content refreshes to maintain top rankings as search engine algorithms evolve.' }
    ],
    faqs: [
      { q: 'How long does it take to see results from SEO?', a: 'Meaningful SEO progress typically takes 3 to 6 months. Initial technical fixes yield early improvements within weeks, while competitive commercial keyword rankings and organic revenue compound over 6 to 12 months.' },
      { q: 'Do you guarantee #1 rankings on Google?', a: 'No reputable SEO agency guarantees #1 rankings because Google algorithms are proprietary and constantly evolving. What we guarantee is rigorous, ethical, white-hat execution adhering to Google Search Essentials that consistently drives traffic and ranking gains.' },
      { q: 'What is the importance of Core Web Vitals for SEO?', a: 'Core Web Vitals are official Google ranking signals measuring real-world user experience (load speed, visual stability, and interactivity). Sites meeting Google good thresholds enjoy distinct ranking advantages over slower competitors.' },
      { q: 'Can you help us recover from a Google algorithmic penalty?', a: 'Yes. We conduct forensic penalty audits to identify unnatural link patterns or content quality issues, disavow toxic links, fix quality guideline violations, and submit reconsideration requests.' }
    ]
  },

  'ai-development.html': {
    name: 'AI Development',
    title: 'AI Development Services | WHYNEX',
    metaDesc: 'Pioneering AI development company specializing in custom LLM solutions, intelligent chatbot assistants, automated document scanning, and predictive analytics.',
    canonical: 'https://whynex.com/pages/services/ai-development.html',
    eyebrow: 'Artificial Intelligence UAE & India',
    h1: 'Custom Artificial Intelligence & Machine Learning Solutions',
    heroLead: 'Harness the power of generative AI, automated intelligent workflows, and predictive machine learning to transform operational efficiency and build next-generation software.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    introEyebrow: 'Applied Intelligence',
    introH2: 'Transforming Data into Autonomous Business Value',
    introP1: 'Pixbit Solutions helps forward-thinking companies integrate pragmatic, production-grade Artificial Intelligence into their existing products and business workflows. From intelligent customer service chatbots and automated document verification to predictive recommendation engines and computer vision, our AI engineering team turns raw data into autonomous business intelligence.',
    introP2: 'We build private, secure AI pipelines that adhere to enterprise data confidentiality standards, ensuring your sensitive proprietary business data is never exposed to public training models.',
    challenges: [
      { title: 'Manual & Error-Prone Data Entry', desc: 'Automating repetitive document validation, invoice parsing, and record keeping with intelligent OCR pipelines.' },
      { title: 'Overwhelmed Customer Support Teams', desc: 'Deploying context-aware AI agents that resolve 70%+ of customer inquiries 24/7 with zero human intervention.' },
      { title: 'Unstructured & Dark Enterprise Data', desc: 'Converting PDFs, scans, emails, and database logs into structured, searchable vector databases.' },
      { title: 'Data Privacy & Model Hallucinations', desc: 'Building Retrieval-Augmented Generation (RAG) pipelines with strict guardrails to eliminate false outputs and data leakage.' },
      { title: 'High Cost of In-House AI Teams', desc: 'Partnering with a specialized AI engineering team with proven expertise in PyTorch, LangChain, and cloud ML infrastructure.' },
      { title: 'Integrating AI with Legacy Systems', desc: 'Connecting state-of-the-art AI models to existing ERPs, CRMs, and databases through clean REST APIs and event brokers.' }
    ],
    solutionsH2: 'Tailored AI & GenAI Capabilities',
    solutionsSub: 'Practical, production-grade artificial intelligence solutions engineered for enterprise scale.',
    solutions: [
      { title: 'Intelligent Chatbots & Virtual Agents', desc: 'Conversational AI assistants trained on your proprietary product docs and company SOPs, offering human-level dialogue and automated ticketing.' },
      { title: 'Automated Document & ID Processing (OCR)', desc: 'Instant extraction, verification, and fraud detection for Emirates IDs, passports, invoices, and medical records using computer vision.' },
      { title: 'Predictive Analytics & Forecasting Models', desc: 'Custom machine learning models forecasting customer churn, demand planning, dynamic pricing, and inventory replenishment.' },
      { title: 'Personalized Recommendation Engines', desc: 'Deep-learning recommendation algorithms that analyze user behavior in real time to increase average order value and user engagement.' },
      { title: 'Enterprise RAG & Private LLM Deployment', desc: 'Retrieval-Augmented Generation systems deployed in private cloud environments allowing employees to query internal knowledge bases securely.' },
      { title: 'Computer Vision & Visual Inspection', desc: 'Deep learning models for object detection, facial recognition, defect inspection in manufacturing, and automated video analysis.' }
    ],
    deliverables: [
      { title: 'Production-Ready AI Model & API', desc: 'Containerized AI microservices packaged in Docker with sub-second inference times and auto-scaling.' },
      { title: 'Private Vector Database Setup', desc: 'Configured Pinecone, Qdrant, or pgvector database populated with indexed enterprise knowledge embeddings.' },
      { title: 'Automated Data Ingestion Pipeline', desc: 'Automated ETL workflows cleaning, chunking, and indexing new documents and database updates continuously.' },
      { title: 'Administrative Monitoring Dashboard', desc: 'Real-time telemetry tracking prompt costs, latency, token usage, user feedback ratings, and model drift.' },
      { title: 'Security & Hallucination Guardrails', desc: 'Configured safety filters, PII redaction, and semantic guardrails preventing unauthorized data retrieval.' },
      { title: 'API Integration & Documentation', desc: 'Ready-to-use SDKs and API docs enabling rapid integration into web, iOS, Android, and internal enterprise tools.' }
    ],
    faqs: [
      { q: 'How do you ensure our corporate data remains confidential when using AI?', a: 'We deploy enterprise-grade private RAG architectures where your data never leaves your secure cloud environment (AWS/GCP/Azure) and is never used to train public foundation models.' },
      { q: 'Can AI be integrated into our existing mobile and web apps?', a: 'Yes. We build lightweight RESTful and WebSocket AI microservices that plug effortlessly into your existing tech stack without disrupting ongoing operations.' },
      { q: 'What is the typical timeline for an AI prototype or MVP?', a: 'A focused AI proof-of-concept (such as an internal document retrieval bot or OCR pipeline) typically takes 3 to 6 weeks.' },
      { q: 'How do you prevent AI models from hallucinating incorrect information?', a: 'We implement rigorous ground-truth RAG retrieval with vector cosine similarity thresholds, strict prompt constraints, and automated fact-checking guardrails.' }
    ]
  },

  'digital-marketing.html': {
    name: 'Digital Marketing',
    title: 'Digital Marketing Services | WHYNEX',
    metaDesc: 'Results-driven digital marketing agency in UAE and India specializing in performance marketing, Google Ads, Meta Ads, conversion rate optimization, and brand growth.',
    canonical: 'https://whynex.com/pages/services/digital-marketing.html',
    eyebrow: 'Performance Marketing UAE & India',
    h1: 'Performance-Driven Digital Marketing & Growth Acceleration',
    heroLead: 'Acquire qualified leads, scale customer acquisition, and maximize return on ad spend (ROAS) through multi-channel performance marketing, paid ads, and conversion optimization.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    introEyebrow: 'Growth Acceleration',
    introH2: 'Scaling Revenue with High-ROI Digital Marketing Campaigns',
    introP1: 'Pixbit Solutions crafts data-backed digital marketing campaigns that drive measurable revenue growth rather than vanity metrics. By combining targeted paid search (Google Ads), high-converting social campaigns (Meta, LinkedIn, TikTok), strategic content marketing, and conversion rate optimization (CRO), we build scalable customer acquisition funnels for startups and enterprises across the Middle East and worldwide.',
    introP2: 'Every dollar of your marketing investment is tracked, analyzed, and optimized against concrete revenue milestones and customer lifetime value metrics.',
    challenges: [
      { title: 'High Customer Acquisition Costs (CAC)', desc: 'Restructuring campaign targeting and landing page funnels to lower cost-per-lead and dramatically improve ROAS.' },
      { title: 'Wasted Ad Spend on Irrelevant Clicks', desc: 'Implementing aggressive negative keyword lists, tight audience exclusions, and conversion-focused bid strategies.' },
      { title: 'Inaccurate Tracking & Blind Spots', desc: 'Deploying server-side Conversion API (CAPI) and GA4 event tracking to ensure 100% attribution accuracy post-iOS 14.5.' },
      { title: 'Ad Creative Fatigue & Diminishing Returns', desc: 'Developing a continuous creative pipeline of high-performing video hooks, static carousels, and user-generated content.' },
      { title: 'Low Landing Page Conversion Rates', desc: 'Conducting heatmapping, A/B testing, and copy optimization to turn expensive ad clicks into paying customers.' },
      { title: 'Fragmented Multi-Channel Messaging', desc: 'Orchestrating cohesive retargeting funnels that nurture prospects seamlessly across Google, Instagram, and LinkedIn.' }
    ],
    solutionsH2: 'Multi-Channel Marketing Capabilities',
    solutionsSub: 'Data-driven marketing programs engineered to generate pipeline and measurable top-line revenue.',
    solutions: [
      { title: 'Pay-Per-Click Advertising (Google Ads)', desc: 'Laser-targeted Google Search, Shopping, Performance Max, and YouTube campaigns capturing high-intent commercial buyers.' },
      { title: 'Paid Social Campaigns (Meta, LinkedIn, TikTok)', desc: 'Engaging video and carousel ad creatives tailored to demographic and behavioral micro-segments across social channels.' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Rigorous A/B testing, user session analysis, and copy refinement to systematically increase page conversion rates.' },
      { title: 'Marketing Automation & Email Drip Sequences', desc: 'Behavior-triggered automated email and SMS workflows that re-engage abandoned carts and nurture enterprise leads.' },
      { title: 'Server-Side Analytics & Attribution Setup', desc: 'End-to-end implementation of Google Analytics 4, Meta CAPI, Google Tag Manager, and custom BI revenue dashboards.' },
      { title: 'Content Marketing & Brand Storytelling', desc: 'Authoring persuasive case studies, industry reports, and lead magnets that establish domain authority and educate buyers.' }
    ],
    deliverables: [
      { title: 'Quarterly Campaign Strategy & Blueprint', desc: 'Comprehensive growth strategy detailing budget allocations, target personas, channels, and KPI projections.' },
      { title: 'High-Converting Creative Ad Assets', desc: 'Professionally designed image ads, video hooks, carousel layouts, and persuasive ad copywriting.' },
      { title: 'Optimized Landing Page Framework', desc: 'Mobile-responsive, ultra-fast landing pages engineered with compelling conversion psychology.' },
      { title: 'Server-Side CAPI & GA4 Tracking Suite', desc: 'Rock-solid tracking infrastructure capturing first-party conversion data with zero signal degradation.' },
      { title: 'Weekly Optimization & A/B Testing Log', desc: 'Transparent weekly reports detailing tested ad variants, bid adjustments, and budget scaling actions.' },
      { title: 'Live 24/7 Performance Dashboard', desc: 'Real-time Looker Studio dashboard tracking spend, leads, cost-per-acquisition (CPA), and return on ad spend (ROAS).' }
    ],
    faqs: [
      { q: 'What is the recommended minimum ad budget for paid campaigns?', a: 'We typically recommend a minimum starting ad spend of $1,500 to $3,000 per month per platform to allow algorithm machine learning to optimize bids and gather statistically significant conversion data.' },
      { q: 'How do you measure marketing success and ROI?', a: 'We measure success on tangible business outcomes: qualified sales leads, customer acquisition cost (CAC), conversion rate, and Return on Ad Spend (ROAS)—not vanity metrics like impressions or clicks.' },
      { q: 'Do you create the ad graphics, copy, and videos?', a: 'Yes. Our in-house creative team handles end-to-end ad creative production including graphic design, motion graphics, video editing, and persuasive copywriting.' },
      { q: 'How often do you report on campaign results?', a: 'Clients receive 24/7 access to live Looker Studio dashboards, bi-weekly performance reviews, and comprehensive monthly executive summaries analyzing insights, revenue attribution, and next-month scaling plans.' }
    ]
  }
};

let updatedCount = 0;

for (const [filename, data] of Object.entries(services)) {
  const filePath = path.join(servicesDir, filename);
  
  // Create or update
  let baseHeader = headerPart;
  let baseFooter = footerPart;

  // Replace title, meta description, and canonical in header
  baseHeader = baseHeader.replace(/<title>.*?<\/title>/i, `<title>${data.title}</title>`);
  baseHeader = baseHeader.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="${data.metaDesc}">`);
  baseHeader = baseHeader.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="${data.canonical}">`);
  baseHeader = baseHeader.replace(/<meta property="og:title"[\s\S]*?content=".*?"/i, `<meta property="og:title" content="${data.title}">`);
  baseHeader = baseHeader.replace(/<meta property="og:description"[\s\S]*?content=".*?"/i, `<meta property="og:description" content="${data.metaDesc}">`);

  const bodyHtml = generateServiceBody(data);
  const fullHtml = baseHeader + bodyHtml + baseFooter;

  fs.writeFileSync(filePath, fullHtml, 'utf8');
  console.log(`Successfully generated/updated: pages/services/${filename}`);
  updatedCount++;
}

console.log(`\nAll ${updatedCount} core service pages successfully built!`);
