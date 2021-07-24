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
    public class SetModule : ModuleBase<SocketCommandContext>
    {
        [Command("set")]
        public Task Zoznam(string type, string value)
        {
            if(type == "prefix")
            {
                if(!(Context.Message.Author as SocketGuildUser).GuildPermissions.Administrator)
                {
                    return ReplyAsync("You don't have the Administrator permission!");
                }
                try {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.Load(@"C:\Users\ssosta\Desktop\haluskar.xml");
                    xmlDoc.GetElementsByTagName("prefix")[0].InnerText = value;
                    XmlTextWriter tw = new XmlTextWriter(@"C:\Users\ssosta\Desktop\haluskar.xml", null);
                    xmlDoc.Save(tw);
                    CommandHandler._prefix = value;
                } catch(Exception e) {
                    Console.WriteLine(e);
                }
            } else
            {
                return ReplyAsync($"{Context.Message.Author.Mention} invalid type!");
            }
            return ReplyAsync("Successfully set " + type + " to: `" + value + "`.");
        }
    }
}
