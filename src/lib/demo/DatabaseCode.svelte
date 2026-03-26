<script lang="ts">
	const code = `## Database / MariaDB

The \`management\` database schema (MariaDB)
is documented at:
\`/home/joris/.claude/mariadb_management_ddl.sql\`

Read this file when asked about table
structure, columns, indexes, or foreign
keys.`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function highlight(raw: string): string {
		return raw
			.split('\n')
			.map((line) => {
				if (line.startsWith('## ')) return `<span class="h2">${esc(line)}</span>`;
				if (line.trim() === '') return '';
				const inner = esc(line).replace(/`([^`]+)`/g, '<span class="code">$1</span>');
				return `<span class="text">${inner}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.h2) {
		color: #61afef;
		font-weight: bold;
	}
	pre :global(.code) {
		color: #e5c07b;
	}
	pre :global(.text) {
		color: #abb2bf;
	}
	pre {
		color: #abb2bf;
	}
</style>
