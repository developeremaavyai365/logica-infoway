import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { SHAREHOLDING_PATTERN } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Shareholding Pattern | Logica Infoway",
  description: "Shareholding pattern filings of Logica Infoway Limited.",
};

export default function ShareholdingPatternPage() {
  return <DocListPage title="Shareholding Pattern" docs={SHAREHOLDING_PATTERN} />;
}
