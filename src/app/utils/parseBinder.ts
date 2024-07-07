// Global dependencies
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv";
import { finished } from "stream/promises";

// Project
import { Binder } from "../app";

export type MyCard = {
  name: string;
  count: number;
  foil: boolean;
  set: string;
  condition: string;
  language: string;
};

export const parseBinder = async (binder: Binder) => {
  const binderPath = path.join(__dirname, `../../../../${binder}`);
  const records: MyCard[] = [];
  const parser = fs
    .createReadStream(binderPath)
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const record of parser) {
    const card: MyCard = {
      name: record[1],
      count: parseInt(record[0]),
      foil: Boolean(record[2]),
      set: record[3],
      condition: record[4],
      language: record[5],
    };
    records.push(card);
  }
  await finished(parser);
  return records;
};
