<script lang="ts">
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import { onNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';
	import SlideFooter from '$lib/components/SlideFooter.svelte';

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
				} else {
					goto(resolve('/'));
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

<main class="flex flex-col w-screen h-screen text-gray-100 bg-gray-950">
	{@render children()}

	{#if page.params.slug}
		<SlideFooter slug={page.params.slug} />
	{/if}
</main>
