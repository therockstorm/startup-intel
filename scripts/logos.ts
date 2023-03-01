import axios from "axios";
import { camelCase } from "camel-case";
import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import COMPANIES from "../src/data/list.json" assert { type: "json" };
import { Company } from "../src/lib/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const companies: Company[] = COMPANIES;
// const companies = [{ name: "yCombinator" }];

await Promise.all(
  companies.map(async (c) => {
    const res = await axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
        c.name
      )}`,
      { validateStatus: () => true }
    );
    if (res.data == null || res.data.length === 0 || res.data[0].logo == null) {
      console.log("No data for", c.name);
      return undefined;
    }
    const img = await axios({
      method: "get",
      responseType: "stream",
      url: res.data[0].logo,
      validateStatus: () => true,
    });
    return img.data.pipe(
      createWriteStream(
        join(__dirname, "..", "storage", "logos", `${camelCase(c.name)}.png`)
      )
    );
  })
);
