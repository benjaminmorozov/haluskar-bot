using Discord;
using Discord.Commands;
using Discord.WebSocket;
using haluskar_bot.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace haluskar_bot.Modules
{
    public class SayModule : ModuleBase<SocketCommandContext>
    {
        [Command("say"), Alias("echo")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public Task Say(string msg)
        {
            Context.Message.DeleteAsync();
            return Context.Client.GetGuild(Context.Guild.Id).GetTextChannel(Context.Message.Channel.Id).SendMessageAsync(msg);
        }
    }
}
