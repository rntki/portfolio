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

  // "I have worked at..." logos. Add/remove entries to change the grid.
  workedAt: [
    { name: "Apex", logo: "assets/logos/apex.png" },
    { name: "Yodo Labs", logo: "assets/logos/yodolabs.png" },
    { name: "BD", logo: "assets/logos/bd.png" },
    { name: "Siemens", logo: "assets/logos/siemens.png" },
    { name: "CSU Long Beach", logo: "assets/logos/csulb.png" },
  ],

  // LinkedIn-style recommendation card.
  // Replace photo/name/title/quote with the real recommendation, copied exactly from LinkedIn.
  recommendation: {
    photo: "assets/img/avatar-placeholder.svg",
    name: "Full Name",
    title: "Job Title, Company",
    quote:
      "Paste the recommendation text here exactly as it appears on LinkedIn.",
  },

  // "I have spoken with..." — just placeholder names for now, swap in real ones anytime.
  spokenWith: ["Name", "Name", "Name"],
};
