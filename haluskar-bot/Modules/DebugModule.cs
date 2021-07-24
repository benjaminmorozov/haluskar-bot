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
    public class DebugModule : ModuleBase<SocketCommandContext>
    {
        [Command("debug")]
        public Task Debug()
        {
            // => ReplyAsync(
            // $"username {Context.Client.CurrentUser.Username} test\n");
            // "catch");
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Green,
                Title = "⚙️ Debug:",
            };
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "day `[optional day]`";
                x.Value = "- displays/set the current day.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "release";
                x.Value = "- releases a set payload command or a list of them if any exists.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "temp `[lesson]`";
                x.Value = "- displays an embed for a set lesson.";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithAuthor(Context.Client.CurrentUser)
                .WithCurrentTimestamp();
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
