module.exports = (client, message) => {
    let guild = client.guilds.get('779321488780034079');
    if(guild) {
        channel = guild.channels.get('779321488780034081');
        if(channel) channel.send('test');
    }
};
