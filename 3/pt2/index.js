import { readFileSync } from "fs"

const text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const symbolIndices = data.map(line => {
	const matches = line.matchAll(/\*/g)

	const symbols = []
	for (const match of matches) {
		symbols.push([match.index, []])
	}

	return symbols
})

for (let i = 0; i < data.length; i++) {
	const line = data[i]

	const matches = line.matchAll(/\d+/g)

	for (const match of matches) {
		const symbols = []

		if (match.index != 0) {
			const matchedSymbols = symbolIndices[i].filter(symbol => symbol[0] == match.index - 1)
			symbols.push(...matchedSymbols)
		}

		if (match.index + match[0].length != line.length) {
			const matchedSymbols = symbolIndices[i].filter(symbol => symbol[0] == match.index + match[0].length)
			symbols.push(...matchedSymbols)
		}

		if (i != 0) {
			for (const symbolI of symbolIndices[i - 1]) {
				if (symbolI[0] >= match.index - 1 && symbolI[0] <= match.index + match[0].length) {
					symbols.push(symbolI)
				}
			}
		}

		if (i != data.length - 1) {
			for (const symbolI of symbolIndices[i + 1]) {
				if (symbolI[0] >= match.index - 1 && symbolI[0] <= match.index + match[0].length) {
					symbols.push(symbolI)
				}
			}
		}

		for (const symbol of symbols) {
			symbol[1].push(+match[0])
		}
	}
}

let sum = 0

for (const symbolRow of symbolIndices) {
	for (const symbol of symbolRow) {
		if (symbol[1].length == 2) {
			sum += symbol[1][0] * symbol[1][1]
		}
	}
}

console.log(sum)