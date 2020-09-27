const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const moment = require("moment");
const { RichEmbed } = require('discord.js');
const client = new Discord.Client();
const getImages = require('./util/getImages');
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@quido-bot-sku03.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
const Score = require("./models/score.js");
const Verify = require("./models/verify.js");

const config = require("./config.json");
const words = require("./words.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.words = words;

client.on('ready', () => {
  console.log(`Successfully loaded and logged in as ${client.user.tag}.`);
  client.user.setPresence({ game: { name: 'Welcome to Quido\'s club ️❤️', type: 0 } });
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on('guildMemberAdd', member => {
  global.verifymember = member;
  // Get the log channel (change to your liking)
  const memberLogChannel = member.guild.channels.find(channel => channel.id === "617351599202762754");
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => !ei.get(i.code) || ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
	// Get the correct invite count
	const userInvites = guildInvites.array().filter(o => o.inviter.id === inviter.id);
		var userInviteCount = 0;
			for(var i=0; i < userInvites.length; i++)
			{
				var inviteCount = userInvites[i];
				userInviteCount += inviteCount['uses'];
			}
	// Get the log channel (change to your liking)
	const memberWelcomeChannel = member.guild.channels.find(channel => channel.id === "631083427936075789");
    // A real basic message with the information we need.
    memberWelcomeChannel.send(`${member} **joined**; Invited by **${inviter.username}** (**${userInviteCount}** invites).`);
	function creationDate() {
		let d = member.user.createdTimestamp;
		var ONE_MONTH = 31 * 24 * 60 * 60 * 1000; // ms
		if(((new Date) - d) < ONE_MONTH) return `**⚠ ${moment.utc(member.user.createdAt).format('dddd DD/MM/YYYY')} ⚠**`; // danger if age less than 1 month
		return `**✓️ ${moment.utc(member.user.createdAt).format('dddd DD/MM/YYYY')} ✓**`;  // Looks good!
	}
	const joinMemberEmbed = new Discord.RichEmbed()
      .setColor('0x0092ca')
      .setAuthor(`[JOIN] ${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL)
      .setThumbnail(member.user.displayAvatarURL)
      .addField('**Account Creation Date:**', creationDate(), false)
	  .addField('**Invited By:**', inviter.username + `#` + inviter.discriminator + ` **(${userInviteCount} invite[s])**`, false)
      .setTimestamp()
      .setFooter(`Member ID: ${member.id}`);
	memberLogChannel.send(joinMemberEmbed);
  });
  Verify.findOne({userID: member.id, serverID: member.guild.id}, (err, verify) => {
    if(err) console.log(err);
    if(!verify){
      const newVerify = new Verify({
        userID: member.id,
        serverID: member.guild.id,
        verify: false
      })

      newVerify.save().catch(err => console.log(err));
    } else {
  if(verify.verify === true){
    let guild = client.guilds.get("610434388777369602");
    guild.fetchMember(member).then(guildMember => {
        guildMember.addRole('613347276647039016');
    });
    return;
  };
  
};
  global.code = makeid(5);
  let guild = client.guilds.get("610434388777369602");
  var log = guild.channels.find('id', '617351547130478621');
  const joinverifyEmbed = new Discord.RichEmbed()
  	.setColor('#117EA6')
  	.setTitle('Welcome to Quido\'s Club!')
    .setDescription(`Please verify yourself using the "q!verify [code]" command. Replace the [code] with the code below.`)
  	.addField('**Code:**', code, false)
  	.setFooter('Thanks for being a part of our community. ❤️', `${client.user.avatarURL}`);
  member.send(joinverifyEmbed);
  const verificationsentEmbed = new Discord.RichEmbed()
    .setColor('#7289DA')
    .setTitle('Captcha Sent')
    .addField('**Sent To:**', `${member.user.username}#${member.user.discriminator}`, true)
    .addField('**Code:**', code, true)
    .setTimestamp()
    .setFooter(`Member: ${member.id}`);
  log.send(verificationsentEmbed);
    });
});

client.on("guildMemberRemove", (member) => {
	const memberLogChannel = member.guild.channels.find(channel => channel.id === "617351599202762754");
	const leaveMemberEmbed = new Discord.RichEmbed()
		.setColor('0xFF470F')
		.setAuthor(`[LEAVE] ${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL)
		.setThumbnail(member.user.displayAvatarURL)
		.addField('**Member Join Date:**', `${moment.utc(member.user.joinedAt).format('dddd DD/MM/YYYY')}`, false)
		.setTimestamp()
		.setFooter(`Member ID: ${member.id}`);
	memberLogChannel.send(leaveMemberEmbed);
});

client.on('messageDelete', async function(message) {
  if(message.channel.id === '617351547130478621') {
    return;
  } else {
    if(message.channel.type == 'text') {
      getImages(message).forEach((image, index) => {
      //post in the guild's log channel               #logs
      var log = message.guild.channels.find('id', '617351547130478621');
      if (log != null) {
        const deleteEmbed = new Discord.RichEmbed()
          .setColor('#FF470F')
          .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
          .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\n${message.cleanContent}`)
          .setImage(image)
          .setTimestamp()
          .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`);
        log.send(deleteEmbed);
      };
      });
    };
    };
});

client.on('messageUpdate', function(oldMessage, newMessage) {
  if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
    getImages(newMessage).forEach((image, index) => {
    //post in the guild's log channel               #logs
    var log = newMessage.guild.channels.find('id', '617351547130478621');
    if (log != null) {
      const updateEmbed = new Discord.RichEmbed()
        .setColor('#117EA6')
        .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.avatarURL)
        .setDescription(`**Message edited in ${newMessage.channel}**`)
        .addField('Before', `${oldMessage.cleanContent}`, false)
        .addField('After', `${newMessage.cleanContent}`, false)
        .setImage(image)
        .setTimestamp()
        .setFooter(`Author: ${newMessage.author.id} | Message ID: ${newMessage.id}`);
      log.send(updateEmbed);
    };
  });
  };
});

client.on('guildBanRemove', function(guild, user) {

  let embeduser = user;
  //post in the guild's log channel
  var log = client.guilds.find('id','610434388777369602').channels.find('id','617351547130478621');
  if (log != null) {
    const unbanEmbed = new Discord.RichEmbed()
      .setColor('#45b6fe')
      .setAuthor(`[UNBAN] ${embeduser.username}#${embeduser.discriminator}`, embeduser.avatarURL)
      .setThumbnail(`${embeduser.avatarURL}`)
      .addField('Member:', `${user}`, true)
      .setTimestamp()
      .setFooter(`Member ID: ${embeduser.id}`);
    log.send(unbanEmbed);
  };
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const guild = newMember.guild;

    //declare changes
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
    var change = Changes.unknown;

    //check if roles were removed
    var removedRole = '';
    oldMember.roles.every(function(value) {
        if(newMember.roles.find('id', value.id) == null) {
            change = Changes.removedRole;
            removedRole = value.name;
        }
    });

    //check if roles were added
    var addedRole = '';
    newMember.roles.every(function(value) {
        if(oldMember.roles.find('id', value.id) == null) {
            change = Changes.addedRole;
            addedRole = value.name;
        }
    });

    //check if username changed
    if(newMember.user.username != oldMember.user.username)
        change = Changes.username;

    //check if nickname changed
    if(newMember.nickname != oldMember.nickname)
        change = Changes.nickname;

    //check if avatar changed
    if(newMember.user.avatarURL != oldMember.user.avatarURL)
        change = Changes.avatar;

    //log to console
    switch(change) {
        case Changes.unknown:
            console.log('[' + guild.name + '][UPDUSR] ' + newMember.user.username + '#' + newMember.user.discriminator);
            break;
        case Changes.addedRole:
            console.log('[' + guild.name + '][ADDROLE] ' + newMember.user.username +'#' +  newMember.user.discriminator +
                ': ' + addedRole);
            break;
        case Changes.removedRole:
            console.log('[' + guild.name + '][REMROLE] ' + newMember.user.username + '#' + newMember.user.discriminator +
                ': ' + removedRole);
            break;
        case Changes.username:
            console.log('[' + guild.name + '][UPDUSRNM] ' + oldMember.user.username + '#' + oldMember.user.discriminator +
                ' is now ' + newMember.user.username + '#' + newMember.user.discriminator);
            break;
        case Changes.nickname:
            console.log('[' + guild.name + '][UPDUSRNK] ' + newMember.user.username + '#' + newMember.user.discriminator +
                (oldMember.nickname != null ? ' (' + oldMember.nickname + ')' : '') +
                (newMember.nickname != null ? ' is now ' + newMember.nickname : ' no longer has a nickname.'));
            break;
        case Changes.avatar:
            console.log('[' + guild.name + '][UPDAVT] ' + newMember.user.username + '#' + newMember.user.discriminator);
            break;
    }


    //post in the guild's log channel
    var log = client.guilds.find('id','610434388777369602').channels.find('id','617351547130478621');
    if (log != null) {
        switch(change) {
            case Changes.unknown:
                log.sendMessage('**[User Update]** ' + newMember);
                break;
            case Changes.addedRole:
                log.sendMessage('**[User Role Added]** ' + newMember + ': ' + addedRole);
                break;
            case Changes.removedRole:
                log.sendMessage('**[User Role Removed]** ' + newMember + ': ' + removedRole);
                break;
            case Changes.username:
                log.sendMessage('**[User Username Changed]** ' + newMember + ': Username changed from ' +
                    oldMember.user.username + '#' + oldMember.user.discriminator + ' to ' +
                    newMember.user.username + '#' + newMember.user.discriminator);
                break;
            case Changes.nickname:
                const updateEmbed = new Discord.RichEmbed()
                  .setColor('#117EA6')
                  .setTitle(`Nickname change`)
                  .setAuthor(`${newMember.user.username}#${newMember.user.discriminator}`, newMember.user.avatarURL)
                  .setDescription(`**Before:** ${oldMember.nickname}\n**After:** ${newMember.nickname}`)
                  .setTimestamp()
                  .setFooter(`Member ID: ${newMember.id}`);
                log.send(updateEmbed);
                break;
            case Changes.avatar:
                log.sendMessage('**[User Avatar Changed]** ' + newMember);
                break;
        }
    }

});


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
