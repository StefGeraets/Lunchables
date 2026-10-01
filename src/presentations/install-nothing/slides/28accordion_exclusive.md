---
title: Accordions
subtitle: Exclusive Accordion
type: 'demo'
order: 28
---

<script>
  import ExclusiveAccordion from '../components/ExclusiveAccordion.svelte'
</script>

<ExclusiveAccordion />

```html
<details name="faq">
	<summary>Q: Will only one of these stay open at a time?</summary>
	<p>You betcha</p>
</details>
<details name="faq">
	<summary>Q: Why doesn't starting-style and allow-discrete work here?</summary>
	<p>Dunno, it probably should tbh.</p>
</details>
<details name="faq">
	<summary>Q: Why is there a third question?</summary>
	<p>Just here so I don't get fired.</p>
</details>
```
