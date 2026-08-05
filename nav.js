(function () {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link, .dropdown-item');

    // Toggle Mobile Menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
            if (navToggle) navToggle.classList.remove('active');
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
})();
