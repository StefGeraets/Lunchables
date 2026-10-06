<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ul
	class="text-5xl flex flex-col gap-2 in-data-[size=compact]:text-sm in-data-[size=compact]:gap-0 list-['\1F5F4'] leading-normal"
>
	{@render children()}
</ul>
