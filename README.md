# Nader Samir Alsouqi — Portfolio

A bilingual (English / Arabic) personal portfolio for **Nader Samir Alsouqi**, Software Engineer.
The visual theme — *pencil-on-paper* in light mode, *chalk-on-blackboard* in dark mode — is drawn from
the hand-sketched portrait, with a graphite monochrome palette, paper grain and hand-drawn lines.

No build tools. Just static `HTML` + `CSS` + `JS`.

## Your photo

Your sketched portrait is already in place at **`assets/profile.jpg`** (1080×1080).
To swap it, just replace that file (any square-ish image works — JPG/PNG/WebP; keep the
name `profile.jpg` or update the `src` of `#portraitImg` in `index.html`). If the image is
ever missing, the hero falls back to a tasteful **N.S** monogram so nothing looks broken.

The white background of a pencil sketch blends into the paper automatically
(`mix-blend-mode`), and inverts to chalk-on-black in dark mode — no manual editing needed.

## Run locally

Any static server works. For example:

```bash
# Python 3
python -m http.server 5173
# then open http://localhost:5173
```

Or simply double-click `index.html`.

## Deploy (free)

- **GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from `main` / root.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder, no config needed.

## Features

- 🌐 **Bilingual EN / AR** with a live toggle and full **RTL** mirroring (CSS logical properties).
- 🌗 **Light / dark** theme toggle (paper ↔ blackboard), remembers your choice.
- ✍️ Sketch theme: paper grain, hand-drawn underlines that draw themselves in, wobbly ink borders.
- 📄 **Download CV** buttons wired to the PDFs in `assets/`.
- ♿ Accessible: semantic landmarks, keyboard focus rings, `prefers-reduced-motion` respected.
- 📱 Responsive down to mobile, with a collapsing nav menu.

## Editing content

All résumé content lives in **`script.js`** as data objects — easy to edit in one place:

| Object        | What it controls                                  |
|---------------|---------------------------------------------------|
| `UI`          | All interface strings (nav, hero, headings…) EN/AR |
| `STATS`       | The four stat tiles in *About*                     |
| `SKILLS`      | Skill groups and their chips                       |
| `EXPERIENCE`  | The work-history timeline (EN + AR per role)       |
| `EDUCATION`   | The education card                                 |

Contact details (email, phone) live directly in `index.html`.

## Files

```
index.html      Structure + static content (data-i18n hooks)
styles.css      Design system + both themes + responsive/RTL
script.js       i18n engine, data, theme, reveal animations
assets/
  profile.jpg              ← your sketched portrait
  favicon.svg
  Nader_Samir_Alsouqi_CV.pdf
  Nader_Samir_Alsouqi_CV_ATS.pdf
```
