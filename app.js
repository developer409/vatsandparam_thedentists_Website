/* ============================================
   VATS & PARAM — App Router & Interactions
   ============================================ */

(function () {
    'use strict';

    // Prevent browser from restoring scroll position on back/forward navigation
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    // ---- Splash Screen (Mobile) ----
    const splashScreen = document.getElementById('splashScreen');

    // Word-by-word animation for splash text
    function wrapWordsInSpans(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    }

    wrapWordsInSpans('splashTitle');
    wrapWordsInSpans('splashSubtitle');
    wrapWordsInSpans('splashTagline');

    if (splashScreen && window.innerWidth <= 768) {
        // Hide splash screen after 3 seconds (to let all animations complete)
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 3000);
    } else if (splashScreen) {
        // Hide immediately on desktop
        splashScreen.classList.add('hidden');
    }

    // ---- Router ----
    // Only these 4 pages still live in this file — Home/About/Approach/Services/Team/Technology
    // have been extracted to their own standalone files (home.html, about.html, etc.).
    const VALID_PAGES = ['education', 'testimonials', 'careers', 'contact'];

    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav__link');
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function getHash() {
        return (location.hash || '').replace('#', '');
    }

    function navigateTo(page) {
        if (!pages.length) return; // Not on a router-enabled page

        if (!VALID_PAGES.includes(page)) {
            // No hash, or a hash for a page that's since moved to its own file
            // (home/about/approach/treatments/team/technology) — send to the real homepage.
            window.location.replace('home.html');
            return;
        }

        pages.forEach(p => p.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById('page-' + page);
        target.classList.add('active');

        navLinks.forEach(l => {
            if (l.dataset.page === page) l.classList.add('active');
        });

        nav.classList.remove('nav--transparent');

        window.scrollTo({ top: 0, behavior: 'instant' });

        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');

        observeFadeIns();
    }

    if (pages.length > 0) {
        window.addEventListener('hashchange', () => navigateTo(getHash()));
        navigateTo(getHash());
    }

    // ---- Mobile Menu Toggle (Open/Close) ----
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu on link click
    function closeMenu() {
        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');
    }

    // Close menu on close button click
    const navClose = document.getElementById('navClose');
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ---- Scroll Effects ----
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;

        // Handle Hide/Show behavior
        if (current > lastScroll && current > 120 && !navMenu.classList.contains('open')) {
            nav.classList.add('nav--hidden');
        } else {
            nav.classList.remove('nav--hidden');
        }

        // Handle Floating state (Scrolled)
        if (current > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = current;
    }, { passive: true });

    // ---- Fade-in on Scroll ----
    function observeFadeIns() {
        const fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
        if (!fadeEls.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(el => observer.observe(el));
    }

    observeFadeIns();

    // ---- Contact Form ----
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('visible');
            // Reset after 4s
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                if (formSuccess) formSuccess.classList.remove('visible');
            }, 4000);
        });
    }

    // ---- Location Switcher ----
    const locationItems = document.querySelectorAll('.location-item');
    const mapIframe = document.getElementById('contactMap');

    if (locationItems.length && mapIframe) {
        locationItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all
                locationItems.forEach(i => i.classList.remove('active'));
                // Add to clicked
                item.classList.add('active');
                // Update map
                const newMapUrl = item.dataset.map;
                if (newMapUrl) {
                    mapIframe.src = newMapUrl;
                }
            });
        });
    }

})();
