<script lang="ts">
	import { resolve } from '$app/paths';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';

	let { slug }: { slug: string } = $props();

	const slides = await getSlides();
	const nav = $derived(getSlideNav(slides, slug));

	const href = (target?: string) => (target ? resolve('/[slug]', { slug: target }) : resolve('/'));

	let picker: HTMLElement | undefined = $state();

	// The footer stays mounted across slides, so close the picker after every navigation.
	$effect(() => {
		void slug;
		picker?.hidePopover();
	});

	const ontoggle = (event: ToggleEvent) => {
		if (event.newState !== 'open') return;
		picker?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' });
	};
</script>

{#if nav.current > 0}
	<footer class="flex justify-between w-full px-6 py-4 text-gray-500">
		<a href={href(nav.previous)}>Previous</a>
		<button popovertarget="slide-picker" class="cursor-pointer hover:text-gray-300">
			{nav.current} / {nav.total}
		</button>
		{#if nav.next}
			<a href={href(nav.next)}>Next</a>
		{:else}
			<a href={href()} aria-label="Back to start">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
					<path d="M20 4v5h-5" />
				</svg>
			</a>
		{/if}
	</footer>

	<nav
		popover
		id="slide-picker"
		bind:this={picker}
		{ontoggle}
		class="p-2 text-gray-100 bg-gray-900 border border-gray-800 shadow-2xl rounded-xl max-h-[60vh] overflow-auto"
	>
		<ol>
			{#each slides as slide, index (slide.slug)}
				<li>
					<a
						href={href(slide.slug)}
						aria-current={slide.slug === slug ? 'page' : undefined}
						class="flex gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 aria-[current=page]:bg-yellow-400 aria-[current=page]:text-gray-950"
					>
						<span class="w-6 font-mono text-right opacity-60">{index + 1}</span>
						<span>
							{slide.title}
							{#if slide.subtitle}
								<span class="opacity-60">· {slide.subtitle}</span>
							{/if}
						</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	footer {
		view-transition-name: footer;
	}

	#slide-picker {
		inset: auto auto 4rem 50%;
		translate: -50% 0;
		margin: 0;
	}
</style>
