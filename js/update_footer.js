const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const newContent = `          <div>
            <div class="footer-col-title">Qatar</div>
            <div class="footer-links">
              <span class="footer-link" style="cursor:default;">The Square Mall, Izghawa, Qatar</span>
              <a href="tel:+97430234954" class="footer-link">+974 3023 4954</a>
              <a href="mailto:whynexofficial@gmail.com" class="footer-link">whynexofficial@gmail.com</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">🇮🇳 India</div>
            <div class="footer-links">
              <span class="footer-link" style="cursor:default;">Aishwarya, Sulthan Bathery, Wayanad, Kerala, India</span>
              <a href="tel:+919778536892" class="footer-link">+91 9778536892</a>
              <a href="mailto:whynexofficial@gmail.com" class="footer-link">whynexofficial@gmail.com</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Connect</div>
            <div class="social-links">
              <a href="https://www.instagram.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
              <a href="https://www.linkedin.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a href="https://www.snapchat.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on Snapchat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2C10 2 8.5 3 7.5 4.5C7.2 5 7 5.7 7 6.3V6.5C7 8.5 6 9 5 9C4.5 9 4 8.5 3.5 8C3 7.5 2.5 7.5 2 8C1 9 1 11.5 2 13C2.5 13.8 3 14 3.5 14C4 14 4 14.5 4 15V16C4 17 3.5 18 3 18H2.5C1.7 18 1 18.7 1 19.5C1 20.3 1.7 21 2.5 21H21.5C22.3 21 23 20.3 23 19.5C23 18.7 22.3 18 21.5 18H21C20.5 18 20 17 20 16V15C20 14.5 20 14 20.5 14C21 14 21.5 13.8 22 13C23 11.5 23 9 22 8C21.5 7.5 21 7.5 20.5 8C20 8.5 19.5 9 19 9C18 9 17 8.5 17 6.5V6.3C17 5.7 16.8 5 16.5 4.5C15.5 3 14 2 12 2Z" />
                </svg>
                Snapchat
              </a>
              <a href="https://www.x.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4l16 16m0-16L4 20" />
                </svg>
                X
              </a>
              <a href="https://www.youtube.com/whynex.co" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WHYNEX on YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
                YouTube
              </a>
            </div>
          </div>
        </div>`;

const pattern = /          <div>\s*<div class="footer-col-title">Company<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let matched = pattern.test(content);
            if (matched) {
                let newHtml = content.replace(pattern, newContent);
                fs.writeFileSync(fullPath, newHtml, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    });
}

walkDir(pagesDir);
