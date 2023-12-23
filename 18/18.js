const { getLines } = require('../common');

const lines = getLines('input.txt');

const getBoundaryAndVertices = (lines) => {
    const vertices = [];
    let boundary = 0;

    let index = [0, 0];

    lines.forEach((line) => {
        const [direction, length] = line.split(' ');

        const [i, j] = index;

        switch (direction) {
            case 'U':
                index = [i - length, j];
                break;
            case 'D':
                index = [i + +length, j];
                break;
            case 'L':
                index = [i, j - length];
                break;
            case 'R':
                index = [i, j + +length];
                break;
            default:
                throw new Error(`Unknown direction: ${direction}`);
        }

        boundary += +length;

        vertices.push(index);
    });

    return [boundary, vertices];
};

const getArea = (vertices) => {
    // shoelace formula
    let area = 0;

    for (let i = 0; i < vertices.length; i++) {
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[(i + 1) % vertices.length];

        area += x1 * y2 - x2 * y1;
    }

    return Math.abs(area) / 2;
};

// Pick's theorem (boundary included)
const interiorPoints = (area, boundary) => area + boundary / 2 + 1;

const [firstBoundary, firstVertices] = getBoundaryAndVertices(lines);

const first = interiorPoints(getArea(firstVertices), firstBoundary);

console.log(first);

const directions = ['R', 'D', 'L', 'U'];

const transformedLines = lines.map((line) => {
    const hex = line.match(/#[0-9a-f]{6}/)[0];
    return directions[hex[6]] + ' ' + parseInt(hex.slice(1, 6), 16);
});

const [secondBoundary, secondVertices] =
    getBoundaryAndVertices(transformedLines);

const second = interiorPoints(getArea(secondVertices), secondBoundary);

console.log(second);
