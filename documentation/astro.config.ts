import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
	integrations: [mdx(), react()],
	output: "server",
	adapter: vercel(),

	markdown: {
		syntaxHighlight: "prism",
	},
});
