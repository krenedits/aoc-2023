const { getLines } = require('../../common');

const lines = getLines('input.txt');

let numbers = [];
let symbols = [];

class EngineNumber {
    constructor(value, from, to, line) {
        this.value = value;
        this.from = from;
        this.to = to;
        this.line = line;
    }

    hasSymbolInNeighbourhood(symbol) {
        return (
            Math.abs(this.line - symbol.line) <= 1 &&
            this.from - 1 <= symbol.index &&
            this.to + 1 >= symbol.index
        );
    }
}

class Symbol {
    constructor(line, index, value) {
        this.line = line;
        this.index = index;
        this.value = value;
    }

    numberOfNumberNeighbours() {
        return numbers.filter((number) => number.hasSymbolInNeighbourhood(this))
            .length;
    }

    isGear() {
        return this.value === '*' && this.numberOfNumberNeighbours() === 2;
    }

    getNeighboursProduct() {
        if (!this.isGear()) {
            return 0;
        }

        const neighbours = numbers.filter((number) =>
            number.hasSymbolInNeighbourhood(this)
        );

        return neighbours[0].value * neighbours[1].value;
    }
}

lines.forEach((line, i) => {
    let j = 0;

    while (j < line.length) {
        if (!isNaN(line[j])) {
            let number = line[j];
            while (!isNaN(line[j + 1])) {
                number += line[j + 1];
                j++;
            }
            numbers.push(
                new EngineNumber(+number, j - number.length + 1, j, i)
            );
        } else if (line[j] !== '.') {
            symbols.push(new Symbol(i, j, line[j]));
        }
        j++;
    }
});

const first = numbers
    .filter((number) =>
        symbols.some((symbol) => number.hasSymbolInNeighbourhood(symbol))
    )
    .reduce((acc, number) => acc + number.value, 0);

const second = symbols.reduce(
    (acc, symbol) => acc + symbol.getNeighboursProduct(),
    0
);

console.log(first, second);
