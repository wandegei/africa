import { AdapterHookable, Message, Peer, WSError, adapterUtils, getPeers, toBufferLike } from "./crossws2.mjs";
import { defaultResolve } from "./crossws6.mjs";
import { createWaitUntil, fmtURL, gracefulShutdownPlugin, printListening, resolvePortAndHost, resolveTLSOptions, toNativeResponse, trustProxyPlugin, wrapFetch } from "./srvx2.mjs";
// node_modules/crossws/dist/adapters/bun.mjs
var bunAdapter = (options = {}) => {
	if (typeof Bun === "undefined") throw new Error("[crossws] Using Bun adapter in an incompatible environment.");
	const hooks = new AdapterHookable(options);
	const globalPeers = /* @__PURE__ */ new Map();
	const baseUtils = adapterUtils(globalPeers, options, { nativePubSub: true });
	return {
		...baseUtils,
		async handleUpgrade(request, server) {
			const { upgradeHeaders, endResponse, context, namespace } = await hooks.upgrade(request);
			if (endResponse) return endResponse;
			if (!server.upgrade(request, {
				data: {
					server,
					request,
					context,
					namespace
				},
				headers: upgradeHeaders
			})) return new Response("Upgrade failed", { status: 500 });
		},
		websocket: {
			idleTimeout: options.idleTimeout ?? 30,
			message: (ws, message) => {
				const peer = getPeer(ws, getPeers(globalPeers, ws.data.namespace), baseUtils.sync, hooks);
				hooks.callHook("message", peer, new Message(message, peer));
			},
			open: (ws) => {
				const peers = getPeers(globalPeers, ws.data.namespace);
				const peer = getPeer(ws, peers, baseUtils.sync, hooks);
				peers.add(peer);
				hooks.callHook("open", peer);
			},
			close: (ws, code, reason) => {
				const peers = getPeers(globalPeers, ws.data.namespace);
				const peer = getPeer(ws, peers, baseUtils.sync, hooks);
				peers.delete(peer);
				hooks.callHook("close", peer, {
					code,
					reason
				});
			},
			drain: (ws) => {
				const peer = getPeer(ws, getPeers(globalPeers, ws.data.namespace), baseUtils.sync, hooks);
				hooks.callHook("drain", peer);
			},
			ping: (ws, data) => {
				const peer = getPeer(ws, getPeers(globalPeers, ws.data.namespace), baseUtils.sync, hooks);
				hooks.callHook("ping", peer, data);
			},
			pong: (ws, data) => {
				const peer = getPeer(ws, getPeers(globalPeers, ws.data.namespace), baseUtils.sync, hooks);
				hooks.callHook("pong", peer, data);
			}
		}
	};
};
function getPeer(ws, peers, sync, hooks) {
	if (ws.data.peer) return ws.data.peer;
	const peer = new BunPeer({
		ws,
		request: ws.data.request,
		peers,
		namespace: ws.data.namespace,
		sync,
		hooks
	});
	ws.data.peer = peer;
	return peer;
}
var BunPeer = class extends Peer {
	get remoteAddress() {
		return this._internal.ws.remoteAddress;
	}
	get context() {
		return this._internal.ws.data.context;
	}
	get bufferedAmount() {
		return this._internal.ws.getBufferedAmount();
	}
	send(data, options) {
		return this._internal.ws.send(toBufferLike(data), options?.compress);
	}
	_publish(topic, data, options) {
		return this._internal.ws.publish(topic, toBufferLike(data), options?.compress);
	}
	subscribe(topic) {
		this._topics.add(topic);
		this._internal.ws.subscribe(topic);
	}
	unsubscribe(topic) {
		this._topics.delete(topic);
		this._internal.ws.unsubscribe(topic);
	}
	close(code, reason) {
		this._internal.ws.close(code, reason);
	}
	terminate() {
		this._internal.ws.terminate();
	}
	ping(data) {
		try {
			return this._internal.ws.ping(data);
		} catch (error) {
			this._internal.hooks.callHook("error", this, new WSError(error));
			return 0;
		}
	}
};
// node_modules/srvx/dist/adapters/bun.mjs
function serve$1(options) {
	return new BunServer(options);
}
var BunServer = class {
	runtime = "bun";
	options;
	bun = {};
	serveOptions;
	fetch;
	waitUntil;
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
		this.fetch = (request, server) => {
			Object.defineProperties(request, {
				waitUntil: { value: this.#wait?.waitUntil },
				runtime: {
					enumerable: true,
					value: {
						name: "bun",
						bun: { server }
					}
				},
				ip: {
					enumerable: true,
					configurable: true,
					get() {
						return server?.requestIP(request)?.address;
					}
				}
			});
			return toNativeResponse(fetchHandler(request));
		};
		const tls = resolveTLSOptions(this.options);
		this.serveOptions = {
			...resolvePortAndHost(this.options),
			reusePort: this.options.reusePort,
			error: this.options.error,
			...this.options.maxRequestBodySize !== void 0 ? { maxRequestBodySize: this.options.maxRequestBodySize } : {},
			...this.options.bun,
			tls: {
				cert: tls?.cert,
				key: tls?.key,
				passphrase: tls?.passphrase,
				...this.options.bun?.tls
			},
			fetch: this.fetch
		};
		if (!options.manual) this.serve();
	}
	serve() {
		if (!this.bun.server) this.bun.server = Bun.serve(this.serveOptions);
		printListening(this.options, this.url);
		return Promise.resolve(this);
	}
	get url() {
		const server = this.bun?.server;
		if (!server) return;
		const address = server.address;
		if (address) return fmtURL(address.address, address.port, server.protocol === "https");
		return server.url.href;
	}
	ready() {
		return Promise.resolve(this);
	}
	async close(closeAll) {
		await Promise.all([this.#wait?.wait(), Promise.resolve(this.bun?.server?.stop(closeAll))]);
	}
};
// node_modules/crossws/dist/server/bun.mjs
function plugin(wsOpts) {
	return (server) => {
		const ws = bunAdapter({
			hooks: wsOpts,
			resolve: defaultResolve(server, wsOpts),
			...wsOpts.options?.bun
		});
		server.options.middleware.unshift((req, next) => {
			if (req.headers.get("upgrade")?.toLowerCase() === "websocket") return ws.handleUpgrade(req, req.runtime.bun.server);
			return next();
		});
		server.options.bun ??= {};
		if (server.options.bun.websocket) throw new Error("websocket handlers for bun already set!");
		server.options.bun.websocket = ws.websocket;
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
