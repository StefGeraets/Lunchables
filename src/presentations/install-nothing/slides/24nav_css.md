---
title: Mobile Nav x Drawer
subtitle: CSS only Mobile Nav
type: 'demo'
order: 24
---

<script>
  import CSSNav from '../components/CSSNav.svelte'
</script>

<CSSNav />

```html
<button popovertarget="demo-mobile-nav">NAV</button>

<nav popover id="demo-mobile-nav">
	<button class="demo-button" popovertarget="demo-mobile-nav" popovertargetaction="hide">
		Close Nav
	</button>
	<ul>
		<li><a href="#">Home</a></li>
		<li><a href="#">About</a></li>
		<li><a href="#">Store</a></li>
		<li><a href="#">Contact</a></li>
	</ul>
</nav>

<style>
	#demo-mobile-nav[popover] {
		transition:
			display 0.3s allow-discrete,
			overlay 0.5s allow-discrete,
			opacity 0.3s,
			translate 0.3s;
		transition-timing-function: ease-in;
		translate: 100%;
		margin: 0;
		block-size: 100vb;
		inline-size: 40vw;
		inset-inline-start: unset;
		inset-inline-end: 0;

		&:popover-open {
			translate: 0;
			transition-timing-function: ease-out;
		}

		@starting-style {
			&:popover-open {
				translate: 100%;
			}
		}
	}
</style>
```
