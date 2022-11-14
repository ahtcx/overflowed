import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

const a = import.meta.glob([
	"../node_modules/.pnpm/**/shiki/languages/*.tmLanguage.json",
	"../node_modules/.pnpm/**/shiki/themes/*.json",
]);

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: Object.keys(a),
	}),
});
