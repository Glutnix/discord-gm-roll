const DISCORD_ADMIN_USERID = process.env.DISCORD_ADMIN_USERID;

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
		if (message.author.id === DISCORD_ADMIN_USERID) {
			const data = ['Guilds I\'m In'];
			message.client.guilds.every(guild =>{
				data.push(guild.name);
			});
			message.author.send(data, { split: true })
				.then(() => {
					message.reply('... oh, Hi there, boss!');
				})
				.catch(err => {
					message.reply(`... hmm... I couldn't send you a DM... ${err}`);
				});
		}
	},
};
