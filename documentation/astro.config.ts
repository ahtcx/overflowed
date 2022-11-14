import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

const a = import.meta.glob(
	[
		"../node_modules/.pnpm/**/shiki/languages/(tsx).tmLanguage.json",
		"../node_modules/.pnpm/**/shiki/themes/(github-dark).json",
	],
	{ eager: true },
);

console.log(Object.entries(a));

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: Object.values(a),
	}),
});
