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


  /* Auto-switch between brain mode (light) and AI mode (dark) every 15 s,
     until the visitor picks a mode with the toggle. */
  var PERIOD = 15000;
  var toggle = document.getElementById("theme-toggle");
  if (toggle && !reduced) {
    var timer = null;
    root.classList.add("auto-theme");
    function restartRing() {
      root.classList.remove("ticking");
      void root.offsetWidth;
      root.classList.add("ticking");
    }
    function schedule() {
      clearTimeout(timer);
      restartRing();
      timer = setTimeout(function () {
        if (!document.hidden) {
          root.classList.add("theme-anim");
          root.dataset.theme = isAI() ? "light" : "dark";
          setTimeout(function () { root.classList.remove("theme-anim"); }, 1100);
        }
        schedule();
      }, PERIOD);
    }
    toggle.addEventListener("click", function () {
      clearTimeout(timer);
      root.classList.remove("auto-theme", "ticking");
      toggle.title = "Switch between brain mode (light) and AI mode (dark)";
    });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && root.classList.contains("auto-theme")) schedule(); });
    schedule();
  }

  /* Keyboard: press T to switch modes */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "t" && e.key !== "T") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable) return;
    var t = document.getElementById("theme-toggle");
    if (t) t.click();
  });

  /* Footer: latest commit, live from GitHub */
  var commitEl = document.querySelector(".colophon .commit");
  if (commitEl && window.fetch) {
    fetch("https://api.github.com/repos/vnlvi2k3/vnlvi2k3.github.io/commits/main")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.sha) return;
        var day = (d.commit && d.commit.committer && d.commit.committer.date || "").slice(0, 10);
        commitEl.innerHTML = ' · commit <a href="' + d.html_url + '">' + d.sha.slice(0, 7) + "</a>" + (day ? " (" + day + ")" : "");
      })
      .catch(function () {});
  }

  /* A note for whoever opens the console */
  try {
    console.log(
      "%c  ⌁ hello, curious mind  %c\n\nYou opened the console, which is exactly what a good scientist would do.\nThis page is hand-written: no frameworks, one CSS file, ~150 lines of JS.\nThe neuron fires on hover. Press T to switch between brain and AI mode.\n\n— Vi Vu · vi.vu [at] duke [dot] edu",
      "font: 600 14px/2 Georgia, serif; color: #fff; background: linear-gradient(90deg, #c8553d, #3b4ec2); padding: 4px 10px; border-radius: 4px;",
      "font: 12px/1.6 ui-monospace, monospace; color: inherit;"
    );
  } catch (e) {}
})();
