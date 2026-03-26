<script lang="ts">
	const code = `## Weeztix Development Environment
All Weeztix services run via docker-compose, managed by the
\`dockerized\` tool at \`~/eventix/dockerized\`.

### e* aliases
Running \`eval "$(~/eventix/dockerized/dockerized aliases)"\`
sets up context-aware aliases. When run from inside a repo
directory, each alias finds the running container with that
path mounted and either \`docker exec\`s in or starts a fresh
one.

| Alias | Runs |
|-------|------|
| \`ephp\` | \`php\` in PHP container |
| \`ecomposer\` | \`composer\` in PHP container |
| \`ephpunit\` | \`phpunit\` in PHP container (new container, testing env) |
| \`edphp\` | \`php\` with Xdebug enabled |
| \`edphpunit\` | \`phpunit\` with Xdebug enabled |
| \`eyarn\` | \`yarn\` in Node container |
| \`enode\` | \`node\` in Node container |
| \`enpm\` | \`npm\` in Node container |
| \`enpx\` | \`npx\` in Node container |
| \`ego\` | \`go\` in Go container |
| \`esh\` | \`sh\` exec into existing running container |

These are the primary way to run tests, install
dependencies, and execute one-off commands inside service
containers.

### Useful env vars
- \`NEW_CONTAINER=true\` — force a fresh container instead
of exec-ing into an existing one
- \`PRINT_COMMAND=true\` — print the full command before running

### Container lifecycle

All commands run from \`~/eventix/dockerized\` (or wherever
the \`dockerized\` binary is). Services auto-detect TTY
— no env prefix needed.

\`\`\`bash
./dockerized start [svc]      # Pull images and start
 containers
./dockerized stop [svc]       # Stop containers
./dockerized restart [svc]    # Stop then start
./dockerized remove [svc]     # Stop and remove
 containers
./dockerized pull [svc]       # Pull updated images
\`\`\`

Omitting \`[svc]\` applies to all selected services.
Specify by service name (e.g., \`nginx\`, \`legacy-api\`).

### Container naming

Containers follow the pattern \`eventixapi-<service>-1\`.
Examples:
- \`eventixapi-nginx-1\`
- \`eventixapi-legacy-api-1\`
- \`eventixapi-mariadb-1\`
- \`eventixapi-redis-1\`

Use \`./dockerized compose ps\` to see all running
containers and their names.

### Logs and inspection

\`\`\`bash
./dockerized compose logs <service>       # Print logs
(service name, not container name)
./dockerized compose logs -f <service>    # Follow logs
./dockerized compose ps                   # List all
containers with status
./dockerized config                       # Show all
configured services
\`\`\`

Dockerized internal log: \`/tmp/dockerized.log\`

### Healthy vs unhealthy

Services declare health dependencies on each other.
When a container is **unhealthy**, its dependents won't
start (they stay in "waiting" state). Common causes:
- The process crashed (check logs)
- A dependency (e.g. mariadb, redis, elasticsearch) is
itself unhealthy
- The healthcheck endpoint isn't responding yet (may just
need more time)

To diagnose:
\`\`\`bash
# Shows status: healthy / unhealthy / starting
./dockerized compose ps
# Check what went wrong
./dockerized compose logs <unhealthy-service>
# Raw healthcheck state
docker inspect eventixapi-<service>-1 | grep -A5 Health
\`\`\`

To recover:
\`\`\`bash
# Restart a specific service
./dockerized restart <service>
# Restart everything
./dockerized restart
\`\`\`

Health dependency types used in service config:
- **Healthy** — waits for healthcheck to pass (databases,
 redis, elasticsearch)
- **Started** — waits for container to be running (lighter
services)
- **Completed** — waits for container to exit successfully
 (one-shot jobs like createbucket)

### Running tests

- PHP: \`cd\` into the service repo, run \`ephpunit\` (
optionally pass args: \`ephpunit --filter=TestFoo\`)
- Go: \`cd\` into the service repo, run \`ego test ./...\`
- Node/frontend: \`cd\` into the service repo, run
\`eyarn test\` or \`enpm test\`

`;

	function esc(str: string): string {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function highlight(raw: string): string {
		return raw
			.split('\n')
			.map((line) => {
				if (line.startsWith('## ')) return `<span class="h2">${esc(line)}</span>`;
				if (line.startsWith('### ')) return `<span class="h3">${esc(line)}</span>`;
				if (line.startsWith('- ')) {
					const inner = esc(line.slice(2)).replace(/`([^`]+)`/g, '<span class="code">$1</span>');
					return `<span class="bullet-marker">- </span><span class="text">${inner}</span>`;
				}
				if (line.startsWith('|')) {
					const inner = esc(line).replace(/`([^`]+)`/g, '<span class="code">$1</span>');
					return `<span class="table">${inner}</span>`;
				}
				if (line.trim() === '') return '';
				const inner = esc(line).replace(/`([^`]+)`/g, '<span class="code">$1</span>');
				return `<span class="text">${inner}</span>`;
			})
			.join('\n');
	}
</script>

<pre class="h-full overflow-y-auto rounded-lg p-4 text-xs leading-relaxed bg-[#0d1117] font-mono">{@html highlight(code)}</pre>

<style>
	pre :global(.h2) {
		color: #61afef;
		font-weight: bold;
	}
	pre :global(.h3) {
		color: #56b6c2;
		font-weight: bold;
	}
	pre :global(.bullet-marker) {
		color: #56b6c2;
	}
	pre :global(.code) {
		color: #e5c07b;
	}
	pre :global(.table) {
		color: #5c6370;
	}
	pre :global(.text) {
		color: #abb2bf;
	}
	pre {
		color: #abb2bf;
	}
</style>
