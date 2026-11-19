// scripts/fix-broken-links.js
const fs = require('fs');
const path = require('path');

// 1. Fix contact.html: replace ../services/ with services/, ../industries/ with industries/, ../company/ with company/
const contactPath = path.join(__dirname, '..', 'pages', 'contact.html');
let contact = fs.readFileSync(contactPath, 'utf8');

contact = contact.replace(/href="\.\.\/services\//g, 'href="services/');
contact = contact.replace(/href="\.\.\/industries\//g, 'href="industries/');
contact = contact.replace(/href="\.\.\/company\//g, 'href="company/');
contact = contact.replace(/href="\.\.\/portfolio\//g, 'href="portfolio/');
contact = contact.replace(/href="\.\.\/case-studies\//g, 'href="case-studies/');
contact = contact.replace(/href="\.\.\/blogs\//g, 'href="blogs/');
contact = contact.replace(/href="\.\.\/contact\.html"/g, 'href="contact.html"');
contact = contact.replace(/href="\.\.\/index\.html"/g, 'href="index.html"');

fs.writeFileSync(contactPath, contact, 'utf8');
console.log('Fixed links in pages/contact.html');

// 2. Fix company/our-team.html
const teamPath = path.join(__dirname, '..', 'pages', 'company', 'our-team.html');
let team = fs.readFileSync(teamPath, 'utf8');

team = team.replace(/href="\.\.\/services\/mobile-app-development\.html"/g, 'href="../services/mobile-application.html"');
team = team.replace(/href="\.\.\/services\/branding-creative\.html"/g, 'href="../services/brand-consulting.html"');
team = team.replace(/href="\.\.\/services\/seo\.html"/g, 'href="../services/search-engine-optimization.html"');
team = team.replace(/href="\.\.\/services\/ecommerce-solutions\.html"/g, 'href="../services/e-commerce.html"');
team = team.replace(/href="\.\.\/services\/cloud-it-solutions\.html"/g, 'href="../services/cloud-consulting-services.html"');
team = team.replace(/href="\.\.\/services\/software-crm\.html"/g, 'href="../services/crm-application.html"');

fs.writeFileSync(teamPath, team, 'utf8');
console.log('Fixed links in pages/company/our-team.html');
