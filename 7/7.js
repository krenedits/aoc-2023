const { getLines } = require("../common");

const lines = getLines("input_home.txt");

const CARD_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const CARD_VALUES_SECOND = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

class Card {
  constructor(values, bid) {
    // values is a string
    this.values = values;
    this.bid = bid;
    this.original = values;
  }

  get occurences() {
    return [...this.values].reduce((acc, value) => {
      acc[value] = acc[value] ? acc[value] + 1 : 1;
      return acc;
    }, {});
  }

  get isRoyalFlush() {
    // values has only one kind of character
    return new Set(this.values).size === 1;
  }

  get isFlush() {
    // 4 characters are the same and 1 is different
    const set = new Set(this.values);
    return (
      set.size === 2 && [...set].some((value) => this.occurences[value] === 4)
    );
  }

  get isFullHouse() {
    // 3 characters are the same and 2 are the same
    return new Set(this.values).size === 2 && !this.isFlush;
  }

  get isThreeOfAKind() {
    // 3 characters are the same and 2 are different
    const set = new Set(this.values);
    return (
      set.size === 3 &&
      [...set].every(
        (value) => this.occurences[value] === 3 || this.occurences[value] === 1
      )
    );
  }

  get isTwoPairs() {
    // 2 characters are the same and 3 are different
    const set = new Set(this.values);
    return (
      set.size === 3 &&
      [...set].every(
        (value) => this.occurences[value] === 2 || this.occurences[value] === 1
      )
    );
  }

  get isPair() {
    // 2 characters are the same and 3 are different
    const set = new Set(this.values);
    return (
      set.size === 4 &&
      [...set].every(
        (value) => this.occurences[value] === 1 || this.occurences[value] === 2
      )
    );
  }

  get value() {
    if (this.isRoyalFlush) {
      return 100;
    }

    if (this.isFlush) {
      return 90;
    }

    if (this.isFullHouse) {
      return 80;
    }

    if (this.isThreeOfAKind) {
      return 70;
    }

    if (this.isTwoPairs) {
      return 60;
    }

    if (this.isPair) {
      return 50;
    }

    return 0;
  }

  compareTo(other) {
    if (this.value > other.value) {
      return 1;
    }

    if (this.value < other.value) {
      return -1;
    }

    for (let i = 0; i < this.values.length; i++) {
      const thisValue = CARD_VALUES[this.values[i]];
      const otherValue = CARD_VALUES[other.values[i]];

      if (thisValue > otherValue) {
        return 1;
      }

      if (thisValue < otherValue) {
        return -1;
      }
    }

    return 0;
  }

  // for the second task, now J is a wildcard
  changeForSecondTask() {
    // replace J-s with the most frequent character
    const occurences = { ...this.occurences, J: 0 };
    const maxOccurence = Math.max(...Object.values(occurences));
    const mostFrequent = Object.keys(occurences)
      .sort((a, b) => CARD_VALUES_SECOND[b] - CARD_VALUES_SECOND[a])
      .find((value) => occurences[value] === maxOccurence);

    this.values = this.values.replace(/J/g, mostFrequent);
  }

  compareToSecond(other) {
    if (this.value > other.value) {
      return 1;
    }

    if (this.value < other.value) {
      return -1;
    }

    for (let i = 0; i < this.values.length; i++) {
      const thisValue = CARD_VALUES_SECOND[this.original[i]];
      const otherValue = CARD_VALUES_SECOND[other.original[i]];

      if (thisValue > otherValue) {
        return 1;
      }

      if (thisValue < otherValue) {
        return -1;
      }
    }

    return 0;
  }
}

const cards = lines.map((line) => {
  const [values, bid] = line.split(" ");
  return new Card(values, bid);
});

const first = cards
  .sort((a, b) => a.compareTo(b))
  .reduce((acc, card, i) => {
    return acc + card.bid * (i + 1);
  }, 0);

console.log(first);

cards.forEach((card) => card.changeForSecondTask());

const second = cards
  .sort((a, b) => a.compareToSecond(b))
  .reduce((acc, card, i) => {
    return acc + card.bid * (i + 1);
  }, 0);

console.log(second);
