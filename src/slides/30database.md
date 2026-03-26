---
title: Database
type: 'split'
order: 30
---

<script>
	import DatabaseCode from '$lib/demo/DatabaseCode.svelte';
</script>

<div class="flex gap-8 h-full text-sm">
	<div class="flex-1 flex flex-col gap-4 text-gray-200 pt-1">
		<p>It has no idea what our database looks like — unless we tell it.</p>
		<p>We point AGENTS.md at <code class="text-yellow-300 bg-gray-800 px-1 rounded">mariadb_management_ddl.sql</code>: a mysqldump of the full <code class="text-gray-400">management</code> schema. It reads this when it needs to reason about tables, columns, indexes, or relations.</p>
		<ul class="flex flex-col gap-1 ml-4 list-disc text-gray-300">
			<li>No hallucinated column names</li>
			<li>Understands foreign keys and joins</li>
			<li>Can write queries against the actual schema</li>
		</ul>
		<p>When the schema changes, it can update the dump itself — just ask.</p>
	</div>
	<div class="flex-1 h-full">
		<DatabaseCode />
	</div>
</div>
