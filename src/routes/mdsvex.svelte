<script lang="ts" module>
	export { img, em, pre, ul } from '$lib/components/custom';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
