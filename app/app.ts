import { MyCard, parseBinder } from "./utils/parseBinder.js";
import handleQueue from "./utils/handleQueue.js";
import calculateTrades from "./utils/calculateTrades.js";

const HAVES: string = "Binder - Haves.csv";
const WANTS: string = "Binder - Wants.csv";
const ACCEPTED_CONDITIONS = ["NM", "SP"];

function excludeBadCard(item: MyCard) {
  if (
    item.foil === true ||
    item.language != "English" ||
    !ACCEPTED_CONDITIONS.includes(item.condition)
  )
    return false;
  return true;
}

async function main() {
  const myBinder = await parseBinder(WANTS);

  const myBinderSize: number = myBinder.length;
  const queueSize: number = 5;
  let startIndex = 0;
  let queuedItems: MyCard[] = [];

  while (startIndex < myBinderSize) {
    for (let i = startIndex; i < myBinderSize; i++) {
      if (queuedItems.length < queueSize) {
        queuedItems.push(myBinder[i]);
        startIndex++;
      }
    }
    // const filteredQueuedItems = queuedItems.filter(excludeBadCard);
    const results = await handleQueue(queuedItems);
    calculateTrades(queuedItems, results);
    queuedItems.length = 0;
  }
}

main();
