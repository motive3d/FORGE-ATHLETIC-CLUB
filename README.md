# FORGE ATHLETIC CLUB

A bilingual, responsive premium fitness portfolio concept for Sheraton Heliopolis, Cairo. This is **not an operating gym**. Prices, trainers, facilities and schedules are illustrative.

## Publish using GitHub.com in Chrome — no terminal needed

1. Extract the ZIP on your computer. Open the `FORGE-ATHLETIC-CLUB` folder. Upload its **contents**, not the outer folder and not the ZIP.
2. On GitHub.com, sign in and create a **public** repository named exactly `FORGE-ATHLETIC-CLUB`. Keep the default branch named `main`. You may initialize it with a README to make the upload screen available.
3. Choose **Add file → Upload files**. Drag the project files and folders into the browser: `src`, `public`, `.github`, `FONT-LICENSES`, `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `.gitignore`, `README.md`, `MEDIA.md`, and `VERIFICATION.md`. Commit to `main`. No local installation is required.
4. Verify `.github/workflows/deploy.yml` appears in the repository. If your file picker skipped the dot-folder, choose **Add file → Create new file**, enter `.github/workflows/deploy.yml` as the filename, paste the contents of the included workflow, and commit it. If GitHub's upload limit is reached, upload folders in separate commits.
5. Open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
6. Open **Actions → Deploy FORGE to GitHub Pages → Run workflow → main → Run workflow**. If an earlier automatic run failed before Pages was enabled, rerun it now. The workflow installs dependencies and builds the project for you.
7. When both jobs are green, open the deployment link shown under **Settings → Pages** or on the workflow run. It will be `https://YOUR-GITHUB-USERNAME.github.io/FORGE-ATHLETIC-CLUB/`. Replace the username with your own; none is assumed in the code.

Future uploads to `main` automatically rebuild and publish. Allow the current deployment to finish, then refresh the page. Do not upload `node_modules` or `dist`; neither is included in this source package.

## What is included

- Five pages: Home, Facilities & Training, Classes & Schedule, Memberships, Contact & Visit.
- English/Arabic switch, persisted in localStorage; full RTL layout and locally bundled fonts.
- Monthly 2,200 EGP, Quarterly 5,700 EGP, Annual 18,000 EGP; interactive comparison calculator.
- Only MMA, CrossFit and Boxing; exact requested weekly schedule, Cairo local time; illustrative 60-minute durations and assigned coaches.
- Six fictional trainer profiles, eight facility spaces, accessible image lightbox.
- Context-specific English/Arabic WhatsApp inquiries to `201277741748`. A link opens WhatsApp; it does not send a message or confirm a booking automatically.
- GSAP/ScrollTrigger reveals, reduced-motion support, mobile navigation and bottom WhatsApp bar.
- Semantic markup, skip link, focus handling, local image fallback, titles, descriptions and Open Graph tags.

## Structure

```
.github/workflows/deploy.yml   GitHub Pages build and deployment
public/media/                 Optimized local images and fallback
public/favicon.svg            Original FORGE monogram
src/data.js                   Plans, trainers, facilities, schedule and FAQs
src/main.jsx                  Components, bilingual UI, HashRouter pages
src/styles.css                Responsive brand styling and Tailwind integration
vite.config.js                Fixed GitHub Pages base and React/Tailwind plugins
```

## Routing and assets

Vite uses `base: '/FORGE-ATHLETIC-CLUB/'`. React Router uses `HashRouter`, so refreshing `/FORGE-ATHLETIC-CLUB/#/memberships` works without a server rewrite. All public asset references use `import.meta.env.BASE_URL`; fonts are bundled by Vite. The workflow uploads **dist**, then deploys that artifact.

Renaming the repository requires updating `base` in `vite.config.js`. Leave it unchanged for the requested repository name. The initial HTML includes general Open Graph metadata; individual client-side page metadata updates in the browser. Social crawlers may show the general site preview because this is a static SPA. Once your GitHub username is known, you can make `og:image` in `index.html` an absolute URL to your published `/FORGE-ATHLETIC-CLUB/media/hero.webp` for maximum crawler compatibility.

## Optional developer commands

Requires Node.js 22.12+ or 24. The supplied workflow uses Node 22.

```
npm ci
npm run dev
npm run build
npm run preview
```

## Content and media

Read `MEDIA.md` for image provenance. The hero intentionally uses an optimized local still image, an allowed fallback in the brief. It has no video network cost or autoplay dependency. Trainer portraits represent fictional characters and do not claim to depict real coaches. Images illustrate the concept rather than a real business location.

Google Maps opens the **Sheraton Heliopolis area**. The on-page map graphic is an abstract area illustration, not a precise or navigable map; no building address is invented. Cash, bank cards and InstaPay are informational only. No payment processing, backend, analytics, forms or fake confirmations are included.

Fontsource packages bundle Barlow Condensed, Inter and Cairo; their licenses are included in `FONT-LICENSES/`. Font display uses swap. Arabic subsets load only the required font files through CSS unicode ranges.

## Verification

See `VERIFICATION.md` for completed checks and deployment limitations. GitHub deployment itself requires uploading the source to your account and selecting GitHub Actions as the Pages source.
