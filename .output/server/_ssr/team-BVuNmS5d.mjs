import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { CtaBand } from "./CtaBand-BpTGzqyx.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Check } from "../_libs/lucide-react5.mjs";
// node_modules/.nitro/vite/services/ssr/assets/team-BVuNmS5d.js
var import_jsx_runtime = require_jsx_runtime();
function TeamProfile({ member }) {
	const initials = member.name.replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "").split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col border border-forest/12 bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid aspect-[5/4] place-items-center bg-forest",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[42px] tracking-[0.14em] text-copper",
				"aria-hidden": "true",
				children: initials
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-x-0 bottom-0 h-px bg-copper/40",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-6 lg:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[21px] leading-snug text-forest",
					children: member.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper",
					children: member.role
				}),
				member.credential && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] leading-relaxed text-ink/55",
					children: member.credential
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 flex-1 text-[14.5px] leading-[1.75] text-ink/70",
					children: member.focus
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2.5 border-t border-forest/10 pt-5",
					children: member.responsibilities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2.5 text-[13.5px] leading-[1.6] text-ink/65",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-copper",
							"aria-hidden": "true"
						}), item]
					}, item))
				})
			]
		})]
	});
}
var TEAM = [
	{
		name: "Mr. Wodenga Cyrus Woboya",
		role: "Chief Executive Officer",
		credential: "Advocate of the High Court of Uganda",
		focus: "Leads Africa Compliance and is responsible for the firm's mandates, its professional relationships and the standard of coordination clients receive across markets.",
		responsibilities: [
			"Client mandates and engagement scoping",
			"Professional relationships across markets",
			"Oversight of establishment and compliance workstreams"
		]
	},
	{
		name: "Ms. Nuwatwine Patricia",
		role: "Senior Partner",
		focus: "Oversees client delivery on establishment and compliance engagements, coordinating documentation, filings and local professional input across the sequence of steps a mandate involves.",
		responsibilities: [
			"Engagement planning and delivery",
			"Coordination of filings and documentation",
			"Liaison with local professional advisers"
		]
	},
	{
		name: "Mr. Nuwasiima Norman",
		role: "Associate Partner",
		focus: "Supports the day-to-day running of mandates, keeping deadlines, deliverables and recurring obligations visible to clients once an entity is established.",
		responsibilities: [
			"Day-to-day mandate coordination",
			"Compliance calendars and renewal tracking",
			"Client reporting and documentation"
		]
	}
];
var STAFFING = [
	{
		title: "A named lead",
		body: "Every mandate has a named partner responsible for it, so it is always clear who is accountable for each step."
	},
	{
		title: "One point of coordination",
		body: "Documentation, filings and local professional input are coordinated through the same team for the whole engagement."
	},
	{
		title: "Specialist input where required",
		body: "Where regulated legal or tax advice is needed, it is obtained from appropriately qualified and authorised professionals engaged directly by the client."
	}
];
function TeamPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "The people accountable for your mandate.",
			intro: "Africa Compliance is led by Mr. Wodenga Cyrus Woboya, Advocate of the High Court of Uganda, together with the partners below. Mandates are handled by a named lead from the first conversation through to post-establishment compliance."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-16 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
					children: TEAM.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamProfile, { member }, member.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 max-w-3xl text-[12.5px] leading-relaxed text-ink/45",
					children: "Africa Compliance is not a law firm and does not provide regulated legal, tax or other reserved professional services. Where such services are required, they may be coordinated through appropriately qualified and authorised local professionals engaged directly by the client."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-forest/10 bg-sand/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shell py-16 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-2xl font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-forest sm:text-[34px]",
					children: "How engagements are staffed."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-px border border-forest/12 bg-forest/10 md:grid-cols-3",
					children: STAFFING.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 lg:p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-[19px] leading-snug text-forest",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2.5 text-[14px] leading-[1.75] text-ink/65",
							children: item.body
						})]
					}, item.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Speak with the team directly.",
			body: "Share your objectives and target market, and a named lead will respond with a considered view of what your plans involve."
		})
	] });
}
export { TeamPage as component };
