import type { PresentationConfig } from '$lib/types';

const configs = import.meta.glob<PresentationConfig>('/src/presentations/*/config.ts', {
	eager: true,
	import: 'default'
});

export const presentations: Record<string, PresentationConfig> = Object.fromEntries(
	Object.entries(configs).map(([path, config]) => [path.split('/').at(-2)!, config])
);

export const presentationIds = Object.keys(presentations);

export const defaultPresentation = 'install-nothing';
