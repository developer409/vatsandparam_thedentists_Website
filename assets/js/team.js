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

    // ---- Team scroll interaction (drag to scroll) ----
    var slider = document.querySelector('.team-scroll-container');
    if (!slider) return;

    var isDown = false;
    var startX;
    var scrollLeft;

    slider.addEventListener('mousedown', function (e) {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', function () {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', function () {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
})();
