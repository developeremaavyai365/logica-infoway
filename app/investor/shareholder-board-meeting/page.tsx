import type { Metadata } from "next";
import { FolderListPage } from "@/components/investor/FolderListPage";
import { SHAREHOLDER_BOARD_MEETING_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Board Meeting — Shareholder Information | Logica Infoway",
  description: "Board meeting notices for shareholders of Logica Infoway Limited, by fiscal year.",
};

export default function ShareholderBoardMeetingPage() {
  return <FolderListPage title="Board Meeting" periods={SHAREHOLDER_BOARD_MEETING_PERIODS} />;
}
