import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { ArrowUpRight } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/CtaBand-BpTGzqyx.js
var import_jsx_runtime = require_jsx_runtime();
function CtaBand({ title = "Planning to enter or expand in Africa?", body = "Share your objectives and target markets, and we will respond with a considered view of what your plans involve." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-forest/10 bg-sand/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-16 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-8 lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[34px]",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[15px] leading-[1.75] text-ink/70",
						children: body
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "group inline-flex shrink-0 items-center gap-2.5 bg-forest px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper",
					children: ["Contact Africa Compliance", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
				})]
			})
		})
	});
}
export { CtaBand };
