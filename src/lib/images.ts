const images = import.meta.glob<string>('/src/presentations/*/assets/*.{jpg,jpeg,png,webp,svg}', {
	eager: true,
	import: 'default'
});

export function preloadImages(deck: string) {
	const prefix = `/src/presentations/${deck}/assets/`;
	for (const [path, url] of Object.entries(images)) {
		if (path.startsWith(prefix)) new Image().src = url;
	}
}
