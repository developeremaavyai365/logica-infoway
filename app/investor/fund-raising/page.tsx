import type { Metadata } from "next";
import { FolderListPage } from "@/components/investor/FolderListPage";
import { FUND_RAISING_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Fund Raising | Logica Infoway",
  description: "Fund raising disclosures of Logica Infoway Limited, by fiscal year.",
};

export default function FundRaisingPage() {
  return <FolderListPage title="Fund Raising" periods={FUND_RAISING_PERIODS} />;
}
