<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PresentationConfig } from '$lib/types';

	type Props = {
		presentation: PresentationConfig;
		/** Links the cover to this slide. Leave out when the cover sits inside another link. */
		firstSlide?: { deck: string; slug: string };
	};

	let { presentation, firstSlide }: Props = $props();

	const { title, cover } = $derived(presentation);
</script>

<div class="flex flex-col items-center justify-center w-3/4 h-full gap-20 mx-auto">
	{#if cover.image}
		{#if firstSlide}
			<a href={resolve('/[deck]/[slug]', firstSlide)} class="w-2/3 mb-16"
				><img src={cover.image} alt={cover.alt ?? title} class="w-full" /></a
			>
		{:else}
			<img src={cover.image} alt={cover.alt ?? title} class="w-2/3 mb-16" />
		{/if}
	{/if}
	<h1 class="font-black tracking-tighter text-center uppercase text-9xl [word-spacing:0.5em]">
		{#if firstSlide && !cover.image}
			<a href={resolve('/[deck]/[slug]', firstSlide)}>{cover.heading}</a>
		{:else}
			{cover.heading}
		{/if}
	</h1>
</div>
