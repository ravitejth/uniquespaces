import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so the build needs a matching base path. User/org sites (<user>.github.io)
// and local dev are served from the root instead.
function resolveBase(): string {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH
  }

  const repository = process.env.GITHUB_REPOSITORY
  if (process.env.GITHUB_ACTIONS !== 'true' || !repository) {
    return '/'
  }

  const repoName = repository.split('/')[1]
  return repoName.endsWith('.github.io') ? '/' : `/${repoName}/`
}

export default defineConfig({
  plugins: [react()],
  base: resolveBase(),
})
