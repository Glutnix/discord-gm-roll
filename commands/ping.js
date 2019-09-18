const DISCORD_ADMIN_USERID = process.env.DISCORD_ADMIN_USERID;

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
	},
};
