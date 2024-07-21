import { defineConfig } from 'astro/config';
import lit from '@astrojs/lit';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [lit(), mdx(), sitemap()],
	redirects: {
		'/gallery': '/',
		'/gallery/photography': '/photography',
	}
});
