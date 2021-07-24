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
    public class UserInfoModule : ModuleBase<SocketCommandContext>
    {
        [Command("userinfo")]
        public Task UserInfo(IUser user = null)
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
                Title = "Informácie o používateľovi",
                ThumbnailUrl = url
            };
            builder.AddField(x =>
            {
                x.Name = "📝 Celé používateľské meno";
                x.Value = user.Username + "#" + user.Discriminator;
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "⚙️ ID člena";
                x.Value = "`" + user.Id + "`";
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "📅 Dátum založenia účtu";
                x.Value = user.CreatedAt.UtcDateTime;
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "📅 Dátum pripojenia na server";
                x.Value = (Context.Guild.GetUser(user.Id).JoinedAt).Value.UtcDateTime;
                x.IsInline = true;
            });
            return ReplyAsync(embed: builder.Build());
        }
    }
}
