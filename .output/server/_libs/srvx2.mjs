// node_modules/srvx/dist/_chunks/_utils2.mjs
function resolvePortAndHost(opts) {
	const _port = opts.port ?? globalThis.process?.env.PORT ?? 3e3;
	const port = typeof _port === "number" ? _port : Number.parseInt(_port, 10);
	if (Number.isNaN(port) || port < 0 || port > 65535) throw new RangeError(`Port must be a number between 0 and 65535 (got "${_port}").`);
	return {
		port,
		hostname: opts.hostname ?? globalThis.process?.env.HOST
	};
}
function fmtURL(host, port, secure) {
	if (!host || !port) return;
	if (host.includes(":")) host = `[${host}]`;
	return `http${secure ? "s" : ""}://${host}:${port}/`;
}
function printListening(opts, url) {
	if (!url || (opts.silent ?? globalThis.process?.env?.TEST)) return;
	let additionalInfo = "";
	try {
		const _url = new URL(url);
		if (_url.hostname === "[::]" || _url.hostname === "0.0.0.0") {
			_url.hostname = "localhost";
			url = _url.href;
			additionalInfo = " (all interfaces)";
		}
	} catch {}
	let listeningOn = `➜ Listening on:`;
	if (globalThis.process.stdout?.isTTY) {
		listeningOn = `\u001B[32m${listeningOn}\u001B[0m`;
		url = `\u001B[36m${url}\u001B[0m`;
		additionalInfo = `\u001B[2m${additionalInfo}\u001B[0m`;
	}
	console.log(`${listeningOn} ${url}${additionalInfo}`);
}
function resolveTLSOptions(opts) {
	if (!opts.tls || opts.protocol === "http") return;
	const cert = resolveCertOrKey(opts.tls.cert);
	const key = resolveCertOrKey(opts.tls.key);
	if (!cert && !key) {
		if (opts.protocol === "https") throw new TypeError("TLS `cert` and `key` must be provided for `https` protocol.");
		return;
	}
	if (!cert || !key) throw new TypeError("TLS `cert` and `key` must be provided together.");
	return {
		cert,
		key,
		passphrase: opts.tls.passphrase
	};
}
function resolveCertOrKey(value) {
	if (!value) return;
	if (typeof value !== "string") throw new TypeError("TLS certificate and key must be strings in PEM format or file paths.");
	if (value.startsWith("-----BEGIN ")) return value;
	const { readFileSync } = process.getBuiltinModule("node:fs");
	return readFileSync(value, "utf8");
}
function toNativeResponse(res) {
	if (res?._toNodeResponse) return res._response;
	if (typeof res?.then === "function") return res.then(toNativeResponse);
	return res;
}
function createWaitUntil() {
	const promises = /* @__PURE__ */ new Set();
	return {
		waitUntil: (promise) => {
			if (typeof promise?.then !== "function") return;
			const chained = Promise.resolve(promise).catch(console.error).finally(() => {
				promises.delete(chained);
			});
			promises.add(chained);
		},
		wait: () => {
			return Promise.all(promises);
		},
		get _size() {
			return promises.size;
		}
	};
}
// node_modules/srvx/dist/_chunks/_utils.mjs
var noColor = /* @__PURE__ */ (() => {
	const proc = globalThis.process;
	const env = proc?.env ?? {};
	if (env.FORCE_COLOR) return false;
	if (env.NO_COLOR || env.TERM === "dumb") return true;
	return !proc?.stdout?.isTTY;
})();
var _c = (c, r = 39) => (t) => noColor ? t : `\u001B[${c}m${t}\u001B[${r}m`;
var bold = /* @__PURE__ */ _c(1, 22);
var red = /* @__PURE__ */ _c(31);
var green = /* @__PURE__ */ _c(32);
var gray = /* @__PURE__ */ _c(90);
// node_modules/srvx/dist/_chunks/_plugins.mjs
function wrapFetch(server) {
	let composed = server.options.fetch;
	const middleware = server.options.middleware;
	if (middleware) for (let i = middleware.length - 1; i >= 0; i--) {
		const mw = middleware[i];
		const next = composed;
		composed = (request) => mw(request, () => next(request));
	}
	return composed;
}
var errorPlugin = (server) => {
	const errorHandler = server.options.error;
	if (!errorHandler) return;
	server.options.middleware.unshift((_req, next) => {
		try {
			const res = next();
			return typeof res?.then === "function" ? res.then(void 0, (error) => errorHandler(error)) : res;
		} catch (error) {
			return errorHandler(error);
		}
	});
};
var gracefulShutdownPlugin = (server) => {
	const config = server.options?.gracefulShutdown;
	if (!globalThis.process?.on || config === false || config === void 0 && (process.env.CI || process.env.TEST)) return;
	const gracefulTimeout = config === true || !config?.gracefulTimeout ? Number.parseInt(process.env.SERVER_SHUTDOWN_TIMEOUT || "") || 5 : config.gracefulTimeout;
	let isClosing = false;
	let isClosed = false;
	const w = server.options.silent ? () => {} : process.stderr.write.bind(process.stderr);
	const forceClose = async () => {
		if (isClosed) return;
		w(red("\x1B[2K\rForcibly closing connections...\n"));
		isClosed = true;
		await server.close(true);
	};
	const shutdown = async () => {
		if (isClosing || isClosed) return;
		setTimeout(() => {
			globalThis.process.once("SIGINT", forceClose);
		}, 100);
		isClosing = true;
		const closePromise = server.close();
		for (let remaining = gracefulTimeout; remaining > 0; remaining--) {
			w(gray(`\rStopping server gracefully (${remaining}s)... Press ${bold("Ctrl+C")} again to force close.`));
			if (await Promise.race([closePromise.then(() => true), new Promise((r) => setTimeout(() => r(false), 1e3))])) {
				w("\x1B[2K\r" + green("Server closed successfully.\n"));
				isClosed = true;
				return;
			}
		}
		w("\x1B[2K\rGraceful shutdown timed out.\n");
		await forceClose();
	};
	for (const sig of ["SIGINT", "SIGTERM"]) globalThis.process.on(sig, shutdown);
};
// node_modules/srvx/dist/_chunks/_trust-proxy.mjs
function isTrustedProxy(trustProxy, remoteAddress) {
	if (trustProxy === void 0 || trustProxy === false) return false;
	if (trustProxy === true) return true;
	if (trustProxy === "loopback") return isLoopbackAddress(remoteAddress);
	if (remoteAddress === void 0) return false;
	if (trustProxy.includes(remoteAddress)) return true;
	const mapped = ipv4FromMapped(remoteAddress);
	return mapped !== void 0 && trustProxy.includes(mapped);
}
function ipv4FromMapped(address) {
	return address.startsWith("::ffff:") && address.includes(".") ? address.slice(7) : void 0;
}
function isLoopbackAddress(address) {
	return !!address && (address === "::1" || address.startsWith("127.") || address.startsWith("::ffff:127."));
}
var HOST_RE = /^(\[(?:[A-Fa-f0-9:.]+)\]|(?:[A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/;
function forwardedHostHasPort(host) {
	const bracket = host.lastIndexOf("]");
	return bracket === -1 ? host.includes(":") : host.indexOf(":", bracket) !== -1;
}
function forwardedList(value) {
	if (!value) return [];
	const raw = Array.isArray(value) ? value.join(",") : value;
	const out = [];
	for (const part of raw.split(",")) {
		const entry = part.trim();
		if (entry) out.push(entry);
	}
	return out;
}
function resolveClientIP(trustProxy, peer, forwardedFor) {
	if (!isTrustedProxy(trustProxy, peer)) return peer;
	const list = forwardedList(forwardedFor);
	for (let i = list.length - 1; i >= 0; i--) if (!isTrustedProxy(trustProxy, list[i])) return list[i];
	return list.length > 0 ? list[0] : peer;
}
function trustedHops(trustProxy, peer, forwardedFor) {
	if (!isTrustedProxy(trustProxy, peer)) return 0;
	const list = forwardedList(forwardedFor);
	let hops = 1;
	for (let i = list.length - 1; i >= 0; i--) {
		if (!isTrustedProxy(trustProxy, list[i])) return hops;
		hops++;
	}
	return Number.POSITIVE_INFINITY;
}
function forwardedHopValue(value, hops) {
	if (hops <= 0) return;
	const list = forwardedList(value);
	if (list.length === 0) return;
	return list[Math.max(0, list.length - hops)];
}
var trustProxyPlugin = (server) => {
	const trustProxy = server.options.trustProxy;
	if (trustProxy === void 0 || trustProxy === false) return;
	server.options.middleware.unshift((request, next) => {
		applyTrustedProxy(request, trustProxy);
		return next();
	});
};
function applyTrustedProxy(request, trustProxy) {
	const peer = request.ip;
	const headers = request.headers;
	const hops = trustedHops(trustProxy, peer, headers.get("x-forwarded-for"));
	if (hops === 0) return;
	const forwardedProto = forwardedHopValue(headers.get("x-forwarded-proto"), hops);
	const forwardedHost = forwardedHopValue(headers.get("x-forwarded-host"), hops);
	if (forwardedProto || forwardedHost) {
		const url = new URL(request.url);
		if (forwardedProto === "https" || forwardedProto === "http") url.protocol = `${forwardedProto}:`;
		if (forwardedHost && HOST_RE.test(forwardedHost)) {
			url.host = forwardedHost;
			if (url.port && !forwardedHostHasPort(forwardedHost)) url.port = "";
		}
		Object.defineProperty(request, "url", {
			value: url.href,
			enumerable: true,
			configurable: true
		});
	}
	const client = resolveClientIP(trustProxy, peer, headers.get("x-forwarded-for"));
	if (client && client !== peer) Object.defineProperty(request, "ip", {
		value: client,
		enumerable: true,
		configurable: true
	});
}
export { HOST_RE, createWaitUntil, errorPlugin, fmtURL, forwardedHopValue, gracefulShutdownPlugin, printListening, resolveClientIP, resolvePortAndHost, resolveTLSOptions, toNativeResponse, trustProxyPlugin, trustedHops, wrapFetch };
