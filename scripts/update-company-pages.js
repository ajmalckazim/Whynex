// scripts/update-company-pages.js
const fs = require('fs');
const path = require('path');

const companyDir = path.join(__dirname, '..', 'pages', 'company');
const contactFile = path.join(__dirname, '..', 'pages', 'contact.html');

// 1. Update Testimonials Page
const testFile = path.join(companyDir, 'testimonials.html');
let testHtml = fs.readFileSync(testFile, 'utf8');

const testHeroStart = testHtml.indexOf('<section class="comp-hero');
const testMainEnd = testHtml.indexOf('</main>');

if (testHeroStart !== -1 && testMainEnd !== -1) {
  const testimonials = [
    {
      quote: "Pixbit Solutions / WHYNEX delivered an enterprise property platform that gives us complete visibility across our entire Dubai property portfolio in real time. Their technical architecture and execution is exceptional.",
      client: "Farhan Al-Hashemi",
      role: "Managing Director",
      company: "Range International Property Investment",
      industry: "Real Estate & PropTech"
    },
    {
      quote: "Our new digital presence finally captures the luxury and clinical rigor of Dermazone Clinics. WHYNEX transformed our online booking and patient portal into our highest-performing revenue stream.",
      client: "Dr. Laila Mansour",
      role: "Medical Director",
      company: "Dermazone Clinics",
      industry: "Healthcare & Aesthetics"
    },
    {
      quote: "Cakiyo went from an ambitious concept to the UAE's favorite celebration delivery platform thanks to WHYNEX. Their custom 3D cake visualizer and dispatch routing are world-class.",
      client: "Nour Al-Sabah",
      role: "Founder & CEO",
      company: "Cakiyo",
      industry: "E-Commerce & FoodTech"
    },
    {
      quote: "The digital mortgage platform engineered by WHYNEX simplified what used to be a frustrating financial process into a clean, transparent digital experience with 22 integrated UAE banks.",
      client: "Samir Khatib",
      role: "Co-Founder & CEO",
      company: "My Mortgage",
      industry: "FinTech & Banking"
    },
    {
      quote: "WHYNEX mastered the complex IoT and OCPP charging protocols flawlessly. Their mobile app has set the gold standard for EV charging UX across the GCC region.",
      client: "Tariq Mansoor",
      role: "VP of Product",
      company: "VoltCharge Networks",
      industry: "CleanTech & Automotive"
    },
    {
      quote: "Our travel booking platform handles thousands of simultaneous queries across international flight and hotel APIs without breaking a sweat. WHYNEX is an invaluable technology partner.",
      client: "Adnan Qureshi",
      role: "Head of Operations",
      company: "Smash Tours & Travel",
      industry: "Travel & Hospitality"
    }
  ];

  const cardsHtml = testimonials.map(t => `
        <article class="reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:36px; display:flex; flex-direction:column; justify-content:space-between; transition: border-color 0.3s ease;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
              <span style="font-size:12px; font-weight:600; color:var(--baby-blue); background:rgba(135,206,250,0.1); padding:4px 12px; border-radius:50px;">${t.industry}</span>
              <div style="color:#f59e0b; display:flex; gap:2px;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <p style="font-size:16px; line-height:1.75; color:rgba(255,255,255,0.85); font-style:italic; margin-bottom:28px;">&ldquo;${t.quote}&rdquo;</p>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:20px; display:flex; align-items:center; gap:16px;">
            <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#3b82f6); color:#fff; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${t.client.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div style="font-size:15px; font-weight:700; color:#fff;">${t.client}</div>
              <div style="font-size:13px; color:rgba(255,255,255,0.55);">${t.role}, ${t.company}</div>
            </div>
          </div>
        </article>`).join('\n');

  const newTestMain = `
  <section class="ind-page-hero reveal">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="about-us.html">Company</a>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span>Testimonials</span>
      </div>
      <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">VERIFIED CLIENT EXPERIENCES</div>
      <h1>Trusted by Industry Leaders. Built on Tangible Results.</h1>
      <p>Read what founders, enterprise executives, and product leaders have to say about partnering with our digital engineering and product design teams.</p>
    </div>
  </section>

  <section style="padding: 100px 0; background: var(--black);">
    <div class="container">
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap:32px;">
${cardsHtml}
      </div>
    </div>
  </section>

  <section class="final-cta reveal">
    <div class="container">
      <h2>Join 100+ Ambitious Brands Growing with Us</h2>
      <p>Let's discuss how our engineering and design capabilities can accelerate your product roadmap.</p>
      <div class="cta-btns">
        <a href="../contact.html" class="btn btn-dark">Start a Conversation</a>
        <a href="../portfolio/index.html" class="btn btn-outline" style="color:var(--black); border-color:var(--black);">Explore Our Portfolio</a>
      </div>
    </div>
  </section>
\n`;

  testHtml = testHtml.slice(0, testHeroStart) + newTestMain + testHtml.slice(testMainEnd);
  fs.writeFileSync(testFile, testHtml, 'utf8');
  console.log('Updated: pages/company/testimonials.html');
}

// 2. Update About Us Page
const aboutFile = path.join(companyDir, 'about-us.html');
let aboutHtml = fs.readFileSync(aboutFile, 'utf8');

// Update stats numbers
aboutHtml = aboutHtml.replace(/data-target="250">0<\/h3>[\s\S]*?<p>Projects Delivered<\/p>/i, 'data-target="150">0</h3><p>Projects Delivered</p>');
aboutHtml = aboutHtml.replace(/data-target="180">0<\/h3>[\s\S]*?<p>Happy Clients<\/p>/i, 'data-target="100">0</h3><p>Happy Clients</p>');
aboutHtml = aboutHtml.replace(/data-target="12">0<\/h3>[\s\S]*?<p>Countries Served<\/p>/i, 'data-target="15">0</h3><p>Countries Served</p>');
aboutHtml = aboutHtml.replace(/data-target="10">0<\/h3>[\s\S]*?<p>Years Experience<\/p>/i, 'data-target="10">0</h3><p>Years Experience</p>');

// Update story copy to authentic Pixel + Bit founding story
const storyRegex = /<section class="about-story"[\s\S]*?<\/section>/i;
const newStorySection = `
    <section class="about-story" aria-labelledby="about-story-title">
      <div class="container about-story-grid">
        <div class="about-story-heading reveal">
          <p class="about-eyebrow">OUR HERITAGE &amp; ORIGIN</p>
          <h2 id="about-story-title">Born from the Fundamental Units of Digital Innovation.</h2>
        </div>
        <div class="about-story-copy reveal">
          <p>Founded in 2014, our identity was built around two atomic building blocks of the digital world: the <strong>Pixel</strong> (the smallest element of visual design) and the <strong>Bit</strong> (the fundamental unit of computing code).</p>
          <p>We believe that truly great digital products require both: obsessive aesthetic craft and rock-solid architectural logic. Over the past decade, we have scaled from a specialized engineering team to a full-service digital agency operating across the United Arab Emirates and India, delivering over 150 successful software solutions.</p>
          <div class="about-values" aria-label="Our values">
            <div><span>01</span><h3>Design Precision</h3></div>
            <div><span>02</span><h3>Architectural Rigor</h3></div>
            <div><span>03</span><h3>Client Partnership</h3></div>
            <div><span>04</span><h3>Measurable Business Impact</h3></div>
          </div>
        </div>
      </div>
    </section>`;
aboutHtml = aboutHtml.replace(storyRegex, newStorySection);

// Update Locations Section in about-us.html
const locRegex = /<section class="about-locations"[\s\S]*?<\/section>/i;
const newLocSection = `
    <section class="about-locations" aria-labelledby="about-locations-title">
      <div class="container">
        <div class="about-locations-heading reveal">
          <div>
            <p class="about-eyebrow">WHERE WE WORK</p>
            <h2 id="about-locations-title">Global Presence, Local Expertise.</h2>
          </div>
          <p>Collaborating seamlessly with clients across Dubai, Abu Dhabi, Saudi Arabia, Qatar, India, Europe, and the US.</p>
        </div>
        <div class="about-location-grid">
          <article class="about-location reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); padding:32px; border-radius:12px;">
            <p class="about-location-region" style="color:var(--baby-blue); font-weight:700;">UNITED ARAB EMIRATES</p>
            <h3 style="color:#fff; margin:8px 0 12px;">Dubai</h3>
            <p style="color:rgba(255,255,255,0.7); line-height:1.6; margin-bottom:16px;">IFZA Business Park, DDP, Dubai Silicon Oasis, Dubai, UAE</p>
            <p style="color:rgba(255,255,255,0.6); font-size:14px; margin-bottom:16px;">Tel: <a href="tel:+971585752242" style="color:#fff; text-decoration:none;">+971 58 575 2242</a></p>
            <a href="https://maps.google.com/?q=Dubai+Silicon+Oasis+Dubai" target="_blank" rel="noopener noreferrer" style="color:var(--baby-blue); text-decoration:none; font-weight:600;">Get directions <span aria-hidden="true">&rarr;</span></a>
          </article>
          <article class="about-location reveal reveal-delay-1" style="background:#111; border:1px solid rgba(255,255,255,0.08); padding:32px; border-radius:12px;">
            <p class="about-location-region" style="color:var(--baby-blue); font-weight:700;">INDIA</p>
            <h3 style="color:#fff; margin:8px 0 12px;">Kozhikode</h3>
            <p style="color:rgba(255,255,255,0.7); line-height:1.6; margin-bottom:16px;">2nd Floor, Sahya Building, Govt. Cyberpark, Kozhikode, Kerala, India</p>
            <p style="color:rgba(255,255,255,0.6); font-size:14px; margin-bottom:16px;">Tel: <a href="tel:+917560933933" style="color:#fff; text-decoration:none;">+91 7560 933 933</a></p>
            <a href="https://maps.google.com/?q=Govt+Cyberpark+Kozhikode+Kerala" target="_blank" rel="noopener noreferrer" style="color:var(--baby-blue); text-decoration:none; font-weight:600;">Get directions <span aria-hidden="true">&rarr;</span></a>
          </article>
        </div>
      </div>
    </section>`;
aboutHtml = aboutHtml.replace(locRegex, newLocSection);
fs.writeFileSync(aboutFile, aboutHtml, 'utf8');
console.log('Updated: pages/company/about-us.html');

// 3. Update Contact Page (pages/contact.html)
let contactHtml = fs.readFileSync(contactFile, 'utf8');

// Update direct contact info
contactHtml = contactHtml.replace(/<a href="mailto:whynexofficial@gmail.com">whynexofficial@gmail.com<\/a>/g, '<a href="mailto:contact@pixbitsolutions.com">contact@pixbitsolutions.com</a>');
contactHtml = contactHtml.replace(/<a href="tel:\+97430234954">\+974 3023 4954<\/a>/g, '<a href="tel:+971585752242">+971 58 575 2242</a>');

// Update Contact Offices Section
const contactOfficesRegex = /<section class="contact-offices"[\s\S]*?<\/section>/i;
const newContactOffices = `
    <section class="contact-offices" aria-labelledby="contact-offices-title">
      <div class="container">
        <div class="contact-offices-heading">
          <p class="contact-eyebrow">OUR LOCATIONS</p>
          <h2 id="contact-offices-title">Visit Our Studios.</h2>
        </div>
        <div class="contact-office-grid">
          <article class="contact-office" style="background:#111; border:1px solid rgba(255,255,255,0.08); padding:36px; border-radius:12px;">
            <p class="contact-office-region" style="color:var(--baby-blue); font-weight:700;">UNITED ARAB EMIRATES</p>
            <h3 style="color:#fff; margin:8px 0 12px;">Dubai</h3>
            <p style="color:rgba(255,255,255,0.7); line-height:1.6; margin-bottom:16px;">IFZA Business Park, DDP, Dubai Silicon Oasis, Dubai, UAE</p>
            <div class="contact-office-links" style="display:flex; flex-direction:column; gap:8px;">
              <a href="tel:+971585752242" style="color:#fff; text-decoration:none;">+971 58 575 2242</a>
              <a href="mailto:contact@pixbitsolutions.com" style="color:var(--baby-blue); text-decoration:none;">contact@pixbitsolutions.com</a>
              <a href="https://maps.google.com/?q=Dubai+Silicon+Oasis+Dubai" target="_blank" rel="noopener noreferrer" style="color:var(--baby-blue); text-decoration:none; margin-top:8px;">Open in Google Maps &rarr;</a>
            </div>
          </article>
          <article class="contact-office" style="background:#111; border:1px solid rgba(255,255,255,0.08); padding:36px; border-radius:12px;">
            <p class="contact-office-region" style="color:var(--baby-blue); font-weight:700;">INDIA</p>
            <h3 style="color:#fff; margin:8px 0 12px;">Kozhikode</h3>
            <p style="color:rgba(255,255,255,0.7); line-height:1.6; margin-bottom:16px;">2nd Floor, Sahya Building, Govt. Cyberpark, Kozhikode, Kerala, India</p>
            <div class="contact-office-links" style="display:flex; flex-direction:column; gap:8px;">
              <a href="tel:+917560933933" style="color:#fff; text-decoration:none;">+91 7560 933 933</a>
              <a href="mailto:sales@pixbitsolutions.com" style="color:var(--baby-blue); text-decoration:none;">sales@pixbitsolutions.com</a>
              <a href="https://maps.google.com/?q=Govt+Cyberpark+Kozhikode+Kerala" target="_blank" rel="noopener noreferrer" style="color:var(--baby-blue); text-decoration:none; margin-top:8px;">Open in Google Maps &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>`;

contactHtml = contactHtml.replace(contactOfficesRegex, newContactOffices);
fs.writeFileSync(contactFile, contactHtml, 'utf8');
console.log('Updated: pages/contact.html');
