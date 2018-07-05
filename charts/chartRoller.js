const { aliasLookup } = require('./fateChart.js');

const rolld10 = () => {
	return Math.floor(Math.random() * 10);
};

const rollNd10s = (diceRolls) => {
	const rolls = [];
	for (let i = 0; i < diceRolls; i++) {
		rolls.push(rolld10);
	}
	return rolls;
};

const rolld10BestOf = (rolls) => {
	return rolls.reduce(
		(highRoll, currentRoll) => highRoll > currentRoll ? highRoll : currentRoll
	);
};
const rolld10WorstOf = (rolls) => {
	return rolls.reduce(
		(highRoll, currentRoll) => highRoll > currentRoll ? highRoll : currentRoll
	);
};

const rollAlias = (alias) => {
	const chart = aliasLookup[alias.toLowerCase()];
	if (!chart) {
		throw new Error(`no table matches the code *${alias}*`);
	}

	let roll;

	if (chart.takeBest) {
		roll = rolld10BestOf(rollNd10s(chart.diceRolls));
	}
	else if (chart.takeWorst) {
		roll = rolld10WorstOf(rollNd10s(chart.diceRolls));
	}
	else {
		roll = rolld10();
	}
	console.log('dice roll', roll);
	return chart.table[roll];
};

console.log('roll', rollAlias('ew'));

module.exports = {
	rollAlias,
};
