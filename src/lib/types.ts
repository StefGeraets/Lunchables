export type Slide = {
	title: string;
	subtitle?: string;
	type: 'content' | 'code' | 'demo' | 'ship';
	order: number;
	slug: string;
};

export type PresentationConfig = {
	title: string;
	description: string;
	/** ISO day (YYYY-MM-DD). The home grid sorts by it, newest first. */
	date: string;
	/** Shown on the home grid card only. */
	author?: string;
	cover: {
		image?: string;
		alt?: string;
		heading: string;
	};
};
