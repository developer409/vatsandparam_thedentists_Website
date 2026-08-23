/* ============================================================
   MOUTH–BODY CONNECTION — Interactive Experience (desktop + mobile)
   Builds a scroll-driven body diagram (mouth -> 9 systems) inside
   #mbcConnection, replacing about.html's original video-parallax
   Whole Body Connection section on every screen size. If anything
   here throws, the original markup (video stack, title screen,
   static mobile image, info panels) stays visible — this never
   hides the fallback until it has successfully finished building.
   ============================================================ */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var ASSET_BASE = "assets/mouth-body-connection/";
  var gold = "#C6A75E";
  var STACK_BREAKPOINT = 820;

  var MOUTH = { x: 200, y: 144 };
  var SYSTEMS = [
    { id: 'brain', label: 'Brain', title: 'Brain', accent: '#2F6B4F', icon: ASSET_BASE + 'icons/brain.png', x: 200, y: 78, z: 3.1,
      headline: 'Your mouth shapes your mind',
      body: 'Oral infections release inflammatory cytokines that cross the blood-brain barrier, directly affecting cognition, mood, and neural clarity. Chronic periodontal disease has been linked to accelerated cognitive decline.',
      facts: ["Linked to Alzheimer's and dementia risk", 'Affects concentration and mental clarity', 'Oral bacteria found in brain tissue'] },
    { id: 'lungs', label: 'Lungs', title: 'Lungs', accent: '#6B5AA6', icon: ASSET_BASE + 'icons/lungs.png', x: 196, y: 252, z: 2.7,
      headline: 'Every breath carries what your mouth holds',
      body: 'Oral bacteria can be aspirated into the lower respiratory tract, triggering infections and worsening conditions like COPD and pneumonia. Poor oral hygiene dramatically increases pulmonary infection risk.',
      facts: ['Aspiration pneumonia risk increases 3x', 'Worsens asthma and COPD', 'Bacterial colonies found in lung biopsies'] },
    { id: 'heart', label: 'Heart', title: 'Heart', accent: '#A93B2E', icon: ASSET_BASE + 'icons/heart.png', x: 203, y: 288, z: 3.0,
      headline: 'Gum disease and your cardiovascular system',
      body: 'Periodontal bacteria enter the bloodstream, attaching to arterial plaques and triggering inflammatory responses that narrow vessels. Studies show gum disease patients face nearly twice the risk of heart disease.',
      facts: ['Doubles the risk of heart attack', 'Elevates blood pressure and arterial stiffness', 'Oral bacteria found in arterial plaque'] },
    { id: 'gut', label: 'Gut', title: 'Gut', accent: '#B9713A', icon: ASSET_BASE + 'icons/gut.png', x: 204, y: 378, z: 2.7,
      headline: 'Digestion begins in the mouth',
      body: 'The oral microbiome is the gateway to your gut. Imbalanced oral bacteria disrupt the digestive ecosystem, while compromised chewing reduces nutrient absorption and burdens the entire digestive system.',
      facts: ['Oral bacteria colonise the gut lining', 'Poor chewing reduces nutrient absorption by up to 40%', "Linked to IBD and Crohn's disease"] },
    { id: 'joints', label: 'Joints', title: 'Joints & Bones', accent: '#2F5FA8', icon: ASSET_BASE + 'icons/joints.png', x: 152, y: 716, z: 2.6,
      headline: 'Your bite shapes your skeleton',
      body: 'Bite imbalance and jaw misalignment create compensatory postural patterns throughout the body. Periodontal inflammation also mimics and worsens rheumatoid arthritis — the same immune pathways are activated.',
      facts: ['Jaw dysfunction causes neck and back pain', 'Periodontal bacteria trigger joint inflammation', 'RA patients have 8× higher rates of gum disease'] },
    { id: 'muscles', label: 'Muscles', title: 'Skeletal Muscle Health', accent: '#2E7A86', icon: ASSET_BASE + 'icons/muscles.png', x: 110, y: 290, z: 2.8,
      headline: 'Muscle function impacts metabolism, posture, and resilience',
      body: 'Muscle function impacts metabolism, posture, airway patency, and overall resilience — all quietly connected to how the jaw and bite are functioning.',
      facts: ['Supports metabolism and energy production', 'Maintains airway patency and breathing function', 'Essential for postural stability and spinal health'] },
    { id: 'pregnancy', label: 'Pregnancy', title: 'Pregnancy', accent: '#8A5A7A', icon: ASSET_BASE + 'icons/pregnancy.png', x: 200, y: 460, z: 2.7,
      headline: 'A critical window for mother and baby',
      body: 'Hormonal shifts during pregnancy amplify gum inflammation and periodontal disease risk. Untreated gum disease during pregnancy increases the risk of premature birth, low birth weight, and gestational complications.',
      facts: ['Pregnancy gingivitis affects up to 75% of expectant mothers', 'Untreated gum disease increases premature birth risk by 7×', 'Oral bacteria can cross the placental barrier'] },
    { id: 'glycemic', label: 'Glycemic', title: 'Glycemic Control', accent: '#3C8FA8', icon: ASSET_BASE + 'icons/glycemic.png', x: 300, y: 440, z: 2.8,
      headline: 'Blood sugar and gum disease feed each other',
      body: 'Blood sugar dysregulation impairs immune response and accelerates periodontal destruction, while the resulting inflammation makes blood sugar harder to control.',
      facts: ['Weakens immune defense against oral bacteria', 'Accelerates gum disease progression', 'Creates a feedback loop with diabetes'] },
    { id: 'sleep', label: 'Sleep', title: 'Sleep', accent: '#3A4E8C', icon: ASSET_BASE + 'icons/sleep.png', x: 200, y: 32, z: 2.6,
      headline: 'Jaw structure, tongue position, and airway size shape whether sleep is restful',
      body: 'Jaw structure, tongue position, and airway size — all mouth-adjacent factors — are central to whether sleep is restful or repeatedly interrupted. Undiagnosed airway restriction shows up first as snoring or fatigue, and correcting it at the source can resolve sleep issues that other approaches only manage.',
      facts: ['Airway anatomy (tongue position, jaw structure) as a driver of obstructive sleep apnea', 'Bruxism/TMJ disrupting sleep continuity', 'Correcting airway restriction resolves sleep issues'] },
    { id: 'posture', label: 'Posture', title: 'Posture', accent: '#6B5A3E', icon: ASSET_BASE + 'icons/posture.png', x: 366, y: 280, z: 2.3,
      bracket: { x: 300, yTop: 60, yBot: 500, depth: 32 },
      headline: 'How the jaw sits at rest shapes how the head balances on the spine',
      body: 'How the jaw sits at rest shapes how the head balances on the spine — a forward head posture from mouth breathing or a misaligned bite pulls on the neck and shoulders all day, and the same imbalances carry into how the body settles at night, disrupting sleep posture and breathing.',
      facts: ['Craniocervical posture linked to jaw position and airway patency', 'Mouth breathing and malocclusion associated with forward head posture', 'Jaw misalignment disrupts sleep positioning and breathing'] }
  ];
  var N = SYSTEMS.length, STEPS = N + 2;

  // Old markup this module supersedes — the whole original section, hidden
  // as one unit only once the new build succeeds, so a JS error leaves it
  // fully intact instead of blank.
  var LEGACY_SELECTORS = ['#wholeBodySection'];

  function ease(t) { return t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function build(mount) {
    var pts = [MOUTH].concat(SYSTEMS.map(function (s) { return { x: s.x, y: s.y }; }));
    var segs = [];
    for (var i = 1; i < pts.length; i++) {
      segs.push(Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    }

    mount.innerHTML =
      '<div class="mbcc-track" id="mbccTrack">' +
        '<div class="mbcc-stage">' +
          '<div class="mbcc-progress"><div class="mbcc-progress-fill" id="mbccBar"></div></div>' +
          '<div class="mbcc-figure-col" id="mbccFigureCol"><svg class="mbcc-svg" id="mbccSvg" viewBox="0 0 400 1000" preserveAspectRatio="xMidYMid meet">' +
            '<defs><symbol id="mbcc-ic-tooth" viewBox="5 5 90 90"><path d="M28 14C40 6 60 6 72 14c10 7 12 22 8 36-4 14-8 28-14 38-4 6-10 4-11-4l-3-24c-1-7-3-7-4 0l-3 24c-1 8-7 10-11 4-6-10-10-24-14-38-4-14-2-29 8-36Z"/></symbol></defs>' +
            '<g id="mbccCam">' +
              '<image id="mbccAnatomy" href="' + ASSET_BASE + 'anatomy.png" x="-75.16" y="18.32" width="550.3" height="973.8" preserveAspectRatio="xMidYMid meet" style="opacity:.98"></image>' +
              '<path id="mbccGuide" d="M200 144 L200 78 L196 252 L183 288 L204 378 L152 716 L110 290 L200 460 L300 440 L200 32 L366 280" pathLength="1" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
              '<g id="mbccSegGroup"></g>' +
              '<circle id="mbccTrav" r="7"></circle>' +
              '<g id="mbccMouth">' +
                '<circle cx="200" cy="144" r="10" fill="#0e2640" stroke="' + gold + '" stroke-width="1.4"></circle>' +
                '<use href="#mbcc-ic-tooth" x="194" y="138" width="12" height="12" fill="#FBF7F1"></use>' +
              '</g>' +
              '<g id="mbccMarkerGroup"></g>' +
            '</g>' +
          '</svg></div>' +
          '<div class="mbcc-content-col" id="mbccContentCol">' +
            '<div class="mbcc-eyebrow">The Mouth&ndash;Body Connection</div>' +
            '<div class="mbcc-panelbox" id="mbccPanelBox">' +
              '<div class="mbcc-layer" id="mbccIntro">' +
                '<h3 class="mbcc-intro-title">Your mouth is the gateway to your <em>overall health</em>.</h3>' +
                '<p class="mbcc-intro-text">What begins at the gumline rarely stays there. Scroll to follow the connection through nine systems it quietly shapes.</p>' +
                '<div class="mbcc-hint"><span class="line"></span>Begin the journey</div>' +
              '</div>' +
              '<div id="mbccPanelsHost"></div>' +
              '<div class="mbcc-layer" id="mbccFinal">' +
                '<h3 class="mbcc-final-title">Your mouth is not <em>separate</em> from your body.</h3>' +
                '<p class="mbcc-final-text">We treat it that way — as one system, examined and cared for in the context of everything it touches.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="mbcc-rail" id="mbccRail"></div>' +
        '</div>' +
      '</div>';

    var svg = mount.querySelector('#mbccSvg');
    var camG = mount.querySelector('#mbccCam');
    var guide = mount.querySelector('#mbccGuide');
    var segGroup = mount.querySelector('#mbccSegGroup');
    var trav = mount.querySelector('#mbccTrav');
    var mouthG = mount.querySelector('#mbccMouth');
    var markerGroup = mount.querySelector('#mbccMarkerGroup');
    var panelsHost = mount.querySelector('#mbccPanelsHost');
    var introLayer = mount.querySelector('#mbccIntro');
    var finalLayer = mount.querySelector('#mbccFinal');
    var railHost = mount.querySelector('#mbccRail');
    var bar = mount.querySelector('#mbccBar');
    var panelBox = mount.querySelector('#mbccPanelBox');
    var track = mount.querySelector('#mbccTrack');
    var figureCol = mount.querySelector('#mbccFigureCol');
    var contentCol = mount.querySelector('#mbccContentCol');

    var segPathEls = segs.map(function () {
      return svgEl('path', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: '1' });
    });
    segPathEls.forEach(function (p, k) {
      var A = pts[k], B = pts[k + 1];
      p.setAttribute('d', 'M ' + A.x + ' ' + A.y + ' L ' + B.x + ' ' + B.y);
      segGroup.appendChild(p);
    });

    var markerEls = SYSTEMS.map(function (sys) {
      var g = svgEl('g');
      var companion = null;
      if (sys.id === 'sleep') {
        // Sleep sits well off the body silhouette (it isn't a single organ) —
        // a bare marker floating in empty space read as orphaned/accidental.
        // A small shoulders-and-neck outline beneath the marker gives it a
        // tiny figure of its own to belong to, so the icon reads as "a
        // person, sleeping" rather than a disc adrift near the head.
        companion = svgEl('path', {
          d: 'M -23 40 Q -23 13 0 13 Q 23 13 23 40 L 23 47 Q 23 51 19 51 L -19 51 Q -23 51 -23 47 Z',
          fill: 'none'
        });
        g.appendChild(companion);
      }
      var halo = svgEl('circle', { r: 25 });
      var disc = svgEl('circle', { r: 17, fill: '#FBF6EF' });
      var image = svgEl('image', { href: sys.icon, x: -16, y: -16, width: 32, height: 32 });
      var text = svgEl('text', { 'text-anchor': 'middle' });
      text.textContent = sys.label;
      g.appendChild(halo); g.appendChild(disc); g.appendChild(image); g.appendChild(text);

      // Brace bracket: a sibling of the marker's own <g>, in the same
      // absolute canvas coordinate space as the guide path (not relative to
      // the marker translate), so it draws as a single curly-brace shape
      // spanning yTop..yBot rather than something anchored to the marker.
      var bracketPath = null;
      if (sys.bracket) {
        var bracket = sys.bracket;
        var yMid = (bracket.yTop + bracket.yBot) / 2;
        var d = 'M ' + bracket.x + ' ' + bracket.yTop +
          ' Q ' + (bracket.x + bracket.depth) + ' ' + bracket.yTop + ' ' + (bracket.x + bracket.depth) + ' ' + ((bracket.yTop + yMid) / 2) +
          ' Q ' + (bracket.x + bracket.depth) + ' ' + yMid + ' ' + (bracket.x + bracket.depth * 1.6) + ' ' + yMid +
          ' Q ' + (bracket.x + bracket.depth) + ' ' + yMid + ' ' + (bracket.x + bracket.depth) + ' ' + ((yMid + bracket.yBot) / 2) +
          ' Q ' + (bracket.x + bracket.depth) + ' ' + bracket.yBot + ' ' + bracket.x + ' ' + bracket.yBot;
        bracketPath = svgEl('path', {
          'd': d,
          'fill': 'none',
          'stroke': sys.accent,
          'stroke-width': '2'
        });
        markerGroup.appendChild(bracketPath);
      }

      markerGroup.appendChild(g);
      return { g: g, halo: halo, disc: disc, text: text, companion: companion, bracketPath: bracketPath };
    });

    var panelEls = SYSTEMS.map(function (sys, i) {
      var factsHtml = sys.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('');
      var div = el('div', 'mbcc-layer');
      div.innerHTML =
        '<div class="mbcc-panel-num-row">' +
          '<span class="mbcc-panel-num" style="color:' + sys.accent + '">' + String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0') + '</span>' +
          '<span class="mbcc-panel-label">' + sys.label + '</span>' +
        '</div>' +
        '<h3 class="mbcc-panel-title">' + sys.title + '</h3>' +
        '<div class="mbcc-panel-rule" style="background:' + sys.accent + '"></div>' +
        '<p class="mbcc-panel-headline">' + sys.headline + '</p>' +
        '<p class="mbcc-panel-body">' + sys.body + '</p>' +
        '<ul class="mbcc-panel-facts" style="color:' + sys.accent + '">' + factsHtml + '</ul>';
      panelsHost.appendChild(div);
      return { root: div, rule: div.querySelector('.mbcc-panel-rule') };
    });

    var railEls = Array.from({ length: STEPS }, function () { return el('div', 'mbcc-rail-dot'); });
    railEls.forEach(function (d, i) {
      d.style.background = (i === 0 || i === STEPS - 1) ? gold : SYSTEMS[i - 1].accent;
      railHost.appendChild(d);
    });

    var state = { p: 0, w: window.innerWidth, h: window.innerHeight };
    var cur = 0, target = 0, raf = null, lastStacked = null, lastIntroLayout = null;

    function render() {
      var p = state.p, W = state.w, H = state.h;
      var s = p * (STEPS - 1);
      var outro = clamp(s - N, 0, 1);
      var stacked = W <= STACK_BREAKPOINT;

      if (stacked !== lastStacked) {
        mount.classList.toggle('mbcc-stacked', stacked);
        // Touch scrolling covers far less distance per gesture than a mouse
        // wheel, so the same 900vh that feels fine on desktop meant dozens
        // of swipes to get through on mobile. Shortening the mobile track
        // doesn't change onScroll's math — span is read live off the
        // track's actual height on every scroll/resize.
        track.style.height = (stacked ? 550 : 900) + 'vh';
        lastStacked = stacked;
      }

      // Mobile-only: the intro has far less text than any system panel (no
      // headline, no facts), so it doesn't need the same tight image/text
      // split — showing the small per-system layout here just reads as a
      // small picture over a lot of empty space. Swaps to title-first,
      // bigger-centered-image-below while the intro is what's showing, then
      // hands back to the compact per-system layout once scrolling starts.
      var introLayout = stacked && s < 0.55;
      if (introLayout !== lastIntroLayout) {
        mount.classList.toggle('mbcc-intro-layout', introLayout);
        lastIntroLayout = introLayout;
      }

      var j = clamp(s, 0, N);
      var i0 = Math.max(0, Math.min(Math.floor(j), pts.length - 2));
      var f = clamp(j - i0, 0, 1);
      var ef = ease(f);
      var A = pts[i0], B = pts[i0 + 1] || A;
      var tx = A.x + (B.x - A.x) * ef, ty = A.y + (B.y - A.y) * ef;

      var zTo = SYSTEMS[Math.min(i0, N - 1)].z;
      var zFrom = i0 === 0 ? 1.0 : SYSTEMS[i0 - 1].z;
      var z = zFrom + (zTo - zFrom) * ef - (i0 === 0 ? 0 : 0.55 * Math.sin(Math.PI * ef));
      var est = Math.max(1 - ease(clamp(s, 0, 1)), ease(outro));
      var fx = tx + (200 - tx) * est, fy = ty + (510 - ty) * est;
      z = z + (1.02 - z) * est;
      var camX = 200 - fx * z, camY = 500 - fy * z;
      camG.setAttribute('transform', 'translate(' + camX.toFixed(2) + ' ' + camY.toFixed(2) + ') scale(' + z.toFixed(4) + ')');

      guide.style.stroke = gold;
      guide.style.strokeWidth = (2.2 / Math.max(1, z) * 1.6).toFixed(2);
      guide.style.strokeDasharray = '1';
      guide.style.strokeDashoffset = '0';
      guide.style.opacity = (0.16 - 0.08 * outro).toFixed(3);

      var segW = (2.4 / Math.max(1, z) * 1.6);
      segPathEls.forEach(function (pEl, k) {
        var destAccent = SYSTEMS[k].accent;
        var prog = k < i0 ? 1 : (k === i0 ? ef : 0);
        var active = k <= i0;
        pEl.style.stroke = destAccent;
        pEl.style.strokeWidth = segW.toFixed(2);
        pEl.style.strokeDasharray = '1';
        pEl.style.strokeDashoffset = (1 - prog).toFixed(4);
        pEl.style.opacity = active ? (0.85 - 0.55 * outro).toFixed(3) : 0;
      });

      var travAccent = i0 < N ? SYSTEMS[i0].accent : SYSTEMS[N - 1].accent;
      trav.style.fill = travAccent;
      trav.style.transform = 'translate(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px) scale(' + (1.4 / Math.max(1, z) * 1.5).toFixed(3) + ')';
      trav.style.opacity = (clamp((s - 0.04) * 12, 0, 1) * (0.9 - 0.7 * outro)).toFixed(3);
      trav.style.filter = 'drop-shadow(0 0 6px ' + travAccent + ')';

      mouthG.style.opacity = (1 - 0.88 * ease(s)).toFixed(3);

      SYSTEMS.forEach(function (sys, i) {
        var idx = i + 1;
        var a = ease(Math.max(0, 1 - Math.abs(s - idx)));
        var rest = 0.2 + 0.3 * ease(s) + 0.4 * outro;
        var lit = Math.max(rest, a);
        var k = (1 + 0.32 * a) / Math.max(0.7, z) * 1.2;
        var m = markerEls[i];
        m.g.setAttribute('transform', 'translate(' + sys.x + ' ' + sys.y + ') scale(' + k.toFixed(3) + ')');
        m.g.style.color = a > 0.05 ? sys.accent : 'rgba(92,10,10,.4)';
        m.g.style.opacity = (0.2 + 0.8 * lit).toFixed(3);
        m.halo.style.fill = sys.accent;
        m.halo.style.opacity = (0.22 * a).toFixed(3);
        m.disc.style.stroke = a > 0.05 ? sys.accent : 'rgba(92,10,10,.28)';
        m.disc.style.strokeWidth = (1 + a).toFixed(2);
        m.disc.style.fill = '#FBF6EF';
        m.text.style.fontFamily = "var(--font-body, 'Inter', sans-serif)";
        m.text.style.fontSize = '10px';
        m.text.style.fontWeight = '600';
        m.text.style.letterSpacing = '1.2px';
        m.text.style.textTransform = 'uppercase';
        m.text.style.fill = a > 0.4 ? sys.accent : 'rgba(92,10,10,.4)';
        m.text.style.transform = 'translateY(' + (m.companion ? 66 : 34) + 'px)';
        m.text.style.opacity = (a > 0.35 ? 1 : 0).toFixed(3);

        if (m.companion) {
          m.companion.style.stroke = a > 0.05 ? sys.accent : 'rgba(92,10,10,.32)';
          m.companion.style.strokeWidth = (1 + 0.4 * a).toFixed(2);
          m.companion.style.strokeLinejoin = 'round';
          m.companion.style.opacity = (0.32 + 0.5 * lit).toFixed(3);
        }

        if (m.bracketPath) {
          m.bracketPath.style.opacity = (0.2 + 0.8 * lit).toFixed(3);
        }

        var pd = Math.abs(s - idx);
        // 2.1 zeroed out a panel by pd=0.48, leaving a fully blank dead zone
        // between two adjacent systems' visible windows (midpoint of every
        // transition showed no text at all — the "scroll cuts off" bug).
        // 1.6 narrows that gap to zero (touching, not overlapping) so
        // there's always a moment of full text, without going so wide that
        // both panels sit on top of each other at ~50% opacity through the
        // whole transition, which just traded a blank gap for an illegible
        // double-exposed one.
        var o = clamp(1 - pd * 1.6, 0, 1);
        var pe = panelEls[i];
        pe.root.style.opacity = o.toFixed(3);
        pe.root.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        pe.root.style.transform = 'translateY(' + ((1 - o) * 16).toFixed(1) + 'px)';
        pe.rule.style.width = stacked ? (16 + 40 * o).toFixed(0) + '%' : '60px';
      });

      var oIntro = clamp(1 - s * 1.6, 0, 1);
      var oFinal = clamp((s - N) * 1.6, 0, 1);
      introLayer.style.opacity = oIntro.toFixed(3);
      introLayer.style.pointerEvents = oIntro > 0.5 ? 'auto' : 'none';
      finalLayer.style.opacity = oFinal.toFixed(3);
      finalLayer.style.pointerEvents = oFinal > 0.5 ? 'auto' : 'none';

      railEls.forEach(function (d, i) {
        var a = Math.max(0, 1 - Math.abs(s - i) * 1.4);
        d.style.height = (4 + 12 * a).toFixed(1) + 'px';
        d.style.opacity = (0.16 + 0.72 * a).toFixed(3);
      });

      bar.style.width = (p * 100).toFixed(2) + '%';

      var pad = stacked ? Math.round(Math.min(20, W * 0.05)) : Math.round(Math.min(72, Math.max(24, W * 0.044)));
      // Mirrors .mbcc-stage's own padding-top (clamp(85px,14vh,120px)) so the
      // budget below isn't handed out as if that space were still free —
      // it wasn't, which is why content used to run past the bottom of the
      // stage's own 100dvh box on top of overflowing its own text panel.
      // Must clear .nav's 72px fixed height, or the top of the figure
      // renders underneath the navbar instead of below it.
      var topPad = stacked ? Math.max(78, Math.min(H * 0.1, 95)) : 0;
      var stageH, panelH;
      if (stacked && introLayout) {
        // The intro is just a title, one short paragraph and a hint line —
        // sizing its box the same way as a system panel (image height
        // first, text gets whatever's left) left a tall mostly-empty box
        // above the image. Size the text box to what it actually needs
        // first, then hand the image everything else.
        panelH = Math.round(Math.max(150, Math.min(H * 0.26, 210)));
        stageH = Math.round(Math.max(220, H - topPad - panelH - 24));
      } else if (stacked) {
        stageH = Math.round(Math.max(170, Math.min(H * 0.42, 300)));
        panelH = Math.max(180, H - topPad - stageH - 40);
      } else {
        stageH = Math.round(H - 16);
        panelH = Math.max(300, Math.min(H * 0.5, 470));
      }

      figureCol.style.boxSizing = 'border-box';
      figureCol.style.flex = stacked ? '0 0 100%' : '1 1 46%';
      figureCol.style.padding = (stacked ? '14px 10px 0' : '12px');

      // Width fills the column instead of a narrow fixed formula — a tight
      // box was hard-clipping the zoomed-in figure at the edges (visible as
      // a straight cut through the body/markers). More width = more
      // letterboxed buffer around the "meet"-fit content before anything
      // panned/zoomed by the camera reaches the clip boundary.
      svg.style.height = stageH + 'px';
      svg.style.width = stacked ? Math.round(stageH * 0.95) + 'px' : '100%';
      svg.style.maxWidth = stacked ? '92%' : '100%';

      contentCol.style.boxSizing = 'border-box';
      contentCol.style.flex = stacked ? '0 0 100%' : '1 1 400px';
      contentCol.style.padding = stacked ? '6px 22px 20px' : pad + 'px ' + pad + 'px ' + pad + 'px';

      panelBox.style.height = Math.round(panelH) + 'px';
    }

    function onScroll() {
      if (window.innerWidth !== state.w || window.innerHeight !== state.h) {
        state.w = window.innerWidth; state.h = window.innerHeight;
      }
      var r = track.getBoundingClientRect();
      var span = Math.max(1, r.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -r.top / span));
    }

    // Without settling/visibility gates this loop called render() on every
    // single animation frame for as long as the page stayed open —
    // including while the section was scrolled far out of view or the
    // animation had already reached its target — competing with real
    // scroll/paint work and reading back as laggy scrolling everywhere on
    // the page, not just here.
    var isVisible = false;

    function tick() {
      var diff = target - cur;
      cur += diff * 0.26;
      if (Math.abs(diff) < 0.0004) cur = target;
      var changed = Math.abs(cur - state.p) > 0.00025;
      if (changed) state.p = cur;
      if (changed) render();
      var settled = Math.abs(target - cur) < 0.0004;
      raf = (isVisible && !settled) ? requestAnimationFrame(tick) : null;
    }

    function ensureLoop() {
      if (raf == null && isVisible) raf = requestAnimationFrame(tick);
    }

    // Only run the render loop while the track is actually on screen —
    // scrolling through the rest of the page shouldn't keep this ticking.
    var visibilityObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isVisible = entry.isIntersecting;
        if (isVisible) ensureLoop();
      });
    }, { rootMargin: '200px 0px' });
    visibilityObserver.observe(track);

    window.addEventListener('scroll', function () { onScroll(); ensureLoop(); }, { passive: true });
    window.addEventListener('resize', function () { onScroll(); ensureLoop(); });
    onScroll();
    cur = target;
    render();
  }

  function init() {
    var mount = document.getElementById('mbcConnection');
    if (!mount || mount.dataset.built === '1') return;
    try {
      build(mount);
      mount.dataset.built = '1';
      mount.classList.add('is-ready');
      mount.setAttribute('data-nav', 'light');
      mount.removeAttribute('aria-hidden');
      LEGACY_SELECTORS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (elx) {
          elx.style.setProperty('display', 'none', 'important');
          elx.querySelectorAll('video').forEach(function (v) {
            try {
              v.pause();
              v.removeAttribute('autoplay');
              v.querySelectorAll('source').forEach(function (s) { s.remove(); });
              v.load();
            } catch (e) {}
          });
        });
      });
    } catch (err) {
      mount.innerHTML = '';
      if (window.console) console.error('mbc-connection init failed, original section stays visible:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
