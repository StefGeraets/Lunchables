import { readdir, stat } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import * as prettier from 'prettier';

export const presentationsDir = 'src/presentations';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const lines = rl[Symbol.asyncIterator]();

export const close = () => rl.close();

export const ask = async (question: string, fallback = '') => {
	rl.setPrompt(fallback ? `${question} [${fallback}]: ` : `${question}: `);
	rl.prompt();
	const { value, done } = await lines.next();
	if (done) {
		console.log('\nAborted.');
		process.exit(1);
	}
	return value.trim() || fallback;
};

/** Numbered list; accepts the number or the option itself. */
export const choose = async <T extends string>(
	question: string,
	options: T[],
	fallback = options[0]
) => {
	console.log(`${question}:`);
	options.forEach((option, index) => console.log(`  ${index + 1}) ${option}`));
	while (true) {
		const answer = await ask('Choose', String(options.indexOf(fallback) + 1));
		const picked = options[Number(answer) - 1] ?? options.find((option) => option === answer);
		if (picked) return picked;
		console.log(`  pick 1-${options.length}`);
	}
};

export const confirm = async (question: string) => /^y(es)?$/i.test(await ask(`${question} (y/N)`));

export const slugify = (text: string) =>
	text
		.normalize('NFKD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const isSlug = (text: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(text);

export const exists = (path: string) =>
	stat(path).then(
		() => true,
		() => false
	);

export const listPresentations = async () =>
	(await readdir(presentationsDir, { withFileTypes: true }))
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

export const format = async (source: string, filepath: string) =>
	prettier.format(source, { ...(await prettier.resolveConfig(filepath)), filepath });
