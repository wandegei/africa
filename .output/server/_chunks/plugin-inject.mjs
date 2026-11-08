import { MagicString, attachScopes, createFilter, makeLegalIdentifier, walk } from "./common.mjs";
import { sep } from "path";
// node_modules/nitro/dist/_libs/plugin-inject.mjs
var o = function(e) {
	return e.replace(/[-[\]/{}()*+?.\\^$|]/g, `\\$&`);
};
var s = function(e, t) {
	return e.type === `MemberExpression` ? !e.computed && s(e.object, e) : e.type === `Identifier` ? t.type === `MemberExpression` ? t.computed || e === t.object : !(t.type === `Property` && e !== t.value || t.type === `MethodDefinition` || t.type === `ExportSpecifier` && e !== t.local || t.type === `ImportSpecifier` && e === t.imported) : !1;
};
var c = function(e) {
	for (var t = [], n = e; n.type === `MemberExpression`;) t.unshift(n.property.name), n = n.object;
	var r = n.name;
	return t.unshift(r), {
		name: r,
		keypath: t.join(`.`)
	};
};
function l(l) {
	if (!l) throw Error(`Missing options`);
	var u = createFilter(l.include, l.exclude), d = l.modules;
	d || (d = Object.assign({}, l), delete d.include, delete d.exclude, delete d.sourceMap, delete d.sourcemap);
	var f = new Map(Object.entries(d));
	sep !== `/` && f.forEach(function(e, t) {
		f.set(t, Array.isArray(e) ? [e[0].split(sep).join(`/`), e[1]] : e.split(sep).join(`/`));
	});
	var p = RegExp(`(?:` + Array.from(f.keys()).map(o).join(`|`) + `)`, `g`), m = l.sourceMap !== !1 && l.sourcemap !== !1;
	return {
		name: `inject`,
		transform: function(n, o) {
			if (!u(o) || n.search(p) === -1) return null;
			sep !== `/` && (o = o.split(sep).join(`/`));
			var l = null;
			try {
				l = this.parse(n);
			} catch {
				this.warn({
					code: `PARSE_ERROR`,
					message: `rollup-plugin-inject: failed to parse ` + o + `. Consider restricting the plugin to particular files via options.include`
				});
			}
			if (!l) return null;
			var d = /* @__PURE__ */ new Set();
			l.body.forEach(function(e) {
				e.type === `ImportDeclaration` && e.specifiers.forEach(function(e) {
					d.add(e.local.name);
				});
			});
			var h = attachScopes(l, `scope`), g = new MagicString(n), _ = /* @__PURE__ */ new Map();
			function v(e, t, n) {
				var i = f.get(n);
				if (i && !d.has(t) && !h.contains(t)) {
					if (typeof i == `string` && (i = [i, `default`]), i[0] === o) return !1;
					var a = n + `:` + i[0] + `:` + i[1], s = t === n ? t : makeLegalIdentifier(`$inject_` + n);
					if (!_.has(a)) {
						var c = i[0].replace(/[''\\]/g, `\\$&`);
						i[1] === `*` ? _.set(a, `import * as ` + s + ` from '` + c + `';`) : _.set(a, `import { ` + i[1] + ` as ` + s + ` } from '` + c + `';`);
					}
					return t !== n && g.overwrite(e.start, e.end, s, { storeName: !0 }), !0;
				}
				return !1;
			}
			if (walk(l, {
				enter: function(e, t) {
					if (m && (g.addSourcemapLocation(e.start), g.addSourcemapLocation(e.end)), e.scope && (h = e.scope), e.type === `Property` && e.shorthand && e.value.type === `Identifier`) {
						var n = e.key.name;
						v(e, n, n), this.skip();
					} else if (s(e, t)) {
						var r = c(e), i = r.name, a = r.keypath;
						v(e, i, a) && this.skip();
					}
				},
				leave: function(e) {
					e.scope && (h = h.parent);
				}
			}), _.size === 0) return {
				code: n,
				ast: l,
				map: m ? g.generateMap({ hires: !0 }) : null
			};
			var y = Array.from(_.values()).join(`

`);
			return g.prepend(y + `

`), {
				code: g.toString(),
				map: m ? g.generateMap({ hires: !0 }) : null
			};
		}
	};
}
export { l };
