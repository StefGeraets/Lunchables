<script lang="ts">
	import { resolve } from '$app/paths';
	import { getSlides } from '$lib/slides.remote';
	import { getSlideNav } from '$lib/slides';
	import HomeLink from './HomeLink.svelte';

	let { deck, slug }: { deck: string; slug: string } = $props();

	const slides = $derived(await getSlides(deck));
	const nav = $derived(getSlideNav(slides, slug));

	const href = (target?: string) =>
		target ? resolve('/[deck]/[slug]', { deck, slug: target }) : resolve('/[deck]', { deck });

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
	<footer class="flex justify-between w-full px-6 py-4 text-ink/60">
		<div class="flex items-center gap-4">
			<HomeLink />
			<a href={href(nav.previous)} class="hover:text-ink">Previous</a>
		</div>
		<button popovertarget="slide-picker" class="cursor-pointer hover:text-ink">
			{nav.current} / {nav.total}
		</button>
		{#if nav.next}
			<a href={href(nav.next)} class="hover:text-ink">Next</a>
		{:else}
			<a href={href()} aria-label="Back to start" class="hover:text-ink">
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
		class="p-2 text-ink bg-surface border border-ink/15 shadow-2xl rounded-xl max-h-[60vh] overflow-auto"
	>
		<ol>
			{#each slides as slide, index (slide.slug)}
				<li>
					<a
						href={href(slide.slug)}
						aria-current={slide.slug === slug ? 'page' : undefined}
						class="flex gap-3 px-4 py-2 rounded-lg hover:bg-ink/10 aria-[current=page]:bg-accent aria-[current=page]:text-on-accent"
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
