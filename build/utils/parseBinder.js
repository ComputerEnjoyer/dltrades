"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBinder = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_1 = require("csv");
const promises_1 = require("stream/promises");
async function parseBinder(binder) {
    const binderPath = path.join(__dirname, `../../${binder}`);
    console.log(binderPath);
    const records = [];
    const parser = fs
        .createReadStream(binderPath)
        .pipe((0, csv_1.parse)({ delimiter: ",", from_line: 2 }));
    for await (const record of parser) {
        const card = {
            name: record[1],
            count: parseInt(record[0]),
            foil: Boolean(record[2]),
            set: record[3],
            condition: record[4],
            language: record[5],
        };
        records.push(card);
    }
    await (0, promises_1.finished)(parser);
    return records;
}
exports.parseBinder = parseBinder;
