import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { POLICIES } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Policies | Logica Infoway",
  description: "Corporate governance policies of Logica Infoway Limited.",
};

export default function PoliciesPage() {
  return <DocListPage title="Policies" docs={POLICIES} />;
}
