const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\ajmal\\OneDrive\\Desktop\\Whynex\\Whynex\\Whynex\\pages';
const marker = "    /* ══════════════════════════════════════\n       ANIMATIONS (fade-up)\n    ══════════════════════════════════════ */";

const css = `
    /* ══════════════════════════════════════
       FOOTER
    ══════════════════════════════════════ */
    #footer {
      background: #050505;
      color: #ffffff;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-top {
      padding: 64px 0 24px;
    }

    .footer-layout {
      display: grid;
      grid-template-columns: 0.9fr 1.8fr;
      gap: 56px;
      align-items: start;
    }

    .footer-brand {
      max-width: 360px;
      padding-right: 28px;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-brand-logo {
      display: inline-block;
      margin-bottom: 16px;
    }

    .footer-brand-logo img {
      display: block;
      width: 220px;
      height: auto;
      filter: brightness(0) invert(1);
    }

    .footer-brand-heading {
      font-size: 20px;
      line-height: 1.35;
      font-weight: 700;
      color: var(--white);
      margin: 0 0 10px;
      letter-spacing: -0.03em;
    }

    .footer-brand-copy {
      font-size: 13px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.48);
      margin: 0 0 20px;
      max-width: 270px;
    }

    .footer-form {
      display: flex;
      gap: 8px;
      margin-bottom: 18px;
    }

    .footer-form input {
      width: 100%;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--white);
      font-size: 13px;
      font-family: var(--font);
      outline: none;
      transition: var(--transition);
    }

    .footer-form input::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }

    .footer-form input:focus {
      border-color: var(--baby-blue);
    }

    .footer-cta {
      width: 100%;
      padding: 13px 18px;
      background: var(--white);
      color: var(--black);
      border: none;
      font-family: var(--font);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: var(--transition);
    }

    .footer-cta:hover {
      background: var(--baby-blue);
      transform: translateY(-1px);
    }

    .footer-socials {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }

    .footer-socials a {
      width: 32px;
      height: 32px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.64);
      transition: var(--transition);
    }

    .footer-socials a:hover {
      color: var(--black);
      background: var(--baby-blue);
      border-color: var(--baby-blue);
    }

    .footer-socials svg {
      width: 14px;
      height: 14px;
    }

    .footer-main {
      width: 100%;
    }

    .footer-main-title {
      font-size: clamp(2.5rem, 4vw, 5rem);
      line-height: 1.12;
      font-weight: 400;
      letter-spacing: -0.05em;
      color: var(--white);
      margin: 0 0 28px;
      font-style: normal;
      font-family: var(--font);
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(150px, 1fr));
      gap: 22px 24px;
    }

    .footer-column {
      min-width: 0;
    }

    .footer-col-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.66);
      margin-bottom: 16px;
    }

    .footer-links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-links-list li,
    .footer-links-list a,
    .footer-links-list span {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.42);
      line-height: 1.7;
      text-decoration: none;
      transition: var(--transition);
    }

    .footer-links-list a:hover {
      color: var(--baby-blue);
    }

    .footer-locations {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer-country {
      min-width: 0;
    }

    .footer-country-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.72);
      margin-bottom: 14px;
    }

    .footer-country p,
    .footer-country a {
      display: block;
      font-size: 12px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.42);
      text-decoration: none;
      margin: 0 0 4px;
    }

    .footer-country a:hover {
      color: var(--baby-blue);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px 0;
    }

    .footer-bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-copy {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.28);
    }

    .footer-legal {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .footer-legal a {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.28);
      transition: color var(--transition);
      text-decoration: none;
    }

    .footer-legal a:hover {
      color: var(--baby-blue);
    }

    @media (max-width: 1000px) {
      .footer-layout {
        grid-template-columns: 1fr;
      }

      .footer-brand {
        max-width: none;
        border-right: none;
        padding-right: 0;
      }

      .footer-links-grid {
        grid-template-columns: repeat(2, minmax(140px, 1fr));
      }
    }

    @media (max-width: 640px) {
      .footer-top {
        padding-top: 48px;
      }

      .footer-brand-logo img {
        width: 180px;
      }

      .footer-links-grid,
      .footer-locations {
        grid-template-columns: 1fr;
      }

      .footer-form {
        flex-direction: column;
      }
    }

    /* ══════════════════════════════════════
       ANIMATIONS (fade-up)
    ══════════════════════════════════════ */`;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.isFile() && full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(root);
let updated = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  if (!text.includes('footer-main-title')) {
    continue;
  }
  if (!text.includes('AnIMATIONS (fade-up)')) {
    // no-op
  }
  const inserted = text.replace(marker, css);
  if (inserted !== text) {
    fs.writeFileSync(file, inserted, 'utf8');
    updated += 1;
  }
}

console.log(`Inserted footer CSS into ${updated} HTML pages.`);
