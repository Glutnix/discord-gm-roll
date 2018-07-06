module.exports = {
	name: 'about',
	description: 'About the bot',
	cooldown: 5,
	execute(message) {
		message.channel.send('Learn more about me at https://github.com/Glutnix/discord-gm-roll if you like. You can also find @Glutnix if you like.');
	},
};
