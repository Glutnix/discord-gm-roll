const DISCORD_ADMIN_USERID = process.env.DISCORD_ADMIN_USERID;

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
		if (message.author.id === DISCORD_ADMIN_USERID) {
			const data = [];
			data.push('Guilds I am in');
			const guildList = message.client.guilds.map(guild => `• ${guild.name}`);
			console.log(guildList.length);
			data.push(...guildList);
			message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.id !== message.author.dmChannel.id) {
						message.reply('... oh, Hi there, boss! Sent you a DM.');
					}
				})
				.catch(err => {
					message.reply(`... hmm... I couldn't send you a DM... ${err}`);
				});
		}
	},
};
