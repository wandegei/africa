import { O } from "./c12_rc9_defu_destr.mjs";
import { a } from "./plugin-alias.mjs";
import { l } from "./plugin-inject.mjs";
import { MagicString$1, assetUrls, baseBuildConfig, baseBuildPlugins, basename$2, builtinExternals, compressPublicAssets, createWatcher, dirname$2, extname$3, importOXC, isAbsolute$2, join$2, relative$2, resolve$2, resolveModulePath, withBuildPlugins, writeBuildInfo } from "./common.mjs";
import { assertBunRuntime } from "../_runtime2.mjs";
import { t } from "./perfect-debounce.mjs";
import { r } from "./compatx.mjs";
import { generateFSTree, scanHandlers } from "./nitro2.mjs";
import { isBuiltin } from "node:module";
import { existsSync, readFileSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
// node_modules/nitro/dist/_build/shared2.mjs
var HOOK_NAMES = [
	"buildStart",
	"resolveId",
	"load",
	"transform",
	"buildEnd",
	"renderChunk",
	"resolveFileUrl",
	"generateBundle",
	"writeBundle"
];
var JS_RE = /\.[cm]?[jt]sx?$/;
var LOADERS = /* @__PURE__ */ new Set([
	"js",
	"jsx",
	"ts",
	"tsx",
	"json",
	"text",
	"css",
	"toml"
]);
var EXT_LOADERS = {
	json: "json",
	css: "css",
	toml: "toml",
	txt: "text"
};
function getHooks(plugins, name) {
	const rank = (order) => order === "pre" ? 0 : order === "post" ? 2 : 1;
	return plugins.flatMap((plugin) => {
		const hook = plugin[name];
		const handler = typeof hook === "function" ? hook : hook?.handler;
		if (typeof handler !== "function") return [];
		const filter = hook.filter && !Array.isArray(hook.filter) ? hook.filter : void 0;
		return [{
			plugin,
			handler,
			id: filter?.id && compileFilter(filter.id, matchGlob),
			code: filter?.code && compileFilter(filter.code, (pattern, code) => code.includes(pattern)),
			order: rank(hook.order)
		}];
	}).sort((a, b) => a.order - b.order);
}
function isFile(id) {
	return isAbsolute$2(id) && !/[\0?]/.test(id) && !!statSync(id, { throwIfNoEntry: false })?.isFile();
}
function cleanId(id) {
	return id.split("?")[0];
}
function parseFilename(id) {
	const path = id && cleanId(id);
	return path && JS_RE.test(path) ? path : "module.js";
}
function resolveLoader(id, opts) {
	if (opts.moduleType && LOADERS.has(opts.moduleType)) return opts.moduleType;
	const ext = /\.[cm]?(tsx?|jsx)$/.exec(cleanId(id))?.[1];
	if (ext) return ext;
	return opts.fallback;
}
function extensionLoader(id) {
	if (JS_RE.test(cleanId(id))) return resolveLoader(id, { fallback: "js" });
	return EXT_LOADERS[/\.(\w+)$/.exec(cleanId(id))?.[1] || ""] || "file";
}
function compileFilter(filter, matchString) {
	const { include, exclude } = typeof filter === "string" || filter instanceof RegExp || Array.isArray(filter) ? { include: filter } : filter;
	const compile = (patterns) => {
		const tests = (patterns === void 0 ? [] : [patterns].flat()).map((pattern) => typeof pattern === "string" ? (value) => matchString(pattern, value) : (value) => {
			pattern.lastIndex = 0;
			return pattern.test(value);
		});
		return tests.length > 0 ? tests : void 0;
	};
	const includes = compile(include);
	const excludes = compile(exclude);
	return (value) => !excludes?.some((test) => test(value)) && (!includes || includes.some((test) => test(value)));
}
var globs = /* @__PURE__ */ new Map();
function matchGlob(pattern, id) {
	let glob = globs.get(pattern);
	if (!glob) {
		const { Glob } = globalThis.Bun;
		glob = new Glob(pattern.startsWith("**") || isAbsolute$2(pattern) ? pattern : join$2(process.cwd(), pattern));
		globs.set(pattern, glob);
	}
	return glob.match(id);
}
function pluginContext(container, opts) {
	const { plugin, skip } = opts;
	return {
		meta: {
			rollupVersion: "4.23.0",
			bunVersion: globalThis.Bun?.version,
			watchMode: opts.watchMode
		},
		resolve: async (id, importer, resolveOpts = {}) => {
			const nextSkip = resolveOpts.skipSelf === false ? skip : /* @__PURE__ */ new Set([...skip || [], plugin]);
			return await container.resolveId(id, importer, {
				...resolveOpts,
				skip: nextSkip
			}) || container.defaultResolve(id, importer, resolveOpts) || null;
		},
		load: async ({ id }) => ({
			id,
			code: await container.load(id).then((result) => typeof result?.contents === "string" ? result.contents : null)
		}),
		parse: (code) => opts.oxc.parseSync(parseFilename(opts.id), code).program,
		addWatchFile: (file) => {
			container.watchFiles.add(file);
		},
		getWatchFiles: () => [...container.watchFiles],
		getModuleIds: () => container.moduleIds.values(),
		getModuleInfo: () => null,
		emitFile: (file) => {
			if (file.type !== "asset" || file.source === void 0) throw new Error(`[${plugin.name}] Only assets with a \`source\` can be emitted with Bun.`);
			const ext = extname$3(file.name || "");
			const fileName = file.fileName || `_assets/${basename$2(file.name || "asset", ext)}-${hash(file.source)}${ext}`;
			const referenceId = hash(fileName);
			const emitted = {
				fileName,
				source: file.source
			};
			container.emittedFiles.set(referenceId, emitted);
			container.onEmitFile?.(emitted);
			return referenceId;
		},
		error: (error) => {
			throw typeof error === "string" ? /* @__PURE__ */ new Error(`[${plugin.name}] ${error}`) : error;
		},
		warn: (warning) => {
			opts.onWarn(`[${plugin.name}] ${typeof warning === "string" ? warning : warning.message}`);
		},
		info: () => {},
		debug: () => {}
	};
}
function hash(input) {
	return createHash("sha256").update(input).digest("hex").slice(0, 8);
}
var STAR_EXPORT_RE = /export\s*\*\s*from\s*["'](?!\.\.?\/)/;
var IDENTIFIER_RE = /^[$A-Z_a-z][\w$]*$/;
async function rewriteExternalStarExports(code, opts) {
	if (!STAR_EXPORT_RE.test(code)) return;
	const { program, errors } = opts.oxc.parseSync(opts.filename, code);
	if (errors.length > 0) return;
	const stars = program.body.filter((node) => node.type === "ExportAllDeclaration" && !node.exported && node.exportKind !== "type" && !/^\.\.?\//.test(node.source.value));
	if (stars.length === 0) return;
	const externals = await Promise.all(stars.map((node) => opts.resolveExternal(node.source.value)));
	const exported = new Set(localExportNames(program));
	const s = new MagicString$1(code);
	for (const [index, node] of stars.entries()) {
		const external = externals[index];
		if (!external) continue;
		const specifier = node.source.value;
		let names = opts.names.get(external);
		if (!names) {
			names = readExportNames(external);
			opts.names.set(external, names);
		}
		const result = await names.catch((error) => {
			opts.names.delete(external);
			throw new Error(`Could not read the exports of \`${specifier}\`, re-exported with \`export *\` by \`${opts.id}\`. Bun does not support \`export *\` from external modules (https://github.com/oven-sh/bun/issues/15997): re-export its names explicitly or use another builder.`, { cause: error });
		});
		const reexports = result.names.filter((name) => name !== "default" && !exported.has(name));
		for (const name of reexports) exported.add(name);
		s.overwrite(node.start, node.end, renderReexports(specifier, reexports, {
			...result,
			index
		}));
	}
	return s.hasChanged() ? s.toString() : void 0;
}
async function readExportNames(external) {
	const mod = await (isAbsolute$2(external) ? import(pathToFileURL(external).href) : import(external));
	return {
		names: Object.keys(mod).filter((name) => name !== "module.exports"),
		cjs: isAbsolute$2(external) && isCommonJS(external)
	};
}
function renderReexports(specifier, names, opts) {
	const source = JSON.stringify(specifier);
	if (names.length === 0) return `import ${source};`;
	const exportName = (name) => IDENTIFIER_RE.test(name) ? name : JSON.stringify(name);
	if (!opts.cjs) return `export { ${names.map((name) => exportName(name)).join(", ")} } from ${source};`;
	const ns = `__nitro_cjs_${opts.index}`;
	const locals = names.map((name, i) => [name, `${ns}_${i}`]);
	return [
		`import ${ns} from ${source};`,
		`const { ${locals.map(([name, local]) => `${JSON.stringify(name)}: ${local}`).join(", ")} } = ${ns};`,
		`export { ${locals.map(([name, local]) => `${local} as ${exportName(name)}`).join(", ")} };`
	].join(" ");
}
function isCommonJS(path) {
	if (/\.c[jt]s$/.test(path)) return true;
	if (!/\.[jt]s$/.test(path)) return false;
	for (let dir = dirname$2(path);; dir = dirname$2(dir)) {
		const pkg = join$2(dir, "package.json");
		if (existsSync(pkg)) return JSON.parse(readFileSync(pkg, "utf8")).type !== "module";
		if (dirname$2(dir) === dir) return false;
	}
}
function localExportNames(program) {
	const names = [];
	for (const node of program.body) if (node.type === "ExportDefaultDeclaration") names.push("default");
	else if (node.type === "ExportAllDeclaration" && node.exported) names.push(moduleExportName(node.exported));
	else if (node.type === "ExportNamedDeclaration" && node.exportKind !== "type") {
		for (const specifier of node.specifiers) if (specifier.exportKind !== "type") names.push(moduleExportName(specifier.exported));
		const declaration = node.declaration;
		if (!declaration || "declare" in declaration && declaration.declare) continue;
		if (declaration.type === "VariableDeclaration") {
			for (const declarator of declaration.declarations) if (declarator.id.type === "Identifier") names.push(declarator.id.name);
		} else if (declaration.type !== "TSInterfaceDeclaration" && declaration.type !== "TSTypeAliasDeclaration" && "id" in declaration && declaration.id?.type === "Identifier") names.push(declaration.id.name);
	}
	return names;
}
function moduleExportName(node) {
	return node.type === "Identifier" ? node.name : String(node.value);
}
var VIRTUAL_NAMESPACE = "nitro";
var SCRIPT_LOADERS = /* @__PURE__ */ new Set([
	"js",
	"jsx",
	"ts",
	"tsx"
]);
var PluginContainer = class {
	moduleIds = /* @__PURE__ */ new Set();
	watchFiles = /* @__PURE__ */ new Set();
	emittedFiles = /* @__PURE__ */ new Map();
	onEmitFile;
	virtualPaths = /* @__PURE__ */ new Map();
	#opts;
	#hooks;
	#conditions;
	#oxc;
	#exportNames = /* @__PURE__ */ new Map();
	constructor(plugins, opts) {
		this.#opts = opts;
		this.#hooks = Object.fromEntries(HOOK_NAMES.map((name) => [name, getHooks(plugins, name)]));
		this.#conditions = {
			import: [...opts.conditions, "import"],
			require: [...opts.conditions, "require"]
		};
	}
	async buildStart() {
		this.moduleIds.clear();
		this.watchFiles.clear();
		this.emittedFiles.clear();
		this.#oxc ??= await importOXC({
			dir: this.#opts.rootDir,
			paths: this.#opts.depPaths
		});
		await Promise.all(this.#hooks.buildStart.map((hook) => this.#call(hook, [{}])));
	}
	async buildEnd(error) {
		await Promise.all(this.#hooks.buildEnd.map((hook) => this.#call(hook, [error])));
	}
	async renderChunk(code, args) {
		for (const hook of this.#hooks.renderChunk) {
			const result = await this.#call(hook, [code, ...args]);
			if (result != null) code = typeof result === "string" ? result : result.code;
		}
		return code;
	}
	async callBundleHook(name, args) {
		for (const hook of this.#hooks[name]) await this.#call(hook, args);
	}
	async resolveFileUrl(args) {
		for (const hook of this.#hooks.resolveFileUrl) {
			const result = await this.#call(hook, [args]);
			if (result != null) return result;
		}
	}
	moduleId(input) {
		if (input.startsWith(`nitro:`)) {
			const path = input.slice(6);
			return this.virtualPaths.get(path) || path;
		}
		return isAbsolute$2(input) || /^[a-z]{2,}:/.test(input) ? input : resolve$2(input);
	}
	async resolveId(id, importer, opts = {}) {
		for (const hook of this.#hooks.resolveId) {
			if (opts.skip?.has(hook.plugin) || hook.id && !hook.id(id)) continue;
			const result = await this.#call(hook, [
				id,
				importer,
				{
					attributes: {},
					custom: opts.custom,
					isEntry: !!opts.isEntry,
					kind: opts.kind
				}
			], { skip: opts.skip });
			if (result == null) continue;
			if (result === false) return {
				id,
				external: true
			};
			return typeof result === "string" ? {
				id: result,
				external: false
			} : {
				...result,
				external: !!result.external
			};
		}
	}
	defaultResolve(id, importer, opts = {}) {
		if (isBuiltin(id)) return {
			id: id.includes(":") ? id : `node:${id}`,
			external: true
		};
		const path = importer && cleanId(importer);
		const resolved = resolveModulePath(id, {
			from: path && isAbsolute$2(path) && !path.includes("\0") ? path : join$2(this.#opts.rootDir, "_"),
			conditions: this.#conditions[opts.kind === "require-call" ? "require" : "import"],
			extensions: this.#opts.extensions,
			suffixes: ["", "/index"],
			try: true
		});
		return resolved ? {
			id: resolved,
			external: false
		} : void 0;
	}
	async load(id, opts = {}) {
		this.moduleIds.add(id);
		const isJS = JS_RE.test(cleanId(id));
		let code;
		let moduleType;
		for (const hook of this.#hooks.load) {
			if (hook.id && !hook.id(id)) continue;
			const result = await this.#call(hook, [id], { id });
			if (result != null) {
				code = typeof result === "string" ? result : result.code;
				moduleType = result.moduleType;
				break;
			}
		}
		const loaded = code !== void 0;
		const transforms = isJS || loaded ? this.#hooks.transform : this.#hooks.transform.filter((hook) => hook.id?.(id));
		if (!loaded) {
			const path = cleanId(id);
			if (!(transforms.length > 0 || opts.read) || !isFile(path)) return;
			const loader = opts.loader || extensionLoader(id);
			if (transforms.length === 0 && !SCRIPT_LOADERS.has(loader)) return {
				contents: await readFile(path),
				loader
			};
			code = await readFile(path, "utf8");
		}
		let transformed = false;
		for (const hook of transforms) {
			if (hook.id && !hook.id(id) || hook.code && !hook.code(code)) continue;
			const result = await this.#call(hook, [
				code,
				id,
				{ moduleType: moduleType || resolveLoader(id, { fallback: "js" }) }
			], { id });
			if (result == null) continue;
			transformed = true;
			code = typeof result === "string" ? result : result.code ?? code;
			moduleType = result.moduleType || moduleType;
		}
		const loader = resolveLoader(id, {
			moduleType,
			fallback: loaded || transformed ? "js" : opts.loader || extensionLoader(id)
		});
		if (SCRIPT_LOADERS.has(loader)) code = await rewriteExternalStarExports(code, {
			id,
			filename: `module.${loader}`,
			oxc: this.#oxc,
			names: this.#exportNames,
			resolveExternal: (specifier) => this.#resolveExternal(specifier, id)
		}) || code;
		return {
			contents: code,
			loader
		};
	}
	async #resolveExternal(specifier, importer) {
		const resolved = await this.resolveId(specifier, importer);
		if (resolved && !resolved.external) return;
		const path = this.defaultResolve(specifier, importer);
		if (path?.external) return path.id;
		if (resolved?.external || this.#opts.isExternal(specifier)) return path?.id || resolved?.id || specifier;
	}
	#call(hook, args, opts = {}) {
		const context = pluginContext(this, {
			plugin: hook.plugin,
			skip: opts.skip,
			id: opts.id,
			oxc: this.#oxc,
			watchMode: this.#opts.watchMode,
			onWarn: this.#opts.onWarn
		});
		return hook.handler.call(context, ...args);
	}
};
function bunPlugin(container) {
	const { virtualPaths } = container;
	return {
		name: "nitro:plugins",
		setup: (build) => {
			build.onResolve({ filter: /.*/ }, async (args) => {
				const isEntry = args.kind === "entry-point-build";
				const isVirtualImporter = virtualPaths.has(args.importer);
				const importer = isEntry ? void 0 : virtualPaths.get(args.importer) || args.importer;
				const resolveOpts = {
					kind: args.kind,
					isEntry
				};
				const resolved = await container.resolveId(args.path, importer || void 0, resolveOpts) || (isVirtualImporter ? container.defaultResolve(args.path, importer, resolveOpts) : void 0) || resolveQuery(container, args.path, importer, resolveOpts);
				if (!resolved) return;
				if (resolved.external) return {
					path: resolved.id,
					external: true
				};
				if (!resolved.id.includes("..") && isFile(resolved.id)) return { path: resolved.id };
				const path = resolved.id.replaceAll("\0", "\\0");
				virtualPaths.set(path, resolved.id);
				return {
					path,
					namespace: VIRTUAL_NAMESPACE
				};
			});
			build.onLoad({
				filter: /.*/,
				namespace: VIRTUAL_NAMESPACE
			}, async (args) => {
				const id = virtualPaths.get(args.path) || args.path;
				const result = await container.load(id, { read: true });
				if (!result) throw new Error(`Could not load virtual module \`${id}\`.`);
				return result;
			});
			build.onLoad({ filter: /.*/ }, (args) => container.load(args.path, { loader: args.loader }));
		}
	};
}
function resolveQuery(container, id, importer, opts) {
	const index = id.indexOf("?");
	if (index === -1) return;
	const resolved = container.defaultResolve(cleanId(id), importer, opts);
	return resolved && !resolved.external ? {
		...resolved,
		id: resolved.id + id.slice(index)
	} : void 0;
}
async function fromRollupConfig(nitro) {
	const configs = [nitro.options.rolldownConfig, nitro.options.rollupConfig];
	const output = (key) => configs.map((config) => config?.output?.[key]).find((value) => value !== void 0);
	const format = output("format");
	const inlineDynamicImports = output("inlineDynamicImports") ?? nitro.options.inlineDynamicImports;
	const entryFileNames = output("entryFileNames");
	const chunkFileNames = output("chunkFileNames");
	const config = {
		format: format === "iife" ? "iife" : format === "cjs" || format === "commonjs" ? "cjs" : "esm",
		splitting: !inlineDynamicImports && format !== "iife"
	};
	if (nitro.options.rolldownConfig?.platform === "node") config.target = "node";
	if (typeof entryFileNames === "string" || typeof chunkFileNames === "string") config.naming = {
		entry: typeof entryFileNames === "string" ? entryFileNames : void 0,
		chunk: typeof chunkFileNames === "string" ? chunkFileNames : void 0
	};
	for (const key of ["banner", "footer"]) {
		const value = output(key);
		if (typeof value === "string") config[key] = value;
	}
	const plugins = await Promise.all(configs.map((config) => flatPlugins(config?.plugins)));
	const [rolldownExternal, rollupExternal] = configs.map((config) => config?.external);
	const external = externalPlugin(Array.isArray(rolldownExternal) && Array.isArray(rollupExternal) ? [...rolldownExternal, ...rollupExternal] : rolldownExternal ?? rollupExternal);
	return {
		config,
		plugins: [...external ? [external] : [], ...plugins.flat()]
	};
}
async function flatPlugins(plugins) {
	plugins = await plugins;
	if (Array.isArray(plugins)) return (await Promise.all(plugins.map((plugin) => flatPlugins(plugin)))).flat();
	return plugins && typeof plugins === "object" ? [plugins] : [];
}
function externalPlugin(external) {
	if (!external) return;
	const isExternal = typeof external === "function" ? (id, importer) => !!external(id, importer, false) : (id) => [external].flat().some((pattern) => {
		if (pattern instanceof RegExp) {
			pattern.lastIndex = 0;
			return pattern.test(id);
		}
		return pattern === id;
	});
	return {
		name: "nitro:external",
		resolveId: {
			order: "pre",
			handler: (id, importer) => isExternal(id, importer) ? {
				id,
				external: true
			} : void 0
		}
	};
}
async function getBunConfig(nitro) {
	const base = await baseBuildConfig(nitro);
	const tsc = nitro.options.typescript.tsConfig?.compilerOptions;
	const rollupConfig = await fromRollupConfig(nitro);
	const config = O(nitro.options.bunConfig, rollupConfig.config, {
		root: nitro.options.rootDir,
		target: nitro.options.preset === "bun" ? "bun" : nitro.options.node ? "node" : "browser",
		external: nitro.options.node ? [...base.env.external] : [],
		conditions: nitro.options.exportConditions,
		naming: {
			entry: "index.mjs",
			chunk: "_chunks/[name]-[hash].mjs",
			asset: "_assets/[name]-[hash].[ext]"
		},
		minify: !!nitro.options.minify,
		sourcemap: nitro.options.sourcemap ? "linked" : "none",
		jsx: {
			runtime: tsc?.jsx === "react" ? "classic" : "automatic",
			factory: tsc?.jsxFactory,
			fragment: tsc?.jsxFragmentFactory,
			importSource: tsc?.jsxImportSource,
			development: nitro.options.dev
		},
		env: "disable",
		define: { "process.env.NODE_ENV": "process.env.NODE_ENV" },
		metafile: true
	});
	config.entrypoints = nitro.options.bunConfig?.entrypoints ?? [nitro.options.entry];
	const container = new PluginContainer((await withBuildPlugins(nitro, [
		...rollupConfig.plugins,
		builtinExternals(base.env, { node: nitro.options.node }),
		...await baseBuildPlugins(nitro, base),
		a({ entries: base.aliases }),
		injectPlugin(base.env.inject),
		nitro.options.node && await assetUrls(nitro)
	])).filter(Boolean), {
		rootDir: nitro.options.rootDir,
		depPaths: nitro.options.deps?.paths,
		conditions: nitro.options.exportConditions,
		extensions: base.extensions,
		isExternal: externalMatcher(config),
		watchMode: nitro.options.dev,
		onWarn: (message) => nitro.logger.warn(message)
	});
	config.plugins = [...config.plugins || [], bunPlugin(container)];
	return {
		config,
		container
	};
}
function injectPlugin(modules) {
	const keys = Object.keys(modules);
	if (keys.length === 0) return;
	const plugin = l({
		modules,
		sourceMap: false
	});
	const escape = (key) => key.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
	const code = new RegExp(`(?<![\\w$])(?:${keys.map((key) => escape(key)).join("|")})(?![\\w$])`);
	return {
		...plugin,
		transform: {
			filter: { code },
			handler: plugin.transform
		}
	};
}
function externalMatcher(config) {
	let patterns;
	return (id) => {
		patterns ??= (config.external || []).map((pattern) => new RegExp(`^${pattern.replace(/[$()+.?[\\\]^{|}]/g, "\\$&").replaceAll("*", ".*")}(?:/.*)?$`));
		return config.packages === "external" && !/^[./#~]|^[a-z]+:/i.test(id) || patterns.some((pattern) => pattern.test(id));
	};
}
var PRAGMA_RE = /^\/\/ @bun\b.*\n/;
var FILE_URL_RE = /import\.meta\.ROLLUP_FILE_URL_(\w+)/g;
var NUL_ESCAPE_RE = /(?<=["'])\\x00(?!\d)/g;
async function writeOutput(container, opts) {
	const outputOptions = {
		dir: opts.dir,
		format: opts.format,
		sourcemap: opts.sourcemap
	};
	const bundle = Object.create(null);
	for (const artifact of opts.outputs) {
		const fileName = artifact.path.replace(/^\.\//, "");
		if (artifact.kind === "entry-point" || artifact.kind === "chunk") bundle[fileName] = toChunk(container, fileName, {
			code: (await artifact.text()).replace(NUL_ESCAPE_RE, "\\0"),
			isEntry: artifact.kind === "entry-point",
			meta: opts.meta(artifact.path)
		});
		else bundle[fileName] = toAsset(fileName, artifact.kind === "sourcemap" ? relocateSources(container, await artifact.text(), dirname$2(join$2(opts.dir, fileName))) : await artifact.bytes());
	}
	const chunks = Object.values(bundle).filter((output) => output.type === "chunk");
	const meta = { chunks: Object.fromEntries(chunks.map((chunk) => [chunk.fileName, chunk])) };
	const renderOptions = {
		...outputOptions,
		sourcemap: false
	};
	for (const chunk of chunks) {
		const pragma = PRAGMA_RE.exec(chunk.code)?.[0] || "";
		chunk.code = await renderFileUrls(container, chunk.code.slice(pragma.length), {
			chunkId: chunk.fileName,
			format: opts.format
		});
		chunk.code = await container.renderChunk(chunk.code, [
			chunk,
			renderOptions,
			meta
		]);
		chunk.code = pragma + chunk.code;
	}
	const addAsset = ({ fileName, source }) => {
		bundle[fileName] ??= toAsset(fileName, source);
	};
	for (const file of container.emittedFiles.values()) addAsset(file);
	container.onEmitFile = addAsset;
	try {
		await container.callBundleHook("generateBundle", [
			outputOptions,
			bundle,
			true
		]);
	} finally {
		container.onEmitFile = void 0;
	}
	await Promise.all(Object.values(bundle).map(async (output) => {
		const path = join$2(opts.dir, output.fileName);
		await mkdir(dirname$2(path), { recursive: true });
		await writeFile(path, output.type === "chunk" ? output.code : output.source);
	}));
	await container.callBundleHook("writeBundle", [outputOptions, bundle]);
	return { output: Object.values(bundle) };
}
async function renderFileUrls(container, code, opts) {
	let rendered = "";
	let index = 0;
	for (const match of code.matchAll(FILE_URL_RE)) {
		const referenceId = match[1];
		const file = container.emittedFiles.get(referenceId);
		if (!file) continue;
		let relativePath = relative$2(dirname$2(opts.chunkId), file.fileName);
		relativePath = relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
		const url = await container.resolveFileUrl({
			chunkId: opts.chunkId,
			fileName: file.fileName,
			format: opts.format,
			moduleId: null,
			referenceId,
			relativePath
		}) || `new URL(${JSON.stringify(relativePath)}, import.meta.url).href`;
		rendered += code.slice(index, match.index) + url;
		index = match.index + match[0].length;
	}
	return rendered + code.slice(index);
}
function relocateSources(container, code, dir) {
	const map = JSON.parse(code);
	map.sources = map.sources?.map((source) => {
		const id = container.moduleId(source);
		if (isAbsolute$2(id) && !id.includes("\0")) return relative$2(dir, id);
		if (!source.startsWith(`nitro:`)) return source;
		const virtualId = id.replace(/^\0/, "");
		return virtualId.startsWith("virtual:") ? virtualId : `virtual:${virtualId}`;
	});
	return JSON.stringify(map);
}
function toChunk(container, fileName, opts) {
	const { meta } = opts;
	const imports = (kind) => (meta?.imports || []).filter((entry) => entry.kind === "dynamic-import" === (kind === "dynamic-import")).map((entry) => entry.external ? entry.path : entry.path.replace(/^\.\//, ""));
	const facadeModuleId = meta?.entryPoint ? container.moduleId(meta.entryPoint) : null;
	return {
		type: "chunk",
		fileName,
		preliminaryFileName: fileName,
		name: basename$2(fileName).replace(/\.[^.]+$/, ""),
		code: opts.code,
		map: null,
		sourcemapFileName: null,
		isEntry: opts.isEntry,
		isDynamicEntry: !opts.isEntry && !!facadeModuleId,
		isImplicitEntry: false,
		facadeModuleId,
		moduleIds: Object.keys(meta?.inputs || {}).map((input) => container.moduleId(input)),
		modules: {},
		exports: meta?.exports || [],
		imports: imports("import-statement"),
		dynamicImports: imports("dynamic-import"),
		importedBindings: {},
		implicitlyLoadedBefore: [],
		referencedFiles: []
	};
}
function toAsset(fileName, source) {
	return {
		type: "asset",
		fileName,
		name: void 0,
		names: [],
		originalFileName: null,
		originalFileNames: [],
		source,
		needsCodeReference: false
	};
}
async function bundle(nitro, config, container) {
	await container.buildStart();
	let result;
	try {
		const { outdir: _outdir, ...options } = config;
		result = await getBun().build({
			...options,
			metafile: true,
			throw: false
		});
		if (!result.success) throw new AggregateError(result.logs, `Build failed:\n${result.logs.map((log) => formatLog(log)).join("\n")}`);
	} catch (error) {
		await container.buildEnd(error);
		throw error;
	}
	await container.buildEnd();
	for (const log of result.logs) if (log.level === "warning" || log.level === "error") nitro.logger.warn(formatLog(log));
	else nitro.logger.debug(formatLog(log));
	return {
		output: await writeOutput(container, {
			outputs: result.outputs,
			meta: (path) => result.metafile?.outputs[path],
			dir: nitro.options.output.serverDir,
			format: config.format === "cjs" || config.format === "iife" ? config.format : "es",
			sourcemap: !!nitro.options.sourcemap
		}),
		inputs: [...Object.keys(result.metafile?.inputs || {}).map((input) => container.moduleId(input)), ...container.watchFiles].filter((id) => isFile(id))
	};
}
function getBun() {
	return globalThis.Bun;
}
function formatLog(log) {
	const position = log.position;
	return position ? `${log.message}\n    at ${position.file}:${position.line}:${position.column}` : log.message;
}
async function watchDev(nitro, config, container) {
	const watchOptions = {
		...nitro.options.watchOptions,
		ignoreInitial: true
	};
	const watchedFiles = /* @__PURE__ */ new Set();
	const modulesWatcher = createWatcher(nitro, [], watchOptions).on("all", (event) => {
		if (event === "add" || event === "change" || event === "unlink") rebuild();
	});
	const watch = (files) => {
		files = files.filter((file) => !file.includes("/node_modules/") && !watchedFiles.has(file));
		for (const file of files) watchedFiles.add(file);
		if (files.length > 0) modulesWatcher.add(files);
	};
	let closed = false;
	let rescan = true;
	const rebuild = t(async () => {
		if (closed) return;
		const start = Date.now();
		try {
			await nitro.hooks.callHook("dev:start");
			if (rescan) {
				await scanHandlers(nitro);
				nitro.routing.sync();
				rescan = false;
			}
			const { inputs } = await bundle(nitro, config, container);
			watch(inputs);
			await nitro.hooks.callHook("compiled", nitro);
			if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built in ${Date.now() - start}ms`);
			await nitro.hooks.callHook("dev:reload");
		} catch (error) {
			watch(errorFiles(error));
			nitro.logger.error(error);
			await nitro.hooks.callHook("dev:error", error);
		}
	});
	const reload = () => {
		rescan = true;
		return rebuild();
	};
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
	const scanDirsWatcher = createWatcher(nitro, scanDirs, watchOptions).on("all", (event) => {
		if (watchReloadEvents.has(event)) reload();
		else if (event === "change") rebuild();
	});
	const serverEntryRe = /^server\.[mc]?[jt]sx?$/;
	const rootDirWatcher = createWatcher(nitro, nitro.options.rootDir, {
		...watchOptions,
		depth: 0
	}).on("all", (event, path) => {
		if (watchReloadEvents.has(event) && serverEntryRe.test(basename$2(path))) reload();
	});
	nitro.hooks.hook("close", () => {
		closed = true;
		modulesWatcher.close();
		scanDirsWatcher.close();
		rootDirWatcher.close();
	});
	nitro.hooks.hook("build:reload", () => reload());
	nitro.logger.info(`Starting dev watcher (builder: \`bun\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
	await reload();
}
function errorFiles(error) {
	return (error?.errors || []).flatMap((log) => log?.position?.file && isFile(log.position.file) ? [log.position.file] : []);
}
async function buildProduction(nitro, config, container) {
	const buildStartTime = Date.now();
	await scanHandlers(nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	let output;
	if (!nitro.options.static) {
		nitro.logger.info(`Building server (builder: \`bun\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
		output = (await bundle(nitro, config, container)).output;
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
async function bunBuild(nitro) {
	assertBunRuntime();
	await nitro.hooks.callHook("build:before", nitro);
	const { config, container } = await getBunConfig(nitro);
	await nitro.hooks.callHook("build:config", nitro, {
		builder: "bun",
		bun: config
	});
	return nitro.options.dev ? watchDev(nitro, config, container) : buildProduction(nitro, config, container);
}
export { bunBuild };
