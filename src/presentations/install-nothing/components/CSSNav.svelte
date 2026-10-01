<button popovertarget="demo-mobile-nav">NAV</button>

<nav popover id="demo-mobile-nav">
	<button class="demo-button" popovertarget="demo-mobile-nav" popovertargetaction="hide">
		x
	</button>
	<ul>
		<li><a href="#">Home</a></li>
		<li><a href="#">About</a></li>
		<li><a href="#">Store</a></li>
		<li><a href="#">Contact</a></li>
	</ul>
</nav>

<style>
	button {
		border: 1px solid #fff;
		padding: 8px;
		border-radius: 4px;
	}

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
		inline-size: 40vi;
		inset-inline-start: unset;
		inset-inline-end: 0;
		background: rgba(0, 0, 0);
		color: #fff;
		padding: 20px;

		& button {
			position: absolute;
			right: 20px;
			top: 20px;
			width: 40px;
			aspect-ratio: 1;
		}

		& ul {
			display: flex;
			flex-direction: column;

			& li {
				display: block;
				padding: 10px 40px 10px 20px;
				text-decoration: unset;
				border-radius: 4px;
				text-transform: uppercase;
				font-size: 24px;
			}
		}

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
