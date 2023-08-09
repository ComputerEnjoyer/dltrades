import fs from 'fs';
import { parse } from 'csv';
import { finished } from 'stream/promises';

export default async function parseBinder(binder) {
  const records = [];
  const parser = fs
    .createReadStream(binder)
    .pipe(parse({ delimeter: ",", from_line: 2 }));

  for await (const record of parser) {
    const card = {
      name: record[1],
      count: parseInt(record[0]),
      foil: Boolean(record[2]),
      set: record[3],
      condition: record[4],
      language: record[5],
    }
    records.push(card);
  }
  await finished(parser);
  return records;
}