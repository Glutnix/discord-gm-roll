const { findChart } = require('../../charts/chart-roller');
const askParser = (args) => {
	const load = args.join(' ');
	const question = load.substring(0, load.lastIndexOf('?') + 1);

	// try each word and see if it's an alias.
	const words = args.reverse();
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
