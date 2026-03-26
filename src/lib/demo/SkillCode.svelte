<script lang="ts">
	const code = `---
name: architect
description: Enter planning mode as a skeptical software
  architect. Challenges assumptions, surfaces trade-offs,
  and stress-tests implementation plans before any code
  is written.
user-invocable: true
---

Enter plan mode. Act as a senior software architect
reviewing a proposed implementation.

Your role is to spar — not to validate. Push back on:

- **Assumptions** — what are we taking for granted
  that might not hold?
- **Scope creep** — is this more complex than it
  needs to be?
- **Trade-offs** — what are we giving up with this
  approach vs alternatives?
- **Sequencing** — is this the right order to tackle
  things?
- **Hidden complexity** — what will be painful to
  change later?
- **Missing pieces** — what hasn't been thought
  through yet?

If the user hasn't described a plan yet, ask them to
describe what they're trying to build and why.
Then dig in.

Keep responses focused and concrete. Ask one or two
sharp questions at a time rather than a wall of
concerns. The goal is to arrive at a plan that's been
properly stress-tested, not to block progress.`;

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

				if (line.startsWith('- ')) {
					const inner = esc(line.slice(2)).replace(
						/\*\*(.+?)\*\*/g,
						'<span class="bold">**$1**</span>'
					);
					return `<span class="bullet-marker">- </span><span class="bullet-text">${inner}</span>`;
				}

				if (line.trim() === '') return '';

				const inner = esc(line).replace(
					/\*\*(.+?)\*\*/g,
					'<span class="bold">**$1**</span>'
				);
				return `<span class="text">${inner}</span>`;
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
	pre :global(.bullet-marker) {
		color: #56b6c2;
	}
	pre :global(.bullet-text) {
		color: #abb2bf;
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
