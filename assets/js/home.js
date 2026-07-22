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

    // ---- Hero scroll hint: fade out once the user starts scrolling ----
    var heroHint = document.getElementById('homeHeroScrollHint');
    if (heroHint) {
        window.addEventListener('scroll', function () {
            heroHint.style.opacity = window.scrollY > 80 ? '0' : '';
        }, { passive: true });
    }

    // ---- Impact stats counter ----
    function animateNumber(el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 2000;
        var stepTime = 30;
        var steps = duration / stepTime;
        var increment = target / steps;
        var current = 0;

        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                el.innerText = target + suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current) + suffix;
            }
        }, stepTime);
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
