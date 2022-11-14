import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	entry: ["modules/core/index.ts", "modules/react/index.ts"],
	dts: {
		compilerOptions: {
			noUnusedLocals: false,
			noUnusedParameters: false,
		},
	},
	format: ["cjs", "esm"],
});
