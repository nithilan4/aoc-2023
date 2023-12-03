import { readFileSync } from "fs"

const text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const sum = data.reduce((acc, cur) => {
	const matches = cur.matchAll(/(\d+) ([A-Za-z]+)/g)
	const maxCubesEncountered = {}
	for (const match of matches) {
		if (!(match[2] in maxCubesEncountered) || match[1] > maxCubesEncountered[match[2]]) {
			maxCubesEncountered[match[2]] = +match[1]
		}
	}

	return acc + ((maxCubesEncountered?.red || 1) * (maxCubesEncountered?.green || 1) * (maxCubesEncountered?.blue || 1))
}, 0)

console.log(sum)