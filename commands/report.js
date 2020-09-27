const moment = require('moment'); //npm i moment
const ms = require('ms') //npm i ms
var time = moment().format('Do MMMM YYYY , hh:mm');
var room;
var title;
var duration;
var currentTime = new Date(), hours = currentTime.getHours() + 3 , minutes = currentTime.getMinutes(), done = currentTime.getMinutes() + duration, seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
exports.run = (client, message, args) => {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    let reason = args.join(" ").slice(22);
    let user = message.mentions.members.first();
    if(!user)
        return message.reply("please mention a valid member of this server.");

    if(!reason) reason = "No reason provided.";

    message.reply("report was sent to the staff ❤️. Thanks for being a part of our community.");
    message.guild.channels.find("id" , "640190361012011008").send({embed: {
        color: 0xff5353,
        author: {
          name: 'Report:',
        },
        fields: [{
          name: "Reported Member:",
          value: `<@${user.id}>`,
          inline: "true"
          },
          {
            name: "Reported By:",
            value: `${message.author}`,
            inline: "true"
          },
          {
            name: "Reported In:",
            value: `${message.channel}`,
            inline: "true"
          },
          {
            name: "Reason:",
            value: `${reason}`,
            inline: "true"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: `${client.user.avatarURL}`,
          text: "If you find a bug, please report it to our staff. ❤️"
        }
      }
    });;
};
