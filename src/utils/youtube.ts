/** Extract YouTube video id from common URL shapes, or null. */
export function youtubeIdFromUrl(url: string): string | null {
	try {
		const u = new URL(url);
		if (u.hostname === 'youtu.be') {
			const id = u.pathname.replace(/^\//, '').split('/')[0];
			return id || null;
		}
		if (u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com' || u.hostname === 'm.youtube.com') {
			const v = u.searchParams.get('v');
			if (v) return v;
			const embed = u.pathname.match(/^\/embed\/([^/]+)/);
			if (embed) return embed[1] ?? null;
		}
	} catch {
		return null;
	}
	return null;
}
