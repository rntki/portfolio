/*
  EDIT THIS FILE to update your site's content.
  Everything here gets injected into the pages by js/main.js.
  You don't need to touch any HTML to change text, logos, or names.
*/

const SITE_CONTENT = {
  // Your name — shows in the header, footer, and hero.
  name: "Rena Takii",

  // Words/phrases that rotate after "I'm " in the hero, every 2 seconds.
  // First one usually your name, then roles/titles.
  heroRotator: [
    "Rena Takii",
    "a Product Designer",
    "a Creative",
  ],

  // Top nav + footer nav links. href can point to another page or a #section.
  nav: [
    { label: "Resume", href: "resume.html" },
    { label: "Projects", href: "projects.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ],

  // The 3 clickable cards under the hero.
  cards: [
    { title: "My Resume", href: "resume.html" },
    { title: "My Projects", href: "projects.html" },
    { title: "About Me", href: "about.html" },
  ],

  // "I have worked at..." logos — fills left-to-right, top-to-bottom in a
  // 3-column grid. Add/remove entries to change the grid.
  workedAt: [
    { name: "Yodo Labs", logo: "assets/logos/yodolabs.png" },
    { name: "Siemens", logo: "assets/logos/siemens.png" },
    { name: "BD", logo: "assets/logos/bd.png" },
    { name: "Apex", logo: "assets/logos/apex.png" },
    { name: "CSU Long Beach", logo: "assets/logos/csulb.png" },
  ],

  // Text shown in the grid slot right after the last logo. Set to "" to hide it.
  workedAtMore: "and more",

  // LinkedIn-style recommendation card.
  // Replace photo/name/title/quote with the real recommendation, copied exactly from LinkedIn.
  recommendation: {
    photo: "assets/img/avatar-placeholder.svg",
    name: "Full Name",
    title: "Job Title, Company",
    quote:
      "Paste the recommendation text here exactly as it appears on LinkedIn.",
  },

  // "I have spoken with..." — just placeholder names for now, swap in real
  // ones anytime. Rendered as two columns: the first half on the left, the
  // second half on the right.
  spokenWith: ["Name", "Name", "Name", "Name", "Name", "Name"],

  // Text shown under the two columns above. Set to "" to hide it.
  spokenWithMore: "and more",
};
