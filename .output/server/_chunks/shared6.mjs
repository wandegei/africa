import { scanHandlers } from "./nitro2.mjs";
import { prepareUnbundledApp, unbundledPlugins } from "./shared4.mjs";
import { g } from "../_libs/env-runner3.mjs";
// node_modules/nitro/dist/_build/shared6.mjs
async function startUnbundledPrerenderer(nitro) {
	await nitro.hooks.callHook("build:before", nitro);
	await scanHandlers(nitro);
	nitro.routing.sync();
	const { entry, virtual } = await prepareUnbundledApp(nitro);
	await nitro.hooks.callHook("compiled", nitro);
	return new g({
		runner: "node-worker",
		name: "nitro-prerender",
		entry,
		data: { virtual },
		plugins: await unbundledPlugins(nitro)
	}).start();
}
export { startUnbundledPrerenderer };
