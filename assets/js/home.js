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
        }, { threshold: 0.15 });

        items.forEach(function (item) { observer.observe(item); });
    }

    observeFadeInScroll();

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
