import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONTACT, MARKETS } from "@/data/site";

const COUNTRIES = [
  ...MARKETS.flatMap((group) => group.countries.map((country) => country.name)),
  "Another African market",
  "Not yet decided",
];

const NATURE = [
  "Market entry advisory",
  "Business establishment",
  "Legal and regulatory compliance",
  "Ongoing compliance support",
  "General enquiry",
];

const FIELD =
  "w-full border border-forest/20 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink/35 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper/30";
const LABEL = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70";

const EMPTY = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  nature: "",
  message: "",
};

export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Please give us a little more detail (at least 10 characters).";
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
      values.message.trim(),
    ].join("\n");
    setStatus("draft");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (status === "draft") {
    return (
      <div className="border border-forest/15 bg-cream p-8 lg:p-10">
        <CheckCircle2 className="h-8 w-8 text-copper" aria-hidden="true" />
        <h2 className="mt-5 font-display text-[26px] leading-snug text-forest">
          Your email draft is ready.
        </h2>
        <p className="mt-3 text-[14.5px] leading-[1.75] text-ink/70">
          Your email application should open with your enquiry details filled in. Please send the email to complete your enquiry. If it does not open, contact us directly at {CONTACT.email}.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-forest px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-copper"
          >
            Message on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex items-center justify-center gap-2 border border-forest/20 px-6 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:border-copper hover:text-copper"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Name <span className="text-copper">*</span>
          </label>
          <input
            id="name"
            name="name"
            className={FIELD}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[12px] text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className={LABEL} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            className={FIELD}
            value={values.company}
            onChange={update("company")}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Email address <span className="text-copper">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={FIELD}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-[12px] text-destructive">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">
            Telephone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={FIELD}
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="country">
            Country of interest
          </label>
          <select
            id="country"
            name="country"
            className={FIELD}
            value={values.country}
            onChange={update("country")}
          >
            <option value="">Select a market</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="nature">
            Nature of enquiry
          </label>
          <select
            id="nature"
            name="nature"
            className={FIELD}
            value={values.nature}
            onChange={update("nature")}
          >
            <option value="">Select a category</option>
            {NATURE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          Message <span className="text-copper">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={FIELD}
          value={values.message}
          onChange={update("message")}
          placeholder="Your business, the market you are considering and what you would like to achieve."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-[12px] text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2.5 bg-copper px-7 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          <>
            Continue by email
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </>
        </button>
        <p className="text-[11.5px] leading-relaxed text-ink/45">
          Fields marked <span className="text-copper">*</span> are required.
        </p>
      </div>
    </form>
  );
}