import type { Theme } from '$lib/themes';
import type { PresentationConfig } from '$lib/types';

export type Presentation = PresentationConfig & { theme?: Theme };

const configs = import.meta.glob<PresentationConfig>('/src/presentations/*/config.ts', {
	eager: true,
	import: 'default'
});

const themeFiles = import.meta.glob<Theme>('/src/presentations/*/theme.ts', {
	eager: true,
	import: 'default'
});

export const presentations: Record<string, Presentation> = Object.fromEntries(
	Object.entries(configs).map(([path, config]) => [
		path.split('/').at(-2)!,
		{ ...config, theme: themeFiles[path.replace(/config\.ts$/, 'theme.ts')] }
	])
);

export const presentationIds = Object.keys(presentations);

/** Every presentation with its id, newest first. */
export const presentationList = Object.entries(presentations)
	.map(([id, config]) => ({ id, ...config }))
	.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
