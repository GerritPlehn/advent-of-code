import { readFile } from "node:fs/promises";

function isInvalid(i: number) {
	const characters = Math.ceil(Math.log10(i));
	const iString = i.toString();
	// invalid numbers have to be made of pairs of numbers, therefore no number with odd characters can be invalid
	if (characters % 2 === 1) return false;
	const firstHalf = iString.slice(0, characters / 2);
	const secondHalf = iString.slice(characters / 2);
	const invalid = firstHalf === secondHalf;
	if (invalid) console.log(`${i} is invalid`);
	return invalid;
}

async function main() {
	const input = (await readFile("2025/day02/input.txt", "utf8")).split(",");

	const invalidIds: number[] = [];
	for (const range of input) {
		const [start, end] = range.split("-").map((str) => Number(str));
		if (!start || !end) continue;
		for (let i = start; i <= end; i++) {
			if (isInvalid(i)) invalidIds.push(i);
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
