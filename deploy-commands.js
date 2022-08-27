require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || '';
const DISCORD_APP_ID = process.env.DISCORD_APP_ID || '';
const guildId = "452196396448219153";

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

(async () => {
  await rest.put(Routes.applicationGuildCommands(DISCORD_APP_ID, guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);
  console.log('...');
  await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
  console.log('...');
  await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
})();