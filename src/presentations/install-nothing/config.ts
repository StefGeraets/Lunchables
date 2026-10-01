import type { PresentationConfig } from '$lib/types';
import cover from './assets/Lunchables.svg';

export default {
	title: 'Lunchable: Install Nothing',
	description: '20 minute presentation on new and awesome native browser APIs',
	date: '2024-10-12',
	author: 'Stef Geraets',
	cover: {
		image: cover,
		alt: 'Lunchables',
		heading: "Use these browser API's"
	}
} satisfies PresentationConfig;
