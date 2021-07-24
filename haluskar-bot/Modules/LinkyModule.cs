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
    public class LinkyModule : ModuleBase<SocketCommandContext>
    {
        [Command("linky"), Alias("links")]
        public Task Linky(){
            // => ReplyAsync(
            // $"username {Context.Client.CurrentUser.Username} test\n");
            // "catch");
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Blue,
                Title = "Užitočné linky:"
            };
            builder.AddField(x =>
            {
                x.Name = "✏️ IT/IDT Programy";
                x.Value = "http://194.160.189.178/idt_programy";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🔢 Randomizér:";
                x.Value = "http://194.160.189.178/randomizer";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "📅 Triedny kalendár";
                x.Value = "https://calendar.google.com/calendar/u/0?cid=c2VqcXFtdXFuc2NwMWRxbnJmN3E3aTdpdGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🌎 Žiacke stránky (vytvárané v druhom ročníku, zverejňované v júni)";
                x.Value = "http://priezvisko.designquest.eu/subdom/priezvisko";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp()
                .WithThumbnailUrl(Context.Guild.IconUrl);
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
