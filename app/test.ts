import axios from "axios";
import * as cheerio from "cheerio";

type DLCard = {
  name: string | undefined;
  set: string | undefined;
  tradeInValue: number;
  tradeOutValue: number | null;
  currentStock: number | null;
  maxStock?: number | null;
  notWanted?: boolean;
};

const url =
  "https://astraeus.dragonslair.se/product/card-singles/magic?name=abandon+post";

const AxiosInstance = axios.create();
const results: DLCard[] = [];

AxiosInstance.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const $products = $("div#main > table > tbody").find("tr");
    $products.each((i, tr) => {
      const name: string | undefined = $(tr).attr("data-name");
      // TODO: the set field is sometimes not an image, but simply an <a> with the set as a.text()
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
    console.log(results);
  })
  .catch(console.error);
