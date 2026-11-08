import { dirname$2, isAbsolute$2, join$2, normalize$2, resolve$2, resolveModulePath } from "./common.mjs";
import { de, ne, x as x$1 } from "./confbox.mjs";
import { promises, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
// node_modules/nitro/dist/_libs/pkg-types.mjs
var p = {
	startingFrom: `.`,
	rootPattern: /^node_modules$/,
	reverse: !1,
	test: (e) => {
		try {
			if (statSync(e).isFile()) return !0;
		} catch {}
	}
};
async function m(e, t = {}) {
	let r = Array.isArray(e) ? e : [e], a = {
		...p,
		...t
	}, o = resolve$2(a.startingFrom), s = o[0] === `/`, c = o.split(`/`).filter(Boolean);
	if (r.includes(c.at(-1)) && await a.test(o)) return o;
	s && (c[0] = `/` + c[0]);
	let l = c.findIndex((e) => e.match(a.rootPattern));
	if (l === -1 && (l = 0), a.reverse) for (let e = l + 1; e <= c.length; e++) for (let t of r) {
		let r = join$2(...c.slice(0, e), t);
		if (await a.test(r)) return r;
	}
	else for (let e = c.length; e > l; e--) for (let t of r) {
		let r = join$2(...c.slice(0, e), t);
		if (await a.test(r)) return r;
	}
	throw Error(`Cannot find matching ${e} in ${a.startingFrom} or parent directories`);
}
function h(e, t = {}) {
	return m(e, t);
}
function g(e, n = {}) {
	return e instanceof URL || e.startsWith(`file://`) ? normalize$2(fileURLToPath(e)) : isAbsolute$2(e) ? normalize$2(e) : resolveModulePath(e, {
		...n,
		from: n.from || n.parent || n.url
	});
}
var _ = [
	`yarn.lock`,
	`package-lock.json`,
	`pnpm-lock.yaml`,
	`npm-shrinkwrap.json`,
	`bun.lockb`,
	`bun.lock`,
	`deno.lock`,
	`upm.lock`
];
var v = [
	`package.json`,
	`package.json5`,
	`package.yaml`
];
var y = [
	`pnpm-workspace.yaml`,
	`lerna.json`,
	`turbo.json`,
	`rush.json`,
	`deno.json`,
	`deno.jsonc`
];
var b = /* @__PURE__ */ new Map();
async function x(e, t = {}) {
	let n = await S(e, t), r = t.cache && typeof t.cache != `boolean` ? t.cache : b;
	if (t.cache && r.has(n)) return r.get(n);
	let i = await promises.readFile(n, `utf8`), a;
	try {
		a = x$1(i);
	} catch {
		a = ne(i);
	}
	return r.set(n, a), a;
}
async function S(e = process.cwd(), t = {}) {
	return h(`package.json`, {
		...t,
		startingFrom: g(e, t)
	});
}
var C = {
	workspaceFile: (t) => m(y, t).then((t) => dirname$2(t)),
	gitConfig: (e) => m(`.git/config`, e).then((e) => resolve$2(e, `../..`)),
	lockFile: (t) => m(_, t).then((t) => dirname$2(t)),
	packageJson: (t) => m(v, t).then((t) => dirname$2(t))
};
async function w(e = process.cwd(), t = {}) {
	let n = g(e, t), r = t.tests || [
		`workspaceFile`,
		`gitConfig`,
		`lockFile`,
		`packageJson`
	];
	for (let e of r) {
		let r = C[e];
		if (t[e] === !1 || !r) continue;
		let i = t[e] || (e === `gitConfig` ? `closest` : `furthest`), a = await r({
			...t,
			startingFrom: n,
			reverse: i === `furthest`
		}).catch(() => {});
		if (a) return a;
	}
	throw Error(`Cannot detect workspace root from ${e}`);
}
async function T(e, t) {
	return h(`.git/config`, {
		...t,
		startingFrom: g(e, t)
	});
}
async function E(e, t) {
	let n = await T(e, t);
	return k(await readFile(n, `utf8`));
}
var D = (e) => e.replaceAll(/\\(.)/g, `$1`);
var O = (e) => e.replaceAll(`\\`, String.raw`\\`).replaceAll(`.`, String.raw`\.`);
function k(e) {
	return de(e.replaceAll(/^\[(\w+) "(.*)"\]$/gm, (e, t, n) => `[${t}.${O(D(n))}]`));
}
export { E, h, w, x };
