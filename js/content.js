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
  heroRotator: ["Rena Takii", "a UX/UI Designer", "a Creative"],

  // Top nav + footer nav links. href can point to another page or a #section.
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Case Studies", href: "case-studies.html" },
    { label: "About", href: "about.html" },
    { label: "Resume", href: "Rena Takii Resume.pdf" },
    { label: "Contact", href: "mailto:john_doe@example.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rena-takii/",
      icon: "LinkedIn_icon.png",
    },
  ],

  // The 3 clickable cards under the hero.
  cards: [
    { title: "Case Studies", href: "case-studies.html" },
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
    name: "K.V.",
    title: "Head of Marketing APAC, Industrial Automation",
    quote:
      "[...] [Rena] demonstrated initiative, professionalism and a strong willingness to learn. She delivered high-quality work, proactively identified opportunities for improvement, and collaborated effectively with team members [...] I am confident that she will be a valuable asset to any organization she joins.",
  },
  recommendation2: {
    photo: "assets/img/avatar-placeholder.svg",
    name: "S.O.",
    title: "Co-founder & CEO, AI Startup",
    quote:
      "Rena demonstrated strong communication skills throughout her internship: articulate in both English and Japanese, which is genuinely rare. She approaches new challenges with a willingness to learn and adapts quickly in an ambiguous, fast-moving environment. I’d recommend her for roles that value clear thinking and cross-cultural communication.",
  },

  // "I have spoken with..." — just placeholder names for now, swap in real
  // ones anytime. Rendered as two columns: the first half on the left, the
  // second half on the right.
};
