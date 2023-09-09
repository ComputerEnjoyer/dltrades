import Axios, { AxiosResponse } from "axios";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
}

export async function work(data: string[]) {
  const dataToQueue = [...data].reverse();
  const queue: string[] = [];
  const queueSize: number = 10;
  const dataToWork: Promise<AxiosResponse<any, any>>[] = [];
  const results: number[] = [];

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

    for (const item of queue) {
      await wait();
      dataToWork.push(Axios.get(item));
    }

    await Promise.all(dataToWork)
      .then((responses) =>
        responses.forEach((response) => results.push(response.status))
      )
      .then(() => console.log("Processed all items in queue"))
      .then(() => (queue.length = 0));
  }
  console.log("Results:");
  console.log(results);
}
