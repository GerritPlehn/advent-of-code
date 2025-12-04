import { readFile } from "node:fs/promises";

async function main() {
	const banks = (await readFile("2025/day03/input.txt", "utf8")).split("\n");

	const bankJoltages: number[] = [];
	for (const bank of banks) {
		// find the largest joltage in the banks batteries 0 to n-1, it will be the the "tens" battery
		// find the largest joltage in the banks batteries "tens" to n, it will be the "ones" battery
		const bankWidth = bank.length;
		let tensIndex = 0;
		let tensValue = 0;
		for (
			let batteryIndex = tensIndex;
			batteryIndex < bankWidth - 1 && tensValue !== 9;
			batteryIndex++
		) {
			const battery = Number(bank[batteryIndex]);
			if (battery > tensValue) {
				tensIndex = batteryIndex;
				tensValue = battery;
			}
		}
		let onesIndex = tensIndex + 1;
		let onesValue = 0;
		for (
			let batteryIndex = onesIndex;
			batteryIndex < bankWidth && onesValue !== 9;
			batteryIndex++
		) {
			const battery = Number(bank[batteryIndex]);
			if (battery > onesValue) {
				onesIndex = batteryIndex;
				onesValue = battery;
			}
		}
		const bankJoltage = tensValue * 10 + onesValue;
		console.log(`Maximum Joltage in bank ${bank} is ${bankJoltage}`);
		bankJoltages.push(bankJoltage);
	}
	const totalJoltage = bankJoltages.reduce((sum, item) => {
		return sum + item;
	}, 0);
	console.log(`Total Joltage: ${totalJoltage}`);
}
await main();
