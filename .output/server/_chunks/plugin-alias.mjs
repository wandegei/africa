import path from "node:path";
// node_modules/nitro/dist/_libs/plugin-alias.mjs
function t(e, t) {
	return e instanceof RegExp ? e.test(t) : t.length < e.length ? !1 : t === e || t.startsWith(e + `/`);
}
function n({ entries: e, customResolver: t }) {
	if (!e) return [];
	let n = i(t);
	return Array.isArray(e) ? e.map((e) => ({
		find: e.find,
		replacement: e.replacement,
		resolverFunction: i(e.customResolver) || n
	})) : Object.entries(e).map(([e, t]) => ({
		find: e,
		replacement: t,
		resolverFunction: n
	}));
}
function r(e) {
	return typeof e == `function` ? e : e && `handler` in e && typeof e.handler == `function` ? e.handler : null;
}
function i(e) {
	return typeof e == `function` ? e : e ? r(e.resolveId) : null;
}
function a(i = {}) {
	let a = n(i);
	return a.length === 0 ? {
		name: `alias`,
		resolveId: () => null
	} : {
		name: `alias`,
		async buildStart(e) {
			await Promise.all([...Array.isArray(i.entries) ? i.entries : [], i].map(({ customResolver: t }) => t && r(t.buildStart)?.call(this, e)));
		},
		resolveId(n, r, i) {
			let o = a.find((e) => t(e.find, n));
			if (!o) return null;
			let s = typeof o.find == `string` ? n.replace(o.find, () => o.replacement) : n.replace(o.find, o.replacement);
			return o.resolverFunction ? o.resolverFunction.call(this, s, r, i) : this.resolve(s, r, Object.assign({ skipSelf: !0 }, i)).then((t) => t || (path.isAbsolute(s) || this.warn(`rewrote ${n} to ${s} but was not an absolute path and was not handled by other plugins. This will lead to duplicated modules for the same path. To avoid duplicating modules, you should resolve to an absolute path.`), { id: s }));
		}
	};
}
export { a };
