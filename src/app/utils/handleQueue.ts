// Project dependencies
import { MyCard } from "./parseBinder";
import { getHTML } from "./getHTML";
import { generateURL } from "./generateURL";

export const handleQueue = async (data: MyCard[]) => {
  const urlList = data.map((item) => generateURL(item));
  return await getHTML(urlList);
};
