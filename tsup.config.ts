import { copyFile } from "node:fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	entry: ["modules/index.ts", "modules/core/index.ts", "modules/react/index.ts", "modules/svelte/index.ts"],
	dts: {
		compilerOptions: {
			noUnusedLocals: false,
			noUnusedParameters: false,
		},
	},
	format: ["cjs", "esm"],
	onSuccess: async () => {
		await Promise.allSettled([
			copyFile("./package.json", "./dist/package.json"),
			copyFile("./README.md", "./dist/README.md"),
		]);
	},
});
