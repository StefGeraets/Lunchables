import { prerender } from '$app/server';
import type { Slide } from '$lib/types';

export const getSlides = prerender(async () => {
	const files = import.meta.glob<Omit<Slide, 'slug'>>('/src/slides/*.md', {
		eager: true,
		import: 'metadata'
	});

	return Object.entries(files)
		.map(([path, metadata]): Slide => ({
			...metadata,
			slug: path.split('/').at(-1)!.replace('.md', '')
		}))
		.sort((first, second) => first.order - second.order);
});
