import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { JSDOMCrawler } from "crawlee";

import { isNullOrUndefined } from "../src/lib/util.js";
import { queryByXPath, queryByXPathAll } from "./crawl.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const crawler = new JSDOMCrawler({
  requestHandler({ window }) {
    const { document } = window;

    const context = queryByXPath({
      document,
      path: "//html/body/div/article/main/div[3]/div/div/div[4]/div[1]",
    }).singleNodeValue;
    const args = { context, document };

    function textNode(path: string) {
      return queryByXPath({
        ...args,
        path,
      }).singleNodeValue?.textContent?.trim();
    }

    function h4(i: number) {
      return textNode(`.//h4[${i}]/strong`);
    }

    const names = queryByXPathAll({ ...args, path: ".//h3" });

    let i = 3;
    const response = [];
    for (
      let name = names.iterateNext(), idx = 0;
      !isNullOrUndefined(name);
      name = names.iterateNext(), idx++
    ) {
      response.push({
        description: textNode(`.//p[${idx + 2}]`),
        equity: h4(i + 1),
        founders: h4(i),
        investors: h4(i + 3),
        name: name.textContent?.trim(),
        revenue: h4(i + 2),
      });
      i += 4;
    }

    writeFileSync(
      join(__dirname, "forbes22.json"),
      JSON.stringify(response, null, 2)
    );
  },
});

await crawler.run([
  "https://www.forbes.com/sites/amyfeldman/2022/08/16/next-billion-dollar-startups-2022",
]);
