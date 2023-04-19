export interface Candidate {
  voornaam: string;
  achternaam: string;
  geboortedatum: string;
  geslacht: string;
  appliedForJob?: string;
  cv: string;
  motivatiebrief: string;
}

export interface Job {
  title: string;
  candidates: { new: number; total: number };
  status: string;
  publishedDate: string;
  department: string;
  responsible: string;
}

export enum Tab {
  GENERAL,
  APPLICATION,
  STATUS,
}
