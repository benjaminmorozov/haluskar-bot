const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 Zoznam všetkých žiakov v triede:')
  	.setThumbnail('http://giphygifs.s3.amazonaws.com/media/MF1kR4YmC2Z20/giphy.gif')
  	.addField('# **Misc**', '1.Bujňák Matej
2.Celerová Júlia
3.Chudík Marko
4.Fridmanský Lukáš
5.Fábry Ľubomír
6.Gancarčík Juraj
7.Gonda Peter
8.Hanečák Róbert
9.Hlaváčová Nina
10.Hric Matej
11.Hromádka Jakub
12.Hruška Adam
13.Ištoková Gréta
14.Kacvinský Marek
15.Kočiš Filip
16.Kuchta Patrik
17.Kučera Marek
18.Kučera Tomáš
19.Lučanská Viktória
20.Marci Tomáš
21.Mitický Vladislav
22.Morozov Benjamín
23.Novák Alex
24.Saunders Nicholas Matthew
25.Sedláček Vladislav
26.Streichsbier Sandro
27.Tomka Ján
28.Tomáš Matthias
29.Vronč Timotej
30.Štefaňák Alex')
  	.setFooter('Thanks for being a part of our community. ❤️', message.guild.iconURL);

  message.channel.send(baseEmbed);
};
