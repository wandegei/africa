import { Bt, Dn, Mn, On, Sn, Tn, Yt, bn, ke, pe, vn } from "./env-runner.mjs";
// node_modules/env-runner/dist/runners/self/runner.mjs
var d = /* @__PURE__ */ new Set();
var f = class extends pe {
	#e = !1;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o = /* @__PURE__ */ new Set();
	constructor(e) {
		super({
			...e,
			workerEntry: ``
		}), this.#c();
	}
	async fetch(e, t) {
		if (!this.#t || this.closed) return new Response(`self env runner is unavailable`, { status: 503 });
		let n = e instanceof Request ? e : new Request(this._resolveFetchInput(e), t);
		return this.#a ? this.#a.fetch(n) : this.#t.fetch(n);
	}
	async upgrade(e) {
		if (this.#t && !this.closed) try {
			if (this.#t.websocket) {
				await (await this.#s()).handleUpgrade(e.node.req, e.node.socket, e.node.head);
				return;
			}
			this.#t.upgrade?.(e);
		} catch {
			e.node.socket.destroyed || e.node.socket.destroy();
		}
	}
	sendMessage(e) {
		if (!this.#e) throw Error(`Self env runner should be initialized before sending messages.`);
		e?.type === `ping` ? queueMicrotask(() => this._handleMessage({
			type: `pong`,
			data: e.data
		})) : this.#t?.ipc?.onMessage?.(e);
	}
	async shutdown(t = 5e3) {
		this.#a && this.ready && await Dn(this.#a, t / 2), await this.close();
	}
	async reloadModule() {
		await this._virtualUpdates;
		let e = this._data?.entry;
		if (!e || !this.#t) throw Error(`Cannot reload: no entry loaded`);
		let t = (e) => {
			queueMicrotask(() => this._handleMessage(e));
		};
		this.#n?.closeAll(1001, void 0, !0), this.#n = void 0, this.#t = await On(e, this.#t, t, bn(e, this.#r?.modules()));
	}
	_hasRuntime() {
		return this.#e;
	}
	_runtimeType() {
		return `self`;
	}
	async _applyVirtualUpdates(e) {
		await this.#r.update(e);
	}
	async _closeRuntime() {
		if (this.#e) {
			if (this.#e = !1, this.#n?.closeAll(1001, void 0, !0), this.#n = void 0, this.#a) {
				let e = this.#a.close(!0);
				for (let e of this.#o) e.destroy();
				this.#o.clear(), this.#a = void 0, await e;
			}
			await this.#t?.ipc?.onClose?.(), this.#t = void 0, this.#r?.unregister(), this.#i?.();
		}
	}
	async #s() {
		if (!this.#n) {
			let { default: e } = await import("./_2.mjs");
			this.#n = e({ hooks: this.#t.websocket });
		}
		return this.#n;
	}
	#c() {
		let e = this._data?.entry;
		e ? this._initWithVirtualData(() => {
			this.#e = !0, this.#l(e).catch((e) => {
				console.error(`Self runner entry error:`, e), this.close(e);
			});
		}) : this.close(`self runner requires data.entry`);
	}
	async #l(e) {
		let s = () => ke(this._data?.virtual), l = `Bun` in globalThis ? await s() : void 0, u = this._plugins ? await Yt({
			prefilters: this._plugins.prefilters,
			resolvePrefilters: this._plugins.resolvePrefilters
		}, e, Bt(this._plugins)) : void 0, f = l ?? await s();
		if (this.closed) {
			f.unregister(), u?.();
			return;
		}
		this.#r = f, this.#i = u;
		let p = bn(e, f.modules()), m = d.has(e) ? await Mn(e, p) : await Sn(e, p);
		if (d.add(e), this.closed) return;
		let h = this._listen ? await this.#u(m, this._listen) : void 0;
		this.closed ? await h?.close(!0) : (this.#t = m, await m.ipc?.onOpen?.({ sendMessage: (e) => {
			queueMicrotask(() => this._handleMessage(e));
		} }), this._handleMessage({ address: h ? Tn(h) : {
			host: `127.0.0.1`,
			port: 0
		} }));
	}
	async #u(e, t) {
		let [{ serve: n }, r] = await Promise.all([import("./_.mjs"), e.websocket ? import("./_10.mjs").then((e) => e.plugin) : void 0]), i = () => this.#t ?? e, a = n({
			...vn(e, t),
			fetch: (e) => i().fetch(e),
			plugins: [...e.plugins || [], ...r ? [r(e.websocket)] : []]
		});
		return this.#a = a, a.node?.server?.on(`connection`, (e) => {
			this.#o.add(e), e.once(`close`, () => this.#o.delete(e));
		}), e.upgrade && a.node?.server?.on(`upgrade`, (e, t, n) => {
			i().upgrade?.({ node: {
				req: e,
				socket: t,
				head: n
			} });
		}), await a.ready(), a;
	}
};
export { f };
