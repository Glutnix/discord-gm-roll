const { findChart } = require('../../charts/chart-roller');
const askParser = (question) => {
	console.log(question);
	// try each word and see if it's an alias.
	const words = question.split(' ');
	const alias = words.find((word) => {
		return findChart(word.trim());
	});

	const chart = findChart(alias) || findChart('EW');

	return {
		question,
		alias,
		chart,
	};
};

module.exports = {
	askParser,
};
