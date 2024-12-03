const { getDayInput } = require('./index');

async function getAnswer() {
    const dayInput = await getDayInput(1);

    const lines = dayInput
        .split('\n')
        .filter(Boolean)
        .map(row => row.split('   '));

    const arr1 = lines.map(row => row[0]);
    const arr2 = lines.map(row => row[1]);

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    const part1 = arr1
        .map((item, index) => getDistance(item, arr2[index]))
        .reduce((acc, curr) => acc + curr, 0);

    const arr2Count = arr2
        .reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});

    const part2 = arr1
        .map(item => item * (arr2Count[item] || 0))
        .reduce((acc, curr) => acc + curr, 0);

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function getDistance(item1, item2) {
    return Math.abs(item1 - item2);
}

getAnswer();
