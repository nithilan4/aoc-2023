import { readFileSync } from "fs"

let text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const numberMapping = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

const sum = data.map(line => {
	const matches = [...line.toLowerCase().matchAll(/(?=((\d)|one|two|three|four|five|six|seven|eight|nine))/g)].map(m => m[1])

	const first = matches[0]
	const last = matches.at(-1)
	return +`${+first == first ? first : numberMapping[first]}${+last == last ? last : numberMapping[last]}`
}).reduce((acc, cur) => acc + cur, 0)

console.log(sum)