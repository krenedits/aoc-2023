const { getLines } = require('../common');

const lines = getLines('example.txt');

const createVisited = () =>
    lines.map((line) => line.split('').map(() => false));

let visited = createVisited();

let cache = {};

const dotCase = (prev, curr) => {
    const [prevI, prevJ] = prev;
    const [currI, currJ] = curr;

    if (prevI === currI) {
        return [currI, currJ + (currJ < prevJ ? -1 : 1)];
    }

    return [currI + (currI < prevI ? -1 : 1), currJ];
};

const slashCase = (prev, curr) => {
    const [prevI, prevJ] = prev;
    const [currI, currJ] = curr;

    if (prevI === currI) {
        return [currI + (currJ < prevJ ? 1 : -1), currJ];
    }

    return [currI, currJ + (currI < prevI ? 1 : -1)];
};

const backslashCase = (prev, curr) => {
    const [prevI, prevJ] = prev;
    const [currI, currJ] = curr;

    if (prevI === currI) {
        return [currI + (currJ < prevJ ? -1 : 1), currJ];
    }

    return [currI, currJ + (currI < prevI ? -1 : 1)];
};

const hyphenCase = (prev, curr) => {
    const [prevI] = prev;
    const [currI, currJ] = curr;

    if (prevI === currI) {
        return dotCase(prev, curr);
    }

    return [
        [currI, currJ - 1],
        [currI, currJ + 1],
    ];
};

const pipeCase = (prev, curr) => {
    const [_, prevJ] = prev;
    const [currI, currJ] = curr;

    if (prevJ === currJ) {
        return dotCase(prev, curr);
    }

    return [
        [currI - 1, currJ],
        [currI + 1, currJ],
    ];
};

const caseMap = {
    '.': dotCase,
    '/': slashCase,
    '\\': backslashCase,
    '-': hyphenCase,
    '|': pipeCase,
};

const step = (prev, curr) => {
    const [currI, currJ] = curr;
    const char = lines[currI][currJ];

    if (!char) {
        return null;
    }

    const next = caseMap[char](prev, curr);

    visited[currI][currJ] = true;

    return next;
};

const isIllegal = (curr) => {
    if (!curr) {
        return true;
    }
    const [currI, currJ] = curr;

    return currI < 0 || currJ < 0 || !lines[currI]?.[currJ];
};

const getNumberOfVisited = () =>
    visited.reduce((acc, line) => {
        return acc + line.filter((char) => char).length;
    }, 0);

const traverse = (prev, curr) => {
    if (isIllegal(curr)) {
        return;
    }

    if (cache[[prev, curr].join('-')]) {
        return;
    }

    cache[[prev, curr].join('-')] = true;

    const next = step(prev, curr);

    if (!next) {
        cache[[prev, curr].join('-')] = true;
        return;
    }

    if (Array.isArray(next[0])) {
        next.forEach((n) => traverse(curr, n));
        return;
    }
    traverse(curr, next);
};

traverse([0, -1], [0, 0]);

const first = getNumberOfVisited();
console.log(first);

let max = first;

const starting = (i) => ({
    top: [
        [-1, i],
        [0, i],
    ],
    bottom: [
        [lines.length, i],
        [lines.length - 1, i],
    ],
    left: [
        [i, -1],
        [i, 0],
    ],
    right: [
        [i, lines[i].length],
        [i, lines[i].length - 1],
    ],
});

const directions = ['top', 'bottom', 'left', 'right'];

for (let i = 0; i < lines.length; i++) {
    directions.forEach((direction) => {
        const [prev, curr] = starting(i)[direction];
        visited = createVisited();
        cache = {};
        traverse(prev, curr);
        max = Math.max(max, getNumberOfVisited());
    });
}

console.log(max);
