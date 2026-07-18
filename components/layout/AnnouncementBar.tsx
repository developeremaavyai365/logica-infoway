import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { CONTACT_EMAIL } from "@/lib/nav";

/**
 * Top announcement strip — dark bar with contact email, a rotating deal message,
 * and order tracking. A thin brand-gradient hairline sits above it.
 */
export function AnnouncementBar() {
  return (
    <div className="relative bg-neutral-950 text-neutral-200">
      {/* brand hairline */}
      <div className="h-0.5 w-full bg-brand-gradient" />

      <div className="mx-auto flex h-10 max-w-[88rem] items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white"
          >
            <FiMail className="h-3.5 w-3.5 text-highlight" />
            <span className="font-medium">Email:</span>
            <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
          </a>

          <span className="hidden h-3 w-px bg-white/20 md:inline" />

          <p className="hidden min-w-0 truncate md:block">
            <span className="font-semibold text-highlight">Today&apos;s Deal:</span>{" "}
            Signup for Newsletter to get flat discount offers!
          </p>
        </div>

        <Link
          href="/order-tracking"
          className="whitespace-nowrap font-medium transition-colors hover:text-white"
        >
          Order Tracking
        </Link>
      </div>
    </div>
  );
}
