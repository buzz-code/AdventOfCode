const { getDayInput } = require('./index');

async function getAnswer() {
    const dayInput = await getDayInput(2);

    const lines = dayInput
        .split('\n')
        .filter(Boolean)
        .map(row => row
            .split(' ')
            .map(Number)
        );

    const part1 = lines
        .filter(row => isSafe(row))
        .length;

    const part2 = lines
        .filter(row => isSafe2(row))
        .length;

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function isSafe(levels) {
    const isAllAscending = levels.every((level, index) => index === 0 || level > levels[index - 1]);
    const isAllDescending = levels.every((level, index) => index === 0 || level < levels[index - 1]);
    const isDiffInRange = levels.every((level, index) => index === 0 || Math.abs(level - levels[index - 1]) <= 3);
    return isDiffInRange && (isAllAscending || isAllDescending);
}

function isSafe2(levels) {
    return levels
        .some((level, index) =>
            isSafe(
                levels
                    .slice(0, index)
                    .concat(levels.slice(index + 1))
            )
        );
}

getAnswer();
