---
title: Modals x Alerts x Dialogs
subtitle: ViewTransition Modal
type: 'demo'
order: 9
---

<script>
  import VTDialog from '../components/VTModal.svelte'
</script>

<VTDialog />

```html
<script>
	window.onload = function () {
		if (typeof window !== 'undefined') {
			const dialog = document.querySelector('#demo-modal');
			const open = document.querySelector('#demo-modal-open');
			const form = document.querySelector('#demo-modal form');

			open.addEventListener('click', open_dialog);
			form.addEventListener('submit', close_dialog);

			function open_dialog() {
				document.startViewTransition(() => {
					dialog.showModal();
				});
			}

			function close_dialog(e) {
				e.preventDefault();
				const form = e.target;
				document.startViewTransition(() => {
					form.submit();
				});
			}
		}
	};
</script>

<button id="demo-modal-open">Open</button>
<dialog id="demo-modal">
	<p>Here to show some nice transitions</p>
	<form method="dialog">
		<button type="submit">OKE</button>
	</form>
</dialog>
```
