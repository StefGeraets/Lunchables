<script lang="ts">
	let dialog: HTMLDialogElement;
</script>

<button onclick={() => dialog.showModal()}>Open</button>
<dialog bind:this={dialog}>
	<p>Login</p>
	<form method="dialog">
		<input type="text" placeholder="username" />
		<input type="password" placeholder="password" />
		<button type="submit">Login</button>
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

		&::backdrop {
			background: rgba(0, 0, 0, 0.75);
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
</style>
