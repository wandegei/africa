import { importVite, r$2, viteImportOptions } from "./common.mjs";
import { nitro } from "./vite.mjs";
// node_modules/nitro/dist/_build/vite.build.mjs
async function viteBuild(nitro$1) {
	if (nitro$1.options.dev) throw new Error("Nitro dev CLI does not supports vite. Please use `vite dev` instead.");
	const { createBuilder } = await importVite({
		...viteImportOptions(nitro$1),
		id: nitro$1.options.__vitePkg__
	});
	const pluginInstance = nitro({ _nitro: nitro$1 });
	globalThis.__nitro_build__ = true;
	const builder = await createBuilder({
		root: nitro$1.options.rootDir,
		plugins: [pluginInstance],
		logLevel: r$2 ? "warn" : void 0
	});
	delete globalThis.__nitro_build__;
	await builder.buildApp();
}
export { viteBuild };
