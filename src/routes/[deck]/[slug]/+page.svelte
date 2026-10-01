<script lang="ts">
	let { data } = $props();
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="flex flex-col items-center justify-between w-screen flex-1 min-h-0 slide">
	{#if data.meta.type === 'content'}
		<section class="flex flex-col justify-center w-5/6 h-full pt-10 mx-auto">
			<!-- Title -->
			<hgroup class="flex items-center w-full mb-10">
				<h1 class="w-full italic font-black text-center text-accent text-7xl">
					{data.meta.title}
				</h1>
			</hgroup>

			<!-- Post -->
			<div class="prose prose-2xl max-w-none">
				<data.content />
			</div>
		</section>
	{:else if data.meta.type === 'demo'}
		<section class="w-5/6 h-full pt-10 mx-auto">
			<hgroup class="flex items-center w-full mb-10">
				<h1 class="w-full text-2xl font-bold text-center">{data.meta.title}</h1>
			</hgroup>

			<h1 class="font-black text-center text-accent text-7xl">{data.meta.subtitle}</h1>

			<div
				class="flex flex-col items-center justify-center gap-4 p-4 overflow-auto border border-ink/15 overflow rounded-2xl max-h-[80vh]"
			>
				<data.content />
			</div>
		</section>
	{:else if data.meta.type === 'code'}
		<section class="w-5/6 pt-10 mx-auto">
			<hgroup class="flex items-center w-full">
				<h1 class="w-full text-3xl text-center">{data.meta.title} | {data.meta.type}</h1>
			</hgroup>
		</section>
	{:else if data.meta.type === 'ship'}
		<section class="w-5/6 h-full pt-10 mx-auto">
			<hgroup class="flex items-center w-full mb-10">
				<h1 class="w-full text-2xl font-bold text-center">{data.meta.title}</h1>
			</hgroup>

			<h1 class="font-black text-center text-accent text-7xl">{data.meta.subtitle}</h1>

			<div class="flex flex-col items-center justify-center gap-4 p-4 rounded-2xl max-h-[80vh]">
				<data.content />
			</div>
		</section>
	{/if}
</div>

<style>
	.slide {
		view-transition-name: slide;
	}

	hgroup {
		view-transition-name: title;
	}
</style>
