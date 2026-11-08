import { __toESM } from "../_runtime.mjs";
import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { __exportAll } from "./router-BCwh7kn0.mjs";
import { Image } from "./image-r81IHuMV.mjs";
import { VALUES } from "./site-ACj0XDsT.mjs";
import { HEADERS } from "./ssr.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { Approach } from "./Approach-Cq0RbzEO.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { getStylesheetHref, hasKeys, joinPaths, resolveManifestAssetLink, resolveManifestCssLink, rootRouteId } from "../_libs/@tanstack/react-router+[...].mjs";
import { serialize } from "../_libs/@tanstack/react-router+[2...].mjs";
import { buildDeclarationMap, buildDependencyGraph, collectIdentifiersFromNode, collectIdentifiersFromPattern, collectLocalBindingsFromStatement, configSchema$1, createRouterPluginContext, expandTransitively, extractModuleInfoFromAst, getConfig$1, getVariableDeclaratorForExpressionPath, removeModuleLevelBindings, require_picomatch, retainModuleLevelDeclarations, stripUnreferencedTopLevelExpressionStatements, tanStackRouterCodeSplitter, tanstackRouterGenerator, unwrapExportedDeclarations, unwrapExpression } from "../_libs/@tanstack/router-plugin+[...].mjs";
import { Coins, FileCheck2, Lock, ShieldCheck, UserCheck } from "../_libs/lucide-react7.mjs";
import { Scale } from "../_libs/lucide-react11.mjs";
import { _enum, _instanceof, array, boolean, custom, date, number, object, record, string, union } from "../_libs/zod.mjs";
import { basename as basename$1, dirname as dirname$1, extname as extname$1, isAbsolute as isAbsolute$1, join as join$1, posix, relative as relative$1, resolve as resolve$1 } from "../_libs/pathe.mjs";
import { resolveModulePath } from "../_libs/exsolve.mjs";
import { require_lib as require_lib$1, require_lib$4 as require_lib } from "../_libs/@babel/core+[...].mjs";
import { deadCodeElimination$1, find_referenced_identifiers_default, generateFromAst, inferFullPath, parseAst } from "../_libs/@tanstack/router-generator+[...].mjs";
import { require_source_map } from "../_libs/source-map.mjs";
import { require_lib as require_lib$2 } from "../_libs/@babel/code-frame+[...].mjs";
import { escapePath } from "../_libs/tinyglobby.mjs";
import { NodeRequest, sendNodeResponse } from "../_libs/srvx.mjs";
import { joinURL, withBase, withTrailingSlash, withoutBase } from "../_libs/ufo.mjs";
import { crawlFrameworkPkgs } from "../_libs/vitefu.mjs";
import { nitro } from "../_chunks/vite.mjs";
import { viteReactWithPreamble } from "../_libs/vitejs__plugin-react.mjs";
import { promises, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path, { basename, dirname, extname, isAbsolute, relative, resolve } from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { defineConfig, isRunnableDevEnvironment, loadEnv, normalizePath } from "vite";
import { transform } from "lightningcss";
// node_modules/.nitro/vite/services/ssr/assets/about-B_jCxFe_.js
var import_jsx_runtime = require_jsx_runtime();
var import_picomatch = /* @__PURE__ */ __toESM(require_picomatch());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_source_map = require_source_map();
var import_lib$1 = require_lib$2();
var import_lib$2 = /* @__PURE__ */ __toESM(require_lib$1());
var VIRTUAL_MODULES = {
	startManifest: "tanstack-start-manifest:v",
	serverFnResolver: "#tanstack-start-server-fn-resolver",
	pluginAdapters: "#tanstack-start-plugin-adapters"
};
var isWindows = typeof process !== "undefined" && process.platform === "win32";
var windowsSlashRE = /\\/g;
/**
* Read `build.rolldownOptions` from a build config. Vite 8 still accepts
* `build.rollupOptions` as a deprecated alias, and a user config can reach a
* plugin before Vite maps it.
*/
function getBundlerOptions(build) {
	return build?.rolldownOptions ?? build?.rollupOptions;
}
function resolveViteId(id) {
	return `\0${id}`;
}
function createIdFilter(ids) {
	return new RegExp(`^(?:${ids.map(escapeRegExp).join("|")})$`);
}
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function createLogger(prefix) {
	const label = `[${prefix}]`;
	return {
		log: (...args) => console.log(label, ...args),
		debug: (...args) => console.debug(label, ...args),
		info: (...args) => console.info(label, ...args),
		warn: (...args) => console.warn(label, ...args),
		error: (...args) => console.error(label, ...args)
	};
}
function slash(path) {
	return path.replace(windowsSlashRE, "/");
}
function normalizePath$1(id) {
	return path.posix.normalize(isWindows ? slash(id) : id);
}
var tsrConfig = configSchema$1.omit({
	autoCodeSplitting: true,
	target: true
}).partial();
var patternSchema = union([string(), _instanceof(RegExp)]);
var importProtectionBehaviorSchema = _enum(["error", "mock"]);
var importProtectionEnvRulesSchema = object({
	specifiers: array(patternSchema).optional(),
	files: array(patternSchema).optional(),
	excludeFiles: array(patternSchema).optional()
});
var importProtectionOptionsSchema = object({
	enabled: boolean().optional(),
	behavior: union([importProtectionBehaviorSchema, object({
		dev: importProtectionBehaviorSchema.optional(),
		build: importProtectionBehaviorSchema.optional()
	})]).optional(),
	/**
	* In `behavior: 'mock'`, control whether mocked imports emit a runtime
	* console diagnostic when accessed.
	*
	* - 'error': console.error(new Error(...)) (default)
	* - 'warn': console.warn(new Error(...))
	* - 'off': disable runtime diagnostics
	*/
	mockAccess: _enum([
		"error",
		"warn",
		"off"
	]).optional(),
	onViolation: custom((value) => typeof value === "function").optional(),
	include: array(patternSchema).optional(),
	exclude: array(patternSchema).optional(),
	client: importProtectionEnvRulesSchema.optional(),
	server: importProtectionEnvRulesSchema.optional(),
	ignoreImporters: array(patternSchema).optional(),
	maxTraceDepth: number().optional(),
	log: _enum(["once", "always"]).optional()
}).optional();
function parseStartConfig$1(opts, corePluginOpts, root) {
	const rawRouterOptions = (opts ?? {}).router ?? {};
	const options = tanstackStartOptionsSchema.parse(opts);
	const srcDirectory = options.srcDirectory;
	const routesDirectory = path.resolve(root, srcDirectory, rawRouterOptions.routesDirectory ?? "routes");
	const generatedRouteTree = path.resolve(root, srcDirectory, rawRouterOptions.generatedRouteTree ?? "routeTree.gen.ts");
	return {
		...options,
		router: {
			...options.router,
			...getConfig$1({
				...options.router,
				routesDirectory,
				generatedRouteTree
			}, root),
			target: corePluginOpts.framework
		}
	};
}
var pageSitemapOptionsSchema = object({
	exclude: boolean().optional(),
	priority: number().min(0).max(1).optional(),
	changefreq: _enum([
		"always",
		"hourly",
		"daily",
		"weekly",
		"monthly",
		"yearly",
		"never"
	]).optional(),
	lastmod: union([string(), date()]).optional(),
	alternateRefs: array(object({
		href: string(),
		hreflang: string()
	})).optional(),
	images: array(object({
		loc: string(),
		caption: string().optional(),
		title: string().optional()
	})).optional(),
	news: object({
		publication: object({
			name: string(),
			language: string()
		}),
		publicationDate: union([string(), date()]),
		title: string()
	}).optional()
});
var pageBaseSchema = object({
	path: string(),
	sitemap: pageSitemapOptionsSchema.optional(),
	fromCrawl: boolean().optional()
});
var pagePrerenderOptionsSchema = object({
	enabled: boolean().optional(),
	outputPath: string().optional(),
	autoSubfolderIndex: boolean().optional(),
	crawlLinks: boolean().optional(),
	retryCount: number().optional(),
	retryDelay: number().optional(),
	onSuccess: custom((value) => typeof value === "function").optional(),
	headers: record(string(), string()).optional()
});
var spaSchema = object({
	enabled: boolean().optional().default(true),
	maskPath: string().optional().default("/"),
	prerender: pagePrerenderOptionsSchema.optional().prefault({}).transform((opts) => ({
		outputPath: opts.outputPath ?? "/_shell",
		crawlLinks: false,
		retryCount: 0,
		...opts,
		enabled: true
	}))
});
var inlineCssSchema = union([boolean(), object({
	/**
	* Inline route CSS into the server-rendered HTML response.
	*
	* @experimental This option is experimental!
	*/
	enabled: boolean().optional().default(true),
	/**
	* Emit build-time templates that allow `transformAssets` to rewrite
	* `url(...)` references inside inlined CSS at runtime.
	*/
	transformAssets: boolean().optional().default(false)
})]).optional().default(false).transform((value) => {
	if (typeof value === "boolean") return {
		enabled: value,
		transformAssets: false
	};
	return value;
});
var pageSchema = pageBaseSchema.extend({ prerender: pagePrerenderOptionsSchema.optional() });
var tanstackStartOptionsObjectSchema = object({
	srcDirectory: string().optional().default("src"),
	start: object({ entry: string().optional() }).optional().prefault({}),
	router: object({
		entry: string().optional(),
		basepath: string().optional()
	}).and(tsrConfig.optional().prefault({})).optional().prefault({}),
	client: object({
		entry: string().optional(),
		base: string().optional().default("/_build")
	}).optional().prefault({}),
	server: object({
		entry: string().optional(),
		build: object({
			staticNodeEnv: boolean().optional().default(true),
			/**
			* Inline route CSS into the server-rendered HTML response.
			*
			* @experimental This option is experimental!
			*/
			inlineCss: inlineCssSchema
		}).optional().prefault({})
	}).optional().prefault({}),
	serverFns: object({
		base: string().optional().default("/_serverFn"),
		disableCsrfMiddlewareWarning: boolean().optional().default(false),
		generateFunctionId: custom((value) => typeof value === "function").optional()
	}).optional().prefault({}),
	pages: array(pageSchema).optional().default([]),
	sitemap: object({
		enabled: boolean().optional().default(true),
		host: string().optional(),
		outputPath: string().optional().default("sitemap.xml")
	}).optional(),
	prerender: object({
		enabled: boolean().optional(),
		concurrency: number().optional(),
		filter: custom((value) => typeof value === "function").optional(),
		failOnError: boolean().optional(),
		autoStaticPathsDiscovery: boolean().optional(),
		maxRedirects: number().min(0).optional()
	}).and(pagePrerenderOptionsSchema.optional()).optional(),
	dev: object({ ssrStyles: object({
		enabled: boolean().optional().default(true),
		basepath: string().optional()
	}).optional().prefault({}) }).optional().prefault({}),
	spa: spaSchema.optional(),
	importProtection: importProtectionOptionsSchema
});
var tanstackStartOptionsSchema = tanstackStartOptionsObjectSchema.optional().prefault({});
var ABOUT_IMAGE = "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/8ff216e6f_generated_ac1d3e2a.png";
function WhoWeAre() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
				children: "A coordination partner for businesses entering African markets."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 space-y-5 text-[16px] leading-[1.8] text-ink/75",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Africa Compliance supports foreign companies, investors, entrepreneurs and international businesses seeking to establish, expand or operate across African markets. Our work sits at the point where commercial ambition meets administrative reality." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That means helping clients understand what their plans require in a given market, setting out the steps involved, and coordinating the professional input and documentation those steps depend on — with a clear view of who is responsible for each part." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We are not a law firm. We do not present ourselves as providing regulated legal, tax or other reserved professional services. Where those services are required, they may be coordinated through appropriately qualified and authorised local professionals." })
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[4/3] overflow-hidden bg-sand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: ABOUT_IMAGE,
						alt: "A modern, minimalist boardroom with glass partitions and natural daylight",
						fittingType: "fill",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex items-start gap-3 border-l border-copper/50 pl-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] leading-relaxed text-ink/50",
						children: "Illustrative imagery. Offices and professional registrations are published only once confirmed."
					})
				})]
			})]
		})
	});
}
var BLOCKS = [
	{
		label: "Our purpose",
		body: "To make entering and operating in African markets more understandable for international businesses — replacing fragmented information with a structured, coordinated process."
	},
	{
		label: "Our mission",
		body: "To provide practical, well-coordinated support across market entry, business establishment and regulatory compliance, engaging appropriately qualified local professionals where regulated input is required."
	},
	{
		label: "Our vision",
		body: "To be recognised as a dependable coordination partner for businesses expanding across African markets — known for clarity, discretion and consistency rather than volume."
	}
];
function MissionVision() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-forest/10 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-16 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px bg-forest/10 md:grid-cols-3",
				children: BLOCKS.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white p-8 lg:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[12px] tracking-[0.18em] text-copper",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-[24px] leading-snug text-forest",
							children: block.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[15px] leading-[1.8] text-ink/70",
							children: block.body
						})
					]
				}, block.label))
			})
		})
	});
}
function ValuesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-20 lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
					children: "The standards we intend to be measured against."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
				children: VALUES.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-forest/15 pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[12px] tracking-[0.18em] text-copper",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-[20px] leading-snug text-forest",
							children: value.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2.5 text-[14.5px] leading-[1.75] text-ink/65",
							children: value.body
						})
					]
				}, value.title))
			})]
		})
	});
}
var STANDARDS = [
	{
		icon: Scale,
		title: "Reserved work stays with authorised professionals",
		body: "Legal opinions, drafting, representation, tax advice, audit and statutory accounting are provided by practitioners registered for that work in the relevant jurisdiction, engaged by you directly. We coordinate the sequence and the documentation around it."
	},
	{
		icon: UserCheck,
		title: "Client due diligence before any instruction",
		body: "We establish identity, corporate structure, ultimate beneficial ownership and the purpose of the engagement, and we screen for sanctions and political exposure before substantive work begins."
	},
	{
		icon: ShieldCheck,
		title: "Zero tolerance on bribery",
		body: "No facilitation payments, no informal payments, no inducements to influence an official decision. Government fees are paid through official channels and supported by receipts."
	},
	{
		icon: Lock,
		title: "Confidentiality and data protection",
		body: "Access is limited to those working on your matter, identity and financial documents move under encryption, and cross-border transfers follow the conditions required in each jurisdiction."
	},
	{
		icon: FileCheck2,
		title: "Conflicts disclosed, not managed silently",
		body: "We keep a conflicts register and disclose relevant relationships with professional partners. Referral arrangements affecting a recommendation are stated openly."
	},
	{
		icon: Coins,
		title: "Client funds are not held",
		body: "We do not hold client money. Government and professional partner fees are paid by you directly wherever the process allows it."
	}
];
function Standards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-forest/10 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-20 lg:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
						children: "Governance built before the first client, not after."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-[15.5px] leading-[1.8] text-ink/65",
						children: "Coordination across several jurisdictions concentrates risk: in what is said, in who is authorised to say it, in the money that moves, and in the information that travels between parties. These are the controls we work to."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-px border border-forest/12 bg-forest/12 sm:grid-cols-2 lg:grid-cols-3",
					children: STANDARDS.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 lg:p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 place-items-center border border-forest/15 text-copper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-[18px] leading-snug text-forest",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-[14px] leading-[1.75] text-ink/65",
								children: body
							})
						]
					}, title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink/45",
					children: "Our written policies cover anti-money laundering and client due diligence, anti-bribery and corruption, sanctions screening, data protection and information security, conflicts of interest, client confidentiality, complaints handling, partner due diligence, engagement terms and records retention. Policy documents are available to clients on request during onboarding."
				})
			]
		})
	});
}
var currentDir$1 = posix.dirname(fileURLToPath(import.meta.url));
var reactStartPluginDir = currentDir$1;
var defaultEntryDir = posix.resolve(currentDir$1, "..", "..", "plugin", "default-entry");
var reactStartDefaultEntryPaths = {
	client: posix.resolve(defaultEntryDir, "client.tsx"),
	server: posix.resolve(defaultEntryDir, "server.ts"),
	start: posix.resolve(defaultEntryDir, "start.ts")
};
var START_ENVIRONMENT_NAMES = {
	server: "ssr",
	client: "client"
};
var VITE_ENVIRONMENT_NAMES = START_ENVIRONMENT_NAMES;
var ENTRY_POINTS = {
	client: "virtual:tanstack-start-client-entry",
	server: "virtual:tanstack-start-server-entry",
	start: "#tanstack-start-entry",
	router: "#tanstack-router-entry"
};
var DEV_CLIENT_ENTRY = "virtual:tanstack-start-dev-client-entry";
var SERVER_FN_LOOKUP = "server-fn-module-lookup";
var TRANSFORM_ID_REGEX = [/\.[cm]?[tj]sx?($|\?)/];
function createVirtualModule(opts) {
	const resolvedId = resolveViteId(opts.moduleId.replaceAll("#", "%23"));
	return {
		name: opts.name,
		apply: opts.apply,
		applyToEnvironment: opts.applyToEnvironment,
		enforce: opts.enforce,
		sharedDuringBuild: opts.sharedDuringBuild,
		resolveId: {
			filter: { id: createIdFilter([opts.moduleId]) },
			handler(id) {
				if (id === opts.moduleId) return resolvedId;
			}
		},
		load: {
			filter: { id: createIdFilter([resolvedId]) },
			handler(id) {
				if (id !== resolvedId) return;
				return opts.load.call(this, id);
			}
		}
	};
}
function resolveModule(opts) {
	let baseName = opts.baseName;
	if (!baseName.startsWith("./")) baseName = `./${baseName}`;
	return resolveModulePath(baseName, {
		from: opts.from,
		extensions: [
			".ts",
			".js",
			".mts",
			".mjs",
			".tsx",
			".jsx"
		],
		try: true
	});
}
function resolveEntry$1(opts) {
	let resolveOptions;
	if (!opts.configuredEntry) resolveOptions = {
		baseName: opts.defaultEntry,
		from: opts.resolvedSrcDirectory
	};
	else resolveOptions = {
		baseName: opts.configuredEntry,
		from: opts.resolvedSrcDirectory
	};
	const resolvedEntry = resolveModule(resolveOptions);
	if (opts.required && !resolvedEntry) throw new Error(`Could not resolve entry for ${opts.type}: ${resolveOptions.baseName} in ${resolveOptions.from}`);
	return resolvedEntry;
}
function normalizePublicBase(base) {
	const resolvedBase = base ?? "/";
	if (URL.canParse(resolvedBase)) return resolvedBase;
	return joinPaths([
		"/",
		resolvedBase,
		"/"
	]);
}
function deriveRouterBasepath(opts) {
	if (opts.configuredBasepath !== void 0) return opts.configuredBasepath;
	if (URL.canParse(opts.publicBase)) return "/";
	return opts.publicBase.replace(/^\/|\/$/g, "");
}
function shouldRewriteDevBasepath(opts) {
	if (opts.command !== "serve" || opts.middlewareMode) return false;
	return !joinPaths([
		"/",
		opts.routerBasepath,
		"/"
	]).startsWith(joinPaths([
		"/",
		opts.publicBase,
		"/"
	]));
}
function createNormalizedBasePaths(opts) {
	return {
		publicBase: opts.publicBase,
		assetBase: {
			dev: opts.publicBase,
			build: opts.publicBase
		}
	};
}
function createNormalizedOutputDirectories(opts) {
	return {
		client: opts.client,
		server: opts.server
	};
}
function createServerFnBasePath(opts) {
	return joinPaths([
		"/",
		opts.routerBasepath,
		opts.serverFnBase,
		"/"
	]);
}
function resolveStartEntryPlan(opts) {
	const srcDirectory = join$1(opts.root, opts.startConfig.srcDirectory);
	const startFilePath = resolveEntry$1({
		type: "start entry",
		configuredEntry: opts.startConfig.start.entry,
		defaultEntry: "start",
		resolvedSrcDirectory: srcDirectory,
		required: false
	});
	const routerFilePath = resolveEntry$1({
		type: "router entry",
		configuredEntry: opts.startConfig.router.entry,
		defaultEntry: "router",
		resolvedSrcDirectory: srcDirectory,
		required: true
	});
	const clientEntryPath = resolveEntry$1({
		type: "client entry",
		configuredEntry: opts.startConfig.client.entry,
		defaultEntry: "client",
		resolvedSrcDirectory: srcDirectory,
		required: false
	});
	const serverEntryPath = resolveEntry$1({
		type: "server entry",
		configuredEntry: opts.startConfig.server.entry,
		defaultEntry: "server",
		resolvedSrcDirectory: srcDirectory,
		required: false
	});
	return {
		srcDirectory,
		startFilePath,
		routerFilePath,
		entryPaths: {
			client: clientEntryPath ?? opts.defaultEntryPaths.client,
			server: serverEntryPath ?? opts.defaultEntryPaths.server,
			start: startFilePath ?? opts.defaultEntryPaths.start,
			router: routerFilePath
		}
	};
}
function createStartConfigContext(opts) {
	const resolvedStartConfig = {
		root: "",
		startFilePath: void 0,
		routerFilePath: "",
		srcDirectory: "",
		basePaths: {
			publicBase: "",
			assetBase: {
				dev: "",
				build: ""
			}
		},
		outputDirectories: {
			client: "",
			server: ""
		}
	};
	let startConfig = null;
	let resolvedEntryPlanCache;
	function requireRoot() {
		if (!resolvedStartConfig.root) throw new Error(`Cannot get config before root is resolved`);
		return resolvedStartConfig.root;
	}
	function getStartConfig() {
		if (!startConfig) startConfig = opts.parseConfig(opts.startPluginOpts, { framework: opts.corePluginOpts.framework }, requireRoot());
		return startConfig;
	}
	function getResolvedEntryPlan() {
		if (resolvedEntryPlanCache) return resolvedEntryPlanCache;
		resolvedEntryPlanCache = resolveStartEntryPlan({
			root: requireRoot(),
			startConfig: getStartConfig(),
			defaultEntryPaths: opts.corePluginOpts.defaultEntryPaths
		});
		Object.assign(resolvedStartConfig, {
			srcDirectory: resolvedEntryPlanCache.srcDirectory,
			startFilePath: resolvedEntryPlanCache.startFilePath,
			routerFilePath: resolvedEntryPlanCache.routerFilePath
		});
		return resolvedEntryPlanCache;
	}
	const getConfig = () => {
		const startConfig = getStartConfig();
		getResolvedEntryPlan();
		return {
			startConfig,
			resolvedStartConfig
		};
	};
	function resolveEntries() {
		return getResolvedEntryPlan();
	}
	return {
		resolvedStartConfig,
		getConfig,
		resolveEntries
	};
}
function applyResolvedBaseAndOutput(opts) {
	opts.resolvedStartConfig.root = opts.root;
	opts.resolvedStartConfig.basePaths = createNormalizedBasePaths({ publicBase: opts.publicBase });
	opts.resolvedStartConfig.outputDirectories = createNormalizedOutputDirectories({
		client: opts.clientOutputDirectory,
		server: opts.serverOutputDirectory
	});
}
function applyResolvedRouterBasepath(opts) {
	const routerBasepath = deriveRouterBasepath({
		configuredBasepath: opts.startConfig.router.basepath,
		publicBase: opts.resolvedStartConfig.basePaths.publicBase
	});
	opts.startConfig.router.basepath = routerBasepath;
	return routerBasepath;
}
/** Checks for a query parameter without rewriting the opaque module ID. */
function hasIdQueryFlag(id, flag) {
	const queryIndex = id.indexOf("?");
	if (queryIndex === -1) return false;
	return new URLSearchParams(id.slice(queryIndex + 1)).has(flag);
}
/** Appends an owned query flag without normalizing the existing query. */
function appendIdQueryFlag(id, flag) {
	if (!id.includes("?")) return `${id}?${flag}`;
	return `${id}${id.endsWith("&") ? "" : "&"}${flag}`;
}
/** Removes the owned query flag appended by {@link appendIdQueryFlag}. */
function removeIdQueryFlag(id, flag) {
	for (const separator of ["?", "&"]) {
		const suffix = `${separator}${flag}`;
		if (id.endsWith(suffix)) return id.slice(0, -suffix.length);
	}
	return id;
}
var MOCK_MODULE_ID = "tanstack-start-import-protection:mock";
var MOCK_BUILD_PREFIX = "tanstack-start-import-protection:mock:build:";
var MOCK_EDGE_PREFIX = "tanstack-start-import-protection:mock-edge:";
var MOCK_RUNTIME_PREFIX = "tanstack-start-import-protection:mock-runtime:";
var MARKER_PREFIX = "tanstack-start-import-protection:marker:";
var IMPORT_PROTECTION_DEBUG = process.env.TSR_IMPORT_PROTECTION_DEBUG === "1" || process.env.TSR_IMPORT_PROTECTION_DEBUG === "true";
var IMPORT_PROTECTION_DEBUG_FILTER = process.env.TSR_IMPORT_PROTECTION_DEBUG_FILTER;
var KNOWN_SOURCE_EXTENSIONS = /* @__PURE__ */ new Set([
	".ts",
	".tsx",
	".mts",
	".cts",
	".js",
	".jsx",
	".mjs",
	".cjs",
	".json"
]);
/** Vite's browser-visible prefix for virtual modules (replaces `\0`). */
var VITE_BROWSER_VIRTUAL_PREFIX = "/@id/__x00__";
function dedupePatterns(patterns) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const p of patterns) {
		const key = typeof p === "string" ? `s:${p}` : `r:${p.toString()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(p);
	}
	return out;
}
function isFileExcluded(relativePath, matchers) {
	return matchers.excludeFiles.length > 0 && matchers.excludeFiles.some((matcher) => matcher.test(relativePath));
}
function checkFileDenial(relativePath, matchers) {
	if (isFileExcluded(relativePath, matchers)) return;
	return matchers.files.find((matcher) => matcher.test(relativePath));
}
function dedupeViolationKey(info) {
	return `${info.type}:${info.importer}:${info.specifier}:${info.resolved ?? ""}`;
}
/** Strip both `?query` and `#hash` from a module ID. */
function stripQueryAndHash(id) {
	const q = id.indexOf("?");
	const h = id.indexOf("#");
	if (q === -1 && h === -1) return id;
	if (q === -1) return id.slice(0, h);
	if (h === -1) return id.slice(0, q);
	return id.slice(0, Math.min(q, h));
}
/**
* Strip Vite query/hash parameters and normalize the path in one step.
*
* Results are memoized because the same module IDs are processed many
* times across resolveId, transform, and trace-building hooks.
*/
var normalizeFilePathCache = /* @__PURE__ */ new Map();
function normalizeFilePath(id) {
	let result = normalizeFilePathCache.get(id);
	if (result === void 0) {
		result = normalizePath$1(stripQueryAndHash(id));
		normalizeFilePathCache.set(id, result);
	}
	return result;
}
/** Clear the memoization cache (call from buildStart to bound growth). */
function clearNormalizeFilePathCache() {
	normalizeFilePathCache.clear();
}
/** Get a value from a Map, creating it with `factory` if absent. */
function getOrCreate(map, key, factory) {
	let value = map.get(key);
	if (value === void 0) {
		value = factory();
		map.set(key, value);
	}
	return value;
}
/** Make a path relative to `root`, keeping non-rooted paths as-is. */
function relativizePath(p, root) {
	if (!p.startsWith(root)) return p;
	const ch = p.charCodeAt(root.length);
	if (ch !== 47 && !Number.isNaN(ch)) return p;
	return ch === 47 ? p.slice(root.length + 1) : p.slice(root.length);
}
/** Log import-protection debug output when debug mode is enabled. */
function debugLog(...args) {
	if (!IMPORT_PROTECTION_DEBUG) return;
	console.warn("[import-protection:debug]", ...args);
}
/** Check if any value matches the configured debug filter (if present). */
function matchesDebugFilter(...values) {
	const debugFilter = IMPORT_PROTECTION_DEBUG_FILTER;
	if (!debugFilter) return true;
	return values.some((v) => v.includes(debugFilter));
}
/** Strip `?query` (but not `#hash`) from a module ID. */
function stripQuery(id) {
	const queryIndex = id.indexOf("?");
	return queryIndex === -1 ? id : id.slice(0, queryIndex);
}
function withoutKnownExtension(id) {
	const ext = extname(id);
	return KNOWN_SOURCE_EXTENSIONS.has(ext) ? id.slice(0, -ext.length) : id;
}
/**
* Check whether `filePath` is contained inside `directory` using a
* boundary-safe comparison.  A naïve `filePath.startsWith(directory)`
* would incorrectly treat `/app/src2/foo.ts` as inside `/app/src`.
*/
function isInsideDirectory(filePath, directory) {
	const rel = relative(resolve(directory), resolve(filePath));
	return rel.length > 0 && !rel.startsWith("..") && !isAbsolute(rel);
}
/**
* Decide whether a violation should be deferred for later verification
* rather than reported immediately.
*
* Build mode: always defer — generateBundle checks tree-shaking.
* Dev mock mode: always defer — edge-survival verifies whether the Start
*   compiler strips the import (factory-safe pattern).  All violation
*   types and specifier formats are handled uniformly by the
*   edge-survival mechanism in processPendingViolations.
* Dev error mode: never defer — throw immediately (no mock fallback).
*/
function shouldDeferViolation(opts) {
	return opts.isBuild || opts.isDevMock;
}
function buildSourceCandidates(source, resolved, root) {
	const candidates = /* @__PURE__ */ new Set();
	const push = (value) => {
		if (!value) return;
		candidates.add(value);
		candidates.add(stripQuery(value));
		candidates.add(withoutKnownExtension(stripQuery(value)));
	};
	push(source);
	if (resolved) {
		push(resolved);
		const relativeResolved = relativizePath(resolved, root);
		push(relativeResolved);
		push(`./${relativeResolved}`);
		push(`/${relativeResolved}`);
	}
	return candidates;
}
function buildResolutionCandidates(id) {
	const normalized = normalizeFilePath(id);
	const stripped = stripQuery(normalized);
	return [.../* @__PURE__ */ new Set([
		id,
		normalized,
		stripped
	])];
}
function canonicalizeResolvedId(id, root, resolveExtensionlessAbsoluteId) {
	let normalized = normalizeFilePath(stripQuery(id));
	if (!isAbsolute(normalized) && !normalized.startsWith(".") && !normalized.startsWith("\0") && !/^[a-zA-Z]+:/.test(normalized)) normalized = normalizeFilePath(resolve(root, normalized));
	return resolveExtensionlessAbsoluteId(normalized);
}
/**
* Per-environment reverse import graph.
* Maps a resolved module id to the set of modules that import it.
*/
var ImportGraph = class {
	/**
	* resolvedId -> Map<importer, specifier>
	*
	* We use a Map instead of a Set of objects so edges dedupe correctly.
	*/
	reverseEdges = /* @__PURE__ */ new Map();
	/**
	* Forward-edge index: importer -> Set<resolvedId>.
	*
	* Maintained alongside reverseEdges so that {@link invalidate} can remove
	* all outgoing edges for a file in O(outgoing-edges) instead of scanning
	* every reverse-edge map in the graph.
	*/
	forwardEdges = /* @__PURE__ */ new Map();
	entries = /* @__PURE__ */ new Set();
	addEdge(resolved, importer, specifier) {
		getOrCreate(this.reverseEdges, resolved, () => /* @__PURE__ */ new Map()).set(importer, specifier);
		getOrCreate(this.forwardEdges, importer, () => /* @__PURE__ */ new Set()).add(resolved);
	}
	/** Convenience for tests/debugging. */
	getEdges(resolved) {
		const importers = this.reverseEdges.get(resolved);
		if (!importers) return void 0;
		const out = /* @__PURE__ */ new Set();
		for (const [importer, specifier] of importers) out.add({
			importer,
			specifier
		});
		return out;
	}
	addEntry(id) {
		this.entries.add(id);
	}
	clear() {
		this.reverseEdges.clear();
		this.forwardEdges.clear();
		this.entries.clear();
	}
	invalidate(id) {
		const targets = this.forwardEdges.get(id);
		if (targets) {
			for (const resolved of targets) this.reverseEdges.get(resolved)?.delete(id);
			this.forwardEdges.delete(id);
		}
		this.reverseEdges.delete(id);
	}
};
/**
* BFS from a node upward through reverse edges to find the shortest
* path to an entry module.
*/
function buildTrace(graph, startNode, maxDepth = 20) {
	const visited = /* @__PURE__ */ new Set([startNode]);
	const depthByNode = /* @__PURE__ */ new Map([[startNode, 0]]);
	const down = /* @__PURE__ */ new Map();
	const queue = [startNode];
	let qi = 0;
	let root = null;
	while (qi < queue.length) {
		const node = queue[qi++];
		const depth = depthByNode.get(node);
		const importers = graph.reverseEdges.get(node);
		if (node !== startNode) {
			if (graph.entries.has(node) || !importers || importers.size === 0) {
				root = node;
				break;
			}
		}
		if (depth >= maxDepth) continue;
		if (!importers || importers.size === 0) continue;
		for (const [importer, specifier] of importers) {
			if (visited.has(importer)) continue;
			visited.add(importer);
			depthByNode.set(importer, depth + 1);
			down.set(importer, {
				next: node,
				specifier
			});
			queue.push(importer);
		}
	}
	if (!root) root = startNode;
	const trace = [];
	let current = root;
	for (let i = 0; i <= maxDepth + 1; i++) {
		const link = down.get(current);
		trace.push({
			file: current,
			specifier: link?.specifier
		});
		if (!link) break;
		current = link.next;
	}
	return trace;
}
/**
* Suggestion strings for server-only code leaking into client environments.
* Used by both `formatViolation` (terminal) and runtime mock modules (browser).
*/
var CLIENT_ENV_SUGGESTIONS = [
	"Use createServerFn().handler(() => ...) to keep the logic on the server and call it from the client via an RPC bridge",
	"Use createServerOnlyFn(() => ...) to mark it as server-only (it will throw if accidentally called from the client)",
	"Use createIsomorphicFn().client(() => ...).server(() => ...) to provide separate client and server implementations",
	"Move the server-only import out of this file into a separate .server.ts module that is not imported by any client code"
];
/**
* Suggestion strings for client-only code leaking into server environments.
* The JSX-specific suggestion is conditionally prepended by `formatViolation`.
*/
var SERVER_ENV_SUGGESTIONS = [
	"Use createClientOnlyFn(() => ...) to mark it as client-only (returns undefined on the server)",
	"Use createIsomorphicFn().client(() => ...).server(() => ...) to provide separate client and server implementations",
	"Move the client-only import out of this file into a separate .client.ts module that is not imported by any server code"
];
function formatViolation(info, root) {
	const rel = (p) => relativizePath(p, root);
	const relLoc = (p, loc) => {
		const r = rel(p);
		const file = loc?.file ? rel(loc.file) : r;
		return loc ? `${file}:${loc.line}:${loc.column}` : r;
	};
	const relTraceStep = (step) => {
		const file = rel(step.file);
		if (step.line == null) return file;
		const col = step.column ?? 1;
		return `${file}:${step.line}:${col}`;
	};
	const lines = [];
	lines.push(``);
	lines.push(`[import-protection] Import denied in ${info.envType} environment`);
	lines.push(``);
	if (info.type === "specifier") lines.push(`  Denied by specifier pattern: ${String(info.pattern)}`);
	else if (info.type === "file") lines.push(`  Denied by file pattern: ${String(info.pattern)}`);
	else lines.push(`  Denied by marker: module is restricted to the opposite environment`);
	lines.push(`  Importer: ${relLoc(info.importer, info.importerLoc)}`);
	lines.push(`  Import: "${rel(info.specifier)}"`);
	if (info.resolved) lines.push(`  Resolved: ${rel(info.resolved)}`);
	if (info.trace.length > 0) {
		lines.push(``);
		lines.push(`  Trace:`);
		for (let i = 0; i < info.trace.length; i++) {
			const step = info.trace[i];
			const tag = i === 0 ? " (entry)" : "";
			const spec = step.specifier ? ` (import "${rel(step.specifier)}")` : "";
			lines.push(`    ${i + 1}. ${relTraceStep(step)}${tag}${spec}`);
		}
	}
	if (info.snippet) {
		lines.push(``);
		lines.push(`  Code:`);
		for (const snippetLine of info.snippet.lines) lines.push(snippetLine);
		lines.push(``);
		lines.push(`  ${rel(info.snippet.location)}`);
	}
	lines.push(``);
	if (info.envType === "client") {
		lines.push(`  Suggestions:`);
		for (const s of CLIENT_ENV_SUGGESTIONS) lines.push(`    - ${s}`);
	} else {
		const snippetText = info.snippet?.lines.join("\n") ?? "";
		const looksLikeJsx = /<[A-Z]/.test(snippetText) || /\{.*\(.*\).*\}/.test(snippetText) && /</.test(snippetText);
		lines.push(`  Suggestions:`);
		if (looksLikeJsx) lines.push(`    - Wrap the JSX in <ClientOnly fallback={<Loading />}>...</ClientOnly> so it only renders in the browser after hydration`);
		for (const s of SERVER_ENV_SUGGESTIONS) lines.push(`    - ${s}`);
	}
	lines.push(``);
	return lines.join("\n");
}
var frameworks = [
	"react",
	"solid",
	"vue"
];
/**
* Returns the default import protection rules.
*
* All three framework variants are always included so that, e.g., a React
* project also denies `@tanstack/solid-start/server` imports.
*/
function getDefaultImportProtectionRules() {
	return {
		client: {
			specifiers: frameworks.map((fw) => `@tanstack/${fw}-start/server`),
			files: ["**/*.server.*"],
			excludeFiles: ["**/node_modules/**"]
		},
		server: {
			specifiers: [],
			files: ["**/*.client.*"],
			excludeFiles: ["**/node_modules/**"]
		}
	};
}
/**
* Marker module specifiers that restrict a file to a specific environment.
*/
function getMarkerSpecifiers() {
	return {
		serverOnly: frameworks.map((fw) => `@tanstack/${fw}-start/server-only`),
		clientOnly: frameworks.map((fw) => `@tanstack/${fw}-start/client-only`)
	};
}
var globLikePatternRE = /[*?![\]{}()]/;
function isLiteralMatcherPattern(pattern) {
	return !globLikePatternRE.test(pattern);
}
/**
* Compile a Pattern (string glob or RegExp) into a fast test function.
* String patterns use picomatch for full glob support (**, *, ?, braces, etc.).
* RegExp patterns are used as-is.
*/
function compileMatcher(pattern) {
	if (pattern instanceof RegExp) return {
		pattern,
		test: (value) => {
			pattern.lastIndex = 0;
			return pattern.test(value);
		}
	};
	if (isLiteralMatcherPattern(pattern)) return {
		pattern,
		literal: pattern,
		test: (value) => value === pattern
	};
	return {
		pattern,
		test: (0, import_picomatch.default)(pattern, { dot: true })
	};
}
function compileMatchers(patterns) {
	return patterns.map(compileMatcher);
}
function matchesAny(value, matchers) {
	for (const matcher of matchers) if (matcher.test(value)) return matcher;
}
function getImportProtectionRelativePath(root, absolutePath) {
	return relativizePath(normalizeFilePath(absolutePath), root);
}
function getImportProtectionEnvType(config, envName) {
	return config.envTypeMap.get(envName) ?? "server";
}
function getImportProtectionRulesForEnvironment(config, envName) {
	return getImportProtectionEnvType(config, envName) === "client" ? config.compiledRules.client : config.compiledRules.server;
}
function shouldCheckImportProtectionImporter(config, importer, cache) {
	const normalizedImporter = normalizeFilePath(importer);
	if (cache) {
		const cached = cache.get(normalizedImporter);
		if (cached !== void 0) return cached;
	}
	const relativePath = relativizePath(normalizedImporter, config.root);
	let result;
	if (config.excludeMatchers.length > 0 && matchesAny(relativePath, config.excludeMatchers) || config.ignoreImporterMatchers.length > 0 && matchesAny(relativePath, config.ignoreImporterMatchers)) result = false;
	else if (config.includeMatchers.length > 0) result = !!matchesAny(relativePath, config.includeMatchers);
	else if (config.srcDirectory) result = isInsideDirectory(normalizedImporter, config.srcDirectory);
	else result = true;
	cache?.set(normalizedImporter, result);
	return result;
}
function mayContainImportOrExport(code) {
	return code.includes("import") || code.includes("export");
}
function makeTransientResult(code, filename, perf) {
	const result = {
		code,
		filename,
		map: void 0,
		originalCode: void 0
	};
	if (perf) result.perf = perf;
	return result;
}
function getOrParseAst(result) {
	if (result.parsedAst) {
		result.perf?.count("analysis.parseAst.cached");
		return result.parsedAst;
	}
	const startedAt = result.perf ? performance.now() : 0;
	result.perf?.count("analysis.parseAst.calls");
	try {
		const ast = parseAst({
			code: result.code,
			filename: result.filename
		});
		result.parsedAst = ast;
		return ast;
	} finally {
		if (result.perf) result.perf.time("analysis.parseAst", startedAt);
	}
}
function getModuleExportName$1(node) {
	return import_lib.isIdentifier(node) ? node.name : node.value;
}
function getStringLiteralValueStart(node) {
	if (node.start == null) return -1;
	const raw = node.extra?.raw;
	if (typeof raw === "string" && (raw.startsWith("'") || raw.startsWith("\""))) return node.start + 1;
	return node.start;
}
function isTypeOnlyImportDeclaration(node) {
	if (node.importKind === "type") return true;
	if (node.specifiers.length === 0) return false;
	return node.specifiers.every((specifier) => import_lib.isImportSpecifier(specifier) && specifier.importKind === "type");
}
function isTypeOnlyExportNamedDeclaration(node) {
	if (node.exportKind === "type") return true;
	if (!node.source || node.declaration || node.specifiers.length === 0) return false;
	return node.specifiers.every((specifier) => import_lib.isExportSpecifier(specifier) && specifier.exportKind === "type");
}
function collectIdentifiersFromPattern$1(pattern, add) {
	if (import_lib.isIdentifier(pattern)) add(pattern.name);
	else if (import_lib.isObjectPattern(pattern)) for (const prop of pattern.properties) if (import_lib.isRestElement(prop)) collectIdentifiersFromPattern$1(prop.argument, add);
	else collectIdentifiersFromPattern$1(prop.value, add);
	else if (import_lib.isArrayPattern(pattern)) {
		for (const elem of pattern.elements) if (elem) collectIdentifiersFromPattern$1(elem, add);
	} else if (import_lib.isAssignmentPattern(pattern)) collectIdentifiersFromPattern$1(pattern.left, add);
	else if (import_lib.isRestElement(pattern)) collectIdentifiersFromPattern$1(pattern.argument, add);
}
function isValidExportName(name) {
	if (name === "default" || name.length === 0) return false;
	const first = name.charCodeAt(0);
	if (!(first >= 65 && first <= 90 || first >= 97 && first <= 122 || first === 95 || first === 36)) return false;
	for (let i = 1; i < name.length; i++) {
		const ch = name.charCodeAt(i);
		if (!(ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57 || ch === 95 || ch === 36)) return false;
	}
	return true;
}
function buildImportAnalysis(result) {
	const ast = getOrParseAst(result);
	const importSourcesInOrder = [];
	const importSpecifierLocationIndex = /* @__PURE__ */ new Map();
	const importBindingsBySource = /* @__PURE__ */ new Map();
	const memberBindingSources = /* @__PURE__ */ new Map();
	const mockNamesBySource = /* @__PURE__ */ new Map();
	const namedExports = /* @__PURE__ */ new Set();
	const getBindingInfo = (source) => getOrCreate(importBindingsBySource, source, () => ({ importedLocalNames: /* @__PURE__ */ new Set() }));
	const addSpecifierLocation = (node) => {
		importSourcesInOrder.push(node.value);
		const index = getStringLiteralValueStart(node);
		if (index === -1) return;
		const prev = importSpecifierLocationIndex.get(node.value);
		if (prev == null || index < prev) importSpecifierLocationIndex.set(node.value, index);
	};
	const addMockName = (source, name) => {
		if (name === "default" || name.length === 0) return;
		getOrCreate(mockNamesBySource, source, () => /* @__PURE__ */ new Set()).add(name);
	};
	const addMemberBinding = (localName, source) => {
		getOrCreate(memberBindingSources, localName, () => /* @__PURE__ */ new Set()).add(source);
	};
	const addNamedExport = (name) => {
		if (name !== "default" && name.length > 0) namedExports.add(name);
	};
	const visit = (node) => {
		if (import_lib.isImportDeclaration(node)) {
			if (!isTypeOnlyImportDeclaration(node)) {
				addSpecifierLocation(node.source);
				const source = node.source.value;
				const bindingInfo = getBindingInfo(source);
				for (const specifier of node.specifiers) {
					if (import_lib.isImportNamespaceSpecifier(specifier)) {
						bindingInfo.importedLocalNames.add(specifier.local.name);
						addMemberBinding(specifier.local.name, source);
						continue;
					}
					if (import_lib.isImportDefaultSpecifier(specifier)) {
						bindingInfo.importedLocalNames.add(specifier.local.name);
						addMemberBinding(specifier.local.name, source);
						continue;
					}
					if (!import_lib.isImportSpecifier(specifier)) continue;
					if (specifier.importKind === "type") continue;
					bindingInfo.importedLocalNames.add(specifier.local.name);
					const importedName = getModuleExportName$1(specifier.imported);
					if (importedName !== "default") addMockName(source, importedName);
				}
			}
		} else if (import_lib.isExportNamedDeclaration(node)) {
			const isTypeOnly = isTypeOnlyExportNamedDeclaration(node);
			if (!isTypeOnly && node.source && import_lib.isStringLiteral(node.source)) addSpecifierLocation(node.source);
			if (!isTypeOnly && node.source?.value) {
				const source = node.source.value;
				for (const specifier of node.specifiers) {
					if (!import_lib.isExportSpecifier(specifier)) continue;
					if (specifier.exportKind === "type") continue;
					addMockName(source, getModuleExportName$1(specifier.local));
				}
			}
			if (!isTypeOnly) {
				if (node.declaration) {
					const decl = node.declaration;
					if (import_lib.isFunctionDeclaration(decl) || import_lib.isClassDeclaration(decl)) {
						if (decl.id?.name) addNamedExport(decl.id.name);
					} else if (import_lib.isVariableDeclaration(decl)) for (const d of decl.declarations) collectIdentifiersFromPattern$1(d.id, addNamedExport);
				}
				for (const specifier of node.specifiers) {
					if (!import_lib.isExportSpecifier(specifier)) continue;
					if (specifier.exportKind === "type") continue;
					const exportedName = getModuleExportName$1(specifier.exported);
					addNamedExport(exportedName);
				}
			}
		} else if (import_lib.isExportAllDeclaration(node)) {
			if (node.exportKind !== "type") addSpecifierLocation(node.source);
		} else if (import_lib.isImportExpression(node)) {
			if (import_lib.isStringLiteral(node.source)) addSpecifierLocation(node.source);
		} else if (import_lib.isCallExpression(node) && import_lib.isImport(node.callee)) {
			const sourceNode = node.arguments[0];
			if (import_lib.isStringLiteral(sourceNode)) addSpecifierLocation(sourceNode);
		} else if (import_lib.isMemberExpression(node) || import_lib.isOptionalMemberExpression(node)) {
			const object = node.object;
			if (import_lib.isIdentifier(object)) {
				const sources = memberBindingSources.get(object.name);
				if (sources) {
					const property = node.property;
					for (const source of sources) if (!node.computed && import_lib.isIdentifier(property)) addMockName(source, property.name);
					else if (node.computed && import_lib.isStringLiteral(property)) addMockName(source, property.value);
				}
			}
		}
		const keys = import_lib.VISITOR_KEYS[node.type];
		if (!keys) return;
		for (const key of keys) {
			const child = node[key];
			if (Array.isArray(child)) {
				for (const item of child) if (item && typeof item === "object" && "type" in item) visit(item);
			} else if (child && typeof child === "object" && "type" in child) visit(child);
		}
	};
	visit(ast.program);
	const mockExportNamesBySource = /* @__PURE__ */ new Map();
	for (const [source, names] of mockNamesBySource) mockExportNamesBySource.set(source, Array.from(names).sort());
	const lineIndex = result.lineIndex ?? buildLineIndex(result.code);
	result.lineIndex = lineIndex;
	return {
		ast,
		lineIndex,
		importSourcesInOrder,
		importSpecifierLocationIndex,
		importBindingsBySource,
		mockExportNamesBySource,
		namedExports: Array.from(namedExports).sort(),
		usageByKey: /* @__PURE__ */ new Map()
	};
}
function getOrCreateImportAnalysis(result) {
	if (!result.analysis) result.analysis = buildImportAnalysis(result);
	return result.analysis;
}
function getImportSourcesFromResult(result) {
	if (!mayContainImportOrExport(result.code)) return [];
	return getOrCreateImportAnalysis(result).importSourcesInOrder;
}
function getImportSpecifierLocationFromResult(result, source) {
	return getOrCreateImportAnalysis(result).importSpecifierLocationIndex.get(source) ?? -1;
}
function getMockExportNamesBySourceFromResult(result) {
	return getOrCreateImportAnalysis(result).mockExportNamesBySource;
}
function getMockExportNamesBySource(code, filename, perf) {
	return getMockExportNamesBySourceFromResult(makeTransientResult(code, filename, perf));
}
function getNamedExportsFromResult(result) {
	return getOrCreateImportAnalysis(result).namedExports;
}
function getNamedExports(code, filename, perf) {
	return getNamedExportsFromResult(makeTransientResult(code, filename, perf));
}
function isCompilerSafeBoundaryCall(call, fnNode, envType) {
	if (!call.arguments.some((arg) => arg === fnNode)) return false;
	const callee = call.callee;
	if (import_lib.isIdentifier(callee)) return envType === "client" ? callee.name === "createServerOnlyFn" : callee.name === "createClientOnlyFn";
	if (!import_lib.isMemberExpression(callee) || callee.computed) return false;
	if (!import_lib.isIdentifier(callee.property)) return false;
	const prop = callee.property.name;
	const rootName = getCalleeRootName(callee.object);
	if (envType === "client") {
		if (prop === "handler") return rootName === "createServerFn" || /ServerFn$/.test(rootName ?? "");
		if (prop === "server") return rootName === "createMiddleware" || rootName === "createIsomorphicFn" || /Middleware$/.test(rootName ?? "");
		return false;
	}
	if (prop === "client") return rootName === "createIsomorphicFn";
	return false;
}
function getCalleeRootName(node) {
	if (import_lib.isIdentifier(node)) return node.name;
	if (import_lib.isCallExpression(node)) return getCalleeRootName(node.callee);
	if (import_lib.isMemberExpression(node)) return getCalleeRootName(node.object);
}
function getBoundNamesFromPattern(pattern, out) {
	if (import_lib.isIdentifier(pattern)) out.add(pattern.name);
	else if (import_lib.isObjectPattern(pattern)) for (const prop of pattern.properties) if (import_lib.isRestElement(prop)) getBoundNamesFromPattern(prop.argument, out);
	else getBoundNamesFromPattern(prop.value, out);
	else if (import_lib.isArrayPattern(pattern)) {
		for (const elem of pattern.elements) if (elem) getBoundNamesFromPattern(elem, out);
	} else if (import_lib.isAssignmentPattern(pattern)) getBoundNamesFromPattern(pattern.left, out);
	else if (import_lib.isRestElement(pattern)) getBoundNamesFromPattern(pattern.argument, out);
}
function addPatternBindingsIfTracked(pattern, tracked, out) {
	const names = /* @__PURE__ */ new Set();
	getBoundNamesFromPattern(pattern, names);
	for (const name of names) if (tracked.has(name)) out.add(name);
}
function collectHoistedVarBindings(node, tracked, out, isRoot = true) {
	if (!isRoot && import_lib.isFunction(node)) return;
	if (import_lib.isVariableDeclaration(node) && node.kind === "var") for (const decl of node.declarations) addPatternBindingsIfTracked(decl.id, tracked, out);
	const keys = import_lib.VISITOR_KEYS[node.type];
	if (!keys) return;
	for (const key of keys) {
		const child = node[key];
		if (Array.isArray(child)) {
			for (const item of child) if (item && typeof item === "object" && "type" in item) collectHoistedVarBindings(item, tracked, out, false);
		} else if (child && typeof child === "object" && "type" in child) collectHoistedVarBindings(child, tracked, out, false);
	}
}
function collectProgramBindings(program, tracked) {
	const bindings = /* @__PURE__ */ new Set();
	for (const node of program.body) {
		if (import_lib.isVariableDeclaration(node)) {
			for (const decl of node.declarations) addPatternBindingsIfTracked(decl.id, tracked, bindings);
			continue;
		}
		if (import_lib.isFunctionDeclaration(node) || import_lib.isClassDeclaration(node)) {
			if (node.id && tracked.has(node.id.name)) bindings.add(node.id.name);
		}
	}
	return bindings;
}
function collectBlockBindings(block, tracked) {
	const bindings = /* @__PURE__ */ new Set();
	for (const node of block.body) {
		if (import_lib.isVariableDeclaration(node) && node.kind !== "var") {
			for (const decl of node.declarations) addPatternBindingsIfTracked(decl.id, tracked, bindings);
			continue;
		}
		if (import_lib.isFunctionDeclaration(node) || import_lib.isClassDeclaration(node)) {
			if (node.id && tracked.has(node.id.name)) bindings.add(node.id.name);
		}
	}
	return bindings;
}
function collectFunctionBindings(fn, tracked) {
	const bindings = /* @__PURE__ */ new Set();
	if ((import_lib.isFunctionDeclaration(fn) || import_lib.isFunctionExpression(fn)) && fn.id && tracked.has(fn.id.name)) bindings.add(fn.id.name);
	for (const param of fn.params) addPatternBindingsIfTracked(param, tracked, bindings);
	if (import_lib.isBlockStatement(fn.body)) collectHoistedVarBindings(fn.body, tracked, bindings);
	return bindings;
}
function isShadowedByScope(name, scopeStack) {
	for (let i = scopeStack.length - 1; i >= 0; i--) if (scopeStack[i]?.has(name)) return true;
	return false;
}
function isBindingIdentifierInParent(node, parent) {
	if (!parent) return false;
	if (import_lib.isImportSpecifier(parent) || import_lib.isImportDefaultSpecifier(parent)) return parent.local === node;
	if (import_lib.isImportNamespaceSpecifier(parent)) return parent.local === node;
	if (import_lib.isFunctionDeclaration(parent) || import_lib.isFunctionExpression(parent)) return parent.id === node || parent.params.includes(node);
	if (import_lib.isArrowFunctionExpression(parent)) return parent.params.includes(node);
	if (import_lib.isClassDeclaration(parent) || import_lib.isClassExpression(parent)) return parent.id === node;
	if (import_lib.isVariableDeclarator(parent)) return parent.id === node;
	if (import_lib.isCatchClause(parent)) return parent.param === node;
	return false;
}
function isInsideCompilerSafeBoundaryNodes(parents, envType) {
	for (let i = parents.length - 1; i >= 0; i--) {
		const node = parents[i];
		if (!import_lib.isFunction(node)) continue;
		const call = parents[i - 1];
		if (call && import_lib.isCallExpression(call) && isCompilerSafeBoundaryCall(call, node, envType)) return true;
	}
	return false;
}
function findUsagePosInAnalysis(result, source, envType) {
	const analysis = getOrCreateImportAnalysis(result);
	const cacheKey = `${envType ?? "post"}::${source}`;
	if (analysis.usageByKey.has(cacheKey)) return analysis.usageByKey.get(cacheKey) ?? void 0;
	const imported = analysis.importBindingsBySource.get(source)?.importedLocalNames;
	if (!imported || imported.size === 0) {
		analysis.usageByKey.set(cacheKey, null);
		return;
	}
	let preferred;
	let anyUsage;
	const visit = (node, ctx) => {
		if (preferred && anyUsage) return;
		if (import_lib.isProgram(node)) {
			const nextCtx = {
				parents: [...ctx.parents, node],
				scopeStack: [...ctx.scopeStack, collectProgramBindings(node, imported)]
			};
			for (const child of node.body) visit(child, nextCtx);
			return;
		}
		if (import_lib.isFunction(node)) {
			const functionCtx = {
				parents: [...ctx.parents, node],
				scopeStack: [...ctx.scopeStack, collectFunctionBindings(node, imported)]
			};
			visit(node.body, functionCtx);
			return;
		}
		if (import_lib.isBlockStatement(node)) {
			const nextCtx = {
				parents: [...ctx.parents, node],
				scopeStack: [...ctx.scopeStack, collectBlockBindings(node, imported)]
			};
			for (const child of node.body) visit(child, nextCtx);
			return;
		}
		if (import_lib.isCatchClause(node)) {
			const bindings = /* @__PURE__ */ new Set();
			if (node.param) addPatternBindingsIfTracked(node.param, imported, bindings);
			const nextCtx = {
				parents: [...ctx.parents, node],
				scopeStack: bindings.size ? [...ctx.scopeStack, bindings] : ctx.scopeStack
			};
			visit(node.body, nextCtx);
			return;
		}
		if (import_lib.isForStatement(node) && import_lib.isVariableDeclaration(node.init) && node.init.kind !== "var") {
			const bindings = /* @__PURE__ */ new Set();
			for (const decl of node.init.declarations) addPatternBindingsIfTracked(decl.id, imported, bindings);
			const nextCtx = {
				parents: [...ctx.parents, node],
				scopeStack: bindings.size ? [...ctx.scopeStack, bindings] : ctx.scopeStack
			};
			visit(node.init, nextCtx);
			if (node.test) visit(node.test, nextCtx);
			if (node.update) visit(node.update, nextCtx);
			visit(node.body, nextCtx);
			return;
		}
		if ((import_lib.isForInStatement(node) || import_lib.isForOfStatement(node)) && import_lib.isVariableDeclaration(node.left) && node.left.kind !== "var") {
			const bindings = /* @__PURE__ */ new Set();
			for (const decl of node.left.declarations) addPatternBindingsIfTracked(decl.id, imported, bindings);
			const nextCtx = {
				parents: [...ctx.parents, node],
				scopeStack: bindings.size ? [...ctx.scopeStack, bindings] : ctx.scopeStack
			};
			visit(node.left, nextCtx);
			visit(node.right, nextCtx);
			visit(node.body, nextCtx);
			return;
		}
		const nextParents = [...ctx.parents, node];
		if (import_lib.isIdentifier(node)) {
			const parent = ctx.parents[ctx.parents.length - 1];
			if (imported.has(node.name)) {
				if (!isBindingIdentifierInParent(node, parent)) {
					if (!(import_lib.isObjectProperty(parent) && parent.key === node && !parent.computed && !parent.shorthand) && !(import_lib.isObjectMethod(parent) && parent.key === node && !parent.computed) && !(import_lib.isExportSpecifier(parent) && parent.exported === node) && !isShadowedByScope(node.name, ctx.scopeStack) && !(envType && isInsideCompilerSafeBoundaryNodes(ctx.parents, envType))) {
						const loc = node.loc?.start;
						if (loc) {
							const pos = {
								line: loc.line,
								column0: loc.column
							};
							if (import_lib.isCallExpression(parent) && parent.callee === node || import_lib.isNewExpression(parent) && parent.callee === node || (import_lib.isMemberExpression(parent) || import_lib.isOptionalMemberExpression(parent)) && parent.object === node) preferred ||= pos;
							else anyUsage ||= pos;
						}
					}
				}
			}
		}
		if (import_lib.isImportDeclaration(node)) return;
		const keys = import_lib.VISITOR_KEYS[node.type];
		if (!keys) return;
		for (const key of keys) {
			const child = node[key];
			if (Array.isArray(child)) {
				for (const item of child) if (item && typeof item === "object" && "type" in item) visit(item, {
					parents: nextParents,
					scopeStack: ctx.scopeStack
				});
			} else if (child && typeof child === "object" && "type" in child) visit(child, {
				parents: nextParents,
				scopeStack: ctx.scopeStack
			});
		}
	};
	visit(analysis.ast.program, {
		parents: [],
		scopeStack: []
	});
	const pos = preferred ?? anyUsage ?? null;
	analysis.usageByKey.set(cacheKey, pos);
	return pos ?? void 0;
}
function findPostCompileUsagePosFromResult(result, source) {
	return findUsagePosInAnalysis(result, source);
}
function findOriginalUnsafeUsagePosFromResult(result, source, envType) {
	return findUsagePosInAnalysis(result, source, envType);
}
function buildLineIndex(code) {
	const offsets = [0];
	for (let i = 0; i < code.length; i++) if (code.charCodeAt(i) === 10) offsets.push(i + 1);
	return { offsets };
}
function upperBound(values, x) {
	let lo = 0;
	let hi = values.length;
	while (lo < hi) {
		const mid = lo + hi >> 1;
		if (values[mid] <= x) lo = mid + 1;
		else hi = mid;
	}
	return lo;
}
function indexToLineColWithIndex(lineIndex, idx) {
	const offsets = lineIndex.offsets;
	const ub = upperBound(offsets, idx);
	const lineIdx = Math.max(0, ub - 1);
	const line = lineIdx + 1;
	const lineStart = offsets[lineIdx] ?? 0;
	return {
		line,
		column0: Math.max(0, idx - lineStart)
	};
}
function normalizeSourceMap(map) {
	if (!map) return;
	return {
		...map,
		version: Number(map.version),
		file: map.file ?? "",
		names: Array.isArray(map.names) ? map.names : [],
		sourcesContent: map.sourcesContent?.map((value) => value ?? "") ?? void 0
	};
}
/**
* Pick the most-likely original source text for `importerFile` from
* a sourcemap that may contain multiple sources.
*/
function pickOriginalCodeFromSourcesContent(map, importerFile, root) {
	if (!map?.sourcesContent || map.sources.length === 0) return;
	const file = normalizeFilePath(importerFile);
	const sourceRoot = map.sourceRoot;
	const fileSeg = file.split("/").filter(Boolean);
	const resolveBase = sourceRoot ? resolve$1(root, sourceRoot) : root;
	let bestIdx = -1;
	let bestScore = -1;
	for (let i = 0; i < map.sources.length; i++) {
		const content = map.sourcesContent[i];
		if (typeof content !== "string") continue;
		const src = map.sources[i] ?? "";
		const normalizedSrc = normalizeFilePath(src);
		if (normalizedSrc === file) return content;
		let resolved;
		if (!src) resolved = "";
		else if (isAbsolute$1(src)) resolved = normalizeFilePath(src);
		else resolved = normalizeFilePath(resolve$1(resolveBase, src));
		if (resolved === file) return content;
		const normalizedSrcSeg = normalizedSrc.split("/").filter(Boolean);
		const resolvedSeg = resolved !== normalizedSrc ? resolved.split("/").filter(Boolean) : normalizedSrcSeg;
		const score = Math.max(segmentSuffixScore(normalizedSrcSeg, fileSeg), segmentSuffixScore(resolvedSeg, fileSeg));
		if (score > bestScore) {
			bestScore = score;
			bestIdx = i;
		}
	}
	if (bestIdx !== -1 && bestScore >= 1) return map.sourcesContent[bestIdx] ?? void 0;
	return map.sourcesContent[0] ?? void 0;
}
/** Count matching path segments from the end of `aSeg` against `bSeg`. */
function segmentSuffixScore(aSeg, bSeg) {
	let score = 0;
	for (let i = aSeg.length - 1, j = bSeg.length - 1; i >= 0 && j >= 0; i--, j--) {
		if (aSeg[i] !== bSeg[j]) break;
		score++;
	}
	return score;
}
async function mapGeneratedToOriginal(map, generated, fallbackFile) {
	const fallback = {
		file: fallbackFile,
		line: generated.line,
		column: generated.column0 + 1
	};
	if (!map) return fallback;
	const consumer = await getSourceMapConsumer(map);
	if (!consumer) return fallback;
	try {
		const orig = consumer.originalPositionFor({
			line: generated.line,
			column: generated.column0
		});
		if (orig.line != null && orig.column != null) return {
			file: orig.source ? normalizeFilePath(orig.source) : fallbackFile,
			line: orig.line,
			column: orig.column + 1
		};
	} catch {}
	return fallback;
}
var consumerCache = /* @__PURE__ */ new WeakMap();
function getOriginalCode(result, importerFile, root) {
	if (result.originalCode === void 0 && importerFile && root) {
		const map = result.map;
		if (map?.sourcesContent) result.originalCode = pickOriginalCodeFromSourcesContent(map, importerFile, root);
	}
	return result.originalCode;
}
function toRawSourceMap(map) {
	return {
		...map,
		file: map.file ?? "",
		version: Number(map.version),
		sourcesContent: map.sourcesContent?.map((s) => s ?? "") ?? []
	};
}
async function getSourceMapConsumer(map) {
	const cached = consumerCache.get(map);
	if (cached) return cached;
	const promise = (async () => {
		try {
			return await new import_source_map.SourceMapConsumer(toRawSourceMap(map));
		} catch {
			return null;
		}
	})();
	consumerCache.set(map, promise);
	return promise;
}
/**
* Cache for import statement locations with reverse index for O(1)
* invalidation by file.  Keys: `${importerFile}::${source}`.
*/
var ImportLocCache = class {
	cache = /* @__PURE__ */ new Map();
	reverseIndex = /* @__PURE__ */ new Map();
	has(key) {
		return this.cache.has(key);
	}
	get(key) {
		return this.cache.get(key);
	}
	set(key, value) {
		this.cache.set(key, value);
		const file = key.slice(0, key.indexOf("::"));
		getOrCreate(this.reverseIndex, file, () => /* @__PURE__ */ new Set()).add(key);
	}
	clear() {
		this.cache.clear();
		this.reverseIndex.clear();
	}
	/** Remove all cache entries where the importer matches `file`. */
	deleteByFile(file) {
		const keys = this.reverseIndex.get(file);
		if (keys) {
			for (const key of keys) this.cache.delete(key);
			this.reverseIndex.delete(file);
		}
	}
};
function getOrCreateOriginalTransformResult(result, importerFile, root) {
	getOriginalCode(result, importerFile, root);
	if (!result.originalCode) return;
	if (!result.originalResult) {
		result.originalResult = {
			code: result.originalCode,
			filename: result.filename,
			map: void 0,
			originalCode: result.originalCode
		};
		if (result.perf) result.originalResult.perf = result.perf;
	}
	return result.originalResult;
}
function createImportSpecifierLocationIndex() {
	return { find(result, source) {
		if (!result.code.includes(source)) return -1;
		return getImportSpecifierLocationFromResult(result, source);
	} };
}
/**
* Find the location of an import statement in a transformed module
* by searching the post-transform code and mapping back via sourcemap.
* Results are cached in `importLocCache`.
*/
async function findImportStatementLocationFromTransformed(provider, importerId, source, importLocCache, findImportSpecifierLocationIndex) {
	const importerFile = normalizeFilePath(importerId);
	const cacheKey = `${importerFile}::${source}`;
	if (importLocCache.has(cacheKey)) return importLocCache.get(cacheKey) ?? void 0;
	try {
		const res = provider.getTransformResult(importerId);
		if (!res) {
			importLocCache.set(cacheKey, null);
			return;
		}
		const { map } = res;
		const lineIndex = res.lineIndex ?? (res.lineIndex = buildLineIndex(res.code));
		const idx = findImportSpecifierLocationIndex(res, source);
		if (idx === -1) {
			importLocCache.set(cacheKey, null);
			return;
		}
		const loc = await mapGeneratedToOriginal(map, indexToLineColWithIndex(lineIndex, idx), importerFile);
		importLocCache.set(cacheKey, loc);
		return loc;
	} catch {
		importLocCache.set(cacheKey, null);
		return;
	}
}
/**
* Find the first post-compile usage location for a denied import specifier.
* Best-effort: searches transformed code for non-import uses of imported
* bindings and maps back to original source via sourcemap.
*/
async function findPostCompileUsageLocation(provider, importerId, source) {
	try {
		const importerFile = normalizeFilePath(importerId);
		const res = provider.getTransformResult(importerId);
		if (!res) return void 0;
		const { code, map } = res;
		if (!res.lineIndex) res.lineIndex = buildLineIndex(code);
		const pos = findPostCompileUsagePosFromResult(res, source);
		if (!pos) return void 0;
		return await mapGeneratedToOriginal(map, pos, importerFile);
	} catch {
		return;
	}
}
/**
* Best-effort original-source usage lookup for cases where a later transform
* removes or rewrites the import from emitted code but preserves the original
* source in `sourcesContent`.
*/
function findOriginalUsageLocation(provider, importerId, source, envType, root) {
	try {
		const importerFile = normalizeFilePath(importerId);
		const res = provider.getTransformResult(importerId);
		if (!res) return void 0;
		const originalResult = getOrCreateOriginalTransformResult(res, importerFile, root);
		if (!originalResult) return void 0;
		const pos = envType ? findOriginalUnsafeUsagePosFromResult(originalResult, source, envType) : findPostCompileUsagePosFromResult(originalResult, source);
		if (!pos) return void 0;
		return {
			file: importerFile,
			line: pos.line,
			column: pos.column0 + 1
		};
	} catch {
		return;
	}
}
/**
* Annotate each trace hop with the location of the import that created the
* edge (file:line:col). Skips steps that already have a location.
*/
async function addTraceImportLocations(provider, trace, importLocCache, findImportSpecifierLocationIndex) {
	for (const step of trace) {
		if (!step.specifier) continue;
		if (step.line != null && step.column != null) continue;
		const loc = await findImportStatementLocationFromTransformed(provider, step.file, step.specifier, importLocCache, findImportSpecifierLocationIndex);
		if (!loc) continue;
		step.line = loc.line;
		step.column = loc.column;
	}
}
/**
* Build a vitest-style code snippet showing lines surrounding a location.
*
* Prefers `originalCode` from the sourcemap's sourcesContent; falls back
* to transformed code when unavailable.
*/
function buildCodeSnippet(provider, moduleId, loc, contextLines = 2, root) {
	try {
		const importerFile = normalizeFilePath(moduleId);
		const res = provider.getTransformResult(moduleId);
		if (!res) return void 0;
		const sourceCode = getOriginalCode(res, importerFile, root) ?? res.code;
		const targetLine = loc.line;
		const targetCol = loc.column;
		if (targetLine < 1) return void 0;
		const allLines = sourceCode.split("\n");
		for (let i = 0; i < allLines.length; i++) {
			const line = allLines[i];
			if (line.endsWith("\r")) allLines[i] = line.slice(0, -1);
		}
		const wantStart = Math.max(1, targetLine - contextLines);
		const wantEnd = Math.min(allLines.length, targetLine + contextLines);
		if (targetLine > allLines.length) return void 0;
		const lines = allLines.slice(wantStart - 1, wantEnd);
		const gutterWidth = String(wantEnd).length;
		const sourceFile = loc.file ?? importerFile;
		const snippetLines = [];
		for (let i = 0; i < lines.length; i++) {
			const ln = wantStart + i;
			const lineContent = lines[i];
			const lineNumStr = String(ln).padStart(gutterWidth, " ");
			const marker = ln === targetLine ? ">" : " ";
			snippetLines.push(`  ${marker} ${lineNumStr} | ${lineContent}`);
			if (ln === targetLine && targetCol > 0) {
				const padding = " ".repeat(targetCol - 1);
				snippetLines.push(`    ${" ".repeat(gutterWidth)} | ${padding}^`);
			}
		}
		return {
			lines: snippetLines,
			highlightLine: targetLine,
			location: `${sourceFile}:${targetLine}:${targetCol}`
		};
	} catch {
		return;
	}
}
function getModuleExportName(node) {
	return import_lib.isIdentifier(node) ? node.name : node.value;
}
function toMemberExpressionProperty(name) {
	return import_lib.isValidIdentifier(name) ? {
		property: import_lib.identifier(name),
		computed: false
	} : {
		property: import_lib.stringLiteral(name),
		computed: true
	};
}
function toModuleExportNameNode(name) {
	return import_lib.isValidIdentifier(name) ? import_lib.identifier(name) : import_lib.stringLiteral(name);
}
function createInternalReexportVarName(localName, mockIndex, usedNames) {
	const baseName = import_lib.isValidIdentifier(localName) ? `__tss_reexport_${localName}` : `__tss_reexport_${mockIndex}`;
	let candidate = baseName;
	let suffix = 0;
	while (usedNames.has(candidate)) {
		suffix++;
		candidate = `${baseName}_${suffix}`;
	}
	usedNames.add(candidate);
	return candidate;
}
/**
* Rewrite static imports/re-exports from denied sources using Babel AST transforms.
*
* Transforms:
*   import { a as b, c } from 'denied'
* Into:
*   import __tss_deny_0 from 'tanstack-start-import-protection:mock'
*   const b = __tss_deny_0.a
*   const c = __tss_deny_0.c
*
* Also handles:
*   import def from 'denied'        -> import def from mock
*   import * as ns from 'denied'    -> import ns from mock
*   export { x } from 'denied'      -> export const x = mock.x
*   export * from 'denied'          -> removed
*   export { x as y } from 'denied' -> export const y = mock.x
*/
function rewriteDeniedImports(code, id, deniedSources, getMockModuleId = () => MOCK_MODULE_ID) {
	return rewriteDeniedImportsFromAst(parseAst({
		code,
		filename: id
	}), id, deniedSources, getMockModuleId);
}
function rewriteDeniedImportsFromAst(ast, id, deniedSources, getMockModuleId = () => MOCK_MODULE_ID) {
	let modified = false;
	let mockCounter = 0;
	for (let i = ast.program.body.length - 1; i >= 0; i--) {
		const node = ast.program.body[i];
		if (import_lib.isImportDeclaration(node)) {
			if (node.importKind === "type") continue;
			if (!deniedSources.has(node.source.value)) continue;
			const mockVar = `__tss_deny_${mockCounter++}`;
			const replacements = [];
			replacements.push(import_lib.importDeclaration([import_lib.importDefaultSpecifier(import_lib.identifier(mockVar))], import_lib.stringLiteral(getMockModuleId(node.source.value))));
			for (const specifier of node.specifiers) if (import_lib.isImportDefaultSpecifier(specifier) || import_lib.isImportNamespaceSpecifier(specifier)) replacements.push(import_lib.variableDeclaration("const", [import_lib.variableDeclarator(import_lib.identifier(specifier.local.name), import_lib.identifier(mockVar))]));
			else if (import_lib.isImportSpecifier(specifier)) {
				if (specifier.importKind === "type") continue;
				const memberProperty = toMemberExpressionProperty(getModuleExportName(specifier.imported));
				replacements.push(import_lib.variableDeclaration("const", [import_lib.variableDeclarator(import_lib.identifier(specifier.local.name), import_lib.memberExpression(import_lib.identifier(mockVar), memberProperty.property, memberProperty.computed))]));
			}
			ast.program.body.splice(i, 1, ...replacements);
			modified = true;
			continue;
		}
		if (import_lib.isExportNamedDeclaration(node) && node.source) {
			if (node.exportKind === "type") continue;
			if (!deniedSources.has(node.source.value)) continue;
			const mockIndex = mockCounter++;
			const mockVar = `__tss_deny_${mockIndex}`;
			const replacements = [];
			replacements.push(import_lib.importDeclaration([import_lib.importDefaultSpecifier(import_lib.identifier(mockVar))], import_lib.stringLiteral(getMockModuleId(node.source.value))));
			const usedInternalVars = /* @__PURE__ */ new Set();
			const exportSpecifiers = [];
			for (const specifier of node.specifiers) if (import_lib.isExportSpecifier(specifier)) {
				if (specifier.exportKind === "type") continue;
				const localName = getModuleExportName(specifier.local);
				const exportedName = getModuleExportName(specifier.exported);
				const memberProperty = toMemberExpressionProperty(localName);
				const internalVar = createInternalReexportVarName(localName, mockIndex, usedInternalVars);
				replacements.push(import_lib.variableDeclaration("const", [import_lib.variableDeclarator(import_lib.identifier(internalVar), import_lib.memberExpression(import_lib.identifier(mockVar), memberProperty.property, memberProperty.computed))]));
				exportSpecifiers.push({
					localName: internalVar,
					exportedName
				});
			}
			if (exportSpecifiers.length > 0) replacements.push(import_lib.exportNamedDeclaration(null, exportSpecifiers.map((s) => import_lib.exportSpecifier(import_lib.identifier(s.localName), toModuleExportNameNode(s.exportedName)))));
			ast.program.body.splice(i, 1, ...replacements);
			modified = true;
			continue;
		}
		if (import_lib.isExportAllDeclaration(node)) {
			if (node.exportKind === "type") continue;
			if (!deniedSources.has(node.source.value)) continue;
			ast.program.body.splice(i, 1);
			modified = true;
			continue;
		}
	}
	if (!modified) return void 0;
	const result = generateFromAst(ast, {
		sourceMaps: true,
		sourceFileName: id,
		filename: id
	});
	return {
		code: result.code,
		...result.map ? { map: result.map } : {}
	};
}
var FILE_RESOLUTION_EXTENSIONS = [...KNOWN_SOURCE_EXTENSIONS];
/**
* Canonicalize extensionless absolute IDs like `/src/foo.server` to the
* physical file when possible.
*
* Keeps a small cache plus a reverse index so we can invalidate on HMR
* updates without clearing the whole map.
*/
var ExtensionlessAbsoluteIdResolver = class {
	entries = /* @__PURE__ */ new Map();
	keysByDep = /* @__PURE__ */ new Map();
	clear() {
		this.entries.clear();
		this.keysByDep.clear();
	}
	/**
	* Invalidate any cached entries that might be affected by changes to `id`.
	* We invalidate both the file and its containing directory.
	*/
	invalidateByFile(id) {
		const file = normalizeFilePath(id);
		this.invalidateDep(`file:${file}`);
		if (isAbsolute(file)) this.invalidateDep(`dir:${dirname(file)}`);
	}
	resolve(id) {
		const key = normalizeFilePath(id);
		const cached = this.entries.get(key);
		if (cached) return cached.value;
		let result = key;
		let resolvedPhysical;
		if (isAbsolute(key)) {
			const ext = extname(key);
			if (!FILE_RESOLUTION_EXTENSIONS.includes(ext)) {
				const resolved = resolveModulePath(`./${basename(key)}`, {
					from: dirname(key),
					extensions: FILE_RESOLUTION_EXTENSIONS,
					try: true
				});
				if (resolved) {
					resolvedPhysical = resolved;
					result = normalizeFilePath(resolved);
				}
			}
		}
		const resolvedFile = resolvedPhysical ? normalizeFilePath(resolvedPhysical) : void 0;
		const deps = this.buildDepsForKey(key, resolvedFile);
		this.entries.set(key, {
			value: result,
			deps
		});
		this.indexDeps(key, deps);
		return result;
	}
	invalidateDep(dep) {
		const keys = this.keysByDep.get(dep);
		if (!keys) return;
		for (const key of Array.from(keys)) this.deleteKey(key);
	}
	buildDepsForKey(key, resolvedFile) {
		const deps = /* @__PURE__ */ new Set();
		deps.add(`file:${key}`);
		if (isAbsolute(key)) deps.add(`dir:${dirname(key)}`);
		if (resolvedFile) deps.add(`file:${resolvedFile}`);
		return deps;
	}
	indexDeps(key, deps) {
		for (const dep of deps) {
			let keys = this.keysByDep.get(dep);
			if (!keys) {
				keys = /* @__PURE__ */ new Set();
				this.keysByDep.set(dep, keys);
			}
			keys.add(key);
		}
	}
	deleteKey(key) {
		const entry = this.entries.get(key);
		this.entries.delete(key);
		if (!entry) return;
		for (const dep of entry.deps) {
			const keys = this.keysByDep.get(dep);
			if (!keys) continue;
			keys.delete(key);
			if (keys.size === 0) this.keysByDep.delete(dep);
		}
	}
};
function toBase64Url(input) {
	return Buffer.from(input, "utf8").toString("base64url");
}
function fromBase64Url(input) {
	return Buffer.from(input, "base64url").toString("utf8");
}
var RUNTIME_SUGGESTION_TEXT = "Fix: " + CLIENT_ENV_SUGGESTIONS.join(". ") + ". To disable these runtime diagnostics, set importProtection.mockAccess: \"off\".";
function mockRuntimeModuleIdFromViolation(info, mode, root) {
	if (mode === "off") return MOCK_MODULE_ID;
	if (info.env !== "client") return MOCK_MODULE_ID;
	const rel = (p) => relativizePath(p, root);
	const trace = info.trace.map((s) => {
		const file = rel(s.file);
		if (s.line == null) return file;
		return `${file}:${s.line}:${s.column ?? 1}`;
	});
	const payload = {
		env: info.env,
		importer: info.importer,
		specifier: info.specifier,
		trace,
		mode
	};
	return `${MOCK_RUNTIME_PREFIX}${toBase64Url(JSON.stringify(payload))}`;
}
function makeMockEdgeModuleId(exports, runtimeId) {
	return `${MOCK_EDGE_PREFIX}${toBase64Url(JSON.stringify({
		exports,
		runtimeId
	}))}`;
}
function generateMockCode(diagnostics) {
	const fnName = diagnostics ? "__createMock" : "createMock";
	const hasDiag = !!diagnostics;
	return `
${hasDiag ? `const __meta = ${JSON.stringify(diagnostics.meta)};
const __mode = ${JSON.stringify(diagnostics.mode)};

const __seen = new Set();
function __report(action, accessPath) {
  if (__mode === 'off') return;
  const key = action + ':' + accessPath;
  if (__seen.has(key)) return;
  __seen.add(key);

  const traceLines = Array.isArray(__meta.trace) && __meta.trace.length
    ? "\\n\\nTrace:\\n" + __meta.trace.map((t, i) => '  ' + (i + 1) + '. ' + String(t)).join('\\n')
    : '';

  const msg =
    '[import-protection] Mocked import used in dev client\\n\\n' +
    'Denied import: "' + __meta.specifier + '"\\n' +
    'Importer: ' + __meta.importer + '\\n' +
    'Access: ' + accessPath + ' (' + action + ')' +
    traceLines +
    '\\n\\n' + ${JSON.stringify(RUNTIME_SUGGESTION_TEXT)};

  const err = new Error(msg);
  if (__mode === 'warn') {
    console.warn(err);
  } else {
    console.error(err);
  }
}
` : ""}/* @__NO_SIDE_EFFECTS__ */
function ${fnName}(name) {
  const fn = function () {};
  fn.prototype.name = name;
  const children = Object.create(null);
  const proxy = new Proxy(fn, {
    get(_target, prop) {
      if (prop === '__esModule') return true;
      if (prop === 'default') return proxy;
      if (prop === 'caller') return null;
      if (prop === 'then') return (f) => Promise.resolve(f(proxy));
      if (prop === 'catch') return () => Promise.resolve(proxy);
      if (prop === 'finally') return (f) => { f(); return Promise.resolve(proxy); };${`
      if (prop === Symbol.toPrimitive) {
        return () => {
          ${hasDiag ? `__report('toPrimitive', name);` : ""}
          return '[import-protection mock]';
        };
      }
      if (prop === 'toString' || prop === 'valueOf' || prop === 'toJSON') {
        return () => {
          ${hasDiag ? `__report(String(prop), name);` : ""}
          return '[import-protection mock]';
        };
      }`}
      if (typeof prop === 'symbol') return undefined;
      if (!(prop in children)) {
        children[prop] = ${fnName}(name + '.' + prop);
      }
      return children[prop];
    },
    apply() {
      ${hasDiag ? `__report('call', name + '()');
      return ${fnName}(name + '()');` : `return ${fnName}(name + '()');`}
    },
    construct() {
      ${hasDiag ? `__report('construct', 'new ' + name);
      return ${fnName}('new ' + name);` : `return ${fnName}('new ' + name);`}
    },${hasDiag ? `
    set(_target, prop) {
      __report('set', name + '.' + String(prop));
      return true;
    },` : ""}
  });
  return proxy;
}
const mock = /* @__PURE__ */ ${fnName}('mock');
export default mock;
`;
}
function loadSilentMockModule() {
	return { code: generateMockCode() };
}
function filterExportNames(exports) {
	return exports.filter((n) => n.length > 0 && n !== "default");
}
function generateExportLines(names) {
	const lines = [];
	const stringExports = [];
	for (let i = 0; i < names.length; i++) {
		const n = names[i];
		if (isValidExportName(n)) lines.push(`export const ${n} = mock.${n};`);
		else {
			const alias = `__tss_str_${i}`;
			lines.push(`const ${alias} = mock[${JSON.stringify(n)}];`);
			stringExports.push({
				alias,
				name: n
			});
		}
	}
	if (stringExports.length > 0) {
		const reexports = stringExports.map((s) => `${s.alias} as ${JSON.stringify(s.name)}`).join(", ");
		lines.push(`export { ${reexports} };`);
	}
	return lines;
}
function generateSelfContainedMockModule(exportNames) {
	return { code: `${generateMockCode()}
${generateExportLines(filterExportNames(exportNames)).join("\n")}
` };
}
function generateDevSelfDenialModule(exportNames, runtimeId) {
	const exportLines = generateExportLines(filterExportNames(exportNames));
	return { code: `import mock from ${JSON.stringify(runtimeId)};
${exportLines.join("\n")}
export default mock;
` };
}
function loadMockEdgeModule(encodedPayload) {
	let payload;
	try {
		payload = JSON.parse(fromBase64Url(encodedPayload));
	} catch {
		payload = { exports: [] };
	}
	const names = filterExportNames(payload.exports ?? []);
	const runtimeId = typeof payload.runtimeId === "string" && payload.runtimeId.length > 0 ? payload.runtimeId : MOCK_MODULE_ID;
	const exportLines = generateExportLines(names);
	return { code: `import mock from ${JSON.stringify(runtimeId)};
${exportLines.join("\n")}
export default mock;
` };
}
function loadMockRuntimeModule(encodedPayload) {
	let payload;
	try {
		payload = JSON.parse(fromBase64Url(encodedPayload));
	} catch {
		payload = {};
	}
	const mode = payload.mode === "warn" || payload.mode === "off" ? payload.mode : "error";
	return { code: generateMockCode({
		meta: {
			env: String(payload.env ?? ""),
			importer: String(payload.importer ?? ""),
			specifier: String(payload.specifier ?? ""),
			trace: Array.isArray(payload.trace) ? payload.trace : []
		},
		mode
	}) };
}
var MARKER_MODULE_RESULT = { code: "export {}" };
function loadMarkerModule() {
	return MARKER_MODULE_RESULT;
}
var RESOLVED_MOCK_MODULE_ID = resolveViteId(MOCK_MODULE_ID);
var RESOLVED_MOCK_BUILD_PREFIX = resolveViteId(MOCK_BUILD_PREFIX);
var RESOLVED_MOCK_EDGE_PREFIX = resolveViteId(MOCK_EDGE_PREFIX);
var RESOLVED_MOCK_RUNTIME_PREFIX = resolveViteId(MOCK_RUNTIME_PREFIX);
var RESOLVED_MARKER_PREFIX = resolveViteId(MARKER_PREFIX);
var RESOLVED_MARKER_SERVER_ONLY = resolveViteId(`${MARKER_PREFIX}server-only`);
var RESOLVED_MARKER_CLIENT_ONLY = resolveViteId(`${MARKER_PREFIX}client-only`);
function resolvedMarkerVirtualModuleId(kind) {
	return kind === "server" ? RESOLVED_MARKER_SERVER_ONLY : RESOLVED_MARKER_CLIENT_ONLY;
}
function getResolvedVirtualModuleMatchers() {
	return RESOLVED_VIRTUAL_MODULE_MATCHERS;
}
var RESOLVED_VIRTUAL_MODULE_MATCHERS = [
	RESOLVED_MOCK_MODULE_ID,
	RESOLVED_MOCK_BUILD_PREFIX,
	RESOLVED_MOCK_EDGE_PREFIX,
	RESOLVED_MOCK_RUNTIME_PREFIX,
	RESOLVED_MARKER_PREFIX
];
var RESOLVE_PREFIX_PAIRS = [
	[MOCK_EDGE_PREFIX, RESOLVED_MOCK_EDGE_PREFIX],
	[MOCK_RUNTIME_PREFIX, RESOLVED_MOCK_RUNTIME_PREFIX],
	[MOCK_BUILD_PREFIX, RESOLVED_MOCK_BUILD_PREFIX],
	[MARKER_PREFIX, RESOLVED_MARKER_PREFIX]
];
function resolveInternalVirtualModuleId(source) {
	if (source.startsWith("/@id/__x00__")) return resolveInternalVirtualModuleId(`\0${source.slice(VITE_BROWSER_VIRTUAL_PREFIX.length)}`);
	if (source === "tanstack-start-import-protection:mock" || source === RESOLVED_MOCK_MODULE_ID) return RESOLVED_MOCK_MODULE_ID;
	for (const [unresolvedPrefix, resolvedPrefix] of RESOLVE_PREFIX_PAIRS) {
		if (source.startsWith(unresolvedPrefix)) return resolveViteId(source);
		if (source.startsWith(resolvedPrefix)) return source;
	}
}
function loadResolvedVirtualModule(id) {
	if (id === RESOLVED_MOCK_MODULE_ID) return loadSilentMockModule();
	if (id.startsWith(RESOLVED_MOCK_BUILD_PREFIX)) return loadSilentMockModule();
	if (id.startsWith(RESOLVED_MOCK_EDGE_PREFIX)) return loadMockEdgeModule(id.slice(RESOLVED_MOCK_EDGE_PREFIX.length));
	if (id.startsWith(RESOLVED_MOCK_RUNTIME_PREFIX)) return loadMockRuntimeModule(id.slice(RESOLVED_MOCK_RUNTIME_PREFIX.length));
	if (id.startsWith(RESOLVED_MARKER_PREFIX)) return loadMarkerModule();
}
function isPerfEnabled() {
	return process.env.TSR_IMPORT_PROTECTION_PERF === "1" || process.env.TSR_IMPORT_PROTECTION_PERF === "true";
}
function createPerfCollector() {
	const counters = /* @__PURE__ */ new Map();
	const timings = /* @__PURE__ */ new Map();
	const flushEnvironments = /* @__PURE__ */ new Set();
	let flushCount = 0;
	return {
		count(name, value = 1) {
			counters.set(name, (counters.get(name) ?? 0) + value);
		},
		time(name, startedAt) {
			const duration = performance.now() - startedAt;
			const timing = timings.get(name);
			if (timing) {
				timing.count++;
				timing.totalMs += duration;
				timing.maxMs = Math.max(timing.maxMs, duration);
			} else timings.set(name, {
				count: 1,
				totalMs: duration,
				maxMs: duration
			});
		},
		flush(root, envName) {
			flushCount++;
			flushEnvironments.add(envName);
			const payload = {
				root,
				flushCount,
				flushEnvironments: Array.from(flushEnvironments).sort(),
				counters: Object.fromEntries(counters),
				timings: Object.fromEntries(Array.from(timings, ([name, timing]) => [name, {
					count: timing.count,
					totalMs: Number(timing.totalMs.toFixed(3)),
					avgMs: Number((timing.totalMs / timing.count).toFixed(3)),
					maxMs: Number(timing.maxMs.toFixed(3))
				}]))
			};
			const file = process.env.TSR_IMPORT_PROTECTION_PERF_FILE;
			if (file) writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`);
			else console.warn(`[import-protection:perf] ${JSON.stringify(payload, null, 2)}`);
		}
	};
}
function importProtectionPlugin(opts) {
	let devServer = null;
	const perf = isPerfEnabled() ? createPerfCollector() : void 0;
	const extensionlessIdResolver = new ExtensionlessAbsoluteIdResolver();
	const resolveExtensionlessAbsoluteId = (id) => extensionlessIdResolver.resolve(id);
	const importSpecifierLocationIndex = createImportSpecifierLocationIndex();
	/**
	* Build an import trace using Vite's per-environment module graph, which
	* is authoritative even on warm starts when the plugin's own ImportGraph
	* may be incomplete (Vite skips resolveId for cached modules).
	*/
	function buildTraceFromModuleGraph(envName, env, targetFile) {
		if (!devServer) return null;
		const environment = devServer.environments[envName];
		if (!environment) return null;
		const file = normalizeFilePath(targetFile);
		const start = environment.moduleGraph.getModuleById(file);
		if (!start) return null;
		const nodeIds = /* @__PURE__ */ new Map();
		function nodeId(n) {
			let cached = nodeIds.get(n);
			if (cached === void 0) {
				cached = n.id ? normalizeFilePath(n.id) : n.url ? normalizeFilePath(n.url) : "";
				nodeIds.set(n, cached);
			}
			return cached;
		}
		const queue = [start];
		const visited = /* @__PURE__ */ new Set([start]);
		const parent = /* @__PURE__ */ new Map();
		let entryRoot = null;
		let fallbackRoot = null;
		let qi = 0;
		while (qi < queue.length) {
			const node = queue[qi++];
			const id = nodeId(node);
			if (id && env.graph.entries.has(id)) {
				entryRoot = node;
				break;
			}
			const importers = node.importers;
			if (importers.size === 0) {
				if (!fallbackRoot) fallbackRoot = node;
				continue;
			}
			for (const imp of importers) {
				if (visited.has(imp)) continue;
				visited.add(imp);
				parent.set(imp, node);
				queue.push(imp);
			}
		}
		const root = entryRoot ?? fallbackRoot;
		if (!root) return null;
		const chain = [];
		let cur = root;
		for (let i = 0; i < config.maxTraceDepth + 2 && cur; i++) {
			chain.push(cur);
			if (cur === start) break;
			cur = parent.get(cur);
		}
		const steps = [];
		for (let i = 0; i < chain.length; i++) {
			const id = nodeId(chain[i]);
			if (!id) continue;
			let specifier;
			if (i + 1 < chain.length) {
				const nextId = nodeId(chain[i + 1]);
				if (nextId) specifier = env.graph.reverseEdges.get(nextId)?.get(id);
			}
			steps.push(specifier ? {
				file: id,
				specifier
			} : { file: id });
		}
		return steps.length ? steps : null;
	}
	const config = {
		enabled: true,
		root: "",
		command: "build",
		bundledDev: false,
		srcDirectory: "",
		framework: opts.framework,
		effectiveBehavior: "error",
		mockAccess: "error",
		logMode: "once",
		maxTraceDepth: 20,
		compiledRules: {
			client: {
				specifiers: [],
				files: [],
				excludeFiles: []
			},
			server: {
				specifiers: [],
				files: [],
				excludeFiles: []
			}
		},
		includeMatchers: [],
		excludeMatchers: [],
		ignoreImporterMatchers: [],
		markerSpecifiers: {
			serverOnly: /* @__PURE__ */ new Set(),
			clientOnly: /* @__PURE__ */ new Set()
		},
		envTypeMap: new Map(opts.environments.map((e) => [e.name, e.type])),
		onViolation: void 0
	};
	const envStates = /* @__PURE__ */ new Map();
	const shared = { fileMarkerKind: /* @__PURE__ */ new Map() };
	function shouldCaptureDiagnosticSourceMap(code, envType, matchers) {
		if (!(code.includes("import") || code.includes("export"))) return false;
		const boundaryToken = envType === "client" ? ".server" : ".client";
		if (code.includes(boundaryToken)) return true;
		for (const marker of config.markerSpecifiers.serverOnly) if (code.includes(marker)) return true;
		for (const marker of config.markerSpecifiers.clientOnly) if (code.includes(marker)) return true;
		let needsSourceScan = false;
		for (const matcher of matchers.specifiers) {
			if (matcher.literal !== void 0) {
				if (code.includes(matcher.literal)) return true;
				continue;
			}
			needsSourceScan = true;
		}
		for (const matcher of matchers.files) if (matcher.pattern instanceof RegExp || !matcher.pattern.includes(boundaryToken)) {
			needsSourceScan = true;
			break;
		}
		return needsSourceScan;
	}
	function captureDiagnosticSourceMap(result, getCombinedSourcemap, reason) {
		if (result.map) return;
		const startedAt = perf ? performance.now() : 0;
		try {
			const map = getCombinedSourcemap();
			if (map) {
				result.map = map;
				perf?.count(`sourcemap.captured.${reason}`);
			}
		} catch {
			perf?.count(`sourcemap.captureFailed.${reason}`);
		} finally {
			if (perf) perf.time("sourcemap.capture", startedAt);
		}
	}
	/**
	* Build the best available source trace for a module and enrich each step
	* with line/column locations.  The plugin's own ImportGraph is preferred;
	* Vite's moduleGraph is only a dev fallback for warm starts where Vite may
	* skip resolveId for cached modules.
	*
	* Shared by {@link buildViolationInfo} and {@link processPendingViolations}.
	*/
	async function rebuildAndAnnotateTrace(provider, env, envName, normalizedImporter, specifier, importerLoc, traceOverride) {
		let trace = traceOverride ?? buildTrace(env.graph, normalizedImporter, config.maxTraceDepth);
		if (config.command === "serve") {
			const mgTrace = buildTraceFromModuleGraph(envName, env, normalizedImporter);
			if (mgTrace && mgTrace.length > trace.length) trace = mgTrace;
		}
		await addTraceImportLocations(provider, trace, env.importLocCache, importSpecifierLocationIndex.find);
		if (trace.length > 0) {
			const last = trace[trace.length - 1];
			if (!last.specifier) last.specifier = specifier;
			if (importerLoc && last.line == null) {
				last.line = importerLoc.line;
				last.column = importerLoc.column;
			}
		}
		return trace;
	}
	/**
	* Build a lightweight {@link ViolationInfo} record.
	*
	* Diagnostic-only work (trace, source-map lookup, snippets, AST usage
	* analysis) is intentionally deferred until the violation is about to be
	* reported.
	*/
	function buildViolationInfo(envName, envType, normalizedImporter, source, overrides, traceOverride) {
		perf?.count("violations.detected");
		return {
			env: envName,
			envType,
			behavior: config.effectiveBehavior,
			specifier: source,
			importer: normalizedImporter,
			trace: traceOverride ?? [],
			...overrides
		};
	}
	async function enrichViolationInfo(provider, env, envName, envType, importer, info, traceOverride) {
		const startedAt = perf ? performance.now() : 0;
		perf?.count("violations.enriched");
		const resolved = info.resolved;
		const sourceCandidates = buildSourceCandidates(info.specifier, resolved, config.root);
		addImporterRelativeSourceCandidates(sourceCandidates, importer, resolved);
		if (!info.importerLoc) {
			const loc = await resolveImporterLocation(provider, env, envType, importer, sourceCandidates);
			if (loc) {
				info.importerLoc = loc;
				info.snippet = buildCodeSnippet(provider, importer, loc, void 0, config.root);
			}
		} else if (!info.snippet) info.snippet = buildCodeSnippet(provider, importer, info.importerLoc, void 0, config.root);
		if (traceOverride || info.trace.length === 0) info.trace = await rebuildAndAnnotateTrace(provider, env, envName, info.importer, info.specifier, info.importerLoc, traceOverride);
		if (perf) perf.time("violation.enrich", startedAt);
	}
	async function resolveImporterLocation(provider, env, envType, importer, sourceCandidates) {
		for (const candidate of sourceCandidates) {
			const loc = await findPostCompileUsageLocation(provider, importer, candidate) || findOriginalUsageLocation(provider, importer, candidate, envType, config.root) || await findImportStatementLocationFromTransformed(provider, importer, candidate, env.importLocCache, importSpecifierLocationIndex.find);
			if (loc) return loc;
		}
	}
	function addImporterRelativeSourceCandidates(candidates, importer, resolved) {
		if (!resolved) return;
		const importerFile = normalizeFilePath(importer);
		const resolvedFile = normalizeFilePath(resolved);
		const relativeSource = normalizePath(relative$1(dirname$1(importerFile), resolvedFile));
		if (!relativeSource) return;
		const importSource = relativeSource.startsWith(".") ? relativeSource : `./${relativeSource}`;
		for (const candidate of buildSourceCandidates(importSource, void 0, config.root)) candidates.add(candidate);
	}
	/**
	* Check if a resolved import violates marker restrictions (e.g. importing
	* a server-only module in the client env).  If so, build and return the
	* {@link ViolationInfo} — the caller is responsible for reporting/deferring.
	*
	* Returns `undefined` when the resolved import has no marker conflict.
	*/
	function buildMarkerViolationFromResolvedImport(envName, envType, importer, source, resolvedId, traceOverride) {
		const normalizedResolvedId = normalizeFilePath(resolvedId);
		const markerKind = shared.fileMarkerKind.get(normalizedResolvedId);
		if (!(envType === "client" && markerKind === "server" || envType === "server" && markerKind === "client")) return void 0;
		return buildViolationInfo(envName, envType, normalizeFilePath(importer), source, {
			type: "marker",
			resolved: normalizedResolvedId
		}, traceOverride);
	}
	function buildFileViolationInfo(envName, envType, normalizedImporter, source, resolvedPath, pattern, traceOverride) {
		return buildViolationInfo(envName, envType, normalizedImporter, source, {
			type: "file",
			pattern,
			resolved: resolvedPath
		}, traceOverride);
	}
	function getRulesForEnvironment(envName) {
		return getImportProtectionRulesForEnvironment(config, envName);
	}
	const environmentNames = /* @__PURE__ */ new Set([VITE_ENVIRONMENT_NAMES.client, VITE_ENVIRONMENT_NAMES.server]);
	if (opts.providerEnvName !== VITE_ENVIRONMENT_NAMES.server) environmentNames.add(opts.providerEnvName);
	/** Get (or lazily create) the per-env state for the given environment name. */
	function getEnv(envName) {
		let envState = envStates.get(envName);
		if (!envState) {
			const transformResultCache = /* @__PURE__ */ new Map();
			envState = {
				graph: new ImportGraph(),
				mockExportsByImporter: /* @__PURE__ */ new Map(),
				resolveCache: /* @__PURE__ */ new Map(),
				resolveCacheByFile: /* @__PURE__ */ new Map(),
				importLocCache: new ImportLocCache(),
				seenViolations: /* @__PURE__ */ new Set(),
				transformResultCache,
				transformResultKeysByFile: /* @__PURE__ */ new Map(),
				transformResultProvider: { getTransformResult(id) {
					const fullKey = normalizePath(id);
					const exact = transformResultCache.get(fullKey);
					if (exact) return exact;
					const strippedKey = normalizeFilePath(id);
					return strippedKey !== fullKey ? transformResultCache.get(strippedKey) : void 0;
				} },
				postTransformImports: /* @__PURE__ */ new Map(),
				serverFnLookupModules: /* @__PURE__ */ new Set(),
				pendingViolations: /* @__PURE__ */ new Map(),
				deferredBuildViolations: []
			};
			envStates.set(envName, envState);
		}
		return envState;
	}
	/**
	* Search a parsed export-names map for an entry matching any of the
	* specifier candidates.  Returns matching names or empty array.
	*/
	function findExportsInMap(exportMap, candidates) {
		for (const candidate of candidates) {
			const hit = exportMap.get(candidate);
			if (hit && hit.length > 0) return hit;
		}
		return [];
	}
	/**
	* Build deduped resolution candidates for a module ID, including the
	* extensionless absolute path when the ID looks like a file path.
	*/
	function buildIdCandidates(id, extra) {
		const set = new Set(buildResolutionCandidates(id));
		if (extra) {
			for (const c of buildResolutionCandidates(extra)) set.add(c);
			set.add(resolveExtensionlessAbsoluteId(extra));
		}
		return Array.from(set);
	}
	/**
	* Resolve which named exports the importer needs from a denied specifier,
	* so mock-edge modules can provide explicit ESM named exports.
	*
	* Tries multiple strategies: cached export maps, AST parsing, and
	* resolver-based comparison.
	*/
	async function resolveExportsForDeniedSpecifier(env, ctx, info, importerIdHint) {
		const importerFile = normalizeFilePath(info.importer);
		const specifierCandidates = buildIdCandidates(info.specifier, info.resolved);
		let parsedBySource = env.mockExportsByImporter.get(importerFile);
		if (!parsedBySource) {
			const importerCode = env.transformResultProvider.getTransformResult(importerFile)?.code ?? (importerIdHint && ctx.getModuleInfo ? ctx.getModuleInfo(importerIdHint)?.code ?? void 0 : void 0);
			if (typeof importerCode !== "string" || importerCode.length === 0) return [];
			try {
				parsedBySource = getMockExportNamesBySource(importerCode, importerFile, perf);
				await recordMockExportsForImporter(env, importerFile, parsedBySource, async (src) => {
					const cacheKey = `${importerFile}:${src}`;
					if (env.resolveCache.has(cacheKey)) return env.resolveCache.get(cacheKey) ?? void 0;
					if (!ctx.resolve) return void 0;
					const resolved = await ctx.resolve(src, info.importer, { skipSelf: true });
					if (!resolved || resolved.external) return void 0;
					return resolved.id;
				});
				parsedBySource = env.mockExportsByImporter.get(importerFile) ?? parsedBySource;
			} catch {
				return [];
			}
		}
		const direct = findExportsInMap(parsedBySource, specifierCandidates);
		if (direct.length > 0) return direct;
		const candidateSet = new Set(specifierCandidates);
		for (const [sourceKey, names] of parsedBySource) {
			if (!names.length) continue;
			const resolvedId = await resolveSourceKey(env, ctx, importerFile, sourceKey, info.importer);
			if (!resolvedId) continue;
			const resolvedCandidates = buildIdCandidates(resolvedId);
			resolvedCandidates.push(resolveExtensionlessAbsoluteId(resolvedId));
			if (resolvedCandidates.some((v) => candidateSet.has(v))) return names;
		}
		return [];
	}
	/** Best-effort resolve a source key using the cache or ctx.resolve. */
	async function resolveSourceKey(env, ctx, importerFile, sourceKey, importerId) {
		const cacheKey = `${importerFile}:${sourceKey}`;
		if (env.resolveCache.has(cacheKey)) return env.resolveCache.get(cacheKey) ?? void 0;
		if (!ctx.resolve) return void 0;
		try {
			const resolved = await ctx.resolve(sourceKey, importerId, { skipSelf: true });
			if (!resolved || resolved.external) return void 0;
			return resolved.id;
		} catch {
			return;
		}
	}
	async function recordMockExportsForImporter(env, importerId, namesBySource, resolveSource) {
		const importerFile = normalizeFilePath(importerId);
		if (namesBySource.size === 0) return;
		const resolvedAliases = /* @__PURE__ */ new Map();
		for (const [source, names] of namesBySource) try {
			const resolvedId = await resolveSource(source);
			if (!resolvedId) continue;
			resolvedAliases.set(normalizeFilePath(resolvedId), names);
			resolvedAliases.set(resolveExtensionlessAbsoluteId(resolvedId), names);
		} catch {}
		for (const [source, names] of resolvedAliases) namesBySource.set(source, names);
		const existing = env.mockExportsByImporter.get(importerFile);
		if (!existing) {
			env.mockExportsByImporter.set(importerFile, namesBySource);
			return;
		}
		for (const [source, names] of namesBySource) {
			const prev = existing.get(source);
			if (!prev) {
				existing.set(source, names);
				continue;
			}
			const union = /* @__PURE__ */ new Set([...prev, ...names]);
			existing.set(source, Array.from(union).sort());
		}
	}
	const shouldCheckImporterCache = /* @__PURE__ */ new Map();
	function shouldCheckImporter(importer) {
		return shouldCheckImportProtectionImporter(config, importer, shouldCheckImporterCache);
	}
	function dedupeKey(info) {
		return dedupeViolationKey(info);
	}
	function hasSeen(env, key) {
		if (config.logMode === "always") return false;
		if (env.seenViolations.has(key)) return true;
		env.seenViolations.add(key);
		return false;
	}
	function getRelativePath(absolutePath) {
		return getImportProtectionRelativePath(config.root, absolutePath);
	}
	/** Reset all caches on an EnvState (called from buildStart). */
	function clearEnvState(envState) {
		envState.resolveCache.clear();
		envState.resolveCacheByFile.clear();
		envState.importLocCache.clear();
		envState.seenViolations.clear();
		envState.transformResultCache.clear();
		envState.transformResultKeysByFile.clear();
		envState.postTransformImports.clear();
		envState.serverFnLookupModules.clear();
		envState.pendingViolations.clear();
		envState.deferredBuildViolations.length = 0;
		envState.graph.clear();
		envState.mockExportsByImporter.clear();
	}
	/** Invalidate all env-level caches that reference a specific file. */
	function invalidateFileFromEnv(envState, file) {
		envState.importLocCache.deleteByFile(file);
		const resolveKeys = envState.resolveCacheByFile.get(file);
		if (resolveKeys) {
			for (const key of resolveKeys) envState.resolveCache.delete(key);
			envState.resolveCacheByFile.delete(file);
		}
		envState.graph.invalidate(file);
		envState.mockExportsByImporter.delete(file);
		envState.serverFnLookupModules.delete(file);
		envState.pendingViolations.delete(file);
		const transformKeys = envState.transformResultKeysByFile.get(file);
		if (transformKeys) {
			for (const key of transformKeys) {
				envState.transformResultCache.delete(key);
				envState.postTransformImports.delete(key);
			}
			envState.transformResultKeysByFile.delete(file);
		} else {
			envState.transformResultCache.delete(file);
			envState.postTransformImports.delete(file);
		}
	}
	/** Store a transform result under both the cacheKey and physical file path. */
	function cacheTransformResult(envState, file, cacheKey, result) {
		envState.transformResultCache.set(cacheKey, result);
		const keySet = getOrCreate(envState.transformResultKeysByFile, file, () => /* @__PURE__ */ new Set());
		keySet.add(cacheKey);
		if (cacheKey !== file) {
			envState.transformResultCache.set(file, result);
			keySet.add(file);
		}
	}
	/** Register known Start entrypoints as trace roots for all environments. */
	function registerEntries() {
		const { resolvedStartConfig } = opts.getConfig();
		for (const envDef of opts.environments) {
			const envState = getEnv(envDef.name);
			if (resolvedStartConfig.routerFilePath) envState.graph.addEntry(normalizePath(resolvedStartConfig.routerFilePath));
			if (resolvedStartConfig.startFilePath) envState.graph.addEntry(normalizePath(resolvedStartConfig.startFilePath));
		}
	}
	/**
	* Get the merged set of post-transform imports for a file, checking all
	* code-split variants.  Returns `null` if no post-transform data exists
	* yet (transform hasn't run).
	*
	* Skips `SERVER_FN_LOOKUP` variants because they contain untransformed
	* code — the Start compiler excludes them.
	*/
	function getPostTransformImports(env, file) {
		const keySet = env.transformResultKeysByFile.get(file);
		let merged = null;
		if (keySet) for (const k of keySet) {
			if (hasIdQueryFlag(k, "server-fn-module-lookup")) continue;
			const imports = env.postTransformImports.get(k);
			if (imports) {
				if (!merged) merged = new Set(imports);
				else for (const v of imports) merged.add(v);
			}
		}
		if (!merged) {
			const imports = env.postTransformImports.get(file);
			if (imports) merged = new Set(imports);
		}
		return merged;
	}
	/**
	* Check whether an import edge from `parent` to `target` survived
	* post-transform compilation.
	*
	* Returns:
	*   - `'live'`    — target appears in a non-lookup variant's post-transform imports
	*   - `'dead'`    — post-transform data exists but target is absent (compiler stripped it)
	*   - `'pending'` — transform ran but import data not yet posted
	*   - `'no-data'` — transform never ran (warm-start cached module)
	*/
	function checkEdgeLiveness(env, parent, target) {
		const keySet = env.transformResultKeysByFile.get(parent);
		let anyVariantCached = false;
		if (keySet) for (const k of keySet) {
			if (hasIdQueryFlag(k, "server-fn-module-lookup")) continue;
			const imports = env.postTransformImports.get(k);
			if (imports) {
				anyVariantCached = true;
				if (imports.has(target)) return "live";
			}
		}
		if (!anyVariantCached) {
			const imports = env.postTransformImports.get(parent);
			if (imports) return imports.has(target) ? "live" : "dead";
			return env.transformResultCache.has(parent) || (keySet ? keySet.size > 0 : false) ? "pending" : "no-data";
		}
		return "dead";
	}
	function checkPostTransformReachability(env, file) {
		const visited = /* @__PURE__ */ new Set();
		const queue = [file];
		let hasUnknownEdge = false;
		let qi = 0;
		while (qi < queue.length) {
			const current = queue[qi++];
			if (visited.has(current)) continue;
			visited.add(current);
			if (env.graph.entries.has(current)) return "reachable";
			const importers = env.graph.reverseEdges.get(current);
			if (!importers) continue;
			for (const [parent] of importers) {
				if (visited.has(parent)) continue;
				const liveness = checkEdgeLiveness(env, parent, current);
				if (liveness === "live" || liveness === "no-data") queue.push(parent);
				else if (liveness === "pending") hasUnknownEdge = true;
			}
		}
		return hasUnknownEdge ? "unknown" : "unreachable";
	}
	/**
	* Filter pending violations using edge-survival data.  Returns the subset
	* of violations whose resolved import survived the Start compiler (or all
	* violations when no post-transform data is available yet).
	*
	* Returns `undefined` when all violations were stripped or when we must wait
	* for post-transform data before proceeding.
	*/
	function filterEdgeSurvival(env, file, violations) {
		const postTransform = getPostTransformImports(env, file);
		if (postTransform) {
			const surviving = violations.filter((pv) => !pv.info.resolved || postTransform.has(pv.info.resolved));
			if (surviving.length === 0) return "all-stripped";
			env.pendingViolations.set(file, surviving);
			return {
				active: surviving,
				edgeSurvivalApplied: true
			};
		}
		if (violations.some((pv) => pv.fromPreTransformResolve)) return "await-transform";
		return {
			active: violations,
			edgeSurvivalApplied: false
		};
	}
	/**
	* Process pending violations for the given environment.  Called from the
	* transform-cache hook after each module transform is cached, because new
	* transform data may allow us to confirm or discard pending violations.
	*
	* @param warnFn - `this.warn` from the transform hook context
	*/
	async function processPendingViolations(env, warnFn) {
		if (env.pendingViolations.size === 0) return;
		const toDelete = [];
		for (const [file, violations] of env.pendingViolations) {
			const filtered = filterEdgeSurvival(env, file, violations);
			if (filtered === "all-stripped") {
				toDelete.push(file);
				continue;
			}
			if (filtered === "await-transform") continue;
			const { active, edgeSurvivalApplied } = filtered;
			const isBundledClientDev = config.command === "serve" && config.bundledDev && active.some((pv) => pv.info.envType === "client");
			let status;
			if (env.graph.entries.size > 0) status = checkPostTransformReachability(env, file);
			else status = "unknown";
			if (status === "reachable") {
				for (const pv of active) await emitPendingViolation(env, warnFn, pv);
				toDelete.push(file);
			} else if (status === "unreachable") {
				if (isBundledClientDev) continue;
				toDelete.push(file);
			} else if (config.command === "serve") {
				let emittedAny = false;
				for (const pv of active) {
					if (pv.fromPreTransformResolve) continue;
					if (edgeSurvivalApplied || pv.info.type === "file" && !!pv.info.resolved && isInsideDirectory(pv.info.resolved, config.srcDirectory)) emittedAny = await emitPendingViolation(env, warnFn, pv) || emittedAny;
				}
				if (emittedAny) toDelete.push(file);
			}
		}
		for (const file of toDelete) env.pendingViolations.delete(file);
	}
	async function emitPendingViolation(env, warnFn, pv) {
		if (hasSeen(env, dedupeKey(pv.info))) return false;
		await enrichViolationInfo(env.transformResultProvider, env, pv.info.env, pv.info.envType, pv.info.importer, pv.info);
		if (config.onViolation) {
			if (await config.onViolation(pv.info) === false) return false;
		}
		warnFn(formatViolation(pv.info, config.root));
		return true;
	}
	/**
	* Record a violation as pending for later confirmation via graph
	* reachability.  Called from `resolveId` when `shouldDefer` is true.
	*/
	function deferViolation(env, importerFile, info, isPreTransformResolve) {
		getOrCreate(env.pendingViolations, importerFile, () => []).push({
			info,
			fromPreTransformResolve: isPreTransformResolve
		});
	}
	/** Counter for generating unique per-violation mock module IDs in build mode. */
	let buildViolationCounter = 0;
	async function handleViolation(ctx, env, info, importerIdHint, violationOpts) {
		if (!violationOpts?.silent) {
			await enrichViolationInfo(env.transformResultProvider, env, info.env, info.envType, importerIdHint ?? info.importer, info);
			if (config.onViolation) {
				if (await config.onViolation(info) === false) return void 0;
			}
			if (config.effectiveBehavior === "error") return ctx.error(formatViolation(info, config.root));
			if (!hasSeen(env, dedupeKey(info))) ctx.warn(formatViolation(info, config.root));
		} else if (config.effectiveBehavior === "error" && config.command !== "build") return;
		if (info.type === "file") return info.resolved;
		return resolveViteId(makeMockEdgeModuleId(await resolveExportsForDeniedSpecifier(env, ctx, info, importerIdHint), config.command === "serve" ? mockRuntimeModuleIdFromViolation(info, config.mockAccess, config.root) : `${MOCK_BUILD_PREFIX}${buildViolationCounter++}`));
	}
	/**
	* Unified violation dispatch: either defers or reports immediately.
	*
	* When `shouldDefer` is true (dev mock + build modes), calls
	* `handleViolation` silently to obtain the mock module ID, then stores
	* the violation for later verification:
	*   - Dev mock mode: all violations are deferred to `pendingViolations`
	*     for edge-survival and graph-reachability checking via
	*     `processPendingViolations`.
	*   - Build mode (mock + error): defers to `deferredBuildViolations` for
	*     tree-shaking verification in `generateBundle`.
	*
	* Otherwise reports immediately (dev error mode).  Pre-transform
	* resolves are silenced in error mode because they fire before the
	* compiler runs and there is no deferred verification path.
	*
	* Returns the mock module ID / resolve result from `handleViolation`.
	*/
	async function reportOrDeferViolation(ctx, env, importerFile, importerIdHint, info, shouldDefer, isPreTransformResolve) {
		if (shouldDefer) {
			const result = await handleViolation(ctx, env, info, importerIdHint, { silent: true });
			if (config.command === "build") {
				const mockId = result ?? "";
				env.deferredBuildViolations.push({
					info,
					mockModuleId: mockId,
					checkModuleId: info.type === "marker" ? info.importer : void 0
				});
			} else {
				deferViolation(env, importerFile, info, isPreTransformResolve);
				await processPendingViolations(env, ctx.warn.bind(ctx));
			}
			return result;
		}
		return handleViolation(ctx, env, info, importerIdHint, { silent: isPreTransformResolve });
	}
	return [{
		name: "tanstack-start-core:import-protection",
		enforce: "pre",
		applyToEnvironment(env) {
			if (!config.enabled) return false;
			return environmentNames.has(env.name);
		},
		configResolved(viteConfig) {
			config.root = viteConfig.root;
			config.command = viteConfig.command;
			config.bundledDev = !!viteConfig.experimental.bundledDev;
			const { startConfig, resolvedStartConfig } = opts.getConfig();
			config.srcDirectory = resolvedStartConfig.srcDirectory;
			const userOpts = startConfig.importProtection;
			if (userOpts?.enabled === false) {
				config.enabled = false;
				return;
			}
			config.enabled = true;
			const behavior = userOpts?.behavior;
			if (typeof behavior === "string") config.effectiveBehavior = behavior;
			else config.effectiveBehavior = viteConfig.command === "serve" ? behavior?.dev ?? "mock" : behavior?.build ?? "error";
			config.logMode = userOpts?.log ?? "once";
			config.mockAccess = userOpts?.mockAccess ?? "error";
			config.maxTraceDepth = userOpts?.maxTraceDepth ?? 20;
			if (userOpts?.onViolation) {
				const fn = userOpts.onViolation;
				config.onViolation = (info) => fn(info);
			}
			const defaults = getDefaultImportProtectionRules();
			const pick = (user, fallback) => user ? [...user] : [...fallback];
			const clientSpecifiers = dedupePatterns([...defaults.client.specifiers, ...userOpts?.client?.specifiers ?? []]);
			config.compiledRules.client = {
				specifiers: compileMatchers(clientSpecifiers),
				files: compileMatchers(pick(userOpts?.client?.files, defaults.client.files)),
				excludeFiles: compileMatchers(pick(userOpts?.client?.excludeFiles, defaults.client.excludeFiles))
			};
			config.compiledRules.server = {
				specifiers: compileMatchers(dedupePatterns(pick(userOpts?.server?.specifiers, defaults.server.specifiers))),
				files: compileMatchers(pick(userOpts?.server?.files, defaults.server.files)),
				excludeFiles: compileMatchers(pick(userOpts?.server?.excludeFiles, defaults.server.excludeFiles))
			};
			config.includeMatchers = compileMatchers(userOpts?.include ?? []);
			config.excludeMatchers = compileMatchers(userOpts?.exclude ?? []);
			config.ignoreImporterMatchers = compileMatchers(userOpts?.ignoreImporters ?? []);
			const markers = getMarkerSpecifiers();
			config.markerSpecifiers = {
				serverOnly: new Set(markers.serverOnly),
				clientOnly: new Set(markers.clientOnly)
			};
		},
		configureServer(server) {
			devServer = server;
		},
		buildStart() {
			if (!config.enabled) return;
			clearNormalizeFilePathCache();
			extensionlessIdResolver.clear();
			shouldCheckImporterCache.clear();
			for (const envState of envStates.values()) clearEnvState(envState);
			shared.fileMarkerKind.clear();
			registerEntries();
		},
		hotUpdate(ctx) {
			if (!config.enabled) return;
			for (const mod of ctx.modules) if (mod.id) {
				const id = mod.id;
				const importerFile = normalizeFilePath(id);
				extensionlessIdResolver.invalidateByFile(importerFile);
				shared.fileMarkerKind.delete(importerFile);
				for (const envState of envStates.values()) invalidateFileFromEnv(envState, importerFile);
			}
		},
		resolveId: {
			filter: { id: { exclude: [/^\0(?!tanstack-start-import-protection:)/, /^virtual:(?!tanstack-start-import-protection:)/] } },
			async handler(source, importer, _options) {
				perf?.count("resolveId.calls");
				const envName = this.environment.name;
				const env = getEnv(envName);
				const envType = getImportProtectionEnvType(config, envName);
				const isScanResolve = !!_options.scan;
				if (IMPORT_PROTECTION_DEBUG) {
					const importerPath = importer ? normalizeFilePath(importer) : "(entry)";
					const isEntryResolve = !importer;
					if (process.env.TSR_IMPORT_PROTECTION_DEBUG_FILTER === "entry" ? isEntryResolve : matchesDebugFilter(source, importerPath)) debugLog("resolveId", {
						env: envName,
						envType,
						source,
						importer: importerPath,
						isEntryResolve,
						command: config.command
					});
				}
				const internalVirtualId = resolveInternalVirtualModuleId(source);
				if (internalVirtualId) return internalVirtualId;
				if (!importer) {
					const normalizedSource = normalizeFilePath(source);
					if (!(config.command === "serve" && config.bundledDev && envType === "client" && isInsideDirectory(normalizedSource, config.srcDirectory))) env.graph.addEntry(source);
					await processPendingViolations(env, this.warn.bind(this));
					return;
				}
				if (source.startsWith("\0") || source.startsWith("virtual:")) return;
				const normalizedImporter = normalizeFilePath(importer);
				const isDirectLookup = hasIdQueryFlag(importer, SERVER_FN_LOOKUP);
				if (config.command === "serve" && config.bundledDev && envType === "client") {
					if (isInsideDirectory(normalizedImporter, normalizePath(`${config.srcDirectory}/routes`))) env.graph.addEntry(normalizedImporter);
				}
				if (isDirectLookup) env.serverFnLookupModules.add(normalizedImporter);
				const isServerFnPreTransformResolve = isDirectLookup || env.serverFnLookupModules.has(normalizedImporter);
				const isPreTransformResolve = isServerFnPreTransformResolve || isScanResolve;
				const shouldRecordGraphEdge = !isServerFnPreTransformResolve;
				const isDevMock = config.command === "serve" && config.effectiveBehavior === "mock";
				const isBuild = config.command === "build";
				const shouldDefer = shouldDeferViolation({
					isBuild,
					isDevMock
				});
				const resolveAgainstImporter = async () => {
					const startedAt = perf ? performance.now() : 0;
					perf?.count("thisResolve.calls");
					let primary = null;
					try {
						const resolveOptions = {
							custom: _options.custom,
							isEntry: _options.isEntry,
							skipSelf: true
						};
						if ("attributes" in _options) {
							const resolveOptionsWithAttributes = resolveOptions;
							resolveOptionsWithAttributes.attributes = _options.attributes;
						}
						primary = await this.resolve(source, importer, resolveOptions);
					} finally {
						if (perf) perf.time("thisResolve", startedAt);
					}
					if (primary) return {
						id: canonicalizeResolvedId(primary.id, config.root, resolveExtensionlessAbsoluteId),
						result: primary
					};
					return null;
				};
				const markerKind = config.markerSpecifiers.serverOnly.has(source) ? "server" : config.markerSpecifiers.clientOnly.has(source) ? "client" : void 0;
				if (markerKind) {
					const existing = shared.fileMarkerKind.get(normalizedImporter);
					if (existing && existing !== markerKind) this.error(`[import-protection] File "${getRelativePath(normalizedImporter)}" has both server-only and client-only markers. This is not allowed.`);
					shared.fileMarkerKind.set(normalizedImporter, markerKind);
					const violatesEnv = envType === "client" && markerKind === "server" || envType === "server" && markerKind === "client";
					if (violatesEnv) {
						const info = buildViolationInfo(envName, envType, normalizedImporter, source, { type: "marker" });
						const markerResult = await reportOrDeferViolation(this, env, normalizedImporter, importer, info, shouldDefer, isPreTransformResolve);
						if (isBuild && markerResult != null) return markerResult;
					}
					const envRetroKey = `retro-marker:${normalizedImporter}`;
					if (violatesEnv && !env.seenViolations.has(envRetroKey)) {
						env.seenViolations.add(envRetroKey);
						let retroDeferred = false;
						const importersMap = env.graph.reverseEdges.get(normalizedImporter);
						if (importersMap && importersMap.size > 0) for (const [importerFile, specifier] of importersMap) {
							if (!specifier) continue;
							if (!shouldCheckImporter(importerFile)) continue;
							const markerInfo = buildMarkerViolationFromResolvedImport(envName, envType, importerFile, specifier, normalizedImporter);
							if (markerInfo) {
								deferViolation(env, importerFile, markerInfo, isPreTransformResolve);
								retroDeferred = true;
							}
						}
						if (retroDeferred) await processPendingViolations(env, this.warn.bind(this));
					}
					return markerKind === "server" ? resolvedMarkerVirtualModuleId("server") : resolvedMarkerVirtualModuleId("client");
				}
				if (!shouldCheckImporter(normalizedImporter)) return;
				const matchers = getRulesForEnvironment(envName);
				const specifierMatch = matchesAny(source, matchers.specifiers);
				if (specifierMatch) {
					if (shouldRecordGraphEdge) env.graph.addEdge(source, normalizedImporter, source);
					const info = buildViolationInfo(envName, envType, normalizedImporter, source, {
						type: "specifier",
						pattern: specifierMatch.pattern
					});
					if (shouldDefer && !info.resolved) try {
						const resolvedForInfo = await resolveAgainstImporter();
						if (resolvedForInfo) info.resolved = resolvedForInfo.id;
					} catch {}
					return reportOrDeferViolation(this, env, normalizedImporter, importer, info, shouldDefer, isPreTransformResolve);
				}
				const cacheKey = `${normalizedImporter}:${source}`;
				let resolved;
				let passThroughResult = null;
				if (env.resolveCache.has(cacheKey)) resolved = env.resolveCache.get(cacheKey) ?? null;
				else {
					const resolution = await resolveAgainstImporter();
					resolved = resolution?.id ?? null;
					passThroughResult = resolution?.result ?? null;
					if (resolved !== null) {
						env.resolveCache.set(cacheKey, resolved);
						getOrCreate(env.resolveCacheByFile, normalizedImporter, () => /* @__PURE__ */ new Set()).add(cacheKey);
					}
				}
				if (resolved) {
					const relativePath = getRelativePath(resolved);
					if (isServerFnPreTransformResolve) env.serverFnLookupModules.add(resolved);
					if (shouldRecordGraphEdge) env.graph.addEdge(resolved, normalizedImporter, source);
					if (!isFileExcluded(relativePath, matchers)) {
						const fileMatch = matchers.files.find((matcher) => matcher.test(relativePath));
						if (fileMatch) {
							const info = buildFileViolationInfo(envName, envType, normalizedImporter, source, resolved, fileMatch.pattern);
							return reportOrDeferViolation(this, env, normalizedImporter, importer, info, shouldDefer, isPreTransformResolve);
						}
						const markerInfo = buildMarkerViolationFromResolvedImport(envName, envType, importer, source, resolved);
						if (markerInfo) return reportOrDeferViolation(this, env, normalizedImporter, importer, markerInfo, shouldDefer, isPreTransformResolve);
					}
					if (passThroughResult) return passThroughResult;
				}
			}
		},
		load: {
			filter: { id: new RegExp(getResolvedVirtualModuleMatchers().map(escapeRegExp).join("|")) },
			handler(id) {
				if (IMPORT_PROTECTION_DEBUG) {
					if (matchesDebugFilter(id)) debugLog("load:handler", {
						env: this.environment.name,
						id: normalizePath(id)
					});
				}
				return loadResolvedVirtualModule(id);
			}
		},
		async generateBundle(_options, bundle) {
			const envName = this.environment.name;
			const env = envStates.get(envName);
			if (!env) return;
			if (config.command === "serve" && config.bundledDev) await processPendingViolations(env, this.warn.bind(this));
			if (env.deferredBuildViolations.length === 0) return;
			const candidateCache = /* @__PURE__ */ new Map();
			const toModuleIdCandidates = (id) => {
				let cached = candidateCache.get(id);
				if (cached) return cached;
				const out = /* @__PURE__ */ new Set();
				const normalized = normalizeFilePath(id);
				out.add(id);
				out.add(normalized);
				out.add(relativizePath(normalized, config.root));
				if (normalized.startsWith("/@id/__x00__")) {
					const internal = `\0${normalized.slice(VITE_BROWSER_VIRTUAL_PREFIX.length)}`;
					out.add(internal);
					out.add(relativizePath(normalizeFilePath(internal), config.root));
				}
				if (normalized.startsWith("\0")) {
					const browser = `${VITE_BROWSER_VIRTUAL_PREFIX}${normalized.slice(1)}`;
					out.add(browser);
					out.add(relativizePath(normalizeFilePath(browser), config.root));
				}
				cached = Array.from(out);
				candidateCache.set(id, cached);
				return cached;
			};
			const survivingModules = /* @__PURE__ */ new Set();
			for (const chunk of Object.values(bundle)) if (chunk.type === "chunk") for (const moduleId of Object.keys(chunk.modules)) for (const candidate of toModuleIdCandidates(moduleId)) survivingModules.add(candidate);
			const didModuleSurvive = (moduleId) => toModuleIdCandidates(moduleId).some((candidate) => survivingModules.has(candidate));
			const realViolations = [];
			for (const { info, mockModuleId, checkModuleId } of env.deferredBuildViolations) {
				let survived;
				if (checkModuleId != null) {
					const importerVariantIds = /* @__PURE__ */ new Set([info.importer]);
					const importerKeys = env.transformResultKeysByFile.get(normalizeFilePath(info.importer));
					if (importerKeys) for (const key of importerKeys) importerVariantIds.add(key);
					survived = false;
					for (const importerId of importerVariantIds) if (didModuleSurvive(importerId)) {
						survived = true;
						break;
					}
				} else survived = didModuleSurvive(mockModuleId);
				if (!survived) continue;
				await enrichViolationInfo(env.transformResultProvider, env, info.env, info.envType, info.importer, info);
				if (config.onViolation) {
					if (await config.onViolation(info) === false) continue;
				}
				realViolations.push(info);
			}
			if (realViolations.length === 0) return;
			if (config.effectiveBehavior === "error") this.error(formatViolation(realViolations[0], config.root));
			else {
				const seen = /* @__PURE__ */ new Set();
				for (const info of realViolations) {
					const key = dedupeKey(info);
					if (!seen.has(key)) {
						seen.add(key);
						this.warn(formatViolation(info, config.root));
					}
				}
			}
		},
		closeBundle() {
			const envName = this.environment.name;
			perf?.count("closeBundle.calls");
			perf?.count(`closeBundle.env.${envName}`);
			perf?.flush(config.root, envName);
		}
	}, {
		name: "tanstack-start-core:import-protection-transform-cache",
		applyToEnvironment(env) {
			if (!config.enabled) return false;
			return environmentNames.has(env.name);
		},
		transform: {
			filter: { id: { include: [/\.[cm]?[tj]sx?($|\?)/] } },
			async handler(code, id) {
				perf?.count("transform.calls");
				const envName = this.environment.name;
				const file = normalizeFilePath(id);
				const envType = getImportProtectionEnvType(config, envName);
				const matchers = getRulesForEnvironment(envName);
				const isBuild = config.command === "build";
				if (IMPORT_PROTECTION_DEBUG) {
					if (matchesDebugFilter(file)) debugLog("transform-cache", {
						env: envName,
						id: normalizePath(id),
						file
					});
				}
				if (!shouldCheckImporter(file)) return;
				const selfFileMatch = checkFileDenial(getRelativePath(file), matchers);
				if (selfFileMatch) {
					let exportNames = [];
					try {
						exportNames = getNamedExports(code, file, perf);
					} catch {}
					if (isBuild) return generateSelfContainedMockModule(exportNames);
					const runtimeId = mockRuntimeModuleIdFromViolation({
						type: "file",
						env: envType,
						envType,
						behavior: config.effectiveBehavior === "error" ? "error" : "mock",
						importer: file,
						specifier: relativizePath(file, config.root),
						resolved: file,
						pattern: selfFileMatch.pattern,
						trace: []
					}, config.mockAccess, config.root);
					return generateDevSelfDenialModule(exportNames, runtimeId);
				}
				const cacheKey = normalizePath(id);
				const envState = getEnv(envName);
				const isServerFnLookup = hasIdQueryFlag(id, SERVER_FN_LOOKUP);
				if (isServerFnLookup) envState.serverFnLookupModules.add(file);
				const result = {
					code,
					filename: file,
					map: void 0,
					originalCode: void 0
				};
				if (perf) result.perf = perf;
				if (shouldCaptureDiagnosticSourceMap(code, envType, matchers)) captureDiagnosticSourceMap(result, () => this.getCombinedSourcemap(), "candidate");
				cacheTransformResult(envState, file, cacheKey, result);
				if (isBuild) return void 0;
				const isDevMock = config.effectiveBehavior === "mock";
				const importAnalysisStartedAt = perf ? performance.now() : 0;
				const importSources = getImportSourcesFromResult(result);
				if (perf) perf.time("transform.importAnalysis", importAnalysisStartedAt);
				perf?.count("transform.importSources", importSources.length);
				const resolvedChildren = /* @__PURE__ */ new Set();
				const deniedSourceReplacements = /* @__PURE__ */ new Map();
				for (const src of importSources) try {
					const startedAt = perf ? performance.now() : 0;
					perf?.count("transform.thisResolve.calls");
					const resolved = await this.resolve(src, id, { skipSelf: true });
					if (perf) perf.time("transform.thisResolve", startedAt);
					if (resolved && !resolved.external) {
						const resolvedPath = canonicalizeResolvedId(resolved.id, config.root, resolveExtensionlessAbsoluteId);
						resolvedChildren.add(resolvedPath);
						if (resolved.id.includes("tanstack-start-import-protection:")) {
							let physicalPath;
							const pending = envState.pendingViolations.get(file);
							if (pending) {
								const match = pending.find((pv) => pv.info.specifier === src && pv.info.resolved);
								if (match) physicalPath = match.info.resolved;
							}
							if (physicalPath && physicalPath !== resolvedPath) {
								resolvedChildren.add(physicalPath);
								envState.graph.addEdge(physicalPath, file, src);
							}
						}
						envState.graph.addEdge(resolvedPath, file, src);
						if (isDevMock) {
							const fileMatch = checkFileDenial(getRelativePath(resolvedPath), matchers);
							if (fileMatch) {
								captureDiagnosticSourceMap(result, () => this.getCombinedSourcemap(), "devViolation");
								const info = buildFileViolationInfo(envName, envType, file, src, resolvedPath, fileMatch.pattern);
								const replacement = await reportOrDeferViolation(this, envState, file, id, info, isDevMock, isServerFnLookup);
								if (replacement) deniedSourceReplacements.set(src, replacement.startsWith("\0") ? VITE_BROWSER_VIRTUAL_PREFIX + replacement.slice(1) : replacement);
							}
						}
					}
				} catch {}
				envState.postTransformImports.set(cacheKey, resolvedChildren);
				await processPendingViolations(envState, this.warn.bind(this));
				if (deniedSourceReplacements.size > 0) try {
					const rewritten = rewriteDeniedImports(code, id, new Set(deniedSourceReplacements.keys()), (source) => deniedSourceReplacements.get(source) ?? source);
					if (!rewritten) return;
					const normalizedMap = rewritten.map ? normalizeSourceMap(rewritten.map) : {
						version: 3,
						file: id,
						names: [],
						sources: [id],
						sourcesContent: [code],
						mappings: ""
					};
					return {
						code: rewritten.code,
						map: normalizedMap
					};
				} catch {}
			}
		}
	}];
}
function codeFrameError(code, loc, message) {
	const frame = (0, import_lib$1.codeFrameColumns)(code, {
		start: loc.start,
		end: loc.end
	}, {
		highlightCode: true,
		message
	});
	return new Error(frame);
}
/**
* Converts a bundler module ID to its physical-file identity for diagnostics,
* filesystem matching, and file-based invalidation.
*
* Do not use this for IDs passed to resolve/load hooks or as module cache keys:
* virtual prefixes and queries can be part of the module's semantic identity.
*/
function cleanId(id) {
	if (id.startsWith("\0")) id = id.slice(1);
	const queryIndex = id.indexOf("?");
	return queryIndex === -1 ? id : id.substring(0, queryIndex);
}
/**
* Strips a method call by replacing it with its callee object.
* E.g., `foo().bar()` -> `foo()`
*
* This is a common pattern used when removing method calls from chains
* (e.g., removing .server() from middleware on client, or .validator() on client).
*
* @param callPath - The path to the CallExpression to strip
*/
function stripMethodCall(callPath) {
	if (import_lib.isMemberExpression(callPath.node.callee)) callPath.replaceWith(callPath.node.callee.object);
}
var TSS_SERVERFN_SPLIT_PARAM$2 = "tss-serverfn-split";
var providerHmrAcceptTemplate = import_lib$2.default.template.statements(`
if (import.meta.hot) {
  import.meta.hot.accept(() => {})
}
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(() => {})
}
`, { placeholderPattern: false });
var serverRpcTemplate = import_lib$2.default.template.expression(`createServerRpc(%%serverFnMeta%%, %%fn%%)`);
var clientRpcTemplate = import_lib$2.default.template.expression(`createClientRpc(%%functionId%%)`);
var ssrRpcManifestTemplate = import_lib$2.default.template.expression(`createSsrRpc(%%functionId%%)`);
var RuntimeCodeCache = /* @__PURE__ */ new Map();
function getCachedRuntimeCode(framework, type) {
	let cache = RuntimeCodeCache.get(framework);
	if (!cache) {
		cache = {
			provider: import_lib$2.default.template.ast(`import { createServerRpc } from '@tanstack/${framework}-start/server-rpc'`, { placeholderPattern: false }),
			client: import_lib$2.default.template.ast(`import { createClientRpc } from '@tanstack/${framework}-start/client-rpc'`, { placeholderPattern: false }),
			ssr: import_lib$2.default.template.ast(`import { createSsrRpc } from '@tanstack/${framework}-start/ssr-rpc'`, { placeholderPattern: false })
		};
		RuntimeCodeCache.set(framework, cache);
	}
	return cache[type];
}
/**
* Gets the environment configuration for the current compilation context.
*/
function getEnvConfig(context, isProviderFile) {
	const { env } = context;
	if (isProviderFile) return {
		isClientEnvironment: false,
		runtimeCodeType: "provider"
	};
	if (env === "client") return {
		isClientEnvironment: true,
		runtimeCodeType: "client"
	};
	return {
		isClientEnvironment: false,
		runtimeCodeType: "ssr"
	};
}
/**
* Builds the serverFnMeta object literal AST node.
* The object contains: { id, name, filename }
*/
function buildServerFnMetaObject(functionId, variableName, filename) {
	return import_lib.objectExpression([
		import_lib.objectProperty(import_lib.identifier("id"), import_lib.stringLiteral(functionId)),
		import_lib.objectProperty(import_lib.identifier("name"), import_lib.stringLiteral(variableName)),
		import_lib.objectProperty(import_lib.identifier("filename"), import_lib.stringLiteral(filename))
	]);
}
/**
* Generates the RPC stub expression for provider files.
* Uses pre-compiled template for performance.
*/
function generateProviderRpcStub(serverFnMeta, fn) {
	return serverRpcTemplate({
		serverFnMeta,
		fn
	});
}
/**
* Generates the RPC stub expression for caller files.
* Uses pre-compiled templates for performance.
* Note: Client and SSR callers only receive the functionId string, not the full metadata.
*/
function generateCallerRpcStub(functionId, envConfig) {
	const functionIdLiteral = import_lib.stringLiteral(functionId);
	if (envConfig.runtimeCodeType === "client") return clientRpcTemplate({ functionId: functionIdLiteral });
	return ssrRpcManifestTemplate({ functionId: functionIdLiteral });
}
/**
* Handles createServerFn transformations for a batch of candidates.
*
* This function performs extraction and replacement of server functions
*
* For caller files (non-provider):
* - Replaces the server function with an RPC stub
* - Does not include the handler function body
*
* For provider files:
* - Creates an extractedFn that calls __executeServer
* - Modifies .handler() to pass (extractedFn, serverFn) - two arguments
*
* @param candidates - All ServerFn candidates to process
* @param context - The compilation context with helpers and mutable state
* @returns Result containing runtime code to add, or null if no candidates processed
*/
function handleCreateServerFn(candidates, context) {
	if (candidates.length === 0) return;
	const isProviderFile = context.id.includes(TSS_SERVERFN_SPLIT_PARAM$2);
	if (isProviderFile && context.serverFnProviderModuleDirectives) ensureDirectivePrologue(context.ast, context.serverFnProviderModuleDirectives);
	const envConfig = getEnvConfig(context, isProviderFile);
	const functionNameSet = /* @__PURE__ */ new Set();
	const exportNames = /* @__PURE__ */ new Set();
	const serverFnsById = {};
	const [baseFilename] = context.id.split("?");
	const extractedFilename = `${baseFilename}?${TSS_SERVERFN_SPLIT_PARAM$2}`;
	const relativeFilename = posix.relative(context.root, baseFilename);
	const knownFns = context.getKnownServerFns();
	const cleanedContextId = cleanId(context.id);
	for (const candidate of candidates) {
		const { path: candidatePath, methodChain } = candidate;
		const { validator, handler } = methodChain;
		const candidateVariableDeclarator = getVariableDeclaratorForExpressionPath(candidatePath);
		if (!candidateVariableDeclarator) throw new Error("createServerFn must be assigned to a variable!");
		const variableDeclarator = candidateVariableDeclarator.node;
		if (!import_lib.isIdentifier(variableDeclarator.id)) throw codeFrameError(context.code, variableDeclarator.id.loc, "createServerFn must be assigned to a simple identifier, not a destructuring pattern");
		const existingVariableName = variableDeclarator.id.name;
		let functionName = `${existingVariableName}_createServerFn_handler`;
		while (functionNameSet.has(functionName)) functionName = incrementFunctionNameVersion(functionName);
		functionNameSet.add(functionName);
		const functionId = context.generateFunctionId({
			filename: relativeFilename,
			functionName,
			extractedFilename
		});
		const knownFn = knownFns[functionId];
		const isClientReferenced = envConfig.isClientEnvironment || !!knownFn || envConfig.runtimeCodeType === "ssr";
		const canonicalExtractedFilename = knownFn?.extractedFilename ?? extractedFilename;
		if (validator) {
			if (!validator.callPath.node.arguments[0]) throw new Error("createServerFn().validator() must be called with a validator!");
			if (context.env === "client") stripMethodCall(validator.callPath);
		}
		const handlerFnPath = handler?.firstArgPath;
		if (!handler || !handlerFnPath?.node) throw codeFrameError(context.code, candidatePath.node.callee.loc, `createServerFn must be called with a "handler" property!`);
		if (!import_lib.isExpression(handlerFnPath.node)) throw codeFrameError(context.code, handlerFnPath.node.loc, `handler() must be called with an expression, not a ${handlerFnPath.node.type}`);
		const handlerFn = handlerFnPath.node;
		if (!isProviderFile) serverFnsById[functionId] = {
			functionName,
			functionId,
			filename: cleanedContextId,
			extractedFilename: canonicalExtractedFilename,
			isClientReferenced
		};
		if (isProviderFile) {
			const executeServerArrowFn = import_lib.arrowFunctionExpression([import_lib.identifier("opts")], import_lib.callExpression(import_lib.memberExpression(import_lib.identifier(existingVariableName), import_lib.identifier("__executeServer")), [import_lib.identifier("opts")]));
			const extractedFnInit = generateProviderRpcStub(buildServerFnMetaObject(functionId, existingVariableName, relativeFilename), executeServerArrowFn);
			const extractedFnStatement = import_lib.variableDeclaration("const", [import_lib.variableDeclarator(import_lib.identifier(functionName), extractedFnInit)]);
			const variableDeclaration = candidateVariableDeclarator.parentPath;
			if (!variableDeclaration.isVariableDeclaration()) throw new Error("Expected createServerFn to be in a VariableDeclaration");
			variableDeclaration.insertBefore(extractedFnStatement);
			const extractedFnIdentifier = import_lib.identifier(functionName);
			const serverFnNode = import_lib.cloneNode(handlerFn, true);
			handler.callPath.node.arguments = [extractedFnIdentifier, serverFnNode];
			exportNames.add(functionName);
		} else {
			const rpcStub = generateCallerRpcStub(functionId, envConfig);
			handlerFnPath.replaceWith(rpcStub);
		}
	}
	if (isProviderFile) {
		safeRemoveExports(context.ast);
		if (exportNames.size > 0) context.ast.program.body.push(import_lib.exportNamedDeclaration(void 0, Array.from(exportNames).map((name) => import_lib.exportSpecifier(import_lib.identifier(name), import_lib.identifier(name)))));
		if (context.mode === "dev") context.ast.program.body.push(...providerHmrAcceptTemplate());
	}
	if (!isProviderFile && hasKeys(serverFnsById) && context.onServerFnsById) context.onServerFnsById(serverFnsById);
	const runtimeCode = getCachedRuntimeCode(context.framework, envConfig.runtimeCodeType);
	context.ast.program.body.unshift(import_lib.cloneNode(runtimeCode));
}
/**
* Makes an identifier safe for use as a JavaScript identifier.
*/
function makeIdentifierSafe(identifier) {
	return identifier.replace(/[^a-zA-Z0-9_$]/g, "_").replace(/^[0-9]/, "_$&").replace(/^\$/, "_$").replace(/_{2,}/g, "_").replace(/^_|_$/g, "");
}
/**
* Increments the version number suffix on a function name.
*/
function incrementFunctionNameVersion(functionName) {
	const [realReferenceName, count] = functionName.split(/_(\d+)$/);
	const suffix = `_${Number(count || "0") + 1}`;
	return makeIdentifierSafe(realReferenceName) + suffix;
}
/**
* Removes all exports from the AST while preserving the declarations.
* Used for provider files where we want to re-export only the server functions.
*/
function safeRemoveExports(ast) {
	ast.program.body = ast.program.body.flatMap((node) => {
		if (import_lib.isExportNamedDeclaration(node) || import_lib.isExportDefaultDeclaration(node)) {
			if (import_lib.isFunctionDeclaration(node.declaration) || import_lib.isClassDeclaration(node.declaration) || import_lib.isVariableDeclaration(node.declaration)) {
				if (import_lib.isFunctionDeclaration(node.declaration) || import_lib.isClassDeclaration(node.declaration)) {
					if (!node.declaration.id) return node;
				}
				return node.declaration;
			} else if (node.declaration === null) return [];
		}
		return node;
	});
}
function ensureDirectivePrologue(ast, directiveValues) {
	const directives = ast.program.directives;
	const existingDirectives = new Set(directives.map((directive) => directive.value.value));
	const missingDirectives = [];
	for (const directiveValue of directiveValues) {
		if (!directiveValue || existingDirectives.has(directiveValue)) continue;
		existingDirectives.add(directiveValue);
		missingDirectives.push(directiveValue);
	}
	for (let i = missingDirectives.length - 1; i >= 0; i--) directives.unshift(import_lib.directive(import_lib.directiveLiteral(missingDirectives[i])));
}
/**
* Handles createMiddleware transformations for a batch of candidates.
*
* @param candidates - All Middleware candidates to process
* @param context - The compilation context
*/
function handleCreateMiddleware(candidates, context) {
	if (context.env === "server") throw new Error("handleCreateMiddleware should not be called on the server");
	for (const candidate of candidates) {
		const { validator, server } = candidate.methodChain;
		if (validator) {
			if (!validator.callPath.node.arguments[0]) throw new Error("createMiddleware().validator() must be called with a validator!");
			stripMethodCall(validator.callPath);
		}
		if (server) stripMethodCall(server.callPath);
	}
}
/**
* Handles createIsomorphicFn transformations for a batch of candidates.
*
* @param candidates - All IsomorphicFn candidates to process
* @param context - The compilation context
*/
function handleCreateIsomorphicFn(candidates, context) {
	for (const candidate of candidates) {
		const { path, methodChain } = candidate;
		const envCallInfo = context.env === "client" ? methodChain.client : methodChain.server;
		if (!envCallInfo) {
			path.replaceWith(import_lib.arrowFunctionExpression([], import_lib.blockStatement([])));
			continue;
		}
		const innerFn = envCallInfo.firstArgPath?.node;
		if (!import_lib.isExpression(innerFn)) throw new Error(`createIsomorphicFn().${context.env}(func) must be called with a function!`);
		path.replaceWith(innerFn);
	}
}
function capitalize(str) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**
* Handles serverOnly/clientOnly function transformations for a batch of candidates.
*
* @param candidates - All EnvOnly candidates to process (all same kind)
* @param context - The compilation context
* @param kind - The specific kind (ServerOnlyFn or ClientOnlyFn)
*/
function handleEnvOnlyFn(candidates, context, kind) {
	const targetEnv = kind === "ClientOnlyFn" ? "client" : "server";
	for (const candidate of candidates) {
		const { path } = candidate;
		if (context.env === targetEnv) {
			const innerFn = path.node.arguments[0];
			if (!import_lib.isExpression(innerFn)) throw new Error(`create${capitalize(targetEnv)}OnlyFn() must be called with a function!`);
			path.replaceWith(innerFn);
		} else path.replaceWith(import_lib.arrowFunctionExpression([], import_lib.blockStatement([import_lib.throwStatement(import_lib.newExpression(import_lib.identifier("Error"), [import_lib.stringLiteral(`create${capitalize(targetEnv)}OnlyFn() functions can only be called on the ${targetEnv}!`)]))])));
	}
}
/**
* Handles <ClientOnly> JSX elements on the server side.
*
* On the server, the children of <ClientOnly> should be removed since they
* are client-only code. Only the fallback prop (if present) will be rendered.
*
* Transform:
*   <ClientOnly fallback={<Loading />}>{clientOnlyContent}</ClientOnly>
* Into:
*   <ClientOnly fallback={<Loading />} />
*
* Or if no fallback:
*   <ClientOnly>{clientOnlyContent}</ClientOnly>
* Into:
*   <ClientOnly />
*/
function handleClientOnlyJSX(path, _opts) {
	const element = path.node;
	element.children = [];
	element.openingElement.selfClosing = true;
	element.closingElement = null;
}
function isLookupKind(kind) {
	return kind in BuiltInLookupSetup || isExternalLookupKind(kind);
}
function getExternalLookupKind(transform) {
	return `External:${transform.name}`;
}
function isExternalLookupKind(kind) {
	return typeof kind === "string" && kind.startsWith("External:");
}
function isCompilerTransformEnabledForEnv(transform, env) {
	return isStartCompilerEnvironmentEnabled(transform.environment, env);
}
function isStartCompilerPluginEnabledForEnv(plugin, env) {
	return isStartCompilerEnvironmentEnabled(plugin.environment, env);
}
function isStartCompilerEnvironmentEnabled(environment, env) {
	if (!environment) return true;
	if (Array.isArray(environment)) return environment.includes(env);
	return environment === env;
}
var BuiltInLookupSetup = {
	ServerFn: {
		type: "methodChain",
		candidateCallIdentifier: /* @__PURE__ */ new Set(["handler"])
	},
	Middleware: {
		type: "methodChain",
		candidateCallIdentifier: /* @__PURE__ */ new Set([
			"server",
			"client",
			"createMiddlewares"
		])
	},
	IsomorphicFn: {
		type: "methodChain",
		candidateCallIdentifier: /* @__PURE__ */ new Set(["server", "client"])
	},
	ServerOnlyFn: {
		type: "directCall",
		factoryNames: /* @__PURE__ */ new Set(["createServerOnlyFn"])
	},
	ClientOnlyFn: {
		type: "directCall",
		factoryNames: /* @__PURE__ */ new Set(["createClientOnlyFn"])
	},
	ClientOnlyJSX: {
		type: "jsx",
		componentName: "ClientOnly"
	}
};
var KindDetectionPatterns = {
	ServerFn: /\bcreateServerFn\b|\.\s*handler\s*\(/,
	Middleware: /createMiddleware/,
	IsomorphicFn: /createIsomorphicFn/,
	ServerOnlyFn: /createServerOnlyFn/,
	ClientOnlyFn: /createClientOnlyFn/,
	ClientOnlyJSX: /<ClientOnly|import\s*\{[^}]*\bClientOnly\b/
};
var LookupKindsPerEnv = {
	client: /* @__PURE__ */ new Set([
		"Middleware",
		"ServerFn",
		"IsomorphicFn",
		"ServerOnlyFn",
		"ClientOnlyFn"
	]),
	server: /* @__PURE__ */ new Set([
		"ServerFn",
		"IsomorphicFn",
		"ServerOnlyFn",
		"ClientOnlyFn",
		"ClientOnlyJSX"
	])
};
function getLookupKindsForEnv(env, opts) {
	const kinds = new Set(LookupKindsPerEnv[env]);
	for (const transform of opts?.compilerTransforms ?? []) if (isCompilerTransformEnabledForEnv(transform, env)) kinds.add(getExternalLookupKind(transform));
	return kinds;
}
/**
* Registry mapping each LookupKind to its handler function.
* When adding a new kind, add its handler here.
*/
var BuiltInKindHandlers = {
	ServerFn: handleCreateServerFn,
	Middleware: handleCreateMiddleware,
	IsomorphicFn: handleCreateIsomorphicFn,
	ServerOnlyFn: handleEnvOnlyFn,
	ClientOnlyFn: handleEnvOnlyFn
};
var BuiltInKindHandlerOrder = [
	"ServerFn",
	"Middleware",
	"IsomorphicFn",
	"ServerOnlyFn",
	"ClientOnlyFn"
];
var AllBuiltInLookupKinds = Object.keys(BuiltInLookupSetup);
/**
* Detects which LookupKinds are present in the code using string matching.
* This is a fast pre-scan before AST parsing to limit the work done during compilation.
*/
function detectKindsInCode(code, env, opts) {
	const detected = /* @__PURE__ */ new Set();
	const validForEnv = getLookupKindsForEnv(env, opts);
	for (const kind of AllBuiltInLookupKinds) {
		const pattern = KindDetectionPatterns[kind];
		pattern.lastIndex = 0;
		if (validForEnv.has(kind) && pattern.test(code)) detected.add(kind);
	}
	for (const transform of opts?.compilerTransforms ?? []) {
		if (!isCompilerTransformEnabledForEnv(transform, env)) continue;
		transform.detect.lastIndex = 0;
		if (transform.detect.test(code)) detected.add(getExternalLookupKind(transform));
	}
	return detected;
}
var IdentifierToKinds = /* @__PURE__ */ new Map();
for (const kind of AllBuiltInLookupKinds) {
	const setup = BuiltInLookupSetup[kind];
	if (setup.type === "methodChain") for (const id of setup.candidateCallIdentifier) {
		let kinds = IdentifierToKinds.get(id);
		if (!kinds) {
			kinds = /* @__PURE__ */ new Set();
			IdentifierToKinds.set(id, kinds);
		}
		kinds.add(kind);
	}
}
function getLookupSetup(kind, externalLookupSetup) {
	if (kind in BuiltInLookupSetup) return BuiltInLookupSetup[kind];
	if (isExternalLookupKind(kind)) return externalLookupSetup?.get(kind);
}
/**
* Checks if all kinds in the set are guaranteed to be top-level only.
* Only ServerFn is always declared at module level (must be assigned to a variable).
* Middleware, IsomorphicFn, ServerOnlyFn, ClientOnlyFn can be nested inside functions.
* When all kinds are top-level-only, we can use a fast scan instead of full traversal.
*/
function areAllKindsTopLevelOnly(kinds) {
	return kinds.size === 1 && kinds.has("ServerFn");
}
/**
* Checks if we need to detect JSX elements (e.g., <ClientOnly>).
*/
function needsJSXDetection(kinds, externalLookupSetup) {
	for (const kind of kinds) if (getLookupSetup(kind, externalLookupSetup)?.type === "jsx") return true;
	return false;
}
/**
* Checks if a CallExpression is a direct-call candidate for NESTED detection.
* Returns true if the callee is a known factory function name.
* This is stricter than top-level detection because we need to filter out
* invocations of existing server functions (e.g., `myServerFn()`).
*/
function isNestedDirectCallCandidate(node, lookupKinds, externalLookupSetup) {
	let calleeName;
	if (import_lib.isIdentifier(node.callee)) calleeName = node.callee.name;
	else if (import_lib.isMemberExpression(node.callee) && import_lib.isIdentifier(node.callee.property)) calleeName = node.callee.property.name;
	if (!calleeName) return false;
	for (const kind of lookupKinds) {
		if (isExternalLookupKind(kind)) continue;
		const setup = getLookupSetup(kind, externalLookupSetup);
		if (setup?.type === "directCall" && setup.factoryNames.has(calleeName)) return true;
	}
	return false;
}
function isSimpleDirectCallExpression(node) {
	return import_lib.isIdentifier(node.callee) || import_lib.isMemberExpression(node.callee) && import_lib.isIdentifier(node.callee.object) && import_lib.isIdentifier(node.callee.property);
}
function isTopLevelDirectCallCandidateNode(node) {
	return isSimpleDirectCallExpression(node);
}
function getPotentialCandidateCallExpression(node) {
	if (!node) return null;
	const unwrapped = unwrapExpression(node);
	return import_lib.isCallExpression(unwrapped) ? unwrapped : null;
}
/**
* Checks if a CallExpression path is a top-level direct-call candidate.
* Top-level means the call is the init of a VariableDeclarator at program level.
* We accept any simple identifier call or namespace call at top level
* (e.g., `createServerOnlyFn()`, `TanStackStart.createServerOnlyFn()`) and let
* resolution verify it. This handles renamed imports.
*/
function isTopLevelDirectCallCandidate(path) {
	const node = path.node;
	if (!isSimpleDirectCallExpression(node)) return false;
	const variableDeclarator = getVariableDeclaratorForExpressionPath(path);
	if (!variableDeclarator) return false;
	const variableDeclaration = variableDeclarator.parentPath;
	if (!variableDeclaration.isVariableDeclaration()) return false;
	const parent = variableDeclaration.parentPath;
	return parent.isProgram() || parent.isExportNamedDeclaration() && parent.parentPath.isProgram();
}
/**
* Whether the call is `receiver.method()` with a receiver that is not a
* namespace import, e.g. `z.object()` with `import { z } from 'zod'`.
*
* Resolution gives such a call the kind of the receiver itself, which only
* yields a direct-call candidate when the receiver is a factory and the code
* calls one of its properties (`createServerOnlyFn.bind()`). Skipping these
* calls saves loading the receiver's module (all of zod, here) only to learn
* that `z` is not a Start factory.
*/
function isMemberCallOnNonNamespaceReceiver(node, bindings) {
	if (!import_lib.isMemberExpression(node.callee) || !import_lib.isIdentifier(node.callee.object)) return false;
	const binding = bindings.get(node.callee.object.name);
	return !(binding?.type === "import" && binding.importedName === "*");
}
function isDirectCallCandidateForKind(kind, externalLookupSetup) {
	return getLookupSetup(kind, externalLookupSetup)?.type === "directCall";
}
function hasBuiltInDirectCallKinds(kinds) {
	for (const kind of kinds) {
		if (isExternalLookupKind(kind)) continue;
		if (BuiltInLookupSetup[kind].type === "directCall") return true;
	}
	return false;
}
function hasExternalLookupKinds(kinds) {
	for (const kind of kinds) if (isExternalLookupKind(kind)) return true;
	return false;
}
function hasExternalDirectCallCandidates(candidates) {
	return candidates.identifiers.size > 0 || candidates.namespaces.size > 0;
}
function getExternalDirectCallCandidateKind(path, candidates) {
	const node = path.node;
	if (import_lib.isIdentifier(node.callee)) {
		const kind = candidates.identifiers.get(node.callee.name);
		if (!kind) return void 0;
		return path.scope.getBinding(node.callee.name)?.path.isImportSpecifier() ? kind : void 0;
	}
	if (import_lib.isMemberExpression(node.callee) && import_lib.isIdentifier(node.callee.object) && import_lib.isIdentifier(node.callee.property)) {
		const kind = candidates.namespaces.get(node.callee.object.name)?.get(node.callee.property.name);
		if (!kind) return void 0;
		return path.scope.getBinding(node.callee.object.name)?.path.isImportNamespaceSpecifier() ? kind : void 0;
	}
}
var StartCompiler = class {
	options;
	moduleCache = /* @__PURE__ */ new Map();
	initialized = false;
	validLookupKinds;
	externalTransformsByKind = /* @__PURE__ */ new Map();
	externalLookupSetup = /* @__PURE__ */ new Map();
	compilerPlugins;
	externalDirectCallKindsBySource = /* @__PURE__ */ new Map();
	resolveIdCache = /* @__PURE__ */ new Map();
	exportResolutionCache = /* @__PURE__ */ new Map();
	knownRootImports = /* @__PURE__ */ new Map();
	entryIdToFunctionId = /* @__PURE__ */ new Map();
	functionIds = /* @__PURE__ */ new Set();
	constructor(options) {
		this.options = options;
		this.validLookupKinds = options.lookupKinds;
		this.compilerPlugins = (options.compilerPlugins ?? []).filter((plugin) => isStartCompilerPluginEnabledForEnv(plugin, options.env));
		for (const transform of options.compilerTransforms ?? []) {
			const kind = getExternalLookupKind(transform);
			if (!this.validLookupKinds.has(kind)) continue;
			this.externalTransformsByKind.set(kind, transform);
			const factoryNames = /* @__PURE__ */ new Set();
			for (const entry of transform.imports) {
				factoryNames.add(entry.rootExport);
				let rootExports = this.externalDirectCallKindsBySource.get(entry.libName);
				if (!rootExports) {
					rootExports = /* @__PURE__ */ new Map();
					this.externalDirectCallKindsBySource.set(entry.libName, rootExports);
				}
				rootExports.set(entry.rootExport, kind);
			}
			this.externalLookupSetup.set(kind, {
				type: "directCall",
				factoryNames
			});
		}
	}
	/**
	* Generates a unique function ID for a server function.
	* In dev mode, uses a base64-encoded JSON with file path and export name.
	* In build mode, uses SHA256 hash or custom generator.
	*/
	generateFunctionId(opts) {
		if (this.mode === "dev") {
			const encodeModuleSpecifier = this.options.devServerFnModuleSpecifierEncoder;
			if (!encodeModuleSpecifier) throw new Error("devServerFnModuleSpecifierEncoder is required in dev mode.");
			const serverFn = {
				file: encodeModuleSpecifier({
					extractedFilename: opts.extractedFilename,
					root: this.options.root
				}),
				export: opts.functionName
			};
			return Buffer.from(JSON.stringify(serverFn), "utf8").toString("base64url");
		}
		const entryId = `${opts.filename}--${opts.functionName}`;
		let functionId = this.entryIdToFunctionId.get(entryId);
		if (functionId === void 0) {
			const knownFn = Object.values(this.options.getKnownServerFns()).find((serverFn) => serverFn.functionName === opts.functionName && serverFn.extractedFilename === opts.extractedFilename);
			if (knownFn) functionId = knownFn.functionId;
			if (this.options.generateFunctionId) functionId ??= this.options.generateFunctionId({
				filename: opts.filename,
				functionName: opts.functionName
			});
			if (!functionId) functionId = crypto.createHash("sha256").update(entryId).digest("hex");
			if (this.functionIds.has(functionId)) {
				let deduplicatedId;
				let iteration = 0;
				do
					deduplicatedId = `${functionId}_${++iteration}`;
				while (this.functionIds.has(deduplicatedId));
				functionId = deduplicatedId;
			}
			this.entryIdToFunctionId.set(entryId, functionId);
			this.functionIds.add(functionId);
		}
		return functionId;
	}
	get mode() {
		return this.options.mode ?? "dev";
	}
	getExternalDirectCallCandidates(kinds, moduleInfo) {
		const identifiers = /* @__PURE__ */ new Map();
		const namespaces = /* @__PURE__ */ new Map();
		if (this.externalDirectCallKindsBySource.size === 0) return {
			identifiers,
			namespaces
		};
		for (const [localName, binding] of moduleInfo.bindings) {
			if (binding.type !== "import") continue;
			const rootExports = this.externalDirectCallKindsBySource.get(binding.source);
			if (!rootExports) continue;
			if (binding.importedName === "*") {
				const namespaceExports = /* @__PURE__ */ new Map();
				for (const [rootExport, kind] of rootExports) if (kinds.has(kind)) namespaceExports.set(rootExport, kind);
				if (namespaceExports.size > 0) namespaces.set(localName, namespaceExports);
			} else {
				const kind = rootExports.get(binding.importedName);
				if (kind && kinds.has(kind)) identifiers.set(localName, kind);
			}
		}
		return {
			identifiers,
			namespaces
		};
	}
	async resolveIdCached(id, importer) {
		if (this.mode === "dev") return this.options.resolveId(id, importer);
		const cacheKey = importer ? `${importer}::${id}` : id;
		const cached = this.resolveIdCache.get(cacheKey);
		if (cached !== void 0) return cached;
		const resolved = await this.options.resolveId(id, importer);
		this.resolveIdCache.set(cacheKey, resolved);
		return resolved;
	}
	getExportResolutionCache(moduleId) {
		let cache = this.exportResolutionCache.get(moduleId);
		if (!cache) {
			cache = /* @__PURE__ */ new Map();
			this.exportResolutionCache.set(moduleId, cache);
		}
		return cache;
	}
	init() {
		this.knownRootImports.set("@tanstack/start-fn-stubs", /* @__PURE__ */ new Map([
			["createIsomorphicFn", "IsomorphicFn"],
			["createServerOnlyFn", "ServerOnlyFn"],
			["createClientOnlyFn", "ClientOnlyFn"]
		]));
		this.knownRootImports.set("@tanstack/start-client-core", /* @__PURE__ */ new Map([
			["createServerFn", "Root"],
			["createIsomorphicFn", "IsomorphicFn"],
			["createServerOnlyFn", "ServerOnlyFn"],
			["createClientOnlyFn", "ClientOnlyFn"],
			["createMiddleware", "Middleware"],
			["createStart", "Root"]
		]));
		for (const config of this.options.lookupConfigurations) {
			let libExports = this.knownRootImports.get(config.libName);
			if (!libExports) {
				libExports = /* @__PURE__ */ new Map();
				this.knownRootImports.set(config.libName, libExports);
			}
			libExports.set(config.rootExport, config.kind);
			if (config.kind !== "Root") {
				if (getLookupSetup(config.kind, this.externalLookupSetup)?.type === "jsx") continue;
			}
			const libId = config.libName;
			let rootModule = this.moduleCache.get(libId);
			if (!rootModule) {
				rootModule = {
					bindings: /* @__PURE__ */ new Map(),
					exports: /* @__PURE__ */ new Map(),
					id: libId,
					reExportAllSources: []
				};
				this.moduleCache.set(libId, rootModule);
			}
			rootModule.exports.set(config.rootExport, config.rootExport);
			rootModule.exports.set("*", config.rootExport);
			rootModule.bindings.set(config.rootExport, {
				type: "var",
				init: null,
				resolvedKind: config.kind
			});
			this.moduleCache.set(libId, rootModule);
		}
		this.initialized = true;
	}
	/**
	* Extracts bindings and exports from an already-parsed AST.
	*/
	extractModuleInfo(ast, id) {
		const extracted = extractModuleInfoFromAst(ast);
		const info = {
			id,
			bindings: new Map(extracted.bindings),
			exports: extracted.exports,
			reExportAllSources: extracted.reExportAllSources
		};
		this.moduleCache.set(id, info);
		return info;
	}
	ingestModule({ code, id, parserFilename }) {
		const ast = parseAst({
			code,
			filename: parserFilename ?? cleanId(id)
		});
		return {
			info: this.extractModuleInfo(ast, id),
			ast
		};
	}
	invalidateModule(id) {
		return this.invalidateModules([id]).size > 0;
	}
	invalidateModules(ids) {
		const normalizedIds = /* @__PURE__ */ new Set();
		for (const id of ids) {
			normalizedIds.add(cleanId(id));
			for (const plugin of this.compilerPlugins) plugin.invalidateModule?.({
				id,
				envName: this.options.envName
			});
		}
		const deletedModuleIds = /* @__PURE__ */ new Set();
		if (normalizedIds.size === 0) return deletedModuleIds;
		for (const moduleId of Array.from(this.moduleCache.keys())) {
			const normalizedModuleId = cleanId(moduleId);
			if (normalizedIds.has(normalizedModuleId)) {
				this.moduleCache.delete(moduleId);
				deletedModuleIds.add(normalizedModuleId);
			}
		}
		for (const [moduleId, moduleInfo] of this.moduleCache) {
			if (this.knownRootImports.has(moduleId)) continue;
			for (const binding of moduleInfo.bindings.values()) binding.resolvedKind = void 0;
		}
		this.resolveIdCache.clear();
		this.exportResolutionCache.clear();
		return deletedModuleIds;
	}
	async getTransitiveImporters(ids) {
		const discoveredImporters = /* @__PURE__ */ new Set();
		const pendingTargets = typeof ids === "string" ? [cleanId(ids)] : Array.from(ids, (id) => cleanId(id));
		const visitedTargets = /* @__PURE__ */ new Set();
		const resolveCache = /* @__PURE__ */ new Map();
		const importersByTarget = /* @__PURE__ */ new Map();
		const resolveSource = (source, importer) => {
			const cacheKey = `${importer}::${source}`;
			let resolved = resolveCache.get(cacheKey);
			if (!resolved) {
				resolved = this.resolveIdCached(source, importer);
				resolveCache.set(cacheKey, resolved);
			}
			return resolved;
		};
		await Promise.all(Array.from(this.moduleCache.values()).map(async (moduleInfo) => {
			if (this.knownRootImports.has(moduleInfo.id)) return;
			const moduleId = cleanId(moduleInfo.id);
			const importSources = new Set(moduleInfo.reExportAllSources);
			for (const binding of moduleInfo.bindings.values()) if (binding.type === "import") importSources.add(binding.source);
			await Promise.all(Array.from(importSources, async (source) => {
				const resolved = await resolveSource(source, moduleInfo.id);
				if (!resolved) return;
				const targetId = cleanId(resolved);
				if (targetId === moduleId) return;
				let importers = importersByTarget.get(targetId);
				if (!importers) {
					importers = /* @__PURE__ */ new Set();
					importersByTarget.set(targetId, importers);
				}
				importers.add(moduleId);
			}));
		}));
		while (pendingTargets.length > 0) {
			const targetId = pendingTargets.pop();
			if (visitedTargets.has(targetId)) continue;
			visitedTargets.add(targetId);
			for (const importerId of importersByTarget.get(targetId) ?? []) {
				if (discoveredImporters.has(importerId)) continue;
				discoveredImporters.add(importerId);
				pendingTargets.push(importerId);
			}
		}
		return discoveredImporters;
	}
	async compile({ code, id, parserFilename, detectedKinds, warn }) {
		if (!this.initialized) await this.init();
		const fileKinds = detectedKinds ? new Set([...detectedKinds].filter((k) => this.validLookupKinds.has(k))) : this.validLookupKinds;
		const astTransformPlugins = this.getAstTransformPluginsForCode(code);
		const ast = this.ingestModule({
			code,
			id,
			parserFilename
		}).ast;
		const warnFn = warn ?? this.options.warn;
		let astHasChanges = false;
		builtInTransforms: {
			if (fileKinds.size === 0) break builtInTransforms;
			const hasExternalKinds = hasExternalLookupKinds(fileKinds);
			const checkDirectCalls = hasBuiltInDirectCallKinds(fileKinds) || fileKinds.has("ServerFn") && !hasExternalKinds && hasBuiltInDirectCallKinds(this.validLookupKinds);
			const canUseFastPath = areAllKindsTopLevelOnly(fileKinds);
			const candidatePaths = [];
			const chainCallPaths = /* @__PURE__ */ new Map();
			const jsxCandidatePaths = [];
			const checkJSX = needsJSXDetection(fileKinds, this.externalLookupSetup);
			const moduleInfo = this.moduleCache.get(id);
			const externalDirectCallCandidates = this.getExternalDirectCallCandidates(fileKinds, moduleInfo);
			const checkExternalDirectCalls = hasExternalDirectCallCandidates(externalDirectCallCandidates);
			if (canUseFastPath) {
				const candidateIndices = [];
				for (let i = 0; i < ast.program.body.length; i++) {
					const node = ast.program.body[i];
					let declarations;
					if (import_lib.isVariableDeclaration(node)) declarations = node.declarations;
					else if (import_lib.isExportNamedDeclaration(node) && node.declaration) {
						if (import_lib.isVariableDeclaration(node.declaration)) declarations = node.declaration.declarations;
					}
					if (declarations) for (const decl of declarations) {
						const init = getPotentialCandidateCallExpression(decl.init);
						if (init) {
							if (isMethodChainCandidate(init, fileKinds) || checkDirectCalls && isTopLevelDirectCallCandidateNode(init)) {
								candidateIndices.push(i);
								break;
							}
						}
					}
				}
				if (candidateIndices.length === 0) break builtInTransforms;
				import_lib$2.default.traverse(ast, { Program(programPath) {
					const bodyPaths = programPath.get("body");
					for (const idx of candidateIndices) {
						const stmtPath = bodyPaths[idx];
						if (!stmtPath) continue;
						stmtPath.traverse({ CallExpression(path) {
							const node = path.node;
							const parent = path.parent;
							if (import_lib.isMemberExpression(parent) && import_lib.isCallExpression(path.parentPath.parent)) {
								chainCallPaths.set(node, path);
								return;
							}
							if (isMethodChainCandidate(node, fileKinds)) {
								candidatePaths.push({ path });
								return;
							}
							if (checkExternalDirectCalls) {
								const kind = getExternalDirectCallCandidateKind(path, externalDirectCallCandidates);
								if (kind) {
									candidatePaths.push({
										path,
										kind
									});
									return;
								}
							}
							if (isTopLevelDirectCallCandidate(path) && !isMemberCallOnNonNamespaceReceiver(node, moduleInfo.bindings)) candidatePaths.push({ path });
						} });
					}
					programPath.stop();
				} });
			} else import_lib$2.default.traverse(ast, {
				CallExpression: (path) => {
					const node = path.node;
					const parent = path.parent;
					if (import_lib.isMemberExpression(parent) && import_lib.isCallExpression(path.parentPath.parent)) {
						chainCallPaths.set(node, path);
						return;
					}
					if (isMethodChainCandidate(node, fileKinds)) {
						candidatePaths.push({ path });
						return;
					}
					if (checkExternalDirectCalls) {
						const kind = getExternalDirectCallCandidateKind(path, externalDirectCallCandidates);
						if (kind) {
							candidatePaths.push({
								path,
								kind
							});
							return;
						}
					}
					if (checkDirectCalls && isTopLevelDirectCallCandidate(path) && !isMemberCallOnNonNamespaceReceiver(node, moduleInfo.bindings)) {
						candidatePaths.push({ path });
						return;
					}
					if (checkDirectCalls) {
						if (isNestedDirectCallCandidate(node, fileKinds, this.externalLookupSetup)) {
							candidatePaths.push({ path });
							return;
						}
					}
				},
				JSXElement: (path) => {
					if (!checkJSX) return;
					const nameNode = path.node.openingElement.name;
					if (!import_lib.isJSXIdentifier(nameNode)) return;
					const componentName = nameNode.name;
					const binding = moduleInfo.bindings.get(componentName);
					if (!binding || binding.type !== "import") return;
					const knownExports = this.knownRootImports.get(binding.source);
					if (!knownExports) return;
					if (knownExports.get(binding.importedName) !== "ClientOnlyJSX") return;
					jsxCandidatePaths.push(path);
				}
			});
			if (candidatePaths.length === 0 && jsxCandidatePaths.length === 0) break builtInTransforms;
			const resolvedCandidates = [];
			const unresolvedCandidates = [];
			for (const candidate of candidatePaths) if (candidate.kind) resolvedCandidates.push({
				path: candidate.path,
				kind: candidate.kind
			});
			else unresolvedCandidates.push(candidate);
			if (unresolvedCandidates.length > 0) resolvedCandidates.push(...await Promise.all(unresolvedCandidates.map(async (candidate) => ({
				path: candidate.path,
				kind: await this.resolveExprKind(candidate.path.node, id)
			}))));
			const validCandidates = resolvedCandidates.filter(({ path, kind }) => {
				if (!this.validLookupKinds.has(kind)) return false;
				if (isLookupKind(kind) && kind !== "ClientOnlyJSX" && !isMethodChainCandidate(path.node, fileKinds)) return isDirectCallCandidateForKind(kind, this.externalLookupSetup);
				return true;
			});
			if (validCandidates.length === 0 && jsxCandidatePaths.length === 0) break builtInTransforms;
			const pathsToRewrite = [];
			for (const { path, kind } of validCandidates) {
				const node = path.node;
				const methodChain = {
					middleware: null,
					validator: null,
					handler: null,
					server: null,
					client: null
				};
				let currentNode = node;
				let currentPath = path;
				while (true) {
					const callee = currentNode.callee;
					if (!import_lib.isMemberExpression(callee)) break;
					if (import_lib.isIdentifier(callee.property)) {
						const name = callee.property.name;
						if (name in methodChain) {
							const args = currentPath.get("arguments");
							const firstArgPath = Array.isArray(args) && args.length > 0 ? args[0] ?? null : null;
							methodChain[name] = {
								callPath: currentPath,
								firstArgPath
							};
						}
					}
					if (!import_lib.isCallExpression(callee.object)) break;
					currentNode = callee.object;
					const nextPath = chainCallPaths.get(currentNode);
					if (!nextPath) break;
					currentPath = nextPath;
				}
				pathsToRewrite.push({
					path,
					kind,
					methodChain
				});
			}
			const refIdents = find_referenced_identifiers_default(ast);
			const context = {
				ast,
				id,
				code,
				env: this.options.env,
				envName: this.options.envName,
				mode: this.mode,
				root: this.options.root,
				framework: this.options.framework,
				providerEnvName: this.options.providerEnvName,
				types: import_lib,
				parseExpression: (expressionCode) => import_lib$2.default.template.expression(expressionCode, { placeholderPattern: false })(),
				warn: warnFn,
				generateFunctionId: (opts) => this.generateFunctionId(opts),
				getKnownServerFns: this.options.getKnownServerFns,
				serverFnProviderModuleDirectives: this.options.serverFnProviderModuleDirectives,
				onServerFnsById: this.options.onServerFnsById
			};
			const candidatesByKind = /* @__PURE__ */ new Map();
			for (const { path: candidatePath, kind, methodChain } of pathsToRewrite) {
				const candidate = {
					path: candidatePath,
					methodChain
				};
				const existing = candidatesByKind.get(kind);
				if (existing) existing.push(candidate);
				else candidatesByKind.set(kind, [candidate]);
			}
			this.runExternalTransforms("pre", candidatesByKind, context);
			for (const kind of BuiltInKindHandlerOrder) {
				const candidates = candidatesByKind.get(kind);
				if (!candidates) continue;
				const handler = BuiltInKindHandlers[kind];
				handler(candidates, context, kind);
			}
			this.runExternalTransforms("post", candidatesByKind, context);
			for (const jsxPath of jsxCandidatePaths) handleClientOnlyJSX(jsxPath, { env: "server" });
			deadCodeElimination$1(ast, refIdents);
			astHasChanges = true;
		}
		if (astTransformPlugins.length > 0) astHasChanges = this.runAstTransforms({
			ast,
			code,
			id,
			transforms: astTransformPlugins,
			warn: warnFn
		}) || astHasChanges;
		return astHasChanges ? this.generateResultFromAst(ast, code, id) : null;
	}
	generateResultFromAst(ast, sourceCode, id) {
		const result = generateFromAst(ast, {
			sourceMaps: true,
			sourceFileName: id,
			filename: id
		});
		if (result.map) result.map.sourcesContent = [sourceCode];
		return result;
	}
	getAstTransformPluginsForCode(code) {
		return this.compilerPlugins.filter((plugin) => {
			if (!plugin.transformAst) return false;
			if (!plugin.detect) return true;
			plugin.detect.lastIndex = 0;
			return plugin.detect.test(code);
		});
	}
	runAstTransforms({ ast, code, id, transforms, warn }) {
		let modified = false;
		for (const plugin of transforms) {
			const context = {
				ast,
				code,
				id,
				env: this.options.env,
				envName: this.options.envName,
				mode: this.mode,
				root: this.options.root,
				framework: this.options.framework,
				providerEnvName: this.options.providerEnvName,
				types: import_lib,
				parseExpression: (expressionCode) => import_lib$2.default.template.expression(expressionCode, { placeholderPattern: false })(),
				warn
			};
			modified = plugin.transformAst(context) || modified;
		}
		return modified;
	}
	runExternalTransforms(order, candidatesByKind, context) {
		for (const [kind, transform] of this.externalTransformsByKind) {
			if ((transform.order ?? "pre") !== order) continue;
			const candidates = candidatesByKind.get(kind);
			if (!candidates) continue;
			transform.transform(candidates, context);
		}
	}
	async resolveIdentifierKind(ident, id, visited = /* @__PURE__ */ new Set()) {
		const binding = (await this.getModuleInfo(id)).bindings.get(ident);
		if (!binding) return "None";
		if (binding.resolvedKind) return binding.resolvedKind;
		const vKey = `${id}:${ident}`;
		if (visited.has(vKey)) return "None";
		visited.add(vKey);
		const resolvedKind = await this.resolveBindingKind(binding, id, visited);
		binding.resolvedKind = resolvedKind;
		return resolvedKind;
	}
	/**
	* Recursively find an export in a module, following `export * from` chains.
	* Returns the module info and binding if found, or undefined if not found.
	*/
	async findExportInModule(moduleInfo, exportName, visitedModules = /* @__PURE__ */ new Set()) {
		const isBuildMode = this.mode === "build";
		if (isBuildMode && visitedModules.size === 0) {
			const moduleCache = this.exportResolutionCache.get(moduleInfo.id);
			if (moduleCache) {
				const cached = moduleCache.get(exportName);
				if (cached !== void 0) return cached ?? void 0;
			}
		}
		if (visitedModules.has(moduleInfo.id)) return;
		visitedModules.add(moduleInfo.id);
		const localBindingName = moduleInfo.exports.get(exportName);
		if (localBindingName) {
			const binding = moduleInfo.bindings.get(localBindingName);
			if (binding) {
				const result = {
					moduleInfo,
					localName: localBindingName,
					binding
				};
				if (isBuildMode) this.getExportResolutionCache(moduleInfo.id).set(exportName, result);
				return result;
			}
		}
		if (moduleInfo.reExportAllSources.length > 0) {
			const results = await Promise.all(moduleInfo.reExportAllSources.map(async (reExportSource) => {
				const reExportTarget = await this.resolveIdCached(reExportSource, moduleInfo.id);
				if (reExportTarget) {
					const reExportModule = await this.getModuleInfo(reExportTarget);
					return this.findExportInModule(reExportModule, exportName, visitedModules);
				}
			}));
			for (const result of results) if (result) {
				if (isBuildMode) this.getExportResolutionCache(moduleInfo.id).set(exportName, result);
				return result;
			}
		}
		if (isBuildMode) this.getExportResolutionCache(moduleInfo.id).set(exportName, null);
	}
	async resolveBindingTarget(resolution, visited = /* @__PURE__ */ new Set()) {
		const key = `${resolution.moduleInfo.id}:${resolution.localName}`;
		if (visited.has(key)) return;
		visited.add(key);
		if (resolution.binding.type !== "import") return resolution;
		const target = await this.resolveIdCached(resolution.binding.source, resolution.moduleInfo.id);
		if (!target) return;
		const importedModule = await this.getModuleInfo(target);
		const found = await this.findExportInModule(importedModule, resolution.binding.importedName);
		if (!found) return;
		return this.resolveBindingTarget(found, visited);
	}
	async resolveKnownImportKind(binding, resolved) {
		const directKind = this.knownRootImports.get(binding.source)?.get(binding.importedName) ?? "None";
		if (directKind !== "None") return directKind;
		if (!resolved) return "None";
		for (const [source, rootExports] of this.knownRootImports) {
			const kind = rootExports.get(binding.importedName);
			if (!kind) continue;
			let targetId;
			try {
				targetId = await this.resolveIdCached(source, resolved.moduleInfo.id);
			} catch {
				continue;
			}
			if (!targetId) continue;
			try {
				const rootModule = await this.getModuleInfo(targetId);
				const found = await this.findExportInModule(rootModule, binding.importedName);
				const target = found ? await this.resolveBindingTarget(found) ?? found : void 0;
				if (target && resolved.moduleInfo.id === target.moduleInfo.id && resolved.localName === target.localName) return kind;
			} catch {
				continue;
			}
		}
		return "None";
	}
	async resolveImportKind(binding, fileId, visited) {
		const directKnownKind = await this.resolveKnownImportKind(binding);
		if (directKnownKind !== "None") {
			binding.resolvedKind = directKnownKind;
			return directKnownKind;
		}
		if (binding.importedName === "*") return "None";
		const target = await this.resolveIdCached(binding.source, fileId);
		if (!target) return "None";
		const importedModule = await this.getModuleInfo(target);
		const found = await this.findExportInModule(importedModule, binding.importedName);
		if (!found) return "None";
		const knownKind = await this.resolveKnownImportKind(binding, found);
		if (knownKind !== "None") {
			found.binding.resolvedKind = knownKind;
			binding.resolvedKind = knownKind;
			return knownKind;
		}
		if (found.binding.resolvedKind) return found.binding.resolvedKind;
		const vKey = `${found.moduleInfo.id}:${found.localName}`;
		if (visited.has(vKey)) return "None";
		visited.add(vKey);
		const resolvedKind = await this.resolveBindingKind(found.binding, found.moduleInfo.id, visited);
		found.binding.resolvedKind = resolvedKind;
		return resolvedKind;
	}
	async resolveBindingKind(binding, fileId, visited = /* @__PURE__ */ new Set()) {
		if (binding.resolvedKind) return binding.resolvedKind;
		if (binding.type === "import") return this.resolveImportKind(binding, fileId, visited);
		const resolvedKind = await this.resolveExprKind(binding.init, fileId, visited);
		if (isLookupKind(resolvedKind) && getLookupSetup(resolvedKind, this.externalLookupSetup)?.type === "directCall" && binding.init && import_lib.isCallExpression(unwrapExpression(binding.init))) {
			binding.resolvedKind = "None";
			return "None";
		}
		binding.resolvedKind = resolvedKind;
		return resolvedKind;
	}
	async resolveExprKind(expr, fileId, visited = /* @__PURE__ */ new Set()) {
		if (!expr) return "None";
		expr = unwrapExpression(expr);
		let result = "None";
		if (import_lib.isCallExpression(expr)) {
			if (!import_lib.isExpression(expr.callee)) return "None";
			const calleeKind = await this.resolveCalleeKind(expr.callee, fileId, visited);
			if (calleeKind === "Root" || calleeKind === "Builder") return "Builder";
			if (import_lib.isMemberExpression(expr.callee)) {
				if (this.validLookupKinds.has(calleeKind)) return calleeKind;
			}
			if (import_lib.isIdentifier(expr.callee)) {
				if (this.validLookupKinds.has(calleeKind)) return calleeKind;
			}
		} else if (import_lib.isMemberExpression(expr) && import_lib.isIdentifier(expr.property)) result = await this.resolveCalleeKind(expr.object, fileId, visited);
		if (result === "None" && import_lib.isIdentifier(expr)) result = await this.resolveIdentifierKind(expr.name, fileId, visited);
		return result;
	}
	async resolveCalleeKind(callee, fileId, visited = /* @__PURE__ */ new Set()) {
		if (import_lib.isIdentifier(callee)) return this.resolveIdentifierKind(callee.name, fileId, visited);
		if (import_lib.isMemberExpression(callee) && import_lib.isIdentifier(callee.property)) {
			const prop = callee.property.name;
			const possibleKinds = IdentifierToKinds.get(prop);
			if (possibleKinds) {
				const base = await this.resolveExprKind(callee.object, fileId, visited);
				for (const kind of possibleKinds) {
					if (!this.validLookupKinds.has(kind)) continue;
					if (kind === "ServerFn") {
						if (base === "Root" || base === "Builder") return "ServerFn";
					} else if (kind === "Middleware") {
						if (base === "Root" || base === "Builder" || base === "Middleware") return "Middleware";
					} else if (kind === "IsomorphicFn") {
						if (base === "Root" || base === "Builder" || base === "IsomorphicFn") return "IsomorphicFn";
					}
				}
			}
			if (import_lib.isIdentifier(callee.object)) {
				const binding = (await this.getModuleInfo(fileId)).bindings.get(callee.object.name);
				if (binding && binding.type === "import" && binding.importedName === "*") return this.resolveImportKind({
					type: "import",
					source: binding.source,
					importedName: callee.property.name
				}, fileId, visited);
			}
			return this.resolveExprKind(callee.object, fileId, visited);
		}
		return this.resolveExprKind(callee, fileId, visited);
	}
	async getModuleInfo(id) {
		let cached = this.moduleCache.get(id);
		if (cached) return cached;
		await this.options.loadModule(id);
		cached = this.moduleCache.get(id);
		if (!cached) throw new Error(`could not load module info for ${id}`);
		return cached;
	}
};
/**
* Checks if a CallExpression has a method chain pattern that matches any of the lookup kinds.
* E.g., `.handler()`, `.server()`, `.client()`, `.createMiddlewares()`
*/
function isMethodChainCandidate(node, lookupKinds) {
	const callee = node.callee;
	if (!import_lib.isMemberExpression(callee) || !import_lib.isIdentifier(callee.property)) return false;
	const possibleKinds = IdentifierToKinds.get(callee.property.name);
	if (possibleKinds) {
		for (const kind of possibleKinds) if (lookupKinds.has(kind)) return true;
	}
	return false;
}
function getTransformCodeFilterForEnv(env, opts) {
	const validKinds = getLookupKindsForEnv(env, opts);
	const patterns = [];
	for (const [kind, pattern] of Object.entries(KindDetectionPatterns)) if (validKinds.has(kind)) patterns.push(pattern);
	for (const transform of opts?.compilerTransforms ?? []) if (isCompilerTransformEnabledForEnv(transform, env)) patterns.push(transform.detect);
	for (const plugin of opts?.compilerPlugins ?? []) if (plugin.detect && isStartCompilerPluginEnabledForEnv(plugin, env)) patterns.push(plugin.detect);
	return patterns;
}
function getLookupConfigurationsForEnv(env, framework, opts) {
	const commonConfigs = [
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createServerFn",
			kind: "Root"
		},
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createIsomorphicFn",
			kind: "IsomorphicFn"
		},
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createServerOnlyFn",
			kind: "ServerOnlyFn"
		},
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createClientOnlyFn",
			kind: "ClientOnlyFn"
		}
	];
	const externalConfigs = [];
	for (const transform of opts?.compilerTransforms ?? []) {
		if (!isCompilerTransformEnabledForEnv(transform, env)) continue;
		const kind = getExternalLookupKind(transform);
		for (const imported of transform.imports) externalConfigs.push({
			libName: imported.libName,
			rootExport: imported.rootExport,
			kind
		});
	}
	if (env === "client") return [
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createMiddleware",
			kind: "Root"
		},
		{
			libName: `@tanstack/${framework}-start`,
			rootExport: "createStart",
			kind: "Root"
		},
		...commonConfigs,
		...externalConfigs
	];
	return [...[...commonConfigs, {
		libName: `@tanstack/${framework}-router`,
		rootExport: "ClientOnly",
		kind: "ClientOnlyJSX"
	}], ...externalConfigs];
}
function createStartCompiler(options) {
	return new StartCompiler({
		env: options.env,
		envName: options.envName,
		root: options.root,
		lookupKinds: getLookupKindsForEnv(options.env, { compilerTransforms: options.compilerTransforms }),
		lookupConfigurations: getLookupConfigurationsForEnv(options.env, options.framework, { compilerTransforms: options.compilerTransforms }),
		mode: options.mode,
		framework: options.framework,
		providerEnvName: options.providerEnvName,
		generateFunctionId: options.generateFunctionId,
		onServerFnsById: options.onServerFnsById,
		compilerTransforms: options.compilerTransforms,
		compilerPlugins: options.compilerPlugins,
		serverFnProviderModuleDirectives: options.serverFnProviderModuleDirectives,
		warn: options.warn,
		getKnownServerFns: options.getKnownServerFns,
		devServerFnModuleSpecifierEncoder: options.encodeModuleSpecifierInDev,
		loadModule: options.loadModule,
		resolveId: options.resolveId
	});
}
function mergeServerFnsById(current, next) {
	for (const [id, fn] of Object.entries(next)) {
		const existing = current[id];
		if (existing) {
			current[id] = {
				...fn,
				isClientReferenced: existing.isClientReferenced || fn.isClientReferenced
			};
			continue;
		}
		current[id] = fn;
	}
}
function createCompilerVirtualModuleIdPattern(compilerPlugins) {
	const patterns = compilerPlugins.map((plugin) => plugin.virtualModuleIdPattern).filter((pattern) => !!pattern);
	if (patterns.length === 0) return;
	return new RegExp(patterns.map((pattern) => `(?:${pattern.source})`).join("|"));
}
function loadCompilerVirtualModule(compilerPlugins, context) {
	for (const compilerPlugin of compilerPlugins) {
		const pattern = compilerPlugin.virtualModuleIdPattern;
		if (!pattern) continue;
		pattern.lastIndex = 0;
		if (!pattern.test(context.id)) continue;
		const result = compilerPlugin.loadVirtualModule?.(context);
		if (result) return result;
	}
	return null;
}
function generateServerFnResolverModule(opts) {
	const staticImports = [];
	const manifest = Object.entries(opts.serverFnsById).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([id, fn], index) => {
		const moduleRef = `serverFnModule${index}`;
		const filename = JSON.stringify(fn.extractedFilename);
		if (opts.useStaticImports) staticImports.push(`import * as ${moduleRef} from ${filename}`);
		const moduleAccess = opts.useStaticImports ? `module: ${moduleRef}` : `importer: () => import(${filename})`;
		const clientReferenced = opts.includeClientReferencedCheck ? `,\n    isClientReferenced: ${fn.isClientReferenced ?? true}` : "";
		return `'${id}': {
    functionName: '${fn.functionName}',
    ${moduleAccess}${clientReferenced}
  }`;
	}).join(",\n  ");
	const clientReferencedCheck = opts.includeClientReferencedCheck ? `
  if (access.origin === 'client' && !serverFnInfo.isClientReferenced) {
    throw new Error('Server function not accessible from client: ' + id)
  }
` : "";
	const resolveModule = opts.memoizeModules ? "serverFnInfo.module ??= await serverFnInfo.importer()" : "serverFnInfo.module ?? (await serverFnInfo.importer())";
	return `
${staticImports.join("\n")}
const manifest = {
  ${manifest}
}

export async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id]
  if (!serverFnInfo) {
    throw new Error('Server function info not found for ' + id)
  }
${clientReferencedCheck}
  const fnModule = ${resolveModule}
  if (!fnModule) {
    throw new Error('Server function module not resolved for ' + id)
  }
  const action = fnModule[serverFnInfo.functionName]
  if (!action) {
    throw new Error('Server function module export not resolved for serverFn ID: ' + id)
  }
  return action
}

`;
}
var tssHydrate = "tss-hydrate";
var MissingHydrateSourceError = class extends Error {
	constructor(id) {
		super(`Missing Hydrate source for virtual module ${id}. The parent module must be transformed before its Hydrate child chunk is loaded.`);
	}
};
/**
* Detection pattern used by the transform code filter to pre-scan files for
* `<Hydrate>` JSX before any AST parsing happens.
*/
var HYDRATE_DETECTION_PATTERN = /\bHydrate\b/;
function createBoundaryId(root, sourceId) {
	const normalized = relative(root, sourceId).replaceAll("\\", "/");
	const sourceHash = crypto.createHash("sha1").update(normalized).digest("hex").slice(0, 10);
	return (index) => {
		return `${index.toString(36)}_${sourceHash}`;
	};
}
function getJSXElementName(node) {
	const name = node.openingElement.name;
	return import_lib.isJSXIdentifier(name) ? name.name : void 0;
}
function getJSXAttribute(node, name) {
	for (const item of node.attributes) if (import_lib.isJSXAttribute(item) && import_lib.isJSXIdentifier(item.name, { name })) return item;
}
function getBooleanProp(node, name) {
	const attr = getJSXAttribute(node, name);
	if (!attr) return void 0;
	if (!attr.value) return true;
	if (import_lib.isStringLiteral(attr.value)) return attr.value.value !== "false";
	if (import_lib.isJSXExpressionContainer(attr.value)) {
		if (import_lib.isBooleanLiteral(attr.value.expression)) return attr.value.expression.value;
	}
}
function parseHydrateVirtualId(id) {
	const queryIndex = id.indexOf("?");
	const sourceId = cleanId(queryIndex === -1 ? id : id.slice(0, queryIndex));
	if (queryIndex === -1) return {
		sourceId,
		splitId: null,
		boundaryIndex: -1
	};
	const rawQuery = id.slice(queryIndex + 1);
	const splitId = new URLSearchParams(rawQuery).get(tssHydrate);
	let boundaryIndex = -1;
	if (splitId) {
		const separatorIndex = splitId.indexOf("_");
		if (separatorIndex > 0) {
			const parsedIndex = Number.parseInt(splitId.slice(0, separatorIndex), 36);
			if (Number.isInteger(parsedIndex)) boundaryIndex = parsedIndex;
		}
	}
	return {
		sourceId,
		splitId,
		boundaryIndex
	};
}
function isObjectPropertyName(property, name) {
	if (import_lib.isIdentifier(property.key) && !property.computed) return property.key.name === name;
	return import_lib.isStringLiteral(property.key) && property.key.value === name;
}
function isReferenceInsideAnyNode(referencePath, nodes) {
	if (nodes.has(referencePath.node)) return true;
	return Boolean(referencePath.findParent((parent) => nodes.has(parent.node)));
}
function stripBindingsOnlyReferencedBy(path, node, seen = /* @__PURE__ */ new Set(), preserve = /* @__PURE__ */ new Set()) {
	stripBindingsOnlyReferencedByNodes(path.scope, [node], seen, preserve);
}
function stripBindingsOnlyReferencedByNodes(scope, nodes, seen = /* @__PURE__ */ new Set(), preserve = /* @__PURE__ */ new Set()) {
	const nodeSet = new Set(nodes);
	const names = /* @__PURE__ */ new Set();
	nodes.forEach((node) => {
		collectIdentifiersFromNode(node).forEach((name) => names.add(name));
	});
	for (const name of names) {
		if (seen.has(name)) continue;
		if (preserve.has(name)) continue;
		const binding = scope.getBinding(name);
		if (!binding?.constant) continue;
		if (binding.path.findParent((parentPath) => parentPath.isExportNamedDeclaration() || parentPath.isExportDefaultDeclaration())) continue;
		if (binding.referencePaths.length === 0) continue;
		if (!binding.referencePaths.every((referencePath) => isReferenceInsideAnyNode(referencePath, nodeSet))) continue;
		seen.add(name);
		const declarationPath = binding.path.isVariableDeclarator() ? binding.path : binding.path.findParent((parentPath) => parentPath.isVariableDeclarator());
		if (declarationPath?.isVariableDeclarator() && !import_lib.isIdentifier(declarationPath.node.id) && collectIdentifiersFromPattern(declarationPath.node.id).some((bindingName) => {
			if (bindingName === binding.identifier.name) return false;
			return binding.scope.getBinding(bindingName)?.referencePaths.some((referencePath) => !isReferenceInsideAnyNode(referencePath, nodeSet));
		})) continue;
		const bindingNode = binding.path.node;
		if (import_lib.isVariableDeclarator(bindingNode) && bindingNode.init) stripBindingsOnlyReferencedByNodes(binding.scope, [bindingNode.init], seen, preserve);
		else if (import_lib.isFunctionDeclaration(bindingNode) || import_lib.isClassDeclaration(bindingNode)) stripBindingsOnlyReferencedByNodes(binding.scope, [bindingNode], seen, preserve);
		if (binding.path.isVariableDeclarator()) {
			const declarationPath = binding.path.parentPath;
			if (declarationPath.isVariableDeclaration() && declarationPath.node.declarations.length === 1) {
				declarationPath.remove();
				continue;
			}
			binding.path.remove();
			continue;
		}
		if (binding.path.isImportSpecifier() || binding.path.isImportDefaultSpecifier() || binding.path.isImportNamespaceSpecifier()) {
			const importPath = binding.path.parentPath;
			if (importPath.isImportDeclaration() && importPath.node.specifiers.length === 1) {
				importPath.remove();
				continue;
			}
			binding.path.remove();
			continue;
		}
		binding.path.remove();
	}
}
function getSingleUseObjectExpressionBinding(path, identifier) {
	const binding = path.scope.getBinding(identifier.name);
	if (!binding?.constant) return void 0;
	if (binding.referencePaths.length !== 1) return void 0;
	if (binding.referencePaths[0]?.node !== identifier) return void 0;
	if (!binding.path.isVariableDeclarator()) return void 0;
	const init = binding.path.node.init;
	return import_lib.isObjectExpression(init) ? init : void 0;
}
function objectExpressionMayHaveProperty(node, name) {
	return node.properties.some((property) => {
		if (import_lib.isSpreadElement(property)) return true;
		if (!import_lib.isObjectMethod(property) && !import_lib.isObjectProperty(property)) return true;
		if (property.computed) return true;
		return isObjectPropertyName(property, name);
	});
}
function stripObjectExpressionProperty(path, node, name) {
	let modified = false;
	node.properties = node.properties.filter((property) => {
		if ((import_lib.isObjectMethod(property) || import_lib.isObjectProperty(property)) && isObjectPropertyName(property, name)) {
			stripBindingsOnlyReferencedBy(path, import_lib.isObjectProperty(property) ? property.value : property.body);
			modified = true;
			return false;
		}
		return true;
	});
	return modified;
}
function throwBoundaryError(code, path, message) {
	if (path.node.loc) throw codeFrameError(code, path.node.loc, message);
	throw new Error(message);
}
function inspectSplitBoundary(options) {
	const { path } = options;
	const capturedNames = options.collectCaptured ? /* @__PURE__ */ new Set() : void 0;
	const nestedHydrate = options.nestedHydrate;
	let nestedBoundaryCount = 0;
	if (options.validate) {
		for (const child of path.node.children) if (import_lib.isJSXExpressionContainer(child) && (import_lib.isFunctionExpression(child.expression) || import_lib.isArrowFunctionExpression(child.expression))) throwBoundaryError(options.code, path, "Hydrate cannot code-split function-as-children. Use split={false} for this boundary.");
	}
	const rootVisitors = {
		JSXOpeningElement(openingPath) {
			if (openingPath.node === path.node.openingElement) openingPath.skip();
		},
		JSXClosingElement(closingPath) {
			closingPath.skip();
		}
	};
	const validateVisitors = options.validate ? {
		CallExpression(callPath) {
			if (!import_lib.isIdentifier(callPath.node.callee)) return;
			if (!/^use[A-Z0-9]/.test(callPath.node.callee.name)) return;
			throwBoundaryError(options.code, path, "Hydrate cannot code-split JSX that calls hooks during render. Move the hook call into a child component or use split={false}.");
		},
		ThisExpression(thisPath) {
			throwBoundaryError(options.code, path, "Hydrate cannot code-split JSX that captures this.");
		},
		Super(superPath) {
			throwBoundaryError(options.code, path, "Hydrate cannot code-split JSX that captures super.");
		}
	} : {};
	const nestedHydrateVisitors = nestedHydrate ? { JSXElement(nestedPath) {
		if (getJSXElementName(nestedPath.node) !== nestedHydrate.localName) return;
		if (getBooleanProp(nestedPath.node.openingElement, "split") === false) return;
		nestedBoundaryCount++;
	} } : {};
	const captureVisitors = capturedNames ? {
		Identifier(identifierPath) {
			const parent = identifierPath.parent;
			if (import_lib.isJSXOpeningElement(parent) || import_lib.isJSXClosingElement(parent) || import_lib.isObjectProperty(parent, { key: identifierPath.node }) && !parent.computed && !parent.shorthand || import_lib.isMemberExpression(parent, { property: identifierPath.node }) && !parent.computed) return;
			const binding = identifierPath.scope.getBinding(identifierPath.node.name);
			if (!binding) return;
			if (import_lib.isProgram(binding.scope.block)) return;
			if (path.node === binding.scope.block || path.isAncestor(binding.path)) return;
			capturedNames.add(identifierPath.node.name);
		},
		JSXIdentifier(identifierPath) {
			if (identifierPath.parentKey !== "name") return;
			const name = identifierPath.node.name;
			if (!/^[A-Z]/.test(name)) return;
			const binding = identifierPath.scope.getBinding(name);
			if (!binding) return;
			if (import_lib.isProgram(binding.scope.block)) return;
			capturedNames.add(name);
		}
	} : {};
	path.traverse({
		...rootVisitors,
		...validateVisitors,
		...nestedHydrateVisitors,
		...captureVisitors
	});
	return {
		captured: capturedNames ? [...capturedNames].sort() : [],
		nestedBoundaryCount
	};
}
function getHydrateImport(ast, framework) {
	const hydrateImportSource = `@tanstack/${framework}-start`;
	for (const node of ast.program.body) {
		if (!import_lib.isImportDeclaration(node)) continue;
		if (node.source.value !== hydrateImportSource) continue;
		for (const specifier of node.specifiers) if (import_lib.isImportSpecifier(specifier) && import_lib.isIdentifier(specifier.imported, { name: "Hydrate" })) return { hydrateLocalName: specifier.local.name };
	}
}
function getMeaningfulChildren(children) {
	return children.filter((child) => !(import_lib.isJSXText(child) && child.value.trim() === ""));
}
function transformHydrateAst(options) {
	if (!options.code.includes("Hydrate")) return null;
	const hydrateImport = getHydrateImport(options.ast, options.framework);
	if (!hydrateImport) return null;
	const { hydrateLocalName: localName } = hydrateImport;
	const sourceId = cleanId(options.id);
	const getBoundaryId = createBoundaryId(options.root, sourceId);
	let nextBoundaryIndex = options.indexOffset ?? 0;
	const state = {
		modified: false,
		extractedChildNodes: [],
		capturedNames: /* @__PURE__ */ new Set()
	};
	let lazyIdent;
	import_lib$2.default.traverse(options.ast, { Program(programPath) {
		programPath.traverse({ JSXElement(path) {
			if (getJSXElementName(path.node) !== localName) return;
			if (options.env === "server") path.node.openingElement.attributes = path.node.openingElement.attributes.filter((item) => {
				if (import_lib.isJSXAttribute(item) && import_lib.isJSXIdentifier(item.name, { name: "fallback" })) {
					if (item.value) stripBindingsOnlyReferencedBy(path, item.value);
					state.modified = true;
					return false;
				}
				if (import_lib.isJSXSpreadAttribute(item) && import_lib.isObjectExpression(item.argument)) {
					if (stripObjectExpressionProperty(path, item.argument, "fallback")) state.modified = true;
					return item.argument.properties.length > 0;
				}
				if (import_lib.isJSXSpreadAttribute(item) && import_lib.isIdentifier(item.argument)) {
					const init = getSingleUseObjectExpressionBinding(path, item.argument);
					if (init && stripObjectExpressionProperty(path, init, "fallback")) state.modified = true;
				}
				return true;
			});
			if (getBooleanProp(path.node.openingElement, "split") === false) return;
			const boundaryInspection = inspectSplitBoundary({
				code: options.code,
				path,
				validate: true,
				collectCaptured: options.env === "client",
				...options.env === "client" ? { nestedHydrate: { localName } } : {}
			});
			const index = nextBoundaryIndex;
			nextBoundaryIndex += 1 + boundaryInspection.nestedBoundaryCount;
			const id = getBoundaryId(index);
			const exportName = `H${index}`;
			const existingHydrateId = getJSXAttribute(path.node.openingElement, "h");
			if (existingHydrateId) existingHydrateId.value = import_lib.stringLiteral(id);
			else path.node.openingElement.attributes.push(import_lib.jsxAttribute(import_lib.jsxIdentifier("h"), import_lib.stringLiteral(id)));
			state.modified = true;
			if (options.env === "server") return;
			const needsPreloadProp = path.node.openingElement.attributes.some((attribute) => {
				if (import_lib.isJSXAttribute(attribute)) return import_lib.isJSXIdentifier(attribute.name, { name: "prefetch" });
				if (import_lib.isJSXSpreadAttribute(attribute)) {
					if (import_lib.isObjectExpression(attribute.argument)) return objectExpressionMayHaveProperty(attribute.argument, "prefetch");
					if (import_lib.isIdentifier(attribute.argument)) {
						const init = getSingleUseObjectExpressionBinding(path, attribute.argument);
						return init ? objectExpressionMayHaveProperty(init, "prefetch") : true;
					}
					return true;
				}
				return false;
			});
			const childReferenceNodes = getMeaningfulChildren(path.node.children);
			state.extractedChildNodes.push(...childReferenceNodes);
			boundaryInspection.captured.forEach((name) => {
				state.capturedNames.add(name);
			});
			if (!lazyIdent) {
				lazyIdent = programPath.scope.generateUidIdentifier("lazyRouteComponent");
				programPath.unshiftContainer("body", [import_lib.importDeclaration([import_lib.importSpecifier(lazyIdent, import_lib.identifier("lazyRouteComponent"))], import_lib.stringLiteral(`@tanstack/${options.framework}-router`))]);
			}
			const importIdParams = new URLSearchParams();
			importIdParams.set(tssHydrate, id);
			const componentIdent = programPath.scope.generateUidIdentifier(exportName);
			const declarations = [import_lib.variableDeclarator(componentIdent, import_lib.callExpression(lazyIdent, [import_lib.arrowFunctionExpression([], import_lib.callExpression(import_lib.import(), [import_lib.stringLiteral(`${sourceId}?${importIdParams.toString()}`)])), import_lib.stringLiteral(exportName)]))];
			let preloadIdent;
			if (needsPreloadProp) {
				preloadIdent = programPath.scope.generateUidIdentifier(`${exportName}_preload`);
				declarations.push(import_lib.variableDeclarator(preloadIdent, import_lib.memberExpression(componentIdent, import_lib.identifier("preload"))));
			}
			programPath.unshiftContainer("body", [import_lib.variableDeclaration("const", declarations)]);
			if (preloadIdent) path.node.openingElement.attributes.push(import_lib.jsxAttribute(import_lib.jsxIdentifier("p"), import_lib.jsxExpressionContainer(preloadIdent)));
			path.node.children = [
				import_lib.jsxText("\n"),
				import_lib.jsxExpressionContainer(import_lib.jsxElement(import_lib.jsxOpeningElement(import_lib.jsxIdentifier(componentIdent.name), boundaryInspection.captured.map((name) => import_lib.jsxAttribute(import_lib.jsxIdentifier(name), import_lib.jsxExpressionContainer(import_lib.identifier(name)))), true), null, [], true)),
				import_lib.jsxText("\n")
			];
			path.skip();
		} });
		if (state.extractedChildNodes.length > 0) stripBindingsOnlyReferencedByNodes(programPath.scope, state.extractedChildNodes, /* @__PURE__ */ new Set(), state.capturedNames);
		programPath.skip();
	} });
	if (!state.modified) return null;
	return true;
}
function loadHydrateVirtualModule(options) {
	const { sourceId, splitId, boundaryIndex } = parseHydrateVirtualId(options.id);
	if (!splitId || boundaryIndex < 0) return null;
	const getBoundaryId = createBoundaryId(options.root, sourceId);
	const ast = parseAst({
		code: options.code,
		sourceFilename: sourceId
	});
	const hydrateImport = getHydrateImport(ast, options.framework);
	if (!hydrateImport) return null;
	const { hydrateLocalName: localName } = hydrateImport;
	let target;
	let targetIndex = -1;
	let targetCaptured = [];
	let index = 0;
	import_lib$2.default.traverse(ast, { JSXElement(path) {
		if (getJSXElementName(path.node) !== localName) return;
		if (getBooleanProp(path.node.openingElement, "split") === false) return;
		if (index === boundaryIndex) {
			if (getBoundaryId(index) !== splitId) {
				path.stop();
				return;
			}
			targetCaptured = inspectSplitBoundary({
				code: options.code,
				path,
				collectCaptured: true
			}).captured;
			target = import_lib.cloneNode(path.node, true);
			targetIndex = index;
			path.stop();
			return;
		}
		index++;
	} });
	if (!target || targetIndex < 0) return null;
	const children = target.children;
	const exportName = `H${targetIndex}`;
	const refIdents = find_referenced_identifiers_default(ast);
	removeModuleLevelBindings(ast, /* @__PURE__ */ new Set(["Route"]));
	const localBindings = /* @__PURE__ */ new Set();
	for (const node of ast.program.body) collectLocalBindingsFromStatement(node, localBindings);
	const keepBindings = /* @__PURE__ */ new Set();
	const meaningfulChildren = getMeaningfulChildren(children);
	let returnExpression = import_lib.nullLiteral();
	if (meaningfulChildren.length === 1) {
		const child = meaningfulChildren[0];
		if (import_lib.isJSXExpressionContainer(child)) returnExpression = import_lib.isJSXEmptyExpression(child.expression) ? import_lib.nullLiteral() : child.expression;
		else if (import_lib.isJSXElement(child) || import_lib.isJSXFragment(child)) returnExpression = child;
		else if (import_lib.isJSXText(child)) returnExpression = import_lib.stringLiteral(child.value);
	} else if (meaningfulChildren.length > 1) returnExpression = import_lib.jsxFragment(import_lib.jsxOpeningFragment(), import_lib.jsxClosingFragment(), children);
	for (const name of collectIdentifiersFromNode(returnExpression)) if (localBindings.has(name)) keepBindings.add(name);
	if (keepBindings.size > 0) expandTransitively(keepBindings, buildDependencyGraph(buildDeclarationMap(ast), localBindings));
	retainModuleLevelDeclarations(ast, keepBindings);
	unwrapExportedDeclarations(ast);
	ast.program.body.push(import_lib.exportNamedDeclaration(import_lib.functionDeclaration(import_lib.identifier(exportName), targetCaptured.length > 0 ? [import_lib.objectPattern(targetCaptured.map((name) => import_lib.objectProperty(import_lib.identifier(name), import_lib.identifier(name), false, true)))] : [], import_lib.blockStatement([import_lib.returnStatement(returnExpression)]))));
	deadCodeElimination$1(ast, refIdents);
	stripUnreferencedTopLevelExpressionStatements(ast);
	return generateFromAst(ast, {
		sourceMaps: true,
		sourceFileName: options.id,
		filename: options.id
	});
}
function createHydrateCompilerPlugin() {
	const sourcesByEnvironment = /* @__PURE__ */ new Map();
	const getEnvironmentSources = (envName) => {
		let sources = sourcesByEnvironment.get(envName);
		if (!sources) {
			sources = /* @__PURE__ */ new Map();
			sourcesByEnvironment.set(envName, sources);
		}
		return sources;
	};
	const setSource = (envName, id, code, framework) => {
		const sourceId = cleanId(id);
		const sources = getEnvironmentSources(envName);
		const existing = sources.get(sourceId);
		if (existing?.code === code && existing.framework === framework) return existing;
		const entry = {
			code,
			framework,
			virtualModules: /* @__PURE__ */ new Map()
		};
		sources.set(sourceId, entry);
		return entry;
	};
	const getSourceEntry = (envName, id) => sourcesByEnvironment.get(envName)?.get(cleanId(id));
	const deleteSource = (envName, id) => {
		sourcesByEnvironment.get(envName)?.delete(cleanId(id));
	};
	return {
		name: "tanstack-start-core:hydrate",
		detect: HYDRATE_DETECTION_PATTERN,
		virtualModuleIdPattern: new RegExp(`[?&]${tssHydrate}=`),
		transformAst(context) {
			const virtualModule = parseHydrateVirtualId(context.id);
			const indexOffset = virtualModule.boundaryIndex < 0 ? void 0 : virtualModule.boundaryIndex + 1;
			const result = transformHydrateAst({
				ast: context.ast,
				code: context.code,
				id: context.id,
				root: context.root,
				env: context.env,
				framework: context.framework,
				indexOffset
			});
			if (result && virtualModule.boundaryIndex < 0) setSource(context.envName, context.id, context.code, context.framework);
			return !!result;
		},
		loadVirtualModule(context) {
			const virtualModule = parseHydrateVirtualId(context.id);
			if (!virtualModule.splitId || virtualModule.boundaryIndex < 0) return null;
			const existingSourceEntry = getSourceEntry(context.envName, virtualModule.sourceId);
			const sourceEntry = context.code === void 0 ? existingSourceEntry : setSource(context.envName, virtualModule.sourceId, context.code, existingSourceEntry?.framework ?? (context.code.includes("@tanstack/solid-start") ? "solid" : "react"));
			if (!sourceEntry) throw new MissingHydrateSourceError(context.id);
			if (sourceEntry.virtualModules.has(context.id)) return sourceEntry.virtualModules.get(context.id);
			const result = loadHydrateVirtualModule({
				code: sourceEntry.code,
				id: context.id,
				root: context.root,
				framework: sourceEntry.framework
			});
			sourceEntry.virtualModules.set(context.id, result);
			return result;
		},
		invalidateModule(context) {
			deleteSource(context.envName, context.id);
		}
	};
}
function createViteDevServerFnModuleSpecifierEncoder(root) {
	const normalizedRoot = root.replace(/\\/g, "/");
	const rootWithTrailingSlash = normalizedRoot.endsWith("/") ? normalizedRoot : `${normalizedRoot}/`;
	return ({ extractedFilename }) => {
		const normalizedFile = extractedFilename.replace(/\\/g, "/");
		if (normalizedFile.startsWith(rootWithTrailingSlash)) return `/${normalizedFile.slice(rootWithTrailingSlash.length)}`;
		return normalizedFile.startsWith("/") ? `/@fs${normalizedFile}` : `/@fs/${normalizedFile}`;
	};
}
function decodeViteDevServerModuleSpecifier(moduleSpecifier) {
	let sourceFile = moduleSpecifier;
	if (sourceFile.startsWith("/@id/")) sourceFile = sourceFile.slice(5);
	else if (sourceFile.startsWith("/@fs/")) {
		sourceFile = sourceFile.slice(4);
		sourceFile = sourceFile.replace(/^\/([A-Za-z]:\/)/, "$1");
	} else if (sourceFile.startsWith("/")) sourceFile = sourceFile.slice(1);
	const queryIndex = sourceFile.indexOf("?");
	return queryIndex === -1 ? sourceFile : sourceFile.slice(0, queryIndex);
}
function mergeHotUpdateModules(currentModules, additionalModules) {
	if (additionalModules.length === 0) return;
	const mergedModules = currentModules.slice();
	const seenModules = new Set(currentModules);
	for (const mod of additionalModules) {
		if (seenModules.has(mod)) continue;
		seenModules.add(mod);
		mergedModules.push(mod);
	}
	return mergedModules;
}
var validateServerFnIdVirtualModule = `virtual:tanstack-start-validate-server-fn-id`;
var TSS_SERVERFN_SPLIT_PARAM$1 = "tss-serverfn-split";
async function loadViteModuleFromEnvironment(environment, id, opts) {
	if (environment.mode === "build" || environment.mode === "dev" && environment.config.experimental.bundledDev && environment.name === VITE_ENVIRONMENT_NAMES.client) return (await opts.load({ id: environment.mode === "dev" ? opts.devId ?? id : id }))?.code ?? "";
	if (environment.mode === "dev") {
		await environment.transformRequest(opts.devId ?? id);
		return;
	}
	opts.error(`could not load module ${id}: unknown environment mode ${environment.mode}`);
}
function invalidateMatchingFileModules(environment, ids, shouldInvalidate) {
	const seen = /* @__PURE__ */ new Set();
	const invalidatedModules = [];
	for (const id of ids) {
		const fileModules = environment.moduleGraph.getModulesByFile(cleanId(id));
		if (!fileModules) continue;
		for (const fileModule of fileModules) {
			if (!shouldInvalidate(fileModule)) continue;
			environment.moduleGraph.invalidateModule(fileModule, seen);
			invalidatedModules.push(fileModule);
		}
	}
	return invalidatedModules;
}
function invalidateServerFnProviderModules(environment, ids) {
	return invalidateMatchingFileModules(environment, ids, (fileModule) => fileModule.id?.includes(TSS_SERVERFN_SPLIT_PARAM$1) ?? false);
}
function invalidateServerFnLookupModules(environment, ids) {
	invalidateMatchingFileModules(environment, ids, (fileModule) => fileModule.id?.includes("server-fn-module-lookup") ?? false);
}
function invalidateCompilerVirtualModules(environment, ids, pattern) {
	if (!pattern) return [];
	return invalidateMatchingFileModules(environment, ids, (fileModule) => {
		if (!fileModule.id) return false;
		pattern.lastIndex = 0;
		return pattern.test(fileModule.id);
	});
}
function getServerFnProviderIds(ids) {
	const providerIds = /* @__PURE__ */ new Set();
	for (const id of ids) {
		const cleanedId = cleanId(id);
		providerIds.add(`${cleanedId}?${TSS_SERVERFN_SPLIT_PARAM$1}`);
	}
	return providerIds;
}
function invalidateModuleNodes(environment, modules) {
	const seen = /* @__PURE__ */ new Set();
	for (const mod of modules) environment.moduleGraph.invalidateModule(mod, seen);
}
function getDevServerFnValidatorModule() {
	return `
export async function getServerFnById(id, _access) {
  const validateIdImport = ${JSON.stringify(validateServerFnIdVirtualModule)} + '?id=' + id
  await import(/* @vite-ignore */ '/@id/__x00__' + validateIdImport)
  const decoded = Buffer.from(id, 'base64url').toString('utf8')
  const devServerFn = JSON.parse(decoded)
  const mod = await import(/* @vite-ignore */ devServerFn.file)
  return mod[devServerFn.export]
}
`;
}
function parseIdQuery(id) {
	if (!id.includes("?")) return {
		filename: id,
		query: {}
	};
	const [filename, rawQuery] = id.split(`?`, 2);
	return {
		filename,
		query: Object.fromEntries(new URLSearchParams(rawQuery))
	};
}
function startCompilerPlugin(opts) {
	const compilers = /* @__PURE__ */ new Map();
	const compilerPlugins = [createHydrateCompilerPlugin(), ...opts.compilerPlugins ?? []];
	const compilerVirtualModuleIdPattern = createCompilerVirtualModuleIdPattern(compilerPlugins);
	const environmentByName = new Map(opts.environments.map((environment) => [environment.name, environment]));
	const serverFnsById = {};
	const onServerFnsById = (d) => {
		mergeServerFnsById(serverFnsById, d);
	};
	let root = process.cwd();
	let bundledDev = false;
	const ssrEnvName = VITE_ENVIRONMENT_NAMES.server;
	const ssrIsProvider = opts.providerEnvName === ssrEnvName;
	const appliedResolverEnvironments = new Set(ssrIsProvider ? [opts.providerEnvName] : [ssrEnvName, opts.providerEnvName]);
	function perEnvServerFnPlugin(environment) {
		const compilerTransforms = environment.name === opts.providerEnvName ? opts.compilerTransforms : void 0;
		const serverFnProviderModuleDirectives = environment.name === opts.providerEnvName ? opts.serverFnProviderModuleDirectives : void 0;
		const transformCodeFilter = getTransformCodeFilterForEnv(environment.type, {
			compilerTransforms,
			compilerPlugins
		});
		function invalidateCompilerState(viteEnvironment, modules) {
			const compiler = compilers.get(viteEnvironment.name);
			const idsToInvalidate = /* @__PURE__ */ new Set();
			const transitiveCompilerImportersToInvalidate = /* @__PURE__ */ new Set();
			const importerModulesToInvalidate = /* @__PURE__ */ new Set();
			const changedIds = [];
			modules.forEach((m) => {
				if (m.id) {
					idsToInvalidate.add(m.id);
					changedIds.push(m.id);
				}
			});
			const deletedIds = compiler?.invalidateModules(changedIds) ?? /* @__PURE__ */ new Set();
			modules.forEach((m) => {
				if (m.id) {
					if (deletedIds.has(cleanId(m.id))) {
						transitiveCompilerImportersToInvalidate.add(cleanId(m.id));
						m.importers.forEach((importer) => {
							if (importer.id) {
								idsToInvalidate.add(importer.id);
								importerModulesToInvalidate.add(importer);
								transitiveCompilerImportersToInvalidate.add(cleanId(importer.id));
							}
						});
					}
				}
			});
			const finishHotUpdate = async () => {
				if (environment.type === "server" && compiler && transitiveCompilerImportersToInvalidate.size > 0) {
					const seenImporters = new Set(transitiveCompilerImportersToInvalidate);
					const nestedImporters = await compiler.getTransitiveImporters(seenImporters);
					for (const nestedImporterId of nestedImporters) seenImporters.add(nestedImporterId);
					for (const importerId of seenImporters) idsToInvalidate.add(importerId);
					compiler.invalidateModules(seenImporters);
				}
				invalidateModuleNodes(viteEnvironment, importerModulesToInvalidate);
				invalidateServerFnLookupModules(viteEnvironment, idsToInvalidate);
				const compilerVirtualModules = invalidateCompilerVirtualModules(viteEnvironment, idsToInvalidate, compilerVirtualModuleIdPattern);
				if (environment.type !== "server") return mergeHotUpdateModules(modules, compilerVirtualModules);
				invalidateModuleNodes(viteEnvironment, modules);
				const providerIdsToInvalidate = getServerFnProviderIds(idsToInvalidate);
				compiler?.invalidateModules(providerIdsToInvalidate);
				const providerModules = invalidateServerFnProviderModules(viteEnvironment, [...idsToInvalidate, ...providerIdsToInvalidate]);
				return mergeHotUpdateModules(modules, [...compilerVirtualModules, ...providerModules]);
			};
			return finishHotUpdate();
		}
		return {
			name: `tanstack-start-core::server-fn:${environment.name}`,
			enforce: "pre",
			perEnvironmentWatchChangeDuringDev: true,
			applyToEnvironment(env) {
				return env.name === environment.name;
			},
			configResolved(config) {
				root = config.root;
				bundledDev = !!config.experimental.bundledDev;
			},
			buildStart() {
				if (this.environment.mode === "build" || bundledDev && this.environment.name === VITE_ENVIRONMENT_NAMES.client) compilers.delete(this.environment.name);
			},
			async watchChange(id) {
				if (bundledDev && this.environment.mode === "dev") {
					if (environment.type === "server") await invalidateCompilerState(this.environment, Array.from(this.environment.moduleGraph.getModulesByFile(id) ?? []));
					else compilers.get(this.environment.name)?.invalidateModule(id);
				}
			},
			transform: {
				filter: {
					id: {
						exclude: new RegExp(`${SERVER_FN_LOOKUP}$`),
						include: TRANSFORM_ID_REGEX
					},
					code: { include: transformCodeFilter }
				},
				async handler(code, id) {
					let compiler = compilers.get(this.environment.name);
					if (!compiler) {
						const mode = this.environment.mode === "build" ? "build" : "dev";
						compiler = createStartCompiler({
							env: environment.type,
							envName: environment.name,
							root,
							mode,
							framework: opts.framework,
							providerEnvName: opts.providerEnvName,
							generateFunctionId: opts.generateFunctionId,
							compilerTransforms,
							compilerPlugins,
							serverFnProviderModuleDirectives,
							onServerFnsById,
							getKnownServerFns: () => serverFnsById,
							encodeModuleSpecifierInDev: mode === "dev" ? createViteDevServerFnModuleSpecifierEncoder(root) : void 0,
							loadModule: async (id) => {
								const code = await loadViteModuleFromEnvironment(this.environment, id, {
									load: (options) => this.load(options),
									error: (message) => this.error(message),
									devId: appendIdQueryFlag(id, SERVER_FN_LOOKUP)
								});
								if (code !== void 0) compiler.ingestModule({
									code,
									id
								});
							},
							resolveId: async (source, importer) => {
								const r = await this.resolve(source, importer);
								if (r) {
									if (!r.external) return r.id;
								}
								return null;
							}
						});
						compilers.set(this.environment.name, compiler);
					}
					const detectedKinds = detectKindsInCode(code, environment.type, { compilerTransforms });
					return await compiler.compile({
						id,
						code,
						detectedKinds,
						warn: (message) => this.warn(message)
					});
				}
			},
			hotUpdate(ctx) {
				return invalidateCompilerState(this.environment, ctx.modules);
			}
		};
	}
	return [
		...opts.environments.map(perEnvServerFnPlugin),
		{
			name: "tanstack-start-core:capture-server-fn-module-lookup",
			apply: "serve",
			applyToEnvironment(env) {
				return !!opts.environments.find((e) => e.name === env.name);
			},
			transform: {
				filter: { id: new RegExp(`${SERVER_FN_LOOKUP}$`) },
				handler(code, id) {
					if (bundledDev && this.environment.name === VITE_ENVIRONMENT_NAMES.client) return;
					compilers.get(this.environment.name)?.ingestModule({
						code,
						id: removeIdQueryFlag(id, SERVER_FN_LOOKUP)
					});
				}
			}
		},
		{
			name: "tanstack-start-core:compiler-virtual-module",
			enforce: "pre",
			load: {
				filter: { id: compilerVirtualModuleIdPattern ?? /$^/ },
				async handler(id) {
					const environment = environmentByName.get(this.environment.name);
					if (!environment || !compilerVirtualModuleIdPattern) return null;
					const loadVirtualModule = () => loadCompilerVirtualModule(compilerPlugins, {
						id,
						root,
						env: environment.type,
						envName: this.environment.name
					});
					try {
						return loadVirtualModule();
					} catch (error) {
						if (!(error instanceof MissingHydrateSourceError)) throw error;
					}
					const sourceId = cleanId(id);
					await loadViteModuleFromEnvironment(this.environment, sourceId, {
						load: (options) => this.load(options),
						error: (message) => this.error(message)
					});
					return loadVirtualModule();
				}
			}
		},
		{
			name: "tanstack-start-core:validate-server-fn-id",
			apply: "serve",
			load: {
				filter: { id: new RegExp(resolveViteId(validateServerFnIdVirtualModule)) },
				async handler(id) {
					const fnId = parseIdQuery(id).query.id;
					if (fnId && serverFnsById[fnId]) return `export {}`;
					if (fnId) try {
						const decoded = JSON.parse(Buffer.from(fnId, "base64url").toString("utf8"));
						if (typeof decoded.file === "string" && typeof decoded.export === "string") {
							const sourceFile = decodeViteDevServerModuleSpecifier(decoded.file);
							if (sourceFile) {
								const absPath = resolve$1(root, sourceFile);
								if (this.environment.mode !== "dev") this.error(`could not validate server function ID ${fnId}: unknown environment mode ${this.environment.mode}`);
								await this.environment.transformRequest(`${absPath}?${SERVER_FN_LOOKUP}`);
								if (serverFnsById[fnId]) return `export {}`;
							}
						}
					} catch {}
					this.error(`Invalid server function ID: ${fnId}`);
				}
			}
		},
		createVirtualModule({
			name: "tanstack-start-core:server-fn-resolver",
			moduleId: VIRTUAL_MODULES.serverFnResolver,
			enforce: "pre",
			applyToEnvironment: (env) => {
				return appliedResolverEnvironments.has(env.name);
			},
			load() {
				if (this.environment.name !== opts.providerEnvName) {
					const mod = opts.environments.find((e) => e.name === this.environment.name)?.getServerFnById;
					if (mod) return mod;
					this.error(`No getServerFnById implementation found for caller environment: ${this.environment.name}`);
				}
				if (this.environment.mode !== "build") return getDevServerFnValidatorModule();
				return generateServerFnResolverModule({
					serverFnsById,
					includeClientReferencedCheck: !ssrIsProvider,
					memoizeModules: true
				});
			}
		})
	];
}
function loadEnvPlugin() {
	return {
		name: "tanstack-start-core:load-env",
		enforce: "pre",
		configResolved(config) {
			Object.assign(process.env, loadEnv(config.mode, config.root, ""));
		}
	};
}
function createViteResolvedEntryAliases(opts) {
	const client = normalizePath(opts.entryPaths.client);
	const server = normalizePath(opts.entryPaths.server);
	const start = normalizePath(opts.entryPaths.start);
	const router = normalizePath(opts.entryPaths.router);
	return {
		client,
		server,
		start,
		router,
		alias: {
			[ENTRY_POINTS.client]: client,
			[ENTRY_POINTS.server]: server,
			[ENTRY_POINTS.start]: start,
			[ENTRY_POINTS.router]: router
		}
	};
}
function createViteConfigPlan(opts) {
	return {
		environments: {
			[START_ENVIRONMENT_NAMES.client]: {
				consumer: "client",
				build: {
					rolldownOptions: { input: { index: opts.command === "serve" ? DEV_CLIENT_ENTRY : ENTRY_POINTS.client } },
					outDir: opts.clientOutputDirectory
				},
				optimizeDeps: {
					exclude: opts.optimizeDepsExclude,
					entries: escapeEntries([opts.entryAliases.client, opts.entryAliases.router])
				}
			},
			[START_ENVIRONMENT_NAMES.server]: {
				consumer: "server",
				build: {
					ssr: true,
					rolldownOptions: { input: getBundlerOptions(opts.viteConfig.environments?.[START_ENVIRONMENT_NAMES.server]?.build)?.input ?? opts.entryAliases.server },
					outDir: opts.serverOutputDirectory,
					commonjsOptions: { include: [/node_modules/] },
					copyPublicDir: opts.viteConfig.environments?.[START_ENVIRONMENT_NAMES.server]?.build?.copyPublicDir ?? false
				},
				optimizeDeps: { entries: escapeEntries([
					opts.entryAliases.server,
					opts.entryAliases.start,
					opts.entryAliases.router
				]) }
			},
			...opts.serverFnProviderEnv !== START_ENVIRONMENT_NAMES.server && { [opts.serverFnProviderEnv]: {
				build: { outDir: join$1(opts.serverOutputDirectory, opts.serverFnProviderEnv) },
				optimizeDeps: { entries: escapeEntries([opts.entryAliases.router]) }
			} }
		},
		resolve: {
			noExternal: [
				"@tanstack/start**",
				`@tanstack/${opts.framework}-start**`,
				...opts.noExternal
			],
			alias: { ...opts.entryAliases.alias }
		}
	};
}
function createViteDefineConfig(opts) {
	return {
		...defineReplaceEnv("TSS_SERVER_FN_BASE", opts.serverFnBase),
		...defineReplaceEnv("TSS_ROUTER_BASEPATH", opts.routerBasepath),
		...opts.command === "serve" ? defineReplaceEnv("TSS_SHELL", opts.spaEnabled ? "true" : "false") : {},
		...defineReplaceEnv("TSS_DEV_SERVER", opts.command === "serve" ? "true" : "false"),
		...defineReplaceEnv("TSS_DEV_SSR_STYLES_ENABLED", opts.devSsrStylesEnabled ? "true" : "false"),
		...defineReplaceEnv("TSS_DEV_SSR_STYLES_BASEPATH", opts.devSsrStylesBasepath),
		...defineReplaceEnv("TSS_INLINE_CSS_ENABLED", opts.inlineCssEnabled ? "true" : "false"),
		...defineReplaceEnv("TSS_DISABLE_CSRF_MIDDLEWARE_WARNING", opts.disableCsrfMiddlewareWarning ? "true" : "false"),
		...opts.command === "build" && opts.staticNodeEnv ? { "process.env.NODE_ENV": JSON.stringify("production") } : {}
	};
}
async function buildStartViteEnvironments(opts) {
	const client = getRequiredBuilderEnvironment(opts.builder, START_ENVIRONMENT_NAMES.client, "Client environment not found");
	const server = getRequiredBuilderEnvironment(opts.builder, START_ENVIRONMENT_NAMES.server, "SSR environment not found");
	if (!client.isBuilt) await opts.builder.build(client);
	if (!server.isBuilt) await opts.builder.build(server);
	if (opts.ssrIsProvider) return;
	const providerEnv = getRequiredBuilderEnvironment(opts.builder, opts.providerEnvironmentName, `Provider environment "${opts.providerEnvironmentName}" not found`);
	if (!providerEnv.isBuilt) await opts.builder.build(providerEnv);
}
function escapeEntries(entries) {
	return entries.map((entry) => escapePath(entry));
}
function defineReplaceEnv(key, value) {
	return {
		[`process.env.${key}`]: JSON.stringify(value),
		[`import.meta.env.${key}`]: JSON.stringify(value)
	};
}
function getRequiredBuilderEnvironment(builder, environmentName, errorMessage) {
	const environment = builder.environments[environmentName];
	if (!environment) throw new Error(errorMessage);
	return environment;
}
async function ensureLatestClientBuild(environment) {
	await environment.bundledDev["devEngine"].ensureLatestBuildOutput();
}
/**
* CSS collection for dev mode.
* Crawls the Vite module graph to collect CSS from the router entry and all its dependencies.
*/
var CSS_FILE_REGEX = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
var CSS_SIDE_EFFECT_FREE_PARAMS = [
	"url",
	"inline",
	"raw",
	"inline-css"
];
var VITE_CSS_MARKER = "const __vite__css = ";
var ESCAPE_CSS_COMMENT_START_REGEX = /\/\*/g;
var ESCAPE_CSS_COMMENT_END_REGEX = /\*\//g;
var NO_DEPENDENCIES = [];
var cssTransformCache = /* @__PURE__ */ new WeakMap();
function isCssFile(file) {
	return CSS_FILE_REGEX.test(file);
}
function hasCssSideEffectFreeParam(url) {
	const queryString = url.split("?")[1];
	if (!queryString) return false;
	const params = new URLSearchParams(queryString);
	return CSS_SIDE_EFFECT_FREE_PARAMS.some((param) => params.get(param) === "" && !url.includes(`?${param}=`) && !url.includes(`&${param}=`));
}
/**
* Resolve a file path to a Vite dev server URL.
* Files within the root directory use relative paths, files outside use /@fs prefix.
*/
function resolveDevUrl(rootDirectory, filePath) {
	const normalizedPath = filePath.replace(/\\/g, "/");
	const relativePath = path.posix.relative(rootDirectory.replace(/\\/g, "/"), normalizedPath);
	if (!relativePath.startsWith("..") && !path.isAbsolute(relativePath)) return path.posix.join("/", relativePath);
	return path.posix.join("/@fs", normalizedPath);
}
/**
* Collect CSS content from the module graph starting from the given entry points.
*/
async function collectDevStyles(opts) {
	const { serverEnvironment, rootDirectory, entries, loadCssContents } = opts;
	const orderedCssNodes = await collectCssNodes(serverEnvironment, entries.map((entry) => resolveDevUrl(rootDirectory, entry)));
	const cssResults = await Promise.all(orderedCssNodes.map((node) => loadCssContents(node.url)));
	return formatCss(orderedCssNodes.map((node) => node.url), cssResults);
}
/**
* Resolve entry nodes and their dependency graph in parallel, then linearize the
* completed graph synchronously. This keeps I/O concurrent without making
* Promise resolution timing part of the CSS cascade order.
*/
async function collectCssNodes(environment, entryUrls) {
	const entryNodes = await Promise.all(entryUrls.map((entryUrl) => resolveEntry(environment, entryUrl)));
	const dependencies = /* @__PURE__ */ new Map();
	const discovered = /* @__PURE__ */ new Set();
	const dependencyLookups = /* @__PURE__ */ new Map();
	function getDependency(url) {
		let lookup = dependencyLookups.get(url);
		if (!lookup) {
			lookup = environment.moduleGraph.getModuleByUrl(url);
			dependencyLookups.set(url, lookup);
		}
		return lookup;
	}
	async function discover(node) {
		if (discovered.has(node)) return;
		discovered.add(node);
		const nodeDependencies = await resolveModuleDeps(node, getDependency);
		dependencies.set(node, nodeDependencies);
		await Promise.all(nodeDependencies.map(discover));
	}
	await Promise.all(entryNodes.map((node) => node ? discover(node) : Promise.resolve()));
	return orderCssNodes(entryNodes, (node) => node.url, (node) => dependencies.get(node) ?? []);
}
function orderCssNodes(entryNodes, getUrl, getDependencies) {
	const orderedCssNodes = [];
	const ordered = /* @__PURE__ */ new Set();
	const stack = [...entryNodes].reverse();
	while (stack.length > 0) {
		const node = stack.pop();
		if (!node || ordered.has(node)) continue;
		ordered.add(node);
		const url = getUrl(node);
		if (isCssFile(url) && !hasCssSideEffectFreeParam(url)) orderedCssNodes.push(node);
		const nodeDependencies = getDependencies(node);
		for (let i = nodeDependencies.length - 1; i >= 0; i--) stack.push(nodeDependencies[i]);
	}
	return orderedCssNodes;
}
async function resolveEntry(environment, entryUrl) {
	let node = await environment.moduleGraph.getModuleByUrl(entryUrl);
	if (!node?.transformResult) {
		try {
			await environment.transformRequest(entryUrl);
		} catch {}
		node = await environment.moduleGraph.getModuleByUrl(entryUrl);
	}
	return node;
}
/**
* Resolve a module's direct dependencies in graph order.
* Uses transformResult.deps for URL-based lookups and importedModules for
* already-resolved nodes.
*/
async function resolveModuleDeps(node, getDependency) {
	if (isCssFile(node.url)) return NO_DEPENDENCIES;
	const depUrls = node.transformResult?.deps ?? [];
	const importedModules = node.importedModules.size > 0 ? Array.from(node.importedModules) : NO_DEPENDENCIES;
	if (depUrls.length === 0 && importedModules.length === 0) return NO_DEPENDENCIES;
	const resolvedDeps = await Promise.all(depUrls.map(getDependency));
	const orderedDependencies = [];
	const added = /* @__PURE__ */ new Set();
	for (const dependency of resolvedDeps) if (dependency && !added.has(dependency)) {
		added.add(dependency);
		orderedDependencies.push(dependency);
	}
	for (const dependency of importedModules) if (!added.has(dependency)) {
		added.add(dependency);
		orderedDependencies.push(dependency);
	}
	return orderedDependencies;
}
async function fetchCssFromModule(environment, url) {
	const cachedTransform = (await environment.moduleGraph.getModuleByUrl(url))?.transformResult;
	if (cachedTransform?.code) return extractCssFromTransform(cachedTransform);
	try {
		const transformResult = await environment.transformRequest(url);
		if (!transformResult?.code) return;
		return extractCssFromTransform(transformResult);
	} catch {
		return;
	}
}
function extractCssFromTransform(transformResult) {
	const cachedCss = cssTransformCache.get(transformResult);
	if (cachedCss !== void 0) return cachedCss ?? void 0;
	const css = extractCssFromCode(transformResult.code);
	cssTransformCache.set(transformResult, css ?? null);
	return css;
}
/**
* Extract CSS content from Vite's transformed CSS module code.
*
* Vite embeds CSS into the module as a JS string via `JSON.stringify(cssContent)`,
* e.g. `const __vite__css = ${JSON.stringify('...css...')}`.
*
* We locate that JSON string literal and run `JSON.parse` on it to reverse the
* escaping (\\n, \\t, \\", \\\\, \\uXXXX, etc.).
*/
function extractCssFromCode(code) {
	const startIdx = code.indexOf(VITE_CSS_MARKER);
	if (startIdx === -1) return;
	const valueStart = startIdx + 20;
	if (code.charCodeAt(valueStart) !== 34) return;
	const codeLength = code.length;
	let i = valueStart + 1;
	while (i < codeLength) {
		const charCode = code.charCodeAt(i);
		if (charCode === 34) try {
			return JSON.parse(code.slice(valueStart, i + 1));
		} catch {
			return;
		}
		if (charCode === 92) i += 2;
		else i++;
	}
}
/** Join available styles in graph order, labeling each with its source URL. */
function formatCss(urls, cssResults) {
	const parts = [];
	for (let i = 0; i < cssResults.length; i++) {
		const css = cssResults[i];
		if (!css) continue;
		const escapedFileName = urls[i].replace(ESCAPE_CSS_COMMENT_START_REGEX, "/\\*").replace(ESCAPE_CSS_COMMENT_END_REGEX, "*\\/");
		parts.push(`\n/* ${escapedFileName} */\n${css}`);
	}
	return parts.length > 0 ? parts.join("\n") : void 0;
}
/** Snapshot the completed bundle without retaining its plugin context or JS. */
function captureBundledDevStyles(graph, rootDirectory) {
	const css = /* @__PURE__ */ new Map();
	const dependencies = /* @__PURE__ */ new Map();
	for (const id of graph.getModuleIds()) {
		const info = graph.getModuleInfo(id);
		if (!info) continue;
		if (isCssFile(id)) {
			if (!hasCssSideEffectFreeParam(id) && info.code) {
				const contents = extractCssFromCode(info.code);
				if (contents) css.set(id, contents);
			}
		} else dependencies.set(id, [...info.importedIds, ...info.dynamicallyImportedIds]);
	}
	return {
		rootDirectory,
		css,
		dependencies
	};
}
function collectBundledDevStyles(snapshot, entries) {
	if (!snapshot) return;
	const nodes = orderCssNodes(entries.map((entry) => entry.replace(/\\/g, "/")), (id) => id, (id) => snapshot.dependencies.get(id) ?? []);
	return formatCss(nodes.map((id) => resolveDevUrl(snapshot.rootDirectory, id)), nodes.map((id) => snapshot.css.get(id)));
}
function devServerPlugin({ getConfig: _getConfig, devSsrStylesEnabled, installDevServerMiddleware }) {
	let isTest = false;
	let bundledDev = false;
	let bundledStyles;
	return [{
		name: "tanstack-start-core:dev-server",
		perEnvironmentWatchChangeDuringDev: true,
		config(_userConfig, { mode }) {
			isTest = isTest ? isTest : mode === "test";
		},
		configEnvironment(name, _config, { command }) {
			if (command === "serve" && devSsrStylesEnabled && name === VITE_ENVIRONMENT_NAMES.client) return { build: { rolldownOptions: { experimental: { devMode: { lazy: false } } } } };
		},
		configResolved(config) {
			bundledDev = config.command === "serve" && !!config.experimental.bundledDev;
		},
		generateBundle() {
			if (bundledDev && devSsrStylesEnabled && this.environment.name === VITE_ENVIRONMENT_NAMES.client) bundledStyles = captureBundledDevStyles(this, this.environment.config.root);
		},
		watchChange: {
			order: "post",
			sequential: true,
			handler(id) {
				if (bundledDev && this.environment.name === VITE_ENVIRONMENT_NAMES.server && this.environment.mode === "dev") {
					this.environment.moduleGraph.onFileChange(id);
					this.environment.hot.send({
						type: "full-reload",
						triggeredBy: id
					});
				}
			}
		},
		configureServer(viteDevServer) {
			if (isTest) return;
			const clientEnv = viteDevServer.environments[VITE_ENVIRONMENT_NAMES.client];
			if (devSsrStylesEnabled) viteDevServer.middlewares.use(async (req, res, next) => {
				const url = req.url ?? "";
				if (!url.split("?")[0]?.endsWith("/@tanstack-start/styles.css")) return next();
				try {
					const routesParam = new URL(url, "http://localhost").searchParams.get("routes");
					const ids = routesParam ? routesParam.split(",") : [];
					const entries = [];
					const routesManifest = globalThis.TSS_ROUTES_MANIFEST;
					if (routesManifest && ids.length > 0) for (const routeId of ids) {
						const route = routesManifest[routeId];
						if (route?.filePath) entries.push(route.filePath);
					}
					let css = "";
					if (entries.length > 0) {
						if (bundledDev) {
							await ensureLatestClientBuild(clientEnv);
							css = collectBundledDevStyles(bundledStyles, entries) ?? "";
						} else css = await collectDevStyles({
							serverEnvironment: viteDevServer.environments[VITE_ENVIRONMENT_NAMES.server],
							rootDirectory: viteDevServer.config.root,
							entries,
							loadCssContents: (url) => fetchCssFromModule(viteDevServer.environments[VITE_ENVIRONMENT_NAMES.client], url)
						}) ?? "";
					}
					res.setHeader("Content-Type", "text/css");
					res.setHeader("Cache-Control", "no-store");
					res.end(css);
				} catch (e) {
					console.error("[tanstack-start] Error collecting dev styles:", e);
					res.setHeader("Content-Type", "text/css");
					res.setHeader("Cache-Control", "no-store");
					res.end(`/* Error collecting styles: ${e instanceof Error ? e.message : String(e)} */`);
				}
			});
			if (viteDevServer.config.experimental.bundledDev) viteDevServer.watcher.add(viteDevServer.config.root);
			return () => {
				const serverEnv = viteDevServer.environments[VITE_ENVIRONMENT_NAMES.server];
				if (!serverEnv) throw new Error(`Server environment ${VITE_ENVIRONMENT_NAMES.server} not found`);
				const installMiddleware = installDevServerMiddleware;
				if (installMiddleware === false) return;
				if (installMiddleware == void 0) {
					if (viteDevServer.config.server.middlewareMode) return;
					if (!isRunnableDevEnvironment(serverEnv) || "dispatchFetch" in serverEnv) return;
				}
				if (!isRunnableDevEnvironment(serverEnv)) throw new Error("cannot install vite dev server middleware for TanStack Start since the SSR environment is not a RunnableDevEnvironment");
				viteDevServer.middlewares.use(async (req, res) => {
					if (req.originalUrl) req.url = req.originalUrl;
					const webReq = new NodeRequest({
						req,
						res
					});
					try {
						const serverRunner = serverEnv.runner;
						/**
						* export default {
						*  fetch(req: Request): Promise<Response>
						* }
						*/
						if (viteDevServer.config.experimental.bundledDev) await ensureLatestClientBuild(clientEnv);
						const webRes = await (await serverRunner.import(ENTRY_POINTS.server))["default"].fetch(webReq);
						return sendNodeResponse(res, webRes);
					} catch (e) {
						console.error(e);
						try {
							viteDevServer.ssrFixStacktrace(e);
						} catch {}
						if (webReq.headers.get("content-type")?.includes("application/json")) return sendNodeResponse(res, new Response(JSON.stringify({
							status: 500,
							error: "Internal Server Error",
							message: "An unexpected error occurred. Please try again later.",
							timestamp: (/* @__PURE__ */ new Date()).toISOString()
						}, null, 2), {
							status: 500,
							headers: { "Content-Type": "application/json" }
						}));
						return sendNodeResponse(res, new Response(`
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <title>Error</title>
                  <script type="module">
                    import { ErrorOverlay } from '/@vite/client'
                    document.body.appendChild(new ErrorOverlay(${JSON.stringify(prepareError(req, e)).replace(/</g, "\\u003c")}))
                  <\/script>
                </head>
                <body>
                </body>
              </html>
            `, {
							status: 500,
							headers: { "Content-Type": "text/html" }
						}));
					}
				});
			};
		}
	}];
}
/**
* Formats error for SSR message in error overlay
* @param req
* @param error
* @returns
*/
function prepareError(req, error) {
	const e = error;
	return {
		message: `An error occurred while server rendering ${req.url}:\n\n\t${typeof e === "string" ? e : e.message} `,
		stack: typeof e === "string" ? "" : e.stack
	};
}
function getClientOutputDirectory(userConfig) {
	return getOutputDirectory(userConfig, VITE_ENVIRONMENT_NAMES.client, "client");
}
function getServerOutputDirectory(userConfig) {
	return getOutputDirectory(userConfig, VITE_ENVIRONMENT_NAMES.server, "server");
}
function getOutputDirectory(userConfig, environmentName, directoryName) {
	const rootOutputDirectory = userConfig.build?.outDir ?? "dist";
	return userConfig.environments?.[environmentName]?.build?.outDir ?? join$1(rootOutputDirectory, directoryName);
}
function previewServerPlugin() {
	return {
		name: "tanstack-start-core:preview-server",
		configurePreviewServer: {
			order: "post",
			handler(server) {
				return () => {
					let serverBuild = null;
					server.middlewares.use(async (req, res, next) => {
						try {
							if (!serverBuild) {
								const serverEnv = server.config.environments[VITE_ENVIRONMENT_NAMES.server];
								const serverInput = getBundlerOptions(serverEnv?.build)?.input ?? "server";
								if (typeof serverInput !== "string") throw new Error("Invalid server input. Expected a string.");
								const outputFilename = `${basename$1(serverInput, extname$1(serverInput))}.js`;
								const serverOutputDir = getServerOutputDirectory(server.config);
								const serverEntryPath = join$1(serverOutputDir, outputFilename);
								serverBuild = (await import(pathToFileURL(serverEntryPath).toString())).default;
							}
							req.url = joinURL(server.config.base, req.url ?? "/");
							const webReq = new NodeRequest({
								req,
								res
							});
							const webRes = await serverBuild.fetch(webReq);
							if (webRes.headers.get("content-type")?.startsWith("text/html")) res.setHeader("content-encoding", "identity");
							res.setHeaders(webRes.headers);
							res.writeHead(webRes.status, webRes.statusText);
							return sendNodeResponse(res, webRes);
						} catch (error) {
							next(error);
						}
					});
				};
			}
		}
	};
}
function createDevClientEntryPlugin(opts) {
	return createVirtualModule({
		name: "tanstack-start-core:dev-client-entry",
		moduleId: DEV_CLIENT_ENTRY,
		enforce: "pre",
		async load() {
			const clientEntryId = normalizePath(opts.getClientEntry()).replaceAll("\\", "/");
			const clientEntry = JSON.stringify(clientEntryId);
			if (this.environment.mode === "dev" && this.environment.config.experimental.bundledDev) {
				const resolvedEntry = await this.resolve(clientEntryId);
				const entry = await this.load({ id: resolvedEntry?.id ?? clientEntryId });
				entry.moduleSideEffects = true;
			}
			if (shouldInjectReactRefreshPreamble(this.environment, opts.framework)) {
				const reactRefresh = await this.resolve?.("/@react-refresh");
				if (!reactRefresh) throw new Error("TanStack Start React dev mode requires the React Refresh runtime, but /@react-refresh could not be resolved. Add @vitejs/plugin-react or another compatible React Refresh Vite plugin to your Vite config.");
				return getReactRefreshPreambleCode(reactRefresh.id) + `\nawait import(${clientEntry})`;
			}
			return `import ${clientEntry}`;
		}
	});
}
function shouldInjectReactRefreshPreamble(environment, framework) {
	const config = environment?.config;
	return framework === "react" && config?.command === "serve" && config.consumer === "client" && config.server?.hmr !== false;
}
function getReactRefreshPreambleCode(reactRefreshId) {
	return `import { injectIntoGlobalHook } from ${JSON.stringify(reactRefreshId)};
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;`;
}
function createPostBuildPlugin(opts) {
	return {
		name: "tanstack-start-core:post-build",
		enforce: "post",
		buildApp: {
			order: "post",
			async handler(builder) {
				const { startConfig } = opts.getConfig();
				await opts.postServerBuild({
					builder,
					startConfig
				});
			}
		}
	};
}
function createDevBaseRewritePlugin(opts) {
	return {
		name: "tanstack-start-core:dev-base-rewrite",
		configureServer(server) {
			if (!opts.shouldRewriteDevBase()) return;
			const basePrefix = opts.resolvedStartConfig.basePaths.publicBase.replace(/\/$/, "");
			server.middlewares.use((req, _res, next) => {
				if (req.url && !req.url.startsWith(basePrefix)) req.url = basePrefix + req.url;
				next();
			});
		}
	};
}
var tanstackStartViteOptionsSchema = tanstackStartOptionsObjectSchema.extend({ vite: object({ installDevServerMiddleware: boolean().optional() }).optional() }).optional().prefault({});
function parseStartConfig(opts, corePluginOpts, root) {
	tanstackStartViteOptionsSchema.parse(opts);
	const { vite: _vite, ...coreOptions } = opts ?? {};
	return parseStartConfig$1(coreOptions, corePluginOpts, root);
}
var cssUrlPattern = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"']*?))\s*\)|@import\s+(?:url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"']*?))\s*\)|"([^"]*)"|'([^']*)')/gi;
function createInlineCssUrlPlaceholder(index) {
	return `__TSS INLINE CSS URL ${index}__`;
}
function isRelativeCssUrl(url) {
	if (!url) return false;
	if (url.startsWith("#")) return false;
	if (url.startsWith("/")) return false;
	if (/^[a-z][a-z\d+.-]*:/i.test(url)) return false;
	return true;
}
function shouldTransformInlineCssUrl(url) {
	if (!url) return false;
	if (url.startsWith("#")) return false;
	if (url.startsWith("//")) return false;
	if (/^[a-z][a-z\d+.-]*:/i.test(url)) return false;
	return true;
}
function shouldProcessInlineCssUrls(css, templates) {
	cssUrlPattern.lastIndex = 0;
	for (const match of css.matchAll(cssUrlPattern)) {
		const url = (match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? match[6] ?? match[7] ?? match[8] ?? "").trim();
		if (templates ? shouldTransformInlineCssUrl(url) : isRelativeCssUrl(url)) return true;
	}
	return false;
}
function rebaseCssUrl(url, cssHref) {
	if (!isRelativeCssUrl(url)) return url;
	const fakeOrigin = "http://tanstack.local";
	const resolved = new URL(url, new URL(cssHref, fakeOrigin));
	if (resolved.origin === fakeOrigin) return `${resolved.pathname}${resolved.search}${resolved.hash}`;
	return resolved.href;
}
function processInlineCssUrls(options) {
	const css = options.css.trim();
	const templates = options.templates === true;
	if (!shouldProcessInlineCssUrls(css, templates)) return { css };
	const urls = [];
	const result = transform({
		filename: options.cssHref,
		code: Buffer.from(css),
		minify: true,
		visitor: {
			Url(url) {
				if (!shouldTransformInlineCssUrl(url.url)) return url;
				const rebasedUrl = rebaseCssUrl(url.url, options.cssHref);
				if (templates) {
					urls.push(rebasedUrl);
					return {
						...url,
						url: createInlineCssUrlPlaceholder(urls.length - 1)
					};
				}
				return {
					...url,
					url: rebasedUrl
				};
			},
			Rule: { import(rule) {
				if (!shouldTransformInlineCssUrl(rule.value.url)) return rule;
				const rebasedUrl = rebaseCssUrl(rule.value.url, options.cssHref);
				if (templates) urls.push(rebasedUrl);
				const value = {
					url: templates ? createInlineCssUrlPlaceholder(urls.length - 1) : rebasedUrl,
					loc: rule.value.loc,
					...rule.value.media ? { media: rule.value.media } : {},
					...rule.value.layer ? { layer: rule.value.layer } : {},
					...rule.value.supports ? { supports: rule.value.supports } : {}
				};
				return {
					...rule,
					value
				};
			} }
		}
	});
	const transformedCss = Buffer.from(result.code).toString("utf8");
	if (!templates || urls.length === 0) return { css: transformedCss };
	return createInlineCssTemplate(transformedCss, urls);
}
function createInlineCssTemplate(cssWithPlaceholders, urls) {
	const strings = [];
	let css = "";
	let cursor = 0;
	for (let index = 0; index < urls.length; index++) {
		const placeholder = createInlineCssUrlPlaceholder(index);
		const placeholderIndex = cssWithPlaceholders.indexOf(placeholder, cursor);
		if (placeholderIndex === -1) throw new Error(`TanStack Start inlineCss could not find CSS URL placeholder: ${placeholder}`);
		const staticPart = cssWithPlaceholders.slice(cursor, placeholderIndex);
		strings.push(staticPart);
		css += staticPart + urls[index];
		cursor = placeholderIndex + placeholder.length;
	}
	const finalStaticPart = cssWithPlaceholders.slice(cursor);
	strings.push(finalStaticPart);
	css += finalStaticPart;
	return {
		css,
		template: {
			strings,
			urls
		}
	};
}
function getCssAssetSource(source) {
	if (typeof source === "string") return source;
	if (source instanceof Uint8Array) return Buffer.from(source).toString("utf8");
	if (source == null) return void 0;
	return String(source);
}
function appendUniqueStrings(target, source) {
	if (source.length === 0) return target;
	if (!target || target.length === 0) return source;
	const seen = new Set(target);
	let result;
	for (const value of source) {
		if (seen.has(value)) continue;
		seen.add(value);
		if (!result) result = target.slice();
		result.push(value);
	}
	return result ?? target;
}
function appendUniqueStylesheets(target, source) {
	if (source.length === 0) return target;
	if (!target || target.length === 0) return source;
	const seen = new Set(target.map(getStylesheetIdentity));
	let result;
	for (const stylesheet of source) {
		const identity = getStylesheetIdentity(stylesheet);
		if (seen.has(identity)) continue;
		seen.add(identity);
		if (!result) result = target.slice();
		result.push(stylesheet);
	}
	return result ?? target;
}
function getStylesheetIdentity(attrs) {
	const resolved = resolveManifestCssLink(attrs);
	return `${resolved.href}\0${resolved.crossOrigin ?? ""}`;
}
function getScriptIdentity(script) {
	return JSON.stringify({
		attrs: normalizeAttrs(script.attrs),
		children: script.children ?? null
	});
}
function normalizeAttrs(attrs) {
	if (!attrs) return null;
	const entries = Object.entries(attrs);
	if (entries.length === 0) return null;
	entries.sort(([left], [right]) => left.localeCompare(right));
	return Object.fromEntries(entries);
}
function mergeRouteChunkData(options) {
	const stylesheets = options.getChunkCssAssets(options.chunk);
	const chunkPreloads = options.getChunkPreloads(options.chunk);
	appendRouteStylesheets(options.route, stylesheets);
	options.route.preloads = appendUniqueStrings(options.route.preloads, chunkPreloads);
}
function appendRouteStylesheets(route, stylesheets) {
	if (stylesheets.length === 0) return;
	route.css = appendUniqueStylesheets(route.css, stylesheets);
}
function appendRouteScripts(route, scripts) {
	if (scripts.length === 0) return;
	route.scripts = [...route.scripts ?? [], ...scripts];
}
function buildScript(src, scriptFormat) {
	return { attrs: {
		...scriptFormat === "module" ? { type: "module" } : {},
		async: true,
		src
	} };
}
function appendEntryChunkScripts(options) {
	const scripts = [];
	if (options.scriptFormat === "iife") for (let i = 0; i < options.chunk.imports.length; i++) scripts.push(buildScript(options.getAssetPath(options.chunk.imports[i]), options.scriptFormat));
	scripts.push(buildScript(options.getAssetPath(options.chunk.fileName), options.scriptFormat));
	appendRouteScripts(options.route, scripts);
}
function appendAdditionalRouteEntries(route, entries) {
	if (entries.length === 0) return;
	const stylesheets = [];
	const scripts = [];
	for (const entry of entries) if (typeof entry === "string" || "href" in entry) stylesheets.push(entry);
	else scripts.push(entry);
	appendRouteStylesheets(route, stylesheets);
	appendRouteScripts(route, scripts);
}
function buildStartManifest(options) {
	const scannedChunks = scanClientChunks(options.clientBuild);
	const assetResolvers = createManifestAssetResolvers(options.basePath, scannedChunks.chunksByFileName);
	const routes = buildRouteManifestRoutes({
		routeTreeRoutes: options.routeTreeRoutes,
		routeChunksByFilePath: scannedChunks.routeChunksByFilePath,
		chunksByFileName: scannedChunks.chunksByFileName,
		entryChunk: scannedChunks.entryChunk,
		assetResolvers,
		additionalRouteAssets: options.additionalRouteAssets
	});
	appendEntryChunkScripts({
		route: routes[rootRouteId],
		chunk: scannedChunks.entryChunk,
		scriptFormat: options.scriptFormat ?? "module",
		getAssetPath: assetResolvers.getAssetPath
	});
	dedupeNestedRouteManifestEntries(rootRouteId, routes[rootRouteId], routes);
	for (const routeId in routes) {
		const route = routes[routeId];
		const hasScripts = route.scripts && route.scripts.length > 0;
		const hasCssLinks = route.css && route.css.length > 0;
		const hasPreloads = route.preloads && route.preloads.length > 0;
		if (!hasScripts && !hasCssLinks && !hasPreloads) delete routes[routeId];
	}
	const result = { routes };
	if (options.scriptFormat === "iife") result.scriptFormat = "iife";
	if (options.inlineCss?.enabled) result.inlineCss = buildInlineCssManifestData({
		routes,
		basePath: options.basePath,
		cssContentByFileName: options.clientBuild.cssContentByFileName,
		transformAssets: options.inlineCss.transformAssets
	});
	return result;
}
function serializeStartManifest(startManifest) {
	return serialize(startManifest);
}
function scanClientChunks(clientBuild) {
	const entryChunk = clientBuild.chunksByFileName.get(clientBuild.entryChunkFileName);
	if (!entryChunk) throw new Error(`Missing entry chunk: ${clientBuild.entryChunkFileName}`);
	const routeChunksByFilePath = /* @__PURE__ */ new Map();
	for (const chunk of clientBuild.chunksByFileName.values()) if (chunk.routeFilePaths.length > 0) for (const routeFilePath of chunk.routeFilePaths) {
		let chunks = routeChunksByFilePath.get(routeFilePath);
		if (chunks === void 0) {
			chunks = [];
			routeChunksByFilePath.set(routeFilePath, chunks);
		}
		chunks.push(chunk);
	}
	return {
		entryChunk,
		chunksByFileName: clientBuild.chunksByFileName,
		routeChunksByFilePath
	};
}
function createManifestAssetResolvers(basePath, chunksByFileName) {
	const assetPathByFileName = /* @__PURE__ */ new Map();
	const stylesheetLinkByFileName = /* @__PURE__ */ new Map();
	const closureByChunk = /* @__PURE__ */ new Map();
	const preloadsByChunk = /* @__PURE__ */ new Map();
	const cssAssetsByChunk = /* @__PURE__ */ new Map();
	const getAssetPath = (fileName) => {
		const cachedPath = assetPathByFileName.get(fileName);
		if (cachedPath) return cachedPath;
		const assetPath = joinURL(basePath, fileName);
		assetPathByFileName.set(fileName, assetPath);
		return assetPath;
	};
	const getStylesheetLink = (cssFile) => {
		const cachedLink = stylesheetLinkByFileName.get(cssFile);
		if (cachedLink) return cachedLink;
		const link = getAssetPath(cssFile);
		stylesheetLinkByFileName.set(cssFile, link);
		return link;
	};
	const getStaticImportClosure = (chunk) => {
		const cachedClosure = closureByChunk.get(chunk);
		if (cachedClosure) return cachedClosure;
		const seen = /* @__PURE__ */ new Set([chunk.fileName]);
		const fileNames = [];
		const dependenciesFirst = [];
		const stack = [{
			chunk,
			index: 0
		}];
		while (stack.length > 0) {
			const frame = stack[stack.length - 1];
			if (frame.index < frame.chunk.imports.length) {
				const fileName = frame.chunk.imports[frame.index++];
				if (seen.has(fileName)) continue;
				seen.add(fileName);
				fileNames.push(fileName);
				const importedChunk = chunksByFileName.get(fileName);
				if (importedChunk) stack.push({
					chunk: importedChunk,
					index: 0
				});
				continue;
			}
			stack.pop();
			dependenciesFirst.push(frame.chunk);
		}
		const closure = {
			fileNames,
			dependenciesFirst
		};
		closureByChunk.set(chunk, closure);
		return closure;
	};
	const getChunkPreloads = (chunk) => {
		const cachedPreloads = preloadsByChunk.get(chunk);
		if (cachedPreloads) return cachedPreloads;
		const { fileNames } = getStaticImportClosure(chunk);
		const preloads = [getAssetPath(chunk.fileName)];
		for (let i = 0; i < fileNames.length; i++) preloads.push(getAssetPath(fileNames[i]));
		preloadsByChunk.set(chunk, preloads);
		return preloads;
	};
	const getChunkCssAssets = (chunk) => {
		const cachedLinks = cssAssetsByChunk.get(chunk);
		if (cachedLinks) return cachedLinks;
		const { dependenciesFirst } = getStaticImportClosure(chunk);
		const links = [];
		const seenLinks = /* @__PURE__ */ new Set();
		for (let i = 0; i < dependenciesFirst.length; i++) for (const cssFile of dependenciesFirst[i].css) {
			const link = getStylesheetLink(cssFile);
			if (!seenLinks.has(link)) {
				seenLinks.add(link);
				links.push(link);
			}
		}
		cssAssetsByChunk.set(chunk, links);
		return links;
	};
	return {
		getAssetPath,
		getChunkPreloads,
		getChunkCssAssets,
		getStylesheetLink
	};
}
function buildInlineCssManifestData(options) {
	const stylesheetHrefs = /* @__PURE__ */ new Set();
	for (const route of Object.values(options.routes)) for (const link of route.css ?? []) stylesheetHrefs.add(getStylesheetHref(link));
	if (stylesheetHrefs.size === 0) return { styles: {} };
	if (!options.cssContentByFileName) throw new Error("TanStack Start inlineCss is enabled, but the client build did not provide CSS content");
	const styles = {};
	let templates;
	const missingHrefs = new Set(stylesheetHrefs);
	for (const [cssFile, css] of options.cssContentByFileName) {
		const cssHref = joinURL(options.basePath, cssFile);
		if (!stylesheetHrefs.has(cssHref)) continue;
		const result = processInlineCssUrls({
			css,
			cssHref,
			templates: options.transformAssets
		});
		styles[cssHref] = result.css;
		if (result.template) {
			templates ||= {};
			templates[cssHref] = result.template;
		}
		missingHrefs.delete(cssHref);
	}
	if (missingHrefs.size > 0) throw new Error(`TanStack Start inlineCss could not find CSS content for: ${Array.from(missingHrefs).join(", ")}`);
	return {
		styles,
		...templates ? { templates } : {}
	};
}
function buildRouteManifestRoutes(options) {
	const routes = {};
	const getChunkCssAssets = options.assetResolvers.getChunkCssAssets;
	for (const [routeId, route] of Object.entries(options.routeTreeRoutes)) {
		if (!route.filePath) {
			if (routeId === "__root__") {
				routes[routeId] = { ...route };
				continue;
			}
			throw new Error(`expected filePath to be set for ${routeId}`);
		}
		const chunks = options.routeChunksByFilePath.get(route.filePath);
		if (!chunks) {
			routes[routeId] = { ...route };
			continue;
		}
		const existing = routes[routeId];
		const targetRoute = routes[routeId] = existing ? existing : { ...route };
		for (const chunk of chunks) {
			mergeRouteChunkData({
				route: targetRoute,
				chunk,
				getChunkCssAssets,
				getChunkPreloads: options.assetResolvers.getChunkPreloads
			});
			if (routeId !== "__root__") mergeReachableHydrationChunkData({
				route: targetRoute,
				chunk,
				chunksByFileName: options.chunksByFileName,
				getChunkCssAssets
			});
		}
	}
	const rootRoute = routes[rootRouteId] = routes["__root__"] || {};
	const rootRouteTreeRoute = options.routeTreeRoutes[rootRouteId];
	const rootRouteChunks = rootRouteTreeRoute?.filePath ? options.routeChunksByFilePath.get(rootRouteTreeRoute.filePath) : void 0;
	if (rootRouteChunks) for (const chunk of rootRouteChunks) mergeReachableHydrationChunkData({
		route: rootRoute,
		chunk,
		chunksByFileName: options.chunksByFileName,
		getChunkCssAssets
	});
	mergeRouteChunkData({
		route: rootRoute,
		chunk: options.entryChunk,
		getChunkCssAssets,
		getChunkPreloads: options.assetResolvers.getChunkPreloads
	});
	if (options.additionalRouteAssets) for (const [routeId, assets] of Object.entries(options.additionalRouteAssets)) {
		if (!assets || assets.length === 0) continue;
		if (!(routeId in options.routeTreeRoutes)) throw new Error(`expected additionalRouteAssets routeId to exist in routeTreeRoutes: ${routeId}`);
		appendAdditionalRouteEntries(routes[routeId] = routes[routeId] || {}, assets);
	}
	return routes;
}
function mergeReachableHydrationChunkData(options) {
	const visitedStaticChunks = /* @__PURE__ */ new Set();
	const mergedHydrationChunks = /* @__PURE__ */ new Set();
	const mergeHydrationChunk = (chunk) => {
		if (mergedHydrationChunks.has(chunk.fileName)) return;
		mergedHydrationChunks.add(chunk.fileName);
		appendRouteStylesheets(options.route, options.getChunkCssAssets(chunk));
		for (const dynamicImport of chunk.dynamicImports) {
			const dynamicChunk = options.chunksByFileName.get(dynamicImport);
			if (dynamicChunk?.hydrationIds.length) mergeHydrationChunk(dynamicChunk);
		}
	};
	const visitStaticChunk = (chunk) => {
		if (visitedStaticChunks.has(chunk.fileName)) return;
		visitedStaticChunks.add(chunk.fileName);
		for (const importedFileName of chunk.imports) {
			const importedChunk = options.chunksByFileName.get(importedFileName);
			if (importedChunk) visitStaticChunk(importedChunk);
		}
		for (const dynamicImport of chunk.dynamicImports) {
			const dynamicChunk = options.chunksByFileName.get(dynamicImport);
			if (dynamicChunk?.hydrationIds.length) mergeHydrationChunk(dynamicChunk);
		}
	};
	visitStaticChunk(options.chunk);
}
function dedupeNestedRouteManifestEntries(routeId, route, routesById, seenPreloads = /* @__PURE__ */ new Set(), seenScripts = /* @__PURE__ */ new Set(), seenStylesheets = /* @__PURE__ */ new Set()) {
	let routePreloads = route.preloads;
	let routeScripts = route.scripts;
	let routeStylesheets = route.css;
	if (routePreloads && routePreloads.length > 0) {
		let dedupedPreloads;
		for (let i = 0; i < routePreloads.length; i++) {
			const preload = routePreloads[i];
			const preloadHref = resolveManifestAssetLink(preload).href;
			if (seenPreloads.has(preloadHref)) {
				if (dedupedPreloads === void 0) dedupedPreloads = routePreloads.slice(0, i);
				continue;
			}
			seenPreloads.add(preloadHref);
			if (dedupedPreloads) dedupedPreloads.push(preload);
		}
		if (dedupedPreloads) {
			routePreloads = dedupedPreloads;
			route.preloads = dedupedPreloads;
		}
	}
	if (routeScripts && routeScripts.length > 0) {
		let dedupedScripts;
		for (let i = 0; i < routeScripts.length; i++) {
			const script = routeScripts[i];
			const identity = getScriptIdentity(script);
			if (seenScripts.has(identity)) {
				if (dedupedScripts === void 0) dedupedScripts = routeScripts.slice(0, i);
				continue;
			}
			seenScripts.add(identity);
			if (dedupedScripts) dedupedScripts.push(script);
		}
		if (dedupedScripts) {
			routeScripts = dedupedScripts;
			if (dedupedScripts.length > 0) route.scripts = dedupedScripts;
			else delete route.scripts;
		}
	}
	if (routeStylesheets && routeStylesheets.length > 0) {
		let dedupedStylesheets;
		for (let i = 0; i < routeStylesheets.length; i++) {
			const stylesheet = routeStylesheets[i];
			const identity = getStylesheetIdentity(stylesheet);
			if (seenStylesheets.has(identity)) {
				if (dedupedStylesheets === void 0) dedupedStylesheets = routeStylesheets.slice(0, i);
				continue;
			}
			seenStylesheets.add(identity);
			if (dedupedStylesheets) dedupedStylesheets.push(stylesheet);
		}
		if (dedupedStylesheets) {
			routeStylesheets = dedupedStylesheets;
			if (dedupedStylesheets.length > 0) route.css = dedupedStylesheets;
			else delete route.css;
		}
	}
	if (route.children) for (const childRouteId of route.children) {
		const childRoute = routesById[childRouteId];
		if (!childRoute) throw new Error(`Route tree references child route ${childRouteId} from ${routeId}, but no route entry was found`);
		dedupeNestedRouteManifestEntries(childRouteId, childRoute, routesById, seenPreloads, seenScripts, seenStylesheets);
	}
	if (routePreloads) for (let i = routePreloads.length - 1; i >= 0; i--) seenPreloads.delete(resolveManifestAssetLink(routePreloads[i]).href);
	if (routeScripts) for (let i = routeScripts.length - 1; i >= 0; i--) seenScripts.delete(getScriptIdentity(routeScripts[i]));
	if (routeStylesheets) for (let i = routeStylesheets.length - 1; i >= 0; i--) seenStylesheets.delete(getStylesheetIdentity(routeStylesheets[i]));
}
function normalizeViteClientChunk(chunk) {
	return {
		fileName: chunk.fileName,
		isEntry: chunk.isEntry,
		imports: chunk.imports,
		dynamicImports: chunk.dynamicImports,
		css: Array.from(chunk.viteMetadata?.importedCss ?? []),
		routeFilePaths: getRouteFilePathsFromModuleIds(chunk.moduleIds),
		hydrationIds: getHydrationIdsFromModuleIds(chunk.moduleIds)
	};
}
function normalizeViteClientChunks(clientBundle) {
	const chunksByFileName = /* @__PURE__ */ new Map();
	for (const fileName in clientBundle) {
		const bundleEntry = clientBundle[fileName];
		if (bundleEntry.type !== "chunk") continue;
		const normalizedChunk = normalizeViteClientChunk(bundleEntry);
		chunksByFileName.set(normalizedChunk.fileName, normalizedChunk);
	}
	return chunksByFileName;
}
function normalizeViteClientBuild(clientBundle, inlineCssEnabled = false) {
	let entryChunkFileName;
	const chunksByFileName = normalizeViteClientChunks(clientBundle);
	let cssContentByFileName;
	for (const chunk of chunksByFileName.values()) if (chunk.isEntry) {
		if (entryChunkFileName) throw new Error(`multiple entries detected: ${entryChunkFileName} ${chunk.fileName}`);
		entryChunkFileName = chunk.fileName;
	}
	if (inlineCssEnabled) {
		cssContentByFileName = /* @__PURE__ */ new Map();
		for (const fileName in clientBundle) {
			if (!fileName.endsWith(".css")) continue;
			const bundleEntry = clientBundle[fileName];
			if (bundleEntry.type !== "asset") continue;
			const css = getCssAssetSource(bundleEntry.source);
			if (css !== void 0) cssContentByFileName.set(fileName, css);
		}
	}
	if (!entryChunkFileName) throw new Error("No entry file found");
	return {
		entryChunkFileName,
		chunksByFileName,
		cssContentByFileName
	};
}
function getRouteFilePathsFromModuleIds(moduleIds) {
	let routeFilePaths;
	let seenRouteFilePaths;
	for (const moduleId of moduleIds) {
		const queryIndex = moduleId.indexOf("?");
		if (queryIndex < 0) continue;
		const query = moduleId.slice(queryIndex + 1);
		if (!query.includes("tsr-split")) continue;
		if (!new URLSearchParams(query).has("tsr-split")) continue;
		const routeFilePath = moduleId.slice(0, queryIndex);
		if (seenRouteFilePaths?.has(routeFilePath)) continue;
		if (routeFilePaths === void 0 || seenRouteFilePaths === void 0) {
			routeFilePaths = [];
			seenRouteFilePaths = /* @__PURE__ */ new Set();
		}
		routeFilePaths.push(routeFilePath);
		seenRouteFilePaths.add(routeFilePath);
	}
	return routeFilePaths ?? [];
}
function getHydrationIdsFromModuleIds(moduleIds) {
	let hydrationIds;
	let seen;
	for (const moduleId of moduleIds) {
		const queryIndex = moduleId.indexOf("?");
		if (queryIndex < 0) continue;
		const query = moduleId.slice(queryIndex + 1);
		if (!query.includes("tss-hydrate")) continue;
		const hydrationId = new URLSearchParams(query).get(tssHydrate);
		if (!hydrationId || seen?.has(hydrationId)) continue;
		if (hydrationIds === void 0 || seen === void 0) {
			hydrationIds = [];
			seen = /* @__PURE__ */ new Set();
		}
		hydrationIds.push(hydrationId);
		seen.add(hydrationId);
	}
	return hydrationIds ?? [];
}
function startManifestPlugin(opts) {
	let clientBuild;
	let cssCodeSplitDisabledFileName;
	let devClientRuntime;
	return [{
		name: "tanstack-start:start-manifest-capture-client-build",
		applyToEnvironment(environment) {
			return environment.name === START_ENVIRONMENT_NAMES.client;
		},
		enforce: "post",
		configureServer(server) {
			devClientRuntime = server.environments[START_ENVIRONMENT_NAMES.client].bundledDev ? joinURL(server.config.base, "bundledDevClient.mjs") : void 0;
		},
		generateBundle(_options, bundle) {
			if (this.environment.name !== START_ENVIRONMENT_NAMES.client) throw new Error(`Unexpected environment for client build capture: ${this.environment.name}`);
			clientBuild = normalizeViteClientBuild(bundle, opts.getConfig().startConfig.server.build.inlineCss.enabled);
			cssCodeSplitDisabledFileName = getAssetFileNameByName(bundle, "style.css");
		}
	}, createVirtualModule({
		name: "tanstack-start:start-manifest-plugin",
		moduleId: VIRTUAL_MODULES.startManifest,
		enforce: "pre",
		load() {
			const { resolvedStartConfig, startConfig } = opts.getConfig();
			const clientEntry = getDevClientEntry({
				basePath: resolvedStartConfig.basePaths.publicBase,
				bundledDev: isClientBundledDev(this.environment)
			});
			if (this.environment.name !== START_ENVIRONMENT_NAMES.server) return getEmptyStartManifestModule(clientEntry, devClientRuntime);
			if (this.environment.config.command === "serve") return getEmptyStartManifestModule(clientEntry, devClientRuntime);
			const routeTreeRoutes = globalThis.TSS_ROUTES_MANIFEST;
			if (!clientBuild) return getEmptyStartManifestModule(clientEntry);
			return `export const tsrStartManifest = () => (${serializeStartManifest(buildStartManifest({
				clientBuild,
				routeTreeRoutes,
				basePath: resolvedStartConfig.basePaths.publicBase,
				inlineCss: startConfig.server.build.inlineCss,
				additionalRouteAssets: getViteAdditionalRouteAssets({
					cssCodeSplitDisabledFileName,
					basePath: resolvedStartConfig.basePaths.publicBase,
					cssCodeSplit: this.environment.config.build.cssCodeSplit
				})
			}))})`;
		}
	})];
}
function getViteAdditionalRouteAssets(options) {
	if (options.cssCodeSplit !== false) return;
	if (!options.cssCodeSplitDisabledFileName) throw new Error("TanStack Start could not find Vite's generated `style.css` manifest entry while `build.cssCodeSplit` is disabled");
	return { [rootRouteId]: [joinURL(options.basePath, options.cssCodeSplitDisabledFileName)] };
}
function getAssetFileNameByName(bundle, assetName) {
	for (const fileName in bundle) {
		const bundleEntry = bundle[fileName];
		if (bundleEntry.type !== "asset") continue;
		if (bundleEntry.name === assetName) return fileName;
		if ("names" in bundleEntry && bundleEntry.names.includes(assetName)) return fileName;
	}
}
function getEmptyStartManifestModule(clientEntry, clientRuntime) {
	if (clientRuntime) {
		const entries = [clientRuntime, clientEntry];
		return `export const tsrStartManifest = () => (${serializeStartManifest({ routes: { [rootRouteId]: {
			preloads: entries,
			scripts: entries.map((src) => ({ attrs: {
				type: "module",
				async: false,
				src
			} }))
		} } })})`;
	}
	return `export const tsrStartManifest = () => ({
      routes: {
        __root__: {
          preloads: ['${clientEntry}'],
          scripts: [{ attrs: { type: 'module', async: true, src: '${clientEntry}' } }],
        },
      },
    })`;
}
function getDevClientEntry(opts) {
	if (opts.bundledDev) return joinURL(opts.basePath, "assets", "index.js");
	return joinURL(opts.basePath, "@id", DEV_CLIENT_ENTRY);
}
function isClientBundledDev(environment) {
	return environment.config.command === "serve" && environment.config.environments?.[START_ENVIRONMENT_NAMES.client]?.isBundled === true;
}
/**
* this plugin builds the routes manifest and stores it on globalThis
* so that it can be accessed later (e.g. from a vite plugin)
*/
function routesManifestPlugin() {
	return {
		name: "routes-manifest-plugin",
		onRouteTreeChanged: ({ routeTree, rootRouteNode, routeNodes }) => {
			const allChildren = routeTree.map((d) => d.routePath);
			const routes = {
				[rootRouteId]: {
					filePath: rootRouteNode.fullPath,
					children: allChildren
				},
				...Object.fromEntries(routeNodes.map((d) => {
					return [d.routePath, {
						filePath: d.fullPath,
						children: d.children?.map((childRoute) => childRoute.routePath)
					}];
				}))
			};
			globalThis.TSS_ROUTES_MANIFEST = routes;
		}
	};
}
/**
* this plugin gets the prerenderable paths and stores it on globalThis
* so that it can be accessed later (e.g. from a vite plugin)
*/
function prerenderRoutesPlugin() {
	return {
		name: "prerender-routes-plugin",
		onRouteTreeChanged: ({ routeNodes }) => {
			globalThis.TSS_PRERENDABLE_PATHS = getPrerenderablePaths(routeNodes);
		}
	};
}
function getPrerenderablePaths(routeNodes) {
	const paths = /* @__PURE__ */ new Set(["/"]);
	for (const route of routeNodes) {
		if (!route.routePath) continue;
		if (route.isNonPath === true) continue;
		if (route.routePath.includes("$")) continue;
		if (!route.createFileRouteProps?.has("component")) continue;
		paths.add(inferFullPath(route));
	}
	return Array.from(paths).map((path) => ({ path }));
}
function buildRouteTreeFileFooter(opts) {
	function getImportPath(absolutePath) {
		let relativePath = posix.relative(posix.dirname(opts.generatedRouteTreePath), absolutePath);
		if (!relativePath.startsWith(".")) relativePath = "./" + relativePath;
		return relativePath.split(posix.sep).join("/");
	}
	function appendFooterBlock(lines, block) {
		if (!block) return;
		if (lines.length > 0) {
			lines[lines.length - 1] += `\n${block}`;
			return;
		}
		lines.push(block);
	}
	const footer = [];
	appendFooterBlock(footer, `import type { getRouter } from '${getImportPath(opts.routerFilePath)}'`);
	if (opts.startFilePath) appendFooterBlock(footer, `import type { startInstance } from '${getImportPath(opts.startFilePath)}'`);
	else appendFooterBlock(footer, `import type { createStart } from '@tanstack/${opts.framework}-start'`);
	appendFooterBlock(footer, `declare module '@tanstack/${opts.framework}-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>`);
	if (opts.startFilePath) appendFooterBlock(footer, `    config: Awaited<ReturnType<typeof startInstance.getOptions>>`);
	appendFooterBlock(footer, `  }
}`);
	if (opts.userFooter) footer.push(...Array.isArray(opts.userFooter) ? opts.userFooter : opts.userFooter());
	return footer;
}
function buildRouteTreeFileFooterFromConfig(opts) {
	const { startConfig, resolvedStartConfig } = opts.getConfig();
	return buildRouteTreeFileFooter({
		generatedRouteTreePath: opts.generatedRouteTreePath,
		startFilePath: resolvedStartConfig.startFilePath,
		routerFilePath: resolvedStartConfig.routerFilePath,
		framework: opts.corePluginOpts.framework,
		userFooter: startConfig.router.routeTreeFileFooter
	});
}
function pruneServerOnlySubtrees({ rootRouteNode, acc }) {
	const routeNodes = [];
	const routeTree = prune({
		...rootRouteNode,
		children: acc.routeTree
	}, routeNodes)?.children || [];
	routeNodes.pop();
	return {
		routeTree,
		routeNodes
	};
}
function prune(node, collectedRouteNodes) {
	const newChildren = [];
	let allChildrenServerOnly = true;
	for (const child of node.children || []) {
		const newChild = prune(child, collectedRouteNodes);
		if (newChild) {
			newChildren.push(newChild);
			allChildrenServerOnly = false;
		}
	}
	if (node.createFileRouteProps?.has("server") && node.createFileRouteProps.size === 1 && allChildrenServerOnly) return null;
	collectedRouteNodes.push(node);
	return {
		...node,
		children: newChildren
	};
}
function isServerOnlyNode(node) {
	if (!node?.createFileRouteProps) return false;
	return node.createFileRouteProps.has("server") && node.createFileRouteProps.size === 1;
}
function tanStackStartRouter(startPluginOpts, getConfig, corePluginOpts) {
	const routerPluginContext = createRouterPluginContext();
	const getGeneratedRouteTreePath = () => {
		const { startConfig } = getConfig();
		return posix.resolve(startConfig.router.generatedRouteTree);
	};
	let clientEnvironment = null;
	function invalidate() {
		if (!clientEnvironment) return;
		const mod = clientEnvironment.moduleGraph.getModuleById(getGeneratedRouteTreePath());
		if (mod) clientEnvironment.moduleGraph.invalidateModule(mod);
		clientEnvironment.hot.send({
			type: "full-reload",
			path: "*"
		});
	}
	let generatorInstance = null;
	const clientTreeGeneratorPlugin = {
		name: "start-client-tree-plugin",
		init({ generator }) {
			generatorInstance = generator;
		},
		afterTransform({ node, prevNode }) {
			if (isServerOnlyNode(node) !== isServerOnlyNode(prevNode)) invalidate();
		}
	};
	let routeTreeFileFooter = null;
	function getRouteTreeFileFooter() {
		if (routeTreeFileFooter) return routeTreeFileFooter;
		routeTreeFileFooter = [...buildRouteTreeFileFooterFromConfig({
			generatedRouteTreePath: getGeneratedRouteTreePath(),
			getConfig,
			corePluginOpts
		})];
		return routeTreeFileFooter;
	}
	let resolvedGeneratedRouteTreePath = null;
	const clientTreePlugin = {
		name: "tanstack-start:route-tree-client-plugin",
		enforce: "pre",
		applyToEnvironment: (env) => env.name === VITE_ENVIRONMENT_NAMES.client,
		configureServer(server) {
			clientEnvironment = server.environments[VITE_ENVIRONMENT_NAMES.client];
		},
		config() {
			resolvedGeneratedRouteTreePath = normalizePath(getGeneratedRouteTreePath());
			clientTreePlugin.load.filter = { id: { include: new RegExp(resolvedGeneratedRouteTreePath) } };
		},
		load: {
			filter: {},
			async handler() {
				if (!generatorInstance) throw new Error("Generator instance not initialized");
				const crawlingResult = await generatorInstance.getCrawlingResult();
				if (!crawlingResult) throw new Error("Crawling result not available");
				const prunedAcc = pruneServerOnlySubtrees(crawlingResult);
				const acc = {
					...crawlingResult.acc,
					...prunedAcc
				};
				return {
					code: generatorInstance.buildRouteTree({
						...crawlingResult,
						acc,
						config: {
							disableTypes: true,
							enableRouteTreeFormatting: false,
							routeTreeFileHeader: [],
							routeTreeFileFooter: []
						}
					}).routeTreeContent,
					map: null
				};
			}
		}
	};
	return [
		clientTreePlugin,
		tanstackRouterGenerator(() => {
			const routerConfig = getConfig().startConfig.router;
			const plugins = [clientTreeGeneratorPlugin, routesManifestPlugin()];
			if (startPluginOpts.prerender?.enabled === true) plugins.push(prerenderRoutesPlugin());
			return {
				...routerConfig,
				target: corePluginOpts.framework,
				routeTreeFileFooter: getRouteTreeFileFooter,
				plugins
			};
		}, routerPluginContext),
		tanStackRouterCodeSplitter(() => {
			const routerConfig = getConfig().startConfig.router;
			return {
				...routerConfig,
				codeSplittingOptions: {
					...routerConfig.codeSplittingOptions,
					deleteNodes: [
						"ssr",
						"server",
						"headers"
					],
					addHmr: true
				},
				plugin: { vite: { environmentName: VITE_ENVIRONMENT_NAMES.client } }
			};
		}, routerPluginContext),
		tanStackRouterCodeSplitter(() => {
			const routerConfig = getConfig().startConfig.router;
			return {
				...routerConfig,
				codeSplittingOptions: {
					...routerConfig.codeSplittingOptions,
					addHmr: false
				},
				plugin: { vite: { environmentName: VITE_ENVIRONMENT_NAMES.server } }
			};
		}, routerPluginContext)
	];
}
async function postBuild({ startConfig, adapter }) {
	if (startConfig.prerender?.enabled !== false) startConfig.prerender = {
		...startConfig.prerender,
		enabled: startConfig.prerender?.enabled ?? startConfig.pages.some((d) => typeof d === "string" ? false : !!d.prerender?.enabled)
	};
	if (startConfig.spa?.enabled) {
		startConfig.prerender = {
			...startConfig.prerender,
			enabled: true
		};
		const maskUrl = new URL(startConfig.spa.maskPath, "http://localhost");
		if (maskUrl.origin !== "http://localhost") throw new Error("spa.maskPath must be a path (no protocol/host)");
		startConfig.pages.push({
			path: maskUrl.toString().replace("http://localhost", ""),
			prerender: {
				...startConfig.spa.prerender,
				headers: {
					...startConfig.spa.prerender.headers,
					[HEADERS.TSS_SHELL]: "true"
				}
			},
			sitemap: { exclude: true }
		});
	}
	if (startConfig.prerender.enabled) await adapter.prerender(startConfig);
	if (startConfig.sitemap?.enabled) {
		const { buildSitemap } = await import("./build-sitemap-CA91J2ui.mjs");
		buildSitemap({
			startConfig,
			publicDir: adapter.getClientOutputDirectory()
		});
	}
}
var defaultConfig = {
	concurrency: 5,
	started: false,
	tasks: []
};
var Queue = class {
	onSettles = [];
	onErrors = [];
	onSuccesses = [];
	running;
	active = [];
	pending;
	currentConcurrency;
	constructor(config = defaultConfig) {
		const { concurrency, started, tasks } = {
			...defaultConfig,
			...config
		};
		this.running = started;
		this.pending = tasks;
		this.currentConcurrency = concurrency;
	}
	tick() {
		if (!this.running) return;
		while (this.active.length < this.currentConcurrency && this.pending.length) {
			const nextFn = this.pending.shift();
			if (!nextFn) throw new Error("Found task that is not a function");
			this.active.push(nextFn);
			(async () => {
				let success = false;
				let res;
				let error;
				try {
					res = await nextFn();
					success = true;
				} catch (e) {
					error = e;
				}
				this.active = this.active.filter((d) => d !== nextFn);
				if (success) this.onSuccesses.forEach((d) => d(res, nextFn));
				else this.onErrors.forEach((d) => d(error, nextFn));
				this.onSettles.forEach((d) => d(res, error));
				this.tick();
			})();
		}
	}
	add(fn, { priority } = {}) {
		return new Promise((resolve, reject) => {
			const task = () => Promise.resolve(fn()).then((res) => {
				resolve(res);
				return res;
			}).catch((err) => {
				reject(err);
				throw err;
			});
			if (priority) this.pending.unshift(task);
			else this.pending.push(task);
			this.tick();
		});
	}
	throttle(n) {
		this.currentConcurrency = n;
	}
	onSettled(cb) {
		this.onSettles.push(cb);
		return () => {
			this.onSettles = this.onSettles.filter((d) => d !== cb);
		};
	}
	onError(cb) {
		this.onErrors.push(cb);
		return () => {
			this.onErrors = this.onErrors.filter((d) => d !== cb);
		};
	}
	onSuccess(cb) {
		this.onSuccesses.push(cb);
		return () => {
			this.onSuccesses = this.onSuccesses.filter((d) => d !== cb);
		};
	}
	stop() {
		this.running = false;
	}
	start() {
		this.running = true;
		this.tick();
		return new Promise((resolve) => {
			this.onSettled(() => {
				if (this.isSettled()) resolve();
			});
		});
	}
	clear() {
		this.pending = [];
	}
	getActive() {
		return this.active;
	}
	getPending() {
		return this.pending;
	}
	getAll() {
		return [...this.active, ...this.pending];
	}
	isRunning() {
		return this.running;
	}
	isSettled() {
		return !this.active.length && !this.pending.length;
	}
};
var DEFAULT_RETRY_DELAY = 500;
async function prerender({ startConfig, handler }) {
	const logger = createLogger("prerender");
	logger.info("Prerendering pages...");
	if (startConfig.prerender?.enabled) {
		let pages = startConfig.pages.length ? startConfig.pages : [{ path: "/" }];
		if (startConfig.prerender.autoStaticPathsDiscovery ?? true) {
			const pagesMap = new Map(pages.map((item) => [item.path, item]));
			const discoveredPages = globalThis.TSS_PRERENDABLE_PATHS || [];
			for (const page of discoveredPages) if (!pagesMap.has(page.path)) pagesMap.set(page.path, page);
			pages = Array.from(pagesMap.values());
		}
		startConfig.pages = pages;
	}
	const routerBasePath = joinURL("/", startConfig.router.basepath ?? "");
	const routerBaseUrl = new URL(routerBasePath, handler.getOrigin?.() ?? "http://localhost");
	startConfig.pages = validateAndNormalizePrerenderPages(startConfig.pages, routerBaseUrl);
	try {
		const pages = await prerenderPages({ outputDir: handler.getClientOutputDirectory() });
		logger.info(`Prerendered ${pages.length} pages:`);
		pages.forEach((page) => {
			logger.info(`- ${page}`);
		});
	} catch (error) {
		logger.error(error);
		throw error;
	} finally {
		await handler.close?.();
	}
	function extractLinks(html) {
		const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;
		const links = [];
		let match;
		while ((match = linkRegex.exec(html)) !== null) {
			const href = match[1];
			if (href && (href.startsWith("/") || href.startsWith("./"))) links.push(href);
		}
		return links;
	}
	async function prerenderPages({ outputDir }) {
		const seen = /* @__PURE__ */ new Set();
		const prerendered = /* @__PURE__ */ new Set();
		const retriesByPath = /* @__PURE__ */ new Map();
		const concurrency = startConfig.prerender?.concurrency ?? os.cpus().length;
		logger.info(`Concurrency: ${concurrency}`);
		const queue = new Queue({ concurrency });
		startConfig.pages = validateAndNormalizePrerenderPages(startConfig.pages, routerBaseUrl);
		startConfig.pages.forEach((page) => addCrawlPageTask(page));
		if (queue.isSettled()) {
			logger.info("No pages matched prerender filter; skipping.");
			return Array.from(prerendered);
		}
		await queue.start();
		return Array.from(prerendered);
		function addCrawlPageTask(page) {
			if (seen.has(page.path)) return;
			seen.add(page.path);
			if (page.fromCrawl) startConfig.pages.push(page);
			if (!(page.prerender?.enabled ?? true)) return;
			if (startConfig.prerender?.filter && !startConfig.prerender.filter(page)) return;
			const prerenderOptions = {
				...startConfig.prerender,
				...page.prerender
			};
			queue.add(async () => {
				logger.info(`Crawling: ${page.path}`);
				const retries = retriesByPath.get(page.path) || 0;
				try {
					const res = await requestWithRedirects(withTrailingSlash(withBase(page.path, routerBasePath)), { headers: { ...prerenderOptions.headers ?? {} } }, prerenderOptions.maxRedirects);
					if (!res.ok) {
						if (isRedirectResponse(res)) logger.warn(`Max redirects reached for ${page.path}`);
						throw new Error(`Failed to fetch ${page.path}: ${res.statusText}`, { cause: res });
					}
					const cleanPagePath = (prerenderOptions.outputPath || page.path).split(/[?#]/)[0];
					const contentType = res.headers.get("content-type") || "";
					const isImplicitHTML = !cleanPagePath.endsWith(".html") && contentType.includes("html");
					const routeWithIndex = cleanPagePath.endsWith("/") ? cleanPagePath + "index" : cleanPagePath;
					const isSpaShell = startConfig.spa?.prerender.outputPath === cleanPagePath;
					let htmlPath;
					if (isSpaShell) htmlPath = cleanPagePath + ".html";
					else if (cleanPagePath.endsWith("/") || (prerenderOptions.autoSubfolderIndex ?? true)) htmlPath = joinURL(cleanPagePath, "index.html");
					else htmlPath = cleanPagePath + ".html";
					const filename = withoutBase(isImplicitHTML ? htmlPath : routeWithIndex, routerBasePath);
					const html = await res.text();
					const resolvedOutputDir = posix.resolve(outputDir);
					const filepath = posix.resolve(outputDir, filename.replace(/^\/+/, ""));
					const outputPrefix = resolvedOutputDir.endsWith(posix.sep) ? resolvedOutputDir : resolvedOutputDir + posix.sep;
					if (filepath !== resolvedOutputDir && !filepath.startsWith(outputPrefix)) throw new Error(`Prerender output path must stay within the client output directory: ${filename}`);
					await promises.mkdir(posix.dirname(filepath), { recursive: true });
					await promises.writeFile(filepath, html);
					prerendered.add(page.path);
					const newPage = await prerenderOptions.onSuccess?.({
						page,
						html
					});
					if (newPage) Object.assign(page, newPage);
					if (prerenderOptions.crawlLinks ?? true) {
						const links = extractLinks(html);
						for (const link of links) addCrawlPageTask({
							path: link,
							fromCrawl: true
						});
					}
				} catch (error) {
					if (retries < (prerenderOptions.retryCount ?? 0)) {
						const retryDelay = normalizeRetryDelay(prerenderOptions.retryDelay);
						logger.warn(`Encountered error, retrying: ${page.path} in ${retryDelay}ms`);
						await new Promise((resolve) => setTimeout(resolve, retryDelay));
						retriesByPath.set(page.path, retries + 1);
						addCrawlPageTask(page);
					} else if (prerenderOptions.failOnError ?? true) throw error;
				}
			});
		}
	}
	function normalizeRetryDelay(value) {
		const retryDelay = Number(value);
		if (!Number.isFinite(retryDelay) || retryDelay < 0) return DEFAULT_RETRY_DELAY;
		return Math.trunc(retryDelay);
	}
	async function requestWithRedirects(requestPath, options, maxRedirects = 5, currentUrl = resolveInternalUrl(requestPath, routerBaseUrl, routerBaseUrl)) {
		const path = currentUrl && toPreviewPath(currentUrl, routerBaseUrl);
		if (!path) throw new Error(`Prerender request path must be relative: ${requestPath}`);
		const response = await handler.request(path, {
			...options,
			redirect: "manual"
		});
		if (isRedirectResponse(response) && maxRedirects > 0) {
			const location = response.headers.get("location").trim();
			const url = resolveInternalUrl(location, currentUrl, routerBaseUrl);
			const redirectPath = url && toPreviewPath(url, routerBaseUrl);
			if (url && redirectPath) return requestWithRedirects(redirectPath, options, maxRedirects - 1, url);
			logger.warn(`Skipping redirect outside the preview basepath: ${location}`);
		}
		return response;
	}
}
function isRedirectResponse(res) {
	return [
		301,
		302,
		303,
		307,
		308
	].includes(res.status) && !!res.headers.get("location")?.trim();
}
function resolveInternalUrl(href, baseUrl, allowedOrigin) {
	try {
		const url = new URL(href, baseUrl);
		if (url.protocol !== allowedOrigin.protocol || url.origin !== allowedOrigin.origin || url.username || url.password) return;
		return url;
	} catch {
		return;
	}
}
function toPreviewPath(url, routerBaseUrl) {
	const basepath = routerBaseUrl.pathname.replace(/\/$/, "");
	if (basepath && url.pathname !== basepath && !url.pathname.startsWith(basepath + "/")) return;
	if (url.pathname.startsWith("//")) return url.href;
	return url.pathname + url.search;
}
function validateAndNormalizePrerenderPages(pages, routerBaseUrl) {
	return pages.map((page) => {
		let url;
		try {
			url = new URL(page.path, routerBaseUrl);
		} catch (err) {
			throw new Error(`prerender page path must be relative: ${page.path}`, { cause: err });
		}
		if (url.protocol !== routerBaseUrl.protocol || url.origin !== routerBaseUrl.origin || url.username || url.password) throw new Error(`prerender page path must be relative: ${page.path}`);
		const normalizedPath = decodeURIComponent(url.pathname) + url.search + url.hash;
		if (!resolveInternalUrl(normalizedPath, routerBaseUrl, routerBaseUrl)) throw new Error(`prerender page path must be relative: ${page.path}`);
		return {
			...page,
			path: normalizedPath
		};
	});
}
async function prerenderWithVite({ startConfig, builder }) {
	const serverEnv = builder.environments[VITE_ENVIRONMENT_NAMES.server];
	if (!serverEnv) throw new Error(`Vite's "${VITE_ENVIRONMENT_NAMES.server}" environment not found`);
	const clientEnv = builder.environments[VITE_ENVIRONMENT_NAMES.client];
	if (!clientEnv) throw new Error(`Vite's "${VITE_ENVIRONMENT_NAMES.client}" environment not found`);
	const outputDir = clientEnv.config.build.outDir;
	process.env.TSS_PRERENDERING = "true";
	process.env.TSS_CLIENT_OUTPUT_DIR = outputDir;
	const previewServer = await startPreviewServer(serverEnv.config);
	const baseUrl = getResolvedUrl(previewServer);
	return prerender({
		startConfig,
		handler: {
			getClientOutputDirectory() {
				return outputDir;
			},
			getOrigin() {
				return baseUrl.origin;
			},
			request(path, options) {
				const url = new URL(path, baseUrl);
				if (url.origin !== baseUrl.origin) throw new Error(`Prerender request URL must be relative: ${path}`);
				return fetch(new Request(url, options));
			},
			close() {
				return previewServer.close();
			}
		}
	});
}
async function startPreviewServer(viteConfig) {
	const vite = await import("vite");
	try {
		return await vite.preview({
			configFile: viteConfig.configFile,
			preview: {
				port: 0,
				open: false
			}
		});
	} catch (error) {
		throw new Error("Failed to start the Vite preview server for prerendering", { cause: error });
	}
}
function getResolvedUrl(previewServer) {
	const baseUrl = previewServer.resolvedUrls?.local[0];
	if (!baseUrl) throw new Error("No resolved URL is available from the Vite preview server");
	return new URL(baseUrl);
}
async function postServerBuild({ builder, startConfig }) {
	await postBuild({
		startConfig,
		adapter: {
			getClientOutputDirectory() {
				return getClientOutputDirectory(builder.config);
			},
			prerender(startConfig) {
				return prerenderWithVite({
					startConfig,
					builder
				});
			}
		}
	});
}
var EMPTY_SERIALIZATION_ADAPTERS_MODULE = `export const pluginSerializationAdapters = []
export const hasPluginAdapters = false`;
function resolveSerializationAdaptersForRuntime(opts) {
	if (!opts.adapters?.length) return [];
	const resolvedAdapters = [];
	for (let i = 0; i < opts.adapters.length; i++) {
		const adapter = opts.adapters[i];
		if ("module" in adapter) {
			resolvedAdapters.push({
				module: adapter.module,
				export: adapter.export,
				isFactory: adapter.isFactory ?? true,
				index: i
			});
			continue;
		}
		const runtimeAdapter = opts.runtime === "client" ? adapter.client : adapter.server;
		if (!runtimeAdapter) continue;
		resolvedAdapters.push({
			module: runtimeAdapter.module,
			export: runtimeAdapter.export,
			isFactory: runtimeAdapter.isFactory ?? true,
			index: i
		});
	}
	return resolvedAdapters;
}
function generateSerializationAdaptersModule(opts) {
	const resolvedAdapters = resolveSerializationAdaptersForRuntime(opts);
	if (resolvedAdapters.length === 0) return EMPTY_SERIALIZATION_ADAPTERS_MODULE;
	return `${resolvedAdapters.map((adapter) => `import { ${adapter.export} as adapter${adapter.index} } from '${adapter.module}'`).join("\n")}
export const pluginSerializationAdapters = [${resolvedAdapters.map((adapter) => adapter.isFactory ? `...(Array.isArray(adapter${adapter.index}()) ? adapter${adapter.index}() : [adapter${adapter.index}()])` : `adapter${adapter.index}`).join(", ")}]
export const hasPluginAdapters = true`;
}
var CLIENT_MODULE_ID = "virtual:tanstack-start-plugin-adapters/client";
var SERVER_MODULE_ID = "virtual:tanstack-start-plugin-adapters/server";
var BUILD_CLIENT_MODULE_ID = `\0${CLIENT_MODULE_ID}`;
var BUILD_SERVER_MODULE_ID = `\0${SERVER_MODULE_ID}`;
var MODULE_IDS = [
	CLIENT_MODULE_ID,
	SERVER_MODULE_ID,
	BUILD_CLIENT_MODULE_ID,
	BUILD_SERVER_MODULE_ID
];
var moduleIdFilter = createIdFilter(MODULE_IDS);
var resolveIdFilter = createIdFilter([VIRTUAL_MODULES.pluginAdapters, ...MODULE_IDS]);
function serializationAdaptersPlugin(opts) {
	return {
		name: "tanstack-start:plugin-adapters",
		enforce: "pre",
		resolveId: {
			filter: { id: resolveIdFilter },
			handler(id) {
				if (getRuntime(id)) return id;
				if (id !== VIRTUAL_MODULES.pluginAdapters) return;
				return getModuleId(this.environment.name === START_ENVIRONMENT_NAMES.client ? "client" : "server", this.environment.config.command);
			}
		},
		load: {
			filter: { id: moduleIdFilter },
			handler(id) {
				const runtime = getRuntime(id);
				if (!runtime) return;
				return generateSerializationAdaptersModule({
					adapters: opts.adapters,
					runtime
				});
			}
		}
	};
}
function getModuleId(runtime, command) {
	if (runtime === "client") return command === "serve" ? CLIENT_MODULE_ID : BUILD_CLIENT_MODULE_ID;
	return command === "serve" ? SERVER_MODULE_ID : BUILD_SERVER_MODULE_ID;
}
function getRuntime(id) {
	switch (id) {
		case CLIENT_MODULE_ID:
		case BUILD_CLIENT_MODULE_ID: return "client";
		case SERVER_MODULE_ID:
		case BUILD_SERVER_MODULE_ID: return "server";
		default: return;
	}
}
function tanStackStartVite(corePluginOpts, startPluginOpts) {
	const normalizedStartPluginOpts = startPluginOpts ?? {};
	const configContext = createStartConfigContext({
		corePluginOpts,
		startPluginOpts: normalizedStartPluginOpts,
		parseConfig: parseStartConfig
	});
	const { getConfig, resolvedStartConfig } = configContext;
	const serverFnProviderEnv = corePluginOpts.providerEnvironmentName;
	const ssrIsProvider = corePluginOpts.ssrIsProvider;
	let needsDevBaseRewrite = false;
	const environments = [{
		name: START_ENVIRONMENT_NAMES.client,
		type: "client"
	}, {
		name: START_ENVIRONMENT_NAMES.server,
		type: "server",
		getServerFnById: corePluginOpts.ssrResolverStrategy.type === "vite-rsc-forward" ? createViteRscForwarder(corePluginOpts.ssrResolverStrategy) : void 0
	}];
	if (serverFnProviderEnv !== START_ENVIRONMENT_NAMES.server && !environments.find((e) => e.name === serverFnProviderEnv)) environments.push({
		name: serverFnProviderEnv,
		type: "server"
	});
	return [
		{
			name: "tanstack-start-core:config",
			enforce: "pre",
			async config(viteConfig, { command }) {
				const publicBase = normalizePublicBase(viteConfig.base);
				applyResolvedBaseAndOutput({
					resolvedStartConfig,
					root: viteConfig.root || process.cwd(),
					publicBase,
					clientOutputDirectory: getClientOutputDirectory(viteConfig),
					serverOutputDirectory: getServerOutputDirectory(viteConfig)
				});
				const { startConfig } = getConfig();
				const routerBasepath = applyResolvedRouterBasepath({
					resolvedStartConfig,
					startConfig
				});
				if (shouldRewriteDevBasepath({
					command,
					middlewareMode: Boolean(viteConfig.server?.middlewareMode),
					routerBasepath,
					publicBase: resolvedStartConfig.basePaths.publicBase
				})) needsDevBaseRewrite = true;
				const TSS_SERVER_FN_BASE = createServerFnBasePath({
					routerBasepath,
					serverFnBase: startConfig.serverFns.base
				});
				const entryAliases = createViteResolvedEntryAliases({ entryPaths: configContext.resolveEntries().entryPaths });
				const startPackageName = `@tanstack/${corePluginOpts.framework}-start`;
				const crawlFrameworkPkgsResult = await crawlFrameworkPkgs({
					root: process.cwd(),
					isBuild: command === "build",
					isFrameworkPkgByJson(pkgJson) {
						const peerDependencies = pkgJson["peerDependencies"];
						if (peerDependencies) {
							if (startPackageName in peerDependencies || "@tanstack/start-client-core" in peerDependencies) return true;
						}
						return false;
					}
				});
				const viteConfigPlan = createViteConfigPlan({
					viteConfig,
					command,
					framework: corePluginOpts.framework,
					entryAliases,
					clientOutputDirectory: resolvedStartConfig.outputDirectories.client,
					serverOutputDirectory: resolvedStartConfig.outputDirectories.server,
					serverFnProviderEnv,
					optimizeDepsExclude: crawlFrameworkPkgsResult.optimizeDeps.exclude,
					noExternal: crawlFrameworkPkgsResult.ssr.noExternal.sort()
				});
				return {
					appType: viteConfig.appType ?? "custom",
					environments: viteConfigPlan.environments,
					resolve: viteConfigPlan.resolve,
					define: createViteDefineConfig({
						command,
						mode: viteConfig.mode,
						serverFnBase: TSS_SERVER_FN_BASE,
						routerBasepath,
						spaEnabled: startConfig.spa?.enabled,
						devSsrStylesEnabled: startConfig.dev.ssrStyles.enabled,
						devSsrStylesBasepath: startConfig.dev.ssrStyles.basepath ?? resolvedStartConfig.basePaths.publicBase,
						inlineCssEnabled: command === "build" && startConfig.server.build.inlineCss.enabled,
						staticNodeEnv: startConfig.server.build.staticNodeEnv,
						disableCsrfMiddlewareWarning: startConfig.serverFns.disableCsrfMiddlewareWarning
					}),
					builder: {
						sharedPlugins: true,
						async buildApp(builder) {
							await buildStartViteEnvironments({
								builder,
								providerEnvironmentName: serverFnProviderEnv,
								ssrIsProvider
							});
						}
					}
				};
			}
		},
		createPostBuildPlugin({
			getConfig,
			postServerBuild
		}),
		startCompilerPlugin({
			framework: corePluginOpts.framework,
			environments,
			generateFunctionId: normalizedStartPluginOpts.serverFns?.generateFunctionId,
			compilerTransforms: corePluginOpts.compilerTransforms,
			serverFnProviderModuleDirectives: corePluginOpts.serverFnProviderModuleDirectives,
			providerEnvName: serverFnProviderEnv
		}),
		importProtectionPlugin({
			getConfig,
			framework: corePluginOpts.framework,
			environments,
			providerEnvName: serverFnProviderEnv
		}),
		tanStackStartRouter(normalizedStartPluginOpts, getConfig, corePluginOpts),
		loadEnvPlugin(),
		createDevClientEntryPlugin({
			framework: corePluginOpts.framework,
			getClientEntry: () => configContext.resolveEntries().entryPaths.client
		}),
		startManifestPlugin({ getConfig }),
		createDevBaseRewritePlugin({
			shouldRewriteDevBase: () => needsDevBaseRewrite,
			resolvedStartConfig
		}),
		devServerPlugin({
			getConfig,
			devSsrStylesEnabled: normalizedStartPluginOpts.dev?.ssrStyles?.enabled ?? true,
			installDevServerMiddleware: normalizedStartPluginOpts.vite?.installDevServerMiddleware
		}),
		previewServerPlugin(),
		...corePluginOpts.serializationAdapters?.length ? [serializationAdaptersPlugin({ adapters: corePluginOpts.serializationAdapters })] : []
	];
}
function createViteRscForwarder(strategy) {
	return `export async function getServerFnById(id, access) {
  const m = await import.meta.viteRsc.loadModule(${JSON.stringify(strategy.sourceEnvironmentName)}, ${JSON.stringify(strategy.sourceEntry)})
  return m[${JSON.stringify(strategy.exportName)}](id, access)
}`;
}
var TSS_SERVERFN_SPLIT_PARAM = "tss-serverfn-split";
var RSC_CSS_OPTIONS_KEY = "__tanstackStartRscCss";
function createRscCssCompilerTransforms(opts) {
	let loadCssExpression;
	const getLoadCssExpression = (context) => {
		loadCssExpression ??= context.parseExpression(opts.loadCssExpression);
		return loadCssExpression;
	};
	return [
		createRscCssCompilerTransform({
			serverFnProviderOnly: opts.serverFnProviderOnly,
			getLoadCssExpression,
			kind: "renderServerComponent",
			name: "react-rsc-render-server-component-css"
		}),
		createRscCssCompilerTransform({
			serverFnProviderOnly: opts.serverFnProviderOnly,
			getLoadCssExpression,
			kind: "createCompositeComponent",
			name: "react-rsc-create-composite-component-css"
		}),
		createRscCssCompilerTransform({
			serverFnProviderOnly: opts.serverFnProviderOnly,
			getLoadCssExpression,
			kind: "renderToReadableStream",
			name: "react-rsc-render-to-readable-stream-css"
		})
	];
}
function createRscCssCompilerTransform(opts) {
	return {
		name: opts.name,
		environment: "server",
		imports: [{
			libName: "@tanstack/react-start/rsc",
			rootExport: opts.kind
		}, {
			libName: "@tanstack/react-start-rsc",
			rootExport: opts.kind
		}],
		detect: new RegExp(`\\b${opts.kind}\\b`),
		transform: (candidates, context) => {
			if (opts.serverFnProviderOnly && !context.id.includes(TSS_SERVERFN_SPLIT_PARAM)) return;
			const t = context.types;
			const loadCssExpression = opts.getLoadCssExpression(context);
			const cloneLoadCssExpression = () => t.cloneNode(loadCssExpression);
			for (const candidate of candidates) {
				const args = candidate.path.node.arguments;
				if (args.length !== 1) continue;
				if (opts.kind === "renderToReadableStream") {
					const firstArg = args[0];
					if (!firstArg || !t.isExpression(firstArg)) continue;
					if (!isTopLevelJsx(t, firstArg)) continue;
					args[0] = createCssFragment(t, firstArg, cloneLoadCssExpression());
					continue;
				}
				args.push(t.objectExpression([t.objectProperty(t.identifier(RSC_CSS_OPTIONS_KEY), cloneLoadCssExpression())]));
			}
		}
	};
}
function isTopLevelJsx(t, expr) {
	const unwrapped = unwrapTransparentExpression(t, expr);
	return t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped);
}
function unwrapTransparentExpression(t, expr) {
	let current = expr;
	while (t.isParenthesizedExpression(current) || t.isTSAsExpression(current) || t.isTSSatisfiesExpression(current) || t.isTSTypeAssertion(current) || t.isTSNonNullExpression(current)) current = current.expression;
	return current;
}
function createCssFragment(t, original, loadCssExpression) {
	const unwrapped = unwrapTransparentExpression(t, original);
	return t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), [t.jsxExpressionContainer(loadCssExpression), t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped) ? unwrapped : t.jsxExpressionContainer(original)]);
}
var isClientEnvironment = (env) => env.config.consumer === "client";
var RSC_HMR_VIRTUAL_ID = "virtual:tanstack-rsc-hmr";
var RSC_RUNTIME_VIRTUAL_ID = "virtual:tanstack-rsc-runtime";
var RSC_BROWSER_DECODE_VIRTUAL_ID = "virtual:tanstack-rsc-browser-decode";
var RSC_SSR_DECODE_VIRTUAL_ID = "virtual:tanstack-rsc-ssr-decode";
var RSC_ENV_NAME = "rsc";
var currentDir = posix.dirname(fileURLToPath(import.meta.url));
var entryDir = posix.resolve(currentDir, "..", "..", "plugin", "entry");
var rscEntryPath = posix.resolve(entryDir, "rsc.tsx");
function configureRsc() {
	return {
		envName: RSC_ENV_NAME,
		providerEnvironmentName: RSC_ENV_NAME,
		ssrResolverStrategy: {
			type: "vite-rsc-forward",
			sourceEnvironmentName: RSC_ENV_NAME,
			sourceEntry: "index",
			exportName: "getServerFnById"
		},
		serializationAdapters: [{
			client: {
				module: "@tanstack/react-start/rsc/serialization/client",
				export: "rscSerializationAdapter",
				isFactory: true
			},
			server: {
				module: "@tanstack/react-start/rsc/serialization/server",
				export: "rscSerializationAdapter",
				isFactory: true
			}
		}],
		compilerTransforms: createRscCssCompilerTransforms({ loadCssExpression: "import.meta.viteRsc.loadCss()" })
	};
}
function reactStartRscVitePlugin() {
	return [
		{
			name: "tanstack-react-start:rsc-ssr-config",
			config() {
				return { ssr: { noExternal: true } };
			}
		},
		{
			name: "tanstack-react-start:rsc-env-config",
			config() {
				return {
					rsc: {
						serverHandler: false,
						cssLinkPrecedence: false
					},
					environments: { [RSC_ENV_NAME]: {
						consumer: "server",
						resolve: { noExternal: [
							"@tanstack/start**",
							"@tanstack/react-start",
							"@tanstack/react-start-rsc",
							"@tanstack/react-router"
						] },
						build: { rolldownOptions: { input: { index: rscEntryPath } } }
					} }
				};
			}
		},
		{
			name: "tanstack-react-start:rsc-scan-virtual-fallback",
			apply: "build",
			applyToEnvironment(env) {
				return env.name === RSC_ENV_NAME;
			},
			load: {
				filter: { id: /^(virtual:tanstack-rsc-runtime|virtual:vite-rsc\/encryption-key)$/ },
				handler(id) {
					if (this.environment.config.build.write !== false) return;
					if (id === RSC_RUNTIME_VIRTUAL_ID) return `export { renderToReadableStream, createFromReadableStream, createTemporaryReferenceSet, decodeReply, loadServerAction, decodeAction, decodeFormState } from '@vitejs/plugin-rsc/rsc'`;
					if (id === "virtual:vite-rsc/encryption-key") return `export default () => ''`;
				}
			}
		},
		createVirtualModule({
			name: "tanstack-react-start:rsc-runtime-virtual",
			moduleId: RSC_RUNTIME_VIRTUAL_ID,
			load() {
				if (this.environment.name === RSC_ENV_NAME) return `export { renderToReadableStream, createFromReadableStream, createTemporaryReferenceSet, decodeReply, loadServerAction, decodeAction, decodeFormState } from '@vitejs/plugin-rsc/rsc'`;
				return `
export function renderToReadableStream() { throw new Error('renderToReadableStream can only be used in RSC environment'); }
export function createFromReadableStream() { throw new Error('createFromReadableStream can only be used in RSC environment'); }
export function createTemporaryReferenceSet() { throw new Error('createTemporaryReferenceSet can only be used in RSC environment'); }
export function decodeReply() { throw new Error('decodeReply can only be used in RSC environment'); }
export function loadServerAction() { throw new Error('loadServerAction can only be used in RSC environment'); }
export function decodeAction() { throw new Error('decodeAction can only be used in RSC environment'); }
export function decodeFormState() { throw new Error('decodeFormState can only be used in RSC environment'); }
`;
			}
		}),
		createVirtualModule({
			name: "tanstack-react-start:rsc-browser-decode-virtual",
			moduleId: RSC_BROWSER_DECODE_VIRTUAL_ID,
			load() {
				return `export { createFromReadableStream, createFromFetch } from '@vitejs/plugin-rsc/browser'`;
			}
		}),
		createVirtualModule({
			name: "tanstack-react-start:rsc-ssr-decode-virtual",
			moduleId: RSC_SSR_DECODE_VIRTUAL_ID,
			load() {
				return `export { setOnClientReference, createFromReadableStream } from '@vitejs/plugin-rsc/ssr'`;
			}
		}),
		createVirtualModule({
			name: "tanstack-react-start:rsc-hmr-virtual:dev",
			moduleId: RSC_HMR_VIRTUAL_ID,
			apply: "serve",
			applyToEnvironment: isClientEnvironment,
			load() {
				return `
export function setupRscHmr() {
if (!import.meta.hot) {
  return
}

  let __invalidateQueued = false

  function __queueInvalidate() {
    if (__invalidateQueued) return
    __invalidateQueued = true
    queueMicrotask(async () => {
        __invalidateQueued = false
        try {
        const router = window.__TSR_ROUTER__
        if (!router) {
            console.warn('[rsc:hmr] No router found on window.__TSR_ROUTER__')
            return
        }
        await router.invalidate()
        } catch (e) {
        console.warn('[rsc:hmr] Failed to invalidate router:', e)
        }
    })
  }

  import.meta.hot.on('rsc:update', () => {
    __queueInvalidate()
  })
}
`;
			}
		}),
		createVirtualModule({
			name: "tanstack-react-start:rsc-hmr-virtual:prod",
			moduleId: RSC_HMR_VIRTUAL_ID,
			applyToEnvironment: isClientEnvironment,
			apply: "build",
			load() {
				return "export function setupRscHmr() {} ";
			}
		})
	];
}
var isInsideRouterMonoRepo = posix.basename(posix.resolve(reactStartPluginDir, "../../../../")) === "packages";
function tanstackStart(options) {
	const rscConfig = options?.rsc?.enabled ?? false ? configureRsc() : void 0;
	let corePluginOpts = {
		framework: "react",
		defaultEntryPaths: reactStartDefaultEntryPaths,
		providerEnvironmentName: START_ENVIRONMENT_NAMES.server,
		ssrIsProvider: true,
		ssrResolverStrategy: { type: "default" }
	};
	const serverEnvironments = [START_ENVIRONMENT_NAMES.server, ...rscConfig ? [rscConfig.envName] : []];
	if (rscConfig) corePluginOpts = {
		...corePluginOpts,
		providerEnvironmentName: rscConfig.providerEnvironmentName,
		ssrIsProvider: false,
		ssrResolverStrategy: rscConfig.ssrResolverStrategy,
		serializationAdapters: rscConfig.serializationAdapters,
		compilerTransforms: rscConfig.compilerTransforms
	};
	return [
		{
			name: "tanstack-react-start:config",
			configEnvironment(environmentName, options) {
				const needsOptimizeDeps = environmentName === START_ENVIRONMENT_NAMES.client || serverEnvironments.includes(environmentName) && options.optimizeDeps?.noDiscovery === false;
				const reactRouterInNoExternal = Array.isArray(options.resolve?.noExternal) && options.resolve.noExternal.some((pattern) => pattern === "@tanstack/react-router" || typeof pattern === "string" && pattern.includes("react-router"));
				return {
					resolve: {
						dedupe: [
							"react",
							"react-dom",
							"@tanstack/react-start",
							"@tanstack/react-router"
						],
						external: options.resolve?.noExternal === true || !isInsideRouterMonoRepo || reactRouterInNoExternal ? void 0 : ["@tanstack/react-router", "@tanstack/react-router-devtools"]
					},
					optimizeDeps: needsOptimizeDeps ? {
						exclude: [
							"@tanstack/react-start",
							"@tanstack/react-router",
							"@tanstack/react-router-devtools",
							"@tanstack/start-static-server-functions"
						],
						include: [
							"react",
							"react/jsx-runtime",
							"react/jsx-dev-runtime",
							"react-dom",
							...environmentName === START_ENVIRONMENT_NAMES.client ? ["react-dom/client"] : ["react-dom/server"],
							"@tanstack/react-router > @tanstack/react-store",
							...options.optimizeDeps?.exclude?.find((x) => x === "@tanstack/react-form") ? ["@tanstack/react-form > @tanstack/react-store"] : []
						]
					} : void 0
				};
			}
		},
		rscConfig ? reactStartRscVitePlugin() : null,
		tanStackStartVite(corePluginOpts, options)
	];
}
var NOT_PREBUNDLED = /* @__PURE__ */ new Set([
	"react",
	"react-dom",
	"@tanstack/react-start",
	"@tanstack/react-router",
	"@tanstack/react-router-ssr-query",
	"tailwindcss-animate",
	"nitro"
]);
var { dependencies } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
var PREBUNDLE = Object.keys(dependencies).filter((name) => !NOT_PREBUNDLED.has(name));
var Commitment_default = defineConfig({
	resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
	optimizeDeps: { include: PREBUNDLE },
	plugins: [
		tanstackStart({ srcDirectory: "src" }),
		nitro(),
		viteReactWithPreamble()
	]
});
var about_exports = /* @__PURE__ */ __exportAll({ component: () => AboutPage });
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "A considered approach to entering and operating in African markets.",
			intro: "Africa Compliance is a business-entry and compliance coordination practice working with international businesses, investors and entrepreneurs across African markets."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoWeAre, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionVision, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuesGrid, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Approach, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Standards, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Commitment_default, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Have a market or structure in mind?",
			body: "Tell us about your plans and we will outline how the process can be coordinated."
		})
	] });
}
export { AboutPage, about_exports, createLogger, pageBaseSchema };
