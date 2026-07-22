import Image from "next/image";
import Link from "next/link";

/** Real "order type" tiles from logicainfoway.com's homepage footer —
 *  Corporate, Educational, and the company's real CSR initiative,
 *  Super Soul Foundation. Real photos, real copy, real link. */
const ORDER_TYPES = [
  {
    label: "Corporate Orders",
    tagline: "Work in sync with your team",
    image: "/images/corporate-orders.jpg",
    href: "/shop",
  },
  {
    label: "Educational Orders",
    tagline: "Experience the new way of learning",
    image: "/images/educational-orders.jpg",
    href: "/shop",
  },
  {
    label: "Super Soul Foundation",
    tagline: "For the betterment of the nation",
    image: "/images/supersoul-foundation.jpg",
    href: "https://www.supersoulfoundation.com/index.php",
    external: true,
  },
];

export function KanvaOrderTypesSection() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {ORDER_TYPES.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            {...(tile.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group relative flex h-[22rem] items-end overflow-hidden sm:h-[26rem]"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-6 lg:p-8">
              <p className="font-display text-xl font-bold uppercase tracking-[0.08em] text-white lg:text-2xl">
                {tile.label}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/75 lg:text-sm">
                {tile.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
