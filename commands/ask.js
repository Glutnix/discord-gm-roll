const { rollAlias } = require('../charts/chartRoller');

const usage = `[probability code] [question]\n
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
	description: 'Answer a yes or no question. Specify a probability too!',
	cooldown: 2,
	usage,
	execute(message, args) {
		const alias = args.join(' ');
		try {
			const roll = rollAlias(alias);
			message.channel.send(roll);
		}
		catch (err) {
			message.channel.send(err.message);
		}
	},
};

module.exports = command;
