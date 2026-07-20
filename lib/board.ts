/** Real Board of Directors & Key Managerial Personnel, mirrored from
 *  logicainfoway.com/board-of-directors-and-kmp — names, designations, and
 *  appointment facts sourced directly from the live site. Nothing invented. */

export interface BoardMember {
  name: string;
  designation: string;
  photo: string;
  details: string[];
}

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: "Mr. Gaurav Goel",
    designation: "Chairman cum Managing Director",
    photo: "/about/board/gaurav-goel.png",
    details: [
      "Appointed to the Board on December 2, 2002",
      "Re-designated as Managing Director on July 1, 2024",
      "1992 graduate in Electronics & Communications Engineering",
    ],
  },
  {
    name: "Mrs. Shweta Goel",
    designation: "Whole-Time Director",
    photo: "/about/board/shweta-goel.png",
    details: [
      "Originally appointed December 2, 2002",
      "Re-designated April 1, 2017",
      "Graduate in English; postgraduate in Guidance & Counselling",
    ],
  },
  {
    name: "Mr. Rakesh Kumar Goel",
    designation: "Non-Executive Director",
    photo: "/about/board/rakesh-kumar-goel.png",
    details: ["Mechanical Engineer with 58 years of experience"],
  },
  {
    name: "Mr. Dinesh Arya",
    designation: "Independent Director",
    photo: "/about/board/dinesh-arya.png",
    details: [
      "Appointed July 1, 2022, for a 5-year term",
      "Fellow, Company Secretaries of India",
      "PGDBA in Finance",
    ],
  },
  {
    name: "Mr. Nil Kamal Samanta",
    designation: "Independent Director",
    photo: "/about/board/nil-kamal-samanta.png",
    details: [
      "Appointed August 26, 2022, for a 5-year term",
      "39 years in banking; retired as Deputy Zonal Manager, Bank of India",
    ],
  },
  {
    name: "Ms. Vinita Saraf",
    designation: "Independent Director",
    photo: "/about/board/vinita-saraf.png",
    details: [
      "Appointed August 29, 2022, for an 8-year term",
      "Bachelor in Commerce (Honours); NISM VIII certified",
    ],
  },
  {
    name: "Mr. Sundeep Mishra",
    designation: "Chief Operating Officer",
    photo: "/about/board/sundeep-mishra.png",
    details: ["Appointed May 6, 2022", "~49 years in marketing, sales, and business development"],
  },
  {
    name: "Mr. Deepak Kumar Jha",
    designation: "Chief Financial Officer",
    photo: "/about/board/deepak-kumar-jha.png",
    details: ["Appointed July 1, 2022", "~22 years in Accounts & Finance; associated with the company since January 2012"],
  },
  {
    name: "Ms. Priyanka Gera",
    designation: "Company Secretary & Compliance Officer",
    photo: "/about/board/priyanka-gera.jpg",
    details: ["Appointed September 24, 2024", "Associate ICSI; Master's in Commerce; Bachelor in Law"],
  },
  {
    name: "Mr. Ankur Bhutani",
    designation: "Chief Operating Officer (North)",
    photo: "/about/board/ankur-bhutani.png",
    details: ["Appointed July 18, 2023", "22+ years with major MNCs including HP, Dell, and Samsung"],
  },
  {
    name: "Mr. Kshitij Goel",
    designation: "Chief Information Officer",
    photo: "/about/board/kshitij-goel.jpg",
    details: [
      "Appointed May 1, 2025",
      "Mechanical Engineering & Business graduate, Boston University",
      "Prior experience at Amazon Logistics",
    ],
  },
];
