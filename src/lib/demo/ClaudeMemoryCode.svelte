<script lang="ts">
	const code = `# Personal AI Configuration

## Communication Style
- Be concise and direct. Skip preamble and filler.
- Don't restate what I said — just do it.
- No unsolicited explanations. If I need context I'll ask.
- No emojis unless I ask for them.

## Coding Preferences
- Prefer simple, readable code over clever abstractions.
- Don't over-engineer. Only build what's asked for.
- Don't add comments unless the logic is genuinely non-obvious.
- Don't add error handling for edge cases that can't happen.
- Don't refactor or "improve" code that wasn't part of the request.
- Avoid backwards-compatibility shims — just change the code.

## Git & Commits
- Never commit unless explicitly asked.
- Never force push to main/master.
- Never skip hooks (--no-verify).
- Prefer creating new commits over amending.
- Keep commit messages short and factual.

## Shell & Environment
- OS: Ubuntu (Linux)
- Shell: zsh with Oh My Zsh
- Terminal: Ghostty + tmux
- Prefer apt for system packages.

## General Workflow
- Read files before modifying them.
- Prefer editing existing files over creating new ones.
- For destructive or hard-to-reverse actions, ask first.
- Don't create README or documentation files unless asked.`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function highlight(raw: string): string {
		return raw
			.split('\n')
			.map((line) => {
				if (line.startsWith('# ')) return `<span class="h1">${esc(line)}</span>`;
				if (line.startsWith('## ')) return `<span class="h2">${esc(line)}</span>`;
				if (line.startsWith('- ')) {
					return `<span class="bullet-marker">- </span><span class="bullet-text">${esc(line.slice(2))}</span>`;
				}
				if (line.trim() === '') return '';
				return `<span class="text">${esc(line)}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="h-full overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.h1) {
		color: #e06c75;
		font-weight: bold;
	}
	pre :global(.h2) {
		color: #61afef;
		font-weight: bold;
	}
	pre :global(.bullet-marker) {
		color: #56b6c2;
	}
	pre :global(.bullet-text) {
		color: #abb2bf;
	}
	pre :global(.text) {
		color: #5c6370;
		font-style: italic;
	}
	pre {
		color: #abb2bf;
	}
</style>
