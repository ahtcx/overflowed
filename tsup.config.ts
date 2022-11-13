import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["modules/core/index.ts", "modules/react/index.ts"],
	dts: true,
});
