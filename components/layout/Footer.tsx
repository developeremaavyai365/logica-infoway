import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { FiChevronRight, FiPhone } from "react-icons/fi";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { COMPANY, FOOTER_COLUMNS, SOCIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

const socialMeta: Record<string, { icon: React.ReactNode; color: string }> = {
  facebook: { icon: <FaFacebookF className="h-4 w-4" />, color: "#1877F2" },
  twitter: { icon: <FaXTwitter className="h-4 w-4" />, color: "#1DA1F2" },
  instagram: { icon: <FaInstagram className="h-4 w-4" />, color: "#E4405F" },
  linkedin: { icon: <FaLinkedinIn className="h-4 w-4" />, color: "#0A66C2" },
  pinterest: { icon: <FaPinterestP className="h-4 w-4" />, color: "#BD081C" },
};

/** Section heading with the brand-gradient underline accent. */
function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="relative pb-2 text-base font-semibold text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-10 rounded-full bg-brand-gradient" />
    </h4>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("relative overflow-hidden border-t border-white/10", className)}>
      <video
        src="/videos/footer-bg.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/75" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <ColTitle>{col.title}</ColTitle>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      <FiChevronRight className="h-4 w-4 text-sky-400 transition-transform group-hover:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + socials + online order */}
          <div>
            <ColTitle>Newsletter</ColTitle>
            <p className="mt-5 text-sm text-white/70">
              Stay in touch with us, get product updates, offers, discounts directly to your inbox
            </p>
            <NewsletterForm
              className="mt-4"
              placeholder="Enter Your email address..."
              submitLabel="Submit"
              note="Your Email is Secure With Us."
            />

            <div className="mt-6">
              <ColTitle>Follow Us On</ColTitle>
              <div className="mt-4 flex items-center gap-2.5">
                {SOCIALS.map((s) => {
                  const meta = socialMeta[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{ "--fill": meta.color } as React.CSSProperties}
                      className="social-flip inline-flex h-9 w-9 items-center justify-center rounded-full bg-white"
                    >
                      <span className="social-flip-icon">{meta.icon}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <ColTitle>For Online Order</ColTitle>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <FiPhone className="h-4 w-4 text-sky-400" />
                <a href={`tel:${COMPANY.orderPhone.replace(/\s/g, "")}`} className="font-medium text-white">
                  {COMPANY.orderPhone}
                </a>
              </div>
              <p className="mt-1 text-xs text-white/60">[{COMPANY.orderHours}]</p>
            </div>
          </div>
        </div>

        {/* Centered company block */}
        <div className="mt-14 border-t border-white/15 pt-10 text-center">
          <h3 className="font-display text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-3xl">
            {COMPANY.legalName}
          </h3>
          <p className="mt-1 text-sm text-white/60">({COMPANY.formerName})</p>
          <p className="mt-3 text-sm text-white/70">
            Registered Office: {COMPANY.registeredOffice}
          </p>
          <p className="mt-1 text-sm text-white/70">
            Telephone No.: {COMPANY.telephone} &nbsp;||&nbsp; email:{" "}
            <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">
              {COMPANY.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-white/70">CIN: {COMPANY.cin}</p>
          <p className="mt-1 text-sm text-white/70">GSTIN: {COMPANY.gstin}</p>
        </div>
      </div>
    </footer>
  );
}
