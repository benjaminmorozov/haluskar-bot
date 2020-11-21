const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 Zoznam všetkých žiakov v triede:')
  	.addField('\u200', '`1. Bujňák Matej\\n 2. Celerová Júlia\\n 3. Chudík Marko\\n 4. Fridmanský Lukáš\\n 5. Fábry Ľubomír\\n 6. Gancarčík Juraj\\n 7. Gonda Peter\\n 8. Hanečák Róbert\\n 9.Hlaváčová Nina\\n 10.Hric Matej\\n 11.Hromádka Jakub\\n 12.Hruška Adam\\n 13.Ištoková Gréta\\n 14.Kacvinský Marek\\n 15.Kočiš Filip\\n 16.Kuchta Patrik\\n 17.Kučera Marek\\n 18.Kučera Tomáš\\n 19.Lučanská Viktória\\n 20.Marci Tomáš\\n 21.Mitický Vladislav\\n 22.Morozov Benjamín\\n 23.Novák Alex\\n 24.Saunders Nicholas Matthew\\n 25.Sedláček Vladislav\\n 26.Streichsbier Sandro\\n 27.Tomka Ján\\n 28.Tomáš Matthias \\n 29.Vronč Timotej\\n 30.Štefaňák Alex`')

  message.channel.send(baseEmbed);
};
