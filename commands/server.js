exports.run = (client, message) => {
    message.channel.send({embed: {
        color: 0x0092ca,
        author: {
        name: message.guild.name,
        icon_url: message.guild.iconURL
        },
        thumbnail: {
            "url": message.guild.iconURL
        },
        description: `**${client.config.description}**`,
        fields: [{
            name: "Server Owner:",
            value: `${message.guild.member(guild.owner)} ? guild.owner.toString() : guild.owner.user.tag`,
            inline: "true"
            },
            {
            name: "Bot Prefix:",
            value: `**${client.config.prefix}**`,
            inline: "true"
            },
            {
            name: "User Count:",
            value: `${message.guild.members.filter(member => !member.user.bot).size}`,
            inline: "true"
            },
            {
            name: "Server Creation Date:",
            value: `${message.channel.guild.createdAt.toUTCString().substr(0, 16)}`,
            inline: "true"
            },
        ],
        footer: {
          icon_url: message.guild.iconURL,
          text: "Thanks for being a part of our community ❤️"
        }
    }
    })
}
