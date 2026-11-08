import { __toESM } from "./_runtime.mjs";
import { cn } from "./_ssr/router-BCwh7kn0.mjs";
import { CONTACT, DISCLAIMER, NAV, SERVICES } from "./_ssr/site-ACj0XDsT.mjs";
import { require_react } from "./_libs/react.mjs";
import { Link } from "./_libs/@tanstack/react-router+[3...].mjs";
import { Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { useRouterState } from "./_libs/tanstack__react-router.mjs";
import { require_jsx_runtime } from "./_libs/react2.mjs";
import { ArrowUpRight } from "./_libs/lucide-react.mjs";
import { Mail, Phone } from "./_libs/lucide-react8.mjs";
import { Menu, X } from "./_libs/lucide-react9.mjs";
import { MessageCircle } from "./_libs/lucide-react10.mjs";
// node_modules/.nitro/vite/services/ssr/assets/_site-D2yEOICL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Wordmark({ tone = "dark", className, asLink = true }) {
	const isDark = tone === "light";
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("group inline-flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid h-10 w-10 place-items-center border font-display text-[15px] leading-none tracking-tight transition-colors", isDark ? "border-white/30 text-white group-hover:border-copper" : "border-forest/25 text-forest group-hover:border-copper group-hover:text-copper"),
			"aria-hidden": "true",
			children: "AC"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-display text-[19px] tracking-[-0.01em]", isDark ? "text-white" : "text-forest"),
				children: "Africa Compliance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-1.5 text-[9px] uppercase tracking-[0.24em]", isDark ? "text-white/55" : "text-ink/50"),
				children: "Market Entry & Compliance"
			})]
		})]
	});
	if (!asLink) return content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		"aria-label": "Africa Compliance — home",
		children: content
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		let last = window.scrollY;
		const onScroll = () => {
			const y = window.scrollY;
			setHidden(y > 180 && y > last + 4);
			last = y;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden bg-forest text-white/70 lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell flex h-10 items-center justify-between text-[11px] uppercase tracking-[0.18em]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Market-entry and compliance coordination across African markets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${CONTACT.email}`,
							className: "transition-colors hover:text-copper",
							children: CONTACT.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-white/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: CONTACT.phoneHref,
							className: "transition-colors hover:text-copper",
							children: CONTACT.phoneDisplay
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: cn("sticky top-0 z-50 border-b border-forest/10 bg-white/95 backdrop-blur-md transition-transform duration-500", hidden && !open ? "-translate-y-full" : "translate-y-0"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell flex h-[76px] items-center justify-between gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Primary",
						className: "hidden items-center gap-8 lg:flex",
						children: NAV.map((item) => {
							const active = mounted && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("relative py-2 text-[13px] font-medium tracking-wide transition-colors", active ? "text-forest" : "text-ink/65 hover:text-forest"),
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -bottom-0.5 left-0 h-px w-full origin-left bg-copper transition-transform duration-300", active ? "scale-x-100" : "scale-x-0") })]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "hidden items-center gap-2 bg-copper px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-forest sm:inline-flex",
							children: ["Discuss your plans", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								className: "h-3.5 w-3.5",
								"aria-hidden": "true"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen((v) => !v),
							"aria-expanded": open,
							"aria-controls": "mobile-menu",
							"aria-label": open ? "Close menu" : "Open menu",
							className: "grid h-11 w-11 place-items-center border border-forest/20 text-forest transition-colors hover:border-copper hover:text-copper lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})]
					})
				]
			})
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "mobile-menu",
			className: "fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-forest px-5 py-8 text-white lg:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Mobile",
					className: "flex flex-col divide-y divide-white/10",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "flex items-center justify-between py-4 font-display text-2xl tracking-tight text-white/90",
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "h-4 w-4 text-copper",
							"aria-hidden": "true"
						})]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					onClick: () => setOpen(false),
					className: "mt-8 flex w-full items-center justify-center gap-2 bg-copper px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white",
					children: "Discuss your business plans"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-2 text-sm text-white/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${CONTACT.email}`,
						className: "block hover:text-copper",
						children: CONTACT.email
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: CONTACT.phoneHref,
						className: "block hover:text-copper",
						children: CONTACT.phoneDisplay
					})]
				})
			]
		})
	] });
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-forest text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell py-16 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { tone: "light" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xs text-sm leading-relaxed text-white/60",
							children: "Supporting international businesses navigating market entry, business establishment and regulatory compliance across African markets."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: CONTACT.whatsapp,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mt-7 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-copper hover:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}), "WhatsApp us"]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80",
						children: "Navigate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3 text-sm text-white/65",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "transition-colors hover:text-white",
							children: item.label
						}) }, item.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80",
						children: "Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3 text-sm text-white/65",
						children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services",
							hash: service.id,
							className: "transition-colors hover:text-white",
							children: service.title
						}) }, service.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-4 text-sm text-white/65",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${CONTACT.email}`,
								className: "inline-flex items-center gap-2.5 transition-colors hover:text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "h-4 w-4 text-copper",
									"aria-hidden": "true"
								}), CONTACT.email]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: CONTACT.phoneHref,
								className: "inline-flex items-center gap-2.5 transition-colors hover:text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									className: "h-4 w-4 text-copper",
									"aria-hidden": "true"
								}), CONTACT.phoneDisplay]
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs uppercase tracking-[0.18em] text-white/35",
							children: "Enquiries by appointment"
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 border-t border-white/12 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-xs leading-relaxed text-white/40",
						children: DISCLAIMER
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-3xl text-xs leading-relaxed text-white/35",
						children: "Country coverage shown on this website represents markets under assessment or planned, not a confirmed operational presence. No office, licence, accreditation or partnership is implied unless expressly stated."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Africa Compliance. All rights reserved."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "transition-colors hover:text-white",
									children: "Privacy Policy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terms",
									className: "transition-colors hover:text-white",
									children: "Terms & Conditions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-1.5 transition-colors hover:text-white",
									children: ["Enquire", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										className: "h-3 w-3",
										"aria-hidden": "true"
									})]
								})
							]
						})]
					})
				]
			})]
		})
	});
}
function SiteLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
export { SiteLayout as component };
