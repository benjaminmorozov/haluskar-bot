const Discord = require("discord.js");
const request = require('request');
const fetch = require('node-fetch');
exports.run = async (client, message, args) => {
    const [{ url }] = await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1').then(response => response.json());
    const dogEmbed = new Discord.RichEmbed()
        .setColor(0x333333)
        .setAuthor(`Here’s your Fresh and Instant Doggo ❤️:`)
        .setImage(url)
        .setFooter('Thanks for being a part of our community. ❤️', `${client.user.avatarURL}`);
    message.channel.send(dogEmbed);
};
