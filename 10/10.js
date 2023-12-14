const { getLines } = require('../common');

const lines = getLines('input.txt');

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

const border = [[startI, startJ]];

const traverse = () => {
    let prev = [startI, startJ];
    let curr = neighbour;
    let count = 1;
    while (true) {
        const [currI, currJ] = curr;
        const char = lines[currI][currJ];
        if (char === 'S') return count;
        const nextIndices = getNextIndices(prev, curr);
        border.push(curr);
        prev = curr;
        curr = nextIndices;
        count++;
    }
};

const result = traverse();

const first = Math.floor(result / 2);

console.log(first);

// replace borders with X
const markedMap = lines.map((line, i) => {
    return line.split('').map((char, j) => {
        if (
            border.some(([borderI, borderJ]) => borderI === i && borderJ === j)
        ) {
            return 'X';
        }
        return char;
    });
});

let count = 0;
markedMap.forEach((line, index) => {
    let i = 0;
    let isOpen = false;

    while (i < line.length) {
        if (
            line[i] === 'X' &&
            possibleNeighbours.bottom.includes(lines[index][i])
        ) {
            isOpen = !isOpen;
        } else if (line[i] !== 'X' && isOpen) {
            count++;
        }
        i++;
    }
});

console.log(count);
