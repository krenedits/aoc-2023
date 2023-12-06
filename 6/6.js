const { getLines } = require("../common");

const lines = getLines("input.txt");
const rawTimes = lines[0].match(/\d+/g);
const rawDistances = lines[1].match(/\d+/g);

// for first task
const times = rawTimes.map((n) => +n);
const distances = rawDistances.map((n) => +n);

// for second task
const time = +times.join("");
const distance = +distances.join("");

const quadraticEquationSolver = (a, b, c) => {
  const delta = b * b - 4 * a * c;
  const sqrtDelta = Math.floor(Math.sqrt(delta));
  const x1 = (-b + sqrtDelta) / (2 * a);
  const x2 = (-b - sqrtDelta) / (2 * a);

  return [x1, x2];
};

const getRangeLength = (t, d) => {
  const [x1, x2] = quadraticEquationSolver(1, -t, d);
  const isInclusive = x1 * (t - x1) === d; // must be strictly higher than the record
  return Math.floor(x1) - Math.ceil(x2) + (isInclusive ? -1 : 1);
};

const first = times
  .map((time, i) => {
    return getRangeLength(time, distances[i]);
  })
  .reduce((a, b) => a * b);

const second = getRangeLength(time, distance);

console.log(first);
console.log(second);
