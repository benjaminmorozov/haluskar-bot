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
        [Command("ucitelia")]
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
                x.Value = "`1. Ing. Beáta Mitická\n2. Ing. Jana Bencková - štvrtá D\n3. Ing. Jana Jurkovičová - prvá B\n4. Ing. Jana Marcinová - štvrtá C\n5. Ing. Ján Kovalčík - druhá B\n6. Ing. Michaela Kopková\n7. Ing. Peter Žingor\n8. Ing. Ľuboslava Kačmárová\n9. JUDr. Eva Oravcová\n10. Mgr. Barbora Lukušová - prvá A\n11. Mgr. Denisa Petrovská, PhD. - druhá C\n12. Mgr. Gabriela Knížová - štvrtá A\n13. Mgr. Gabriela Pitoňáková\n14. Mgr. Jaroslav Lavko\n15. Mgr. Jozef Hlaváčik\n16. Mgr. Jozef Petrenčík\n17. Mgr. Kristián Klein\n18. Mgr. Lenka Poništová\n19. Mgr. Lucia Gallovičová - druhá A\n20. Mgr. Lucia Hudáková\n21. Mgr. Martin Schiller\n22. Mgr. Michal Brezina - štvrtá B\n23. Mgr. Milan Pikla - tretia C\n24. Mgr. Monika Maťašová - prvá C\n25. Mgr. Monika Rosenbergerová\n26. Mgr. Simona Kolenčíková - tretia B\n27. Mgr. Soňa Šoltísová - tretia D\n28. PaedDr. Stanislav Dubrovčák - prvá D\n`";
                x.IsInline = false;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp();
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}
