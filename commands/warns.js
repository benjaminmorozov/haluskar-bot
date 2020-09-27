const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@quido-bot-sku03.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
const Warns = require("../models/warns.js")

exports.run = async (client, message, args) => {
                                   //owner                designer             main admin           admin                main mod             mod                  helper
  if(!message.member.roles.some(r=>["610704273822711820","622715668659437568","631922921475932170","616501517058310184","645728270519631889","610704593558437899","614694328119459840"].includes(r.id)) )
    return message.reply("you don't have enough permissions to execute this command!");

    const member = message.mentions.users.first()
    if(!member)
      return message.reply("mention a valid member of this server.")
    Warns.countDocuments({userID: member.id, serverID: message.guild.id}, (err, count) => {
      Warns.findOne({userID: member.id, serverID: message.guild.id}, (err, warns) => {
    let embed = new Discord.RichEmbed()
      .setColor('#45b6fe')
      .setAuthor(`[WARNS] ${member.username}#${member.discriminator}`, member.avatarURL)
      .addField('Warns:', `${count}`, true)
      .setTimestamp()
      .setFooter(`Member ID: ${member.id}`);
      warns.forEach(function(warns) {
      embed.addField(`${warns.warns.reason}`);
      });
    message.channel.send(embed);
      });
    });
};
