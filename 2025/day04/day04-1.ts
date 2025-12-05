import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day04/input.txt", "utf8")).split(
		"\n",
	);

	const rows = input.length;
	const cols = input.at(0)?.length ?? 0;
	let accessibleRolls = 0;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (input[i]?.[j] !== "@") continue // not a roll
			if (checkCellNeighbors(i, j) < 4) {
				console.log(`cell ${i},${j} is accessible`)
				accessibleRolls++;
			}
		}
	}

	console.log(`${accessibleRolls} accessible cells`);

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
				//console.log(`${i},${j}: ${input[i]?.[j]}`);
				if (input[i]?.[j] === "@") {
					occupiedNeighbors++;
				}
			}
		}
		// don't count yourself as occupied
		if (input[row]?.[col] === "@") {
			occupiedNeighbors--
		}
		console.log(
			`cell ${row},${col} has ${occupiedNeighbors} occupied neighbors`,
		);
		return occupiedNeighbors;
	}
}
await main();
