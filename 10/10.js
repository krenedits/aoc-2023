const { getLines } = require('../common');

const lines = getLines('example.txt');

const getNextIndices = (prev, curr) => {
    const [prevI, prevJ] = prev;
    const [currI, currJ] = curr;
    const char = lines[currI][currJ];
    if (char === '.') throw new Error('Invalid path');
    switch (char) {
        case '-':
            return prevJ < currJ ? [currI, currJ + 1] : [currI, currJ - 1];
        case '|':
            return prevI < currI ? [currI + 1, currJ] : [currI - 1, currJ];
        case 'L':
            return prevI < currI ? [currI, currJ + 1] : [currI - 1, currJ];
        case 'J':
            return prevI < currI ? [currI, currJ - 1] : [currI - 1, currJ];
        case '7':
            return prevI > currI ? [currI, currJ - 1] : [currI + 1, currJ];
        case 'F':
            return prevI > currI ? [currI, currJ + 1] : [currI + 1, currJ];
        default:
            throw new Error('Invalid path');
    }
};

const startI = lines.findIndex((line) => line.includes('S'));
const startJ = lines[startI].indexOf('S');

const possibleNeighbours = {
    left: ['-', 'L', 'F'],
    right: ['-', 'J', '7'],
    top: ['|', 'F', '7'],
    bottom: ['|', 'L', 'J'],
};

const neighbours = [
    [startI, startJ + 1],
    [startI, startJ - 1],
    [startI + 1, startJ],
    [startI - 1, startJ],
];

const getDirection = (prev, curr) => {
    const [prevI, prevJ] = prev;
    const [currI, currJ] = curr;
    if (prevI === currI) {
        return prevJ < currJ ? 'right' : 'left';
    } else {
        return prevI < currI ? 'bottom' : 'top';
    }
};

const getPossibleNeighbourOfStart = () => {
    return neighbours.find((neighbour) => {
        const direction = getDirection([startI, startJ], neighbour);
        const [neighbourI, neighbourJ] = neighbour;
        const char = lines[neighbourI][neighbourJ];
        return possibleNeighbours[direction].includes(char);
    });
};

const neighbour = getPossibleNeighbourOfStart();

const corners = [[startI, startJ]];

const traverse = () => {
    let prev = [startI, startJ];
    let curr = neighbour;
    let count = 1;
    while (true) {
        const [currI, currJ] = curr;
        const char = lines[currI][currJ];
        if (char === 'S') return count;
        const nextIndices = getNextIndices(prev, curr);
        if (!['-', '|'].includes(char)) {
            corners.push(curr);
        }
        prev = curr;
        curr = nextIndices;
        count++;
    }
};

const result = traverse();

const first = Math.floor(result / 2);

console.log(first);

const getArea = (corners) => {
    let area = 0;
    for (let i = 0; i < corners.length - 1; i++) {
        const [currI, currJ] = corners[i];
        const [nextI, nextJ] = corners[i + 1];
        area += Math.floor((currI * nextJ - currJ * nextI) / 2);
    }
    return Math.abs(area);
};

const second = getArea(corners);

console.log(second);
