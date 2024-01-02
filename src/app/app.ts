import { MyCard, parseBinder } from "./utils/parseBinder.js";
import handleQueue from "./utils/handleQueue.js";
import calculateTrades from "./utils/calculateTrades.js";
import { program } from "commander";

program.option("--wants").parse();
const options = program.opts();

export enum Binder {
  Haves = "Binder - Haves.csv",
  Wants = "Binder - Wants.csv",
}

const MY_BINDER = options.wants === true ? Binder.Wants : Binder.Haves;
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
  const myBinder = await parseBinder(MY_BINDER);

  const myBinderSize: number = myBinder.length;
  const queueSize: number = 10;
  let startIndex = 0;
  let queuedItems: MyCard[] = [];

  while (startIndex < myBinderSize) {
    for (let i = startIndex; i < myBinderSize; i++) {
      if (queuedItems.length < queueSize) {
        queuedItems.push(myBinder[i]);
        startIndex++;
      }
    }
    if (MY_BINDER === Binder.Haves) {
      queuedItems = queuedItems.filter(excludeBadCard);
    }
    const results = await handleQueue(queuedItems);
    calculateTrades(MY_BINDER, queuedItems, results);
    queuedItems.length = 0;
  }
}

main();
