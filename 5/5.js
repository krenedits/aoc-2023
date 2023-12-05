const { getLines } = require("../common");

const lines = getLines("example.txt");
const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((n) => +n);

const maps = [];

let i = 2;
let tmpMap = [];
while (i < lines.length) {
  if (lines[i].match(/\d+ \d+ \d+/g)) {
    tmpMap.push(lines[i].split(" ").map((n) => +n));
  } else {
    maps.push(tmpMap.sort((a, b) => a[1] - b[1]));
    tmpMap = [];
  }
  i++;
}
maps.push(tmpMap.sort((a, b) => a[1] - b[1]));

const firstTask = () => {
  const getNewSeed = (seed, map, i = 0) => {
    const [to, from, length] = map[i];
    const [_, nextFrom] = map[i + 1] || [];

    if (seed < from) {
      return seed;
    }

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

  return Math.min(...seeds.map((seed) => getLocation(seed)));
};

const secondTask = () => {
  // inverse function of getNewSeed
  const getOldSeed = (seed, map, i = 0) => {
    const [to, from, length] = map[i];
    const [_, nextFrom] = map[i + 1] || [];

    if (seed < from) {
      return seed;
    }

    if (seed >= nextFrom) {
      return getOldSeed(seed, map, i + 1);
    }

    if (seed >= from + length) {
      return seed;
    }

    return seed - (to - from);
  };

  // inverse function of getLocation
  const getOldLocation = (seed, i = maps.length - 1) => {
    if (i === -1) {
      return seed;
    }

    const newSeed = getOldSeed(seed, maps[i]);
    console.log(seed, newSeed);

    return getOldLocation(newSeed, i - 1);
  };

  return getOldLocation(46);
};

// console.log(firstTask());
console.log(secondTask());

// const second = Math.min(...newSeeds.map((seed) => getLocation(seed)));
// the solution above needs to be optimized, it takes too long to run
// the solution below is the one I used to get the answer

// console.log(second);
// console.log(maps.map((map) => map.join("\n")).join("\n--------\n"));
