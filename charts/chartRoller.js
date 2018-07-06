const { aliasLookup } = require('./fateChart.js');

const rolld10 = () => {
	return Math.floor(Math.random() * 10);
};

const rollNd10s = (diceRolls) => {
	const rolls = [];
	for (let i = 0; i < diceRolls; i++) {
		rolls.push(rolld10());
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
		(lowRoll, currentRoll) => lowRoll < currentRoll ? lowRoll : currentRoll
	);
};

const rollChart = (chart) => {
	let diceRolls, diceRoll;

	if (chart.takeBest) {
		diceRolls = rollNd10s(chart.diceRolls);
		diceRoll = rolld10BestOf(diceRolls);
	}
	else if (chart.takeWorst) {
		diceRolls = rollNd10s(chart.diceRolls);
		diceRoll = rolld10WorstOf(diceRolls);
	}
	else {
		diceRoll = rolld10();
	}

	return {
		result: chart.table[diceRoll],
		diceRoll: diceRoll + 1,
		diceRolls: (diceRolls ? diceRolls.map(r => r + 1) : undefined),
	};
};


const findChart = (alias) => {
	const chart = aliasLookup[alias.toLowerCase()];
	if (!chart) {
		return false;
	}
	return chart;
};

module.exports = {
	rollChart,
	findChart,
};
