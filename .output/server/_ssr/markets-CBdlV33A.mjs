import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { CONTACT, MARKETS } from "./site-ACj0XDsT.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
// node_modules/.nitro/vite/services/ssr/assets/markets-CBdlV33A.js
var import_jsx_runtime = require_jsx_runtime();
var PHASES = [
	{
		phase: "Phase 01",
		label: "Assessment",
		body: "Building a structured understanding of establishment and compliance requirements in each target market."
	},
	{
		phase: "Phase 02",
		label: "Professional network",
		body: "Identifying appropriately qualified local professionals for the input each market requires."
	},
	{
		phase: "Phase 03",
		label: "Client engagement",
		body: "Coordinating mandates for clients with active requirements in an assessed market."
	}
];
function CoverageComposition() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shell py-20 lg:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[30px] leading-[1.12] tracking-[-0.02em] text-forest sm:text-[36px]",
						children: "Organised by region, assessed market by market."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-[15.5px] leading-[1.8] text-ink/70",
						children: "African markets differ materially in their establishment requirements, regulatory environments and professional landscape. Our regional structure reflects that: each market is assessed on its own terms rather than treated as a variation of another."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-9 space-y-5",
						children: PHASES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-5 border-t border-forest/12 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-20 shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-copper",
								children: item.phase
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-[17px] text-forest",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[13.5px] leading-[1.7] text-ink/60",
								children: item.body
							})] })]
						}, item.phase))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border border-forest/12 bg-cream p-7 lg:p-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute inset-0 opacity-40",
						style: {
							backgroundImage: "linear-gradient(to right, rgba(23,63,53,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,63,53,0.08) 1px, transparent 1px)",
							backgroundSize: "44px 44px"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative space-y-10",
						children: MARKETS.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[11px] tracking-[0.2em] text-copper",
									children: String(groupIndex + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-forest/60",
									children: group.region
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-px flex-1 bg-forest/15",
									"aria-hidden": "true"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: group.countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-baseline justify-between gap-4 border-b border-forest/10 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[19px] text-forest",
									children: country.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10.5px] uppercase tracking-[0.12em] text-ink/40",
									children: country.note
								})]
							}, country.name))
						})] }, group.region))
					})]
				})]
			})
		})
	});
}
function MarketsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "A phased focus across African markets.",
			intro: "The countries below represent target markets under assessment or planned. Apart from the Uganda office shown below, they do not constitute confirmed operational coverage, offices, licences or staff presence."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageComposition, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-forest/10 bg-sand/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shell grid gap-10 py-16 lg:grid-cols-3 lg:gap-12 lg:py-20",
				children: MARKETS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[24px] text-forest",
						children: group.region
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-px w-12 bg-copper",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-4",
						children: group.countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-forest/10 pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-[18px] text-forest",
									children: country.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[12px] uppercase tracking-[0.12em] text-ink/45",
									children: country.note
								}),
								country.office && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 border-l-2 border-copper/50 pl-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-copper",
											children: "Office"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("address", {
											className: "mt-2 not-italic text-[13.5px] leading-[1.7] text-ink/70",
											children: country.office.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block",
												children: line
											}, line))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 space-y-1.5 text-[13.5px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: CONTACT.phoneHref,
												className: "block text-forest transition-colors hover:text-copper",
												children: CONTACT.phoneDisplay
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `mailto:${CONTACT.email}`,
												className: "block text-forest transition-colors hover:text-copper",
												children: CONTACT.email
											})]
										})
									]
								})
							]
						}, country.name))
					})
				] }, group.region))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-16 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 border border-forest/12 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-xl font-display text-[25px] leading-[1.2] text-forest sm:text-[30px]",
						children: "Tell us where you are considering and we will confirm what we can assess."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-[14.5px] leading-[1.75] text-ink/65",
						children: "Coverage is developed in response to client requirements. If your plans involve a market outside the regions shown, an enquiry is the quickest way to establish whether support can be coordinated."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${CONTACT.email}?subject=Market%20enquiry`,
							className: "inline-flex items-center justify-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper",
							children: "Email an enquiry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: CONTACT.whatsapp,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center justify-center gap-2 border border-forest/20 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:border-copper hover:text-copper",
							children: "WhatsApp"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink/45",
					children: "Coverage note: Africa Compliance maintains the Uganda office shown above. It does not claim employees, licences, regulatory approvals or active service delivery in any other market listed on this page. Where local professional input is required, it is coordinated through appropriately qualified and authorised professionals engaged directly by the client."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Enquire about your target country.",
			body: "Share the market you are considering and the nature of your plans, and we will respond with what can be assessed and coordinated."
		})
	] });
}
export { MarketsPage as component };
