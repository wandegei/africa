import { L$1, NODE_MODULES_RE, addClientAssetsDir, assetUrls, baseBuildConfig, baseBuildPlugins, basename$2, build, builtinExternals, checkServerEntry, colors, compressPublicAssets, consola, copyPublicAssets, decodePath, dirname$2, ensureDep, ensureLibDeps, escapeRegExp$1, excludeSourcemapSources, extname$3, findSSREntry, g as g$3, getBuildInfo, getChunkName, getPrerenderMeta, hash, ie, importUnstorage, importVite, isAbsolute$2, isCaseInsensitiveFS, isCompressibleFile, isDepInstalled, join$2, joinURL, libChunkName, libChunksGroup, missingDepError, normalize$2, normalizeAliases, parseURL, prepare, prettyPath, r$2 as r$2$1, relative$2, resolve$2, resolveAlias, resolveDatabaseConnections, resolveKVDrivers, resolveKVMounts, resolveModulePath, resolveModuleURL, resolveNitroPath, resolveServiceEntry, resolveServices, resolveServicesOptions, resolveUnenv, runParallel, runtimeDir, s$1 as s$1$1, scanUnprefixedPublicAssets, setRunningVite, src_default, useSSRServiceRenderer, version, viteDepPaths, viteImportOptions, withBase, withBuildPlugins, withLeadingSlash, withTrailingSlash, withoutBase, withoutTrailingSlash, writeBuildInfo, writeFile$1 } from "./common.mjs";
import { I as I$1, Me, O as O$1, le } from "./c12_rc9_defu_destr.mjs";
import { n as n$4, r as r$4, t as t$5 } from "./compatx.mjs";
import { w as w$2 } from "./pkg-types.mjs";
import { assertBunRuntime } from "../_runtime2.mjs";
import { resolveRolldown } from "../_import.mjs";
import { scanAndSyncOptions, scanHandlers } from "./nitro2.mjs";
import { normalizeRoute, normalizeRouteRules } from "../_libs/h32.mjs";
import { HTTPError, addRoute, createRouter, findAllRoutes, findRoute, routeToRegExp } from "../_libs/h3+rou3.mjs";
import { compileRouterToString } from "../_libs/h3+rou32.mjs";
import { isLocalDevRequest } from "../_request.mjs";
import { DEV_RELOAD_ROUTE, DevReloadSignal, closeEnvRunner, createNitroEnvironment, createServiceEnvironment, createServiceEnvironments, initEnvRunner, rescanHandlers, watchScanDirs } from "../_scan-watch.mjs";
import { H3, defineHandler, getRequestURL, toEventHandler, toRequest } from "../_libs/h3.mjs";
import { fromNodeHandler, serveStatic } from "../_libs/h33.mjs";
import { NodeResponse } from "../_libs/srvx.mjs";
import { g as g$4 } from "../_libs/env-runner3.mjs";
import { t as t$6 } from "./perfect-debounce.mjs";
import { isBuiltin } from "node:module";
import nodeHTTP, { request } from "node:http";
import { Readable, Transform } from "node:stream";
import nodeHTTPS, { request as request$1 } from "node:https";
import nodeHTTP2 from "node:http2";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { copyFile, mkdir, readFile, rm, stat as stat$1, writeFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import { createBrotliCompress, createGzip } from "node:zlib";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
// node_modules/nitro/dist/_libs/hookable.mjs
function e$4(t, n = {}, r) {
	for (let i in t) {
		let a = t[i], o = r ? `${r}:${i}` : i;
		typeof a == `object` && a ? e$4(a, n, o) : typeof a == `function` && (n[o] = a);
	}
	return n;
}
function t$4(...t) {
	let r = {};
	for (let n of t) {
		let t = e$4(n);
		for (let e in t) r[e] ? r[e].push(t[e]) : r[e] = [t[e]];
	}
	for (let e in r) if (r[e].length > 1) {
		let t = r[e];
		r[e] = (...e) => n$3(t, (t) => t(...e));
	} else r[e] = r[e][0];
	return r;
}
function n$3(e, t) {
	return e.reduce((e, n) => e.then(() => t(n)), Promise.resolve());
}
var r$3 = (() => {
	if (console.createTask) return console.createTask;
	let e = { run: (e) => e() };
	return () => e;
})();
function i$3(e, t, n, r) {
	for (let a = n; a < e.length; a += 1) try {
		let n = r ? r.run(() => e[a](...t)) : e[a](...t);
		if (n && typeof n.then == `function`) return Promise.resolve(n).then(() => i$3(e, t, a + 1, r));
	} catch (e) {
		return Promise.reject(e);
	}
}
function a$3(e, t, n) {
	if (e.length > 0) return i$3(e, t, 0, r$3(n));
}
function o$2(e, t, n) {
	if (e.length > 0) {
		let i = r$3(n);
		return Promise.all(e.map((e) => i.run(() => e(...t))));
	}
}
function s$2(e, t) {
	for (let n of [...e]) n(t);
}
var c$3 = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
	}
	hook(e, t, n = {}) {
		if (!e || typeof t != `function`) return () => {};
		let r = e, i;
		for (; this._deprecatedHooks[e];) i = this._deprecatedHooks[e], e = i.to;
		if (i && !n.allowDeprecated) {
			let e = i.message;
			e ||= `${r} hook has been deprecated` + (i.to ? `, please use ${i.to}` : ``), this._deprecatedMessages ||= /* @__PURE__ */ new Set(), this._deprecatedMessages.has(e) || (console.warn(e), this._deprecatedMessages.add(e));
		}
		if (!t.name) try {
			Object.defineProperty(t, "name", {
				get: () => `_` + e.replace(/\W+/g, `_`) + `_hook_cb`,
				configurable: !0
			});
		} catch {}
		return this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		};
	}
	hookOnce(e, t) {
		let n, r = (...e) => (typeof n == `function` && n(), n = void 0, r = void 0, t(...e));
		return n = this.hook(e, r), n;
	}
	removeHook(e, t) {
		let n = this._hooks[e];
		if (n) {
			let r = n.indexOf(t);
			r !== -1 && n.splice(r, 1), n.length === 0 && (this._hooks[e] = void 0);
		}
	}
	clearHook(e) {
		this._hooks[e] = void 0;
	}
	deprecateHook(e, t) {
		this._deprecatedHooks[e] = typeof t == `string` ? { to: t } : t;
		let n = this._hooks[e] || [];
		this._hooks[e] = void 0;
		for (let t of n) this.hook(e, t);
	}
	deprecateHooks(e) {
		for (let t in e) this.deprecateHook(t, e[t]);
	}
	addHooks(t) {
		let n = e$4(t), r = Object.keys(n).map((e) => this.hook(e, n[e]));
		return () => {
			for (let e of r) e();
			r.length = 0;
		};
	}
	removeHooks(t) {
		let n = e$4(t);
		for (let e in n) this.removeHook(e, n[e]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(e, ...t) {
		return this.callHookWith(a$3, e, t);
	}
	callHookParallel(e, ...t) {
		return this.callHookWith(o$2, e, t);
	}
	callHookWith(e, t, n) {
		let r = this._before || this._after ? {
			name: t,
			args: n,
			context: {}
		} : void 0;
		this._before && s$2(this._before, r);
		let i = e(this._hooks[t] ? [...this._hooks[t]] : [], n, t);
		return i instanceof Promise ? i.finally(() => {
			this._after && r && s$2(this._after, r);
		}) : (this._after && r && s$2(this._after, r), i);
	}
	beforeEach(e) {
		return this._before = this._before || [], this._before.push(e), () => {
			if (this._before !== void 0) {
				let t = this._before.indexOf(e);
				t !== -1 && this._before.splice(t, 1);
			}
		};
	}
	afterEach(e) {
		return this._after = this._after || [], this._after.push(e), () => {
			if (this._after !== void 0) {
				let t = this._after.indexOf(e);
				t !== -1 && this._after.splice(t, 1);
			}
		};
	}
};
var l$3 = typeof window < `u`;
function u$3(e, t = {}) {
	let n = {
		inspect: l$3,
		group: l$3,
		filter: () => !0,
		...t
	}, r = n.filter, i = typeof r == `string` ? (e) => e.startsWith(r) : r, a = n.tag ? `[${n.tag}] ` : ``, o = (e) => a + e.name + ``.padEnd(e._id, `\0`), s = {}, c = e.beforeEach((e) => {
		(i === void 0 || i(e.name)) && (s[e.name] = s[e.name] || 0, e._id = s[e.name]++, console.time(o(e)));
	}), u = e.afterEach((e) => {
		(i === void 0 || i(e.name)) && (n.group && console.groupCollapsed(e.name), n.inspect ? console.timeLog(o(e), e.args) : console.timeEnd(o(e)), n.group && console.groupEnd(), s[e.name]--);
	});
	return { close: () => {
		c(), u();
	} };
}
// node_modules/nitro/dist/_libs/klona.mjs
function e$3(e, n, r) {
	typeof r.value == `object` && (r.value = t$3(r.value)), !r.enumerable || r.get || r.set || !r.configurable || !r.writable || n === `__proto__` ? Object.defineProperty(e, n, r) : e[n] = r.value;
}
function t$3(n) {
	if (typeof n != `object`) return n;
	var r = 0, i, a, o, s = Object.prototype.toString.call(n);
	if (s === `[object Object]` ? o = Object.create(n.__proto__ || null) : s === `[object Array]` ? o = Array(n.length) : s === `[object Set]` ? (o = /* @__PURE__ */ new Set(), n.forEach(function(e) {
		o.add(t$3(e));
	})) : s === `[object Map]` ? (o = /* @__PURE__ */ new Map(), n.forEach(function(e, n) {
		o.set(t$3(n), t$3(e));
	})) : s === `[object Date]` ? o = /* @__PURE__ */ new Date(+n) : s === `[object RegExp]` ? o = new RegExp(n.source, n.flags) : s === `[object DataView]` ? o = new n.constructor(t$3(n.buffer)) : s === `[object ArrayBuffer]` ? o = n.slice(0) : s.slice(-6) === `Array]` && (o = new n.constructor(n)), o) {
		for (a = Object.getOwnPropertySymbols(n); r < a.length; r++) e$3(o, a[r], Object.getOwnPropertyDescriptor(n, a[r]));
		for (r = 0, a = Object.getOwnPropertyNames(n); r < a.length; r++) Object.hasOwnProperty.call(o, i = a[r]) && o[i] === n[i] || e$3(o, i, Object.getOwnPropertyDescriptor(n, i));
	}
	return o || n;
}
// node_modules/nitro/dist/_chunks/nitro.mjs
var NitroDefaults = {
	compatibilityDate: "latest",
	debug: s$1$1,
	logLevel: r$2$1 ? 1 : 3,
	runtimeConfig: {
		app: {},
		nitro: {}
	},
	serverDir: false,
	scanDirs: [],
	buildDir: `node_modules/.nitro`,
	output: {
		dir: "{{ rootDir }}/.output",
		serverDir: "{{ output.dir }}/server",
		publicDir: "{{ output.dir }}/public"
	},
	features: {},
	experimental: {},
	kv: {},
	devStorage: {},
	cache: {},
	publicAssets: [],
	serverAssets: [],
	plugins: [],
	tasks: {},
	services: {},
	scheduledTasks: {},
	scheduler: {},
	virtual: {},
	compressPublicAssets: false,
	ignore: [],
	scanSuffixes: [],
	wasm: {},
	dev: false,
	devServer: { watch: [] },
	watchOptions: { ignoreInitial: true },
	devProxy: {},
	logging: {
		compressedSizes: true,
		buildSuccess: true
	},
	baseURL: process.env.NITRO_APP_BASE_URL || "/",
	handlers: [],
	devHandlers: [],
	errorHandler: void 0,
	routes: {},
	routeRules: {},
	prerender: {
		autoSubfolderIndex: true,
		concurrency: 1,
		interval: 0,
		failOnError: false,
		crawlLinks: false,
		ignore: [],
		routes: []
	},
	builder: void 0,
	buildPlugins: [],
	replace: {},
	inject: {},
	polyfills: [],
	builtinModules: [],
	node: true,
	sourcemap: false,
	traceDeps: [],
	typescript: {
		tsConfig: void 0,
		tsconfigPaths: true
	},
	hooks: {},
	commands: {},
	framework: {
		name: "nitro",
		version
	}
};
var mergeConfig = le(mergeConfigHooks);
function mergeConfigHooks(obj, key, value, namespace) {
	if (key === "hooks" && !namespace && isObject(obj.hooks) && isObject(value)) {
		obj.hooks = t$4(obj.hooks, value);
		return true;
	}
	return false;
}
function isObject(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
async function resolveAssetsOptions(options) {
	for (const publicAsset of options.publicAssets) {
		publicAsset.dir = resolve$2(options.rootDir, publicAsset.dir);
		publicAsset.baseURL = withLeadingSlash(withoutTrailingSlash(publicAsset.baseURL || "/"));
	}
	for (const dir of [options.rootDir, ...options.scanDirs]) {
		const publicDir = resolve$2(dir, "public");
		if (!existsSync(publicDir)) continue;
		if (options.publicAssets.some((asset) => asset.dir === publicDir)) continue;
		options.publicAssets.push({ dir: publicDir });
	}
	for (const serverAsset of options.serverAssets) serverAsset.dir = resolve$2(options.rootDir, serverAsset.dir);
	options.serverAssets.push({
		baseName: "server",
		dir: resolve$2(options.serverDir || options.rootDir, "assets")
	});
	for (const asset of options.publicAssets) {
		asset.baseURL = asset.baseURL || "/";
		const isTopLevel = asset.baseURL === "/";
		asset.fallthrough = asset.fallthrough ?? isTopLevel;
		const routeRule = options.routeRules[asset.baseURL + "/**"];
		asset.maxAge = (routeRule?.cache)?.maxAge ?? asset.maxAge;
		if (asset.maxAge && !asset.fallthrough) options.routeRules[asset.baseURL + "/**"] = O$1(routeRule, { headers: { "cache-control": `public, max-age=${asset.maxAge}, immutable` } });
	}
}
async function resolveCompatibilityOptions(options) {
	options.compatibilityDate = n$4(options.compatibilityDate);
}
async function resolveDatabaseOptions(options) {
	if (!options.experimental.database) return;
	if (options.dev && !options.database && !options.devDatabase) options.devDatabase = { default: {
		connector: "sqlite",
		options: { cwd: options.rootDir }
	} };
	else if (options.node && !options.database) options.database = { default: {
		connector: "sqlite",
		options: {}
	} };
	await ensureLibDeps((await resolveDatabaseConnections(options)).map((connection) => ({
		...connection,
		name: connection.connector
	})), {
		dir: options.rootDir,
		deps: options.deps,
		label: "database connector"
	});
}
function resolveDepsOptions(options) {
	const paths = (options.deps ??= {}).paths ??= {};
	const vitePath = options.vite?.path;
	if (vitePath && paths.vite && vitePath !== paths.vite) consola.warn(`Both \`vite.path\` (\`${vitePath}\`) and \`deps.paths.vite\` (\`${paths.vite}\`) are set. Using \`deps.paths.vite\`.`);
	if (vitePath) paths.vite ??= vitePath;
	if (paths.vite) (options.vite ??= {}).path = paths.vite;
}
async function resolveExportConditionsOptions(options) {
	options.exportConditions = _resolveExportConditions(options.exportConditions || [], {
		dev: options.dev,
		node: options.node,
		wasm: options.wasm !== false
	});
}
function _resolveExportConditions(userConditions, opts) {
	const conditions = [...userConditions.filter((c) => !c.startsWith("!"))];
	conditions.push(opts.dev ? "development" : "production");
	if (opts.wasm) conditions.push("wasm", "unwasm");
	if (opts.node) conditions.push("node");
	const negated = new Set(userConditions.filter((c) => c.startsWith("!")).map((c) => c.slice(1)));
	return [...new Set(conditions)].filter((c) => !negated.has(c));
}
async function resolveOpenAPIOptions(options) {
	if (!options.experimental.openAPI) return;
	if (!options.dev && !options.openAPI?.production) return;
	const shouldPrerender = !options.dev && options.openAPI?.production === "prerender";
	const handlersEnv = shouldPrerender ? "prerender" : "";
	const prerenderRoutes = [];
	const jsonRoute = options.openAPI?.route || "/_openapi.json";
	prerenderRoutes.push(jsonRoute);
	options.handlers.push({
		route: jsonRoute,
		env: handlersEnv,
		handler: join$2(runtimeDir, "internal/routes/openapi")
	});
	if (options.openAPI?.ui?.scalar !== false) {
		const scalarRoute = options.openAPI?.ui?.scalar?.route || "/_scalar";
		prerenderRoutes.push(scalarRoute);
		options.handlers.push({
			route: options.openAPI?.ui?.scalar?.route || "/_scalar",
			env: handlersEnv,
			handler: join$2(runtimeDir, "internal/routes/scalar")
		});
	}
	if (options.openAPI?.ui?.swagger !== false) {
		const swaggerRoute = options.openAPI?.ui?.swagger?.route || "/_swagger";
		prerenderRoutes.push(swaggerRoute);
		options.handlers.push({
			route: swaggerRoute,
			env: handlersEnv,
			handler: join$2(runtimeDir, "internal/routes/swagger")
		});
	}
	if (shouldPrerender) {
		options.prerender ??= {};
		options.prerender.routes ??= [];
		options.prerender.routes.push(...prerenderRoutes);
	}
}
var tsconfigCache = /* @__PURE__ */ new Map();
async function resolveTsconfig(options) {
	const root = resolve$2(options.rootDir || ".") + "/";
	if (!options.typescript.tsConfig) options.typescript.tsConfig = loadTsconfig(root);
}
function loadTsconfig(root) {
	const tsConfigPath = join$2(root, "tsconfig.json");
	let tsconfig;
	try {
		tsconfig = ie(tsConfigPath, tsconfigCache);
	} catch {
		return {};
	}
	tsconfig.compilerOptions ??= {};
	return tsconfig;
}
var RESOLVE_EXTENSIONS = [
	".ts",
	".js",
	".mts",
	".mjs",
	".tsx",
	".jsx"
];
async function resolvePathOptions(options) {
	options.rootDir = resolve$2(options.rootDir || ".") + "/";
	options.buildDir = resolve$2(options.rootDir, options.buildDir || ".") + "/";
	options.workspaceDir ||= await w$2(options.rootDir).catch(() => options.rootDir) + "/";
	if (options.srcDir) {
		if (options.serverDir === void 0) options.serverDir = options.srcDir;
		consola.warn(`"srcDir" option is deprecated. Please use "serverDir" instead.`);
	}
	if (options.serverDir !== false) {
		if (options.serverDir === true) options.serverDir = "server";
		options.serverDir = resolve$2(options.rootDir, options.serverDir || ".") + "/";
	}
	options.alias ??= {};
	if (!options.static && !options.entry) throw new Error(`Nitro entry is missing! Is "${options.preset}" preset correct?`);
	if (options.entry) options.entry = resolveNitroPath(options.entry, options);
	options.output.dir = resolveNitroPath(options.output.dir || NitroDefaults.output.dir, options, options.rootDir) + "/";
	options.output.publicDir = resolveNitroPath(options.output.publicDir || NitroDefaults.output.publicDir, options, options.rootDir) + "/";
	options.output.serverDir = resolveNitroPath(options.output.serverDir || NitroDefaults.output.serverDir, options, options.rootDir) + "/";
	options.plugins = options.plugins.map((p) => resolveNitroPath(p, options));
	if (options.serverDir) options.scanDirs.unshift(options.serverDir);
	options.scanDirs = options.scanDirs.map((dir) => resolve$2(options.rootDir, dir));
	options.scanDirs = [...new Set(options.scanDirs.map((dir) => dir + "/"))];
	options.handlers = options.handlers.map((h) => {
		return {
			...h,
			handler: resolveNitroPath(h.handler, options)
		};
	});
	options.routes = Object.fromEntries(Object.entries(options.routes).map(([route, h]) => {
		if (typeof h === "string") h = { handler: h };
		h.handler = resolveNitroPath(h.handler, options);
		return [route, h];
	}));
	if (options.serverEntry !== false) {
		if (typeof options?.serverEntry === "string") options.serverEntry = { handler: options.serverEntry };
		if (options.serverEntry?.handler) options.serverEntry.handler = resolveNitroPath(options.serverEntry.handler, options);
		else {
			const detected = resolveModulePath("./server", {
				try: true,
				from: options.serverDir && options.serverDir !== options.rootDir ? [options.serverDir, options.rootDir] : options.rootDir,
				extensions: RESOLVE_EXTENSIONS.flatMap((ext) => [ext, `.node${ext}`])
			});
			if (detected) {
				options.serverEntry ??= { handler: "" };
				options.serverEntry.handler = detected;
				consola.info(`Detected \`${prettyPath(detected)}\` as server entry.`);
			}
		}
		if (options.serverEntry?.handler && !options.serverEntry?.format) {
			const isNode = /\.(node)\.\w+$/.test(options.serverEntry.handler);
			options.serverEntry.format = isNode ? "node" : "web";
		}
	}
	if (options.renderer === false) options.renderer = void 0;
	else {
		if (options.renderer?.handler) options.renderer.handler = resolveModulePath(resolveNitroPath(options.renderer?.handler, options), {
			from: [options.rootDir, ...options.scanDirs],
			extensions: RESOLVE_EXTENSIONS
		});
		if (options.renderer?.template) options.renderer.template = resolveModulePath(resolveNitroPath(options.renderer?.template, options), {
			from: [options.rootDir, ...options.scanDirs],
			extensions: [".html"]
		});
		else if (!options.renderer?.handler) {
			const defaultIndex = resolveModulePath("./index.html", {
				from: [options.rootDir, ...options.scanDirs],
				extensions: [".html"],
				try: true
			});
			if (defaultIndex) {
				options.renderer ??= {};
				options.renderer.template = defaultIndex;
				consola.info(`Using \`${prettyPath(defaultIndex)}\` as renderer template.`);
			}
		}
		if (options.renderer?.template && !options.renderer?.handler) {
			options.renderer ??= {};
			options.renderer.handler = join$2(runtimeDir, "internal/routes/renderer-template" + (options.dev ? ".dev" : ""));
		}
	}
}
async function resolveRouteRulesOptions(options) {
	options.routeRules = normalizeRouteRules$1(options);
}
function normalizeRouteRules$1(config) {
	const routeRules = config.routeRules || {};
	for (const route in routeRules) if (routeRules[route] && "basicAuth" in routeRules[route]) throw new Error(`[nitro] \`basicAuth\` is not a route rule (\`${route}\`). Register h3's \`basicAuth\` middleware instead: globally from \`middleware/\`, or per route with \`defineHandler({ middleware: [basicAuth({ ... })], handler })\`.`);
	return normalizeRouteRules(routeRules);
}
async function resolveRuntimeConfigOptions(options) {
	options.runtimeConfig = normalizeRuntimeConfig(options);
}
function normalizeRuntimeConfig(config) {
	provideFallbackValues(config.runtimeConfig || {});
	const runtimeConfig = O$1(config.runtimeConfig, {
		app: { baseURL: config.baseURL },
		nitro: {
			envExpansion: config.experimental?.envExpansion,
			openAPI: config.openAPI
		}
	});
	runtimeConfig.nitro ??= {};
	runtimeConfig.nitro.routeRules = config.routeRules;
	checkSerializableRuntimeConfig(runtimeConfig);
	return runtimeConfig;
}
function provideFallbackValues(obj) {
	for (const key in obj) if (obj[key] === void 0 || obj[key] === null) obj[key] = "";
	else if (typeof obj[key] === "object") provideFallbackValues(obj[key]);
}
function checkSerializableRuntimeConfig(obj, path = []) {
	if (isPrimitiveValue(obj)) return;
	for (const key in obj) {
		const value = obj[key];
		if (value === null || value === void 0 || isPrimitiveValue(value)) continue;
		if (Array.isArray(value)) for (const [index, item] of value.entries()) checkSerializableRuntimeConfig(item, [...path, `${key}[${index}]`]);
		else if (typeof value === "object" && value.constructor === Object && (!value.constructor?.name || value.constructor.name === "Object")) checkSerializableRuntimeConfig(value, [...path, key]);
		else console.warn(`Runtime config option \`${[...path, key].join(".")}\` may not be able to be serialized.`);
	}
}
function isPrimitiveValue(value) {
	return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
async function resolveKVOptions(options) {
	options.kv ??= {};
	if (options.storage && options.storage !== options.kv && Object.keys(options.storage).length > 0) {
		consola.warn(`"storage" option is deprecated. Please use "kv" instead.`);
		options.kv = {
			...options.storage,
			...options.kv
		};
	}
	options.storage = options.kv;
	if (options.devStorage && Object.keys(options.devStorage).length > 0) consola.warn(`"devStorage" option is deprecated. Please use "kv" inside "$development" (and "$prerender") config instead.`);
	await ensureLibDeps(await resolveKVDrivers(options), {
		dir: options.rootDir,
		deps: options.deps,
		label: "storage driver"
	});
}
var cacheDrivers = /* @__PURE__ */ new Set([
	"memory",
	"fs",
	"kv"
]);
async function resolveCacheOptions(options) {
	options.cache ??= {};
	if (typeof options.cache !== "object") throw new TypeError(`Invalid \`cache\` config: expected an object (e.g. \`{ driver: "memory" }\`), got ${JSON.stringify(options.cache)}.`);
	options.cache.driver ??= hasCacheKVMount(options) ? "kv" : "memory";
	if (!cacheDrivers.has(options.cache.driver)) throw new Error(`Invalid \`cache.driver\`: ${JSON.stringify(options.cache.driver)}. Expected one of: ${[...cacheDrivers].map((d) => `"${d}"`).join(", ")}.`);
	if (options.cache.driver === "kv") await importUnstorage({
		dir: options.rootDir,
		deps: options.deps,
		reason: "`cache.driver: \"kv\"`"
	});
	if (options.cache.driver === "fs") {
		if (!options.node) consola.warn(`\`cache.driver: "fs"\` requires a Node.js compatible runtime, but the \`${options.preset}\` preset does not target Node.js. Use \`"memory"\` or \`"kv"\` instead.`);
		const dir = options.cache.fs?.dir || ".data/cache";
		const isDevOrPrerender = options.dev || options.preset === "nitro-prerender";
		options.cache.fs = {
			...options.cache.fs,
			dir: isDevOrPrerender && !isAbsolute$2(dir) ? resolve$2(options.rootDir, dir) : dir
		};
	}
}
function hasCacheKVMount(options) {
	return resolveKVMounts(options).some(({ path }) => {
		const base = path.replace(/[/\\]/g, ":").replace(/^:+/, "");
		return base === "cache" || base.startsWith("cache:");
	});
}
async function resolveURLOptions(options) {
	options.baseURL = withLeadingSlash(withTrailingSlash(options.baseURL));
	if (options.buildAssetsDir !== void 0) options.buildAssetsDir = normalizeBuildAssetsDir(options.buildAssetsDir) || void 0;
}
function normalizeBuildAssetsDir(dir) {
	return dir.split("/").filter((segment) => segment && segment !== "." && segment !== "..").join("/");
}
async function resolveErrorOptions(options) {
	if (!options.errorHandler) options.errorHandler = [];
	else if (!Array.isArray(options.errorHandler)) options.errorHandler = [options.errorHandler];
	options.errorHandler = options.errorHandler.map((h) => resolveNitroPath(h, options));
	options.errorHandler.push(join$2(runtimeDir, `internal/error/${options.dev ? "dev" : "prod"}`));
}
var VALID_BUILDERS = [
	"rolldown",
	"rollup",
	"rspack",
	"vite",
	"bun"
];
async function resolveBuilder(options) {
	options.builder ??= process.env.NITRO_BUILDER;
	if (options.builder === "false") options.builder = false;
	if (options.builder === false) return;
	if (options.builder) {
		if (!VALID_BUILDERS.includes(options.builder)) throw new Error(`Invalid nitro builder "${options.builder}". Valid builders are: ${VALID_BUILDERS.join(", ")}.`);
		if (options.builder === "bun") {
			assertBunRuntime();
			return;
		}
		const pkg = options.builder === "rspack" ? "@rspack/core" : options.builder;
		if (pkg === "rolldown" || pkg === "vite") return;
		const depOpts = {
			id: pkg,
			dir: options.rootDir,
			deps: options.deps
		};
		if (!await ensureDep(depOpts)) throw missingDepError(depOpts);
		return;
	}
	if (isDepInstalled("vite", {
		dir: options.rootDir,
		deps: options.deps
	}) && hasNitroViteConfig(options)) {
		if (!options.dev) {
			options.builder = "vite";
			return;
		}
		if (!_viteHintShown) {
			_viteHintShown = true;
			consola.warn("Detected a `vite.config` with the `nitro()` plugin, but the Nitro dev server does not run Vite, so Vite plugins and features are not available. Use `vite dev` for the full Vite experience.");
		}
	}
	if (g$3 && !resolveRolldown(options.rootDir, { paths: options.deps?.paths }) && !isDepInstalled("vite", {
		dir: options.rootDir,
		deps: options.deps
	})) {
		if (!_bunHintShown) {
			_bunHintShown = true;
			consola.info("Using the experimental `bun` builder (Bun runtime, `rolldown` is not installed in your project). Install `rolldown` or set the `builder` option to use another builder.");
		}
		options.builder = "bun";
		return;
	}
	if (!options.dev || resolveRolldown(options.rootDir, { paths: options.deps?.paths }) || hasConfig(options.rollupConfig) || hasConfig(options.rolldownConfig)) {
		options.builder = "rolldown";
		return;
	}
	if (!_hintShown) {
		_hintShown = true;
		consola.info("`rolldown` is not installed in your project. Running the dev server without a builder (experimental `builder: false`), so bundler plugins added by modules (`build:config` hook) do not apply. Install `rolldown` to bundle the server in development.");
	}
	options.builder = false;
}
var _hintShown = false;
var _viteHintShown = false;
var _bunHintShown = false;
function hasConfig(config) {
	return !!config && Object.keys(config).length > 0;
}
function hasNitroViteConfig(options) {
	for (const ext of [
		".ts",
		".mts",
		".cts",
		".js",
		".mjs",
		".cjs"
	]) {
		const configPath = resolve$2(options.rootDir, `vite.config${ext}`);
		if (existsSync(configPath)) try {
			if (readFileSync(configPath, "utf8").includes("nitro(")) return true;
		} catch {}
	}
	return false;
}
async function resolveTracingChannelOptions(options) {
	if (!options.tracingChannel) return;
	options.tracingChannel = {
		srvx: true,
		h3: true,
		unstorage: true,
		db0: true,
		...typeof options.tracingChannel === "object" ? options.tracingChannel : {}
	};
	options.plugins = options.plugins || [];
	options.plugins.push("#nitro/virtual/tracing");
	if (options.experimental?.tracingLogger) {
		options.plugins.unshift(join$2(runtimeDir, "internal/telemetry/logger-plugin"));
		options.features ??= {};
		options.features.runtimeHooks = true;
	}
}
var configResolvers = [
	resolveCompatibilityOptions,
	resolveTsconfig,
	resolvePathOptions,
	resolveDepsOptions,
	resolveRouteRulesOptions,
	resolveDatabaseOptions,
	resolveExportConditionsOptions,
	resolveRuntimeConfigOptions,
	resolveOpenAPIOptions,
	resolveURLOptions,
	resolveAssetsOptions,
	resolveKVOptions,
	resolveCacheOptions,
	resolveErrorOptions,
	resolveServicesOptions,
	resolveUnenv,
	resolveBuilder,
	resolveTracingChannelOptions
];
async function loadOptions(configOverrides = {}, opts = {}) {
	const options = await _loadUserConfig(configOverrides, opts);
	for (const resolver of configResolvers) await resolver(options);
	return options;
}
async function _loadUserConfig(configOverrides = {}, opts = {}) {
	configOverrides = t$3(configOverrides);
	globalThis.defineNitroConfig = globalThis.defineNitroConfig || ((c) => c);
	let compatibilityDate = configOverrides.compatibilityDate || opts.compatibilityDate || process.env.NITRO_COMPATIBILITY_DATE || process.env.SERVER_COMPATIBILITY_DATE || process.env.COMPATIBILITY_DATE;
	const { resolvePreset } = await import("../_presets.mjs");
	let preset = configOverrides.preset || process.env.NITRO_PRESET || process.env.SERVER_PRESET;
	let inlineDefaultPreset;
	const _dotenv = opts.dotenv ?? { fileName: [".env", ".env.local"] };
	const envName = opts.c12?.envName ?? (configOverrides.dev ? "development" : configOverrides.preset === "nitro-prerender" ? ["production", "prerender"] : "production");
	const loadedConfig = await (opts.watch ? Me : I$1)({
		name: "nitro",
		cwd: configOverrides.rootDir,
		dotenv: _dotenv,
		extend: { extendKey: ["extends", "preset"] },
		defaults: NitroDefaults,
		merger: mergeConfig,
		envMerger: mergeEnvConfig,
		async overrides({ rawConfigs }) {
			const getConf = (key) => configOverrides[key] ?? rawConfigs.main?.[key] ?? rawConfigs.rc?.[key] ?? rawConfigs.packageJson?.[key];
			if (!compatibilityDate) compatibilityDate = getConf("compatibilityDate");
			if (!preset) preset = getConf("preset");
			if (configOverrides.dev) preset = preset && preset !== "nitro-dev" ? await resolvePreset(preset, {
				static: getConf("static"),
				dev: true,
				compatibilityDate: compatibilityDate || "latest"
			}).then((p) => p?._meta?.name || "nitro-dev").catch(() => "nitro-dev") : "nitro-dev";
			else if (!preset) {
				const defaultPreset = getConf("defaultPreset");
				const resolved = await resolvePreset("", {
					static: getConf("static"),
					dev: false,
					compatibilityDate: compatibilityDate || "latest",
					defaultPreset
				});
				preset = resolved?._meta?.name;
				if (resolved && defaultPreset && typeof defaultPreset !== "string") inlineDefaultPreset = resolved;
			}
			return {
				...configOverrides,
				preset
			};
		},
		async resolve(id) {
			if (inlineDefaultPreset && id === inlineDefaultPreset._meta?.name) return { config: t$3(inlineDefaultPreset) };
			const preset = await resolvePreset(id, {
				static: configOverrides.static,
				compatibilityDate: compatibilityDate || "latest",
				dev: configOverrides.dev
			});
			if (preset) return { config: t$3(preset) };
		},
		...opts.c12,
		envName
	});
	const options = t$3(loadedConfig.config);
	options._config = configOverrides;
	options._c12 = loadedConfig;
	options.layers = resolveLayers(loadedConfig);
	options.envName = (Array.isArray(envName) ? envName.find(Boolean) : envName) || (options.dev ? "development" : "production");
	options.preset = (loadedConfig.layers || []).find((l) => l.config?._meta?.name)?.config?._meta?.name || preset;
	options.compatibilityDate = t$5(compatibilityDate, options.compatibilityDate);
	if (options.dev && options.preset !== "nitro-dev") consola.info(`Using \`${options.preset}\` emulation in development mode.`);
	return options;
}
var kvConfigKeys = /* @__PURE__ */ new Set([
	"kv",
	"storage",
	"devStorage"
]);
var mergeEnvConfig = le((obj, key, value, namespace) => {
	if (mergeConfigHooks(obj, key, value, namespace)) return true;
	const current = obj[key];
	if (kvConfigKeys.has(namespace) && value?.driver && current?.driver && value.driver !== current.driver) {
		obj[key] = value;
		return true;
	}
});
function resolveLayers(c12) {
	const c12Layers = c12.layers || [];
	const rootLayer = c12Layers.find((layer) => layer.cwd && !layer.source);
	return [{
		cwd: c12.cwd,
		configFile: c12._configFile,
		config: rootLayer?.config || {},
		meta: c12.meta
	}, ...c12Layers.filter((layer) => layer.cwd && layer.source).map((layer) => ({
		cwd: layer.cwd,
		configFile: layer.configFile,
		config: layer.config || {},
		meta: layer.meta
	}))];
}
async function updateNitroConfig(nitro, config) {
	nitro.options.routeRules = normalizeRouteRules$1(config.routeRules ? config : nitro.options);
	nitro.options.runtimeConfig = normalizeRuntimeConfig(config.runtimeConfig ? config : nitro.options);
	await nitro.hooks.callHook("build:reload");
	consola.success("Nitro config hot reloaded!");
}
var installedModules = /* @__PURE__ */ new WeakMap();
async function installModules(nitro, moduleInputs) {
	const _modules = [...moduleInputs ?? nitro.options.modules ?? []];
	const modules = await Promise.all(_modules.map((mod) => _resolveNitroModule(mod, nitro.options)));
	let _installed = installedModules.get(nitro);
	if (!_installed) {
		_installed = /* @__PURE__ */ new Set();
		installedModules.set(nitro, _installed);
	}
	for (const mod of modules) {
		const key = mod._url ?? mod.setup;
		if (_installed.has(key)) continue;
		_installed.add(key);
		await mod.setup(nitro);
	}
}
async function _resolveNitroModule(mod, nitroOptions) {
	let _url;
	if (typeof mod === "string") {
		_url = resolveModuleURL(mod, {
			from: [nitroOptions.rootDir],
			extensions: [
				".mjs",
				".cjs",
				".js",
				".mts",
				".cts",
				".ts"
			]
		});
		mod = await import(_url).then((m) => m.default || m);
	}
	if (typeof mod === "function") mod = { setup: mod };
	if ("nitro" in mod) mod = mod.nitro;
	if (!mod.setup) throw new Error("Invalid Nitro module: missing setup() function.");
	return {
		_url,
		...mod
	};
}
var isGlobalMiddleware = (h) => !h.method && (!h.route || h.route === "/**");
function initNitroRouting(nitro) {
	const envConditions = new Set([
		nitro.options.dev ? "dev" : "prod",
		nitro.options.preset,
		nitro.options.preset === "nitro-prerender" ? "prerender" : void 0
	].filter(Boolean));
	const matchesEnv = (h) => {
		const envs = (Array.isArray(h.env) ? h.env : [h.env]).filter(Boolean);
		return envs.length === 0 || envs.some((env) => envConditions.has(env));
	};
	const routes = new Router(nitro.options.baseURL);
	const routeRules = new Router(nitro.options.baseURL, { normalize: false });
	const globalMiddleware = [];
	const routedMiddleware = new Router(nitro.options.baseURL);
	const sync = () => {
		routeRules._update(Object.entries(nitro.options.routeRules).map(([route, data]) => ({
			route,
			method: "",
			data: {
				...data,
				_route: route
			}
		})));
		const _routes = [
			...Object.entries(nitro.options.routes).flatMap(([route, handler]) => {
				if (typeof handler === "string") handler = { handler };
				return {
					...handler,
					route,
					middleware: false
				};
			}),
			...nitro.options.handlers,
			...nitro.scannedHandlers
		].filter((h) => h && !h.middleware && matchesEnv(h));
		if (nitro.options.serverEntry && nitro.options.serverEntry.handler) _routes.push({
			route: "/**",
			lazy: false,
			format: nitro.options.serverEntry.format,
			handler: nitro.options.serverEntry.handler
		});
		if (nitro.options.renderer?.handler) _routes.push({
			route: "/**",
			lazy: true,
			handler: nitro.options.renderer?.handler
		});
		routes._update(_routes.map((h) => ({
			...h,
			method: h.method || "",
			data: handlerWithImportHash(h)
		})), { merge: true });
		const _middleware = [...nitro.scannedHandlers, ...nitro.options.handlers].filter((h) => h && h.middleware && matchesEnv(h));
		if (nitro.options.serveStatic) _middleware.unshift({
			route: "/**",
			middleware: true,
			handler: join$2(runtimeDir, "internal/static")
		});
		else for (const asset of nitro.options.publicAssets) {
			if (asset.fallthrough || !asset.baseURL || asset.baseURL === "/") continue;
			_middleware.unshift({
				route: joinURL(asset.baseURL, ":path+"),
				method: "GET",
				middleware: true,
				handler: join$2(runtimeDir, "internal/static-missing")
			});
		}
		globalMiddleware.splice(0, globalMiddleware.length, ..._middleware.filter((h) => isGlobalMiddleware(h)).map((m) => handlerWithImportHash(m)));
		routedMiddleware._update(_middleware.filter((h) => !isGlobalMiddleware(h)).flatMap((h) => {
			const route = {
				...h,
				method: h.method || "",
				data: handlerWithImportHash(h)
			};
			return route.method.toUpperCase() === "GET" ? [route, {
				...route,
				method: "HEAD"
			}] : [route];
		}));
	};
	nitro.routing = Object.freeze({
		sync,
		routes,
		routeRules,
		globalMiddleware,
		routedMiddleware
	});
}
function handlerWithImportHash(h) {
	const handler = h.handler.replace(/\\/g, "/");
	const id = (h.lazy ? "_lazy_" : "_") + hash(handler);
	return {
		...h,
		handler,
		_importHash: id
	};
}
var Router = class {
	_routes;
	_router;
	_compiled;
	_baseURL;
	_normalize;
	constructor(baseURL, opts) {
		this._normalize = opts?.normalize !== false;
		this._update([]);
		this._baseURL = baseURL ? this._normalize ? normalizeRoute(baseURL) : baseURL : "";
		if (this._baseURL.endsWith("/")) this._baseURL = this._baseURL.slice(0, -1);
	}
	get routes() {
		return this._routes;
	}
	_update(routes, opts) {
		this._routes = routes;
		this._router = createRouter();
		this._compiled = void 0;
		for (const route of routes) {
			const pattern = this._normalize ? normalizeRoute(route.route) : route.route;
			addRoute(this._router, route.method, this._baseURL + pattern, route.data);
		}
		if (opts?.merge) mergeCatchAll(this._router, this._baseURL);
	}
	hasRoutes() {
		return this._routes.length > 0;
	}
	compileToString(opts) {
		if (this._compiled) return this._compiled;
		this._compiled = compileRouterToString(this._router, opts);
		if (this.routes.length === 1 && this.routes[0].route === "/**" && this.routes[0].method === "") {
			const data = (opts?.serialize || JSON.stringify)(this.routes[0].data);
			const base = this._baseURL;
			let retCode = `{data,params:w?{"0":w,_:w}:{}}`;
			if (opts?.matchAll) retCode = `[${retCode}]`;
			const guardCode = base ? `if(p!==${JSON.stringify(base)}&&!p.startsWith(${JSON.stringify(base + "/")})){return ${opts?.matchAll ? "[]" : "undefined"};}` : "";
			this._compiled = `/* @__PURE__ */ (() => {const data=${data};return ((_m, p)=>{${guardCode}if(p.charCodeAt(p.length-1)===47)p=p.slice(0,-1);const w=p.slice(${base.length + 1});return ${retCode};})})()`;
		}
		return this._compiled;
	}
	match(method, path) {
		return findRoute(this._router, method, this._lookupPath(path))?.data;
	}
	matchAll(method, path) {
		return findAllRoutes(this._router, method, this._lookupPath(path)).map((route) => route.data);
	}
	_lookupPath(path) {
		return this._normalize ? path : encodePattern(path);
	}
};
function mergeCatchAll(router, baseURL) {
	let node = router.root;
	for (const segment of baseURL.split("/")) {
		if (!segment) continue;
		node = node?.static?.[segment];
		if (!node) return;
	}
	const handlers = node?.wildcard?.methods?.[""];
	if (!handlers || handlers.length < 2) return;
	handlers.splice(0, handlers.length, {
		...handlers[0],
		data: handlers.map((h) => h.data)
	});
}
function encodePattern(pattern) {
	return pattern.replace(/[\0- "#<>^`\x7F-\uFFFC]+/g, (run) => encodeURIComponent(run.replace(/[\uD800-\uDFFF]/gu, "�")));
}
var nitroInstances = globalThis.__nitro_instances__ ||= [];
var globalKey = "__nitro_builder__";
function registerNitroInstance(nitro) {
	if (nitroInstances.includes(nitro)) return;
	globalInit();
	nitroInstances.unshift(nitro);
	nitro.hooks.hookOnce("close", () => {
		nitroInstances.splice(nitroInstances.indexOf(nitro), 1);
		if (nitroInstances.length === 0) delete globalThis[globalKey];
	});
}
function globalInit() {
	if (globalThis[globalKey]) return;
	globalThis[globalKey] = { async fetch(req) {
		for (let r = 0; r < 10 && nitroInstances.length === 0; r++) await new Promise((resolve) => setTimeout(resolve, 300));
		const nitro = nitroInstances[0];
		if (!nitro) throw new Error("No Nitro instance is running.");
		return nitro.fetch(req);
	} };
}
async function createNitro(config = {}, opts = {}) {
	const options = await loadOptions(config, opts);
	const hooks = new c$3();
	hooks.deprecateHooks({ "rollup:reload": { to: "build:reload" } });
	hooks.hook("build:config", callRollupBeforeHooks);
	let closePromise;
	const nitro = {
		meta: {
			version,
			majorVersion: 3
		},
		options,
		hooks,
		vfs: /* @__PURE__ */ new Map(),
		routing: {},
		logger: consola.withTag("nitro"),
		scannedHandlers: [],
		fetch: () => {
			throw new Error("no dev server attached!");
		},
		close: () => closePromise ??= Promise.resolve(nitro.hooks.callHook("close")),
		async updateConfig(config) {
			updateNitroConfig(nitro, config);
		}
	};
	registerNitroInstance(nitro);
	initNitroRouting(nitro);
	await scanAndSyncOptions(nitro);
	if (nitro.options.debug) u$3(hooks, { tag: "nitro" });
	if (nitro.options.logLevel !== void 0) nitro.logger.level = nitro.options.logLevel;
	nitro.hooks.addHooks(nitro.options.hooks);
	await installModules(nitro);
	await scanHandlers(nitro);
	nitro.routing.sync();
	return nitro;
}
var _rollupBeforeWarned = false;
var _rollupBeforeSkipWarned = false;
function callRollupBeforeHooks(nitro, config) {
	return nitro.hooks.callHookWith(async (fns, args) => {
		if (fns.length === 0) return;
		if (config.builder === "rspack" || config.builder === "bun") {
			if (!_rollupBeforeSkipWarned) {
				_rollupBeforeSkipWarned = true;
				nitro.logger.warn(`The deprecated \`rollup:before\` hook is not called with the \`${config.builder}\` builder. Use \`build:config\` instead.`);
			}
			return;
		}
		if (!_rollupBeforeWarned) {
			_rollupBeforeWarned = true;
			nitro.logger.warn("The `rollup:before` hook is deprecated. Use `build:config` instead (the config is passed as `{ rollup }`, `{ rolldown }`, `{ rspack }` or `{ bun }`).");
		}
		for (const fn of fns) await fn(...args);
	}, "rollup:before", [nitro, config.rollup ?? config.rolldown]);
}
// node_modules/nitro/dist/_libs/httpxy.mjs
var c$2 = /(^|,)\s*upgrade\s*($|,)/i;
var l$2 = /(^|,)\s*transfer-encoding\s*($|,)/i;
var u$2 = {
	http: new nodeHTTP.Agent({
		keepAlive: !0,
		maxSockets: 256,
		maxFreeSockets: 64
	}),
	https: new nodeHTTPS.Agent({
		keepAlive: !0,
		maxSockets: 256,
		maxFreeSockets: 64
	})
};
var d$2 = /^https|wss/;
function f$2(e) {
	let t = !1;
	for (let n in e) if (e[n] !== void 0 && n.toLowerCase() === `transfer-encoding`) {
		t = !0;
		break;
	}
	let n = e.connection, r = typeof n == `string` && l$2.test(n);
	(t || r) && (e.connection = `close`);
}
function p$2(e, n, r) {
	if (e.writableFinished) return;
	let i = !1, a = () => {
		i || (i = !0, r instanceof Readable && (r.unpipe(e), r.resume()));
	};
	n.once(`end`, () => {
		e.writableFinished || a();
	}), n.once(`close`, () => {
		e.writableFinished || (a(), e.destroy());
	});
}
var m$2 = [
	`:method`,
	`:path`,
	`:scheme`,
	`:authority`
];
function h$2(e, t, n, r) {
	e.port = t[r || `target`].port || (d$2.test(t[r || `target`].protocol ?? `http`) ? 443 : 80);
	for (let n of [
		`host`,
		`hostname`,
		`socketPath`,
		`pfx`,
		`key`,
		`passphrase`,
		`cert`,
		`ca`,
		`ciphers`,
		`secureProtocol`
	]) {
		let i = t[r || `target`][n];
		i !== void 0 && (e[n] = i);
	}
	if (e.host === void 0 && typeof e.hostname == `string`) {
		let t = e.hostname.includes(`:`) && !e.hostname.startsWith(`[`) ? `[${e.hostname}]` : e.hostname;
		e.host = e.port ? `${t}:${e.port}` : t;
	}
	if (e.method = t.method || n.method, e.headers = { ...n.headers }, n.headers?.[`:authority`] && (e.headers.host = n.headers[`:authority`]), t.headers) for (let n of Object.keys(t.headers)) e.headers[n] = t.headers[n];
	if (n.httpVersionMajor > 1) for (let t of m$2) delete e.headers[t];
	if (t.auth && (e.auth = t.auth), t.ca && (e.ca = t.ca), d$2.test(t[r || `target`].protocol ?? `http`) && (e.rejectUnauthorized = t.secure === void 0 || t.secure), t.agent !== void 0) e.agent = t.agent || !1;
	else if (n.httpVersionMajor > 1 || c$2.test(n.headers.connection || ``)) e.agent = !1;
	else {
		let n = t[r || `target`].protocol ?? `http`;
		e.agent = d$2.test(n) ? u$2.https : u$2.http;
	}
	e.localAddress = t.localAddress, e.agent || (e.headers = e.headers || {}, typeof e.headers.connection == `string` && c$2.test(e.headers.connection) || (e.headers.connection = `close`)), e.headers = e.headers || {}, f$2(e.headers);
	let i = t[r || `target`], a = i && t.prependPath !== !1 && i.pathname || ``, o = i instanceof URL && t.prependPath !== !1 && i.search || ``, s = n.url || ``, l = s.indexOf(`?`), p = l === -1 ? s : s.slice(0, l), h = l === -1 ? `` : s.slice(l), _ = p ? p[0] === `/` ? p : `/` + p : `/`, v = t.toProxy ? `/` + s : _ + h;
	v = t.ignorePath ? `` : v;
	let y = g$2(a, v);
	return o && (y = y.includes(`?`) ? y.replace(`?`, o + `&`) : y + o), e.path = y, t.changeOrigin && (e.headers.host = w$1(e.port, t[r || `target`].protocol) && !C$1(e.host) ? e.host + `:` + e.port : e.host ?? void 0), e;
}
function g$2(e, t) {
	if (!e || e === `/`) return t || `/`;
	if (!t || t === `/`) return e || `/`;
	let n = e[e.length - 1] === `/`, r = t[0] === `/`;
	return n && r ? e + t.slice(1) : !n && !r ? e + `/` + t : e + t;
}
function _$1(e) {
	return e.setTimeout(0), e.setNoDelay(!0), e.setKeepAlive(!0, 0), e;
}
function v$1(e, t) {
	let n = e;
	for (let [e, r] of Object.entries(t)) if (r !== void 0) for (let t of Array.isArray(r) ? r : [r]) n += `\r\n${e}: ${t}`;
	return `${n}\r\n\r\n`;
}
function y$1(e) {
	let t = e.headers[`:authority`] || e.headers.host, n = t ? t.match(/:(\d+)/) : ``;
	return n ? n[1] : b$1(e) ? `443` : `80`;
}
function b$1(e) {
	let t = e.socket;
	return !!t && `encrypted` in t && t.encrypted;
}
function x$1(e, t, n) {
	return Array.isArray(e) ? e.map(function(e) {
		return x$1(e, t, n);
	}) : e.replace(RegExp(String.raw`(;\s*` + n + `=)([^;]+)`, `i`), function(e, n, r) {
		let i;
		if (r in t) i = t[r];
		else if (`*` in t) i = t[`*`];
		else return e;
		return i ? n + i : ``;
	});
}
function S$1(e) {
	if (typeof e == `string`) {
		if (e.startsWith(`unix:`)) return { socketPath: e.slice(5) };
		let t = new URL(e);
		return {
			host: t.hostname,
			port: Number(t.port) || (d$2.test(t.protocol) ? 443 : 80)
		};
	}
	if (!e.socketPath && !e.port) throw Error("ProxyAddr must have either `port` or `socketPath`");
	return e;
}
function C$1(e) {
	return e ? !!~e.indexOf(`:`) : !1;
}
function w$1(e, t) {
	let n = t?.split(`:`)[0], r = +e;
	if (!r) return !1;
	switch (n) {
		case `http`:
		case `ws`: return r !== 80;
		case `https`:
		case `wss`: return r !== 443;
		case `ftp`: return r !== 21;
		case `gopher`: return r !== 70;
		case `file`: return !1;
	}
	return r !== 0;
}
function T$1(e) {
	return e;
}
function E$1(e) {
	return e;
}
var D$1 = /^201|30([12378])$/;
var O = [
	E$1((e, t, n) => {
		(e.httpVersion === `1.0` || e.httpVersionMajor >= 2 || n.statusCode === 204 || n.statusCode === 304) && delete n.headers[`transfer-encoding`];
	}),
	E$1((e, t, n) => {
		e.httpVersion === `1.0` ? n.headers.connection = e.headers.connection || `close` : e.httpVersionMajor < 2 && !n.headers.connection ? n.headers.connection = e.headers.connection || `keep-alive` : e.httpVersionMajor >= 2 && delete n.headers.connection;
	}),
	E$1((e, t, n, r) => {
		if ((r.hostRewrite || r.autoRewrite || r.protocolRewrite) && n.headers.location && D$1.test(String(n.statusCode))) {
			let t = k(r.target), i = n.headers.location.startsWith(`//`) && !r.protocolRewrite, a = new URL(n.headers.location, t);
			if (t.host !== a.host) return;
			r.hostRewrite ? a.host = r.hostRewrite : r.autoRewrite && (e.headers[`:authority`] ? a.host = e.headers[`:authority`] : e.headers.host && (a.host = e.headers.host)), r.protocolRewrite && (a.protocol = r.protocolRewrite), n.headers.location = i ? a.href.slice(a.protocol.length) : a.href;
		}
	}),
	E$1((e, t, n, r) => {
		let i = typeof r.cookieDomainRewrite == `string` ? { "*": r.cookieDomainRewrite } : r.cookieDomainRewrite, a = typeof r.cookiePathRewrite == `string` ? { "*": r.cookiePathRewrite } : r.cookiePathRewrite, o = r.preserveHeaderKeyCase, s, c = function(e, n) {
			if (n !== void 0 && String(e).trim()) {
				i && e.toLowerCase() === `set-cookie` && (n = x$1(n, i, `domain`)), a && e.toLowerCase() === `set-cookie` && (n = x$1(n, a, `path`));
				try {
					t.setHeader(String(e).trim(), n);
				} catch {}
			}
		};
		if (o && n.rawHeaders !== void 0) {
			s = {};
			for (let e = 0; e < n.rawHeaders.length; e += 2) {
				let t = n.rawHeaders[e];
				s[t.toLowerCase()] = t;
			}
		}
		for (let e of Object.keys(n.headers)) {
			let t = n.headers[e];
			o && s && (e = s[e] || e), c(e, t);
		}
	}),
	E$1((e, t, n) => {
		t.statusCode = n.statusCode, n.statusMessage && e.httpVersionMajor < 2 && (t.statusMessage = n.statusMessage);
	})
];
function k(e) {
	if (e instanceof URL) return e;
	if (typeof e == `string`) return new URL(e);
	let t = e.protocol || `http:`, n = e.host || e.hostname || `localhost`, r = e.port;
	return new URL(`${t}//${n}${r ? `:` + r : ``}`);
}
var A = {
	http: nodeHTTP,
	https: nodeHTTPS
};
var j = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
var M = [
	T$1((e) => {
		e.method !== `DELETE` && e.method !== `OPTIONS` || e.headers[`content-length`] || e.headers[`transfer-encoding`] || (e.headers[`content-length`] = `0`);
	}),
	T$1((e, t, n) => {
		n.timeout && e.socket.setTimeout(n.timeout, () => {
			e.socket.destroy();
		});
	}),
	T$1((e, t, n) => {
		if (!n.xfwd) return;
		let r = e.isSpdy || b$1(e), i = {
			for: e.connection.remoteAddress || e.socket.remoteAddress,
			port: y$1(e),
			proto: r ? `https` : `http`
		};
		for (let t of [
			`for`,
			`port`,
			`proto`
		]) {
			let n = `x-forwarded-` + t;
			!e.headers[n] && i[t] !== void 0 && (e.headers[n] = i[t]);
		}
		e.headers[`x-forwarded-host`] = e.headers[`x-forwarded-host`] || e.headers[`:authority`] || e.headers.host || ``;
	}),
	T$1((e, t, n, r, i, a) => {
		r.emit(`start`, e, t, n.target || n.forward);
		let o = A.http, s = A.https, c = typeof n.followRedirects == `number` ? n.followRedirects : n.followRedirects ? 5 : 0;
		if (n.forward) {
			let r = (d$2.test(n.forward.protocol || `http`) ? s : o).request(h$2(n.ssl || {}, n, e, `forward`)), i = m(r, n.forward);
			if (e.on(`error`, i), r.on(`error`, i), (n.buffer || e).pipe(r), !n.target) {
				t.end();
				return;
			}
		}
		let l = (d$2.test(n.target.protocol || `http`) ? s : o).request(h$2(n.ssl || {}, n, e));
		l.on(`socket`, (i) => {
			r && !l.getHeader(`expect`) && r.emit(`proxyReq`, l, e, t, n);
		}), n.proxyTimeout && l.setTimeout(n.proxyTimeout, function() {
			l.destroy();
		}), t.on(`close`, function() {
			t.writableFinished || l.destroy();
		});
		let u = m(l, n.target);
		e.on(`error`, u), l.on(`error`, u);
		function m(n, i) {
			return function(o) {
				if (!e.socket?.writable && o.code === `ECONNRESET`) return r.emit(`econnreset`, o, e, t, i), n.destroy();
				a ? a(o, e, t, i) : r.emit(`error`, o, e, t, i);
			};
		}
		let g;
		l.once(`socket`, () => {
			let t = n.buffer || e;
			if (c > 0) {
				let e = [];
				t.on(`data`, (t) => {
					e.push(typeof t == `string` ? Buffer.from(t) : t), l.write(t);
				}), t.on(`end`, () => {
					g = Buffer.concat(e), l.end();
				}), t.on(`error`, (e) => {
					l.destroy(e);
				});
			} else t.pipe(l);
		});
		function _(i, a, l) {
			let u = i.statusCode;
			if (c > 0 && j.has(u) && a < c && i.headers.location) {
				i.resume();
				let c = new URL(i.headers.location, l), p = u === 307 || u === 308, h = p && e.method || `GET`, v = d$2.test(c.protocol), y = v ? s : o, b = { ...e.headers };
				n.headers && Object.assign(b, n.headers), b.host = c.host, c.host !== l.host && (delete b.authorization, delete b.cookie), p || (delete b[`content-length`], delete b[`content-type`], delete b[`transfer-encoding`]), f$2(b);
				let x = {
					hostname: c.hostname,
					port: c.port || (v ? 443 : 80),
					path: c.pathname + c.search,
					method: h,
					headers: b,
					agent: n.agent || !1
				};
				v && (x.rejectUnauthorized = n.secure === void 0 || n.secure);
				let S = y.request(x);
				r && !S.getHeader(`expect`) && r.emit(`proxyReq`, S, e, t, n), n.proxyTimeout && S.setTimeout(n.proxyTimeout, () => {
					S.destroy();
				});
				let C = m(S, c);
				S.on(`error`, C), S.on(`response`, (e) => {
					_(e, a + 1, c);
				}), p && g && g.length > 0 ? S.end(g) : S.end();
			} else {
				if (r && r.emit(`proxyRes`, i, e, t), !t.headersSent && !n.selfHandleResponse) {
					for (let r of O) if (r(e, t, i, n)) break;
				}
				t.finished ? r && r.emit(`end`, e, t, i) : (t.on(`close`, function() {
					i.destroy();
				}), i.on(`close`, function() {
					!i.complete && !t.destroyed && t.destroy();
				}), i.on(`error`, function(n) {
					t.destroyed || t.destroy(n), r.listenerCount(`error`) > 0 && r.emit(`error`, n, e, t, l);
				}), i.on(`end`, function() {
					r && r.emit(`end`, e, t, i);
				}), n.selfHandleResponse || i.pipe(t));
			}
		}
		l.on(`response`, function(t) {
			c === 0 && p$2(l, t, n.buffer || e), _(t, 0, n.target);
		});
	})
];
function N(e, t, n, r) {
	if (!n || n <= 0 || !Number.isFinite(n)) return;
	let i = setTimeout(() => {
		s(Object.assign(Error(`Upstream WebSocket upgrade timed out`), {
			code: `ERR_UPSTREAM_UPGRADE_TIMEOUT`,
			statusCode: 504
		}));
	}, Math.min(n, 2147483647));
	i.unref(), e.once(`response`, a), e.once(`upgrade`, a), e.once(`error`, a), e.once(`close`, a), t.prependOnceListener(`error`, s), t.prependOnceListener(`close`, o), t.destroyed && o();
	function a() {
		clearTimeout(i), e.removeListener(`response`, a), e.removeListener(`upgrade`, a), e.removeListener(`error`, a), e.removeListener(`close`, a), t.removeListener(`error`, s), t.removeListener(`close`, o);
	}
	function o() {
		s(t.errored || Object.assign(Error(`socket hang up`), { code: `ECONNRESET` }));
	}
	function s(n) {
		a();
		try {
			r(n);
		} finally {
			e.destroy(n), t.destroy();
		}
	}
}
var P = [
	`connection`,
	`proxy-connection`,
	`keep-alive`,
	`te`,
	`trailer`,
	`upgrade`,
	`proxy-authenticate`,
	`proxy-authorization`,
	`transfer-encoding`
];
function F(e, t, r) {
	let i = { ...e.headers }, a = new Set(P);
	for (let e of [`connection`, `proxy-connection`]) for (let t of String(i[e] || ``).split(`,`)) a.add(t.trim().toLowerCase());
	for (let e of a) delete i[e];
	i.connection = `close`;
	let o = e.statusCode || 502, s = o === 204 || o === 205 || o === 304, c = e.headers[`transfer-encoding`];
	o === 205 ? i[`content-length`] = `0` : o === 204 ? delete i[`content-length`] : c && !s ? (i[`transfer-encoding`] = c, delete i[`content-length`]) : e.headers[`content-length`] !== void 0 && (i[`content-length`] = e.headers[`content-length`]);
	let l = !s && /(?:^|,)\s*chunked\s*$/i.test(c || ``) ? new Transform({
		transform(e, t, n) {
			n(null, e.length === 0 ? void 0 : Buffer.concat([
				Buffer.from(`${e.length.toString(16)}\r\n`),
				e,
				Buffer.from(`\r
`)
			]));
		},
		flush(e) {
			e(null, Buffer.from(`0\r
\r
`));
		}
	}) : void 0, u = !1, d = () => {
		u = !0, e.destroy(), l?.destroy();
	}, f = (e) => {
		u || (d(), t.destroy(), r(e));
	};
	t.once(`close`, d), e.once(`error`, f), l?.once(`error`, f), t.write(v$1(`HTTP/${e.httpVersion} ${o} ${e.statusMessage}`, i), `latin1`), o === 205 ? (d(), t.end()) : l ? e.pipe(l).pipe(t) : e.pipe(t);
}
var I = [
	T$1((e, t) => {
		if (e.method !== `GET` || !e.headers.upgrade || e.headers.upgrade.toLowerCase() !== `websocket`) return t.destroy(), !0;
	}),
	T$1((e, t, n) => {
		if (!n.xfwd) return;
		let r = {
			for: e.connection.remoteAddress || e.socket.remoteAddress,
			port: y$1(e),
			proto: b$1(e) ? `wss` : `ws`
		};
		for (let t of [
			`for`,
			`port`,
			`proto`
		]) {
			let n = `x-forwarded-` + t;
			!e.headers[n] && r[t] !== void 0 && (e.headers[n] = r[t]);
		}
	}),
	T$1((e, t, n, i, o, s) => {
		let c = !1;
		_$1(t), o && o.length > 0 && t.unshift(o), t.on(`error`, u);
		let l = (d$2.test(n.target.protocol || `http`) ? nodeHTTPS : nodeHTTP).request(h$2(n.ssl || {}, n, e));
		i && i.emit(`proxyReqWs`, l, e, t, n, o), l.on(`error`, f), l.on(`response`, function(e) {
			e.upgrade || (!t.destroyed && t.writable ? F(e, t, f) : e.resume());
		}), l.on(`upgrade`, function(e, n, r) {
			n.on(`error`, f), n.on(`end`, function() {
				i.emit(`close`, e, n, r);
			}), t.removeListener(`error`, u), t.on(`error`, function() {
				n.end();
			}), _$1(n), r && r.length > 0 && n.unshift(r), t.write(v$1(`HTTP/1.1 101 Switching Protocols`, e.headers)), n.pipe(t).pipe(n), i.emit(`open`, n), i.emit(`proxySocket`, n);
		}), N(l, t, n.upgradeTimeout, (e) => {
			c = !0, p(e);
		}), l.end();
		function u(e) {
			c || p(e), l.destroy();
		}
		function f(e) {
			c || p(e), t.end();
		}
		function p(n) {
			s ? s(n, e, t) : i.emit(`error`, n, e, t);
		}
	})
];
var L = class extends EventEmitter {
	_server;
	_webPasses = [...M];
	_wsPasses = [...I];
	options;
	web;
	ws;
	constructor(e = {}) {
		super(), this.options = e || {}, this.options.prependPath = e.prependPath !== !1, this.web = z(`web`, this), this.ws = z(`ws`, this);
	}
	listen(e, t, n) {
		let i = (e, t) => this.web(e, t);
		if (this.options.http2) {
			if (!this.options.ssl) throw Error(`HTTP/2 requires ssl option`);
			this._server = nodeHTTP2.createSecureServer({
				...this.options.ssl,
				allowHTTP1: !0
			}, i);
		} else this._server = this.options.ssl ? nodeHTTPS.createServer(this.options.ssl, i) : nodeHTTP.createServer(i);
		return this.options.ws && this._server.on(`upgrade`, (e, t, n) => {
			this.ws(e, t, this.options, n).catch(() => {});
		}), this._server.listen(e, t, n), this;
	}
	close(e) {
		this._server && this._server.close((...t) => {
			this._server = void 0, e && Reflect.apply(e, void 0, t);
		});
	}
	before(e, t, n) {
		if (e !== `ws` && e !== `web`) throw Error("type must be `web` or `ws`");
		let r = this._getPasses(e), i = !1;
		for (let [e, n] of r.entries()) n.name === t && (i = e);
		if (i === !1) throw Error(`No such pass`);
		r.splice(i, 0, n);
	}
	after(e, t, n) {
		if (e !== `ws` && e !== `web`) throw Error("type must be `web` or `ws`");
		let r = this._getPasses(e), i = !1;
		for (let [e, n] of r.entries()) n.name === t && (i = e);
		if (i === !1) throw Error(`No such pass`);
		r.splice(i++, 0, n);
	}
	_getPasses(e) {
		return e === `ws` ? this._wsPasses : this._webPasses;
	}
};
function R(e = {}) {
	return new L(e);
}
function z(e, t) {
	return function(n, r, i, a) {
		let o = {
			...i,
			...t.options
		};
		for (let e of [`target`, `forward`]) typeof o[e] == `string` && (o[e] = new URL(o[e]));
		if (!o.target && !o.forward) return this.emit(`error`, Error(`Must provide a proper URL as target`)), Promise.resolve();
		let s, c, l = new Promise((e, t) => {
			s = e, c = t;
		});
		r.on(`close`, () => {
			s();
		}), r.on(`error`, (n) => {
			e === `ws` && t.listenerCount(`error`) > 0 || c(n);
		});
		for (let i of t._getPasses(e)) {
			let e;
			try {
				e = i(n, r, o, t, a, (e, i, a, o) => {
					t.listenerCount(`error`) > 0 ? (t.emit(`error`, e, n, r, o), s()) : c(e);
				});
			} catch (e) {
				t.listenerCount(`error`) > 0 ? (t.emit(`error`, e, n, r, o.target || o.forward), s()) : c(e);
				break;
			}
			if (e) {
				s();
				break;
			}
		}
		return l;
	};
}
async function B(e, n, r, a) {
	let s = S$1(e), c = !1, l = ``;
	if (typeof e == `string` && !e.startsWith(`unix:`)) {
		let t = new URL(e);
		c = d$2.test(t.protocol), t.pathname && t.pathname !== `/` && (l = t.pathname);
	}
	let f, p;
	n instanceof Request ? (f = new URL(n.url), p = {
		...V(n),
		...V(r)
	}) : (f = new URL(n), p = V(r)), p = {
		redirect: `manual`,
		...p
	}, p.body && (p.duplex = `half`);
	let m = f.pathname + f.search, h = l ? g$2(l, m) : m, _ = {};
	if (p.headers) {
		if (!(p.headers instanceof Headers) && !Array.isArray(p.headers)) Object.assign(_, p.headers);
		else for (let [e, t] of p.headers) {
			let n = _[e];
			_[e] = n === void 0 ? t : Array.isArray(n) ? [...n, t] : [n, t];
		}
	}
	if (a?.xfwd && (_[`x-forwarded-for`] ||= f.hostname, _[`x-forwarded-port`] ||= f.port || (f.protocol === `https:` ? `443` : `80`), _[`x-forwarded-proto`] ||= f.protocol.replace(`:`, ``), _[`x-forwarded-host`] ||= f.host), a?.changeOrigin) {
		if (s.socketPath) _.host = `localhost`;
		else {
			let e = s.host || `localhost`, t = s.port;
			_.host = t && t !== (c ? 443 : 80) ? `${e}:${t}` : e;
		}
	}
	let v = typeof a?.followRedirects == `number` ? a.followRedirects : a?.followRedirects ? 5 : 0, y = v > 0 ? await U(p.body) : H(p.body), b = a?.agent === void 0 ? c ? u$2.https : u$2.http : a.agent || !1, x = await G(c ? request$1 : request, p.method || `GET`, h, _, s, y, {
		signal: p.signal || void 0,
		agent: b,
		timeout: a?.timeout,
		ssl: a?.ssl,
		maxRedirects: v,
		redirectCount: 0,
		originalHeaders: _
	}), C = [], w = x.rawHeaders;
	for (let e = 0; e < w.length; e += 2) {
		let t = w[e], n = t.toLowerCase();
		n !== `transfer-encoding` && n !== `keep-alive` && n !== `connection` && C.push([t, w[e + 1]]);
	}
	let T = x.statusCode !== 204 && x.statusCode !== 304, E = {
		status: x.statusCode,
		statusText: x.statusMessage,
		headers: C
	};
	return a?.Response ? new a.Response(T ? x : null, E) : new Response(T ? Readable.toWeb(x) : null, E);
}
function V(e) {
	if (e) return e instanceof Request ? {
		method: e.method,
		headers: e.headers,
		body: e.body,
		duplex: e.body ? `half` : void 0
	} : e;
}
function H(e) {
	if (e) return typeof e == `string` || e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? Buffer.from(e) : e instanceof ReadableStream ? Readable.fromWeb(e) : e instanceof Blob ? Readable.fromWeb(e.stream()) : Buffer.from(String(e));
}
async function U(e) {
	if (e) {
		if (typeof e == `string` || e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return Buffer.from(e);
		if (e instanceof ReadableStream) {
			let n = Readable.fromWeb(e), r = [];
			for await (let e of n) r.push(typeof e == `string` ? Buffer.from(e) : e);
			return Buffer.concat(r);
		}
		return e instanceof Blob ? Buffer.from(await e.arrayBuffer()) : Buffer.from(String(e));
	}
}
var W = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
function G(e, n, r, a, s, c, l) {
	return f$2(a), new Promise((u, f) => {
		let m = {
			method: n,
			path: r,
			headers: a,
			agent: l.agent
		};
		s.socketPath ? m.socketPath = s.socketPath : (m.hostname = s.host || `localhost`, m.port = s.port), l.signal && (m.signal = l.signal), l.ssl && Object.assign(m, l.ssl);
		let h = e(m, (e) => {
			let a = e.statusCode;
			if (p$2(h, e, c instanceof Readable ? c : void 0), l.maxRedirects > 0 && W.has(a) && l.redirectCount < l.maxRedirects && e.headers.location) {
				e.resume();
				let t = new URL(r, `http://${s.host || `localhost`}:${s.port || 80}`), p = new URL(e.headers.location, t), m = d$2.test(p.protocol), h = a === 307 || a === 308, g = h ? n : `GET`, _ = { ...l.originalHeaders };
				_.host = p.host, p.host !== t.host && (delete _.authorization, delete _.cookie), h || (delete _[`content-length`], delete _[`content-type`], delete _[`transfer-encoding`]), G(m ? request$1 : request, g, p.pathname + p.search, _, {
					host: p.hostname,
					port: Number(p.port) || (m ? 443 : 80)
				}, h ? c : void 0, {
					...l,
					redirectCount: l.redirectCount + 1
				}).then(u, f);
			} else u(e);
		});
		h.on(`error`, f), l.timeout && h.setTimeout(l.timeout, () => {
			h.destroy(Error(`Proxy request timed out`));
		}), c instanceof Readable ? (c.on(`error`, (e) => {
			h.destroy(e), f(e);
		}), c.pipe(h)) : c ? h.end(c) : h.end();
	});
}
function K(e, t, n, r, a) {
	let s = S$1(e), c = !1;
	if (typeof e == `string` && !e.startsWith(`unix:`) && (c = d$2.test(new URL(e).protocol)), t.method !== `GET` || t.headers.upgrade?.toLowerCase() !== `websocket`) return n.destroy(), Promise.reject(Error(`Not a valid WebSocket upgrade request`));
	if (a?.xfwd !== !1) {
		let e = t.headers[`x-forwarded-for`], n = t.headers[`x-forwarded-port`], r = t.headers[`x-forwarded-proto`];
		t.headers[`x-forwarded-for`] = `${e ? `${e},` : ``}${t.socket?.remoteAddress}`, t.headers[`x-forwarded-port`] = `${n ? `${n},` : ``}${y$1(t)}`, t.headers[`x-forwarded-proto`] = `${r ? `${r},` : ``}${b$1(t) ? `wss` : `ws`}`;
	}
	let l = q(s, c), u = {
		...a,
		target: l,
		prependPath: a?.prependPath !== !1
	}, f = h$2(u.ssl || {}, u, t), p = n;
	return new Promise((e, t) => {
		let n = !1;
		_$1(p), r && r.length > 0 && p.unshift(r), p.once(`error`, c);
		let s = (d$2.test(l.protocol) ? request$1 : request)(f);
		s.once(`error`, u), s.once(`response`, (e) => {
			e.upgrade || (!p.destroyed && p.writable ? F(e, p, u) : e.resume(), n || (n = !0, t(Error(`Upstream server did not upgrade the connection`))));
		}), s.once(`upgrade`, (t, r, i) => {
			r.once(`error`, u), p.removeListener(`error`, c), p.once(`error`, () => {
				r.end();
			}), _$1(r), i && i.length > 0 && r.unshift(i), p.write(v$1(`HTTP/1.1 101 Switching Protocols`, t.headers)), r.pipe(p).pipe(r), n = !0, e(r);
		}), N(s, p, a?.upgradeTimeout, u), s.end();
		function c(e) {
			s.destroy(), n || (n = !0, t(e));
		}
		function u(e) {
			p.end(), n || (n = !0, t(e));
		}
	});
}
function q(e, t = !1) {
	let n = t ? `https` : `http`;
	if (e.socketPath) {
		let t = new URL(`${n}://unix`);
		return t.socketPath = e.socketPath, t;
	}
	return new URL(`${n}://${e.host || `localhost`}${e.port ? `:${e.port}` : ``}`);
}
// node_modules/nitro/dist/_libs/cookie-es.mjs
function e$2(e, t, n) {
	let r = e.indexOf(`;`, t);
	return r === -1 ? n : r;
}
function t$2(e, t, n) {
	let r = e.indexOf(`=`, t);
	return r < n ? r : -1;
}
function n$2(e, t, n) {
	if (t === n) return ``;
	let r = t, i = n;
	do {
		let t = e.charCodeAt(r);
		if (t !== 32 && t !== 9) break;
	} while (++r < i);
	for (; i > r;) {
		let t = e.charCodeAt(i - 1);
		if (t !== 32 && t !== 9) break;
		i--;
	}
	return e.slice(r, i);
}
var r$2 = (() => {
	let e = function() {};
	return e.prototype = Object.create(null), e;
})();
function i$2(i, o) {
	let s = new r$2(), c = i.length;
	if (c < 2) return s;
	let l = o?.decode || a$2, u = o?.allowMultiple || !1, d = 0;
	do {
		let r = t$2(i, d, c);
		if (r === -1) break;
		let a = e$2(i, d, c);
		if (r > a) {
			d = i.lastIndexOf(`;`, r - 1) + 1;
			continue;
		}
		let f = n$2(i, d, r);
		if (o?.filter && !o.filter(f)) {
			d = a + 1;
			continue;
		}
		let p = l(n$2(i, r + 1, a));
		if (u) {
			let e = s[f];
			e === void 0 ? s[f] = p : Array.isArray(e) ? e.push(p) : s[f] = [e, p];
		} else s[f] === void 0 && (s[f] = p);
		d = a + 1;
	} while (d < c);
	return s;
}
function a$2(e) {
	if (!e.includes(`%`)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}
// node_modules/nitro/dist/_libs/rangi.mjs
var e$1 = [
	`deleted`,
	`err`,
	`var`,
	`section`,
	`kwd`,
	`class`,
	`cmnt`,
	`insert`,
	`type`,
	`func`,
	`bool`,
	`num`,
	`oper`,
	`str`,
	`esc`,
	`bracket`
];
var t$1 = (t) => typeof t == `number` ? e$1[t] : t;
function n$1(e, r, i, a) {
	try {
		let o, s, c = {}, l, u, d = [], f = 0, p = typeof r == `string`, m = p ? a?.[r] : 0, h = p ? Array.isArray(m) ? { default: m } : m : {
			default: r[2],
			type: r[1]
		}, g = t$1(h.type), _ = [...h.default];
		for (; f < e.length;) {
			for (c.index = null, o = _.length; o-- > 0;) {
				if (s = _[o], d[o] === void 0 || d[o].match.index < f) {
					if (s[0].lastIndex = f, l = s[0].exec(e), l === null) {
						_.splice(o, 1), d.splice(o, 1);
						continue;
					}
					d[o] = {
						match: l,
						lastIndex: s[0].lastIndex
					};
				}
				d[o].match[0] && (d[o].match.index <= c.index || c.index === null) && (c = {
					part: s,
					index: d[o].match.index,
					match: d[o].match[0],
					end: d[o].lastIndex
				});
			}
			if (c.index === null) break;
			i(e.slice(f, c.index), g), f = c.end, u = c.part[2], u ? n$1(c.match, typeof u == `string` ? u : typeof u == `function` ? u(c.match) : c.part, i, a) : i(c.match, t$1(c.part[1]));
		}
		i(e.slice(f, e.length), g);
	} catch {
		i(e);
	}
}
function r$1(e, t) {
	let r = [];
	return n$1(e, t.lang ?? `plain`, (e, t) => {
		e && r.push(t ? {
			text: e,
			type: t
		} : { text: e });
	}, t.languages), r;
}
var i$1 = [/(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g, 11];
var a$1 = [/(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g, 13];
var o$1 = [/[{}[\]()]/g, 15];
var s$1 = `[:A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�][:A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�\\-\\.0-9·̀-ͯ‿-⁀]*`;
var c$1 = `(\\s+${s$1}\\s*(=\\s*([^"'>\\s][^>\\s]*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?)*\\s*`;
var l$1 = [
	RegExp(`<[/!?]?${s$1}${c$1}[/!?]?>`, `g`),
	,
	[
		[
			RegExp(`^<[/!?]?${s$1}`, `g`),
			2,
			[[/^<[/!?]?/g, 12]]
		],
		[
			/=\s*([^"'>\s][^>\s]*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
			13,
			[[/^=/g, 12]]
		],
		[/[/!?]?>/g, 12],
		[RegExp(s$1, `g`), 5]
	]
];
var u$1 = [
	[
		/<!--[^]*?-->/g,
		,
		`todo`
	],
	[/<!\[CDATA\[[\s\S]*?\]\]>/gi, 5],
	l$1,
	[
		RegExp(`<\\?${s$1}([^?]|\\?[^?>])*\\?+>`, `g`),
		13,
		[[
			RegExp(`^<\\?${s$1}`, `g`),
			2,
			[[/^<\?/g, 12]]
		], [/\?+>$/g, 12]]
	],
	[/&(#x?)?[\da-z]{1,8};/gi, 2]
];
var d$1 = `[^{}]*(?:\\{[^{}]*\\}[^{}]*)*\\}`;
var f$1 = `\\{${d$1}`;
`${f$1}`;
var p$1 = [/\$\w+|\${[^}]*}|\$\([^)]*\)/g, 2];
var m$1 = [
	[
		/#.*/g,
		,
		`todo`
	],
	[
		/(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
		13,
		[p$1]
	],
	[/(?<=\s|^)\.*\/[a-z/_.-]+/gi, 12],
	[/\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g, 4],
	i$1,
	[/(?<=(^|\||&&|;)\s*)[a-z_.-]+(?=\s|$)/gim, 9],
	[/(?<=\s|^)(true|false)(?=\s|$)/g, 10],
	[/[=<>!]+/g, 12],
	[/(?<=\s|^)[\w_]+(?=\s*=)/g, 2],
	p$1,
	o$1
];
var h$1 = `\\$\\{(?:[^{}'"\\r\\n]|'(?:\\\\[^]|[^'\\r\\n])*'|"(?:\\\\[^]|[^"\\r\\n])*"|\\{[^{}]*\\})*\\}`;
RegExp(`${h$1}|\\$\\w+`, `g`), new class {
	lastIndex = 0;
	exec(e) {
		let t = e.indexOf(`/*`, this.lastIndex), n = 1, r = t + 2;
		if (t < 0) return null;
		for (; r < e.length && n;) {
			let t = e.startsWith(`/*`, r) ? 1 : e.startsWith(`*/`, r) ? -1 : 0;
			n += t, r += t ? 2 : 1;
		}
		return this.lastIndex = r, {
			index: t,
			0: e.slice(t, r)
		};
	}
}(), RegExp(`(["'])(?:\\\\[^]|${h$1}|(?!\\1)[^\\r\\n\\\\])*\\1?`, `g`), [...m$1], [
	(RegExp(`<style${c$1}>[^]*?</style\\s*>`, `g`), RegExp(`^<style${c$1}>`, `g`), l$1[2], RegExp(`${l$1[0]}|[^]*(?=</style\\s*>$)`, `g`)),
	(RegExp(`<script${c$1}>[^]*?<\/script\\s*>`, `g`), RegExp(`^<script${c$1}>`, `g`), l$1[2], RegExp(`${l$1[0]}|[^]*(?=<\/script\\s*>$)`, `g`)),
	...u$1
];
var g$1 = [
	[/(?<=[{,]\s*)(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g],
	[
		/\/\*\*((?!\*\/)[^])*(\*\/)?/g,
		,
		`jsdoc`
	],
	[
		/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
		,
		`todo`
	],
	a$1,
	[
		/`((?!`)[^]|\\[^])*`?/g,
		,
		`js_template_literals`
	],
	[/=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g, 4],
	[
		/\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
		,
		`regex`
	],
	i$1,
	[/\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g, 11],
	[/\b(true|false)\b/g, 10],
	[/[/*+:?&|%^~=!,<>.^-]+/g, 12],
	[/\b[A-Z][\w_]*\b/g, 5],
	[/[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}[\])]+\)? =>|function\b)))/g, 9],
	o$1
];
var _ = [[
	new class {
		lastIndex = 0;
		exec(e) {
			let t = this.lastIndex, n, r = (n) => {
				for (; ++t < e.length - 2;) if (e[t] == `{`) r();
				else if (e[t] == `}`) return;
			};
			for (; t < e.length; ++t) if (e[t - 1] != `\\` && e[t] == `$` && e[t + 1] == `{`) return n = t++, r(t), this.lastIndex = t + 1, {
				index: n,
				0: e.slice(n, t + 1)
			};
			return null;
		}
	}(),
	,
	[[/^\${|}$/g, 4], [
		/(?!^\$|{)[^]+(?=}$)/g,
		,
		`js`
	]]
]];
var v = [
	[/\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g, 1],
	[/\bIDEA\b/g, 5],
	[/\b(CHANGED|FIX|CHANGE)\b/g, 7],
	[/\bQUESTION\b/g, 12]
];
var y = [
	[/@\w+/g, 4],
	[/{[\w\s|<>,.@[\]]+}/g, 5],
	[/\[[\w\s="']+\]/g, 2],
	...v
];
var b = [
	[
		/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
		,
		`todo`
	],
	[/(("|')((?!\2)[^\r\n\\]|\\[^])*\2|[a-zA-Z]\w*)(?=\s*:)/g, 2],
	a$1,
	i$1,
	[/\b(null|NaN|Infinity)\b/g, 11],
	[/\b(true|false)\b/g, 10],
	o$1
];
`${f$1}`, [...g$1], new class {
	lastIndex = 0;
	exec(e) {
		let t = e.indexOf(`/*`, this.lastIndex);
		if (t < 0) return null;
		let n = 0, r = t;
		for (; r < e.length;) if (e[r] == `/` && e[r + 1] == `*`) n++, r += 2;
		else if (e[r] == `*` && e[r + 1] == `/`) {
			if (r += 2, !--n) break;
		} else r++;
		return this.lastIndex = r, {
			index: t,
			0: e.slice(t, r)
		};
	}
}(), a$1[0];
var x = [
	[
		/^(?!\/).*/gm,
		,
		`todo`
	],
	[/\[((?!\])[^\\]|\\.)*\]/g, 11],
	[/\||\^|\$|\\.|\w+($|\r|\n)/g, 4],
	[/\*|\+|\{\d+,\d+\}/g, 2]
];
RegExp(`\\{[#:/@]${d$1}`, `g`);
var S = (e) => [
	RegExp(String.raw`\\${e}\((?:[^()]|\([^()]*\))*\)`, `g`),
	14,
	[[
		RegExp(String.raw`(?<=^\\${e}\()[^]*(?=\)$)`, `g`),
		,
		`swift`
	]]
];
S(``), S(`#+`), [...v];
var C = [
	[/:\s*(any|void|number|boolean|string|object|never|enum)\b/g, 8],
	[/\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g, 4],
	...g$1
];
[...C];
var w = {
	default: _,
	type: 13
};
var T = {
	default: y,
	type: 6
};
var E = {
	default: x,
	type: 12
};
var D = {
	default: v,
	type: 6
};
// node_modules/nitro/dist/_dev.mjs
function createVFSHandler(nitro) {
	return defineHandler(async (event) => {
		if (!isLocalDevRequest(event)) throw new HTTPError({
			statusText: "Forbidden IP",
			status: 403
		});
		const url = event.context.params?.[0] || "";
		const isJson = url.endsWith(".json") || event.req.headers.get("accept")?.includes("application/json");
		const id = decodeURIComponent(url.replace(/^(\.json)?\/?/, "") || "");
		if (id && !nitro.vfs.has(id)) throw new HTTPError({
			message: "File not found",
			status: 404
		});
		const content = id ? await nitro.vfs.get(id)?.render() : void 0;
		if (isJson) return {
			rootDir: nitro.options.rootDir,
			entries: [...nitro.vfs.keys()].map((id) => ({
				id,
				path: "/_vfs.json/" + encodeURIComponent(id)
			})),
			current: id ? {
				id,
				content
			} : null
		};
		const directories = { [nitro.options.rootDir]: {} };
		const fpaths = [...nitro.vfs.keys()];
		for (const item of fpaths) {
			const segments = item.replace(nitro.options.rootDir, "").split("/").filter(Boolean);
			let currentDir = item.startsWith(nitro.options.rootDir) ? directories[nitro.options.rootDir] : directories;
			for (const segment of segments) {
				if (!currentDir[segment]) currentDir[segment] = {};
				currentDir = currentDir[segment];
			}
		}
		const generateHTML = (directory, path = []) => Object.entries(directory).map(([fname, value = {}]) => {
			const subpath = [...path, fname];
			const key = subpath.join("/");
			const encodedUrl = encodeURIComponent(key);
			const linkClass = url === `/${encodedUrl}` ? "bg-gray-700 text-white" : "hover:bg-gray-800 text-gray-200";
			return Object.keys(value).length === 0 ? `
            <li class="flex flex-nowrap">
              <a href="/_vfs/${encodedUrl}" class="w-full text-sm px-2 py-1 border-b border-gray-10 ${linkClass}">
                ${fname}
              </a>
            </li>
            ` : `
            <li>
              <details ${url.startsWith(`/${encodedUrl}`) ? "open" : ""}>
                <summary class="w-full text-sm px-2 py-1 border-b border-gray-10 hover:bg-gray-800 text-gray-200">
                  ${fname}
                </summary>
                <ul class="ml-4">
                  ${generateHTML(value, subpath)}
                </ul>
              </details>
            </li>
            `;
		}).join("");
		const rootDirectory = directories[nitro.options.rootDir];
		delete directories[nitro.options.rootDir];
		const files = `
      <div class="h-full overflow-auto border-r border-gray:10">
        <p class="text-white text-bold text-center py-1 opacity-50">Virtual Files</p>
        <ul class="flex flex-col">${generateHTML(rootDirectory, [nitro.options.rootDir]) + generateHTML(directories)}</ul>
      </div>
      `;
		const file = id ? editorTemplate({
			readOnly: true,
			language: id.endsWith("html") ? "html" : "javascript",
			theme: "vs-dark",
			value: content,
			wordWrap: "wordWrapColumn",
			wordWrapColumn: 80
		}) : `
        <div class="w-full h-full flex opacity-50">
          <h1 class="text-white m-auto">Select a virtual file to inspect</h1>
        </div>
      `;
		event.res.headers.set("Content-Type", "text/html; charset=utf-8");
		return `
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
  <link rel="stylesheet" data-name="vs/editor/editor.main" href="${vsUrl}/editor/editor.main.min.css">
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>
  <style>
    html {
      background: #1E1E1E;
      color: white;
    }
    [un-cloak] {
      display: none;
    }
  </style>
</head>
<body class="bg-[#1E1E1E]">
  <div un-cloak class="h-screen grid grid-cols-[300px_1fr]">
    ${files}
    ${file}
  </div>
</body>
</html>`;
	});
}
var monacoUrl = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.0/min`;
var vsUrl = `${monacoUrl}/vs`;
var editorTemplate = (options) => `
<div id="editor" class="min-h-screen w-full h-full"></div>
<script src="${vsUrl}/loader.min.js"><\/script>
<script>
  require.config({ paths: { vs: '${vsUrl}' } })

  const proxy = URL.createObjectURL(new Blob([\`
    self.MonacoEnvironment = { baseUrl: '${monacoUrl}' }
    importScripts('${vsUrl}/base/worker/workerMain.min.js')
  \`], { type: 'text/javascript' }))
  window.MonacoEnvironment = { getWorkerUrl: () => proxy }

  setTimeout(() => {
    require(['vs/editor/editor.main'], function () {
      monaco.editor.create(document.getElementById('editor'), ${JSON.stringify(options)})
    })
  }, 0);
<\/script>
`;
function createDevProxy(defaults = {}) {
	const opts = {
		xfwd: true,
		...defaults
	};
	const proxy = R(opts);
	const nodeHandler = fromNodeHandler((req, res) => proxy.web(req, res));
	let wsHooks;
	return {
		proxy,
		async handleEvent(event) {
			try {
				if (event.runtime?.node?.res) return await nodeHandler(event);
				return await proxyWebRequest(event.req, opts);
			} catch (error) {
				event.res.headers.set("refresh", "3");
				throw new HTTPError({
					status: 503,
					message: "Dev server is unavailable.",
					cause: error
				});
			}
		},
		proxyUpgrade(req, socket, head) {
			return proxy.ws(req, socket, {}, head);
		},
		websocket() {
			return wsHooks ??= createWebSocketProxy({
				target: (peer) => {
					const target = parseTarget(opts.target);
					const path = resolveUpstreamPath(opts, target, new URL(peer.request.url));
					return target.socketPath ? `ws+unix://${target.socketPath}:${path}` : `${target.url.protocol.replace(/^http/, "ws")}//${target.url.host}${path}`;
				},
				headers: (peer) => {
					const headers = forwardHeaders(peer.request.headers);
					if (opts.xfwd) setForwardedHeaders(headers, {
						url: peer.request.url,
						ip: peer.remoteAddress,
						ws: true
					});
					for (const [key, value] of Object.entries(opts.headers || {})) headers.set(key, value);
					setBasicAuth(headers, opts.auth);
					return Object.fromEntries(headers);
				}
			});
		}
	};
}
async function createWebSocketProxy(opts) {
	const { createWebSocketProxy } = await import("../_libs/_7.mjs");
	return createWebSocketProxy(opts);
}
function proxyWebRequest(req, opts) {
	const target = parseTarget(opts.target);
	const url = new URL(req.url);
	const headers = new Headers(req.headers);
	if (opts.xfwd) setForwardedHeaders(headers, {
		url,
		ip: req.ip
	});
	for (const [key, value] of Object.entries(opts.headers || {})) headers.set(key, value);
	setBasicAuth(headers, opts.auth);
	const ssl = target.tls || opts.ssl || opts.secure === false ? {
		...target.tls,
		...opts.ssl,
		...opts.secure === false && { rejectUnauthorized: false }
	} : void 0;
	return B(target.addr, url.origin + resolveUpstreamPath(opts, target, url), {
		method: req.method,
		headers,
		body: req.body,
		signal: req.signal
	}, {
		changeOrigin: opts.changeOrigin,
		followRedirects: opts.followRedirects,
		timeout: opts.proxyTimeout,
		agent: opts.agent,
		ssl
	});
}
var tlsKeys = [
	"key",
	"passphrase",
	"pfx",
	"cert",
	"ca",
	"ciphers",
	"secureProtocol"
];
function parseTarget(target) {
	if (!target) throw new Error("[nitro] `devProxy` rule is missing a `target`.");
	let url;
	let socketPath;
	let tls;
	if (typeof target === "string" || target instanceof URL) url = new URL(target);
	else {
		const protocol = target.protocol ? target.protocol.replace(/:?$/, ":") : "http:";
		const hostname = formatHost(target.hostname || target.host || "localhost");
		const port = target.port ? `:${target.port}` : "";
		url = new URL(`${protocol}//${hostname}${port}${target.pathname || ""}`);
		socketPath = target.socketPath;
		for (const key of tlsKeys) if (target[key] !== void 0) (tls ??= {})[key] = target[key];
	}
	const secure = /^(?:https|wss):$/.test(url.protocol);
	const addr = socketPath ? { socketPath } : secure ? url.origin : {
		host: url.hostname.replace(/^\[(.*)\]$/, "$1"),
		port: Number(url.port) || 80
	};
	return {
		url,
		addr,
		socketPath,
		tls
	};
}
function resolveUpstreamPath(opts, target, reqURL) {
	const prepend = opts.prependPath !== false;
	const reqPath = opts.ignorePath ? "" : reqURL.pathname + reqURL.search;
	let path = joinURL(prepend ? target.url.pathname : "", reqPath) || "/";
	const targetSearch = prepend ? target.url.search : "";
	if (targetSearch) path = path.includes("?") ? path.replace("?", `${targetSearch}&`) : path + targetSearch;
	return path;
}
var skipHeaders = /* @__PURE__ */ new Set([
	"host",
	"connection",
	"upgrade",
	"keep-alive",
	"transfer-encoding",
	"sec-websocket-key",
	"sec-websocket-version",
	"sec-websocket-extensions",
	"sec-websocket-protocol",
	"sec-websocket-accept"
]);
function forwardHeaders(input) {
	const headers = new Headers();
	for (const [key, value] of input) if (!skipHeaders.has(key)) headers.append(key, value);
	return headers;
}
function setForwardedHeaders(headers, opts) {
	const url = typeof opts.url === "string" ? new URL(opts.url) : opts.url;
	const secure = /^(?:https|wss):$/.test(url.protocol);
	const values = {
		for: opts.ip,
		port: url.port || (secure ? "443" : "80"),
		proto: opts.ws ? secure ? "wss" : "ws" : secure ? "https" : "http"
	};
	for (const [key, value] of Object.entries(values)) {
		const name = `x-forwarded-${key}`;
		const existing = headers.get(name);
		if (value === void 0 || existing && !opts.append) continue;
		headers.set(name, existing ? `${existing},${value}` : value);
	}
	if (!opts.ws && !headers.has("x-forwarded-host")) headers.set("x-forwarded-host", url.host);
}
function setBasicAuth(headers, auth) {
	if (auth && !headers.has("authorization")) {
		const bytes = new TextEncoder().encode(auth);
		headers.set("authorization", `Basic ${btoa(String.fromCharCode(...bytes))}`);
	}
}
function formatHost(host) {
	return host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
}
var DEVTOOLS_JSON_ROUTE = "/.well-known/appspecific/com.chrome.devtools.json";
function createDevToolsJSONHandler(nitro) {
	let uuid;
	return async (event) => {
		const rootDir = withoutTrailingSlash(nitro.options.rootDir);
		return { workspace: {
			root: isLocalDevRequest(event) ? toDevToolsPath(rootDir) : basename$2(rootDir),
			uuid: await (uuid ??= getWorkspaceUUID(nitro))
		} };
	};
}
async function getWorkspaceUUID(nitro) {
	const uuidFile = join$2(nitro.options.buildDir, "devtools-uuid");
	const cached = await readFile(uuidFile, "utf8").then((contents) => contents.trim(), () => "");
	if (UUID_RE.test(cached)) return cached;
	const uuid = randomUUID();
	try {
		await mkdir(dirname$2(uuidFile), { recursive: true });
		await writeFile(uuidFile, uuid, "utf8");
	} catch (error) {
		nitro.logger.warn(`Failed to persist Chrome DevTools workspace UUID to \`${uuidFile}\`:`, error);
	}
	return uuid;
}
function toDevToolsPath(path) {
	const distro = process.env.WSL_DISTRO_NAME || (process.env.DOCKER_DESKTOP ? "docker-desktop-data" : "");
	if (distro && path.startsWith("/")) return `\\\\wsl.localhost\\${distro}${path.replaceAll("/", "\\")}`;
	return process.platform === "win32" ? path.replaceAll("/", "\\") : path;
}
var UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
function defineErrorHandler(handler) {
	return handler;
}
function createErrorHeaders(error, event, unhandled) {
	const headers = new Headers(unhandled ? {} : error.headers);
	const errHeaders = event.res?.errHeaders;
	if (errHeaders) for (const [name, value] of errHeaders) if (name === "set-cookie") headers.append(name, value);
	else headers.set(name, value);
	return headers;
}
function createSourceMapper() {
	const cache = /* @__PURE__ */ new Map();
	return async (frame) => {
		if (frame.type !== "app" || !frame.file || !frame.line || !frame.col) return;
		let loaded = cache.get(frame.file);
		if (!loaded) {
			loaded = loadSourceMap(frame.file).catch(() => void 0);
			cache.set(frame.file, loaded);
		}
		const sourceMap = await loaded;
		if (!sourceMap) return;
		const entry = sourceMap.map.findEntry(frame.line - 1, frame.col - 1);
		if (!("originalSource" in entry) || !entry.originalSource || entry.generatedLine !== frame.line - 1) return;
		const root = sourceMap.sourceRoot ? sourceMap.sourceRoot.replace(/\/?$/, "/") : "";
		frame.file = /^[a-z]:[\\/]/i.test(entry.originalSource) ? entry.originalSource : globalThis.process.getBuiltinModule("node:url").fileURLToPath(new URL(escapeURLPath(root + entry.originalSource), sourceMap.url));
		frame.line = entry.originalLine + 1;
		frame.col = entry.originalColumn + 1;
		const content = sourceMap.sourcesContent[sourceMap.sources.indexOf(entry.originalSource)];
		frame.source = typeof content === "string" ? content : void 0;
	};
}
async function readFrameSource(frame) {
	if (frame.source !== void 0) return frame.source;
	if (!frame.file || frame.type === "native") return;
	return globalThis.process.getBuiltinModule("node:fs").promises.readFile(frame.file.replace(/\?.*$/, ""), "utf8").catch(() => void 0);
}
async function loadSourceMap(file) {
	const { promises: fs } = globalThis.process.getBuiltinModule("node:fs");
	const { pathToFileURL } = globalThis.process.getBuiltinModule("node:url");
	const fileURL = pathToFileURL(file);
	let url = new URL(fileURL.href + ".map");
	let raw = await fs.readFile(url, "utf8").catch(() => void 0);
	if (!raw) {
		const ref = (await fs.readFile(fileURL, "utf8").catch(() => "")).match(/\/\/[#@] sourceMappingURL=(\S+)\s*$/)?.[1];
		if (!ref) return;
		if (ref.startsWith("data:")) {
			url = fileURL;
			raw = decodeDataURL(ref);
		} else {
			url = new URL(ref, fileURL);
			raw = await fs.readFile(url, "utf8");
		}
	}
	const payload = JSON.parse(raw);
	const { SourceMap } = globalThis.process.getBuiltinModule("node:module");
	return {
		map: new SourceMap(payload),
		url,
		sourceRoot: payload.sourceRoot,
		sources: payload.sources || [],
		sourcesContent: payload.sourcesContent || []
	};
}
function escapeURLPath(path) {
	return path.replace(/[%#?]/g, (c) => encodeURIComponent(c));
}
function decodeDataURL(url) {
	const comma = url.indexOf(",");
	const data = url.slice(comma + 1);
	if (!url.slice(0, comma).endsWith(";base64")) return decodeURIComponent(data);
	return new TextDecoder().decode(Uint8Array.from(atob(data), (c) => c.charCodeAt(0)));
}
var framesCache = /* @__PURE__ */ new WeakMap();
async function loadStackTrace(error) {
	const mapper = createSourceMapper();
	const queue = [error];
	const seen = /* @__PURE__ */ new Set();
	while (queue.length > 0) {
		const err = queue.shift();
		if (!(err instanceof Error) || seen.has(err)) continue;
		seen.add(err);
		queue.push(err.cause, ...err instanceof AggregateError ? err.errors : []);
		if (framesCache.has(err) || typeof err.stack !== "string") continue;
		const frames = parseStack(err.stack);
		for (const frame of frames) {
			await mapper(frame).catch(() => {});
			frame.type = frameType(frame.file);
		}
		framesCache.set(err, frames);
		if (frames.length > 0) {
			const stack = err.message + "\n" + frames.map((frame) => formatFrame(frame)).join("\n");
			try {
				Object.defineProperty(err, "stack", { value: stack });
			} catch {}
		}
	}
}
function getFrames(error) {
	if (!(error instanceof Error)) return [];
	return framesCache.get(error) || parseStack(error.stack || "");
}
function parseStack(stack) {
	const lines = stack.split("\n");
	const start = lines.findIndex((line) => /^\s/.test(line) && FRAME_RE.test(line));
	if (start === -1) return [];
	return lines.slice(start).filter((line) => line.trim()).map((line) => parseFrame(line));
}
function parseFrame(raw) {
	const match = raw.match(FRAME_RE);
	if (!match) return {
		raw,
		type: "native"
	};
	const isAsync = !!match[1];
	const fn = match[2];
	let location = match[3] ?? match[4] ?? "";
	if (location.startsWith("eval at ")) location = location.match(/\((.+?:\d+:\d+)\)/)?.[1] || location;
	const loc = location.match(/^(.+?)(?::(\d+))?(?::(\d+))?$/);
	const frame = {
		raw,
		type: "native",
		fn,
		async: isAsync || void 0
	};
	if (loc && loc[2] && /[/\\]/.test(loc[1])) {
		frame.file = toPath(loc[1]);
		frame.line = Number(loc[2]);
		frame.col = loc[3] ? Number(loc[3]) : void 0;
	}
	frame.type = frameType(frame.file);
	return frame;
}
function formatFrame(frame) {
	if (frame.type === "native" || !frame.file) return frame.raw;
	const location = [
		frame.file,
		frame.line,
		frame.col
	].filter((v) => v !== void 0).join(":");
	const prefix = frame.async ? "    at async " : "    at ";
	return frame.fn ? `${prefix}${frame.fn} (${location})` : `${prefix}${location}`;
}
function frameType(file) {
	if (!file || /^(node|ext|bun|deno):/.test(file)) return "native";
	return /[/\\]node_modules[/\\](?!\.)/.test(file) ? "module" : "app";
}
function displayPath(file) {
	const pkgPath = file.split(/[/\\]node_modules[/\\]/).pop();
	if (pkgPath !== file && !pkgPath.startsWith(".")) return pkgPath.replace(/\\/g, "/");
	return relativePath(file);
}
function relativePath(file) {
	let cwd = globalThis.process?.cwd?.();
	if (!cwd) return file;
	let path = file;
	if (/^(?:[a-z]:|\\\\)/i.test(cwd)) {
		cwd = normalizeWindowsPath(cwd);
		path = normalizeWindowsPath(path);
	}
	if (path.startsWith(cwd) && path[cwd.length] === "/") return "." + path.slice(cwd.length);
	return file;
}
var FRAME_RE = /^\s*at (async )?(?:(.+?) \((.*)\)|(.*))$/;
function toPath(file) {
	if (!file.startsWith("file:")) return file;
	try {
		const { fileURLToPath } = globalThis.process.getBuiltinModule("node:url");
		return fileURLToPath(file);
	} catch {
		return file;
	}
}
function normalizeWindowsPath(path) {
	return path.replace(/\\/g, "/").replace(/^[a-z]:/i, (drive) => drive.toUpperCase());
}
var languages = {
	js: g$1,
	ts: C,
	json: b,
	jsdoc: T,
	js_template_literals: w,
	regex: E,
	todo: D
};
var extToLang = {
	js: "js",
	mjs: "js",
	cjs: "js",
	jsx: "js",
	ts: "ts",
	mts: "ts",
	cts: "ts",
	tsx: "ts",
	json: "json"
};
function highlightLines(code, file) {
	const ext = file?.match(/\.(\w+)(?:\?.*)?$/)?.[1];
	const lang = file ? ext ? extToLang[ext] : "js" : void 0;
	const tokens = lang ? r$1(code, {
		lang,
		languages
	}) : [{ text: code }];
	const lines = [[]];
	for (const { text, type } of tokens) {
		const parts = text.split("\n");
		for (let i = 0; i < parts.length; i++) {
			if (i > 0) lines.push([]);
			const line = lines.at(-1);
			const last = line.at(-1);
			if (parts[i] && last && last.type === type) last.text += parts[i];
			else if (parts[i]) line.push({
				text: parts[i],
				type
			});
		}
	}
	return lines;
}
var MAX_LINE_LENGTH = 1e3;
var MAX_CODE_FRAMES = 10;
var MAX_JSON_HIGHLIGHT = 5e4;
var reasonPhrases = {
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	500: "Internal Server Error",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout"
};
var ansiTokenColors = {
	kwd: "magenta",
	section: "magenta",
	str: "green",
	esc: "green",
	num: "yellow",
	bool: "yellow",
	func: "blue",
	class: "cyan",
	type: "cyan",
	cmnt: "gray",
	bracket: "gray"
};
var lightVars = "color-scheme:light;--sun:none;--moon:inline;--bg:#fff;--fg:#1f2328;--dim:#6e7781;--card:#f6f8fa;--line:#d8dee4;--red:#cf222e;--hl:#ffebe9;--kwd:#cf222e;--str:#0a3069;--num:#0550ae;--fn:#8250df;--type:#953800";
var darkVars = "color-scheme:dark;--sun:inline;--moon:none;--bg:#0d1117;--fg:#e6edf3;--dim:#8d96a0;--card:#161b22;--line:#30363d;--red:#ff7b72;--hl:#3d1d20;--kwd:#ff7b72;--str:#a5d6ff;--num:#79c0ff;--fn:#d2a8ff;--type:#ffa657";
var styles = `
:root{${lightVars}}
@media(prefers-color-scheme:dark){:root:not([data-theme=light]){${darkVars}}}
:root[data-theme=dark]{${darkVars}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:auto;padding:24px 16px 32px}
.block{position:relative}
.copy{position:absolute;z-index:1;top:8px;right:8px;padding:4px 8px;font:12px/16px system-ui,sans-serif;color:var(--dim);background:var(--bg);border:1px solid var(--line);border-radius:6px;cursor:pointer}
.copy:hover{color:var(--fg);border-color:var(--dim)}
.head{display:flex;align-items:flex-start;gap:8px}
.meta{flex:1;display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-height:26px;margin:0;font-size:13px;color:var(--dim)}
.pill{padding:0 8px;border-radius:99px;background:var(--hl);color:var(--red);font:600 12px/20px ui-monospace,monospace}
.reason::after{content:"·";margin-left:8px}
.name{color:var(--red);font-weight:600}
.actions{display:flex;gap:4px}
.actions>.copy{position:static}
.actions>.theme{border-color:transparent;background:none}
.theme .sun{display:var(--sun)}
.theme .moon{display:var(--moon)}
.copy-loc{padding:0;font:inherit;text-align:left;color:var(--dim);background:none;border:0;cursor:pointer}
.copy-loc:hover{color:var(--fg);text-decoration:underline}
.copy-loc svg{margin-left:4px;vertical-align:-2px}
.cp,.done .ok{display:inline-flex;align-items:center;gap:4px}
.ok,.done .cp{display:none}
.done{color:var(--fg)}
.json{border:1px solid var(--line);border-radius:8px}
pre,.code,.frame,td,.request p{font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
h1{margin:12px 0 0;font-size:22px;line-height:1.35;font-weight:600;overflow-wrap:anywhere}
h2{margin:32px 0 8px;font-size:15px}
h3{margin:16px 0 4px;font-size:13px;color:var(--dim)}
.msg{margin:8px 0 0;white-space:pre-wrap;overflow-wrap:anywhere}
.hint{margin:8px 0 0;color:var(--dim)}
.stack{margin:20px 0 0;padding:0;list-style:none;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.frame+.frame{border-top:1px solid var(--line)}
.frame summary,.frame>div{padding:6px 12px;overflow-wrap:anywhere}
.frame summary{cursor:pointer}
.native,.module{opacity:.6}
.loc{color:var(--dim)}
.code{padding:8px 0;background:var(--card);overflow-x:auto;border-top:1px solid var(--line)}
.code>div{padding:0 12px;white-space:pre;min-width:max-content}
.code .hl{background:var(--hl)}
.caret{color:var(--red);font-weight:bold}
.ln{display:inline-block;width:5ch;margin-right:16px;text-align:right;color:var(--dim);user-select:none}
.nested{margin-top:32px;padding-left:16px;border-left:2px solid var(--line)}
.nested h2{margin-top:0}
.nested>.error+.error{margin-top:24px}
.nested h1{margin-top:4px;font-size:17px}
table{width:100%;border-collapse:collapse}
td{padding:4px 8px;border-top:1px solid var(--line);vertical-align:top;overflow-wrap:anywhere}
td:first-child{width:1%;white-space:nowrap;color:var(--dim)}
.request p{margin:0;overflow-wrap:anywhere}
@media(max-width:640px){h1{font-size:18px}td{display:block}td:first-child{width:auto;padding-bottom:0}td+td{padding-top:0;border-top:0}}
.kwd,.section{color:var(--kwd)}
.str,.esc{color:var(--str)}
.num,.bool{color:var(--num)}
.func{color:var(--fn)}
.class,.type{color:var(--type)}
.cmnt,.bracket{color:var(--dim)}
`.trim().replaceAll("\n", "");
var icons = "<svg style=\"display:none\"><symbol id=\"i-sun\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/></symbol><symbol id=\"i-moon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z\"/></symbol><symbol id=\"i-copy\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></symbol><symbol id=\"i-ok\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"M4 12l5 5L20 6\"/></symbol></svg>";
var themeButton = "<button type=\"button\" class=\"copy theme\" title=\"Toggle theme\" aria-label=\"Toggle theme\"><svg class=\"sun\" width=\"14\" height=\"14\"><use href=\"#i-sun\"/></svg><svg class=\"moon\" width=\"14\" height=\"14\"><use href=\"#i-moon\"/></svg></button>";
var pageScript = `
const root = document.documentElement;
try {
  root.dataset.theme = localStorage.getItem("nitro-error-theme") || "";
} catch {}
document.addEventListener("mousedown", (event) => {
  if (event.detail > 1 && event.target.closest("summary")) event.preventDefault();
});
document.addEventListener("click", async (event) => {
  if (event.target.closest(".theme")) {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try {
      localStorage.setItem("nitro-error-theme", root.dataset.theme);
    } catch {}
    return;
  }
  const btn = event.target.closest("button[data-text]");
  if (!btn) return;
  event.preventDefault();
  const text = btn.dataset.text;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  btn.classList.add("done");
  clearTimeout(btn.timer);
  btn.timer = setTimeout(() => btn.classList.remove("done"), 1500);
});
`.trim().replace(/\n\s*/g, "");
async function renderErrorHTML(error, opts = {}) {
	await loadStackTrace(error).catch(() => {});
	const { name, message } = errorInfo(error);
	const title = `${name}: ${message.trim().split("\n")[0].slice(0, 100)}${opts.status ? ` (${opts.status})` : ""}`;
	const reason = opts.statusText || opts.status && reasonPhrases[opts.status];
	const status = opts.status ? `<span class="pill">${esc(String(opts.status))}</span>${reason ? `<span class="reason">${esc(reason)}</span>` : ""}` : "";
	const actions = `<div class="actions">${copyButton((opts.request ? `${opts.request.method} ${opts.request.url}\n\n` : "") + stripColors(await ansiError(error, /* @__PURE__ */ new Set())), {
		title: "Copy error",
		label: true
	})}${themeButton}</div>`;
	const body = await htmlError(error, /* @__PURE__ */ new Set(), {
		status,
		actions
	});
	return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${styles}</style><script>${pageScript}<\/script></head><body>${icons}<main>${body}${opts.request ? htmlRequest(opts.request) : ""}</main></body></html>`;
}
async function renderErrorANSI(error) {
	await loadStackTrace(error).catch(() => {});
	return ansiError(error, /* @__PURE__ */ new Set());
}
async function getCodeFrame(frame, opts = {}) {
	if (!frame.line || frame.type === "native") return;
	const source = await readFrameSource(frame);
	if (!source) return;
	const context = opts.context ?? 5;
	const allLines = source.replace(/\r\n?/g, "\n").replace(/\n$/, "").split("\n");
	if (frame.line > allLines.length || allLines[frame.line - 1].length > MAX_LINE_LENGTH) return;
	const start = Math.max(1, frame.line - context);
	const end = Math.min(allLines.length, frame.line + context);
	const tokenizeStart = Math.max(1, start - 50);
	const lines = highlightLines(allLines.slice(tokenizeStart - 1, end).map((line) => line.slice(0, MAX_LINE_LENGTH)).join("\n"), frame.file);
	return {
		start,
		line: frame.line,
		col: frame.col,
		lines: lines.slice(start - tokenizeStart)
	};
}
async function htmlError(error, seen, head = {}) {
	seen.add(error);
	const { name, message, hint } = errorInfo(error);
	const [summary, ...details] = message.trim().split("\n");
	let html = `<section class="error"><header class="head"><p class="meta">${head.status || ""}<span class="name">${esc(name)}</span></p>${head.actions || ""}</header><h1>${esc(summary || name)}</h1>`;
	if (details.length > 0) html += `<pre class="msg">${esc(details.join("\n"))}</pre>`;
	if (hint) html += `<p class="hint">${esc(hint)}</p>`;
	if (!(error instanceof Error)) return html + "</section>";
	html += await htmlFrames(getFrames(error));
	if (error.cause !== void 0) html += `<h2>Caused by</h2>${htmlJSON(error.cause)}`;
	const errors = error instanceof AggregateError ? error.errors.filter((e) => !seen.has(e)) : [];
	if (errors.length > 0) {
		html += `<div class="nested"><h2>Errors</h2>`;
		for (const item of errors) html += await htmlError(item, seen);
		html += "</div>";
	}
	return html + "</section>";
}
async function htmlFrames(frames) {
	if (frames.length === 0) return "";
	const focus = focusFrame(frames);
	const withCode = new Set([focus, ...frames.filter((f) => f.type === "app").slice(0, MAX_CODE_FRAMES)].filter(Boolean));
	return `<ol class="stack">${(await Promise.all(frames.map(async (frame) => {
		const label = htmlFrameLabel(frame);
		const code = withCode.has(frame) ? await getCodeFrame(frame) : void 0;
		if (!code) return `<li class="frame ${frame.type}"><div>${label}</div></li>`;
		return `<li class="frame ${frame.type}"><details${frame === focus ? " open" : ""}><summary>${label}</summary>${htmlCode(code)}</details></li>`;
	}))).join("")}</ol>`;
}
function htmlJSON(value) {
	const json = toJSON(value);
	const html = highlightLines(json, json.length > MAX_JSON_HIGHLIGHT ? void 0 : "cause.json").map((tokens) => `<div>${htmlTokens(tokens)}</div>`).join("");
	return `<div class="block">${copyButton(json, { label: true })}<div class="code json">${html}</div></div>`;
}
function htmlFrameLabel(frame) {
	if (!frame.file) return `<span class="fn">${esc(frame.raw.trim().replace(/^at /, ""))}</span>`;
	const pos = [frame.line, frame.col].filter(Boolean).join(":");
	const location = `${displayPath(frame.file)}${pos ? `:${pos}` : ""}`;
	const fn = `<span class="fn">${frame.async ? "async " : ""}${esc(frame.fn || "<anonymous>")}</span>`;
	if (frame.type === "native") return `${fn} <span class="loc">${esc(location)}</span>`;
	return `${fn} ${copyButton(`${relativePath(frame.file)}${pos ? `:${pos}` : ""}`, {
		className: "copy-loc",
		title: "Copy path",
		content: esc(location)
	})}`;
}
function htmlCode(code) {
	let html = "";
	for (const [i, tokens] of code.lines.entries()) {
		const n = code.start + i;
		html += `<div${n === code.line ? ` class="hl"` : ""}><span class="ln">${n}</span>${htmlTokens(tokens)}</div>`;
		if (n === code.line && code.col) html += `<div class="caret"><span class="ln"></span>${caretPadding(tokens, code.col)}^</div>`;
	}
	return `<div class="code">${html}</div>`;
}
function htmlTokens(tokens) {
	return tokens.map((t) => t.type ? `<span class="${esc(t.type)}">${esc(t.text)}</span>` : esc(t.text)).join("");
}
function copyButton(text, opts = {}) {
	const { className = "copy", title = "Copy", label, content = "" } = opts;
	const icon = (id) => `<svg width="14" height="14"><use href="#i-${id}"/></svg>`;
	const aria = content ? "" : ` aria-label="${title}"`;
	return `<button type="button" class="${className}" data-text="${esc(text)}" title="${title}"${aria}>${content}<span class="cp">${icon("copy")}${label ? "Copy" : ""}</span><span class="ok">${icon("ok")}${label ? "Copied!" : ""}</span></button>`;
}
function htmlRequest(request) {
	const headers = new Headers(request.headers);
	const cookies = i$2(headers.get("cookie") || "");
	const rows = (entries) => `<table>${entries.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v || "")}</td></tr>`).join("")}</table>`;
	let html = `<section class="request"><h2>Request</h2><p><b>${esc(request.method)}</b> ${esc(request.url)}</p>`;
	html += `<h3>Headers</h3>${rows([...headers.entries()].filter(([k]) => k !== "cookie"))}`;
	if (Object.keys(cookies).length > 0) html += `<h3>Cookies</h3>${rows(Object.entries(cookies))}`;
	return html + "</section>";
}
async function ansiError(error, seen) {
	seen.add(error);
	if (!(error instanceof Error)) return color("red", String(error));
	const lines = [color("bold", color("red", `${error.name || "Error"}: ${error.message}`))];
	const hint = error.hint;
	if (typeof hint === "string") lines.push(color("dim", hint));
	const frames = getFrames(error);
	const focus = focusFrame(frames);
	const code = focus && await getCodeFrame(focus, { context: 2 });
	if (code) lines.push("", ansiCode(code));
	if (frames.length > 0) lines.push("", ...frames.map((frame) => ansiFrame(frame)));
	const nested = [error.cause, ...error instanceof AggregateError ? error.errors : []];
	for (const [i, item] of nested.entries()) if (item !== void 0 && !seen.has(item)) {
		const label = i === 0 ? "[cause]" : `[errors][${i - 1}]`;
		lines.push("", `${color("gray", label)} ${await ansiError(item, seen)}`);
	}
	return lines.join("\n");
}
function ansiFrame(frame) {
	if (!frame.file) return color("gray", `  ${frame.raw.trim()}`);
	const location = displayPath(frame.file) + [frame.line, frame.col].map((n) => n ? `:${n}` : "").join("");
	const at = frame.async ? "at async" : "at";
	if (frame.type !== "app") return color("gray", `  ${at} ${frame.fn ? `${frame.fn} (${location})` : location}`);
	return `  ${color("gray", at)} ${frame.fn ? `${frame.fn} (${color("cyan", location)})` : color("cyan", location)}`;
}
function ansiCode(code) {
	const width = String(code.start + code.lines.length - 1).length;
	const out = [];
	for (const [i, tokens] of code.lines.entries()) {
		const n = code.start + i;
		const isLine = n === code.line;
		const gutter = `${isLine ? color("red", "❯") : " "} ${color("gray", `${String(n).padStart(width)} │`)}`;
		const text = tokens.map((t) => t.type && ansiTokenColors[t.type] ? color(ansiTokenColors[t.type], t.text) : t.text);
		out.push(`  ${gutter} ${text.join("")}`);
		if (isLine && code.col) out.push(`    ${color("gray", `${" ".repeat(width)} │`)} ${caretPadding(tokens, code.col)}${color("red", "^")}`);
	}
	return out.join("\n");
}
function focusFrame(frames) {
	return frames.find((f) => f.type === "app") || frames.find((f) => f.type === "module");
}
function caretPadding(tokens, col) {
	return tokens.map((t) => t.text).join("").slice(0, col - 1).replace(/[^\t]/g, " ");
}
function toJSON(value) {
	const seen = /* @__PURE__ */ new WeakSet();
	return JSON.stringify(value, (_key, v) => {
		if (typeof v === "bigint") return `${v}n`;
		if (typeof v === "function") return `[Function ${v.name || "anonymous"}]`;
		if (typeof v === "symbol") return v.toString();
		if (!v || typeof v !== "object") return v;
		if (seen.has(v)) return "[Circular]";
		seen.add(v);
		if (!(v instanceof Error)) return v;
		return Object.assign({
			name: v.name,
			message: v.message
		}, v, {
			stack: getFrames(v).map((frame) => stripColors(ansiFrame(frame)).trim()),
			errors: v instanceof AggregateError ? v.errors : void 0,
			cause: v.cause
		});
	}, 2) ?? String(value);
}
function errorInfo(error) {
	if (!(error instanceof Error)) return {
		name: "Error",
		message: inspect(error)
	};
	const hint = error.hint;
	return {
		name: error.name || "Error",
		message: error.message,
		hint: typeof hint === "string" ? hint : void 0
	};
}
function inspect(value) {
	const util = globalThis.process?.getBuiltinModule?.("node:util");
	return util ? util.inspect(value) : String(value);
}
function color(format, text) {
	try {
		const { styleText } = globalThis.process.getBuiltinModule("node:util");
		return styleText(format, text, { stream: globalThis.process.stderr });
	} catch {
		return text;
	}
}
function stripColors(text) {
	const util = globalThis.process?.getBuiltinModule?.("node:util");
	return util ? util.stripVTControlCharacters(text) : text;
}
function esc(str) {
	return str.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
var errorHandler = defineErrorHandler(async function defaultNitroErrorHandler(error, event) {
	const res = await defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
});
async function defaultHandler(error, event, opts) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	const url = getRequestURL(event, {
		xForwardedHost: true,
		xForwardedProto: true
	});
	if (status === 404) {
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			statusText: "Found",
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` }),
			body: `Redirecting...`
		};
	}
	await loadStackTrace(error).catch(console.error);
	const displayError = unhandled && error.cause instanceof Error ? error.cause : error;
	if (unhandled && !opts?.silent) {
		const ansiError = await renderErrorANSI(displayError);
		console.error(`[request error] [${event.req.method}] ${url}`);
		console.error(ansiError + "\n");
	}
	const useJSON = opts?.json ?? !event.req.headers.get("accept")?.includes("text/html");
	const headers = createErrorHeaders(error, event, unhandled);
	if (useJSON) {
		headers.set("Content-Type", "application/json; charset=utf-8");
		const jsonBody = typeof error.toJSON === "function" ? error.toJSON() : {
			status,
			statusText,
			message: error.message
		};
		return {
			status,
			statusText,
			headers,
			body: {
				error: true,
				stack: error.stack?.split("\n").map((line) => line.trim()),
				...jsonBody
			}
		};
	}
	headers.set("Content-Type", "text/html; charset=utf-8");
	return {
		status,
		statusText: unhandled ? "" : error.statusText,
		headers,
		body: await renderErrorHTML(displayError, {
			status,
			statusText: unhandled ? "" : error.statusText,
			request: {
				url: url.href,
				method: event.req.method,
				headers: event.req.headers
			}
		})
	};
}
var NitroDevApp = class {
	nitro;
	fetch;
	reloadSignal = new DevReloadSignal();
	#wsProxies;
	#routes = createRouter();
	constructor(nitro, catchAllHandler) {
		this.nitro = nitro;
		const app = this.#createApp(catchAllHandler);
		this.fetch = app.fetch.bind(app);
	}
	#createApp(catchAllHandler) {
		const app = new H3({
			debug: true,
			onError: async (error, event) => {
				const errorHandler$1 = this.nitro.options.devErrorHandler || errorHandler;
				await loadStackTrace(error).catch(() => {});
				return errorHandler$1(error, event, { defaultHandler });
			}
		});
		const reloadRoute = joinURL(this.nitro.options.baseURL, DEV_RELOAD_ROUTE);
		app.get(reloadRoute, (event) => this.reloadSignal.handle(event));
		this.#addRoute("GET", reloadRoute);
		for (const h of this.nitro.options.devHandlers) {
			const handler = toEventHandler(h.handler);
			if (!handler) {
				this.nitro.logger.warn("Invalid dev handler:", h);
				continue;
			}
			if (h.middleware || !h.route) {
				if (h.route) app.use(h.route, handler, { method: h.method });
				else app.use(handler, { method: h.method });
			} else {
				app.on(h.method || "", h.route, handler, { meta: h.meta });
				this.#addRoute(h.method || "", h.route);
			}
		}
		if (this.nitro.options.devServer?.devtoolsJson !== false) {
			const handler = createDevToolsJSONHandler(this.nitro);
			const routes = /* @__PURE__ */ new Set([DEVTOOLS_JSON_ROUTE, joinURL(this.nitro.options.baseURL, DEVTOOLS_JSON_ROUTE)]);
			for (const route of routes) {
				app.get(route, handler);
				this.#addRoute("GET", route);
			}
		}
		app.get("/_vfs/**", createVFSHandler(this.nitro));
		const assertLocalTaskRequest = (event) => {
			if (!isLocalDevRequest(event)) throw new HTTPError({
				statusText: "Forbidden IP",
				status: 403
			});
		};
		app.use("/_nitro/tasks", assertLocalTaskRequest);
		app.use("/_nitro/tasks/**", assertLocalTaskRequest);
		for (const asset of this.nitro.options.publicAssets) {
			const assetBase = joinURL(this.nitro.options.baseURL, asset.baseURL || "/");
			app.use(joinURL(assetBase, "**"), (event) => serveStaticDir(event, {
				dir: asset.dir,
				base: assetBase,
				fallthrough: asset.fallthrough,
				compress: this.nitro.options.compressPublicAssets
			}));
			if (!asset.fallthrough && asset.baseURL && asset.baseURL !== "/") this.#addRoute("", joinURL(assetBase, ":path+"));
		}
		const routes = Object.keys(this.nitro.options.devProxy).sort().reverse();
		for (const route of routes) {
			let opts = this.nitro.options.devProxy[route];
			if (typeof opts === "string") opts = { target: opts };
			const proxy = createDevProxy(opts);
			app.all(route, proxy.handleEvent);
			this.#addRoute("", route);
			if (opts.ws) {
				this.#wsProxies ??= createRouter();
				addRoute(this.#wsProxies, "", route, proxy);
			}
		}
		if (catchAllHandler) app.all("/**", catchAllHandler);
		return app;
	}
	hasRoute(method, path) {
		method = method.toUpperCase();
		return !!(findRoute(this.#routes, method, path) || method === "HEAD" && findRoute(this.#routes, "GET", path));
	}
	#addRoute(method, route) {
		const path = withoutBase(route, this.nitro.options.baseURL);
		if (path !== "/**" && !path.startsWith("/**:")) addRoute(this.#routes, method.toUpperCase(), route);
	}
	proxyUpgrade(req, socket, head) {
		const path = (req.url || "/").split("?")[0];
		const proxy = this.#findWSProxy(path);
		if (!proxy) return false;
		proxy.proxyUpgrade(req, socket, head).catch((error) => {
			this.nitro.logger.error(`Failed to proxy WebSocket upgrade for \`${path}\`:`, error);
			socket.destroy();
		});
		return true;
	}
	resolveWebSocketProxy(req) {
		return this.#findWSProxy(new URL(req.url).pathname)?.websocket();
	}
	#findWSProxy(path) {
		return this.#wsProxies && findRoute(this.#wsProxies, "", path)?.data;
	}
};
function serveStaticDir(event, opts) {
	const dir = resolve$2(opts.dir) + "/";
	const r = (id) => {
		if (!id.startsWith(opts.base) || !extname$3(id)) return;
		const resolved = join$2(dir, id.slice(opts.base.length));
		if (resolved.startsWith(dir)) return resolved;
	};
	const compress = opts.compress === true ? {
		gzip: true,
		brotli: true
	} : opts.compress || {};
	return serveStatic(event, {
		fallthrough: opts.fallthrough,
		getMeta: async (id) => {
			const path = r(id);
			if (!path) return;
			const s = await stat$1(path).catch(() => null);
			if (!s?.isFile()) return;
			const ext = extname$3(path);
			return {
				size: s.size,
				mtime: s.mtime,
				type: src_default.getType(ext) || "application/octet-stream"
			};
		},
		getContents(id) {
			const path = r(id);
			if (!path) return;
			const stream = createReadStream(path);
			const acceptEncoding = isCompressibleFile(path) ? event.req.headers.get("accept-encoding") || "" : "";
			if (compress.brotli && acceptEncoding.includes("br")) {
				event.res.headers.set("Content-Encoding", "br");
				event.res.headers.delete("Content-Length");
				event.res.headers.set("Vary", "Accept-Encoding");
				return toBody(event, stream.pipe(createBrotliCompress()));
			} else if (compress.gzip && acceptEncoding.includes("gzip")) {
				event.res.headers.set("Content-Encoding", "gzip");
				event.res.headers.delete("Content-Length");
				event.res.headers.set("Vary", "Accept-Encoding");
				return toBody(event, stream.pipe(createGzip()));
			}
			return toBody(event, stream);
		}
	});
}
function toBody(event, stream) {
	return event.runtime?.node ? stream : Readable.toWeb(stream);
}
// node_modules/nitro/dist/_chunks/nitro3.mjs
async function startPreview(opts) {
	const { outputDir, buildInfo } = await getBuildInfo({
		rootDir: opts.rootDir,
		outputDir: opts.outputDir
	});
	if (!buildInfo) throw new Error("Cannot load nitro build info. Make sure to build first, or use `nitro start` to run the sources without a build.");
	const info = [
		["Build Directory:", prettyPath(outputDir)],
		["Date:", buildInfo.date && new Date(buildInfo.date).toLocaleString()],
		["Nitro Version:", buildInfo.versions.nitro],
		["Nitro Preset:", buildInfo.preset],
		buildInfo.framework?.name !== "nitro" && ["Framework:", buildInfo.framework?.name + (buildInfo.framework?.version ? ` (v${buildInfo.framework.version})` : "")]
	].filter((i) => i && i[1]);
	consola.box({
		title: " [Build Info] ",
		message: info.map((i) => `- ${i[0]} ${i[1]}`).join("\n")
	});
	if (buildInfo.date) await warnOutdatedBuild(opts.rootDir, buildInfo.date);
	const dotEnvEntries = await loadPreviewDotEnv(opts.rootDir);
	if (dotEnvEntries.length > 0) consola.box({
		title: " [Environment Variables] ",
		message: [
			"Loaded variables from .env files (preview mode only).",
			"Set platform environment variables for production:",
			...dotEnvEntries.map(([key, val]) => ` - ${key}`)
		].join("\n")
	});
	if (buildInfo.preset.includes("cloudflare")) {
		if (!buildInfo.commands?.preview) throw new Error(`No nitro build preview command found for the "${buildInfo.preset}" preset.`);
		return await runPreviewCommand({
			command: buildInfo.commands.preview,
			rootDir: opts.rootDir,
			env: dotEnvEntries
		});
	}
	let fetchHandler = () => Promise.resolve(new Response("Not Found", { status: 404 }));
	if (buildInfo.serverEntry) {
		setUnsetEnv(dotEnvEntries);
		const { loadServerEntry } = await import("../_libs/_33.mjs");
		const entry = await loadServerEntry({
			entry: resolve$2(outputDir, buildInfo.serverEntry),
			...opts.loader
		});
		if (entry.fetch) fetchHandler = entry.fetch;
	}
	if (buildInfo.publicDir) {
		const { staticMiddleware } = await import("../_libs/_34.mjs");
		const staticHandler = staticMiddleware({ dir: join$2(outputDir, buildInfo.publicDir) });
		const originalFetchHandler = fetchHandler;
		fetchHandler = async (req) => {
			const staticRes = await staticHandler(req, () => void 0);
			if (staticRes) return staticRes;
			return originalFetchHandler(req);
		};
	}
	return {
		fetch: fetchHandler,
		async close() {}
	};
}
async function loadPreviewDotEnv(root) {
	const { loadDotenv } = await import("../_.mjs");
	const env = await loadDotenv({
		cwd: root,
		fileName: [
			".env.preview",
			".env.production",
			".env"
		]
	});
	return Object.entries(env).filter(([_key, val]) => val);
}
async function runPreviewCommand(opts) {
	const [arg0, ...args] = opts.command.split(" ");
	consola.info(`Spawning preview server...`);
	consola.info(opts.command);
	console.log("");
	const { getRandomPort, waitForPort } = await import("../_11.mjs");
	const randomPort = await getRandomPort();
	const child = spawn(arg0, [
		...args,
		"--port",
		String(randomPort),
		"--host",
		"localhost"
	], {
		stdio: "inherit",
		cwd: opts.rootDir,
		env: {
			...process.env,
			...Object.fromEntries(opts.env ?? []),
			PORT: String(randomPort)
		}
	});
	const killChild = (signal) => {
		if (child && !child.killed) child.kill(signal);
	};
	for (const sig of ["SIGINT", "SIGHUP"]) process.once(sig, () => {
		killChild(sig);
	});
	child.once("exit", (code) => {
		if (code && code !== 0) consola.error(`[nitro] Preview server exited with code ${code}`);
	});
	await waitForPort(randomPort, {
		retries: 20,
		delay: 500,
		host: "localhost"
	});
	return {
		fetch(req) {
			return B({
				port: randomPort,
				host: "localhost"
			}, req);
		},
		async upgrade(req, socket, head, opts) {
			await K({
				port: randomPort,
				host: "localhost"
			}, req, socket, head, opts);
		},
		async close() {
			killChild("SIGTERM");
		}
	};
}
async function warnOutdatedBuild(rootDir, buildDate) {
	const buildTime = new Date(buildDate).getTime();
	for (const ext of [
		".ts",
		".mts",
		".cts",
		".js",
		".mjs",
		".cjs"
	]) {
		const configPath = join$2(rootDir, `nitro.config${ext}`);
		const mtime = await stat$1(configPath).then((s) => s.mtimeMs, () => void 0);
		if (mtime !== void 0 && mtime > buildTime) {
			consola.warn(`\`${basename$2(configPath)}\` changed after this build. Run \`nitro build\` again, or \`nitro start\` to run the sources without a build.`);
			return;
		}
	}
}
function setUnsetEnv(entries) {
	for (const [key, val] of entries) if (!process.env[key]) process.env[key] = val;
}
// node_modules/nitro/dist/_libs/ultrahtml.mjs
var e = /* @__PURE__ */ new Set([
	`area`,
	`base`,
	`br`,
	`col`,
	`embed`,
	`hr`,
	`img`,
	`input`,
	`keygen`,
	`link`,
	`meta`,
	`param`,
	`source`,
	`track`,
	`wbr`
]);
var t = /* @__PURE__ */ new Set([`script`, `style`]);
var n = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!)([\s\S]*?)(>))/gm;
var r = 64;
var i = 46;
var a = 45;
var o = 58;
var s = 95;
var c = 61;
var l = 34;
var u = 39;
var d = 92;
function f(e) {
	return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || e === r || e === i || e === a || e === o || e === s;
}
function p(e) {
	let t = {};
	if (e) {
		let n = `none`, r, i = ``, a;
		for (let o = 0; o < e.length; o++) {
			let s = e.charCodeAt(o);
			if (n === `none`) f(s) ? (r && (t[r] = i, r = void 0, i = ``), a = o, n = `key`) : s === c && r && (n = `value`);
			else if (n === `key`) f(s) || (r = e.substring(a, o), n = s === c ? `value` : `none`);
			else if (s === l || s === u) {
				let t = s === l ? `"` : `'`, r = o + 1, a = e.indexOf(t, r);
				for (; a > 0 && e.charCodeAt(a - 1) === d;) a = e.indexOf(t, a + 1);
				if (a === -1) break;
				i = e.substring(r, a), o = a, n = `none`;
			}
		}
		n === `key` && a != null && a < e.length && (r = e.substring(a, e.length)), r && (t[r] = i);
	}
	return t;
}
function m(r) {
	let i = typeof r == `string` ? r : r.value, a, o, s, c, l, u, d, f, m, h = [];
	n.lastIndex = 0, o = a = {
		type: 0,
		children: []
	};
	let g = 0;
	function _() {
		c = i.substring(g, n.lastIndex - s[0].length), c && o.children.push({
			type: 2,
			value: c,
			parent: o
		});
	}
	for (; s = n.exec(i);) if (u = s[5] || s[8], d = s[6] || s[9], f = s[7] || s[10], t.has(o.name) && s[2] !== o.name) l = n.lastIndex - s[0].length, o.children.length > 0 && (o.children[0].value += s[0]);
	else {
		if (u === `<!--`) {
			if (l = n.lastIndex - s[0].length, t.has(o.name)) continue;
			m = {
				type: 3,
				value: d,
				parent: o,
				loc: [{
					start: l,
					end: l + u.length
				}, {
					start: n.lastIndex - f.length,
					end: n.lastIndex
				}]
			}, h.push(m), m.parent.children.push(m);
		} else if (u === `<!`) l = n.lastIndex - s[0].length, m = {
			type: 4,
			value: d,
			parent: o,
			loc: [{
				start: l,
				end: l + u.length
			}, {
				start: n.lastIndex - f.length,
				end: n.lastIndex
			}]
		}, h.push(m), m.parent.children.push(m);
		else if (s[1] !== `/`) {
			if (_(), t.has(o.name)) {
				g = n.lastIndex, _();
				continue;
			}
			m = {
				type: 1,
				name: s[2] + ``,
				attributes: p(s[3]),
				parent: o,
				children: [],
				loc: [{
					start: n.lastIndex - s[0].length,
					end: n.lastIndex
				}]
			}, h.push(m), m.parent.children.push(m), s[4] && s[4].indexOf(`/`) > -1 || e.has(m.name) ? (m.loc[1] = m.loc[0], m.isSelfClosingTag = !0) : o = m;
		} else _(), s[2] + `` === o.name ? (m = o, o = m.parent, m.loc.push({
			start: n.lastIndex - s[0].length,
			end: n.lastIndex
		}), c = i.substring(m.loc[0].end, m.loc[1].start), m.children.length === 0 && m.children.push({
			type: 2,
			value: c,
			parent: o
		})) : s[2] + `` === h[h.length - 1].name && h[h.length - 1].isSelfClosingTag === !0 && (m = h[h.length - 1], m.loc.push({
			start: n.lastIndex - s[0].length,
			end: n.lastIndex
		}));
		g = n.lastIndex;
	}
	return c = i.slice(g), o.children.push({
		type: 2,
		value: c,
		parent: o
	}), a;
}
var h = class {
	constructor(e) {
		this.callback = e;
	}
	async visit(e, t, n) {
		if (await this.callback(e, t, n), Array.isArray(e.children)) {
			let t = [];
			for (let n = 0; n < e.children.length; n++) {
				let r = e.children[n];
				t.push(this.visit(r, e, n));
			}
			await Promise.all(t);
		}
	}
};
function g(e, t) {
	return new h(t).visit(e);
}
// node_modules/nitro/dist/_chunks/nitro4.mjs
var allowedExtensions = /* @__PURE__ */ new Set(["", ".json"]);
var linkParents = /* @__PURE__ */ new Map();
var HTML_ENTITIES = {
	"&lt;": "<",
	"&gt;": ">",
	"&amp;": "&",
	"&apos;": "'",
	"&quot;": "\""
};
function escapeHtml(text) {
	return text.replace(/&(lt|gt|amp|apos|quot);/g, (ch) => HTML_ENTITIES[ch] || ch);
}
async function extractLinks(html, from, res, crawlLinks, baseURL = "/") {
	const links = [];
	const _links = [];
	if (crawlLinks) await g(m(html), (node) => {
		if (!node.attributes?.href) return;
		const link = escapeHtml(node.attributes.href);
		if (!decodeURIComponent(link).startsWith("#") && allowedExtensions.has(getExtension(link))) _links.push(link);
	});
	const header = res.headers.get("x-nitro-prerender") || "";
	_links.push(...header.split(",").map((i) => decodeURIComponent(i.trim())));
	for (const link of _links.filter(Boolean)) {
		const _link = parseURL(link);
		if (_link.protocol || _link.host) continue;
		if (!_link.pathname.startsWith("/")) {
			const fromURL = new URL(from, "http://localhost");
			_link.pathname = new URL(_link.pathname, fromURL).pathname;
		}
		links.push(_link.pathname + _link.search);
	}
	for (const _link of links) {
		const link = withoutBase(_link, baseURL);
		const _parents = linkParents.get(link);
		if (_parents) _parents.add(from);
		else linkParents.set(link, /* @__PURE__ */ new Set([from]));
	}
	return links;
}
var EXT_REGEX = /\.[\da-z]+$/;
function getExtension(link) {
	return (parseURL(link).pathname.match(EXT_REGEX) || [])[0] || "";
}
function formatPrerenderRoute(route) {
	let str = `  ├─ ${route.route} (${route.generateTimeMS}ms)`;
	if (route.error) {
		const parents = linkParents.get(route.route);
		const errorColor = colors[route.error.status === 404 ? "yellow" : "red"];
		const errorLead = parents?.size ? "├──" : "└──";
		str += `\n  │ ${errorLead} ${errorColor(route.error.message || "unknown error")}`;
		if (parents?.size) str += `\n${[...parents.values()].map((link) => `  │ └── Linked from ${link}`).join("\n")}`;
	}
	if (route.skip) str += colors.gray(" (skipped)");
	return colors.gray(str);
}
function matchesIgnorePattern(path, pattern) {
	if (typeof pattern === "string") {
		if (!PATTERN_MARKER_RE.test(pattern)) return path.startsWith(pattern);
		let regexp = ignorePatternCache.get(pattern);
		if (!regexp) {
			regexp = routeToRegExp(pattern);
			ignorePatternCache.set(pattern, regexp);
		}
		return regexp.test(path.split("?", 1)[0]);
	}
	if (typeof pattern === "function") return pattern(path) === true;
	if (pattern instanceof RegExp) return pattern.test(path);
	return false;
}
var PATTERN_MARKER_RE = /[*:]/;
var ignorePatternCache = /* @__PURE__ */ new Map();
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
async function prerender(nitro) {
	if (nitro.options.noPublicDir) {
		nitro.logger.warn("Skipping prerender since `noPublicDir` option is enabled.");
		return;
	}
	const routes = new Set(nitro.options.prerender.routes);
	const prerenderRulePaths = Object.entries(nitro.options.routeRules).filter(([path, options]) => options.prerender && !path.includes("*")).map((e) => e[0]);
	for (const route of prerenderRulePaths) routes.add(route);
	await nitro.hooks.callHook("prerender:routes", routes);
	if (routes.size === 0) {
		if (nitro.options.prerender.crawlLinks) routes.add("/");
		else return;
	}
	nitro.logger.info("Initializing prerenderer");
	nitro._prerenderedRoutes = [];
	const prerendererConfig = {
		...nitro.options._config,
		static: false,
		compressPublicAssets: false,
		rootDir: nitro.options.rootDir,
		renderer: nitro.options.renderer,
		services: nitro.options.services,
		virtual: { ...nitro.options.virtual },
		logLevel: 0,
		preset: "nitro-prerender",
		builder: prerenderBuilder(nitro),
		deps: {
			...nitro.options.deps,
			paths: { ...viteDepPaths(nitro) }
		}
	};
	await nitro.hooks.callHook("prerender:config", prerendererConfig);
	const nitroRenderer = await createNitro(prerendererConfig, { c12: { envName: [nitro.options.envName, "prerender"] } });
	nitroRenderer._pageTemplate = nitro._pageTemplate;
	nitroRenderer._serviceLoader = nitro._serviceLoader;
	const prerenderStartTime = Date.now();
	await nitro.hooks.callHook("prerender:init", nitroRenderer);
	await nitroRenderer.routing.sync();
	let path = relative$2(nitro.options.output.dir, nitro.options.output.publicDir);
	if (!path.startsWith(".")) path = `./${path}`;
	nitroRenderer.options.commands.preview = `npx serve ${path}`;
	nitroRenderer.options.output.dir = nitro.options.output.dir;
	const prerenderer = await startPrerenderer(nitroRenderer);
	const routeRules = createRouter();
	for (const [route, rules] of Object.entries(nitro.options.routeRules)) addRoute(routeRules, void 0, route, rules);
	const _getRouteRules = (path) => O$1({}, ...findAllRoutes(routeRules, void 0, path).map((r) => r.data).reverse());
	const generatedRoutes = /* @__PURE__ */ new Set();
	const crawledLinkPaths = /* @__PURE__ */ new Map();
	const failedRoutes = /* @__PURE__ */ new Set();
	const skippedRoutes = /* @__PURE__ */ new Set();
	const displayedLengthWarns = /* @__PURE__ */ new Set();
	const outputByFile = /* @__PURE__ */ new Map();
	const caseInsensitiveFS = await isCaseInsensitiveFS(nitro.options.output.publicDir);
	const outputKey = (filePath) => caseInsensitiveFS ? filePath.toLowerCase() : filePath;
	const publicAssetBases = nitro.options.publicAssets.filter((a) => !!a.baseURL && a.baseURL !== "/" && !a.fallthrough).map((a) => withTrailingSlash(a.baseURL));
	for (const route of routes) {
		const base = publicAssetBases.find((base) => decodePath(route).startsWith(base));
		if (base) nitro.logger.warn(`Skipping prerender of \`${route}\`: \`${base}\` is a public assets directory, which only serves its own files. Move the route out of it.`);
	}
	const scannedPublicAssets = nitro.options.prerender.ignoreUnprefixedPublicAssets ? new Set(await scanUnprefixedPublicAssets(nitro)) : /* @__PURE__ */ new Set();
	const canPrerender = (route = "/") => {
		if (generatedRoutes.has(route) || skippedRoutes.has(route)) return false;
		if (nitro.options.prerender.ignore) {
			for (const pattern of nitro.options.prerender.ignore) if (matchesIgnorePattern(route, pattern)) return false;
		}
		if (publicAssetBases.some((base) => route.startsWith(base))) return false;
		if (scannedPublicAssets.has(route)) return false;
		if (_getRouteRules(route).prerender === false) return false;
		return true;
	};
	const canWriteToDisk = (route) => {
		if (route.route.includes("?") || route.route.split(/[/\\]/).includes("..")) return false;
		const FS_MAX_SEGMENT = 255;
		const FS_MAX_PATH_PUBLIC_HTML = 1024 - (nitro.options.output.publicDir.length + 10);
		if ((route.route.length >= FS_MAX_PATH_PUBLIC_HTML || route.route.split("/").some((s) => s.length > FS_MAX_SEGMENT)) && !displayedLengthWarns.has(route)) {
			displayedLengthWarns.add(route);
			const _route = route.route.slice(0, 60) + "...";
			if (route.route.length >= FS_MAX_PATH_PUBLIC_HTML) nitro.logger.warn(`Prerendering long route "${_route}" (${route.route.length}) can cause filesystem issues since it exceeds ${FS_MAX_PATH_PUBLIC_HTML}-character limit when writing to \`${nitro.options.output.publicDir}\`.`);
			else {
				nitro.logger.warn(`Skipping prerender of the route "${_route}" since it exceeds the ${FS_MAX_SEGMENT}-character limit in one of the path segments and can cause filesystem issues.`);
				return false;
			}
		}
		return true;
	};
	const generateRoute = async (route) => {
		const start = Date.now();
		const crawledPath = crawledLinkPaths.get(route);
		route = decodeURI(route);
		const routePath = crawledPath ? decodeURI(crawledPath) : route;
		if (!canPrerender(route)) {
			skippedRoutes.add(route);
			return;
		}
		generatedRoutes.add(route);
		const _route = { route };
		const encodedRoute = encodeURI(routePath);
		const req = toRequest(withBase(encodedRoute, nitro.options.baseURL), { headers: [["x-nitro-prerender", encodedRoute]] });
		const res = await prerenderer.fetch(req);
		let dataBuff = Buffer.from(await res.arrayBuffer());
		Object.defineProperty(_route, "contents", {
			get: () => {
				return dataBuff ? dataBuff.toString("utf8") : void 0;
			},
			set(value) {
				if (dataBuff) dataBuff = Buffer.from(value);
			}
		});
		Object.defineProperty(_route, "data", {
			get: () => {
				return dataBuff ? dataBuff.buffer : void 0;
			},
			set(value) {
				if (dataBuff) dataBuff = Buffer.from(value);
			}
		});
		if (![200, ...[
			301,
			302,
			303,
			304,
			307,
			308
		]].includes(res.status)) {
			_route.error = /* @__PURE__ */ new Error(`[${res.status}] ${res.statusText}`);
			_route.error.status = res.status;
			_route.error.statusText = res.statusText;
		}
		_route.generateTimeMS = Date.now() - start;
		const contentType = res.headers.get("content-type") || "";
		const isImplicitHTML = !routePath.endsWith(".html") && contentType.includes("html") && !JsonSigRx.test(dataBuff.subarray(0, 32).toString("utf8"));
		const routeWithIndex = routePath.endsWith("/") ? routePath + "index" : routePath;
		const htmlPath = routePath.endsWith("/") || nitro.options.prerender.autoSubfolderIndex ? joinURL(routePath, "index.html") : routePath + ".html";
		_route.fileName = withoutBase(isImplicitHTML ? htmlPath : routeWithIndex, nitro.options.baseURL);
		const inferredContentType = src_default.getType(_route.fileName) || "text/plain";
		_route.contentType = contentType || inferredContentType;
		await nitro.hooks.callHook("prerender:generate", _route, nitro);
		const filePath = join$2(nitro.options.output.publicDir, _route.fileName);
		const claimed = outputByFile.get(outputKey(filePath));
		if (_route.contentType !== inferredContentType && !claimed) {
			const prerenderMeta = getPrerenderMeta(nitro);
			prerenderMeta[_route.fileName] ||= {};
			prerenderMeta[_route.fileName].contentType = _route.contentType;
		}
		if (_route.error) failedRoutes.add(_route);
		if (_route.skip || _route.error) {
			await nitro.hooks.callHook("prerender:route", _route);
			nitro.logger.log(formatPrerenderRoute(_route));
			dataBuff = void 0;
			return _route;
		}
		if (claimed) {
			if (claimed.hash === hashContents(dataBuff)) nitro._prerenderedRoutes.push(_route);
			else {
				nitro.logger.warn(`Routes \`${claimed.route}\` and \`${route}\` both prerender to \`${_route.fileName}\` with different contents. Keeping the output of \`${claimed.route}\`.`);
				_route.skip = true;
			}
		} else if (canWriteToDisk(_route) && filePath.startsWith(nitro.options.output.publicDir)) {
			outputByFile.set(outputKey(filePath), {
				route,
				hash: hashContents(dataBuff)
			});
			await writeFile$1(filePath, dataBuff);
			nitro._prerenderedRoutes.push(_route);
		} else _route.skip = true;
		if (!_route.error) {
			const crawlLinks = (nitro.options.prerender.crawlLinks ?? false) && (isImplicitHTML || routePath.endsWith(".html"));
			const extractedLinks = await extractLinks(crawlLinks ? dataBuff.toString("utf8") : "", routePath, res, crawlLinks, nitro.options.baseURL);
			for (const _link of extractedLinks) {
				const link = withoutBase(_link, nitro.options.baseURL);
				if (canPrerender(link) && !routes.has(link)) {
					if (link !== _link) crawledLinkPaths.set(link, _link);
					routes.add(link);
				}
			}
		}
		await nitro.hooks.callHook("prerender:route", _route);
		nitro.logger.log(formatPrerenderRoute(_route));
		dataBuff = void 0;
		return _route;
	};
	nitro.logger.info(nitro.options.prerender.crawlLinks ? `Prerendering ${routes.size} initial routes with crawler` : `Prerendering ${routes.size} routes`);
	await runParallel(routes, generateRoute, {
		concurrency: nitro.options.prerender.concurrency || 1,
		interval: nitro.options.prerender.interval
	});
	await prerenderer.close();
	await nitro.hooks.callHook("prerender:done", {
		prerenderedRoutes: nitro._prerenderedRoutes,
		failedRoutes: [...failedRoutes]
	});
	if (failedRoutes.size > 0 && nitro._prerenderedRoutes.length === 0) {
		logPrerenderErrors(nitro, failedRoutes);
		throw new Error(`Prerendered 0 routes. All ${failedRoutes.size} route(s) failed, so nothing was written to \`${prettyPath(nitro.options.output.publicDir)}\`.` + missingRendererHint(nitro));
	}
	const ignoreStatusCodes = nitro.options.prerender.ignoreStatusCodes || [];
	const fatalRoutes = new Set([...failedRoutes].filter((route) => !ignoreStatusCodes.includes(route.error.status)));
	if (nitro.options.prerender.failOnError && fatalRoutes.size > 0) {
		logPrerenderErrors(nitro, fatalRoutes);
		throw new Error("Exiting due to prerender errors.");
	}
	const prerenderTimeInMs = Date.now() - prerenderStartTime;
	nitro.logger.info(`Prerendered ${nitro._prerenderedRoutes.length} routes in ${prerenderTimeInMs / 1e3} seconds`);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
}
function prerenderBuilder(nitro) {
	if (nitro.options.builder === "vite") return resolveRolldown(nitro.options.rootDir, { paths: viteDepPaths(nitro) }) ? "rolldown" : false;
	return nitro.options.builder;
}
async function startPrerenderer(nitroRenderer) {
	const prerenderer = await createPrerenderer(nitroRenderer);
	let onClose;
	try {
		await Promise.race([prerenderer.waitForReady(6e4), new Promise((_resolve, reject) => {
			onClose = (_runner, cause) => reject(cause ?? /* @__PURE__ */ new Error("Prerender worker closed before becoming ready"));
			prerenderer.onClose(onClose);
		})]);
	} catch (error) {
		await prerenderer.close();
		throw error;
	} finally {
		prerenderer.offClose(onClose);
	}
	return prerenderer;
}
async function createPrerenderer(nitroRenderer) {
	if (nitroRenderer.options.builder === false) {
		const { startUnbundledPrerenderer } = await import("./shared6.mjs");
		return startUnbundledPrerenderer(nitroRenderer);
	}
	await build(nitroRenderer);
	const serverFilename = typeof nitroRenderer.options.rollupConfig?.output?.entryFileNames === "string" ? nitroRenderer.options.rollupConfig.output.entryFileNames : "index.mjs";
	const serverEntrypoint = resolve$2(nitroRenderer.options.output.serverDir, serverFilename);
	return new g$4({
		runner: "node-worker",
		entry: serverEntrypoint
	}).start();
}
function logPrerenderErrors(nitro, failedRoutes) {
	nitro.logger.log("\nErrors prerendering:");
	for (const route of failedRoutes) nitro.logger.log(formatPrerenderRoute(route));
	nitro.logger.log("");
}
function missingRendererHint(nitro) {
	if (nitro.options.renderer) return "";
	if (nitro.options.builder === "vite") return " No Vite SSR entry was detected. If the app renders HTML, place `entry-server` in `app/`, `src/` or the project root, or set `environments.ssr.build.rollupOptions.input` in the Vite config.";
	return " No `renderer` is configured. Check that the app has a route or renderer able to serve the prerendered routes.";
}
function hashContents(data) {
	return createHash("sha256").update(data).digest("hex");
}
// node_modules/nitro/dist/_assets-import.mjs
var ASSETS_RUNTIME_ID = "virtual:nitro-assets/runtime";
var ASSETS_EMPTY_ID = "\0virtual:nitro-assets/empty";
var ASSETS_MANIFEST_ID = "../__nitro_assets_manifest.js";
var ASSETS_MANIFEST_FILE = "__nitro_assets_manifest.js";
var EMPTY_ASSETS = {
	js: [],
	css: []
};
var ASSETS_RUNTIME_CODE = `
export function mergeAssets(...args) {
  const raw = {
    entry: args.find((arg) => arg.entry)?.entry,
    js: uniqBy(args.flatMap((arg) => arg.js)),
    css: uniqBy(args.flatMap((arg) => arg.css)),
  };
  return { ...raw, merge: (...rest) => mergeAssets(raw, ...rest) };
}
function uniqBy(items) {
  const seen = new Set();
  return items.filter((item) => !seen.has(item.href) && seen.add(item.href));
}
`;
var RuntimeURL = class {
	code;
	constructor(code) {
		this.code = code;
	}
};
function serializeAssetsManifest(manifest) {
	const runtimes = [];
	return `export default ${JSON.stringify(manifest, (_key, v) => v instanceof RuntimeURL ? `__nitro_assets_runtime_${runtimes.push(v.code) - 1}__` : v, 2).replace(/"__nitro_assets_runtime_(\d+)__"/g, (_, i) => runtimes[Number(i)])};\n`;
}
function parseIdQuery(id) {
	const index = id.indexOf("?");
	if (index === -1) return {
		filename: id,
		query: {}
	};
	return {
		filename: id.slice(0, index),
		query: Object.fromEntries(new URLSearchParams(id.slice(index + 1)))
	};
}
// node_modules/nitro/dist/vite.mjs
var getBundlerConfig = async (ctx) => {
	const nitro = ctx.nitro;
	const base = await baseBuildConfig(nitro);
	const nitroPlugins = (await baseBuildPlugins(nitro, base)).filter(Boolean);
	if (nitro.options.node && !nitro.options.dev) nitroPlugins.push(await assetUrls(nitro, { dropOtherAssets: true }));
	const commonConfig = {
		input: nitro.options.entry,
		external: [...base.env.external],
		onwarn(warning, warn) {
			if (!base.ignoreWarningCodes.has(warning.code || "")) warn(warning);
		},
		output: {
			dir: nitro.options.output.serverDir,
			format: "esm",
			entryFileNames: "index.mjs",
			chunkFileNames: (chunk) => getChunkName(chunk, nitro),
			inlineDynamicImports: nitro.options.inlineDynamicImports,
			sourcemapIgnoreList: (id) => id.includes("node_modules")
		}
	};
	if (ctx._isRolldown) {
		const builtinsPlugin = !nitro.options.node && !nitro.options.dev && builtinExternals(base.env, { node: false });
		const rolldownConfig = O$1({
			transform: { inject: base.env.inject },
			output: {
				minifyInternalExports: false,
				sourcemapExcludeSources: excludeSourcemapSources(nitro) || void 0,
				codeSplitting: { groups: [libChunksGroup(nitro)] }
			}
		}, nitro.options.rolldownConfig, nitro.options.rollupConfig, {
			...commonConfig,
			external: builtinsPlugin ? [] : commonConfig.external,
			plugins: await withBuildPlugins(nitro, [builtinsPlugin, ...nitroPlugins])
		});
		const outputConfig = rolldownConfig.output;
		if (outputConfig.inlineDynamicImports || outputConfig.format === "iife") outputConfig.codeSplitting = false;
		delete outputConfig.inlineDynamicImports;
		return {
			base,
			rolldownConfig
		};
	} else {
		const inject = (await import("../_5.mjs")).default;
		const alias = (await import("../_4.mjs")).default;
		const rollupConfig = O$1({ output: {
			sourcemapExcludeSources: true,
			generatedCode: { constBindings: true },
			manualChunks(id) {
				if (NODE_MODULES_RE.test(id)) return libChunkName(id);
			}
		} }, nitro.options.rolldownConfig, nitro.options.rollupConfig, {
			...commonConfig,
			plugins: await withBuildPlugins(nitro, [
				inject(base.env.inject),
				alias({ entries: base.aliases }),
				...nitroPlugins
			])
		});
		const outputConfig = rollupConfig.output;
		outputConfig.importAttributesKey ??= "with";
		if (outputConfig.inlineDynamicImports || outputConfig.format === "iife") delete outputConfig.manualChunks;
		return {
			base,
			rollupConfig
		};
	}
};
var SERVICE_MANIFEST_FILE = "nitro-service.json";
async function readBuiltServiceEntry(outDir) {
	try {
		const { entry } = JSON.parse(await readFile(join$2(outDir, SERVICE_MANIFEST_FILE), "utf8"));
		return typeof entry === "string" ? entry : void 0;
	} catch {
		return;
	}
}
function viteServiceLoader(ctx, name) {
	if (ctx._isVitest) return { import: ctx.services[name].entry };
	if (ctx.nitro.options.dev) return { expression: `globalThis.__nitro_vite_envs__[${JSON.stringify(name)}]` };
	return { import: resolve$2(ctx.nitro.options.buildDir, "vite/services", name, ctx._entryPoints[name]) };
}
var NITRO_PROXY_PREFIX = "\0nitro-env-proxy:";
function nitroDevServiceProxy(ctx) {
	return {
		name: "nitro:dev-service-proxy",
		enforce: "pre",
		applyToEnvironment: (env) => !ctx._isVitest && env.name !== "nitro" && env.config.consumer === "server",
		apply: (_config, configEnv) => configEnv.command === "serve",
		resolveId: {
			filter: { id: /^nitro(\/|$)/ },
			handler(id) {
				if (id === "nitro" || id.startsWith("nitro/")) return {
					id: NITRO_PROXY_PREFIX + id,
					moduleSideEffects: false
				};
			}
		},
		load: {
			filter: { id: /^\0nitro-env-proxy:/ },
			handler(id) {
				if (!id.startsWith(NITRO_PROXY_PREFIX)) return;
				const originalId = id.slice(17);
				return {
					code: [
						`const _mod = await globalThis.__VITE_ENVIRONMENT_RUNNER_IMPORT__("nitro", ${JSON.stringify(originalId)});`,
						`__vite_ssr_exportAll__(_mod);`,
						`export default _mod.default;`
					].join("\n"),
					map: null
				};
			}
		}
	};
}
async function writeAssetsManifest(builder, state) {
	const config = builder.config;
	const manifest = {};
	const importers = /* @__PURE__ */ new Set();
	for (const [environmentName, imports] of Object.entries(state.imports)) {
		const bundle = state.bundles[environmentName];
		if (!bundle) throw new Error(`Cannot write the \`?assets\` manifest: the \`${environmentName}\` environment was not built.`);
		const assetDeps = collectAssetDeps(bundle);
		const cssCodeSplit = builder.environments[environmentName].config.build.cssCodeSplit;
		for (const meta of Object.values(imports)) {
			for (const importer of meta.importerEnvironments) importers.add(importer);
			const found = assetDeps.get(meta.id);
			if (!found) throw new Error(`Cannot find \`${meta.key}\` (\`?assets\` import of the \`${[...meta.importerEnvironments].join("`, `")}\` environment) in the \`${environmentName}\` build. It must be bundled by the \`${environmentName}\` environment.`);
			const entry = {
				js: [],
				css: []
			};
			if (environmentName === "client") {
				entry.entry = assetsURL(found.chunk.fileName, config);
				entry.js = found.js.map((fileName) => ({ href: assetsURL(fileName, config) }));
			}
			entry.css = found.css.map((fileName) => ({ href: assetsURL(fileName, config) }));
			if (!cssCodeSplit) {
				const singleCss = Object.values(bundle).find((v) => v.type === "asset" && v.originalFileNames.includes("style.css"));
				if (singleCss) entry.css.push({ href: assetsURL(singleCss.fileName, config) });
			}
			(manifest[environmentName] ??= {})[meta.key] = entry;
		}
	}
	const clientOutDir = _outDir(builder.environments.client);
	for (const name of importers) {
		const outDir = _outDir(builder.environments[name]);
		await writeFile(join$2(outDir, ASSETS_MANIFEST_FILE), serializeAssetsManifest(manifest), "utf8");
		for (const asset of Object.values(state.bundles[name] || {})) if (asset.type === "asset" && !_isBuildMetadata(asset.fileName)) {
			const dest = join$2(clientOutDir, asset.fileName);
			await mkdir(dirname$2(dest), { recursive: true });
			await copyFile(join$2(outDir, asset.fileName), dest);
		}
	}
	state.imports = {};
	state.bundles = {};
}
function collectAssetDeps(bundle) {
	const deps = /* @__PURE__ */ new Map();
	for (const chunk of Object.values(bundle)) {
		if (chunk.type !== "chunk") continue;
		const js = /* @__PURE__ */ new Set();
		const css = /* @__PURE__ */ new Set();
		const recurse = (fileName) => {
			const item = bundle[fileName];
			if (js.has(fileName) || item?.type !== "chunk") return;
			js.add(fileName);
			for (const file of item.viteMetadata?.importedCss || []) css.add(file);
			item.imports.forEach(recurse);
		};
		recurse(chunk.fileName);
		for (const id of chunk.moduleIds) deps.set(id, {
			chunk,
			js: [...js],
			css: [...css]
		});
	}
	return deps;
}
function assetsURL(fileName, config) {
	const renderBuiltUrl = config.experimental?.renderBuiltUrl;
	if (typeof renderBuiltUrl === "function") {
		const result = renderBuiltUrl(fileName, {
			type: "asset",
			hostType: "js",
			ssr: true,
			hostId: ""
		});
		if (typeof result === "object") {
			if (result.runtime) return new RuntimeURL(result.runtime);
			if (result.relative) throw new Error("`?assets` imports do not support `relative` results of `experimental.renderBuiltUrl`.");
		} else if (result) return result;
	}
	return config.base + fileName;
}
function _isBuildMetadata(fileName) {
	return fileName === "nitro-service.json" || fileName.startsWith(".vite/");
}
function _outDir(environment) {
	return resolve$2(environment.config.root, environment.config.build.outDir);
}
var BuilderNames = {
	nitro: colors.magenta("Nitro"),
	client: colors.green("Client"),
	ssr: colors.blue("SSR")
};
async function buildEnvironments(ctx, builder) {
	const nitro = ctx.nitro;
	for (const [envName, env] of Object.entries(builder.environments)) {
		const fmtName = BuilderNames[envName] || (envName.length <= 3 ? envName.toUpperCase() : envName[0].toUpperCase() + envName.slice(1));
		if (env.isBuilt && ctx.services[envName] && !ctx._entryPoints[envName]) {
			const entry = await readBuiltServiceEntry(resolve$2(env.config.root, env.config.build.outDir));
			if (entry) ctx._entryPoints[envName] = entry;
		}
		if (envName === "nitro" || !env.config.build.rollupOptions.input || env.isBuilt) {
			if (![
				"nitro",
				"ssr",
				"client"
			].includes(envName)) nitro.logger.info(env.isBuilt ? `Skipping ${fmtName} (already built)` : `Skipping ${fmtName} (no input defined)`);
			continue;
		}
		if (!r$2$1 && !L$1) console.log();
		nitro.logger.start(`Building [${fmtName}]`);
		await builder.build(env);
	}
	const template = nitro.options.renderer?.template;
	const clientInput = builder.environments.client?.config?.build?.rollupOptions?.input;
	let pageHTML;
	if (template && template === clientInput) {
		const outputPath = resolve$2(nitro.options.output.publicDir, basename$2(template));
		if (existsSync(outputPath)) {
			pageHTML = await readFile(outputPath, "utf8");
			await rm(outputPath);
		}
	}
	nitro._pageTemplate = {
		...nitro._pageTemplate,
		html: pageHTML === void 0 ? void 0 : () => pageHTML
	};
	if (ctx._assetsImport) await writeAssetsManifest(builder, ctx._assetsImport);
	if (!r$2$1 && !L$1) console.log();
	const buildInfo = [["preset", nitro.options.preset], ["compatibility", r$4(nitro.options.compatibilityDate)]].filter((e) => e[1]);
	nitro.logger.start(`Building [${BuilderNames.nitro}] ${colors.dim(`(${buildInfo.map(([k, v]) => `${k}: \`${v}\``).join(", ")})`)}`);
	await copyPublicAssets(nitro);
	for (const env of Object.values(builder.environments)) if (env.config.consumer === "client") addClientAssetsDir(nitro, env.config.build.assetsDir);
	ctx.nitro.routing.sync();
	await prerender(nitro);
	await nitro.hooks.callHook("vite:compile:before", nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	let output;
	if (nitro.options.static) builder.environments.nitro.isBuilt = true;
	else output = await builder.build(builder.environments.nitro);
	await nitro.close();
	await nitro.hooks.callHook("compiled", nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	await writeBuildInfo(nitro, output);
	if (!r$2$1 && !L$1) console.log();
	const previewCommand = nitro.options.framework.previewCommand || "npx vite preview";
	nitro.logger.success(`You can preview this build using \`${previewCommand}\``);
	if (nitro.options.commands.deploy) {
		const deployCommand = nitro.options.framework.deployCommand || "npx nitro deploy --prebuilt";
		nitro.logger.success(`You can deploy this build using \`${deployCommand}\``);
	}
}
function nitroPreviewPlugin(ctx) {
	return {
		name: "nitro:preview",
		apply: (_config, configEnv) => !!configEnv.isPreview,
		config(config) {
			return { preview: { port: config.preview?.port || 3e3 } };
		},
		async configurePreviewServer(server) {
			const preview = await startPreview({
				rootDir: server.config.root,
				loader: { nodeServer: server.httpServer }
			});
			server.httpServer.once("close", async () => {
				await preview.close();
			});
			const { NodeRequest, sendNodeResponse } = await import("../_libs/_.mjs");
			server.middlewares.use(async (req, res, next) => {
				const nodeReq = new NodeRequest({
					req,
					res
				});
				const previewRes = await preview.fetch(nodeReq);
				await sendNodeResponse(res, previewRes).catch(next);
			});
			if (preview.upgrade) server.httpServer.on("upgrade", (req, socket, head) => {
				preview.upgrade(req, socket, head);
			});
		}
	};
}
var CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
var SPECIAL_CSS_QUERY_RE = /[?&](url|inline|raw)(\b|=|&|$)/;
var ASSETS_QUERY_RE = /[?&]assets(?:[=&]|$)/;
var DIRECT_REQUEST_RE = /(\?|&)direct=?(?:&|$)/;
async function collectDevAssets(server, config, id, environmentName) {
	const environment = server.environments[environmentName];
	if (!environment) throw new Error(`Unknown environment \`${environmentName}\` in the \`?assets=${environmentName}\` import of \`${id}\`.`);
	if (environmentName === "client") return {
		entry: config.base + toDevUrl(environment, id).slice(1),
		js: [],
		css: []
	};
	return {
		js: [],
		css: (await collectCss(environment, id)).map((cssId) => ({
			href: config.base + toDevUrl(environment, cssId).slice(1),
			"data-vite-dev-id": cssId
		}))
	};
}
function nitroAssetsDevPatches() {
	let viteClientPath;
	return [
		{
			name: "nitro:assets-import:vite-client",
			apply: "serve",
			configResolved(config) {
				viteClientPath = _viteClientPath(config);
			},
			transform: {
				filter: { id: /\/dist\/client\/client\.mjs$/ },
				handler(code, id) {
					if (id !== viteClientPath || code.includes("linkSheetsMap")) return;
					return _patchViteClient(code);
				}
			}
		},
		{
			name: "nitro:assets-import:css-link-self-accept",
			apply: "serve",
			transform: {
				order: "post",
				handler(_code, id) {
					const env = this.environment;
					if (env.name === "client" && env.mode === "dev" && isCSSRequest(id) && DIRECT_REQUEST_RE.test(id)) {
						const mod = env.moduleGraph.getModuleById(id);
						if (mod && !mod.isSelfAccepting) mod.isSelfAccepting = true;
					}
				}
			}
		},
		{
			name: "nitro:assets-import:vue-scoped-css",
			apply: "serve",
			configureServer(server) {
				server.middlewares.use((req, _res, next) => {
					if (req.headers.accept?.includes("text/css") && req.url?.includes("&lang.css=")) req.url = req.url.replace("&lang.css=", "?lang.css");
					next();
				});
			}
		},
		{
			name: "nitro:assets-import:hot-update",
			apply: "serve",
			hotUpdate(ctx) {
				if (this.environment.name !== "rsc") return;
				for (const mod of _collectImporters(ctx.modules)) {
					if (!mod.id) continue;
					for (const query of [
						"assets",
						"assets=client",
						`assets=${this.environment.name}`
					]) {
						const assetsMod = this.environment.moduleGraph.getModuleById(`${mod.id}?${query}`);
						if (assetsMod) this.environment.moduleGraph.invalidateModule(assetsMod);
					}
				}
			}
		}
	];
}
function isCSSRequest(id) {
	return CSS_LANGS_RE.test(id);
}
async function collectCss(environment, entryId) {
	const visited = /* @__PURE__ */ new Set();
	const cssIds = /* @__PURE__ */ new Set();
	async function recurse(id) {
		if (visited.has(id) || ASSETS_QUERY_RE.test(id)) return;
		visited.add(id);
		let mod = environment.moduleGraph.getModuleById(id);
		if (!mod?.transformResult) {
			try {
				await environment.transformRequest(id);
			} catch (error) {
				console.error(`[nitro] Failed to transform \`${id}\` to collect its css`, error);
			}
			mod = environment.moduleGraph.getModuleById(id);
		}
		if (!mod) return;
		for (const next of mod.importedModules) {
			if (!next.id) continue;
			if (isCSSRequest(next.id)) {
				if (!SPECIAL_CSS_QUERY_RE.test(next.id)) cssIds.add(next.id);
			} else await recurse(next.id);
		}
	}
	await recurse(entryId);
	return [...cssIds];
}
function toDevUrl(environment, id) {
	const root = environment.config.root;
	let url;
	if (id.startsWith(root.endsWith("/") ? root : `${root}/`)) url = id.slice(root.length);
	else if (environment.depsOptimizer?.isOptimizedDepFile(id) || id !== "/@react-refresh" && isAbsolute$2(id) && existsSync(id.replace(/[?#].*$/, ""))) url = join$2("/@fs/", id);
	else url = id;
	if (url[0] !== "." && url[0] !== "/") url = id.startsWith("/@id/") ? id : "/@id/" + id.replace("\0", "__x00__");
	if (environment.config.consumer === "client") {
		const mod = environment.moduleGraph.getModuleById(id);
		if (mod && mod.lastHMRTimestamp > 0) url = _injectQuery(url, `t=${mod.lastHMRTimestamp}`);
	}
	return url;
}
function _injectQuery(url, query) {
	const file = url.replace(/[?#].*$/, "");
	const postfix = url.slice(file.length);
	return `${file}?${query}${postfix[0] === "?" ? `&${postfix.slice(1)}` : postfix}`;
}
function _collectImporters(mods) {
	const visited = /* @__PURE__ */ new Set();
	const recurse = (mod) => {
		if (!visited.has(mod)) {
			visited.add(mod);
			mod.importers.forEach(recurse);
		}
	};
	mods.forEach(recurse);
	return visited;
}
function _viteClientPath(config) {
	for (const { replacement } of config.resolve?.alias || []) {
		const path = /^\/@fs\/(.+\/dist\/client\/client\.mjs)$/.exec(replacement)?.[1];
		if (path) return /^[a-z]:\//i.test(path) ? path : `/${path}`;
	}
}
function _patchViteClient(code) {
	const sheetsMap = code.indexOf("const sheetsMap");
	const updateStyle = _endIndexOf(code, "function updateStyle(id, content) {");
	const removeStyle = _endIndexOf(code, "function removeStyle(id) {");
	if (sheetsMap === -1 || !(sheetsMap < updateStyle && updateStyle < removeStyle)) return;
	return code.slice(0, sheetsMap) + `const linkSheetsMap = new Map();
document
  .querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]')
  .forEach((el) => linkSheetsMap.set(el.getAttribute('data-vite-dev-id'), el));
` + code.slice(sheetsMap, updateStyle) + `if (linkSheetsMap.has(id)) { return }` + code.slice(updateStyle, removeStyle) + `
const link = linkSheetsMap.get(id);
if (link) {
  document
    .querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]')
    .forEach((el) => {
      if (el.getAttribute('data-vite-dev-id') === id) {
        el.remove()
      }
    })
  linkSheetsMap.delete(id)
}
` + code.slice(removeStyle);
}
function _endIndexOf(code, search) {
	const index = code.lastIndexOf(search);
	return index === -1 ? index : index + search.length;
}
var NON_HOOK_KEYS = /* @__PURE__ */ new Set([
	"name",
	"enforce",
	"apply",
	"api"
]);
function nitroAssetsImport(ctx) {
	const enabled = () => ctx.nitro?.options.vite?.assetsImport !== false;
	return [assetsImportPlugin(ctx._assetsImport = {
		imports: {},
		bundles: {}
	}), ...nitroAssetsDevPatches()].map((plugin) => _withCondition(plugin, enabled));
}
function assetsImportPlugin(state) {
	let server;
	let config;
	async function assetsCode(environment, id, opts) {
		if (environment.mode === "dev") return JSON.stringify(await collectDevAssets(server, config, id, opts.environment));
		const imports = state.imports[opts.environment] ??= {};
		const key = relative$2(config.root, id);
		imports[id] = {
			id,
			key,
			importerEnvironments: new Set(imports[id]?.importerEnvironments).add(environment.name),
			isEntry: !!(imports[id]?.isEntry || opts.isEntry)
		};
		return `__assets_manifest[${JSON.stringify(opts.environment)}][${JSON.stringify(key)}]`;
	}
	return {
		name: "nitro:assets-import",
		sharedDuringBuild: true,
		configureServer(server_) {
			server = server_;
		},
		configResolved(config_) {
			config = config_;
		},
		configEnvironment(name) {
			if (name === "ssr") return { build: { emitAssets: true } };
		},
		resolveId: {
			order: "pre",
			filter: { id: [/[?&]assets/, /^virtual:nitro-assets\//] },
			handler(source) {
				if (source === "virtual:nitro-assets/runtime") return "\0" + ASSETS_RUNTIME_ID;
				if (source === "../__nitro_assets_manifest.js") return {
					id: ASSETS_MANIFEST_ID,
					external: true
				};
				if (this.environment.name === "client" && parseIdQuery(source).query.assets !== void 0) return ASSETS_EMPTY_ID;
			}
		},
		load: {
			filter: { id: [/[?&]assets/, /^\0virtual:nitro-assets\//] },
			async handler(id) {
				if (id === "\0virtual:nitro-assets/empty") return `export default ${JSON.stringify(EMPTY_ASSETS)}`;
				if (id === "\0virtual:nitro-assets/runtime") return ASSETS_RUNTIME_CODE;
				const { filename, query } = parseIdQuery(id);
				const value = query.assets;
				if (value === void 0) return;
				const codes = [];
				for (const environment of value ? [value] : ["client", this.environment.name]) codes.push(await assetsCode(this.environment, filename, {
					environment,
					isEntry: value === "client"
				}));
				let code = `import { mergeAssets } from ${JSON.stringify(ASSETS_RUNTIME_ID)};\nexport default mergeAssets(${codes.join(", ")});\n`;
				if (this.environment.mode === "build") code = `import __assets_manifest from ${JSON.stringify(ASSETS_MANIFEST_ID)};\n${code}`;
				return {
					code,
					moduleSideEffects: false
				};
			}
		},
		buildStart() {
			if (this.environment.mode !== "build" || this.environment.name !== "client") return;
			for (const meta of Object.values(state.imports.client || {})) if (meta.isEntry) this.emitFile({
				type: "chunk",
				id: meta.id,
				preserveSignature: "exports-only"
			});
		},
		renderChunk(code, chunk) {
			if (code.includes("../__nitro_assets_manifest.js")) {
				let path = relative$2(dirname$2(chunk.fileName), ASSETS_MANIFEST_FILE);
				path = path.startsWith(".") ? path : `./${path}`;
				return { code: code.replaceAll(ASSETS_MANIFEST_ID, () => path) };
			}
		},
		writeBundle(_options, bundle) {
			state.bundles[this.environment.name] = bundle;
		}
	};
}
function _withCondition(plugin, enabled) {
	const wrapped = { ...plugin };
	for (const [key, hook] of Object.entries(plugin)) {
		if (NON_HOOK_KEYS.has(key)) continue;
		if (typeof hook === "function") wrapped[key] = function(...args) {
			return enabled() ? hook.apply(this, args) : void 0;
		};
		else if (typeof hook?.handler === "function") {
			const handler = hook.handler;
			wrapped[key] = {
				...hook,
				handler(...args) {
					return enabled() ? handler.apply(this, args) : void 0;
				}
			};
		}
	}
	return wrapped;
}
var FACADE_PREFIX = "\0nitro-require-external:";
function nitroRequireExternals() {
	return {
		name: "nitro:require-externals",
		apply: "build",
		applyToEnvironment: (env) => env.name !== "nitro" && env.config.consumer === "server",
		resolveId: {
			order: "pre",
			filter: { id: /^[\w@][^:]*$/ },
			async handler(id, importer, options) {
				if (importer?.startsWith(FACADE_PREFIX)) return {
					id,
					external: true
				};
				if (options.kind !== "require-call" || isBuiltin(id)) return;
				const resolved = await this.resolve(id, importer, {
					...options,
					skipSelf: true
				});
				if (resolved?.external) return FACADE_PREFIX + resolved.id;
			}
		},
		load: {
			filter: { id: /^\0nitro-require-external:/ },
			handler(id) {
				return [`import * as m from ${JSON.stringify(id.slice(24))};`, `module.exports = Object.prototype.hasOwnProperty.call(m, "module.exports") ? m["module.exports"] : { ...m };`].join("\n");
			}
		}
	};
}
function nitroServerAliases(ctx) {
	let source;
	let aliases = {};
	return {
		name: "nitro:server-aliases",
		enforce: "pre",
		applyToEnvironment: (env) => env.name !== "client" && env.config?.consumer !== "client",
		async resolveId(id, importer, options) {
			if (!ctx.bundlerConfig) return;
			if (source !== ctx.bundlerConfig.base.aliases) {
				source = ctx.bundlerConfig.base.aliases;
				aliases = normalizeAliases(source);
			}
			const resolved = resolveAlias(id, aliases);
			if (resolved !== id && resolved.startsWith("node:")) return await this.resolve(resolved, importer, {
				...options,
				skipSelf: true
			}) || {
				id: resolved,
				external: true
			};
		}
	};
}
var RENDERER_TEMPLATE_ID = "#nitro/virtual/renderer-template";
var _watchedServers = /* @__PURE__ */ new WeakSet();
function setupVitestWatch(ctx, { vitest, project }) {
	const server = project.vite;
	if (!vitest.config.watch || _watchedServers.has(server)) return;
	_watchedServers.add(server);
	const nitro = ctx.nitro;
	const nitroEnv = server.environments.nitro;
	const affectedTests = (modules) => _affectedTests(modules, {
		testFiles: () => nitroEnv.moduleGraph.fileToModulesMap.keys(),
		isTestFile: (file) => vitest.getModuleSpecifications(file).length > 0,
		isSetupFile: (file) => vitest.projects.some((p) => p.vite === server && p.config.setupFiles.includes(file))
	});
	vitest.config.watchTriggerPatterns = [...vitest.config.watchTriggerPatterns || [], {
		pattern: /.*/,
		testsToRun: (file) => {
			const modules = nitroEnv.moduleGraph.getModulesByFile(file);
			const result = modules && affectedTests(modules);
			if (!result?.throughVirtual || result.tests.size === 0) return;
			for (const dep of result.files) vitest.watcher.invalidates.add(dep);
			return [...result.tests];
		}
	}];
	const rerun = async (modules) => {
		let specs = [...affectedTests(modules).tests].flatMap((file) => vitest.getModuleSpecifications(file));
		const filenamePattern = vitest.filenamePattern;
		if (Array.isArray(filenamePattern) && filenamePattern.length > 0) {
			const selected = await vitest.globTestSpecifications(filenamePattern);
			specs = specs.filter((spec) => selected.some((s) => s.moduleId === spec.moduleId));
		}
		if (specs.length > 0) {
			await vitest.waitForTestRunEnd();
			await vitest.rerunTestSpecifications(specs);
		}
	};
	const rescan = t$6(async () => {
		await rescanHandlers(nitro, nitroEnv);
		await rerun([...nitroEnv.moduleGraph.idToModuleMap.values()].filter((mod) => mod.id?.startsWith("#nitro/virtual/")));
	});
	watchScanDirs(nitro, server, () => {
		rescan().catch((error) => nitro.logger.error(error));
	});
	const template = nitro.options.renderer?.template;
	if (template) {
		const reloadTemplate = t$6(async () => {
			const mod = nitroEnv.moduleGraph.getModuleById(RENDERER_TEMPLATE_ID);
			if (mod) {
				nitroEnv.moduleGraph.invalidateModule(mod);
				await rerun([mod]);
			}
		});
		server.watcher.add(template);
		server.watcher.on("all", (event, file) => {
			if (event !== "addDir" && event !== "unlinkDir" && normalize$2(file) === template) reloadTemplate().catch((error) => nitro.logger.error(error));
		});
	}
	const configFile = nitro.options._c12.configFile;
	if (configFile) {
		const restart = t$6(() => vitest.vite.restart());
		server.watcher.add(configFile);
		server.watcher.on("change", (file) => {
			if (normalize$2(file) === configFile) restart().catch((error) => nitro.logger.error(error));
		});
	}
}
function _affectedTests(modules, opts) {
	const tests = /* @__PURE__ */ new Set();
	const files = /* @__PURE__ */ new Set();
	const seen = /* @__PURE__ */ new Set();
	const queue = [...modules];
	let throughVirtual = false;
	let throughSetup = false;
	for (const mod of queue) {
		if (seen.has(mod)) continue;
		seen.add(mod);
		if (!mod.file) throughVirtual = true;
		else if (opts.isTestFile(mod.file)) tests.add(mod.file);
		else {
			files.add(mod.file);
			throughSetup ||= opts.isSetupFile(mod.file);
		}
		queue.push(...mod.importers);
	}
	if (throughSetup) {
		for (const file of opts.testFiles()) if (opts.isTestFile(file)) tests.add(file);
	}
	return {
		tests,
		files,
		throughVirtual
	};
}
function isVitest(config) {
	return !!config.environments?.__vitest__;
}
function nitroVitest(ctx) {
	const envPath = resolve$2(runtimeDir, "internal/vite/vitest-env.mjs");
	const setupPath = resolve$2(runtimeDir, "internal/vite/vitest-setup.mjs");
	return {
		name: "nitro:vitest",
		apply: (_config, configEnv) => configEnv.command === "serve",
		config(userConfig) {
			if (!isVitest(userConfig)) return;
			const { environment, pool } = userConfig.test || {};
			return { test: {
				environment: environment === "nitro" || !environment && !(pool === "vmThreads" || pool === "vmForks") ? envPath : environment,
				setupFiles: [setupPath]
			} };
		},
		configureVitest(context) {
			const { setupFiles } = context.project.config;
			if (!setupFiles.includes(setupPath)) setupFiles.push(setupPath);
			context.defineCacheKeyGenerator?.(({ id }) => id.startsWith("#nitro/virtual/") ? false : void 0);
			setupVitestWatch(ctx, context);
		},
		load: {
			filter: { id: /vitest-setup\.mjs$/ },
			handler(id) {
				if (id === setupPath && this.environment.name !== "nitro") return "export {};";
			}
		},
		resolveId: {
			filter: { id: /^vitest-environment-nitro$/ },
			handler(id) {
				if (id === "vitest-environment-nitro") return envPath;
			}
		}
	};
}
var debug = process.env.NITRO_DEBUG ? (...args) => console.log("[nitro]", ...args) : () => {};
function nitro(pluginConfig = {}) {
	if (globalThis.__nitro_build__) return [];
	const ctx = createContext(pluginConfig);
	return [
		nitroInit(ctx),
		nitroEnv(ctx),
		nitroServerAliases(ctx),
		nitroMain(ctx),
		nitroPrepare(ctx),
		nitroDevServiceProxy(ctx),
		nitroRequireExternals(),
		nitroPreviewPlugin(ctx),
		nitroVitest(ctx),
		...nitroAssetsImport(ctx)
	];
}
function nitroInit(ctx) {
	return {
		name: "nitro:init",
		sharedDuringBuild: true,
		apply: (_config, configEnv) => !configEnv.isPreview,
		async config(config, configEnv) {
			ctx._isRolldown = !!this.meta.rolldownVersion;
			if (!ctx._initialized) {
				debug("[init] Initializing nitro");
				ctx._initialized = true;
				ctx._isVitest = isVitest(config);
				await setupNitroContext(ctx, configEnv, config);
			}
		},
		async configResolved(config) {
			setRunningVite(useNitro(ctx), config);
			if (config.command === "serve" && !ctx._viteVersionChecked) {
				ctx._viteVersionChecked = true;
				await checkViteVersion(ctx, this.meta.viteVersion);
			}
			for (const plugin of ctx._pluginModules || []) if (!config.plugins.some((p) => p === plugin || p.nitro === plugin.nitro)) useNitro(ctx).logger.warn(`Vite plugin \`${plugin.name}\` registers a Nitro module but is not applied by Vite. Plugins added from a \`config\` hook are ignored by Vite; add it to \`plugins\` instead.`);
		},
		applyToEnvironment(env) {
			if (env.name !== "nitro") return;
			const plugins = [];
			if (ctx._nitroEnvAliases?.length) plugins.push(nitroEnvAliases(ctx.bundlerConfig.base.aliases, ctx._nitroEnvAliases));
			if (ctx.nitro?.options.dev) {
				debug("[init] Adding rollup plugins for dev");
				plugins.push(...ctx.bundlerConfig?.rolldownConfig?.plugins || ctx.bundlerConfig?.rollupConfig?.plugins || []);
			}
			if (plugins.length > 0) return plugins;
		}
	};
}
function nitroEnv(ctx) {
	return {
		name: "nitro:env",
		sharedDuringBuild: true,
		apply: (_config, configEnv) => !configEnv.isPreview,
		async config(userConfig, _configEnv) {
			debug("[env]  Extending config (environments)");
			const environments = {
				...createServiceEnvironments(ctx),
				nitro: createNitroEnvironment(ctx)
			};
			environments.client = {
				consumer: userConfig.environments?.client?.consumer ?? "client",
				build: { rollupOptions: { input: userConfig.environments?.client?.build?.rollupOptions?.input ?? useNitro(ctx).options.renderer?.template } }
			};
			debug("[env]  Environments:", Object.keys(environments).join(", "));
			return { environments };
		},
		configEnvironment(name, config) {
			if (config.consumer === "client") {
				debug("[env]  Configuring client environment", name === "client" ? "" : ` (${name})`);
				const nitro = useNitro(ctx);
				config.build.emptyOutDir = false;
				config.build.outDir = nitro.options.output.publicDir;
				config.build.copyPublicDir ??= false;
				if (nitro.options.buildAssetsDir) {
					config.build.assetsDir = nitro.options.buildAssetsDir;
					useLongerAssetHashes(config.build, ctx._isRolldown, nitro.options.buildAssetsDir);
				}
				return;
			}
			const nitro = useNitro(ctx);
			if (name !== "nitro" && nitro.options.buildAssetsDir) {
				config.build.assetsDir = nitro.options.buildAssetsDir;
				useLongerAssetHashes(config.build, ctx._isRolldown, nitro.options.buildAssetsDir, { assetsOnly: true });
			}
			if (name === "nitro" || ctx.services[name]) return;
			const entry = getEntry(config.build?.rolldownOptions?.input || config.build?.rollupOptions?.input);
			if (typeof entry !== "string") return;
			const resolvedEntry = resolveServiceEntry(ctx.nitro.options, entry);
			ctx.services[name] = { entry: resolvedEntry };
			debug(`[env]  Auto-detected service "${name}" with entry: ${resolvedEntry}`);
			return createServiceEnvironment(ctx, name, { entry: resolvedEntry });
		},
		configResolved() {
			useSSRServiceRenderer(ctx.nitro);
		}
	};
}
function nitroEnvAliases(_aliases, keys) {
	const aliases = normalizeAliases(_aliases);
	const keysRE = keys.map((key) => escapeRegExp$1(key.replace(/\/$/, ""))).join("|");
	return {
		name: "nitro:env-aliases",
		resolveId: {
			order: "pre",
			filter: { id: new RegExp(`^(?:${keysRE})(?:/|$)`) },
			async handler(id, importer, options) {
				const resolved = resolveAlias(id, aliases);
				if (resolved !== id) return await this.resolve(resolved, importer, {
					...options,
					skipSelf: true
				}) || resolved;
			}
		}
	};
}
function nitroMain(ctx) {
	return {
		name: "nitro:main",
		sharedDuringBuild: true,
		apply: (_config, configEnv) => !configEnv.isPreview,
		async config(userConfig, _configEnv) {
			debug("[main] Extending config (appType, resolve, server)");
			if (!ctx.bundlerConfig) throw new Error("Bundler config is not initialized yet!");
			const aliases = Object.entries(ctx.bundlerConfig.base.aliases).filter(([, replacement]) => !replacement.startsWith("node:"));
			const scopeSelfAliases = ctx.nitro?.options.dev && !ctx._isVitest;
			const hostAliases = ctx._isVitest ? /* @__PURE__ */ new Map() : stringAliases(userConfig.resolve?.alias);
			const isScoped = ([find, replacement]) => scopeSelfAliases && /^nitro(\/|$)/.test(find) || hostAliases.has(find) && hostAliases.get(find) !== replacement;
			ctx._nitroEnvAliases = aliases.filter(isScoped).map(([find]) => find);
			const baseURL = useNitro(ctx).options.baseURL;
			return {
				...userConfig.base === void 0 && baseURL !== "/" && { base: baseURL },
				appType: userConfig.appType || "custom",
				resolve: { alias: aliases.filter((alias) => !isScoped(alias)).map(([find, replacement]) => ({
					find,
					replacement
				})) },
				builder: { sharedConfigBuild: true },
				server: {
					port: Number.parseInt(process.env.PORT || "") || userConfig.server?.port || useNitro(ctx).options.devServer?.port || 3e3,
					cors: false
				}
			};
		},
		configResolved(config) {
			if (ctx._isVitest) return;
			const nitroAliases = ctx.bundlerConfig.base.aliases;
			const scoped = new Set(ctx._nitroEnvAliases);
			for (const { find, replacement } of config.resolve.alias) if (typeof find === "string" && Object.hasOwn(nitroAliases, find) && nitroAliases[find] !== replacement && !nitroAliases[find].startsWith("node:")) scoped.add(find);
			ctx._nitroEnvAliases = [...scoped];
		},
		buildApp: {
			order: "post",
			handler(builder) {
				debug("[main] Building environments");
				return buildEnvironments(ctx, builder);
			}
		},
		generateBundle: { handler(_options, bundle) {
			const environment = this.environment;
			debug("[main] Generating manifest and entry points for environment:", environment.name);
			const isRegisteredService = Object.keys(ctx.services).includes(environment.name);
			let entryFile;
			const serviceEntry = isRegisteredService && ctx.services[environment.name]?.entry ? resolve$2(ctx.services[environment.name].entry) : void 0;
			for (const [_name, file] of Object.entries(bundle)) if (file.type === "chunk" && isRegisteredService && file.isEntry) {
				if (serviceEntry && file.facadeModuleId && resolve$2(file.facadeModuleId) === serviceEntry) {
					entryFile = file.fileName;
					break;
				}
				if (entryFile === void 0) entryFile = file.fileName;
			}
			if (isRegisteredService) {
				if (entryFile === void 0) this.error(`No entry point found for service "${this.environment.name}".`);
				ctx._entryPoints[this.environment.name] = entryFile;
				this.emitFile({
					type: "asset",
					fileName: SERVICE_MANIFEST_FILE,
					source: JSON.stringify({ entry: entryFile })
				});
			}
		} },
		configureServer: async (server) => {
			if (ctx._isVitest) return;
			debug("[main] Configuring dev server");
			const { configureViteDevServer } = await import("./vite.dev.mjs");
			return configureViteDevServer(ctx, server);
		},
		closeBundle: {
			order: "post",
			handler() {
				if (!ctx.nitro?.options.dev) return;
				return ctx._closePromise ??= ctx.nitro.close();
			}
		},
		async hotUpdate({ server, file, modules, timestamp }) {
			const env = this.environment;
			if (env.config.consumer === "client" || ctx._isVitest) return;
			if (ctx.nitro?.options.vite?.serverReload === false) {
				const invalidated = /* @__PURE__ */ new Set();
				for (const mod of modules) env.moduleGraph.invalidateModule(mod, invalidated, timestamp, false);
				return [];
			}
			if (modules.length > 0) ctx.devApp?.reloadSignal.bump();
			const clientEnvs = Object.values(server.environments).filter((env) => env.config.consumer === "client");
			const serverOnlyModules = [];
			const sharedModules = [];
			const invalidated = /* @__PURE__ */ new Set();
			for (const mod of modules) if (mod.id && !clientEnvs.some((env) => env.moduleGraph.getModuleById(mod.id))) {
				serverOnlyModules.push(mod);
				env.moduleGraph.invalidateModule(mod, invalidated, timestamp, false);
			} else sharedModules.push(mod);
			if (serverOnlyModules.length > 0) {
				env.hot.send({
					type: "full-reload",
					triggeredBy: file
				});
				if (sharedModules.length === 0 && serverOnlyModules.some((m) => m.environment !== "ssr")) server.ws.send({ type: "full-reload" });
				return sharedModules;
			}
		}
	};
}
function nitroPrepare(ctx) {
	return {
		name: "nitro:prepare",
		sharedDuringBuild: true,
		applyToEnvironment: (env) => env.name === "nitro",
		buildApp: {
			order: "pre",
			async handler() {
				debug("[prepare] Preparing output directory");
				const nitro = ctx.nitro;
				await prepare(nitro, { generatedAssetDirs: ctx._publicDistDir ? [ctx._publicDistDir] : [] });
			}
		}
	};
}
function createContext(pluginConfig) {
	return {
		pluginConfig,
		services: {},
		_entryPoints: {}
	};
}
async function checkViteVersion(ctx, runningVersion) {
	const nitro = useNitro(ctx);
	const { version } = await importVite(viteImportOptions(nitro));
	if (runningVersion && version !== runningVersion) nitro.logger.warn(`Nitro resolved \`vite@${version}\` but \`vite@${runningVersion}\` is running. Set the \`vite.path\` option to the running \`vite\` package (e.g. \`import.meta.resolve("vite")\`).`);
}
function useNitro(ctx) {
	if (!ctx.nitro) throw new Error("Nitro instance is not initialized yet.");
	return ctx.nitro;
}
async function setupNitroContext(ctx, configEnv, userConfig) {
	const providedNitro = ctx.pluginConfig._nitro;
	const nitroConfig = {
		dev: configEnv.command === "serve",
		builder: "vite",
		rootDir: userConfig.root,
		...mergeConfig(ctx.pluginConfig, userConfig.nitro)
	};
	ctx._pluginModules = (await flattenPlugins(userConfig, configEnv)).filter((p) => p.nitro);
	const pluginModules = ctx._pluginModules.map((p) => p.nitro);
	nitroConfig.modules = [...nitroConfig.modules || [], ...pluginModules];
	if (nitroConfig.vite?.services) nitroConfig.services = {
		...nitroConfig.vite.services,
		...nitroConfig.services
	};
	if (providedNitro) applyInlineViteOptions(providedNitro, nitroConfig);
	const dotenvFileNames = [".env", ".env.local"];
	if (configEnv.mode) dotenvFileNames.push(`.env.${configEnv.mode}`, `.env.${configEnv.mode}.local`);
	const viteBase = ctx._isVitest ? void 0 : getPathBase(userConfig.base);
	ctx.nitro = providedNitro || await createNitro(nitroConfig, {
		dotenv: { fileName: dotenvFileNames },
		...viteBase && { c12: { defaults: {
			...NitroDefaults,
			baseURL: process.env.NITRO_APP_BASE_URL || viteBase
		} } }
	});
	if (providedNitro && pluginModules.length > 0) {
		providedNitro.options.modules = nitroConfig.modules;
		await installModules(providedNitro, pluginModules);
	}
	ctx.nitro._pageTemplate = { context: [{
		from: "nitro/vite/runtime",
		name: "fetchViteEnv"
	}] };
	const { options } = ctx.nitro;
	options.services = resolveServices(options, {
		...options.vite?.services,
		...options.services
	});
	ctx.services = options.services;
	ctx.nitro._serviceLoader = (name) => viteServiceLoader(ctx, name);
	if (!ctx.services.ssr) {
		const userSsrEnv = userConfig.environments?.ssr;
		const userSsrInput = userSsrEnv?.build?.rolldownOptions?.input ?? userSsrEnv?.build?.rollupOptions?.input;
		if (userSsrEnv === void 0 || ctx._isVitest && !userSsrInput) {
			const ssrEntry = findSSREntry(ctx.nitro);
			if (ssrEntry) {
				ctx.services.ssr = { entry: ssrEntry };
				ctx.nitro.logger.info(`Using \`${prettyPath(ssrEntry)}\` as vite ssr entry.`);
			}
		} else {
			const ssrEntry = getEntry(userSsrInput);
			if (typeof ssrEntry === "string") ctx.services.ssr = { entry: resolveServiceEntry(ctx.nitro.options, ssrEntry) };
		}
	}
	checkServerEntry(ctx.nitro);
	const publicDistDir = ctx._publicDistDir = userConfig.build?.outDir || resolve$2(ctx.nitro.options.buildDir, "vite/public");
	ctx.nitro.options.publicAssets.push({
		dir: publicDistDir,
		maxAge: 0,
		baseURL: "/",
		fallthrough: true
	});
	if (ctx._isVitest) ctx.nitro.options.devServer.runner = "node-worker";
	await ctx.nitro.hooks.callHook("build:before", ctx.nitro);
	ctx.bundlerConfig = await getBundlerConfig(ctx);
	await ctx.nitro.hooks.callHook("build:config", ctx.nitro, ctx.bundlerConfig.rollupConfig ? {
		builder: "vite",
		rollup: ctx.bundlerConfig.rollupConfig
	} : {
		builder: "vite",
		rolldown: ctx.bundlerConfig.rolldownConfig
	});
	if (ctx.nitro.options.dev && !ctx._isVitest) ctx.nitro.fetch = async (req) => (await initEnvRunner(ctx)).fetch(req);
	if (ctx.nitro.options.dev && !ctx._isVitest && !ctx.devApp) ctx.devApp = new NitroDevApp(ctx.nitro);
	ctx.nitro.hooks.hook("close", async () => {
		await closeEnvRunner(ctx);
	});
}
function useLongerAssetHashes(build, isRolldown, assetsDir, opts) {
	const options = build[isRolldown ? "rolldownOptions" : "rollupOptions"] ??= {};
	const outputs = Array.isArray(options.output) ? options.output : [options.output ??= {}];
	const defaults = {
		...opts?.assetsOnly ? {} : {
			entryFileNames: `${assetsDir}/[name]-[hash:16].js`,
			chunkFileNames: `${assetsDir}/[name]-[hash:16].js`
		},
		assetFileNames: `${assetsDir}/[name]-[hash:16][extname]`
	};
	for (const output of outputs) for (const key of Object.keys(defaults)) {
		const current = output[key];
		if (current === void 0) output[key] = defaults[key];
		else if (typeof current === "string" && current.includes("[hash]")) output[key] = current.replaceAll("[hash]", `[hash:16]`);
	}
}
function stringAliases(alias) {
	const entries = Array.isArray(alias) ? alias.map((a) => [a.find, a.replacement]) : Object.entries(alias || {});
	return new Map(entries.filter((entry) => typeof entry[0] === "string"));
}
function getEntry(input) {
	if (typeof input === "string") return input;
	else if (Array.isArray(input) && input.length > 0) return input[0];
	else if (input && "index" in input) return input.index;
}
async function flattenPlugins(userConfig, configEnv) {
	const flat = async (plugins) => {
		const resolved = await Promise.all(plugins);
		const result = [];
		for (const plugin of resolved) {
			if (!plugin) continue;
			if (Array.isArray(plugin)) result.push(...await flat(plugin));
			else result.push(plugin);
		}
		return result;
	};
	return (await flat(userConfig.plugins || [])).filter((plugin) => {
		if (!plugin.apply) return true;
		return typeof plugin.apply === "function" ? plugin.apply({
			...userConfig,
			mode: configEnv.mode
		}, configEnv) : plugin.apply === configEnv.command;
	});
}
function applyInlineViteOptions(nitro, nitroConfig) {
	if (nitroConfig.vite) nitro.options.vite = O$1(nitroConfig.vite, nitro.options.vite);
	if (nitroConfig.services) Object.assign(nitro.options.services, resolveServices(nitro.options, nitroConfig.services));
}
function getPathBase(base) {
	if (base && base !== "/" && base.startsWith("/") && !base.startsWith("//")) return base;
}
export { nitro };
