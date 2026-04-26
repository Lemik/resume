// @ts-check
import { defineConfig } from 'astro/config';

// Match your GitHub username and repo name for Pages. Update if you use a custom domain.
// https://docs.astro.build/en/reference/configuration-reference/#site
const site = 'https://lemik.github.io';
const base = '/resume';

export default defineConfig({
	site,
	base,
	output: 'static',
	trailingSlash: 'ignore',
});
