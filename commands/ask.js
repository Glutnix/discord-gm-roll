const { rollChart } = require('../charts/chartRoller');
const { askParser } = require('./parsers/askParser');

const usage = `[[question]?] {probability code}\n
Probability Codes:
1, XU, Extremely Unlikely
2, VU, Very Unlikely
3, U, Unlikely
4, SU, Somewhat Unlikely
5, EW, Either Way
6, SL, Somewhat Likely
7, L, Likely
8, VL, Very Likely
9, XL, Extremely Likely`;

const command = {
	name: 'ask',
	aliases: ['a'],
	description: 'Answer a yes or no question. Specify a probability too!',
	cooldown: 2,
	usage,
	execute(message, args) {
		const { chart, question } = askParser(args);
		const { result, diceRoll, diceRolls } = rollChart(chart);
		const outputDiceRolls = chart.diceRolls ? `=> (${diceRolls.join()}) ` : '';
		const output = `[${chart.name}] (${chart.diceRolls || 1}d10 ${outputDiceRolls}=> **${diceRoll}**) ${question}\n\t__**${result}**__`;
		message.channel.send(output);
	},
};

module.exports = command;
