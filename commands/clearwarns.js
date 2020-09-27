const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@quido-bot-sku03.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
const Warns = require("../models/warns.js")

exports.run = async (client, message, args) => {
                                   //owner                designer             main admin           admin                main mod             mod                  helper
  if(!message.member.roles.some(r=>["610704273822711820","622715668659437568","631922921475932170","616501517058310184","645728270519631889"].includes(r.id)) )
    return message.reply("you don't have enough permissions to execute this command!");

  let warnstoadd = 1;
  let reason = args.join(" ").slice(22);
  if(!reason) reason = "No reason provided.";
  const member = message.mentions.users.first()
  if(!member)
    return message.reply("mention a valid member of this server.")
  Warns.findOne({userID: member.id, serverID: message.guild.id}, (err, warns) => {
    if(err) console.log(err);
    if(warns === []){
      return;
    };
  });
  Warns.deleteMany({userID: member.id, serverID: message.guild.id}, (err, warns) => {
    if(err) console.log(err);
    if(warns === []){
      return;
    };
  });
    var warnslog = client.guilds.find('id','610434388777369602').channels.find('id','630403969616707594');
    let embed = new Discord.RichEmbed()
      .setColor('#45b6fe')
      .setAuthor(`[CLEAR WARNS] ${member.username}#${member.discriminator}`, member.avatarURL)
      .addField('Member:', `${member}`, true)
      .addField('Moderator:', `${message.author}`, true)
      .setTimestamp()
      .setFooter(`Member ID: ${member.id}`);
    warnslog.send(embed);
    message.channel.send(embed);
};
