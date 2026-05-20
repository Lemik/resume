# SDET resume and blog (Astro + GitHub Pages)

Static portfolio site: resume-style home page, projects, Markdown blog, and profile links. Built with [Astro](https://astro.build/) and deployed with GitHub Actions.

## Prerequisites

- Node.js **22** or newer (see `engines` in `package.json`).
- npm (ships with Node).

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321/`).

## Edit your content

| What | Where |
|------|--------|
| Your name, headline, summary, skills, jobs | [`src/data/experience.json`](src/data/experience.json) |
| Project cards and outbound links | [`src/data/projects.json`](src/data/projects.json) |
| LinkedIn, GitHub, email, etc. | [`src/data/profiles.json`](src/data/profiles.json) |
| Blog posts (Markdown) | [`src/content/blog/`](src/content/blog/) |

Each blog file needs frontmatter fields defined in [`src/content.config.ts`](src/content.config.ts): `title`, `description`, `pubDate`, optional `updatedDate` and `tags`.

## Configure `site` and `base` for your real URL

Open [`astro.config.mjs`](astro.config.mjs) and set:

1. **`site`** — full origin of the deployed site (no trailing slash), for example `https://yourname.github.io`.
2. **`base`** — path segment after the host:
   - Repository **`resume`** on GitHub Pages → use `'/resume'` (this repo’s default).
   - User site repo **`yourname.github.io`** at the domain root → use `'/'`.
   - **Custom domain** (e.g. `https://resume.example.com`) → use `'/'` for `base`, set `site` to that origin, and add a `public/CNAME` file whose only line is your hostname (e.g. `resume.example.com`). Configure DNS at your provider per [GitHub’s custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

Wrong `site`/`base` pairs break styles, navigation, and canonical URLs.

## Publish on GitHub Pages (Actions)

1. Push this repository to GitHub (default branch **`main`**).
2. **Settings → Pages → Build and deployment**: set **Source** to **GitHub Actions** (not “Deploy from a branch” for this workflow).

### If the build logs mention Jekyll, YAML, or `.astro`

That means Pages is still using **“Deploy from a branch”** and GitHub is running **Jekyll** on the whole repo. Jekyll mis-reads the `---` blocks in Astro files as YAML and fails.

**Fix:** In **Settings → Pages → Build and deployment**, change **Source** from *Deploy from a branch* to **GitHub Actions**, then re-run the workflow from the **Actions** tab (or push to `main`). This site is **not** a Jekyll project; the Action builds Astro and publishes only the contents of `dist/`.

This repo also ships **`public/.nojekyll`** so the published static output never runs Jekyll, even if settings change.
3. **Settings → Pages**: under **Build and deployment**, ensure the **GitHub Pages** environment can deploy (first run may prompt for approval).
4. Push to `main` (or merge a PR). The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, and publishes the `dist/` folder.

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```


For example, repository `resume` is served at `https://<github-username>.github.io/resume/`. That differs from a hostname shaped like `resume.username.github.io` unless you own that domain and point it at GitHub Pages with a custom domain and `CNAME`.

**Private repositories:** GitHub Pages may require a paid plan; public repos work on the free tier.

## Production build preview

```bash
npm run build
npm run preview
```

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

- `src/pages/` — routes (`index`, `projects`, `blog/…`).
- `src/layouts/BaseLayout.astro` — shell, SEO meta, global CSS import.
- `src/components/` — header and footer.
- `src/styles/global.css` — theme and layout.
- `public/` — static assets copied to `dist/` as-is (favicon, optional `CNAME`).

## License
 MIT 
