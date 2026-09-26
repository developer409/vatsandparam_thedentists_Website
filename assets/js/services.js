(function () {
    'use strict';

    function runServicesAnimation() {
        var wrapper = document.getElementById('servicesIntro');
        var loader = document.getElementById('servicesLoader');
        var headingWrapper = document.getElementById('servicesHeading');
        var words = document.querySelectorAll('#servicesHeading .word-reveal');
        var cards = document.querySelectorAll('.services-cards-reveal');
        if (!wrapper) return;

        // Reset state
        cards.forEach(function (c) { c.classList.remove('visible'); });
        words.forEach(function (w) { w.style.opacity = '0'; w.style.transform = 'translateY(16px)'; });
        if (headingWrapper) headingWrapper.classList.remove('visible');
        wrapper.classList.add('active');
        if (loader) loader.style.display = '';

        // 1. Loader shows for 1.2s
        setTimeout(function () {
            if (loader) loader.style.display = 'none';
            if (headingWrapper) headingWrapper.classList.add('visible');

            // 2. Words reveal one by one
            words.forEach(function (w, i) {
                setTimeout(function () {
                    w.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    w.style.opacity = '1';
                    w.style.transform = 'translateY(0)';
                }, i * 200);
            });

            // 3. After all words shown + 1.5s pause, fade out overlay
            var totalWordTime = words.length * 200 + 1500;
            setTimeout(function () {
                wrapper.style.transition = 'opacity 0.6s ease';
                wrapper.style.opacity = '0';
                setTimeout(function () {
                    wrapper.classList.remove('active');
                    wrapper.style.opacity = '';
                    wrapper.style.transition = '';
                    // Show cards
                    cards.forEach(function (c, i) {
                        setTimeout(function () { c.classList.add('visible'); }, i * 80);
                    });
                }, 600);
            }, totalWordTime);
        }, 1200);
    }

    runServicesAnimation();

    /* ---- Mobile click-to-reveal (Assessments & Diagnostics card) ---- */
    document.querySelectorAll('.svc-reveal-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var panel = document.getElementById(trigger.getAttribute('aria-controls'));
            var isOpen = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!isOpen));
            if (panel) panel.classList.toggle('active', !isOpen);
            var label = trigger.querySelector('.svc-reveal-trigger__label');
            if (label) label.textContent = isOpen ? 'Click to view services provided' : 'Hide services provided';
        });
    });

    /* ---- Mobile swipe indicator for the 4 category cards ---- */
    if (window.matchMedia('(max-width: 820px)').matches) {
        var svcTrack = document.querySelector('.svc-vcards');
        var svcCards = svcTrack ? svcTrack.querySelectorAll(':scope > .svc-vcard') : [];
        var svcDots = document.querySelectorAll('#svcSwipeDots .svc-swipe-dot');
        var svcHint = document.getElementById('svcSwipeHint');

        if (svcTrack && svcCards.length) {
            var svcUpdateActiveDot = function () {
                var trackRect = svcTrack.getBoundingClientRect();
                var center = trackRect.left + trackRect.width / 2;
                var closest = 0;
                var closestDist = Infinity;
                svcCards.forEach(function (card, i) {
                    var r = card.getBoundingClientRect();
                    var dist = Math.abs((r.left + r.width / 2) - center);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closest = i;
                    }
                });
                svcDots.forEach(function (dot, i) { dot.classList.toggle('active', i === closest); });
            };

            svcDots.forEach(function (dot, i) {
                dot.addEventListener('click', function () {
                    if (svcCards[i]) {
                        svcCards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                });
            });

            var svcTicking = false;
            svcTrack.addEventListener('scroll', function () {
                if (svcHint) svcHint.style.opacity = '0';
                if (!svcTicking) {
                    requestAnimationFrame(function () {
                        svcUpdateActiveDot();
                        svcTicking = false;
                    });
                    svcTicking = true;
                }
            }, { passive: true });
        }
    }
})();
