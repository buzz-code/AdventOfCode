async function getDayInput(day) {
    return fetch(`https://adventofcode.com/2024/day/${day}/input`, {
        headers: {
            cookie: `session=${process.env.AOC_SESSION}`
        }
    }).then(res => res.text());
}

module.exports = {
    getDayInput
}