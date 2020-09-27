exports.run = (client, message) => {
    const taggedUser = message.mentions.users.first() || message.author;

    message.channel.send({embed: {
        color: 0x0092ca,
        author: {
          name: taggedUser.username + `#` + taggedUser.discriminator,
        },
        image: {
            url: taggedUser.displayAvatarURL,
        },
        footer: {
          icon_url: message.guild.iconURL,
          text: "Thanks for being a part of our community ❤️"
        }
      }
    });
}