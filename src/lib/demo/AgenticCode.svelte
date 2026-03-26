<script lang="ts">
	const code = `---
name: fix
description: Diagnose and fix a bug end-to-end.
user-invocable: true
---

You are fixing a bug. Work autonomously:

1. Read the relevant code to understand
   the existing patterns and context.
2. Identify the root cause — don't guess,
   trace it.
3. Write a test that verifies the bug —
   confirm it fails before touching
   anything else.
4. Implement the fix.
5. Run the tests. If they fail, fix the
   issues and re-run. Do not give up.
6. Commit once all tests pass.

Do not ask for clarification unless
completely blocked. Prefer action over
questions.`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	type State = 'frontmatter' | 'body';

	function highlight(raw: string): string {
		let state: State = 'body';
		let frontmatterCount = 0;

		return raw
			.split('\n')
			.map((line) => {
				if (line.trim() === '---') {
					frontmatterCount++;
					state = frontmatterCount < 2 ? 'frontmatter' : 'body';
					return `<span class="delimiter">${esc(line)}</span>`;
				}

				if (state === 'frontmatter') {
					const colonIdx = line.indexOf(':');
					if (colonIdx !== -1) {
						const key = esc(line.slice(0, colonIdx + 1));
						const val = esc(line.slice(colonIdx + 1));
						return `<span class="yaml-key">${key}</span><span class="yaml-val">${val}</span>`;
					}
					return `<span class="yaml-val">${esc(line)}</span>`;
				}

				const numbered = line.match(/^(\d+\. )(.*)/);
				if (numbered) {
					const inner = esc(numbered[2]).replace(
						/\*\*(.+?)\*\*/g,
						'<span class="bold">**$1**</span>'
					);
					return `<span class="num">${esc(numbered[1])}</span><span class="text">${inner}</span>`;
				}

				if (line.trim() === '') return '';

				return `<span class="text">${esc(line)}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="h-full overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.delimiter) {
		color: #5c6370;
	}
	pre :global(.yaml-key) {
		color: #61afef;
		font-weight: bold;
	}
	pre :global(.yaml-val) {
		color: #98c379;
	}
	pre :global(.num) {
		color: #56b6c2;
		font-weight: bold;
	}
	pre :global(.bold) {
		color: #e5c07b;
		font-weight: bold;
	}
	pre :global(.text) {
		color: #abb2bf;
	}
	pre {
		color: #abb2bf;
	}
</style>
