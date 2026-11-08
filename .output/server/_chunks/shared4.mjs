import { MagicString$1, OPTIONAL_RUNTIME_DEPS_RE, RESOLVED_PREFIX, RESOLVED_RE, baseBuildConfig, chain, dirname$2, ensureRuntimeDep, importAttributes, importOXC, isAbsolute$2, isRuntimeImporter, join$2, missingRuntimeDepError, normalize$2, pkgDir, raw, replace$1, resolve$2, resolveBuildPlugins, resolveDep, resolveModulePath, routeMeta, tsconfigPaths, unwasm, virtualTemplates } from "./common.mjs";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
// node_modules/nitro/dist/_build/shared4.mjs
var NITRO_VIRTUAL_PREFIX = "#nitro/virtual/";
async function prepareUnbundledApp(nitro) {
	const { env, extensions } = await baseBuildConfig(nitro);
	const rendered = await Promise.all(virtualTemplates(nitro, [...env.polyfills]).map(async (t) => [t.id, typeof t.template === "function" ? await t.template() : t.template]));
	nitro.vfs = new Map(rendered.map(([id, code]) => [id, { render: () => code }]));
	const virtual = Object.fromEntries(rendered.map(([id, code]) => [id.startsWith("#nitro/virtual/") ? nitroVirtualPath(id) : id, code]));
	const entry = resolve$2(nitro.options.output.serverDir, "index.mjs");
	const appEntry = pathToFileURL(resolveModulePath(nitro.options.entry, {
		from: nitro.options.rootDir,
		extensions
	})).href;
	virtual[entry] = `
globalThis.__nitro_main__ = import.meta.url;
export * from ${JSON.stringify(appEntry)};
export { default } from ${JSON.stringify(appEntry)};
`.trimStart();
	return {
		entry,
		virtual,
		appEntry
	};
}
function nitroVirtualPath(id) {
	const dir = join$2(pkgDir, "dist/runtime/virtual/");
	return id ? join$2(dir, `${id.slice(15)}.mjs`) : dir;
}
var SCRIPT_TYPES = [
	"js",
	"jsx",
	"ts",
	"tsx"
];
var SUPPORTED_HOOKS = /* @__PURE__ */ new Set([
	"resolveId",
	"load",
	"transform"
]);
async function unbundledPlugins(nitro, opts = {}) {
	const base = await baseBuildConfig(nitro);
	const sourceDirs = [
		pkgDir,
		nitro.options.rootDir,
		...nitro.options.scanDirs
	].map((dir) => `${escapeGlob(normalize$2(dir).replace(/\/$/, ""))}/**`);
	const plugins = [
		virtualPlugin(),
		runtimeDepsPlugin(nitro, opts.sync),
		resolvePlugin(nitro, base.extensions),
		windowsPathPlugin(base.extensions),
		await transformPlugin(nitro, sourceDirs),
		replacePlugin(base.replacements, sourceDirs),
		withoutSourceMap(fromRollup(await importAttributes(nitro))),
		rawVirtualPlugin(nitro),
		fromRollup(raw())
	];
	if (Object.keys(base.aliases).length > 0) plugins.push(await aliasPlugin(nitro, base.aliases, sourceDirs));
	const tsconfigPathsPlugin = tsconfigPaths(nitro, base.aliases);
	if (tsconfigPathsPlugin) plugins.push(fromRollup(tsconfigPathsPlugin));
	if (nitro.options.experimental.openAPI) plugins.push(fromRollup(await routeMeta(nitro)));
	if (nitro.options.wasm !== false) plugins.push(fromRollup(unwasm(nitro.options.wasm || {})));
	for (const plugin of await resolveBuildPlugins(nitro)) {
		warnUnsupportedHooks(nitro, plugin);
		plugins.push(fromRollup(plugin));
	}
	return plugins;
}
function virtualPlugin() {
	return {
		name: "nitro:virtual",
		resolveId: {
			filter: { id: new RegExp(`^${NITRO_VIRTUAL_PREFIX}`) },
			handler: (source) => nitroVirtualPath(source)
		}
	};
}
function resolvePlugin(nitro, extensions) {
	const virtualDir = nitroVirtualPath("");
	return {
		name: "nitro:resolve",
		resolveId: {
			fallback: true,
			filter: { id: /^(?!#nitro\/)/ },
			handler(source, importer) {
				if (/^(?:\.{1,2}\/|\/|[a-zA-Z]:[\\/]|file:)/.test(source)) {
					const [specifier, query] = splitQuery(source);
					const path = specifier.startsWith("file:") ? fileURLToPath(specifier) : specifier;
					return resolveFile(isAbsolute$2(path) ? path : resolve$2(importer ? dirname$2(splitQuery(importer)[0]) : nitro.options.rootDir, path), query, extensions);
				}
				if (importer && normalize$2(importer).startsWith(virtualDir)) return this.resolve(source, join$2(nitro.options.rootDir, "_"));
			}
		}
	};
}
function runtimeDepsPlugin(nitro, sync) {
	return {
		name: "nitro:runtime-deps",
		resolveId: {
			fallback: true,
			filter: { id: OPTIONAL_RUNTIME_DEPS_RE },
			handler(source, importer) {
				if (!isRuntimeImporter(importer && normalize$2(importer))) return;
				const resolve = () => this.resolve(source, join$2(nitro.options.rootDir, "_"));
				if (resolveDep(source, {
					dir: nitro.options.rootDir,
					deps: nitro.options.deps
				})) return resolve();
				if (sync) throw missingRuntimeDepError(nitro, source);
				return ensureRuntimeDep(nitro, source).then(resolve);
			}
		}
	};
}
function windowsPathPlugin(extensions) {
	return {
		name: "nitro:windows-path",
		resolveId: {
			filter: { id: /^[a-zA-Z]:[\\/]/ },
			handler(source) {
				const [path, query] = splitQuery(source);
				return resolveFile(normalize$2(path), query, extensions);
			}
		}
	};
}
async function transformPlugin(nitro, sourceDirs) {
	const { transformSync } = await importOXC({
		dir: nitro.options.rootDir,
		paths: nitro.options.deps?.paths
	});
	const tsc = nitro.options.typescript.tsConfig?.compilerOptions;
	return {
		name: "nitro:transform",
		transform: {
			filter: {
				id: sourceDirs,
				moduleType: [
					"ts",
					"tsx",
					"jsx"
				]
			},
			handler(code, id, { moduleType }) {
				const result = transformSync(id.split("?")[0], code, {
					lang: moduleType,
					sourcemap: true,
					jsx: {
						runtime: tsc?.jsx === "react" ? "classic" : "automatic",
						pragma: tsc?.jsxFactory,
						pragmaFrag: tsc?.jsxFragmentFactory,
						importSource: tsc?.jsxImportSource,
						development: nitro.options.dev
					}
				});
				if (result.errors.length > 0) this.error(result.errors.map((error) => error.message).join("\n"));
				return {
					code: result.code,
					map: result.map,
					moduleType: "js"
				};
			}
		}
	};
}
function rawVirtualPlugin(nitro) {
	const prefixRe = /^(raw|bytes|text):/;
	return {
		name: "nitro:raw-virtual",
		resolveId: {
			order: "pre",
			filter: { id: [
				/^raw:/,
				/^bytes:/,
				/^text:/
			] },
			handler(source) {
				const [, type] = prefixRe.exec(source) || [];
				const id = source.slice(`${type}:`.length);
				if (type && nitro.vfs.has(id)) return `${RESOLVED_PREFIX}${type}:${id}.js`;
			}
		},
		load: {
			order: "pre",
			filter: { id: RESOLVED_RE },
			handler(id) {
				const [, type] = RESOLVED_RE.exec(id) || [];
				const vfsId = id.replace(RESOLVED_RE, "").slice(0, -3);
				const mod = nitro.vfs.get(vfsId);
				if (!mod) return;
				return chain(mod.render(), (code) => type === "bytes" ? Buffer.from(code, "utf8").toString("binary") : code);
			}
		}
	};
}
function replacePlugin(values, sourceDirs) {
	const plugin = replace$1({
		preventAssignment: true,
		sourceMap: false,
		values
	});
	const keys = Object.keys(values).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	return {
		name: "nitro:replace",
		transform: {
			order: "post",
			filter: {
				id: {
					include: sourceDirs,
					exclude: RESOLVED_RE
				},
				moduleType: [...SCRIPT_TYPES],
				code: new RegExp(keys.join("|"))
			},
			handler: plugin.transform
		}
	};
}
async function aliasPlugin(nitro, _aliases, sourceDirs) {
	const { rootDir } = nitro.options;
	const aliases = Object.fromEntries(Object.entries(_aliases).map(([key, target]) => [key, /^\.{1,2}\//.test(target) ? resolve$2(rootDir, target) : target]));
	const keys = Object.keys(aliases).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	const resolveAlias = (source) => {
		for (const [key, target] of Object.entries(aliases)) if (source === key || source.startsWith(key.endsWith("/") ? key : `${key}/`)) return target + source.slice(key.length);
	};
	const plugin = {
		name: "nitro:alias",
		resolveId: {
			filter: { id: new RegExp(`^(?:${keys.join("|")})`) },
			handler(source, importer) {
				const aliased = resolveAlias(source);
				if (aliased) return chain(this.resolve(aliased, importer), (resolved) => resolved ?? {
					id: aliased,
					external: true
				});
			}
		}
	};
	const runner = nitro.options.devServer?.runner || process.env.NITRO_DEV_RUNNER;
	if (!process.versions.bun && runner !== "bun-process") return plugin;
	const { parseSync } = await importOXC({
		dir: rootDir,
		paths: nitro.options.deps?.paths
	});
	plugin.transform = {
		filter: {
			id: sourceDirs,
			code: new RegExp(`["'\`](?:${keys.join("|")})`)
		},
		handler(code, id) {
			const { module, errors } = parseSync(id.split("?")[0], code);
			if (errors.length > 0) return;
			const requests = new Map([
				...module.staticImports.map((i) => i.moduleRequest),
				...module.staticExports.flatMap((e) => e.entries.map((entry) => entry.moduleRequest)),
				...module.dynamicImports.map((i) => i.moduleRequest)
			].flatMap((request) => request ? [[request.start, request]] : []));
			const s = new MagicString$1(code);
			for (const request of requests.values()) {
				const literal = code.slice(request.start, request.end);
				const aliased = /^(?:"[^"]*"|'[^']*'|`[^`$]*`)$/.test(literal) && resolveAlias(literal.slice(1, -1));
				if (aliased) s.overwrite(request.start, request.end, JSON.stringify(aliased));
			}
			return s.hasChanged() ? { code: s.toString() } : void 0;
		}
	};
	return plugin;
}
function withoutSourceMap(plugin) {
	const transform = plugin.transform;
	return {
		...plugin,
		transform: {
			...transform,
			handler(...args) {
				return chain(transform.handler.apply(this, args), (result) => result && typeof result === "object" ? {
					...result,
					map: void 0
				} : result);
			}
		}
	};
}
function fromRollup(plugin) {
	return plugin;
}
function resolveFile(base, query, extensions) {
	for (const candidate of [
		base,
		...extensions.map((ext) => base + ext),
		...extensions.map((ext) => join$2(base, `index${ext}`))
	]) if (existsSync(candidate) && statSync(candidate).isFile()) return candidate + query;
}
function splitQuery(id) {
	const index = id.indexOf("?");
	return index === -1 ? [id, ""] : [id.slice(0, index), id.slice(index)];
}
function escapeGlob(path) {
	return path.replace(/[*?[\]{}!\\]/g, "\\$&");
}
function warnUnsupportedHooks(nitro, plugin) {
	const hooks = Object.keys(plugin).filter((key) => {
		const value = plugin[key];
		return key !== "apply" && !SUPPORTED_HOOKS.has(key) && (typeof value === "function" || typeof value?.handler === "function");
	});
	if (hooks.length > 0) nitro.logger.warn(`Build plugin \`${plugin.name}\` uses hooks not supported with \`builder: false\`, they are ignored: ${hooks.map((hook) => `\`${hook}\``).join(", ")}.`);
}
export { prepareUnbundledApp, unbundledPlugins };
