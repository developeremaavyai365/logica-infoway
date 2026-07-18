import { KanvaHeader } from "@/components/kanva/KanvaHeader";

/** Shared cinematic shell (dark canvas + KanvaHeader) for all store-facing
 *  routes: shop, product, cart, wishlist, compare, account. */
export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <KanvaHeader />
      {children}
    </div>
  );
}
