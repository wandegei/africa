import { APPROACH } from "./site-ACj0XDsT.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/Approach-Cq0RbzEO.js
var import_jsx_runtime = require_jsx_runtime();
function Approach() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-20 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
					children: "A clear sequence, from first conversation to ongoing obligations."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-14 grid gap-px border-t border-forest/15 bg-forest/10 md:grid-cols-2 lg:grid-cols-4",
				children: APPROACH.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative bg-white pt-8 md:px-6 lg:px-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-px left-0 h-px w-12 bg-copper",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[13px] tracking-[0.18em] text-copper",
							children: item.step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-[21px] leading-snug tracking-[-0.01em] text-forest",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 pb-8 text-[14.5px] leading-[1.75] text-ink/65",
							children: item.body
						})
					]
				}, item.step))
			})]
		})
	});
}
export { Approach };
