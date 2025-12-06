import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day06/input.txt", "utf8"))
		.split("\n")
		.map((row) =>
			row
				.replaceAll(/\s+/g, " ")
				.split(" ")
				.filter((e) => e !== ""),
		);
	const terms = input.length - 1;
	const problems = input[0]?.length;

	if (!problems) throw new Error("invalid input");

	console.log(input);
	const rowTotals: number[] = [];
	for (let i = 0; i < problems; i++) {
		const operator = input[terms - 1]?.[i];
		let rowTotal = operator === "*" ? 1 : 0;
		console.log(`problem ${i}`);
		for (let j = 0; j < terms - 1; j++) {
			const operand = input[j]?.[i];
			switch (operator) {
				case "*":
					rowTotal *= Number(operand);
					break;
				case "+":
					rowTotal += Number(operand);
					break;
				default:
					console.error("unknown operation!");
			}
			console.log(`${operator}${operand}`);
		}
		console.log(rowTotal);
		rowTotals.push(rowTotal);
	}
	console.log(
		`Problem solution sum to ${rowTotals.reduce((total, solution) => total + solution, 0)}`,
	);
}
await main();
