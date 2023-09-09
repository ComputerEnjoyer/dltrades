import generateURL from "./utils/generateURL.js";
import { Card, parseBinder } from "./utils/parseBinder.js";
import { work } from "./utils/parsePage.js";
import * as path from "path";

const binder: string = "Binder - Haves.csv";

async function main() {
  const myBinder = await parseBinder(binder);
  const shortList = myBinder
    .filter((item: Card, index: number) => {
      if (index < 50) {
        return item;
      }
    })
    .map((item) => generateURL(item));

  work(shortList);
}

main();
