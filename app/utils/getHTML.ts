import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
}

type DLCard = {
  name: string | undefined;
  set: string | undefined;
  tradeInValue: number;
  tradeOutValue: number | null;
  currentStock: number | null;
  maxStock?: number | null;
  notWanted?: boolean;
};

export async function getHTML(currentQueue: string[]): Promise<any> {
  const dataToParse: Promise<AxiosResponse<any, any>>[] = [];
  const results: DLCard[] = [];

  for (const url of currentQueue) {
    await wait();
    dataToParse.push(axios.get(url));
  }
  // TODO: Error handling
  await Promise.all(dataToParse).then((responses) =>
    responses.forEach((response) => {
      const $ = cheerio.load(response.data);
      const $products = $("div#main > table > tbody").find("tr");
      $products.each((i, tr) => {
        const name: string | undefined = $(tr).attr("data-name");
        const $setField = $(tr).find("td.align-right.wrap > a > img");
        const set: string | undefined =
          $setField.length != 0
            ? $setField.attr("title")
            : $(tr).find("td.align-right.wrap > a").text();
        const tradeInValue: number | null = parseInt(
          $(tr)
            .find(".format-subtle")
            .text()
            .replace(/[a-zA-Z]+/g, "")
        );
        const tradeOutValue: number | null = parseInt(
          $(tr)
            .find(".format-bold")
            .text()
            .replace(/[a-zA-Z]+/g, "")
        );
        const stock: RegExpMatchArray | null = $(tr)
          .children()
          .last()
          .prev()
          .text()
          .match(/[1-9]+/g);
        const currentStock = stock != null ? parseInt(stock[0]) : null;
        const maxStock = stock != null ? parseInt(stock[1]) : null;

        results.push({
          name,
          set,
          tradeInValue,
          tradeOutValue,
          currentStock,
          maxStock,
        });
      });
    })
  );

  return results;
}
