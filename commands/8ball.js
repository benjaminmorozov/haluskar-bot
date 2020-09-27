exports.run = (client, message, args) => {
    function doMagic8BallVoodoo() {
        var rand = [':8ball: It is certain.', ':8ball: It is decidedly so.', ':8ball: Without a doubt.', ':8ball: Yes, definitely.', ':8ball: As I see it, yes.', ':8ball: Most likely.', ':8ball: Yes.', ':8ball: Signs point to yes.', ':8ball: Better not tell you now.', ':8ball: Cannot predict now.', ':8ball: Don\'t count on it.', ':8ball: My reply is no.', ':8ball: My sources say no.', ':8ball: I\'m very doubtful of that.', ':8ball: Concentrate and try again.', ':8ball: Cannot predict now.', ':8ball: Hell no!'];
        return rand[Math.floor(Math.random()*rand.length)];
    };
    const questionmark = "?";
    if(!message.content.toLowerCase().includes(questionmark)) {
      return message.reply("ask a valid question.")
    }
    if(!args.length) {
      return message.reply("ask a valid question.")
    } else {
    message.channel.send(doMagic8BallVoodoo())
    };
}
