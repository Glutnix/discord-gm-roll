const DISCORD_ADMIN_USERID = process.env.DISCORD_ADMIN_USERID;

module.exports = {
	name: 'stats',
	description: 'Statistics on bot use.',
	cooldown: 5,
	execute(message) {
		message.channel.send('Bot Statistics.');
		// const guildList = message.client.guilds.cache.map(guild => `• ${guild.name}`);

		const data = [];
		data.push('Huh, I can\'t do this right now... :(');

		// if (message.author.id !== DISCORD_ADMIN_USERID) {
		message.author.send(data, { split: true })
			.catch(err => {
				message.reply(`... hmm... I couldn't send you a DM... ${err}`);
			});
		return;
		// }

		// // continue for the admin user

		// data.push(...guildList);

		// message.author.send(data, { split: true })
		// 	.then(() => {
		// 		if (message.channel.id !== message.author.dmChannel.id) {
		// 			message.reply('... oh, Hi there, boss! Sent you a DM.');
		// 		}
		// 	})
		// 	.catch(err => {
		// 		message.reply(`... hmm... I couldn't send you a DM... ${err}`);
		// 	});
	},
};
