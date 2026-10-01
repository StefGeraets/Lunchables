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
	:global(:root) {
		interpolate-size: allow-keywords;
	}

	details {
		transition: height 0.3s ease;
		height: 2rem;
		overflow-y: clip;

		&[open] {
			height: calc-size(max-content, size);
		}
	}

	details {
		align-self: flex-start;
		margin-left: 20vw;
		font-size: 24px;
		cursor: pointer;

		& p {
			padding: 8px 0;
		}
	}
</style>
