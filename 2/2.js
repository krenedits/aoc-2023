const { getLines } = require("../common");

const lines = getLines("input.txt");

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;

const games = lines.reduce((acc, line) => {
  if (line === "") {
    return acc;
  }

  const game = line.match(/\d+/g)[0];
  const sets = line.split(": ")[1].split("; ");
  let maximum = {
    green: 0,
    blue: 0,
    red: 0,
  };

  sets.forEach((set) => {
    const cubes = set.split(", ");
    cubes.forEach((cube) => {
      const [count, color] = cube.split(" ");

      if (+count > maximum[color]) {
        maximum[color] = +count;
      }
    });
  });

  const possible = sets.every((set) => {
    const cubes = set.split(", ");
    return cubes.every((cube) => {
      const [count, color] = cube.split(" ");

      return bag[color] >= count;
    });
  });
  sum += Object.values(maximum).reduce((acc, val) => acc * val, 1);

  return acc + +(possible ? game : 0);
}, 0);

console.log(games);
console.log(sum);
