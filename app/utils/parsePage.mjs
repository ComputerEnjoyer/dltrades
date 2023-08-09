import Axios from "axios";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

export async function work(data, callback) {
  const dataToQueue = [...data].reverse();
  const queue = [];
  const queueSize = 5;
  const results = [];

  while (dataToQueue.length) {
    if (!queue.length) console.log('queue empty');

    while (queue.length < queueSize && dataToQueue.length) {
      const addingToQueue = dataToQueue.pop();
      queue.push(addingToQueue);
      console.log(`Ready to process ${addingToQueue}`);
    }

    console.log(queue);

    while (queue.length && queue.length <= queueSize) {
      console.log(`Processing ${queue[0]}`);
      const newResult = await callback(queue[0]);
      results.push(newResult);
      queue.splice(0, 1);
    }
  }
  console.log(results);
}


// TODO: Think about Promises.all() or whatever it's called...
export async function fetchURL(url) {
  const response = await Axios.get(url);
  return response.status;
}