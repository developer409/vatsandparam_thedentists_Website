(function () {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    // Excludes .dropdown-toggle: those only expand/collapse their submenu on
    // mobile (see below) and must not also close the whole menu on tap.
    const navLinks = document.querySelectorAll('.nav__link:not(.dropdown-toggle), .dropdown-item');

    // Dimmed backdrop behind the slide-in mobile menu, so the page behind it
    // reads as inactive (dimmed + non-scrolling) instead of staying fully
    // visible/interactive, which made the panel feel like a stray overlay
    // rather than a menu. Injected once here rather than added to every page.
    let navBackdrop = document.getElementById('navBackdrop');
    if (!navBackdrop && navMenu) {
        navBackdrop = document.createElement('div');
        navBackdrop.id = 'navBackdrop';
        navBackdrop.className = 'nav__backdrop';
        // Appended inside #mainNav (not document.body) so it shares the nav's
        // own stacking context (.nav has z-index:1000) — otherwise, as a
        // body-level sibling, its z-index would compete against that 1000
        // instead of against .nav__menu's internal z-index, and end up
        // covering the menu panel itself.
        var mainNav = document.getElementById('mainNav');
        (mainNav || document.body).appendChild(navBackdrop);
    }

    function openMobileMenu() {
        if (navToggle) {
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
        }
        if (navMenu) navMenu.classList.add('open');
        if (navBackdrop) navBackdrop.classList.add('open');
        var mainNav = document.getElementById('mainNav');
        if (mainNav) mainNav.classList.add('nav-menu-open');
        document.body.classList.add('nav-open');
    }

    function closeMobileMenu() {
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        if (navMenu) navMenu.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('open');
        var mainNav = document.getElementById('mainNav');
        if (mainNav) mainNav.classList.remove('nav-menu-open');
        document.body.classList.remove('nav-open');
    }

    // Toggle Mobile Menu
    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'navMenu');
        if (!navToggle.hasAttribute('aria-label')) navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) closeMobileMenu();
            else openMobileMenu();
        });
    }

    // Close on backdrop tap
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Close menu on resize to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820 && navMenu && navMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    }, { passive: true });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Dropdown menu toggle functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.nav__item');
            if (!dropdown) return;

            // Close all other dropdowns
            document.querySelectorAll('.nav__item.dropdown.active').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav__item.dropdown')) {
            document.querySelectorAll('.nav__item.dropdown.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Scroll effect (Navbar floated / scrolled styling)
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ---- Immersive pages only (pages with [data-nav] sections, e.g. video heroes) ----
    // Pages without [data-nav] markup (every existing treatment page) are unaffected.
    const navThemeSections = document.querySelectorAll('[data-nav]');
    if (nav && navThemeSections.length) {
        // Adaptive dark/light theming based on which [data-nav] section is in view
        const navH = nav.offsetHeight || 72;
        const themeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const theme = entry.target.getAttribute('data-nav');
                    nav.classList.remove('nav--over-dark', 'nav--over-light');
                    nav.classList.add(theme === 'light' ? 'nav--over-light' : 'nav--over-dark');
                }
            });
        }, {
            rootMargin: '-' + navH + 'px 0px -' + (window.innerHeight - navH - 1) + 'px 0px',
            threshold: 0
        });
        navThemeSections.forEach((s) => themeObserver.observe(s));

        // Transparent nav at the top of the page, solid once scrolled past it
        window.addEventListener('scroll', () => {
            if (window.scrollY < 50) {
                nav.classList.add('nav--transparent');
            } else {
                nav.classList.remove('nav--transparent');
            }
        }, { passive: true });

        if (window.scrollY < 50) nav.classList.add('nav--transparent');
    }

    // ---- Copy-to-clipboard for email links ----
    // Clicking a mailto: link tries to launch the OS's default mail app, which
    // for most visitors is unconfigured (or not the webmail they actually use,
    // e.g. Gmail) — so instead we copy the address and show a small confirmation,
    // falling back to the normal mailto: behaviour if the clipboard API is
    // unavailable or blocked.
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (!navigator.clipboard) return;
            const email = link.getAttribute('href').replace(/^mailto:/, '').split('?')[0];
            e.preventDefault();
            navigator.clipboard.writeText(email).then(function () {
                const tip = document.createElement('span');
                tip.textContent = 'Copied!';
                tip.style.cssText = 'position:absolute;background:#1A1A1A;color:#fff;' +
                    'font-size:12px;padding:4px 9px;border-radius:4px;pointer-events:none;' +
                    'z-index:9999;white-space:nowrap;opacity:0;transition:opacity .15s ease;';
                document.body.appendChild(tip);
                const rect = link.getBoundingClientRect();
                tip.style.left = (rect.left + rect.width / 2 + window.scrollX - tip.offsetWidth / 2) + 'px';
                tip.style.top = (rect.top + window.scrollY - tip.offsetHeight - 8) + 'px';
                requestAnimationFrame(function () { tip.style.opacity = '1'; });
                setTimeout(function () {
                    tip.style.opacity = '0';
                    setTimeout(function () { tip.remove(); }, 150);
                }, 1200);
            }).catch(function () {
                window.location.href = link.getAttribute('href');
            });
        });
    });
})();
