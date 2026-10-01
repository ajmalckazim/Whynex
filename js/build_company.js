const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname);
const indexHtmlPath = path.join(projectRoot, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const headerEndIdx = indexHtml.indexOf('<!-- ═══════════════════ HERO ═══════════════════ -->');
const footerStartIdx = indexHtml.indexOf('<!-- ═══════════════════ FOOTER ═══════════════════ -->');

let headAndHeader = indexHtml.substring(0, headerEndIdx).replace(/href="#/g, 'href="/index.html#');
let footerAndScripts = indexHtml.substring(footerStartIdx).replace(/href="#/g, 'href="/index.html#');

const companyDir = path.join(projectRoot, 'company');
if (!fs.existsSync(companyDir)) fs.mkdirSync(companyDir);

function writePage(destPath, title, desc, bodyContent) {
  const finalHtml = `
${headAndHeader
  .replace('<title>WHYNEX', `<title>${title} | WHYNEX`)}
${bodyContent}
${footerAndScripts}
`;
  fs.writeFileSync(destPath, finalHtml);
}

// 1. ABOUT US PAGE
const aboutBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .comp-hero p { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto; line-height: 1.8; }
  .about-stats {
    position: relative;
    padding: 96px 0 110px;
    background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);
    overflow: hidden;
  }
  .about-stats::before {
    content: "";
    position: absolute;
    inset: 10% 4% auto 4%;
    height: 220px;
    background: radial-gradient(circle, rgba(33, 116, 188, 0.12), transparent 65%);
    filter: blur(30px);
    pointer-events: none;
  }
  .stats-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 26px;
    text-align: center;
  }
  .stat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 260px;
    padding: 36px 28px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(121, 141, 158, 0.18);
    border-radius: 22px;
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
    backdrop-filter: blur(8px);
    overflow: hidden;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    animation: floatCard 0.8s ease both;
  }
  .stat-card:nth-child(2) { animation-delay: 0.08s; }
  .stat-card:nth-child(3) { animation-delay: 0.16s; }
  .stat-card:nth-child(4) { animation-delay: 0.24s; }
  .stat-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(14, 165, 233, 0.02), transparent 80%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .stat-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 28px 48px rgba(15, 23, 42, 0.12);
    border-color: rgba(37, 99, 235, 0.25);
  }
  .stat-card:hover::before { opacity: 1; }
  .stat-card h3 {
    position: relative;
    z-index: 1;
    margin: 0 0 22px;
    font-size: clamp(3.1rem, 4vw, 5rem);
    line-height: 0.9;
    color: var(--deep-blue);
    font-weight: 900;
    letter-spacing: -0.05em;
  }
  .stat-card p {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: clamp(1.05rem, 1.7vw, 1.5rem);
    font-weight: 500;
    line-height: 1.25;
    color: var(--neutral-700);
    white-space: pre-line;
  }
  @keyframes floatCard {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 560px) {
    .about-stats { padding: 72px 0 88px; }
    .stats-grid { grid-template-columns: 1fr; }
    .stat-card { min-height: 220px; }
  }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > About Us</div>
    <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">ABOUT US</div>
    <h1>Building Digital Experiences That Move Businesses Forward</h1>
    <p>We are a creative technology and digital solutions company helping businesses transform ideas into powerful digital experiences. We combine strategy, creativity, technology and marketing to build solutions designed for measurable business growth.</p>
  </div>
</section>
<section class="about-stats">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-card reveal"><h3 class="stat-number" data-target="250">0</h3><p>Projects
        Completed</p></div>
      <div class="stat-card reveal reveal-delay-1"><h3 class="stat-number" data-target="180">0</h3><p>Happy
        Clients</p></div>
      <div class="stat-card reveal reveal-delay-2"><h3 class="stat-number" data-target="12">0</h3><p>Countries
        Served</p></div>
      <div class="stat-card reveal reveal-delay-3"><h3 class="stat-number" data-target="10">0</h3><p>Years
        Experience</p></div>
    </div>
  </div>
</section>
<section style="padding:120px 0;">
  <div class="container" style="display:grid; grid-template-columns:1fr 1fr; gap:64px;">
    <div class="reveal">
      <div class="eyebrow">Our Story</div>
      <h2>Driven by Innovation</h2>
      <p style="margin-top:24px; color:var(--neutral-600); line-height:1.8;">Founded with a vision to redefine digital experiences, we have grown into a global agency. Our mission is to empower businesses with cutting-edge technology and creative marketing.</p>
    </div>
    <div class="reveal">
      <div class="eyebrow">Our Values</div>
      <h2>What We Stand For</h2>
      <ul style="margin-top:24px; color:var(--neutral-600); line-height:1.8; list-style:circle; padding-left:20px;">
        <li>Transparency and Integrity</li>
        <li>Continuous Innovation</li>
        <li>Client-Centric Approach</li>
        <li>Excellence in Execution</li>
      </ul>
    </div>
  </div>
</section>
`;

writePage(path.join(companyDir, 'about-us.html'), 'About Us', 'Learn about our digital agency.', aboutBody);

// 2. OUR TEAM PAGE
const teamBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .comp-hero p { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto; line-height: 1.8; }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; padding: 100px 0; }
  .team-card { background: var(--neutral-50); border-radius: 20px; overflow: hidden; border: 1px solid var(--neutral-200); transition: transform 0.3s; }
  .team-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
  .team-img { width: 100%; aspect-ratio: 1; background: var(--neutral-200); }
  .team-info { padding: 24px; text-align: center; }
  .team-name { font-size: 1.25rem; font-weight: 800; color: var(--black); }
  .team-role { font-size: 0.9rem; color: var(--deep-blue); font-weight: 600; margin: 8px 0; }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Our Team</div>
    <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">OUR TEAM</div>
    <h1>Meet the People Behind the Ideas</h1>
    <p>Great digital products are created by talented people working together. Meet the strategists, designers, developers and marketers who turn ambitious ideas into meaningful digital experiences.</p>
  </div>
</section>
<section class="team-grid container">
  ${[1,2,3,4,5,6,7,8].map(i => `
    <div class="team-card reveal">
      <div class="team-img"></div>
      <div class="team-info">
        <div class="team-name">Team Member ${i}</div>
        <div class="team-role">Specialist Position</div>
        <p style="font-size:14px; color:var(--neutral-600); margin-top:12px;">Passionate about creating exceptional digital experiences.</p>
      </div>
    </div>
  `).join('')}
</section>
`;

writePage(path.join(companyDir, 'our-team.html'), 'Our Team', 'Meet the team.', teamBody);

// 3. CAREERS PAGE
const careersBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .comp-hero p { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto; line-height: 1.8; }
  .job-card { display:flex; justify-content:space-between; align-items:center; padding:32px; background:var(--white); border:1px solid var(--neutral-200); border-radius:16px; margin-bottom:16px; transition:0.3s; }
  .job-card:hover { border-color:var(--black); transform:translateX(8px); }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Careers</div>
    <div class="cta-eyebrow" style="color:var(--baby-blue); margin-bottom:24px;">BUILD YOUR FUTURE WITH US</div>
    <h1>Do Meaningful Work. Create. Learn. Grow.</h1>
    <p>Join a team of passionate creators, innovators, and problem-solvers.</p>
  </div>
</section>
<section style="padding:100px 0; background:var(--neutral-50);">
  <div class="container">
    <div class="sh text-center reveal">
      <div class="eyebrow">Open Positions</div>
      <h2>Join Our Team</h2>
    </div>
    <div class="reveal">
      ${['Senior Frontend Engineer', 'UI/UX Designer', 'Digital Marketing Specialist', 'Project Manager'].map(job => `
        <div class="job-card">
          <div>
            <h3 style="font-size:1.5rem; margin-bottom:8px;">${job}</h3>
            <div style="font-size:14px; color:var(--neutral-600);">Remote / Full-Time</div>
          </div>
          <a href="#" class="btn btn-dark">View Position</a>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`;

writePage(path.join(companyDir, 'careers.html'), 'Careers', 'Join our team.', careersBody);

// 4. LIFE AT COMPANY
const lifeBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .masonry { column-count: 3; column-gap: 24px; padding: 100px 0; }
  .masonry-item { break-inside: avoid; margin-bottom: 24px; background: var(--neutral-200); border-radius: 16px; min-height: 200px; display:flex; align-items:center; justify-content:center; color:var(--neutral-600); }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Life at Company</div>
    <h1>More Than Just a Workplace</h1>
    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">Discover our culture, celebrations, and the vibrant environment that fuels our creativity.</p>
  </div>
</section>
<div class="container masonry">
  ${[300, 250, 400, 350, 200, 450, 250, 300].map(h => `<div class="masonry-item reveal" style="height:${h}px;">Gallery Image</div>`).join('')}
</div>
`;

writePage(path.join(companyDir, 'life-at-company.html'), 'Life at Company', 'Our culture.', lifeBody);

// 5. WHY CHOOSE US
const whyBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .why-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 100px 0; }
  .why-c { padding: 40px; background: var(--neutral-50); border-radius: 20px; border: 1px solid var(--neutral-200); transition:0.3s; }
  .why-c:hover { background: var(--black); color: var(--white); transform:translateY(-8px); }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Why Choose Us</div>
    <h1>Why Businesses Choose Us</h1>
    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">We combine strategy, creativity, and technology to deliver outstanding results.</p>
  </div>
</section>
<section class="container why-cards">
  ${['Strategy First', 'Creative Thinking', 'Modern Technology', 'Experienced Team', 'Transparent Communication', 'Scalable Solutions'].map(w => `
    <div class="why-c reveal">
      <h3 style="font-size:1.4rem; margin-bottom:16px;">${w}</h3>
      <p style="font-size:1rem; opacity:0.8;">Delivering robust and future-proof digital solutions tailored for your enterprise.</p>
    </div>
  `).join('')}
</section>
`;

writePage(path.join(companyDir, 'why-choose-us.html'), 'Why Choose Us', 'Why work with us.', whyBody);

// 6. OUR PROCESS
const processBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .timeline { max-width: 800px; margin: 100px auto; position: relative; }
  .timeline::before { content:''; position:absolute; left:40px; top:0; bottom:0; width:2px; background:var(--neutral-200); }
  .time-step { position:relative; padding-left:100px; margin-bottom:48px; }
  .time-num { position:absolute; left:16px; top:0; width:48px; height:48px; background:var(--deep-blue); color:var(--white); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; border:4px solid var(--white); }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Our Process</div>
    <h1>From Idea to Digital Reality</h1>
  </div>
</section>
<section class="container timeline">
  ${['Discovery', 'Research', 'Strategy', 'UI/UX Design', 'Development', 'Testing', 'Launch', 'Growth & Support'].map((p, i) => `
    <div class="time-step reveal">
      <div class="time-num">0${i+1}</div>
      <h3>${p}</h3>
      <p style="color:var(--neutral-600); margin-top:8px;">Executing rigorous workflows to guarantee quality and performance at every phase.</p>
    </div>
  `).join('')}
</section>
`;

writePage(path.join(companyDir, 'our-process.html'), 'Our Process', 'How we work.', processBody);

// 7. TESTIMONIALS
const testBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .test-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:32px; padding:100px 0; }
  .test-c { padding:40px; background:var(--white); border:1px solid var(--neutral-200); border-radius:24px; }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Company > Testimonials</div>
    <h1>Trusted by Businesses. Built on Results.</h1>
  </div>
</section>
<section class="container test-grid">
  ${[1,2,3,4].map(i => `
    <div class="test-c reveal">
      <div style="color:var(--deep-blue); font-size:40px; line-height:1; margin-bottom:16px;">"</div>
      <p style="font-size:1.1rem; color:var(--neutral-600); font-style:italic; margin-bottom:24px;">An absolutely phenomenal partner for our digital transformation journey. They delivered beyond expectations.</p>
      <div style="font-weight:700;">Client ${i}</div>
      <div style="font-size:13px; color:var(--neutral-400);">CEO, Company ${i}</div>
    </div>
  `).join('')}
</section>
`;

writePage(path.join(companyDir, 'testimonials.html'), 'Testimonials', 'What our clients say.', testBody);

// 8. CONTACT PAGE (Root)
const contactBody = `
<style>
  .comp-hero { background: var(--black); padding: 200px 0 120px; color: var(--white); text-align: center; }
  .comp-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 24px; }
  .contact-wrap { display:grid; grid-template-columns:1fr 1fr; gap:64px; padding:100px 0; }
</style>
<section class="comp-hero reveal">
  <div class="container">
    <div class="breadcrumb" style="justify-content:center; color:rgba(255,255,255,0.5); font-size:13px; margin-bottom:32px;">Home > Contact Us</div>
    <h1>LET'S CREATE SOMETHING GREAT</h1>
  </div>
</section>
<section class="container contact-wrap">
  <div class="reveal">
    <h2>Let's Talk About Your Project</h2>
    <p style="color:var(--neutral-600); margin:24px 0;">We would love to hear from you. Reach out to us via email or phone, or drop by our office.</p>
    <div style="margin-bottom:16px;"><strong>Email:</strong> hello@whynex.com</div>
    <div style="margin-bottom:16px;"><strong>Phone:</strong> +974 0000 0000</div>
    <div style="margin-bottom:16px;"><strong>Office:</strong> Doha, Qatar</div>
  </div>
  <div class="reveal" style="background:var(--neutral-50); padding:40px; border-radius:24px;">
    <form>
      <div style="margin-bottom:16px;"><input type="text" placeholder="Full Name" style="width:100%; padding:14px; border:1px solid var(--neutral-200); border-radius:8px;"></div>
      <div style="margin-bottom:16px;"><input type="email" placeholder="Email Address" style="width:100%; padding:14px; border:1px solid var(--neutral-200); border-radius:8px;"></div>
      <div style="margin-bottom:16px;"><textarea placeholder="Project Description" style="width:100%; padding:14px; border:1px solid var(--neutral-200); border-radius:8px; height:120px;"></textarea></div>
      <button class="btn btn-dark" style="width:100%; justify-content:center;">Send Enquiry</button>
    </form>
  </div>
</section>
`;

writePage(path.join(projectRoot, 'contact.html'), 'Contact Us', 'Get in touch.', contactBody);

console.log('Successfully generated company pages and contact.html.');
