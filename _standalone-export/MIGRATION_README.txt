================================================================================
MIGRATION_README.txt
Standalone Client Cases → new independent Next.js project → GitHub → Vercel
================================================================================

You are in a NEW EMPTY workspace.
Next to you (or inside this folder you just copied) is the export bundle
`_standalone-export` taken from another repository.

Goal: create a completely independent application that contains ONLY this
client cases page, then deploy it on Vercel.

You do NOT need the old monorepo after this folder has been copied.

Read also (same folder):
  DEPENDENCIES.txt
  FILE_MANIFEST.txt
  SOURCE_NOTES.txt
  CLEANUP_MANIFEST.txt   (for later cleanup of the OLD repo — not needed now)


================================================================================
A. WHAT THIS PROJECT IS
================================================================================

- A standalone client presentation of marketing website cases.
- Isolated from the original archive/portfolio site.
- CSS 3D carousel of site preview videos + accordion + Russian copy.
- Mobile-adapted (touch swipe, video budget, responsive pitch).
- The new repository should contain ONLY this page.
- Old SiteHeader / navigation / homepage are NOT needed.
- In the new app this page MUST be the root route: `/`
  (do NOT keep the temporary monorepo path `/client-cases`).


================================================================================
B. INITIALIZE A NEW NEXT.JS APP
================================================================================

Source stack: Next.js 16 App Router + React 19 + TypeScript + Tailwind v4
+ `src/` directory + `@/*` import alias.

From the EMPTY workspace root (parent of, or same place where you will place
the app), create the app IN THE CURRENT DIRECTORY if the workspace is empty:

  npx create-next-app@16.2.9 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes

If your tool prompts interactively (instead of flags), choose:

  TypeScript:          Yes
  ESLint:              Yes
  Tailwind CSS:        Yes
  `src/` directory:    Yes
  App Router:          Yes
  Turbopack:           Yes (optional)
  Import alias:        @/*
  Package manager:     npm (matches source)

IMPORTANT:
  - Use create-next-app major aligned with Next 16 (pin @16.2.9 as above).
  - Do NOT create this app inside the old monorepo.
  - Do NOT nest a second git repo inside the old project.


================================================================================
C. INSTALL DEPENDENCIES
================================================================================

create-next-app already installs next / react / react-dom / eslint / typescript
/ tailwind. Pin the page-specific runtime package:

  npm install framer-motion@12.42.0

Re-pin toolchain versions to match the source lockfile if create-next-app
picked different minors:

  npm install next@16.2.9 react@19.2.4 react-dom@19.2.4
  npm install -D typescript@5.9.3 tailwindcss@4.3.1 @tailwindcss/postcss@4.3.1 eslint@9.39.4 eslint-config-next@16.2.9

Optional: replace package.json with the contents of

  _standalone-export/project-files/config/package.json.suggested

then run:

  npm install

Full package list + reasons: DEPENDENCIES.txt


================================================================================
D. COPY PROJECT FILES INTO THE NEW APP
================================================================================

Assume:
  EXPORT = path to `_standalone-export` (this folder)
  APP    = path to the new Next.js app root

1) Replace / merge app entry:

  EXPORT/project-files/src/app/page.tsx
    → APP/src/app/page.tsx
       (replace create-next-app default page)

  EXPORT/project-files/src/app/layout.tsx
    → APP/src/app/layout.tsx
       (replace default layout)

  EXPORT/project-files/src/app/globals.css
    → APP/src/app/globals.css
       (replace default globals)

2) Copy styles + implementation:

  EXPORT/project-files/src/styles/tokens-minimal.css
    → APP/src/styles/tokens-minimal.css

  EXPORT/project-files/src/standalone/client-cases/
    → APP/src/standalone/client-cases/
       (entire directory: view, wall strip, list, fullscreen, data, css)

3) Copy public assets (PRESERVE path marketing/web):

  EXPORT/project-files/public/marketing/web/
    → APP/public/marketing/web/

  Resulting URLs must remain:
    /marketing/web/tundra.mp4
    /marketing/web/tundra.jpg
    … (same for immortel, formula, cleaning, seo, vivoz, school)

4) Config files — overwrite defaults if they differ:

  EXPORT/project-files/config/next.config.ts   → APP/next.config.ts
  EXPORT/project-files/config/tsconfig.json    → APP/tsconfig.json
  EXPORT/project-files/config/postcss.config.mjs → APP/postcss.config.mjs
  EXPORT/project-files/config/eslint.config.mjs  → APP/eslint.config.mjs
  EXPORT/project-files/config/.gitignore         → APP/.gitignore
     (merge carefully if you already have local ignores)

5) Delete create-next-app boilerplate you do not need, e.g.:
   - default SVG icons under public/ if unused
   - sample page content already replaced
   - favicon optional

Do NOT leave a second route at /client-cases unless you intentionally want it.


================================================================================
E. ROOT PAGE
================================================================================

APP/src/app/page.tsx must render StandaloneClientCasesView.

The export already provides this. Confirm there is NO
src/app/client-cases/ folder in the new app.


================================================================================
F. ROOT LAYOUT
================================================================================

APP/src/app/layout.tsx (from export) already includes:

  - next/font/google Inter with variable --font-inter
    (latin + cyrillic subsets)
  - metadata (Russian title/description, robots noindex)
  - html lang="ru"
  - globals.css import
  - NO SiteHeader, NO nav, NO providers beyond defaults

No extra React providers are required.


================================================================================
G. PUBLIC ASSETS
================================================================================

Case-sensitive paths matter on Vercel (Linux).

Required tree:

  public/
    marketing/
      web/
        cleaning.jpg
        cleaning.mp4
        formula.jpg
        formula.mp4
        immortel.jpg
        immortel.mp4
        school.jpg
        school.mp4
        seo.jpg
        seo.mp4
        tundra.jpg
        tundra.mp4
        vivoz.jpg
        vivoz.mp4

Verify after copy:

  ls public/marketing/web

If any file is missing, videos will 404.


================================================================================
H. CONFIG
================================================================================

Required:

  tsconfig paths: "@/*": ["./src/*"]   (already in export tsconfig)
  postcss: @tailwindcss/postcss        (Tailwind v4)
  next.config.ts: empty object is fine — no image/webpack customisation needed

No webpack loaders, no shader loaders, no GLB pipeline.


================================================================================
I. ENV VARIABLES
================================================================================

NO ENV VARIABLES REQUIRED.

Do not add empty .env files unless you want them later.
Nothing to configure in Vercel Environment Variables for this page.


================================================================================
J. LOCAL RUN
================================================================================

From APP root:

  npm install
  npm run dev

Open: http://localhost:3000/

Then verify production build:

  npm run build
  npm start


================================================================================
K. MANDATORY CHECKLIST
================================================================================

Before GitHub / Vercel:

  [ ] `/` opens
  [ ] CSS 3D carousel renders (faces visible, auto-rotates)
  [ ] Videos load (network 200 for /marketing/web/*.mp4)
  [ ] Posters visible before/under video
  [ ] Accordion opens/closes descriptions
  [ ] Selecting a case rotates the carousel
  [ ] Carousel front updates the active list highlight
  [ ] «ещё» opens fullscreen; «закрыть» / Escape closes
  [ ] Desktop: horizontal trackpad swipe steps faces
  [ ] Mobile width (~375–430): no horizontal overflow
  [ ] Mobile: touch horizontal swipe on stage works; vertical scroll still works
  [ ] Resize desktop ↔ mobile does not break layout
  [ ] No console errors
  [ ] No hydration errors
  [ ] No 404 for assets
  [ ] `npm run build` succeeds


================================================================================
L. GIT + GITHUB
================================================================================

From APP root:

  git init
  git add .
  git commit -m "Initial standalone client cases app"

Create a NEW empty GitHub repository (do not push into the old monorepo).

Then:

  git branch -M main
  git remote add origin <PASTE_YOUR_NEW_GITHUB_REPO_HTTPS_OR_SSH_URL_HERE>
  git push -u origin main

Replace the placeholder URL with your real repository URL.


================================================================================
M. DEPLOY TO VERCEL
================================================================================

SCENARIO 1 — via GitHub (recommended)

  1. Create a separate GitHub repository for this app only.
  2. Push the new standalone project (section L).
  3. Open https://vercel.com and sign in.
  4. Click “Add New…” → “Project”.
  5. Import the Git Repository you just created.
  6. Confirm Framework Preset = Next.js (auto-detected).
  7. Build Command: leave default (`next build` / `npm run build`).
  8. Output Directory: leave default (Next.js — do not set `out` unless
     you intentionally switched to static export; this app does not).
  9. Install Command: default `npm install`.
 10. Environment Variables: NONE required.
 11. Click Deploy.

After deploy, open the production URL and run section O checks.

Notes:
  - Vercel usually detects Next.js correctly — do not override settings
    without a reason.
  - Root Directory should be the app root (not a monorepo subfolder).


SCENARIO 2 — Vercel CLI (optional)

  npm i -g vercel
  vercel
  vercel --prod


================================================================================
N. VIDEO / LARGE ASSETS WARNING
================================================================================

Bundle size of videos+posters ≈ 25 MB total.

Largest single file: seo.mp4 ≈ 5.0 MB — under GitHub’s 100 MB hard limit.
All files are safe to commit to Git for this migration.

However:
  - A repo with many MP4s stays heavier forever.
  - Later you MAY move videos to a CDN / object storage and update data.ts
    URLs — but do NOT do that during the first migration.
  - First goal: 1:1 working copy.


================================================================================
O. VERCEL PRODUCTION CHECK
================================================================================

On the production URL:

  [ ] Hard refresh root `/`
  [ ] All /marketing/web/* assets return 200
  [ ] Muted autoplay works on desktop
  [ ] Mobile Safari-like: playsInline present; swipe + scroll OK
  [ ] Viewport / address-bar resize does not destroy layout
  [ ] CSS 3D still renders (no WebGL required)
  [ ] Browser console clean
  [ ] Network tab: no unexpected 404
  [ ] Fullscreen «ещё» plays with sound (user gesture)

If muted carousel videos fail on some mobile browsers, posters should still
show; front-face play() is best-effort (errors swallowed).


================================================================================
QUICK FILE MAP (after successful copy)
================================================================================

APP/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    styles/
      tokens-minimal.css
    standalone/
      client-cases/
        client-cases-view.tsx
        collection-wall-strip.tsx
        project-case-list.tsx
        showreel-fullscreen.tsx
        data.ts
        client-cases.css
  public/
    marketing/
      web/
        *.mp4 / *.jpg
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  package.json


================================================================================
DONE
================================================================================

When local + Vercel checks pass, tell the human operator.
Only THEN should cleanup of the old monorepo standalone files be requested,
using CLEANUP_MANIFEST.txt — never before.
