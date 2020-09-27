const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@quido-bot-sku03.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
const Score = require("../models/score.js")
const talkedRecently = new Set();
module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) {
      let scoretoadd = Math.ceil(Math.random() * 50);
      Score.findOne({userID: message.author.id, serverID: message.guild.id}, (err, score) => {
        if(err) console.log(err);
        if(!score){
          const newScore = new Score({
            userID: message.author.id,
            serverID: message.guild.id,
            score: scoretoadd
          })

          newScore.save().catch(err => console.log(err));
        } else {
          score.score = score.score + scoretoadd;
          score.save().catch(err => consolelog(err));
        }
      })
      return;
    };
	
	if (talkedRecently.has(message.author.id))
		return message.reply(`Slow down! 😆`);
	
	// Adds the user to the set so that they can't talk for 2.5 seconds
	talkedRecently.add(message.author.id);
	setTimeout(() => {
		// Removes the user from the set after 2.5 seconds
		talkedRecently.delete(message.author.id);
	}, 1500);
	
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};
