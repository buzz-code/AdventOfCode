const { getDayInput } = require('./index');

async function getAnswer() {
    const dayInput = await getDayInput(5);

    const [rules, updatesArr] = dayInput
        .split('\n\n')
        .map(section => section.split('\n'));
    const ruleDict = rules
        .map(rule => rule.split('|').map(Number))
        .reduce((acc, [key, value]) => {
            acc[key] ??= [];
            acc[key].push(value);
            return acc;
        }, {});
    const updates = updatesArr
        .map(update => update.split(',').map(Number));
    const validUpdates = updates
        .map(update => update.toSorted((a, b) => compareByRules(a, b, ruleDict)));

    const part1 = validUpdates
        .filter((update, i) => update.join(',') === updates[i].join(','))
        .map(update => getMiddleElement(update))
        .reduce((acc, curr) => acc + curr, 0);

    const part2 = validUpdates
        .filter((update, i) => update.join(',') !== updates[i].join(','))
        .map(update => getMiddleElement(update))
        .reduce((acc, curr) => acc + curr, 0);

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function getMiddleElement(update) {
    return update[Math.floor(update.length / 2)];
}

function compareByRules(a, b, ruleDict) {
    if (ruleDict[a]?.includes(b)) {
        return -1;
    }
    if (ruleDict[b]?.includes(a)) {
        return 1;
    }
    return 0;
}

getAnswer();
