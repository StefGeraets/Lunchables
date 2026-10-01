<script lang="ts">
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import { onNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const navigate = async (key: KeyboardEvent) => {
		const slug = page.params.slug;
		const slides = await getSlides();
		const nav = slug ? getSlideNav(slides, slug) : undefined;

		switch (key.code) {
			case 'ArrowRight':
			case 'Space':
				if (!nav) {
					goto(resolve('/[slug]', { slug: slides[0].slug }));
				} else if (nav.next) {
					goto(resolve('/[slug]', { slug: nav.next }));
				}
				break;
			case 'ArrowLeft':
				if (!nav) return;
				if (nav.previous) {
					goto(resolve('/[slug]', { slug: nav.previous }));
				} else {
					goto(resolve('/'));
				}
				break;
		}
	};
</script>

<svelte:window onkeydown={navigate} />

<main class="w-screen h-screen text-gray-100 bg-gray-950">
	{@render children()}
</main>
