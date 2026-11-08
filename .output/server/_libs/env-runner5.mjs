import { pe } from "./env-runner.mjs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
// node_modules/env-runner/dist/_chunks/deno-process-runner.mjs
var i;
var a = class extends pe {
	#e;
	constructor(e) {
		super({
			...e,
			workerEntry: e.workerEntry || (i ||= fileURLToPath(import.meta.resolve(`env-runner/runners/deno-process/worker`)))
		}), this._initWithVirtualData(() => this.#t(e.execArgv));
	}
	sendMessage(e) {
		if (!this.#e) throw Error(`Deno env process should be initialized before sending messages.`);
		this.#e.send(e);
	}
	_hasRuntime() {
		return !!this.#e;
	}
	_runtimeType() {
		return `process`;
	}
	_resolveConditions() {
		return [
			`deno`,
			`node`,
			`import`
		];
	}
	async _closeRuntime() {
		if (this.#e) {
			this.#e.removeAllListeners();
			try {
				this.#e.kill();
			} catch {}
			this.#e = void 0;
		}
	}
	#t(e) {
		if (!existsSync(this._workerEntry)) {
			this.close(`process entry not found in "${this._workerEntry}".`);
			return;
		}
		let t = spawn(`deno`, [
			`run`,
			`-A`,
			`--node-modules-dir=auto`,
			`--no-lock`,
			...e || [],
			this._workerEntry
		], {
			env: this._processEnv(),
			stdio: [
				`pipe`,
				`pipe`,
				`pipe`,
				`ipc`
			],
			serialization: `json`
		});
		t.once(`exit`, (e) => {
			t._exitCode = e, this.close(`process exited with code ${e}`);
		}), t.on(`error`, (e) => {
			this.closed || (console.error(`Process error:`, e), this.close(e));
		}), t.on(`message`, (e) => {
			this._handleProcessMessage(e);
		}), t.stdout?.pipe(process.stdout), t.stderr?.pipe(process.stderr), this.#e = t;
	}
};
export { a };
