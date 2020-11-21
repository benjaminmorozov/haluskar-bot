const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    client.login('NzU5NzcwMDczMDU2OTM1OTQ2.X3CVBQ.7vrBxYCc9s8zgPM7CkeUQESeO8k');
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://www.twitch.tv/monstercat"
        }
    });
    console.log(client.user.tag);
})