/* ============================================================
   HOME — splash, background video, and the cinematic scroll layer.
   Loaded only by home.html.

   The scroll engine writes three normalised values per panel as CSS
   custom properties and lets the stylesheet decide what to do with
   them (see assets/css/home-cinematic.css):

     --enter   0 -> 1   panel rising into view
     --exit    0 -> 1   panel leaving past the top
     --p      -1 -> 1   signed distance from viewport centre

   Only transform/opacity are driven this way, so every frame stays
   on the compositor. The section is marked .hc-ready by this file,
   which is what switches the stylesheet from its static fallback
   into scroll-driven mode — if this script fails, the page still
   renders fully visible.
   ============================================================ */

(function () {
    'use strict';

    // ---- Splash Screen (Mobile) ----
    var splashScreen = document.getElementById('splashScreen');

    // Word-by-word animation for splash text. Delay is computed per word (baseDelay +
    // index*step) instead of relying on CSS nth-child rules, so it stays correct regardless
    // of how many words the text actually splits into (a fixed CSS rule set for e.g. 3 words
    // left any 4th+ word at the CSS default of 0s delay, popping in immediately/out of order).
    function wrapWordsInSpans(elementId, baseDelay, step) {
        var element = document.getElementById(elementId);
        if (!element) return;

        var text = element.textContent;
        var words = text.split(' ');
        element.innerHTML = words.map(function (word, i) {
            var delay = baseDelay + i * step;
            return '<span class="word" style="animation-delay:' + delay.toFixed(2) + 's">' + word + '</span>';
        }).join(' ');
    }

    wrapWordsInSpans('splashTitle', 0.3, 0.3);
    wrapWordsInSpans('splashSubtitle', 1.0, 0.3);
    wrapWordsInSpans('splashTagline', 1.6, 0.3);

    if (splashScreen && window.innerWidth <= 768) {
        // Hide splash screen after 3 seconds (to let all animations complete)
        setTimeout(function () {
            splashScreen.classList.add('hidden');
        }, 3000);
    } else if (splashScreen) {
        // Hide immediately on desktop
        splashScreen.classList.add('hidden');
    }
})();

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp01(v) {
        return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    // ---- Background video: viewport-appropriate source + autoplay ----
    var video = document.getElementById('aboutVideo');
    if (video) {
        var isMobile = window.innerWidth <= 768;
        video.src = isMobile ? 'assets/our_clinic_mobile.mp4' : 'assets/Walkthrough_video_VP.mp4';
        video.play().catch(function (err) { console.log('Playback error:', err); });
    }

    // ---- Play/pause toggle ----
    var pauseBtn = document.getElementById('aboutVideoPause');
    if (pauseBtn && video) {
        pauseBtn.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                pauseBtn.textContent = '⏸';
                pauseBtn.setAttribute('aria-label', 'Pause background video');
            } else {
                video.pause();
                pauseBtn.textContent = '▶';
                pauseBtn.setAttribute('aria-label', 'Play background video');
            }
        });
    }

    // ---- Fade-in on scroll ----
    // Retained for any .fade-in-scroll element outside the cinematic section.
    // Inside it, the stylesheet neutralises this class once .hc-ready is set.
    function observeFadeInScroll() {
        var items = document.querySelectorAll('.fade-in-scroll:not(.visible)');
        if (!items.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30% 0px' });

        items.forEach(function (item) { observer.observe(item); });
    }

    observeFadeInScroll();

    /* ========================================================
       SCROLL ENGINE
       ======================================================== */

    var section = document.querySelector('.home-cinematic');

    if (section && !reduceMotion) {
        // :scope > so the nested Our Mission marker (used only for the
        // story rail / colour grade) doesn't get counted as its own
        // parallax panel — the story/mission pair moves as one panel.
        var panels = Array.prototype.slice.call(section.querySelectorAll(':scope > .discovery-item'));

        // Opting in here (rather than in the HTML) means the scroll-driven
        // styles only take over once we know this code is running.
        section.classList.add('hc-ready');

        var lastScrollY = window.scrollY;
        var velocity = 0;
        var running = false;
        var rafId = null;

        function update() {
            var vh = window.innerHeight;

            // Smoothed scroll speed, 0..1. Feeds a slight zoom kick on the
            // video so fast scrolling reads as a camera move.
            var y = window.scrollY;
            var delta = Math.abs(y - lastScrollY);
            lastScrollY = y;
            velocity += (Math.min(delta / 70, 1) - velocity) * 0.12;
            if (velocity < 0.001) velocity = 0;

            for (var i = 0; i < panels.length; i++) {
                var el = panels[i];
                var rect = el.getBoundingClientRect();

                // Skip panels far outside the viewport — nothing to paint.
                if (rect.bottom < -vh || rect.top > vh * 2) continue;

                var centre = rect.top + rect.height / 2;
                var p = (vh / 2 - centre) / vh;

                el.style.setProperty('--p', p.toFixed(4));
                el.style.setProperty('--enter', clamp01((p + 0.62) / 0.62).toFixed(4));
                el.style.setProperty('--exit', clamp01((p - 0.30) / 0.52).toFixed(4));
            }

            // Slow push-in across the length of the section.
            if (video) {
                var sr = section.getBoundingClientRect();
                var travel = sr.height - vh;
                var zoom = travel > 0 ? clamp01(-sr.top / travel) : 0;
                video.style.setProperty('--zoom', zoom.toFixed(4));
                video.style.setProperty('--vel', velocity.toFixed(4));
            }

            if (running) rafId = requestAnimationFrame(update);
        }

        function start() {
            if (running) return;
            running = true;
            lastScrollY = window.scrollY;
            rafId = requestAnimationFrame(update);
        }

        function stop() {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        }

        // Only burn frames while the section is actually on screen.
        var sectionObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) start(); else stop();
        }, { threshold: 0 });
        sectionObserver.observe(section);

        window.addEventListener('resize', function () {
            if (running) update();
        }, { passive: true });

        // Pause the loop when the tab is hidden.
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop();
            else if (section.getBoundingClientRect().bottom > 0) start();
        });
    }

    /* ========================================================
       KINETIC HEADINGS — words rise, unblur and settle in sequence
       ======================================================== */

    var wordTargets = document.querySelectorAll('.hc-words');

    if (wordTargets.length && !reduceMotion) {
        wordTargets.forEach(function (el) {
            var words = el.textContent.trim().split(/\s+/);
            el.innerHTML = words.map(function (word, i) {
                return '<span class="hc-word" style="--wd:' + (i * 0.075).toFixed(3) + 's">' + word + '</span>';
            }).join(' ');
        });

        var wordObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-lit');
                    wordObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -12% 0px' });

        wordTargets.forEach(function (el) { wordObserver.observe(el); });
    }

    /* Card tilt, cursor spotlight and magnetic buttons live in
       assets/js/cards.js — shared with approach.html. */

    /* ========================================================
       STORY RAIL
       ======================================================== */

    // ---- Hero scroll hint: fade out once the user starts scrolling ----
    var heroHint = document.getElementById('homeHeroScrollHint');
    if (heroHint) {
        window.addEventListener('scroll', function () {
            heroHint.style.opacity = window.scrollY > 80 ? '0' : '';
        }, { passive: true });
    }

    // ---- Story progress rail: tracks which chapter is in view, fills toward it,
    // and lets visitors click a dot to jump straight to that chapter ----
    var storyRail = document.getElementById('storyRail');
    if (storyRail) {
        var railDots = Array.prototype.slice.call(storyRail.querySelectorAll('.story-rail__dot'));
        var railFill = document.getElementById('storyRailFill');
        var chapterOrder = ['story', 'mission', 'values', 'impact', 'cta'];

        railDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var target = document.getElementById(dot.dataset.target);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        function setActiveChapter(chapter) {
            var index = chapterOrder.indexOf(chapter);
            if (index === -1) return;
            railDots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === index);
            });
            if (railFill) railFill.style.height = (index / (chapterOrder.length - 1) * 100) + '%';
            // Drives the per-chapter colour grade over the video.
            if (section) section.dataset.chapter = chapter;
        }

        var chapterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActiveChapter(entry.target.dataset.chapter);
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

        // Scoped to the panels specifically: the section element also carries
        // a data-chapter attribute (it drives the colour grade), and observing
        // it would let it re-broadcast its own value over the real chapters.
        document.querySelectorAll('.discovery-item[data-chapter]').forEach(function (el) {
            chapterObserver.observe(el);
        });

        // Visible only between "past the hero" and "reached the footer" so it
        // never floats over the hero's own hint or lingers past the story.
        var railFooterVisible = false;
        function updateRailVisibility() {
            storyRail.classList.toggle('is-visible', window.scrollY > 80 && !railFooterVisible);
        }
        window.addEventListener('scroll', updateRailVisibility, { passive: true });

        var mainFooter = document.getElementById('mainFooter');
        if (mainFooter) {
            var footerObserver = new IntersectionObserver(function (entries) {
                railFooterVisible = entries[0].isIntersecting;
                updateRailVisibility();
            }, { threshold: 0 });
            footerObserver.observe(mainFooter);
        }
    }

    /* ========================================================
       IMPACT COUNTERS
       ======================================================== */

    // easeOutExpo: fast off the mark, long settle — reads as deliberate
    // rather than the linear tick a fixed-increment interval produces.
    function animateNumber(el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';

        if (reduceMotion) {
            el.innerText = target + suffix;
            return;
        }

        var duration = 1800;
        var startTime = null;

        function step(now) {
            if (startTime === null) startTime = now;
            var t = clamp01((now - startTime) / duration);
            var eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

            el.innerText = Math.round(target * eased) + suffix;

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                el.innerText = target + suffix;
                // Gold pulse on landing.
                var host = el.closest('.hc-stat__num') || el;
                host.classList.add('is-counted');
            }
        }

        requestAnimationFrame(step);
    }

    var statsContainer = document.getElementById('impact-stats');
    if (statsContainer) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.counter-val').forEach(animateNumber);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        statsObserver.observe(statsContainer);
    }
})();
