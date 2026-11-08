import { __toESM } from "../_runtime.mjs";
import { PageHero } from "./PageHero-D7P1rrHM.mjs";
import { CONTACT, MARKETS } from "./site-ACj0XDsT.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { ArrowUpRight } from "../_libs/lucide-react.mjs";
import { CircleCheck, MapPin } from "../_libs/lucide-react6.mjs";
import { Mail, Phone } from "../_libs/lucide-react8.mjs";
import { MessageCircle } from "../_libs/lucide-react10.mjs";
// node_modules/.nitro/vite/services/ssr/assets/contact-gj-LoeNV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COUNTRIES = [
	...MARKETS.flatMap((group) => group.countries.map((country) => country.name)),
	"Another African market",
	"Not yet decided"
];
var NATURE = [
	"Market entry advisory",
	"Business establishment",
	"Legal and regulatory compliance",
	"Ongoing compliance support",
	"General enquiry"
];
var FIELD = "w-full border border-forest/20 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper/30";
var LABEL = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70";
var EMPTY = {
	name: "",
	company: "",
	email: "",
	phone: "",
	country: "",
	nature: "",
	message: ""
};
function EnquiryForm() {
	const [values, setValues] = (0, import_react.useState)(EMPTY);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	const update = (field) => (event) => {
		setValues((prev) => ({
			...prev,
			[field]: event.target.value
		}));
		setErrors((prev) => ({
			...prev,
			[field]: void 0
		}));
	};
	const validate = () => {
		const next = {};
		if (values.name.trim().length < 2) next.name = "Please enter your name.";
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) next.email = "Please enter a valid email address.";
		if (values.message.trim().length < 10) next.message = "Please give us a little more detail (at least 10 characters).";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (!validate()) return;
		const subject = `Website enquiry${values.company.trim() ? ` from ${values.company.trim()}` : ""}`;
		const body = [
			`Name: ${values.name.trim()}`,
			`Company: ${values.company.trim() || "Not provided"}`,
			`Email: ${values.email.trim()}`,
			`Phone: ${values.phone.trim() || "Not provided"}`,
			`Country of interest: ${values.country || "Not provided"}`,
			`Nature of enquiry: ${values.nature || "Not provided"}`,
			"",
			"Message:",
			values.message.trim()
		].join("\n");
		setStatus("draft");
		window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	};
	if (status === "draft") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-forest/15 bg-cream p-8 lg:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				className: "h-8 w-8 text-copper",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-[26px] leading-snug text-forest",
				children: "Your email draft is ready."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-[14.5px] leading-[1.75] text-ink/70",
				children: [
					"Your email application should open with your enquiry details filled in. Please send the email to complete your enquiry. If it does not open, contact us directly at ",
					CONTACT.email,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: CONTACT.whatsapp,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center justify-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper",
					children: "Message on WhatsApp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStatus("idle"),
					className: "inline-flex items-center justify-center gap-2 border border-forest/20 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:border-copper hover:text-copper",
					children: "Send another enquiry"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		noValidate: true,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: LABEL,
							htmlFor: "name",
							children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-copper",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "name",
							name: "name",
							className: FIELD,
							value: values.name,
							onChange: update("name"),
							"aria-invalid": Boolean(errors.name),
							"aria-describedby": errors.name ? "name-error" : void 0,
							autoComplete: "name"
						}),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "name-error",
							className: "mt-1.5 text-[12px] text-destructive",
							children: errors.name
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: LABEL,
						htmlFor: "company",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "company",
						name: "company",
						className: FIELD,
						value: values.company,
						onChange: update("company"),
						autoComplete: "organization"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: LABEL,
							htmlFor: "email",
							children: ["Email address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-copper",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							name: "email",
							type: "email",
							className: FIELD,
							value: values.email,
							onChange: update("email"),
							"aria-invalid": Boolean(errors.email),
							"aria-describedby": errors.email ? "email-error" : void 0,
							autoComplete: "email"
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "email-error",
							className: "mt-1.5 text-[12px] text-destructive",
							children: errors.email
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: LABEL,
						htmlFor: "phone",
						children: "Telephone number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "phone",
						name: "phone",
						type: "tel",
						className: FIELD,
						value: values.phone,
						onChange: update("phone"),
						autoComplete: "tel"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: LABEL,
						htmlFor: "country",
						children: "Country of interest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "country",
						name: "country",
						className: FIELD,
						value: values.country,
						onChange: update("country"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select a market"
						}), COUNTRIES.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: country,
							children: country
						}, country))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: LABEL,
						htmlFor: "nature",
						children: "Nature of enquiry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "nature",
						name: "nature",
						className: FIELD,
						value: values.nature,
						onChange: update("nature"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select a category"
						}), NATURE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item,
							children: item
						}, item))]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: LABEL,
					htmlFor: "message",
					children: ["Message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-copper",
						children: "*"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "message",
					name: "message",
					rows: 6,
					className: FIELD,
					value: values.message,
					onChange: update("message"),
					placeholder: "Your business, the market you are considering and what you would like to achieve.",
					"aria-invalid": Boolean(errors.message),
					"aria-describedby": errors.message ? "message-error" : void 0
				}),
				errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "message-error",
					className: "mt-1.5 text-[12px] text-destructive",
					children: errors.message
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue by email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11.5px] leading-relaxed text-ink/45",
					children: [
						"Fields marked ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-copper",
							children: "*"
						}),
						" are required."
					]
				})]
			})
		]
	});
}
var DIRECT = [
	{
		icon: Mail,
		label: "Email",
		value: CONTACT.email,
		href: `mailto:${CONTACT.email}`,
		note: "Preferred for detailed enquiries"
	},
	{
		icon: Phone,
		label: "Telephone",
		value: CONTACT.phoneDisplay,
		href: CONTACT.phoneHref,
		note: "Weekdays, East Africa Time"
	},
	{
		icon: MessageCircle,
		label: "WhatsApp",
		value: "Message us directly",
		href: CONTACT.whatsapp,
		note: "Opens WhatsApp",
		external: true
	}
];
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Tell Us About Your Business Plans.",
		intro: "Share the market you are considering and the nature of your plans. We will respond with a considered view of what the process involves and how it can be coordinated."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid gap-14 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-[27px] leading-[1.15] text-forest sm:text-[32px]",
					children: "Africa Compliance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[14px] leading-relaxed text-ink/60",
					children: "Market-entry and compliance coordination for international businesses across African markets."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 divide-y divide-forest/10 border-y border-forest/10",
					children: DIRECT.map(({ icon: Icon, label, value, href, note, external }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href,
							...external ? {
								target: "_blank",
								rel: "noopener noreferrer"
							} : {},
							className: "group flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 grid h-9 w-9 shrink-0 place-items-center border border-forest/15 text-copper transition-colors group-hover:border-copper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[10.5px] uppercase tracking-[0.16em] text-ink/45",
									children: label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[15.5px] text-forest transition-colors group-hover:text-copper",
									children: value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-[11.5px] text-ink/40",
									children: note
								})
							] })]
						})
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-start gap-3 text-[13px] leading-relaxed text-ink/55",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "mt-0.5 h-4 w-4 shrink-0 text-copper",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Correspondence address: Kampala, Uganda. Enquiries are received by email, telephone and WhatsApp, and meetings can be arranged by appointment." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: CONTACT.whatsapp,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-forest px-6 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), "Chat with us on WhatsApp"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-forest/12 bg-cream p-6 sm:p-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[24px] leading-snug text-forest",
						children: "A briefing, not a contact box."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2.5 text-[13.5px] leading-relaxed text-ink/60",
						children: "The more context you provide, the more useful our first response will be."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryForm, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 border-t border-forest/12 pt-5 text-[11.5px] leading-relaxed text-ink/45",
						children: "Submitting an enquiry does not create a client relationship and does not constitute formal legal, tax or other professional advice. Africa Compliance is not a law firm; where regulated professional services are required, they may be coordinated through appropriately qualified and authorised local professionals."
					})
				]
			})]
		})
	})] });
}
export { ContactPage as component };
