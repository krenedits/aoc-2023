const { getLines } = require('../common');

const lines = getLines('input_home.txt');

const rotateNorth = (copy) => {
    let i = 0;

    while (i < copy[0].length) {
        let O = 0;
        let dot = 0;
        let j = 0;

        while (j < copy.length) {
            if (copy[j][i] === 'O') {
                O++;
            } else if (copy[j][i] === '.') {
                dot++;
            } else {
                for (let k = j - O - dot; k < j - dot; k++) {
                    copy[k] = copy[k].slice(0, i) + 'O' + copy[k].slice(i + 1);
                }

                for (let k = j - dot; k < j; k++) {
                    copy[k] = copy[k].slice(0, i) + '.' + copy[k].slice(i + 1);
                }

                O = 0;
                dot = 0;
            }

            j++;
        }

        for (let k = j - O - dot; k < j - dot; k++) {
            copy[k] = copy[k].slice(0, i) + 'O' + copy[k].slice(i + 1);
        }

        for (let k = j - dot; k < j; k++) {
            copy[k] = copy[k].slice(0, i) + '.' + copy[k].slice(i + 1);
        }

        i++;
    }

    return copy;
};

const rotateSouth = (copy) => {
    let i = 0;

    while (i < copy[0].length) {
        let O = 0;
        let dot = 0;
        let j = copy.length - 1;

        while (j >= 0) {
            if (copy[j][i] === 'O') {
                O++;
            } else if (copy[j][i] === '.') {
                dot++;
            } else {
                for (let k = j + O + dot; k > j + dot; k--) {
                    copy[k] = copy[k].slice(0, i) + 'O' + copy[k].slice(i + 1);
                }

                for (let k = j + dot; k > j; k--) {
                    copy[k] = copy[k].slice(0, i) + '.' + copy[k].slice(i + 1);
                }

                O = 0;
                dot = 0;
            }

            j--;
        }

        for (let k = j + O + dot; k > j + dot; k--) {
            copy[k] = copy[k].slice(0, i) + 'O' + copy[k].slice(i + 1);
        }

        for (let k = j + dot; k > j; k--) {
            copy[k] = copy[k].slice(0, i) + '.' + copy[k].slice(i + 1);
        }

        i++;
    }

    return copy;
};

const rotateWest = (copy) => {
    let i = 0;

    while (i < copy.length) {
        let O = 0;
        let dot = 0;
        let j = 0;

        while (j < copy[i].length) {
            if (copy[i][j] === 'O') {
                O++;
            } else if (copy[i][j] === '.') {
                dot++;
            } else {
                for (let k = j - O - dot; k < j - dot; k++) {
                    copy[i] = copy[i].slice(0, k) + 'O' + copy[i].slice(k + 1);
                }

                for (let k = j - dot; k < j; k++) {
                    copy[i] = copy[i].slice(0, k) + '.' + copy[i].slice(k + 1);
                }

                O = 0;
                dot = 0;
            }

            j++;
        }

        for (let k = j - O - dot; k < j - dot; k++) {
            copy[i] = copy[i].slice(0, k) + 'O' + copy[i].slice(k + 1);
        }

        for (let k = j - dot; k < j; k++) {
            copy[i] = copy[i].slice(0, k) + '.' + copy[i].slice(k + 1);
        }

        i++;
    }

    return copy;
};

const rotateEast = (copy) => {
    let i = 0;

    while (i < copy.length) {
        let O = 0;
        let dot = 0;
        let j = copy[i].length - 1;

        while (j >= 0) {
            if (copy[i][j] === 'O') {
                O++;
            } else if (copy[i][j] === '.') {
                dot++;
            } else {
                for (let k = j + O + dot; k > j + dot; k--) {
                    copy[i] = copy[i].slice(0, k) + 'O' + copy[i].slice(k + 1);
                }

                for (let k = j + dot; k > j; k--) {
                    copy[i] = copy[i].slice(0, k) + '.' + copy[i].slice(k + 1);
                }

                O = 0;
                dot = 0;
            }

            j--;
        }

        for (let k = j + O + dot; k > j + dot; k--) {
            copy[i] = copy[i].slice(0, k) + 'O' + copy[i].slice(k + 1);
        }

        for (let k = j + dot; k > j; k--) {
            copy[i] = copy[i].slice(0, k) + '.' + copy[i].slice(k + 1);
        }

        i++;
    }

    return copy;
};

const rotator = [rotateNorth, rotateWest, rotateSouth, rotateEast];

const cache = [];

const rotate = (n) => {
    let i = 0;
    let copy = lines.slice();

    while (i < n) {
        copy = rotator.reduce((acc, rotate) => {
            const cp = acc.slice();
            return rotate(cp);
        }, copy.slice());

        if (!cache.includes(copy.join('\n'))) {
            cache.push(copy.join('\n'));
        } else {
            const index = cache.indexOf(copy.join('\n'));
            const circleLength = i - index;

            return cache[index + ((n - i) % circleLength) - 1];
        }

        i++;
    }

    return copy;
};

const first = rotateNorth(lines.slice()).reduce((acc, value, index) => {
    return (
        acc +
        value.split('').filter((char) => char === 'O').length *
            (lines.length - index)
    );
}, 0);

console.log(first);

const second = rotate(1000000000)
    .split('\n')
    .reduce((acc, value, index) => {
        return (
            acc +
            value.split('').filter((char) => char === 'O').length *
                (lines.length - index)
        );
    }, 0);

console.log(second);
