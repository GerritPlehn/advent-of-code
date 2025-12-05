import { readFile } from "node:fs/promises";

async function main() {
	type Range = { start: number; end: number };
	const input = await readFile("2025/day05/input.txt", "utf8");
	const [rawRanges, rawIngredients] = input
		.split("\n\n")
		.map((x) => x.split("\n"));
	if (!rawRanges || !rawIngredients) throw new Error("invalid input");
	const ranges: Range[] = rawRanges.map((range) => {
		const parsed = range.split("-").map((x) => Number(x));
		if (!parsed[0] || !parsed[1]) throw new Error("invalid range input");
		return { start: parsed[0], end: parsed[1] };
	});

	let combinedSomething = false;
	// loop over every combination of ranges from the pool of ranges
	// try to combine the two candiate ranges
	// if combining the ranges results in a merged range, remove both original ranges from the pool of available ranges and add the merge result to the pool
	// start the process over until no ranges were combined in an iteration
	const iterationCap = 100;
	let iterations = 0;
	do {
		combinedSomething = false;
		foo: for (let i = 0; i < ranges.length - 1; i++) {
			for (let j = i + 1; j < ranges.length; j++) {
				const combinationOutput = combineRanges(ranges[i], ranges[j]);
				if (combinationOutput.length === 1) {
					// we have to start splicing from the larger index j, otherwise i will shift
					ranges.splice(j, 1);
					ranges.splice(i, 1);
					ranges.push(...combinationOutput);
					combinedSomething = true;
					break foo;
				}
			}
		}
		iterations++;
	} while (combinedSomething && iterations < iterationCap);
	console.log(`nothing left to combine after ${iterations} iterations`);
	console.log(ranges);
	console.log(ranges.length);

	const idsInRanges = ranges.reduce(
		(sum, range) => sum + (range.end - range.start) + 1,
		0,
	);

	console.log(idsInRanges);

	function combineRanges(a: Range, b: Range) {
		const minStart = Math.min(a.start, b.start);
		const maxStart = Math.max(a.start, b.start);
		const minEnd = Math.min(a.end, b.end);
		const maxEnd = Math.max(a.end, b.end);

		if (a.start === b.start && a.end === b.end) return [a];
		if (maxStart < minEnd) {
			const combinedRange: Range = { start: minStart, end: maxEnd };
			return [combinedRange];
		}
		return [a, b];
	}
}
await main();
// 352681648086050 too low
// 352681648086161 too high
