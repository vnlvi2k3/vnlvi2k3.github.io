/* ============================================================
   Publications — edit this list to update the page.
   type: "C" = conference, "J" = journal. Use "*" for equal contribution.
   ============================================================ */
const PUBLICATIONS = [
  { id: "C.12", type: "C", title: "Beyond Visible Boundaries: Benchmarking Foundation Models for Overlapping Cell Segmentation in Microscopic Imaging",
    authors: "VMK Nguyen, KNV Ngoc, Vi Vu, T Nguyen, TH Nguyen, M Xu",
    venue: "CVPRW 2026", venueFull: "IEEE/CVF CVPR Precognition Workshop", pdf: "https://openreview.net/pdf?id=sf2d1znfq8" },
  { id: "C.11", type: "C", title: "From Specialist to Generalist: Unlocking SAM's Learning Potential on Unlabeled Medical Images",
    authors: "Vi Vu*, HT Nguyen*, TT Nguyen*, TB Lam, TH Nguyen, T Wang, X Li, M Xu",
    venue: "ISBI 2026", venueFull: "IEEE 23rd International Symposium on Biomedical Imaging", pdf: "https://drive.google.com/file/d/1trY-g0lc0pdfvo-Zpt26Xly7amCg_GSH/view?usp=sharing" },
  { id: "C.10", type: "C", title: "Domain-Invariant Mixed-Domain Semi-Supervised Medical Image Segmentation with Clustered Maximum Mean Discrepancy Alignment",
    authors: "TH Nguyen, BT Lam, Thien Nguyen, TQK Bui, Vi Vu, KP Huynh, U Bagci, M Xu",
    venue: "ICASSP 2026", venueFull: "International Conference on Acoustics, Speech, and Signal Processing", pdf: "https://drive.google.com/file/d/1962tbzLZC2sDnHxWeMB2ZXx4qVCNjXYZ/view?usp=sharing" },
  { id: "C.9", type: "C", title: "Aligning What You Separate: Denoised Patch Mixing for Source-Free Domain Adaptation in Medical Image Segmentation",
    authors: "T Nguyen, TH Nguyen, TQK Bui, BT Lam, Vi Vu, KP Huynh, U Bagci, M Xu",
    venue: "ICASSP 2026", venueFull: "International Conference on Acoustics, Speech, and Signal Processing", pdf: "https://arxiv.org/pdf/2510.25227" },
  { id: "C.8", type: "C", title: "Modality-Specific Enhancement and Complementary Fusion for Semi-Supervised Multi-Modal Brain Tumor Segmentation",
    authors: "DT Chung, BT Lam, TH Nguyen, T Nguyen, Vi Vu, HL Cao, PK Huynh, M Xu",
    venue: "AIMedHealth @ AAAI 2026", venueFull: "AI for Medicine and Healthcare Bridge Program at AAAI-26", pdf: "https://openreview.net/pdf?id=USD3AI7eK6" },
  { id: "C.7", type: "C", title: "Semi-MoE: Mixture-of-Experts meets Semi-Supervised Histopathology Segmentation",
    authors: "Vi Vu*, TH Nguyen*, HT Nguyen, D Kihara, T Wang, X Li, M Xu",
    venue: "BMVC 2025", venueFull: "British Machine Vision Conference", pdf: "https://bmva-archive.org.uk/bmvc/2025/assets/papers/Paper_940/paper.pdf" },
  { id: "C.6", type: "C", title: "Semi-Supervised Histopathology Image Segmentation with Feature Diversified Collaborative Learning",
    authors: "Vi Vu*, TH Nguyen*, HT Nguyen, QV Dinh, X Li, M Xu",
    venue: "AAAI Bridge 2025", venueFull: "AI for Medicine and Healthcare Bridge Program", pdf: "https://raw.githubusercontent.com/mlresearch/v281/main/assets/nguyen25b/nguyen25b.pdf" },
  { id: "C.5", type: "C", title: "HDC: Hierarchical Distillation for Multi-level Noisy Consistency in Semi-Supervised Fetal Ultrasound Segmentation",
    authors: "Vi Vu*, TQK Le*, HH Pham, XL Huynh, TH Nguyen, MHN Le, Q Nguyen, HD Nguyen",
    venue: "CVPRW 2025", venueFull: "The 7th IEEE/CVF CVPR Precognition Workshop", pdf: "https://openaccess.thecvf.com/content/CVPR2025W/Precognition/papers/Le_HDC_Hierarchical_Distillation_for_Multi-level_Noisy_Consistency_in_Semi-Supervised_Fetal_CVPRW_2025_paper.pdf" },
  { id: "C.4", type: "C", title: "Learning Disentangled Stain and Structural Representations for Semi-Supervised Histopathology Segmentation",
    authors: "Vi Vu*, HH Pham*, TH Nguyen, U Bagci, M Xu, TN Le, HH Pham",
    venue: "COMPAYL @ MICCAI 2025", venueFull: "MICCAI Workshop on Computational Pathology with Multimodal Data", pdf: "https://arxiv.org/pdf/2507.03923" },
  { id: "C.3", type: "C", title: "Semi-Supervised Skin Lesion Segmentation under Dual Mask Ensemble with Feature Discrepancy Co-Training",
    authors: "TH Nguyen, T Nguyen, XB Nguyen, Vi Vu, VQ Dinh, F Meriaudeau",
    venue: "MIDL 2025", venueFull: "Medical Imaging with Deep Learning", pdf: "https://openreview.net/pdf?id=cBfXsr6xWb" },
  { id: "C.2", type: "C", title: "Fetal-BCP: Addressing Empirical Distribution Gap in Semi-Supervised Fetal Ultrasound Segmentation",
    authors: "HH Pham, HT Nguyen, Vi Vu, QV Dinh, TH Nguyen, X Li, M Xu",
    venue: "ISBI 2025", venueFull: "IEEE 22nd International Symposium on Biomedical Imaging", pdf: "https://ieeexplore.ieee.org/abstract/document/10980925/" },
  { id: "C.1", type: "C", title: "Hepatic Tumor Segmentation under Modified Scalable and Transferable nnU-Net Framework",
    authors: "TQK Bui, M Dinh, Vi Vu, Q Nguyen, Q Dinh, M Le, Q Le",
    venue: "CITA 2025", venueFull: "Conference on Information Technology and its Applications", pdf: "https://drive.google.com/file/d/1Sgsqsgdj1ZWBb3eNFcWEJ7Zz8GzzhRXq/view?usp=sharing" },
  { id: "J.4", type: "J", title: "UP2D: Uncertainty-aware Progressive Pseudo-label Denoising for Source-Free Domain Adaptive Medical Image Segmentation",
    authors: "TQK Bui, T Nguyen, D Ho, B Lam, Vi Vu, T Nguyen, P Huynh, U Bagci",
    venue: "Neurocomputing 2026", venueFull: "IF 6.5", pdf: "https://drive.google.com/file/d/15gHmvcjdScQB4dR31hgzmQ3mvrKzgANN/view?usp=sharing" },
  { id: "J.3", type: "J", title: "Adaptive Knowledge Transferring with Switching Dual-Student Framework for Semi-Supervised Medical Image Segmentation",
    authors: "TH Nguyen, HT Nguyen, Vi Vu, BT Lam, BX Nguyen, J Xing, T Wang, X Li, M Xu",
    venue: "Pattern Recognition 2025", venueFull: "IF 7.6", pdf: "https://arxiv.org/pdf/2510.24366" },
  { id: "J.2", type: "J", title: "DuetMatch: Harmonizing Semi-Supervised Brain MRI Segmentation via Decoupled Branch Optimization",
    authors: "TH Nguyen, HT Nguyen, Vi Vu, BT Lam, P Huynh, T Wang, X Li, U Bagci, M Xu",
    venue: "CMIG 2025", venueFull: "Computerized Medical Imaging and Graphics · IF 4.9", pdf: "https://arxiv.org/pdf/2510.16146" },
  { id: "J.1", type: "J", title: "Performance analysis of artificial intelligence–driven convolutional neural network architectures for liver tumor segmentation",
    authors: "MHN Le, TH Nguyen, MT Dinh, TQK Bui, Vi Vu, HQ Kha, PK Nguyen, NHH Le, TM Nguyen, HH Huynh, K Le",
    venue: "J. Clinical Oncology 2025", venueFull: "IF 42.1", pdf: "https://ascopubs.org/doi/abs/10.1200/JCO.2025.43.16_suppl.e16307" },
];

const ME = "Vi Vu";

/* ---------- Render publications ---------- */
function escapeHtml(s) {
  return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function renderPubs() {
  const list = document.getElementById("pubs");
  list.innerHTML = PUBLICATIONS.map(p => {
    const first = p.authors.startsWith(ME);
    const authors = escapeHtml(p.authors).replace(
      new RegExp(ME.replace(" ", "\\s") + "\\*?"),
      m => `<span class="me">${m}</span>`
    );
    return `
      <li class="pub" data-type="${p.type}" data-first="${first}">
        <span class="pub-tag ${p.type}">${p.id}</span>
        <div>
          <p class="pub-title">${escapeHtml(p.title)}</p>
          <p class="pub-authors">${authors}</p>
          <div class="pub-meta">
            <span class="venue">${escapeHtml(p.venue)}</span>
            <span class="venue-full">${escapeHtml(p.venueFull)}</span>
            ${first ? '<span class="badge-first">first author</span>' : ""}
            ${p.pdf ? `<a class="pub-link" href="${p.pdf}" target="_blank" rel="noopener">pdf ↗</a>` : ""}
          </div>
        </div>
      </li>`;
  }).join("");
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter");
  buttons.forEach(btn => btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(".pub").forEach(el => {
      const show = f === "all" || (f === "first" ? el.dataset.first === "true" : el.dataset.type === f);
      el.classList.toggle("hidden", !show);
    });
  }));
}

/* ---------- Typed tagline ---------- */
function setupTyped() {
  const el = document.getElementById("typed");
  const lines = [
    "|ψ⟩ = α|computer science⟩ + β|physics⟩ + γ|medicine⟩",
    "learning from imperfect biomedical data",
    "semi-supervised · foundation models · multimodal",
    "model.fit(unlabeled_images)  # the interesting part",
  ];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = lines[0]; return; }
  let li = 0, ci = 0, deleting = false;
  (function tick() {
    const line = lines[li];
    ci += deleting ? -1 : 1;
    el.textContent = line.slice(0, ci);
    let delay = deleting ? 22 : 48;
    if (!deleting && ci === line.length) { deleting = true; delay = 2200; }
    else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 400; }
    setTimeout(tick, delay);
  })();
}

/* ---------- Theme + menu ---------- */
function setupTheme() {
  const root = document.documentElement;
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    field.refreshColor();
  });
  const menu = document.getElementById("nav-links");
  document.getElementById("menu-toggle").addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

/* ---------- Scroll reveal + active nav ---------- */
function setupScroll() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  const links = [...document.querySelectorAll(".nav-links a")];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
}

/* ---------- Background: particles under gravity, linked like a neural net ---------- */
const field = (() => {
  const canvas = document.getElementById("field");
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = { x: -1e4, y: -1e4, active: false };
  let W, H, dpr, particles = [], rgb = "94, 234, 212";

  function refreshColor() {
    rgb = getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || rgb;
    if (reduced) draw();
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = innerWidth * dpr;
    H = canvas.height = innerHeight * dpr;
    const n = Math.round(Math.min(90, (innerWidth * innerHeight) / 16000));
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3 * dpr, vy: (Math.random() - 0.5) * 0.3 * dpr,
      m: 0.6 + Math.random() * 1.4,
    }));
    if (reduced) draw();
  }

  function step() {
    const G = 250 * dpr ** 3, soft = 900 * dpr * dpr, vmax = 1.6 * dpr, base = 0.35 * dpr;
    for (const p of particles) {
      if (mouse.active) {
        // Newtonian attraction toward the cursor, softened to avoid singularities
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const r2 = dx * dx + dy * dy + soft;
        const a = G / (r2 * Math.sqrt(r2));
        p.vx += a * dx; p.vy += a * dy;
      }
      const v = Math.hypot(p.vx, p.vy);
      if (v > vmax) { p.vx *= vmax / v; p.vy *= vmax / v; }
      else if (v > base) { p.vx *= 0.995; p.vy *= 0.995; } // gentle drag back to drift speed
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += W; else if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H; else if (p.y > H) p.y -= H;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const link = 130 * dpr, link2 = link * link;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < link2) {
          ctx.strokeStyle = `rgba(${rgb}, ${0.16 * (1 - d2 / link2)})`;
          ctx.lineWidth = dpr * 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      ctx.fillStyle = `rgba(${rgb}, 0.55)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.m * dpr, 0, Math.PI * 2); ctx.fill();
    }
  }

  function loop() {
    if (!document.hidden) { step(); draw(); }
    requestAnimationFrame(loop);
  }

  addEventListener("resize", resize);
  addEventListener("pointermove", e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; mouse.active = true; });
  document.addEventListener("pointerleave", () => { mouse.active = false; });

  return {
    start() { resize(); refreshColor(); if (!reduced) loop(); },
    refreshColor,
  };
})();

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderPubs();
setupFilters();
setupTyped();
setupTheme();
setupScroll();
field.start();
