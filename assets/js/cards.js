/* ============================================================
   SHARED CARD FX — pointer tilt + cursor spotlight.
   Loaded by home.html and approach.html.

   Writes pointer state onto each card as custom properties; the
   look is entirely assets/css/cards.css's business. Those props
   are registered with @property there, so the stylesheet can
   transition them — which is why `transform` itself is never
   transitioned here (on home it is also rewritten every frame by
   the scroll engine, and a transition would fight that).
   ============================================================ */

(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var cards = document.querySelectorAll('.fx-cards .discovery-wide-card, .fx-cards .hstep-card');

    cards.forEach(function (card) {
        card.addEventListener('pointerenter', function () {
            card.style.setProperty('--hover', '1');
        });

        card.addEventListener('pointermove', function (e) {
            var r = card.getBoundingClientRect();
            var mx = (e.clientX - r.left) / r.width;
            var my = (e.clientY - r.top) / r.height;

            card.style.setProperty('--mx', (mx * 100).toFixed(2) + '%');
            card.style.setProperty('--my', (my * 100).toFixed(2) + '%');
            // Lean away from the cursor vertically, turn toward it horizontally.
            card.style.setProperty('--rx', ((0.5 - my) * 9).toFixed(2) + 'deg');
            card.style.setProperty('--ry', ((mx - 0.5) * 11).toFixed(2) + 'deg');
        });

        card.addEventListener('pointerleave', function () {
            card.style.setProperty('--hover', '0');
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });

    // Magnetic buttons: drift a little toward the cursor.
    document.querySelectorAll('.fx-magnetic').forEach(function (btn) {
        btn.addEventListener('pointermove', function (e) {
            var r = btn.getBoundingClientRect();
            var mx = (e.clientX - r.left - r.width / 2) / r.width;
            var my = (e.clientY - r.top - r.height / 2) / r.height;
            btn.style.transform = 'translate(' + (mx * 14).toFixed(1) + 'px,' + (my * 10).toFixed(1) + 'px)';
        });

        btn.addEventListener('pointerleave', function () {
            btn.style.transform = '';
        });
    });
})();
