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
    public class TempModule : ModuleBase<SocketCommandContext>
    {
        [Command("temp")]
        public Task Temp([Remainder]string lesson)
        {
            int id = 0;
            string time = "";
            bool isDouble = false;
            string link = "";
            string link1 = "";
            string link2 = "";
            string teacher1 = "";
            string teacher2 = "";
            string teacher = "";
            if(lesson == "Anglický jazyk")
            {
                id = 1;
                time = "7:50 - 8:35";
                isDouble = true;
                link1 = "https://ssosta.webex.com/meet/gabika.knizova";
                teacher1 = "Mgr. Gabriela Knížová";
                teacher2 = "Mgr. Monika Rosenbergerová";
                link2 = "https://ssosta.webex.com/meet/monika.cernakova";
            } else if (lesson == "Matematika")
            {
                id = 2;
                time = "8:40 - 9:25";
                isDouble = false;
                link = "https://ssosta.webex.com/meet/piklovcizsm";
                teacher = "Mgr. Milan Pikla";
            } else if (lesson == "Fyzika")
            {
                id = 3;
                time = "9:35 - 10:20";
                isDouble = false;
                link = "Použi edupage.";
                teacher = "Mgr. Michal Brezina";
            } else if (lesson == "Základy počítačových sietí")
            {
                id = 4;
                time = "10:40 - 11:22";
                isDouble = false;
                link = "https://ssosta.webex.com/meet/kovalcik";
                teacher = "Ing. Ján Kovalčík";
            } else if (lesson == "Odpadla")
            {
                id = 6;
                teacher = "Mgr. Martin Schiller";
                link = ":x:";
                time = "12:30 - 13:10";
                isDouble = false;
            } else
            {
                id = 7;
                time = "13:20 - 14:00";
                isDouble = true;
                link1 = "https://ssosta.webex.com/meet/lenkaponistova";
                teacher1 = "Mgr. Lenka Poništová";
                teacher2 = "Mgr. Kristián Klein";
                link2 = "https://ssosta.webex.com/meet/kristian.klein1234";
            }
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Green,
                Title = "Rozvrh hodín - Pondelok",
                Description = id.ToString() + ". hodina - " + lesson,
            };
            if (isDouble) {
                builder.AddField(x =>
                {
                    x.Name = teacher1;
                    x.Value = link1;
                    x.IsInline = true;
                });
                builder.AddField(x =>
                {
                    x.Name = teacher2;
                    x.Value = link2;
                    x.IsInline = true;
                });
                builder.AddField(x =>
                {
                    x.Name = "Trvanie";
                    x.Value = time;
                    x.IsInline = true;
                })
                    .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                    .WithAuthor(Context.Client.CurrentUser)
                    .WithCurrentTimestamp();
            } else
            {
                builder.AddField(x =>
                {
                    x.Name = teacher;
                    x.Value = link;
                    x.IsInline = true;
                });
                builder.AddField(x =>
                {
                    x.Name = "Trvanie";
                    x.Value = time;
                    x.IsInline = true;
                })
                    .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                    .WithAuthor(Context.Client.CurrentUser)
                    .WithCurrentTimestamp();
            }
            //Use await if you're using an async Task to be completed.
            Context.Message.DeleteAsync();
            return ReplyAsync("", false, builder.Build());
        }
    }
}
