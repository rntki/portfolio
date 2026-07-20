# Personal Website

A minimal, static personal site (no build step) — plain HTML/CSS/JS.

## Editing content

Almost everything on the homepage (name, hero rotator text, nav links,
card labels, "worked at" logos, the recommendation quote, and the "spoken
with" names) is driven from one file:

    js/content.js

Open it and edit the values — no HTML editing required. Reload the page
to see changes.

To add/replace a "worked at" logo: drop a PNG/SVG into `assets/logos/`
and add an entry to `workedAt` in `js/content.js`.

To set the real LinkedIn recommendation: replace `recommendation.photo`
with a photo file in `assets/img/`, and update `name`, `title`, and
`quote` in `js/content.js`.

The 4 sub-pages (`resume.html`, `projects.html`, `about.html`,
`contact.html`) are placeholders — open each and replace the text inside
`<section class="page-body">` with your real content.

## Running locally

Any static file server works, e.g.:

    npx serve .

Then open the printed localhost URL.

## Deploying to GitHub Pages

1. Create a new repo on GitHub (e.g. `your-username.github.io` for a
   root domain, or any name for a project site).
2. From this folder:

       git remote add origin <your-repo-url>
       git branch -M main
       git push -u origin main

3. On GitHub: repo Settings → Pages → Source → set to `main` branch,
   `/ (root)` folder → Save.
4. Your site will be live at `https://<username>.github.io/<repo>/`
   (or `https://<username>.github.io/` if you used the special repo
   name above).
