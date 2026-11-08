import { NODE_MODULES_RE, U as U$1, baseBuildConfig, baseBuildPlugins, basename$2, builtins, compressPublicAssets, createWatcher, dirname$2, escapeRegExp$1, excludeSourcemapSources, extname$3, flatPlugins, getChunkName, importDep, isAbsolute$2, join$2, libChunkName, normalize$2, pathRegExp, relative$2, require_picomatch, resolve$2, resolveModulePath, runtimeDir, withBuildPlugins, writeBuildInfo } from "./common.mjs";
import { __toESM } from "../_common.mjs";
import { O as O$1 } from "./c12_rc9_defu_destr.mjs";
import { r } from "./compatx.mjs";
import { generateFSTree, scanHandlers } from "./nitro2.mjs";
import { t } from "./perfect-debounce.mjs";
import { builtinModules } from "node:module";
import { existsSync, mkdirSync, promises, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, dirname, join, normalize } from "node:path";
import { createHash } from "node:crypto";
// node_modules/nitro/dist/_libs/unwasm.mjs
var c = [
	`Func`,
	`Table`,
	`Memory`,
	`Global`,
	`Tag`
];
var l = {
	127: `i32`,
	126: `i64`,
	125: `f32`,
	124: `f64`,
	123: `v128`,
	112: `funcref`,
	111: `externref`
};
var u = /* @__PURE__ */ new Set([99, 100]);
var d = new TextDecoder(`utf-8`, {
	fatal: !0,
	ignoreBOM: !0
});
var f = class {
	bytes;
	pos = 0;
	constructor(e, t = 0) {
		this.bytes = e, this.pos = t;
	}
	get eof() {
		return this.pos >= this.bytes.length;
	}
	u8() {
		if (this.pos >= this.bytes.length) throw Error(`unexpected end of binary`);
		return this.bytes[this.pos++];
	}
	varuint() {
		let e = 0, t = 0, n;
		do {
			if (t > 28) throw Error(`varuint32 is too large`);
			n = this.u8(), e += (n & 127) * 2 ** t, t += 7;
		} while (n & 128);
		if (e > 4294967295) throw Error(`varuint32 is too large`);
		return e;
	}
	name() {
		let e = this.varuint(), t = this.pos + e;
		if (t > this.bytes.length) throw Error(`unexpected end of binary`);
		let n = d.decode(this.bytes.subarray(this.pos, t));
		return this.pos = t, n;
	}
	valtype() {
		let e = this.u8();
		if (u.has(e)) throw Error(`unsupported typed reference (0x${e.toString(16)})`);
		return l[e] || `unknown(0x${e.toString(16)})`;
	}
	valtypes() {
		let e = this.varuint(), t = [];
		for (let n = 0; n < e; n++) t.push(this.valtype());
		return t;
	}
	limits() {
		let e = this.u8();
		this.varuint(), e & 1 && this.varuint();
	}
	assertWithin(e) {
		if (this.pos > e) throw Error(`section contents overrun the section length`);
	}
};
function p(e) {
	let t = [];
	for (; !e.eof;) {
		let n = e.u8(), r = e.varuint(), i = e.pos, a = i + r;
		if (a > e.bytes.length) throw Error(`section ${n} exceeds the end of the binary`);
		let o = {
			id: n,
			start: i,
			end: a
		};
		if (n === 0) try {
			let t = e.name();
			e.pos <= a && (o.name = t, o.start = e.pos);
		} catch {}
		t.push(o), e.pos = a;
	}
	return t;
}
function m(e, t) {
	let n = [];
	try {
		let r = e.varuint();
		for (let i = 0; i < r && !(e.pos >= t || e.u8() !== 96); i++) {
			let r = {
				params: e.valtypes(),
				results: e.valtypes()
			};
			e.assertWithin(t), n.push(r);
		}
	} catch {}
	return n;
}
function h(e, t, n) {
	let r = [], i = e.varuint();
	for (let a = 0; a < i; a++) {
		let i = e.name(), a = e.name(), o = e.u8(), s = c[o];
		if (!s) throw Error(`unsupported import kind: ${o}`);
		let l = {
			module: i,
			name: a,
			type: s
		};
		switch (o) {
			case 0: {
				let t = n[e.varuint()];
				l.returnType = t?.results[0], l.params = t?.params.map((e) => ({ type: e }));
				break;
			}
			case 1:
				e.valtype(), e.limits();
				break;
			case 2:
				e.limits();
				break;
			case 3:
				e.valtype(), e.u8();
				break;
			case 4:
				e.u8(), e.varuint();
				break;
			default: throw Error(`unsupported import kind: ${o}`);
		}
		e.assertWithin(t), r.push(l);
	}
	return r;
}
function g(e, t) {
	let n = [], r = e.varuint();
	for (let i = 0; i < r; i++) {
		let r = e.name(), i = e.u8(), a = e.varuint(), o = c[i];
		if (!o) throw Error(`unsupported export kind: ${i}`);
		e.assertWithin(t), n.push({
			name: r,
			id: a,
			index: a,
			type: o
		});
	}
	return n;
}
function _(e, t) {
	let n = /* @__PURE__ */ new Map();
	try {
		for (; e.pos < t;) {
			let r = e.u8(), i = e.varuint(), a = e.pos + i;
			if (a > t) throw Error(`name subsection overruns the name section`);
			if (r === 1) {
				let t = e.varuint();
				for (let r = 0; r < t; r++) {
					let t = e.varuint(), r = e.name();
					e.assertWithin(a), n.set(t, r);
				}
			}
			e.pos = a;
		}
	} catch {}
	return n;
}
function v(e) {
	return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function y(e, t = {}) {
	try {
		return b(v(e));
	} catch (e) {
		throw Error(`[unwasm] Failed to parse ${t.name || `wasm module`}: ${e}`, { cause: e });
	}
}
function b(e) {
	if (e.length < 8 || e[0] !== 0 || e[1] !== 97 || e[2] !== 115 || e[3] !== 109) throw Error("invalid magic header (expected `\\0asm`)");
	if (e[4] !== 1 || e[5] !== 0 || e[6] !== 0 || e[7] !== 0) {
		let t = [...e.subarray(4, 8)].map((e) => e.toString(16).padStart(2, `0`)).join(` `);
		throw Error(`unsupported binary version (0x${t})`);
	}
	let t = p(new f(e, 8)), n = (t) => new f(e, t.start), r = (e, n) => t.find((t) => t.id === e && (n === void 0 || t.name === n)), i = r(1), a = i ? m(n(i), i.end) : [], o = r(2), s = o ? h(n(o), o.end, a) : [], c = r(7), l = c ? g(n(c), c.end) : [], u = r(0, `name`);
	if (u && l.length > 0) {
		let e = _(n(u), u.end);
		for (let t of l) t.type === `Func` && (t.id = e.get(t.index) ?? t.id);
	}
	return { modules: [{
		imports: s,
		exports: l.map(({ name: e, id: t, type: n }) => ({
			name: e,
			id: t,
			type: n
		}))
	}] };
}
var x = `\0unwasm:external:`;
var S = `\0unwasm:helpers`;
function C(e) {
	return createHash(`sha1`).update(e).digest(`hex`).slice(0, 16);
}
function w(e) {
	return e.replace(/[-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);
}
function T(t, n) {
	let r = Object.keys(t.imports || {});
	if (r.length === 0) return {
		code: `const _imports = { /* no imports */ }`,
		resolved: !0
	};
	let i = O(t.id), a = [], o = {};
	for (let n of r) {
		let r = t.imports[n], s = i.imports?.[n] || i.imports?.[`#${n}`], c = s && typeof s == `string` ? s : resolveModulePath(n, { from: t.id }), l = `_imports_` + E(n);
		a.push(`import * as ${l} from ${JSON.stringify(c)};`), o[n] = Object.fromEntries(r.map((e) => [e, `${l}[${JSON.stringify(e)}]`]));
	}
	return {
		code: `${a.join(`
`)}\n\nconst _imports = ${D(o)}`,
		resolved: !0
	};
}
function E(e) {
	return e.replace(/^\d/, (e) => `_${e}`).replace(/\W/g, (e) => `_` + e.codePointAt(0));
}
function D(e, t = ``) {
	let n = Object.entries(e);
	if (n.length === 0) return `{}`;
	let r = t + `  `;
	return `{\n${n.map(([e, t]) => `${r}${JSON.stringify(e)}: ${typeof t == `string` ? t : D(t, r)}`).join(`,
`)}\n${t}}`;
}
function O(e) {
	let t = dirname(e), i = ``;
	for (; t !== i;) {
		let e;
		try {
			e = readFileSync(join(t, `package.json`), `utf8`);
		} catch {}
		if (e !== void 0) return JSON.parse(e);
		i = t, t = dirname(t);
	}
	return {};
}
function k(e, t) {
	let n = T(e, t), r = t.esmImport ? j(e, n.code) : M(e, n.code);
	return t.lazy !== !0 && n.resolved ? N(e, r) : P(e, r);
}
function A(e, t) {
	return t.esmImport ? `
const _mod = ${t.lazy === !0 ? `` : `await`} import("${x}${e.name}").then(r => r.default || r);
export default _mod;
  ` : `
import { base64ToUint8Array } from "${S}";
const _data = base64ToUint8Array("${e.source.toString(`base64`)}");
const _mod = new WebAssembly.Module(_data);
export default _mod;
  `;
}
function j(e, t) {
	return `
${t}

async function _instantiate(imports = _imports) {
const _mod = await import("${x}${e.name}").then(r => r.default || r);
return WebAssembly.instantiate(_mod, imports)
}
  `;
}
function M(e, t) {
	return `
import { base64ToUint8Array } from "${S}";

${t}

function _instantiate(imports = _imports) {
  const _data = base64ToUint8Array("${e.source.toString(`base64`)}")
  return WebAssembly.instantiate(_data, imports)  }
  `;
}
function N(e, t) {
	return `
import { getExports } from "${S}";

${t}

const $exports = getExports(await _instantiate());

${e.exports.map((e) => `export const ${e} = $exports.${e};`).join(`
`)}

const defaultExport = () => $exports;
${e.exports.map((e) => `defaultExport["${e}"] = $exports.${e};`).join(`
`)}
export default defaultExport;
      `;
}
function P(e, t) {
	return `
import { createLazyWasmModule } from "${S}";

${t}

const _mod = createLazyWasmModule(_instantiate);

${e.exports.map((e) => `export const ${e} = _mod.${e};`).join(`
`)}

export default _mod;
      `;
}
function F() {
	return `
export function debug(...args) {
  console.log('[unwasm] [debug]', ...args);
}

export function getExports(input) {
  return input?.instance?.exports || input?.exports || input;
}

export function base64ToUint8Array(str) {
  if (typeof Uint8Array.fromBase64 === "function") {
    return Uint8Array.fromBase64(str);
  }
  const data = atob(str);
  const size = data.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = data.charCodeAt(i);
  }
  return bytes;
}

export function createLazyWasmModule(_instantiator) {
  const _exports = Object.create(null);
  let _loaded;
  let _promise;

  const init = (imports) => {
    if (_loaded) {
      return Promise.resolve(exportsProxy);
    }
    if (_promise) {
      return _promise;
    }
    return _promise = _instantiator(imports)
      .then(r => {
        Object.assign(_exports, getExports(r));
        _loaded = true;
        _promise = undefined;
        return exportsProxy;
      })
      .catch(error => {
        _promise = undefined;
        console.error('[wasm] [error]', error);
        throw error;
      });
  }

  const exportsProxy = new Proxy(_exports, {
    get(_, prop) {
      if (_loaded) {
        return _exports[prop];
      }
      return (...args) => {
        return _loaded
          ? _exports[prop]?.(...args)
          : init().then(() => _exports[prop]?.(...args));
      };
    },
  });


  const lazyProxy = new Proxy(() => {}, {
    get(_, prop) {
      return exportsProxy[prop];
    },
    apply(_, __, args) {
      return init(args[0])
    },
  });

  return lazyProxy;
}
  `;
}
var I = /\.wasm(?:\?.*)?$/i;
var L = `unwasm-external:`;
var R = /unwasm-external:([^"']+)/gu;
var z = `unwasm`;
var B = `.unwasm.mjs`;
var V = join(import.meta.dirname, `rspack-loader.cjs`);
var H = /!/;
var U = /\.[cm]?js(\?|$)/;
function W(e = {}) {
	return new G(e);
}
var G = class {
	opts;
	name = z;
	constructor(e = {}) {
		this.opts = e;
	}
	apply(e) {
		let { rspackVersion: o } = e.rspack;
		if (Number.parseInt(o, 10) < 2) throw Error(`[unwasm] The rspack plugin requires rspack >= 2 (found ${o}).`);
		let s = this.opts, { experiments: c, ExternalsPlugin: l, sources: u } = e.rspack, d = Object.create(null), f = join(e.context, `.unwasm-helpers.mjs`), p = new c.VirtualModulesPlugin({ [f]: F() });
		p.apply(e), e.options.module.rules.unshift({
			test: RegExp(w(B) + `$`),
			type: `javascript/auto`,
			use: [{ loader: V }]
		}), s.esmImport && new l(`module-import`, [RegExp(`^` + w(L))]).apply(e);
		let m = (e) => e.replaceAll(S, f.replaceAll(`\\`, `/`)).replaceAll(x, L), h = /* @__PURE__ */ new Map(), g = [];
		async function _(e, i, o, c) {
			c ??= await promises.readFile(e);
			let l = `wasm/${basename(e, `.wasm`)}-${C(c)}.wasm`, u = i, f = {
				imports: {},
				exports: [`default`]
			};
			if (!u) try {
				f = d[l] ||= J(c, l);
			} catch (t) {
				o(`Failed to parse the WebAssembly module "${e}"; falling back to module mode: ${t.message}`), u = !0;
			}
			let g = {
				name: l,
				id: e,
				source: c,
				...f
			}, _;
			if (u) _ = A(g, s);
			else try {
				_ = k(g, s);
			} catch (t) {
				o(`Failed to load the WebAssembly module "${e}"; falling back to module mode: ${t.message}`), _ = A(g, s);
			}
			let v = m(_), y = join(dirname(e), `${basename(e)}${i ? `.module` : ``}${B}`);
			return p.writeModule(y, v), h.set(y, {
				resolved: e,
				isModuleRequest: i,
				asset: g
			}), y;
		}
		e.hooks.watchRun.tapPromise(z, async () => {
			await Promise.all([...h.values()].map(async (e) => {
				let t = await promises.readFile(e.resolved).catch(() => void 0);
				t && !t.equals(e.asset.source) && await _(e.resolved, e.isModuleRequest, (e) => g.push(e), t);
			}));
		}), e.hooks.compilation.tap(z, (t, { normalModuleFactory: n }) => {
			let r = n.getResolver(`normal`, { dependencyType: `esm` });
			for (let e of h.values()) t.fileDependencies.add(e.resolved);
			t.hooks.finishModules.tap(z, () => {
				t.fileDependencies.delete(f);
				for (let e of h.keys()) t.fileDependencies.delete(e);
			}), n.hooks.beforeResolve.tapPromise(z, async (e) => {
				let n = e.request;
				if (n.startsWith(L) || H.test(n) || !I.test(n)) return;
				let [a, o = ``] = K(n), c;
				try {
					c = r.resolveSync({}, e.context, a);
				} catch {
					return;
				}
				if (!c || !existsSync(c)) return;
				t.fileDependencies.add(c);
				let l = o.split(`&`).includes(`module`);
				e.request = await _(c, l, (e) => q(t, s, e));
			}), t.hooks.processAssets.tap({
				name: z,
				stage: e.rspack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
			}, () => {
				for (let e of g.splice(0)) q(t, s, e);
				if (t.errors.length === 0) {
					let e = /* @__PURE__ */ new Set();
					for (let n of t.modules) {
						let t = n.resource;
						t && h.has(t) && e.add(t);
					}
					for (let t of h.keys()) e.has(t) || h.delete(t);
				}
				if (!s.esmImport) return;
				let e = new Map([...h.values()].map((e) => [e.asset.name, e.asset])), n = /* @__PURE__ */ new Set();
				for (let [r, i] of Object.entries(t.assets)) {
					if (!U.test(r)) continue;
					let a = i.source().toString();
					if (!a.includes(L)) continue;
					let o = r.split(`/`).filter(Boolean).length - 1, c = o > 0 ? `../`.repeat(o) : `./`, l = new u.ReplaceSource(i), d = !1;
					for (let r of a.matchAll(R)) {
						let i = r[1];
						e.has(i) ? (n.add(i), l.replace(r.index, r.index + r[0].length - 1, c + i), d = !0) : q(t, s, `Failed to resolve WASM import: ${JSON.stringify(i)}`);
					}
					d && t.updateAsset(r, l);
				}
				for (let r of n) t.emitAsset(r, new u.RawSource(e.get(r).source));
			});
		});
	}
};
function K(e) {
	let t = e.indexOf(`?`);
	return t === -1 ? [e] : [e.slice(0, t), e.slice(t + 1)];
}
function q(e, t, n) {
	t.silent || e.warnings.push(Error(`[unwasm] ${n}`));
}
function J(e, t) {
	let n = Object.create(null), r = [], i = y(e, { name: t });
	for (let e of i.modules) {
		r.push(...e.exports.map((e) => e.name));
		for (let t of e.imports) (n[t.module] ||= []).push(t.name);
	}
	return {
		imports: n,
		exports: r
	};
}
// node_modules/nitro/dist/_build/shared.mjs
var import_picomatch = /* @__PURE__ */ __toESM(require_picomatch(), 1);
var HOOK_ORDER = {
	pre: 0,
	post: 2
};
var SUPPORTED_HOOKS = /* @__PURE__ */ new Set([
	"buildStart",
	"resolveId",
	"load",
	"transform",
	"buildEnd",
	"renderChunk",
	"generateBundle",
	"writeBundle",
	"closeBundle"
]);
function sortedHooks(plugins, name) {
	const hooks = [];
	for (const plugin of plugins) {
		const hook = plugin[name];
		if (!hook) continue;
		const handler = typeof hook === "function" ? hook : hook.handler;
		hooks.push({
			plugin,
			handler,
			filter: hook.filter,
			order: HOOK_ORDER[hook.order] ?? 1
		});
	}
	return hooks.sort((a, b) => a.order - b.order);
}
function unsupportedHooks(plugin) {
	return Object.entries(plugin).filter(([key, value]) => isHook(value) && isUnsupportedHook(key)).map(([key]) => key);
}
function isHook(value) {
	return typeof value === "function" || !!value && typeof value === "object" && typeof value.handler === "function";
}
function isUnsupportedHook(key) {
	return !SUPPORTED_HOOKS.has(key) && !/^(options|outputOptions|watchChange|closeWatcher|onLog|api)$/.test(key);
}
function matchFilter(filter, value, code) {
	if (!filter) return true;
	if (!code) value = value.replace(/\\/g, "/");
	if (typeof filter === "string" || filter instanceof RegExp || Array.isArray(filter)) return matchPattern(filter, value, code);
	const { include, exclude } = filter;
	if (exclude && matchPattern(exclude, value, code)) return false;
	return include ? matchPattern(include, value, code) : true;
}
function matchPattern(pattern, value, code) {
	if (Array.isArray(pattern)) return pattern.some((p) => matchPattern(p, value, code));
	if (pattern instanceof RegExp) {
		pattern.lastIndex = 0;
		return pattern.test(value);
	}
	return code ? value.includes(pattern) : globMatcher(pattern)(value);
}
var globMatchers = /* @__PURE__ */ new Map();
function globMatcher(glob) {
	let matcher = globMatchers.get(glob);
	if (!matcher) {
		const pattern = glob.startsWith("**") || isAbsolute$2(glob) ? glob : resolve$2(glob);
		matcher = (0, import_picomatch.default)(pattern.replace(/\\/g, "/"), { dot: true });
		globMatchers.set(glob, matcher);
	}
	return matcher;
}
function createPluginContext(host, plugin, opts = {}) {
	const logger = host.nitro.logger;
	const format = (log) => `[${plugin.name}] ${typeof log === "string" ? log : log.message}`;
	return {
		meta: {
			rollupVersion: "4.0.0",
			watchMode: host.nitro.options.dev
		},
		resolve: (source, importer, resolveOpts) => host.resolveId(source, importer, {
			skip: resolveOpts?.skipSelf === false ? opts.skip : new Set(opts.skip).add(plugin),
			isEntry: resolveOpts?.isEntry,
			kind: resolveOpts?.kind || opts.kind,
			fallback: true
		}).then((resolved) => resolved || null),
		load: async ({ id }) => {
			const loaded = await host.load(id, opts);
			return {
				id,
				code: loaded ? await host.transform(loaded.code, id, opts) : null
			};
		},
		addWatchFile: (file) => opts.addWatchFile?.(file),
		getModuleIds: () => host.opts.getModuleIds(),
		getModuleInfo: (id) => host.opts.getModuleInfo(id),
		emitFile: (file) => {
			try {
				return host.files.emit(file, opts.emitAsset || host.opts.emitAsset);
			} catch (error) {
				throw new Error(format(error.message));
			}
		},
		getFileName: (referenceId) => host.files.getFileName(referenceId),
		warn: (log) => logger.warn(format(log)),
		info: (log) => logger.info(format(log)),
		debug: (log) => logger.debug(format(log)),
		error: (error) => {
			throw typeof error === "string" ? new Error(format(error)) : error;
		}
	};
}
var EmittedFiles = class {
	fileNames = /* @__PURE__ */ new Map();
	emit(file, emitAsset) {
		if (file.type !== "asset") throw new Error(`\`this.emitFile\` only supports \`type: "asset"\` with the \`rspack\` builder (got \`${file.type}\`).`);
		if (file.source == null) throw new Error("`this.emitFile` requires a `source` with the `rspack` builder (`this.setAssetSource` is not supported).");
		const fileName = file.fileName || assetFileName(file, file.source);
		const referenceId = hash(fileName);
		this.fileNames.set(referenceId, fileName);
		emitAsset(fileName, file.source);
		return referenceId;
	}
	getFileName(referenceId) {
		const fileName = this.fileNames.get(referenceId);
		if (!fileName) throw new Error(`Unknown file reference id \`${referenceId}\`.`);
		return fileName;
	}
};
function assetFileName(file, source) {
	const name = basename$2(file.name || file.originalFileName || "asset");
	const ext = extname$3(name);
	return `_assets/${name.slice(0, name.length - ext.length)}-${hash(source)}${ext}`;
}
function hash(data) {
	return createHash("sha256").update(data).digest("hex").slice(0, 8);
}
function chainSourceMaps(sources, opts) {
	let map = opts.map ? parseMap(opts.map, opts.name) : void 0;
	for (const step of opts.steps) {
		if (!step.map) continue;
		const parsed = parseMap(step.map, opts.name);
		const count = Math.max(parsed.sources.length, 1);
		const stepMap = {
			...parsed,
			sources: Array.from({ length: count }, () => opts.name),
			sourcesContent: Array.from({ length: count }, () => step.input)
		};
		map = (map ? new sources.SourceMapSource(step.output, opts.name, stepMap, step.input, map, true).map() : void 0) || stepMap;
	}
	return map;
}
function hookResultCode(code, result, maps) {
	const output = typeof result === "string" ? result : result?.code;
	if (output == null) return code;
	if (maps && output !== code && typeof result === "object" && result?.map) maps.push({
		input: code,
		output,
		map: result.map
	});
	return output;
}
function moduleFilenameTemplate(opts) {
	const cache = /* @__PURE__ */ new Map();
	return ({ absoluteResourcePath: path }) => {
		let source = cache.get(path);
		if (source === void 0) {
			source = sourcePath(path, opts);
			cache.set(path, source);
		}
		return source;
	};
}
var SourcemapPathTransformPlugin = class {
	transform;
	constructor(transform) {
		this.transform = transform;
	}
	apply(compiler) {
		const { Compilation, sources } = compiler.rspack;
		compiler.hooks.thisCompilation.tap("nitro:sourcemap-path-transform", (compilation) => {
			compilation.hooks.processAssets.tap({
				name: "nitro:sourcemap-path-transform",
				stage: Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING + 1
			}, (assets) => {
				for (const name of Object.keys(assets).filter((name) => name.endsWith(".map"))) {
					const mapPath = join$2(compilation.outputOptions.path, name);
					const map = JSON.parse(assets[name].source().toString());
					map.sources = map.sources.map((source) => this.transform(isAbsolute$2(source) ? relative$2(dirname$2(mapPath), source) : source, mapPath));
					compilation.updateAsset(name, new sources.RawSource(JSON.stringify(map)));
				}
			});
		});
	}
};
function parseMap(map, file) {
	const parsed = typeof map === "string" ? JSON.parse(map) : map;
	return {
		version: 3,
		file,
		sources: parsed.sources || [],
		names: parsed.names || [],
		mappings: parsed.mappings,
		...parsed.sourcesContent && { sourcesContent: parsed.sourcesContent }
	};
}
function sourcePath(path, opts) {
	if (opts.virtual.isVirtual(path)) {
		const id = opts.virtual.toId(path);
		return id.startsWith("virtual:") ? id : `virtual:${id}`;
	}
	if (!isAbsolute$2(path)) return `virtual:${path.replace(/^webpack\//, "rspack/")}`;
	return existsSync(path) ? path : `virtual:${relative$2(opts.rootDir, path)}`;
}
var PluginHost = class {
	plugins;
	nitro;
	opts;
	hooks;
	files = new EmittedFiles();
	resolveIdHooks = /* @__PURE__ */ new Map();
	constructor(nitro, plugins, opts) {
		this.nitro = nitro;
		this.plugins = plugins;
		this.opts = opts;
		this.hooks = Object.fromEntries([...SUPPORTED_HOOKS].map((name) => [name, sortedHooks(plugins, name)]));
		for (const plugin of plugins) {
			const unsupported = unsupportedHooks(plugin);
			if (unsupported.length > 0) nitro.logger.warn(`Build plugin \`${plugin.name}\` uses hooks the \`rspack\` builder does not support (ignored): ${unsupported.map((h) => `\`${h}\``).join(", ")}.`);
		}
	}
	async buildStart() {
		for (const hook of this.hooks.buildStart) await hook.handler.call(this.context(hook.plugin), {});
	}
	async buildEnd(error) {
		for (const hook of this.hooks.buildEnd) await hook.handler.call(this.context(hook.plugin), error);
	}
	async bundleHook(name, outputOpts, bundle) {
		const args = name === "generateBundle" ? [bundle, true] : [bundle];
		for (const hook of this.hooks[name]) await hook.handler.call(this.context(hook.plugin), {
			format: "es",
			...outputOpts
		}, ...args);
	}
	async closeBundle() {
		for (const hook of this.hooks.closeBundle) await hook.handler.call(this.context(hook.plugin));
	}
	mayResolveId(source) {
		return this.matchingResolveIdHooks(source).length > 0;
	}
	async resolveId(source, importer, opts = {}) {
		for (const hook of this.matchingResolveIdHooks(source)) {
			if (opts.skip?.has(hook.plugin)) continue;
			const result = await hook.handler.call(this.context(hook.plugin, {
				skip: opts.skip,
				kind: opts.kind
			}), source, importer, {
				isEntry: !!opts.isEntry,
				kind: opts.kind || "import-statement",
				attributes: {},
				custom: {}
			});
			if (result === false) return {
				id: source,
				external: true
			};
			if (typeof result === "string") return {
				id: result,
				external: false
			};
			if (result?.id) return {
				id: result.id,
				external: !!result.external
			};
		}
		if (opts.fallback) {
			const resolved = await this.opts.resolve(source, importer, opts.kind);
			return resolved ? {
				id: resolved,
				external: false
			} : void 0;
		}
	}
	async load(id, ctxOpts) {
		for (const hook of this.hooks.load) {
			if (!matchFilter(hook.filter?.id, id)) continue;
			const result = await hook.handler.call(this.context(hook.plugin, ctxOpts), id);
			if (typeof result === "string") return { code: result };
			if (result?.code != null) return {
				code: result.code,
				map: result.map
			};
		}
	}
	async transform(code, id, ctxOpts, maps) {
		for (const hook of this.hooks.transform) {
			if (!matchFilter(hook.filter?.id, id) || !matchFilter(hook.filter?.code, code, true)) continue;
			const result = await hook.handler.call(this.context(hook.plugin, ctxOpts), code, id);
			code = hookResultCode(code, result, maps);
		}
		return code;
	}
	async renderChunk(code, chunk, outputOpts, maps) {
		for (const hook of this.hooks.renderChunk) {
			const result = await hook.handler.call(this.context(hook.plugin), code, chunk, {
				format: "es",
				...outputOpts
			}, {});
			code = hookResultCode(code, result, maps);
		}
		return code;
	}
	matchingResolveIdHooks(source) {
		let hooks = this.resolveIdHooks.get(source);
		if (!hooks) {
			hooks = this.hooks.resolveId.filter((hook) => matchFilter(hook.filter?.id, source));
			this.resolveIdHooks.set(source, hooks);
		}
		return hooks;
	}
	context(plugin, opts = {}) {
		return createPluginContext(this, plugin, opts);
	}
};
var VirtualPlaceholders = class {
	dir;
	ids = /* @__PURE__ */ new Map();
	requests = /* @__PURE__ */ new Map();
	constructor(dir) {
		this.dir = dir;
	}
	toRequest(id) {
		let request = this.requests.get(id);
		if (!request) {
			request = this.createRequest(id);
			this.requests.set(id, request);
		}
		return request;
	}
	clearRequests() {
		this.requests.clear();
	}
	toId(resource) {
		return this.lookup(resource) ?? resource;
	}
	isVirtual(resource) {
		return this.lookup(resource) !== void 0;
	}
	createRequest(id) {
		const path = id.split("?")[0];
		if (isAbsolute$2(path) && existsSync(path)) return id;
		const name = id.replace(/[^\w.-]+/g, "_").slice(-50);
		const hash = createHash("sha256").update(id).digest("hex").slice(0, 8);
		const ext = /\.(?:[cm]?tsx?|jsx)$/.exec(path)?.[0] || ".mjs";
		const placeholder = join$2(this.dir, `${hash}-${name}${ext}`);
		if (!this.ids.has(placeholder)) {
			this.ids.set(placeholder, id);
			mkdirSync(this.dir, { recursive: true });
			writeFileSync(placeholder, "");
		}
		return placeholder;
	}
	lookup(resource) {
		return this.ids.get(resource) ?? (resource.includes("\\") ? this.ids.get(normalize$2(resource)) : void 0);
	}
};
function moduleId(module, toId) {
	const resource = module?.resource;
	return resource ? toId(resource) : void 0;
}
function chunkModules(compilation, chunk) {
	return compilation.chunkGraph.getChunkModules(chunk).flatMap(innerModules);
}
function chunkModuleIds(compilation, chunk, toId) {
	const group = [...chunk.groupsIterable][0];
	const order = (module) => group?.getModulePostOrderIndex(module) ?? -1;
	return chunkModules(compilation, chunk).map((module) => ({
		id: moduleId(module, toId),
		index: order(module)
	})).filter((entry) => !!entry.id).sort((a, b) => a.index - b.index).map((entry) => entry.id);
}
function compilationModuleIds(compilation, toId) {
	return indexModules(compilation, toId).keys();
}
function getModuleInfo(compilation, id, toId) {
	const module = findModule(compilation, id, toId);
	if (!module) return null;
	const { moduleGraph } = compilation;
	const info = {
		id,
		isEntry: false,
		isExternal: false,
		importers: [],
		importedIds: [],
		dynamicImporters: [],
		dynamicallyImportedIds: [],
		meta: {}
	};
	for (const connection of moduleGraph.getIncomingConnections(module)) {
		const importer = moduleId(connection.originModule, toId) ?? moduleId(moduleGraph.getParentModule(connection.dependency), toId);
		if (!connection.originModule) info.isEntry ||= connection.dependency.type === "entry";
		else if (importer) addUnique(isDynamic(connection) ? info.dynamicImporters : info.importers, importer);
	}
	for (const connection of moduleGraph.getOutgoingConnections(module)) {
		const imported = moduleId(connection.module, toId);
		if (imported) addUnique(isDynamic(connection) ? info.dynamicallyImportedIds : info.importedIds, imported);
	}
	return info;
}
var moduleIndexes = /* @__PURE__ */ new WeakMap();
function indexModules(compilation, toId) {
	let index = moduleIndexes.get(compilation);
	if (index?.size === compilation.modules.size) return index.modules;
	index = {
		size: compilation.modules.size,
		modules: /* @__PURE__ */ new Map()
	};
	for (const module of [...compilation.modules].flatMap(innerModules)) {
		const id = moduleId(module, toId);
		if (id && !index.modules.has(id)) index.modules.set(id, module);
	}
	moduleIndexes.set(compilation, index);
	return index.modules;
}
function findModule(compilation, id, toId) {
	return moduleIndexes.get(compilation)?.modules.get(id) ?? indexModules(compilation, toId).get(id);
}
function innerModules(module) {
	return module.modules || [module];
}
function isDynamic(connection) {
	return connection.dependency.type === "import()";
}
function addUnique(list, value) {
	if (!list.includes(value)) list.push(value);
}
var changedEntries = /* @__PURE__ */ new WeakSet();
function createBundle(compilation, toId) {
	const chunks = /* @__PURE__ */ new Map();
	for (const chunk of compilation.chunks) for (const file of chunk.files) chunks.set(file, chunk);
	const bundle = {};
	for (const asset of compilation.getAssets()) {
		const fileName = asset.name;
		const chunk = /\.m?js$/.test(fileName) ? chunks.get(fileName) : void 0;
		if (!chunk) {
			bundle[fileName] = lazy({
				type: "asset",
				fileName,
				name: void 0,
				names: [],
				originalFileName: null,
				originalFileNames: [],
				needsCodeReference: false
			}, "source", () => assetSource(asset), true);
			continue;
		}
		const entry = {
			type: "chunk",
			fileName,
			preliminaryFileName: fileName,
			sourcemapFileName: asset.info.related?.sourceMap ?? null,
			name: chunk.name || "",
			map: null,
			isEntry: chunk.hasRuntime(),
			isDynamicEntry: !chunk.canBeInitial(),
			isImplicitEntry: false,
			facadeModuleId: null,
			modules: {},
			exports: [],
			imports: [],
			dynamicImports: [],
			implicitlyLoadedBefore: [],
			importedBindings: {},
			referencedFiles: []
		};
		lazy(entry, "code", () => assetSource(asset).toString(), true);
		bundle[fileName] = lazy(entry, "moduleIds", () => chunkModuleIds(compilation, chunk, toId));
	}
	return bundle;
}
function applyBundle(compilation, bundle, original) {
	for (const fileName of Object.keys(original)) if (!bundle[fileName]) compilation.deleteAsset(fileName);
	for (const [fileName, entry] of Object.entries(bundle)) if (entry !== original[fileName] || changedEntries.has(entry)) writeAsset(compilation, fileName, entry.type === "chunk" ? entry.code : entry.source);
}
function writeAsset(compilation, fileName, source) {
	const { RawSource } = compilation.compiler.rspack.sources;
	const rawSource = new RawSource(typeof source === "string" || Buffer.isBuffer(source) ? source : Buffer.from(source));
	if (compilation.getAsset(fileName)) compilation.updateAsset(fileName, rawSource);
	else compilation.emitAsset(fileName, rawSource);
}
function assetSource(asset) {
	return asset.source.source();
}
function lazy(entry, key, get, content) {
	let value;
	let loaded = false;
	Object.defineProperty(entry, key, {
		enumerable: true,
		configurable: true,
		get: () => {
			if (!loaded) {
				value = get();
				loaded = true;
			}
			return value;
		},
		set: (newValue) => {
			value = newValue;
			loaded = true;
			if (content) changedEntries.add(entry);
		}
	});
	return entry;
}
function outputOptions(compilation) {
	return {
		dir: compilation.outputOptions.path,
		sourcemap: !!compilation.options.devtool
	};
}
async function renderChunks(host, compilation) {
	const sources = compilation.compiler.rspack.sources;
	const outputOpts = outputOptions(compilation);
	for (const chunk of compilation.chunks) for (const fileName of chunk.files) {
		if (!/\.m?js$/.test(fileName)) continue;
		const source = compilation.getAsset(fileName)?.source;
		if (!source) continue;
		const code = source.source().toString();
		const chunkInfo = {
			fileName,
			name: chunk.name || "",
			isEntry: chunk.hasRuntime()
		};
		const maps = outputOpts.sourcemap ? [] : void 0;
		const rendered = await host.renderChunk(code, chunkInfo, outputOpts, maps);
		if (rendered === code) continue;
		const map = maps && source.map();
		const renderedMap = maps && map ? chainSourceMaps(sources, {
			name: fileName,
			map,
			steps: maps
		}) : void 0;
		compilation.updateAsset(fileName, renderedMap ? new sources.SourceMapSource(rendered, fileName, renderedMap) : new sources.RawSource(rendered));
	}
}
async function generateBundle(host, compilation, toId) {
	const bundle = createBundle(compilation, toId);
	const original = { ...bundle };
	await host.bundleHook("generateBundle", outputOptions(compilation), bundle);
	applyBundle(compilation, bundle, original);
}
async function writeBundle(host, compilation, toId) {
	if (host.hooks.writeBundle.length === 0) return;
	const bundle = createBundle(compilation, toId);
	await host.bundleHook("writeBundle", outputOptions(compilation), bundle);
}
var NOT_RESOLVED = Promise.resolve(void 0);
var RESOLVER_OPTIONS = {
	esm: { dependencyType: "esm" },
	commonjs: { dependencyType: "commonjs" }
};
var BARE_IMPORT_RE = /^(?![./#\0]|[a-z]:[\\/]|[a-z][\w+.-]*:)/i;
var ModuleResolver = class {
	opts;
	staticExternals;
	runtimeBuiltins;
	resolveCache = /* @__PURE__ */ new Map();
	unresolvedCache = /* @__PURE__ */ new Map();
	constructor(opts) {
		this.opts = opts;
		this.staticExternals = opts.externals || /* @__PURE__ */ new Map();
		this.runtimeBuiltins = new Set(opts.runtimeBuiltins);
	}
	clear() {
		this.resolveCache.clear();
		this.unresolvedCache.clear();
	}
	async externals(data) {
		const { request, dependencyType, contextInfo, context } = data;
		if (!request || request.includes("!")) return;
		const kind = dependencyType === "commonjs" ? "require-call" : "import-statement";
		let id = this.staticExternals.get(request);
		if (id) id = isBareBuiltin(id) ? `node:${id}` : id;
		else if (this.opts.isExternal && await this.opts.isExternal(request, this.importer(contextInfo?.issuer))) id = request;
		else {
			const resolved = await this.resolve(request, contextInfo?.issuer, kind);
			id = resolved ? resolved.external ? resolved.id : void 0 : await this.unresolvedExternal(request, {
				context,
				issuer: contextInfo?.issuer
			});
		}
		if (id && kind === "require-call") {
			if (this.opts.host.nitro.options.node) return `node-commonjs ${id.startsWith("file:") ? fileURLToPath(id) : id}`;
			if (id.startsWith("node:")) return this.runtimeBuiltins.has(id) ? [id, "default"] : `commonjs ${id}`;
		}
		return id;
	}
	unresolvedExternal(request, opts) {
		if (!BARE_IMPORT_RE.test(request)) return NOT_RESOLVED;
		const dir = opts.context || this.resolveDir(this.importer(opts.issuer));
		const key = `${dir}\0${request}`;
		let result = this.unresolvedCache.get(key);
		if (!result) {
			result = this.resolveInDir(dir, request, "require-call").then(async (resolved) => {
				if (resolved || await this.resolveInDir(dir, request)) return;
				const importer = this.importer(opts.issuer);
				this.opts.host.nitro.logger.warn(`Could not resolve \`${request}\`${importer ? ` (imported by \`${importer}\`)` : ""}, treating it as external.`);
				return request;
			});
			this.unresolvedCache.set(key, result);
		}
		return result;
	}
	resolve(request, issuer, kind) {
		if (!this.opts.host.mayResolveId(request)) return NOT_RESOLVED;
		const key = `${issuer || ""}\0${request}\0${kind || "import-statement"}`;
		let resolved = this.resolveCache.get(key);
		if (!resolved) {
			resolved = this.opts.host.resolveId(request, this.importer(issuer), {
				isEntry: !issuer,
				kind
			});
			this.resolveCache.set(key, resolved);
		}
		return resolved;
	}
	resolveWithRspack(source, importer, kind) {
		return this.resolveInDir(this.resolveDir(importer), source, kind);
	}
	resolveInDir(dir, source, kind) {
		const compiler = this.opts.compiler();
		if (!compiler) return NOT_RESOLVED;
		const resolver = compiler.resolverFactory.get("normal", kind === "require-call" ? RESOLVER_OPTIONS.commonjs : RESOLVER_OPTIONS.esm);
		return new Promise((resolve) => {
			resolver.resolve({}, dir, source, {}, (error, result) => {
				resolve(error || !result ? void 0 : normalize(result));
			});
		});
	}
	importer(issuer) {
		return issuer ? this.opts.virtual.toId(issuer) : void 0;
	}
	resolveDir(importer) {
		const path = importer?.split("?")[0];
		return path && isAbsolute$2(path) ? dirname$2(path) : this.opts.host.nitro.options.rootDir;
	}
};
function isBareBuiltin(id) {
	return !id.startsWith("node:") && builtinModules.includes(id);
}
var NAME = "nitro:rollup-plugins";
var LOADER_PATH = join$2(runtimeDir, "internal/rspack/loader.mjs");
var RollupPluginsHost = class {
	host;
	virtual;
	resolver;
	toId = (resource) => this.virtual.toId(resource);
	compiler;
	compilation;
	pendingAssets = /* @__PURE__ */ new Map();
	assetsCompilation;
	assetsWritten = false;
	constructor(nitro, plugins, opts = {}) {
		this.virtual = new VirtualPlaceholders(join$2(nitro.options.buildDir, "rspack/virtual"));
		this.host = new PluginHost(nitro, plugins, {
			resolve: (source, importer, kind) => this.resolver.resolveWithRspack(source, importer, kind),
			getModuleIds: () => this.compilation ? compilationModuleIds(this.compilation, this.toId) : [],
			getModuleInfo: (id) => this.compilation ? getModuleInfo(this.compilation, id, this.toId) : null,
			emitAsset: (fileName, source) => this.emitAsset(fileName, source)
		});
		this.resolver = new ModuleResolver({
			host: this.host,
			virtual: this.virtual,
			compiler: () => this.compiler,
			...opts
		});
	}
	apply(compiler) {
		this.compiler = compiler;
		compiler.hooks.beforeCompile.tapPromise(NAME, () => {
			this.assetsCompilation = void 0;
			this.pendingAssets.clear();
			this.assetsWritten = false;
			return this.host.buildStart();
		});
		compiler.hooks.done.tapPromise(NAME, () => this.host.closeBundle());
		compiler.hooks.afterEmit.tapPromise(NAME, async (compilation) => {
			this.assetsWritten = true;
			await writeBundle(this.host, compilation, this.toId);
		});
		const { Compilation } = compiler.rspack;
		compiler.hooks.thisCompilation.tap(NAME, (compilation) => {
			this.compilation = compilation;
			this.resolver.clear();
			this.virtual.clearRequests();
			compilation.hooks.finishModules.tapPromise(NAME, () => this.host.buildEnd());
			compilation.hooks.processAssets.tap({
				name: NAME,
				stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
			}, () => {
				this.assetsCompilation = compilation;
				for (const [fileName, source] of this.pendingAssets) writeAsset(compilation, fileName, source);
				this.pendingAssets.clear();
			});
			if (this.host.hooks.renderChunk.length > 0) compilation.hooks.processAssets.tapPromise({
				name: NAME,
				stage: Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING - 1
			}, () => renderChunks(this.host, compilation));
			if (this.host.hooks.generateBundle.length > 0) compilation.hooks.processAssets.tapPromise({
				name: NAME,
				stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
			}, () => generateBundle(this.host, compilation, this.toId));
		});
		compiler.hooks.normalModuleFactory.tap(NAME, (nmf) => {
			nmf.hooks.beforeResolve.tapPromise(NAME, async (data) => {
				if (data.request.includes("!") || this.resolver.staticExternals.has(data.request)) return;
				const issuer = data.contextInfo.issuer;
				const resolved = await this.resolver.resolve(data.request, issuer);
				if (!resolved) {
					if (issuer && this.virtual.isVirtual(issuer)) data.context = this.host.nitro.options.rootDir;
					return;
				}
				if (!resolved.external) data.request = this.virtual.toRequest(resolved.id);
			});
		});
	}
	externals(data) {
		return this.resolver.externals(data);
	}
	async runLoader(loader, code, inputMap) {
		const id = this.toId(loader.resource);
		const ctxOpts = {
			addWatchFile: (file) => loader.addDependency(file),
			emitAsset: (fileName, source) => loader.emitFile(fileName, typeof source === "string" ? source : Buffer.from(source))
		};
		const loaded = await this.host.load(id, ctxOpts);
		if (loaded == null && id !== loader.resource) throw new Error(`Could not load virtual module \`${id}\`.`);
		const maps = loader.sourceMap ? [] : void 0;
		const transformed = await this.host.transform(loaded?.code ?? code, id, ctxOpts, maps);
		const map = loaded ? loaded.map : inputMap;
		if (!maps?.length) return {
			code: transformed,
			map: maps && map
		};
		const sources = loader._compiler.rspack.sources;
		return {
			code: transformed,
			map: chainSourceMaps(sources, {
				name: loader.resourcePath,
				map,
				steps: maps
			})
		};
	}
	emitAsset(fileName, source) {
		if (this.assetsWritten) throw new Error("Cannot emit files once the bundle is written.");
		if (this.assetsCompilation) writeAsset(this.assetsCompilation, fileName, source);
		else this.pendingAssets.set(fileName, source);
	}
};
function loaderRule(opts) {
	const use = {
		loader: opts.loader,
		options: { host: opts.host }
	};
	const fallback = {
		test: opts.test,
		enforce: "pre",
		use: [use]
	};
	if (U$1) return fallback;
	const idIncludes = [];
	const codeIncludes = [];
	for (const hook of opts.hooks.load) {
		const ids = nativePatterns(hook.filter?.id);
		if (!ids) return fallback;
		idIncludes.push(...ids);
	}
	for (const hook of opts.hooks.transform) {
		const code = nativePatterns(hook.filter?.code, true);
		if (code) {
			codeIncludes.push(...code);
			continue;
		}
		const ids = nativePatterns(hook.filter?.id);
		if (!ids) return fallback;
		idIncludes.push(...ids);
	}
	const codeFilter = unionRegExp(codeIncludes);
	if (codeIncludes.length > 0 && !codeFilter) return fallback;
	const rules = [{
		include: [new RegExp(`^${escapeRegExp$1(opts.virtualDir).replace(/\//g, String.raw`[\\/]`)}[\\\\/]`), ...new Set(idIncludes)],
		use: [use]
	}, {
		resourceQuery: /./,
		use: [use]
	}];
	if (codeFilter) rules.push({ use: [{
		...use,
		codeFilter
	}] });
	return {
		test: opts.test,
		oneOf: rules.map((rule) => ({
			...rule,
			enforce: "pre"
		}))
	};
}
function nativePatterns(filter, code) {
	if (!filter) return;
	if (typeof filter === "string" || filter instanceof RegExp || Array.isArray(filter)) {
		const patterns = Array.isArray(filter) ? filter : [filter];
		const res = [];
		for (const p of patterns) if (p instanceof RegExp) res.push(p);
		else if (code) res.push(new RegExp(escapeRegExp$1(p)));
		else return;
		return res;
	}
	return nativePatterns(filter.include, code);
}
function unionRegExp(patterns) {
	if (patterns.length === 0) return;
	for (const p of patterns) if (/[^gyd]/.test(p.flags) || /\\[1-9]|\\k<|\(\?<(?![=!])/.test(p.source)) return;
	return new RegExp(patterns.map((p) => `(?:${p.source})`).join("|"));
}
var BANNER_KEYS = [
	"intro",
	"banner",
	"outro",
	"footer"
];
var OUTPUT_KEYS = /* @__PURE__ */ new Set([
	...BANNER_KEYS,
	"entryFileNames",
	"chunkFileNames",
	"inlineDynamicImports",
	"sourcemapExcludeSources",
	"sourcemapPathTransform",
	"format",
	"exports",
	"generatedCode",
	"hoistTransitiveImports"
]);
var CONFIG_KEYS = /* @__PURE__ */ new Set([
	"output",
	"plugins",
	"external",
	"platform"
]);
function rollupOptions(nitro, rspack) {
	const configs = [nitro.options.rolldownConfig, nitro.options.rollupConfig].filter(Boolean);
	const outputs = configs.map((config) => Array.isArray(config.output) ? config.output[0] || {} : config.output || {});
	const output = (key) => outputs.map((o) => o[key]).find((v) => v !== void 0);
	const unsupported = /* @__PURE__ */ new Set();
	for (const [index, config] of configs.entries()) {
		for (const key of Object.keys(config)) if (!CONFIG_KEYS.has(key) && config[key] !== void 0) unsupported.add(key);
		for (const key of Object.keys(outputs[index])) if (!OUTPUT_KEYS.has(key) && outputs[index][key] !== void 0) unsupported.add(`output.${key}`);
	}
	const fileName = (key) => {
		const value = output(key);
		const filename = typeof value === "string" ? toRspackFilename(value) : void 0;
		if (value !== void 0 && !filename) unsupported.add(`output.${key}`);
		return filename;
	};
	const entryFileName = fileName("entryFileNames");
	const chunkFileName = fileName("chunkFileNames");
	const format = output("format");
	if (format !== void 0 && ![
		"es",
		"esm",
		"module"
	].includes(format)) unsupported.add("output.format");
	if (unsupported.size > 0) nitro.logger.warn(`The \`rspack\` builder ignores these \`rollupConfig\` / \`rolldownConfig\` options: ${[...unsupported].map((key) => `\`${key}\``).join(", ")}. Use \`rspackConfig\` instead.`);
	const plugins = [];
	for (const key of BANNER_KEYS) {
		const value = output(key);
		if (value && (typeof value === "string" || typeof value === "function")) plugins.push(bannerPlugin(rspack, key, value));
	}
	const pathTransform = output("sourcemapPathTransform");
	if (typeof pathTransform === "function") plugins.push(new SourcemapPathTransformPlugin(pathTransform));
	const externals = configs.map((config) => config.external).filter(Boolean);
	return {
		entryFileName,
		chunkFileName,
		inlineDynamicImports: output("inlineDynamicImports"),
		sourcemapExcludeSources: output("sourcemapExcludeSources"),
		plugins,
		isExternal: externals.length > 0 ? matchExternal(externals) : void 0
	};
}
function toRspackFilename(pattern) {
	const filename = pattern.replace(/\[hash(?::(\d+))?\]/g, (_, length) => `[contenthash:${length || 8}]`).replace(/\[format\]/g, "es");
	return /\[(?!name\]|contenthash:\d+\])[^\]]*\]/.test(filename) ? void 0 : filename;
}
function bannerPlugin(rspack, key, value) {
	const banner = typeof value === "function" ? ({ chunk, filename }) => {
		const result = value({
			type: "chunk",
			fileName: filename,
			name: chunk.name || "",
			isEntry: chunk.hasRuntime()
		});
		if (typeof result?.then === "function") throw new TypeError(`Async \`output.${key}\` functions are not supported by the \`rspack\` builder.`);
		return String(result ?? "");
	} : String(value);
	return new rspack.BannerPlugin({
		banner,
		raw: true,
		footer: key === "outro" || key === "footer",
		test: /\.m?js$/,
		stage: rspack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE + 1
	});
}
function matchExternal(options) {
	return async (source, importer) => {
		for (const option of options) {
			if (typeof option === "function") {
				if (await option(source, importer, false)) return true;
				continue;
			}
			if ((Array.isArray(option) ? option : [option]).some((p) => typeof p === "string" ? p === source : testRegExp(p, source))) return true;
		}
		return false;
	};
}
function testRegExp(re, value) {
	re.lastIndex = 0;
	return re.test(value);
}
var FALLBACK = "_chunks/[id].mjs";
var WASM_BINDING_RE = /\.wasm(?:\.module)?\.unwasm\.mjs$/;
var WASM_HELPERS_RE = /[/\\]\.unwasm-helpers\.mjs$/;
var ChunkNames = class {
	nitro;
	toId;
	reserved;
	compilation;
	names;
	constructor(nitro, opts) {
		this.nitro = nitro;
		this.toId = opts.toId;
		this.reserved = opts.reserved || [];
	}
	apply(compiler) {
		compiler.hooks.thisCompilation.tap("nitro:chunk-names", (compilation) => {
			this.compilation = compilation;
			this.names = void 0;
		});
	}
	filename = (pathData) => {
		const id = pathData.chunk?.id;
		const compilation = this.compilation;
		if (id == null || !compilation) return FALLBACK;
		this.names ??= this.chunkFileNames(compilation);
		return this.names.get(id) ?? FALLBACK;
	};
	splitChunks(filename = this.filename) {
		return { cacheGroups: {
			default: false,
			defaultVendors: false,
			libs: {
				chunks: "all",
				test: NODE_MODULES_RE,
				name: (module) => libChunkName(module.nameForCondition() || ""),
				filename,
				enforce: true,
				reuseExistingChunk: true
			}
		} };
	}
	chunkFileNames(compilation) {
		const used = new Set(this.reserved.map((name) => name.toLowerCase()));
		const names = /* @__PURE__ */ new Map();
		const chunks = [...compilation.chunks].filter((chunk) => chunk.id != null && !isEntryChunk(compilation, chunk)).sort((a, b) => compareIds(String(a.id), String(b.id)));
		for (const chunk of chunks) {
			const moduleIds = chunkModuleIds(compilation, chunk, this.toId).map(chunkModuleId);
			const name = chunk.name || nameFromId(moduleIds.at(-1)) || String(chunk.id);
			const fileName = getChunkName({
				name,
				moduleIds
			}, this.nitro).replaceAll("[name]", name);
			names.set(chunk.id, uniqueName(fileName, used));
		}
		return names;
	}
};
function isEntryChunk(compilation, chunk) {
	return compilation.chunkGraph.getNumberOfEntryModules(chunk) > 0;
}
function chunkModuleId(id) {
	return WASM_HELPERS_RE.test(id) ? "\0unwasm:helpers" : id.replace(WASM_BINDING_RE, ".wasm");
}
function nameFromId(id) {
	return (id?.split("?")[0].split(/[/\\]/).pop()?.replace(/\.(?:[cm]?[jt]sx?|wasm)$/, ""))?.replace(/[^\w.-]+/g, "_") || void 0;
}
function uniqueName(fileName, used) {
	let name = fileName;
	for (let i = 2; used.has(name.toLowerCase()); i++) name = fileName.replace(/(\.mjs)?$/, `${i}$1`);
	used.add(name.toLowerCase());
	return name;
}
function compareIds(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
async function getRspackConfig(nitro, rspack) {
	const base = await baseBuildConfig(nitro);
	const tsc = nitro.options.typescript.tsConfig?.compilerOptions;
	const plugins = (await baseBuildPlugins(nitro, base)).filter((plugin) => !/^(nitro:sourcemap|nitro:server-main|unwasm)/.test(plugin.name));
	const rollup = rollupOptions(nitro, rspack);
	const rollupConfigs = [nitro.options.rolldownConfig, nitro.options.rollupConfig];
	const rollupConfigPlugins = await flatPlugins(rollupConfigs.flatMap((config) => config?.plugins || []));
	const externals = new Map(base.env.external.map((id) => [id, id]));
	for (const id of builtins) if (!base.env.alias[id] || base.env.alias[id] === id) externals.set(id, id);
	for (const [id, to] of Object.entries(base.env.alias)) if (to !== id && to.startsWith("node:")) externals.set(id, to);
	const pluginsHost = new RollupPluginsHost(nitro, [...rollupConfigPlugins, ...await withBuildPlugins(nitro, plugins)], {
		externals,
		runtimeBuiltins: base.env.external.filter((id) => id.startsWith("node:")),
		isExternal: rollup.isExternal
	});
	const entryFileName = rollup.entryFileName || "index.mjs";
	const chunkNames = new ChunkNames(nitro, {
		toId: pluginsHost.toId,
		reserved: [entryFileName]
	});
	const chunkFilename = rollup.chunkFileName || chunkNames.filename;
	const asyncChunks = !(nitro.options.inlineDynamicImports || rollup.inlineDynamicImports);
	const swcRule = {
		test: /\.(?:[cm]?tsx?|jsx)$/,
		loader: "builtin:swc-loader",
		options: {
			detectSyntax: "auto",
			jsc: { transform: { react: {
				runtime: tsc?.jsx === "react" ? "classic" : "automatic",
				pragma: tsc?.jsxFactory,
				pragmaFrag: tsc?.jsxFragmentFactory,
				importSource: tsc?.jsxImportSource,
				development: nitro.options.dev
			} } }
		}
	};
	const config = {
		mode: nitro.options.dev ? "development" : "production",
		context: nitro.options.rootDir,
		target: nitro.options.node ? "node22" : "es2022",
		entry: { index: nitro.options.entry },
		devtool: nitro.options.sourcemap ? rollup.sourcemapExcludeSources ?? excludeSourcemapSources(nitro) ? "nosources-source-map" : "source-map" : false,
		infrastructureLogging: { level: "warn" },
		node: nitro.options.node ? void 0 : false,
		externalsType: "module-import",
		externals: [(data) => pluginsHost.externals(data)],
		resolve: {
			alias: base.aliases,
			extensions: base.extensions,
			byDependency: {
				esm: { conditionNames: [...nitro.options.exportConditions, "import"] },
				commonjs: { conditionNames: [...nitro.options.exportConditions, "require"] }
			}
		},
		module: {
			parser: { javascript: {
				importMeta: false,
				url: !!nitro.options.node,
				worker: false
			} },
			rules: [
				{
					test: /\.[cm]?[jt]sx?$/,
					resolve: { fullySpecified: false }
				},
				loaderRule({
					test: /\.[cm]?[jt]sx?$/,
					loader: LOADER_PATH,
					host: pluginsHost,
					virtualDir: pluginsHost.virtual.dir,
					hooks: pluginsHost.host.hooks
				}),
				swcRule
			]
		},
		plugins: [
			pluginsHost,
			chunkNames,
			new rspack.BannerPlugin({
				banner: "globalThis.__nitro_main__ = import.meta.url;",
				raw: true,
				entryOnly: true,
				test: /\.m?js$/
			}),
			nitro.options.wasm !== false && W(nitro.options.wasm || {}),
			Object.keys(base.env.inject).length > 0 && new rspack.ProvidePlugin(base.env.inject),
			...rollup.plugins
		],
		optimization: {
			minimize: !!nitro.options.minify,
			nodeEnv: false,
			splitChunks: asyncChunks && chunkNames.splitChunks(chunkFilename)
		},
		output: {
			path: nitro.options.output.serverDir,
			module: true,
			filename: entryFileName,
			chunkFilename,
			assetModuleFilename: "_assets/[name]-[hash][ext]",
			publicPath: "auto",
			library: { type: "module" },
			asyncChunks,
			devtoolModuleFilenameTemplate: moduleFilenameTemplate({
				rootDir: nitro.options.rootDir,
				virtual: pluginsHost.virtual
			})
		}
	};
	const userConfig = nitro.options.rspackConfig;
	const merged = O$1(userConfig, config);
	if (userConfig?.externals !== void 0 && !Array.isArray(userConfig.externals)) merged.externals = [userConfig.externals, ...config.externals];
	return merged;
}
async function watchDev(nitro, config, rspack) {
	let watching;
	let closed = false;
	const pluginsHost = config.plugins?.find((plugin) => plugin instanceof RollupPluginsHost);
	const devWatch = createDevWatch(nitro, {
		pluginsHost,
		invalidate: () => watching?.invalidate()
	});
	nitro.hooks.hook("close", async () => {
		closed = true;
		const current = watching;
		watching = void 0;
		devWatch.close();
		if (current) {
			await new Promise((resolve) => current.close(() => resolve()));
			await new Promise((resolve) => current.compiler.close(() => resolve()));
		}
	});
	nitro.logger.info(`Starting dev watcher (builder: \`rspack\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
	await devWatch.scan();
	if (closed) return;
	const compiler = rspack.rspack(config);
	devWatch.attach(compiler);
	watching = compiler.watch({ ignored: devWatch.ignored }, () => {});
}
function createDevWatch(nitro, opts) {
	const { pluginsHost } = opts;
	let stale = false;
	let force = false;
	let handlers;
	async function scan() {
		await scanHandlers(nitro);
		nitro.routing.sync();
		const scanned = JSON.stringify(nitro.scannedHandlers);
		const changed = scanned !== handlers;
		handlers = scanned;
		return changed;
	}
	const reload = t(async () => {
		if (await scan() || force) {
			force = false;
			stale = true;
			opts.invalidate();
		}
	});
	const handlerDirs = nitro.options.scanDirs.flatMap((dir) => [
		join$2(dir, nitro.options.apiDir || "api"),
		join$2(dir, nitro.options.routesDir || "routes"),
		join$2(dir, "middleware")
	]);
	const otherDirs = nitro.options.scanDirs.flatMap((dir) => [join$2(dir, "plugins"), join$2(dir, "modules")]);
	const watchReloadEvents = /* @__PURE__ */ new Set([
		"add",
		"addDir",
		"unlink",
		"unlinkDir"
	]);
	const scanDirsWatcher = createWatcher(nitro, [...handlerDirs, ...otherDirs], { ignoreInitial: true }).on("all", (event, path) => {
		if (watchReloadEvents.has(event)) {
			const file = normalize$2(path);
			force ||= otherDirs.some((dir) => file === dir || file.startsWith(`${dir}/`));
			reload();
		}
	});
	const serverEntryRe = /^server\.[mc]?[jt]sx?$/;
	const rootDirWatcher = createWatcher(nitro, nitro.options.rootDir, {
		ignoreInitial: true,
		depth: 0
	}).on("all", (event, path) => {
		if (watchReloadEvents.has(event) && serverEntryRe.test(basename$2(path))) {
			force = true;
			reload();
		}
	});
	nitro.hooks.hook("build:reload", () => {
		force = true;
		return reload();
	});
	async function invalidateVirtual(compiler, { force } = {}) {
		stale ||= !!force;
		if (!stale && compiler.removedFiles?.size) stale = await scan();
		if (!stale) return;
		stale = false;
		const virtualFiles = [...pluginsHost?.virtual.ids.keys() || []].flatMap((file) => U$1 ? [file, file.replace(/\//g, "\\")] : [file]);
		compiler.modifiedFiles = /* @__PURE__ */ new Set([...compiler.modifiedFiles || [], ...virtualFiles]);
	}
	const ignored = watchIgnored(nitro, pluginsHost);
	function attach(compiler) {
		let start;
		let inputChanged = true;
		let reloaded = false;
		compiler.hooks.watchRun.tapPromise("nitro:dev", async (compiler) => {
			start = Date.now();
			await invalidateVirtual(compiler);
			inputChanged = !reloaded || !!compiler.modifiedFiles?.size || [...compiler.removedFiles || []].some((file) => !existsSync(file));
			if (inputChanged) nitro.hooks.callHook("dev:start");
		});
		compiler.hooks.done.tap("nitro:dev", (stats) => {
			if (stats.hasErrors()) {
				reloaded = false;
				const buildError = new Error(stats.toString("errors-only"));
				nitro.logger.error(buildError);
				nitro.hooks.callHook("dev:error", buildError);
				return;
			}
			const outputChanged = (opts.outputChanged || hasEmittedAssets)(stats);
			if (!inputChanged && !outputChanged) return;
			reloaded = true;
			if (stats.hasWarnings()) nitro.logger.warn(stats.toString("errors-warnings"));
			nitro.hooks.callHook("compiled", nitro);
			if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built`, start ? `in ${Date.now() - start}ms` : "");
			nitro.hooks.callHook("dev:reload");
		});
		compiler.hooks.failed.tap("nitro:dev", (error) => {
			reloaded = false;
			nitro.logger.error(error);
			nitro.hooks.callHook("dev:error", error);
		});
	}
	return {
		scan,
		ignored,
		attach,
		invalidateVirtual,
		rebuild: () => {
			stale = true;
			opts.invalidate();
		},
		close: () => {
			scanDirsWatcher.close();
			rootDirWatcher.close();
		}
	};
}
function hasEmittedAssets(stats) {
	return !!stats.toJson({
		all: false,
		assets: true
	}).assets?.some((asset) => asset.emitted);
}
function watchIgnored(nitro, pluginsHost) {
	const ignoredDirs = [nitro.options.output.dir, pluginsHost?.virtual.dir].filter((dir) => dir !== void 0).map((dir) => pathRegExp(dir.replace(/[/\\]+$/, "")));
	return new RegExp(String.raw`[/\\]node_modules[/\\]|^(?:${ignoredDirs.join("|")})(?:[/\\]|$)`);
}
async function buildProduction(nitro, config, rspack) {
	const buildStartTime = Date.now();
	await beforeServerBuild(nitro);
	let stats;
	if (!nitro.options.static) {
		const compiler = rspack.rspack(config);
		stats = await new Promise((resolve, reject) => compiler.run((error, stats) => error ? reject(error) : resolve(stats))).finally(() => new Promise((resolve) => compiler.close(resolve)));
		if (stats?.hasErrors()) throw new Error(`Rspack build failed:\n${stats.toString("errors-only")}`);
	}
	await afterServerBuild(nitro, {
		stats,
		startTime: buildStartTime
	});
}
async function beforeServerBuild(nitro) {
	await scanHandlers(nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	if (!nitro.options.static) nitro.logger.info(`Building server (builder: \`rspack\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
}
async function afterServerBuild(nitro, opts) {
	const { stats } = opts;
	if (stats?.hasWarnings()) nitro.logger.warn(stats.toString("errors-warnings"));
	const entrypoints = stats?.compilation.entrypoints;
	const entryFileName = [...((entrypoints?.get("index") ?? (entrypoints?.size === 1 ? [...entrypoints.values()][0] : void 0))?.getEntrypointChunk())?.files || []].find((file) => /\.m?js$/.test(file));
	await writeBuildInfo(nitro, entryFileName ? { output: [{
		type: "chunk",
		isEntry: true,
		fileName: entryFileName
	}] } : void 0);
	if (!nitro.options.static) {
		if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built in ${Date.now() - opts.startTime}ms`);
		if (nitro.options.logLevel > 1) process.stdout.write(await generateFSTree(nitro.options.output.serverDir, { compressedSizes: nitro.options.logging.compressedSizes }) || "");
	}
	await nitro.hooks.callHook("compiled", nitro);
	const rOutput = relative$2(process.cwd(), nitro.options.output.dir);
	const rewriteRelativePaths = (input) => {
		return input.replace(/([\s:])\.\/(\S*)/g, `$1${rOutput}/$2`);
	};
	const previewCommand = nitro.options.framework.previewCommand || "npx nitro preview";
	nitro.logger.success(`You can preview this build using \`${previewCommand}\``);
	if (nitro.options.commands.deploy) {
		const deployCommand = nitro.options.framework.deployCommand || "npx nitro deploy --prebuilt";
		nitro.logger.success(rewriteRelativePaths(`You can deploy this build using \`${deployCommand}\``));
	}
}
// node_modules/nitro/dist/_build/shared3.mjs
async function rspackBuild(nitro) {
	const rspack = await importDep({
		id: "@rspack/core",
		dir: nitro.options.rootDir,
		deps: nitro.options.deps
	});
	await nitro.hooks.callHook("build:before", nitro);
	const config = await getRspackConfig(nitro, rspack);
	await nitro.hooks.callHook("build:config", nitro, {
		builder: "rspack",
		rspack: config
	});
	return nitro.options.dev ? watchDev(nitro, config, rspack) : buildProduction(nitro, config, rspack);
}
export { rspackBuild };
