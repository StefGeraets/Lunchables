// Mermaid's color parser can't read var() or oklch(), so let the canvas resolve the color to hex.
const toHex = (color: string) => {
	const ctx = document.createElement('canvas').getContext('2d');
	if (!ctx) return color;
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
	return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
};

/** Renders every ```mermaid block inside root, using the deck theme's colors. */
export const renderDiagrams = async (root: HTMLElement) => {
	const nodes = [...root.querySelectorAll<HTMLElement>('.mermaid:not([data-processed])')];
	if (nodes.length === 0) return;

	const { default: mermaid } = await import('mermaid');

	const style = getComputedStyle(root);
	const token = (name: string) => toHex(style.getPropertyValue(`--color-${name}`));
	const surface = token('surface');
	const ink = token('ink');
	const accent = token('accent');
	const onAccent = token('on-accent');
	const highlight = token('highlight');

	mermaid.initialize({
		startOnLoad: false,
		theme: 'base',
		fontFamily: style.getPropertyValue('--font-sans'),
		themeVariables: {
			background: surface,
			fontSize: '22px',
			textColor: ink,
			lineColor: ink,
			primaryColor: surface,
			primaryTextColor: ink,
			primaryBorderColor: accent,
			actorBkg: surface,
			actorBorder: accent,
			actorTextColor: ink,
			actorLineColor: ink,
			signalColor: ink,
			signalTextColor: ink,
			labelBoxBkgColor: surface,
			labelTextColor: ink,
			sequenceNumberColor: onAccent,
			noteBkgColor: highlight,
			noteTextColor: surface,
			noteBorderColor: highlight
		},
		sequence: {
			useMaxWidth: true,
			actorFontSize: 22,
			messageFontSize: 22,
			noteFontSize: 22,
			mirrorActors: false
		}
	});

	await mermaid.run({ nodes });
};
