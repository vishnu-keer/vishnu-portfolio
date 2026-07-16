# vishnu-portfolio

Dark, cinematic single-page founder portfolio for **Vishnu — Founder & CEO, WEBRO** (webro.studio).

The signature feature is a **cursor-following spotlight** that reveals a second photo (silver-visor look) through a soft, feathered circular mask on top of a base photo (black-suit look) — the reveal disc trails the pointer with eased motion.

---

## Overview

A full-screen, three-section site:

1. **Hero** — full-viewport photo with the spotlight reveal, animated wordmark ("I'm VISHNU"), and two supporting blurbs.
2. **About** — founder story with a 4-card stats grid, revealed on scroll.
3. **Contact** — pitch, contact details (call / WhatsApp / email / studio link), a working contact form, and the footer.

A single fixed navigation bar sits over all three sections (wordmark, center pill with About/Contact, a "Let's talk" CTA, and a mobile hamburger that opens a full-screen menu).

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (dev server + build)
- **Tailwind CSS 3** (utility styling)
- **lucide-react** (icons)
- Fonts: **Inter** (UI) and **Playfair Display**, italic (display / wordmark accent)

## Folder structure

```
vishnu-portfolio/
├── public/
│   ├── favicon.svg              # WEBRO placeholder mark
│   └── images/
│       ├── Base_image.png       # shown everywhere (black-suit photo)
│       └── Reveal_image.png     # shown under the spotlight (silver-visor photo)
├── src/
│   ├── components/
│   │   ├── Nav.tsx              # fixed nav + mobile overlay menu, smooth-scroll links
│   │   ├── Hero.tsx             # owns cursor tracking + smoothing (SPOTLIGHT_R), renders RevealLayer
│   │   ├── RevealLayer.tsx      # canvas → CSS-mask spotlight that reveals the second image
│   │   ├── About.tsx            # founder story + stats grid (scroll-reveal)
│   │   └── Contact.tsx          # contact details + form + footer (scroll-reveal)
│   ├── hooks/
│   │   └── useInView.ts         # IntersectionObserver hook, fires reveal once on scroll-in
│   ├── App.tsx                  # root wrapper + section order
│   ├── main.tsx                 # React entry
│   ├── index.css                # font imports, Tailwind layers, keyframes
│   └── vite-env.d.ts
├── index.html                   # <title>, SEO + Open Graph meta
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts               # base stays '/'
├── tsconfig.json
└── package.json
```

### Key files explained

- **`Hero.tsx`** — defines `const SPOTLIGHT_R = 260` and tracks the mouse with smoothing. A `mousemove` listener stores the raw pointer in a ref; a `requestAnimationFrame` loop eases it (`smooth += (mouse - smooth) * 0.1`) and pushes the smoothed value to state each frame. Layers by z-index: base image (`z-10`, slow Ken-Burns `hero-zoom`), `RevealLayer` (`z-30`), heading (`z-50`), and the two blurbs (`z-50`). The listener and RAF are cleaned up on unmount.
- **`RevealLayer.tsx`** — the core mechanic (kept faithful, not simplified). A hidden `<canvas>` sized to the viewport is painted each render with a radial-gradient disc at the cursor (radius `0 → SPOTLIGHT_R`, alpha stops `1, 1, 0.75, 0.4, 0.12, 0`). The canvas is exported with `toDataURL()` and applied as a CSS `mask-image` (+ `-webkit-` prefix) on the reveal `<div>`, so the second image only shows inside the soft glowing circle.
- **`useInView.ts`** — an `IntersectionObserver` hook returning `{ ref, inView }`. About and Contact use it so their `hero-anim hero-fade` animation fires when the section scrolls into view, rather than on page load.
- **`index.css`** — Google Fonts import, `* { font-family: Inter }` / `.font-playfair`, Tailwind layers, and the `heroReveal` / `heroFadeUp` / `heroZoom` keyframes. Includes a `prefers-reduced-motion` guard that disables the animations.

## Setup

Requires **Node 18+**.

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check (tsc) + production build to dist/
npm run preview   # serve the built dist/ locally
```

## The two photos

`public/images/Base_image.png` and `public/images/Reveal_image.png` are already in place (optimized to 2400px wide). To swap them, drop replacements at the **same paths and filenames**. Keep them the same aspect ratio and, ideally, framed with the subject in roughly the same position so the reveal lines up. Vite copies everything in `public/` into `dist/` automatically — no config changes needed.

> Tip: for the fastest loads you can later convert these to WebP and reference `./images/Base_image.webp` etc. in `Hero.tsx`.

## Deploy

### 1. Push to GitHub

Create an **empty** repo at `https://github.com/vishnu-keer/vishnu-portfolio` (no README/gitignore), then from the project folder:

```bash
echo "# vishnu-portfolio" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/vishnu-keer/vishnu-portfolio.git
git push -u origin main
```

(This README already exists — the `echo` line is harmless; it just appends a heading.)

### 2. Deploy on Vercel

1. Vercel → **New Project** → **Import Git Repository** → select `vishnu-keer/vishnu-portfolio` → **Import**.
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` — leave as default.
3. **Deploy.** Every future `git push` to `main` auto-redeploys.
4. Confirm `images/Base_image.png` and `images/Reveal_image.png` are inside `public/images/` in the repo before pushing — Vite copies `public/` into `dist/` automatically.

### 3. Custom domain (webro.studio)

Vercel → Project → **Settings → Domains** → add `webro.studio` (or a subdomain), then point your registrar's DNS records at Vercel per the instructions shown there.

## Notes

- **Contact form** works with no backend: it opens a prefilled email to `webro284@gmail.com`. To capture submissions instead, wire the `onSubmit` in `Contact.tsx` to Formspree, Resend, or a Supabase edge function.
- **Accessibility** — respects `prefers-reduced-motion`, uses semantic headings, labelled inputs, and keyboard-focusable controls.
- **Performance** — single lightweight bundle (~51 KB gzipped JS), optimized hero images, CSS-mask spotlight (no heavy libraries).

## Future improvements

- Real WEBRO logo SVG in place of the placeholder mark.
- Projects / case-studies section between About and Contact.
- Form backend + spam protection (honeypot / hCaptcha).
- WebP/AVIF hero images with `<link rel="preload">` for a faster first paint.
- Touch fallback for the spotlight (reveal follows tap/drag on mobile).
