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
    public class RozvrhModule : ModuleBase<SocketCommandContext>
    {
        [Command("rozvrh")]
        public Task Rozvrh(string day = "")
        {
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Green,
                Description = "🔴 - iba dievčatá, 🔵 - iba chlapci",
            };
            if (Program._dayOfWeek == "sobota" || Program._dayOfWeek == "nedeľa")
            {
                builder.AddField(x =>
                {
                    x.Name = "Rozvrh hodín - Na pondelok";
                    x.Value = "`  [7:50 | 8:35]` Anglický jazyk\n`  [8:40 | 9:25]` Matematika\n`  [9:35 | 10:20]` Fyzika\n `  [10:40 | 11:25]` Základy počítačových sietí\n`  [11:35 | 12:20]` **Odpadla**\n`  [12:25 | 13:10]` **Odpadla**\n`  [13:15 | 14:00]` Telesná a športová výchova";
                    x.IsInline = false;
                })
                    .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                    .WithAuthor(Context.Client.CurrentUser)
                    .WithCurrentTimestamp();
            } else if (Program._dayOfWeek == "pondelok")
            {
                TimeSpan start = new TimeSpan(0, 0, 0); //0 o'clock
                TimeSpan end = new TimeSpan(14, 0, 0); //14 o'clock
                TimeSpan now = DateTime.Now.TimeOfDay;

                if ((now > start) && (now < end))
                {
                    builder.AddField(x =>
                    {
                        x.Name = "Rozvrh hodín - Pondelok";
                        x.Value = "`  [7:50 | 8:35]` Anglický jazyk\n`  [8:40 | 9:25]` Matematika\n`  [9:35 | 10:20]` Fyzika\n`  [10:40 | 11:25]` Základy počítačových sietí\n`  [11:35 | 12:20]` **Odpadla**\n`  [12:25 | 13:10]` **Odpadla**\n`  [13:15 | 14:00]` Telesná a športová výchova";
                        x.IsInline = false;
                    })
                    .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                    .WithAuthor(Context.Client.CurrentUser)
                    .WithCurrentTimestamp();
                } else
                {
                    builder.AddField(x =>
                    {
                        x.Name = "Rozvrh hodín - Na utorok";
                        x.Value = "`🔴[7:50 | 8:35]` **Telesná a športová výchova - dievčatá**\n`  [8:40 | 9:25]` Anglický jazyk\n`  [9:35 | 10:20]` Matematika\n`  [10:40 | 11:25]` Elektronika\n`  [11:35 | 12:20]` Základy počítačových sietí\n`  [12:25 | 13:10]` Slovenský jazyk\n`  [13:15 | 14:00]` Cvičenia z počítačových sietí";
                        x.IsInline = false;
                    })
                    .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                    .WithAuthor(Context.Client.CurrentUser)
                    .WithCurrentTimestamp();
                }
            }
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
