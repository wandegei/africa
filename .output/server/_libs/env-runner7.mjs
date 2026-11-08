import { B as B$1, H as H$1, Q as Q$1, U as U$1, V as V$1, X as X$1, ce as ce$1, d, fe as fe$1, i, ie as ie$1, j, le as le$1, on, pe as pe$1, pe$1 as pe$2, x, y } from "./env-runner.mjs";
import { i as i$1 } from "./env-runner4.mjs";
import { d as d$1, r } from "./env-runner6.mjs";
import { createRequire } from "node:module";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { parseEnv } from "node:util";
// node_modules/env-runner/dist/_chunks/miniflare-runner.mjs
function L(e, t) {
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = t[r] = (t[r] && t[r] !== i ? t[r] : R(i, t, n)).replace(/\\\$/g, `$`);
	return t;
}
function R(e, t, n) {
	let r = {
		...n,
		...t
	}, i = /(?<!\\)\$\{([^{}]+)\}|(?<!\\)\$([A-Za-z_][A-Za-z0-9_]*)/g, a = /* @__PURE__ */ new Set(), o = e, s;
	for (; (s = i.exec(o)) !== null;) {
		a.add(o);
		let [e, t, c] = s, l = t || c, u = l.match(/(:\+|\+|:-|-)/)?.[0], d = u ? l.split(u) : [l], f = d.shift(), p;
		if (u === `:+` || u === `+`) p = r[f] ? d.join(u) : ``;
		else {
			let e = r[f];
			p = e && !a.has(e) ? e : d.join(u ?? ``);
		}
		if (o = o.replace(e, p), o === n[f]) break;
		i.lastIndex = 0;
	}
	return o;
}
function z(e) {
	return existsSync(e) ? parseEnv(readFileSync(e, `utf8`)) : void 0;
}
function B(e, t) {
	let n = process.env[e]?.toLowerCase();
	return n === `true` || n !== `false` && t;
}
function re(e) {
	let { configDir: t, env: n, envFiles: r } = e;
	if (!r?.length) {
		let e = resolve(t, `.dev.vars`), r = n !== void 0 && z(`${e}.${n}`) || z(e);
		if (r) return r;
	}
	if (!B(`CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV`, !0)) return;
	let i = r ?? [
		`.env`,
		`.env.local`,
		...n ? [`.env.${n}`, `.env.${n}.local`] : []
	], a = {};
	for (let e of i) Object.assign(a, z(resolve(t, e)));
	let o = {};
	if (e.hasSecrets || B(`CLOUDFLARE_INCLUDE_PROCESS_ENV`, !1)) for (let [e, t] of Object.entries(process.env)) typeof t == `string` && (o[e] = t);
	return L(a, o);
}
var ie = [
	`wrangler.json`,
	`wrangler.jsonc`,
	`wrangler.toml`
];
var ae = /* @__PURE__ */ new Set([
	`name`,
	`script`,
	`scriptPath`,
	`modules`,
	`modulesRoot`,
	`modulesRules`,
	`unsafeDirectSockets`,
	`unsafeEvalBinding`,
	`unsafeModuleFallbackService`,
	`unsafeUseModuleFallbackService`
]);
var V = /* @__PURE__ */ new Set([
	`assets`,
	`serviceBindings`,
	`queueConsumers`,
	`tails`,
	`streamingTails`
]);
var H = {
	assets: `assets`,
	serviceBindings: `services`,
	workflows: `workflows`,
	queueConsumers: `queues.consumers`,
	tails: `tail_consumers`,
	streamingTails: `streaming_tail_consumers`,
	durableObjects: `durable_objects`
};
function U(e, t, n) {
	let r = e.get(t);
	r || (r = /* @__PURE__ */ new Set(), e.set(t, r));
	for (let e of n) r.add(e);
}
function W(e) {
	if (e.size === 0) return;
	let t = [...e].map(([e, t]) => t.size > 0 ? `${e} (${[...t].join(`, `)})` : e).join(`, `);
	console.warn(`[env-runner] wrangler config options not supported by the miniflare dev runner were ignored: ${t}; pass them via miniflareOptions to opt in.`);
}
function G(e) {
	return typeof e == `object` && !!e && !Array.isArray(e);
}
function K(e) {
	return G(e);
}
async function q(e) {
	let { wrangler: t, env: n, entryPath: r, wranglerModule: i, envFiles: a } = e;
	if (!t) return {};
	let o = K(t) ? t : void 0, s, c = typeof t == `string` ? t : e.configPath;
	if (c) {
		if (s = resolve(c), !existsSync(s)) {
			if (console.warn(`[env-runner] wrangler config requested but not found at "${s}"`), !o) return {};
			s = void 0;
		}
	} else if (s = le(r), !s && !o) return console.warn(`[env-runner] wrangler config requested but none found (searched the entry's directory, then from the cwd up to the filesystem root)`), {};
	let l = await i$1({
		name: `wrangler`,
		option: `wranglerModule`,
		value: i
	}), u = /* @__PURE__ */ new Map();
	if (!l?.unstable_readConfig || !l.unstable_getMiniflareWorkerOptions) {
		let e = /* @__PURE__ */ new Map(), t = s ? xe(s, n) : void 0, r = o ? Se(o, n) : void 0, i = se(t && (we(t.config, u, e) ?? {}), r && we(r, u, e));
		return (t || r) && (i = De(i, [t?.config, r], {
			configDir: s ? dirname(s) : process.cwd(),
			env: n,
			envFiles: a
		})), he(i, u, (o && Ce(o, n)) ?? t?.workerName), W(u), be(e), {
			options: i,
			configFile: t ? s : void 0,
			exports: ge(t?.config.exports, r?.exports)
		};
	}
	let d = !1, f, p, m, h;
	if (s) try {
		let e = l.unstable_readConfig({
			config: s,
			env: n
		}, { hideWarnings: !oe(s, n) });
		f = de(l.unstable_getMiniflareWorkerOptions(e, n, { envFiles: a }).workerOptions, u), m = e?.name, p = e?.secrets, h = e?.exports, d = !0;
	} catch (e) {
		Y(`"${s}"`, e);
	}
	let g, _;
	if (o) try {
		let e = n && G(o.env) && o.env[n] ? n : void 0, { env: t, ...r } = o, i = ce(l, e ? o : r, e);
		i.userConfigPath = s, _ = i.exports, d && i.secrets === void 0 && (i.secrets = p), g = de(l.unstable_getMiniflareWorkerOptions(i, n, { envFiles: a }).workerOptions, u), g && (delete g.rootPath, d && X(g, f, i));
	} catch (e) {
		Y(`(inline)`, e);
	}
	let y = se(f, g);
	return he(y, u, (o && Ce(o, n)) ?? m), W(u), {
		options: y,
		configFile: d ? s : void 0,
		exports: ge(h, _)
	};
}
var J = /* @__PURE__ */ new Set();
function oe(e, t) {
	let n = ``;
	try {
		let t = statSync(e);
		n = `${t.mtimeMs}:${t.size}`;
	} catch {}
	let r = JSON.stringify([
		resolve(e),
		t ?? null,
		n
	]);
	return !J.has(r) && (J.add(r), !0);
}
function Y(e, t) {
	console.warn(`[env-runner] failed to load wrangler config ${e}: ${t.message}`);
}
function se(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = { ...e };
	for (let [e, r] of Object.entries(t)) {
		let t = n[e];
		n[e] = Array.isArray(r) && Array.isArray(t) ? [.../* @__PURE__ */ new Set([...t, ...r])] : G(r) && G(t) ? {
			...t,
			...r
		} : r;
	}
	return n;
}
function X(e, t, n) {
	if (!G(e.bindings)) return;
	let r = G(t?.bindings) ? t.bindings : {}, i = /* @__PURE__ */ new Set([...Object.keys(n.vars ?? {}), ...n.secrets?.required ?? []]);
	e.bindings = Object.fromEntries(Object.entries(e.bindings).filter(([e]) => i.has(e) || Object.hasOwn(r, e)));
}
function ce(e, t, n) {
	let r = mkdtempSync(join(tmpdir(), `env-runner-wrangler-`)), i = join(r, `wrangler.json`);
	try {
		return writeFileSync(i, JSON.stringify(t)), e.unstable_readConfig({
			config: i,
			env: n
		}, { hideWarnings: !0 });
	} finally {
		rmSync(r, {
			recursive: !0,
			force: !0
		});
	}
}
var Z = /* @__PURE__ */ new Set();
function le(e) {
	let t = process.cwd(), n = t;
	if (e) {
		let r = dirname(resolve(e)), i = relative(t, r);
		if (i === `` || i !== `..` && !i.startsWith(`..${sep}`) && !isAbsolute(i)) n = r;
		else {
			let e = ue(r);
			if (e) return e;
		}
	}
	for (let e = n;; e = dirname(e)) {
		let r = ue(e);
		if (r) return e !== t && e !== n && !Z.has(r) && (Z.add(r), console.info(`[env-runner] using wrangler config from a parent directory: ${r}`)), r;
		if (dirname(e) === e) return;
	}
}
function ue(e) {
	for (let t of ie) {
		let n = join(e, t);
		if (existsSync(n)) return n;
	}
}
function de(e, t) {
	let n = {};
	for (let [r, i] of Object.entries(e)) i === void 0 || ae.has(r) || (V.has(r) ? pe(i) || U(t, H[r], me(i)) : fe(r, i) || (n[r] = i));
	return Object.keys(n).length > 0 ? n : void 0;
}
function fe(e, t) {
	let n = (e) => Array.isArray(e) && e.length === 0;
	return n(t) || G(t) && Object.keys(t).length === 0 ? !0 : e !== `bindings` && G(t) && Object.values(t).every(n);
}
function pe(e) {
	return !e || Array.isArray(e) && e.length === 0 || G(e) && Object.keys(e).length === 0;
}
function me(e) {
	return Array.isArray(e) ? e.map((e) => e?.name).filter((e) => typeof e == `string`) : G(e) ? `directory` in e ? typeof e.binding == `string` ? [e.binding] : [] : Object.keys(e) : [];
}
function he(e, t, n) {
	for (let [r, i] of [[`durableObjects`, `durable_objects`], [`workflows`, `workflows`]]) {
		let a = e?.[r];
		if (!e || !G(a)) continue;
		let o = {};
		for (let [e, r] of Object.entries(a)) if (typeof r == `string` || G(r) && !r.scriptName) o[e] = r;
		else if (G(r) && n && r.scriptName === n) {
			let { scriptName: t, ...n } = r;
			o[e] = n;
		} else {
			let n = G(r) ? r.scriptName : void 0;
			U(t, i, [`${e} → script "${String(n)}"`]);
		}
		Object.keys(o).length > 0 ? e[r] = o : delete e[r];
	}
}
function ge(e, t) {
	if (G(e) || G(t)) return {
		...G(e) ? e : void 0,
		...G(t) ? t : void 0
	};
}
var _e = /* @__PURE__ */ new Set(/* @__PURE__ */ `vars.secrets.define.durable_objects.workflows.kv_namespaces.cloudchamber.containers.send_email.queues.connect.r2_buckets.d1_databases.vectorize.ai_search_namespaces.ai_search.websearch.agent_memory.hyperdrive.services.analytics_engine_datasets.dispatch_namespaces.mtls_certificates.tail_consumers.streaming_tail_consumers.unsafe.browser.ai.images.stream.media.pipelines.secrets_store_secrets.artifacts.unsafe_hello_world.flagship.worker_loaders.ratelimits.vpc_services.vpc_networks.version_metadata`.split(`.`));
var ve = /* @__PURE__ */ `hyperdrive.analytics_engine_datasets.ai.ai_search_namespaces.ai_search.websearch.agent_memory.version_metadata.ratelimits.send_email.secrets_store_secrets.vectorize.browser.images.stream.media.pipelines.dispatch_namespaces.mtls_certificates.worker_loaders.vpc_services.vpc_networks.artifacts.flagship.containers.unsafe.unsafe_hello_world.logfwdr.wasm_modules.text_blobs.data_blobs`.split(`.`);
var ye = [
	`kvNamespaces`,
	`r2Buckets`,
	`d1Databases`,
	`queueProducers`,
	`durableObjects`
];
function be(e) {
	if (e.size === 0) return;
	let t = [...e].map(([e, t]) => t.size > 0 ? `${e} (${[...t].join(`, `)})` : e).join(`, `);
	console.warn(`[env-runner] wrangler config bindings not supported by the built-in minimal wrangler config reader were ignored: ${t}; install 'wrangler' (or pass it as \`wranglerModule\`) to use them.`);
}
function xe(e, t) {
	let n = extname(e).toLowerCase();
	if (n !== `.json` && n !== `.jsonc`) {
		console.warn(`[env-runner] reading "${basename(e)}" requires the 'wrangler' package; the built-in reader supports JSON/JSONC only (install 'wrangler' for TOML).`);
		return;
	}
	let r;
	try {
		r = readFileSync(e, `utf8`);
	} catch {
		return;
	}
	let i;
	try {
		i = ke(r);
	} catch (t) {
		console.warn(`[env-runner] failed to parse wrangler config "${e}": ${t.message}`);
		return;
	}
	if (!G(i)) {
		Y(`"${e}"`, /* @__PURE__ */ Error(`config must be an object`));
		return;
	}
	let a;
	try {
		a = Se(i, t, e);
	} catch (t) {
		Y(`"${e}"`, t);
		return;
	}
	return {
		config: a,
		workerName: Ce(i, t)
	};
}
function Se(e, t, n) {
	let { env: r, ...i } = e;
	if (!t) return i;
	let a = G(r) ? r[t] : void 0, o = [], s;
	if (G(a)) {
		s = {};
		for (let [e, n] of Object.entries(i)) _e.has(e) ? a[e] === void 0 && o.push(`"${e}" exists at the top level, but is not inherited by "env.${t}"`) : s[e] = n;
		Object.assign(s, a);
	} else {
		if (n && G(r)) throw Error(`No environment found in configuration with name "${t}". The available configured environment names are: ${JSON.stringify(Object.keys(r))}`);
		o.push(`No environment found in configuration with name "${t}"`), s = i;
	}
	return n && o.length > 0 && oe(n, t) && console.warn(`[env-runner] wrangler config "${n}": ${o.join(`; `)}.`), s;
}
function Ce(e, t) {
	let n = t ? e.env?.[t]?.name : void 0;
	if (typeof n == `string`) return n;
	if (typeof e.name == `string` && e.name) return t ? `${e.name}-${t}` : e.name;
}
function we(e, t, n) {
	let r = {};
	for (let [n, r, i] of [
		[
			`services`,
			e.services,
			`binding`
		],
		[
			`assets`,
			e.assets,
			`binding`
		],
		[
			`queues.consumers`,
			e.queues?.consumers,
			`queue`
		],
		[
			`tail_consumers`,
			e.tail_consumers,
			`service`
		],
		[
			`streaming_tail_consumers`,
			e.streaming_tail_consumers,
			`service`
		]
	]) pe(r) || U(t, n, (Array.isArray(r) ? r : [r]).map((e) => e?.[i]).filter((e) => typeof e == `string`));
	for (let t of ve) {
		let r = e[t], i = G(r) && Array.isArray(r.bindings) ? r.bindings : r;
		pe(i) || U(n, t, Ee(i));
	}
	typeof e.compatibility_date == `string` && (r.compatibilityDate = e.compatibility_date), Array.isArray(e.compatibility_flags) && (r.compatibilityFlags = e.compatibility_flags), e.vars && typeof e.vars == `object` && (r.bindings = { ...e.vars });
	let i = Ae(e.kv_namespaces, `binding`, (e) => Oe(e.preview_id, e.id, e.binding));
	i && (r.kvNamespaces = i);
	let a = Ae(e.r2_buckets, `binding`, (e) => Oe(e.preview_bucket_name, e.bucket_name, e.binding));
	a && (r.r2Buckets = a);
	let o = Ae(e.d1_databases, `binding`, (e) => Oe(e.preview_database_id, e.database_id, e.binding));
	o && (r.d1Databases = o);
	let s = Ae(e.queues?.producers, `binding`, (e) => e.queue);
	s && (r.queueProducers = s);
	let c = Te(e), l = Array.isArray(e.durable_objects?.bindings) ? e.durable_objects.bindings : [], u = {};
	for (let e of l) e?.name && e?.class_name && (u[e.name] = {
		className: e.class_name,
		...e.script_name ? { scriptName: e.script_name } : {},
		...c.has(e.class_name) ? { useSQLite: c.get(e.class_name) } : {}
	});
	Object.keys(u).length > 0 && (r.durableObjects = u);
	let d = [...c].filter(([e]) => !l.some((t) => t?.class_name === e)).map(([e, t]) => ({
		className: e,
		useSQLite: t
	}));
	d.length > 0 && (r.additionalUnboundDurableObjects = d);
	let f = {};
	for (let t of Array.isArray(e.workflows) ? e.workflows : []) t?.binding && t?.name && t?.class_name && (f[t.binding] = {
		name: t.name,
		className: t.class_name,
		...t.script_name ? { scriptName: t.script_name } : {},
		...t.limits?.steps === void 0 ? {} : { stepLimit: t.limits.steps }
	});
	Object.keys(f).length > 0 && (r.workflows = f);
	let p = {};
	for (let [t, n] of G(e.exports) ? Object.entries(e.exports) : []) n?.type === `workflow` && typeof n.name == `string` && (p[t] = {
		name: n.name,
		...n.limits?.steps === void 0 ? {} : { stepLimit: n.limits.steps }
	});
	return Object.keys(p).length > 0 && (r.workflowExports = p), Object.keys(r).length > 0 ? r : void 0;
}
function Te(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of Array.isArray(e.migrations) ? e.migrations : []) {
		for (let e of n?.deleted_classes ?? []) t.delete(e);
		for (let { from: e, to: r } of n?.renamed_classes ?? []) {
			let n = t.get(e);
			n !== void 0 && (t.delete(e), t.set(r, n));
		}
		for (let e of n?.new_classes ?? []) t.set(e, !1);
		for (let e of n?.new_sqlite_classes ?? []) t.set(e, !0);
	}
	if (G(e.exports)) for (let [n, r] of Object.entries(e.exports)) {
		let e = r?.state;
		r?.type === `durable-object` && (e === void 0 || e === `created` || e === `expecting-transfer`) && t.set(n, r.storage === `sqlite`);
	}
	return t;
}
function Ee(e) {
	return G(e) && typeof e.binding != `string` ? Object.keys(e) : (Array.isArray(e) ? e : [e]).map((e) => e?.binding ?? e?.name ?? e?.class_name).filter((e) => typeof e == `string`);
}
function De(e, t, n) {
	let r = t.map((e) => e?.secrets).filter(G), i = re({
		...n,
		hasSecrets: r.length > 0
	});
	if (!i) return e;
	let a = { ...e }, o = G(a.bindings) ? { ...a.bindings } : {}, s = new Set(ye.flatMap((e) => G(a[e]) ? Object.keys(a[e]) : [])), c = new Set(r.flatMap((e) => Array.isArray(e.required) ? e.required : [])), l = !1;
	for (let [e, t] of Object.entries(i)) s.has(e) || r.length > 0 && !Object.hasOwn(o, e) && !c.has(e) || (o[e] = t, l = !0);
	let u = [...c].filter((e) => !Object.hasOwn(i, e));
	return u.length > 0 && console.warn(`[env-runner] missing required wrangler secrets: ${u.join(`, `)}. Add them to .dev.vars, .env, or set as environment variables.`), l ? (a.bindings = o, a) : e;
}
function Oe(...e) {
	return e.find((e) => typeof e == `string`);
}
function ke(e) {
	let t = ``, n = -1, r = e.charCodeAt(0) === 65279 ? e.slice(1) : e;
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		if (i === `/` && (r[e + 1] === `/` || r[e + 1] === `*`)) {
			let n = r[e + 1] === `/`, i = n ? r.indexOf(`
`, e) : r.indexOf(`*/`, e + 2);
			i = i === -1 ? r.length : n ? i : i + 2, t += r.slice(e, i).replace(/[^\n]/g, ` `), e = i - 1;
		} else if (/\s/.test(i)) t += i;
		else if ((i === `}` || i === `]`) && n !== -1 && (t = `${t.slice(0, n)} ${t.slice(n + 1)}`), n = -1, i === `"`) {
			let n = e + 1;
			for (; n < r.length && r[n] !== `"`;) n += r[n] === `\\` ? 2 : 1;
			t += r.slice(e, n + 1), e = n;
		} else i === `,` && (n = t.length), t += i;
	}
	return JSON.parse(t);
}
function Ae(e, t, n) {
	if (!Array.isArray(e)) return;
	let r = {};
	for (let i of e) {
		let e = i?.[t];
		typeof e == `string` && (r[e] = n(i));
	}
	return Object.keys(r).length > 0 ? r : void 0;
}
function je(e, t, n, r) {
	let i = [
		`alarm`,
		`connect`,
		`fetch`,
		`webSocketClose`,
		`webSocketError`,
		`webSocketMessage`
	], a = [
		`connect`,
		`email`,
		`fetch`,
		`queue`,
		`tail`,
		`tailStream`,
		`test`,
		`trace`,
		`scheduled`
	], o = [`self`], s = Symbol(`instance`), c = Symbol(`ensureInstance`), l = {
		DurableObject: (e) => `add a "durable_objects" binding for it, or "exports": { "${e}": { "type": "durable-object" } }`,
		WorkerEntrypoint: (e) => `add "exports": { "${e}": { "type": "worker" } }`,
		WorkflowEntrypoint: (e) => `add a "workflows" entry with "class_name": "${e}"`
	};
	function u(e, t) {
		return `Expected "${e}" export of the entry to ${t}`;
	}
	function d(t, n) {
		return typeof t == `function` && t.prototype instanceof e[n];
	}
	function f(e, t) {
		return t === `DurableObject` ? typeof e == `function` : t === `WorkerEntrypoint` && typeof e == `object` && e ? !0 : d(e, t);
	}
	async function p(e, r) {
		await n.ensureEntry(e);
		let i = (await n.entryExports())?.[r];
		if (i === void 0) throw TypeError(`"${r}" is declared as a ${t[r]} but the entry does not export it.`);
		return i;
	}
	function m(t, r, i, a, o = ``) {
		let s = typeof r == `function` ? new r(t.ctx, n.userEnv(t.env)) : void 0;
		if (!(s instanceof e[a])) throw TypeError(u(i, `be a subclass of \`${a}\`${o}.`));
		return s;
	}
	function h(e, t, n) {
		if (typeof e[n] != `function`) throw TypeError(u(t, `define a \`${n}()\` method.`));
		return e[n].bind(e);
	}
	function g(e, t) {
		let n = async (...n) => {
			let r = await t;
			if (typeof r != `function`) throw TypeError(`"${e}" is not a function.`);
			return r(...n);
		};
		return n.then = (e, n) => t.then(e, n), n.catch = (e) => t.catch(e), n.finally = (e) => t.finally(e), n;
	}
	function _(e, t, n) {
		if (!Reflect.has(e.prototype, n)) throw Reflect.has(t, n) ? TypeError(`The RPC receiver's prototype does not implement "${n}", but the receiver instance does.\nOnly properties and methods defined on the prototype can be accessed over RPC.
Ensure properties are declared as \`get ${n}() { ... }\` instead of \`${n} = ...\`,\nand methods are declared as \`${n}() { ... }\` instead of \`${n} = () => { ... }\`.`) : TypeError(`The RPC receiver does not implement "${n}".`);
		let r = Reflect.get(e.prototype, n, t);
		return typeof r == `function` ? r.bind(t) : r;
	}
	function v(e, t, n) {
		return new Proxy(e, { get(e, r, i) {
			let a = Reflect.get(e, r, i);
			if (a !== void 0) return a;
			if (!(typeof r == `symbol` || o.includes(r) || t.includes(r))) return g(r, n(i, r));
		} });
	}
	function y(t) {
		class r extends e.DurableObject {
			constructor(n, r) {
				return super(n, r), v(this, a, async (n, r) => {
					let { ctor: i, instance: a } = await n[c]();
					if (!(a instanceof e.DurableObject)) throw TypeError(u(t, "be a subclass of `DurableObject` for RPC."));
					return _(i, a, r);
				});
			}
			async [c]() {
				let e = await p(this.env, t);
				if (typeof e != `function`) throw TypeError(u(t, `be a Durable Object class.`));
				let r = this;
				return r[s] && r[s].ctor === e || (r[s] = {
					ctor: e,
					instance: new e(this.ctx, n.userEnv(this.env))
				}, await this.ctx.blockConcurrencyWhile(async () => {})), r[s];
			}
		}
		for (let e of i) r.prototype[e] = async function(...n) {
			let { instance: r } = await this[c]();
			return h(r, t, e)(...n);
		};
		return r;
	}
	function b(t) {
		class r extends e.WorkerEntrypoint {
			constructor(e, n) {
				return super(e, n), v(this, i, async (e, n) => {
					let r = await p(e.env, t);
					return _(r, m(e, r, t, `WorkerEntrypoint`, ` for RPC`), n);
				});
			}
		}
		for (let e of a) r.prototype[e] = async function(r) {
			let i = await p(this.env, t);
			if (typeof i == `function`) return h(m(this, i, t, `WorkerEntrypoint`), t, e)(r);
			if (typeof i?.[e] != `function`) throw TypeError(u(t, `define a \`${e}()\` handler.`));
			return i[e](r, n.userEnv(this.env), this.ctx);
		};
		return r;
	}
	function x(t) {
		class n extends e.WorkflowEntrypoint {
			async run(...e) {
				let n = await p(this.env, t);
				return h(m(this, n, t, `WorkflowEntrypoint`), t, `run`)(...e);
			}
		}
		return n;
	}
	let S = {
		DurableObject: y,
		WorkerEntrypoint: b,
		WorkflowEntrypoint: x
	}, C = {};
	for (let [e, n] of Object.entries(t)) C[e] = S[n](e);
	async function w() {
		let i;
		try {
			i = await n.entryExports();
		} catch {
			return;
		}
		if (!i || typeof i != `object`) return;
		let a = [];
		for (let [e, n] of Object.entries(t)) {
			let t = i[e];
			t === void 0 ? a.push(`"${e}" is declared as a ${n} but not exported by the entry.`) : f(t, n) || a.push(`"${e}" is declared as a ${n} but its export is not a ${n}.`);
		}
		for (let t of Object.keys(i)) {
			if (t === "default" || r.includes(t)) continue;
			let n = Object.keys(e).find((e) => d(i[t], e));
			n && a.push(`"${t}" extends ${n} but the wrangler config doesn't declare it: ${l[n](t)} to deploy it.`);
		}
		return a;
	}
	function T(e) {
		for (let t = Object.getPrototypeOf(e); t && t !== Function.prototype; t = Object.getPrototypeOf(t)) if (Function.prototype.toString.call(t).includes(`[native code]`)) return !0;
		return !1;
	}
	async function E() {
		let t;
		try {
			t = await n.entryExports();
		} catch {
			return;
		}
		if (!t || typeof t != `object`) return;
		let r = {};
		for (let [n, i] of Object.entries(t)) {
			if (n === "default" || typeof i != `function`) continue;
			let t = Object.keys(e).find((e) => d(i, e));
			t ? r[n] = t : /^class\b/.test(Function.prototype.toString.call(i)) && !T(i) && (r[n] = `DurableObject`);
		}
		return r;
	}
	return {
		stubs: C,
		checkExports: w,
		exportTypes: E
	};
}
var Me = {
	"durable-object": `DurableObject`,
	worker: `WorkerEntrypoint`,
	workflow: `WorkflowEntrypoint`
};
var Ne = new Set(Object.values(Me));
function Pe(e) {
	return typeof e == `string` && Ne.has(e);
}
function Fe(e) {
	let { options: t } = e, n = {}, r = [...G(t.durableObjects) ? Object.values(t.durableObjects) : [], ...Array.isArray(t.additionalUnboundDurableObjects) ? t.additionalUnboundDurableObjects : []];
	for (let e of r) {
		let t = Ie(e);
		t && (n[t] = `DurableObject`);
	}
	for (let e of G(t.workflows) ? Object.values(t.workflows) : []) {
		let t = typeof e == `string` ? void 0 : Ie(e);
		t && (n[t] = `WorkflowEntrypoint`);
	}
	for (let e of G(t.workflowExports) ? Object.keys(t.workflowExports) : []) n[e] = `WorkflowEntrypoint`;
	for (let [t, r] of Object.entries(e.wranglerExports || {})) {
		let e = r?.type && Me[r.type];
		e && (e !== `DurableObject` || Re(r)) && (n[t] = e);
	}
	for (let [t, r] of Object.entries(e.explicit || {})) n[t] = Pe(r?.type) ? r.type : `DurableObject`;
	return n;
}
function Ie(e) {
	return typeof e == `string` ? e : G(e) && !e.scriptName && typeof e.className == `string` ? e.className : void 0;
}
function Le(e, t = Object.keys(e)) {
	let n = Object.keys(e).map((e, t) => `const __stub${t} = __workerExports.stubs[${JSON.stringify(e)}];\nexport { __stub${t} as ${JSON.stringify(e)} };`).join(`
`);
	return `import {
  DurableObject as __DurableObject,
  WorkerEntrypoint as __WorkerEntrypoint,
  WorkflowEntrypoint as __WorkflowEntrypoint,
} from "cloudflare:workers";

const __workerExports = (${je.toString()})(
  {
    DurableObject: __DurableObject,
    WorkerEntrypoint: __WorkerEntrypoint,
    WorkflowEntrypoint: __WorkflowEntrypoint,
  },
  ${JSON.stringify(e)},
  { ensureEntry: __ensureEntry, entryExports: __entryExports, userEnv: __userEnv },
  ${JSON.stringify(t)},
);
const __checkExports = __workerExports.checkExports;
const __exportTypes = __workerExports.exportTypes;
${n}
`;
}
function Re(e) {
	return e.state === void 0 || e.state === `created` || e.state === `expecting-transfer`;
}
var ze = `__ENV_RUNNER_IPC`;
var Be = `__ENV_RUNNER_UNSAFE_EVAL__`;
function Ve(e, t) {
	let n = t?.nodeCompat === !1 ? `` : `import __process from "node:process";
if (!globalThis.process) { globalThis.process = __process; }`, r = t?.dynamicOnly ? `` : `export * from ${JSON.stringify(e)};`, i = typeof t?.exports == `string` ? `export * from ${JSON.stringify(t.exports)};\nconst __checkExports = async () => undefined;\nconst __exportTypes = async () => undefined;` : Le(t?.exports || {}, t?.configuredExports), a = t?.captureErrors ?? !0, o = Object.entries(t?.crossws || {}).filter(([, e]) => e !== void 0), s = o.length > 0 ? Object.fromEntries(o) : null, c = a ? `try {
      return await __server.fetch(request, env, ctx);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      const body = JSON.stringify({
        error: error.message,
        stack: error.stack,
        name: error.constructor?.name || "Error",
      });
      return new Response(body, {
        status: 500,
        headers: { "Content-Type": "application/json", "X-Env-Runner-Error": "1" },
      });
    }` : `return __server.fetch(request, env, ctx);`;
	return `${n}
${r}
${i}

const __IPC_PATH = "/__env_runner_ipc";
const __IPC_BINDING = "${ze}";
const __UNSAFE_EVAL_BINDING = "${Be}";
const __entryPath = ${JSON.stringify(e)};
const __crosswsServerPath = ${JSON.stringify(t?.crosswsServer || `crossws/server`)};
const __crosswsCloudflare = ${JSON.stringify(s)};
let __entryModule;
let __userEntry;
let __entryLoading;
let __server;
let __ipcInitialized = false;
let __serverWs;
// Raw env of the latest user request. Kept after the request ends: requests
// overlap and streamed bodies outlive fetch(), and unlike \`__serverWs\` the
// IPC binding works from any request context.
let __ipcEnv;
// \`crossws/server\`'s plugin, loaded with the first entry that has \`websocket\`.
let __crosswsPlugin;

const __userEnvs = new WeakMap();

// \`env\` without env-runner's internal bindings (cached per env object).
function __userEnv(env) {
  let userEnv = __userEnvs.get(env);
  if (!userEnv) {
    userEnv = { ...env };
    delete userEnv[__IPC_BINDING];
    delete userEnv[__UNSAFE_EVAL_BINDING];
    __userEnvs.set(env, userEnv);
  }
  return userEnv;
}

// The entry's \`websocket\` with the runner's \`crossws\` option under its own
// \`options.cloudflare\` (its defined values win). Only \`options\` is shadowed,
// so hooks on a prototype (or getters) stay visible to crossws.
function __websocketOptions(websocket) {
  if (!__crosswsCloudflare) return websocket;
  const cloudflare = { ...__crosswsCloudflare };
  for (const [key, value] of Object.entries(websocket.options?.cloudflare || {})) {
    if (value !== undefined) cloudflare[key] = value;
  }
  return Object.create(websocket, {
    options: { value: { ...websocket.options, cloudflare }, enumerable: true },
  });
}

// Mirrors srvx's CloudflareServer (srvx/cloudflare): plugins, then the
// \`error\` handler as the outermost middleware, then the middleware chain.
function __createServer(entry) {
  const server = {
    runtime: "cloudflare",
    options: {
      ...entry,
      middleware: [...(entry.middleware || [])],
      fetch: entry.fetch
        ? (request) =>
            entry.fetch(request, request.runtime?.cloudflare?.env, request.runtime?.cloudflare?.context)
        : () => new Response("No fetch handler exported", { status: 500 }),
    },
    serve() {},
    ready: () => Promise.resolve(server),
    close: () => Promise.resolve(),
  };
  // \`websocket\` as in the other runners: crossws's plugin, with the entry's
  // \`websocket\` as its options (hooks, or \`resolve\`).
  const plugins = [
    ...(entry.plugins || []),
    ...(entry.websocket ? [__crosswsPlugin(__websocketOptions(entry.websocket))] : []),
  ];
  for (const plugin of plugins) {
    plugin(server);
  }
  const errorHandler = server.options.error;
  if (errorHandler) {
    server.options.middleware.unshift((_request, next) => {
      try {
        const res = next();
        return typeof res?.then === "function" ? res.then(undefined, (error) => errorHandler(error)) : res;
      } catch (error) {
        return errorHandler(error);
      }
    });
  }
  let handler = server.options.fetch;
  const middleware = server.options.middleware;
  for (let i = middleware.length - 1; i >= 0; i--) {
    const mw = middleware[i];
    const next = handler;
    handler = (request) => mw(request, () => next(request));
  }
  server.fetch = (request, env, context) => {
    const userEnv = __userEnv(env);
    Object.defineProperties(request, {
      waitUntil: { value: context.waitUntil.bind(context) },
      runtime: {
        enumerable: true,
        value: { name: "cloudflare", cloudflare: { env: userEnv, context } },
      },
      ip: {
        enumerable: true,
        configurable: true,
        get() {
          return request.headers.get("cf-connecting-ip");
        },
      },
    });
    return handler(request);
  };
  return server;
}

async function __loadEntry(env, path) {
  globalThis.__ENV_RUNNER_UNSAFE_EVAL__ = env.__ENV_RUNNER_UNSAFE_EVAL__;
  const importFn = env.__ENV_RUNNER_UNSAFE_EVAL__.newAsyncFunction(
    "return await import(path)",
    "loadEntry",
    "path"
  );
  const mod = await importFn(path);
  if ((mod.default || mod).websocket && !__crosswsPlugin) {
    const crossws = await importFn(__crosswsServerPath);
    __crosswsPlugin = crossws.plugin;
  }
  return mod;
}

function __setEntry(mod) {
  const entry = mod.default || mod;
  __server = __createServer(entry);
  __entryModule = mod;
  __userEntry = entry;
}

// Loads the entry once, for the IPC init request or an export stub used first.
async function __ensureEntry(env) {
  if (__userEntry) return;
  __entryLoading ||= __loadEntry(env, __entryPath)
    .then(__setEntry)
    .finally(() => {
      __entryLoading = undefined;
    });
  await __entryLoading;
}

// Where the Worker's classes come from: the entry's \`resolveExports()\` hook, or its namespace.
async function __entryExports() {
  return __userEntry?.resolveExports ? await __userEntry.resolveExports() : __entryModule;
}

// Where an entry load error was thrown (first stack frame), so one thrown by a
// virtual module names its key (\`#config:2:7\`). workerd's messages don't.
function __errorLocation(e) {
  const location = /\\n\\s+at (?:async )?(?:.* \\()?([^\\n()]+:\\d+:\\d+)\\)?/.exec(String(e?.stack))?.[1];
  return location ? " (at " + location + ")" : "";
}

function __sendMessage(message) {
  const payload = JSON.stringify(message);
  const env = __ipcEnv;
  if (env && env[__IPC_BINDING]) {
    env[__IPC_BINDING].fetch("http://localhost/__ipc", {
      method: "POST",
      body: payload,
    }).catch(() => {});
    return;
  }
  if (__serverWs) {
    __serverWs.send(payload);
  }
}

async function __handleWsMessage(env, data) {
  let msg;
  try { msg = JSON.parse(data); } catch { return; }

  if (msg.type === "message") {
    if (__userEntry?.ipc?.onMessage) {
      __userEntry.ipc.onMessage(msg.data);
    }
    return;
  }

  if (msg.type === "reload" && env.__ENV_RUNNER_UNSAFE_EVAL__) {
    const version = msg.version || 0;
    try {
      const newModule = await __loadEntry(env, __entryPath + "?__envRunnerReload=" + version);
      const newEntry = newModule.default || newModule;
      const newServer = __createServer(newEntry);
      if (__userEntry?.ipc?.onClose) {
        await __userEntry.ipc.onClose();
      }
      __entryModule = newModule;
      __userEntry = newEntry;
      __server = newServer;
      __ipcInitialized = false;
      if (__userEntry.ipc?.onOpen) {
        __ipcInitialized = true;
        await __userEntry.ipc.onOpen({ sendMessage: __sendMessage });
      }
      // The host restarts with new stubs when these changed, else asks for the check.
      const exportTypes = await __exportTypes().catch(() => undefined);
      __sendMessage({ event: "module-reloaded", exportTypes });
    } catch (e) {
      __sendMessage({ event: "module-reloaded", error: String(e) });
    }
    return;
  }

  if (msg.type === "check-exports") {
    __runExportsCheck();
    return;
  }

  if (msg.type === "shutdown") {
    if (__userEntry?.ipc?.onClose) {
      await __userEntry.ipc.onClose();
    }
    return;
  }
}

// The host warns (deduped across restarts). \`withTypes\`: also report the
// entry's classes, which the host restarts for when they change the stubs.
function __runExportsCheck(withTypes) {
  Promise.all([__checkExports(), withTypes ? __exportTypes() : undefined]).then(
    ([warnings, exportTypes]) =>
      (warnings || exportTypes) && __sendMessage({ event: "worker-exports", warnings, exportTypes }),
    () => {},
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // IPC: a plain request loads the entry (its export types, or a 500 with the
    // error), then the WebSocket upgrade opens the channel.
    if (url.pathname === __IPC_PATH) {
      try {
        await __ensureEntry(env);
      } catch (e) {
        const message = "Failed to load entry: " + String(e) + __errorLocation(e);
        return new Response(message, { status: 500 });
      }
      // A \`resolveExports()\` hook may need the IPC channel (host data sent once
      // ready), so its classes are reported after the channel opens.
      if (request.headers.get("upgrade") !== "websocket") {
        const exportTypes = __userEntry.resolveExports
          ? undefined
          : await __exportTypes().catch(() => undefined);
        return Response.json({ exportTypes });
      }

      const pair = new WebSocketPair();
      const client = pair[0];
      const server = pair[1];
      server.accept();
      __serverWs = server;

      server.addEventListener("message", (event) => {
        __handleWsMessage(env, event.data);
      });

      // Initialize IPC hooks
      if (!__ipcInitialized && __userEntry.ipc) {
        __ipcInitialized = true;
        if (__userEntry.ipc.onOpen) {
          await __userEntry.ipc.onOpen({ sendMessage: __sendMessage });
        }
      }

      // In the socket's request context, which outlives the check.
      __runExportsCheck(Boolean(__userEntry.resolveExports));

      return new Response(null, { status: 101, webSocket: client });
    }

    if (!__userEntry) {
      return new Response("Worker not initialized", { status: 503 });
    }

    __ipcEnv = env;

    ${c}
  }
};
`;
}
var He = `/__env_runner_ipc`;
var Q = /* @__PURE__ */ new Map();
var Ue = class extends pe$1 {
	#e;
	#t;
	#n;
	#r = 0;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	#p;
	#m;
	#h;
	#g;
	#_;
	#v;
	#y;
	#b;
	#x;
	#S;
	constructor(e) {
		super({
			...e,
			workerEntry: ``
		}), this.#S = e.miniflare, this.#t = e.miniflareOptions || {}, this.#n = e.transformRequest, this.#u = e.persistent ?? !1, this.#f = e.exports ?? {}, this.#p = e.captureErrors ?? !0, this.#m = e.crossws, this.#h = e.exportConditions ?? [`workerd`, `worker`], this.#g = e.wrangler ?? !1, this.#_ = e.wranglerEnv ?? process.env.CLOUDFLARE_ENV, this.#x = e.wranglerModule, this.#v = e.wranglerConfigPath, this.#y = e.wranglerEnvFiles, this.#b = e.compatibilityDate, !this._rejectListen() && this._initWithVirtualData(() => this.#O());
	}
	async shutdown() {
		await this.close();
	}
	static async disposeAll() {
		let e = [...Q.values()];
		Q.clear();
		for (let t of e) await t.mf.dispose().catch(() => {});
	}
	async dispose() {
		this.#e &&= (this.#l &&= (this.#l.send(JSON.stringify({ type: `shutdown` })), this.#l.close(), void 0), this.#d && Q.get(this.#d)?.mf === this.#e && Q.delete(this.#d), await this.#e.dispose(), void 0), this.closed || await this.close();
	}
	async fetch(e, t) {
		for (let e = 0; e < 5 && !this._address && !this.closed; e++) await new Promise((t) => setTimeout(t, 100 * 2 ** e));
		if (!this.#e || this.closed) return new Response(`miniflare env runner is unavailable`, { status: 503 });
		let n = this._resolveFetchInput(e), r = typeof n == `string` || n instanceof URL ? new Request(n, {
			...t,
			redirect: `manual`
		}) : new Request(new Request(n.url, n), {
			...t,
			redirect: `manual`,
			referrer: t?.referrer ?? n.referrer,
			referrerPolicy: t?.referrerPolicy ?? n.referrerPolicy
		}), i = await this.#e.dispatchFetch(r.url, r);
		return i instanceof Response ? i : new Response(i.body, {
			status: i.status,
			statusText: i.statusText,
			headers: i.headers
		});
	}
	sendMessage(e) {
		if (!this.#l && this.#o) throw Error(`Miniflare env runner is disconnected after a failed restart; call reloadModule() to retry.`);
		if (!this.#l) throw Error(`Miniflare env runner should be initialized before sending messages.`);
		e?.type === `ping` ? queueMicrotask(() => this._handleMessage({
			type: `pong`,
			data: e.data
		})) : this.#l.send(JSON.stringify({
			type: `message`,
			data: e
		}));
	}
	async reloadModule(e = 5e3) {
		if (await this._virtualUpdates, await this.#s, this.#o) {
			await this.#N(this.#o);
			return;
		}
		if (!this.#l) throw Error(`Miniflare env runner should be initialized before reloading.`);
		if (!this._data?.entry) return;
		this.#r++;
		let { exportTypes: t } = await this._request({
			type: `reload`,
			version: this.#r
		}, {
			match: (e) => e?.event === `module-reloaded`,
			timeout: e,
			timeoutError: `Module reload timed out`,
			send: (e) => this.#l.send(JSON.stringify(e))
		}), n = this.#w(t);
		n ? await this.#N(n) : this.#l?.send(JSON.stringify({ type: `check-exports` }));
	}
	async _applyVirtualUpdates(e) {
		let t = this.#i;
		if (!t) throw Error(`Miniflare env runner should be initialized before updating modules.`);
		let r = {};
		for (let [t, n] of Object.entries(e)) n !== null && (r[t] = await this.#A(t, n));
		await d;
		let i = {
			...t.sources,
			...r
		}, a = dt(i, ut(Object.keys(i))), o = pe$2(i, Object.keys(e), a);
		for (let n of Object.keys(e)) Object.hasOwn(r, n) ? (t.sources[n] = r[n], t.removed.delete(n)) : Object.hasOwn(t.sources, n) && (delete t.sources[n], t.removed.add(n));
		for (let e of o) t.versions.set(e, ++t.version);
		lt(t), this.#d && Q.get(this.#d) === this.#c && Q.delete(this.#d);
	}
	_handleMessage(e) {
		e?.event === `worker-exports` ? this.#T(e) : super._handleMessage(e);
	}
	_hasRuntime() {
		return !!this.#e;
	}
	_runtimeType() {
		return `miniflare`;
	}
	_resolveConditions() {
		return this.#h;
	}
	async _closeRuntime() {
		if (!this.#e) return;
		this.#l &&= (this.#l.send(JSON.stringify({ type: `shutdown` })), this.#l.close(), void 0);
		let e = this.#c;
		e ? (e.refCount--, e.refCount <= 0 && (this.#d && Q.get(this.#d) === e && Q.delete(this.#d), await this.#e.dispose())) : await this.#e.dispose(), this.#e = void 0;
	}
	async #C() {
		let e = await this.#e.dispatchFetch(`http://localhost` + He), t = await e.text().catch(() => ``);
		if (!e.ok) throw Error(`Failed to establish WebSocket IPC channel (${e.status}: ${t})`);
		try {
			return JSON.parse(t).exportTypes;
		} catch {
			return;
		}
	}
	#w(e) {
		if (this.#a && G(e)) return this.#a.update(qe(e));
	}
	#T(e) {
		if (this.closed || this.#s || this.#o) return;
		let t = this.#w(e.exportTypes);
		t ? this.#s = this.#N(t).catch((e) => {
			this.closed || console.error(`[env-runner]`, e);
		}).finally(() => {
			this.#s = void 0;
		}) : this.#E(e.warnings);
	}
	#E(e) {
		let t = this.#a;
		if (!t || !Array.isArray(e)) return;
		let n = e.join(`
`);
		n && n !== t.warnings && console.warn(`[env-runner] Worker exports:
  - ` + e.join(`
  - `)), t.warnings = n;
	}
	async #D() {
		return this.#S = await i$1({
			name: `miniflare`,
			option: `miniflare`,
			value: this.#S,
			expect: `Miniflare`,
			required: !0,
			hint: "MiniflareEnvRunner cannot run without it (`import * as miniflare from \"miniflare\"`)."
		}), this.#S;
	}
	#O() {
		this.#j().catch((e) => {
			console.error(`Miniflare runner init error:`, e), this.close(e);
		});
	}
	async upgrade(t) {
		if (!this.#e || this.closed) {
			t.node.socket.destroy();
			return;
		}
		let n = await this.#e.unsafeGetDirectURL(), r = new URL(n);
		try {
			await j({
				host: r.hostname,
				port: Number(r.port)
			}, t.node.req, t.node.socket, t.node.head);
		} catch {}
	}
	async #k() {
		let e = this._data?.virtual ?? {}, t = {};
		for (let [n, r] of Object.entries(e)) t[n] = await this.#A(n, r);
		return t;
	}
	async #A(e, t) {
		let n = y(e, t), r = typeof t == `string` ? t : t.source;
		switch (n) {
			case `module-typescript`:
			case `commonjs-typescript`: return {
				source: fe$1(e, r, await ht(), {
					requirement: `on the host (workerd does not parse TypeScript)`,
					remedy: `upgrade Node.js`
				}),
				format: n === `module-typescript` ? `module` : `commonjs`
			};
			case `jsx`:
			case `tsx`: throw x(e, n, `workerd`);
		}
		return {
			source: r,
			format: n
		};
	}
	async #j() {
		let e = await this.#D(), n = await Xe(e), c = this._data?.entry, u = await this.#k(), p = ct({ ...u });
		this.#i = p;
		let { options: m, configFile: g, exports: v } = await q({
			wrangler: this.#g,
			env: this.#_,
			entryPath: c,
			configPath: this.#v,
			wranglerModule: this.#x,
			envFiles: this.#y
		}), y = this.#t.compatibilityFlags || [], b = m?.compatibilityFlags || [], S = this.#t.unsafeDirectSockets || [], w = {
			modules: !0,
			...this.#g && !et(this.#t) ? { defaultPersistRoot: tt(g, typeof this.#g == `string` ? this.#g : this.#v) } : void 0,
			...m,
			...this.#t,
			compatibilityDate: Ze([
				this.#t.compatibilityDate,
				this.#b === `latest` ? n : this.#b,
				m?.compatibilityDate
			], n),
			compatibilityFlags: Qe(b, y),
			unsafeDirectSockets: [{
				host: `127.0.0.1`,
				port: 0
			}, ...S]
		};
		if (m) for (let [e, t] of Object.entries(m)) {
			let n = this.#t[e];
			G(t) && G(n) && (w[e] = {
				...t,
				...n
			});
		}
		let E = { runner: this };
		if (c && !w.script && !w.scriptPath) {
			let t = p.keyOf(c) ?? p.keyOf(resolve(c)), n = t !== void 0, u = n ? $(t) ?? t : resolve(c), m = isAbsolute(u) ? u : resolve(`__env_runner_virtual_entry__.mjs`), g = dirname(m), y = typeof this.#f == `object` ? this.#f : {}, b = typeof this.#f == `string` ? {} : Fe({
				options: w,
				wranglerExports: v,
				explicit: y
			}), S = this.#f !== !1 && typeof this.#f != `string`, D = S && Object.keys(b).length === 0;
			S && await d;
			let ee = S ? We(n ? ie$1(t, p.sources[t]) : rt(u)) : {}, k = w.durableObjects, A = w.additionalUnboundDurableObjects, M = G(k) ? k : {}, N = new Set(Object.values(M).map(Ie)), P = g + `/__env_runner_wrapper.mjs`, F = typeof this.#f == `string`, I = (e) => ({
				...this.#f === !1 ? {} : e,
				...b
			}), L = (e) => {
				let t = I(e), r = { ...M };
				for (let n of Object.keys({
					...y,
					...D && e
				})) {
					let e = it(n);
					t[n] === `DurableObject` && !N.has(n) && !r[e] && (r[e] = n);
				}
				Object.keys(r).length > 0 ? w.durableObjects = r : k === void 0 && delete w.durableObjects;
				let i = D ? [] : Object.keys(t).filter((e) => !(e in b) && t[e] === `DurableObject`).map((e) => ({ className: e }));
				i.length > 0 ? w.additionalUnboundDurableObjects = [...Array.isArray(A) ? A : [], ...i] : A === void 0 ? delete w.additionalUnboundDurableObjects : w.additionalUnboundDurableObjects = A;
				let a = Ve(n ? st(u) : u, {
					dynamicOnly: !0,
					captureErrors: this.#p,
					exports: typeof this.#f == `string` ? this.#f : t,
					configuredExports: Object.keys(D ? t : b),
					nodeCompat: !w.compatibilityFlags.includes(`no_nodejs_compat`),
					crossws: this.#m,
					crosswsServer: _t ||= X$1(`crossws/server`, {
						from: import.meta.url,
						conditions: [`workerd`, `import`],
						try: !0
					})
				});
				return F ? w.modules = [{
					type: `ESModule`,
					path: P,
					contents: a
				}] : (w.script = a, w.scriptPath = P), t;
			}, R = {
				stubs: L(ee),
				update: (t) => {
					if (!(F || Je(I(t), R.stubs))) return R.stubs = L(t), Ye(e, w);
				},
				warnings: ``
			};
			if (this.#a = R, w.modulesRoot ||= `/`, w.unsafeEvalBinding = Be, w.serviceBindings = {
				...w.serviceBindings || {},
				[ze]: async (e) => {
					try {
						let t = await e.json();
						E.runner._handleMessage(t);
					} catch {}
					return new Response(null, { status: 204 });
				}
			}, (this.#n || this._plugins) && !w.modulesRules && !e.convertV4MiniflareOptions && !F && (w.modulesRules = [{
				type: `ESModule`,
				include: [
					`.ts`,
					`.tsx`,
					`.jsx`,
					`.mts`,
					...this._plugins ? [`.cts`] : []
				].map((e) => `**/*${e}`)
			}]), !w.unsafeModuleFallbackService) {
				let e = createRequire(m), t = p, n = this.#n, c = () => E.runner._plugins, u = this.#h, f = (e, n) => pt(e, t.versions, (e) => t.versionedKeyOf(e, n)), g = (e, t) => {
					let { source: n } = e;
					switch (e.format) {
						case `module`: return { esModule: f(n, t) };
						case `commonjs`: return {
							commonJsModule: n,
							namedExports: yt(n)
						};
						case `json`: return { json: n };
						case `text`: return { text: n };
						case `bytes`: return { esModule: le$1(`bytes`, n) };
						case `wasm`: return { wasm: Array.from(n) };
					}
				}, v = async (e, t) => {
					if (t.moduleType !== `ts`) return t.code;
					let n = await ht();
					if (typeof n != `function`) throw TypeError(`[env-runner] "${e}" is still TypeScript after its plugins, which needs \`module.stripTypeScriptTypes\` on the host: upgrade Node.js or compile it in a plugin.`);
					return n(t.code);
				}, y = async (e, t) => {
					if (t.moduleType === `json`) return { esModule: on(e, t.code) };
					let n = await v(e, t);
					return Q$1(e, n) === `module` ? { esModule: f(n, void 0) } : {
						commonJsModule: n,
						namedExports: yt(n)
					};
				}, b = /* @__PURE__ */ new Map(), S = (e, t) => {
					let n = t?.message || String(t);
					return console.error(n), Response.json({
						name: e,
						esModule: `throw new Error(${JSON.stringify(n)});`
					});
				};
				w.unsafeUseModuleFallbackService = !0;
				let D = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map(), A = Promise.all([vt(), d]);
				w.unsafeModuleFallbackService = async (d) => {
					await A;
					let p = new URL(d.url), h = p.searchParams.get(`specifier`), w = p.searchParams.get(`rawSpecifier`), E = p.searchParams.get(`referrer`) || ``;
					if (!h) return new Response(null, { status: 404 });
					let M = h.split(`?`)[0] || h, N = w?.split(`?`)[0], P = d.headers.get(`x-resolve-method`) === `require` ? `require` : `import`, F = M.startsWith(`/`) ? M.slice(1) : M, I = E.startsWith(`/`) ? E.slice(1) : E, L = D.get(I), R = [
						N,
						M,
						F
					].find((e) => e !== void 0 && Object.hasOwn(t.sources, e)) ?? (N ? t.keyOf(N, L) : void 0) ?? t.keyOf(M);
					if (R !== void 0) {
						let e = h.includes(`?`) ? h.slice(h.indexOf(`?`)) : ``, n = $(R);
						if (n && N?.startsWith(`file:`) && M !== n && M.includes(`file:`)) {
							let t = Buffer.from(st(n) + e, `utf8`).toString(`latin1`);
							return new Response(null, {
								status: 301,
								headers: { location: t }
							});
						}
						let r = F + e;
						return n && D.set(r, n), Response.json({
							name: r,
							...g(t.sources[R], n)
						});
					}
					let z = h.includes(`?`) ? h.slice(h.indexOf(`?`)) : ``, B = (M.startsWith(`/`) ? M.slice(1) : M) + z, re = t.versionedKeyOf(N || M, L), ie = re === void 0 ? void 0 : t.versions.get(re), ae = V$1(H$1(h, ie)), V, H, U = !1, W = !1, G = c(), K = w ? H$1(w, ie) : F + ae, q = async (e) => {
						if (G) try {
							let n = K.startsWith(`file:`) ? fileURLToPath(B$1(K)) + V$1(K) : K;
							if (!G.resolveFilter(n, e)) return;
							let r = await G.resolveId(n, b.get(I) ?? L, { fallback: e });
							if (!r || r.external) return;
							let o = r.id, c = B$1(o), l = isAbsolute(c) ? t.keyOf(c) : void 0, u = l === void 0 ? void 0 : $(l);
							if (u) {
								let e = U$1(st(u) + V$1(o), h);
								return new Response(null, {
									status: 301,
									headers: { location: Buffer.from(e, `utf8`).toString(`latin1`) }
								});
							}
							if (isAbsolute(c)) return H = o, U = !0, c;
							let d = await G.load(o);
							return b.set(B, o), Response.json({
								name: B,
								...await y(o, d)
							});
						} catch (e) {
							return S(B, e);
						}
					}, J = ee.get(h);
					if (J) ee.delete(h), V = J.path, H = J.id, U = J.id !== void 0;
					else if (P === `require` && N?.startsWith(`node:`) && h === N + Et) return Response.json({
						name: h,
						esModule: Dt(N)
					});
					else {
						let e = await q(!1);
						if (e instanceof Response) return e;
						V = e;
					}
					let oe = N || M;
					if (V === void 0) {
						if (oe.startsWith(`file://`)) try {
							V = fileURLToPath(oe);
						} catch {
							return new Response(null, { status: 404 });
						}
						else if (N && !N.startsWith(`.`) && !N.startsWith(`/`) && !isAbsolute(N)) {
							let t = L, n = t ? createRequire(t) : e;
							if (N.startsWith(`cloudflare:`)) return new Response(null, { status: 404 });
							if (N.startsWith(`node:`)) {
								if (P === `require`) {
									let e = N + Et;
									return new Response(null, {
										status: 301,
										headers: { location: e }
									});
								}
								return new Response(null, { status: 404 });
							}
							try {
								V = X$1(N, {
									from: t || m,
									conditions: [...u, P],
									try: !0
								}) || n.resolve(N);
							} catch {
								let e = await q(!0);
								if (e instanceof Response) return e;
								if (e === void 0) {
									let e = M.startsWith(`/`) ? M.slice(1) : M;
									return Response.json({
										name: e,
										esModule: `export default undefined;`
									});
								}
								V = e;
							}
							W = !0;
						} else {
							let t = L || (E.startsWith(`/`) ? E : `/` + E), n = dirname(t), r = N || M;
							if (r.startsWith(`.`)) {
								if (V = resolve(n, r), P === `require` && !nt(V)) try {
									V = createRequire(t).resolve(r), W = !0;
								} catch {}
							} else if (N && isAbsolute(N) && !N.startsWith(`/`)) V = N;
							else if (M.startsWith(`/`)) V = M;
							else try {
								V = e.resolve(r);
							} catch {
								let e = await q(!0);
								if (e === void 0) return new Response(null, { status: 404 });
								if (e instanceof Response) return e;
								V = e;
							}
						}
					}
					if (!U && G && !existsSync(V)) {
						let e = await q(!0);
						if (e instanceof Response) return e;
						V = e ?? V;
					}
					if (W || U) {
						let e = st(V);
						if (M !== e) {
							let t = U ? U$1(e + V$1(H), h) : e + z;
							return ee.set(t, {
								path: V,
								id: U ? H : void 0
							}), new Response(null, {
								status: 301,
								headers: { location: Buffer.from(t, `utf8`).toString(`latin1`) }
							});
						}
					}
					if (n) try {
						let e = await n(V);
						if (e?.code) return D.set(B, V), Response.json({
							name: B,
							esModule: f(e.code, V)
						});
					} catch {}
					let Y;
					try {
						Y = readFileSync(V, `utf8`);
					} catch {}
					let se = c(), X = H ?? V + ae, ce = se?.filter(X, void 0, U);
					if (Y === void 0 && !ce) return new Response(null, { status: 404 });
					D.set(B, V), X !== V && b.set(B, X);
					let Z;
					if (ce) {
						try {
							let e = V, t = await se.load(X, () => {
								if (Y === void 0) throw Error(`Cannot find module "${e}"`);
								return Y;
							}, { resolved: U });
							if (t?.moduleType === `json`) return Response.json({
								name: B,
								esModule: on(e, t.code)
							});
							Z = t && await v(X, t);
						} catch (e) {
							return S(B, e);
						}
						if (Z === void 0 && Y === void 0) return new Response(null, { status: 404 });
					}
					if (Z === void 0 && V.endsWith(`.wasm`)) return Response.json({
						name: B,
						wasm: Array.from(readFileSync(V))
					});
					let le;
					return Z === void 0 ? (Y = Y, le = V.endsWith(`.mjs`) || !V.endsWith(`.cjs`) && Tt(Y)) : (Y = Z, le = Q$1(V, Y) === `module`), le ? Response.json({
						name: B,
						esModule: f(Y, V)
					}) : Response.json({
						name: B,
						commonJsModule: Y,
						namedExports: xt(V, Y, [...u, `require`], k)
					});
				};
			}
		}
		if (this.#u && c) {
			this.#d = at(c, {
				...this.#t,
				_exportConditions: this.#h,
				_exports: this.#f,
				_crossws: this.#m,
				_plugins: !!this._plugins,
				_virtual: ce$1(u)
			});
			let e = Q.get(this.#d);
			e && (this.#e = e.mf, e.refCount++, this.#c = e, e.ipc.runner = this, this.#i = e.virtual, this.#a = e.workerExports);
		}
		this.#e || (this.#e = new e.Miniflare(Ye(e, w)), await this.#e.ready, this.#u && this.#d && (this.#c = {
			mf: this.#e,
			refCount: 1,
			virtual: p,
			ipc: E,
			workerExports: this.#a
		}, Q.set(this.#d, this.#c))), await this.#P(), await this.#M();
	}
	async #M() {
		let e = await this.#e.unsafeGetDirectURL();
		this.closed || this._handleMessage({ address: {
			host: e.hostname,
			port: Number(e.port)
		} });
	}
	async #N(e) {
		this.#l &&= (this.#l.send(JSON.stringify({ type: `shutdown` })), this.#l.close(), void 0), this.#o = e;
		try {
			await this.#e.setOptions(e), await this.#P();
		} catch (e) {
			throw Error(`Failed to restart Miniflare for the changed Worker exports (reloadModule() retries).`, { cause: e });
		}
		this.#o = void 0, this.closed || await this.#M();
	}
	async #P() {
		let e = this.#w(await this.#C());
		e && (await this.#e.setOptions(e), await this.#C());
		let t = await this.#e.dispatchFetch(`http://localhost` + He, { headers: { upgrade: `websocket` } }), n = t.webSocket;
		if (!n) {
			let e = await t.text().catch(() => ``);
			throw Error(`Failed to establish WebSocket IPC channel (${t.status}: ${e})`);
		}
		n.accept(), this.#l = n, n.addEventListener(`message`, (e) => {
			try {
				let t = JSON.parse(e.data);
				this._handleMessage(t);
			} catch {}
		});
	}
};
function We(e) {
	let t = {};
	if (!e) return t;
	let n, r;
	try {
		[n, r] = i(e);
	} catch {
		return t;
	}
	let i$2 = /* @__PURE__ */ new Map();
	for (let t of n) if (t.type === `static` && t.specifier === `cloudflare:workers`) {
		let n = e.slice(t.importStart, t.importEnd);
		for (let [, e, t] of n.matchAll(/\b(DurableObject|WorkerEntrypoint|WorkflowEntrypoint)(?:\s+as\s+([\w$]+))?/g)) i$2.set(t ?? e, e);
	}
	for (let n of r) {
		if (n.type !== `direct` || n.typeOnly || n.name === "default" || !n.localName) continue;
		let r = Ge(e, n.localName, i$2);
		r && (t[n.name] = r);
	}
	return t;
}
function Ge(e, t, n, r = /* @__PURE__ */ new Set()) {
	let i = Ke(e, t);
	if (i === void 0) return;
	let a = /\bextends\s+(?:[\w$]+\.)*([\w$]+)/.exec(i)?.[1];
	if (!a) return `DurableObject`;
	let o = n.get(a) ?? a;
	if (Pe(o)) return o;
	r.add(t);
	let s = r.has(a) ? void 0 : Ge(e, a, n, r);
	return s === void 0 ? Object.hasOwn(globalThis, a) && typeof globalThis[a] == `function` ? null : `DurableObject` : s;
}
function Ke(e, t) {
	let n = t.replace(/[$()*+.?[\\\]^{|}]/g, `\\$&`);
	return RegExp(`(?:(?<![\\w$])class\\s+${n}|(?<![\\w$.])${n}\\s*=\\s*class(?:\\s+(?!extends\\b)[\\w$]+)?)(?![\\w$])([^{]*)\\{`).exec(e)?.[1];
}
function qe(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) Pe(r) && (t[n] = r);
	return t;
}
function Je(e, t) {
	let n = Object.keys(e);
	return n.length === Object.keys(t).length && n.every((n) => e[n] === t[n]);
}
function Ye(e, t) {
	if (!e.convertV4MiniflareOptions) return t;
	let { defaultPersistRoot: n, ...r } = t;
	return e.convertV4MiniflareOptions({
		resourcePersistencePath: n,
		...r
	});
}
async function Xe(e) {
	if (typeof e.supportedCompatibilityDate == `string`) return e.supportedCompatibilityDate;
	try {
		let e = [process.cwd() + `/`, import.meta.url], t = X$1(`miniflare`, {
			from: e,
			try: !0
		}), n = X$1(`workerd`, { from: t || e }), { compatibilityDate: r } = await import(pathToFileURL(n).href);
		if (!$e$1(r)) return;
		let i = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		return r > i ? i : r;
	} catch {
		return;
	}
}
function Ze(e, t) {
	let n = e.find((e) => typeof e == `string` && e) ?? t;
	return n && t && $e$1(n) && $e$1(t) && n > t ? (console.warn(`[env-runner] compatibility date "${n}" is newer than the installed workerd supports; falling back to "${t}".`), t) : n;
}
function Qe(e, t) {
	let n = (e) => e === `nodejs_compat` ? `no_nodejs_compat` : e === `no_nodejs_compat` ? `nodejs_compat` : void 0, r = [...e.filter((e) => !t.includes(n(e))), ...t], i = r.includes(`no_nodejs_compat`) ? [] : [`nodejs_compat`];
	return [.../* @__PURE__ */ new Set([...i, ...r])];
}
function $e$1(e) {
	return /^\d{4}-\d{2}-\d{2}$/.test(e);
}
function et(e) {
	return Object.keys(e).some((e) => e === `defaultPersistRoot` || e === `resourcePersistencePath` || e.endsWith(`Persist`));
}
function tt(e, t) {
	let n = e ?? (t ? resolve(t) : void 0);
	return join(n ? dirname(n) : process.cwd(), `.wrangler/state/v3`);
}
function nt(e) {
	try {
		return statSync(e).isFile();
	} catch {
		return !1;
	}
}
function rt(e) {
	try {
		return readFileSync(e, `utf8`);
	} catch {
		return;
	}
}
function it(e) {
	return e.replace(/([a-z0-9])([A-Z])/g, `$1_$2`).toUpperCase();
}
function at(e, t) {
	let n = {};
	for (let [e, r] of Object.entries(t)) typeof r != `function` && (n[e] = r);
	return `${resolve(e)}::${JSON.stringify(n)}`;
}
var ot = process.platform === `win32`;
function $(e) {
	if (ot && /^\/[A-Za-z]:\//.test(e) && (e = e.slice(1)), e.startsWith(`file:`)) try {
		return fileURLToPath(e);
	} catch {
		return;
	}
	return isAbsolute(e) ? resolve(e) : void 0;
}
function st(e) {
	return ot && /^[A-Za-z]:[\\/]/.test(e) ? `/` + e.replaceAll(`\\`, `/`) : e;
}
function ct(e) {
	return lt({
		sources: e,
		removed: /* @__PURE__ */ new Set(),
		versions: /* @__PURE__ */ new Map(),
		version: 0
	});
}
function lt(e) {
	let t = Object.keys(e.sources);
	return e.keyOf = ut(t), e.versionedKeyOf = e.removed.size > 0 ? ut([...t, ...e.removed]) : e.keyOf, e;
}
function ut(e) {
	let t = new Set(e), n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = $(e);
		t !== void 0 && n.set(t, e);
	}
	return (e, r) => {
		let i = e.split(`?`)[0];
		if (t.has(i)) return i;
		if (n.size === 0) return;
		let a = /^\.\.?\//.test(i) ? r && resolve(dirname(r), i) : $(i);
		return a ? n.get(a) : void 0;
	};
}
function dt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let [r, { source: i, format: a }] of Object.entries(e)) {
		if (a !== `module`) continue;
		let e = $(r);
		for (let { specifier: a } of ft(i) ?? []) {
			let i = t(a, e);
			if (i !== void 0 && i !== r) {
				let e = n.get(i);
				e || n.set(i, e = /* @__PURE__ */ new Set()), e.add(r);
			}
		}
	}
	return n;
}
function ft(e) {
	let t;
	try {
		[t] = i(e);
	} catch {
		return;
	}
	let n = [];
	for (let e of t) typeof e.specifier != `string` || e.type === `dynamic` && e.glob || n.push({
		specifier: e.specifier,
		end: e.type === `dynamic` ? e.end - 1 : e.end
	});
	return n;
}
function pt(e, t, n) {
	if (t.size === 0) return e;
	let r = ft(e);
	if (!r) return e;
	let i = ``, a = 0;
	for (let { specifier: o, end: s } of r) {
		let r = n(o), c = r === void 0 ? void 0 : t.get(r);
		c && (i += e.slice(a, s) + (o.includes(`?`) ? `&` : `?`) + `v=${c}`, a = s);
	}
	return i + e.slice(a);
}
var mt;
function ht() {
	return mt ??= import(`node:module`).then((e) => e.stripTypeScriptTypes), mt;
}
var gt;
var _t;
function vt() {
	return gt ||= d$1(), gt;
}
function yt(e) {
	try {
		return bt(r(e).exports);
	} catch {
		return [];
	}
}
function bt(e) {
	return [...e].filter((e) => e !== "default" && e !== "__esModule");
}
function xt(e, t, n, r) {
	let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = (e, t) => {
		a.add(e);
		for (let e of t?.exports || []) i.add(e);
		for (let e of t?.reexports || []) a.has(e) || o(e, Ct(e, n, r));
	};
	return o(e, St(e, t, n)), bt(i);
}
function St(e, t, n) {
	let r$1;
	try {
		r$1 = r(t);
	} catch {
		return;
	}
	let i = [];
	for (let t of r$1.reexports) {
		let r = wt(t, e, n);
		r && isAbsolute(r) && /\.c?js$/.test(r) && i.push(r);
	}
	return {
		exports: r$1.exports,
		reexports: i
	};
}
function Ct(e, t, n) {
	if (n.has(e)) return n.get(e);
	let r;
	try {
		let n = readFileSync(e, `utf8`);
		(e.endsWith(`.cjs`) || !Tt(n)) && (r = St(e, n, t));
	} catch {}
	return /[/\\]node_modules[/\\]/.test(e) && n.set(e, r), r;
}
function wt(e, t, n) {
	try {
		if (!e.startsWith(`.`) && !isAbsolute(e)) {
			let r = X$1(e, {
				from: t,
				conditions: n,
				try: !0
			});
			if (r) return r;
		}
		return createRequire(t).resolve(e);
	} catch {
		return;
	}
}
function Tt(e) {
	try {
		return i(e)[3];
	} catch {
		return /\b(import\s|import\(|export\s|export\{|import\.meta\b)/.test(e);
	}
}
var Et = `?__require`;
function Dt(e) {
	let t = JSON.stringify(e), n = JSON.stringify(`No such module ${t}.`);
	return [
		`import * as __mod__ from ${t};`,
		`export * from ${t};`,
		`let __default__;`,
		`try { __default__ = __mod__.default ?? __mod__; } catch { throw new Error(${n}); }`,
		`export default __default__;`,
		``
	].join(`
`);
}
export { Ue };
