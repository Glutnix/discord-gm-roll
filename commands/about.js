module.exports = {
	name: 'about',
	description: 'About the bot',
	cooldown: 5,
	execute(message) {
		message.channel.send('Learn more about me at https://github.com/Glutnix/discord-gm-roll. You can also find Juniper#9001 if you like.');
	},
};
