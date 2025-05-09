import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
	site: "https://landingpad.cosmicthemes.com/",
	adapter: netlify({
		imageCDN: false,
	}),
	redirects: {
		"/admin": "/keystatic",
	},
	integrations: [
		react(),
		keystatic(),
		sitemap(),
		compress({
			HTML: true,
			JavaScript: true,
			CSS: false,
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
	],

	vite: {
		plugins: [tailwindcss()],
		// stop inlining short scripts to fix potential issues with ClientRouter
		build: {
			assetsInlineLimit: 0,
		},
	},
});
