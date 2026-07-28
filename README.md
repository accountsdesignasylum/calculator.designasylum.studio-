# calculator.designasylum.studio

A static website of free business calculators by **Design Asylum Studio**.
Plain HTML/CSS/JS — **no build step, no framework**. Deploys by pulling this
repo into Hostinger's `public_html`.

- **Homepage** (`/`) — dark, on-brand gallery of calculator cards.
- **Calculator pages** (`/<slug>/`) — each frames the original calculator
  **untouched** inside a same-origin `<iframe>`, wrapped with the site nav and
  footer. The calculator files themselves are never edited.

---

## Project structure

```
/
├── index.html                      Homepage (nav + card grid + footer)
├── assets/
│   ├── css/  base.css · home.css · calculator.css
│   ├── js/   calculators.js (manifest) · home.js · frame-resize.js
│   ├── thumbnails/                  card images (1600×900, 16:9)
│   └── logo/                        optional brand logo
├── calculators/                    ORIGINAL calculator HTML — do not edit
│   ├── fuel-calculator.html
│   └── retainer-calculator.html
├── fuel-calculator/index.html      wrapper page → iframes the file above
├── retainer-calculator/index.html
├── favicon.svg · robots.txt · sitemap.xml · .htaccess · 404.html
```

Clean URLs (folder-based, no rewrites needed):
`/` · `/fuel-calculator/` · `/retainer-calculator/`

---

## Add a new calculator (3 steps)

Say your new calculator's slug is **`profit-margin`**:

**1. Drop in the calculator file (untouched)**
Save the standalone HTML as:
```
calculators/profit-margin.html
```

**2. Create the wrapper page**
Copy an existing wrapper folder and change two things — the `<iframe src>` and
the titles:
```
mkdir profit-margin
cp fuel-calculator/index.html profit-margin/index.html
```
In `profit-margin/index.html`, replace every `fuel-calculator` with
`profit-margin` (the `<iframe src>`, the `<title>`, the OG tags, the "open in
new tab" link, and the visually-hidden `<h1>`).

**3. Register it in the manifest**
Add one entry to `assets/js/calculators.js`:
```js
{
  slug: "profit-margin",
  title: "Profit Margin Calculator",
  description: "One clear line about what it does.",
  thumbnail: "/assets/thumbnails/profit-margin.svg",
  cta: "Open calculator"
}
```
The homepage card appears automatically.

**Then:** add the thumbnail image at `assets/thumbnails/profit-margin.<ext>`
and a `<url>` entry in `sitemap.xml`.

---

## Thumbnail image spec

| Property   | Value |
|------------|-------|
| Format     | WebP preferred; JPG or PNG also fine |
| Dimensions | **1600 × 900 px** (strict **16:9**); min 1280×720 |
| File size  | Aim under ~300 KB |
| Filename   | `<slug>.<ext>` (e.g. `fuel-calculator.webp`) |
| Location   | `assets/thumbnails/` |

Cards use `object-fit: cover`, so off-ratio images are center-cropped.
The repo ships branded **SVG placeholders**; when you add a real image, drop it
in and update that calculator's `thumbnail` path in `assets/js/calculators.js`.

### Optional logo
Put an SVG (preferred) or transparent PNG at `assets/logo/logo.svg`. Until then,
the nav renders the Design Asylum "d" mark + wordmark in CSS.

---

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```
Use a server (not `file://`) so the same-origin iframe auto-resize works.

---

## Deploy (Hostinger)

This repo **is** the site root. Point Hostinger's Git deployment (or a manual
`git pull`) at `public_html`. No build, no Node, no environment variables.
`.htaccess` sets caching, compression, MIME types, and the 404 page.
