import { join$2, normalize$2, resolve$2 } from "./_chunks/common.mjs";
import { createRequire } from "node:module";
import { PassThrough } from "node:stream";
import { pipeline as pipeline$1 } from "node:stream/promises";
import { closeSync, existsSync, openSync, readSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, delimiter, dirname, join, normalize, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { cwd } from "node:process";
import { spawn } from "node:child_process";
import i from "node:readline";
// node_modules/nitro/dist/_libs/nypm+tinyexec.mjs
var x = /^path$/i;
var S = {
	key: `PATH`,
	value: ``
};
function C(e) {
	for (let t in e) {
		if (!Object.prototype.hasOwnProperty.call(e, t) || !x.test(t)) continue;
		let n = e[t];
		return n ? {
			key: t,
			value: n
		} : S;
	}
	return S;
}
function w(e, t) {
	let n = t.value.split(delimiter), r = [], i = typeof e == `string` ? e : fileURLToPath(e, { windows: !1 }), s;
	do
		r.push(resolve(i, `node_modules`, `.bin`)), s = i, i = dirname(i);
	while (i !== s);
	r.push(dirname(process.execPath));
	let c = r.concat(n).join(delimiter);
	return {
		key: t.key,
		value: c
	};
}
function te(e, t, n = !0) {
	let r = {
		...process.env,
		...t
	};
	if (!n) return r;
	let i = w(e, C(r));
	return r[i.key] = i.value, r;
}
var ne = (e) => {
	let t = e.length, n = new PassThrough(), r = () => {
		--t === 0 && n.end();
	};
	for (let t of e) pipeline$1(t, n, { end: !1 }).then(r).catch(r);
	return n;
};
var T = /([()\][%!^"`<>&|;, *?])/g;
var re = /^#!\s*(.+)/;
var ie = /\.(?:com|exe)$/i;
var ae = /node_modules[\\/]\.bin[\\/][^\\/]+\.cmd$/i;
var E = process.platform === `win32`;
var D = [
	`.EXE`,
	`.CMD`,
	`.BAT`,
	`.COM`
];
var O = [``];
function k(e, t = [], n = {}) {
	if (n.shell === !0 || !E) return {
		command: e,
		args: t,
		options: n
	};
	let r = A(e, n), a = null;
	if (r !== null) {
		let e = Buffer.alloc(150), t = null;
		try {
			t = openSync(r, `r`), readSync(t, e, 0, 150, 0);
		} catch {} finally {
			t !== null && closeSync(t);
		}
		let n = e.toString().match(re);
		if (n !== null) {
			let e = n[1].trim(), t = e.indexOf(` `), r = t === -1 ? e : e.slice(0, t), o = t === -1 ? `` : e.slice(t + 1), s = basename(r);
			a = s === `env` ? o || null : s;
		}
	}
	if (a !== null && r !== null && (t = [r, ...t], e = a, r = A(e, n)), r === null || !ie.test(r)) {
		let i = r !== null && ae.test(r);
		e = normalize(e), e = e.replace(T, `^$1`), t = t.map((e) => (e = e.replace(/(?=(\\+?)?)\1"/g, `$1$1\\"`), e = e.replace(/(?=(\\+?)?)\1$/, `$1$1`), e = `"${e}"`, e = e.replace(T, `^$1`), i && (e = e.replace(T, `^$1`)), e)), t = [
			`/d`,
			`/s`,
			`/c`,
			`"${[e, ...t].join(` `)}"`
		], e = n.env?.comspec ?? `cmd.exe`, n = {
			...n,
			windowsVerbatimArguments: !0
		};
	}
	return {
		command: e,
		args: t,
		options: n
	};
}
function A(e, t) {
	let n = (t.cwd ?? cwd()).toString(), r = t.env ?? process.env, i = C(r).value, o = e.includes(`/`) || e.includes(`\\`) ? [``] : [n, ...i.split(delimiter)], s = r.PATHEXT ? r.PATHEXT.split(delimiter) : D;
	e.includes(`.`) && s[0] !== `` && (s = [``, ...s]);
	for (let t of [s, O]) for (let r of o) {
		let i = r.startsWith(`"`) && r.endsWith(`"`) && r.length > 1 ? r.slice(1, -1) : r, a = resolve(n, i, e);
		for (let e of t) {
			let t = a + e;
			try {
				if (statSync(t).isFile()) return t;
			} catch {}
		}
	}
	return null;
}
var j = class extends Error {
	result;
	output;
	exitCode;
	get signalCode() {
		return this.result.signalCode;
	}
	constructor(e, t, n, r) {
		let i = `The process`;
		n && (i = `The command \`${r?.length ? `${n} ${r.map((e) => /[ "'`()]/.test(e) ? JSON.stringify(e) : e).join(` `)}` : n}\``);
		let a = e.exitCode ?? 1;
		super(e.signalCode === null ? `${i} exited with a non-zero status (${a})` : `${i} was killed by the signal ${e.signalCode}`), this.result = e, this.output = t, this.exitCode = a, Object.defineProperty(this, "result", {
			enumerable: !1,
			writable: !1,
			configurable: !1
		});
	}
};
var M = {
	timeout: void 0,
	persist: !1
};
var N = { windowsHide: !0 };
function P(e) {
	let t = new AbortController();
	for (let n of e) {
		if (n.aborted) return t.abort(), n;
		n.addEventListener(`abort`, () => {
			t.abort(n.reason);
		}, { signal: t.signal });
	}
	return t.signal;
}
async function F(e) {
	let t = ``;
	try {
		for await (let n of e) t += n.toString();
	} catch {}
	return t;
}
var I = class {
	_process;
	_aborted = !1;
	_options;
	_command;
	_args;
	_resolveClose;
	_processClosed;
	_thrownError;
	get process() {
		return this._process;
	}
	get pid() {
		return this._process?.pid;
	}
	get exitCode() {
		if (this._process && this._process.exitCode !== null) return this._process.exitCode;
	}
	get signalCode() {
		return this._process?.signalCode ?? null;
	}
	constructor(e, t, n) {
		this._options = {
			...M,
			...n
		}, this._command = e, this._args = t ?? [], this._processClosed = new Promise((e) => {
			this._resolveClose = e;
		});
	}
	kill(e) {
		return this._process?.kill(e) === !0;
	}
	get aborted() {
		return this._aborted;
	}
	get killed() {
		return this._process?.killed === !0;
	}
	pipe(e, t, n) {
		return R(e, t, {
			...n,
			stdin: this
		});
	}
	async *[Symbol.asyncIterator]() {
		let e = this._process;
		if (!e) return;
		let t = [];
		this._streamErr && t.push(this._streamErr), this._streamOut && t.push(this._streamOut);
		let n = ne(t), r = i.createInterface({ input: n });
		for await (let e of r) yield e.toString();
		if (await this._processClosed, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		if (this._options?.throwOnError && (this.exitCode !== 0 && this.exitCode !== void 0 || this.signalCode !== null)) throw new j(this, void 0, this._command, this._args);
	}
	async _waitForOutput() {
		let e = this._process;
		if (!e) throw Error(`No process was started`);
		let [t, n] = await Promise.all([this._streamOut ? F(this._streamOut) : ``, this._streamErr ? F(this._streamErr) : ``]);
		await this._processClosed;
		let { stdin: r } = this._options;
		if (r && typeof r != `string` && await r, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		let i = {
			stderr: n,
			stdout: t,
			exitCode: this.exitCode
		};
		if (this._options.throwOnError && (this.exitCode !== 0 && this.exitCode !== void 0 || this.signalCode !== null)) throw new j(this, i, this._command, this._args);
		return i;
	}
	then(e, t) {
		return this._waitForOutput().then(e, t);
	}
	_streamOut;
	_streamErr;
	spawn() {
		let e = this._options, t = {
			...N,
			...e.nodeOptions
		}, n = t?.cwd ?? cwd(), r = [];
		this._resetState(), e.timeout !== void 0 && r.push(AbortSignal.timeout(e.timeout)), e.signal !== void 0 && r.push(e.signal), e.persist === !0 && (t.detached = !0), r.length > 0 && (t.signal = P(r)), t.env = te(n, t.env, e.nodePath);
		let i = k(this._command, this._args, t), a = spawn(i.command, i.args, i.options);
		if (a.stderr && (this._streamErr = a.stderr), a.stdout && (this._streamOut = a.stdout), this._process = a, a.once(`error`, this._onError), a.once(`close`, this._onClose), a.stdin) {
			let { stdin: t } = e;
			typeof t == `string` ? a.stdin.end(t) : t?.process?.stdout?.pipe(a.stdin);
		}
	}
	_resetState() {
		this._aborted = !1, this._processClosed = new Promise((e) => {
			this._resolveClose = e;
		}), this._thrownError = void 0;
	}
	_onError = (e) => {
		e.name === `AbortError` && (!(e.cause instanceof Error) || e.cause.name !== `TimeoutError`) ? this._aborted = !0 : this._thrownError = e;
	};
	_onClose = () => {
		this._resolveClose && this._resolveClose();
	};
};
var L = (e, t, n) => {
	let r = new I(e, t, n);
	return r.spawn(), r;
};
var R = L;
async function z(e, n, r = {}) {
	let i = normalize$2(e).split(`/`);
	for (; i.length > 0;) {
		let e = await n(i.join(`/`) || `/`);
		if (e || !r.includeParentDirs) return e;
		i.pop();
	}
}
async function B(e, t = {}) {
	return z(e, (e) => {
		let t = join(e, `package.json`);
		if (existsSync(t)) return readFile(t, `utf8`).then((e) => JSON.parse(e));
	}, t);
}
async function V(e, t) {
	let n = await z(t, (t) => {
		let n = join(t, `node_modules`, e, `package.json`);
		if (existsSync(n)) return n;
	}, { includeParentDirs: !0 });
	if (!n) return null;
	try {
		return JSON.parse(await readFile(n, `utf8`));
	} catch {
		return null;
	}
}
async function oe(e, t) {
	let n;
	try {
		n = e.resolve(t);
	} catch {
		return null;
	}
	return B(n, { includeParentDirs: !0 });
}
function H(e) {
	let t;
	return () => (t === void 0 && (t = e().then((e) => (t = e, t))), t);
}
var U = H(async () => {
	if (globalThis.process?.versions?.webcontainer) return !1;
	try {
		let { exitCode: e } = await L(`corepack`, [`--version`]);
		return e === 0;
	} catch {
		return !1;
	}
});
async function W(e, t, r = {}) {
	let i = e !== `npm` && e !== `bun` && e !== `deno` && e !== `aube` && e !== `nub` && e !== `upm` && r.corepack !== !1 && await U() ? [`corepack`, [e, ...t]] : [e, t], a = process.stdin.isTTY ? `inherit` : `ignore`, o = r.silent ? [
		a,
		`pipe`,
		`pipe`
	] : [
		a,
		`inherit`,
		`inherit`
	], { exitCode: s, stdout: c, stderr: l } = await L(i[0], i[1], { nodeOptions: {
		cwd: resolve$2(r.cwd || process.cwd()),
		env: r.env,
		stdio: o
	} });
	if (s !== 0) throw Error(`\`${i.flat().join(` `)}\` failed.${r.silent ? [
		``,
		c,
		l
	].join(`
`) : ``}`);
}
async function G(e = {}) {
	let t = resolve$2(e.cwd || process.cwd()), r = {
		...process.env,
		...e.env
	}, i = (typeof e.packageManager == `string` ? Y.find((t) => t.name === e.packageManager) : e.packageManager) || await X(t);
	if (!i) throw Error(`No package manager auto-detected.`);
	return {
		cwd: t,
		env: r,
		silent: e.silent ?? !1,
		packageManager: i,
		dev: e.dev ?? !1,
		workspace: e.workspace,
		global: e.global ?? !1,
		dry: e.dry ?? !1,
		corepack: e.corepack ?? !0
	};
}
function K(e) {
	if (!e.workspace) return [];
	let t = typeof e.workspace == `string` && e.workspace !== `` ? e.workspace : void 0;
	return e.packageManager.name === `pnpm` || e.packageManager.name === `aube` || e.packageManager.name === `nub` ? t ? [`--filter`, t] : [`--workspace-root`] : e.packageManager.name === `npm` ? t ? [`-w`, t] : [`--workspaces`] : e.packageManager.name === `upm` ? t ? [`-w`, t] : [] : e.packageManager.name === `yarn` ? !e.packageManager.majorVersion || e.packageManager.majorVersion === `1` ? t ? [`--cwd`, t] : [`-W`] : t ? [`workspace`, t] : [] : [];
}
var J = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
function se(e) {
	let [t, n] = (e || ``).split(`@`), [r, i] = n?.split(`+`) || [];
	if (t && t !== `-` && J.test(t)) return {
		name: t,
		version: r,
		buildMeta: i
	};
	let a = (t || ``).replace(/\W+/g, ``);
	return {
		name: a,
		version: r,
		buildMeta: i,
		warnings: [`Abnormal characters found in \`packageManager\` field, sanitizing from \`${t}\` to \`${a}\``]
	};
}
function ce(e) {
	let t = e?.packageManager, n = Array.isArray(t) ? t[0] : t, r = typeof n?.name == `string` ? n.name : void 0, i = typeof n?.version == `string` ? n.version : void 0;
	if (!r) return {};
	if (!J.test(r)) {
		let e = r.replace(/\W+/g, ``);
		return {
			name: e,
			version: i,
			warnings: [`Abnormal characters found in \`devEngines.packageManager\` field, sanitizing from \`${r}\` to \`${e}\``]
		};
	}
	return {
		name: r,
		version: i
	};
}
var Y = [
	{
		name: `npm`,
		command: `npm`,
		lockFile: `package-lock.json`
	},
	{
		name: `aube`,
		command: `aube`,
		lockFile: `aube-lock.yaml`
	},
	{
		name: `nub`,
		command: `nub`,
		lockFile: `nub.lock`
	},
	{
		name: `upm`,
		command: `upm`,
		lockFile: `upm.lock`
	},
	{
		name: `pnpm`,
		command: `pnpm`,
		lockFile: `pnpm-lock.yaml`,
		files: [`pnpm-workspace.yaml`]
	},
	{
		name: `bun`,
		command: `bun`,
		lockFile: [`bun.lockb`, `bun.lock`]
	},
	{
		name: `yarn`,
		command: `yarn`,
		lockFile: `yarn.lock`,
		files: [`.yarnrc.yml`]
	},
	{
		name: `deno`,
		command: `deno`,
		lockFile: `deno.lock`,
		files: [`deno.json`]
	}
];
async function X(t, r = {}) {
	let i = await z(resolve$2(t || `.`), async (t) => {
		if (!r.ignorePackageJSON) {
			let n = join$2(t, `package.json`);
			if (existsSync(n)) {
				let e = JSON.parse(await readFile(n, `utf8`));
				if (e?.packageManager) {
					let { name: t, version: n = `0.0.0`, buildMeta: r, warnings: i } = se(e.packageManager);
					if (t) {
						let e = n.split(`.`)[0], a = Y.find((n) => n.name === t && n.majorVersion === e) || Y.find((e) => e.name === t);
						return {
							name: t,
							command: t,
							version: n,
							majorVersion: e,
							buildMeta: r,
							warnings: i,
							files: a?.files,
							lockFile: a?.lockFile
						};
					}
				}
				let t = ce(e?.devEngines);
				if (t.name) {
					let { name: e, version: n, warnings: r } = t, i = n?.match(/\d+/)?.[0], a = Y.find((t) => t.name === e && t.majorVersion === i) || Y.find((t) => t.name === e);
					return {
						name: e,
						command: e,
						version: n,
						majorVersion: i,
						warnings: r,
						files: a?.files,
						lockFile: a?.lockFile
					};
				}
			}
			let r = join$2(t, `deno.json`);
			if (existsSync(r)) return Y.find((e) => e.name === `deno`);
		}
		if (!r.ignoreLockFile) {
			for (let e of Y) if ([e.lockFile, e.files].flat().filter(Boolean).some((e) => existsSync(resolve$2(t, e)))) return { ...e };
		}
	}, { includeParentDirs: r.includeParentDirs ?? !0 });
	if (!i && !r.ignoreArgv) {
		let e = process.argv[1];
		if (e) {
			for (let t of Y) if (RegExp(`[/\\\\]\\.?${t.command}`).test(e)) return t;
		}
	}
	return i;
}
async function Q(e, t = {}) {
	let n = await G(t), i = Array.isArray(e) ? e : [e];
	if (n.packageManager.name === `deno`) for (let e = 0; e < i.length; e++) /^(npm|jsr|file):.+$/.test(i[e] || ``) || (i[e] = `npm:${i[e]}`);
	if (i.length === 0) return {};
	let a = (n.packageManager.name === `yarn` ? [
		...K(n),
		n.global && n.packageManager.majorVersion === `1` ? `global` : ``,
		`add`,
		n.dev ? `-D` : ``,
		...i
	] : [
		n.packageManager.name === `npm` ? `install` : `add`,
		...K(n),
		n.dev ? `-D` : ``,
		n.global ? `-g` : ``,
		...i
	]).filter(Boolean);
	if (n.dry || await W(n.packageManager.command, a, {
		cwd: n.cwd,
		env: n.env,
		silent: n.silent,
		corepack: n.corepack
	}), !n.dry && t.installPeerDependencies) {
		let e = await B(n.cwd), t = [], a = [], o = createRequire(join(n.cwd, `/_.js`));
		for (let r of i) {
			let i = r.match(/^(.[^@]+)/)?.[0];
			if (!i) continue;
			let s = await oe(o, i);
			if (s?.name !== i && (s = await V(i, n.cwd)), s?.peerDependencies) for (let [n, r] of Object.entries(s.peerDependencies)) s.peerDependenciesMeta?.[n]?.optional || e?.dependencies?.[n] || e?.devDependencies?.[n] || (s.peerDependenciesMeta?.[n]?.dev ? a : t).push(`${n}@${r}`);
		}
		t.length > 0 && await Q(t, { ...n }), a.length > 0 && await $(a, { ...n });
	}
	return { exec: {
		command: n.packageManager.command,
		args: a
	} };
}
async function $(e, t = {}) {
	return await Q(e, {
		...t,
		dev: !0
	});
}
export { Q as addDependency, $ as addDevDependency, X as detectPackageManager };
