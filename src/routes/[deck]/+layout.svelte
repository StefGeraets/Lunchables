<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import SlideFooter from '$lib/components/SlideFooter.svelte';
	import { preloadImages } from '$lib/images';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';
	import { themeStyle } from '$lib/themes';

	let { data, children } = $props();

	const slideHref = (slug?: string) =>
		slug
			? resolve('/[deck]/[slug]', { deck: data.deck, slug })
			: resolve('/[deck]', { deck: data.deck });

	$effect(() => preloadImages(data.deck));

	$effect(() => {
		const slug = page.params.slug;
		getSlides(data.deck).then((slides) => {
			const next = slug ? getSlideNav(slides, slug).next : slides[0]?.slug;
			if (next) preloadData(slideHref(next));
		});
	});

	const navigate = async (key: KeyboardEvent) => {
		// Leave browser shortcuts (Ctrl+R) and typing in demo inputs alone.
		if (key.ctrlKey || key.metaKey || key.altKey) return;
		if (key.target instanceof HTMLElement && key.target.closest('input, textarea, select')) return;

		const slug = page.params.slug;
		const slides = await getSlides(data.deck);
		const nav = slug ? getSlideNav(slides, slug) : undefined;

		switch (key.code) {
			case 'ArrowRight':
			case 'Space':
				goto(slideHref(nav ? nav.next : slides[0].slug));
				break;
			case 'ArrowLeft':
				if (nav) goto(slideHref(nav.previous));
				break;
			case 'KeyH':
				goto(resolve('/'));
				break;
			case 'KeyR':
				goto(slideHref());
				break;
		}
	};
</script>

<svelte:window onkeydown={navigate} />

<main
	class="flex flex-col w-screen h-screen text-ink bg-surface"
	style={themeStyle(data.presentation.theme)}
>
	{@render children()}

	{#if page.params.slug}
		<SlideFooter deck={data.deck} slug={page.params.slug} />
	{/if}
</main>
