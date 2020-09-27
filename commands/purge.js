exports.run = async (client, message, args) => {
    if(!message.member.roles.some(r=>["🔱OWNER🔱","Discord Manager & Designer","Administrator","Head Moderator","Moderator","Head Admin","Admin","Helper"].includes(r.name)) )
    return message.reply("you don't have enough permissions to execute this command!");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
	message.delete();
	
	const user = message.mentions.users.first();
	
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
	
	if (!deleteCount) {
        return;
    }

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("provide a number between 2 and 100 for the number of messages to delete.");

    // So we get our messages, and delete them. Simple enough, right?
	message.channel.fetchMessages({limit: deleteCount}).then((fetched) => {
		if(user) {
			const filterBy = user ? user.id : Client.user.id;
			let userFetched = fetched.filter(m => m.author.id === filterBy).array().slice(0, deleteCount);
			message.channel.bulkDelete(userFetched)
				.catch(error => message.reply(`couldn't delete messages because of: ${error}`));
		} else {
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`couldn't delete messages because of: ${error}`));
		};
		message.channel.send(`Deleted ${deleteCount} messages!`).then(sentMessage => {
			sentMessage.delete(5000);
		});
	});
}
