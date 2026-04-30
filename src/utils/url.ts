/** Prefix a site path with Astro `base` (for GitHub project pages). */
export function withBase(path: string): string {
	const raw = import.meta.env.BASE_URL;
	const base = raw.replace(/\/+$/, '') || '';
	const suffix = path.replace(/^\/+/, '');

	if (!suffix) {
		return base ? `${base}/` : '/';
	}

	return base ? `${base}/${suffix}` : `/${suffix}`;
}

/** Static asset path under `public/` or an absolute `http(s)` URL. */
export function resolvePublicOrAbsolute(path: string): string {
	if (/^https?:\/\//i.test(path)) {
		return path;
	}
	return withBase(path.replace(/^\/+/, ''));
}
