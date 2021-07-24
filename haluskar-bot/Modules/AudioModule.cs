using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using haluskar_bot.Services;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using Victoria;
using Victoria.Enums;

namespace haluskar_bot.Modules {
    public sealed class AudioModule : ModuleBase<SocketCommandContext> {
        private LavaPlayer _player { get; set; }
        private readonly LavaNode _lavaNode;
        private readonly AudioService _audioService;
        private static readonly IEnumerable<int> Range = Enumerable.Range(1900, 2000);

        public AudioModule(LavaNode lavaNode, AudioService audioService) {
            _lavaNode = lavaNode;
            _audioService = audioService;
        }

        [Command("Join", RunMode = RunMode.Async)]
        public async Task Join()
        {
            var user = (SocketGuildUser)Context.User;
            var voiceChannel = user.VoiceChannel;
            await voiceChannel.ConnectAsync();
            await _lavaNode.ConnectAsync();
            await _lavaNode.JoinAsync(voiceChannel, textChannel: (ITextChannel)Context.Channel);
        }

        [Command("Leave")]
        public async Task LeaveAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            var voiceChannel = (Context.User as IVoiceState).VoiceChannel ?? player.VoiceChannel;
            if (voiceChannel == null) {
                await ReplyAsync("Nastala chyba - Haluškára nemožno odpojiť zo zvukového kanálu.");
                return;
            }

            try {
                await _lavaNode.LeaveAsync(voiceChannel);
                await ReplyAsync($"Haluškár opustil {voiceChannel.Name}!");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Play", RunMode = RunMode.Async)]
        public async Task PlayAsync([Remainder] string query)
        {
            _player = _lavaNode.GetPlayer(Context.Guild);
            var search = await _lavaNode.SearchYouTubeAsync(query);
            if (search.LoadStatus == LoadStatus.NoMatches ||
                search.LoadStatus == LoadStatus.LoadFailed)
            {
                await ReplyAsync("Daná pesnička nebola nájdená.");
                return;
            }

            var track = search.Tracks.FirstOrDefault();

            if (_player.PlayerState == PlayerState.Playing || _player.PlayerState == PlayerState.Paused)
            {
                    _player.Queue.Enqueue(track);
                    await ReplyAsync($"{track.Title} bola pridaná do fronty.");
            } else
            {
                await _player.PlayAsync(track);
                await ReplyAsync($"Práve hrá: {track.Title}");
            }
        }

        [Command("Pause")]
        public async Task PauseAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Nie je možné pozastaviť niečo, čo nehrá!");
                return;
            }

            try {
                await player.PauseAsync();
                await ReplyAsync($"Pozastavené: {player.Track.Title}");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Resume")]
        public async Task ResumeAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Paused) {
                await ReplyAsync("Nie je možné znova hrať niečo, čo nehrá!");
                return;
            }

            try {
                await player.ResumeAsync();
                await ReplyAsync($"Znova hrá: {player.Track.Title}");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Stop")]
        public async Task StopAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState == PlayerState.Stopped) {
                await ReplyAsync("Nie je možné zastaviť niečo, čo nehrá!");
                return;
            }

            try {
                await player.StopAsync();
                await ReplyAsync("Haluškár prestal hrať.");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Skip")]
        public async Task SkipAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Nie je možné preskočiť niečo, čo nehrá!");
                return;
            }

            var voiceChannelUsers = (player.VoiceChannel as SocketVoiceChannel).Users.Where(x => !x.IsBot).ToArray();
            if (_audioService.VoteQueue.Contains(Context.User.Id)) {
                await ReplyAsync("Nemôžeš znova hlasovať.");
                return;
            }

            _audioService.VoteQueue.Add(Context.User.Id);
            var percentage = _audioService.VoteQueue.Count / voiceChannelUsers.Length * 100;
            if (percentage < 85) {
                await ReplyAsync("Potrebujete viac ako 85% hlasov pre preskočenie, aby hlasovanie prešlo.");
                return;
            }

            try {
                var oldTrack = player.Track;
                var currenTrack = await player.SkipAsync();
                await ReplyAsync($"Preskočené: {oldTrack.Title}\nPráve hrá {currenTrack.Title}");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("ForceSKip"), Alias("fs")]
        public async Task FSAsync()
        {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player))
            {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing)
            {
                await ReplyAsync("Nie je možné preskočiť niečo, čo nehrá!");
                return;
            }

            try
            {
                var oldTrack = player.Track;
                var currenTrack = await player.SkipAsync();
                await ReplyAsync($"Preskočené: {oldTrack.Title}\nPráve hrá {currenTrack.Title}");
            }
            catch (Exception exception)
            {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Seek")]
        public async Task SeekAsync(TimeSpan timeSpan) {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Woaaah there, I can't seek when nothing is playing.");
                return;
            }

            try {
                await player.SeekAsync(timeSpan);
                await ReplyAsync($"I've seeked `{player.Track.Title}` to {timeSpan}.");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("Volume")]
        public async Task VolumeAsync(ushort volume) {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            try {
                await player.UpdateVolumeAsync(volume);
                await ReplyAsync($"I've changed the player volume to {volume}.");
            }
            catch (Exception exception) {
                await ReplyAsync(exception.Message);
            }
        }

        [Command("NowPlaying"), Alias("Np")]
        public async Task NowPlayingAsync() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Woaaah there, I'm not playing any tracks.");
                return;
            }

            var track = player.Track;
            var artwork = await track.FetchArtworkAsync();

            var embed = new EmbedBuilder {
                    Title = $"{track.Author} - {track.Title}",
                    ThumbnailUrl = artwork,
                    Url = track.Url
                }
                .AddField("Id", track.Id)
                .AddField("Duration", track.Duration)
                .AddField("Position", track.Position);

            await ReplyAsync(embed: embed.Build());
        }

        [Command("Genius", RunMode = RunMode.Async)]
        public async Task ShowGeniusLyrics() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Woaaah there, I'm not playing any tracks.");
                return;
            }

            var lyrics = await player.Track.FetchLyricsFromGeniusAsync();
            if (string.IsNullOrWhiteSpace(lyrics)) {
                await ReplyAsync($"No lyrics found for {player.Track.Title}");
                return;
            }

            var splitLyrics = lyrics.Split('\n');
            var stringBuilder = new StringBuilder();
            foreach (var line in splitLyrics) {
                if (Range.Contains(stringBuilder.Length)) {
                    await ReplyAsync($"```{stringBuilder}```");
                    stringBuilder.Clear();
                }
                else {
                    stringBuilder.AppendLine(line);
                }
            }

            await ReplyAsync($"```{stringBuilder}```");
        }

        [Command("OVH", RunMode = RunMode.Async)]
        public async Task ShowOVHLyrics() {
            if (!_lavaNode.TryGetPlayer(Context.Guild, out var player)) {
                await ReplyAsync("Haluškár nie je pripojený k žiadnemu zvukovému kanálu!");
                return;
            }

            if (player.PlayerState != PlayerState.Playing) {
                await ReplyAsync("Woaaah there, I'm not playing any tracks.");
                return;
            }

            var lyrics = await player.Track.FetchLyricsFromOVHAsync();
            if (string.IsNullOrWhiteSpace(lyrics)) {
                await ReplyAsync($"No lyrics found for {player.Track.Title}");
                return;
            }

            var splitLyrics = lyrics.Split('\n');
            var stringBuilder = new StringBuilder();
            foreach (var line in splitLyrics) {
                if (Range.Contains(stringBuilder.Length)) {
                    await ReplyAsync($"```{stringBuilder}```");
                    stringBuilder.Clear();
                }
                else {
                    stringBuilder.AppendLine(line);
                }
            }

            await ReplyAsync($"```{stringBuilder}```");
        }
    }
}