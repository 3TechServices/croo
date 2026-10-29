# CROO Workflow & System Topology

Interactive CROO System Architecture & Network Topology diagram, hosted on Cloudflare Pages at [croo.space/workflow](https://croo.space/workflow).

## Architecture

- **Source File**: `index.html` (root)
- **Build Script**: `scripts/build.js` (`npm run build`)
  - Copies `index.html` into `dist/workflow/index.html` (served at `croo.space/workflow`)
  - Generates `dist/_redirects` to route `croo.space/` to `croo.space/workflow`
  - Generates fallback `dist/index.html`

## Cloudflare Pages Configuration

When connecting this repository in the Cloudflare Dashboard:

- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`

## Custom Domain

In Cloudflare Pages project settings:
1. Go to **Custom domains** -> **Set up a custom domain**.
2. Enter `croo.space`.
3. Cloudflare will automatically route DNS to serve this site at `https://croo.space/workflow`.
