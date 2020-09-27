const Discord = require("discord.js");
const ms = require("ms");
exports.run = async (client, message, args) => {
    let reason = args.splice(1).join(" ")
    if(!reason)
      return message.reply('provide a valid reminder.');

    let mutetime = args[0];
    if(!mutetime)
      return message.reply(`provide a valid reminder duration.`);

    message.reply(`set a reminder for ${mutetime}: ${reason}`)
    setTimeout(function(){
      return message.reply(`Reminder for ${mutetime}: ${reason}`)
    }, ms(mutetime));
};
