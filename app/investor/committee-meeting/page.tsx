import type { Metadata } from "next";
import { FolderListPage } from "@/components/investor/FolderListPage";
import { COMMITTEE_MEETING_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Committee Meeting | Logica Infoway",
  description: "Committee meeting notices of Logica Infoway Limited, by fiscal year.",
};

export default function CommitteeMeetingPage() {
  return <FolderListPage title="Committee Meeting" periods={COMMITTEE_MEETING_PERIODS} />;
}
