import { JSDOMCrawler } from "crawlee";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { queryByXPath, queryByXPathAll } from "./crawl";

const __dirname = dirname(fileURLToPath(import.meta.url));

const crawler = new JSDOMCrawler({
  requestHandler: ({ window }) => {
    const { document } = window;

    function textNode(context: Node, path: string) {
      return queryByXPath({
        context,
        document,
        path,
      }).singleNodeValue?.textContent?.trim();
    }

    const rows = queryByXPathAll({
      document,
      path: "//html/body/div/div[2]/section[3]/div/table/tbody/tr",
    });

    const res = [];
    for (
      let row = rows.iterateNext(), idx = 0;
      row != null;
      row = rows.iterateNext(), idx++
    ) {
      res.push({
        batch: textNode(row, `.//td[4]`),
        description: textNode(row, `.//td[3]`),
        headquarters: textNode(row, `.//td[5]`),
        logoUrl: textNode(row, `.//td[1]/img/@src`),
        name: textNode(row, `.//td[1]/a[1]`),
        rank: parseInt(textNode(row, `.//td[2]`)?.replace("#", "") ?? "", 10),
        url: textNode(row, `.//td[1]/a[2]`),
        ycUrl: textNode(row, `.//td[1]/a[1]/@href`)?.replace(
          "/companies",
          "https://www.ycombinator.com/companies"
        ),
      });
    }

    writeFileSync(
      join(__dirname, "yCombinator23.json"),
      JSON.stringify(res, null, 2)
    );
  },
});

await crawler.run(["https://www.ycombinator.com/topcompanies"]);
