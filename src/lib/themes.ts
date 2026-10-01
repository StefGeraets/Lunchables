/** Tailwind color names ('pink-500', 'white') or any CSS color ('#ff3366', 'oklch(...)'). */
export type ThemeColors = {
	surface: string;
	ink: string;
	accent: string;
	onAccent: string;
	highlight: string;
};

export const themes = {
	midnight: {
		surface: 'gray-950',
		ink: 'gray-100',
		accent: 'yellow-400',
		onAccent: 'gray-950',
		highlight: 'teal-300'
	},
	paper: {
		surface: 'stone-50',
		ink: 'stone-900',
		accent: 'red-600',
		onAccent: 'white',
		highlight: 'amber-400'
	},
	ocean: {
		surface: 'slate-950',
		ink: 'slate-100',
		accent: 'sky-400',
		onAccent: 'slate-950',
		highlight: 'pink-400'
	}
} satisfies Record<string, ThemeColors>;

export type ThemeName = keyof typeof themes;

/** What a presentation's theme.ts exports: a preset name or its own colors. */
export type Theme = ThemeName | ThemeColors;

const variables: Record<keyof ThemeColors, string> = {
	surface: '--color-surface',
	ink: '--color-ink',
	accent: '--color-accent',
	onAccent: '--color-on-accent',
	highlight: '--color-highlight'
};

const cssColor = (value: string) =>
	/^([a-z]+-\d{2,3}|white|black)$/.test(value) ? `var(--color-${value})` : value;

/** Inline style that applies a theme to an element and everything inside it. */
export const themeStyle = (theme: Theme = 'midnight') => {
	const colors = typeof theme === 'string' ? themes[theme] : theme;
	return Object.entries(variables)
		.map(([key, variable]) => `${variable}: ${cssColor(colors[key as keyof ThemeColors])}`)
		.join('; ');
};
