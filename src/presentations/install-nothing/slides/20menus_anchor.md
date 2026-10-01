---
title: Menus x Popovers
subtitle: CSS w/ Anchor
type: 'demo'
order: 20
---

<script>
  import AnchorPopover from '../components/AnchorPopover.svelte'
</script>

<AnchorPopover />

```html
<button id="menu-anchor" class="menu-button" popovertarget="anchored-menu">***</button>

<div popover id="anchored-menu" class="menu">
	<ul class="menu-demo">
		<li><a href="#">Settings</a></li>
		<li><a href="#">My Profile</a></li>
		<li><a href="#">Help</a></li>
		<li><a href="#">Logout</a></li>
	</ul>
</div>

<style>
	#menu-anchor {
		anchor-name: --menu;
	}

	#anchored-menu[popover] {
		transition:
			display 0.3s allow-discrete,
			opacity 0.3s,
			translate 0.3s;
		transition-timing-function: ease-in;
		opacity: 0;
		translate: 0 30px;
		position: absolute;
		inset: unset;
		top: anchor(--menu bottom);
		left: anchor(--menu left);
	}

	#anchored-menu[popover]:popover-open {
		opacity: 1;
		translate: 0 0;
		transition-timing-function: ease-out;
	}

	@starting-style {
		#anchored-menu[popover]:popover-open {
			opacity: 0;
			translate: 0 30px;
		}
	}
</style>
```
