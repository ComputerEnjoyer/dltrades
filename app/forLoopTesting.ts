import { wait } from "./utils/getHTML";

const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let loopList: number[] = [];
const queueSize: number = 5;
let listToPrint: number[] = [];

async function process() {
  for (let i = 0; i < myList.length; i++) {
    if (loopList.length >= 5) {
      loopList = [];
    }
    if (loopList.length < queueSize) {
      await wait();
      console.log(`Adding ${myList[i]} to list...`);
      loopList.push(myList[i]);
    }
    listToPrint = loopList;
    console.log(listToPrint);
  }
}

process();
