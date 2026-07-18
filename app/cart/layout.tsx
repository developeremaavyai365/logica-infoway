import { StoreShell } from "@/components/layout/StoreShell";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell>{children}</StoreShell>;
}
