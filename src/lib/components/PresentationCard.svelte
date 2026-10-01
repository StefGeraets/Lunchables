<script lang="ts">
	import { resolve } from '$app/paths';
	import { getSlides } from '$lib/slides.remote';
	import type { PresentationConfig } from '$lib/types';
	import CoverPreview from './CoverPreview.svelte';

	let { id, presentation }: { id: string; presentation: PresentationConfig } = $props();

	const slides = $derived(await getSlides(id));

	const date = $derived(
		new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' }).format(
			new Date(presentation.date)
		)
	);
	const meta = $derived(
		[presentation.author, date, `${slides.length} slide${slides.length === 1 ? '' : 's'}`]
			.filter(Boolean)
			.join(' · ')
	);
</script>

<a
	href={resolve('/[deck]', { deck: id })}
	class="flex flex-col overflow-hidden transition-colors border border-gray-800 rounded-2xl group hover:border-yellow-400 focus-visible:border-yellow-400 focus-visible:outline-none"
>
	<CoverPreview {id} {presentation} />
	<div class="flex flex-col gap-1 p-5 border-t border-gray-800">
		<h2 class="text-xl font-bold group-hover:text-yellow-400">{presentation.title}</h2>
		{#if presentation.description}
			<p class="text-gray-400">{presentation.description}</p>
		{/if}
		<p class="mt-2 text-sm text-gray-500">{meta}</p>
	</div>
</a>
