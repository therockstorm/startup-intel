import type { StaticImageData } from "next/image";

import crunchbase from "@/images/logos/crunchbase.png";
import forbes from "@/images/logos/forbes.png";
import gitHub from "@/images/logos/gitHub.png";
import glassdoor from "@/images/logos/glassdoor.png";
import levelsFyi from "@/images/logos/levelsFyi.png";
import linkedIn from "@/images/logos/linkedIn.png";
import yCombinator from "@/images/logos/yCombinator.png";

import { IntelLink, IntelList } from "./types";

type IntelLinkData = Readonly<{
  logo: StaticImageData;
  name: string;
  searchUrl: string;
}>;

export const LINKS: Record<IntelLink, IntelLinkData> = {
  [IntelLink.crunchbase]: {
    logo: crunchbase,
    name: "Crunchbase",
    searchUrl: "https://www.crunchbase.com/textsearch?q=",
  },
  [IntelLink.glassdoor]: {
    logo: glassdoor,
    name: "Glassdoor",
    searchUrl: "https://www.glassdoor.com/Search/results.htm?keyword=",
  },
  [IntelLink.levelsFyi]: {
    logo: levelsFyi,
    name: "Levels.fyi",
    searchUrl: "https://www.levels.fyi/t/software-engineer?search=",
  },
  [IntelLink.linkedIn]: {
    logo: linkedIn,
    name: "LinkedIn",
    searchUrl: "https://www.linkedin.com/search/results/companies/?keywords=",
  },
};

export const HWOW = {
  logo: gitHub,
  title: "Hiring Without Whiteboards",
  url: "https://github.com/poteto/hiring-without-whiteboards",
};

const FORBES_KEYS = [
  { display: "Founders", key: "founders" },
  { display: "Equity raised", key: "equity" },
  { display: "Estimated 2021 revenue", key: "revenue" },
  { display: "Lead investors", key: "investors" },
  { display: "About", key: "description" },
];

type IntelListData = Readonly<{
  keys: Array<Readonly<{ display: string; key: string; type?: "link" }>>;
  logo: StaticImageData;
  title: string;
  url: string;
}>;

export const LISTS: Record<IntelList, IntelListData> = {
  [IntelList.forbes20]: {
    keys: FORBES_KEYS.map((k) =>
      k.key === "revenue" ? { ...k, display: "Estimated 2019 revenue" } : k
    ),
    logo: forbes,
    title: "Forbes Next Billion Dollar Startups 2020",
    url: "https://www.forbes.com/sites/amyfeldman/2020/05/28/next-billion-dollar-startups-2020",
  },
  [IntelList.forbes21]: {
    keys: FORBES_KEYS.map((k) =>
      k.key === "revenue" ? { ...k, display: "Estimated 2020 revenue" } : k
    ),
    logo: forbes,
    title: "Forbes Next Billion Dollar Startups 2021",
    url: "https://www.forbes.com/sites/amyfeldman/2021/10/12/next-billion-dollar-startups-2021",
  },
  [IntelList.forbes22]: {
    keys: FORBES_KEYS,
    logo: forbes,
    title: "Forbes Next Billion Dollar Startups 2022",
    url: "https://www.forbes.com/sites/amyfeldman/2022/08/16/next-billion-dollar-startups-2022",
  },
  [IntelList.yCombinator23]: {
    keys: [
      { display: "Rank", key: "rank" },
      { display: "Batch", key: "batch" },
      { display: "HQ", key: "headquarters" },
      { display: "About", key: "description" },
      { display: "YCombinator directory", key: "ycUrl", type: "link" },
    ],
    logo: yCombinator,
    title: "Top Private YC Companies 2023",
    url: "https://www.ycombinator.com/topcompanies",
  },
};
