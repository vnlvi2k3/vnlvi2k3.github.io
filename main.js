/* Interactions for the homepage:
   1. the neuron figure fires (H1 forward in brain mode, H2 backward in AI mode)
   2. the signal line morphs between a spike train and digital pulses on mode switch
   3. a toy representational-similarity demo (brain RDM vs. model RDM) */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var root = document.documentElement;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function isAI() { return root.dataset.theme === "dark"; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

  /* ---------------- 1. Firing neuron ---------------- */
  var fig = document.querySelector(".convergence");
  if (fig) {
    var svg = fig.querySelector("svg");
    var axon = svg.querySelector('path[stroke="url(#axon)"]');
    var terms = Array.prototype.slice.call(svg.querySelectorAll(".terminals path"));
    var nodes = Array.prototype.slice.call(svg.querySelectorAll(".nodes circle"));
    var edges = Array.prototype.slice.call(svg.querySelectorAll(".edges line"));
    var soma = svg.querySelector(".soma");
    var layers = [520, 610, 700].map(function (x) {
      return nodes.filter(function (n) { return Math.round(+n.getAttribute("cx")) === x; });
    });
    var edgeLayers = [520, 610].map(function (x) {
      return edges.filter(function (e) { return Math.round(+e.getAttribute("x1")) === x; });
    });
    var pulses = document.createElementNS(NS, "g");
    pulses.setAttribute("class", "pulses");
    svg.appendChild(pulses);
    var busy = false;

    function travel(path, ms, reverse, cls) {
      return new Promise(function (resolve) {
        var dot = document.createElementNS(NS, "circle");
        dot.setAttribute("r", "5.5");
        dot.setAttribute("class", "spike-dot " + cls);
        pulses.appendChild(dot);
        var len = path.getTotalLength();
        var t0 = performance.now();
        (function step(t) {
          var p = Math.min(1, (t - t0) / ms);
          var pt = path.getPointAtLength((reverse ? 1 - ease(p) : ease(p)) * len);
          dot.setAttribute("cx", pt.x);
          dot.setAttribute("cy", pt.y);
          if (p < 1) requestAnimationFrame(step); else { dot.remove(); resolve(); }
        })(t0);
      });
    }
    function flash(els) {
      els.forEach(function (e) { e.classList.add("lit"); });
      setTimeout(function () { els.forEach(function (e) { e.classList.remove("lit"); }); }, 650);
    }
    async function fire() {
      if (busy || reduced) return;
      busy = true;
      fig.classList.add("firing");
      if (!isAI()) {                       // H1: brain -> machine
        flash([soma]);
        await travel(axon, 700, false, "d-brain");
        await Promise.all(terms.map(function (p) { return travel(p, 340, false, "d-ai"); }));
        for (var i = 0; i < 3; i++) {
          flash(layers[i]);
          if (i < 2) flash(edgeLayers[i]);
          await wait(210);
        }
      } else {                             // H2: machine -> brain
        for (var j = 2; j >= 0; j--) {
          flash(layers[j]);
          if (j > 0) flash(edgeLayers[j - 1]);
          await wait(210);
        }
        await Promise.all(terms.map(function (p) { return travel(p, 340, true, "d-ai"); }));
        await travel(axon, 700, true, "d-brain");
        flash([soma]);
      }
      await wait(450);
      fig.classList.remove("firing");
      busy = false;
    }
    fig.addEventListener("click", fire);
    fig.addEventListener("mouseenter", fire);
    if ("IntersectionObserver" in window) {
      var seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { setTimeout(fire, 400); seen.disconnect(); } });
      }, { threshold: 0.6 });
      seen.observe(fig);
    }
  }

  /* ---------------- 2. Spike train <-> digital pulses ---------------- */
  var N = 1000, BASE = 44;
  function interp(kps) {
    var ys = new Float32Array(N + 1), k = 0;
    for (var x = 0; x <= N; x++) {
      while (k < kps.length - 2 && kps[k + 1][0] < x) k++;
      var a = kps[k], b = kps[k + 1];
      var t = b[0] === a[0] ? 0 : Math.min(1, Math.max(0, (x - a[0]) / (b[0] - a[0])));
      ys[x] = a[1] + (b[1] - a[1]) * t;
    }
    return ys;
  }
  var spikeKps = [[0, BASE]];
  [30, 82, 96, 160, 226, 240, 300, 372, 386, 446, 520, 574, 588, 650, 712, 726, 790, 860, 874, 940]
    .forEach(function (s) {
      spikeKps.push([s - 8, BASE], [s - 1, BASE - 8], [s + 1, BASE - 40], [s + 4, BASE + 9], [s + 16, BASE]);
    });
  spikeKps.push([N, BASE]);
  var pulseKps = [[0, BASE]];
  [[24, 22], [70, 12], [94, 30], [150, 14], [180, 22], [230, 34], [286, 12], [310, 20], [356, 28], [408, 14],
   [438, 22], [490, 30], [540, 22], [580, 12], [604, 30], [660, 14], [690, 22], [740, 34], [796, 12], [820, 20],
   [866, 28], [918, 14], [948, 22]].forEach(function (p) {
    pulseKps.push([p[0], BASE], [p[0] + 0.6, BASE - 30], [p[0] + p[1], BASE - 30], [p[0] + p[1] + 0.6, BASE]);
  });
  pulseKps.push([N, BASE]);
  var SPIKES = interp(spikeKps), PULSES = interp(pulseKps);

  var signals = Array.prototype.slice.call(document.querySelectorAll("svg.signal")).map(function (s, i) {
    var path = s.querySelector(".sig-line");
    var defs = document.createElementNS(NS, "defs");
    var grad = document.createElementNS(NS, "linearGradient");
    var id = "sig-grad-" + i;
    grad.setAttribute("id", id);
    grad.setAttribute("gradientUnits", "userSpaceOnUse");
    grad.setAttribute("x1", "0"); grad.setAttribute("x2", "1000");
    grad.setAttribute("y1", "0"); grad.setAttribute("y2", "0");
    var s1 = document.createElementNS(NS, "stop"), s2 = document.createElementNS(NS, "stop");
    grad.appendChild(s1); grad.appendChild(s2);
    defs.appendChild(grad); s.insertBefore(defs, s.firstChild);
    path.setAttribute("stroke", "url(#" + id + ")");
    return { path: path, s1: s1, s2: s2 };
  });
  function cssVar(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }
  function draw(from, to, front) {             // front in [-100, 1100]: left of it shows `to`
    var d = "M0 " + to[0].toFixed(1);
    for (var x = 0; x <= N; x++) {
      var s = Math.min(1, Math.max(0, (front - x) / 90));
      s = s * s * (3 - 2 * s);
      var y = from[x] + (to[x] - from[x]) * s;
      d += (x ? " L" : "M") + x + " " + y.toFixed(1);
    }
    return d;
  }
  var current = isAI() ? PULSES : SPIKES;
  function paintStatic() {
    var col = isAI() ? cssVar("--ai") : cssVar("--brain");
    signals.forEach(function (g) {
      g.path.setAttribute("d", draw(current, current, 1100));
      g.s1.setAttribute("offset", "0"); g.s1.setAttribute("stop-color", col);
      g.s2.setAttribute("offset", "1"); g.s2.setAttribute("stop-color", col);
    });
  }
  paintStatic();
  var morphing = null;
  function morphTo(target) {
    if (target === current) { paintStatic(); return; }
    var from = current, oldCol = target === PULSES ? cssVar("--brain") : cssVar("--ai");
    current = target;
    var newCol = target === PULSES ? cssVar("--ai") : cssVar("--brain");
    if (reduced) { paintStatic(); return; }
    var t0 = performance.now(), dur = 1100;
    if (morphing) cancelAnimationFrame(morphing);
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), front = -100 + 1200 * ease(p);
      var off = Math.min(1, Math.max(0, front / 1000));
      signals.forEach(function (g) {
        g.path.setAttribute("d", draw(from, target, front));
        g.s1.setAttribute("offset", Math.max(0, off - 0.04)); g.s1.setAttribute("stop-color", newCol);
        g.s2.setAttribute("offset", Math.min(1, off + 0.04)); g.s2.setAttribute("stop-color", oldCol);
      });
      if (p < 1) morphing = requestAnimationFrame(step); else { morphing = null; paintStatic(); }
    })(t0);
  }
  new MutationObserver(function () { morphTo(isAI() ? PULSES : SPIKES); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  /* ---------------- 3. Representational similarity demo (toy data) ---------------- */
  var rsa = document.getElementById("rsa");
  if (rsa) {
    var CATS = ["face", "body", "animal", "fruit", "vegetable", "tool", "vehicle", "house"];
    // "brain" features: animacy, face-ness, naturalness, man-made scale
    var BRAIN_F = [
      [1.0, 1.0, 0.3, 0.0], [0.9, 0.5, 0.3, 0.0], [0.8, 0.4, 0.6, 0.0], [0.2, 0.0, 1.0, 0.0],
      [0.15, 0.0, 1.0, 0.0], [0.0, 0.0, 0.1, 0.3], [0.0, 0.0, 0.0, 0.8], [0.0, 0.0, 0.1, 1.0]];
    // low-level features: color warmth, curvature, texture, brightness
    var LOW_F = [
      [0.7, 0.9, 0.2, 0.6], [0.6, 0.6, 0.3, 0.5], [0.5, 0.7, 0.9, 0.4], [0.9, 0.9, 0.2, 0.7],
      [0.2, 0.7, 0.6, 0.5], [0.3, 0.2, 0.3, 0.6], [0.4, 0.4, 0.2, 0.7], [0.5, 0.1, 0.7, 0.5]];
    var LAYERS = ["pixels", "conv1", "conv2", "conv3", "conv4", "fc"];
    var MIX = [0.0, 0.2, 0.42, 0.62, 0.8, 0.93];
    var seed = 7;
    function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    var NOISE = LAYERS.map(function () { return CATS.map(function () { return [0, 0, 0, 0].map(function () { return (rand() - 0.5) * 0.25; }); }); });

    function rdm(F) {
      var D = CATS.map(function (_, i) { return CATS.map(function (_, j) {
        var s = 0; for (var k = 0; k < F[i].length; k++) s += Math.pow(F[i][k] - F[j][k], 2);
        return Math.sqrt(s);
      }); });
      var mx = 0; D.forEach(function (r) { r.forEach(function (v) { mx = Math.max(mx, v); }); });
      return D.map(function (r) { return r.map(function (v) { return v / mx; }); });
    }
    function modelFeatures(l) {
      return CATS.map(function (_, i) { return LOW_F[i].map(function (v, k) {
        return (1 - MIX[l]) * v + MIX[l] * BRAIN_F[i][k] + NOISE[l][i][k] * (1 - MIX[l] * 0.6);
      }); });
    }
    function upper(D) { var o = []; for (var i = 0; i < D.length; i++) for (var j = i + 1; j < D.length; j++) o.push(D[i][j]); return o; }
    function ranks(a) {
      var idx = a.map(function (v, i) { return [v, i]; }).sort(function (x, y) { return x[0] - y[0]; });
      var r = new Array(a.length);
      idx.forEach(function (p, k) { r[p[1]] = k; });
      return r;
    }
    function spearman(a, b) {
      var ra = ranks(a), rb = ranks(b), n = a.length, ma = (n - 1) / 2, num = 0, da = 0, db = 0;
      for (var i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - ma); da += Math.pow(ra[i] - ma, 2); db += Math.pow(rb[i] - ma, 2); }
      return num / Math.sqrt(da * db);
    }

    var BRAIN = rdm(BRAIN_F);
    var brainGrid = rsa.querySelector(".rdm-brain .rdm-grid");
    var modelGrid = rsa.querySelector(".rdm-model .rdm-grid");
    var rhoEl = rsa.querySelector(".rho"), layerEl = rsa.querySelector(".layer-name");
    var tip = rsa.querySelector(".rsa-tip"), slider = rsa.querySelector("input[type=range]");
    var MODEL = rdm(modelFeatures(0));

    function build(grid, tone) {
      var corner = document.createElement("span"); corner.className = "lbl"; grid.appendChild(corner);
      CATS.forEach(function (c) { var s = document.createElement("span"); s.className = "lbl lbl-top"; s.textContent = c; grid.appendChild(s); });
      var cells = [];
      CATS.forEach(function (c, i) {
        var s = document.createElement("span"); s.className = "lbl lbl-side"; s.textContent = c; grid.appendChild(s);
        cells.push(CATS.map(function (_, j) {
          var cell = document.createElement("span");
          cell.className = "cell " + tone; cell.dataset.i = i; cell.dataset.j = j;
          grid.appendChild(cell); return cell;
        }));
      });
      return cells;
    }
    var bCells = build(brainGrid, "c-brain"), mCells = build(modelGrid, "c-ai");
    function paint(cells, D) {
      cells.forEach(function (row, i) { row.forEach(function (cell, j) { cell.style.setProperty("--d", (D[i][j] * 100).toFixed(0) + "%"); }); });
    }
    function update() {
      var l = +slider.value;
      MODEL = rdm(modelFeatures(l));
      paint(mCells, MODEL);
      var rho = spearman(upper(BRAIN), upper(MODEL));
      rhoEl.textContent = rho.toFixed(2);
      rhoEl.style.setProperty("--p", Math.max(0, rho) * 100 + "%");
      layerEl.textContent = LAYERS[l];
    }
    paint(bCells, BRAIN);
    update();
    slider.addEventListener("input", update);

    function hover(e) {
      var c = e.target.closest(".cell");
      rsa.querySelectorAll(".cell.hl").forEach(function (x) { x.classList.remove("hl"); });
      if (!c) { tip.textContent = "Hover a cell to compare a pair of categories."; return; }
      var i = +c.dataset.i, j = +c.dataset.j;
      bCells[i][j].classList.add("hl"); mCells[i][j].classList.add("hl");
      tip.textContent = i === j
        ? CATS[i] + " vs. itself: dissimilarity 0"
        : CATS[i] + " × " + CATS[j] + " — brain " + BRAIN[i][j].toFixed(2) + " · model " + MODEL[i][j].toFixed(2);
    }
    rsa.addEventListener("mouseover", hover);
    rsa.addEventListener("mouseleave", function () { hover({ target: rsa }); });
  }
})();
