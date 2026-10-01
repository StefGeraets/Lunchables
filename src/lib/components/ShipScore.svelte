<script lang="ts">
	import { fly, scale } from 'svelte/transition';

	type Props = {
		chrome?: string;
		firefox?: string;
		safari?: string;
		shipIt?: boolean;
		tryIt?: boolean;
		checkIt?: boolean;
		globalScore?: string;
		inUse?: boolean;
	};

	let {
		chrome = '',
		firefox = '',
		safari = '',
		shipIt = false,
		tryIt = false,
		checkIt = false,
		globalScore = '',
		inUse = false
	}: Props = $props();

	let showScore = $state(false);

	const verdict = $derived(shipIt ? 'SHIP IT' : tryIt ? 'TRY IT' : checkIt ? 'CHECK IT' : '');

	const browsers = $derived([
		{ name: 'chrome', icon: 'chrome.svg', version: chrome, delay: 100 },
		{ name: 'firefox', icon: 'ff.svg', version: firefox, delay: 300 },
		{ name: 'safari', icon: 'safari.svg', version: safari, delay: 500 }
	]);
</script>

<button class="relative" onclick={() => (showScore = !showScore)}>
	<h1 class="mt-12 text-5xl font-bold">🚢 ship score 🚢</h1>
	{#if showScore}
		<div
			class="absolute inset-x-0 p-4 font-mono text-6xl font-black rounded-lg shadow-2xl bg-linear-to-br from-yellow-200 to-yellow-400 -rotate-3 top-8 text-gray-950"
			in:scale={{ opacity: 0, start: 4 }}
		>
			{verdict}
		</div>
	{/if}
</button>

{#if showScore}
	<div class="flex gap-16 mt-20">
		{#each browsers as browser (browser.name)}
			<div
				class="flex flex-col items-center justify-center {browser.version === ''
					? 'opacity-20'
					: ''}"
				in:fly={{ y: 20, duration: 750, delay: browser.delay }}
			>
				<img src={browser.icon} alt={browser.name} class="w-28 aspect-square" />
				{#if browser.version !== ''}
					<span
						class="px-2 py-1 -m-6 text-3xl font-black rounded-md shadow-lg bg-linear-to-br from-yellow-200 to-green-400 text-gray-950"
						>{browser.version}</span
					>
				{:else}
					<span
						class="px-2 py-1 -m-6 text-3xl font-black rounded-md shadow-lg bg-linear-to-br from-red-200 to-red-700 text-gray-950"
						>X</span
					>
				{/if}
			</div>
		{/each}
	</div>
{/if}

{#if inUse && showScore}
	<div
		class="absolute flex flex-col items-center left-[12vw] -rotate-12"
		in:fly={{ x: -200, delay: 1500 }}
	>
		<span class="text-4xl font-semibold">used in</span>
		<span class="font-mono font-light tracking-tighter text-9xl">VUE-UI</span>
	</div>
{/if}

{#if globalScore && showScore}
	<div
		class="absolute flex flex-col items-center right-[15vw] rotate-12"
		in:fly={{ x: 200, delay: 1000 }}
	>
		<span class="font-mono font-light tracking-tighter text-9xl">{globalScore}</span>
		<span class="text-4xl font-semibold">Global Usage</span>
	</div>
{/if}
