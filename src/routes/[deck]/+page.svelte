<script lang="ts">
	import { resolve } from '$app/paths';
	import { getSlides } from '$lib/slides.remote';

	let { data } = $props();

	const { title, description, cover } = $derived(data.presentation);
	const slides = $derived(await getSlides(data.deck));
	const firstSlide = $derived(resolve('/[deck]/[slug]', { deck: data.deck, slug: slides[0].slug }));
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="flex flex-col items-center justify-center w-3/4 h-full gap-20 mx-auto">
	{#if cover.image}
		<a href={firstSlide} class="w-2/3 mb-16"
			><img src={cover.image} alt={cover.alt ?? title} class="w-full" /></a
		>
	{/if}
	<h1 class="font-black tracking-tighter text-center uppercase text-9xl [word-spacing:0.5em]">
		{#if cover.image}
			{cover.heading}
		{:else}
			<a href={firstSlide}>{cover.heading}</a>
		{/if}
	</h1>
</div>
