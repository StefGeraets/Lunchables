<script lang="ts">
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-3/4 h-full gap-20 mx-auto">
	<a href={data.slides[0].slug} class="w-2/3 mb-16"
		><img src="/Lunchables.svg" alt="Lunchables" class="w-full" /></a
	>
	<h1 class="font-black tracking-tighter text-center uppercase text-9xl">
		Vibe with Claude
	</h1>
</div>
