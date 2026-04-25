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

- `Source`: `GitHub Actions`

### 3. Deploy

Every push to `main` will:

- install dependencies
- build the site
- publish the `dist` folder to GitHub Pages

## Notes

- The Vite config adjusts the base path automatically for GitHub Pages repository deployments.
- Static assets in `public/` are copied directly into the built site.
- The site uses remote image URLs for the demo content; you can replace those with local project assets when ready.

## File Layout

- `src/App.tsx` - main page layout and sections
- `src/data.ts` - content and gallery data
- `tailwind.config.js` - theme colors and font setup
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
