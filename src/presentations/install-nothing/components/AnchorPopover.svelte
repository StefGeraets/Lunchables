<button id="menu-anchor" class="menu-button" popovertarget="anchored-menu"> *** </button>

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
		border: 1px solid #fff;
		padding: 8px;
		border-radius: 4px;
		align-self: self-start;
		margin-left: 20vw;
		anchor-name: --menu;
	}

	#anchored-menu[popover] {
		transition:
			display 0.3s allow-discrete,
			overlay 0.3s allow-discrete,
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
				text-decoration: unset;
				border-radius: 4px;
			}
		}
	}
</style>
