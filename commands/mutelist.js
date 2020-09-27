exports.run = async (client, message) => {
                                   //owner                designer             main admin           admin                main mod             mod                  helper
  if(!message.member.roles.some(r=>["610704273822711820","622715668659437568","631922921475932170","616501517058310184","645728270519631889","610704593558437899","614694328119459840"].includes(r.id)) )
    return message.reply("you don't have enough permissions to execute this command!");

  const muted = message.guild.roles.get('630146706930925569').members.map(m=>m.user.tag).join('\n');
  if(!muted) {
    message.channel.send({embed: {
      color: 0xff5353,
      title: 'There are no muted members on this server.',
      footer: {
        icon_url: `${client.user.avatarURL}`,
        text: "Thanks for being a part of our community ❤️"
      }
    }
  });
  } else {
    message.channel.send({embed: {
      color: 0xff5353,
      title: 'All muted members on this server:',
      description: `**> ${muted}**`,
      footer: {
        icon_url: `${client.user.avatarURL}`,
        text: "Thanks for being a part of our community ❤️"
      }
    }
    });
  }
};
