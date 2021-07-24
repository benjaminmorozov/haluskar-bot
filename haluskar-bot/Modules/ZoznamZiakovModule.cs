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
    public class ZoznamZiakovModule : ModuleBase<SocketCommandContext>
    {
        [Command("ziaci"), Alias("zz", "zoznamz", "zoznamziakov", "ziak")]
        public Task Zoznam()
        {
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Blue,
                Title = "I.A - Barbora Lukušová:"
            };
            builder.AddField(x =>
            {
                x.Name = "Zoznam žiakov:";
                x.Value = "`1. Bujňák Matej\n2. Celerová Júlia\n3. Fábry Ľubomír\n4. Fridmanský Lukáš\n5. Gancarčík Juraj\n6. Gonda Peter\n7. Hanečák Róbert\n8. Hlaváčová Nina\n9. Hric Matej\n10. Hromádka Jakub\n11. Hruška Adam\n12. Chudík Marko\n13. Ištoková Gréta\n14. Kacvinský Marek\n15. Kočiš Filip\n16. Kučera Marek\n17. Kučera Tomáš\n18. Kuchta Patrik\n19. Lučanská Viktória\n20. Marci Tomáš\n21. Mitický Vladislav\n22. Morozov Benjamín\n23. Novák Alex\n24. Saunders Nicholas Matthew\n25. Sedláček Vladislav\n26. Streichsbier Sandro\n27. Štefaňák Alex\n28. Tomáš Matthias\n29. Tomka Ján\n30. Vronč Timotej`";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp();
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
