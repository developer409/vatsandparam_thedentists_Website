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
})();
