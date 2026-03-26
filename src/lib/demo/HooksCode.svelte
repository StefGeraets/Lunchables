<script lang="ts">
	const code = `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "f=$(jq -r '.tool_input.file_path');
  echo \\"$f\\" | grep -qE '\\.php$' &&
  NO_TTY=true docker exec
    eventixapi-legacy-api-1
    sh -c \\"./vendor/bin/php-cs-fixer
      fix --path-mode=intersection
      \\\\\\"$f\\\\\\"\\" 2>/dev/null
  || true",
            "timeout": 30,
            "statusMessage":
              "Running php-cs-fixer..."
          }
        ]
      }
    ]
  }
}`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function highlight(raw: string): string {
		return raw
			.split('\n')
			.map((line) => {
				// JSON keys: "something":
				const keyMatch = line.match(/^(\s*)("[\w-]+")(:\s*)(.*)/);
				if (keyMatch) {
					const indent = esc(keyMatch[1]);
					const key = `<span class="key">${esc(keyMatch[2])}</span>`;
					const colon = esc(keyMatch[3]);
					const rest = esc(keyMatch[4])
						.replace(/^(&quot;)(.*?)(&quot;)(,?)$/, '<span class="str">$1$2$3</span>$4')
						.replace(/^(\d+)(,?)$/, '<span class="num">$1</span>$2')
						.replace(/^(true|false)(,?)$/, '<span class="bool">$1</span>$2');
					return `${indent}${key}${colon}${rest}`;
				}
				// standalone strings (array items, continuation lines)
				const strMatch = line.match(/^(\s*)(".*")(,?)$/);
				if (strMatch) {
					return `${esc(strMatch[1])}<span class="str">${esc(strMatch[2])}</span>${esc(strMatch[3])}`;
				}
				return `<span class="punct">${esc(line)}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="h-full overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.key) {
		color: #61afef;
	}
	pre :global(.str) {
		color: #98c379;
	}
	pre :global(.num) {
		color: #d19a66;
	}
	pre :global(.bool) {
		color: #56b6c2;
	}
	pre :global(.punct) {
		color: #5c6370;
	}
	pre {
		color: #abb2bf;
	}
</style>
