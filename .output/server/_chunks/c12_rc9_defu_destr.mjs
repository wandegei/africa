import { basename$2, dirname$2, extname$3, join$2, normalize$2, resolve$2, resolveModulePath } from "./common.mjs";
import { createRequire } from "node:module";
import { existsSync, lstatSync, readFileSync, realpathSync, statSync, watch } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { readFile, rm } from "node:fs/promises";
import { homedir } from "node:os";
import * as c from "node:util";
import { createHash } from "node:crypto";
// node_modules/nitro/dist/_libs/c12+rc9+defu+destr.mjs
var S = { trailing: !0 };
function C(e, t = 25, n = {}) {
	if (n = {
		...S,
		...n
	}, !Number.isFinite(t)) throw TypeError("Expected `wait` to be a finite number");
	let r, i, a = [], o, s, c = (t, r) => (o = ee(e, t, r), o.finally(() => {
		if (o = null, n.trailing && s && !i) {
			let e = c(t, s);
			return s = null, e;
		}
	}), o), l = function(...e) {
		return n.trailing && (s = e), o || new Promise((o) => {
			let l = !i && n.leading;
			clearTimeout(i), i = setTimeout(() => {
				i = null;
				let t = n.leading ? r : c(this, e);
				s = null;
				for (let e of a) e(t);
				a = [];
			}, t), l ? (r = c(this, e), o(r)) : a.push(o);
		});
	}, u = (e) => {
		e && (clearTimeout(e), i = null);
	};
	return l.isPending = () => !!i, l.cancel = () => {
		u(i), a = [], s = null;
	}, l.flush = () => {
		if (u(i), !s || o) return;
		let e = s;
		return s = null, c(this, e);
	}, l;
}
async function ee(e, t, n) {
	return await e.apply(t, n);
}
function w(e) {
	return e && e.constructor && typeof e.constructor.isBuffer == `function` && e.constructor.isBuffer(e);
}
function te(e) {
	return e;
}
function ne(e, t) {
	t ||= {};
	let n = t.delimiter || `.`, r = t.maxDepth, i = t.transformKey || te, a = {};
	function o(e, s, c) {
		c ||= 1, Object.keys(e).forEach(function(l) {
			let u = e[l], d = t.safe && Array.isArray(u), f = Object.prototype.toString.call(u), p = w(u), m = f === `[object Object]` || f === `[object Array]`, h = s ? s + n + i(l) : i(l);
			if (!d && !p && m && Object.keys(u).length && (!t.maxDepth || c < r)) return o(u, h, c + 1);
			a[h] = u;
		});
	}
	return o(e), a;
}
function re(e, t) {
	t ||= {};
	let n = t.delimiter || `.`, r = t.overwrite || !1, i = t.transformKey || te, a = {};
	if (w(e) || Object.prototype.toString.call(e) !== `[object Object]`) return e;
	function o(e) {
		let n = Number(e);
		return isNaN(n) || e.indexOf(`.`) !== -1 || t.object ? e : n;
	}
	function s(e, t, r) {
		return Object.keys(r).reduce(function(t, i) {
			return t[e + n + i] = r[i], t;
		}, t);
	}
	function c(e) {
		let t = Object.prototype.toString.call(e), n = t === `[object Array]`, r = t === `[object Object]`;
		if (!e) return !0;
		if (n) return !e.length;
		if (r) return !Object.keys(e).length;
	}
	return e = Object.keys(e).reduce(function(n, r) {
		let i = Object.prototype.toString.call(e[r]);
		return i !== `[object Object]` && i !== `[object Array]` || c(e[r]) ? (n[r] = e[r], n) : s(r, n, ne(e[r], t));
	}, {}), Object.keys(e).forEach(function(s) {
		let c = s.split(n).map(i), l = o(c.shift()), u = o(c[0]), d = a;
		for (; u !== void 0;) {
			if (l === `__proto__`) return;
			let e = Object.prototype.toString.call(d[l]), n = e === `[object Object]` || e === `[object Array]`;
			if (!r && !n && d[l] !== void 0) return;
			(r && !n || !r && d[l] == null) && (d[l] = typeof u == `number` && !t.object ? [] : {}), d = d[l], c.length > 0 && (l = o(c.shift()), u = o(c[0]));
		}
		d[l] = re(e[s], t);
	}), a;
}
var ie = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var ae = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var oe = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function se(e, t) {
	if (e === `__proto__` || e === `constructor` && t && typeof t == `object` && `prototype` in t) ce(e);
	else return t;
}
function ce(e) {
	console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function T(e, t = {}) {
	if (typeof e != `string`) return e;
	if (e[0] === `"` && e[e.length - 1] === `"` && e.indexOf(`\\`) === -1) return e.slice(1, -1);
	let n = e.trim();
	if (n.length <= 9) switch (n.toLowerCase()) {
		case `true`: return !0;
		case `false`: return !1;
		case `undefined`: return;
		case `null`: return null;
		case `nan`: return NaN;
		case `infinity`: return 1 / 0;
		case `-infinity`: return -1 / 0;
	}
	if (!oe.test(e)) {
		if (t.strict) throw SyntaxError(`[destr] Invalid JSON`);
		return e;
	}
	try {
		if (ie.test(e) || ae.test(e)) {
			if (t.strict) throw Error(`[destr] Possible prototype pollution`);
			return JSON.parse(e, se);
		}
		return JSON.parse(e);
	} catch (n) {
		if (t.strict) throw n;
		return e;
	}
}
function E(e) {
	if (typeof e != `object` || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === `[object Module]` : !0;
}
function D(e, t, n = `.`, r) {
	if (!E(t)) return D(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === `__proto__` || t === `constructor`) continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : E(a) && E(i[t]) ? D(a, i[t], (n ? `${n}.` : ``) + t.toString(), r) : a));
	}
	return i;
}
function le(e) {
	return (...t) => t.reduce((t, n) => D(t, n, ``, e), {});
}
var O = le();
var ue = /^\s*([^\s=]+)\s*=\s*(.*)?\s*$/;
var de = /\n|\r|\r\n/;
var fe = {
	name: `.conf`,
	dir: process.cwd(),
	flat: !1
};
function k(e) {
	return typeof e == `string` && (e = { name: e }), {
		...fe,
		...e
	};
}
function pe(e, t = {}) {
	let n = {}, r = e.split(de);
	for (let e of r) {
		let t = e.match(ue);
		if (!t) continue;
		let r = t[1];
		if (!r || r === `__proto__` || r === `constructor`) continue;
		let i = T((t[2] || ``).trim());
		if (r.endsWith(`[]`)) {
			let e = r.slice(0, Math.max(0, r.length - 2));
			n[e] = (n[e] || []).concat(i);
		} else n[r] = i;
	}
	return t.flat ? n : re(n, { overwrite: !0 });
}
function me(e, t) {
	return existsSync(e) ? pe(readFileSync(e, `utf8`), t) : {};
}
function A(e) {
	return e = k(e), me(resolve(e.dir, e.name), e);
}
function he() {
	return process.env.XDG_CONFIG_HOME || resolve(homedir(), `.config`);
}
function ge(e) {
	return e = k(e), e.dir = he(), A(e);
}
async function j(e) {
	let t = e.env ?? process.env, n = await M({
		cwd: e.cwd,
		fileName: e.fileName ?? `.env`,
		env: t,
		interpolate: e.interpolate ?? !0,
		expandFileReferences: e.expandFileReferences ?? !1,
		parse: e.parse
	}), r = Ce(t);
	for (let e in n) e.startsWith(`_`) || (t[e] === void 0 || r.has(e)) && (t[e] = n[e]);
	return n;
}
async function M(e) {
	let t = Object.create(null), n = resolve$2(e.cwd || `.`), r = e.fileName || `.env`, i = typeof r == `string` ? [r] : r, o = Ce(e.env || {});
	Object.assign(t, e.env);
	for (let r of i) {
		let i = resolve$2(n, r);
		if (!statSync(i, { throwIfNoEntry: !1 })?.isFile()) continue;
		let s = await _e(i, e.parse);
		for (let e in s) e in t && !o.has(e) || (t[e] = s[e], o.add(e));
	}
	if (e.expandFileReferences) {
		for (let e in t) if (e.endsWith(`_FILE`)) {
			let n = e.slice(0, -5);
			if (t[n] === void 0) {
				let r = t[e];
				r && statSync(r, { throwIfNoEntry: !1 })?.isFile() && (t[n] = readFileSync(r, `utf8`).trim(), o.add(n));
			}
		}
	}
	return e.interpolate && ve(t), t;
}
var N = c.parseEnv;
async function _e(e, t) {
	let n = readFileSync(e, `utf8`);
	if (t) return t(n);
	if (!N) try {
		let e = await import("./dotenv.ts.mjs");
		N = (t) => e.parse(t);
	} catch {
		throw Error("Failed to parse .env file: `node:util.parseEnv` is not available and `dotenv` package is not installed. Please upgrade your runtime, install `dotenv` as a dependency or provide a custom `parse` option.");
	}
	return N(n);
}
function ve(e, t = {}, n = (e) => e) {
	let r = { ...e }, i = /* @__PURE__ */ new Map();
	function a(e) {
		return t[e] === void 0 ? r[e] : t[e];
	}
	function o(e, t = []) {
		if (typeof e != `string`) return e;
		let r = ``, s = 0;
		for (; s < e.length;) {
			let n = e[s];
			if (n === `\\` && e[s + 1] === `$`) {
				r += `$`, s += 2;
				continue;
			}
			let c = n === `$` ? xe(e, s) : void 0;
			if (!c) {
				r += n, s++;
				continue;
			}
			if (t.includes(c.key)) {
				if (c.defaultValue !== void 0) {
					r += o(c.defaultValue, t), s = c.end;
					continue;
				}
				return console.warn(`Please avoid recursive environment variables ( loop: ${t.join(` > `)} > ${c.key} )`), ``;
			}
			let l = i.has(c.key) ? i.get(c.key) : o(a(c.key), [...t, c.key]);
			c.defaultValue !== void 0 && (l === void 0 || c.operator === `:-` && l === ``) && (l = o(c.defaultValue, t)), r += l === void 0 ? e.slice(s, c.end) : l, s = c.end;
		}
		return n(r);
	}
	for (let t in e) e[t] = o(a(t)), i.set(t, e[t]);
}
var ye = /\w+/y;
var be = /[\w:]+/y;
function xe(e, t) {
	let n = t + 1, r = e[n] === `{`;
	r && n++;
	let i = r ? be : ye;
	i.lastIndex = n;
	let a = i.exec(e);
	if (!a) return;
	let o = a[0];
	if (n = i.lastIndex, !r) return {
		key: o,
		end: n
	};
	if (e[n] === `}`) return {
		key: o,
		end: n + 1
	};
	if (e[n] === `-`) {
		let t = `-`;
		o.endsWith(`:`) && (o = o.slice(0, -1), t = `:-`);
		let r = o ? Se(e, n + 1) : void 0;
		return r ? {
			key: o,
			operator: t,
			defaultValue: r.value,
			end: r.end
		} : void 0;
	}
	return {
		key: o,
		end: n
	};
}
function Se(e, t) {
	let n = ``, r = 1;
	for (let i = t; i < e.length; i++) {
		let t = e[i];
		if (t === `\\` && i + 1 < e.length) {
			let r = e[i + 1];
			n += r === `{` || r === `}` ? r : t + r, i++;
		} else if (t === `$` && e[i + 1] === `{`) r++, n += "${", i++;
		else {
			if (t === `{` && r++, t === `}` && (r--, r === 0)) return {
				value: n,
				end: i + 1
			};
			n += t;
		}
	}
}
function Ce(e) {
	let t = globalThis.__c12_dotenv_vars__ ||= /* @__PURE__ */ new Map();
	return t.has(e) || t.set(e, /* @__PURE__ */ new Set()), t.get(e);
}
var P = (e) => e?.replace(/\\/g, `/`);
var we = 0;
var Te = {
	".json": () => JSON.parse,
	".yaml": () => import("../_9.mjs").then((e) => e.parseYAML),
	".yml": () => import("../_9.mjs").then((e) => e.parseYAML),
	".jsonc": () => import("../_2.mjs").then((e) => (t) => e.parseJSONC(t, { allowTrailingComma: !0 })),
	".json5": () => import("../_7.mjs").then((e) => e.parseJSON5),
	".toml": () => import("../_8.mjs").then((e) => e.parseTOML)
};
var F = Object.freeze([
	`.js`,
	`.ts`,
	`.mjs`,
	`.cjs`,
	`.mts`,
	`.cts`,
	`.json`,
	`.jsonc`,
	`.json5`,
	`.yaml`,
	`.yml`,
	`.toml`
]);
async function I(e) {
	e.cwd = resolve$2(process.cwd(), e.cwd || `.`), e.name = e.name || `config`, e.envName = e.envName ?? "production", e.configFile = e.configFile ?? (e.name === `config` ? `config` : `${e.name}.config`), e.rcFile = e.rcFile ?? `.${e.name}rc`, e.extend !== !1 && (e.extend = {
		extendKey: `extends`,
		dedupe: !0,
		...e.extend
	});
	let t = e.merger || O, n = {
		config: {},
		cwd: e.cwd,
		configFile: resolve$2(e.cwd, e.configFile),
		layers: [],
		_configFile: void 0
	}, r = {
		overrides: e.overrides,
		main: void 0,
		rc: void 0,
		packageJson: void 0,
		defaultConfig: e.defaultConfig
	};
	e.dotenv && await j({
		cwd: e.cwd,
		...e.dotenv === !0 ? {} : e.dotenv
	});
	let i = e.extend && e.extend.dedupe !== !1 ? /* @__PURE__ */ new Set() : void 0, o = await L(`.`, e, {}, i);
	if (o.configFile && (r.main = o.config, n.configFile = o.configFile, n._configFile = o._configFile), o.meta && (n.meta = o.meta), e.rcFile) {
		let n = [];
		if (n.push(A({
			name: e.rcFile,
			dir: e.cwd
		})), e.globalRc) {
			let { findWorkspaceDir: t } = await import("../_3.mjs"), r = await t(e.cwd).catch(() => {});
			r && n.push(A({
				name: e.rcFile,
				dir: r
			})), n.push(ge({ name: e.rcFile })), n.push(A({
				name: e.rcFile,
				dir: homedir()
			}));
		}
		r.rc = t({}, ...n);
	}
	if (e.packageJson) {
		let n = (Array.isArray(e.packageJson) ? e.packageJson : [typeof e.packageJson == `string` ? e.packageJson : e.name]).filter((e) => e && typeof e == `string`), { readPackageJSON: i } = await import("../_3.mjs"), a = await i(e.cwd).catch(() => {});
		r.packageJson = t({}, ...n.map((e) => a?.[e]));
	}
	let s = {};
	for (let t in r) {
		let n = r[t], i = await (typeof n == `function` ? n({
			configs: s,
			rawConfigs: r
		}) : n);
		s[t] = t === `overrides` ? R(i, e) : i;
	}
	if (Array.isArray(s.main) ? n.config = s.main : (n.config = t(s.overrides, s.main, s.rc, s.packageJson, s.defaultConfig), e.extend && (await Ee(n.config, e, i), n.layers = n.config._layers, delete n.config._layers, n.config = t(n.config, ...n.layers.map((e) => e.config)))), n.layers = [...[
		s.overrides && {
			config: s.overrides,
			configFile: void 0,
			cwd: void 0
		},
		{
			config: s.main,
			configFile: e.configFile,
			cwd: e.cwd
		},
		s.rc && {
			config: s.rc,
			configFile: e.rcFile
		},
		s.packageJson && {
			config: s.packageJson,
			configFile: `package.json`
		}
	].filter((e) => e && e.config), ...n.layers], e.defaults && (n.config = t(n.config, e.defaults)), e.omit$Keys) for (let e in n.config) e.startsWith(`$`) && delete n.config[e];
	if (e.configFileRequired && !n._configFile) throw Error(`Required config (${n.configFile}) cannot be resolved.`);
	return e.schema != null && (n.config = await ke(n.config, e.schema)), n;
}
async function Ee(e, t, n) {
	if (e._layers = e._layers || [], !t.extend) return;
	let r = t.extend.extendKey;
	typeof r == `string` && (r = [r]);
	let i = [];
	for (let t of r) i.push(...(Array.isArray(e[t]) ? e[t] : [e[t]]).filter(Boolean)), delete e[t];
	for (let r of i) {
		let i = r, a = {};
		if (r.source && (a = r.options || {}, r = r.source), Array.isArray(r) && (a = r[1] || {}, r = r[0]), typeof r != `string`) {
			console.warn(`Cannot extend config from \`${JSON.stringify(i)}\` in ${t.cwd}`);
			continue;
		}
		let o = await L(r, t, a, n);
		o !== z && (o.config ? (await Ee(o.config, {
			...t,
			cwd: o.cwd
		}, n), e._layers.push(o), o.config._layers && (e._layers.push(...o.config._layers), delete o.config._layers)) : console.warn(`Cannot extend config from \`${r}\` in ${t.cwd}`));
	}
}
var De = [
	`gh:`,
	`github:`,
	`gitlab:`,
	`bitbucket:`,
	`https://`,
	`http://`
];
var Oe = /^(@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*($|\/.*)/;
async function L(i, o, c = {}, l) {
	if (o.resolve) {
		let e = await o.resolve(i, o);
		if (e) {
			let t = e._configFile || e.configFile, n = e.cwd && resolve$2(o.cwd, e.cwd);
			return V(l, t && resolve$2(n || o.cwd, t), n) ? z : e;
		}
	}
	let d = o.merger || O, f = Object.keys(c.giget?.providers || {}).map((e) => `${e}:`), p = f.length > 0 ? [.../* @__PURE__ */ new Set([...f, ...De])] : De;
	if (o.giget !== !1 && p.some((e) => i.startsWith(e))) {
		if (l?.has(`giget:${i}`)) return z;
		l?.add(`giget:${i}`);
		let { downloadTemplate: n } = await import("./giget.ts.mjs").catch((e) => {
			throw Error(`Extending config from \`${i}\` requires \`giget\` peer dependency to be installed.\n\nInstall it with: \`npx nypm i giget\``, { cause: e });
		}), { digest: s } = await import("../_6.mjs").then((e) => e.dist_exports), d = i.replace(/\W+/g, `_`).split(`_`).splice(0, 3).join(`_`) + `_` + s(i).slice(0, 10).replace(/[-_]/g, ``), f, p = resolve$2(o.cwd, `node_modules`), m = dirname$2(o.cwd);
		f = basename$2(m) === `.c12` ? join$2(m, d) : existsSync(p) ? join$2(p, `.c12`, d) : process.env.XDG_CACHE_HOME ? resolve$2(process.env.XDG_CACHE_HOME, `c12`, d) : resolve$2(homedir(), `.cache/c12`, d);
		let h = c.install ? O(c.install === !0 ? {} : c.install, { ignoreWorkspace: !0 }) : !1;
		existsSync(f) && !h && await rm(f, { recursive: !0 }), i = (await n(i, {
			dir: f,
			install: h,
			force: !!h,
			auth: c.auth,
			...o.giget,
			...c.giget
		})).dir;
	}
	Oe.test(i) && (i = H(i, o) || i);
	let m = extname$3(i), h = je(resolve$2(o.cwd, i)) ?? (!m || m === basename$2(i)), x = resolve$2(o.cwd, h ? i : dirname$2(i));
	h && (i = o.configFile);
	let S = {
		config: void 0,
		configFile: void 0,
		cwd: x,
		source: i,
		sourceOptions: c
	};
	if (S.configFile = H(resolve$2(x, i), o) || H(resolve$2(x, `.config`, i.replace(/\.config$/, ``)), o) || H(resolve$2(x, `.config`, i), o) || i, !existsSync(S.configFile)) return S;
	if (V(l, S.configFile, S.cwd)) return z;
	S._configFile = S.configFile;
	let C = extname$3(S.configFile) || ``;
	if (C in Te) S.config = (await Te[C]())(await readFile(S.configFile, `utf8`));
	else {
		let e = o.resolveModule || Ae;
		if (o.import) S.config = e(await o.import(S.configFile));
		else {
			let t = pathToFileURL(S.configFile);
			`Bun` in globalThis && delete createRequire(import.meta.url).cache[fileURLToPath(t)], t.search = `_${++we}`, S.config = await import(t.href).then(e, async (t) => {
				let { createJiti: n } = await import("./jiti.ts.mjs").catch(() => {
					throw Error(`Failed to load config file \`${S.configFile}\`: ${t?.message}.  Hint install \`jiti\` for compatibility.`, { cause: t });
				}), i = n(join$2(o.cwd || `.`, o.configFile || `/`), {
					interopDefault: !0,
					moduleCache: !1,
					extensions: [...F],
					...o.jitiOptions
				});
				return o.import = (e) => i.import(e), e(await o.import(S.configFile));
			});
		}
	}
	return typeof S.config == `function` && (S.config = await S.config(o.context)), S.config && typeof S.config == `object` && !Array.isArray(S.config) && !Object.isExtensible(S.config) && (S.config = { ...S.config }), S.configFile = P(S.configFile), S.source = P(S.source), S.config == null || (S.config = R(S.config, o), S.meta = O(S.sourceOptions.meta, S.config.$meta), delete S.config.$meta, S.sourceOptions.overrides && (S.config = d(R(S.sourceOptions.overrides, o), S.config))), S;
}
function R(e, t) {
	if (!e) return e;
	let n = [...new Set((Array.isArray(t.envName) ? t.envName : [t.envName]).filter(Boolean).reverse())].flatMap((t) => [e.$env?.[t], e[`$` + t]]).filter((e) => e && Object.keys(e).length > 0);
	return n.length === 0 ? e : (t.envMerger || t.merger || O)({}, ...n, e);
}
async function ke(e, t) {
	if (typeof t?.[`~standard`]?.validate != `function`) throw TypeError("Invalid `schema` option: expected a Standard Schema (https://standardschema.dev).");
	let n = await t[`~standard`].validate(e);
	if (n.issues) {
		let e = n.issues.map((e) => {
			let t = e.path?.map((e) => String(typeof e == `object` ? e.key : e)).join(`.`);
			return `  - ${t ? `${t}: ` : ``}${e.message}`;
		});
		throw Error(`Config validation failed (${t[`~standard`].vendor}):\n${e.join(`
`)}`, { cause: n.issues });
	}
	return n.value;
}
var z = Symbol(`duplicate`);
function B(e) {
	try {
		return P(realpathSync(e));
	} catch {
		return P(resolve$2(e));
	}
}
function V(e, t, n) {
	let r = t || n;
	if (!e || !r) return !1;
	let i = B(r);
	return e.has(i) ? !0 : (e.add(i), t && n && e.add(B(n)), !1);
}
function H(e, t) {
	let n = resolveModulePath(e, {
		try: !0,
		from: pathToFileURL(join$2(t.cwd || `.`, t.configFile || `/`)),
		suffixes: [``, `/index`],
		extensions: F,
		cache: !1
	});
	return n ? normalize$2(n) : void 0;
}
function Ae(e) {
	return e !== null && (typeof e == `object` || typeof e == `function`) && `default` in e ? e.default : e;
}
function je(e) {
	try {
		return statSync(e).isDirectory();
	} catch {
		return null;
	}
}
async function Me(e) {
	let t = await I(e), n = e.name || `config`, r = e.configFile ?? (e.name === `config` ? `config` : `${e.name}.config`), i = [...new Set([{
		cwd: t.cwd,
		source: void 0
	}, ...t.layers || []].filter((e) => e.cwd).flatMap((t) => [
		...F.flatMap((e) => [
			resolve$2(t.cwd, r + e),
			resolve$2(t.cwd, `.config`, r + e),
			resolve$2(t.cwd, `.config`, r.replace(/\.config$/, ``) + e)
		]),
		t.source && resolve$2(t.cwd, t.source),
		e.rcFile && resolve$2(t.cwd, typeof e.rcFile == `string` ? e.rcFile : `.${n}rc`),
		e.packageJson && resolve$2(t.cwd, `package.json`)
	]).filter(Boolean))], { diff: o } = await import("../_6.mjs").then((e) => e.utils_exports), s = !1, c = async (n) => {
		if (!(s || n.length === 0)) try {
			if (e.onWatch) for (let [t, r] of n) await e.onWatch({
				type: r,
				path: t
			});
			let r = t;
			try {
				t = await I(e);
			} catch (e) {
				console.warn(`Failed to load config ${n.map((e) => e[0]).join(`, `)}\n${e}`);
				return;
			}
			if (s) return;
			let i = {
				newConfig: t,
				oldConfig: r,
				getDiff: () => o(r.config, t.config)
			};
			if (e.acceptHMR && await e.acceptHMR(i)) return;
			e.onUpdate && await e.onUpdate(i);
		} catch (e) {
			console.warn(`Config watcher error\n${e}`);
		}
	}, l, u;
	if (e.debounce === !1) l = (e, t) => void c([[t, e]]);
	else {
		let t = /* @__PURE__ */ new Map(), n = C(() => {
			let e = [...t];
			return t.clear(), c(e);
		}, e.debounce ?? 100);
		u = n.cancel, l = (e, r) => {
			let i = Ne(t.get(r), e);
			i ? t.set(r, i) : t.delete(r), n();
		};
	}
	let d = Pe(i, l), f = {
		watchingFiles: i,
		unwatch: async () => {
			s = !0, u?.(), d.close();
		}
	};
	return new Proxy(f, { get(e, n) {
		return n in f ? f[n] : t[n];
	} });
}
function Ne(e, t) {
	return e === `created` ? t === `removed` ? void 0 : `created` : e === `removed` && t === `created` ? `updated` : t;
}
function Pe(n, i) {
	let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), g = !1, _ = (e, t, n) => {
		let r = e.get(t);
		r || e.set(t, r = /* @__PURE__ */ new Set()), r.add(n);
	};
	for (let r of n) a.set(r, existsSync(r)), _(o, dirname$2(r), basename$2(r));
	let v = (n) => {
		let r;
		try {
			lstatSync(n).isSymbolicLink() && (r = realpathSync(n));
		} catch {}
		let i = l.get(n);
		if (i?.target === r || (i?.watcher.close(), l.delete(n), !r || g)) return;
		let a = basename$2(r);
		try {
			let e = watch(dirname$2(r), { persistent: !0 }, (e, t) => {
				g || t && t.toString() !== a || y(n);
			});
			e.on(`error`, () => {
				e.close(), l.get(n)?.watcher === e && l.delete(n);
			}), l.set(n, {
				target: r,
				watcher: e
			});
		} catch {}
	};
	function y(e) {
		let t = a.get(e), n = existsSync(e);
		v(e), (n || t) && (a.set(e, n), i(n ? t ? `updated` : `created` : `removed`, e));
	}
	function b(e) {
		for (let t of o.get(e) || []) y(join$2(e, t));
		for (let t of s.get(e) || []) C(join$2(e, t));
	}
	function x(n) {
		c.get(n)?.watcher.close(), c.delete(n);
		for (let r of c.keys()) dirname$2(r) === n && (x(r), _(s, n, basename$2(r)));
	}
	function S(n) {
		let r = dirname$2(n);
		r !== n && (_(s, r, basename$2(n)), w(r));
	}
	function C(e) {
		if (g) return;
		let t = U(e)?.ino, n = c.get(e);
		n && n.ino === t || (n && x(e), t === void 0 ? S(e) : w(e), b(e));
	}
	function ee(e, t) {
		if (g) return;
		if (c.get(e)?.ino !== U(e)?.ino) {
			C(e);
			return;
		}
		if (!t) {
			b(e);
			return;
		}
		let n = join$2(e, t);
		a.has(n) && y(n), (c.has(n) || s.get(e)?.has(t)) && C(n);
	}
	function w(n) {
		if (g || c.has(n)) return;
		let r, i;
		try {
			i = statSync(n).ino, r = watch(n, { persistent: !0 }, (e, t) => ee(n, t?.toString() || null));
		} catch (e) {
			let t = e?.code;
			t === `ENOENT` || t === `ENOTDIR` ? S(n) : console.warn(`Failed to watch ${n}\n${e}`);
			return;
		}
		s.get(dirname$2(n))?.delete(basename$2(n)), r.on(`error`, (e) => {
			if (c.get(n)?.watcher !== r) return;
			x(n);
			let t = (f.get(n) || 0) + 1;
			f.set(n, t), t > 3 && existsSync(n) ? console.warn(`Failed to watch ${n}\n${e}`) : (existsSync(n) ? w(n) : S(n), b(n));
		}), c.set(n, {
			watcher: r,
			ino: i
		});
	}
	for (let e of n) v(e);
	for (let e of o.keys()) w(e);
	return { close: () => {
		g = !0;
		for (let { watcher: e } of c.values()) e.close();
		for (let { watcher: e } of l.values()) e.close();
		c.clear(), l.clear();
	} };
}
function U(e) {
	try {
		let t = statSync(e);
		return t.isDirectory() ? t : void 0;
	} catch {
		return;
	}
}
var W = Object.defineProperty;
var G = (e, t) => {
	let n = {};
	for (var r in e) W(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || W(n, Symbol.toStringTag, { value: `Module` }), n;
};
function Fe(e) {
	return typeof e == `string` ? `'${e}'` : new Ie().serialize(e);
}
var K = (function() {
	let e = /* @__PURE__ */ new Uint8Array(128);
	for (let t = 0; t < 69; t++) e[` _-,;:!?.'"()[]{}@*/\\&#%\`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz`.charCodeAt(t)] = t + 1;
	for (let t = 65; t <= 90; t++) e[t] = e[t + 32];
	return e;
})();
function q(e, t) {
	if (e === t) return 0;
	let n = Math.min(e.length, t.length), r = 0;
	for (let i = 0; i < n; i++) {
		let n = e.charCodeAt(i), a = t.charCodeAt(i);
		if (n === a) continue;
		let o = n < 128 && K[n] ? K[n] : n + 128, s = a < 128 && K[a] ? K[a] : a + 128;
		if (o !== s) return o < s ? -1 : 1;
		r === 0 && (r = n > a ? -1 : 1);
	}
	return e.length === t.length ? r : e.length < t.length ? -1 : 1;
}
var Ie = (function() {
	class e {
		#e = /* @__PURE__ */ new Map();
		compare(e, t) {
			let n = typeof e, r = typeof t;
			return n === `string` && r === `string` ? q(e, t) : n === `number` && r === `number` ? e - t : q(this.serialize(e, !0), this.serialize(t, !0));
		}
		serialize(e, t) {
			if (e === null) return `null`;
			switch (typeof e) {
				case `string`: return t ? e : `'${e}'`;
				case `bigint`: return `${e}n`;
				case `object`: return this.$object(e);
				case `function`: return this.$function(e);
			}
			return String(e);
		}
		serializeObject(e) {
			let t = Object.prototype.toString.call(e);
			if (t !== `[object Object]`) return this.serializeBuiltInType(t.length < 10 ? `unknown:${t}` : t.slice(8, -1), e);
			let n = e.constructor, r = n === Object || n === void 0 ? `` : n.name;
			if (r !== `` && globalThis[r] === n) return this.serializeBuiltInType(r, e);
			if (`toJSON` in e && typeof e.toJSON == `function`) {
				let t = e.toJSON();
				return r + (typeof t == `object` && t ? this.$object(t) : `(${this.serialize(t)})`);
			}
			let i = Object.keys(e).sort(q), a = `${r}{`;
			for (let t = 0; t < i.length; t++) {
				let n = i[t];
				a += `${n}:${this.serialize(e[n])}`, t < i.length - 1 && (a += `,`);
			}
			return a + `}`;
		}
		serializeBuiltInType(e, t) {
			let n = this[`$` + e];
			if (n) return n.call(this, t);
			if (typeof t.entries == `function`) return this.serializeObjectEntries(e, t.entries());
			throw Error(`Cannot serialize ${e}`);
		}
		serializeObjectEntries(e, t) {
			let n = Array.from(t).sort((e, t) => this.compare(e[0], t[0])), r = `${e}{`;
			for (let e = 0; e < n.length; e++) {
				let [t, i] = n[e];
				r += `${this.serialize(t, !0)}:${this.serialize(i)}`, e < n.length - 1 && (r += `,`);
			}
			return r + `}`;
		}
		$object(e) {
			let t = this.#e.get(e);
			return t === void 0 && (this.#e.set(e, `#${this.#e.size}`), t = this.serializeObject(e), this.#e.set(e, t)), t;
		}
		$function(e) {
			let t = Function.prototype.toString.call(e);
			return t.slice(-15) === `[native code] }` ? `${e.name || ``}()[native]` : `${e.name}(${e.length})${t.replace(/\s*\n\s*/g, ``)}`;
		}
		$Array(e) {
			let t = `[`;
			for (let n = 0; n < e.length; n++) t += this.serialize(e[n]), n < e.length - 1 && (t += `,`);
			return t + `]`;
		}
		$Date(e) {
			try {
				return `Date(${e.toISOString()})`;
			} catch {
				return `Date(null)`;
			}
		}
		$ArrayBuffer(e) {
			return `ArrayBuffer[${new Uint8Array(e).join(`,`)}]`;
		}
		$Set(e) {
			return `Set${this.$Array(Array.from(e).sort((e, t) => this.compare(e, t)))}`;
		}
		$Map(e) {
			return this.serializeObjectEntries(`Map`, e.entries());
		}
	}
	for (let t of [
		`Error`,
		`RegExp`,
		`URL`
	]) e.prototype[`$` + t] = function(e) {
		return `${t}(${e})`;
	};
	for (let t of [
		`Int8Array`,
		`Uint8Array`,
		`Uint8ClampedArray`,
		`Int16Array`,
		`Uint16Array`,
		`Int32Array`,
		`Uint32Array`,
		`Float32Array`,
		`Float64Array`
	]) e.prototype[`$` + t] = function(e) {
		return `${t}[${e.join(`,`)}]`;
	};
	for (let t of [`BigInt64Array`, `BigUint64Array`]) e.prototype[`$` + t] = function(e) {
		return `${t}[${e.join(`n,`)}${e.length > 0 ? `n` : ``}]`;
	};
	return e;
})();
var Le = globalThis.process?.getBuiltinModule?.(`crypto`)?.hash;
var Re = `sha256`;
var J = `base64url`;
function ze(e) {
	if (Le) return Le(Re, e, J);
	let t = createHash(Re).update(e);
	return globalThis.process?.versions?.webcontainer ? t.digest().toString(J) : t.digest(J);
}
var Be = G({ digest: () => ze });
var Ve = G({ diff: () => He });
var Y = `__proto__`;
function He(e, t) {
	let n = [];
	return X(e, t, ``, n), n;
}
function X(e, t, n, r) {
	if (e === t) return;
	let i = typeof e != `object` || !e, a = typeof t != `object` || !t;
	if (!i && !a) {
		let i = Ue(e), a = Ue(t);
		for (let [e, t] of i) {
			let i = n ? `${n}.${e}` : e;
			a.has(e) ? X(t, a.get(e), i, r) : r.push(new Q(i, `removed`, void 0, Z(t, i)));
		}
		for (let [e, t] of a) {
			if (i.has(e)) continue;
			let a = n ? `${n}.${e}` : e;
			r.push(new Q(a, `added`, Z(t, a)));
		}
		return;
	}
	if (We(e, i) || We(t, a)) return;
	let o = Ge(e, n, i), s = Ge(t, n, a);
	o.hash !== s.hash && r.push(new Q(n, `changed`, s, o));
}
function Ue(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n in e) n !== Y && t.set(n, e[n]);
	return t;
}
function We(e, t) {
	if (t) return !1;
	for (let t in e) if (t !== Y) return !0;
	return !1;
}
function Ge(e, t, n) {
	return n ? new $(t, e, Ke(e)) : new $(t, e, `{}`, Object.create(null));
}
function Z(e, t = ``) {
	if (typeof e != `object` || !e) return new $(t, e, Ke(e));
	let n = Object.create(null), r = [];
	for (let i in e) {
		if (i === Y) continue;
		let a = Z(e[i], t ? `${t}.${i}` : i);
		n[i] = a, r.push(a.hash);
	}
	return new $(t, e, `{${r.join(`:`)}}`, n);
}
function Ke(e) {
	switch (typeof e) {
		case `string`: return `'${e}'`;
		case `number`:
		case `boolean`: return `` + e;
		case `bigint`: return `${e}n`;
		default: return Fe(e);
	}
}
var Q = class {
	key;
	type;
	newValue;
	oldValue;
	constructor(e, t, n, r) {
		this.key = e, this.type = t, this.newValue = n, this.oldValue = r;
	}
	toString() {
		return this.toJSON();
	}
	toJSON() {
		switch (this.type) {
			case `added`: return `Added   \`${this.key}\``;
			case `removed`: return `Removed \`${this.key}\``;
			case `changed`: return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || `-`}\` to \`${this.newValue?.toString()}\``;
		}
	}
};
var $ = class {
	key;
	value;
	hash;
	props;
	constructor(e, t, n, r) {
		this.key = e, this.value = t, this.hash = n, this.props = r;
	}
	toString() {
		return this.props ? `{${Object.keys(this.props).join(`,`)}}` : JSON.stringify(this.value);
	}
	toJSON() {
		let e = this.key || `.`;
		return this.props ? `${e}({${Object.keys(this.props).join(`,`)}})` : `${e}(${this.value})`;
	}
};
export { Be, I, M, Me, O, Ve, le };
