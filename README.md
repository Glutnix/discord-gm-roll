# discord-gm-roll
A Roleplaying GM Emulator for Discord servers

## ▶️ [Invite Game Master Emulator bot to your Discord server!](https://discordapp.com/api/oauth2/authorize?client_id=464728785107812352&permissions=0&scope=bot) ◀️

## About the bot

[![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/N4N4FYVF)

Still a work in progress, not ready for prime-time roleplaying. You'll be able to add this Discord bot to your server and ask it yes or no questions to help run your RPG.

The bot is powered by [discord.js](https://discord.js.org), and its yes/no magic-8-ball feature is inspired by [rpgsolo.com](http://rpgsolo.com/), [Mythic GM Emulator](http://www.wordmillgames.com/mythic-game-master-emulator.html), [FU: The Freeform Universal RPG](http://freeformuniversal.com/) and other GM-less or GM-light roleplaying systems.

By default, we roll on the 50/50 either way table.
```
/gm is there a goblin here?
> [Either Way] (1d10 => 4) is there a goblin here?
>     No, but...
Okay, there's no goblin, but there's something else.
```
The bot repeats the question along with its decision to avoid roll fraud when players might change their question to suit the roll.

You can provide a likelihood table code: XU, VU, U, SU, EW, SL, L, VL, XL
```
/gm Is there a dragon? VU
> [Very Unlikely] (3d10 => (6,1,8) => 1) Is there a dragon?
    No, and...
So no dragon, and I've found it's lair!

/gm Is the lair full of gold? L
[Likely] (2d10 => (3,3) => 3) Is the lair full of gold?
    No.
Rats, obviously the looters got here before me.
```

GM Roll is not a dice bot. If you need to roll a `d20`, `4dF+2` or `1d10!>9`, I recommend [Sidekick](https://github.com/ArtemGr/Sidekick/). We're not competing with this. GM Roll is going to be an emulated GM -- more of an virtual oracle than a virtual polyhedral chucker.

