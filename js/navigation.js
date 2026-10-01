(function () {
      function initMegaMenu() {
        const menuToggles = document.querySelectorAll('.header-inner .menu-toggle');

        function closeAllMenus(except = null) {
          document.querySelectorAll('.header-inner .nav-item.menu-open').forEach(function (item) {
            if (item !== except) {
              item.classList.remove('menu-open');
              const toggle = item.querySelector(':scope > .menu-toggle');
              if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
          });
        }

        menuToggles.forEach(function (toggle) {
          toggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const parentItem = toggle.closest('.nav-item');
            if (!parentItem) return;
            const isOpen = parentItem.classList.contains('menu-open');

            closeAllMenus(parentItem);

            parentItem.classList.toggle('menu-open', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
          });

          toggle.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggle.click();
            }
          });
        });

        // Clicking a submenu item navigates normally to its own page.
        document.querySelectorAll('.header-inner .mega-wrap a').forEach(function (link) {
          link.addEventListener('click', function (event) {
            event.stopPropagation();
          });
        });

        // Close the dropdown when clicking outside the navigation.
        document.addEventListener('click', function (event) {
          if (!event.target.closest('.header-inner')) {
            closeAllMenus();
          }
        });

        // Close with Escape.
        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
            closeAllMenus();
          }
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMegaMenu);
      } else {
        initMegaMenu();
      }
    })();