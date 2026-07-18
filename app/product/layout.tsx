import { StoreShell } from "@/components/layout/StoreShell";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell>{children}</StoreShell>;
}
