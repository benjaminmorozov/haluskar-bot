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
    public class NotebookInfoModule : ModuleBase<SocketCommandContext>
    {
        [Command("notebookinfo"), Alias("nbinfo", "nb", "ni", "notebook")]
        public Task NotebookInfo()
        {
            // => ReplyAsync(
            // $"username {Context.Client.CurrentUser.Username} test\n");
            // "catch");
            var builder = new EmbedBuilder()
            {
                //Optional color
                Color = Color.Blue,
                Title = "HP ProBook 450 G7 1Q3J1ES (bussiness custom build)",
                Description = "https://www.hpobchod.sk/productOpt.asp?konfId=1Q3J1ES"
            };
            builder.AddField(x =>
            {
                x.Name = "⚙️ Procesor";
                x.Value = "Intel® Core™ i5-10210U 1.60 GHz, turbo 4.20 GHz, cache 6 MB, quadcore, Comet Lake";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🧠 Pamäť";
                x.Value = "RAM 8GB DDR4 2666MHz SDRAM (1×8GB), 2x SODIMM slot\nSK Hynix BC511 hfm256gdjtni-82a0a 480GB SSD";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🖼 Grafika";
                x.Value = "NVIDIA GeForce MX130 (2GB GDDR5 VRAM) DX12 Ultimate incompatible\nIntel(R) UDH Graphics (128MB VRAM)";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🎛 Porty a funkcie";
                x.Value = "Integrated stereo, microphone, Intel® AX201 WiFi 6 (2x2), Intel Wireless Bluetooth 5.0, Realtek Gigabit Ethernet 10/100/1000, SD/SDHC/SDXC card reader, 1x USB-C, 2x USB 3.1 gen 1, 1x USB 2.0, 1x audio/microphone jack, 1x HDMI 1.4b, 1x RJ-45 (LAN), TPM 2.0 support (Windows 11 compatible), Infrared HD 720p camera (Windows Hello compatible)";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🖥 Obrazovka:";
                x.Value = "39.6cm (15,6 inch), 1920x1080, IPS LED UWVA Antiglare display, 250 nits(cd/m^2), 45% NTSC";
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "🔋 Batéria:";
                x.Value = "45Wh lithium-ion battery, 7h15m rating, 65Wcharger";
                x.IsInline = true;
            });
            builder.AddField(x =>
            {
                x.Name = "🔋 Operačný systém:";
                x.Value = "Windows 10 Pro, available upgrade to Windows 11 Pro, UEFI, Secure Boot and Fast Boot enabled, x64bit, preinstalled Office and group policies (disabled Windows Game Bar, graphing in calculator and Windows Insider)'";
                x.IsInline = false;
            });
            builder.AddField(x =>
            {
                x.Name = "🍎 Hackintosh compatible:";
                x.Value = "partially, incompatible dedicated gpu, webcam/IR, SD reader and microphone";
                x.IsInline = true;
            })
                .WithFooter("♥ Halušky 2.0 ♥", Context.Guild.IconUrl)
                .WithCurrentTimestamp()
                .WithThumbnailUrl("https://www.hpobchod.sk/library/configuration/notebooky/HP-ProBook-450-G7_0b.jpg");
            //Use await if you're using an async Task to be completed.
            return ReplyAsync("", false, builder.Build());
        }
    }
}