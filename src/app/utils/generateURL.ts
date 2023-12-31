import { MyCard } from "./parseBinder";

function formatName(name: string) {
  return name
    .replaceAll("+", "%2B")
    .replaceAll(" ", "+")
    .replaceAll(",", "%27")
    .replaceAll("/", "%2F")
    .replaceAll('"', "");
}

function formatSet(setToFormat: string) {
  let set = setToFormat;
  if (set.search("magic") === -1) set = "magic " + set;
  if (set.includes("Modern Masters 2015")) set = set + " Edition";

  return set
    .toLowerCase()
    .replaceAll(":", "")
    .replaceAll(" ", "-")
    .replaceAll("'", "")
    .replaceAll(".", "");
}

export default function generateURL(data: MyCard) {
  const baseURL =
    "http://astraeus.dragonslair.se/product/card-singles/magic/name:";
  const card = formatName(data.name);
  const set = data.set != "" ? formatSet(data.set) : "";
  return `${baseURL}${card}/${set}`;
}
