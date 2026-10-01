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
	cover: {
		image?: string;
		alt?: string;
		heading: string;
	};
};
