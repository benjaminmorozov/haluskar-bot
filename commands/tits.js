const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send(':underage: NSFW Command. Please switch to NSFW channel in order to use this command.')
    superagent.get('https://nekos.life/api/v2/img/tits')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
        .setImage(response.body.url)
        .setURL(response.body.url);
  message.channel.send(lewdembed);
    })

}
