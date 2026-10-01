import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { themes, type ThemeName } from '../src/lib/themes';
import {
	choose,
	confirm,
	created,
	exists,
	format,
	listPresentations,
	presentationsDir
} from './cli';

type ThemeChoice = ThemeName | 'custom';

const choices = [...Object.keys(themes), 'custom'] as ThemeChoice[];

const hints = Object.fromEntries([
	...Object.entries(themes).map(([name, { surface, accent }]) => [name, `${surface} / ${accent}`]),
	['custom', 'all colors in theme.ts, to edit yourself']
]) as Record<ThemeChoice, string>;

export const chooseTheme = () => choose('Theme', choices, 'midnight', hints);

const source = (choice: ThemeChoice) => `import type { Theme } from '$lib/themes';

${
	choice === 'custom'
		? `// Tailwind color names ('pink-500', 'white') or any CSS color ('#ff3366', 'oklch(...)').
export default ${JSON.stringify(themes.midnight)} satisfies Theme;`
		: `export default ${JSON.stringify(choice)} satisfies Theme;`
}
`;

/** Writes theme.ts into a presentation folder and returns its path. */
export const writeTheme = async (dir: string, choice: ThemeChoice) => {
	const path = join(dir, 'theme.ts');
	await writeFile(path, await format(source(choice), path));
	return path;
};

/** Prompts for a theme for an existing presentation and returns its folder name. */
export const newTheme = async (deck?: string) => {
	const presentations = await listPresentations();
	if (!deck || !presentations.includes(deck)) {
		deck =
			presentations.length === 1 ? presentations[0] : await choose('Presentation', presentations);
	}

	const dir = join(presentationsDir, deck);
	const choice = await chooseTheme();
	if (exists(join(dir, 'theme.ts')) && !(await confirm(`Replace ${dir}/theme.ts?`))) return deck;

	created([await writeTheme(dir, choice)], `http://localhost:5173/${deck}`);

	return deck;
};
