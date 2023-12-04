const { getLines } = require("../common");

const lines = getLines("input_home.txt");

const numbers = [];

lines.forEach((line) => {
  const copy = line.replace(/Card \d+: /, "");
  const [our, winning] = copy.split(" | ");
  numbers.push({
    our: our
      .split(" ")
      .filter((n) => n !== "")
      .map((n) => +n),
    winning: winning
      .split(" ")
      .filter((n) => n !== "")
      .map((n) => +n),
  });
});

const first = numbers.reduce((acc, curr) => {
  const intersection = curr.our.filter((n) => curr.winning.includes(n)).length;

  if (intersection === 0) {
    return acc;
  }

  // for the second part
  curr.matched = intersection;

  return acc + 2 ** (intersection - 1);
}, 0);

console.log(first);

const getNumberOfCards = (number, i) => {
  if (!number) return 0;
  if (!number.matched) return 1;

  return (
    1 +
    numbers
      .slice(i + 1, i + 1 + number.matched)
      .reduce(
        (acc, curr, index) => acc + getNumberOfCards(curr, i + 1 + index),
        0
      )
  );
};

const second = numbers.reduce((acc, curr, index) => {
  return acc + getNumberOfCards(curr, index);
}, 0);

console.log(second);
