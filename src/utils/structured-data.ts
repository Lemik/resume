import type { CollectionEntry } from 'astro:content';
import { siteIdentity } from '../config/site-metadata';

/** Turn a pathname (e.g. `/blog/foo`) or absolute URL into an absolute href. */
export function toAbsoluteHref(site: URL, pathnameOrUrl: string): string {
	try {
		if (/^https?:\/\//i.test(pathnameOrUrl)) return pathnameOrUrl;
		const path = pathnameOrUrl.startsWith('/') ? pathnameOrUrl : `/${pathnameOrUrl}`;
		return new URL(path, site).href;
	} catch {
		return pathnameOrUrl;
	}
}

export function webSiteSchema(props: { site: URL; name?: string; description: string }): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: props.name ?? siteIdentity.name,
		url: props.site.href,
		description: props.description,
		inLanguage: 'en',
	};
}

export function webPageSchema(props: {
	site: URL;
	title: string;
	description: string;
	url: string;
	image?: string[];
}): Record<string, unknown> {
	const json: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: props.title,
		description: props.description,
		url: props.url,
		isPartOf: {
			'@type': 'WebSite',
			name: siteIdentity.name,
			url: props.site.href,
		},
		inLanguage: 'en',
	};
	if (props.image?.length) {
		json.primaryImageOfPage = { '@type': 'ImageObject', url: props.image[0] };
		json.image = props.image.length === 1 ? props.image[0] : props.image;
	}
	return json;
}

export function personSchema(props: {
	site: URL;
	jobTitle?: string;
	sameAs: string[];
	description: string;
}): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteIdentity.name,
		jobTitle: props.jobTitle ?? siteIdentity.jobTitle,
		url: props.site.href,
		description: props.description,
		sameAs: [...new Set(props.sameAs)],
		image: new URL(siteIdentity.defaultOgRelPath, props.site).href,
	};
}

function publisherOrganization(site: URL): Record<string, unknown> {
	return {
		'@type': 'Organization',
		name: siteIdentity.name,
		url: site.href,
	};
}

export function blogPostingSchema(props: {
	site: URL;
	canonicalHref: string;
	entry: CollectionEntry<'blog'>;
	authorSameAs?: string[];
}): Record<string, unknown> {
	const { entry, site, canonicalHref } = props;
	const data = entry.data;
	const imgs: string[] = [];
	if (data.image) {
		const normalized = /^https?:\/\//i.test(data.image)
			? data.image
			: data.image.startsWith('/')
				? data.image
				: `/${data.image}`;
		imgs.push(toAbsoluteHref(site, normalized));
	}

	const article: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.title,
		description: data.description,
		datePublished: data.pubDate.toISOString(),
		url: canonicalHref,
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalHref },
		inLanguage: 'en',
		author: {
			'@type': 'Person',
			name: siteIdentity.name,
			url: site.href,
			...(props.authorSameAs?.length ? { sameAs: props.authorSameAs } : {}),
		},
		publisher: publisherOrganization(site),
		isPartOf: {
			'@type': 'Blog',
			name: `${siteIdentity.name} — Blog`,
			url: toAbsoluteHref(site, '/blog/'),
		},
	};
	if (data.updatedDate) {
		article.dateModified = data.updatedDate.toISOString();
	}
	if (data.tags?.length) {
		article.keywords = data.tags.join(', ');
	}
	if (imgs.length) {
		article.image = imgs;
	}
	return article;
}

export function collectionPageBlogSchema(props: {
	site: URL;
	canonicalHref: string;
	description: string;
	posts: CollectionEntry<'blog'>[];
	title: string;
}): Record<string, unknown> {
	const urls = props.posts.map((p) => toAbsoluteHref(props.site, `/blog/${p.id}/`));

	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: props.title,
		description: props.description,
		url: props.canonicalHref,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: urls.length,
			itemListElement: urls.map((url, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				url,
			})),
		},
		isPartOf: {
			'@type': 'WebSite',
			name: siteIdentity.name,
			url: props.site.href,
		},
		inLanguage: 'en',
	};
}
