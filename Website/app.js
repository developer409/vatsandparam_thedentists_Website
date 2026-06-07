/* ============================================
   VATS & PARAM — App Router & Interactions
   ============================================ */

(function () {
    'use strict';

    // ---- Router ----
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav__link');
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function getHash() {
        return (location.hash || '#home').replace('#', '');
    }

    function navigateTo(page) {
        if (!pages.length) return; // not on index.html, skip router
        pages.forEach(p => p.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        const target = document.getElementById('page-' + page);
        const home = document.getElementById('page-home');
        if (target) {
            target.classList.add('active');
        } else if (home) {
            home.classList.add('active');
            page = 'home';
        }
        navLinks.forEach(l => {
            if (l.dataset.page === page) l.classList.add('active');
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');
        observeFadeIns();
    }

    if (pages.length) {
        window.addEventListener('hashchange', () => navigateTo(getHash()));
        navigateTo(getHash());
    }

    // ---- Mobile Menu ----
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // ---- Scroll Effects ----
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 10) {
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

    // ---- Smooth anchor links within same page ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
        });
    });

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

    // ---- Team Scroll Interaction (Drag to scroll) ----
    function initTeamScroll() {
        const slider = document.querySelector('.team-scroll-container');
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    initTeamScroll();

})();
