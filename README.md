# Unique Spaces

A Vite + React + Tailwind landing page for an architectural and interior design studio.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- TypeScript

## Local Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## GitHub Pages Deployment

This repo is configured to deploy automatically with GitHub Actions.

### 1. Push to GitHub

Create a repository on GitHub and push this project to the `main` branch.

### 2. Enable Pages

In the GitHub repo, go to `Settings` -> `Pages`.

Set:

- `Source`: `Deploy from a branch`
- `Branch`: `gh-pages` / `/ (root)`

The workflow builds the site and pushes the result to the `gh-pages` branch, so
Pages must be reading from that branch. Selecting `GitHub Actions` as the source
instead will leave the site stale, because nothing uploads a Pages artifact.

### 3. Deploy

Every push to `main` will:

- install dependencies
- build the site
- publish the `dist` folder to the `gh-pages` branch

## Notes

- The Vite config adjusts the base path automatically for GitHub Pages repository
  deployments, so the built site lives under `/<repo>/`. Set `BASE_PATH` to override
  it (for example `BASE_PATH=/ pnpm build` when serving from a custom domain root).
- Because of that base path, never hardcode root-absolute URLs (`/foo.svg`) in
  runtime strings such as inline `style` values. Use `import.meta.env.BASE_URL`.
- The pnpm version is pinned via the `packageManager` field in `package.json`, and
  the workflow reads it from there. Bumping pnpm across a major version also
  requires regenerating `pnpm-lock.yaml`, or CI's `--frozen-lockfile` install fails.
- Static assets in `public/` are copied directly into the built site.
- The site uses remote image URLs for the demo content; you can replace those with local project assets when ready.

## File Layout

- `src/App.tsx` - main page layout and sections
- `src/data.ts` - content and gallery data
- `tailwind.config.js` - theme colors and font setup
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
