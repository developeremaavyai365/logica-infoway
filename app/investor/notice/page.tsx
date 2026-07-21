import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { NOTICE_DOC } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Notice | Logica Infoway",
  description: "Shareholder notice of Logica Infoway Limited.",
};

export default function NoticePage() {
  return <DocListPage title="Notice" docs={[NOTICE_DOC]} />;
}
