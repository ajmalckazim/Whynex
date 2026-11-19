// scripts/build-blogs.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'pages');
const blogsDir = path.join(baseDir, 'blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

// Read template from services/web-development.html
const templateFile = path.join(baseDir, 'services', 'web-development.html');
const templateHtml = fs.readFileSync(templateFile, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const footerMarker = '</main>';

const headerPart = templateHtml.slice(0, templateHtml.indexOf(heroMarker));
const footerPart = templateHtml.slice(templateHtml.indexOf(footerMarker));

const articles = [
  {
    slug: '10-reasons-why-your-company-needs-a-good-website.html',
    title: '10 Reasons Why Your Company Needs a Good Website in 2025 | WHYNEX',
    category: 'Web Development',
    date: 'February 2025',
    readTime: '6 min read',
    h1: '10 Critical Reasons Why Your Company Needs a High-Performance Website',
    lead: 'In an era where your digital presence is your primary storefront, having an outdated, slow, or generic website costs businesses more than lost traffic—it destroys credibility. Here are 10 non-negotiable reasons why investing in a world-class website is essential for growth.',
    sections: [
      {
        h2: '1. First Impressions Determine Brand Credibility',
        p: 'Studies consistently reveal that it takes less than 50 milliseconds (0.05 seconds) for a user to form an opinion about your website. If your layout is cluttered, unoptimized for mobile devices, or visually dated, prospective enterprise clients and customers assume your services reflect the same lack of attention to detail.'
      },
      {
        h2: '2. 24/7 Lead Generation and Automated Sales Pipelines',
        p: 'Unlike physical brick-and-mortar storefronts, your website never sleeps. A properly architected web application acts as an autonomous sales executive—answering queries, qualifying leads through dynamic forms, booking appointments, and capturing transactions across time zones effortlessly.'
      },
      {
        h2: '3. Search Engine Visibility and Inbound Customer Discovery',
        p: 'Over 85% of consumers and 93% of B2B procurement decision-makers research online before making a purchase. Without a technically sound website adhering to Google Core Web Vitals and structured schema, your company remains invisible to customers actively searching for your solutions.'
      },
      {
        h2: '4. Establishing Authority Through Thought Leadership',
        p: 'Publishing whitepapers, case studies, and industry guides on a dedicated, fast-loading content hub positions your executive team as trusted experts in your domain, shortening sales cycles significantly.'
      },
      {
        h2: '5. Seamless Mobile-First User Experiences',
        p: 'With mobile traffic accounting for more than 60% of all global web traffic, a responsive, thumb-friendly design is no longer an optional perk—it is an absolute baseline requirement for customer retention.'
      },
      {
        h2: '6. Integration with Enterprise CRMs and Data Workflows',
        p: 'A modern website connects directly to your internal tech stack: routing leads into HubSpot or Salesforce, triggering automated WhatsApp and email sequences, and updating inventory in real time.'
      },
      {
        h2: '7. Maximizing Return on Digital Advertising (ROAS)',
        p: 'Sending paid traffic from Google Ads or Meta campaigns to a slow, generic homepage results in wasted ad spend. Fast, high-converting dedicated landing pages maximize every dollar spent on acquisition.'
      },
      {
        h2: '8. Customer Support Automation & Self-Service',
        p: 'Integrating intelligent FAQ accordions, documentation portals, and conversational AI chatbots resolves common customer questions instantly, reducing your customer support overhead by up to 50%.'
      },
      {
        h2: '9. Competitive Differentiation in Saturated Markets',
        p: 'When competitors offer similar pricing or features, a superior digital user experience (speed, frictionless navigation, and aesthetic elegance) is often the decisive tipping point for buyers.'
      },
      {
        h2: '10. Future-Proof Scalability for Business Evolution',
        p: 'Building on modular, modern frameworks (like Laravel, Next.js, and headless CMS architecture) allows your digital platform to adapt quickly when introducing new products, expanding into new countries, or pivoting business models.'
      }
    ]
  },

  {
    slug: 'how-to-develop-content-management-software-2025.html',
    title: 'How to Develop Custom Content Management Software (CMS) in 2025 | WHYNEX',
    category: 'Software Engineering',
    date: 'January 2025',
    readTime: '8 min read',
    h1: 'How to Architect and Develop Custom CMS Software in 2025',
    lead: 'While off-the-shelf platforms like WordPress work for basic blogs, scaling enterprise operations often require bespoke CMS architectures tailored to unique workflows, multi-channel distribution, and granular access control.',
    sections: [
      {
        h2: 'The Limitations of Traditional Monolithic CMS',
        p: 'Monolithic CMS platforms tightly couple content authoring with the frontend presentation layer. As businesses scale across web, mobile apps, digital kiosks, and smart devices, maintaining separate templates becomes an operational nightmare fraught with plugin security vulnerabilities.'
      },
      {
        h2: 'Why Headless and Decoupled Architecture Wins',
        p: 'In a headless CMS setup, the content repository is completely separated from the display frontends. Content creators write once, and the CMS delivers content via high-speed RESTful or GraphQL APIs to web frontends (Next.js), native mobile apps (Flutter), and partner syndication channels simultaneously.'
      },
      {
        h2: 'Key Architectural Modules in a Custom CMS',
        p: 'A robust custom CMS requires five foundational components: (1) A schema-driven content model builder, (2) Role-based access control (RBAC) supporting multi-tier approval workflows, (3) An integrated digital asset management (DAM) system with automated WebP/AVIF image transformations, (4) Webhook automation for instant cache invalidation, and (5) Version history with instant rollback capabilities.'
      },
      {
        h2: 'Tech Stack Recommendations for Custom CMS',
        p: 'For backend stability, we recommend Laravel or Node.js (NestJS) paired with PostgreSQL and Redis caching. For the administrative interface, React with Tailwind or an established component library provides a fast, responsive authoring environment.'
      }
    ]
  },

  {
    slug: 'best-ecommerce-website-builders-2025.html',
    title: 'Best E-Commerce Website Builders & Platforms Compared (2025) | WHYNEX',
    category: 'E-Commerce',
    date: 'January 2025',
    readTime: '7 min read',
    h1: 'The Best E-Commerce Platforms for Scaling Businesses in 2025',
    lead: 'Choosing the right e-commerce platform is one of the most critical foundational decisions for any retail brand. We analyze Shopify Plus, WooCommerce, Magento, and Headless Commerce architectures to help you make an informed decision.',
    sections: [
      {
        h2: 'Shopify & Shopify Plus: Speed to Market with Trade-offs',
        p: 'Shopify remains the champion for rapid deployment and reliable hosted checkout. However, high transaction fees for external payment gateways and rigid URL structure constraints make it challenging for complex international businesses requiring customized checkout flows.'
      },
      {
        h2: 'WooCommerce: Open-Source Flexibility with Maintenance Overhead',
        p: 'WooCommerce offers total data ownership and zero software subscription fees. However, scaling beyond 50,000 SKUs requires specialized server infrastructure, object caching, and vigilant maintenance to prevent plugin compatibility breaks.'
      },
      {
        h2: 'Headless E-Commerce: The Gold Standard for High-Growth Enterprises',
        p: 'Pairing a headless engine like Shopify Plus or Medusa with a custom Next.js frontend gives enterprises the ultimate combination: sub-second load times, 100% design freedom, and seamless integration with regional Middle East payment gateways like Tap, Tabby, and Tamara.'
      }
    ]
  },

  {
    slug: 'the-best-travel-website-development-company-2025.html',
    title: 'How to Choose the Best Travel Website Development Company | WHYNEX',
    category: 'TravelTech',
    date: 'December 2024',
    readTime: '6 min read',
    h1: 'What to Look For in an Enterprise Travel Website Development Partner',
    lead: 'Building a travel booking platform involves real-time GDS integrations, fluctuating hotel inventories, multi-currency pricing, and complex itinerary customization. Here is how to evaluate development partners.',
    sections: [
      {
        h2: 'Deep Familiarity with GDS and Third-Party APIs',
        p: 'A generalist development team often struggles with the intricacies of Sabre, Amadeus, Travelport, and HotelBeds APIs. Your development partner must have proven experience managing live pricing timeouts, session hold mechanisms, and dynamic markup rules.'
      },
      {
        h2: 'Handling High-Concurrency Search Workloads',
        p: 'Flight and hotel searches generate massive database reads. A high-performance travel architecture leverages distributed Redis caching, elastic search engines, and asynchronous queue workers to return live search results in under two seconds.'
      },
      {
        h2: 'Intuitive Multi-Step Checkout and Booking Flow',
        p: 'Travelers abandon bookings if passenger detail inputs, baggage selection, and visa requirements are cumbersome. The booking UI must be streamlined with progressive disclosure and saved passenger profiles.'
      }
    ]
  },

  {
    slug: 'how-to-choose-ui-ux-design-agency.html',
    title: 'How to Choose the Right UI/UX Design Agency for Your Product | WHYNEX',
    category: 'UI/UX Design',
    date: 'December 2024',
    readTime: '5 min read',
    h1: 'The Definitive Guide to Selecting a UI/UX Design Partner',
    lead: 'Hiring a design agency is an investment in your product’s core usability and market adoption. Here is the evaluation framework to ensure you choose an agency that designs for business impact, not just pretty Dribbble shots.',
    sections: [
      {
        h2: 'Insist on Research-Driven Design, Not Just Visuals',
        p: 'A great UI/UX agency begins with user interviews, competitive audits, and behavioral journey mapping. If an agency jumps straight to visual mockups without understanding user pain points, they are decorating, not designing.'
      },
      {
        h2: 'Evaluate Real-World Design Systems in Figma',
        p: 'Request to see their Figma design files. Professional agencies utilize auto-layout, named design tokens, variants, and responsive breakpoints, ensuring that frontend developers can implement the design with zero friction.'
      },
      {
        h2: 'Look for Proven Conversion and Usability Metrics',
        p: 'Ask prospective agencies about the measurable impact of their past work: did their redesign reduce onboarding churn, increase checkout conversion rates, or lower support tickets?'
      }
    ]
  },

  {
    slug: 'chatgpt-vs-deepseek-which-is-better.html',
    title: 'ChatGPT vs DeepSeek: An Engineering Comparison (2025) | WHYNEX',
    category: 'AI & Machine Learning',
    date: 'January 2025',
    readTime: '8 min read',
    h1: 'ChatGPT vs DeepSeek: Architectural Insights and Enterprise Suitability',
    lead: 'With the rapid emergence of DeepSeek V3 and R1 alongside OpenAI’s flagship GPT models, engineering teams must evaluate cost-per-token, reasoning capability, coding accuracy, and data privacy for enterprise deployment.',
    sections: [
      {
        h2: 'Architecture and Computational Efficiency',
        p: 'DeepSeek has captured global engineering attention by leveraging Multi-Head Latent Attention (MLA) and Mixture of Experts (MoE) architectures that dramatically reduce inference compute and VRAM overhead, making self-hosting financially viable.'
      },
      {
        h2: 'Coding and Mathematical Reasoning Benchmarks',
        p: 'While GPT-4o maintains an edge in nuanced multilingual prose and vision tasks, DeepSeek R1 demonstrates remarkable chain-of-thought mathematical reasoning and code generation parity at a fraction of the API token cost.'
      },
      {
        h2: 'Enterprise Privacy and Deployment Strategy',
        p: 'For companies with strict sovereign data requirements in the UAE and GCC, open-weight models like DeepSeek can be deployed in private on-premise clusters or sovereign cloud VPCs, ensuring 100% data residency compliance.'
      }
    ]
  },

  {
    slug: 'how-ai-is-changing-software-development.html',
    title: 'How Artificial Intelligence is Transforming Software Engineering | WHYNEX',
    category: 'AI & Machine Learning',
    date: 'February 2025',
    readTime: '7 min read',
    h1: 'The AI-Powered Engineering Paradigm: From Code Writing to System Architecture',
    lead: 'AI is no longer just autocomplete for developers. Agentic workflows, automated test generation, and intelligent code review are redefining what it means to build software at speed.',
    sections: [
      {
        h2: 'The Rise of Agentic Coding Assistants',
        p: 'Developers are shifting from writing boilerplate code line-by-line to acting as system architects guiding AI agents that inspect entire codebases, write unit tests, and resolve dependency conflicts autonomously.'
      },
      {
        h2: 'Automated Security and Vulnerability Scanning',
        p: 'AI models trained on CVE databases can analyze pull requests in real time, detecting SQL injection vectors, race conditions, and insecure cryptographic configurations before code ever touches production.'
      },
      {
        h2: 'Why Human Architectural Rigor Remains Indispensable',
        p: 'While AI accelerates development speed by 3x, architectural decisions regarding data modeling, distributed consensus, failure domain isolation, and product UX still demand experienced human engineering leadership.'
      }
    ]
  },

  {
    slug: 'which-paid-ads-platform-is-best-in-2025.html',
    title: 'Google Ads vs Meta Ads vs LinkedIn Ads: Which is Best in 2025? | WHYNEX',
    category: 'Digital Marketing',
    date: 'February 2025',
    readTime: '6 min read',
    h1: 'Paid Ads Platform Comparison: Where Should You Invest Your Budget?',
    lead: 'Allocating your performance marketing budget across Google, Meta, and LinkedIn requires aligning user intent with your business model. Here is the strategic breakdown for B2B and B2C brands.',
    sections: [
      {
        h2: 'Google Ads: The Unrivaled King of High-Intent Search',
        p: 'When users search for "commercial real estate brokers Dubai" or "ERP software development", they have explicit purchase intent. Google Search Ads capture active buyers at the bottom of the funnel, delivering the highest immediate conversion rates.'
      },
      {
        h2: 'Meta Ads (Instagram & Facebook): Unmatched Visual Storytelling',
        p: 'Meta algorithms excel at pattern matching visual products to lookalike audiences. For consumer brands, lifestyle aesthetics, mobile app installs, and impulse purchases, Meta’s Advantage+ campaigns deliver superior top-of-funnel scale.'
      },
      {
        h2: 'LinkedIn Ads: The B2B Enterprise Pipeline Engine',
        p: 'While cost-per-click on LinkedIn is higher than other platforms, its job title, company size, and industry targeting capabilities make it the most cost-effective channel for high-ticket B2B deals ($20,000+ ACV) where reaching the exact C-suite buyer matters.'
      }
    ]
  }
];

// 1. Build Individual Blog Article Pages
articles.forEach(art => {
  const metaDesc = art.lead.slice(0, 155) + '...';
  let head = headerPart;
  head = head.replace(/<title>.*?<\/title>/i, `<title>${art.title}</title>`);
  head = head.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="${metaDesc}">`);
  head = head.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="https://whynex.com/pages/blogs/${art.slug}">`);

  const sectionsHtml = art.sections.map(s => `
        <div class="reveal" style="margin-bottom: 40px;">
          <h2 style="font-size:24px; font-weight:700; color:#fff; margin-bottom:16px; line-height:1.35;">${s.h2}</h2>
          <p style="font-size:16px; color:rgba(255,255,255,0.78); line-height:1.8;">${s.p}</p>
        </div>`).join('\n');

  const articleBody = `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="index.html">Blogs</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>${art.category}</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:16px;">${art.category} &bull; ${art.date} &bull; ${art.readTime}</div>
      <h1 style="font-size:clamp(2.2rem, 4.5vw, 3.4rem); line-height:1.2; margin-bottom:24px; max-width:900px; margin-left:auto; margin-right:auto;">${art.h1}</h1>
      <p style="font-size:18px; color:rgba(255,255,255,0.8); max-width:800px; margin:0 auto; line-height:1.7;">${art.lead}</p>
    </div>
  </section>

  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      <div style="display:grid; grid-template-columns: 2.2fr 1fr; gap:64px; align-items:start;">
        
        <!-- Article Main Content -->
        <article class="blog-article-content" style="color:rgba(255,255,255,0.85);">
${sectionsHtml}

          <!-- Author Bio Box -->
          <div class="reveal" style="margin-top:64px; background:#111; border:1px solid rgba(255,255,255,0.08); padding:32px; border-radius:12px; display:flex; gap:20px; align-items:center;">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--baby-blue); color:var(--black); font-size:24px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">WN</div>
            <div>
              <div style="font-size:16px; font-weight:700; color:#fff;">Written by WHYNEX Engineering &amp; Strategy Team</div>
              <p style="font-size:13px; color:rgba(255,255,255,0.6); margin-top:4px; line-height:1.5;">Insights on software architecture, high-performance web engineering, mobile development, and digital marketing from practitioners in Dubai and India.</p>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="reveal" style="position:sticky; top:120px; background:#111; border:1px solid rgba(255,255,255,0.08); padding:32px; border-radius:12px;">
          <h3 style="font-size:18px; font-weight:700; color:#fff; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:12px;">Related Articles</h3>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:16px;">
            <li><a href="10-reasons-why-your-company-needs-a-good-website.html" style="color:rgba(255,255,255,0.8); font-size:14px; text-decoration:none; line-height:1.4; transition:color 0.2s;" onmouseover="this.style.color='var(--baby-blue)'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">&bull; 10 Reasons Why Your Company Needs a Good Website</a></li>
            <li><a href="chatgpt-vs-deepseek-which-is-better.html" style="color:rgba(255,255,255,0.8); font-size:14px; text-decoration:none; line-height:1.4; transition:color 0.2s;" onmouseover="this.style.color='var(--baby-blue)'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">&bull; ChatGPT vs DeepSeek: Architecture Comparison</a></li>
            <li><a href="how-to-develop-content-management-software-2025.html" style="color:rgba(255,255,255,0.8); font-size:14px; text-decoration:none; line-height:1.4; transition:color 0.2s;" onmouseover="this.style.color='var(--baby-blue)'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">&bull; How to Build Custom CMS Software in 2025</a></li>
            <li><a href="which-paid-ads-platform-is-best-in-2025.html" style="color:rgba(255,255,255,0.8); font-size:14px; text-decoration:none; line-height:1.4; transition:color 0.2s;" onmouseover="this.style.color='var(--baby-blue)'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">&bull; Google Ads vs Meta Ads vs LinkedIn Ads</a></li>
          </ul>

          <div style="margin-top:32px; border-top:1px solid rgba(255,255,255,0.08); padding-top:24px;">
            <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:8px;">Ready to build something?</div>
            <p style="font-size:13px; color:rgba(255,255,255,0.6); margin-bottom:16px;">Schedule a technical consultation with our engineering team.</p>
            <a href="../contact.html" class="btn btn-primary" style="width:100%; justify-content:center; text-align:center; font-size:13px;">Talk to Us</a>
          </div>
        </aside>

      </div>
    </div>
  </section>

  <section class="final-cta reveal">
    <div class="container">
      <h2>Stay Ahead with Modern Digital Engineering</h2>
      <p>Transform your business with world-class web, mobile, and AI solutions.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Start Your Project</a>
        <a href="index.html" class="btn btn-outline" style="color:var(--black); border-color:var(--black);">Read More Insights</a>
      </div>
    </div>
  </section>
\n`;

  fs.writeFileSync(path.join(blogsDir, art.slug), head + articleBody + footerPart, 'utf8');
  console.log(`Generated Blog Article: pages/blogs/${art.slug}`);
});

// 2. Build Blogs Index Page (pages/blogs/index.html)
let indexHead = headerPart;
indexHead = indexHead.replace(/<title>.*?<\/title>/i, `<title>Blog &amp; Technology Insights | WHYNEX</title>`);
indexHead = indexHead.replace(/<meta name="description"[\s\S]*?content=".*?"/i, `<meta name="description" content="Read actionable tech insights, web development best practices, mobile app guides, and digital marketing strategies from the WHYNEX engineering team.">`);
indexHead = indexHead.replace(/<link rel="canonical"[\s\S]*?href=".*?"/i, `<link rel="canonical" href="https://whynex.com/pages/blogs/index.html">`);

const blogCardsHtml = articles.map((art, i) => `
        <article class="reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition: transform 0.3s ease, border-color 0.3s ease;">
          <div style="padding:28px 28px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <span style="font-size:12px; font-weight:600; color:var(--baby-blue); background:rgba(135,206,250,0.1); padding:4px 12px; border-radius:50px;">${art.category}</span>
              <span style="font-size:12px; color:rgba(255,255,255,0.5);">${art.readTime}</span>
            </div>
            <h3 style="font-size:19px; font-weight:700; color:#fff; line-height:1.4; margin-bottom:12px;"><a href="${art.slug}" style="color:#fff; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='var(--baby-blue)'" onmouseout="this.style.color='#fff'">${art.h1}</a></h3>
            <p style="font-size:14px; color:rgba(255,255,255,0.65); line-height:1.6; margin-bottom:24px;">${art.lead.slice(0, 140)}...</p>
          </div>
          <div style="margin-top:auto; padding:16px 28px 24px; border-top:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:rgba(255,255,255,0.4);">${art.date}</span>
            <a href="${art.slug}" style="font-size:13px; font-weight:600; color:var(--baby-blue); text-decoration:none;">Read Article &rarr;</a>
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
        <span>Blogs</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">THOUGHT LEADERSHIP &amp; ENGINEERING INSIGHTS</div>
      <h1>Articles, Guides &amp; Tech Insights</h1>
      <p>Practical perspectives on web development, mobile applications, cloud architecture, AI engineering, and digital growth from the practitioners building scalable software every day.</p>
    </div>
  </section>

  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap:32px;">
${blogCardsHtml}
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
\n`;

fs.writeFileSync(path.join(blogsDir, 'index.html'), indexHead + indexBody + footerPart, 'utf8');
console.log('Generated Blogs Index: pages/blogs/index.html');
