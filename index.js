const readline = require("node:readline");

// biome-ignore format: no need to format this object
const unicodeMap = {
	a: "а", c: "с", d: "ԁ", e: "е", i: "і", j: "ј", o: "ο", p: "р", q: "ԛ", s: "ѕ", w: "ԝ", x: "х", y: "у", A: "Α", B: "Β", C: "С", E: "Ε", H: "Η", I: "Ι", J: "Ј", K: "Κ", M: "Μ", N: "Ν", O: "Ο", P: "Ρ", S: "Ѕ", T: "Τ", X: "Χ", Y: "Υ", Z: "Ζ"
};

function generateVariations(word, unicodeMap) {
	const replaceablePositions = Array.from(word)
		.map((char, i) => (unicodeMap[char] ? [i, unicodeMap[char]] : null))
		.filter(Boolean);
	const variations = new Set();

	for (let r = 1; r <= replaceablePositions.length; r++) {
		const combos = getCombinations(replaceablePositions, r);
		for (const combo of combos) {
			const newWord = word.split("");
			for (const [pos, replacement] of combo) {
				newWord[pos] = replacement;
			}
			variations.add(newWord.join(""));
		}
	}
	return Array.from(variations).sort();
}

function getCombinations(array, r) {
	if (r === 0) return [[]];
	if (array.length === 0) return [];
	const [first, ...rest] = array;
	const withFirst = getCombinations(rest, r - 1).map((comb) => [
		first,
		...comb,
	]);
	const withoutFirst = getCombinations(rest, r);
	return [...withFirst, ...withoutFirst];
}

function printVariations(word, variations) {
	variations.forEach((variation, index) => {
		console.log(`  [${index + 1}] ${variation}`);
	});
}

function main(word) {
	const variations = generateVariations(word, unicodeMap);
	if (variations.length > 0) {
		printVariations(word, variations);
	} else {
		console.log(" No variations for this word found");
	}

	readlineInterface.question(`\n  Press 'ENTER' to return to menu\n`, () => {
		menu();
	});
}

function clear() {
	console.clear();
}

function menu() {
	clear();
	readlineInterface.question("\n  [+] Please enter a word: ", (word) => {
		console.log();
		main(word.trim());
	});
}

const readlineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

menu();
