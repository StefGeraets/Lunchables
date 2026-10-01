import { banner, choose, confirm, done } from './cli';
import { newPresentation } from './new-presentation';
import { newSlide } from './new-slide';

const [command, deck] = process.argv.slice(2);

banner(command === 'deck' || command === 'slide' ? `new ${command}` : 'new');

const what =
	command === 'deck' || command === 'slide'
		? command
		: await choose('What do you want to create?', ['deck', 'slide']);

let current = what === 'deck' ? await newPresentation() : await newSlide(deck);
while (await confirm('Add another slide?')) current = await newSlide(current);

done();
