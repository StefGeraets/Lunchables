import type { PresentationConfig } from '$lib/types';
import cover from './assets/Lunchable2.png';

export default {
	title: 'NSFW',
	description: 'Safe images for everyone',
	date: '2026-10-02',
	author: 'Stef Geraets',
	cover: {
		heading: 'NSFW',
		image: cover,
		alt: 'Lunchable'
	}
} satisfies PresentationConfig;
