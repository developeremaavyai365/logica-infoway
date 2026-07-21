import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { PROSPECTUS_DOC } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Prospectus | Logica Infoway",
  description: "Prospectus of Logica Infoway Limited.",
};

export default function ProspectusPage() {
  return <DocListPage title="Prospectus" docs={[PROSPECTUS_DOC]} />;
}
