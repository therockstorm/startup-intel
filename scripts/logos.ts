import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import type { Stream } from "node:stream";
import { fileURLToPath } from "node:url";

import axios from "axios";
import { camelCase } from "camel-case";

import COMPANIES from "../src/data/list.json" assert { type: "json" };
import type { Company } from "../src/lib/types.js";
import { isNullOrUndefined } from "../src/lib/util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const companies: Company[] = COMPANIES;

await Promise.all(
  companies.map(async (c) => {
    const response = await axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
        c.name
      )}`,
      { validateStatus: () => true }
    );
    if (
      isNullOrUndefined(response.data) ||
      response.data.length === 0 ||
      isNullOrUndefined(response.data[0].logo)
    ) {
      console.log("No data for", c.name);
      return undefined;
    }

    const imgResponse = await axios<Stream>({
      method: "get",
      responseType: "stream",
      url: response.data[0].logo as string,
      validateStatus: () => true,
    });

    return imgResponse.data.pipe(
      createWriteStream(
        join(__dirname, "..", "storage", "logos", `${camelCase(c.name)}.png`)
      )
    );
  })
);
