<script lang="ts">
	const code = `### Known issue: ephpunit does not
    forward args to phpunit

\`ephpunit\` builds the command as
\`sh -c 'phpunit || ./vendor/bin/phpunit'\`,
passing extra args to \`sh\` as \`$0\`, \`$1\`
— not to phpunit. So \`--filter\`, file
paths, etc. are silently ignored.

**Workaround:** \`docker exec\` directly:

\`\`\`bash
docker exec eventixapi-legacy-api-1 \\
  sh -c 'APP_ENV=testing \\
  ./vendor/bin/phpunit \\
  --filter "MyTestClass"'
\`\`\`

The legacy-api container name is
\`eventixapi-legacy-api-1\`.`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function highlight(raw: string): string {
		let inCodeBlock = false;
		return raw
			.split('\n')
			.map((line) => {
				if (line.trim().startsWith('```')) {
					inCodeBlock = !inCodeBlock;
					return `<span class="delimiter">${esc(line)}</span>`;
				}
				if (inCodeBlock) {
					return `<span class="bash">${esc(line)}</span>`;
				}
				if (line.startsWith('### ')) return `<span class="h3">${esc(line)}</span>`;
				if (line.trim() === '') return '';

				const inner = esc(line)
					.replace(/\*\*(.+?)\*\*/g, '<span class="bold">**$1**</span>')
					.replace(/`([^`]+)`/g, '<span class="code">$1</span>');
				return `<span class="text">${inner}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="h-full overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.h3) {
		color: #56b6c2;
		font-weight: bold;
	}
	pre :global(.bold) {
		color: #e5c07b;
		font-weight: bold;
	}
	pre :global(.code) {
		color: #e5c07b;
	}
	pre :global(.bash) {
		color: #98c379;
	}
	pre :global(.delimiter) {
		color: #5c6370;
	}
	pre :global(.text) {
		color: #abb2bf;
	}
	pre {
		color: #abb2bf;
	}
</style>
