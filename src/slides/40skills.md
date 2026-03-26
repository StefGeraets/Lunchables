---
title: Skills
type: 'split'
order: 40
---

<script>
	import SkillCode from '$lib/demo/SkillCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-gray-200 pt-1">
		<p>Skills are reusable slash commands you invoke during a conversation:</p>
		<p class="text-yellow-300 bg-gray-800 rounded px-3 py-2 font-mono text-sm">/architect</p>
		<p>Defined as markdown files with a YAML frontmatter header. Two scopes:</p>
		<ul class="flex flex-col gap-2 ml-4 list-none">
			<li><strong class="text-white">Global</strong> — <code class="text-gray-400">~/.claude/skills/</code></li>
			<li><strong class="text-white">Per-project</strong> — <code class="text-gray-400">.claude/skills/</code></li>
		</ul>
		<p>Example of skills:</p>
		<ul class="flex flex-col gap-2 ml-4 list-none">
			<li><code class="text-yellow-300">/simplify</code> — <span class="text-gray-300">reviews changed code for reuse, quality, and efficiency, then fixes issues found</span></li>
			<li><code class="text-yellow-300">/pr-review</code> — <span class="text-gray-300">reviews the current branch as a PR: checks for bugs, logic issues, security concerns, and code quality</span></li>
			<li><code class="text-yellow-300">/pr-intent</code> — <span class="text-gray-300">generates a concise summary of what a PR solves and why — not what lines changed</span></li>
		</ul>
	</div>
	<div class="flex-1 h-full">
		<SkillCode />
	</div>
</div>
