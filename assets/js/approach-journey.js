/* ============================================================
   THE JOURNEY — scroll-progress rail fill for approach.html's
   "Who We Help -> The Process" section. Per-node reveal is already
   handled by the site's existing .fade-in-scroll + IntersectionObserver
   (assets/js/approach.js) — this only draws the connecting gold line
   down the rail as the user scrolls through the section, so the two
   halves read as one continuous thread rather than two lists.
   ============================================================ */
(function () {
  "use strict";

  function init() {
    var journey = document.getElementById('approachJourney');
    var fill = document.getElementById('journeyRailFill');
    if (!journey || !fill) return;

    var ticking = false;

    function update() {
      ticking = false;
      var r = journey.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the section's top just enters the bottom of the viewport,
      // 1 once its bottom has scrolled up past the top — a standard
      // "how far through this element has the user scrolled" ratio.
      var progress = (vh - r.top) / (r.height + vh);
      progress = Math.min(1, Math.max(0, progress));
      fill.style.height = (progress * 100).toFixed(2) + '%';
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
