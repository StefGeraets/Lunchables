import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Slide } from '../src/lib/types';
import {
	ask,
	choose,
	created,
	exists,
	format,
	info,
	isSlug,
	listPresentations,
	pick,
	presentationsDir,
	slugify
} from './cli';

type SlideType = Slide['type'];
type SlideInfo = { file: string; title: string; subtitle: string; type: SlideType; order: number };
type Move = { slide: SlideInfo; order: number; file: string };

const types: SlideType[] = ['content', 'demo', 'ship', 'split', 'code'];

const typeHints: Record<SlideType, string> = {
	content: 'big title with text or bullet points',
	demo: 'live component in a bordered box, with its code',
	ship: 'browser support and a ship-it verdict',
	split: 'text on the left, a component on the right',
	code: 'title only, the Markdown body is not shown'
};

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
				subtitle: field('subtitle'),
				type: field('type') as SlideType,
				order: Number(field('order'))
			};
		})
	);

	return slides.sort((first, second) => first.order - second.order);
};

/**
 * Slides that have to move up one to free `order`. Shifting stops at the first gap,
 * so a deck with free numbers (say 34 to 49) only renames what it must.
 * A file name that starts with the old order gets the new order as prefix.
 */
const planShift = (slides: SlideInfo[], order: number): Move[] => {
	const moves: Move[] = [];
	let occupied = order;
	for (const slide of slides) {
		if (slide.order < order) continue;
		if (slide.order > occupied) break;
		const prefix = String(slide.order);
		const numbered = slide.file.startsWith(prefix) && !/\d/.test(slide.file[prefix.length]);
		const file = numbered ? `${slide.order + 1}${slide.file.slice(prefix.length)}` : slide.file;
		moves.push({ slide, order: slide.order + 1, file });
		occupied = Math.max(occupied, slide.order + 1);
	}

	// Keep the old name if the new one belongs to a slide that isn't moving.
	const moving = new Set(moves.map((move) => move.slide.file));
	const names = new Set(slides.map((slide) => slide.file));
	return moves.map((move) =>
		move.file !== move.slide.file && names.has(move.file) && !moving.has(move.file)
			? { ...move, file: move.slide.file }
			: move
	);
};

/** Rewrites `order` in the frontmatter and renames the file, highest order first. */
const applyMoves = async (slidesDir: string, moves: Move[]) => {
	for (const move of moves.toReversed()) {
		const from = join(slidesDir, move.slide.file);
		const source = await readFile(from, 'utf8');
		await writeFile(from, source.replace(/^(---\n[\s\S]*?^order:\s*)\d+/m, `$1${move.order}`));
		if (move.file !== move.slide.file) await rename(from, join(slidesDir, move.file));
	}
};

const body = (type: SlideType, deckDir: string) => {
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
			if (exists(join(deckDir, 'components', 'ShipScore.svelte'))) {
				return `<script>
  import ShipScore from '../components/ShipScore.svelte'
</script>

<ShipScore chrome="" firefox="" safari="" checkIt />
`;
			}
			return '<!-- Copy ShipScore.svelte from src/presentations/install-nothing/components to use it here -->\n';
		case 'split':
			return `<script>
  // import Demo from '../components/Demo.svelte'
</script>

<div class="flex gap-8 h-full text-sm">
  <div class="flex-1 flex flex-col gap-4 pt-1">
    <p>Your text</p>
  </div>
  <div class="flex-1 h-full">
    <!-- <Demo /> -->
  </div>
</div>
`;
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
	if (last) info(`Last slide in ${deck}`, `${last.order} · ${last.title}`, last.file);

	// The new slide goes right after the slide before the chosen position.
	const orderBefore = (index: number) => (slides[index - 1]?.order ?? 0) + 1;
	const describe = (slide: SlideInfo) =>
		`${slide.order} · ${slide.title}${slide.subtitle ? ` · ${slide.subtitle}` : ''}`;
	const movesHint = (count: number) =>
		count ? `moves ${count} slide${count === 1 ? '' : 's'} up` : 'fits in a gap, nothing moves';

	const position = await pick(
		'Position',
		[
			{ value: slides.length, label: 'At the end', hint: last && `after ${describe(last)}` },
			...slides.map((slide, index) => ({
				value: index,
				label: `Before ${describe(slide)}`,
				hint: movesHint(planShift(slides, orderBefore(index)).length)
			}))
		],
		slides.length
	);
	const order = orderBefore(position);
	const moves = planShift(slides, order);

	const previous = slides[position - 1];
	const type = await choose('Slide type', types, previous?.type ?? 'content', typeHints);

	const title = await ask('Title', {
		fallback: previous?.title,
		validate: (value) => (value ? undefined : 'A title is required')
	});

	const subtitle = type === 'demo' || type === 'ship' ? await ask('Subtitle (optional)') : '';

	const moved = new Set(moves.map((move) => move.slide.file));
	const finalNames = new Set([
		...slides.filter((slide) => !moved.has(slide.file)).map((slide) => slide.file),
		...moves.map((move) => move.file)
	]);
	const name = await ask('File name', {
		fallback: `${order}${slugify(subtitle || title)}`,
		validate: (value) => {
			if (!isSlug(value)) return 'Use lowercase letters, numbers and dashes';
			if (finalNames.has(`${value}.md`)) return `${value}.md already exists`;
		}
	});

	const source = `---
title: ${JSON.stringify(title)}
${subtitle ? `subtitle: ${JSON.stringify(subtitle)}\n` : ''}type: '${type}'
order: ${order}
---

${body(type, deckDir)}`;

	await applyMoves(slidesDir, moves);
	const path = join(slidesDir, `${name}.md`);
	await writeFile(path, await format(source, path));

	created(
		[path],
		`http://localhost:5173/${deck}/${name}`,
		moves
			.filter((move) => move.file !== move.slide.file || move.order !== move.slide.order)
			.map((move) => [`${move.slide.file} (${move.slide.order})`, `${move.file} (${move.order})`])
	);

	return deck;
};
