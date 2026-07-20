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
      .map((card, i) => {
        const href = encodeURI(card.href);
        const isPdf = card.href.toLowerCase().endsWith(".pdf");
        return `<a class="card reveal" style="--delay:${(0.1 + i * 0.2).toFixed(2)}s" href="${href}"${isPdf ? " download" : ""}>${card.title}</a>`;
      })
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

function initCursorStar() {
  // Skip on touch devices — there's no hovering cursor to follow.
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const star = document.createElement("img");
  star.src = "assets/img/star.png";
  star.alt = "";
  star.className = "cursor-star";
  document.body.appendChild(star);

  let mouseX = -100;
  let mouseY = -100;
  let starX = mouseX;
  let starY = mouseY;
  let started = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      // Snap to the cursor on the very first move instead of drifting in from off-screen.
      starX = mouseX;
      starY = mouseY;
      star.classList.add("is-visible");
      started = true;
    }
  });

  document.addEventListener("mouseleave", () => {
    star.classList.remove("is-visible");
  });
  document.addEventListener("mouseenter", () => {
    if (started) star.classList.add("is-visible");
  });

  function animate() {
    // Ease toward the cursor each frame for a smooth, slightly delayed trail.
    starX += (mouseX - starX) * 0.12;
    starY += (mouseY - starY) * 0.12;
    star.style.transform = `translate(${starX}px, ${starY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav(document.querySelector("[data-nav]"));
  renderNav(document.querySelector("[data-footer-nav]"));
  renderNames();
  renderHomepage();
  initScrollReveal();
  initCursorStar();
});
