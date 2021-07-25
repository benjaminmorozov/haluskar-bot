using System;
using Discord;
using Discord.Net;
using Discord.Commands;
using Discord.WebSocket;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using haluskar_bot.Services;
using System.Linq;
using Serilog;
using System.Globalization;
using Victoria;
using System.Diagnostics;

namespace haluskar_bot
{
    class Program
    {
        private DiscordSocketClient _client;
        private IConfiguration _config;
        private static string _logLevel;

        // We create the Main() function, that binds the first process to run the MainAsync() function as asynchronous. Therefore, if the app receives an exception, it
        // falls back to the Main() function, where it crashes.
        static void Main(string[] args = null)
        {
            if (args.Count() != 0)
            {
                _logLevel = args[0];
            }
            Log.Logger = new LoggerConfiguration()
                 .WriteTo.Console()
                 .CreateLogger();
            new Program().MainAsync().GetAwaiter().GetResult();
        }

        async Task MainAsync()
        {
            // We bind the Discord Socket Client to the _client variable and bind the Log event to the Task Log().
            _client = new DiscordSocketClient(new DiscordSocketConfig
            {
                ExclusiveBulkDelete = true // raise only MessagesBulkDeleted
            });

            //Create the configuration
            var _builder = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile(path: "config.json");
            _config = _builder.Build();

            // Console.WriteLine("Address: " + girlAddress[0].InnerText);
            var services = ConfigureServices();
            await services.GetRequiredService<CommandHandler>().InitializeAsync(_config["prefix"]);
            services.GetRequiredService<LoggingService>();
            await services.GetRequiredService<CommandHandler>().InitializeAsync(_config["prefix"]);
            await _client.LoginAsync(TokenType.Bot, _config["token"]);
            await _client.StartAsync();
            await _client.SetGameAsync(_config["prefix"]);
            await _client.SetActivityAsync(new Game("Sword Art Online: Alicization | " + _config["prefix"], ActivityType.Watching));
            // Block this task until the program is closed.
            await Task.Delay(-1);
        }

        private ServiceProvider ConfigureServices()
        {
            var services = new ServiceCollection()
                // Base
                .AddSingleton(_client)
                .AddSingleton<CommandService>()
                .AddSingleton<CommandHandler>()
                .AddSingleton<LoggingService>()
                .AddSingleton<AudioService>()
                .AddSingleton<LavaNode>()
                .AddSingleton<LavaConfig>()
                .AddLavaNode(x => {
                    x.SelfDeaf = true;
                })
                .AddLogging(configure => configure.AddSerilog());

            if (!string.IsNullOrEmpty(_logLevel))
            {
                switch (_logLevel.ToLower())
                {
                    case "info":
                        {
                            services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Information);
                            break;
                        }
                    case "error":
                        {
                            services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Error);
                            break;
                        }
                    case "debug":
                        {
                            services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Debug);
                            break;
                        }
                    default:
                        {
                            services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Error);
                            break;
                        }
                }
            }
            else
            {
                services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Information);
            }

            var serviceProvider = services.BuildServiceProvider();
            return serviceProvider;
        }

        private Task LogAync(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
    }
}
