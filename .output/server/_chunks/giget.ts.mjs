import { importDep, shims } from "./common.mjs";
// node_modules/nitro/dist/_libs/giget.ts.mjs
var downloadTemplate = (await importDep({
	id: "giget",
	dir: process.cwd(),
	reason: "extending the config from a remote template",
	version: shims.giget.version
})).downloadTemplate;
export { downloadTemplate };
