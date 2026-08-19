/* ============================================================
   VALUES CARDS — horizontal scroll driven by vertical page scroll

   Similar to hsteps.js but simpler: the values section extends
   vertically beyond the viewport, with the extra height mapped to
   horizontal movement of the card track via transform.
   ============================================================ */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp01(v) {
        return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    var panel = document.getElementById('coreValuesPanel');
    var track = document.getElementById('coreValuesScroll');
    var hint = document.getElementById('valuesSwipeHint');

    if (!panel || !track || reduceMotion) return;

    var cards = Array.prototype.slice.call(track.querySelectorAll('.discovery-wide-card'));
    var n = cards.length;

    if (n < 2) return;

    var cardWidth = 0;
    var running = false;
    var rafId = null;

    function measure() {
        // Extra scroll length: each card advance adds 0.6vh
        panel.style.height = (100 + (n - 1) * 0.6 * 100) + 'vh';
        // Real distance between card left edges
        cardWidth = cards[1].offsetLeft - cards[0].offsetLeft;
    }

    function scrollable() {
        return panel.offsetHeight - window.innerHeight;
    }

    function update() {
        var range = scrollable();
        var prog = range > 0 ? clamp01(-panel.getBoundingClientRect().top / range) : 0;
        var i = prog * (n - 1);

        track.style.transform = 'translate3d(' + (-i * cardWidth).toFixed(2) + 'px,0,0)';

        // Hide hint once user starts scrolling
        if (hint) {
            hint.style.opacity = prog > 0.1 ? '0' : '1';
        }
    }

    function onScroll() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(function () {
            update();
            running = false;
        });
    }

    measure();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', measure);
})();
