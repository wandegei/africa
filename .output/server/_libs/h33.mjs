import { HTTPError, HTTPResponse, decodePreservingSeparators, kHandled, withoutTrailingSlash } from "./h3+rou3.mjs";
import { isCacheMatch } from "./h3.mjs";
import { isCanonicalPath } from "./h32.mjs";
// node_modules/h3/dist/h3.mjs
function fromNodeHandler(handler) {
	if (typeof handler !== "function") throw new TypeError(`Invalid handler. It should be a function: ${handler}`);
	return function _nodeHandler(event) {
		const node = event.runtime?.node;
		if (!node?.res) throw new Error("[h3] Executing Node.js middleware is not supported in this server!");
		const url = event.url.pathname + event.url.search;
		if (node.req.url === url) return callNodeHandler(handler, node.req, node.res, event);
		const originalUrl = node.req.url;
		node.req.url = url;
		return callNodeHandler(handler, node.req, node.res, event).finally(() => {
			node.req.url = originalUrl;
		});
	};
}
function callNodeHandler(handler, req, res, event) {
	const isMiddleware = handler.length > 2;
	return new Promise((resolve, reject) => {
		res.once("close", () => resolve(kHandled));
		res.once("finish", () => resolve(kHandled));
		res.once("error", (error) => reject(error));
		res.once("pipe", (stream) => {
			resolve(new Promise((resolve, reject) => {
				const onResClose = () => {
					stream.destroy();
					resolve(kHandled);
				};
				const settle = (cb) => {
					res.removeListener("close", onResClose);
					cb();
				};
				const onStreamClose = () => settle(() => resolve(kHandled));
				stream.once("close", onStreamClose);
				stream.once("error", (error) => settle(() => {
					stream.removeListener("close", onStreamClose);
					console.error("[h3] Stream error in Node.js handler", { cause: error });
					const config = event.app?.config;
					const onError = config?.onError;
					if (!onError) return reject(kHandled);
					Promise.resolve().then(() => onError(new HTTPError({
						cause: error,
						unhandled: true
					}), event)).catch((hookError) => {
						if (!config.silent) console.error(hookError);
					}).finally(() => reject(kHandled));
				}));
				if (res.closed || res.destroyed) onResClose();
				else res.once("close", onResClose);
			}));
		});
		try {
			if (isMiddleware) Promise.resolve(handler(req, res, (error) => error ? reject(new HTTPError({
				cause: error,
				unhandled: true
			})) : resolve(void 0))).catch((error) => reject(new HTTPError({
				cause: error,
				unhandled: true
			})));
			else return Promise.resolve(handler(req, res)).then(() => resolve(kHandled)).catch((error) => reject(new HTTPError({
				cause: error,
				unhandled: true
			})));
		} catch (error) {
			reject(new HTTPError({
				cause: error,
				unhandled: true
			}));
		}
	});
}
var COMMON_MIME_TYPES = {
	".html": "text/html",
	".htm": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".mjs": "text/javascript",
	".cjs": "text/javascript",
	".json": "application/json",
	".txt": "text/plain",
	".xml": "application/xml",
	".gif": "image/gif",
	".ico": "image/vnd.microsoft.icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".mp4": "video/mp4",
	".webm": "video/webm",
	".zip": "application/zip",
	".pdf": "application/pdf",
	".wasm": "application/wasm"
};
function getExtension(path) {
	const filename = path.split("/").pop();
	if (!filename) return;
	const separatorIndex = filename.lastIndexOf(".");
	if (separatorIndex !== -1) return filename.slice(separatorIndex);
}
function getType(ext) {
	return ext ? COMMON_MIME_TYPES[ext.toLowerCase()] : void 0;
}
async function serveStatic(event, options) {
	if (options.headers) {
		const entries = Array.isArray(options.headers) ? options.headers : typeof options.headers.entries === "function" ? options.headers.entries() : Object.entries(options.headers);
		for (const [key, value] of entries) event.res.headers.set(key, value);
	}
	if (event.req.method !== "GET" && event.req.method !== "HEAD") {
		if (options.fallthrough) return;
		event.res.headers.set("allow", "GET, HEAD");
		throw new HTTPError({ status: 405 });
	}
	if (!isCanonicalPath(event.url.pathname)) {
		if (options.fallthrough) return;
		throw new HTTPError({ status: 404 });
	}
	const resolvedId = withoutTrailingSlash(event.url.pathname);
	let originalId = resolvedId;
	if (resolvedId.includes("%")) try {
		const decodedId = decodePreservingSeparators(resolvedId, {
			decode: decodeURI,
			nested: false
		});
		if (isCanonicalPath(decodedId)) originalId = withoutTrailingSlash(decodedId);
	} catch {}
	const acceptEncodings = parseAcceptEncoding(event.req.headers.get("accept-encoding") || "", options.encodings);
	let id = originalId;
	let assetId = originalId;
	let meta;
	const _ids = idSearchPaths(originalId, acceptEncodings, options.indexNames || ["/index.html"]);
	for (const _id of _ids) {
		const _meta = await options.getMeta(_id.id);
		if (_meta) {
			meta = _meta;
			id = _id.id;
			assetId = _id.assetId;
			break;
		}
	}
	if (!meta) {
		if (options.fallthrough) return;
		throw new HTTPError({ statusCode: 404 });
	}
	if (options.encodings && Object.keys(options.encodings).length > 0) {
		const vary = event.res.headers.get("vary") || "";
		if (!/(?:^|,)\s*(?:\*|accept-encoding)\s*(?:,|$)/i.test(vary)) event.res.headers.append("vary", "accept-encoding");
	}
	let mtimeDate;
	if (meta.mtime) {
		mtimeDate = new Date(meta.mtime);
		mtimeDate.setMilliseconds(0);
		if (!event.res.headers.get("last-modified")) event.res.headers.set("last-modified", mtimeDate.toUTCString());
	}
	if (meta.etag && !event.res.headers.has("etag")) event.res.headers.set("etag", meta.etag);
	if (isCacheMatch(event.req.headers, {
		etag: meta.etag,
		lastModified: mtimeDate
	})) return new HTTPResponse(null, {
		status: 304,
		statusText: "Not Modified"
	});
	if (!event.res.headers.get("content-type")) {
		if (meta.type) event.res.headers.set("content-type", meta.type);
		else {
			const ext = getExtension(assetId);
			const type = ext ? options.getType?.(ext) ?? getType(ext) : void 0;
			if (type) event.res.headers.set("content-type", type);
		}
	}
	if (meta.encoding && !event.res.headers.get("content-encoding")) event.res.headers.set("content-encoding", meta.encoding);
	if (meta.size !== void 0 && meta.size > 0 && !event.res.headers.get("content-length")) event.res.headers.set("content-length", meta.size + "");
	if (event.req.method === "HEAD") return new HTTPResponse(null, { status: 200 });
	const contents = await options.getContents(id);
	return new HTTPResponse(contents || null, { status: 200 });
}
var WEIGHT_RE = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/;
function parseAcceptEncoding(header, encodingMap) {
	if (!encodingMap || !header) return [];
	const extensions = /* @__PURE__ */ new Map();
	for (const [name, ext] of Object.entries(encodingMap)) extensions.set(normalizeCoding(name), ext);
	const weights = /* @__PURE__ */ new Map();
	let wildcard;
	for (const part of header.split(",")) {
		const [rawName = "", ...params] = part.split(";");
		const name = normalizeCoding(rawName);
		if (name !== "*" && !extensions.has(name)) continue;
		const qParam = params.find((p) => /^\s*q\s*=/i.test(p));
		const qValue = qParam?.slice(qParam.indexOf("=") + 1).trim();
		const q = qValue === void 0 ? 1 : WEIGHT_RE.test(qValue) ? Number(qValue) : 0;
		if (name === "*") wildcard ??= q;
		else if (!weights.has(name)) weights.set(name, q);
	}
	if (wildcard) {
		for (const name of extensions.keys()) if (!weights.has(name)) weights.set(name, wildcard);
	}
	const accepted = [...weights].filter(([, q]) => q > 0).sort((a, b) => b[1] - a[1]).map(([name]) => extensions.get(name));
	return [...new Set(accepted)];
}
function normalizeCoding(name) {
	const coding = name.trim().toLowerCase();
	return coding === "x-gzip" || coding === "x-compress" ? coding.slice(2) : coding;
}
function idSearchPaths(id, encodings, indexNames) {
	const ids = [];
	for (const suffix of ["", ...indexNames]) {
		const assetId = `${id}${suffix}`;
		for (const encoding of [...encodings, ""]) ids.push({
			id: `${assetId}${encoding}`,
			assetId
		});
	}
	return ids;
}
export { fromNodeHandler, serveStatic };
