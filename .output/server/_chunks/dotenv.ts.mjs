import { importDep, shims } from "./common.mjs";
// node_modules/nitro/dist/_libs/dotenv.ts.mjs
var parse = (await importDep({
	id: "dotenv",
	dir: process.cwd(),
	reason: "parsing `.env` files (`node:util.parseEnv` is not available in this runtime)",
	version: shims.dotenv.version
})).parse;
export { parse };
