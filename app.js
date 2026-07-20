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
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav__link');
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function getHash() {
        return (location.hash || '#home').replace('#', '');
    }

    function navigateTo(page) {
        if (!pages.length) return; // Not on a router-enabled page

        pages.forEach(p => p.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        
        const target = document.getElementById('page-' + page);
        if (target) {
            target.classList.add('active');
        } else {
            const homePage = document.getElementById('page-home');
            if (homePage) homePage.classList.add('active');
            page = 'home';
        }

        navLinks.forEach(l => {
            if (l.dataset.page === page) l.classList.add('active');
        });

        // Control video playback and nav transparency based on active page
        const appVideo = document.getElementById('approachVideo');
        const aboutVideo = document.getElementById('aboutVideo');
        const isVideoPage = page === 'approach' || page === 'about';

        if (appVideo) {
            if (page === 'approach') appVideo.play().catch(err => console.log('Autoplay blocked:', err));
            else appVideo.pause();
        }
        if (aboutVideo) {
            if (page === 'about') aboutVideo.play().catch(err => console.log('Autoplay blocked:', err));
            else aboutVideo.pause();
        }

        if (isVideoPage || page === 'home') {
            nav.classList.add('nav--transparent');
            nav.classList.remove('nav--hidden');
            nav.classList.remove('scrolled');
            // Reset fade-in-scroll so observer re-fires on return visits
            document.querySelectorAll('.fade-in-scroll').forEach(el => {
                el.classList.remove('visible');
            });
        } else {
            nav.classList.remove('nav--transparent');
        }

        window.scrollTo({ top: 0, behavior: 'instant' });

        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');

        observeFadeIns();
        if (isVideoPage) observeScrollDiscovery();

        // Services page animation
        if (page === 'treatments') runServicesAnimation();
    }

    function runServicesAnimation() {
        const wrapper = document.getElementById('servicesIntro');
        const loader = document.getElementById('servicesLoader');
        const headingWrapper = document.getElementById('servicesHeading');
        const words = document.querySelectorAll('#servicesHeading .word-reveal');
        const cards = document.querySelectorAll('.services-cards-reveal');
        if (!wrapper) return;

        // Reset state
        cards.forEach(c => c.classList.remove('visible'));
        words.forEach(w => { w.style.opacity = '0'; w.style.transform = 'translateY(16px)'; });
        if (headingWrapper) headingWrapper.classList.remove('visible');
        wrapper.classList.add('active');
        if (loader) loader.style.display = '';

        // 1. Loader shows for 1.2s
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            if (headingWrapper) headingWrapper.classList.add('visible');

            // 2. Words reveal one by one
            words.forEach((w, i) => {
                setTimeout(() => {
                    w.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    w.style.opacity = '1';
                    w.style.transform = 'translateY(0)';
                }, i * 200);
            });

            // 3. After all words shown + 1.5s pause, fade out overlay
            const totalWordTime = words.length * 200 + 1500;
            setTimeout(() => {
                wrapper.style.transition = 'opacity 0.6s ease';
                wrapper.style.opacity = '0';
                setTimeout(() => {
                    wrapper.classList.remove('active');
                    wrapper.style.opacity = '';
                    wrapper.style.transition = '';
                    // Show cards
                    cards.forEach((c, i) => {
                        setTimeout(() => c.classList.add('visible'), i * 80);
                    });
                }, 600);
            }, totalWordTime);
        }, 1200);
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

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ---- Scroll Effects ----
    let lastScroll = 0;
    const howWeWorkSection = document.getElementById('how-we-work-section');
    const ourApproachLink = document.querySelector('a[data-page="approach"].nav__link');

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        
        // Handle transparency and visibility on video pages (About + Approach)
        const activePage = pages.length ? getHash() : '';
        if (activePage === 'approach' || activePage === 'about') {
            if (current < 50) {
                nav.classList.add('nav--transparent');
                nav.classList.remove('scrolled');
            } else {
                nav.classList.remove('nav--transparent');
                nav.classList.add('scrolled');
            }
            lastScroll = current;
            return;
        }

        if (activePage === 'home') {
            if (current < 50) {
                nav.classList.add('nav--transparent');
            } else {
                nav.classList.remove('nav--transparent');
            }
        }
        
        let inHowWeWork = false;
        if (howWeWorkSection) {
            const rect = howWeWorkSection.getBoundingClientRect();
            // Section is considered in view if its top is above the middle of the viewport and its bottom is below the middle of the viewport
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
                inHowWeWork = true;
            }
        }
        
        // Handle Hide/Show behavior
        if (current > lastScroll && current > 120 && !navMenu.classList.contains('open')) {
            // Scrolling down & passed threshold & menu closed
            if (inHowWeWork) {
                nav.classList.add('nav--lightly-visible');
                nav.classList.remove('nav--hidden');
            } else {
                nav.classList.add('nav--hidden');
                nav.classList.remove('nav--lightly-visible');
            }
        } else {
            // Scrolling up or top or menu open
            nav.classList.remove('nav--hidden');
            if (inHowWeWork && current > 120 && !navMenu.classList.contains('open')) {
                nav.classList.add('nav--lightly-visible');
            } else {
                nav.classList.remove('nav--lightly-visible');
            }
        }

        if (inHowWeWork) {
            if (ourApproachLink) ourApproachLink.classList.add('highlight-approach');
        } else {
            if (ourApproachLink) ourApproachLink.classList.remove('highlight-approach');
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
    function animateNumbers(el) {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000; // 2 seconds
        const stepTime = 30; // 30ms
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target + suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    function observeFadeIns() {
        const fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
        if (!fadeEls.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger number animation if this is the stats container or contains stats
                    const stats = entry.target.querySelectorAll('.hero__stat-number');
                    if (stats.length) {
                        stats.forEach(s => animateNumbers(s));
                    } else if (entry.target.classList.contains('hero__stat-number')) {
                        animateNumbers(entry.target);
                    }

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

    // ---- Perspective Toggle ----
    function initPerspectiveToggle() {
        const switcher = document.getElementById('perspective-switch');
        const section = document.getElementById('perspective');
        const patientText = document.getElementById('text-patient');
        const doctorText = document.getElementById('text-doctor');

        if (!switcher || !section) return;

        switcher.addEventListener('click', () => {
            section.classList.toggle('show-doctor');
            const isDoctor = section.classList.contains('show-doctor');

            if (isDoctor) {
                patientText.classList.remove('active');
                doctorText.classList.add('active');
            } else {
                doctorText.classList.remove('active');
                patientText.classList.add('active');
            }
        });
    }

    // ---- MBC Interactions & Reveal ----
    function initMBC() {
        const mbcSection = document.getElementById('mbc-infographic');
        const panels = document.querySelectorAll('.mbc-panel');
        const organItems = document.querySelectorAll('.mbc-organ-item');
        const insightBox = document.getElementById('mbc-insight');
        const insightTitle = document.getElementById('mbc-insight-title');
        const insightDesc = document.getElementById('mbc-insight-desc');
        const lines = document.querySelectorAll('.conn-line');

        if (!mbcSection) return;

        // Auto-reveal panels
        setTimeout(() => {
            if (panels[0]) panels[0].classList.add('hide');
        }, 1000);

        setTimeout(() => {
            if (panels[1]) panels[1].classList.add('hide');
        }, 4000);

        setTimeout(() => {
            if (panels[2]) panels[2].classList.add('hide');
        }, 7000);

        // Organ Interactions
        organItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const organ = item.id.replace('mbc-', '');
                const title = item.dataset.insight;
                const desc = item.dataset.desc;
                const line = document.getElementById('line-' + organ);

                // Update content
                if (insightTitle) insightTitle.innerText = title + ' Connection';
                if (insightDesc) insightDesc.innerText = desc;
                if (insightBox) insightBox.classList.add('active');

                // Activate line
                lines.forEach(l => l.classList.remove('active'));
                if (line) line.classList.add('active');

                // Active item
                organItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        mbcSection.addEventListener('mouseleave', () => {
            if (insightBox) insightBox.classList.remove('active');
            lines.forEach(l => l.classList.remove('active'));
            organItems.forEach(i => i.classList.remove('active'));
        });
    }

    // ---- Accordion Interaction ----
    function initAccordions() {
        const triggers = document.querySelectorAll('.treat-faq-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close other items in the same accordion
                const accordion = item.parentElement;
                accordion.querySelectorAll('.treat-faq-item').forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ---- Scroll-triggered Discovery ----
    function observeScrollDiscovery() {
        const items = document.querySelectorAll('.fade-in-scroll:not(.visible)');
        if (!items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        items.forEach(item => observer.observe(item));
    }

    // ---- Play/Pause Button Toggle ----
    function initApproachVideoControl() {
        const approachVideo = document.getElementById('approachVideo');
        const approachVideoPause = document.getElementById('approachVideoPause');
        if (approachVideo && approachVideoPause) {
            approachVideoPause.addEventListener('click', () => {
                if (approachVideo.paused) {
                    approachVideo.play().catch(err => console.log('Autoplay blocked:', err));
                    approachVideoPause.innerText = '⏸';
                } else {
                    approachVideo.pause();
                    approachVideoPause.innerText = '▶';
                }
            });
        }
    }

    initAccordions();
    initTeamScroll();
    initPerspectiveToggle();
    initMBC();
    observeScrollDiscovery();
    initApproachVideoControl();

})();
