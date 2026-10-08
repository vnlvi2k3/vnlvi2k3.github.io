/* The neuron figure fires: H1 forward (brain -> machine) in brain mode,
   H2 backward (machine -> brain) in AI mode. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var root = document.documentElement;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function isAI() { return root.dataset.theme === "dark"; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

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

})();
