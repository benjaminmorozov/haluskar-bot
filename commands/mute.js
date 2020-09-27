const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    if(!message.member.roles.some(r=>["🔱OWNER🔱","Discord Manager & Designer","Administrator","Head Moderator","Moderator","Head Admin","Admin","Helper"].includes(r.name)) )
    return message.reply("you don't have enough permissions to execute this command!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let reason = args.join(" ").slice(22);
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let embeduser = member.user;
    if(!member)
        return message.reply("please mention a valid member of this server.");

    if(!reason) reason = "No reason provided.";

    if(member.roles.has('630146706930925569'))
        return message.reply("this user is already muted.");

    if(message.member.roles.some(r=>['610704273822711820','627253814717710370','622715668659437568'].includes(r.id))){
        // Mute the user
        let mutedRole = message.guild.roles.find(role => role.name == "Muted");
        member.addRole(mutedRole);
        var log = message.guild.channels.find('id', '617351547130478621');
        if (log != null) {
          const opmuteEmbed = new Discord.RichEmbed()
            .setColor('#45b6fe')
            .setAuthor(`[MUTE] ${embeduser.username}#${embeduser.discriminator}`, embeduser.avatarURL)
            .addField('Member:', `${member}`, true)
            .addField('Muted by:', `${message.author}`, true)
            .addField('Reason:', `${reason}`, true)
            log.send(opmuteEmbed);
          message.channel.send(opmuteEmbed);
        }
    } else {
      if(member.roles.has('613347276647039016')) {
        let mutedRole = message.guild.roles.find(role => role.name == "Muted");

        member.addRole(mutedRole)
        .catch(error => console.log(`Sorry ${message.author}, I couldn't mute because of : ${error}`));
        var log = message.guild.channels.find('id', '617351547130478621');
        if (log != null) {
          const muteEmbed = new Discord.RichEmbed()
            .setColor('#45b6fe')
            .setAuthor(`[MUTE] ${embeduser.username}#${embeduser.discriminator}`, embeduser.avatarURL)
            .addField('Member:', `${member}`, true)
            .addField('Muted by:', `${message.author}`, true)
            .addField('Reason:', `${reason}`, true)
            log.send(muteEmbed);
          message.channel.send(muteEmbed);
      } else {
          return message.reply('you cannot mute this member.');
      };
    };
  };
};
