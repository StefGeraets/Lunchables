---
title: Hooks
type: 'split'
order: 45
---

<script>
	import HooksCode from '$lib/demo/HooksCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-gray-200 pt-1">
		<p>Hooks let you run shell commands automatically in response to the AI's actions — without it deciding to do it.</p>
		<p>This example runs <code class="text-yellow-300 bg-gray-800 px-1 rounded">php-cs-fixer</code> on every file it writes or edits. It doesn't need to know it happened.</p>
		<ul class="flex flex-col gap-1 ml-4 list-disc text-gray-300">
			<li>Auto-format on save</li>
			<li>Run a linter after edits</li>
			<li>Notify on tool use</li>
			<li>Enforce constraints the model might forget</li>
		</ul>
		<p>You can ask it to write hooks for you — describe what you want to trigger and when.</p>
	</div>
	<div class="flex-1 h-full">
		<HooksCode />
	</div>
</div>
