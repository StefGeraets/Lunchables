---
title: Shifting workloads
type: 'split'
order: 65
---

<script>
	import quadrant from '../assets/vibe_quadrant.png';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-ink/90 pt-1">
		<p>AI-generated code still needs a human to own it. The risk is rubber-stamping output you don't understand.</p>
		<ul class="flex flex-col gap-1 ml-4 list-disc text-ink/80">
			<li>Before requesting a review, make sure you understand what you're putting up, be kind to your colleagues!</li>
			<li>Ask your ai to simplify and do a pre-review</li>
			<li>The LLM does not have the big picture, you do!</li>
			<li><code class="text-accent bg-ink/10 px-1 rounded">/pr-intent</code> skill helps: it generates a plain-language summary of what the PR solves and why — not a diff summary. Reviewers get context, not noise.</li>
			<li>Ideas about improving this workflow are welcome</li>
		</ul>
	</div>
	<div class="flex-1 flex items-center justify-center h-full">
		<img src={quadrant} alt="Vibe coding quadrant" class="max-h-full object-contain" />
	</div>
</div>
