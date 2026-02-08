## Launch Checklist

This checklist covers steps to prepare and verify production builds and deploys for the site.

- **Generate and commit production CSS (recommended)**: run `npm run build` locally and commit `app/tailwind.css` so the VPS does not need devDependencies.

- **If you do not commit generated CSS**: ensure the VPS installs devDependencies and runs the prebuild step.
  - Option A (preferred if you don't want devDeps): commit `app/tailwind.css` after building locally.
  - Option B (install devDeps on server): run `npm ci` (or `npm ci --omit=dev` *not* for this option) and then `npm run build` on the server.

- **Simulate production-only install locally (to verify VPS flow)**:
  - Run in a throwaway clone or temp dir:
    ```bash
    npm ci --omit=dev
    npm run build
    ```
  - If it fails, either commit `app/tailwind.css` or move required build packages to `dependencies`.

- **Environment / server requirements**:
  - Node version: use Node 18+ (match Next 16 requirements).
  - Ensure all runtime environment variables from `.env` are provided on the VPS.

- **CI / build pipeline**:
  - Ensure the pipeline runs `npm ci` then `npm run build` (our `prebuild` runs automatically before `build`).
  - Cache node_modules/artifacts appropriately but clear caches when changing the build flow.

- **PostCSS / Tailwind considerations**:
  - `postcss.config.mjs` is minimal and only runs `autoprefixer()` to avoid bundler evaluation of Tailwind at build time.
  - We removed `lightningcss` native packages; prebuild runs Tailwind/PostCSS in Node and writes `app/tailwind.css`.

- **Smoke tests after deploy**:
  - Request `/` and key dynamic routes (e.g., `/work`, `/blog`) to confirm 200 responses.
  - Check for dev-only errors or missing assets in browser console.

- **Optional housekeeping**:
  - Add a short note to the project README explaining the prebuild step and the recommended deploy workflow.
  - Keep `app/tailwind.css` in git if you prefer simpler VPS deploys.

---

Command snippets

Generate CSS locally (quick):

```bash
npm run build
# or to only run the Tailwind prebuild script:
node ./scripts/build-tailwind.js
```

Simulate production-only install (test VPS flow):

```bash
git clone <repo> /tmp/repo-test
cd /tmp/repo-test
npm ci --omit=dev
npm run build
```
