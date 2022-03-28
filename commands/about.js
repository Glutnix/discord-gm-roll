module.exports = {
	subcommand: (subcommand) => {return subcommand
		.setName('about')
		.setDescription('About the bot')
	},
	cooldown: 5,
	async execute(interaction) {
		await interaction.reply('Learn more about me at https://glutnix.github.io/discord-gm-roll/. You can also find Juniper#9001 if you like.');
	},
};