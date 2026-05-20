// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
	integrations: [
		sitemap({
			// Helps crawlers and AI tooling discover every static route plus blog URLs.
			serialize(entry) {
				if (/\/blog\/[^/]+\/?$/i.test(entry.url)) return { ...entry, changefreq: 'monthly', priority: 0.75 };
				if (/blog\/?$/i.test(entry.url)) return { ...entry, changefreq: 'weekly', priority: 0.9 };
				if (/projects/i.test(entry.url)) return { ...entry, changefreq: 'yearly', priority: 0.8 };
				return { ...entry, changefreq: 'monthly', priority: 1 };
			},
		}),
	],
});
