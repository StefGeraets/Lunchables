import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['html', 'css', 'javascript', 'go']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: fileURLToPath(new URL('./src/routes/mdsvex.svelte', import.meta.url))
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const loaded = highlighter.getLoadedLanguages().includes(lang);
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { lang: loaded ? lang : 'text', theme: 'github-dark' })
			);
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
