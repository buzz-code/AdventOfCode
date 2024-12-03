const { getDayInput } = require('./index');

async function getAnswer() {
    const dayInput = await getDayInput(3);

    const commands = dayInput.match(/(mul\(\d+,\d+\))|(do\(\))|don't\(\)/g);

    const part1 = commands
        .reduce((acc, curr) => acc + mul(curr), 0);

    let part2 = 0;
    let blocked = false;
    for (let i = 0; i < commands.length; i++) {
        if (shouldBlock(commands[i])) {
            blocked = true;
        } else if (shouldUnblock(commands[i])) {
            blocked = false;
        }
        if (!blocked) {
            part2 += mul(commands[i]);
        }
    }

    console.log(`Part 1: ${part1}`);
    console.log(`Part 2: ${part2}`);
}

function mul(mulCommand) {
    if (!shouldMul(mulCommand)) {
        return 0;
    }
    const [_, a, b] = mulCommand.match(/mul\((\d+),(\d+)\)/);
    return Number(a) * Number(b);
}

function shouldBlock(command) {
    return command.includes('don\'t');
}

function shouldUnblock(command) {
    return command.includes('do()');
}

function shouldMul(command) {
    return command.includes('mul');
}

getAnswer();
