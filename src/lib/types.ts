export enum IntelList {
  forbes20,
  forbes21,
  forbes22,
  yCombinator23,
}

export enum IntelLink {
  crunchbase,
  glassdoor,
  levelsFyi,
  linkedIn,
}

export type CompanyName = string;

type Base = Readonly<{ list: IntelList }>;

type Forbes = Readonly<{
  description: string;
  equity: string;
  founders: string;
  investors: string;
  name: string;
  revenue: string;
}>;

export type YC = Readonly<{
  batch: string;
  description: string;
  headquarters: string;
  logoUrl: string;
  name: string;
  rank: number;
  url: string;
  ycUrl: string;
}>;

export type HiringWithoutWhiteboards = Readonly<{
  description: string;
  name: string;
  url: string;
}>;

export type List = Base & (Forbes | YC);

export type Company = Readonly<{
  description: string;
  hiringWithoutWhiteboards: boolean;
  lists: List[];
  name: CompanyName;
  urls: Readonly<{ logo?: string; website?: string }>;
}>;

export type CompaniesById = Record<string, Company>;
