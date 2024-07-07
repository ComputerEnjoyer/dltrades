// Global dependencies
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv";

// Project
import { Binder, programOptions } from "../app";

export type MyCard = {
  name: string;
  count: number;
  foil: boolean;
  set: string;
  condition: string;
  language: string;
};

const filterName = (card: MyCard) => {
  if (programOptions.name) {
    const name = programOptions.name.toLowerCase();
    return card.name.toLowerCase().includes(name);
  }
  return true;
};

const filterSet = (card: MyCard) => {
  if (programOptions.set) {
    const set = programOptions.set.toLowerCase();
    return card.set.toLowerCase().includes(set);
  }
  return true;
};

const filterFoil = (card: MyCard) => {
  if (programOptions.foil === "only") {
    return card.foil;
  }
  if (programOptions.foil === "none") {
    return !card.foil;
  }
  return true;
};

export const parseBinder = async (binder: Binder) => {
  const binderPath = path.join(__dirname, `../../../../${binder}`);
  const records: MyCard[] = [];
  const parser = fs
    .createReadStream(binderPath)
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const record of parser) {
    if (records.length >= programOptions.limit) break;
    const card: MyCard = {
      name: record[1],
      count: parseInt(record[0]),
      foil: Boolean(record[2]),
      set: record[3],
      condition: record[4],
      language: record[5],
    };
    if (filterSet(card) && filterName(card) && filterFoil(card))
      records.push(card);
  }
  return records;
};
