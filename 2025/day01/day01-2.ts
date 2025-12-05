// INCOMPLETE

import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day01/input.txt", "utf8")).split(
		"\n",
	);
	let counter = 50;
	const steps = 100;

	function left(n: number) {
		const startPoint = counter;
		const fullRotations = Math.floor(Math.abs(n) / steps);

		counter -= n;
		counter = counter % steps;
		if (counter < 0) {
			counter = steps + counter;
		}
		let zeroCrossings = 0
		if (n < 0 && counter < startPoint) {
			// we rotated right and ended up with a smaller number
			zeroCrossings = 1
		}
		if (n > 0 && counter > startPoint) {
			// we rotated left and ended up with a larger number
			zeroCrossings = 1
		}
		if (startPoint === 0 || counter === 0) return fullRotations
		return fullRotations+zeroCrossings;
	}

	function right(n: number) {
		return left(-n);
	}

	console.log(`The dial starts by pointing at ${counter}.`);
	let zeroCrossings = 0;
	let zeroEndings = 0;
	for (const row of input) {
		const matches = row.match(/(L|R)([0-9]+)/);
		const direction = matches?.at(1);
		const amount = Number(matches?.at(2));
		if (!direction || !amount) {
			continue;
		}
		let rotationZeroCrossings = 0;
		if (direction === "L") rotationZeroCrossings = left(amount);
		if (direction === "R") rotationZeroCrossings = right(amount);
		if (counter === 0) zeroEndings += 1
		console.log(`The dial is rotated ${row} to point at ${counter}.`);
		if (rotationZeroCrossings) {
			console.log(`it crossed zero ${rotationZeroCrossings} times`);
		}
		zeroCrossings += rotationZeroCrossings;
	}
	console.log(`The password is ${zeroEndings+zeroCrossings}`);
}
await main();
