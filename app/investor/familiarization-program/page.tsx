import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { FAMILIARIZATION_PROGRAM_DOC } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Familiarization Program | Logica Infoway",
  description: "Familiarization program for independent directors of Logica Infoway Limited.",
};

export default function FamiliarizationProgramPage() {
  return <DocListPage title="Familiarization Program" docs={[FAMILIARIZATION_PROGRAM_DOC]} />;
}
