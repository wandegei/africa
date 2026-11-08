import { ASSET_EXT_RE, _resolveFromPath, importVite, isAbsolute$2, join$2, relative$2, withBase, withoutBase, writeDevBuildInfo } from "./common.mjs";
import { t } from "./perfect-debounce.mjs";
import { DevReloadSignal, _isWorkerdRunner, rescanHandlers, watchScanDirs, withDevErrorRecovery } from "../_scan-watch.mjs";
import { NodeRequest, sendNodeResponse } from "../_libs/srvx.mjs";
import { e } from "../_libs/env-runner16.mjs";
import { statSync } from "node:fs";
import { readFile } from "node:fs/promises";
// node_modules/nitro/dist/_build/vite.dev.mjs
var RENDERER_TEMPLATE_ID = "#nitro/virtual/renderer-template";
var INVALIDATE_ACK_TIMEOUT = 5e3;
function setupDevPageTemplate(ctx, server, nitroEnv) {
	const nitro = ctx.nitro;
	const template = nitro.options.renderer?.template;
	let compiledHTML;
	let stale = true;
	const transformHTML = async () => {
		if (!template) return;
		const html = await readFile(template, "utf8");
		try {
			return await _readBundledHTML(server, template) ?? await server.transformIndexHtml(_htmlTemplateURL(template, server.config.root), html);
		} catch (error) {
			nitro.logger.warn("Failed to transform HTML via Vite:", error);
			stale = true;
			return html;
		}
	};
	nitro._pageTemplate = {
		...nitro._pageTemplate,
		html: async () => compiledHTML ??= await transformHTML()
	};
	if (!template) return {
		sync: async () => {},
		close: () => {}
	};
	server.watcher.add(template);
	server.watcher.on("all", () => {
		stale = true;
	});
	const invalidator = createModuleInvalidator(nitroEnv);
	const sync = async () => {
		const html = await transformHTML();
		if (html === compiledHTML) return;
		compiledHTML = html;
		const mod = nitroEnv.moduleGraph.getModuleById(RENDERER_TEMPLATE_ID);
		if (mod) {
			nitroEnv.moduleGraph.invalidateModule(mod);
			await invalidator.invalidate(RENDERER_TEMPLATE_ID);
		}
	};
	let tail = Promise.resolve();
	let queued;
	const schedule = () => {
		stale = false;
		if (!queued) queued = tail = tail.then(() => {
			queued = void 0;
			return sync();
		}).catch((error) => {
			stale = true;
			compiledHTML = void 0;
			nitro.logger.error("Failed to update the page template:", error);
		});
		return queued;
	};
	const bundledDev = !!server.environments.client.bundledDev;
	return {
		sync: (req) => {
			const page = _pageRequest(nitro, req);
			if (!page) return Promise.resolve();
			if (stale || bundledDev && page === "document") return schedule();
			return tail;
		},
		close: invalidator.close
	};
}
function createModuleInvalidator(nitroEnv) {
	const pending = /* @__PURE__ */ new Map();
	const onMessage = (message) => {
		if (message?.type === "custom" && message.event === "nitro:invalidated") pending.get(message.data?.id)?.();
	};
	nitroEnv.devServer.onMessage(onMessage);
	let counter = 0;
	return {
		invalidate: (moduleId) => new Promise((resolve) => {
			const id = String(++counter);
			const timeout = setTimeout(done, INVALIDATE_ACK_TIMEOUT);
			function done() {
				clearTimeout(timeout);
				pending.delete(id);
				resolve();
			}
			pending.set(id, done);
			nitroEnv.devServer.sendMessage({
				type: "custom",
				event: "nitro:invalidate",
				data: {
					id,
					env: nitroEnv.name,
					moduleId
				}
			});
		}),
		close: () => {
			nitroEnv.devServer.offMessage(onMessage);
			for (const done of [...pending.values()]) done();
		}
	};
}
function _pageRequest(nitro, req) {
	if (req.method !== "GET" && req.method !== "HEAD") return;
	const match = nitro.routing.routes.match("GET", new URL(req.url).pathname);
	const handler = nitro.options.renderer?.handler;
	if (![match].flat().some((h) => h?.handler === handler)) return;
	const dest = req.headers.get("sec-fetch-dest");
	return dest === "document" || dest === "iframe" || !dest && req.headers.get("accept")?.toLowerCase().includes("text/html") ? "document" : "other";
}
function _htmlTemplateURL(template, root) {
	const path = relative$2(root, template);
	return path.startsWith("../") || isAbsolute$2(path) ? join$2("/@fs", template) : `/${path}`;
}
async function _readBundledHTML(server, template) {
	const bundledDev = server.environments.client.bundledDev;
	if (!bundledDev) return;
	await bundledDev["devEngine"].ensureLatestBuildOutput();
	await new Promise((resolve) => setImmediate(resolve));
	const file = bundledDev.memoryFiles.get(relative$2(server.config.root, template));
	if (!file) return;
	return typeof file.source === "string" ? file.source : Buffer.from(file.source).toString("utf8");
}
var WORKERD_BUILTIN_RE = /^(?:cloudflare|workerd):/;
async function createFetchableDevEnvironment(name, config, devServer, entry, opts) {
	const context = {
		hot: true,
		transport: e(devServer, name)
	};
	return new (await (getFetchableDevEnvironment(opts?.vite || { dir: config.root })))(name, config, context, devServer, entry, opts);
}
var _envClasses = /* @__PURE__ */ new Map();
function getFetchableDevEnvironment(opts) {
	const key = opts.path ? _resolveFromPath("vite", opts) : opts.dir;
	let envClass = _envClasses.get(key);
	if (!envClass) {
		envClass = importVite(opts).then((vite) => _defineFetchableDevEnvironment(vite));
		envClass.catch(() => _envClasses.delete(key));
		_envClasses.set(key, envClass);
	}
	return envClass;
}
function _defineFetchableDevEnvironment({ DevEnvironment }) {
	return class FetchableDevEnvironment extends DevEnvironment {
		devServer;
		onClose;
		#entry;
		#workerd;
		#onInit;
		constructor(name, config, context, devServer, entry, opts) {
			super(name, config, context);
			this.devServer = devServer;
			this.#entry = entry;
			this.#workerd = opts?.workerd ?? false;
			this.#onInit = opts?.onInit;
		}
		async fetchModule(id, importer, options) {
			if (this.#workerd && WORKERD_BUILTIN_RE.test(id)) return {
				externalize: id,
				type: "builtin"
			};
			return super.fetchModule(id, importer, options);
		}
		async dispatchFetch(request) {
			return this.devServer.fetch(request);
		}
		async init(...args) {
			await this.devServer.init?.();
			await super.init(...args);
			this.#onInit?.();
			this.devServer.sendMessage({
				type: "custom",
				event: "nitro:vite-env",
				data: {
					name: this.name,
					entry: this.#entry
				}
			});
		}
		async close() {
			this.onClose?.();
			await super.close();
			await this.devServer.close?.();
		}
	};
}
async function configureViteDevServer(ctx, server) {
	const nitro = ctx.nitro;
	const nitroEnv = server.environments.nitro;
	const viteBase = server.config.base || "/";
	const reloadSignal = new DevReloadSignal();
	ctx.devApp.reloadSignal = reloadSignal;
	const pageTemplate = setupDevPageTemplate(ctx, server, nitroEnv);
	nitroEnv.onClose = () => {
		reloadSignal.close();
		pageTemplate.close();
	};
	const nitroConfigFile = nitro.options._c12.configFile;
	if (nitroConfigFile) server.config.configFileDependencies.push(nitroConfigFile);
	const websocket = (nitro.options.features.websocket ?? nitro.options.experimental.websocket) || _isWorkerdRunner(ctx);
	const wsProxy = Object.values(nitro.options.devProxy).some((opts) => typeof opts === "object" && opts.ws);
	if (websocket || wsProxy) {
		const viteHmrBase = _getViteHmrBase(server);
		server.httpServer?.on("upgrade", (req, socket, head) => {
			if (viteHmrBase && _isViteHmrUpgrade(req, viteHmrBase)) return;
			if (ctx.devApp?.proxyUpgrade(req, socket, head)) return;
			if (websocket) nitroEnv.devServer.upgrade?.({ node: {
				req,
				socket,
				head
			} });
		});
	}
	const reload = t(async () => {
		await rescanHandlers(nitro, nitroEnv);
		nitroEnv.hot.send({ type: "full-reload" });
		ctx.devApp?.reloadSignal.bump();
	});
	watchScanDirs(nitro, server, () => reload());
	if (!server.config.server.middlewareMode) {
		const onSigint = async () => {
			try {
				await server.close();
			} finally {
				process.exit(130);
			}
		};
		process.once("SIGINT", onSigint);
		nitro.hooks.hook("close", () => {
			process.off("SIGINT", onSigint);
		});
	}
	server.httpServer?.once("listening", () => {
		const url = _getListenURL(server);
		if (url) writeDevBuildInfo(nitro, { url }).catch((error) => {
			nitro.logger.warn(`Failed to write dev build info: ${error instanceof Error ? error.message : String(error)}`);
		});
	});
	const nitroDevMiddleware = async (nodeReq, nodeRes, next) => {
		if (!nodeReq.url || /^\/@(?:vite|fs|id)\//.test(withoutBase(nodeReq.url, viteBase)) || nodeReq._nitroHandled || server.middlewares.stack.some((mw) => matchesMiddlewareRoute(mw.route, nodeReq.url))) return next();
		nodeReq._nitroHandled = true;
		const baseURL = nitro.options.baseURL || "/";
		const originalURL = nodeReq.url;
		if (baseURL !== "/") nodeReq.url = withBase(nodeReq.url, baseURL);
		try {
			const req = new NodeRequest({
				req: nodeReq,
				res: nodeRes
			});
			const devAppRes = await ctx.devApp.fetch(req);
			if (nodeRes.writableEnded || nodeRes.headersSent) return;
			if (devAppRes.status !== 404 || nodeReq._nitroDevRoute) return await sendNodeResponse(nodeRes, devAppRes);
			await pageTemplate.sync(req);
			const envRes = await nitroEnv.dispatchFetch(req);
			if (nodeRes.writableEnded || nodeRes.headersSent) return;
			if (nodeReq._nitroAssetCheck && envRes.ok && /^text\/html\b/i.test(envRes.headers.get("content-type") || "")) {
				await envRes.body?.cancel();
				return next();
			}
			return await sendNodeResponse(nodeRes, withDevErrorRecovery(req, envRes, {
				signal: ctx.devApp.reloadSignal,
				base: nitro.options.baseURL,
				poll: true
			}));
		} catch (error) {
			if (_isResponseDestroyed(nodeRes)) return;
			return next(error);
		} finally {
			if (baseURL !== "/") nodeReq.url = originalURL;
		}
	};
	const isCatchAllRoute = (route) => route === "/**" || route.startsWith("/**:") || /^\/:\w+\(\.\*\)$/.test(route);
	const isOpaqueHandler = (h) => !!h?.handler && !nitro.scannedHandlers.some((s) => s.handler === h.handler);
	const nitroDevMiddlewarePre = (req, res, next) => {
		if (/^\/(?:__|@)/.test(withoutBase(req.url, viteBase))) return next();
		const pathname = new URL(withBase(req.url, nitro.options.baseURL), "http://localhost").pathname;
		let match = nitro.routing.routes.match(req.method || "", pathname);
		if (req.method === "HEAD" && !(match && !Array.isArray(match) && match.method)) match = nitro.routing.routes.match("GET", pathname);
		const matchedHandlers = match ? Array.isArray(match) ? match : [match] : [];
		const isExplicitRoute = matchedHandlers.some((h) => h?.route && !isCatchAllRoute(h.route));
		if (!isExplicitRoute && ctx.devApp.hasRoute(req.method || "", pathname)) {
			req._nitroDevRoute = true;
			return nitroDevMiddleware(req, res, next);
		}
		if (isExplicitRoute) return nitroDevMiddleware(req, res, next);
		res.setHeader("vary", "sec-fetch-dest, accept");
		const fetchDest = req.headers["sec-fetch-dest"];
		const ext = req.url.split(/[?#]/, 1)[0].match(/\.([a-z0-9]+)$/i)?.[1];
		const isAssetByExt = !!ext && ASSET_EXT_RE.test(ext) && !/\btext\/html\b/.test(req.headers["accept"] || "");
		const isAssetByFile = () => {
			const urlPath = req.url.split(/[?#]/, 1)[0];
			if (!ext || ext === "html" || /\btext\/html\b/.test(req.headers["accept"] || "") || !urlPath.startsWith(viteBase)) return false;
			let filePath = withoutBase(urlPath, viteBase);
			try {
				filePath = decodeURI(filePath);
			} catch {}
			const file = join$2(server.config.root, filePath);
			const rel = relative$2(server.config.root, file);
			if (rel.startsWith("../") || isAbsolute$2(rel)) return false;
			try {
				return statSync(file, { throwIfNoEntry: false })?.isFile() === true;
			} catch {
				return false;
			}
		};
		const isAsset = (!req.method || req.method === "GET" || req.method === "HEAD") && (typeof fetchDest === "string" && fetchDest !== "empty" ? !/^(?:document|iframe|frame)$/.test(fetchDest) : /[?&]import(?:[&=]|$)/.test(req.url) || isAssetByExt || isAssetByFile());
		if (!isAsset && (matchedHandlers.length > 0 || !ext)) return nitroDevMiddleware(req, res, next);
		if (isAsset) {
			if (matchedHandlers.every(isOpaqueHandler)) req._nitroAssetCheck = true;
			else req._nitroHandled = true;
		}
		next();
	};
	server.middlewares.use(nitroDevMiddlewarePre);
	return () => {
		server.middlewares.use(nitroDevMiddleware);
	};
}
function matchesMiddlewareRoute(route, url) {
	route = route?.replace(/\/$/, "").toLowerCase();
	if (!route) return false;
	const path = url.replace(/[?#].*$/, "").toLowerCase();
	if (!path.startsWith(route)) return false;
	const boundary = path[route.length];
	return !boundary || boundary === "/" || boundary === ".";
}
function _isResponseDestroyed(res) {
	return "stream" in res ? res.stream.destroyed : res.destroyed;
}
function _getViteHmrBase(server) {
	const { ws, hmr, port } = server.config.server;
	if (ws === false) return;
	const opts = typeof ws === "object" ? ws : typeof hmr === "object" ? hmr : void 0;
	const wsServer = opts?.server || (!opts?.port || opts.port === port) && server.httpServer;
	if (!wsServer || wsServer !== server.httpServer) return;
	return opts?.path ? join$2(server.config.base, opts.path) : server.config.base;
}
function _getListenURL(server) {
	const addr = server.httpServer?.address();
	if (!addr || typeof addr === "string") return;
	const host = addr.address.includes(":") ? `[${addr.address}]` : addr.address;
	return `${server.config.server.https ? "https" : "http"}://${host}:${addr.port}/`;
}
function _isViteHmrUpgrade(req, hmrBase) {
	const protocol = req.headers["sec-websocket-protocol"];
	return (protocol === "vite-hmr" || protocol === "vite-ping") && new URL(`http://localhost${req.url}`).pathname === hmrBase;
}
export { configureViteDevServer, createFetchableDevEnvironment };
