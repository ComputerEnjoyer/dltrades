import { MyCard } from "./parseBinder";

import getHTML from "./getHTML";
import generateURL from "./generateURL";

export default async function handleQueue(data: MyCard[]) {
  const urlList = data.map((item) => generateURL(item));
  return await getHTML(urlList);
}
