import type { CollectionEntry } from 'astro:content';

export function publishedBlogPosts(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
	return posts.filter((p) => p.data.published);
}
