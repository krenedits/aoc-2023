const { getData } = require('../common');

const data = getData('input.txt');

const parts = data.replaceAll('\n', '').split(',');

const createASCII = (char, currValue = 0) =>
    ((currValue + char.charCodeAt()) * 17) % 256;

const createASCIIFromArray = (arr) =>
    arr.reduce((acc, curr) => createASCII(curr, acc), 0);

const first = parts.reduce(
    (acc, curr) => acc + createASCIIFromArray(curr.split('')),
    0
);

console.log(first);

const boxes = [];

parts.forEach((part) => {
    let [label, focal] = part.split('=');

    if (!focal) {
        label = label.replace('-', '');

        const key = createASCIIFromArray(label.split(''));

        boxes[key] = boxes[key] ?? {};
        delete boxes[key][label];
    } else {
        const key = createASCIIFromArray(label.split(''));

        boxes[key] = boxes[key] ?? {};
        boxes[key][label] = focal;
    }
});

const second = boxes.reduce((acc, curr, index) => {
    const boxValues = Object.values(curr).reduce(
        (acc, focal, slot) => acc + focal * (slot + 1),
        0
    );

    return acc + (index + 1) * boxValues;
}, 0);

console.log(second);
