const prefix = process.env.BOT_COMMAND_PREFIX;

module.exports = {
	subcommand: (subcommand) => {return subcommand
		.setName('help')
		.setDescription('List all of my commands or info about a specific command.')
	},
	usage: '[command name]',
	cooldown: 3,
	async execute(interaction) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('I simulate a game master for roleplaying without a game master.');
			data.push('\nMention me in a chat: ask a question about what happens next, and I\'ll respond with a “yes” “no” style answer.');
			data.push('Sometimes I\'ll make it more interesting, and say something like “yes, and” or “no, but”. You then can role-play your way in that direction, guided by my random choice!');
			data.push(`\nI respond to \`${prefix}\` and any sentence including a likelihood code`);
			data.push('Here\'s a list of all my likelihood codes:');
			data.push('`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`');
			data.push('`XU`, `VU`, `U`, `SU`, `EW`, `SL`, `L`, `VL`, `XL`');
			data.push('I default to the \'EW\' command if I can\'t figure out which likelihood you want.');
			data.push('(see https://github.com/Glutnix/discord-gm-roll#likelihood-tables)');
			data.push('\nI also look for these words on their own.');
			data.push(commands.map(command => '`' + command.name + '`').join(', '));
			data.push(`\nYou can also send \`${prefix} help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('... hmm... it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		await interaction.reply(data, { split: true });
	},
};
