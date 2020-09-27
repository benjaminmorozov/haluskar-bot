const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@quido-bot-sku03.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
const Verify = require("../models/verify.js");
exports.run = async (client, message, args) => {
  let guild = client.guilds.get("610434388777369602");
  if(guild.member(message.author).roles.some(r=>['613347276647039016'].includes(r.id)))
    return message.reply(`${message.author}, you are already verified!`)
  let reason = args.join(" ");
  if(!reason) reason = "none";
  const member = verifymember;
  if(message.guild === null) {
    var log = guild.channels.find('id', '617351547130478621');
    if(reason === code) {
      const verifyEmbed = new Discord.RichEmbed()
        .setColor('#00D166')
        .setTitle('Verified!')
        .setDescription(`Thanks for verifying. Have a nice experience!`)
        .setFooter('Thanks for being a part of our community. ❤️', `${client.user.avatarURL}`);
      member.send(verifyEmbed);
      member.addRole('613347276647039016');
      const verificationcompletedEmbed = new Discord.RichEmbed()
        .setColor('#7289DA')
        .setTitle('Captcha Completed')
        .addField('**Sent To:**', `${member.user.username}#${member.user.discriminator}`, true)
        .addField('**Code:**', code, true)
        .setTimestamp()
        .setFooter(`Member: ${member.id}`);
      log.send(verificationcompletedEmbed);
      Verify.findOne({userID: member.id, serverID: member.guild.id}, (err, verify) => {
          verify.verify = true;
          verify.save().catch(err => consolelog(err));
      })
    } else {
      let invite = await guild.channels.find('id', '646418925986250762').createInvite({
          maxAge: 0, //maximum time for the invite, in milliseconds
          maxUses: 1 //maximum times it can be used
        }).catch(console.log);
      const verifyEmbed = new Discord.RichEmbed()
        .setColor('#FF470F')
        .setTitle('Wrong Verification Code!')
        .setDescription(`Please, retry the verification process by rejoining the server using this invite: ${invite}`)
        .addField('**Correct Code:**', `${code}`, false)
        .addField('**Input:**', `${reason}`, false)
        .setFooter('Thanks for being a part of our community. ❤️', `${client.user.avatarURL}`);
      member.send(verifyEmbed);
      const verificationfailedEmbed = new Discord.RichEmbed()
        .setColor('#FF470F')
        .setTitle('Captcha Failed')
        .addField('**Sent To:**', `${member.user.username}#${member.user.discriminator}`, true)
        .addField('**Requested Code:**', code, true)
        .addField('**Input:**', reason, true)
        .setTimestamp()
        .setFooter(`Member: ${member.id}`);
      log.send(verificationfailedEmbed);
      member.kick('Sent a wrong verification code.')
    };
  } else {
    return;
  };
};
