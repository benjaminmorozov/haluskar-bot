exports.run = (client, message, args) => {
                                     //owner                designer             main admin           admin                main mod             mod                  helper
    if(!message.member.roles.some(r=>["610704273822711820","622715668659437568","631922921475932170","616501517058310184","645728270519631889","610704593558437899","614694328119459840"].includes(r.id)) )
    return message.reply("you don't have enough permissions to execute this command!");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    if (!args.length) {
        return;
    }
                                    //main mod             mod                  helper
    const everyone = "@everyone";
    const here = "@here";
    if(message.member.roles.some(r=>["645728270519631889","610704593558437899","614694328119459840"].includes(r.id))) {
      if(message.content.toLowerCase().includes(everyone) || message.content.toLowerCase().includes(here)) {
        return message.reply("you're not allowed to mention these roles!");
      };
    };

    const quidobot = "quido bot";
    const quidobott = "bot quido";
    if(message.content.toLowerCase().includes(quidobot) || message.content.toLowerCase().includes(quidobott)) {
      message.delete();
      return message.reply("well well... We do not say that here.")
    };

    message.delete();
    let botmessage = args.join(" ");
    message.channel.send(botmessage);
};
