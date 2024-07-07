import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
export function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
}

export type DLCard = {
  name: string | undefined;
  set: string | undefined;
  tradeInValue: number;
  tradeOutValue: number;
  currentStock: number | undefined;
  maxStock?: number | undefined;
  notWanted?: boolean;
};

export default async function getHTML(currentQueue: string[]) {
  const dataToParse: Promise<AxiosResponse<any, any>>[] = [];
  const results: DLCard[][] = [];

  for (const url of currentQueue) {
    await wait();
    dataToParse.push(axios.get(url));
  }
  // TODO: Error handling
  await Promise.all(dataToParse)
    .then((responses) =>
      responses.forEach((response) => {
        // This should generate an array of arrays, where the inner arrays are all the results for a given URL.
        const cardInQueue: DLCard[] = [];
        const $ = cheerio.load(response.data);
        const $products = $("div#main > table > tbody").find("tr");
        $products.each((i, tr) => {
          const name: string | undefined = $(tr).attr("data-name");
          const $setField = $(tr).find("td.align-right.wrap > a > img");
          const set: string | undefined =
            $setField.length != 0
              ? $setField.attr("title")
              : $(tr).find("td.align-right.wrap > a").text();
          const $tradeInField = $(tr)
            .children()
            .last()
            .prev()
            .prev()
            .find("span.format-important");

          const tradeInValue: number | null =
            $tradeInField.text() === "Fullt"
              ? parseInt(
                  $tradeInField
                    .next()
                    .text()
                    .replace(/[a-zA-Z]+/g, "")
                )
              : parseInt($(tr).children().last().prev().prev().text());
          const tradeOutValue: number | null =
            $(tr).find(".format-important").text() === "Slut"
              ? parseInt(
                  $(tr)
                    .find(".format-subtle")
                    .text()
                    .replace(/[a-zA-Z]+/g, "")
                )
              : parseInt(
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
            .match(/[0-9]+/g);
          const currentStock = stock != null ? parseInt(stock[0]) : undefined;

          const maxStock = stock != null ? parseInt(stock[1]) : undefined;

          cardInQueue.push({
            name,
            set,
            tradeInValue,
            tradeOutValue,
            currentStock,
            maxStock,
          });
        });
        results.push(cardInQueue);
      })
    )
    .catch(() => {
      results.push([
        {
          name: undefined,
          set: undefined,
          tradeInValue: 0,
          tradeOutValue: 0,
          currentStock: 0,
        },
      ]);
      console.log("503 in batch " + currentQueue);
    });

  return results;
}
