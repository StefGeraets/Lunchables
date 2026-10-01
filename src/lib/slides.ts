import type { Slide } from '$lib/types';

export function getSlideNav(slides: Slide[], slug: string) {
	const index = slides.findIndex((slide) => slide.slug === slug);

	return {
		previous: index <= 0 ? undefined : slides[index - 1].slug,
		next: index === slides.length - 1 ? undefined : slides[index + 1].slug,
		current: index + 1,
		total: slides.length
	};
}
