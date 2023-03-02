import { promises, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { camelCase } from "camel-case";

import {
  type Company,
  type CompanyName,
  type HiringWithoutWhiteboards,
  IntelList,
  type List,
  type YCombinator,
} from "../src/lib/types.js";
import { isNullOrUndefined, typedParse } from "../src/lib/util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const OUT_PATH = join(__dirname, "..", "src", "data");

type FilePath = string;

const LISTS: Record<IntelList, Readonly<{ filePath: FilePath }>> = {
  [IntelList.forbes20]: { filePath: join(__dirname, "forbes20.json") },
  [IntelList.forbes21]: { filePath: join(__dirname, "forbes21.json") },
  [IntelList.forbes22]: { filePath: join(__dirname, "forbes22.json") },
  [IntelList.yCombinator23]: {
    filePath: join(__dirname, "yCombinator23.json"),
  },
};

async function main() {
  const files: List[][] = await Promise.all(
    Object.values(LISTS).map(async ({ filePath }) => read({ filePath }))
  );
  const hwow: HiringWithoutWhiteboards[] = await read({
    filePath: join(__dirname, "hwow.json"),
  });
  const hwowById: Record<string, HiringWithoutWhiteboards> = {};
  for (const d of hwow) hwowById[camelCase(d.name)] = d;

  const list: Record<CompanyName, Company> = {};
  for (const [i, data] of files.entries()) {
    for (const d of data) {
      const existing = list[d.name];
      const asYc = d as YCombinator;
      list[d.name] = {
        description: asYc.description ?? existing?.description ?? undefined,
        hiringWithoutWhiteboards: !isNullOrUndefined(
          hwowById[camelCase(d.name)]
        ),
        lists: [...(existing?.lists ?? []), { ...d, list: i }],
        name: d.name,
        urls: {
          logo: isNullOrUndefined(asYc.logoUrl)
            ? existing?.urls.logo ?? undefined
            : toUrl(asYc.logoUrl),
          website: isNullOrUndefined(asYc.url)
            ? existing?.urls.website ?? undefined
            : toUrl(asYc.url),
        },
      };
    }
  }

  writeFileSync(
    join(OUT_PATH, "list.json"),
    JSON.stringify(Object.values(list))
  );
  writeFileSync(join(OUT_PATH, "byId.json"), JSON.stringify(list));
}

function toUrl(value?: string) {
  return isNullOrUndefined(value) || value.startsWith("http")
    ? value
    : `https://${value}`;
}

async function read<T = List[]>({
  filePath,
}: Readonly<{ filePath: FilePath }>): Promise<T> {
  const c = await promises.readFile(filePath, { encoding: "utf8" });
  return typedParse<T>(c);
}

await main();
