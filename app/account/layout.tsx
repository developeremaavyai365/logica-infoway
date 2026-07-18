import { StoreShell } from "@/components/layout/StoreShell";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <StoreShell>{children}</StoreShell>;
}
