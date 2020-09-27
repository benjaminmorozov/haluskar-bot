const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0xff5353')
    .setTitle("**Server Rules**:")
  	.addField('**1.**', 'Try to reduce the usage of cursing and the N word.', false)
    .addField('**2.**', 'Please, use the correct language in every channel.', false)
    .addField('**3.**', 'Post NSFW messages ONLY into the <#630379628061786134> channel.', false) //nsfw channel
    .addField('**4.**', 'Send videos ONLY into the media channel.', false)
    .addField('**5.**', 'Do NOT post offers in any of the chatting channels.', false)
    .addField('**6.**', 'Do NOT promote any Discord server/website/forum here without the permission of <@529057345599307776>.', false) //owner role
    .addField('**7.**', 'Try to reduce the use of caps.', false)
    .addField('**8.**', 'Do NOT spam.', false)
    .addField('**9.**', 'Do NOT invite staff to Discord servers.', false)
    .addField('**10.**', 'Do NOT scam (If you have any proofs of scaming, report them here).', false)
    .addField('**11.**', 'Usage of multiple accounts on this server is NOT allowed and will result in a kick of the second (nonmain) account.', false)
    .addField('**12.**', 'Usage of more accounts while having an ongoing mute/kick/ban is prohibited.', false)
    .addField('**13.**', 'If you stumble upon a scammer, please report him to our staff with a proof. He\'ll be added to the <#630493564756951050> channel for others to prevent getting scammed.', false) //scams channel
    .addField('**14.**', 'You may tag general roles (including \'here\') only 3 times a day.', false)
    .addField('**15.**', 'Do NOT disrespect the staff.', false)
    .addField('**16.**', 'Rules do NOT apply to the staff in the same way as they do to the members. Nevertheless, they shall try to be a good example to them.', false)
    .addField('**17.**', 'Do NOT advertise anything without the permission of <@529057345599307776>.', false) //owner role
    .addField('\n\u200b', 'Violation of any of these rules will result in a mute or a ban. \n**Note:** We are not associated with any distribution of hacking, cheating, nor pirated software - although you may find videos of video games by the members of the server, where they\'re being used. These serve solely for education purposes and we do not support any sign of trying to sell, or distribute them by any sent media on the server. \nThanks for being a part of our community ❤️ - **The Quido\'s Club staff**', false)
    .addField('\n\u200b', 'If you experience any difficulties or need some help on the server, contact a member of the staff.', false)
  	.setFooter('Thanks for being a part of our community. ❤️', `${client.user.avatarURL}`);

  message.channel.send(baseEmbed);
};
