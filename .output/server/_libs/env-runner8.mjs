import { A, Ut, pe } from "./env-runner.mjs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
// node_modules/env-runner/dist/_chunks/node-worker-runner.mjs
var o;
var s = class extends pe {
	#e;
	constructor(e) {
		super({
			...e,
			workerEntry: e.workerEntry || (o ||= fileURLToPath(import.meta.resolve(`env-runner/runners/node-worker/worker`)))
		}), this._initWithVirtualData(() => this.#t());
	}
	sendMessage(e) {
		if (!this.#e) throw Error(`Worker thread should be initialized before sending messages.`);
		this.#e.postMessage(e);
	}
	_hasRuntime() {
		return !!this.#e;
	}
	_runtimeType() {
		return `worker`;
	}
	async _closeRuntime() {
		this.#e &&= (this.#e.removeAllListeners(), await this.#e.terminate().catch((e) => {
			console.error(e);
		}), void 0);
	}
	#t() {
		if (!existsSync(this._workerEntry)) {
			this.close(`worker entry not found in "${this._workerEntry}".`);
			return;
		}
		let t = this._pluginWorkerData(`port`), r = t[Ut]?.port, o = new Worker(this._workerEntry, {
			env: A(),
			workerData: {
				name: this._name,
				...this._data,
				...t,
				...this._listenWorkerData()
			},
			transferList: r ? [r] : void 0
		});
		o.once(`exit`, (e) => {
			o._exitCode = e, this.close(`worker exited with code ${e}`);
		}), o.once(`error`, (e) => {
			console.error(`Worker error:`, e), this.close(e);
		}), o.on(`message`, (e) => {
			this._handleMessage(e);
		}), this.#e = o;
	}
};
export { s };
