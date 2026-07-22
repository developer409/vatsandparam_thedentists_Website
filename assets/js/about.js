(function () {
    'use strict';

    // ---- Intro loader (mobile only) ----
    // Fixed-duration overlay, not tied to any load event, so it can never hang
    // waiting on the hero video or other resources — it just gives the video a
    // short head start to buffer while the quote is on screen.
    var introLoader = document.getElementById('aboutIntroLoader');
    var introQuote = document.getElementById('aboutIntroQuote');

    if (introQuote) {
        var words = introQuote.textContent.split(' ');
        introQuote.innerHTML = words.map(function (word, i) {
            var delay = (0.1 + i * 0.12).toFixed(2);
            return '<span class="about-intro-word" style="animation-delay:' + delay + 's">' + word + '</span>';
        }).join(' ');
    }

    if (introLoader) {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
            setTimeout(function () {
                introLoader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 2600);
        } else {
            introLoader.classList.add('hidden');
        }
    }
})();

(function () {
    'use strict';

    // ---- Hero scroll hint: fade out once the user starts scrolling ----
    var heroHint = document.getElementById('aboutHeroScrollHint');
    if (heroHint) {
        window.addEventListener('scroll', function () {
            heroHint.style.opacity = window.scrollY > 80 ? '0' : '';
        }, { passive: true });
    }
})();

(function () {
    'use strict';

    // ---- Hero word animation (mobile only) - preserves bold tags ----
    if (window.innerWidth <= 768) {
        var globalIndex = 0;
        document.querySelectorAll('.hero-word-animate').forEach(function (para) {
            var nodes = Array.from(para.childNodes);
            var result = '';
            nodes.forEach(function (node) {
                if (node.nodeType === 3) {
                    var words = node.textContent.split(/\s+/).filter(Boolean);
                    words.forEach(function (word) {
                        result += '<span class="word" style="animation-delay:' + (globalIndex * 0.05) + 's">' + word + '</span> ';
                        globalIndex++;
                    });
                } else if (node.nodeType === 1) {
                    var tag = node.tagName.toLowerCase();
                    result += '<' + tag + '><span class="word" style="animation-delay:' + (globalIndex * 0.05) + 's">' + node.textContent + '</span></' + tag + '> ';
                    globalIndex++;
                }
            });
            para.innerHTML = result;
        });
    }
})();

// ---- Hero bottom cards reveal ----
(function () {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;

    function revealHeroCards() {
        var rects = document.querySelectorAll('.hero-rect');
        if (isMobile) {
            rects.forEach(function (rect) {
                rect.style.cssText += '; opacity: 0 !important; transform: translateX(-80px) !important; transition: none !important;';
            });

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    rects.forEach(function (rect, i) {
                        setTimeout(function () {
                            rect.style.cssText += '; transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) !important; opacity: 1 !important; transform: translateX(0) !important;';
                        }, 100 + (i * 200));
                    });
                });
            });
        } else {
            setTimeout(function () {
                rects.forEach(function (el) { el.classList.add('revealed'); });
            }, 2000);
        }
    }

    // Run as soon as the DOM is ready — don't wait for window 'load', which
    // only fires once every resource (including the large hero video) has
    // finished downloading. The paragraph shouldn't be stuck behind that.
    revealHeroCards();
})();

// ---- Word reveal animation ----
(function () {
    function wrapWords(el) {
        el.innerHTML = el.innerHTML
            .split(/(<br\s*\/?>)/i)
            .map(function (chunk) {
                if (/^<br/i.test(chunk)) return chunk;
                return chunk.replace(/(\S+)/g, function (word) {
                    return '<span class="word-reveal-wrapper"><span class="word-reveal-word">' + word + '</span></span>';
                });
            })
            .join('');
        el.querySelectorAll('.word-reveal-word').forEach(function (w, i) {
            w.style.transitionDelay = (i * 0.05) + 's';
        });
    }

    var els = document.querySelectorAll(
        '.immersive-video-section .immersive-headline,' +
        '.immersive-video-section .immersive-title,' +
        '.immersive-video-section .immersive-label,' +
        '.immersive-video-section .immersive-subtext,' +
        '.founders-header h2,' +
        '.founders-header p'
    );

    els.forEach(wrapWords);

    var firstSection = document.querySelector('.immersive-video-section');

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                var isHero = firstSection && firstSection.contains(e.target);
                var delay = isHero ? 350 : 0;
                setTimeout(function () { e.target.classList.add('word-reveal-active'); }, delay);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    els.forEach(function (el) { obs.observe(el); });
})();

// ---- Walkthrough sticky scroll — rAF-throttled (desktop only; mobile uses GSAP ScrollTrigger below) ----
(function () {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    var section = document.getElementById('walkthroughSection');
    var cards = document.querySelectorAll('.walkthrough-card');
    if (!section || cards.length === 0) return;

    var currentActive = -1;
    var ticking = false;

    var hint = document.getElementById('walkthroughHint');

    function updateCard() {
        var rect = section.getBoundingClientRect();
        var sectionH = section.offsetHeight;
        var scrolled = -rect.top;
        var progress = scrolled / (sectionH - window.innerHeight);
        var clamped = Math.max(0, Math.min(0.999, progress));
        var index = Math.floor(clamped * cards.length);

        if (index !== currentActive) {
            cards.forEach(function (c, i) { c.classList.toggle('active', i === index); });
            currentActive = index;
        }

        if (hint) hint.style.opacity = scrolled > 80 ? '0' : '0.75';

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateCard);
            ticking = true;
        }
    }, { passive: true });

    updateCard();
})();

// ---- Walkthrough mobile pin — GSAP ScrollTrigger ----
// This site's `body{overflow-x:hidden}` makes the browser's scroll-container detection
// ambiguous, which otherwise breaks the pin. Explicitly pointing ScrollTrigger at
// <html> as the scroller fixes that without touching real scroll physics/feel anywhere
// else on the page.
(function () {
    if (!window.matchMedia('(max-width: 768px)').matches) return;

    var mainVideo = document.querySelector('#walkthroughSection .walkthrough-video');
    if (mainVideo) mainVideo.poster = 'assets/Technology/aboutus_mobile.jpeg';

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // The blurred fill layer is desktop-only (hidden via CSS on mobile) but was still
    // fetching/decoding the same multi-MB clip a second time in the background. Drop it
    // from the DOM entirely on mobile instead of just hiding it.
    var bgVideo = document.querySelector('#walkthroughSection .walkthrough-video-bg');
    if (bgVideo) bgVideo.remove();

    gsap.registerPlugin(ScrollTrigger);

    var sticky = document.querySelector('#walkthroughSection .walkthrough-sticky');
    var cards = gsap.utils.toArray('#walkthroughSection .walkthrough-card');
    if (!sticky || !cards.length) return;

    gsap.set(cards, { opacity: 0 });
    gsap.set(cards[0], { opacity: 1 });

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: sticky,
            scroller: document.documentElement,
            start: 'top top',
            end: function () { return '+=' + (window.innerHeight * cards.length); },
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    cards.forEach(function (card, i) {
        if (i === 0) return;
        var holdEnd = (i - 1) + 0.6;
        tl.to(cards[i - 1], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, holdEnd);
        tl.to(card, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, holdEnd);
    });
})();

// ---- Stats counters (desktop pill row + mobile pill row) ----
(function () {
    var statsAnimated = false;
    var mobileStatsAnimated = false;

    var animateCountersIn = function (counterEls) {
        counterEls.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            var current = 0;
            var increment = target / 50;
            var updateCounter = function () {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            updateCounter();
        });
    };

    var statsSection = document.querySelector('.stats-animation-section');
    if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCountersIn(statsSection.querySelectorAll('.counter'));
                    statsAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    var mobileStatsSection = document.querySelector('.mobile-stats-section');
    if (mobileStatsSection) {
        var mobilePills = mobileStatsSection.querySelectorAll('.mobile-stat-pill');
        var mobileStatsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !mobileStatsAnimated) {
                    mobilePills.forEach(function (pill, i) {
                        setTimeout(function () { pill.classList.add('pill-visible'); }, i * 200);
                    });
                    animateCountersIn(mobileStatsSection.querySelectorAll('.counter'));
                    mobileStatsAnimated = true;
                    mobileStatsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        mobileStatsObserver.observe(mobileStatsSection);
    }
})();

// ---- Founders sequential entrance animation ----
(function () {
    var foundersSection = document.querySelector('.founders-section');
    var srivatsBlock = document.querySelector('.founder-block--srivats');
    var paramBlock = document.querySelector('.founder-block--param');
    if (!foundersSection || !srivatsBlock || !paramBlock) return;

    var foundersObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Step 1: Srivats slides in from right immediately
                srivatsBlock.classList.add('in-view');
                // Step 2: Param rises from bottom after Srivats settles (~1s, matching CSS delay)
                paramBlock.classList.add('in-view');
                foundersObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    foundersObserver.observe(foundersSection);
})();

// ---- Fade-in on scroll ----
(function () {
    var items = document.querySelectorAll('.fade-in-scroll:not(.visible)');
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(function (item) { observer.observe(item); });
})();

// ---- Whole body connection — parallax scroll ----
(function () {
    var section = document.getElementById('wholeBodySection');
    if (!section) return;

    // Disable all scroll animations on mobile
    if (window.innerWidth <= 768) return;

    var ORGANS = ['brain', 'lung', 'heart', 'gut', 'joint', 'muscle', 'inflammation', 'glycemic', 'sleep'];
    // Transition window: last 40% of each organ's scroll phase
    var TRANS = 0.6;

    var titleScreen = document.getElementById('wbTitleScreen');
    var titleInner = section.querySelector('.wb-title-inner');
    var layers = {}, infos = {}, dots = {};

    ORGANS.forEach(function (o) {
        layers[o] = section.querySelector('.wb-video-layer[data-organ="' + o + '"]');
        infos[o] = section.querySelector('.wb-organ-info[data-organ="' + o + '"]');
        dots[o] = section.querySelector('.wb-dot[data-organ="' + o + '"]');
    });

    // ---- 2s delayed title reveal on section entry ----
    var titleTriggered = false;
    var titleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !titleTriggered) {
                titleTriggered = true;
                setTimeout(function () {
                    if (titleInner) titleInner.classList.add('wb-title-ready');
                }, 2000);
                titleObserver.disconnect();
            }
        });
    }, { threshold: 0 });
    titleObserver.observe(section);

    // ---- Section top cache ----
    var sectionTop = 0;
    function cacheSectionTop() {
        sectionTop = section.getBoundingClientRect().top + window.scrollY;
    }
    cacheSectionTop();
    window.addEventListener('resize', cacheSectionTop, { passive: true });

    function setLayer(layer, ty, opacity) {
        layer.style.transform = 'translateY(' + ty + '%)';
        layer.style.opacity = String(opacity);
    }

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function revealChildren(info, progress) {
        var items = [
            [info.querySelector('.wb-organ-num'), 0, 0.15],
            [info.querySelector('.wb-organ-name'), 0.1, 0.20],
            [info.querySelector('.wb-organ-headline'), 0.27, 0.20],
            [info.querySelector('.wb-organ-body'), 0.47, 0.25],
        ];
        items.forEach(function (item) {
            var el = item[0], thr = item[1], dur = item[2];
            if (!el) return;
            var p = clamp((progress - thr) / dur, 0, 1);
            el.style.opacity = String(p);
            el.style.transform = 'translateY(' + ((1 - p) * 18) + 'px)';
        });
        var facts = info.querySelectorAll('.wb-organ-facts li');
        facts.forEach(function (li, j) {
            var p = clamp((progress - (0.65 + j * 0.08)) / 0.12, 0, 1);
            li.style.opacity = String(p);
            li.style.transform = 'translateX(' + ((1 - p) * -18) + 'px)';
        });
    }

    var ticking = false;

    function update() {
        ticking = false;
        var scrolled = window.scrollY - sectionTop;

        // Reset to initial state when section not yet in view
        if (scrolled < 0) {
            if (titleScreen) {
                titleScreen.style.opacity = '1';
                titleScreen.style.transform = '';
                titleScreen.style.pointerEvents = '';
            }
            ORGANS.forEach(function (o) {
                if (layers[o]) setLayer(layers[o], 100, 1);
                if (infos[o]) { infos[o].style.opacity = '0'; infos[o].classList.remove('wb-organ-info--visible'); }
                if (dots[o]) dots[o].classList.remove('wb-dot--active');
            });
            return;
        }

        var h = window.innerHeight;
        var titleH = h;        // 1 viewport for title
        var organH = h * 1.2;  // 1.2 viewports per organ (~7 total scrolls)

        // ---- Title screen: fades out as user scrolls through title phase ----
        var tp = clamp(scrolled / titleH, 0, 1);
        if (titleScreen) {
            titleScreen.style.opacity = String(Math.max(0, 1 - tp * 1.5));
            titleScreen.style.pointerEvents = tp > 0.6 ? 'none' : '';
        }

        var postTitle = scrolled - titleH;
        var rawIdx = postTitle / organH;

        ORGANS.forEach(function (organ, i) {
            var layer = layers[organ];
            var info = infos[organ];
            var dot = dots[organ];
            if (!layer || !info) return;

            var isLast = i === ORGANS.length - 1;
            var phaseP = rawIdx - i;

            // ---- Title phase: brain slides up from below as title fades ----
            if (postTitle < 0) {
                if (i === 0) {
                    var enterP = clamp((tp - 0.4) / 0.6, 0, 1);
                    setLayer(layer, (1 - enterP) * 100, 1);
                } else {
                    setLayer(layer, 100, 1);
                }
                info.style.opacity = '0';
                info.classList.remove('wb-organ-info--visible');
                dot.classList.remove('wb-dot--active');
                return;
            }

            // Last organ never exits
            if (isLast) phaseP = Math.min(phaseP, TRANS - 0.001);

            if (phaseP < -(1 - TRANS)) {
                setLayer(layer, 100, 1);
                info.style.opacity = '0';
                info.classList.remove('wb-organ-info--visible');
                dot.classList.remove('wb-dot--active');

            } else if (phaseP < 0) {
                var ep = (phaseP + (1 - TRANS)) / (1 - TRANS);
                setLayer(layer, (1 - ep) * 100, 1);
                info.style.opacity = '0';
                info.classList.remove('wb-organ-info--visible');
                dot.classList.remove('wb-dot--active');

            } else if (phaseP < TRANS) {
                setLayer(layer, 0, 1);
                dot.classList.add('wb-dot--active');
                info.style.opacity = '1';
                info.classList.add('wb-organ-info--visible');

            } else if (phaseP < 1) {
                var ex = (phaseP - TRANS) / (1 - TRANS);
                setLayer(layer, 0, 1);
                info.style.opacity = String(Math.max(0, 1 - ex * 4));
                dot.classList.remove('wb-dot--active');

            } else if (phaseP < 1.5) {
                setLayer(layer, 0, 0);
                info.style.opacity = '0';
                info.classList.remove('wb-organ-info--visible');
                dot.classList.remove('wb-dot--active');

            } else {
                setLayer(layer, -100, 0);
                info.style.opacity = '0';
                info.classList.remove('wb-organ-info--visible');
                dot.classList.remove('wb-dot--active');
            }
        });
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Re-sync state when user returns to this tab
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) requestAnimationFrame(update);
    });

    update();
})();
