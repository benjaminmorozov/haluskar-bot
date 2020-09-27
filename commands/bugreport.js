const Discord = require("discord.js");
exports.run = (client, message, args) => {
    if (!args.length) {
      return;
    }
    let reportmessage = args.join(" ");
    client.fetchUser("207044528027205634",false).then(user => {
      const bugreportEmbed = new Discord.RichEmbed()
      	.setColor('0xff5353')
      	.setTitle('BUG REPORT:')
      	.addField('**Sent By:**', `${message.author.username}#${message.author.discriminator}`, false)
      	.addField('**Sent In:**', `\'${message.guild.name}\' - \'${message.channel}\'`, false)
      	.addField('**Bug Report:**', `${reportmessage}`, false)
      	.setFooter(`Member ID: ${message.author.id}`);
      user.send(bugreportEmbed);
    });
    message.reply("thanks for submitting your bug report. The bug will be reviewed and fixed in no time!");
};
