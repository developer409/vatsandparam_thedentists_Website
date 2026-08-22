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

    // ---- Whole Body Assessment Manual & Auto-Scroll Slider ----
    var section = document.getElementById('wholeBodyAssessment');
    if (section) {
        var viewport = section.querySelector('.eval-slider-viewport');
        var cards = Array.prototype.slice.call(section.querySelectorAll('.eval-card'));
        var dots = Array.prototype.slice.call(section.querySelectorAll('.eval-dot'));
        var segs = Array.prototype.slice.call(section.querySelectorAll('.eval-rail-seg'));
        var prevBtn = section.querySelector('.eval-slider-btn--prev');
        var nextBtn = section.querySelector('.eval-slider-btn--next');
        var activeIndex = 0;
        var total = cards.length;

        var autoInterval = null;
        var isHovered = false;
        var AUTO_DELAY = 4500; // 4.5s per card

        function scrollToCard(idx) {
            if (idx < 0) idx = 0;
            if (idx >= total) idx = total - 1;
            activeIndex = idx;
            var targetCard = cards[idx];
            if (targetCard && viewport) {
                var scrollLeft = targetCard.offsetLeft - (viewport.clientWidth - targetCard.clientWidth) / 2;
                viewport.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
            updateState();
        }

        function updateState() {
            cards.forEach(function (card, i) {
                card.classList.toggle('is-active', i === activeIndex);
            });
            dots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === activeIndex);
                dot.classList.toggle('is-done', i < activeIndex);
            });
            segs.forEach(function (seg, i) {
                seg.classList.toggle('is-filled', i < activeIndex);
            });
            if (prevBtn) prevBtn.disabled = activeIndex === 0;
            if (nextBtn) nextBtn.disabled = activeIndex === total - 1;
        }

        function startAutoPlay() {
            stopAutoPlay();
            if (!isHovered) {
                autoInterval = setInterval(function () {
                    var nextIdx = (activeIndex + 1) % total;
                    scrollToCard(nextIdx);
                }, AUTO_DELAY);
            }
        }

        function stopAutoPlay() {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
        }

        var pauseTimer = null;
        function resetAutoPlay() {
            stopAutoPlay();
            if (pauseTimer) clearTimeout(pauseTimer);
            pauseTimer = setTimeout(function () {
                startAutoPlay();
            }, 8000);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                scrollToCard(activeIndex - 1);
                resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                var nextIdx = (activeIndex + 1) % total;
                scrollToCard(nextIdx);
                resetAutoPlay();
            });
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                scrollToCard(i);
                resetAutoPlay();
            });
        });

        // Hover & touch event listeners to pause auto-scroll during user interaction
        section.addEventListener('mouseenter', function () {
            isHovered = true;
            stopAutoPlay();
        });

        section.addEventListener('mouseleave', function () {
            isHovered = false;
            startAutoPlay();
        });

        section.addEventListener('touchstart', function () {
            isHovered = true;
            stopAutoPlay();
        }, { passive: true });

        section.addEventListener('touchend', function () {
            isHovered = false;
            setTimeout(startAutoPlay, 2000);
        }, { passive: true });

        if (viewport) {
            var isScrolling;
            viewport.addEventListener('scroll', function () {
                clearTimeout(isScrolling);
                isScrolling = setTimeout(function () {
                    var center = viewport.scrollLeft + viewport.clientWidth / 2;
                    var closestIdx = 0;
                    var minDiff = Infinity;
                    cards.forEach(function (card, i) {
                        var cardCenter = card.offsetLeft + card.clientWidth / 2;
                        var diff = Math.abs(center - cardCenter);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closestIdx = i;
                        }
                    });
                    if (closestIdx !== activeIndex) {
                        activeIndex = closestIdx;
                        updateState();
                    }
                }, 60);
            }, { passive: true });
        }

        // Auto-play only when section is visible in viewport
        var sectionObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        }, { threshold: 0.2 });
        sectionObserver.observe(section);

        updateState();
    }
})();
