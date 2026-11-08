import { AdapterHookable, Message, Peer, WSError, adapterUtils, getPeers, toBufferLike } from "./crossws2.mjs";
import { defaultResolve } from "./crossws6.mjs";
import { createWaitUntil, fmtURL, gracefulShutdownPlugin, printListening, resolvePortAndHost, resolveTLSOptions, toNativeResponse, trustProxyPlugin, wrapFetch } from "./srvx2.mjs";
import { limitRequestBody } from "./srvx3.mjs";
// node_modules/crossws/dist/adapters/deno.mjs
var denoAdapter = (options = {}) => {
	if (typeof Deno === "undefined") throw new Error("[crossws] Using Deno adapter in an incompatible environment.");
	const hooks = new AdapterHookable(options);
	const globalPeers = /* @__PURE__ */ new Map();
	const baseUtils = adapterUtils(globalPeers, options);
	return {
		...baseUtils,
		handleUpgrade: async (request, info) => {
			const remoteAddress = info.remoteAddr?.hostname;
			const requestSnapshot = snapshotRequest(request);
			const { upgradeHeaders, endResponse, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			const headers = upgradeHeaders instanceof Headers ? upgradeHeaders : new Headers(upgradeHeaders);
			const upgrade = Deno.upgradeWebSocket(request, {
				headers,
				protocol: headers.get("sec-websocket-protocol") ?? "",
				idleTimeout: options.idleTimeout ?? 30
			});
			const peers = getPeers(globalPeers, namespace);
			const peer = new DenoPeer({
				ws: upgrade.socket,
				request: requestSnapshot,
				peers,
				remoteAddress,
				context,
				namespace,
				sync: baseUtils.sync
			});
			peers.add(peer);
			upgrade.socket.addEventListener("open", () => {
				hooks.callHook("open", peer);
			});
			upgrade.socket.addEventListener("message", (event) => {
				hooks.callHook("message", peer, new Message(event.data, peer, event));
			});
			upgrade.socket.addEventListener("close", () => {
				peers.delete(peer);
				hooks.callHook("close", peer, {});
			});
			upgrade.socket.addEventListener("error", (error) => {
				peers.delete(peer);
				hooks.callHook("error", peer, new WSError(error));
			});
			return upgrade.response;
		}
	};
};
function snapshotRequest(request) {
	const url = request.url;
	const headers = new Headers(request.headers);
	return new Proxy(request, { get(target, prop, receiver) {
		if (prop === "url") return url;
		if (prop === "headers") return headers;
		return Reflect.get(target, prop, receiver);
	} });
}
var DenoPeer = class extends Peer {
	get remoteAddress() {
		return this._internal.remoteAddress;
	}
	send(data) {
		return this._internal.ws.send(toBufferLike(data));
	}
	_publish(topic, data) {
		const dataBuff = toBufferLike(data);
		for (const peer of this._internal.peers) if (peer !== this && peer._topics.has(topic)) peer._internal.ws.send(dataBuff);
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
	terminate() {
		this._internal.ws.terminate();
	}
};
// node_modules/srvx/dist/adapters/deno.mjs
function serve$1(options) {
	return new DenoServer(options);
}
var DenoServer = class {
	runtime = "deno";
	options;
	deno = {};
	serveOptions;
	fetch;
	waitUntil;
	#listeningPromise;
	#listeningInfo;
	#wait;
	constructor(options) {
		this.options = {
			...options,
			middleware: [...options.middleware || []]
		};
		for (const plugin of options.plugins || []) plugin(this);
		trustProxyPlugin(this);
		gracefulShutdownPlugin(this);
		const fetchHandler = wrapFetch(this);
		const loader = globalThis.__srvxLoader__;
		if (loader) {
			this.fetch = fetchHandler;
			loader({ server: this });
			return;
		}
		this.#wait = createWaitUntil();
		this.waitUntil = this.#wait.waitUntil;
		const maxRequestBodySize = this.options.maxRequestBodySize;
		this.fetch = (request, info) => {
			if (maxRequestBodySize !== void 0) request = limitRequestBody(request, maxRequestBodySize);
			Object.defineProperties(request, {
				waitUntil: { value: this.#wait?.waitUntil },
				runtime: {
					enumerable: true,
					value: {
						name: "deno",
						deno: {
							info,
							server: this.deno?.server
						}
					}
				},
				ip: {
					enumerable: true,
					configurable: true,
					get() {
						return info?.remoteAddr?.hostname;
					}
				}
			});
			return toNativeResponse(fetchHandler(request));
		};
		const tls = resolveTLSOptions(this.options);
		this.serveOptions = {
			...resolvePortAndHost(this.options),
			reusePort: this.options.reusePort,
			onError: this.options.error,
			...tls ? {
				key: tls.key,
				cert: tls.cert,
				passphrase: tls.passphrase
			} : {},
			...this.options.deno
		};
		if (!options.manual) this.serve();
	}
	serve() {
		if (this.deno?.server) return Promise.resolve(this.#listeningPromise).then(() => this);
		const onListenPromise = Promise.withResolvers();
		this.#listeningPromise = onListenPromise.promise;
		this.deno.server = Deno.serve({
			...this.serveOptions,
			onListen: (info) => {
				this.#listeningInfo = info;
				if (this.options.deno?.onListen) this.options.deno.onListen(info);
				printListening(this.options, this.url);
				onListenPromise.resolve();
			}
		}, this.fetch);
		return Promise.resolve(this.#listeningPromise).then(() => this);
	}
	get url() {
		return this.#listeningInfo ? fmtURL(this.#listeningInfo.hostname, this.#listeningInfo.port, !!this.serveOptions.cert) : void 0;
	}
	ready() {
		return Promise.resolve(this.#listeningPromise).then(() => this);
	}
	async close() {
		await Promise.all([this.#wait?.wait(), Promise.resolve(this.deno?.server?.shutdown())]);
	}
};
// node_modules/crossws/dist/server/deno.mjs
function plugin(wsOpts) {
	return (server) => {
		const ws = denoAdapter({
			hooks: wsOpts,
			resolve: defaultResolve(server, wsOpts),
			...wsOpts.options?.deno
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req, req.runtime.deno.info);
			return next();
		});
	};
}
function serve(options) {
	if (options.websocket) {
		options.plugins ||= [];
		options.plugins.push(plugin(options.websocket));
	}
	return serve$1(options);
}
export { plugin, serve };
