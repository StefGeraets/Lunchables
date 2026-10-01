<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import SlideFooter from '$lib/components/SlideFooter.svelte';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';

	let { data, children } = $props();

	const slideHref = (slug?: string) =>
		slug
			? resolve('/[deck]/[slug]', { deck: data.deck, slug })
			: resolve('/[deck]', { deck: data.deck });

	const navigate = async (key: KeyboardEvent) => {
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
		}
	};
</script>

<svelte:window onkeydown={navigate} />

<main class="flex flex-col w-screen h-screen text-gray-100 bg-gray-950">
	{@render children()}

	{#if page.params.slug}
		<SlideFooter deck={data.deck} slug={page.params.slug} />
	{/if}
</main>
