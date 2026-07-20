/** Real board committee composition, mirrored from
 *  logicainfoway.com/composition-of-committees. Nothing invented. */

export interface Committee {
  name: string;
  members: { name: string; role: string }[];
}

export const COMMITTEES: Committee[] = [
  {
    name: "Audit Committee",
    members: [
      { name: "Dinesh Arya", role: "Chairman" },
      { name: "Nil Kamal Samanta", role: "Member" },
      { name: "Gaurav Goel", role: "Member" },
      { name: "Vinita Saraf", role: "Member" },
    ],
  },
  {
    name: "Nomination & Remuneration Committee",
    members: [
      { name: "Vinita Saraf", role: "Chairman" },
      { name: "Dinesh Arya", role: "Member" },
      { name: "Rakesh Kumar Goel", role: "Member" },
    ],
  },
  {
    name: "Stake Holders Relationship Committee",
    members: [
      { name: "Nil Kamal Samanta", role: "Chairman" },
      { name: "Gaurav Goel", role: "Member" },
      { name: "Shweta Goel", role: "Member" },
    ],
  },
  {
    name: "Internal Complaints Committee",
    members: [
      { name: "Paromita Samanta", role: "Presiding Officer" },
      { name: "Priyanka Baid", role: "External Member" },
      { name: "Deepak Kumar Jha", role: "Member" },
      { name: "Ranveer Sharma", role: "Member" },
    ],
  },
  {
    name: "CSR Committee",
    members: [
      { name: "Shweta Goel", role: "Chairperson" },
      { name: "Rakesh Kumar Goel", role: "Member" },
      { name: "Dinesh Arya", role: "Member" },
    ],
  },
];
