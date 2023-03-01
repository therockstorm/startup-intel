import { camelCase } from "camel-case";
import { promises, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import {
  Company,
  CompanyName,
  HiringWithoutWhiteboards,
  IntelList,
  List,
  YC,
} from "../src/lib/types.js";

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
  const files = await Promise.all(
    Object.values(LISTS).map(({ filePath }) => read({ filePath }))
  );
  const hwow: HiringWithoutWhiteboards[] = await read({
    filePath: join(__dirname, "hwow.json"),
  });
  const hwowById = hwow.reduce((acc, data) => {
    acc[camelCase(data.name)] = data;
    return acc;
  }, {} as Record<string, HiringWithoutWhiteboards>);

  const list: Record<CompanyName, Company> = {};
  files.forEach((data, i) => {
    data.forEach((d) => {
      const existing = list[d.name];
      const asYc = d as YC;
      list[d.name] = {
        description: asYc.description ?? existing?.description ?? undefined,
        hiringWithoutWhiteboards: hwowById[camelCase(d.name)] != null,
        lists: [...(existing?.lists ?? []), { ...d, list: i }],
        name: d.name,
        urls: {
          logo:
            asYc.logoUrl != null
              ? toUrl(asYc.logoUrl)
              : existing?.urls.logo ?? undefined,
          website:
            asYc.url != null
              ? toUrl(asYc.url)
              : existing?.urls.website ?? undefined,
        },
      };
    });
  });

  writeFileSync(
    join(OUT_PATH, "list.json"),
    JSON.stringify(Object.values(list))
  );
  writeFileSync(join(OUT_PATH, "byId.json"), JSON.stringify(list));
}

function toUrl(val?: string) {
  return val == null || val.startsWith("http") ? val : `https://${val}`;
}

async function read<T = List[]>({
  filePath,
}: Readonly<{ filePath: FilePath }>): Promise<T> {
  const c = await promises.readFile(filePath, { encoding: "utf8" });
  return JSON.parse(c);
}

main();
