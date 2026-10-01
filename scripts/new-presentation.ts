import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { extname, join } from 'node:path';
import { ask, created, exists, format, isSlug, presentationsDir, slugify } from './cli';
import { chooseTheme, writeTheme } from './new-theme';

const routesDir = 'src/routes';
const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif'];

const staticRoutes = readdirSync(routesDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !/^[[(]/.test(entry.name))
	.map((entry) => entry.name);

const folderProblem = (id: string) => {
	if (!isSlug(id)) return 'Use lowercase letters, numbers and dashes';
	if (staticRoutes.includes(id)) return `/${id} is already a route in ${routesDir}`;
	if (exists(join(presentationsDir, id))) return `${presentationsDir}/${id} already exists`;
};

/** Accepts typed, pasted or dragged paths: strips quotes and expands ~. */
const cleanPath = (path: string) =>
	path.replace(/^(['"])(.*)\1$/, '$2').replace(/^~(?=\/|$)/, homedir());

const imageProblem = (input: string) => {
	if (!input) return;
	const path = cleanPath(input);
	if (!imageExtensions.includes(extname(path).toLowerCase())) {
		return `Use one of ${imageExtensions.join(' ')}`;
	}
	if (!exists(path)) return 'File not found';
};

const gitUserName = () => {
	try {
		return execFileSync('git', ['config', 'user.name'], { encoding: 'utf8' }).trim();
	} catch {
		return '';
	}
};

/** Prompts for a new presentation, writes it and returns its folder name. */
export const newPresentation = async () => {
	const title = await ask('Presentation title', {
		validate: (value) => (value ? undefined : 'A title is required')
	});
	const id = await ask('Folder / URL', { fallback: slugify(title), validate: folderProblem });
	const description = await ask('Description (optional)');
	const author = await ask('Author (optional, shown on the home page)', {
		fallback: gitUserName()
	});
	const heading = await ask('Cover heading', { fallback: title });
	const image = cleanPath(
		await ask('Cover image path (optional, type, paste or drag a file)', {
			validate: imageProblem
		})
	);

	const theme = await chooseTheme();

	const dir = join(presentationsDir, id);
	const coverFile = image && `cover${extname(image).toLowerCase()}`;

	const config = `import type { PresentationConfig } from '$lib/types';
${coverFile ? `import cover from './assets/${coverFile}';` : ''}

export default {
	title: ${JSON.stringify(title)},
	description: ${JSON.stringify(description)},
	date: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
	${author ? `author: ${JSON.stringify(author)},` : ''}
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
	written.push(await writeTheme(dir, theme));

	if (coverFile) {
		await mkdir(join(dir, 'assets'));
		written.push(join(dir, 'assets', coverFile));
		await copyFile(image, written.at(-1)!);
	}

	created(written, `http://localhost:5173/${id}`);

	return id;
};
