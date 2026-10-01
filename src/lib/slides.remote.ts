import { prerender } from '$app/server';
import * as v from 'valibot';
import { presentationIds } from '$lib/presentations';
import type { Slide } from '$lib/types';

const files = import.meta.glob<Omit<Slide, 'slug'>>('/src/presentations/*/slides/*.md', {
	eager: true,
	import: 'metadata'
});

export const getSlides = prerender(
	v.picklist(presentationIds),
	async (deck) => {
		const prefix = `/src/presentations/${deck}/slides/`;

		return Object.entries(files)
			.filter(([path]) => path.startsWith(prefix))
			.map(([path, metadata]): Slide => ({
				...metadata,
				slug: path.slice(prefix.length).replace('.md', '')
			}))
			.sort((first, second) => first.order - second.order);
	},
	{ inputs: () => presentationIds }
);
