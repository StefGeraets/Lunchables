<script lang="ts">
	let details: HTMLDetailsElement;

	const toggle = (event: MouseEvent) => {
		event.preventDefault();
		document.startViewTransition(() => {
			details.open = !details.open;
		});
	};
</script>

<details id="demo-accordion-vt" bind:this={details}>
	<summary onclick={toggle}>Details</summary>
	<div class="details-content">
		<p>This is an accordion with more</p>
		<p>I'm adding more stuff here to make animation look nicer.</p>
	</div>
</details>

<style>
	details {
		align-self: flex-start;
		margin-left: 20vw;
		font-size: 24px;
		cursor: pointer;

		& p {
			padding: 8px 0;
		}
	}
</style>
