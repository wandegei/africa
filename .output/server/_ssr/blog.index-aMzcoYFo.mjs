import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { Image } from "./image-r81IHuMV.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { INSIGHTS } from "./router-BCwh7kn0.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/blog.index-aMzcoYFo.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/blog/$slug",
			params: { slug: article.slug },
			className: "block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[3/2] overflow-hidden bg-sand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: article.image,
						alt: article.alt,
						fittingType: "fill",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.18em] text-copper",
							children: article.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-px flex-1 bg-forest/12",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.12em] text-ink/40",
							children: article.readTime
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2.5 font-display text-[21px] leading-snug text-forest transition-colors group-hover:text-copper",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-[14px] leading-[1.75] text-ink/60",
					children: article.excerpt
				})
			]
		})
	});
}
function BlogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "Perspective for businesses considering African markets.",
			intro: "Practical notes on entering, establishing and operating in African markets — written for the decisions international businesses actually have to make, with sources and verification dates recorded."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-16 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10 border-l-2 border-copper/60 pl-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13.5px] leading-relaxed text-ink/60",
						children: "Each article carries a last-verified date and states the basis on which it was written. Country-specific requirements are confirmed with qualified local counsel before they are relied on in an engagement."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3",
					children: INSIGHTS.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article }, article.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Ask us about your specific market and plans.",
			body: "Published notes cannot replace a considered view of your own structure, activity and target market."
		})
	] });
}
export { BlogPage as component };
