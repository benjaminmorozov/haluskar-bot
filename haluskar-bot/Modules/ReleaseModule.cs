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
    public class ReleaseModule : ModuleBase<SocketCommandContext>
    {
        [Command("release")]
        public Task Release()
        {
            return Context.Channel.SendFileAsync("test.png", "**[STEAM] MORTAL KOMBAT XI (2019) - `49,99€ => FREE`**\nHra je zadarmo v službe Steam. Akcia platí do 28. júna, 18:00, a po claimnutí Vám zostane.\nhttps://store.steampowered.com");
        }
    }
}
