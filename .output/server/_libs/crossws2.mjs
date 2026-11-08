// node_modules/crossws/dist/_chunks/adapter.mjs
var AdapterHookable = class {
	options;
	#resolveCache = /* @__PURE__ */ new WeakMap();
	constructor(options) {
		this.options = options || {};
	}
	callHook(name, arg1, arg2, connection) {
		const globalHook = this.options.hooks?.[name];
		const globalPromise = globalHook?.(arg1, arg2);
		const resolve = this.options.resolve;
		if (!resolve) return globalPromise;
		const request = arg1.request || arg1;
		const cacheKey = connection || arg1.context || request;
		let resolveHooksPromise;
		if (this.#resolveCache.has(cacheKey)) resolveHooksPromise = this.#resolveCache.get(cacheKey);
		else {
			try {
				resolveHooksPromise = resolve(request);
			} catch (error) {
				resolveHooksPromise = Promise.reject(error);
			}
			this.#resolveCache.set(cacheKey, resolveHooksPromise);
			if (resolveHooksPromise instanceof Promise) resolveHooksPromise.catch(() => {
				if (this.#resolveCache.get(cacheKey) === resolveHooksPromise) this.#resolveCache.delete(cacheKey);
			});
		}
		if (!resolveHooksPromise) return globalPromise;
		const resolvePromise = resolveHooksPromise instanceof Promise ? resolveHooksPromise.then((hooks) => hooks?.[name]) : resolveHooksPromise?.[name];
		return Promise.all([globalPromise, resolvePromise]).then(([globalRes, hook]) => {
			const hookResPromise = hook?.(arg1, arg2);
			return hookResPromise instanceof Promise ? hookResPromise.then((hookRes) => hookRes || globalRes) : hookResPromise || globalRes;
		});
	}
	async upgrade(request) {
		let namespace = this.options.getNamespace?.(request) ?? new URL(request.url).pathname;
		const context = request.context || {};
		let upgradeHeaders;
		let protocolFromHook;
		let perMessageDeflate;
		try {
			const res = await this.callHook("upgrade", request, void 0, context);
			if (res) {
				if (res.namespace) namespace = res.namespace;
				if (res.context) Object.assign(context, res.context);
				if (res instanceof Response) return {
					context,
					namespace,
					endResponse: res
				};
				if (res.handled) return {
					context,
					namespace,
					handled: true
				};
				upgradeHeaders = res.headers;
				protocolFromHook = res.protocol;
				perMessageDeflate = res.perMessageDeflate;
			}
		} catch (error) {
			const errResponse = error.response || error;
			if (errResponse instanceof Response) return {
				context,
				namespace,
				endResponse: errResponse
			};
			throw error;
		}
		const protocol = await this._resolveProtocol(request, upgradeHeaders, protocolFromHook);
		if (protocol) {
			const merged = new Headers(upgradeHeaders);
			merged.set("sec-websocket-protocol", protocol);
			upgradeHeaders = merged;
		}
		return {
			context,
			namespace,
			upgradeHeaders,
			perMessageDeflate
		};
	}
	async _resolveProtocol(request, upgradeHeaders, protocolFromHook) {
		if (protocolFromHook) return protocolFromHook;
		if (upgradeHeaders) {
			const fromHeader = (upgradeHeaders instanceof Headers ? upgradeHeaders : new Headers(upgradeHeaders)).get("sec-websocket-protocol");
			if (fromHeader) return fromHeader;
		}
		const handleProtocols = this.options.handleProtocols;
		if (handleProtocols) {
			const offered = _parseProtocols(request.headers.get("sec-websocket-protocol"));
			if (offered.size > 0) {
				const chosen = await handleProtocols(offered, request);
				if (chosen) return chosen;
			}
		}
	}
};
function _parseProtocols(header) {
	const protocols = /* @__PURE__ */ new Set();
	if (!header) return protocols;
	for (const part of header.split(",")) {
		const token = part.trim();
		if (token) protocols.add(token);
	}
	return protocols;
}
var kWebSocketHooks = Symbol.for("crossws.hooks");
function getWebSocketHooks(request) {
	return request[kWebSocketHooks] ?? request.context?.[kWebSocketHooks];
}
var kNodeInspect = /*#__PURE__*/ Symbol.for("nodejs.util.inspect.custom");
function toBufferLike(val) {
	if (val === void 0 || val === null) return "";
	const type = typeof val;
	if (type === "string") return val;
	if (type === "number" || type === "boolean" || type === "bigint") return val.toString();
	if (type === "function" || type === "symbol") return "{}";
	if (val instanceof Uint8Array || val instanceof ArrayBuffer) return val;
	if (isPlainObject(val)) return JSON.stringify(val);
	return val;
}
function serializeMessage(val) {
	const data = toBufferLike(val);
	if (typeof data === "string") return data;
	return data instanceof Uint8Array ? data : new Uint8Array(data);
}
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
var warned;
function warnOnce(message) {
	warned ??= /* @__PURE__ */ new Set();
	if (warned.has(message)) return;
	warned.add(message);
	console.warn(message);
}
function adapterUtils(globalPeers, options, caps) {
	const localPublish = (topic, message, pubOptions) => {
		for (const peers of pubOptions?.namespace ? [globalPeers.get(pubOptions.namespace) || []] : globalPeers.values()) {
			let firstPeerWithTopic;
			for (const peer of peers) if (peer.topics.has(topic)) {
				firstPeerWithTopic = peer;
				break;
			}
			if (firstPeerWithTopic) {
				firstPeerWithTopic.send(message, pubOptions);
				firstPeerWithTopic._publish(topic, message, pubOptions);
				if (caps?.nativePubSub && !pubOptions?.namespace) break;
			}
		}
	};
	let sync;
	if (options?.sync) {
		const report = (stage, error) => {
			if (options.onError) options.onError(error, { stage });
			else console.error(`[crossws] sync ${stage} failed:`, error);
		};
		const driver = options.sync({ id: crypto.randomUUID() });
		const deliver = (msg) => {
			try {
				localPublish(msg.topic, msg.data, { namespace: msg.namespace || void 0 });
			} catch (error) {
				report("delivery", error);
			}
		};
		try {
			Promise.resolve(driver.subscribe(deliver)).catch((error) => report("subscribe", error));
		} catch (error) {
			report("subscribe", error);
		}
		sync = {
			subscribe: (deliver) => driver.subscribe(deliver),
			publish: (msg) => {
				try {
					return Promise.resolve(driver.publish(msg)).catch((e) => report("publish", e));
				} catch (error) {
					report("publish", error);
				}
			},
			close: driver.close ? () => driver.close() : void 0
		};
	}
	return {
		peers: globalPeers,
		sync,
		publish(topic, message, options) {
			localPublish(topic, message, options);
			sync?.publish({
				namespace: options?.namespace || "",
				topic,
				data: serializeMessage(message)
			});
		},
		async close(code, reason) {
			for (const peers of globalPeers.values()) for (const peer of peers) peer.close(code, reason);
			await sync?.close?.();
		}
	};
}
function getPeers(globalPeers, namespace) {
	if (!namespace) throw new Error("Websocket publish namespace missing.");
	let peers = globalPeers.get(namespace);
	if (!peers) {
		peers = /* @__PURE__ */ new Set();
		globalPeers.set(namespace, peers);
	}
	return peers;
}
// node_modules/crossws/dist/_chunks/peer.mjs
var Message = class {
	event;
	peer;
	rawData;
	#id;
	#uint8Array;
	#arrayBuffer;
	#blob;
	#text;
	#json;
	constructor(rawData, peer, event) {
		this.rawData = rawData || "";
		this.peer = peer;
		this.event = event;
	}
	get id() {
		if (!this.#id) this.#id = crypto.randomUUID();
		return this.#id;
	}
	uint8Array() {
		const _uint8Array = this.#uint8Array;
		if (_uint8Array) return _uint8Array;
		const rawData = this.rawData;
		if (rawData instanceof Uint8Array) return this.#uint8Array = rawData;
		if (rawData instanceof ArrayBuffer || rawData instanceof SharedArrayBuffer) {
			this.#arrayBuffer = rawData;
			return this.#uint8Array = new Uint8Array(rawData);
		}
		if (typeof rawData === "string") {
			this.#text = rawData;
			return this.#uint8Array = new TextEncoder().encode(this.#text);
		}
		if (Symbol.iterator in rawData) return this.#uint8Array = new Uint8Array(rawData);
		if (typeof rawData?.length === "number") return this.#uint8Array = new Uint8Array(rawData);
		if (rawData instanceof DataView) return this.#uint8Array = new Uint8Array(rawData.buffer, rawData.byteOffset, rawData.byteLength);
		throw new TypeError(`Unsupported message type: ${Object.prototype.toString.call(rawData)}`);
	}
	arrayBuffer() {
		const _arrayBuffer = this.#arrayBuffer;
		if (_arrayBuffer) return _arrayBuffer;
		const rawData = this.rawData;
		if (rawData instanceof ArrayBuffer || rawData instanceof SharedArrayBuffer) return this.#arrayBuffer = rawData;
		return this.#arrayBuffer = this.uint8Array().buffer;
	}
	blob() {
		const _blob = this.#blob;
		if (_blob) return _blob;
		const rawData = this.rawData;
		if (rawData instanceof Blob) return this.#blob = rawData;
		return this.#blob = new Blob([this.uint8Array()]);
	}
	text() {
		const _text = this.#text;
		if (_text) return _text;
		const rawData = this.rawData;
		if (typeof rawData === "string") return this.#text = rawData;
		return this.#text = new TextDecoder().decode(this.uint8Array());
	}
	json() {
		const _json = this.#json;
		if (_json) return _json;
		return this.#json = JSON.parse(this.text());
	}
	get data() {
		switch (this.peer?.websocket?.binaryType) {
			case "arraybuffer": return this.arrayBuffer();
			case "blob": return this.blob();
			case "nodebuffer": {
				const NodeBuffer = globalThis.Buffer;
				return NodeBuffer ? NodeBuffer.from(this.uint8Array()) : this.uint8Array();
			}
			case "uint8array": return this.uint8Array();
			case "text": return this.text();
			default: return this.rawData;
		}
	}
	toString() {
		return this.text();
	}
	[Symbol.toPrimitive]() {
		return this.text();
	}
	[kNodeInspect]() {
		return { message: {
			id: this.id,
			peer: this.peer,
			text: this.text()
		} };
	}
};
var Peer = class {
	_internal;
	_topics;
	_id;
	#ws;
	#pingUnsupportedWarned = false;
	constructor(internal) {
		this._topics = /* @__PURE__ */ new Set();
		this._internal = internal;
	}
	get context() {
		return this._internal.context ??= {};
	}
	get namespace() {
		return this._internal.namespace;
	}
	get id() {
		if (!this._id) this._id = crypto.randomUUID();
		return this._id;
	}
	get remoteAddress() {}
	get request() {
		return this._internal.request;
	}
	get websocket() {
		if (!this.#ws) {
			const _ws = this._internal.ws;
			const _request = this._internal.request;
			this.#ws = _request ? createWsProxy(_ws, _request) : _ws;
		}
		return this.#ws;
	}
	get peers() {
		return this._internal.peers || /* @__PURE__ */ new Set();
	}
	get topics() {
		return this._topics;
	}
	get bufferedAmount() {
		return this._internal.ws?.bufferedAmount ?? 0;
	}
	waitForDrain(opts = {}) {
		const threshold = opts.threshold ?? 0;
		if (this.bufferedAmount <= threshold) return Promise.resolve();
		const signal = opts.signal;
		if (signal?.aborted) return Promise.reject(signal.reason);
		return new Promise((resolve, reject) => {
			const check = () => {
				if (this.bufferedAmount <= threshold || (this.websocket.readyState ?? 1) > 1) {
					cleanup();
					resolve();
				}
			};
			const onAbort = () => {
				cleanup();
				reject(signal.reason);
			};
			const timer = setInterval(check, opts.pollInterval ?? 100);
			timer.unref?.();
			const cleanup = () => {
				clearInterval(timer);
				signal?.removeEventListener("abort", onAbort);
			};
			signal?.addEventListener("abort", onAbort, { once: true });
		});
	}
	terminate() {
		this.close();
	}
	ping(_data) {
		if (!this.#pingUnsupportedWarned) {
			this.#pingUnsupportedWarned = true;
			console.warn("[crossws] `peer.ping()` is not supported by this adapter.");
		}
	}
	subscribe(topic) {
		this._topics.add(topic);
	}
	unsubscribe(topic) {
		this._topics.delete(topic);
	}
	publish(topic, data, options) {
		this._publish(topic, data, options);
		this._internal.sync?.publish({
			namespace: this.namespace,
			topic,
			data: serializeMessage(data)
		});
	}
	toString() {
		return this.id;
	}
	[Symbol.toPrimitive]() {
		return this.id;
	}
	[Symbol.toStringTag]() {
		return "WebSocket";
	}
	[kNodeInspect]() {
		return { peer: {
			id: this.id,
			ip: this.remoteAddress
		} };
	}
};
function createWsProxy(ws, request) {
	return new Proxy(ws, { get: (target, prop) => {
		const value = Reflect.get(target, prop);
		if (!value) switch (prop) {
			case "protocol": return request?.headers?.get("sec-websocket-protocol") || "";
			case "extensions": return request?.headers?.get("sec-websocket-extensions") || "";
			case "url": return request?.url?.replace(/^http/, "ws") || void 0;
		}
		return value;
	} });
}
// node_modules/crossws/dist/_chunks/error.mjs
var WSError = class extends Error {
	constructor(...args) {
		super(...args);
		this.name = "WSError";
	}
};
export { AdapterHookable, Message, Peer, WSError, adapterUtils, getPeers, getWebSocketHooks, kWebSocketHooks, toBufferLike, warnOnce };
