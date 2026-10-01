'use strict';

    /* ── Header scroll ── */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ── Hamburger / mobile nav ── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    hamburger.setAttribute('aria-controls', mobileNav.id);

    function closeMobileNav() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close mobile nav when link clicked */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
        hamburger.focus();
      }
    });

    /* ── Mobile accordion ── */
    const accs = [
      ['acc-services', 'acc-services-content'],
      ['acc-industries', 'acc-industries-content'],
      ['acc-company', 'acc-company-content']
    ];
    accs.forEach(([triggerId, contentId]) => {
      const trigger = document.getElementById(triggerId);
      const content = document.getElementById(contentId);
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.classList.toggle('open-acc', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
        content.classList.toggle('open', isOpen);
        content.setAttribute('aria-hidden', String(!isOpen));
        content.inert = !isOpen;
      });
    });

    /* ── Particles canvas ── */
    (function () {
      const canvas = document.getElementById('particles-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let W, H, particles = [], animId;

      function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      function rand(a, b) { return a + Math.random() * (b - a); }

      for (let i = 0; i < 80; i++) {
        particles.push({
          x: rand(0, W), y: rand(0, H),
          vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3),
          r: rand(1, 2.5),
          a: rand(0.1, 0.5)
        });
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(169,221,245,${p.a})`;
          ctx.fill();
        });
        // connections
        particles.forEach((a, i) => {
          particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(169,221,245,${0.08 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
        animId = requestAnimationFrame(draw);
      }
      draw();
    })();

    /* ── Intersection Observer for reveal + counters + process ── */
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* Counter animation */
    function animateCounter(el, target, duration = 1800) {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }

    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          const counter = entry.target.querySelector('.counter');
          animateCounter(counter, target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number[data-target]').forEach(el => counterIO.observe(el));

    /* Process steps */
    const processIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const steps = entry.target.querySelectorAll('.process-step');
          steps.forEach((step, i) => {
            setTimeout(() => step.classList.add('visible'), i * 150);
          });
          processIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    const processTimeline = document.getElementById('process-timeline');
    if (processTimeline) processIO.observe(processTimeline);

    /* ── Case Studies Slider ── */
    (function () {
      const slider = document.getElementById('cs-slider');
      const dots = document.querySelectorAll('#cs-progress .cs-dot');
      const prevBtn = document.getElementById('cs-prev');
      const nextBtn = document.getElementById('cs-next');
      if (!slider) return;

      let current = 0;
      let isDragging = false, startX = 0, scrollLeft = 0;
      const cards = slider.querySelectorAll('.cs-card');
      const total = cards.length;

      function getCardWidth() {
        const card = cards[0];
        return card.offsetWidth + 24; // gap
      }

      function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        const offset = current * getCardWidth();
        slider.style.transform = `translateX(-${offset}px)`;
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === current);
          d.setAttribute('aria-pressed', String(i === current));
        });
      }

      prevBtn.addEventListener('click', () => goTo(current - 1));
      nextBtn.addEventListener('click', () => goTo(current + 1));
      dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

      // Drag
      slider.addEventListener('mousedown', e => {
        isDragging = true; startX = e.pageX;
        slider.classList.add('grabbing');
      });
      window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const diff = startX - e.pageX;
        if (Math.abs(diff) > 60) {
          isDragging = false;
          slider.classList.remove('grabbing');
          goTo(diff > 0 ? current + 1 : current - 1);
        }
      });
      window.addEventListener('mouseup', () => {
        isDragging = false;
        slider.classList.remove('grabbing');
      });

      // Touch
      let touchStartX = 0;
      slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      }, { passive: true });

      window.addEventListener('resize', () => goTo(current), { passive: true });
    })();

    /* ── Portfolio Filter ── */
    (function () {
      const filters = document.querySelectorAll('.pf-filter');
      const cards = document.querySelectorAll('.pf-card');

      filters.forEach(btn => {
        btn.addEventListener('click', () => {
          filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const filter = btn.dataset.filter;
          cards.forEach(card => {
            const match = filter === 'all' || card.dataset.cat === filter;
            card.style.opacity = match ? '1' : '0';
            card.style.transform = match ? 'scale(1)' : 'scale(0.95)';
            card.style.pointerEvents = match ? 'auto' : 'none';
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            // Layout reflow for smoother animation
            setTimeout(() => {
              card.style.display = match ? '' : 'none';
            }, match ? 0 : 350);
            if (match) card.style.display = '';
          });
        });
      });
    })();

    /* ── Contact Form Validation ── */
    (function () {
      const form = document.getElementById('contact-form');
      const successMsg = document.getElementById('form-success');
      if (!form) return;

      form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        // Name
        const name = document.getElementById('cf-name');
        const nameGroup = name.closest('.form-group');
        if (!name.value.trim()) { nameGroup.classList.add('invalid'); valid = false; }
        else nameGroup.classList.remove('invalid');

        // Email
        const email = document.getElementById('cf-email');
        const emailGroup = email.closest('.form-group');
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email.value.trim())) { emailGroup.classList.add('invalid'); valid = false; }
        else emailGroup.classList.remove('invalid');

        // Message
        const msg = document.getElementById('cf-message');
        const msgGroup = msg.closest('.form-group');
        if (!msg.value.trim()) { msgGroup.classList.add('invalid'); valid = false; }
        else msgGroup.classList.remove('invalid');

        if (valid) {
          const company = form.querySelector('#cf-company')?.value.trim();
          const phone = form.querySelector('#cf-phone')?.value.trim();
          const service = form.querySelector('#cf-service')?.selectedOptions[0]?.text;
          const budget = form.querySelector('#cf-budget')?.selectedOptions[0]?.text;
          const details = [
            `Name: ${name.value.trim()}`,
            `Email: ${email.value.trim()}`,
            company && `Company: ${company}`,
            phone && `Phone: ${phone}`,
            service && service !== 'Select a service...' && `Service: ${service}`,
            budget && budget !== 'Select a budget range...' && `Budget: ${budget}`,
            `Project details: ${msg.value.trim()}`
          ].filter(Boolean).join('\n');
          const query = new URLSearchParams({ subject: 'WHYNEX website enquiry', body: details });
          successMsg.querySelector('h3').textContent = 'Continue in your email app';
          successMsg.querySelector('p').textContent = 'Your enquiry is ready to send. Send the message in your email app to reach WHYNEX.';
          successMsg.classList.add('show');
          window.location.href = `mailto:whynexofficial@gmail.com?${query}`;
        }
      });

      // Live validation clear
      ['cf-name', 'cf-email', 'cf-message'].forEach(id => {
        document.getElementById(id).addEventListener('input', function () {
          this.closest('.form-group').classList.remove('invalid');
        });
      });
    })();

    /* ── Newsletter ── */
    function handleNewsletter(e) {
      e.preventDefault();
      const input = e.currentTarget.querySelector('input[type="email"]');
      if (!input) return;
      const query = new URLSearchParams({
        subject: 'WHYNEX free marketing report request',
        body: `Please send the free marketing report to ${input.value.trim()}.`
      });
      window.location.href = `mailto:whynexofficial@gmail.com?${query}`;
    }

    /* ── Active nav on scroll ── */
    (function () {
      const sections = ['hero', 'about', 'services', 'case-studies', 'industries', 'process', 'portfolio', 'why-us', 'testimonials', 'contact'];
      const links = document.querySelectorAll('.nav-link');

      function setActive() {
        const scrollY = window.scrollY + 100;
        sections.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }
      window.addEventListener('scroll', setActive, { passive: true });
    })();