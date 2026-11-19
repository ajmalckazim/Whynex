const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'pages', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const oldStatsRegex = /<section id="stats" aria-label="Company statistics">[\s\S]*?<\/section>/i;
const newStatsSection = `  <section id="stats" aria-label="Company statistics">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item reveal">
          <div class="stat-number" data-target="10"><span class="counter">0</span><span class="plus">+</span></div>
          <div class="stat-label">Years of Innovation</div>
        </div>
        <div class="stat-item reveal reveal-delay-1">
          <div class="stat-number" data-target="150"><span class="counter">0</span><span class="plus">+</span></div>
          <div class="stat-label">Projects Completed</div>
        </div>
        <div class="stat-item reveal reveal-delay-2">
          <div class="stat-number" data-target="100"><span class="counter">0</span><span class="plus">+</span></div>
          <div class="stat-label">Happy Clients</div>
        </div>
        <div class="stat-item reveal reveal-delay-3">
          <div class="stat-number" data-target="15"><span class="counter">0</span><span class="plus">+</span></div>
          <div class="stat-label">Countries Served</div>
        </div>
      </div>
    </div>
  </section>`;

indexHtml = indexHtml.replace(oldStatsRegex, newStatsSection);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully updated stats grid in pages/index.html!');
