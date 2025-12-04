import { readFile } from "node:fs/promises";

function isInvalid(num: number) {
	const characters = Math.ceil(Math.log10(num));
	const iString = num.toString();
	// brute force all repeated combinations the substring contained in the first half of the number string
	// check if they match the candidate. If we can generate the candidate by repeating substring of itself, it must be invalid
	for (let i = 1; i <= characters / 2; i++) {
		const substr = iString.slice(0, i);
		const variation = substr.repeat(characters / i);
		if (variation === iString) return true;
	}
	return false;
}

async function main() {
	const input = (await readFile("2025/day02/input.txt", "utf8")).split(",");

	const invalidIds: number[] = [];
	for (const range of input) {
		const [start, end] = range.split("-").map((str) => Number(str));
		if (!start || !end) continue;
		for (let i = start; i <= end; i++) {
			if (isInvalid(i)) {
				console.log(`${i} is invalid`);
				invalidIds.push(i);
			}
		}
	}
	console.log(
		"Sum of invalids:",
		invalidIds.reduce((sum, item) => {
			return sum + item;
		}, 0),
	);
}

await main();
