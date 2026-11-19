const fs = require('fs');
const path = require('path');

const webDevPath = path.join(__dirname, '..', 'pages', 'services', 'web-development.html');
const content = fs.readFileSync(webDevPath, 'utf8');

const heroMarker = '<section class="ind-page-hero';
const faqScriptMarker = '<script defer src="../../js/faq.js">';

const startIndex = content.indexOf(heroMarker);
const endIndex = content.indexOf(faqScriptMarker);

const body = content.slice(startIndex, endIndex);

// Find all section tags and their classes
const sectionMatches = body.match(/<section[\s\S]*?>/gi);
console.log('Sections found:', sectionMatches);
