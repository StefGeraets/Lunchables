<script lang="ts">
	import PresentationCard from '$lib/components/PresentationCard.svelte';
	import { presentationList } from '$lib/presentations';
</script>

<svelte:head>
	<title>Lunchables</title>
	<meta name="description" content="Presentations with live browser demos" />
</svelte:head>

<main class="min-h-screen px-6 py-12 text-gray-100 bg-gray-950 sm:px-12">
	<header class="mb-12">
		<h1 class="text-5xl italic font-black tracking-tight text-yellow-400">Lunchables</h1>
		<p class="mt-2 text-gray-500">Presentations</p>
	</header>

	<div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
		{#each presentationList as { id, ...presentation } (id)}
			<PresentationCard {id} {presentation} />
		{/each}
	</div>
</main>
