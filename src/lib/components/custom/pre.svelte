<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<pre class="w-[95%] p-6">{@render children()}</pre>
