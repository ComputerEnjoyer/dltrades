import Axios from "axios";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
}

export async function work(data) {
  const dataToQueue = [...data].reverse();
  const queue = [];
  const queueSize = 5;
  const dataToWork = [];
  const results = [];

  while (dataToQueue.length) {
    if (!queue.length) {
      console.log('queue empty');

      while (queue.length < queueSize && dataToQueue.length) {
        const addingToQueue = dataToQueue.pop();
        queue.push(addingToQueue);
      }
    }

    console.log('In queue:');
    console.log(queue);

    for (const item of queue) {
      dataToWork.push(Axios.get(item));
    }

    await Promise.all(dataToWork)
      .then(responses => responses.forEach(response => results.push(response.status)))
      .then(() => console.log('Processed all items in queue'))
      .then(() => queue.length = 0);
  }
  console.log('Results:');
  console.log(results);
}