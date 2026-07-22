(function () {
    'use strict';

    // ---- Background video: viewport-appropriate source + autoplay ----
    var video = document.getElementById('approachVideo');
    if (video) {
        var isMobile = window.innerWidth <= 768;
        video.src = isMobile ? 'assets/Our_approach_mobile.mp4' : 'assets/our_approach_1_v3.mp4';
        video.play().catch(function (err) { console.log('Playback error:', err); });
    }

    // ---- Play/pause toggle ----
    var pauseBtn = document.getElementById('approachVideoPause');
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
    var items = document.querySelectorAll('.fade-in-scroll:not(.visible)');
    if (items.length) {
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

    // ---- Hero scroll hint: fade out once the user starts scrolling ----
    var heroHint = document.getElementById('approachHeroScrollHint');
    if (heroHint) {
        window.addEventListener('scroll', function () {
            heroHint.style.opacity = window.scrollY > 80 ? '0' : '';
        }, { passive: true });
    }
})();
