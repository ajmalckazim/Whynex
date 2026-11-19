// scripts/update-process-and-why.js
const fs = require('fs');
const path = require('path');

const companyDir = path.join(__dirname, '..', 'pages', 'company');

// 1. Update our-process.html
const procFile = path.join(companyDir, 'our-process.html');
let procHtml = fs.readFileSync(procFile, 'utf8');

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Requirement Analysis',
    desc: 'We begin by conducting thorough stakeholder workshops to analyze your business goals, target audience personas, operational workflows, and functional requirements. We map out technical constraints and define measurable KPIs for project success.'
  },
  {
    num: '02',
    title: 'Market Research & Tech Stack Selection',
    desc: 'Our architects evaluate competing solutions and select the optimal technology stack (backend frameworks, frontend libraries, databases, and cloud infrastructure) ensuring long-term scalability, low latency, and maintainability.'
  },
  {
    num: '03',
    title: 'Product Strategy & Architecture Planning',
    desc: 'We produce detailed software architecture specifications, entity-relationship diagrams (ERDs), API contract blueprints, and cloud topology maps that serve as the definitive technical blueprint before coding starts.'
  },
  {
    num: '04',
    title: 'UI/UX Wireframing & Interactive Prototyping',
    desc: 'Our design team creates low-fidelity wireframes followed by high-fidelity clickable Figma prototypes. We test navigation flows and usability with real users to ensure intuitive, frictionless interactions.'
  },
  {
    num: '05',
    title: 'Agile Frontend & Backend Development',
    desc: 'Development proceeds in transparent two-week sprints following Clean Code and MVVM/microservices design patterns. You receive weekly staging deployments, sprint demos, and direct access to progress tracking via Jira and Slack.'
  },
  {
    num: '06',
    title: 'Rigorous Quality Assurance & Security Testing',
    desc: 'Our dedicated QA team conducts automated unit testing, end-to-end integration tests, cross-browser compatibility tests, OWASP security vulnerability assessments, and simulated load testing to ensure zero regression.'
  },
  {
    num: '07',
    title: 'Cloud Deployment & Launch Staging',
    desc: 'We manage production release engineering on AWS, GCP, or Azure with automated CI/CD pipelines, container orchestration, SSL certificates, CDN caching, and automated DNS propagation for zero-downtime go-lives.'
  },
  {
    num: '08',
    title: 'Continuous Monitoring & 24/7 SLA Support',
    desc: 'Post-launch, we provide real-time server telemetry, automated error alerting, continuous security patching, database optimization, and ongoing feature enhancement sprints to keep your application ahead of the market.'
  }
];

const newStepsHtml = processSteps.map(s => `
    <div class="time-step reveal">
      <div class="time-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p style="color:var(--neutral-600); margin-top:8px; line-height:1.65; font-size:14px;">${s.desc}</p>
    </div>`).join('\n');

const timeLineRegex = /<section class="container timeline">[\s\S]*?<\/section>/i;
const newTimelineSection = `
  <section class="container timeline">
${newStepsHtml}
  </section>`;

procHtml = procHtml.replace(timeLineRegex, newTimelineSection);
fs.writeFileSync(procFile, procHtml, 'utf8');
console.log('Updated: pages/company/our-process.html');

// 2. Update why-choose-us.html
const whyFile = path.join(companyDir, 'why-choose-us.html');
let whyHtml = fs.readFileSync(whyFile, 'utf8');

const whyCards = [
  {
    title: 'Strategy & Architecture First',
    desc: 'We never write code blindly. Every project begins with rigorous business logic analysis, system architecture mapping, and user journey optimization to ensure maximum return on technology investment.'
  },
  {
    title: 'Human-Centric Design Craft',
    desc: 'Our design studio creates bespoke Figma design systems, fluid micro-interactions, and accessible UI/UX that transform complex enterprise workflows into intuitive, delightful experiences.'
  },
  {
    title: 'Modern Full-Stack Engineering',
    desc: 'We build on modern, robust frameworks including Laravel, Node.js, React, Next.js, and Flutter. Our codebases are modular, fully documented, and engineered for high-concurrency cloud scale.'
  },
  {
    title: '10+ Years of Proven Delivery',
    desc: 'With over 150 successfully launched web, mobile, and enterprise platforms across 15+ countries, we bring mature engineering standards, battle-tested processes, and zero guesswork.'
  },
  {
    title: 'Transparent Agile Collaboration',
    desc: 'No black-box development. You have direct access to sprint backlogs in Jira, weekly staging demonstrations, real-time Slack channels, and clear milestone deliverables.'
  },
  {
    title: 'Reliable Cloud Infrastructure & SLAs',
    desc: 'We architect for 99.98% uptime with automated CI/CD deployment, multi-region redundancy on AWS/GCP, continuous security audits, and dedicated ongoing maintenance packages.'
  }
];

const newWhyCardsHtml = whyCards.map(w => `
    <div class="why-c reveal" style="background:#111; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:32px;">
      <h3 style="font-size:1.3rem; margin-bottom:14px; color:var(--baby-blue);">${w.title}</h3>
      <p style="font-size:0.95rem; color:rgba(255,255,255,0.75); line-height:1.7;">${w.desc}</p>
    </div>`).join('\n');

const whyCardsRegex = /<section class="container why-cards">[\s\S]*?<\/section>/i;
const newWhySection = `
  <section class="container why-cards">
${newWhyCardsHtml}
  </section>`;

whyHtml = whyHtml.replace(whyCardsRegex, newWhySection);
fs.writeFileSync(whyFile, whyHtml, 'utf8');
console.log('Updated: pages/company/why-choose-us.html');
