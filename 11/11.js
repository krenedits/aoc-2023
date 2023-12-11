const { getLines } = require("../common");

const lines = getLines("input_silinfo.txt");
const GALAXY = "#";
const galaxies = [];

lines.forEach((line, i) => {
  line.split("").forEach((value, j) => {
    if (value === GALAXY) {
      galaxies.push([i, j]);
    }
  });
});

const columnsWithoutGalaxies = Array.from({
  length: lines[0].length,
})
  .fill(0)
  .map((_, j) => j)
  .filter((j) => !galaxies.some(([_, _j]) => _j === j));

const rowsWithoutGalaxies = Array.from({
  length: lines.length,
})
  .fill(0)
  .map((_, i) => i)
  .filter((i) => !galaxies.some(([_i, _]) => _i === i));

const padGalaxies = (pad) =>
  galaxies.map(([i, j]) => [
    i + rowsWithoutGalaxies.filter((row) => row < i).length * pad,
    j + columnsWithoutGalaxies.filter((column) => column < j).length * pad,
  ]);

const distancesBetweenGalaxies = (gxs) =>
  gxs.map(([i, j]) => {
    const distances = [];
    gxs.forEach(([i2, j2]) => {
      distances.push(Math.abs(i - i2) + Math.abs(j - j2));
    });
    return distances;
  });

const sumDistances = (distances) =>
  distances.reduce((acc, distances) => {
    const sum = distances.reduce((acc, distance) => acc + distance, 0);
    return acc + sum;
  }, 0) / 2;

const task = (pad) => {
  if (pad > 1) {
    pad--;
  }
  const gxs = padGalaxies(pad);
  const distances = distancesBetweenGalaxies(gxs);
  return sumDistances(distances);
};

const first = task(1);
const second = task(1000000);

console.log(first, second);
