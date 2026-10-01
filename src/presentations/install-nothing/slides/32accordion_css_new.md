---
title: Accordions
subtitle: Auto height
type: 'demo'
order: 32
---

<script>
  import CSSNewAccordion from '../components/CSSNewAccordion.svelte'
</script>

<CSSNewAccordion />

```html
<details name="faq">
	<summary>Q: Will only one of these stay open at a time?</summary>
	<p>You betcha</p>
</details>
<details name="faq">
	<summary>Q: Why doesn't starting-style and allow-discrete work here?</summary>
	<p>
		Dunno, it probably should tbh. Some long content to show how to animate dynamically to
		essentially auto height Dunno, it probably should tbh. Some long content to show how to animate
		dynamically to essentially auto height Dunno, it probably should tbh. Some long content to show
		how to animate dynamically to essentially auto height
	</p>
</details>
<details name="faq">
	<summary>Q: Why is there a third question?</summary>
	<p>Just here so I don't get fired.</p>
</details>

<style>
	:root {
		interpolate-size: allow-keywords;
	}

	details {
		transition: height 0.3s ease;
		height: 2rem;
		overflow-y: clip;

		&[open] {
			height: calc-size(fit-content, size);
		}
	}
</style>
```
