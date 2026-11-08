import { Image } from "./image-r81IHuMV.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { INSIGHTS, Route, getInsight } from "./router-BCwh7kn0.mjs";
import { Link } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { ArrowLeft, CalendarCheck } from "../_libs/lucide-react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/blog._slug-DpEZeSIp.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	const { slug } = Route.useParams();
	const article = getInsight(slug);
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[32px] text-forest sm:text-[40px]",
					children: "This post is not available."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-[15px] leading-relaxed text-ink/65",
					children: "The post you are looking for may have been moved. The blog lists everything currently published."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "mt-8 inline-flex items-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper",
					children: "View all posts"
				})
			]
		})
	});
	const related = INSIGHTS.filter((item) => item.slug !== article.slug).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-forest text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-14 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog",
						className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-copper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "All posts"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.18em] text-copper",
								children: article.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-px w-8 bg-white/25",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] uppercase tracking-[0.14em] text-white/45",
								children: [
									article.date,
									" · ",
									article.readTime
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 max-w-3xl font-display text-[30px] leading-[1.12] tracking-[-0.025em] sm:text-[42px]",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/65 sm:text-[15.5px]",
						children: article.excerpt
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-12 lg:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[16/9] overflow-hidden bg-sand sm:aspect-[16/8]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: article.image,
						alt: article.alt,
						fittingType: "fill",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-10 max-w-2xl sm:mt-12",
					children: [
						article.sections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: index === 0 ? "" : "mt-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-[22px] leading-snug text-forest sm:text-[24px]",
									children: section.heading
								}),
								section.paragraphs?.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-[16px] leading-[1.85] text-ink/80 sm:text-[16.5px]",
									children: paragraph
								}, paragraph.slice(0, 40))),
								section.bullets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 space-y-3 border-l border-forest/15 pl-5",
									children: section.bullets.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-[15px] leading-[1.7] text-ink/75",
										children: item
									}, item.slice(0, 40)))
								}) : null
							]
						}, section.heading)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 border border-forest/12 bg-cream p-5 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 text-copper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] font-semibold uppercase tracking-[0.18em]",
									children: ["Last verified ", article.lastVerified]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[13.5px] leading-[1.75] text-ink/65",
								children: article.sourcesNote
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 border-l-2 border-forest/20 pl-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] leading-relaxed text-ink/50",
								children: "Nothing in this article constitutes legal, tax or other regulated professional advice, and it should not be relied upon as such. Requirements differ by jurisdiction, business activity and ownership structure, and change over time."
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-forest/10 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[24px] text-forest",
					children: "Further reading"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-8 sm:grid-cols-2",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: item.slug },
						className: "group border-t border-forest/15 pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.18em] text-copper",
							children: item.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-[20px] leading-snug text-forest transition-colors group-hover:text-copper",
							children: item.title
						})]
					}, item.slug))
				})]
			})
		})
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
		title: "Discuss your market-entry requirements.",
		body: "A conversation about your specific plans will always be more useful than a general article."
	})] });
}
export { BlogPostPage as component };
