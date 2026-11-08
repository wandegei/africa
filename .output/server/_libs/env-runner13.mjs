import { pe } from "./env-runner.mjs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";
// node_modules/env-runner/dist/runners/node-process/runner.mjs
var i;
var a = class extends pe {
	#e;
	constructor(e) {
		super({
			...e,
			workerEntry: e.workerEntry || (i ||= fileURLToPath(import.meta.resolve(`env-runner/runners/node-process/worker`)))
		}), this._initWithVirtualData(() => this.#t(e.execArgv));
	}
	sendMessage(e) {
		if (!this.#e) throw Error(`Node env process should be initialized before sending messages.`);
		this.#e.send(e);
	}
	_hasRuntime() {
		return !!this.#e;
	}
	_runtimeType() {
		return `process`;
	}
	async _closeRuntime() {
		this.#e &&= (this.#e.removeAllListeners(), this.#e.kill(), void 0);
	}
	#t(e) {
		if (!existsSync(this._workerEntry)) {
			this.close(`process entry not found in "${this._workerEntry}".`);
			return;
		}
		let t = fork(this._workerEntry, [], {
			env: this._processEnv(),
			stdio: [
				`pipe`,
				`pipe`,
				`pipe`,
				`ipc`
			],
			execArgv: e || []
		});
		t.once(`exit`, (e) => {
			t._exitCode = e, this.close(`process exited with code ${e}`);
		}), t.once(`error`, (e) => {
			console.error(`Process error:`, e), this.close(e);
		}), t.on(`message`, (e) => {
			this._handleProcessMessage(e);
		}), t.stdout?.pipe(process.stdout), t.stderr?.pipe(process.stderr), this.#e = t;
	}
};
export { a };
