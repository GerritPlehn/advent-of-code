import { readFile } from "node:fs/promises";

async function main() {
	const input = (await readFile("2025/day05/input.txt", "utf8"));
    const [rawRanges, rawIngredients] = input.split(
		"\n\n",
	).map(x => x.split('\n'))
    if (!rawRanges || !rawIngredients) throw new Error('invalid input')
    const ranges = rawRanges.map(range => {
        const parsed = range.split('-').map(x => Number(x))
        if (!parsed[0] || !parsed[1]) throw new Error('invalid range input')
        return {start: parsed[0], end: parsed[1]}
    })
    const ingredients = rawIngredients.map(x => Number(x))

    let freshIngredients = 0
    ing:
    for (const ingredient of ingredients) {
        for (const range of ranges) {
            if (ingredient >= range.start && ingredient <= range.end) {
                freshIngredients ++
                continue ing
            }
        }
    }
    console.log(freshIngredients)


}
await main()