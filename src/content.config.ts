import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		/** Path under `public/` (no leading slash), e.g. `images/blog/cover.jpg`, or an `https://` URL. */
		image: z.string().optional(),
		/** Alt text for the article hero image; defaults to `title`. */
		imageAlt: z.string().optional(),
	}),
});

export const collections = { blog };
