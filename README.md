# Nader Samir Alsouqi — Portfolio

A bilingual (English / Arabic) personal site for **Nader Samir Alsouqi**, Software Engineer, Amman.

Plain `HTML` + `CSS` + `JavaScript`. No frameworks, no build step, no dependencies except Google Fonts.
Open `index.html` and it works.

---

## The theme

A printed art monograph: a strictly neutral graphite ramp with exactly one added
ink — sanguine, the red chalk that historically partners graphite. Nothing on the
page carries colour except that accent.

The layout idiom is printed matter, not web cards: a named-line 12-column sheet,
hairline rules, dot leaders, plate numbers, a drop cap, folios, crop marks, and one
reusable "wall label" `<dl>` that carries *every* piece of metadata on the site.

The portrait is presented in both themes as a **mounted plate** — rendered in neutral
greyscale, squared off, with a hairline rule and registration marks around it, and a
caption beneath. It is knocked back slightly in dark mode so it does not glare. The
greyscale is applied in CSS (`--portrait-filter`), so the source file stays in colour
and the treatment can be changed in one place.

## Run it

```bash
python -m http.server 5178      # then open http://localhost:5178
```

Or just double-click `index.html`.

Two query parameters are handy for sharing and testing. Neither is persisted —
they override for that page load only, so a link cannot silently change what a
visitor sees next time:

| URL | Effect |
|---|---|
| `?lang=ar` | open in Arabic (RTL) |
| `?theme=dark` | open in dark |

A choice made with the toggles *is* remembered. The theme is only written to
`localStorage` on an explicit click, so the OS `prefers-color-scheme` keeps
working for anyone who never touches the control.

## Deploy

Static hosting, no configuration:

- **GitHub Pages** — push this folder, then Settings → Pages → deploy from `main` / root.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in.

If the site will not live at `https://naderalsouqi.github.io/`, update the canonical URL, the
`og:*` / `twitter:*` URLs and the JSON-LD `url` in `index.html`.

## Files

```
index.html    structure + the English copy, with data-t hooks for the language swap
styles.css    design tokens, both themes, the Arabic parallel type system, RTL, print
script.js     language swap, theme, scroll reveals, copy-email
content.js    window.CONTENT — every string in English and Arabic
assets/
  profile.jpg                    the portrait (1080×1350, 4:5)
  favicon.svg                    theme-aware monogram
  Nader_Samir_Alsouqi_CV.pdf     designed CV
  Nader_Samir_Alsouqi_CV_ATS.pdf ATS-safe CV
```

## Editing content

All copy lives in **`content.js`** as one object, every string keyed `{ en, ar }`.

The English is *also* written statically into `index.html` so the page is complete and readable with
JavaScript disabled — which means **if you change an English string, change it in both files.** The
Arabic exists only in `content.js`. Elements are wired up with `data-t="path.into.content"`, and
attributes with `data-t-attr="aria-label:path.into.content"`.

Contact details (email, phone, GitHub, LinkedIn) are written directly in `index.html`.

## Bilingual notes

The Arabic is not a translation layer bolted onto an English design; it is a parallel system.

- Its own font stack (Reem Kufi for display, IBM Plex Sans Arabic for text), loaded on demand — the
  English page never requests it.
- Its own type scale, line heights and measure. Arabic needs more leading than Latin, not the same.
- No drop cap in Arabic: `::first-letter` severs the cursive join, so `مهندس` would render as
  `م` + `هندس`. That is a correctness bug, not a style preference.
- No italics and no letter-spacing in Arabic — there is no Arabic italic, and tracking breaks cursive
  joining. Emphasis becomes weight. `font-synthesis: none` makes any mistake here render as nothing,
  which is the correct failure.
- `text-transform: uppercase` is gated to `:lang(en)` rather than overridden in Arabic, because an
  override would still fire on Latin tokens embedded in Arabic strings and turn `dApps` into `DAPPS`.
- Every Latin or numeric run inside Arabic prose is wrapped in `<bdi>` at render time, so `.NET Core`
  does not render as `NET Core.` and `C#` does not render as `#C`.
- The 12-column grid uses **named lines**, so the entire layout mirrors under `dir="rtl"` with almost
  no override stylesheet. There are six deliberate physical overrides in total; if you find yourself
  adding a seventh, something upstream was written physically and should be fixed there instead.
- The portrait is never mirrored. It is a real person's face; only the crop window shifts.

## Accessibility

Semantic landmarks and a skip link; one `<h1>`; native `<details>` for the experience ledger, so it
is keyboard-operable and works with JavaScript off; solid `:focus-visible` rings; `aria-current` on
the in-view section; every text colour clears AA against the surface it sits on in both themes
(`--ink-faint` is contractually decorative and always `aria-hidden`); `prefers-reduced-motion` is
honoured; and every reveal's resting state is the finished state, so nothing can be left invisible.
