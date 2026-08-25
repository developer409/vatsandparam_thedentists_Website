/* ============================================================
   HORIZONTAL PINNED STEPS — drives .hsteps sections.

   Vertical scroll through the section's extra height is mapped to
   horizontal travel of the card track. See assets/css/hsteps.css
   for the visual contract.

   Under prefers-reduced-motion this does nothing at all: the
   stylesheet's fallback renders the row as a plain stacked list,
   and leaving the section height unset keeps it at natural height.
   ============================================================ */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp01(v) {
        return v < 0 ? 0 : (v > 1 ? 1 : v);
    }

    document.querySelectorAll('.hsteps').forEach(function (wrap) {
        var track = wrap.querySelector('.hsteps__track');
        var cards = Array.prototype.slice.call(wrap.querySelectorAll('.hstep-card'));
        var dots = Array.prototype.slice.call(wrap.querySelectorAll('.hsteps__dot'));
        var segs = Array.prototype.slice.call(wrap.querySelectorAll('.hsteps__rail-seg'));
        var n = cards.length;

        if (!track || n < 2 || reduceMotion) return;

        // Opt-in: card 1 opens centred in the viewport instead of docked at
        // the left, then slides left into the normal rhythm as scroll begins
        // — reads well paired with a centred section head (see the
        // Assessment row, which has .hsteps__head--center).
        var centerStart = wrap.classList.contains('hsteps--center-start');

        var step = 0;
        var centerOffset = 0;
        var running = false;
        var rafId = null;
        // Card position eases toward the scroll-derived target instead of
        // snapping straight to it — without this, a mouse wheel that fires
        // in discrete line-increments (common on Windows) moved the track
        // in visible steps rather than a smooth glide.
        var cur = 0;
        var curInit = false;

        // Extra scroll length beyond the pinned viewport, expressed in
        // viewport heights per transition.
        function advancePerStep() {
            return window.innerWidth <= 820 ? 0.7 : 0.85;
        }

        function measure() {
            wrap.style.height = (100 + (n - 1) * advancePerStep() * 100) + 'vh';
            // Real distance between card origins, taken from layout.
            step = cards[1].offsetLeft - cards[0].offsetLeft;

            if (centerStart) {
                var viewport = wrap.querySelector('.hsteps__viewport');
                var vs = getComputedStyle(viewport);
                var contentWidth = viewport.clientWidth - parseFloat(vs.paddingLeft) - parseFloat(vs.paddingRight);
                var cardWidth = cards[0].getBoundingClientRect().width;
                centerOffset = Math.max(0, (contentWidth - cardWidth) / 2);
            }
        }

        function scrollable() {
            return wrap.offsetHeight - window.innerHeight;
        }

        function update() {
            var range = scrollable();
            var prog = range > 0 ? clamp01(-wrap.getBoundingClientRect().top / range) : 0;
            var target = prog * (n - 1);

            if (!curInit) { cur = target; curInit = true; }
            var diff = target - cur;
            cur += diff * 0.22;
            if (Math.abs(diff) < 0.001) cur = target;
            var i = cur;

            // Fades out entirely by the time card 2 takes focus (i>=1), so
            // steps 2/3 are completely unaffected — only card 1's opening
            // position and its exit into the normal rhythm are touched.
            var extra = (centerStart && i < 1) ? centerOffset * (1 - i) : 0;
            track.style.transform = 'translate3d(' + (-i * step + extra).toFixed(2) + 'px,0,0)';
            wrap.style.setProperty('--prog', prog.toFixed(4));

            for (var c = 0; c < n; c++) {
                // 1 for the focused card, falling to 0 one slot away — off-focus
                // cards dim rather than disappear, so the row never reads blank.
                cards[c].style.setProperty('--near', clamp01(1 - Math.abs(c - i)).toFixed(4));
            }

            var active = Math.round(i);
            for (var d = 0; d < dots.length; d++) {
                dots[d].classList.toggle('is-active', d === active);
                dots[d].classList.toggle('is-done', d < active);
                dots[d].setAttribute('aria-current', d === active ? 'step' : 'false');
            }

            for (var s = 0; s < segs.length; s++) {
                segs[s].style.setProperty('--seg', clamp01(i - s).toFixed(4));
            }

            if (running) rafId = requestAnimationFrame(update);
        }

        function start() {
            if (running) return;
            running = true;
            rafId = requestAnimationFrame(update);
        }

        function stop() {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        }

        // Scroll the page to wherever puts card `idx` in focus.
        function goTo(idx) {
            var target = Math.max(0, Math.min(idx, n - 1));
            var top = window.scrollY + wrap.getBoundingClientRect().top;
            window.scrollTo({
                top: top + (target / (n - 1)) * scrollable(),
                behavior: 'smooth'
            });
        }

        dots.forEach(function (dot, idx) {
            dot.addEventListener('click', function () { goTo(idx); });
        });

        wrap.querySelectorAll('.hstep-arrow').forEach(function (arrow) {
            arrow.addEventListener('click', function () {
                goTo(parseInt(arrow.dataset.to, 10) || 0);
            });
        });

        measure();
        update();

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                measure();
                update();
            }, 150);
        }, { passive: true });

        // Only burn frames while the section is on screen.
        var io = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) start(); else stop();
        }, { threshold: 0 });
        io.observe(wrap);

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop();
            else if (wrap.getBoundingClientRect().bottom > 0) start();
        });
    });
})();
