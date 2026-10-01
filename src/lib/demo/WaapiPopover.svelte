<script lang="ts">
	let button: HTMLButtonElement;
	let popover: HTMLDivElement;

	$effect(() => {
		const updatePosition = () => {
			const target = button.getBoundingClientRect();
			popover.style.inset = 'unset';
			popover.style.top = target.bottom + 'px';
			popover.style.left = target.right - target.width + 'px';
		};

		const resizeObserver = new ResizeObserver(updatePosition);
		resizeObserver.observe(popover);
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition);
		};
	});

	const toggle = () => {
		const isOpening = !popover.matches(':popover-open');
		const translate = isOpening ? ['0 10px', '0 0'] : ['0 0', '0 10px'];
		const opacity = isOpening ? [0, 1] : [1, 0];

		if (isOpening) popover.showPopover();

		requestAnimationFrame(() => {
			const animation = popover.animate(
				{ translate, opacity },
				{ duration: 300, easing: 'ease-in-out', fill: 'forwards' }
			);
			animation.onfinish = () => {
				if (!isOpening) popover.hidePopover();
			};
		});
	};

	// In Manual mode, you need to trigger keyboard events yourself
	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && popover.matches(':popover-open')) {
			toggle();
		}
	};
</script>

<svelte:window {onkeydown} />

<button class="menu-button" bind:this={button} onclick={toggle}>***</button>
<!-- Note: Manual Mode Required -->
<div popover="manual" class="menu" bind:this={popover}>
	<ul class="menu-demo">
		<li><a href="#">Settings</a></li>
		<li><a href="#">My Profile</a></li>
		<li><a href="#">Help</a></li>
		<li><a href="#">Logout</a></li>
	</ul>
</div>

<style>
	button {
		border: 1px solid #fff;
		padding: 8px;
		border-radius: 4px;
		align-self: self-start;
		margin-left: 20vw;
	}

	.menu {
		padding: 20px;
		border-radius: 16px;
		box-shadow:
			rgba(0, 0, 0, 0.25) 0px 54px 55px,
			rgba(0, 0, 0, 0.12) 0px -12px 30px,
			rgba(0, 0, 0, 0.12) 0px 4px 6px,
			rgba(0, 0, 0, 0.17) 0px 12px 13px,
			rgba(0, 0, 0, 0.09) 0px -3px 5px;

		& ul {
			display: flex;
			flex-direction: column;

			& li {
				display: block;
				padding: 10px 40px 10px 20px;
				color: var(--bg);
				text-decoration: unset;
				border-radius: 4px;
				font-size: var(--fs-xs);
			}
		}
	}
</style>
