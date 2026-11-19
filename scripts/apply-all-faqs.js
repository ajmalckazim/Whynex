// scripts/apply-all-faqs.js
const fs = require('fs');
const path = require('path');

const map1 = require('./faq-content-map.js');
const map2 = require('./faq-services-industries-map.js');
const faqData = Object.assign({}, map1, map2);

function getHtmlFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) files = files.concat(getHtmlFiles(p));
    else if (f.endsWith('.html')) files.push(p);
  });
  return files;
}

const pagesDir = path.join(__dirname, '..', 'pages');
const allPages = getHtmlFiles(pagesDir);

let appliedCount = 0;

allPages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(pagesDir, filePath).replace(/\\/g, '/');
  const isDepth1 = !rel.includes('/'); // index.html, contact.html
  // Depth 1: pages/index.html -> root css is at ../css/
  // Depth 2: pages/services/web-development.html -> root css is at ../../css/
  const cssPrefix = isDepth1 ? '../' : '../../';
  const jsPrefix = isDepth1 ? '../' : '../../';

  const faqs = faqData[rel];
  if (!faqs || !faqs.length) {
    console.warn(`Warning: No FAQ data found for ${rel}`);
    return;
  }

  // 1. Build Semantic HTML for FAQ Section
  const faqItemsHtml = faqs.map((f, i) => {
    const id = i + 1;
    return `        <!-- FAQ Item ${id} -->
        <div class="faq-box" id="faq-box-${id}">
          <button type="button" class="faq-trigger" aria-expanded="false" aria-controls="faq-ans-${id}" id="faq-btn-${id}">
            <span class="faq-question-text">${f.q}</span>
            <span class="faq-icon-wrap" aria-hidden="true">
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line class="icon-h" x1="5" y1="12" x2="19" y2="12"></line>
                <line class="icon-v" x1="12" y1="5" x2="12" y2="19"></line>
              </svg>
            </span>
          </button>
          <div class="faq-content-wrap" id="faq-ans-${id}" role="region" aria-labelledby="faq-btn-${id}" hidden>
            <div class="faq-answer-inner">
              <p>${f.a}</p>
            </div>
          </div>
        </div>`;
  }).join('\n\n');

  const faqSectionHtml = `
  <!-- ==================== FAQ SECTION ==================== -->
  <section class="faq-section" id="faq" aria-labelledby="faq-main-heading">
    <div class="container">
      <div class="faq-header text-center reveal">
        <div class="eyebrow" style="color:var(--baby-blue); margin-bottom:12px;">FAQ</div>
        <h2 id="faq-main-heading" class="faq-main-heading">Frequently Asked Questions</h2>
        <p class="faq-main-subtitle">Find answers to your questions.</p>
      </div>

      <div class="faq-accordion reveal" role="region" aria-label="Frequently Asked Questions">
${faqItemsHtml}
      </div>
    </div>
  </section>
  <!-- ================== END FAQ SECTION ================== -->\n`;

  // 2. Build JSON-LD Structured Data
  const jsonLdEntities = faqs.map(f => {
    return {
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    };
  });

  const jsonLdString = `  <!-- FAQPage Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": jsonLdEntities
  }, null, 2).replace(/\n/g, '\n  ')}
  </script>`;

  // 3. Clean existing FAQ styles & scripts from head
  content = content.replace(/\s*<!-- FAQPage Structured Data -->[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<script type="application\/ld\+json">[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<link rel="stylesheet" href="[^"]*faq\.css">/g, '');

  // Add correct faq.css link
  content = content.replace('</head>', `  <link rel="stylesheet" href="${cssPrefix}css/faq.css">\n</head>`);

  // Insert JSON-LD right before </head>
  content = content.replace('</head>', `${jsonLdString}\n</head>`);

  // 4. Update Body: Replace or Insert FAQ Section
  if (content.includes('class="faq-section"')) {
    const oldFaqRegex = /<!-- ==================== FAQ SECTION ==================== -->[\s\S]*?<!-- ================== END FAQ SECTION ================== -->/i;
    if (oldFaqRegex.test(content)) {
      content = content.replace(oldFaqRegex, faqSectionHtml.trim());
    } else {
      const basicFaqRegex = /<section class="faq-section"[\s\S]*?<\/section>/i;
      content = content.replace(basicFaqRegex, faqSectionHtml.trim());
    }
  } else if (rel === 'index.html') {
    content = content.replace('<section id="contact"', `${faqSectionHtml}\n  <section id="contact"`);
  } else if (content.includes('<section class="final-cta')) {
    content = content.replace('<section class="final-cta', `${faqSectionHtml}\n  <section class="final-cta`);
  } else if (content.includes('<section class="about-cta')) {
    content = content.replace('<section class="about-cta', `${faqSectionHtml}\n  <section class="about-cta`);
  } else if (content.includes('<section class="team-cta')) {
    content = content.replace('<section class="team-cta', `${faqSectionHtml}\n  <section class="team-cta`);
  } else if (content.includes('<section class="contact-offices')) {
    content = content.replace('<section class="contact-offices', `${faqSectionHtml}\n  <section class="contact-offices`);
  } else if (content.includes('</main>')) {
    content = content.replace('</main>', `${faqSectionHtml}\n  </main>`);
  } else if (content.includes('<footer')) {
    content = content.replace('<footer', `${faqSectionHtml}\n  <footer`);
  }

  // 5. Clean and add correct faq.js script before </body>
  content = content.replace(/<script[^>]*src="[^"]*faq\.js"><\/script>/g, '');
  content = content.replace('</body>', `  <script defer src="${jsPrefix}js/faq.js"></script>\n</body>`);

  fs.writeFileSync(filePath, content, 'utf8');
  appliedCount++;
});

console.log(`\nSuccessfully applied corrected FAQ sections across all ${appliedCount} pages!`);
