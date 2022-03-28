const DISCORD_ADMIN_USERID = process.env.DISCORD_ADMIN_USERID;

module.exports = {
	subcommand: (subcommand) => {return subcommand
		.setName('ping')
		.setDescription('Ping!')
	},
	cooldown: 5,
	async execute(interaction) {
		await interaction.reply('Pong. 🏓');
	},
};
