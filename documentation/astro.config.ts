import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
	integrations: [mdx(), react(), svelte()],
	output: "static",
	adapter: vercel(),
});
