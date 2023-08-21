import * as fs from "fs";
import * as path from "path";
import { parse } from "csv";
import { finished } from "stream/promises";

export interface Card {
  name: string;
  count: number;
  foil: boolean;
  set: string;
  condition: string;
  language: string;
}

export async function parseBinder(binder: string) {
  const binderPath = path.join(__dirname, `../../${binder}`);
  console.log(binderPath);
  const records: Card[] = [];
  const parser = fs
    .createReadStream(binderPath)
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const record of parser) {
    const card: Card = {
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
}
