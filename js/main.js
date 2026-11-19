/*
  Renders content from js/content.js into the page and drives the
  small interactions (hero word rotator + scroll reveal animations).
  You shouldn't need to edit this file — edit js/content.js instead.
*/

function renderNav(listEl) {
  if (!listEl) return;
  listEl.innerHTML = SITE_CONTENT.nav
    .map((item) => {
      const href = encodeURI(item.href);
      const isPdf = item.href.toLowerCase().endsWith(".pdf");
      const isExternal = /^https?:\/\//i.test(item.href);
      // render icon link if provided
      if (item.icon) {
        return `<li><a href="${href}"${isExternal ? ' target="_blank" rel="noopener"' : ""}><img src="${item.icon}" alt="${item.label}" class="nav-icon"/></a></li>`;
      }
      return `<li><a href="${href}"${isPdf ? " download" : ""}${isExternal ? ' target="_blank" rel="noopener"' : ""}>${item.label}</a></li>`;
    })
    .join("");
}

function renderNames() {
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = SITE_CONTENT.name;
  });
}

function renderHomepage() {
  const cardsEl = document.querySelector("[data-cards]");
  if (cardsEl) {
    cardsEl.innerHTML = SITE_CONTENT.cards
      .map(
        (card) => `<a class="project-card" href="${encodeURI(card.href)}">
        <div class="card-media">
          <img src="${card.image}" alt="${card.title}" />
        </div>
        <div class="card-content">
          <div class="card-title">${card.title}</div>
          <div class="card-subtitle">${card.subtitle}</div>
        </div>
      </a>`,
      )
      .join("");
  }

  const logosEl = document.querySelector("[data-logos]");
  if (logosEl) {
    const logoItems = SITE_CONTENT.workedAt
      .map(
        (item) =>
          `<div class="logo-item"><img src="${item.logo}" alt="${item.name}" loading="lazy" /></div>`,
      )
      .join("");

    // Duplicate the set for a seamless scroll effect.
    logosEl.innerHTML = logoItems + logoItems;
  }

  const logoMoreEl = document.querySelector("[data-logo-more]");
  if (logoMoreEl) {
    logoMoreEl.textContent = SITE_CONTENT.workedAtMore || "";
  }

  const recEl = document.querySelector("[data-recommendation]");
  if (recEl) {
    const r = SITE_CONTENT.recommendation;
    recEl.innerHTML = `
      <div class="rec-head">
        <img src="${r.photo}" alt="${r.name}" />
        <div>
          <div class="rec-name">${r.name}</div>
          <div class="rec-title">${r.title}</div>
        </div>
      </div>
      <div class="rec-quote-block">
        <span class="quote-mark quote-mark-open">&ldquo;</span>
        <p class="rec-quote">${r.quote}</p>
      </div>
      <span class="quote-mark quote-mark-close">&rdquo;</span>
    `;
  }

  const recEl2 = document.querySelector("[data-recommendation-2]");
  if (recEl2) {
    const r2 = SITE_CONTENT.recommendation2 || SITE_CONTENT.recommendation;
    recEl2.innerHTML = `
      <div class="rec-head">
        <img src="${r2.photo}" alt="${r2.name}" />
        <div>
          <div class="rec-name">${r2.name}</div>
          <div class="rec-title">${r2.title}</div>
        </div>
      </div>
      <div class="rec-quote-block">
        <span class="quote-mark quote-mark-open">&ldquo;</span>
        <p class="rec-quote">${r2.quote}</p>
      </div>
      <span class="quote-mark quote-mark-close">&rdquo;</span>
    `;
  }

  initHeroRotator();
}

function initHeroRotator() {
  const el = document.querySelector("[data-rotator]");
  if (!el || !SITE_CONTENT.heroRotator.length) return;

  let i = 0;
  el.textContent = SITE_CONTENT.heroRotator[0];

  setInterval(() => {
    el.classList.add("swap");
    setTimeout(() => {
      i = (i + 1) % SITE_CONTENT.heroRotator.length;
      el.textContent = SITE_CONTENT.heroRotator[i];
      el.classList.remove("swap");
    }, 350);
  }, 2000);
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((el) => observer.observe(el));
}

function initStardustTrail() {
  // Skip on touch devices — there's no hovering cursor to follow.
  if (!window.matchMedia("(pointer: fine)").matches) return;
  // Respect users who've asked for reduced motion.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.className = "stardust-layer";
  document.body.appendChild(layer);

  // Exactly the glyphs from ". ܁₊ ⊹ . ܁˖ . ܁" — weighted like that string
  // (mostly dots, with the odd plus/sparkle).
  const GLYPHS = [".", ".", ".", "܁", "܁", "܁", "₊", "⊹", "˖"];

  const particles = [];
  const MAX = 60; // hard cap so fast movement can't flood the DOM
  const SPAWN_GAP = 8; // px of cursor travel between spawns → a tight trail that hugs the cursor

  let mouseX = -100;
  let mouseY = -100;
  let lastX = mouseX;
  let lastY = mouseY;
  let haveMouse = false;

  function spawn(x, y) {
    // A single small, upright, solid-black glyph that briefly trails the cursor.
    const el = document.createElement("span");
    el.className = "stardust";
    el.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const size = 6 + Math.random() * 6; // 6–12px glyphs
    el.style.fontSize = size + "px";
    layer.appendChild(el);

    // Barely any drift, so each glyph stays on the path it was dropped on and
    // the trail hugs the cursor.
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.03 + Math.random() * 0.1;
    particles.push({
      el,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      ttl: 550 + Math.random() * 350, // short-ish life → small lag, tight following
    });

    // Enforce the cap by retiring the oldest particle early.
    if (particles.length > MAX) {
      particles.shift().el.remove();
    }
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!haveMouse) {
      lastX = mouseX;
      lastY = mouseY;
      haveMouse = true;
    }
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    const dist = Math.hypot(dx, dy);
    if (dist >= SPAWN_GAP) {
      // Drop a few specks along the path travelled since the last spawn so
      // fast movement still leaves a continuous trail rather than gaps.
      const steps = Math.min(4, Math.floor(dist / SPAWN_GAP));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        spawn(
          lastX + dx * t + (Math.random() - 0.5) * 6,
          lastY + dy * t + (Math.random() - 0.5) * 6,
        );
      }
      lastX = mouseX;
      lastY = mouseY;
    }
  });

  let last = performance.now();
  function animate(now) {
    const dt = now - last;
    last = now;
    const step = dt / 16.67; // normalise motion to ~60fps regardless of frame rate
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      const k = p.life / p.ttl; // 0 → 1 across its lifetime
      if (k >= 1) {
        p.el.remove();
        particles.splice(i, 1);
        continue;
      }
      p.x += p.vx * step;
      p.y += p.vy * step;
      // Solid black for most of its life, then a slow, soft fade-out so it
      // dissolves rather than popping off. Upright — no rotation.
      const FADE_START = 0.4;
      const op =
        k <= FADE_START
          ? 1
          : Math.pow(1 - (k - FADE_START) / (1 - FADE_START), 2);
      p.el.style.opacity = op.toFixed(3);
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-header nav");
  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMenu() {
    toggle.classList.add("is-open");
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu once a link is tapped, so it doesn't stay open after navigating.
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
}

// Types the hero heading out one character at a time, with a single
// underscore caret riding the typing head that disappears once it's done.
// Reads its tokens from the existing [data-typewriter] markup, so the HTML
// stays the source of truth (and shows normally if JS is off).
function initTypewriter() {
  const el = document.querySelector("[data-typewriter]");
  if (!el) return;

  // Respect reduced-motion: leave the heading as-is, no animation.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Build the token list from the current contents: text nodes become
  // one token per character; an element (the waving emoji) becomes a
  // single token that carries an optional pause after it.
  const tokens = [];
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      Array.from(node.textContent).forEach((char) => tokens.push({ char }));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      tokens.push({
        node: node.cloneNode(true),
        pauseAfter: parseInt(node.getAttribute("data-pause-after") || "0", 10),
      });
    }
  });

  const PER_CHAR = 110; // ms between characters
  const START_DELAY = 450; // small beat before it starts

  // Make sure the full heading is still announced to screen readers even
  // though we're about to clear and retype it.
  if (!el.getAttribute("aria-label")) {
    el.setAttribute("aria-label", el.textContent.trim());
  }

  el.textContent = "";
  const typed = document.createElement("span");
  typed.className = "typed";
  const caret = document.createElement("span");
  caret.className = "type-caret";
  caret.setAttribute("aria-hidden", "true");
  el.append(typed, caret);

  let i = 0;
  function step() {
    if (i >= tokens.length) {
      // leave the underscore after the period and flicker it twice, then loop
      caret.classList.add("is-final");
      caret.addEventListener("animationend", restart, { once: true });
      return;
    }
    const tok = tokens[i++];
    typed.appendChild(tok.node || document.createTextNode(tok.char));
    el.appendChild(caret); // keep the caret last so it stays at the typing head
    setTimeout(step, PER_CHAR + (tok.pauseAfter || 0));
  }

  function restart() {
    typed.textContent = ""; // clear the sentence
    caret.classList.remove("is-final"); // back to the riding blink
    el.appendChild(caret);
    i = 0;
    setTimeout(step, START_DELAY);
  }

  setTimeout(step, START_DELAY);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav(document.querySelector("[data-nav]"));
  renderNav(document.querySelector("[data-footer-nav]"));
  renderNames();
  renderHomepage();
  initScrollReveal();
  initStardustTrail();
  initNavToggle();
  initTypewriter();
});
