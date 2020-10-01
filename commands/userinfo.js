const Discord = require("discord.js");
const moment = require("moment");
exports.run = (client, message, args) => {
    const member = message.mentions.users.first() || message.author;
	function creationDate() {
		let d = member.createdTimestamp;
		var ONE_MONTH = 31 * 24 * 60 * 60 * 1000; /* ms */
		if(((new Date) - d) < ONE_MONTH) return `**⚠️ ${moment.utc(member.createdAt).format('dddd DD/MM/YYYY')} ⚠**`; // danger if age less than 1 month
		return moment.utc(member.createdAt).format('dddd DD/MM/YYYY');  // Looks good!
	}
    const userinfoEmbed= new Discord.RichEmbed()
      .setColor('0x0092ca')
      .setAuthor(member.username)
      .setThumbnail(member.displayAvatarURL)
      .addField('**Full Username:**', member.username + `#` + member.discriminator, false)
      .addField('**Member ID:**', '**' + member.id + '**', false)
      .addField('**Account Creation Date:**', `${creationDate()}`, false)
      .addField('**Member Join Date:**', `${moment.utc(message.guild.member(member).joinedAt).format('dddd DD/MM/YYYY')}`, false)
      .setFooter('Thanks for being a part of our community. ❤️', message.guild.iconURL);
    message.channel.send(userinfoEmbed);
};
