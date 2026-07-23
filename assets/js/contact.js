(function () {
    'use strict';

    // ---- Fade-in on scroll ----
    var fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
    if (fadeEls.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        fadeEls.forEach(function (el) { observer.observe(el); });
    }

    // ---- Contact Form ----
    var form = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('visible');
            setTimeout(function () {
                form.reset();
                form.style.display = 'block';
                if (formSuccess) formSuccess.classList.remove('visible');
            }, 4000);
        });
    }

    // ---- Location selector (highlight active card; "Click to view in Maps"
    //      link on each card handles actually opening the location) ----
    var locationItems = document.querySelectorAll('.location-item');

    if (locationItems.length) {
        locationItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                if (e.target.closest('a')) return;

                locationItems.forEach(function (i) { i.classList.remove('active'); });
                item.classList.add('active');
            });
        });
    }
})();
