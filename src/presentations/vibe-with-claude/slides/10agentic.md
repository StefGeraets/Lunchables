---
title: Agentic workflows
type: 'split'
order: 10
---

<script>
	import AgenticCode from '../components/AgenticCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-ink/90 pt-1">
		<p>It doesn't just answer — it <em>acts</em>: reads files, runs commands, edits code, runs tests, iterates.</p>
		<p>Give it a <strong class="text-ink">goal</strong>, not steps. Let it figure out the how.</p>
		<p>It checks its own work — if tests fail, it fixes and retries.</p>
		<p>How to go about it:</p>
		<ul class="flex flex-col gap-1 ml-4 list-disc text-ink/80">
			<li>Be specific about the outcome, not the implementation</li>
			<li>Use AGENTS.md to set guardrails and context upfront</li>
			<li>Trust it to explore</li>
			<li>Prompting is a skill, skills need practice</li>
		</ul>
	</div>
	<div class="flex-1 h-full">
		<AgenticCode />
	</div>
</div>
