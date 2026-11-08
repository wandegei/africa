import { __commonJSMin } from "../_runtime.mjs";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
// node_modules/vitefu/src/index.js
var import_sync = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./index.d.ts').isDepIncluded} */
	function isDepIncluded(dep, optimizeDepsInclude) {
		return optimizeDepsInclude.some((id) => parseIncludeStr(id) === dep);
	}
	/** @type {import('./index.d.ts').isDepExcluded} */
	function isDepExcluded(dep, optimizeDepsExclude) {
		dep = parseIncludeStr(dep);
		return optimizeDepsExclude.some((id) => id === dep || dep.startsWith(`${id}/`));
	}
	/** @type {import('./index.d.ts').isDepNoExternaled} */
	function isDepNoExternaled(dep, ssrNoExternal) {
		if (ssrNoExternal === true) return true;
		else return isMatch(dep, ssrNoExternal);
	}
	/** @type {import('./index.d.ts').isDepExternaled} */
	function isDepExternaled(dep, ssrExternal) {
		if (ssrExternal === true) return false;
		else return ssrExternal.includes(dep);
	}
	/**
	* @param {string} raw could be "foo" or "foo > bar" etc
	*/
	function parseIncludeStr(raw) {
		const lastArrow = raw.lastIndexOf(">");
		return lastArrow === -1 ? raw : raw.slice(lastArrow + 1).trim();
	}
	/**
	* @param {string} target
	* @param {string | RegExp | (string | RegExp)[]} pattern
	*/
	function isMatch(target, pattern) {
		if (Array.isArray(pattern)) return pattern.some((p) => isMatch(target, p));
		else if (typeof pattern === "string") return target === pattern;
		else if (pattern instanceof RegExp) return pattern.test(target);
	}
	module.exports = {
		isDepIncluded,
		isDepExcluded,
		isDepNoExternaled,
		isDepExternaled
	};
})))();
/** @type {import('pnpapi')} */
var pnp;
/** @type {Array<{ name: string; reference: string; }>} */
var pnpWorkspaceLocators;
if (process.versions.pnp) try {
	pnp = createRequire(import.meta.url)("pnpapi");
	pnpWorkspaceLocators = pnp.getDependencyTreeRoots();
} catch {}
/** @type {import('./index.d.ts').crawlFrameworkPkgs} */
async function crawlFrameworkPkgs(options) {
	const pkgJsonPath = await findClosestPkgJsonPath(options.root);
	if (!pkgJsonPath) return {
		optimizeDeps: {
			include: [],
			exclude: []
		},
		ssr: {
			noExternal: [],
			external: []
		}
	};
	const pkgJson = await readJson(pkgJsonPath).catch((e) => {
		throw new Error(`Unable to read ${pkgJsonPath}`, { cause: e });
	});
	/** @type {string[]} */
	let optimizeDepsInclude = [];
	/** @type {string[]} */
	let optimizeDepsExclude = [];
	/** @type {string[]} */
	let ssrNoExternal = [];
	/** @type {string[]} */
	let ssrExternal = [];
	await crawl(pkgJsonPath, pkgJson);
	if (options.viteUserConfig) {
		const _optimizeDepsExclude = options.viteUserConfig?.optimizeDeps?.exclude;
		if (_optimizeDepsExclude) optimizeDepsInclude = optimizeDepsInclude.filter((dep) => !(0, import_sync.isDepExcluded)(dep, _optimizeDepsExclude));
		const _optimizeDepsInclude = options.viteUserConfig?.optimizeDeps?.include;
		if (_optimizeDepsInclude) optimizeDepsExclude = optimizeDepsExclude.filter((dep) => !(0, import_sync.isDepIncluded)(dep, _optimizeDepsInclude));
		const _ssrExternal = options.viteUserConfig?.ssr?.external;
		if (_ssrExternal) ssrNoExternal = ssrNoExternal.filter((dep) => !(0, import_sync.isDepExternaled)(dep, _ssrExternal));
		const _ssrNoExternal = options.viteUserConfig?.ssr?.noExternal;
		if (_ssrNoExternal) ssrExternal = ssrExternal.filter((dep) => !(0, import_sync.isDepNoExternaled)(dep, _ssrNoExternal));
	}
	optimizeDepsInclude.sort();
	optimizeDepsExclude.sort();
	ssrExternal.sort();
	ssrNoExternal.sort();
	return {
		optimizeDeps: {
			include: optimizeDepsInclude,
			exclude: optimizeDepsExclude
		},
		ssr: {
			noExternal: ssrNoExternal,
			external: ssrExternal
		}
	};
	/**
	* crawl the package.json dependencies for framework packages. rules:
	* 1. a framework package should be `optimizeDeps.exclude` and `ssr.noExternal`.
	* 2. the deps of the framework package should be `optimizeDeps.include` and `ssr.external`
	*    unless the dep is also a framework package, in which case do no1 & no2 recursively.
	* 3. any non-framework packages that aren't imported by a framework package can be skipped entirely.
	* 4. a semi-framework package is like a framework package, except it isn't `optimizeDeps.exclude`,
	*    but only applies `ssr.noExternal`.
	* @param {string} pkgJsonPath
	* @param {Record<string, any>} pkgJson
	* @param {string[]} [parentDepNames]
	*/
	async function crawl(pkgJsonPath, pkgJson, parentDepNames = []) {
		const isRoot = parentDepNames.length === 0;
		const crawlDevDependencies = isRoot || isPrivateWorkspacePackage(pkgJsonPath, pkgJson, options.workspaceRoot);
		/** @type {string[]} */
		let deps = [...Object.keys(pkgJson.dependencies || {}), ...crawlDevDependencies ? Object.keys(pkgJson.devDependencies || {}) : []];
		deps = deps.filter((dep) => {
			if (parentDepNames.includes(dep)) return false;
			const isFrameworkPkg = options.isFrameworkPkgByName?.(dep);
			const isSemiFrameworkPkg = options.isSemiFrameworkPkgByName?.(dep);
			if (isFrameworkPkg) {
				optimizeDepsExclude.push(dep);
				ssrNoExternal.push(dep);
			} else if (isSemiFrameworkPkg) ssrNoExternal.push(dep);
			if (isFrameworkPkg === false || isSemiFrameworkPkg === false) return false;
			else return true;
		});
		const promises = deps.map(async (dep) => {
			const depPkgJsonPath = await _findDepPkgJsonPath(dep, pkgJsonPath, !!options.workspaceRoot);
			if (!depPkgJsonPath) return;
			const depPkgJson = await readJson(depPkgJsonPath).catch(() => {});
			if (!depPkgJson) return;
			if (ssrNoExternal.includes(dep)) return crawl(depPkgJsonPath, depPkgJson, parentDepNames.concat(dep));
			const isFrameworkPkg = options.isFrameworkPkgByJson?.(depPkgJson);
			const isSemiFrameworkPkg = options.isSemiFrameworkPkgByJson?.(depPkgJson);
			if (isFrameworkPkg || isSemiFrameworkPkg) {
				if (isFrameworkPkg) {
					optimizeDepsExclude.push(dep);
					ssrNoExternal.push(dep);
				} else if (isSemiFrameworkPkg) ssrNoExternal.push(dep);
				return crawl(depPkgJsonPath, depPkgJson, parentDepNames.concat(dep));
			}
			if (!isRoot) {
				if (await pkgNeedsOptimization(depPkgJson, depPkgJsonPath)) optimizeDepsInclude.push(parentDepNames.concat(dep).join(" > "));
				if (!options.isBuild && !ssrExternal.includes(dep)) ssrExternal.push(dep);
			}
		});
		await Promise.all(promises);
	}
}
/**
* internal implementation to avoid exposing the usePnpWorkspaceLocators flag
*
* @param {string} dep
* @param {string} parent
* @param {boolean} usePnpWorkspaceLocators
* @returns {Promise<undefined|string>}
* @private
*/
async function _findDepPkgJsonPath(dep, parent, usePnpWorkspaceLocators) {
	if (pnp) {
		if (usePnpWorkspaceLocators) try {
			const locator = pnpWorkspaceLocators.find((root) => root.name === dep);
			if (locator) {
				const pkgPath = pnp.getPackageInformation(locator).packageLocation;
				return path.resolve(pkgPath, "package.json");
			}
		} catch {}
		try {
			const depRoot = pnp.resolveToUnqualified(dep, parent);
			if (!depRoot) return void 0;
			return path.join(depRoot, "package.json");
		} catch {
			return;
		}
	}
	let root = parent;
	while (root) {
		const pkg = path.join(root, "node_modules", dep, "package.json");
		try {
			await fs$1.access(pkg);
			return fs.realpathSync(pkg);
		} catch {}
		const nextRoot = path.dirname(root);
		if (nextRoot === root) break;
		root = nextRoot;
	}
}
/** @type {import('./index.d.ts').findClosestPkgJsonPath} */
async function findClosestPkgJsonPath(dir, predicate = void 0) {
	if (dir.endsWith("package.json")) dir = path.dirname(dir);
	while (dir) {
		const pkg = path.join(dir, "package.json");
		try {
			if ((await fs$1.stat(pkg)).isFile() && (!predicate || await predicate(pkg))) return pkg;
		} catch {}
		const nextDir = path.dirname(dir);
		if (nextDir === dir) break;
		dir = nextDir;
	}
}
/** @type {import('./index.d.ts').pkgNeedsOptimization} */
async function pkgNeedsOptimization(pkgJson, pkgJsonPath) {
	if (pkgJson.module || pkgJson.exports) return false;
	if (pkgJson.main) {
		const entryExt = path.extname(pkgJson.main);
		return !entryExt || entryExt === ".js" || entryExt === ".cjs";
	}
	try {
		await fs$1.access(path.join(path.dirname(pkgJsonPath), "index.js"));
		return true;
	} catch {
		return false;
	}
}
/**
* @param {string} findDepPkgJsonPath
* @returns {Promise<Record<string, any>>}
*/
async function readJson(findDepPkgJsonPath) {
	return JSON.parse(await fs$1.readFile(findDepPkgJsonPath, "utf8"));
}
/**
*
* @param {string} pkgJsonPath
* @param {Record<string,any>} pkgJson
* @param {string} [workspaceRoot]
* @returns {boolean}
*/
function isPrivateWorkspacePackage(pkgJsonPath, pkgJson, workspaceRoot = void 0) {
	return !!(workspaceRoot && pkgJson.private && !pkgJsonPath.match(/[/\\]node_modules[/\\]/) && !path.relative(workspaceRoot, pkgJsonPath).startsWith(".."));
}
export { crawlFrameworkPkgs };
