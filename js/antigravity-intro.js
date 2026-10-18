/**
 * WHYNEX - Cinematic Antigravity Loading Animation
 * Orchestrates entrance physics, impact shockwave, stardust particles,
 * zero-gravity floating, and seamless FLIP morph to the homepage hero.
 */
(function() {
  'use strict';

  // Config & State
  const SESSION_KEY = 'whynex_intro_viewed';
  const urlParams = new URLSearchParams(window.location.search);
  const isForceIntro = urlParams.has('intro') && urlParams.get('intro') !== 'false';
  const holdStage = urlParams.get('hold'); // 'descent', 'impact', 'float', 'morph'
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasViewedIntro = sessionStorage.getItem(SESSION_KEY) === 'true';

  // Expose replay function for testing / client review
  window.replayWhynexIntro = function() {
    sessionStorage.removeItem(SESSION_KEY);
    const url = new URL(window.location.href);
    url.searchParams.set('intro', 'true');
    window.location.href = url.toString();
  };

  // Immediate exit if already viewed or reduced motion preferred
  if (prefersReducedMotion || (hasViewedIntro && !isForceIntro && !holdStage)) {
    document.documentElement.classList.remove('whynex-intro-active', 'whynex-intro-revealing');
    const existingOverlay = document.getElementById('antigravity-intro');
    if (existingOverlay) {
      existingOverlay.style.display = 'none';
      existingOverlay.remove();
    }
    return;
  }

  // Ensure intro active class is present
  document.documentElement.classList.add('whynex-intro-active');

  // DOM Elements (resolved once DOM is interactive)
  let introOverlay, canvas, ctx, shockwave, imageStage, imageWrapper, introImg, auraGlow;
  let branding, skipBtn, progressFill, targetHeroImg;
  let animFrameId = null;
  let isTransitioning = false;
  let isCompleted = false;

  // Particle System
  const particles = [];
  const burstParticles = [];
  let canvasWidth = 0;
  let canvasHeight = 0;

  class AmbientParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -Math.random() * 0.3 - 0.05; // gentle upward drift
      this.radius = Math.random() * 1.6 + 0.6;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulse = Math.random() * Math.PI;
      this.color = Math.random() > 0.4 ? 'rgba(116, 144, 200, ' : 'rgba(255, 255, 255, ';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.12;

      if (this.y < -10) this.y = canvasHeight + 10;
      if (this.x < -10) this.x = canvasWidth + 10;
      if (this.x > canvasWidth + 10) this.x = -10;
    }
    draw(c) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color + Math.max(0, this.alpha) + ')';
      c.fill();
    }
  }

  class ImpactParticle {
    constructor(cx, cy) {
      this.x = cx;
      this.y = cy;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6.0 + 1.8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2.5 + 1.2;
      this.friction = 0.94;
      this.decay = Math.random() * 0.018 + 0.012;
      this.alpha = 1;
      
      const palette = [
        'rgba(116, 144, 200, ', // baby blue
        'rgba(100, 181, 246, ', // electric cyan
        'rgba(255, 255, 255, ', // pure white
        'rgba(42, 77, 119, '    // deep blue
      ];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.vx *= this.friction;
      this.vy = (this.vy * this.friction) - 0.04; // slight anti-gravity buoyancy
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw(c) {
      if (this.alpha <= 0) return;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color + Math.max(0, this.alpha) + ')';
      c.shadowBlur = 12;
      c.shadowColor = 'rgba(116, 144, 200, ' + this.alpha + ')';
      c.fill();
      c.shadowBlur = 0;
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
  }

  function initParticles() {
    resizeCanvas();
    particles.length = 0;
    const count = Math.min(Math.floor((canvasWidth * canvasHeight) / 18000), 50);
    for (let i = 0; i < count; i++) {
      particles.push(new AmbientParticle());
    }
  }

  function triggerImpactParticles(cx, cy) {
    const burstCount = 52;
    for (let i = 0; i < burstCount; i++) {
      burstParticles.push(new ImpactParticle(cx, cy));
    }
  }

  function animateParticles() {
    if (isCompleted || !ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw ambient stardust
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    // Draw & clean burst particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const bp = burstParticles[i];
      bp.update();
      bp.draw(ctx);
      if (bp.alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    animFrameId = requestAnimationFrame(animateParticles);
  }

  // Orchestrate the Cinematic Timeline
  function startIntroTimeline() {
    if (!introOverlay) return;

    // 1. Kick off particle engine
    initParticles();
    animFrameId = requestAnimationFrame(animateParticles);

    // 2. Start dramatic downward entrance from top
    imageWrapper.classList.add('descending');

    if (holdStage === 'descent') return;

    // 3. Impact moment: Image reaches hover altitude (~1.12s)
    setTimeout(() => {
      if (isTransitioning || isCompleted) return;

      // Trigger Shockwave ripple
      if (shockwave) {
        shockwave.classList.add('trigger');
      }

      // Trigger image aura back-glow
      if (auraGlow) {
        auraGlow.classList.add('glow-active');
      }

      // Trigger particle burst at the stage center
      const stageRect = imageStage.getBoundingClientRect();
      const cx = stageRect.left + stageRect.width / 2;
      const cy = stageRect.top + stageRect.height / 2;
      triggerImpactParticles(cx, cy);

      // Reveal branding & skip button
      if (branding) branding.classList.add('visible');
      if (skipBtn) skipBtn.classList.add('visible');
      if (progressFill) progressFill.style.width = '100%';

      if (holdStage === 'impact') return;
    }, 1120);

    // 4. Settle into weightless zero-gravity levitation (~1.28s)
    setTimeout(() => {
      if (isTransitioning || isCompleted) return;
      imageWrapper.classList.remove('descending');
      imageWrapper.classList.add('floating');

      if (holdStage === 'float') return;
    }, 1280);

    // 5. Seamless morph transition into homepage hero section (~2.9s)
    if (!holdStage) {
      setTimeout(() => {
        if (!isTransitioning && !isCompleted) {
          transitionToHomepage();
        }
      }, 2900);
    }
  }

  // Smooth FLIP Morph Transition to Homepage
  function transitionToHomepage() {
    if (isTransitioning || isCompleted) return;
    isTransitioning = true;

    targetHeroImg = document.querySelector('#hero .hero-static-image');
    if (!targetHeroImg || !introImg) {
      finalizeIntro();
      return;
    }

    // Measure target and current coordinates
    const introRect = introImg.getBoundingClientRect();
    const targetRect = targetHeroImg.getBoundingClientRect();

    // If target element is rendered and has positive dimensions
    if (targetRect.width > 0 && targetRect.height > 0 && introRect.width > 0) {
      const scale = targetRect.width / introRect.width;
      const deltaX = (targetRect.left + targetRect.width / 2) - (introRect.left + introRect.width / 2);
      const deltaY = (targetRect.top + targetRect.height / 2) - (introRect.top + introRect.height / 2);

      // Stop zero-gravity float oscillation to prevent coordinate fighting
      imageWrapper.classList.remove('floating');

      // Add revealing class to HTML so homepage header, left text, and canvas fade in
      document.documentElement.classList.add('whynex-intro-revealing');

      // Morph the intro image to the target hero image coordinates
      introImg.style.transition = 'transform 0.88s cubic-bezier(0.16, 1, 0.3, 1), filter 0.88s ease, opacity 0.88s ease';
      introImg.style.transform = 'translate3d(' + deltaX + 'px, ' + deltaY + 'px, 0) scale(' + scale + ')';
      introImg.style.filter = 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.45))';

      // Fade out background layers and branding smoothly
      if (branding) branding.style.opacity = '0';
      if (skipBtn) skipBtn.style.opacity = '0';
      if (auraGlow) auraGlow.style.opacity = '0';

      const bgLayer = introOverlay.querySelector('.intro-bg-layer');
      const gridPattern = introOverlay.querySelector('.intro-grid-pattern');
      const nebulas = introOverlay.querySelectorAll('.intro-ambient-nebula');
      if (bgLayer) bgLayer.style.opacity = '0';
      if (gridPattern) gridPattern.style.opacity = '0';
      nebulas.forEach(function(n) { n.style.opacity = '0'; });

      // After glide finishes (880ms), switch to native homepage hero image seamlessly
      setTimeout(function() {
        if (targetHeroImg) {
          targetHeroImg.style.opacity = '1';
        }
        finalizeIntro();
      }, 880);
    } else {
      finalizeIntro();
    }
  }

  // Final Cleanup & State persistence
  function finalizeIntro() {
    if (isCompleted) return;
    isCompleted = true;

    // Persist session visit
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    // Fade out overlay container
    if (introOverlay) {
      introOverlay.classList.add('intro-fade-out');
    }

    // Stop particle animation loop
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    // Remove active and revealing classes, restore native scrolling
    setTimeout(function() {
      document.documentElement.classList.remove('whynex-intro-active', 'whynex-intro-revealing');
      if (introOverlay) {
        introOverlay.style.display = 'none';
        introOverlay.setAttribute('aria-hidden', 'true');
      }
      // Guarantee target hero image is fully visible
      const heroStatic = document.querySelector('#hero .hero-static-image');
      if (heroStatic) {
        heroStatic.style.opacity = '1';
      }
    }, 450);
  }

  // Initialize once DOM elements are ready
  function init() {
    introOverlay = document.getElementById('antigravity-intro');
    if (!introOverlay) return;

    canvas = document.getElementById('intro-canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    shockwave = document.getElementById('intro-shockwave');
    imageStage = document.getElementById('intro-stage');
    imageWrapper = document.getElementById('intro-image-wrapper');
    introImg = document.getElementById('intro-hero-img');
    auraGlow = document.getElementById('intro-image-glow');
    branding = document.getElementById('intro-branding');
    skipBtn = document.getElementById('intro-skip-btn');
    progressFill = document.querySelector('.intro-progress-fill');

    // Skip button click handler
    if (skipBtn) {
      skipBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        transitionToHomepage();
      });
    }

    // Keyboard shortcut (Escape skips immediately)
    document.addEventListener('keydown', function(e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && !isCompleted) {
        transitionToHomepage();
      }
    });

    // Window resize handler for canvas
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Failsafe safety timeout (unless holding for inspection)
    if (!holdStage) {
      setTimeout(function() {
        if (!isCompleted) {
          transitionToHomepage();
        }
      }, 5500);
    }

    // If hero image is already cached/complete, start immediately, else await decode
    if (introImg.complete) {
      startIntroTimeline();
    } else {
      introImg.addEventListener('load', startIntroTimeline, { once: true });
      introImg.addEventListener('error', finalizeIntro, { once: true });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
