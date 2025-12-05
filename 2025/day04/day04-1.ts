// INCOMPLETE
import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day04/input.sample.txt", "utf8")).split(
		"\n",
	);

	const rows = input.length;
	const cols = input.at(0)?.length ?? 0;
	let accessibleCells = 0;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (checkCellNeighbors(i, j) <= 4) {
				accessibleCells++;
			}
		}
	}

	console.log(`${accessibleCells} accessible cells`);

	function checkCellNeighbors(row: number, col: number, neighbors = 1) {
		let occupiedNeighbors = 0;
		for (
			let i = Math.max(row - neighbors, 0);
			i <= Math.min(rows - 1, row + neighbors);
			i++
		) {
			for (
				let j = Math.max(col - neighbors, 0);
				j <= Math.min(cols - 1, col + neighbors);
				j++
			) {
				console.log(`${i},${j}: ${input[i]?.[j]}`);
				if (input[i]?.[j] === "@" && (i !== row || j !== col)) {
					occupiedNeighbors++;
				}
			}
		}
		console.log(
			`cell ${row},${col} has ${occupiedNeighbors} occupied neighbors`,
		);
		return occupiedNeighbors;
	}
}
await main();
