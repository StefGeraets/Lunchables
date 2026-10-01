import { presentationIds } from '$lib/presentations';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => presentationIds.map((deck) => ({ deck }));
