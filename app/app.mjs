import generateURL from './utils/generateURL.mjs';
import parseBinder from './utils/parseBinder.mjs';
import { fetchURL, work } from './utils/parsePage.mjs';

const binder = 'Binder - Haves.csv';

async function main() {
    const myBinder = await parseBinder(binder);
    const shortList = myBinder.filter((item, index) => {
        if (index < 10) {
            return (item);
        }
    }).map((item) => generateURL(item));

    work(shortList, fetchURL);
}

main();