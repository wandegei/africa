import { r } from "./compatx.mjs";
import { createWatcher, normalize$2, withTrailingSlash } from "./common.mjs";
import { t } from "./perfect-debounce.mjs";
import { scanHandlers } from "./nitro2.mjs";
import { prepareUnbundledApp, unbundledPlugins } from "./shared4.mjs";
// node_modules/nitro/dist/_build/shared5.mjs
var ignoredRe = /(?:^|\/)(?:node_modules|\.[^/]+)(?:\/|$)/;
var sourceRe = /\.(?:[cm]?[jt]sx?|json|wasm|txt|html|md|ya?ml|toml|sql)$/;
async function watchDev(nitro) {
	nitro.logger.info(`Starting dev server without a builder (preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
	const plugins = await unbundledPlugins(nitro);
	async function load() {
		await nitro.hooks.callHook("dev:start");
		try {
			await scanHandlers(nitro);
			nitro.routing.sync();
			const { entry, virtual } = await prepareUnbundledApp(nitro);
			await nitro.hooks.callHook("compiled", nitro);
			await nitro.hooks.callHook("dev:reload", {
				entry,
				workerData: { virtual },
				plugins
			});
		} catch (error) {
			nitro.logger.error(error);
			await nitro.hooks.callHook("dev:error", error);
		}
	}
	const reload = t(load);
	const { rootDir, scanDirs, buildDir, output, publicAssets, watchOptions } = nitro.options;
	const watchDirs = [...new Set([rootDir, ...scanDirs].map((dir) => withTrailingSlash(dir)))];
	const ignoredDirs = [
		buildDir,
		output.dir,
		...publicAssets.map((asset) => asset.dir)
	].map((dir) => withTrailingSlash(dir));
	const watcher = createWatcher(nitro, watchDirs, {
		ignoreInitial: true,
		...watchOptions,
		ignored: [(path) => {
			path = normalize$2(path);
			const watchDir = watchDirs.find((dir) => path.startsWith(dir));
			return watchDir !== void 0 && ignoredRe.test(path.slice(watchDir.length)) || ignoredDirs.some((dir) => path.startsWith(dir));
		}, ...[watchOptions?.ignored ?? []].flat()]
	}).on("all", (event, path) => {
		if (event === "addDir" || event === "unlinkDir" || sourceRe.test(path)) reload();
	});
	nitro.hooks.hook("close", () => watcher.close());
	nitro.hooks.hook("build:reload", () => reload());
	await load();
}
async function unbundledBuild(nitro) {
	assertUnbundledSupport(nitro);
	await nitro.hooks.callHook("build:before", nitro);
	return watchDev(nitro);
}
function assertUnbundledSupport(nitro) {
	if (!nitro.options.dev) throw new Error("Production builds are not supported with `builder: false` yet. Set `builder` to `rolldown`, `rollup` or `vite` to build.");
}
export { assertUnbundledSupport, unbundledBuild };
