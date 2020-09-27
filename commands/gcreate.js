const Discord = require("discord.js");
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
    if(!message.member.roles.some(r=>["🔱OWNER🔱","Discord Manager & Designer","Administrator","Head Moderator","Moderator","Head Admin","Admin","Helper"].includes(r.name)) )
    return message.reply("sorry, you don't have enough permissions to use this!");

    var filter = m => m.author.id === message.author.id;
    message.channel.send(`🎉 Nice, so we're going to make a giveaway! In what channel?`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        var step = collected.first().content;
      	let room = step.slice(2, -1);
        if(!room) return message.channel.send(':disappointed_relieved: I could not find that channel');
        collected.first().delete();
        msg.edit('🎉 How long should the giveaway last?').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**The Bot Not Support This Time**');
            duration = collected.first().content
            collected.first().delete();
            msg.edit('🎉 What are we giving away?').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
            try {
              let giveEmbed = new Discord.RichEmbed()
              .setDescription(`**${title}** \nReact With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`)
              .setFooter(message.author.username, message.author.avatarURL);
              message.guild.channels.find("id" , room).send(' ' , {embed: giveEmbed}).then(m => {
                 let re = m.react('🎉');
                 setTimeout(() => {
                   let users = m.reactions.get("🎉").users
                   let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                   let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                   let endEmbed = new Discord.RichEmbed()
                   .setAuthor(message.author.username, message.author.avatarURL)
                   .setTitle(title)
                   .addField('Giveaway Ended !🎉',`**Winners :** ${gFilter} \n**Ended at :** ${hours}:${minutes}:${seconds} ${suffix}`)
                   .setTimestamp()
                 m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                message.guild.channels.find("id" , room).send(`**Congratulations ${gFilter}! You won The \`${title}\`**`)
            }, ms(duration));
        });
            } catch(e) {
            message.channel.send(`Couldn\'t create a giveaway because of an error: ${e}`);
              console.log(e);
            }
          });
        });
      });
    });
  });
});
};
