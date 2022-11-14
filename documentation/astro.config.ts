import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

console.log(import.meta.glob("../**/**/shiki/**/**/*.json"));

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: ["../**/**/shiki/**/**/*.json"],
	}),
});
