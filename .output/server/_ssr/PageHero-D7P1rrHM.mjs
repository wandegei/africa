import { cn } from "./router-BCwh7kn0.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/PageHero-D7P1rrHM.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ title, intro, meta, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative overflow-hidden bg-forest text-white", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 opacity-[0.16]",
				style: {
					backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
					backgroundSize: "calc(100% / 12) 100%"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell relative py-16 sm:py-20 lg:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-3xl font-display text-[34px] leading-[1.08] tracking-[-0.025em] sm:text-[46px] lg:text-[54px]",
						children: title
					}),
					intro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-[15.5px] leading-[1.8] text-white/65",
						children: intro
					}),
					meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: meta
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-copper/40" })
		]
	});
}
export { PageHero };
