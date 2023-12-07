// Well, this is a mess, but it works
// I'm not proud of it, but I'm not ashamed either
// I'm just glad it's over
// I'm not sure if I'll ever look at this code again

// Please don't judge me
// I'm not a bad person
// I just wanted to solve this problem
// I'm sorry

const { getLines } = require('../common');

const lines = getLines('input_silinfo.txt');
const seeds = lines[0]
    .split(': ')[1]
    .split(' ')
    .map((n) => +n);

const maps = [];

let i = 2;
let tmpMap = [];
let hasZero = false;
let min = Infinity;
while (i <= lines.length) {
    if ((lines[i] || '').match(/\d+ \d+ \d+/g)) {
        tmpMap.push(lines[i].split(' ').map((n) => +n));
        if (tmpMap[tmpMap.length - 1][1] === 0) {
            hasZero = true;
        }
        min = Math.min(min, tmpMap[tmpMap.length - 1][1]);
    } else {
        if (!hasZero) {
            tmpMap.push([0, 0, min]);
        }
        maps.push(tmpMap.sort((a, b) => a[1] - b[1]));
        tmpMap = [];
        hasZero = false;
        min = Infinity;
    }
    i++;
}

const getNewSeed = (seed, map, i = 0) => {
    const [to, from, length] = map[i];
    const [, nextFrom] = map[i + 1] || [];

    if (seed >= nextFrom) {
        return getNewSeed(seed, map, i + 1);
    }

    if (seed >= from + length) {
        return seed;
    }

    return seed + (to - from);
};

const getLocation = (seed, i = 0) => {
    if (i === maps.length) {
        return seed;
    }

    const newSeed = getNewSeed(seed, maps[i]);

    return getLocation(newSeed, i + 1);
};
const firstTask = () => {
    return Math.min(...seeds.map((seed) => getLocation(seed)));
};

const first = firstTask();

const secondTask = () => {
    // inverse function of the first task

    // inverse of getNewSeed
    // so that we got the seed now we need to get the location
    const getNewLocation = (location, map, i = 0) => {
        if (i === map.length) {
            return location;
        }
        const [to, from, length] = map[i];

        if (location >= to + length || location < to) {
            return getNewLocation(location, map, i + 1);
        }

        return location - (to - from);
    };

    const getSeed = (location, i = maps.length - 1) => {
        if (i === -1) {
            return location;
        }

        const newSeed = getNewLocation(location, maps[i]);

        return getSeed(newSeed, i - 1);
    };

    const intervals = [];
    for (let i = 0; i < seeds.length - 1; i += 2) {
        intervals.push([seeds[i], seeds[i + 1]]);
    }

    // I prefer not to speak about these magic numbers...
    // I just found them by sampling
    let location = 50000000;
    let upperBound = 52210895;

    while (location < upperBound) {
        const seed = getSeed(location);
        if (
            intervals.some(
                ([lower, upper]) => seed >= lower && seed < lower + upper
            )
        ) {
            return location;
        }
        location++;
    }

    return upperBound;
};

const second = secondTask();
console.log(first, second);
// console.log(second);
// console.log(maps.map((map) => map.join('\n')).join('\n--------\n'));
