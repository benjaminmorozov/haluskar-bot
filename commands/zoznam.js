const Discord = require("discord.js");
exports.run = (client, message) => {
  const baseEmbed = new Discord.RichEmbed()
  	.setColor('0x0092ca')
  	.setTitle('🔰 Zoznam všetkých žiakov v triede:')
  	.setThumbnail('http://giphygifs.s3.amazonaws.com/media/MF1kR4YmC2Z20/giphy.gif')
  	.addField('# **Misc**', '1. Bujňák Matej\n2. Celerová Júlia\n3. Chudík Marko\n4. Fridmanský Lukáš\n5. Fábry Ľubomír\n6. Gancarčík Juraj\n7. Gonda Peter\n8. Hanečák Róbert')
    .addField('# **Misc**', '9. Hlaváčová Nina')
    .addField('# **Misc**', '10. Hric Matej')
    .addField('# **Misc**', '11. Hromádka Jakub')
    .addField('# **Misc**', '12. Hruška Adam')
    .addField('# **Misc**', '13. Ištoková Gréta')
    .addField('# **Misc**', '14. Kacvinský Marek')
    .addField('# **Misc**', '15. Kočiš Filip')
    .addField('# **Misc**', '16. Kuchta Patrik')
    .addField('# **Misc**', '17. Kučera Marek')
    .addField('# **Misc**', '18. Kučera Tomáš')
    .addField('# **Misc**', '19. Lučanská Viktória')
    .addField('# **Misc**', '20. Marci Tomáš')
    .addField('# **Misc**', '21. Mitický Vladislav')
    .addField('# **Misc**', '22. Morozov Benjamín')
    .addField('# **Misc**', '23. Novák Alex')
    .addField('# **Misc**', '24. Saunders Nicholas Matthew')
    .addField('# **Misc**', '25. Sedláček Vladislav')
    .addField('# **Misc**', '26. Streichsbier Sandro')
    .addField('# **Misc**', '27. Tomka Ján')
    .addField('# **Misc**', '28. Tomáš Matthias')
    .addField('# **Misc**', '29. Vronč Timotej')
    .addField('# **Misc**', '30. Štefaňák Alex')
  	.setFooter('Thanks for being a part of our community. ❤️', message.guild.iconURL);

  message.channel.send(baseEmbed);
};
