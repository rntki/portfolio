/*
  Renders content from js/content.js into the page and drives the
  small interactions (hero word rotator + scroll reveal animations).
  You shouldn't need to edit this file — edit js/content.js instead.
*/

function renderNav(listEl) {
  if (!listEl) return;
  listEl.innerHTML = SITE_CONTENT.nav
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
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
        (card, i) =>
          `<a class="card reveal" style="--delay:${(0.15 + i * 0.15).toFixed(2)}s" href="${card.href}">${card.title}</a>`
      )
      .join("");
  }

  const logosEl = document.querySelector("[data-logos]");
  if (logosEl) {
    const logoItems = SITE_CONTENT.workedAt
      .map(
        (item, i) =>
          `<div class="logo-item reveal" style="--delay:${(0.5 + i * 0.15).toFixed(2)}s">
             <img src="${item.logo}" alt="${item.name}" loading="lazy" />
           </div>`
      )
      .join("");

    const moreItem = SITE_CONTENT.workedAtMore
      ? `<div class="logo-item logo-more reveal" style="--delay:${(0.5 + SITE_CONTENT.workedAt.length * 0.15).toFixed(2)}s">${SITE_CONTENT.workedAtMore}</div>`
      : "";

    logosEl.innerHTML = logoItems + moreItem;
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
      <span class="quote-mark">&ldquo;&rdquo;</span>
      <p class="rec-quote"><mark>${r.quote}</mark></p>
    `;
  }

  const spokenA = document.querySelector("[data-spoken-with-a]");
  const spokenB = document.querySelector("[data-spoken-with-b]");
  if (spokenA && spokenB) {
    const half = Math.ceil(SITE_CONTENT.spokenWith.length / 2);
    const colA = SITE_CONTENT.spokenWith.slice(0, half);
    const colB = SITE_CONTENT.spokenWith.slice(half);
    spokenA.innerHTML = colA.map((n) => `<li>${n}</li>`).join("");
    spokenB.innerHTML = colB.map((n) => `<li>${n}</li>`).join("");
  }

  const spokenMoreEl = document.querySelector("[data-spoken-with-more]");
  if (spokenMoreEl) {
    spokenMoreEl.textContent = SITE_CONTENT.spokenWithMore || "";
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
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav(document.querySelector("[data-nav]"));
  renderNav(document.querySelector("[data-footer-nav]"));
  renderNames();
  renderHomepage();
  initScrollReveal();
});
