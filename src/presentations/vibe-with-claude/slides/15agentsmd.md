---
title: AGENTS.md
type: 'split'
order: 15
---

<script>
	import ClaudeMemoryCode from '../components/ClaudeMemoryCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-ink/90 pt-1">
		<p>Claude reads <code class="text-accent bg-ink/10 px-1 rounded">AGENTS.md</code> at the start of <em>every</em> conversation.</p>
		<p>Two scopes:</p>
		<ul class="flex flex-col gap-2 ml-4 list-none">
			<li><strong class="text-ink">Global</strong> — <code class="text-ink/60">~/.claude/AGENTS.md</code><span class="text-ink/50 text-xs">- Applies to all projects</span></li>
			<li><strong class="text-ink">Per-project</strong> — <code class="text-ink/60">AGENTS.md</code> at repo root<span class="text-ink/50 text-xs">- Project specific</span></li>
		</ul>
		<p>Don't want to write it yourself? Run <code class="text-accent bg-ink/10 px-1 rounded">/init</code> — Claude will analyse the codebase and generate one for you.</p>
		<p>Use it to encode:</p>
		<ul class="flex flex-col gap-1 ml-4 list-disc text-ink/80">
			<li>Tone &amp; communication style</li>
			<li>Coding conventions <span class="text-ink/50">— the Weeztimandments are in there</span></li>
			<li>Tooling context (how to run tests, docker setup, etc.) <span class="text-ink/50">— more on this later</span></li>
			<li>Hard rules (never force push, always ask before deleting)</li>
			<li>Name it <code class="text-accent bg-ink/10 px-1 rounded">AGENTS.md</code>, not <code class="text-ink/60 line-through">CLAUDE.md</code> — works across all LLMs, not just Claude</li>
		</ul>
	</div>
	<div class="flex-1 h-full">
		<ClaudeMemoryCode />
	</div>
</div>
