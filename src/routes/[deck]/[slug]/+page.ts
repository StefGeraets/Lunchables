import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { Slide } from '$lib/types';
import type { PageLoad } from './$types';

type SlideModule = { default: Component; metadata: Omit<Slide, 'slug'> };

const modules = import.meta.glob<SlideModule>('/src/presentations/*/slides/*.md');

export const load: PageLoad = async ({ params }) => {
	const importSlide = modules[`/src/presentations/${params.deck}/slides/${params.slug}.md`];
	if (!importSlide) error(404, `Could not find ${params.slug}`);

	const slide = await importSlide();

	return {
		content: slide.default,
		meta: slide.metadata
	};
};
