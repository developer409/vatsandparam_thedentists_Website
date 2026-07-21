(function () {
    'use strict';

    // ---- Fade-in on scroll ----
    var fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
    if (!fadeEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
})();
