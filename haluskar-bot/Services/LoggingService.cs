﻿using Discord;
using Discord.Commands;
using Discord.WebSocket;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace haluskar_bot.Services
{
    public class LoggingService
    {
        // declare the fields used later in this class
        private readonly ILogger _logger;
        private readonly DiscordSocketClient _client;
        private readonly CommandService _commands;

        public LoggingService(IServiceProvider services)
        {
            // get the services we need via DI, and assign the fields declared above to them
            _client = services.GetRequiredService<DiscordSocketClient>();
            _commands = services.GetRequiredService<CommandService>();
            _logger = services.GetRequiredService<ILogger<LoggingService>>();

            // hook into these events with the methods provided below
            _client.Ready += OnReadyAsync;
            _client.Log += OnLogAsync;
            _commands.Log += OnLogAsync;
        }

        // this method executes on the bot being connected/ready
        public Task OnReadyAsync()
        {
            _logger.LogInformation($"Logged in as {_client.CurrentUser.Username + "#" + _client.CurrentUser.Discriminator}");
            _logger.LogInformation($"We are on {_client.Guilds.Count()} server/s");
            return Task.CompletedTask;
        }

        // this method switches out the severity level from Discord.Net's API, and logs appropriately
        public Task OnLogAsync(LogMessage msg)
        {
            string logText = $"{msg.Exception?.ToString() ?? msg.Message}";
            switch (msg.Severity.ToString())
            {
                case "Critical":
                    {
                        _logger.LogCritical(logText);
                        break;
                    }
                case "Warning":
                    {
                        _logger.LogWarning(logText);
                        break;
                    }
                case "Info":
                    {
                        _logger.LogInformation(logText);
                        break;
                    }
                case "Verbose":
                    {
                        _logger.LogInformation(logText);
                        break;
                    }
                case "Debug":
                    {
                        _logger.LogDebug(logText);
                        break;
                    }
                case "Error":
                    {
                        _logger.LogError(logText);
                        break;
                    }
            }

            return Task.CompletedTask;

        }
    }
}
