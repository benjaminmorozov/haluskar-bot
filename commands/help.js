const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 Zoznam všetkých príkazov:')
  	.setThumbnail('http://giphygifs.s3.amazonaws.com/media/MF1kR4YmC2Z20/giphy.gif')
  	.addField('# **Misc**', '`q!avatar` - Display the avatar of any member of this server.\n`q!bugreport` - Report a bug to the bot developers.\n`q!help` - Display a list of all the commands.\n`q!rules` - Display the server rules.\n`q!server` - Display the server info.\n`q!userinfo` - Display some info about a member.\n`q!vote` - Make a vote using the Discord reactions.', false)
    .addField('# **Mod**', '`q!purge` - Purge/Clear a defined amount of messages.\n`q!say` - Make the bot send a custom message.\n`q!setstatus` - Change the "playing" status of the bot user.', false)
  	.setFooter('Thanks for being a part of our community. ❤️', message.guild.iconURL);

  message.channel.send(baseEmbed);
};
