import { __toESM } from "./_common.mjs";
import { n, r } from "./_chunks/compatx.mjs";
import { F, MagicString$1, T, basename$2, colors, consola, deps, dirname$2, ensureDep, escapeRegExp$1, extendEnv, glob, hash, importDep, importOXC, join$2, joinURL, kebabCase, presetsDir, relative$2, resolve$2, resolveModulePath, runtimeDir, src_default, version, walkAST, withLeadingSlash, withTrailingSlash, withoutLeadingSlash, withoutTrailingSlash, writeFile$1 as writeFile$1$1 } from "./_chunks/common.mjs";
import { Be, ne, wa } from "./_chunks/confbox.mjs";
import { E, h, x } from "./_chunks/pkg-types.mjs";
import { O } from "./_chunks/c12_rc9_defu_destr.mjs";
import { isLocalDevRequest } from "./_request.mjs";
import { HTTPError, addRoute, compareRoutes, createRouter, findOverlappingRoutes, routeToRegExp } from "./_libs/h3+rou3.mjs";
import { builtinModules } from "node:module";
import { constants, existsSync, promises } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import fs$1, { readFile, rename, writeFile } from "node:fs/promises";
// node_modules/nitro/dist/_presets.mjs
function defineNitroPreset(preset, meta) {
	if (typeof preset !== "function" && preset.entry && preset.entry.startsWith(".")) preset.entry = resolve(presetsDir, preset.entry);
	return {
		...preset,
		_meta: meta
	};
}
var base_worker_default = [defineNitroPreset({
	entry: null,
	node: false,
	minify: true,
	noExternals: true,
	rollupConfig: { output: {
		format: "iife",
		generatedCode: { symbols: true }
	} },
	inlineDynamicImports: true
}, { name: "base-worker" })];
var nitro_dev_default = [defineNitroPreset({
	entry: "./_nitro/runtime/nitro-dev",
	output: {
		dir: "{{ buildDir }}/dev",
		serverDir: "{{ buildDir }}/dev",
		publicDir: "{{ buildDir }}/dev"
	},
	handlers: [{
		route: "/_nitro/tasks/**",
		lazy: true,
		handler: join$2(runtimeDir, "internal/routes/dev-tasks")
	}],
	externals: { noTrace: true },
	serveStatic: true,
	inlineDynamicImports: true,
	sourcemap: true
}, {
	name: "nitro-dev",
	dev: true
})];
var nitro_prerender_default = [defineNitroPreset({
	entry: "./_nitro/runtime/nitro-prerenderer",
	serveStatic: true,
	output: { serverDir: "{{ buildDir }}/prerender" },
	externals: { noTrace: true }
}, { name: "nitro-prerender" })];
var nitro_serve_default = [defineNitroPreset({
	entry: "./_nitro/runtime/nitro-serve",
	serveStatic: false
}, { name: "nitro-serve" })];
var preset_default$27 = [
	...base_worker_default,
	...nitro_dev_default,
	...nitro_prerender_default,
	...nitro_serve_default
];
var preset_default$26 = [
	defineNitroPreset({
		static: true,
		output: {
			dir: "{{ rootDir }}/.output",
			publicDir: "{{ output.dir }}/public"
		},
		prerender: { crawlLinks: true },
		commands: { preview: "npx serve ./public" }
	}, {
		name: "static",
		static: true
	}),
	defineNitroPreset({
		extends: "static",
		commands: { deploy: "npx gh-pages --dotfiles -d ./public" },
		prerender: { routes: ["/", "/404.html"] },
		hooks: { async compiled(nitro) {
			await fs$1.writeFile(join$2(nitro.options.output.publicDir, ".nojekyll"), "");
		} }
	}, {
		name: "github-pages",
		static: true
	}),
	defineNitroPreset({
		extends: "static",
		prerender: { routes: ["/", "/404.html"] }
	}, {
		name: "gitlab-pages",
		static: true
	})
];
var preset_default$25 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true,
	commands: { deploy: "rsync -rRt --info=progress2 ./ [account]@ssh-[account].alwaysdata.net:www/my-app" }
}, { name: "alwaysdata" })];
async function writeAmplifyFiles(nitro) {
	const outDir = nitro.options.output.dir;
	const routes = [];
	let hasWildcardPublicAsset = false;
	if (nitro.options.awsAmplify?.imageOptimization && !nitro.options.static) {
		const { path, cacheControl } = nitro.options.awsAmplify?.imageOptimization || {};
		if (path) routes.push({
			path,
			target: {
				kind: "ImageOptimization",
				cacheControl
			}
		});
	}
	const computeTarget = nitro.options.static ? { kind: "Static" } : {
		kind: "Compute",
		src: "default"
	};
	for (const publicAsset of nitro.options.publicAssets) {
		if (!publicAsset.baseURL || publicAsset.baseURL === "/") {
			hasWildcardPublicAsset = true;
			continue;
		}
		routes.push({
			path: `${publicAsset.baseURL.replace(/\/$/, "")}/*`,
			target: {
				kind: "Static",
				cacheControl: publicAsset.maxAge && publicAsset.maxAge > 0 ? `public, max-age=${publicAsset.maxAge}, immutable` : void 0
			},
			fallback: publicAsset.fallthrough ? computeTarget : void 0
		});
	}
	if (hasWildcardPublicAsset && !nitro.options.static) routes.push({
		path: "/*.*",
		target: { kind: "Static" },
		fallback: computeTarget
	});
	routes.push({
		path: "/*",
		target: computeTarget,
		fallback: hasWildcardPublicAsset && nitro.options.awsAmplify?.catchAllStaticFallback ? { kind: "Static" } : void 0
	});
	for (const route of routes) if (route.path !== "/*") route.path = joinURL(nitro.options.baseURL, route.path);
	const deployManifest = {
		version: 1,
		routes,
		imageSettings: nitro.options.awsAmplify?.imageSettings || void 0,
		computeResources: nitro.options.static ? void 0 : [{
			name: "default",
			entrypoint: "server.js",
			runtime: nitro.options.awsAmplify?.runtime || "nodejs22.x"
		}],
		framework: {
			name: nitro.options.framework.name || "nitro",
			version: nitro.options.framework.version || "0.0.0"
		}
	};
	await writeFile(resolve(outDir, "deploy-manifest.json"), JSON.stringify(deployManifest, null, 2));
	if (!nitro.options.static) await writeFile(resolve(outDir, "compute/default/server.js"), `import("./index.mjs")`);
}
var preset_default$24 = [defineNitroPreset({
	entry: "./aws-amplify/runtime/aws-amplify",
	manifest: { deploymentId: process.env.AWS_JOB_ID },
	serveStatic: true,
	output: {
		dir: "{{ rootDir }}/.amplify-hosting",
		serverDir: "{{ output.dir }}/compute/default",
		publicDir: "{{ output.dir }}/static{{ baseURL }}"
	},
	commands: { preview: "node ./compute/default/server.js" },
	hooks: { async compiled(nitro) {
		await writeAmplifyFiles(nitro);
	} }
}, {
	name: "aws-amplify",
	stdName: "aws_amplify"
})];
var preset_default$23 = [defineNitroPreset({
	entry: "./aws-lambda/runtime/aws-lambda",
	awsLambda: { streaming: false },
	hooks: { "build:config": (nitro, buildConfig) => {
		if (!nitro.options.awsLambda?.streaming) return;
		if (buildConfig.builder === "rspack") {
			const rspack = buildConfig.rspack;
			if (typeof rspack.entry === "string") rspack.entry += "-streaming";
			else rspack.entry.index += "-streaming";
			return;
		}
		if (buildConfig.bun) {
			buildConfig.bun.entrypoints = buildConfig.bun.entrypoints?.map((entry) => `${entry}-streaming`);
			return;
		}
		const config = buildConfig.rollup ?? buildConfig.rolldown;
		config.input += "-streaming";
	} }
}, { name: "aws-lambda" })];
function prettyPath(p, highlight = true) {
	p = relative$2(process.cwd(), p);
	return highlight ? colors.cyan(p) : p;
}
async function writeFile$1(file, contents, log = false) {
	await fs$1.mkdir(dirname$2(file), { recursive: true });
	await fs$1.writeFile(file, contents, typeof contents === "string" ? "utf8" : void 0);
	if (log) consola.info("Generated", prettyPath(file));
}
async function setupAzureFunctions(nitro) {
	const azure = nitro.options.azure ??= {};
	azure.functionsVersion ??= 4;
	if (azure.functionsVersion !== 3 && azure.functionsVersion !== 4) throw new Error(`Invalid \`azure.functionsVersion\`: \`${azure.functionsVersion}\`. Supported values are \`3\` and \`4\`.`);
	if (azure.functionsVersion === 4) {
		const { reason, version } = deps["@azure/functions"];
		const installedVersion = await getInstalledFunctionsVersion(nitro.options.rootDir);
		if (!installedVersion) {
			if (!await ensureDep({
				id: "@azure/functions",
				dir: nitro.options.rootDir,
				deps: nitro.options.deps
			})) throw new Error(`\`@azure/functions@${version}\` is not installed. Please add it to your dependencies for ${reason}, or set \`azure.functionsVersion\` to \`3\` to use the legacy programming model.`);
		} else if (installedVersion < 4) throw new Error(`\`@azure/functions@${installedVersion}\` is installed, but ${reason} requires \`@azure/functions@${version}\`. Please update it in your dependencies, or set \`azure.functionsVersion\` to \`3\` to use the legacy programming model.`);
		(nitro.options.traceDeps ??= []).push("@azure/functions");
	}
	nitro.options.entry = nitro.options.entry.replace("{version}", `v${azure.functionsVersion}`);
}
async function writeFunctionFiles(nitro) {
	const serverDir = nitro.options.output.serverDir;
	if (nitro.options.azure?.functionsVersion === 4) await writeFile$1(resolve$2(serverDir, "../package.json"), JSON.stringify({
		private: true,
		type: "module",
		main: "functions/index.mjs"
	}, null, 2));
	else {
		await writeFile$1(resolve$2(serverDir, "function.json"), JSON.stringify({
			entryPoint: "handle",
			bindings: [{
				authLevel: "anonymous",
				type: "httpTrigger",
				direction: "in",
				name: "req",
				route: "{*url}",
				methods: [
					"delete",
					"get",
					"head",
					"options",
					"patch",
					"post",
					"put"
				]
			}, {
				type: "http",
				direction: "out",
				name: "res"
			}]
		}, null, 2));
		await writeFile$1(resolve$2(serverDir, "../package.json"), JSON.stringify({ private: true }));
	}
	await writeFile$1(resolve$2(serverDir, "../local.settings.json"), JSON.stringify({
		IsEncrypted: false,
		Values: { FUNCTIONS_WORKER_RUNTIME: "node" }
	}, null, 2));
}
async function getInstalledFunctionsVersion(rootDir) {
	const pkgPath = resolveModulePath("@azure/functions/package.json", {
		from: rootDir,
		try: true
	});
	if (!pkgPath) return;
	const { version } = JSON.parse(await fs$1.readFile(pkgPath, "utf8"));
	return Number.parseInt(version, 10) || void 0;
}
async function writeSWARoutes(nitro) {
	const host = { version: "2.0" };
	const supportedNodeVersions = /* @__PURE__ */ new Set(["20", "22"]);
	let nodeVersion = "22";
	try {
		const currentNodeVersion = JSON.parse(await fs$1.readFile(join$2(nitro.options.rootDir, "package.json"), "utf8")).engines.node;
		if (supportedNodeVersions.has(currentNodeVersion)) nodeVersion = currentNodeVersion;
	} catch {
		const currentNodeVersion = process.versions.node.slice(0, 2);
		if (supportedNodeVersions.has(currentNodeVersion)) nodeVersion = currentNodeVersion;
	}
	const config = {
		...nitro.options.azure?.config,
		routes: [],
		platform: {
			apiRuntime: `node:${nodeVersion}`,
			...nitro.options.azure?.config?.platform
		},
		navigationFallback: {
			rewrite: "/api/server",
			...nitro.options.azure?.config?.navigationFallback
		}
	};
	const routeFiles = nitro._prerenderedRoutes || [];
	const indexFileExists = routeFiles.some((route) => route.fileName === "/index.html");
	if (!indexFileExists) config.routes.unshift({
		route: "/index.html",
		redirect: "/"
	}, {
		route: "/",
		rewrite: "/api/server"
	});
	for (const { fileName } of routeFiles) {
		if (!fileName || !fileName.endsWith("/index.html")) continue;
		config.routes.unshift({
			route: fileName.slice(0, -11) || "/",
			rewrite: fileName
		});
	}
	for (const { fileName } of routeFiles) {
		if (!fileName || !fileName.endsWith(".html") || fileName.endsWith("index.html")) continue;
		const route = fileName.slice(0, -5);
		const existingRouteIndex = config.routes.findIndex((_route) => _route.route === route);
		if (existingRouteIndex !== -1) config.routes.splice(existingRouteIndex, 1);
		config.routes.unshift({
			route,
			rewrite: fileName
		});
	}
	if (nitro.options.azure?.config && "routes" in nitro.options.azure.config && Array.isArray(nitro.options.azure.config.routes)) for (const customRoute of nitro.options.azure.config.routes.reverse()) {
		const existingRouteMatchIndex = config.routes.findIndex((value) => value.route === customRoute.route);
		if (existingRouteMatchIndex === -1) config.routes.unshift(customRoute);
		else config.routes[existingRouteMatchIndex] = customRoute;
	}
	await writeFile$1(resolve$2(nitro.options.output.serverDir, "../host.json"), JSON.stringify(host, null, 2));
	await writeFile$1(resolve$2(nitro.options.rootDir, "staticwebapp.config.json"), JSON.stringify(config, null, 2));
	if (!indexFileExists) {
		const relativePrefix = nitro.options.baseURL.split("/").filter(Boolean).map(() => "..").join("/");
		await writeFile$1(resolve$2(nitro.options.output.publicDir, relativePrefix ? `${relativePrefix}/index.html` : "index.html"), "");
	}
}
var preset_default$22 = [defineNitroPreset({
	entry: "./azure/runtime/azure-swa.{version}",
	output: {
		serverDir: "{{ output.dir }}/server/functions",
		publicDir: "{{ output.dir }}/public/{{ baseURL }}"
	},
	commands: { preview: "npx @azure/static-web-apps-cli start ./public --api-location ./server" },
	hooks: {
		async "build:before"(nitro) {
			await setupAzureFunctions(nitro);
		},
		async compiled(ctx) {
			await writeSWARoutes(ctx);
			await writeFunctionFiles(ctx);
		}
	}
}, {
	name: "azure-swa",
	stdName: "azure_static"
})];
var preset_default$21 = [defineNitroPreset({
	entry: "./bun/runtime/bun",
	serveStatic: true,
	exportConditions: ["bun"],
	commands: { preview: "bun run ./server/index.mjs" }
}, { name: "bun" })];
var preset_default$20 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, {
	name: "cleavr",
	stdName: "cleavr"
})];
var builtnNodeModules$1 = [
	"node:_http_agent",
	"node:_http_client",
	"node:_http_common",
	"node:_http_incoming",
	"node:_http_outgoing",
	"node:_http_server",
	"node:_stream_duplex",
	"node:_stream_passthrough",
	"node:_stream_readable",
	"node:_stream_transform",
	"node:_stream_writable",
	"node:_tls_common",
	"node:_tls_wrap",
	"node:assert",
	"node:assert/strict",
	"node:async_hooks",
	"node:buffer",
	"node:constants",
	"node:crypto",
	"node:diagnostics_channel",
	"node:dns",
	"node:dns/promises",
	"node:events",
	"node:fs",
	"node:fs/promises",
	"node:http",
	"node:http2",
	"node:https",
	"node:module",
	"node:net",
	"node:os",
	"node:path",
	"node:path/posix",
	"node:path/win32",
	"node:process",
	"node:querystring",
	"node:stream",
	"node:stream/consumers",
	"node:stream/promises",
	"node:stream/web",
	"node:string_decoder",
	"node:test",
	"node:timers",
	"node:timers/promises",
	"node:tls",
	"node:url",
	"node:util",
	"node:util/types",
	"node:zlib"
];
var unenvCfNodeCompat = {
	builtinModules: builtnNodeModules$1,
	alias: { ...Object.fromEntries(builtnNodeModules$1.flatMap((m) => [[m, m], [m.replace("node:", ""), m]])) },
	inject: {
		global: "#nitro/runtime/polyfills/globalthis",
		process: "node:process",
		clearImmediate: ["node:timers", "clearImmediate"],
		setImmediate: ["node:timers", "setImmediate"],
		Buffer: ["node:buffer", "Buffer"],
		performance: false
	}
};
var unenvCfExternals = { builtinModules: [
	"cloudflare:email",
	"cloudflare:sockets",
	"cloudflare:workers",
	"cloudflare:workflows"
] };
var CATCH_ALL_RE = /\*\*(?::\w+)?/g;
var METHOD_KEY_RE = /^([A-Za-z]+)\s+(\/.*)$/;
var HTTP_METHODS = /* @__PURE__ */ new Set([
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"OPTIONS",
	"CONNECT",
	"TRACE",
	"QUERY"
]);
var NAMED_PARAM_RE = /^:[A-Za-z]\w*$/;
var SPECIAL_CHARS_RE = /[*:?+(){}]/;
var SPLAT_SEGMENT_RE = /^[^*:?+(){}]*\*[^*:?+(){}]*$/;
function parseRouteKey(key) {
	const match = METHOD_KEY_RE.exec(key);
	const method = match?.[1].toUpperCase();
	if (!method || !HTTP_METHODS.has(method)) return { path: key };
	return {
		path: match[2],
		methods: method === "GET" ? ["GET", "HEAD"] : [method]
	};
}
function skipUnsupportedRoute(nitro, opts) {
	const { route, file } = opts;
	const reason = unsupportedReason(route, file);
	if (reason) {
		nitro.logger.warn(`Skipping route rule \`${route}\` in \`${file}\`, ${reason}. The Nitro runtime still applies it` + (file === "_headers" ? ", but not to static assets." : "."));
		return true;
	}
	const shadowed = opts.routes && findShadowedRoute(route, opts.routes.filter((key) => unsupportedReason(key, file)));
	if (!shadowed) return false;
	nitro.logger.warn(`Skipping route rule \`${route}\` in \`${file}\`, as it would take precedence over the skipped route rule \`${shadowed}\`. The Nitro runtime still applies both.`);
	return true;
}
function isSplatExpressible(route, opts) {
	const segments = routeToSplat(route).split("/");
	return segments.every((segment, index) => NAMED_PARAM_RE.test(segment) || !SPECIAL_CHARS_RE.test(segment) || segment === "*" && index === segments.length - 1 || opts.file === "_headers" && !route.includes("**") && SPLAT_SEGMENT_RE.test(segment));
}
function findShadowedRoute(route, skipped) {
	const { path } = parseRouteKey(route);
	return skipped.find((key) => {
		const comparison = compareRoutes(path, parseRouteKey(key).path);
		return comparison !== "subset" && comparison !== "disjoint";
	});
}
function sortRoutes(routes) {
	const router = createRouter();
	const keys = routes.map((route) => [route, methodRank(route)]);
	for (const [route] of keys.sort((a, b) => a[1] - b[1])) addRoute(router, "", parseRouteKey(route).path, route);
	return findOverlappingRoutes(router, "", "/**").map((match) => match.data).reverse();
}
function routeToSplat(route) {
	return route.replace(CATCH_ALL_RE, "*");
}
function hasHeaders(routeRules) {
	return Object.keys(routeRules.headers || {}).length > 0;
}
function catchAllRef(src) {
	return `$${new RegExp(`${src.source}|`).exec("").length - 1 || 1}`;
}
function unsupportedReason(route, file) {
	const { path, methods } = parseRouteKey(route);
	if (methods) return "as it cannot match by HTTP method";
	if (!isSplatExpressible(path, { file })) return "as its path syntax cannot express the pattern";
}
function methodRank(route) {
	const methods = parseRouteKey(route).methods;
	return methods ? methods[0] === "HEAD" ? 2 : 1 : 0;
}
var HEADER_LINE_RE = /^\s+(?:!\s*)?([\w-]+)/;
var PATH_LINE_RE = /^[^\s#]/;
function getPublicAssetCorsHeaders(nitro, opts = {}) {
	const routeRules = nitro.options.routeRules;
	const keys = sortRoutes(Object.keys(routeRules)).reverse();
	const entries = [];
	for (const asset of nitro.options.publicAssets) {
		const base = asset.baseURL || "/";
		if (asset.fallthrough || base === "/") continue;
		const files = joinURL(base, "**:file");
		const dirKeys = keys.filter((key) => covers(key, files));
		const cors = mergeCors(nitro, dirKeys);
		if (!cors) continue;
		const corsHeaders = getStaticCorsHeaders(cors);
		if (!corsHeaders) {
			nitro.logger.warn(`Not adding CORS headers to the public assets of \`${base}\`, as their \`cors\` rule allows only some origins. Set them with \`headers\` on \`${joinURL(base, "**")}\` instead.`);
			continue;
		}
		const conflict = keys.find((key) => {
			const { path, methods } = parseRouteKey(key);
			if (dirKeys.includes(key) || compareRoutes(path, files) === "disjoint") return false;
			const rule = routeRules[key];
			if (Object.keys(rule.headers || {}).some((header) => header.toLowerCase() in corsHeaders)) return true;
			if (rule.cors === void 0) return false;
			if (methods) return true;
			const inner = mergeCors(nitro, keys.filter((other) => dirKeys.includes(other) || covers(other, path)));
			return !isSameHeaders(inner ? getStaticCorsHeaders(inner) : void 0, corsHeaders);
		});
		if (conflict) {
			nitro.logger.warn(`Not adding CORS headers to the public assets of \`${base}\`, as the rule of \`${conflict}\` sets another CORS header for some of them only. Set them with \`headers\` instead.`);
			continue;
		}
		const userHeaders = /* @__PURE__ */ new Set([...dirKeys.flatMap((key) => Object.keys(routeRules[key].headers || {})).map((header) => header.toLowerCase()), ...getFileHeaders(opts.headersFile || "", joinURL(nitro.options.baseURL, files))]);
		const headers = Object.fromEntries(Object.entries(corsHeaders).filter(([header]) => !userHeaders.has(header)));
		if (Object.keys(headers).length > 0) entries.push({
			base,
			files,
			headers
		});
	}
	return entries.filter((entry, index) => !entries.some((other, otherIndex) => {
		const comparison = compareRoutes(other.files, entry.files);
		return comparison === "superset" || comparison === "equal" && otherIndex < index;
	})).map(({ base, headers }) => ({
		base,
		headers
	}));
}
function covers(key, pattern) {
	const { path, methods } = parseRouteKey(key);
	const comparison = compareRoutes(path, pattern);
	return !methods && (comparison === "equal" || comparison === "superset");
}
function mergeCors(nitro, keys) {
	let cors;
	for (const key of keys) {
		const rule = nitro.options.routeRules[key].cors;
		if (rule !== void 0) cors = rule && cors ? {
			...cors,
			...rule
		} : rule;
	}
	return cors;
}
function getStaticCorsHeaders(cors) {
	if (cors.origin && cors.origin !== "*") return;
	const headers = { "access-control-allow-origin": "*" };
	const exposeHeaders = cors.exposeHeaders ?? "*";
	if (exposeHeaders.length > 0) headers["access-control-expose-headers"] = exposeHeaders === "*" ? "*" : exposeHeaders.join(",");
	return headers;
}
function getFileHeaders(contents, pattern) {
	const headers = [];
	let matches = false;
	for (const line of contents.split("\n")) {
		const header = HEADER_LINE_RE.exec(line);
		if (header) {
			if (matches) headers.push(header[1].toLowerCase());
		} else if (PATH_LINE_RE.test(line)) matches = mayMatch(line.trim(), pattern);
	}
	return headers;
}
function mayMatch(splatPath, pattern) {
	try {
		return compareRoutes(splatPath.replaceAll("*", "**"), pattern) !== "disjoint";
	} catch {
		return true;
	}
}
function isSameHeaders(a, b) {
	return JSON.stringify(a) === JSON.stringify(b);
}
var NODEJS_COMPAT_SUPPORTED_FROM_DATE = "2024-09-23";
var NODEJS_COMPAT_DEFAULT_ON_DATE = "2026-08-04";
async function writeCFRoutes(nitro) {
	const _cfPagesConfig = nitro.options.cloudflare?.pages || {};
	const routes = {
		version: _cfPagesConfig.routes?.version || 1,
		include: _cfPagesConfig.routes?.include || ["/*"],
		exclude: _cfPagesConfig.routes?.exclude || []
	};
	const writeRoutes = () => writeFile$1(resolve$2(nitro.options.output.dir, "_routes.json"), JSON.stringify(routes, void 0, 2), true);
	if (_cfPagesConfig.defaultRoutes === false) {
		await writeRoutes();
		return;
	}
	const explicitPublicAssets = nitro.options.publicAssets.filter((dir, index, array) => {
		if (dir.fallthrough || !dir.baseURL) return false;
		const normalizedBase = withoutLeadingSlash(dir.baseURL);
		return !array.some((otherDir, otherIndex) => otherIndex !== index && normalizedBase.startsWith(withoutLeadingSlash(withTrailingSlash(otherDir.baseURL))));
	});
	routes.exclude.push(...explicitPublicAssets.map((asset) => joinURL(nitro.options.baseURL, asset.baseURL || "/", "*")).sort(comparePaths));
	const publicAssetFiles = await glob("**", {
		cwd: nitro.options.output.dir,
		absolute: false,
		dot: true,
		ignore: [
			"_worker.js",
			"_worker.js.map",
			"nitro.json",
			...routes.exclude.map((path) => withoutLeadingSlash(path.replace(/\/\*$/, "/**")))
		]
	});
	routes.exclude.push(...publicAssetFiles.map((i) => withLeadingSlash(i).replace(/\/index\.html$/, "").replace(/\.html$/, "") || "/").sort(comparePaths));
	routes.exclude.splice(100 - routes.include.length);
	await writeRoutes();
}
function comparePaths(a, b) {
	return a.split("/").length - b.split("/").length || a.localeCompare(b);
}
async function writeCFHeaders(nitro, outdir) {
	const headersPath = join$2(outdir === "assets" ? getCFAssetsDir(nitro) : outdir === "public" ? nitro.options.output.publicDir : nitro.options.output.dir, "_headers");
	const userHeadersPath = outdir === "assets" ? join$2(nitro.options.output.publicDir, "_headers") : headersPath;
	const contents = [];
	for (const path of sortRoutes(Object.keys(nitro.options.routeRules))) {
		const routeRules = nitro.options.routeRules[path];
		if (!hasHeaders(routeRules) || skipUnsupportedRoute(nitro, {
			route: path,
			file: "_headers"
		})) continue;
		const headers = [joinURL(nitro.options.baseURL, routeToSplat(path)), ...Object.entries({ ...routeRules.headers }).map(([header, value]) => `  ${header}: ${value}`)].join("\n");
		contents.push(headers);
	}
	const headersFile = existsSync(userHeadersPath) ? await readFile(userHeadersPath, "utf8") : void 0;
	for (const { base, headers } of getPublicAssetCorsHeaders(nitro, { headersFile })) contents.push([joinURL(nitro.options.baseURL, base, "*"), ...Object.entries(headers).map(([header, value]) => `  ${header}: ${value}`)].join("\n"));
	if (headersFile !== void 0) {
		if (userHeadersPath !== headersPath) await rename(userHeadersPath, headersPath);
		if (/^\/\* /m.test(headersFile)) {
			nitro.logger.info("Not adding Nitro fallback to `_headers` (as an existing fallback was found).");
			return;
		}
		nitro.logger.info("Adding Nitro fallback to `_headers` to handle all unmatched routes.");
		contents.unshift(headersFile);
	}
	await writeFile$1(headersPath, contents.join("\n"), true);
}
async function moveCFRedirects(nitro) {
	const source = join$2(nitro.options.output.publicDir, "_redirects");
	const target = join$2(getCFAssetsDir(nitro), "_redirects");
	if (source !== target && existsSync(source)) await rename(source, target);
}
function getCFAssetsDir(nitro) {
	const publicDir = withoutTrailingSlash(nitro.options.output.publicDir);
	const base = withoutTrailingSlash(nitro.options.baseURL);
	return base && publicDir.endsWith(base) ? publicDir.slice(0, -base.length) : publicDir;
}
async function writeCFPagesRedirects(nitro) {
	const redirectsPath = join$2(nitro.options.output.dir, "_redirects");
	const staticFallback = existsSync(join$2(nitro.options.output.publicDir, "404.html")) ? `${joinURL(nitro.options.baseURL, "/*")} ${joinURL(nitro.options.baseURL, "/404.html")} 404` : "";
	const contents = [];
	const routes = sortRoutes(Object.keys(nitro.options.routeRules));
	const redirects = routes.filter((key) => nitro.options.routeRules[key].redirect);
	for (const key of routes) {
		const redirect = nitro.options.routeRules[key].redirect;
		if (!redirect || skipUnsupportedRoute(nitro, {
			route: key,
			file: "_redirects",
			routes: redirects
		})) continue;
		const code = redirect.status;
		const from = joinURL(nitro.options.baseURL, routeToSplat(key));
		const to = redirect.to.replaceAll("**", ":splat");
		contents.push(`${from}\t${to}\t${code}`);
	}
	contents.push(staticFallback);
	if (existsSync(redirectsPath)) {
		const currentRedirects = await readFile(redirectsPath, "utf8");
		if (/^\/\* /m.test(currentRedirects)) {
			nitro.logger.info("Not adding Nitro fallback to `_redirects` (as an existing fallback was found).");
			return;
		}
		nitro.logger.info("Adding Nitro fallback to `_redirects` to handle all unmatched routes.");
		contents.unshift(currentRedirects);
	}
	await writeFile$1(redirectsPath, contents.join("\n"), true);
}
async function enableNodeCompat(nitro) {
	nitro.options.cloudflare ??= {};
	nitro.options.cloudflare.deployConfig ??= true;
	nitro.options.cloudflare.nodeCompat ??= true;
	if (nitro.options.cloudflare.nodeCompat) {
		nitro.options.rolldownConfig ??= {};
		nitro.options.rolldownConfig.platform ??= "node";
		extendEnv(nitro, unenvCfNodeCompat);
	}
}
var extensionParsers = {
	".json": ne,
	".jsonc": ne,
	".toml": Be
};
async function readWranglerConfig(nitro) {
	const configPath = await h([
		"wrangler.json",
		"wrangler.jsonc",
		"wrangler.toml"
	], { startingFrom: nitro.options.rootDir }).catch(() => void 0);
	if (!configPath) return {};
	const userConfigText = await readFile(configPath, "utf8");
	const parser = extensionParsers[extname(configPath)];
	if (!parser) throw new Error(`Unsupported config file format: ${configPath}`);
	return {
		configPath,
		config: parser(userConfigText)
	};
}
async function writeWranglerConfig(nitro, cfTarget) {
	if (!nitro.options.cloudflare?.deployConfig) return;
	const wranglerConfigDir = nitro.options.output.serverDir;
	const wranglerConfigPath = join$2(wranglerConfigDir, "wrangler.json");
	const defaults = {};
	const overrides = {};
	defaults.compatibility_date = nitro.options.compatibilityDate.cloudflare || nitro.options.compatibilityDate.default;
	if (cfTarget === "pages") overrides.pages_build_output_dir = relative(wranglerConfigDir, nitro.options.output.dir);
	else {
		const assetsDirectory = relative(wranglerConfigDir, resolve$2(nitro.options.output.publicDir, "../".repeat(nitro.options.baseURL.split("/").filter(Boolean).length)));
		if (nitro.options.static) overrides.assets = { directory: assetsDirectory };
		else {
			overrides.main = relative(wranglerConfigDir, join$2(nitro.options.output.serverDir, "index.mjs"));
			overrides.assets = {
				binding: "ASSETS",
				directory: assetsDirectory
			};
		}
	}
	const { configPath: userConfigPath, config: userConfig = {} } = await readWranglerConfig(nitro);
	const ctxConfig = nitro.options.cloudflare?.wrangler || {};
	const mainIsServerEntry = !!userConfig.main && !!nitro.options.serverEntry && resolve$2(dirname(userConfigPath), userConfig.main) === nitro.options.serverEntry.handler;
	for (const key in overrides) {
		if (key === "main" && mainIsServerEntry) continue;
		let conflict;
		if (key === "assets") conflict = findAssetsConflict(overrides.assets, ctxConfig.assets, userConfig.assets, {
			generatedDir: wranglerConfigDir,
			userDir: userConfigPath ? dirname(userConfigPath) : nitro.options.rootDir
		});
		else if (key in ctxConfig) conflict = "ctx";
		else if (key in userConfig) conflict = "user";
		if (conflict) nitro.logger.warn(`[cloudflare] Wrangler config \`${key}\`${conflict === "ctx" ? " set by config or modules" : ""} is overridden and will be ignored.`);
	}
	const wranglerConfig = O(overrides, ctxConfig, userConfig, defaults);
	if (!wranglerConfig.name) {
		wranglerConfig.name = await generateWorkerName(nitro);
		nitro.logger.info(`Using auto generated worker name: \`${wranglerConfig.name}\``);
	}
	wranglerConfig.compatibility_flags ??= [];
	if (nitro.options.cloudflare?.nodeCompat && wranglerConfig.compatibility_date && wranglerConfig.compatibility_date >= NODEJS_COMPAT_SUPPORTED_FROM_DATE && wranglerConfig.compatibility_date < NODEJS_COMPAT_DEFAULT_ON_DATE && !wranglerConfig.compatibility_flags.includes("nodejs_compat")) wranglerConfig.compatibility_flags.push("nodejs_compat");
	if (cfTarget === "module" && !nitro.options.static) {
		if (wranglerConfig.no_bundle === void 0) wranglerConfig.no_bundle = true;
		wranglerConfig.rules ??= [];
		if (!wranglerConfig.rules.some((rule) => rule.type === "ESModule")) wranglerConfig.rules.push({
			type: "ESModule",
			globs: ["**/*.mjs", "**/*.js"]
		});
	}
	if (nitro.options.experimental.tasks && Object.keys(nitro.options.scheduledTasks || {}).length > 0 && cfTarget !== "pages") {
		const schedules = Object.keys(nitro.options.scheduledTasks);
		wranglerConfig.triggers = O(wranglerConfig.triggers, { crons: [] });
		const existingCrons = new Set(wranglerConfig.triggers.crons);
		for (const schedule of schedules) if (!existingCrons.has(schedule)) wranglerConfig.triggers.crons.push(schedule);
	}
	await writeFile$1(wranglerConfigPath, JSON.stringify(wranglerConfig, null, 2), true);
	const configPath = join$2(nitro.options.rootDir, ".wrangler/deploy/config.json");
	await writeFile$1(configPath, JSON.stringify({ configPath: relative(dirname(configPath), wranglerConfigPath) }), true);
}
async function generateWorkerName(nitro) {
	const gitRepo = (await E(nitro.options.rootDir).catch(() => void 0))?.remote?.origin?.url?.replace(/\.git$/, "").match(/[/:]([^/]+\/[^/]+)$/)?.[1];
	const pkgName = (await x(nitro.options.rootDir).catch(() => void 0))?.name;
	const subpath = relative(nitro.options.workspaceDir, nitro.options.rootDir);
	return `${gitRepo || pkgName}/${subpath}`.toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-").replace(/-$/, "");
}
function findAssetsConflict(expected, ctxAssets, userAssets, opts) {
	for (const field of ["binding", "directory"]) {
		if (expected[field] === void 0) continue;
		const source = ctxAssets?.[field] == null ? "user" : "ctx";
		const value = (source === "ctx" ? ctxAssets : userAssets)?.[field];
		if (value == null) continue;
		if (field === "directory" ? resolve$2(source === "ctx" ? opts.generatedDir : opts.userDir, value) !== resolve$2(opts.generatedDir, expected.directory) : value !== expected.binding) return source;
	}
}
function setupEntryExports(nitro, opts = {}) {
	const serverEntry = nitro.options.serverEntry && nitro.options.serverEntry.handler;
	if (!serverEntry && !opts.durableObject) return;
	const originalEntry = nitro.options.entry;
	const virtualEntryId = nitro.options.entry = "#nitro/virtual/cloudflare-server-entry";
	nitro.options.virtual[virtualEntryId] = `
    ${serverEntry ? `export * from ${JSON.stringify(serverEntry)};` : ""}
    ${opts.durableObject ? `export { $DurableObject } from ${_durableRuntime};` : ""}
    export * from ${JSON.stringify(originalEntry)};
    export { default } from ${JSON.stringify(originalEntry)};
  `;
}
async function setupDevEntryExports(nitro) {
	const durableObject = await _declaresDurableObject(nitro);
	if (nitro.options.builder !== "vite") {
		setupEntryExports(nitro, { durableObject });
		return;
	}
	if (durableObject) nitro.options.virtual["#nitro/virtual/dev-worker-exports"] = `export { $DurableObject } from ${_durableRuntime};`;
}
var _durableRuntime = JSON.stringify(join$2(presetsDir, "cloudflare/runtime/_durable"));
async function _declaresDurableObject(nitro) {
	const { config = {} } = await readWranglerConfig(nitro).catch(() => ({ config: void 0 }));
	const inlineConfig = nitro.options.cloudflare?.wrangler || {};
	const envName = nitro.options.cloudflare?.wranglerEnv ?? process.env.CLOUDFLARE_ENV;
	const workerName = _workerName(inlineConfig, envName) ?? _workerName(config, envName);
	return [config, inlineConfig].some((source) => {
		const target = envName && source.env?.[envName] || source;
		return !!target.exports?.$DurableObject || !!target.durable_objects?.bindings?.some((binding) => binding.class_name === "$DurableObject" && (!binding.script_name || binding.script_name === workerName));
	});
}
function _workerName(config, envName) {
	const envWorkerName = envName ? config.env?.[envName]?.name : void 0;
	if (envWorkerName) return envWorkerName;
	if (config.name) return envName ? `${config.name}-${envName}` : config.name;
}
function cloudflareOutputRewrites() {
	return {
		name: "nitro:cloudflare-output-rewrites",
		renderChunk: {
			order: "post",
			async handler(code, chunk, options) {
				if (!mayNeedRewrites(code)) return;
				const { parseSync } = await importOXC();
				const { program, errors } = parseSync(chunk.fileName, code);
				if (errors.length > 0) {
					this.warn(`Could not parse \`${chunk.fileName}\` to apply cloudflare output rewrites: ${errors[0].message}`);
					return;
				}
				const edits = collectEdits(program);
				if (edits.length === 0) return;
				const s = new MagicString$1(code);
				for (const { start, end, content } of edits) if (content === void 0) s.remove(start, end);
				else s.update(start, end, content);
				return {
					code: s.toString(),
					map: options.sourcemap ? s.generateMap({
						hires: "boundary",
						source: chunk.fileName
					}).toString() : void 0
				};
			}
		}
	};
}
var BARE_NODE_IMPORT_HINT_RE = /import\s*["']node:/;
function mayNeedRewrites(code) {
	return BARE_NODE_IMPORT_HINT_RE.test(code) || code.includes("createRequire") && code.includes("import.meta.url");
}
var CREATE_REQUIRE_GUARD = "import.meta.url || \"file:///\"";
function collectEdits(program) {
	const edits = [];
	const createRequireNames = /* @__PURE__ */ new Set(["createRequire"]);
	const moduleNamespaces = /* @__PURE__ */ new Set();
	for (const node of program.body) {
		if (node.type !== "ImportDeclaration") continue;
		if (node.specifiers.length === 0 && node.source.value.startsWith("node:")) {
			edits.push({
				start: node.start,
				end: node.end
			});
			continue;
		}
		for (const specifier of node.specifiers) if (specifier.type === "ImportSpecifier" && importedName(specifier) === "createRequire") createRequireNames.add(specifier.local.name);
		else if (specifier.type === "ImportNamespaceSpecifier" && /^(node:)?module$/.test(node.source.value)) moduleNamespaces.add(specifier.local.name);
	}
	walkAST(program, (node) => {
		if (node.type !== "CallExpression") return;
		const arg = node.arguments[0];
		if (isCreateRequire(node.callee, createRequireNames, moduleNamespaces) && node.arguments.length === 1 && arg && isImportMetaURL(arg)) edits.push({
			start: arg.start,
			end: arg.end,
			content: CREATE_REQUIRE_GUARD
		});
	});
	return edits;
}
function isCreateRequire(callee, names, namespaces) {
	if (callee.type === "ParenthesizedExpression") return isCreateRequire(callee.expression, names, namespaces);
	if (callee.type === "SequenceExpression") return isCreateRequire(callee.expressions.at(-1), names, namespaces);
	if (callee.type === "Identifier") return names.has(callee.name);
	return callee.type === "MemberExpression" && !callee.computed && callee.object.type === "Identifier" && namespaces.has(callee.object.name) && callee.property.type === "Identifier" && callee.property.name === "createRequire";
}
function importedName(specifier) {
	return specifier.imported.type === "Identifier" ? specifier.imported.name : String(specifier.imported.value);
}
function isImportMetaURL(node) {
	return node.type === "MemberExpression" && !node.computed && node.object.type === "MetaProperty" && node.object.meta.name === "import" && node.object.property.name === "meta" && node.property.type === "Identifier" && node.property.name === "url";
}
var cloudflarePages = defineNitroPreset({
	extends: "base-worker",
	entry: "./cloudflare/runtime/cloudflare-pages",
	exportConditions: ["workerd", "worker"],
	minify: false,
	commands: {
		preview: "npx wrangler --cwd ./ pages dev",
		deploy: "npx wrangler --cwd ./ pages deploy"
	},
	output: {
		dir: "{{ rootDir }}/dist",
		publicDir: "{{ output.dir }}/{{ baseURL }}",
		serverDir: "{{ output.dir }}/_worker.js"
	},
	alias: { _mime: "mime/index.js" },
	wasm: {
		lazy: false,
		esmImport: true
	},
	rollupConfig: {
		output: {
			entryFileNames: "index.js",
			format: "esm",
			inlineDynamicImports: false
		},
		plugins: [cloudflareOutputRewrites()]
	},
	hooks: {
		"build:before": async (nitro) => {
			extendEnv(nitro, unenvCfExternals);
			await enableNodeCompat(nitro);
			setupEntryExports(nitro);
		},
		async compiled(nitro) {
			await writeWranglerConfig(nitro, "pages");
			await writeCFRoutes(nitro);
			await writeCFHeaders(nitro, "output");
			await writeCFPagesRedirects(nitro);
		}
	}
}, {
	name: "cloudflare-pages",
	stdName: "cloudflare_pages"
});
var cloudflarePagesStatic = defineNitroPreset({
	extends: "static",
	output: {
		dir: "{{ rootDir }}/dist",
		publicDir: "{{ output.dir }}/{{ baseURL }}"
	},
	commands: {
		preview: "npx wrangler --cwd ./ pages dev",
		deploy: "npx wrangler --cwd ./ pages deploy"
	},
	hooks: { async compiled(nitro) {
		await writeCFHeaders(nitro, "output");
		await writeCFPagesRedirects(nitro);
	} }
}, {
	name: "cloudflare-pages-static",
	stdName: "cloudflare_pages",
	static: true
});
var cloudflareDev = defineNitroPreset({
	extends: "nitro-dev",
	devServer: { runner: "miniflare" },
	hooks: { "build:before": async (nitro) => {
		if (nitro.options.devServer.runner === "miniflare") await setupMiniflareDev(nitro);
	} }
}, {
	name: "cloudflare-dev",
	aliases: [
		"cloudflare-module",
		"cloudflare-durable",
		"cloudflare-pages"
	],
	dev: true
});
var preset_default$19 = [
	cloudflarePages,
	cloudflarePagesStatic,
	defineNitroPreset({
		extends: "base-worker",
		entry: "./cloudflare/runtime/cloudflare-module",
		output: { publicDir: "{{ output.dir }}/public/{{ baseURL }}" },
		exportConditions: ["workerd", "worker"],
		minify: false,
		commands: {
			preview: "npx wrangler --cwd ./ dev",
			deploy: "npx wrangler --cwd ./ deploy"
		},
		rollupConfig: {
			output: {
				format: "esm",
				exports: "named",
				inlineDynamicImports: false
			},
			plugins: [cloudflareOutputRewrites()]
		},
		wasm: {
			lazy: false,
			esmImport: true
		},
		hooks: {
			"build:before": async (nitro) => {
				extendEnv(nitro, unenvCfExternals);
				await enableNodeCompat(nitro);
				setupEntryExports(nitro);
				setupTracingBridge(nitro);
			},
			async compiled(nitro) {
				await writeWranglerConfig(nitro, "module");
				await writeCFHeaders(nitro, "assets");
				await moveCFRedirects(nitro);
				await writeFile$1(resolve$2(nitro.options.output.dir, "package.json"), JSON.stringify({
					private: true,
					main: "./server/index.mjs"
				}, null, 2));
				await writeFile$1(resolve$2(nitro.options.output.dir, "package-lock.json"), JSON.stringify({ lockfileVersion: 1 }, null, 2));
			}
		}
	}, {
		name: "cloudflare-module",
		stdName: "cloudflare_workers"
	}),
	defineNitroPreset({
		extends: "cloudflare-module",
		hooks: { "build:before": (nitro) => {
			nitro.logger.warn("[cloudflare] The `cloudflare_durable` preset is deprecated. Use `cloudflare_module` instead: it exports the same `$DurableObject` class and forwards WebSocket upgrades to it when its binding is declared in your Wrangler configuration.");
		} }
	}, { name: "cloudflare-durable" }),
	cloudflareDev
];
async function setupMiniflareDev(nitro) {
	nitro.options.exportConditions = [.../* @__PURE__ */ new Set([
		"workerd",
		"worker",
		...nitro.options.exportConditions.filter((c) => c !== "node")
	])];
	extendEnv(nitro, unenvCfExternals);
	await setupDevEntryExports(nitro);
	setupTracingBridge(nitro);
}
function setupTracingBridge(nitro) {
	if (!nitro.options.tracingChannel) return;
	nitro.options.plugins ??= [];
	nitro.options.plugins.unshift(join$2(presetsDir, "cloudflare/runtime/telemetry/plugin"));
}
var preset_default$18 = [defineNitroPreset({
	entry: "./deno/runtime/deno-server",
	serveStatic: true,
	exportConditions: ["deno"],
	commands: { preview: "deno -A ./server/index.mjs" },
	rollupConfig: {
		external: (id) => id.startsWith("https://") || id.startsWith("node:") || builtinModules.includes(id),
		output: { hoistTransitiveImports: false }
	},
	hooks: { async compiled(nitro) {
		await writeFile$1(resolve$2(nitro.options.output.dir, "deno.json"), JSON.stringify({ tasks: { start: "deno run -A ./server/index.mjs" } }, null, 2));
	} }
}, {
	name: "deno-server",
	stdName: "deno-deploy",
	aliases: ["deno"]
})];
var preset_default$17 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "digital-ocean" })];
var NAMED_GROUP_RE = /\(\?<(?![=!])[^>]+>/g;
async function writeEdgeOneConfig(nitro) {
	nitro.routing.sync();
	const baseURL = nitro.options.baseURL || "/";
	const config = {
		version: 3,
		routes: []
	};
	const rules = sortRoutes(Object.keys(nitro.options.routeRules || {})).map((key) => [parseRouteKey(key), nitro.options.routeRules[key]]);
	config.routes.push(...rules.filter(([_, routeRules]) => hasHeaders(routeRules) && !routeRules.redirect).reverse().map(([{ path, methods }, routeRules]) => ({
		src: routeToRE2(joinURL(baseURL, path)).source,
		...methods && { methods },
		headers: routeRules.headers,
		continue: true
	})), ...getPublicAssetCorsHeaders(nitro).map(({ base, headers }) => ({
		src: routeToRE2(joinURL(baseURL, base, "**")).source,
		headers,
		continue: true
	})), ...rules.filter(([_, routeRules]) => routeRules.redirect).map(([{ path, methods }, routeRules]) => {
		const redirect = routeRules.redirect;
		const src = routeToRE2(joinURL(baseURL, path));
		return {
			src: src.source,
			...methods && { methods },
			status: redirect.status || 302,
			headers: {
				Location: redirect.to.replaceAll("**", catchAllRef(src)),
				...routeRules.headers
			}
		};
	}));
	config.routes.push({ handle: "filesystem" });
	const apiRoutes = nitro.routing.routes.routes.filter((route) => {
		const handler = Array.isArray(route.data) ? route.data[0] : route.data;
		return handler && !handler.middleware && route.route !== "/**";
	}).map((route) => ({
		path: route.route,
		method: route.method || "*"
	}));
	for (const route of apiRoutes) {
		const sourceRoute = { src: routeToRE2(joinURL(baseURL, route.path)).source };
		if (route.method !== "*") sourceRoute.methods = [route.method.toUpperCase()];
		config.routes.push(sourceRoute);
	}
	const ssrRoutes = [.../* @__PURE__ */ new Set([...nitro.options.ssrRoutes || [], ...[...nitro.scannedHandlers, ...nitro.options.handlers].filter((h) => !h.middleware && h.route && h.route !== "/**").map((h) => h.route)])];
	for (const route of ssrRoutes) {
		if (apiRoutes.some((r) => compareRoutes(r.path, route) === "equal")) continue;
		config.routes.push({ src: routeToRE2(joinURL(baseURL, route)).source });
	}
	config.routes.push({ src: routeToRE2(joinURL(baseURL, "/**")).source });
	if (baseURL !== "/") config.routes.push({ src: "^/(.*)$" });
	const configContent = JSON.stringify(config, null, 2);
	await writeFile$1$1(join$2(nitro.options.output.serverDir, "config.json"), configContent, true);
	return { apiRoutes };
}
function routeToRE2(route) {
	return new RegExp(routeToRegExp(route).source.replace(NAMED_GROUP_RE, "("));
}
var preset_default$16 = [defineNitroPreset({
	extends: "node-server",
	entry: "./edgeone/runtime/edgeone",
	serveStatic: false,
	output: {
		dir: "{{ rootDir }}/.edgeone",
		serverDir: "{{ output.dir }}/cloud-functions/ssr-node",
		publicDir: "{{ output.dir }}/assets/{{ baseURL }}"
	},
	rollupConfig: { output: { entryFileNames: "handler.js" } },
	hooks: { async compiled(nitro) {
		await writeEdgeOneConfig(nitro);
	} }
}, {
	name: "edgeone-pages",
	aliases: ["edgeone"],
	stdName: "edgeone_pages"
})];
var preset_default$15 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true,
	hooks: { async compiled(nitro) {
		const serverEntry = join$2(nitro.options.output.serverDir, "index.mjs");
		await writeFile$1(join$2(nitro.options.rootDir, ".apphosting/bundle.yaml"), wa({
			version: "v1",
			runConfig: {
				runCommand: `node ${relative$2(nitro.options.rootDir, serverEntry)}`,
				...nitro.options.firebase?.appHosting
			},
			metadata: {
				framework: nitro.options.framework.name || "nitro",
				frameworkVersion: nitro.options.framework.version || "2.x",
				adapterPackageName: "nitro",
				adapterVersion: version
			},
			outputFiles: { serverApp: { include: [relative$2(nitro.options.rootDir, nitro.options.output.dir)] } }
		}), true);
	} }
}, {
	name: "firebase-app-hosting",
	stdName: "firebase_app_hosting"
})];
var preset_default$14 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "flight-control" })];
var preset_default$13 = [defineNitroPreset({ extends: "aws_lambda" }, { name: "genezio" })];
var preset_default$12 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "heroku" })];
async function writeIISFiles(nitro) {
	await writeFile$1(resolve$2(nitro.options.output.dir, "web.config"), await iisXmlTemplate(nitro));
}
async function writeIISNodeFiles(nitro) {
	await writeFile$1(resolve$2(nitro.options.output.dir, "web.config"), await iisnodeXmlTemplate(nitro));
	await writeFile$1(resolve$2(nitro.options.output.dir, "index.js"), `
    if (process.env.PORT.startsWith('\\\\')) {
      process.env.NITRO_UNIX_SOCKET = process.env.PORT
      delete process.env.PORT
    }
    import('./server/index.mjs');
    `);
}
async function iisnodeXmlTemplate(nitro) {
	const path = resolve$2(nitro.options.rootDir, "web.config");
	const originalString = `<?xml version="1.0" encoding="utf-8"?>
  <!--
       This configuration file is required if iisnode is used to run node processes behind
       IIS or IIS Express.  For more information, visit:
       https://github.com/Azure/iisnode/blob/master/src/samples/configuration/web.config
  -->
  <configuration>
    <system.webServer>
      <!-- Visit http://blogs.msdn.com/b/windowsazure/archive/2013/11/14/introduction-to-websockets-on-windows-azure-web-sites.aspx for more information on WebSocket support -->
      <webSocket enabled="false" />
      <handlers>
        <!-- Indicates that the index.js file is a Node.js site to be handled by the iisnode module -->
        <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
      </handlers>
      <rewrite>
        <rules>
          <!-- Do not interfere with requests for node-inspector debugging -->
          <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
            <match url="^index.js/debug[/]?" />
          </rule>

          <!-- First we consider whether the incoming URL matches a physical file in the /public folder -->
          <rule name="StaticContent">
            <action type="Rewrite" url="public{PATH_INFO}" />
          </rule>

          <!-- All other URLs are mapped to the Node.js site entrypoint -->
          <rule name="DynamicContent">
            <conditions>
              <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
            </conditions>
            <action type="Rewrite" url="index.js" />
          </rule>
        </rules>
      </rewrite>

      <!-- 'bin' directory has no special meaning in Node.js and apps can be placed in it -->
      <security>
        <requestFiltering>
          <hiddenSegments>
            <remove segment="bin" />
          </hiddenSegments>
          <requestLimits maxAllowedContentLength="4294967295" />
        </requestFiltering>
      </security>

      <!-- Make sure error responses are left untouched -->
      <httpErrors existingResponse="PassThrough" />

      <!--
        You can control how Node is hosted within IIS using the following options:
          * watchedFiles: semi-colon separated list of files that will be watched for changes to restart the server
          * node_env: will be propagated to node as NODE_ENV environment variable
          * debuggingEnabled - controls whether the built-in debugger is enabled
        See https://github.com/Azure/iisnode/blob/master/src/samples/configuration/web.config for a full list of options
      -->
      <iisnode
        watchedFiles="index.js"
        node_env="production"
        debuggingEnabled="false"
        loggingEnabled="false"
      />
    </system.webServer>
  </configuration>
`;
	if (existsSync(path)) {
		const fileString = await readFile(path, "utf8");
		const originalWebConfig = await parseXmlDoc(originalString, nitro);
		const fileWebConfig = await parseXmlDoc(fileString, nitro);
		if (nitro.options.iis?.mergeConfig && !nitro.options.iis.overrideConfig) return buildNewXmlDoc(O(fileWebConfig, originalWebConfig), nitro);
		if (nitro.options.iis?.overrideConfig) return buildNewXmlDoc({ ...fileWebConfig }, nitro);
	}
	return originalString;
}
async function iisXmlTemplate(nitro) {
	const path = resolve$2(nitro.options.rootDir, "web.config");
	const originalString = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" requireAccess="Script" />
    </handlers>
    <httpPlatform stdoutLogEnabled="true" stdoutLogFile=".\\logs\\node.log" startupTimeLimit="20" processPath="C:\\Program Files\\nodejs\\node.exe" arguments=".\\server\\index.mjs">
      <environmentVariables>
        <environmentVariable name="PORT" value="%HTTP_PLATFORM_PORT%" />
        <environmentVariable name="NODE_ENV" value="Production" />
      </environmentVariables>
    </httpPlatform>
  </system.webServer>
</configuration>
`;
	if (existsSync(path)) {
		const fileString = await readFile(path, "utf8");
		const originalWebConfig = await parseXmlDoc(originalString, nitro);
		const fileWebConfig = await parseXmlDoc(fileString, nitro);
		if (nitro.options.iis?.mergeConfig && !nitro.options.iis.overrideConfig) return buildNewXmlDoc(O(fileWebConfig, originalWebConfig), nitro);
		if (nitro.options.iis?.overrideConfig) return buildNewXmlDoc({ ...fileWebConfig }, nitro);
	}
	return originalString;
}
function importXml2js(nitro) {
	return importDep({
		id: "xml2js",
		dir: nitro.options.rootDir,
		deps: nitro.options.deps
	});
}
async function parseXmlDoc(xml, nitro) {
	if (xml === void 0 || !xml) return {};
	const { Parser } = await importXml2js(nitro);
	const parser = new Parser({ explicitArray: false });
	let parsedRecord = {};
	parser.parseString(xml, (_, r) => {
		parsedRecord = r;
	});
	return parsedRecord;
}
async function buildNewXmlDoc(xmlObj, nitro) {
	const { Builder } = await importXml2js(nitro);
	return new Builder().buildObject({ ...xmlObj });
}
var preset_default$11 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true,
	hooks: { async compiled(nitro) {
		await writeIISFiles(nitro);
	} }
}, { name: "iis-handler" }), defineNitroPreset({
	extends: "node-server",
	serveStatic: true,
	hooks: { async compiled(nitro) {
		await writeIISNodeFiles(nitro);
	} }
}, { name: "iis-node" })];
var preset_default$10 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "koyeb" })];
var builtnNodeModules = [
	"node:_http_agent",
	"node:_http_common",
	"node:_http_outgoing",
	"node:_http_server",
	"node:_stream_duplex",
	"node:_stream_passthrough",
	"node:_stream_readable",
	"node:_stream_transform",
	"node:_stream_writable",
	"node:_tls_common",
	"node:_tls_wrap",
	"node:assert",
	"node:assert/strict",
	"node:async_hooks",
	"node:buffer",
	"node:child_process",
	"node:cluster",
	"node:console",
	"node:constants",
	"node:crypto",
	"node:dgram",
	"node:diagnostics_channel",
	"node:dns",
	"node:dns/promises",
	"node:domain",
	"node:events",
	"node:fs",
	"node:fs/promises",
	"node:http",
	"node:http2",
	"node:https",
	"node:inspector",
	"node:inspector/promises",
	"node:module",
	"node:net",
	"node:os",
	"node:path",
	"node:path/posix",
	"node:path/win32",
	"node:perf_hooks",
	"node:process",
	"node:punycode",
	"node:querystring",
	"node:readline",
	"node:readline/promises",
	"node:repl",
	"node:sqlite",
	"node:stream",
	"node:stream/consumers",
	"node:stream/promises",
	"node:stream/web",
	"node:string_decoder",
	"node:sys",
	"node:test",
	"node:timers",
	"node:timers/promises",
	"node:tls",
	"node:trace_events",
	"node:tty",
	"node:url",
	"node:util",
	"node:util/types",
	"node:v8",
	"node:vm",
	"node:wasi",
	"node:worker_threads",
	"node:zlib"
];
var unenvDeno = {
	builtinModules: builtnNodeModules,
	alias: { ...Object.fromEntries(builtnNodeModules.flatMap((m) => [[m, m], [m.replace("node:", ""), m]])) },
	inject: {
		global: "#nitro/runtime/polyfills/globalthis",
		process: "node:process",
		clearImmediate: ["node:timers", "clearImmediate"],
		setImmediate: ["node:timers", "setImmediate"],
		Buffer: ["node:buffer", "Buffer"],
		performance: false
	}
};
async function writeRedirects(nitro) {
	let contents = "";
	const routes = sortRoutes(Object.keys(nitro.options.routeRules));
	const redirects = routes.filter((key) => nitro.options.routeRules[key].redirect);
	for (const key of routes) {
		const redirect = nitro.options.routeRules[key].redirect;
		if (!redirect || skipUnsupportedRoute(nitro, {
			route: key,
			file: "_redirects",
			routes: redirects
		})) continue;
		let code = redirect.status;
		if (code === 307) code = 302;
		if (code === 308) code = 301;
		const from = joinURL(nitro.options.baseURL, routeToSplat(key));
		contents += `${from}\t${redirect.to.replaceAll("**", ":splat")}\t${code}\n`;
	}
	if (nitro.options.static && existsSync(join$2(nitro.options.output.publicDir, "404.html"))) contents += `${joinURL(nitro.options.baseURL, "/*")} ${joinURL(nitro.options.baseURL, "/404.html")} 404`;
	await writePublishFile(nitro, "_redirects", contents);
}
async function writeHeaders(nitro) {
	let contents = "";
	for (const path of sortRoutes(Object.keys(nitro.options.routeRules))) {
		const routeRules = nitro.options.routeRules[path];
		if (!hasHeaders(routeRules) || skipUnsupportedRoute(nitro, {
			route: path,
			file: "_headers"
		})) continue;
		const headers = [joinURL(nitro.options.baseURL, routeToSplat(path)), ...Object.entries({ ...routeRules.headers }).map(([header, value]) => `  ${header}: ${value}`)].join("\n");
		contents += headers + "\n";
	}
	const userHeadersPath = join$2(nitro.options.output.publicDir, "_headers");
	const headersFile = existsSync(userHeadersPath) ? await promises.readFile(userHeadersPath, "utf8") : void 0;
	for (const { base, headers } of getPublicAssetCorsHeaders(nitro, { headersFile })) contents += [joinURL(nitro.options.baseURL, base, "*"), ...Object.entries(headers).map(([header, value]) => `  ${header}: ${value}`)].join("\n") + "\n";
	await writePublishFile(nitro, "_headers", contents);
}
async function writeConfig(nitro, configPath) {
	const netlify = nitro.options.netlify;
	if (Object.keys(netlify?.config || {}).length === 0) {
		await promises.rm(configPath, { force: true });
		return;
	}
	await promises.mkdir(dirname$2(configPath), { recursive: true });
	await promises.writeFile(configPath, JSON.stringify(netlify.config), "utf8");
}
function getStaticPaths(publicAssets, baseURL) {
	return ["/.netlify/*", ...publicAssets.filter((a) => a.fallthrough !== true && a.baseURL && a.baseURL !== "/").map((a) => joinURL(baseURL, a.baseURL, "*"))];
}
function generateNetlifyFunction(nitro) {
	return `
export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "${getGeneratorString(nitro)}",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ${JSON.stringify(getStaticPaths(nitro.options.publicAssets, nitro.options.baseURL))},
  preferStatic: true,
};
    `.trim();
}
function generateNetlifyEdgeFunction(nitro) {
	return `
export { default } from "./main.mjs";
export const config = {
  name: "edge server handler",
  generator: "${getGeneratorString(nitro)}",
  path: "/*",
  excludedPath: ${JSON.stringify(getStaticPaths(nitro.options.publicAssets, nitro.options.baseURL))},
};
    `.trim();
}
function getGeneratorString(nitro) {
	return `${nitro.options.framework.name}@${nitro.options.framework.version}`;
}
async function writePublishFile(nitro, name, contents) {
	const sourcePath = join$2(nitro.options.output.publicDir, name);
	const targetPath = join$2(getPublishDir(nitro), name);
	if (existsSync(sourcePath)) {
		const current = await promises.readFile(sourcePath, "utf8");
		if (sourcePath !== targetPath) await promises.rm(sourcePath);
		if (new RegExp(`^(?:/|${escapeRegExp$1(joinURL(nitro.options.baseURL, "/"))})\\* `, "m").test(current)) {
			nitro.logger.info(`Not adding Nitro fallback to \`${name}\` (as an existing fallback was found).`);
			contents = current;
		} else {
			nitro.logger.info(`Adding Nitro fallback to \`${name}\` to handle all unmatched routes.`);
			contents = current + "\n" + contents;
		}
	}
	await promises.writeFile(targetPath, contents);
}
function getPublishDir(nitro) {
	const publicDir = withoutTrailingSlash(nitro.options.output.publicDir);
	const base = withoutTrailingSlash(nitro.options.baseURL);
	return base && publicDir.endsWith(base) ? publicDir.slice(0, -base.length) : publicDir;
}
var preset_default$9 = [
	defineNitroPreset({
		entry: "./netlify/runtime/netlify",
		manifest: { deploymentId: process.env.DEPLOY_ID },
		output: {
			dir: "{{ rootDir }}/.netlify/v1/functions",
			publicDir: "{{ rootDir }}/dist/{{ baseURL }}"
		},
		prerender: { autoSubfolderIndex: false },
		rollupConfig: { output: { entryFileNames: "main.mjs" } },
		hooks: { async compiled(nitro) {
			await writeHeaders(nitro);
			await writeRedirects(nitro);
			await writeConfig(nitro, join$2(nitro.options.output.dir, "../config.json"));
			await promises.writeFile(join$2(nitro.options.output.dir, "server", "server.mjs"), generateNetlifyFunction(nitro));
		} }
	}, {
		name: "netlify",
		stdName: "netlify"
	}),
	defineNitroPreset({
		extends: "base-worker",
		entry: "./netlify/runtime/netlify-edge",
		manifest: { deploymentId: process.env.DEPLOY_ID },
		exportConditions: ["deno"],
		output: {
			serverDir: "{{ rootDir }}/.netlify/v1/edge-functions/server",
			publicDir: "{{ rootDir }}/dist/{{ baseURL }}"
		},
		prerender: { autoSubfolderIndex: false },
		rollupConfig: { output: {
			entryFileNames: "main.mjs",
			format: "esm",
			inlineDynamicImports: false
		} },
		hooks: {
			"build:before": (nitro) => {
				extendEnv(nitro, unenvDeno);
			},
			async compiled(nitro) {
				await writeHeaders(nitro);
				await writeRedirects(nitro);
				await writeConfig(nitro, join$2(nitro.options.output.serverDir, "../../config.json"));
				await promises.writeFile(join$2(nitro.options.output.serverDir, "server.mjs"), generateNetlifyEdgeFunction(nitro));
			}
		}
	}, { name: "netlify-edge" }),
	defineNitroPreset({
		extends: "static",
		manifest: { deploymentId: process.env.DEPLOY_ID },
		output: {
			dir: "{{ rootDir }}/dist",
			publicDir: "{{ rootDir }}/dist/{{ baseURL }}"
		},
		prerender: { autoSubfolderIndex: false },
		commands: { preview: "npx serve ./" },
		hooks: { async compiled(nitro) {
			await writeHeaders(nitro);
			await writeRedirects(nitro);
		} }
	}, {
		name: "netlify-static",
		stdName: "netlify",
		static: true
	})
];
var nodeCluster = defineNitroPreset({
	extends: "node-server",
	serveStatic: true,
	entry: "./node/runtime/node-cluster",
	rollupConfig: { output: { entryFileNames: "worker.mjs" } },
	hooks: { async compiled(nitro) {
		await writeFile$1$1(resolve$2(nitro.options.output.serverDir, "index.mjs"), nodeClusterEntry());
	} }
}, { name: "node-cluster" });
function nodeClusterEntry() {
	return `
import cluster from "node:cluster";
import os from "node:os";

if (cluster.isPrimary) {
  const numberOfWorkers =
    Number.parseInt(process.env.NITRO_CLUSTER_WORKERS || "") || os.availableParallelism();
  const workers = [];
  for (let i = 0; i < numberOfWorkers; i++) {
    workers.push(cluster.fork({ WORKER_ID: i + 1 }));
  }
  const forwards = new Set(workers);
  let isShuttingDown = false;
  cluster.on("exit", (worker) => {
    forwards.delete(worker);
    if (forwards.size === 0) {
      process.exit(isShuttingDown ? 0 : 1);
    }
  });
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      isShuttingDown = true;
      for (const worker of forwards) {
        worker.process.kill(signal);
      }
    });
  }
} else {
 import("./worker.mjs").catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
`;
}
var preset_default$8 = [
	defineNitroPreset({
		entry: "./node/runtime/node-server",
		serveStatic: true,
		commands: { preview: "node ./server/index.mjs" }
	}, {
		name: "node-server",
		aliases: ["node"]
	}),
	nodeCluster,
	defineNitroPreset({ entry: "./node/runtime/node-middleware" }, { name: "node-middleware" })
];
var preset_default$7 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "render-com" })];
var preset_default$6 = [defineNitroPreset({
	entry: "./standard/runtime/server",
	serveStatic: false,
	output: { publicDir: "{{ output.dir }}/public/{{ baseURL }}" },
	commands: { preview: "npx srvx --prod ./" },
	alias: {
		srvx: "srvx/generic",
		"srvx/bun": "srvx/bun",
		"srvx/deno": "srvx/deno",
		"srvx/node": "srvx/node",
		"srvx/generic": "srvx/generic",
		"srvx/tracing": "srvx/tracing",
		"srvx/body-limit": "srvx/body-limit"
	}
}, { name: "standard" })];
var preset_default$5 = [defineNitroPreset({
	entry: "./stormkit/runtime/stormkit",
	output: {
		dir: "{{ rootDir }}/.stormkit",
		publicDir: "{{ rootDir }}/.stormkit/public/{{ baseURL }}"
	}
}, {
	name: "stormkit",
	stdName: "stormkit"
})];
var preset_default$4 = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, {
	name: "upsun",
	aliases: ["platform-sh"]
})];
var ISR_URL_PARAM = "__isr_route";
var SCHEDULE_HANDLER_ROUTE = "/_vercel/tasks";
var SCHEDULE_FUNCTION_ENV = "NITRO_VERCEL_SCHEDULES_FUNCTION";
var DEFAULT_CRON_HANDLER_ROUTE = "/_vercel/cron";
var SCHEDULE_HANDLER_ID = "#nitro/virtual/vercel-schedule-handler";
var SCHEDULE_TRIGGER = { type: "schedule/v1beta" };
function getVercelSchedulesMode(options, env = process.env) {
	if (!options.experimental.tasks) return false;
	const option = options.vercel?.schedules;
	if (option !== void 0) {
		if (option === false || option === "private" || option === "public") return option;
		throw new Error(`[vercel] Invalid \`vercel.schedules\` value: ${JSON.stringify(option)}. Use "private", "public" or \`false\`.`);
	}
	const value = env.NITRO_VERCEL_SCHEDULES?.toLowerCase();
	if (value === "private" || value === "public") return value;
	if (!value || value === "0" || value === "false") return false;
	throw new Error(`[vercel] Invalid \`NITRO_VERCEL_SCHEDULES\` value: ${JSON.stringify(env.NITRO_VERCEL_SCHEDULES)}. Use "private" or "public".`);
}
function getVercelTaskSchedules(options) {
	const entries = [];
	const cronsPerTask = /* @__PURE__ */ new Map();
	for (const [cron, value] of Object.entries(options.scheduledTasks || {})) for (const task of new Set(Array.isArray(value) ? value : [value])) {
		if (!options.tasks[task]) continue;
		entries.push({
			cron,
			task
		});
		cronsPerTask.set(task, (cronsPerTask.get(task) || 0) + 1);
	}
	const tasksByName = /* @__PURE__ */ new Map();
	return entries.map(({ cron, task }) => {
		let name = toScheduleName(task);
		if (cronsPerTask.get(task) > 1) name = `${name}.${hash(cron, 6)}`;
		const existing = tasksByName.get(name);
		if (existing !== void 0) throw new Error(`[vercel] Scheduled tasks \`${existing}\` and \`${task}\` both map to the Vercel schedule name \`${name}\`. Rename one of the tasks.`);
		tasksByName.set(name, task);
		return {
			name,
			schedule: cron,
			task
		};
	});
}
function getVercelBuildOutputSchedules(nitro) {
	const mode = getVercelSchedulesMode(nitro.options);
	if (!mode) return {};
	const target = mode === "public" ? {
		path: joinURL(nitro.options.baseURL, getCronHandlerRoute(nitro)),
		requestMethod: "GET"
	} : { function: getScheduleFunctionPath(nitro) };
	return Object.fromEntries(getVercelTaskSchedules(nitro.options).map(({ name, schedule }) => [name, {
		schedule,
		...target
	}]));
}
function setupVercelSchedules(nitro) {
	const mode = getVercelSchedulesMode(nitro.options);
	if (!mode || getVercelTaskSchedules(nitro.options).length === 0) return;
	if (mode === "private" && nitro.options.vercel?.functionRules?.["/_vercel/tasks"]?.experimentalTriggers?.length) throw new Error(`[vercel] \`vercel.functionRules["${SCHEDULE_HANDLER_ROUTE}"]\` cannot set \`experimentalTriggers\`. The scheduled tasks function only accepts the \`schedule/v1beta\` trigger.`);
	registerScheduleHandler(nitro, mode);
}
function getVercelScheduleFunction(nitro) {
	if (nitro.options.static || getVercelSchedulesMode(nitro.options) !== "private" || getVercelTaskSchedules(nitro.options).length === 0) return;
	const rule = nitro.options.vercel?.functionRules?.[SCHEDULE_HANDLER_ROUTE];
	return {
		functionPath: getScheduleFunctionPath(nitro),
		overrides: {
			...rule,
			experimentalTriggers: [SCHEDULE_TRIGGER],
			environment: {
				...rule?.environment,
				[SCHEDULE_FUNCTION_ENV]: "1"
			}
		}
	};
}
function getScheduleFunctionPath(nitro) {
	return withoutLeadingSlash(joinURL(nitro.options.baseURL, SCHEDULE_HANDLER_ROUTE));
}
function getCronHandlerRoute(nitro) {
	return nitro.options.vercel?.cronHandlerRoute || DEFAULT_CRON_HANDLER_ROUTE;
}
function registerScheduleHandler(nitro, mode) {
	const [file, factory, route] = mode === "public" ? [
		"cron-handler",
		"createCronHandler",
		getCronHandlerRoute(nitro)
	] : [
		"schedule-handler",
		"createScheduleHandler",
		SCHEDULE_HANDLER_ROUTE
	];
	const options = mode === "private" && !nitro.options.dev ? { functionEnv: SCHEDULE_FUNCTION_ENV } : {};
	nitro.options.virtual[SCHEDULE_HANDLER_ID] = () => {
		const scheduleTasks = Object.fromEntries(getVercelTaskSchedules(nitro.options).map((s) => [s.name, s.task]));
		return `
import { ${factory} } from "${join$2(presetsDir, "vercel/runtime", file)}";
export default ${factory}(${JSON.stringify(scheduleTasks)}, ${JSON.stringify(options)});
`;
	};
	nitro.options.handlers.push({
		route,
		lazy: true,
		handler: SCHEDULE_HANDLER_ID
	});
	return route;
}
function toScheduleName(task) {
	const name = task.replace(/[^\w.-]/g, ".");
	return /^[\dA-Za-z]/.test(name) ? name : `task-${name}`;
}
var SUPPORTED_NODE_VERSIONS = [
	22,
	24,
	26
];
var UNSUPPORTED_PROXY_OPTIONS = [
	"headers",
	"forwardHeaders",
	"filterHeaders",
	"fetchOptions",
	"cookieDomainRewrite",
	"cookiePathRewrite",
	"onResponse"
];
var FALLBACK_ROUTE = "/__server";
var ISR_SUFFIX = "-isr";
var SAFE_FS_CHAR_RE = /[^a-zA-Z0-9_.[\]/]/g;
var INDEX_FILE_RE = /(^|\/)index(\.html)?$/;
var SURROUNDING_SLASH_RE = /^\/+|\/+$/g;
var DEFAULT_PUBLIC_ASSET_MAX_AGE = 31536e3;
function getSystemNodeVersion() {
	const systemNodeVersion = Number.parseInt(process.versions.node.split(".")[0]);
	return Number.isNaN(systemNodeVersion) ? 22 : systemNodeVersion;
}
async function generateFunctionFiles(nitro) {
	const o11Routes = getObservabilityRoutes(nitro);
	const buildConfigPath = resolve$2(nitro.options.output.dir, "config.json");
	const buildConfig = generateBuildConfig(nitro, o11Routes);
	await writeFile$1(buildConfigPath, JSON.stringify(buildConfig, null, 2));
	const baseFunctionConfig = {
		handler: "index.mjs",
		launcherType: "Nodejs",
		shouldAddHelpers: false,
		supportsResponseStreaming: true,
		...nitro.options.sourcemap ? { shouldAddSourcemapSupport: true } : {},
		...nitro.options.vercel?.functions
	};
	if (Array.isArray(baseFunctionConfig.experimentalTriggers) && baseFunctionConfig.experimentalTriggers.length > 0) nitro.logger.warn("`experimentalTriggers` on the base `vercel.functions` config applies to the catch-all function and is likely not what you want. Routes with queue triggers are not accessible on the web. Use `vercel.functionRules` to attach triggers to specific routes instead.");
	await writeFile$1(resolve$2(nitro.options.output.serverDir, ".vc-config.json"), JSON.stringify(baseFunctionConfig, null, 2));
	const scheduleFunction = getVercelScheduleFunction(nitro);
	const functionRules = getFunctionRules(nitro);
	const hasRouteFunctionConfig = functionRules && Object.keys(functionRules).length > 0;
	const routeFuncRouter = hasRouteFunctionConfig ? createPatternRouter(functionRules) : void 0;
	const isrFuncDirs = /* @__PURE__ */ new Set();
	for (const [key, value] of Object.entries(nitro.options.routeRules)) {
		if (!value.isr) continue;
		const funcPrefix = resolve$2(nitro.options.output.serverDir, "..", normalizeRouteDest(key) + ISR_SUFFIX);
		await fs$1.mkdir(dirname$2(funcPrefix), { recursive: true });
		const matchData = routeFuncRouter && matchPattern(routeFuncRouter, key).at(-1);
		if (matchData) {
			isrFuncDirs.add(resolve$2(nitro.options.output.serverDir, "..", normalizeRouteDest(key) + ".func"));
			await createFunctionDirWithCustomConfig(funcPrefix + ".func", nitro.options.output.serverDir, baseFunctionConfig, matchData, normalizeRouteDest(key) + ISR_SUFFIX);
		} else await fs$1.symlink("./" + relative$2(dirname$2(funcPrefix), nitro.options.output.serverDir), funcPrefix + ".func", "junction");
		await writePrerenderConfig(funcPrefix + ".prerender-config.json", value.isr, nitro.options.vercel?.config?.bypassToken);
	}
	const createdFuncDirs = /* @__PURE__ */ new Set();
	if (hasRouteFunctionConfig) for (const [pattern, overrides] of Object.entries(functionRules)) {
		const funcDir = resolve$2(nitro.options.output.serverDir, "..", normalizeRouteDest(pattern) + ".func");
		if (isrFuncDirs.has(funcDir)) continue;
		await createFunctionDirWithCustomConfig(funcDir, nitro.options.output.serverDir, baseFunctionConfig, overrides, normalizeRouteDest(pattern));
		createdFuncDirs.add(funcDir);
	}
	if (scheduleFunction) {
		const funcDir = resolve$2(nitro.options.output.serverDir, "..", scheduleFunction.functionPath + ".func");
		await fs$1.mkdir(dirname$2(funcDir), { recursive: true });
		await createFunctionDirWithCustomConfig(funcDir, nitro.options.output.serverDir, baseFunctionConfig, scheduleFunction.overrides, scheduleFunction.functionPath);
	}
	if (o11Routes.length === 0) return;
	for (const route of o11Routes) {
		const funcPrefix = resolve$2(nitro.options.output.serverDir, "..", route.dest);
		const funcDir = funcPrefix + ".func";
		if (createdFuncDirs.has(funcDir)) continue;
		const matchData = routeFuncRouter && matchPattern(routeFuncRouter, route.route).at(-1);
		if (matchData) await createFunctionDirWithCustomConfig(funcDir, nitro.options.output.serverDir, baseFunctionConfig, matchData, route.dest);
		else {
			await fs$1.mkdir(dirname$2(funcPrefix), { recursive: true });
			await fs$1.symlink("./" + relative$2(dirname$2(funcPrefix), nitro.options.output.serverDir), funcDir, "junction");
		}
	}
}
async function generateStaticFiles(nitro) {
	const buildConfigPath = resolve$2(nitro.options.output.dir, "config.json");
	const buildConfig = generateBuildConfig(nitro);
	await writeFile$1(buildConfigPath, JSON.stringify(buildConfig, null, 2));
}
function generateBuildConfig(nitro, o11Routes) {
	const rules = sortRoutes(Object.keys(nitro.options.routeRules)).map((path) => [path, nitro.options.routeRules[path]]);
	const routeSrc = (route) => routeToRegExp(joinURL(nitro.options.baseURL, route));
	const cdnProxyPaths = new Set(rules.filter(([_, routeRules]) => routeRules.proxy && canUseVercelRewrite(routeRules.proxy)).map(([path]) => path));
	const optOuts = rules.filter(([_, routeRules]) => routeRules.redirect === false).map(([path]) => parseRouteKey(path));
	const cdnRedirectPaths = /* @__PURE__ */ new Map();
	for (const [path, routeRules] of rules) {
		if (!routeRules.redirect || cdnProxyPaths.has(path) || hasQueryWildcard(routeRules.redirect.to)) continue;
		const optOutPaths = getOptOutPaths(parseRouteKey(path), optOuts);
		if (optOutPaths) cdnRedirectPaths.set(path, optOutPaths);
	}
	const publicAssetRoutes = getPublicAssetRoutes(nitro.options.publicAssets, {
		baseURL: nitro.options.baseURL,
		routeRules: nitro.options.routeRules
	});
	const config = O(nitro.options.vercel?.config, {
		version: 3,
		framework: {
			name: nitro.options.framework.name,
			version: nitro.options.framework.version
		},
		overrides: getPrerenderOverrides(nitro._prerenderedRoutes),
		routes: [
			...rules.filter(([path, routeRules]) => hasHeaders(routeRules) && !cdnRedirectPaths.has(path) && !cdnProxyPaths.has(path)).reverse().map(([path, routeRules]) => {
				const { path: route, methods } = parseRouteKey(path);
				return {
					src: routeSrc(route).source,
					...methods && { methods },
					headers: routeRules.headers,
					continue: true
				};
			}),
			...getPublicAssetCorsHeaders(nitro).map(({ base, headers }) => ({
				src: joinURL(escapeRegExp$1(joinURL(nitro.options.baseURL, base)), "(.*)"),
				headers,
				continue: true
			})),
			...rules.flatMap(([path, routeRules]) => {
				const { path: pattern, methods } = parseRouteKey(path);
				const src = routeSrc(pattern);
				if (cdnProxyPaths.has(path)) {
					const route = {
						src: src.source,
						...methods && { methods },
						dest: routeRules.proxy.to.replaceAll("**", catchAllRef(src))
					};
					if (hasHeaders(routeRules)) route.headers = routeRules.headers;
					return [route];
				}
				const optOutPaths = cdnRedirectPaths.get(path);
				if (optOutPaths) {
					const redirect = routeRules.redirect;
					let route = {
						src: excludePaths(src, optOutPaths.map(routeSrc)),
						...methods && { methods },
						status: redirect.status,
						headers: { Location: redirect.to.replaceAll("**", catchAllRef(src)) }
					};
					if (hasHeaders(routeRules)) route = O(route, { headers: routeRules.headers });
					return [route];
				}
				return routeRules.redirect || routeRules.proxy ? [{
					src: src.source,
					...methods && { methods }
				}] : [];
			}),
			...nitro.options.vercel?.skewProtection && nitro.options.manifest?.deploymentId ? [{
				src: "/.*",
				has: [{
					type: "header",
					key: "Sec-Fetch-Dest",
					value: "document"
				}],
				headers: { "Set-Cookie": `__vdpl=${nitro.options.manifest.deploymentId}; Path=${nitro.options.baseURL}; SameSite=Lax; Secure; HttpOnly` },
				continue: true
			}] : [],
			...publicAssetRoutes.filter((route) => route.cacheControl).map(({ src, cacheControl }) => ({
				src,
				headers: { "cache-control": cacheControl },
				continue: true
			})),
			{ handle: "filesystem" },
			...publicAssetRoutes.map(({ src }) => ({
				src,
				status: 404,
				headers: { "cache-control": "no-store" },
				continue: false
			}))
		]
	});
	if (getVercelSchedulesMode(nitro.options)) {
		if (!nitro.options.static) {
			const schedules = getVercelBuildOutputSchedules(nitro);
			if (Object.keys(schedules).length > 0) config.schedules = {
				...schedules,
				...config.schedules
			};
		} else if (Object.keys(nitro.options.scheduledTasks || {}).length > 0) nitro.logger.warn("Scheduled tasks are not supported by the `vercel-static` preset. Use the `vercel` preset to run them with Vercel Schedules.");
	} else if (nitro.options.experimental.tasks && Object.keys(nitro.options.scheduledTasks || {}).length > 0) {
		const cronPath = nitro.options.vercel.cronHandlerRoute || "/_vercel/cron";
		config.crons = [...Object.keys(nitro.options.scheduledTasks).map((schedule) => ({
			path: cronPath,
			schedule
		})), ...config.crons || []];
	}
	if (nitro.options.static) return config;
	const functionRules = getFunctionRules(nitro);
	config.routes.push(...rules.filter(([_, value]) => value.isr !== void 0).map(([key, value]) => {
		const src = `^(?<${ISR_URL_PARAM}>${routeSrc(key).source.slice(1, -1)})$`;
		if (value.isr === false) return {
			src,
			dest: FALLBACK_ROUTE
		};
		return {
			src,
			dest: withLeadingSlash(normalizeRouteDest(key) + `-isr?${ISR_URL_PARAM}=$${ISR_URL_PARAM}`)
		};
	}), ...functionRules ? sortRoutes(Object.keys(functionRules)).map((pattern) => ({
		src: routeSrc(pattern).source,
		dest: withLeadingSlash(normalizeRouteDest(pattern))
	})) : [], ...(o11Routes || []).map((route) => ({
		src: routeSrc(route.route).source,
		dest: withLeadingSlash(route.dest)
	})), ...nitro.options.routeRules["/**"]?.isr ? [] : [{
		src: "/(.*)",
		dest: FALLBACK_ROUTE
	}]);
	return config;
}
function getPublicAssetRoutes(publicAssets, opts) {
	const routes = [];
	for (const asset of publicAssets) {
		const assetBase = asset.baseURL || "/";
		if (asset.fallthrough || assetBase === "/") continue;
		const maxAge = asset.maxAge ?? DEFAULT_PUBLIC_ASSET_MAX_AGE;
		routes.push({
			src: joinURL(escapeRegExp$1(joinURL(opts.baseURL, assetBase)), "(.*)"),
			cacheControl: maxAge > 0 && !hasCacheControl(opts.routeRules[`${assetBase}/**`]) ? `public, max-age=${maxAge}, immutable` : void 0
		});
	}
	return routes;
}
function getPrerenderOverrides(prerenderedRoutes = []) {
	const overrides = {};
	for (const { route, fileName, contentType } of prerenderedRoutes) {
		if (!fileName) continue;
		const file = withoutLeadingSlash(fileName);
		const path = route.replace(SURROUNDING_SLASH_RE, "");
		const override = {};
		if (file !== path && file.replace(INDEX_FILE_RE, "") !== path) override.path = path;
		if (contentType && !src_default.getType(file)) override.contentType = contentType;
		if (override.path !== void 0 || override.contentType) overrides[file] = override;
	}
	return overrides;
}
async function resolveVercelRuntime(nitro) {
	let runtime = nitro.options.vercel?.functions?.runtime;
	if (runtime) return runtime;
	const engines = (await x(nitro.options.rootDir).catch(() => void 0))?.engines;
	const vercelConfig = await readVercelConfig(nitro.options.rootDir);
	if (engines?.node ? !!(engines.bun && vercelConfig.bunVersion) : !!(engines?.bun || vercelConfig.bunVersion || "Bun" in globalThis)) runtime = await getEnginesBunRuntime(engines?.bun || vercelConfig.bunVersion || "1.x", { source: engines?.bun ? "`engines.bun` in `package.json`" : "`bunVersion` in `vercel.json`" });
	else {
		if (engines?.node && (engines.bun || vercelConfig.bunVersion)) nitro.logger.warn("Using Node.js because `engines.node` is set in `package.json`. To use Bun, set both `engines.bun` in `package.json` and `bunVersion` in `vercel.json`.");
		let usedNodeVersion = engines?.node ? await getEnginesNodeVersion(engines.node) : void 0;
		if (engines?.node && !usedNodeVersion) nitro.logger.warn(`\`engines.node\` (\`${engines.node}\`) in \`package.json\` does not match a supported Vercel Node.js version (${SUPPORTED_NODE_VERSIONS.join(", ")}). Using the Node.js version of the build instead.`);
		if (!usedNodeVersion) {
			const systemNodeVersion = getSystemNodeVersion();
			usedNodeVersion = SUPPORTED_NODE_VERSIONS.find((version) => version >= systemNodeVersion) ?? SUPPORTED_NODE_VERSIONS.at(-1);
		}
		runtime = `nodejs${usedNodeVersion}.x`;
	}
	nitro.options.vercel ??= {};
	nitro.options.vercel.functions ??= {};
	nitro.options.vercel.functions.runtime = runtime;
	return runtime;
}
async function readVercelConfig(rootDir) {
	const vercelConfigPath = resolve$2(rootDir, "vercel.json");
	return await fs$1.readFile(vercelConfigPath).then((config) => JSON.parse(config.toString())).catch(() => ({}));
}
function canUseVercelRewrite(proxy) {
	if (!proxy || !proxy.to) return false;
	if (!/^https?:\/\//.test(proxy.to.replace(/\/\*\*$/, ""))) return false;
	if (hasQueryWildcard(proxy.to)) return false;
	for (const key of UNSUPPORTED_PROXY_OPTIONS) if (proxy[key] !== void 0) return false;
	return true;
}
function getObservabilityRoutes(nitro) {
	const prerenderedPaths = new Set((nitro._prerenderedRoutes || []).filter((route) => route.fileName).map((route) => route.route.replace(SURROUNDING_SLASH_RE, "")));
	const routeRulesRouter = createPatternRouter(nitro.options.routeRules);
	const hasISR = (route) => O({}, ...matchPattern(routeRulesRouter, route).reverse()).isr;
	return sortRoutes([.../* @__PURE__ */ new Set([...nitro.options.ssrRoutes || [], ...[...nitro.scannedHandlers, ...nitro.options.handlers].filter((h) => !h.middleware && h.route).map((h) => h.route)])].filter((route) => !prerenderedPaths.has(route.replace(SURROUNDING_SLASH_RE, "")) && !hasISR(route) && !isPrivateScheduleRoute(nitro, route))).map((route) => ({
		route,
		dest: normalizeRouteDest(route)
	}));
}
function getFunctionRules(nitro) {
	const functionRules = nitro.options.vercel?.functionRules;
	if (!functionRules || !getVercelScheduleFunction(nitro)) return functionRules;
	const { [SCHEDULE_HANDLER_ROUTE]: _scheduleRule, ...rest } = functionRules;
	return rest;
}
function isPrivateScheduleRoute(nitro, route) {
	return route === "/_vercel/tasks" && !!getVercelScheduleFunction(nitro);
}
function normalizeRouteDest(route) {
	return route.split("/").slice(1).map((segment) => {
		if (segment.startsWith("**")) return `[...${segment.replace(/[*:]/g, "")}]`;
		const catchAll = segment.match(/^:(\w+)\(\.\*\)$/);
		if (catchAll) return `[...${catchAll[1]}]`;
		if (segment === "*") return "[...]";
		if (segment.startsWith(":")) return `[${segment.slice(1)}]`;
		if (segment.includes(":")) return `[${segment.replace(/:/g, "_")}]`;
		return segment;
	}).map((segment) => segment.replace(SAFE_FS_CHAR_RE, "-")).join("/") || "index";
}
function sanitizeConsumerName(functionPath) {
	let result = "";
	for (const char of functionPath) if (char === "_") result += "__";
	else if (char === "/") result += "_S";
	else if (char === ".") result += "_D";
	else if (/[A-Za-z0-9-]/.test(char)) result += char;
	else result += "_" + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
	return result;
}
async function createFunctionDirWithCustomConfig(funcDir, serverDir, baseFunctionConfig, overrides, functionPath) {
	await fs$1.cp(serverDir, funcDir, {
		recursive: true,
		mode: constants.COPYFILE_FICLONE,
		verbatimSymlinks: true,
		filter: (src) => basename$2(src) !== ".vc-config.json"
	});
	const mergedConfig = O(overrides, baseFunctionConfig);
	for (const [key, value] of Object.entries(overrides)) if (Array.isArray(value)) mergedConfig[key] = value;
	const triggers = mergedConfig.experimentalTriggers;
	if (Array.isArray(triggers)) {
		for (const trigger of triggers) if (trigger.type === "queue/v2beta" && !trigger.consumer) trigger.consumer = sanitizeConsumerName(functionPath);
	}
	await writeFile$1(resolve$2(funcDir, ".vc-config.json"), JSON.stringify(mergedConfig, null, 2));
}
async function writePrerenderConfig(filename, isrConfig, bypassToken) {
	if (typeof isrConfig === "number") isrConfig = { expiration: isrConfig };
	else if (isrConfig === true) isrConfig = { expiration: false };
	else isrConfig = { ...isrConfig };
	const prerenderConfig = {
		expiration: isrConfig.expiration ?? false,
		bypassToken,
		...isrConfig
	};
	if (prerenderConfig.allowQuery?.length && prerenderConfig.passQuery === void 0) prerenderConfig.passQuery = true;
	if (prerenderConfig.allowQuery && !prerenderConfig.allowQuery.includes("__isr_route")) prerenderConfig.allowQuery = [...prerenderConfig.allowQuery, ISR_URL_PARAM];
	await writeFile$1(filename, JSON.stringify(prerenderConfig, null, 2));
}
function hasCacheControl(routeRules) {
	return Object.keys(routeRules?.headers || {}).some((header) => header.toLowerCase() === "cache-control");
}
function createPatternRouter(entries) {
	const router = createRouter();
	for (const [route, data] of Object.entries(entries)) addRoute(router, "", route, {
		route,
		data
	});
	return router;
}
function matchPattern(router, pattern) {
	return findOverlappingRoutes(router, "", pattern).filter(({ data }) => {
		const comparison = compareRoutes(data.route, pattern);
		return comparison === "equal" || comparison === "superset";
	}).map(({ data }) => data.data);
}
function getOptOutPaths(redirect, optOuts) {
	const paths = [];
	for (const optOut of optOuts) {
		const comparison = compareRoutes(redirect.path, optOut.path);
		if (comparison !== "superset" && comparison !== "equal") continue;
		if (!optOut.methods) {
			if (comparison === "superset") paths.push(optOut.path);
			continue;
		}
		if (redirect.methods?.every((method) => !optOut.methods.includes(method))) continue;
		if (comparison === "superset" && redirect.methods?.every((method) => optOut.methods.includes(method))) {
			paths.push(optOut.path);
			continue;
		}
		return;
	}
	return paths;
}
function excludePaths(src, paths) {
	const excluded = paths.map((path) => path.source.slice(1, -1).replace(/\(\?<(?![=!])[^>]*>/g, "(?:"));
	return excluded.length > 0 ? `^(?!(?:${excluded.join("|")})$)${src.source.slice(1)}` : src.source;
}
function hasQueryWildcard(to) {
	const index = to.search(/[?#]/);
	return index !== -1 && to.includes("**", index);
}
async function getEnginesNodeVersion(range) {
	const { default: validRange } = await import("./_16.mjs").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
	if (!validRange(range)) return;
	const { default: intersects } = await import("./_15.mjs").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
	return SUPPORTED_NODE_VERSIONS.filter((version) => intersects(`${version}.x`, range)).at(-1);
}
async function getEnginesBunRuntime(range, opts) {
	const { default: validRange } = await import("./_16.mjs").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
	const { default: intersects } = await import("./_15.mjs").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
	if (validRange(range)) {
		if (intersects("1.4.x", range) && !intersects("<1.4.0", range)) return "bun1.4.x";
		if (intersects("1.x", range)) return "bun1.x";
	}
	throw new Error(`Invalid Vercel Bun version \`${range}\` in ${opts.source}. Use a range that matches \`1.x\` or \`1.4.x\`.`);
}
var IMMUTABLE_MANIFEST = "immutable.json";
function setupImmutableStaticFiles(nitro) {
	if (!nitro.options.vercel?.immutableStaticFiles) return;
	if (T === "vercel" && !process.env.VERCEL_IMMUTABLE_STATIC_FILES_ENABLED) {
		nitro.options.vercel.immutableStaticFiles = false;
		nitro.logger.withTag("vercel").warn("Immutable static files are enabled but not supported by the current Vercel deployment (`VERCEL_IMMUTABLE_STATIC_FILES_ENABLED` is not set). Skipping immutable static files output.");
		return;
	}
	if (nitro.options.baseURL !== "/") {
		nitro.options.vercel.immutableStaticFiles = false;
		nitro.logger.withTag("vercel").warn(`Immutable static files are not supported with a non-root \`baseURL\` (\`${nitro.options.baseURL}\`), since they must be served from the reserved \`/_vercel/immutable/\` path. Skipping immutable static files output.`);
		return;
	}
	nitro.options.buildAssetsDir = immutableDir(nitro);
}
async function generateImmutableManifest(nitro) {
	if (!nitro.options.vercel?.immutableStaticFiles) return;
	const publicDir = nitro.options.output.publicDir;
	const files = await glob(`${nitro.options.buildAssetsDir}/**`, {
		cwd: publicDir,
		absolute: false,
		dot: true
	});
	const manifest = {
		version: 1,
		hashes: Object.fromEntries(files.map((file) => {
			const pathname = withLeadingSlash(file);
			const url = joinURL(nitro.options.baseURL, pathname);
			return [url, url];
		}))
	};
	await writeFile$1(resolve$2(nitro.options.output.dir, IMMUTABLE_MANIFEST), JSON.stringify(manifest, null, 2));
	const logger = nitro.logger.withTag("vercel");
	if (files.length === 0) logger.warn(`Immutable static files are enabled but no assets were emitted under \`${nitro.options.buildAssetsDir}\`. Make sure your client build uses \`nitro.options.buildAssetsDir\` as its assets directory.`);
	else logger.info(`Generated immutable manifest (${files.length} files).`);
}
function immutableDir(nitro) {
	return normalizeBuildAssetsDir(joinURL("_vercel/immutable", process.env.VERCEL_HASH_SALT || "", nitro.options.framework.name || ""));
}
function normalizeBuildAssetsDir(dir) {
	return dir.split("/").filter((segment) => segment && segment !== "." && segment !== "..").join("/");
}
var DEV_MANIFEST_ROUTE = "/_vercel/dev-manifest";
var DEV_MANIFEST_ID = "#nitro/virtual/vercel-dev-manifest";
async function vercelDevModule(nitro) {
	if (!nitro.options.dev) return;
	setupVercelSchedulesDev(nitro);
	setupVercelQueuesDev(nitro);
}
function setupVercelSchedulesDev(nitro) {
	if (!process.env.VERCEL_SCHEDULE_DEV_API_VERSION) return;
	nitro.options.virtual[DEV_MANIFEST_ID] = () => `export default () => (${JSON.stringify(getVercelDevManifest(nitro))});`;
	nitro.options.handlers.push({
		route: DEV_MANIFEST_ROUTE,
		method: "GET",
		lazy: true,
		handler: DEV_MANIFEST_ID
	});
	const localRoutes = [DEV_MANIFEST_ROUTE];
	const mode = getVercelSchedulesMode(nitro.options);
	if (mode) {
		localRoutes.push(registerScheduleHandler(nitro, mode));
		nitro.options.scheduler.runner = false;
		nitro.logger.withTag("vercel").info("Scheduled tasks are run by the `vercel dev` Schedules broker.");
	}
	assertLocalDevRoutes(nitro, localRoutes);
}
function setupVercelQueuesDev(nitro) {
	const triggers = nitro.options.vercel?.queues?.triggers;
	if (!triggers?.length) return;
	if (nitro.options.devServer.runner !== "vercel") throw new Error(`[vercel:queue] Local queue delivery requires the \`vercel\` dev runner, but \`devServer.runner\` is set to "${nitro.options.devServer.runner}". Remove the \`devServer.runner\` override in your \`nitro.config.ts\` or set it explicitly to \`"vercel"\`.`);
	nitro.options.runtimeConfig.vercel = {
		...nitro.options.runtimeConfig.vercel,
		queues: { triggers: triggers.map((t) => ({ ...t })) }
	};
	nitro.options.plugins = nitro.options.plugins || [];
	nitro.options.plugins.unshift(resolveModulePath("./vercel/runtime/queue.dev", {
		from: presetsDir,
		extensions: [".mjs", ".ts"]
	}));
}
function getVercelDevManifest(nitro) {
	const schedules = getVercelBuildOutputSchedules(nitro);
	if (Object.keys(schedules).length === 0 || getVercelSchedulesMode(nitro.options) === "public") return {
		functions: [],
		schedules
	};
	return {
		functions: [{
			outputPath: getScheduleFunctionPath(nitro),
			invocation: {
				type: "http",
				pathname: joinURL(nitro.options.baseURL, SCHEDULE_HANDLER_ROUTE)
			},
			experimentalTriggers: [SCHEDULE_TRIGGER]
		}],
		schedules
	};
}
function assertLocalDevRoutes(nitro, routes) {
	const assertLocal = (event) => {
		if (!isLocalDevRequest(event)) throw new HTTPError({
			statusText: "Forbidden IP",
			status: 403
		});
	};
	for (const route of routes) for (const pattern of [route, joinURL(route, "**")]) nitro.options.devHandlers.push({
		route: joinURL(nitro.options.baseURL, pattern),
		middleware: true,
		handler: assertLocal
	});
}
var preset_default$3 = [
	defineNitroPreset({
		entry: "./vercel/runtime/vercel.{format}",
		manifest: { deploymentId: process.env.VERCEL_DEPLOYMENT_ID },
		vercel: {
			skewProtection: !!process.env.VERCEL_SKEW_PROTECTION_ENABLED,
			immutableStaticFiles: !!process.env.NITRO_VERCEL_IMMUTABLE_STATIC_FILES_ENABLED,
			cronHandlerRoute: "/_vercel/cron"
		},
		output: {
			dir: "{{ rootDir }}/.vercel/output",
			serverDir: "{{ output.dir }}/functions/__server.func",
			publicDir: "{{ output.dir }}/static/{{ baseURL }}"
		},
		commands: {
			preview: "npx srvx --static ../../static ./functions/__server.func/index.mjs",
			deploy: "npx vercel deploy --prebuilt"
		},
		hooks: {
			"build:before": async (nitro) => {
				const logger = nitro.logger.withTag("vercel");
				setupImmutableStaticFiles(nitro);
				const runtime = await resolveVercelRuntime(nitro);
				if (runtime.startsWith("bun") && !nitro.options.exportConditions.includes("bun")) nitro.options.exportConditions.push("bun");
				logger.info(`Using \`${runtime}\` runtime.`);
				let serverFormat = nitro.options.vercel?.entryFormat;
				if (!serverFormat) serverFormat = nitro.routing.routes.routes.flatMap((r) => r.data).some((h) => h.format === "node") ? "node" : "web";
				logger.info(`Using \`${serverFormat}\` entry format.`);
				nitro.options.entry = nitro.options.entry.replace("{format}", serverFormat);
				if (nitro.options.tracingChannel) {
					nitro.options.plugins ??= [];
					nitro.options.plugins.unshift(join$2(presetsDir, "vercel/runtime/telemetry/plugin"));
				}
				if (getVercelSchedulesMode(nitro.options)) setupVercelSchedules(nitro);
				else if (nitro.options.experimental.tasks && Object.keys(nitro.options.scheduledTasks || {}).length > 0) nitro.options.handlers.push({
					route: nitro.options.vercel.cronHandlerRoute || "/_vercel/cron",
					lazy: true,
					handler: join$2(presetsDir, "vercel/runtime/cron-handler")
				});
				const queues = nitro.options.vercel?.queues;
				if (queues?.triggers?.length) {
					await importDep({
						id: "@vercel/queue",
						dir: nitro.options.rootDir,
						deps: nitro.options.deps
					});
					const handlerRoute = queues.handlerRoute || "/_vercel/queues/consumer";
					nitro.options.handlers.push({
						route: handlerRoute,
						lazy: true,
						handler: join$2(presetsDir, "vercel/runtime/queue-handler")
					});
					const queueTriggers = queues.triggers.map(({ topic, ...opts }) => ({
						type: "queue/v2beta",
						topic,
						...opts
					}));
					nitro.options.vercel ??= {};
					nitro.options.vercel.functionRules ??= {};
					const existingRule = nitro.options.vercel.functionRules[handlerRoute];
					nitro.options.vercel.functionRules[handlerRoute] = {
						...existingRule,
						experimentalTriggers: [...existingRule?.experimentalTriggers || [], ...queueTriggers]
					};
				}
			},
			async compiled(nitro) {
				await generateFunctionFiles(nitro);
				await generateImmutableManifest(nitro);
			}
		}
	}, {
		name: "vercel",
		stdName: "vercel"
	}),
	defineNitroPreset({
		extends: "static",
		manifest: { deploymentId: process.env.VERCEL_DEPLOYMENT_ID },
		vercel: {
			skewProtection: !!process.env.VERCEL_SKEW_PROTECTION_ENABLED,
			immutableStaticFiles: !!process.env.NITRO_VERCEL_IMMUTABLE_STATIC_FILES_ENABLED
		},
		output: {
			dir: "{{ rootDir }}/.vercel/output",
			publicDir: "{{ output.dir }}/static/{{ baseURL }}"
		},
		commands: { preview: "npx serve ./static" },
		hooks: {
			"build:before": (nitro) => {
				setupImmutableStaticFiles(nitro);
			},
			async compiled(nitro) {
				await generateStaticFiles(nitro);
				await generateImmutableManifest(nitro);
			}
		}
	}, {
		name: "vercel-static",
		stdName: "vercel",
		static: true
	}),
	defineNitroPreset({
		extends: "nitro-dev",
		devServer: { runner: "vercel" },
		modules: [vercelDevModule]
	}, {
		name: "vercel-dev",
		aliases: ["vercel"],
		dev: true
	})
];
var preset_default$2 = [defineNitroPreset({
	entry: "./zeabur/runtime/zeabur",
	output: {
		dir: "{{ rootDir }}/.zeabur/output",
		serverDir: "{{ output.dir }}/functions/__nitro.func",
		publicDir: "{{ output.dir }}/static"
	},
	hooks: { async compiled(nitro) {
		await writeFile$1(resolve$2(nitro.options.output.dir, "config.json"), JSON.stringify({
			containerized: false,
			routes: [{
				src: ".*",
				dest: "/__nitro"
			}]
		}, null, 2));
		for (const [key, value] of Object.entries(nitro.options.routeRules)) {
			if (!value.isr) continue;
			const funcPrefix = resolve$2(nitro.options.output.serverDir, ".." + key);
			await fs$1.mkdir(dirname$2(funcPrefix), { recursive: true });
			await fs$1.symlink("./" + relative$2(dirname$2(funcPrefix), nitro.options.output.serverDir), funcPrefix + ".func", "junction");
			await writeFile$1(funcPrefix + ".prerender-config.json", JSON.stringify({ type: "Prerender" }));
		}
	} }
}, {
	name: "zeabur",
	stdName: "zeabur"
}), defineNitroPreset({
	extends: "static",
	output: {
		dir: "{{ rootDir }}/.zeabur/output",
		publicDir: "{{ output.dir }}/static"
	},
	commands: { preview: "npx serve ./static" }
}, {
	name: "zeabur-static",
	static: true
})];
var LOGGER_TAG = "zephyr-nitro-preset";
var preset_default$1 = [defineNitroPreset({
	extends: "base-worker",
	entry: "./zephyr/runtime/server",
	output: { publicDir: "{{ output.dir }}/client/{{ baseURL }}" },
	exportConditions: ["node"],
	minify: false,
	rollupConfig: { output: {
		format: "esm",
		exports: "named",
		inlineDynamicImports: false
	} },
	wasm: {
		lazy: false,
		esmImport: true
	},
	commands: { deploy: deployToZephyr },
	hooks: {
		"build:before": (nitro) => {
			extendEnv(nitro, unenvCfExternals);
			extendEnv(nitro, unenvCfNodeCompat);
		},
		compiled: async (nitro) => {
			if (!nitro.options.zephyr?.deployOnBuild) {
				nitro.logger.info(`[${LOGGER_TAG}] Skipping Zephyr deploy on build (use \`nitro deploy\` or set \`zephyr.deployOnBuild\`).`);
				return;
			}
			await deployToZephyr(nitro);
		}
	}
}, { name: "zephyr" })];
var deployed = /* @__PURE__ */ new WeakSet();
async function deployToZephyr(nitro) {
	if (deployed.has(nitro)) {
		nitro.logger.info(`[${LOGGER_TAG}] Zephyr deployment already done during build.`);
		return;
	}
	try {
		const { deploymentUrl } = await (await importDep({
			id: "zephyr-agent",
			dir: nitro.options.rootDir,
			deps: nitro.options.deps
		})).uploadOutputToZephyr({
			rootDir: nitro.options.rootDir,
			outputDir: nitro.options.output.dir,
			baseURL: nitro.options.baseURL,
			publicDir: resolve$2(nitro.options.output.dir, nitro.options.output.publicDir)
		});
		if (deploymentUrl) nitro.logger.success(`[${LOGGER_TAG}] Zephyr deployment succeeded: ${deploymentUrl}`);
		else nitro.logger.success(`[${LOGGER_TAG}] Zephyr deployment succeeded.`);
		deployed.add(nitro);
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new TypeError(`[${LOGGER_TAG}] ${String(error)}`);
	}
}
var preset_default = [defineNitroPreset({
	extends: "node-server",
	serveStatic: true
}, { name: "zerops" }), defineNitroPreset({
	extends: "static",
	output: {
		dir: "{{ rootDir }}/.zerops/output",
		publicDir: "{{ output.dir }}/static"
	}
}, {
	name: "zerops-static",
	static: true
})];
var _all_gen_default = [
	...preset_default$27,
	...preset_default$26,
	...preset_default$25,
	...preset_default$24,
	...preset_default$23,
	...preset_default$22,
	...preset_default$21,
	...preset_default$20,
	...preset_default$19,
	...preset_default$18,
	...preset_default$17,
	...preset_default$16,
	...preset_default$15,
	...preset_default$14,
	...preset_default$13,
	...preset_default$12,
	...preset_default$11,
	...preset_default$10,
	...preset_default$9,
	...preset_default$8,
	...preset_default$7,
	...preset_default$6,
	...preset_default$5,
	...preset_default$4,
	...preset_default$3,
	...preset_default$2,
	...preset_default$1,
	...preset_default
];
var _stdProviderMap = {
	aws_amplify: "aws",
	azure_static: "azure",
	cloudflare_pages: "cloudflare"
};
async function resolvePreset(name, opts = {}) {
	if (name === ".") return;
	const _name = kebabCase(name) || T;
	const _compatDates = opts.compatibilityDate ? n(opts.compatibilityDate) : false;
	const matches = _all_gen_default.filter((preset) => {
		if (![
			preset._meta.name,
			preset._meta.stdName,
			...preset._meta.aliases || []
		].filter(Boolean).includes(_name)) return false;
		if (opts.dev && !preset._meta.dev || !opts.dev && preset._meta.dev) return false;
		if (_compatDates) {
			const _date = _compatDates[_stdProviderMap[preset._meta.stdName]] || _compatDates[preset._meta.stdName] || _compatDates[preset._meta.name] || _compatDates.default;
			if (_date && preset._meta.compatibilityDate && new Date(preset._meta.compatibilityDate) > new Date(_date)) return false;
		}
		return true;
	}).sort((a, b) => {
		const aDate = new Date(a._meta.compatibilityDate || 0);
		return new Date(b._meta.compatibilityDate || 0) > aDate ? 1 : -1;
	});
	const preset = matches.find((p) => (p._meta.static || false) === (opts?.static || false)) || matches[0];
	if (typeof preset === "function") return preset();
	if (!name && !preset) {
		if (opts?.static) return resolvePreset("static", opts);
		if (opts.defaultPreset) {
			if (typeof opts.defaultPreset === "string") return resolvePreset(opts.defaultPreset, {
				...opts,
				defaultPreset: void 0
			});
			const config = typeof opts.defaultPreset === "function" ? opts.defaultPreset() : opts.defaultPreset;
			return {
				...config,
				_meta: {
					name: "default",
					...config._meta
				}
			};
		}
		return resolvePreset({
			deno: "deno",
			bun: "bun"
		}[F] || "node", opts);
	}
	if (name && !preset) {
		const options = _all_gen_default.filter((p) => p._meta.name === name || p._meta.stdName === name || p._meta.aliases?.includes(name)).sort((a, b) => (a._meta.compatibilityDate || 0) > (b._meta.compatibilityDate || 0) ? 1 : -1);
		if (options.length > 0) {
			let msg = `Preset "${name}" cannot be resolved with current compatibilityDate: ${r(_compatDates || "")}.\n\n`;
			for (const option of options) msg += `\n- ${option._meta.name} (requires compatibilityDate >= ${option._meta.compatibilityDate})`;
			const err = new Error(msg);
			Error.captureStackTrace?.(err, resolvePreset);
			throw err;
		}
	}
	return preset;
}
export { resolvePreset };
