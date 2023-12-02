import { MyCard, parseBinder } from "./utils/parseBinder.js";
import handleQueue from "./utils/handleQueue.js";
import getHTML from "./utils/getHTML.js";

const binder: string = "Binder - Haves.csv";

async function main() {
  const myBinder = await parseBinder(binder);

  const myBinderSize: number = 10;
  const queueSize: number = 5;
  let myBinderIndex = 0;
  let queuedItems: MyCard[] = [];

  while (myBinderIndex < myBinderSize) {
    for (let i = myBinderIndex; i < myBinderSize; i++) {
      if (queuedItems.length < queueSize) {
        queuedItems.push(myBinder[i]);
        myBinderIndex++;
      }
    }
    await handleQueue(queuedItems, queueSize);
    queuedItems.length = 0;
  }
}

main();
