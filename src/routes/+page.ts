import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { defaultPresentation } from '$lib/presentations';

export const load = () => {
	redirect(307, resolve('/[deck]', { deck: defaultPresentation }));
};
