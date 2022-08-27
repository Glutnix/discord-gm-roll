const { SlashCommandBuilder } = require('discord.js');
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
	data: (new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Answer a yes or no question. Specify a likelihood too!')
		.addStringOption(option => option.setName('question')
			.setDescription('Enter your question')
			.setRequired(false)
		)
		.addStringOption(option => option.setName('likelihood')
			.setDescription('The likelihood your question will be true')
			.addChoices(
				{name: "Extremely unlikely", value: "XU"},
				{name: "1. XU - extremely unlikely", value: "XU"},
				{name: "2. VU - very unlikely", value: "VU"},
				{name: "3. U - unlikely", value: "U"},
				{name: "4. SU - somewhat unlikely", value: "SU"},
				{name: "5. EW - either way", value: "EW"},
				{name: "6. SL - somewhat likely", value: "SL"},
				{name: "7. L - likely", value: "L"},
				{name: "8. VL - very likely", value: "VL"},
				{name: "9. XL - extremely likely", value: "XL"},
			))
	),
	cooldown: 2,
	usage,
	async execute(interaction) {
		const { chart, question } = askParser(interaction.options.getString('question') || "");
		const { result, diceRoll, diceRolls } = rollChart(chart);
		const outputDiceRolls = chart.diceRolls ? `=> (${diceRolls.join()}) ` : '';
		const output = `[${chart.name}] (${chart.diceRolls || 1}d10 ${outputDiceRolls}=> **${diceRoll}**) ${question}\n\t__**${result}**__`;
		await interaction.reply(output);
	},
};