const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 Zoznam všetkých žiakov v triede:')
  	.addField('\u200', '`1. Bujňák Matej\n2. Celerová Júlia\n3. Chudík Marko\n4. Fridmanský Lukáš\n5. Fábry Ľubomír\n6. Gancarčík Juraj\n7. Gonda Peter\n8. Hanečák Róbert\n9.Hlaváčová Nina\n10.Hric Matej\n11.Hromádka Jakub\n12.Hruška Adam\n13.Ištoková Gréta\n14.Kacvinský Marek\n15.Kočiš Filip\n16.Kuchta Patrik\n17.Kučera Marek\n18.Kučera Tomáš\n19.Lučanská Viktória\n20.Marci Tomáš\n21.Mitický Vladislav\n22.Morozov Benjamín\n23.Novák Alex\n24.Saunders Nicholas Matthew\n25.Sedláček Vladislav\n26.Streichsbier Sandro\n27.Tomka Ján\n28.Tomáš Matthias\n29.Vronč Timotej\n30.Štefaňák Alex`')

  message.channel.send(baseEmbed);
};
