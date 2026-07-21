import type { Metadata } from "next";
import { FolderListPage } from "@/components/investor/FolderListPage";
import { CORPORATE_ANNOUNCEMENT_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Corporate Announcement | Logica Infoway",
  description: "Corporate announcements and compliance filings of Logica Infoway Limited, by fiscal year.",
};

export default function CorporateAnnouncementPage() {
  return <FolderListPage title="Corporate Announcement" periods={CORPORATE_ANNOUNCEMENT_PERIODS} />;
}
