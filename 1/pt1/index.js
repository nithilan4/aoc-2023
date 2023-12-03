import { readFileSync } from "fs"

const text = readFileSync("../input.txt").toString()

const data = text.split("\r\n")

const sum = data.map(line => {
	let firstDigit = null
	let lastDigit = null

	for (const c of line) {
		if (+c == c) {
			if (firstDigit == null) {
				firstDigit = c
				break
			}
		}
	}

	const reversed = line.split("").reverse().join("")
	for (const c of reversed) {
		if (+c == c) {
			if (lastDigit == null) {
				lastDigit = c
				break
			}
		}
	}

	return +`${firstDigit}${lastDigit}`
}).reduce((acc, cur) => acc + cur, 0)

console.log(sum)