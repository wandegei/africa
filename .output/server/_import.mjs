import { ensureDep, missingDepError, resolveFromDepPath, resolveModulePath } from "./_chunks/common.mjs";
import { pathToFileURL } from "node:url";
// node_modules/nitro/dist/_import.mjs
function resolveRolldown(dir, opts = {}) {
	if (opts.paths?.rolldown) return resolveFromDepPath("rolldown", {
		dir,
		path: opts.paths.rolldown
	});
	const vite = opts.paths?.vite ? resolveFromDepPath("vite", {
		dir,
		path: opts.paths.vite
	}) : resolveModulePath("vite", {
		from: dir,
		try: true,
		cache: false
	});
	return resolveModulePath("rolldown", {
		from: vite ? [
			dir,
			vite,
			import.meta.url
		] : [dir, import.meta.url],
		try: true,
		cache: false
	});
}
async function importRolldown(dir, opts = {}) {
	const paths = opts.deps?.paths;
	const depOpts = {
		id: "rolldown",
		dir,
		deps: opts.deps
	};
	const resolved = !paths?.rolldown && resolveRolldown(dir, { paths }) || await ensureDep(depOpts);
	if (!resolved) throw missingDepError(depOpts);
	return import(pathToFileURL(resolved).href);
}
export { importRolldown, resolveRolldown };
