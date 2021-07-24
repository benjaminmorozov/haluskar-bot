using Discord;
using Discord.Commands;
using Discord.WebSocket;
using haluskar_bot.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace haluskar_bot.Modules
{
    public class DayModule : ModuleBase<SocketCommandContext>
    {
        [Command("day")]
        public Task Day(string den = "")
        {
            if(String.IsNullOrWhiteSpace(den))
                return ReplyAsync("Dnes je " + Program._dayOfWeek);
            else
            {
                Program._dayOfWeek = den;
                return ReplyAsync("Dnes je " + Program._dayOfWeek);
            }
        }
    }
}
