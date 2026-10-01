<script lang="ts">
	import Cover from '$lib/components/Cover.svelte';
	import HomeLink from '$lib/components/HomeLink.svelte';
	import { getSlides } from '$lib/slides.remote';

	let { data } = $props();

	const { title, description } = $derived(data.presentation);
	const slides = $derived(await getSlides(data.deck));
	const firstSlide = $derived({ deck: data.deck, slug: slides[0].slug });
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<HomeLink class="absolute p-6 top-0 left-0 z-10" />

<!-- Same name as the home grid card, so the card preview morphs into this cover. -->
<div
	class="flex-1 min-h-0"
	style:view-transition-name="cover-{data.deck}"
	style:view-transition-class="deck-cover"
>
	<Cover presentation={data.presentation} {firstSlide} />
</div>
