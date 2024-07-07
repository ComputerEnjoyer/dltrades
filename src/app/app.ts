// Global dependencies
import { program } from "commander";

// Project dependencies
import { calculateTrades } from "./utils/calculateTrades";
import { handleQueue } from "./utils/handleQueue";
import { MyCard, parseBinder } from "./utils/parseBinder";

program
  .option("-w, --wants", "use WANTS binder; HAVES is the default.")
  .option("-s, --set <set name>", "filter for set names containing this string")
  .option(
    "-n, --name <card name>",
    "filter for card names containing this string"
  )
  .option(
    "-f, --foil <only/none>",
    "show ONLY foils, or show NONE; default shows all cards."
  )
  .option(
    "-l, --limit <number>",
    "limit the number of rows the app iterates over"
  )
  .parse();
export const programOptions = program.opts();

export enum Binder {
  Haves = "Binder - Haves.csv",
  Wants = "Binder - Wants.csv",
}

const MY_BINDER = programOptions.wants === true ? Binder.Wants : Binder.Haves;
const ACCEPTED_CONDITIONS = ["NM", "SP"];

const excludeBadCard = (item: MyCard) => {
  if (
    item.language != "English" ||
    !ACCEPTED_CONDITIONS.includes(item.condition)
  )
    return false;
  return true;
};

const main = async () => {
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
};

main();
