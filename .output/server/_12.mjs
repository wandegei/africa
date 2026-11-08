import "./_chunks/common.mjs";
import { createRequire } from "node:module";
import fs, { lstatSync, realpathSync, statSync } from "node:fs";
import { URL as URL$1, fileURLToPath, pathToFileURL } from "node:url";
import path, { isAbsolute, resolve } from "node:path";
import * as d from "node:fs/promises";
import { access, readFile, writeFile } from "node:fs/promises";
import { createRequire as createRequire$1 } from "module";
import { fileURLToPath as fileURLToPath$1 } from "url";
import { basename as basename$1, dirname as dirname$1, isAbsolute as isAbsolute$1, normalize as normalize$1, posix, relative as relative$1, resolve as resolve$1, sep as sep$1 } from "path";
import * as y from "fs";
import { readdir as readdir$1, readdirSync, realpath as realpath$1, realpathSync as realpathSync$1, stat as stat$2, statSync as statSync$1 } from "fs";
import assert from "node:assert";
import process$1 from "node:process";
import { format, inspect } from "node:util";
// node_modules/nitro/dist/_libs/nf3.mjs
var P = Object.create;
var F = Object.defineProperty;
var I = Object.getOwnPropertyDescriptor;
var L = Object.getOwnPropertyNames;
var ne = Object.getPrototypeOf;
var R = Object.prototype.hasOwnProperty;
var z = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
};
var B = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
var V = (e, t) => {
	let n = {};
	for (var r in e) F(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || F(n, Symbol.toStringTag, { value: `Module` }), n;
};
var re = (e, t, n, r) => {
	if (t && typeof t == `object` || typeof t == `function`) for (var i = L(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !R.call(e, s) && s !== n && F(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = I(t, s)) || r.enumerable
	});
	return e;
};
var H = (e, t, n) => (n = e == null ? {} : P(ne(e)), re(t || !e || !e.__esModule || !R.call(e, `default`) ? F(n, `default`, {
	value: e,
	enumerable: !0
}) : n, e));
var U = (e) => R.call(e, `module.exports`) ? e[`module.exports`] : re(F({}, `__esModule`, { value: !0 }), e);
var W = createRequire(import.meta.url);
var ie = B(((e, t) => {
	(function(n, r) {
		typeof e == `object` && t !== void 0 ? r(e) : typeof define == `function` && define.amd ? define([`exports`], r) : (n ||= self, r(n.estreeWalker = {}));
	})(e, (function(e) {
		class t {
			constructor() {
				this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
					skip: () => this.should_skip = !0,
					remove: () => this.should_remove = !0,
					replace: (e) => this.replacement = e
				};
			}
			replace(e, t, n, r) {
				e && (n === null ? e[t] = r : e[t][n] = r);
			}
			remove(e, t, n) {
				e && (n === null ? delete e[t] : e[t].splice(n, 1));
			}
		}
		class n extends t {
			constructor(e, t) {
				super(), this.enter = e, this.leave = t;
			}
			visit(e, t, n, r) {
				if (e) {
					if (this.enter) {
						let i = this.should_skip, a = this.should_remove, o = this.replacement;
						this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.enter.call(this.context, e, t, n, r), this.replacement && (e = this.replacement, this.replace(t, n, r, e)), this.should_remove && this.remove(t, n, r);
						let s = this.should_skip, c = this.should_remove;
						if (this.should_skip = i, this.should_remove = a, this.replacement = o, s) return e;
						if (c) return null;
					}
					for (let t in e) {
						let n = e[t];
						if (typeof n == `object`) {
							if (Array.isArray(n)) for (let r = 0; r < n.length; r += 1) n[r] !== null && typeof n[r].type == `string` && (this.visit(n[r], e, t, r) || r--);
							else n !== null && typeof n.type == `string` && this.visit(n, e, t, null);
						}
					}
					if (this.leave) {
						let i = this.replacement, a = this.should_remove;
						this.replacement = null, this.should_remove = !1, this.leave.call(this.context, e, t, n, r), this.replacement && (e = this.replacement, this.replace(t, n, r, e)), this.should_remove && this.remove(t, n, r);
						let o = this.should_remove;
						if (this.replacement = i, this.should_remove = a, o) return null;
					}
				}
				return e;
			}
		}
		class r extends t {
			constructor(e, t) {
				super(), this.enter = e, this.leave = t;
			}
			async visit(e, t, n, r) {
				if (e) {
					if (this.enter) {
						let i = this.should_skip, a = this.should_remove, o = this.replacement;
						this.should_skip = !1, this.should_remove = !1, this.replacement = null, await this.enter.call(this.context, e, t, n, r), this.replacement && (e = this.replacement, this.replace(t, n, r, e)), this.should_remove && this.remove(t, n, r);
						let s = this.should_skip, c = this.should_remove;
						if (this.should_skip = i, this.should_remove = a, this.replacement = o, s) return e;
						if (c) return null;
					}
					for (let t in e) {
						let n = e[t];
						if (typeof n == `object`) {
							if (Array.isArray(n)) for (let r = 0; r < n.length; r += 1) n[r] !== null && typeof n[r].type == `string` && (await this.visit(n[r], e, t, r) || r--);
							else n !== null && typeof n.type == `string` && await this.visit(n, e, t, null);
						}
					}
					if (this.leave) {
						let i = this.replacement, a = this.should_remove;
						this.replacement = null, this.should_remove = !1, await this.leave.call(this.context, e, t, n, r), this.replacement && (e = this.replacement, this.replace(t, n, r, e)), this.should_remove && this.remove(t, n, r);
						let o = this.should_remove;
						if (this.replacement = i, this.should_remove = a, o) return null;
					}
				}
				return e;
			}
		}
		function i(e, { enter: t, leave: r }) {
			return new n(t, r).visit(e, null);
		}
		async function a(e, { enter: t, leave: n }) {
			return await new r(t, n).visit(e, null);
		}
		e.asyncWalk = a, e.walk = i, Object.defineProperty(e, "__esModule", { value: !0 });
	}));
}));
var ae = B(((e, t) => {
	let n = `[^\\\\/]`, r = `[^/]`, i = `(?:\\/|$)`, a = `(?:^|\\/)`, o = `\\.{1,2}${i}`, s = {
		DOT_LITERAL: `\\.`,
		PLUS_LITERAL: `\\+`,
		QMARK_LITERAL: `\\?`,
		SLASH_LITERAL: `\\/`,
		ONE_CHAR: `(?=.)`,
		QMARK: r,
		END_ANCHOR: i,
		DOTS_SLASH: o,
		NO_DOT: `(?!\\.)`,
		NO_DOTS: `(?!${a}${o})`,
		NO_DOT_SLASH: `(?!\\.{0,1}${i})`,
		NO_DOTS_SLASH: `(?!${o})`,
		QMARK_NO_DOT: `[^.\\/]`,
		STAR: `${r}*?`,
		START_ANCHOR: a,
		SEP: `/`
	}, c = {
		...s,
		SLASH_LITERAL: `[\\\\/]`,
		QMARK: n,
		STAR: `${n}*?`,
		DOTS_SLASH: `\\.{1,2}(?:[\\\\/]|$)`,
		NO_DOT: `(?!\\.)`,
		NO_DOTS: `(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))`,
		NO_DOT_SLASH: `(?!\\.{0,1}(?:[\\\\/]|$))`,
		NO_DOTS_SLASH: `(?!\\.{1,2}(?:[\\\\/]|$))`,
		QMARK_NO_DOT: `[^.\\\\/]`,
		START_ANCHOR: `(?:^|[\\\\/])`,
		END_ANCHOR: `(?:[\\\\/]|$)`,
		SEP: `\\`
	};
	t.exports = {
		DEFAULT_MAX_EXTGLOB_RECURSION: 0,
		MAX_LENGTH: 65536,
		POSIX_REGEX_SOURCE: {
			__proto__: null,
			alnum: `a-zA-Z0-9`,
			alpha: `a-zA-Z`,
			ascii: `\\x00-\\x7F`,
			blank: ` \\t`,
			cntrl: `\\x00-\\x1F\\x7F`,
			digit: `0-9`,
			graph: `\\x21-\\x7E`,
			lower: `a-z`,
			print: `\\x20-\\x7E `,
			punct: `\\-!"#$%&'()\\*+,./:;<=>?@[\\]^_\`{|}~`,
			space: ` \\t\\r\\n\\v\\f`,
			upper: `A-Z`,
			word: `A-Za-z0-9_`,
			xdigit: `A-Fa-f0-9`
		},
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			__proto__: null,
			"***": `*`,
			"**/**": `**`,
			"**/**/**": `**`
		},
		CHAR_0: 48,
		CHAR_9: 57,
		CHAR_UPPERCASE_A: 65,
		CHAR_LOWERCASE_A: 97,
		CHAR_UPPERCASE_Z: 90,
		CHAR_LOWERCASE_Z: 122,
		CHAR_LEFT_PARENTHESES: 40,
		CHAR_RIGHT_PARENTHESES: 41,
		CHAR_ASTERISK: 42,
		CHAR_AMPERSAND: 38,
		CHAR_AT: 64,
		CHAR_BACKWARD_SLASH: 92,
		CHAR_CARRIAGE_RETURN: 13,
		CHAR_CIRCUMFLEX_ACCENT: 94,
		CHAR_COLON: 58,
		CHAR_COMMA: 44,
		CHAR_DOT: 46,
		CHAR_DOUBLE_QUOTE: 34,
		CHAR_EQUAL: 61,
		CHAR_EXCLAMATION_MARK: 33,
		CHAR_FORM_FEED: 12,
		CHAR_FORWARD_SLASH: 47,
		CHAR_GRAVE_ACCENT: 96,
		CHAR_HASH: 35,
		CHAR_HYPHEN_MINUS: 45,
		CHAR_LEFT_ANGLE_BRACKET: 60,
		CHAR_LEFT_CURLY_BRACE: 123,
		CHAR_LEFT_SQUARE_BRACKET: 91,
		CHAR_LINE_FEED: 10,
		CHAR_NO_BREAK_SPACE: 160,
		CHAR_PERCENT: 37,
		CHAR_PLUS: 43,
		CHAR_QUESTION_MARK: 63,
		CHAR_RIGHT_ANGLE_BRACKET: 62,
		CHAR_RIGHT_CURLY_BRACE: 125,
		CHAR_RIGHT_SQUARE_BRACKET: 93,
		CHAR_SEMICOLON: 59,
		CHAR_SINGLE_QUOTE: 39,
		CHAR_SPACE: 32,
		CHAR_TAB: 9,
		CHAR_UNDERSCORE: 95,
		CHAR_VERTICAL_LINE: 124,
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
		extglobChars(e) {
			return {
				"!": {
					type: `negate`,
					open: `(?:(?!(?:`,
					close: `))${e.STAR})`
				},
				"?": {
					type: `qmark`,
					open: `(?:`,
					close: `)?`
				},
				"+": {
					type: `plus`,
					open: `(?:`,
					close: `)+`
				},
				"*": {
					type: `star`,
					open: `(?:`,
					close: `)*`
				},
				"@": {
					type: `at`,
					open: `(?:`,
					close: `)`
				}
			};
		},
		globChars(e) {
			return e === !0 ? c : s;
		}
	};
}));
var G = B(((e) => {
	let { REGEX_BACKSLASH: t, REGEX_REMOVE_BACKSLASH: n, REGEX_SPECIAL_CHARS: r, REGEX_SPECIAL_CHARS_GLOBAL: i } = ae();
	e.isObject = (e) => typeof e == `object` && !!e && !Array.isArray(e), e.hasRegexChars = (e) => r.test(e), e.isRegexChar = (t) => t.length === 1 && e.hasRegexChars(t), e.escapeRegex = (e) => e.replace(i, `\\$1`), e.toPosixSlashes = (e) => e.replace(t, `/`), e.isWindows = () => {
		if (typeof navigator < `u` && navigator.platform) {
			let e = navigator.platform.toLowerCase();
			return e === `win32` || e === `windows`;
		}
		return typeof process < `u` && process.platform ? process.platform === `win32` : !1;
	}, e.removeBackslashes = (e) => e.replace(n, (e) => e === `\\` ? `` : e), e.escapeLast = (t, n, r) => {
		let i = t.lastIndexOf(n, r);
		return i === -1 ? t : t[i - 1] === `\\` ? e.escapeLast(t, n, i - 1) : `${t.slice(0, i)}\\${t.slice(i)}`;
	}, e.removePrefix = (e, t = {}) => {
		let n = e;
		return n.startsWith(`./`) && (n = n.slice(2), t.prefix = `./`), n;
	}, e.wrapOutput = (e, t = {}, n = {}) => {
		let r = `${n.contains ? `` : `^`}(?:${e})${n.contains ? `` : `$`}`;
		return t.negated === !0 && (r = `(?:^(?!${r}).*$)`), r;
	}, e.basename = (e, { windows: t } = {}) => {
		let n = e.split(t ? /[\\/]/ : `/`), r = n[n.length - 1];
		return r === `` ? n[n.length - 2] : r;
	};
}));
var K = B(((e, t) => {
	let n = G(), { CHAR_ASTERISK: r, CHAR_AT: i, CHAR_BACKWARD_SLASH: a, CHAR_COMMA: o, CHAR_DOT: s, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: l, CHAR_LEFT_CURLY_BRACE: u, CHAR_LEFT_PARENTHESES: d, CHAR_LEFT_SQUARE_BRACKET: f, CHAR_PLUS: p, CHAR_QUESTION_MARK: m, CHAR_RIGHT_CURLY_BRACE: h, CHAR_RIGHT_PARENTHESES: g, CHAR_RIGHT_SQUARE_BRACKET: _ } = ae(), v = (e) => e === l || e === a, y = (e) => {
		e.isPrefix !== !0 && (e.depth = e.isGlobstar ? 1 / 0 : 1);
	};
	t.exports = (e, t) => {
		let b = t || {}, x = e.length - 1, S = b.parts === !0 || b.tokens === !0 || b.scanToEnd === !0, C = [], w = [], T = [], E = e, D = -1, O = 0, ee = 0, k = !1, A = !1, j = !1, M = !1, te = !1, N = !1, P = !1, F = !1, I = !1, L = !1, ne = 0, R, z, B = {
			value: ``,
			depth: 0,
			isGlob: !1
		}, V = () => D >= x, re = () => E.charCodeAt(D + 1), H = () => (R = z, E.charCodeAt(++D));
		for (; D < x;) {
			z = H();
			let e;
			if (z === a) P = B.backslashes = !0, z = H(), z === u && (N = !0);
			else {
				if (N === !0 || z === u) {
					for (ne++; V() !== !0 && (z = H());) if (z === a) P = B.backslashes = !0, H();
					else if (z === u) ne++;
					else {
						if (N !== !0 && z === s && (z = H()) === s || N !== !0 && z === o) {
							if (k = B.isBrace = !0, j = B.isGlob = !0, L = !0, S === !0) continue;
							break;
						}
						if (z === h && (ne--, ne === 0)) {
							N = !1, k = B.isBrace = !0, L = !0;
							break;
						}
					}
					if (S === !0) continue;
					break;
				}
				if (z === l) {
					if (C.push(D), w.push(B), B = {
						value: ``,
						depth: 0,
						isGlob: !1
					}, L === !0) continue;
					if (R === s && D === O + 1) {
						O += 2;
						continue;
					}
					ee = D + 1;
				} else {
					if (b.noext !== !0 && (z === p || z === i || z === r || z === m || z === c) && re() === d) {
						if (j = B.isGlob = !0, M = B.isExtglob = !0, L = !0, z === c && D === O && (I = !0), S === !0) {
							let e = 0;
							for (; V() !== !0 && (z = H());) if (z === a) P = B.backslashes = !0, H();
							else if (z === d) e++;
							else if (z === g && --e === 0) {
								L = !0;
								break;
							}
							continue;
						}
						break;
					}
					if (z === r) {
						if (R === r && (te = B.isGlobstar = !0), j = B.isGlob = !0, L = !0, S === !0) continue;
						break;
					}
					if (z === m) {
						if (j = B.isGlob = !0, L = !0, S === !0) continue;
						break;
					}
					if (z === f) {
						for (; V() !== !0 && (e = H());) if (e === a) P = B.backslashes = !0, H();
						else if (e === _) {
							A = B.isBracket = !0, j = B.isGlob = !0, L = !0;
							break;
						}
						if (S === !0) continue;
						break;
					}
					if (b.nonegate !== !0 && z === c && D === O) F = B.negated = !0, O++;
					else {
						if (b.noparen !== !0 && z === d) {
							if (j = B.isGlob = !0, S === !0) {
								let e = 1;
								for (; V() !== !0 && (z = H());) if (z === a) P = B.backslashes = !0, H();
								else if (z === d) e++;
								else if (z === g && --e === 0) {
									L = !0;
									break;
								}
								continue;
							}
							break;
						}
						if (j === !0) {
							if (L = !0, S === !0) continue;
							break;
						}
					}
				}
			}
		}
		b.noext === !0 && (M = !1, j = !1);
		let U = E, W = ``, ie = ``;
		O > 0 && (W = E.slice(0, O), E = E.slice(O), ee -= O), U && j === !0 && ee > 0 ? (U = E.slice(0, ee), ie = E.slice(ee)) : j === !0 ? (U = ``, ie = E) : U = E, U && U !== `` && U !== `/` && U !== E && v(U.charCodeAt(U.length - 1)) && (U = U.slice(0, -1)), b.unescape === !0 && (ie &&= n.removeBackslashes(ie), U && P === !0 && (U = n.removeBackslashes(U)));
		let ae = {
			prefix: W,
			input: e,
			start: O,
			base: U,
			glob: ie,
			isBrace: k,
			isBracket: A,
			isGlob: j,
			isExtglob: M,
			isGlobstar: te,
			negated: F,
			negatedExtglob: I
		};
		if (b.tokens === !0 && (ae.maxDepth = 0, v(z) || w.push(B), ae.tokens = w), b.parts === !0 || b.tokens === !0) {
			let t;
			for (let n = 0; n < C.length; n++) {
				let r = t === void 0 ? O : t + 1, i = C[n], a = e.slice(r, i);
				b.tokens && (n === 0 && O !== 0 ? (w[n].isPrefix = !0, w[n].value = W) : w[n].value = a, y(w[n]), ae.maxDepth += w[n].depth), i >= O && (T.push(a), t = i);
			}
			let n = t === void 0 ? O : t + 1, r = e.slice(n);
			T.push(r), b.tokens && t && t + 1 < e.length && (w[w.length - 1].value = r, y(w[w.length - 1]), ae.maxDepth += w[w.length - 1].depth), ae.slashes = C, ae.parts = T;
		}
		return ae;
	};
}));
var oe = B(((e, t) => {
	let n = ae(), r = G(), { MAX_LENGTH: i, POSIX_REGEX_SOURCE: a, REGEX_NON_SPECIAL_CHARS: o, REGEX_SPECIAL_CHARS_BACKREF: s, REPLACEMENTS: c } = n, l = (e, t) => {
		if (typeof t.expandRange == `function`) return t.expandRange(...e, t);
		e.sort();
		let n = `[${e.join(`-`)}]`;
		try {
			new RegExp(n);
		} catch {
			return e.map((e) => r.escapeRegex(e)).join(`..`);
		}
		return n;
	}, u = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, d = (e) => {
		let t = [], n = 0, r = 0, i = 0, a = ``, o = !1;
		for (let s of e) if (o === !0) a += s, o = !1;
		else if (s === `\\`) a += s, o = !0;
		else if (s === `"`) i = i === 1 ? 0 : 1, a += s;
		else {
			if (i === 0) {
				if (s === `[`) n++;
				else if (s === `]` && n > 0) n--;
				else if (n === 0) {
					if (s === `(`) r++;
					else if (s === `)` && r > 0) r--;
					else if (s === `|` && r === 0) {
						t.push(a), a = ``;
						continue;
					}
				}
			}
			a += s;
		}
		return t.push(a), t;
	}, f = (e) => {
		let t = !1;
		for (let n of e) if (t === !0) t = !1;
		else if (n === `\\`) t = !0;
		else if (/[?*+@!()[\]{}]/.test(n)) return !1;
		return !0;
	}, p = (e) => {
		let t = e.trim(), n = !0;
		for (; n === !0;) n = !1, /^@\([^\\()[\]{}|]+\)$/.test(t) && (t = t.slice(2, -1), n = !0);
		if (f(t)) return t.replace(/\\(.)/g, `$1`);
	}, m = (e) => {
		let t = e.map(p).filter(Boolean);
		for (let e = 0; e < t.length; e++) for (let n = e + 1; n < t.length; n++) {
			let r = t[e], i = t[n], a = r[0];
			if (a && r === a.repeat(r.length) && i === a.repeat(i.length) && (r === i || r.startsWith(i) || i.startsWith(r))) return !0;
		}
		return !1;
	}, h = (e, t = !0) => {
		if (e[0] !== `+` && e[0] !== `*` || e[1] !== `(`) return;
		let n = 0, r = 0, i = 0, a = !1;
		for (let o = 1; o < e.length; o++) {
			let s = e[o];
			if (a === !0) a = !1;
			else if (s === `\\`) a = !0;
			else if (s === `"`) i = i === 1 ? 0 : 1;
			else if (i !== 1) {
				if (s === `[`) {
					n++;
					continue;
				}
				if (s === `]` && n > 0) {
					n--;
					continue;
				}
				if (!(n > 0)) {
					if (s === `(`) {
						r++;
						continue;
					}
					if (s === `)` && (r--, r === 0)) return t === !0 && o !== e.length - 1 ? void 0 : {
						type: e[0],
						body: e.slice(2, o),
						end: o
					};
				}
			}
		}
	}, g = (e) => `${e.length === 1 ? r.escapeRegex(e[0]) : `[${e.map((e) => r.escapeRegex(e)).join(``)}]`}*`, _ = (e) => {
		let t = 0, n = [];
		for (; t < e.length;) {
			let r = h(e.slice(t), !1);
			if (!r || r.type !== `*`) return;
			let i = d(r.body).map((e) => e.trim());
			if (i.length !== 1) return;
			let a = p(i[0]);
			if (!a || a.length !== 1) return;
			n.push(a), t += r.end + 1;
		}
		if (!(n.length < 1)) return n;
	}, v = (e) => {
		let t = 0, n = e.trim(), r = h(n);
		for (; r;) t++, n = r.body.trim(), r = h(n);
		return t;
	}, y = (e, t) => {
		if (t.maxExtglobRecursion === !1) return { risky: !1 };
		let r = typeof t.maxExtglobRecursion == `number` ? t.maxExtglobRecursion : n.DEFAULT_MAX_EXTGLOB_RECURSION, i = d(e).map((e) => e.trim());
		if (i.length > 1 && (i.some((e) => e === ``) || i.some((e) => /^[*?]+$/.test(e)) || m(i))) return { risky: !0 };
		let a = [], o = !1, s = !0;
		for (let e of i) {
			let t = _(e);
			if (t) {
				o = !0, a.push(...t);
				continue;
			}
			let n = p(e);
			if (n && n.length === 1) a.push(n);
			else if (s = !1, v(e) > r) return { risky: !0 };
		}
		return o ? s ? {
			risky: !0,
			safeOutput: g([...new Set(a)])
		} : { risky: !0 } : { risky: !1 };
	}, b = (e, t) => {
		if (typeof e != `string`) throw TypeError(`Expected a string`);
		e = c[e] || e;
		let d = { ...t }, f = typeof d.maxLength == `number` ? Math.min(i, d.maxLength) : i, p = e.length;
		if (p > f) throw SyntaxError(`Input length: ${p}, exceeds maximum allowed length: ${f}`);
		let m = {
			type: `bos`,
			value: ``,
			output: d.prepend || ``
		}, h = [m], g = d.capture ? `` : `?:`, _ = n.globChars(d.windows), v = n.extglobChars(_), { DOT_LITERAL: x, PLUS_LITERAL: S, SLASH_LITERAL: C, ONE_CHAR: w, DOTS_SLASH: T, NO_DOT: E, NO_DOT_SLASH: D, NO_DOTS_SLASH: O, QMARK: ee, QMARK_NO_DOT: k, STAR: A, START_ANCHOR: j } = _, M = (e) => `(${g}(?:(?!${j}${e.dot ? T : x}).)*?)`, te = d.dot ? `` : E, N = d.dot ? ee : k, P = d.bash === !0 ? M(d) : A;
		d.capture && (P = `(${P})`), typeof d.noext == `boolean` && (d.noextglob = d.noext);
		let F = {
			input: e,
			index: -1,
			start: 0,
			dot: d.dot === !0,
			consumed: ``,
			output: ``,
			prefix: ``,
			backtrack: !1,
			negated: !1,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: !1,
			tokens: h
		};
		e = r.removePrefix(e, F), p = e.length;
		let I = [], L = [], ne = [], R = m, z, B = () => F.index === p - 1, V = F.peek = (t = 1) => e[F.index + t], re = F.advance = () => e[++F.index] || ``, H = () => e.slice(F.index + 1), U = (e = ``, t = 0) => {
			F.consumed += e, F.index += t;
		}, W = (e) => {
			F.output += e.output == null ? e.value : e.output, U(e.value);
		}, ie = () => {
			let e = 1;
			for (; V() === `!` && (V(2) !== `(` || V(3) === `?`);) re(), F.start++, e++;
			return e % 2 != 0 && (F.negated = !0, F.start++, !0);
		}, ae = (e) => {
			F[e]++, ne.push(e);
		}, G = (e) => {
			F[e]--, ne.pop();
		}, K = (e) => {
			if (R.type === `globstar`) {
				let t = F.braces > 0 && (e.type === `comma` || e.type === `brace`), n = e.extglob === !0 || I.length && (e.type === `pipe` || e.type === `paren`);
				e.type !== `slash` && e.type !== `paren` && !t && !n && (F.output = F.output.slice(0, -R.output.length), R.type = `star`, R.value = `*`, R.output = P, F.output += R.output);
			}
			I.length && e.type !== `paren` && (I[I.length - 1].inner += e.value), (e.value || e.output) && W(e), R && R.type === `text` && e.type === `text` ? (R.output = (R.output || R.value) + e.value, R.value += e.value) : (e.prev = R, h.push(e), R = e);
		}, oe = (e, t) => {
			let n = {
				...v[t],
				conditions: 1,
				inner: ``
			};
			n.prev = R, n.parens = F.parens, n.output = F.output, n.startIndex = F.index, n.tokensIndex = h.length;
			let r = (d.capture ? `(` : ``) + n.open;
			ae(`parens`), K({
				type: e,
				value: t,
				output: F.output ? `` : w
			}), K({
				type: `paren`,
				extglob: !0,
				value: re(),
				output: r
			}), I.push(n);
		}, se = (n) => {
			let i = e.slice(n.startIndex, F.index + 1), a = e.slice(n.startIndex + 2, F.index), o = y(a, d);
			if ((n.type === `plus` || n.type === `star`) && o.risky) {
				let e = o.safeOutput ? (n.output ? `` : w) + (d.capture ? `(${o.safeOutput})` : o.safeOutput) : void 0, t = h[n.tokensIndex];
				t.type = `text`, t.value = i, t.output = e || r.escapeRegex(i);
				for (let e = n.tokensIndex + 1; e < h.length; e++) h[e].value = ``, h[e].output = ``, delete h[e].suffix;
				F.output = n.output + t.output, F.backtrack = !0, K({
					type: `paren`,
					extglob: !0,
					value: z,
					output: ``
				}), G(`parens`);
				return;
			}
			let s = n.close + (d.capture ? `)` : ``), c;
			if (n.type === `negate`) {
				let e = P;
				n.inner && n.inner.length > 1 && n.inner.includes(`/`) && (e = M(d)), (e !== P || B() || /^\)+$/.test(H())) && (s = n.close = `)$))${e}`), n.inner.includes(`*`) && (c = H()) && /^\.[^\\/.]+$/.test(c) && (s = n.close = `)${b(c, {
					...t,
					fastpaths: !1
				}).output})${e})`), n.prev.type === `bos` && (F.negatedExtglob = !0);
			}
			K({
				type: `paren`,
				extglob: !0,
				value: z,
				output: s
			}), G(`parens`);
		};
		if (d.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
			let n = !1, i = e.replace(s, (e, t, r, i, a, o) => i === `\\` ? (n = !0, e) : i === `?` ? t ? t + i + (a ? ee.repeat(a.length) : ``) : o === 0 ? N + (a ? ee.repeat(a.length) : ``) : ee.repeat(r.length) : i === `.` ? x.repeat(r.length) : i === `*` ? t ? t + i + (a ? P : ``) : P : t ? e : `\\${e}`);
			return n === !0 && (i = d.unescape === !0 ? i.replace(/\\/g, ``) : i.replace(/\\+/g, (e) => e.length % 2 == 0 ? `\\\\` : e ? `\\` : ``)), i === e && d.contains === !0 ? (F.output = e, F) : (F.output = r.wrapOutput(i, F, t), F);
		}
		for (; !B();) {
			if (z = re(), z === `\0`) continue;
			if (z === `\\`) {
				let e = V();
				if (e === `/` && d.bash !== !0 || e === `.` || e === `;`) continue;
				if (!e) {
					z += `\\`, K({
						type: `text`,
						value: z
					});
					continue;
				}
				let t = /^\\+/.exec(H()), n = 0;
				if (t && t[0].length > 2 && (n = t[0].length, F.index += n, n % 2 != 0 && (z += `\\`)), d.unescape === !0 ? z = re() : z += re(), F.brackets === 0) {
					K({
						type: `text`,
						value: z
					});
					continue;
				}
			}
			if (F.brackets > 0 && (z !== `]` || R.value === `[` || R.value === `[^`)) {
				if (d.posix !== !1 && z === `:`) {
					let e = R.value.slice(1);
					if (e.includes(`[`) && (R.posix = !0, e.includes(`:`))) {
						let e = R.value.lastIndexOf(`[`), t = R.value.slice(0, e), n = R.value.slice(e + 2), r = a[n];
						if (r) {
							R.value = t + r, F.backtrack = !0, re(), !m.output && h.indexOf(R) === 1 && (m.output = w);
							continue;
						}
					}
				}
				(z === `[` && V() !== `:` || z === `-` && V() === `]`) && (z = `\\${z}`), z === `]` && (R.value === `[` || R.value === `[^`) && (z = `\\${z}`), d.posix === !0 && z === `!` && R.value === `[` && (z = `^`), R.value += z, W({ value: z });
				continue;
			}
			if (F.quotes === 1 && z !== `"`) {
				z = r.escapeRegex(z), R.value += z, W({ value: z });
				continue;
			}
			if (z === `"`) {
				F.quotes = F.quotes === 1 ? 0 : 1, d.keepQuotes === !0 && K({
					type: `text`,
					value: z
				});
				continue;
			}
			if (z === `(`) {
				ae(`parens`), K({
					type: `paren`,
					value: z
				});
				continue;
			}
			if (z === `)`) {
				if (F.parens === 0 && d.strictBrackets === !0) throw SyntaxError(u(`opening`, `(`));
				let e = I[I.length - 1];
				if (e && F.parens === e.parens + 1) {
					se(I.pop());
					continue;
				}
				K({
					type: `paren`,
					value: z,
					output: F.parens ? `)` : `\\)`
				}), G(`parens`);
				continue;
			}
			if (z === `[`) {
				if (d.nobracket === !0 || !H().includes(`]`)) {
					if (d.nobracket !== !0 && d.strictBrackets === !0) throw SyntaxError(u(`closing`, `]`));
					z = `\\${z}`;
				} else ae(`brackets`);
				K({
					type: `bracket`,
					value: z
				});
				continue;
			}
			if (z === `]`) {
				if (d.nobracket === !0 || R && R.type === `bracket` && R.value.length === 1) {
					K({
						type: `text`,
						value: z,
						output: `\\${z}`
					});
					continue;
				}
				if (F.brackets === 0) {
					if (d.strictBrackets === !0) throw SyntaxError(u(`opening`, `[`));
					K({
						type: `text`,
						value: z,
						output: `\\${z}`
					});
					continue;
				}
				G(`brackets`);
				let e = R.value.slice(1);
				if (R.posix !== !0 && e[0] === `^` && !e.includes(`/`) && (z = `/${z}`), R.value += z, W({ value: z }), d.literalBrackets === !1 || r.hasRegexChars(e)) continue;
				let t = r.escapeRegex(R.value);
				if (F.output = F.output.slice(0, -R.value.length), d.literalBrackets === !0) {
					F.output += t, R.value = t;
					continue;
				}
				R.value = `(${g}${t}|${R.value})`, F.output += R.value;
				continue;
			}
			if (z === `{` && d.nobrace !== !0) {
				ae(`braces`);
				let e = {
					type: `brace`,
					value: z,
					output: `(`,
					outputIndex: F.output.length,
					tokensIndex: F.tokens.length
				};
				L.push(e), K(e);
				continue;
			}
			if (z === `}`) {
				let e = L[L.length - 1];
				if (d.nobrace === !0 || !e) {
					K({
						type: `text`,
						value: z,
						output: z
					});
					continue;
				}
				let t = `)`;
				if (e.dots === !0) {
					let e = h.slice(), n = [];
					for (let t = e.length - 1; t >= 0 && (h.pop(), e[t].type !== `brace`); t--) e[t].type !== `dots` && n.unshift(e[t].value);
					t = l(n, d), F.backtrack = !0;
				}
				if (e.comma !== !0 && e.dots !== !0) {
					let n = F.output.slice(0, e.outputIndex), r = F.tokens.slice(e.tokensIndex);
					e.value = e.output = `\\{`, z = t = `\\}`, F.output = n;
					for (let e of r) F.output += e.output || e.value;
				}
				K({
					type: `brace`,
					value: z,
					output: t
				}), G(`braces`), L.pop();
				continue;
			}
			if (z === `|`) {
				I.length > 0 && I[I.length - 1].conditions++, K({
					type: `text`,
					value: z
				});
				continue;
			}
			if (z === `,`) {
				let e = z, t = L[L.length - 1];
				t && ne[ne.length - 1] === `braces` && (t.comma = !0, e = `|`), K({
					type: `comma`,
					value: z,
					output: e
				});
				continue;
			}
			if (z === `/`) {
				if (R.type === `dot` && F.index === F.start + 1) {
					F.start = F.index + 1, F.consumed = ``, F.output = ``, h.pop(), R = m;
					continue;
				}
				K({
					type: `slash`,
					value: z,
					output: C
				});
				continue;
			}
			if (z === `.`) {
				if (F.braces > 0 && R.type === `dot`) {
					R.value === `.` && (R.output = x);
					let e = L[L.length - 1];
					R.type = `dots`, R.output += z, R.value += z, e.dots = !0;
					continue;
				}
				if (F.braces + F.parens === 0 && R.type !== `bos` && R.type !== `slash`) {
					K({
						type: `text`,
						value: z,
						output: x
					});
					continue;
				}
				K({
					type: `dot`,
					value: z,
					output: x
				});
				continue;
			}
			if (z === `?`) {
				if (!(R && R.value === `(`) && d.noextglob !== !0 && V() === `(` && V(2) !== `?`) {
					oe(`qmark`, z);
					continue;
				}
				if (R && R.type === `paren`) {
					let e = V(), t = z;
					(R.value === `(` && !/[!=<:]/.test(e) || e === `<` && !/<([!=]|\w+>)/.test(H())) && (t = `\\${z}`), K({
						type: `text`,
						value: z,
						output: t
					});
					continue;
				}
				if (d.dot !== !0 && (R.type === `slash` || R.type === `bos`)) {
					K({
						type: `qmark`,
						value: z,
						output: k
					});
					continue;
				}
				K({
					type: `qmark`,
					value: z,
					output: ee
				});
				continue;
			}
			if (z === `!`) {
				if (d.noextglob !== !0 && V() === `(` && (V(2) !== `?` || !/[!=<:]/.test(V(3)))) {
					oe(`negate`, z);
					continue;
				}
				if (d.nonegate !== !0 && F.index === 0) {
					ie();
					continue;
				}
			}
			if (z === `+`) {
				if (d.noextglob !== !0 && V() === `(` && V(2) !== `?`) {
					oe(`plus`, z);
					continue;
				}
				if (R && R.value === `(` || d.regex === !1) {
					K({
						type: `plus`,
						value: z,
						output: S
					});
					continue;
				}
				if (R && (R.type === `bracket` || R.type === `paren` || R.type === `brace`) || F.parens > 0) {
					K({
						type: `plus`,
						value: z
					});
					continue;
				}
				K({
					type: `plus`,
					value: S
				});
				continue;
			}
			if (z === `@`) {
				if (d.noextglob !== !0 && V() === `(` && V(2) !== `?`) {
					K({
						type: `at`,
						extglob: !0,
						value: z,
						output: ``
					});
					continue;
				}
				K({
					type: `text`,
					value: z
				});
				continue;
			}
			if (z !== `*`) {
				(z === `$` || z === `^`) && (z = `\\${z}`);
				let e = o.exec(H());
				e && (z += e[0], F.index += e[0].length), K({
					type: `text`,
					value: z
				});
				continue;
			}
			if (R && (R.type === `globstar` || R.star === !0)) {
				R.type = `star`, R.star = !0, R.value += z, R.output = P, F.backtrack = !0, F.globstar = !0, U(z);
				continue;
			}
			let t = H();
			if (d.noextglob !== !0 && /^\([^?]/.test(t)) {
				oe(`star`, z);
				continue;
			}
			if (R.type === `star`) {
				if (d.noglobstar === !0) {
					U(z);
					continue;
				}
				let n = R.prev, r = n.prev, i = n.type === `slash` || n.type === `bos`, a = r && (r.type === `star` || r.type === `globstar`);
				if (d.bash === !0 && (!i || t[0] && t[0] !== `/`)) {
					K({
						type: `star`,
						value: z,
						output: ``
					});
					continue;
				}
				let o = F.braces > 0 && (n.type === `comma` || n.type === `brace`), s = I.length && (n.type === `pipe` || n.type === `paren`);
				if (!i && n.type !== `paren` && !o && !s) {
					K({
						type: `star`,
						value: z,
						output: ``
					});
					continue;
				}
				for (; t.slice(0, 3) === `/**`;) {
					let n = e[F.index + 4];
					if (n && n !== `/`) break;
					t = t.slice(3), U(`/**`, 3);
				}
				let c = B() || F.parens > 0 && t === `)`.repeat(F.parens) && !I.some((e) => e.type === `negate`);
				if (n.type === `bos` && B()) {
					R.type = `globstar`, R.value += z, R.output = M(d), F.output = R.output, F.globstar = !0, U(z);
					continue;
				}
				if (n.type === `slash` && n.prev.type !== `bos` && !a && c) {
					F.output = F.output.slice(0, -(n.output + R.output).length), n.output = `(?:${n.output}`, R.type = `globstar`, R.output = M(d) + (d.strictSlashes ? `)` : `|$)`), R.value += z, F.globstar = !0, F.output += n.output + R.output, U(z);
					continue;
				}
				if (n.type === `slash` && n.prev.type !== `bos` && t[0] === `/`) {
					let e = t[1] === void 0 ? `` : `|$`;
					F.output = F.output.slice(0, -(n.output + R.output).length), n.output = `(?:${n.output}`, R.type = `globstar`, R.output = `${M(d)}${C}|${C}${e})`, R.value += z, F.output += n.output + R.output, F.globstar = !0, U(z + re()), K({
						type: `slash`,
						value: `/`,
						output: ``
					});
					continue;
				}
				if (n.type === `bos` && t[0] === `/`) {
					R.type = `globstar`, R.value += z, R.output = `(?:^|${C}|${M(d)}${C})`, F.output = R.output, F.globstar = !0, U(z + re()), K({
						type: `slash`,
						value: `/`,
						output: ``
					});
					continue;
				}
				F.output = F.output.slice(0, -R.output.length), R.type = `globstar`, R.output = M(d), R.value += z, F.output += R.output, F.globstar = !0, U(z);
				continue;
			}
			let n = {
				type: `star`,
				value: z,
				output: P
			};
			d.bash === !0 ? (n.output = `.*?`, (R.type === `bos` || R.type === `slash`) && (n.output = te + n.output), K(n)) : R && (R.type === `bracket` || R.type === `paren`) && d.regex === !0 ? (n.output = z, K(n)) : ((F.index === F.start || R.type === `slash` || R.type === `dot`) && (R.type === `dot` ? (F.output += D, R.output += D) : d.dot === !0 ? (F.output += O, R.output += O) : (F.output += te, R.output += te), V() !== `*` && (F.output += w, R.output += w)), K(n));
		}
		for (; F.brackets > 0;) {
			if (d.strictBrackets === !0) throw SyntaxError(u(`closing`, `]`));
			F.output = r.escapeLast(F.output, `[`), G(`brackets`);
		}
		for (; F.parens > 0;) {
			if (d.strictBrackets === !0) throw SyntaxError(u(`closing`, `)`));
			F.output = r.escapeLast(F.output, `(`), G(`parens`);
		}
		for (; F.braces > 0;) {
			if (d.strictBrackets === !0) throw SyntaxError(u(`closing`, `}`));
			F.output = r.escapeLast(F.output, `{`), G(`braces`);
		}
		if (d.strictSlashes !== !0 && (R.type === `star` || R.type === `bracket`) && K({
			type: `maybe_slash`,
			value: ``,
			output: `${C}?`
		}), F.backtrack === !0) {
			F.output = ``;
			for (let e of F.tokens) F.output += e.output == null ? e.value : e.output, e.suffix && (F.output += e.suffix);
		}
		return F;
	};
	b.fastpaths = (e, t) => {
		let a = { ...t }, o = typeof a.maxLength == `number` ? Math.min(i, a.maxLength) : i, s = e.length;
		if (s > o) throw SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${o}`);
		e = c[e] || e;
		let { DOT_LITERAL: l, SLASH_LITERAL: u, ONE_CHAR: d, DOTS_SLASH: f, NO_DOT: p, NO_DOTS: m, NO_DOTS_SLASH: h, STAR: g, START_ANCHOR: _ } = n.globChars(a.windows), v = a.dot ? m : p, y = a.dot ? h : p, b = a.capture ? `` : `?:`, x = {
			negated: !1,
			prefix: ``
		}, S = a.bash === !0 ? `.*?` : g;
		a.capture && (S = `(${S})`);
		let C = (e) => e.noglobstar === !0 ? S : `(${b}(?:(?!${_}${e.dot ? f : l}).)*?)`, w = (e) => {
			switch (e) {
				case `*`: return `${v}${d}${S}`;
				case `.*`: return `${l}${d}${S}`;
				case `*.*`: return `${v}${S}${l}${d}${S}`;
				case `*/*`: return `${v}${S}${u}${d}${y}${S}`;
				case `**`: return v + C(a);
				case `**/*`: return `(?:${v}${C(a)}${u})?${y}${d}${S}`;
				case `**/*.*`: return `(?:${v}${C(a)}${u})?${y}${S}${l}${d}${S}`;
				case `**/.*`: return `(?:${v}${C(a)}${u})?${l}${d}${S}`;
				default: {
					let t = /^(.*?)\.(\w+)$/.exec(e);
					if (!t) return;
					let n = w(t[1]);
					return n ? n + l + t[2] : void 0;
				}
			}
		}, T = w(r.removePrefix(e, x));
		return T && a.strictSlashes !== !0 && (T += `${u}?`), T;
	}, t.exports = b;
}));
var se = B(((e, t) => {
	let n = K(), r = oe(), i = G(), a = ae(), o = (e) => e && typeof e == `object` && !Array.isArray(e), s = (e, t, n = !1) => {
		if (Array.isArray(e)) {
			let r = e.map((e) => s(e, t, n));
			return (e) => {
				for (let t of r) {
					let n = t(e);
					if (n) return n;
				}
				return !1;
			};
		}
		let r = o(e) && e.tokens && e.input;
		if (e === `` || typeof e != `string` && !r) throw TypeError(`Expected pattern to be a non-empty string`);
		let i = t || {}, a = i.windows, c = r ? s.compileRe(e, t) : s.makeRe(e, t, !1, !0), l = c.state;
		delete c.state;
		let u = () => !1;
		if (i.ignore) {
			let e = {
				...t,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			u = s(i.ignore, e, n);
		}
		let d = (n, r = !1) => {
			let { isMatch: o, match: d, output: f } = s.test(n, c, t, {
				glob: e,
				posix: a
			}), p = {
				glob: e,
				state: l,
				regex: c,
				posix: a,
				input: n,
				output: f,
				match: d,
				isMatch: o
			};
			return typeof i.onResult == `function` && i.onResult(p), o === !1 ? (p.isMatch = !1, r ? p : !1) : u(n) ? (typeof i.onIgnore == `function` && i.onIgnore(p), p.isMatch = !1, r ? p : !1) : (typeof i.onMatch == `function` && i.onMatch(p), !r || p);
		};
		return n && (d.state = l), d;
	};
	s.test = (e, t, n, { glob: r, posix: a } = {}) => {
		if (typeof e != `string`) throw TypeError(`Expected input to be a string`);
		if (e === ``) return {
			isMatch: !1,
			output: ``
		};
		let o = n || {}, c = o.format || (a ? i.toPosixSlashes : null), l = e === r, u = l && c ? c(e) : e;
		return l === !1 && (u = c ? c(e) : e, l = u === r), (l === !1 || o.capture === !0) && (l = o.matchBase === !0 || o.basename === !0 ? s.matchBase(e, t, n, a) : t.exec(u)), {
			isMatch: !!l,
			match: l,
			output: u
		};
	}, s.matchBase = (e, t, n, r = n && n.windows) => (t instanceof RegExp ? t : s.makeRe(t, n)).test(i.basename(e, { windows: r })), s.isMatch = (e, t, n) => s(t, n)(e), s.parse = (e, t) => Array.isArray(e) ? e.map((e) => s.parse(e, t)) : r(e, {
		...t,
		fastpaths: !1
	}), s.scan = (e, t) => n(e, t), s.compileRe = (e, t, n = !1, r = !1) => {
		if (n === !0) return e.output;
		let i = t || {}, a = i.contains ? `` : `^`, o = i.contains ? `` : `$`, c = `${a}(?:${e.output})${o}`;
		e && e.negated === !0 && (c = `^(?!${c}).*$`);
		let l = s.toRegex(c, t);
		return r === !0 && (l.state = e), l;
	}, s.makeRe = (e, t = {}, n = !1, i = !1) => {
		if (!e || typeof e != `string`) throw TypeError(`Expected a non-empty string`);
		let a = {
			negated: !1,
			fastpaths: !0
		};
		return t.fastpaths !== !1 && (e[0] === `.` || e[0] === `*`) && (a.output = r.fastpaths(e, t)), a.output || (a = r(e, t)), s.compileRe(a, t, n, i);
	}, s.toRegex = (e, t) => {
		try {
			let n = t || {};
			return new RegExp(e, n.flags || (n.nocase ? `i` : ``));
		} catch (e) {
			if (t && t.debug === !0) throw e;
			return /$^/;
		}
	}, s.constants = a, t.exports = s;
}));
var q = B(((e, t) => {
	let n = se(), r = G();
	function i(e, t, i = !1) {
		return t && (t.windows === null || t.windows === void 0) && (t = {
			...t,
			windows: r.isWindows()
		}), n(e, t, i);
	}
	Object.assign(i, n), t.exports = i;
}));
var ce = B(((e, t) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var n = W(`path`), r = ie(), i = q();
	let a = function(e, t = `.js`) {
		let r = `${e}`;
		return n.extname(e) || (r += t), r;
	}, o = {
		ArrayPattern(e, t) {
			for (let n of t.elements) n && o[n.type](e, n);
		},
		AssignmentPattern(e, t) {
			o[t.left.type](e, t.left);
		},
		Identifier(e, t) {
			e.push(t.name);
		},
		MemberExpression() {},
		ObjectPattern(e, t) {
			for (let n of t.properties) n.type === `RestElement` ? o.RestElement(e, n) : o[n.value.type](e, n.value);
		},
		RestElement(e, t) {
			o[t.argument.type](e, t.argument);
		}
	}, s = function(e) {
		let t = [];
		return o[e.type](t, e), t;
	}, c = {
		const: !0,
		let: !0
	};
	var l = class {
		constructor(e = {}) {
			this.parent = e.parent, this.isBlockScope = !!e.block, this.declarations = Object.create(null), e.params && e.params.forEach((e) => {
				s(e).forEach((e) => {
					this.declarations[e] = !0;
				});
			});
		}
		addDeclaration(e, t, n) {
			!t && this.isBlockScope ? this.parent.addDeclaration(e, t, n) : e.id && s(e.id).forEach((e) => {
				this.declarations[e] = !0;
			});
		}
		contains(e) {
			return this.declarations[e] || (this.parent ? this.parent.contains(e) : !1);
		}
	};
	let u = function(e, t = `scope`) {
		let n = new l();
		return r.walk(e, {
			enter(e, r) {
				let i = e;
				if (/(?:Function|Class)Declaration/.test(i.type) && n.addDeclaration(i, !1, !1), i.type === `VariableDeclaration`) {
					let { kind: e } = i, t = c[e];
					i.declarations.forEach((e) => {
						n.addDeclaration(e, t, !0);
					});
				}
				let a;
				if (i.type.includes(`Function`)) {
					let e = i;
					a = new l({
						parent: n,
						block: !1,
						params: e.params
					}), e.type === `FunctionExpression` && e.id && a.addDeclaration(e, !1, !1);
				}
				/For(?:In|Of)?Statement/.test(i.type) && (a = new l({
					parent: n,
					block: !0
				})), i.type === `BlockStatement` && !r.type.includes(`Function`) && (a = new l({
					parent: n,
					block: !0
				})), i.type === `CatchClause` && (a = new l({
					parent: n,
					params: i.param ? [i.param] : [],
					block: !0
				})), a && (Object.defineProperty(i, t, {
					value: a,
					configurable: !0
				}), n = a);
			},
			leave(e) {
				e[t] && (n = n.parent);
			}
		}), n;
	};
	function d(e) {
		return Array.isArray(e);
	}
	function f(e) {
		return d(e) ? e : e == null ? [] : [e];
	}
	let p = RegExp(`\\${n.win32.sep}`, `g`), m = function(e) {
		return e.replace(p, n.posix.sep);
	};
	function h(e, t) {
		if (t === !1 || n.isAbsolute(e) || e.startsWith(`**`)) return m(e);
		let r = m(n.resolve(t || ``)).replace(/[-^$*+?.()|[\]{}]/g, `\\$&`);
		return n.posix.join(r, m(e));
	}
	let g = function(e, t, n) {
		let r = n && n.resolve, a = (e) => e instanceof RegExp ? e : { test: (t) => i(h(e, r), { dot: !0 })(t) }, o = f(e).map(a), s = f(t).map(a);
		return !o.length && !s.length ? (e) => typeof e == `string` && !e.includes(`\0`) : function(e) {
			if (typeof e != `string` || e.includes(`\0`)) return !1;
			let t = m(e);
			for (let e = 0; e < s.length; ++e) {
				let n = s[e];
				if (n instanceof RegExp && (n.lastIndex = 0), n.test(t)) return !1;
			}
			for (let e = 0; e < o.length; ++e) {
				let n = o[e];
				if (n instanceof RegExp && (n.lastIndex = 0), n.test(t)) return !0;
			}
			return !o.length;
		};
	}, _ = new Set(`break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl`.split(` `));
	_.add(``);
	let v = function(e) {
		let t = e.replace(/-(\w)/g, (e, t) => t.toUpperCase()).replace(/[^$_a-zA-Z0-9]/g, `_`);
		return (/\d/.test(t[0]) || _.has(t)) && (t = `_${t}`), t || `_`;
	};
	function y(e) {
		return (JSON.stringify(e) || `undefined`).replace(/[\u2028\u2029]/g, (e) => `\\u${`000${e.charCodeAt(0).toString(16)}`.slice(-4)}`);
	}
	function b(e, t, n) {
		let r = `[`, i = t ? `\n${n}${t}` : ``;
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			r += `${a > 0 ? `,` : ``}${i}${S(o, t, n + t)}`;
		}
		return `${r}${t ? `\n${n}` : ``}]`;
	}
	function x(e, t, n) {
		let r = `{`, i = t ? `\n${n}${t}` : ``, a = Object.entries(e);
		for (let e = 0; e < a.length; e++) {
			let [o, s] = a[e], c = v(o) === o ? o : y(o);
			r += `${e > 0 ? `,` : ``}${i}${c}:${t ? ` ` : ``}${S(s, t, n + t)}`;
		}
		return `${r}${t ? `\n${n}` : ``}}`;
	}
	function S(e, t, n) {
		if (typeof e == `object` && e) return Array.isArray(e) ? b(e, t, n) : e instanceof Date ? `new Date(${e.getTime()})` : e instanceof RegExp ? e.toString() : x(e, t, n);
		if (typeof e == `number`) {
			if (e === 1 / 0) return `Infinity`;
			if (e === -1 / 0) return `-Infinity`;
			if (e === 0) return 1 / e == 1 / 0 ? `0` : `-0`;
			if (e !== e) return `NaN`;
		}
		if (typeof e == `symbol`) {
			let t = Symbol.keyFor(e);
			if (t !== void 0) return `Symbol.for(${y(t)})`;
		}
		return typeof e == `bigint` ? `${e}n` : y(e);
	}
	let C = `isWellFormed` in String.prototype;
	function w(e) {
		return C ? e.isWellFormed() : !/\p{Surrogate}/u.test(e);
	}
	let T = /^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u, E = function(e, t = {}) {
		let n = t.compact ? `` : `indent` in t ? t.indent : `	`, r = t.compact ? `` : ` `, i = t.compact ? `` : `
`, a = t.preferConst ? `const` : `var`;
		if (t.namedExports === !1 || typeof e != `object` || Array.isArray(e) || e instanceof Date || e instanceof RegExp || e === null) {
			let i = S(e, t.compact ? null : n, ``);
			return `export default${r || (/^[{[\-\/]/.test(i) ? `` : ` `)}${i};`;
		}
		let o = 0;
		for (let t of Object.keys(e)) {
			let e = /^(_+)/.exec(t)?.[0].length ?? 0;
			e > o && (o = e);
		}
		let s = `${`_`.repeat(o + 1)}arbitrary`, c = ``, l = [], u = [];
		for (let [o, d] of Object.entries(e)) if (o === v(o)) t.objectShorthand ? l.push(o) : l.push(`${o}:${r}${o}`), c += `export ${a} ${o}${r}=${r}${S(d, t.compact ? null : n, ``)};${i}`;
		else if (l.push(`${y(o)}:${r}${S(d, t.compact ? null : n, ``)}`), o !== "default") {
			let e = T.test(o);
			if (e || t.includeArbitraryNames && w(o)) {
				let l = `${s}${u.length}`;
				c += `${a} ${l}${r}=${r}${S(d, t.compact ? null : n, ``)};${i}`, u.push(`${l} as ${e ? o : JSON.stringify(o)}`);
			}
		}
		let d = u.length > 0 ? `export${r}{${i}${n}${u.join(`,${i}${n}`)}${i}};${i}` : ``, f = `export default${r}{${i}${n}${l.join(`,${i}${n}`)}${i}};${i}`;
		return `${c}${d}${f}`;
	};
	function D(e, t) {
		return RegExp(`^${j(e)}$`, t);
	}
	function O(e, t) {
		return RegExp(`^${j(e)}`, t);
	}
	function ee(e, t) {
		return RegExp(`${j(e)}$`, t);
	}
	let k = /[-/\\^$*+?.()|[\]{}]/g;
	function A(e) {
		return e.replace(k, `\\$&`);
	}
	function j(e) {
		if (Array.isArray(e)) {
			let t = e.map(A).join(`|`);
			return t && e.length > 1 ? `(?:${t})` : t;
		}
		return A(e);
	}
	var M = {
		addExtension: a,
		attachScopes: u,
		createFilter: g,
		dataToEsm: E,
		exactRegex: D,
		extractAssignedNames: s,
		makeLegalIdentifier: v,
		normalizePath: m,
		prefixRegex: O,
		suffixRegex: ee
	};
	e.addExtension = a, e.attachScopes = u, e.createFilter = g, e.dataToEsm = E, e.default = M, e.exactRegex = D, e.extractAssignedNames = s, e.makeLegalIdentifier = v, e.normalizePath = m, e.prefixRegex = O, e.suffixRegex = ee, t.exports = Object.assign(e.default, e);
}));
var le = B(((e, t) => {
	t.exports = typeof process == `object` && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error(`SEMVER`, ...e) : () => {};
}));
var ue = B(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			`major`,
			`premajor`,
			`minor`,
			`preminor`,
			`patch`,
			`prepatch`,
			`prerelease`
		],
		SEMVER_SPEC_VERSION: `2.0.0`,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
}));
var de = B(((e, t) => {
	let { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = ue(), a = le();
	e = t.exports = {};
	let o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = `[a-zA-Z0-9-]`, p = [
		[`\\s`, 1],
		[`\\d`, i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? `g` : void 0), s[i] = new RegExp(r, n ? `g` : void 0);
	};
	h(`NUMERICIDENTIFIER`, `0|[1-9]\\d*`), h(`NUMERICIDENTIFIERLOOSE`, `\\d+`), h(`NONNUMERICIDENTIFIER`, `\\d*[a-zA-Z-]${f}*`), h(`MAINVERSION`, `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h(`MAINVERSIONLOOSE`, `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h(`PRERELEASEIDENTIFIER`, `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h(`PRERELEASEIDENTIFIERLOOSE`, `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h(`PRERELEASE`, `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h(`PRERELEASELOOSE`, `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h(`BUILDIDENTIFIER`, `${f}+`), h(`BUILD`, `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h(`FULLPLAIN`, `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h(`FULL`, `^${c[u.FULLPLAIN]}$`), h(`LOOSEPLAIN`, `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h(`LOOSE`, `^${c[u.LOOSEPLAIN]}$`), h(`GTLT`, `((?:<|>)?=?)`), h(`XRANGEIDENTIFIERLOOSE`, `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h(`XRANGEIDENTIFIER`, `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h(`XRANGEPLAIN`, `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h(`XRANGEPLAINLOOSE`, `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h(`XRANGE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h(`XRANGELOOSE`, `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h(`COERCEPLAIN`, `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h(`COERCE`, `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h(`COERCEFULL`, c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h(`COERCERTL`, c[u.COERCE], !0), h(`COERCERTLFULL`, c[u.COERCEFULL], !0), h(`LONETILDE`, `(?:~>?)`), h(`TILDETRIM`, `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = `$1~`, h(`TILDE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h(`TILDELOOSE`, `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h(`LONECARET`, `(?:\\^)`), h(`CARETTRIM`, `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = `$1^`, h(`CARET`, `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h(`CARETLOOSE`, `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h(`COMPARATORLOOSE`, `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h(`COMPARATOR`, `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h(`COMPARATORTRIM`, `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = `$1$2$3`, h(`HYPHENRANGE`, `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h(`HYPHENRANGELOOSE`, `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h(`STAR`, `(<|>)?=?\\s*\\*`), h(`GTE0`, `^\\s*>=\\s*0\\.0\\.0\\s*$`), h(`GTE0PRE`, `^\\s*>=\\s*0\\.0\\.0-0\\s*$`);
}));
var fe = B(((e, t) => {
	let n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == `object` ? e : n : r;
}));
var pe = B(((e, t) => {
	let n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == `number` && typeof t == `number`) return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
}));
var J = B(((e, t) => {
	let n = le(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = ue(), { safeRe: a, t: o } = de(), s = fe(), { compareIdentifiers: c } = pe(), l = (e, t) => {
		let n = t.split(`.`);
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (c(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != `string`) throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n(`SemVer`, t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError(`Invalid major version`);
			if (this.minor > i || this.minor < 0) throw TypeError(`Invalid minor version`);
			if (this.patch > i || this.patch < 0) throw TypeError(`Invalid patch version`);
			this.prerelease = l[4] ? l[4].split(`.`).map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = l[5] ? l[5].split(`.`) : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(`.`)}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n(`SemVer.compare`, this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == `string` && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n(`prerelease compare`, r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n(`build compare`, r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith(`pre`)) {
				if (!t && n === !1) throw Error(`invalid increment argument: identifier is empty`);
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case `premajor`:
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(`pre`, t, n);
					break;
				case `preminor`:
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc(`pre`, t, n);
					break;
				case `prepatch`:
					this.prerelease.length = 0, this.inc(`patch`, t, n), this.inc(`pre`, t, n);
					break;
				case `prerelease`:
					this.prerelease.length === 0 && this.inc(`patch`, t, n), this.inc(`pre`, t, n);
					break;
				case `release`:
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case `major`:
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case `minor`:
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case `patch`:
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case `pre`: {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == `number` && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(`.`) && n === !1) throw Error(`invalid increment argument: identifier already exists`);
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), l(this.prerelease, t)) {
							let e = this.prerelease[t.split(`.`).length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(`.`)}`), this;
		}
	};
}));
var me = B(((e, t) => {
	let n = J();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
}));
var he = B(((e, t) => {
	let n = () => process.platform === `linux`, r = null;
	t.exports = {
		isLinux: n,
		getReport: () => {
			if (!r) {
				if (n() && process.report) {
					let e = process.report.excludeNetwork;
					process.report.excludeNetwork = !0, r = process.report.getReport(), process.report.excludeNetwork = e;
				} else r = {};
			}
			return r;
		}
	};
}));
var ge = B(((e, t) => {
	let n = W(`fs`), r = 2048;
	t.exports = {
		LDD_PATH: `/usr/bin/ldd`,
		SELF_PATH: `/proc/self/exe`,
		readFileSync: (e) => {
			let t = n.openSync(e, `r`), i = Buffer.alloc(r), a = n.readSync(t, i, 0, r, 0);
			return n.close(t, () => {}), i.subarray(0, a);
		},
		readFile: (e) => new Promise((t, i) => {
			n.open(e, `r`, (e, a) => {
				if (e) i(e);
				else {
					let e = Buffer.alloc(r);
					n.read(a, e, 0, r, 0, (r, i) => {
						t(e.subarray(0, i)), n.close(a, () => {});
					});
				}
			});
		})
	};
}));
var _e = B(((e, t) => {
	t.exports = { interpreterPath: (e) => {
		if (e.length < 64 || e.readUInt32BE(0) !== 2135247942 || e.readUInt8(4) !== 2 || e.readUInt8(5) !== 1) return null;
		let t = e.readUInt32LE(32), n = e.readUInt16LE(54), r = e.readUInt16LE(56);
		for (let i = 0; i < r; i++) {
			let r = t + i * n;
			if (e.readUInt32LE(r) === 3) {
				let t = e.readUInt32LE(r + 8), n = e.readUInt32LE(r + 32);
				return e.subarray(t, t + n).toString().replace(/\0.*$/g, ``);
			}
		}
		return null;
	} };
}));
var ve = B(((e, t) => {
	let n = W(`child_process`), { isLinux: r, getReport: i } = he(), { LDD_PATH: a, SELF_PATH: o, readFile: s, readFileSync: c } = ge(), { interpreterPath: l } = _e(), u, d, f, p = `getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true`, m = ``, h = () => m || new Promise((e) => {
		n.exec(p, (t, n) => {
			m = t ? ` ` : n, e(m);
		});
	}), g = () => {
		if (!m) try {
			m = n.execSync(p, { encoding: `utf8` });
		} catch {
			m = ` `;
		}
		return m;
	}, _ = `glibc`, v = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i, y = `musl`, b = (e) => e.includes(`libc.musl-`) || e.includes(`ld-musl-`), x = () => {
		let e = i();
		return e.header && e.header.glibcVersionRuntime ? _ : Array.isArray(e.sharedObjects) && e.sharedObjects.some(b) ? y : null;
	}, S = (e) => {
		let [t, n] = e.split(/[\r\n]+/);
		return t && t.includes(_) ? _ : n && n.includes(y) ? y : null;
	}, C = (e) => {
		if (e) {
			if (e.includes(`/ld-musl-`)) return y;
			if (e.includes(`/ld-linux-`)) return _;
		}
		return null;
	}, w = (e) => (e = e.toString(), e.includes(`musl`) ? y : e.includes(`GNU C Library`) ? _ : null), T = async () => {
		if (d !== void 0) return d;
		d = null;
		try {
			let e = await s(a);
			d = w(e);
		} catch {}
		return d;
	}, E = () => {
		if (d !== void 0) return d;
		d = null;
		try {
			let e = c(a);
			d = w(e);
		} catch {}
		return d;
	}, D = async () => {
		if (u !== void 0) return u;
		u = null;
		try {
			let e = await s(o), t = l(e);
			u = C(t);
		} catch {}
		return u;
	}, O = () => {
		if (u !== void 0) return u;
		u = null;
		try {
			let e = c(o), t = l(e);
			u = C(t);
		} catch {}
		return u;
	}, ee = async () => {
		let e = null;
		if (r() && (e = await D(), !e && (e = await T(), e ||= x(), !e))) {
			let t = await h();
			e = S(t);
		}
		return e;
	}, k = () => {
		let e = null;
		if (r() && (e = O(), !e && (e = E(), e ||= x(), !e))) {
			let t = g();
			e = S(t);
		}
		return e;
	}, A = async () => r() && await ee() !== _, j = () => r() && k() !== _, M = async () => {
		if (f !== void 0) return f;
		f = null;
		try {
			let e = (await s(a)).match(v);
			e && (f = e[1]);
		} catch {}
		return f;
	}, te = () => {
		if (f !== void 0) return f;
		f = null;
		try {
			let e = c(a).match(v);
			e && (f = e[1]);
		} catch {}
		return f;
	}, N = () => {
		let e = i();
		return e.header && e.header.glibcVersionRuntime ? e.header.glibcVersionRuntime : null;
	}, P = (e) => e.trim().split(/\s+/)[1], F = (e) => {
		let [t, n, r] = e.split(/[\r\n]+/);
		return t && t.includes(_) ? P(t) : n && r && n.includes(y) ? P(r) : null;
	};
	t.exports = {
		GLIBC: _,
		MUSL: y,
		family: ee,
		familySync: k,
		isNonGlibcLinux: A,
		isNonGlibcLinuxSync: j,
		version: async () => {
			let e = null;
			if (r() && (e = await M(), e ||= N(), !e)) {
				let t = await h();
				e = F(t);
			}
			return e;
		},
		versionSync: () => {
			let e = null;
			if (r() && (e = te(), e ||= N(), !e)) {
				let t = g();
				e = F(t);
			}
			return e;
		}
	};
}));
var Y = B(((e, t) => {
	t.exports = {
		info() {},
		warn() {}
	};
}));
var ye = B(((e, t) => {
	let n = W(`fs`);
	t.exports = e;
	let r = process.version.substr(1).replace(/-.*$/, ``).split(`.`).map((e) => +e), i = [
		`build`,
		`clean`,
		`configure`,
		`package`,
		`publish`,
		`reveal`,
		`testbinary`,
		`testpackage`,
		`unpublish`
	], a = `napi_build_version=`;
	t.exports.get_napi_version = function() {
		let e = process.versions.napi;
		return e || (r[0] === 9 && r[1] >= 3 ? e = 2 : r[0] === 8 && (e = 1)), e;
	}, t.exports.get_napi_version_as_string = function(e) {
		let n = t.exports.get_napi_version(e);
		return n ? `` + n : ``;
	}, t.exports.validate_package_json = function(e, n) {
		let r = e.binary, i = o(r.module_path), a = o(r.remote_path), s = o(r.package_name), c = t.exports.get_napi_build_versions(e, n, !0), l = t.exports.get_napi_build_versions_raw(e);
		if (c && c.forEach((e) => {
			if (!(parseInt(e, 10) === e && e > 0)) throw Error(`All values specified in napi_versions must be positive integers.`);
		}), c && (!i || !a && !s)) throw Error("When napi_versions is specified; module_path and either remote_path or package_name must contain the substitution string '{napi_build_version}`.");
		if ((i || a || s) && !l) throw Error("When the substitution string '{napi_build_version}` is specified in module_path, remote_path, or package_name; napi_versions must also be specified.");
		if (c && !t.exports.get_best_napi_build_version(e, n) && t.exports.build_napi_only(e) || l && !c && t.exports.build_napi_only(e)) throw Error(`The Node-API version of this Node instance is ` + t.exports.get_napi_version(n ? n.target : void 0) + `. This module supports Node-API version(s) ` + t.exports.get_napi_build_versions_raw(e) + `. This Node instance cannot run this module.`);
	};
	function o(e) {
		return e && (e.indexOf(`{napi_build_version}`) !== -1 || e.indexOf(`{node_napi_label}`) !== -1);
	}
	t.exports.expand_commands = function(e, n, r) {
		let o = [], s = t.exports.get_napi_build_versions(e, n);
		return r.forEach((r) => {
			if (s && r.name === `install`) {
				let i = t.exports.get_best_napi_build_version(e, n), s = i ? [a + i] : [];
				o.push({
					name: r.name,
					args: s
				});
			} else s && i.indexOf(r.name) !== -1 ? s.forEach((e) => {
				let t = r.args.slice();
				t.push(a + e), o.push({
					name: r.name,
					args: t
				});
			}) : o.push(r);
		}), o;
	}, t.exports.get_napi_build_versions = function(e, n, r) {
		let i = Y(), a = [], o = t.exports.get_napi_version(n ? n.target : void 0);
		if (e.binary && e.binary.napi_versions && e.binary.napi_versions.forEach((e) => {
			let t = a.indexOf(e) !== -1;
			!t && o && e <= o ? a.push(e) : r && !t && o && i.info(`This Node instance does not support builds for Node-API version`, e);
		}), n && n[`build-latest-napi-version-only`]) {
			let e = 0;
			a.forEach((t) => {
				t > e && (e = t);
			}), a = e ? [e] : [];
		}
		return a.length ? a : void 0;
	}, t.exports.get_napi_build_versions_raw = function(e) {
		let t = [];
		return e.binary && e.binary.napi_versions && e.binary.napi_versions.forEach((e) => {
			t.indexOf(e) === -1 && t.push(e);
		}), t.length ? t : void 0;
	}, t.exports.get_command_arg = function(e) {
		return a + e;
	}, t.exports.get_napi_build_version_from_command_args = function(e) {
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (n.indexOf(a) === 0) return parseInt(n.substr(19), 10);
		}
	}, t.exports.swap_build_dir_out = function(e) {
		e && (n.rmSync(t.exports.get_build_dir(e), {
			recursive: !0,
			force: !0
		}), n.renameSync(`build`, t.exports.get_build_dir(e)));
	}, t.exports.swap_build_dir_in = function(e) {
		e && (n.rmSync(`build`, {
			recursive: !0,
			force: !0
		}), n.renameSync(t.exports.get_build_dir(e), `build`));
	}, t.exports.get_build_dir = function(e) {
		return `build-tmp-napi-v` + e;
	}, t.exports.get_best_napi_build_version = function(e, n) {
		let r = 0, i = t.exports.get_napi_build_versions(e, n);
		if (i) {
			let e = t.exports.get_napi_version(n ? n.target : void 0);
			i.forEach((t) => {
				t > r && t <= e && (r = t);
			});
		}
		return r === 0 ? void 0 : r;
	}, t.exports.build_napi_only = function(e) {
		return e.binary && e.binary.package_name && e.binary.package_name.indexOf(`{node_napi_label}`) === -1;
	};
}));
var be = B(((e, t) => {
	t.exports = e;
	let n = W(`path`), r = { parse: me() }, i = W(`url`), a = ve(), o = ye(), s;
	s = process.env.NODE_PRE_GYP_ABI_CROSSWALK ? W(process.env.NODE_PRE_GYP_ABI_CROSSWALK) : {};
	let c = {};
	Object.keys(s).forEach((e) => {
		let t = e.split(`.`)[0];
		c[t] || (c[t] = e);
	});
	function l(e, t) {
		if (!e) throw Error(`get_electron_abi requires valid runtime arg`);
		if (t === void 0) throw Error(`Empty target version is not supported if electron is the target.`);
		let n = r.parse(t);
		return e + `-v` + n.major + `.` + n.minor;
	}
	t.exports.get_electron_abi = l;
	function u(e, t) {
		if (!e) throw Error(`get_node_webkit_abi requires valid runtime arg`);
		if (t === void 0) throw Error(`Empty target version is not supported if node-webkit is the target.`);
		return e + `-v` + t;
	}
	t.exports.get_node_webkit_abi = u;
	function d(e, t) {
		if (!e) throw Error(`get_node_abi requires valid runtime arg`);
		if (!t) throw Error(`get_node_abi requires valid process.versions object`);
		let n = r.parse(t.node);
		return n.major === 0 && n.minor % 2 ? e + `-v` + t.node : t.modules ? e + `-v` + +t.modules : `v8-` + t.v8.split(`.`).slice(0, 2).join(`.`);
	}
	t.exports.get_node_abi = d;
	function f(e, t) {
		if (!e) throw Error(`get_runtime_abi requires valid runtime arg`);
		if (e === `node-webkit`) return u(e, t || process.versions[`node-webkit`]);
		if (e === `electron`) return l(e, t || process.versions.electron);
		if (e !== `node`) throw Error(`Unknown Runtime: '` + e + `'`);
		if (t) {
			let n;
			if (s[t]) n = s[t];
			else {
				let e = t.split(`.`).map((e) => +e);
				if (e.length !== 3) throw Error(`Unknown target version: ` + t);
				let r = e[0], i = e[1], a = e[2];
				if (r === 1) for (;;) {
					i > 0 && --i, a > 0 && --a;
					let e = `` + r + `.` + i + `.` + a;
					if (s[e]) {
						n = s[e], console.log(`Warning: node-pre-gyp could not find exact match for ` + t), console.log(`Warning: but node-pre-gyp successfully choose ` + e + ` as ABI compatible target`);
						break;
					}
					if (i === 0 && a === 0) break;
				}
				else if (r >= 2) c[r] && (n = s[c[r]], console.log(`Warning: node-pre-gyp could not find exact match for ` + t), console.log(`Warning: but node-pre-gyp successfully choose ` + c[r] + ` as ABI compatible target`));
				else if (r === 0 && e[1] % 2 == 0) for (; --a > 0;) {
					let e = `` + r + `.` + i + `.` + a;
					if (s[e]) {
						n = s[e], console.log(`Warning: node-pre-gyp could not find exact match for ` + t), console.log(`Warning: but node-pre-gyp successfully choose ` + e + ` as ABI compatible target`);
						break;
					}
				}
			}
			if (!n) throw Error(`Unsupported target version: ` + t);
			return d(e, {
				node: t,
				v8: n.v8 + `.0`,
				modules: n.node_abi > 1 ? n.node_abi : void 0
			});
		}
		return d(e, process.versions);
	}
	t.exports.get_runtime_abi = f;
	let p = [
		`module_name`,
		`module_path`,
		`host`
	];
	function m(e, t) {
		let n = e.name + ` package.json is not node-pre-gyp ready:
`, r = [];
		e.main || r.push(`main`), e.version || r.push(`version`), e.name || r.push(`name`), e.binary || r.push(`binary`);
		let a = e.binary;
		if (a && p.forEach((e) => {
			a[e] && typeof a[e] == `string` || r.push(`binary.` + e);
		}), r.length >= 1) throw Error(n + `package.json must declare these properties: 
` + r.join(`
`));
		if (a) {
			let e = i.parse(a.host).protocol;
			if (e === `http:`) throw Error(`'host' protocol (` + e + `) is invalid - only 'https:' is accepted`);
		}
		o.validate_package_json(e, t);
	}
	t.exports.validate_config = m;
	function h(e, t) {
		return Object.keys(t).forEach((n) => {
			let r = `{` + n + `}`;
			for (; e.indexOf(r) > -1;) e = e.replace(r, t[n]);
		}), e;
	}
	function g(e) {
		return e.slice(-1) === `/` ? e : e + `/`;
	}
	function _(e) {
		return e.replace(/\/\//g, `/`);
	}
	function v(e) {
		let t = `node`;
		return e[`node-webkit`] ? t = `node-webkit` : e.electron && (t = `electron`), t;
	}
	t.exports.get_process_runtime = v, t.exports.evaluate = function(e, t, s) {
		t ||= {}, m(e, t);
		let c = e.version, l = r.parse(c), u = t.runtime || v(process.versions), d = {
			name: e.name,
			configuration: t.debug ? `Debug` : `Release`,
			debug: t.debug,
			module_name: e.binary.module_name,
			version: l.version,
			prerelease: l.prerelease.length ? l.prerelease.join(`.`) : ``,
			build: l.build.length ? l.build.join(`.`) : ``,
			major: l.major,
			minor: l.minor,
			patch: l.patch,
			runtime: u,
			node_abi: f(u, t.target),
			node_abi_napi: o.get_napi_version(t.target) ? `napi` : f(u, t.target),
			napi_version: o.get_napi_version(t.target),
			napi_build_version: s || ``,
			node_napi_label: s ? `napi-v` + s : f(u, t.target),
			target: t.target || ``,
			platform: t.target_platform || process.platform,
			target_platform: t.target_platform || process.platform,
			arch: t.target_arch || process.arch,
			target_arch: t.target_arch || process.arch,
			libc: t.target_libc || a.familySync() || `unknown`,
			module_main: e.main,
			toolset: t.toolset || ``,
			bucket: e.binary.bucket,
			region: e.binary.region,
			s3ForcePathStyle: e.binary.s3ForcePathStyle || !1,
			acl: t.acl || e.binary.acl || `public-read`
		}, p = d.module_name.replace(`-`, `_`);
		return d.host = g(h(process.env[`npm_config_` + p + `_binary_host_mirror`] || e.binary.host, d)), d.module_path = h(e.binary.module_path, d), d.module_path = t.module_root ? n.join(t.module_root, d.module_path) : n.resolve(d.module_path), d.module = n.join(d.module_path, d.module_name + `.node`), d.remote_path = e.binary.remote_path ? _(g(h(e.binary.remote_path, d))) : ``, d.package_name = h(e.binary.package_name ? e.binary.package_name : `{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz`, d), d.staged_tarball = n.join(`build/stage`, d.remote_path, d.package_name), d.hosted_path = d.s3ForcePathStyle ? i.resolve(d.host, _(`${d.bucket}/${d.remote_path}`)) : i.resolve(d.host, d.remote_path), d.hosted_tarball = i.resolve(d.hosted_path, d.package_name), d;
	};
}));
var xe = B(((e) => {
	let t = W(`node:fs`), n = W(`node:path`), r = be(), i = ye();
	e.find = function(e, a) {
		if (!t.existsSync(e)) throw Error(e + `does not exist`);
		let o = JSON.parse(t.readFileSync(e, `utf8`)), s = o.binary;
		s && !s.host && s.staging_host && s.production_host && (s.host = s[process.env.node_pre_gyp_s3_host === `staging` ? `staging_host` : `production_host`]), r.validate_config(o, a);
		let c;
		return i.get_napi_build_versions(o, a) && (c = i.get_best_napi_build_version(o, a)), a ||= {}, a.module_root || (a.module_root = n.dirname(e)), r.evaluate(o, a, c).module;
	};
}));
var Se = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
}));
var Ce = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.wildcardRegEx = e.WILDCARD = e.FUNCTION = e.UNKNOWN = void 0, e.evaluate = t;
	async function t(e, t = {}, n = !0) {
		let i = {
			computeBranches: n,
			vars: t
		};
		return a(e);
		function a(e) {
			let t = r[e.type];
			if (t) return t.call(i, e, a);
		}
	}
	e.UNKNOWN = Symbol(), e.FUNCTION = Symbol(), e.WILDCARD = ``, e.wildcardRegEx = /\x1a/g;
	function n(t) {
		e.wildcardRegEx.lastIndex = 0;
		let n = 0;
		for (; e.wildcardRegEx.exec(t);) n++;
		return n;
	}
	let r = {
		ArrayExpression: async function(e, t) {
			let n = [];
			for (let r = 0, i = e.elements.length; r < i; r++) {
				if (e.elements[r] === null) {
					n.push(null);
					continue;
				}
				let i = await t(e.elements[r]);
				if (!i || !(`value` in i)) return;
				n.push(i.value);
			}
			return { value: n };
		},
		ArrowFunctionExpression: async function(t, n) {
			if (t.params.length === 0 && !t.generator && !t.async && t.expression) {
				let r = await n(t.body);
				return !r || !(`value` in r) ? void 0 : { value: { [e.FUNCTION]: () => r.value } };
			}
		},
		BinaryExpression: async function(t, n) {
			let r = t.operator, i = await n(t.left);
			if (!i && r !== `+`) return;
			let a = await n(t.right);
			if (i || a) {
				if (!i) return this.computeBranches && a && `value` in a && typeof a.value == `string` ? {
					value: e.WILDCARD + a.value,
					wildcards: [t.left, ...a.wildcards || []]
				} : void 0;
				if (!a) return this.computeBranches && r === `+` && i && `value` in i && typeof i.value == `string` ? {
					value: i.value + e.WILDCARD,
					wildcards: [...i.wildcards || [], t.right]
				} : !(`test` in i) && r === `||` && i.value ? i : void 0;
				if (`test` in i && `value` in a) {
					let e = a.value;
					if (r === `==`) return {
						test: i.test,
						ifTrue: i.ifTrue == e,
						else: i.else == e
					};
					if (r === `===`) return {
						test: i.test,
						ifTrue: i.ifTrue === e,
						else: i.else === e
					};
					if (r === `!=`) return {
						test: i.test,
						ifTrue: i.ifTrue != e,
						else: i.else != e
					};
					if (r === `!==`) return {
						test: i.test,
						ifTrue: i.ifTrue !== e,
						else: i.else !== e
					};
					if (r === `+`) return {
						test: i.test,
						ifTrue: i.ifTrue + e,
						else: i.else + e
					};
					if (r === `-`) return {
						test: i.test,
						ifTrue: i.ifTrue - e,
						else: i.else - e
					};
					if (r === `*`) return {
						test: i.test,
						ifTrue: i.ifTrue * e,
						else: i.else * e
					};
					if (r === `/`) return {
						test: i.test,
						ifTrue: i.ifTrue / e,
						else: i.else / e
					};
					if (r === `%`) return {
						test: i.test,
						ifTrue: i.ifTrue % e,
						else: i.else % e
					};
					if (r === `<`) return {
						test: i.test,
						ifTrue: i.ifTrue < e,
						else: i.else < e
					};
					if (r === `<=`) return {
						test: i.test,
						ifTrue: i.ifTrue <= e,
						else: i.else <= e
					};
					if (r === `>`) return {
						test: i.test,
						ifTrue: i.ifTrue > e,
						else: i.else > e
					};
					if (r === `>=`) return {
						test: i.test,
						ifTrue: i.ifTrue >= e,
						else: i.else >= e
					};
					if (r === `|`) return {
						test: i.test,
						ifTrue: i.ifTrue | e,
						else: i.else | e
					};
					if (r === `&`) return {
						test: i.test,
						ifTrue: i.ifTrue & e,
						else: i.else & e
					};
					if (r === `^`) return {
						test: i.test,
						ifTrue: i.ifTrue ^ e,
						else: i.else ^ e
					};
					if (r === `&&`) return {
						test: i.test,
						ifTrue: i.ifTrue && e,
						else: i.else && e
					};
					if (r === `||`) return {
						test: i.test,
						ifTrue: i.ifTrue || e,
						else: i.else || e
					};
				} else if (`test` in a && `value` in i) {
					let e = i.value;
					if (r === `==`) return {
						test: a.test,
						ifTrue: e == a.ifTrue,
						else: e == a.else
					};
					if (r === `===`) return {
						test: a.test,
						ifTrue: e === a.ifTrue,
						else: e === a.else
					};
					if (r === `!=`) return {
						test: a.test,
						ifTrue: e != a.ifTrue,
						else: e != a.else
					};
					if (r === `!==`) return {
						test: a.test,
						ifTrue: e !== a.ifTrue,
						else: e !== a.else
					};
					if (r === `+`) return {
						test: a.test,
						ifTrue: e + a.ifTrue,
						else: e + a.else
					};
					if (r === `-`) return {
						test: a.test,
						ifTrue: e - a.ifTrue,
						else: e - a.else
					};
					if (r === `*`) return {
						test: a.test,
						ifTrue: e * a.ifTrue,
						else: e * a.else
					};
					if (r === `/`) return {
						test: a.test,
						ifTrue: e / a.ifTrue,
						else: e / a.else
					};
					if (r === `%`) return {
						test: a.test,
						ifTrue: e % a.ifTrue,
						else: e % a.else
					};
					if (r === `<`) return {
						test: a.test,
						ifTrue: e < a.ifTrue,
						else: e < a.else
					};
					if (r === `<=`) return {
						test: a.test,
						ifTrue: e <= a.ifTrue,
						else: e <= a.else
					};
					if (r === `>`) return {
						test: a.test,
						ifTrue: e > a.ifTrue,
						else: e > a.else
					};
					if (r === `>=`) return {
						test: a.test,
						ifTrue: e >= a.ifTrue,
						else: e >= a.else
					};
					if (r === `|`) return {
						test: a.test,
						ifTrue: e | a.ifTrue,
						else: e | a.else
					};
					if (r === `&`) return {
						test: a.test,
						ifTrue: e & a.ifTrue,
						else: e & a.else
					};
					if (r === `^`) return {
						test: a.test,
						ifTrue: e ^ a.ifTrue,
						else: e ^ a.else
					};
					if (r === `&&`) return {
						test: a.test,
						ifTrue: e && a.ifTrue,
						else: i && a.else
					};
					if (r === `||`) return {
						test: a.test,
						ifTrue: e || a.ifTrue,
						else: i || a.else
					};
				} else if (`value` in i && `value` in a) {
					if (r === `==`) return { value: i.value == a.value };
					if (r === `===`) return { value: i.value === a.value };
					if (r === `!=`) return { value: i.value != a.value };
					if (r === `!==`) return { value: i.value !== a.value };
					if (r === `+`) {
						let e = { value: i.value + a.value }, t = [];
						return `wildcards` in i && i.wildcards && (t = t.concat(i.wildcards)), `wildcards` in a && a.wildcards && (t = t.concat(a.wildcards)), t.length > 0 && (e.wildcards = t), e;
					}
					if (r === `-`) return { value: i.value - a.value };
					if (r === `*`) return { value: i.value * a.value };
					if (r === `/`) return { value: i.value / a.value };
					if (r === `%`) return { value: i.value % a.value };
					if (r === `<`) return { value: i.value < a.value };
					if (r === `<=`) return { value: i.value <= a.value };
					if (r === `>`) return { value: i.value > a.value };
					if (r === `>=`) return { value: i.value >= a.value };
					if (r === `|`) return { value: i.value | a.value };
					if (r === `&`) return { value: i.value & a.value };
					if (r === `^`) return { value: i.value ^ a.value };
					if (r === `&&`) return { value: i.value && a.value };
					if (r === `||`) return { value: i.value || a.value };
				}
			}
		},
		CallExpression: async function(t, r) {
			let i = await r(t.callee);
			if (!i || `test` in i) return;
			let a = i.value;
			if (typeof a == `object` && a && (a = a[e.FUNCTION]), typeof a != `function`) return;
			let o = null;
			t.callee.object && (o = await r(t.callee.object), o = o && `value` in o && o.value ? o.value : null);
			let s, c = [], l, u = t.arguments.length > 0 && t.callee.property?.name !== `concat`, d = [];
			for (let n = 0, i = t.arguments.length; n < i; n++) {
				let i = await r(t.arguments[n]);
				if (i) u = !1, `value` in i && typeof i.value == `string` && i.wildcards && i.wildcards.forEach((e) => d.push(e));
				else {
					if (!this.computeBranches) return;
					i = { value: e.WILDCARD }, d.push(t.arguments[n]);
				}
				if (`test` in i) {
					if (d.length || s) return;
					s = i.test, l = c.concat([]), c.push(i.ifTrue), l.push(i.else);
				} else c.push(i.value), l && l.push(i.value);
			}
			if (!u) try {
				let t = await a.apply(o, c);
				if (t === e.UNKNOWN) return;
				if (!s) return d.length ? typeof t != `string` || n(t) !== d.length ? void 0 : {
					value: t,
					wildcards: d
				} : { value: t };
				let r = await a.apply(o, l);
				return t === e.UNKNOWN ? void 0 : {
					test: s,
					ifTrue: t,
					else: r
				};
			} catch {
				return;
			}
		},
		ConditionalExpression: async function(e, t) {
			let n = await t(e.test);
			if (n && `value` in n) return n.value ? t(e.consequent) : t(e.alternate);
			if (!this.computeBranches) return;
			let r = await t(e.consequent);
			if (!r || `wildcards` in r || `test` in r) return;
			let i = await t(e.alternate);
			if (!(!i || `wildcards` in i || `test` in i)) return {
				test: e.test,
				ifTrue: r.value,
				else: i.value
			};
		},
		ExpressionStatement: async function(e, t) {
			return t(e.expression);
		},
		Identifier: async function(e, t) {
			if (Object.hasOwnProperty.call(this.vars, e.name)) return this.vars[e.name];
		},
		Literal: async function(e, t) {
			return { value: e.value };
		},
		MemberExpression: async function(t, n) {
			let r = await n(t.object);
			if (!r || `test` in r || typeof r.value == `function`) return;
			if (t.property.type === `Identifier`) {
				if (typeof r.value == `string` && t.property.name === `concat`) return { value: { [e.FUNCTION]: (...e) => r.value.concat(e) } };
				if (typeof r.value == `object` && r.value !== null) {
					let i = r.value;
					if (t.computed) {
						let a = await n(t.property);
						if (a && `value` in a && a.value) {
							let t = i[a.value];
							return t === e.UNKNOWN ? void 0 : { value: t };
						}
						if (!i[e.UNKNOWN] && Object.keys(r).length === 0) return { value: void 0 };
					} else if (t.property.name in i) {
						let n = i[t.property.name];
						return n === e.UNKNOWN ? void 0 : { value: n };
					} else if (i[e.UNKNOWN]) return;
				} else return { value: void 0 };
			}
			let i = await n(t.property);
			if (!(!i || `test` in i)) {
				if (typeof r.value == `object` && r.value !== null) {
					if (i.value in r.value) {
						let t = r.value[i.value];
						return t === e.UNKNOWN ? void 0 : { value: t };
					}
					if (r.value[e.UNKNOWN]) return;
				} else return { value: void 0 };
			}
		},
		MetaProperty: async function(e) {
			if (e.meta.name === `import` && e.property.name === `meta`) return { value: this.vars[`import.meta`] };
		},
		NewExpression: async function(e, t) {
			let n = await t(e.callee);
			if (n && `value` in n && n.value === URL && e.arguments.length) {
				let n = await t(e.arguments[0]);
				if (!n) return;
				let r = null;
				if (e.arguments[1] && (r = await t(e.arguments[1]), !r || !(`value` in r))) return;
				if (`value` in n) {
					if (r) try {
						return { value: new URL(n.value, r.value) };
					} catch {
						return;
					}
					try {
						return { value: new URL(n.value) };
					} catch {
						return;
					}
				}
				{
					let e = n.test;
					if (r) try {
						return {
							test: e,
							ifTrue: new URL(n.ifTrue, r.value),
							else: new URL(n.else, r.value)
						};
					} catch {
						return;
					}
					try {
						return {
							test: e,
							ifTrue: new URL(n.ifTrue),
							else: new URL(n.else)
						};
					} catch {
						return;
					}
				}
			}
		},
		ObjectExpression: async function(t, n) {
			let r = {};
			for (let i = 0; i < t.properties.length; i++) {
				let a = t.properties[i], o = a.computed ? n(a.key) : a.key && { value: a.key.name || a.key.value };
				if (!o || `test` in o) return;
				let s = await n(a.value);
				if (!s || `test` in s || s.value === e.UNKNOWN) return;
				r[o.value] = s.value;
			}
			return { value: r };
		},
		SequenceExpression: async function(e, t) {
			if (`expressions` in e && e.expressions.length === 2 && e.expressions[0].type === `Literal` && e.expressions[0].value === 0 && e.expressions[1].type === `MemberExpression`) return await t(e.expressions[1]);
		},
		TemplateLiteral: async function(t, n) {
			let r = { value: `` };
			for (var i = 0; i < t.expressions.length; i++) {
				`value` in r ? r.value += t.quasis[i].value.cooked : (r.ifTrue += t.quasis[i].value.cooked, r.else += t.quasis[i].value.cooked);
				let a = await n(t.expressions[i]);
				if (!a) {
					if (!this.computeBranches) return;
					a = {
						value: e.WILDCARD,
						wildcards: [t.expressions[i]]
					};
				}
				if (`value` in a) {
					if (`value` in r) r.value += a.value, a.wildcards && (r.wildcards = [...r.wildcards || [], ...a.wildcards]);
					else {
						if (a.wildcards) return;
						r.ifTrue += a.value, r.else += a.value;
					}
				} else if (`value` in r) {
					if (`wildcards` in r) return;
					r = {
						test: a.test,
						ifTrue: r.value + a.ifTrue,
						else: r.value + a.else
					};
				} else return;
			}
			return `value` in r ? r.value += t.quasis[i].value.cooked : (r.ifTrue += t.quasis[i].value.cooked, r.else += t.quasis[i].value.cooked), r;
		},
		ThisExpression: async function(e, t) {
			if (Object.hasOwnProperty.call(this.vars, `this`)) return this.vars.this;
		},
		UnaryExpression: async function(e, t) {
			let n = await t(e.argument);
			if (n) {
				if (`value` in n && !(`wildcards` in n)) {
					if (e.operator === `+`) return { value: +n.value };
					if (e.operator === `-`) return { value: -n.value };
					if (e.operator === `~`) return { value: ~n.value };
					if (e.operator === `!`) return { value: !n.value };
				} else if (`test` in n && !(`wildcards` in n)) {
					if (e.operator === `+`) return {
						test: n.test,
						ifTrue: +n.ifTrue,
						else: +n.else
					};
					if (e.operator === `-`) return {
						test: n.test,
						ifTrue: -n.ifTrue,
						else: -n.else
					};
					if (e.operator === `~`) return {
						test: n.test,
						ifTrue: ~n.ifTrue,
						else: ~n.else
					};
					if (e.operator === `!`) return {
						test: n.test,
						ifTrue: !n.ifTrue,
						else: !n.else
					};
				}
			}
		}
	};
	r.LogicalExpression = r.BinaryExpression;
}));
var we = B(((e, t) => {
	(function(n, r) {
		typeof e == `object` && t !== void 0 ? r(e) : typeof define == `function` && define.amd ? define([`exports`], r) : (n = typeof globalThis < `u` ? globalThis : n || self, r(n.acorn = {}));
	})(e, (function(e) {
		var t = [
			509,
			0,
			227,
			0,
			150,
			4,
			294,
			9,
			1368,
			2,
			2,
			1,
			6,
			3,
			41,
			2,
			5,
			0,
			166,
			1,
			574,
			3,
			9,
			9,
			7,
			9,
			32,
			4,
			318,
			1,
			31,
			4,
			33,
			15,
			71,
			10,
			50,
			3,
			123,
			2,
			54,
			14,
			32,
			10,
			3,
			1,
			11,
			3,
			46,
			10,
			8,
			0,
			46,
			9,
			7,
			2,
			37,
			13,
			2,
			9,
			6,
			1,
			45,
			0,
			13,
			2,
			49,
			13,
			9,
			3,
			2,
			11,
			83,
			11,
			7,
			0,
			3,
			0,
			158,
			11,
			6,
			9,
			7,
			3,
			56,
			1,
			2,
			6,
			3,
			1,
			3,
			2,
			10,
			0,
			11,
			1,
			3,
			6,
			4,
			4,
			68,
			8,
			2,
			0,
			3,
			0,
			2,
			3,
			2,
			4,
			2,
			0,
			15,
			1,
			83,
			17,
			10,
			9,
			5,
			0,
			82,
			19,
			13,
			9,
			214,
			6,
			3,
			8,
			28,
			1,
			83,
			16,
			16,
			9,
			82,
			12,
			9,
			9,
			7,
			19,
			58,
			14,
			5,
			9,
			243,
			14,
			166,
			9,
			71,
			5,
			2,
			1,
			3,
			3,
			2,
			0,
			2,
			1,
			13,
			9,
			120,
			6,
			3,
			6,
			4,
			0,
			29,
			9,
			41,
			6,
			2,
			3,
			9,
			0,
			10,
			10,
			47,
			15,
			199,
			7,
			137,
			9,
			54,
			7,
			2,
			7,
			17,
			9,
			57,
			21,
			2,
			13,
			123,
			5,
			4,
			0,
			2,
			1,
			2,
			6,
			2,
			0,
			9,
			9,
			49,
			4,
			2,
			1,
			2,
			4,
			9,
			9,
			55,
			9,
			7,
			0,
			259,
			3,
			10,
			1,
			2,
			0,
			49,
			6,
			4,
			4,
			14,
			10,
			5350,
			0,
			7,
			14,
			11465,
			27,
			2343,
			9,
			87,
			9,
			39,
			4,
			60,
			6,
			26,
			9,
			535,
			9,
			470,
			0,
			2,
			54,
			8,
			3,
			82,
			0,
			12,
			1,
			19628,
			1,
			4178,
			9,
			519,
			45,
			3,
			22,
			481,
			1,
			61,
			4,
			4,
			5,
			9,
			7,
			3,
			6,
			31,
			3,
			149,
			2,
			12,
			2,
			9,
			1,
			3,
			0,
			33,
			1,
			1357,
			49,
			513,
			54,
			5,
			49,
			9,
			0,
			15,
			0,
			23,
			4,
			2,
			14,
			1361,
			6,
			2,
			16,
			3,
			6,
			2,
			1,
			2,
			4,
			101,
			0,
			161,
			6,
			10,
			9,
			357,
			0,
			62,
			13,
			499,
			13,
			245,
			1,
			2,
			9,
			233,
			0,
			3,
			0,
			8,
			1,
			6,
			0,
			475,
			6,
			110,
			6,
			6,
			9,
			4759,
			9,
			787719,
			239
		], n = [
			0,
			11,
			2,
			25,
			2,
			18,
			2,
			1,
			2,
			14,
			3,
			13,
			35,
			122,
			70,
			52,
			268,
			28,
			4,
			48,
			48,
			31,
			14,
			29,
			6,
			37,
			11,
			29,
			3,
			35,
			5,
			7,
			2,
			4,
			43,
			157,
			19,
			35,
			5,
			35,
			5,
			39,
			9,
			51,
			13,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			2,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			4,
			51,
			13,
			310,
			10,
			21,
			11,
			7,
			25,
			5,
			2,
			41,
			2,
			13,
			65,
			5,
			3,
			0,
			2,
			43,
			2,
			1,
			4,
			0,
			3,
			22,
			11,
			22,
			10,
			30,
			66,
			18,
			2,
			1,
			11,
			21,
			11,
			25,
			7,
			25,
			39,
			55,
			7,
			1,
			65,
			0,
			16,
			3,
			2,
			2,
			2,
			28,
			43,
			28,
			4,
			28,
			36,
			7,
			2,
			27,
			28,
			53,
			11,
			21,
			11,
			18,
			14,
			17,
			111,
			72,
			56,
			50,
			14,
			50,
			14,
			35,
			39,
			27,
			10,
			22,
			251,
			41,
			7,
			1,
			17,
			5,
			18,
			21,
			18,
			28,
			11,
			0,
			9,
			21,
			43,
			17,
			47,
			20,
			28,
			22,
			13,
			52,
			58,
			1,
			3,
			0,
			14,
			44,
			33,
			24,
			27,
			35,
			30,
			0,
			3,
			0,
			9,
			34,
			4,
			0,
			13,
			47,
			15,
			3,
			22,
			0,
			2,
			0,
			36,
			17,
			2,
			24,
			20,
			1,
			64,
			6,
			2,
			0,
			2,
			3,
			2,
			14,
			2,
			9,
			8,
			46,
			39,
			7,
			3,
			1,
			3,
			21,
			2,
			6,
			2,
			1,
			2,
			4,
			4,
			0,
			19,
			0,
			13,
			4,
			31,
			9,
			2,
			0,
			3,
			0,
			2,
			37,
			2,
			0,
			26,
			0,
			2,
			0,
			45,
			52,
			19,
			3,
			21,
			2,
			31,
			47,
			21,
			1,
			2,
			0,
			185,
			46,
			42,
			3,
			37,
			47,
			21,
			0,
			60,
			42,
			14,
			0,
			72,
			26,
			38,
			6,
			186,
			43,
			117,
			63,
			32,
			7,
			3,
			0,
			3,
			7,
			2,
			1,
			2,
			23,
			16,
			0,
			2,
			0,
			95,
			7,
			3,
			38,
			17,
			0,
			2,
			0,
			29,
			0,
			11,
			39,
			8,
			0,
			22,
			0,
			12,
			45,
			20,
			0,
			19,
			72,
			18,
			0,
			182,
			32,
			32,
			8,
			2,
			36,
			18,
			0,
			50,
			29,
			113,
			6,
			2,
			1,
			2,
			37,
			22,
			0,
			26,
			5,
			2,
			1,
			2,
			31,
			15,
			0,
			24,
			43,
			22,
			0,
			239,
			18,
			16,
			0,
			2,
			12,
			2,
			33,
			125,
			0,
			80,
			921,
			103,
			111,
			6,
			206,
			13,
			310,
			2314,
			96,
			16,
			1071,
			18,
			5,
			26,
			3994,
			6,
			582,
			6842,
			29,
			1763,
			568,
			8,
			30,
			18,
			78,
			18,
			29,
			19,
			47,
			17,
			3,
			32,
			20,
			6,
			18,
			433,
			44,
			212,
			63,
			33,
			24,
			3,
			24,
			45,
			74,
			6,
			0,
			67,
			12,
			65,
			1,
			2,
			0,
			15,
			4,
			10,
			7386,
			37,
			33,
			96,
			114,
			14,
			913,
			15,
			50,
			7710,
			3,
			2,
			6,
			2,
			1,
			2,
			296,
			10,
			0,
			30,
			2,
			3,
			0,
			15,
			4,
			8,
			395,
			2309,
			106,
			6,
			12,
			4,
			8,
			8,
			9,
			5991,
			84,
			2,
			70,
			2,
			1,
			3,
			0,
			3,
			1,
			3,
			3,
			2,
			11,
			2,
			0,
			2,
			6,
			2,
			64,
			2,
			3,
			3,
			7,
			2,
			6,
			2,
			27,
			2,
			3,
			2,
			4,
			2,
			0,
			4,
			6,
			2,
			340,
			2,
			24,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			7,
			1845,
			129,
			15,
			6,
			55,
			50,
			49,
			61,
			147,
			44,
			11,
			6,
			17,
			0,
			322,
			29,
			19,
			43,
			485,
			27,
			229,
			29,
			3,
			0,
			208,
			30,
			2,
			2,
			2,
			1,
			2,
			6,
			3,
			4,
			10,
			1,
			225,
			6,
			2,
			3,
			2,
			1,
			2,
			14,
			2,
			196,
			60,
			67,
			8,
			0,
			1205,
			3,
			2,
			26,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			9,
			2,
			3,
			2,
			0,
			2,
			0,
			7,
			0,
			5,
			0,
			2,
			0,
			2,
			0,
			2,
			2,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			1,
			2,
			0,
			3,
			3,
			2,
			6,
			2,
			3,
			2,
			3,
			2,
			0,
			2,
			9,
			2,
			16,
			6,
			2,
			2,
			4,
			2,
			16,
			4421,
			42719,
			33,
			4382,
			2,
			5773,
			3,
			7472,
			16,
			621,
			2467,
			541,
			1507,
			4938,
			6,
			8489,
			39815,
			11327
		], r = `‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄ-׉ؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୓-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫰ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･`, i = `ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆ՘ՙՠ-ֈ֋֌א-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿ₏-₟ℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-꟝꟢꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩ꭬꭭ꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ`, a = {
			3: `abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile`,
			5: `class enum extends super const export import`,
			6: `enum`,
			strict: `implements interface let package private protected public static yield`,
			strictBind: `eval arguments`
		}, o = `break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this`, s = {
			5: o,
			"5module": o + ` export import`,
			6: o + ` const class extends export import super`
		}, c = /^in(stanceof)?$/, l = RegExp(`[` + i + `]`), u = RegExp(`[` + i + r + `]`);
		function d(e, t) {
			for (var n = 65536, r = 0; r < t.length; r += 2) {
				if (n += t[r], n > e) return !1;
				if (n += t[r + 1], n >= e) return !0;
			}
			return !1;
		}
		function f(e, t) {
			return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && l.test(String.fromCharCode(e)) : t !== !1 && d(e, n);
		}
		function p(e, r) {
			return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && u.test(String.fromCharCode(e)) : r === !1 ? !1 : d(e, n) || d(e, t);
		}
		var m = function(e, t) {
			t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
		};
		function h(e, t) {
			return new m(e, {
				beforeExpr: !0,
				binop: t
			});
		}
		var g = { beforeExpr: !0 }, _ = { startsExpr: !0 }, v = {};
		function y(e, t) {
			return t === void 0 && (t = {}), t.keyword = e, v[e] = new m(e, t);
		}
		var b = {
			num: new m(`num`, _),
			regexp: new m(`regexp`, _),
			string: new m(`string`, _),
			name: new m(`name`, _),
			privateId: new m(`privateId`, _),
			eof: new m(`eof`),
			bracketL: new m(`[`, {
				beforeExpr: !0,
				startsExpr: !0
			}),
			bracketR: new m(`]`),
			braceL: new m(`{`, {
				beforeExpr: !0,
				startsExpr: !0
			}),
			braceR: new m(`}`),
			parenL: new m(`(`, {
				beforeExpr: !0,
				startsExpr: !0
			}),
			parenR: new m(`)`),
			comma: new m(`,`, g),
			semi: new m(`;`, g),
			colon: new m(`:`, g),
			dot: new m(`.`),
			question: new m(`?`, g),
			questionDot: new m(`?.`),
			arrow: new m(`=>`, g),
			template: new m(`template`),
			invalidTemplate: new m(`invalidTemplate`),
			ellipsis: new m(`...`, g),
			backQuote: new m("`", _),
			dollarBraceL: new m("${", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			eq: new m(`=`, {
				beforeExpr: !0,
				isAssign: !0
			}),
			assign: new m(`_=`, {
				beforeExpr: !0,
				isAssign: !0
			}),
			incDec: new m(`++/--`, {
				prefix: !0,
				postfix: !0,
				startsExpr: !0
			}),
			prefix: new m(`!/~`, {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			logicalOR: h(`||`, 1),
			logicalAND: h(`&&`, 2),
			bitwiseOR: h(`|`, 3),
			bitwiseXOR: h(`^`, 4),
			bitwiseAND: h(`&`, 5),
			equality: h(`==/!=/===/!==`, 6),
			relational: h(`</>/<=/>=`, 7),
			bitShift: h(`<</>>/>>>`, 8),
			plusMin: new m(`+/-`, {
				beforeExpr: !0,
				binop: 9,
				prefix: !0,
				startsExpr: !0
			}),
			modulo: h(`%`, 10),
			star: h(`*`, 10),
			slash: h(`/`, 10),
			starstar: new m(`**`, { beforeExpr: !0 }),
			coalesce: h(`??`, 1),
			_break: y(`break`),
			_case: y(`case`, g),
			_catch: y(`catch`),
			_continue: y(`continue`),
			_debugger: y(`debugger`),
			_default: y(`default`, g),
			_do: y(`do`, {
				isLoop: !0,
				beforeExpr: !0
			}),
			_else: y(`else`, g),
			_finally: y(`finally`),
			_for: y(`for`, { isLoop: !0 }),
			_function: y(`function`, _),
			_if: y(`if`),
			_return: y(`return`, g),
			_switch: y(`switch`),
			_throw: y(`throw`, g),
			_try: y(`try`),
			_var: y(`var`),
			_const: y(`const`),
			_while: y(`while`, { isLoop: !0 }),
			_with: y(`with`),
			_new: y(`new`, {
				beforeExpr: !0,
				startsExpr: !0
			}),
			_this: y(`this`, _),
			_super: y(`super`, _),
			_class: y(`class`, _),
			_extends: y(`extends`, g),
			_export: y(`export`),
			_import: y(`import`, _),
			_null: y(`null`, _),
			_true: y(`true`, _),
			_false: y(`false`, _),
			_in: y(`in`, {
				beforeExpr: !0,
				binop: 7
			}),
			_instanceof: y(`instanceof`, {
				beforeExpr: !0,
				binop: 7
			}),
			_typeof: y(`typeof`, {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_void: y(`void`, {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_delete: y(`delete`, {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			})
		}, x = /\r\n?|\n|\u2028|\u2029/, S = new RegExp(x.source, `g`);
		function C(e) {
			return e === 10 || e === 13 || e === 8232 || e === 8233;
		}
		function w(e, t, n) {
			n === void 0 && (n = e.length);
			for (var r = t; r < n; r++) {
				var i = e.charCodeAt(r);
				if (C(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
			}
			return -1;
		}
		var T = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, E = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, D = Object.prototype, O = D.hasOwnProperty, ee = D.toString, k = Object.hasOwn || (function(e, t) {
			return O.call(e, t);
		}), A = Array.isArray || (function(e) {
			return ee.call(e) === `[object Array]`;
		}), j = Object.create(null);
		function M(e) {
			return j[e] || (j[e] = RegExp(`^(?:` + e.replace(/ /g, `|`) + `)$`));
		}
		function te(e) {
			return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
		}
		var N = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, P = function(e, t) {
			this.line = e, this.column = t;
		};
		P.prototype.offset = function(e) {
			return new P(this.line, this.column + e);
		};
		var F = function(e, t, n) {
			this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
		};
		function I(e, t) {
			for (var n = 1, r = 0;;) {
				var i = w(e, r, t);
				if (i < 0) return new P(n, t - r);
				++n, r = i;
			}
		}
		var L = {
			ecmaVersion: null,
			sourceType: `script`,
			strict: !1,
			onInsertedSemicolon: null,
			onTrailingComma: null,
			allowReserved: null,
			allowReturnOutsideFunction: !1,
			allowImportExportEverywhere: !1,
			allowAwaitOutsideFunction: null,
			allowSuperOutsideMethod: null,
			allowHashBang: !1,
			checkPrivateFields: !0,
			locations: !1,
			startLocation: null,
			onToken: null,
			onComment: null,
			ranges: !1,
			program: null,
			sourceFile: null,
			directSourceFile: null,
			preserveParens: !1
		}, ne = !1;
		function R(e) {
			var t = {};
			for (var n in L) t[n] = e && k(e, n) ? e[n] : L[n];
			if (t.ecmaVersion === `latest` ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!ne && typeof console == `object` && console.warn && (ne = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, e && e.allowHashBang != null || (t.allowHashBang = t.ecmaVersion >= 14), A(t.onToken)) {
				var r = t.onToken;
				t.onToken = function(e) {
					return r.push(e);
				};
			}
			if (A(t.onComment) && (t.onComment = z(t, t.onComment)), t.sourceType === `commonjs` && t.allowAwaitOutsideFunction) throw Error(`Cannot use allowAwaitOutsideFunction with sourceType: commonjs`);
			return t;
		}
		function z(e, t) {
			return function(n, r, i, a, o, s) {
				var c = {
					type: n ? `Block` : `Line`,
					value: r,
					start: i,
					end: a
				};
				e.locations && (c.loc = new F(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
			};
		}
		var B = 1, V = 2, re = 4, H = 8, U = 16, W = 32, ie = 64, ae = 128, G = 256, K = 512, oe = 1024, se = B | V | G;
		function q(e, t) {
			return V | (e ? re : 0) | (t ? H : 0);
		}
		var ce = 0, le = 1, ue = 2, de = 3, fe = 4, pe = 5, J = function(e, t, n) {
			this.options = e = R(e), this.sourceFile = e.sourceFile, this.keywords = M(s[e.ecmaVersion >= 6 ? 6 : e.sourceType === `module` ? `5module` : 5]);
			var r = ``;
			e.allowReserved !== !0 && (r = a[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === `module` && (r += ` await`)), this.reservedWords = M(r);
			var i = (r ? r + ` ` : ``) + a.strict;
			this.reservedWordsStrict = M(i), this.reservedWordsStrictBind = M(i + ` ` + a.strictBind), this.input = String(t), this.containsEsc = !1, this.pos = n || 0, this.curLine = 1, e.startLocation ? (this.lineStart = this.pos - e.startLocation.column, this.curLine = e.startLocation.line) : n ? (this.lineStart = this.input.lastIndexOf(`
`, n - 1) + 1, this.options.locations && (this.curLine = this.input.slice(0, this.lineStart).split(x).length)) : this.lineStart = 0, this.type = b.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === `module`, this.strict = this.inModule || e.strict === !0 || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === `#!` && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === `commonjs` ? V : B), this.regexpState = null, this.privateNameStack = [];
		}, me = {
			inFunction: { configurable: !0 },
			inGenerator: { configurable: !0 },
			inAsync: { configurable: !0 },
			canAwait: { configurable: !0 },
			allowReturn: { configurable: !0 },
			allowSuper: { configurable: !0 },
			allowDirectSuper: { configurable: !0 },
			treatFunctionsAsVar: { configurable: !0 },
			allowNewDotTarget: { configurable: !0 },
			allowUsing: { configurable: !0 },
			inClassStaticBlock: { configurable: !0 }
		};
		J.prototype.parse = function() {
			var e = this, t = this.options.program || this.startNode();
			return this.nextToken(), this.catchStackOverflow(function() {
				return e.parseTopLevel(t);
			});
		}, me.inFunction.get = function() {
			return (this.currentVarScope().flags & V) > 0;
		}, me.inGenerator.get = function() {
			return (this.currentVarScope().flags & H) > 0;
		}, me.inAsync.get = function() {
			return (this.currentVarScope().flags & re) > 0;
		}, me.canAwait.get = function() {
			for (var e = this.scopeStack.length - 1; e >= 0; e--) {
				var t = this.scopeStack[e].flags;
				if (t & (G | K)) return !1;
				if (t & V) return (t & re) > 0;
			}
			return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
		}, me.allowReturn.get = function() {
			return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & B);
		}, me.allowSuper.get = function() {
			return (this.currentThisScope().flags & ie) > 0 || this.options.allowSuperOutsideMethod;
		}, me.allowDirectSuper.get = function() {
			return (this.currentThisScope().flags & ae) > 0;
		}, me.treatFunctionsAsVar.get = function() {
			return this.treatFunctionsAsVarInScope(this.currentScope());
		}, me.allowNewDotTarget.get = function() {
			for (var e = this.scopeStack.length - 1; e >= 0; e--) {
				var t = this.scopeStack[e].flags;
				if (t & (G | K) || t & V && !(t & U)) return !0;
			}
			return !1;
		}, me.allowUsing.get = function() {
			var e = this.currentScope().flags;
			return !(e & oe || !this.inModule && e & B);
		}, me.inClassStaticBlock.get = function() {
			return (this.currentVarScope().flags & G) > 0;
		}, J.extend = function() {
			for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
			for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
			return n;
		}, J.parse = function(e, t) {
			return new this(t, e).parse();
		}, J.parseExpressionAt = function(e, t, n) {
			var r = new this(n, e, t);
			return r.nextToken(), r.parseExpression();
		}, J.tokenizer = function(e, t) {
			return new this(t, e);
		}, Object.defineProperties(J.prototype, me);
		var he = J.prototype, ge = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
		he.strictDirective = function(e) {
			if (this.options.ecmaVersion < 5) return !1;
			for (;;) {
				E.lastIndex = e, e += E.exec(this.input)[0].length;
				var t = ge.exec(this.input.slice(e));
				if (!t) return !1;
				if ((t[1] || t[2]) === `use strict`) {
					E.lastIndex = e + t[0].length;
					var n = E.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
					return i === `;` || i === `}` || x.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === `!` && this.input.charAt(r + 1) === `=` || i === `i` && _e(this, r));
				}
				e += t[0].length, E.lastIndex = e, e += E.exec(this.input)[0].length, this.input[e] === `;` && e++;
			}
		};
		function _e(e, t) {
			for (var n = t + 1, r = Math.min(e.input.length, t + 11); n < r;) {
				var i = e.fullCharCodeAt(n);
				if (!p(i, !0)) break;
				n += i <= 65535 ? 1 : 2;
			}
			return n === t + 2 && e.input.slice(t, n) === `in` || n === t + 10 && e.input.slice(t, n) === `instanceof`;
		}
		he.eat = function(e) {
			return this.type === e && (this.next(), !0);
		}, he.isContextual = function(e) {
			return this.type === b.name && this.value === e && !this.containsEsc;
		}, he.eatContextual = function(e) {
			return this.isContextual(e) ? (this.next(), !0) : !1;
		}, he.catchStackOverflow = function(e) {
			try {
				return e();
			} catch (e) {
				if (e instanceof Error && (/\bstack\b.*\b(exceeded|overflow)\b/i.test(e.message) || /\btoo much recursion\b/i.test(e.message))) this.raise(this.start, `Not enough stack space to parse input`);
				else throw e;
			}
		}, he.expectContextual = function(e) {
			this.eatContextual(e) || this.unexpected();
		}, he.canInsertSemicolon = function() {
			return this.type === b.eof || this.type === b.braceR || x.test(this.input.slice(this.lastTokEnd, this.start));
		}, he.insertSemicolon = function() {
			if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
		}, he.semicolon = function() {
			!this.eat(b.semi) && !this.insertSemicolon() && this.unexpected();
		}, he.afterTrailingComma = function(e, t) {
			if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
		}, he.expect = function(e) {
			this.eat(e) || this.unexpected();
		}, he.unexpected = function(e) {
			this.raise(e ?? this.start, `Unexpected token`);
		};
		var ve = function() {
			this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
		};
		he.checkPatternErrors = function(e, t) {
			if (e) {
				e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, `Comma is not permitted after the rest element`);
				var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
				n > -1 && this.raiseRecoverable(n, t ? `Assigning to rvalue` : `Parenthesized pattern`);
			}
		}, he.checkExpressionErrors = function(e, t) {
			if (!e) return !1;
			var n = e.shorthandAssign, r = e.doubleProto;
			if (!t) return n >= 0 || r >= 0;
			n >= 0 && this.raise(n, `Shorthand property assignments are valid only in destructuring patterns`), r >= 0 && this.raiseRecoverable(r, `Redefinition of __proto__ property`);
		}, he.checkYieldAwaitInDefaultParams = function() {
			this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, `Yield expression cannot be a default value`), this.awaitPos && this.raise(this.awaitPos, `Await expression cannot be a default value`);
		}, he.isSimpleAssignTarget = function(e) {
			return e.type === `ParenthesizedExpression` ? this.isSimpleAssignTarget(e.expression) : e.type === `Identifier` || e.type === `MemberExpression`;
		};
		var Y = J.prototype;
		Y.parseTopLevel = function(e) {
			var t = Object.create(null);
			for (e.body ||= []; this.type !== b.eof;) {
				var n = this.parseStatement(null, !0, t);
				e.body.push(n);
			}
			if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
				var a = i[r];
				this.raiseRecoverable(this.undefinedExports[a].start, `Export '` + a + `' is not defined`);
			}
			return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === `commonjs` ? `script` : this.options.sourceType, this.finishNode(e, `Program`);
		};
		var ye = { kind: `loop` }, be = { kind: `switch` };
		Y.isLet = function(e) {
			if (this.options.ecmaVersion < 6 || !this.isContextual(`let`)) return !1;
			E.lastIndex = this.pos;
			var t = E.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
			if (r === 91 || r === 92) return !0;
			if (e) return !1;
			if (r === 123) return !0;
			if (f(r)) {
				var i = n;
				do
					n += r <= 65535 ? 1 : 2;
				while (p(r = this.fullCharCodeAt(n)));
				if (r === 92) return !0;
				var a = this.input.slice(i, n);
				if (!c.test(a)) return !0;
			}
			return !1;
		}, Y.isAsyncFunction = function() {
			if (this.options.ecmaVersion < 8 || !this.isContextual(`async`)) return !1;
			E.lastIndex = this.pos;
			var e = E.exec(this.input), t = this.pos + e[0].length, n;
			return !x.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === `function` && (t + 8 === this.input.length || !(p(n = this.fullCharCodeAt(t + 8)) || n === 92));
		}, Y.isUsingKeyword = function(e, t) {
			if (this.options.ecmaVersion < 17 || !this.isContextual(e ? `await` : `using`)) return !1;
			E.lastIndex = this.pos;
			var n = E.exec(this.input), r = this.pos + n[0].length;
			if (x.test(this.input.slice(this.pos, r))) return !1;
			if (e) {
				var i = r + 5, a;
				if (this.input.slice(r, i) !== `using` || i === this.input.length || p(a = this.fullCharCodeAt(i)) || a === 92) return !1;
				E.lastIndex = i;
				var o = E.exec(this.input);
				if (r = i + o[0].length, o && x.test(this.input.slice(i, r))) return !1;
			}
			var s = this.fullCharCodeAt(r);
			if (!f(s) && s !== 92) return !1;
			var l = r;
			do
				r += s <= 65535 ? 1 : 2;
			while (p(s = this.fullCharCodeAt(r)));
			if (s === 92) return !0;
			var u = this.input.slice(l, r);
			if (c.test(u)) return !1;
			if (t && !e && u === `of`) {
				E.lastIndex = r;
				var d = E.exec(this.input);
				if (r += d[0].length, this.input.charCodeAt(r) !== 61 || (s = this.input.charCodeAt(r + 1)) === 61 || s === 62) return !1;
			}
			return !0;
		}, Y.isAwaitUsing = function(e) {
			return this.isUsingKeyword(!0, e);
		}, Y.isUsing = function(e) {
			return this.isUsingKeyword(!1, e);
		}, Y.parseStatement = function(e, t, n) {
			var r = this.type, i = this.startNode(), a;
			switch (this.isLet(e) && (r = b._var, a = `let`), r) {
				case b._break:
				case b._continue: return this.parseBreakContinueStatement(i, r.keyword);
				case b._debugger: return this.parseDebuggerStatement(i);
				case b._do: return this.parseDoStatement(i);
				case b._for: return this.parseForStatement(i);
				case b._function: return e && (this.strict || e !== `if` && e !== `label`) && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
				case b._class: return e && this.unexpected(), this.parseClass(i, !0);
				case b._if: return this.parseIfStatement(i);
				case b._return: return this.parseReturnStatement(i);
				case b._switch: return this.parseSwitchStatement(i);
				case b._throw: return this.parseThrowStatement(i);
				case b._try: return this.parseTryStatement(i);
				case b._const:
				case b._var: return a ||= this.value, e && a !== `var` && this.unexpected(), this.parseVarStatement(i, a);
				case b._while: return this.parseWhileStatement(i);
				case b._with: return this.parseWithStatement(i);
				case b.braceL: return this.parseBlock(!0, i);
				case b.semi: return this.parseEmptyStatement(i);
				case b._export:
				case b._import:
					if (this.options.ecmaVersion > 10 && r === b._import) {
						E.lastIndex = this.pos;
						var o = E.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
						if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
					}
					return this.options.allowImportExportEverywhere || (t || this.raise(this.start, `'import' and 'export' may only appear at the top level`), this.inModule || this.raise(this.start, `'import' and 'export' may appear only with 'sourceType: module'`)), r === b._import ? this.parseImport(i) : this.parseExport(i, n);
				default:
					if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
					var l = this.isAwaitUsing(!1) ? `await using` : this.isUsing(!1) ? `using` : null;
					if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), e && this.raise(this.start, `Using declaration is not allowed in single-statement positions`), l === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, `VariableDeclaration`);
					var u = this.value, d = this.parseExpression();
					return r === b.name && d.type === `Identifier` && this.eat(b.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
			}
		}, Y.parseBreakContinueStatement = function(e, t) {
			var n = t === `break`;
			this.next(), this.eat(b.semi) || this.insertSemicolon() ? e.label = null : this.type === b.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
			for (var r = 0; r < this.labels.length; ++r) {
				var i = this.labels[r];
				if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === `loop`) || e.label && n)) break;
			}
			return r === this.labels.length && this.raise(e.start, `Unsyntactic ` + t), this.finishNode(e, n ? `BreakStatement` : `ContinueStatement`);
		}, Y.parseDebuggerStatement = function(e) {
			return this.next(), this.semicolon(), this.finishNode(e, `DebuggerStatement`);
		}, Y.parseDoStatement = function(e) {
			return this.next(), this.labels.push(ye), e.body = this.parseStatement(`do`), this.labels.pop(), this.expect(b._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(b.semi) : this.semicolon(), this.finishNode(e, `DoWhileStatement`);
		}, Y.parseForStatement = function(e) {
			this.next();
			var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual(`await`) ? this.lastTokStart : -1;
			if (this.labels.push(ye), this.enterScope(0), this.expect(b.parenL), this.type === b.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
			var n = this.isLet();
			if (this.type === b._var || this.type === b._const || n) {
				var r = this.startNode(), i = n ? `let` : this.value;
				return this.next(), this.parseVar(r, !0, i), this.finishNode(r, `VariableDeclaration`), this.parseForAfterInit(e, r, t);
			}
			var a = this.isContextual(`let`), o = !1, s = this.isUsing(!0) ? `using` : this.isAwaitUsing(!0) ? `await using` : null;
			if (s) {
				var c = this.startNode();
				return this.next(), s === `await using` && (this.canAwait || this.raise(this.start, `Await using cannot appear outside of async function`), this.next()), this.parseVar(c, !0, s), this.finishNode(c, `VariableDeclaration`), this.parseForAfterInit(e, c, t);
			}
			var l = this.containsEsc, u = new ve(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, `await`) : this.parseExpression(!0, u);
			return this.type === b._in || (o = this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? (t > -1 ? (this.type === b._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === `Identifier` && f.name === `async` ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, `The left-hand side of a for-of loop may not start with 'let'.`), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
		}, Y.parseForAfterInit = function(e, t, n) {
			return (this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) && t.declarations.length === 1 ? (this.type === b._in ? (t.kind !== `using` && t.kind !== `await using` || t.declarations[0].init || this.raise(this.start, `Using declaration is not allowed in for-in loops`), this.options.ecmaVersion >= 9 && n > -1 && this.unexpected(n)) : this.options.ecmaVersion >= 9 && (e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
		}, Y.parseFunctionStatement = function(e, t, n) {
			return this.next(), this.parseFunction(e, Se | (n ? 0 : Ce), !1, t);
		}, Y.parseIfStatement = function(e) {
			return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement(`if`), e.alternate = this.eat(b._else) ? this.parseStatement(`if`) : null, this.finishNode(e, `IfStatement`);
		}, Y.parseReturnStatement = function(e) {
			return this.allowReturn || this.raise(this.start, `'return' outside of function`), this.next(), this.eat(b.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, `ReturnStatement`);
		}, Y.parseSwitchStatement = function(e) {
			this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(b.braceL), this.labels.push(be), this.enterScope(oe);
			for (var t, n = !1; this.type !== b.braceR;) if (this.type === b._case || this.type === b._default) {
				var r = this.type === b._case;
				t && this.finishNode(t, `SwitchCase`), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, `Multiple default clauses`), n = !0, t.test = null), this.expect(b.colon);
			} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
			return this.exitScope(), t && this.finishNode(t, `SwitchCase`), this.next(), this.labels.pop(), this.finishNode(e, `SwitchStatement`);
		}, Y.parseThrowStatement = function(e) {
			return this.next(), x.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, `Illegal newline after throw`), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, `ThrowStatement`);
		};
		var xe = [];
		Y.parseCatchClauseParam = function() {
			var e = this.parseBindingAtom(), t = e.type === `Identifier`;
			return this.enterScope(t ? W : 0), this.checkLValPattern(e, t ? fe : ue), this.expect(b.parenR), e;
		}, Y.parseTryStatement = function(e) {
			if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === b._catch) {
				var t = this.startNode();
				this.next(), this.eat(b.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, `CatchClause`);
			}
			return e.finalizer = this.eat(b._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, `Missing catch or finally clause`), this.finishNode(e, `TryStatement`);
		}, Y.parseVarStatement = function(e, t, n) {
			return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, `VariableDeclaration`);
		}, Y.parseWhileStatement = function(e) {
			return this.next(), e.test = this.parseParenExpression(), this.labels.push(ye), e.body = this.parseStatement(`while`), this.labels.pop(), this.finishNode(e, `WhileStatement`);
		}, Y.parseWithStatement = function(e) {
			return this.strict && this.raise(this.start, `'with' in strict mode`), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement(`with`), this.finishNode(e, `WithStatement`);
		}, Y.parseEmptyStatement = function(e) {
			return this.next(), this.finishNode(e, `EmptyStatement`);
		}, Y.parseLabeledStatement = function(e, t, n, r) {
			for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, `Label '` + t + `' is already declared`);
			for (var o = this.type.isLoop ? `loop` : this.type === b._switch ? `switch` : null, s = this.labels.length - 1; s >= 0; s--) {
				var c = this.labels[s];
				if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
				else break;
			}
			return this.labels.push({
				name: t,
				kind: o,
				statementStart: this.start
			}), e.body = this.parseStatement(r ? r.indexOf(`label`) === -1 ? r + `label` : r : `label`), this.labels.pop(), e.label = n, this.finishNode(e, `LabeledStatement`);
		}, Y.parseExpressionStatement = function(e, t) {
			return e.expression = t, this.semicolon(), this.finishNode(e, `ExpressionStatement`);
		}, Y.parseBlock = function(e, t, n) {
			for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(b.braceL), e && this.enterScope(0); this.type !== b.braceR;) {
				var r = this.parseStatement(null);
				t.body.push(r);
			}
			return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, `BlockStatement`);
		}, Y.parseFor = function(e, t) {
			return e.init = t, this.expect(b.semi), e.test = this.type === b.semi ? null : this.parseExpression(), this.expect(b.semi), e.update = this.type === b.parenR ? null : this.parseExpression(), this.expect(b.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, `ForStatement`);
		}, Y.parseForIn = function(e, t) {
			var n = this.type === b._in;
			return this.next(), t.type === `VariableDeclaration` && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== `var` || t.declarations[0].id.type !== `Identifier`) && this.raise(t.start, (n ? `for-in` : `for-of`) + ` loop variable declaration may not have an initializer`), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(b.parenR), e.body = this.parseStatement(`for`), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? `ForInStatement` : `ForOfStatement`);
		}, Y.parseVar = function(e, t, n, r) {
			for (e.declarations = [], e.kind = n;;) {
				var i = this.startNode();
				if (this.parseVarId(i, n), this.eat(b.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === `const` && !(this.type === b._in || this.options.ecmaVersion >= 6 && this.isContextual(`of`)) ? this.unexpected() : !r && (n === `using` || n === `await using`) && this.options.ecmaVersion >= 17 && this.type !== b._in && !this.isContextual(`of`) ? this.raise(this.lastTokEnd, `Missing initializer in ` + n + ` declaration`) : !r && i.id.type !== `Identifier` && (!t || this.type !== b._in && !this.isContextual(`of`)) ? this.raise(this.lastTokEnd, `Complex binding patterns require an initialization value`) : i.init = null, e.declarations.push(this.finishNode(i, `VariableDeclarator`)), !this.eat(b.comma)) break;
			}
			return e;
		}, Y.parseVarId = function(e, t) {
			e.id = t === `using` || t === `await using` ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === `var` ? le : ue, !1);
		};
		var Se = 1, Ce = 2, we = 4;
		Y.parseFunction = function(e, t, n, r, i) {
			this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === b.star && t & Ce && this.unexpected(), e.generator = this.eat(b.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Se && (e.id = t & we && this.type !== b.name ? null : this.parseIdent(), e.id && !(t & Ce) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? le : ue : de));
			var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
			return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(q(e.async, e.generator)), t & Se || (e.id = this.type === b.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Se ? `FunctionDeclaration` : `FunctionExpression`);
		}, Y.parseFunctionParams = function(e) {
			this.expect(b.parenL), e.params = this.parseBindingList(b.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
		}, Y.parseClass = function(e, t) {
			this.next();
			var n = this.strict;
			this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
			var r = this.enterClassBody(), i = this.startNode(), a = !1;
			for (i.body = [], this.expect(b.braceL); this.type !== b.braceR;) {
				var o = this.parseClassElement(e.superClass !== null);
				o && (i.body.push(o), o.type === `MethodDefinition` && o.kind === `constructor` ? (a && this.raiseRecoverable(o.start, `Duplicate constructor in the same class`), a = !0) : o.key && o.key.type === `PrivateIdentifier` && Te(r, o) && this.raiseRecoverable(o.key.start, `Identifier '#` + o.key.name + `' has already been declared`));
			}
			return this.strict = n, this.next(), e.body = this.finishNode(i, `ClassBody`), this.exitClassBody(), this.finishNode(e, t ? `ClassDeclaration` : `ClassExpression`);
		}, Y.parseClassElement = function(e) {
			if (this.eat(b.semi)) return null;
			var t = this.options.ecmaVersion, n = this.startNode(), r = ``, i = !1, a = !1, o = `method`, s = !1;
			if (this.eatContextual(`static`)) {
				if (t >= 13 && this.eat(b.braceL)) return this.parseClassStaticBlock(n), n;
				this.isClassElementNameStart() || this.type === b.star ? s = !0 : r = `static`;
			}
			if (n.static = s, !r && t >= 8 && this.eatContextual(`async`) && ((this.isClassElementNameStart() || this.type === b.star) && !this.canInsertSemicolon() ? a = !0 : r = `async`), !r && (t >= 9 || !a) && this.eat(b.star) && (i = !0), !r && !a && !i) {
				var c = this.value;
				(this.eatContextual(`get`) || this.eatContextual(`set`)) && (this.isClassElementNameStart() ? o = c : r = c);
			}
			if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, `Identifier`)) : this.parseClassElementName(n), t < 13 || this.type === b.parenL || o !== `method` || i || a) {
				var l = !n.static && Ee(n, `constructor`), u = l && e;
				l && o !== `method` && this.raise(n.key.start, `Constructor can't have get/set modifier`), n.kind = l ? `constructor` : o, this.parseClassMethod(n, i, a, u);
			} else this.parseClassField(n);
			return n;
		}, Y.isClassElementNameStart = function() {
			return this.type === b.name || this.type === b.privateId || this.type === b.num || this.type === b.string || this.type === b.bracketL || this.type.keyword;
		}, Y.parseClassElementName = function(e) {
			this.type === b.privateId ? (this.value === `constructor` && this.raise(this.start, `Classes can't have an element named '#constructor'`), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
		}, Y.parseClassMethod = function(e, t, n, r) {
			var i = e.key;
			e.kind === `constructor` ? (t && this.raise(i.start, `Constructor can't be a generator`), n && this.raise(i.start, `Constructor can't be an async method`)) : e.static && Ee(e, `prototype`) && this.raise(i.start, `Classes may not have a static property named prototype`);
			var a = e.value = this.parseMethod(t, n, r);
			return e.kind === `get` && a.params.length !== 0 && this.raiseRecoverable(a.start, `getter should have no params`), e.kind === `set` && a.params.length !== 1 && this.raiseRecoverable(a.start, `setter should have exactly one param`), e.kind === `set` && a.params[0].type === `RestElement` && this.raiseRecoverable(a.params[0].start, `Setter cannot use rest params`), this.finishNode(e, `MethodDefinition`);
		}, Y.parseClassField = function(e) {
			return Ee(e, `constructor`) ? this.raise(e.key.start, `Classes can't have a field named 'constructor'`) : e.static && Ee(e, `prototype`) && this.raise(e.key.start, `Classes can't have a static field named 'prototype'`), this.eat(b.eq) ? (this.enterScope(K | ie), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, `PropertyDefinition`);
		}, Y.parseClassStaticBlock = function(e) {
			e.body = [];
			var t = this.labels;
			for (this.labels = [], this.enterScope(G | ie); this.type !== b.braceR;) {
				var n = this.parseStatement(null);
				e.body.push(n);
			}
			return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, `StaticBlock`);
		}, Y.parseClassId = function(e, t) {
			this.type === b.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, ue, !1)) : (t === !0 && this.unexpected(), e.id = null);
		}, Y.parseClassSuper = function(e) {
			e.superClass = this.eat(b._extends) ? this.parseExprSubscripts(null, !1) : null;
		}, Y.enterClassBody = function() {
			var e = {
				declared: Object.create(null),
				used: []
			};
			return this.privateNameStack.push(e), e.declared;
		}, Y.exitClassBody = function() {
			var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
			if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
				var o = n[a];
				k(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, `Private field '#` + o.name + `' must be declared in an enclosing class`));
			}
		};
		function Te(e, t) {
			var n = t.key.name, r = e[n], i = `true`;
			return t.type === `MethodDefinition` && (t.kind === `get` || t.kind === `set`) && (i = (t.static ? `s` : `i`) + t.kind), r === `iget` && i === `iset` || r === `iset` && i === `iget` || r === `sget` && i === `sset` || r === `sset` && i === `sget` ? (e[n] = `true`, !1) : r ? !0 : (e[n] = i, !1);
		}
		function Ee(e, t) {
			var n = e.computed, r = e.key;
			return !n && (r.type === `Identifier` && r.name === t || r.type === `Literal` && r.value === t);
		}
		Y.parseExportAllDeclaration = function(e, t) {
			return this.options.ecmaVersion >= 11 && (this.eatContextual(`as`) ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual(`from`), this.type !== b.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ExportAllDeclaration`);
		}, Y.parseExport = function(e, t) {
			if (this.next(), this.eat(b.star)) return this.parseExportAllDeclaration(e, t);
			if (this.eat(b._default)) return this.checkExport(t, `default`, this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, `ExportDefaultDeclaration`);
			if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === `VariableDeclaration` ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
			else {
				if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual(`from`)) this.type !== b.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
				else {
					for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
						var i = r[n];
						this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === `Literal` && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
					}
					e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
				}
				this.semicolon();
			}
			return this.finishNode(e, `ExportNamedDeclaration`);
		}, Y.parseExportDeclaration = function(e) {
			return this.parseStatement(null);
		}, Y.parseExportDefaultDeclaration = function() {
			var e;
			if (this.type === b._function || (e = this.isAsyncFunction())) {
				var t = this.startNode();
				return this.next(), e && this.next(), this.parseFunction(t, Se | we, !1, e);
			}
			if (this.type === b._class) {
				var n = this.startNode();
				return this.parseClass(n, `nullableID`);
			}
			var r = this.parseMaybeAssign();
			return this.semicolon(), r;
		}, Y.checkExport = function(e, t, n) {
			e && (typeof t != `string` && (t = t.type === `Identifier` ? t.name : t.value), k(e, t) && this.raiseRecoverable(n, `Duplicate export '` + t + `'`), e[t] = !0);
		}, Y.checkPatternExport = function(e, t) {
			var n = t.type;
			if (n === `Identifier`) this.checkExport(e, t, t.start);
			else if (n === `ObjectPattern`) for (var r = 0, i = t.properties; r < i.length; r += 1) {
				var a = i[r];
				this.checkPatternExport(e, a);
			}
			else if (n === `ArrayPattern`) for (var o = 0, s = t.elements; o < s.length; o += 1) {
				var c = s[o];
				c && this.checkPatternExport(e, c);
			}
			else n === `Property` ? this.checkPatternExport(e, t.value) : n === `AssignmentPattern` ? this.checkPatternExport(e, t.left) : n === `RestElement` && this.checkPatternExport(e, t.argument);
		}, Y.checkVariableExport = function(e, t) {
			if (e) for (var n = 0, r = t; n < r.length; n += 1) {
				var i = r[n];
				this.checkPatternExport(e, i.id);
			}
		}, Y.shouldParseExportStatement = function() {
			return this.type.keyword === `var` || this.type.keyword === `const` || this.type.keyword === `class` || this.type.keyword === `function` || this.isLet() || this.isAsyncFunction();
		}, Y.parseExportSpecifier = function(e) {
			var t = this.startNode();
			return t.local = this.parseModuleExportName(), t.exported = this.eatContextual(`as`) ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, `ExportSpecifier`);
		}, Y.parseExportSpecifiers = function(e) {
			var t = [], n = !0;
			for (this.expect(b.braceL); !this.eat(b.braceR);) {
				if (n) n = !1;
				else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
				t.push(this.parseExportSpecifier(e));
			}
			return t;
		}, Y.parseImport = function(e) {
			return this.next(), this.type === b.string ? (e.specifiers = xe, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual(`from`), e.source = this.type === b.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, `ImportDeclaration`);
		}, Y.parseImportSpecifier = function() {
			var e = this.startNode();
			return e.imported = this.parseModuleExportName(), this.eatContextual(`as`) ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, ue), this.finishNode(e, `ImportSpecifier`);
		}, Y.parseImportDefaultSpecifier = function() {
			var e = this.startNode();
			return e.local = this.parseIdent(), this.checkLValSimple(e.local, ue), this.finishNode(e, `ImportDefaultSpecifier`);
		}, Y.parseImportNamespaceSpecifier = function() {
			var e = this.startNode();
			return this.next(), this.expectContextual(`as`), e.local = this.parseIdent(), this.checkLValSimple(e.local, ue), this.finishNode(e, `ImportNamespaceSpecifier`);
		}, Y.parseImportSpecifiers = function() {
			var e = [], t = !0;
			if (this.type === b.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(b.comma))) return e;
			if (this.type === b.star) return e.push(this.parseImportNamespaceSpecifier()), e;
			for (this.expect(b.braceL); !this.eat(b.braceR);) {
				if (t) t = !1;
				else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
				e.push(this.parseImportSpecifier());
			}
			return e;
		}, Y.parseWithClause = function() {
			var e = [];
			if (!this.eat(b._with)) return e;
			this.expect(b.braceL);
			for (var t = {}, n = !0; !this.eat(b.braceR);) {
				if (n) n = !1;
				else if (this.expect(b.comma), this.afterTrailingComma(b.braceR)) break;
				var r = this.parseImportAttribute(), i = r.key.type === `Identifier` ? r.key.name : r.key.value;
				k(t, i) && this.raiseRecoverable(r.key.start, `Duplicate attribute key '` + i + `'`), t[i] = !0, e.push(r);
			}
			return e;
		}, Y.parseImportAttribute = function() {
			var e = this.startNode();
			return e.key = this.type === b.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`), this.expect(b.colon), this.type !== b.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, `ImportAttribute`);
		}, Y.parseModuleExportName = function() {
			if (this.options.ecmaVersion >= 13 && this.type === b.string) {
				var e = this.parseLiteral(this.value);
				return N.test(e.value) && this.raise(e.start, `An export name cannot include a lone surrogate.`), e;
			}
			return this.parseIdent(!0);
		}, Y.adaptDirectivePrologue = function(e) {
			for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
		}, Y.isDirectiveCandidate = function(e) {
			return this.options.ecmaVersion >= 5 && e.type === `ExpressionStatement` && e.expression.type === `Literal` && typeof e.expression.value == `string` && (this.input[e.start] === `"` || this.input[e.start] === `'`);
		};
		var De = J.prototype;
		De.toAssignable = function(e, t, n) {
			if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
				case `Identifier`:
					this.inAsync && e.name === `await` && this.raise(e.start, `Cannot use 'await' as identifier inside an async function`);
					break;
				case `ObjectPattern`:
				case `ArrayPattern`:
				case `AssignmentPattern`:
				case `RestElement`: break;
				case `ObjectExpression`:
					e.type = `ObjectPattern`, n && this.checkPatternErrors(n, !0);
					for (var r = 0, i = e.properties; r < i.length; r += 1) {
						var a = i[r];
						this.toAssignable(a, t), a.type === `RestElement` && (a.argument.type === `ArrayPattern` || a.argument.type === `ObjectPattern`) && this.raise(a.argument.start, `Unexpected token`);
					}
					break;
				case `Property`:
					e.kind !== `init` && this.raise(e.key.start, `Object pattern can't contain getter or setter`), this.toAssignable(e.value, t);
					break;
				case `ArrayExpression`:
					e.type = `ArrayPattern`, n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
					break;
				case `SpreadElement`:
					e.type = `RestElement`, this.toAssignable(e.argument, t), e.argument.type === `AssignmentPattern` && this.raise(e.argument.start, `Rest elements cannot have a default value`);
					break;
				case `AssignmentExpression`:
					e.operator !== `=` && this.raise(e.left.end, `Only '=' operator can be used for specifying default value.`), e.type = `AssignmentPattern`, delete e.operator, this.toAssignable(e.left, t);
					break;
				case `ParenthesizedExpression`:
					this.toAssignable(e.expression, t, n);
					break;
				case `ChainExpression`:
					this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
					break;
				case `MemberExpression`: if (!t) break;
				default: this.raise(e.start, `Assigning to rvalue`);
			}
			else n && this.checkPatternErrors(n, !0);
			return e;
		}, De.toAssignableList = function(e, t) {
			for (var n = e.length, r = 0; r < n; r++) {
				var i = e[r];
				i && this.toAssignable(i, t);
			}
			if (n) {
				var a = e[n - 1];
				this.options.ecmaVersion === 6 && t && a && a.type === `RestElement` && a.argument.type !== `Identifier` && this.unexpected(a.argument.start);
			}
			return e;
		}, De.parseSpread = function(e) {
			var t = this.startNode();
			return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, `SpreadElement`);
		}, De.parseRestBinding = function() {
			var e = this.startNode();
			return this.next(), this.options.ecmaVersion === 6 && this.type !== b.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, `RestElement`);
		}, De.parseBindingAtom = function() {
			if (this.options.ecmaVersion >= 6) switch (this.type) {
				case b.bracketL:
					var e = this.startNode();
					return this.next(), e.elements = this.parseBindingList(b.bracketR, !0, !0), this.finishNode(e, `ArrayPattern`);
				case b.braceL: return this.parseObj(!0);
			}
			return this.parseIdent();
		}, De.parseBindingList = function(e, t, n, r) {
			for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(b.comma), t && this.type === b.comma) i.push(null);
			else if (n && this.afterTrailingComma(e)) break;
			else if (this.type === b.ellipsis) {
				var o = this.parseRestBinding();
				this.parseBindingListItem(o), i.push(o), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.expect(e);
				break;
			} else i.push(this.parseAssignableListItem(r));
			return i;
		}, De.parseAssignableListItem = function(e) {
			var t = this.parseMaybeDefault(this.start, this.startLoc);
			return this.parseBindingListItem(t), t;
		}, De.parseBindingListItem = function(e) {
			return e;
		}, De.parseMaybeDefault = function(e, t, n) {
			if (n ||= this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(b.eq)) return n;
			var r = this.startNodeAt(e, t);
			return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, `AssignmentPattern`);
		}, De.checkLValSimple = function(e, t, n) {
			t === void 0 && (t = ce);
			var r = t !== ce;
			switch (e.type) {
				case `Identifier`:
					this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? `Binding ` : `Assigning to `) + e.name + ` in strict mode`), r && (t === ue && e.name === `let` && this.raiseRecoverable(e.start, `let is disallowed as a lexically bound name`), n && (k(n, e.name) && this.raiseRecoverable(e.start, `Argument name clash`), n[e.name] = !0), t !== pe && this.declareName(e.name, t, e.start));
					break;
				case `ChainExpression`:
					this.raiseRecoverable(e.start, `Optional chaining cannot appear in left-hand side`);
					break;
				case `MemberExpression`:
					r && this.raiseRecoverable(e.start, `Binding member expression`);
					break;
				case `ParenthesizedExpression`: return r && this.raiseRecoverable(e.start, `Binding parenthesized expression`), this.checkLValSimple(e.expression, t, n);
				default: this.raise(e.start, (r ? `Binding` : `Assigning to`) + ` rvalue`);
			}
		}, De.checkLValPattern = function(e, t, n) {
			switch (t === void 0 && (t = ce), e.type) {
				case `ObjectPattern`:
					for (var r = 0, i = e.properties; r < i.length; r += 1) {
						var a = i[r];
						this.checkLValInnerPattern(a, t, n);
					}
					break;
				case `ArrayPattern`:
					for (var o = 0, s = e.elements; o < s.length; o += 1) {
						var c = s[o];
						c && this.checkLValInnerPattern(c, t, n);
					}
					break;
				default: this.checkLValSimple(e, t, n);
			}
		}, De.checkLValInnerPattern = function(e, t, n) {
			switch (t === void 0 && (t = ce), e.type) {
				case `Property`:
					this.checkLValInnerPattern(e.value, t, n);
					break;
				case `AssignmentPattern`:
					this.checkLValPattern(e.left, t, n);
					break;
				case `RestElement`:
					this.checkLValPattern(e.argument, t, n);
					break;
				default: this.checkLValPattern(e, t, n);
			}
		};
		var Oe = function(e, t, n, r, i) {
			this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
		}, X = {
			b_stat: new Oe(`{`, !1),
			b_expr: new Oe(`{`, !0),
			b_tmpl: new Oe("${", !1),
			p_stat: new Oe(`(`, !1),
			p_expr: new Oe(`(`, !0),
			q_tmpl: new Oe("`", !0, !0, function(e) {
				return e.tryReadTemplateToken();
			}),
			f_stat: new Oe(`function`, !1),
			f_expr: new Oe(`function`, !0),
			f_expr_gen: new Oe(`function`, !0, !1, null, !0),
			f_gen: new Oe(`function`, !1, !1, null, !0)
		}, ke = J.prototype;
		ke.initialContext = function() {
			return [X.b_stat];
		}, ke.curContext = function() {
			return this.context[this.context.length - 1];
		}, ke.braceIsBlock = function(e) {
			var t = this.curContext();
			return t === X.f_expr || t === X.f_stat ? !0 : e === b.colon && (t === X.b_stat || t === X.b_expr) ? !t.isExpr : e === b._return || e === b.name && this.exprAllowed ? x.test(this.input.slice(this.lastTokEnd, this.start)) : e === b._else || e === b.semi || e === b.eof || e === b.parenR || e === b.arrow ? !0 : e === b.braceL ? t === X.b_stat : e === b._var || e === b._const || e === b.name ? !1 : !this.exprAllowed;
		}, ke.inGeneratorContext = function() {
			for (var e = this.context.length - 1; e >= 1; e--) {
				var t = this.context[e];
				if (t.token === `function`) return t.generator;
			}
			return !1;
		}, ke.updateContext = function(e) {
			var t, n = this.type;
			n.keyword && e === b.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
		}, ke.overrideContext = function(e) {
			this.curContext() !== e && (this.context[this.context.length - 1] = e);
		}, b.parenR.updateContext = b.braceR.updateContext = function() {
			if (this.context.length === 1) this.exprAllowed = !0;
			else {
				var e = this.context.pop();
				e === X.b_stat && this.curContext().token === `function` && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
			}
		}, b.braceL.updateContext = function(e) {
			this.context.push(this.braceIsBlock(e) ? X.b_stat : X.b_expr), this.exprAllowed = !0;
		}, b.dollarBraceL.updateContext = function() {
			this.context.push(X.b_tmpl), this.exprAllowed = !0;
		}, b.parenL.updateContext = function(e) {
			var t = e === b._if || e === b._for || e === b._with || e === b._while;
			this.context.push(t ? X.p_stat : X.p_expr), this.exprAllowed = !0;
		}, b.incDec.updateContext = function() {}, b._function.updateContext = b._class.updateContext = function(e) {
			e.beforeExpr && e !== b._else && (e !== b.semi || this.curContext() === X.p_stat) && !(e === b._return && x.test(this.input.slice(this.lastTokEnd, this.start))) && (e !== b.colon && e !== b.braceL || this.curContext() !== X.b_stat) ? this.context.push(X.f_expr) : this.context.push(X.f_stat), this.exprAllowed = !1;
		}, b.colon.updateContext = function() {
			this.curContext().token === `function` && this.context.pop(), this.exprAllowed = !0;
		}, b.backQuote.updateContext = function() {
			this.curContext() === X.q_tmpl ? this.context.pop() : this.context.push(X.q_tmpl), this.exprAllowed = !1;
		}, b.star.updateContext = function(e) {
			if (e === b._function) {
				var t = this.context.length - 1;
				this.context[t] === X.f_expr ? this.context[t] = X.f_expr_gen : this.context[t] = X.f_gen;
			}
			this.exprAllowed = !0;
		}, b.name.updateContext = function(e) {
			var t = !1;
			this.options.ecmaVersion >= 6 && e !== b.dot && (this.value === `of` && !this.exprAllowed || this.value === `yield` && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
		};
		var Z = J.prototype;
		Z.checkPropClash = function(e, t, n) {
			if (!(this.options.ecmaVersion >= 9 && e.type === `SpreadElement`) && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
				var r = e.key, i;
				switch (r.type) {
					case `Identifier`:
						i = r.name;
						break;
					case `Literal`:
						i = String(r.value);
						break;
					default: return;
				}
				var a = e.kind;
				if (this.options.ecmaVersion >= 6) {
					i === `__proto__` && a === `init` && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, `Redefinition of __proto__ property`)), t.proto = !0);
					return;
				}
				i = `$` + i;
				var o = t[i];
				o ? (a === `init` ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, `Redefinition of property`) : o = t[i] = {
					init: !1,
					get: !1,
					set: !1
				}, o[a] = !0;
			}
		}, Z.parseExpression = function(e, t) {
			var n = this;
			return this.catchStackOverflow(function() {
				var r = n.start, i = n.startLoc, a = n.parseMaybeAssign(e, t);
				if (n.type === b.comma) {
					var o = n.startNodeAt(r, i);
					for (o.expressions = [a]; n.eat(b.comma);) o.expressions.push(n.parseMaybeAssign(e, t));
					return n.finishNode(o, `SequenceExpression`);
				}
				return a;
			});
		}, Z.parseMaybeAssign = function(e, t, n) {
			if (this.isContextual(`yield`)) {
				if (this.inGenerator) return this.parseYield(e);
				this.exprAllowed = !1;
			}
			var r = !1, i = -1, a = -1, o = -1;
			t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new ve(), r = !0);
			var s = this.start, c = this.startLoc;
			(this.type === b.parenL || this.type === b.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === `await`);
			var l = this.parseMaybeConditional(e, t);
			if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
				var u = this.startNodeAt(s, c);
				return u.operator = this.value, this.type === b.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = -1, t.shorthandAssign >= l.start && (t.shorthandAssign = -1), t.doubleProto >= l.start && (t.doubleProto = -1)), this.type === b.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, `AssignmentExpression`);
			}
			return r && this.checkExpressionErrors(t, !0), i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
		}, Z.parseMaybeConditional = function(e, t) {
			var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
			if (this.checkExpressionErrors(t)) return i;
			if ((i.type !== `ArrowFunctionExpression` || i.start !== n) && this.eat(b.question)) {
				var a = this.startNodeAt(n, r);
				return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(b.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, `ConditionalExpression`);
			}
			return i;
		}, Z.parseExprOps = function(e, t) {
			var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
			return this.checkExpressionErrors(t) || i.start === n && i.type === `ArrowFunctionExpression` ? i : this.parseExprOp(i, n, r, -1, e);
		}, Z.parseExprOp = function(e, t, n, r, i) {
			var a = this.type.binop;
			if (a != null && (!i || this.type !== b._in) && a > r) {
				var o = this.type === b.logicalOR || this.type === b.logicalAND, s = this.type === b.coalesce;
				s && (a = b.logicalAND.binop);
				var c = this.value;
				this.next();
				var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
				return (o && this.type === b.coalesce || s && (this.type === b.logicalOR || this.type === b.logicalAND)) && this.raiseRecoverable(this.start, `Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses`), this.parseExprOp(f, t, n, r, i);
			}
			return e;
		}, Z.buildBinary = function(e, t, n, r, i, a) {
			r.type === `PrivateIdentifier` && this.raise(r.start, `Private identifier can only be left side of binary expression`);
			var o = this.startNodeAt(e, t);
			return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? `LogicalExpression` : `BinaryExpression`);
		}, Z.parseMaybeUnary = function(e, t, n, r) {
			var i = this.start, a = this.startLoc, o;
			if (this.isContextual(`await`) && this.canAwait) o = this.parseAwait(r), t = !0;
			else if (this.type.prefix) {
				var s = this.startNode(), c = this.type === b.incDec;
				s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === `delete` && Ae(s.argument) ? this.raiseRecoverable(s.start, `Deleting local variable in strict mode`) : s.operator === `delete` && je(s.argument) ? this.raiseRecoverable(s.start, `Private fields can not be deleted`) : t = !0, o = this.finishNode(s, c ? `UpdateExpression` : `UnaryExpression`);
			} else if (!t && this.type === b.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== b._in && this.unexpected();
			else {
				if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
				for (; this.type.postfix && !this.canInsertSemicolon();) {
					var l = this.startNodeAt(i, a);
					l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, `UpdateExpression`);
				}
			}
			if (!n && (o.type !== `ArrowFunctionExpression` || o.start !== i) && this.eat(b.starstar)) {
				if (t) this.unexpected(this.lastTokStart);
				else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), `**`, !1);
			} else return o;
		};
		function Ae(e) {
			return e.type === `Identifier` || e.type === `ParenthesizedExpression` && Ae(e.expression);
		}
		function je(e) {
			return e.type === `MemberExpression` && e.property.type === `PrivateIdentifier` || e.type === `ChainExpression` && je(e.expression) || e.type === `ParenthesizedExpression` && je(e.expression);
		}
		Z.parseExprSubscripts = function(e, t) {
			var n = this.start, r = this.startLoc, i = -1, a = -1;
			e && (i = e.doubleProto, a = e.shorthandAssign, e.doubleProto = e.shorthandAssign = -1);
			var o = this.parseExprAtom(e, t);
			if (o.type === `ArrowFunctionExpression` && this.input.slice(this.lastTokStart, this.lastTokEnd) !== `)`) return o;
			var s = this.parseSubscripts(o, n, r, !1, t);
			return e && (s.end > o.end && (this.checkExpressionErrors(e, !0), e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1), e.trailingComma >= s.start && (e.trailingComma = -1)), i > -1 && (e.doubleProto = i), a > -1 && (e.shorthandAssign = a)), s;
		}, Z.parseSubscripts = function(e, t, n, r, i) {
			for (var a = this.options.ecmaVersion >= 8 && e.type === `Identifier` && e.name === `async` && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
				var s = this.parseSubscript(e, t, n, r, a, o, i);
				if (s.optional && (o = !0), s.end === e.end || s.type === `ArrowFunctionExpression`) {
					if (o) {
						var c = this.startNodeAt(t, n);
						c.expression = s, s = this.finishNode(c, `ChainExpression`);
					}
					return s;
				}
				e = s, a = !1;
			}
		}, Z.shouldParseAsyncArrow = function() {
			return !this.canInsertSemicolon() && this.eat(b.arrow);
		}, Z.parseSubscriptAsyncArrow = function(e, t, n, r) {
			return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
		}, Z.parseSubscript = function(e, t, n, r, i, a, o) {
			var s = this.options.ecmaVersion >= 11, c = s && this.eat(b.questionDot);
			r && c && this.raise(this.lastTokStart, `Optional chaining cannot appear in the callee of new expressions`);
			var l = this.eat(b.bracketL);
			if (l || c && this.type !== b.parenL && this.type !== b.backQuote || this.eat(b.dot)) {
				var u = this.startNodeAt(t, n);
				u.object = e, l ? (u.property = this.parseExpression(), this.expect(b.bracketR)) : u.property = this.type === b.privateId && e.type !== `Super` ? this.parsePrivateIdent() : this.parseIdent(this.options.allowReserved !== `never`), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, `MemberExpression`);
			} else if (!r && this.eat(b.parenL)) {
				var d = new ve(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
				this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
				var h = this.parseExprList(b.parenR, this.options.ecmaVersion >= 8, !1, d);
				if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, `Cannot use 'await' as identifier inside an async function`), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
				this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
				var g = this.startNodeAt(t, n);
				g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, `CallExpression`);
			} else if (this.type === b.backQuote) {
				(c || a) && this.raise(this.start, `Optional chaining cannot appear in the tag of tagged template expressions`);
				var _ = this.startNodeAt(t, n);
				_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, `TaggedTemplateExpression`);
			}
			return e;
		}, Z.parseExprAtom = function(e, t, n) {
			this.type === b.slash && this.readRegexp();
			var r, i = this.potentialArrowAt === this.start;
			switch (this.type) {
				case b._super: return this.allowSuper || this.raise(this.start, `'super' keyword outside a method`), r = this.startNode(), this.next(), this.type === b.parenL && !this.allowDirectSuper && this.raise(r.start, `super() call outside constructor of a subclass`), this.type !== b.dot && this.type !== b.bracketL && this.type !== b.parenL && this.unexpected(), this.finishNode(r, `Super`);
				case b._this: return r = this.startNode(), this.next(), this.finishNode(r, `ThisExpression`);
				case b.name:
					var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
					if (this.options.ecmaVersion >= 8 && !s && c.name === `async` && !this.canInsertSemicolon() && this.eat(b._function)) return this.overrideContext(X.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
					if (i && !this.canInsertSemicolon()) {
						if (this.eat(b.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
						if (this.options.ecmaVersion >= 8 && c.name === `async` && this.type === b.name && !s && (!this.potentialArrowInForAwait || this.value !== `of` || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(b.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
					}
					return c;
				case b.regexp:
					var l = this.value;
					return r = this.parseLiteral(l.value), r.regex = {
						pattern: l.pattern,
						flags: l.flags
					}, r;
				case b.num:
				case b.string: return this.parseLiteral(this.value);
				case b._null:
				case b._true:
				case b._false: return r = this.startNode(), r.value = this.type === b._null ? null : this.type === b._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, `Literal`);
				case b.parenL:
					var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
					return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
				case b.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(b.bracketR, !0, !0, e), this.finishNode(r, `ArrayExpression`);
				case b.braceL: return this.overrideContext(X.b_expr), this.parseObj(!1, e);
				case b._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
				case b._class: return this.parseClass(this.startNode(), !1);
				case b._new: return this.parseNew();
				case b.backQuote: return this.parseTemplate();
				case b._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
				default: return this.parseExprAtomDefault();
			}
		}, Z.parseExprAtomDefault = function() {
			this.unexpected();
		}, Z.parseExprImport = function(e) {
			var t = this.startNode();
			if (this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword import`), this.next(), this.type === b.parenL && !e) return this.parseDynamicImport(t);
			if (this.type === b.dot) {
				var n = this.startNodeAt(t.start, t.loc && t.loc.start);
				return n.name = `import`, t.meta = this.finishNode(n, `Identifier`), this.parseImportMeta(t);
			}
			this.unexpected();
		}, Z.parseDynamicImport = function(e) {
			if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(b.parenR) ? e.options = null : (this.expect(b.comma), this.afterTrailingComma(b.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(b.parenR) || (this.expect(b.comma), this.afterTrailingComma(b.parenR) || this.unexpected())));
			else if (!this.eat(b.parenR)) {
				var t = this.start;
				this.eat(b.comma) && this.eat(b.parenR) ? this.raiseRecoverable(t, `Trailing comma is not allowed in import()`) : this.unexpected(t);
			}
			return this.finishNode(e, `ImportExpression`);
		}, Z.parseImportMeta = function(e) {
			this.next();
			var t = this.containsEsc;
			return e.property = this.parseIdent(!0), e.property.name !== `meta` && this.raiseRecoverable(e.property.start, `The only valid meta property for import is 'import.meta'`), t && this.raiseRecoverable(e.start, `'import.meta' must not contain escaped characters`), this.options.sourceType !== `module` && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, `Cannot use 'import.meta' outside a module`), this.finishNode(e, `MetaProperty`);
		}, Z.parseLiteral = function(e) {
			var t = this.startNode();
			return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, ``) : t.value.toString()), this.next(), this.finishNode(t, `Literal`);
		}, Z.parseParenExpression = function() {
			this.expect(b.parenL);
			var e = this.parseExpression();
			return this.expect(b.parenR), e;
		}, Z.shouldParseArrow = function(e) {
			return !this.canInsertSemicolon();
		}, Z.parseParenAndDistinguishExpression = function(e, t) {
			var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
			if (this.options.ecmaVersion >= 6) {
				this.next();
				var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new ve(), f = this.yieldPos, p = this.awaitPos, m;
				for (this.yieldPos = 0, this.awaitPos = 0; this.type !== b.parenR;) {
					if (l ? l = !1 : this.expect(b.comma), a && this.afterTrailingComma(b.parenR, !0)) {
						u = !0;
						break;
					}
					if (this.type === b.ellipsis) {
						m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`);
						break;
					}
					c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
				}
				var h = this.lastTokEnd, g = this.lastTokEndLoc;
				if (this.expect(b.parenR), e && this.shouldParseArrow(c) && this.eat(b.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
				(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, `SequenceExpression`, h, g)) : i = c[0];
			} else i = this.parseParenExpression();
			if (this.options.preserveParens) {
				var _ = this.startNodeAt(n, r);
				return _.expression = i, this.finishNode(_, `ParenthesizedExpression`);
			}
			return i;
		}, Z.parseParenItem = function(e) {
			return e;
		}, Z.parseParenArrowList = function(e, t, n, r) {
			return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
		};
		var Me = [];
		Z.parseNew = function() {
			this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword new`);
			var e = this.startNode();
			if (this.next(), this.options.ecmaVersion >= 6 && this.type === b.dot) {
				var t = this.startNodeAt(e.start, e.loc && e.loc.start);
				t.name = `new`, e.meta = this.finishNode(t, `Identifier`), this.next();
				var n = this.containsEsc;
				return e.property = this.parseIdent(!0), e.property.name !== `target` && this.raiseRecoverable(e.property.start, `The only valid meta property for new is 'new.target'`), n && this.raiseRecoverable(e.start, `'new.target' must not contain escaped characters`), this.allowNewDotTarget || this.raiseRecoverable(e.start, `'new.target' can only be used in functions and class static block`), this.finishNode(e, `MetaProperty`);
			}
			var r = this.start, i = this.startLoc;
			return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), e.callee.type === `Super` && this.raiseRecoverable(r, `Invalid use of 'super'`), e.arguments = this.eat(b.parenL) ? this.parseExprList(b.parenR, this.options.ecmaVersion >= 8, !1) : Me, this.finishNode(e, `NewExpression`);
		}, Z.parseTemplateElement = function(e) {
			var t = e.isTagged, n = this.startNode();
			return this.type === b.invalidTemplate ? (t || this.raiseRecoverable(this.start, `Bad escape sequence in untagged template literal`), n.value = {
				raw: this.value.replace(/\r\n?/g, `
`),
				cooked: null
			}) : n.value = {
				raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
				cooked: this.value
			}, this.next(), n.tail = this.type === b.backQuote, this.finishNode(n, `TemplateElement`);
		}, Z.parseTemplate = function(e) {
			e === void 0 && (e = {});
			var t = e.isTagged;
			t === void 0 && (t = !1);
			var n = this.startNode();
			this.next(), n.expressions = [];
			var r = this.parseTemplateElement({ isTagged: t });
			for (n.quasis = [r]; !r.tail;) this.type === b.eof && this.raise(this.pos, `Unterminated template literal`), this.expect(b.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(b.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
			return this.next(), this.finishNode(n, `TemplateLiteral`);
		}, Z.isAsyncProp = function(e) {
			return !e.computed && e.key.type === `Identifier` && e.key.name === `async` && (this.type === b.name || this.type === b.num || this.type === b.string || this.type === b.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === b.star) && !x.test(this.input.slice(this.lastTokEnd, this.start));
		}, Z.parseObj = function(e, t) {
			var n = this.startNode(), r = !0, i = {};
			for (n.properties = [], this.next(); !this.eat(b.braceR);) {
				if (r) r = !1;
				else if (this.expect(b.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(b.braceR)) break;
				var a = this.parseProperty(e, t);
				e || this.checkPropClash(a, i, t), n.properties.push(a);
			}
			return this.finishNode(n, e ? `ObjectPattern` : `ObjectExpression`);
		}, Z.parseProperty = function(e, t) {
			var n = this.startNode(), r, i, a, o;
			if (this.options.ecmaVersion >= 9 && this.eat(b.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === b.comma && this.raiseRecoverable(this.start, `Comma is not permitted after the rest element`), this.finishNode(n, `RestElement`)) : (n.argument = this.parseMaybeAssign(!1, t), this.type === b.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, `SpreadElement`));
			this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(b.star)));
			var s = this.containsEsc;
			return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(b.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, `Property`);
		}, Z.parseGetterSetter = function(e) {
			var t = e.key.name;
			this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
			var n = e.kind === `get` ? 0 : 1;
			if (e.value.params.length !== n) {
				var r = e.value.start;
				e.kind === `get` ? this.raiseRecoverable(r, `getter should have no params`) : this.raiseRecoverable(r, `setter should have exactly one param`);
			} else e.kind === `set` && e.value.params[0].type === `RestElement` && this.raiseRecoverable(e.value.params[0].start, `Setter cannot use rest params`);
		}, Z.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
			(n || r) && this.type === b.colon && this.unexpected(), this.eat(b.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = `init`) : this.options.ecmaVersion >= 6 && this.type === b.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = `init`) : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === `Identifier` && (e.key.name === `get` || e.key.name === `set`) && this.type !== b.comma && this.type !== b.braceR && this.type !== b.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === `Identifier` ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === b.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = `init`, e.shorthand = !0) : this.unexpected();
		}, Z.parsePropertyName = function(e) {
			if (this.options.ecmaVersion >= 6) {
				if (this.eat(b.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(b.bracketR), e.key;
				e.computed = !1;
			}
			return e.key = this.type === b.num || this.type === b.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== `never`);
		}, Z.initFunction = function(e) {
			e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
		}, Z.parseMethod = function(e, t, n) {
			var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
			return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(q(t, r.generator) | ie | (n ? ae : 0)), this.expect(b.parenL), r.params = this.parseBindingList(b.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, `FunctionExpression`);
		}, Z.parseArrowExpression = function(e, t, n, r) {
			var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
			return this.enterScope(q(n, !1) | U), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, `ArrowFunctionExpression`);
		}, Z.parseFunctionBody = function(e, t, n, r) {
			var i = t && this.type !== b.braceL, a = this.strict, o = !1;
			if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
			else {
				var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
				(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, `Illegal 'use strict' directive in function with non-simple parameter list`));
				var c = this.labels;
				this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, pe), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
			}
			this.exitScope();
		}, Z.isSimpleParamList = function(e) {
			for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== `Identifier`) return !1;
			return !0;
		}, Z.checkParams = function(e, t) {
			for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
				var a = i[r];
				this.checkLValInnerPattern(a, le, t ? null : n);
			}
		}, Z.parseExprList = function(e, t, n, r) {
			for (var i = [], a = !0; !this.eat(e);) {
				if (a) a = !1;
				else if (this.expect(b.comma), t && this.afterTrailingComma(e)) break;
				var o = void 0;
				n && this.type === b.comma ? o = null : this.type === b.ellipsis ? (o = this.parseSpread(r), r && this.type === b.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
			}
			return i;
		}, Z.checkUnreserved = function(e) {
			var t = e.start, n = e.end, r = e.name;
			this.inGenerator && r === `yield` && this.raiseRecoverable(t, `Cannot use 'yield' as identifier inside a generator`), this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use 'await' as identifier inside an async function`), !(this.currentThisScope().flags & se) && r === `arguments` && this.raiseRecoverable(t, `Cannot use 'arguments' in class field initializer`), this.inClassStaticBlock && (r === `arguments` || r === `await`) && this.raise(t, `Cannot use ` + r + ` in class static initialization block`), this.keywords.test(r) && this.raise(t, `Unexpected keyword '` + r + `'`), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf(`\\`) !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === `await` && this.raiseRecoverable(t, `Cannot use keyword 'await' outside an async function`), this.raiseRecoverable(t, `The keyword '` + r + `' is reserved`));
		}, Z.parseIdent = function(e) {
			var t = this.parseIdentNode();
			return this.next(!!e), this.finishNode(t, `Identifier`), e || (this.checkUnreserved(t), t.name === `await` && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
		}, Z.parseIdentNode = function() {
			var e = this.startNode();
			return this.type === b.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, e.name !== `class` && e.name !== `function` || this.lastTokEnd === this.lastTokStart + 1 && this.input.charCodeAt(this.lastTokStart) === 46 || this.context.pop(), this.type = b.name) : this.unexpected(), e;
		}, Z.parsePrivateIdent = function() {
			var e = this.startNode();
			return this.type === b.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, `PrivateIdentifier`), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, `Private field '#` + e.name + `' must be declared in an enclosing class`) : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
		}, Z.parseYield = function(e) {
			this.yieldPos ||= this.start;
			var t = this.startNode();
			return this.next(), this.type === b.semi || this.canInsertSemicolon() || this.type !== b.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(b.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, `YieldExpression`);
		}, Z.parseAwait = function(e) {
			this.awaitPos ||= this.start;
			var t = this.startNode();
			return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, `AwaitExpression`);
		};
		var Ne = J.prototype;
		Ne.raise = function(e, t) {
			var n = I(this.input, e);
			t += ` (` + n.line + `:` + n.column + `)`, this.sourceFile && (t += ` in ` + this.sourceFile);
			var r = SyntaxError(t);
			throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
		}, Ne.raiseRecoverable = Ne.raise, Ne.curPosition = function() {
			if (this.options.locations) return new P(this.curLine, this.pos - this.lineStart);
		};
		var Pe = J.prototype, Fe = function(e) {
			this.flags = e, this.var = [], this.lexical = [], this.functions = [];
		};
		Pe.enterScope = function(e) {
			this.scopeStack.push(new Fe(e));
		}, Pe.exitScope = function() {
			this.scopeStack.pop();
		}, Pe.treatFunctionsAsVarInScope = function(e) {
			return e.flags & V || !this.inModule && e.flags & B;
		}, Pe.declareName = function(e, t, n) {
			var r = !1;
			if (t === ue) {
				var i = this.currentScope();
				r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & B && delete this.undefinedExports[e];
			} else if (t === fe) this.currentScope().lexical.push(e);
			else if (t === de) {
				var a = this.currentScope();
				r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
			} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
				var s = this.scopeStack[o];
				if (s.lexical.indexOf(e) > -1 && !(s.flags & W && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
					r = !0;
					break;
				}
				if (s.var.push(e), this.inModule && s.flags & B && delete this.undefinedExports[e], s.flags & se) break;
			}
			r && this.raiseRecoverable(n, `Identifier '` + e + `' has already been declared`);
		}, Pe.checkLocalExport = function(e) {
			this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
		}, Pe.currentScope = function() {
			return this.scopeStack[this.scopeStack.length - 1];
		}, Pe.currentVarScope = function() {
			for (var e = this.scopeStack.length - 1;; e--) {
				var t = this.scopeStack[e];
				if (t.flags & (se | K | G)) return t;
			}
		}, Pe.currentThisScope = function() {
			for (var e = this.scopeStack.length - 1;; e--) {
				var t = this.scopeStack[e];
				if (t.flags & (se | K | G) && !(t.flags & U)) return t;
			}
		};
		var Ie = function(e, t, n) {
			this.type = ``, this.start = t, this.end = 0, e.options.locations && (this.loc = new F(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
		}, Le = J.prototype;
		Le.startNode = function() {
			return new Ie(this, this.start, this.startLoc);
		}, Le.startNodeAt = function(e, t) {
			return new Ie(this, e, t);
		};
		function Re(e, t, n, r) {
			return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
		}
		Le.finishNode = function(e, t) {
			return Re.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
		}, Le.finishNodeAt = function(e, t, n, r) {
			return Re.call(this, e, t, n, r);
		}, Le.copyNode = function(e) {
			var t = new Ie(this, e.start, this.startLoc);
			for (var n in e) t[n] = e[n];
			return t;
		};
		var ze = `Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz`, Be = `ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS`, Ve = Be + ` Extended_Pictographic`, He = Ve, Ue = He + ` EBase EComp EMod EPres ExtPict`, We = Ue, Ge = {
			9: Be,
			10: Ve,
			11: He,
			12: Ue,
			13: We,
			14: We
		}, Ke = {
			9: ``,
			10: ``,
			11: ``,
			12: ``,
			13: ``,
			14: `Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji`
		}, qe = `Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu`, Je = `Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb`, Ye = Je + ` Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd`, Xe = Ye + ` Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho`, Ze = Xe + ` Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi`, Qe = Ze + ` Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith`, $e = {
			9: Je,
			10: Ye,
			11: Xe,
			12: Ze,
			13: Qe,
			14: Qe + ` ` + ze
		}, et = {};
		function tt(e) {
			var t = et[e] = {
				binary: M(Ge[e] + ` ` + qe),
				binaryOfStrings: M(Ke[e]),
				nonBinary: {
					General_Category: M(qe),
					Script: M($e[e])
				}
			};
			t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
		}
		for (var nt = 0, rt = [
			9,
			10,
			11,
			12,
			13,
			14
		]; nt < rt.length; nt += 1) {
			var it = rt[nt];
			tt(it);
		}
		var Q = J.prototype, at = function(e, t) {
			this.parent = e, this.base = t || this;
		};
		at.prototype.separatedFrom = function(e) {
			for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
			return !1;
		}, at.prototype.sibling = function() {
			return new at(this.parent, this.base);
		};
		var ot = function(e) {
			this.parser = e, this.validFlags = `gim` + (e.options.ecmaVersion >= 6 ? `uy` : ``) + (e.options.ecmaVersion >= 9 ? `s` : ``) + (e.options.ecmaVersion >= 13 ? `d` : ``) + (e.options.ecmaVersion >= 15 ? `v` : ``), this.unicodeProperties = et[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = ``, this.flags = ``, this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = ``, this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
		};
		ot.prototype.reset = function(e, t, n) {
			var r = n.indexOf(`v`) !== -1, i = n.indexOf(`u`) !== -1;
			this.start = e | 0, this.source = t + ``, this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
		}, ot.prototype.raise = function(e) {
			this.parser.raiseRecoverable(this.start, `Invalid regular expression: /` + this.source + `/: ` + e);
		}, ot.prototype.at = function(e, t) {
			t === void 0 && (t = !1);
			var n = this.source, r = n.length;
			if (e >= r) return -1;
			var i = n.charCodeAt(e);
			if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
			var a = n.charCodeAt(e + 1);
			return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
		}, ot.prototype.nextIndex = function(e, t) {
			t === void 0 && (t = !1);
			var n = this.source, r = n.length;
			if (e >= r) return r;
			var i = n.charCodeAt(e), a;
			return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
		}, ot.prototype.current = function(e) {
			return e === void 0 && (e = !1), this.at(this.pos, e);
		}, ot.prototype.lookahead = function(e) {
			return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
		}, ot.prototype.advance = function(e) {
			e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
		}, ot.prototype.eat = function(e, t) {
			return t === void 0 && (t = !1), this.current(t) === e && (this.advance(t), !0);
		}, ot.prototype.eatChars = function(e, t) {
			t === void 0 && (t = !1);
			for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
				var a = i[r], o = this.at(n, t);
				if (o === -1 || o !== a) return !1;
				n = this.nextIndex(n, t);
			}
			return this.pos = n, !0;
		}, Q.validateRegExpFlags = function(e) {
			for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
				var o = n.charAt(a);
				t.indexOf(o) === -1 && this.raise(e.start, `Invalid regular expression flag`), n.indexOf(o, a + 1) > -1 && this.raise(e.start, `Duplicate regular expression flag`), o === `u` && (r = !0), o === `v` && (i = !0);
			}
			this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, `Invalid regular expression flag`);
		};
		function st(e) {
			for (var t in e) return !0;
			return !1;
		}
		Q.validateRegExpPattern = function(e) {
			this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && st(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
		}, Q.regexp_pattern = function(e) {
			e.pos = 0, e.lastIntValue = 0, e.lastStringValue = ``, e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise(`Unmatched ')'`), (e.eat(93) || e.eat(125)) && e.raise(`Lone quantifier brackets`)), e.maxBackReference > e.numCapturingParens && e.raise(`Invalid escape`);
			for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
				var r = n[t];
				e.groupNames[r] || e.raise(`Invalid named capture referenced`);
			}
		}, Q.regexp_disjunction = function(e) {
			var t = this.options.ecmaVersion >= 16;
			for (t && (e.branchID = new at(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
			t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise(`Nothing to repeat`), e.eat(123) && e.raise(`Lone quantifier brackets`);
		}, Q.regexp_alternative = function(e) {
			for (; e.pos < e.source.length && this.regexp_eatTerm(e););
		}, Q.regexp_eatTerm = function(e) {
			return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise(`Invalid quantifier`), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
		}, Q.regexp_eatAssertion = function(e) {
			var t = e.pos;
			if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
			if (e.eat(92)) {
				if (e.eat(66) || e.eat(98)) return !0;
				e.pos = t;
			}
			if (e.eat(40) && e.eat(63)) {
				var n = !1;
				if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise(`Unterminated group`), e.lastAssertionIsQuantifiable = !n, !0;
			}
			return e.pos = t, !1;
		}, Q.regexp_eatQuantifier = function(e, t) {
			return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
		}, Q.regexp_eatQuantifierPrefix = function(e, t) {
			return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
		}, Q.regexp_eatBracedQuantifier = function(e, t) {
			var n = e.pos;
			if (e.eat(123)) {
				var r = 0, i = -1;
				if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise(`numbers out of order in {} quantifier`), !0;
				e.switchU && !t && e.raise(`Incomplete quantifier`), e.pos = n;
			}
			return !1;
		}, Q.regexp_eatAtom = function(e) {
			return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
		}, Q.regexp_eatReverseSolidusAtomEscape = function(e) {
			var t = e.pos;
			if (e.eat(92)) {
				if (this.regexp_eatAtomEscape(e)) return !0;
				e.pos = t;
			}
			return !1;
		}, Q.regexp_eatUncapturingGroup = function(e) {
			var t = e.pos;
			if (e.eat(40)) {
				if (e.eat(63)) {
					if (this.options.ecmaVersion >= 16) {
						var n = this.regexp_eatModifiers(e), r = e.eat(45);
						if (n || r) {
							for (var i = 0; i < n.length; i++) {
								var a = n.charAt(i);
								n.indexOf(a, i + 1) > -1 && e.raise(`Duplicate regular expression modifiers`);
							}
							if (r) {
								var o = this.regexp_eatModifiers(e);
								!n && !o && e.current() === 58 && e.raise(`Invalid regular expression modifiers`);
								for (var s = 0; s < o.length; s++) {
									var c = o.charAt(s);
									(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise(`Duplicate regular expression modifiers`);
								}
							}
						}
					}
					if (e.eat(58)) {
						if (this.regexp_disjunction(e), e.eat(41)) return !0;
						e.raise(`Unterminated group`);
					}
				}
				e.pos = t;
			}
			return !1;
		}, Q.regexp_eatCapturingGroup = function(e) {
			if (e.eat(40)) {
				if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise(`Invalid group`), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
				e.raise(`Unterminated group`);
			}
			return !1;
		}, Q.regexp_eatModifiers = function(e) {
			for (var t = ``, n = 0; (n = e.current()) !== -1 && ct(n);) t += te(n), e.advance();
			return t;
		};
		function ct(e) {
			return e === 105 || e === 109 || e === 115;
		}
		Q.regexp_eatExtendedAtom = function(e) {
			return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
		}, Q.regexp_eatInvalidBracedQuantifier = function(e) {
			return this.regexp_eatBracedQuantifier(e, !0) && e.raise(`Nothing to repeat`), !1;
		}, Q.regexp_eatSyntaxCharacter = function(e) {
			var t = e.current();
			return lt(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
		};
		function lt(e) {
			return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
		}
		Q.regexp_eatPatternCharacters = function(e) {
			for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !lt(n);) e.advance();
			return e.pos !== t;
		}, Q.regexp_eatExtendedPatternCharacter = function(e) {
			var t = e.current();
			return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 && (e.advance(), !0);
		}, Q.regexp_groupSpecifier = function(e) {
			if (e.eat(63)) {
				this.regexp_eatGroupName(e) || e.raise(`Invalid group`);
				var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
				if (n) {
					if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise(`Duplicate capture group name`);
					else e.raise(`Duplicate capture group name`);
				}
				t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
			}
		}, Q.regexp_eatGroupName = function(e) {
			if (e.lastStringValue = ``, e.eat(60)) {
				if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
				e.raise(`Invalid capture group name`);
			}
			return !1;
		}, Q.regexp_eatRegExpIdentifierName = function(e) {
			if (e.lastStringValue = ``, this.regexp_eatRegExpIdentifierStart(e)) {
				for (e.lastStringValue += te(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += te(e.lastIntValue);
				return !0;
			}
			return !1;
		}, Q.regexp_eatRegExpIdentifierStart = function(e) {
			var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
			return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), ut(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
		};
		function ut(e) {
			return f(e, !0) || e === 36 || e === 95;
		}
		Q.regexp_eatRegExpIdentifierPart = function(e) {
			var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
			return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), dt(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
		};
		function dt(e) {
			return p(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
		}
		Q.regexp_eatAtomEscape = function(e) {
			return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise(`Invalid unicode escape`), e.raise(`Invalid escape`)), !1);
		}, Q.regexp_eatBackReference = function(e) {
			var t = e.pos;
			if (this.regexp_eatDecimalEscape(e)) {
				var n = e.lastIntValue;
				if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
				if (n <= e.numCapturingParens) return !0;
				e.pos = t;
			}
			return !1;
		}, Q.regexp_eatKGroupName = function(e) {
			if (e.eat(107)) {
				if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
				e.raise(`Invalid named reference`);
			}
			return !1;
		}, Q.regexp_eatCharacterEscape = function(e) {
			return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
		}, Q.regexp_eatCControlLetter = function(e) {
			var t = e.pos;
			if (e.eat(99)) {
				if (this.regexp_eatControlLetter(e)) return !0;
				e.pos = t;
			}
			return !1;
		}, Q.regexp_eatZero = function(e) {
			return e.current() === 48 && !Ct(e.lookahead()) && (e.lastIntValue = 0, e.advance(), !0);
		}, Q.regexp_eatControlEscape = function(e) {
			var t = e.current();
			return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 && (e.lastIntValue = 13, e.advance(), !0);
		}, Q.regexp_eatControlLetter = function(e) {
			var t = e.current();
			return ft(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
		};
		function ft(e) {
			return e >= 65 && e <= 90 || e >= 97 && e <= 122;
		}
		Q.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
			t === void 0 && (t = !1);
			var n = e.pos, r = t || e.switchU;
			if (e.eat(117)) {
				if (this.regexp_eatFixedHexDigits(e, 4)) {
					var i = e.lastIntValue;
					if (r && i >= 55296 && i <= 56319) {
						var a = e.pos;
						if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
							var o = e.lastIntValue;
							if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
						}
						e.pos = a, e.lastIntValue = i;
					}
					return !0;
				}
				if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && pt(e.lastIntValue)) return !0;
				r && e.raise(`Invalid unicode escape`), e.pos = n;
			}
			return !1;
		};
		function pt(e) {
			return e >= 0 && e <= 1114111;
		}
		Q.regexp_eatIdentityEscape = function(e) {
			if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
			var t = e.current();
			return t !== 99 && (!e.switchN || t !== 107) && (e.lastIntValue = t, e.advance(), !0);
		}, Q.regexp_eatDecimalEscape = function(e) {
			e.lastIntValue = 0;
			var t = e.current();
			if (t >= 49 && t <= 57) {
				do
					e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
				while ((t = e.current()) >= 48 && t <= 57);
				return !0;
			}
			return !1;
		};
		var mt = 0, ht = 1, gt = 2;
		Q.regexp_eatCharacterClassEscape = function(e) {
			var t = e.current();
			if (_t(t)) return e.lastIntValue = -1, e.advance(), ht;
			var n = !1;
			if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
				e.lastIntValue = -1, e.advance();
				var r;
				if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === gt && e.raise(`Invalid property name`), r;
				e.raise(`Invalid property name`);
			}
			return mt;
		};
		function _t(e) {
			return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
		}
		Q.regexp_eatUnicodePropertyValueExpression = function(e) {
			var t = e.pos;
			if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
				var n = e.lastStringValue;
				if (this.regexp_eatUnicodePropertyValue(e)) {
					var r = e.lastStringValue;
					return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), ht;
				}
			}
			if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
				var i = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameOrValue(e, i);
			}
			return mt;
		}, Q.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
			k(e.unicodeProperties.nonBinary, t) || e.raise(`Invalid property name`), e.unicodeProperties.nonBinary[t].test(n) || e.raise(`Invalid property value`);
		}, Q.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
			if (e.unicodeProperties.binary.test(t)) return ht;
			if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return gt;
			e.raise(`Invalid property name`);
		}, Q.regexp_eatUnicodePropertyName = function(e) {
			var t = 0;
			for (e.lastStringValue = ``; vt(t = e.current());) e.lastStringValue += te(t), e.advance();
			return e.lastStringValue !== ``;
		};
		function vt(e) {
			return ft(e) || e === 95;
		}
		Q.regexp_eatUnicodePropertyValue = function(e) {
			var t = 0;
			for (e.lastStringValue = ``; yt(t = e.current());) e.lastStringValue += te(t), e.advance();
			return e.lastStringValue !== ``;
		};
		function yt(e) {
			return vt(e) || Ct(e);
		}
		Q.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
			return this.regexp_eatUnicodePropertyValue(e);
		}, Q.regexp_eatCharacterClass = function(e) {
			if (e.eat(91)) {
				var t = e.eat(94), n = this.regexp_classContents(e);
				return e.eat(93) || e.raise(`Unterminated character class`), t && n === gt && e.raise(`Negated character class may contain strings`), !0;
			}
			return !1;
		}, Q.regexp_classContents = function(e) {
			return e.current() === 93 ? ht : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), ht);
		}, Q.regexp_nonEmptyClassRanges = function(e) {
			for (; this.regexp_eatClassAtom(e);) {
				var t = e.lastIntValue;
				if (e.eat(45) && this.regexp_eatClassAtom(e)) {
					var n = e.lastIntValue;
					e.switchU && (t === -1 || n === -1) && e.raise(`Invalid character class`), t !== -1 && n !== -1 && t > n && e.raise(`Range out of order in character class`);
				}
			}
		}, Q.regexp_eatClassAtom = function(e) {
			var t = e.pos;
			if (e.eat(92)) {
				if (this.regexp_eatClassEscape(e)) return !0;
				if (e.switchU) {
					var n = e.current();
					(n === 99 || Et(n)) && e.raise(`Invalid class escape`), e.raise(`Invalid escape`);
				}
				e.pos = t;
			}
			var r = e.current();
			return r !== 93 && (e.lastIntValue = r, e.advance(), !0);
		}, Q.regexp_eatClassEscape = function(e) {
			var t = e.pos;
			if (e.eat(98)) return e.lastIntValue = 8, !0;
			if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
			if (!e.switchU && e.eat(99)) {
				if (this.regexp_eatClassControlLetter(e)) return !0;
				e.pos = t;
			}
			return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
		}, Q.regexp_classSetExpression = function(e) {
			var t = ht, n;
			if (!this.regexp_eatClassSetRange(e)) {
				if (n = this.regexp_eatClassSetOperand(e)) {
					n === gt && (t = gt);
					for (var r = e.pos; e.eatChars([38, 38]);) e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e)) ? n !== gt && (t = ht) : e.raise(`Invalid character in character class`);
					if (r !== e.pos) return t;
					for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise(`Invalid character in character class`);
					if (r !== e.pos) return t;
				} else e.raise(`Invalid character in character class`);
			}
			for (;;) if (!this.regexp_eatClassSetRange(e)) {
				if (n = this.regexp_eatClassSetOperand(e), !n) return t;
				n === gt && (t = gt);
			}
		}, Q.regexp_eatClassSetRange = function(e) {
			var t = e.pos;
			if (this.regexp_eatClassSetCharacter(e)) {
				var n = e.lastIntValue;
				if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
					var r = e.lastIntValue;
					return n !== -1 && r !== -1 && n > r && e.raise(`Range out of order in character class`), !0;
				}
				e.pos = t;
			}
			return !1;
		}, Q.regexp_eatClassSetOperand = function(e) {
			return this.regexp_eatClassSetCharacter(e) ? ht : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
		}, Q.regexp_eatNestedClass = function(e) {
			var t = e.pos;
			if (e.eat(91)) {
				var n = e.eat(94), r = this.regexp_classContents(e);
				if (e.eat(93)) return n && r === gt && e.raise(`Negated character class may contain strings`), r;
				e.pos = t;
			}
			if (e.eat(92)) {
				var i = this.regexp_eatCharacterClassEscape(e);
				if (i) return i;
				e.pos = t;
			}
			return null;
		}, Q.regexp_eatClassStringDisjunction = function(e) {
			var t = e.pos;
			if (e.eatChars([92, 113])) {
				if (e.eat(123)) {
					var n = this.regexp_classStringDisjunctionContents(e);
					if (e.eat(125)) return n;
				} else e.raise(`Invalid escape`);
				e.pos = t;
			}
			return null;
		}, Q.regexp_classStringDisjunctionContents = function(e) {
			for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === gt && (t = gt);
			return t;
		}, Q.regexp_classString = function(e) {
			for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
			return t === 1 ? ht : gt;
		}, Q.regexp_eatClassSetCharacter = function(e) {
			var t = e.pos;
			if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
			var n = e.current();
			return n < 0 || n === e.lookahead() && bt(n) || xt(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
		};
		function bt(e) {
			return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
		}
		function xt(e) {
			return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
		}
		Q.regexp_eatClassSetReservedPunctuator = function(e) {
			var t = e.current();
			return St(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
		};
		function St(e) {
			return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
		}
		Q.regexp_eatClassControlLetter = function(e) {
			var t = e.current();
			return Ct(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
		}, Q.regexp_eatHexEscapeSequence = function(e) {
			var t = e.pos;
			if (e.eat(120)) {
				if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
				e.switchU && e.raise(`Invalid escape`), e.pos = t;
			}
			return !1;
		}, Q.regexp_eatDecimalDigits = function(e) {
			var t = e.pos, n = 0;
			for (e.lastIntValue = 0; Ct(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
			return e.pos !== t;
		};
		function Ct(e) {
			return e >= 48 && e <= 57;
		}
		Q.regexp_eatHexDigits = function(e) {
			var t = e.pos, n = 0;
			for (e.lastIntValue = 0; wt(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + Tt(n), e.advance();
			return e.pos !== t;
		};
		function wt(e) {
			return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
		}
		function Tt(e) {
			return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
		}
		Q.regexp_eatLegacyOctalEscapeSequence = function(e) {
			if (this.regexp_eatOctalDigit(e)) {
				var t = e.lastIntValue;
				if (this.regexp_eatOctalDigit(e)) {
					var n = e.lastIntValue;
					e.lastIntValue = t <= 3 && this.regexp_eatOctalDigit(e) ? t * 64 + n * 8 + e.lastIntValue : t * 8 + n;
				} else e.lastIntValue = t;
				return !0;
			}
			return !1;
		}, Q.regexp_eatOctalDigit = function(e) {
			var t = e.current();
			return Et(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
		};
		function Et(e) {
			return e >= 48 && e <= 55;
		}
		Q.regexp_eatFixedHexDigits = function(e, t) {
			var n = e.pos;
			e.lastIntValue = 0;
			for (var r = 0; r < t; ++r) {
				var i = e.current();
				if (!wt(i)) return e.pos = n, !1;
				e.lastIntValue = 16 * e.lastIntValue + Tt(i), e.advance();
			}
			return !0;
		};
		var Dt = function(e) {
			this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new F(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
		}, $ = J.prototype;
		$.next = function(e) {
			!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, `Escape sequence in keyword ` + this.type.keyword), this.options.onToken && this.options.onToken(new Dt(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
		}, $.getToken = function() {
			return this.next(), new Dt(this);
		}, typeof Symbol < `u` && ($[Symbol.iterator] = function() {
			var e = this;
			return { next: function() {
				var t = e.getToken();
				return {
					done: t.type === b.eof,
					value: t
				};
			} };
		}), $.nextToken = function() {
			var e = this.curContext();
			if (e && e.preserveSpace || this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(b.eof);
			if (e.override) return e.override(this);
			this.readToken(this.fullCharCodeAtPos());
		}, $.readToken = function(e) {
			return f(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
		}, $.fullCharCodeAt = function(e) {
			var t = this.input.charCodeAt(e);
			if (t <= 55295 || t >= 56320) return t;
			var n = this.input.charCodeAt(e + 1);
			return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
		}, $.fullCharCodeAtPos = function() {
			return this.fullCharCodeAt(this.pos);
		}, $.skipBlockComment = function() {
			var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf(`*/`, this.pos += 2);
			if (n === -1 && this.raise(this.pos - 2, `Unterminated comment`), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = w(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
			this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
		}, $.skipLineComment = function(e) {
			for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !C(r);) r = this.input.charCodeAt(++this.pos);
			this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
		}, $.skipSpace = function() {
			loop: for (; this.pos < this.input.length;) {
				var e = this.input.charCodeAt(this.pos);
				switch (e) {
					case 32:
					case 160:
						++this.pos;
						break;
					case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
					case 10:
					case 8232:
					case 8233:
						++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
						break;
					case 47:
						switch (this.input.charCodeAt(this.pos + 1)) {
							case 42:
								this.skipBlockComment();
								break;
							case 47:
								this.skipLineComment(2);
								break;
							default: break loop;
						}
						break;
					default: if (e > 8 && e < 14 || e >= 5760 && T.test(String.fromCharCode(e))) ++this.pos;
					else break loop;
				}
			}
		}, $.finishToken = function(e, t) {
			this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
			var n = this.type;
			this.type = e, this.value = t, this.updateContext(n);
		}, $.readToken_dot = function() {
			var e = this.input.charCodeAt(this.pos + 1);
			if (e >= 48 && e <= 57) return this.readNumber(!0);
			var t = this.input.charCodeAt(this.pos + 2);
			return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(b.ellipsis)) : (++this.pos, this.finishToken(b.dot));
		}, $.readToken_slash = function() {
			var e = this.input.charCodeAt(this.pos + 1);
			return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.slash, 1);
		}, $.readToken_mult_modulo_exp = function(e) {
			var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? b.star : b.modulo;
			return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = b.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(b.assign, n + 1) : this.finishOp(r, n);
		}, $.readToken_pipe_amp = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(b.assign, 3) : this.finishOp(e === 124 ? b.logicalOR : b.logicalAND, 2) : t === 61 ? this.finishOp(b.assign, 2) : this.finishOp(e === 124 ? b.bitwiseOR : b.bitwiseAND, 1);
		}, $.readToken_caret = function() {
			return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.bitwiseXOR, 1);
		}, $.readToken_plus_min = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || x.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(b.incDec, 2) : t === 61 ? this.finishOp(b.assign, 2) : this.finishOp(b.plusMin, 1);
		}, $.readToken_lt_gt = function(e) {
			var t = this.input.charCodeAt(this.pos + 1), n = 1;
			return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(b.assign, n + 1) : this.finishOp(b.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(b.relational, n));
		}, $.readToken_eq_excl = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === 61 ? this.finishOp(b.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(b.arrow)) : this.finishOp(e === 61 ? b.eq : b.prefix, 1);
		}, $.readToken_question = function() {
			var e = this.options.ecmaVersion;
			if (e >= 11) {
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 46) {
					var n = this.input.charCodeAt(this.pos + 2);
					if (n < 48 || n > 57) return this.finishOp(b.questionDot, 2);
				}
				if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(b.assign, 3) : this.finishOp(b.coalesce, 2);
			}
			return this.finishOp(b.question, 1);
		}, $.readToken_numberSign = function() {
			var e = this.options.ecmaVersion, t = 35;
			if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), f(t, !0) || t === 92)) return this.finishToken(b.privateId, this.readWord1());
			this.raise(this.pos, `Unexpected character '` + te(t) + `'`);
		}, $.getTokenFromCode = function(e) {
			switch (e) {
				case 46: return this.readToken_dot();
				case 40: return ++this.pos, this.finishToken(b.parenL);
				case 41: return ++this.pos, this.finishToken(b.parenR);
				case 59: return ++this.pos, this.finishToken(b.semi);
				case 44: return ++this.pos, this.finishToken(b.comma);
				case 91: return ++this.pos, this.finishToken(b.bracketL);
				case 93: return ++this.pos, this.finishToken(b.bracketR);
				case 123: return ++this.pos, this.finishToken(b.braceL);
				case 125: return ++this.pos, this.finishToken(b.braceR);
				case 58: return ++this.pos, this.finishToken(b.colon);
				case 96:
					if (this.options.ecmaVersion < 6) break;
					return ++this.pos, this.finishToken(b.backQuote);
				case 48:
					var t = this.input.charCodeAt(this.pos + 1);
					if (t === 120 || t === 88) return this.readRadixNumber(16);
					if (this.options.ecmaVersion >= 6) {
						if (t === 111 || t === 79) return this.readRadixNumber(8);
						if (t === 98 || t === 66) return this.readRadixNumber(2);
					}
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return this.readNumber(!1);
				case 34:
				case 39: return this.readString(e);
				case 47: return this.readToken_slash();
				case 37:
				case 42: return this.readToken_mult_modulo_exp(e);
				case 124:
				case 38: return this.readToken_pipe_amp(e);
				case 94: return this.readToken_caret();
				case 43:
				case 45: return this.readToken_plus_min(e);
				case 60:
				case 62: return this.readToken_lt_gt(e);
				case 61:
				case 33: return this.readToken_eq_excl(e);
				case 63: return this.readToken_question();
				case 126: return this.finishOp(b.prefix, 1);
				case 35: return this.readToken_numberSign();
			}
			this.raise(this.pos, `Unexpected character '` + te(e) + `'`);
		}, $.finishOp = function(e, t) {
			var n = this.input.slice(this.pos, this.pos + t);
			return this.pos += t, this.finishToken(e, n);
		}, $.readRegexp = function() {
			for (var e, t, n = this.pos;;) {
				this.pos >= this.input.length && this.raise(n, `Unterminated regular expression`);
				var r = this.input.charAt(this.pos);
				if (x.test(r) && this.raise(n, `Unterminated regular expression`), e) e = !1;
				else {
					if (r === `[`) t = !0;
					else if (r === `]` && t) t = !1;
					else if (r === `/` && !t) break;
					e = r === `\\`;
				}
				++this.pos;
			}
			var i = this.input.slice(n, this.pos);
			++this.pos;
			var a = this.pos, o = this.readWord1();
			this.containsEsc && this.unexpected(a);
			var s = this.regexpState ||= new ot(this);
			s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
			var c = null;
			try {
				c = new RegExp(i, o);
			} catch {}
			return this.finishToken(b.regexp, {
				pattern: i,
				flags: o,
				value: c
			});
		}, $.readInt = function(e, t, n) {
			for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t ?? 1 / 0; c < l; ++c, ++this.pos) {
				var u = this.input.charCodeAt(this.pos), d = void 0;
				if (r && u === 95) i && this.raiseRecoverable(this.pos, `Numeric separator is not allowed in legacy octal numeric literals`), s === 95 && this.raiseRecoverable(this.pos, `Numeric separator must be exactly one underscore`), c === 0 && this.raiseRecoverable(this.pos, `Numeric separator is not allowed at the first of digits`), s = u;
				else {
					if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : 1 / 0, d >= e) break;
					s = u, o = o * e + d;
				}
			}
			return r && s === 95 && this.raiseRecoverable(this.pos - 1, `Numeric separator is not allowed at the last of digits`), this.pos === a || t != null && this.pos - a !== t ? null : o;
		};
		function Ot(e, t) {
			return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ``));
		}
		function kt(e) {
			return typeof BigInt == `function` ? BigInt(e.replace(/_/g, ``)) : null;
		}
		$.readRadixNumber = function(e) {
			var t = this.pos;
			this.pos += 2;
			var n = this.readInt(e);
			return n ?? this.raise(this.start + 2, `Expected number in radix ` + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = kt(this.input.slice(t, this.pos)), ++this.pos) : f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(b.num, n);
		}, $.readNumber = function(e) {
			var t = this.pos;
			!e && this.readInt(10, void 0, !0) === null && this.raise(t, `Invalid number`);
			var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
			n && this.strict && this.raise(t, `Invalid number`);
			var r = this.input.charCodeAt(this.pos);
			if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
				var i = kt(this.input.slice(t, this.pos));
				return ++this.pos, f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`), this.finishToken(b.num, i);
			}
			n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), r !== 69 && r !== 101 || n || (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, `Invalid number`)), f(this.fullCharCodeAtPos()) && this.raise(this.pos, `Identifier directly after number`);
			var a = Ot(this.input.slice(t, this.pos), n);
			return this.finishToken(b.num, a);
		}, $.readCodePoint = function() {
			var e = this.input.charCodeAt(this.pos), t;
			if (e === 123) {
				this.options.ecmaVersion < 6 && this.unexpected();
				var n = ++this.pos;
				t = this.readHexChar(this.input.indexOf(`}`, this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, `Code point out of bounds`);
			} else t = this.readHexChar(4);
			return t;
		}, $.readString = function(e) {
			for (var t = ``, n = ++this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, `Unterminated string constant`);
				var r = this.input.charCodeAt(this.pos);
				if (r === e) break;
				r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, `Unterminated string constant`), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (C(r) && this.raise(this.start, `Unterminated string constant`), ++this.pos);
			}
			return t += this.input.slice(n, this.pos++), this.finishToken(b.string, t);
		};
		var At = {};
		$.tryReadTemplateToken = function() {
			this.inTemplateElement = !0;
			try {
				this.readTmplToken();
			} catch (e) {
				if (e === At) this.readInvalidTemplateToken();
				else throw e;
			}
			this.inTemplateElement = !1;
		}, $.invalidStringToken = function(e, t) {
			if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw At;
			this.raise(e, t);
		}, $.readTmplToken = function() {
			for (var e = ``, t = this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, `Unterminated template`);
				var n = this.input.charCodeAt(this.pos);
				if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === b.template || this.type === b.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(b.dollarBraceL)) : (++this.pos, this.finishToken(b.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(b.template, e));
				if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
				else if (C(n)) {
					switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
						case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
						case 10:
							e += `
`;
							break;
						default: e += String.fromCharCode(n);
					}
					this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
				} else ++this.pos;
			}
		}, $.readInvalidTemplateToken = function() {
			for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
				case `\\`:
					++this.pos;
					break;
				case `$`: if (this.input[this.pos + 1] !== `{`) break;
				case "`": return this.finishToken(b.invalidTemplate, this.input.slice(this.start, this.pos));
				case `\r`: this.input[this.pos + 1] === `
` && ++this.pos;
				case `
`:
				case `\u2028`:
				case `\u2029`: ++this.curLine, this.lineStart = this.pos + 1;
			}
			this.raise(this.start, `Unterminated template`);
		}, $.readEscapedChar = function(e) {
			var t = this.input.charCodeAt(++this.pos);
			switch (++this.pos, t) {
				case 110: return `
`;
				case 114: return `\r`;
				case 120: return String.fromCharCode(this.readHexChar(2));
				case 117: return te(this.readCodePoint());
				case 116: return `	`;
				case 98: return `\b`;
				case 118: return `\v`;
				case 102: return `\f`;
				case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
				case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``;
				case 56:
				case 57: if (this.strict && this.invalidStringToken(this.pos - 1, `Invalid escape sequence`), e) {
					var n = this.pos - 1;
					this.invalidStringToken(n, `Invalid escape sequence in template string`);
				}
				default:
					if (t >= 48 && t <= 55) {
						var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
						return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== `0` || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? `Octal literal in template string` : `Octal literal in strict mode`), String.fromCharCode(i);
					}
					return C(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), ``) : String.fromCharCode(t);
			}
		}, $.readHexChar = function(e) {
			var t = this.pos, n = this.readInt(16, e);
			return n === null && this.invalidStringToken(t, `Bad character escape sequence`), n;
		}, $.readWord1 = function() {
			this.containsEsc = !1;
			for (var e = ``, t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
				var i = this.fullCharCodeAtPos();
				if (p(i, r)) this.pos += i <= 65535 ? 1 : 2;
				else if (i === 92) {
					this.containsEsc = !0, e += this.input.slice(n, this.pos);
					var a = this.pos;
					this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, `Expecting Unicode escape sequence \\uXXXX`), ++this.pos;
					var o = this.readCodePoint();
					(t ? f : p)(o, r) || this.invalidStringToken(a, `Invalid Unicode escape`), e += te(o), n = this.pos;
				} else break;
				t = !1;
			}
			return e + this.input.slice(n, this.pos);
		}, $.readWord = function() {
			var e = this.readWord1(), t = b.name;
			return this.keywords.test(e) && (t = v[e]), this.finishToken(t, e);
		};
		var jt = `8.19.0`;
		J.acorn = {
			Parser: J,
			version: jt,
			defaultOptions: L,
			Position: P,
			SourceLocation: F,
			getLineInfo: I,
			Node: Ie,
			TokenType: m,
			tokTypes: b,
			keywordTypes: v,
			TokContext: Oe,
			tokContexts: X,
			isIdentifierChar: p,
			isIdentifierStart: f,
			Token: Dt,
			isNewLine: C,
			lineBreak: x,
			lineBreakG: S,
			nonASCIIwhitespace: T
		};
		function Mt(e, t) {
			return J.parse(e, t);
		}
		function Nt(e, t, n) {
			return J.parseExpressionAt(e, t, n);
		}
		function Pt(e, t) {
			return J.tokenizer(e, t);
		}
		e.Node = Ie, e.Parser = J, e.Position = P, e.SourceLocation = F, e.TokContext = Oe, e.Token = Dt, e.TokenType = m, e.defaultOptions = L, e.getLineInfo = I, e.isIdentifierChar = p, e.isIdentifierStart = f, e.isNewLine = C, e.keywordTypes = v, e.lineBreak = x, e.lineBreakG = S, e.nonASCIIwhitespace = T, e.parse = Mt, e.parseExpressionAt = Nt, e.tokContexts = X, e.tokTypes = b, e.tokenizer = Pt, e.version = jt;
	}));
}));
var Te = B(((e, t) => {
	var n = W(`path`).sep || `/`;
	t.exports = r;
	function r(e) {
		if (typeof e != `string` || e.length <= 7 || e.substring(0, 7) != `file://`) throw TypeError(`must pass in a file:// URI to convert to a file path`);
		var t = decodeURI(e.substring(7)), r = t.indexOf(`/`), i = t.substring(0, r), a = t.substring(r + 1);
		return i == `localhost` && (i = ``), i &&= n + n + i, a = a.replace(/^(.+)\|/, `$1:`), n == `\\` && (a = a.replace(/\//g, `\\`)), /^.+\:/.test(a) || (a = n + a), i + a;
	}
}));
var Ee = B(((e, t) => {
	var n = W(`fs`), r = W(`path`), i = Te(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
		try {
			n.accessSync(e);
		} catch {
			return !1;
		}
		return !0;
	} || n.existsSync || r.existsSync, c = {
		arrow: process.env.NODE_BINDINGS_ARROW || ` → `,
		compiled: process.env.NODE_BINDINGS_COMPILED_DIR || `compiled`,
		platform: process.platform,
		arch: process.arch,
		nodePreGyp: `node-v` + process.versions.modules + `-` + process.platform + `-` + process.arch,
		version: process.versions.node,
		bindings: `bindings.node`,
		try: [
			[
				`module_root`,
				`build`,
				`bindings`
			],
			[
				`module_root`,
				`build`,
				`Debug`,
				`bindings`
			],
			[
				`module_root`,
				`build`,
				`Release`,
				`bindings`
			],
			[
				`module_root`,
				`out`,
				`Debug`,
				`bindings`
			],
			[
				`module_root`,
				`Debug`,
				`bindings`
			],
			[
				`module_root`,
				`out`,
				`Release`,
				`bindings`
			],
			[
				`module_root`,
				`Release`,
				`bindings`
			],
			[
				`module_root`,
				`build`,
				`default`,
				`bindings`
			],
			[
				`module_root`,
				`compiled`,
				`version`,
				`platform`,
				`arch`,
				`bindings`
			],
			[
				`module_root`,
				`addon-build`,
				`release`,
				`install-root`,
				`bindings`
			],
			[
				`module_root`,
				`addon-build`,
				`debug`,
				`install-root`,
				`bindings`
			],
			[
				`module_root`,
				`addon-build`,
				`default`,
				`install-root`,
				`bindings`
			],
			[
				`module_root`,
				`lib`,
				`binding`,
				`nodePreGyp`,
				`bindings`
			]
		]
	};
	function l(t) {
		typeof t == `string` ? t = { bindings: t } : t ||= {}, Object.keys(c).map(function(e) {
			e in t || (t[e] = c[e]);
		}), t.module_root || (t.module_root = e.getRoot(e.getFileName())), r.extname(t.bindings) != `.node` && (t.bindings += `.node`);
		for (var n = typeof __webpack_require__ == `function` ? __non_webpack_require__ : W, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
			l = a.apply(null, t.try[o].map(function(e) {
				return t[e] || e;
			})), i.push(l);
			try {
				return u = t.path ? n.resolve(l) : n(l), t.path || (u.path = l), u;
			} catch (e) {
				if (e.code !== `MODULE_NOT_FOUND` && e.code !== `QUALIFIED_PATH_RESOLUTION_FAILED` && !/not find/i.test(e.message)) throw e;
			}
		}
		throw d = Error(`Could not locate the bindings file. Tried:
` + i.map(function(e) {
			return t.arrow + e;
		}).join(`
`)), d.tries = i, d;
	}
	t.exports = e = l, e.getFileName = function(e) {
		var t = Error.prepareStackTrace, n = Error.stackTraceLimit, r = {}, a;
		return Error.stackTraceLimit = 10, Error.prepareStackTrace = function(t, n) {
			for (var r = 0, i = n.length; r < i; r++) if (a = n[r].getFileName(), a !== __filename) {
				if (e) {
					if (a !== e) return;
				} else return;
			}
		}, Error.captureStackTrace(r), r.stack, Error.prepareStackTrace = t, Error.stackTraceLimit = n, a.indexOf(`file://`) === 0 && (a = i(a)), a;
	}, e.getRoot = function(e) {
		for (var t = o(e), n;;) {
			if (t === `.` && (t = process.cwd()), s(a(t, `package.json`)) || s(a(t, `node_modules`))) return t;
			if (n === t) throw Error(`Could not find module root given file: "` + e + "\". Do you have a `package.json` file? ");
			n = t, t = a(t, `..`);
		}
	};
}));
var De = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.isIdentifierRead = t, e.isVarLoop = n, e.isLoop = r;
	function t(e, t) {
		switch (t.type) {
			case `ObjectPattern`:
			case `ArrayPattern`: return !1;
			case `AssignmentExpression`: return t.right === e;
			case `MemberExpression`: return t.computed || e === t.object;
			case `Property`: return e === t.value;
			case `MethodDefinition`: return !1;
			case `VariableDeclarator`: return t.id !== e;
			case `ExportSpecifier`: return !1;
			case `FunctionExpression`:
			case `FunctionDeclaration`:
			case `ArrowFunctionExpression`: return !1;
			default: return !0;
		}
	}
	function n(e) {
		return e.type === `ForStatement` || e.type === `ForInStatement` || e.type === `ForOfStatement`;
	}
	function r(e) {
		return e.type === `ForStatement` || e.type === `ForInStatement` || e.type === `ForOfStatement` || e.type === `WhileStatement` || e.type === `DoWhileStatement`;
	}
}));
function Oe(e) {
	let t = normalize$1(e);
	return t.length > 1 && t[t.length - 1] === sep$1 && (t = t.substring(0, t.length - 1)), t;
}
function X(e, t) {
	return e.replace(Ze, t);
}
function ke(e) {
	return e === `/` || Qe.test(e);
}
function Z(e, t) {
	let { resolvePaths: n, normalizePath: r, pathSeparator: i } = t, a = process.platform === `win32` && e.includes(`/`) || e.startsWith(`.`);
	return n && (e = resolve$1(e)), (r || a) && (e = Oe(e)), e === `.` ? `` : X(e[e.length - 1] === i ? e : e + i, i);
}
function Ae(e, t) {
	return t + e;
}
function je(e, t) {
	return function(n, r) {
		return r.startsWith(e) ? r.slice(e.length) + n : X(relative$1(e, r), t.pathSeparator) + t.pathSeparator + n;
	};
}
function Me(e) {
	return e;
}
function Ne(e, t, n) {
	return t + e + n;
}
function Pe(e, t) {
	let { relativePaths: n, includeBasePath: r } = t;
	return n && e ? je(e, t) : r ? Ae : Me;
}
function Fe(e) {
	return function(t, n) {
		n.push(t.substring(e.length) || `.`);
	};
}
function Ie(e) {
	return function(t, n, r) {
		let i = t.substring(e.length) || `.`;
		r.every((e) => e(i, !0)) && n.push(i);
	};
}
function Le(e, t) {
	let { includeDirs: n, filters: r, relativePaths: i } = t;
	return n ? i ? r && r.length ? Ie(e) : Fe(e) : r && r.length ? et : $e$1 : tt;
}
function Re(e) {
	let { excludeFiles: t, filters: n, onlyCounts: r } = e;
	return t ? at : n && n.length ? r ? nt : rt : r ? it : Q;
}
function ze(e) {
	return e.group ? st : ot;
}
function Be(e) {
	return e.group ? ct : lt;
}
function Ve(e, t) {
	return !e.resolveSymlinks || e.excludeSymlinks ? null : t ? dt : ut;
}
function He(e, t, n) {
	if (n.options.useRealPaths) return Ue(t, n);
	let r = dirname$1(e), i = 1;
	for (; r !== n.root && i < 2;) {
		let e = n.symlinks.get(r);
		e && (e === t || e.startsWith(t) || t.startsWith(e)) ? i++ : r = dirname$1(r);
	}
	return n.symlinks.set(e, t), i > 1;
}
function Ue(e, t) {
	return t.visited.includes(e + t.options.pathSeparator);
}
function We(e, t, n, r) {
	t(e && !r ? e : null, n);
}
function Ge(e, t) {
	let { onlyCounts: n, group: r, maxFiles: i } = e;
	return n ? t ? ft : gt : r ? t ? pt : yt : i ? t ? ht : vt : t ? mt : _t;
}
function Ke(e) {
	return e ? St : xt;
}
function qe(e, t) {
	return new Promise((n, r) => {
		Je(e, t, (e, t) => {
			if (e) return r(e);
			n(t);
		});
	});
}
function Je(e, t, n) {
	new Et(e, t, n).start();
}
function Ye(e, t) {
	return new Et(e, t).start();
}
var Xe;
var Ze;
var Qe;
var $e$1;
var et;
var tt;
var nt;
var rt;
var it;
var Q;
var at;
var ot;
var st;
var ct;
var lt;
var ut;
var dt;
var ft;
var pt;
var mt;
var ht;
var gt;
var _t;
var vt;
var yt;
var bt;
var xt;
var St;
var Ct;
var wt;
var Tt;
var Et;
var Dt;
var $;
var Ot;
var kt = z((() => {
	Xe = createRequire$1(import.meta.url), Ze = /[\\/]/g, Qe = /^[a-z]:[\\/]$/i, $e$1 = (e, t) => {
		t.push(e || `.`);
	}, et = (e, t, n) => {
		let r = e || `.`;
		n.every((e) => e(r, !0)) && t.push(r);
	}, tt = () => {}, nt = (e, t, n, r) => {
		r.every((t) => t(e, !1)) && n.files++;
	}, rt = (e, t, n, r) => {
		r.every((t) => t(e, !1)) && t.push(e);
	}, it = (e, t, n, r) => {
		n.files++;
	}, Q = (e, t) => {
		t.push(e);
	}, at = () => {}, ot = (e) => e, st = () => [``].slice(0, 0), ct = (e, t, n) => {
		e.push({
			directory: t,
			files: n,
			dir: t
		});
	}, lt = () => {}, ut = function(e, t, n) {
		let { queue: r, fs: i, options: { suppressErrors: a } } = t;
		r.enqueue(), i.realpath(e, (o, s) => {
			if (o) return r.dequeue(a ? null : o, t);
			i.stat(s, (i, o) => {
				if (i) return r.dequeue(a ? null : i, t);
				if (o.isDirectory() && He(e, s, t)) return r.dequeue(null, t);
				n(o, s), r.dequeue(null, t);
			});
		});
	}, dt = function(e, t, n) {
		let { queue: r, fs: i, options: { suppressErrors: a } } = t;
		r.enqueue();
		try {
			let r = i.realpathSync(e), a = i.statSync(r);
			if (a.isDirectory() && He(e, r, t)) return;
			n(a, r);
		} catch (e) {
			if (!a) throw e;
		}
	}, ft = (e) => e.counts, pt = (e) => e.groups, mt = (e) => e.paths, ht = (e) => e.paths.slice(0, e.options.maxFiles), gt = (e, t, n) => (We(t, n, e.counts, e.options.suppressErrors), null), _t = (e, t, n) => (We(t, n, e.paths, e.options.suppressErrors), null), vt = (e, t, n) => (We(t, n, e.paths.slice(0, e.options.maxFiles), e.options.suppressErrors), null), yt = (e, t, n) => (We(t, n, e.groups, e.options.suppressErrors), null), bt = { withFileTypes: !0 }, xt = (e, t, n, r, i) => {
		if (e.queue.enqueue(), r < 0) return e.queue.dequeue(null, e);
		let { fs: a } = e;
		e.visited.push(t), e.counts.directories++, a.readdir(t || `.`, bt, (t, a = []) => {
			i(a, n, r), e.queue.dequeue(e.options.suppressErrors ? null : t, e);
		});
	}, St = (e, t, n, r, i) => {
		let { fs: a } = e;
		if (r < 0) return;
		e.visited.push(t), e.counts.directories++;
		let o = [];
		try {
			o = a.readdirSync(t || `.`, bt);
		} catch (t) {
			if (!e.options.suppressErrors) throw t;
		}
		i(o, n, r);
	}, Ct = class {
		count = 0;
		constructor(e) {
			this.onQueueEmpty = e;
		}
		enqueue() {
			return this.count++, this.count;
		}
		dequeue(e, t) {
			this.onQueueEmpty && (--this.count <= 0 || e) && (this.onQueueEmpty(e, t), e && (t.controller.abort(), this.onQueueEmpty = void 0));
		}
	}, wt = class {
		_files = 0;
		_directories = 0;
		set files(e) {
			this._files = e;
		}
		get files() {
			return this._files;
		}
		set directories(e) {
			this._directories = e;
		}
		get directories() {
			return this._directories;
		}
		get dirs() {
			return this._directories;
		}
	}, Tt = class {
		aborted = !1;
		abort() {
			this.aborted = !0;
		}
	}, Et = class {
		root;
		isSynchronous;
		state;
		joinPath;
		pushDirectory;
		pushFile;
		getArray;
		groupFiles;
		resolveSymlink;
		walkDirectory;
		callbackInvoker;
		constructor(e, t, n) {
			this.isSynchronous = !n, this.callbackInvoker = Ge(t, this.isSynchronous), this.root = Z(e, t), this.state = {
				root: ke(this.root) ? this.root : this.root.slice(0, -1),
				paths: [``].slice(0, 0),
				groups: [],
				counts: new wt(),
				options: t,
				queue: new Ct((e, t) => this.callbackInvoker(t, e, n)),
				symlinks: /* @__PURE__ */ new Map(),
				visited: [``].slice(0, 0),
				controller: new Tt(),
				fs: t.fs || y
			}, this.joinPath = Pe(this.root, t), this.pushDirectory = Le(this.root, t), this.pushFile = Re(t), this.getArray = ze(t), this.groupFiles = Be(t), this.resolveSymlink = Ve(t, this.isSynchronous), this.walkDirectory = Ke(this.isSynchronous);
		}
		start() {
			return this.pushDirectory(this.root, this.state.paths, this.state.options.filters), this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk), this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
		}
		walk = (e, t, n) => {
			let { paths: r, options: { filters: i, resolveSymlinks: a, excludeSymlinks: o, exclude: s, maxFiles: c, signal: l, useRealPaths: u, pathSeparator: d }, controller: f } = this.state;
			if (f.aborted || l && l.aborted || c && r.length > c) return;
			let p = this.getArray(this.state.paths);
			for (let c = 0; c < e.length; ++c) {
				let l = e[c];
				if (l.isFile() || l.isSymbolicLink() && !a && !o) {
					let e = this.joinPath(l.name, t);
					this.pushFile(e, p, this.state.counts, i);
				} else if (l.isDirectory()) {
					let e = Ne(l.name, t, this.state.options.pathSeparator);
					if (s && s(l.name, e)) continue;
					this.pushDirectory(e, r, i), this.walkDirectory(this.state, e, e, n - 1, this.walk);
				} else if (this.resolveSymlink && l.isSymbolicLink()) {
					let e = Ae(l.name, t);
					this.resolveSymlink(e, this.state, (t, r) => {
						if (t.isDirectory()) {
							if (r = Z(r, this.state.options), s && s(l.name, u ? r : e + d)) return;
							this.walkDirectory(this.state, r, u ? r : e + d, n - 1, this.walk);
						} else {
							r = u ? r : e;
							let t = basename$1(r), n = Z(dirname$1(r), this.state.options);
							r = this.joinPath(t, n), this.pushFile(r, p, this.state.counts, i);
						}
					});
				}
			}
			this.groupFiles(this.state.groups, t, p);
		};
	}, Dt = class {
		constructor(e, t) {
			this.root = e, this.options = t;
		}
		withPromise() {
			return qe(this.root, this.options);
		}
		withCallback(e) {
			Je(this.root, this.options, e);
		}
		sync() {
			return Ye(this.root, this.options);
		}
	}, $ = null;
	try {
		Xe.resolve(`picomatch`), $ = Xe(`picomatch`);
	} catch {}
	Ot = class {
		globCache = {};
		options = {
			maxDepth: 1 / 0,
			suppressErrors: !0,
			pathSeparator: sep$1,
			filters: []
		};
		globFunction;
		constructor(e) {
			this.options = {
				...this.options,
				...e
			}, this.globFunction = this.options.globFunction;
		}
		group() {
			return this.options.group = !0, this;
		}
		withPathSeparator(e) {
			return this.options.pathSeparator = e, this;
		}
		withBasePath() {
			return this.options.includeBasePath = !0, this;
		}
		withRelativePaths() {
			return this.options.relativePaths = !0, this;
		}
		withDirs() {
			return this.options.includeDirs = !0, this;
		}
		withMaxDepth(e) {
			return this.options.maxDepth = e, this;
		}
		withMaxFiles(e) {
			return this.options.maxFiles = e, this;
		}
		withFullPaths() {
			return this.options.resolvePaths = !0, this.options.includeBasePath = !0, this;
		}
		withErrors() {
			return this.options.suppressErrors = !1, this;
		}
		withSymlinks({ resolvePaths: e = !0 } = {}) {
			return this.options.resolveSymlinks = !0, this.options.useRealPaths = e, this.withFullPaths();
		}
		withAbortSignal(e) {
			return this.options.signal = e, this;
		}
		normalize() {
			return this.options.normalizePath = !0, this;
		}
		filter(e) {
			return this.options.filters.push(e), this;
		}
		onlyDirs() {
			return this.options.excludeFiles = !0, this.options.includeDirs = !0, this;
		}
		exclude(e) {
			return this.options.exclude = e, this;
		}
		onlyCounts() {
			return this.options.onlyCounts = !0, this;
		}
		crawl(e) {
			return new Dt(e || `.`, this.options);
		}
		withGlobFunction(e) {
			return this.globFunction = e, this;
		}
		crawlWithOptions(e, t) {
			return this.options = {
				...this.options,
				...t
			}, new Dt(e || `.`, this.options);
		}
		glob(...e) {
			return this.globFunction ? this.globWithOptions(e) : this.globWithOptions(e, { dot: !0 });
		}
		globWithOptions(e, ...t) {
			let n = this.globFunction || $;
			if (!n) throw Error(`Please specify a glob function to use glob matching.`);
			var r = this.globCache[e.join(`\0`)];
			return r || (r = n(e, ...t), this.globCache[e.join(`\0`)] = r), this.options.filters.push((e) => r(e)), this;
		}
	};
}));
function At(e, t = {}) {
	let n = e.length, r = Array(n), i = Array(n), a, o;
	for (a = 0; a < n; a++) {
		let n = Pt(e[a]);
		r[a] = n;
		let s = n.length, c = Array(s);
		for (o = 0; o < s; o++) c[o] = (0, Gt.default)(n[o], t);
		i[a] = c;
	}
	return (e) => {
		let s = e.split(`/`);
		if (s[0] === `..` && Xt.test(e)) return !0;
		for (a = 0; a < n; a++) {
			let e = r[a], n = i[a], c = s.length, l = Math.min(c, e.length);
			for (o = 0; o < l;) {
				let r = e[o];
				if (r.includes(`/`)) return !0;
				if (!n[o](s[o])) break;
				if (!t.noglobstar && r === `**`) return !0;
				o++;
			}
			if (o === c) return !0;
		}
		return !1;
	};
}
function jt(e, t, n) {
	if (e === t || t.startsWith(`${e}/`)) {
		if (n) {
			let t = e.length + +!Qt(e);
			return (e, n) => e.slice(t, n ? -1 : void 0) || `.`;
		}
		let r = t.slice(e.length + 1);
		return r ? (e, t) => {
			if (e === `.`) return r;
			let n = `${r}/${e}`;
			return t ? n.slice(0, -1) : n;
		} : (e, t) => t && e !== `.` ? e.slice(0, -1) : e;
	}
	return n ? (t) => posix.relative(e, t) || `.` : (n) => posix.relative(e, `${t}/${n}`) || `.`;
}
function Mt(e, t) {
	if (t.startsWith(`${e}/`)) {
		let n = t.slice(e.length + 1);
		return (e) => `${n}/${e}`;
	}
	return (n) => {
		let r = posix.relative(e, `${t}/${n}`);
		return n[n.length - 1] === `/` && r !== `` ? `${r}/` : r || `.`;
	};
}
function Nt(e) {
	return e.replace(Jt, (e) => `${e}/`);
}
function Pt(e) {
	let t = Gt.default.scan(e, $t);
	return t.parts?.length ? t.parts : [e];
}
function Ft(e, t) {
	if (t?.caseSensitiveMatch === !1) return !0;
	let n = Gt.default.scan(e);
	return n.isGlob || n.negated;
}
function It(...e) {
	console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString(`es`)}]`, ...e);
}
function Lt(e) {
	return typeof e == `string` ? [e] : e ?? [];
}
function Rt(e, t, n, r) {
	let i = t.cwd, a = e;
	e[e.length - 1] === `/` && (a = e.slice(0, -1)), a[a.length - 1] !== `*` && t.expandDirectories && (a += `/**`);
	let o = an(i);
	a = isAbsolute$1(a.replace(sn, ``)) ? posix.relative(o, a) : posix.normalize(a);
	let s = on.exec(a)?.[0], c = Pt(a);
	if (s) {
		let e = (s.length + 1) / 3, t = 0, r = o.split(`/`);
		for (; t < e && c[t + e] === r[r.length + t - e];) a = a.slice(0, (e - t - 1) * 3) + a.slice((e - t) * 3 + c[t + e].length + 1) || `.`, t++;
		let l = posix.join(i, s.slice(t * 3));
		l[0] !== `.` && n.root.length > l.length && (n.root = Nt(l), n.depthOffset = -e + t);
	}
	if (!r && n.depthOffset >= 0) {
		n.commonPath ??= c;
		let e = [], t = Math.min(n.commonPath.length, c.length);
		for (let r = 0; r < t; r++) {
			let t = c[r];
			if (t === `**` && !c[r + 1]) {
				e.pop();
				break;
			}
			if (r === c.length - 1 || t !== n.commonPath[r] || Ft(t)) break;
			e.push(t);
		}
		n.depthOffset = e.length, n.commonPath = e, n.root = Nt(e.length > 0 ? posix.join(i, ...e) : i);
	}
	return a;
}
function zt(e, t, n) {
	let r = [], i = [];
	for (let t of e.ignore) t && (t[0] !== `!` || t[1] === `(`) && i.push(Rt(t, e, n, !0));
	for (let a of t) a && (a[0] !== `!` || a[1] === `(` ? r.push(Rt(a, e, n, !1)) : (a[1] !== `!` || a[2] === `(`) && i.push(Rt(a.slice(1), e, n, !0)));
	return {
		match: r,
		ignore: i
	};
}
function Bt(e, t) {
	let n = e.cwd, r = {
		root: n,
		depthOffset: 0
	}, i = zt(e, t, r);
	e.debug && It(`internal processing patterns:`, i);
	let { absolute: a, caseSensitiveMatch: o, debug: s, dot: c, followSymbolicLinks: l, onlyDirectories: u } = e, d = r.root.replace(qt, ``), f = {
		dot: c,
		nobrace: e.braceExpansion === !1,
		nocase: !o,
		noextglob: e.extglob === !1,
		noglobstar: e.globstar === !1,
		posix: !0
	}, p = (0, Gt.default)(i.match, f), m = (0, Gt.default)(i.ignore, f), h = At(i.match, f), g = jt(n, d, a), _ = a ? g : jt(n, d, !0), v = (e, t) => {
		let n = _(t, !0);
		return n !== `.` && !h(n) || m(n);
	}, y;
	e.deep !== void 0 && (y = Math.round(e.deep - r.depthOffset));
	let b = new Ot({
		filters: [s ? (e, t) => {
			let n = g(e, t), r = p(n) && !m(n);
			return r && It(`matched ${n}`), r;
		} : (e, t) => {
			let n = g(e, t);
			return p(n) && !m(n);
		}],
		exclude: s ? (e, t) => {
			let n = v(e, t);
			return It(`${n ? `skipped` : `crawling`} ${t}`), n;
		} : v,
		fs: e.fs,
		pathSeparator: `/`,
		relativePaths: !a,
		resolvePaths: a,
		includeBasePath: a,
		resolveSymlinks: l,
		excludeSymlinks: !l,
		excludeFiles: u,
		includeDirs: u || !e.onlyFiles,
		maxDepth: y,
		signal: e.signal
	}).crawl(d);
	return e.debug && It(`internal properties:`, {
		...r,
		root: d
	}), [b, n !== d && !a && Mt(n, d)];
}
function Vt(e, t) {
	if (t) for (let n = e.length - 1; n >= 0; n--) e[n] = t(e[n]);
	return e;
}
function Ht(e) {
	let t = Object.assign({}, e);
	for (let e in cn) t[e] === void 0 && Object.assign(t, { [e]: cn[e] });
	return t.cwd = (t.cwd instanceof URL ? fileURLToPath$1(t.cwd) : resolve$1(t.cwd || process.cwd())).replace(qt, `/`), t.ignore = Lt(t.ignore), t.fs &&= {
		readdir: t.fs.readdir || readdir$1,
		readdirSync: t.fs.readdirSync || readdirSync,
		realpath: t.fs.realpath || realpath$1,
		realpathSync: t.fs.realpathSync || realpathSync$1,
		stat: t.fs.stat || stat$2,
		statSync: t.fs.statSync || statSync$1
	}, t.debug && It(`globbing with options:`, t), t;
}
function Ut(e, t = {}) {
	if (e && t?.patterns) throw Error(`Cannot pass patterns as both an argument and an option`);
	let n = Kt(e) || typeof e == `string`, r = Lt((n ? e : e.patterns) ?? `**/*`), i = Ht(n ? t : e);
	return r.length > 0 ? Bt(i, r) : [];
}
async function Wt(e, t) {
	let [n, r] = Ut(e, t);
	return n ? Vt(await n.withPromise(), r) : [];
}
var Gt;
var Kt;
var qt;
var Jt;
var Yt;
var Xt;
var Zt;
var Qt;
var $t;
var en;
var tn;
var nn;
var rn;
var an;
var on;
var sn;
var cn;
var ln = z((() => {
	kt(), Gt = H(q(), 1), Kt = Array.isArray, qt = /\\/g, Jt = /^[A-Za-z]:$/, Yt = process.platform === `win32`, Xt = /^(\/?\.\.)+$/, Zt = /^[A-Z]:\/$/i, Qt = Yt ? (e) => Zt.test(e) : (e) => e === `/`, $t = { parts: !0 }, en = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g, tn = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g, nn = (e) => e.replace(en, `\\$&`), rn = (e) => e.replace(tn, `\\$&`), an = Yt ? rn : nn, on = /^(\/?\.\.)+/, sn = /\\(?=[()[\]{}!*+?@|])/g, cn = {
		caseSensitiveMatch: !0,
		debug: !!process.env.TINYGLOBBY_DEBUG,
		expandDirectories: !0,
		followSymbolicLinks: !0,
		onlyFiles: !0
	};
}));
var un = V({ glob: () => dn });
async function dn([e, t], n = {}) {
	let r = e + `/`;
	return (await Wt(t.replace(/^\//, ``), {
		cwd: e || `/`,
		absolute: !0,
		dot: !!n.dot,
		onlyFiles: !!n.nodir,
		expandDirectories: !1,
		ignore: n.ignore?.startsWith(r) ? n.ignore.slice(r.length) : n.ignore
	})).map((e) => resolve(e));
}
var fn = z((() => {
	ln();
}));
var pn = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getPackageBase = n, e.getPackageName = r;
	let t = /^(@[^\\\/]+[\\\/])?[^\\\/]+/;
	function n(e) {
		let n = e.lastIndexOf(`node_modules`);
		if (n !== -1 && (e[n - 1] === `/` || e[n - 1] === `\\`) && (e[n + 12] === `/` || e[n + 12] === `\\`)) {
			let r = e.slice(n + 13).match(t);
			if (r) return e.slice(0, n + 13 + r[0].length);
		}
	}
	function r(e) {
		let n = e.lastIndexOf(`node_modules`);
		if (n !== -1 && (e[n - 1] === `/` || e[n - 1] === `\\`) && (e[n + 12] === `/` || e[n + 12] === `\\`)) {
			let r = e.slice(n + 13).match(t);
			if (r && r.length > 0) return r[0].replace(/\\/g, `/`);
		}
	}
}));
var mn = B(((e, t) => {
	var n = W(`constants`), r = process.cwd, i = null, a = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		return i ||= r.call(process), i;
	};
	try {
		process.cwd();
	} catch {}
	if (typeof process.chdir == `function`) {
		var o = process.chdir;
		process.chdir = function(e) {
			i = null, o.call(process, e);
		}, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, o);
	}
	t.exports = s;
	function s(e) {
		n.hasOwnProperty(`O_SYMLINK`) && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = i(e.chmod), e.fchmod = i(e.fchmod), e.lchmod = i(e.lchmod), e.chownSync = c(e.chownSync), e.fchownSync = c(e.fchownSync), e.lchownSync = c(e.lchownSync), e.chmodSync = o(e.chmodSync), e.fchmodSync = o(e.fchmodSync), e.lchmodSync = o(e.lchmodSync), e.stat = l(e.stat), e.fstat = l(e.fstat), e.lstat = l(e.lstat), e.statSync = u(e.statSync), e.fstatSync = u(e.fstatSync), e.lstatSync = u(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(e, t, n) {
			n && process.nextTick(n);
		}, e.lchmodSync = function() {}), e.chown && !e.lchown && (e.lchown = function(e, t, n, r) {
			r && process.nextTick(r);
		}, e.lchownSync = function() {}), a === `win32` && (e.rename = typeof e.rename == `function` ? (function(t) {
			function n(n, r, i) {
				var a = Date.now(), o = 0;
				t(n, r, function s(c) {
					c && (c.code === `EACCES` || c.code === `EPERM` || c.code === `EBUSY`) && Date.now() - a < 6e4 ? (setTimeout(function() {
						e.stat(r, function(e, a) {
							e && e.code === `ENOENT` ? t(n, r, s) : i(c);
						});
					}, o), o < 100 && (o += 10)) : i && i(c);
				});
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
		})(e.rename) : e.rename), e.read = typeof e.read == `function` ? (function(t) {
			function n(n, r, i, a, o, s) {
				var c;
				if (s && typeof s == `function`) {
					var l = 0;
					c = function(u, d, f) {
						if (u && u.code === `EAGAIN` && l < 10) return l++, t.call(e, n, r, i, a, o, c);
						s.apply(this, arguments);
					};
				}
				return t.call(e, n, r, i, a, o, c);
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(n, t), n;
		})(e.read) : e.read, e.readSync = typeof e.readSync == `function` ? (function(t) {
			return function(n, r, i, a, o) {
				for (var s = 0;;) try {
					return t.call(e, n, r, i, a, o);
				} catch (e) {
					if (e.code === `EAGAIN` && s < 10) {
						s++;
						continue;
					}
					throw e;
				}
			};
		})(e.readSync) : e.readSync;
		function t(e) {
			e.lchmod = function(t, r, i) {
				e.open(t, n.O_WRONLY | n.O_SYMLINK, r, function(t, n) {
					t ? i && i(t) : e.fchmod(n, r, function(t) {
						e.close(n, function(e) {
							i && i(t || e);
						});
					});
				});
			}, e.lchmodSync = function(t, r) {
				var i = e.openSync(t, n.O_WRONLY | n.O_SYMLINK, r), a = !0, o;
				try {
					o = e.fchmodSync(i, r), a = !1;
				} finally {
					if (a) try {
						e.closeSync(i);
					} catch {}
					else e.closeSync(i);
				}
				return o;
			};
		}
		function r(e) {
			n.hasOwnProperty(`O_SYMLINK`) && e.futimes ? (e.lutimes = function(t, r, i, a) {
				e.open(t, n.O_SYMLINK, function(t, n) {
					t ? a && a(t) : e.futimes(n, r, i, function(t) {
						e.close(n, function(e) {
							a && a(t || e);
						});
					});
				});
			}, e.lutimesSync = function(t, r, i) {
				var a = e.openSync(t, n.O_SYMLINK), o, s = !0;
				try {
					o = e.futimesSync(a, r, i), s = !1;
				} finally {
					if (s) try {
						e.closeSync(a);
					} catch {}
					else e.closeSync(a);
				}
				return o;
			}) : e.futimes && (e.lutimes = function(e, t, n, r) {
				r && process.nextTick(r);
			}, e.lutimesSync = function() {});
		}
		function i(t) {
			return t && function(n, r, i) {
				return t.call(e, n, r, function(e) {
					d(e) && (e = null), i && i.apply(this, arguments);
				});
			};
		}
		function o(t) {
			return t && function(n, r) {
				try {
					return t.call(e, n, r);
				} catch (e) {
					if (!d(e)) throw e;
				}
			};
		}
		function s(t) {
			return t && function(n, r, i, a) {
				return t.call(e, n, r, i, function(e) {
					d(e) && (e = null), a && a.apply(this, arguments);
				});
			};
		}
		function c(t) {
			return t && function(n, r, i) {
				try {
					return t.call(e, n, r, i);
				} catch (e) {
					if (!d(e)) throw e;
				}
			};
		}
		function l(t) {
			return t && function(n, r, i) {
				typeof r == `function` && (i = r, r = null);
				function a(e, t) {
					t && (t.uid < 0 && (t.uid += 4294967296), t.gid < 0 && (t.gid += 4294967296)), i && i.apply(this, arguments);
				}
				return r ? t.call(e, n, r, a) : t.call(e, n, a);
			};
		}
		function u(t) {
			return t && function(n, r) {
				var i = r ? t.call(e, n, r) : t.call(e, n);
				return i && (i.uid < 0 && (i.uid += 4294967296), i.gid < 0 && (i.gid += 4294967296)), i;
			};
		}
		function d(e) {
			return !(e && e.code !== `ENOSYS` && (process.getuid && process.getuid() === 0 || e.code !== `EINVAL` && e.code !== `EPERM`));
		}
	}
}));
var hn = B(((e, t) => {
	var n = W(`stream`).Stream;
	t.exports = r;
	function r(e) {
		return {
			ReadStream: t,
			WriteStream: r
		};
		function t(r, i) {
			if (!(this instanceof t)) return new t(r, i);
			n.call(this);
			var a = this;
			this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = `r`, this.mode = 438, this.bufferSize = 65536, i ||= {};
			for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
				var l = o[s];
				this[l] = i[l];
			}
			if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
				if (typeof this.start != `number`) throw TypeError(`start must be a Number`);
				if (this.end === void 0) this.end = 1 / 0;
				else if (typeof this.end != `number`) throw TypeError(`end must be a Number`);
				if (this.start > this.end) throw Error(`start must be <= end`);
				this.pos = this.start;
			}
			this.fd === null ? e.open(this.path, this.flags, this.mode, function(e, t) {
				e ? (a.emit(`error`, e), a.readable = !1) : (a.fd = t, a.emit(`open`, t), a._read());
			}) : process.nextTick(function() {
				a._read();
			});
		}
		function r(t, i) {
			if (!(this instanceof r)) return new r(t, i);
			n.call(this), this.path = t, this.fd = null, this.writable = !0, this.flags = `w`, this.encoding = `binary`, this.mode = 438, this.bytesWritten = 0, i ||= {};
			for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
				var c = a[o];
				this[c] = i[c];
			}
			if (this.start !== void 0) {
				if (typeof this.start != `number`) throw TypeError(`start must be a Number`);
				if (this.start < 0) throw Error(`start must be >= zero`);
				this.pos = this.start;
			}
			this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([
				this._open,
				this.path,
				this.flags,
				this.mode,
				void 0
			]), this.flush());
		}
	}
}));
var gn = B(((e, t) => {
	t.exports = r;
	var n = Object.getPrototypeOf || function(e) {
		return e.__proto__;
	};
	function r(e) {
		if (typeof e != `object` || !e) return e;
		if (e instanceof Object) var t = { __proto__: n(e) };
		else var t = Object.create(null);
		return Object.getOwnPropertyNames(e).forEach(function(n) {
			Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
		}), t;
	}
}));
var _n = B(((e, t) => {
	var n = W(`fs`), r = mn(), i = hn(), a = gn(), o = W(`util`), s, c;
	typeof Symbol == `function` && typeof Symbol.for == `function` ? (s = Symbol.for(`graceful-fs.queue`), c = Symbol.for(`graceful-fs.previous`)) : (s = `___graceful-fs.queue`, c = `___graceful-fs.previous`);
	function l() {}
	function u(e, t) {
		Object.defineProperty(e, s, { get: function() {
			return t;
		} });
	}
	var d = l;
	o.debuglog ? d = o.debuglog(`gfs4`) : /\bgfs4\b/i.test(process.env.NODE_DEBUG || ``) && (d = function() {
		var e = o.format.apply(o, arguments);
		e = `GFS4: ` + e.split(/\n/).join(`
GFS4: `), console.error(e);
	}), n[s] || (u(n, global[s] || []), n.close = (function(e) {
		function t(t, r) {
			return e.call(n, t, function(e) {
				e || h(), typeof r == `function` && r.apply(this, arguments);
			});
		}
		return Object.defineProperty(t, c, { value: e }), t;
	})(n.close), n.closeSync = (function(e) {
		function t(t) {
			e.apply(n, arguments), h();
		}
		return Object.defineProperty(t, c, { value: e }), t;
	})(n.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || ``) && process.on(`exit`, function() {
		d(n[s]), W(`assert`).equal(n[s].length, 0);
	})), global[s] || u(global, n[s]), t.exports = f(a(n)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !n.__patched && (t.exports = f(n), n.__patched = !0);
	function f(e) {
		r(e), e.gracefulify = f, e.createReadStream = T, e.createWriteStream = E;
		var t = e.readFile;
		e.readFile = n;
		function n(e, n, r) {
			return typeof n == `function` && (r = n, n = null), i(e, n, r);
			function i(e, n, r, a) {
				return t(e, n, function(t) {
					t && (t.code === `EMFILE` || t.code === `ENFILE`) ? p([
						i,
						[
							e,
							n,
							r
						],
						t,
						a || Date.now(),
						Date.now()
					]) : typeof r == `function` && r.apply(this, arguments);
				});
			}
		}
		var a = e.writeFile;
		e.writeFile = o;
		function o(e, t, n, r) {
			return typeof n == `function` && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, o) {
				return a(e, t, n, function(a) {
					a && (a.code === `EMFILE` || a.code === `ENFILE`) ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						a,
						o || Date.now(),
						Date.now()
					]) : typeof r == `function` && r.apply(this, arguments);
				});
			}
		}
		var s = e.appendFile;
		s && (e.appendFile = c);
		function c(e, t, n, r) {
			return typeof n == `function` && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return s(e, t, n, function(o) {
					o && (o.code === `EMFILE` || o.code === `ENFILE`) ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == `function` && r.apply(this, arguments);
				});
			}
		}
		var l = e.copyFile;
		l && (e.copyFile = u);
		function u(e, t, n, r) {
			return typeof n == `function` && (r = n, n = 0), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return l(e, t, n, function(o) {
					o && (o.code === `EMFILE` || o.code === `ENFILE`) ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == `function` && r.apply(this, arguments);
				});
			}
		}
		var d = e.readdir;
		e.readdir = h;
		var m = /^v[0-5]\./;
		function h(e, t, n) {
			typeof t == `function` && (n = t, t = null);
			var r = m.test(process.version) ? function(e, t, n, r) {
				return d(e, i(e, t, n, r));
			} : function(e, t, n, r) {
				return d(e, t, i(e, t, n, r));
			};
			return r(e, t, n);
			function i(e, t, n, i) {
				return function(a, o) {
					a && (a.code === `EMFILE` || a.code === `ENFILE`) ? p([
						r,
						[
							e,
							t,
							n
						],
						a,
						i || Date.now(),
						Date.now()
					]) : (o && o.sort && o.sort(), typeof n == `function` && n.call(this, a, o));
				};
			}
		}
		if (process.version.substr(0, 4) === `v0.8`) {
			var g = i(e);
			x = g.ReadStream, C = g.WriteStream;
		}
		var _ = e.ReadStream;
		_ && (x.prototype = Object.create(_.prototype), x.prototype.open = S);
		var v = e.WriteStream;
		v && (C.prototype = Object.create(v.prototype), C.prototype.open = w), Object.defineProperty(e, "ReadStream", {
			get: function() {
				return x;
			},
			set: function(e) {
				x = e;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(e, "WriteStream", {
			get: function() {
				return C;
			},
			set: function(e) {
				C = e;
			},
			enumerable: !0,
			configurable: !0
		});
		var y = x;
		Object.defineProperty(e, "FileReadStream", {
			get: function() {
				return y;
			},
			set: function(e) {
				y = e;
			},
			enumerable: !0,
			configurable: !0
		});
		var b = C;
		Object.defineProperty(e, "FileWriteStream", {
			get: function() {
				return b;
			},
			set: function(e) {
				b = e;
			},
			enumerable: !0,
			configurable: !0
		});
		function x(e, t) {
			return this instanceof x ? (_.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
		}
		function S() {
			var e = this;
			O(e.path, e.flags, e.mode, function(t, n) {
				t ? (e.autoClose && e.destroy(), e.emit(`error`, t)) : (e.fd = n, e.emit(`open`, n), e.read());
			});
		}
		function C(e, t) {
			return this instanceof C ? (v.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
		}
		function w() {
			var e = this;
			O(e.path, e.flags, e.mode, function(t, n) {
				t ? (e.destroy(), e.emit(`error`, t)) : (e.fd = n, e.emit(`open`, n));
			});
		}
		function T(t, n) {
			return new e.ReadStream(t, n);
		}
		function E(t, n) {
			return new e.WriteStream(t, n);
		}
		var D = e.open;
		e.open = O;
		function O(e, t, n, r) {
			return typeof n == `function` && (r = n, n = null), i(e, t, n, r);
			function i(e, t, n, r, a) {
				return D(e, t, n, function(o, s) {
					o && (o.code === `EMFILE` || o.code === `ENFILE`) ? p([
						i,
						[
							e,
							t,
							n,
							r
						],
						o,
						a || Date.now(),
						Date.now()
					]) : typeof r == `function` && r.apply(this, arguments);
				});
			}
		}
		return e;
	}
	function p(e) {
		d(`ENQUEUE`, e[0].name, e[1]), n[s].push(e), g();
	}
	var m;
	function h() {
		for (var e = Date.now(), t = 0; t < n[s].length; ++t) n[s][t].length > 2 && (n[s][t][3] = e, n[s][t][4] = e);
		g();
	}
	function g() {
		if (clearTimeout(m), m = void 0, n[s].length !== 0) {
			var e = n[s].shift(), t = e[0], r = e[1], i = e[2], a = e[3], o = e[4];
			if (a === void 0) d(`RETRY`, t.name, r), t.apply(null, r);
			else if (Date.now() - a >= 6e4) {
				d(`TIMEOUT`, t.name, r);
				var c = r.pop();
				typeof c == `function` && c.call(null, i);
			} else {
				var l = Date.now() - o, u = Math.max(o - a, 1);
				l >= Math.min(u * 1.2, 100) ? (d(`RETRY`, t.name, r), t.apply(null, r.concat([a]))) : n[s].push(e);
			}
			m === void 0 && (m = setTimeout(g, 0));
		}
	}
}));
var vn = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.pregyp = void 0, e.nbind = l;
	let n = t(W(`path`)), r = t(_n()), i = be(), a = ye(), o = (e, t) => {
		let o = JSON.parse(r.default.readFileSync(e).toString());
		i.validate_config(o, t);
		var s;
		return a.get_napi_build_versions(o, t) && (s = a.get_best_napi_build_version(o, t)), t ||= {}, t.module_root || (t.module_root = n.default.dirname(e)), i.evaluate(o, t, s).module;
	};
	e.pregyp = {
		default: { find: o },
		find: o
	};
	function s(e, t) {
		return [
			[e, t],
			[
				e,
				`build`,
				t
			],
			[
				e,
				`build`,
				`Debug`,
				t
			],
			[
				e,
				`build`,
				`Release`,
				t
			],
			[
				e,
				`out`,
				`Debug`,
				t
			],
			[
				e,
				`Debug`,
				t
			],
			[
				e,
				`out`,
				`Release`,
				t
			],
			[
				e,
				`Release`,
				t
			],
			[
				e,
				`build`,
				`default`,
				t
			],
			[
				e,
				process.env.NODE_BINDINGS_COMPILED_DIR || `compiled`,
				process.versions.node,
				process.platform,
				process.arch,
				t
			]
		];
	}
	function c(e, t) {
		for (var r = [], i = n.default.extname(e), a = 0, o = t; a < o.length; a++) {
			var c = o[a];
			if (i == c.ext) try {
				return c.path = W.resolve(e), c;
			} catch {
				r.push(e);
			}
		}
		for (var l = 0, u = t; l < u.length; l++) for (var c = u[l], d = 0, f = s(e, c.name); d < f.length; d++) {
			var p = f[d], m = n.default.resolve.apply(n.default, p);
			try {
				c.path = W.resolve(m);
			} catch {
				r.push(m);
				continue;
			}
			return c;
		}
		return null;
	}
	function l(e = process.cwd()) {
		return c(e, [{
			ext: `.node`,
			name: `nbind.node`,
			type: `node`
		}, {
			ext: `.js`,
			name: `nbind.js`,
			type: `emcc`
		}]);
	}
}));
var yn = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.normalizeDefaultRequire = t, e.normalizeWildcardRequire = r;
	function t(e) {
		return e && e.__esModule ? e : { default: e };
	}
	let n = Object.prototype.hasOwnProperty;
	function r(e) {
		if (e && e.__esModule) return e;
		let t = {};
		for (let r in e) n.call(e, r) && (t[r] = e[r]);
		return t.default = e, t;
	}
}));
var bn = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getNodeMajorVersion = t;
	function t() {
		return parseInt(process.versions.node.split(`.`)[0], 10);
	}
}));
var xn = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NotFoundError = void 0, e.default = i;
	let t = W(`path`), n = W(`module`), r = bn();
	async function i(e, n, r, i = !0) {
		let o;
		if ((0, t.isAbsolute)(e) || e === `.` || e === `..` || e.startsWith(`./`) || e.startsWith(`../`)) {
			let i = e.endsWith(`/`);
			o = await a((0, t.resolve)(n, `..`, e) + (i ? `/` : ``), n, r);
		} else o = e[0] === `#` ? await b(e, n, r, i) : await x(e, n, r, i);
		return Array.isArray(o) ? Promise.all(o.map((e) => r.realpath(e, n))) : o.startsWith(`node:`) ? o : r.realpath(o, n);
	}
	async function a(e, t, n) {
		let r = await o(e, t, n) || await s(e, t, n);
		if (!r) throw new c(e, t);
		return r;
	}
	async function o(e, n, r) {
		if (!e.endsWith(`/`)) {
			if (e = await r.realpath(e, n), await r.isFile(e)) return e;
			if (r.ts && e.startsWith(r.base) && e.slice(r.base.length).indexOf(t.sep + `node_modules` + t.sep) === -1 && await r.isFile(e + `.ts`)) return e + `.ts`;
			if (r.ts && e.startsWith(r.base) && e.slice(r.base.length).indexOf(t.sep + `node_modules` + t.sep) === -1 && await r.isFile(e + `.tsx`)) return e + `.tsx`;
			if (await r.isFile(e + `.js`)) return e + `.js`;
			if (await r.isFile(e + `.json`)) return e + `.json`;
			if (await r.isFile(e + `.node`)) return e + `.node`;
		}
	}
	async function s(e, n, r) {
		if (e.endsWith(`/`) && (e = e.slice(0, -1)), !await r.isDir(e)) return;
		let i = await f(e, r);
		if (i && typeof i.main == `string`) {
			let a = await o((0, t.resolve)(e, i.main), n, r) || await o((0, t.resolve)(e, i.main, `index`), n, r);
			if (a) return await r.emitFile(e + t.sep + `package.json`, `resolve`, n), a;
		}
		return o((0, t.resolve)(e, `index`), n, r);
	}
	var c = class extends Error {
		code;
		constructor(e, t) {
			super(`Cannot find module '` + e + `' loaded from ` + t), this.code = `MODULE_NOT_FOUND`;
		}
	};
	e.NotFoundError = c;
	let l = new Set(n.builtinModules), u = (0, r.getNodeMajorVersion)() >= 22;
	function d(e) {
		let t = e.split(`/`);
		return e[0] === `@` && t.length > 1 ? t.length > 1 ? t.slice(0, 2).join(`/`) : null : t.length ? t[0] : null;
	}
	async function f(e, n) {
		let r = await n.readFile(e + t.sep + `package.json`);
		if (r) try {
			return JSON.parse(r.toString());
		} catch {}
	}
	function p(e, t, n, r) {
		if (typeof e == `string` || e === null) return e;
		if (Array.isArray(e)) for (let i of e) {
			let e = p(i, t, n, r);
			if (e === null || typeof e == `string` && e.startsWith(`./`)) return e;
		}
		else if (typeof e == `object`) {
			for (let i of Object.keys(e)) if (i === "default" || i === `require` && n || i === `import` && !n || i === `module-sync` && r || t.includes(i)) {
				let a = p(e[i], t, n, r);
				if (a !== void 0) return a;
			}
		}
	}
	function m(e, t) {
		let n = e.indexOf(`*`), r = t.indexOf(`*`), i = n === -1 ? e.length : n + 1, a = r === -1 ? t.length : r + 1;
		return i > a ? -1 : a > i || n === -1 ? 1 : r === -1 || e.length > t.length ? -1 : +(t.length > e.length);
	}
	function h(e, t) {
		let n = e.indexOf(`*`);
		if (n === -1 || e.lastIndexOf(`*`) !== n) return;
		let r = e.slice(0, n);
		if (!t.startsWith(r)) return;
		let i = e.slice(n + 1);
		if (!(t.length < e.length || i && !t.endsWith(i))) return t.slice(n, t.length - i.length);
	}
	function g(e, t, n, r) {
		if (typeof n != `string` || !n.startsWith(`./`)) return;
		let i = t + (r ? n.slice(1).replace(/\*/g, r) : n.slice(1));
		e.includes(i) || e.push(i);
	}
	async function _(e, t, n, r) {
		let i = [];
		for (let a of e) if (r) {
			let e = await o(a, t, n) || await s(a, t, n);
			if (!e) throw new c(a, t);
			i.push(e);
		} else {
			if (!await n.isFile(a)) throw new c(a, t);
			i.push(a);
		}
		return i;
	}
	async function v(e, t, n, r, a, o, s) {
		let c;
		if (a) {
			if (typeof t != `object` || Array.isArray(t) || t === null) return;
			c = t;
		} else c = typeof t == `string` || Array.isArray(t) || t === null || typeof t == `object` && Object.keys(t).length && Object.keys(t)[0][0] !== `.` ? { ".": t } : t;
		if (n in c) {
			let t = p(c[n], r.conditions, o, u);
			if (typeof t == `string` && t.startsWith(`./`)) {
				let i = [e + t.slice(1)], a = c[n];
				return typeof a == `object` && a && !Array.isArray(a) && `module-sync` in a && (u || r.moduleSyncCatchall) && (g(i, e, p(a[`module-sync`], r.conditions, o, !0)), g(i, e, p(a[o && `require` in a ? `require` : !o && `import` in a ? `import` : `default`], r.conditions, o, !1))), await _(i, s, r, o);
			}
			if (a && typeof t == `string`) {
				let e = await i(t, s, r, o);
				return Array.isArray(e) ? e : [e];
			}
		}
		for (let t of Object.keys(c).sort(m)) {
			let i = h(t, n);
			if (i !== void 0) {
				let n = p(c[t], r.conditions, o, u);
				if (typeof n == `string` && n.startsWith(`./`)) {
					let a = [e + n.slice(1).replace(/\*/g, i)], l = c[t];
					return r.moduleSyncCatchall && typeof l == `object` && l && !Array.isArray(l) && `module-sync` in l && (g(a, e, p(l[`module-sync`], r.conditions, o, !0), i), g(a, e, p(l[o && `require` in l ? `require` : !o && `import` in l ? `import` : `default`], r.conditions, o, !1), i)), await _(a, s, r, o);
				}
			}
			if (t.endsWith(`/`) && n.startsWith(t)) {
				let i = p(c[t], r.conditions, o, u);
				if (typeof i == `string` && i.endsWith(`/`) && i.startsWith(`./`)) return await _([e + i.slice(1) + n.slice(t.length)], s, r, o);
			}
		}
	}
	async function y(e, n, r, i) {
		if (i.conditions?.includes(`browser`)) {
			let { browser: a } = n;
			if (!a) return;
			if (typeof a == `object`) for (let [n, s] of Object.entries(a)) {
				if (typeof s != `string` || !n.startsWith(`./`) || !s.startsWith(`./`)) continue;
				let a = await o(e + t.sep + n, r, i), c = await o(e + t.sep + s, r, i);
				a && c && i.addRemapping(a, c);
			}
		}
	}
	async function b(e, n, r, i) {
		if (e !== `#` && !e.startsWith(`#/`) && r.conditions) {
			let a = await r.getPjsonBoundary(n);
			if (a) {
				let o = await f(a, r), { imports: s } = o || {};
				if (o && s != null) {
					let o = await v(a, s, e, r, !0, i, n);
					if (o) return await r.emitFile(a + t.sep + `package.json`, `resolve`, n), o;
				}
			}
		}
		throw new c(e, n);
	}
	async function x(e, n, r, i) {
		let a = n;
		if (l.has(e)) return `node:` + e;
		if (e.startsWith(`node:`)) return e;
		let u = d(e) || ``, p;
		if (r.conditions) {
			let a = await r.getPjsonBoundary(n);
			if (a) {
				let o = await f(a, r), { exports: s } = o || {};
				o && o.name && o.name === u && s != null && (p = await v(a, s, `.` + e.slice(u.length), r, !1, i, n), p && await r.emitFile(a + t.sep + `package.json`, `resolve`, n));
			}
		}
		let m, h = a.indexOf(t.sep);
		for (; (m = a.lastIndexOf(t.sep)) > h;) {
			a = a.slice(0, m);
			let c = a + t.sep + `node_modules`, l = await r.stat(c);
			if (!l || !l.isDirectory()) continue;
			let d = await f(c + t.sep + u, r), { exports: h } = d || {};
			if (d && await y(c + t.sep + u, d, n, r), r.conditions && h != null && !p) {
				let a;
				r.exportsOnly || (a = await o(c + t.sep + e, n, r) || await s(c + t.sep + e, n, r));
				let l = await v(c + t.sep + u, h, `.` + e.slice(u.length), r, !1, i, n);
				if (l) return await r.emitFile(c + t.sep + u + t.sep + `package.json`, `resolve`, n), a && !l.includes(a) ? [...l, a] : l;
				if (a) return a;
			} else {
				let i = await o(c + t.sep + e, n, r) || await s(c + t.sep + e, n, r);
				if (i) {
					if (p) {
						if (Array.isArray(p)) return p.includes(i) ? p : [i, ...p];
						if (p !== i) return [i, p];
					}
					return i;
				}
			}
		}
		if (p) return p;
		if (Object.hasOwnProperty.call(r.paths, e)) return r.paths[e];
		for (let t of Object.keys(r.paths)) if (t.endsWith(`/`) && e.startsWith(t)) {
			let i = r.paths[t] + e.slice(t.length), a = await o(i, n, r) || await s(i, n, r);
			if (!a) throw new c(e, n);
			return a;
		}
		throw new c(e, n);
	}
}));
var Sn = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = c;
	let n = W(`path`), r = W(`fs`), i = t(xn()), a = pn(), o = _n(), s = {
		"@generated/photon"({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`@generated/photon/index.js`) && t((0, n.resolve)((0, n.dirname)(e), `runtime/`));
		},
		"@serialport/bindings-cpp"({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`@serialport/bindings-cpp/dist/index.js`) && (t((0, n.resolve)((0, n.dirname)(e), `..`, `build`, `Release`)), t((0, n.resolve)((0, n.dirname)(e), `..`, `prebuilds`)));
		},
		argon2({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`argon2/argon2.js`) && (t((0, n.resolve)((0, n.dirname)(e), `build`, `Release`)), t((0, n.resolve)((0, n.dirname)(e), `prebuilds`)), t((0, n.resolve)((0, n.dirname)(e), `lib`, `binding`)));
		},
		bull({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`bull/lib/commands/index.js`) && t((0, n.resolve)((0, n.dirname)(e)));
		},
		camaro({ id: e, emitAsset: t }) {
			e.endsWith(`camaro/dist/camaro.js`) && t((0, n.resolve)((0, n.dirname)(e), `camaro.wasm`));
		},
		esbuild({ id: e, emitAssetDirectory: t }) {
			if (e.endsWith(`esbuild/lib/main.js`)) {
				let r = (0, n.resolve)(e, `..`, `..`, `package.json`), i = JSON.parse((0, o.readFileSync)(r, `utf8`));
				for (let r of Object.keys(i.optionalDependencies || {})) t((0, n.resolve)(e, `..`, `..`, `..`, r));
			}
		},
		"ffmpeg-static"({ id: e, emitAsset: t }) {
			if (e.endsWith(`ffmpeg-static/index.js`)) {
				let i = (0, n.dirname)(e), a = process.platform === `win32` ? `.exe` : ``, o = [(0, n.resolve)(i, `ffmpeg${a}`), (0, n.resolve)(i, `bin`, process.platform, process.arch, `ffmpeg${a}`)].find((e) => (0, r.existsSync)(e));
				o && t(o);
			}
		},
		"google-gax"({ id: e, ast: t, emitAssetDirectory: r }) {
			if (e.endsWith(`google-gax/build/src/grpc.js`)) for (let i of t.body) i.type === `VariableDeclaration` && i.declarations[0].id.type === `Identifier` && i.declarations[0].id.name === `googleProtoFilesDir` && r((0, n.resolve)((0, n.dirname)(e), `../../../google-proto-files`));
		},
		oracledb({ id: e, ast: t, emitAsset: r }) {
			if (e.endsWith(`oracledb/lib/oracledb.js`)) {
				for (let i of t.body) if (i.type === `ForStatement` && `body` in i.body && i.body.body && Array.isArray(i.body.body) && i.body.body[0] && i.body.body[0].type === `TryStatement` && i.body.body[0].block.body[0] && i.body.body[0].block.body[0].type === `ExpressionStatement` && i.body.body[0].block.body[0].expression.type === `AssignmentExpression` && i.body.body[0].block.body[0].expression.operator === `=` && i.body.body[0].block.body[0].expression.left.type === `Identifier` && i.body.body[0].block.body[0].expression.left.name === `oracledbCLib` && i.body.body[0].block.body[0].expression.right.type === `CallExpression` && i.body.body[0].block.body[0].expression.right.callee.type === `Identifier` && i.body.body[0].block.body[0].expression.right.callee.name === `require` && i.body.body[0].block.body[0].expression.right.arguments.length === 1 && i.body.body[0].block.body[0].expression.right.arguments[0].type === `MemberExpression` && i.body.body[0].block.body[0].expression.right.arguments[0].computed === !0 && i.body.body[0].block.body[0].expression.right.arguments[0].object.type === `Identifier` && i.body.body[0].block.body[0].expression.right.arguments[0].object.name === `binaryLocations` && i.body.body[0].block.body[0].expression.right.arguments[0].property.type === `Identifier` && i.body.body[0].block.body[0].expression.right.arguments[0].property.name === `i`) {
					i.body.body[0].block.body[0].expression.right.arguments = [{
						type: `Literal`,
						value: `_`
					}];
					let t = global._unit ? `3.0.0` : JSON.parse((0, o.readFileSync)(e.slice(0, -15) + `package.json`, `utf8`)).version, a = `oracledb-` + (Number(t.slice(0, t.indexOf(`.`))) >= 4 ? t : `abi` + process.versions.modules) + `-` + process.platform + `-` + process.arch + `.node`;
					r((0, n.resolve)(e, `../../build/Release/` + a));
				}
			}
		},
		"phantomjs-prebuilt"({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`phantomjs-prebuilt/lib/phantomjs.js`) && t((0, n.resolve)((0, n.dirname)(e), `..`, `bin`));
		},
		"remark-prism"({ id: e, emitAssetDirectory: t }) {
			if (e.endsWith(`remark-prism/src/highlight.js`)) try {
				let r = e.slice(0, -29);
				t((0, n.resolve)(r, `prismjs`, `components`));
			} catch {}
		},
		semver({ id: e, emitAsset: t }) {
			e.endsWith(`semver/index.js`) && t((0, n.resolve)(e.replace(`index.js`, `preload.js`)));
		},
		sharp: async ({ id: e, emitAssetDirectory: t, job: r }) => {
			if (e.endsWith(`sharp/lib/index.js`)) {
				let i = (0, n.resolve)(e, `..`, `..`, `package.json`), a = JSON.parse((0, o.readFileSync)(i, `utf8`));
				for (let i of Object.keys(a.optionalDependencies || {})) {
					let a = (0, n.resolve)(e, `..`, `..`, `..`, i);
					t(a);
					try {
						let e = (0, n.resolve)(a, `package.json`), i = JSON.parse((0, o.readFileSync)(e, `utf8`));
						for (let e of Object.keys(i.optionalDependencies || {})) t((0, n.resolve)(await r.realpath(a), `..`, `..`, e));
					} catch (e) {
						if (e && e.code !== `ENOENT`) throw console.error(`Error reading "sharp" dependencies from "${a}/package.json"'`), e;
					}
				}
			}
		},
		shiki({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`/dist/index.js`) && (t((0, n.resolve)((0, n.dirname)(e), `..`, `languages`)), t((0, n.resolve)((0, n.dirname)(e), `..`, `themes`)));
		},
		"socket.io": async function({ id: e, ast: t, job: r }) {
			if (e.endsWith(`socket.io/lib/index.js`)) {
				async function a(t) {
					if (t.type === `ExpressionStatement` && t.expression.type === `AssignmentExpression` && t.expression.operator === `=` && t.expression.right.type === `CallExpression` && t.expression.right.callee.type === `Identifier` && t.expression.right.callee.name === `read` && t.expression.right.arguments.length >= 1 && t.expression.right.arguments[0].type === `CallExpression` && t.expression.right.arguments[0].callee.type === `Identifier` && t.expression.right.arguments[0].callee.name === `resolvePath` && t.expression.right.arguments[0].arguments.length === 1 && t.expression.right.arguments[0].arguments[0].type === `Literal`) {
						let a = t.expression.right.arguments[0].arguments[0].value, o;
						try {
							let t = await (0, i.default)(String(a), e, r);
							if (typeof t == `string`) o = t;
							else return;
						} catch {
							return;
						}
						let s = `/` + (0, n.relative)((0, n.dirname)(e), o);
						t.expression.right.arguments[0] = {
							type: `BinaryExpression`,
							start: t.expression.right.arguments[0].start,
							end: t.expression.right.arguments[0].end,
							operator: `+`,
							left: {
								type: `Identifier`,
								name: `__dirname`
							},
							right: {
								type: `Literal`,
								value: s,
								raw: JSON.stringify(s)
							}
						};
					}
				}
				for (let e of t.body) if (e.type === `ExpressionStatement` && e.expression.type === `AssignmentExpression` && e.expression.operator === `=` && e.expression.left.type === `MemberExpression` && e.expression.left.object.type === `MemberExpression` && e.expression.left.object.object.type === `Identifier` && e.expression.left.object.object.name === `Server` && e.expression.left.object.property.type === `Identifier` && e.expression.left.object.property.name === `prototype` && e.expression.left.property.type === `Identifier` && e.expression.left.property.name === `serveClient` && e.expression.right.type === `FunctionExpression`) {
					for (let t of e.expression.right.body.body) if (t.type === `IfStatement` && t.consequent && `body` in t.consequent && t.consequent.body) {
						let e = t.consequent.body, n = !1;
						Array.isArray(e) && e[0] && e[0].type === `ExpressionStatement` && (n = await a(e[0])), Array.isArray(e) && e[1] && e[1].type === `TryStatement` && e[1].block.body && e[1].block.body[0] && (n = await a(e[1].block.body[0]) || n);
						return;
					}
				}
			}
		},
		typescript({ id: e, emitAssetDirectory: t }) {
			e.endsWith(`typescript/lib/tsc.js`) && t((0, n.resolve)(e, `../`));
		},
		"uglify-es"({ id: e, emitAsset: t }) {
			e.endsWith(`uglify-es/tools/node.js`) && (t((0, n.resolve)(e, `../../lib/utils.js`)), t((0, n.resolve)(e, `../../lib/ast.js`)), t((0, n.resolve)(e, `../../lib/parse.js`)), t((0, n.resolve)(e, `../../lib/transform.js`)), t((0, n.resolve)(e, `../../lib/scope.js`)), t((0, n.resolve)(e, `../../lib/output.js`)), t((0, n.resolve)(e, `../../lib/compress.js`)), t((0, n.resolve)(e, `../../lib/sourcemap.js`)), t((0, n.resolve)(e, `../../lib/mozilla-ast.js`)), t((0, n.resolve)(e, `../../lib/propmangle.js`)), t((0, n.resolve)(e, `../../lib/minify.js`)), t((0, n.resolve)(e, `../exports.js`)));
		},
		"uglify-js"({ id: e, emitAsset: t, emitAssetDirectory: r }) {
			e.endsWith(`uglify-js/tools/node.js`) && (r((0, n.resolve)(e, `../../lib`)), t((0, n.resolve)(e, `../exports.js`)));
		},
		"playwright-core"({ id: e, emitAsset: t }) {
			e.endsWith(`playwright-core/index.js`) && t((0, n.resolve)((0, n.dirname)(e), `browsers.json`));
		},
		"geo-tz"({ id: e, emitAsset: t }) {
			e.endsWith(`geo-tz/dist/geo-tz.js`) && t((0, n.resolve)((0, n.dirname)(e), `../data/geo.dat`));
		},
		pixelmatch({ id: e, emitDependency: t }) {
			e.endsWith(`pixelmatch/index.js`) && t((0, n.resolve)((0, n.dirname)(e), `bin/pixelmatch`));
		},
		"geoip-lite"({ id: e, emitAsset: t }) {
			e.endsWith(`geoip-lite/lib/geoip.js`) && (t((0, n.resolve)((0, n.dirname)(e), `../data/geoip-city.dat`)), t((0, n.resolve)((0, n.dirname)(e), `../data/geoip-city6.dat`)), t((0, n.resolve)((0, n.dirname)(e), `../data/geoip-city-names.dat`)), t((0, n.resolve)((0, n.dirname)(e), `../data/geoip-country.dat`)), t((0, n.resolve)((0, n.dirname)(e), `../data/geoip-country6.dat`)));
		}
	};
	async function c({ id: e, ast: t, emitDependency: n, emitAsset: r, emitAssetDirectory: i, job: o }) {
		let c = (0, a.getPackageName)(e), l = s[c || ``];
		e = e.replace(/\\/g, `/`), l && await l({
			id: e,
			ast: t,
			emitDependency: n,
			emitAsset: r,
			emitAssetDirectory: i,
			job: o
		});
	}
}));
var Cn = B(((e, t) => {
	var n = W(`fs`), r = W(`path`), i = W(`os`), a = typeof __webpack_require__ == `function` ? __non_webpack_require__ : W, o = process.config && process.config.variables || {}, s = !!process.env.PREBUILDS_ONLY, c = process.versions.modules, l = D() ? `electron` : E() ? `node-webkit` : `node`, u = process.env.npm_config_arch || i.arch(), d = process.env.npm_config_platform || i.platform(), f = process.env.LIBC || (O(d) ? `musl` : `glibc`), p = process.env.ARM_VERSION || (u === `arm64` ? `8` : o.arm_version) || ``, m = (process.versions.uv || ``).split(`.`)[0];
	t.exports = h;
	function h(e) {
		return a(h.resolve(e));
	}
	h.resolve = h.path = function(e) {
		e = r.resolve(e || `.`);
		try {
			var t = a(r.join(e, `package.json`)).name.toUpperCase().replace(/-/g, `_`);
			process.env[t + `_PREBUILD`] && (e = process.env[t + `_PREBUILD`]);
		} catch {}
		if (!s) {
			var n = _(r.join(e, `build/Release`), v);
			if (n) return n;
			var i = _(r.join(e, `build/Debug`), v);
			if (i) return i;
		}
		var o = E(e);
		if (o) return o;
		var h = E(r.dirname(process.execPath));
		if (h) return h;
		var w = [
			`platform=` + d,
			`arch=` + u,
			`runtime=` + l,
			`abi=` + c,
			`uv=` + m,
			p ? `armv=` + p : ``,
			`libc=` + f,
			`node=` + process.versions.node,
			process.versions.electron ? `electron=` + process.versions.electron : ``,
			typeof __webpack_require__ == `function` ? `webpack=true` : ``
		].filter(Boolean).join(` `);
		throw Error(`No native build was found for ` + w + `
    loaded from: ` + e + `
`);
		function E(e) {
			var t = g(r.join(e, `prebuilds`)).map(y).filter(b(d, u)).sort(x)[0];
			if (t) {
				var n = r.join(e, `prebuilds`, t.name), i = g(n).map(S).filter(C(l, c)).sort(T(l))[0];
				if (i) return r.join(n, i.file);
			}
		}
	};
	function g(e) {
		try {
			return n.readdirSync(e);
		} catch {
			return [];
		}
	}
	function _(e, t) {
		var n = g(e).filter(t);
		return n[0] && r.join(e, n[0]);
	}
	function v(e) {
		return /\.node$/.test(e);
	}
	function y(e) {
		var t = e.split(`-`);
		if (t.length === 2) {
			var n = t[0], r = t[1].split(`+`);
			if (n && r.length && r.every(Boolean)) return {
				name: e,
				platform: n,
				architectures: r
			};
		}
	}
	function b(e, t) {
		return function(n) {
			return n == null || n.platform !== e ? !1 : n.architectures.includes(t);
		};
	}
	function x(e, t) {
		return e.architectures.length - t.architectures.length;
	}
	function S(e) {
		var t = e.split(`.`), n = t.pop(), r = {
			file: e,
			specificity: 0
		};
		if (n === `node`) {
			for (var i = 0; i < t.length; i++) {
				var a = t[i];
				if (a === `node` || a === `electron` || a === `node-webkit`) r.runtime = a;
				else if (a === `napi`) r.napi = !0;
				else if (a.slice(0, 3) === `abi`) r.abi = a.slice(3);
				else if (a.slice(0, 2) === `uv`) r.uv = a.slice(2);
				else if (a.slice(0, 4) === `armv`) r.armv = a.slice(4);
				else if (a === `glibc` || a === `musl`) r.libc = a;
				else continue;
				r.specificity++;
			}
			return r;
		}
	}
	function C(e, t) {
		return function(n) {
			return !(n == null || n.runtime && n.runtime !== e && !w(n) || n.abi && n.abi !== t && !n.napi || n.uv && n.uv !== m || n.armv && n.armv !== p || n.libc && n.libc !== f);
		};
	}
	function w(e) {
		return e.runtime === `node` && e.napi;
	}
	function T(e) {
		return function(t, n) {
			return t.runtime === n.runtime ? t.abi === n.abi ? t.specificity === n.specificity ? 0 : t.specificity > n.specificity ? -1 : 1 : t.abi ? -1 : 1 : t.runtime === e ? -1 : 1;
		};
	}
	function E() {
		return !!(process.versions && process.versions.nw);
	}
	function D() {
		return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < `u` && window.process && window.process.type === `renderer`;
	}
	function O(e) {
		return e === `linux` && n.existsSync(`/etc/alpine-release`);
	}
	h.parseTags = S, h.matchTags = C, h.compareTags = T, h.parseTuple = y, h.matchTuple = b, h.compareTuples = x;
}));
var wn = B(((e, t) => {
	let n = typeof __webpack_require__ == `function` ? __non_webpack_require__ : W;
	t.exports = typeof n.addon == `function` ? n.addon.bind(n) : Cn();
}));
var Tn = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.importAttributesOrAssertions = e.importAttributes = e.importAssertions = void 0;
	var t = r(we());
	function n(e) {
		if (typeof WeakMap != `function`) return null;
		var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
		return (n = function(e) {
			return e ? r : t;
		})(e);
	}
	function r(e, t) {
		if (!t && e && e.__esModule) return e;
		if (e === null || typeof e != `object` && typeof e != `function`) return { default: e };
		var r = n(t);
		if (r && r.has(e)) return r.get(e);
		var i = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var o in e) if (o !== "default" && {}.hasOwnProperty.call(e, o)) {
			var s = a ? Object.getOwnPropertyDescriptor(e, o) : null;
			s && (s.get || s.set) ? Object.defineProperty(i, o, s) : i[o] = e[o];
		}
		return i.default = e, r && r.set(e, i), i;
	}
	let i = `with`, a = `assert`;
	e.importAttributes = o({ keyword: `with` }), e.importAssertions = o({ keyword: `assert` }), e.importAttributesOrAssertions = o({ keyword: `with-assert` });
	function o(e) {
		return function(t) {
			return s(e, t);
		};
	}
	function s(e, n) {
		let { tokTypes: r, TokenType: o } = n.acorn || t, { keyword: s } = e, c = s.includes(i), l = s.includes(a), u = c && l;
		return class extends n {
			constructor(...e) {
				super(...e), this.withToken = c && new o(i), this.assertToken = l && new o(a);
			}
			_codeAt(e) {
				return this.input.charCodeAt(e);
			}
			_eat(e) {
				this.type !== e && this.unexpected(), this.next();
			}
			_matchKeywordToken() {
				return u && (this.type === this.withToken || this.type === this.assertToken) || c && this.type === this.withToken || l && this.type === this.assertToken;
			}
			_getProperty() {
				return u ? this.type === this.withToken ? `attributes` : `assertions` : c ? `attributes` : `assertions`;
			}
			readToken(e) {
				let t = 0, n, r;
				if (u) {
					if (this.input.slice(this.pos, this.pos + 4) === i) n = i, r = this.withToken;
					else if (this.input.slice(this.pos, this.pos + 6) === a) n = a, r = this.assertToken;
					else return super.readToken(e);
					t += n.length;
				} else for (n = c ? i : a, r = c ? this.withToken : this.assertToken; t < n.length; t++) if (this._codeAt(this.pos + t) !== n.charCodeAt(t)) return super.readToken(e);
				for (; this._codeAt(this.pos + t) !== 123; t++) if (this._codeAt(this.pos + t) === 32) continue;
				else return super.readToken(e);
				return this.type.label === `{` ? super.readToken(e) : (this.pos += n.length, this.finishToken(r));
			}
			parseDynamicImport(e) {
				return this.next(), e.source = this.parseMaybeAssign(), this.eat(r.comma) && (e.arguments = [this.parseExpression()]), this._eat(r.parenR), this.finishNode(e, `ImportExpression`);
			}
			parseExport(e, t) {
				if (this.next(), this.eat(r.star)) {
					if (this.options.ecmaVersion >= 11 && (this.eatContextual(`as`) ? (e.exported = this.parseIdent(!0), this.checkExport(t, e.exported.name, this.lastTokStart)) : e.exported = null), this.expectContextual(`from`), this.type !== r.string && this.unexpected(), e.source = this.parseExprAtom(), this._matchKeywordToken()) {
						let t = this._getProperty();
						this.next();
						let n = this.parseImportAttributes();
						n && (e[t] = n);
					}
					return this.semicolon(), this.finishNode(e, `ExportAllDeclaration`);
				}
				if (this.eat(r._default)) {
					this.checkExport(t, `default`, this.lastTokStart);
					var n;
					if (this.type === r._function || (n = this.isAsyncFunction())) {
						var i = this.startNode();
						this.next(), n && this.next(), e.declaration = this.parseFunction(i, 5, !1, n);
					} else if (this.type === r._class) {
						var a = this.startNode();
						e.declaration = this.parseClass(a, `nullableID`);
					} else e.declaration = this.parseMaybeAssign(), this.semicolon();
					return this.finishNode(e, `ExportDefaultDeclaration`);
				}
				if (this.shouldParseExportStatement()) e.declaration = this.parseStatement(null), e.declaration.type === `VariableDeclaration` ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name, e.declaration.id.start), e.specifiers = [], e.source = null;
				else {
					if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual(`from`)) {
						if (this.type !== r.string && this.unexpected(), e.source = this.parseExprAtom(), this._matchKeywordToken()) {
							let t = this._getProperty();
							this.next();
							let n = this.parseImportAttributes();
							n && (e[t] = n);
						}
					} else {
						for (var o = 0, s = e.specifiers; o < s.length; o += 1) {
							var c = s[o];
							this.checkUnreserved(c.local), this.checkLocalExport(c.local);
						}
						e.source = null;
					}
					this.semicolon();
				}
				return this.finishNode(e, `ExportNamedDeclaration`);
			}
			parseImport(e) {
				if (this.next(), this.type === r.string ? (e.specifiers = [], e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual(`from`), e.source = this.type === r.string ? this.parseExprAtom() : this.unexpected()), this._matchKeywordToken()) {
					let t = this._getProperty();
					this.next();
					let n = this.parseImportAttributes();
					n && (e[t] = n);
				}
				return this.semicolon(), this.finishNode(e, `ImportDeclaration`);
			}
			parseImportAttributes() {
				this._eat(r.braceL);
				let e = this.parsewithEntries();
				return this._eat(r.braceR), e;
			}
			parsewithEntries() {
				let e = [], t = /* @__PURE__ */ new Set();
				do {
					if (this.type === r.braceR) break;
					let n = this.startNode(), i;
					i = this.type === r.string ? this.parseLiteral(this.value) : this.parseIdent(!0), this.next(), n.key = i, t.has(n.key.name) && this.raise(this.pos, `Duplicated key in attributes`), t.add(n.key.name), this.type !== r.string && this.raise(this.pos, `Only string is supported as an attribute value`), n.value = this.parseLiteral(this.value), e.push(this.finishNode(n, `ImportAttribute`));
				} while (this.eat(r.comma));
				return e;
			}
		};
	}
}));
var En = B(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.handleWrappers = r;
	let t = ie();
	function n(e) {
		return e.type === `Identifier` && e.name === `undefined` || e.type === `UnaryExpression` && e.operator === `void` && e.argument.type === `Literal` && e.argument.value === 0;
	}
	function r(e) {
		let r;
		if (e.body.length === 1 && e.body[0].type === `ExpressionStatement` && e.body[0].expression.type === `UnaryExpression` && e.body[0].expression.operator === `!` && e.body[0].expression.argument.type === `CallExpression` && e.body[0].expression.argument.callee.type === `FunctionExpression` && e.body[0].expression.argument.arguments.length === 1 ? r = e.body[0].expression.argument : e.body.length === 1 && e.body[0].type === `ExpressionStatement` && e.body[0].expression.type === `CallExpression` && e.body[0].expression.callee.type === `FunctionExpression` && (e.body[0].expression.arguments.length === 1 || e.body[0].expression.arguments.length === 0) ? r = e.body[0].expression : e.body.length === 1 && e.body[0].type === `ExpressionStatement` && e.body[0].expression.type === `AssignmentExpression` && e.body[0].expression.left.type === `MemberExpression` && e.body[0].expression.left.object.type === `Identifier` && e.body[0].expression.left.object.name === `module` && e.body[0].expression.left.property.type === `Identifier` && e.body[0].expression.left.property.name === `exports` && e.body[0].expression.right.type === `CallExpression` && e.body[0].expression.right.callee.type === `FunctionExpression` && e.body[0].expression.right.arguments.length === 1 && (r = e.body[0].expression.right), r) {
			let e, i;
			if (r.arguments[0] && r.arguments[0].type === `ConditionalExpression` && r.arguments[0].test.type === `LogicalExpression` && r.arguments[0].test.operator === `&&` && r.arguments[0].test.left.type === `BinaryExpression` && r.arguments[0].test.left.operator === `===` && r.arguments[0].test.left.left.type === `UnaryExpression` && r.arguments[0].test.left.left.operator === `typeof` && `name` in r.arguments[0].test.left.left.argument && r.arguments[0].test.left.left.argument.name === `define` && r.arguments[0].test.left.right.type === `Literal` && r.arguments[0].test.left.right.value === `function` && r.arguments[0].test.right.type === `MemberExpression` && r.arguments[0].test.right.object.type === `Identifier` && r.arguments[0].test.right.property.type === `Identifier` && r.arguments[0].test.right.property.name === `amd` && r.arguments[0].test.right.computed === !1 && r.arguments[0].alternate.type === `FunctionExpression` && r.arguments[0].alternate.params.length === 1 && r.arguments[0].alternate.params[0].type === `Identifier` && r.arguments[0].alternate.body.body.length === 1 && r.arguments[0].alternate.body.body[0].type === `ExpressionStatement` && r.arguments[0].alternate.body.body[0].expression.type === `AssignmentExpression` && r.arguments[0].alternate.body.body[0].expression.left.type === `MemberExpression` && r.arguments[0].alternate.body.body[0].expression.left.object.type === `Identifier` && r.arguments[0].alternate.body.body[0].expression.left.object.name === `module` && r.arguments[0].alternate.body.body[0].expression.left.property.type === `Identifier` && r.arguments[0].alternate.body.body[0].expression.left.property.name === `exports` && r.arguments[0].alternate.body.body[0].expression.left.computed === !1 && r.arguments[0].alternate.body.body[0].expression.right.type === `CallExpression` && r.arguments[0].alternate.body.body[0].expression.right.callee.type === `Identifier` && r.arguments[0].alternate.body.body[0].expression.right.callee.name === r.arguments[0].alternate.params[0].name && `body` in r.callee && `body` in r.callee.body && Array.isArray(r.callee.body.body) && r.arguments[0].alternate.body.body[0].expression.right.arguments.length === 1 && r.arguments[0].alternate.body.body[0].expression.right.arguments[0].type === `Identifier` && r.arguments[0].alternate.body.body[0].expression.right.arguments[0].name === `require`) {
				let e = r.callee.body.body;
				if (e[0].type === `ExpressionStatement` && e[0].expression.type === `Literal` && e[0].expression.value === `use strict` && (e = e.slice(1)), e.length === 1 && e[0].type === `ExpressionStatement` && e[0].expression.type === `CallExpression` && e[0].expression.callee.type === `Identifier` && e[0].expression.callee.name === r.arguments[0].test.right.object.name && e[0].expression.arguments.length === 1 && e[0].expression.arguments[0].type === `FunctionExpression` && e[0].expression.arguments[0].params.length === 1 && e[0].expression.arguments[0].params[0].type === `Identifier` && e[0].expression.arguments[0].params[0].name === `require`) {
					let t = e[0].expression.arguments[0];
					t.params = [];
					try {
						delete t.scope.declarations.require;
					} catch {}
				}
			} else if (r.arguments[0] && r.arguments[0].type === `FunctionExpression` && r.arguments[0].params.length === 0 && (r.arguments[0].body.body.length === 1 || r.arguments[0].body.body.length === 2 && r.arguments[0].body.body[0].type === `VariableDeclaration` && r.arguments[0].body.body[0].declarations.length === 3 && r.arguments[0].body.body[0].declarations.every((e) => e.init === null && e.id.type === `Identifier`)) && r.arguments[0].body.body[r.arguments[0].body.body.length - 1].type === `ReturnStatement` && (e = r.arguments[0].body.body[r.arguments[0].body.body.length - 1]) && e.argument?.type === `CallExpression` && e.argument.arguments.length && e.argument.arguments.every((e) => e && e.type === `Literal` && typeof e.value == `number`) && e.argument.callee.type === `CallExpression` && (e.argument.callee.callee.type === `FunctionExpression` || e.argument.callee.callee.type === `CallExpression` && e.argument.callee.callee.callee.type === `FunctionExpression` && e.argument.callee.callee.arguments.length === 0) && e.argument.callee.arguments.length === 3 && e.argument.callee.arguments[0].type === `ObjectExpression` && e.argument.callee.arguments[1].type === `ObjectExpression` && e.argument.callee.arguments[2].type === `ArrayExpression`) {
				let t = e.argument.callee.arguments[0].properties, r = {};
				if (t.every((e) => {
					if (e.type !== `Property` || e.computed !== !1 || e.key.type !== `Literal` || typeof e.key.value != `number` || e.value.type !== `ArrayExpression` || e.value.elements.length !== 2 || !e.value.elements[0] || !e.value.elements[1] || e.value.elements[0].type !== `FunctionExpression` || e.value.elements[1].type !== `ObjectExpression`) return !1;
					let t = e.value.elements[1].properties;
					for (let e of t) {
						if (e.type !== `Property` || e.value.type !== `Identifier` && e.value.type !== `Literal` && !n(e.value) || !(e.key.type === `Literal` && typeof e.key.value == `string` || e.key.type === `Identifier`) || e.computed) return !1;
						n(e.value) && (e.key.type === `Identifier` ? r[e.key.name] = {
							type: `Literal`,
							start: e.key.start,
							end: e.key.end,
							value: e.key.name,
							raw: JSON.stringify(e.key.name)
						} : e.key.type === `Literal` && (r[String(e.key.value)] = e.key));
					}
					return !0;
				})) {
					let t = Object.keys(r), n = e.argument.callee.arguments[1];
					n.properties = t.map((e) => ({
						type: `Property`,
						method: !1,
						shorthand: !1,
						computed: !1,
						kind: `init`,
						key: r[e],
						value: {
							type: `ObjectExpression`,
							properties: [{
								type: `Property`,
								kind: `init`,
								method: !1,
								shorthand: !1,
								computed: !1,
								key: {
									type: `Identifier`,
									name: `exports`
								},
								value: {
									type: `CallExpression`,
									optional: !1,
									callee: {
										type: `Identifier`,
										name: `require`
									},
									arguments: [r[e]]
								}
							}]
						}
					}));
				}
			} else if (r.arguments[0] && r.arguments[0].type === `FunctionExpression` && r.arguments[0].params.length === 2 && r.arguments[0].params[0].type === `Identifier` && r.arguments[0].params[1].type === `Identifier` && `body` in r.callee && `body` in r.callee.body && Array.isArray(r.callee.body.body) && r.callee.body.body.length === 1) {
				let e = r.callee.body.body[0];
				if (e.type === `IfStatement` && e.test.type === `LogicalExpression` && e.test.operator === `&&` && e.test.left.type === `BinaryExpression` && e.test.left.left.type === `UnaryExpression` && e.test.left.left.operator === `typeof` && e.test.left.left.argument.type === `Identifier` && e.test.left.left.argument.name === `module` && e.test.left.right.type === `Literal` && e.test.left.right.value === `object` && e.test.right.type === `BinaryExpression` && e.test.right.left.type === `UnaryExpression` && e.test.right.left.operator === `typeof` && e.test.right.left.argument.type === `MemberExpression` && e.test.right.left.argument.object.type === `Identifier` && e.test.right.left.argument.object.name === `module` && e.test.right.left.argument.property.type === `Identifier` && e.test.right.left.argument.property.name === `exports` && e.test.right.right.type === `Literal` && e.test.right.right.value === `object` && e.consequent.type === `BlockStatement` && e.consequent.body.length > 0) {
					let t;
					if (e.consequent.body[0].type === `VariableDeclaration` && e.consequent.body[0].declarations[0].init && e.consequent.body[0].declarations[0].init.type === `CallExpression` ? t = e.consequent.body[0].declarations[0].init : e.consequent.body[0].type === `ExpressionStatement` && e.consequent.body[0].expression.type === `CallExpression` ? t = e.consequent.body[0].expression : e.consequent.body[0].type === `ExpressionStatement` && e.consequent.body[0].expression.type === `AssignmentExpression` && e.consequent.body[0].expression.operator === `=` && e.consequent.body[0].expression.right.type === `CallExpression` && (t = e.consequent.body[0].expression.right), t && t.callee.type === `Identifier` && `params` in r.callee && r.callee.params.length > 0 && `name` in r.callee.params[0] && t.callee.name === r.callee.params[0].name && t.arguments.length === 2 && t.arguments[0].type === `Identifier` && t.arguments[0].name === `require` && t.arguments[1].type === `Identifier` && t.arguments[1].name === `exports`) {
						let e = r.arguments[0];
						e.params = [];
						try {
							let t = e.scope;
							delete t.declarations.require, delete t.declarations.exports;
						} catch {}
					}
				}
			} else if (r.callee.type === `FunctionExpression` && r.callee.body.body.length > 2 && r.callee.body.body[0].type === `VariableDeclaration` && r.callee.body.body[0].declarations.length === 1 && r.callee.body.body[0].declarations[0].type === `VariableDeclarator` && r.callee.body.body[0].declarations[0].id.type === `Identifier` && r.callee.body.body[0].declarations[0].init && (r.callee.body.body[0].declarations[0].init.type === `ObjectExpression` && r.callee.body.body[0].declarations[0].init.properties.length === 0 || r.callee.body.body[0].declarations[0].init.type === `CallExpression` && r.callee.body.body[0].declarations[0].init.arguments.length === 1) && (r.callee.body.body[1] && r.callee.body.body[1].type === `FunctionDeclaration` && r.callee.body.body[1].params.length === 1 && r.callee.body.body[1].body.body.length >= 3 || r.callee.body.body[2] && r.callee.body.body[2].type === `FunctionDeclaration` && r.callee.body.body[2].params.length === 1 && r.callee.body.body[2].body.body.length >= 3) && r.arguments[0] && (r.arguments[0].type === `ArrayExpression` && (i = r.arguments[0]) && r.arguments[0].elements.length > 0 && r.arguments[0].elements.every((e) => e && e.type === `FunctionExpression`) || r.arguments[0].type === `ObjectExpression` && (i = r.arguments[0]) && r.arguments[0].properties && r.arguments[0].properties.length > 0 && r.arguments[0].properties.every((e) => e && e.type === `Property` && !e.computed && e.key && e.key.type === `Literal` && (typeof e.key.value == `string` || typeof e.key.value == `number`) && e.value && e.value.type === `FunctionExpression`)) || r.arguments.length === 0 && r.callee.type === `FunctionExpression` && r.callee.params.length === 0 && r.callee.body.type === `BlockStatement` && r.callee.body.body.length > 5 && r.callee.body.body[0].type === `VariableDeclaration` && r.callee.body.body[0].declarations.length === 1 && r.callee.body.body[0].declarations[0].id.type === `Identifier` && r.callee.body.body[1].type === `ExpressionStatement` && r.callee.body.body[1].expression.type === `AssignmentExpression` && r.callee.body.body[2].type === `ExpressionStatement` && r.callee.body.body[2].expression.type === `AssignmentExpression` && r.callee.body.body[3].type === `ExpressionStatement` && r.callee.body.body[3].expression.type === `AssignmentExpression` && r.callee.body.body[3].expression.left.type === `MemberExpression` && r.callee.body.body[3].expression.left.object.type === `Identifier` && r.callee.body.body[3].expression.left.object.name === r.callee.body.body[0].declarations[0].id.name && r.callee.body.body[3].expression.left.property.type === `Identifier` && r.callee.body.body[3].expression.left.property.name === `modules` && r.callee.body.body[3].expression.right.type === `ObjectExpression` && r.callee.body.body[3].expression.right.properties.every((e) => e && e.type === `Property` && !e.computed && e.key && e.key.type === `Literal` && (typeof e.key.value == `string` || typeof e.key.value == `number`) && e.value && e.value.type === `FunctionExpression`) && (i = r.callee.body.body[3].expression.right) && (r.callee.body.body[4].type === `VariableDeclaration` && r.callee.body.body[4].declarations.length === 1 && r.callee.body.body[4].declarations[0].init && r.callee.body.body[4].declarations[0].init.type === `CallExpression` && r.callee.body.body[4].declarations[0].init.callee.type === `Identifier` && r.callee.body.body[4].declarations[0].init.callee.name === `require` || r.callee.body.body[5].type === `VariableDeclaration` && r.callee.body.body[5].declarations.length === 1 && r.callee.body.body[5].declarations[0].init && r.callee.body.body[5].declarations[0].init.type === `CallExpression` && r.callee.body.body[5].declarations[0].init.callee.type === `Identifier` && r.callee.body.body[5].declarations[0].init.callee.name === `require`)) {
				let e = /* @__PURE__ */ new Map(), n;
				n = i.type === `ArrayExpression` ? i.elements.filter((e) => e?.type === `FunctionExpression`).map((e, t) => [String(t), e]) : i.properties.map((e) => [String(e.key.value), e.value]);
				for (let [t, r] of n) {
					let n = r.body.body.length === 1 ? r.body.body[0] : (r.body.body.length === 2 || r.body.body.length === 3 && r.body.body[2].type === `EmptyStatement`) && r.body.body[0].type === `ExpressionStatement` && r.body.body[0].expression.type === `Literal` && r.body.body[0].expression.value === `use strict` ? r.body.body[1] : null;
					n && n.type === `ExpressionStatement` && n.expression.type === `AssignmentExpression` && n.expression.operator === `=` && n.expression.left.type === `MemberExpression` && n.expression.left.object.type === `Identifier` && `params` in r && r.params.length > 0 && `name` in r.params[0] && n.expression.left.object.name === r.params[0].name && n.expression.left.property.type === `Identifier` && n.expression.left.property.name === `exports` && n.expression.right.type === `CallExpression` && n.expression.right.callee.type === `Identifier` && n.expression.right.callee.name === `require` && n.expression.right.arguments.length === 1 && n.expression.right.arguments[0].type === `Literal` && e.set(t, n.expression.right.arguments[0].value);
				}
				for (let [, r] of n) if (`params` in r && r.params.length === 3 && r.params[2].type === `Identifier`) {
					let n = /* @__PURE__ */ new Map();
					(0, t.walk)(r.body, { enter(t, i) {
						let a = t, o = i;
						if (a.type === `CallExpression` && a.callee.type === `Identifier` && `name` in r.params[2] && a.callee.name === r.params[2].name && a.arguments.length === 1 && a.arguments[0].type === `Literal`) {
							let t = e.get(String(a.arguments[0].value));
							if (t) {
								let e = {
									type: `CallExpression`,
									optional: !1,
									callee: {
										type: `Identifier`,
										name: `require`
									},
									arguments: [{
										type: `Literal`,
										value: t
									}]
								}, r = o;
								`right` in r && r.right === a ? r.right = e : `left` in r && r.left === a ? r.left = e : `object` in r && r.object === a ? r.object = e : `callee` in r && r.callee === a ? r.callee = e : `arguments` in r && r.arguments.some((e) => e === a) ? r.arguments = r.arguments.map((t) => t === a ? e : t) : `init` in r && r.init === a && (r.type === `VariableDeclarator` && r.id.type === `Identifier` && n.set(r.id.name, t), r.init = e);
							}
						} else if (a.type === `CallExpression` && a.callee.type === `MemberExpression` && a.callee.object.type === `Identifier` && `name` in r.params[2] && a.callee.object.name === r.params[2].name && a.callee.property.type === `Identifier` && a.callee.property.name === `n` && a.arguments.length === 1 && a.arguments[0].type === `Identifier` && o && `init` in o && o.init === a) {
							let e = a.arguments[0];
							o.init = {
								type: `CallExpression`,
								optional: !1,
								callee: {
									type: `MemberExpression`,
									computed: !1,
									optional: !1,
									object: {
										type: `Identifier`,
										name: `Object`
									},
									property: {
										type: `Identifier`,
										name: `assign`
									}
								},
								arguments: [{
									type: `ArrowFunctionExpression`,
									expression: !0,
									params: [],
									body: e
								}, {
									type: `ObjectExpression`,
									properties: [{
										type: `Property`,
										kind: `init`,
										method: !1,
										computed: !1,
										shorthand: !1,
										key: {
											type: `Identifier`,
											name: `a`
										},
										value: e
									}]
								}]
							};
						}
					} });
				}
			}
		}
	}
}));
var Dn = B(((e, t) => {
	let n = W(`path`), r = W(`module`), i = W(`fs`), a = (e, t, a) => {
		if (typeof e != `string`) throw TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof e}\``);
		if (typeof t != `string`) throw TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof t}\``);
		try {
			e = i.realpathSync(e);
		} catch (t) {
			if (t.code === `ENOENT`) e = n.resolve(e);
			else if (a) return;
			else throw t;
		}
		let o = n.join(e, `noop.js`), s = () => r._resolveFilename(t, {
			id: o,
			filename: o,
			paths: r._nodeModulePaths(e)
		});
		if (a) try {
			return s();
		} catch {
			return;
		}
		return s();
	};
	t.exports = (e, t) => a(e, t), t.exports.silent = (e, t) => a(e, t, !0);
}));
var On = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = q;
	let n = t(W(`path`)), r = ie(), i = ce(), a = Ce(), o = we(), s = t(Ee()), c = De(), l = (fn(), U(un)), u = pn(), d = vn(), f = yn(), p = t(Sn()), m = t(xn()), h = t(wn()), g = t(xe()), _ = W(`url`), v = o.Parser.extend(Tn().importAttributesOrAssertions), y = t(W(`os`)), b = t(W(`url`)), x = En(), S = t(Dn()), C = {
		cwd: () => H,
		env: {
			NODE_ENV: a.UNKNOWN,
			[a.UNKNOWN]: !0
		},
		[a.UNKNOWN]: !0
	}, w = Symbol(), T = Symbol(), E = Symbol(), D = Symbol(), O = Symbol(), ee = Symbol(), k = Symbol(), A = Symbol(), j = Symbol(), M = Symbol(), te = Symbol(), N = {
		access: A,
		accessSync: A,
		createReadStream: A,
		exists: A,
		existsSync: A,
		fstat: A,
		fstatSync: A,
		lstat: A,
		lstatSync: A,
		open: A,
		readdir: j,
		readdirSync: j,
		readFile: A,
		readFileSync: A,
		stat: A,
		statSync: A
	}, P = {
		...N,
		pathExists: A,
		pathExistsSync: A,
		readJson: A,
		readJSON: A,
		readJsonSync: A,
		readJSONSync: A
	}, F = Symbol(), I = Symbol(), L = {
		register: F,
		createRequire: I
	}, ne = Object.assign(Object.create(null), {
		bindings: { default: M },
		express: { default: function() {
			return {
				[a.UNKNOWN]: !0,
				set: w,
				engine: T
			};
		} },
		fs: {
			default: N,
			...N
		},
		module: {
			default: L,
			...L
		},
		"fs-extra": {
			default: P,
			...P
		},
		"graceful-fs": {
			default: N,
			...N
		},
		process: {
			default: C,
			...C
		},
		path: { default: {} },
		os: {
			default: y.default,
			...y.default
		},
		url: {
			default: b.default,
			...b.default
		},
		"@mapbox/node-pre-gyp": {
			default: g.default,
			...g.default
		},
		"node-pre-gyp": d.pregyp,
		"node-pre-gyp/lib/pre-binding": d.pregyp,
		"node-pre-gyp/lib/pre-binding.js": d.pregyp,
		"node-gyp-build": { default: te },
		"@aminya/node-gyp-build": { default: te },
		nbind: {
			init: E,
			default: { init: E }
		},
		"resolve-from": { default: S.default },
		"strong-globalize": {
			default: { SetRootDir: D },
			SetRootDir: D
		},
		pkginfo: { default: k },
		pino: {
			default: {
				[a.UNKNOWN]: !0,
				transport: O
			},
			transport: O
		},
		fastify: { default: ee }
	}), R = {
		_interopRequireDefault: f.normalizeDefaultRequire,
		_interopRequireWildcard: f.normalizeWildcardRequire,
		__importDefault: f.normalizeDefaultRequire,
		__importStar: f.normalizeWildcardRequire,
		MONGOOSE_DRIVER_PATH: void 0,
		URL: _.URL,
		Object: { assign: Object.assign }
	};
	R.global = R.GLOBAL = R.globalThis = R;
	let z = Symbol();
	d.pregyp.find[z] = !0;
	let B = ne.path;
	Object.keys(n.default).forEach((e) => {
		let t = n.default[e];
		if (typeof t == `function`) {
			let n = function e() {
				return t.apply(e, arguments);
			};
			n[z] = !0, B[e] = B.default[e] = n;
		} else B[e] = B.default[e] = t;
	}), B.resolve = B.default.resolve = function(...e) {
		return n.default.resolve.apply(this, [H, ...e]);
	}, B.resolve[z] = !0;
	let V = /* @__PURE__ */ new Set([
		`.h`,
		`.cmake`,
		`.c`,
		`.cpp`
	]), re = /* @__PURE__ */ new Set([
		`CHANGELOG.md`,
		`README.md`,
		`readme.md`,
		`changelog.md`
	]), H, ae = /^\/[^\/]+|^[a-z]:[\\/][^\\/]+/i;
	function G(e) {
		if (e instanceof _.URL) return e.protocol === `file:`;
		if (typeof e == `string`) {
			if (e.startsWith(`file:`)) try {
				return new _.URL(e), !0;
			} catch {
				return !1;
			}
			return ae.test(e);
		}
		return !1;
	}
	let K = Symbol(), oe = /([\/\\]\*\*[\/\\]\*)+/g;
	async function se(e, t) {
		for (let n of e.properties) if (n.type === `Property` && !n.computed && n.key.type === `Identifier`) {
			if (n.key.name === `target` && n.value.type === `Literal`) await t(n.value);
			else if ((n.key.name === `targets` || n.key.name === `pipeline`) && n.value.type === `ArrayExpression`) {
				for (let e of n.value.elements) if (e && e.type === `ObjectExpression`) for (let n of e.properties) n.type === `Property` && !n.computed && n.key.type === `Identifier` && n.key.name === `target` && n.value.type === `Literal` && await t(n.value);
			}
		}
	}
	async function q(e, t, o) {
		let f = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), b = n.default.dirname(e);
		H = o.cwd;
		let N = (0, u.getPackageBase)(e), P = (e) => {
			if (!o.analysis.emitGlobs) return;
			e = e.replaceAll(n.default.sep, n.default.posix.sep);
			let t = e.indexOf(a.WILDCARD), r = t === -1 ? e.length : e.lastIndexOf(n.default.posix.sep, t), i = e.substring(0, r), s = e.slice(r), c = s.replace(a.wildcardRegEx, (e, t) => s[t - 1] === n.default.posix.sep ? `**/*` : `*`).replace(oe, `/**/*`) || `/**/*`;
			o.ignoreFn(n.default.relative(o.base, i + c)) || (L = L.then(async () => {
				o.log && console.log(`Globbing ` + i + c), (await (0, l.glob)([i, c], {
					mark: !0,
					ignore: i + `/**/node_modules/**/*`,
					dot: !0,
					nodir: !0
				})).filter((e) => !V.has(n.default.extname(e)) && !re.has(n.default.basename(e))).forEach((e) => f.add(e));
			}));
		}, L = Promise.resolve();
		t = t.replace(/^#![^\n\r]*[\r\n]/, ``);
		let B, U = !1;
		try {
			B = v.parse(t, {
				ecmaVersion: `latest`,
				allowReturnOutsideFunction: !0
			}), U = !1;
		} catch (t) {
			t && t.message && t.message.includes(`sourceType: module`) || o.warnings.add(Error(`Failed to parse ${e} as script:\n${t && t.message}`));
		}
		if (!B) try {
			B = v.parse(t, {
				ecmaVersion: `latest`,
				sourceType: `module`,
				allowAwaitOutsideFunction: !0
			}), U = !0;
		} catch (t) {
			return o.warnings.add(Error(`Failed to parse ${e} as module:\n${t && t.message}`)), {
				assets: f,
				deps: g,
				imports: y,
				isESM: !1
			};
		}
		let ie = (0, _.pathToFileURL)(e).href, q = Object.assign(Object.create(null), {
			__dirname: {
				shadowDepth: 0,
				value: { value: n.default.resolve(e, `..`) }
			},
			__filename: {
				shadowDepth: 0,
				value: { value: e }
			},
			process: {
				shadowDepth: 0,
				value: { value: C }
			}
		});
		(!U || o.mixedModules) && (q.require = {
			shadowDepth: 0,
			value: { value: {
				[a.FUNCTION](e) {
					return g.add(e), ne[e.startsWith(`node:`) ? e.slice(5) : e].default;
				},
				resolve(t) {
					return (0, m.default)(t, e, o);
				}
			} }
		}, q.require.value.value.resolve[z] = !0);
		function ce(e, t) {
			e === `require` && `value` in t && t.value !== K || (q[e] = {
				shadowDepth: 0,
				value: t
			});
		}
		function ue(e) {
			let t = q[e];
			if (t && t.shadowDepth === 0) return t.value;
		}
		function de(e) {
			let t = q[e];
			return t && t.shadowDepth === 0;
		}
		if ((U || o.mixedModules) && le(B)) for (let e of B.body) if (e.type === `ImportDeclaration`) {
			let t = String(e.source.value);
			g.add(t);
			let n = ne[t.startsWith(`node:`) ? t.slice(5) : t];
			if (n) for (let t of e.specifiers) t.type === `ImportNamespaceSpecifier` ? ce(t.local.name, { value: n }) : t.type === `ImportDefaultSpecifier` && `default` in n ? ce(t.local.name, { value: n.default }) : t.type === `ImportSpecifier` && t.imported.name in n && ce(t.local.name, { value: n[t.imported.name] });
		} else (e.type === `ExportNamedDeclaration` || e.type === `ExportAllDeclaration`) && e.source && g.add(String(e.source.value));
		async function fe(e, t = !0) {
			let n = Object.create(null);
			return Object.keys(R).forEach((e) => {
				n[e] = { value: R[e] };
			}), Object.keys(q).forEach((e) => {
				n[e] = ue(e);
			}), n[`import.meta`] = { url: ie }, await (0, a.evaluate)(e, n, t);
		}
		let pe, J, me = !1;
		function he(e) {
			if (!o.analysis.emitGlobs || !e.startsWith(`./`) && !e.startsWith(`../`)) return;
			e = n.default.resolve(b, e).replaceAll(n.default.sep, n.default.posix.sep);
			let t = e.indexOf(a.WILDCARD), r = t === -1 ? e.length : e.lastIndexOf(n.default.posix.sep, t), i = e.substring(0, r), s = e.slice(r), c = s.replace(a.wildcardRegEx, (e, t) => s[t - 1] === n.default.posix.sep ? `**/*` : `*`) || `/**/*`;
			c.endsWith(`*`) || (c += `?(` + (o.ts ? `.ts|.tsx|` : ``) + `.js|.json|.node)`), !o.ignoreFn(n.default.relative(o.base, i + c)) && (L = L.then(async () => {
				o.log && console.log(`Globbing ` + i + c), (await (0, l.glob)([i, c], {
					mark: !0,
					ignore: i + `/**/node_modules/**/*`,
					nodir: !0
				})).filter((e) => !V.has(n.default.extname(e)) && !re.has(n.default.basename(e))).forEach((e) => g.add(e));
			}));
		}
		async function ge(e, t = !1) {
			if (e.type === `ConditionalExpression`) {
				await ge(e.consequent, t), await ge(e.alternate, t);
				return;
			}
			if (e.type === `LogicalExpression`) {
				await ge(e.left, t), await ge(e.right, t);
				return;
			}
			let n = await fe(e, !0);
			if (!n) return;
			function r(e) {
				(t ? y : g).add(e);
			}
			`value` in n && typeof n.value == `string` ? n.wildcards ? n.wildcards.length >= 1 && he(n.value) : r(n.value) : (`ifTrue` in n && typeof n.ifTrue == `string` && r(n.ifTrue), `else` in n && typeof n.else == `string` && r(n.else));
		}
		let _e = (0, i.attachScopes)(B, `scope`);
		le(B) && ((0, x.handleWrappers)(B), await (0, p.default)({
			id: e,
			ast: B,
			emitDependency: (e) => g.add(e),
			emitAsset: (e) => f.add(e),
			emitAssetDirectory: P,
			job: o
		}));
		async function ve(e, t) {
			if (!pe) throw Error(`Internal error: No staticChildNode for backtrack.`);
			let n = await fe(e, !0);
			n && (`value` in n && typeof n.value != `symbol` || `ifTrue` in n && typeof n.ifTrue != `symbol` && typeof n.else != `symbol`) ? (J = n, pe = e, t && t.skip()) : await xe();
		}
		return await (0, r.asyncWalk)(B, {
			async enter(t, r) {
				let i = t, a = r;
				if (i.scope) {
					_e = i.scope;
					for (let e in i.scope.declarations) e in q && q[e].shadowDepth++;
				}
				if (!pe && a) {
					if (i.type === `Identifier`) {
						if ((0, c.isIdentifierRead)(i, a) && o.analysis.computeFileReferences) {
							let e;
							(typeof (e = ue(i.name)?.value) == `string` && e.match(ae) || e && (typeof e == `function` || typeof e == `object`) && e[z]) && (J = { value: typeof e == `string` ? e : void 0 }, pe = i, await ve(a, this));
						}
					} else if (o.analysis.computeFileReferences && i.type === `MemberExpression` && i.object.type === `MetaProperty` && i.object.meta.name === `import` && i.object.property.name === `meta` && (i.property.computed ? i.property.value : i.property.name) === `url`) J = { value: ie }, pe = i, await ve(a, this);
					else if (i.type === `ImportExpression`) {
						await ge(i.source, !0);
						return;
					} else if (i.type === `CallExpression`) {
						if ((!U || o.mixedModules) && i.callee.type === `Identifier` && i.arguments.length) {
							if (i.callee.name === `require` && q.require && q.require.shadowDepth === 0) {
								await ge(i.arguments[0]);
								return;
							}
						} else if ((!U || o.mixedModules) && i.callee.type === `MemberExpression` && i.callee.object.type === `Identifier` && i.callee.object.name === `module` && !(`module` in q) && i.callee.property.type === `Identifier` && !i.callee.computed && i.callee.property.name === `require` && i.arguments.length) {
							await ge(i.arguments[0]);
							return;
						} else if ((!U || o.mixedModules) && i.callee.type === `MemberExpression` && i.callee.object.type === `Identifier` && i.callee.object.name === `require` && q.require && q.require.shadowDepth === 0 && i.callee.property.type === `Identifier` && !i.callee.computed && i.callee.property.name === `resolve` && i.arguments.length) {
							await ge(i.arguments[0]);
							return;
						}
						let t = o.analysis.evaluatePureExpressions && await fe(i.callee, !1);
						if (t && `value` in t && typeof t.value == `function` && t.value[z] && o.analysis.computeFileReferences) J = await fe(i, !0), J && a && (pe = i, await ve(a, this));
						else if (t && `value` in t && typeof t.value == `symbol`) switch (t.value) {
							case K:
								i.arguments.length !== 1 || i.arguments[0].type !== `Literal` || i.callee.type !== `Identifier` || q.require && q.require.shadowDepth !== 0 || await ge(i.arguments[0]);
								break;
							case M:
								if (i.arguments.length) {
									let e = await fe(i.arguments[0], !1);
									if (e && `value` in e && e.value) {
										let t;
										typeof e.value == `object` ? t = e.value : typeof e.value == `string` && (t = { bindings: e.value }), t.path || (t.path = !0), t.module_root = N;
										let n;
										try {
											n = (0, s.default)(t);
										} catch {}
										n && (J = { value: n }, pe = i, await xe());
									}
								}
								break;
							case te:
								if (i.arguments.length) {
									let e = await fe(i.arguments[0], !1);
									if (e && `value` in e && e.value) {
										let t = e.value, n;
										try {
											let e = i?.callee?.arguments?.[0]?.value || `node-gyp-build`;
											n = W((0, S.default)(t, e)).path(t);
										} catch {
											try {
												n = h.default.path(t);
											} catch {}
										}
										n && (J = { value: n }, pe = i, await xe());
									}
								}
								break;
							case E:
								if (i.arguments.length) {
									let e = await fe(i.arguments[0], !1);
									if (e && `value` in e && (typeof e.value == `string` || e.value === void 0)) {
										let t = (0, d.nbind)(e.value);
										if (t && t.path) return g.add(n.default.relative(b, t.path).replace(/\\/g, `/`)), this.skip();
									}
								}
								break;
							case w:
								if (i.arguments.length === 2 && i.arguments[0].type === `Literal` && i.arguments[0].value === `view engine` && !me) return await ge(i.arguments[1]), this.skip();
								break;
							case T:
								me = !0;
								break;
							case O:
								if (i.arguments.length >= 1 && i.arguments[0].type === `ObjectExpression`) return await se(i.arguments[0], ge), this.skip();
								break;
							case ee:
								if (i.arguments.length >= 1 && i.arguments[0].type === `ObjectExpression`) {
									for (let e of i.arguments[0].properties) if (e.type === `Property` && !e.computed && e.key.type === `Identifier` && e.key.name === `logger` && e.value.type === `ObjectExpression`) for (let t of e.value.properties) t.type === `Property` && !t.computed && t.key.type === `Identifier` && t.key.name === `transport` && t.value.type === `ObjectExpression` && await se(t.value, ge);
								}
								break;
							case A:
							case j:
								if (i.arguments[0] && o.analysis.computeFileReferences && (J = await fe(i.arguments[0], !0), J)) return pe = i.arguments[0], t.value === j && i.arguments[0].type === `Identifier` && i.arguments[0].name === `__dirname` ? P(b) : await ve(a, this), this.skip();
								break;
							case D:
								if (i.arguments[0]) {
									let e = await fe(i.arguments[0], !1);
									return e && `value` in e && e.value && P(e.value + `/intl`), this.skip();
								}
								break;
							case k:
								let r = n.default.resolve(e, `../package.json`), c = n.default.resolve(`/package.json`);
								for (; r !== c && await o.stat(r) === null;) r = n.default.resolve(r, `../../package.json`);
								r !== c && f.add(r);
								break;
							case F: if (i.arguments.length && i.arguments[0].type === `Literal`) {
								let e = i.arguments[0].value;
								if (e.startsWith(`.`)) {
									let t = i.arguments.length > 1 ? await fe(i.arguments[1]) : void 0;
									if (t && `value` in t) {
										let r = t.value instanceof _.URL ? t.value.href : typeof t.value == `string` ? t.value : t.value.parentURL, i = new _.URL(e, r).href, a = ie.slice(0, ie.lastIndexOf(`/`)), o = n.default.relative(a, i), s = o.startsWith(`.`) ? o : `./` + o;
										y.add(s);
									}
								} else y.add(e);
							}
						}
						else if (t && `value` in t && typeof t.value == `object` && t.value !== null && t.value.transport === O && i.arguments.length >= 1 && i.arguments[0].type === `ObjectExpression`) for (let e of i.arguments[0].properties) e.type === `Property` && !e.computed && e.key.type === `Identifier` && e.key.name === `transport` && e.value.type === `ObjectExpression` && await se(e.value, ge);
					} else if (i.type === `VariableDeclaration` && a && !(0, c.isVarLoop)(a) && o.analysis.evaluatePureExpressions) for (let e of i.declarations) {
						if (!e.init) continue;
						let t = await fe(e.init, !0);
						if (t) {
							if (e.id.type === `Identifier`) ce(e.id.name, t);
							else if (e.id.type === `ObjectPattern` && `value` in t) for (let n of e.id.properties) n.type === `Property` && n.key.type === `Identifier` && n.value.type === `Identifier` && typeof t.value == `object` && t.value !== null && n.key.name in t.value && ce(n.value.name, { value: t.value[n.key.name] });
							!(`value` in t) && G(t.ifTrue) && G(t.else) && (J = t, pe = e.init, await xe());
						}
					}
					else if (i.type === `AssignmentExpression` && a && !(0, c.isLoop)(a) && o.analysis.evaluatePureExpressions) {
						if (!de(i.left.name)) {
							let e = await fe(i.right, !1);
							if (e && `value` in e) {
								if (i.left.type === `Identifier`) ce(i.left.name, e);
								else if (i.left.type === `ObjectPattern`) for (let t of i.left.properties) t.type === `Property` && t.key.type === `Identifier` && t.value.type === `Identifier` && typeof e.value == `object` && e.value !== null && t.key.name in e.value && ce(t.value.name, { value: e.value[t.key.name] });
								G(e.value) && (J = e, pe = i.right, await xe());
							}
						}
					} else if ((!U || o.mixedModules) && (i.type === `FunctionDeclaration` || i.type === `FunctionExpression` || i.type === `ArrowFunctionExpression`) && (i.arguments || i.params)[0] && (i.arguments || i.params)[0].type === `Identifier`) {
						let e, t;
						if ((i.type === `ArrowFunctionExpression` || i.type === `FunctionExpression`) && a && a.type === `VariableDeclarator` && a.id.type === `Identifier` ? (e = a.id, t = i.arguments || i.params) : i.id && (e = i.id, t = i.arguments || i.params), e && i.body.body) {
							let n, r = !1;
							for (let e = 0; e < i.body.body.length; e++) if (i.body.body[e].type === `VariableDeclaration` && !n && (n = i.body.body[e].declarations.find((e) => e && e.id && e.id.type === `Identifier` && e.init && e.init.type === `CallExpression` && e.init.callee.type === `Identifier` && e.init.callee.name === `require` && q.require.shadowDepth === 0 && e.init.arguments[0] && e.init.arguments[0].type === `Identifier` && e.init.arguments[0].name === t[0].name)), n && i.body.body[e].type === `ReturnStatement` && i.body.body[e].argument && i.body.body[e].argument.type === `Identifier` && i.body.body[e].argument.name === n.id.name) {
								r = !0;
								break;
							}
							r && ce(e.name, { value: K });
						}
					}
					if (i.type === `CallExpression` && i.callee.type === `MemberExpression` && i.callee.object.type === `Identifier` && i.callee.object.name === `module` && i.callee.property.type === `Identifier` && i.callee.property.name === `createRequire` && a.type === `VariableDeclarator` && a.id.type === `Identifier`) {
						let e = a.id.name;
						ce(e, { value: K });
					}
					if (i.type === `CallExpression` && i.callee.type === `Identifier` && i.callee.name === `createRequire`) {
						let e = ue(`createRequire`);
						if (e && `value` in e && e.value === I && a.type === `VariableDeclarator` && a.id.type === `Identifier`) {
							let e = a.id.name;
							ce(e, { value: K });
						}
					}
				}
			},
			async leave(e, t) {
				let n = e, r = t;
				if (n.scope) {
					_e.parent && (_e = _e.parent);
					for (let e in n.scope.declarations) e in q && (q[e].shadowDepth > 0 ? q[e].shadowDepth-- : delete q[e]);
				}
				pe && r && await ve(r, this);
			}
		}), await L, {
			assets: f,
			deps: g,
			imports: y,
			isESM: U
		};
		async function Y(t) {
			let r = t.indexOf(a.WILDCARD), i = r === -1 ? t.length : t.lastIndexOf(n.default.sep, r), s = t.substring(0, i);
			try {
				var c = await o.stat(s);
				if (c === null) throw Error(`file not found`);
			} catch {
				return;
			}
			if (!(r !== -1 && c.isFile())) {
				if (N) {
					let r = e.substring(0, e.indexOf(n.default.sep + `node_modules`)) + n.default.sep + `node_modules` + n.default.sep;
					if (!t.startsWith(r)) {
						o.log && console.log(`Skipping asset emission of ` + t + ` for ` + e + ` as it is outside the package base ` + N);
						return;
					}
				}
				if (c.isFile()) {
					if (o.ignoreFn(n.default.relative(o.base, t))) return;
					f.add(t);
				} else if (c.isDirectory()) {
					if (o.ignoreFn(n.default.relative(o.base, t))) return;
					ye(t) && P(t);
				}
			}
		}
		function ye(t) {
			let r = ``;
			if (t.endsWith(n.default.sep) ? r = n.default.sep : t.endsWith(n.default.sep + a.WILDCARD) ? r = n.default.sep + a.WILDCARD : t.endsWith(a.WILDCARD) && (r = a.WILDCARD), t === b + r || t === H + r || t.endsWith(n.default.sep + `node_modules` + r) || b.startsWith(t.slice(0, t.length - r.length) + n.default.sep)) return !1;
			if (N) {
				let r = e.substring(0, e.indexOf(n.default.sep + `node_modules`)) + n.default.sep + `node_modules` + n.default.sep;
				if (!t.startsWith(r)) return o.log && console.log(`Skipping asset emission of ` + t.replace(a.wildcardRegEx, `*`) + ` for ` + e + ` as it is outside the package base ` + N), !1;
			}
			return !0;
		}
		function be(e) {
			return e instanceof _.URL ? (0, _.fileURLToPath)(e) : e.startsWith(`file:`) ? (0, _.fileURLToPath)(new _.URL(e)) : n.default.resolve(e);
		}
		async function xe() {
			if (J) {
				if (`value` in J && G(J.value)) try {
					await Y(be(J.value));
				} catch {}
				else if (`ifTrue` in J && `else` in J && G(J.ifTrue) && G(J.else)) {
					let e;
					try {
						e = be(J.ifTrue);
					} catch {}
					let t;
					try {
						t = be(J.else);
					} catch {}
					e && await Y(e), t && await Y(t);
				} else if (pe && pe.type === `ArrayExpression` && `value` in J && J.value instanceof Array) for (let e of J.value) try {
					await Y(be(e));
				} catch {}
				pe = J = void 0;
			}
		}
	}
	function le(e) {
		return `body` in e;
	}
}));
var kn = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.sharedLibEmit = s;
	let n = t(W(`os`)), r = t(W(`path`)), i = (fn(), U(un)), a = pn(), o = ``;
	switch (n.default.platform()) {
		case `darwin`:
			o = `/**/*.@(dylib|so?(.*))`;
			break;
		case `win32`:
			o = `/**/*.dll`;
			break;
		default: o = `/**/*.so?(.*)`;
	}
	async function s(e, t) {
		let n = (0, a.getPackageBase)(e);
		if (!n) return;
		let s = await (0, i.glob)([n.replaceAll(r.default.sep, r.default.posix.sep), o], {
			ignore: n.replaceAll(r.default.sep, r.default.posix.sep) + `/**/node_modules/**/*`,
			dot: !0
		});
		await Promise.all(s.map((n) => t.emitFile(n, `sharedlib`, e)));
	}
}));
var An = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.RateLimit = e.Sema = void 0;
	let n = t(W(`events`));
	function r(e, t, n, r, i) {
		for (let a = 0; a < i; ++a) n[a + r] = e[a + t], e[a + t] = void 0;
	}
	function i(e) {
		return e >>>= 0, --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, e + 1;
	}
	function a(e) {
		return i(Math.min(Math.max(16, e), 1073741824));
	}
	var o = class {
		constructor(e) {
			this._capacity = a(e), this._length = 0, this._front = 0, this.arr = [];
		}
		push(e) {
			let t = this._length;
			this.checkCapacity(t + 1);
			let n = this._front + t & this._capacity - 1;
			return this.arr[n] = e, this._length = t + 1, t + 1;
		}
		pop() {
			let e = this._length;
			if (e === 0) return;
			let t = this._front + e - 1 & this._capacity - 1, n = this.arr[t];
			return this.arr[t] = void 0, this._length = e - 1, n;
		}
		shift() {
			let e = this._length;
			if (e === 0) return;
			let t = this._front, n = this.arr[t];
			return this.arr[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length = e - 1, n;
		}
		get length() {
			return this._length;
		}
		checkCapacity(e) {
			this._capacity < e && this.resizeTo(a(this._capacity * 1.5 + 16));
		}
		resizeTo(e) {
			let t = this._capacity;
			this._capacity = e;
			let n = this._front, i = this._length;
			if (n + i > t) {
				let e = n + i & t - 1;
				r(this.arr, 0, this.arr, t, e);
			}
		}
	}, s = class extends n.default {};
	function c(e) {
		return typeof e == `function`;
	}
	function l() {
		return `1`;
	}
	var u = class {
		constructor(e, { initFn: t = l, pauseFn: n, resumeFn: r, capacity: i = 10 } = {}) {
			if (c(n) !== c(r)) throw Error(`pauseFn and resumeFn must be both set for pausing`);
			this.nrTokens = e, this.free = new o(e), this.waiting = new o(i), this.releaseEmitter = new s(), this.noTokens = t === l, this.pauseFn = n, this.resumeFn = r, this.paused = !1, this.releaseEmitter.on(`release`, (e) => {
				let t = this.waiting.shift();
				t ? t.resolve(e) : (this.resumeFn && this.paused && (this.paused = !1, this.resumeFn()), this.free.push(e));
			});
			for (let n = 0; n < e; n++) this.free.push(t());
		}
		tryAcquire() {
			return this.free.pop();
		}
		async acquire() {
			let e = this.tryAcquire();
			return e === void 0 ? new Promise((e, t) => {
				this.pauseFn && !this.paused && (this.paused = !0, this.pauseFn()), this.waiting.push({
					resolve: e,
					reject: t
				});
			}) : e;
		}
		release(e) {
			this.releaseEmitter.emit(`release`, this.noTokens ? `1` : e);
		}
		drain() {
			let e = Array(this.nrTokens);
			for (let t = 0; t < this.nrTokens; t++) e[t] = this.acquire();
			return Promise.all(e);
		}
		nrWaiting() {
			return this.waiting.length;
		}
	};
	e.Sema = u;
	function d(e, { timeUnit: t = 1e3, uniformDistribution: n = !1 } = {}) {
		let r = new u(n ? 1 : e), i = n ? t / e : t;
		return async function() {
			await r.acquire(), setTimeout(() => r.release(), i);
		};
	}
	e.RateLimit = d;
}));
var jn = B(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CachedFileSystem = void 0;
	let n = W(`path`), r = t(_n()), i = An(), a = r.default.promises.readFile, o = r.default.promises.readlink, s = r.default.promises.stat;
	e.CachedFileSystem = class {
		fileCache;
		statCache;
		symlinkCache;
		fileIOQueue;
		constructor({ cache: e, fileIOConcurrency: t }) {
			this.fileIOQueue = new i.Sema(t), this.fileCache = e?.fileCache ?? /* @__PURE__ */ new Map(), this.statCache = e?.statCache ?? /* @__PURE__ */ new Map(), this.symlinkCache = e?.symlinkCache ?? /* @__PURE__ */ new Map(), e && (e.fileCache = this.fileCache, e.statCache = this.statCache, e.symlinkCache = this.symlinkCache);
		}
		async readlink(e) {
			let t = this.symlinkCache.get(e);
			if (t !== void 0) return t;
			let n = this.executeFileIO(e, this._internalReadlink);
			return this.symlinkCache.set(e, n), n;
		}
		async readFile(e) {
			let t = this.fileCache.get(e);
			if (t !== void 0) return t;
			let n = this.executeFileIO(e, this._internalReadFile);
			return this.fileCache.set(e, n), n;
		}
		async stat(e) {
			let t = this.statCache.get(e);
			if (t !== void 0) return t;
			let n = this.executeFileIO(e, this._internalStat);
			return this.statCache.set(e, n), n;
		}
		async _internalReadlink(e) {
			try {
				let t = await o(e), r = this.statCache.get(e);
				return r && this.statCache.set((0, n.resolve)(e, t), r), t;
			} catch (e) {
				if (e.code !== `EINVAL` && e.code !== `ENOENT` && e.code !== `UNKNOWN`) throw e;
				return null;
			}
		}
		async _internalReadFile(e) {
			try {
				return (await a(e)).toString();
			} catch (e) {
				if (e.code === `ENOENT` || e.code === `EISDIR`) return null;
				throw e;
			}
		}
		async _internalStat(e) {
			try {
				return await s(e);
			} catch (e) {
				if (e.code === `ENOENT`) return null;
				throw e;
			}
		}
		async executeFileIO(e, t) {
			await this.fileIOQueue.acquire();
			try {
				return await t.call(this, e);
			} finally {
				this.fileIOQueue.release();
			}
		}
	};
}));
var Mn = B(((e) => {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || (`get` in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: function() {
				return t[n];
			}
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), r = e && e.__importStar || (function() {
		var e = function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		};
		return function(r) {
			if (r && r.__esModule) return r;
			var i = {};
			if (r != null) for (var a = e(r), o = 0; o < a.length; o++) a[o] !== "default" && t(i, r, a[o]);
			return n(i, r), i;
		};
	})(), i = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Job = void 0, e.nodeFileTrace = f;
	let a = W(`path`), o = i(On()), s = r(xn()), c = q(), l = kn(), u = jn();
	function d(e, t) {
		let n = (0, a.join)(t, a.sep);
		return e.startsWith(n) && e !== n;
	}
	async function f(e, t = {}) {
		let n = new p(t);
		return t.readFile && (n.readFile = t.readFile), t.stat && (n.stat = t.stat), t.readlink && (n.readlink = t.readlink), t.resolve && (n.resolve = t.resolve), n.ts = !0, await Promise.all(e.map(async (e) => {
			let t = (0, a.resolve)(e);
			return await n.emitFile(t, `initial`), n.emitDependency(t);
		})), {
			fileList: n.fileList,
			esmFileList: n.esmFileList,
			reasons: n.reasons,
			warnings: n.warnings
		};
	}
	var p = class {
		ts;
		base;
		cwd;
		conditions;
		exportsOnly;
		moduleSyncCatchall;
		paths;
		ignoreFn;
		log;
		depth;
		mixedModules;
		analysis;
		analysisCache;
		fileList;
		esmFileList;
		processed;
		warnings;
		reasons = /* @__PURE__ */ new Map();
		cachedFileSystem;
		remappings = /* @__PURE__ */ new Map();
		constructor({ base: e = process.cwd(), processCwd: t, exports: n, conditions: r = n || [`node`], exportsOnly: i = !1, moduleSyncCatchall: o = !1, paths: s = {}, ignore: l, log: d = !1, mixedModules: f = !1, ts: p = !0, analysis: m = {}, cache: h, fileIOConcurrency: g = 1024, depth: _ = 1 / 0 }) {
			if (this.ts = p, e = (0, a.resolve)(e), this.ignoreFn = (e) => !!e.startsWith(`..` + a.sep), typeof l == `string` && (l = [l]), typeof l == `function`) {
				let e = l;
				this.ignoreFn = (t) => !!(t.startsWith(`..` + a.sep) || e(t));
			} else if (Array.isArray(l)) {
				let t = l.map((t) => (0, a.relative)(e, (0, a.resolve)(e || process.cwd(), t)));
				this.ignoreFn = (e) => !!(e.startsWith(`..` + a.sep) || (0, c.isMatch)(e, t));
			}
			this.base = e, this.cwd = (0, a.resolve)(t || e), this.conditions = r, this.exportsOnly = i, this.moduleSyncCatchall = o;
			let v = {};
			for (let t of Object.keys(s)) {
				let n = s[t].endsWith(`/`);
				v[t] = (0, a.resolve)(e, s[t]) + (n ? `/` : ``);
			}
			this.paths = v, this.log = d, this.depth = _, this.mixedModules = f, this.cachedFileSystem = new u.CachedFileSystem({
				cache: h,
				fileIOConcurrency: g
			}), this.analysis = {}, m !== !1 && Object.assign(this.analysis, {
				emitGlobs: !0,
				computeFileReferences: !0,
				evaluatePureExpressions: !0
			}, m === !0 ? {} : m), this.analysisCache = h && h.analysisCache || /* @__PURE__ */ new Map(), h && (h.analysisCache = this.analysisCache), this.fileList = /* @__PURE__ */ new Set(), this.esmFileList = /* @__PURE__ */ new Set(), this.processed = /* @__PURE__ */ new Set(), this.warnings = /* @__PURE__ */ new Set();
		}
		addRemapping(e, t) {
			if (e === t) return;
			let n = this.remappings.get(e);
			n || (n = /* @__PURE__ */ new Set(), this.remappings.set(e, n)), n.add(t);
		}
		async readlink(e) {
			return this.cachedFileSystem.readlink(e);
		}
		async isFile(e) {
			let t = await this.stat(e);
			return t ? t.isFile() : !1;
		}
		async isDir(e) {
			let t = await this.stat(e);
			return t ? t.isDirectory() : !1;
		}
		async stat(e) {
			return this.cachedFileSystem.stat(e);
		}
		maybeEmitDep = async (e, t, n, r) => {
			let i = ``, a;
			try {
				i = await this.resolve(e, t, this, n);
			} catch (r) {
				a = r;
				try {
					if (this.ts && e.endsWith(`.js`) && r instanceof s.NotFoundError) {
						let r = e.slice(0, -3) + `.ts`;
						i = await this.resolve(r, t, this, n), a = void 0;
					}
				} catch (e) {
					a = e;
				}
			}
			if (a) this.warnings.add(Error(`Failed to resolve dependency "${e}":\n${a?.message}`));
			else if (Array.isArray(i)) for (let e of i) {
				if (e.startsWith(`node:`)) return;
				await this.emitDependency(e, t, r);
			}
			else {
				if (i.startsWith(`node:`)) return;
				await this.emitDependency(i, t, r);
			}
		};
		async resolve(e, t, n, r) {
			return (0, s.default)(e, t, n, r);
		}
		async readFile(e) {
			return this.cachedFileSystem.readFile(e);
		}
		async realpath(e, t, n = /* @__PURE__ */ new Set()) {
			if (n.has(e)) throw Error(`Recursive symlink detected resolving ` + e);
			n.add(e);
			let r = await this.readlink(e);
			if (r) {
				let i = (0, a.dirname)(e), o = (0, a.resolve)(i, r);
				return d(e, await this.realpath(i, t)) && await this.emitFile(e, `resolve`, t, !0), this.realpath(o, t, n);
			}
			return d(e, this.base) ? (0, a.join)(await this.realpath((0, a.dirname)(e), t, n), (0, a.basename)(e)) : e;
		}
		async emitFile(e, t, n, r = !1) {
			r || (e = await this.realpath(e, n)), e = (0, a.relative)(this.base, e), n &&= (0, a.relative)(this.base, n);
			let i = this.reasons.get(e);
			return i ? i.type.includes(t) || i.type.push(t) : (i = {
				type: [t],
				ignored: !1,
				parents: /* @__PURE__ */ new Set()
			}, this.reasons.set(e, i)), n && this.ignoreFn(e, n) ? (!this.fileList.has(e) && i && (i.ignored = !0), !1) : (n && i.parents.add(n), this.fileList.add(e), !0);
		}
		async getPjsonBoundary(e) {
			let t = e.indexOf(a.sep), n;
			for (; (n = e.lastIndexOf(a.sep)) > t;) if (e = e.slice(0, n), await this.isFile(e + a.sep + `package.json`)) return e;
		}
		async emitDependency(e, t, n = this.depth) {
			if (n < 0) throw Error(`invariant - depth option cannot be negative`);
			let r = await this.realpath(e, t);
			if (this.processed.has(r)) {
				t && await this.emitFile(e, `dependency`, t);
				return;
			}
			this.processed.add(r);
			let i = this.remappings.get(r);
			if (i && await Promise.all([...i].map(async (e) => this.emitDependency(e, r, n))), !await this.emitFile(e, `dependency`, t) || r.endsWith(`.json`)) return;
			if (r.endsWith(`.node`)) return await (0, l.sharedLibEmit)(r, this);
			if (r.endsWith(`.js`) || r.endsWith(`.ts`)) {
				let e = await this.getPjsonBoundary(r);
				e && await this.emitFile(e + a.sep + `package.json`, `resolve`, r);
			}
			if (n === 0) return;
			let s, c = this.analysisCache.get(r);
			if (c) s = c;
			else {
				let e = await this.readFile(r);
				if (e === null) throw Error(`File ` + r + ` does not exist.`);
				s = await (0, o.default)(r, e.toString(), this), this.analysisCache.set(r, s);
			}
			let { deps: u, imports: d, assets: f, isESM: p } = s;
			p && this.esmFileList.add((0, a.relative)(this.base, r)), await Promise.all([
				...[...f].map(async (e) => {
					let t = (0, a.extname)(e);
					t === `.js` || t === `.mjs` || t === `.node` || t === `` && (await this.stat(e))?.isFile() || this.ts && (t === `.ts` || t === `.tsx`) && e.startsWith(this.base) && e.slice(this.base.length).indexOf(a.sep + `node_modules` + a.sep) === -1 ? await this.emitDependency(e, r, n - 1) : await this.emitFile(e, `asset`, r);
				}),
				...[...u].map(async (e) => this.maybeEmitDep(e, r, !p, n - 1)),
				...[...d].map(async (e) => this.maybeEmitDep(e, r, !1, n - 1))
			]);
		}
	};
	e.Job = p;
}));
var Nn = B(((e) => {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || (`get` in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: function() {
				return t[n];
			}
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__exportStar || function(e, n) {
		for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, e, r);
	}, r = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.resolve = e.nodeFileTrace = void 0, n(Se(), e);
	var i = Mn();
	Object.defineProperty(e, "nodeFileTrace", {
		enumerable: !0,
		get: function() {
			return i.nodeFileTrace;
		}
	}), e.resolve = r(xn()).default;
}));
var Pn = /^[A-Za-z]:\//;
function Fn(e = ``) {
	return e && e.replace(/\\/g, `/`).replace(Pn, (e) => e.toUpperCase());
}
var In = /^[/\\]{2}/;
var Ln = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var Rn = /^[A-Za-z]:$/;
var zn = /^\/([A-Za-z]:)?$/;
var Bn = function(e) {
	if (e.length === 0) return `.`;
	e = Fn(e);
	let t = e.match(In), n = Gn(e), r = e[e.length - 1] === `/`;
	return e = Wn(e, !n), e.length === 0 ? n ? `/` : r ? `./` : `.` : (r && (e += `/`), Rn.test(e) && (e += `/`), t ? n ? `//${e}` : `//./${e}` : n && !Gn(e) ? `/${e}` : e);
};
var Vn = function(...e) {
	let t = ``;
	for (let n of e) if (n) {
		if (t.length > 0) {
			let e = t[t.length - 1] === `/`, r = n[0] === `/`;
			t += e && r ? n.slice(1) : e || r ? n : `/${n}`;
		} else t += n;
	}
	return Bn(t);
};
function Hn() {
	return typeof process < `u` && typeof process.cwd == `function` ? process.cwd().replace(/\\/g, `/`) : `/`;
}
var Un = function(...e) {
	e = e.map((e) => Fn(e));
	let t = ``, n = !1;
	for (let r = e.length - 1; r >= -1 && !n; r--) {
		let i = r >= 0 ? e[r] : Hn();
		i && i.length !== 0 && (t = `${i}/${t}`, n = Gn(i));
	}
	return t = Wn(t, !n), n && !Gn(t) ? `/${t}` : t.length > 0 ? t : `.`;
};
function Wn(e, t) {
	let n = ``, r = 0, i = -1, a = 0, o = null;
	for (let s = 0; s <= e.length; ++s) {
		if (s < e.length) o = e[s];
		else if (o === `/`) break;
		else o = `/`;
		if (o === `/`) {
			if (i !== s - 1 && a !== 1) {
				if (a === 2) {
					if (n.length < 2 || r !== 2 || n[n.length - 1] !== `.` || n[n.length - 2] !== `.`) {
						if (n.length > 2) {
							let e = n.lastIndexOf(`/`);
							e === -1 ? (n = ``, r = 0) : (n = n.slice(0, e), r = n.length - 1 - n.lastIndexOf(`/`)), i = s, a = 0;
							continue;
						}
						if (n.length > 0) {
							n = ``, r = 0, i = s, a = 0;
							continue;
						}
					}
					t && (n += n.length > 0 ? `/..` : `..`, r = 2);
				} else n.length > 0 ? n += `/${e.slice(i + 1, s)}` : n = e.slice(i + 1, s), r = s - i - 1;
			}
			i = s, a = 0;
		} else o === `.` && a !== -1 ? ++a : a = -1;
	}
	return n;
}
var Gn = function(e) {
	return Ln.test(e);
};
var Kn = function(e, t) {
	let n = Un(e).replace(zn, `$1`).split(`/`), r = Un(t).replace(zn, `$1`).split(`/`);
	if (r[0][1] === `:` && n[0][1] === `:` && n[0] !== r[0]) return r.join(`/`);
	let i = [...n];
	for (let e of i) {
		if (r[0] !== e) break;
		n.shift(), r.shift();
	}
	return [...n.map(() => `..`), ...r].join(`/`);
};
var qn = function(e) {
	let t = Fn(e).replace(/\/$/, ``).split(`/`).slice(0, -1);
	return t.length === 1 && Rn.test(t[0]) && (t[0] += `/`), t.join(`/`) || (Gn(e) ? `/` : `.`);
};
var Jn = B(((e, t) => {
	let n = J();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
}));
var Yn = B(((e, t) => {
	let n = Jn();
	t.exports = (e, t, r) => n(e, t, r) < 0;
}));
var Xn = `_http_agent._http_client._http_common._http_incoming._http_outgoing._http_server._stream_duplex._stream_passthrough._stream_readable._stream_transform._stream_wrap._stream_writable._tls_common._tls_wrap.assert.assert/strict.async_hooks.buffer.child_process.cluster.console.constants.crypto.dgram.diagnostics_channel.dns.dns/promises.domain.events.fs.fs/promises.http.http2.https.inspector.inspector/promises.module.net.os.path.path/posix.path/win32.perf_hooks.process.punycode.querystring.readline.readline/promises.repl.stream.stream/consumers.stream/promises.stream/web.string_decoder.sys.timers.timers/promises.tls.trace_events.tty.url.util.util/types.v8.vm.wasi.worker_threads.zlib`.split(`.`);
var Zn = /^([A-Z][a-z\d]*)+$/;
var Qn = /* @__PURE__ */ new Set([
	`string`,
	`function`,
	`number`,
	`object`,
	`Function`,
	`Object`,
	`boolean`,
	`bigint`,
	`symbol`
]);
var $n = /* @__PURE__ */ new Map();
function er(e, t = `and`) {
	switch (e.length) {
		case 0: return ``;
		case 1: return `${e[0]}`;
		case 2: return `${e[0]} ${t} ${e[1]}`;
		case 3: return `${e[0]}, ${e[1]}, ${t} ${e[2]}`;
		default: return `${e.slice(0, -1).join(`, `)}, ${t} ${e.at(-1)}`;
	}
}
function tr(e) {
	let t = 0, n = /%[dfijoOs]/g;
	for (; n.exec(e) !== null;) t++;
	return t;
}
function nr(e, t, n) {
	return $n.set(e, t), ir(n, e);
}
var rr = Symbol(`kIsNodeError`);
function ir(e, n) {
	let r = $n.get(n), i = typeof r == `string` ? tr(r) : -1;
	switch (i) {
		case 0: {
			class t extends e {
				code = n;
				constructor(...e) {
					assert.ok(e.length === 0, `Code: ${n}; The provided arguments length (${e.length}) does not match the required ones (${i}).`), super(r);
				}
				get ["constructor"]() {
					return e;
				}
				get [rr]() {
					return !0;
				}
				toString() {
					return `${this.name} [${n}]: ${this.message}`;
				}
			}
			return t;
		}
		case -1: {
			class t extends e {
				code = n;
				constructor(...e) {
					super(), Object.defineProperty(this, "message", {
						value: ar(n, e, this),
						enumerable: !1,
						writable: !0,
						configurable: !0
					});
				}
				get ["constructor"]() {
					return e;
				}
				get [rr]() {
					return !0;
				}
				toString() {
					return `${this.name} [${n}]: ${this.message}`;
				}
			}
			return t;
		}
		default: {
			class a extends e {
				code = n;
				constructor(...e) {
					assert.ok(e.length === i, `Code: ${n}; The provided arguments length (${e.length}) does not match the required ones (${i}).`), e.unshift(r), super(Reflect.apply(format, null, e));
				}
				get ["constructor"]() {
					return e;
				}
				get [rr]() {
					return !0;
				}
				toString() {
					return `${this.name} [${n}]: ${this.message}`;
				}
			}
			return a;
		}
	}
}
function ar(e, n, r) {
	let i = $n.get(e);
	if (assert.ok(i !== void 0, "expected `message` to be found"), typeof i == `function`) return assert.ok(i.length <= n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${i.length}).`), Reflect.apply(i, r, n);
	let a = tr(i);
	return assert.ok(a === n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${a}).`), n.length === 0 ? i : (n.unshift(i), Reflect.apply(format, null, n));
}
function or(e) {
	if (e === null) return `null`;
	if (e === void 0) return `undefined`;
	let t = typeof e;
	switch (t) {
		case `bigint`: return `type bigint (${e}n)`;
		case `number`: return e === 0 ? 1 / e == -1 / 0 ? `type number (-0)` : `type number (0)` : Number.isNaN(e) ? `type number (NaN)` : e === 1 / 0 ? `type number (Infinity)` : e === -1 / 0 ? `type number (-Infinity)` : `type number (${e})`;
		case `boolean`: return e ? `type boolean (true)` : `type boolean (false)`;
		case `symbol`: return `type symbol (${String(e)})`;
		case `function`: return `function ${e.name}`;
		case `object`: return e.constructor && e.constructor.name ? `an instance of ${e.constructor.name}` : `${inspect(e, { depth: -1 })}`;
		case `string`: {
			let t = e;
			return t.length > 28 && (t = `${t.slice(0, 25)}...`), t.includes(`'`) ? `type string (${JSON.stringify(t)})` : `type string ('${t}')`;
		}
		default: {
			let r = inspect(e, { colors: !1 });
			return r.length > 28 && (r = `${r.slice(0, 25)}...`), `type ${t} (${r})`;
		}
	}
}
nr(`ERR_INVALID_ARG_TYPE`, (e, t, n) => {
	assert.ok(typeof e == `string`, `'name' must be a string`), Array.isArray(t) || (t = [t]);
	let r = `The `;
	if (e.endsWith(` argument`)) r += `${e} `;
	else {
		let t = e.includes(`.`) ? `property` : `argument`;
		r += `"${e}" ${t} `;
	}
	r += `must be `;
	let i = [], a = [], o = [];
	for (let e of t) assert.ok(typeof e == `string`, `All expected entries have to be of type string`), Qn.has(e) ? i.push(e.toLowerCase()) : Zn.exec(e) === null ? (assert.ok(e !== `object`, `The value "object" should be written as "Object"`), o.push(e)) : a.push(e);
	if (a.length > 0) {
		let e = i.indexOf(`object`);
		e !== -1 && (i.splice(e, 1), a.push(`Object`));
	}
	return i.length > 0 && (r += `${i.length > 1 ? `one of type` : `of type`} ${er(i, `or`)}`, (a.length > 0 || o.length > 0) && (r += ` or `)), a.length > 0 && (r += `an instance of ${er(a, `or`)}`, o.length > 0 && (r += ` or `)), o.length > 0 && (o.length > 1 ? r += `one of ${er(o, `or`)}` : (o[0]?.toLowerCase() !== o[0] && (r += `an `), r += `${o[0]}`)), r += `. Received ${or(n)}`, r;
}, TypeError);
var sr = nr(`ERR_INVALID_MODULE_SPECIFIER`, (e, t, n) => `Invalid module "${e}" ${t}${n ? ` imported from ${n}` : ``}`, TypeError);
var cr = nr(`ERR_INVALID_PACKAGE_CONFIG`, (e, t, n) => `Invalid package config ${e}${t ? ` while importing ${t}` : ``}${n ? `. ${n}` : ``}`, Error);
var lr = nr(`ERR_INVALID_PACKAGE_TARGET`, (e, t, n, r = !1, i) => {
	let a = typeof n == `string` && !r && n.length > 0 && !n.startsWith(`./`);
	return t === `.` ? (assert.ok(r === !1), `Invalid "exports" main target ${JSON.stringify(n)} defined in the package config ${e}package.json${i ? ` imported from ${i}` : ``}${a ? `; targets must start with "./"` : ``}`) : `Invalid "${r ? `imports` : `exports`}" target ${JSON.stringify(n)} defined for '${t}' in the package config ${e}package.json${i ? ` imported from ${i}` : ``}${a ? `; targets must start with "./"` : ``}`;
}, Error);
var ur = nr(`ERR_MODULE_NOT_FOUND`, function(e, t, n = !1) {
	return n && typeof n == `string` && (this.url = `${n}`), `Cannot find ${n ? `module` : `package`} '${e}' imported from ${t}`;
}, Error);
var dr = nr(`ERR_PACKAGE_IMPORT_NOT_DEFINED`, (e, t, n) => `Package import specifier "${e}" is not defined${t ? ` in package ${t || ``}package.json` : ``} imported from ${n}`, TypeError);
var fr = nr(`ERR_PACKAGE_PATH_NOT_EXPORTED`, (e, t, n) => t === `.` ? `No "exports" main defined in ${e}package.json${n ? ` imported from ${n}` : ``}` : `Package subpath '${t}' is not defined by "exports" in ${e}package.json${n ? ` imported from ${n}` : ``}`, Error);
var pr = nr(`ERR_UNSUPPORTED_DIR_IMPORT`, function(e, t, n = void 0) {
	return this.url = n, `Directory import '${e}' is not supported resolving ES modules imported from ${t}`;
}, Error);
var mr = nr(`ERR_UNSUPPORTED_RESOLVE_REQUEST`, `Failed to resolve module specifier "%s" from "%s": Invalid relative URL or base scheme is not hierarchical.`, TypeError);
var hr = nr(`ERR_UNKNOWN_FILE_EXTENSION`, (e, t) => `Unknown file extension "${e}" for ${t}`, TypeError);
nr(`ERR_INVALID_ARG_VALUE`, (e, t, r = `is invalid`) => {
	let i = inspect(t);
	return i.length > 128 && (i = `${i.slice(0, 128)}...`), `The ${e.includes(`.`) ? `property` : `argument`} '${e}' ${r}. Received ${i}`;
}, TypeError);
var gr = {}.hasOwnProperty;
var _r = /* @__PURE__ */ new Map();
function vr(e, { base: t, specifier: n }) {
	let i = _r.get(e);
	if (i) return i;
	let a;
	try {
		a = fs.readFileSync(path.toNamespacedPath(e), `utf8`);
	} catch (e) {
		let t = e;
		if (t.code !== `ENOENT`) throw t;
	}
	let o = {
		exists: !1,
		pjsonPath: e,
		main: void 0,
		name: void 0,
		type: `none`,
		exports: void 0,
		imports: void 0
	};
	if (a !== void 0) {
		let r;
		try {
			r = JSON.parse(a);
		} catch (r) {
			let i = new cr(e, (t ? `"${n}" from ` : ``) + fileURLToPath(t || n), r.message);
			throw i.cause = r, i;
		}
		o.exists = !0, gr.call(r, `name`) && typeof r.name == `string` && (o.name = r.name), gr.call(r, `main`) && typeof r.main == `string` && (o.main = r.main), gr.call(r, `exports`) && (o.exports = r.exports), gr.call(r, `imports`) && (o.imports = r.imports), gr.call(r, `type`) && (r.type === `commonjs` || r.type === `module`) && (o.type = r.type);
	}
	return _r.set(e, o), o;
}
function yr(e) {
	let t = new URL(`package.json`, e);
	for (; !t.pathname.endsWith(`node_modules/package.json`);) {
		let n = vr(fileURLToPath(t), { specifier: e });
		if (n.exists) return n;
		let r = t;
		if (t = new URL(`../package.json`, t), t.pathname === r.pathname) break;
	}
	return {
		pjsonPath: fileURLToPath(t),
		exists: !1,
		type: `none`
	};
}
var br = {}.hasOwnProperty;
var xr = {
	__proto__: null,
	".json": `json`,
	".cjs": `commonjs`,
	".cts": `commonjs`,
	".js": `module`,
	".ts": `module`,
	".mts": `module`,
	".mjs": `module`
};
var Sr = {
	__proto__: null,
	"data:": wr,
	"file:": Er,
	"node:": () => `builtin`
};
function Cr(e) {
	return e && /^\s*(text|application)\/javascript\s*(;\s*charset=utf-?8\s*)?$/i.test(e) ? `module` : e === `application/json` ? `json` : null;
}
function wr(e) {
	let { 1: t } = /^([^/]+\/[^;,]+)(?:[^,]*?)(;base64)?,/.exec(e.pathname) || [
		null,
		null,
		null
	];
	return Cr(t);
}
function Tr(e) {
	let t = e.pathname;
	for (let e = t.length - 1; e > 0; e--) switch (t.charCodeAt(e)) {
		case 47: return ``;
		case 46: return t.charCodeAt(e - 1) === 47 ? `` : t.slice(e);
	}
	return ``;
}
function Er(e, t, n) {
	let r = Tr(e);
	if (r === `.js`) {
		let { type: t } = yr(e);
		return t === `none` ? `commonjs` : t;
	}
	if (r === ``) {
		let { type: t } = yr(e);
		return t === `module` ? `module` : t === `none` ? `commonjs` : t;
	}
	let i = xr[r];
	if (i) return i;
	if (!n) throw new hr(r, fileURLToPath(e));
}
function Dr(e, t) {
	let n = e.protocol;
	return br.call(Sr, n) && Sr[n](e, t, !0) || null;
}
var Or = RegExp.prototype[Symbol.replace];
var kr = {}.hasOwnProperty;
var Ar = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))?(\\|\/|$)/i;
var jr = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
var Mr = /^\.|%|\\/;
var Nr = /\*/g;
var Pr = /%2f|%5c/i;
var Fr = /* @__PURE__ */ new Set();
var Ir = /[/\\]{2}/;
function Lr(e, t, n, r, i, a, s) {
	if (process$1.noDeprecation) return;
	let c = fileURLToPath(r), l = Ir.exec(s ? e : t) !== null;
	process$1.emitWarning(`Use of deprecated ${l ? `double slash` : `leading or trailing slash matching`} resolving "${e}" for module request "${t}" ${t === n ? `` : `matched to "${n}" `}in the "${i ? `imports` : `exports`}" field module resolution of the package at ${c}${a ? ` imported from ${fileURLToPath(a)}` : ``}.`, `DeprecationWarning`, `DEP0166`);
}
function Rr(e, t, n, i) {
	if (process$1.noDeprecation || Dr(e, { parentURL: n.href }) !== `module`) return;
	let a = fileURLToPath(e.href), s = fileURLToPath(new URL$1(`.`, t)), c = fileURLToPath(n);
	i ? path.resolve(s, i) !== a && process$1.emitWarning(`Package ${s} has a "main" field set to "${i}", excluding the full filename and extension to the resolved file at "${a.slice(s.length)}", imported from ${c}.\n Automatic extension resolution of the "main" field is deprecated for ES modules.`, `DeprecationWarning`, `DEP0151`) : process$1.emitWarning(`No "main" or "exports" field defined in the package.json for ${s} resolving the main entry point "${a.slice(s.length)}", imported from ${c}.\nDefault "index" lookups for the main are deprecated for ES modules.`, `DeprecationWarning`, `DEP0151`);
}
function zr(e) {
	try {
		return statSync(e);
	} catch {}
}
function Br(e) {
	let t = statSync(e, { throwIfNoEntry: !1 });
	return (t ? t.isFile() : void 0) ?? !1;
}
function Vr(e, t, n) {
	let r;
	if (t.main !== void 0) {
		if (r = new URL$1(t.main, e), Br(r)) return r;
		let i = [
			`./${t.main}.js`,
			`./${t.main}.json`,
			`./${t.main}.node`,
			`./${t.main}/index.js`,
			`./${t.main}/index.json`,
			`./${t.main}/index.node`
		], a = -1;
		for (; ++a < i.length && (r = new URL$1(i[a], e), !Br(r));) r = void 0;
		if (r) return Rr(r, e, n, t.main), r;
	}
	let i = [
		`./index.js`,
		`./index.json`,
		`./index.node`
	], a = -1;
	for (; ++a < i.length && (r = new URL$1(i[a], e), !Br(r));) r = void 0;
	if (r) return Rr(r, e, n, t.main), r;
	throw new ur(fileURLToPath(new URL$1(`.`, e)), fileURLToPath(n));
}
function Hr(e, t, n) {
	if (Pr.exec(e.pathname) !== null) throw new sr(e.pathname, String.raw`must not include encoded "/" or "\" characters`, fileURLToPath(t));
	let i;
	try {
		i = fileURLToPath(e);
	} catch (n) {
		throw Object.defineProperty(n, "input", { value: String(e) }), Object.defineProperty(n, "module", { value: String(t) }), n;
	}
	let a = zr(i.endsWith(`/`) ? i.slice(-1) : i);
	if (a && a.isDirectory()) {
		let n = new pr(i, fileURLToPath(t));
		throw n.url = String(e), n;
	}
	if (!a || !a.isFile()) {
		let n = new ur(i || e.pathname, t && fileURLToPath(t), !0);
		throw n.url = String(e), n;
	}
	if (!n) {
		let t = realpathSync(i), { search: n, hash: a } = e;
		e = pathToFileURL(t + (i.endsWith(path.sep) ? `/` : ``)), e.search = n, e.hash = a;
	}
	return e;
}
function Ur(e, t, n) {
	return new dr(e, t && fileURLToPath(new URL$1(`.`, t)), fileURLToPath(n));
}
function Wr(e, t, n) {
	return new fr(fileURLToPath(new URL$1(`.`, t)), e, n && fileURLToPath(n));
}
function Gr(e, t, n, r, i) {
	throw new sr(e, `request is not a valid match in pattern "${t}" for the "${r ? `imports` : `exports`}" resolution of ${fileURLToPath(n)}`, i && fileURLToPath(i));
}
function Kr(e, t, n, r, i) {
	return t = typeof t == `object` && t ? JSON.stringify(t, null, ``) : `${t}`, new lr(fileURLToPath(new URL$1(`.`, n)), e, t, r, i && fileURLToPath(i));
}
function qr(e, t, n, r, i, a, o, s, c) {
	if (t !== `` && !a && e.at(-1) !== `/`) throw Kr(n, e, r, o, i);
	if (!e.startsWith(`./`)) {
		if (o && !e.startsWith(`../`) && !e.startsWith(`/`)) {
			let n = !1;
			try {
				new URL$1(e), n = !0;
			} catch {}
			if (!n) return ni(a ? Or.call(Nr, e, () => t) : e + t, r, c);
		}
		throw Kr(n, e, r, o, i);
	}
	if (Ar.exec(e.slice(2)) !== null) {
		if (jr.exec(e.slice(2)) === null) {
			if (!s) {
				let s = a ? n.replace(`*`, () => t) : n + t;
				Lr(a ? Or.call(Nr, e, () => t) : e, s, n, r, o, i, !0);
			}
		} else throw Kr(n, e, r, o, i);
	}
	let l = new URL$1(e, r), u = l.pathname, d = new URL$1(`.`, r).pathname;
	if (!u.startsWith(d)) throw Kr(n, e, r, o, i);
	if (t === ``) return l;
	if (Ar.exec(t) !== null) {
		let c = a ? n.replace(`*`, () => t) : n + t;
		jr.exec(t) === null ? s || Lr(a ? Or.call(Nr, e, () => t) : e, c, n, r, o, i, !1) : Gr(c, n, r, o, i);
	}
	return a ? new URL$1(Or.call(Nr, l.href, () => t)) : new URL$1(t, l);
}
function Jr(e) {
	let t = Number(e);
	return `${t}` === e && t >= 0 && t < 4294967295;
}
function Yr(e, t, n, r, i, a, o, s, c) {
	if (typeof t == `string`) return qr(t, n, r, e, i, a, o, s, c);
	if (Array.isArray(t)) {
		let l = t;
		if (l.length === 0) return null;
		let u, d = -1;
		for (; ++d < l.length;) {
			let t = l[d], f;
			try {
				f = Yr(e, t, n, r, i, a, o, s, c);
			} catch (e) {
				let t = e;
				if (u = t, t.code === `ERR_INVALID_PACKAGE_TARGET`) continue;
				throw e;
			}
			if (f !== void 0) {
				if (f === null) {
					u = null;
					continue;
				}
				return f;
			}
		}
		if (u == null) return u;
		throw u;
	}
	if (typeof t == `object` && t) {
		let l = Object.getOwnPropertyNames(t), u = -1;
		for (; ++u < l.length;) {
			let t = l[u];
			if (Jr(t)) throw new cr(fileURLToPath(e), fileURLToPath(i), `"exports" cannot contain numeric property keys.`);
		}
		for (u = -1; ++u < l.length;) {
			let d = l[u];
			if (d === "default" || c && c.has(d)) {
				let l = t[d], u = Yr(e, l, n, r, i, a, o, s, c);
				if (u === void 0) continue;
				return u;
			}
		}
	} else {
		if (t === null) return null;
		throw Kr(r, t, e, o, i);
	}
}
function Xr(e, t, n) {
	if (typeof e == `string` || Array.isArray(e)) return !0;
	if (typeof e != `object` || !e) return !1;
	let r = Object.getOwnPropertyNames(e), i = !1, a = 0, o = -1;
	for (; ++o < r.length;) {
		let e = r[o], s = e === `` || e[0] !== `.`;
		if (a++ === 0) i = s;
		else if (i !== s) throw new cr(fileURLToPath(t), fileURLToPath(n), `"exports" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.`);
	}
	return i;
}
function Zr(e, t, n) {
	if (process$1.noDeprecation) return;
	let r = fileURLToPath(t);
	Fr.has(r + `|` + e) || (Fr.add(r + `|` + e), process$1.emitWarning(`Use of deprecated trailing slash pattern mapping "${e}" in the "exports" field module resolution of the package at ${r}${n ? ` imported from ${fileURLToPath(n)}` : ``}. Mapping specifiers ending in "/" is no longer supported.`, `DeprecationWarning`, `DEP0155`));
}
function Qr(e, t, n, r, i) {
	let a = n.exports;
	if (Xr(a, e, r) && (a = { ".": a }), kr.call(a, t) && !t.includes(`*`) && !t.endsWith(`/`)) {
		let n = a[t], o = Yr(e, n, ``, t, r, !1, !1, !1, i);
		if (o == null) throw Wr(t, e, r);
		return o;
	}
	let o = ``, s = ``, c = Object.getOwnPropertyNames(a), l = -1;
	for (; ++l < c.length;) {
		let n = c[l], i = n.indexOf(`*`);
		if (i !== -1 && t.startsWith(n.slice(0, i))) {
			t.endsWith(`/`) && Zr(t, e, r);
			let a = n.slice(i + 1);
			t.length >= n.length && t.endsWith(a) && $r(o, n) === 1 && n.lastIndexOf(`*`) === i && (o = n, s = t.slice(i, t.length - a.length));
		}
	}
	if (o) {
		let n = a[o], c = Yr(e, n, s, o, r, !0, !1, t.endsWith(`/`), i);
		if (c == null) throw Wr(t, e, r);
		return c;
	}
	throw Wr(t, e, r);
}
function $r(e, t) {
	let n = e.indexOf(`*`), r = t.indexOf(`*`), i = n === -1 ? e.length : n + 1, a = r === -1 ? t.length : r + 1;
	return i > a ? -1 : a > i || n === -1 ? 1 : r === -1 || e.length > t.length ? -1 : +(t.length > e.length);
}
function ei(e, t, n) {
	if (e === `#` || e.endsWith(`/`)) throw new sr(e, `is not a valid internal imports specifier name`, fileURLToPath(t));
	let r, i = yr(t);
	if (i.exists) {
		r = pathToFileURL(i.pjsonPath);
		let a = i.imports;
		if (a) {
			if (kr.call(a, e) && !e.includes(`*`)) {
				let i = Yr(r, a[e], ``, e, t, !1, !0, !1, n);
				if (i != null) return i;
			} else {
				let i = ``, o = ``, s = Object.getOwnPropertyNames(a), c = -1;
				for (; ++c < s.length;) {
					let t = s[c], n = t.indexOf(`*`);
					if (n !== -1 && e.startsWith(t.slice(0, n))) {
						let r = t.slice(n + 1);
						e.length >= t.length && e.endsWith(r) && $r(i, t) === 1 && t.lastIndexOf(`*`) === n && (i = t, o = e.slice(n, e.length - r.length));
					}
				}
				if (i) {
					let e = a[i], s = Yr(r, e, o, i, t, !0, !0, !1, n);
					if (s != null) return s;
				}
			}
		}
	}
	throw Ur(e, r, t);
}
function ti(e, t) {
	let n = e.indexOf(`/`), r = !0, i = !1;
	e[0] === `@` && (i = !0, n === -1 || e.length === 0 ? r = !1 : n = e.indexOf(`/`, n + 1));
	let a = n === -1 ? e : e.slice(0, n);
	if (Mr.exec(a) !== null && (r = !1), !r) throw new sr(e, `is not a valid package name`, fileURLToPath(t));
	return {
		packageName: a,
		packageSubpath: `.` + (n === -1 ? `` : e.slice(n)),
		isScoped: i
	};
}
function ni(e, t, n) {
	if (Xn.includes(e)) return new URL$1(`node:` + e);
	let { packageName: r, packageSubpath: i, isScoped: a } = ti(e, t), o = yr(t);
	if (o.exists && o.name === r && o.exports !== void 0 && o.exports !== null) return Qr(pathToFileURL(o.pjsonPath), i, o, t, n);
	let s = new URL$1(`./node_modules/` + r + `/package.json`, t), c = fileURLToPath(s), l;
	do {
		let o = zr(c.slice(0, -13));
		if (!o || !o.isDirectory()) {
			l = c, s = new URL$1((a ? `../../../../node_modules/` : `../../../node_modules/`) + r + `/package.json`, s), c = fileURLToPath(s);
			continue;
		}
		let u = vr(c, {
			base: t,
			specifier: e
		});
		return u.exports !== void 0 && u.exports !== null ? Qr(s, i, u, t, n) : i === `.` ? Vr(s, u, t) : new URL$1(i, s);
	} while (c.length !== l.length);
	throw new ur(r, fileURLToPath(t), !1);
}
function ri(e) {
	return !(e[0] !== `.` || e.length !== 1 && e[1] !== `/` && (e[1] !== `.` || e.length !== 2 && e[2] !== `/`));
}
function ii(e) {
	return e === `` ? !1 : e[0] === `/` || ri(e);
}
function ai(e, t, n, r) {
	let i = t.protocol, a = i === `data:`, o;
	if (ii(e)) try {
		o = new URL$1(e, t);
	} catch (n) {
		let r = new mr(e, t);
		throw r.cause = n, r;
	}
	else if (i === `file:` && e[0] === `#`) o = ei(e, t, n);
	else try {
		o = new URL$1(e);
	} catch (r) {
		if (a && !Xn.includes(e)) {
			let n = new mr(e, t);
			throw n.cause = r, n;
		}
		o = ni(e, t, n);
	}
	return assert.ok(o !== void 0, `expected to be defined`), o.protocol === `file:` ? Hr(o, t, r) : o;
}
var oi = /* @__PURE__ */ new Set([`node`, `import`]);
var si = process.platform === `win32`;
var ci = globalThis.__EXSOLVE_CACHE__ ||= /* @__PURE__ */ new Map();
function li(e, t) {
	let n = Si(e);
	if (`external` in n) return n.external;
	let r = n.specifier, i = n.url, a = n.absolutePath, o, s;
	if (t?.cache !== !1 && (o = gi(a || r, t), s = t?.cache && typeof t?.cache == `object` ? t.cache : ci), s) {
		let e = s.get(o);
		if (typeof e == `string`) return e;
		if (e instanceof Error) {
			if (t?.try) return;
			throw e;
		}
	}
	if (a) try {
		let e = lstatSync(a);
		if (e.isSymbolicLink() && (a = realpathSync(a), i = pathToFileURL(a)), e.isFile()) return s && s.set(o, i.href), i.href;
	} catch (e) {
		if (e?.code !== `ENOENT`) throw s && hi(s, o, e), e;
	}
	let u = t?.conditions ? new Set(t.conditions) : oi, d = r || i.href, f = fi(t?.from), p = t?.suffixes || [``], m = t?.extensions ? [``, ...t.extensions] : [``], h;
	for (let e of f) {
		for (let t of p) {
			let n = yi(d, t);
			n === `.` && (n += `/.`);
			for (let t of m) if (h = di(n + t, e, u), h) break;
			if (h) break;
		}
		if (h) break;
	}
	if (!h) {
		let n = Error(`Cannot resolve module "${e}" (from: ${f.map((e) => mi(e)).join(`, `)})`);
		if (n.code = `ERR_MODULE_NOT_FOUND`, s && hi(s, o, n), t?.try) return;
		throw n;
	}
	return s && s.set(o, h.href), h.href;
}
function ui(e, t) {
	let n = li(e, t);
	if (!n || !n.startsWith(`file://`) && t?.try) return;
	let r = fileURLToPath(n);
	return si ? bi(r) : r;
}
function di(e, t, n) {
	try {
		return ai(e, t, n);
	} catch {}
}
function fi(e) {
	let t = (Array.isArray(e) ? e : [e]).flatMap((e) => pi(e));
	return t.length === 0 ? [pathToFileURL(`./`)] : t;
}
function pi(e) {
	if (!e) return [];
	if (xi(e)) return [e];
	if (typeof e != `string`) return [];
	if (/^(?:node|data|http|https|file):/.test(e)) return new URL(e);
	try {
		return e.endsWith(`/`) || statSync(e).isDirectory() ? pathToFileURL(e + `/`) : pathToFileURL(e);
	} catch {
		return [pathToFileURL(e + `/`), pathToFileURL(e)];
	}
}
function mi(e) {
	try {
		return fileURLToPath(e);
	} catch {
		return e;
	}
}
function hi(e, t, n) {
	n.stack, e.set(t, n);
}
function gi(e, t) {
	let n;
	return Array.isArray(t?.from) ? n = t.from : t?.from && (n = [t.from]), vi([e]) + _i(t?.conditions) + vi(t?.extensions) + vi(n) + vi(t?.suffixes);
}
function _i(e) {
	return e ? vi([...new Set(e)].sort()) : `2:6:import4:node`;
}
function vi(e) {
	if (!e) return `-`;
	let t = `${e.length}:`;
	for (let n of e) {
		let e = String(n);
		t += `${e.length}:${e}`;
	}
	return t;
}
function yi(e, t) {
	return !e || !t || t === `/` ? e : (e.endsWith(`/`) ? e : e + `/`) + (t.startsWith(`/`) ? t.slice(1) : t);
}
function bi(e) {
	return e.replace(/\\/g, `/`).replace(/^[a-z]:\//, (e) => e.toUpperCase());
}
function xi(e) {
	return e instanceof URL || e?.constructor?.name === `URL`;
}
function Si(e) {
	if (typeof e == `string`) {
		if (e.startsWith(`file:`)) {
			let t = new URL(e);
			return {
				url: t,
				absolutePath: fileURLToPath(t)
			};
		}
		return isAbsolute(e) ? {
			url: pathToFileURL(e),
			absolutePath: e
		} : /^(?:node|data|http|https):/.test(e) ? { external: e } : Xn.includes(e) && !e.includes(`:`) ? { external: `node:${e}` } : { specifier: e };
	}
	if (xi(e)) return e.protocol === `file:` ? {
		url: e,
		absolutePath: fileURLToPath(e)
	} : { external: e.href };
	throw TypeError("id must be a `string` or `URL`");
}
var Ci = H(Nn(), 1);
var wi = H(Yn(), 1);
var Ti = process.platform === `win32`;
var Ei = /^(?<dir>.+[\\/]node_modules[\\/])(?<name>[^@\\/]+|@[^\\/]+[\\/][^\\/]+)(?:[\\/](?<subpath>.+))?$/;
function Di(e) {
	return Ei.exec(e)?.groups || {};
}
var Oi = /^(?!\.)(?<name>[^@/\\]+|@[^/\\]+[/\\][^/\\]+)(?:[/\\](?<subpath>.+))?$/;
function ki(e) {
	return Oi.exec(e)?.groups?.name;
}
async function Ai(e) {
	return JSON.parse(await readFile(e, `utf8`));
}
async function ji(e, t) {
	let n = t;
	for (;;) {
		let t = Vn(n, `node_modules`, e);
		try {
			return await access(Vn(t, `package.json`)), t;
		} catch {}
		let r = qn(n);
		if (r === n) return;
		n = r;
	}
}
async function Mi(e, t) {
	return await writeFile(e, JSON.stringify(t, null, 2), `utf8`);
}
var { nodeFileTrace: Ni, resolve: Pi } = Ci.default, Fi = [
	`node`,
	`import`,
	`default`
], Ii = /\.(?:c|m)?js$/;
async function Li(e, t) {
	let n = Un(t.rootDir || `.`), r = [...e, ...(t.traceInclude || []).filter((e) => Gn(e))];
	await t?.hooks?.traceStart?.(r);
	let i = t.nft?.base ?? `/`, a = {
		exportsOnly: !0,
		processCwd: n,
		conditions: (t.conditions || Fi).filter((e) => ![
			`require`,
			`import`,
			`default`
		].includes(e)),
		...t.nft,
		base: i
	};
	a.resolve ??= async (e, t, n, r) => {
		try {
			return await Pi(e, t, n, r);
		} catch (i) {
			let o = ui(e, {
				from: t,
				conditions: [...a.conditions || [], r ? `require` : `import`],
				try: !0
			});
			if (!o) throw i;
			return n.realpath(o, t);
		}
	};
	let o = await Ni([...r], a);
	await t?.hooks?.traceResult?.(o);
	let s = await zi(o, i), c = {}, l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
	await Bi(Object.values(s), {
		tracedFiles: s,
		tracedPackages: c,
		pkgCache: l,
		seenFiles: u,
		fullTraceInclude: t.fullTraceInclude
	});
	let f = [], p = new Set((t.traceInclude || []).filter((e) => !Gn(e)).map((e) => ki(e) || e));
	if (p.size > 0) {
		let e = new Map([...p].map((e) => [e, /* @__PURE__ */ new Set()])), r = (t, n) => {
			if (!t) return;
			let r = {
				...t.dependencies,
				...t.peerDependencies,
				...t.optionalDependencies
			};
			for (let t of Object.keys(r)) e.get(t)?.add(n);
		};
		for (let e of Object.values(c)) for (let t of Object.values(e.versions)) r(t.pkgJSON, t.path);
		let a = [...new Set(t.traceIncludeRoots || [])].map((e) => Un(n, e));
		await Promise.all(a.map(async (e) => {
			let t = await Ai(Vn(e, `package.json`)).catch(() => null);
			r(t, e);
		}));
		let o = [.../* @__PURE__ */ new Set([
			...t.conditions || Fi,
			`import`,
			`require`,
			`default`
		])];
		for (let [t, r] of e) {
			if (c[t]) continue;
			let e;
			for (let i of [...r, n]) {
				let n = ui(t, {
					try: !0,
					from: i,
					conditions: o
				}) || ui(t + `/package.json`, {
					try: !0,
					from: i
				});
				if (n) {
					let { dir: t, name: r } = Di(n);
					if (t && r) {
						e = Vn(t, r);
						break;
					}
				}
				if (e = await ji(t, i), e) break;
			}
			if (!e) {
				console.warn(`nf3: could not resolve \`traceInclude\` entry ${JSON.stringify(t)} from any root`);
				continue;
			}
			let a = await Ai(Vn(e, `package.json`)).catch(() => null);
			if (!a) continue;
			let l = a.version || `0.0.0`, d = await qi(e);
			c[t] = {
				name: t,
				versions: { [l]: {
					path: e,
					files: d,
					pkgJSON: a
				} }
			};
			let p = Ki(a, e, d);
			for (let n of d) {
				let r = await Ri(i, n);
				u.add(n), r && u.add(r), Ii.test(n) && ((p.size === 0 || p.has(n)) && f.push(n), r && (s[r] = {
					path: r,
					parents: [],
					subpath: Di(r).subpath,
					pkgName: t,
					pkgVersion: l,
					pkgPath: e
				}));
			}
		}
	}
	if (f.length > 0) try {
		let e = await zi(await Ni(f, a), i, u);
		await Bi(Object.values(e), {
			tracedFiles: s,
			tracedPackages: c,
			pkgCache: l,
			seenFiles: u,
			fullTraceInclude: t.fullTraceInclude
		});
	} catch (e) {
		console.error("nf3: failed to trace transitive dependencies of `traceInclude` packages", e);
	}
	await t?.hooks?.tracedFiles?.(s);
	for (let e of Object.values(c)) for (let t of Object.values(e.versions)) {
		let e = t.pkgJSON.optionalDependencies;
		if (e) for (let n of Object.keys(e)) {
			if (c[n]) continue;
			let e = ui(n + `/package.json`, {
				try: !0,
				from: t.path
			}), r = e ? qn(e) : await ji(n, t.path);
			if (!r) continue;
			let i = await Ai(Vn(r, `package.json`)).catch(() => null);
			if (!i) continue;
			let a = i.version || `0.0.0`, o = await qi(r);
			c[n] = {
				name: n,
				versions: { [a]: {
					path: r,
					files: o,
					pkgJSON: i
				} }
			};
		}
	}
	let m = /(?:^|\/)(node-gyp-build(?:-optional-packages)?|bindings|prebuild-install|node-pre-gyp)$/;
	for (let e of Object.values(c)) for (let t of Object.values(e.versions)) {
		let e = {
			...t.pkgJSON.dependencies,
			...t.pkgJSON.devDependencies
		};
		if (!Object.keys(e).some((e) => m.test(e)) && !t.pkgJSON.gypfile) {
			let e = t.pkgJSON.scripts?.install;
			if (!e || !/node-gyp|pre-gyp|prebuild|napi/.test(e)) continue;
		}
		if (d.glob) {
			let e = new Set(t.files);
			for await (let n of d.glob(`**/*.node`, {
				cwd: t.path,
				exclude: (e) => e === `node_modules`
			})) {
				let r = Vn(t.path, n);
				!e.has(r) && await Ji(r) && (e.add(r), t.files.push(r));
			}
		}
	}
	await t?.hooks?.tracedPackages?.(c);
	let h = {}, g = Un(n, t.outDir || `dist`, `node_modules`), _ = Vi(32), v = (t.transform || []).filter((e) => e?.handler), y = /* @__PURE__ */ new Map(), b = (e) => {
		let t = y.get(e);
		return t || (t = d.mkdir(e, { recursive: !0 }).then(() => {}), y.set(e, t)), t;
	}, x = async (e, n, r) => {
		let i = c[e], a = r || i.name;
		await Promise.all(i.versions[n].files.map((e) => _(async () => {
			let { subpath: n } = Di(e);
			if (!n) return;
			let r = Un(g, a, n);
			await b(qn(r));
			let i = v.filter((t) => t.filter?.(e)), o = i.length > 0;
			if (o) {
				let t = await d.readFile(e, `utf8`);
				for (let n of i) t = await n.handler(t, e) ?? t;
				await d.writeFile(r, t, `utf8`);
			} else await d.copyFile(e, r);
			t.chmod === !0 ? o && await d.chmod(r, (await d.stat(e)).mode & 511) : t.chmod && await d.chmod(r, t.chmod);
		})));
		let o = i.versions[n].pkgJSON, s = o.exports ? {
			...o,
			exports: structuredClone(o.exports)
		} : o;
		s.exports && Ui(s.exports);
		let l = Vn(g, a, `package.json`);
		await b(qn(l)), await d.writeFile(l, JSON.stringify(s, null, 2), `utf8`), t.traceAlias && t.traceAlias[a] && (h[t.traceAlias[a]] = n, await S(a, t.traceAlias[a]));
	}, S = async (e, t, n) => {
		let r = Vn(g, e), i = Vn(g, t);
		if ((await d.lstat(i).catch(() => null))?.isSymbolicLink()) {
			if (!n) return;
			await d.unlink(i);
		}
		await d.mkdir(qn(i), { recursive: !0 }), await d.symlink(Kn(qn(i), r), i, Ti ? `junction` : `dir`).catch((n) => {
			n.code !== `EEXIST` && console.error(`Cannot link`, e, `to`, t, n);
		});
	}, C = (e, t) => {
		let n = e.versions[t].files.map((e) => s[e]).filter((e) => e !== void 0);
		return [...new Set(n.flatMap((t) => t.parents.map((t) => {
			let n = s[t];
			return !n || n.pkgName === e.name ? null : `${n.pkgName}@${n.pkgVersion}`;
		}).filter(Boolean)))];
	}, w = {}, T = [];
	for (let e of Object.values(c)) {
		let t = Object.keys(e.versions);
		if (t.length === 1) T.push(e.name);
		else {
			w[e.name] = {};
			for (let n of t) w[e.name][n] = C(e, n);
		}
	}
	let E = {
		packages: {},
		files: {}
	}, D = async (e) => await Ri(i, e) || e;
	await Promise.all(T.map(async (e) => {
		let t = c[e], n = Object.keys(t.versions)[0];
		return E.packages[e] = {
			name: e,
			hoisted: n,
			versions: { [n]: {
				path: await D(t.versions[n].path),
				outPath: `node_modules/${e}`,
				hoisted: !0
			} }
		}, x(e, n);
	})), await Promise.all(Object.entries(w).map(async ([e, t]) => {
		let r = c[e], i = Object.fromEntries(await Promise.all(Object.keys(t).map(async (e) => [e, await D(r.versions[e].path)]))), a = await ji(e, n), o = a && ((await Ai(Vn(a, `package.json`)).catch(() => null))?.version || `0.0.0`), s = Object.entries(t).sort(([e, t], [n, r]) => {
			let i = t.length === 0 ? 1 / 0 : t.length, a = r.length === 0 ? 1 / 0 : r.length;
			if (i !== a) return a - i;
			let s = e === o;
			return s === (n === o) ? Hi(e, n) : s ? -1 : 1;
		});
		E.packages[e] = {
			name: e,
			hoisted: s[0][0],
			versions: Object.fromEntries(s.map(([t], n) => [t, {
				path: i[t],
				outPath: `node_modules/.nf3/${e}@${t}`,
				hoisted: n === 0
			}]))
		};
		for (let [t, [n, r]] of s.entries()) await x(e, n, `.nf3/${e}@${n}`), await S(`.nf3/${e}@${n}`, `${e}`, t === 0), await Promise.all(r.map((t) => {
			let r = t.replace(/@[^@]+$/, ``);
			return w[r] ? S(`.nf3/${e}@${n}`, `.nf3/${t}/node_modules/${e}`) : S(`.nf3/${e}@${n}`, `${r}/node_modules/${e}`);
		}));
	})), t.writePackageJson && await Mi(Un(g, `../package.json`), {
		name: `traced-node-modules`,
		version: `1.0.0`,
		type: `module`,
		private: !0,
		dependencies: Object.fromEntries([...Object.values(E.packages).map((e) => [e.name, e.hoisted]), ...Object.entries(h)].sort(([e], [t]) => e.localeCompare(t)))
	});
	let O = await Promise.all(r.map((e) => Ri(process.cwd(), e)));
	for (let [e, t] of r.entries()) {
		let n = O[e] && s[O[e]], r = n && E.packages[n.pkgName]?.versions[n.pkgVersion]?.outPath;
		r && n.subpath && (E.files[t] = `${r}/${n.subpath}`);
	}
	return await t?.hooks?.tracedLayout?.(E), E;
}
async function Ri(e, t) {
	try {
		return Bn(await d.realpath(Un(e, t)));
	} catch (e) {
		if (e?.code === `ENOENT`) return;
		throw e;
	}
}
async function zi(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = (e) => {
		let n = r.get(e);
		return n || (n = Ri(t, e), r.set(e, n)), n;
	};
	return Object.fromEntries(await Promise.all([...e.reasons.entries()].map(async ([e, t]) => {
		if (t.ignored) return;
		let r = await i(e);
		if (!r?.includes(`node_modules`) || n?.has(r) || !await Ji(r)) return;
		let { dir: a, name: o, subpath: s } = Di(r);
		if (!a || !o) return;
		let c = Vn(a, o);
		return [r, {
			path: r,
			parents: (await Promise.all([...t.parents].map((e) => i(e)))).filter((e) => e !== void 0),
			subpath: s,
			pkgName: o,
			pkgPath: c
		}];
	})).then((e) => e.filter(Boolean)));
}
async function Bi(e, t) {
	let { tracedFiles: n, tracedPackages: r, pkgCache: i, seenFiles: a, fullTraceInclude: o } = t;
	for (let t of e) {
		if (a.has(t.path)) continue;
		a.add(t.path), n[t.path] = t;
		let e = t.pkgName, s = r[e], c = i.get(t.pkgPath);
		c || (c = await Ai(Vn(t.pkgPath, `package.json`)).catch(() => ({
			name: e,
			version: `0.0.0`
		})), i.set(t.pkgPath, c)), s || (s = {
			name: e,
			versions: {}
		}, r[e] = s);
		let l = s.versions[c.version || `0.0.0`];
		if (!l) {
			l = {
				path: t.pkgPath,
				files: [],
				pkgJSON: c
			}, s.versions[c.version || `0.0.0`] = l;
			let n = Wi(o, e);
			if (n) {
				if (n.glob) {
					if (!d.glob) throw Error("`fullTraceInclude` glob requires Node.js >= 22.0.0 (fs.promises.glob)");
					for await (let e of d.glob(n.glob, {
						cwd: t.pkgPath,
						exclude: (e) => e === `node_modules`
					})) {
						let n = Vn(t.pkgPath, e);
						await Ji(n) && l.files.push(n);
					}
				} else l.files.push(...await qi(t.pkgPath));
			}
		}
		l.files.push(t.path), t.pkgName = e, t.pkgVersion = c.version || `0.0.0`;
	}
}
function Vi(e) {
	let t = 0, n = [];
	return function(r) {
		return new Promise((i, a) => {
			let o = () => {
				t++, r().then(i, a).finally(() => {
					t--, n.shift()?.();
				});
			};
			t < e ? o() : n.push(o);
		});
	};
}
function Hi(e = `0.0.0`, t = `0.0.0`) {
	try {
		return (0, wi.default)(e, t, { loose: !0 }) ? 1 : -1;
	} catch {
		return e.localeCompare(t);
	}
}
function Ui(e) {
	if (e && typeof e != `string` && !Array.isArray(e)) {
		`production` in e && (typeof e.production == `string` ? e.default = e.production : Object.assign(e, e.production));
		for (let t in e) t !== `production` && Ui(e[t]);
	}
}
function Wi(e, t) {
	if (e) {
		for (let n of e) if (typeof n == `string`) {
			if (n === t) return {};
		} else if (n[0] === t) return n[1];
	}
}
function Gi(e, t) {
	if (typeof e == `string`) t.push(e);
	else if (Array.isArray(e)) for (let n of e) Gi(n, t);
	else if (e && typeof e == `object`) for (let n of Object.values(e)) Gi(n, t);
}
function Ki(e, t, n) {
	let r = [];
	typeof e.main == `string` && r.push(e.main), typeof e.module == `string` && r.push(e.module), Gi(e.exports, r);
	let i = e.bin;
	if (typeof i == `string`) r.push(i);
	else if (i && typeof i == `object`) for (let e of Object.values(i)) typeof e == `string` && r.push(e);
	let a = new Set(n), o = /* @__PURE__ */ new Set();
	for (let e of r) {
		let n = Vn(t, e);
		Ii.test(n) && a.has(n) && o.add(n);
	}
	return o;
}
async function qi(e) {
	let t = [];
	for (let n of await d.readdir(e, {
		recursive: !0,
		withFileTypes: !0
	})) {
		let r = Vn(n.parentPath, n.name);
		r.slice(e.length).split(`/`).includes(`node_modules`) || (n.isFile() || n.isSymbolicLink() && await Ji(r)) && t.push(r);
	}
	return t;
}
async function Ji(e) {
	try {
		return (await d.stat(e)).isFile();
	} catch (e) {
		if (e?.code === `ENOENT`) return !1;
		throw e;
	}
}
export { Li as traceNodeModules };
