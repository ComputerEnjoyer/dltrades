import { MyCard } from "./parseBinder";
import getHTML from "./getHTML";
import generateURL from "./generateURL";

const handleQueue = async (data: MyCard[]) => {
  const urlList = data.map((item) => generateURL(item));
  return await getHTML(urlList);
};

export default handleQueue;
