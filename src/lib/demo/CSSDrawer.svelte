<script lang="ts">
	let dialog: HTMLDialogElement;
</script>

<button id="trigger" onclick={() => dialog.showModal()}>Open Dialog</button>
<dialog id="demo-drawer-css" bind:this={dialog}>
	<button class="close" onclick={() => dialog.close()}>Cancel</button>
	<h3>Create a new issue</h3>
	<form method="dialog">
		<input type="text" placeholder="Title" />
		<textarea placeholder="Write a message"></textarea>
		<button type="submit">Submit</button>
	</form>
</dialog>

<style>
	#demo-drawer-css {
		transition:
			display 0.5s allow-discrete,
			overlay 0.5s allow-discrete,
			translate 0.5s,
			opacity 0.2s 0.4s;
		opacity: 0;
		translate: 0 100vh;
		height: 58vb;
		width: 100vi;
		padding: 1rem;
		border-radius: 25px 25px 0 0;
		border: none;
		background: rgba(220, 220, 220);
		max-width: 100%;
		box-shadow:
			rgba(0, 0, 0, 0.25) 0px 54px 55px,
			rgba(0, 0, 0, 0.12) 0px -12px 30px;
		inset-block-start: unset;

		&::backdrop {
			transition:
				display 0.5s allow-discrete,
				overlay 0.5s allow-discrete,
				opacity 0.2s 0.4s;
			opacity: 0;
			background: rgba(0, 0, 0, 0.3);
		}

		&[open],
		&[open]::backdrop {
			opacity: 1;
			transition:
				display 0.5s allow-discrete,
				overlay 0.5s allow-discrete,
				translate 0.5s,
				opacity 0.2s;
		}

		&[open] {
			translate: 0 0;
		}

		@starting-style {
			&[open],
			&[open]::backdrop {
				opacity: 0;
			}
			&[open] {
				translate: 0 100vh;
			}
		}
	}

	body:has([open]) {
		overflow: hidden;
	}

	/* UI Code */
	button[type='submit'] {
		position: absolute;
		inset-inline-end: 1rem;
		inset-block-start: 1rem;
	}

	button {
		border: 1px solid #fff;
		padding: 8px;
		border-radius: 4px;
	}
	dialog {
		padding: 16px;
		border-radius: 16px;
		width: 35%;

		&[open]::backdrop {
			background: rgba(0, 0, 0, 0.7);
		}

		& p {
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 4px;
		}

		& form {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}

		& input {
			border: 1px solid grey;
			border-radius: 4px;
			padding: 2px 4px;
		}

		& button {
			background: #000;
			color: #fff;
			text-transform: uppercase;
		}
	}

	#demo-modal {
		&,
		::backdrop {
			transition:
				display 0.3s allow-discrete,
				overlay 0.3s allow-discrete,
				translate 0.3s,
				opacity 0.3s;
			opacity: 0;
			translate: 0 20px;
		}

		&[open],
		&[open]::backdrop {
			opacity: 1;
			translate: 0 0;
		}

		@starting-style {
			&[open],
			&[open]::backdrop {
				opacity: 0;
				translate: 0 20px;
			}
		}
	}
</style>
