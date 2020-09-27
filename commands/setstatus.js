exports.run = (client, message, args) => {
    if(!message.member.roles.some(r=>["🔱OWNER🔱","Discord Manager & Designer","Administrator","Head Admin","Admin"].includes(r.name)) )
      return message.reply("you don't have permissions to execute this command!");

    const activity = args.join(" ");
    client.user.setActivity(activity);
    message.channel.send(`The bot user activity has been set to "${activity}".`).then(sentMessage => {
      sentMessage.delete(5000);
    });
};
