import { colors, dirname$2, glob, join$2, r$2, relative$2, resolve$2, runParallel, src_default, withBase, withLeadingSlash, withoutTrailingSlash } from "./common.mjs";
import { __commonJSMin, __require } from "../_common.mjs";
import { promises } from "node:fs";
import { promisify } from "node:util";
import zlib from "node:zlib";
// node_modules/nitro/dist/_chunks/utils.mjs
var methodSuffixes = /* @__PURE__ */ new Set([
	"connect",
	"delete",
	"get",
	"head",
	"options",
	"patch",
	"post",
	"put",
	"query",
	"trace"
]);
var envSuffixes = /* @__PURE__ */ new Set([
	"dev",
	"prod",
	"prerender"
]);
var lastSuffixRe = /(?<=[^/])\.([a-z]+)$/;
var orderPrefixRe = /(?:^|\/)\d+$/;
function parseScanPath(nitro, file, opts = {}) {
	const result = { name: file.path.replace(/\.[A-Za-z]+$/, "") };
	const env = result.name.match(lastSuffixRe)?.[1];
	if (opts.env && env && envSuffixes.has(env)) {
		result.env = env;
		result.name = result.name.slice(0, -env.length - 1);
	}
	const method = result.name.match(lastSuffixRe)?.[1];
	if (opts.method && method && methodSuffixes.has(method)) {
		result.method = method;
		result.name = result.name.slice(0, -method.length - 1);
	}
	const suffix = result.name.match(lastSuffixRe)?.[1];
	if (!suffix || opts.method && methodSuffixes.has(suffix) || opts.env && envSuffixes.has(suffix) || src_default.getType(suffix) || nitro.options.scanSuffixes?.includes(suffix) || !methodSuffixes.has(suffix) && !envSuffixes.has(suffix) && orderPrefixRe.test(result.name.slice(0, -suffix.length - 1))) return result;
	const filePath = `${file.dir}/${file.path}`;
	const message = methodSuffixes.has(suffix) || envSuffixes.has(suffix) ? `The \`.${suffix}\` suffix is not supported in \`${file.dir}/\` (\`${filePath}\`).` : `Unknown suffix \`.${suffix}\` in \`${filePath}\`. Nitro reserves dotted suffixes in scanned file names; known file extensions (e.g. \`.json\`, \`.md\`) are kept as-is. Add \`"${suffix}"\` to the \`scanSuffixes\` config to keep it as part of the name.`;
	if (nitro.options.dev) {
		nitro.logger.error(`${message} The file is ignored.`);
		return;
	}
	throw new Error(message);
}
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = __require("stream");
	var writeMethods = [
		"write",
		"end",
		"destroy"
	];
	var readMethods = ["resume", "pause"];
	var readEvents = ["data", "close"];
	var slice = Array.prototype.slice;
	module.exports = duplex;
	function forEach(arr, fn) {
		if (arr.forEach) return arr.forEach(fn);
		for (var i = 0; i < arr.length; i++) fn(arr[i], i);
	}
	function duplex(writer, reader) {
		var stream = new Stream();
		var ended = false;
		forEach(writeMethods, proxyWriter);
		forEach(readMethods, proxyReader);
		forEach(readEvents, proxyStream);
		reader.on("end", handleEnd);
		writer.on("drain", function() {
			stream.emit("drain");
		});
		writer.on("error", reemit);
		reader.on("error", reemit);
		stream.writable = writer.writable;
		stream.readable = reader.readable;
		return stream;
		function proxyWriter(methodName) {
			stream[methodName] = method;
			function method() {
				return writer[methodName].apply(writer, arguments);
			}
		}
		function proxyReader(methodName) {
			stream[methodName] = method;
			function method() {
				stream.emit(methodName);
				var func = reader[methodName];
				if (func) return func.apply(reader, arguments);
				reader.emit(methodName);
			}
		}
		function proxyStream(methodName) {
			reader.on(methodName, reemit);
			function reemit() {
				var args = slice.call(arguments);
				args.unshift(methodName);
				stream.emit.apply(stream, args);
			}
		}
		function handleEnd() {
			if (ended) return;
			ended = true;
			var args = slice.call(arguments);
			args.unshift("end");
			stream.emit.apply(stream, args);
		}
		function reemit(err) {
			stream.emit("error", err);
		}
	}
})))();
var getOptions = (options) => ({
	level: 9,
	...options
});
var gzip = promisify(zlib.gzip);
async function gzipSize(input, options) {
	if (!input) return 0;
	return (await gzip(input, getOptions(options))).length;
}
var UNIT_SETS = [
	[
		"B",
		"kB",
		"MB",
		"GB",
		"TB",
		"PB",
		"EB",
		"ZB",
		"YB"
	],
	[
		"B",
		"KiB",
		"MiB",
		"GiB",
		"TiB",
		"PiB",
		"EiB",
		"ZiB",
		"YiB"
	],
	[
		"b",
		"kbit",
		"Mbit",
		"Gbit",
		"Tbit",
		"Pbit",
		"Ebit",
		"Zbit",
		"Ybit"
	],
	[
		"b",
		"kibit",
		"Mibit",
		"Gibit",
		"Tibit",
		"Pibit",
		"Eibit",
		"Zibit",
		"Yibit"
	]
];
var toDecimalString = (number) => {
	if (number >= 1e-6 && number < 1e21) return String(number);
	const [mantissa, exponentString] = number.toExponential().split("e");
	const digits = mantissa.replace(".", "");
	const pointPosition = Number(exponentString) + 1;
	const isPositive = pointPosition > 0;
	const padded = isPositive ? digits.padEnd(pointPosition, "0") : "0".repeat(1 - pointPosition) + digits;
	const integerPart = padded.slice(0, isPositive ? pointPosition : 1);
	const fractionPart = padded.slice(isPositive ? pointPosition : 1).replace(/0+$/, "");
	return fractionPart ? `${integerPart}.${fractionPart}` : integerPart;
};
var toLocaleString = (number, locale, options) => {
	if (typeof locale === "string" || Array.isArray(locale) || locale === true) {
		const locales = locale === true ? void 0 : locale;
		if (options !== void 0) return number.toLocaleString(locales, options);
		const text = toDecimalString(number);
		const pointIndex = text.indexOf(".");
		const maximumFractionDigits = pointIndex === -1 ? 0 : text.length - pointIndex - 1;
		if (maximumFractionDigits > 100) return text;
		return number.toLocaleString(locales, { maximumFractionDigits });
	}
	if (options === void 0) return toDecimalString(number);
	return number.toLocaleString("en-US", {
		...options,
		useGrouping: false
	});
};
var log10 = (numberOrBigInt) => {
	if (typeof numberOrBigInt === "number") return Math.log10(numberOrBigInt);
	const string = numberOrBigInt.toString(10);
	return string.length + Math.log10(`0.${string.slice(0, 15)}`);
};
var log = (numberOrBigInt) => {
	if (typeof numberOrBigInt === "number") return Math.log(numberOrBigInt);
	return log10(numberOrBigInt) * Math.log(10);
};
var divide = (numberOrBigInt, base, exponent) => {
	const divisor = base ** exponent;
	if (typeof numberOrBigInt === "number" || numberOrBigInt <= Number.MAX_SAFE_INTEGER) return Number(numberOrBigInt) / divisor;
	const bigintDivisor = BigInt(base) ** BigInt(exponent);
	const integerPart = numberOrBigInt / bigintDivisor;
	const remainder = numberOrBigInt % bigintDivisor;
	return Number(integerPart) + Number(remainder) / divisor;
};
var toUnrepresentableString = (number, base, exponent, localeOptions) => {
	const scale = BigInt(base) ** BigInt(exponent);
	const whole = number / scale;
	if (localeOptions === void 0) return whole.toString();
	const minimumFractionDigits = localeOptions.minimumFractionDigits ?? 0;
	const maximumFractionDigits = Math.max(localeOptions.maximumFractionDigits ?? 3, minimumFractionDigits);
	const fraction = (number % scale * 10n ** BigInt(maximumFractionDigits) / scale).toString().padStart(maximumFractionDigits, "0").replace(/0+$/, "").padEnd(minimumFractionDigits, "0");
	return fraction ? `${whole}.${fraction}` : whole.toString();
};
var signOf = (number, signed) => {
	if (number < 0) return "-";
	if (!signed) return "";
	return number === 0 || number === 0n ? " " : "+";
};
var assertFixedWidth = (fixedWidth) => {
	if (fixedWidth !== void 0 && (typeof fixedWidth !== "number" || !Number.isSafeInteger(fixedWidth) || fixedWidth < 0)) throw new TypeError(`Expected fixedWidth to be a non-negative integer, got ${typeof fixedWidth}: ${fixedWidth}`);
};
var assertFractionDigits = (name, value) => {
	if (value !== void 0 && (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 100)) throw new TypeError(`Expected ${name} to be an integer between 0 and 100, got ${typeof value}: ${value}`);
};
var buildLocaleOptions = (options) => {
	const { minimumFractionDigits, maximumFractionDigits } = options;
	if (minimumFractionDigits === void 0 && maximumFractionDigits === void 0) return;
	assertFractionDigits("minimumFractionDigits", minimumFractionDigits);
	assertFractionDigits("maximumFractionDigits", maximumFractionDigits);
	if (minimumFractionDigits > maximumFractionDigits) throw new RangeError(`Expected minimumFractionDigits (${minimumFractionDigits}) to not be greater than maximumFractionDigits (${maximumFractionDigits})`);
	return {
		...minimumFractionDigits !== void 0 && { minimumFractionDigits },
		...maximumFractionDigits !== void 0 && { maximumFractionDigits },
		roundingMode: "trunc"
	};
};
function prettyBytes(number, options) {
	if (typeof number !== "bigint" && !Number.isFinite(number)) throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
	options = {
		bits: false,
		binary: false,
		space: true,
		nonBreakingSpace: false,
		...options
	};
	assertFixedWidth(options.fixedWidth);
	const localeOptions = buildLocaleOptions(options);
	const UNITS = UNIT_SETS[(options.bits ? 2 : 0) + (options.binary ? 1 : 0)];
	const separator = options.space ? options.nonBreakingSpace ? "\xA0" : " " : "";
	if (Object.is(number, -0)) number = 0;
	const prefix = signOf(number, options.signed);
	if (number < 0) number = -number;
	const base = options.binary ? 1024 : 1e3;
	let exponent = 0;
	if (number >= 1) exponent = Math.min(Math.floor(options.binary ? log(number) / Math.log(base) : log10(number) / 3), UNITS.length - 1);
	const scaled = divide(number, base, exponent);
	let numberString;
	if (Number.isFinite(scaled)) {
		number = scaled;
		if (number < 1 && exponent > 0) {
			number *= base;
			exponent -= 1;
		}
		if (!localeOptions) {
			const minimumPrecision = Math.max(3, Math.floor(number).toString().length);
			number = Number(number.toPrecision(minimumPrecision));
			if (number >= base && exponent < UNITS.length - 1) {
				number /= base;
				exponent += 1;
			}
		}
		numberString = toLocaleString(number, options.locale, localeOptions);
	} else numberString = toUnrepresentableString(number, base, exponent, localeOptions);
	return (prefix + numberString + separator + UNITS[exponent]).padStart(options.fixedWidth ?? 0);
}
async function generateFSTree(dir, options = {}) {
	if (r$2) return;
	const files = await glob("**/*.*", {
		cwd: dir,
		ignore: ["**/*.map"],
		followSymbolicLinks: false,
		dot: true
	});
	const compressedSizes = options.compressedSizes && !files.some((file) => file.includes("node_modules"));
	const items = [];
	await runParallel(new Set(files), async (file) => {
		const path = resolve$2(dir, file);
		const src = await promises.readFile(path);
		const size = src.byteLength;
		const gzip = compressedSizes ? await gzipSize(src) : 0;
		items.push({
			file,
			path,
			size,
			gzip
		});
	}, { concurrency: 10 });
	items.sort((a, b) => a.path.localeCompare(b.path));
	let totalSize = 0;
	let totalGzip = 0;
	let totalNodeModulesSize = 0;
	let treeText = "";
	for (const [index, item] of items.entries()) {
		let dir = dirname$2(item.file);
		if (dir === ".") dir = "";
		const rpath = relative$2(process.cwd(), item.path);
		const treeChar = index === items.length - 1 ? "└─" : "├─";
		if (item.file.includes("node_modules")) {
			totalNodeModulesSize += item.size;
			continue;
		}
		treeText += colors.gray(`  ${treeChar} ${rpath} (${prettyBytes(item.size)})`);
		if (compressedSizes) treeText += colors.gray(` (${prettyBytes(item.gzip)} gzip)`);
		treeText += "\n";
		totalSize += item.size;
		totalGzip += item.gzip;
	}
	treeText += `${colors.cyan("Σ Total size:")} ${prettyBytes(totalSize + totalNodeModulesSize)}`;
	if (compressedSizes) treeText += ` (${prettyBytes(totalGzip)} gzip)`;
	treeText += "\n";
	return treeText;
}
// node_modules/nitro/dist/_chunks/nitro2.mjs
var GLOB_SCAN_IGNORE = ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,tsx,jsx}", "**/*.d.{ts,mts,cts}"];
var GLOB_MODULES_SCAN_PATTERN = ["*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}", "*/index.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"];
async function scanAndSyncOptions(nitro) {
	const scannedPlugins = await scanPlugins(nitro);
	for (const plugin of scannedPlugins) if (!nitro.options.plugins.includes(plugin)) nitro.options.plugins.push(plugin);
	if (nitro.options.experimental.tasks) {
		const scannedTasks = await scanTasks(nitro);
		for (const scannedTask of scannedTasks) if (scannedTask.name in nitro.options.tasks) {
			if (!nitro.options.tasks[scannedTask.name].handler) nitro.options.tasks[scannedTask.name].handler = scannedTask.handler;
		} else nitro.options.tasks[scannedTask.name] = {
			handler: scannedTask.handler,
			description: ""
		};
	}
	const scannedModules = await scanModules(nitro);
	nitro.options.modules = nitro.options.modules || [];
	for (const modPath of scannedModules) if (!nitro.options.modules.includes(modPath)) nitro.options.modules.push(modPath);
}
async function scanHandlers(nitro) {
	const middleware = await scanMiddleware(nitro);
	const handlers = await Promise.all([scanServerRoutes(nitro, nitro.options.apiDir || "api", nitro.options.apiBaseURL || "/api"), scanServerRoutes(nitro, nitro.options.routesDir || "routes")]).then((r) => r.flat());
	const seenHandlers = /* @__PURE__ */ new Set();
	nitro.scannedHandlers = [...middleware, ...handlers.filter((h) => {
		const key = `${h.route}\0${h.method}\0${h.env}`;
		return seenHandlers.has(key) ? false : (seenHandlers.add(key), true);
	})];
	nitro.routing.sync();
	return handlers;
}
async function scanMiddleware(nitro) {
	return (await scanFiles(nitro, "middleware")).map((file) => {
		return {
			route: "/**",
			middleware: true,
			handler: file.fullPath
		};
	});
}
async function scanServerRoutes(nitro, dir, prefix = "/") {
	return (await scanFiles(nitro, dir, { suffixes: {
		method: true,
		env: true
	} })).map((file) => {
		const paramName = (name) => {
			const sanitized = name.replace(/\W/g, "_");
			if (name.includes("-")) nitro.logger.warn(`Route param \`[${name}]\` in \`${file.path}\` is available as \`params.${sanitized}\`, since param names cannot contain \`-\`. Rename it to silence this warning.`);
			return sanitized;
		};
		let route = file.name.replace(/\(([^(/\\]+)\)[/\\]/g, "").replace(/\[\.{3}]/g, "**").replace(/\[\.{3}([^\]]+)]/g, (_, p) => ":" + paramName(p) + "(.*)").replace(/\[([^/\]]+)]/g, (_, p) => ":" + paramName(p));
		route = withLeadingSlash(withoutTrailingSlash(withBase(route, prefix)));
		route = route.replace(/\/index$/, "") || "/";
		return {
			handler: file.fullPath,
			lazy: true,
			middleware: false,
			route,
			method: file.method,
			env: file.env
		};
	});
}
async function scanPlugins(nitro) {
	return (await scanFiles(nitro, "plugins")).map((f) => f.fullPath);
}
async function scanTasks(nitro) {
	return (await scanFiles(nitro, "tasks")).map((f) => {
		return {
			name: f.path.replace(/\/index$/, "").replace(/\.[A-Za-z]+$/, "").replace(/\//g, ":"),
			handler: f.fullPath
		};
	});
}
async function scanModules(nitro) {
	return (await scanFiles(nitro, "modules", { pattern: GLOB_MODULES_SCAN_PATTERN })).map((f) => f.fullPath);
}
async function scanFiles(nitro, name, opts = {}) {
	return (await Promise.all(nitro.options.scanDirs.map((dir) => scanDir(nitro, dir, name, opts.pattern || "**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"))).then((r) => r.flat())).flatMap((file) => {
		const parsed = parseScanPath(nitro, {
			dir: name,
			path: file.path
		}, opts.suffixes);
		return parsed ? [{
			...file,
			...parsed
		}] : [];
	});
}
async function scanDir(nitro, dir, name, pattern) {
	const patterns = (Array.isArray(pattern) ? pattern : [pattern]).map((p) => join$2(name, p));
	return (await glob(patterns, {
		cwd: dir,
		dot: true,
		ignore: [...GLOB_SCAN_IGNORE, ...nitro.options.ignore || []],
		absolute: true
	}).catch((error) => {
		if (error?.code === "ENOTDIR") {
			nitro.logger.warn(`Ignoring \`${join$2(dir, name)}\`. It must be a directory.`);
			return [];
		}
		throw error;
	})).map((fullPath) => {
		return {
			fullPath,
			path: relative$2(join$2(dir, name), fullPath)
		};
	}).sort((a, b) => a.path.localeCompare(b.path));
}
export { generateFSTree, scanAndSyncOptions, scanHandlers };
