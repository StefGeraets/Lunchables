<script lang="ts">
	let dialog: HTMLDialogElement;

	const open = () => {
		document.startViewTransition(() => dialog.showModal());
	};

	const close = (event: SubmitEvent) => {
		event.preventDefault();
		document.startViewTransition(() => dialog.close());
	};
</script>

<button onclick={open}>Open</button>
<dialog id="demo-modal" bind:this={dialog}>
	<p>Here to show some nice transitions</p>
	<form method="dialog" onsubmit={close}>
		<button type="submit">OKE</button>
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
		view-transition-name: dialog;

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

	::view-transition-group(dialog) {
		z-index: 10;
	}
</style>
