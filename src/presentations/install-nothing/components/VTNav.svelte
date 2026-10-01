<script lang="ts">
	let popover: HTMLElement;

	const toggle = (event: Event) => {
		const isOpening = !popover.matches(':popover-open');
		event.preventDefault();
		document.startViewTransition(() => {
			if (isOpening) return popover.showPopover();
			return popover.hidePopover();
		});
	};

	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && popover.matches(':popover-open')) {
			toggle(event);
		}
	};
</script>

<svelte:window {onkeydown} />

<button popovertarget="demo-mobile-nav-vt" onclick={toggle}>NAV</button>

<nav popover id="demo-mobile-nav-vt" bind:this={popover}>
	<button class="demo-button" popovertarget="demo-mobile-nav-vt" popovertargetaction="hide">
		X
	</button>
	<ul>
		<li><a href="#">Home</a></li>
		<li><a href="#">About</a></li>
		<li><a href="#">Store</a></li>
		<li><a href="#">Contact</a></li>
	</ul>
</nav>

<style>
	#demo-mobile-nav-vt[popover] {
		margin: 0;
		block-size: 100vb;
		inline-size: 40vw;
		inset-inline-start: unset;
		inset-inline-end: 0;
		view-transition-name: slide-nav;
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
	}

	@keyframes slide-toggle {
		from {
			translate: 100vi;
		}
	}

	:global(::view-transition-old(slide-nav)) {
		animation: 300ms ease-in reverse forwards slide-toggle;
	}

	:global(::view-transition-new(slide-nav)) {
		animation: 300ms ease-out forwards slide-toggle;
	}

	button {
		border: 1px solid #fff;
		padding: 8px;
		border-radius: 4px;
	}
</style>
