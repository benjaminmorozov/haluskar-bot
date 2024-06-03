using Discord;
using Discord.Commands;
using Discord.WebSocket;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace haluskar_bot.Services
{
    public class CommandHandler
    {
        private readonly CommandService _commands;
        private readonly DiscordSocketClient _client;
        private readonly IServiceProvider _services;
        private readonly Microsoft.Extensions.Logging.ILogger _logger;
        public static string _prefix;

        public CommandHandler(IServiceProvider services)
        {
            _commands = services.GetRequiredService<CommandService>();
            _client = services.GetRequiredService<DiscordSocketClient>();
            _logger = services.GetRequiredService<ILogger<CommandHandler>>();
            _services = services;

            _commands.CommandExecuted += CommandExecutedAsync;

            _client.MessageReceived += MessageReceivedAsync;
        }

        public async Task InitializeAsync(string prefix)
        {
            _prefix = prefix;
            await _commands.AddModulesAsync(Assembly.GetEntryAssembly(), _services);
            // Add additional initialization code here...
        }

        private async Task MessageReceivedAsync(SocketMessage rawMessage)
        {
            // Ignore system messages and messages from bots
            if (!(rawMessage is SocketUserMessage message)) return;
            if (message.Source != MessageSource.User) return;

            _logger.LogInformation($"Received message: {message.Content}");

            int argPos = 0;
            // Check if the message has a mention prefix
            if (message.HasMentionPrefix(_client.CurrentUser, ref argPos))
            {
                _logger.LogInformation("Message has mention prefix.");
            }
            // Check if the message has the configured string prefix
            else if (message.HasStringPrefix(_prefix, ref argPos))
            {
                _logger.LogInformation("Message has string prefix.");
            }
            // If neither prefix is found, return
            else
            {
                _logger.LogInformation("Message does not have a valid prefix.");
                return;
            }

            var context = new SocketCommandContext(_client, message);
            var result = await _commands.ExecuteAsync(context, argPos, _services);

            if (result.Error.HasValue &&
                result.Error.Value != CommandError.UnknownCommand)
                await context.Channel.SendMessageAsync(result.ToString());
        }

        public async Task CommandExecutedAsync(Optional<CommandInfo> command, ICommandContext context, IResult result)
        {
            // if a command isn't found, log that info to console and exit this method
            if (!command.IsSpecified)
            {
                _logger.LogError($"Command failed to execute for {context.Message.Author} <-> {result.ErrorReason}");
                return;
            }

            // log success to the console and exit this method
            if (result.IsSuccess)
            {
                _logger.LogInformation($"Command {context.Message.Content} executed for {context.Message.Author} on {context.Guild}");
                return;
            }

            // failure scenario, let's let the user know
            await context.Channel.SendMessageAsync($"Sorry, something went wrong -> [{result.ErrorReason}]");
        }
    }
}