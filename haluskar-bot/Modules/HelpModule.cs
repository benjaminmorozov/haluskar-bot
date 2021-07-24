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
    public class HelpModule : ModuleBase<SocketCommandContext>
    {
        [Command("help"), Alias("commands", "?")]
        public Task Help(){
            // => ReplyAsync(
            // $"username {Context.Client.CurrentUser.Username} test\n");
            // "catch");
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Green,
                Title = "Zoznam príkazov:",
                Description = "prefix: **`" + CommandHandler._prefix + "`**, ⚙️ - len pre moderátorov"
            };
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "avatar";
                x.Value = "- zobrazí tvojho avatara, poprípade avatara označeného používateľa.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "help";
                x.Value = "- zobrazí zoznam všetkých dostupných príkazov a ich argumentov.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "linky";
                x.Value = "- zobrazí užitočné linky, využité počas roka.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "nb";
                x.Value = "- zobrazí vypracovaný zoznam informácií o školských notebookoch.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "purge `[number of messages]`";
                x.Value = "⚙️ - vymaže zadaný počet správ.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "rozvrh `[optional day]`";
                x.Value = "- zobrazí rozvrh hodín na dnes/zadaný deň.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "set `[prefix]` `[value]`";
                x.Value = "⚙️ - nastaví zvolenú premennú pre bota.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "ucitelia";
                x.Value = "- zobrazí zoznam všetkých učiteľov na škole.";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = CommandHandler._prefix + "ziaci";
                x.Value = "- zobrazí zoznam všetkých žiakov v triede.";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithAuthor(Context.Client.CurrentUser)
                .WithThumbnailUrl("https://media.discordapp.net/attachments/752213665322893382/829337556885045299/sandro.gif")
                .WithCurrentTimestamp();
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
