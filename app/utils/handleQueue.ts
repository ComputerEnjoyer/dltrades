import { MyCard } from "./parseBinder";

import getHTML from "./getHTML";
import generateURL from "./generateURL";

export default async function handleQueue(data: MyCard[], queueSize: number) {
  const urlList = data.map((item) => generateURL(item));
  const dataToQueue = [...urlList].reverse();
  const queue: string[] = [];
  let results: number[] = [];

  while (dataToQueue.length) {
    if (!queue.length) {
      console.log("queue empty");

      while (queue.length < queueSize && dataToQueue.length) {
        const addingToQueue: string | undefined = dataToQueue.pop();
        if (addingToQueue) queue.push(addingToQueue);
      }
    }

    console.log("In queue:");
    console.log(queue);

    results = await getHTML(queue);
    // console.log("Results:");
    // console.log(results);

    queue.length = 0;
  }
}
