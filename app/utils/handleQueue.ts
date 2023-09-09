import { parsePage } from "./parsePage";

export async function handleQueue(data: string[]) {
  const dataToQueue = [...data].reverse();
  const queue: string[] = [];
  const queueSize: number = 5;
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

    //TODO: Put parsePage function here
    results = await parsePage(queue);
    console.log("Results:");
    console.log(results);
    queue.length = 0;
  }
}
