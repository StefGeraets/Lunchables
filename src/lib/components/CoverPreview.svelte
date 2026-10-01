<script lang="ts">
	import type { Presentation } from '$lib/presentations';
	import { themeStyle } from '$lib/themes';
	import Cover from './Cover.svelte';

	let { id, presentation }: { id: string; presentation: Presentation } = $props();

	// The cover renders at the window's size and is scaled down to the card width. Matching the
	// window keeps the preview identical to the real cover, so the view transition zooms cleanly.
	let innerWidth = $state(1920);
	let innerHeight = $state(1080);
	let width = $state(0);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	class="relative overflow-hidden bg-surface text-ink"
	style={themeStyle(presentation.theme)}
	style:aspect-ratio="{innerWidth} / {innerHeight}"
	bind:clientWidth={width}
	style:view-transition-name="cover-{id}"
	style:view-transition-class="deck-cover"
	aria-hidden="true"
>
	<div
		class="absolute top-0 left-0 origin-top-left"
		style:width="{innerWidth}px"
		style:height="{innerHeight}px"
		style:transform="scale({width / innerWidth})"
		style:visibility={width ? 'visible' : 'hidden'}
		inert
	>
		<Cover {presentation} />
	</div>
</div>
