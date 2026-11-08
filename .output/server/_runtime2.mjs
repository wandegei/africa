import { g } from "./_chunks/common.mjs";
// node_modules/nitro/dist/_runtime.mjs
function assertBunRuntime() {
	if (!g) throw new Error("The `bun` builder requires the Bun runtime. Run Nitro with Bun (e.g. `bun --bun nitro build`) or use another builder.");
}
export { assertBunRuntime };
