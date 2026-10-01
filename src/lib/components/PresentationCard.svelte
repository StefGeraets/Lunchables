<script lang="ts">
	import { resolve } from '$app/paths';
	import { getSlides } from '$lib/slides.remote';
	import type { Presentation } from '$lib/presentations';
	import CoverPreview from './CoverPreview.svelte';

	let { id, presentation }: { id: string; presentation: Presentation } = $props();

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
	class="flex flex-col overflow-hidden transition-colors border border-ink/15 rounded-2xl group hover:border-accent focus-visible:border-accent focus-visible:outline-none"
>
	<CoverPreview {id} {presentation} />
	<div class="flex flex-col gap-1 p-5 border-t border-ink/15">
		<h2 class="text-xl font-bold group-hover:text-accent">{presentation.title}</h2>
		{#if presentation.description}
			<p class="text-ink/70">{presentation.description}</p>
		{/if}
		<p class="mt-2 text-sm text-ink/60">{meta}</p>
	</div>
</a>
