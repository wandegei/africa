import { Image } from "./_ssr/image-r81IHuMV.mjs";
import { APPROACH_NOTE, CONTACT, MARKETS, SERVICES, VALUES } from "./_ssr/site-ACj0XDsT.mjs";
import { ServiceGlyph } from "./_ssr/ServiceGlyph-BzSvnQqk.mjs";
import { Approach } from "./_ssr/Approach-Cq0RbzEO.mjs";
import { INSIGHTS } from "./_ssr/router-BCwh7kn0.mjs";
import { Link } from "./_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "./_libs/react2.mjs";
import { ArrowRight } from "./_libs/lucide-react3.mjs";
import { ArrowUpRight } from "./_libs/lucide-react.mjs";
import { MessageCircle } from "./_libs/lucide-react10.mjs";
// node_modules/.nitro/vite/services/ssr/assets/_site-OUBQ_lPz.js
var import_jsx_runtime = require_jsx_runtime();
var HERO_IMAGE = "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/c237c821f_generated_8ec55bb6.png";
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-forest text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:min-h-[calc(100svh-116px)] lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-14 lg:py-24 xl:pl-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-xl font-display text-[36px] leading-[1.06] tracking-[-0.03em] sm:text-[46px] lg:text-[50px] xl:text-[56px]",
							children: "One accountable partner for entering and staying compliant in African markets."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-md text-[15.5px] leading-[1.75] text-white/70",
							children: "Africa Compliance coordinates business establishment, connects international businesses with qualified local professionals, and keeps ongoing compliance obligations organised and on track."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "group inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-forest",
								children: ["Discuss Your Business Plans", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/services",
								className: "inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-copper hover:text-white",
								children: "Explore Our Services"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 border-t border-white/15 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-white/40",
						children: "Markets under assessment or planned"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-[15px] leading-relaxed text-white/75",
						children: MARKETS.flatMap((group) => group.countries.map((c) => c.name)).join(" · ")
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[320px] sm:min-h-[420px] lg:min-h-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: HERO_IMAGE,
						alt: "Modern glass office towers in an African business district at golden hour",
						fittingType: "fill",
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/25 to-transparent lg:from-forest/55 lg:via-forest/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 hidden w-px bg-copper/40 lg:block" })
				]
			})]
		})
	});
}
function Intro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid gap-12 py-20 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "max-w-md font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[40px]",
				children: "Making Business in Africa Simpler."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[17px] leading-[1.8] text-ink/80",
						children: "Entering and operating in African markets can involve complex regulatory environments, different establishment requirements in each jurisdiction, and multiple professional stakeholders to coordinate."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[16px] leading-[1.8] text-ink/65",
						children: "Africa Compliance aims to simplify that process. We help clients understand what their plans require, structure the steps involved, and coordinate the right support — so decisions are made with clarity rather than guesswork."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "group inline-flex items-center gap-2 border-b border-copper/40 pb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:border-copper hover:text-copper",
						children: ["About Africa Compliance", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
					})
				]
			})]
		})
	});
}
function ServicesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-forest/10 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-20 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-6 lg:flex-row lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
						children: "Four areas of support, coordinated around your plans."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/services",
					className: "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper",
					children: ["All services", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-4",
				children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-sand/60 lg:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-11 w-11 place-items-center border border-forest/15 text-forest transition-colors duration-300 group-hover:border-copper group-hover:text-copper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceGlyph, { icon: service.icon })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[13px] tracking-[0.1em] text-forest/30",
								children: service.number
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-[21px] leading-snug tracking-[-0.01em] text-forest",
							children: service.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-[14.5px] leading-[1.7] text-ink/65",
							children: service.short
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services",
							hash: service.id,
							className: "mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors group-hover:text-copper",
							children: ["Learn more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "h-3.5 w-3.5",
								"aria-hidden": "true"
							})]
						})
					]
				}, service.id))
			})]
		})
	});
}
function WhyUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-forest text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-20 lg:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]",
						children: "A coordinated partner, not another adviser in a long list."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-sm text-[15.5px] leading-[1.8] text-white/60",
						children: "Entering a new market usually means working with several parties. Our role is to bring structure to that process and keep you informed at each stage."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-9 border border-white/15 bg-white/5 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] uppercase tracking-[0.18em] text-copper",
							children: "Important"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[13.5px] leading-relaxed text-white/60",
							children: APPROACH_NOTE
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:text-copper",
						children: ["Start a conversation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-px bg-white/10 sm:grid-cols-2",
					children: VALUES.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-forest p-7 lg:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[12px] tracking-[0.16em] text-copper",
								children: String(index + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-[19px] leading-snug text-white",
								children: value.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-[14px] leading-[1.7] text-white/55",
								children: value.body
							})
						]
					}, value.title))
				})]
			})
		})
	});
}
function MarketsPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-sand/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-20 lg:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
						children: "A structured, phased focus across the continent."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-sm text-[15.5px] leading-[1.8] text-ink/70",
						children: "We are assessing markets and building professional relationships progressively. The countries below represent target markets under assessment or planned, rather than confirmed operational coverage."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/markets",
						className: "mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper",
						children: ["Explore our markets", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-8",
					children: MARKETS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-forest/15 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-[20px] text-forest",
								children: group.region
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] uppercase tracking-[0.18em] text-ink/40",
								children: [
									group.countries.length,
									" market",
									group.countries.length > 1 ? "s" : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: group.countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border border-forest/15 bg-white/70 px-3.5 py-2 text-[13px] text-forest/85",
								children: country.name
							}, country.name))
						})]
					}, group.region))
				})]
			})
		})
	});
}
function InsightsPreview() {
	const featured = INSIGHTS.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-forest/10 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-20 lg:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-6 lg:flex-row lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[38px]",
						children: "Perspective on entering and operating in African markets."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[14px] text-ink/50",
						children: "Written for the decisions international businesses actually face when establishing and operating in a new market."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog",
					className: "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-copper",
					children: ["View all posts", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-8 md:grid-cols-3",
				children: featured.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[10px] uppercase tracking-[0.18em] text-copper",
								children: article.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2.5 font-display text-[20px] leading-snug text-forest transition-colors group-hover:text-copper",
								children: article.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-[14px] leading-[1.7] text-ink/60",
								children: article.excerpt
							})
						]
					})
				}, article.slug))
			})]
		})
	});
}
function FinalCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-forest text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-20 lg:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-2xl font-display text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[42px]",
					children: "Planning to Enter or Expand in Africa?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-[15.5px] leading-[1.8] text-white/60",
					children: "Start a conversation with Africa Compliance about your business objectives and market-entry requirements."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "group inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-forest",
						children: ["Contact Africa Compliance", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: CONTACT.whatsapp,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-copper hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), "Message on WhatsApp"]
					})]
				})]
			})
		})
	});
}
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesGrid, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketsPreview, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Approach, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightsPreview, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {})
	] });
}
export { HomePage as component };
