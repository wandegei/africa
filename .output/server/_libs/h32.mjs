import { addRoute, compareRoutes, createRouter, decodePreservingSeparators, isNonCanonicalPathname, normalizeRoute as normalizeRoute$1, withLeadingSlash } from "./h3+rou3.mjs";
// node_modules/h3/dist/path.mjs
var DOT_SEGMENT_SRC = String.raw`(?:^|/)(?:\.|%(?:25)*2e){1,2}(?:/|$)`;
var ENCODED_SEP_SRC = String.raw`%(?:25)*(?:2f|5c)`;
var ENCODED_SEP_RE_G = /* @__PURE__ */ new RegExp(ENCODED_SEP_SRC, "gi");
var TRIGGER_RES = /* @__PURE__ */ (() => {
	const base = String.raw`\\|` + DOT_SEGMENT_SRC;
	return [
		new RegExp(base, "i"),
		new RegExp(`${base}|${ENCODED_SEP_SRC}`, "i"),
		new RegExp(`${base}|//`, "i"),
		new RegExp(`${base}|${ENCODED_SEP_SRC}|//`, "i")
	];
})();
var ENCODED_DOT_RE_G = /%(?:25)*2e/gi;
function resolveDotSegments(path, opts) {
	if (path[0] !== "/" || path[1] === "/" || path[1] === "\\") path = "/" + path.replace(/^[/\\]+/, "");
	if (isCanonicalPath(path, opts)) return path;
	const decodeSlashes = opts?.decodeSlashes;
	const mergeSlashes = opts?.mergeSlashes;
	let normalized = path.includes("\\") ? path.replaceAll("\\", "/") : path;
	if (decodeSlashes) normalized = normalized.replace(ENCODED_SEP_RE_G, "/");
	const segments = normalized.split("/");
	const lastIndex = segments.length - 1;
	const resolved = [];
	for (let i = 0; i <= lastIndex; i++) {
		const segment = segments[i];
		const normalizedSegment = segment.includes("%") ? segment.replace(ENCODED_DOT_RE_G, ".") : segment;
		const isDotSegment = normalizedSegment === "." || normalizedSegment === "..";
		if (normalizedSegment === "..") {
			if (resolved.length > 1) resolved.pop();
		} else if (mergeSlashes && normalizedSegment === "" && i > 0 && i < lastIndex) {} else if (!isDotSegment) resolved.push(segment);
		if (isDotSegment && i === lastIndex) resolved.push("");
	}
	return (resolved.join("/") || "/").replace(/^\/+/, "/");
}
function isCanonicalPath(path, opts) {
	return path[0] === "/" && path[1] !== "/" && path[1] !== "\\" && !TRIGGER_RES[(opts?.decodeSlashes ? 1 : 0) | (opts?.mergeSlashes ? 2 : 0)].test(path);
}
function normalizeRoute(route) {
	return normalizeRoute$1(route);
}
// node_modules/h3/dist/_utils.mjs
var CANONICAL_OPTS = { decodeSlashes: true };
var MERGED_OPTS = {
	decodeSlashes: true,
	mergeSlashes: true
};
function canonicalPath(pathname) {
	return resolveDotSegments(pathname, CANONICAL_OPTS);
}
function decodedPath(pathname) {
	let decoded = pathname;
	for (let pass = 0; hasDecodableEscape(decoded); pass++) {
		if (pass >= MAX_PASSES) return decoded;
		const input = pass < EXACT_PASSES ? decoded : flattenNesting(decoded);
		let next;
		try {
			next = decodePreservingSeparators(input);
		} catch {
			return input;
		}
		if (next === input) return input;
		decoded = next;
	}
	return decoded;
}
var PATH_ENCODE_RE = /(?:[\u0000-\u0020"#<>?^`{}]|[^\u0000-\u007E])+/gu;
function encodedReading(pathname) {
	return pathname.replace(PATH_ENCODE_RE, (run) => encodeURIComponent(run.replace(/[\uD800-\uDFFF]/gu, "�")));
}
var EXACT_PASSES = 8;
var MAX_PASSES = 24;
var CHAR_2 = 50;
var CHAR_5 = 53;
function needsCanonicalPasses(pathname) {
	return !isCanonicalPath(pathname, MERGED_OPTS);
}
function mergedCanonicalPath(pathname, canonical) {
	const merged = resolveDotSegments(pathname, MERGED_OPTS);
	return merged === canonical ? void 0 : merged;
}
function hasDecodableEscape(value) {
	for (let i = value.indexOf("%"); i !== -1; i = value.indexOf("%", i + 1)) {
		const byte = escapeByte(value, nestingEnd(value, i));
		if (byte !== 47 && byte !== 92) return true;
	}
	return false;
}
function flattenNesting(path) {
	let flat = "";
	let last = 0;
	for (let i = path.indexOf("%"); i !== -1; i = path.indexOf("%", i + 1)) {
		const end = nestingEnd(path, i);
		if (end === i + 1) continue;
		const byte = escapeByte(path, end);
		if (byte === 47 || byte === 92) continue;
		flat += path.slice(last, i) + (byte === -1 ? "%25" : "%");
		last = end;
	}
	return last === 0 ? path : flat + path.slice(last);
}
function nestingEnd(value, index) {
	let end = index + 1;
	while (value.charCodeAt(end) === CHAR_2 && value.charCodeAt(end + 1) === CHAR_5) end += 2;
	return end;
}
function escapeByte(value, index) {
	const high = hexDigit(value.charCodeAt(index));
	const low = hexDigit(value.charCodeAt(index + 1));
	return high === -1 || low === -1 ? -1 : high * 16 + low;
}
function hexDigit(code) {
	if (code >= 48 && code <= 57) return code - 48;
	if (code >= 97 && code <= 102) return code - 87;
	if (code >= 65 && code <= 70) return code - 55;
	return -1;
}
var AUTHORITY_RE = /^(?:[a-z][a-z\d+.-]*:[/\\]*|[/\\]{2,})[^/\\?#]*/i;
function authorityEnd(target) {
	return AUTHORITY_RE.exec(target)?.[0].length ?? 0;
}
function isHostPositionSplat(target) {
	const index = target.indexOf("**");
	return index !== -1 && index <= authorityEnd(target);
}
// node_modules/h3/dist/normalize.mjs
var HTTP_METHODS = /* @__PURE__ */ new Set([
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"OPTIONS",
	"CONNECT",
	"TRACE",
	"QUERY"
]);
var METHOD_KEY_RE = /^([A-Za-z]+)\s+(\/.*)$/;
function parseRouteKey(key) {
	const match = METHOD_KEY_RE.exec(key);
	if (match) {
		const method = match[1].toUpperCase();
		if (HTTP_METHODS.has(method)) return {
			method,
			path: withLeadingSlash(match[2])
		};
	}
	return {
		method: "",
		path: withLeadingSlash(key)
	};
}
function unknownMethodPrefix(key) {
	const match = METHOD_KEY_RE.exec(key);
	return match && !HTTP_METHODS.has(match[1].toUpperCase()) ? match[1] : void 0;
}
function formatRouteKey(method, path) {
	return method ? `${method} ${path}` : path;
}
function decodeRoutePattern(path) {
	for (let prev = ""; prev !== path;) {
		prev = path;
		path = normalizeRoute$1(path);
	}
	return path;
}
function recordResets(resets, resetEntries, routeRules, canOverride) {
	for (const entry of resetEntries) {
		const rule = routeRules[entry.name];
		if (!rule || !canOverride?.(entry.route, rule.route)) addReset(resets, entry.name, entry.route);
	}
}
function addReset(resets, name, route) {
	const routes = resets.get(name);
	if (!routes) resets.set(name, [route]);
	else if (!routes.includes(route)) routes.push(route);
}
function canReinstate(resetRoutes, route, canOverride) {
	return !resetRoutes || canOverride !== void 0 && resetRoutes.every((resetRoute) => canOverride(resetRoute, route));
}
function mergeMatchedRouteRules(rawLayers, altLayers, canOverride) {
	if (!altLayers) return resolveLayers(rawLayers);
	const resets = /* @__PURE__ */ new Map();
	const routeRules = resolveLayers(rawLayers, resets, canOverride);
	const resolved = altLayers.map((layers) => layers?.length ? resolveLayers(layers, resets, canOverride) : void 0);
	for (const rules of resolved) if (rules) unionRules(routeRules, rules, resets, canOverride);
	return routeRules;
}
function unionRules(routeRules, resolved, resets, canOverride) {
	for (const [name, rule] of Object.entries(resolved)) {
		const current = routeRules[name];
		if (current) {
			if (canOverride && !canOverride(current.route, rule.route)) continue;
		} else if (!rule.handler?.restricting && !canReinstate(resets.get(name), rule.route, canOverride)) continue;
		mergeRouteRule(routeRules, name, rule, rule.params);
	}
}
function resolveLayers(layers, resets, canOverride) {
	const firstData = layers?.[0]?.data;
	if (firstData && !Array.isArray(firstData)) return resolvePreMergedLayers(layers, resets);
	const routeRules = emptyRouteRules();
	let resetEntries;
	for (const layer of orderedLayers(layers)) for (const entry of layer.data) {
		if (resets && entry.options === false) (resetEntries ||= []).push(entry);
		mergeRouteRule(routeRules, entry.name, entry, layer.params);
	}
	if (resetEntries) recordResets(resets, resetEntries, routeRules, canOverride);
	return routeRules;
}
function isMergeableObject(value) {
	return value !== null && typeof value === "object";
}
function emptyRouteRules() {
	return Object.create(null);
}
function mergeRuleOptions(current, incoming) {
	return isMergeableObject(current) && isMergeableObject(incoming) ? {
		...current,
		...incoming
	} : incoming;
}
function orderedLayers(layers) {
	if (!layers || layers.length < 2) return layers || [];
	let ordered = layers;
	for (let i = 1; i < ordered.length; i++) {
		const layer = ordered[i];
		const rank = layerRank(layer);
		let j = i - 1;
		while (j >= 0 && layerRank(ordered[j]) > rank) {
			if (ordered === layers) ordered = [...layers];
			ordered[j + 1] = ordered[j];
			j--;
		}
		if (j + 1 !== i) ordered[j + 1] = layer;
	}
	return ordered;
}
function layerRank(layer) {
	return layer.data[0]?.rank ?? 0;
}
function resolvePreMergedLayers(rawLayers, resets) {
	const layers = rawLayers.length < 2 ? rawLayers : [...rawLayers].sort((a, b) => a.data.rank - b.data.rank);
	const routeRules = emptyRouteRules();
	const winning = layers[layers.length - 1].data;
	if (resets && winning.resets) for (const name of winning.resets) addReset(resets, name, winning.route);
	for (const entry of winning.rules) {
		const paramRoutes = entry.paramRoutes;
		let params;
		for (const layer of layers) {
			const layerParams = layer.params;
			if (!layerParams) continue;
			const layerRoute = layer.data.route;
			if (paramRoutes ? paramRoutes.includes(layerRoute) : layerRoute === entry.route) params = params ? {
				...params,
				...layerParams
			} : layerParams;
		}
		routeRules[entry.name] = {
			route: entry.route,
			options: entry.options,
			handler: entry.handler,
			params
		};
	}
	return routeRules;
}
function mergeRouteRule(routeRules, ruleName, rule, params) {
	const name = ruleName;
	const currentRule = routeRules[name];
	if (currentRule) {
		if (rule.options === false) {
			delete routeRules[name];
			return;
		}
		currentRule.options = mergeRuleOptions(currentRule.options, rule.options);
		currentRule.route = rule.route;
		if (currentRule.params || params) currentRule.params = {
			...currentRule.params,
			...params
		};
	} else if (rule.options !== false) routeRules[name] = {
		route: rule.route,
		options: rule.options,
		handler: rule.handler,
		params
	};
}
function routeContainmentRanks(paths) {
	const ranks = new Map(paths.map((path) => [path, 0]));
	for (let i = 0; i < paths.length; i++) for (let j = i + 1; j < paths.length; j++) {
		const [a, b] = [paths[i], paths[j]];
		let rel;
		try {
			rel = compareRoutes(a, b);
		} catch {
			continue;
		}
		if (rel === "superset") ranks.set(b, ranks.get(b) + 1);
		else if (rel === "subset") ranks.set(a, ranks.get(a) + 1);
	}
	return ranks;
}
function preMergeRuleLayers(byPath) {
	const paths = [...byPath.keys()];
	const subsumers = new Map(paths.map((path) => [path, []]));
	for (let i = 0; i < paths.length; i++) for (let j = i + 1; j < paths.length; j++) {
		const [a, b] = [paths[i], paths[j]];
		switch (compareRoutes(a, b)) {
			case "disjoint": break;
			case "equal": throw new Error(`[h3] rules: preMerge: \`${a}\` and \`${b}\` match the same paths — merge them into one rule`);
			case "superset":
				subsumers.get(b).push(a);
				break;
			case "subset":
				subsumers.get(a).push(b);
				break;
			case "partial": throw new Error(`[h3] rules: preMerge: \`${a}\` and \`${b}\` partially overlap — the most specific match is ambiguous. Split the overlap into explicit rules or disable preMerge.`);
		}
	}
	const methodsUsed = /* @__PURE__ */ new Set();
	for (const methods of byPath.values()) for (const method of methods.keys()) if (method) methodsUsed.add(method);
	const result = /* @__PURE__ */ new Map();
	for (const path of paths) {
		const chainSubsumers = subsumers.get(path);
		const chain = [...chainSubsumers].sort((a, b) => subsumers.get(a).length - subsumers.get(b).length).concat(path);
		const registrations = /* @__PURE__ */ new Map();
		for (const method of ["", ...methodsUsed]) {
			if (method && !chain.some((route) => byPath.get(route).has(method))) continue;
			const merged = /* @__PURE__ */ new Map();
			const resets = /* @__PURE__ */ new Set();
			for (const route of chain) {
				const methods = byPath.get(route);
				const agnostic = methods.get("") || [];
				const scoped = method && methods.get(method) || [];
				for (const entry of [...agnostic, ...scoped]) mergeChainRule(merged, entry, resets);
			}
			registrations.set(method, {
				route: path,
				rank: chainSubsumers.length,
				rules: [...merged.values()].map(({ paramRoutes, ...rule }) => paramRoutes.length === 1 && paramRoutes[0] === rule.route ? rule : {
					...rule,
					paramRoutes
				}),
				...resets.size > 0 && { resets: [...resets].filter((name) => !merged.has(name)) }
			});
		}
		result.set(path, registrations);
	}
	return result;
}
function mergeChainRule(merged, entry, resets) {
	if (entry.options === false) resets.add(entry.name);
	const current = merged.get(entry.name);
	if (current) {
		if (entry.options === false) {
			merged.delete(entry.name);
			return;
		}
		current.options = mergeRuleOptions(current.options, entry.options);
		current.route = entry.route;
		if (!current.paramRoutes.includes(entry.route)) current.paramRoutes.push(entry.route);
	} else if (entry.options !== false) merged.set(entry.name, {
		...entry,
		paramRoutes: [entry.route]
	});
}
var headers = {
	order: -1,
	handler: (m) => {
		const entries = Object.entries(m.options || {});
		return async function headersRouteRule(event, next) {
			let result;
			try {
				result = await next();
			} catch (error) {
				setRuleHeaders(event, entries, error);
				throw error;
			}
			setRuleHeaders(event, entries, result);
			return result;
		};
	}
};
function setRuleHeaders(event, entries, outcome) {
	const own = outcome instanceof Error && outcome.name === "HTTPError" && outcome.status > 99 ? outcome.headers : void 0;
	for (const [key, value] of entries) {
		event.res.headers.set(key, value);
		if (!own?.has(key)) event.res.errHeaders.set(key, value);
	}
}
function createRulesRouter(rules, handlers, baseURL, preMerge) {
	let base = baseURL || "";
	if (base.endsWith("/")) base = base.slice(0, -1);
	const registrations = [];
	for (const [key, rule] of Object.entries(rules)) {
		const { method, path } = parseRouteKey(key);
		const entries = [];
		for (const [name, options] of Object.entries(rule)) {
			if (options === void 0) continue;
			entries.push({
				name,
				route: path,
				options: base ? withScopeBase(name, options, base) : options,
				handler: Object.hasOwn(handlers, name) ? handlers[name] : void 0
			});
		}
		registrations.push([
			method,
			registeredPattern(base + path),
			entries
		]);
	}
	const baseSpelling = registrations[0]?.[1].slice(0, base.length) ?? base;
	const prefix = registrations.every(([, full]) => full.startsWith(baseSpelling)) ? baseSpelling : "";
	const byPath = /* @__PURE__ */ new Map();
	for (const [method, full, entries] of registrations) {
		const pattern = full.slice(prefix.length);
		for (const entry of entries) entry.route = full.slice(base.length);
		let methods = byPath.get(pattern);
		if (!methods) byPath.set(pattern, methods = /* @__PURE__ */ new Map());
		methods.set(method, [...methods.get(method) || [], ...entries]);
	}
	for (const methods of byPath.values()) {
		const get = methods.get("GET");
		if (get) methods.set("HEAD", [...get, ...methods.get("HEAD") || []]);
	}
	const router = createRouter();
	if (preMerge) {
		for (const [pattern, methods] of preMergeRuleLayers(byPath)) for (const [method, data] of methods) {
			data.route = (prefix + pattern).slice(base.length);
			addRuleRoute(router, method, prefix + pattern, data);
		}
		return router;
	}
	for (const [path, rank] of routeContainmentRanks([...byPath.keys()])) {
		if (rank === 0) continue;
		for (const entries of byPath.get(path).values()) for (const entry of entries) entry.rank = rank;
	}
	for (const [pattern, methods] of byPath) for (const [method, entries] of methods) addRuleRoute(router, method, prefix + pattern, entries);
	return router;
}
var WHOLE_PARAM_SEGMENT_RE = /^:[A-Za-z_]\w*[?+*]?$/;
var CONCRETE_SEGMENT_RE = /^[^:*(){}\\]+$/;
var DOT_SEGMENT_RE = /(?:^|\/)(?:\.|%2e){1,2}(?:\/|$)/i;
var GROUP_RE = /[{}]/;
var canOverrideRouteShape = (currentRoute, incomingRoute) => {
	if (DOT_SEGMENT_RE.test(currentRoute) || DOT_SEGMENT_RE.test(incomingRoute)) return false;
	if (currentRoute === incomingRoute) return true;
	if (GROUP_RE.test(currentRoute) || GROUP_RE.test(incomingRoute)) return false;
	const current = currentRoute.split("/");
	const incoming = incomingRoute.split("/");
	for (let i = 0; i < current.length; i++) {
		const cur = current[i];
		if (cur === "**") return i === current.length - 1 && incoming.length > i && !current.slice(1, i).includes("");
		const inc = incoming[i];
		if (inc === void 0) return false;
		if (cur === inc) continue;
		if ((cur === "*" || WHOLE_PARAM_SEGMENT_RE.test(cur)) && CONCRETE_SEGMENT_RE.test(inc)) continue;
		return false;
	}
	return current.length === incoming.length;
};
function createMatcherFromFind(findRouteRules, canOverride = canOverrideRouteShape) {
	return (method, pathname) => {
		const rawLayers = findRouteRules(method, pathname);
		let altLayers;
		let hasAltMatch = false;
		const readings = alternateReadings(pathname);
		if (readings) {
			altLayers = [];
			for (const reading of readings) {
				const layers = findRouteRules(method, reading);
				if (layers?.length) hasAltMatch = true;
				altLayers.push(layers);
			}
		}
		if (!rawLayers?.length && !hasAltMatch) return {
			routeRules: {},
			matchedRules: {},
			routeRuleMiddleware: []
		};
		const matchedRules = mergeMatchedRouteRules(rawLayers, altLayers, canOverride);
		return {
			routeRules: toRouteRules(matchedRules),
			matchedRules,
			routeRuleMiddleware: buildRouteRuleMiddleware(matchedRules)
		};
	};
}
function toRouteRules(matchedRules) {
	const routeRules = Object.create(null);
	for (const name in matchedRules) routeRules[name] = matchedRules[name].options;
	return routeRules;
}
function buildRouteRuleMiddleware(matchedRules) {
	const routeRuleMiddleware = [];
	const rules = Object.entries(matchedRules);
	if (rules.length > 1) rules.sort(compareRuleOrder);
	for (const [, rule] of rules) {
		if (!rule.handler) continue;
		routeRuleMiddleware.push(rule.handler.handler(rule));
	}
	return routeRuleMiddleware;
}
function memoizeRouteRulesMatcher(matcher, opts) {
	const max = opts?.max ?? 1024;
	if (max <= 0) return matcher;
	const memo = /* @__PURE__ */ new Map();
	let hand;
	const evict = () => {
		for (;;) {
			let next = hand?.next();
			if (!next || next.done) {
				hand = memo.values();
				next = hand.next();
				if (next.done) return;
			}
			const entry = next.value;
			if (entry.visited) entry.visited = false;
			else {
				memo.delete(entry.key);
				return;
			}
		}
	};
	return (method, pathname) => {
		const key = method + " " + pathname;
		const entry = memo.get(key);
		if (entry) {
			entry.visited = true;
			return entry.result;
		}
		const result = matcher(method, pathname);
		if (memo.size >= max) evict();
		memo.set(key, {
			key,
			result,
			visited: false
		});
		return result;
	};
}
function alternateReadings(pathname) {
	const recase = pathname.includes("%") && !isNonCanonicalPathname(pathname);
	const upper = recase ? recaseEscapes(pathname, true) : pathname;
	const lower = recase ? recaseEscapes(pathname, false) : pathname;
	const decoded = decodedPath(pathname);
	const encoded = encodedReading(decoded);
	const lowerEncoded = recaseEscapes(encoded, false);
	if (upper === pathname && lower === pathname && decoded === pathname && encoded === pathname && lowerEncoded === pathname && !needsCanonicalPasses(pathname)) return;
	const readings = [];
	pushReading(readings, pathname, upper);
	pushReading(readings, pathname, lower);
	const spellings = [pathname];
	for (const spelling of [
		encoded,
		lowerEncoded,
		decoded
	]) if (!spellings.includes(spelling)) spellings.push(spelling);
	for (const spelling of spellings) {
		if (!needsCanonicalPasses(spelling)) {
			pushReading(readings, pathname, spelling);
			continue;
		}
		const canonical = canonicalPath(spelling);
		pushReading(readings, pathname, canonical);
		const merged = mergedCanonicalPath(spelling, canonical);
		if (merged !== void 0) pushReading(readings, pathname, merged);
	}
	return readings.length > 0 ? readings : void 0;
}
var ESCAPE_RE_G = /%[\da-f]{2}/gi;
var ROU3_ENCODED_RE = /[\0- "#<>^`\x7F-\uFFFF]|\\[{}?]/;
var LOWER_HEX_ESCAPE_RE = /%(?:[a-f][\da-fA-F]|[\dA-F][a-f])/;
var UPPER_HEX_ESCAPE_RE = /%(?:[A-F][\da-fA-F]|[\da-f][A-F])/;
function registeredPattern(pattern) {
	return LOWER_HEX_ESCAPE_RE.test(pattern) && (UPPER_HEX_ESCAPE_RE.test(pattern) || ROU3_ENCODED_RE.test(pattern)) && !hasConstraint(pattern) ? recaseEscapes(pattern, true) : pattern;
}
function hasConstraint(pattern) {
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern.charCodeAt(i);
		if (c === 92) i++;
		else if (c === 40) return true;
	}
	return false;
}
function recaseEscapes(path, upper) {
	return path.includes("%") ? path.replace(ESCAPE_RE_G, (escape) => upper ? escape.toUpperCase() : escape.toLowerCase()) : path;
}
function pushReading(readings, pathname, reading) {
	if (reading !== pathname && !readings.includes(reading)) readings.push(reading);
}
var compareRuleOrder = (a, b) => orderWeight(a[1].handler) - orderWeight(b[1].handler) || (a[0] < b[0] ? -1 : 1);
function orderWeight(handler) {
	return handler?.order ?? 0;
}
function withScopeBase(name, options, baseURL) {
	if ((name === "redirect" || name === "proxy") && options !== null && typeof options === "object" && typeof options.base === "string") return {
		...options,
		base: baseURL + options.base
	};
	return options;
}
function addRuleRoute(router, method, path, data) {
	try {
		addRoute(router, method, path, data);
	} catch (error) {
		throw new Error(`[h3] rules: invalid route pattern \`${path}\`: ${error.message}`, { cause: error });
	}
}
function normalizeRouteRules(config) {
	const normalizedRules = {};
	for (const key in config) {
		const routeConfig = config[key];
		const unknownMethod = unknownMethodPrefix(key);
		if (unknownMethod !== void 0) throw new Error(`[h3] rules: \`${key}\` looks method-scoped but \`${unknownMethod}\` is not a recognized HTTP method — as a literal path this rule can never match. Use one of ${[...HTTP_METHODS].join(", ")}, remove the prefix for an all-methods rule, or add a leading \`/\` for a literal path`);
		const { method, path: rawPath } = parseRouteKey(key);
		const path = decodeRoutePattern(rawPath);
		const canonicalKey = formatRouteKey(method, path);
		validateBuiltinRules(routeConfig, canonicalKey);
		const { redirect, proxy, cors, swr, cache, ...rest } = routeConfig;
		const routeRules = rest;
		if (redirect) {
			const redirectOptions = {
				to: "/",
				status: 307,
				...typeof redirect === "string" ? { to: redirect } : redirect
			};
			const base = catchAllBase(path);
			if (base !== void 0) redirectOptions.base = base;
			assertNoHostSplat(redirectOptions.to, "redirect", canonicalKey);
			routeRules.redirect = redirectOptions;
		}
		if (proxy) {
			const proxyOptions = typeof proxy === "string" ? { to: proxy } : { ...proxy };
			const base = catchAllBase(path);
			if (base !== void 0) proxyOptions.base = base;
			assertNoHostSplat(proxyOptions.to, "proxy", canonicalKey);
			routeRules.proxy = proxyOptions;
		}
		if (cors !== void 0 && cors !== false) {
			const corsOptions = cors === true ? {} : { ...cors };
			if (corsOptions.credentials === true && (!corsOptions.origin || corsOptions.origin === "*" || Array.isArray(corsOptions.origin) && corsOptions.origin.includes("*"))) throw new Error(`[h3] rules: \`cors\` rule for \`${canonicalKey}\` sets \`credentials: true\` with a wildcard origin — \`Access-Control-Allow-Origin: *\` is invalid for credentialed requests; set an explicit \`origin\` allowlist (or validation function)`);
			routeRules.cors = corsOptions;
		}
		if (swr !== void 0 && swr !== false) {
			const cacheOptions = { ...cache || void 0 };
			cacheOptions.swr = true;
			if (typeof swr === "number") cacheOptions.maxAge = swr;
			routeRules.cache = cacheOptions;
		} else if (swr === false && cache === void 0) routeRules.cache = false;
		else if (cache !== void 0 && cache !== false) routeRules.cache = cache;
		if (cache === false) routeRules.cache = false;
		if (redirect === false) routeRules.redirect = false;
		if (proxy === false) routeRules.proxy = false;
		if (cors === false) routeRules.cors = false;
		for (const name in routeRules) {
			if (name === "__proto__" || name === "constructor" || name === "prototype") throw new Error(`[h3] rules: \`${name}\` is a reserved name and cannot be used as a rule for \`${canonicalKey}\``);
			if (Array.isArray(routeRules[name])) throw new Error(`[h3] rules: \`${name}\` rule for \`${canonicalKey}\` is an array — rule options cannot be top-level arrays (ambiguous merge semantics); wrap it in an object`);
		}
		const existing = normalizedRules[canonicalKey];
		if (existing) for (const [name, options] of Object.entries(routeRules)) existing[name] = mergeRuleOptions(existing[name], options);
		else normalizedRules[canonicalKey] = routeRules;
	}
	return normalizedRules;
}
var TRAILING_CATCH_ALL_RE = /\/\*\*(?::[^/]+)?$/;
function catchAllBase(path) {
	const match = TRAILING_CATCH_ALL_RE.exec(path);
	return match ? path.slice(0, match.index) : void 0;
}
function assertNoHostSplat(to, name, canonicalKey) {
	if (isHostPositionSplat(to)) throw new Error(`[h3] rules: \`${name}\` rule for \`${canonicalKey}\` has \`**\` in the target host (\`${to}\`) — \`**\` interpolates the matched path tail and must come after the target's host, in its path, query, or fragment`);
}
var BUILTIN_RULE_NAMES = [
	"cache",
	"headers",
	"redirect",
	"proxy",
	"cors",
	"swr"
];
function validateBuiltinRules(routeConfig, canonicalKey) {
	for (const name of BUILTIN_RULE_NAMES) {
		const value = routeConfig[name];
		if (value || value === void 0 || value === false) continue;
		if (name === "swr" && value === 0) continue;
		throw new Error(`[h3] rules: \`${name}\` rule for \`${canonicalKey}\` is \`${String(value)}\` — use \`false\` to disable a rule inherited from a less-specific pattern, or provide options`);
	}
}
export { createMatcherFromFind, createRulesRouter, headers, isCanonicalPath, memoizeRouteRulesMatcher, normalizeRoute, normalizeRouteRules, parseRouteKey };
