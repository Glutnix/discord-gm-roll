const { rollChart } = require('../charts/chart-roller');
const { askParser } = require('./parsers/ask-parser');

const usage = `[[question]?] {likelihood code}\n
Likelihood Codes:
1, XU, Extremely Unlikely
2, VU, Very Unlikely
3, U, Unlikely
4, SU, Somewhat Unlikely
5, EW, Either Way
6, SL, Somewhat Likely
7, L, Likely
8, VL, Very Likely
9, XL, Extremely Likely`;

module.exports = {
	subcommand: (subcommand) => {return subcommand
		.setName('ask')
		.setDescription('Answer a yes or no question. Specify a likelihood too!')
	},
	cooldown: 2,
	usage: `[[question]?] {likelihood code}\n
	Likelihood Codes:
	1, XU, Extremely Unlikely
	2, VU, Very Unlikely
	3, U, Unlikely
	4, SU, Somewhat Unlikely
	5, EW, Either Way
	6, SL, Somewhat Likely
	7, L, Likely
	8, VL, Very Likely
	9, XL, Extremely Likely`,
	async execute(interaction) {
		const { chart, question } = askParser(args);
		const { result, diceRoll, diceRolls } = rollChart(chart);
		const outputDiceRolls = chart.diceRolls ? `=> (${diceRolls.join()}) ` : '';
		const output = `[${chart.name}] (${chart.diceRolls || 1}d10 ${outputDiceRolls}=> **${diceRoll}**) ${question}\n\t__**${result}**__`;
		await interaction.reply(output);
	},
};