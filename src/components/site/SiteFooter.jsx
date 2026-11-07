import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MessageCircle } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";
import { CONTACT, DISCLAIMER, NAV, SERVICES } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="bg-forest text-white">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Supporting international businesses navigating market entry, business establishment
              and regulatory compliance across African markets.
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-copper hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>

          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    hash={service.id}
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-copper" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-copper" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/35">
              Enquiries by appointment
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-white/40">{DISCLAIMER}</p>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-white/35">
            Country coverage shown on this website represents markets under assessment or
            planned, not a confirmed operational presence. No office, licence, accreditation or
            partnership is implied unless expressly stated.
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Africa Compliance. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms &amp; Conditions
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                Enquire
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}