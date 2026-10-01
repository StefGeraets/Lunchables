<button popovertarget="menu-demo-popover">Menu</button>
<div popover id="menu-demo-popover" class="menu">
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
	}

	#menu-demo-popover {
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
