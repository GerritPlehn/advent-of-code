import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day06/input.txt", "utf8")).split("\n");
	const terms = input.length - 1;
	const columns = input[0]?.length;

	if (!columns) throw new Error("Invalid Input");

	console.log(input);
	const problemTotals: number[] = [];

	let operator = input[terms - 1]?.[0];
	let problemTotal = 0;
	const operators = ["*", "+"];
	for (let i = 0; i < columns; i++) {
		const columnCells: string[] = [];
		// push all cells of a column into an array
		for (let j = 0; j < terms; j++) {
			const cell = input[j]?.[i];
			if (cell === undefined) throw new Error("column not found");
			columnCells.push(cell);
		}
		console.log(`column ${i} has elements ${columnCells}`);
		// set operator to the last cell in a column if it contains an operator
		const lastCell = columnCells.at(-1);
		if (!lastCell) throw new Error("no last cell found");
		if (operators.includes(lastCell)) {
			operator = lastCell;
		}

		// filter out all operators and spaces from the column cells and construct a number from it
		const columnValue = Number(
			columnCells
				.filter((cell) => ![...operators, " "].includes(cell))
				.join(""),
		);

		if (columnCells.filter((e) => e !== " ").length === 0) {
			// if all rows in a column are spaces, we start a new problem
			console.log(`new problem after column ${i}`);
			problemTotals.push(problemTotal);
			console.log(`problem total is ${problemTotal}`);
			problemTotal = 0;
		}

		if (columnValue) {
			console.log(columnValue);
			switch (operator) {
				case "*":
					if (problemTotal === 0) problemTotal = 1;
					problemTotal *= Number(columnValue);
					break;
				case "+":
					problemTotal += Number(columnValue);
					break;
				default:
					console.error("unknown operation!");
			}
		}
	}
	problemTotals.push(problemTotal);
	console.log(
		`Problem solution sum to ${problemTotals.reduce((total, solution) => total + solution, 0)}`,
	);
}
await main();
