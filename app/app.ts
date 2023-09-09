import generateURL from "./utils/generateURL.js";
import { Card, parseBinder } from "./utils/parseBinder.js";
import { handleQueue } from "./utils/handleQueue.js";

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

  handleQueue(shortList);
}

main();
