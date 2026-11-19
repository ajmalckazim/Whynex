/**
 * FAQ Accordion Component
 * Features:
 * - Single-open accordion (closing any currently open item when a new one opens)
 * - Toggle on click (clicking an open item collapses it)
 * - Accessible ARIA attributes (aria-expanded, aria-controls, hidden)
 * - Keyboard navigation (Tab, Enter, Space, ArrowUp, ArrowDown)
 * - Smooth CSS-driven height transition
 */

(function () {
  'use strict';

  function initFaq() {
    const faqBoxes = document.querySelectorAll('.faq-box');
    if (!faqBoxes.length) return;

    faqBoxes.forEach(function (box) {
      const trigger = box.querySelector('.faq-trigger');
      const content = box.querySelector('.faq-content-wrap');
      if (!trigger || !content) return;

      // Ensure no double-binding
      if (trigger.dataset.faqInitialized === 'true') return;
      trigger.dataset.faqInitialized = 'true';

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const isCurrentlyActive = box.classList.contains('active');

        // Close all other accordion boxes
        faqBoxes.forEach(function (otherBox) {
          if (otherBox !== box && otherBox.classList.contains('active')) {
            otherBox.classList.remove('active');
            const otherTrigger = otherBox.querySelector('.faq-trigger');
            const otherContent = otherBox.querySelector('.faq-content-wrap');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.setAttribute('hidden', '');
          }
        });

        // Toggle current box
        if (isCurrentlyActive) {
          box.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.setAttribute('hidden', '');
        } else {
          content.removeAttribute('hidden');
          box.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard arrow navigation
      trigger.addEventListener('keydown', function (e) {
        const triggers = Array.from(document.querySelectorAll('.faq-trigger'));
        const index = triggers.indexOf(trigger);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = triggers[(index + 1) % triggers.length];
          if (next) next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = triggers[(index - 1 + triggers.length) % triggers.length];
          if (prev) prev.focus();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaq);
  } else {
    initFaq();
  }
})();
