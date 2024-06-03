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
    public class ZoznamUcitelovModule : ModuleBase<SocketCommandContext>
    {
        [Command("ucitelia"), Alias("zu", "zoznamu", "zoznamucitelov", "ucitel")]
        public Task Zoznam()
        {
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Blue,
                Title = "Súkromná stredná odborná škola Tatranská Akadémia:"
            };
            builder.AddField(x =>
            {
                x.Name = "Zoznam učiteľov:";
                x.Value = "`ANTIDOX`";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp();
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
