(function () {
  'use strict';

  document.querySelectorAll('.treat-carousel-wrap').forEach(function (wrap) {
    var carousel = wrap.querySelector('.treat-carousel');
    var track = wrap.querySelector('.treat-carousel__track');
    var prevBtn = wrap.querySelector('.treat-carousel__btn--prev');
    var nextBtn = wrap.querySelector('.treat-carousel__btn--next');
    var dotsContainer = wrap.querySelector('.treat-carousel__dots');

    if (!track || !prevBtn || !nextBtn) return;

    var cards = Array.from(track.children);
    var currentIndex = 0;

    function isMobile() { return window.innerWidth <= 540; }

    function getVisible() {
      if (window.innerWidth <= 540) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function getGap() {
      return isMobile() ? 0 : 24;
    }

    function getCardWidth() {
      if (isMobile()) {
        return carousel ? carousel.offsetWidth : wrap.offsetWidth;
      }
      var gap = getGap();
      var vis = getVisible();
      return Math.floor((wrap.offsetWidth - gap * (vis - 1)) / vis);
    }

    function totalSlides() {
      return Math.max(1, cards.length - getVisible() + 1);
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      var total = totalSlides();
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'treat-carousel__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        (function (idx) {
          dot.addEventListener('click', function () { goTo(idx); });
        })(i);
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.treat-carousel__dot').forEach(function (d, i) {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(idx) {
      var total = totalSlides();
      currentIndex = Math.max(0, Math.min(idx, total - 1));

      var cardWidth = getCardWidth();
      var gap = getGap();
      var offset = currentIndex * (cardWidth + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= total - 1;
      updateDots();
    }

    prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    // Touch/swipe support
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        goTo(0);
      }, 200);
    });

    buildDots();
    goTo(0);
  });
})();
