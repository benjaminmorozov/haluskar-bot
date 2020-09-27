const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 List of all commands:')
  	.setThumbnail('http://giphygifs.s3.amazonaws.com/media/MF1kR4YmC2Z20/giphy.gif')
  	.addField('# **Fun**', '`q!8ball` - Ask the mystic 8-ball a question.\n`q!cat` - Display a random picture of a cute cat.\n`q!dog` - Display a random picture of a cute doggo.', false)
  	.addField('# **Misc**', '`q!avatar` - Display the avatar of any member of this server.\n`q!bugreport` - Report a bug to the bot developers.\n`q!help` - Display a list of all the commands.\n`q!rules` - Display the server rules.\n`q!server` - Display the server info.\n`q!userinfo` - Display some info about a member.\n`q!vote` - Make a vote using the Discord reactions.', false)
    .addField('# **Mod**', '`q!addrr` - After reacting to a set message, the reacting member will be given a defined role.\n`q!ban` - Ban a defined member.\n`q!clearwarns` - Clear warns of a defined member.\n`q!gcreate` - Create a giveaway in a set channel.\n`q!kick` - Kick a defined member.\n`q!mute` - Mute a defined member.\n`q!mutelist` - Display a list of all muted members.\n`q!purge` - Purge/Clear a defined amount of messages.\n`q!say` - Make the bot send a custom message.\n`q!setstatus` - Change the "playing" status of the bot user.\n`q!tempmute` - Temporarily mute a member for a defined amount of time.\n`q!unmute` - Unmute a defined member.\n`q!warn` - Warn a defined member. After an enough number of warnings, the member will be punished.\n`q!warns` - Display the number of warnings a defined member has.', false)
    .addField('# **Music**', '`q!play` - Play a song.', false)
    .addField('# **NSFW**', '`q!hentai` - Display a Hentai picture.\n`q!pussy` - Display a picture with a pussy in it.\n`q!tits` - Display a picture with tits in it.\n`q!yuri` - Display a Yuri picture.', false)
  	.setFooter('Thanks for being a part of our community. ❤️', message.guild.iconURL);

  message.channel.send(baseEmbed);
};
