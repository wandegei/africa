import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { ErrorComponent, Outlet, rootRouteId, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, useMatch } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { Slot } from "../_libs/radix-ui__react-slot.mjs";
import { clsx, cva } from "../_libs/class-variance-authority+clsx.mjs";
import { twMerge } from "../_libs/tailwind-merge.mjs";
import { z } from "../_libs/next-themes.mjs";
import { Toaster } from "../_libs/sonner.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
// node_modules/.nitro/vite/services/ssr/assets/insights-D-1wQ1iI.js
var INSIGHTS = [
	{
		slug: "professional-boundaries-coordination-partner",
		title: "Professional Boundaries: What a Coordination Partner Can and Cannot Do",
		category: "Regulatory Compliance",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "6 min read",
		excerpt: "Legal practice, tax, audit, company formation and corporate services are regulated differently in every African jurisdiction. Understanding where coordination ends and reserved professional work begins is the first risk control for any market entry.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/c7b0aa08c_generated_635491ae.png",
		alt: "Corporate document folder, reading glasses and brass paperweight on a pale desk",
		sections: [
			{
				heading: "A licence in one country does not travel",
				paragraphs: ["Each jurisdiction regulates legal practice, taxation, accounting, company registration, immigration, corporate services, data protection and anti-money laundering under its own framework. A professional authorisation obtained in one country does not authorise practice in another, and it does not authorise a business to hold itself out as providing those services.", "For an international business entering several markets at once, this is easy to overlook. The consequence is not only regulatory exposure for the provider: advice given without authorisation may be unusable, may need to be re-done by qualified counsel, and can expose the client to filings made on an incorrect basis."]
			},
			{
				heading: "Work that is typically reserved",
				paragraphs: ["The categories below are the ones most often encountered when establishing a business. Each is regulated to some degree in most African jurisdictions, and the detail varies by country."],
				bullets: [
					"Legal opinions, reserved legal drafting and legal representation before courts or regulators.",
					"Tax advice, tax representation, bookkeeping, accounting and audit — all normally requiring registration with a professional body or revenue authority.",
					"Company formation agency work, nominee shareholder or director services, trust services and registered-office provision, which some jurisdictions license or restrict.",
					"Corporate services to third parties where anti-money laundering legislation treats such providers as accountable persons.",
					"Immigration and work-permit advice, where filings may require an authorised representative or licensed agent."
				]
			},
			{
				heading: "What coordination properly covers",
				paragraphs: ["Coordination is administrative and organisational rather than advisory in the regulated sense. It means mapping the sequence of steps a market entry requires, preparing and tracking the documentation that sits around professional filings, arranging and managing the input of qualified local professionals, and keeping deadlines visible once the entity is operating.", "Put simply: a coordinator is accountable for process, sequence and completeness. The authorised professional is accountable for the opinion, the filing and the advice."]
			},
			{
				heading: "Questions worth asking any provider",
				paragraphs: ["Whether you are assessing a coordinator, a corporate services firm or an introducer, the same questions distinguish a compliant arrangement from an exposed one."],
				bullets: [
					"Who is the authorised professional for each regulated step, and with which body are they registered?",
					"Who signs the filing or opinion — the coordinator or the licensed practitioner?",
					"Is the professional engaged by you directly, or subcontracted through the coordinator?",
					"How are coordination fees separated from government fees and professional fees?",
					"Which party carries professional indemnity cover for each element of the work?"
				]
			},
			{
				heading: "How Africa Compliance structures this",
				paragraphs: ["Africa Compliance contracts with clients for coordination and monitoring services. For regulated professional work, clients enter into separate engagement agreements directly with authorised professionals in the relevant jurisdiction.", "That separation creates transparency about who is responsible for what, keeps professional liability where it belongs, and protects the independence of local practitioners. It also means a scope document can state plainly what is excluded."]
			}
		],
		sourcesNote: "General practice note. It cites no country-specific legislation, because the applicable rules differ by jurisdiction and change over time. Country-level requirements are confirmed with qualified local counsel and recorded in the engagement file."
	},
	{
		slug: "client-due-diligence-aml-kyc-market-entry",
		title: "Client Due Diligence: AML, KYC and Beneficial Ownership Before You Engage",
		category: "Regulatory Compliance",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "6 min read",
		excerpt: "Anti-money laundering obligations follow the service, not the letterhead. What a properly documented onboarding process establishes, and why the questions arrive before any registration work begins.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/3d18ff418_generated_faed3965.png",
		alt: "Premium stationery and a leather planner on a marble desk",
		sections: [
			{
				heading: "Why the questions come first",
				paragraphs: ["Cross-border establishment work involves corporate structures, ownership chains, source of funds and payments into and out of multiple jurisdictions. Every bank, licensed professional and regulated corporate services provider in that chain is required to understand who its client is before acting.", "That means due diligence is not an administrative formality attached to onboarding. It determines whether the engagement can proceed at all, which services can be offered, and what level of monitoring applies afterwards."]
			},
			{
				heading: "What onboarding should establish",
				paragraphs: ["A documented client file normally records the following before substantive work begins."],
				bullets: [
					"Identity of the client and of the individuals instructing the engagement.",
					"Corporate registration details for any corporate client or shareholder.",
					"Directors and authorised representatives, with evidence of authority.",
					"Ultimate beneficial ownership, traced through each layer of the structure.",
					"Sanctions and politically exposed person screening.",
					"Purpose of the engagement and the intended business activity.",
					"Countries of operation, and the legal entities involved in each.",
					"Source-of-funds information where the risk assessment requires it.",
					"A client risk classification and the reasoning behind it.",
					"Approval, record-keeping and review dates."
				]
			},
			{
				heading: "Beneficial ownership is where structures fail",
				paragraphs: ["Most jurisdictions now maintain beneficial ownership registers or require the information to be filed with the company registry. Thresholds, definitions of control and filing deadlines differ, and a structure that is transparent in one country may be opaque in another.", "For groups, the practical approach is to maintain one ownership chart that shows every entity, every intermediate holding company and the natural persons at the top — with the supporting evidence held in the same file. Discrepancies between the chart, the registry filings and the bank's records are one of the most common causes of delay."]
			},
			{
				heading: "The accountable-person question",
				paragraphs: ["Providers that act as company formation agents can fall within anti-money laundering frameworks as accountable persons, which may bring registration, policy and reporting obligations. Whether a particular coordination activity triggers those obligations is a jurisdiction-specific question.", "In Uganda, for example, trust and company service providers acting as formation agents may fall within the accountable-person framework. Whether proposed coordination activities trigger registration obligations must be confirmed with Ugandan counsel and the Financial Intelligence Authority rather than assumed either way."]
			},
			{
				heading: "Policies to have in place before accepting clients",
				paragraphs: ["Due diligence only works as part of a documented control environment. The policies that should exist before the first client is accepted are: anti-money laundering and client due diligence; anti-bribery and anti-corruption; sanctions screening; data protection and information security; conflicts of interest; client confidentiality; complaints handling; partner due diligence; engagement-letter and terms-of-business templates; and records retention and document management."],
				bullets: [
					"A conflicts register, reviewed at each new instruction.",
					"A sanctions screening process with a defined re-screening frequency.",
					"A records-retention schedule covering both client files and declined engagements."
				]
			}
		],
		sourcesNote: "General practice note reflecting standard anti-money laundering and know-your-client expectations. Statutory thresholds, registration duties and filing requirements are jurisdiction-specific and are confirmed with local counsel before any engagement."
	},
	{
		slug: "subsidiary-or-branch-structuring-decisions",
		title: "Subsidiary or Branch: The Structuring Decisions to Get Right First",
		category: "Business Establishment",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "5 min read",
		excerpt: "The choice between a locally incorporated subsidiary and a registered branch shapes liability, tax registration, banking, procurement eligibility and how easily the decision can be reversed.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/f855d337b_generated_b1025101.png",
		alt: "Modern African city skyline at dusk seen through an office window",
		sections: [
			{
				heading: "Two structures, two different exposures",
				paragraphs: ["A subsidiary is a separate legal entity owned by the parent. A branch is an extension of the foreign parent, registered locally to carry on business. Both are legitimate routes into a market, and both are available in most African jurisdictions — but they behave differently in ways that matter commercially.", "A subsidiary generally limits exposure to the assets of the local entity and can be sold or brought in local shareholders without disturbing the parent. A branch keeps the parent directly visible, which some counterparties prefer and others treat as a heavier commitment."]
			},
			{
				heading: "The criteria that usually decide it",
				paragraphs: ["Before comparing forms, the analysis should be settled on commercial questions, because they tend to be decisive."],
				bullets: [
					"Liability: what the parent is prepared to have exposed locally.",
					"Ownership rules: whether foreign ownership is restricted, and in what proportion, for the intended activity.",
					"Sector licensing: whether the licence is issued to a locally incorporated entity only.",
					"Tax registration and reporting: what the structure requires, and how group reporting is affected.",
					"Banking: what local banks require to open and operate an account.",
					"Procurement and eligibility: whether tender or supplier rules require local incorporation.",
					"Reversibility: how easily the structure can be converted or exited later.",
					"Governance: local director and company secretary requirements, and who will hold them."
				]
			},
			{
				heading: "Decisions that are expensive to reverse",
				paragraphs: ["Some choices are cheap to change; others are not. The ownership split, the shareholders' agreement, the reservation of the company name and the sector licence attached to an entity all sit in the expensive category. So does a branch registration that later needs to become a subsidiary.", "Time spent on the structure before incorporation is usually the cheapest advisory time in the whole project. The reverse is also true: correcting a structure after licences and bank accounts exist is materially more costly than getting it right first."]
			},
			{
				heading: "Who should advise on each part",
				paragraphs: ["The structure should not be settled by a single provider with an interest in one answer. Local corporate counsel advises on formation and ownership; a registered tax practitioner advises on tax registration and treatment; licensing advisers or sector specialists confirm what the activity requires; and the bank confirms what it will accept for account opening.", "Coordination adds value here by assembling those inputs in the right order, documenting the comparison, and then executing the agreed route without duplicating work across parties."]
			}
		],
		sourcesNote: "General practice note. It does not describe the company law of any specific country. Structure, ownership restrictions and licensing requirements are confirmed with qualified local counsel for the intended activity."
	},
	{
		slug: "building-a-compliance-calendar",
		title: "Building a Compliance Calendar That Survives Staff Changes",
		category: "Regulatory Compliance",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "5 min read",
		excerpt: "Recurring obligations are rarely missed because they are unknown. They are missed because the knowledge sits with one person. What a durable compliance register looks like.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/8ff216e6f_generated_ac1d3e2a.png",
		alt: "Minimalist corporate boardroom with glass partitions and natural daylight",
		sections: [
			{
				heading: "The failure mode is knowledge, not awareness",
				paragraphs: ["Most companies entering an African market learn their annual filing and renewal obligations during the establishment process. The obligations are known at that point. The difficulty comes two years later, when the person who handled the registration has moved on and nobody can say which returns were filed, when the trading licence expires, or where the evidence sits.", "A compliance calendar is therefore less a reminder tool than a record of institutional knowledge: what is due, to whom, how often, and who is responsible for it."]
			},
			{
				heading: "What belongs on the register",
				paragraphs: ["The register should cover every recurring obligation connected to the entity, not only the ones that attract a penalty."],
				bullets: [
					"Annual returns and corporate filings with the company registry.",
					"Tax registrations, periodic returns and payment deadlines.",
					"Sector licences and permits, with renewal lead times.",
					"Work permits and immigration status for expatriate staff.",
					"Statutory registers — members, directors, charges — and where they are held.",
					"Beneficial ownership filings and any change notifications.",
					"Data protection registration or notification, where required.",
					"Social security and payroll registrations.",
					"Registered office and local representative arrangements."
				]
			},
			{
				heading: "The fields that make it usable",
				paragraphs: ["A calendar with only a date in it becomes stale quickly. Each obligation should carry the entity, the authority, the frequency, the statutory or contractual deadline, the internal owner, the external professional responsible, the lead time required, the evidence of completion, and a status. Where a requirement has a source, the register should record it — with the date it was last verified.", "Recording the source matters more than it appears. Requirements change, and the difference between a remembered rule and a verified one is often the difference between a filed return and a penalty."]
			},
			{
				heading: "A rhythm that does not depend on memory",
				paragraphs: ["Practical cadence: a monthly review of everything due in the next 90 days; a 60-day trigger that opens the working file for each item; a 30-day escalation to the client and the responsible professional; and a completion step that files the evidence against the entry.", "Ownership should be recorded against a role rather than a person, so that a departure creates a handover task rather than a gap. The final control is a periodic completeness review: an independent check that the register still reflects the entity as it actually exists — new activities, new permits, new shareholders."]
			}
		],
		sourcesNote: "General practice note. Filing names, frequencies and penalties differ by jurisdiction and are confirmed against the relevant authority's published requirements and recorded with a verification date."
	},
	{
		slug: "selecting-local-professional-partners",
		title: "Selecting Local Professional Partners: A Due-Diligence Framework",
		category: "Market Entry",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "5 min read",
		excerpt: "Professional reliability matters more than the number of countries a provider advertises. How to verify a local partner before a client's filing depends on them.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/f66e10c35_generated_5daf77ad.png",
		alt: "Commercial port and logistics hub at dawn",
		sections: [
			{
				heading: "The weakest link is usually the network",
				paragraphs: ["A cross-border engagement succeeds or fails on the local practitioners involved. A well-researched plan executed by an unresponsive or unregistered partner produces exactly the outcome the research was meant to prevent.", "Provider lists grow faster than they are verified. A firm that appears on several countries' panels is not necessarily qualified in each of them, and coverage claims are rarely tested until a filing is already in progress."]
			},
			{
				heading: "Verify before you rely",
				paragraphs: ["Each of the following can be checked, and each should be documented before a client matter is assigned."],
				bullets: [
					"Professional registration and current practising status, with the relevant body.",
					"Qualifications and experience in the specific area of work, not just the sector.",
					"Disciplinary history, where the regulator publishes it.",
					"Professional indemnity insurance, with the policy's territorial and activity scope.",
					"Conflicts of interest, including work for competitors in the same matter.",
					"Service quality and responsiveness during the assessment itself.",
					"Pricing structure, disbursements and payment terms, in writing.",
					"Data protection and information security arrangements for client documents.",
					"Willingness to confirm in writing what they will not do."
				]
			},
			{
				heading: "Use a paid pilot",
				paragraphs: ["The most reliable assessment is a small piece of paid work with a real deadline. A pilot reveals response times, drafting quality, how the firm behaves when an authority asks a follow-up question, and whether its invoicing matches its quotation.", "Where the relationship continues, a written partner agreement should set out scope, confidentiality, data handling, fee basis, turnaround expectations and the fact that the client engages the professional directly where regulated work is involved."]
			},
			{
				heading: "Referral arrangements should be disclosed",
				paragraphs: ["Introductions between advisers are normal, and referral fees exist in many markets. What matters is disclosure. Undisclosed commissions compromise the independence of the recommendation and, in some jurisdictions, create regulatory exposure for both parties.", "The position we take is straightforward: referral relationships are disclosed to the client, fees for regulated work are agreed directly between the client and the professional, and coordination fees are stated separately."]
			}
		],
		sourcesNote: "General practice note. Registration and disciplinary checks are jurisdiction-specific and are performed against the relevant professional body's public register before engagement."
	},
	{
		slug: "data-protection-and-confidentiality-across-borders",
		title: "Data Protection and Confidentiality Across Borders",
		category: "Regulatory Compliance",
		date: "November 2026",
		lastVerified: "3 November 2026",
		readTime: "5 min read",
		excerpt: "Market-entry work concentrates sensitive information: passports, ownership chains, bank details, commercial plans. Handling it across several jurisdictions requires more than a confidentiality clause.",
		image: "https://media.base44.com/images/public/6aea19453516ad37b0a4842e/c237c821f_generated_8ec55bb6.png",
		alt: "Modern glass business district skyline at golden hour",
		sections: [
			{
				heading: "The data is unusually sensitive",
				paragraphs: ["Establishing a company requires identity documents for directors and beneficial owners, corporate constitutional documents, financial information, and often details of the commercial strategy behind the investment. Once an entity is operating, payroll, tax and banking information follow.", "That combination — personal data, corporate records and commercially sensitive plans — is exactly what data protection laws and commercial counterparties expect to be controlled."]
			},
			{
				heading: "Cross-border transfers are the difficult part",
				paragraphs: ["Several African data protection regimes restrict transfers of personal data outside the country unless specified conditions are met: adequacy, contractual safeguards, or consent. Because a single engagement routinely involves the client's head office, a coordinator, and professionals in two or three countries, the transfer question arises immediately rather than eventually.", "The practical answer is to decide the transfer route at onboarding: which parties receive personal data, on what basis, under which contractual terms, and for how long. Recording that in the engagement documentation is simpler than retrofitting it after a filing has been circulated."]
			},
			{
				heading: "Controls that actually reduce risk",
				paragraphs: ["Most incidents in advisory work are not sophisticated. They are documents sent to the wrong recipient, access that was never removed, or an archive kept long after the engagement ended."],
				bullets: [
					"Access limited to the people working on the engagement, reviewed when the team changes.",
					"Encrypted storage and transfer for identity and financial documents.",
					"A document management system rather than email attachments as the record of truth.",
					"Confidentiality undertakings from every professional and supplier who sees client files.",
					"A retention schedule, with deletion at the end of the defined period.",
					"A conflicts register, so that knowledge gained in one engagement is not used in another.",
					"A documented response plan for a suspected data breach, including notification obligations."
				]
			},
			{
				heading: "Why this is a commercial issue, not only a compliance one",
				paragraphs: ["International clients and their advisers increasingly ask about data handling during the selection process. Being able to answer specifically — where data is stored, who can access it, which jurisdiction it sits in, and when it is deleted — shortens that process and is often the difference in a competitive pitch.", "It also protects the coordinator. A professional indemnity policy is unlikely to respond as expected if the insurer was not told that client documents are held and transferred across several countries."]
			}
		],
		sourcesNote: "General practice note. Transfer restrictions, registration duties and breach-notification timelines differ by jurisdiction; the applicable regime is confirmed for each market in which data is held or processed."
	}
];
function getInsight(slug) {
	return INSIGHTS.find((item) => item.slug === slug);
}
// node_modules/.nitro/vite/services/ssr/assets/router-BCwh7kn0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function DefaultCatchBoundary({ error }) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col items-center gap-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorComponent, { error }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => router.invalidate(),
				children: "Try again"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: isRoot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Home"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: (e) => {
						e.preventDefault();
						window.history.back();
					},
					children: "Go back"
				})
			})]
		})]
	});
}
function NotFound({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-6xl font-semibold tracking-tight",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: children ?? "The page you are looking for does not exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => window.history.back(),
					children: "Go back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Start over"
					})
				})]
			})
		]
	});
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = z();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var src_default = "/assets/index-D2IuSPFF.css";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Africa Compliance" },
			{
				name: "description",
				content: "Market entry, business establishment and regulatory compliance coordination for international businesses across African markets."
			},
			{
				name: "theme-color",
				content: "#173F35"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: src_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {}),
	shellComponent: RootDocument,
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$10 = () => import("../_site-D2yEOICL.mjs");
var Route$11 = createFileRoute("/_site")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_site-OUBQ_lPz.mjs");
var Route$10 = createFileRoute("/_site/")({
	head: () => ({ meta: [
		{ title: "Africa Compliance | Market Entry, Business Establishment & Compliance in Africa" },
		{
			name: "description",
			content: "Africa Compliance helps international businesses, investors and entrepreneurs enter and operate across African markets — market entry advisory, business establishment coordination and regulatory compliance support."
		},
		{
			name: "keywords",
			content: "doing business in Africa, market entry Africa, business establishment in Africa, business compliance Africa, company registration coordination Africa, expanding into African markets"
		},
		{
			property: "og:title",
			content: "Africa Compliance | Your Gateway to Doing Business in Africa"
		},
		{
			property: "og:description",
			content: "Market entry, business establishment and regulatory compliance coordination across African markets."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_libs/_5.mjs").then((n) => n.about_exports);
var Route$9 = createFileRoute("/_site/about")({
	head: () => ({ meta: [
		{ title: "About Africa Compliance | Market Entry & Compliance Coordination" },
		{
			name: "description",
			content: "Africa Compliance supports foreign companies, investors and international businesses establishing and operating across African markets. Learn about our purpose, mission, values and coordination approach."
		},
		{
			name: "keywords",
			content: "Africa Compliance, business establishment Africa, compliance coordination Africa, market entry advisory"
		},
		{
			property: "og:title",
			content: "About Africa Compliance"
		},
		{
			property: "og:description",
			content: "Our purpose, mission and approach to business establishment and compliance coordination across African markets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./contact-gj-LoeNV.mjs");
var Route$8 = createFileRoute("/_site/contact")({
	head: () => ({ meta: [
		{ title: "Contact Africa Compliance | Business Entry Enquiries" },
		{
			name: "description",
			content: "Contact Africa Compliance about market entry, business establishment or regulatory compliance in African markets. Email hi@africomp.org, call or WhatsApp +256 704 345 771."
		},
		{
			name: "keywords",
			content: "contact Africa Compliance, business entry Africa enquiry, market entry consultation Africa"
		},
		{
			property: "og:title",
			content: "Contact Africa Compliance"
		},
		{
			property: "og:description",
			content: "Tell us about your business plans and market-entry requirements."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./markets-CBdlV33A.mjs");
var Route$7 = createFileRoute("/_site/markets")({
	head: () => ({ meta: [
		{ title: "Markets | East, West and Southern Africa Coverage | Africa Compliance" },
		{
			name: "description",
			content: "Africa Compliance focuses on East Africa (Uganda, Kenya, Tanzania, Rwanda), West Africa (Ghana, Nigeria) and Southern Africa (South Africa) — markets under assessment as part of a phased approach."
		},
		{
			name: "keywords",
			content: "doing business in Uganda, Kenya business establishment, Tanzania market entry, Rwanda company registration, Ghana Nigeria South Africa business compliance"
		},
		{
			property: "og:title",
			content: "Markets | Africa Compliance"
		},
		{
			property: "og:description",
			content: "A structured, phased approach to market coverage across East, West and Southern Africa."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./privacy-D1xzXOrb.mjs");
var Route$6 = createFileRoute("/_site/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy | Africa Compliance" },
		{
			name: "description",
			content: "How Africa Compliance collects, uses, shares and retains personal information submitted through this website and in the course of client engagements."
		},
		{
			property: "og:title",
			content: "Privacy Policy | Africa Compliance"
		},
		{
			property: "og:description",
			content: "How Africa Compliance handles personal and corporate information across engagements."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./services-D5rTtPqG.mjs");
var Route$5 = createFileRoute("/_site/services")({
	head: () => ({ meta: [
		{ title: "Services | Market Entry, Business Establishment & Compliance in Africa" },
		{
			name: "description",
			content: "Market entry advisory, business establishment coordination, legal and regulatory compliance coordination, and ongoing compliance support for international businesses entering African markets."
		},
		{
			name: "keywords",
			content: "market entry Africa, company registration coordination Africa, business establishment Africa, regulatory compliance Africa, ongoing compliance support"
		},
		{
			property: "og:title",
			content: "Services | Africa Compliance"
		},
		{
			property: "og:description",
			content: "Four coordinated areas of support for businesses entering and operating across African markets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./team-BVuNmS5d.mjs");
var Route$4 = createFileRoute("/_site/team")({
	head: () => ({ meta: [
		{ title: "Our Team | Africa Compliance" },
		{
			name: "description",
			content: "The partners of Africa Compliance, led by Mr. Wodenga Cyrus Woboya, Advocate of the High Court of Uganda, and how client mandates are staffed."
		},
		{
			name: "keywords",
			content: "Africa Compliance team, market entry advisers Uganda, compliance coordination partners"
		},
		{
			property: "og:title",
			content: "Our Team | Africa Compliance"
		},
		{
			property: "og:description",
			content: "The partners of Africa Compliance and how client mandates are staffed across African markets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./terms-CSaTY1sY.mjs");
var Route$3 = createFileRoute("/_site/terms")({
	head: () => ({ meta: [
		{ title: "Terms & Conditions | Africa Compliance" },
		{
			name: "description",
			content: "Terms governing use of the Africa Compliance website, the basis on which enquiries are received, and the boundaries of our coordination services."
		},
		{
			property: "og:title",
			content: "Terms & Conditions | Africa Compliance"
		},
		{
			property: "og:description",
			content: "The basis on which this website and our coordination services are offered."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$2 = createFileRoute("/api/time")({ server: { handlers: { GET: async () => Response.json({ now: (/* @__PURE__ */ new Date()).toISOString() }, { headers: { "cache-control": "no-store" } }) } } });
var $$splitComponentImporter$1 = () => import("./blog.index-aMzcoYFo.mjs");
var Route$1 = createFileRoute("/_site/blog/")({
	head: () => ({ meta: [
		{ title: "Blog | Market Entry and Compliance in African Markets" },
		{
			name: "description",
			content: "Perspective on entering and operating in African markets: establishment considerations, market entry planning and managing regulatory compliance across jurisdictions."
		},
		{
			name: "keywords",
			content: "Africa compliance blog, business expansion Africa, regulatory compliance foreign investors, establishing a business in Africa"
		},
		{
			property: "og:title",
			content: "Blog | Africa Compliance"
		},
		{
			property: "og:description",
			content: "Perspective on market entry, business establishment and compliance across African markets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./blog._slug-DpEZeSIp.mjs");
var Route = createFileRoute("/_site/blog/$slug")({
	head: ({ params }) => {
		const article = getInsight(params.slug);
		return { meta: [
			{ title: article ? `${article.title} | Africa Compliance` : "Blog | Africa Compliance" },
			{
				name: "description",
				content: article?.excerpt ?? "Perspective on market entry, business establishment and regulatory compliance across African markets."
			},
			{
				property: "og:title",
				content: article?.title ?? "Blog | Africa Compliance"
			},
			{
				property: "og:description",
				content: article?.excerpt ?? ""
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SiteRoute = Route$11.update({
	id: "/_site",
	getParentRoute: () => Route$12
});
var SiteIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => SiteRoute
});
var SiteAboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => SiteRoute
});
var SiteContactRoute = Route$8.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => SiteRoute
});
var SiteMarketsRoute = Route$7.update({
	id: "/markets",
	path: "/markets",
	getParentRoute: () => SiteRoute
});
var SitePrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => SiteRoute
});
var SiteServicesRoute = Route$5.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => SiteRoute
});
var SiteTeamRoute = Route$4.update({
	id: "/team",
	path: "/team",
	getParentRoute: () => SiteRoute
});
var SiteTermsRoute = Route$3.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => SiteRoute
});
var ApiTimeRoute = Route$2.update({
	id: "/api/time",
	path: "/api/time",
	getParentRoute: () => Route$12
});
var SiteBlogIndexRoute = Route$1.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => SiteRoute
});
var SiteRouteChildren = {
	SiteAboutRoute,
	SiteContactRoute,
	SiteMarketsRoute,
	SitePrivacyRoute,
	SiteServicesRoute,
	SiteTeamRoute,
	SiteTermsRoute,
	SiteIndexRoute,
	SiteBlogSlugRoute: Route.update({
		id: "/blog/$slug",
		path: "/blog/$slug",
		getParentRoute: () => SiteRoute
	}),
	SiteBlogIndexRoute
};
var rootRouteChildren = {
	SiteRoute: SiteRoute._addFileChildren(SiteRouteChildren),
	ApiTimeRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var createQueryClient = () => new QueryClient({ defaultOptions: { queries: {
	staleTime: 3e4,
	refetchOnWindowFocus: false
} } });
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = createQueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {}),
		scrollRestoration: true
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
}
export { INSIGHTS, Route, __exportAll, cn, getInsight, getRouter, router_exports };
