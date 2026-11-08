import { pe } from "./env-runner.mjs";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { homedir } from "node:os";
import { execSync, spawn } from "node:child_process";
// node_modules/env-runner/dist/runners/bun-process/runner.mjs
var s;
var c;
var l = typeof Bun < `u`;
async function u(e, t) {
	if (e) try {
		for await (let n of e) t.write(n);
	} catch {}
}
function d() {
	if (c) return c;
	let e = [join(homedir(), `.bun`, `bin`, `bun`)];
	for (let t of e) if (existsSync(t)) return c = t;
	try {
		let e = execSync(`which bun`, { encoding: `utf8` }).trim();
		if (e) return c = e;
	} catch {}
	return c = `bun`;
}
var f = class extends pe {
	#e;
	constructor(e) {
		super({
			...e,
			workerEntry: e.workerEntry || (s ||= fileURLToPath(import.meta.resolve(`env-runner/runners/bun-process/worker`)))
		}), this._initWithVirtualData(() => this.#t(e.execArgv));
	}
	sendMessage(e) {
		if (!this.#e) throw Error(`Bun env process should be initialized before sending messages.`);
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
			`bun`,
			`node`,
			`import`
		];
	}
	async _closeRuntime() {
		if (this.#e) {
			this.#e.removeAllListeners?.();
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
		let t = this._processEnv();
		l ? this.#n(e, t) : this.#r(e, t);
	}
	#n(e, t) {
		let n = Bun.spawn({
			cmd: [
				d(),
				...e || [],
				this._workerEntry
			],
			env: t,
			stdio: [
				`pipe`,
				`pipe`,
				`pipe`
			],
			ipc: (e) => {
				this._handleProcessMessage(e);
			}
		}), r = {
			pid: n.pid,
			kill: () => n.kill(),
			send: (e) => n.send(e),
			exited: n.exited,
			_exitCode: void 0
		};
		n.exited.then((e) => {
			r._exitCode = e, this.close(`process exited with code ${e}`);
		}), u(n.stdout, process.stdout), u(n.stderr, process.stderr), this.#e = r;
	}
	#r(e, t) {
		let n = spawn(d(), [...e || [], this._workerEntry], {
			env: t,
			stdio: [
				`pipe`,
				`pipe`,
				`pipe`,
				`ipc`
			]
		}), r = new Promise((e) => {
			n.once(`exit`, (t) => e(t ?? 1));
		}), i = {
			pid: n.pid,
			kill: () => n.kill(),
			send: (e) => n.send(e),
			exited: r,
			_exitCode: void 0,
			removeAllListeners: () => n.removeAllListeners()
		};
		n.once(`exit`, (e) => {
			i._exitCode = e, this.close(`process exited with code ${e}`);
		}), n.on(`error`, (e) => {
			this.closed || (console.error(`Process error:`, e), this.close(e));
		}), n.on(`message`, (e) => {
			this._handleProcessMessage(e);
		}), n.stdout?.pipe(process.stdout), n.stderr?.pipe(process.stderr), this.#e = i;
	}
};
export { f };
