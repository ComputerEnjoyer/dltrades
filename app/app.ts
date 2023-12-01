import generateURL from "./utils/generateURL.js";
import { MyCard, parseBinder } from "./utils/parseBinder.js";
import handleQueue from "./utils/handleQueue.js";
import getHTML from "./utils/getHTML.js";

const binder: string = "Binder - Haves.csv";

async function main() {
  const myBinder = await parseBinder(binder);
  const shortList = myBinder
    .filter((item: MyCard, index: number) => {
      if (index < 10) {
        return item;
      }
    })
    .map((item) => generateURL(item));

  handleQueue(shortList);
}

main();
