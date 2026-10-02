import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [
		tailwindcss(),
		imagetools({
			defaultDirectives: new URLSearchParams({ format: 'webp', quality: '80', w: '1920' })
		}),
		sveltekit()
	]
});
