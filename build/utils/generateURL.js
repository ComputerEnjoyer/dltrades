"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatName(name) {
    return name
        .replaceAll("+", "%2B")
        .replaceAll(" ", "+")
        .replaceAll(",", "%27")
        .replaceAll("/", "%2F")
        .replaceAll('"', "");
}
function formatSet(setToFormat) {
    let set = setToFormat;
    if (set.search("magic") === -1)
        set = "magic " + set;
    if (set.search("Modern Masters 2015"))
        set = set + " Edition";
    return set
        .toLowerCase()
        .replaceAll(":", "")
        .replaceAll(" ", "-")
        .replaceAll("'", "")
        .replaceAll(".", "");
}
function generateURL(data) {
    const baseURL = "http://astraeus.dragonslair.se/product/card-singles/magic/name:";
    const card = formatName(data.name);
    const set = formatSet(data.set);
    return `${baseURL}${card}/${set}`;
}
exports.default = generateURL;
