/** Real annual reports, mirrored from logicainfoway.com/annual-report.
 *  PDFs are linked to the source site directly rather than re-hosted. */

export interface AnnualReport {
  title: string;
  year: string;
  url: string;
}

export const ANNUAL_REPORTS: AnnualReport[] = [
  {
    title: "Realigned Annual Report 2024-25",
    year: "2024-25",
    url: "https://www.logicainfoway.com/wp-content/uploads/2025/09/Realligned-Annual-Report-2024-25.pdf",
  },
  {
    title: "Annual Report 2023-24",
    year: "2023-24",
    url: "https://www.logicainfoway.com/wp-content/uploads/2024/07/ANNUAL-REPORT-2023-24.pdf",
  },
  {
    title: "Annual Report 2022-23",
    year: "2022-23",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/07/ANNUAL-REPORT-Eastern-Logica.pdf",
  },
  {
    title: "Annual Report 2021-22",
    year: "2021-22",
    url: "https://www.logicainfoway.com/wp-content/uploads/2022/10/AUDIT-REPORT-ELIL_MERGED-FY-2021-22.pdf",
  },
  {
    title: "Annual Report 2020-21",
    year: "2020-21",
    url: "https://www.logicainfoway.com/wp-content/uploads/2022/08/Annual-Report-F-Y-2020-2021.pdf",
  },
  {
    title: "Annual Report 2019-20",
    year: "2019-20",
    url: "https://www.logicainfoway.com/wp-content/uploads/2022/08/Annual-Report-F-Y-2019-20.pdf",
  },
];

/** Real annual returns (MGT forms), mirrored from logicainfoway.com/annual-return. */
export const ANNUAL_RETURNS: AnnualReport[] = [
  {
    title: "Annual Return 2024-25",
    year: "2024-25",
    url: "https://www.logicainfoway.com/wp-content/uploads/2026/03/Annual-Return-2024-25.pdf",
  },
  {
    title: "Annual Return 2023-24",
    year: "2023-24",
    url: "https://www.logicainfoway.com/wp-content/uploads/2024/10/Annual-Return-2023-24-2.pdf",
  },
  {
    title: "Annual Return 2022-23",
    year: "2022-23",
    url: "https://www.logicainfoway.com/wp-content/uploads/2024/03/Annual-Return-2022-23.pdf",
  },
  {
    title: "Annual Return 2021-22",
    year: "2021-22",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/01/ANNUAL-RETURN-21-22.pdf",
  },
  {
    title: "Annual Return 2020-21",
    year: "2020-21",
    url: "https://www.logicainfoway.com/wp-content/uploads/2022/08/ELIL-MGT-F-Y-2020-21.pdf",
  },
  {
    title: "Annual Return 2019-20",
    year: "2019-20",
    url: "https://www.logicainfoway.com/wp-content/uploads/2022/08/ELIL-MGT-2019-20.pdf",
  },
];

/** Fiscal-year folder, used by Board Meeting / General Meeting — each real
 *  period links out to the source site's own listing page (the documents
 *  within each folder are nested a level deeper than is worth mirroring). */
export interface FiscalYearFolder {
  label: string;
  url: string;
}

/** Real board meeting notice periods, mirrored from
 *  logicainfoway.com/notice-of-board-meeting. */
export const BOARD_MEETING_PERIODS: FiscalYearFolder[] = [
  { label: "01-04-2026 to 31-03-2027", url: "https://www.logicainfoway.com/01-04-2026-to-31-03-2027-3-4/" },
  { label: "01-04-2025 to 31-03-2026", url: "https://www.logicainfoway.com/01-04-2025-to-31-03-2026-11" },
  { label: "01-04-2024 to 31-03-2025", url: "https://www.logicainfoway.com/board-meeting-2/" },
  { label: "01-04-2023 to 31-03-2024", url: "https://www.logicainfoway.com/01-04-2023-to-31-03-2024-2/" },
];

/** Real general meeting notice periods, mirrored from
 *  logicainfoway.com/general-meeting. */
export const GENERAL_MEETING_PERIODS: FiscalYearFolder[] = [
  { label: "01-04-2026 to 31-03-2027", url: "https://www.logicainfoway.com/01-04-2026-to-31-03-2027-3-5/" },
  { label: "01-04-2025 to 31-03-2026", url: "https://www.logicainfoway.com/01-04-2025-to-31-03-2026-9-2/" },
  { label: "01-04-2024 to 31-03-2025", url: "https://www.logicainfoway.com/01-04-2023-to-31-03-2024-4/" },
  { label: "01-04-2023 to 31-03-2024", url: "https://www.logicainfoway.com/01-04-2023-to-31-03-2024-7/" },
];

/** Real financial results, mirrored from logicainfoway.com/financial-results. */
export const FINANCIAL_RESULTS: AnnualReport[] = [
  {
    title: "Financial Results for Half Year and Financial Year Ended 31-03-2026",
    year: "2025-26",
    url: "https://www.logicainfoway.com/wp-content/uploads/2026/05/2.-Financial-Results-For-Half-Year-And-Financial-Year-Ended-March-31-2026.pdf",
  },
  {
    title: "Financial Result for the Half Year and Year Ended 30-09-2025",
    year: "2025-26",
    url: "https://www.logicainfoway.com/wp-content/uploads/2025/11/Financial-Result-for-the-half-year-and-year-ended-14-09-2025.pdf",
  },
  {
    title: "Revised Financial Results for Half Year and Year Ended 31-03-2025",
    year: "2024-25",
    url: "https://www.logicainfoway.com/wp-content/uploads/2025/06/Revised-Financial-Results-For-Half-Year-And-Year-Ended-March-31-2025._compressed-2.pdf",
  },
  {
    title: "Unaudited Financial Result for the Half Year and Year Ended 30-09-2024",
    year: "2024-25",
    url: "https://www.logicainfoway.com/wp-content/uploads/2024/11/Financial-Result-for-the-half-year-ended-30th-September-2024.pdf",
  },
  {
    title: "Financial Results for Half Year and Year Ended 31-03-2024",
    year: "2023-24",
    url: "https://www.logicainfoway.com/wp-content/uploads/2025/11/31-03-2024-Outcome-of-Board-Meeting-Dated-30-05-2024.pdf",
  },
  {
    title: "Unaudited Financial Results for the Half Year Ended 30-09-2023",
    year: "2023-24",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/12/HALF-YEARLY-RESULT-SEPTEMBER-2023.pdf",
  },
  {
    title: "Financial Results for the Half Year and Year Ended 31-03-2023",
    year: "2022-23",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/06/FR.pdf",
  },
];

/** Real secretarial audit reports, mirrored from
 *  logicainfoway.com/secretarial-compliance. */
export const SECRETARIAL_COMPLIANCE: AnnualReport[] = [
  {
    title: "Secretarial Audit Report 2023-24",
    year: "2023-24",
    url: "https://www.logicainfoway.com/wp-content/uploads/2024/10/SECRETARIAL-AUDIT-REPORT-MR3-signed-1.pdf",
  },
  {
    title: "Secretarial Audit Report 2022-23",
    year: "2022-23",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/07/SEC-REPORT.pdf",
  },
  {
    title: "Secretarial Audit Report 2021-22",
    year: "2021-22",
    url: "https://www.logicainfoway.com/wp-content/uploads/2023/03/Secretarial-Audit-report-2021-22.pdf",
  },
];
