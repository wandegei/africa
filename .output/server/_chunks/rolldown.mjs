import { assetUrls, baseBuildConfig, baseBuildPlugins, basename$2, builtinExternals, builtins, compressPublicAssets, createWatcher, excludeSourcemapSources, getChunkName, join$2, libChunksGroup, relative$2, withBuildPlugins, writeBuildInfo } from "./common.mjs";
import { O } from "./c12_rc9_defu_destr.mjs";
import { importRolldown } from "../_import.mjs";
import { t } from "./perfect-debounce.mjs";
import { generateFSTree, scanHandlers } from "./nitro2.mjs";
import { r } from "./compatx.mjs";
// node_modules/nitro/dist/_build/rolldown.mjs
var getRolldownConfig = async (nitro) => {
	const base = await baseBuildConfig(nitro);
	const tsc = nitro.options.typescript.tsConfig?.compilerOptions;
	let config = {
		platform: nitro.options.node ? "node" : "neutral",
		cwd: nitro.options.rootDir,
		input: nitro.options.entry,
		tsconfig: false,
		external: nitro.options.node ? [...base.env.external, ...builtins.filter((id) => !base.env.alias[id] || base.env.alias[id] === id)] : [],
		plugins: await withBuildPlugins(nitro, [
			builtinExternals(base.env, { node: nitro.options.node }),
			...await baseBuildPlugins(nitro, base),
			nitro.options.node && await assetUrls(nitro)
		]),
		resolve: {
			alias: base.aliases,
			extensions: base.extensions,
			conditionNames: nitro.options.exportConditions
		},
		transform: {
			inject: base.env.inject,
			jsx: {
				runtime: tsc?.jsx === "react" ? "classic" : "automatic",
				pragma: tsc?.jsxFactory,
				pragmaFrag: tsc?.jsxFragmentFactory,
				importSource: tsc?.jsxImportSource,
				development: nitro.options.dev
			}
		},
		onwarn(warning, warn) {
			if (!base.ignoreWarningCodes.has(warning.code || "")) warn(warning);
		},
		optimization: { inlineConst: true },
		output: {
			format: "esm",
			entryFileNames: "index.mjs",
			minifyInternalExports: false,
			chunkFileNames: (chunk) => getChunkName(chunk, nitro),
			codeSplitting: { groups: [libChunksGroup(nitro)] },
			dir: nitro.options.output.serverDir,
			inlineDynamicImports: nitro.options.inlineDynamicImports,
			minify: nitro.options.minify ? true : "dce-only",
			sourcemap: nitro.options.sourcemap,
			sourcemapExcludeSources: excludeSourcemapSources(nitro),
			sourcemapIgnoreList(relativePath) {
				return relativePath.includes("node_modules");
			}
		}
	};
	config = O(nitro.options.rolldownConfig, nitro.options.rollupConfig, config);
	const outputConfig = config.output;
	if (outputConfig.inlineDynamicImports || outputConfig.format === "iife") outputConfig.codeSplitting = false;
	delete outputConfig.inlineDynamicImports;
	return config;
};
async function watchDev(nitro, config, rolldown) {
	let watcher;
	async function load() {
		if (watcher) await watcher.close();
		await scanHandlers(nitro);
		nitro.routing.sync();
		watcher = startWatcher(nitro, config);
	}
	const reload = t(load);
	const scanDirs = nitro.options.scanDirs.flatMap((dir) => [
		join$2(dir, nitro.options.apiDir || "api"),
		join$2(dir, nitro.options.routesDir || "routes"),
		join$2(dir, "middleware"),
		join$2(dir, "plugins"),
		join$2(dir, "modules")
	]);
	const watchReloadEvents = /* @__PURE__ */ new Set([
		"add",
		"addDir",
		"unlink",
		"unlinkDir"
	]);
	const scanDirsWatcher = createWatcher(nitro, scanDirs, { ignoreInitial: true }).on("all", (event) => {
		if (watchReloadEvents.has(event)) reload();
	});
	const serverEntryRe = /^server\.[mc]?[jt]sx?$/;
	const rootDirWatcher = createWatcher(nitro, nitro.options.rootDir, {
		ignoreInitial: true,
		depth: 0
	}).on("all", (event, path) => {
		if (watchReloadEvents.has(event) && serverEntryRe.test(basename$2(path))) reload();
	});
	nitro.hooks.hook("close", () => {
		watcher.close();
		scanDirsWatcher.close();
		rootDirWatcher.close();
	});
	nitro.hooks.hook("build:reload", () => reload());
	nitro.logger.info(`Starting dev watcher (builder: \`rolldown\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
	await load();
	function startWatcher(nitro, config) {
		const watcher = rolldown.watch(config);
		let start;
		watcher.on("event", (event) => {
			switch (event.code) {
				case "START":
					start = Date.now();
					nitro.hooks.callHook("dev:start");
					break;
				case "BUNDLE_END":
					nitro.hooks.callHook("compiled", nitro);
					if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built`, start ? `in ${Date.now() - start}ms` : "");
					nitro.hooks.callHook("dev:reload");
					break;
				case "ERROR":
					nitro.logger.error(event.error);
					nitro.hooks.callHook("dev:error", event.error);
			}
		});
		return watcher;
	}
}
async function buildProduction(nitro, config, rolldown) {
	const buildStartTime = Date.now();
	await scanHandlers(nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	let output;
	if (!nitro.options.static) {
		nitro.logger.info(`Building server (builder: \`rolldown\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
		output = await (await rolldown.rolldown(config)).write(config.output);
	}
	await writeBuildInfo(nitro, output);
	if (!nitro.options.static) {
		if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built in ${Date.now() - buildStartTime}ms`);
		if (nitro.options.logLevel > 1) process.stdout.write(await generateFSTree(nitro.options.output.serverDir, { compressedSizes: nitro.options.logging.compressedSizes }) || "");
	}
	await nitro.hooks.callHook("compiled", nitro);
	const rOutput = relative$2(process.cwd(), nitro.options.output.dir);
	const rewriteRelativePaths = (input) => {
		return input.replace(/([\s:])\.\/(\S*)/g, `$1${rOutput}/$2`);
	};
	const previewCommand = nitro.options.framework.previewCommand || "npx nitro preview";
	nitro.logger.success(`You can preview this build using \`${previewCommand}\``);
	if (nitro.options.commands.deploy) {
		const deployCommand = nitro.options.framework.deployCommand || "npx nitro deploy --prebuilt";
		nitro.logger.success(rewriteRelativePaths(`You can deploy this build using \`${deployCommand}\``));
	}
}
async function rolldownBuild(nitro) {
	const rolldown = await importRolldown(nitro.options.rootDir, { deps: nitro.options.deps });
	await nitro.hooks.callHook("build:before", nitro);
	const config = await getRolldownConfig(nitro);
	await nitro.hooks.callHook("build:config", nitro, {
		builder: "rolldown",
		rolldown: config
	});
	return nitro.options.dev ? watchDev(nitro, config, rolldown) : buildProduction(nitro, config, rolldown);
}
export { rolldownBuild };
