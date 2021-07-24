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
    public class AvatarModule : ModuleBase<SocketCommandContext>
    {
        [Command("avatar")]
        public Task Avatar(IUser user = null)
        {
            string url;
            if(user == null)
            {
                user = Context.Message.Author;
            }
            url = user.GetAvatarUrl();

            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Green,
                Title = "Avatar používateľa:",
                Description = "🖼 " + user.Username + "#" + user.Discriminator,
                ImageUrl = url
            };
            return ReplyAsync(embed: builder.Build());
        }
    }
}
