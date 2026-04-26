// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain (root of subdomain): site = your HTTPS origin, base = '/'.
// For GitHub default URL (lemik.github.io/resume) instead, use that site + base '/resume'.
// https://docs.astro.build/en/reference/configuration-reference/#site
const site = 'https://leonid.dushyn.com';
const base = '/';

export default defineConfig({
	site,
	base,
	output: 'static',
	trailingSlash: 'ignore',
});
