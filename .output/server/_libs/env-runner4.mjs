import { X } from "./env-runner.mjs";
import { pathToFileURL } from "node:url";
// node_modules/env-runner/dist/_chunks/common-runtime-deps.mjs
function n(e) {
	return typeof e == `string` || e instanceof URL;
}
function r(n, r = process.cwd()) {
	if (n instanceof URL) return n.href;
	if (n.includes(`://`)) return n;
	let i = X(n, {
		from: r.endsWith(`/`) ? r : r + `/`,
		try: !0
	});
	return i ? pathToFileURL(i).href : n;
}
async function i(e) {
	let { name: t, option: i, value: o, expect: s, from: c, required: l, hint: u } = e;
	if (o !== !1) {
		if (o !== void 0) {
			if (!n(o)) return a(o, s, t, i);
			let e = typeof o == `string` ? o : o.href, l;
			try {
				l = await import(r(o, c));
			} catch (n) {
				throw TypeError(`[env-runner] failed to import \`${t}\` from the \`${i}\` specifier "${e}".`, { cause: n });
			}
			return a(l, s, t, i);
		}
		try {
			return a(await import(r(t, c)), s, t, i);
		} catch (e) {
			if (l) throw TypeError(`[env-runner] the \`${t}\` package is required: install it, or pass it as the \`${i}\` option (the imported module or a specifier).` + (u ? ` ${u}` : ``), { cause: e });
			return;
		}
	}
}
function a(e, t, n, r) {
	if (t && typeof e?.[t] != `function`) throw TypeError(`[env-runner] the \`${r}\` option does not export \`${t}\` — pass the imported \`${n}\` package or a specifier for it.`);
	return e;
}
function o(e, t, i) {
	if (e === !1) return !1;
	if (e !== void 0) {
		if (!n(e)) throw TypeError(`[env-runner] the \`${t}\` option must be a module specifier (string or URL): the package is imported inside the worker, so an imported module cannot be passed. Use \`import.meta.resolve()\`.`);
		return r(e, i);
	}
}
export { i, o };
