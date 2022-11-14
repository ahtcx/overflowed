import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

const a = import.meta.glob("../node_modules/**/shiki/**/*.json", { exhaustive: true });

console.log(Object.values(a).length);

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: ["../**/**/shiki/**/**/*.json"],
	}),
});
