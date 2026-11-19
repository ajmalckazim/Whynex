/**
 * WHYNEX Premium Interactions & Motion Engine
 * Version 2.0 | Ultra-Premium UI & 3D Interactive Layer
 */
(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ──────────────────────────────────────────────────────────
     1. SMOOTH LUXURY PRELOADER
     (Reference: WHYNEX smooth loader)
     ────────────────────────────────────────────────────────── */
  function initPreloader() {
    if (isReducedMotion) return;

    let preloader = document.getElementById('px-preloader');
    if (!preloader) {
      preloader = document.createElement('div');
      preloader.id = 'px-preloader';
      preloader.setAttribute('aria-hidden', 'true');
      preloader.innerHTML = `
        <div class="px-loader-horizon">
          <div class="px-loader-node"></div>
        </div>
        <div class="px-loader-content">
          <h1 class="px-loader-title">WHYNEX</h1>
          <div class="px-loader-sub">— Flowing with the Future —</div>
          <div class="px-loader-bar">
            <div class="px-loader-bar-inner"></div>
          </div>
        </div>
      `;
      document.body.appendChild(preloader);
    }

    const startTime = Date.now();
    const MIN_DISPLAY_TIME = 900; // ensures smooth, premium branded transition

    const dismissPreloader = () => {
      if (!preloader || preloader.classList.contains('loaded')) return;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 900);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      dismissPreloader();
    } else {
      window.addEventListener('load', dismissPreloader);
      // Fallback timeout so preloader never traps the user
      setTimeout(dismissPreloader, 2200);
    }
  }

  /* ──────────────────────────────────────────────────────────
     2. DESKTOP CUSTOM CURSOR
     ────────────────────────────────────────────────────────── */
  function initCursor() {
    if (isTouch || isReducedMotion) return;

    const cursor = document.createElement('div');
    cursor.className = 'px-cursor';
    const ring = document.createElement('div');
    ring.className = 'px-cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .service-card, .chal-card, .sol-card, .cs-card, .pf-card, .faq-q, .about-location';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('hovered');
        ring.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('hovered');
        ring.classList.remove('hovered');
      }
    });
  }

  /* ──────────────────────────────────────────────────────────
     3. 3D CARD TILT EFFECT
     ────────────────────────────────────────────────────────── */
  function init3DTilt() {
    if (isTouch || isReducedMotion) return;

    const cards = document.querySelectorAll('.service-card, .chal-card, .sol-card, .cs-card, .pf-card, .about-location, [data-tilt]');
    
    cards.forEach((card) => {
      let bounds;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      card.addEventListener('mouseenter', () => {
        updateBounds();
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.35s ease';
      });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) updateBounds();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = mouseX / bounds.width - 0.5;
        const yPct = mouseY / bounds.height - 0.5;

        const tiltX = (yPct * -12).toFixed(2);
        const tiltY = (xPct * 12).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     4. MAGNETIC BUTTON EFFECT
     ────────────────────────────────────────────────────────── */
  function initMagneticButtons() {
    if (isTouch || isReducedMotion) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-dark, #back-to-top');

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     5. ENHANCED SCROLL REVEAL & HEADINGS
     ────────────────────────────────────────────────────────── */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .sh h2, .section-head h2');
    if (!revealElements.length) return;

    if (isReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => {
        el.classList.add('visible', 'reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ──────────────────────────────────────────────────────────
     6. SUBTLE PARALLAX SCROLLING
     ────────────────────────────────────────────────────────── */
  function initParallax() {
    if (isTouch || isReducedMotion) return;

    const heroes = document.querySelectorAll('.ind-page-hero, #hero, .page-hero');
    if (!heroes.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY < 800) {
            heroes.forEach((h) => {
              h.style.backgroundPositionY = `${scrollY * 0.25}px`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────────────────
     7. FORM MICRO-INTERACTIONS
     ────────────────────────────────────────────────────────── */
  function initFormInteractions() {
    const inputs = document.querySelectorAll('input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select');
    inputs.forEach((input) => {
      const parent = input.closest('.form-group') || input.parentElement;
      if (!parent) return;

      input.addEventListener('focus', () => {
        parent.classList.add('is-focused');
      });

      input.addEventListener('blur', () => {
        parent.classList.remove('is-focused');
        if (input.value && input.value.trim().length > 0) {
          parent.classList.add('has-value');
        } else {
          parent.classList.remove('has-value');
        }
      });

      if (input.value && input.value.trim().length > 0) {
        parent.classList.add('has-value');
      }
    });
  }

  /* ──────────────────────────────────────────────────────────
     8. INITIALIZATION RUNNER
     ────────────────────────────────────────────────────────── */
  function initAll() {
    initPreloader();
    initCursor();
    init3DTilt();
    initMagneticButtons();
    initScrollReveals();
    initParallax();
    initFormInteractions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
