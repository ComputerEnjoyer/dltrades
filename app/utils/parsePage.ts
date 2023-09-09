import Axios, { AxiosResponse } from "axios";

// We use wait so that our IP doesn't get banned for sending thousands of requests at the same time :)
function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
}

export async function parsePage(currentQueue: string[]): Promise<number[]> {
  const dataToParse: Promise<AxiosResponse<any, any>>[] = [];
  const results: number[] = [];

  for (const item of currentQueue) {
    await wait();
    dataToParse.push(Axios.get(item));
  }

  await Promise.all(dataToParse).then((responses) =>
    responses.forEach((response) => results.push(response.status))
  );
  return results;
}
