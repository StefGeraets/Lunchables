import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { extname, join } from 'node:path';
import { ask, exists, format, isSlug, presentationsDir, slugify } from './cli';

const routesDir = 'src/routes';
const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif'];

const staticRoutes = async () =>
	(await readdir(routesDir, { withFileTypes: true }))
		.filter((entry) => entry.isDirectory() && !/^[[(]/.test(entry.name))
		.map((entry) => entry.name);

const folderProblem = async (id: string) => {
	if (!isSlug(id)) return 'use lowercase letters, numbers and dashes';
	if ((await staticRoutes()).includes(id)) return `/${id} is already a route in ${routesDir}`;
	if (await exists(join(presentationsDir, id))) return `${presentationsDir}/${id} already exists`;
};

const imageProblem = async (path: string) => {
	if (!imageExtensions.includes(extname(path).toLowerCase())) {
		return `use one of ${imageExtensions.join(' ')}`;
	}
	if (!(await exists(path))) return 'file not found';
};

/** Prompts for a new presentation, writes it and returns its folder name. */
export const newPresentation = async () => {
	let title = '';
	while (!title) title = await ask('Presentation title');

	let id = '';
	while (!id) {
		const answer = await ask('Folder / URL', slugify(title));
		const problem = await folderProblem(answer);
		if (problem) console.log(`  ${problem}`);
		else id = answer;
	}

	const description = await ask('Description (optional)');
	const heading = await ask('Cover heading', title);

	let image = '';
	while (true) {
		const answer = (await ask('Cover image path (optional, Enter to skip)'))
			.replace(/^(['"])(.*)\1$/, '$2')
			.replace(/^~(?=\/|$)/, homedir());
		if (!answer) break;
		const problem = await imageProblem(answer);
		if (!problem) {
			image = answer;
			break;
		}
		console.log(`  ${problem}`);
	}

	const dir = join(presentationsDir, id);
	const coverFile = image && `cover${extname(image).toLowerCase()}`;

	const config = `import type { PresentationConfig } from '$lib/types';
${coverFile ? `import cover from './assets/${coverFile}';` : ''}

export default {
	title: ${JSON.stringify(title)},
	description: ${JSON.stringify(description)},
	cover: {
		${coverFile ? `image: cover, alt: ${JSON.stringify(title)},` : ''}
		heading: ${JSON.stringify(heading)}
	}
} satisfies PresentationConfig;
`;

	const slide = `---
title: ${JSON.stringify(title)}
type: 'content'
order: 1
---

- Your first point
- Your second point
`;

	await mkdir(join(dir, 'slides'), { recursive: true });
	const written = [join(dir, 'config.ts'), join(dir, 'slides', '1intro.md')];
	await writeFile(written[0], await format(config, written[0]));
	await writeFile(written[1], await format(slide, written[1]));

	if (coverFile) {
		await mkdir(join(dir, 'assets'));
		written.push(join(dir, 'assets', coverFile));
		await copyFile(image, written[2]);
	}

	console.log(`\nCreated:\n${written.map((path) => `  ${path}`).join('\n')}`);
	console.log(`Open http://localhost:5173/${id} (bun run dev)\n`);

	return id;
};
