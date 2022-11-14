import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

const shikiResourcePaths = Object.keys(
	import.meta.glob([
		// "../node_modules/.pnpm/shiki@*/node_modules/shiki/languages/*.tmLanguage.json",
		// "../node_modules/.pnpm/shiki@*/node_modules/shiki/themes/*.json",
		"./node_modules/shiki/languages/*.tmLanguage.json",
		"./node_modules/shiki/themes/*.json",
	]),
);

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: shikiResourcePaths,
	}),
});
