<script lang="ts">
	import { resolve } from '$app/paths';
	import * as config from '$lib/config';
	import { getSlides } from '$lib/slides.remote';

	const slides = await getSlides();
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-3/4 h-full gap-20 mx-auto">
	<a href={resolve('/[slug]', { slug: slides[0].slug })} class="w-2/3 mb-16"
		><img src="/Lunchables.svg" alt="Lunchables" class="w-full" /></a
	>
	<h1 class="font-black tracking-tighter text-center uppercase text-9xl">
		Use &nbsp; these &nbsp; browser &nbsp; API's
	</h1>
</div>
