const fs = require('fs');
const content = fs.readFileSync('c:/Users/ajmal/OneDrive/Desktop/whynex/pages/index.html', 'utf8');

const heroMatch = content.match(/<section[^>]*id="hero"[^>]*>([\s\S]*?)<\/section>/i);
if (heroMatch) {
  console.log('=== HERO SECTION ===');
  console.log(heroMatch[0].slice(0, 400));
}

const statsMatch = content.match(/<section[^>]*id="stats"[^>]*>([\s\S]*?)<\/section>/i);
if (statsMatch) {
  console.log('=== STATS SECTION ===');
  console.log(statsMatch[0].slice(0, 400));
}

const servicesMatch = content.match(/<section[^>]*id="services"[^>]*>([\s\S]*?)<\/section>/i);
if (servicesMatch) {
  console.log('=== SERVICES SECTION ===');
  console.log(servicesMatch[0].slice(0, 400));
}
