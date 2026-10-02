<script lang="ts">
	type Step = {
		from: string;
		to: string;
		label: string;
		warn?: boolean;
	};

	type Props = {
		actors: string[];
		steps: Step[];
	};

	let { actors, steps }: Props = $props();

	const rows = $derived(
		steps.map((step) => {
			const from = actors.indexOf(step.from);
			const to = actors.indexOf(step.to);
			const start = Math.min(from, to);
			const span = Math.abs(to - from) + 1;
			return { ...step, start, span, left: to < from, self: from === to };
		})
	);
</script>

<div
	class="relative grid w-full gap-x-2 gap-y-3 text-xl"
	style:grid-template-columns="repeat({actors.length}, minmax(0, 1fr))"
>
	{#each actors as actor, i (actor)}
		<div
			class="pointer-events-none absolute inset-y-0 border-l-2 border-dashed border-ink/15"
			style:left="calc({(i + 0.5) / actors.length} * 100%)"
		></div>
		<div
			class="relative z-10 px-2 py-3 font-bold text-center border-2 rounded-xl bg-surface border-ink/30"
		>
			{actor}
		</div>
	{/each}

	{#each rows as row, i (i)}
		<div
			class="relative z-10 flex flex-col items-center"
			style:grid-column="{row.start + 1} / span {row.span}"
		>
			{#if row.self}
				<span
					class="px-3 py-1 text-center border-2 rounded-lg bg-surface {row.warn
						? 'border-red-500 text-red-400'
						: 'border-accent/60'}"
				>
					<span class="font-mono text-accent">{i + 1}.</span>
					{row.label}
				</span>
			{:else}
				<span class="px-2 text-center bg-surface {row.warn ? 'text-red-400 font-bold' : ''}">
					<span class="font-mono text-accent">{i + 1}.</span>
					{row.label}
				</span>
				<div
					class="relative h-0.5 mt-1 {row.warn ? 'bg-red-500' : 'bg-ink/70'}"
					style:width="calc(100% - 100% / {row.span})"
				>
					<span
						class="absolute -top-2.5 text-xl leading-none {row.left
							? '-left-1'
							: '-right-1'} {row.warn ? 'text-red-500' : 'text-ink/70'}"
					>
						{row.left ? '◀' : '▶'}
					</span>
				</div>
			{/if}
		</div>
	{/each}
</div>
