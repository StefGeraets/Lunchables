import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import * as clack from '@clack/prompts';
import chalk from 'chalk';
import * as prettier from 'prettier';

export const presentationsDir = 'src/presentations';

const accent = chalk.yellow;
const muted = chalk.dim;

export const banner = (command: string) => {
	console.log(
		[
			'',
			muted('   ╭─────────╮'),
			`${muted('   │  ')}${accent('▶')}${muted(' ───  │')}   ${chalk.bold('lunchables')}`,
			`${muted('   │    ──   │')}   ${muted(command)}`,
			muted('   ╰────┬────╯'),
			muted('       ─┴─'),
			''
		].join('\n')
	);
	clack.intro(muted('Arrow keys to choose, Enter to accept, Ctrl+C to stop'));
};

export const done = () => clack.outro(muted('Done'));

const orAbort = <T>(value: T | symbol): Exclude<T, symbol> => {
	if (clack.isCancel(value)) {
		clack.cancel('Aborted.');
		process.exit(1);
	}
	return value as Exclude<T, symbol>;
};

export const info = (label: string, value: string, detail = '') =>
	clack.log.message(`${muted(label)}  ${value}${detail ? `  ${muted(detail)}` : ''}`, {
		symbol: muted('●')
	});

/** Lists the written files and the URL to open them. */
export const created = (paths: string[], url: string) => {
	const files = paths.map((path) => {
		const slash = path.lastIndexOf('/') + 1;
		return `${muted(path.slice(0, slash))}${path.slice(slash)}`;
	});
	clack.log.success(
		[
			accent('Created'),
			...files,
			`${muted('→')} ${accent.underline(url)}  ${muted('bun run dev')}`
		].join('\n')
	);
};

type AskOptions = { fallback?: string; validate?: (value: string) => string | undefined };

/** Text prompt. Enter on an empty field accepts the fallback. */
export const ask = async (question: string, { fallback = '', validate }: AskOptions = {}) => {
	const value = await clack.text({
		message: question,
		placeholder: fallback || undefined,
		defaultValue: fallback,
		validate: validate && ((value) => validate((value ?? '').trim() || fallback))
	});
	return orAbort(value).trim() || fallback;
};

export const choose = async <T extends string>(
	question: string,
	options: T[],
	fallback = options[0],
	hints: Partial<Record<T, string>> = {}
) =>
	orAbort(
		await clack.select<T>({
			message: question,
			options: options.map((value) => ({ value, hint: hints[value] }) as clack.Option<T>),
			initialValue: fallback
		})
	);

export const confirm = async (question: string) =>
	orAbort(await clack.confirm({ message: question, initialValue: false }));

export const slugify = (text: string) =>
	text
		.normalize('NFKD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const isSlug = (text: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(text);

export const exists = (path: string) => existsSync(path);

export const listPresentations = async () =>
	(await readdir(presentationsDir, { withFileTypes: true }))
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

export const format = async (source: string, filepath: string) =>
	prettier.format(source, { ...(await prettier.resolveConfig(filepath)), filepath });
