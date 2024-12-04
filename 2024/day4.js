const { getDayInput } = require('./index');

async function getAnswer() {
    const dayInput = await getDayInput(4);

    const matrix = dayInput
        .split('\n');
    const searchTerm = 'XMAS';
    const searchArray = [searchTerm, searchTerm.split('').reverse().join('')];

    const m = matrix[0].length;
    const n = matrix.length;
    const horizontalCount = new Array(n)
        .fill(0)
        .map((_, i) => horizontalSearch(matrix[i], searchArray))
        .reduce((acc, curr) => acc + curr, 0);
    const verticalCount = new Array(m)
        .fill(0)
        .map((_, i) => verticalSearch(matrix, i, searchArray))
        .reduce((acc, curr) => acc + curr, 0);
    const diagonalCount = new Array(m + n - 1)
        .fill(0)
        .map((_, i) => diagonalSearch(matrix, i, searchArray, m, n))
        .reduce((acc, curr) => acc + curr, 0);
    const reverseDiagonalCount = new Array(m + n - 1)
        .fill(0)
        .map((_, i) => reverseDiagonalSearch(matrix, i, searchArray, m, n))
        .reduce((acc, curr) => acc + curr, 0);

    const part1 = horizontalCount + verticalCount + diagonalCount + reverseDiagonalCount;

    const searchTerm2 = 'MAS';
    const [first, middle, last] = searchTerm2.split('');
    const part2 = new Array(m + n - 1)
        .fill(0)
        .map((_, i) => diagonalSearch2(matrix, i, [first, middle, last], m, n))
        .reduce((acc, curr) => acc + curr, 0);

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function horizontalSearch(row, searchArray) {
    return searchArray
        .map(searchTerm => row.split(searchTerm).length - 1)
        .reduce((acc, curr) => acc + curr, 0);
}

function verticalSearch(matrix, i, searchArray) {
    const column = matrix
        .map(row => row[i])
        .join('');
    return horizontalSearch(column, searchArray);
}

function diagonalSearch(matrix, i, searchArray, m, n) {
    const diagonal = new Array(Math.min(m, n))
        .fill(0)
        .map((_, j) => matrix[j][i - j] ?? '')
        .join('');
    return horizontalSearch(diagonal, searchArray);
}

function reverseDiagonalSearch(matrix, i, searchArray, m, n) {
    const reverseDiagonal = new Array(Math.min(m, n))
        .fill(0)
        .map((_, j) => matrix[j][m - i + j] ?? '')
        .join('');
    return horizontalSearch(reverseDiagonal, searchArray);
}

function diagonalSearch2(matrix, i, [first, middle, last], m, n) {
    const diagonal = new Array(Math.min(m, n))
        .fill(0)
        .map((_, j) => matrix[j][i - j] ?? '');
    return diagonal
        .map((_, j) => diagonal[j] === middle && checkDiagonal(matrix, j, i - j, first, last) ? 1 : 0)
        .reduce((acc, curr) => acc + curr, 0);
}

const validFirstIndexes = [[0, 1], [0, 2], [1, 3], [2, 3]]
    .map(indexes => indexes.join(','));
function checkDiagonal(matrix, i, j, first, last) {
    const values = [
        matrix[i - 1]?.[j - 1],
        matrix[i - 1]?.[j + 1],
        matrix[i + 1]?.[j - 1],
        matrix[i + 1]?.[j + 1]
    ];
    const firstIndexes = values
        .map((value, index) => value === first ? index : -1)
        .filter(index => index !== -1);
    const lastIndexes = values
        .map((value, index) => value === last ? index : -1)
        .filter(index => index !== -1);
    if (firstIndexes.length !== 2 || lastIndexes.length !== 2) {
        return false;
    }

    return validFirstIndexes
        .includes(firstIndexes.join(','));
}

getAnswer();
