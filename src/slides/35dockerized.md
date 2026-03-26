---
title: Dockerized
type: 'split'
order: 35
---

<script>
	import DockerizedCode from '$lib/demo/DockerizedCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-gray-200 pt-1">
		<p>Dockerized assumes interactive mode by default. One small change: honour <code class="text-yellow-300 bg-gray-800 px-1 rounded">NO_TTY=true</code> to skip the <code class="text-gray-400">-it</code> flag.</p>
		<p>This matters for agentic mode — the AI needs to <em>run</em> commands and <em>read their output</em> to verify its own work. Without it, commands hang or fail silently.</p>
		<p>The AGENTS.md section does the rest — it teaches the model which aliases exist, how to run tests per language, and which env vars to set.</p>
	</div>
	<div class="flex-1 h-full">
		<DockerizedCode />
	</div>
</div>
