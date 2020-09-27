exports.run = async (client, message, args) => {
    if(!message.member.roles.some(r=>["🔱OWNER🔱","Discord Manager & Designer","Head Moderator","Moderator","Head Admin","Admin","Helper"].includes(r.name)) )
    return message.reply("you don't have enough permissions to execute this command!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
        return message.reply("please mention a valid member of this server.");

    if(!member.roles.find(r => r.name === "Muted"))
        return message.reply("this user is not muted.");

    // This is the role you want to assign to the user
    let mutedRole = message.guild.roles.find(role => role.name == "Muted");

    let MemberRole = message.guild.roles.find("name", "Member");
    let OPRole = message.guild.roles.find("name", "🔑");
    if(message.member.roles.has(OPRole.id)){
      member.removeRole(mutedRole)
      .catch(error => console.log(`Sorry ${message.author}, I couldn't unmute because of : ${error}`));
      message.channel.send(`${member} has been unmuted by ${message.author}`);
    } else {
      if(member.roles.has(MemberRole.id)) {
        member.removeRole(mutedRole)
        .catch(error => console.log(`Sorry ${message.author}, I couldn't unmute because of : ${error}`));
        message.channel.send(`${member} has been unmuted by ${message.author}`);
      } else {
        return message.channel.send(`Sorry ${message.author}, you cannot unmute this member.`);
      };
    };
  };
