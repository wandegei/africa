import { importDep, shims } from "./common.mjs";
// node_modules/nitro/dist/_libs/jiti.ts.mjs
var createJiti = (await importDep({
	id: "jiti",
	dir: process.cwd(),
	reason: "loading config files this runtime cannot import natively",
	version: shims.jiti.version
})).createJiti;
export { createJiti };
