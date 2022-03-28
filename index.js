const fs = require('node:fs');
const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;
const DISCORD_TEST_GUILD_ID = process.env.DISCORD_TEST_GUILD_ID;
const BOT_NICKNAME = process.env.BOT_NICKNAME || 'GM Emulator';
const prefix = process.env.BOT_COMMAND_PREFIX;

const rootCommand = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Game Master Emulator (discord-gm-roll)');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const commandFile = require(`./commands/${file}`);
	rootCommand.addSubcommand(commandFile.subcommand);
}
commands.push(rootCommand.toJSON());

console.log(rootCommand.toJSON());

const rest = new REST({ version: '9' }).setToken(DISCORD_BOT_TOKEN);

const cooldowns = new Discord.Collection();

client.on('ready', () => {
	console.log(`Ready! Listening for commands with ${prefix}`);
	client.user.setUsername('Game Master Emulator');
	client.guilds.cache.every((guild) => guild.me.setNickname(BOT_NICKNAME));
	client.user.setPresence({
		activity: {
			name: `*${prefix}* commands`,
			type: 'LISTENING',
		},
		status: 'online',
	});

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
	
			await rest.put(
				Routes.applicationGuildCommands(DISCORD_BOT_CLIENT_ID, DISCORD_TEST_GUILD_ID),
				// Routes.applicationCommands(DISCORD_BOT_CLIENT_ID),
				{ body: commands },
			);
	
			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	console.log("got interaction", interaction);

	const commandName = interaction.commandName.toLowerCase() || 'ask';

	let command = client.commands.get(commandName)
	// || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		command = client.commands.get('ask');
	}
	
	console.log('got command', command.name, args);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const rootCommandExecute = async interaction => {
	if (!cooldowns.has(interaction.name)) {
		cooldowns.set(interaction.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(interaction.name);
	const cooldownAmount = (interaction.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${interaction.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
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
		client.user.setStatus('invisible');
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
