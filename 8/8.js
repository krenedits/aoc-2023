const { getLines } = require("../common");

const lines = getLines("input_silinfo.txt");

// steps like RLLRLLRLLR
const originalSteps = lines[0];

const translation = {
  L: "left",
  R: "right",
};

class Node {
  constructor(value, left, right, parent) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

// the lines like 'AAA = (BBB, CCC)'

let i = 1;
let nodes = [];
let node = null;
let current = null;

while (i < lines.length) {
  const [value, left, right] = lines[i]
    .match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/)
    .slice(1);

  if (!node) {
    node = new Node(value, left, right);
    current = node;
  }

  if (current.value === value) {
    current.left = left;
    current.right = right;
  } else {
    nodes.push(node);
    node = new Node(value, left, right);
    current = node;
  }

  i++;
}

nodes.push(node);

nodes = nodes.map((node) => {
  node.left = nodes.find((n) => n.value === node.left);
  node.right = nodes.find((n) => n.value === node.right);
  node.left.parent = node;
  node.right.parent = node;
  return node;
});

const traverse = (node, steps, first = true) => {
  let current = node;
  let i = 0;
  while (
    (first && current.value !== "ZZZ") ||
    !(first || current.value.endsWith("Z"))
  ) {
    const step = steps[i % steps.length];
    const direction = translation[step];

    current = current[direction];
    i++;
  }

  return i;
};

const AAA = nodes.find((node) => node.value === "AAA");

const first = traverse(AAA, originalSteps);

const endsWithA = nodes.filter((node) => node.value.endsWith("A"));
const traverseValues = endsWithA.map((node) =>
  traverse(node, originalSteps, false)
);

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);

const second = traverseValues.reduce((acc, curr) => lcm(acc, curr), 1);

console.log(first, second);
