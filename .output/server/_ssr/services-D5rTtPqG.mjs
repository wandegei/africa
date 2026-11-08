import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { ServiceGlyph } from "./ServiceGlyph-BzSvnQqk.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { SERVICES } from "./site-ACj0XDsT.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { ArrowUpRight } from "../_libs/lucide-react.mjs";
import { Check } from "../_libs/lucide-react5.mjs";
// node_modules/.nitro/vite/services/ssr/assets/services-D5rTtPqG.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceDetail({ service }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: service.id,
		className: "scroll-mt-28 border-t border-forest/10 bg-white py-16 lg:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center border border-forest/15 text-copper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceGlyph, {
							icon: service.icon,
							className: "h-5 w-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[13px] tracking-[0.2em] text-forest/35",
						children: service.number
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-[27px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[33px]",
					children: service.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[15px] leading-[1.8] text-ink/70",
					children: service.intro
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 border-l-2 border-copper/60 bg-sand/40 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10.5px] font-semibold uppercase tracking-[0.18em] text-forest/60",
						children: "Client benefit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[14px] leading-[1.75] text-ink/75",
						children: service.benefit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "group mt-7 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper",
					children: ["Discuss this service", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/45",
					children: "Areas of support"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-forest/10 border-y border-forest/10",
					children: service.areas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3.5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-4 w-4 shrink-0 text-copper",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[15px] text-ink/80",
							children: area
						})]
					}, area))
				}),
				service.disclosure && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border border-forest/15 bg-cream p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10.5px] font-semibold uppercase tracking-[0.18em] text-copper",
						children: "Regulatory disclosure"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2.5 text-[13.5px] leading-[1.75] text-ink/65",
						children: service.disclosure
					})]
				})
			] })]
		})
	});
}
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "Coordinated support across the full establishment lifecycle.",
			intro: "Four areas of work, designed to be used together or individually — from the first assessment of a market to the ongoing obligations that follow establishment."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-forest/10 bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shell flex gap-6 overflow-x-auto py-4",
				children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `#${service.id}`,
					className: "whitespace-nowrap text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink/55 transition-colors hover:text-copper",
					children: [
						service.number,
						" · ",
						service.title
					]
				}, service.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceDetail, { service }, service.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-forest/10 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shell py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-3xl text-[13px] leading-relaxed text-ink/55",
					children: "Service descriptions on this page set out how Africa Compliance intends to support clients. Availability, scope and pricing are confirmed on a case-by-case basis. Where a matter requires regulated legal, tax or other reserved professional advice, that advice is provided by appropriately qualified and authorised local professionals engaged directly by the client."
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { title: "Not sure which service applies to your plans?" })
	] });
}
export { ServicesPage as component };
