---
title: Modals x Alerts x Dialogs
subtitle: CSS Modal
type: 'demo'
order: 11
---

<script>
  import CSSModal from '../components/CSSModal.svelte'
</script>

<CSSModal />

```html
<script>
	window.onload = function () {
		if (typeof window !== 'undefined') {
			const trigger = document.querySelector('#demo-modal-open');
			const dialog = document.querySelector('#demo-modal');
			trigger?.addEventListener('click', () => {
				dialog?.showModal();
			});
		}
	};
</script>

<button id="demo-modal-open">Open</button>
<dialog id="demo-modal">
	<p>Oh hey there! I did't see you there. I am looking to trick or treat</p>
	<form method="dialog">
		<button type="submit">BOOO</button>
	</form>
</dialog>

<style>
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
```
