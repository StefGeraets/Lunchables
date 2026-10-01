<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<em class="not-italic underline decoration-wavy decoration-teal-300 underline-offset-8"
	>{@render children()}</em
>
