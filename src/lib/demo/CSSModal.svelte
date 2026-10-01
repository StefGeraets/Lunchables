<script lang="ts">
	let dialog: HTMLDialogElement;
</script>

<button onclick={() => dialog.showModal()}>Open</button>
<dialog id="demo-modal" bind:this={dialog}>
	<p>Oh hey there! I did't see you there. I am looking to trick or treat</p>
	<form method="dialog">
		<button type="submit">BOOO</button>
	</form>
</dialog>

<style>
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
