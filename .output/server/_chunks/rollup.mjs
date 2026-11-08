import { O as O$2 } from "./c12_rc9_defu_destr.mjs";
import { a } from "./plugin-alias.mjs";
import { __commonJSMin, __require, __toESM } from "../_common.mjs";
import { Builder, MagicString, NODE_MODULES_RE, assetUrls, attachScopes, baseBuildConfig, baseBuildPlugins, basename$2, compressPublicAssets, createFilter, createWatcher, dataToEsm, extractAssignedNames, getChunkName, importDep, isAbsolute$2, join$2, libChunkName, makeLegalIdentifier, oxc, relative$2, walk, withBuildPlugins, writeBuildInfo } from "./common.mjs";
import { l } from "./plugin-inject.mjs";
import { t } from "./perfect-debounce.mjs";
import { generateFSTree, scanHandlers } from "./nitro2.mjs";
import { r } from "./compatx.mjs";
import { promisify } from "util";
import { builtinModules } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import path10, { basename, dirname, extname, join, normalize, relative, resolve, sep } from "path";
import fs4, { existsSync, readFileSync, realpathSync, statSync } from "fs";
// node_modules/nitro/dist/_libs/commondir+is-reference.mjs
var y$1 = __toESM(__commonJSMin(((e, n) => {
	var r = __require(`path`);
	n.exports = function(e, t) {
		if (t) var n = t.map(function(t) {
			return r.resolve(e, t);
		});
		else var n = e;
		var i = n.slice(1).reduce(function(e, t) {
			if (!t.match(/^([A-Za-z]:)?\/|\\/)) throw Error(`relative path without a basedir`);
			for (var n = t.split(/\/+|\\+/), r = 0; e[r] === n[r] && r < Math.min(e.length, n.length); r++);
			return e.slice(0, r);
		}, n[0].split(/\/+|\\+/));
		return i.length > 1 ? i.join(`/`) : `/`;
	};
}))(), 1);
function te$1(e, t) {
	if (e.type === `MemberExpression`) return !e.computed && te$1(e.object, e);
	if (e.type === `Identifier`) {
		if (!t) return !0;
		switch (t.type) {
			case `MemberExpression`: return t.computed || e === t.object;
			case `MethodDefinition`: return t.computed;
			case `FieldDefinition`: return t.computed || e === t.value;
			case `Property`: return t.computed || e === t.value;
			case `ExportSpecifier`:
			case `ImportSpecifier`: return e === t.local;
			case `LabeledStatement`:
			case `BreakStatement`:
			case `ContinueStatement`: return !1;
			default: return !0;
		}
	}
	return !1;
}
var ne$1 = `29.0.2`;
var re$1 = { rollup: `^2.68.0||^3.0.0||^4.0.0` };
function ie$1(e, t, n) {
	try {
		return e(t, { allowReturnOutsideFunction: !0 });
	} catch (e) {
		throw e.message += ` in ${n}`, e;
	}
}
var b$1 = /\b(?:require|module|exports|global)\b/;
var x$1 = /\b(?:require|module|exports)\b/;
function S$1(e, t) {
	return (t ? x$1 : b$1).test(e);
}
function C$1(e, t, n) {
	let r = ie$1(e, t, n), i = !1, a = !1, o = !1;
	for (let e of r.body) switch (e.type) {
		case `ExportDefaultDeclaration`:
			i = !0, a = !0;
			break;
		case `ExportNamedDeclaration`:
			if (i = !0, e.declaration) o = !0;
			else for (let t of e.specifiers) t.exported.name === "default" ? a = !0 : o = !0;
			break;
		case `ExportAllDeclaration`:
			i = !0, e.exported && e.exported.name === "default" ? a = !0 : o = !0;
			break;
		case `ImportDeclaration`: i = !0;
	}
	return {
		isEsModule: i,
		hasDefaultExport: a,
		hasNamedExports: o,
		ast: r
	};
}
function w$1(e, t, n) {
	let r = 1, i = makeLegalIdentifier(n), a = () => e.some((e) => e.contains(i)) || t.has(i);
	for (; a();) i = makeLegalIdentifier(`${n}_${r}`), r += 1;
	for (let t of e) t.declarations[i] = !0;
	return i;
}
function T$1(e) {
	let t = makeLegalIdentifier(basename(e, extname(e)));
	return t === `index` ? makeLegalIdentifier(basename(dirname(e))) : t;
}
function E$1(e) {
	return e.replace(/\\/g, `/`);
}
var ae$1 = (e, t) => `/${E$1(relative(t, e))}`;
function oe$1(e) {
	return e[0].toUpperCase() + e.slice(1);
}
function D$1({ strictRequires: e }) {
	switch (e) {
		case void 0:
		case !0: return {
			strictRequiresFilter: () => !0,
			detectCyclesAndConditional: !1
		};
		case `auto`:
		case `debug`:
		case null: return {
			strictRequiresFilter: () => !1,
			detectCyclesAndConditional: !0
		};
		case !1: return {
			strictRequiresFilter: () => !1,
			detectCyclesAndConditional: !1
		};
		default:
			if (typeof e == `string` || Array.isArray(e)) return {
				strictRequiresFilter: createFilter(e),
				detectCyclesAndConditional: !1
			};
			throw Error(`Unexpected value for "strictRequires" option.`);
	}
}
function O$1(e) {
	let t = `index.js`;
	try {
		existsSync(join(e, `package.json`)) && (t = JSON.parse(readFileSync(join(e, `package.json`), { encoding: `utf8` })).main || t);
	} catch {}
	return t;
}
function k$1(e) {
	try {
		if (statSync(e).isDirectory()) return !0;
	} catch {}
	return !1;
}
function se$1(e, t) {
	let n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
	for (let a of !e || Array.isArray(e) ? e || [] : [e]) {
		let e = a.startsWith(`!`), o = (t, r) => e ? n.delete(t) : n.set(t, r);
		for (let n of new Builder().withBasePath().withDirs().glob(e ? a.substr(1) : a).crawl(relative(`.`, t)).sync().sort((e, t) => e.localeCompare(t, `en`))) {
			let e = resolve(n), t = E$1(e);
			if (k$1(e)) {
				i.add(e);
				let r = resolve(join(e, O$1(n)));
				o(t, r), o(E$1(r), r);
			} else i.add(dirname(e)), o(t, e);
		}
	}
	return {
		commonDir: i.size ? (0, y$1.default)([...i, t]) : null,
		dynamicRequireModules: n
	};
}
var A$1 = `throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');`;
var ce$1 = `commonjsRequire`;
var le$1 = `createCommonjsRequire`;
function j$1(e, t, n, r) {
	return e ? `${[...t.values()].map((e, t) => `import ${e.endsWith(`.json`) ? `json${t}` : `{ __require as require${t} }`} from ${JSON.stringify(e)};`).join(`
`)}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
${[...t.keys()].map((e, t) => `\t\t${JSON.stringify(ae$1(e, n))}: ${e.endsWith(`.json`) ? `function () { return json${t}; }` : `require${t}`}`).join(`,
`)}
	});
}

export function ${le$1}(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		${r ? `return require(path);` : A$1}
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	}
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}` : `export function ${ce$1}(path) {
	${A$1}
}`;
}
var M$1 = (e, t) => e.endsWith(t);
var N$1 = (e, t) => `\0${e}${t}`;
var P$1 = (e, t) => e.slice(1, -t.length);
var F$1 = `?commonjs-proxy`;
var ue$1 = `?commonjs-wrapped`;
var I$1 = `?commonjs-external`;
var L$1 = `?commonjs-exports`;
var R$1 = `?commonjs-module`;
var z$1 = `?commonjs-entry`;
var B$1 = `?commonjs-es-import`;
var V$1 = `\0commonjs-dynamic-modules`;
var H$1 = `\0commonjsHelpers.js`;
var U$1 = `withRequireFunction`;
function W$1() {
	return `
export var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

export function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

export function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

export function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch (e) {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}
`;
}
function de$1(e, t) {
	if (t === !0 || e.endsWith(`.json`)) return `export { default } from ${JSON.stringify(e)};`;
	let n = T$1(e), r = t === `auto` ? `import { getDefaultExportFromNamespaceIfNotNamed } from "${H$1}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(${n});` : t === `preferred` ? `import { getDefaultExportFromNamespaceIfPresent } from "${H$1}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfPresent(${n});` : t ? `export default ${n};` : `import { getAugmentedNamespace } from "${H$1}"; export default /*@__PURE__*/getAugmentedNamespace(${n});`;
	return `import * as ${n} from ${JSON.stringify(e)}; ${r}`;
}
async function G$1(e, t, n) {
	let r = T$1(e), { meta: { commonjs: i } } = await n({ id: e });
	return i ? i.isCommonJS ? `export { __moduleExports as default } from ${JSON.stringify(e)};` : t ? t !== !0 && (t === `namespace` || !i.hasDefaultExport || t === `auto` && i.hasNamedExports) ? `import * as ${r} from ${JSON.stringify(e)}; export default ${r};` : `export { default } from ${JSON.stringify(e)};` : `import { getAugmentedNamespace } from "${H$1}"; import * as ${r} from ${JSON.stringify(e)}; export default /*@__PURE__*/getAugmentedNamespace(${r});` : de$1(e, t);
}
function fe$1(e, t, n, r) {
	let { meta: { commonjs: i }, hasDefaultExport: a } = n(e);
	if (!i || i.isCommonJS !== U$1) {
		let t = JSON.stringify(e), n = `export * from ${t};`;
		return a && (n += `export { default } from ${t};`), r + n;
	}
	let o = pe$1(e, t, !0);
	return {
		...o,
		code: r + o.code
	};
}
function pe$1(e, t, n) {
	let r = T$1(e), i = `${r}Exports`, a = `require${oe$1(r)}`, o = `import { getDefaultExportFromCjs } from "${H$1}";\nimport { __require as ${a} } from ${JSON.stringify(e)};\nvar ${i} = ${n ? `` : `/*@__PURE__*/ `}${a}();\nexport { ${i} as __moduleExports };`;
	return o += t === !0 ? `\nexport { ${i} as default };` : t === !1 ? `\nexport default ${i}.default;` : `\nexport default /*@__PURE__*/getDefaultExportFromCjs(${i});`, {
		code: o,
		syntheticNamedExports: `__moduleExports`
	};
}
function K$1(e) {
	return `import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export function __require() { return require(${JSON.stringify(e)}); }`;
}
function me$1(e, t) {
	return [e + t, `${e}${sep}index${t}`];
}
function he$1(e, t) {
	return t.reduce((t, n) => t.concat(me$1(e, n)), [e]);
}
function q$1(e, t, n) {
	if (e[0] !== `.` || !t) return;
	let r = he$1(resolve(dirname(t), e), n);
	for (let e = 0; e < r.length; e += 1) try {
		if (statSync(r[e]).isFile()) return { id: r[e] };
	} catch {}
}
function J$1(e, t) {
	let n = /* @__PURE__ */ new Map();
	return {
		currentlyResolving: n,
		async resolveId(r, i, a) {
			if (a.custom?.[`node-resolve`]?.isRequire) return null;
			let o = n.get(i);
			if (o && o.has(r)) return this.warn({
				code: `THIS_RESOLVE_WITHOUT_OPTIONS`,
				message: `It appears a plugin has implemented a "resolveId" hook that uses "this.resolve" without forwarding the third "options" parameter of "resolveId". This is problematic as it can lead to wrong module resolutions especially for the node-resolve plugin and in certain cases cause early exit errors for the commonjs plugin.
In rare cases, this warning can appear if the same file is both imported and required from the same mixed ES/CommonJS module, in which case it can be ignored.`,
				url: `https://rollupjs.org/guide/en/#resolveid`
			}), null;
			if (M$1(r, ue$1)) return P$1(r, ue$1);
			if (r.endsWith(z$1) || M$1(r, R$1) || M$1(r, L$1) || M$1(r, F$1) || M$1(r, B$1) || M$1(r, I$1) || r.startsWith(H$1) || r === V$1) return r;
			if (i) {
				if (i === V$1 || M$1(i, F$1) || M$1(i, B$1) || i.endsWith(z$1)) return r;
				if (M$1(i, I$1)) return await this.resolve(r, i, Object.assign({ skipSelf: !0 }, a)) ? {
					id: r,
					external: !0
				} : null;
			}
			if (r.startsWith(`\0`)) return null;
			let s = await this.resolve(r, i, Object.assign({ skipSelf: !0 }, a)) || q$1(r, i, e);
			if (!s || s.external || s.id.endsWith(z$1) || M$1(s.id, B$1) || !t(s.id)) return s;
			let c = await this.load(s), { meta: { commonjs: l } } = c;
			if (l) {
				let { isCommonJS: e } = l;
				if (e) {
					if (a.isEntry) return c.moduleSideEffects = !0, s.id + z$1;
					if (e === U$1) return {
						id: N$1(s.id, B$1),
						meta: { commonjs: { resolved: s } }
					};
				}
			}
			return s;
		}
	};
}
function Y$1(e, t, n, r) {
	let i = Object.create(null), a = Object.create(null), o = Object.create(null), s = Object.create(null), c = (e) => s[e] || (s[e] = /* @__PURE__ */ new Set()), l = (e) => {
		let t = new Set(c(e));
		for (let n of t) {
			if (n === e) return !0;
			for (let e of c(n)) t.add(e);
		}
		return !1;
	}, u = Object.create(null), d = (e) => {
		let n = i[e];
		return n !== !0 || !t || u[e] ? n : l(e) ? i[e] = U$1 : n;
	}, f = (e, n) => {
		u[e] || (i[e] = n, t && i[e] === !0 && a[e] && !o[e] && (i[e] = U$1));
	}, p = async (e, t, n, r) => {
		let s = t.id;
		a[s] = !0, n || i[e] === U$1 || (o[s] = !0), c(e).add(s), l(s) || await r(t);
	}, m = async (e, t) => {
		if (e.id in i) return i[e.id];
		let { meta: { commonjs: n } } = await t(e);
		return n && n.isCommonJS || !1;
	};
	return {
		getWrappedIds: () => Object.keys(i).filter((e) => i[e] === U$1),
		isRequiredId: (e) => a[e],
		async shouldTransformCachedModule({ id: e, resolvedSources: t, meta: { commonjs: n } }) {
			if (n && n.isCommonJS || (i[e] = !1), M$1(e, B$1)) return !1;
			let r = n && n.requires;
			if (r) {
				if (f(e, n.initialCommonJSType), await Promise.all(r.map(({ resolved: t, isConditional: n }) => p(e, t, n, this.load))), d(e) !== n.isCommonJS) return !0;
				for (let { resolved: { id: e } } of r) if (d(e) !== n.isRequiredCommonJS[e]) return !0;
				u[e] = !0;
				for (let { resolved: { id: e } } of r) u[e] = !0;
			}
			let a = new Set((r || []).map(({ resolved: { id: e } }) => e));
			return (await Promise.all(Object.keys(t).map((e) => t[e]).filter(({ id: e, external: t }) => !(t || a.has(e))).map(async (e) => M$1(e.id, B$1) ? await m((await this.load(e)).meta.commonjs.resolved, this.load) !== U$1 : await m(e, this.load) === U$1))).some((e) => e);
		},
		resolveRequireSourcesAndUpdateMeta: (t) => async (i, a, o, s) => {
			o.initialCommonJSType = a, o.requires = [], o.isRequiredCommonJS = Object.create(null), f(i, a);
			let c = n.get(i) || /* @__PURE__ */ new Set();
			n.set(i, c);
			let l = await Promise.all(s.map(async ({ source: n, isConditional: r }) => {
				if (n.startsWith(`\0`)) return {
					id: n,
					allowProxy: !1
				};
				c.add(n);
				let a = await t.resolve(n, i, {
					skipSelf: !1,
					custom: { "node-resolve": { isRequire: !0 } }
				}) || q$1(n, i, e);
				if (c.delete(n), !a) return {
					id: N$1(n, I$1),
					allowProxy: !1
				};
				let s = a.id;
				return a.external ? {
					id: N$1(s, I$1),
					allowProxy: !1
				} : (o.requires.push({
					resolved: a,
					isConditional: r
				}), await p(i, a, r, t.load), {
					id: s,
					allowProxy: !0
				});
			}));
			return o.isCommonJS = d(i), u[i] = !0, l.map(({ id: e, allowProxy: n }, i) => {
				let a = o.isRequiredCommonJS[e] = d(e), c = M$1(e, I$1), l = e;
				if (r === !0) {
					if (o.isCommonJS === U$1 && !n && c) P$1(e, I$1).startsWith(`node:`) && (a = U$1, o.isRequiredCommonJS[e] = a);
					else if (c && !n) {
						let t = P$1(e, I$1);
						t.startsWith(`node:`) && (l = t);
					}
				}
				let f = a === U$1;
				u[e] = !0;
				let p = f && !c ? t.getModuleInfo(e) : null;
				return {
					wrappedModuleSideEffects: f ? p?.moduleSideEffects ?? !0 : !1,
					source: s[i].source,
					id: n ? N$1(l, f ? ue$1 : F$1) : l,
					isCommonJS: a
				};
			});
		},
		isCurrentlyResolving(e, t) {
			let r = n.get(t);
			return r && r.has(e);
		}
	};
}
function ge$1(e, t, n) {
	let r = /\^(\d+\.\d+\.\d+)/g, i = 1 / 0, a = 1 / 0, o = 1 / 0, s;
	for (; s = r.exec(t);) {
		let [e, t, n] = s[1].split(`.`).map(Number);
		e < i && (i = e, a = t, o = n);
	}
	if (!e) throw Error(`Insufficient ${n} version: "@rollup/plugin-commonjs" requires at least ${n}@${i}.${a}.${o}.`);
	let [c, l, u] = e.split(`.`).map(Number);
	if (c < i || c === i && (l < a || l === a && u < o)) throw Error(`Insufficient ${n} version: "@rollup/plugin-commonjs" requires at least ${n}@${i}.${a}.${o} but found ${n}@${e}.`);
}
function _e$1(e, t) {
	return e === !1 || t === !1 ? !1 : e === !0 && t === !0 || null;
}
function ve$1(e, t) {
	return e === !0 || t === !0 ? !0 : e === !1 && t === !1 ? !1 : null;
}
var X$1 = {
	"==": (e) => ye$1(e.left, e.right, !1),
	"!=": (e) => Z$1(X$1[`==`](e)),
	"===": (e) => ye$1(e.left, e.right, !0),
	"!==": (e) => Z$1(X$1[`===`](e)),
	"!": (e) => be$1(e.argument),
	"&&": (e) => _e$1(Q$1(e.left), Q$1(e.right)),
	"||": (e) => ve$1(Q$1(e.left), Q$1(e.right))
};
function Z$1(e) {
	return e === null ? e : !e;
}
function ye$1(e, t, n) {
	return e.type === t.type && e.type === `Literal` ? n ? e.value === t.value : e.value == t.value : null;
}
function Q$1(e) {
	return e ? e.type === `Literal` ? !!e.value : e.type === `ParenthesizedExpression` ? Q$1(e.expression) : e.operator in X$1 ? X$1[e.operator](e) : null : !1;
}
function be$1(e) {
	return Z$1(Q$1(e));
}
function xe$1(e) {
	let t = [];
	for (; e.type === `MemberExpression`;) {
		if (e.computed) return null;
		t.unshift(e.property.name), e = e.object;
	}
	if (e.type !== `Identifier`) return null;
	let { name: n } = e;
	return t.unshift(n), {
		name: n,
		keypath: t.join(`.`)
	};
}
var Se$1 = `__esModule`;
function Ce$1(e) {
	let t = we$1(e, `exports`), n = t || we$1(e, `module.exports`);
	return n && n.key === Se$1 && Q$1(n.value) ? t ? `exports` : `module` : !1;
}
function we$1(e, t) {
	let { callee: { object: n, property: r } } = e;
	if (!n || n.type !== `Identifier` || n.name !== `Object` || !r || r.type !== `Identifier` || r.name !== `defineProperty` || e.arguments.length !== 3) return;
	let i = t.split(`.`), [a, o, s] = e.arguments;
	if (i.length === 1 && (a.type !== `Identifier` || a.name !== i[0]) || i.length === 2 && (a.type !== `MemberExpression` || a.object.name !== i[0] || a.property.name !== i[1]) || s.type !== `ObjectExpression` || !s.properties) return;
	let c = s.properties.find((e) => e.key && e.key.name === `value`);
	if (c && c.value) return {
		key: o.value,
		value: c.value
	};
}
function Te$1(e) {
	return e && e.type === `Property` && e.shorthand;
}
function Ee$1(e, t) {
	return e && e.type === `PropertyDefinition` && e.key === t;
}
function De$1(e, t, n, r, i) {
	let a = [], o = [];
	t.module && (a.push(`module`), o.push(n)), t.exports && (a.push(`exports`), o.push(t.module ? `${n}.exports` : r)), e.trim().indent(`	`, { exclude: i }).prepend(`(function (${a.join(`, `)}) {\n`).append(` \n} (${o.join(`, `)}));`);
}
function Oe$1(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
	let _ = [], v = [];
	return h ? $$1(e, i, p, _, a, s, t, n, g, l) : p === `replace` ? ke$1(e, _, v, a, o, n, m, f) : (p === `module` ? (v.push(`var ${r} = ${t}.exports`), _.push(`${r} as __moduleExports`)) : _.push(`${n} as __moduleExports`), i ? v.push(Ae$1(r, m, f)) : je$1(e, _, v, a, s, u, c, t, n, r, l, f, m, p)), _.length && v.push(`export { ${_.join(`, `)} }`), `\n\n${v.join(`;
`)};`;
}
function $$1(e, t, n, r, i, a, o, s, c, l) {
	if (r.push(`${c} as __require`), !t) {
		if (n === `replace`) Me$1(e, i, s);
		else {
			Me$1(e, i, `${o}.exports`);
			for (let [t, { nodes: r }] of a) for (let { node: i, type: a } of r) e.overwrite(i.start, i.left.end, `${n === `module` && a === `module` ? `${o}.exports` : s}.${t}`);
			Ne$1(l, e, n, o, s);
		}
	}
}
function ke$1(e, t, n, r, i, a, o, s) {
	for (let { left: t } of r) e.overwrite(t.start, t.end, a);
	e.prependRight(i.left.start, `var `), t.push(`${a} as __moduleExports`), n.push(Ae$1(a, o, s));
}
function Ae$1(e, t, n) {
	return `export default ${t === !0 ? e : t === !1 ? `${e}.default` : `/*@__PURE__*/${n}.getDefaultExportFromCjs(${e})`}`;
}
function je$1(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	let m;
	for (let { left: t } of r) e.overwrite(t.start, t.end, `${s}.exports`);
	for (let [n, { nodes: r }] of i) {
		let i = a[n], l = !0;
		for (let { node: t, type: a } of r) {
			let r = `${i} = ${p === `module` && a === `module` ? `${s}.exports` : c}.${n}`;
			l && o.has(t) && (r = `var ${r}`, l = !1), e.overwrite(t.start, t.left.end, r);
		}
		l && e.prepend(`var ${i};\n`), n === "default" ? m = i : t.push(n === i ? n : `${i} as ${n}`);
	}
	let h = Ne$1(u, e, p, s, c);
	f === !1 || f === `auto` && h && r.length === 0 ? t.push(`${m || l} as default`) : f === !0 || !h && r.length === 0 ? t.push(`${l} as default`) : n.push(Ae$1(l, f, d));
}
function Me$1(e, t, n) {
	for (let { left: r } of t) e.overwrite(r.start, r.end, n);
}
function Ne$1(e, t, n, r, i) {
	let a = !1;
	for (let { node: o, type: s } of e) {
		a = !0;
		let e = o.type === `CallExpression` ? o.arguments[0] : o.left.object;
		t.overwrite(e.start, e.end, n === `module` && s === `module` ? `${r}.exports` : i);
	}
	return a;
}
function Pe$1(e, t) {
	return !e || e.type !== `CallExpression` || e.arguments.length === 0 ? !1 : Fe$1(e.callee, t);
}
function Fe$1(e, t) {
	return e.type === `Identifier` && e.name === `require` && !t.contains(`require`) || e.type === `MemberExpression` && Ie$1(e, t);
}
function Ie$1({ object: e, property: t }, n) {
	return e.type === `Identifier` && e.name === `module` && t.type === `Identifier` && t.name === `require` && !n.contains(`module`);
}
function Le(e) {
	return e.arguments.length > 1 || e.arguments[0].type !== `Literal` && (e.arguments[0].type !== `TemplateLiteral` || e.arguments[0].expressions.length > 0);
}
var Re = {
	resolve: !0,
	cache: !0,
	main: !0
};
function ze(e) {
	return e && e.property && Re[e.property.name];
}
function Be(e) {
	return e.arguments[0].type === `Literal` ? e.arguments[0].value : e.arguments[0].quasis[0].value.cooked;
}
function Ve() {
	let e = [];
	function t(t, n, r, i, a, o, s) {
		e.push({
			sourceId: t,
			node: n,
			scope: r,
			usesReturnValue: i,
			isInsideTryBlock: a,
			isInsideConditional: o,
			toBeRemoved: s
		});
	}
	async function n(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = [];
		g.push(`import * as ${i} from "${H$1}"`), a && g.push(`import { ${p ? le$1 : ce$1} as ${a} } from "${V$1}"`), l === `module` ? g.push(`import { __module as ${o} } from ${JSON.stringify(N$1(c, R$1))}`, `var ${s} = ${o}.exports`) : l === `exports` && g.push(`import { __exports as ${s} } from ${JSON.stringify(N$1(c, L$1))}`);
		let _ = He(e);
		return Ue(g, await u(c, d ? U$1 : !f, h, Object.keys(_).map((e) => ({
			source: e,
			isConditional: _[e].every((e) => e.isInsideConditional)
		}))), _, m, t), g.length ? `${g.join(`;
`)};\n\n` : ``;
	}
	return {
		addRequireExpression: t,
		rewriteRequireExpressionsAndGetImportBlock: n
	};
}
function He(e) {
	let t = Object.create(null);
	for (let n of e) {
		let { sourceId: e } = n;
		t[e] || (t[e] = []), t[e].push(n);
	}
	return t;
}
function Ue(e, t, n, r, i) {
	let a = We();
	for (let { source: o, id: s, isCommonJS: c, wrappedModuleSideEffects: l } of t) {
		let t = n[o], u = a(t), d = !1, f = !1;
		for (let { node: e, usesReturnValue: n, toBeRemoved: a, isInsideTryBlock: p } of t) {
			let { canConvertRequire: t, shouldRemoveRequire: m } = p && M$1(s, I$1) ? r(o) : {
				canConvertRequire: !0,
				shouldRemoveRequire: !1
			};
			m ? n ? i.overwrite(e.start, e.end, `undefined`) : i.remove(a.start, a.end) : t && (f = !0, c === U$1 ? i.overwrite(e.start, e.end, `${l ? `` : `/*@__PURE__*/ `}${u}()`) : n ? (d = !0, i.overwrite(e.start, e.end, u)) : i.remove(a.start, a.end));
		}
		f && (c === U$1 ? e.push(`import { __require as ${u} } from ${JSON.stringify(s)}`) : e.push(`import ${d ? `${u} from ` : ``}${JSON.stringify(s)}`));
	}
}
function We() {
	let e = 0;
	return (t) => {
		let n, r = ({ scope: e }) => e.contains(n);
		do
			n = `require$$${e}`, e += 1;
		while (t.some(r));
		return n;
	};
}
var Ge = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;
var Ke = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;
async function qe(e, t, n, r, o, c, u, d, f, p, h, g, _, v, ee, y, ne, re, b) {
	let x = _ || ie$1(e, t, n), S = new MagicString(t), C = {
		module: !1,
		exports: !1,
		global: !1,
		require: !1
	}, E = p && ae$1(dirname(n), g), D = attachScopes(x, `scope`), O = 0, k = 0, se = 0, A = null, j = !1, M = /* @__PURE__ */ new Set(), N = null, P = /* @__PURE__ */ new Set(), { addRequireExpression: F, rewriteRequireExpressionsAndGetImportBlock: ue } = Ve(), I = /* @__PURE__ */ new Set(), L = [], R = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Set([D]), B = /* @__PURE__ */ new Set([D]), V = [], H = null, W = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), G = [], fe = [], pe = [], K = [], me = /* @__PURE__ */ new Set(), he = [];
	walk(x, {
		enter(e, t) {
			if (R.has(e)) this.skip();
			else switch (A !== null && e.start > A && (A = null), N !== null && e.start > N && (N = null), N === null && P.has(e) && (N = e.end), k += 1, e.scope && ({scope: D} = e), Ke.test(e.type) && (O += 1), f && (S.addSourcemapLocation(e.start), S.addSourcemapLocation(e.end)), e.type) {
				case `AssignmentExpression`:
					if (e.left.type === `MemberExpression`) {
						let t = xe$1(e.left);
						if (!t || D.contains(t.name)) return;
						let n = Ge.exec(t.keypath);
						if (!n || t.keypath === `exports`) return;
						let [, r] = n;
						if (C[t.name] = !0, t.keypath === `module.exports`) V.push(e), k > 3 ? z.add(D) : H ||= e;
						else if (r === Se$1) k > 3 ? j = !0 : G.push({
							node: e,
							type: t.name
						});
						else {
							let n = W.get(r) || {
								nodes: [],
								scopes: /* @__PURE__ */ new Set()
							};
							n.nodes.push({
								node: e,
								type: t.name
							}), n.scopes.add(D), B.add(D), W.set(r, n), k <= 3 && de.add(e);
						}
						R.add(e.left);
					} else for (let t of extractAssignedNames(e.left)) I.add(t);
					return;
				case `CallExpression`: {
					let n = Ce$1(e);
					if (n) {
						k === 3 && t.type === `ExpressionStatement` ? (R.add(e.arguments[0]), G.push({
							node: e,
							type: n
						})) : j = !0;
						return;
					}
					if (p && e.callee.object && Fe$1(e.callee.object, D) && e.callee.property.name === `resolve`) {
						re(e.start), C.require = !0;
						let t = e.callee.object;
						K.push(t), R.add(e.callee);
						return;
					}
					if (!Pe$1(e, D)) {
						let t = xe$1(e.callee);
						t && me.has(t.name) && (N = 1 / 0);
						return;
					}
					if (R.add(e.callee), C.require = !0, Le(e)) {
						p && re(e.start), u || K.push(e.callee);
						return;
					}
					let r = Be(e);
					if (!c(r)) {
						let n = t.type !== `ExpressionStatement`, i = t.type === `ExpressionStatement` && (!N || A !== null && A < N) ? t : e;
						if (F(r, e, D, n, A !== null, N !== null, i), t.type === `VariableDeclarator` && t.id.type === `Identifier`) for (let e of extractAssignedNames(t.id)) me.add(e);
					}
					return;
				}
				case `ClassBody`:
					se += 1;
					return;
				case `ConditionalExpression`:
				case `IfStatement`:
					be$1(e.test) ? R.add(e.consequent) : Q$1(e.test) ? e.alternate && R.add(e.alternate) : (P.add(e.consequent), e.alternate && P.add(e.alternate));
					return;
				case `ArrowFunctionExpression`:
				case `FunctionDeclaration`:
				case `FunctionExpression`:
					N === null && (t.type !== `CallExpression` || t.callee !== e) && (N = e.end);
					return;
				case `Identifier`: {
					let { name: n } = e;
					if (!te$1(e, t) || D.contains(n) || Ee$1(t, e)) return;
					switch (n) {
						case `require`:
							if (C.require = !0, ze(t)) return;
							u || (Te$1(t) && (R.add(t.value), S.prependRight(e.start, `require: `)), K.push(e));
							return;
						case `module`:
						case `exports`:
							j = !0, C[n] = !0;
							return;
						case `global`:
							C.global = !0, o || (Te$1(t) && (R.add(t.value), S.prependRight(e.start, `global: `)), fe.push(e));
							return;
						case `define`:
							S.overwrite(e.start, e.end, `undefined`, { storeName: !0 });
							return;
						default:
							M.add(n);
							return;
					}
				}
				case `LogicalExpression`:
					e.operator === `&&` ? be$1(e.left) ? R.add(e.right) : Q$1(e.left) || P.add(e.right) : e.operator === `||` && (Q$1(e.left) ? R.add(e.right) : be$1(e.left) || P.add(e.right));
					return;
				case `MemberExpression`:
					!p && Ie$1(e, D) && (C.require = !0, K.push(e), R.add(e.object), R.add(e.property));
					return;
				case `ReturnStatement`:
					O === 0 && (j = !0);
					return;
				case `ThisExpression`:
					O === 0 && !se && (C.global = !0, o || pe.push(e));
					return;
				case `TryStatement`:
					A === null && (A = e.block.end), N === null && (N = e.end);
					return;
				case `UnaryExpression`:
					if (e.operator === `typeof`) {
						let t = xe$1(e.argument);
						if (!t || D.contains(t.name)) return;
						r || t.keypath !== `module.exports` && t.keypath !== `module` && t.keypath !== `exports` || S.overwrite(e.start, e.end, `'object'`, { storeName: !1 });
					}
					return;
				case `VariableDeclaration`:
					D.parent || L.push(e);
					return;
				case `TemplateElement`: e.value.raw.includes(`
`) && he.push([e.start, e.end]);
			}
		},
		leave(e) {
			--k, e.scope && (D = D.parent), Ke.test(e.type) && --O, e.type === `ClassBody` && --se;
		}
	});
	let q = T$1(n), J = w$1([...B], M, q), Y = w$1([...z], M, `${q}Module`), ge = w$1([D], M, `require${oe$1(q)}`), _e = w$1([D], M, `hasRequired${oe$1(q)}`), ve = w$1([D], M, `commonjsHelpers`), X = K.length > 0 && w$1([D], M, p ? le$1 : ce$1), Z = Object.create(null);
	for (let [e, { scopes: t }] of W) Z[e] = w$1([...t], M, e);
	for (let e of fe) S.overwrite(e.start, e.end, `${ve}.commonjsGlobal`, {
		contentOnly: !0,
		storeName: !0
	});
	for (let e of pe) S.overwrite(e.start, e.end, J, { storeName: !0 });
	for (let e of K) S.overwrite(e.start, e.end, p ? `${X}(${JSON.stringify(E)})` : X, {
		contentOnly: !0,
		storeName: !0
	});
	if (j = !r && (j || C.exports && V.length > 0), !(j || ne || ee || C.module || C.exports || C.require || G.length > 0) && (o || !C.global)) return { meta: { commonjs: { isCommonJS: !1 } } };
	let ye = ``;
	if (t.startsWith(`/*`)) {
		let e = t.indexOf(`*/`, 2) + 2;
		ye = `${t.slice(0, e)}\n`, S.remove(0, e).trim();
	}
	let we = ``;
	if (t.startsWith(`#!`)) {
		let e = t.indexOf(`
`) + 1;
		we = t.slice(0, e), S.remove(0, e).trim();
	}
	let $ = r ? `none` : j ? C.module ? `module` : `exports` : H ? W.size === 0 && G.length === 0 ? `replace` : `module` : V.length === 0 ? `exports` : `module`, ke = $ === `module` ? w$1([], M, `${q}Exports`) : J, Ae = await ue(S, L, I, ve, X, Y, J, n, $, y, ee, r, p, d, b), je = b.isCommonJS === U$1, Me = r ? `` : Oe$1(S, Y, J, ke, j, V, H, W, de, G, Z, t, ve, $, v, je, ge);
	if (j && De$1(S, C, Y, J, he), je) {
		S.trim().indent(`	`, { exclude: he });
		let e = $ === `module` ? `${Y}.exports` : J;
		S.prepend(`var ${_e};

function ${ge} () {
\tif (${_e}) return ${e};
\t${_e} = 1;
`).append(`
\treturn ${e};
}`), $ === `replace` && S.prepend(`var ${J};\n`);
	}
	return S.trim().prepend(we + ye + Ae).append(Me), {
		code: S.toString(),
		map: f ? S.generateMap() : null,
		syntheticNamedExports: r || je ? !1 : `__moduleExports`,
		meta: { commonjs: {
			...b,
			shebang: we
		} }
	};
}
function Je(e = {}) {
	let { ignoreGlobal: t, ignoreDynamicRequires: n, requireReturnsDefault: r, defaultIsModuleExports: i, esmExternals: a, requireNodeBuiltins: s = !1 } = e, c = e.extensions || [`.js`], l = createFilter(e.include, e.exclude), u = (e) => {
		let t = extname(e);
		return t === `.cjs` || c.includes(t) && l(e);
	}, { strictRequiresFilter: d, detectCyclesAndConditional: f } = D$1(e), p = typeof r == `function` ? r : () => r, g, ee = typeof a == `function` ? a : Array.isArray(a) ? (g = new Set(a), (e) => g.has(e)) : () => a, y = typeof i == `function` ? i : () => typeof i == `boolean` ? i : `auto`, te = typeof e.dynamicRequireRoot == `string` ? resolve(e.dynamicRequireRoot) : process.cwd(), { commonDir: ie, dynamicRequireModules: b } = se$1(e.dynamicRequireTargets, te), x = b.size > 0, w = typeof e.ignore == `function` ? e.ignore : Array.isArray(e.ignore) ? (t) => e.ignore.includes(t) : () => !1, ae = (t) => {
		let n = typeof e.ignoreTryCatch == `function` ? e.ignoreTryCatch(t) : Array.isArray(e.ignoreTryCatch) ? e.ignoreTryCatch.includes(t) : e.ignoreTryCatch === void 0 || e.ignoreTryCatch;
		return {
			canConvertRequire: n !== `remove` && n !== !0,
			shouldRemoveRequire: n === `remove`
		};
	}, { currentlyResolving: oe, resolveId: O } = J$1(c, u), k = e.sourceMap !== !1, A;
	function ce(r, i) {
		let a = E$1(i), { isEsModule: o, hasDefaultExport: s, hasNamedExports: c, ast: l } = C$1(this.parse, r, i), u = this.getModuleInfo(i).meta.commonjs || {};
		if (s && (u.hasDefaultExport = !0), c && (u.hasNamedExports = !0), !b.has(a) && (!(S$1(r, t) || A.isRequiredId(i)) || o && !e.transformMixedEsModules)) return u.isCommonJS = !1, { meta: { commonjs: u } };
		let f = !o && (b.has(a) || d(i));
		return qe(this.parse, r, i, o, t || o, w, n && !x, ae, k, x, b, ie, l, y(i), f, A.resolveRequireSourcesAndUpdateMeta(this), A.isRequiredId(i), (e) => {
			let t = E$1(te);
			a.indexOf(t) !== 0 && this.error({
				code: `DYNAMIC_REQUIRE_OUTSIDE_ROOT`,
				normalizedId: a,
				normalizedDynamicRequireRoot: t,
				message: `"${a}" contains dynamic require statements but it is not within the current dynamicRequireRoot "${t}". You should set dynamicRequireRoot to "${dirname(a)}" or one of its parent directories.`
			}, e);
		}, u);
	}
	return {
		name: `commonjs`,
		version: ne$1,
		options(e) {
			let t = Array.isArray(e.plugins) ? [...e.plugins] : e.plugins ? [e.plugins] : [];
			return t.unshift({
				name: `commonjs--resolver`,
				resolveId: O
			}), {
				...e,
				plugins: t
			};
		},
		buildStart({ plugins: t }) {
			ge$1(this.meta.rollupVersion, re$1.rollup, `rollup`);
			let n = t.find(({ name: e }) => e === `node-resolve`);
			n && ge$1(n.version, `^13.0.6`, `@rollup/plugin-node-resolve`), e.namedExports != null && this.warn(`The namedExports option from "@rollup/plugin-commonjs" is deprecated. Named exports are now handled automatically.`), A = Y$1(c, f, oe, s);
		},
		buildEnd() {
			if (e.strictRequires === `debug`) {
				let e = A.getWrappedIds();
				e.length ? this.warn({
					code: `WRAPPED_IDS`,
					ids: e,
					message: `The commonjs plugin automatically wrapped the following files:\n[\n${e.map((e) => `\t${JSON.stringify(relative(process.cwd(), e))}`).join(`,
`)}\n]`
				}) : this.warn({
					code: `WRAPPED_IDS`,
					ids: e,
					message: `The commonjs plugin did not wrap any files.`
				});
			}
		},
		async load(e) {
			if (e === H$1) return W$1();
			if (M$1(e, R$1)) {
				let t = T$1(P$1(e, R$1));
				return {
					code: `var ${t} = {exports: {}}; export {${t} as __module}`,
					meta: { commonjs: { isCommonJS: !1 } }
				};
			}
			if (M$1(e, L$1)) {
				let t = T$1(P$1(e, L$1));
				return {
					code: `var ${t} = {}; export {${t} as __exports}`,
					meta: { commonjs: { isCommonJS: !1 } }
				};
			}
			if (M$1(e, I$1)) {
				let t = P$1(e, I$1);
				return s === !0 && t.startsWith(`node:`) ? K$1(t) : de$1(t, !ee(t) || p(t));
			}
			if (e.endsWith(z$1)) {
				let t = e.slice(0, -15), { meta: { commonjs: n } } = this.getModuleInfo(t), r = n?.shebang ?? ``;
				return fe$1(t, y(t), this.getModuleInfo, r);
			}
			if (M$1(e, B$1)) {
				let t = P$1(e, B$1);
				return pe$1(t, y(t), (await this.load({ id: t })).moduleSideEffects);
			}
			if (e === V$1) return j$1(x, b, ie, n);
			if (M$1(e, F$1)) {
				let t = P$1(e, F$1);
				return G$1(t, p(t), this.load);
			}
			return null;
		},
		shouldTransformCachedModule(...e) {
			return A.shouldTransformCachedModule.call(this, ...e);
		},
		transform(e, t) {
			if (!u(t)) return null;
			try {
				return ce.call(this, e, t);
			} catch (e) {
				return this.error(e, e.pos);
			}
		}
	};
}
// node_modules/nitro/dist/_libs/plugin-json.mjs
function n(n) {
	n === void 0 && (n = {});
	var r = createFilter(n.include, n.exclude), i = `indent` in n ? n.indent : `	`;
	return {
		name: `json`,
		transform: function(e, a) {
			if (a.slice(-5) !== `.json` || !r(a)) return null;
			try {
				var o = JSON.parse(e);
				return {
					code: dataToEsm(o, {
						preferConst: n.preferConst,
						compact: n.compact,
						namedExports: n.namedExports,
						includeArbitraryNames: n.includeArbitraryNames,
						indent: i
					}),
					map: { mappings: `` }
				};
			} catch (e) {
				return this.error({
					message: `Could not parse JSON file`,
					id: a,
					cause: e
				}), null;
			}
		}
	};
}
// node_modules/nitro/dist/_libs/hasown+resolve+deepmerge.mjs
var g = __commonJSMin(((e, t) => {
	var n = function(e) {
		return r(e) && !i(e);
	};
	function r(e) {
		return !!e && typeof e == `object`;
	}
	function i(e) {
		var t = Object.prototype.toString.call(e);
		return t === `[object RegExp]` || t === `[object Date]` || o(e);
	}
	var a = typeof Symbol == `function` && Symbol.for ? Symbol.for(`react.element`) : 60103;
	function o(e) {
		return e.$$typeof === a;
	}
	function s(e) {
		return Array.isArray(e) ? [] : {};
	}
	function c(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? g(s(e), e, t) : e;
	}
	function l(e, t, n) {
		return e.concat(t).map(function(e) {
			return c(e, n);
		});
	}
	function u(e, t) {
		if (!t.customMerge) return g;
		var n = t.customMerge(e);
		return typeof n == `function` ? n : g;
	}
	function d(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function f(e) {
		return Object.keys(e).concat(d(e));
	}
	function p(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function m(e, t) {
		return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function h(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && f(e).forEach(function(t) {
			r[t] = c(e[t], n);
		}), f(t).forEach(function(i) {
			m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[i], t[i], n) : c(t[i], n));
		}), r;
	}
	function g(e, t, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject || n, r.cloneUnlessOtherwiseSpecified = c;
		var i = Array.isArray(t);
		return i === Array.isArray(e) ? i ? r.arrayMerge(e, t, r) : h(e, t, r) : c(t, r);
	}
	g.all = function(e, t) {
		if (!Array.isArray(e)) throw Error(`first argument should be an array`);
		return e.reduce(function(e, n) {
			return g(e, n, t);
		}, {});
	}, t.exports = g;
}));
var _ = __commonJSMin(((e, t) => {
	var n = /(?:^\s*|[}{\(\);,\n]\s*)(import\s+['"]|(import|module)\s+[^"'\(\)\n;]+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/, r = /(?:^\s*|[}{\(\);,\n]\s*)(export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)"))/;
	t.exports = function(e) {
		return n.test(e) || r.test(e);
	};
}));
var v = __commonJSMin(((e, n) => {
	n.exports = __require(`os`).homedir || function() {
		var e = process.env.HOME, t = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
		return process.platform === `win32` ? process.env.USERPROFILE || process.env.HOMEDRIVE && process.env.HOMEPATH && process.env.HOMEDRIVE + process.env.HOMEPATH || e || null : process.platform === `darwin` ? e || (t ? `/Users/` + t : null) : process.platform === `linux` ? e || (process.getuid() === 0 ? `/root` : t ? `/home/` + t : null) : e || null;
	};
}));
var y = __commonJSMin(((e, t) => {
	t.exports = Error;
}));
var b = __commonJSMin(((e, t) => {
	var n = y();
	t.exports = function() {
		var e = n.prepareStackTrace;
		n.prepareStackTrace = function(e, t) {
			return t;
		};
		var t = new n().stack;
		return n.prepareStackTrace = e, t[2].getFileName();
	};
}));
var x = __commonJSMin(((e, t) => {
	var n = process.platform === `win32`, r = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/, i = {};
	function a(e) {
		return r.exec(e).slice(1);
	}
	i.parse = function(e) {
		if (typeof e != `string`) throw TypeError(`Parameter 'pathString' must be a string, not ` + typeof e);
		var t = a(e);
		if (!t || t.length !== 5) throw TypeError(`Invalid path '` + e + `'`);
		return {
			root: t[1],
			dir: t[0] === t[1] ? t[0] : t[0].slice(0, -1),
			base: t[2],
			ext: t[4],
			name: t[3]
		};
	};
	var o = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/, s = {};
	function c(e) {
		return o.exec(e).slice(1);
	}
	s.parse = function(e) {
		if (typeof e != `string`) throw TypeError(`Parameter 'pathString' must be a string, not ` + typeof e);
		var t = c(e);
		if (!t || t.length !== 5) throw TypeError(`Invalid path '` + e + `'`);
		return {
			root: t[1],
			dir: t[0].slice(0, -1),
			base: t[2],
			ext: t[4],
			name: t[3]
		};
	}, t.exports = n ? i.parse : s.parse, t.exports.posix = s.parse, t.exports.win32 = i.parse;
}));
var S = __commonJSMin(((e, n) => {
	var r = __require(`path`), i = r.parse || x(), a = /^([A-Za-z]:)/, o = /^\\\\/;
	function s(e, t) {
		var n = `/`;
		a.test(e) ? n = `` : o.test(e) && (n = `\\\\`);
		for (var s = [e], c = i(e); c.dir !== s[s.length - 1];) s.push(c.dir), c = i(c.dir);
		return s.reduce(function(e, i) {
			return e.concat(t.map(function(e) {
				return r.resolve(n, i, e);
			}));
		}, []);
	}
	n.exports = function(e, t, n) {
		var r = t && t.moduleDirectory ? [].concat(t.moduleDirectory) : [`node_modules`];
		if (t && typeof t.paths == `function`) return t.paths(n, e, function() {
			return s(e, r);
		}, t);
		var i = s(e, r);
		return t && t.paths ? i.concat(t.paths) : i;
	};
}));
var C = __commonJSMin(((e, t) => {
	t.exports = function(e, t) {
		return t || {};
	};
}));
var w = __commonJSMin(((e, t) => {
	var n = Object.prototype.toString, r = Math.max, i = `[object Function]`, a = function(e, t) {
		for (var n = [], r = 0; r < e.length; r += 1) n[r] = e[r];
		for (var i = 0; i < t.length; i += 1) n[i + e.length] = t[i];
		return n;
	}, o = function(e, t) {
		for (var n = [], r = t || 0, i = 0; r < e.length; r += 1, i += 1) n[i] = e[r];
		return n;
	}, s = function(e, t) {
		for (var n = ``, r = 0; r < e.length; r += 1) n += e[r], r + 1 < e.length && (n += t);
		return n;
	};
	t.exports = function(e) {
		var t = this;
		if (typeof t != `function` || n.apply(t) !== i) throw TypeError(`Function.prototype.bind called on incompatible ` + t);
		for (var c = o(arguments, 1), l, u = function() {
			if (this instanceof l) {
				var n = t.apply(this, a(c, arguments));
				return Object(n) === n ? n : this;
			}
			return t.apply(e, a(c, arguments));
		}, d = r(0, t.length - c.length), f = [], p = 0; p < d; p++) f[p] = `$` + p;
		if (l = Function(`binder`, `return function (` + s(f, `,`) + `){ return binder.apply(this,arguments); }`)(u), t.prototype) {
			var m = function() {};
			m.prototype = t.prototype, l.prototype = new m(), m.prototype = null;
		}
		return l;
	};
}));
var T = __commonJSMin(((e, t) => {
	var n = w();
	t.exports = Function.prototype.bind || n;
}));
var E = __commonJSMin(((e, t) => {
	var n = Function.prototype.call, r = Object.prototype.hasOwnProperty;
	t.exports = T().call(n, r);
}));
var D = __commonJSMin(((e, t) => {
	t.exports = {
		assert: !0,
		"node:assert": [`>= 14.18 && < 15`, `>= 16`],
		"assert/strict": `>= 15`,
		"node:assert/strict": `>= 16`,
		async_hooks: `>= 8`,
		"node:async_hooks": [`>= 14.18 && < 15`, `>= 16`],
		buffer_ieee754: `>= 0.5 && < 0.9.7`,
		buffer: !0,
		"node:buffer": [`>= 14.18 && < 15`, `>= 16`],
		child_process: !0,
		"node:child_process": [`>= 14.18 && < 15`, `>= 16`],
		cluster: `>= 0.5`,
		"node:cluster": [`>= 14.18 && < 15`, `>= 16`],
		console: !0,
		"node:console": [`>= 14.18 && < 15`, `>= 16`],
		constants: !0,
		"node:constants": [`>= 14.18 && < 15`, `>= 16`],
		crypto: !0,
		"node:crypto": [`>= 14.18 && < 15`, `>= 16`],
		_debug_agent: `>= 1 && < 8`,
		_debugger: `< 8`,
		dgram: !0,
		"node:dgram": [`>= 14.18 && < 15`, `>= 16`],
		diagnostics_channel: [`>= 14.17 && < 15`, `>= 15.1`],
		"node:diagnostics_channel": [`>= 14.18 && < 15`, `>= 16`],
		dns: !0,
		"node:dns": [`>= 14.18 && < 15`, `>= 16`],
		"dns/promises": `>= 15`,
		"node:dns/promises": `>= 16`,
		domain: `>= 0.7.12`,
		"node:domain": [`>= 14.18 && < 15`, `>= 16`],
		events: !0,
		"node:events": [`>= 14.18 && < 15`, `>= 16`],
		"node:ffi": `>= 26.9`,
		freelist: `< 6`,
		fs: !0,
		"node:fs": [`>= 14.18 && < 15`, `>= 16`],
		"fs/promises": [`>= 10 && < 10.1`, `>= 14`],
		"node:fs/promises": [`>= 14.18 && < 15`, `>= 16`],
		_http_agent: `>= 0.11.1`,
		"node:_http_agent": [`>= 14.18 && < 15`, `>= 16`],
		_http_client: `>= 0.11.1`,
		"node:_http_client": [`>= 14.18 && < 15`, `>= 16`],
		_http_common: `>= 0.11.1`,
		"node:_http_common": [`>= 14.18 && < 15`, `>= 16`],
		_http_incoming: `>= 0.11.1`,
		"node:_http_incoming": [`>= 14.18 && < 15`, `>= 16`],
		_http_outgoing: `>= 0.11.1`,
		"node:_http_outgoing": [`>= 14.18 && < 15`, `>= 16`],
		_http_server: `>= 0.11.1`,
		"node:_http_server": [`>= 14.18 && < 15`, `>= 16`],
		http: !0,
		"node:http": [`>= 14.18 && < 15`, `>= 16`],
		http2: `>= 8.8`,
		"node:http2": [`>= 14.18 && < 15`, `>= 16`],
		https: !0,
		"node:https": [`>= 14.18 && < 15`, `>= 16`],
		inspector: `>= 8`,
		"node:inspector": [`>= 14.18 && < 15`, `>= 16`],
		"inspector/promises": [`>= 19`],
		"node:inspector/promises": [`>= 19`],
		_linklist: `< 8`,
		module: !0,
		"node:module": [`>= 14.18 && < 15`, `>= 16`],
		net: !0,
		"node:net": [`>= 14.18 && < 15`, `>= 16`],
		"node-inspect/lib/_inspect": `>= 7.6 && < 12`,
		"node-inspect/lib/internal/inspect_client": `>= 7.6 && < 12`,
		"node-inspect/lib/internal/inspect_repl": `>= 7.6 && < 12`,
		os: !0,
		"node:os": [`>= 14.18 && < 15`, `>= 16`],
		path: !0,
		"node:path": [`>= 14.18 && < 15`, `>= 16`],
		"path/posix": `>= 15.3`,
		"node:path/posix": `>= 16`,
		"path/win32": `>= 15.3`,
		"node:path/win32": `>= 16`,
		perf_hooks: `>= 8.5`,
		"node:perf_hooks": [`>= 14.18 && < 15`, `>= 16`],
		process: `>= 1`,
		"node:process": [`>= 14.18 && < 15`, `>= 16`],
		punycode: `>= 0.5`,
		"node:punycode": [`>= 14.18 && < 15`, `>= 16`],
		querystring: !0,
		"node:querystring": [`>= 14.18 && < 15`, `>= 16`],
		readline: !0,
		"node:readline": [`>= 14.18 && < 15`, `>= 16`],
		"readline/promises": `>= 17`,
		"node:readline/promises": `>= 17`,
		repl: !0,
		"node:repl": [`>= 14.18 && < 15`, `>= 16`],
		"node:sea": [`>= 20.12 && < 21`, `>= 21.7`],
		smalloc: `>= 0.11.5 && < 3`,
		"node:sqlite": [`>= 22.13 && < 23`, `>= 23.4`],
		_stream_duplex: `>= 0.9.4 && < 26`,
		"node:_stream_duplex": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_transform: `>= 0.9.4 && < 26`,
		"node:_stream_transform": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_wrap: `>= 1.4.1 && < 26`,
		"node:_stream_wrap": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_passthrough: `>= 0.9.4 && < 26`,
		"node:_stream_passthrough": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_readable: `>= 0.9.4 && < 26`,
		"node:_stream_readable": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_writable: `>= 0.9.4 && < 26`,
		"node:_stream_writable": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		stream: !0,
		"node:stream": [`>= 14.18 && < 15`, `>= 16`],
		"stream/consumers": `>= 16.7`,
		"node:stream/consumers": `>= 16.7`,
		"stream/promises": `>= 15`,
		"node:stream/promises": `>= 16`,
		"stream/web": `>= 16.5`,
		"node:stream/web": `>= 16.5`,
		string_decoder: !0,
		"node:string_decoder": [`>= 14.18 && < 15`, `>= 16`],
		sys: [`>= 0.4 && < 0.7`, `>= 0.8`],
		"node:sys": [`>= 14.18 && < 15`, `>= 16`],
		"test/reporters": `>= 19.9 && < 20.2`,
		"node:test/reporters": [
			`>= 18.17 && < 19`,
			`>= 19.9`,
			`>= 20`
		],
		"test/mock_loader": `>= 22.3 && < 22.7`,
		"node:test/mock_loader": `>= 22.3 && < 22.7`,
		"node:test": [`>= 16.17 && < 17`, `>= 18`],
		timers: !0,
		"node:timers": [`>= 14.18 && < 15`, `>= 16`],
		"timers/promises": `>= 15`,
		"node:timers/promises": `>= 16`,
		_tls_common: `>= 0.11.13`,
		"node:_tls_common": [`>= 14.18 && < 15`, `>= 16`],
		_tls_legacy: `>= 0.11.3 && < 10`,
		_tls_wrap: `>= 0.11.3`,
		"node:_tls_wrap": [`>= 14.18 && < 15`, `>= 16`],
		tls: !0,
		"node:tls": [`>= 14.18 && < 15`, `>= 16`],
		trace_events: `>= 10`,
		"node:trace_events": [`>= 14.18 && < 15`, `>= 16`],
		tty: !0,
		"node:tty": [`>= 14.18 && < 15`, `>= 16`],
		url: !0,
		"node:url": [`>= 14.18 && < 15`, `>= 16`],
		util: !0,
		"node:util": [`>= 14.18 && < 15`, `>= 16`],
		"util/types": `>= 15.3`,
		"node:util/types": `>= 16`,
		"v8/tools/arguments": `>= 10 && < 12`,
		"v8/tools/codemap": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/consarray": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/csvparser": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/logreader": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/profile_view": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/splaytree": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		v8: `>= 1`,
		"node:v8": [`>= 14.18 && < 15`, `>= 16`],
		vm: !0,
		"node:vm": [`>= 14.18 && < 15`, `>= 16`],
		wasi: [
			`>= 13.4 && < 13.5`,
			`>= 18.17 && < 19`,
			`>= 20`
		],
		"node:wasi": [`>= 18.17 && < 19`, `>= 20`],
		worker_threads: `>= 11.7`,
		"node:worker_threads": [`>= 14.18 && < 15`, `>= 16`],
		zlib: `>= 0.5`,
		"node:zlib": [`>= 14.18 && < 15`, `>= 16`]
	};
}));
var O = __commonJSMin(((e, t) => {
	var n = E();
	function r(e, t) {
		for (var n = e.split(`.`), r = t.split(` `), i = r.length > 1 ? r[0] : `=`, a = (r.length > 1 ? r[1] : r[0]).split(`.`), o = 0; o < 3; ++o) {
			var s = parseInt(n[o] || `0`, 10), c = parseInt(a[o] || `0`, 10);
			if (s !== c) return i === `<` ? s < c : i === `>=` && s >= c;
		}
		return i === `>=`;
	}
	function i(e, t) {
		var n = t.split(/ ?&& ?/);
		if (n.length === 0) return !1;
		for (var i = 0; i < n.length; ++i) if (!r(e, n[i])) return !1;
		return !0;
	}
	function a(e, t) {
		if (typeof t == `boolean`) return t;
		var n = e === void 0 ? process.versions && process.versions.node : e;
		if (typeof n != `string`) throw TypeError(e === void 0 ? `Unable to determine current node version` : `If provided, a valid node version is required`);
		if (t && typeof t == `object`) {
			for (var r = 0; r < t.length; ++r) if (i(n, t[r])) return !0;
			return !1;
		}
		return i(n, t);
	}
	var o = D();
	t.exports = function(e, t) {
		return n(o, e) && a(t, o[e]);
	};
}));
var k = __commonJSMin(((e, t) => {
	t.exports = TypeError;
}));
var A = __commonJSMin(((e, n) => {
	var r = __require(`fs`), i = v(), a = __require(`path`), o = b(), s = S(), c = C(), l = O(), u = y(), d = k(), f = process.platform !== `win32` && r.realpath && typeof r.realpath.native == `function` ? r.realpath.native : r.realpath, p = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/, m = /^\w:[/\\]*$/, h = /[/\\]node_modules[/\\]*$/, g = i();
	function _() {
		return g ? [a.join(g, `.node_modules`), a.join(g, `.node_libraries`)] : [];
	}
	var x = function(e, t) {
		r.stat(e, function(e, n) {
			return e ? e.code === `ENOENT` || e.code === `ENOTDIR` ? t(null, !1) : t(e) : t(null, n.isFile() || n.isFIFO());
		});
	}, w = function(e, t) {
		r.stat(e, function(e, n) {
			return e ? e.code === `ENOENT` || e.code === `ENOTDIR` ? t(null, !1) : t(e) : t(null, n.isDirectory());
		});
	}, T = function(e, t) {
		f(e, function(n, r) {
			n && n.code !== `ENOENT` ? t(n) : t(null, n ? e : r);
		});
	};
	function E(e, t, n, r) {
		n && n.preserveSymlinks === !1 ? e(t, r) : r(null, t);
	}
	function D(e, t, n) {
		e(t, function(e, t) {
			if (e) n(e);
			else try {
				n(null, JSON.parse(t));
			} catch {
				n(null);
			}
		});
	}
	function A(e, t, n) {
		for (var r = s(t, n, e), i = 0; i < r.length; i++) r[i] = a.join(r[i], e);
		return r;
	}
	n.exports = function(e, t, n) {
		var i = n, s = t;
		if (typeof t == `function` && (i = s, s = {}), typeof e != `string`) {
			var f = new d(`Path must be a string.`);
			return process.nextTick(function() {
				i(f);
			});
		}
		s = c(e, s);
		var g = s.isFile || x, v = s.isDirectory || w, y = s.readFile || r.readFile, b = s.realpath || T, S = s.readPackage || D;
		if (s.readFile && s.readPackage) {
			var C = new d("`readFile` and `readPackage` are mutually exclusive.");
			return process.nextTick(function() {
				i(C);
			});
		}
		var O = s.packageIterator, k = s.extensions || [`.js`], j = s.includeCoreModules !== !1, M = s.basedir || a.dirname(o()), N = s.filename || M;
		s.paths = s.paths || _(), E(b, a.resolve(M), s, function(e, t) {
			e ? i(e) : F(t);
		});
		var P;
		function F(t) {
			if (p.test(e)) P = a.resolve(t, e), (e === `.` || e === `..` || e.slice(-1) === `/`) && (P += `/`), e.slice(-1) === `/` && P === t ? z(P, s.package, I) : L(P, s.package, I);
			else if (j && l(e)) return i(null, e);
			else ee(e, t, function(t, n, r) {
				if (t) i(t);
				else if (n) return E(b, n, s, function(e, t) {
					e ? i(e) : i(null, t, r);
				});
				else {
					var a = new u(`Cannot find module '` + e + `' from '` + N + `'`);
					a.code = `MODULE_NOT_FOUND`, i(a);
				}
			});
		}
		function I(t, n, r) {
			t ? i(t) : n ? i(null, n, r) : z(P, function(t, n, r) {
				if (t) i(t);
				else if (n) E(b, n, s, function(e, t) {
					e ? i(e) : i(null, t, r);
				});
				else {
					var a = new u(`Cannot find module '` + e + `' from '` + N + `'`);
					a.code = `MODULE_NOT_FOUND`, i(a);
				}
			});
		}
		function L(e, t, n) {
			var r = t, i = n;
			typeof r == `function` && (i = r, r = void 0), o([``].concat(k), e, r);
			function o(e, t, n) {
				if (e.length === 0) return i(null, void 0, n);
				var r = t + e[0], c = n;
				c ? l(null, c) : R(a.dirname(r), l);
				function l(n, l, d) {
					if (c = l, n) return i(n);
					if (d && c && s.pathFilter) {
						var f = a.relative(d, r), p = f.slice(0, f.length - e[0].length), m = s.pathFilter(c, t, p);
						if (m) return o([``].concat(k), a.resolve(d, m), c);
					}
					g(r, u);
				}
				function u(n, a) {
					if (n) return i(n);
					if (a) return i(null, r, c);
					o(e.slice(1), t, c);
				}
			}
		}
		function R(e, t) {
			if (e === `` || e === `/` || process.platform === `win32` && m.test(e) || h.test(e)) return t(null);
			E(b, e, s, function(n, r) {
				if (n) return R(a.dirname(e), t);
				var i = a.join(r, `package.json`);
				g(i, function(n, r) {
					if (!r) return R(a.dirname(e), t);
					S(y, i, function(n, r) {
						if (n) return t(n);
						var a = r;
						a && s.packageFilter && (a = s.packageFilter(a, i)), t(null, a, e);
					});
				});
			});
		}
		function z(e, t, n) {
			var r = n, i = t;
			typeof i == `function` && (r = i, i = s.package), E(b, e, s, function(t, n) {
				if (t) return r(t);
				var o = a.join(n, `package.json`);
				g(o, function(t, n) {
					if (t) return r(t);
					if (!n) return L(a.join(e, `index`), i, r);
					S(y, o, function(t, n) {
						if (t) return r(t);
						var i = n;
						if (i && s.packageFilter && (i = s.packageFilter(i, o)), i && i.main) {
							if (typeof i.main != `string`) {
								var c = new d(`package “` + i.name + "” `main` must be a string");
								return c.code = `INVALID_PACKAGE_MAIN`, r(c);
							}
							(i.main === `.` || i.main === `./`) && (i.main = `index`), L(a.resolve(e, i.main), i, function(t, n, i) {
								if (t) return r(t);
								if (n) return r(null, n, i);
								if (!i) return L(a.join(e, `index`), i, r);
								z(a.resolve(e, i.main), i, function(t, n, i) {
									if (t) return r(t);
									if (n) return r(null, n, i);
									L(a.join(e, `index`), i, r);
								});
							});
						} else L(a.join(e, `/index`), i, r);
					});
				});
			});
		}
		function B(e, t) {
			if (t.length === 0) return e(null, void 0);
			var n = t[0];
			v(a.dirname(n), r);
			function r(r, a) {
				if (r) return e(r);
				if (!a) return B(e, t.slice(1));
				L(n, s.package, i);
			}
			function i(t, r, i) {
				if (t) return e(t);
				if (r) return e(null, r, i);
				z(n, s.package, o);
			}
			function o(n, r, i) {
				if (n) return e(n);
				if (r) return e(null, r, i);
				B(e, t.slice(1));
			}
		}
		function ee(e, t, n) {
			var r = function() {
				return A(e, t, s);
			};
			B(n, O ? O(e, t, r, s) : r());
		}
	};
}));
var j = __commonJSMin(((e, t) => {
	t.exports = {
		assert: !0,
		"node:assert": [`>= 14.18 && < 15`, `>= 16`],
		"assert/strict": `>= 15`,
		"node:assert/strict": `>= 16`,
		async_hooks: `>= 8`,
		"node:async_hooks": [`>= 14.18 && < 15`, `>= 16`],
		buffer_ieee754: `>= 0.5 && < 0.9.7`,
		buffer: !0,
		"node:buffer": [`>= 14.18 && < 15`, `>= 16`],
		child_process: !0,
		"node:child_process": [`>= 14.18 && < 15`, `>= 16`],
		cluster: `>= 0.5`,
		"node:cluster": [`>= 14.18 && < 15`, `>= 16`],
		console: !0,
		"node:console": [`>= 14.18 && < 15`, `>= 16`],
		constants: !0,
		"node:constants": [`>= 14.18 && < 15`, `>= 16`],
		crypto: !0,
		"node:crypto": [`>= 14.18 && < 15`, `>= 16`],
		_debug_agent: `>= 1 && < 8`,
		_debugger: `< 8`,
		dgram: !0,
		"node:dgram": [`>= 14.18 && < 15`, `>= 16`],
		diagnostics_channel: [`>= 14.17 && < 15`, `>= 15.1`],
		"node:diagnostics_channel": [`>= 14.18 && < 15`, `>= 16`],
		dns: !0,
		"node:dns": [`>= 14.18 && < 15`, `>= 16`],
		"dns/promises": `>= 15`,
		"node:dns/promises": `>= 16`,
		domain: `>= 0.7.12`,
		"node:domain": [`>= 14.18 && < 15`, `>= 16`],
		events: !0,
		"node:events": [`>= 14.18 && < 15`, `>= 16`],
		"node:ffi": `>= 26.9`,
		freelist: `< 6`,
		fs: !0,
		"node:fs": [`>= 14.18 && < 15`, `>= 16`],
		"fs/promises": [`>= 10 && < 10.1`, `>= 14`],
		"node:fs/promises": [`>= 14.18 && < 15`, `>= 16`],
		_http_agent: `>= 0.11.1`,
		"node:_http_agent": [`>= 14.18 && < 15`, `>= 16`],
		_http_client: `>= 0.11.1`,
		"node:_http_client": [`>= 14.18 && < 15`, `>= 16`],
		_http_common: `>= 0.11.1`,
		"node:_http_common": [`>= 14.18 && < 15`, `>= 16`],
		_http_incoming: `>= 0.11.1`,
		"node:_http_incoming": [`>= 14.18 && < 15`, `>= 16`],
		_http_outgoing: `>= 0.11.1`,
		"node:_http_outgoing": [`>= 14.18 && < 15`, `>= 16`],
		_http_server: `>= 0.11.1`,
		"node:_http_server": [`>= 14.18 && < 15`, `>= 16`],
		http: !0,
		"node:http": [`>= 14.18 && < 15`, `>= 16`],
		http2: `>= 8.8`,
		"node:http2": [`>= 14.18 && < 15`, `>= 16`],
		https: !0,
		"node:https": [`>= 14.18 && < 15`, `>= 16`],
		inspector: `>= 8`,
		"node:inspector": [`>= 14.18 && < 15`, `>= 16`],
		"inspector/promises": [`>= 19`],
		"node:inspector/promises": [`>= 19`],
		_linklist: `< 8`,
		module: !0,
		"node:module": [`>= 14.18 && < 15`, `>= 16`],
		net: !0,
		"node:net": [`>= 14.18 && < 15`, `>= 16`],
		"node-inspect/lib/_inspect": `>= 7.6 && < 12`,
		"node-inspect/lib/internal/inspect_client": `>= 7.6 && < 12`,
		"node-inspect/lib/internal/inspect_repl": `>= 7.6 && < 12`,
		os: !0,
		"node:os": [`>= 14.18 && < 15`, `>= 16`],
		path: !0,
		"node:path": [`>= 14.18 && < 15`, `>= 16`],
		"path/posix": `>= 15.3`,
		"node:path/posix": `>= 16`,
		"path/win32": `>= 15.3`,
		"node:path/win32": `>= 16`,
		perf_hooks: `>= 8.5`,
		"node:perf_hooks": [`>= 14.18 && < 15`, `>= 16`],
		process: `>= 1`,
		"node:process": [`>= 14.18 && < 15`, `>= 16`],
		punycode: `>= 0.5`,
		"node:punycode": [`>= 14.18 && < 15`, `>= 16`],
		querystring: !0,
		"node:querystring": [`>= 14.18 && < 15`, `>= 16`],
		readline: !0,
		"node:readline": [`>= 14.18 && < 15`, `>= 16`],
		"readline/promises": `>= 17`,
		"node:readline/promises": `>= 17`,
		repl: !0,
		"node:repl": [`>= 14.18 && < 15`, `>= 16`],
		"node:sea": [`>= 20.12 && < 21`, `>= 21.7`],
		smalloc: `>= 0.11.5 && < 3`,
		"node:sqlite": [`>= 22.13 && < 23`, `>= 23.4`],
		_stream_duplex: `>= 0.9.4 && < 26`,
		"node:_stream_duplex": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_transform: `>= 0.9.4 && < 26`,
		"node:_stream_transform": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_wrap: `>= 1.4.1 && < 26`,
		"node:_stream_wrap": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_passthrough: `>= 0.9.4 && < 26`,
		"node:_stream_passthrough": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_readable: `>= 0.9.4 && < 26`,
		"node:_stream_readable": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		_stream_writable: `>= 0.9.4 && < 26`,
		"node:_stream_writable": [`>= 14.18 && < 15`, `>= 16 && < 26`],
		stream: !0,
		"node:stream": [`>= 14.18 && < 15`, `>= 16`],
		"stream/consumers": `>= 16.7`,
		"node:stream/consumers": `>= 16.7`,
		"stream/promises": `>= 15`,
		"node:stream/promises": `>= 16`,
		"stream/web": `>= 16.5`,
		"node:stream/web": `>= 16.5`,
		string_decoder: !0,
		"node:string_decoder": [`>= 14.18 && < 15`, `>= 16`],
		sys: [`>= 0.4 && < 0.7`, `>= 0.8`],
		"node:sys": [`>= 14.18 && < 15`, `>= 16`],
		"test/reporters": `>= 19.9 && < 20.2`,
		"node:test/reporters": [
			`>= 18.17 && < 19`,
			`>= 19.9`,
			`>= 20`
		],
		"test/mock_loader": `>= 22.3 && < 22.7`,
		"node:test/mock_loader": `>= 22.3 && < 22.7`,
		"node:test": [`>= 16.17 && < 17`, `>= 18`],
		timers: !0,
		"node:timers": [`>= 14.18 && < 15`, `>= 16`],
		"timers/promises": `>= 15`,
		"node:timers/promises": `>= 16`,
		_tls_common: `>= 0.11.13`,
		"node:_tls_common": [`>= 14.18 && < 15`, `>= 16`],
		_tls_legacy: `>= 0.11.3 && < 10`,
		_tls_wrap: `>= 0.11.3`,
		"node:_tls_wrap": [`>= 14.18 && < 15`, `>= 16`],
		tls: !0,
		"node:tls": [`>= 14.18 && < 15`, `>= 16`],
		trace_events: `>= 10`,
		"node:trace_events": [`>= 14.18 && < 15`, `>= 16`],
		tty: !0,
		"node:tty": [`>= 14.18 && < 15`, `>= 16`],
		url: !0,
		"node:url": [`>= 14.18 && < 15`, `>= 16`],
		util: !0,
		"node:util": [`>= 14.18 && < 15`, `>= 16`],
		"util/types": `>= 15.3`,
		"node:util/types": `>= 16`,
		"v8/tools/arguments": `>= 10 && < 12`,
		"v8/tools/codemap": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/consarray": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/csvparser": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/logreader": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/profile_view": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		"v8/tools/splaytree": [`>= 4.4 && < 5`, `>= 5.2 && < 12`],
		v8: `>= 1`,
		"node:v8": [`>= 14.18 && < 15`, `>= 16`],
		vm: !0,
		"node:vm": [`>= 14.18 && < 15`, `>= 16`],
		wasi: [
			`>= 13.4 && < 13.5`,
			`>= 18.17 && < 19`,
			`>= 20`
		],
		"node:wasi": [`>= 18.17 && < 19`, `>= 20`],
		worker_threads: `>= 11.7`,
		"node:worker_threads": [`>= 14.18 && < 15`, `>= 16`],
		zlib: `>= 0.5`,
		"node:zlib": [`>= 14.18 && < 15`, `>= 16`]
	};
}));
var M = __commonJSMin(((e, t) => {
	var n = O(), r = j(), i = {};
	for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (i[a] = n(a));
	t.exports = i;
}));
var N = __commonJSMin(((e, t) => {
	var n = O();
	t.exports = function(e) {
		return n(e);
	};
}));
var P = __commonJSMin(((e, n) => {
	var r = O(), i = __require(`fs`), a = __require(`path`), o = y(), s = k(), c = v(), l = b(), u = S(), d = C(), f = process.platform !== `win32` && i.realpathSync && typeof i.realpathSync.native == `function` ? i.realpathSync.native : i.realpathSync, p = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/, m = /^\w:[/\\]*$/, h = /[/\\]node_modules[/\\]*$/, g = c();
	function _() {
		return g ? [a.join(g, `.node_modules`), a.join(g, `.node_libraries`)] : [];
	}
	var x = function(e) {
		try {
			var t = i.statSync(e, { throwIfNoEntry: !1 });
		} catch (e) {
			if (e && (e.code === `ENOENT` || e.code === `ENOTDIR`)) return !1;
			throw e;
		}
		return !!t && (t.isFile() || t.isFIFO());
	}, w = function(e) {
		try {
			var t = i.statSync(e, { throwIfNoEntry: !1 });
		} catch (e) {
			if (e && (e.code === `ENOENT` || e.code === `ENOTDIR`)) return !1;
			throw e;
		}
		return !!t && t.isDirectory();
	}, T = function(e) {
		try {
			return f(e);
		} catch (e) {
			if (e.code !== `ENOENT`) throw e;
		}
		return e;
	};
	function E(e, t, n) {
		return n && n.preserveSymlinks === !1 ? e(t) : t;
	}
	function D(e, t) {
		var n = e(t);
		try {
			return JSON.parse(n);
		} catch {}
	}
	function A(e, t, n) {
		for (var r = u(t, n, e), i = 0; i < r.length; i++) r[i] = a.join(r[i], e);
		return r;
	}
	n.exports = function(e, t) {
		if (typeof e != `string`) throw new s(`Path must be a string.`);
		var n = d(e, t), c = n.isFile || x, u = n.readFileSync || i.readFileSync, f = n.isDirectory || w, g = n.realpathSync || T, v = n.readPackageSync || D;
		if (n.readFileSync && n.readPackageSync) throw new s("`readFileSync` and `readPackageSync` are mutually exclusive.");
		var y = n.packageIterator, b = n.extensions || [`.js`], S = n.includeCoreModules !== !1, C = n.basedir || a.dirname(l()), O = n.filename || C;
		n.paths = n.paths || _();
		var k = E(g, a.resolve(C), n);
		if (p.test(e)) {
			var j = a.resolve(k, e);
			(e === `.` || e === `..` || e.slice(-1) === `/`) && (j += `/`);
			var M = F(j) || L(j);
			if (M) return E(g, M, n);
		} else if (S && r(e)) return e;
		else {
			var N = R(e, k);
			if (N) return E(g, N, n);
		}
		var P = new o(`Cannot find module '` + e + `' from '` + O + `'`);
		throw P.code = `MODULE_NOT_FOUND`, P;
		function F(e) {
			var t = I(a.dirname(e));
			if (t && t.dir && t.pkg && n.pathFilter) {
				var r = a.relative(t.dir, e), i = n.pathFilter(t.pkg, e, r);
				i && (e = a.resolve(t.dir, i));
			}
			if (c(e)) return e;
			for (var o = 0; o < b.length; o++) {
				var s = e + b[o];
				if (c(s)) return s;
			}
		}
		function I(e) {
			if (e !== `` && e !== `/` && !(process.platform === `win32` && m.test(e)) && !h.test(e)) {
				var t = a.join(E(g, e, n), `package.json`);
				if (!c(t)) return I(a.dirname(e));
				var r = v(u, t);
				return r && n.packageFilter && (r = n.packageFilter(r, e)), {
					pkg: r,
					dir: e
				};
			}
		}
		function L(e) {
			var t = a.join(E(g, e, n), `/package.json`);
			if (c(t)) {
				try {
					var r = v(u, t);
				} catch {}
				if (r && n.packageFilter && (r = n.packageFilter(r, e)), r && r.main) {
					if (typeof r.main != `string`) {
						var i = new s(`package “` + r.name + "” `main` must be a string");
						throw i.code = `INVALID_PACKAGE_MAIN`, i;
					}
					(r.main === `.` || r.main === `./`) && (r.main = `index`);
					try {
						var o = F(a.resolve(e, r.main));
						if (o) return o;
						var l = L(a.resolve(e, r.main));
						if (l) return l;
					} catch {}
				}
			}
			return F(a.join(e, `/index`));
		}
		function R(e, t) {
			for (var r = function() {
				return A(e, t, n);
			}, i = y ? y(e, t, r, n) : r(), o = 0; o < i.length; o++) {
				var s = i[o];
				if (f(a.dirname(s))) {
					var c = F(s);
					if (c) return c;
					var l = L(s);
					if (l) return l;
				}
			}
		}
	};
}));
var F = __commonJSMin(((e, t) => {
	var n = A();
	n.core = M(), n.isCore = N(), n.sync = P(), t.exports = n;
}));
var I = __toESM(g(), 1);
var L = __toESM(_(), 1);
var R = __toESM(F(), 1);
var z = `16.0.3`;
var B = { rollup: `^2.78.0||^3.0.0||^4.0.0` };
promisify(fs4.access);
var ee = promisify(fs4.readFile);
var te = promisify(fs4.realpath);
var V = promisify(fs4.stat);
async function ne(e) {
	try {
		return (await V(e)).isFile();
	} catch {
		return !1;
	}
}
async function H(e) {
	return await ne(e) ? te(e) : e;
}
var U = (e) => {
	if (e.code === `ENOENT`) return !1;
	throw e;
};
var W = (e) => {
	let t = /* @__PURE__ */ new Map(), n = async (n, r) => {
		t.has(n) === !1 && t.set(n, e(n).catch((e) => {
			throw t.delete(n), e;
		}));
		try {
			return r(null, await t.get(n));
		} catch (e) {
			return r(e);
		}
	};
	return n.clear = () => t.clear(), n;
};
var G = W(async (e) => {
	try {
		return (await V(e)).isDirectory();
	} catch (e) {
		return U(e);
	}
});
var K = W(async (e) => {
	try {
		return (await V(e)).isFile();
	} catch (e) {
		return U(e);
	}
});
var q = W(ee);
function J(e) {
	let t = [];
	if (e.customResolveOptions) {
		let { customResolveOptions: n } = e;
		if (n.moduleDirectory && (e.moduleDirectories = Array.isArray(n.moduleDirectory) ? n.moduleDirectory : [n.moduleDirectory], t.push("node-resolve: The `customResolveOptions.moduleDirectory` option has been deprecated. Use `moduleDirectories`, which must be an array.")), n.preserveSymlinks) throw Error("node-resolve: `customResolveOptions.preserveSymlinks` is no longer an option. We now always use the rollup `preserveSymlinks` option.");
		[
			`basedir`,
			`package`,
			`extensions`,
			`includeCoreModules`,
			`readFile`,
			`isFile`,
			`isDirectory`,
			`realpath`,
			`packageFilter`,
			`pathFilter`,
			`paths`,
			`packageIterator`
		].forEach((e) => {
			if (n[e]) throw Error(`node-resolve: \`customResolveOptions.${e}\` is no longer an option. If you need this, please open an issue.`);
		});
	}
	return { warnings: t };
}
function Y(e) {
	if (e.startsWith(`.`) || e.startsWith(`/`)) return null;
	let t = e.split(`/`);
	return t[0][0] === `@` ? `${t[0]}/${t[1]}` : t[0];
}
function re(e) {
	let t;
	if (e.mainFields ? {mainFields: t} = e : t = [`module`, `main`], e.browser && t.indexOf(`browser`) === -1) return [`browser`].concat(t);
	if (!t.length) throw Error("Please ensure at least one `mainFields` value is specified");
	return t;
}
function ie(e) {
	let { cache: t, extensions: n, pkg: i, mainFields: o, preserveSymlinks: l, useBrowserOverrides: d, rootDir: f, ignoreSideEffectsForRoot: p } = e, { pkgPath: m } = e;
	if (t.has(m)) return t.get(m);
	l || (m = realpathSync(m));
	let h = dirname(m), g = {
		packageJson: { ...i },
		packageJsonPath: m,
		root: h,
		resolvedMainField: `main`,
		browserMappedMain: !1,
		resolvedEntryPoint: ``
	}, _ = !1;
	for (let e = 0; e < o.length; e++) {
		let t = o[e];
		if (typeof i[t] == `string`) {
			i.main = i[t], g.resolvedMainField = t, _ = !0;
			break;
		}
	}
	let v = {
		cachedPkg: i,
		hasModuleSideEffects: () => null,
		hasPackageEntry: _ !== !1 || o.indexOf(`main`) !== -1,
		packageBrowserField: d && typeof i.browser == `object` && Object.keys(i.browser).reduce((e, t) => {
			let r = i.browser[t];
			if (r && r[0] === `.` && (r = resolve(h, r)), e[t] = r, t[0] === `.`) {
				let i = resolve(h, t);
				e[i] = r, extname(t) || n.reduce((e, n) => (e[i + n] = e[t], e), e);
			}
			return e;
		}, {}),
		packageInfo: g
	}, y = v.packageBrowserField;
	if (d && typeof i.browser == `object` && y.hasOwnProperty(i.main) ? (g.resolvedEntryPoint = y[i.main], g.browserMappedMain = !0) : (g.resolvedEntryPoint = resolve(h, i.main || `index.js`), g.browserMappedMain = !1), !p || f !== h) {
		let e = i.sideEffects;
		if (typeof e == `boolean`) v.hasModuleSideEffects = () => e;
		else if (Array.isArray(e)) {
			let t = e.map((e) => e.includes(`/`) ? e : `**/${e}`);
			v.hasModuleSideEffects = createFilter(t, null, { resolve: h });
		}
	}
	return t.set(m, v), v;
}
function ae(e) {
	return Array.isArray(e) ? e : typeof e == `object` ? Object.values(e) : [e];
}
function oe(e, t) {
	return t.some((t) => e.endsWith(t));
}
async function se(e, t) {
	let { root: n } = path10.parse(e), r = e;
	for (; r !== n && !oe(r, t);) {
		let e = path10.join(r, `package.json`);
		if (await ne(e)) {
			let t = fs4.readFileSync(e, `utf-8`);
			return {
				pkgJson: JSON.parse(t),
				pkgPath: r,
				pkgJsonPath: e
			};
		}
		r = path10.resolve(r, `..`);
	}
	return null;
}
function ce(e) {
	try {
		return !!new URL(e);
	} catch {
		return !1;
	}
}
function le(e) {
	return typeof e == `object` && Object.keys(e).every((e) => !e.startsWith(`.`));
}
function ue(e) {
	return typeof e == `object` && !le(e);
}
function de(e) {
	let t = Object.keys(e);
	return t.some((e) => e.startsWith(`.`)) && t.some((e) => !e.startsWith(`.`));
}
function fe(e, t) {
	return `Could not resolve import "${e}" in ${t}`;
}
function pe(e, t, n) {
	let { importSpecifier: r, importer: i, pkgJsonPath: a } = e;
	return `${fe(r, i)} using ${n ? `imports` : `exports`} defined in ${a}.${t ? ` ${t}` : ``}`;
}
var X = class extends Error {};
var me = class extends X {
	constructor(e, t) {
		super(pe(e, `Invalid "exports" field. ${t}`));
	}
};
var Z = class extends X {
	constructor(e, t, n) {
		super(pe(e, n, t));
	}
};
var Q = class extends X {
	constructor(e, t) {
		super(pe(e, t));
	}
};
function he(e, t) {
	let n = [
		``,
		`.`,
		`..`,
		...t
	];
	return e.some((e) => n.includes(e) || n.includes(decodeURI(e)));
}
async function $(e, { target: t, patternMatch: n, isImports: r }) {
	if (typeof t == `string`) {
		if (!t.startsWith(`./`)) {
			if (!r || [`/`, `../`].some((e) => t.startsWith(e)) || ce(t)) throw new Q(e, `Invalid mapping: "${t}".`);
			if (typeof n == `string`) {
				let r = await e.resolveId(t.replace(/\*/g, n), e.pkgURL.href);
				return r ? pathToFileURL(r.location).href : null;
			}
			let i = await e.resolveId(t, e.pkgURL.href);
			return i ? pathToFileURL(i.location).href : null;
		}
		e.allowExportsFolderMapping && (t = t.replace(/\/$/, `/*`));
		{
			let n = t.split(/\/|\\/), r = n.indexOf(`.`);
			if (r !== -1 && n.slice(r), r !== -1 && r < n.length - 1 && he(n.slice(r + 1), e.moduleDirs)) throw new Q(e, `Invalid mapping: "${t}".`);
		}
		let i = new URL(t, e.pkgURL);
		if (!i.href.startsWith(e.pkgURL.href)) throw new Q(e, `Resolved to ${i.href} which is outside package ${e.pkgURL.href}`);
		if (!n) return i;
		if (he(n.split(/\/|\\/), e.moduleDirs)) throw new Z(e);
		return i.href.replace(/\*/g, n);
	}
	if (Array.isArray(t)) {
		if (t.length === 0) return null;
		let i = null;
		for (let a of t) try {
			let t = await $(e, {
				target: a,
				patternMatch: n,
				isImports: r
			});
			if (t !== void 0) return t;
		} catch (e) {
			if (e instanceof Q) i = e;
			else throw e;
		}
		if (i) throw i;
		return null;
	}
	if (t && typeof t == `object`) {
		for (let [i, a] of Object.entries(t)) if (i === "default" || e.conditions.includes(i)) {
			let t = await $(e, {
				target: a,
				patternMatch: n,
				isImports: r
			});
			if (t !== void 0) return t;
		}
	} else {
		if (t === null) return null;
		throw new Q(e, `Invalid exports field.`);
	}
}
function ge(e, t) {
	let n = e.includes(`*`) ? e.indexOf(`*`) + 1 : e.length, r = (t.includes(`*`) ? t.indexOf(`*`) + 1 : t.length) - n;
	return r === 0 ? e.includes(`*`) ? t.includes(`*`) ? t.length - e.length : -1 : 1 : r;
}
async function _e(e, { matchKey: t, matchObj: n, isImports: r }) {
	if (!t.includes(`*`) && t in n) {
		let i = n[t];
		return await $(e, {
			target: i,
			patternMatch: ``,
			isImports: r
		});
	}
	let i = Object.keys(n).filter((e) => e.endsWith(`/`) || e.includes(`*`)).sort(ge);
	for (let a of i) {
		let i = a.indexOf(`*`), o = i === -1 ? a : a.substring(0, i);
		if (t.startsWith(o) && t !== o) {
			let s = i === -1 ? `` : a.substring(i + 1);
			if (s.length === 0 || t.endsWith(s) && t.length >= a.length) {
				let i = n[a];
				return await $(e, {
					target: i,
					patternMatch: t.substring(o.length, t.length - s.length),
					isImports: r
				});
			}
		}
	}
	throw new Z(e, r);
}
async function ve(e, t, n) {
	if (de(n)) throw new me(e, `All keys must either start with ./, or without one.`);
	if (t === `.`) {
		let t;
		if (typeof n == `string` || Array.isArray(n) || le(n) ? t = n : ue(n) && (t = n[`.`]), t) {
			let n = await $(e, {
				target: t,
				patternMatch: ``,
				isImports: !1
			});
			if (n) return n;
		}
	} else if (ue(n)) {
		let r = await _e(e, {
			matchKey: t,
			matchObj: n,
			isImports: !1
		});
		if (r) return r;
	}
	throw new Z(e);
}
async function ye({ importSpecifier: e, importer: t, moduleDirs: n, conditions: r, resolveId: i }) {
	let a = await se(t, n);
	if (!a) throw Error(`${fe(e, t)}. Could not find a parent package.json.`);
	let { pkgPath: o, pkgJsonPath: s, pkgJson: c } = a, l = {
		importer: t,
		importSpecifier: e,
		moduleDirs: n,
		pkgURL: pathToFileURL(`${o}/`),
		pkgJsonPath: s,
		conditions: r,
		resolveId: i
	};
	if (!e.startsWith(`#`) || e === `#` || e.startsWith(`#/`)) throw new Z(l, !0, `Invalid import specifier.`);
	let { imports: u } = c;
	if (!u) throw new Z(l, !0);
	return _e(l, {
		matchKey: e,
		matchObj: u,
		isImports: !0
	});
}
var be = promisify(R.default);
var xe = promisify(fs4.readFile);
async function Se(e, t, n, r) {
	if (e) {
		let n = await se(e, r);
		if (n && n.pkgJson.name === t) return n;
	}
	try {
		let e = await be(`${t}/package.json`, n);
		return {
			pkgJsonPath: e,
			pkgJson: JSON.parse(await xe(e, `utf-8`)),
			pkgPath: dirname(e)
		};
	} catch {
		return null;
	}
}
async function Ce({ importSpecifier: e, packageInfoCache: t, extensions: n, mainFields: r, preserveSymlinks: i, useBrowserOverrides: a, baseDir: o, moduleDirectories: s, modulePaths: c, rootDir: l, ignoreSideEffectsForRoot: u }) {
	let d = () => null, f = !0, p = !1, m, h = {
		basedir: o,
		readFile: q,
		isFile: K,
		isDirectory: G,
		extensions: n,
		includeCoreModules: !1,
		moduleDirectory: s,
		paths: c,
		preserveSymlinks: i,
		packageFilter: (e, o) => {
			let s = ie({
				cache: t,
				extensions: n,
				pkg: e,
				pkgPath: o,
				mainFields: r,
				preserveSymlinks: i,
				useBrowserOverrides: a,
				rootDir: l,
				ignoreSideEffectsForRoot: u
			});
			return {packageInfo: m, hasModuleSideEffects: d, hasPackageEntry: f, packageBrowserField: p} = s, s.cachedPkg;
		}
	}, g;
	try {
		g = await be(e, h);
	} catch (e) {
		if (e.code !== `MODULE_NOT_FOUND`) throw e;
		return null;
	}
	return {
		location: i ? g : await H(g),
		hasModuleSideEffects: d,
		hasPackageEntry: f,
		packageBrowserField: p,
		packageInfo: m
	};
}
async function we({ importer: e, importSpecifier: t, exportConditions: n, packageInfoCache: r, extensions: i, mainFields: a, preserveSymlinks: o, useBrowserOverrides: s, baseDir: c, moduleDirectories: l, modulePaths: u, rootDir: d, ignoreSideEffectsForRoot: m, allowExportsFolderMapping: h }) {
	if (t.startsWith(`#`)) {
		let p = await ye({
			importSpecifier: t,
			importer: e,
			moduleDirs: l,
			conditions: n,
			resolveId(t) {
				return Ee({
					importer: e,
					importSpecifierList: [t],
					exportConditions: n,
					packageInfoCache: r,
					extensions: i,
					mainFields: a,
					preserveSymlinks: o,
					useBrowserOverrides: s,
					baseDir: c,
					moduleDirectories: l,
					modulePaths: u,
					rootDir: d,
					ignoreSideEffectsForRoot: m,
					allowExportsFolderMapping: h
				});
			}
		});
		if (p == null) throw new X(`Could not resolve import "${t}" in ${e} using imports.`);
		let g = fileURLToPath(p);
		return {
			location: o ? g : await H(g),
			hasModuleSideEffects: () => null,
			hasPackageEntry: !0,
			packageBrowserField: !1,
			packageInfo: void 0
		};
	}
	let g = Y(t);
	if (g) {
		let _ = () => null, v = !0, y = !1, b, x = await Se(e, g, {
			basedir: c,
			readFile: q,
			isFile: K,
			isDirectory: G,
			extensions: i,
			includeCoreModules: !1,
			moduleDirectory: l,
			paths: u,
			preserveSymlinks: o,
			packageFilter: (e, t) => {
				let n = ie({
					cache: r,
					extensions: i,
					pkg: e,
					pkgPath: t,
					mainFields: a,
					preserveSymlinks: o,
					useBrowserOverrides: s,
					rootDir: d,
					ignoreSideEffectsForRoot: m
				});
				return {packageInfo: b, hasModuleSideEffects: _, hasPackageEntry: v, packageBrowserField: y} = n, n.cachedPkg;
			}
		}, l);
		if (x && x.pkgJson.exports) {
			let { pkgJson: r, pkgJsonPath: i } = x, a = g === t ? `.` : `.${t.substring(g.length)}`, s = i.replace(`package.json`, ``), c = await ve({
				importer: e,
				importSpecifier: t,
				moduleDirs: l,
				pkgURL: pathToFileURL(s),
				pkgJsonPath: i,
				allowExportsFolderMapping: h,
				conditions: n
			}, a, r.exports), u = fileURLToPath(c);
			if (u) return {
				location: o ? u : await H(u),
				hasModuleSideEffects: _,
				hasPackageEntry: v,
				packageBrowserField: y,
				packageInfo: b
			};
		}
	}
	return null;
}
async function Te({ importer: e, importSpecifierList: t, exportConditions: n, warn: r, packageInfoCache: i, extensions: a, mainFields: o, preserveSymlinks: s, useBrowserOverrides: c, baseDir: l, moduleDirectories: u, modulePaths: d, rootDir: f, ignoreSideEffectsForRoot: p }) {
	for (let m = 0; m < t.length; m++) {
		let h = await Ce({
			importer: e,
			importSpecifier: t[m],
			exportConditions: n,
			warn: r,
			packageInfoCache: i,
			extensions: a,
			mainFields: o,
			preserveSymlinks: s,
			useBrowserOverrides: c,
			baseDir: l,
			moduleDirectories: u,
			modulePaths: d,
			rootDir: f,
			ignoreSideEffectsForRoot: p
		});
		if (h) return h;
	}
	return null;
}
async function Ee({ importer: e, importSpecifierList: t, exportConditions: n, warn: r, packageInfoCache: i, extensions: a, mainFields: o, preserveSymlinks: s, useBrowserOverrides: c, baseDir: l, moduleDirectories: u, modulePaths: d, rootDir: f, ignoreSideEffectsForRoot: p, allowExportsFolderMapping: m }) {
	try {
		let r = await we({
			importer: e,
			importSpecifier: t[0],
			exportConditions: n,
			packageInfoCache: i,
			extensions: a,
			mainFields: o,
			preserveSymlinks: s,
			useBrowserOverrides: c,
			baseDir: l,
			moduleDirectories: u,
			modulePaths: d,
			rootDir: f,
			ignoreSideEffectsForRoot: p,
			allowExportsFolderMapping: m
		});
		if (r) return r;
	} catch (e) {
		if (e instanceof X) return r(e), null;
		throw e;
	}
	return Te({
		importer: e,
		importSpecifierList: t,
		exportConditions: n,
		warn: r,
		packageInfoCache: i,
		extensions: a,
		mainFields: o,
		preserveSymlinks: s,
		useBrowserOverrides: c,
		baseDir: l,
		moduleDirectories: u,
		modulePaths: d,
		rootDir: f,
		ignoreSideEffectsForRoot: p
	});
}
var De = /\^(\d+\.\d+\.\d+)/g;
function Oe(e, t) {
	let n = 1 / 0, r = 1 / 0, i = 1 / 0, a;
	for (; a = De.exec(t);) {
		let [e, t, o] = a[1].split(`.`).map(Number);
		e < n && (n = e, r = t, i = o);
	}
	if (!e) throw Error(`Insufficient Rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${n}.${r}.${i}.`);
	let [o, s, c] = e.split(`.`).map(Number);
	if (o < n || o === n && (s < r || s === r && c < i)) throw Error(`Insufficient rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${n}.${r}.${i} but found rollup@${e}.`);
}
var ke = `\0node-resolve:empty.js`;
var Ae = (e) => {
	Object.freeze(e);
	for (let t of Object.values(e)) typeof t == `object` && !Object.isFrozen(t) && Ae(t);
	return e;
};
var je = [`default`, `module`];
var Me = [...je, `import`];
var Ne = [...je, `require`];
var Pe = {
	dedupe: [],
	extensions: [
		`.mjs`,
		`.js`,
		`.json`,
		`.node`
	],
	resolveOnly: [],
	moduleDirectories: [`node_modules`],
	modulePaths: [],
	ignoreSideEffectsForRoot: !1,
	allowExportsFolderMapping: !0
};
var Fe = /^node:/;
Ae((0, I.default)({}, Pe));
function Ie(e = {}) {
	let { warnings: t } = J(e), n = {
		...Pe,
		...e
	}, { extensions: r, jail: i, moduleDirectories: a, modulePaths: o, ignoreSideEffectsForRoot: c } = n, f = n.exportConditions || [], p = f.includes(`development`) || f.includes(`production`) ? [] : [`production`], h = [
		...Me,
		...f,
		...p
	], g = [
		...Ne,
		...f,
		...p
	], _ = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), y = re(n), b = y.indexOf(`browser`) !== -1, x = Object.prototype.hasOwnProperty.call(n, `preferBuiltins`), S = !x || n.preferBuiltins, C = resolve(n.rootDir || process.cwd()), { dedupe: w } = n, T;
	if (a.some((e) => e.includes(`/`))) throw Error("`moduleDirectories` option must only contain directory names. If you want to load modules from somewhere not supported by the default module resolution algorithm, see `modulePaths`.");
	typeof w != `function` && (w = (e) => n.dedupe.includes(e) || n.dedupe.includes(Y(e)));
	let E = typeof n.resolveOnly == `function` ? n.resolveOnly : ((e) => {
		let t = e.map((e) => {
			if (e instanceof RegExp) return e;
			let t = e.replace(/[\\^$*+?.()|[\]{}]/g, `\\$&`);
			return RegExp(`^${t}$`);
		});
		return (e) => !t.length || t.some((t) => t.test(e));
	})(n.resolveOnly), D = /* @__PURE__ */ new Map(), O, k = async (e, t, f, p) => {
		let [k, A] = t.split(`?`), j = `${A ? `?${A}` : ``}`;
		t = k;
		let M = !f || w(t) ? C : dirname(f), N = D.get(f);
		if (b && N) {
			let e = resolve(M, t);
			if (N[t] === !1 || N[e] === !1) return { id: ke };
			let n = t[0] !== `.` && N[t] || N[e] || N[`${e}.js`] || N[`${e}.json`];
			n && (t = n);
		}
		let P = t.split(/[/\\]/), F = P.shift(), I = !1;
		if (F[0] === `@` && P.length > 0 ? F += `/${P.shift()}` : F[0] === `.` && (F = resolve(M, t), I = !0), !I && !E(F)) return ae(T.input).includes(t) ? null : !1;
		let R = [t];
		if (f === void 0 && t[0] && !t[0].match(/^\.?\.?\//) && R.push(`./${t}`), f && /\.(ts|mts|cts|tsx)$/.test(f)) for (let [e, n] of [
			[`.js`, `.ts`],
			[`.js`, `.tsx`],
			[`.jsx`, `.tsx`],
			[`.mjs`, `.mts`],
			[`.cjs`, `.cts`]
		]) t.endsWith(e) && r.includes(n) && R.push(t.slice(0, -e.length) + n);
		let z = (...t) => e.warn(...t), B = p && p[`node-resolve`] && p[`node-resolve`].isRequire ? g : h;
		b && !B.includes(`browser`) && B.push(`browser`);
		let V = await Ee({
			importer: f,
			importSpecifierList: R,
			exportConditions: B,
			warn: z,
			packageInfoCache: _,
			extensions: r,
			mainFields: y,
			preserveSymlinks: O,
			useBrowserOverrides: b,
			baseDir: M,
			moduleDirectories: a,
			modulePaths: o,
			rootDir: C,
			ignoreSideEffectsForRoot: c,
			allowExportsFolderMapping: n.allowExportsFolderMapping
		}), H = builtinModules.includes(t.replace(Fe, ``)), U = typeof S == `function` ? S(t) : S, W = H && U ? {
			packageInfo: void 0,
			hasModuleSideEffects: () => null,
			hasPackageEntry: !0,
			packageBrowserField: !1
		} : V;
		if (!W) return null;
		let { packageInfo: G, hasModuleSideEffects: K, hasPackageEntry: q, packageBrowserField: J } = W, { location: Y } = W;
		if (J) {
			if (Object.prototype.hasOwnProperty.call(J, Y)) {
				if (!J[Y]) return D.set(Y, J), { id: ke };
				Y = J[Y];
			}
			D.set(Y, J);
		}
		if (q && !O && await ne(Y) && (Y = await te(Y)), v.set(Y, G), q) {
			if (H && U) return !x && V && W !== t && e.warn({
				message: `preferring built-in module '${t}' over local alternative at '${V.location}', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning.or passing a function to 'preferBuiltins' to provide more fine-grained control over which built-in modules to prefer.`,
				pluginCode: `PREFER_BUILTINS`
			}), !1;
			if (i && Y.indexOf(normalize(i.trim(sep))) !== 0) return null;
		}
		if (n.modulesOnly && await ne(Y)) {
			let e = await ee(Y, `utf-8`);
			return (0, L.default)(e) ? {
				id: `${Y}${j}`,
				moduleSideEffects: K(Y)
			} : null;
		}
		return {
			id: `${Y}${j}`,
			moduleSideEffects: K(Y)
		};
	};
	return {
		name: `node-resolve`,
		version: z,
		buildStart(e) {
			Oe(this.meta.rollupVersion, B.rollup), T = e;
			for (let e of t) this.warn(e);
			({preserveSymlinks: O} = e);
		},
		generateBundle() {
			q.clear(), K.clear(), G.clear();
		},
		resolveId: {
			order: `post`,
			async handler(e, t, n) {
				if (e === ke) return e;
				if (e && e.includes(`\0`)) return null;
				let { custom: r = {} } = n, { "node-resolve": { resolved: i } = {} } = r;
				if (i) return i;
				t && t.includes(`\0`) && (t = void 0);
				let a = await k(this, e, t, r);
				if (a) {
					let i = await this.resolve(a.id, t, {
						...n,
						skipSelf: !1,
						custom: {
							...r,
							"node-resolve": {
								...r[`node-resolve`],
								resolved: a,
								importee: e
							}
						}
					});
					if (i) return i.external ? !1 : i.id === a.id ? {
						...a,
						meta: i.meta
					} : i;
				}
				return a;
			}
		},
		load(e) {
			return e === ke ? `export default {};` : null;
		},
		getPackageInfoForId(e) {
			return v.get(e);
		}
	};
}
// node_modules/nitro/dist/_build/rollup.mjs
var getRollupConfig = async (nitro) => {
	const base = await baseBuildConfig(nitro);
	const tsc = nitro.options.typescript.tsConfig?.compilerOptions;
	let config = {
		input: nitro.options.entry,
		external: [...base.env.external],
		plugins: await withBuildPlugins(nitro, [
			...await baseBuildPlugins(nitro, base),
			await oxc(nitro, {
				sourcemap: !!nitro.options.sourcemap,
				minify: nitro.options.minify ? { ...nitro.options.oxc?.minify } : false,
				transform: {
					target: "esnext",
					cwd: nitro.options.rootDir,
					...nitro.options.oxc?.transform,
					jsx: {
						runtime: tsc?.jsx === "react" ? "classic" : "automatic",
						pragma: tsc?.jsxFactory,
						pragmaFrag: tsc?.jsxFragmentFactory,
						importSource: tsc?.jsxImportSource,
						development: nitro.options.dev,
						...nitro.options.oxc?.transform?.jsx
					}
				}
			}),
			a({ entries: base.aliases }),
			Ie({
				extensions: base.extensions,
				preferBuiltins: !!nitro.options.node,
				rootDir: nitro.options.rootDir,
				exportConditions: nitro.options.exportConditions
			}),
			Je({ ...nitro.options.commonJS }),
			n(),
			l(base.env.inject),
			nitro.options.node && await assetUrls(nitro)
		]),
		onwarn(warning, rollupWarn) {
			if (!base.ignoreWarningCodes.has(warning.code || "")) rollupWarn(warning);
		},
		output: {
			format: "esm",
			importAttributesKey: "with",
			entryFileNames: "index.mjs",
			chunkFileNames: (chunk) => getChunkName(chunk, nitro),
			dir: nitro.options.output.serverDir,
			inlineDynamicImports: nitro.options.inlineDynamicImports,
			generatedCode: { constBindings: true },
			sourcemap: nitro.options.sourcemap,
			sourcemapExcludeSources: true,
			sourcemapIgnoreList: (id) => id.includes("node_modules"),
			manualChunks(id) {
				if (NODE_MODULES_RE.test(id)) return libChunkName(id);
			}
		}
	};
	config = O$2(nitro.options.rollupConfig, config);
	const outputConfig = config.output;
	if (outputConfig.inlineDynamicImports || outputConfig.format === "iife") delete outputConfig.manualChunks;
	return config;
};
function formatRollupError(_error) {
	try {
		const logs = [_error.toString()];
		const errors = _error?.errors || [_error];
		for (const error of errors) {
			const id = error.path || error.id || _error.id;
			let path = isAbsolute$2(id) ? relative$2(process.cwd(), id) : id;
			const location = error.loc;
			if (location) path += `:${location.line}:${location.column}`;
			const text = error.frame;
			logs.push(`Rollup error while processing \`${path}\`` + text ? "\n\n" + text : "");
		}
		return logs.join("\n");
	} catch {
		return _error?.toString();
	}
}
function importRollup(nitro) {
	return importDep({
		id: "rollup",
		dir: nitro.options.rootDir,
		deps: nitro.options.deps
	});
}
async function watchDev(nitro, rollupConfig) {
	const rollup = await importRollup(nitro);
	let rollupWatcher;
	async function load() {
		if (rollupWatcher) await rollupWatcher.close();
		await scanHandlers(nitro);
		nitro.routing.sync();
		rollupWatcher = startRollupWatcher(nitro, rollupConfig);
	}
	const reload = t(load);
	const scanDirs = nitro.options.scanDirs.flatMap((dir) => [
		join$2(dir, nitro.options.apiDir || "api"),
		join$2(dir, nitro.options.routesDir || "routes"),
		join$2(dir, "middleware"),
		join$2(dir, "plugins"),
		join$2(dir, "modules")
	]);
	const watchReloadEvents = /* @__PURE__ */ new Set([
		"add",
		"addDir",
		"unlink",
		"unlinkDir"
	]);
	const scanDirsWatcher = createWatcher(nitro, scanDirs, { ignoreInitial: true }).on("all", (event, path, stat) => {
		if (watchReloadEvents.has(event)) reload();
	});
	const serverEntryRe = /^server\.[mc]?[jt]sx?$/;
	const rootDirWatcher = createWatcher(nitro, nitro.options.rootDir, {
		ignoreInitial: true,
		depth: 0
	}).on("all", (event, path) => {
		if (watchReloadEvents.has(event) && serverEntryRe.test(basename$2(path))) reload();
	});
	nitro.hooks.hook("close", () => {
		rollupWatcher.close();
		scanDirsWatcher.close();
		rootDirWatcher.close();
	});
	nitro.hooks.hook("build:reload", () => reload());
	nitro.logger.info(`Starting dev watcher (builder: \`rollup\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
	await load();
	function startRollupWatcher(nitro, rollupConfig) {
		const watcher = rollup.watch(O$2(rollupConfig, { watch: { chokidar: nitro.options.watchOptions } }));
		let start;
		watcher.on("event", (event) => {
			switch (event.code) {
				case "START":
					start = Date.now();
					nitro.hooks.callHook("dev:start");
					break;
				case "BUNDLE_END":
					nitro.hooks.callHook("compiled", nitro);
					if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built`, start ? `in ${Date.now() - start}ms` : "");
					nitro.hooks.callHook("dev:reload");
					break;
				case "ERROR":
					nitro.logger.error(formatRollupError(event.error));
					nitro.hooks.callHook("dev:error", event.error);
			}
		});
		return watcher;
	}
}
async function buildProduction(nitro, rollupConfig) {
	const rollup = await importRollup(nitro);
	const buildStartTime = Date.now();
	await scanHandlers(nitro);
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	let output;
	if (!nitro.options.static) {
		nitro.logger.info(`Building server (builder: \`rollup\`, preset: \`${nitro.options.preset}\`, compatibility date: \`${r(nitro.options.compatibilityDate)}\`)`);
		output = await (await rollup.rollup(rollupConfig).catch((error) => {
			nitro.logger.error(formatRollupError(error));
			throw error;
		})).write(rollupConfig.output);
	}
	await writeBuildInfo(nitro, output);
	if (!nitro.options.static) {
		if (nitro.options.logging.buildSuccess) nitro.logger.success(`Server built in ${Date.now() - buildStartTime}ms`);
		if (nitro.options.logLevel > 1) process.stdout.write(await generateFSTree(nitro.options.output.serverDir, { compressedSizes: nitro.options.logging.compressedSizes }) || "");
	}
	await nitro.hooks.callHook("compiled", nitro);
	nitro.logger.success("You can preview this build using `npx nitro preview`");
	if (nitro.options.commands.deploy) nitro.logger.success("You can deploy this build using `npx nitro deploy --prebuilt`");
}
async function rollupBuild(nitro) {
	await nitro.hooks.callHook("build:before", nitro);
	const config = await getRollupConfig(nitro);
	await nitro.hooks.callHook("build:config", nitro, {
		builder: "rollup",
		rollup: config
	});
	return nitro.options.dev ? watchDev(nitro, config) : buildProduction(nitro, config);
}
export { rollupBuild };
