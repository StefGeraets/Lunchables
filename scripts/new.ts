import { banner, choose, confirm, done } from './cli';
import { newPresentation } from './new-presentation';
import { newSlide } from './new-slide';
import { newTheme } from './new-theme';

const commands = ['deck', 'slide', 'theme'] as const;
type Command = (typeof commands)[number];

const [command, deck] = process.argv.slice(2);
const given = commands.includes(command as Command) ? (command as Command) : undefined;

banner(given ? `new ${given}` : 'new');

const what = given ?? (await choose('What do you want to create?', [...commands]));

if (what === 'theme') {
	await newTheme(deck);
} else {
	let current = what === 'deck' ? await newPresentation() : await newSlide(deck);
	while (await confirm('Add another slide?')) current = await newSlide(current);
}

done();
