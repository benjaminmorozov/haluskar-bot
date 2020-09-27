exports.run = (client, message, args) => {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    if (!args.length) {
        message.channel.send({embed: {
        color: 0x0092ca,
        author: {
        name: message.author.username,
        icon_url: message.guild.iconURL
        },
        description: `**${client.config.description}**`,
        fields: [{
            name: "Server Owner:",
            value: `${message.guild.member(message.guild.owner) ? message.guild.owner.toString() : message.guild.owner.user.tag}`,
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
        return;
    }
    
    
};
