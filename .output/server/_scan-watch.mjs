import { OPTIONAL_RUNTIME_DEPS_RE, basename$2, dirname$2, ensureDep, isAbsolute$2, join$2, joinURL, normalize$2, onWatchError, resolve$2, resolveModulePath, resolveViteModuleRunner, runtimeDependencies, runtimeDir, tsconfigPathsNoExternal, viteImportOptions, writeFile$1 } from "./_chunks/common.mjs";
import { scanHandlers } from "./_chunks/nitro2.mjs";
import { h } from "./_chunks/pkg-types.mjs";
import { c, h as h$1 } from "./_libs/env-runner3.mjs";
import { pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import { readFile } from "node:fs/promises";
// node_modules/nitro/dist/_dev2.mjs
var DEV_RELOAD_ROUTE = "/_nitro/dev/reload";
var WAIT_TIMEOUT = 25e3;
var DevReloadSignal = class {
	id = Math.random().toString(36).slice(2);
	generation = 0;
	closed = false;
	#waiters = /* @__PURE__ */ new Set();
	bump() {
		this.generation++;
		this.#release();
	}
	close() {
		this.closed = true;
		this.#release();
	}
	async handle(event) {
		const params = event.url.searchParams;
		if (!this.closed && params.get("id") === this.id && params.get("v") === String(this.generation)) await this.#wait(event.req.signal);
		if (this.closed) return new Response(null, {
			status: 503,
			headers: { "cache-control": "no-store" }
		});
		if (params.get("id") === this.id && params.get("v") === String(this.generation)) return new Response(null, {
			status: 204,
			headers: { "cache-control": "no-store" }
		});
		event.res.headers.set("cache-control", "no-store");
		return {
			id: this.id,
			v: this.generation
		};
	}
	#wait(abort) {
		return new Promise((resolve) => {
			const done = () => {
				clearTimeout(timer);
				abort?.removeEventListener("abort", done);
				this.#waiters.delete(done);
				resolve();
			};
			const timer = setTimeout(done, WAIT_TIMEOUT);
			timer.unref?.();
			abort?.addEventListener("abort", done);
			this.#waiters.add(done);
		});
	}
	#release() {
		for (const done of [...this.#waiters]) done();
	}
};
var RETRY_DELAYS = [
	0,
	250,
	1e3
];
var CHECK_INTERVAL = 2e3;
function withDevErrorRecovery(req, res, opts) {
	if (!isRecoverableDevErrorPage(req.method, res) || !isDocumentRequest(req.headers)) return res;
	return appendDevErrorRecovery(res, {
		url: joinURL(opts.base, DEV_RELOAD_ROUTE),
		id: opts.signal.id,
		v: opts.signal.generation,
		poll: opts.poll
	});
}
function appendDevErrorRecovery(res, opts) {
	const script = new TextEncoder().encode(devErrorRecoveryScript(opts));
	const headers = new Headers(res.headers);
	headers.delete("content-length");
	const body = (res.body || new Blob([]).stream()).pipeThrough(new TransformStream({ flush(controller) {
		controller.enqueue(script);
	} }));
	return new Response(body, {
		status: res.status,
		statusText: res.statusText,
		headers
	});
}
function isRecoverableDevErrorPage(method, res) {
	if (method !== "GET" || res.status < 500) return false;
	const contentType = res.headers.get("content-type") || "";
	return !res.headers.has("content-encoding") && /^text\/html\b/i.test(contentType) && !/charset\s*=\s*"?utf-?(?:16|32)/i.test(contentType);
}
function isDocumentRequest(headers) {
	const dest = headers.get("sec-fetch-dest");
	if (dest) return /^(?:document|iframe|frame)$/.test(dest);
	return /\btext\/html\b/i.test(headers.get("accept") || "");
}
function devErrorRecoveryScript(opts) {
	return `<script type="module">
// Pages that load client modules of their own (hydrated framework error pages) recover through them.
if (!document.querySelector("script[type=module][src]")) {
  const state = ${JSON.stringify({
		url: opts.url,
		id: opts.id,
		v: opts.v
	}).replace(/[<\u007f-\uffff]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`)};
  const page = location.href;
  let done = false;
  const stopped = () => done || location.href !== page;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function rendersAgain(next) {
    for (const delay of ${JSON.stringify(RETRY_DELAYS)}) {
      // A newer server update starts the checks again
      await new Promise((r) => setTimeout((wake = r), delay));
      if (stopped() || latest !== next) return false;
      const res = await fetch(page, {
        cache: "no-store",
        headers: { accept: "text/html" },
        signal: AbortSignal.timeout?.(5000),
      }).catch(() => {});
      res?.body?.cancel().catch(() => {});
      if (res && res.status < 500) return true;
    }
    return false;
  }
  // A restarted dev server has a new id.
  const isNews = (next) => next.id !== state.id || next.v > state.v;
  let seen = state.v;
  let wake = () => {};
  let latest;
  let handling;
  let controller;
  function onAnswer(next) {
    if (typeof next?.id !== "string") return;
    if (next.id === state.id && next.v <= seen) return;
    if (next.id === state.id) seen = next.v;
    latest = next;
    wake();
    handling ||= (async () => {
      while (!stopped() && isNews(latest)) {
        const next = latest;
        // Reloads synchronously unless it checks the page, so the waiting tab stops right away
        if (next.id !== state.id || ${opts.poll ? "(await rendersAgain(next))" : "true"}) {
          if (!stopped()) location.reload();
          done = true;
          controller?.abort();
          return;
        }
        state.v = next.v;
      }
    })().finally(() => (handling = undefined));
  }
  // Scoped to the route, for apps served on one origin through a proxy
  const name = "nitro:dev-reload:" + state.url;
  const channel = typeof BroadcastChannel === "function" ? new BroadcastChannel(name) : undefined;
  channel?.addEventListener("message", (event) => onAnswer(event.data));
  // Asks for the server state, at once or (with \`v\`) once the server is past generation \`v\`.
  async function wait(v) {
    let failures = 0;
    while (!stopped()) {
      controller = new AbortController();
      const query = v === undefined ? "" : \`&v=\${v()}\`;
      const res = await fetch(\`\${state.url}?id=\${state.id}\${query}\`, {
        cache: "no-store",
        signal: controller.signal,
      }).catch(() => {});
      if (stopped()) return;
      // The dev server is down or closing: wait for it to answer again.
      if (!res || res.status >= 500) {
        await sleep(Math.min(250 * 2 ** failures++, 5000));
        continue;
      }
      failures = 0;
      if (res.status === 204) continue;
      if (res.status !== 200) return (done = true);
      const next = await res.json().catch(() => {});
      // Something else answers the route (e.g. a proxy fallback page)
      if (typeof next?.id !== "string") return (done = true);
      channel?.postMessage(next);
      onAnswer(next);
      if (!v) return;
    }
  }
  const locks = navigator.locks;
  if (locks) {
    // One tab per origin waits on the route and tells the others: browsers allow about 6
    // connections per origin over HTTP/1.1. Each tab checks once first, in case it missed an update.
    wait();
    await locks.request(name, () => wait(() => seen));
  } else {
    // Without Web Locks (insecure origins), visible tabs check at an interval instead.
    while (!stopped()) {
      if (!document.hidden) await wait();
      await sleep(${CHECK_INTERVAL});
    }
  }
}
<\/script>`;
}
async function resolveRunnerDeps(nitro, runner) {
	switch (runner) {
		case "miniflare": return resolveMiniflareDeps(nitro);
		case "netlify": return { netlifyRuntime: _resolve("@netlify/runtime", nitro.options.rootDir) };
		default: return {};
	}
}
async function resolveMiniflareDeps(nitro) {
	const { rootDir } = nitro.options;
	const miniflare = await ensureDep({
		id: "miniflare",
		dir: rootDir,
		deps: nitro.options.deps
	});
	const inline = nitro.options.cloudflare?.wrangler;
	const configPath = await h([
		"wrangler.json",
		"wrangler.jsonc",
		"wrangler.toml"
	], { startingFrom: rootDir }).catch(() => void 0);
	return {
		miniflare: miniflare ? pathToFileURL(miniflare) : void 0,
		wranglerModule: _resolve("wrangler", rootDir),
		wrangler: inline && Object.keys(inline).length > 0 ? inline : Boolean(configPath),
		wranglerConfigPath: configPath,
		wranglerEnv: nitro.options.cloudflare?.wranglerEnv,
		compatibilityDate: "latest",
		miniflareOptions: { defaultPersistRoot: resolve$2(rootDir, ".wrangler/state/v3") },
		crossws: {
			bindingName: "$DurableObject",
			instanceName: "server"
		}
	};
}
function _resolve(id, dir) {
	const path = resolveModulePath(id, {
		from: [dir, import.meta.url],
		try: true
	});
	return path ? pathToFileURL(path) : void 0;
}
var SHUTDOWN_TIMEOUT = 5e3;
async function shutdownRunner(manager, opts = {}) {
	await new Promise((resolve) => {
		const done = () => {
			clearTimeout(timer);
			manager.offMessage(listener);
			resolve();
		};
		const timer = setTimeout(() => {
			opts.warn?.("Dev worker did not shut down in time, force closing it...");
			done();
		}, SHUTDOWN_TIMEOUT);
		const listener = (message) => {
			if (message?.event === "exit") done();
		};
		manager.onMessage(listener);
		try {
			manager.sendMessage({ event: "shutdown" });
		} catch (error) {
			opts.warn?.(`Could not send shutdown message to the dev worker: ${error instanceof Error ? error.message : String(error)}`);
			done();
		}
	});
}
// node_modules/nitro/dist/_scan-watch.mjs
async function writeDevWorkerEntry(nitro) {
	const entry = resolve$2(nitro.options.buildDir, "vite/dev-worker.mjs");
	const devWorker = pathToFileURL(resolve$2(runtimeDir, "internal/vite/dev-worker.mjs")).href;
	const moduleRunner = pathToFileURL(await resolveViteModuleRunner(viteImportOptions(nitro))).href;
	const websocket = nitro.options.features.websocket ?? nitro.options.experimental.websocket;
	const reloadTimeout = _resolveReloadTimeout(nitro);
	const srvxTracing = nitro.options.tracingChannel?.srvx ? pathToFileURL(resolveModulePath("srvx/tracing", { from: import.meta.url })).href : void 0;
	const contents = [
		"// Generated by Nitro",
		`import * as moduleRunner from ${JSON.stringify(moduleRunner)};`,
		`import { setModuleRunner, setReloadWaitTimeout } from ${JSON.stringify(devWorker)};`,
		srvxTracing && `import { tracingPlugin as srvxTracing } from ${JSON.stringify(srvxTracing)};`,
		`export * from ${JSON.stringify(devWorker)};`,
		websocket && `export { websocketOptions as websocket } from ${JSON.stringify(devWorker)};`,
		srvxTracing && "export const plugins = [srvxTracing()];",
		"",
		"setModuleRunner(moduleRunner);",
		reloadTimeout && `setReloadWaitTimeout(${reloadTimeout});`
	].filter((line) => typeof line === "string").join("\n") + "\n";
	if (await readFile(entry, "utf8").catch(() => void 0) !== contents) await writeFile$1(entry, contents);
	return entry;
}
var MAX_TIMEOUT = 2 ** 31 - 1;
function _resolveReloadTimeout(nitro) {
	const value = process.env.NITRO_DEV_RELOAD_TIMEOUT;
	if (!value) return;
	const ms = Math.round(Number(value));
	if (!Number.isFinite(ms) || ms < 1) {
		nitro.logger.warn(`Ignoring invalid \`NITRO_DEV_RELOAD_TIMEOUT\` value \`${value}\` (expected a positive number of milliseconds).`);
		return;
	}
	return Math.min(ms, MAX_TIMEOUT);
}
function createNitroEnvironment(ctx) {
	const isWorkerdRunner = _isWorkerdRunner(ctx);
	return {
		consumer: "server",
		build: {
			rollupOptions: ctx.bundlerConfig.rollupConfig,
			rolldownOptions: ctx.bundlerConfig.rolldownConfig,
			minify: ctx.nitro.options.minify,
			emptyOutDir: false,
			sourcemap: ctx.nitro.options.sourcemap,
			commonjsOptions: ctx.nitro.options.commonJS,
			copyPublicDir: false,
			emitAssets: ctx.nitro.options.node
		},
		resolve: {
			noExternal: ctx.nitro.options.dev ? [
				/^nitro(\/|$)/,
				new RegExp(`^(${runtimeDependencies.join("|")})$`),
				OPTIONAL_RUNTIME_DEPS_RE,
				...tsconfigPathsNoExternal(ctx.nitro),
				...ctx.bundlerConfig.base.noExternal
			] : true,
			conditions: _envConditions(ctx),
			externalConditions: _externalConditions(ctx)
		},
		define: { "process.env.NODE_ENV": JSON.stringify(ctx.nitro.options.dev ? "development" : "production") },
		dev: ctx._isVitest ? void 0 : { createEnvironment: async (envName, envConfig) => {
			const entry = resolve(runtimeDir, "internal/vite/dev-entry.mjs");
			const { createFetchableDevEnvironment } = await import("./_chunks/vite.dev.mjs");
			const env = await createFetchableDevEnvironment(envName, envConfig, await initEnvRunner(ctx), entry, {
				workerd: isWorkerdRunner,
				vite: viteImportOptions(ctx.nitro),
				onInit: () => (ctx._viteEnvs ??= /* @__PURE__ */ new Map()).set(envName, entry)
			});
			ctx._transformRequest = (id) => env.transformRequest(id);
			return env;
		} }
	};
}
function createServiceEnvironment(ctx, name, serviceConfig) {
	const isDev = ctx.nitro.options.dev;
	const isWorkerdRunner = _isWorkerdRunner(ctx);
	return {
		consumer: "server",
		build: {
			rollupOptions: {
				input: { index: serviceConfig.entry },
				...isDev ? {} : { external: [/^nitro(\/|$)/] },
				output: { minifyInternalExports: false }
			},
			minify: ctx.nitro.options.minify,
			sourcemap: ctx.nitro.options.sourcemap,
			outDir: join(ctx.nitro.options.buildDir, "vite/services", name),
			emptyOutDir: true,
			copyPublicDir: false
		},
		resolve: {
			...isDev ? { noExternal: [/^nitro(\/|$)/] } : {},
			conditions: _envConditions(ctx),
			externalConditions: _externalConditions(ctx)
		},
		dev: ctx._isVitest ? void 0 : { createEnvironment: async (envName, envConfig) => {
			const entry = tryResolve(serviceConfig.entry);
			const { createFetchableDevEnvironment } = await import("./_chunks/vite.dev.mjs");
			return createFetchableDevEnvironment(envName, envConfig, await initEnvRunner(ctx), entry, {
				workerd: isWorkerdRunner,
				vite: viteImportOptions(ctx.nitro),
				onInit: () => (ctx._viteEnvs ??= /* @__PURE__ */ new Map()).set(envName, entry)
			});
		} }
	};
}
function createServiceEnvironments(ctx) {
	return Object.fromEntries(Object.entries(ctx.services).map(([name, config]) => [name, createServiceEnvironment(ctx, name, config)]));
}
async function initEnvRunner(ctx) {
	if (ctx._envRunner) return ctx._envRunner;
	if (ctx._closingEnvRunner) throw new Error("Nitro dev env runner is closed.");
	if (!ctx._initPromise) ctx._initPromise = (async () => {
		const manager = new c();
		let _retries = 0;
		manager.onClose((_runner, cause) => {
			if (ctx._closingEnvRunner) return;
			if (_retries++ < 3) {
				ctx.nitro.logger.info("Restarting env runner...", cause ? `Cause: ${cause}` : "");
				_loadRunner(ctx, manager).catch((error) => ctx.nitro.logger.error(error));
			} else ctx.nitro.logger.error("Env runner failed after 3 retries.", cause ? `Last cause: ${cause}` : "");
		});
		manager.onReady(() => {
			_retries = 0;
			if (ctx._viteEnvs) for (const [name, entry] of ctx._viteEnvs) manager.sendMessage({
				type: "custom",
				event: "nitro:vite-env",
				data: {
					name,
					entry
				}
			});
		});
		await _loadRunner(ctx, manager);
		ctx._envRunner = manager;
		return manager;
	})();
	return await ctx._initPromise;
}
async function closeEnvRunner(ctx) {
	if (ctx._closingEnvRunner) return;
	ctx._closingEnvRunner = true;
	const manager = ctx._envRunner || await ctx._initPromise?.catch(() => void 0);
	if (!manager) return;
	if (ctx.nitro.options.devServer.drain) {
		await manager.shutdown();
		return;
	}
	if (manager.ready && !_isWorkerdRunner(ctx)) await shutdownRunner(manager, { warn: (message) => ctx.nitro.logger.warn(message) });
	await manager.close();
}
async function _loadRunner(ctx, manager) {
	const runnerName = _devRunner(ctx);
	const entry = await writeDevWorkerEntry(ctx.nitro);
	const runner = await h$1(runnerName, {
		...await resolveRunnerDeps(ctx.nitro, runnerName),
		name: "nitro-vite",
		data: { entry }
	});
	await manager.reload(runner, { drain: ctx.nitro.options.devServer.drain });
}
function _resolveConditions(ctx) {
	const exportConditions = ctx.nitro.options.exportConditions;
	if (!ctx.nitro.options.dev || _devRunner(ctx) !== "node-worker") return exportConditions;
	const runtimeCondition = typeof globalThis.Bun !== "undefined" ? "bun" : typeof globalThis.Deno !== "undefined" ? "deno" : void 0;
	return runtimeCondition && !exportConditions.includes(runtimeCondition) ? [runtimeCondition, ...exportConditions] : exportConditions;
}
function _envConditions(ctx) {
	return _isWorkerdRunner(ctx) ? _workerdConditions(ctx) : _resolveConditions(ctx);
}
function _externalConditions(ctx) {
	return _envConditions(ctx).filter((c) => !/browser|wasm|module/.test(c) && c !== "development" && c !== "production");
}
function _workerdConditions(ctx) {
	const exportConditions = ctx.nitro.options.exportConditions;
	return [.../* @__PURE__ */ new Set([
		"workerd",
		"worker",
		...exportConditions.filter((c) => c !== "node")
	])];
}
function _devRunner(ctx) {
	return ctx.nitro.options.devServer.runner || process.env.NITRO_DEV_RUNNER || "node-worker";
}
function _isWorkerdRunner(ctx) {
	return _devRunner(ctx) === "miniflare";
}
function tryResolve(id) {
	if (/^[~#/\0]/.test(id) || isAbsolute$2(id)) return id;
	return resolveModulePath(id, {
		suffixes: ["", "/index"],
		extensions: [
			"",
			".ts",
			".mjs",
			".cjs",
			".js",
			".mts",
			".cts"
		],
		try: true
	}) || id;
}
var serverEntryRe = /^server\.[mc]?[jt]sx?$/;
var watchReloadEvents = /* @__PURE__ */ new Set([
	"add",
	"addDir",
	"unlink",
	"unlinkDir"
]);
function watchScanDirs(nitro, server, onChange) {
	const scanDirs = nitro.options.scanDirs.flatMap((dir) => [
		join$2(dir, nitro.options.apiDir || "api"),
		join$2(dir, nitro.options.routesDir || "routes"),
		join$2(dir, "middleware"),
		join$2(dir, "plugins"),
		join$2(dir, "modules")
	]);
	const shouldReload = (path) => {
		path = normalize$2(path);
		return scanDirs.some((dir) => path === dir || path.startsWith(dir + "/")) || serverEntryRe.test(basename$2(path)) && dirname$2(path) + "/" === nitro.options.rootDir;
	};
	server.watcher.on("error", (error) => onWatchError(nitro, error));
	server.watcher.add(scanDirs.filter((dir) => !dir.startsWith(server.config.root + "/")));
	server.watcher.on("all", (event, path) => {
		if (watchReloadEvents.has(event) && shouldReload(path)) onChange();
	});
	nitro.hooks.hook("build:reload", () => onChange());
}
async function rescanHandlers(nitro, env) {
	await scanHandlers(nitro);
	nitro.routing.sync();
	env.moduleGraph.invalidateAll();
}
export { DEV_RELOAD_ROUTE, DevReloadSignal, _isWorkerdRunner, closeEnvRunner, createNitroEnvironment, createServiceEnvironment, createServiceEnvironments, initEnvRunner, rescanHandlers, watchScanDirs, withDevErrorRecovery };
