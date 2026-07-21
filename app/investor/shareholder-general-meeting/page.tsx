import type { Metadata } from "next";
import { FolderListPage } from "@/components/investor/FolderListPage";
import { SHAREHOLDER_GENERAL_MEETING_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "General Meeting — Shareholder Information | Logica Infoway",
  description: "General meeting notices for shareholders of Logica Infoway Limited, by fiscal year.",
};

export default function ShareholderGeneralMeetingPage() {
  return <FolderListPage title="General Meeting" periods={SHAREHOLDER_GENERAL_MEETING_PERIODS} />;
}
