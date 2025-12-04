import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day01/input.txt", "utf8")).split("\n");
	let counter = 50;
	const steps = 100;

	function left(n: number) {
		// we if n is > 100, only the remainder is relevant
		counter -= n;
		counter = counter % steps;
		if (counter < 0) {
			counter = steps + counter;
		}
	}

	function right(n: number) {
		left(-n);
	}

	console.log(`The dial starts by pointing at ${counter}.`);
	let zeroCrossings = 0;

	for (const row of input) {
		const matches = row.match(/(L|R)([0-9]+)/);
		const direction = matches?.at(1);
		const amount = Number(matches?.at(2));
		if (!direction || !amount) {
			continue;
		}
		if (direction === "L") left(amount);
		if (direction === "R") right(amount);
		if (counter === 0) zeroCrossings++;
		console.log(`The dial is rotated ${row} to point at ${counter}.`);
	}
	console.log(`The password is ${zeroCrossings}`);
}
await main();
