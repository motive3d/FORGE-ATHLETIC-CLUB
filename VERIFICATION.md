# Verification — 12 October 2026

## Completed

- Installed dependencies successfully; exact versions captured in `package-lock.json`.
- Ran the final `npm run build`: Vite 7.3.7 completed successfully, 1,604 modules transformed, no build errors.
- Final main JavaScript bundle: approximately 414 kB / 141 kB gzip. Styles: approximately 36 kB / 8.5 kB gzip. Raster imagery is approximately 1.6 MB in total and is lazy-loaded except the hero / active gallery image.
- Confirmed `base: '/FORGE-ATHLETIC-CLUB/'`, `HashRouter`, and base-aware local asset URLs.
- Confirmed GitHub Actions installs with `npm ci`, builds with `npm run build`, uploads `dist`, and deploys via `actions/deploy-pages`.
- Bundled the application with esbuild and ran behavior checks in JSDOM with reduced motion enabled. All five routes rendered in both English and Arabic without runtime console errors in this test environment.
- Confirmed document language/direction and localStorage language state in both languages.
- Confirmed all rendered image references resolve to included local files and all images have alt text.
- Confirmed every WhatsApp link on every page uses `201277741748` and includes a context message.
- Confirmed exactly three membership prices: 2,200 / 5,700 / 18,000 EGP.
- Exercised membership radio selection and calculator output, including annual savings of 8,400 EGP compared with twelve monthly payments.
- Confirmed exactly the seven requested schedule entries and only MMA, CrossFit, and Boxing categories.
- Exercised class/day filters, the empty state, reset action, and class-card query navigation.
- Confirmed eight facilities and six fictional trainers.
- Exercised gallery open/next/close and mobile menu open/navigation/close in the DOM environment.
- Dispatched an image error and verified selection of the bundled SVG fallback.
- Checked unknown routes render a recovery link.
- Verified source ZIP excludes `node_modules`, `dist`, test fixtures and temporary assets, and includes the hidden deployment workflow.

## Browser and deployment limits

The Windows sandbox prevented a browser from reaching the local Vite server (`ERR_CONNECTION_TIMED_OUT`) and a standalone browser launch also failed. Therefore, **rendered desktop/tablet/mobile layouts, visual overflow, real-browser keyboard focus, reduced-motion rendering, and the browser console are not verified**. DOM behavior tests are not a substitute for browser rendering checks.

Responsive layouts are implemented for phone, tablet and desktop breakpoints, including 600px, 900px and 1120px adjustments, RTL styling, swipeable coach cards and safe-area spacing under the fixed mobile action bar. After deployment, review widths around 320, 390, 768, 1024 and 1440px in Chrome's device toolbar in both languages, and navigate with Tab/Escape/arrow keys.

GitHub Pages deployment has not been executed because the repository/account was not supplied; the deliverable is an upload-ready source package. Follow `README.md` to upload and activate GitHub Actions. Hash-based routing is configured and exercised in the DOM, but a live GitHub Pages refresh was not tested.

WhatsApp links were inspected, not sent. Google Maps links were checked structurally, without claiming an exact building location. The website intentionally contains no online checkout or booking confirmation.

## Implementation choices

- A local cinematic still hero is used, as explicitly permitted in the brief. No unverified video URL is included.
- Original generated concept visuals represent the facilities and fictional coaches; provenance is in `MEDIA.md`.
- `resolve.preserveSymlinks: true` avoids a Windows sandbox native realpath issue encountered during the build. The project contains no symlink dependency and retains the requested Pages base path.
- Open Graph metadata in the initial HTML describes the overall concept. Static SPA crawlers may not execute page-specific metadata updates. The README explains setting an absolute social image URL once the GitHub username is known.
