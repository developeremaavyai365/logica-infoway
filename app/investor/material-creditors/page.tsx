import type { Metadata } from "next";
import { DocListPage } from "@/components/investor/DocListPage";
import { MATERIAL_CREDITORS_DOC } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Material Creditors | Logica Infoway",
  description: "Material creditors disclosure of Logica Infoway Limited.",
};

export default function MaterialCreditorsPage() {
  return <DocListPage title="Material Creditors" docs={[MATERIAL_CREDITORS_DOC]} />;
}
