import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";
import { CONTACT, NAV } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 180 && y > last + 4);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="hidden bg-forest text-white/70 lg:block">
        <div className="shell flex h-10 items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <p>Market-entry and compliance coordination across African markets</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-copper">
              {CONTACT.email}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href={CONTACT.phoneHref} className="transition-colors hover:text-copper">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-forest/10 bg-white/95 backdrop-blur-md transition-transform duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active =
                mounted &&
                (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative py-2 text-[13px] font-medium tracking-wide transition-colors",
                    active ? "text-forest" : "text-ink/65 hover:text-forest",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-copper transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 bg-copper px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-forest sm:inline-flex"
            >
              Discuss your plans
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center border border-forest/20 text-forest transition-colors hover:border-copper hover:text-copper lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-forest px-5 py-8 text-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col divide-y divide-white/10">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl tracking-tight text-white/90"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-copper" aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex w-full items-center justify-center gap-2 bg-copper px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            Discuss your business plans
          </Link>
          <div className="mt-8 space-y-2 text-sm text-white/60">
            <a href={`mailto:${CONTACT.email}`} className="block hover:text-copper">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="block hover:text-copper">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}