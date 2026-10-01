import { error } from '@sveltejs/kit';
import { presentations } from '$lib/presentations';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const presentation = presentations[params.deck];
	if (!presentation) error(404, `Could not find presentation ${params.deck}`);

	return { deck: params.deck, presentation };
};
