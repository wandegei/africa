import { __commonJSMin, __require as __require$1, __toESM } from "../_common.mjs";
import { compileRouteRules } from "../_libs/h3+rou32.mjs";
import $e, { builtinModules, createRequire } from "node:module";
import { Readable } from "node:stream";
import fs, { existsSync, promises, readFileSync, realpathSync, statSync, watch } from "node:fs";
import { URL as URL$1, fileURLToPath, pathToFileURL } from "node:url";
import * as sp from "node:path";
import path, { basename, dirname, isAbsolute, join, resolve, sep } from "node:path";
import fs$1, { lstat, mkdir, open, readFile, readdir, readlink, realpath, rm, stat as stat$1, writeFile } from "node:fs/promises";
import { createRequire as createRequire$1 } from "module";
import { fileURLToPath as fileURLToPath$1 } from "url";
import path10, { basename as basename$1, dirname as dirname$1, isAbsolute as isAbsolute$1, normalize as normalize$1, posix, relative as relative$1, resolve as resolve$1, sep as sep$1, win32 } from "path";
import * as nativeFs from "fs";
import fs4, { readdir as readdir$1, readdirSync, realpath as realpath$1, realpathSync as realpathSync$1, stat as stat$2, statSync as statSync$1 } from "fs";
import Ue from "os";
import { type } from "node:os";
import assert from "node:assert";
import process$1 from "node:process";
import { format, formatWithOptions, inspect } from "node:util";
import { createHash, randomBytes } from "node:crypto";
import * as tty from "node:tty";
import zlib from "node:zlib";
import { EventEmitter } from "node:events";
// node_modules/nitro/dist/runtime/_meta.mjs
var version = "3.0.261103-rc";
var resolve$3 = (path) => fileURLToPath(new URL(path, import.meta.url));
var runtimeDir = /* @__PURE__ */ resolve$3("./");
var presetsDir = /* @__PURE__ */ resolve$3("../presets/");
var pkgDir = /* @__PURE__ */ resolve$3("../../");
var runtimeDependencies = [
	"crossws",
	"h3",
	"ocache",
	"rou3",
	"srvx"
];
// node_modules/nitro/dist/_build/common.mjs
var LogLevels = {
	silent: Number.NEGATIVE_INFINITY,
	fatal: 0,
	error: 0,
	warn: 1,
	log: 2,
	info: 3,
	success: 3,
	fail: 3,
	ready: 3,
	start: 3,
	box: 3,
	debug: 4,
	trace: 5,
	verbose: Number.POSITIVE_INFINITY
};
var LogTypes = {
	silent: { level: -1 },
	fatal: { level: LogLevels.fatal },
	error: { level: LogLevels.error },
	warn: { level: LogLevels.warn },
	log: { level: LogLevels.log },
	info: { level: LogLevels.info },
	success: { level: LogLevels.success },
	fail: { level: LogLevels.fail },
	ready: { level: LogLevels.info },
	start: { level: LogLevels.info },
	box: { level: LogLevels.info },
	debug: { level: LogLevels.debug },
	trace: { level: LogLevels.trace },
	verbose: { level: LogLevels.verbose }
};
function isPlainObject$1(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject$1(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = Object.assign({}, defaults);
	for (const key in baseObject) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject$1(value) && isPlainObject$1(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
var defu = createDefu();
function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj(arg) {
	if (!isPlainObject(arg)) return false;
	if (!arg.message && !arg.args) return false;
	if (arg.stack) return false;
	return true;
}
var paused = false;
var queue = [];
var Consola = class Consola {
	options;
	_lastLog;
	_mockFn;
	constructor(options = {}) {
		const types = options.types || LogTypes;
		this.options = defu({
			...options,
			defaults: { ...options.defaults },
			level: _normalizeLogLevel(options.level, types),
			reporters: [...options.reporters || []]
		}, {
			types: LogTypes,
			throttle: 1e3,
			throttleMin: 5,
			formatOptions: {
				date: true,
				colors: false,
				compact: true
			}
		});
		for (const type in types) {
			const defaults = {
				type,
				...this.options.defaults,
				...types[type]
			};
			this[type] = this._wrapLogFn(defaults);
			this[type].raw = this._wrapLogFn(defaults, true);
		}
		if (this.options.mockFn) this.mockTypes();
		this._lastLog = {};
	}
	get level() {
		return this.options.level;
	}
	set level(level) {
		this.options.level = _normalizeLogLevel(level, this.options.types, this.options.level);
	}
	prompt(message, opts) {
		if (!this.options.prompt) throw new Error("prompt is not supported!");
		return this.options.prompt(message, opts);
	}
	create(options) {
		const instance = new Consola({
			...this.options,
			...options
		});
		if (this._mockFn) instance.mockTypes(this._mockFn);
		return instance;
	}
	withDefaults(defaults) {
		return this.create({
			...this.options,
			defaults: {
				...this.options.defaults,
				...defaults
			}
		});
	}
	withTag(tag) {
		return this.withDefaults({ tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag });
	}
	addReporter(reporter) {
		this.options.reporters.push(reporter);
		return this;
	}
	removeReporter(reporter) {
		if (reporter) {
			const i = this.options.reporters.indexOf(reporter);
			if (i !== -1) return this.options.reporters.splice(i, 1);
		} else this.options.reporters.splice(0);
		return this;
	}
	setReporters(reporters) {
		this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
		return this;
	}
	wrapAll() {
		this.wrapConsole();
		this.wrapStd();
	}
	restoreAll() {
		this.restoreConsole();
		this.restoreStd();
	}
	wrapConsole() {
		for (const type in this.options.types) {
			if (!console["__" + type]) console["__" + type] = console[type];
			console[type] = this[type].raw;
		}
	}
	restoreConsole() {
		for (const type in this.options.types) if (console["__" + type]) {
			console[type] = console["__" + type];
			delete console["__" + type];
		}
	}
	wrapStd() {
		this._wrapStream(this.options.stdout, "log");
		this._wrapStream(this.options.stderr, "log");
	}
	_wrapStream(stream, type) {
		if (!stream) return;
		if (!stream.__write) stream.__write = stream.write;
		stream.write = (data) => {
			this[type].raw(String(data).trim());
		};
	}
	restoreStd() {
		this._restoreStream(this.options.stdout);
		this._restoreStream(this.options.stderr);
	}
	_restoreStream(stream) {
		if (!stream) return;
		if (stream.__write) {
			stream.write = stream.__write;
			delete stream.__write;
		}
	}
	pauseLogs() {
		paused = true;
	}
	resumeLogs() {
		paused = false;
		const _queue = queue.splice(0);
		for (const item of _queue) item[0]._logFn(item[1], item[2]);
	}
	mockTypes(mockFn) {
		const _mockFn = mockFn || this.options.mockFn;
		this._mockFn = _mockFn;
		if (typeof _mockFn !== "function") return;
		for (const type in this.options.types) {
			this[type] = _mockFn(type, this.options.types[type]) || this[type];
			this[type].raw = this[type];
		}
	}
	_wrapLogFn(defaults, isRaw) {
		return (...args) => {
			if (paused) {
				queue.push([
					this,
					defaults,
					args,
					isRaw
				]);
				return;
			}
			return this._logFn(defaults, args, isRaw);
		};
	}
	_logFn(defaults, args, isRaw) {
		if ((defaults.level || 0) > this.level) return false;
		const logObj = {
			date: /* @__PURE__ */ new Date(),
			args: [],
			...defaults,
			level: _normalizeLogLevel(defaults.level, this.options.types)
		};
		if (!isRaw && args.length === 1 && isLogObj(args[0])) Object.assign(logObj, args[0]);
		else logObj.args = [...args];
		if (logObj.message) {
			logObj.args.unshift(logObj.message);
			delete logObj.message;
		}
		if (logObj.additional) {
			if (!Array.isArray(logObj.additional)) logObj.additional = logObj.additional.split("\n");
			logObj.args.push("\n" + logObj.additional.join("\n"));
			delete logObj.additional;
		}
		logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
		logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
		const resolveLog = (newLog = false) => {
			const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
			if (this._lastLog.object && repeated > 0) {
				const args2 = [...this._lastLog.object.args];
				if (repeated > 1) args2.push(`(repeated ${repeated} times)`);
				this._log({
					...this._lastLog.object,
					args: args2
				});
				this._lastLog.count = 1;
			}
			if (newLog) {
				this._lastLog.object = logObj;
				this._log(logObj);
			}
		};
		clearTimeout(this._lastLog.timeout);
		const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
		this._lastLog.time = logObj.date;
		if (diffTime < this.options.throttle) try {
			const serializedLog = JSON.stringify([
				logObj.type,
				logObj.tag,
				logObj.args
			]);
			const isSameLog = this._lastLog.serialized === serializedLog;
			this._lastLog.serialized = serializedLog;
			if (isSameLog) {
				this._lastLog.count = (this._lastLog.count || 0) + 1;
				if (this._lastLog.count > this.options.throttleMin) {
					this._lastLog.timeout = setTimeout(resolveLog, this.options.throttle);
					return;
				}
			}
		} catch {}
		resolveLog(true);
	}
	_log(logObj) {
		for (const reporter of this.options.reporters) reporter.log(logObj, { options: this.options });
	}
};
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
	if (input === void 0) return defaultLevel;
	if (typeof input === "number") return input;
	if (types[input] && types[input].level !== void 0) return types[input].level;
	return defaultLevel;
}
Consola.prototype.add = Consola.prototype.addReporter;
Consola.prototype.remove = Consola.prototype.removeReporter;
Consola.prototype.clear = Consola.prototype.removeReporter;
Consola.prototype.withScope = Consola.prototype.withTag;
Consola.prototype.mock = Consola.prototype.mockTypes;
Consola.prototype.pause = Consola.prototype.pauseLogs;
Consola.prototype.resume = Consola.prototype.resumeLogs;
function createConsola$1(options = {}) {
	return new Consola(options);
}
function parseStack(stack, message) {
	const cwd = process.cwd() + sep;
	return stack.split("\n").splice(message.split("\n").length).map((l) => l.trim().replace("file://", "").replace(cwd, ""));
}
function writeStream(data, stream) {
	return (stream.__write || stream.write).call(stream, data);
}
var bracket = (x) => x ? `[${x}]` : "";
var BasicReporter = class {
	formatStack(stack, message, opts) {
		const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
		return indent + parseStack(stack, message).join(`
${indent}`);
	}
	formatError(err, opts) {
		const message = err.message ?? formatWithOptions(opts, err);
		const stack = err.stack ? this.formatStack(err.stack, message, opts) : "";
		const level = opts?.errorLevel || 0;
		const causedPrefix = level > 0 ? `${"  ".repeat(level)}[cause]: ` : "";
		const causedError = err.cause ? "\n\n" + this.formatError(err.cause, {
			...opts,
			errorLevel: level + 1
		}) : "";
		return causedPrefix + message + "\n" + stack + causedError;
	}
	formatArgs(args, opts) {
		const _args = args.map((arg) => {
			if (arg && typeof arg.stack === "string") return this.formatError(arg, opts);
			return arg;
		});
		return formatWithOptions(opts, ..._args);
	}
	formatDate(date, opts) {
		return opts.date ? date.toLocaleTimeString() : "";
	}
	filterAndJoin(arr) {
		return arr.filter(Boolean).join(" ");
	}
	formatLogObj(logObj, opts) {
		const message = this.formatArgs(logObj.args, opts);
		if (logObj.type === "box") return "\n" + [
			bracket(logObj.tag),
			logObj.title && logObj.title,
			...message.split("\n")
		].filter(Boolean).map((l) => " > " + l).join("\n") + "\n";
		return this.filterAndJoin([
			bracket(logObj.type),
			bracket(logObj.tag),
			message
		]);
	}
	log(logObj, ctx) {
		return writeStream(this.formatLogObj(logObj, {
			columns: ctx.options.stdout.columns || 0,
			...ctx.options.formatOptions
		}) + "\n", logObj.level < 2 ? ctx.options.stderr || process.stderr : ctx.options.stdout || process.stdout);
	}
};
var { env = {}, argv = [], platform: platform$1 = "" } = typeof process === "undefined" ? {} : process;
var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
var isForced = "FORCE_COLOR" in env || argv.includes("--color");
var isWindows$2 = platform$1 === "win32";
var isDumbTerminal = env.TERM === "dumb";
var isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
var isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
var isColorSupported = !isDisabled && (isForced || isWindows$2 && !isDumbTerminal || isCompatibleTerminal || isCI);
function replaceClose(index, string, close, replace, head = string.slice(0, Math.max(0, index)) + replace, tail = string.slice(Math.max(0, index + close.length)), next = tail.indexOf(close)) {
	return head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
}
function clearBleed(index, string, open, close, replace) {
	return index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
}
function filterEmpty(open, close, replace = open, at = open.length + 1) {
	return (string) => string || !(string === "" || string === void 0) ? clearBleed(("" + string).indexOf(close, at), string, open, close, replace) : "";
}
function init(open, close, replace) {
	return filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
}
var colorDefs = {
	reset: init(0, 0),
	bold: init(1, 22, "\x1B[22m\x1B[1m"),
	dim: init(2, 22, "\x1B[22m\x1B[2m"),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49),
	blackBright: init(90, 39),
	redBright: init(91, 39),
	greenBright: init(92, 39),
	yellowBright: init(93, 39),
	blueBright: init(94, 39),
	magentaBright: init(95, 39),
	cyanBright: init(96, 39),
	whiteBright: init(97, 39),
	bgBlackBright: init(100, 49),
	bgRedBright: init(101, 49),
	bgGreenBright: init(102, 49),
	bgYellowBright: init(103, 49),
	bgBlueBright: init(104, 49),
	bgMagentaBright: init(105, 49),
	bgCyanBright: init(106, 49),
	bgWhiteBright: init(107, 49)
};
function createColors(useColor = isColorSupported) {
	return useColor ? colorDefs : Object.fromEntries(Object.keys(colorDefs).map((key) => [key, String]));
}
var colors = createColors();
function getColor$1(color, fallback = "reset") {
	return colors[color] || colors[fallback];
}
var ansiRegex$1 = [String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`, String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))`].join("|");
function stripAnsi$1(text) {
	return text.replace(new RegExp(ansiRegex$1, "g"), "");
}
var boxStylePresets = {
	solid: {
		tl: "┌",
		tr: "┐",
		bl: "└",
		br: "┘",
		h: "─",
		v: "│"
	},
	double: {
		tl: "╔",
		tr: "╗",
		bl: "╚",
		br: "╝",
		h: "═",
		v: "║"
	},
	doubleSingle: {
		tl: "╓",
		tr: "╖",
		bl: "╙",
		br: "╜",
		h: "─",
		v: "║"
	},
	doubleSingleRounded: {
		tl: "╭",
		tr: "╮",
		bl: "╰",
		br: "╯",
		h: "─",
		v: "║"
	},
	singleThick: {
		tl: "┏",
		tr: "┓",
		bl: "┗",
		br: "┛",
		h: "━",
		v: "┃"
	},
	singleDouble: {
		tl: "╒",
		tr: "╕",
		bl: "╘",
		br: "╛",
		h: "═",
		v: "│"
	},
	singleDoubleRounded: {
		tl: "╭",
		tr: "╮",
		bl: "╰",
		br: "╯",
		h: "═",
		v: "│"
	},
	rounded: {
		tl: "╭",
		tr: "╮",
		bl: "╰",
		br: "╯",
		h: "─",
		v: "│"
	}
};
var defaultStyle = {
	borderColor: "white",
	borderStyle: "rounded",
	valign: "center",
	padding: 2,
	marginLeft: 1,
	marginTop: 1,
	marginBottom: 1
};
function box(text, _opts = {}) {
	const opts = {
		..._opts,
		style: {
			...defaultStyle,
			..._opts.style
		}
	};
	const textLines = text.split("\n");
	const boxLines = [];
	const _color = getColor$1(opts.style.borderColor);
	const borderStyle = { ...typeof opts.style.borderStyle === "string" ? boxStylePresets[opts.style.borderStyle] || boxStylePresets.solid : opts.style.borderStyle };
	if (_color) for (const key in borderStyle) borderStyle[key] = _color(borderStyle[key]);
	const paddingOffset = opts.style.padding % 2 === 0 ? opts.style.padding : opts.style.padding + 1;
	const height = textLines.length + paddingOffset;
	const width = Math.max(...textLines.map((line) => stripAnsi$1(line).length), opts.title ? stripAnsi$1(opts.title).length : 0) + paddingOffset;
	const widthOffset = width + paddingOffset;
	const leftSpace = opts.style.marginLeft > 0 ? " ".repeat(opts.style.marginLeft) : "";
	if (opts.style.marginTop > 0) boxLines.push("".repeat(opts.style.marginTop));
	if (opts.title) {
		const title = _color ? _color(opts.title) : opts.title;
		const left = borderStyle.h.repeat(Math.floor((width - stripAnsi$1(opts.title).length) / 2));
		const right = borderStyle.h.repeat(width - stripAnsi$1(opts.title).length - stripAnsi$1(left).length + paddingOffset);
		boxLines.push(`${leftSpace}${borderStyle.tl}${left}${title}${right}${borderStyle.tr}`);
	} else boxLines.push(`${leftSpace}${borderStyle.tl}${borderStyle.h.repeat(widthOffset)}${borderStyle.tr}`);
	const valignOffset = opts.style.valign === "center" ? Math.floor((height - textLines.length) / 2) : opts.style.valign === "top" ? height - textLines.length - paddingOffset : height - textLines.length;
	for (let i = 0; i < height; i++) if (i < valignOffset || i >= valignOffset + textLines.length) boxLines.push(`${leftSpace}${borderStyle.v}${" ".repeat(widthOffset)}${borderStyle.v}`);
	else {
		const line = textLines[i - valignOffset];
		const left = " ".repeat(paddingOffset);
		const right = " ".repeat(width - stripAnsi$1(line).length);
		boxLines.push(`${leftSpace}${borderStyle.v}${left}${line}${right}${borderStyle.v}`);
	}
	boxLines.push(`${leftSpace}${borderStyle.bl}${borderStyle.h.repeat(widthOffset)}${borderStyle.br}`);
	if (opts.style.marginBottom > 0) boxLines.push("".repeat(opts.style.marginBottom));
	return boxLines.join("\n");
}
var r$3 = Object.create(null);
var i$1 = (e) => globalThis.process?.env || {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
};
var o$1 = new Proxy(r$3, {
	get(e, s) {
		return i$1()[s] ?? r$3[s];
	},
	has(e, s) {
		return s in i$1() || s in r$3;
	},
	set(e, s, E) {
		const B = i$1(true);
		return B[s] = E, true;
	},
	deleteProperty(e, s) {
		if (!s) return false;
		const E = i$1(true);
		return delete E[s], true;
	},
	ownKeys() {
		const e = i$1(true);
		return Object.keys(e);
	}
});
var t$2 = typeof process < "u" && process.env && "production" || "";
var f$2 = [
	["APPVEYOR"],
	[
		"AWS_AMPLIFY",
		"AWS_APP_ID",
		{ ci: true }
	],
	["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],
	["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],
	["APPCIRCLE", "AC_APPCIRCLE"],
	["BAMBOO", "bamboo_planKey"],
	["BITBUCKET", "BITBUCKET_COMMIT"],
	["BITRISE", "BITRISE_IO"],
	["BUDDY", "BUDDY_WORKSPACE_ID"],
	["BUILDKITE"],
	["CIRCLE", "CIRCLECI"],
	["CIRRUS", "CIRRUS_CI"],
	[
		"CLOUDFLARE_PAGES",
		"CF_PAGES",
		{ ci: true }
	],
	["CODEBUILD", "CODEBUILD_BUILD_ARN"],
	["CODEFRESH", "CF_BUILD_ID"],
	["DRONE"],
	["DRONE", "DRONE_BUILD_EVENT"],
	["DSARI"],
	["GITHUB_ACTIONS"],
	["GITLAB", "GITLAB_CI"],
	["GITLAB", "CI_MERGE_REQUEST_ID"],
	["GOCD", "GO_PIPELINE_LABEL"],
	["LAYERCI"],
	["HUDSON", "HUDSON_URL"],
	["JENKINS", "JENKINS_URL"],
	["MAGNUM"],
	["NETLIFY"],
	[
		"NETLIFY",
		"NETLIFY_LOCAL",
		{ ci: false }
	],
	["NEVERCODE"],
	["RENDER"],
	["SAIL", "SAILCI"],
	["SEMAPHORE"],
	["SCREWDRIVER"],
	["SHIPPABLE"],
	["SOLANO", "TDDIUM"],
	["STRIDER"],
	["TEAMCITY", "TEAMCITY_VERSION"],
	["TRAVIS"],
	["VERCEL", "NOW_BUILDER"],
	[
		"VERCEL",
		"VERCEL",
		{ ci: false }
	],
	[
		"VERCEL",
		"VERCEL_ENV",
		{ ci: false }
	],
	["APPCENTER", "APPCENTER_BUILD_ID"],
	[
		"CODESANDBOX",
		"CODESANDBOX_SSE",
		{ ci: false }
	],
	[
		"CODESANDBOX",
		"CODESANDBOX_HOST",
		{ ci: false }
	],
	["STACKBLITZ"],
	["STORMKIT"],
	["CLEAVR"],
	["ZEABUR"],
	[
		"CODESPHERE",
		"CODESPHERE_APP_ID",
		{ ci: true }
	],
	["RAILWAY", "RAILWAY_PROJECT_ID"],
	["RAILWAY", "RAILWAY_SERVICE_ID"],
	["DENO-DEPLOY", "DENO_DEPLOYMENT_ID"],
	[
		"FIREBASE_APP_HOSTING",
		"FIREBASE_APP_HOSTING",
		{ ci: true }
	]
];
function b$1() {
	if (globalThis.process?.env) for (const e of f$2) {
		const s = e[1] || e[0];
		if (globalThis.process?.env[s]) return {
			name: e[0].toLowerCase(),
			...e[2]
		};
	}
	return globalThis.process?.env?.SHELL === "/bin/jsh" && globalThis.process?.versions?.webcontainer ? {
		name: "stackblitz",
		ci: false
	} : {
		name: "",
		ci: false
	};
}
var l = b$1();
l.name;
function n$4(e) {
	return e ? e !== "false" : false;
}
var I$2 = globalThis.process?.platform || "";
var T$1 = n$4(o$1.CI) || l.ci !== false;
var a$2 = n$4(globalThis.process?.stdout && globalThis.process?.stdout.isTTY);
var g$2 = n$4(o$1.DEBUG);
var R$2 = t$2 === "test" || n$4(o$1.TEST);
o$1.MINIMAL;
var A$2 = /^win/i.test(I$2);
!n$4(o$1.NO_COLOR) && (n$4(o$1.FORCE_COLOR) || (a$2 || A$2) && o$1.TERM);
var C$2 = (globalThis.process?.versions?.node || "").replace(/^v/, "") || null;
Number(C$2?.split(".")[0]);
var y = globalThis.process || Object.create(null);
var _$2 = { versions: {} };
new Proxy(y, { get(e, s) {
	if (s === "env") return o$1;
	if (s in e) return e[s];
	if (s in _$2) return _$2[s];
} });
var c$1 = globalThis.process?.release?.name === "node";
var O$3 = !!globalThis.Bun || !!globalThis.process?.versions?.bun;
var D$1 = !!globalThis.Deno;
var L$2 = !!globalThis.fastly;
var S$1 = !!globalThis.Netlify;
var u$1 = !!globalThis.EdgeRuntime;
var N$2 = globalThis.navigator?.userAgent === "Cloudflare-Workers";
var F$1 = [
	[S$1, "netlify"],
	[u$1, "edge-light"],
	[N$2, "workerd"],
	[L$2, "fastly"],
	[D$1, "deno"],
	[O$3, "bun"],
	[c$1, "node"]
];
function G$1() {
	const e = F$1.find((s) => s[0]);
	if (e) return { name: e[1] };
}
G$1()?.name;
function ansiRegex({ onlyFirst = false } = {}) {
	const pattern = [`[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))`, "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
	return new RegExp(pattern, onlyFirst ? void 0 : "g");
}
var regex = ansiRegex();
function stripAnsi(string) {
	if (typeof string !== "string") throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	return string.replace(regex, "");
}
function isAmbiguous(x) {
	return x === 161 || x === 164 || x === 167 || x === 168 || x === 170 || x === 173 || x === 174 || x >= 176 && x <= 180 || x >= 182 && x <= 186 || x >= 188 && x <= 191 || x === 198 || x === 208 || x === 215 || x === 216 || x >= 222 && x <= 225 || x === 230 || x >= 232 && x <= 234 || x === 236 || x === 237 || x === 240 || x === 242 || x === 243 || x >= 247 && x <= 250 || x === 252 || x === 254 || x === 257 || x === 273 || x === 275 || x === 283 || x === 294 || x === 295 || x === 299 || x >= 305 && x <= 307 || x === 312 || x >= 319 && x <= 322 || x === 324 || x >= 328 && x <= 331 || x === 333 || x === 338 || x === 339 || x === 358 || x === 359 || x === 363 || x === 462 || x === 464 || x === 466 || x === 468 || x === 470 || x === 472 || x === 474 || x === 476 || x === 593 || x === 609 || x === 708 || x === 711 || x >= 713 && x <= 715 || x === 717 || x === 720 || x >= 728 && x <= 731 || x === 733 || x === 735 || x >= 768 && x <= 879 || x >= 913 && x <= 929 || x >= 931 && x <= 937 || x >= 945 && x <= 961 || x >= 963 && x <= 969 || x === 1025 || x >= 1040 && x <= 1103 || x === 1105 || x === 8208 || x >= 8211 && x <= 8214 || x === 8216 || x === 8217 || x === 8220 || x === 8221 || x >= 8224 && x <= 8226 || x >= 8228 && x <= 8231 || x === 8240 || x === 8242 || x === 8243 || x === 8245 || x === 8251 || x === 8254 || x === 8308 || x === 8319 || x >= 8321 && x <= 8324 || x === 8364 || x === 8451 || x === 8453 || x === 8457 || x === 8467 || x === 8470 || x === 8481 || x === 8482 || x === 8486 || x === 8491 || x === 8531 || x === 8532 || x >= 8539 && x <= 8542 || x >= 8544 && x <= 8555 || x >= 8560 && x <= 8569 || x === 8585 || x >= 8592 && x <= 8601 || x === 8632 || x === 8633 || x === 8658 || x === 8660 || x === 8679 || x === 8704 || x === 8706 || x === 8707 || x === 8711 || x === 8712 || x === 8715 || x === 8719 || x === 8721 || x === 8725 || x === 8730 || x >= 8733 && x <= 8736 || x === 8739 || x === 8741 || x >= 8743 && x <= 8748 || x === 8750 || x >= 8756 && x <= 8759 || x === 8764 || x === 8765 || x === 8776 || x === 8780 || x === 8786 || x === 8800 || x === 8801 || x >= 8804 && x <= 8807 || x === 8810 || x === 8811 || x === 8814 || x === 8815 || x === 8834 || x === 8835 || x === 8838 || x === 8839 || x === 8853 || x === 8857 || x === 8869 || x === 8895 || x === 8978 || x >= 9312 && x <= 9449 || x >= 9451 && x <= 9547 || x >= 9552 && x <= 9587 || x >= 9600 && x <= 9615 || x >= 9618 && x <= 9621 || x === 9632 || x === 9633 || x >= 9635 && x <= 9641 || x === 9650 || x === 9651 || x === 9654 || x === 9655 || x === 9660 || x === 9661 || x === 9664 || x === 9665 || x >= 9670 && x <= 9672 || x === 9675 || x >= 9678 && x <= 9681 || x >= 9698 && x <= 9701 || x === 9711 || x === 9733 || x === 9734 || x === 9737 || x === 9742 || x === 9743 || x === 9756 || x === 9758 || x === 9792 || x === 9794 || x === 9824 || x === 9825 || x >= 9827 && x <= 9829 || x >= 9831 && x <= 9834 || x === 9836 || x === 9837 || x === 9839 || x === 9886 || x === 9887 || x === 9919 || x >= 9926 && x <= 9933 || x >= 9935 && x <= 9939 || x >= 9941 && x <= 9953 || x === 9955 || x === 9960 || x === 9961 || x >= 9963 && x <= 9969 || x === 9972 || x >= 9974 && x <= 9977 || x === 9979 || x === 9980 || x === 9982 || x === 9983 || x === 10045 || x >= 10102 && x <= 10111 || x >= 11094 && x <= 11097 || x >= 12872 && x <= 12879 || x >= 57344 && x <= 63743 || x >= 65024 && x <= 65039 || x === 65533 || x >= 127232 && x <= 127242 || x >= 127248 && x <= 127277 || x >= 127280 && x <= 127337 || x >= 127344 && x <= 127373 || x === 127375 || x === 127376 || x >= 127387 && x <= 127404 || x >= 917760 && x <= 917999 || x >= 983040 && x <= 1048573 || x >= 1048576 && x <= 1114109;
}
function isFullWidth(x) {
	return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
}
function isWide(x) {
	return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9776 && x <= 9783 || x >= 9800 && x <= 9811 || x === 9855 || x >= 9866 && x <= 9871 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12773 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101631 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x >= 119552 && x <= 119638 || x >= 119648 && x <= 119670 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129673 || x >= 129679 && x <= 129734 || x >= 129742 && x <= 129756 || x >= 129759 && x <= 129769 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
}
function validate(codePoint) {
	if (!Number.isSafeInteger(codePoint)) throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
	validate(codePoint);
	if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) return 2;
	return 1;
}
var emojiRegex = () => {
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};
var segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter() : { segment: (str) => str.split("") };
var defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;
function stringWidth$1(string, options = {}) {
	if (typeof string !== "string" || string.length === 0) return 0;
	const { ambiguousIsNarrow = true, countAnsiEscapeCodes = false } = options;
	if (!countAnsiEscapeCodes) string = stripAnsi(string);
	if (string.length === 0) return 0;
	let width = 0;
	const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
	for (const { segment: character } of segmenter.segment(string)) {
		const codePoint = character.codePointAt(0);
		if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) continue;
		if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) continue;
		if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) continue;
		if (codePoint >= 55296 && codePoint <= 57343) continue;
		if (codePoint >= 65024 && codePoint <= 65039) continue;
		if (defaultIgnorableCodePointRegex.test(character)) continue;
		if (emojiRegex().test(character)) {
			width += 2;
			continue;
		}
		width += eastAsianWidth(codePoint, eastAsianWidthOptions);
	}
	return width;
}
function isUnicodeSupported() {
	const { env } = process$1;
	const { TERM, TERM_PROGRAM } = env;
	if (process$1.platform !== "win32") return TERM !== "linux";
	return Boolean(env.WT_SESSION) || Boolean(env.TERMINUS_SUBLIME) || env.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var TYPE_COLOR_MAP = {
	info: "cyan",
	fail: "red",
	success: "green",
	ready: "green",
	start: "magenta"
};
var LEVEL_COLOR_MAP = {
	0: "red",
	1: "yellow"
};
var unicode = isUnicodeSupported();
var s$2 = (c, fallback) => unicode ? c : fallback;
var TYPE_ICONS = {
	error: s$2("✖", "×"),
	fatal: s$2("✖", "×"),
	ready: s$2("✔", "√"),
	warn: s$2("⚠", "‼"),
	info: s$2("ℹ", "i"),
	success: s$2("✔", "√"),
	debug: s$2("⚙", "D"),
	trace: s$2("→", "→"),
	fail: s$2("✖", "×"),
	start: s$2("◐", "o"),
	log: ""
};
function stringWidth(str) {
	if (!(typeof Intl === "object") || !Intl.Segmenter) return stripAnsi$1(str).length;
	return stringWidth$1(str);
}
var FancyReporter = class extends BasicReporter {
	formatStack(stack, message, opts) {
		const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
		return `
${indent}` + parseStack(stack, message).map((line) => "  " + line.replace(/^at +/, (m) => colors.gray(m)).replace(/\((.+)\)/, (_, m) => `(${colors.cyan(m)})`)).join(`
${indent}`);
	}
	formatType(logObj, isBadge, opts) {
		const typeColor = TYPE_COLOR_MAP[logObj.type] || LEVEL_COLOR_MAP[logObj.level] || "gray";
		if (isBadge) return getBgColor(typeColor)(colors.black(` ${logObj.type.toUpperCase()} `));
		const _type = typeof TYPE_ICONS[logObj.type] === "string" ? TYPE_ICONS[logObj.type] : logObj.icon || logObj.type;
		return _type ? getColor(typeColor)(_type) : "";
	}
	formatLogObj(logObj, opts) {
		const [message, ...additional] = this.formatArgs(logObj.args, opts).split("\n");
		if (logObj.type === "box") return box(characterFormat(message + (additional.length > 0 ? "\n" + additional.join("\n") : "")), {
			title: logObj.title ? characterFormat(logObj.title) : void 0,
			style: logObj.style
		});
		const date = this.formatDate(logObj.date, opts);
		const coloredDate = date && colors.gray(date);
		const isBadge = logObj.badge ?? logObj.level < 2;
		const type = this.formatType(logObj, isBadge, opts);
		const tag = logObj.tag ? colors.gray(logObj.tag) : "";
		let line;
		const left = this.filterAndJoin([type, characterFormat(message)]);
		const right = this.filterAndJoin(opts.columns ? [tag, coloredDate] : [tag]);
		const space = (opts.columns || 0) - stringWidth(left) - stringWidth(right) - 2;
		line = space > 0 && (opts.columns || 0) >= 80 ? left + " ".repeat(space) + right : (right ? `${colors.gray(`[${right}]`)} ` : "") + left;
		line += characterFormat(additional.length > 0 ? "\n" + additional.join("\n") : "");
		if (logObj.type === "trace") {
			const _err = /* @__PURE__ */ new Error("Trace: " + logObj.message);
			line += this.formatStack(_err.stack || "", _err.message);
		}
		return isBadge ? "\n" + line + "\n" : line;
	}
};
function characterFormat(str) {
	return str.replace(/`([^`]+)`/gm, (_, m) => colors.cyan(m)).replace(/\s+_([^_]+)_\s+/gm, (_, m) => ` ${colors.underline(m)} `);
}
function getColor(color = "white") {
	return colors[color] || colors.white;
}
function getBgColor(color = "bgWhite") {
	return colors[`bg${color[0].toUpperCase()}${color.slice(1)}`] || colors.bgWhite;
}
function createConsola(options = {}) {
	let level = _getDefaultLogLevel();
	if (process.env.CONSOLA_LEVEL) level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
	return createConsola$1({
		level,
		defaults: { level },
		stdout: process.stdout,
		stderr: process.stderr,
		prompt: (...args) => import("../_10.mjs").then((m) => m.prompt(...args)),
		reporters: options.reporters || [options.fancy ?? !(T$1 || R$2) ? new FancyReporter() : new BasicReporter()],
		...options
	});
}
function _getDefaultLogLevel() {
	if (g$2) return LogLevels.debug;
	if (R$2) return LogLevels.warn;
	return LogLevels.info;
}
var consola = createConsola();
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
	if (!input) return input;
	return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
var _EXTNAME_RE = /.(\.[^./]+|\.)$/;
var normalize$2 = function(path) {
	if (path.length === 0) return ".";
	path = normalizeWindowsPath(path);
	const isUNCPath = path.match(_UNC_REGEX);
	const isPathAbsolute = isAbsolute$2(path);
	const trailingSeparator = path[path.length - 1] === "/";
	path = normalizeString(path, !isPathAbsolute);
	if (path.length === 0) {
		if (isPathAbsolute) return "/";
		return trailingSeparator ? "./" : ".";
	}
	if (trailingSeparator) path += "/";
	if (_DRIVE_LETTER_RE.test(path)) path += "/";
	if (isUNCPath) {
		if (!isPathAbsolute) return `//./${path}`;
		return `//${path}`;
	}
	return isPathAbsolute && !isAbsolute$2(path) ? `/${path}` : path;
};
var join$2 = function(...segments) {
	let path = "";
	for (const seg of segments) {
		if (!seg) continue;
		if (path.length > 0) {
			const pathTrailing = path[path.length - 1] === "/";
			const segLeading = seg[0] === "/";
			if (pathTrailing && segLeading) path += seg.slice(1);
			else path += pathTrailing || segLeading ? seg : `/${seg}`;
		} else path += seg;
	}
	return normalize$2(path);
};
function cwd$1() {
	if (typeof process !== "undefined" && typeof process.cwd === "function") return process.cwd().replace(/\\/g, "/");
	return "/";
}
var resolve$2 = function(...arguments_) {
	arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
	let resolvedPath = "";
	let resolvedAbsolute = false;
	for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
		const path = index >= 0 ? arguments_[index] : cwd$1();
		if (!path || path.length === 0) continue;
		resolvedPath = `${path}/${resolvedPath}`;
		resolvedAbsolute = isAbsolute$2(path);
	}
	resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
	if (resolvedAbsolute && !isAbsolute$2(resolvedPath)) return `/${resolvedPath}`;
	return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
	let res = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let char = null;
	for (let index = 0; index <= path.length; ++index) {
		if (index < path.length) char = path[index];
		else if (char === "/") break;
		else char = "/";
		if (char === "/") {
			if (lastSlash === index - 1 || dots === 1);
			else if (dots === 2) {
				if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
					if (res.length > 2) {
						const lastSlashIndex = res.lastIndexOf("/");
						if (lastSlashIndex === -1) {
							res = "";
							lastSegmentLength = 0;
						} else {
							res = res.slice(0, lastSlashIndex);
							lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
						}
						lastSlash = index;
						dots = 0;
						continue;
					} else if (res.length > 0) {
						res = "";
						lastSegmentLength = 0;
						lastSlash = index;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					res += res.length > 0 ? "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (res.length > 0) res += `/${path.slice(lastSlash + 1, index)}`;
				else res = path.slice(lastSlash + 1, index);
				lastSegmentLength = index - lastSlash - 1;
			}
			lastSlash = index;
			dots = 0;
		} else if (char === "." && dots !== -1) ++dots;
		else dots = -1;
	}
	return res;
}
var isAbsolute$2 = function(p) {
	return _IS_ABSOLUTE_RE.test(p);
};
var extname$3 = function(p) {
	if (p === "..") return "";
	const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
	return match && match[1] || "";
};
var relative$2 = function(from, to) {
	const _from = resolve$2(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
	const _to = resolve$2(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
	if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) return _to.join("/");
	const _fromCopy = [..._from];
	for (const segment of _fromCopy) {
		if (_to[0] !== segment) break;
		_from.shift();
		_to.shift();
	}
	return [..._from.map(() => ".."), ..._to].join("/");
};
var dirname$2 = function(p) {
	const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
	if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) segments[0] += "/";
	return segments.join("/") || (isAbsolute$2(p) ? "/" : ".");
};
var basename$2 = function(p, extension) {
	const segments = normalizeWindowsPath(p).split("/");
	let lastSegment = "";
	for (let i = segments.length - 1; i >= 0; i--) {
		const val = segments[i];
		if (val) {
			lastSegment = val;
			break;
		}
	}
	return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};
var nodeBuiltins = [
	"_http_agent",
	"_http_client",
	"_http_common",
	"_http_incoming",
	"_http_outgoing",
	"_http_server",
	"_stream_duplex",
	"_stream_passthrough",
	"_stream_readable",
	"_stream_transform",
	"_stream_wrap",
	"_stream_writable",
	"_tls_common",
	"_tls_wrap",
	"assert",
	"assert/strict",
	"async_hooks",
	"buffer",
	"child_process",
	"cluster",
	"console",
	"constants",
	"crypto",
	"dgram",
	"diagnostics_channel",
	"dns",
	"dns/promises",
	"domain",
	"events",
	"fs",
	"fs/promises",
	"http",
	"http2",
	"https",
	"inspector",
	"inspector/promises",
	"module",
	"net",
	"os",
	"path",
	"path/posix",
	"path/win32",
	"perf_hooks",
	"process",
	"punycode",
	"querystring",
	"readline",
	"readline/promises",
	"repl",
	"stream",
	"stream/consumers",
	"stream/promises",
	"stream/web",
	"string_decoder",
	"sys",
	"timers",
	"timers/promises",
	"tls",
	"trace_events",
	"tty",
	"url",
	"util",
	"util/types",
	"v8",
	"vm",
	"wasi",
	"worker_threads",
	"zlib"
];
var classRegExp = /^([A-Z][a-z\d]*)+$/;
var kTypes = /* @__PURE__ */ new Set([
	"string",
	"function",
	"number",
	"object",
	"Function",
	"Object",
	"boolean",
	"bigint",
	"symbol"
]);
var messages = /* @__PURE__ */ new Map();
function formatList(array, type = "and") {
	switch (array.length) {
		case 0: return "";
		case 1: return `${array[0]}`;
		case 2: return `${array[0]} ${type} ${array[1]}`;
		case 3: return `${array[0]}, ${array[1]}, ${type} ${array[2]}`;
		default: return `${array.slice(0, -1).join(", ")}, ${type} ${array.at(-1)}`;
	}
}
function getExpectedArgumentLength(message) {
	let expectedLength = 0;
	const regex = /%[dfijoOs]/g;
	while (regex.exec(message) !== null) expectedLength++;
	return expectedLength;
}
function createError(sym, value, constructor) {
	messages.set(sym, value);
	return makeNodeErrorWithCode(constructor, sym);
}
var kIsNodeError = Symbol("kIsNodeError");
function makeNodeErrorWithCode(Base, key) {
	const message = messages.get(key);
	const expectedLength = typeof message === "string" ? getExpectedArgumentLength(message) : -1;
	switch (expectedLength) {
		case 0: {
			class NodeError extends Base {
				code = key;
				constructor(...args) {
					assert.ok(args.length === 0, `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`);
					super(message);
				}
				get ["constructor"]() {
					return Base;
				}
				get [kIsNodeError]() {
					return true;
				}
				toString() {
					return `${this.name} [${key}]: ${this.message}`;
				}
			}
			return NodeError;
		}
		case -1: {
			class NodeError extends Base {
				code = key;
				constructor(...args) {
					super();
					Object.defineProperty(this, "message", {
						value: getMessage(key, args, this),
						enumerable: false,
						writable: true,
						configurable: true
					});
				}
				get ["constructor"]() {
					return Base;
				}
				get [kIsNodeError]() {
					return true;
				}
				toString() {
					return `${this.name} [${key}]: ${this.message}`;
				}
			}
			return NodeError;
		}
		default: {
			class NodeError extends Base {
				code = key;
				constructor(...args) {
					assert.ok(args.length === expectedLength, `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`);
					args.unshift(message);
					super(Reflect.apply(format, null, args));
				}
				get ["constructor"]() {
					return Base;
				}
				get [kIsNodeError]() {
					return true;
				}
				toString() {
					return `${this.name} [${key}]: ${this.message}`;
				}
			}
			return NodeError;
		}
	}
}
function getMessage(key, parameters, self) {
	const message = messages.get(key);
	assert.ok(message !== void 0, "expected `message` to be found");
	if (typeof message === "function") {
		assert.ok(message.length <= parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${message.length}).`);
		return Reflect.apply(message, self, parameters);
	}
	const expectedLength = getExpectedArgumentLength(message);
	assert.ok(expectedLength === parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${expectedLength}).`);
	if (parameters.length === 0) return message;
	parameters.unshift(message);
	return Reflect.apply(format, null, parameters);
}
function determineSpecificType(value) {
	if (value === null) return "null";
	else if (value === void 0) return "undefined";
	const type = typeof value;
	switch (type) {
		case "bigint": return `type bigint (${value}n)`;
		case "number":
			if (value === 0) return 1 / value === Number.NEGATIVE_INFINITY ? "type number (-0)" : "type number (0)";
			else if (Number.isNaN(value)) return "type number (NaN)";
			else if (value === Number.POSITIVE_INFINITY) return "type number (Infinity)";
			else if (value === Number.NEGATIVE_INFINITY) return "type number (-Infinity)";
			return `type number (${value})`;
		case "boolean": return value ? "type boolean (true)" : "type boolean (false)";
		case "symbol": return `type symbol (${String(value)})`;
		case "function": return `function ${value.name}`;
		case "object": {
			const name = value.constructor?.name;
			if (typeof name === "string" && name !== "") return `an instance of ${name}`;
			return `${inspect(value, { depth: -1 })}`;
		}
		case "string": {
			let string = value;
			if (string.length > 28) string = `${string.slice(0, 25)}...`;
			if (!string.includes("'")) return `type string ('${string}')`;
			return `type string (${JSON.stringify(string)})`;
		}
		default: {
			let inspected = inspect(value, { colors: false });
			if (inspected.length > 28) inspected = `${inspected.slice(0, 25)}...`;
			return `type ${type} (${inspected})`;
		}
	}
}
createError("ERR_INVALID_ARG_TYPE", (name, expected, actual) => {
	assert.ok(typeof name === "string", "'name' must be a string");
	if (!Array.isArray(expected)) expected = [expected];
	let message = "The ";
	if (name.endsWith(" argument")) message += `${name} `;
	else {
		const type = name.includes(".") ? "property" : "argument";
		message += `"${name}" ${type} `;
	}
	message += "must be ";
	const types = [];
	const instances = [];
	const other = [];
	for (const value of expected) {
		assert.ok(typeof value === "string", "All expected entries have to be of type string");
		if (kTypes.has(value)) types.push(value.toLowerCase());
		else if (classRegExp.exec(value) === null) {
			assert.ok(value !== "object", "The value \"object\" should be written as \"Object\"");
			other.push(value);
		} else instances.push(value);
	}
	if (instances.length > 0) {
		const pos = types.indexOf("object");
		if (pos !== -1) {
			types.splice(pos, 1);
			instances.push("Object");
		}
	}
	if (types.length > 0) {
		message += `${types.length > 1 ? "one of type" : "of type"} ${formatList(types, "or")}`;
		if (instances.length > 0 || other.length > 0) message += " or ";
	}
	if (instances.length > 0) {
		message += `an instance of ${formatList(instances, "or")}`;
		if (other.length > 0) message += " or ";
	}
	if (other.length > 0) {
		if (other.length > 1) message += `one of ${formatList(other, "or")}`;
		else {
			if (other[0]?.toLowerCase() !== other[0]) message += "an ";
			message += `${other[0]}`;
		}
	}
	message += `. Received ${determineSpecificType(actual)}`;
	return message;
}, TypeError);
var ERR_INVALID_MODULE_SPECIFIER = createError("ERR_INVALID_MODULE_SPECIFIER", (request, reason, base) => {
	return `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`;
}, TypeError);
var ERR_INVALID_PACKAGE_CONFIG = createError("ERR_INVALID_PACKAGE_CONFIG", (path, base, message) => {
	return `Invalid package config ${path}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`;
}, Error);
var ERR_INVALID_PACKAGE_TARGET = createError("ERR_INVALID_PACKAGE_TARGET", (packagePath, key, target, isImport = false, base) => {
	const relatedError = typeof target === "string" && !isImport && target.length > 0 && !target.startsWith("./");
	if (key === ".") {
		assert.ok(isImport === false);
		return `Invalid "exports" main target ${JSON.stringify(target)} defined in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? "; targets must start with \"./\"" : ""}`;
	}
	return `Invalid "${isImport ? "imports" : "exports"}" target ${JSON.stringify(target)} defined for '${key}' in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? "; targets must start with \"./\"" : ""}`;
}, Error);
var ERR_MODULE_NOT_FOUND = createError("ERR_MODULE_NOT_FOUND", function(path, base, exactUrl = false) {
	if (exactUrl && typeof exactUrl === "string") this.url = `${exactUrl}`;
	return `Cannot find ${exactUrl ? "module" : "package"} '${path}' imported from ${base}`;
}, Error);
var ERR_PACKAGE_IMPORT_NOT_DEFINED = createError("ERR_PACKAGE_IMPORT_NOT_DEFINED", (specifier, packagePath, base) => {
	return `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath || ""}package.json` : ""} imported from ${base}`;
}, TypeError);
var ERR_PACKAGE_PATH_NOT_EXPORTED = createError("ERR_PACKAGE_PATH_NOT_EXPORTED", (packagePath, subpath, base) => {
	if (subpath === ".") return `No "exports" main defined in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`;
	return `Package subpath '${subpath}' is not defined by "exports" in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`;
}, Error);
var ERR_UNSUPPORTED_DIR_IMPORT = createError("ERR_UNSUPPORTED_DIR_IMPORT", function(path, base, exactUrl = void 0) {
	this.url = exactUrl;
	return `Directory import '${path}' is not supported resolving ES modules imported from ${base}`;
}, Error);
var ERR_UNSUPPORTED_RESOLVE_REQUEST = createError("ERR_UNSUPPORTED_RESOLVE_REQUEST", "Failed to resolve module specifier \"%s\" from \"%s\": Invalid relative URL or base scheme is not hierarchical.", TypeError);
var ERR_UNKNOWN_FILE_EXTENSION = createError("ERR_UNKNOWN_FILE_EXTENSION", (extension, path) => {
	return `Unknown file extension "${extension}" for ${path}`;
}, TypeError);
createError("ERR_INVALID_ARG_VALUE", (name, value, reason = "is invalid") => {
	let inspected = inspect(value);
	if (inspected.length > 128) inspected = `${inspected.slice(0, 128)}...`;
	return `The ${name.includes(".") ? "property" : "argument"} '${name}' ${reason}. Received ${inspected}`;
}, TypeError);
var hasOwnProperty$1 = {}.hasOwnProperty;
var cache$1 = /* @__PURE__ */ new Map();
function setPackageJSONCache(newCache) {
	const previous = cache$1;
	cache$1 = newCache;
	return previous;
}
function read(jsonPath, { base, specifier }) {
	const existing = cache$1.get(jsonPath);
	if (existing) return existing;
	let string;
	try {
		string = fs.readFileSync(path.toNamespacedPath(jsonPath), "utf8");
	} catch (error) {
		const exception = error;
		if (exception.code !== "ENOENT" && exception.code !== "ENOTDIR" && exception.code !== "EISDIR") {
			const error = new ERR_INVALID_PACKAGE_CONFIG(jsonPath, (base ? `"${specifier}" from ` : "") + fileURLToPath(base || specifier), `Cannot read package config: ${exception.message}`);
			error.cause = exception;
			throw error;
		}
	}
	const result = {
		exists: false,
		pjsonPath: jsonPath,
		main: void 0,
		name: void 0,
		type: "none",
		exports: void 0,
		imports: void 0
	};
	if (string !== void 0) {
		let parsed;
		try {
			parsed = JSON.parse(string);
		} catch (error_) {
			const error = new ERR_INVALID_PACKAGE_CONFIG(jsonPath, (base ? `"${specifier}" from ` : "") + fileURLToPath(base || specifier), error_.message);
			error.cause = error_;
			throw error;
		}
		result.exists = true;
		if (hasOwnProperty$1.call(parsed, "name") && typeof parsed.name === "string") result.name = parsed.name;
		if (hasOwnProperty$1.call(parsed, "main") && typeof parsed.main === "string") result.main = parsed.main;
		if (hasOwnProperty$1.call(parsed, "exports")) result.exports = parsed.exports;
		if (hasOwnProperty$1.call(parsed, "imports")) result.imports = parsed.imports;
		if (hasOwnProperty$1.call(parsed, "type") && (parsed.type === "commonjs" || parsed.type === "module")) result.type = parsed.type;
	}
	cache$1.set(jsonPath, result);
	return result;
}
function getPackageScopeConfig(resolved) {
	let packageJSONUrl = new URL("package.json", resolved);
	while (true) {
		if (packageJSONUrl.pathname.endsWith("node_modules/package.json")) break;
		const packageConfig = read(fileURLToPath(packageJSONUrl), { specifier: resolved });
		if (packageConfig.exists) return packageConfig;
		const lastPackageJSONUrl = packageJSONUrl;
		packageJSONUrl = new URL("../package.json", packageJSONUrl);
		if (packageJSONUrl.pathname === lastPackageJSONUrl.pathname) break;
	}
	return {
		pjsonPath: fileURLToPath(packageJSONUrl),
		exists: false,
		type: "none"
	};
}
var hasOwnProperty = {}.hasOwnProperty;
var extensionFormatMap = {
	__proto__: null,
	".json": "json",
	".cjs": "commonjs",
	".cts": "commonjs",
	".js": "module",
	".ts": "module",
	".mts": "module",
	".mjs": "module"
};
var protocolHandlers = {
	__proto__: null,
	"data:": getDataProtocolModuleFormat,
	"file:": getFileProtocolModuleFormat,
	"node:": () => "builtin"
};
function mimeToFormat(mime) {
	if (mime && /^\s*(text|application)\/javascript\s*(;\s*charset=utf-?8\s*)?$/i.test(mime)) return "module";
	if (mime === "application/json") return "json";
	return null;
}
function getDataProtocolModuleFormat(parsed) {
	const { 1: mime } = /^([^/]+\/[^;,]+)(?:;[^,]*)?,/.exec(parsed.pathname) || [
		null,
		null,
		null
	];
	return mimeToFormat(mime);
}
var DOT_CODE = 46;
var SLASH_CODE = 47;
function extname$2(url) {
	const pathname = url.pathname;
	for (let i = pathname.length - 1; i > 0; i--) switch (pathname.charCodeAt(i)) {
		case SLASH_CODE: return "";
		case DOT_CODE: return pathname.charCodeAt(i - 1) === SLASH_CODE ? "" : pathname.slice(i);
	}
	return "";
}
function getFileProtocolModuleFormat(url, _context, ignoreErrors) {
	const ext = extname$2(url);
	if (ext === ".js") {
		const { type: packageType } = getPackageScopeConfig(url);
		if (packageType !== "none") return packageType;
		return "commonjs";
	}
	if (ext === "") {
		const { type: packageType } = getPackageScopeConfig(url);
		if (packageType === "module") return "module";
		if (packageType !== "none") return packageType;
		return "commonjs";
	}
	const format = extensionFormatMap[ext];
	if (format) return format;
	if (ignoreErrors) return;
	throw new ERR_UNKNOWN_FILE_EXTENSION(ext, fileURLToPath(url));
}
function defaultGetFormatWithoutErrors(url, context) {
	const protocol = url.protocol;
	if (!hasOwnProperty.call(protocolHandlers, protocol)) return null;
	return protocolHandlers[protocol](url, context, true) || null;
}
var RegExpPrototypeSymbolReplace = RegExp.prototype[Symbol.replace];
var own = {}.hasOwnProperty;
var invalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))?(\\|\/|$)/i;
var deprecatedInvalidSegmentRegEx = /(^|\\|\/)((\.|%2e)(\.|%2e)?|(n|%6e|%4e)(o|%6f|%4f)(d|%64|%44)(e|%65|%45)(_|%5f)(m|%6d|%4d)(o|%6f|%4f)(d|%64|%44)(u|%75|%55)(l|%6c|%4c)(e|%65|%45)(s|%73|%53))(\\|\/|$)/i;
var invalidPackageNameRegEx = /^\.|%|\\/;
var patternRegEx = /\*/g;
var encodedSeparatorRegEx = /%2f|%5c/i;
var emittedPackageWarnings = /* @__PURE__ */ new Set();
var doubleSlashRegEx = /[/\\]{2}/;
function emitInvalidSegmentDeprecation(target, request, match, packageJsonUrl, internal, base, isTarget) {
	if (process$1.noDeprecation) return;
	const pjsonPath = fileURLToPath(packageJsonUrl);
	const double = doubleSlashRegEx.exec(isTarget ? target : request) !== null;
	process$1.emitWarning(`Use of deprecated ${double ? "double slash" : "leading or trailing slash matching"} resolving "${target}" for module request "${request}" ${request === match ? "" : `matched to "${match}" `}in the "${internal ? "imports" : "exports"}" field module resolution of the package at ${pjsonPath}${base ? ` imported from ${fileURLToPath(base)}` : ""}.`, "DeprecationWarning", "DEP0166");
}
function emitLegacyIndexDeprecation(url, packageJsonUrl, base, main) {
	if (process$1.noDeprecation) return;
	if (defaultGetFormatWithoutErrors(url, { parentURL: base.href }) !== "module") return;
	const urlPath = fileURLToPath(url.href);
	const packagePath = fileURLToPath(new URL$1(".", packageJsonUrl));
	const basePath = fileURLToPath(base);
	if (!main) process$1.emitWarning(`No "main" or "exports" field defined in the package.json for ${packagePath} resolving the main entry point "${urlPath.slice(packagePath.length)}", imported from ${basePath}.\nDefault "index" lookups for the main are deprecated for ES modules.`, "DeprecationWarning", "DEP0151");
	else if (path.resolve(packagePath, main) !== urlPath) process$1.emitWarning(`Package ${packagePath} has a "main" field set to "${main}", excluding the full filename and extension to the resolved file at "${urlPath.slice(packagePath.length)}", imported from ${basePath}.\n Automatic extension resolution of the "main" field is deprecated for ES modules.`, "DeprecationWarning", "DEP0151");
}
function tryStatSync(path) {
	try {
		return statSync(path, { throwIfNoEntry: false });
	} catch {}
}
function fileExists(url) {
	const stats = statSync(url, { throwIfNoEntry: false });
	const isFile = stats ? stats.isFile() : void 0;
	return isFile === null || isFile === void 0 ? false : isFile;
}
function legacyMainResolve(packageJsonUrl, packageConfig, base) {
	let guess;
	if (packageConfig.main !== void 0) {
		guess = new URL$1(packageConfig.main, packageJsonUrl);
		if (fileExists(guess)) return guess;
		const tries = [
			`./${packageConfig.main}.js`,
			`./${packageConfig.main}.json`,
			`./${packageConfig.main}.node`,
			`./${packageConfig.main}/index.js`,
			`./${packageConfig.main}/index.json`,
			`./${packageConfig.main}/index.node`
		];
		let i = -1;
		while (++i < tries.length) {
			guess = new URL$1(tries[i], packageJsonUrl);
			if (fileExists(guess)) break;
			guess = void 0;
		}
		if (guess) {
			emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main);
			return guess;
		}
	}
	const tries = [
		"./index.js",
		"./index.json",
		"./index.node"
	];
	let i = -1;
	while (++i < tries.length) {
		guess = new URL$1(tries[i], packageJsonUrl);
		if (fileExists(guess)) break;
		guess = void 0;
	}
	if (guess) {
		emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main);
		return guess;
	}
	throw new ERR_MODULE_NOT_FOUND(fileURLToPath(new URL$1(".", packageJsonUrl)), fileURLToPath(base));
}
function finalizeResolution(resolved, base, preserveSymlinks) {
	if (encodedSeparatorRegEx.exec(resolved.pathname) !== null) throw new ERR_INVALID_MODULE_SPECIFIER(resolved.pathname, String.raw`must not include encoded "/" or "\" characters`, fileURLToPath(base));
	let filePath;
	try {
		filePath = fileURLToPath(resolved);
	} catch (error) {
		Object.defineProperty(error, "input", { value: String(resolved) });
		Object.defineProperty(error, "module", { value: String(base) });
		throw error;
	}
	const stats = tryStatSync(filePath);
	if (stats && stats.isDirectory()) {
		const error = new ERR_UNSUPPORTED_DIR_IMPORT(filePath, fileURLToPath(base));
		error.url = String(resolved);
		throw error;
	}
	if (!stats || !stats.isFile() || resolved.pathname.endsWith("/")) {
		const error = new ERR_MODULE_NOT_FOUND(filePath || resolved.pathname, base && fileURLToPath(base), true);
		error.url = String(resolved);
		throw error;
	}
	if (!preserveSymlinks) {
		const real = realpathSync(filePath);
		const { search, hash } = resolved;
		resolved = pathToFileURL(real);
		resolved.search = search;
		resolved.hash = hash;
	}
	return resolved;
}
function importNotDefined(specifier, packageJsonUrl, base) {
	return new ERR_PACKAGE_IMPORT_NOT_DEFINED(specifier, packageJsonUrl && fileURLToPath(new URL$1(".", packageJsonUrl)), fileURLToPath(base));
}
function exportsNotFound(subpath, packageJsonUrl, base) {
	return new ERR_PACKAGE_PATH_NOT_EXPORTED(fileURLToPath(new URL$1(".", packageJsonUrl)), subpath, base && fileURLToPath(base));
}
function throwInvalidSubpath(request, match, packageJsonUrl, internal, base) {
	throw new ERR_INVALID_MODULE_SPECIFIER(request, `request is not a valid match in pattern "${match}" for the "${internal ? "imports" : "exports"}" resolution of ${fileURLToPath(packageJsonUrl)}`, base && fileURLToPath(base));
}
function invalidPackageTarget(subpath, target, packageJsonUrl, internal, base) {
	target = typeof target === "object" && target !== null ? JSON.stringify(target, null, "") : `${target}`;
	return new ERR_INVALID_PACKAGE_TARGET(fileURLToPath(new URL$1(".", packageJsonUrl)), subpath, target, internal, base && fileURLToPath(base));
}
function resolvePackageTargetString(target, subpath, match, packageJsonUrl, base, pattern, internal, isPathMap, conditions) {
	if (subpath !== "" && !pattern && target.at(-1) !== "/") throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
	if (!target.startsWith("./")) {
		if (internal && !target.startsWith("../") && !target.startsWith("/")) {
			let isURL = false;
			try {
				new URL$1(target);
				isURL = true;
			} catch {}
			if (!isURL) return packageResolve(pattern ? RegExpPrototypeSymbolReplace.call(patternRegEx, target, () => subpath) : target + subpath, packageJsonUrl, conditions);
		}
		throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
	}
	if (invalidSegmentRegEx.exec(target.slice(2)) !== null) {
		if (deprecatedInvalidSegmentRegEx.exec(target.slice(2)) === null) {
			if (!isPathMap) {
				const request = pattern ? match.replace("*", () => subpath) : match + subpath;
				emitInvalidSegmentDeprecation(pattern ? RegExpPrototypeSymbolReplace.call(patternRegEx, target, () => subpath) : target, request, match, packageJsonUrl, internal, base, true);
			}
		} else throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
	}
	const resolved = new URL$1(target, packageJsonUrl);
	const resolvedPath = resolved.pathname;
	const packagePath = new URL$1(".", packageJsonUrl).pathname;
	if (!resolvedPath.startsWith(packagePath)) throw invalidPackageTarget(match, target, packageJsonUrl, internal, base);
	if (subpath === "") return resolved;
	if (invalidSegmentRegEx.exec(subpath) !== null) {
		const request = pattern ? match.replace("*", () => subpath) : match + subpath;
		if (deprecatedInvalidSegmentRegEx.exec(subpath) === null) {
			if (!isPathMap) emitInvalidSegmentDeprecation(pattern ? RegExpPrototypeSymbolReplace.call(patternRegEx, target, () => subpath) : target, request, match, packageJsonUrl, internal, base, false);
		} else throwInvalidSubpath(request, match, packageJsonUrl, internal, base);
	}
	if (pattern) return new URL$1(RegExpPrototypeSymbolReplace.call(patternRegEx, resolved.href, () => subpath));
	return new URL$1(subpath, resolved);
}
function isArrayIndex(key) {
	const keyNumber = Number(key);
	if (`${keyNumber}` !== key) return false;
	return keyNumber >= 0 && keyNumber < 4294967295;
}
function resolvePackageTarget(packageJsonUrl, target, subpath, packageSubpath, base, pattern, internal, isPathMap, conditions) {
	if (typeof target === "string") return resolvePackageTargetString(target, subpath, packageSubpath, packageJsonUrl, base, pattern, internal, isPathMap, conditions);
	if (Array.isArray(target)) {
		const targetList = target;
		if (targetList.length === 0) return null;
		let lastException;
		let i = -1;
		while (++i < targetList.length) {
			const targetItem = targetList[i];
			let resolveResult;
			try {
				resolveResult = resolvePackageTarget(packageJsonUrl, targetItem, subpath, packageSubpath, base, pattern, internal, isPathMap, conditions);
			} catch (error) {
				const exception = error;
				lastException = exception;
				if (exception.code === "ERR_INVALID_PACKAGE_TARGET") continue;
				throw error;
			}
			if (resolveResult === void 0) continue;
			if (resolveResult === null) {
				lastException = null;
				continue;
			}
			return resolveResult;
		}
		if (lastException === void 0 || lastException === null) return lastException;
		throw lastException;
	}
	if (typeof target === "object" && target !== null) {
		const keys = Object.getOwnPropertyNames(target);
		let i = -1;
		while (++i < keys.length) {
			const key = keys[i];
			if (isArrayIndex(key)) throw new ERR_INVALID_PACKAGE_CONFIG(fileURLToPath(packageJsonUrl), fileURLToPath(base), "\"exports\" cannot contain numeric property keys.");
		}
		i = -1;
		while (++i < keys.length) {
			const key = keys[i];
			if (key === "default" || conditions && conditions.has(key)) {
				const conditionalTarget = target[key];
				const resolveResult = resolvePackageTarget(packageJsonUrl, conditionalTarget, subpath, packageSubpath, base, pattern, internal, isPathMap, conditions);
				if (resolveResult === void 0) continue;
				return resolveResult;
			}
		}
		return;
	}
	if (target === null) return null;
	throw invalidPackageTarget(packageSubpath, target, packageJsonUrl, internal, base);
}
function isConditionalExportsMainSugar(exports, packageJsonUrl, base) {
	if (typeof exports === "string" || Array.isArray(exports)) return true;
	if (typeof exports !== "object" || exports === null) return false;
	const keys = Object.getOwnPropertyNames(exports);
	let isConditionalSugar = false;
	let i = 0;
	let keyIndex = -1;
	while (++keyIndex < keys.length) {
		const key = keys[keyIndex];
		const currentIsConditionalSugar = key === "" || key[0] !== ".";
		if (i++ === 0) isConditionalSugar = currentIsConditionalSugar;
		else if (isConditionalSugar !== currentIsConditionalSugar) throw new ERR_INVALID_PACKAGE_CONFIG(fileURLToPath(packageJsonUrl), fileURLToPath(base), "\"exports\" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.");
	}
	return isConditionalSugar;
}
function emitTrailingSlashPatternDeprecation(match, pjsonUrl, base) {
	if (process$1.noDeprecation) return;
	const pjsonPath = fileURLToPath(pjsonUrl);
	if (emittedPackageWarnings.has(pjsonPath + "|" + match)) return;
	emittedPackageWarnings.add(pjsonPath + "|" + match);
	process$1.emitWarning(`Use of deprecated trailing slash pattern mapping "${match}" in the "exports" field module resolution of the package at ${pjsonPath}${base ? ` imported from ${fileURLToPath(base)}` : ""}. Mapping specifiers ending in "/" is no longer supported.`, "DeprecationWarning", "DEP0155");
}
function packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions) {
	let exports = packageConfig.exports;
	if (isConditionalExportsMainSugar(exports, packageJsonUrl, base)) exports = { ".": exports };
	if (own.call(exports, packageSubpath) && !packageSubpath.includes("*") && !packageSubpath.endsWith("/")) {
		const target = exports[packageSubpath];
		const resolveResult = resolvePackageTarget(packageJsonUrl, target, "", packageSubpath, base, false, false, false, conditions);
		if (resolveResult === null || resolveResult === void 0) throw exportsNotFound(packageSubpath, packageJsonUrl, base);
		return resolveResult;
	}
	let bestMatch = "";
	let bestMatchSubpath = "";
	const keys = Object.getOwnPropertyNames(exports);
	let i = -1;
	while (++i < keys.length) {
		const key = keys[i];
		const patternIndex = key.indexOf("*");
		if (patternIndex !== -1 && packageSubpath.startsWith(key.slice(0, patternIndex))) {
			if (packageSubpath.endsWith("/")) emitTrailingSlashPatternDeprecation(packageSubpath, packageJsonUrl, base);
			const patternTrailer = key.slice(patternIndex + 1);
			if (packageSubpath.length >= key.length && packageSubpath.endsWith(patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && key.lastIndexOf("*") === patternIndex) {
				bestMatch = key;
				bestMatchSubpath = packageSubpath.slice(patternIndex, packageSubpath.length - patternTrailer.length);
			}
		}
	}
	if (bestMatch) {
		const target = exports[bestMatch];
		const resolveResult = resolvePackageTarget(packageJsonUrl, target, bestMatchSubpath, bestMatch, base, true, false, packageSubpath.endsWith("/"), conditions);
		if (resolveResult === null || resolveResult === void 0) throw exportsNotFound(packageSubpath, packageJsonUrl, base);
		return resolveResult;
	}
	throw exportsNotFound(packageSubpath, packageJsonUrl, base);
}
function patternKeyCompare(a, b) {
	const aPatternIndex = a.indexOf("*");
	const bPatternIndex = b.indexOf("*");
	const baseLengthA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
	const baseLengthB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
	if (baseLengthA > baseLengthB) return -1;
	if (baseLengthB > baseLengthA) return 1;
	if (aPatternIndex === -1) return 1;
	if (bPatternIndex === -1) return -1;
	if (a.length > b.length) return -1;
	if (b.length > a.length) return 1;
	return 0;
}
function packageImportsResolve(name, base, conditions) {
	if (name === "#" || name.endsWith("/")) throw new ERR_INVALID_MODULE_SPECIFIER(name, "is not a valid internal imports specifier name", fileURLToPath(base));
	let packageJsonUrl;
	const packageConfig = getPackageScopeConfig(base);
	if (packageConfig.exists) {
		packageJsonUrl = pathToFileURL(packageConfig.pjsonPath);
		const imports = packageConfig.imports;
		if (imports) {
			if (own.call(imports, name) && !name.includes("*")) {
				const resolveResult = resolvePackageTarget(packageJsonUrl, imports[name], "", name, base, false, true, false, conditions);
				if (resolveResult !== null && resolveResult !== void 0) return resolveResult;
			} else {
				let bestMatch = "";
				let bestMatchSubpath = "";
				const keys = Object.getOwnPropertyNames(imports);
				let i = -1;
				while (++i < keys.length) {
					const key = keys[i];
					const patternIndex = key.indexOf("*");
					if (patternIndex !== -1 && name.startsWith(key.slice(0, patternIndex))) {
						const patternTrailer = key.slice(patternIndex + 1);
						if (name.length >= key.length && name.endsWith(patternTrailer) && patternKeyCompare(bestMatch, key) === 1 && key.lastIndexOf("*") === patternIndex) {
							bestMatch = key;
							bestMatchSubpath = name.slice(patternIndex, name.length - patternTrailer.length);
						}
					}
				}
				if (bestMatch) {
					const target = imports[bestMatch];
					const resolveResult = resolvePackageTarget(packageJsonUrl, target, bestMatchSubpath, bestMatch, base, true, true, false, conditions);
					if (resolveResult !== null && resolveResult !== void 0) return resolveResult;
				}
			}
		}
	}
	throw importNotDefined(name, packageJsonUrl, base);
}
function parsePackageName(specifier, base) {
	let separatorIndex = specifier.indexOf("/");
	let validPackageName = true;
	let isScoped = false;
	if (specifier[0] === "@") {
		isScoped = true;
		if (separatorIndex === -1 || specifier.length === 0) validPackageName = false;
		else separatorIndex = specifier.indexOf("/", separatorIndex + 1);
	}
	const packageName = separatorIndex === -1 ? specifier : specifier.slice(0, separatorIndex);
	if (invalidPackageNameRegEx.exec(packageName) !== null) validPackageName = false;
	if (!validPackageName) throw new ERR_INVALID_MODULE_SPECIFIER(specifier, "is not a valid package name", fileURLToPath(base));
	return {
		packageName,
		packageSubpath: "." + (separatorIndex === -1 ? "" : specifier.slice(separatorIndex)),
		isScoped
	};
}
function packageResolve(specifier, base, conditions) {
	if (nodeBuiltins.includes(specifier)) return new URL$1("node:" + specifier);
	const { packageName, packageSubpath, isScoped } = parsePackageName(specifier, base);
	const packageConfig = getPackageScopeConfig(base);
	if (packageConfig.exists && packageConfig.name === packageName && packageConfig.exports !== void 0 && packageConfig.exports !== null) return packageExportsResolve(pathToFileURL(packageConfig.pjsonPath), packageSubpath, packageConfig, base, conditions);
	let packageJsonUrl = new URL$1("./node_modules/" + packageName + "/package.json", base);
	let packageJsonPath = fileURLToPath(packageJsonUrl);
	let lastPath;
	do {
		const stat = tryStatSync(packageJsonPath.slice(0, -13));
		if (!stat || !stat.isDirectory()) {
			lastPath = packageJsonPath;
			packageJsonUrl = new URL$1((isScoped ? "../../../../node_modules/" : "../../../node_modules/") + packageName + "/package.json", packageJsonUrl);
			packageJsonPath = fileURLToPath(packageJsonUrl);
			continue;
		}
		const packageConfig = read(packageJsonPath, {
			base,
			specifier
		});
		if (packageConfig.exports !== void 0 && packageConfig.exports !== null) return packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions);
		if (packageSubpath === ".") return legacyMainResolve(packageJsonUrl, packageConfig, base);
		return new URL$1(packageSubpath, packageJsonUrl);
	} while (packageJsonPath.length !== lastPath.length);
	throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), false);
}
function isRelativeSpecifier(specifier) {
	if (specifier[0] === ".") {
		if (specifier.length === 1 || specifier[1] === "/") return true;
		if (specifier[1] === "." && (specifier.length === 2 || specifier[2] === "/")) return true;
	}
	return false;
}
function shouldBeTreatedAsRelativeOrAbsolutePath(specifier) {
	if (specifier === "") return false;
	if (specifier[0] === "/") return true;
	return isRelativeSpecifier(specifier);
}
function moduleResolve(specifier, base, conditions, preserveSymlinks) {
	const protocol = base.protocol;
	const isData = protocol === "data:";
	let resolved;
	if (shouldBeTreatedAsRelativeOrAbsolutePath(specifier)) try {
		resolved = new URL$1(specifier, base);
	} catch (error_) {
		const error = new ERR_UNSUPPORTED_RESOLVE_REQUEST(specifier, base);
		error.cause = error_;
		throw error;
	}
	else if (protocol === "file:" && specifier[0] === "#") resolved = packageImportsResolve(specifier, base, conditions);
	else try {
		resolved = new URL$1(specifier);
	} catch (error_) {
		if (isData && !nodeBuiltins.includes(specifier)) {
			const error = new ERR_UNSUPPORTED_RESOLVE_REQUEST(specifier, base);
			error.cause = error_;
			throw error;
		}
		resolved = packageResolve(specifier, base, conditions);
	}
	assert.ok(resolved !== void 0, "expected to be defined");
	if (resolved.protocol !== "file:") return resolved;
	return finalizeResolution(resolved, base, preserveSymlinks);
}
var DEFAULT_CONDITIONS_SET = /* #__PURE__ */ new Set(["node", "import"]);
var DEFAULT_CONDITIONS_KEY = "2:6:import4:node";
var isWindows$1 = /* #__PURE__ */ (() => process.platform === "win32")();
var globalCache = /* #__PURE__ */ (() => globalThis["__EXSOLVE_CACHE__"] ||= /* @__PURE__ */ new Map())();
var packageJSONCaches = /* #__PURE__ */ new WeakMap();
function resolveModuleURL(input, options) {
	const parsedInput = _parseInput(input);
	if ("external" in parsedInput) return parsedInput.external;
	const specifier = parsedInput.specifier;
	let url = parsedInput.url;
	const absolutePath = parsedInput.absolutePath;
	let cacheKey;
	let cacheObj;
	if (options?.cache !== false) {
		cacheKey = _cacheKey(url ? url.href : absolutePath || specifier, options, !!absolutePath);
		cacheObj = options?.cache && typeof options?.cache === "object" ? options.cache : globalCache;
	}
	if (cacheObj) {
		const cached = cacheObj.get(cacheKey);
		if (typeof cached === "string") return cached;
		if (cached instanceof Error) {
			if (options?.try) return;
			throw _copyError(cached);
		}
	}
	if (absolutePath) {
		url ||= pathToFileURL(absolutePath);
		try {
			if (statSync(absolutePath).isFile() && !url.pathname.endsWith("/")) {
				const realPath = options?.preserveSymlinks ? absolutePath : realpathSync(absolutePath);
				if (realPath !== absolutePath) {
					const { search, hash } = url;
					url = pathToFileURL(realPath);
					url.search = search;
					url.hash = hash;
				}
				if (cacheObj) cacheObj.set(cacheKey, url.href);
				return url.href;
			}
		} catch (error) {
			if (error?.code !== "ENOENT" && error?.code !== "ENOTDIR") {
				if (cacheObj) _cacheError(cacheObj, cacheKey, error);
				if (options?.try) return;
				throw error;
			}
		}
	}
	const conditionsSet = options?.conditions ? new Set(options.conditions) : DEFAULT_CONDITIONS_SET;
	let target = specifier;
	if (absolutePath) {
		const targetURL = new URL(url);
		targetURL.search = "";
		targetURL.hash = "";
		target = targetURL.href;
	}
	const bases = absolutePath ? [url] : _normalizeBases(options?.from);
	const suffixes = options?.suffixes || [""];
	const extensions = options?.extensions ? ["", ...options.extensions] : [""];
	let resolved;
	const previousPackageJSONCache = setPackageJSONCache(_packageJSONCache(cacheObj, cacheKey));
	for (const base of bases) {
		for (const suffix of suffixes) {
			let name = _join(target, suffix);
			if (name === ".") name += "/.";
			for (const extension of extensions) {
				resolved = _tryModuleResolve(name + extension, base, conditionsSet, options?.preserveSymlinks);
				if (resolved) break;
			}
			if (resolved) break;
		}
		if (resolved) break;
	}
	setPackageJSONCache(previousPackageJSONCache);
	if (!resolved) {
		const from = absolutePath ? _normalizeBases(options?.from) : bases;
		const error = /* @__PURE__ */ new Error(`Cannot resolve module "${input}" (from: ${from.map((u) => _fmtPath(u)).join(", ")})`);
		error.code = "ERR_MODULE_NOT_FOUND";
		if (cacheObj) _cacheError(cacheObj, cacheKey, error);
		if (options?.try) return;
		throw error;
	}
	if (absolutePath) {
		resolved.search = url.search;
		resolved.hash = url.hash;
	}
	if (cacheObj) cacheObj.set(cacheKey, resolved.href);
	return resolved.href;
}
function resolveModulePath(id, options) {
	const resolved = resolveModuleURL(id, options);
	if (!resolved) return;
	if (!resolved.startsWith("file://") && options?.try) return;
	const absolutePath = fileURLToPath(resolved);
	return isWindows$1 ? _normalizeWinPath(absolutePath) : absolutePath;
}
function clearResolveCache() {
	globalCache.clear();
	packageJSONCaches.delete(globalCache);
}
function _tryModuleResolve(specifier, base, conditions, preserveSymlinks) {
	try {
		return moduleResolve(specifier, base, conditions, preserveSymlinks);
	} catch {}
}
function _normalizeBases(inputs) {
	const urls = (Array.isArray(inputs) ? inputs : [inputs]).flatMap((input) => _normalizeBase(input));
	if (urls.length === 0) return [pathToFileURL("./")];
	return urls;
}
function _normalizeBase(input) {
	if (!input) return [];
	if (_isURL(input)) return [input];
	if (typeof input !== "string") return [];
	if (/^(?:node|data|http|https|file):/.test(input)) return new URL(input);
	try {
		if (input.endsWith("/") || statSync(input).isDirectory()) return pathToFileURL(input + "/");
		return pathToFileURL(input);
	} catch {
		return [pathToFileURL(input + "/"), pathToFileURL(input)];
	}
}
function _fmtPath(input) {
	try {
		return fileURLToPath(input);
	} catch {
		return input;
	}
}
function _cacheError(cache, key, error) {
	const copy = _copyError(error);
	copy.stack = error.stack;
	cache.set(key, copy);
}
function _copyError(error) {
	const copy = /* @__PURE__ */ new Error();
	Object.setPrototypeOf(copy, Object.getPrototypeOf(error));
	for (const key of Reflect.ownKeys(error)) if (key !== "stack") Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(error, key));
	return copy;
}
function _packageJSONCache(cacheObj, key) {
	if (!cacheObj) return /* @__PURE__ */ new Map();
	let packageJSONCache = packageJSONCaches.get(cacheObj);
	if (!packageJSONCache || !cacheObj.has(packageJSONCache.key)) {
		packageJSONCache = {
			key,
			packages: /* @__PURE__ */ new Map()
		};
		packageJSONCaches.set(cacheObj, packageJSONCache);
	}
	return packageJSONCache.packages;
}
function _cacheKey(id, options, absolute) {
	let from;
	if (Array.isArray(options?.from)) from = options.from;
	else if (options?.from) from = [options.from];
	const cwd = !absolute && _usesCwd(from) ? [process.cwd()] : void 0;
	return _cacheKeyValues([id]) + _cacheKeyValues(cwd) + _conditionsKey(options?.conditions) + _cacheKeyValues(options?.extensions) + _cacheKeyValues(from) + _cacheKeyValues(options?.suffixes) + (options?.preserveSymlinks ? "1" : "0");
}
function _usesCwd(from) {
	let hasBase = false;
	for (const base of from || []) if (_isURL(base)) hasBase = true;
	else if (typeof base === "string" && base) {
		if (!(isWindows$1 ? /^(?:[a-z]:[/\\]|[/\\]{2})/i.test(base) : isAbsolute(base)) && !/^(?:node|data|http|https|file):/.test(base)) return true;
		hasBase = true;
	}
	return !hasBase;
}
function _conditionsKey(conditions) {
	if (!conditions) return DEFAULT_CONDITIONS_KEY;
	return _cacheKeyValues([...new Set(conditions)].sort());
}
function _cacheKeyValues(values) {
	if (!values) return "-";
	let key = `${values.length}:`;
	for (const value of values) {
		const stringValue = String(value);
		key += `${stringValue.length}:${stringValue}`;
	}
	return key;
}
function _join(a, b) {
	if (!a || !b || b === "/") return a;
	return (a.endsWith("/") ? a : a + "/") + (b.startsWith("/") ? b.slice(1) : b);
}
function _normalizeWinPath(path) {
	return path.replace(/\\/g, "/").replace(/^[a-z]:\//, (r) => r.toUpperCase());
}
function _isURL(input) {
	return input instanceof URL || input?.constructor?.name === "URL";
}
function _normalizeAbsolutePath(input) {
	if (isWindows$1 && input.startsWith("\\\\?\\")) return fileURLToPath(pathToFileURL(input));
	const path = resolve(input);
	const last = input.at(-1);
	if ((last === "/" || isWindows$1 && last === "\\") && !path.endsWith(sep)) return path + sep;
	return path;
}
function _parseInput(input) {
	if (typeof input === "string") {
		if (input.startsWith("file:")) {
			const url = new URL(input);
			return {
				url,
				absolutePath: fileURLToPath(url)
			};
		}
		if (isAbsolute(input)) return { absolutePath: _normalizeAbsolutePath(input) };
		if (/^(?:node|data|http|https):/.test(input)) return { external: input };
		if (nodeBuiltins.includes(input) && !input.includes(":")) return { external: `node:${input}` };
		return { specifier: input };
	}
	if (_isURL(input)) {
		if (input.protocol === "file:") return {
			url: input,
			absolutePath: fileURLToPath(input)
		};
		return { external: input.href };
	}
	throw new TypeError("id must be a `string` or `URL`");
}
var E$2 = globalThis.process?.env || Object.create(null);
var I$1 = globalThis.process || { env: E$2 };
var O$2 = void 0 !== I$1 && I$1.env && I$1.env.NODE_ENV || void 0;
var n$3 = [
	["claude", ["CLAUDECODE", "CLAUDE_CODE"]],
	["replit", ["REPL_ID"]],
	["gemini", ["GEMINI_CLI"]],
	["codex", ["CODEX_SANDBOX", "CODEX_THREAD_ID"]],
	["opencode", ["OPENCODE"]],
	["pi", [/* #__PURE__ */ _$1("PATH", /\.pi[\\/]agent/)]],
	["auggie", ["AUGMENT_AGENT"]],
	["goose", ["GOOSE_PROVIDER"]],
	["junie", ["JUNIE_DATA", "JUNIE_SHIM_PATH"]],
	["copilot", ["COPILOT_AGENT", "COPILOT_CLI"]],
	["devin", [/* #__PURE__ */ _$1("EDITOR", /devin/)]],
	["cursor", ["CURSOR_AGENT"]],
	["kiro", [/* #__PURE__ */ _$1("TERM_PROGRAM", /kiro/, { noTTY: !0 })]]
];
function _$1(O, n, _) {
	return () => {
		if (_?.noTTY && I$1.stdout?.isTTY) return !1;
		const e = E$2[O];
		return !!e && n.test(e);
	};
}
function e$1() {
	const I = E$2.AI_AGENT;
	if (I) {
		const E = I.toLowerCase();
		return { name: "github_copilot_vscode_agent" === E || "github_copilot_cloud_agent" === E ? "copilot" : E };
	}
	for (const [I, O] of n$3) for (const n of O) if ("string" == typeof n ? E$2[n] : n()) return { name: I };
	return {};
}
var o = /* #__PURE__ */ e$1();
var i = /* #__PURE__ */ (() => !!o.name)();
var A$1 = [
	["APPVEYOR"],
	[
		"AWS_AMPLIFY",
		"AWS_APP_ID",
		{ ci: !0 }
	],
	["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],
	["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],
	["APPCIRCLE", "AC_APPCIRCLE"],
	["BAMBOO", "bamboo_planKey"],
	["BITBUCKET", "BITBUCKET_COMMIT"],
	["BITRISE", "BITRISE_IO"],
	["BUDDY", "BUDDY_WORKSPACE_ID"],
	["BUILDKITE"],
	["CIRCLE", "CIRCLECI"],
	["CIRRUS", "CIRRUS_CI"],
	[
		"CLOUDFLARE_PAGES",
		"CF_PAGES",
		{ ci: !0 }
	],
	[
		"CLOUDFLARE_WORKERS",
		"WORKERS_CI",
		{ ci: !0 }
	],
	["GOOGLE_CLOUDRUN", "K_SERVICE"],
	["GOOGLE_CLOUDRUN_JOB", "CLOUD_RUN_JOB"],
	["CODEBUILD", "CODEBUILD_BUILD_ARN"],
	["CODEFRESH", "CF_BUILD_ID"],
	["DRONE"],
	["DRONE", "DRONE_BUILD_EVENT"],
	["DSARI"],
	["GITHUB_ACTIONS"],
	["GITLAB", "GITLAB_CI"],
	["GITLAB", "CI_MERGE_REQUEST_ID"],
	["GOCD", "GO_PIPELINE_LABEL"],
	["LAYERCI"],
	["JENKINS", "JENKINS_URL"],
	["HUDSON", "HUDSON_URL"],
	["MAGNUM"],
	["NETLIFY"],
	[
		"NETLIFY",
		"NETLIFY_LOCAL",
		{ ci: !1 }
	],
	["NEVERCODE"],
	["RENDER"],
	["SAIL", "SAILCI"],
	["SEMAPHORE"],
	["SCREWDRIVER"],
	["SHIPPABLE"],
	["SOLANO", "TDDIUM"],
	["STRIDER"],
	["TEAMCITY", "TEAMCITY_VERSION"],
	["TRAVIS"],
	["VERCEL", "NOW_BUILDER"],
	[
		"VERCEL",
		"VERCEL",
		{ ci: !1 }
	],
	[
		"VERCEL",
		"VERCEL_ENV",
		{ ci: !1 }
	],
	["APPCENTER", "APPCENTER_BUILD_ID"],
	[
		"CODESANDBOX",
		"CODESANDBOX_SSE",
		{ ci: !1 }
	],
	[
		"CODESANDBOX",
		"CODESANDBOX_HOST",
		{ ci: !1 }
	],
	["STACKBLITZ"],
	["STORMKIT"],
	["CLEAVR"],
	["ZEABUR"],
	[
		"CODESPHERE",
		"CODESPHERE_APP_ID",
		{ ci: !0 }
	],
	["RAILWAY", "RAILWAY_PROJECT_ID"],
	["RAILWAY", "RAILWAY_SERVICE_ID"],
	["DENO-DEPLOY", "DENO_DEPLOY"],
	["DENO-DEPLOY", "DENO_DEPLOYMENT_ID"],
	[
		"FIREBASE_APP_HOSTING",
		"FIREBASE_APP_HOSTING",
		{ ci: !0 }
	],
	[
		"EDGEONE_PAGES",
		"EO_PAGES_CI",
		{ ci: !0 }
	]
];
function C$1() {
	for (const I of A$1) if (E$2[I[1] || I[0]]) return {
		name: I[0].toLowerCase(),
		...I[2]
	};
	return "/bin/jsh" === E$2.SHELL && I$1.versions?.webcontainer ? {
		name: "stackblitz",
		ci: !1
	} : {
		name: "",
		ci: !1
	};
}
var D = /* #__PURE__ */ C$1();
var T = /* #__PURE__ */ (() => D.name)();
var t$1 = I$1.platform || "";
var L$1 = /* #__PURE__ */ (() => !!E$2.CI || !1 !== D.ci)();
var N$1 = !!I$1.stdout?.isTTY;
var s$1 = !!E$2.DEBUG;
var r$2 = "test" === O$2 || !!E$2.TEST;
"production" === O$2 || E$2.MODE;
"dev" === O$2 || "development" === O$2 || E$2.MODE;
var U = /^win/i.test(t$1);
/^linux/i.test(t$1);
/^darwin/i.test(t$1);
var d$1 = (I$1.versions?.node || "").replace(/^v/, "") || null;
Number(d$1?.split(".")[0]);
var f$1 = !!I$1?.versions?.node;
I$1?.versions?.nub;
var g = "Bun" in globalThis;
var Y$1 = "Deno" in globalThis;
var p$1 = "fastly" in globalThis;
var b = "Netlify" in globalThis;
var m$1 = "EdgeRuntime" in globalThis;
var v$1 = "Cloudflare-Workers" === globalThis.navigator?.userAgent;
var V = [
	[b, "netlify"],
	[m$1, "edge-light"],
	[v$1, "workerd"],
	[p$1, "fastly"],
	[Y$1, "deno"],
	[g, "bun"],
	[f$1, "node"]
];
var F = function() {
	const E = V.find((E) => E[0]);
	if (E) return { name: E[1] };
}()?.name || "";
String.fromCharCode;
var ENC_SLASH_RE = /%2f/gi;
function decode(text = "") {
	try {
		return decodeURIComponent("" + text);
	} catch {
		return "" + text;
	}
}
function decodePath(text) {
	return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
	if (typeof opts === "boolean") opts = { acceptRelative: opts };
	if (opts.strict) return PROTOCOL_STRICT_REGEX.test(inputString);
	return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash$1(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/");
	return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return (hasTrailingSlash$1(input) ? input.slice(0, -1) : input) || "/";
	if (!hasTrailingSlash$1(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
	}
	const [s0, ...s] = path.split("?");
	return ((s0.endsWith("/") ? s0.slice(0, -1) : s0) || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/") ? input : input + "/";
	if (hasTrailingSlash$1(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
		if (!path) return fragment;
	}
	const [s0, ...s] = path.split("?");
	return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
	return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
	return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withLeadingSlash(input = "") {
	return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
	if (isEmptyURL(base) || hasProtocol(input)) return input;
	const _base = withoutTrailingSlash(base);
	if (input.startsWith(_base)) {
		const nextChar = input[_base.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL(_base, input);
}
function withoutBase(input, base) {
	if (isEmptyURL(base)) return input;
	const _base = withoutTrailingSlash(base);
	if (!input.startsWith(_base)) return input;
	const nextChar = input[_base.length];
	if (nextChar && nextChar !== "/" && nextChar !== "?") return input;
	return "/" + input.slice(_base.length).replace(/^\/+/, "");
}
function isEmptyURL(url) {
	return !url || url === "/";
}
function isNonEmptyURL(url) {
	return url && url !== "/";
}
function joinURL(base, ...input) {
	let url = base || "";
	for (const segment of input.filter((url2) => isNonEmptyURL(url2))) if (url) {
		const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
		url = withTrailingSlash(url) + _segment;
	} else url = segment;
	return url;
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
	const _specialProtoMatch = input.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
	if (_specialProtoMatch) {
		const [, _proto, _pathname = ""] = _specialProtoMatch;
		return {
			protocol: _proto.toLowerCase(),
			pathname: _pathname,
			href: _proto + _pathname,
			auth: "",
			host: "",
			search: "",
			hash: ""
		};
	}
	if (!hasProtocol(input, { acceptRelative: true })) return defaultProto ? parseURL(defaultProto + input) : parsePath$1(input);
	const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
	let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
	if (protocol === "file:") path = path.replace(/\/(?=[A-Za-z]:)/, "");
	const { pathname, search, hash } = parsePath$1(path);
	return {
		protocol: protocol.toLowerCase(),
		auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
		host,
		pathname,
		search,
		hash,
		[protocolRelative]: !protocol
	};
}
function parsePath$1(input = "") {
	const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
	return {
		pathname,
		search,
		hash
	};
}
function depPackageName(id) {
	const parts = id.split("/");
	return id.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}
function resolveFromDepPath(id, opts) {
	const name = depPackageName(id);
	const from = opts.path.startsWith("file:") ? fileURLToPath(opts.path) : resolve$2(opts.dir, opts.path);
	const isDir = statSync(from, { throwIfNoEntry: false })?.isDirectory();
	const pkgDir = _findPackageDir(isDir ? from : dirname$2(from), name);
	if (!pkgDir) throw new Error(`Cannot resolve \`${id}\` from \`${opts.path}\`. The \`deps.paths["${name}"]\` option must point to the \`${name}\` package directory or entry.`);
	const resolved = _resolveInPackage(id, name, pkgDir);
	if (!resolved) throw new Error(`Cannot resolve \`${id}\` in the \`${name}\` package at \`${pkgDir}\` (the \`deps.paths["${name}"]\` option).`);
	return resolved;
}
function _resolveInPackage(id, name, pkgDir) {
	const resolved = resolveModulePath(id, {
		from: join$2(pkgDir, "/"),
		try: true
	});
	if (resolved && _isInside(resolved, pkgDir)) return resolved;
	const file = resolveModulePath(join$2(pkgDir, id.slice(name.length + 1) || _readPackageJSON(pkgDir)?.main || "index"), {
		try: true,
		extensions: [
			".mjs",
			".js",
			".cjs",
			".json"
		],
		suffixes: ["", "/index"]
	});
	return file && _isInside(file, pkgDir) ? file : void 0;
}
function _isInside(file, dir) {
	const path = relative$2(realpathSync(dir), realpathSync(file));
	return !!path && !path.startsWith("..") && !isAbsolute$2(path);
}
function _findPackageDir(dir, name) {
	for (let depth = 0; depth < 10; depth++) {
		if (_readPackageJSON(dir)?.name === name) return dir;
		const parent = dirname$2(dir);
		if (parent === dir) return;
		dir = parent;
	}
}
function _readPackageJSON(dir) {
	const pkgPath = join$2(dir, "package.json");
	if (!existsSync(pkgPath)) return;
	try {
		return JSON.parse(readFileSync(pkgPath, "utf8"));
	} catch {}
}
var deps$1 = {
	"rolldown": {
		"version": "^1",
		"reason": "the `rolldown` builder",
		"types": true
	},
	"rollup": {
		"version": "^4",
		"reason": "the `rollup` builder",
		"types": true
	},
	"vite": {
		"version": "^8",
		"reason": "the `vite` builder"
	},
	"@rspack/core": {
		"version": "^2.3.0",
		"reason": "the `rspack` builder (experimental)",
		"types": true
	},
	"unstorage": {
		"version": "^2.0.0-alpha.10",
		"reason": "KV storage (`nitro/kv`)",
		"dev": false,
		"autoInstall": true,
		"runtime": true,
		"types": true
	},
	"db0": {
		"version": "^0.4.1",
		"reason": "the database layer (`nitro/database`)",
		"dev": false,
		"autoInstall": true,
		"runtime": true,
		"types": true
	},
	"unenv": {
		"version": "^2.0.0-rc.24",
		"reason": "Node.js compatibility",
		"autoInstall": true
	},
	"miniflare": {
		"version": "^4",
		"reason": "the `miniflare` dev runner"
	},
	"@azure/functions": {
		"version": "^4",
		"reason": "the Azure Functions v4 programming model",
		"dev": false,
		"projectOnly": true
	},
	"@vercel/queue": {
		"version": "^0.10.0",
		"reason": "Vercel Queues",
		"types": true
	},
	"xml2js": {
		"version": "^0.6.2",
		"reason": "merging a custom `web.config` for the IIS preset"
	},
	"zephyr-agent": {
		"version": "^1.6.0",
		"reason": "deploying to Zephyr"
	}
};
var shims$1 = {
	"dotenv": {
		"version": "^16 || ^17 || ^18",
		"library": "c12"
	},
	"giget": {
		"version": "^3.3.1",
		"library": "c12"
	},
	"jiti": {
		"version": "^2.7.0",
		"library": "c12"
	}
};
var deps = deps$1;
var shims = shims$1;
function getDepMeta(id) {
	return Object.hasOwn(deps, id) ? deps[id] : void 0;
}
function ensureDep(depOpts) {
	const opts = _resolveDepOptions(depOpts);
	const path = opts.deps?.paths?.[opts.id];
	const key = `${path ? `path:${path}` : opts.projectOnly ? "project" : "any"}:${opts.dir}:${opts.id}`;
	let pending = _pendingDeps.get(key);
	if (!pending) {
		pending = _ensureDep(opts).finally(() => _pendingDeps.delete(key));
		_pendingDeps.set(key, pending);
	}
	return pending;
}
async function importDep(opts) {
	const resolved = await ensureDep(opts);
	if (!resolved) throw missingDepError(opts);
	return import(pathToFileURL(resolved).href);
}
function missingDepError(depOpts) {
	const opts = _resolveDepOptions(depOpts);
	if (_isInNodeModules(opts.dir)) return /* @__PURE__ */ new Error(`\`${opts.id}\` cannot be resolved from \`${opts.dir}\`, which is inside \`node_modules\`. It is required for ${opts.reason}. The package that configures Nitro with this \`rootDir\` must add \`${_depSpec(opts)}\` to its own dependencies (or provide it with the \`deps.paths\` option).`);
	const dev = opts.dev === false ? "" : "dev ";
	const ci = opts.deps?.install === void 0 && L$1 && !r$2 ? " Dependencies are not installed on demand in CI unless the `deps.install` option is enabled." : "";
	return /* @__PURE__ */ new Error(`\`${opts.id}\` is not installed. It is required for ${opts.reason}. Please add it to your ${dev}dependencies (e.g. \`npx nypm add ${dev ? "-D " : ""}${_depSpec(opts)}\`).${ci}`);
}
function isDepInstalled(id, opts) {
	return !!resolveDep(id, opts);
}
function resolveDep(id, opts) {
	const path = opts.deps?.paths?.[depPackageName(id)];
	if (path) return resolveFromDepPath(id, {
		dir: opts.dir,
		path
	});
	const from = opts.projectOnly ? opts.dir : [opts.dir, import.meta.url];
	const resolved = resolveModulePath(id, {
		from,
		try: true
	});
	if (resolved) return resolved;
	const uncached = resolveModulePath(id, {
		from,
		try: true,
		cache: false
	});
	if (uncached) clearResolveCache();
	return uncached;
}
function isLibOption(option) {
	return option === "lib" || option.endsWith("Lib");
}
async function ensureLibDeps(users, opts) {
	const required = /* @__PURE__ */ new Map();
	for (const user of users) for (const dep of user.deps) {
		if (dep.optional || user.options[dep.option] !== void 0) continue;
		const entry = required.get(dep.name) || {
			version: dep.version,
			users: /* @__PURE__ */ new Set()
		};
		entry.users.add(user.name);
		required.set(dep.name, entry);
	}
	for (const [name, { version, users: names }] of required) {
		const reason = `the ${[...names].map((n) => `\`${n}\``).join(", ")} ${opts.label}${names.size > 1 ? "s" : ""}`;
		const depOpts = {
			id: name,
			version,
			dir: opts.dir,
			deps: { install: opts.deps?.install },
			reason,
			dev: false,
			projectOnly: true
		};
		if (await ensureDep(depOpts)) continue;
		if (!r$2 && !_canInstall(opts.deps?.install) && !_isInNodeModules(opts.dir)) throw missingDepError(depOpts);
		consola.warn(`\`${name}\` is not installed. It is required for ${reason}.`);
	}
}
function _resolveDepOptions(opts) {
	const meta = getDepMeta(opts.id);
	const defined = Object.fromEntries(Object.entries(opts).filter(([, value]) => value !== void 0));
	return {
		version: meta?.version,
		dev: meta?.dev,
		autoInstall: meta?.autoInstall,
		projectOnly: meta?.projectOnly,
		...defined,
		reason: opts.reason || meta?.reason || `\`${opts.id}\``
	};
}
var _pendingDeps = /* @__PURE__ */ new Map();
async function _ensureDep(opts) {
	const resolved = resolveDep(opts.id, opts);
	if (resolved) {
		_checkVersion(opts, resolved);
		return resolved;
	}
	if (_isInNodeModules(opts.dir)) return;
	let shouldInstall;
	if (r$2 || !_canInstall(opts.deps?.install)) shouldInstall = false;
	else if (opts.autoInstall) {
		consola.info(`\`${opts.id}\` is required for ${opts.reason}. Installing automatically...`);
		shouldInstall = true;
	} else if (L$1 || i || !N$1) {
		const env = L$1 ? "CI" : i ? "agent" : "non-interactive";
		consola.info(`\`${opts.id}\` is required for ${opts.reason}. Installing automatically in ${env} environment...`);
		shouldInstall = true;
	} else shouldInstall = await consola.prompt(`\`${opts.id}\` is required for ${opts.reason}, but it is not installed. Would you like to install it?`, {
		type: "confirm",
		default: true,
		cancel: "undefined"
	});
	if (!shouldInstall) return;
	const start = Date.now();
	consola.start(`Installing \`${opts.id}\` in \`${opts.dir}\`...`);
	const { addDependency, addDevDependency, detectPackageManager } = await import("../_13.mjs");
	const packageManager = await detectPackageManager(opts.dir) ? void 0 : _runtimePM();
	await (opts.dev === false ? addDependency : addDevDependency)(_depSpec(opts), {
		cwd: opts.dir,
		packageManager,
		env: { NODE_ENV: "development" }
	});
	const installed = resolveDep(opts.id, opts);
	if (installed) consola.success(`Installed \`${opts.id}\` in ${opts.dir} (${Date.now() - start}ms).`);
	else consola.warn(`Installed \`${opts.id}\` in ${opts.dir}, but it cannot be resolved from there.`);
	return installed;
}
function _canInstall(install) {
	return install ?? !L$1;
}
function _isInNodeModules(dir) {
	return `${normalize$2(dir)}/`.includes("/node_modules/");
}
function _runtimePM() {
	return process.versions.bun ? "bun" : process.versions.deno ? "deno" : "npm";
}
function _depSpec(opts) {
	return opts.version && !opts.version.includes(" ") ? `${opts.id}@${opts.version}` : opts.id;
}
var _checkedVersions = /* @__PURE__ */ new Set();
function _checkVersion(opts, entry) {
	const key = `${entry}@${opts.version}`;
	if (!opts.version || _checkedVersions.has(key)) return;
	_checkedVersions.add(key);
	const pkg = _installedPackage(opts.id, entry);
	if (!pkg?.version || _isSupportedVersion(pkg.version, opts.version)) return;
	consola.warn(`\`${opts.id}@${pkg.version}\` is used from \`${pkg.dir}\` but ${opts.reason} requires \`${opts.version}\`. Please update it if you run into issues.`);
}
function _installedPackage(id, entry) {
	let dir = dirname$2(entry);
	for (let depth = 0; depth < 10; depth++) {
		const pkgPath = join$2(dir, "package.json");
		if (existsSync(pkgPath)) try {
			const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
			if (pkg.name === id) return {
				dir,
				version: typeof pkg.version === "string" ? pkg.version : void 0
			};
		} catch {}
		const parent = dirname$2(dir);
		if (parent === dir) break;
		dir = parent;
	}
}
function _isSupportedVersion(version, range) {
	const installed = _parseVersion(version);
	const ranges = range.split("||").map((r) => r.trim());
	if (!installed || !ranges.every((r) => r.startsWith("^") && _parseVersion(r.slice(1)))) return true;
	return ranges.some((r) => {
		const { major, minor } = _parseVersion(r.slice(1));
		return major === installed.major && (major > 0 || minor === void 0 || minor === installed.minor);
	});
}
function _parseVersion(version) {
	const match = /^(\d+)(?:\.(\d+))?(?:\.\d+)?(?:-[\w.]+)?$/.exec(version);
	if (!match) return;
	return {
		major: Number(match[1]),
		minor: match[2] === void 0 ? void 0 : Number(match[2])
	};
}
async function resolveDatabaseConnections(options) {
	if (!options.experimental.database) return [];
	const configs = options.dev && options.devDatabase || options.database;
	const entries = Object.entries(configs || {}).filter(([, config]) => !!config?.connector);
	if (entries.length === 0) return [];
	const { connectors, connectorDependencies } = await importDb0({
		dir: options.rootDir,
		deps: options.deps,
		reason: "the `database` config"
	});
	return entries.map(([name, { connector, options: connectorOpts }]) => {
		const module = connectors[connector];
		if (!module) throw new Error(`Database connector "${connector}" is invalid.`);
		const deps = Object.entries(connectorDependencies[connector] || {}).map(([option, dep]) => ({
			option,
			...dep
		}));
		return {
			name,
			connector,
			module,
			options: connectorOpts || {},
			deps
		};
	});
}
function importDb0(opts) {
	return importDep({
		id: "db0",
		...opts
	});
}
var A = (r) => r !== null && typeof r == "object";
var a = (r, t) => Object.assign(/* @__PURE__ */ new Error(`[${r}]: ${t}`), { code: r });
var _ = "ERR_INVALID_PACKAGE_CONFIG";
var E$1 = "ERR_INVALID_PACKAGE_TARGET";
var I = "ERR_PACKAGE_PATH_NOT_EXPORTED";
var R$1 = /^\d+$/;
var O$1 = /^(\.{1,2}|node_modules)$/i;
var w = /\/|\\/;
var h = ((r) => (r.Export = "exports", r.Import = "imports", r))(h || {});
var f = (r, t, e, o, c) => {
	if (t == null) return [];
	if (typeof t == "string") {
		const [n, ...i] = t.split(w);
		if (n === ".." || i.some((l) => O$1.test(l))) throw a(E$1, `Invalid "${r}" target "${t}" defined in the package config`);
		return [c ? t.replace(/\*/g, c) : t];
	}
	if (Array.isArray(t)) return t.flatMap((n) => f(r, n, e, o, c));
	if (A(t)) {
		for (const n of Object.keys(t)) {
			if (R$1.test(n)) throw a(_, "Cannot contain numeric property keys");
			if (n === "default" || o.includes(n)) return f(r, t[n], e, o, c);
		}
		return [];
	}
	throw a(E$1, `Invalid "${r}" target "${t}"`);
};
var s = "*";
var m = (r, t) => {
	const e = r.indexOf(s), o = t.indexOf(s);
	return e === o ? t.length > r.length : o > e;
};
function d(r, t) {
	if (!t.includes(s) && r.hasOwnProperty(t)) return [t];
	let e, o;
	for (const c of Object.keys(r)) if (c.includes(s)) {
		const [n, i, l] = c.split(s);
		if (l === void 0 && t.startsWith(n) && t.endsWith(i)) {
			const g = t.slice(n.length, -i.length || void 0);
			g && (!e || m(e, c)) && (e = c, o = g);
		}
	}
	return [e, o];
}
var p = (r) => Object.keys(r).reduce((t, e) => {
	const o = e === "" || e[0] !== ".";
	if (t === void 0 || t === o) return o;
	throw a(_, "\"exports\" cannot contain some keys starting with \".\" and some not");
}, void 0);
var u = /^\w+:/;
var v = (r, t, e) => {
	if (!r) throw new Error("\"exports\" is required");
	t = t === "" ? "." : `./${t}`, (typeof r == "string" || Array.isArray(r) || A(r) && p(r)) && (r = { ".": r });
	const [o, c] = d(r, t), n = f(h.Export, r[o], t, e, c);
	if (n.length === 0) throw a(I, t === "." ? "No \"exports\" main defined" : `Package subpath '${t}' is not defined by "exports"`);
	for (const i of n) if (!i.startsWith("./") && !u.test(i)) throw a(E$1, `Invalid "exports" target "${i}" defined in the package config`);
	return n;
};
var xe = Object.defineProperty;
var r = (e, t) => xe(e, "name", {
	value: t,
	configurable: !0
});
function L(e) {
	return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
r(L, "slash");
var Q = r((e) => {
	const t = fs[e];
	return (l, ...n) => {
		const s = `${e}:${n.join(":")}`;
		let i = l == null ? void 0 : l.get(s);
		return i === void 0 && (i = Reflect.apply(t, fs, n), l?.set(s, i)), i;
	};
}, "cacheFs");
var x = Q("existsSync");
var Se = Q("readFileSync");
var H = Q("statSync");
var Ne = Q("realpathSync");
var Pe = r((...[e, t]) => {
	const l = Ne(e, t);
	if (typeof l != "string") throw new TypeError(`Unexpected resolved path type for ${l} in ${t}`);
	return l;
}, "realpath");
var O = r((e, t, l) => {
	for (;;) {
		const n = path.posix.join(e, t);
		if (x(l, n)) return n;
		const s = path.dirname(e);
		if (s === e) return;
		e = s;
	}
}, "findUp");
var C = /^\.{1,2}(\/.*)?$/;
var X = r((e) => {
	const t = L(e);
	return C.test(t) ? t : `./${t}`;
}, "normalizeRelativePath");
function We(e, t = !1) {
	const l = e.length;
	let n = 0, s = "", i = 0, o = 16, f = 0, u = 0, c = 0, w = 0, p = 0;
	function _(g, j) {
		let y = 0, A = 0;
		for (; y < g;) {
			let k = e.charCodeAt(n);
			if (k >= 48 && k <= 57) A = A * 16 + k - 48;
			else if (k >= 65 && k <= 70) A = A * 16 + k - 65 + 10;
			else if (k >= 97 && k <= 102) A = A * 16 + k - 97 + 10;
			else break;
			n++, y++;
		}
		return y < g && (A = -1), A;
	}
	r(_, "scanHexDigits");
	function h(g) {
		n = g, s = "", i = 0, o = 16, p = 0;
	}
	r(h, "setPosition");
	function D() {
		let g = n;
		if (e.charCodeAt(n) === 48) n++;
		else for (n++; n < e.length && R(e.charCodeAt(n));) n++;
		if (n < e.length && e.charCodeAt(n) === 46) if (n++, n < e.length && R(e.charCodeAt(n))) for (n++; n < e.length && R(e.charCodeAt(n));) n++;
		else return p = 3, e.substring(g, n);
		let j = n;
		if (n < e.length && (e.charCodeAt(n) === 69 || e.charCodeAt(n) === 101)) if (n++, (n < e.length && e.charCodeAt(n) === 43 || e.charCodeAt(n) === 45) && n++, n < e.length && R(e.charCodeAt(n))) {
			for (n++; n < e.length && R(e.charCodeAt(n));) n++;
			j = n;
		} else p = 3;
		return e.substring(g, j);
	}
	r(D, "scanNumber");
	function T() {
		let g = "", j = n;
		for (;;) {
			if (n >= l) {
				g += e.substring(j, n), p = 2;
				break;
			}
			const y = e.charCodeAt(n);
			if (y === 34) {
				g += e.substring(j, n), n++;
				break;
			}
			if (y === 92) {
				if (g += e.substring(j, n), n++, n >= l) {
					p = 2;
					break;
				}
				switch (e.charCodeAt(n++)) {
					case 34:
						g += "\"";
						break;
					case 92:
						g += "\\";
						break;
					case 47:
						g += "/";
						break;
					case 98:
						g += "\b";
						break;
					case 102:
						g += "\f";
						break;
					case 110:
						g += `
`;
						break;
					case 114:
						g += "\r";
						break;
					case 116:
						g += "	";
						break;
					case 117:
						const k = _(4);
						k >= 0 ? g += String.fromCharCode(k) : p = 4;
						break;
					default: p = 5;
				}
				j = n;
				continue;
			}
			if (y >= 0 && y <= 31) if (J(y)) {
				g += e.substring(j, n), p = 2;
				break;
			} else p = 6;
			n++;
		}
		return g;
	}
	r(T, "scanString");
	function d() {
		if (s = "", p = 0, i = n, u = f, w = c, n >= l) return i = l, o = 17;
		let g = e.charCodeAt(n);
		if (ee(g)) {
			do
				n++, s += String.fromCharCode(g), g = e.charCodeAt(n);
			while (ee(g));
			return o = 15;
		}
		if (J(g)) return n++, s += String.fromCharCode(g), g === 13 && e.charCodeAt(n) === 10 && (n++, s += `
`), f++, c = n, o = 14;
		switch (g) {
			case 123: return n++, o = 1;
			case 125: return n++, o = 2;
			case 91: return n++, o = 3;
			case 93: return n++, o = 4;
			case 58: return n++, o = 6;
			case 44: return n++, o = 5;
			case 34: return n++, s = T(), o = 10;
			case 47:
				const j = n - 1;
				if (e.charCodeAt(n + 1) === 47) {
					for (n += 2; n < l && !J(e.charCodeAt(n));) n++;
					return s = e.substring(j, n), o = 12;
				}
				if (e.charCodeAt(n + 1) === 42) {
					n += 2;
					const y = l - 1;
					let A = !1;
					for (; n < y;) {
						const k = e.charCodeAt(n);
						if (k === 42 && e.charCodeAt(n + 1) === 47) {
							n += 2, A = !0;
							break;
						}
						n++, J(k) && (k === 13 && e.charCodeAt(n) === 10 && n++, f++, c = n);
					}
					return A || (n++, p = 1), s = e.substring(j, n), o = 13;
				}
				return s += String.fromCharCode(g), n++, o = 16;
			case 45: if (s += String.fromCharCode(g), n++, n === l || !R(e.charCodeAt(n))) return o = 16;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: return s += D(), o = 11;
			default:
				for (; n < l && v(g);) n++, g = e.charCodeAt(n);
				if (i !== n) {
					switch (s = e.substring(i, n), s) {
						case "true": return o = 8;
						case "false": return o = 9;
						case "null": return o = 7;
					}
					return o = 16;
				}
				return s += String.fromCharCode(g), n++, o = 16;
		}
	}
	r(d, "scanNext");
	function v(g) {
		if (ee(g) || J(g)) return !1;
		switch (g) {
			case 125:
			case 93:
			case 123:
			case 91:
			case 34:
			case 58:
			case 44:
			case 47: return !1;
		}
		return !0;
	}
	r(v, "isUnknownContentCharacter");
	function $() {
		let g;
		do
			g = d();
		while (g >= 12 && g <= 15);
		return g;
	}
	return r($, "scanNextNonTrivia"), {
		setPosition: h,
		getPosition: r(() => n, "getPosition"),
		scan: t ? $ : d,
		getToken: r(() => o, "getToken"),
		getTokenValue: r(() => s, "getTokenValue"),
		getTokenOffset: r(() => i, "getTokenOffset"),
		getTokenLength: r(() => n - i, "getTokenLength"),
		getTokenStartLine: r(() => u, "getTokenStartLine"),
		getTokenStartCharacter: r(() => i - w, "getTokenStartCharacter"),
		getTokenError: r(() => p, "getTokenError")
	};
}
r(We, "createScanner");
function ee(e) {
	return e === 32 || e === 9;
}
r(ee, "isWhiteSpace");
function J(e) {
	return e === 10 || e === 13;
}
r(J, "isLineBreak");
function R(e) {
	return e >= 48 && e <= 57;
}
r(R, "isDigit");
var ge;
(function(e) {
	e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab";
})(ge || (ge = {})), new Array(20).fill(0).map((e, t) => " ".repeat(t));
var S = 200;
new Array(S).fill(0).map((e, t) => `
` + " ".repeat(t)), new Array(S).fill(0).map((e, t) => "\r" + " ".repeat(t)), new Array(S).fill(0).map((e, t) => `\r
` + " ".repeat(t)), new Array(S).fill(0).map((e, t) => `
` + "	".repeat(t)), new Array(S).fill(0).map((e, t) => "\r" + "	".repeat(t)), new Array(S).fill(0).map((e, t) => `\r
` + "	".repeat(t));
var Y;
(function(e) {
	e.DEFAULT = { allowTrailingComma: !1 };
})(Y || (Y = {}));
function Je(e, t = [], l = Y.DEFAULT) {
	let n = null, s = [];
	const i = [];
	function o(u) {
		Array.isArray(s) ? s.push(u) : n !== null && (s[n] = u);
	}
	return r(o, "onValue"), Me(e, {
		onObjectBegin: r(() => {
			const u = {};
			o(u), i.push(s), s = u, n = null;
		}, "onObjectBegin"),
		onObjectProperty: r((u) => {
			n = u;
		}, "onObjectProperty"),
		onObjectEnd: r(() => {
			s = i.pop();
		}, "onObjectEnd"),
		onArrayBegin: r(() => {
			const u = [];
			o(u), i.push(s), s = u, n = null;
		}, "onArrayBegin"),
		onArrayEnd: r(() => {
			s = i.pop();
		}, "onArrayEnd"),
		onLiteralValue: o,
		onError: r((u, c, w) => {
			t.push({
				error: u,
				offset: c,
				length: w
			});
		}, "onError")
	}, l), s[0];
}
r(Je, "parse$1");
function Me(e, t, l = Y.DEFAULT) {
	const n = We(e, !1), s = [];
	let i = 0;
	function o(b) {
		return b ? () => i === 0 && b(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter()) : () => !0;
	}
	r(o, "toNoArgVisit");
	function f(b) {
		return b ? (F) => i === 0 && b(F, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter()) : () => !0;
	}
	r(f, "toOneArgVisit");
	function u(b) {
		return b ? (F) => i === 0 && b(F, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter(), () => s.slice()) : () => !0;
	}
	r(u, "toOneArgVisitWithPath");
	function c(b) {
		return b ? () => {
			i > 0 ? i++ : b(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter(), () => s.slice()) === !1 && (i = 1);
		} : () => !0;
	}
	r(c, "toBeginVisit");
	function w(b) {
		return b ? () => {
			i > 0 && i--, i === 0 && b(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter());
		} : () => !0;
	}
	r(w, "toEndVisit");
	const p = c(t.onObjectBegin), _ = u(t.onObjectProperty), h = w(t.onObjectEnd), D = c(t.onArrayBegin), T = w(t.onArrayEnd), d = u(t.onLiteralValue), v = f(t.onSeparator), $ = o(t.onComment), g = f(t.onError), j = l && l.disallowComments, y = l && l.allowTrailingComma;
	function A() {
		for (;;) {
			const b = n.scan();
			switch (n.getTokenError()) {
				case 4:
					k(14);
					break;
				case 5:
					k(15);
					break;
				case 3:
					k(13);
					break;
				case 1:
					j || k(11);
					break;
				case 2:
					k(12);
					break;
				case 6: k(16);
			}
			switch (b) {
				case 12:
				case 13:
					j ? k(10) : $();
					break;
				case 16:
					k(1);
					break;
				case 15:
				case 14: break;
				default: return b;
			}
		}
	}
	r(A, "scanNext");
	function k(b, F = [], W = []) {
		if (g(b), F.length + W.length > 0) {
			let I = n.getToken();
			for (; I !== 17;) {
				if (F.indexOf(I) !== -1) {
					A();
					break;
				} else if (W.indexOf(I) !== -1) break;
				I = A();
			}
		}
	}
	r(k, "handleError");
	function P(b) {
		const F = n.getTokenValue();
		return b ? d(F) : (_(F), s.push(F)), A(), !0;
	}
	r(P, "parseString");
	function M() {
		switch (n.getToken()) {
			case 11:
				const b = n.getTokenValue();
				let F = Number(b);
				isNaN(F) && (k(2), F = 0), d(F);
				break;
			case 7:
				d(null);
				break;
			case 8:
				d(!0);
				break;
			case 9:
				d(!1);
				break;
			default: return !1;
		}
		return A(), !0;
	}
	r(M, "parseLiteral");
	function V() {
		return n.getToken() !== 10 ? (k(3, [], [2, 5]), !1) : (P(!1), n.getToken() === 6 ? (v(":"), A(), U() || k(4, [], [2, 5])) : k(5, [], [2, 5]), s.pop(), !0);
	}
	r(V, "parseProperty");
	function z() {
		p(), A();
		let b = !1;
		for (; n.getToken() !== 2 && n.getToken() !== 17;) {
			if (n.getToken() === 5) {
				if (b || k(4, [], []), v(","), A(), n.getToken() === 2 && y) break;
			} else b && k(6, [], []);
			V() || k(4, [], [2, 5]), b = !0;
		}
		return h(), n.getToken() !== 2 ? k(7, [2], []) : A(), !0;
	}
	r(z, "parseObject");
	function G() {
		D(), A();
		let b = !0, F = !1;
		for (; n.getToken() !== 4 && n.getToken() !== 17;) {
			if (n.getToken() === 5) {
				if (F || k(4, [], []), v(","), A(), n.getToken() === 4 && y) break;
			} else F && k(6, [], []);
			b ? (s.push(0), b = !1) : s[s.length - 1]++, U() || k(4, [], [4, 5]), F = !0;
		}
		return T(), b || s.pop(), n.getToken() !== 4 ? k(8, [4], []) : A(), !0;
	}
	r(G, "parseArray");
	function U() {
		switch (n.getToken()) {
			case 3: return G();
			case 1: return z();
			case 10: return P(!0);
			default: return M();
		}
	}
	return r(U, "parseValue"), A(), n.getToken() === 17 ? l.allowEmptyContent ? !0 : (k(4, [], []), !1) : U() ? (n.getToken() !== 17 && k(9, [], []), !0) : (k(4, [], []), !1);
}
r(Me, "visit");
var ke;
(function(e) {
	e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter";
})(ke || (ke = {}));
var me;
(function(e) {
	e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF";
})(me || (me = {}));
var Ve = Je;
var de;
(function(e) {
	e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter";
})(de || (de = {}));
var we = r((e, t) => Ve(Se(t, e, "utf8")), "readJsonc");
var ne = Symbol("implicitBaseUrl");
var E = "${configDir}";
var ze = r(() => {
	const { findPnpApi: e } = $e;
	return e && e(process.cwd());
}, "getPnpApi");
var te = r((e, t, l, n) => {
	const s = `resolveFromPackageJsonPath:${e}:${t}:${l}`;
	if (n != null && n.has(s)) return n.get(s);
	const i = we(e, n);
	if (!i) return;
	let o = t || "tsconfig.json";
	if (!l && i.exports) try {
		const [f] = v(i.exports, t, ["require", "types"]);
		o = f;
	} catch {
		return !1;
	}
	else !t && i.tsconfig && (o = i.tsconfig);
	return o = path.join(e, "..", o), n?.set(s, o), o;
}, "resolveFromPackageJsonPath");
var se = "package.json";
var le = "tsconfig.json";
var Ge = r((e, t, l) => {
	var n;
	let s = e;
	if (e === ".." && (s = path.join(s, le)), e[0] === "." && (s = path.resolve(t, s)), path.isAbsolute(s)) {
		if (x(l, s)) {
			if (H(l, s).isFile()) return s;
		} else if (!s.endsWith(".json")) {
			const T = `${s}.json`;
			if (x(l, T)) return T;
		}
		return;
	}
	const [i, ...o] = e.split("/"), f = i[0] === "@" ? `${i}/${o.shift()}` : i, u = o.join("/"), c = ze();
	if (c) {
		const { resolveRequest: T } = c;
		try {
			if (f === e) {
				const d = T(path.join(f, se), t);
				if (d) {
					const v = te(d, u, !1, l);
					if (v && x(l, v)) return v;
				}
			} else {
				let d;
				try {
					d = T(e, t, { extensions: [".json"] });
				} catch {
					d = T(path.join(e, le), t);
				}
				if (d) return d;
			}
		} catch {}
	}
	const w = O(path.resolve(t), path.join("node_modules", f), l);
	if (!w || !((n = H(l, w)) != null && n.isDirectory())) return;
	const p = Pe(l, w), _ = path.join(p, se);
	if (x(l, _)) {
		const T = te(_, u, !1, l);
		if (T === !1) return;
		if (T && x(l, T) && H(l, T).isFile()) return T;
	}
	const h = path.join(p, u), D = h.endsWith(".json");
	if (!D) {
		const T = `${h}.json`;
		if (x(l, T)) return T;
	}
	if (x(l, h)) {
		if (H(l, h).isDirectory()) {
			const T = path.join(h, se);
			if (x(l, T)) {
				const v = te(T, "", !0, l);
				if (v && x(l, v)) return v;
			}
			const d = path.join(h, le);
			if (x(l, d)) return d;
		} else if (D) return h;
	}
}, "resolveExtendsPath");
var oe = r((e, t) => X(path.relative(e, t)), "pathRelative");
var pe = [
	"files",
	"include",
	"exclude"
];
var N = r((e, t, l) => {
	const n = path.join(t, l);
	return L(path.relative(e, n)) || "./";
}, "resolveAndRelativize");
var Qe = r((e, t, l) => {
	const n = path.relative(e, t);
	if (!n) return l;
	return L(`${n}/${l.startsWith("./") ? l.slice(2) : l}`);
}, "prefixPattern");
var He = r((e, t, l, n) => {
	const s = Ge(e, t, n);
	if (!s) throw new Error(`File '${e}' not found.`);
	if (l.has(s)) throw new Error(`Circularity detected while resolving configuration: ${s}`);
	l.add(s);
	const i = path.dirname(s), o = ve(s, n, l, !0);
	delete o.references;
	const { compilerOptions: f } = o;
	if (f) {
		const { baseUrl: u } = f;
		u && !u.startsWith(E) && (f.baseUrl = N(t, i, u));
		const { outDir: c } = f;
		c && !c.startsWith(E) && (f.outDir = N(t, i, c));
		const { declarationDir: w } = f;
		w && !w.startsWith(E) && (f.declarationDir = N(t, i, w));
		const { rootDir: p } = f;
		p && !p.startsWith(E) && (f.rootDir = N(t, i, p));
		const { rootDirs: _ } = f;
		_ && (f.rootDirs = _.map((D) => D.startsWith(E) ? D : N(t, i, D)));
		const { typeRoots: h } = f;
		h && (f.typeRoots = h.map((D) => D.startsWith(E) ? D : N(t, i, D)));
	}
	for (const u of pe) {
		const c = o[u];
		c && (o[u] = c.map((w) => w.startsWith(E) ? w : Qe(t, i, w)));
	}
	return o;
}, "resolveExtends");
var be = ["outDir", "declarationDir"];
var ve = r((e, t, l = /* @__PURE__ */ new Set(), n = !1) => {
	let s;
	try {
		s = we(e, t) || {};
	} catch {
		throw new Error(`Cannot resolve tsconfig at path: ${e}`);
	}
	if (typeof s != "object") throw new SyntaxError(`Failed to parse tsconfig at: ${e}`);
	const i = path.dirname(e);
	if (s.compilerOptions) {
		const { compilerOptions: o } = s;
		o.paths && !o.baseUrl && (o[ne] = i);
	}
	if (s.extends) {
		const o = Array.isArray(s.extends) ? s.extends : [s.extends];
		delete s.extends;
		for (const f of o.reverse()) {
			const u = He(f, i, new Set(l), t), c = {
				...u,
				...s,
				compilerOptions: {
					...u.compilerOptions,
					...s.compilerOptions
				}
			};
			u.watchOptions && (c.watchOptions = {
				...u.watchOptions,
				...s.watchOptions
			}), s = c;
		}
	}
	if (s.compilerOptions) {
		const { compilerOptions: o } = s;
		for (const u of ["baseUrl", "rootDir"]) {
			const c = o[u];
			if (c && !c.startsWith(E)) o[u] = oe(i, path.resolve(i, c));
		}
		for (const u of be) {
			let c = o[u];
			c && (!n && !Array.isArray(s.exclude) && (s.exclude = be.map((w) => o[w]).filter(Boolean)), c.startsWith(E) || (c = X(c)), o[u] = c);
		}
	} else s.compilerOptions = {};
	if (s.include && (s.include = s.include.map(L)), s.files && (s.files = s.files.map((o) => o.startsWith(E) ? o : X(o))), s.watchOptions) {
		const { watchOptions: o } = s;
		o.excludeDirectories && (o.excludeDirectories = o.excludeDirectories.map((f) => L(path.resolve(i, f)))), o.excludeFiles && (o.excludeFiles = o.excludeFiles.map((f) => L(path.resolve(i, f)))), o.watchFile && (o.watchFile = o.watchFile.toLowerCase()), o.watchDirectory && (o.watchDirectory = o.watchDirectory.toLowerCase()), o.fallbackPolling && (o.fallbackPolling = o.fallbackPolling.toLowerCase());
	}
	return s;
}, "_parseTsconfig");
var Z = r((e, t) => {
	if (e.startsWith(E)) return L(path.join(t, e.slice(12)));
}, "interpolateConfigDir");
var Xe = [
	"outDir",
	"declarationDir",
	"outFile",
	"rootDir",
	"baseUrl",
	"tsBuildInfoFile"
];
var Ye = r((e) => {
	if (e.strict) for (const B of [
		"noImplicitAny",
		"noImplicitThis",
		"strictNullChecks",
		"strictFunctionTypes",
		"strictBindCallApply",
		"strictPropertyInitialization",
		"strictBuiltinIteratorReturn",
		"alwaysStrict",
		"useUnknownInCatchVariables"
	]) e[B] === void 0 && (e[B] = !0);
	if (e.composite && (e.declaration ??= !0, e.incremental ??= !0), e.target) {
		let a = e.target.toLowerCase();
		a === "es2015" && (a = "es6"), e.target = a, a === "esnext" && (e.module ??= "es6", e.useDefineForClassFields ??= !0), (a === "es6" || a === "es2016" || a === "es2017" || a === "es2018" || a === "es2019" || a === "es2020" || a === "es2021" || a === "es2022" || a === "es2023" || a === "es2024") && (e.module ??= "es6"), (a === "es2022" || a === "es2023" || a === "es2024") && (e.useDefineForClassFields ??= !0);
	}
	if (e.module) {
		let a = e.module.toLowerCase();
		if (a === "es2015" && (a = "es6"), e.module = a, (a === "es6" || a === "es2020" || a === "es2022" || a === "esnext" || a === "none" || a === "system" || a === "umd" || a === "amd") && (e.moduleResolution ??= "classic"), a === "system" && (e.allowSyntheticDefaultImports ??= !0), (a === "node16" || a === "node18" || a === "node20" || a === "nodenext" || a === "preserve") && (e.esModuleInterop ??= !0, e.allowSyntheticDefaultImports ??= !0), (a === "node16" || a === "node18" || a === "node20" || a === "nodenext") && (e.moduleDetection ??= "force"), a === "node16" && (e.target ??= "es2022", e.moduleResolution ??= "node16"), a === "node18" && (e.target ??= "es2022", e.moduleResolution ??= "node16"), a === "node20" && (e.target ??= "es2023", e.moduleResolution ??= "node16", e.resolveJsonModule ??= !0), a === "nodenext" && (e.target ??= "esnext", e.moduleResolution ??= "nodenext", e.resolveJsonModule ??= !0), a === "node16" || a === "node18" || a === "node20" || a === "nodenext") {
			const B = e.target;
			(B === "es3" || B === "es2022" || B === "es2023" || B === "es2024" || B === "esnext") && (e.useDefineForClassFields ??= !0);
		}
		a === "preserve" && (e.moduleResolution ??= "bundler");
	}
	if (e.moduleResolution) {
		let a = e.moduleResolution.toLowerCase();
		a === "node" && (a = "node10"), e.moduleResolution = a, (a === "node16" || a === "nodenext" || a === "bundler") && (e.resolvePackageJsonExports ??= !0, e.resolvePackageJsonImports ??= !0), a === "bundler" && (e.allowSyntheticDefaultImports ??= !0, e.resolveJsonModule ??= !0);
	}
	e.jsx && (e.jsx = e.jsx.toLowerCase()), e.moduleDetection && (e.moduleDetection = e.moduleDetection.toLowerCase()), e.importsNotUsedAsValues && (e.importsNotUsedAsValues = e.importsNotUsedAsValues.toLowerCase()), e.newLine && (e.newLine = e.newLine.toLowerCase()), e.esModuleInterop && (e.allowSyntheticDefaultImports ??= !0), e.verbatimModuleSyntax && (e.isolatedModules ??= !0, e.preserveConstEnums ??= !0), e.isolatedModules && (e.preserveConstEnums ??= !0), e.rewriteRelativeImportExtensions && (e.allowImportingTsExtensions ??= !0), e.lib && (e.lib = e.lib.map((a) => a.toLowerCase())), e.checkJs && (e.allowJs ??= !0);
}, "normalizeCompilerOptions");
var ie = r((e, t = /* @__PURE__ */ new Map()) => {
	const l = path.resolve(e), n = ve(l, t), s = path.dirname(l), { compilerOptions: i } = n;
	if (i) {
		for (const f of Xe) {
			const u = i[f];
			if (u) {
				const c = Z(u, s);
				i[f] = c ? oe(s, c) : u;
			}
		}
		for (const f of ["rootDirs", "typeRoots"]) {
			const u = i[f];
			u && (i[f] = u.map((c) => {
				const w = Z(c, s);
				return w ? oe(s, w) : X(c);
			}));
		}
		const { paths: o } = i;
		if (o) for (const f of Object.keys(o)) o[f] = o[f].map((u) => {
			var c;
			return (c = Z(u, s)) != null ? c : u;
		});
		Ye(i);
	}
	for (const o of pe) {
		const f = n[o];
		f && (n[o] = f.map((u) => {
			var c;
			return (c = Z(u, s)) != null ? c : u;
		}));
	}
	return n;
}, "parseTsconfig");
var Ze = Object.defineProperty;
var q = r((e, t) => Ze(e, "name", {
	value: t,
	configurable: !0
}), "s");
var Te = q((e) => {
	let t = "";
	for (let l = 0; l < e.length; l += 1) {
		const n = e[l], s = n.toUpperCase();
		t += n === s ? n.toLowerCase() : s;
	}
	return t;
}, "invertCase"), re = /* @__PURE__ */ new Map(), Ae = q((e, t) => {
	const l = path10.join(e, `.is-fs-case-sensitive-test-${process.pid}`);
	try {
		return t.writeFileSync(l, ""), !t.existsSync(Te(l));
	} finally {
		try {
			t.unlinkSync(l);
		} catch {}
	}
}, "checkDirectoryCaseWithWrite"), qe = q((e, t, l) => {
	try {
		return Ae(e, l);
	} catch (n) {
		if (t === void 0) return Ae(Ue.tmpdir(), l);
		throw n;
	}
}, "checkDirectoryCaseWithFallback"), Ke = q((e, t = fs4, l = !0) => {
	const n = e != null ? e : process.cwd();
	if (l && re.has(n)) return re.get(n);
	let s;
	const i = Te(n);
	return i !== n && t.existsSync(n) ? s = !t.existsSync(i) : s = qe(n, e, t), l && re.set(n, s), s;
}, "isFsCaseSensitive"), { join: Oe } = path.posix, _e = r((e, t) => {
	const l = Oe(e, t);
	return e.startsWith("//") && !l.startsWith("//") ? `/${l}` : l;
}, "pathJoin"), ue = {
	ts: [
		".ts",
		".tsx",
		".d.ts"
	],
	cts: [".cts", ".d.cts"],
	mts: [".mts", ".d.mts"]
}, Ce = r((e) => {
	const t = [...ue.ts], l = [...ue.cts], n = [...ue.mts];
	return e != null && e.allowJs && (t.push(".js", ".jsx"), l.push(".cjs"), n.push(".mjs")), [
		...t,
		...l,
		...n
	];
}, "getSupportedExtensions"), en = r((e) => {
	const t = [];
	if (!e) return t;
	const { outDir: l, declarationDir: n } = e;
	return l && t.push(l), n && t.push(n), t;
}, "getDefaultExcludeSpec"), ye = r((e) => e.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`), "escapeForRegexp"), fe = `(?!(${[
	"node_modules",
	"bower_components",
	"jspm_packages"
].join("|")})(/|$))`, tn = /(?:^|\/)[^.*?]+$/, je = "**/*", K = "[^/]", ae = "[^./]", Fe = process.platform === "win32", De = r(({ config: e, path: t }, l = Ke()) => {
	if ("extends" in e) throw new Error("tsconfig#extends must be resolved. Use getTsconfig or parseTsconfig to resolve it.");
	if (!path.isAbsolute(t)) throw new Error("The tsconfig path must be absolute");
	Fe && (t = L(t));
	const n = path.dirname(t), { files: s, include: i, exclude: o, compilerOptions: f } = e, u = r((d) => path.isAbsolute(d) ? d : _e(n, d), "resolvePattern"), c = s == null ? void 0 : s.map(u), w = Ce(f), p = l ? "" : "i", h = (o || en(f)).map((d) => {
		const $ = ye(u(d)).replaceAll(String.raw`\*\*/`, "(.+/)?").replaceAll(String.raw`\*`, `${K}*`).replaceAll(String.raw`\?`, K);
		return new RegExp(`^${$}($|/)`, p);
	}), D = s || i ? i : [je], T = D ? D.map((d) => {
		let v = u(d);
		tn.test(v) && (v = _e(v, je));
		const $ = ye(v).replaceAll(String.raw`/\*\*`, `(/${fe}${ae}${K}*)*?`).replaceAll(/(\/)?\\\*/g, (g, j) => {
			const y = `(${ae}|(\\.(?!min\\.js$))?)*`;
			return j ? `/${fe}${ae}${y}` : y;
		}).replaceAll(/(\/)?\\\?/g, (g, j) => {
			const y = K;
			return j ? `/${fe}${y}` : y;
		});
		return new RegExp(`^${$}$`, p);
	}) : void 0;
	return (d) => {
		if (!path.isAbsolute(d)) throw new Error("filePath must be absolute");
		if (Fe && (d = L(d)), c != null && c.includes(d)) return e;
		if (!(!w.some((v) => d.endsWith(v)) || h.some((v) => v.test(d))) && T && T.some((v) => v.test(d))) return e;
	};
}, "createFilesMatcher"), he = r((e, t, l) => {
	const n = path.resolve(e);
	let s = L(e);
	for (;;) {
		const i = O(s, t, l);
		if (!i) return;
		const o = path.resolve(i), f = ie(o, l), u = {
			path: L(o),
			config: f
		};
		if (De(u)(n)) return u;
		const w = path.dirname(i), p = path.dirname(w);
		if (p === w) return;
		s = p;
	}
}, "findConfigApplicable"), Le = r((e = process.cwd(), t = "tsconfig.json", l = /* @__PURE__ */ new Map(), n = !1) => {
	var s;
	return n ? (s = he(e, t, l)) == null ? void 0 : s.path : O(L(e), t, l);
}, "findTsconfig");
r((e = process.cwd(), t = "tsconfig.json", l = /* @__PURE__ */ new Map(), n = !1) => {
	var s;
	if (!n) {
		const i = Le(e, t, l);
		if (!i) return null;
		return {
			path: i,
			config: ie(i, l)
		};
	}
	return (s = he(e, t, l)) != null ? s : null;
}, "getTsconfig");
var ln = /\*/g;
var Ee = r((e, t) => {
	const l = e.match(ln);
	if (l && l.length > 1) throw new Error(t);
}, "assertStarCount");
var on = r((e) => {
	if (e.includes("*")) {
		const [t, l] = e.split("*");
		return {
			prefix: t,
			suffix: l
		};
	}
	return e;
}, "parsePattern");
var rn = r(({ prefix: e, suffix: t }, l) => l.startsWith(e) && l.endsWith(t), "isPatternMatch");
var un = r((e, t, l) => Object.entries(e).map(([n, s]) => (Ee(n, `Pattern '${n}' can have at most one '*' character.`), {
	pattern: on(n),
	substitutions: s.map((i) => {
		if (Ee(i, `Substitution '${i}' in pattern '${n}' can have at most one '*' character.`), !t && !C.test(i) && !path.isAbsolute(i)) throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");
		return path.resolve(l, i);
	})
})), "parsePaths");
var fn = r((e) => {
	const { compilerOptions: t } = e.config;
	if (!t) return null;
	const { baseUrl: l, paths: n } = t;
	if (!l && !n) return null;
	const s = ne in t && t[ne], i = path.resolve(path.dirname(e.path), l || s || "."), o = n ? un(n, l, i) : [];
	return (f) => {
		if (C.test(f)) return [];
		const u = [];
		for (const _ of o) {
			if (_.pattern === f) return _.substitutions.map(L);
			typeof _.pattern != "string" && u.push(_);
		}
		let c, w = -1;
		for (const _ of u) rn(_.pattern, f) && _.pattern.prefix.length > w && (w = _.pattern.prefix.length, c = _);
		if (!c) return l ? [L(path.join(i, f))] : [];
		const p = f.slice(c.pattern.prefix.length, f.length - c.pattern.suffix.length);
		return c.substitutions.map((_) => L(_.replace("*", p)));
	};
}, "createPathsMatcher");
var isObject$2 = (value) => {
	const type = typeof value;
	return value !== null && (type === "object" || type === "function");
};
var disallowedKeys = /* @__PURE__ */ new Set([
	"__proto__",
	"prototype",
	"constructor"
]);
var maxDisallowedKeyLength = Math.max(...[...disallowedKeys].map((key) => key.length));
var MAX_ARRAY_INDEX = 1e6;
var isDigit = (character) => character >= "0" && character <= "9";
function shouldCoerceToNumber(segment) {
	if (segment === "0") return true;
	if (/^[1-9]\d*$/.test(segment)) {
		const parsedNumber = Number.parseInt(segment, 10);
		return parsedNumber <= Number.MAX_SAFE_INTEGER && parsedNumber <= MAX_ARRAY_INDEX;
	}
	return false;
}
function processSegment(segment, parts) {
	if (disallowedKeys.has(segment)) return false;
	if (segment && shouldCoerceToNumber(segment)) parts.push(Number.parseInt(segment, 10));
	else parts.push(segment);
	return true;
}
function parsePath(path) {
	if (typeof path !== "string") throw new TypeError(`Expected a string, got ${typeof path}`);
	const parts = [];
	let currentSegment = "";
	let indexSegment = "";
	let hadProperty = false;
	let currentPart = "start";
	let isEscaping = false;
	let position = 0;
	for (const character of path) {
		position++;
		if (isEscaping) {
			currentSegment += character;
			isEscaping = false;
			continue;
		}
		if (character === "\\") {
			if (currentPart === "index") throw new Error(`Invalid character '${character}' in an index at position ${position}`);
			if (currentPart === "indexEnd") throw new Error(`Invalid character '${character}' after an index at position ${position}`);
			isEscaping = true;
			currentPart = currentPart === "start" ? "property" : currentPart;
			continue;
		}
		switch (character) {
			case ".":
				if (currentPart === "index") throw new Error(`Invalid character '${character}' in an index at position ${position}`);
				if (currentPart === "indexEnd") {
					currentPart = "property";
					break;
				}
				if (!processSegment(currentSegment, parts)) return [];
				currentSegment = "";
				currentPart = "property";
				break;
			case "[":
				if (currentPart === "index") throw new Error(`Invalid character '${character}' in an index at position ${position}`);
				if (currentPart === "indexEnd") {
					currentPart = "index";
					break;
				}
				if (currentPart === "property" && currentSegment.length <= maxDisallowedKeyLength && disallowedKeys.has(currentSegment)) return [];
				hadProperty = currentPart === "property";
				currentPart = "index";
				break;
			case "]": {
				if (currentPart === "indexEnd") throw new Error(`Invalid character '${character}' after an index at position ${position}`);
				if (currentPart !== "index") {
					if (currentPart === "start") currentPart = "property";
					currentSegment += character;
					break;
				}
				if (indexSegment === "") {
					currentSegment += "[]";
					currentPart = "property";
					break;
				}
				if ((currentSegment !== "" || hadProperty) && !processSegment(currentSegment, parts)) return [];
				currentSegment = "";
				hadProperty = false;
				const parsedNumber = Number.parseInt(indexSegment, 10);
				const isValidInteger = parsedNumber <= MAX_ARRAY_INDEX && indexSegment === String(parsedNumber);
				parts.push(isValidInteger ? parsedNumber : indexSegment);
				indexSegment = "";
				currentPart = "indexEnd";
				break;
			}
			default:
				if (currentPart === "index") {
					if (!isDigit(character)) throw new Error(`Invalid character '${character}' in an index at position ${position}`);
					indexSegment += character;
					break;
				}
				if (currentPart === "indexEnd") throw new Error(`Invalid character '${character}' after an index at position ${position}`);
				if (currentPart === "start") currentPart = "property";
				currentSegment += character;
		}
	}
	if (isEscaping) currentSegment += "\\";
	switch (currentPart) {
		case "property":
			if (!processSegment(currentSegment, parts)) return [];
			break;
		case "index": throw new Error("Index was not closed");
		case "start": parts.push("");
	}
	return parts;
}
function normalizePath$3(path) {
	if (typeof path === "string") return parsePath(path);
	if (Array.isArray(path)) {
		const normalized = [];
		for (const [index, segment] of path.entries()) {
			if (typeof segment !== "string" && typeof segment !== "number") throw new TypeError(`Expected a string or number for path segment at index ${index}, got ${typeof segment}`);
			if (typeof segment === "number" && !Number.isFinite(segment)) throw new TypeError(`Path segment at index ${index} must be a finite number, got ${segment}`);
			if (disallowedKeys.has(segment)) return [];
			if (typeof segment === "string" && shouldCoerceToNumber(segment)) normalized.push(Number.parseInt(segment, 10));
			else normalized.push(segment);
		}
		return normalized;
	}
	return [];
}
function getProperty(object, path, value) {
	if (!isObject$2(object) || typeof path !== "string" && !Array.isArray(path)) return value === void 0 ? object : value;
	const pathArray = normalizePath$3(path);
	if (pathArray.length === 0) return value;
	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];
		object = object[key];
		if (object === void 0 || object === null) {
			if (index !== pathArray.length - 1) return value;
			break;
		}
	}
	return object === void 0 ? value : object;
}
var pathSeparators = /* @__PURE__ */ new Set([
	"/",
	"\\",
	void 0
]);
var normalizedAliasSymbol = Symbol.for("pathe:normalizedAlias");
function normalizeAliases(_aliases) {
	if (_aliases[normalizedAliasSymbol]) return _aliases;
	const aliases = Object.fromEntries(Object.entries(_aliases).sort(([a], [b]) => _compareAliases(a, b)));
	for (const key in aliases) for (const alias in aliases) {
		if (alias === key || key.startsWith(alias)) continue;
		if (aliases[key]?.startsWith(alias) && pathSeparators.has(aliases[key][alias.length])) aliases[key] = aliases[alias] + aliases[key].slice(alias.length);
	}
	Object.defineProperty(aliases, normalizedAliasSymbol, {
		value: true,
		enumerable: false
	});
	return aliases;
}
function resolveAlias(path, aliases) {
	const _path = normalizeWindowsPath(path);
	aliases = normalizeAliases(aliases);
	for (const [alias, to] of Object.entries(aliases)) {
		if (!_path.startsWith(alias)) continue;
		if (hasTrailingSlash(_path[(hasTrailingSlash(alias) ? alias.slice(0, -1) : alias).length])) return join$2(to, _path.slice(alias.length));
	}
	return _path;
}
function _compareAliases(a, b) {
	return b.split("/").length - a.split("/").length;
}
function hasTrailingSlash(path = "/") {
	const lastChar = path[path.length - 1];
	return lastChar === "/" || lastChar === "\\";
}
function prettyPath(p, highlight = true) {
	p = relative$2(process.cwd(), p);
	return highlight ? colors.cyan(p) : p;
}
function resolveNitroPath(path, nitroOptions, base) {
	if (typeof path !== "string") throw new TypeError("Invalid path: " + path);
	path = _compilePathTemplate(path)(nitroOptions);
	path = resolveAlias(path, nitroOptions.alias);
	if (/^[#\u0000]/.test(path)) return path;
	return resolve$2(base || nitroOptions.rootDir, path);
}
function _compilePathTemplate(contents) {
	return (params) => contents.replace(/{{ ?([\w.]+) ?}}/g, (_, match) => {
		const val = getProperty(params, match);
		if (!val) consola.warn(`cannot resolve template param '${match}' in ${contents.slice(0, 20)}`);
		return val || `${match}`;
	});
}
async function writeFile$1(file, contents, log = false) {
	await mkdir(dirname$2(file), { recursive: true });
	await writeFile(file, contents, typeof contents === "string" ? "utf8" : void 0);
	if (log) consola.info("Generated", prettyPath(file));
}
async function isDirectory(path) {
	try {
		return (await stat$1(path)).isDirectory();
	} catch {
		return false;
	}
}
async function isCaseInsensitiveFS(dir) {
	await mkdir(dir, { recursive: true });
	const name = `.nitro-case-${randomBytes(6).toString("hex")}`;
	const probe = join$2(dir, name);
	await writeFile(probe, "");
	try {
		await stat$1(join$2(dir, name.toUpperCase()));
		return true;
	} catch {
		return false;
	} finally {
		await rm(probe, { force: true });
	}
}
function resolveKVMounts(options) {
	const mounts = options.dev || options.preset === "nitro-prerender" ? {
		...options.kv,
		...options.devStorage
	} : options.kv;
	return Object.entries(mounts).map(([path, { driver: name, ...driverOpts }]) => ({
		path,
		name,
		options: driverOpts
	}));
}
async function resolveKVDrivers(options) {
	const mounts = resolveKVMounts(options);
	if (mounts.length === 0) return [];
	const { builtinDrivers, builtinDriverDependencies } = await importUnstorage({
		dir: options.rootDir,
		deps: options.deps,
		reason: "the `kv` config"
	});
	return mounts.map((mount) => ({
		...mount,
		driver: builtinDrivers[mount.name] || mount.name,
		deps: Object.entries(builtinDriverDependencies[mount.name] || {}).map(([option, dep]) => ({
			option,
			...dep
		}))
	}));
}
function importUnstorage(opts) {
	return importDep({
		id: "unstorage",
		...opts
	});
}
var warned$2 = false;
async function resolveUnenv(options) {
	options.inject ??= {};
	options.polyfills ??= [];
	options.builtinModules ??= [];
	options.unenv = [options.unenv || []].flat().filter(Boolean);
	warnLegacyUnenv(options);
}
function legacyUnenvLayers(options, logger = consola) {
	warnLegacyUnenv(options, logger);
	return [options.unenv || []].flat().filter(Boolean).map((preset) => {
		const resolve = (id) => resolvePresetId(id, preset.meta?.url);
		return {
			alias: Object.fromEntries(Object.entries(preset.alias || {}).map(([from, to]) => [from, resolve(to)])),
			inject: Object.fromEntries(Object.entries(preset.inject || {}).map(([name, value]) => [name, value === false ? false : typeof value === "string" ? resolve(value) : [resolve(value[0]), value[1]]])),
			polyfills: (preset.polyfill || []).filter(Boolean).map((id) => resolve(id)),
			builtinModules: preset.external || []
		};
	});
}
function warnLegacyUnenv(options, logger = consola) {
	if (warned$2 || !options.unenv?.length) return;
	warned$2 = true;
	logger.warn(`"unenv" option is deprecated. Please use "alias", "inject", "polyfills" and "builtinModules" instead.`);
}
function resolvePresetId(id, url) {
	if (!url || id.startsWith("!")) return id;
	return resolveModulePath(id, {
		from: url,
		try: true
	}) || id;
}
var SERVICE_EXTENSIONS = [
	".ts",
	".js",
	".mts",
	".mjs",
	".tsx",
	".jsx"
];
function resolveServicesOptions(options) {
	options.services = resolveServices(options, options.services);
}
function resolveServices(options, services) {
	return Object.fromEntries(Object.entries(services || {}).map(([name, service]) => {
		if (typeof service?.entry !== "string") throw new TypeError(`Service \`${name}\` must have an \`entry\` (path to a server entry).`);
		const entry = isPath(service.entry) ? resolveServiceEntry(options, service.entry) : service.entry;
		return [name, {
			...service,
			entry
		}];
	}));
}
function resolveServiceEntry(options, entry) {
	return resolveModulePath(entry, {
		from: [options.rootDir, ...options.scanDirs],
		extensions: SERVICE_EXTENSIONS,
		suffixes: ["", "/index"],
		try: true
	}) || (entry.startsWith(".") ? resolve$2(options.rootDir, entry) : entry);
}
function isPath(entry) {
	return entry.startsWith(".") || isAbsolute$2(entry);
}
var __require = /* @__PURE__ */ createRequire$1(import.meta.url);
function cleanPath(path) {
	let normalized = normalize$1(path);
	if (normalized.length > 1 && normalized[normalized.length - 1] === sep$1) normalized = normalized.substring(0, normalized.length - 1);
	return normalized;
}
var SLASHES_REGEX = /[\\/]/g;
function convertSlashes(path, separator) {
	return path.replace(SLASHES_REGEX, separator);
}
var WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
function isRootDirectory(path) {
	return path === "/" || WINDOWS_ROOT_DIR_REGEX.test(path);
}
function normalizePath$2(path, options) {
	const { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options;
	const pathNeedsCleaning = process.platform === "win32" && path.includes("/") || path.startsWith(".");
	if (resolvePaths) path = resolve$1(path);
	if (normalizePath$1 || pathNeedsCleaning) path = cleanPath(path);
	if (path === ".") return "";
	return convertSlashes(path[path.length - 1] !== pathSeparator ? path + pathSeparator : path, pathSeparator);
}
function joinPathWithBasePath(filename, directoryPath) {
	return directoryPath + filename;
}
function joinPathWithRelativePath(root, options) {
	return function(filename, directoryPath) {
		if (directoryPath.startsWith(root)) return directoryPath.slice(root.length) + filename;
		else return convertSlashes(relative$1(root, directoryPath), options.pathSeparator) + options.pathSeparator + filename;
	};
}
function joinPath(filename) {
	return filename;
}
function joinDirectoryPath(filename, directoryPath, separator) {
	return directoryPath + filename + separator;
}
function build$7(root, options) {
	const { relativePaths, includeBasePath } = options;
	return relativePaths && root ? joinPathWithRelativePath(root, options) : includeBasePath ? joinPathWithBasePath : joinPath;
}
function pushDirectoryWithRelativePath(root) {
	return function(directoryPath, paths) {
		paths.push(directoryPath.substring(root.length) || ".");
	};
}
function pushDirectoryFilterWithRelativePath(root) {
	return function(directoryPath, paths, filters) {
		const relativePath = directoryPath.substring(root.length) || ".";
		if (filters.every((filter) => filter(relativePath, true))) paths.push(relativePath);
	};
}
var pushDirectory = (directoryPath, paths) => {
	paths.push(directoryPath || ".");
};
var pushDirectoryFilter = (directoryPath, paths, filters) => {
	const path = directoryPath || ".";
	if (filters.every((filter) => filter(path, true))) paths.push(path);
};
var empty$2 = () => {};
function build$6(root, options) {
	const { includeDirs, filters, relativePaths } = options;
	if (!includeDirs) return empty$2;
	if (relativePaths) return filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root);
	return filters && filters.length ? pushDirectoryFilter : pushDirectory;
}
var pushFileFilterAndCount = (filename, _paths, counts, filters) => {
	if (filters.every((filter) => filter(filename, false))) counts.files++;
};
var pushFileFilter = (filename, paths, _counts, filters) => {
	if (filters.every((filter) => filter(filename, false))) paths.push(filename);
};
var pushFileCount = (_filename, _paths, counts, _filters) => {
	counts.files++;
};
var pushFile = (filename, paths) => {
	paths.push(filename);
};
var empty$1 = () => {};
function build$5(options) {
	const { excludeFiles, filters, onlyCounts } = options;
	if (excludeFiles) return empty$1;
	if (filters && filters.length) return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
	else if (onlyCounts) return pushFileCount;
	else return pushFile;
}
var getArray = (paths) => {
	return paths;
};
var getArrayGroup = () => {
	return [""].slice(0, 0);
};
function build$4(options) {
	return options.group ? getArrayGroup : getArray;
}
var groupFiles = (groups, directory, files) => {
	groups.push({
		directory,
		files,
		dir: directory
	});
};
var empty = () => {};
function build$3(options) {
	return options.group ? groupFiles : empty;
}
var resolveSymlinksAsync = function(path, state, callback$1) {
	const { queue, fs, options: { suppressErrors } } = state;
	queue.enqueue();
	fs.realpath(path, (error, resolvedPath) => {
		if (error) return queue.dequeue(suppressErrors ? null : error, state);
		fs.stat(resolvedPath, (error$1, stat) => {
			if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
			if (stat.isDirectory() && isRecursive(path, resolvedPath, state)) return queue.dequeue(null, state);
			callback$1(stat, resolvedPath);
			queue.dequeue(null, state);
		});
	});
};
var resolveSymlinks = function(path, state, callback$1) {
	const { queue, fs, options: { suppressErrors } } = state;
	queue.enqueue();
	try {
		const resolvedPath = fs.realpathSync(path);
		const stat = fs.statSync(resolvedPath);
		if (stat.isDirectory() && isRecursive(path, resolvedPath, state)) return;
		callback$1(stat, resolvedPath);
	} catch (e) {
		if (!suppressErrors) throw e;
	}
};
function build$2(options, isSynchronous) {
	if (!options.resolveSymlinks || options.excludeSymlinks) return null;
	return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
}
function isRecursive(path, resolved, state) {
	if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
	let parent = dirname$1(path);
	let depth = 1;
	while (parent !== state.root && depth < 2) {
		const resolvedPath = state.symlinks.get(parent);
		if (!!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath))) depth++;
		else parent = dirname$1(parent);
	}
	state.symlinks.set(path, resolved);
	return depth > 1;
}
function isRecursiveUsingRealPaths(resolved, state) {
	return state.visited.includes(resolved + state.options.pathSeparator);
}
var onlyCountsSync = (state) => {
	return state.counts;
};
var groupsSync = (state) => {
	return state.groups;
};
var defaultSync = (state) => {
	return state.paths;
};
var limitFilesSync = (state) => {
	return state.paths.slice(0, state.options.maxFiles);
};
var onlyCountsAsync = (state, error, callback$1) => {
	report(error, callback$1, state.counts, state.options.suppressErrors);
	return null;
};
var defaultAsync = (state, error, callback$1) => {
	report(error, callback$1, state.paths, state.options.suppressErrors);
	return null;
};
var limitFilesAsync = (state, error, callback$1) => {
	report(error, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
	return null;
};
var groupsAsync = (state, error, callback$1) => {
	report(error, callback$1, state.groups, state.options.suppressErrors);
	return null;
};
function report(error, callback$1, output, suppressErrors) {
	if (error && !suppressErrors) callback$1(error, output);
	else callback$1(null, output);
}
function build$1(options, isSynchronous) {
	const { onlyCounts, group, maxFiles } = options;
	if (onlyCounts) return isSynchronous ? onlyCountsSync : onlyCountsAsync;
	else if (group) return isSynchronous ? groupsSync : groupsAsync;
	else if (maxFiles) return isSynchronous ? limitFilesSync : limitFilesAsync;
	else return isSynchronous ? defaultSync : defaultAsync;
}
var readdirOpts = { withFileTypes: true };
var walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
	state.queue.enqueue();
	if (currentDepth < 0) return state.queue.dequeue(null, state);
	const { fs } = state;
	state.visited.push(crawlPath);
	state.counts.directories++;
	fs.readdir(crawlPath || ".", readdirOpts, (error, entries = []) => {
		callback$1(entries, directoryPath, currentDepth);
		state.queue.dequeue(state.options.suppressErrors ? null : error, state);
	});
};
var walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
	const { fs } = state;
	if (currentDepth < 0) return;
	state.visited.push(crawlPath);
	state.counts.directories++;
	let entries = [];
	try {
		entries = fs.readdirSync(crawlPath || ".", readdirOpts);
	} catch (e) {
		if (!state.options.suppressErrors) throw e;
	}
	callback$1(entries, directoryPath, currentDepth);
};
function build$8(isSynchronous) {
	return isSynchronous ? walkSync : walkAsync;
}
var Queue = class {
	count = 0;
	constructor(onQueueEmpty) {
		this.onQueueEmpty = onQueueEmpty;
	}
	enqueue() {
		this.count++;
		return this.count;
	}
	dequeue(error, output) {
		if (this.onQueueEmpty && (--this.count <= 0 || error)) {
			this.onQueueEmpty(error, output);
			if (error) {
				output.controller.abort();
				this.onQueueEmpty = void 0;
			}
		}
	}
};
var Counter = class {
	_files = 0;
	_directories = 0;
	set files(num) {
		this._files = num;
	}
	get files() {
		return this._files;
	}
	set directories(num) {
		this._directories = num;
	}
	get directories() {
		return this._directories;
	}
	get dirs() {
		return this._directories;
	}
};
var Aborter = class {
	aborted = false;
	abort() {
		this.aborted = true;
	}
};
var Walker = class {
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
	constructor(root, options, callback$1) {
		this.isSynchronous = !callback$1;
		this.callbackInvoker = build$1(options, this.isSynchronous);
		this.root = normalizePath$2(root, options);
		this.state = {
			root: isRootDirectory(this.root) ? this.root : this.root.slice(0, -1),
			paths: [""].slice(0, 0),
			groups: [],
			counts: new Counter(),
			options,
			queue: new Queue((error, state) => this.callbackInvoker(state, error, callback$1)),
			symlinks: /* @__PURE__ */ new Map(),
			visited: [""].slice(0, 0),
			controller: new Aborter(),
			fs: options.fs || nativeFs
		};
		this.joinPath = build$7(this.root, options);
		this.pushDirectory = build$6(this.root, options);
		this.pushFile = build$5(options);
		this.getArray = build$4(options);
		this.groupFiles = build$3(options);
		this.resolveSymlink = build$2(options, this.isSynchronous);
		this.walkDirectory = build$8(this.isSynchronous);
	}
	start() {
		this.pushDirectory(this.root, this.state.paths, this.state.options.filters);
		this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
		return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
	}
	walk = (entries, directoryPath, depth) => {
		const { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator }, controller } = this.state;
		if (controller.aborted || signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
		const files = this.getArray(this.state.paths);
		for (let i = 0; i < entries.length; ++i) {
			const entry = entries[i];
			if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
				const filename = this.joinPath(entry.name, directoryPath);
				this.pushFile(filename, files, this.state.counts, filters);
			} else if (entry.isDirectory()) {
				let path = joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
				if (exclude && exclude(entry.name, path)) continue;
				this.pushDirectory(path, paths, filters);
				this.walkDirectory(this.state, path, path, depth - 1, this.walk);
			} else if (this.resolveSymlink && entry.isSymbolicLink()) {
				let path = joinPathWithBasePath(entry.name, directoryPath);
				this.resolveSymlink(path, this.state, (stat, resolvedPath) => {
					if (stat.isDirectory()) {
						resolvedPath = normalizePath$2(resolvedPath, this.state.options);
						if (exclude && exclude(entry.name, useRealPaths ? resolvedPath : path + pathSeparator)) return;
						this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path + pathSeparator, depth - 1, this.walk);
					} else {
						resolvedPath = useRealPaths ? resolvedPath : path;
						const filename = basename$1(resolvedPath);
						const directoryPath$1 = normalizePath$2(dirname$1(resolvedPath), this.state.options);
						resolvedPath = this.joinPath(filename, directoryPath$1);
						this.pushFile(resolvedPath, files, this.state.counts, filters);
					}
				});
			}
		}
		this.groupFiles(this.state.groups, directoryPath, files);
	};
};
function promise(root, options) {
	return new Promise((resolve$1, reject) => {
		callback(root, options, (err, output) => {
			if (err) return reject(err);
			resolve$1(output);
		});
	});
}
function callback(root, options, callback$1) {
	new Walker(root, options, callback$1).start();
}
function sync(root, options) {
	return new Walker(root, options).start();
}
var APIBuilder = class {
	constructor(root, options) {
		this.root = root;
		this.options = options;
	}
	withPromise() {
		return promise(this.root, this.options);
	}
	withCallback(cb) {
		callback(this.root, this.options, cb);
	}
	sync() {
		return sync(this.root, this.options);
	}
};
var pm$1 = null;
try {
	__require.resolve("picomatch");
	pm$1 = __require("picomatch");
} catch {}
var Builder = class {
	globCache = {};
	options = {
		maxDepth: Infinity,
		suppressErrors: true,
		pathSeparator: sep$1,
		filters: []
	};
	globFunction;
	constructor(options) {
		this.options = {
			...this.options,
			...options
		};
		this.globFunction = this.options.globFunction;
	}
	group() {
		this.options.group = true;
		return this;
	}
	withPathSeparator(separator) {
		this.options.pathSeparator = separator;
		return this;
	}
	withBasePath() {
		this.options.includeBasePath = true;
		return this;
	}
	withRelativePaths() {
		this.options.relativePaths = true;
		return this;
	}
	withDirs() {
		this.options.includeDirs = true;
		return this;
	}
	withMaxDepth(depth) {
		this.options.maxDepth = depth;
		return this;
	}
	withMaxFiles(limit) {
		this.options.maxFiles = limit;
		return this;
	}
	withFullPaths() {
		this.options.resolvePaths = true;
		this.options.includeBasePath = true;
		return this;
	}
	withErrors() {
		this.options.suppressErrors = false;
		return this;
	}
	withSymlinks({ resolvePaths = true } = {}) {
		this.options.resolveSymlinks = true;
		this.options.useRealPaths = resolvePaths;
		return this.withFullPaths();
	}
	withAbortSignal(signal) {
		this.options.signal = signal;
		return this;
	}
	normalize() {
		this.options.normalizePath = true;
		return this;
	}
	filter(predicate) {
		this.options.filters.push(predicate);
		return this;
	}
	onlyDirs() {
		this.options.excludeFiles = true;
		this.options.includeDirs = true;
		return this;
	}
	exclude(predicate) {
		this.options.exclude = predicate;
		return this;
	}
	onlyCounts() {
		this.options.onlyCounts = true;
		return this;
	}
	crawl(root) {
		return new APIBuilder(root || ".", this.options);
	}
	withGlobFunction(fn) {
		this.globFunction = fn;
		return this;
	}
	crawlWithOptions(root, options) {
		this.options = {
			...this.options,
			...options
		};
		return new APIBuilder(root || ".", this.options);
	}
	glob(...patterns) {
		if (this.globFunction) return this.globWithOptions(patterns);
		return this.globWithOptions(patterns, ...[{ dot: true }]);
	}
	globWithOptions(patterns, ...options) {
		const globFn = this.globFunction || pm$1;
		if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
		var isMatch = this.globCache[patterns.join("\0")];
		if (!isMatch) {
			isMatch = globFn(patterns, ...options);
			this.globCache[patterns.join("\0")] = isMatch;
		}
		this.options.filters.push((path) => isMatch(path));
		return this;
	}
};
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const WIN_SLASH = "\\\\/";
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
	const DEFAULT_MAX_EXTGLOB_RECURSION = 0;
	const DOT_LITERAL = "\\.";
	const PLUS_LITERAL = "\\+";
	const QMARK_LITERAL = "\\?";
	const SLASH_LITERAL = "\\/";
	const ONE_CHAR = "(?=.)";
	const QMARK = "[^/]";
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const POSIX_CHARS = {
		DOT_LITERAL,
		PLUS_LITERAL,
		QMARK_LITERAL,
		SLASH_LITERAL,
		ONE_CHAR,
		QMARK,
		END_ANCHOR,
		DOTS_SLASH,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!${START_ANCHOR}${DOTS_SLASH})`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`,
		NO_DOTS_SLASH: `(?!${DOTS_SLASH})`,
		QMARK_NO_DOT: `[^.${SLASH_LITERAL}]`,
		STAR: `${QMARK}*?`,
		START_ANCHOR,
		SEP: "/"
	};
	const WINDOWS_CHARS = {
		...POSIX_CHARS,
		SLASH_LITERAL: `[${WIN_SLASH}]`,
		QMARK: WIN_NO_SLASH,
		STAR: `${WIN_NO_SLASH}*?`,
		DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
		NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
		START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
		END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
		SEP: "\\"
	};
	module.exports = {
		DEFAULT_MAX_EXTGLOB_RECURSION,
		MAX_LENGTH: 65536,
		POSIX_REGEX_SOURCE: {
			__proto__: null,
			alnum: "a-zA-Z0-9",
			alpha: "a-zA-Z",
			ascii: "\\x00-\\x7F",
			blank: " \\t",
			cntrl: "\\x00-\\x1F\\x7F",
			digit: "0-9",
			graph: "\\x21-\\x7E",
			lower: "a-z",
			print: "\\x20-\\x7E ",
			punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
			space: " \\t\\r\\n\\v\\f",
			upper: "A-Z",
			word: "A-Za-z0-9_",
			xdigit: "A-Fa-f0-9"
		},
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			__proto__: null,
			"***": "*",
			"**/**": "**",
			"**/**/**": "**"
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
		extglobChars(chars) {
			return {
				"!": {
					type: "negate",
					open: "(?:(?!(?:",
					close: `))${chars.STAR})`
				},
				"?": {
					type: "qmark",
					open: "(?:",
					close: ")?"
				},
				"+": {
					type: "plus",
					open: "(?:",
					close: ")+"
				},
				"*": {
					type: "star",
					open: "(?:",
					close: ")*"
				},
				"@": {
					type: "at",
					open: "(?:",
					close: ")"
				}
			};
		},
		globChars(win32) {
			return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
		}
	};
}));
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL } = require_constants();
	exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
	exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
	exports.isWindows = () => {
		if (typeof navigator !== "undefined" && navigator.platform) {
			const platform = navigator.platform.toLowerCase();
			return platform === "win32" || platform === "windows";
		}
		if (typeof process !== "undefined" && process.platform) return process.platform === "win32";
		return false;
	};
	exports.removeBackslashes = (str) => {
		return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
			return match === "\\" ? "" : match;
		});
	};
	exports.escapeLast = (input, char, lastIdx) => {
		const idx = input.lastIndexOf(char, lastIdx);
		if (idx === -1) return input;
		if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
		return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};
	exports.removePrefix = (input, state = {}) => {
		let output = input;
		if (output.startsWith("./")) {
			output = output.slice(2);
			state.prefix = "./";
		}
		return output;
	};
	exports.wrapOutput = (input, state = {}, options = {}) => {
		let output = `${options.contains ? "" : "^"}(?:${input})${options.contains ? "" : "$"}`;
		if (state.negated === true) output = `(?:^(?!${output}).*$)`;
		return output;
	};
	exports.basename = (path, { windows } = {}) => {
		const segs = path.split(windows ? /[\\/]/ : "/");
		const last = segs[segs.length - 1];
		if (last === "") return segs[segs.length - 2];
		return last;
	};
}));
var require_scan = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const utils = require_utils();
	const { CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET } = require_constants();
	const isPathSeparator = (code) => {
		return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};
	const depth = (token) => {
		if (token.isPrefix !== true) token.depth = token.isGlobstar ? Infinity : 1;
	};
	const scan = (input, options) => {
		const opts = options || {};
		const length = input.length - 1;
		const scanToEnd = opts.parts === true || opts.tokens === true || opts.scanToEnd === true;
		const slashes = [];
		const tokens = [];
		const parts = [];
		let str = input;
		let index = -1;
		let start = 0;
		let lastIndex = 0;
		let isBrace = false;
		let isBracket = false;
		let isGlob = false;
		let isExtglob = false;
		let isGlobstar = false;
		let braceEscaped = false;
		let backslashes = false;
		let negated = false;
		let negatedExtglob = false;
		let finished = false;
		let braces = 0;
		let prev;
		let code;
		let token = {
			value: "",
			depth: 0,
			isGlob: false
		};
		const eos = () => index >= length;
		const peek = () => str.charCodeAt(index + 1);
		const advance = () => {
			prev = code;
			return str.charCodeAt(++index);
		};
		while (index < length) {
			code = advance();
			let next;
			if (code === CHAR_BACKWARD_SLASH) {
				backslashes = token.backslashes = true;
				code = advance();
				if (code === CHAR_LEFT_CURLY_BRACE) braceEscaped = true;
				continue;
			}
			if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
				braces++;
				while (eos() !== true && (code = advance())) {
					if (code === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (code === CHAR_LEFT_CURLY_BRACE) {
						braces++;
						continue;
					}
					if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (braceEscaped !== true && code === CHAR_COMMA) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (code === CHAR_RIGHT_CURLY_BRACE) {
						braces--;
						if (braces === 0) {
							braceEscaped = false;
							isBrace = token.isBrace = true;
							finished = true;
							break;
						}
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_FORWARD_SLASH) {
				slashes.push(index);
				tokens.push(token);
				token = {
					value: "",
					depth: 0,
					isGlob: false
				};
				if (finished === true) continue;
				if (prev === CHAR_DOT && index === start + 1) {
					start += 2;
					continue;
				}
				lastIndex = index + 1;
				continue;
			}
			if (opts.noext !== true) {
				if ((code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) === true && peek() === CHAR_LEFT_PARENTHESES) {
					isGlob = token.isGlob = true;
					isExtglob = token.isExtglob = true;
					finished = true;
					if (code === CHAR_EXCLAMATION_MARK && index === start) negatedExtglob = true;
					if (scanToEnd === true) {
						let parens = 0;
						while (eos() !== true && (code = advance())) {
							if (code === CHAR_BACKWARD_SLASH) {
								backslashes = token.backslashes = true;
								advance();
								continue;
							}
							if (code === CHAR_LEFT_PARENTHESES) {
								parens++;
								continue;
							}
							if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
								finished = true;
								break;
							}
						}
						continue;
					}
					break;
				}
			}
			if (code === CHAR_ASTERISK) {
				if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_QUESTION_MARK) {
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_LEFT_SQUARE_BRACKET) {
				while (eos() !== true && (next = advance())) {
					if (next === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						isBracket = token.isBracket = true;
						isGlob = token.isGlob = true;
						finished = true;
						break;
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
				negated = token.negated = true;
				start++;
				continue;
			}
			if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
				isGlob = token.isGlob = true;
				if (scanToEnd === true) {
					let parens = 1;
					while (eos() !== true && (code = advance())) {
						if (code === CHAR_BACKWARD_SLASH) {
							backslashes = token.backslashes = true;
							advance();
							continue;
						}
						if (code === CHAR_LEFT_PARENTHESES) {
							parens++;
							continue;
						}
						if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
							finished = true;
							break;
						}
					}
					continue;
				}
				break;
			}
			if (isGlob === true) {
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
		}
		if (opts.noext === true) {
			isExtglob = false;
			isGlob = false;
		}
		let base = str;
		let prefix = "";
		let glob = "";
		if (start > 0) {
			prefix = str.slice(0, start);
			str = str.slice(start);
			lastIndex -= start;
		}
		if (base && isGlob === true && lastIndex > 0) {
			base = str.slice(0, lastIndex);
			glob = str.slice(lastIndex);
		} else if (isGlob === true) {
			base = "";
			glob = str;
		} else base = str;
		if (base && base !== "" && base !== "/" && base !== str) {
			if (isPathSeparator(base.charCodeAt(base.length - 1))) base = base.slice(0, -1);
		}
		if (opts.unescape === true) {
			if (glob) glob = utils.removeBackslashes(glob);
			if (base && backslashes === true) base = utils.removeBackslashes(base);
		}
		const state = {
			prefix,
			input,
			start,
			base,
			glob,
			isBrace,
			isBracket,
			isGlob,
			isExtglob,
			isGlobstar,
			negated,
			negatedExtglob
		};
		if (opts.tokens === true) {
			state.maxDepth = 0;
			if (!isPathSeparator(code)) tokens.push(token);
			state.tokens = tokens;
		}
		if (opts.parts === true || opts.tokens === true) {
			let prevIndex;
			for (let idx = 0; idx < slashes.length; idx++) {
				const n = prevIndex !== void 0 ? prevIndex + 1 : start;
				const i = slashes[idx];
				const value = input.slice(n, i);
				if (opts.tokens) {
					if (idx === 0 && start !== 0) {
						tokens[idx].isPrefix = true;
						tokens[idx].value = prefix;
					} else tokens[idx].value = value;
					depth(tokens[idx]);
					state.maxDepth += tokens[idx].depth;
				}
				if (i >= start) {
					parts.push(value);
					prevIndex = i;
				}
			}
			const n = prevIndex !== void 0 ? prevIndex + 1 : start;
			const value = input.slice(n);
			parts.push(value);
			if (opts.tokens && prevIndex && prevIndex + 1 < input.length) {
				tokens[tokens.length - 1].value = value;
				depth(tokens[tokens.length - 1]);
				state.maxDepth += tokens[tokens.length - 1].depth;
			}
			state.slashes = slashes;
			state.parts = parts;
		}
		return state;
	};
	module.exports = scan;
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const constants = require_constants();
	const utils = require_utils();
	const { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants;
	const expandRange = (args, options) => {
		if (typeof options.expandRange === "function") return options.expandRange(...args, options);
		args.sort();
		const value = `[${args.join("-")}]`;
		try {
			new RegExp(value);
		} catch (ex) {
			return args.map((v) => utils.escapeRegex(v)).join("..");
		}
		return value;
	};
	const syntaxError = (type, char) => {
		return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};
	const splitTopLevel = (input) => {
		const parts = [];
		let bracket = 0;
		let paren = 0;
		let quote = 0;
		let value = "";
		let escaped = false;
		for (const ch of input) {
			if (escaped === true) {
				value += ch;
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				value += ch;
				escaped = true;
				continue;
			}
			if (ch === "\"") {
				quote = quote === 1 ? 0 : 1;
				value += ch;
				continue;
			}
			if (quote === 0) {
				if (ch === "[") bracket++;
				else if (ch === "]" && bracket > 0) bracket--;
				else if (bracket === 0) {
					if (ch === "(") paren++;
					else if (ch === ")" && paren > 0) paren--;
					else if (ch === "|" && paren === 0) {
						parts.push(value);
						value = "";
						continue;
					}
				}
			}
			value += ch;
		}
		parts.push(value);
		return parts;
	};
	const isPlainBranch = (branch) => {
		let escaped = false;
		for (const ch of branch) {
			if (escaped === true) {
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				escaped = true;
				continue;
			}
			if (/[?*+@!()[\]{}]/.test(ch)) return false;
		}
		return true;
	};
	const normalizeSimpleBranch = (branch) => {
		let value = branch.trim();
		let changed = true;
		while (changed === true) {
			changed = false;
			if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
				value = value.slice(2, -1);
				changed = true;
			}
		}
		if (!isPlainBranch(value)) return;
		return value.replace(/\\(.)/g, "$1");
	};
	const hasRepeatedCharPrefixOverlap = (branches) => {
		const values = branches.map(normalizeSimpleBranch).filter(Boolean);
		for (let i = 0; i < values.length; i++) for (let j = i + 1; j < values.length; j++) {
			const a = values[i];
			const b = values[j];
			const char = a[0];
			if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) continue;
			if (a === b || a.startsWith(b) || b.startsWith(a)) return true;
		}
		return false;
	};
	const parseRepeatedExtglob = (pattern, requireEnd = true) => {
		if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") return;
		let bracket = 0;
		let paren = 0;
		let quote = 0;
		let escaped = false;
		for (let i = 1; i < pattern.length; i++) {
			const ch = pattern[i];
			if (escaped === true) {
				escaped = false;
				continue;
			}
			if (ch === "\\") {
				escaped = true;
				continue;
			}
			if (ch === "\"") {
				quote = quote === 1 ? 0 : 1;
				continue;
			}
			if (quote === 1) continue;
			if (ch === "[") {
				bracket++;
				continue;
			}
			if (ch === "]" && bracket > 0) {
				bracket--;
				continue;
			}
			if (bracket > 0) continue;
			if (ch === "(") {
				paren++;
				continue;
			}
			if (ch === ")") {
				paren--;
				if (paren === 0) {
					if (requireEnd === true && i !== pattern.length - 1) return;
					return {
						type: pattern[0],
						body: pattern.slice(2, i),
						end: i
					};
				}
			}
		}
	};
	const buildCharClassStar = (chars) => {
		return `${chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`}*`;
	};
	const getStarExtglobSequenceChars = (pattern) => {
		let index = 0;
		const chars = [];
		while (index < pattern.length) {
			const match = parseRepeatedExtglob(pattern.slice(index), false);
			if (!match || match.type !== "*") return;
			const branches = splitTopLevel(match.body).map((branch) => branch.trim());
			if (branches.length !== 1) return;
			const branch = normalizeSimpleBranch(branches[0]);
			if (!branch || branch.length !== 1) return;
			chars.push(branch);
			index += match.end + 1;
		}
		if (chars.length < 1) return;
		return chars;
	};
	const repeatedExtglobRecursion = (pattern) => {
		let depth = 0;
		let value = pattern.trim();
		let match = parseRepeatedExtglob(value);
		while (match) {
			depth++;
			value = match.body.trim();
			match = parseRepeatedExtglob(value);
		}
		return depth;
	};
	const analyzeRepeatedExtglob = (body, options) => {
		if (options.maxExtglobRecursion === false) return { risky: false };
		const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
		const branches = splitTopLevel(body).map((branch) => branch.trim());
		if (branches.length > 1) {
			if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) return { risky: true };
		}
		const safeChars = [];
		let sawStarSequence = false;
		let combinable = true;
		for (const branch of branches) {
			const chars = getStarExtglobSequenceChars(branch);
			if (chars) {
				sawStarSequence = true;
				safeChars.push(...chars);
				continue;
			}
			const literal = normalizeSimpleBranch(branch);
			if (literal && literal.length === 1) {
				safeChars.push(literal);
				continue;
			}
			combinable = false;
			if (repeatedExtglobRecursion(branch) > max) return { risky: true };
		}
		if (sawStarSequence) return combinable ? {
			risky: true,
			safeOutput: buildCharClassStar([...new Set(safeChars)])
		} : { risky: true };
		return { risky: false };
	};
	const parse = (input, options) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		input = REPLACEMENTS[input] || input;
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		let len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		const bos = {
			type: "bos",
			value: "",
			output: opts.prepend || ""
		};
		const tokens = [bos];
		const capture = opts.capture ? "" : "?:";
		const PLATFORM_CHARS = constants.globChars(opts.windows);
		const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
		const { DOT_LITERAL, PLUS_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK, QMARK_NO_DOT, STAR, START_ANCHOR } = PLATFORM_CHARS;
		const globstar = (opts) => {
			return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
		};
		const nodot = opts.dot ? "" : NO_DOT;
		const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
		let star = opts.bash === true ? globstar(opts) : STAR;
		if (opts.capture) star = `(${star})`;
		if (typeof opts.noext === "boolean") opts.noextglob = opts.noext;
		const state = {
			input,
			index: -1,
			start: 0,
			dot: opts.dot === true,
			consumed: "",
			output: "",
			prefix: "",
			backtrack: false,
			negated: false,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: false,
			tokens
		};
		input = utils.removePrefix(input, state);
		len = input.length;
		const extglobs = [];
		const braces = [];
		const stack = [];
		let prev = bos;
		let value;
		const eos = () => state.index === len - 1;
		const peek = state.peek = (n = 1) => input[state.index + n];
		const advance = state.advance = () => input[++state.index] || "";
		const remaining = () => input.slice(state.index + 1);
		const consume = (value = "", num = 0) => {
			state.consumed += value;
			state.index += num;
		};
		const append = (token) => {
			state.output += token.output != null ? token.output : token.value;
			consume(token.value);
		};
		const negate = () => {
			let count = 1;
			while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
				advance();
				state.start++;
				count++;
			}
			if (count % 2 === 0) return false;
			state.negated = true;
			state.start++;
			return true;
		};
		const increment = (type) => {
			state[type]++;
			stack.push(type);
		};
		const decrement = (type) => {
			state[type]--;
			stack.pop();
		};
		const push = (tok) => {
			if (prev.type === "globstar") {
				const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
				const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
				if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
					state.output = state.output.slice(0, -prev.output.length);
					prev.type = "star";
					prev.value = "*";
					prev.output = star;
					state.output += prev.output;
				}
			}
			if (extglobs.length && tok.type !== "paren") extglobs[extglobs.length - 1].inner += tok.value;
			if (tok.value || tok.output) append(tok);
			if (prev && prev.type === "text" && tok.type === "text") {
				prev.output = (prev.output || prev.value) + tok.value;
				prev.value += tok.value;
				return;
			}
			tok.prev = prev;
			tokens.push(tok);
			prev = tok;
		};
		const extglobOpen = (type, value) => {
			const token = {
				...EXTGLOB_CHARS[value],
				conditions: 1,
				inner: ""
			};
			token.prev = prev;
			token.parens = state.parens;
			token.output = state.output;
			token.startIndex = state.index;
			token.tokensIndex = tokens.length;
			const output = (opts.capture ? "(" : "") + token.open;
			increment("parens");
			push({
				type,
				value,
				output: state.output ? "" : ONE_CHAR
			});
			push({
				type: "paren",
				extglob: true,
				value: advance(),
				output
			});
			extglobs.push(token);
		};
		const extglobClose = (token) => {
			const literal = input.slice(token.startIndex, state.index + 1);
			const body = input.slice(token.startIndex + 2, state.index);
			const analysis = analyzeRepeatedExtglob(body, opts);
			if ((token.type === "plus" || token.type === "star") && analysis.risky) {
				const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
				const open = tokens[token.tokensIndex];
				open.type = "text";
				open.value = literal;
				open.output = safeOutput || utils.escapeRegex(literal);
				for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
					tokens[i].value = "";
					tokens[i].output = "";
					delete tokens[i].suffix;
				}
				state.output = token.output + open.output;
				state.backtrack = true;
				push({
					type: "paren",
					extglob: true,
					value,
					output: ""
				});
				decrement("parens");
				return;
			}
			let output = token.close + (opts.capture ? ")" : "");
			let rest;
			if (token.type === "negate") {
				let extglobStar = star;
				if (token.inner && token.inner.length > 1 && token.inner.includes("/")) extglobStar = globstar(opts);
				if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) output = token.close = `)$))${extglobStar}`;
				if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) output = token.close = `)${parse(rest, {
					...options,
					fastpaths: false
				}).output})${extglobStar})`;
				if (token.prev.type === "bos") state.negatedExtglob = true;
			}
			push({
				type: "paren",
				extglob: true,
				value,
				output
			});
			decrement("parens");
		};
		if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
			let backslashes = false;
			let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
				if (first === "\\") {
					backslashes = true;
					return m;
				}
				if (first === "?") {
					if (esc) return esc + first + (rest ? QMARK.repeat(rest.length) : "");
					if (index === 0) return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
					return QMARK.repeat(chars.length);
				}
				if (first === ".") return DOT_LITERAL.repeat(chars.length);
				if (first === "*") {
					if (esc) return esc + first + (rest ? star : "");
					return star;
				}
				return esc ? m : `\\${m}`;
			});
			if (backslashes === true) {
				if (opts.unescape === true) output = output.replace(/\\/g, "");
				else output = output.replace(/\\+/g, (m) => {
					return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
				});
			}
			if (output === input && opts.contains === true) {
				state.output = input;
				return state;
			}
			state.output = utils.wrapOutput(output, state, options);
			return state;
		}
		while (!eos()) {
			value = advance();
			if (value === "\0") continue;
			if (value === "\\") {
				const next = peek();
				if (next === "/" && opts.bash !== true) continue;
				if (next === "." || next === ";") continue;
				if (!next) {
					value += "\\";
					push({
						type: "text",
						value
					});
					continue;
				}
				const match = /^\\+/.exec(remaining());
				let slashes = 0;
				if (match && match[0].length > 2) {
					slashes = match[0].length;
					state.index += slashes;
					if (slashes % 2 !== 0) value += "\\";
				}
				if (opts.unescape === true) value = advance();
				else value += advance();
				if (state.brackets === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
			}
			if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
				if (opts.posix !== false && value === ":") {
					const inner = prev.value.slice(1);
					if (inner.includes("[")) {
						prev.posix = true;
						if (inner.includes(":")) {
							const idx = prev.value.lastIndexOf("[");
							const pre = prev.value.slice(0, idx);
							const rest = prev.value.slice(idx + 2);
							const posix = POSIX_REGEX_SOURCE[rest];
							if (posix) {
								prev.value = pre + posix;
								state.backtrack = true;
								advance();
								if (!bos.output && tokens.indexOf(prev) === 1) bos.output = ONE_CHAR;
								continue;
							}
						}
					}
				}
				if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") value = `\\${value}`;
				if (value === "]" && (prev.value === "[" || prev.value === "[^")) value = `\\${value}`;
				if (opts.posix === true && value === "!" && prev.value === "[") value = "^";
				prev.value += value;
				append({ value });
				continue;
			}
			if (state.quotes === 1 && value !== "\"") {
				value = utils.escapeRegex(value);
				prev.value += value;
				append({ value });
				continue;
			}
			if (value === "\"") {
				state.quotes = state.quotes === 1 ? 0 : 1;
				if (opts.keepQuotes === true) push({
					type: "text",
					value
				});
				continue;
			}
			if (value === "(") {
				increment("parens");
				push({
					type: "paren",
					value
				});
				continue;
			}
			if (value === ")") {
				if (state.parens === 0 && opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "("));
				const extglob = extglobs[extglobs.length - 1];
				if (extglob && state.parens === extglob.parens + 1) {
					extglobClose(extglobs.pop());
					continue;
				}
				push({
					type: "paren",
					value,
					output: state.parens ? ")" : "\\)"
				});
				decrement("parens");
				continue;
			}
			if (value === "[") {
				if (opts.nobracket === true || !remaining().includes("]")) {
					if (opts.nobracket !== true && opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
					value = `\\${value}`;
				} else increment("brackets");
				push({
					type: "bracket",
					value
				});
				continue;
			}
			if (value === "]") {
				if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				if (state.brackets === 0) {
					if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "["));
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				decrement("brackets");
				const prevValue = prev.value.slice(1);
				if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) value = `/${value}`;
				prev.value += value;
				append({ value });
				if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) continue;
				const escaped = utils.escapeRegex(prev.value);
				state.output = state.output.slice(0, -prev.value.length);
				if (opts.literalBrackets === true) {
					state.output += escaped;
					prev.value = escaped;
					continue;
				}
				prev.value = `(${capture}${escaped}|${prev.value})`;
				state.output += prev.value;
				continue;
			}
			if (value === "{" && opts.nobrace !== true) {
				increment("braces");
				const open = {
					type: "brace",
					value,
					output: "(",
					outputIndex: state.output.length,
					tokensIndex: state.tokens.length
				};
				braces.push(open);
				push(open);
				continue;
			}
			if (value === "}") {
				const brace = braces[braces.length - 1];
				if (opts.nobrace === true || !brace) {
					push({
						type: "text",
						value,
						output: value
					});
					continue;
				}
				let output = ")";
				if (brace.dots === true) {
					const arr = tokens.slice();
					const range = [];
					for (let i = arr.length - 1; i >= 0; i--) {
						tokens.pop();
						if (arr[i].type === "brace") break;
						if (arr[i].type !== "dots") range.unshift(arr[i].value);
					}
					output = expandRange(range, opts);
					state.backtrack = true;
				}
				if (brace.comma !== true && brace.dots !== true) {
					const out = state.output.slice(0, brace.outputIndex);
					const toks = state.tokens.slice(brace.tokensIndex);
					brace.value = brace.output = "\\{";
					value = output = "\\}";
					state.output = out;
					for (const t of toks) state.output += t.output || t.value;
				}
				push({
					type: "brace",
					value,
					output
				});
				decrement("braces");
				braces.pop();
				continue;
			}
			if (value === "|") {
				if (extglobs.length > 0) extglobs[extglobs.length - 1].conditions++;
				push({
					type: "text",
					value
				});
				continue;
			}
			if (value === ",") {
				let output = value;
				const brace = braces[braces.length - 1];
				if (brace && stack[stack.length - 1] === "braces") {
					brace.comma = true;
					output = "|";
				}
				push({
					type: "comma",
					value,
					output
				});
				continue;
			}
			if (value === "/") {
				if (prev.type === "dot" && state.index === state.start + 1) {
					state.start = state.index + 1;
					state.consumed = "";
					state.output = "";
					tokens.pop();
					prev = bos;
					continue;
				}
				push({
					type: "slash",
					value,
					output: SLASH_LITERAL
				});
				continue;
			}
			if (value === ".") {
				if (state.braces > 0 && prev.type === "dot") {
					if (prev.value === ".") prev.output = DOT_LITERAL;
					const brace = braces[braces.length - 1];
					prev.type = "dots";
					prev.output += value;
					prev.value += value;
					brace.dots = true;
					continue;
				}
				if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
					push({
						type: "text",
						value,
						output: DOT_LITERAL
					});
					continue;
				}
				push({
					type: "dot",
					value,
					output: DOT_LITERAL
				});
				continue;
			}
			if (value === "?") {
				if (!(prev && prev.value === "(") && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("qmark", value);
					continue;
				}
				if (prev && prev.type === "paren") {
					const next = peek();
					let output = value;
					if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) output = `\\${value}`;
					push({
						type: "text",
						value,
						output
					});
					continue;
				}
				if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
					push({
						type: "qmark",
						value,
						output: QMARK_NO_DOT
					});
					continue;
				}
				push({
					type: "qmark",
					value,
					output: QMARK
				});
				continue;
			}
			if (value === "!") {
				if (opts.noextglob !== true && peek() === "(") {
					if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
						extglobOpen("negate", value);
						continue;
					}
				}
				if (opts.nonegate !== true && state.index === 0) {
					negate();
					continue;
				}
			}
			if (value === "+") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("plus", value);
					continue;
				}
				if (prev && prev.value === "(" || opts.regex === false) {
					push({
						type: "plus",
						value,
						output: PLUS_LITERAL
					});
					continue;
				}
				if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
					push({
						type: "plus",
						value
					});
					continue;
				}
				push({
					type: "plus",
					value: PLUS_LITERAL
				});
				continue;
			}
			if (value === "@") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					push({
						type: "at",
						extglob: true,
						value,
						output: ""
					});
					continue;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			if (value !== "*") {
				if (value === "$" || value === "^") value = `\\${value}`;
				const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
				if (match) {
					value += match[0];
					state.index += match[0].length;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			if (prev && (prev.type === "globstar" || prev.star === true)) {
				prev.type = "star";
				prev.star = true;
				prev.value += value;
				prev.output = star;
				state.backtrack = true;
				state.globstar = true;
				consume(value);
				continue;
			}
			let rest = remaining();
			if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
				extglobOpen("star", value);
				continue;
			}
			if (prev.type === "star") {
				if (opts.noglobstar === true) {
					consume(value);
					continue;
				}
				const prior = prev.prev;
				const before = prior.prev;
				const isStart = prior.type === "slash" || prior.type === "bos";
				const afterStar = before && (before.type === "star" || before.type === "globstar");
				if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
				const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
				if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				while (rest.slice(0, 3) === "/**") {
					const after = input[state.index + 4];
					if (after && after !== "/") break;
					rest = rest.slice(3);
					consume("/**", 3);
				}
				const isEnd = eos() || state.parens > 0 && rest === ")".repeat(state.parens) && !extglobs.some((extglob) => extglob.type === "negate");
				if (prior.type === "bos" && eos()) {
					prev.type = "globstar";
					prev.value += value;
					prev.output = globstar(opts);
					state.output = prev.output;
					state.globstar = true;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && isEnd) {
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
					prev.value += value;
					state.globstar = true;
					state.output += prior.output + prev.output;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
					const end = rest[1] !== void 0 ? "|$" : "";
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
					prev.value += value;
					state.output += prior.output + prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				if (prior.type === "bos" && rest[0] === "/") {
					prev.type = "globstar";
					prev.value += value;
					prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
					state.output = prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				state.output = state.output.slice(0, -prev.output.length);
				prev.type = "globstar";
				prev.output = globstar(opts);
				prev.value += value;
				state.output += prev.output;
				state.globstar = true;
				consume(value);
				continue;
			}
			const token = {
				type: "star",
				value,
				output: star
			};
			if (opts.bash === true) {
				token.output = ".*?";
				if (prev.type === "bos" || prev.type === "slash") token.output = nodot + token.output;
				push(token);
				continue;
			}
			if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
				token.output = value;
				push(token);
				continue;
			}
			if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
				if (prev.type === "dot") {
					state.output += NO_DOT_SLASH;
					prev.output += NO_DOT_SLASH;
				} else if (opts.dot === true) {
					state.output += NO_DOTS_SLASH;
					prev.output += NO_DOTS_SLASH;
				} else {
					state.output += nodot;
					prev.output += nodot;
				}
				if (peek() !== "*") {
					state.output += ONE_CHAR;
					prev.output += ONE_CHAR;
				}
			}
			push(token);
		}
		while (state.brackets > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
			state.output = utils.escapeLast(state.output, "[");
			decrement("brackets");
		}
		while (state.parens > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
			state.output = utils.escapeLast(state.output, "(");
			decrement("parens");
		}
		while (state.braces > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
			state.output = utils.escapeLast(state.output, "{");
			decrement("braces");
		}
		if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) push({
			type: "maybe_slash",
			value: "",
			output: `${SLASH_LITERAL}?`
		});
		if (state.backtrack === true) {
			state.output = "";
			for (const token of state.tokens) {
				state.output += token.output != null ? token.output : token.value;
				if (token.suffix) state.output += token.suffix;
			}
		}
		return state;
	};
	parse.fastpaths = (input, options) => {
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		const len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		input = REPLACEMENTS[input] || input;
		const { DOT_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOTS, NO_DOTS_SLASH, STAR, START_ANCHOR } = constants.globChars(opts.windows);
		const nodot = opts.dot ? NO_DOTS : NO_DOT;
		const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
		const capture = opts.capture ? "" : "?:";
		const state = {
			negated: false,
			prefix: ""
		};
		let star = opts.bash === true ? ".*?" : STAR;
		if (opts.capture) star = `(${star})`;
		const globstar = (opts) => {
			if (opts.noglobstar === true) return star;
			return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
		};
		const create = (str) => {
			switch (str) {
				case "*": return `${nodot}${ONE_CHAR}${star}`;
				case ".*": return `${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "*.*": return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "*/*": return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
				case "**": return nodot + globstar(opts);
				case "**/*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
				case "**/*.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
				case "**/.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
				default: {
					const match = /^(.*?)\.(\w+)$/.exec(str);
					if (!match) return;
					const source = create(match[1]);
					if (!source) return;
					return source + DOT_LITERAL + match[2];
				}
			}
		};
		let source = create(utils.removePrefix(input, state));
		if (source && opts.strictSlashes !== true) source += `${SLASH_LITERAL}?`;
		return source;
	};
	module.exports = parse;
}));
var require_picomatch$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const scan = require_scan();
	const parse = require_parse();
	const utils = require_utils();
	const constants = require_constants();
	const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
	const picomatch = (glob, options, returnState = false) => {
		if (Array.isArray(glob)) {
			const fns = glob.map((input) => picomatch(input, options, returnState));
			const arrayMatcher = (str) => {
				for (const isMatch of fns) {
					const state = isMatch(str);
					if (state) return state;
				}
				return false;
			};
			return arrayMatcher;
		}
		const isState = isObject(glob) && glob.tokens && glob.input;
		if (glob === "" || typeof glob !== "string" && !isState) throw new TypeError("Expected pattern to be a non-empty string");
		const opts = options || {};
		const posix = opts.windows;
		const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
		const state = regex.state;
		delete regex.state;
		let isIgnored = () => false;
		if (opts.ignore) {
			const ignoreOpts = {
				...options,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
		}
		const matcher = (input, returnObject = false) => {
			const { isMatch, match, output } = picomatch.test(input, regex, options, {
				glob,
				posix
			});
			const result = {
				glob,
				state,
				regex,
				posix,
				input,
				output,
				match,
				isMatch
			};
			if (typeof opts.onResult === "function") opts.onResult(result);
			if (isMatch === false) {
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (isIgnored(input)) {
				if (typeof opts.onIgnore === "function") opts.onIgnore(result);
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (typeof opts.onMatch === "function") opts.onMatch(result);
			return returnObject ? result : true;
		};
		if (returnState) matcher.state = state;
		return matcher;
	};
	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected input to be a string");
		if (input === "") return {
			isMatch: false,
			output: ""
		};
		const opts = options || {};
		const format = opts.format || (posix ? utils.toPosixSlashes : null);
		let match = input === glob;
		let output = match && format ? format(input) : input;
		if (match === false) {
			output = format ? format(input) : input;
			match = output === glob;
		}
		if (match === false || opts.capture === true) {
			if (opts.matchBase === true || opts.basename === true) match = picomatch.matchBase(input, regex, options, posix);
			else match = regex.exec(output);
		}
		return {
			isMatch: Boolean(match),
			match,
			output
		};
	};
	picomatch.matchBase = (input, glob, options, posix = options && options.windows) => {
		return (glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)).test(utils.basename(input, { windows: posix }));
	};
	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
	picomatch.parse = (pattern, options) => {
		if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
		return parse(pattern, {
			...options,
			fastpaths: false
		});
	};
	picomatch.scan = (input, options) => scan(input, options);
	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
		if (returnOutput === true) return state.output;
		const opts = options || {};
		const prepend = opts.contains ? "" : "^";
		const append = opts.contains ? "" : "$";
		let source = `${prepend}(?:${state.output})${append}`;
		if (state && state.negated === true) source = `^(?!${source}).*$`;
		const regex = picomatch.toRegex(source, options);
		if (returnState === true) regex.state = state;
		return regex;
	};
	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
		if (!input || typeof input !== "string") throw new TypeError("Expected a non-empty string");
		let parsed = {
			negated: false,
			fastpaths: true
		};
		if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) parsed.output = parse.fastpaths(input, options);
		if (!parsed.output) parsed = parse(input, options);
		return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};
	picomatch.toRegex = (source, options) => {
		try {
			const opts = options || {};
			return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
		} catch (err) {
			if (options && options.debug === true) throw err;
			return /$^/;
		}
	};
	picomatch.constants = constants;
	module.exports = picomatch;
}));
var require_picomatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const pico = require_picomatch$1();
	const utils = require_utils();
	function picomatch(glob, options, returnState = false) {
		if (options && (options.windows === null || options.windows === void 0)) options = {
			...options,
			windows: utils.isWindows()
		};
		return pico(glob, options, returnState);
	}
	Object.assign(picomatch, pico);
	module.exports = picomatch;
}));
var import_picomatch = /* @__PURE__ */ __toESM(require_picomatch(), 1);
var isReadonlyArray = Array.isArray;
var BACKSLASHES = /\\/g;
var DRIVE_RELATIVE_PATH = /^[A-Za-z]:$/;
var isWin = process.platform === "win32";
var ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options = {}) {
	const patternsCount = patterns.length;
	const patternsParts = Array(patternsCount);
	const matchers = Array(patternsCount);
	let i, j;
	for (i = 0; i < patternsCount; i++) {
		const parts = splitPattern(patterns[i]);
		patternsParts[i] = parts;
		const partsCount = parts.length;
		const partMatchers = Array(partsCount);
		for (j = 0; j < partsCount; j++) partMatchers[j] = (0, import_picomatch.default)(parts[j], options);
		matchers[i] = partMatchers;
	}
	return (input) => {
		const inputParts = input.split("/");
		if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return true;
		for (i = 0; i < patternsCount; i++) {
			const patternParts = patternsParts[i];
			const matcher = matchers[i];
			const inputPatternCount = inputParts.length;
			const minParts = Math.min(inputPatternCount, patternParts.length);
			j = 0;
			while (j < minParts) {
				const part = patternParts[j];
				if (part.includes("/")) return true;
				if (!matcher[j](inputParts[j])) break;
				if (!options.noglobstar && part === "**") return true;
				j++;
			}
			if (j === inputPatternCount) return true;
		}
		return false;
	};
}
var WIN32_ROOT_DIR = /^[A-Z]:\/$/i;
var isRoot = isWin ? (p) => WIN32_ROOT_DIR.test(p) : (p) => p === "/";
function buildFormat(cwd, root, absolute) {
	if (cwd === root || root.startsWith(`${cwd}/`)) {
		if (absolute) {
			const start = cwd.length + +!isRoot(cwd);
			return (p, isDir) => p.slice(start, isDir ? -1 : void 0) || ".";
		}
		const prefix = root.slice(cwd.length + 1);
		if (prefix) return (p, isDir) => {
			if (p === ".") return prefix;
			const result = `${prefix}/${p}`;
			return isDir ? result.slice(0, -1) : result;
		};
		return (p, isDir) => isDir && p !== "." ? p.slice(0, -1) : p;
	}
	if (absolute) return (p) => posix.relative(cwd, p) || ".";
	return (p) => posix.relative(cwd, `${root}/${p}`) || ".";
}
function buildRelative(cwd, root) {
	if (root.startsWith(`${cwd}/`)) {
		const prefix = root.slice(cwd.length + 1);
		return (p) => `${prefix}/${p}`;
	}
	return (p) => {
		const result = posix.relative(cwd, `${root}/${p}`);
		return p[p.length - 1] === "/" && result !== "" ? `${result}/` : result || ".";
	};
}
function ensureNonDriveRelativePath(path) {
	return path.replace(DRIVE_RELATIVE_PATH, (match) => `${match}/`);
}
var splitPatternOptions = { parts: true };
function splitPattern(path) {
	var _result$parts;
	const result = import_picomatch.default.scan(path, splitPatternOptions);
	return ((_result$parts = result.parts) === null || _result$parts === void 0 ? void 0 : _result$parts.length) ? result.parts : [path];
}
var POSIX_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g;
var WIN32_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g;
var escapePosixPath = (path) => path.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapeWin32Path = (path) => path.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options) {
	if ((options === null || options === void 0 ? void 0 : options.caseSensitiveMatch) === false) return true;
	const scan = import_picomatch.default.scan(pattern);
	return scan.isGlob || scan.negated;
}
function log(...tasks) {
	console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
function ensureStringArray(value) {
	return typeof value === "string" ? [value] : value !== null && value !== void 0 ? value : [];
}
var PARENT_DIRECTORY = /^(\/?\.\.)+/;
var ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
function normalizePattern(pattern, opts, props, isIgnore) {
	var _PARENT_DIRECTORY$exe;
	const cwd = opts.cwd;
	let result = pattern;
	if (pattern[pattern.length - 1] === "/") result = pattern.slice(0, -1);
	if (result[result.length - 1] !== "*" && opts.expandDirectories) result += "/**";
	const escapedCwd = escapePath(cwd);
	result = isAbsolute$1(result.replace(ESCAPING_BACKSLASHES, "")) ? posix.relative(escapedCwd, result) : posix.normalize(result);
	const parentDir = (_PARENT_DIRECTORY$exe = PARENT_DIRECTORY.exec(result)) === null || _PARENT_DIRECTORY$exe === void 0 ? void 0 : _PARENT_DIRECTORY$exe[0];
	const parts = splitPattern(result);
	if (parentDir) {
		const n = (parentDir.length + 1) / 3;
		let i = 0;
		const cwdParts = escapedCwd.split("/");
		while (i < n && parts[i + n] === cwdParts[cwdParts.length + i - n]) {
			result = result.slice(0, (n - i - 1) * 3) + result.slice((n - i) * 3 + parts[i + n].length + 1) || ".";
			i++;
		}
		const potentialRoot = posix.join(cwd, parentDir.slice(i * 3));
		if (potentialRoot[0] !== "." && props.root.length > potentialRoot.length) {
			props.root = ensureNonDriveRelativePath(potentialRoot);
			props.depthOffset = -n + i;
		}
	}
	if (!isIgnore && props.depthOffset >= 0) {
		var _props$commonPath;
		(_props$commonPath = props.commonPath) !== null && _props$commonPath !== void 0 || (props.commonPath = parts);
		const newCommonPath = [];
		const length = Math.min(props.commonPath.length, parts.length);
		for (let i = 0; i < length; i++) {
			const part = parts[i];
			if (part === "**" && !parts[i + 1]) {
				newCommonPath.pop();
				break;
			}
			if (i === parts.length - 1 || part !== props.commonPath[i] || isDynamicPattern(part)) break;
			newCommonPath.push(part);
		}
		props.depthOffset = newCommonPath.length;
		props.commonPath = newCommonPath;
		props.root = ensureNonDriveRelativePath(newCommonPath.length > 0 ? posix.join(cwd, ...newCommonPath) : cwd);
	}
	return result;
}
function processPatterns(options, patterns, props) {
	const matchPatterns = [];
	const ignorePatterns = [];
	for (const pattern of options.ignore) {
		if (!pattern) continue;
		if (pattern[0] !== "!" || pattern[1] === "(") ignorePatterns.push(normalizePattern(pattern, options, props, true));
	}
	for (const pattern of patterns) {
		if (!pattern) continue;
		if (pattern[0] !== "!" || pattern[1] === "(") matchPatterns.push(normalizePattern(pattern, options, props, false));
		else if (pattern[1] !== "!" || pattern[2] === "(") ignorePatterns.push(normalizePattern(pattern.slice(1), options, props, true));
	}
	return {
		match: matchPatterns,
		ignore: ignorePatterns
	};
}
function buildCrawler(options, patterns) {
	const cwd = options.cwd;
	const props = {
		root: cwd,
		depthOffset: 0
	};
	const processed = processPatterns(options, patterns, props);
	if (options.debug) log("internal processing patterns:", processed);
	const { absolute, caseSensitiveMatch, debug, dot, followSymbolicLinks, onlyDirectories } = options;
	const root = props.root.replace(BACKSLASHES, "");
	const matchOptions = {
		dot,
		nobrace: options.braceExpansion === false,
		nocase: !caseSensitiveMatch,
		noextglob: options.extglob === false,
		noglobstar: options.globstar === false,
		posix: true
	};
	const matcher = (0, import_picomatch.default)(processed.match, matchOptions);
	const ignore = (0, import_picomatch.default)(processed.ignore, matchOptions);
	const partialMatcher = getPartialMatcher(processed.match, matchOptions);
	const format = buildFormat(cwd, root, absolute);
	const excludeFormatter = absolute ? format : buildFormat(cwd, root, true);
	const excludePredicate = (_, p) => {
		const relativePath = excludeFormatter(p, true);
		return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
	};
	let maxDepth;
	if (options.deep !== void 0) maxDepth = Math.round(options.deep - props.depthOffset);
	const crawler = new Builder({
		filters: [debug ? (p, isDirectory) => {
			const path = format(p, isDirectory);
			const matches = matcher(path) && !ignore(path);
			if (matches) log(`matched ${path}`);
			return matches;
		} : (p, isDirectory) => {
			const path = format(p, isDirectory);
			return matcher(path) && !ignore(path);
		}],
		exclude: debug ? (_, p) => {
			const skipped = excludePredicate(_, p);
			log(`${skipped ? "skipped" : "crawling"} ${p}`);
			return skipped;
		} : excludePredicate,
		fs: options.fs,
		pathSeparator: "/",
		relativePaths: !absolute,
		resolvePaths: absolute,
		includeBasePath: absolute,
		resolveSymlinks: followSymbolicLinks,
		excludeSymlinks: !followSymbolicLinks,
		excludeFiles: onlyDirectories,
		includeDirs: onlyDirectories || !options.onlyFiles,
		maxDepth,
		signal: options.signal
	}).crawl(root);
	if (options.debug) log("internal properties:", {
		...props,
		root
	});
	return [crawler, cwd !== root && !absolute && buildRelative(cwd, root)];
}
function formatPaths(paths, mapper) {
	if (mapper) for (let i = paths.length - 1; i >= 0; i--) paths[i] = mapper(paths[i]);
	return paths;
}
var defaultOptions$1 = {
	caseSensitiveMatch: true,
	debug: !!process.env.TINYGLOBBY_DEBUG,
	expandDirectories: true,
	followSymbolicLinks: true,
	onlyFiles: true
};
function getOptions(options) {
	const opts = Object.assign({}, options);
	for (const key in defaultOptions$1) if (opts[key] === void 0) Object.assign(opts, { [key]: defaultOptions$1[key] });
	opts.cwd = (opts.cwd instanceof URL ? fileURLToPath$1(opts.cwd) : resolve$1(opts.cwd || process.cwd())).replace(BACKSLASHES, "/");
	opts.ignore = ensureStringArray(opts.ignore);
	opts.fs && (opts.fs = {
		readdir: opts.fs.readdir || readdir$1,
		readdirSync: opts.fs.readdirSync || readdirSync,
		realpath: opts.fs.realpath || realpath$1,
		realpathSync: opts.fs.realpathSync || realpathSync$1,
		stat: opts.fs.stat || stat$2,
		statSync: opts.fs.statSync || statSync$1
	});
	if (opts.debug) log("globbing with options:", opts);
	return opts;
}
function getCrawler(globInput, inputOptions = {}) {
	var _ref;
	if (globInput && (inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.patterns)) throw new Error("Cannot pass patterns as both an argument and an option");
	const isModern = isReadonlyArray(globInput) || typeof globInput === "string";
	const patterns = ensureStringArray((_ref = isModern ? globInput : globInput.patterns) !== null && _ref !== void 0 ? _ref : "**/*");
	const options = getOptions(isModern ? inputOptions : globInput);
	return patterns.length > 0 ? buildCrawler(options, patterns) : [];
}
async function glob(globInput, options) {
	const [crawler, relative] = getCrawler(globInput, options);
	return crawler ? formatPaths(await crawler.withPromise(), relative) : [];
}
var types$1 = {
	"application/prs.cww": ["cww"],
	"application/prs.xsf+xml": ["xsf"],
	"application/vnd.1000minds.decision-model+xml": ["1km"],
	"application/vnd.3gpp.pic-bw-large": ["plb"],
	"application/vnd.3gpp.pic-bw-small": ["psb"],
	"application/vnd.3gpp.pic-bw-var": ["pvb"],
	"application/vnd.3gpp2.tcap": ["tcap"],
	"application/vnd.3m.post-it-notes": ["pwn"],
	"application/vnd.accpac.simply.aso": ["aso"],
	"application/vnd.accpac.simply.imp": ["imp"],
	"application/vnd.acucobol": ["acu"],
	"application/vnd.acucorp": ["atc", "acutc"],
	"application/vnd.adobe.air-application-installer-package+zip": ["air"],
	"application/vnd.adobe.formscentral.fcdt": ["fcdt"],
	"application/vnd.adobe.fxp": ["fxp", "fxpl"],
	"application/vnd.adobe.xdp+xml": ["xdp"],
	"application/vnd.adobe.xfdf": ["*xfdf"],
	"application/vnd.age": ["age"],
	"application/vnd.ahead.space": ["ahead"],
	"application/vnd.airzip.filesecure.azf": ["azf"],
	"application/vnd.airzip.filesecure.azs": ["azs"],
	"application/vnd.amazon.ebook": ["azw"],
	"application/vnd.americandynamics.acc": ["acc"],
	"application/vnd.amiga.ami": ["ami"],
	"application/vnd.android.package-archive": ["apk"],
	"application/vnd.anser-web-certificate-issue-initiation": ["cii"],
	"application/vnd.anser-web-funds-transfer-initiation": ["fti"],
	"application/vnd.antix.game-component": ["atx"],
	"application/vnd.apple.installer+xml": ["mpkg"],
	"application/vnd.apple.keynote": ["key"],
	"application/vnd.apple.mpegurl": ["m3u8"],
	"application/vnd.apple.numbers": ["numbers"],
	"application/vnd.apple.pages": ["pages"],
	"application/vnd.apple.pkpass": ["pkpass"],
	"application/vnd.aristanetworks.swi": ["swi"],
	"application/vnd.astraea-software.iota": ["iota"],
	"application/vnd.audiograph": ["aep"],
	"application/vnd.autodesk.fbx": ["fbx"],
	"application/vnd.balsamiq.bmml+xml": ["bmml"],
	"application/vnd.blueice.multipass": ["mpm"],
	"application/vnd.bmi": ["bmi"],
	"application/vnd.businessobjects": ["rep"],
	"application/vnd.chemdraw+xml": ["cdxml"],
	"application/vnd.chipnuts.karaoke-mmd": ["mmd"],
	"application/vnd.cinderella": ["cdy"],
	"application/vnd.citationstyles.style+xml": ["csl"],
	"application/vnd.claymore": ["cla"],
	"application/vnd.cloanto.rp9": ["rp9"],
	"application/vnd.clonk.c4group": [
		"c4g",
		"c4d",
		"c4f",
		"c4p",
		"c4u"
	],
	"application/vnd.cluetrust.cartomobile-config": ["c11amc"],
	"application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
	"application/vnd.commonspace": ["csp"],
	"application/vnd.contact.cmsg": ["cdbcmsg"],
	"application/vnd.cosmocaller": ["cmc"],
	"application/vnd.crick.clicker": ["clkx"],
	"application/vnd.crick.clicker.keyboard": ["clkk"],
	"application/vnd.crick.clicker.palette": ["clkp"],
	"application/vnd.crick.clicker.template": ["clkt"],
	"application/vnd.crick.clicker.wordbank": ["clkw"],
	"application/vnd.criticaltools.wbs+xml": ["wbs"],
	"application/vnd.ctc-posml": ["pml"],
	"application/vnd.cups-ppd": ["ppd"],
	"application/vnd.curl.car": ["car"],
	"application/vnd.curl.pcurl": ["pcurl"],
	"application/vnd.dart": ["dart"],
	"application/vnd.data-vision.rdz": ["rdz"],
	"application/vnd.dbf": ["dbf"],
	"application/vnd.dcmp+xml": ["dcmp"],
	"application/vnd.dece.data": [
		"uvf",
		"uvvf",
		"uvd",
		"uvvd"
	],
	"application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
	"application/vnd.dece.unspecified": ["uvx", "uvvx"],
	"application/vnd.dece.zip": ["uvz", "uvvz"],
	"application/vnd.denovo.fcselayout-link": ["fe_launch"],
	"application/vnd.dna": ["dna"],
	"application/vnd.dolby.mlp": ["mlp"],
	"application/vnd.dpgraph": ["dpg"],
	"application/vnd.dreamfactory": ["dfac"],
	"application/vnd.ds-keypoint": ["kpxx"],
	"application/vnd.dvb.ait": ["ait"],
	"application/vnd.dvb.service": ["svc"],
	"application/vnd.dynageo": ["geo"],
	"application/vnd.ecowin.chart": ["mag"],
	"application/vnd.enliven": ["nml"],
	"application/vnd.epson.esf": ["esf"],
	"application/vnd.epson.msf": ["msf"],
	"application/vnd.epson.quickanime": ["qam"],
	"application/vnd.epson.salt": ["slt"],
	"application/vnd.epson.ssf": ["ssf"],
	"application/vnd.eszigno3+xml": ["es3", "et3"],
	"application/vnd.ezpix-album": ["ez2"],
	"application/vnd.ezpix-package": ["ez3"],
	"application/vnd.fdf": ["*fdf"],
	"application/vnd.fdsn.mseed": ["mseed"],
	"application/vnd.fdsn.seed": ["seed", "dataless"],
	"application/vnd.flographit": ["gph"],
	"application/vnd.fluxtime.clip": ["ftc"],
	"application/vnd.framemaker": [
		"fm",
		"frame",
		"maker",
		"book"
	],
	"application/vnd.frogans.fnc": ["fnc"],
	"application/vnd.frogans.ltf": ["ltf"],
	"application/vnd.fsc.weblaunch": ["fsc"],
	"application/vnd.fujitsu.oasys": ["oas"],
	"application/vnd.fujitsu.oasys2": ["oa2"],
	"application/vnd.fujitsu.oasys3": ["oa3"],
	"application/vnd.fujitsu.oasysgp": ["fg5"],
	"application/vnd.fujitsu.oasysprs": ["bh2"],
	"application/vnd.fujixerox.ddd": ["ddd"],
	"application/vnd.fujixerox.docuworks": ["xdw"],
	"application/vnd.fujixerox.docuworks.binder": ["xbd"],
	"application/vnd.fuzzysheet": ["fzs"],
	"application/vnd.genomatix.tuxedo": ["txd"],
	"application/vnd.geogebra.file": ["ggb"],
	"application/vnd.geogebra.slides": ["ggs"],
	"application/vnd.geogebra.tool": ["ggt"],
	"application/vnd.geometry-explorer": ["gex", "gre"],
	"application/vnd.geonext": ["gxt"],
	"application/vnd.geoplan": ["g2w"],
	"application/vnd.geospace": ["g3w"],
	"application/vnd.gmx": ["gmx"],
	"application/vnd.google-apps.document": ["gdoc"],
	"application/vnd.google-apps.drawing": ["gdraw"],
	"application/vnd.google-apps.form": ["gform"],
	"application/vnd.google-apps.jam": ["gjam"],
	"application/vnd.google-apps.map": ["gmap"],
	"application/vnd.google-apps.presentation": ["gslides"],
	"application/vnd.google-apps.script": ["gscript"],
	"application/vnd.google-apps.site": ["gsite"],
	"application/vnd.google-apps.spreadsheet": ["gsheet"],
	"application/vnd.google-earth.kml+xml": ["kml"],
	"application/vnd.google-earth.kmz": ["kmz"],
	"application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
	"application/vnd.grafeq": ["gqf", "gqs"],
	"application/vnd.groove-account": ["gac"],
	"application/vnd.groove-help": ["ghf"],
	"application/vnd.groove-identity-message": ["gim"],
	"application/vnd.groove-injector": ["grv"],
	"application/vnd.groove-tool-message": ["gtm"],
	"application/vnd.groove-tool-template": ["tpl"],
	"application/vnd.groove-vcard": ["vcg"],
	"application/vnd.hal+xml": ["hal"],
	"application/vnd.handheld-entertainment+xml": ["zmm"],
	"application/vnd.hbci": ["hbci"],
	"application/vnd.hhe.lesson-player": ["les"],
	"application/vnd.hp-hpgl": ["hpgl"],
	"application/vnd.hp-hpid": ["hpid"],
	"application/vnd.hp-hps": ["hps"],
	"application/vnd.hp-jlyt": ["jlt"],
	"application/vnd.hp-pcl": ["pcl"],
	"application/vnd.hp-pclxl": ["pclxl"],
	"application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
	"application/vnd.ibm.minipay": ["mpy"],
	"application/vnd.ibm.modcap": [
		"afp",
		"listafp",
		"list3820"
	],
	"application/vnd.ibm.rights-management": ["irm"],
	"application/vnd.ibm.secure-container": ["sc"],
	"application/vnd.iccprofile": ["icc", "icm"],
	"application/vnd.igloader": ["igl"],
	"application/vnd.immervision-ivp": ["ivp"],
	"application/vnd.immervision-ivu": ["ivu"],
	"application/vnd.insors.igm": ["igm"],
	"application/vnd.intercon.formnet": ["xpw", "xpx"],
	"application/vnd.intergeo": ["i2g"],
	"application/vnd.intu.qbo": ["qbo"],
	"application/vnd.intu.qfx": ["qfx"],
	"application/vnd.ipunplugged.rcprofile": ["rcprofile"],
	"application/vnd.irepository.package+xml": ["irp"],
	"application/vnd.is-xpr": ["xpr"],
	"application/vnd.isac.fcs": ["fcs"],
	"application/vnd.jam": ["jam"],
	"application/vnd.jcp.javame.midlet-rms": ["rms"],
	"application/vnd.jisp": ["jisp"],
	"application/vnd.joost.joda-archive": ["joda"],
	"application/vnd.kahootz": ["ktz", "ktr"],
	"application/vnd.kde.karbon": ["karbon"],
	"application/vnd.kde.kchart": ["chrt"],
	"application/vnd.kde.kformula": ["kfo"],
	"application/vnd.kde.kivio": ["flw"],
	"application/vnd.kde.kontour": ["kon"],
	"application/vnd.kde.kpresenter": ["kpr", "kpt"],
	"application/vnd.kde.kspread": ["ksp"],
	"application/vnd.kde.kword": ["kwd", "kwt"],
	"application/vnd.kenameaapp": ["htke"],
	"application/vnd.kidspiration": ["kia"],
	"application/vnd.kinar": ["kne", "knp"],
	"application/vnd.koan": [
		"skp",
		"skd",
		"skt",
		"skm"
	],
	"application/vnd.kodak-descriptor": ["sse"],
	"application/vnd.las.las+xml": ["lasxml"],
	"application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
	"application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
	"application/vnd.lotus-1-2-3": ["123"],
	"application/vnd.lotus-approach": ["apr"],
	"application/vnd.lotus-freelance": ["pre"],
	"application/vnd.lotus-notes": ["nsf"],
	"application/vnd.lotus-organizer": ["org"],
	"application/vnd.lotus-screencam": ["scm"],
	"application/vnd.lotus-wordpro": ["lwp"],
	"application/vnd.macports.portpkg": ["portpkg"],
	"application/vnd.mapbox-vector-tile": ["mvt"],
	"application/vnd.mcd": ["mcd"],
	"application/vnd.medcalcdata": ["mc1"],
	"application/vnd.mediastation.cdkey": ["cdkey"],
	"application/vnd.mfer": ["mwf"],
	"application/vnd.mfmp": ["mfm"],
	"application/vnd.micrografx.flo": ["flo"],
	"application/vnd.micrografx.igx": ["igx"],
	"application/vnd.mif": ["mif"],
	"application/vnd.mobius.daf": ["daf"],
	"application/vnd.mobius.dis": ["dis"],
	"application/vnd.mobius.mbk": ["mbk"],
	"application/vnd.mobius.mqy": ["mqy"],
	"application/vnd.mobius.msl": ["msl"],
	"application/vnd.mobius.plc": ["plc"],
	"application/vnd.mobius.txf": ["txf"],
	"application/vnd.mophun.application": ["mpn"],
	"application/vnd.mophun.certificate": ["mpc"],
	"application/vnd.mozilla.xul+xml": ["xul"],
	"application/vnd.ms-artgalry": ["cil"],
	"application/vnd.ms-cab-compressed": ["cab"],
	"application/vnd.ms-excel": [
		"xls",
		"xlm",
		"xla",
		"xlc",
		"xlt",
		"xlw"
	],
	"application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
	"application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
	"application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
	"application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
	"application/vnd.ms-fontobject": ["eot"],
	"application/vnd.ms-htmlhelp": ["chm"],
	"application/vnd.ms-ims": ["ims"],
	"application/vnd.ms-lrm": ["lrm"],
	"application/vnd.ms-officetheme": ["thmx"],
	"application/vnd.ms-outlook": ["msg"],
	"application/vnd.ms-pki.seccat": ["cat"],
	"application/vnd.ms-pki.stl": ["*stl"],
	"application/vnd.ms-powerpoint": [
		"ppt",
		"pps",
		"pot"
	],
	"application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
	"application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
	"application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
	"application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
	"application/vnd.ms-project": ["*mpp", "mpt"],
	"application/vnd.ms-visio.viewer": ["vdx"],
	"application/vnd.ms-word.document.macroenabled.12": ["docm"],
	"application/vnd.ms-word.template.macroenabled.12": ["dotm"],
	"application/vnd.ms-works": [
		"wps",
		"wks",
		"wcm",
		"wdb"
	],
	"application/vnd.ms-wpl": ["wpl"],
	"application/vnd.ms-xpsdocument": ["xps"],
	"application/vnd.mseq": ["mseq"],
	"application/vnd.musician": ["mus"],
	"application/vnd.muvee.style": ["msty"],
	"application/vnd.mynfc": ["taglet"],
	"application/vnd.nato.bindingdataobject+xml": ["bdo"],
	"application/vnd.neurolanguage.nlu": ["nlu"],
	"application/vnd.nitf": ["ntf", "nitf"],
	"application/vnd.noblenet-directory": ["nnd"],
	"application/vnd.noblenet-sealer": ["nns"],
	"application/vnd.noblenet-web": ["nnw"],
	"application/vnd.nokia.n-gage.ac+xml": ["*ac"],
	"application/vnd.nokia.n-gage.data": ["ngdat"],
	"application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
	"application/vnd.nokia.radio-preset": ["rpst"],
	"application/vnd.nokia.radio-presets": ["rpss"],
	"application/vnd.novadigm.edm": ["edm"],
	"application/vnd.novadigm.edx": ["edx"],
	"application/vnd.novadigm.ext": ["ext"],
	"application/vnd.oasis.opendocument.chart": ["odc"],
	"application/vnd.oasis.opendocument.chart-template": ["otc"],
	"application/vnd.oasis.opendocument.database": ["odb"],
	"application/vnd.oasis.opendocument.formula": ["odf"],
	"application/vnd.oasis.opendocument.formula-template": ["odft"],
	"application/vnd.oasis.opendocument.graphics": ["odg"],
	"application/vnd.oasis.opendocument.graphics-template": ["otg"],
	"application/vnd.oasis.opendocument.image": ["odi"],
	"application/vnd.oasis.opendocument.image-template": ["oti"],
	"application/vnd.oasis.opendocument.presentation": ["odp"],
	"application/vnd.oasis.opendocument.presentation-template": ["otp"],
	"application/vnd.oasis.opendocument.spreadsheet": ["ods"],
	"application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
	"application/vnd.oasis.opendocument.text": ["odt"],
	"application/vnd.oasis.opendocument.text-master": ["odm"],
	"application/vnd.oasis.opendocument.text-template": ["ott"],
	"application/vnd.oasis.opendocument.text-web": ["oth"],
	"application/vnd.olpc-sugar": ["xo"],
	"application/vnd.oma.dd2+xml": ["dd2"],
	"application/vnd.openblox.game+xml": ["obgx"],
	"application/vnd.openofficeorg.extension": ["oxt"],
	"application/vnd.openstreetmap.data+xml": ["osm"],
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
	"application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
	"application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
	"application/vnd.osgeo.mapguide.package": ["mgp"],
	"application/vnd.osgi.dp": ["dp"],
	"application/vnd.osgi.subsystem": ["esa"],
	"application/vnd.palm": [
		"pdb",
		"pqa",
		"oprc"
	],
	"application/vnd.pawaafile": ["paw"],
	"application/vnd.pg.format": ["str"],
	"application/vnd.pg.osasli": ["ei6"],
	"application/vnd.picsel": ["efif"],
	"application/vnd.pmi.widget": ["wg"],
	"application/vnd.pocketlearn": ["plf"],
	"application/vnd.powerbuilder6": ["pbd"],
	"application/vnd.previewsystems.box": ["box"],
	"application/vnd.procrate.brushset": ["brushset"],
	"application/vnd.procreate.brush": ["brush"],
	"application/vnd.procreate.dream": ["drm"],
	"application/vnd.proteus.magazine": ["mgz"],
	"application/vnd.publishare-delta-tree": ["qps"],
	"application/vnd.pvi.ptid1": ["ptid"],
	"application/vnd.pwg-xhtml-print+xml": ["xhtm"],
	"application/vnd.quark.quarkxpress": [
		"qxd",
		"qxt",
		"qwd",
		"qwt",
		"qxl",
		"qxb"
	],
	"application/vnd.rar": ["rar"],
	"application/vnd.realvnc.bed": ["bed"],
	"application/vnd.recordare.musicxml": ["mxl"],
	"application/vnd.recordare.musicxml+xml": ["musicxml"],
	"application/vnd.rig.cryptonote": ["cryptonote"],
	"application/vnd.rim.cod": ["cod"],
	"application/vnd.rn-realmedia": ["rm"],
	"application/vnd.rn-realmedia-vbr": ["rmvb"],
	"application/vnd.route66.link66+xml": ["link66"],
	"application/vnd.sailingtracker.track": ["st"],
	"application/vnd.seemail": ["see"],
	"application/vnd.sema": ["sema"],
	"application/vnd.semd": ["semd"],
	"application/vnd.semf": ["semf"],
	"application/vnd.shana.informed.formdata": ["ifm"],
	"application/vnd.shana.informed.formtemplate": ["itp"],
	"application/vnd.shana.informed.interchange": ["iif"],
	"application/vnd.shana.informed.package": ["ipk"],
	"application/vnd.simtech-mindmapper": ["twd", "twds"],
	"application/vnd.smaf": ["mmf"],
	"application/vnd.smart.teacher": ["teacher"],
	"application/vnd.software602.filler.form+xml": ["fo"],
	"application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
	"application/vnd.spotfire.dxp": ["dxp"],
	"application/vnd.spotfire.sfs": ["sfs"],
	"application/vnd.stardivision.calc": ["sdc"],
	"application/vnd.stardivision.draw": ["sda"],
	"application/vnd.stardivision.impress": ["sdd"],
	"application/vnd.stardivision.math": ["smf"],
	"application/vnd.stardivision.writer": ["sdw", "vor"],
	"application/vnd.stardivision.writer-global": ["sgl"],
	"application/vnd.stepmania.package": ["smzip"],
	"application/vnd.stepmania.stepchart": ["sm"],
	"application/vnd.sun.wadl+xml": ["wadl"],
	"application/vnd.sun.xml.calc": ["sxc"],
	"application/vnd.sun.xml.calc.template": ["stc"],
	"application/vnd.sun.xml.draw": ["sxd"],
	"application/vnd.sun.xml.draw.template": ["std"],
	"application/vnd.sun.xml.impress": ["sxi"],
	"application/vnd.sun.xml.impress.template": ["sti"],
	"application/vnd.sun.xml.math": ["sxm"],
	"application/vnd.sun.xml.writer": ["sxw"],
	"application/vnd.sun.xml.writer.global": ["sxg"],
	"application/vnd.sun.xml.writer.template": ["stw"],
	"application/vnd.sus-calendar": ["sus", "susp"],
	"application/vnd.svd": ["svd"],
	"application/vnd.symbian.install": ["sis", "sisx"],
	"application/vnd.syncml+xml": ["xsm"],
	"application/vnd.syncml.dm+wbxml": ["bdm"],
	"application/vnd.syncml.dm+xml": ["xdm"],
	"application/vnd.syncml.dmddf+xml": ["ddf"],
	"application/vnd.tao.intent-module-archive": ["tao"],
	"application/vnd.tcpdump.pcap": [
		"pcap",
		"cap",
		"dmp"
	],
	"application/vnd.tmobile-livetv": ["tmo"],
	"application/vnd.trid.tpt": ["tpt"],
	"application/vnd.triscape.mxs": ["mxs"],
	"application/vnd.trueapp": ["tra"],
	"application/vnd.ufdl": ["ufd", "ufdl"],
	"application/vnd.uiq.theme": ["utz"],
	"application/vnd.umajin": ["umj"],
	"application/vnd.unity": ["unityweb"],
	"application/vnd.uoml+xml": ["uoml", "uo"],
	"application/vnd.vcx": ["vcx"],
	"application/vnd.visio": [
		"vsd",
		"vst",
		"vss",
		"vsw",
		"vsdx",
		"vtx"
	],
	"application/vnd.visionary": ["vis"],
	"application/vnd.vsf": ["vsf"],
	"application/vnd.wap.wbxml": ["wbxml"],
	"application/vnd.wap.wmlc": ["wmlc"],
	"application/vnd.wap.wmlscriptc": ["wmlsc"],
	"application/vnd.webturbo": ["wtb"],
	"application/vnd.wolfram.player": ["nbp"],
	"application/vnd.wordperfect": ["wpd"],
	"application/vnd.wqd": ["wqd"],
	"application/vnd.wt.stf": ["stf"],
	"application/vnd.xara": ["xar"],
	"application/vnd.xfdl": ["xfdl"],
	"application/vnd.yamaha.hv-dic": ["hvd"],
	"application/vnd.yamaha.hv-script": ["hvs"],
	"application/vnd.yamaha.hv-voice": ["hvp"],
	"application/vnd.yamaha.openscoreformat": ["osf"],
	"application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
	"application/vnd.yamaha.smaf-audio": ["saf"],
	"application/vnd.yamaha.smaf-phrase": ["spf"],
	"application/vnd.yellowriver-custom-menu": ["cmp"],
	"application/vnd.zul": ["zir", "zirz"],
	"application/vnd.zzazz.deck+xml": ["zaz"],
	"application/x-7z-compressed": ["7z"],
	"application/x-abiword": ["abw"],
	"application/x-ace-compressed": ["ace"],
	"application/x-apple-diskimage": ["*dmg"],
	"application/x-arj": ["arj"],
	"application/x-authorware-bin": [
		"aab",
		"x32",
		"u32",
		"vox"
	],
	"application/x-authorware-map": ["aam"],
	"application/x-authorware-seg": ["aas"],
	"application/x-bcpio": ["bcpio"],
	"application/x-bdoc": ["*bdoc"],
	"application/x-bittorrent": ["torrent"],
	"application/x-blender": ["blend"],
	"application/x-blorb": ["blb", "blorb"],
	"application/x-bzip": ["bz"],
	"application/x-bzip2": ["bz2", "boz"],
	"application/x-cbr": [
		"cbr",
		"cba",
		"cbt",
		"cbz",
		"cb7"
	],
	"application/x-cdlink": ["vcd"],
	"application/x-cfs-compressed": ["cfs"],
	"application/x-chat": ["chat"],
	"application/x-chess-pgn": ["pgn"],
	"application/x-chrome-extension": ["crx"],
	"application/x-cocoa": ["cco"],
	"application/x-compressed": ["*rar"],
	"application/x-conference": ["nsc"],
	"application/x-cpio": ["cpio"],
	"application/x-csh": ["csh"],
	"application/x-debian-package": ["*deb", "udeb"],
	"application/x-dgc-compressed": ["dgc"],
	"application/x-director": [
		"dir",
		"dcr",
		"dxr",
		"cst",
		"cct",
		"cxt",
		"w3d",
		"fgd",
		"swa"
	],
	"application/x-doom": ["wad"],
	"application/x-dtbncx+xml": ["ncx"],
	"application/x-dtbook+xml": ["dtb"],
	"application/x-dtbresource+xml": ["res"],
	"application/x-dvi": ["dvi"],
	"application/x-envoy": ["evy"],
	"application/x-eva": ["eva"],
	"application/x-font-bdf": ["bdf"],
	"application/x-font-ghostscript": ["gsf"],
	"application/x-font-linux-psf": ["psf"],
	"application/x-font-pcf": ["pcf"],
	"application/x-font-snf": ["snf"],
	"application/x-font-type1": [
		"pfa",
		"pfb",
		"pfm",
		"afm"
	],
	"application/x-freearc": ["arc"],
	"application/x-futuresplash": ["spl"],
	"application/x-gca-compressed": ["gca"],
	"application/x-glulx": ["ulx"],
	"application/x-gnumeric": ["gnumeric"],
	"application/x-gramps-xml": ["gramps"],
	"application/x-gtar": ["gtar"],
	"application/x-hdf": ["hdf"],
	"application/x-httpd-php": ["php"],
	"application/x-install-instructions": ["install"],
	"application/x-ipynb+json": ["ipynb"],
	"application/x-iso9660-image": ["*iso"],
	"application/x-iwork-keynote-sffkey": ["*key"],
	"application/x-iwork-numbers-sffnumbers": ["*numbers"],
	"application/x-iwork-pages-sffpages": ["*pages"],
	"application/x-java-archive-diff": ["jardiff"],
	"application/x-java-jnlp-file": ["jnlp"],
	"application/x-keepass2": ["kdbx"],
	"application/x-latex": ["latex"],
	"application/x-lua-bytecode": ["luac"],
	"application/x-lzh-compressed": ["lzh", "lha"],
	"application/x-makeself": ["run"],
	"application/x-mie": ["mie"],
	"application/x-mobipocket-ebook": ["*prc", "mobi"],
	"application/x-ms-application": ["application"],
	"application/x-ms-shortcut": ["lnk"],
	"application/x-ms-wmd": ["wmd"],
	"application/x-ms-wmz": ["wmz"],
	"application/x-ms-xbap": ["xbap"],
	"application/x-msaccess": ["mdb"],
	"application/x-msbinder": ["obd"],
	"application/x-mscardfile": ["crd"],
	"application/x-msclip": ["clp"],
	"application/x-msdos-program": ["*exe"],
	"application/x-msdownload": [
		"*exe",
		"*dll",
		"com",
		"bat",
		"*msi"
	],
	"application/x-msmediaview": [
		"mvb",
		"m13",
		"m14"
	],
	"application/x-msmetafile": [
		"*wmf",
		"*wmz",
		"*emf",
		"emz"
	],
	"application/x-msmoney": ["mny"],
	"application/x-mspublisher": ["pub"],
	"application/x-msschedule": ["scd"],
	"application/x-msterminal": ["trm"],
	"application/x-mswrite": ["wri"],
	"application/x-netcdf": ["nc", "cdf"],
	"application/x-ns-proxy-autoconfig": ["pac"],
	"application/x-nzb": ["nzb"],
	"application/x-perl": ["pl", "pm"],
	"application/x-pilot": ["*prc", "*pdb"],
	"application/x-pkcs12": ["p12", "pfx"],
	"application/x-pkcs7-certificates": ["p7b", "spc"],
	"application/x-pkcs7-certreqresp": ["p7r"],
	"application/x-rar-compressed": ["*rar"],
	"application/x-redhat-package-manager": ["rpm"],
	"application/x-research-info-systems": ["ris"],
	"application/x-sea": ["sea"],
	"application/x-sh": ["sh"],
	"application/x-shar": ["shar"],
	"application/x-shockwave-flash": ["swf"],
	"application/x-silverlight-app": ["xap"],
	"application/x-sql": ["*sql"],
	"application/x-stuffit": ["sit"],
	"application/x-stuffitx": ["sitx"],
	"application/x-subrip": ["srt"],
	"application/x-sv4cpio": ["sv4cpio"],
	"application/x-sv4crc": ["sv4crc"],
	"application/x-t3vm-image": ["t3"],
	"application/x-tads": ["gam"],
	"application/x-tar": ["tar"],
	"application/x-tcl": ["tcl", "tk"],
	"application/x-tex": ["tex"],
	"application/x-tex-tfm": ["tfm"],
	"application/x-texinfo": ["texinfo", "texi"],
	"application/x-tgif": ["*obj"],
	"application/x-ustar": ["ustar"],
	"application/x-virtualbox-hdd": ["hdd"],
	"application/x-virtualbox-ova": ["ova"],
	"application/x-virtualbox-ovf": ["ovf"],
	"application/x-virtualbox-vbox": ["vbox"],
	"application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
	"application/x-virtualbox-vdi": ["vdi"],
	"application/x-virtualbox-vhd": ["vhd"],
	"application/x-virtualbox-vmdk": ["vmdk"],
	"application/x-wais-source": ["src"],
	"application/x-web-app-manifest+json": ["webapp"],
	"application/x-x509-ca-cert": [
		"der",
		"crt",
		"pem"
	],
	"application/x-xfig": ["fig"],
	"application/x-xliff+xml": ["*xlf"],
	"application/x-xpinstall": ["xpi"],
	"application/x-xz": ["xz"],
	"application/x-zip-compressed": ["*zip"],
	"application/x-zmachine": [
		"z1",
		"z2",
		"z3",
		"z4",
		"z5",
		"z6",
		"z7",
		"z8"
	],
	"audio/vnd.dece.audio": ["uva", "uvva"],
	"audio/vnd.digital-winds": ["eol"],
	"audio/vnd.dra": ["dra"],
	"audio/vnd.dts": ["dts"],
	"audio/vnd.dts.hd": ["dtshd"],
	"audio/vnd.lucent.voice": ["lvp"],
	"audio/vnd.ms-playready.media.pya": ["pya"],
	"audio/vnd.nuera.ecelp4800": ["ecelp4800"],
	"audio/vnd.nuera.ecelp7470": ["ecelp7470"],
	"audio/vnd.nuera.ecelp9600": ["ecelp9600"],
	"audio/vnd.rip": ["rip"],
	"audio/x-aac": ["*aac"],
	"audio/x-aiff": [
		"aif",
		"aiff",
		"aifc"
	],
	"audio/x-caf": ["caf"],
	"audio/x-flac": ["flac"],
	"audio/x-m4a": ["*m4a"],
	"audio/x-matroska": ["mka"],
	"audio/x-mpegurl": ["m3u"],
	"audio/x-ms-wax": ["wax"],
	"audio/x-ms-wma": ["wma"],
	"audio/x-pn-realaudio": ["ram", "ra"],
	"audio/x-pn-realaudio-plugin": ["rmp"],
	"audio/x-realaudio": ["*ra"],
	"audio/x-wav": ["*wav"],
	"chemical/x-cdx": ["cdx"],
	"chemical/x-cif": ["cif"],
	"chemical/x-cmdf": ["cmdf"],
	"chemical/x-cml": ["cml"],
	"chemical/x-csml": ["csml"],
	"chemical/x-xyz": ["xyz"],
	"image/prs.btif": ["btif", "btf"],
	"image/prs.pti": ["pti"],
	"image/vnd.adobe.photoshop": ["psd"],
	"image/vnd.airzip.accelerator.azv": ["azv"],
	"image/vnd.blockfact.facti": ["facti"],
	"image/vnd.dece.graphic": [
		"uvi",
		"uvvi",
		"uvg",
		"uvvg"
	],
	"image/vnd.djvu": ["djvu", "djv"],
	"image/vnd.dvb.subtitle": ["*sub"],
	"image/vnd.dwg": ["dwg"],
	"image/vnd.dxf": ["dxf"],
	"image/vnd.fastbidsheet": ["fbs"],
	"image/vnd.fpx": ["fpx"],
	"image/vnd.fst": ["fst"],
	"image/vnd.fujixerox.edmics-mmr": ["mmr"],
	"image/vnd.fujixerox.edmics-rlc": ["rlc"],
	"image/vnd.microsoft.icon": ["ico"],
	"image/vnd.ms-dds": ["dds"],
	"image/vnd.ms-modi": ["mdi"],
	"image/vnd.ms-photo": ["wdp"],
	"image/vnd.net-fpx": ["npx"],
	"image/vnd.pco.b16": ["b16"],
	"image/vnd.tencent.tap": ["tap"],
	"image/vnd.valve.source.texture": ["vtf"],
	"image/vnd.wap.wbmp": ["wbmp"],
	"image/vnd.xiff": ["xif"],
	"image/vnd.zbrush.pcx": ["pcx"],
	"image/x-3ds": ["3ds"],
	"image/x-adobe-dng": ["dng"],
	"image/x-cmu-raster": ["ras"],
	"image/x-cmx": ["cmx"],
	"image/x-freehand": [
		"fh",
		"fhc",
		"fh4",
		"fh5",
		"fh7"
	],
	"image/x-icon": ["*ico"],
	"image/x-jng": ["jng"],
	"image/x-mrsid-image": ["sid"],
	"image/x-ms-bmp": ["*bmp"],
	"image/x-pcx": ["*pcx"],
	"image/x-pict": ["pic", "pct"],
	"image/x-portable-anymap": ["pnm"],
	"image/x-portable-bitmap": ["pbm"],
	"image/x-portable-graymap": ["pgm"],
	"image/x-portable-pixmap": ["ppm"],
	"image/x-rgb": ["rgb"],
	"image/x-tga": ["tga"],
	"image/x-xbitmap": ["xbm"],
	"image/x-xpixmap": ["xpm"],
	"image/x-xwindowdump": ["xwd"],
	"message/vnd.wfa.wsc": ["wsc"],
	"model/vnd.bary": ["bary"],
	"model/vnd.cld": ["cld"],
	"model/vnd.collada+xml": ["dae"],
	"model/vnd.dwf": ["dwf"],
	"model/vnd.gdl": ["gdl"],
	"model/vnd.gtw": ["gtw"],
	"model/vnd.mts": ["*mts"],
	"model/vnd.opengex": ["ogex"],
	"model/vnd.parasolid.transmit.binary": ["x_b"],
	"model/vnd.parasolid.transmit.text": ["x_t"],
	"model/vnd.pytha.pyox": ["pyo", "pyox"],
	"model/vnd.sap.vds": ["vds"],
	"model/vnd.usda": ["usda"],
	"model/vnd.usdz+zip": ["usdz"],
	"model/vnd.valve.source.compiled-map": ["bsp"],
	"model/vnd.vtu": ["vtu"],
	"text/prs.lines.tag": ["dsc"],
	"text/vnd.curl": ["curl"],
	"text/vnd.curl.dcurl": ["dcurl"],
	"text/vnd.curl.mcurl": ["mcurl"],
	"text/vnd.curl.scurl": ["scurl"],
	"text/vnd.dvb.subtitle": ["sub"],
	"text/vnd.familysearch.gedcom": ["ged"],
	"text/vnd.fly": ["fly"],
	"text/vnd.fmi.flexstor": ["flx"],
	"text/vnd.graphviz": ["gv"],
	"text/vnd.in3d.3dml": ["3dml"],
	"text/vnd.in3d.spot": ["spot"],
	"text/vnd.sun.j2me.app-descriptor": ["jad"],
	"text/vnd.wap.wml": ["wml"],
	"text/vnd.wap.wmlscript": ["wmls"],
	"text/x-asm": ["s", "asm"],
	"text/x-c": [
		"c",
		"cc",
		"cxx",
		"cpp",
		"h",
		"hh",
		"dic"
	],
	"text/x-component": ["htc"],
	"text/x-fortran": [
		"f",
		"for",
		"f77",
		"f90"
	],
	"text/x-handlebars-template": ["hbs"],
	"text/x-java-source": ["java"],
	"text/x-lua": ["lua"],
	"text/x-markdown": ["mkd"],
	"text/x-nfo": ["nfo"],
	"text/x-opml": ["opml"],
	"text/x-org": ["*org"],
	"text/x-pascal": ["p", "pas"],
	"text/x-processing": ["pde"],
	"text/x-sass": ["sass"],
	"text/x-scss": ["scss"],
	"text/x-setext": ["etx"],
	"text/x-sfv": ["sfv"],
	"text/x-suse-ymp": ["ymp"],
	"text/x-uuencode": ["uu"],
	"text/x-vcalendar": ["vcs"],
	"text/x-vcard": ["vcf"],
	"video/vnd.dece.hd": ["uvh", "uvvh"],
	"video/vnd.dece.mobile": ["uvm", "uvvm"],
	"video/vnd.dece.pd": ["uvp", "uvvp"],
	"video/vnd.dece.sd": ["uvs", "uvvs"],
	"video/vnd.dece.video": ["uvv", "uvvv"],
	"video/vnd.dvb.file": ["dvb"],
	"video/vnd.fvt": ["fvt"],
	"video/vnd.mpegurl": ["mxu", "m4u"],
	"video/vnd.ms-playready.media.pyv": ["pyv"],
	"video/vnd.uvvu.mp4": ["uvu", "uvvu"],
	"video/vnd.vivo": ["viv"],
	"video/x-f4v": ["f4v"],
	"video/x-fli": ["fli"],
	"video/x-flv": ["flv"],
	"video/x-m4v": ["m4v"],
	"video/x-matroska": [
		"mkv",
		"mk3d",
		"mks"
	],
	"video/x-mng": ["mng"],
	"video/x-ms-asf": ["asf", "asx"],
	"video/x-ms-vob": ["vob"],
	"video/x-ms-wm": ["wm"],
	"video/x-ms-wmv": ["wmv"],
	"video/x-ms-wmx": ["wmx"],
	"video/x-ms-wvx": ["wvx"],
	"video/x-msvideo": ["avi"],
	"video/x-sgi-movie": ["movie"],
	"video/x-smv": ["smv"],
	"x-conference/x-cooltalk": ["ice"]
};
Object.freeze(types$1);
var types = {
	"application/andrew-inset": ["ez"],
	"application/appinstaller": ["appinstaller"],
	"application/applixware": ["aw"],
	"application/appx": ["appx"],
	"application/appxbundle": ["appxbundle"],
	"application/atom+xml": ["atom"],
	"application/atomcat+xml": ["atomcat"],
	"application/atomdeleted+xml": ["atomdeleted"],
	"application/atomsvc+xml": ["atomsvc"],
	"application/atsc-dwd+xml": ["dwd"],
	"application/atsc-held+xml": ["held"],
	"application/atsc-rsat+xml": ["rsat"],
	"application/automationml-aml+xml": ["aml"],
	"application/automationml-amlx+zip": ["amlx"],
	"application/bdoc": ["bdoc"],
	"application/calendar+xml": ["xcs"],
	"application/ccxml+xml": ["ccxml"],
	"application/cdfx+xml": ["cdfx"],
	"application/cdmi-capability": ["cdmia"],
	"application/cdmi-container": ["cdmic"],
	"application/cdmi-domain": ["cdmid"],
	"application/cdmi-object": ["cdmio"],
	"application/cdmi-queue": ["cdmiq"],
	"application/cpl+xml": ["cpl"],
	"application/cu-seeme": ["cu"],
	"application/cwl": ["cwl"],
	"application/dash+xml": ["mpd"],
	"application/dash-patch+xml": ["mpp"],
	"application/davmount+xml": ["davmount"],
	"application/dicom": ["dcm"],
	"application/docbook+xml": ["dbk"],
	"application/dssc+der": ["dssc"],
	"application/dssc+xml": ["xdssc"],
	"application/ecmascript": ["ecma"],
	"application/emma+xml": ["emma"],
	"application/emotionml+xml": ["emotionml"],
	"application/epub+zip": ["epub"],
	"application/exi": ["exi"],
	"application/express": ["exp"],
	"application/fdf": ["fdf"],
	"application/fdt+xml": ["fdt"],
	"application/font-tdpfr": ["pfr"],
	"application/geo+json": ["geojson"],
	"application/gml+xml": ["gml"],
	"application/gpx+xml": ["gpx"],
	"application/gxf": ["gxf"],
	"application/gzip": ["gz"],
	"application/hjson": ["hjson"],
	"application/hyperstudio": ["stk"],
	"application/inkml+xml": ["ink", "inkml"],
	"application/ipfix": ["ipfix"],
	"application/its+xml": ["its"],
	"application/java-archive": [
		"jar",
		"war",
		"ear"
	],
	"application/java-serialized-object": ["ser"],
	"application/java-vm": ["class"],
	"application/javascript": ["*js"],
	"application/json": ["json", "map"],
	"application/json5": ["json5"],
	"application/jsonml+json": ["jsonml"],
	"application/ld+json": ["jsonld"],
	"application/lgr+xml": ["lgr"],
	"application/lost+xml": ["lostxml"],
	"application/mac-binhex40": ["hqx"],
	"application/mac-compactpro": ["cpt"],
	"application/mads+xml": ["mads"],
	"application/manifest+json": ["webmanifest"],
	"application/marc": ["mrc"],
	"application/marcxml+xml": ["mrcx"],
	"application/mathematica": [
		"ma",
		"nb",
		"mb"
	],
	"application/mathml+xml": ["mathml"],
	"application/mbox": ["mbox"],
	"application/media-policy-dataset+xml": ["mpf"],
	"application/mediaservercontrol+xml": ["mscml"],
	"application/metalink+xml": ["metalink"],
	"application/metalink4+xml": ["meta4"],
	"application/mets+xml": ["mets"],
	"application/mmt-aei+xml": ["maei"],
	"application/mmt-usd+xml": ["musd"],
	"application/mods+xml": ["mods"],
	"application/mp21": ["m21", "mp21"],
	"application/mp4": [
		"*mp4",
		"*mpg4",
		"mp4s",
		"m4p"
	],
	"application/msix": ["msix"],
	"application/msixbundle": ["msixbundle"],
	"application/msword": ["doc", "dot"],
	"application/mxf": ["mxf"],
	"application/n-quads": ["nq"],
	"application/n-triples": ["nt"],
	"application/node": ["cjs"],
	"application/octet-stream": [
		"bin",
		"dms",
		"lrf",
		"mar",
		"so",
		"dist",
		"distz",
		"pkg",
		"bpk",
		"dump",
		"elc",
		"deploy",
		"exe",
		"dll",
		"deb",
		"dmg",
		"iso",
		"img",
		"msi",
		"msp",
		"msm",
		"buffer"
	],
	"application/oda": ["oda"],
	"application/oebps-package+xml": ["opf"],
	"application/ogg": ["ogx"],
	"application/omdoc+xml": ["omdoc"],
	"application/onenote": [
		"onetoc",
		"onetoc2",
		"onetmp",
		"onepkg",
		"one",
		"onea"
	],
	"application/oxps": ["oxps"],
	"application/p2p-overlay+xml": ["relo"],
	"application/patch-ops-error+xml": ["xer"],
	"application/pdf": ["pdf"],
	"application/pgp-encrypted": ["pgp"],
	"application/pgp-keys": ["asc"],
	"application/pgp-signature": ["sig", "*asc"],
	"application/pics-rules": ["prf"],
	"application/pkcs10": ["p10"],
	"application/pkcs7-mime": ["p7m", "p7c"],
	"application/pkcs7-signature": ["p7s"],
	"application/pkcs8": ["p8"],
	"application/pkix-attr-cert": ["ac"],
	"application/pkix-cert": ["cer"],
	"application/pkix-crl": ["crl"],
	"application/pkix-pkipath": ["pkipath"],
	"application/pkixcmp": ["pki"],
	"application/pls+xml": ["pls"],
	"application/postscript": [
		"ai",
		"eps",
		"ps"
	],
	"application/provenance+xml": ["provx"],
	"application/pskc+xml": ["pskcxml"],
	"application/raml+yaml": ["raml"],
	"application/rdf+xml": ["rdf", "owl"],
	"application/reginfo+xml": ["rif"],
	"application/relax-ng-compact-syntax": ["rnc"],
	"application/resource-lists+xml": ["rl"],
	"application/resource-lists-diff+xml": ["rld"],
	"application/rls-services+xml": ["rs"],
	"application/route-apd+xml": ["rapd"],
	"application/route-s-tsid+xml": ["sls"],
	"application/route-usd+xml": ["rusd"],
	"application/rpki-ghostbusters": ["gbr"],
	"application/rpki-manifest": ["mft"],
	"application/rpki-roa": ["roa"],
	"application/rsd+xml": ["rsd"],
	"application/rss+xml": ["rss"],
	"application/rtf": ["rtf"],
	"application/sbml+xml": ["sbml"],
	"application/scvp-cv-request": ["scq"],
	"application/scvp-cv-response": ["scs"],
	"application/scvp-vp-request": ["spq"],
	"application/scvp-vp-response": ["spp"],
	"application/sdp": ["sdp"],
	"application/senml+xml": ["senmlx"],
	"application/sensml+xml": ["sensmlx"],
	"application/set-payment-initiation": ["setpay"],
	"application/set-registration-initiation": ["setreg"],
	"application/shf+xml": ["shf"],
	"application/sieve": ["siv", "sieve"],
	"application/smil+xml": ["smi", "smil"],
	"application/sparql-query": ["rq"],
	"application/sparql-results+xml": ["srx"],
	"application/sql": ["sql"],
	"application/srgs": ["gram"],
	"application/srgs+xml": ["grxml"],
	"application/sru+xml": ["sru"],
	"application/ssdl+xml": ["ssdl"],
	"application/ssml+xml": ["ssml"],
	"application/swid+xml": ["swidtag"],
	"application/tei+xml": ["tei", "teicorpus"],
	"application/thraud+xml": ["tfi"],
	"application/timestamped-data": ["tsd"],
	"application/toml": ["toml"],
	"application/trig": ["trig"],
	"application/ttml+xml": ["ttml"],
	"application/ubjson": ["ubj"],
	"application/urc-ressheet+xml": ["rsheet"],
	"application/urc-targetdesc+xml": ["td"],
	"application/voicexml+xml": ["vxml"],
	"application/wasm": ["wasm"],
	"application/watcherinfo+xml": ["wif"],
	"application/widget": ["wgt"],
	"application/winhlp": ["hlp"],
	"application/wsdl+xml": ["wsdl"],
	"application/wspolicy+xml": ["wspolicy"],
	"application/xaml+xml": ["xaml"],
	"application/xcap-att+xml": ["xav"],
	"application/xcap-caps+xml": ["xca"],
	"application/xcap-diff+xml": ["xdf"],
	"application/xcap-el+xml": ["xel"],
	"application/xcap-ns+xml": ["xns"],
	"application/xenc+xml": ["xenc"],
	"application/xfdf": ["xfdf"],
	"application/xhtml+xml": ["xhtml", "xht"],
	"application/xliff+xml": ["xlf"],
	"application/xml": [
		"xml",
		"xsl",
		"xsd",
		"rng"
	],
	"application/xml-dtd": ["dtd"],
	"application/xop+xml": ["xop"],
	"application/xproc+xml": ["xpl"],
	"application/xslt+xml": ["*xsl", "xslt"],
	"application/xspf+xml": ["xspf"],
	"application/xv+xml": [
		"mxml",
		"xhvml",
		"xvml",
		"xvm"
	],
	"application/yang": ["yang"],
	"application/yin+xml": ["yin"],
	"application/zip": ["zip"],
	"application/zip+dotlottie": ["lottie"],
	"audio/3gpp": ["*3gpp"],
	"audio/aac": ["adts", "aac"],
	"audio/adpcm": ["adp"],
	"audio/amr": ["amr"],
	"audio/basic": ["au", "snd"],
	"audio/midi": [
		"mid",
		"midi",
		"kar",
		"rmi"
	],
	"audio/mobile-xmf": ["mxmf"],
	"audio/mp3": ["*mp3"],
	"audio/mp4": [
		"m4a",
		"mp4a",
		"m4b"
	],
	"audio/mpeg": [
		"mpga",
		"mp2",
		"mp2a",
		"mp3",
		"m2a",
		"m3a"
	],
	"audio/ogg": [
		"oga",
		"ogg",
		"spx",
		"opus"
	],
	"audio/s3m": ["s3m"],
	"audio/silk": ["sil"],
	"audio/wav": ["wav"],
	"audio/wave": ["*wav"],
	"audio/webm": ["weba"],
	"audio/xm": ["xm"],
	"font/collection": ["ttc"],
	"font/otf": ["otf"],
	"font/ttf": ["ttf"],
	"font/woff": ["woff"],
	"font/woff2": ["woff2"],
	"image/aces": ["exr"],
	"image/apng": ["apng"],
	"image/avci": ["avci"],
	"image/avcs": ["avcs"],
	"image/avif": ["avif"],
	"image/bmp": ["bmp", "dib"],
	"image/cgm": ["cgm"],
	"image/dicom-rle": ["drle"],
	"image/dpx": ["dpx"],
	"image/emf": ["emf"],
	"image/fits": ["fits"],
	"image/g3fax": ["g3"],
	"image/gif": ["gif"],
	"image/heic": ["heic"],
	"image/heic-sequence": ["heics"],
	"image/heif": ["heif"],
	"image/heif-sequence": ["heifs"],
	"image/hej2k": ["hej2"],
	"image/ief": ["ief"],
	"image/jaii": ["jaii"],
	"image/jais": ["jais"],
	"image/jls": ["jls"],
	"image/jp2": ["jp2", "jpg2"],
	"image/jpeg": [
		"jpg",
		"jpeg",
		"jpe"
	],
	"image/jph": ["jph"],
	"image/jphc": ["jhc"],
	"image/jpm": ["jpm", "jpgm"],
	"image/jpx": ["jpx", "jpf"],
	"image/jxl": ["jxl"],
	"image/jxr": ["jxr"],
	"image/jxra": ["jxra"],
	"image/jxrs": ["jxrs"],
	"image/jxs": ["jxs"],
	"image/jxsc": ["jxsc"],
	"image/jxsi": ["jxsi"],
	"image/jxss": ["jxss"],
	"image/ktx": ["ktx"],
	"image/ktx2": ["ktx2"],
	"image/pjpeg": ["jfif"],
	"image/png": ["png"],
	"image/sgi": ["sgi"],
	"image/svg+xml": ["svg", "svgz"],
	"image/t38": ["t38"],
	"image/tiff": ["tif", "tiff"],
	"image/tiff-fx": ["tfx"],
	"image/webp": ["webp"],
	"image/wmf": ["wmf"],
	"message/disposition-notification": ["disposition-notification"],
	"message/global": ["u8msg"],
	"message/global-delivery-status": ["u8dsn"],
	"message/global-disposition-notification": ["u8mdn"],
	"message/global-headers": ["u8hdr"],
	"message/rfc822": [
		"eml",
		"mime",
		"mht",
		"mhtml"
	],
	"model/3mf": ["3mf"],
	"model/gltf+json": ["gltf"],
	"model/gltf-binary": ["glb"],
	"model/iges": ["igs", "iges"],
	"model/jt": ["jt"],
	"model/mesh": [
		"msh",
		"mesh",
		"silo"
	],
	"model/mtl": ["mtl"],
	"model/obj": ["obj"],
	"model/prc": ["prc"],
	"model/step": [
		"step",
		"stp",
		"stpnc",
		"p21",
		"210"
	],
	"model/step+xml": ["stpx"],
	"model/step+zip": ["stpz"],
	"model/step-xml+zip": ["stpxz"],
	"model/stl": ["stl"],
	"model/u3d": ["u3d"],
	"model/vrml": ["wrl", "vrml"],
	"model/x3d+binary": ["*x3db", "x3dbz"],
	"model/x3d+fastinfoset": ["x3db"],
	"model/x3d+vrml": ["*x3dv", "x3dvz"],
	"model/x3d+xml": ["x3d", "x3dz"],
	"model/x3d-vrml": ["x3dv"],
	"text/cache-manifest": ["appcache", "manifest"],
	"text/calendar": ["ics", "ifb"],
	"text/coffeescript": ["coffee", "litcoffee"],
	"text/css": ["css"],
	"text/csv": ["csv"],
	"text/html": [
		"html",
		"htm",
		"shtml"
	],
	"text/jade": ["jade"],
	"text/javascript": ["js", "mjs"],
	"text/jsx": ["jsx"],
	"text/less": ["less"],
	"text/markdown": ["md", "markdown"],
	"text/mathml": ["mml"],
	"text/mdx": ["mdx"],
	"text/n3": ["n3"],
	"text/plain": [
		"txt",
		"text",
		"conf",
		"def",
		"list",
		"log",
		"in",
		"ini"
	],
	"text/richtext": ["rtx"],
	"text/rtf": ["*rtf"],
	"text/sgml": ["sgml", "sgm"],
	"text/shex": ["shex"],
	"text/slim": ["slim", "slm"],
	"text/spdx": ["spdx"],
	"text/stylus": ["stylus", "styl"],
	"text/tab-separated-values": ["tsv"],
	"text/troff": [
		"t",
		"tr",
		"roff",
		"man",
		"me",
		"ms"
	],
	"text/turtle": ["ttl"],
	"text/uri-list": [
		"uri",
		"uris",
		"urls"
	],
	"text/vcard": ["vcard"],
	"text/vtt": ["vtt"],
	"text/wgsl": ["wgsl"],
	"text/xml": ["*xml"],
	"text/yaml": ["yaml", "yml"],
	"video/3gpp": ["3gp", "3gpp"],
	"video/3gpp2": ["3g2"],
	"video/h261": ["h261"],
	"video/h263": ["h263"],
	"video/h264": ["h264"],
	"video/iso.segment": ["m4s"],
	"video/jpeg": ["jpgv"],
	"video/jpm": ["*jpm", "*jpgm"],
	"video/mj2": ["mj2", "mjp2"],
	"video/mp2t": [
		"ts",
		"m2t",
		"m2ts",
		"mts"
	],
	"video/mp4": [
		"mp4",
		"mp4v",
		"mpg4"
	],
	"video/mpeg": [
		"mpeg",
		"mpg",
		"mpe",
		"m1v",
		"m2v"
	],
	"video/ogg": ["ogv"],
	"video/quicktime": ["qt", "mov"],
	"video/webm": ["webm"]
};
Object.freeze(types);
var __classPrivateFieldGet = function(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType;
var _Mime_typeToExtension;
var _Mime_typeToExtensions;
var Mime = class {
	constructor(...args) {
		_Mime_extensionToType.set(this, /* @__PURE__ */ new Map());
		_Mime_typeToExtension.set(this, /* @__PURE__ */ new Map());
		_Mime_typeToExtensions.set(this, /* @__PURE__ */ new Map());
		for (const arg of args) this.define(arg);
	}
	define(typeMap, force = false) {
		for (let [type, extensions] of Object.entries(typeMap)) {
			type = type.toLowerCase();
			extensions = extensions.map((ext) => ext.toLowerCase());
			let allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
			if (!allExtensions) {
				allExtensions = /* @__PURE__ */ new Set();
				__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, allExtensions);
			}
			let first = true;
			for (let extension of extensions) {
				const starred = extension.startsWith("*");
				extension = starred ? extension.slice(1) : extension;
				allExtensions.add(extension);
				if (first) __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
				first = false;
				if (starred) continue;
				const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
				if (currentType && currentType != type && !force) throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
				__classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
			}
		}
		return this;
	}
	getType(path) {
		if (typeof path !== "string") return null;
		const last = path.replace(/^.*[/\\]/s, "").toLowerCase();
		const ext = last.replace(/^.*\./s, "").toLowerCase();
		const hasPath = last.length < path.length;
		if (!(ext.length < last.length - 1) && hasPath) return null;
		return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
	}
	getExtension(type) {
		if (typeof type !== "string") return null;
		type = type?.split?.(";")[0];
		return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null;
	}
	getAllExtensions(type) {
		if (typeof type !== "string") return null;
		type = type.split(";")[0].trim().toLowerCase();
		const extensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
		return extensions ? new Set(extensions) : null;
	}
	_freeze() {
		this.define = () => {
			throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
		};
		Object.freeze(this);
		return this;
	}
	_getTestState() {
		return {
			types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
			extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
		};
	}
};
_Mime_extensionToType = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtension = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtensions = /* @__PURE__ */ new WeakMap();
var src_default = new Mime(types, types$1)._freeze();
function hash(input, length = 16) {
	return createHash("sha256").update(input).digest("hex").slice(0, length);
}
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
async function compressPublicAssets(nitro) {
	const publicFiles = await glob("**", {
		cwd: nitro.options.output.publicDir,
		absolute: false,
		dot: true,
		ignore: [
			"**/*.gz",
			"**/*.br",
			"**/*.zst"
		]
	});
	await Promise.all(publicFiles.map(async (fileName) => {
		const compressPublicAssets = nitro.options.compressPublicAssets;
		if (compressPublicAssets === false) return;
		const { gzip = false, brotli = false, zstd = false } = compressPublicAssets === true ? {
			gzip: true,
			brotli: true,
			zstd: true
		} : compressPublicAssets;
		const zstdSupported = zlib.zstdCompress !== void 0;
		const filePath = resolve$2(nitro.options.output.publicDir, fileName);
		if (!isCompressibleFile(fileName)) return;
		const mimeType = src_default.getType(fileName) || "text/plain";
		if (gzip && existsSync(filePath + EncodingMap.gzip) || brotli && existsSync(filePath + EncodingMap.br) || zstd && zstdSupported && existsSync(filePath + EncodingMap.zstd)) return;
		const { size } = await fs$1.stat(filePath);
		if (size < 1024) return;
		const fileContents = await fs$1.readFile(filePath);
		const encodings = [
			gzip && "gzip",
			brotli && "br",
			zstd && zstdSupported && "zstd"
		].filter((v) => v !== false);
		await Promise.all(encodings.map(async (encoding) => {
			const suffix = EncodingMap[encoding];
			const compressedPath = filePath + suffix;
			if (existsSync(compressedPath)) return;
			const brotliOptions = {
				[zlib.constants.BROTLI_PARAM_MODE]: isTextMime(mimeType) ? zlib.constants.BROTLI_MODE_TEXT : zlib.constants.BROTLI_MODE_GENERIC,
				[zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_DEFAULT_QUALITY,
				[zlib.constants.BROTLI_PARAM_SIZE_HINT]: fileContents.length
			};
			const compressedBuff = await new Promise((resolve, reject) => {
				const cb = (error, result) => error ? reject(error) : resolve(result);
				if (encoding === "gzip") zlib.gzip(fileContents, cb);
				else if (encoding === "br") zlib.brotliCompress(fileContents, brotliOptions, cb);
				else if (zstdSupported) zlib.zstdCompress(fileContents, cb);
			});
			await fs$1.writeFile(compressedPath, compressedBuff);
		}));
	}));
}
function isCompressibleFile(fileName) {
	return !fileName.endsWith(".map") && isCompressibleMime(src_default.getType(fileName) || "text/plain");
}
function isTextMime(mimeType) {
	return /text|javascript|json|xml/.test(mimeType);
}
var COMPRESSIBLE_MIMES_RE = /* @__PURE__ */ new Set([
	"application/dash+xml",
	"application/eot",
	"application/font",
	"application/font-sfnt",
	"application/javascript",
	"application/json",
	"application/opentype",
	"application/otf",
	"application/pdf",
	"application/pkcs7-mime",
	"application/protobuf",
	"application/rss+xml",
	"application/truetype",
	"application/ttf",
	"application/vnd.apple.mpegurl",
	"application/vnd.mapbox-vector-tile",
	"application/vnd.ms-fontobject",
	"application/wasm",
	"application/xhtml+xml",
	"application/xml",
	"application/x-font-opentype",
	"application/x-font-truetype",
	"application/x-font-ttf",
	"application/x-httpd-cgi",
	"application/x-javascript",
	"application/x-mpegurl",
	"application/x-opentype",
	"application/x-otf",
	"application/x-perl",
	"application/x-ttf",
	"font/eot",
	"font/opentype",
	"font/otf",
	"font/ttf",
	"image/svg+xml",
	"text/css",
	"text/csv",
	"text/html",
	"text/javascript",
	"text/js",
	"text/plain",
	"text/richtext",
	"text/tab-separated-values",
	"text/xml",
	"text/x-component",
	"text/x-java-source",
	"text/x-script",
	"vnd.apple.mpegurl"
]);
function isCompressibleMime(mimeType) {
	return COMPRESSIBLE_MIMES_RE.has(mimeType);
}
var EntryTypes = {
	FILE_TYPE: "files",
	DIR_TYPE: "directories",
	FILE_DIR_TYPE: "files_directories",
	EVERYTHING_TYPE: "all"
};
var defaultOptions = {
	root: ".",
	fileFilter: (_entryInfo) => true,
	directoryFilter: (_entryInfo) => true,
	type: EntryTypes.FILE_TYPE,
	lstat: false,
	depth: 2147483648,
	alwaysStat: false,
	highWaterMark: 256
};
Object.freeze(defaultOptions);
var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set([
	"ENOENT",
	"EPERM",
	"EACCES",
	"ELOOP",
	RECURSIVE_ERROR_CODE
]);
var ALL_TYPES = [
	EntryTypes.DIR_TYPE,
	EntryTypes.EVERYTHING_TYPE,
	EntryTypes.FILE_DIR_TYPE,
	EntryTypes.FILE_TYPE
];
var DIR_TYPES = /* @__PURE__ */ new Set([
	EntryTypes.DIR_TYPE,
	EntryTypes.EVERYTHING_TYPE,
	EntryTypes.FILE_DIR_TYPE
]);
var FILE_TYPES = /* @__PURE__ */ new Set([
	EntryTypes.EVERYTHING_TYPE,
	EntryTypes.FILE_DIR_TYPE,
	EntryTypes.FILE_TYPE
]);
var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
var wantBigintFsStats = process.platform === "win32";
var emptyFn = (_entryInfo) => true;
var normalizeFilter = (filter) => {
	if (filter === void 0) return emptyFn;
	if (typeof filter === "function") return filter;
	if (typeof filter === "string") {
		const fl = filter.trim();
		return (entry) => entry.basename === fl;
	}
	if (Array.isArray(filter)) {
		const trItems = filter.map((item) => item.trim());
		return (entry) => trItems.some((f) => entry.basename === f);
	}
	return emptyFn;
};
var ReaddirpStream = class extends Readable {
	parents;
	reading;
	parent;
	_stat;
	_maxDepth;
	_wantsDir;
	_wantsFile;
	_wantsEverything;
	_root;
	_isDirent;
	_statsProp;
	_rdOptions;
	_fileFilter;
	_directoryFilter;
	_relStart;
	constructor(options = {}) {
		super({
			objectMode: true,
			autoDestroy: true,
			highWaterMark: options.highWaterMark ?? defaultOptions.highWaterMark
		});
		const opts = {
			...defaultOptions,
			...options
		};
		const root = opts.root ?? defaultOptions.root;
		const type = opts.type ?? defaultOptions.type;
		this._fileFilter = normalizeFilter(opts.fileFilter);
		this._directoryFilter = normalizeFilter(opts.directoryFilter);
		const statMethod = opts.lstat ? lstat : stat$1;
		if (wantBigintFsStats) this._stat = (path) => statMethod(path, { bigint: true });
		else this._stat = statMethod;
		this._maxDepth = opts.depth != null && Number.isSafeInteger(opts.depth) ? opts.depth : defaultOptions.depth;
		this._wantsDir = DIR_TYPES.has(type);
		this._wantsFile = FILE_TYPES.has(type);
		this._wantsEverything = type === EntryTypes.EVERYTHING_TYPE;
		this._root = resolve(root);
		this._relStart = this._root.endsWith(sep) ? this._root.length : this._root.length + 1;
		this._isDirent = !opts.alwaysStat;
		this._statsProp = this._isDirent ? "dirent" : "stats";
		this._rdOptions = {
			encoding: "utf8",
			withFileTypes: this._isDirent
		};
		const rootDir = {
			path: this._root,
			depth: 1
		};
		rootDir.pending = this._exploreDir(this._root, 1);
		this.parents = [rootDir];
		this.reading = false;
		this.parent = void 0;
	}
	async _read(batch) {
		if (this.reading) return;
		this.reading = true;
		try {
			while (!this.destroyed && batch > 0) {
				const par = this.parent;
				const fil = par && par.files;
				if (fil && fil.length > 0) {
					const { path, depth } = par;
					const slice = fil.splice(0, batch).map((dirent) => this._formatEntry(dirent, path));
					const awaited = this._isDirent ? slice : await Promise.all(slice);
					for (const entry of awaited) {
						if (!entry) continue;
						if (this.destroyed) return;
						let entryType = this._getEntryType(entry);
						if (typeof entryType !== "string") entryType = await entryType;
						if (entryType === "directory" && this._directoryFilter(entry)) {
							if (depth <= this._maxDepth) this.parents.push({
								path: entry.fullPath,
								depth: depth + 1
							});
							if (this._wantsDir) {
								this.push(entry);
								batch--;
							}
						} else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
							if (this._wantsFile) {
								this.push(entry);
								batch--;
							}
						}
					}
				} else {
					const parent = this.parents.pop();
					if (!parent) {
						this.push(null);
						break;
					}
					const dir = parent.pending ?? this._exploreDir(parent.path, parent.depth);
					const next = this.parents[this.parents.length - 1];
					if (next && !next.pending) next.pending = this._exploreDir(next.path, next.depth);
					this.parent = await dir;
					if (this.destroyed) return;
				}
			}
		} catch (error) {
			this.destroy(error);
		} finally {
			this.reading = false;
		}
	}
	async _exploreDir(path, depth) {
		let files;
		try {
			files = await readdir(path, this._rdOptions);
		} catch (error) {
			this._onError(error);
		}
		return {
			files,
			depth,
			path
		};
	}
	_formatEntry(dirent, path) {
		const basename = this._isDirent ? dirent.name : dirent;
		const fullPath = join(path, basename);
		const entry = {
			path: fullPath.slice(this._relStart),
			fullPath,
			basename
		};
		if (this._isDirent) {
			entry.dirent = dirent;
			return entry;
		}
		return this._stat(fullPath).then((stats) => {
			entry.stats = stats;
			return entry;
		}, (err) => {
			this._onError(err);
		});
	}
	_onError(err) {
		if (isNormalFlowError(err) && !this.destroyed) this.emit("warn", err);
		else this.destroy(err);
	}
	_getEntryType(entry) {
		if (!entry || !(this._statsProp in entry)) return "";
		const stats = entry[this._statsProp];
		if (stats.isFile()) return "file";
		if (stats.isDirectory()) return "directory";
		if (stats.isSymbolicLink()) return this._getSymlinkEntryType(entry);
		return "";
	}
	async _getSymlinkEntryType(entry) {
		const full = entry.fullPath;
		try {
			const entryRealPath = await realpath(full);
			const entryRealPathStats = await lstat(entryRealPath);
			if (entryRealPathStats.isFile()) return "file";
			if (entryRealPathStats.isDirectory()) {
				const len = entryRealPath.length;
				if (full.startsWith(entryRealPath) && full[len] === sep) {
					const recursiveError = /* @__PURE__ */ new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
					recursiveError.code = RECURSIVE_ERROR_CODE;
					this._onError(recursiveError);
					return "";
				}
				return "directory";
			}
		} catch (error) {
			this._onError(error);
		}
		return "";
	}
	_includeAsFile(entry) {
		const stats = entry && entry[this._statsProp];
		return stats && this._wantsEverything && !stats.isDirectory();
	}
};
function readdirp(root, options = {}) {
	let type = options.entryType || options.type;
	if (type === "both") type = EntryTypes.FILE_DIR_TYPE;
	if (!root) throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
	else if (typeof root !== "string") throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
	else if (type && !ALL_TYPES.includes(type)) throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
	const opts = {
		...options,
		root
	};
	if (type) opts.type = type;
	return new ReaddirpStream(opts);
}
var platform = process.platform;
var isWindows = platform === "win32";
var isMacos = platform === "darwin";
var isLinux = platform === "linux";
var isIBMi = type() === "OS400";
function errorCode(error) {
	return error?.code;
}
function classifyError(error) {
	const code = errorCode(error);
	if (code === "ENOENT" || code === "ENOTDIR") return "missing";
	if (code === "EPERM" || code === "EACCES") return "permission";
	if (code === "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM") return "recursive-unsupported";
	return "other";
}
function isMissingError(error) {
	return classifyError(error) === "missing";
}
function isPermissionError(error) {
	return classifyError(error) === "permission";
}
function isRecursiveWatchUnsupported(error) {
	return classifyError(error) === "recursive-unsupported";
}
var systemScheduler = Object.freeze({
	now: () => Date.now(),
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timer) => {
		if (timer) clearTimeout(timer);
	}
});
var EVENTS = {
	ALL: "all",
	READY: "ready",
	ADD: "add",
	CHANGE: "change",
	ADD_DIR: "addDir",
	UNLINK: "unlink",
	UNLINK_DIR: "unlinkDir",
	RAW: "raw",
	ERROR: "error"
};
var BACK_SLASH_RE = /\\/g;
var DOUBLE_SLASH_RE = /\/\//g;
function normalizePath$1(path) {
	if (typeof path !== "string") throw new TypeError("string expected");
	const unix = path.replace(BACK_SLASH_RE, "/");
	const unc = unix.startsWith("//");
	let normalized = sp.normalize(unix).replace(BACK_SLASH_RE, "/").replace(DOUBLE_SLASH_RE, "/");
	if (unc && !normalized.startsWith("//")) normalized = `/${normalized}`;
	return normalized;
}
function statIdentity(stats) {
	if (typeof stats.mtimeMs !== "bigint") return stats;
	const big = stats;
	const sec = big.mtimeNs / 1000000000n;
	const nsec = big.mtimeNs % 1000000000n;
	const mtimeMs = Number(sec) * 1e3 + Number(nsec) / 1e6;
	return {
		size: Number(big.size),
		mtimeMs,
		ino: Number(big.ino)
	};
}
function logicalPathKey(path) {
	const resolved = sp.resolve(path);
	return isWindows || !resolved.includes("\\") ? resolved.replace(BACK_SLASH_RE, "/") : normalizePath$1(resolved);
}
function isInsideRelativePath(relative) {
	return relative !== ".." && !relative.startsWith(`..${sp.sep}`) && !sp.isAbsolute(relative);
}
function isSameOrInside(root, candidate) {
	const relative = sp.relative(root, candidate);
	return relative === "" || isInsideRelativePath(relative);
}
function isStrictlyInside(root, candidate) {
	const relative = sp.relative(root, candidate);
	return relative !== "" && isInsideRelativePath(relative);
}
function isMatcherObject(matcher) {
	return typeof matcher === "object" && matcher !== null && !(matcher instanceof RegExp);
}
function cloneOwnedMatcher(matcher) {
	if (matcher instanceof RegExp) return new RegExp(matcher.source, matcher.flags);
	if (isMatcherObject(matcher)) return Object.freeze({ ...matcher });
	return matcher;
}
function compileMatcher(matcher) {
	if (typeof matcher === "function") return matcher;
	if (typeof matcher === "string") return (candidate) => matcher === candidate;
	if (matcher instanceof RegExp) return (candidate) => {
		matcher.lastIndex = 0;
		return matcher.test(candidate);
	};
	if (isMatcherObject(matcher)) return (candidate) => matcher.path === candidate || Boolean(matcher.recursive && isStrictlyInside(matcher.path, candidate));
	return () => false;
}
function compileMatchers(matchers) {
	const patterns = matchers.map(compileMatcher);
	return (candidate, stats) => {
		if (patterns.length === 0) return false;
		const normalized = normalizePath$1(candidate);
		return patterns.some((pattern) => pattern(normalized, stats));
	};
}
function normalizeMatcher(matcher, cwd = process.cwd()) {
	if (typeof matcher === "string") return normalizePath$1(sp.isAbsolute(matcher) ? matcher : sp.join(cwd, matcher));
	if (isMatcherObject(matcher)) return {
		path: normalizePath$1(sp.isAbsolute(matcher.path) ? matcher.path : sp.join(cwd, matcher.path)),
		recursive: matcher.recursive
	};
	return matcher;
}
var REPLACER_RE = /^\.[/\\]/;
var WatchHelper = class WatchHelper {
	watchPath;
	followSymlinks;
	recursiveRoot;
	recursiveDisabled;
	observationTrigger;
	realpathAncestry;
	pathGeneration;
	context;
	constructor(path, follow, context) {
		this.context = context;
		this.watchPath = path.replace(REPLACER_RE, "");
		this.followSymlinks = follow;
		this.realpathAncestry = /* @__PURE__ */ new Set();
		this.pathGeneration = context.capturePathGeneration();
	}
	fork(path) {
		const helper = new WatchHelper(path, this.followSymlinks, this.context);
		helper.recursiveRoot = this.recursiveRoot;
		helper.recursiveDisabled = this.recursiveDisabled;
		helper.observationTrigger = this.observationTrigger;
		helper.realpathAncestry = new Set(this.realpathAncestry);
		helper.pathGeneration = this.pathGeneration;
		return helper;
	}
	withObservation(trigger) {
		const helper = Object.create(this);
		helper.observationTrigger = trigger;
		return helper;
	}
	filterPath(entry) {
		return entry.stats?.isSymbolicLink() ? this.filterDir(entry) : this.context.isntIgnored(sp.join(this.watchPath, entry.path), entry.stats);
	}
	filterDir(entry) {
		return this.context.isntIgnored(sp.join(this.watchPath, entry.path), entry.stats);
	}
};
var nextGeneration = 0;
function allocateSharedResourceGeneration() {
	return ++nextGeneration;
}
function attachSharedSubscriber(resource, subscriber) {
	if (resource.closed) return false;
	resource.subscribers.add(subscriber);
	return true;
}
function detachSharedSubscriber(resource, subscriber) {
	if (resource.closed || !resource.subscribers.delete(subscriber)) return;
	return resource.subscribers.size > 0 ? "remaining" : "last";
}
function invalidateSharedResource(resource) {
	if (resource.closed) return;
	resource.closed = true;
	const subscribers = [...resource.subscribers];
	resource.subscribers.clear();
	return subscribers;
}
function reconfigureWatcherPersistence(resource) {
	if ([...resource.subscribers].some((subscriber) => subscriber.persistent)) resource.watcher.ref();
	else resource.watcher.unref();
}
function invalidateWatcherResource(resource, registry) {
	const subscribers = invalidateSharedResource(resource);
	if (!subscribers) return;
	if (registry.get(resource.resource) === resource) registry.delete(resource.resource);
	resource.watcher.close();
	return subscribers;
}
function attachWatcherSubscriber(resource, subscriber) {
	attachSharedSubscriber(resource, subscriber);
	reconfigureWatcherPersistence(resource);
}
function createWatcherSubscription(resource, subscriber, registry) {
	let closed = false;
	return {
		resource: resource.resource,
		close: () => {
			if (closed) return;
			closed = true;
			const remaining = detachSharedSubscriber(resource, subscriber);
			if (remaining === "remaining") reconfigureWatcherPersistence(resource);
			else if (remaining === "last" && registry.get(resource.resource) === resource) invalidateWatcherResource(resource, registry);
		}
	};
}
function selectBackend(options) {
	const preferRecursive = options.backend === "native-recursive" || options.backend === "auto" && (isMacos || isWindows);
	const kind = options.backend === "polling" ? "polling" : preferRecursive && options.depth === void 0 ? "native-recursive-preferred" : "native-per-directory";
	return Object.freeze({
		kind,
		polling: kind === "polling",
		recursive: kind === "native-recursive-preferred",
		perDirectory: kind === "native-per-directory"
	});
}
var EV$1 = EVENTS;
var POLL_DIRECTORY_RECHECK_DELAY = 1e3;
function backendNow() {
	return performance.now();
}
function toNativeWatchPath(path) {
	const nativePath = sp.normalize(path);
	if (!isWindows) return nativePath;
	try {
		return realpathSync.native(nativePath);
	} catch {
		return nativePath;
	}
}
function projectNativeRelativePath(nativeRoot, relativePath) {
	if (!isWindows || relativePath === null || !sp.isAbsolute(relativePath)) return relativePath;
	const root = sp.normalize(sp.toNamespacedPath(nativeRoot));
	const candidate = sp.normalize(sp.toNamespacedPath(relativePath));
	const projected = sp.relative(root, candidate);
	if (!isSameOrInside(root, candidate)) return relativePath;
	return projected || null;
}
var FsWatchInstances = /* @__PURE__ */ new Map();
function systemNativeWatchFactory(path, options, listener) {
	return watch(path, options, listener);
}
var nativeWatchFactory = systemNativeWatchFactory;
var RecursiveWatchInstances = /* @__PURE__ */ new Map();
var recursiveWatchUnsupported = false;
function systemRecursiveWatchFactory(path, options, listener) {
	return watch(path, options, listener);
}
var recursiveWatchFactory = systemRecursiveWatchFactory;
function failRecursiveResource(resource, error) {
	const subscribers = invalidateWatcherResource(resource, RecursiveWatchInstances);
	if (!subscribers) return;
	subscribers.forEach((subscriber) => subscriber.failure(error));
}
function subscribeRecursiveNative(path, persistent, handlers, signal) {
	if (recursiveWatchUnsupported) return { kind: "unsupported" };
	const resourceKey = sp.resolve(path);
	const subscriber = {
		...handlers,
		watchedPath: path,
		persistent
	};
	let resource = RecursiveWatchInstances.get(resourceKey);
	if (!resource) {
		let watcher;
		let created;
		const nativePath = toNativeWatchPath(path);
		try {
			watcher = recursiveWatchFactory(nativePath, {
				persistent,
				recursive: true
			}, (rawEvent, relativePath) => {
				const active = created;
				if (!active || active.closed) return;
				if (RecursiveWatchInstances.get(resourceKey) !== active) return;
				const trigger = {
					kind: "native",
					resource: resourceKey,
					rawEvent,
					relativePath: projectNativeRelativePath(nativePath, relativePath),
					sequence: ++active.sequence,
					observedAt: backendNow()
				};
				active.subscribers.forEach((current) => {
					current.rawEmitter(rawEvent, relativePath, { watchedPath: current.watchedPath });
					current.publish(trigger);
				});
			});
		} catch (error) {
			if (isRecursiveWatchUnsupported(error)) {
				recursiveWatchUnsupported = true;
				return { kind: "unsupported" };
			}
			return {
				kind: "failed",
				error
			};
		}
		created = resource = {
			resource: resourceKey,
			generation: allocateSharedResourceGeneration(),
			subscribers: /* @__PURE__ */ new Set(),
			closed: false,
			watcher,
			sequence: 0
		};
		RecursiveWatchInstances.set(resourceKey, resource);
		watcher.on(EV$1.ERROR, (error) => failRecursiveResource(resource, error));
	}
	attachWatcherSubscriber(resource, subscriber);
	const subscription = createWatcherSubscription(resource, subscriber, RecursiveWatchInstances);
	if (signal.aborted) subscription.close();
	return {
		kind: "subscribed",
		subscription
	};
}
function createFsWatchInstance(path, options, listener, errHandler) {
	try {
		return nativeWatchFactory(path, { persistent: options.persistent }, listener);
	} catch (error) {
		errHandler(error);
		return;
	}
}
function publishNativeTrigger(cont, rawEvent, relativePath, emitRaw, rawRelativePath = relativePath) {
	if (cont.closed || FsWatchInstances.get(cont.resource) !== cont) return;
	const trigger = {
		kind: "native",
		resource: cont.resource,
		rawEvent,
		relativePath,
		sequence: ++cont.sequence,
		observedAt: backendNow()
	};
	cont.subscribers.forEach((subscriber) => {
		if (emitRaw) subscriber.rawEmitter(rawEvent, rawRelativePath, { watchedPath: subscriber.watchedPath });
		subscriber.publish(trigger);
	});
}
function broadcastNativeError(cont, error) {
	if (cont.closed || FsWatchInstances.get(cont.resource) !== cont) return;
	cont.subscribers.forEach((subscriber) => subscriber.errHandler(error));
}
function closeFailedNativeResource(cont, error) {
	invalidateWatcherResource(cont, FsWatchInstances)?.forEach((subscriber) => subscriber.failure?.(error));
}
async function handleNativeError(path, cont, error) {
	if (isWindows && error.code === "EPERM") try {
		await (await open(path, "r")).close();
		broadcastNativeError(cont, error);
	} catch {
		publishNativeTrigger(cont, "rename", null, false);
	}
	else broadcastNativeError(cont, error);
	closeFailedNativeResource(cont, error);
}
async function retireIfSelfRemoved(cont, nativePath) {
	try {
		await lstat(sp.join(nativePath, sp.basename(nativePath)));
		return;
	} catch (error) {
		if (!isMissingError(error)) return;
	}
	try {
		if (!(await stat$1(nativePath)).isDirectory()) return;
	} catch {
		return;
	}
	if (cont.closed || FsWatchInstances.get(cont.resource) !== cont) return;
	closeFailedNativeResource(cont, /* @__PURE__ */ new Error(`Watched directory was replaced: ${nativePath}`));
}
function createNativeContainer(path, nativePath, resourceKey, options, subscriber) {
	let cont;
	const watcher = createFsWatchInstance(nativePath, options, (rawEvent, relativePath) => {
		const projectedPath = projectNativeRelativePath(nativePath, relativePath);
		publishNativeTrigger(cont, rawEvent, projectedPath, true, relativePath);
		if (isLinux && rawEvent === "rename" && relativePath === sp.basename(nativePath)) retireIfSelfRemoved(cont, nativePath);
	}, subscriber.errHandler);
	if (!watcher) return;
	cont = {
		resource: resourceKey,
		generation: allocateSharedResourceGeneration(),
		subscribers: /* @__PURE__ */ new Set([subscriber]),
		closed: false,
		watcher,
		sequence: 0
	};
	FsWatchInstances.set(resourceKey, cont);
	watcher.on(EV$1.ERROR, (error) => {
		handleNativeError(path, cont, error);
	});
	return cont;
}
function setFsWatchListener(path, fullPath, options, handlers, signal) {
	const resourceKey = fullPath;
	const subscriber = {
		...handlers,
		watchedPath: path,
		persistent: options.persistent ?? true
	};
	let cont = FsWatchInstances.get(resourceKey);
	if (cont) attachWatcherSubscriber(cont, subscriber);
	else {
		cont = createNativeContainer(path, toNativeWatchPath(path), resourceKey, options, subscriber);
		if (!cont) return;
	}
	const subscription = createWatcherSubscription(cont, subscriber, FsWatchInstances);
	if (signal.aborted) {
		subscription.close();
		return;
	}
	return subscription;
}
var MISSING_POLL_OBSERVATION = Object.freeze({ missing: true });
var PollingInstances = /* @__PURE__ */ new Map();
function isMissingObservation(observation) {
	return "missing" in observation;
}
function observationsDiffer(previous, current) {
	const previousMissing = isMissingObservation(previous);
	const currentMissing = isMissingObservation(current);
	if (previousMissing || currentMissing) return previousMissing !== currentMissing;
	const reliableInodeChanged = !isWindows && previous.ino !== 0 && current.ino !== 0 && previous.ino !== current.ino;
	return previous.size !== current.size || previous.mtimeMs !== current.mtimeMs || reliableInodeChanged;
}
function setTimerPersistence(resource) {
	if (!resource.timer) return;
	if (resource.persistent) resource.timer.ref();
	else resource.timer.unref();
}
function schedulePoll(resource, delay = resource.interval) {
	if (resource.closed || resource.subscribers.size === 0) return;
	resource.timer = resource.scheduler.setTimeout(() => {
		resource.timer = void 0;
		const currentPoll = pollResource(resource);
		resource.currentPoll = currentPoll;
		currentPoll.then(() => {
			if (resource.currentPoll === currentPoll) resource.currentPoll = void 0;
		}, () => {
			if (resource.currentPoll === currentPoll) resource.currentPoll = void 0;
		});
	}, delay);
	setTimerPersistence(resource);
}
async function pollResource(resource) {
	if (resource.closed || resource.running || resource.subscribers.size === 0) return;
	resource.running = true;
	const startedAt = resource.scheduler.now();
	let current;
	try {
		current = await stat$1(resource.resource);
	} catch (error) {
		if (isMissingError(error)) current = MISSING_POLL_OBSERVATION;
		else resource.subscribers.forEach((subscriber) => subscriber.errHandler(error));
	}
	if (!resource.closed && current) {
		const previous = resource.previous;
		resource.previous = current;
		const now = resource.scheduler.now();
		const changed = previous && observationsDiffer(previous, current);
		const directoryReplayDue = resource.directoryReplayAt !== void 0 && now >= resource.directoryReplayAt;
		if (!isMissingObservation(current) && current.isDirectory()) {
			if (changed) resource.directoryReplayAt = now + POLL_DIRECTORY_RECHECK_DELAY;
			else if (directoryReplayDue) resource.directoryReplayAt = void 0;
		} else resource.directoryReplayAt = void 0;
		if (previous && (changed || directoryReplayDue)) {
			const trigger = {
				kind: "poll",
				resource: resource.resource,
				current,
				previous,
				sequence: ++resource.sequence,
				observedAt: resource.scheduler.now()
			};
			resource.subscribers.forEach((subscriber) => {
				subscriber.rawEmitter(EV$1.CHANGE, resource.resource, {
					current,
					previous
				});
				subscriber.publish(trigger);
			});
		}
	}
	resource.running = false;
	if (!resource.closed && resource.subscribers.size > 0) {
		const elapsed = resource.scheduler.now() - startedAt;
		schedulePoll(resource, Math.max(0, resource.interval - elapsed));
	}
}
function reconfigurePollResource(resource) {
	if (resource.closed || resource.subscribers.size === 0) return;
	const interval = Math.min(...[...resource.subscribers].map((subscriber) => subscriber.interval));
	const persistent = [...resource.subscribers].some((subscriber) => subscriber.persistent);
	const intervalChanged = resource.interval !== interval;
	resource.interval = interval;
	resource.persistent = persistent;
	if (resource.timer && intervalChanged) {
		resource.scheduler.clearTimeout(resource.timer);
		resource.timer = void 0;
		schedulePoll(resource);
	} else if (resource.timer) setTimerPersistence(resource);
	else if (!resource.running) schedulePoll(resource);
}
function setPollingListener(path, fullPath, options, scheduler, handlers, initialStats, signal) {
	const resourceKey = fullPath;
	const subscriber = {
		watchedPath: path,
		...options,
		...handlers
	};
	let resources = PollingInstances.get(resourceKey);
	if (!resources) {
		resources = /* @__PURE__ */ new Map();
		PollingInstances.set(resourceKey, resources);
	}
	let resource = resources.get(scheduler);
	if (!resource) {
		resource = {
			resource: resourceKey,
			generation: allocateSharedResourceGeneration(),
			scheduler,
			subscribers: /* @__PURE__ */ new Set(),
			interval: options.interval,
			persistent: options.persistent,
			previous: initialStats,
			running: false,
			closed: false,
			sequence: 0
		};
		resources.set(scheduler, resource);
	} else if (!resource.previous && initialStats) resource.previous = initialStats;
	resource.subscribers.add(subscriber);
	reconfigurePollResource(resource);
	let closed = false;
	let closePromise;
	const subscription = {
		resource: resourceKey,
		close: () => {
			if (closePromise) return closePromise;
			closePromise = (async () => {
				if (closed) return;
				closed = true;
				resource.subscribers.delete(subscriber);
				if (resource.subscribers.size > 0) {
					reconfigurePollResource(resource);
					return;
				}
				if (resource.closed) return;
				resource.closed = true;
				if (resource.timer) resource.scheduler.clearTimeout(resource.timer);
				resource.timer = void 0;
				const currentResources = PollingInstances.get(resourceKey);
				if (currentResources?.get(scheduler) === resource) {
					currentResources.delete(scheduler);
					if (currentResources.size === 0) PollingInstances.delete(resourceKey);
				}
				if (resource.currentPoll) await Promise.allSettled([resource.currentPoll]);
			})();
			return closePromise;
		}
	};
	if (signal.aborted) {
		subscription.close();
		return;
	}
	return subscription;
}
var LifecycleScope = class {
	state = "OPEN";
	generation = 0;
	abortController = new AbortController();
	tasks = /* @__PURE__ */ new Set();
	closers = /* @__PURE__ */ new Map();
	onTaskSettled;
	onTaskError;
	constructor(onTaskSettled, onTaskError) {
		this.onTaskSettled = onTaskSettled;
		this.onTaskError = onTaskError;
	}
	isActive(generation) {
		return this.state === "OPEN" && this.generation === generation;
	}
	track(task) {
		const tracked = Promise.resolve(task).finally(() => {
			this.tasks.delete(tracked);
			this.onTaskSettled();
		});
		this.tasks.add(tracked);
		tracked.catch(this.onTaskError);
		return tracked;
	}
	addCloser(key, closer) {
		const existing = this.closers.get(key);
		if (existing) existing.push(closer);
		else this.closers.set(key, [closer]);
	}
	takeClosers(key) {
		const closers = this.closers.get(key) ?? [];
		this.closers.delete(key);
		return closers;
	}
	beginClose() {
		if (this.state !== "OPEN") return [];
		this.state = "CLOSING";
		this.generation += 1;
		this.abortController.abort();
		const closing = [];
		this.closers.forEach((closers) => {
			closers.forEach((closer) => {
				try {
					closing.push(Promise.resolve(closer()));
				} catch (error) {
					closing.push(Promise.reject(error));
				}
			});
		});
		this.closers.clear();
		return closing;
	}
	async drain() {
		while (this.tasks.size > 0) await Promise.allSettled([...this.tasks]);
	}
	finishClose() {
		this.state = "CLOSED";
	}
};
function IGNORE_RECONCILIATION_ERROR() {}
function resolveRecursiveCandidate(root, relativePath) {
	if (sp.isAbsolute(relativePath)) return;
	const absoluteRoot = sp.resolve(root);
	if (!isSameOrInside(absoluteRoot, sp.resolve(absoluteRoot, relativePath))) return;
	return sp.join(root, relativePath);
}
var ReconciliationQueue = class {
	queues = /* @__PURE__ */ new Map();
	pending = /* @__PURE__ */ new Map();
	lifecycle;
	constructor(lifecycle) {
		this.lifecycle = lifecycle;
	}
	enqueue(scope, work, coalescePath = scope) {
		const key = logicalPathKey(scope);
		const pendingKey = coalescePath === false ? void 0 : `${key}\0${logicalPathKey(coalescePath)}`;
		const existing = pendingKey ? this.pending.get(pendingKey) : void 0;
		if (existing) {
			existing.work = work;
			existing.replay = true;
			return existing.promise;
		}
		const generation = this.lifecycle.generation;
		const reconciliation = {
			promise: Promise.resolve(),
			work,
			replay: false
		};
		const task = (this.queues.get(key) ?? Promise.resolve()).catch(IGNORE_RECONCILIATION_ERROR).then(async () => {
			do {
				const currentWork = reconciliation.work;
				reconciliation.replay = false;
				if (!this.lifecycle.isActive(generation)) return;
				await currentWork();
			} while (reconciliation.replay);
		}).finally(() => {
			if (this.queues.get(key) === task) this.queues.delete(key);
			if (pendingKey && this.pending.get(pendingKey) === reconciliation) this.pending.delete(pendingKey);
		});
		this.queues.set(key, task);
		const tracked = this.lifecycle.track(task);
		reconciliation.promise = tracked;
		if (pendingKey) this.pending.set(pendingKey, reconciliation);
		return tracked;
	}
	forgetPending(predicate) {
		for (const key of this.pending.keys()) {
			const [scope, candidate] = key.split("\0", 2);
			if (predicate(scope, candidate)) this.pending.delete(key);
		}
	}
	clear() {
		this.queues.clear();
		this.pending.clear();
	}
};
var CURRENT = ".";
var PARENT = "..";
var RECURSIVE_CREATE_BURST_WINDOW = 25;
var RECURSIVE_WRITE_BURST_WINDOW = 10;
var INITIAL_OBSERVATION_FACT = Object.freeze({
	size: 0,
	mtimeMs: 0,
	ino: 0,
	kind: "other",
	initialRecursive: true
});
function statKind(stats) {
	return stats.isSymbolicLink() ? "symlink" : stats.isDirectory() ? "directory" : stats.isFile() ? "file" : "other";
}
function sameStatFact(fact, stats) {
	const current = statIdentity(stats);
	return fact?.size === current.size && fact.mtimeMs === current.mtimeMs && fact.ino === current.ino && fact.kind === statKind(stats);
}
function withinWindow(fact, trigger, window) {
	return fact?.observedAt !== void 0 && trigger.observedAt >= fact.observedAt && trigger.observedAt - fact.observedAt <= window;
}
var DirEntry = class {
	path;
	items = /* @__PURE__ */ new Set();
	constructor(dir) {
		this.path = dir;
	}
	add(item) {
		if (item !== CURRENT && item !== PARENT && item !== "") this.items.add(item);
	}
	remove(item) {
		return this.items.delete(item) && this.items.size === 0;
	}
	has(item) {
		return this.items.has(item);
	}
	getChildren() {
		return [...this.items];
	}
	dispose() {
		this.items.clear();
		this.path = "";
	}
};
var TreeState = class {
	watched = /* @__PURE__ */ new Map();
	observed = /* @__PURE__ */ new Map();
	symlinkPaths = /* @__PURE__ */ new Map();
	recursiveRoots = /* @__PURE__ */ new Set();
	observesNative;
	constructor(observesNative) {
		this.observesNative = observesNative;
	}
	getDirectory(directory) {
		const dir = sp.resolve(directory);
		const key = logicalPathKey(dir);
		let entry = this.watched.get(key);
		if (!entry) {
			entry = new DirEntry(dir);
			this.watched.set(key, entry);
		}
		return entry;
	}
	peekDirectory(directory) {
		return this.watched.get(logicalPathKey(sp.resolve(directory)));
	}
	recordObserved(path, stats, transition, trigger, initialRecursive = false, retainWithoutTrigger = false) {
		if (!this.observesNative()) return;
		if (!trigger && !initialRecursive && !retainWithoutTrigger) return;
		const { size, mtimeMs, ino } = statIdentity(stats);
		this.observed.set(logicalPathKey(path), {
			size,
			mtimeMs,
			ino,
			kind: statKind(stats),
			transition,
			rawEvent: trigger?.rawEvent,
			relativePath: trigger?.relativePath,
			observedAt: trigger?.observedAt,
			initialRecursive
		});
	}
	consumeInitialCreate(path, stats, trigger, ignoreInitial) {
		if (!this.observed.get(logicalPathKey(path))?.initialRecursive || trigger.rawEvent !== "rename") return;
		this.recordObserved(path, stats, "add", trigger);
		if (!ignoreInitial) return false;
		return stats.isDirectory() ? EVENTS.ADD_DIR : EVENTS.ADD;
	}
	markInitialCreate(path) {
		const key = logicalPathKey(path);
		const fact = this.observed.get(key);
		if (fact) fact.initialRecursive = true;
		else this.observed.set(key, { ...INITIAL_OBSERVATION_FACT });
	}
	clearInitialCreate(path) {
		const fact = this.observed.get(logicalPathKey(path));
		if (fact) fact.initialRecursive = false;
	}
	clearInitialCreates(root) {
		const rootKey = logicalPathKey(root);
		for (const [path, fact] of this.observed) if (isSameOrInside(rootKey, path) && fact.initialRecursive) fact.initialRecursive = false;
	}
	replacedSinceObserved(path, stats) {
		const previous = this.observed.get(logicalPathKey(path));
		const { ino } = statIdentity(stats);
		return previous?.kind === "directory" && stats.isDirectory() && previous.ino !== 0 && ino !== 0 && previous.ino !== ino;
	}
	changedSinceObserved(path, stats) {
		const previous = this.observed.get(logicalPathKey(path));
		return previous !== void 0 && previous.kind === statKind(stats) && !sameStatFact(previous, stats);
	}
	isDuplicateObservation(path, stats, trigger) {
		const previous = this.observed.get(logicalPathKey(path));
		const sameFact = sameStatFact(previous, stats);
		const duplicateCreate = sameFact && previous?.transition === "add" && previous?.relativePath === trigger.relativePath && previous.rawEvent === "rename" && trigger.rawEvent === "change" && withinWindow(previous, trigger, RECURSIVE_CREATE_BURST_WINDOW);
		const duplicateUnchanged = sameFact && stats.isFile() && !previous?.initialRecursive && (previous?.transition === "add" || trigger.relativePath === null);
		const duplicateWrite = sameFact && previous?.transition === "change" && previous.relativePath === trigger.relativePath && withinWindow(previous, trigger, RECURSIVE_WRITE_BURST_WINDOW) && previous.rawEvent === trigger.rawEvent;
		const duplicate = duplicateUnchanged || duplicateCreate || duplicateWrite;
		const transition = duplicateWrite ? void 0 : duplicateUnchanged ? previous?.transition : "change";
		this.recordObserved(path, stats, transition, trigger);
		return duplicate;
	}
	dispose() {
		this.watched.forEach((entry) => entry.dispose());
		this.watched.clear();
		this.observed.clear();
		this.symlinkPaths.clear();
		this.recursiveRoots.clear();
	}
};
var EMPTY_FILE_HOLD = 10;
function isEmptyFile(stats) {
	return stats !== void 0 && stats.isFile() && statIdentity(stats).size === 0;
}
function sameChangeStats(left, right) {
	if (left === void 0 || right === void 0) return false;
	const a = statIdentity(left);
	const b = statIdentity(right);
	return a.size === b.size && a.mtimeMs === b.mtimeMs && a.ino === b.ino;
}
var EventPolicy = class {
	pendingWrites = /* @__PURE__ */ new Map();
	pendingUnlinks = /* @__PURE__ */ new Map();
	pendingChanges = /* @__PURE__ */ new Map();
	heldAdds = /* @__PURE__ */ new Map();
	throttled = /* @__PURE__ */ new Map();
	context;
	constructor(context) {
		this.context = context;
	}
	presentPath(path) {
		if (isWindows) path = sp.normalize(path);
		return this.context.options.cwd ? sp.relative(this.context.options.cwd, path) : path;
	}
	dropHeldAdd(logicalKey) {
		const held = this.heldAdds.get(logicalKey);
		if (held) this.context.scheduler.clearTimeout(held.timer);
		this.heldAdds.delete(logicalKey);
	}
	dropPendingChange(logicalKey) {
		const pending = this.pendingChanges.get(logicalKey);
		if (pending?.held) this.context.scheduler.clearTimeout(pending.held.timer);
		this.pendingChanges.delete(logicalKey);
	}
	setTimeout(callback, delay) {
		const timer = this.context.scheduler.setTimeout(callback, delay);
		if (!this.context.options.persistent) timer.unref();
		return timer;
	}
	async emit(event, path, stats) {
		if (this.context.isClosed()) return;
		const { options, scheduler } = this.context;
		const sourcePath = path;
		const logicalKey = logicalPathKey(path);
		const generation = this.context.lifecycle.generation;
		const pathGeneration = this.context.capturePathGeneration();
		path = this.presentPath(path);
		const args = [path];
		if (stats != null) args.push(stats);
		const heldAdd = this.heldAdds.get(logicalKey);
		if (heldAdd) {
			if (event === EVENTS.CHANGE) {
				heldAdd.path = sourcePath;
				if (stats) heldAdd.stats = stats;
				if (!isEmptyFile(stats)) heldAdd.release();
				return;
			}
			heldAdd.release();
		}
		if (event === EVENTS.UNLINK || event === EVENTS.UNLINK_DIR) {
			this.dropPendingChange(logicalKey);
			this.throttled.get(EVENTS.CHANGE)?.get(logicalKey)?.clear(false);
		}
		const awf = options.awaitWriteFinish;
		const pendingWrite = awf ? this.pendingWrites.get(logicalKey) : void 0;
		if (pendingWrite) {
			pendingWrite.lastChange = scheduler.now();
			return;
		}
		if (options.atomic) {
			if (event === EVENTS.UNLINK) {
				const existing = this.pendingUnlinks.get(logicalKey);
				if (existing) scheduler.clearTimeout(existing.timer);
				const entry = [event, ...args];
				const timer = this.setTimeout(() => {
					const pending = this.pendingUnlinks.get(logicalKey);
					if (!pending || pending.timer !== timer) return;
					this.pendingUnlinks.delete(logicalKey);
					if (this.context.isClosed()) return;
					const [pendingEvent, ...pendingArgs] = pending.event;
					this.context.publish(pendingEvent, pendingArgs);
				}, typeof options.atomic === "number" ? options.atomic : 100);
				this.pendingUnlinks.set(logicalKey, {
					event: entry,
					timer
				});
				return;
			}
			const pendingUnlink = this.pendingUnlinks.get(logicalKey);
			if (event === EVENTS.ADD && pendingUnlink) {
				event = EVENTS.CHANGE;
				scheduler.clearTimeout(pendingUnlink.timer);
				this.pendingUnlinks.delete(logicalKey);
			}
		}
		if (awf && (event === EVENTS.ADD || event === EVENTS.CHANGE) && this.context.isReady()) {
			const awfEmit = (error, currentStats) => {
				if (this.context.isClosed()) return;
				if (error) {
					event = EVENTS.ERROR;
					args[0] = error;
					this.context.publish(event, args);
				} else if (currentStats) {
					if (args.length > 1) args[1] = currentStats;
					else args.push(currentStats);
					this.context.publish(event, args);
				}
			};
			this.awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit, logicalKey);
			return;
		}
		if (event === EVENTS.ADD && isEmptyFile(stats) && this.context.isReady()) {
			const held = {
				path: sourcePath,
				stats,
				release: () => {
					this.context.scheduler.clearTimeout(held.timer);
					if (this.heldAdds.get(logicalKey) !== held) return;
					this.heldAdds.delete(logicalKey);
					if (this.context.isClosed() || !this.context.lifecycle.isActive(generation) || !this.context.isPathGenerationActive(logicalKey, pathGeneration)) return;
					const heldArgs = [this.presentPath(held.path)];
					if (held.stats) heldArgs.push(held.stats);
					this.context.publish(EVENTS.ADD, heldArgs);
				}
			};
			held.timer = this.setTimeout(held.release, EMPTY_FILE_HOLD);
			this.heldAdds.set(logicalKey, held);
			return;
		}
		if (event === EVENTS.CHANGE) {
			if (!this.throttle(EVENTS.CHANGE, sourcePath, 50, (suppressedCount) => {
				const pending = this.pendingChanges.get(logicalKey);
				this.dropPendingChange(logicalKey);
				if (suppressedCount > 0 && pending?.replay && this.context.lifecycle.isActive(generation) && this.context.isPathGenerationActive(logicalKey, pathGeneration)) this.emit(EVENTS.CHANGE, pending.path, pending.stats);
			})) {
				const pending = this.pendingChanges.get(logicalKey);
				if (pending && !sameChangeStats(pending.stats, stats)) {
					pending.path = sourcePath;
					pending.stats = stats;
					pending.replay = true;
					if (pending.held && !isEmptyFile(stats)) pending.held.release();
				}
				return;
			}
			const pending = {
				path: sourcePath,
				stats,
				replay: false
			};
			this.pendingChanges.set(logicalKey, pending);
			if (isEmptyFile(stats)) {
				const release = () => {
					if (pending.held) this.context.scheduler.clearTimeout(pending.held.timer);
					pending.held = void 0;
					if (this.pendingChanges.get(logicalKey) !== pending || this.context.isClosed() || !this.context.lifecycle.isActive(generation) || !this.context.isPathGenerationActive(logicalKey, pathGeneration)) return;
					pending.replay = false;
					const heldArgs = [this.presentPath(pending.path)];
					if (pending.stats) heldArgs.push(pending.stats);
					this.context.publish(EVENTS.CHANGE, heldArgs);
				};
				pending.held = {
					timer: this.setTimeout(release, EMPTY_FILE_HOLD),
					release
				};
				return;
			}
		}
		if (options.alwaysStat && stats === void 0 && (event === EVENTS.ADD || event === EVENTS.ADD_DIR || event === EVENTS.CHANGE)) {
			const fullPath = options.cwd ? sp.join(options.cwd, path) : path;
			try {
				stats = await stat$1(fullPath);
			} catch (error) {
				this.context.handleError(error);
			}
			if (!stats || !this.context.lifecycle.isActive(generation) || !this.context.isPathGenerationActive(logicalKey, pathGeneration)) return;
			args.push(stats);
		}
		this.context.publish(event, args);
	}
	throttle(actionType, path, timeout, onRelease) {
		let action = this.throttled.get(actionType);
		if (!action) {
			action = /* @__PURE__ */ new Map();
			this.throttled.set(actionType, action);
		}
		const key = actionType === "readdir" ? path : logicalPathKey(path);
		const active = action.get(key);
		if (active) {
			active.count += 1;
			return false;
		}
		let timeoutObject;
		const clear = (invokeRelease = true) => {
			const item = action.get(key);
			const count = item?.count ?? 0;
			action.delete(key);
			this.context.scheduler.clearTimeout(timeoutObject);
			if (item) this.context.scheduler.clearTimeout(item.timeoutObject);
			if (invokeRelease && onRelease) onRelease(count);
			return count;
		};
		timeoutObject = this.setTimeout(clear, timeout);
		const throttler = {
			timeoutObject,
			clear,
			count: 0
		};
		action.set(key, throttler);
		return throttler;
	}
	awaitWriteFinish(path, threshold, event, awfEmit, logicalKey) {
		const awf = this.context.options.awaitWriteFinish;
		if (typeof awf !== "object") return;
		const pollInterval = awf.pollInterval;
		let timeoutHandler;
		let fullPath = path;
		if (this.context.options.cwd && !sp.isAbsolute(path)) fullPath = sp.join(this.context.options.cwd, path);
		const writeKey = logicalKey ?? logicalPathKey(fullPath);
		if (this.pendingWrites.has(writeKey)) return;
		const generation = this.context.lifecycle.generation;
		const pending = {
			lastChange: this.context.scheduler.now(),
			cancelWait: () => {
				if (this.pendingWrites.get(writeKey) === pending) this.pendingWrites.delete(writeKey);
				this.context.scheduler.clearTimeout(timeoutHandler);
				return event;
			}
		};
		const isCurrent = () => this.context.lifecycle.isActive(generation) && this.pendingWrites.get(writeKey) === pending;
		const inspect = (previous) => {
			const task = (async () => {
				let current;
				try {
					current = await stat$1(fullPath);
				} catch (error) {
					if (!isCurrent()) return;
					if (isMissingError(error)) {
						this.context.remove(sp.dirname(fullPath), sp.basename(fullPath));
						if (this.pendingWrites.get(writeKey) === pending) pending.cancelWait();
					} else {
						this.pendingWrites.delete(writeKey);
						awfEmit(error);
					}
					return;
				}
				if (!isCurrent()) return;
				const now = this.context.scheduler.now();
				if (previous && current.size !== previous.size) pending.lastChange = now;
				if (now - pending.lastChange >= threshold) {
					this.pendingWrites.delete(writeKey);
					awfEmit(void 0, current);
				} else timeoutHandler = this.setTimeout(() => inspect(current), pollInterval);
			})();
			this.context.lifecycle.track(task);
		};
		this.pendingWrites.set(writeKey, pending);
		timeoutHandler = this.setTimeout(inspect, pollInterval);
	}
	cancelPath(path) {
		const logicalKey = logicalPathKey(path);
		const pendingUnlink = this.pendingUnlinks.get(logicalKey);
		if (pendingUnlink) {
			this.context.scheduler.clearTimeout(pendingUnlink.timer);
			this.pendingUnlinks.delete(logicalKey);
		}
		this.pendingWrites.get(logicalKey)?.cancelWait();
		this.dropPendingChange(logicalKey);
		this.dropHeldAdd(logicalKey);
		[
			"watch",
			"add",
			"remove",
			"change"
		].forEach((actionType) => {
			this.throttled.get(actionType)?.get(logicalKey)?.clear(false);
		});
		const readdirEntries = this.throttled.get("readdir");
		readdirEntries?.get(logicalKey)?.clear(false);
		readdirEntries?.get(`${logicalPathKey(sp.dirname(logicalKey))}\0${sp.basename(logicalKey)}`)?.clear(false);
	}
	cancelWhere(contains) {
		[.../* @__PURE__ */ new Set([
			...this.pendingUnlinks.keys(),
			...this.pendingWrites.keys(),
			...this.pendingChanges.keys(),
			...this.heldAdds.keys()
		])].filter(contains).forEach((path) => this.cancelPath(path));
		this.throttled.forEach((entries, actionType) => {
			[...entries.keys()].filter((key) => contains(actionType === "readdir" ? key.split("\0", 1)[0] : key)).forEach((key) => entries.get(key)?.clear(false));
		});
	}
	close() {
		this.pendingWrites.forEach((pending) => pending.cancelWait());
		this.pendingUnlinks.forEach(({ timer }) => this.context.scheduler.clearTimeout(timer));
		this.pendingUnlinks.clear();
		this.pendingChanges.forEach(({ held }) => this.context.scheduler.clearTimeout(held?.timer));
		this.pendingChanges.clear();
		this.heldAdds.forEach(({ timer }) => this.context.scheduler.clearTimeout(timer));
		this.heldAdds.clear();
		this.throttled.forEach((entries) => {
			entries.forEach((throttler) => throttler.clear(false));
		});
		this.throttled.clear();
	}
};
var EV = EVENTS;
var RECURSIVE_TRIGGER_BUFFER_LIMIT = 1024;
var MAX_NATIVE_RESUBSCRIBES = 3;
var FALLBACK_SUBSCRIBE_CONCURRENCY = 16;
var EXACT_CANDIDATE = Object.freeze({});
function recoveryTrigger(resource) {
	return {
		kind: "native",
		resource,
		rawEvent: EV.CHANGE,
		relativePath: null,
		sequence: Number.MAX_SAFE_INTEGER,
		observedAt: backendNow()
	};
}
function sameMappedFileSnapshot(left, right) {
	if (left === false || right === false) return left === right;
	return left.size === right.size && left.mtimeMs === right.mtimeMs && left.ctimeMs === right.ctimeMs && left.ino === right.ino && left.mode === right.mode;
}
var ReplayBuffer = class {
	entries = [];
	overflow;
	limit;
	constructor(limit) {
		this.limit = limit;
	}
	get overflowed() {
		return this.overflow !== void 0;
	}
	push(value) {
		if (this.entries.length < this.limit && !this.overflowed) this.entries.push(value);
		else this.overflow = value;
	}
	clear() {
		this.entries.length = 0;
		this.overflow = void 0;
	}
};
function consumeDirectoryStream(stream, onEntry) {
	const tasks = [];
	stream.on("data", (entry) => {
		let result;
		try {
			result = onEntry(entry);
		} catch (error) {
			result = Promise.reject(error);
		}
		if (!result) return;
		tasks.push(Promise.resolve(result));
	});
	return new Promise((resolve) => {
		stream.once("end", () => resolve({ complete: true }));
		stream.once("close", () => resolve({ complete: false }));
		stream.once(EV.ERROR, (error) => resolve({
			complete: false,
			error
		}));
	}).then(async ({ complete, error }) => {
		const failures = (await Promise.allSettled(tasks)).filter((result) => result.status === "rejected").map((result) => result.reason);
		return {
			complete: complete && failures.length === 0,
			error,
			failures
		};
	});
}
var binaryExtensions = new Set(`3dm 3ds 3g2 3gp 7z a aac adp afdesign afphoto afpub ai aif aiff alz ape apk appimage ar arj asf au avi bak baml bh bin bk bmp btif bz2 bzip2 cab caf cgm class cmx cpio cr2 cur dat dcm deb dex djvu dll dmg dng doc docm docx dot dotm dra ds_store dsk dts dtshd dvb dwg dxf ecelp4800 ecelp7470 ecelp9600 egg eol eot epub exe f4v fbs fh fla flac flatpak fli flv fpx fst fvt g3 gh gif graffle gz gzip h261 h263 h264 icns ico ief img ipa iso jar jpeg jpg jpgv jpm jxr key ktx lha lib lvp lz lzh lzma lzo m3u m4a m4v mar mdi mht mid midi mj2 mka mkv mmr mng mobi mov movie mp3 mp4 mp4a mpeg mpg mpga mxu nef npx numbers nupkg o odp ods odt oga ogg ogv otf ott pages pbm pcx pdb pdf pea pgm pic png pnm pot potm potx ppa ppam ppm pps ppsm ppsx ppt pptm pptx psd pya pyc pyo pyv qt rar ras raw resources rgb rip rlc rmf rmvb rpm rtf rz s3m s7z scpt sgi shar snap sil sketch slk smv snk so stl suo sub swf tar tbz tbz2 tga tgz thmx tif tiff tlz ttc ttf txz udf uvh uvi uvm uvp uvs uvu viv vob war wav wax wbmp wdp weba webm webp whl wim wm wma wmv wmx woff woff2 wrm wvx xbm xif xla xlam xls xlsb xlsm xlsx xlt xltm xltx xm xmind xpi xpm xwd xz z zip zipx`.split(" "));
function isBinaryPath(filePath) {
	return binaryExtensions.has(sp.extname(filePath).slice(1).toLowerCase());
}
var ObservationEngine = class {
	fsw;
	reportError;
	constructor(fsW) {
		this.fsw = fsW;
		this.reportError = (error) => fsW.handleError(error);
	}
	subscribePath(path, listener, initialStats, mapRelative = false, queueScope = path) {
		const opts = this.fsw.options;
		const basename = sp.basename(path);
		const absolutePath = sp.resolve(path);
		const options = { persistent: opts.persistent };
		const generation = this.fsw.lifecycle.generation;
		let active = true;
		const trackedListener = (watchedPath, stats, trigger) => {
			if (!active || !this.fsw.lifecycle.isActive(generation)) return;
			return listener(watchedPath, stats, trigger);
		};
		const publish = (trigger) => {
			this.reconcileBackendTrigger(path, mapRelative, trigger, (candidate) => trackedListener(candidate, trigger.kind === "poll" && !isMissingObservation(trigger.current) ? trigger.current : void 0, trigger), () => active && this.fsw.lifecycle.isActive(generation), true, queueScope);
		};
		let subscription;
		let resubscribes = 0;
		const subscribeNative = () => setFsWatchListener(path, absolutePath, options, {
			publish: (trigger) => {
				resubscribes = 0;
				publish(trigger);
			},
			errHandler: this.reportError,
			rawEmitter: (...args) => this.fsw.emitRaw(...args),
			failure: () => {
				if (!active || !this.fsw.lifecycle.isActive(generation)) return;
				subscription = resubscribes++ < MAX_NATIVE_RESUBSCRIBES ? subscribeNative() : void 0;
				publish(recoveryTrigger(absolutePath));
			}
		}, this.fsw.lifecycle.abortController.signal);
		if (opts.backendCapabilities.polling) subscription = setPollingListener(path, absolutePath, {
			interval: opts.pollingInterval !== opts.pollingBinaryInterval && isBinaryPath(basename) ? opts.pollingBinaryInterval : opts.pollingInterval,
			persistent: opts.persistent
		}, this.fsw.scheduler, {
			publish,
			errHandler: this.reportError,
			rawEmitter: (...args) => this.fsw.emitRaw(...args)
		}, initialStats, this.fsw.lifecycle.abortController.signal);
		else subscription = subscribeNative();
		if (!subscription) return;
		return () => {
			if (!active) return;
			active = false;
			return subscription?.close();
		};
	}
	subscribeMappedFile(logicalPath, targetPath, helper, depth, useExactFallback = isMacos) {
		if (this.fsw.options.backendCapabilities.polling) return;
		const targetDirectory = sp.dirname(targetPath);
		const targetKey = logicalPathKey(targetPath);
		const logicalParent = sp.dirname(logicalPath);
		const generation = this.fsw.lifecycle.generation;
		let active = true;
		let exactActive = useExactFallback;
		let suppressDirectoryEcho = false;
		let fallbackSnapshot;
		let directorySubscription;
		let exactSubscription;
		const isActive = () => active && this.fsw.lifecycle.isActive(generation) && this.isHelperActive(helper, logicalPath);
		const matchesTarget = (relativePath) => {
			if (relativePath === null) return true;
			const candidateKey = logicalPathKey(sp.isAbsolute(relativePath) ? relativePath : sp.resolve(targetDirectory, relativePath));
			return isWindows ? candidateKey.toLowerCase() === targetKey.toLowerCase() : candidateKey === targetKey;
		};
		const retireExact = () => {
			if (!exactActive) return;
			exactActive = false;
			if (exactSubscription) exactSubscription.close();
		};
		const publish = (source, trigger) => {
			if (trigger.kind !== "native" || !matchesTarget(trigger.relativePath) || !isActive()) return;
			const deduplicateAgainstFallback = source === "directory" && suppressDirectoryEcho;
			if (source === "directory") {
				suppressDirectoryEcho = false;
				retireExact();
			} else if (directorySubscription) {
				suppressDirectoryEcho = true;
				retireExact();
			}
			this.reconcileBackendTrigger(targetDirectory, true, trigger, async () => {
				if (deduplicateAgainstFallback && fallbackSnapshot !== void 0) {
					const current = await this.mappedFileSnapshot(targetPath);
					if (current !== void 0 && sameMappedFileSnapshot(fallbackSnapshot, current)) return;
				}
				await this.reconcileNativeTrigger(logicalParent, helper, trigger, logicalPath, depth - 1, EXACT_CANDIDATE);
				if (source === "exact") fallbackSnapshot = await this.mappedFileSnapshot(targetPath);
			}, isActive, false, logicalPath);
		};
		let resubscribes = 0;
		const handlers = (source) => ({
			publish: (trigger) => {
				if (source === "directory") resubscribes = 0;
				publish(source, trigger);
			},
			errHandler: this.reportError,
			rawEmitter: (event, relativePath) => {
				if ((source === "directory" || exactActive) && matchesTarget(relativePath) && isActive()) this.fsw.emitRaw(event, relativePath, { watchedPath: logicalPath });
			},
			failure: () => {
				if (source === "exact") {
					exactSubscription = void 0;
					exactActive = false;
					return;
				}
				directorySubscription = void 0;
				if (!isActive()) return;
				if (resubscribes++ < MAX_NATIVE_RESUBSCRIBES) directorySubscription = subscribe(source);
				publish(source, recoveryTrigger(sp.resolve(targetDirectory)));
			}
		});
		const subscribe = (source) => {
			const path = source === "directory" ? targetDirectory : targetPath;
			return setFsWatchListener(path, sp.resolve(path), { persistent: this.fsw.options.persistent }, handlers(source), this.fsw.lifecycle.abortController.signal);
		};
		directorySubscription = subscribe("directory");
		exactSubscription = useExactFallback ? subscribe("exact") : void 0;
		if (!exactSubscription) exactActive = false;
		if (!directorySubscription && !exactSubscription) return;
		return async () => {
			if (!active) return;
			active = false;
			const subscriptions = [directorySubscription, exactSubscription].filter((subscription) => subscription !== void 0);
			await Promise.allSettled(subscriptions.map((subscription) => subscription.close()));
		};
	}
	async mappedFileSnapshot(path) {
		try {
			return await lstat(path);
		} catch (error) {
			if (isMissingError(error)) return false;
			this.reportError(error);
			return;
		}
	}
	watchSymlinkDeletion(path, force = false) {
		if (!isMacos && !force || this.fsw.options.backendCapabilities.polling) return;
		const fsw = this.fsw;
		const generation = fsw.lifecycle.generation;
		const directory = sp.dirname(path);
		const basename = sp.basename(path);
		let active = true;
		let timer;
		const schedule = () => {
			timer = fsw.scheduler.setTimeout(() => {
				timer = void 0;
				(async () => {
					try {
						await lstat(path);
					} catch (error) {
						if (!active || !fsw.lifecycle.isActive(generation)) return;
						if (isMissingError(error)) {
							active = false;
							fsw.removePath(directory, basename);
							return;
						}
						this.reportError(error);
					}
					if (active && fsw.lifecycle.isActive(generation)) schedule();
				})();
			}, fsw.options.pollingInterval);
			if (!fsw.options.persistent) timer.unref();
		};
		schedule();
		return () => {
			if (!active) return;
			active = false;
			fsw.scheduler.clearTimeout(timer);
			timer = void 0;
		};
	}
	reconcileBackendTrigger(scope, mapRelative, trigger, reconcile, isActive = () => true, coalesce = true, queueScope = scope) {
		let candidate = scope;
		if (mapRelative && trigger.kind === "native" && trigger.relativePath !== null) {
			const resolved = resolveRecursiveCandidate(scope, trigger.relativePath);
			if (!resolved) {
				this.reportError(/* @__PURE__ */ new Error(`Watcher reported a path outside its root: ${trigger.relativePath}`));
				return Promise.resolve();
			}
			candidate = resolved;
		}
		if (!isActive() || this.fsw.isUnwatched(candidate)) return Promise.resolve();
		const rootKey = logicalPathKey(queueScope);
		const candidateKey = logicalPathKey(candidate);
		return this.fsw.reconciliation.enqueue(rootKey, async () => {
			if (!isActive() || this.fsw.isUnwatched(candidateKey)) return;
			await reconcile(candidate);
		}, coalesce ? candidateKey : false);
	}
	handleFile(file, stats, initialAdd, watchResource = true, trigger, initialRecursive = false, retainObservation = false) {
		if (this.fsw.closed) return;
		const dirname = sp.dirname(file);
		const basename = sp.basename(file);
		const parent = this.fsw.tree.getDirectory(dirname);
		let prevStats = stats;
		if (parent.has(basename)) return;
		const pathGeneration = this.fsw.capturePathGeneration();
		const isActive = () => this.fsw.isPathGenerationActive(file, pathGeneration);
		const listener = async (_path, newStats) => {
			if (!newStats || newStats.mtimeMs === 0) try {
				const newStats = prevStats.isSymbolicLink() && !this.fsw.options.followSymlinks ? await lstat(file) : await stat$1(file);
				if (!isActive()) return;
				const at = newStats.atimeMs;
				const mt = newStats.mtimeMs;
				if (!at || at <= mt || mt !== prevStats.mtimeMs) this.fsw.emitEvent(EV.CHANGE, file, newStats);
				this.fsw.tree.recordObserved(file, newStats, "change");
				prevStats = newStats;
			} catch (error) {
				if (!isActive()) return;
				if (isMissingError(error)) this.fsw.removePath(dirname, basename);
				else this.reportError(error);
			}
			else if (parent.has(basename)) {
				const at = newStats.atimeMs;
				const mt = newStats.mtimeMs;
				if (!at || at <= mt || mt !== prevStats.mtimeMs) this.fsw.emitEvent(EV.CHANGE, file, newStats);
				this.fsw.tree.recordObserved(file, newStats, "change");
				prevStats = newStats;
			}
		};
		const closer = watchResource && this.fsw.options.backendCapabilities.polling ? this.subscribePath(file, listener, stats) : void 0;
		parent.add(basename);
		this.fsw.tree.recordObserved(file, stats, "add", trigger, initialRecursive, retainObservation);
		if (!(initialAdd && this.fsw.options.ignoreInitial) && !this.fsw.isIgnored(file, stats)) this.fsw.emitEvent(EV.ADD, file, stats);
		return closer;
	}
	async handleSymlink(entry, directory, path, item, initialAdd, wh) {
		if (this.fsw.closed || wh && !this.isHelperActive(wh, path)) return;
		const full = logicalPathKey(entry.fullPath);
		const dir = this.fsw.tree.getDirectory(directory);
		if (!this.fsw.options.followSymlinks) {
			let linkPath;
			try {
				linkPath = await readlink(path);
			} catch (error) {
				if (!isMissingError(error)) this.reportError(error);
				return true;
			}
			if (this.fsw.closed || wh && !this.isHelperActive(wh, path)) return true;
			if (dir.has(item)) {
				if (this.fsw.tree.symlinkPaths.get(full) !== linkPath) {
					this.fsw.tree.symlinkPaths.set(full, linkPath);
					this.fsw.emitEvent(EV.CHANGE, path, entry.stats);
				}
			} else {
				dir.add(item);
				this.fsw.tree.symlinkPaths.set(full, linkPath);
				this.fsw.tree.recordObserved(path, entry.stats, "add", wh?.observationTrigger, initialAdd && Boolean(wh?.recursiveRoot));
				if (!(initialAdd && this.fsw.options.ignoreInitial)) this.fsw.emitEvent(EV.ADD, path, entry.stats);
			}
			return true;
		}
		if (this.fsw.tree.symlinkPaths.has(full)) return true;
		this.fsw.tree.symlinkPaths.set(full, true);
	}
	readDirectory(directory, initialAdd, wh, target, dir, depth) {
		if (!this.isHelperActive(wh, directory)) return;
		directory = sp.join(directory, "");
		const directoryKey = logicalPathKey(directory);
		const previous = this.fsw.tree.getDirectory(wh.watchPath);
		const current = /* @__PURE__ */ new Set();
		const stream = this.fsw.createScanStream(directory, {
			fileFilter: (entry) => wh.filterPath(entry),
			directoryFilter: (entry) => wh.filterDir(entry)
		});
		if (!stream) return;
		return consumeDirectoryStream(stream, (entry) => {
			if (!this.isHelperActive(wh, directory)) return;
			const stats = entry.stats;
			if (!stats) return;
			const item = entry.path;
			let path = sp.join(directory, item);
			if (!this.isHelperActive(wh, path)) return;
			current.add(item);
			const shouldAdd = item === target || !target && !previous.has(item);
			if (target === void 0 && !stats.isSymbolicLink() && !stats.isDirectory()) {
				if (!shouldAdd) return;
				path = sp.join(dir, sp.relative(dir, path));
				const closer = this.handleFile(path, stats, initialAdd, !wh.recursiveRoot, wh.observationTrigger, initialAdd && Boolean(wh.recursiveRoot));
				if (closer) this.fsw.addPathCloser(path, closer);
				return;
			}
			return (async () => {
				if (stats.isSymbolicLink() && await this.handleSymlink(entry, directory, path, item, initialAdd, wh)) return;
				if (!this.isHelperActive(wh, path)) return;
				if (shouldAdd) {
					path = sp.join(dir, sp.relative(dir, path));
					await this.addPathOnce(path, initialAdd, wh, depth + 1);
				}
			})();
		}).then(async ({ complete, error, failures }) => {
			failures.forEach(this.reportError);
			if (error) {
				if (isMissingError(error) && this.isHelperActive(wh, directory)) {
					const affectedPath = target ? sp.join(directory, target) : directory;
					let disappeared = false;
					let becameNonDirectory = false;
					try {
						const currentStats = target ? await lstat(affectedPath) : await stat$1(affectedPath);
						becameNonDirectory = !target && !currentStats.isDirectory();
					} catch (stateError) {
						if (isMissingError(stateError)) disappeared = true;
						else this.reportError(stateError);
					}
					if (target) {
						if (disappeared && previous.has(target)) this.fsw.removePath(directory, target);
					} else if ((disappeared || becameNonDirectory) && this.fsw.tree.watched.has(directoryKey)) {
						this.fsw.removePath(sp.dirname(directory), sp.basename(directory), true);
						if (becameNonDirectory) await this.addPathOnce(directory, false, wh, depth);
					}
				} else this.reportError(error);
			}
			if (!complete || !this.isHelperActive(wh, directory)) return;
			await Promise.all(previous.getChildren().filter((item) => !current.has(item)).map((item) => this.removeIfMissing(wh, directory, item, previous)));
		});
	}
	async removeIfMissing(wh, directory, item, entry) {
		const path = sp.join(directory, item);
		if (!this.isHelperActive(wh, path)) return;
		try {
			await lstat(path);
			return;
		} catch (error) {
			if (!isMissingError(error)) return;
		}
		if (this.isHelperActive(wh, path) && entry.has(item)) this.fsw.removePath(directory, item);
	}
	scanRecursiveTree(dir, initialAdd, wh, baseDepth, rescan) {
		if (!this.isHelperActive(wh, dir)) return;
		const fsw = this.fsw;
		const maxDepth = fsw.options.depth;
		const remainingDepth = maxDepth === void 0 ? void 0 : maxDepth - baseDepth;
		const stream = fsw.createScanStream(dir, {
			fileFilter: (entry) => wh.filterPath(entry),
			directoryFilter: (entry) => !entry.stats?.isSymbolicLink() && wh.filterDir(entry),
			depth: remainingDepth
		});
		if (!stream) return;
		return consumeDirectoryStream(stream, (entry) => {
			if (!this.isHelperActive(wh, dir)) return;
			const stats = entry.stats;
			if (!stats) return;
			const path = sp.join(dir, entry.path);
			if (!this.isHelperActive(wh, path)) return;
			const directory = sp.dirname(path);
			const item = sp.basename(path);
			if (rescan) {
				rescan.seen.add(logicalPathKey(path));
				if (stats.isDirectory()) rescan.directories.push(path);
			}
			if (stats.isSymbolicLink()) return (async () => {
				if (await this.handleSymlink(entry, directory, path, item, initialAdd, wh)) return;
				if (!this.isHelperActive(wh, path)) return;
				const entryDepth = baseDepth + entry.path.split(/[/\\]/).length;
				await this.addPathOnce(path, initialAdd, wh, entryDepth);
			})();
			const parent = fsw.tree.getDirectory(directory);
			if (parent.has(item)) {
				if (rescan && stats.isFile() && fsw.tree.changedSinceObserved(path, stats)) {
					fsw.tree.recordObserved(path, stats, "change", void 0, false, true);
					fsw.emitEvent(EV.CHANGE, path, stats);
				}
				return;
			}
			parent.add(item);
			const isDirectory = stats.isDirectory();
			if (isDirectory) fsw.tree.getDirectory(path);
			fsw.tree.recordObserved(path, stats, "add", wh.observationTrigger, initialAdd);
			if (!(initialAdd && fsw.options.ignoreInitial)) fsw.emitEvent(isDirectory ? EV.ADD_DIR : EV.ADD, path, stats);
		}).then((outcome) => {
			if (outcome.error) this.reportError(outcome.error);
			outcome.failures.forEach(this.reportError);
			if (rescan) rescan.complete = outcome.complete;
		});
	}
	async rescanRecursiveTree(dir, wh, baseDepth) {
		const rescan = {
			seen: /* @__PURE__ */ new Set(),
			directories: [dir],
			complete: false
		};
		await this.scanRecursiveTree(dir, false, wh, baseDepth, rescan);
		if (!rescan.complete || !this.isHelperActive(wh, dir)) return;
		const missing = [];
		for (const directory of rescan.directories) for (const item of this.fsw.tree.peekDirectory(directory)?.getChildren() ?? []) {
			const path = sp.join(directory, item);
			if (!rescan.seen.has(logicalPathKey(path))) missing.push(path);
		}
		missing.sort((left, right) => left.length - right.length);
		for (const path of missing) {
			const entry = this.fsw.tree.peekDirectory(sp.dirname(path));
			if (entry?.has(sp.basename(path))) await this.removeIfMissing(wh, sp.dirname(path), sp.basename(path), entry);
		}
	}
	isHelperActive(wh, path = wh.watchPath) {
		return this.fsw.isPathGenerationActive(path, wh.pathGeneration);
	}
	candidateDepth(root, candidate) {
		const relative = sp.relative(root, candidate);
		return relative ? relative.split(sp.sep).length : 0;
	}
	candidateIgnored(root, candidate, stats) {
		const relative = sp.relative(root, candidate);
		let ancestor = root;
		if (this.fsw.isIgnored(ancestor)) return true;
		if (relative) {
			const parts = relative.split(sp.sep);
			for (let index = 0; index < parts.length - 1; index++) {
				ancestor = sp.join(ancestor, parts[index]);
				if (this.fsw.isIgnored(ancestor)) return true;
			}
		}
		return this.fsw.isIgnored(candidate, stats);
	}
	async highestMissingPath(root, candidate) {
		let missing = candidate;
		let ancestor = sp.dirname(candidate);
		while (true) {
			try {
				await lstat(ancestor);
				return missing;
			} catch (error) {
				if (!isMissingError(error)) {
					this.reportError(error);
					return missing;
				}
			}
			missing = ancestor;
			if (ancestor === root) return missing;
			const parent = sp.dirname(ancestor);
			if (parent === ancestor) return missing;
			ancestor = parent;
		}
	}
	async reconcileNativeTrigger(root, rootHelper, trigger, candidateOverride, baseDepth = 0, exact) {
		const fsw = this.fsw;
		if (!this.isHelperActive(rootHelper, root)) return;
		let localHelper;
		const helper = () => localHelper ??= rootHelper.withObservation(trigger);
		const candidate = candidateOverride ?? (trigger.relativePath === null ? root : resolveRecursiveCandidate(root, trigger.relativePath));
		if (!candidate) {
			this.reportError(/* @__PURE__ */ new Error(`Native watcher reported a path outside its root: ${trigger.relativePath}`));
			return;
		}
		const depth = baseDepth + this.candidateDepth(root, candidate);
		const maxDepth = fsw.options.depth;
		if (maxDepth !== void 0 && depth > maxDepth + 1) return;
		if (this.candidateIgnored(root, candidate)) return;
		let stats;
		try {
			stats = await lstat(candidate);
		} catch (error) {
			if (!isMissingError(error)) {
				this.reportError(error);
				if (exact) return;
				const ancestor = candidate === root ? root : sp.dirname(candidate);
				const ancestorDepth = Math.max(0, baseDepth + this.candidateDepth(root, ancestor));
				await this.readDirectory(ancestor, false, helper().fork(ancestor), void 0, ancestor, ancestorDepth);
				return;
			}
			if (fsw.closed) return;
			const missingPath = candidate === root ? root : await this.highestMissingPath(root, candidate);
			if (fsw.closed) return;
			if (missingPath === root) {
				fsw.removePath(sp.dirname(root), sp.basename(root), true);
				exact?.onRootMissing?.();
				return;
			}
			const parentPath = sp.dirname(missingPath);
			const item = sp.basename(missingPath);
			if (fsw.tree.getDirectory(parentPath).has(item)) fsw.removePath(parentPath, item);
			else if (!exact) await this.readDirectory(parentPath, false, helper().fork(parentPath), void 0, parentPath, Math.max(0, baseDepth + this.candidateDepth(root, parentPath)));
			return;
		}
		if (!this.isHelperActive(rootHelper, candidate) || this.candidateIgnored(root, candidate, stats)) return;
		if (!stats.isDirectory() && !(stats.isSymbolicLink() && fsw.options.followSymlinks)) {
			const initialCreate = fsw.tree.consumeInitialCreate(candidate, stats, trigger, fsw.options.ignoreInitial);
			if (initialCreate !== void 0) {
				if (initialCreate) fsw.emitEvent(initialCreate, candidate, stats);
				return;
			}
		}
		if (candidate === root) {
			if (!stats.isDirectory()) return;
			if (rootHelper.recursiveRoot === root) await this.rescanRecursiveTree(root, helper(), baseDepth);
			else await this.readDirectory(root, false, helper(), void 0, root, baseDepth);
			return;
		}
		const parentPath = sp.dirname(candidate);
		const item = sp.basename(candidate);
		const parent = fsw.tree.getDirectory(parentPath);
		const tracked = parent.has(item);
		if (stats.isSymbolicLink()) {
			if (!fsw.options.followSymlinks) {
				let target = true;
				try {
					target = await readlink(candidate);
				} catch {}
				if (!tracked) parent.add(item);
				fsw.tree.symlinkPaths.set(logicalPathKey(candidate), target);
				if (!tracked || !fsw.tree.isDuplicateObservation(candidate, stats, trigger)) fsw.emitEvent(tracked ? EV.CHANGE : EV.ADD, candidate, stats);
				if (!tracked) fsw.tree.recordObserved(candidate, stats, "add", trigger);
				return;
			}
			const logicalKey = logicalPathKey(candidate);
			const previousTarget = fsw.tree.symlinkPaths.get(logicalKey);
			let currentTarget;
			try {
				currentTarget = await realpath(candidate);
			} catch (error) {
				if (!isMissingError(error)) {
					this.reportError(error);
					return;
				}
			}
			if (tracked && typeof previousTarget === "string" && (currentTarget === void 0 || logicalPathKey(previousTarget) !== logicalPathKey(currentTarget))) {
				const previousKind = fsw.tree.observed.get(logicalKey)?.kind;
				fsw.removePath(parentPath, item, previousKind === "directory");
				if (!currentTarget || !this.isHelperActive(rootHelper, candidate)) return;
				const linkHelper = helper().fork(candidate);
				linkHelper.recursiveRoot = void 0;
				await this.addPathOnce(candidate, false, linkHelper, depth);
				return;
			}
			const initialCreate = fsw.tree.consumeInitialCreate(candidate, stats, trigger, fsw.options.ignoreInitial);
			if (initialCreate !== void 0) {
				if (initialCreate) {
					fsw.closePath(candidate, true);
					const linkHelper = helper().fork(candidate);
					linkHelper.recursiveRoot = void 0;
					await this.addPathOnce(candidate, false, linkHelper, depth);
				}
				return;
			}
			if (!tracked) {
				const linkHelper = helper().fork(candidate);
				linkHelper.recursiveRoot = void 0;
				await this.addPathOnce(candidate, false, linkHelper, depth);
			} else fsw.emitEvent(EV.CHANGE, candidate, stats);
			return;
		}
		if (stats.isDirectory()) {
			const directoryHelper = helper().fork(candidate);
			const initialCreate = fsw.tree.consumeInitialCreate(candidate, stats, trigger, fsw.options.ignoreInitial);
			if (initialCreate !== void 0) {
				if (initialCreate) {
					fsw.closePath(candidate, true);
					await this.addPathOnce(candidate, false, directoryHelper, depth);
				}
				return;
			}
			if (!tracked) await this.addPathOnce(candidate, false, directoryHelper, depth);
			else if (fsw.tree.replacedSinceObserved(candidate, stats)) {
				fsw.removePath(parentPath, item, true);
				await this.addPathOnce(candidate, false, directoryHelper, depth);
			} else if (maxDepth === void 0 || depth <= maxDepth) await this.readDirectory(candidate, false, directoryHelper, void 0, candidate, depth);
			return;
		}
		if (!tracked) await this.addPathOnce(candidate, false, helper(), depth);
		else if (!fsw.tree.isDuplicateObservation(candidate, stats, trigger)) fsw.emitEvent(EV.CHANGE, candidate, stats);
	}
	watchRootParent(dir, wh) {
		if (!this.fsw.options.backendCapabilities.perDirectory || !isWindows) return;
		const parentPath = sp.dirname(dir);
		if (sp.resolve(parentPath) === sp.resolve(dir)) return;
		const canonicalParent = sp.normalize(sp.toNamespacedPath(sp.resolve(parentPath))).toLowerCase();
		const rootName = sp.basename(dir).toLowerCase();
		const generation = this.fsw.lifecycle.generation;
		let active = true;
		const matchesRoot = (relativePath) => {
			if (relativePath === null) return true;
			const candidate = sp.isAbsolute(relativePath) ? sp.resolve(relativePath) : sp.resolve(parentPath, relativePath);
			return sp.normalize(sp.toNamespacedPath(sp.dirname(candidate))).toLowerCase() === canonicalParent && sp.basename(candidate).toLowerCase() === rootName;
		};
		const isActive = () => active && this.fsw.lifecycle.isActive(generation) && this.isHelperActive(wh, dir);
		const publish = (trigger) => {
			if (trigger.kind !== "native" || !matchesRoot(trigger.relativePath) || !isActive()) return;
			this.reconcileBackendTrigger(dir, false, trigger, async () => {
				let rootStats;
				try {
					rootStats = await lstat(dir);
				} catch (error) {
					if (isMissingError(error)) this.fsw.removePath(parentPath, sp.basename(dir), true);
					else this.reportError(error);
					return;
				}
				if (!isActive()) return;
				if (!rootStats.isDirectory()) {
					this.fsw.removePath(parentPath, sp.basename(dir), true);
					await this.addPathOnce(dir, false, wh, 0);
					return;
				}
				await this.readDirectory(dir, false, wh, void 0, dir, 0);
			}, isActive);
		};
		const subscription = setFsWatchListener(parentPath, sp.resolve(parentPath), { persistent: this.fsw.options.persistent }, {
			publish,
			errHandler: this.reportError,
			rawEmitter: (event, relativePath, details) => {
				if (matchesRoot(relativePath)) this.fsw.emitRaw(event, relativePath, details);
			}
		}, this.fsw.lifecycle.abortController.signal);
		if (!subscription) return;
		return () => {
			if (!active) return;
			active = false;
			return subscription.close();
		};
	}
	async watchRecursiveDirectory(dir, initialAdd, depth, wh) {
		const fsw = this.fsw;
		const generation = fsw.lifecycle.generation;
		const rootKey = logicalPathKey(dir);
		const buffered = new ReplayBuffer(RECURSIVE_TRIGGER_BUFFER_LIMIT);
		const fallbackClosers = [];
		let phase = "scanning";
		let pendingFailure;
		let hasPendingFailure = false;
		let recovery;
		let subscription;
		const scopeActive = (path = dir) => fsw.lifecycle.isActive(generation) && fsw.isPathGenerationActive(path, wh.pathGeneration);
		const acceptsTrigger = (path = dir) => phase !== "recovering" && phase !== "closed" && scopeActive(path);
		const establishFallback = async (error) => {
			if (!scopeActive()) return;
			wh.recursiveRoot = void 0;
			wh.recursiveDisabled = true;
			let currentStats;
			try {
				currentStats = await lstat(dir);
			} catch (statError) {
				if (isMissingError(statError)) fsw.removePath(sp.dirname(dir), sp.basename(dir), true);
				else this.reportError(statError);
				this.reportError(error);
				return;
			}
			const closer = await this.handleDirectory(dir, currentStats, false, depth, void 0, wh);
			if (!scopeActive()) {
				if (closer) await closer();
				return;
			}
			if (closer) fallbackClosers.push(closer);
			await this.subscribeTrackedDirectories(dir, wh, depth);
			this.reportError(error);
		};
		const handleFailure = (error) => {
			if (!acceptsTrigger()) return;
			const initializing = phase !== "live";
			phase = "recovering";
			fsw.tree.recursiveRoots.delete(rootKey);
			pendingFailure = error;
			hasPendingFailure = true;
			if (!initializing) recovery = fsw.reconciliation.enqueue(dir, () => establishFallback(error), false);
		};
		const processTrigger = (trigger) => {
			if (!acceptsTrigger()) return;
			if (phase !== "live") {
				buffered.push(trigger);
				return;
			}
			const coalescePath = trigger.relativePath === null ? dir : resolveRecursiveCandidate(dir, trigger.relativePath) ?? dir;
			this.reconcileBackendTrigger(dir, true, trigger, () => acceptsTrigger() ? this.reconcileNativeTrigger(dir, wh, trigger) : void 0, () => acceptsTrigger(coalescePath));
		};
		const result = subscribeRecursiveNative(dir, fsw.options.persistent, {
			publish: processTrigger,
			failure: handleFailure,
			rawEmitter: (...args) => fsw.emitRaw(...args)
		}, fsw.lifecycle.abortController.signal);
		if (result.kind === "unsupported") return false;
		if (result.kind === "failed") throw result.error;
		subscription = result.subscription;
		fsw.tree.recursiveRoots.add(rootKey);
		wh.recursiveRoot = dir;
		const close = async () => {
			if (phase === "closed") return;
			phase = "closed";
			fsw.tree.recursiveRoots.delete(rootKey);
			buffered.clear();
			await subscription?.close();
			if (recovery) await Promise.allSettled([recovery]);
			await Promise.allSettled(fallbackClosers.map((closer) => closer()));
		};
		try {
			await this.scanRecursiveTree(dir, initialAdd, wh, depth);
			if (!hasPendingFailure) {
				phase = "replaying";
				let index = 0;
				while (acceptsTrigger()) {
					if (buffered.overflowed) {
						buffered.clear();
						index = 0;
						const overflowTrigger = {
							kind: "native",
							resource: subscription.resource,
							rawEvent: EV.CHANGE,
							relativePath: null,
							sequence: Number.MAX_SAFE_INTEGER,
							observedAt: backendNow()
						};
						await this.reconcileBackendTrigger(dir, true, overflowTrigger, () => this.reconcileNativeTrigger(dir, wh, overflowTrigger), () => acceptsTrigger(), false);
						continue;
					}
					if (index >= buffered.entries.length) break;
					const trigger = buffered.entries[index++];
					if (trigger.rawEvent === "rename" && trigger.relativePath !== null) {
						const candidate = resolveRecursiveCandidate(dir, trigger.relativePath);
						if (candidate && candidate !== dir && fsw.tree.getDirectory(sp.dirname(candidate)).has(sp.basename(candidate))) fsw.tree.markInitialCreate(candidate);
					}
					await this.reconcileBackendTrigger(dir, true, trigger, () => this.reconcileNativeTrigger(dir, wh, trigger), () => acceptsTrigger(), false);
				}
				if (phase !== "recovering") phase = "live";
			}
			if (hasPendingFailure) {
				buffered.clear();
				await establishFallback(pendingFailure);
			}
			buffered.clear();
			fsw.tree.clearInitialCreates(dir);
		} catch (error) {
			await close();
			throw error;
		}
		if (!scopeActive()) {
			await close();
			return;
		}
		return close;
	}
	async subscribeTrackedDirectories(root, wh, baseDepth) {
		const fsw = this.fsw;
		const absoluteRoot = sp.resolve(root);
		const needsSubscription = (path) => {
			const key = logicalPathKey(path);
			return this.isHelperActive(wh, path) && !fsw.lifecycle.closers.has(key) && !fsw.tree.symlinkPaths.has(key) && (fsw.tree.peekDirectory(sp.dirname(path))?.has(sp.basename(path)) ?? false);
		};
		const directories = [...fsw.tree.watched.values()].filter((entry) => isStrictlyInside(absoluteRoot, entry.path)).map((entry) => sp.join(root, sp.relative(absoluteRoot, entry.path))).filter(needsSubscription).sort((left, right) => left.length - right.length);
		let next = 0;
		const subscribeNext = async () => {
			while (next < directories.length) {
				const directory = directories[next++];
				if (!needsSubscription(directory)) continue;
				await this.addPathOnce(directory, false, wh, baseDepth + this.candidateDepth(root, directory));
			}
		};
		const workers = Math.min(FALLBACK_SUBSCRIBE_CONCURRENCY, directories.length);
		await Promise.all(Array.from({ length: workers }, subscribeNext));
	}
	async handleDirectory(dir, stats, initialAdd, depth, target, wh) {
		if (!this.isHelperActive(wh, dir)) return;
		if (target) this.fsw.tree.getDirectory(dir);
		else {
			const parentDir = this.fsw.tree.getDirectory(sp.dirname(dir));
			const tracked = parentDir.has(sp.basename(dir));
			if (!(initialAdd && this.fsw.options.ignoreInitial) && !tracked) this.fsw.emitEvent(EV.ADD_DIR, dir, stats);
			parentDir.add(sp.basename(dir));
			this.fsw.tree.getDirectory(dir);
			this.fsw.tree.recordObserved(dir, stats, tracked ? void 0 : "add", wh.observationTrigger, initialAdd && Boolean(wh.recursiveRoot), true);
		}
		let closer;
		const oDepth = this.fsw.options.depth;
		if (oDepth == null || depth <= oDepth) {
			if (this.fsw.options.backendCapabilities.recursive && depth === 0 && !target && !wh.recursiveRoot && !wh.recursiveDisabled) {
				const recursiveCloser = await this.watchRecursiveDirectory(dir, initialAdd, depth, wh);
				if (recursiveCloser !== false) return recursiveCloser;
			}
			if (wh.recursiveRoot) {
				if (!target) await this.scanRecursiveTree(dir, initialAdd, wh, depth);
				return;
			}
			const buffered = new ReplayBuffer(RECURSIVE_TRIGGER_BUFFER_LIMIT);
			const replayCreates = /* @__PURE__ */ new Set();
			let initializing = !target;
			let active = true;
			let rescanOnFirstCallback = isMacos && !target;
			const targetPath = target ? sp.join(dir, target) : void 0;
			const rewatchTarget = () => {
				if (targetPath && active && this.isHelperActive(wh, targetPath)) this.fsw.rewatchMissingPath(targetPath);
			};
			const removeObserved = (dirPath) => {
				if (target) {
					if (this.fsw.tree.getDirectory(dirPath).has(target)) this.fsw.removePath(dirPath, target);
					rewatchTarget();
					return;
				}
				this.fsw.removePath(sp.dirname(dirPath), sp.basename(dirPath), true);
			};
			const observeDirectory = async (dirPath, currentStats, trigger) => {
				if (!active || !this.isHelperActive(wh, dirPath)) return;
				if (this.fsw.options.backendCapabilities.polling && !currentStats) {
					removeObserved(dirPath);
					return;
				}
				if (trigger.kind === "native") {
					let observedStats;
					try {
						const linkStats = await lstat(dirPath);
						observedStats = linkStats.isSymbolicLink() && this.fsw.options.followSymlinks ? await stat$1(dirPath) : linkStats;
					} catch (error) {
						if (isMissingError(error)) removeObserved(dirPath);
						else this.reportError(error);
						return;
					}
					if (!observedStats.isDirectory()) {
						removeObserved(dirPath);
						if (!target) await this.addPathOnce(dirPath, false, wh, depth);
						return;
					}
				}
				await this.readDirectory(dirPath, false, wh, target, dir, depth);
			};
			const reconcile = (candidate, currentStats, trigger) => {
				if (!active || !this.isHelperActive(wh, candidate)) return;
				if (initializing) {
					buffered.push({
						path: candidate,
						stats: currentStats,
						trigger
					});
					return;
				}
				if (trigger.kind === "native" && !target) {
					if (rescanOnFirstCallback) {
						rescanOnFirstCallback = false;
						return (async () => {
							await this.reconcileNativeTrigger(dir, wh, trigger, candidate, depth);
							await observeDirectory(dir, void 0, trigger);
						})();
					}
					return this.reconcileNativeTrigger(dir, wh, trigger, candidate, depth);
				}
				if (trigger.kind === "native" && target) {
					if (candidate === dir || (isWindows ? sp.basename(candidate).toLowerCase() === target.toLowerCase() : sp.basename(candidate) === target)) return this.reconcileNativeTrigger(dir, wh, trigger, targetPath, depth, { onRootMissing: rewatchTarget });
				}
				return observeDirectory(dir, currentStats, trigger);
			};
			const rootParentCloser = depth === 0 && !target ? this.watchRootParent(dir, wh) : void 0;
			closer = this.subscribePath(dir, reconcile, stats.isDirectory() ? stats : void 0, true, target ? sp.join(dir, target) : dir);
			if (target && targetPath && closer) {
				const check = recoveryTrigger(sp.resolve(dir));
				await this.fsw.reconciliation.enqueue(targetPath, async () => {
					if (this.fsw.tree.getDirectory(dir).has(target)) return;
					await reconcile(targetPath, void 0, check);
				}, targetPath);
			}
			if (!target) {
				await this.readDirectory(dir, initialAdd, wh, target, dir, depth);
				let index = 0;
				while (!this.fsw.closed) {
					if (buffered.overflow) {
						const overflow = buffered.overflow;
						buffered.clear();
						index = 0;
						await observeDirectory(dir, overflow.stats, overflow.trigger);
						continue;
					}
					if (index >= buffered.entries.length) break;
					const event = buffered.entries[index++];
					if (event.trigger.kind === "native" && event.trigger.rawEvent === "rename" && event.path !== dir && this.fsw.tree.getDirectory(sp.dirname(event.path)).has(sp.basename(event.path))) {
						this.fsw.tree.markInitialCreate(event.path);
						replayCreates.add(event.path);
					}
					await this.reconcileBackendTrigger(dir, true, event.trigger, () => {
						if (event.trigger.kind === "native" && !target) return this.reconcileNativeTrigger(dir, wh, event.trigger, event.path, depth);
						return observeDirectory(dir, event.stats, event.trigger);
					}, () => active && this.isHelperActive(wh, event.path), false);
				}
				buffered.clear();
				replayCreates.forEach((path) => this.fsw.tree.clearInitialCreate(path));
				initializing = false;
			}
			if (!this.isHelperActive(wh, dir)) {
				active = false;
				if (closer) await closer();
				if (rootParentCloser) await rootParentCloser();
				return;
			}
			if (closer || rootParentCloser) {
				const backendClosers = [closer, rootParentCloser].filter((candidate) => candidate !== void 0);
				closer = async () => {
					if (!active) return;
					active = false;
					buffered.clear();
					await Promise.allSettled(backendClosers.map((backendCloser) => backendCloser()));
				};
			}
		}
		return closer;
	}
	async addRoot(path, initialAdd, pathGeneration, target) {
		let candidate = path;
		let childTarget = target;
		const generation = this.fsw.lifecycle.generation;
		while (this.fsw.lifecycle.isActive(generation)) {
			if (await this.addPathOnce(candidate, initialAdd, void 0, 0, childTarget, pathGeneration) === "complete") return;
			const parent = sp.dirname(candidate);
			if (parent === candidate) return;
			childTarget = sp.basename(candidate);
			candidate = parent;
		}
	}
	async addPathOnce(path, initialAdd, priorWh, depth, target, pathGeneration) {
		if (this.fsw.isIgnored(path) || this.fsw.closed) return "complete";
		const wh = priorWh ? priorWh.fork(path) : this.fsw.createHelper(path);
		if (!priorWh && pathGeneration !== void 0) wh.pathGeneration = pathGeneration;
		if (!this.isHelperActive(wh)) return "complete";
		try {
			const linkStats = await lstat(wh.watchPath);
			if (!this.isHelperActive(wh)) return "complete";
			if (this.fsw.isIgnored(wh.watchPath, linkStats)) return "complete";
			const follow = this.fsw.options.followSymlinks;
			const isSymbolicLink = linkStats.isSymbolicLink();
			const stats = isSymbolicLink && follow ? await stat$1(wh.watchPath) : linkStats;
			const followedTarget = isSymbolicLink && follow ? await realpath(path) : void 0;
			let closer;
			if (stats.isDirectory()) {
				const absPath = logicalPathKey(path);
				const ancestryPath = follow ? await realpath(path) : path;
				const targetPath = followedTarget ?? path;
				const targetKey = logicalPathKey(ancestryPath);
				if (!this.isHelperActive(wh)) return "complete";
				if (isSymbolicLink && wh.realpathAncestry.has(targetKey)) {
					this.fsw.tree.getDirectory(sp.dirname(wh.watchPath)).add(sp.basename(wh.watchPath));
					this.fsw.tree.getDirectory(wh.watchPath);
					this.fsw.tree.symlinkPaths.set(absPath, targetPath);
					this.fsw.tree.recordObserved(wh.watchPath, stats, "add", wh.observationTrigger, initialAdd && Boolean(wh.recursiveRoot));
					if (!(initialAdd && this.fsw.options.ignoreInitial)) this.fsw.emitEvent(EV.ADD_DIR, wh.watchPath, stats);
					return "complete";
				}
				wh.realpathAncestry.add(targetKey);
				if (wh.recursiveRoot && isSymbolicLink) wh.recursiveRoot = void 0;
				if (isSymbolicLink) wh.recursiveDisabled = true;
				closer = await this.handleDirectory(wh.watchPath, stats, initialAdd, depth, target, wh);
				if (!this.isHelperActive(wh)) {
					if (closer) await closer();
					return "complete";
				}
				if (target && !closer) return "watch-parent";
				if (isSymbolicLink) this.fsw.tree.symlinkPaths.set(absPath, targetPath);
			} else if (isSymbolicLink && !follow) {
				const linkTarget = await readlink(path);
				const retainsNativeFact = !this.fsw.options.backendCapabilities.polling && !wh.recursiveRoot && !priorWh;
				const fileCloser = this.handleFile(wh.watchPath, stats, initialAdd, !wh.recursiveRoot, wh.observationTrigger, initialAdd && Boolean(wh.recursiveRoot), retainsNativeFact);
				if (wh.recursiveRoot) {
					this.fsw.tree.symlinkPaths.set(logicalPathKey(path), linkTarget);
					return "complete";
				}
				const parent = sp.dirname(wh.watchPath);
				const parentStats = await stat$1(parent);
				const parentHelper = this.fsw.createHelper(parent);
				parentHelper.pathGeneration = wh.pathGeneration;
				const parentCloser = await this.handleDirectory(parent, parentStats, initialAdd, depth, sp.basename(wh.watchPath), parentHelper);
				const deletionCloser = this.watchSymlinkDeletion(wh.watchPath);
				if (!this.isHelperActive(wh)) {
					if (fileCloser) await fileCloser();
					if (parentCloser) await parentCloser();
					if (deletionCloser) deletionCloser();
					return "complete";
				}
				closer = async () => {
					await Promise.allSettled([
						fileCloser,
						parentCloser,
						deletionCloser
					].filter((candidate) => candidate !== void 0).map((backendCloser) => backendCloser()));
				};
				this.fsw.tree.symlinkPaths.set(logicalPathKey(path), linkTarget);
			} else {
				if (followedTarget) this.fsw.tree.symlinkPaths.set(logicalPathKey(path), followedTarget);
				const retainsNativeFact = !this.fsw.options.backendCapabilities.polling && !wh.recursiveRoot && !priorWh;
				const fileCloser = this.handleFile(wh.watchPath, stats, initialAdd, !wh.recursiveRoot, wh.observationTrigger, initialAdd && Boolean(wh.recursiveRoot), retainsNativeFact);
				const targetPath = followedTarget ?? (retainsNativeFact ? wh.watchPath : void 0);
				const targetCloser = targetPath ? this.subscribeMappedFile(wh.watchPath, targetPath, wh, depth, isMacos && stats.isFile()) : void 0;
				let parentCloser;
				if (retainsNativeFact && followedTarget) {
					const parent = sp.dirname(wh.watchPath);
					const parentStats = await stat$1(parent);
					const parentHelper = this.fsw.createHelper(parent);
					parentHelper.pathGeneration = wh.pathGeneration;
					parentCloser = await this.handleDirectory(parent, parentStats, initialAdd, depth, sp.basename(wh.watchPath), parentHelper);
				}
				const fileClosers = [
					fileCloser,
					targetCloser,
					parentCloser
				].filter((candidate) => candidate !== void 0);
				closer = fileClosers.length === 0 ? void 0 : async () => {
					await Promise.allSettled(fileClosers.map((fileCloser) => fileCloser()));
				};
			}
			if (!this.isHelperActive(wh)) {
				if (closer) await closer();
				return "complete";
			}
			if (closer) this.fsw.addPathCloser(target ? sp.join(path, target) : path, closer);
			return "complete";
		} catch (error) {
			if (!this.isHelperActive(wh)) return "complete";
			this.fsw.handleError(error);
			return "watch-parent";
		}
	}
};
var DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
var WATCH_BACKENDS = /* @__PURE__ */ new Set([
	"auto",
	"native",
	"native-recursive",
	"polling"
]);
var DEF_AWF = Object.freeze({
	stabilityThreshold: 2e3,
	pollInterval: 100
});
function* ancestorKeys(path) {
	let current = sp.resolve(path);
	for (let parent = sp.dirname(current); parent !== current; parent = sp.dirname(parent)) {
		yield logicalPathKey(parent);
		current = parent;
	}
}
function arrify(item) {
	return Array.isArray(item) ? item : [item];
}
function unifyPaths(paths_) {
	const paths = arrify(paths_).flat();
	if (!paths.every((p) => typeof p === "string")) throw new TypeError(`Non-string provided as watch path: ${paths}`);
	return paths.map(normalizePath$1);
}
function getAbsolutePath(path, cwd) {
	if (sp.isAbsolute(path)) return path;
	return sp.join(cwd, path);
}
function validatePositiveFinite(name, value) {
	if (!Number.isFinite(value) || value <= 0) throw new TypeError(`${name} must be a finite number greater than zero`);
}
function validateNonNegativeFinite(name, value) {
	if (!Number.isFinite(value) || value < 0) throw new TypeError(`${name} must be a finite non-negative number`);
}
function validateOptions(opts) {
	validatePositiveFinite("pollingInterval", opts.pollingInterval);
	validatePositiveFinite("pollingBinaryInterval", opts.pollingBinaryInterval);
	if (typeof opts.atomic === "number") validateNonNegativeFinite("atomic", opts.atomic);
	else if (typeof opts.atomic !== "boolean") throw new TypeError("atomic must be a boolean or finite non-negative number");
	if (opts.depth !== void 0 && (!Number.isSafeInteger(opts.depth) || opts.depth < 0)) throw new TypeError("depth must be a non-negative safe integer");
	if (opts.awaitWriteFinish) {
		validatePositiveFinite("awaitWriteFinish.pollInterval", opts.awaitWriteFinish.pollInterval);
		validateNonNegativeFinite("awaitWriteFinish.stabilityThreshold", opts.awaitWriteFinish.stabilityThreshold);
	}
}
var FSWatcher = class extends EventEmitter {
	options;
	lifecycle;
	tree;
	reconciliation;
	events;
	scheduler;
	handler;
	readyEmitted;
	streams;
	get closed() {
		return this.lifecycle !== void 0 && this.lifecycle.state !== "OPEN";
	}
	#ignoredPaths;
	#pendingAdds;
	#pathMutation;
	#pathBarriers;
	#closePromise;
	#userIgnored;
	#realDirs;
	#roots;
	#rootAncestors;
	#unwatchIgnored;
	#readyPending;
	#readyScheduled;
	constructor(_opts = {}, scheduler = systemScheduler) {
		super();
		if (_opts.backend !== void 0 && !WATCH_BACKENDS.has(_opts.backend)) throw new TypeError("backend must be auto, native, native-recursive, or polling");
		this.#ignoredPaths = /* @__PURE__ */ new Set();
		this.streams = /* @__PURE__ */ new Set();
		this.#pendingAdds = /* @__PURE__ */ new Map();
		this.#pathMutation = 0;
		this.#pathBarriers = /* @__PURE__ */ new Map();
		this.#realDirs = /* @__PURE__ */ new Map();
		this.#roots = /* @__PURE__ */ new Set();
		this.#rootAncestors = /* @__PURE__ */ new Map();
		this.readyEmitted = false;
		this.#readyPending = false;
		this.#readyScheduled = false;
		this.scheduler = scheduler;
		const awf = _opts.awaitWriteFinish;
		const opts = {
			..._opts,
			persistent: _opts.persistent ?? true,
			ignoreInitial: _opts.ignoreInitial ?? false,
			ignorePermissionErrors: _opts.ignorePermissionErrors ?? false,
			pollingInterval: _opts.pollingInterval ?? _opts.interval ?? 100,
			pollingBinaryInterval: _opts.pollingBinaryInterval ?? _opts.binaryInterval ?? 300,
			interval: 100,
			binaryInterval: 300,
			followSymlinks: _opts.followSymlinks ?? true,
			backend: _opts.backend ?? "auto",
			usePolling: _opts.usePolling ?? false,
			depth: _opts.depth === Number.POSITIVE_INFINITY ? void 0 : _opts.depth,
			backendStrategy: "native-per-directory",
			backendCapabilities: void 0,
			atomic: _opts.atomic ?? true,
			ignored: Object.freeze(_opts.ignored ? arrify(_opts.ignored).map(cloneOwnedMatcher) : []),
			awaitWriteFinish: awf === true ? DEF_AWF : typeof awf === "object" ? Object.freeze({
				...DEF_AWF,
				...awf
			}) : false
		};
		if (_opts.usePolling === true || isIBMi) opts.backend = "polling";
		const envPoll = process.env.CHOKIDAR_USEPOLLING;
		if (envPoll !== void 0) {
			const envLower = envPoll.toLowerCase();
			if (envLower === "false" || envLower === "0" ? false : envLower === "true" || envLower === "1" ? true : !!envLower) opts.backend = "polling";
			else if (opts.backend === "polling") opts.backend = "auto";
		}
		const envInterval = process.env.CHOKIDAR_INTERVAL;
		if (envInterval !== void 0) opts.pollingInterval = Number(envInterval);
		opts.interval = opts.pollingInterval;
		opts.binaryInterval = opts.pollingBinaryInterval;
		opts.usePolling = opts.backend === "polling";
		opts.backendCapabilities = selectBackend(opts);
		opts.backendStrategy = opts.backendCapabilities.kind;
		if (_opts.atomic === void 0) opts.atomic = !opts.usePolling;
		validateOptions(opts);
		this.options = opts;
		this.lifecycle = new LifecycleScope(() => {
			if (this.#readyPending) this.queueReady();
		}, (error) => {
			if (!this.closed) this.handleError(error instanceof Error ? error : new Error(String(error)));
		});
		this.tree = new TreeState(() => !this.options.backendCapabilities.polling);
		this.reconciliation = new ReconciliationQueue(this.lifecycle);
		this.events = new EventPolicy({
			options: this.options,
			scheduler: this.scheduler,
			lifecycle: this.lifecycle,
			isClosed: () => this.closed,
			capturePathGeneration: () => this.capturePathGeneration(),
			isPathGenerationActive: (path, generation) => this.isPathGenerationActive(path, generation),
			isReady: () => this.readyEmitted,
			remove: (directory, item) => this.removePath(directory, item),
			handleError: (error) => this.handleError(error),
			publish: (event, args) => this.emitWithAll(event, args)
		});
		this.handler = new ObservationEngine(this);
		Object.freeze(opts);
	}
	addIgnoredPath(matcher) {
		matcher = this.ignoredMatcher(matcher);
		if (isMatcherObject(matcher)) {
			for (const ignored of this.#ignoredPaths) if (isMatcherObject(ignored) && ignored.path === matcher.path && ignored.recursive === matcher.recursive) return;
		}
		this.#ignoredPaths.add(matcher);
		this.#unwatchIgnored = void 0;
	}
	removeIgnoredPath(matcher) {
		matcher = this.ignoredMatcher(matcher);
		this.#ignoredPaths.delete(matcher);
		if (typeof matcher === "string") {
			for (const ignored of this.#ignoredPaths) if (isMatcherObject(ignored) && ignored.path === matcher) this.#ignoredPaths.delete(ignored);
		}
		this.#unwatchIgnored = void 0;
	}
	ignoredMatcher(matcher) {
		if (typeof matcher === "string") return logicalPathKey(matcher);
		if (isMatcherObject(matcher)) return {
			path: logicalPathKey(matcher.path),
			recursive: matcher.recursive
		};
		return matcher;
	}
	capturePathGeneration() {
		return this.#pathMutation;
	}
	invalidatePath(path) {
		this.#pathBarriers.set(logicalPathKey(path), ++this.#pathMutation);
	}
	isPathGenerationActive(path, generation) {
		if (this.lifecycle.state !== "OPEN") return false;
		if (this.#pathBarriers.size === 0) return true;
		const logicalKey = logicalPathKey(path);
		for (const [barrier, barrierGeneration] of this.#pathBarriers) {
			if (barrierGeneration <= generation) continue;
			if (isSameOrInside(barrier, logicalKey)) return false;
		}
		return true;
	}
	queueReady() {
		if (this.closed || this.readyEmitted) return;
		this.#readyPending = true;
		if (this.lifecycle.tasks.size > 0 || this.#readyScheduled) return;
		this.#readyScheduled = true;
		process.nextTick(() => {
			this.#readyScheduled = false;
			if (this.closed || this.readyEmitted || this.lifecycle.tasks.size > 0) return;
			this.#readyPending = false;
			this.readyEmitted = true;
			this.emit(EVENTS.READY);
		});
	}
	add(paths_) {
		if (this.closed) throw new Error("Cannot add paths after FSWatcher.close() has been called");
		const { cwd } = this.options;
		let paths = unifyPaths(paths_);
		if (cwd) paths = paths.map((path) => {
			return getAbsolutePath(path, cwd);
		});
		paths.forEach((path) => {
			this.removeIgnoredPath(path);
			this.addRootAncestors(path);
		});
		if (!this.readyEmitted) this.#readyPending = true;
		const addTask = Promise.all(paths.map(async (path) => {
			const key = logicalPathKey(path);
			if (this.lifecycle.closers.has(key) || this.#pendingAdds.has(key)) return;
			const pendingToken = Symbol(key);
			const pathGeneration = this.capturePathGeneration();
			this.#pendingAdds.set(key, pendingToken);
			try {
				await this.handler.addRoot(path, true, pathGeneration);
			} finally {
				if (this.#pendingAdds.get(key) === pendingToken) this.#pendingAdds.delete(key);
			}
		}));
		this.lifecycle.track(addTask);
		if (!this.readyEmitted) this.queueReady();
		return this;
	}
	unwatch(paths_) {
		if (this.closed) return this;
		let paths = unifyPaths(paths_);
		const { cwd } = this.options;
		if (cwd) paths = paths.map((path) => getAbsolutePath(path, cwd));
		paths.forEach((path) => {
			const key = logicalPathKey(path);
			const isDirectory = this.tree.watched.has(key);
			this.invalidatePath(key);
			this.removeRootAncestors(key);
			this.#pendingAdds.delete(key);
			this.events.cancelPath(key);
			this.closePath(key, isDirectory);
			this.addIgnoredPath(key);
			if (isDirectory) this.addIgnoredPath({
				path: key,
				recursive: true
			});
			this.#unwatchIgnored = void 0;
		});
		return this;
	}
	close() {
		if (this.#closePromise) return this.#closePromise;
		const closers = this.lifecycle.beginClose();
		this.removeAllListeners();
		this.events.close();
		this.#pendingAdds.clear();
		this.#roots.clear();
		this.#rootAncestors.clear();
		this.streams.forEach((stream) => stream.destroy());
		this.#userIgnored = void 0;
		this.#unwatchIgnored = void 0;
		this.readyEmitted = false;
		this.tree.dispose();
		this.#pathBarriers.clear();
		this.streams.clear();
		this.reconciliation.clear();
		this.#realDirs.clear();
		this.#closePromise = (async () => {
			const closerResults = await Promise.allSettled(closers);
			await this.lifecycle.drain();
			this.lifecycle.finishClose();
			const failed = closerResults.find((result) => result.status === "rejected");
			if (failed) throw failed.reason;
		})();
		return this.#closePromise;
	}
	getWatched() {
		const watchList = Object.create(null);
		this.tree.watched.forEach((entry) => {
			const dir = entry.path;
			const index = (this.options.cwd ? sp.relative(this.options.cwd, dir) : dir) || ".";
			watchList[index] = entry.getChildren().sort();
		});
		return watchList;
	}
	emitRaw(...args) {
		if (!this.closed) this.emit(EVENTS.RAW, ...args);
	}
	emitWithAll(event, args) {
		this.emit(event, ...args);
		if (event !== EVENTS.ERROR) this.emit(EVENTS.ALL, event, ...args);
	}
	async emitEvent(event, path, stats) {
		if (this.closed) return;
		await this.events.emit(event, path, stats);
	}
	handleError(error) {
		if (this.closed) return;
		const normalized = error instanceof Error ? error : new Error(String(error));
		if (!isMissingError(normalized) && (!this.options.ignorePermissionErrors || !isPermissionError(normalized))) this.emit(EVENTS.ERROR, normalized);
	}
	isIgnored(path, stats) {
		if (this.options.atomic && DOT_RE.test(path)) return true;
		if (!this.#userIgnored) {
			const { cwd } = this.options;
			const ignored = (this.options.ignored || []).map((matcher) => normalizeMatcher(matcher, cwd));
			const direct = compileMatchers(ignored);
			const pathMatchers = ignored.filter((matcher) => typeof matcher === "string" || isMatcherObject(matcher));
			const canonical = compileMatchers(pathMatchers);
			this.#userIgnored = (candidate, candidateStats) => {
				if (direct(candidate, candidateStats)) return true;
				if (isWindows || pathMatchers.length === 0) return false;
				const absoluteCandidate = sp.resolve(candidate);
				let realPath;
				if (candidateStats?.isDirectory()) realPath = this.realDirectory(absoluteCandidate);
				else {
					const realDir = this.realDirectory(sp.dirname(absoluteCandidate));
					if (realDir !== void 0) realPath = sp.join(realDir, sp.basename(absoluteCandidate));
				}
				return realPath !== void 0 && realPath !== absoluteCandidate && canonical(realPath, candidateStats);
			};
		}
		if (this.#userIgnored(path, stats) && !this.isRootAncestor(path, stats)) return true;
		if (this.#ignoredPaths.size === 0) return false;
		if (!this.#unwatchIgnored) this.#unwatchIgnored = compileMatchers([...this.#ignoredPaths]);
		return this.#unwatchIgnored(logicalPathKey(path), stats);
	}
	isRootAncestor(path, stats) {
		if (stats?.isFile()) return false;
		return this.#rootAncestors.has(logicalPathKey(path));
	}
	addRootAncestors(path) {
		const key = logicalPathKey(path);
		if (this.#roots.has(key)) return;
		this.#roots.add(key);
		for (const ancestor of ancestorKeys(path)) this.#rootAncestors.set(ancestor, (this.#rootAncestors.get(ancestor) ?? 0) + 1);
	}
	removeRootAncestors(path) {
		if (!this.#roots.delete(logicalPathKey(path))) return;
		for (const ancestor of ancestorKeys(path)) {
			const count = (this.#rootAncestors.get(ancestor) ?? 1) - 1;
			if (count > 0) this.#rootAncestors.set(ancestor, count);
			else this.#rootAncestors.delete(ancestor);
		}
	}
	realDirectory(directory) {
		const key = logicalPathKey(directory);
		if (this.#realDirs.has(key)) return this.#realDirs.get(key);
		let realPath;
		try {
			realPath = realpathSync.native(directory);
		} catch {}
		this.#realDirs.set(key, realPath);
		return realPath;
	}
	isUnwatched(path) {
		if (this.#ignoredPaths.size === 0) return false;
		if (!this.#unwatchIgnored) this.#unwatchIgnored = compileMatchers([...this.#ignoredPaths]);
		return this.#unwatchIgnored(logicalPathKey(path));
	}
	createHelper(path) {
		return new WatchHelper(path, this.options.followSymlinks, {
			capturePathGeneration: () => this.capturePathGeneration(),
			isntIgnored: (candidate, stats) => !this.isIgnored(candidate, stats)
		});
	}
	removeTreeItem(directory, item) {
		const entry = this.tree.peekDirectory(directory);
		if (!entry?.remove(item)) return;
		const path = entry.path;
		const generation = this.lifecycle.generation;
		this.lifecycle.track((async () => {
			try {
				await readdir(path);
			} catch (error) {
				if (isMissingError(error) && this.lifecycle.isActive(generation)) this.removePath(sp.dirname(path), sp.basename(path));
			}
		})());
	}
	removePath(directory, item, isDirectory) {
		const path = sp.join(directory, item);
		const logicalKey = logicalPathKey(path);
		isDirectory = isDirectory != null ? isDirectory : this.tree.watched.has(logicalKey);
		const nestedDirectoryChildren = this.tree.peekDirectory(path)?.getChildren() ?? [];
		for (const nested of nestedDirectoryChildren) this.removePath(path, nested);
		const wasTracked = this.tree.peekDirectory(directory)?.has(item) ?? false;
		const hadClosers = this.lifecycle.closers.has(logicalKey);
		this.removeTreeItem(directory, item);
		if (this.tree.symlinkPaths.has(logicalKey)) this.tree.symlinkPaths.delete(logicalKey);
		const pendingWrite = this.events.pendingWrites.get(logicalKey);
		let suppressEvent = false;
		if (this.options.awaitWriteFinish && pendingWrite) suppressEvent = pendingWrite.cancelWait() === EVENTS.ADD;
		this.tree.watched.delete(logicalKey);
		this.tree.observed.delete(logicalKey);
		const eventName = isDirectory ? EVENTS.UNLINK_DIR : EVENTS.UNLINK;
		if (wasTracked && !suppressEvent && !this.isIgnored(path)) this.emitEvent(eventName, path);
		this.closePath(path);
		if ((wasTracked || hadClosers) && this.#roots.has(logicalKey)) this.rewatchMissingPath(path);
	}
	rewatchMissingPath(path) {
		if (this.closed || this.isUnwatched(path)) return;
		this.closePath(path);
		this.lifecycle.track(this.handler.addRoot(path, false, this.capturePathGeneration()));
	}
	closePath(path, recursive = false) {
		const logicalKey = logicalPathKey(path);
		const contains = (candidate) => {
			if (candidate === logicalKey) return true;
			if (!recursive) return false;
			return isStrictlyInside(logicalKey, candidate);
		};
		[...this.lifecycle.closers.keys()].filter(contains).forEach((key) => this.closeFile(key));
		if (this.#realDirs.delete(logicalKey) || recursive) {
			const prefix = logicalKey.endsWith("/") ? logicalKey : `${logicalKey}/`;
			for (const key of this.#realDirs.keys()) if (key.startsWith(prefix)) this.#realDirs.delete(key);
		}
		if (recursive) {
			for (const [key, entry] of this.tree.watched) {
				if (!contains(key)) continue;
				entry.dispose();
				this.tree.watched.delete(key);
			}
			for (const key of this.tree.observed.keys()) if (contains(key)) this.tree.observed.delete(key);
			for (const key of this.tree.symlinkPaths.keys()) if (contains(key)) this.tree.symlinkPaths.delete(key);
			this.events.cancelWhere(contains);
			this.reconciliation.forgetPending((scope, candidate) => contains(scope) || contains(candidate));
			for (const key of this.#pendingAdds.keys()) if (contains(key)) this.#pendingAdds.delete(key);
		}
		const dir = sp.dirname(logicalKey);
		this.removeTreeItem(dir, sp.basename(logicalKey));
	}
	closeFile(path) {
		const key = logicalPathKey(path);
		const closers = this.lifecycle.takeClosers(key);
		if (closers.length === 0) return;
		closers.forEach((closer) => {
			try {
				const result = closer();
				if (result instanceof Promise) this.lifecycle.track(result);
			} catch (error) {
				this.lifecycle.track(Promise.reject(error));
			}
		});
	}
	addPathCloser(path, closer) {
		if (!closer) return;
		if (this.closed || this.isUnwatched(path)) {
			try {
				const result = closer();
				if (result instanceof Promise) this.lifecycle.track(result);
			} catch (error) {
				this.lifecycle.track(Promise.reject(error));
			}
			return;
		}
		const key = logicalPathKey(path);
		this.lifecycle.addCloser(key, closer);
	}
	createScanStream(root, opts) {
		if (this.closed) return;
		const stream = readdirp(root, {
			type: EVENTS.ALL,
			alwaysStat: true,
			lstat: true,
			depth: 0,
			...opts
		});
		this.streams.add(stream);
		const finalize = () => this.streams.delete(stream);
		stream.once("close", finalize);
		stream.once("end", finalize);
		stream.once(EVENTS.ERROR, finalize);
		return stream;
	}
};
function watch$1(paths, options = {}) {
	const watcher = new FSWatcher(options);
	watcher.add(paths);
	return watcher;
}
function createWatcher(nitro, paths, options) {
	return watch$1(paths, options).on("error", (error) => onWatchError(nitro, error));
}
function onWatchError(nitro, error) {
	const code = error?.code || "";
	if (warnedCodes.has(code)) return;
	warnedCodes.add(code);
	if (code === "ENOSPC" || code === "EMFILE") {
		nitro.logger.warn(`System limit for file watchers reached (${code}). Some file changes may not be detected until the dev server is restarted.` + (process.platform === "linux" ? " You can increase the limit with `sudo sysctl fs.inotify.max_user_watches=524288`." : ""));
		return;
	}
	nitro.logger.warn("File watcher error:", error);
}
var warnedCodes = /* @__PURE__ */ new Set();
async function build(nitro) {
	if (!nitro.options.dev && nitro.options.compressPublicAssets) nitro.hooks.hookOnce("close", async () => {
		if (existsSync(nitro.options.output.publicDir)) await compressPublicAssets(nitro);
	});
	if (nitro.options.dev && nitro.options.builder === false) watchRendererTemplate(nitro);
	warnUnbuiltServices(nitro);
	switch (nitro.options.builder) {
		case "rollup": {
			const { rollupBuild } = await import("./rollup.mjs");
			return rollupBuild(nitro);
		}
		case "rolldown": {
			const { rolldownBuild } = await import("./rolldown.mjs");
			return rolldownBuild(nitro);
		}
		case "rspack": {
			const { rspackBuild } = await import("./shared3.mjs");
			return rspackBuild(nitro);
		}
		case "bun": {
			const { bunBuild } = await import("./shared2.mjs");
			return bunBuild(nitro);
		}
		case "vite": {
			const { viteBuild } = await import("./vite.build.mjs");
			return viteBuild(nitro);
		}
		case false: {
			const { unbundledBuild } = await import("./shared5.mjs");
			return unbundledBuild(nitro);
		}
		default: throw new Error(`Unknown builder: ${nitro.options.builder}`);
	}
}
function watchRendererTemplate(nitro) {
	const template = nitro.options.renderer?.template;
	if (!template) return;
	const watcher = createWatcher(nitro, template, {
		...nitro.options.watchOptions,
		ignoreInitial: true
	}).on("all", () => nitro.hooks.callHook("build:reload"));
	nitro.hooks.hook("close", () => watcher.close());
}
function warnUnbuiltServices(nitro) {
	const names = Object.keys({
		...nitro.options.vite?.services,
		...nitro.options.services
	});
	const { builder } = nitro.options;
	if (names.length === 0 || nitro._serviceLoader || builder === "vite" || nitro.options.preset === "nitro-prerender") return;
	nitro.logger.warn(`Services (${names.join(", ")}) are not built ${builder ? `by the \`${builder}\` builder` : "without a builder"} and are ignored.`);
}
var NEGATION_RE = /^(!?)(.*)$/;
var PARENT_DIR_GLOB_RE = /!?\.\.\//;
async function scanUnprefixedPublicAssets(nitro) {
	const scannedPaths = [];
	for (const asset of nitro.options.publicAssets) {
		if (asset.baseURL && asset.baseURL !== "/" && !asset.fallthrough) continue;
		const publicAssets = await globPublicAssets(nitro, asset);
		scannedPaths.push(...publicAssets.map((file) => join$2(asset.baseURL || "/", file)));
	}
	return scannedPaths;
}
async function copyPublicAssets(nitro) {
	if (nitro.options.noPublicDir) return;
	for (const asset of nitro.options.publicAssets) {
		const dstDir = join$2(nitro.options.output.publicDir, asset.baseURL);
		const publicAssets = await globPublicAssets(nitro, asset);
		await Promise.all(publicAssets.map(async (file) => {
			const src = join$2(asset.dir, file);
			const dst = join$2(dstDir, file);
			if (!existsSync(dst)) await promises.cp(src, dst);
		}));
	}
	if (nitro.options.compressPublicAssets) await compressPublicAssets(nitro);
	nitro.logger.success("Generated public " + prettyPath(nitro.options.output.publicDir));
}
function addClientAssetsDir(nitro, base) {
	const baseURL = normalizeBase(base);
	const dir = join$2(nitro.options.output.publicDir, baseURL);
	if (baseURL === "/" || !existsSync(dir)) return;
	const rule = nitro.options.routeRules[`${baseURL}/**`] ??= {};
	const immutable = rule.headers !== false && !rule.headers?.["cache-control"];
	if (immutable) rule.headers = {
		...rule.headers,
		"cache-control": "public, max-age=31536000, immutable"
	};
	if (!nitro.options.publicAssets.some((asset) => normalizeBase(asset.baseURL) === baseURL)) nitro.options.publicAssets.push({
		dir,
		baseURL,
		fallthrough: false,
		maxAge: immutable ? 31536e3 : 0
	});
}
async function globPublicAssets(nitro, asset) {
	if (!await isDirectory(asset.dir)) return [];
	return glob(getIncludePatterns(nitro, asset.dir, asset.ignore), {
		cwd: asset.dir,
		absolute: false,
		dot: true
	});
}
function getIncludePatterns(nitro, assetDir, ignorePatterns = nitro.options.ignore) {
	return ["**", ...(ignorePatterns || []).map((p) => {
		const [_, negation, pattern] = p.match(NEGATION_RE) || [];
		return (negation ? "" : "!") + (pattern.startsWith("*") ? pattern : relative$2(assetDir, resolve$2(nitro.options.rootDir, pattern)));
	})].filter((p) => !PARENT_DIR_GLOB_RE.test(p));
}
function normalizeBase(base = "/") {
	return withoutTrailingSlash(join$2("/", base));
}
async function prepare(nitro, opts = {}) {
	if (nitro.options.builder === false) {
		const { assertUnbundledSupport } = await import("./shared5.mjs");
		assertUnbundledSupport(nitro);
	}
	const dirsToClean = [
		nitro.options.output.dir,
		...!nitro.options.noPublicDir ? [nitro.options.output.publicDir] : [],
		...!nitro.options.static ? [nitro.options.output.serverDir] : []
	];
	const generatedAssetDirs = new Set(opts.generatedAssetDirs?.map((dir) => resolve$2(dir)));
	for (const asset of nitro.options.publicAssets) {
		const sourceDir = resolve$2(asset.dir);
		if (generatedAssetDirs.has(sourceDir)) continue;
		const actualSourceDir = await realpathOrUndefined(sourceDir);
		if (!actualSourceDir) continue;
		const sourceLinkDir = join$2(await fs$1.realpath(dirname$2(sourceDir)), basename$2(sourceDir));
		for (const outputDir of dirsToClean) {
			const actualOutputDir = await realpathOrUndefined(outputDir) || resolve$2(outputDir);
			if (isInside(actualOutputDir, sourceLinkDir) || isInside(actualOutputDir, actualSourceDir)) throw new Error(`Cannot prepare output directory ${outputDir}: publicAssets source ${asset.dir} is inside it and would be deleted.`);
		}
	}
	for (const dir of dirsToClean) await prepareDir(dir);
}
async function prepareDir(dir) {
	await fs$1.rm(dir, {
		recursive: true,
		force: true
	});
	await fs$1.mkdir(dir, { recursive: true });
}
async function realpathOrUndefined(path) {
	return fs$1.realpath(path).catch((error) => {
		if (error.code === "ENOENT") return;
		throw error;
	});
}
function isInside(parent, child) {
	const path = relative$2(parent, child);
	return !path || path !== ".." && !path.startsWith("../") && !isAbsolute$2(path);
}
var presetsWithConfig = [
	"awsAmplify",
	"awsLambda",
	"azure",
	"cloudflare",
	"firebase",
	"iis",
	"netlify",
	"vercel",
	"zephyr"
];
var BUILD_EXTENSIONS = [
	".ts",
	".mjs",
	".js",
	".json",
	".node",
	".tsx",
	".jsx"
];
var NITRO_WELLKNOWN_DIR = "node_modules/.nitro";
async function getBuildInfo(opts) {
	const rootDir = resolve$2(opts.rootDir || ".");
	const outputDir = opts.outputDir ? resolve$2(rootDir, opts.outputDir) : await findLastBuildDir(rootDir);
	if (!await stat$1(outputDir).then((s) => s.isDirectory()).catch(() => false)) return {};
	return {
		outputDir,
		buildInfo: await readFile(resolve$2(outputDir, "nitro.json"), "utf8").then(JSON.parse).catch(() => void 0)
	};
}
async function findLastBuildDir(root) {
	const lastBuildLink = join$2(root, NITRO_WELLKNOWN_DIR, "last-build.json");
	return await readFile(lastBuildLink, "utf8").then(JSON.parse).then((data) => resolve$2(lastBuildLink, data.outputDir || "../../../.output")).catch(() => resolve$2(root, ".output"));
}
async function writeBuildInfo(nitro, output) {
	const serverEntryName = resolveNitroServerEntry(nitro, output);
	const buildInfoPath = resolve$2(nitro.options.output.dir, "nitro.json");
	const buildInfo = {
		date: (/* @__PURE__ */ new Date()).toJSON(),
		preset: nitro.options.preset,
		envName: nitro.options.envName,
		framework: nitro.options.framework,
		versions: { nitro: version },
		serverEntry: serverEntryName ? relative$2(nitro.options.output.dir, join$2(nitro.options.output.serverDir, serverEntryName)) : void 0,
		publicDir: relative$2(nitro.options.output.dir, resolve$2(nitro.options.output.dir, nitro.options.output.publicDir)),
		commands: {
			preview: nitro.options.commands.preview,
			deploy: typeof nitro.options.commands.deploy === "string" ? nitro.options.commands.deploy : void 0
		},
		config: { ...Object.fromEntries(presetsWithConfig.map((key) => [key, nitro.options[key]])) }
	};
	await writeFile$1(buildInfoPath, JSON.stringify(buildInfo, null, 2), true);
	const lastBuild = join$2(nitro.options.rootDir, NITRO_WELLKNOWN_DIR, "last-build.json");
	await mkdir(dirname(lastBuild), { recursive: true });
	await writeFile$1(lastBuild, JSON.stringify({ outputDir: relative$2(lastBuild, nitro.options.output.dir) }));
	return buildInfo;
}
async function writeDevBuildInfo(nitro, dev) {
	const buildInfoPath = join$2(nitro.options.rootDir, NITRO_WELLKNOWN_DIR, "nitro.dev.json");
	const buildInfo = {
		date: (/* @__PURE__ */ new Date()).toJSON(),
		preset: nitro.options.preset,
		envName: nitro.options.envName,
		framework: nitro.options.framework,
		versions: { nitro: version },
		dev: {
			pid: process.pid,
			...dev
		}
	};
	await writeFile$1(buildInfoPath, JSON.stringify(buildInfo, null, 2));
}
function resolveNitroServerEntry(nitro, output) {
	const entries = output?.output.filter((item) => item.type === "chunk" && item.isEntry) ?? [];
	if (entries.length < 2) return entries[0]?.fileName;
	const nitroEntry = resolve$2(!nitro.options.entry.startsWith("#") && resolveModulePath(nitro.options.entry, {
		try: true,
		extensions: BUILD_EXTENSIONS
	}) || nitro.options.entry);
	const match = entries.find((item) => item.type === "chunk" && !!item.facadeModuleId && resolve$2(item.facadeModuleId) === nitroEntry);
	if (!match) nitro.logger.warn(`Could not find the output chunk for Nitro entry \`${nitro.options.entry}\`. Using \`${entries[0].fileName}\` as server entry.`);
	return (match || entries[0]).fileName;
}
async function importVite(opts) {
	_assertPluginVite(opts);
	return importDep(_viteDep(opts));
}
async function resolveViteModuleRunner(opts) {
	_assertPluginVite(opts);
	const viteEntry = await ensureDep(_viteDep(opts));
	if (viteEntry && opts.path) return _resolveFromPath("vite/module-runner", opts);
	const moduleRunner = viteEntry && resolveModulePath("vite/module-runner", {
		from: [
			viteEntry,
			opts.dir,
			import.meta.url
		],
		try: true
	});
	if (!moduleRunner) throw new Error("Cannot resolve `vite/module-runner`. Is `vite` installed in your project?");
	return moduleRunner;
}
function viteImportOptions(nitro) {
	return {
		dir: nitro.options.rootDir,
		path: nitro.options.vite?.path || _runningVite.get(nitro),
		plugin: _runningVite.has(nitro),
		deps: nitro.options.deps
	};
}
function viteDepPaths(nitro) {
	const paths = nitro.options.deps?.paths;
	const vite = viteImportOptions(nitro).path;
	return vite && !paths?.vite ? {
		...paths,
		vite
	} : paths;
}
function setRunningVite(nitro, config) {
	let entry = _viteEnvEntry(config);
	if (entry) try {
		_resolveFromPath("vite", {
			dir: nitro.options.rootDir,
			path: entry
		});
	} catch {
		entry = void 0;
	}
	_runningVite.set(nitro, entry);
}
var _runningVite = /* @__PURE__ */ new WeakMap();
function _assertPluginVite(opts) {
	const dep = _viteDep(opts);
	if (opts.plugin && !opts.path && !resolveDep(dep.id, dep)) throw new Error(`Cannot locate the \`vite\` package running the \`nitro/vite\` plugin, and \`vite\` cannot be resolved from \`${opts.dir}\`. Set the \`vite.path\` option to the running \`vite\` package (e.g. \`import.meta.resolve("vite")\`).`);
}
function _viteEnvEntry(config) {
	for (const { replacement } of config.resolve?.alias || []) {
		const path = /^\/@fs\/(.+\/dist\/client\/env\.mjs)$/.exec(replacement)?.[1];
		if (path) return /^[a-z]:\//i.test(path) ? path : `/${path}`;
	}
}
function _viteDep(opts) {
	const id = opts.id || "vite";
	return {
		id,
		dir: opts.dir,
		reason: deps.vite.reason,
		version: deps.vite.version,
		deps: {
			...opts.deps,
			paths: opts.path ? { [id]: opts.path } : void 0
		}
	};
}
function _resolveFromPath(id, { dir, path }) {
	return resolveFromDepPath(id, {
		dir,
		path
	});
}
async function runParallel(inputs, cb, opts) {
	const errors = [];
	const tasks = /* @__PURE__ */ new Set();
	function queueNext() {
		const route = inputs.values().next().value;
		if (!route) return;
		inputs.delete(route);
		const task = (opts.interval ? new Promise((resolve) => setTimeout(resolve, opts.interval)) : Promise.resolve()).then(() => cb(route)).catch((error) => {
			console.error(error);
			errors.push(error);
		});
		tasks.add(task);
		return task.then(() => {
			tasks.delete(task);
			if (inputs.size > 0) return refillQueue();
		});
	}
	function refillQueue() {
		const workers = Math.min(opts.concurrency - tasks.size, inputs.size);
		return Promise.all(Array.from({ length: workers }, () => queueNext()));
	}
	await refillQueue();
	return { errors };
}
var prerenderMetas = /* @__PURE__ */ new WeakMap();
function getPrerenderMeta(nitro) {
	let meta = prerenderMetas.get(nitro);
	if (!meta) {
		meta = {};
		prerenderMetas.set(nitro, meta);
	}
	return meta;
}
var ASSET_EXT_RE = /^(?:[jt]sx?|mjs|cjs|css|s[ac]ss|less|styl|vue|svelte|astro|mdx?|map|wasm|png|jpe?g|gif|svg|webp|avif|ico|bmp|woff2?|ttf|otf|eot|mp[34]|webm|wav|ogg|m4a)$/i;
function escapeRegExp$1(string) {
	return string.replace(/[-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);
}
function pathRegExp(string) {
	if (U) string = string.replace(/\\/g, "/");
	let escaped = escapeRegExp$1(string);
	if (U) escaped = escaped.replace(/\//g, String.raw`[/\\]`);
	return escaped;
}
function toPathRegExp(input) {
	if (input instanceof RegExp) return input;
	if (typeof input === "string") return new RegExp(pathRegExp(input));
	throw new TypeError("Expected a string or RegExp", { cause: input });
}
var unenvNodeModules = [
	"assert",
	"assert/strict",
	"async_hooks",
	"buffer",
	"child_process",
	"cluster",
	"console",
	"constants",
	"crypto",
	"dgram",
	"diagnostics_channel",
	"dns",
	"dns/promises",
	"domain",
	"events",
	"fs",
	"fs/promises",
	"http",
	"http2",
	"https",
	"inspector",
	"inspector/promises",
	"module",
	"net",
	"os",
	"path",
	"perf_hooks",
	"process",
	"punycode",
	"querystring",
	"readline",
	"readline/promises",
	"repl",
	"stream",
	"stream/consumers",
	"stream/promises",
	"stream/web",
	"string_decoder",
	"timers",
	"timers/promises",
	"tls",
	"trace_events",
	"tty",
	"url",
	"util",
	"util/types",
	"v8",
	"vm",
	"wasi",
	"worker_threads",
	"zlib"
];
var unenvMockedModules = [
	"_http_agent",
	"_http_client",
	"_http_common",
	"_http_incoming",
	"_http_outgoing",
	"_http_server",
	"_stream_duplex",
	"_stream_passthrough",
	"_stream_readable",
	"_stream_transform",
	"_stream_wrap",
	"_stream_writable",
	"_tls_common",
	"_tls_wrap"
];
var unenvNodeAliases = {
	...Object.fromEntries(unenvNodeModules.map((m) => [m, `unenv/node/${m}`])),
	...Object.fromEntries(unenvMockedModules.map((m) => [m, "unenv/mock/proxy-cjs"])),
	"path/posix": "unenv/node/path",
	"path/win32": "unenv/node/path",
	sys: "unenv/node/util"
};
var nodeCompatEnv = {
	alias: {
		...unenvNodeAliases,
		...Object.fromEntries(Object.entries(unenvNodeAliases).map(([m, to]) => [`node:${m}`, to])),
		"node:sqlite": "unenv/node/sqlite"
	},
	inject: {
		global: "#nitro/runtime/polyfills/globalthis",
		process: "node:process",
		Buffer: ["node:buffer", "Buffer"],
		clearImmediate: ["node:timers", "clearImmediate"],
		setImmediate: ["node:timers", "setImmediate"],
		performance: "unenv/polyfill/performance",
		PerformanceObserver: ["node:perf_hooks", "PerformanceObserver"],
		BroadcastChannel: ["node:worker_threads", "BroadcastChannel"]
	},
	polyfills: [
		"#nitro/runtime/polyfills/global",
		"#nitro/runtime/polyfills/process",
		"#nitro/runtime/polyfills/buffer",
		"#nitro/runtime/polyfills/timers"
	]
};
function isUnenvId(id) {
	return !!id?.startsWith("unenv/");
}
function unenv(nitro, env) {
	const aliases = new Map(Object.entries(env.alias).filter(([, to]) => isUnenvId(to)));
	const ensureUnenv = async (id) => {
		const opts = {
			id: "unenv",
			dir: nitro.options.rootDir,
			deps: nitro.options.deps,
			reason: `Node.js compatibility (\`${id}\` import with the \`${nitro.options.preset}\` preset)`
		};
		if (!await ensureDep(opts)) throw missingDepError(opts);
	};
	return {
		name: "nitro:unenv",
		async buildStart() {
			const required = env.polyfills.find((id) => isUnenvId(id)) || aliases.has("node:process");
			if (required) await ensureUnenv(typeof required === "string" ? required : "node:process");
		},
		resolveId: {
			order: "pre",
			filter: { id: new RegExp(`^(unenv/|(${[...aliases.keys()].map((id) => escapeRegExp$1(id)).join("|")})$)`) },
			async handler(id, importer, options) {
				const target = aliases.get(id);
				if (!target) {
					if (!isUnenvId(id)) return;
					const resolved = await this.resolve(id, importer, {
						...options,
						skipSelf: true
					});
					if (resolved) return resolved;
				}
				await ensureUnenv(id);
				const path = resolveDep(target || id, {
					dir: nitro.options.rootDir,
					deps: nitro.options.deps
				});
				if (!path) throw new Error(`Cannot resolve \`${target || id}\` (for \`${id}\`). Please make sure \`unenv@${deps.unenv.version}\` is installed in your project.`);
				return await this.resolve(path, importer, {
					...options,
					skipSelf: true
				}) || path;
			}
		}
	};
}
var presetEnvs = /* @__PURE__ */ new WeakMap();
var fastResponseEnv = { polyfills: ["#nitro/runtime/polyfills/fast-response"] };
var commonEnv = { alias: {
	"buffer/": "node:buffer",
	"buffer/index": "node:buffer",
	"buffer/index.js": "node:buffer",
	"string_decoder/": "node:string_decoder",
	"process/": "node:process"
} };
function extendEnv(nitro, env) {
	const envs = presetEnvs.get(nitro) || [];
	if (!envs.includes(env)) envs.push(env);
	presetEnvs.set(nitro, envs);
}
async function resolveBuildEnv(nitro) {
	const layers = [];
	if (nitro.options.node === false) layers.push(nodeCompatEnv);
	layers.push(commonEnv, selfEnv(nitro.options.rootDir), ...presetEnvs.get(nitro) || [], ...legacyUnenvLayers(nitro.options, nitro.logger), nitro.options.features?.fastResponse ?? nitro.options.node ? fastResponseEnv : {}, {
		alias: nitro.options.alias,
		inject: nitro.options.inject,
		polyfills: nitro.options.polyfills,
		builtinModules: nitro.options.builtinModules
	});
	const env = mergeEnv(layers);
	resolveEnvPaths(env, nitro.options.rootDir);
	return env;
}
function mergeEnv(layers) {
	const env = {
		alias: {},
		inject: {},
		polyfills: [],
		external: []
	};
	for (const layer of layers) {
		Object.assign(env.alias, layer.alias);
		for (const [name, value] of Object.entries(layer.inject || {})) if (value === false) delete env.inject[name];
		else env.inject[name] = typeof value === "string" ? value : [...value];
		env.polyfills.push(...(layer.polyfills || []).filter(Boolean));
		env.external.push(...layer.builtinModules || []);
	}
	env.polyfills = resolveNegations(env.polyfills);
	env.external = resolveNegations(env.external);
	return env;
}
function resolveEnvPaths(env, rootDir) {
	const aliases = normalizeAliases(env.alias);
	const resolve = (id) => {
		id = resolveAlias(id, aliases);
		if (id.startsWith("node:") || isUnenvId(id)) return id;
		if (builtinModules.includes(id)) return `node:${id}`;
		const from = id.startsWith(".") ? [rootDir] : [import.meta.url, rootDir];
		return resolveModulePath(id, {
			from,
			try: true
		}) || id;
	};
	for (const key in env.alias) env.alias[key] = resolve(env.alias[key]);
	env.polyfills = env.polyfills.map((id) => resolve(id));
	for (const [name, value] of Object.entries(env.inject)) env.inject[name] = typeof value === "string" ? resolve(value) : [resolve(value[0]), value[1]];
}
function selfEnv(rootDir) {
	if (resolveModulePath("nitro", {
		from: rootDir,
		try: true
	})) return {};
	const { exports } = JSON.parse(readFileSync(join$2(pkgDir, "package.json"), "utf8"));
	return { alias: Object.fromEntries(Object.entries(exports).filter(([, path]) => /\.(?:mjs|json)$/.test(path)).map(([id, path]) => [id.replace(/^\./, "nitro"), join$2(pkgDir, path)])) };
}
function resolveNegations(items) {
	const set = new Set(items);
	for (const item of items) if (item.startsWith("!")) {
		set.delete(item);
		set.delete(item.slice(1));
	}
	return [...set];
}
var ROOT_ALIAS = "@";
async function baseBuildConfig(nitro) {
	const extensions = [...BUILD_EXTENSIONS];
	const isNodeless = nitro.options.node === false;
	const importMetaInjections = {
		dev: nitro.options.dev,
		envName: nitro.options.envName,
		preset: nitro.options.preset,
		prerender: nitro.options.preset === "nitro-prerender",
		nitro: true,
		server: true,
		client: false,
		baseURL: nitro.options.baseURL,
		_asyncContext: nitro.options.experimental.asyncContext,
		_tasks: nitro.options.experimental.tasks,
		_websocket: nitro.options.features.websocket ?? nitro.options.experimental.websocket
	};
	const replacements = {
		...Object.fromEntries(Object.entries(importMetaInjections).map(([key, val]) => [`import.meta.${key}`, JSON.stringify(val)])),
		...nitro.options.replace
	};
	const env = await resolveBuildEnv(nitro);
	return {
		extensions,
		isNodeless,
		replacements,
		env,
		aliases: resolveAliases(Object.fromEntries(Object.entries(env.alias).filter(([, to]) => !isUnenvId(to)))),
		noExternal: getNoExternals(nitro),
		ignoreWarningCodes: /* @__PURE__ */ new Set([
			"EVAL",
			"CIRCULAR_DEPENDENCY",
			"THIS_IS_UNDEFINED",
			"EMPTY_BUNDLE",
			"MODULE_LEVEL_DIRECTIVE"
		])
	};
}
function getNoExternals(nitro) {
	const noExternal = [
		/\.[mc]?tsx?$/,
		/^(?:[\0#~.]|virtual:)/,
		new RegExp("^" + pathRegExp(pkgDir) + "(?!.*node_modules)"),
		...[nitro.options.rootDir, ...[nitro.options.buildDir, ...nitro.options.scanDirs].filter((dir) => dir.includes("node_modules") || !dir.startsWith(nitro.options.rootDir))].map((dir) => new RegExp("^" + pathRegExp(dir) + "(?!.*node_modules)"))
	];
	if (nitro.options.wasm !== false) noExternal.push(/\.wasm$/);
	if (Array.isArray(nitro.options.noExternals)) noExternal.push(...nitro.options.noExternals.filter(Boolean).map((item) => toPathRegExp(item)));
	return noExternal.sort((a, b) => a.source.length - b.source.length);
}
function resolveAliases(_aliases) {
	const aliases = Object.fromEntries(Object.entries(_aliases).sort(([a], [b]) => b.split("/").length - a.split("/").length || b.length - a.length));
	const resolvableAliases = Object.keys(aliases).filter(isResolvableAliasKey);
	for (const key in aliases) {
		if (!isResolvableAliasValue(aliases[key])) continue;
		for (const alias of resolvableAliases) {
			if (alias === ROOT_ALIAS && !aliases[key].startsWith(`${ROOT_ALIAS}/`)) continue;
			if (aliases[key].startsWith(alias)) aliases[key] = aliases[alias] + aliases[key].slice(alias.length);
		}
	}
	return aliases;
}
function isResolvableAliasKey(id) {
	return id[0] === "~" || id[0] === "#" || /^@+$/.test(id);
}
function isResolvableAliasValue(id) {
	return id[0] === "~" || id[0] === "#" || /^@+\//.test(id);
}
var builtins = builtinModules.flatMap((m) => m.includes(":") ? [m] : [m, `node:${m}`]);
var REQUIRE_PREFIX = "\0nitro-require-builtin:";
function builtinExternals(env, opts) {
	const externals = new Map(Object.entries(env.alias).filter(([id, to]) => to !== id && to.startsWith("node:")));
	const native = /* @__PURE__ */ new Set();
	if (!opts.node) {
		for (const id of builtins) if (!env.alias[id] || env.alias[id] === id) externals.set(id, id);
		for (const id of env.external) {
			externals.set(id, id);
			if (id.startsWith("node:")) native.add(id);
		}
	}
	if (externals.size === 0) return false;
	return {
		name: "nitro:builtins",
		options(options) {
			if (native.size > 0 && Array.isArray(options.external)) options.external = options.external.filter((id) => typeof id !== "string" || !native.has(externals.get(id)));
		},
		resolveId: {
			order: "pre",
			filter: { id: new RegExp(`^(${[...externals.keys()].map((id) => escapeRegExp$1(id)).join("|")})$`) },
			handler(id, _importer, options) {
				const target = externals.get(id);
				if (options.kind === "require-call" && native.has(target)) return REQUIRE_PREFIX + target;
				return {
					id: target,
					external: true
				};
			}
		},
		load: {
			filter: { id: new RegExp(`^${escapeRegExp$1(REQUIRE_PREFIX)}`) },
			handler: (id) => [`import * as m from ${JSON.stringify(id.slice(23))};`, `module.exports = m.default;`].join("\n")
		}
	};
}
var VIRTUAL_PREFIX_RE = /(?:^|\/)(virtual:.+)$/;
function excludeSourcemapSources(nitro) {
	return !!nitro.options.sourcemap && !nitro.options.dev && nitro.options.experimental.sourcemapMinify !== false;
}
function sourcemap(opts) {
	const virtualIds = [...opts.virtualIds];
	return {
		name: "nitro:sourcemap",
		generateBundle(_options, bundle) {
			for (const [key, asset] of Object.entries(bundle)) {
				if (!key.endsWith(".map") || !("source" in asset) || typeof asset.source !== "string") continue;
				const sourcemap = JSON.parse(asset.source);
				let changed = false;
				const original = sourcemap.sources;
				if (original) {
					const sources = original.map((source) => source ? virtualSource(source, virtualIds) : source);
					if (sources.some((source, i) => source !== original[i])) {
						sourcemap.sources = sources;
						changed = true;
					}
				}
				if (opts.minify) {
					if ("sourcesContent" in sourcemap) {
						delete sourcemap.sourcesContent;
						changed = true;
					}
					if ("x_google_ignoreList" in sourcemap) {
						delete sourcemap.x_google_ignoreList;
						changed = true;
					}
					if (sourcemap.mappings !== "" && (sourcemap.sources || []).every((s) => s?.includes("node_modules"))) {
						sourcemap.mappings = "";
						changed = true;
					}
				}
				if (changed) asset.source = JSON.stringify(sourcemap);
			}
		}
	};
}
function virtualSource(source, virtualIds) {
	const namespaced = VIRTUAL_PREFIX_RE.exec(source)?.[1];
	if (namespaced) return namespaced;
	for (const id of virtualIds) if (source === id || source.endsWith(`/${id}`)) return `virtual:${id}`;
	return source;
}
function app(nitro) {
	return {
		id: "#nitro/virtual/app",
		template: () => {
			const hasRoutes = nitro.routing.routes.hasRoutes();
			const hasRouteRules = nitro.routing.routeRules.hasRoutes();
			const hasRoutedMiddleware = nitro.routing.routedMiddleware.hasRoutes();
			const hasGlobalMiddleware = nitro.routing.globalMiddleware.length > 0;
			const hasPlugins = nitro.options.plugins.length > 0;
			const hasHooks = nitro.options.features?.runtimeHooks ?? hasPlugins;
			const hasAsyncContext = !!nitro.options.experimental.asyncContext;
			const routeMethods = [...new Set(nitro.routing.routes.routes.filter((r) => r.method).map((r) => r.method.toUpperCase()))].sort();
			const hasMethodRoutes = routeMethods.length > 0;
			const routingImports = [
				hasRoutes && "findRoute",
				hasRoutedMiddleware && "findRoutedMiddleware",
				hasGlobalMiddleware && "globalMiddleware"
			].filter(Boolean);
			const imports = [];
			const code = [];
			imports.push(`import { H3Core } from "h3";`, `import errorHandler from "#nitro/virtual/error-handler";`);
			code.push(``, `export function createNitroApp() {`);
			if (hasHooks) {
				imports.push(`import { HookableCore } from "#nitro/runtime/hookable";`);
				code.push(`  const hooks = new HookableCore();`);
			}
			code.push(``, `const captureError = (error, errorCtx) => {`);
			if (hasHooks) code.push(`    const promise = hooks.callHook("error", error, errorCtx)?.catch?.((hookError) => {`, `      console.error("Error while capturing another error", hookError);`, `    });`);
			code.push(`    if (errorCtx?.event) {`, `      const errors = errorCtx.event.req.context?.nitro?.errors;`, `      if (errors) {`, `        errors.push({ error, context: errorCtx });`, `      }`);
			if (hasHooks) code.push(`      if (promise && typeof errorCtx.event.req.waitUntil === "function") {`, `        errorCtx.event.req.waitUntil(promise);`, `      }`);
			code.push(`    }`, `  };`);
			code.push(``, `  const h3App = createH3App({`, `    onError(error, event) {`);
			if (hasHooks) code.push(`      captureError(error, { event });`);
			code.push(`      return errorHandler(error, event);`, `    },`, `  });`);
			if (hasHooks) code.push(``, `  h3App.config.onRequest = (event) => {`, `    return hooks.callHook("request", event)?.catch?.((error) => {`, `      captureError(error, { event, tags: ["request"] });`, `    });`, `  };`, `  h3App.config.onResponse = (res, event) => {`, `    return hooks.callHook("response", res, event)?.catch?.((error) => {`, `      captureError(error, { event, tags: ["response"] });`, `    });`, `  };`);
			code.push(``, `  let appHandler = (req) => {`, `    req.context ||= {};`, `    req.context.nitro = req.context.nitro || { errors: [] };`, `    return h3App.fetch(req);`, `  };`);
			if (hasAsyncContext) {
				imports.push(`import { nitroAsyncContext } from "#nitro/runtime/context";`);
				code.push(``, `  const originalHandler = appHandler;`, `  appHandler = (req) => {`, `    return nitroAsyncContext.callAsync({ request: req }, () => originalHandler(req));`, `  };`);
			}
			code.push(``, `  return {`, `    fetch: appHandler,`, `    h3: h3App,`, `    hooks: ${hasHooks ? "hooks" : "undefined"},`, `    captureError,`, `  };`, `}`);
			code.push(``, `export function initNitroPlugins(app) {`);
			if (hasPlugins) {
				imports.push(`import { plugins } from "#nitro/virtual/plugins";`, `import { initAsyncPlugins } from "#nitro/runtime/async-plugins";`);
				code.push(`  for (let i = 0; i < plugins.length; i++) {`, `    let result;`, `    try {`, `      result = plugins[i](app);`, `    } catch (error) {`, `      app.captureError?.(error, { tags: ["plugin"] });`, `      throw error;`, `    }`, `    if (typeof result?.then === "function") {`, `      return initAsyncPlugins(app, result, plugins.slice(i + 1));`, `    }`, `  }`, `  app.h3["~dispatch"] = app.h3["~composed"] = undefined;`);
			}
			code.push(`  return app;`, `}`);
			if (routingImports.length) imports.push(`import { ${routingImports.join(", ")} } from "#nitro/virtual/routing";`);
			code.push(``, `function createH3App(config) {`, `  const h3App = new H3Core(config);`);
			if (hasRoutes || hasRouteRules) {
				code.push(`  h3App["~findRoute"] = (event) => {`);
				if (hasRouteRules) code.push(`    event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;`);
				if (hasRoutes) code.push(`    if (event.req.method === "HEAD") {`, `      const route = findRoute("HEAD", event.url.pathname);`, `      return route?.data.method ? route : findRoute("GET", event.url.pathname);`, `    }`);
				code.push(hasMethodRoutes ? `    return findRoute(event.req.method, event.url.pathname) ?? findMethodNotAllowed(event.req.method, event.url.pathname);` : hasRoutes ? `    return findRoute(event.req.method, event.url.pathname);` : `    return undefined;`, `  };`);
			}
			const runtimeAppImports = [
				hasRouteRules && "createRouteRulesMiddleware",
				hasRoutedMiddleware && "createRoutedMiddleware",
				hasRouteRules && "createCacheRuleMiddleware",
				hasRouteRules && "getRouteRules",
				hasMethodRoutes && "createMethodNotAllowedMatcher"
			].filter(Boolean);
			if (runtimeAppImports.length) imports.push(`import { ${runtimeAppImports.join(", ")} } from "#nitro/runtime/app";`);
			if (hasMethodRoutes) code.push(`  const findMethodNotAllowed = createMethodNotAllowedMatcher(findRoute, ${JSON.stringify(routeMethods)});`);
			if (hasRouteRules) code.push(`  h3App["~middleware"].push(createRouteRulesMiddleware());`);
			if (hasGlobalMiddleware) code.push(`  h3App["~middleware"].push(...globalMiddleware);`);
			if (hasRoutedMiddleware) code.push(`  h3App["~middleware"].push(createRoutedMiddleware(findRoutedMiddleware));`);
			if (hasRouteRules) code.push(`  h3App["~middleware"].push(createCacheRuleMiddleware());`);
			code.push(`  return h3App;`, `}`);
			return [...imports, ...code].join("\n");
		}
	};
}
var functionDefaultKeys = [
	"maxAge",
	"swr",
	"staleMaxAge",
	"maxResolveTime",
	"base"
];
var handlerDefaultKeys = [
	...functionDefaultKeys,
	"varies",
	"allowQuery",
	"allowCookies",
	"allowAuthorization",
	"sendCacheControl",
	"cacheStatusHeader",
	"maxBodySize"
];
function cache(nitro) {
	return {
		id: "#nitro/virtual/cache",
		template: () => {
			const config = nitro.options.cache || {};
			const defaults = config.defaults || {};
			return `
${genStorage(config)}

export const cacheFunctionDefaults = ${genValue(pickDefined(defaults, functionDefaultKeys))};

export const cacheHandlerDefaults = ${genValue(pickDefined(defaults, handlerDefaultKeys))};
`;
		}
	};
}
function genStorage(config) {
	switch (config.driver) {
		case "kv": return `export { createKVCacheStorage as createCacheStorage } from "#nitro/runtime/cache-kv";`;
		case "fs": return `import { createFSCacheStorage } from "#nitro/runtime/cache-fs";
export const createCacheStorage = () => createFSCacheStorage(${genValue({ dir: config.fs?.dir })});`;
		default: return `import { createMemoryStorage } from "ocache";
export const createCacheStorage = () => createMemoryStorage(${genValue(config.memory || {})});`;
	}
}
function pickDefined(config, keys) {
	return Object.fromEntries(keys.filter((key) => config[key] !== void 0).map((key) => [key, config[key]]));
}
function genValue(value) {
	return JSON.stringify(value, (_key, v) => v === Infinity ? "__INFINITY__" : v).replaceAll("\"__INFINITY__\"", "Infinity");
}
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return;
	return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
	const splitters = separators ?? STR_SPLITTERS;
	const parts = [];
	if (!str || typeof str !== "string") return parts;
	let buff = "";
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = splitters.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = "";
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
	return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
	return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p)).join("") : "";
}
function camelCase(str, opts) {
	return lowerFirst(pascalCase(str || "", opts));
}
function kebabCase(str, joiner) {
	return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function database(nitro) {
	return {
		id: "#nitro/virtual/database",
		template: async () => {
			const connections = await resolveDatabaseConnections(nitro.options);
			if (connections.length === 0) return `export const connectionConfigs = {};\nexport const traceDatabase = (db) => db;`;
			const tracingEnabled = typeof nitro.options.tracingChannel === "object" && !!nitro.options.tracingChannel.db0;
			return `
${[...new Map(connections.map((c) => [c.connector, c.module]))].map(([name, module]) => `import ${camelCase(name)}Connector from "${module}";`).join("\n")}
${tracingEnabled ? `export { withTracing as traceDatabase } from "db0/tracing";` : `export const traceDatabase = (db) => db;`}

export const connectionConfigs = {
  ${connections.map((c) => `${c.name}: {
          connector: ${camelCase(c.connector)}Connector,
          options: ${genConnectorOptions(nitro, c)}
        }`).join(",\n")}
};
        `;
		}
	};
}
function genConnectorOptions(nitro, connection) {
	const libs = connection.deps.filter((dep) => isLibOption(dep.option) && connection.options[dep.option] === void 0 && isDepInstalled(dep.name, {
		dir: nitro.options.rootDir,
		projectOnly: true
	})).map((dep) => `${dep.option}: () => import(${JSON.stringify(dep.import || dep.name)})`);
	const options = JSON.stringify(connection.options);
	return libs.length > 0 ? `{ ...${options}, ${libs.join(", ")} }` : options;
}
function errorHandler(nitro) {
	return {
		id: "#nitro/virtual/error-handler",
		template: () => {
			const errorHandlers = Array.isArray(nitro.options.errorHandler) ? nitro.options.errorHandler : [nitro.options.errorHandler];
			const builtinHandler = join$2(runtimeDir, `internal/error/${nitro.options.dev ? "dev" : "prod"}`);
			return `
${errorHandlers.map((h, i) => `import errorHandler$${i} from "${h}";`).join("\n")}

const errorHandlers = [${errorHandlers.map((_, i) => `errorHandler$${i}`).join(", ")}];

import { defaultHandler } from "${builtinHandler}";

export default async function(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}
`;
		}
	};
}
function featureFlags(nitro) {
	return {
		id: "#nitro/virtual/feature-flags",
		template: () => {
			const featureFlags = {
				hasRoutes: nitro.routing.routes.hasRoutes(),
				hasRouteRules: nitro.routing.routeRules.hasRoutes(),
				hasRoutedMiddleware: nitro.routing.routedMiddleware.hasRoutes(),
				hasGlobalMiddleware: nitro.routing.globalMiddleware.length > 0,
				hasPlugins: nitro.options.plugins.length > 0,
				hasHooks: nitro.options.features?.runtimeHooks ?? nitro.options.plugins.length > 0
			};
			return Object.entries(featureFlags).map(([key, value]) => `export const ${key} = ${Boolean(value)};`).join("\n");
		}
	};
}
function genString(input, options = {}) {
	const str = JSON.stringify(input);
	if (!options.singleQuotes) return str;
	return `'${escapeString(str).slice(1, -1)}'`;
}
var NEEDS_ESCAPE_RE = /[\n\r'\\\u2028\u2029]/;
var QUOTE_NEWLINE_RE = /([\n\r'\u2028\u2029])/g;
var BACKSLASH_RE = /\\/g;
function escapeString(id) {
	if (!NEEDS_ESCAPE_RE.test(id)) return id;
	return id.replace(BACKSLASH_RE, "\\\\").replace(QUOTE_NEWLINE_RE, "\\$1");
}
function genSafeVariableName(name) {
	if (reservedNames.has(name)) return `_${name}`;
	return name.replace(/^\d/, (r) => `_${r}`).replace(/\W/g, (r) => "_" + r.charCodeAt(0));
}
var reservedNames = /* @__PURE__ */ new Set([
	"Infinity",
	"NaN",
	"arguments",
	"await",
	"break",
	"case",
	"catch",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"finally",
	"for",
	"function",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"interface",
	"let",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"static",
	"super",
	"switch",
	"this",
	"throw",
	"true",
	"try",
	"typeof",
	"undefined",
	"var",
	"void",
	"while",
	"with",
	"yield"
]);
function _genStatement(type, specifier, names, options = {}) {
	const specifierString = genString(specifier, options);
	if (!names) return `${type} ${specifierString};`;
	const nameArray = Array.isArray(names);
	const namesString = (nameArray ? names : [names]).map((index) => {
		if (typeof index === "string") return { name: index };
		if (index.name === index.as) index = { name: index.name };
		return index;
	}).map((index) => index.as ? `${index.name} as ${index.as}` : index.name).join(", ");
	if (nameArray) return `${type} { ${namesString} } from ${genString(specifier, options)}${_genImportAttributes(type, options)};`;
	return `${type} ${namesString} from ${genString(specifier, options)}${_genImportAttributes(type, options)};`;
}
function _genImportAttributes(type, options) {
	if (type === "import type" || type === "export type") return "";
	if (typeof options.attributes?.type === "string") return ` with { type: ${genString(options.attributes.type)} }`;
	if (typeof options.assert?.type === "string") return ` assert { type: ${genString(options.assert.type)} }`;
	return "";
}
function genImport(specifier, imports, options = {}) {
	return _genStatement("import", specifier, imports, options);
}
function kv(nitro) {
	return {
		id: "#nitro/virtual/kv",
		template: async () => {
			const mounts = await resolveKVDrivers(nitro.options);
			const driverImports = [...new Set(mounts.map((m) => m.driver))];
			const tracingEnabled = !!(typeof nitro.options.tracingChannel === "object" && nitro.options.tracingChannel?.unstorage);
			return `
import { createStorage } from 'unstorage'
${tracingEnabled ? `import { withTracing } from 'unstorage/tracing'` : ""}
import { assets } from '#nitro/virtual/server-assets'

${driverImports.map((i) => genImport(i, genSafeVariableName(i))).join("\n")}

export function initKV() {
  const storage = createStorage({})
  storage.mount('/assets', assets)
  ${mounts.map((m) => `storage.mount('${m.path}', ${genSafeVariableName(m.driver)}(${genDriverOptions(nitro, m)}))`).join("\n")}
  return ${tracingEnabled ? "withTracing(storage)" : "storage"}
}
`;
		}
	};
}
function genDriverOptions(nitro, mount) {
	const libs = mount.deps.filter((dep) => isLibOption(dep.option) && mount.options[dep.option] === void 0 && isDepInstalled(dep.name, {
		dir: nitro.options.rootDir,
		projectOnly: true
	})).map((dep) => `${dep.option}: () => import(${JSON.stringify(dep.import || dep.name)})`);
	const options = JSON.stringify(mount.options);
	return libs.length > 0 ? `{ ...${options}, ${libs.join(", ")} }` : options;
}
function plugins(nitro) {
	return {
		id: "#nitro/virtual/plugins",
		template: () => {
			const nitroPlugins = [...new Set(nitro.options.plugins)];
			return `
  ${nitroPlugins.map((plugin) => `import _${hash(plugin)} from "${plugin}";`).join("\n")}

  export const plugins = [
    ${nitroPlugins.map((plugin) => `_${hash(plugin)}`).join(",\n")}
  ]
      `;
		}
	};
}
function polyfills(_nitro, polyfills) {
	return {
		id: "#nitro/virtual/polyfills",
		moduleSideEffects: true,
		template: () => {
			return polyfills.map((p) => `import '${p}';`).join("\n") || `/* No polyfills */`;
		}
	};
}
var import_etag = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = etag;
	var crypto = __require$1("crypto");
	var Stats = __require$1("fs").Stats;
	var toString = Object.prototype.toString;
	function entitytag(entity) {
		if (entity.length === 0) return "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"";
		var hash = crypto.createHash("sha1").update(entity, "utf8").digest("base64").substring(0, 27);
		return "\"" + (typeof entity === "string" ? Buffer.byteLength(entity, "utf8") : entity.length).toString(16) + "-" + hash + "\"";
	}
	function etag(entity, options) {
		if (entity == null) throw new TypeError("argument entity is required");
		var isStats = isstats(entity);
		var weak = options && typeof options.weak === "boolean" ? options.weak : isStats;
		if (!isStats && typeof entity !== "string" && !Buffer.isBuffer(entity)) throw new TypeError("argument entity must be string, Buffer, or fs.Stats");
		var tag = isStats ? stattag(entity) : entitytag(entity);
		return weak ? "W/" + tag : tag;
	}
	function isstats(obj) {
		if (typeof Stats === "function" && obj instanceof Stats) return true;
		return obj && typeof obj === "object" && "ctime" in obj && toString.call(obj.ctime) === "[object Date]" && "mtime" in obj && toString.call(obj.mtime) === "[object Date]" && "ino" in obj && typeof obj.ino === "number" && "size" in obj && typeof obj.size === "number";
	}
	function stattag(stat) {
		var mtime = stat.mtime.getTime().toString(16);
		return "\"" + stat.size.toString(16) + "-" + mtime + "\"";
	}
})))(), 1);
var readAssetHandler = {
	true: "node",
	node: "node",
	false: "null",
	inline: "inline"
};
function publicAssets(nitro) {
	return [
		{
			id: "#nitro/virtual/public-assets-data",
			template: async () => {
				const assets = {};
				if (nitro.options.dev) {
					for (const asset of nitro.options.publicAssets) for (const file of await globPublicAssets(nitro, asset)) {
						const assetId = joinURL(nitro.options.baseURL, asset.baseURL || "/", file);
						let type = src_default.getType(file) || "text/plain";
						if (type.startsWith("text")) type += "; charset=utf-8";
						assets[assetId] ??= {
							type,
							path: resolve$2(asset.dir, file),
							etag: "",
							mtime: "",
							size: 0
						};
					}
					return `export default ${JSON.stringify(assets, null, 2)};`;
				}
				const files = await glob("**", {
					cwd: nitro.options.output.publicDir,
					absolute: false,
					dot: true
				});
				const { errors } = await runParallel(new Set(files), async (id) => {
					let mimeType = src_default.getType(id.replace(/\.(gz|br|zst)$/, "")) || "text/plain";
					if (mimeType.startsWith("text")) mimeType += "; charset=utf-8";
					const fullPath = resolve$2(nitro.options.output.publicDir, id);
					const [assetData, stat] = await Promise.all([promises.readFile(fullPath), promises.stat(fullPath)]);
					const etag = (0, import_etag.default)(assetData);
					const assetId = joinURL(nitro.options.baseURL, decodeURIComponent(id));
					let encoding;
					if (id.endsWith(".gz")) encoding = "gzip";
					else if (id.endsWith(".br")) encoding = "br";
					else if (id.endsWith(".zst")) encoding = "zstd";
					assets[assetId] = {
						type: getPrerenderMeta(nitro)[assetId]?.contentType || mimeType,
						encoding,
						etag,
						mtime: stat.mtime.toJSON(),
						size: stat.size,
						path: relative$2(nitro.options.output.serverDir, fullPath),
						data: nitro.options.serveStatic === "inline" ? assetData.toString("base64") : void 0
					};
				}, { concurrency: 25 });
				if (errors.length > 0) throw new Error(`Failed to process public assets:\n${errors.join("\n")}`, { cause: errors });
				const sorted = Object.fromEntries(Object.entries(assets).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
				return `export default ${JSON.stringify(sorted, null, 2)};`;
			}
		},
		{
			id: "#nitro/virtual/public-assets",
			template: () => {
				const publicAssetBases = Object.fromEntries(nitro.options.publicAssets.filter((dir) => !dir.fallthrough && dir.baseURL !== "/").map((dir) => [withTrailingSlash(joinURL(nitro.options.baseURL, dir.baseURL || "/")), { maxAge: dir.maxAge }]));
				return `
import assets from '#nitro/virtual/public-assets-data'
export { readAsset } from "${`#nitro/virtual/public-assets-${readAssetHandler[nitro.options.serveStatic] || "null"}`}"
export const publicAssetBases = ${JSON.stringify(publicAssetBases)}

export function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

export function getPublicAssetMeta(id = '') {
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return publicAssetBases[base] }
  }
  return {}
}

export function getAsset (id) {
  return assets[id]
}

export function hasAsset (id = '') {
  return !!(assets[id] || assets[id + '.gz'] || assets[id + '.br'] || assets[id + '.zst'])
}
`;
			}
		},
		{
			id: "#nitro/virtual/public-assets-node",
			template: () => {
				return `
import { promises as fsp } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import assets from '#nitro/virtual/public-assets-data'
export function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__))
  // Public dirs might be pruned after the build (uploaded to a CDN, sourcemaps
  // stripped), so a manifest entry with no file behind it reads as absent, not broken.
  return fsp.readFile(resolve(serverDir, assets[id].path)).catch((error) => {
    if (error?.code !== 'ENOENT') { throw error }
  })
}`;
			}
		},
		{
			id: "#nitro/virtual/public-assets-null",
			template: () => {
				return `
    export function readAsset (id) {
        return Promise.resolve(null);
    }`;
			}
		},
		{
			id: "#nitro/virtual/public-assets-inline",
			template: () => {
				return `
  import assets from '#nitro/virtual/public-assets-data'
  export function readAsset (id) {
    if (!assets[id]) { return undefined }
    if (assets[id]._data) { return assets[id]._data }
    if (!assets[id].data) { return assets[id].data }
    assets[id]._data = Uint8Array.from(atob(assets[id].data), (c) => c.charCodeAt(0))
    return assets[id]._data
}`;
			}
		}
	];
}
var scriptServerOpen = String.raw`<script(?=[^>]*\sserver(?![\w-]))[^>]*>`;
var scriptServerRe = new RegExp(`${scriptServerOpen}([\\s\\S]*?)<\\/script>`, "gi");
var tagRe = /<\?(?:js(?![\w-])|(?=[\s?=]))(?<equals>=)?(?<value>[\s\S]*?)\?>/g;
var curlyRe = /{{{\s*([\s\S]+?)\s*}}}|{{\s*([\s\S]+?)\s*}}/g;
var templateSyntaxRe = new RegExp(`(?:${scriptServerOpen}[\\s\\S]*?<\\/script>)|(?:${tagRe.source})|(?:\\{\\{[\\s\\S]*?\\}\\})`, "i");
function parseTemplate(template) {
	if (!template) return [];
	const tokens = [];
	let cursor = 0;
	let match;
	scriptServerRe.lastIndex = 0;
	while (match = scriptServerRe.exec(template)) {
		if (match.index > cursor) pushTagTokens(tokens, template.slice(cursor, match.index));
		tokens.push({
			type: "code",
			contents: match[1] || ""
		});
		cursor = match.index + match[0].length;
	}
	if (cursor < template.length) pushTagTokens(tokens, template.slice(cursor));
	return tokens;
}
function pushTagTokens(tokens, chunk) {
	let cursor = 0;
	let match;
	tagRe.lastIndex = 0;
	while (match = tagRe.exec(chunk)) {
		const { equals, value } = match.groups || {};
		if (match.index > cursor) pushTextTokens(tokens, chunk.slice(cursor, match.index));
		if (equals) tokens.push({
			type: "expr",
			contents: value || ""
		});
		else tokens.push({
			type: "code",
			contents: value || ""
		});
		cursor = match.index + match[0].length;
	}
	if (cursor < chunk.length) pushTextTokens(tokens, chunk.slice(cursor));
}
function pushTextTokens(tokens, text) {
	if (!text) return;
	let cursor = 0;
	let match;
	curlyRe.lastIndex = 0;
	while (match = curlyRe.exec(text)) {
		const raw = match[1];
		const escaped = match[2];
		if (match.index > cursor) tokens.push({
			type: "text",
			contents: text.slice(cursor, match.index)
		});
		tokens.push({
			type: "expr",
			contents: raw === void 0 ? `htmlspecialchars(${(escaped || "").trim()})` : raw.trim()
		});
		cursor = match.index + match[0].length;
	}
	if (cursor < text.length) tokens.push({
		type: "text",
		contents: text.slice(cursor)
	});
}
function hasTemplateSyntax(template) {
	return templateSyntaxRe.test(template);
}
var prelude = `const __chunks__ = [];
const echo = (chunk) => { __chunks__.push(chunk); };
const __htmlEscapes__ = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function htmlspecialchars(s) {
  return String(s).replace(/[&<>"']/g, (c) => __htmlEscapes__[c] || c);
}
`;
function runtimeStream(body) {
	return `${prelude}${body};
function concatStreams(chunks) {
  const encoder = new TextEncoder();
  let activeReader;
  let cancelled = false;
  return new ReadableStream({
    async pull(controller) {
      for (let chunk of chunks) {
        if (cancelled) return;
        if (typeof chunk === 'function') {
          chunk = chunk();
        }
        if (typeof chunk?.then === 'function') {
          chunk = await chunk;
        }
        if (chunk instanceof Response) {
          chunk = chunk.body;
        }
        if (chunk === null || chunk === undefined) {
          continue;
        }
        if (chunk instanceof ReadableStream) {
          const reader = chunk.getReader();
          activeReader = reader;
          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              if (cancelled) return;
              controller.enqueue(ArrayBuffer.isView(value) ? value : encoder.encode(String(value)));
            }
          } finally {
            activeReader = undefined;
            reader.releaseLock();
          }
        } else {
          controller.enqueue(ArrayBuffer.isView(chunk) ? chunk : encoder.encode(String(chunk)));
        }
      }
      if (cancelled) return;
      controller.close();
    },
    cancel(reason) {
      cancelled = true;
      const reader = activeReader;
      activeReader = undefined;
      return reader?.cancel(reason);
    },
  });
}
return concatStreams(__chunks__);
`;
}
function runtimeText(body) {
	return `${prelude}${body};
let __out__ = "";
for (let chunk of __chunks__) {
  if (typeof chunk === 'function') {
    chunk = chunk();
  }
  if (typeof chunk?.then === 'function') {
    chunk = await chunk;
  }
  if (chunk instanceof Response) {
    chunk = chunk.body;
  }
  if (chunk === null || chunk === undefined) {
    continue;
  }
  if (chunk instanceof ReadableStream) {
    const reader = chunk.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        __out__ += typeof value === "string" ? value : decoder.decode(value, { stream: true });
      }
      __out__ += decoder.decode();
    } finally {
      reader.releaseLock();
    }
  } else if (typeof chunk === "string") {
    __out__ += chunk;
  } else {
    __out__ += ArrayBuffer.isView(chunk) ? new TextDecoder().decode(chunk) : String(chunk);
  }
}
return __out__;
`;
}
function compileTemplate(template, opts = {}) {
	const body = compileTemplateToString(template, opts, false);
	const sourcemaps = opts.filename ? `\n//# sourceURL=${opts.filename}` : "";
	try {
		const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
		return new AsyncFunction("__context__", body + sourcemaps);
	} catch (error) {
		throw new SyntaxError(`Template syntax error: ${error.message}`, { cause: error });
	}
}
function compileTemplateToString(template, opts, asyncWrapper) {
	const parts = [];
	const tokens = parseTemplate(template);
	const preserveLines = !!opts.preserveLines;
	let borrowed = 0;
	for (const token of tokens) switch (token.type) {
		case "text":
			if (preserveLines) {
				const lines = token.contents.split("\n");
				let code = "";
				for (let i = 0; i < lines.length; i++) {
					const isLast = i === lines.length - 1;
					const chunk = isLast ? lines[i] : lines[i] + "\n";
					if (chunk) code += `echo(${JSON.stringify(chunk)});`;
					if (!isLast) {
						if (borrowed > 0) borrowed--;
						else code += "\n";
					}
				}
				parts.push(code);
			} else parts.push(`echo(${JSON.stringify(token.contents)})`);
			break;
		case "expr":
			if (preserveLines) {
				const needsNewline = !endsOnFreshLine(token.contents) && token.contents.includes("//");
				if (needsNewline) borrowed++;
				parts.push(`echo((${token.contents}${needsNewline ? "\n" : ""}));`);
			} else parts.push(`echo((\n${token.contents}\n))`);
			break;
		case "code": if (preserveLines && !endsOnFreshLine(token.contents)) {
			borrowed++;
			parts.push(`${token.contents}\n`);
		} else parts.push(token.contents);
	}
	let body = parts.join(preserveLines ? "" : "\n");
	body = opts.contextKeys ? `{const {${opts.contextKeys.join(",")}}=__context__;${body}}` : `with(__context__){${body}}`;
	body = opts.stream === false ? runtimeText(body) : runtimeStream(body);
	return asyncWrapper === false ? body : `(async (__context__) => {${body}})`;
}
function endsOnFreshLine(code) {
	return /\n[^\S\n]*$/.test(code);
}
var RENDER_CONTEXT_KEYS = [
	"htmlspecialchars",
	"setCookie",
	"redirect",
	"$REQUEST",
	"$METHOD",
	"$URL",
	"$HEADERS",
	"$COOKIES",
	"$RESPONSE"
];
var SSR_OUTLET = "<!--ssr-outlet-->";
function rendererTemplate(nitro) {
	return {
		id: "#nitro/virtual/renderer-template",
		template: async () => {
			try {
				return await renderTemplateModule(nitro);
			} catch (error) {
				if (!nitro.options.dev) throw error;
				const message = error instanceof Error ? error.message : String(error);
				return `export const rendererTemplate = () => { throw new Error(${JSON.stringify(message)}); };`;
			}
		},
		watchFiles: () => {
			const template = nitro.options.renderer?.template;
			return nitro.options.dev && nitro.options.builder !== "vite" && typeof template === "string" ? [template] : [];
		}
	};
}
async function renderTemplateModule(nitro) {
	let html = await readPageHTML(nitro);
	if (html === void 0) return `
import { HTTPResponse } from "h3";
export const rendererTemplate = () => new HTTPResponse("<!-- renderer.template is not set -->", { headers: { "content-type": "text/html; charset=utf-8" } });
`;
	const hasServices = !!nitro._serviceLoader;
	if (hasServices && nitro.options.services.ssr && nitro.options.renderer?.static !== true && html.includes(SSR_OUTLET)) html = html.replace(SSR_OUTLET, `{{{ fetchService("ssr", $REQUEST) }}}`);
	if (nitro.options.renderer?.static ?? !hasTemplateSyntax(html)) return `
import { HTTPResponse } from "h3";
export const rendererTemplate = () => new HTTPResponse(${JSON.stringify(html)}, { headers: { "content-type": "text/html; charset=utf-8" } });
`;
	const contextKeys = [...RENDER_CONTEXT_KEYS];
	try {
		compileTemplate(html, { contextKeys });
	} catch (error) {
		const file = nitro.options.renderer?.template;
		throw new Error(`Invalid renderer template${file ? ` (\`${prettyPath(file, false)}\`)` : ""}: ${error.message}`, { cause: error });
	}
	const template = compileTemplateToString(html, { contextKeys });
	const contextImports = [...hasServices ? [{
		from: "nitro/services",
		name: "fetchService"
	}] : [], ...nitro._pageTemplate?.context || []];
	return `
import { renderToResponse } from "#nitro/runtime/rendu";
import { fetch, serverFetch } from "nitro/app";
${contextImports.map((i) => `import { ${i.name} } from ${JSON.stringify(i.from)};`).join("\n")}
const context = { fetch, serverFetch${contextImports.map((i) => `, ${i.name}`).join("")} };
const template = ${template};
export const rendererTemplate = (request) => renderToResponse(template, { request, context });
`;
}
async function readPageHTML(nitro) {
	if (nitro._pageTemplate?.html) return nitro._pageTemplate.html();
	const template = nitro.options.renderer?.template;
	if (typeof template === "string") return readFile(template, "utf8");
}
function routingMeta(nitro) {
	return {
		id: "#nitro/virtual/routing-meta",
		template: () => {
			const handlers = Object.values(nitro.routing.routes.routes).flatMap((h) => h.data);
			return `
  ${uniqueBy$1(handlers, "_importHash").map((h) => h.handler in nitro.options.virtual ? `const ${h._importHash}Meta = undefined;` : `import ${h._importHash}Meta from ${JSON.stringify(h.handler + "?meta")};`).join("\n")}
export const handlersMeta = [
  ${handlers.map((h) => `{ route: ${JSON.stringify(h.route)}, method: ${JSON.stringify(h.method?.toLowerCase())}, meta: ${h._importHash}Meta }`).join(",\n")}
  ];
        `.trim();
		}
	};
}
function uniqueBy$1(arr, key) {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
}
var _cache = /* @__PURE__ */ new Map();
var _last;
function importOXC(opts = {}) {
	if (!opts.dir) return _last ?? importOXC({ dir: process.cwd() });
	const { dir, paths } = opts;
	const key = [
		dir,
		paths?.rolldown,
		paths?.vite
	].join("\0");
	let oxc = _cache.get(key);
	if (!oxc) {
		const rolldownUtils = _resolveRolldownUtils(dir, paths);
		oxc = rolldownUtils ? import(pathToFileURL(rolldownUtils).href).catch(() => import("../_14.mjs")) : import("../_14.mjs");
		_cache.set(key, oxc);
	}
	return _last = oxc;
}
function walkAST(node, visit) {
	if (Array.isArray(node)) {
		for (const child of node) walkAST(child, visit);
		return;
	}
	if (!node || typeof node !== "object") return;
	const record = node;
	if (typeof record.type === "string") visit(node);
	for (const key in record) if (key !== "parent") walkAST(record[key], visit);
}
function _resolveRolldownUtils(dir, paths) {
	if (paths?.rolldown) return resolveFromDepPath("rolldown/utils", {
		dir,
		path: paths.rolldown
	});
	const vite = paths?.vite ? resolveFromDepPath("vite", {
		dir,
		path: paths.vite
	}) : resolveModulePath("vite", {
		from: dir,
		try: true
	});
	return resolveModulePath("rolldown/utils", {
		from: vite ? [
			dir,
			vite,
			import.meta.url
		] : [dir, import.meta.url],
		try: true
	});
}
function serverEntry(nitro) {
	return {
		id: "#nitro/virtual/server-entry",
		template: async () => {
			const entry = nitro.options.serverEntry;
			const builtinExports = _builtinWorkerExports(nitro);
			if (!entry || !entry.handler || entry.format === "node") return `${builtinExports}
export const serverEntryOptions = {};
export const serverEntryExports = {};`;
			if (!await hasServerEntryDefaultExport(nitro)) return `${builtinExports}
import * as serverEntryExports from "${entry.handler}";
export { serverEntryExports };
export const serverEntryOptions = {};`;
			return `${builtinExports}
import serverEntry from "${entry.handler}";
import * as serverEntryExports from "${entry.handler}";
export { serverEntryExports };
const proto = serverEntry && Object.getPrototypeOf(serverEntry);
const allowedKeys = new Set(["port", "hostname", "reusePort", "protocol", "tls", "silent", "gracefulShutdown", "maxRequestBodySize", "trustProxy", "node", "bun", "deno"]);
export const serverEntryOptions = {};
if (proto === Object.prototype || proto === null) {
  for (const key in serverEntry) {
    if (allowedKeys.has(key)) {
      serverEntryOptions[key] = serverEntry[key];
    }
  }
}
`;
		}
	};
}
async function hasServerEntryDefaultExport(nitro) {
	const handler = nitro.options.serverEntry && nitro.options.serverEntry.handler;
	if (!handler) return false;
	const code = await readFile(handler, "utf8").catch(() => void 0);
	if (code === void 0) return true;
	if (!code.includes("default")) return false;
	const { parseSync } = await importOXC({
		dir: nitro.options.rootDir,
		paths: nitro.options.deps?.paths
	});
	const { module, errors } = parseSync(handler, code);
	if (errors.length > 0) return true;
	return module.staticExports.some((e) => e.entries.some((entry) => entry.exportName.kind === "Default" || entry.exportName.name === "default"));
}
var DEV_WORKER_EXPORTS_ID = "#nitro/virtual/dev-worker-exports";
function _builtinWorkerExports(nitro) {
	return DEV_WORKER_EXPORTS_ID in nitro.options.virtual ? `export * as builtinWorkerExports from "${DEV_WORKER_EXPORTS_ID}";` : "export const builtinWorkerExports = {};";
}
function routing(nitro) {
	return {
		id: "#nitro/virtual/routing",
		template: async () => {
			const handlers = [
				...Object.values(nitro.routing.routes.routes).flatMap((h) => h.data),
				...Object.values(nitro.routing.routedMiddleware.routes).map((h) => h.data),
				...nitro.routing.globalMiddleware
			];
			const allHandlers = uniqueBy(handlers, "_importHash");
			const traceH3 = !!nitro.options.tracingChannel?.h3;
			const hasNodeHandlers = handlers.some((h) => h.format === "node");
			const serverEntry = nitro.options.serverEntry;
			const webServerEntry = serverEntry && serverEntry.handler && serverEntry.format !== "node" ? serverEntry.handler.replace(/\\/g, "/") : void 0;
			const serverEntryHasDefault = !!webServerEntry && await hasServerEntryDefaultExport(nitro);
			const routeRulesModule = compileRouteRules(nitro.options.routeRules, {
				runtimeRules: { cache: "#nitro/runtime/route-rule-handlers" },
				baseURL: nitro.options.baseURL,
				preMerge: true
			});
			return `${hasNodeHandlers ? `\nimport * as srvxNode from "srvx/node"` : ""}
import * as h3 from "h3";${traceH3 ? `\nimport { wrapHandlerWithTracing } from "h3/tracing";` : ""}

${routeRulesModule}
const multiHandler = (...handlers) => {
  const final = handlers.pop()
  const middleware = handlers.filter(Boolean).map(h => h3.toMiddleware(h));
  return (ev) => h3.callMiddleware(ev, middleware, final);
}

${allHandlers.filter((h) => !h.lazy).map((h) => h.handler === webServerEntry ? serverEntryImport(h, serverEntryHasDefault) : `import ${h._importHash} from ${JSON.stringify(h.handler)};`).join("\n")}

${allHandlers.filter((h) => h.lazy).map((h) => `const ${h._importHash} = h3.defineLazyEventHandler(() => import(${JSON.stringify(h.handler)})${h.format === "node" ? ".then(m => ({ fetch: srvxNode.toFetchHandler(m.default) }))" : ""});`).join("\n")}

export const findRoute = ${nitro.routing.routes.compileToString({ serialize: (h) => serializeHandler(h, { tracing: traceH3 }) })}

export const findRoutedMiddleware = ${nitro.routing.routedMiddleware.compileToString({
				serialize: serializeHandlerFn,
				matchAll: true
			})};

export const globalMiddleware = [
  ${nitro.routing.globalMiddleware.map((h) => h.lazy ? h._importHash : `h3.toEventHandler(${h._importHash})`).join(",")}
].filter(Boolean);
  `;
		}
	};
}
function serverEntryImport(h, hasDefault) {
	const notFound = `() => Symbol.for("h3.notFound")`;
	if (!hasDefault) return `import ${JSON.stringify(h.handler)};
const ${h._importHash} = ${notFound};`;
	const entry = `${h._importHash}_entry`;
	return `import ${entry} from ${JSON.stringify(h.handler)};
const ${h._importHash} = typeof ${entry} === "function" || typeof ${entry}?.fetch === "function" ? ${entry} : ${notFound};`;
}
function uniqueBy(arr, key) {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
}
function serializeHandler(h, opts = {}) {
	const meta = Array.isArray(h) ? h[0] : h;
	const handler = Array.isArray(h) ? `multiHandler(${h.map((handler) => serializeHandlerFn(handler)).join(",")})` : serializeHandlerFn(h);
	return `{${[
		`route:${JSON.stringify(meta.route)}`,
		meta.method && `method:${JSON.stringify(meta.method)}`,
		meta.meta && `meta:${JSON.stringify(meta.meta)}`,
		`handler:${opts.tracing ? `wrapHandlerWithTracing(${handler})` : handler}`
	].filter(Boolean).join(",")}}`;
}
function serializeHandlerFn(h) {
	let code = h._importHash;
	if (!h.lazy) {
		if (h.format === "node") code = `{ fetch: srvxNode.toFetchHandler(${code}) }`;
		code = `h3.toEventHandler(${code})`;
	}
	return code;
}
function runtimeConfig(nitro) {
	return {
		id: "#nitro/virtual/runtime-config",
		template: () => {
			return `export const runtimeConfig = ${JSON.stringify(nitro.options.runtimeConfig || {})};`;
		}
	};
}
function serverAssets(nitro) {
	return {
		id: "#nitro/virtual/server-assets",
		template: async () => {
			if (nitro.options.dev || nitro.options.preset === "nitro-prerender") return `
          import { createStorage } from 'unstorage'
          import fsDriver from 'unstorage/drivers/fs'
          const serverAssets = ${JSON.stringify(nitro.options.serverAssets)}
          export const assets = createStorage()
          for (const asset of serverAssets) {
            assets.mount(asset.baseName, fsDriver({ base: asset.dir, ignore: (asset?.ignore || []) }))
          }`;
			const assets = {};
			for (const asset of nitro.options.serverAssets) {
				const files = await glob(asset.pattern || "**/*", {
					cwd: asset.dir,
					absolute: false,
					ignore: asset.ignore
				});
				for (const _id of files) {
					const fsPath = resolve$2(asset.dir, _id);
					const id = asset.baseName + "/" + _id;
					assets[id] = {
						fsPath,
						meta: {}
					};
					let type = src_default.getType(id) || "text/plain";
					if (type.startsWith("text")) type += "; charset=utf-8";
					const etag = (0, import_etag.default)(await promises.readFile(fsPath));
					const mtime = await promises.stat(fsPath).then((s) => s.mtime.toJSON());
					assets[id].meta = {
						type,
						etag,
						mtime
					};
				}
			}
			return `
const _assets = {\n${Object.entries(assets).map(([id, asset]) => `  [${JSON.stringify(normalizeKey(id))}]: {\n    import: () => import(${JSON.stringify("raw:" + asset.fsPath)}).then(r => r.default || r),\n    meta: ${JSON.stringify(asset.meta)}\n  }`).join(",\n")}\n}

const normalizeKey = ${normalizeKey.toString()}

export const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id)
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id)
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id)
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
}
`;
		}
	};
}
function normalizeKey(key) {
	if (!key) return "";
	return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function services(nitro) {
	return {
		id: "#nitro/virtual/services",
		template: () => servicesTemplate(nitro)
	};
}
function servicesTemplate(nitro) {
	const names = Object.keys(nitro.options.services);
	const loader = nitro._serviceLoader;
	if (!loader) return `export const services = {};`;
	let unbundled = false;
	const entries = names.map((name) => {
		const key = JSON.stringify(name);
		const service = loader(name);
		if ("expression" in service) return `  get [${key}]() { return ${service.expression} }`;
		const id = JSON.stringify(service.import);
		unbundled ||= service.bundle === false;
		return `  [${key}]: lazyService(${key}, () => ${service.bundle === false ? `importUnbundled(${id})` : `import(${id})`})`;
	});
	return `${unbundled ? `
function importUnbundled(id) {
  return import(/* webpackIgnore: true */ /* @vite-ignore */ id)
}` : ""}
function lazyService(name, loader) {
  let promise, mod
  return {
    fetch(req) {
      if (mod) { return mod.fetch(req) }
      if (!promise) {
        promise = loader().then(_mod => {
          const m = typeof _mod.default?.fetch === "function" ? _mod.default : _mod
          if (typeof m.fetch !== "function") {
            throw new TypeError(\`[nitro] Service "\${name}" entry does not export a \\\`fetch\\\` handler.\`)
          }
          return (mod = m)
        }).catch(error => {
          // Retried by the next fetch (e.g. after the output is rebuilt)
          promise = undefined
          throw error
        })
      }
      return promise.then(mod => mod.fetch(req))
    }
  }
}

export const services = {
${entries.join(",\n")}
};
`;
}
function tasks(nitro) {
	return {
		id: "#nitro/virtual/tasks",
		template: () => {
			const _scheduledTasks = Object.entries(nitro.options.scheduledTasks || {}).map(([cron, _tasks]) => {
				return {
					cron,
					tasks: (Array.isArray(_tasks) ? _tasks : [_tasks]).filter((name) => {
						if (!nitro.options.tasks[name]) {
							nitro.logger.warn(`Scheduled task \`${name}\` is not defined!`);
							return false;
						}
						return true;
					})
				};
			}).filter((e) => e.tasks.length > 0);
			const scheduledTasks = _scheduledTasks.length > 0 ? _scheduledTasks : false;
			return `
export const scheduledTasks = ${JSON.stringify(scheduledTasks)};

export const scheduleRunner = ${nitro.options.scheduler.runner !== false};

export const tasks = {
  ${Object.entries(nitro.options.tasks).map(([name, task]) => `"${name}": {
          meta: {
            description: ${JSON.stringify(task.description)},
          },
          resolve: ${task.handler ? `() => import("${normalize$2(task.handler)}").then(r => r.default || r)` : "undefined"},
        }`).join(",\n")}
};`;
		}
	};
}
function tracing(nitro) {
	return {
		id: "#nitro/virtual/tracing",
		template: () => {
			const { srvx, h3 } = nitro.options.tracingChannel || {};
			const imports = [];
			const setup = [];
			if (srvx) imports.push(`import { tracingPlugin as srvxTracing } from "srvx/tracing";`);
			if (h3) {
				imports.push(`import { tracingPlugin as h3Tracing } from "h3/tracing";`);
				setup.push(`  h3Tracing()(nitroApp.h3);`);
			}
			return [
				...imports,
				`export const tracingSrvxPlugins = [${srvx ? "srvxTracing()" : ""}];`,
				`export default function tracing(nitroApp) {`,
				...setup,
				`};`
			].join("\n");
		}
	};
}
function virtualTemplates(nitro, _polyfills) {
	const nitroTemplates = [
		app,
		cache,
		database,
		errorHandler,
		featureFlags,
		kv,
		plugins,
		polyfills,
		publicAssets,
		rendererTemplate,
		routingMeta,
		routing,
		runtimeConfig,
		serverAssets,
		serverEntry,
		services,
		tasks,
		tracing
	].flatMap((t) => t(nitro, _polyfills));
	const customTemplates = Object.entries(nitro.options.virtual).map(([id, template]) => ({
		id,
		template
	}));
	return [...nitroTemplates, ...customTemplates];
}
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar$1 = /* @__PURE__ */ new Uint8Array(64);
var charToInt = /* @__PURE__ */ new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
	const c = chars.charCodeAt(i);
	intToChar$1[i] = c;
	charToInt[c] = i;
}
function encodeInteger(builder, num) {
	do {
		let clamped = num & 31;
		num >>>= 5;
		if (num > 0) clamped |= 32;
		builder.write(intToChar$1[clamped]);
	} while (num > 0);
}
function encodeSign(num) {
	return num < 0 ? -num << 1 | 1 : num << 1;
}
var bufLength = 16384;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? { decode(buf) {
	return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString();
} } : { decode(buf) {
	let out = "";
	for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
	return out;
} };
var StringWriter = class {
	constructor() {
		this.pos = 0;
		this.out = "";
		this.buffer = new Uint8Array(bufLength);
	}
	write(v) {
		const { buffer } = this;
		buffer[this.pos++] = v;
		if (this.pos === bufLength) {
			this.out += td.decode(buffer);
			this.pos = 0;
		}
	}
	flush() {
		const { buffer, out, pos } = this;
		return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
	}
};
function encodeRangeMappings(decoded) {
	if (decoded.length === 0) return "";
	const writer = new StringWriter();
	for (let i = 0; i < decoded.length; i++) {
		const indices = decoded[i];
		if (i > 0) writer.write(semicolon);
		let index = 0;
		for (let j = 0; j < indices.length; j++) {
			const offset = indices[j];
			encodeInteger(writer, offset - index);
			index = offset;
		}
	}
	return writer.flush();
}
function encode(decoded) {
	const writer = new StringWriter();
	let sourcesIndex = 0;
	let sourceLine = 0;
	let sourceColumn = 0;
	let namesIndex = 0;
	for (let i = 0; i < decoded.length; i++) {
		const line = decoded[i];
		if (i > 0) writer.write(semicolon);
		if (line.length === 0) continue;
		let genColumn = 0;
		for (let j = 0; j < line.length; j++) {
			const segment = line[j];
			if (j > 0) writer.write(comma);
			encodeInteger(writer, encodeSign(segment[0] - genColumn));
			genColumn = segment[0];
			if (segment.length === 1) continue;
			encodeInteger(writer, encodeSign(segment[1] - sourcesIndex));
			encodeInteger(writer, encodeSign(segment[2] - sourceLine));
			encodeInteger(writer, encodeSign(segment[3] - sourceColumn));
			sourcesIndex = segment[1];
			sourceLine = segment[2];
			sourceColumn = segment[3];
			if (segment.length === 4) continue;
			encodeInteger(writer, encodeSign(segment[4] - namesIndex));
			namesIndex = segment[4];
		}
	}
	return writer.flush();
}
var BitSet$1 = class BitSet {
	constructor(arg) {
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}
	add(n) {
		this.bits[n >> 5] |= 1 << (n & 31);
	}
	has(n) {
		return !!(this.bits[n >> 5] & 1 << (n & 31));
	}
	forEach(fn) {
		const bits = this.bits;
		for (let w = 0; w < bits.length; w++) {
			let word = bits[w];
			while (word) {
				const lowest = word & -word;
				fn((w << 5) + 31 - Math.clz32(lowest));
				word ^= lowest;
			}
		}
	}
};
var Chunk$1 = class Chunk {
	constructor(start, end, content) {
		this.start = start;
		this.end = end;
		this.original = content;
		this.intro = "";
		this.outro = "";
		this.content = content;
		this.storeName = false;
		this.edited = false;
		this.replacesUntil = -1;
		this.replacedFrom = -1;
		this.previous = null;
		this.next = null;
	}
	appendLeft(content) {
		this.outro += content;
	}
	appendRight(content) {
		this.intro = this.intro + content;
	}
	clone() {
		const chunk = new Chunk(this.start, this.end, this.original);
		chunk.intro = this.intro;
		chunk.outro = this.outro;
		chunk.content = this.content;
		chunk.storeName = this.storeName;
		chunk.edited = this.edited;
		chunk.replacesUntil = this.replacesUntil;
		chunk.replacedFrom = this.replacedFrom;
		return chunk;
	}
	contains(index) {
		return this.start < index && index < this.end;
	}
	eachNext(fn) {
		fn(this);
		let chunk = this.next;
		while (chunk) {
			fn(chunk);
			chunk = chunk.next;
		}
	}
	eachPrevious(fn) {
		fn(this);
		let chunk = this.previous;
		while (chunk) {
			fn(chunk);
			chunk = chunk.previous;
		}
	}
	edit(content, storeName, contentOnly) {
		this.content = content;
		if (!contentOnly) {
			this.intro = "";
			this.outro = "";
		}
		this.storeName = storeName;
		this.edited = true;
		return this;
	}
	prependLeft(content) {
		this.outro = content + this.outro;
	}
	prependRight(content) {
		this.intro = content + this.intro;
	}
	reset() {
		this.intro = "";
		this.outro = "";
		this.replacesUntil = -1;
		this.replacedFrom = -1;
		if (this.edited) {
			this.content = this.original;
			this.storeName = false;
			this.edited = false;
		}
	}
	split(index) {
		const sliceIndex = index - this.start;
		const originalBefore = this.original.slice(0, sliceIndex);
		const originalAfter = this.original.slice(sliceIndex);
		this.original = originalBefore;
		const newChunk = new Chunk(index, this.end, originalAfter);
		newChunk.outro = this.outro;
		this.outro = "";
		this.end = index;
		if (this.edited) {
			newChunk.edit("", false, true);
			newChunk.replacedFrom = this.replacedFrom;
		} else this.content = originalBefore;
		newChunk.next = this.next;
		if (newChunk.next) newChunk.next.previous = newChunk;
		newChunk.previous = this;
		this.next = newChunk;
		return newChunk;
	}
	toString() {
		return this.intro + this.content + this.outro;
	}
	trimEnd(rx) {
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				if (this.edited) this.edit(trimmed, this.storeName, true);
				else this.split(this.start + trimmed.length).edit("", void 0, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.intro = this.intro.replace(rx, "");
			if (this.intro.length) return true;
		}
	}
	trimStart(rx) {
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				if (this.edited) this.edit(trimmed, this.storeName, true);
				else {
					this.split(this.end - trimmed.length);
					this.edit("", void 0, true);
				}
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.outro = this.outro.replace(rx, "");
			if (this.outro.length) return true;
		}
	}
};
var MagicStringError = class extends Error {
	name = "MagicStringError";
	constructor(message, options) {
		super(`[MagicString] ${message}`, options);
	}
};
function getBtoa$1() {
	if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
	const buffer = globalThis["Buffer"];
	if (buffer) return (str) => buffer.from(str, "utf-8").toString("base64");
	return () => {
		throw new MagicStringError("unsupported environment: `btoa` or `Buffer` is required");
	};
}
var btoa$1 = /* #__PURE__ */ getBtoa$1();
var SourceMap$1 = class {
	constructor(properties) {
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = typeof properties.mappings === "string" ? properties.mappings : encode(properties.mappings);
		if (typeof properties.x_google_ignoreList !== "undefined") this.x_google_ignoreList = properties.x_google_ignoreList;
		if (typeof properties.debugId !== "undefined") this.debugId = properties.debugId;
		if (typeof properties.rangeMappings !== "undefined") {
			let shouldOutputRangeMapping = false;
			for (const line of properties.rangeMappings) if (line.length !== 0) {
				shouldOutputRangeMapping = true;
				break;
			}
			if (shouldOutputRangeMapping) this.rangeMappings = encodeRangeMappings(properties.rangeMappings);
		}
	}
	toString() {
		return JSON.stringify(this);
	}
	toUrl() {
		return `data:application/json;charset=utf-8;base64,${btoa$1(this.toString())}`;
	}
};
function getLocator$1(source) {
	const lineOffsets = [0];
	for (let i = source.indexOf("\n"); i !== -1; i = source.indexOf("\n", i + 1)) lineOffsets.push(i + 1);
	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = i + j >> 1;
			if (index < lineOffsets[m]) j = m;
			else i = m + 1;
		}
		const line = i - 1;
		return {
			line,
			column: index - lineOffsets[line]
		};
	};
}
function getRelativePath$1(from, to) {
	const fromParts = from.split(/[/\\]/);
	const toParts = to.split(/[/\\]/);
	fromParts.pop();
	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}
	if (fromParts.length) {
		let i = fromParts.length;
		while (i--) fromParts[i] = "..";
	}
	return fromParts.concat(toParts).join("/");
}
function guessIndent$1(code) {
	const lines = code.split("\n");
	const tabbed = lines.filter((line) => /^\t+/.test(line));
	const spaced = lines.filter((line) => /^ {2,}/.test(line));
	if (tabbed.length === 0 && spaced.length === 0) return null;
	if (tabbed.length >= spaced.length) return "	";
	const min = spaced.reduce((previous, current) => {
		const numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);
	return " ".repeat(min);
}
var toString$1 = Object.prototype.toString;
function isObject$1(thing) {
	return toString$1.call(thing) === "[object Object]";
}
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = /* #__PURE__ */ (() => {
	const chars = /* @__PURE__ */ new Uint8Array(64);
	for (let i = 0; i < 64; i++) chars[i] = BASE64_CHARS.charCodeAt(i);
	return chars;
})();
var COMMA = 44;
var SEMICOLON = 59;
var BUFFER_SIZE = 16384;
var FLUSH_THRESHOLD = 16348;
var scratch = /* #__PURE__ */ new Uint8Array(BUFFER_SIZE);
function writeVlq(pos, num) {
	num = num < 0 ? -num << 1 | 1 : num << 1;
	do {
		let clamped = num & 31;
		num >>>= 5;
		if (num > 0) clamped |= 32;
		scratch[pos++] = intToChar[clamped];
	} while (num > 0);
	return pos;
}
var decoder = /* #__PURE__ */ new TextDecoder();
var MappingsEncoder = class {
	constructor() {
		this.out = "";
		this.pos = 0;
		this.lines = [];
		this.buffered = 0;
		this.needsComma = false;
		this.prevGenColumn = 0;
		this.prevSourceIndex = 0;
		this.prevSourceLine = 0;
		this.prevSourceColumn = 0;
		this.prevNameIndex = 0;
	}
	endLine(segments) {
		this.lines.push(segments);
		this.buffered += segments.length + 1;
		if (this.buffered >= 4096) this.drain(null);
	}
	segments(segments) {
		this.drain(segments);
	}
	finish(segments) {
		this.drain(segments);
		this.flush();
		return this.out;
	}
	drain(trailing) {
		const lines = this.lines;
		const lineCount = lines.length;
		for (let l = 0; l <= lineCount; l++) {
			const line = l < lineCount ? lines[l] : trailing;
			if (line === null) break;
			for (let i = 0; i < line.length; i++) {
				if (this.pos > FLUSH_THRESHOLD) this.flush();
				const segment = line[i];
				if (this.needsComma) scratch[this.pos++] = COMMA;
				this.needsComma = true;
				this.pos = writeVlq(this.pos, segment[0] - this.prevGenColumn);
				this.prevGenColumn = segment[0];
				this.pos = writeVlq(this.pos, segment[1] - this.prevSourceIndex);
				this.prevSourceIndex = segment[1];
				this.pos = writeVlq(this.pos, segment[2] - this.prevSourceLine);
				this.prevSourceLine = segment[2];
				this.pos = writeVlq(this.pos, segment[3] - this.prevSourceColumn);
				this.prevSourceColumn = segment[3];
				if (segment.length === 5) {
					this.pos = writeVlq(this.pos, segment[4] - this.prevNameIndex);
					this.prevNameIndex = segment[4];
				}
			}
			if (l < lineCount) {
				if (this.pos > FLUSH_THRESHOLD) this.flush();
				scratch[this.pos++] = SEMICOLON;
				this.needsComma = false;
				this.prevGenColumn = 0;
			}
		}
		lines.length = 0;
		this.buffered = 0;
		this.flush();
	}
	flush() {
		this.out += decoder.decode(scratch.subarray(0, this.pos));
		this.pos = 0;
	}
};
var NEWLINE_CHAR$1 = 10;
function isWordCode(code) {
	return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 95;
}
var Mappings$1 = class {
	constructor(hires, encoder = null) {
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.rawRangeMappingsIndices = [];
		this.rawRangeMappings = hires === "experimental-range" ? [this.rawRangeMappingsIndices] : void 0;
		this.encoder = encoder;
	}
	nextLine() {
		if (this.encoder === null) {
			this.generatedCodeLine += 1;
			this.raw[this.generatedCodeLine] = this.rawSegments = [];
		} else {
			this.encoder.endLine(this.rawSegments);
			this.rawSegments = [];
			this.generatedCodeLine += 1;
		}
		this.generatedCodeColumn = 0;
		if (this.rawRangeMappings) this.rawRangeMappings[this.generatedCodeLine] = this.rawRangeMappingsIndices = [];
	}
	addMagicString(magicString, sourceIndex, nameIndex) {
		const { original } = magicString;
		const locate = getLocator$1(original);
		if (magicString.intro) this.advance(magicString.intro);
		magicString.firstChunk.eachNext((chunk) => {
			if (chunk.intro.length) this.advance(chunk.intro);
			if (sourceIndex === -1) this.advance(chunk.content);
			else if (chunk.edited) {
				const name = chunk.storeName ? nameIndex.get(original.slice(chunk.start, chunk.replacesUntil)) : void 0;
				this.addEdit(sourceIndex, chunk.content, locate(chunk.start), name ?? -1);
			} else this.addUneditedChunk(sourceIndex, chunk, original, locate(chunk.start), magicString.sourcemapLocations);
			if (chunk.outro.length) this.advance(chunk.outro);
		});
		if (magicString.outro) this.advance(magicString.outro);
	}
	addEdit(sourceIndex, content, loc, nameIndex) {
		if (content.length) {
			const contentLengthMinusOne = content.length - 1;
			let contentLineEnd = content.indexOf("\n", 0);
			let previousContentLineEnd = -1;
			while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
				const segment = [
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				];
				if (nameIndex >= 0) segment.push(nameIndex);
				this.rawSegments.push(segment);
				this.nextLine();
				previousContentLineEnd = contentLineEnd;
				contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
			}
			const segment = [
				this.generatedCodeColumn,
				sourceIndex,
				loc.line,
				loc.column
			];
			if (nameIndex >= 0) segment.push(nameIndex);
			this.rawSegments.push(segment);
			this.advance(content.slice(previousContentLineEnd + 1));
		}
	}
	addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
		const end = chunk.end;
		let i = chunk.start;
		if (this.hires) {
			const boundary = this.hires === "boundary";
			const experimentalRange = this.hires === "experimental-range";
			const encoder = experimentalRange ? null : this.encoder;
			let charInHiresBoundary = false;
			while (i < end) {
				if (encoder !== null && this.rawSegments.length >= 4096) {
					encoder.segments(this.rawSegments);
					this.rawSegments.length = 0;
				}
				if (experimentalRange && i + 1 >= end) this.rawSegments.push([
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				]);
				const code = original.charCodeAt(i);
				if (code === NEWLINE_CHAR$1) {
					loc.line += 1;
					loc.column = 0;
					this.nextLine();
					charInHiresBoundary = false;
				} else {
					if (boundary) {
						if (isWordCode(code)) {
							if (!charInHiresBoundary) {
								this.rawSegments.push([
									this.generatedCodeColumn,
									sourceIndex,
									loc.line,
									loc.column
								]);
								charInHiresBoundary = true;
							}
						} else {
							this.rawSegments.push([
								this.generatedCodeColumn,
								sourceIndex,
								loc.line,
								loc.column
							]);
							charInHiresBoundary = false;
						}
					} else if (experimentalRange) {
						if (i === chunk.start) {
							this.rawRangeMappingsIndices.push(this.rawSegments.length);
							this.rawSegments.push([
								this.generatedCodeColumn,
								sourceIndex,
								loc.line,
								loc.column
							]);
						}
					} else this.rawSegments.push([
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					]);
					loc.column += 1;
					this.generatedCodeColumn += 1;
				}
				i += 1;
			}
		} else {
			const bits = sourcemapLocations.bits;
			while (i < end) {
				let newline = original.indexOf("\n", i);
				if (newline === -1 || newline > end) newline = end;
				if (newline > i) {
					this.rawSegments.push([
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					]);
					for (let w = i + 1 >> 5, last = newline - 1 >> 5; w <= last; w++) {
						let word = bits[w];
						if (!word) continue;
						const base = w << 5;
						while (word) {
							const lowest = word & -word;
							const index = base + 31 - Math.clz32(lowest);
							if (index > i && index < newline) {
								const offset = index - i;
								this.rawSegments.push([
									this.generatedCodeColumn + offset,
									sourceIndex,
									loc.line,
									loc.column + offset
								]);
							}
							word ^= lowest;
						}
					}
					loc.column += newline - i;
					this.generatedCodeColumn += newline - i;
				}
				if (newline === end) break;
				loc.line += 1;
				loc.column = 0;
				this.nextLine();
				i = newline + 1;
			}
		}
	}
	advance(str) {
		if (!str) return;
		const lastNewline = str.lastIndexOf("\n");
		for (let i = str.indexOf("\n"); i !== -1; i = str.indexOf("\n", i + 1)) this.nextLine();
		this.generatedCodeColumn += str.length - lastNewline - 1;
	}
};
var n$2 = "\n";
var NEWLINE_CHAR = "\n".charCodeAt(0);
var CR_CHAR = "\r".charCodeAt(0);
var warned$1 = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};
function expandReplacement(replacement, matched, position, str, captures, namedCaptures) {
	if (!replacement.includes("$")) return replacement;
	let result = "";
	let index = 0;
	while (index < replacement.length) {
		const dollar = replacement.indexOf("$", index);
		if (dollar === -1) {
			result += replacement.slice(index);
			break;
		}
		result += replacement.slice(index, dollar);
		const char = replacement[dollar + 1];
		let expansion = "$";
		let consumed = 1;
		if (char === "$") consumed = 2;
		else if (char === "&") {
			expansion = matched;
			consumed = 2;
		} else if (char === "`") {
			expansion = str.slice(0, position);
			consumed = 2;
		} else if (char === "'") {
			expansion = str.slice(position + matched.length);
			consumed = 2;
		} else if (char === "<" && namedCaptures !== void 0) {
			const close = replacement.indexOf(">", dollar + 2);
			if (close !== -1) {
				expansion = namedCaptures[replacement.slice(dollar + 2, close)] ?? "";
				consumed = close + 1 - dollar;
			}
		} else if (char >= "0" && char <= "9") {
			const second = replacement[dollar + 2];
			const double = second >= "0" && second <= "9" ? Number(char + second) : NaN;
			const single = Number(char);
			if (double >= 1 && double <= captures.length) {
				expansion = captures[double - 1] ?? "";
				consumed = 3;
			} else if (single >= 1 && single <= captures.length) {
				expansion = captures[single - 1] ?? "";
				consumed = 2;
			}
		}
		result += expansion;
		index = dollar + consumed;
	}
	return result;
}
var MagicString$1 = class MagicString {
	constructor(string, options = {}) {
		const chunk = new Chunk$1(0, string.length, string);
		Object.defineProperties(this, {
			original: {
				writable: true,
				value: string
			},
			outro: {
				writable: true,
				value: ""
			},
			intro: {
				writable: true,
				value: ""
			},
			firstChunk: {
				writable: true,
				value: chunk
			},
			lastChunk: {
				writable: true,
				value: chunk
			},
			lastSearchedChunk: {
				writable: true,
				value: chunk
			},
			byStart: {
				writable: true,
				value: /* @__PURE__ */ new Map([[0, chunk]])
			},
			byEnd: {
				writable: true,
				value: /* @__PURE__ */ new Map([[string.length, chunk]])
			},
			filename: {
				writable: true,
				value: options.filename
			},
			indentExclusionRanges: {
				writable: true,
				value: options.indentExclusionRanges
			},
			sourcemapLocations: {
				writable: true,
				value: new BitSet$1()
			},
			storedNames: {
				writable: true,
				value: /* @__PURE__ */ new Set()
			},
			indentStr: {
				writable: true,
				value: void 0
			},
			ignoreList: {
				writable: true,
				value: options.ignoreList
			},
			offset: {
				writable: true,
				value: options.offset || 0
			},
			hasMovedChunks: {
				writable: true,
				value: false
			}
		});
	}
	addSourcemapLocation(char) {
		this.sourcemapLocations.add(char);
	}
	append(content) {
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this.outro += content;
		return this;
	}
	appendLeft(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byEnd.get(index);
		if (chunk) chunk.appendLeft(content);
		else this.intro += content;
		return this;
	}
	appendRight(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byStart.get(index);
		if (chunk) chunk.appendRight(content);
		else this.outro += content;
		return this;
	}
	clone() {
		const cloned = new MagicString(this.original, {
			filename: this.filename,
			ignoreList: this.ignoreList,
			offset: this.offset
		});
		let originalChunk = this.firstChunk;
		let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
		while (originalChunk) {
			cloned.byStart.set(clonedChunk.start, clonedChunk);
			cloned.byEnd.set(clonedChunk.end, clonedChunk);
			const nextOriginalChunk = originalChunk.next;
			const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
			if (nextClonedChunk) {
				clonedChunk.next = nextClonedChunk;
				nextClonedChunk.previous = clonedChunk;
				clonedChunk = nextClonedChunk;
			}
			originalChunk = nextOriginalChunk;
		}
		cloned.lastChunk = clonedChunk;
		if (this.indentExclusionRanges) cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
		cloned.sourcemapLocations = new BitSet$1(this.sourcemapLocations);
		cloned.storedNames = new Set(this.storedNames);
		cloned.intro = this.intro;
		cloned.outro = this.outro;
		cloned.hasMovedChunks = this.hasMovedChunks;
		return cloned;
	}
	generateDecodedMap(options) {
		options = options || {};
		const mappings = new Mappings$1(options.hires);
		const names = this._generateMappings(mappings);
		return {
			...this._mapProperties(options, names),
			mappings: mappings.raw,
			rangeMappings: mappings.rawRangeMappings
		};
	}
	generateMap(options) {
		options = options || {};
		const encoder = new MappingsEncoder();
		const mappings = new Mappings$1(options.hires, encoder);
		const names = this._generateMappings(mappings);
		return new SourceMap$1({
			...this._mapProperties(options, names),
			mappings: encoder.finish(mappings.rawSegments),
			rangeMappings: mappings.rawRangeMappings
		});
	}
	_generateMappings(mappings) {
		const names = [...this.storedNames];
		mappings.addMagicString(this, 0, new Map(names.map((name, i) => [name, i])));
		return names;
	}
	_mapProperties(options, names) {
		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
			sources: [options.source ? getRelativePath$1(options.file || "", options.source) : options.file || ""],
			sourcesContent: options.includeContent ? [this.original] : void 0,
			names,
			x_google_ignoreList: this.ignoreList ? [0] : void 0
		};
	}
	_ensureindentStr() {
		if (this.indentStr === void 0) this.indentStr = guessIndent$1(this.original);
	}
	_getRawIndentString() {
		this._ensureindentStr();
		return this.indentStr;
	}
	getIndentString() {
		this._ensureindentStr();
		return this.indentStr ?? "	";
	}
	indent(indentStr, options) {
		const pattern = /^[^\r\n]/gm;
		if (isObject$1(indentStr)) {
			options = indentStr;
			indentStr = void 0;
		}
		if (indentStr === void 0) {
			this._ensureindentStr();
			indentStr = this.indentStr || "	";
		}
		if (indentStr === "") return this;
		const resolvedIndentStr = indentStr;
		options = options || {};
		const isExcluded = new BitSet$1();
		if (options.exclude) (typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude).forEach((exclusion) => {
			for (let i = exclusion[0]; i < exclusion[1]; i += 1) isExcluded.add(i);
		});
		let shouldIndentNextCharacter = options.indentStart !== false;
		const indentPiece = (str) => {
			if (str === "") return str;
			const indented = str.replace(pattern, (match, offset) => offset > 0 || shouldIndentNextCharacter ? `${resolvedIndentStr}${match}` : match);
			shouldIndentNextCharacter = str[str.length - 1] === "\n";
			return indented;
		};
		this.intro = indentPiece(this.intro);
		let charIndex = 0;
		let chunk = this.firstChunk;
		const indentAt = (index) => {
			shouldIndentNextCharacter = false;
			if (index === chunk.start) chunk.appendRight(resolvedIndentStr);
			else {
				this._splitChunk(chunk, index);
				chunk = chunk.next;
				chunk.prependRight(resolvedIndentStr);
			}
		};
		while (chunk) {
			const end = chunk.end;
			if (!isExcluded.has(chunk.start)) chunk.intro = indentPiece(chunk.intro);
			if (chunk.edited) {
				if (!isExcluded.has(chunk.start)) chunk.content = indentPiece(chunk.content);
				else if (chunk.content) shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
			} else if (options.exclude) {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!isExcluded.has(charIndex)) {
						const char = this.original.charCodeAt(charIndex);
						if (char === NEWLINE_CHAR) shouldIndentNextCharacter = true;
						else if (char !== CR_CHAR && shouldIndentNextCharacter) indentAt(charIndex);
					}
					charIndex += 1;
				}
			} else {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!shouldIndentNextCharacter) {
						const nextLine = this.original.indexOf(n$2, charIndex);
						if (nextLine === -1 || nextLine >= end) break;
						shouldIndentNextCharacter = true;
						charIndex = nextLine + 1;
						continue;
					}
					const char = this.original.charCodeAt(charIndex);
					if (char === NEWLINE_CHAR || char === CR_CHAR) {
						charIndex += 1;
						continue;
					}
					indentAt(charIndex);
					charIndex += 1;
				}
			}
			if (!isExcluded.has(chunk.end - 1)) chunk.outro = indentPiece(chunk.outro);
			charIndex = chunk.end;
			chunk = chunk.next;
		}
		this.outro = indentPiece(this.outro);
		return this;
	}
	insert() {
		throw new MagicStringError("insert() is deprecated, use appendLeft() or prependRight()");
	}
	insertLeft(index, content) {
		if (!warned$1.insertLeft) {
			console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
			warned$1.insertLeft = true;
		}
		return this.appendLeft(index, content);
	}
	insertRight(index, content) {
		if (!warned$1.insertRight) {
			console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
			warned$1.insertRight = true;
		}
		return this.prependRight(index, content);
	}
	move(start, end, index, affinity = "right") {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		index = this._resolveIndex(index);
		if (start === end) return this;
		if (start < 0 || end > this.original.length || index < 0 || index > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		if (index >= start && index <= end) throw new MagicStringError("cannot move a selection inside itself");
		this._split(start);
		this._split(end);
		this._split(index);
		const first = this.byStart.get(start);
		const last = this.byEnd.get(end);
		if (!first || !last) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (this.hasMovedChunks) {
			let cursor = first;
			while (cursor !== last) {
				cursor = cursor.next;
				if (!cursor || cursor.start < start || cursor.end > end) throw new MagicStringError(`cannot move ${start} to ${end} because an earlier move split that range`);
			}
		}
		const oldLeft = first.previous;
		const oldRight = last.next;
		let newLeft;
		let newRight;
		if (affinity === "left") {
			newLeft = this.byEnd.get(index) ?? null;
			if (!newLeft) {
				if (first === this.firstChunk) return this;
				newRight = this.firstChunk;
			} else {
				if (newLeft.next === first) return this;
				newRight = newLeft.next;
			}
		} else {
			newRight = this.byStart.get(index) ?? null;
			if (!newRight) {
				if (last === this.lastChunk) return this;
				newLeft = this.lastChunk;
			} else {
				if (newRight.previous === last) return this;
				newLeft = newRight.previous;
			}
		}
		if (oldLeft) oldLeft.next = oldRight;
		if (oldRight) oldRight.previous = oldLeft;
		if (newLeft) newLeft.next = first;
		if (newRight) newRight.previous = last;
		if (!oldLeft) this.firstChunk = oldRight;
		if (!oldRight) {
			this.lastChunk = oldLeft;
			this.lastChunk.next = null;
		}
		first.previous = newLeft;
		last.next = newRight || null;
		if (!newLeft) this.firstChunk = first;
		if (!newRight) this.lastChunk = last;
		this.hasMovedChunks = true;
		return this;
	}
	overwrite(start, end, content, options) {
		if (options === true) {
			if (!warned$1.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned$1.storeName = true;
			}
			return this.update(start, end, content, {
				storeName: true,
				overwrite: true
			});
		}
		const optionObject = typeof options === "object" && options ? options : {};
		return this.update(start, end, content, {
			...optionObject,
			overwrite: !optionObject.contentOnly
		});
	}
	update(start, end, content, options) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		if (start < 0) throw new MagicStringError(`start ${start} is out of bounds`);
		if (end > this.original.length) throw new MagicStringError(`end ${end} is out of bounds`);
		if (start === end) throw new MagicStringError(`cannot overwrite a zero-length range at ${start}, use appendLeft() or prependRight()`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		if (options === true) {
			if (!warned$1.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned$1.storeName = true;
			}
			options = { storeName: true };
		}
		const optionObject = typeof options === "object" && options ? options : {};
		const storeName = optionObject.storeName || false;
		const overwrite = optionObject.overwrite || false;
		if (storeName) this.storedNames.add(this.original.slice(start, end));
		const first = this.byStart.get(start);
		for (let chunk = first; chunk.end < end;) {
			const next = chunk.next;
			if (next === null || next !== this.byStart.get(chunk.end)) throw new MagicStringError("cannot overwrite across a split point");
			chunk = next;
		}
		for (let chunk = first.next; chunk !== null && chunk.start < end; chunk = chunk.next) {
			chunk.edit("", false, !overwrite);
			chunk.replacesUntil = -1;
			chunk.replacedFrom = start;
		}
		first.edit(content, storeName, !overwrite);
		first.replacesUntil = end;
		first.replacedFrom = -1;
		return this;
	}
	prepend(content) {
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this.intro = content + this.intro;
		return this;
	}
	prependLeft(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byEnd.get(index);
		if (chunk) chunk.prependLeft(content);
		else this.intro = content + this.intro;
		return this;
	}
	prependRight(index, content) {
		index = this._resolveIndex(index);
		if (index < 0 || index > this.original.length) throw new MagicStringError(`index ${index} is out of bounds`);
		if (typeof content !== "string") throw new MagicStringError(`content must be a string, got ${typeof content}`);
		this._split(index);
		const chunk = this.byStart.get(index);
		if (chunk) chunk.prependRight(content);
		else this.outro = content + this.outro;
		return this;
	}
	remove(start, end) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		let chunk = this.byStart.get(start);
		while (chunk) {
			if (chunk.start > start) chunk.intro = "";
			if (chunk.end < end) chunk.outro = "";
			chunk.edit("", false, true);
			chunk.replacesUntil = -1;
			chunk.replacedFrom = -1;
			chunk = end > chunk.end ? this.byStart.get(chunk.end) : void 0;
		}
		return this;
	}
	reset(start, end) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new MagicStringError(`range ${start}–${end} is out of bounds`);
		if (start > end) throw new MagicStringError(`end must be greater than start (start: ${start}, end: ${end})`);
		this._split(start);
		this._split(end);
		let chunk = this.byStart.get(start);
		while (chunk) {
			chunk.reset();
			chunk = end > chunk.end ? this.byStart.get(chunk.end) : void 0;
		}
		return this;
	}
	lastChar() {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		let chunk = this.lastChunk;
		while (chunk) {
			if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
			if (chunk.content.length) return chunk.content[chunk.content.length - 1];
			if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
			chunk = chunk.previous;
		}
		if (this.intro.length) return this.intro[this.intro.length - 1];
		return "";
	}
	lastLine() {
		let lineIndex = this.outro.lastIndexOf(n$2);
		if (lineIndex !== -1) return this.outro.slice(lineIndex + 1);
		let lineStr = this.outro;
		let chunk = this.lastChunk;
		while (chunk) {
			if (chunk.outro.length > 0) {
				lineIndex = chunk.outro.lastIndexOf(n$2);
				if (lineIndex !== -1) return chunk.outro.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.outro + lineStr;
			}
			if (chunk.content.length > 0) {
				lineIndex = chunk.content.lastIndexOf(n$2);
				if (lineIndex !== -1) return chunk.content.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.content + lineStr;
			}
			if (chunk.intro.length > 0) {
				lineIndex = chunk.intro.lastIndexOf(n$2);
				if (lineIndex !== -1) return chunk.intro.slice(lineIndex + 1) + lineStr;
				lineStr = chunk.intro + lineStr;
			}
			chunk = chunk.previous;
		}
		lineIndex = this.intro.lastIndexOf(n$2);
		if (lineIndex !== -1) return this.intro.slice(lineIndex + 1) + lineStr;
		return this.intro + lineStr;
	}
	slice(start = 0, end = this.original.length - this.offset) {
		start = this._resolveIndex(start);
		end = this._resolveIndex(end);
		let result = "";
		let chunk;
		if (this.hasMovedChunks) {
			chunk = this.firstChunk;
			while (chunk && (chunk.start > start || chunk.end <= start)) {
				if (chunk.start < end && chunk.end >= end || end === 0 && chunk.start === 0) return result;
				chunk = chunk.next;
			}
		} else {
			if (start >= end) return result;
			chunk = this._chunkAt(start);
		}
		if (chunk && chunk.edited && chunk.start !== start) throw new MagicStringError(`cannot use edited character ${start} as slice start anchor`);
		const startChunk = chunk;
		while (chunk) {
			if (end === 0 && chunk.start === 0) break;
			if (chunk.intro && (startChunk !== chunk || chunk.start === start)) result += chunk.intro;
			const containsEnd = chunk.start < end && chunk.end >= end;
			if (containsEnd && chunk.edited && chunk.end !== end) throw new MagicStringError(`cannot use edited character ${end} as slice end anchor`);
			const sliceStart = startChunk === chunk ? start - chunk.start : 0;
			const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
			result += chunk.content.slice(sliceStart, sliceEnd);
			if (chunk.outro && (!containsEnd || chunk.end === end)) result += chunk.outro;
			if (containsEnd) break;
			chunk = chunk.next;
		}
		return result;
	}
	snip(start, end) {
		const clone = this.clone();
		clone.remove(-clone.offset, start);
		clone.remove(end, clone.original.length - clone.offset);
		return clone;
	}
	_resolveIndex(index) {
		const resolved = index + this.offset;
		if (!Number.isInteger(resolved)) throw new MagicStringError(`index must be an integer, got ${index}`);
		if (resolved < 0 && this.original.length !== 0) return Math.max(0, resolved + this.original.length);
		return resolved;
	}
	_chunkAt(index) {
		let chunk = this.byStart.get(index);
		if (chunk) return chunk;
		chunk = this.lastSearchedChunk;
		const searchForward = index >= chunk.end;
		while (chunk && !chunk.contains(index)) chunk = searchForward ? this.byStart.get(chunk.end) : this.byEnd.get(chunk.start);
		if (chunk) this.lastSearchedChunk = chunk;
		return chunk;
	}
	_split(index) {
		if (this.byStart.get(index) || this.byEnd.get(index)) return;
		let chunk = this.lastSearchedChunk;
		let previousChunk = chunk;
		const searchForward = index > chunk.end;
		while (chunk) {
			if (chunk.contains(index)) return this._splitChunk(chunk, index);
			chunk = searchForward ? this.byStart.get(chunk.end) : this.byEnd.get(chunk.start);
			if (chunk === previousChunk) return;
			previousChunk = chunk;
		}
	}
	_splitChunk(chunk, index) {
		if (chunk.edited && chunk.content.length) {
			const loc = getLocator$1(this.original)(index);
			throw new MagicStringError(`cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`);
		}
		const newChunk = chunk.split(index);
		this.byEnd.set(index, chunk);
		this.byStart.set(index, newChunk);
		this.byEnd.set(newChunk.end, newChunk);
		if (chunk === this.lastChunk) this.lastChunk = newChunk;
		this.lastSearchedChunk = chunk;
		return true;
	}
	toString() {
		let str = this.intro;
		let chunk = this.firstChunk;
		while (chunk) {
			str += chunk.toString();
			chunk = chunk.next;
		}
		return str + this.outro;
	}
	isEmpty() {
		if (this.intro.length && this.intro.trim()) return false;
		let chunk = this.firstChunk;
		while (chunk) {
			if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) return false;
			chunk = chunk.next;
		}
		if (this.outro.length && this.outro.trim()) return false;
		return true;
	}
	length() {
		let chunk = this.firstChunk;
		let length = 0;
		while (chunk) {
			length += chunk.intro.length + chunk.content.length + chunk.outro.length;
			chunk = chunk.next;
		}
		return length;
	}
	trimLines() {
		return this.trim("[\\r\\n]");
	}
	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}
	trimEndAborted(charType) {
		const rx = new RegExp(`${charType || "\\s"}+$`);
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		let chunk = this.lastChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimEnd(rx);
			if (chunk.end !== end) {
				const next = chunk.next;
				if (this.lastChunk === chunk) this.lastChunk = next;
				this.byEnd.set(chunk.end, chunk);
				this.byStart.set(next.start, next);
				this.byEnd.set(next.end, next);
			}
			if (aborted) return true;
			chunk = chunk.previous;
		} while (chunk);
		this.intro = this.intro.replace(rx, "");
		return this.intro.length > 0;
	}
	trimEnd(charType) {
		this.trimEndAborted(charType);
		return this;
	}
	trimStartAborted(charType) {
		const rx = new RegExp(`^${charType || "\\s"}+`);
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		let chunk = this.firstChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimStart(rx);
			if (chunk.end !== end) {
				const next = chunk.next;
				if (chunk === this.lastChunk) this.lastChunk = next;
				this.byEnd.set(chunk.end, chunk);
				this.byStart.set(next.start, next);
				this.byEnd.set(next.end, next);
			}
			if (aborted) return true;
			chunk = chunk.next;
		} while (chunk);
		this.outro = this.outro.replace(rx, "");
		return this.outro.length > 0;
	}
	trimStart(charType) {
		this.trimStartAborted(charType);
		return this;
	}
	hasChanged() {
		if (this.intro || this.outro) return true;
		let outputIndex = 0;
		let chunk = this.firstChunk;
		while (chunk) {
			if (chunk.intro || chunk.outro) return true;
			if (!chunk.edited && chunk.start === outputIndex) outputIndex = chunk.end;
			else {
				if (!this.original.startsWith(chunk.content, outputIndex)) return true;
				outputIndex += chunk.content.length;
			}
			chunk = chunk.next;
		}
		return outputIndex !== this.original.length;
	}
	_hasRemovedContent(start, end) {
		const atBoundary = this.byStart.get(start);
		if (atBoundary && start === end) {
			const previous = this.byEnd.get(start);
			return !!previous && previous.content === "" && atBoundary.content === "";
		}
		let chunk = this._chunkAt(start);
		while (chunk && chunk.start < end) {
			if (chunk.content === "" && (chunk.replacedFrom < start || this.byStart.get(chunk.replacedFrom).replacesUntil < chunk.end)) return true;
			chunk = this.byStart.get(chunk.end);
		}
		return false;
	}
	_replaceRegexp(searchValue, replacement) {
		function getReplacement(match, index, str) {
			if (typeof replacement === "string") return expandReplacement(replacement, match[0], index, str, match.slice(1), match.groups);
			else return match.groups === void 0 ? replacement(match[0], ...match.slice(1), index, str) : replacement(match[0], ...match.slice(1), index, str, match.groups);
		}
		const replaceMatch = (match) => {
			if (match.index == null) return false;
			if (this._hasRemovedContent(match.index, match.index + match[0].length)) return false;
			const replacement = getReplacement(match, match.index, this.original);
			if (replacement === match[0]) return true;
			if (match[0].length === 0) this.appendRight(match.index - this.offset, replacement);
			else this.overwrite(match.index - this.offset, match.index + match[0].length - this.offset, replacement);
			return true;
		};
		if (searchValue.global) {
			searchValue.lastIndex = 0;
			for (const match of this.original.matchAll(searchValue)) replaceMatch(match);
		} else {
			const match = this.original.match(searchValue);
			if (match && !replaceMatch(match)) {
				const global = new RegExp(searchValue.source, `${searchValue.flags}g`);
				for (const next of this.original.matchAll(global)) if (replaceMatch(next)) break;
			}
		}
		return this;
	}
	_replaceString(string, replacement) {
		const { original } = this;
		let index = original.indexOf(string);
		while (index !== -1) {
			if (this._hasRemovedContent(index, index + string.length)) {
				index = original.indexOf(string, index + string.length);
				continue;
			}
			if (typeof replacement === "function") replacement = replacement(string, index, original);
			else replacement = expandReplacement(replacement, string, index, original, [], void 0);
			if (string !== replacement) {
				if (string.length === 0) this.appendRight(index - this.offset, replacement);
				else this.overwrite(index - this.offset, index + string.length - this.offset, replacement);
			}
			break;
		}
		return this;
	}
	replace(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceString(searchValue, replacement);
		return this._replaceRegexp(searchValue, replacement);
	}
	_replaceAllString(string, replacement) {
		const { original } = this;
		const stringLength = string.length;
		if (stringLength === 0) {
			for (let index = 0; index <= original.length; index += 1) {
				if (this._hasRemovedContent(index, index)) continue;
				const _replacement = typeof replacement === "function" ? replacement("", index, original) : expandReplacement(replacement, "", index, original, [], void 0);
				if (_replacement !== "") this.appendRight(index - this.offset, _replacement);
			}
			return this;
		}
		for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
			if (this._hasRemovedContent(index, index + stringLength)) continue;
			const previous = original.slice(index, index + stringLength);
			const _replacement = typeof replacement === "function" ? replacement(previous, index, original) : expandReplacement(replacement, previous, index, original, [], void 0);
			if (previous !== _replacement) this.overwrite(index - this.offset, index + stringLength - this.offset, _replacement);
		}
		return this;
	}
	replaceAll(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceAllString(searchValue, replacement);
		if (!searchValue.global) throw new MagicStringError("replaceAll() requires a global RegExp");
		return this._replaceRegexp(searchValue, replacement);
	}
};
var EXTERNAL_KINDS = [
	"Func",
	"Table",
	"Memory",
	"Global",
	"Tag"
];
var VALTYPES = {
	127: "i32",
	126: "i64",
	125: "f32",
	124: "f64",
	123: "v128",
	112: "funcref",
	111: "externref"
};
var TYPED_REF_PREFIXES = /* @__PURE__ */ new Set([99, 100]);
var SECTION_TYPE = 1;
var SECTION_IMPORT = 2;
var SECTION_EXPORT = 7;
var SECTION_CUSTOM = 0;
var FUNCTYPE_FORM = 96;
var utf8Decoder = /* @__PURE__ */ new TextDecoder("utf-8", {
	fatal: true,
	ignoreBOM: true
});
var WasmReader = class {
	bytes;
	pos = 0;
	constructor(bytes, pos = 0) {
		this.bytes = bytes;
		this.pos = pos;
	}
	get eof() {
		return this.pos >= this.bytes.length;
	}
	u8() {
		if (this.pos >= this.bytes.length) throw new Error("unexpected end of binary");
		return this.bytes[this.pos++];
	}
	varuint() {
		let result = 0;
		let shift = 0;
		let byte;
		do {
			if (shift > 28) throw new Error("varuint32 is too large");
			byte = this.u8();
			result += (byte & 127) * 2 ** shift;
			shift += 7;
		} while (byte & 128);
		if (result > 4294967295) throw new Error("varuint32 is too large");
		return result;
	}
	name() {
		const length = this.varuint();
		const end = this.pos + length;
		if (end > this.bytes.length) throw new Error("unexpected end of binary");
		const value = utf8Decoder.decode(this.bytes.subarray(this.pos, end));
		this.pos = end;
		return value;
	}
	valtype() {
		const byte = this.u8();
		if (TYPED_REF_PREFIXES.has(byte)) throw new Error(`unsupported typed reference (0x${byte.toString(16)})`);
		return VALTYPES[byte] || `unknown(0x${byte.toString(16)})`;
	}
	valtypes() {
		const length = this.varuint();
		const types = [];
		for (let i = 0; i < length; i++) types.push(this.valtype());
		return types;
	}
	limits() {
		const flags = this.u8();
		this.varuint();
		if (flags & 1) this.varuint();
	}
	assertWithin(end) {
		if (this.pos > end) throw new Error("section contents overrun the section length");
	}
};
function readSections(reader) {
	const sections = [];
	while (!reader.eof) {
		const id = reader.u8();
		const size = reader.varuint();
		const start = reader.pos;
		const end = start + size;
		if (end > reader.bytes.length) throw new Error(`section ${id} exceeds the end of the binary`);
		const section = {
			id,
			start,
			end
		};
		if (id === SECTION_CUSTOM) try {
			const name = reader.name();
			if (reader.pos <= end) {
				section.name = name;
				section.start = reader.pos;
			}
		} catch {}
		sections.push(section);
		reader.pos = end;
	}
	return sections;
}
function readTypeSection(reader, end) {
	const types = [];
	try {
		const length = reader.varuint();
		for (let i = 0; i < length; i++) {
			if (reader.pos >= end || reader.u8() !== FUNCTYPE_FORM) break;
			const type = {
				params: reader.valtypes(),
				results: reader.valtypes()
			};
			reader.assertWithin(end);
			types.push(type);
		}
	} catch {}
	return types;
}
function readImportSection(reader, end, types) {
	const imports = [];
	const length = reader.varuint();
	for (let i = 0; i < length; i++) {
		const module = reader.name();
		const name = reader.name();
		const kind = reader.u8();
		const type = EXTERNAL_KINDS[kind];
		if (!type) throw new Error(`unsupported import kind: ${kind}`);
		const entry = {
			module,
			name,
			type
		};
		switch (kind) {
			case 0: {
				const type = types[reader.varuint()];
				entry.returnType = type?.results[0];
				entry.params = type?.params.map((type) => ({ type }));
				break;
			}
			case 1:
				reader.valtype();
				reader.limits();
				break;
			case 2:
				reader.limits();
				break;
			case 3:
				reader.valtype();
				reader.u8();
				break;
			case 4:
				reader.u8();
				reader.varuint();
				break;
			default: throw new Error(`unsupported import kind: ${kind}`);
		}
		reader.assertWithin(end);
		imports.push(entry);
	}
	return imports;
}
function readExportSection(reader, end) {
	const exports = [];
	const length = reader.varuint();
	for (let i = 0; i < length; i++) {
		const name = reader.name();
		const kind = reader.u8();
		const index = reader.varuint();
		const type = EXTERNAL_KINDS[kind];
		if (!type) throw new Error(`unsupported export kind: ${kind}`);
		reader.assertWithin(end);
		exports.push({
			name,
			id: index,
			index,
			type
		});
	}
	return exports;
}
function readFunctionNames(reader, end) {
	const names = /* @__PURE__ */ new Map();
	try {
		while (reader.pos < end) {
			const id = reader.u8();
			const size = reader.varuint();
			const subsectionEnd = reader.pos + size;
			if (subsectionEnd > end) throw new Error("name subsection overruns the name section");
			if (id === 1) {
				const length = reader.varuint();
				for (let i = 0; i < length; i++) {
					const index = reader.varuint();
					const name = reader.name();
					reader.assertWithin(subsectionEnd);
					names.set(index, name);
				}
			}
			reader.pos = subsectionEnd;
		}
	} catch {}
	return names;
}
function toBytes(source) {
	return source instanceof Uint8Array ? source : new Uint8Array(source);
}
function parseWasm(source, opts = {}) {
	try {
		return _parseWasm(toBytes(source));
	} catch (error) {
		throw new Error(`[unwasm] Failed to parse ${opts.name || "wasm module"}: ${error}`, { cause: error });
	}
}
function _parseWasm(bytes) {
	if (bytes.length < 8 || bytes[0] !== 0 || bytes[1] !== 97 || bytes[2] !== 115 || bytes[3] !== 109) throw new Error("invalid magic header (expected `\\0asm`)");
	if (bytes[4] !== 1 || bytes[5] !== 0 || bytes[6] !== 0 || bytes[7] !== 0) {
		const version = [...bytes.subarray(4, 8)].map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
		throw new Error(`unsupported binary version (0x${version})`);
	}
	const sections = readSections(new WasmReader(bytes, 8));
	const at = (section) => new WasmReader(bytes, section.start);
	const find = (id, name) => sections.find((s) => s.id === id && (name === void 0 || s.name === name));
	const typeSection = find(SECTION_TYPE);
	const types = typeSection ? readTypeSection(at(typeSection), typeSection.end) : [];
	const importSection = find(SECTION_IMPORT);
	const imports = importSection ? readImportSection(at(importSection), importSection.end, types) : [];
	const exportSection = find(SECTION_EXPORT);
	const exports = exportSection ? readExportSection(at(exportSection), exportSection.end) : [];
	const nameSection = find(SECTION_CUSTOM, "name");
	if (nameSection && exports.length > 0) {
		const functionNames = readFunctionNames(at(nameSection), nameSection.end);
		for (const entry of exports) if (entry.type === "Func") entry.id = functionNames.get(entry.index) ?? entry.id;
	}
	return { modules: [{
		imports,
		exports: exports.map(({ name, id, type }) => ({
			name,
			id,
			type
		}))
	}] };
}
var UNWASM_EXTERNAL_PREFIX = "\0unwasm:external:";
var UNWASM_EXTERNAL_RE = /(\0|\\0)unwasm:external:([^"']+)/gu;
var UMWASM_HELPERS_ID = "\0unwasm:helpers";
function sha1(source) {
	return createHash("sha1").update(source).digest("hex").slice(0, 16);
}
function escapeRegExp(string) {
	return string.replace(/[-\\^$*+?.()|[\]{}]/g, String.raw`\$&`);
}
function getWasmImports(asset, _opts) {
	const importNames = Object.keys(asset.imports || {});
	if (importNames.length === 0) return {
		code: "const _imports = { /* no imports */ }",
		resolved: true
	};
	const pkg = readNearestPackageJSON(asset.id);
	const resolved = true;
	const imports = [];
	const importsObject = {};
	for (const moduleName of importNames) {
		const importNames = asset.imports[moduleName];
		const importAlias = pkg.imports?.[moduleName] || pkg.imports?.[`#${moduleName}`];
		const resolved = importAlias && typeof importAlias === "string" ? importAlias : resolveModulePath(moduleName, { from: asset.id });
		const importName = "_imports_" + safeVariableName(moduleName);
		imports.push(`import * as ${importName} from ${JSON.stringify(resolved)};`);
		importsObject[moduleName] = Object.fromEntries(importNames.map((name) => [name, `${importName}[${JSON.stringify(name)}]`]));
	}
	return {
		code: `${imports.join("\n")}\n\nconst _imports = ${genObject(importsObject)}`,
		resolved
	};
}
function safeVariableName(name) {
	return name.replace(/^\d/, (r) => `_${r}`).replace(/\W/g, (r) => "_" + r.codePointAt(0));
}
function genObject(object, indent = "") {
	const entries = Object.entries(object);
	if (entries.length === 0) return "{}";
	const childIndent = indent + "  ";
	return `{\n${entries.map(([key, value]) => `${childIndent}${JSON.stringify(key)}: ${typeof value === "string" ? value : genObject(value, childIndent)}`).join(",\n")}\n${indent}}`;
}
function readNearestPackageJSON(from) {
	let dir = dirname(from);
	let lastDir = "";
	while (dir !== lastDir) {
		let contents;
		try {
			contents = readFileSync(join(dir, "package.json"), "utf8");
		} catch {}
		if (contents !== void 0) return JSON.parse(contents);
		lastDir = dir;
		dir = dirname(dir);
	}
	return {};
}
function getWasmESMBinding(asset, opts) {
	const autoImports = getWasmImports(asset, opts);
	const instantiateCode = opts.esmImport ? getESMImportInstantiate(asset, autoImports.code) : getBase64Instantiate(asset, autoImports.code);
	return opts.lazy !== true && autoImports.resolved ? getExports(asset, instantiateCode) : getLazyExports(asset, instantiateCode);
}
function getWasmModuleBinding(asset, opts) {
	return opts.esmImport ? `
const _mod = ${opts.lazy === true ? "" : `await`} import("${UNWASM_EXTERNAL_PREFIX}${asset.name}").then(r => r.default || r);
export default _mod;
  ` : `
import { base64ToUint8Array } from "${UMWASM_HELPERS_ID}";
const _data = base64ToUint8Array("${asset.source.toString("base64")}");
const _mod = new WebAssembly.Module(_data);
export default _mod;
  `;
}
function getESMImportInstantiate(asset, importsCode) {
	return `
${importsCode}

async function _instantiate(imports = _imports) {
const _mod = await import("${UNWASM_EXTERNAL_PREFIX}${asset.name}").then(r => r.default || r);
return WebAssembly.instantiate(_mod, imports)
}
  `;
}
function getBase64Instantiate(asset, importsCode) {
	return `
import { base64ToUint8Array } from "${UMWASM_HELPERS_ID}";

${importsCode}

function _instantiate(imports = _imports) {
  const _data = base64ToUint8Array("${asset.source.toString("base64")}")
  return WebAssembly.instantiate(_data, imports)  }
  `;
}
function getExports(asset, instantiateCode) {
	return `
import { getExports } from "${UMWASM_HELPERS_ID}";

${instantiateCode}

const $exports = getExports(await _instantiate());

${asset.exports.map((name) => `export const ${name} = $exports.${name};`).join("\n")}

const defaultExport = () => $exports;
${asset.exports.map((name) => `defaultExport["${name}"] = $exports.${name};`).join("\n")}
export default defaultExport;
      `;
}
function getLazyExports(asset, instantiateCode) {
	return `
import { createLazyWasmModule } from "${UMWASM_HELPERS_ID}";

${instantiateCode}

const _mod = createLazyWasmModule(_instantiate);

${asset.exports.map((name) => `export const ${name} = _mod.${name};`).join("\n")}

export default _mod;
      `;
}
function getPluginUtils() {
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
var WASM_ID_RE = /\.wasm(?:\?.*)?$/i;
function unwasm(opts) {
	const assets = Object.create(null);
	const _parseCache = Object.create(null);
	function parse(name, source) {
		if (_parseCache[name]) return _parseCache[name];
		const imports = Object.create(null);
		const exports = [];
		const parsed = parseWasm(source, { name });
		for (const mod of parsed.modules) {
			exports.push(...mod.exports.map((e) => e.name));
			for (const imp of mod.imports) {
				if (!imports[imp.module]) imports[imp.module] = [];
				imports[imp.module].push(imp.name);
			}
		}
		_parseCache[name] = {
			imports,
			exports
		};
		return _parseCache[name];
	}
	return {
		name: "unwasm",
		resolveId: {
			order: "pre",
			filter: { id: [
				new RegExp("^" + escapeRegExp(UMWASM_HELPERS_ID) + "$"),
				/* @__PURE__ */ new RegExp("^\0unwasm:external:"),
				WASM_ID_RE
			] },
			handler(id, importer) {
				if (id === "\0unwasm:helpers") return id;
				if (id.startsWith("\0unwasm:external:")) return {
					id,
					external: true
				};
				if (WASM_ID_RE.test(id)) {
					const onResolved = (resolved) => {
						if (!resolved?.id) return resolved;
						let resolvedId = resolved.id;
						if (resolvedId.startsWith("file://")) resolvedId = fileURLToPath(resolvedId);
						return {
							...resolved,
							id: resolvedId,
							external: false,
							moduleSideEffects: false,
							resolvedBy: "unwasm",
							meta: {
								...resolved.meta,
								unwasm: { resolved }
							}
						};
					};
					const resolved = this.resolve(id, importer);
					return resolved instanceof Promise ? resolved.then(onResolved) : onResolved(resolved);
				}
			}
		},
		generateBundle() {
			if (opts.esmImport) for (const asset of Object.values(assets)) this.emitFile({
				type: "asset",
				source: asset.source,
				fileName: asset.name
			});
		},
		load: {
			order: "pre",
			filter: { id: [new RegExp("^" + escapeRegExp(UMWASM_HELPERS_ID) + "$"), WASM_ID_RE] },
			handler(id) {
				if (id === "\0unwasm:helpers") return getPluginUtils();
				if (!WASM_ID_RE.test(id)) return;
				const idPath = id.split("?")[0];
				if (!existsSync(idPath)) return;
				this.addWatchFile(idPath);
				return readFileSync(idPath).toString("binary");
			}
		},
		transform: {
			order: "pre",
			filter: { id: WASM_ID_RE },
			handler(code, id) {
				const buff = Buffer.from(code, "binary");
				let isModule = id.endsWith("?module");
				const name = `wasm/${basename(id.split("?")[0], ".wasm")}-${sha1(buff)}.wasm`;
				let parsed = {
					imports: {},
					exports: ["default"]
				};
				if (!isModule) try {
					parsed = parse(name, buff);
				} catch (error) {
					if (!opts.silent) this.warn({
						id,
						cause: error,
						message: "Failed to parse the WebAssembly module; falling back to module mode."
					});
					isModule = true;
				}
				const asset = assets[name] = {
					name,
					id,
					source: buff,
					imports: parsed.imports,
					exports: parsed.exports
				};
				let _code;
				if (isModule) _code = getWasmModuleBinding(asset, opts);
				else try {
					_code = getWasmESMBinding(asset, opts);
				} catch (error) {
					if (!opts.silent) this.warn({
						id,
						cause: error,
						message: "Failed to load the WebAssembly module; falling back to module mode: " + error.message
					});
					_code = getWasmModuleBinding(asset, opts);
				}
				return {
					code: _code,
					map: { mappings: "" }
				};
			}
		},
		renderChunk(code, chunk) {
			if (!opts.esmImport) return;
			if (!(chunk.moduleIds.some((id) => WASM_ID_RE.test(id)) || chunk.imports.some((id) => WASM_ID_RE.test(id)))) return;
			const s = new MagicString$1(code);
			const resolveImport = (id) => {
				if (typeof id !== "string") return;
				const asset = assets[id];
				if (!asset) return;
				const nestedLevel = chunk.fileName.split("/").filter(Boolean).length - 1;
				return {
					relativeId: (nestedLevel ? "../".repeat(nestedLevel) : "./") + asset.name,
					asset
				};
			};
			for (const match of code.matchAll(UNWASM_EXTERNAL_RE)) {
				const resolved = resolveImport(match[2]);
				const index = match.index;
				const len = match[0].length;
				if (!resolved || !index) {
					console.warn(`Failed to resolve WASM import: ${JSON.stringify(match[1])}`);
					continue;
				}
				s.overwrite(index, index + len, resolved.relativeId);
			}
			if (s.hasChanged()) return {
				code: s.toString(),
				map: s.generateMap({ includeContent: true })
			};
		}
	};
}
function chain(value, fn) {
	return isPromiseLike(value) ? Promise.resolve(value).then(fn) : fn(value);
}
function isPromiseLike(value) {
	return typeof value?.then === "function";
}
var PREFIX = "\0nitro:route-meta:";
async function routeMeta(nitro) {
	let oxc = await importOXC({
		dir: nitro.options.rootDir,
		paths: viteDepPaths(nitro)
	});
	return {
		name: "nitro:route-meta",
		perEnvironmentStartEndDuringDev: true,
		async buildStart() {
			oxc = await importOXC({
				dir: nitro.options.rootDir,
				paths: viteDepPaths(nitro)
			});
		},
		resolveId: {
			order: "pre",
			filter: { id: /^(?!\u0000)(.+)\?meta$/ },
			handler(id, importer, resolveOpts) {
				if (id.endsWith("?meta")) return chain(this.resolve(id.replace("?meta", ""), importer, resolveOpts), (resolved) => resolved ? PREFIX + resolved.id : void 0);
			}
		},
		load: {
			order: "pre",
			filter: { id: new RegExp(`^${escapeRegExp$1(PREFIX)}`) },
			handler(id) {
				if (id.startsWith(PREFIX)) {
					const fullPath = id.slice(18);
					if (isAbsolute$2(fullPath)) return readFileSync(fullPath, "utf8");
					else return "export default undefined;";
				}
			}
		},
		transform: {
			order: "pre",
			filter: { id: new RegExp(`^${escapeRegExp$1(PREFIX)}`) },
			handler(code, id) {
				const { parseSync, transformSync } = oxc;
				let meta = null;
				try {
					const transformRes = transformSync(id, code, { tsconfig: false });
					if (transformRes.errors?.length > 0) {
						for (const error of transformRes.errors) this.warn(error);
						return {
							code: `export default {};`,
							map: null,
							moduleType: "js"
						};
					}
					const { program } = parseSync(id, transformRes.code, { lang: "js" });
					for (const node of program.body) if (node.type === "ExpressionStatement" && node.expression.type === "CallExpression" && node.expression.callee.type === "Identifier" && node.expression.callee.name === "defineRouteMeta" && node.expression.arguments.length === 1) {
						meta = astToObject(node.expression.arguments[0]);
						break;
					}
				} catch (error) {
					nitro.logger.warn(`[handlers-meta] Cannot extra route meta for: ${id}: ${error}`);
				}
				return {
					code: `export default ${JSON.stringify(meta)};`,
					map: null,
					moduleType: "js"
				};
			}
		}
	};
}
function astToObject(node) {
	switch (node.type) {
		case "ObjectExpression": {
			const obj = {};
			for (const prop of node.properties) if (prop.type === "Property") {
				const key = prop.key.name ?? prop.key.value;
				obj[key] = astToObject(prop.value);
			}
			return obj;
		}
		case "ArrayExpression": return node.elements.map((el) => astToObject(el)).filter((obj) => obj !== void 0);
		case "Literal": return node.value;
	}
}
function serverMain(nitro) {
	return {
		name: "nitro:server-main",
		renderChunk(code, chunk) {
			if (chunk.isEntry) return {
				code: `globalThis.__nitro_main__ = import.meta.url; ${code}`,
				map: null
			};
		}
	};
}
function virtual(input) {
	const modules = /* @__PURE__ */ new Map();
	for (const mod of input) {
		const render = () => typeof mod.template === "function" ? mod.template() : mod.template;
		modules.set(mod.id, {
			module: mod,
			render
		});
	}
	const include = [/^#nitro\/virtual/];
	const extraIds = [...modules.keys()].filter((key) => !key.startsWith("#nitro/virtual"));
	if (extraIds.length > 0) include.push(new RegExp(`^(${extraIds.map((id) => pathRegExp(id)).join("|")})$`));
	return {
		name: "nitro:virtual",
		api: { modules },
		resolveId: {
			order: "pre",
			filter: { id: include },
			handler: (id) => {
				const mod = modules.get(id);
				if (mod) return {
					id,
					moduleSideEffects: mod.module.moduleSideEffects ?? false
				};
			}
		},
		load: {
			order: "pre",
			filter: { id: include },
			async handler(id) {
				const mod = modules.get(id);
				if (!mod) return null;
				for (const file of mod.module.watchFiles?.() || []) this.addWatchFile(file);
				return {
					code: await mod.render(),
					map: null
				};
			}
		}
	};
}
function virtualDeps() {
	const cache = /* @__PURE__ */ new Map();
	return {
		name: "nitro:virtual-deps",
		resolveId: {
			order: "pre",
			filter: { id: new RegExp(`^(#nitro|${runtimeDependencies.map((dep) => pathRegExp(dep)).join("|")})`) },
			handler(id, importer) {
				if (!importer || !importer.startsWith("#nitro/virtual")) return;
				let resolved = cache.get(id);
				if (!resolved) resolved = this.resolve(id, runtimeDir).then((_resolved) => {
					cache.set(id, _resolved);
					return _resolved;
				}).catch((error) => {
					cache.delete(id);
					throw error;
				});
				return resolved;
			}
		}
	};
}
var HELPER_ID = "virtual:nitro-raw-helpers";
var TYPES$1 = [
	"raw",
	"bytes",
	"text"
];
var PREFIX_RE = new RegExp(`^(${TYPES$1.join("|")}):`);
var RESOLVED_PREFIX = "\0virtual:nitro:";
var RESOLVED_RE = new RegExp(`^${RESOLVED_PREFIX}(${TYPES$1.join("|")}):`);
var RESOLVED_SUFFIX = ".js";
function raw() {
	return {
		name: "nitro:raw",
		resolveId: {
			order: "pre",
			filter: { id: [new RegExp(`^${HELPER_ID}$`), ...TYPES$1.map((type) => new RegExp(`^${type}:`))] },
			handler(id, importer, resolveOpts) {
				if (id === HELPER_ID) return id;
				const type = PREFIX_RE.exec(id)?.[1];
				if (!type) return;
				const specifier = id.slice(type.length + 1);
				return chain(this.resolve(specifier, importer, resolveOpts), (resolved) => {
					if (!resolved?.id || resolved.external || resolved.id.includes("?")) return this.error(`Could not resolve \`${specifier}\`${importer ? ` (imported by \`${importer}\`)` : ""} to contents to inline as \`${type}\`.`);
					return { id: `${RESOLVED_PREFIX}${type}:${resolved.id}${RESOLVED_SUFFIX}` };
				});
			}
		},
		load: {
			order: "pre",
			filter: { id: [new RegExp(`^${HELPER_ID}$`), RESOLVED_RE] },
			handler(id) {
				if (id === HELPER_ID) return getHelpers();
				const parsed = parseRawId(id);
				if (!parsed) return;
				const { path, binary } = parsed;
				if (!isAbsolute$2(path)) return this.load({ id: path }).then(({ code }) => {
					if (code == null) return this.error(`Could not load \`${path}\` to inline its contents.`);
					return binary ? Buffer.from(code, "utf8").toString("binary") : code;
				});
				this.addWatchFile(path);
				return readFileSync(path, binary ? "binary" : "utf8");
			}
		},
		transform: {
			order: "pre",
			filter: { id: RESOLVED_RE },
			handler(code, id) {
				const parsed = parseRawId(id);
				if (!parsed) return;
				const { path, binary } = parsed;
				if (binary) return {
					code: `import {base64ToUint8Array } from "${HELPER_ID}" \n export default base64ToUint8Array("${Buffer.from(code, "binary").toString("base64")}")`,
					map: rawAssetMap(path),
					moduleType: "js"
				};
				return {
					code: `export default ${JSON.stringify(code)}`,
					map: rawAssetMap(path),
					moduleType: "js"
				};
			}
		}
	};
}
function parseRawId(id) {
	const match = RESOLVED_RE.exec(id);
	if (!match) return;
	const [, type] = match;
	const path = id.replace(RESOLVED_RE, "").slice(0, -3);
	return {
		path,
		binary: type === "bytes" || type === "raw" && isAbsolute$2(path) && isBinary(path)
	};
}
function isBinary(id) {
	const idMime = src_default.getType(id) || "";
	if (idMime.startsWith("text/")) return false;
	if (/application\/(json|sql|xml|yaml)/.test(idMime)) return false;
	return true;
}
function getHelpers() {
	return `
export function base64ToUint8Array(str) {
  const data = atob(str);
  const size = data.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = data.charCodeAt(i);
  }
  return bytes;
}
  `;
}
function rawAssetMap(id) {
	return {
		version: 3,
		file: id,
		sources: [id],
		sourcesContent: [],
		names: [],
		mappings: ""
	};
}
var BitSet = class BitSet {
	constructor(arg) {
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}
	add(n) {
		this.bits[n >> 5] |= 1 << (n & 31);
	}
	has(n) {
		return !!(this.bits[n >> 5] & 1 << (n & 31));
	}
};
var Chunk = class Chunk {
	constructor(start, end, content) {
		this.start = start;
		this.end = end;
		this.original = content;
		this.intro = "";
		this.outro = "";
		this.content = content;
		this.storeName = false;
		this.edited = false;
		this.previous = null;
		this.next = null;
	}
	appendLeft(content) {
		this.outro += content;
	}
	appendRight(content) {
		this.intro = this.intro + content;
	}
	clone() {
		const chunk = new Chunk(this.start, this.end, this.original);
		chunk.intro = this.intro;
		chunk.outro = this.outro;
		chunk.content = this.content;
		chunk.storeName = this.storeName;
		chunk.edited = this.edited;
		return chunk;
	}
	contains(index) {
		return this.start < index && index < this.end;
	}
	eachNext(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.next;
		}
	}
	eachPrevious(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.previous;
		}
	}
	edit(content, storeName, contentOnly) {
		this.content = content;
		if (!contentOnly) {
			this.intro = "";
			this.outro = "";
		}
		this.storeName = storeName;
		this.edited = true;
		return this;
	}
	prependLeft(content) {
		this.outro = content + this.outro;
	}
	prependRight(content) {
		this.intro = content + this.intro;
	}
	reset() {
		this.intro = "";
		this.outro = "";
		if (this.edited) {
			this.content = this.original;
			this.storeName = false;
			this.edited = false;
		}
	}
	split(index) {
		const sliceIndex = index - this.start;
		const originalBefore = this.original.slice(0, sliceIndex);
		const originalAfter = this.original.slice(sliceIndex);
		this.original = originalBefore;
		const newChunk = new Chunk(index, this.end, originalAfter);
		newChunk.outro = this.outro;
		this.outro = "";
		this.end = index;
		if (this.edited) {
			newChunk.edit("", false);
			this.content = "";
		} else this.content = originalBefore;
		newChunk.next = this.next;
		if (newChunk.next) newChunk.next.previous = newChunk;
		newChunk.previous = this;
		this.next = newChunk;
		return newChunk;
	}
	toString() {
		return this.intro + this.content + this.outro;
	}
	trimEnd(rx) {
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				this.split(this.start + trimmed.length).edit("", void 0, true);
				if (this.edited) this.edit(trimmed, this.storeName, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.intro = this.intro.replace(rx, "");
			if (this.intro.length) return true;
		}
	}
	trimStart(rx) {
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		const trimmed = this.content.replace(rx, "");
		if (trimmed.length) {
			if (trimmed !== this.content) {
				const newChunk = this.split(this.end - trimmed.length);
				if (this.edited) newChunk.edit(trimmed, this.storeName, true);
				this.edit("", void 0, true);
			}
			return true;
		} else {
			this.edit("", void 0, true);
			this.outro = this.outro.replace(rx, "");
			if (this.outro.length) return true;
		}
	}
};
function getBtoa() {
	if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
	else if (typeof Buffer === "function") return (str) => Buffer.from(str, "utf-8").toString("base64");
	else return () => {
		throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
	};
}
var btoa = /*#__PURE__*/ getBtoa();
var SourceMap = class {
	constructor(properties) {
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = encode(properties.mappings);
		if (typeof properties.x_google_ignoreList !== "undefined") this.x_google_ignoreList = properties.x_google_ignoreList;
		if (typeof properties.debugId !== "undefined") this.debugId = properties.debugId;
	}
	toString() {
		return JSON.stringify(this);
	}
	toUrl() {
		return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
	}
};
function guessIndent(code) {
	const lines = code.split("\n");
	const tabbed = lines.filter((line) => /^\t+/.test(line));
	const spaced = lines.filter((line) => /^ {2,}/.test(line));
	if (tabbed.length === 0 && spaced.length === 0) return null;
	if (tabbed.length >= spaced.length) return "	";
	const min = spaced.reduce((previous, current) => {
		const numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);
	return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
	const fromParts = from.split(/[/\\]/);
	const toParts = to.split(/[/\\]/);
	fromParts.pop();
	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}
	if (fromParts.length) {
		let i = fromParts.length;
		while (i--) fromParts[i] = "..";
	}
	return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject(thing) {
	return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
	const originalLines = source.split("\n");
	const lineOffsets = [];
	for (let i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}
	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = i + j >> 1;
			if (index < lineOffsets[m]) j = m;
			else i = m + 1;
		}
		const line = i - 1;
		return {
			line,
			column: index - lineOffsets[line]
		};
	};
}
var wordRegex = /\w/;
var Mappings = class {
	constructor(hires) {
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.pending = null;
	}
	addEdit(sourceIndex, content, loc, nameIndex) {
		if (content.length) {
			const contentLengthMinusOne = content.length - 1;
			let contentLineEnd = content.indexOf("\n", 0);
			let previousContentLineEnd = -1;
			while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
				const segment = [
					this.generatedCodeColumn,
					sourceIndex,
					loc.line,
					loc.column
				];
				if (nameIndex >= 0) segment.push(nameIndex);
				this.rawSegments.push(segment);
				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;
				previousContentLineEnd = contentLineEnd;
				contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
			}
			const segment = [
				this.generatedCodeColumn,
				sourceIndex,
				loc.line,
				loc.column
			];
			if (nameIndex >= 0) segment.push(nameIndex);
			this.rawSegments.push(segment);
			this.advance(content.slice(previousContentLineEnd + 1));
		} else if (this.pending) {
			this.rawSegments.push(this.pending);
			this.advance(content);
		}
		this.pending = null;
	}
	addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
		let originalCharIndex = chunk.start;
		let first = true;
		let charInHiresBoundary = false;
		while (originalCharIndex < chunk.end) {
			if (original[originalCharIndex] === "\n") {
				loc.line += 1;
				loc.column = 0;
				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;
				first = true;
				charInHiresBoundary = false;
			} else {
				if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
					const segment = [
						this.generatedCodeColumn,
						sourceIndex,
						loc.line,
						loc.column
					];
					if (this.hires === "boundary") {
						if (wordRegex.test(original[originalCharIndex])) {
							if (!charInHiresBoundary) {
								this.rawSegments.push(segment);
								charInHiresBoundary = true;
							}
						} else {
							this.rawSegments.push(segment);
							charInHiresBoundary = false;
						}
					} else this.rawSegments.push(segment);
				}
				loc.column += 1;
				this.generatedCodeColumn += 1;
				first = false;
			}
			originalCharIndex += 1;
		}
		this.pending = null;
	}
	advance(str) {
		if (!str) return;
		const lines = str.split("\n");
		if (lines.length > 1) {
			for (let i = 0; i < lines.length - 1; i++) {
				this.generatedCodeLine++;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
			}
			this.generatedCodeColumn = 0;
		}
		this.generatedCodeColumn += lines[lines.length - 1].length;
	}
};
var n$1 = "\n";
var warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};
var MagicString = class MagicString {
	constructor(string, options = {}) {
		const chunk = new Chunk(0, string.length, string);
		Object.defineProperties(this, {
			original: {
				writable: true,
				value: string
			},
			outro: {
				writable: true,
				value: ""
			},
			intro: {
				writable: true,
				value: ""
			},
			firstChunk: {
				writable: true,
				value: chunk
			},
			lastChunk: {
				writable: true,
				value: chunk
			},
			lastSearchedChunk: {
				writable: true,
				value: chunk
			},
			byStart: {
				writable: true,
				value: {}
			},
			byEnd: {
				writable: true,
				value: {}
			},
			filename: {
				writable: true,
				value: options.filename
			},
			indentExclusionRanges: {
				writable: true,
				value: options.indentExclusionRanges
			},
			sourcemapLocations: {
				writable: true,
				value: new BitSet()
			},
			storedNames: {
				writable: true,
				value: {}
			},
			indentStr: {
				writable: true,
				value: void 0
			},
			ignoreList: {
				writable: true,
				value: options.ignoreList
			},
			offset: {
				writable: true,
				value: options.offset || 0
			}
		});
		this.byStart[0] = chunk;
		this.byEnd[string.length] = chunk;
	}
	addSourcemapLocation(char) {
		this.sourcemapLocations.add(char);
	}
	append(content) {
		if (typeof content !== "string") throw new TypeError("outro content must be a string");
		this.outro += content;
		return this;
	}
	appendLeft(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byEnd[index];
		if (chunk) chunk.appendLeft(content);
		else this.intro += content;
		return this;
	}
	appendRight(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byStart[index];
		if (chunk) chunk.appendRight(content);
		else this.outro += content;
		return this;
	}
	clone() {
		const cloned = new MagicString(this.original, {
			filename: this.filename,
			offset: this.offset
		});
		let originalChunk = this.firstChunk;
		let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
		while (originalChunk) {
			cloned.byStart[clonedChunk.start] = clonedChunk;
			cloned.byEnd[clonedChunk.end] = clonedChunk;
			const nextOriginalChunk = originalChunk.next;
			const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
			if (nextClonedChunk) {
				clonedChunk.next = nextClonedChunk;
				nextClonedChunk.previous = clonedChunk;
				clonedChunk = nextClonedChunk;
			}
			originalChunk = nextOriginalChunk;
		}
		cloned.lastChunk = clonedChunk;
		if (this.indentExclusionRanges) cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
		cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
		cloned.intro = this.intro;
		cloned.outro = this.outro;
		return cloned;
	}
	generateDecodedMap(options) {
		options = options || {};
		const sourceIndex = 0;
		const names = Object.keys(this.storedNames);
		const mappings = new Mappings(options.hires);
		const locate = getLocator(this.original);
		if (this.intro) mappings.advance(this.intro);
		this.firstChunk.eachNext((chunk) => {
			const loc = locate(chunk.start);
			if (chunk.intro.length) mappings.advance(chunk.intro);
			if (chunk.edited) mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
			else mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
			if (chunk.outro.length) mappings.advance(chunk.outro);
		});
		if (this.outro) mappings.advance(this.outro);
		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
			sources: [options.source ? getRelativePath(options.file || "", options.source) : options.file || ""],
			sourcesContent: options.includeContent ? [this.original] : void 0,
			names,
			mappings: mappings.raw,
			x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
		};
	}
	generateMap(options) {
		return new SourceMap(this.generateDecodedMap(options));
	}
	_ensureindentStr() {
		if (this.indentStr === void 0) this.indentStr = guessIndent(this.original);
	}
	_getRawIndentString() {
		this._ensureindentStr();
		return this.indentStr;
	}
	getIndentString() {
		this._ensureindentStr();
		return this.indentStr === null ? "	" : this.indentStr;
	}
	indent(indentStr, options) {
		const pattern = /^[^\r\n]/gm;
		if (isObject(indentStr)) {
			options = indentStr;
			indentStr = void 0;
		}
		if (indentStr === void 0) {
			this._ensureindentStr();
			indentStr = this.indentStr || "	";
		}
		if (indentStr === "") return this;
		options = options || {};
		const isExcluded = {};
		if (options.exclude) (typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude).forEach((exclusion) => {
			for (let i = exclusion[0]; i < exclusion[1]; i += 1) isExcluded[i] = true;
		});
		let shouldIndentNextCharacter = options.indentStart !== false;
		const replacer = (match) => {
			if (shouldIndentNextCharacter) return `${indentStr}${match}`;
			shouldIndentNextCharacter = true;
			return match;
		};
		this.intro = this.intro.replace(pattern, replacer);
		let charIndex = 0;
		let chunk = this.firstChunk;
		while (chunk) {
			const end = chunk.end;
			if (chunk.edited) {
				if (!isExcluded[charIndex]) {
					chunk.content = chunk.content.replace(pattern, replacer);
					if (chunk.content.length) shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
				}
			} else {
				charIndex = chunk.start;
				while (charIndex < end) {
					if (!isExcluded[charIndex]) {
						const char = this.original[charIndex];
						if (char === "\n") shouldIndentNextCharacter = true;
						else if (char !== "\r" && shouldIndentNextCharacter) {
							shouldIndentNextCharacter = false;
							if (charIndex === chunk.start) chunk.prependRight(indentStr);
							else {
								this._splitChunk(chunk, charIndex);
								chunk = chunk.next;
								chunk.prependRight(indentStr);
							}
						}
					}
					charIndex += 1;
				}
			}
			charIndex = chunk.end;
			chunk = chunk.next;
		}
		this.outro = this.outro.replace(pattern, replacer);
		return this;
	}
	insert() {
		throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)");
	}
	insertLeft(index, content) {
		if (!warned.insertLeft) {
			console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
			warned.insertLeft = true;
		}
		return this.appendLeft(index, content);
	}
	insertRight(index, content) {
		if (!warned.insertRight) {
			console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
			warned.insertRight = true;
		}
		return this.prependRight(index, content);
	}
	move(start, end, index) {
		start = start + this.offset;
		end = end + this.offset;
		index = index + this.offset;
		if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
		this._split(start);
		this._split(end);
		this._split(index);
		const first = this.byStart[start];
		const last = this.byEnd[end];
		const oldLeft = first.previous;
		const oldRight = last.next;
		const newRight = this.byStart[index];
		if (!newRight && last === this.lastChunk) return this;
		const newLeft = newRight ? newRight.previous : this.lastChunk;
		if (oldLeft) oldLeft.next = oldRight;
		if (oldRight) oldRight.previous = oldLeft;
		if (newLeft) newLeft.next = first;
		if (newRight) newRight.previous = last;
		if (!first.previous) this.firstChunk = last.next;
		if (!last.next) {
			this.lastChunk = first.previous;
			this.lastChunk.next = null;
		}
		first.previous = newLeft;
		last.next = newRight || null;
		if (!newLeft) this.firstChunk = first;
		if (!newRight) this.lastChunk = last;
		return this;
	}
	overwrite(start, end, content, options) {
		options = options || {};
		return this.update(start, end, content, {
			...options,
			overwrite: !options.contentOnly
		});
	}
	update(start, end, content, options) {
		start = start + this.offset;
		end = end + this.offset;
		if (typeof content !== "string") throw new TypeError("replacement content must be a string");
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (end > this.original.length) throw new Error("end is out of bounds");
		if (start === end) throw new Error("Cannot overwrite a zero-length range – use appendLeft or prependRight instead");
		this._split(start);
		this._split(end);
		if (options === true) {
			if (!warned.storeName) {
				console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
				warned.storeName = true;
			}
			options = { storeName: true };
		}
		const storeName = options !== void 0 ? options.storeName : false;
		const overwrite = options !== void 0 ? options.overwrite : false;
		if (storeName) {
			const original = this.original.slice(start, end);
			Object.defineProperty(this.storedNames, original, {
				writable: true,
				value: true,
				enumerable: true
			});
		}
		const first = this.byStart[start];
		const last = this.byEnd[end];
		if (first) {
			let chunk = first;
			while (chunk !== last) {
				if (chunk.next !== this.byStart[chunk.end]) throw new Error("Cannot overwrite across a split point");
				chunk = chunk.next;
				chunk.edit("", false);
			}
			first.edit(content, storeName, !overwrite);
		} else {
			const newChunk = new Chunk(start, end, "").edit(content, storeName);
			last.next = newChunk;
			newChunk.previous = last;
		}
		return this;
	}
	prepend(content) {
		if (typeof content !== "string") throw new TypeError("outro content must be a string");
		this.intro = content + this.intro;
		return this;
	}
	prependLeft(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byEnd[index];
		if (chunk) chunk.prependLeft(content);
		else this.intro = content + this.intro;
		return this;
	}
	prependRight(index, content) {
		index = index + this.offset;
		if (typeof content !== "string") throw new TypeError("inserted content must be a string");
		this._split(index);
		const chunk = this.byStart[index];
		if (chunk) chunk.prependRight(content);
		else this.outro = content + this.outro;
		return this;
	}
	remove(start, end) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
		if (start > end) throw new Error("end must be greater than start");
		this._split(start);
		this._split(end);
		let chunk = this.byStart[start];
		while (chunk) {
			chunk.intro = "";
			chunk.outro = "";
			chunk.edit("");
			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}
	reset(start, end) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		if (start === end) return this;
		if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
		if (start > end) throw new Error("end must be greater than start");
		this._split(start);
		this._split(end);
		let chunk = this.byStart[start];
		while (chunk) {
			chunk.reset();
			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}
	lastChar() {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
			if (chunk.content.length) return chunk.content[chunk.content.length - 1];
			if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
		} while (chunk = chunk.previous);
		if (this.intro.length) return this.intro[this.intro.length - 1];
		return "";
	}
	lastLine() {
		let lineIndex = this.outro.lastIndexOf(n$1);
		if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
		let lineStr = this.outro;
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length > 0) {
				lineIndex = chunk.outro.lastIndexOf(n$1);
				if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.outro + lineStr;
			}
			if (chunk.content.length > 0) {
				lineIndex = chunk.content.lastIndexOf(n$1);
				if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.content + lineStr;
			}
			if (chunk.intro.length > 0) {
				lineIndex = chunk.intro.lastIndexOf(n$1);
				if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.intro + lineStr;
			}
		} while (chunk = chunk.previous);
		lineIndex = this.intro.lastIndexOf(n$1);
		if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
		return this.intro + lineStr;
	}
	slice(start = 0, end = this.original.length - this.offset) {
		start = start + this.offset;
		end = end + this.offset;
		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}
		let result = "";
		let chunk = this.firstChunk;
		while (chunk && (chunk.start > start || chunk.end <= start)) {
			if (chunk.start < end && chunk.end >= end) return result;
			chunk = chunk.next;
		}
		if (chunk && chunk.edited && chunk.start !== start) throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
		const startChunk = chunk;
		while (chunk) {
			if (chunk.intro && (startChunk !== chunk || chunk.start === start)) result += chunk.intro;
			const containsEnd = chunk.start < end && chunk.end >= end;
			if (containsEnd && chunk.edited && chunk.end !== end) throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
			const sliceStart = startChunk === chunk ? start - chunk.start : 0;
			const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
			result += chunk.content.slice(sliceStart, sliceEnd);
			if (chunk.outro && (!containsEnd || chunk.end === end)) result += chunk.outro;
			if (containsEnd) break;
			chunk = chunk.next;
		}
		return result;
	}
	snip(start, end) {
		const clone = this.clone();
		clone.remove(0, start);
		clone.remove(end, clone.original.length);
		return clone;
	}
	_split(index) {
		if (this.byStart[index] || this.byEnd[index]) return;
		let chunk = this.lastSearchedChunk;
		let previousChunk = chunk;
		const searchForward = index > chunk.end;
		while (chunk) {
			if (chunk.contains(index)) return this._splitChunk(chunk, index);
			chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
			if (chunk === previousChunk) return;
			previousChunk = chunk;
		}
	}
	_splitChunk(chunk, index) {
		if (chunk.edited && chunk.content.length) {
			const loc = getLocator(this.original)(index);
			throw new Error(`Cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`);
		}
		const newChunk = chunk.split(index);
		this.byEnd[index] = chunk;
		this.byStart[index] = newChunk;
		this.byEnd[newChunk.end] = newChunk;
		if (chunk === this.lastChunk) this.lastChunk = newChunk;
		this.lastSearchedChunk = chunk;
		return true;
	}
	toString() {
		let str = this.intro;
		let chunk = this.firstChunk;
		while (chunk) {
			str += chunk.toString();
			chunk = chunk.next;
		}
		return str + this.outro;
	}
	isEmpty() {
		let chunk = this.firstChunk;
		do
			if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) return false;
		while (chunk = chunk.next);
		return true;
	}
	length() {
		let chunk = this.firstChunk;
		let length = 0;
		do
			length += chunk.intro.length + chunk.content.length + chunk.outro.length;
		while (chunk = chunk.next);
		return length;
	}
	trimLines() {
		return this.trim("[\\r\\n]");
	}
	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}
	trimEndAborted(charType) {
		const rx = new RegExp((charType || "\\s") + "+$");
		this.outro = this.outro.replace(rx, "");
		if (this.outro.length) return true;
		let chunk = this.lastChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimEnd(rx);
			if (chunk.end !== end) {
				if (this.lastChunk === chunk) this.lastChunk = chunk.next;
				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}
			if (aborted) return true;
			chunk = chunk.previous;
		} while (chunk);
		return false;
	}
	trimEnd(charType) {
		this.trimEndAborted(charType);
		return this;
	}
	trimStartAborted(charType) {
		const rx = new RegExp("^" + (charType || "\\s") + "+");
		this.intro = this.intro.replace(rx, "");
		if (this.intro.length) return true;
		let chunk = this.firstChunk;
		do {
			const end = chunk.end;
			const aborted = chunk.trimStart(rx);
			if (chunk.end !== end) {
				if (chunk === this.lastChunk) this.lastChunk = chunk.next;
				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}
			if (aborted) return true;
			chunk = chunk.next;
		} while (chunk);
		return false;
	}
	trimStart(charType) {
		this.trimStartAborted(charType);
		return this;
	}
	hasChanged() {
		return this.original !== this.toString();
	}
	_replaceRegexp(searchValue, replacement) {
		function getReplacement(match, str) {
			if (typeof replacement === "string") return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
				if (i === "$") return "$";
				if (i === "&") return match[0];
				if (+i < match.length) return match[+i];
				return `$${i}`;
			});
			else return replacement(...match, match.index, str, match.groups);
		}
		function matchAll(re, str) {
			let match;
			const matches = [];
			while (match = re.exec(str)) matches.push(match);
			return matches;
		}
		if (searchValue.global) matchAll(searchValue, this.original).forEach((match) => {
			if (match.index != null) {
				const replacement = getReplacement(match, this.original);
				if (replacement !== match[0]) this.overwrite(match.index, match.index + match[0].length, replacement);
			}
		});
		else {
			const match = this.original.match(searchValue);
			if (match && match.index != null) {
				const replacement = getReplacement(match, this.original);
				if (replacement !== match[0]) this.overwrite(match.index, match.index + match[0].length, replacement);
			}
		}
		return this;
	}
	_replaceString(string, replacement) {
		const { original } = this;
		const index = original.indexOf(string);
		if (index !== -1) {
			if (typeof replacement === "function") replacement = replacement(string, index, original);
			if (string !== replacement) this.overwrite(index, index + string.length, replacement);
		}
		return this;
	}
	replace(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceString(searchValue, replacement);
		return this._replaceRegexp(searchValue, replacement);
	}
	_replaceAllString(string, replacement) {
		const { original } = this;
		const stringLength = string.length;
		for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
			const previous = original.slice(index, index + stringLength);
			let _replacement = replacement;
			if (typeof replacement === "function") _replacement = replacement(previous, index, original);
			if (previous !== _replacement) this.overwrite(index, index + stringLength, _replacement);
		}
		return this;
	}
	replaceAll(searchValue, replacement) {
		if (typeof searchValue === "string") return this._replaceAllString(searchValue, replacement);
		if (!searchValue.global) throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");
		return this._replaceRegexp(searchValue, replacement);
	}
};
var WalkerBase = class {
	constructor() {
		this.should_skip = false;
		this.should_remove = false;
		this.replacement = null;
		this.context = {
			skip: () => this.should_skip = true,
			remove: () => this.should_remove = true,
			replace: (node) => this.replacement = node
		};
	}
	replace(parent, prop, index, node) {
		if (parent) {
			if (index !== null) parent[prop][index] = node;
			else parent[prop] = node;
		}
	}
	remove(parent, prop, index) {
		if (parent) {
			if (index !== null) parent[prop].splice(index, 1);
			else delete parent[prop];
		}
	}
};
var SyncWalker = class extends WalkerBase {
	constructor(enter, leave) {
		super();
		this.enter = enter;
		this.leave = leave;
	}
	visit(node, parent, prop, index) {
		if (node) {
			if (this.enter) {
				const _should_skip = this.should_skip;
				const _should_remove = this.should_remove;
				const _replacement = this.replacement;
				this.should_skip = false;
				this.should_remove = false;
				this.replacement = null;
				this.enter.call(this.context, node, parent, prop, index);
				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}
				if (this.should_remove) this.remove(parent, prop, index);
				const skipped = this.should_skip;
				const removed = this.should_remove;
				this.should_skip = _should_skip;
				this.should_remove = _should_remove;
				this.replacement = _replacement;
				if (skipped) return node;
				if (removed) return null;
			}
			for (const key in node) {
				const value = node[key];
				if (typeof value !== "object") continue;
				else if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i += 1) if (value[i] !== null && typeof value[i].type === "string") {
						if (!this.visit(value[i], node, key, i)) i--;
					}
				} else if (value !== null && typeof value.type === "string") this.visit(value, node, key, null);
			}
			if (this.leave) {
				const _replacement = this.replacement;
				const _should_remove = this.should_remove;
				this.replacement = null;
				this.should_remove = false;
				this.leave.call(this.context, node, parent, prop, index);
				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}
				if (this.should_remove) this.remove(parent, prop, index);
				const removed = this.should_remove;
				this.replacement = _replacement;
				this.should_remove = _should_remove;
				if (removed) return null;
			}
		}
		return node;
	}
};
function walk(ast, { enter, leave }) {
	return new SyncWalker(enter, leave).visit(ast, null);
}
var extractors = {
	ArrayPattern(names, param) {
		for (const element of param.elements) if (element) extractors[element.type](names, element);
	},
	AssignmentPattern(names, param) {
		extractors[param.left.type](names, param.left);
	},
	Identifier(names, param) {
		names.push(param.name);
	},
	MemberExpression() {},
	ObjectPattern(names, param) {
		for (const prop of param.properties) if (prop.type === "RestElement") extractors.RestElement(names, prop);
		else extractors[prop.value.type](names, prop.value);
	},
	RestElement(names, param) {
		extractors[param.argument.type](names, param.argument);
	}
};
var extractAssignedNames = function extractAssignedNames(param) {
	const names = [];
	extractors[param.type](names, param);
	return names;
};
var blockDeclarations = {
	const: true,
	let: true
};
var Scope = class {
	constructor(options = {}) {
		this.parent = options.parent;
		this.isBlockScope = !!options.block;
		this.declarations = Object.create(null);
		if (options.params) options.params.forEach((param) => {
			extractAssignedNames(param).forEach((name) => {
				this.declarations[name] = true;
			});
		});
	}
	addDeclaration(node, isBlockDeclaration, isVar) {
		if (!isBlockDeclaration && this.isBlockScope) this.parent.addDeclaration(node, isBlockDeclaration, isVar);
		else if (node.id) extractAssignedNames(node.id).forEach((name) => {
			this.declarations[name] = true;
		});
	}
	contains(name) {
		return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
	}
};
var attachScopes = function attachScopes(ast, propertyName = "scope") {
	let scope = new Scope();
	walk(ast, {
		enter(n, parent) {
			const node = n;
			if (/(?:Function|Class)Declaration/.test(node.type)) scope.addDeclaration(node, false, false);
			if (node.type === "VariableDeclaration") {
				const { kind } = node;
				const isBlockDeclaration = blockDeclarations[kind];
				node.declarations.forEach((declaration) => {
					scope.addDeclaration(declaration, isBlockDeclaration, true);
				});
			}
			let newScope;
			if (node.type.includes("Function")) {
				const func = node;
				newScope = new Scope({
					parent: scope,
					block: false,
					params: func.params
				});
				if (func.type === "FunctionExpression" && func.id) newScope.addDeclaration(func, false, false);
			}
			if (node.type === "StaticBlock") newScope = new Scope({
				parent: scope,
				block: false
			});
			if (/For(?:In|Of)?Statement/.test(node.type)) newScope = new Scope({
				parent: scope,
				block: true
			});
			if (node.type === "BlockStatement" && !parent.type.includes("Function")) newScope = new Scope({
				parent: scope,
				block: true
			});
			if (node.type === "CatchClause") newScope = new Scope({
				parent: scope,
				params: node.param ? [node.param] : [],
				block: true
			});
			if (newScope) {
				Object.defineProperty(node, propertyName, {
					value: newScope,
					configurable: true
				});
				scope = newScope;
			}
		},
		leave(n) {
			if (n[propertyName]) scope = scope.parent;
		}
	});
	return scope;
};
function isArray(arg) {
	return Array.isArray(arg);
}
function ensureArray(thing) {
	if (isArray(thing)) return thing;
	if (thing == null) return [];
	return [thing];
}
var normalizePathRegExp = new RegExp(`\\${win32.sep}`, "g");
var normalizePath = function normalizePath(filename) {
	return filename.replace(normalizePathRegExp, posix.sep);
};
function getMatcherString(id, resolutionBase) {
	if (resolutionBase === false || isAbsolute$1(id) || id.startsWith("**")) return normalizePath(id);
	const basePath = normalizePath(resolve$1(resolutionBase || "")).replace(/[-^$*+?.()|[\]{}]/g, "\\$&");
	return posix.join(basePath, normalizePath(id));
}
var createFilter = function createFilter(include, exclude, options) {
	const resolutionBase = options && options.resolve;
	const getMatcher = (id) => {
		if (id instanceof RegExp) return id;
		const compile = () => (0, import_picomatch.default)(getMatcherString(id, resolutionBase), { dot: true });
		if (resolutionBase === false || isAbsolute$1(id) || id.startsWith("**")) return { test: compile() };
		let compiledCwd = process.cwd();
		let fn = compile();
		return { test: (what) => {
			const cwd = process.cwd();
			if (cwd !== compiledCwd) {
				compiledCwd = cwd;
				fn = compile();
			}
			return fn(what);
		} };
	};
	const includeMatchers = ensureArray(include).map(getMatcher);
	const excludeMatchers = ensureArray(exclude).map(getMatcher);
	if (!includeMatchers.length && !excludeMatchers.length) return (id) => typeof id === "string" && !id.includes("\0");
	return function result(id) {
		if (typeof id !== "string") return false;
		if (id.includes("\0")) return false;
		const pathId = normalizePath(id);
		for (let i = 0; i < excludeMatchers.length; ++i) {
			const matcher = excludeMatchers[i];
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return false;
		}
		for (let i = 0; i < includeMatchers.length; ++i) {
			const matcher = includeMatchers[i];
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return true;
		}
		return !includeMatchers.length;
	};
};
var forbiddenIdentifiers = new Set(`break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl`.split(" "));
forbiddenIdentifiers.add("");
var makeLegalIdentifier = function makeLegalIdentifier(str) {
	let identifier = str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()).replace(/[^$_a-zA-Z0-9]/g, "_");
	if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) identifier = `_${identifier}`;
	return identifier || "_";
};
function stringify(obj) {
	return (JSON.stringify(obj) || "undefined").replace(/[\u2028\u2029]/g, (char) => `\\u${`000${char.charCodeAt(0).toString(16)}`.slice(-4)}`);
}
function serializeArray(arr, indent, baseIndent) {
	let output = "[";
	const separator = indent ? `\n${baseIndent}${indent}` : "";
	for (let i = 0; i < arr.length; i++) {
		const key = arr[i];
		output += `${i > 0 ? "," : ""}${separator}${serialize(key, indent, baseIndent + indent)}`;
	}
	return `${output}${indent ? `\n${baseIndent}` : ""}]`;
}
function serializeObject(obj, indent, baseIndent) {
	let output = "{";
	const separator = indent ? `\n${baseIndent}${indent}` : "";
	const entries = Object.entries(obj);
	for (let i = 0; i < entries.length; i++) {
		const [key, value] = entries[i];
		const stringKey = makeLegalIdentifier(key) === key ? key : stringify(key);
		output += `${i > 0 ? "," : ""}${separator}${stringKey}:${indent ? " " : ""}${serialize(value, indent, baseIndent + indent)}`;
	}
	return `${output}${indent ? `\n${baseIndent}` : ""}}`;
}
function serialize(obj, indent, baseIndent) {
	if (typeof obj === "object" && obj !== null) {
		if (Array.isArray(obj)) return serializeArray(obj, indent, baseIndent);
		if (obj instanceof Date) return `new Date(${obj.getTime()})`;
		if (obj instanceof RegExp) return obj.toString();
		return serializeObject(obj, indent, baseIndent);
	}
	if (typeof obj === "number") {
		if (obj === Infinity) return "Infinity";
		if (obj === -Infinity) return "-Infinity";
		if (obj === 0) return 1 / obj === Infinity ? "0" : "-0";
		if (obj !== obj) return "NaN";
	}
	if (typeof obj === "symbol") {
		const key = Symbol.keyFor(obj);
		if (key !== void 0) return `Symbol.for(${stringify(key)})`;
	}
	if (typeof obj === "bigint") return `${obj}n`;
	return stringify(obj);
}
var hasStringIsWellFormed = "isWellFormed" in String.prototype;
function isWellFormedString(input) {
	if (hasStringIsWellFormed) return input.isWellFormed();
	return !/\p{Surrogate}/u.test(input);
}
var identifierNameRE = /^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u;
var dataToEsm = function dataToEsm(data, options = {}) {
	var _a, _b;
	const t = options.compact ? "" : "indent" in options ? options.indent : "	";
	const _ = options.compact ? "" : " ";
	const n = options.compact ? "" : "\n";
	const declarationType = options.preferConst ? "const" : "var";
	if (options.namedExports === false || typeof data !== "object" || Array.isArray(data) || data instanceof Date || data instanceof RegExp || data === null) {
		const code = serialize(data, options.compact ? null : t, "");
		return `export default${_ || (/^[{[\-\/]/.test(code) ? "" : " ")}${code};`;
	}
	let maxUnderbarPrefixLength = 0;
	for (const key of Object.keys(data)) {
		const underbarPrefixLength = (_b = (_a = /^(_+)/.exec(key)) === null || _a === void 0 ? void 0 : _a[0].length) !== null && _b !== void 0 ? _b : 0;
		if (underbarPrefixLength > maxUnderbarPrefixLength) maxUnderbarPrefixLength = underbarPrefixLength;
	}
	const arbitraryNamePrefix = `${"_".repeat(maxUnderbarPrefixLength + 1)}arbitrary`;
	let namedExportCode = "";
	const defaultExportRows = [];
	const arbitraryNameExportRows = [];
	for (const [key, value] of Object.entries(data)) if (key === makeLegalIdentifier(key)) {
		if (options.objectShorthand) defaultExportRows.push(key);
		else defaultExportRows.push(`${key}:${_}${key}`);
		namedExportCode += `export ${declarationType} ${key}${_}=${_}${serialize(value, options.compact ? null : t, "")};${n}`;
	} else {
		defaultExportRows.push(`${stringify(key)}:${_}${serialize(value, options.compact ? null : t, "")}`);
		if (key !== "default") {
			const isIdentifierName = identifierNameRE.test(key);
			if (isIdentifierName || options.includeArbitraryNames && isWellFormedString(key)) {
				const variableName = `${arbitraryNamePrefix}${arbitraryNameExportRows.length}`;
				namedExportCode += `${declarationType} ${variableName}${_}=${_}${serialize(value, options.compact ? null : t, "")};${n}`;
				arbitraryNameExportRows.push(`${variableName} as ${isIdentifierName ? key : JSON.stringify(key)}`);
			}
		}
	}
	const arbitraryExportCode = arbitraryNameExportRows.length > 0 ? `export${_}{${n}${t}${arbitraryNameExportRows.join(`,${n}${t}`)}${n}};${n}` : "";
	const defaultExportCode = `export default${_}{${n}${t}${defaultExportRows.join(`,${n}${t}`)}${n}};${n}`;
	return `${namedExportCode}${arbitraryExportCode}${defaultExportCode}`;
};
function escape(str) {
	return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function ensureFunction(functionOrValue) {
	if (typeof functionOrValue === "function") return functionOrValue;
	return function() {
		return functionOrValue;
	};
}
function longest(a, b) {
	return b.length - a.length;
}
function getReplacements(options) {
	if (options.values) return Object.assign({}, options.values);
	var values = Object.assign({}, options);
	delete values.delimiters;
	delete values.include;
	delete values.exclude;
	delete values.sourcemap;
	delete values.sourceMap;
	delete values.objectGuards;
	delete values.preventAssignment;
	return values;
}
function mapToFunctions(object) {
	return Object.keys(object).reduce(function(fns, key) {
		var functions = Object.assign({}, fns);
		functions[key] = ensureFunction(object[key]);
		return functions;
	}, {});
}
var objKeyRegEx = /^([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)(\.([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))+$/;
function expandTypeofReplacements(replacements) {
	Object.keys(replacements).forEach(function(key) {
		var objMatch = key.match(objKeyRegEx);
		if (!objMatch) return;
		var dotIndex = objMatch[1].length;
		do {
			replacements["typeof " + key.slice(0, dotIndex)] = "\"object\"";
			dotIndex = key.indexOf(".", dotIndex + 1);
		} while (dotIndex !== -1);
	});
}
function replace$1(options) {
	if (options === void 0) options = {};
	var filter = createFilter(options.include, options.exclude);
	var delimiters = options.delimiters;
	if (delimiters === void 0) delimiters = ["(?<![_$a-zA-Z0-9\\xA0-\\uFFFF])", "(?![_$a-zA-Z0-9\\xA0-\\uFFFF])(?!\\.)"];
	var preventAssignment = options.preventAssignment;
	var objectGuards = options.objectGuards;
	var replacements = getReplacements(options);
	if (objectGuards) expandTypeofReplacements(replacements);
	var functionValues = mapToFunctions(replacements);
	var keys = Object.keys(functionValues).sort(longest).map(escape);
	var lookbehind = preventAssignment ? "(?<!\\b(?:const|let|var)\\s*)" : "";
	var lookahead = preventAssignment ? "(?!\\s*=[^=])" : "";
	var pattern = new RegExp("" + lookbehind + delimiters[0] + "(" + keys.join("|") + ")" + delimiters[1] + lookahead, "g");
	return {
		name: "replace",
		buildStart: function buildStart() {
			if (![true, false].includes(preventAssignment)) this.warn({ message: "@rollup/plugin-replace: 'preventAssignment' currently defaults to false. It is recommended to set this option to `true`, as the next major version will default this option to `true`." });
		},
		renderChunk: function renderChunk(code, chunk) {
			var id = chunk.fileName;
			if (!keys.length) return null;
			if (!filter(id)) return null;
			return executeReplacement(code, id);
		},
		transform: function transform(code, id) {
			if (!keys.length) return null;
			if (!filter(id)) return null;
			return executeReplacement(code, id);
		}
	};
	function executeReplacement(code, id) {
		var magicString = new MagicString(code);
		if (!codeHasReplacements(code, id, magicString)) return null;
		var result = { code: magicString.toString() };
		if (isSourceMapEnabled()) result.map = magicString.generateMap({ hires: true });
		return result;
	}
	function codeHasReplacements(code, id, magicString) {
		var result = false;
		var match;
		while (match = pattern.exec(code)) {
			result = true;
			var start = match.index;
			var end = start + match[0].length;
			var replacement = String(functionValues[match[1]](id));
			magicString.overwrite(start, end, replacement);
		}
		return result;
	}
	function isSourceMapEnabled() {
		return options.sourceMap !== false && options.sourcemap !== false;
	}
}
function replace(values) {
	const plugin = replace$1({
		preventAssignment: true,
		values,
		exclude: RESOLVED_RE
	});
	delete plugin.renderChunk;
	const keys = Object.keys(values);
	if (keys.length > 0 && typeof plugin.transform === "function") plugin.transform = {
		filter: { code: new RegExp(keys.map((key) => escapeRegExp$1(key)).join("|")) },
		handler: plugin.transform
	};
	return plugin;
}
var TYPES = ["bytes", "text"];
var ATTR_RE = /["']?type["']?\s*:\s*["'](bytes|text)["']/;
var JS_ID_RE$1 = /\.[cm]?[jt]sx?(\?.*)?$/;
async function importAttributes(nitro) {
	let oxc = await importOXC({
		dir: nitro.options.rootDir,
		paths: viteDepPaths(nitro)
	});
	return {
		name: "nitro:import-attributes",
		perEnvironmentStartEndDuringDev: true,
		async buildStart() {
			oxc = await importOXC({
				dir: nitro.options.rootDir,
				paths: viteDepPaths(nitro)
			});
		},
		transform: {
			order: "pre",
			filter: {
				id: {
					include: JS_ID_RE$1,
					exclude: RESOLVED_RE
				},
				code: ATTR_RE
			},
			handler(code, id) {
				if (!JS_ID_RE$1.test(id) || RESOLVED_RE.test(id) || !ATTR_RE.test(code)) return;
				const filename = id.split("?")[0];
				const { program, comments, errors } = oxc.parseSync(filename, code);
				if (errors.length > 0) {
					this.warn(`Could not parse \`${filename}\` to transform \`bytes\` and \`text\` import attributes: ${errors[0].message}`);
					return;
				}
				const imports = findTypedImports(program, code, comments);
				if (imports.length === 0) return;
				const s = new MagicString$1(code);
				for (const { source, type, end } of imports) {
					s.update(source.start, source.end, JSON.stringify(`${type}:${source.value}`));
					s.remove(source.end, end);
				}
				return {
					code: s.toString(),
					map: s.generateMap({
						hires: true,
						source: filename
					}).toString()
				};
			}
		}
	};
}
function findTypedImports(program, code, comments) {
	const imports = [];
	walkAST(program, (node) => {
		switch (node.type) {
			case "ImportExpression": {
				const options = node.options;
				if (!isStringLiteral(node.source) || options?.type !== "ObjectExpression") return;
				const type = optionsType(options);
				if (type) imports.push({
					source: node.source,
					type,
					end: options.end
				});
				return;
			}
			case "ImportDeclaration":
			case "ExportNamedDeclaration":
			case "ExportAllDeclaration": {
				const lastAttr = node.attributes.at(-1);
				const type = attributesType(node.attributes);
				if (!node.source || !lastAttr || !type) return;
				const end = clauseEnd(code, lastAttr.end, comments);
				if (end !== void 0) imports.push({
					source: node.source,
					type,
					end
				});
			}
		}
	});
	return imports;
}
function clauseEnd(code, from, comments) {
	for (let i = code.indexOf("}", from); i !== -1; i = code.indexOf("}", i + 1)) if (!comments.some((comment) => i >= comment.start && i < comment.end)) return i + 1;
}
function attributesType(attributes) {
	for (const attr of attributes) if ((attr.key.type === "Identifier" ? attr.key.name : attr.key.value) === "type" && isImportType(attr.value.value)) return attr.value.value;
}
function optionsType(options) {
	const withOption = findProperty(options, "with");
	if (withOption?.type !== "ObjectExpression") return;
	const type = findProperty(withOption, "type");
	if (type && isStringLiteral(type) && isImportType(type.value)) return type.value;
}
function findProperty(node, name) {
	for (const prop of node.properties) {
		if (prop.type !== "Property" || prop.computed) continue;
		if ((prop.key.type === "Identifier" ? prop.key.name : isStringLiteral(prop.key) ? prop.key.value : void 0) === name) return prop.value;
	}
}
function isStringLiteral(node) {
	return node.type === "Literal" && typeof node.value === "string";
}
function isImportType(value) {
	return TYPES.includes(value);
}
var e = Object.freeze(/* @__PURE__ */ `canvas.sharp.@vercel/og.gl.@napi-rs/canvas.@napi-rs/image.@takumi-rs/core.@resvg/resvg-js.bcrypt.kerberos.scrypt.blake-hash.sodium-native.argon2.@node-rs/argon2.@node-rs/bcrypt.@node-rs/jsonwebtoken.cpu-features.farmhash.@node-rs/xxhash.@node-rs/crc32.bigint-buffer.keytar.better-sqlite3.better-sqlite3-multiple-ciphers.sqlite3.leveldown.classic-level.lmdb.libsql.duckdb.rocksdb.level-rocksdb.pg-native.oracledb.mongodb-client-encryption.odbc.ibm_db.hiredis.couchbase.realm.node-rdkafka.lz4.lz4-napi.zlib-sync.snappy.@napi-rs/snappy.@napi-rs/lzma.@mongodb-js/zstd.msgpackr-extract.cbor-extract.@napi-rs/tar.esbuild.rolldown.vite.@rspack/core.@swc/core.@swc-node/register.lightningcss.@parcel/css.@parcel/watcher.@parcel/source-map.@biomejs/biome.oxfmt.oxlint.oxc-parser.oxc-transform.oxc-resolver.oxc-minify.@ast-grep/napi.@napi-rs/cli.@node-rs/deno-lint.vize.node-sass.tree-sitter.re2.rollup.sass-embedded.@tailwindcss/oxide.turbo.deasync.@xenova/transformers.node-llama-cpp.llama-node.onnxruntime-node.@tensorflow/tfjs-node.@sentry/profiling-node.@datadog/native-metrics.@datadog/native-appsec.@datadog/native-iast-taint-tracking.@datadog/pprof.@newrelic/native-metrics.@appsignal/nodejs.@statsig/statsig-node-core.v8-profiler-next.heapdump.grpc.zeromq.unix-dgram.ssh2.aws-crt.node-libcurl.bufferutil.utf-8-validate.fsevents.node-pty.usb.@serialport/bindings-cpp.robotjs.node-hid.isolated-vm.dtrace-provider.microtime.node-datachannel.zigpty.edge-js.nsfw.native-reg.diskusage.@napi-rs/clipboard.@napi-rs/nice.@napi-rs/webcodecs.workerd.node-web-audio-api.ffi-napi.ref-napi.ref-struct-napi.ref-union-napi.iconv.libxmljs2.node-expat.@node-rs/jieba.md4x/napi.@discordjs/opus.nodegit.integer`.split(`.`));
var t = [
	`usb`,
	`sodium-native`,
	`aws-crt`,
	`youch`
];
var n = [
	`youch`,
	`pg-native`,
	`typeorm`,
	`prisma`,
	`@prisma/client`,
	`@sentry/tanstackstart-react`,
	`dd-trace`,
	`newrelic`,
	`applicationinsights`,
	`@vercel/node`,
	`puppeteer`,
	`playwright`,
	`playwright-core`,
	`puppeteer-core`,
	`vscode-oniguruma`,
	`tslib`,
	`@highlight-run/node`,
	`import-in-the-middle`,
	`require-in-the-middle`
];
var PLUGIN_NAME = "nitro:externals";
function externals(opts) {
	const resolved = opts.trace ? resolveTraceDeps(opts.include) : void 0;
	const include = resolved?.includePattern ? [resolved.includePattern] : void 0;
	const exclude = [/^(?:[\0#~.]|[a-z0-9]{2,}:)|\?/, ...(opts?.exclude || []).map((p) => toPathRegExp(p))];
	const filter = (id) => {
		if (include && !include.some((r) => r.test(id))) return false;
		if (exclude.some((r) => r.test(id))) return false;
		return true;
	};
	const resolveConditions = opts.conditions.includes("import") ? opts.conditions : [...opts.conditions, "import"];
	const tryResolve = (id, from) => resolveModulePath(id, {
		try: true,
		from: from && isAbsolute$2(from) ? from : opts.rootDir,
		conditions: resolveConditions
	});
	const tracedPaths = /* @__PURE__ */ new Set();
	const tracedIds = /* @__PURE__ */ new Map();
	const placeholders = /* @__PURE__ */ new Map();
	let tracedLayout;
	const forcedTraceIncludes = new Set(resolved?.traceInclude);
	if (opts.trace && !resolved?.includePattern) return { name: PLUGIN_NAME };
	return {
		name: PLUGIN_NAME,
		resolveId: {
			order: "pre",
			filter: { id: {
				exclude,
				include
			} },
			async handler(id, importer, rOpts) {
				if (builtinModules.includes(id)) return {
					resolvedBy: PLUGIN_NAME,
					external: true,
					id: id.includes(":") ? id : `node:${id}`
				};
				if (rOpts.custom?.["node-resolve"]?.resolved) return null;
				let resolved = await this.resolve(id, importer, rOpts);
				const cjsResolved = resolved?.meta?.commonjs?.resolved;
				if (cjsResolved) {
					if (!filter(cjsResolved.id)) return resolved;
					resolved = cjsResolved;
				}
				if (!resolved?.id) {
					const importId = opts.trace ? toImport(id) : void 0;
					if (importId && include?.some((r) => r.test(importId))) {
						forcedTraceIncludes.add(IMPORT_RE.exec(importId)?.groups?.name ?? importId);
						return {
							resolvedBy: PLUGIN_NAME,
							external: true,
							id: importId
						};
					}
					return resolved;
				}
				if (!filter(resolved.id)) return resolved;
				let resolvedPath = resolved.id;
				if (!isAbsolute$2(resolvedPath)) resolvedPath = tryResolve(resolvedPath, importer) || resolvedPath;
				if (opts.trace) {
					let importId = toImport(id) || toImport(resolvedPath);
					if (!importId) return resolved;
					if (!tryResolve(importId, importer)) {
						const guessed = await guessSubpath(resolvedPath, resolveConditions);
						if (!guessed) return resolved;
						importId = guessed;
					}
					tracedPaths.add(resolvedPath);
					const placeholderKey = `${resolvedPath}\0${importId}`;
					let placeholder = placeholders.get(placeholderKey);
					if (!placeholder) {
						placeholder = `${TRACED_ID_PREFIX}${placeholders.size}/${importId}`;
						placeholders.set(placeholderKey, placeholder);
						tracedIds.set(placeholder, {
							importId,
							path: resolvedPath
						});
					}
					return {
						...resolved,
						resolvedBy: PLUGIN_NAME,
						external: true,
						id: placeholder
					};
				}
				return {
					...resolved,
					resolvedBy: PLUGIN_NAME,
					external: true,
					id: isAbsolute$2(resolvedPath) ? pathToFileURL(resolvedPath).href : resolvedPath
				};
			}
		},
		buildEnd: {
			order: "post",
			async handler() {
				if (!opts.trace || tracedPaths.size === 0 && forcedTraceIncludes.size === 0) return;
				const { hooks: userHooks, ...traceOpts } = opts.trace;
				const { traceNodeModules } = await import("../_12.mjs");
				const traceTime = Date.now();
				let traceFilesCount = 0;
				let tracedPkgsCount = 0;
				const traceInclude = forcedTraceIncludes.size ? [...forcedTraceIncludes] : void 0;
				const traceIncludeRoots = traceInclude ? [.../* @__PURE__ */ new Set([...typeof this.getModuleIds === "function" ? collectPackageRoots(this.getModuleIds()) ?? [] : [], ...collectDirectDepRoots(opts.rootDir, opts.conditions)])] : void 0;
				tracedLayout = await traceNodeModules([...tracedPaths], {
					...traceOpts,
					fullTraceInclude: resolved?.fullTraceInclude,
					traceInclude,
					traceIncludeRoots: traceIncludeRoots?.length ? traceIncludeRoots : void 0,
					conditions: opts.conditions,
					rootDir: opts.rootDir,
					writePackageJson: true,
					hooks: {
						...userHooks,
						tracedFiles: async (result) => {
							traceFilesCount = Object.keys(result).length;
							await userHooks?.tracedFiles?.(result);
						},
						tracedPackages: async (pkgs) => {
							tracedPkgsCount = Object.keys(pkgs).length;
							consola.info(`Tracing dependencies:\n${Object.entries(pkgs).map(([name, versions]) => `- \`${name}\` (${Object.keys(versions.versions).join(", ")})`).join("\n")}`);
							await userHooks?.tracedPackages?.(pkgs);
						}
					}
				});
				consola.success(`Traced ${tracedPkgsCount} dependencies (${traceFilesCount} files) in ${Date.now() - traceTime}ms.`);
				consola.info(`Ensure your production environment matches the builder OS and architecture (\`${process.platform}-${process.arch}\`) to avoid native module issues.`);
			}
		},
		renderChunk(code, chunk, outputOpts, meta) {
			if (tracedIds.size === 0 || !code.includes(TRACED_ID_PREFIX)) return;
			const outDir = outputOpts.dir || opts.trace && opts.trace.outDir || opts.rootDir;
			const s = new MagicString$1(code);
			let helperFileName;
			for (const match of code.matchAll(TRACED_ID_RE)) {
				const traced = tracedIds.get(match[0]);
				if (!traced) continue;
				const fileName = isRequireCall(code, match.index) ? helperFileName ??= requireHelperFileName(chunk, meta?.chunks) : chunk.fileName;
				s.update(match.index, match.index + match[0].length, renderTracedId(traced, {
					layout: tracedLayout,
					outDir,
					fileName
				}));
			}
			if (!s.hasChanged()) return;
			return {
				code: s.toString(),
				map: outputOpts.sourcemap ? s.generateMap({
					hires: "boundary",
					source: chunk.fileName
				}).toString() : void 0
			};
		}
	};
}
function resolveTraceDeps(traceDeps, opts = {}) {
	const builtinPackages = opts.builtinPackages ?? [...e, ...n];
	const builtinFullTrace = opts.builtinFullTrace ?? t;
	const negated = /* @__PURE__ */ new Set();
	const userTraceDeps = [];
	const userFullTrace = [];
	for (const d of traceDeps) if (typeof d !== "string") userTraceDeps.push(d);
	else if (d === "!" || d === "*" || d === "") throw new Error(`Invalid traceDeps selector: "${d}"`);
	else if (d.startsWith("!")) negated.add(d.slice(1));
	else if (d.endsWith("*")) {
		const name = d.slice(0, -1);
		userFullTrace.push(name);
		userTraceDeps.push(name);
	} else userTraceDeps.push(d);
	const tracePattern = [.../* @__PURE__ */ new Set([...builtinPackages, ...userTraceDeps])].filter((d) => typeof d !== "string" || !negated.has(d)).map((d) => d instanceof RegExp ? d.source : escapeRegExp$1(d)).join("|");
	const fullTraceInclude = [.../* @__PURE__ */ new Set([...builtinFullTrace, ...userFullTrace])].filter((d) => !negated.has(d));
	const traceInclude = userTraceDeps.filter((d) => typeof d === "string" && !negated.has(d) && !(d.startsWith("@") && !d.includes("/")));
	return {
		includePattern: tracePattern ? new RegExp(`(?:^|[/\\\\]node_modules[/\\\\])(?:${tracePattern})(?:[/\\\\]|$)`) : void 0,
		fullTraceInclude: fullTraceInclude.length > 0 ? fullTraceInclude : void 0,
		traceInclude: traceInclude.length > 0 ? traceInclude : void 0
	};
}
var TRACED_ID_PREFIX = "nitro:traced/";
var TRACED_ID_RE = /(?<=["'`])nitro:traced\/\d+\/[^"'`]+(?=["'`])/g;
var REQUIRE_CALL_RE = /\b__require(?:\$\d+)?\(\s*["'`]$/;
var ROLLDOWN_RUNTIME_ID = "\0rolldown/runtime.js";
function isRequireCall(code, index) {
	return REQUIRE_CALL_RE.test(code.slice(Math.max(0, index - 32), index));
}
function requireHelperFileName(chunk, chunks) {
	if (chunk.moduleIds.includes(ROLLDOWN_RUNTIME_ID)) return chunk.fileName;
	return Object.values(chunks || {}).find((c) => c.moduleIds.includes(ROLLDOWN_RUNTIME_ID))?.fileName ?? chunk.fileName;
}
function renderTracedId(traced, opts) {
	const outFile = opts.layout?.files[traced.path];
	const version = outFile && Object.values(opts.layout.packages).flatMap((pkg) => Object.values(pkg.versions)).find((v) => outFile.startsWith(`${v.outPath}/`));
	if (!outFile || !version || version.hoisted) return traced.importId;
	const path = relative$2(dirname$2(join$2(opts.outDir, opts.fileName)), join$2(opts.outDir, outFile));
	return path.startsWith(".") ? path : `./${path}`;
}
var NODE_MODULES_RE$2 = /^(?<dir>.+[\\/]node_modules[\\/])(?<name>[^@\\/]+|@[^\\/]+[\\/][^\\/]+)(?:[\\/](?<subpath>.+))?$/;
var IMPORT_RE = /^(?!\.)(?<name>[^@/\\]+|@[^/\\]+[/\\][^/\\]+)(?:[/\\](?<subpath>.+))?$/;
function collectPackageRoots(moduleIds) {
	const roots = /* @__PURE__ */ new Set();
	for (const id of moduleIds) {
		const { dir, name } = NODE_MODULES_RE$2.exec(id)?.groups || {};
		if (dir && name) roots.add(join$2(dir, name));
	}
	return roots.size > 0 ? [...roots] : void 0;
}
function collectDirectDepRoots(rootDir, conditions) {
	const pkg = getPkgJSON(join$2(rootDir, "/"));
	if (!pkg) return [];
	const roots = /* @__PURE__ */ new Set();
	for (const name of Object.keys({
		...pkg.dependencies,
		...pkg.devDependencies,
		...pkg.optionalDependencies
	})) {
		const resolved = resolveModulePath(`${name}/package.json`, {
			try: true,
			from: rootDir,
			conditions
		});
		if (resolved) roots.add(dirname$2(resolved));
	}
	return [...roots];
}
function toImport(id) {
	if (isAbsolute$2(id)) {
		const { name, subpath } = NODE_MODULES_RE$2.exec(id)?.groups || {};
		if (name && subpath) return join$2(name, subpath);
	} else if (IMPORT_RE.test(id)) return id;
}
function guessSubpath(path, conditions) {
	const { dir, name, subpath } = NODE_MODULES_RE$2.exec(path)?.groups || {};
	if (!dir || !name || !subpath) return;
	const exports = getPkgJSON(join$2(dir, name) + "/")?.exports;
	if (!exports || typeof exports !== "object") return;
	for (const e of flattenExports(exports)) {
		if (!conditions.includes(e.condition || "default")) continue;
		if (e.fsPath === subpath) return e.subpath === "./" ? normalize$2(name) : join$2(name, e.subpath);
		if (e.fsPath.includes("*")) {
			const fsPathRe = new RegExp("^" + escapeRegExp$1(e.fsPath).replace(String.raw`\*`, "(.+?)") + "$");
			if (fsPathRe.test(subpath)) {
				const matched = fsPathRe.exec(subpath)?.[1];
				if (matched) return join$2(name, e.subpath.replace("*", matched));
			}
		}
	}
}
function getPkgJSON(dir) {
	const cache = getPkgJSON._cache ||= /* @__PURE__ */ new Map();
	if (cache.has(dir)) return cache.get(dir);
	try {
		const pkg = createRequire(dir)("./package.json");
		cache.set(dir, pkg);
		return pkg;
	} catch {}
}
function flattenExports(exports = {}, parentSubpath = "./") {
	return Object.entries(exports).flatMap(([key, value]) => {
		const [subpath, condition] = key.startsWith(".") ? [key.slice(1)] : [void 0, key];
		const _subPath = join$2(parentSubpath, subpath || "");
		if (typeof value === "string") return [{
			subpath: _subPath,
			fsPath: value.replace(/^\.\//, ""),
			condition
		}];
		return typeof value === "object" ? flattenExports(value, _subPath) : [];
	});
}
var optionalRuntimeDeps = Object.keys(deps).filter((id) => deps[id].runtime);
var OPTIONAL_RUNTIME_DEPS_RE = new RegExp(`^(${optionalRuntimeDeps.join("|")})(\\/|$)`);
var RUNTIME_IMPORTER_RE = new RegExp(`^(#nitro/|\0|${pathRegExp(pkgDir)}(?!.*node_modules))`);
function isRuntimeImporter(importer) {
	return !!importer && RUNTIME_IMPORTER_RE.test(importer);
}
async function ensureRuntimeDep(nitro, id) {
	const opts = runtimeDepOptions(nitro, id);
	if (!await ensureDep(opts)) throw missingDepError(opts);
}
function missingRuntimeDepError(nitro, id) {
	return missingDepError(runtimeDepOptions(nitro, id));
}
function runtimeDeps(nitro) {
	return {
		name: "nitro:runtime-deps",
		resolveId: {
			order: "pre",
			filter: { id: OPTIONAL_RUNTIME_DEPS_RE },
			async handler(id, importer, options) {
				if (!isRuntimeImporter(importer)) return;
				await ensureRuntimeDep(nitro, id);
				const path = resolveDep(id, {
					dir: nitro.options.rootDir,
					deps: nitro.options.deps
				});
				if (!path) {
					const name = depPackageName(id);
					throw new Error(`Cannot resolve \`${id}\` from \`${nitro.options.rootDir}\`. Please make sure \`${name}@${deps[name].version}\` is installed in your project.`);
				}
				return await this.resolve(path, importer, {
					...options,
					skipSelf: true
				}) || path;
			}
		}
	};
}
function runtimeDepOptions(nitro, id) {
	return {
		id: depPackageName(id),
		dir: nitro.options.rootDir,
		deps: nitro.options.deps
	};
}
function tsconfigPaths(nitro, aliases) {
	const paths = loadPaths(nitro);
	if (!paths) return;
	const { keys, candidates } = paths;
	const excludes = [SKIP_ID, ...Object.keys(aliases).map((key) => `${escapeRE(key.replace(/\/$/, ""))}(?:/|$)`)];
	const idRE = new RegExp(`^(?!${excludes.join("|")})(?:${keys.map(patternRegExp).join("|")})$`);
	return {
		name: "nitro:tsconfig-paths",
		resolveId: {
			order: "pre",
			filter: { id: idRE },
			handler(id, importer, options) {
				if (!importer || !idRE.test(id) || NODE_MODULES_RE$1.test(importer) || isViteAlias(this, id)) return;
				const targets = candidates(id);
				const next = (index) => index < targets.length ? chain(this.resolve(targets[index], importer, {
					...options,
					skipSelf: true
				}), (resolved) => resolved ?? next(index + 1)) : void 0;
				return next(0);
			}
		}
	};
}
function tsconfigPathsNoExternal(nitro) {
	const paths = loadPaths(nitro);
	const keys = (paths?.keys || []).filter((key) => key.includes("*") ? !key.startsWith("*") : paths.candidates(key).some(isFile));
	return keys.length > 0 ? [pathsRegExp(keys)] : [];
}
var pathsCache = /* @__PURE__ */ new WeakMap();
function loadPaths(nitro) {
	if (!pathsCache.has(nitro)) pathsCache.set(nitro, _loadPaths(nitro));
	return pathsCache.get(nitro);
}
function _loadPaths(nitro) {
	const tsConfig = nitro.options.typescript.tsConfig;
	const keys = Object.keys(tsConfig?.compilerOptions?.paths || {});
	if (nitro.options.typescript.tsconfigPaths === false || keys.length === 0) return;
	let matcher;
	try {
		matcher = fn({
			path: join$2(nitro.options.rootDir, "tsconfig.json"),
			config: tsConfig
		});
	} catch (error) {
		nitro.logger.warn(`Ignoring \`compilerOptions.paths\` of the project tsconfig: ${error.message}`);
		return;
	}
	if (!matcher) return;
	return {
		keys,
		candidates: (id) => matcher(id).filter((path) => !TYPES_RE.test(path))
	};
}
function isViteAlias(ctx, id) {
	const alias = ctx.environment?.config?.resolve?.alias;
	if (!Array.isArray(alias) || alias.length === 0) return false;
	let matcher = viteAliasCache.get(alias);
	if (!matcher) {
		const res = alias.map(({ find }) => typeof find === "string" ? new RegExp(`^${escapeRE(find)}(?:\\/|$)`) : find);
		matcher = (id) => res.some((re) => re.test(id));
		viteAliasCache.set(alias, matcher);
	}
	return matcher(id);
}
var viteAliasCache = /* @__PURE__ */ new WeakMap();
function isFile(path) {
	return [
		path,
		...SCRIPT_EXTENSIONS.map((ext) => path + ext),
		...SCRIPT_EXTENSIONS.map((ext) => join$2(path, `index${ext}`))
	].some((file) => existsSync(file) && statSync(file).isFile());
}
var SCRIPT_EXTENSIONS = [
	".ts",
	".mts",
	".cts",
	".tsx",
	".js",
	".mjs",
	".cjs",
	".jsx"
];
var NODE_MODULES_RE$1 = /[\\/]node_modules[\\/]/;
var TYPES_RE = /\.d\.(?:[^/\\]+\.)?[cm]?ts$|[\\/]node_modules[\\/]@types[\\/]/;
var SKIP_ID = String.raw`[/\\\0]|#nitro\/|[a-zA-Z][\w+.-]*:`;
function pathsRegExp(keys) {
	return new RegExp(`^(?:${keys.map(patternRegExp).join("|")})$`);
}
function patternRegExp(pattern) {
	return pattern.split("*").map(escapeRE).join(".*");
}
function escapeRE(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
async function baseBuildPlugins(nitro, base) {
	const plugins = [];
	const virtualPlugin = virtual(virtualTemplates(nitro, [...base.env.polyfills]));
	nitro.vfs = virtualPlugin.api.modules;
	plugins.push(virtualPlugin, virtualDeps());
	const tsconfigPathsPlugin = tsconfigPaths(nitro, base.aliases);
	if (tsconfigPathsPlugin) plugins.push(tsconfigPathsPlugin);
	plugins.push(unenv(nitro, base.env));
	plugins.push(runtimeDeps(nitro));
	if (nitro.options.wasm !== false) plugins.push(unwasm(nitro.options.wasm || {}));
	plugins.push(serverMain(nitro));
	plugins.push(await importAttributes(nitro), raw());
	if (nitro.options.experimental.openAPI) plugins.push(await routeMeta(nitro));
	plugins.push(replace(base.replacements));
	if (nitro.options.node && nitro.options.noExternals !== true) {
		const isDevOrPrerender = nitro.options.dev || nitro.options.preset === "nitro-prerender";
		plugins.push(externals({
			rootDir: nitro.options.rootDir,
			conditions: nitro.options.exportConditions,
			include: nitro.options.traceDeps || [],
			exclude: [...base.noExternal],
			trace: isDevOrPrerender ? false : {
				...nitro.options.traceOpts,
				outDir: nitro.options.output.serverDir
			}
		}));
	}
	if (nitro.options.sourcemap && !nitro.options.dev) plugins.push(sourcemap({
		virtualIds: virtualPlugin.api.modules.keys(),
		minify: nitro.options.experimental.sourcemapMinify !== false
	}));
	return plugins;
}
async function withBuildPlugins(nitro, plugins) {
	const buildPlugins = await resolveBuildPlugins(nitro);
	const byEnforce = (enforce) => buildPlugins.filter((p) => p.enforce === enforce);
	return [
		...byEnforce("pre"),
		...plugins,
		...byEnforce(),
		...byEnforce("post")
	];
}
async function resolveBuildPlugins(nitro) {
	return flatPlugins(nitro.options.buildPlugins || []);
}
async function flatPlugins(options) {
	const plugins = [];
	for (const entry of options) {
		const option = await entry;
		if (Array.isArray(option)) plugins.push(...await flatPlugins(option));
		else if (option) plugins.push(option);
	}
	return plugins;
}
var virtualRe = /^(?:\0|#|virtual:)/;
var RSPACK_PLACEHOLDER_RE = /\[(id|name|runtime|(?:full|chunk|content)?hash)\]/g;
var NODE_MODULES_RE = /node_modules[/\\](?!(?:nitro|nitro-nightly)[/\\])[^.]/;
function libChunkName(id) {
	const pkgName = pathToPkgName(id);
	return pkgName ? `_libs/${pkgName}` : void 0;
}
function libChunksGroup(nitro) {
	const group = {
		test: NODE_MODULES_RE,
		name: (id) => libChunkName(id),
		entriesAware: nitro.options.experimental.entriesAwareLibChunks !== false
	};
	Object.defineProperty(group, "debugName", { value: "libs" });
	return group;
}
function pathToPkgName(path) {
	let pkgName = path.match(/.*(?:[/\\])node_modules(?:[/\\])(?<name>@[^/\\]+[/\\][^/\\]+|[^/\\.][^/\\]*)/)?.groups?.name;
	if (pkgName?.endsWith("-nightly")) pkgName = pkgName.slice(0, -8);
	return pkgName;
}
function getChunkName(chunk, nitro) {
	if (chunk.name === "rolldown-runtime") return "_runtime.mjs";
	if (chunk.name.startsWith("_libs/")) chunk = {
		...chunk,
		name: chunk.name.split("~")[0]
	};
	if (chunk.moduleIds.every((id) => NODE_MODULES_RE.test(id))) {
		const chunkName = joinPkgNames(chunk.moduleIds);
		if (chunkName.length > 30) return `${chunk.name}+[...].mjs`;
		return `_libs/${chunkName || "_"}.mjs`;
	}
	if (chunk.name.startsWith("_")) return `${chunk.name}.mjs`;
	if (chunk.moduleIds.length === 0) return `_chunks/${chunk.name}.mjs`;
	const ids = chunk.moduleIds.filter((id) => !virtualRe.test(id)).map((id) => isAbsolute$2(id) ? normalize$2(id) : id);
	if (ids.length === 0) {
		if (chunk.moduleIds.every((id) => id.includes("virtual:raw"))) return `_raw/[name].mjs`;
		return `_virtual/[name].mjs`;
	}
	if (ids.every((id) => id.endsWith(".wasm"))) return `_wasm/[name].mjs`;
	if (ids.every((id) => id.includes("vite/services"))) return `_ssr/[name].mjs`;
	if (ids.every((id) => id.startsWith(nitro.options.buildDir))) return `_build/[name].mjs`;
	const mainId = ids.at(-1);
	if (mainId) {
		const routeHandler = nitro.routing.routes.routes.flatMap((h) => h.data).find((h) => h.handler === mainId);
		if (routeHandler?.route) {
			let routePath = routeToFsPath(routeHandler.route);
			if (nitro.options.builder === "rollup") routePath = routePath.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
			else if (nitro.options.builder === "rspack") routePath = routePath.replace(RSPACK_PLACEHOLDER_RE, "_$1_");
			return `_routes/${routePath}.mjs`;
		}
		if (Object.entries(nitro.options.tasks).find(([_, task]) => task.handler === mainId)) return `_tasks/[name].mjs`;
	}
	return `_chunks/[name].mjs`;
}
function joinPkgNames(moduleIds) {
	return [...new Set(moduleIds.map((id) => pathToPkgName(id)).filter(Boolean).map((name) => name.replace(/^@/, "").replace(/[/\\]/g, "__")))].sort().join("+");
}
function routeToFsPath(route) {
	return route.split("/").slice(1).map((s) => s.replace(/^:(\w+)\(\.\*\)$/, "[...$1]").replace(/:(\w+)/g, "[$1]").replace(/\*+/g, "[...]").replace(/[^a-zA-Z0-9_.[\]]/g, "_")).join("/") || "index";
}
function findSSREntry(nitro) {
	return resolveModulePath("./entry-server", {
		from: [
			"app",
			"src",
			""
		].flatMap((dir) => [nitro.options.rootDir, ...nitro.options.scanDirs].map((base) => resolve$2(base, dir) + "/")),
		extensions: SERVICE_EXTENSIONS,
		try: true
	});
}
function checkServerEntry(nitro) {
	const ssrEntry = nitro.options.services.ssr?.entry;
	if (ssrEntry && nitro.options.serverEntry && nitro.options.serverEntry.handler === ssrEntry) {
		nitro.logger.warn(`Nitro server entry and the \`ssr\` service both set to ${prettyPath(ssrEntry)}. Use a separate SSR entry (e.g. \`src/server.ts\`).`);
		nitro.options.serverEntry = false;
	}
}
function useSSRServiceRenderer(nitro) {
	const renderer = nitro.options.renderer;
	if (renderer?.handler || renderer?.template || !nitro.options.services.ssr?.entry) return;
	(nitro.options.renderer ??= {}).handler = resolve$2(runtimeDir, "internal/routes/ssr-renderer");
	nitro.routing.sync();
}
var NEW_URL_RE = /\bnew\s+URL\s*\([\s\S]*?import\.meta\.url\b/;
var JS_ID_RE = /\.[cm]?[jt]sx?(\?.*)?$/;
var SCRIPT_RE = /\.[cm]?[jt]sx?$/;
var NON_RELATIVE_RE = /^(?:[a-z][\d+.a-z-]*:|[#/?\\])/i;
async function assetUrls(nitro, opts = {}) {
	const oxc = await importOXC({
		dir: nitro.options.rootDir,
		paths: nitro.options.deps?.paths
	});
	let referenceIds = /* @__PURE__ */ new Map();
	const emitted = /* @__PURE__ */ new Set();
	const fileNames = /* @__PURE__ */ new Set();
	return {
		name: "nitro:asset-urls",
		buildStart() {
			referenceIds = /* @__PURE__ */ new Map();
		},
		renderStart() {
			fileNames.clear();
		},
		resolveFileUrl: {
			order: "pre",
			handler({ referenceId, fileName, relativePath }) {
				if (emitted.has(referenceId)) {
					fileNames.add(fileName);
					return JSON.stringify(/^\.\.?\//.test(relativePath) ? relativePath : `./${relativePath}`);
				}
			}
		},
		generateBundle: opts.dropOtherAssets ? {
			order: "post",
			handler(_options, bundle) {
				for (const [fileName, output] of Object.entries(bundle)) if (output.type === "asset" && !fileNames.has(fileName) && !fileName.endsWith(".map") && !fileName.endsWith("ssr-manifest.json")) delete bundle[fileName];
			}
		} : void 0,
		transform: {
			filter: {
				id: {
					include: JS_ID_RE,
					exclude: [/^\0/, RESOLVED_RE]
				},
				code: NEW_URL_RE
			},
			handler(code, id) {
				if (!JS_ID_RE.test(id) || id.startsWith("\0") || RESOLVED_RE.test(id) || !NEW_URL_RE.test(code)) return;
				const filename = id.split("?")[0];
				const { program, errors } = oxc.parseSync(filename, code);
				if (errors.length > 0) {
					this.warn(`Could not parse \`${filename}\` to emit files referenced with \`new URL(..., import.meta.url)\`: ${errors[0].message}`);
					return;
				}
				const s = new MagicString$1(code);
				walkAST(program, (node) => {
					const ref = assetReference(node);
					const path = ref && resolveAssetPath(ref.url, filename);
					if (!ref || !path) return;
					let referenceId = referenceIds.get(path);
					if (!referenceId) {
						referenceId = this.emitFile({
							type: "asset",
							name: basename$2(path),
							originalFileName: path,
							source: readFileSync(path)
						});
						referenceIds.set(path, referenceId);
						emitted.add(referenceId);
					}
					this.addWatchFile(path);
					s.update(ref.node.start, ref.node.end, `import.meta.ROLLUP_FILE_URL_${referenceId}`);
				});
				if (!s.hasChanged()) return;
				return {
					code: s.toString(),
					map: s.generateMap({
						hires: true,
						source: filename
					}).toString()
				};
			}
		}
	};
}
function assetReference(node) {
	if (node.type !== "NewExpression" || node.callee.type !== "Identifier" || node.callee.name !== "URL" || node.arguments.length !== 2 || !isImportMetaURL(node.arguments[1])) return;
	const arg = node.arguments[0];
	if (arg.type === "Literal" && typeof arg.value === "string") return {
		node: arg,
		url: arg.value
	};
	if (arg.type === "TemplateLiteral" && arg.expressions.length === 0) {
		const url = arg.quasis[0]?.value.cooked;
		return url ? {
			node: arg,
			url
		} : void 0;
	}
}
function resolveAssetPath(url, importer) {
	if (!url || NON_RELATIVE_RE.test(url)) return;
	const resolved = new URL(url, pathToFileURL(importer));
	if (resolved.search || resolved.hash) return;
	const path = fileURLToPath(resolved);
	if (SCRIPT_RE.test(path) || !statSync(path, { throwIfNoEntry: false })?.isFile()) return;
	return path;
}
function isImportMetaURL(node) {
	return node.type === "MemberExpression" && !node.computed && node.object.type === "MetaProperty" && node.object.meta.name === "import" && node.object.property.name === "meta" && node.property.type === "Identifier" && node.property.name === "url";
}
async function oxc(nitro, options) {
	const { transformSync, minifySync } = await importOXC({
		dir: nitro.options.rootDir,
		paths: nitro.options.deps?.paths
	});
	if (options.minify && !minifySync) nitro.logger.warn("Skipping minification: the `rollup` builder minifies with `rolldown`. Install `rolldown` to enable it.");
	return {
		name: "nitro:oxc",
		transform: {
			filter: { id: {
				include: /^(?!.*\/node_modules\/).*\.m?[jt]sx?$/,
				exclude: RESOLVED_RE
			} },
			handler(code, id) {
				const res = transformSync(id, code, {
					sourcemap: options.sourcemap,
					tsconfig: false,
					...options.transform
				});
				if (res.errors?.length > 0) this.error(res.errors.join("\n"));
				return res;
			}
		},
		renderChunk(code, chunk) {
			if (options.minify && minifySync) return minifySync(chunk.fileName, code, {
				sourcemap: options.sourcemap,
				...typeof options.minify === "object" ? options.minify : {}
			});
		}
	};
}
export { ASSET_EXT_RE, Builder, F, L$1, MagicString, MagicString$1, NODE_MODULES_RE, OPTIONAL_RUNTIME_DEPS_RE, RESOLVED_PREFIX, RESOLVED_RE, T, U, _resolveFromPath, addClientAssetsDir, assetUrls, attachScopes, baseBuildConfig, baseBuildPlugins, basename$2, build, builtinExternals, builtins, chain, checkServerEntry, colors, compressPublicAssets, consola, copyPublicAssets, createFilter, createWatcher, dataToEsm, decodePath, deps, dirname$2, ensureDep, ensureLibDeps, ensureRuntimeDep, escapeRegExp$1, excludeSourcemapSources, extendEnv, extname$3, extractAssignedNames, findSSREntry, flatPlugins, g, getBuildInfo, getChunkName, getPrerenderMeta, glob, hash, ie, importAttributes, importDep, importOXC, importUnstorage, importVite, isAbsolute$2, isCaseInsensitiveFS, isCompressibleFile, isDepInstalled, isRuntimeImporter, join$2, joinURL, kebabCase, libChunkName, libChunksGroup, makeLegalIdentifier, missingDepError, missingRuntimeDepError, normalize$2, normalizeAliases, onWatchError, oxc, parseURL, pathRegExp, pkgDir, prepare, presetsDir, prettyPath, r$2, raw, relative$2, replace$1, require_picomatch, resolve$2, resolveAlias, resolveBuildPlugins, resolveDatabaseConnections, resolveDep, resolveFromDepPath, resolveKVDrivers, resolveKVMounts, resolveModulePath, resolveModuleURL, resolveNitroPath, resolveServiceEntry, resolveServices, resolveServicesOptions, resolveUnenv, resolveViteModuleRunner, routeMeta, runParallel, runtimeDependencies, runtimeDir, s$1, scanUnprefixedPublicAssets, setRunningVite, shims, src_default, tsconfigPaths, tsconfigPathsNoExternal, unwasm, useSSRServiceRenderer, version, virtualTemplates, viteDepPaths, viteImportOptions, walk, walkAST, withBase, withBuildPlugins, withLeadingSlash, withTrailingSlash, withoutBase, withoutLeadingSlash, withoutTrailingSlash, writeBuildInfo, writeDevBuildInfo, writeFile$1 };
