import { e, t } from "./env-runner2.mjs";
import { NodeResponse } from "./srvx.mjs";
import { finished } from "node:stream";
import { watch } from "node:fs";
// node_modules/env-runner/dist/_chunks/server.mjs
async function a(e, t) {
	let n = `Bun` in globalThis, r = `Deno` in globalThis;
	if (!n && !r) return (t) => {
		t.ready().then(() => {
			(t.node?.server)?.on(`upgrade`, (t, n, r) => {
				e()?.upgrade?.({ node: {
					req: t,
					socket: n,
					head: r
				} });
			});
		}).catch(() => {});
	};
	let { createWebSocketProxy: i } = await import("./_7.mjs"), { plugin: a } = n ? await import("./_8.mjs") : await import("./_9.mjs"), s = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), l = (t) => {
		let n = e()?.address;
		return s.set(t, n), o(n, t.request.url);
	}, u = i({
		target: (t) => {
			let n = e();
			return n?.ready ? l(t) : Promise.resolve(n?.waitForReady?.()).catch(() => {}).then(() => l(t));
		},
		onUpstreamConnect: t && ((e) => {
			let n = t(s.get(e));
			n && c.set(e, n);
		}),
		onUpstreamClose: t && ((e) => {
			c.get(e)?.(), c.delete(e);
		})
	});
	return a({ resolve: () => u });
}
function o(e, t) {
	if (!e) throw Error(`env runner worker is not ready`);
	let { pathname: n, search: r } = new URL(t);
	if (e.socketPath) return `ws+unix://${e.socketPath}:${n}${r}`;
	if (!e.port) throw Error(`env runner worker is not ready`);
	let i = e.host || `127.0.0.1`, a = i.includes(`:`) && !i.startsWith(`[`) ? `[${i}]` : i;
	return `${e.protocol === `https` ? `wss` : `ws`}://${a}:${e.port}${n}${r}`;
}
var s = 6e4;
var c = class {
	_runner;
	_closingRunner;
	_messageQueue = [];
	_messageListeners = /* @__PURE__ */ new Set();
	_closed = !1;
	_reloading = !1;
	_moduleInvalidated = !1;
	_pendingModuleReload;
	_closeListeners = /* @__PURE__ */ new Set();
	_readyListeners = /* @__PURE__ */ new Set();
	_readyRejectors = /* @__PURE__ */ new Set();
	_runnerCloseCause;
	_exchanges = /* @__PURE__ */ new WeakMap();
	_draining = /* @__PURE__ */ new Map();
	_wrappedRunners = /* @__PURE__ */ new WeakSet();
	constructor(e) {
		e && this._attach(e);
	}
	get ready() {
		return this._runner?.ready ?? !1;
	}
	get closed() {
		return this._closed;
	}
	get address() {
		return this._runner?.address;
	}
	async reload(e, t) {
		this._reloading = !0;
		try {
			if (e ??= await this._createRunner(), this._closed) {
				await e.close();
				return;
			}
			let n = this._runner;
			if (this._draining.get(e)?.cancel(), n === e) return;
			this._detach(), this._attach(e), this._moduleInvalidated = !1, n && t?.drain ? this._drain(n, (t.drain === !0 ? void 0 : t.drain.timeout) ?? s) : n && await n.close();
		} finally {
			this._reloading = !1;
		}
	}
	_createRunner() {
		throw Error(`reload() requires a runner argument (this manager has no runner factory)`);
	}
	fetch = (e, t) => this._fetch(e, t);
	async _fetch(e, t) {
		this._runner || await this._waitForRunner();
		let n = this._runner;
		if (!n) return new Response(`Runner is unavailable`, { status: 503 });
		let r = this._beginExchange(n);
		try {
			this._moduleInvalidated && await this._flushInvalidation(n);
			let i = await n.fetch(e, t);
			return (t?.method ?? (e instanceof Request ? e.method : `GET`)).toUpperCase() === `HEAD` ? (r(), i) : d(i, r);
		} catch (e) {
			throw r(), e;
		}
	}
	_flushInvalidation(e) {
		if (this._pendingModuleReload?.runner === e) return this._pendingModuleReload.promise;
		let t = {
			runner: e,
			promise: Promise.resolve(e.reloadModule?.()).then(() => {
				this._runner === e && (this._moduleInvalidated = !1);
			}).finally(() => {
				this._pendingModuleReload === t && (this._pendingModuleReload = void 0);
			})
		};
		return this._pendingModuleReload = t, t.promise;
	}
	upgrade = async (e) => {
		this._runner || await this._waitForRunner();
		let t = this._runner;
		if (!t?.upgrade) {
			e.node.socket.destroy();
			return;
		}
		let { socket: n } = e.node;
		n.destroyed || n.once(`close`, this._beginExchange(t)), await t.upgrade(e);
	};
	wsSrvxPlugin() {
		return a(() => this, (e) => {
			let t = this._runner;
			if (!t || t.address !== e) throw Error(`The runner changed before the WebSocket connected`);
			return this._beginExchange(t);
		});
	}
	sendMessage(e) {
		!this._runner || !this._runner.ready ? this._messageQueue.push(e) : this._runner.sendMessage(e);
	}
	onMessage(e) {
		this._messageListeners.add(e), this._runner?.onMessage(e);
	}
	offMessage(e) {
		this._messageListeners.delete(e), this._runner?.offMessage(e);
	}
	waitForReady(n = 15e3) {
		return this.ready ? Promise.resolve() : this._closed ? Promise.reject(t(this._runnerCloseCause)) : new Promise((r, i) => {
			let a = () => {
				clearTimeout(o), this.offMessage(s), this._readyRejectors.delete(c);
			}, o = setTimeout(() => {
				a(), i(e(`Runner did not become ready in time`, this._runnerCloseCause));
			}, n), s = (e) => {
				(e?.address || this.ready) && (a(), r());
			}, c = () => {
				a(), i(t(this._runnerCloseCause));
			};
			this.onMessage(s), this._readyRejectors.add(c);
		});
	}
	rpc(e, t, n) {
		let r = Math.random().toString(36).slice(2), i = n?.timeout ?? 3e3;
		return new Promise((n, a) => {
			let o = setTimeout(() => {
				c(), a(/* @__PURE__ */ Error(`RPC "${e}" timed out`));
			}, i), s = (e) => {
				e?.__rpc_id === r && (c(), e.error ? a(typeof e.error == `string` ? Error(e.error) : e.error) : n(e.data));
			}, c = () => {
				clearTimeout(o), this.offMessage(s);
			};
			this.onMessage(s), this.sendMessage({
				__rpc: e,
				__rpc_id: r,
				data: t
			});
		});
	}
	async reloadModule(e) {
		let t = this._runner;
		if (!t?.reloadModule) throw Error(`Active runner does not support reloadModule()`);
		await t.reloadModule(e), this._runner === t && (this._moduleInvalidated = !1);
	}
	async updateVirtualModules(e, t) {
		let n = await this._waitForRunner();
		if (!n?.updateVirtualModules) throw Error(`Active runner does not support updateVirtualModules()`);
		await n.updateVirtualModules(e, t), this._moduleInvalidated = !0;
	}
	async invalidateModule(e, t) {
		let n = await this._waitForRunner();
		if (!n?.invalidateModule) throw Error(`Active runner does not support invalidateModule()`);
		await n.invalidateModule(e, t), this._moduleInvalidated = !0;
	}
	async shutdown(e) {
		await this._close((t) => t.shutdown ? t.shutdown(e) : t.close());
	}
	async close() {
		await this._close(l);
	}
	async [Symbol.asyncDispose]() {
		await this.close();
	}
	onClose(e) {
		this._closeListeners.add(e);
	}
	offClose(e) {
		this._closeListeners.delete(e);
	}
	onReady(e) {
		this._readyListeners.add(e);
	}
	offReady(e) {
		this._readyListeners.delete(e);
	}
	async _close(e) {
		this._closed = !0, this._messageQueue.length = 0;
		for (let e of this._readyRejectors) e();
		this._readyRejectors.clear();
		let t = Promise.all([...this._draining.values()].map((t) => t.retire(e))), n = this._runner ?? this._closingRunner;
		if (!n) await t;
		else {
			this._runner = void 0, this._closingRunner = n;
			try {
				await Promise.all([e(n), t]);
			} finally {
				this._closingRunner === n && (this._closingRunner = void 0), this._detachListeners(n);
			}
		}
	}
	_beginExchange(e) {
		this._exchanges.set(e, (this._exchanges.get(e) ?? 0) + 1);
		let t = !1;
		return () => {
			if (t) return;
			t = !0;
			let n = this._exchanges.get(e) - 1;
			n > 0 ? this._exchanges.set(e, n) : (this._exchanges.delete(e), this._draining.get(e)?.retire());
		};
	}
	_drain(e, t) {
		let n, r, i = {
			retire: (t = u) => (clearTimeout(n), (!r || t === l && !e.closed) && (r = new Promise((n) => n(t(e))).catch((e) => {
				console.error(`[env-runner] Failed to close the drained runner:`, e);
			}).finally(() => {
				this._draining.get(e) === i && this._draining.delete(e);
			})), r),
			cancel: () => {
				clearTimeout(n), r || this._draining.delete(e);
			}
		};
		this._draining.set(e, i), t = Number.isNaN(t) ? s : Math.max(t, 0), !this._exchanges.has(e) || e.closed ? i.retire() : t < 2 ** 31 && (n = setTimeout(() => i.retire(l), t), n.unref?.());
	}
	_internalListener = (e) => {
		if (e?.address) {
			this._flushQueue();
			for (let t of this._readyListeners) t(this, e.address);
		}
	};
	_attach(e) {
		this._runner = e, this._runnerCloseCause = void 0, e.onMessage(this._internalListener);
		for (let t of this._messageListeners) e.onMessage(t);
		if (!this._wrappedRunners.has(e)) {
			this._wrappedRunners.add(e);
			let t = e.close.bind(e);
			e.close = async (n) => {
				if (this._runner === e && !e.closed && (this._runnerCloseCause = n), await t(n), this._draining.get(e)?.retire(async () => {}), this._runner === e) {
					this._runner = void 0;
					for (let e of this._closeListeners) e(this, n);
				}
			};
		}
		e.ready && this._flushQueue();
	}
	_detach() {
		let e = this._runner;
		e && (this._runner = void 0, this._detachListeners(e));
	}
	_detachListeners(e) {
		e.offMessage(this._internalListener);
		for (let t of this._messageListeners) e.offMessage(t);
	}
	_waitForRunner(e = 3e3) {
		return this._runner ? Promise.resolve(this._runner) : this._reloading ? new Promise((t) => {
			let n = Date.now(), r = () => {
				if (this._runner) return t(this._runner);
				if (this._closed || Date.now() - n >= e) return t(void 0);
				setTimeout(r, 50);
			};
			setTimeout(r, 50);
		}) : Promise.resolve(void 0);
	}
	_flushQueue() {
		if (!this._runner || this._messageQueue.length === 0) return;
		let e = [...this._messageQueue];
		this._messageQueue.length = 0;
		for (let t of e) this._runner.sendMessage(t);
	}
};
function l(e) {
	return e.close();
}
function u(e) {
	return e.shutdown ? e.shutdown() : e.close();
}
function d(e, t) {
	return typeof e?._toNodeResponse == `function` ? f(e, t) : e?.body ? new NodeResponse(p(e.body, t), {
		status: e.status,
		statusText: e.statusText,
		headers: e.headers
	}) : (t(), e);
}
function f(e, t) {
	let { status: i, statusText: a, headers: o, body: s } = e._toNodeResponse(), c = [];
	for (let e = 0; e < o.length; e += 2) c.push([String(o[e]), String(o[e + 1])]);
	let l = s;
	return s instanceof ReadableStream ? l = p(s, t) : typeof s?.pipe == `function` ? finished(s, () => t()) : t(), new NodeResponse(l, {
		status: i,
		statusText: a,
		headers: c
	});
}
function p(e, t) {
	let n = e.getReader();
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: r, value: i } = await n.read();
				r ? (t(), e.close()) : e.enqueue(i);
			} catch (n) {
				t(), e.error(n);
			}
		},
		cancel(e) {
			return t(), n.cancel(e);
		}
	});
}
var m = {
	"node-worker": () => import("./_17.mjs").then((e) => e.NodeWorkerEnvRunner),
	"node-process": () => import("./_16.mjs").then((e) => e.NodeProcessEnvRunner),
	"bun-process": () => import("./_12.mjs").then((e) => e.BunProcessEnvRunner),
	"deno-process": () => import("./_13.mjs").then((e) => e.DenoProcessEnvRunner),
	self: () => import("./_18.mjs").then((e) => e.SelfEnvRunner),
	miniflare: () => import("./_14.mjs").then((e) => e.MiniflareEnvRunner),
	vercel: () => import("./_19.mjs").then((e) => e.VercelEnvRunner),
	netlify: () => import("./_15.mjs").then((e) => e.NetlifyEnvRunner)
};
async function h(e, t) {
	return new (await (m[e]()))(t);
}
var g = class extends c {
	_opts;
	_watchers = [];
	_reloadTimeout;
	_reloadListeners = /* @__PURE__ */ new Set();
	_startPromise;
	_virtual;
	runner = null;
	onReload(e) {
		this._reloadListeners.add(e);
	}
	offReload(e) {
		this._reloadListeners.delete(e);
	}
	constructor(e) {
		super(), this._opts = e;
	}
	start() {
		return this._startPromise ??= this._start().catch((e) => {
			throw this._startPromise = void 0, e;
		}), this._startPromise;
	}
	async reload(e, t) {
		this.runner = e ?? await this._createRunner(), await super.reload(this.runner, {
			...t,
			drain: t?.drain ?? this._opts.drain
		});
	}
	async updateVirtualModules(e, t) {
		let n = this._virtual ??= { ...this._opts.data?.virtual };
		for (let [t, r] of Object.entries(e)) r === null ? delete n[t] : r !== void 0 && (n[t] = r);
		await this._waitForRunner() && await super.updateVirtualModules(e, t);
	}
	async shutdown(e) {
		this._stopWatching(), await super.shutdown(e);
	}
	async close() {
		this._stopWatching(), await super.close();
	}
	async _fetch(e, t) {
		return this.closed || await this.start(), super._fetch(e, t);
	}
	async _start() {
		return await this.reload(), this._opts.watch && !this.closed && this._startWatching(), this;
	}
	async _createRunner() {
		return h(this._opts.runner || `node-worker`, {
			...this._opts.runnerOptions,
			name: this._opts.name || this._opts.entry,
			hooks: this._opts.hooks,
			plugins: this._opts.plugins,
			data: {
				...this._opts.data,
				...this._virtual && { virtual: { ...this._virtual } },
				entry: this._opts.entry
			},
			execArgv: this._opts.execArgv
		});
	}
	_startWatching() {
		let e = [this._opts.entry, ...this._opts.watchPaths || []];
		for (let t of e) try {
			let e = watch(t, { recursive: !0 }, () => {
				this._scheduleReload();
			});
			this._watchers.push(e);
		} catch {}
	}
	_stopWatching() {
		clearTimeout(this._reloadTimeout);
		for (let e of this._watchers) e.close();
		this._watchers.length = 0;
	}
	_scheduleReload() {
		clearTimeout(this._reloadTimeout), this._reloadTimeout = setTimeout(async () => {
			try {
				await this.reload();
				for (let e of this._reloadListeners) e();
			} catch (e) {
				console.error(`Failed to reload runner:`, e);
			}
		}, 100);
	}
};
export { c, g, h };
