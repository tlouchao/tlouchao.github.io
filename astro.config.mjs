import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import lit from '@astrojs/lit';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [icon(), lit(), mdx(), sitemap()],
    image: {
        remotePatterns: [{ protocol: "https" }],
        domains: ["cloudinary"],
    },
});
