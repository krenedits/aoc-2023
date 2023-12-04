const { getLines } = require("../common");

const data = getLines("input.txt");

const first = () => {
  return data.reduce((acc, curr) => {
    if (!curr) return acc;
    const numbersInLine = curr.match(/\d/g);
    return acc + +(numbersInLine[0] + numbersInLine.slice(-1)[0]);
  }, 0);
};

const second = () => {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numberMap = numbers.reduce((acc, curr, index) => {
    acc[curr] = index + 1;
    acc[index + 1] = index + 1;
    return acc;
  }, {});

  return data.reduce((acc, curr) => {
    if (!curr) return acc;
    let i = 0;
    let firstDigit = "";
    let lastDigit = "";
    let first = "";
    let second = "";
    const regex = new RegExp("[0-9]|" + numbers.join("|"), "g");

    while (i < curr.length && !(firstDigit && lastDigit)) {
      first += curr[i];
      second = curr[curr.length - i - 1] + second;
      const firstMatch = first.match(regex);
      const secondMatch = second.match(regex);

      if (firstMatch && !firstDigit) {
        firstDigit = numberMap[firstMatch[0]];
      }

      if (secondMatch && !lastDigit) {
        lastDigit = numberMap[secondMatch[0]];
      }

      i++;
    }

    return acc + +(firstDigit + "" + lastDigit);
  }, 0);
};

console.log(first());
console.log(second());
