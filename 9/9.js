const { getLines } = require("../common");

const lines = getLines("input_silinfo.txt");

const yValues = lines.map((line) => line.split(" ").map((value) => +value));

const lagrange = (x, xValues, yValues) => {
  let lagrangePol = 0;
  for (let i = 0; i < xValues.length; i++) {
    let basicsPol = 1;
    for (let j = 0; j < xValues.length; j++) {
      if (i !== j) {
        basicsPol *= (x - xValues[j]) / (xValues[i] - xValues[j]);
      }
    }
    lagrangePol += basicsPol * yValues[i];
  }
  return lagrangePol;
};

const n = yValues[0].length;

const xValues = new Array(n).fill(0).map((_, i) => i);

const nextLagranged = yValues.map((values) => lagrange(n, xValues, values));
const previousLagranged = yValues.map((values) =>
  lagrange(-1, xValues, values)
);

const first = nextLagranged.reduce((acc, value) => acc + value, 0);
const second = previousLagranged.reduce((acc, value) => acc + value, 0);

console.log(Math.round(first), Math.round(second));
