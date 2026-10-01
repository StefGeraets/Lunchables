import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Slide } from '../src/lib/types';
import {
	ask,
	choose,
	exists,
	format,
	isSlug,
	listPresentations,
	presentationsDir,
	slugify
} from './cli';

type SlideType = Slide['type'];
type SlideInfo = { file: string; title: string; type: SlideType; order: number };

const types: SlideType[] = ['content', 'demo', 'ship', 'code'];

const readSlides = async (slidesDir: string): Promise<SlideInfo[]> => {
	const files = (await readdir(slidesDir)).filter((file) => file.endsWith('.md'));

	const slides = await Promise.all(
		files.map(async (file) => {
			const frontmatter =
				(await readFile(join(slidesDir, file), 'utf8')).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
			const field = (key: string) =>
				frontmatter
					.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]
					.trim()
					.replace(/^(['"])(.*)\1$/, '$2') ?? '';
			return {
				file,
				title: field('title'),
				type: field('type') as SlideType,
				order: Number(field('order'))
			};
		})
	);

	return slides.sort((first, second) => first.order - second.order);
};

const body = async (type: SlideType, deckDir: string) => {
	switch (type) {
		case 'content':
			return '- Your first point\n- Your second point\n';
		case 'demo':
			return `<script>
  // import Demo from '../components/Demo.svelte'
</script>

<!-- <Demo /> -->

\`\`\`html
<!-- the code you want to show -->
\`\`\`
`;
		case 'ship':
			if (await exists(join(deckDir, 'components', 'ShipScore.svelte'))) {
				return `<script>
  import ShipScore from '../components/ShipScore.svelte'
</script>

<ShipScore chrome="" firefox="" safari="" checkIt />
`;
			}
			return '<!-- Copy ShipScore.svelte from src/presentations/install-nothing/components to use it here -->\n';
		case 'code':
			return '';
	}
};

/** Prompts for a slide, appends it to a presentation and returns the presentation's folder name. */
export const newSlide = async (deck?: string) => {
	const presentations = await listPresentations();
	if (!deck || !presentations.includes(deck)) {
		deck =
			presentations.length === 1 ? presentations[0] : await choose('Presentation', presentations);
	}

	const deckDir = join(presentationsDir, deck);
	const slidesDir = join(deckDir, 'slides');
	const slides = await readSlides(slidesDir);
	const last = slides.at(-1);
	if (last) console.log(`Last slide in ${deck}: ${last.order}. ${last.title} (${last.file})`);

	let order = 0;
	while (!order) {
		const answer = Number(await ask('Order', String((last?.order ?? 0) + 1)));
		const taken = slides.find((slide) => slide.order === answer);
		if (!Number.isInteger(answer) || answer < 1) console.log('  use a whole number above 0');
		else if (taken) console.log(`  ${answer} is already used by ${taken.file}`);
		else order = answer;
	}

	const previous = slides.findLast((slide) => slide.order < order);
	const type = await choose('Slide type', types, previous?.type ?? 'content');

	let title = '';
	while (!title) title = await ask('Title', previous?.title);

	const subtitle = type === 'demo' || type === 'ship' ? await ask('Subtitle (optional)') : '';

	let name = '';
	while (!name) {
		const answer = await ask('File name', `${order}${slugify(subtitle || title)}`);
		if (!isSlug(answer)) console.log('  use lowercase letters, numbers and dashes');
		else if (await exists(join(slidesDir, `${answer}.md`)))
			console.log(`  ${answer}.md already exists`);
		else name = answer;
	}

	const source = `---
title: ${JSON.stringify(title)}
${subtitle ? `subtitle: ${JSON.stringify(subtitle)}\n` : ''}type: '${type}'
order: ${order}
---

${await body(type, deckDir)}`;

	const path = join(slidesDir, `${name}.md`);
	await writeFile(path, await format(source, path));

	console.log(`\nCreated ${path}`);
	console.log(`Open http://localhost:5173/${deck}/${name} (bun run dev)\n`);

	return deck;
};
