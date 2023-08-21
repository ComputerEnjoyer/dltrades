"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateURL_js_1 = __importDefault(require("./utils/generateURL.js"));
const parseBinder_js_1 = require("./utils/parseBinder.js");
const parsePage_js_1 = require("./utils/parsePage.js");
const binder = "Binder - Haves.csv";
async function main() {
    const myBinder = await (0, parseBinder_js_1.parseBinder)(binder);
    const shortList = myBinder
        .filter((item, index) => {
        if (index < 10) {
            return item;
        }
    })
        .map((item) => (0, generateURL_js_1.default)(item));
    (0, parsePage_js_1.work)(shortList);
}
main();
