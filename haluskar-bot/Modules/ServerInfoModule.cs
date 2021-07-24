using Discord;
using Discord.Commands;
using haluskar_bot.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace haluskar_bot.Modules
{
    public class ServerInfoModule : ModuleBase<SocketCommandContext>
    {
        [Command("serverinfo")]
        public Task ServerInfo(){
            // => ReplyAsync(
            // $"username {Context.Client.CurrentUser.Username} test\n");
            // "catch");
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Blue,
                Title = "Informácie o serveri:",
                Description = "prefix: **`" + CommandHandler._prefix + "`**"
            };
            builder.AddField(x =>
            {
                x.Name = "✏️ Názov";
                x.Value = Context.Guild.Name;
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "📅 Dátum založenia";
                x.Value = Context.Guild.CreatedAt.UtcDateTime;
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "🔒 Vlastník servera";
                x.Value = Context.Guild.Owner.Mention;
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "⚙️ Prefix bota";
                x.Value = "`" + CommandHandler._prefix + "`";
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "🟪 Level boostu:";
                x.Value = Context.Guild.PremiumTier;
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "🎆 Počet členov:";
                x.Value = Context.Guild.MemberCount;
                x.IsInline = true;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp()
                .WithThumbnailUrl(Context.Guild.IconUrl);
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
