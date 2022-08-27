"require('dotenv').config();"
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const path = require('node:path');
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || '';
//const prefix = process.env.BOT_COMMAND_PREFIX || '/test';

// const rootCommand = new SlashCommandBuilder()
// 	.setName(prefix)
// 	.setDescription('Game Master Emulator (discord-gm-roll)');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	console.log(command.data.name);
	commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Ready!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(DISCORD_BOT_TOKEN);

// so the program will not close instantly
process.stdin.resume();

function exitHandler(options, err) {
	if (options.cleanup) cleanup();
	if (err && err.stack) {
		console.log('error stack:', err.stack);
	}
	if (options.exit) process.exit();
}

function cleanup() {
	if (client) {
		console.log('going offline.');
		if(client.user) {
			client.user.setStatus('invisible');
		}
	}
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGTERM', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
