import { readFileSync } from "fs"

const text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const symbolIndices = data.map(line => {
	const matches = line.matchAll(/[\*#%@&\-=\+\/\$]/g)

	const symbols = []
	for (const match of matches) {
		symbols.push(match.index)
	}

	return symbols
})

let sum = 0

for (let i = 0; i < data.length; i++) {
	const line = data[i]

	const matches = line.matchAll(/\d+/g)

	for (const match of matches) {
		let adjacent = false;

		if (match.index != 0 && (symbolIndices[i].includes(match.index - 1))) adjacent = true

		if (match.index + match[0].length != line.length && (symbolIndices[i].includes(match.index + match[0].length))) adjacent = true

		if (i != 0) {
			for (const symbolI of symbolIndices[i - 1]) {
				if (symbolI >= match.index - 1 && symbolI <= match.index + match[0].length) {
					adjacent = true
				}
			}
		}

		if (i != data.length - 1) {
			for (const symbolI of symbolIndices[i + 1]) {
				if (symbolI >= match.index - 1 && symbolI <= match.index + match[0].length) {
					adjacent = true
				}
			}
		}

		if (adjacent) {
			sum += +match[0]
		}
	}
}

console.log(sum)