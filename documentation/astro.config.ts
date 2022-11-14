import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: ["node_modules/.pnpm/**/shiki/**/languages/*.json", "node_modules/.pnpm/**/shiki/**/themes/*.json"],
	}),
});
