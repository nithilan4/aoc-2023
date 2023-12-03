import { readFileSync } from "fs"

const text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const maxMapping = {
	red: 12,
	green: 13,
	blue: 14
}

const sum = data.reduce((acc, cur, i) => {
	const matches = cur.matchAll(/(\d+) ([A-Za-z]+)/g)
	for (const match of matches) {
		if (match[1] > maxMapping[match[2]]) {
			return acc
		}
	}

	return acc + i + 1
}, 0)

console.log(sum)