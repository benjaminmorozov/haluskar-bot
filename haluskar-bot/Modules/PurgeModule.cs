using Discord;
using Discord.Commands;
using Discord.WebSocket;
using haluskar_bot.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace haluskar_bot.Modules
{
    public class PurgeModule : ModuleBase<SocketCommandContext>
    {
        [Command("purge")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task Purge(int amount)
        {
            IEnumerable<IMessage> messages = await Context.Channel.GetMessagesAsync(amount + 1).FlattenAsync();
            await ((ITextChannel)Context.Channel).DeleteMessagesAsync(messages);
        }
    }
}
