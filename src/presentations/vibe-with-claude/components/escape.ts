/** Escapes text for use inside {@html}. */
export const esc = (str: string): string =>
	str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
