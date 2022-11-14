import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel({
		includeFiles: ["/var/task/node_modules/.pnpm/shiki@0.11.1/node_modules/shiki/themes/github-dark.json"],
	}),
});
